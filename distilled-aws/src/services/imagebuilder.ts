import * as HttpClient from "effect/unstable/http/HttpClient";
import * as effect from "effect/Effect";
import * as redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as stream from "effect/Stream";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import type { Region } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "imagebuilder",
  serviceShapeName: "imagebuilder",
});
const auth = T.AwsAuthSigv4({ name: "imagebuilder" });
const ver = T.ServiceVersion("2019-12-02");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
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
});

//# Newtypes
export type ImageBuildVersionArn = string;
export type ClientToken = string;
export type NonEmptyString = string;
export type ErrorMessage = string;
export type LifecycleExecutionId = string;
export type ResourceName = string;
export type VersionNumber = string;
export type OsVersion = string;
export type InlineComponentData = string;
export type Uri = string;
export type TagKey = string;
export type TagValue = string;
export type ComponentBuildVersionArn = string;
export type ImageBuilderArn = string;
export type WildcardVersionNumber = string;
export type ComponentVersionArnOrBuildVersionArn = string;
export type ComponentParameterName = string;
export type ComponentParameterValue = string;
export type EbsIopsInteger = number;
export type EbsVolumeSizeInteger = number;
export type EbsVolumeThroughput = number;
export type EmptyString = string;
export type InlineDockerFileTemplate = string;
export type ContainerRecipeArn = string;
export type AmiNameString = string;
export type AccountId = string;
export type OrganizationArn = string;
export type OrganizationalUnitArn = string;
export type LicenseConfigurationArn = string;
export type LaunchTemplateId = string;
export type TargetResourceCount = number;
export type MaxParallelLaunches = number;
export type SsmParameterName = string;
export type DistributionConfigurationArn = string;
export type ImageRecipeArn = string;
export type InfrastructureConfigurationArn = string;
export type ImageTestsTimeoutMinutes = number;
export type WorkflowVersionArnOrBuildVersionArn = string;
export type WorkflowParameterName = string;
export type WorkflowParameterValue = string;
export type ParallelGroup = string;
export type RoleNameOrArn = string;
export type LogGroupName = string;
export type Timezone = string;
export type AutoDisableFailureCount = number;
export type ImagePipelineArn = string;
export type UserDataOverride = string;
export type InstanceType = string;
export type InstanceProfileNameType = string;
export type SnsTopicArn = string;
export type HttpTokens = string;
export type HttpPutResponseHopLimit = number;
export type LifecyclePolicyDetailFilterValue = number;
export type LifecyclePolicyDetailFilterRetainAtLeast = number;
export type LifecyclePolicyDetailExclusionRulesAmisLastLaunchedValue = number;
export type LifecyclePolicyArn = string;
export type InlineWorkflowData = string;
export type WorkflowBuildVersionArn = string;
export type ComponentParameterType = string;
export type ComponentParameterDescription = string;
export type ComponentData = string;
export type ProductCodeId = string;
export type ResourcePolicyDocument = string;
export type DockerFileTemplate = string;
export type DistributionTimeoutMinutes = number;
export type ImageVersionArnOrBuildVersionArn = string;
export type Arn = string;
export type DateTimeTimestamp = Date;
export type ConsecutiveFailures = number;
export type MarketplaceResourceLocation = string;
export type WorkflowData = string;
export type WorkflowParameterType = string;
export type WorkflowParameterDescription = string;
export type WorkflowExecutionId = string;
export type WorkflowExecutionMessage = string;
export type WorkflowStepCount = number;
export type WorkflowStepExecutionId = string;
export type WorkflowStepName = string;
export type WorkflowStepDescription = string;
export type WorkflowStepAction = string;
export type WorkflowStepMessage = string;
export type WorkflowStepInputs = string;
export type WorkflowStepOutputs = string;
export type WorkflowStepTimeoutSecondsInteger = number;
export type ComponentVersionArn = string;
export type RestrictedInteger = number;
export type PaginationToken = string;
export type FilterName = string;
export type FilterValue = string;
export type ImageVersionArn = string;
export type SeverityCountNumber = number;
export type NonNegativeDouble = number;
export type VulnerabilityId = string;
export type SourceLayerHash = string;
export type PackageEpoch = number;
export type PackageArchitecture = string;
export type WorkflowWildcardVersionArn = string;
export type WorkflowNameArn = string;
export type ImageBuildMessage = string;
export type WorkflowVersionArn = string;

//# Schemas
export interface CancelImageCreationRequest {
  imageBuildVersionArn: string;
  clientToken: string;
}
export const CancelImageCreationRequest = S.suspend(() =>
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
).annotate({
  identifier: "CancelImageCreationRequest",
}) as any as S.Schema<CancelImageCreationRequest>;
export interface CancelImageCreationResponse {
  requestId?: string;
  clientToken?: string;
  imageBuildVersionArn?: string;
}
export const CancelImageCreationResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    clientToken: S.optional(S.String),
    imageBuildVersionArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CancelImageCreationResponse",
}) as any as S.Schema<CancelImageCreationResponse>;
export interface CancelLifecycleExecutionRequest {
  lifecycleExecutionId: string;
  clientToken: string;
}
export const CancelLifecycleExecutionRequest = S.suspend(() =>
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
).annotate({
  identifier: "CancelLifecycleExecutionRequest",
}) as any as S.Schema<CancelLifecycleExecutionRequest>;
export interface CancelLifecycleExecutionResponse {
  lifecycleExecutionId?: string;
}
export const CancelLifecycleExecutionResponse = S.suspend(() =>
  S.Struct({ lifecycleExecutionId: S.optional(S.String) }),
).annotate({
  identifier: "CancelLifecycleExecutionResponse",
}) as any as S.Schema<CancelLifecycleExecutionResponse>;
export type Platform = "Windows" | "Linux" | "macOS" | (string & {});
export const Platform = S.String;
export type OsVersionList = string[];
export const OsVersionList = S.Array(S.String);
export type TagMap = { [key: string]: string | undefined };
export const TagMap = S.Record(S.String, S.String.pipe(S.optional));
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
export const CreateComponentRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    semanticVersion: S.String,
    description: S.optional(S.String),
    changeDescription: S.optional(S.String),
    platform: Platform,
    supportedOsVersions: S.optional(OsVersionList),
    data: S.optional(S.String),
    uri: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
    tags: S.optional(TagMap),
    clientToken: S.String.pipe(T.IdempotencyToken()),
    dryRun: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/CreateComponent" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateComponentRequest",
}) as any as S.Schema<CreateComponentRequest>;
export interface LatestVersionReferences {
  latestVersionArn?: string;
  latestMajorVersionArn?: string;
  latestMinorVersionArn?: string;
  latestPatchVersionArn?: string;
}
export const LatestVersionReferences = S.suspend(() =>
  S.Struct({
    latestVersionArn: S.optional(S.String),
    latestMajorVersionArn: S.optional(S.String),
    latestMinorVersionArn: S.optional(S.String),
    latestPatchVersionArn: S.optional(S.String),
  }),
).annotate({
  identifier: "LatestVersionReferences",
}) as any as S.Schema<LatestVersionReferences>;
export interface CreateComponentResponse {
  requestId?: string;
  clientToken?: string;
  componentBuildVersionArn?: string;
  latestVersionReferences?: LatestVersionReferences;
}
export const CreateComponentResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    clientToken: S.optional(S.String),
    componentBuildVersionArn: S.optional(S.String),
    latestVersionReferences: S.optional(LatestVersionReferences),
  }),
).annotate({
  identifier: "CreateComponentResponse",
}) as any as S.Schema<CreateComponentResponse>;
export type ContainerType = "DOCKER" | (string & {});
export const ContainerType = S.String;
export type ComponentParameterValueList = string[];
export const ComponentParameterValueList = S.Array(S.String);
export interface ComponentParameter {
  name: string;
  value: string[];
}
export const ComponentParameter = S.suspend(() =>
  S.Struct({ name: S.String, value: ComponentParameterValueList }),
).annotate({
  identifier: "ComponentParameter",
}) as any as S.Schema<ComponentParameter>;
export type ComponentParameterList = ComponentParameter[];
export const ComponentParameterList = S.Array(ComponentParameter);
export interface ComponentConfiguration {
  componentArn: string;
  parameters?: ComponentParameter[];
}
export const ComponentConfiguration = S.suspend(() =>
  S.Struct({
    componentArn: S.String,
    parameters: S.optional(ComponentParameterList),
  }),
).annotate({
  identifier: "ComponentConfiguration",
}) as any as S.Schema<ComponentConfiguration>;
export type ComponentConfigurationList = ComponentConfiguration[];
export const ComponentConfigurationList = S.Array(ComponentConfiguration);
export type EbsVolumeType =
  | "standard"
  | "io1"
  | "io2"
  | "gp2"
  | "gp3"
  | "sc1"
  | "st1"
  | (string & {});
export const EbsVolumeType = S.String;
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
export const EbsInstanceBlockDeviceSpecification = S.suspend(() =>
  S.Struct({
    encrypted: S.optional(S.Boolean),
    deleteOnTermination: S.optional(S.Boolean),
    iops: S.optional(S.Number),
    kmsKeyId: S.optional(S.String),
    snapshotId: S.optional(S.String),
    volumeSize: S.optional(S.Number),
    volumeType: S.optional(EbsVolumeType),
    throughput: S.optional(S.Number),
  }),
).annotate({
  identifier: "EbsInstanceBlockDeviceSpecification",
}) as any as S.Schema<EbsInstanceBlockDeviceSpecification>;
export interface InstanceBlockDeviceMapping {
  deviceName?: string;
  ebs?: EbsInstanceBlockDeviceSpecification;
  virtualName?: string;
  noDevice?: string;
}
export const InstanceBlockDeviceMapping = S.suspend(() =>
  S.Struct({
    deviceName: S.optional(S.String),
    ebs: S.optional(EbsInstanceBlockDeviceSpecification),
    virtualName: S.optional(S.String),
    noDevice: S.optional(S.String),
  }),
).annotate({
  identifier: "InstanceBlockDeviceMapping",
}) as any as S.Schema<InstanceBlockDeviceMapping>;
export type InstanceBlockDeviceMappings = InstanceBlockDeviceMapping[];
export const InstanceBlockDeviceMappings = S.Array(InstanceBlockDeviceMapping);
export interface InstanceConfiguration {
  image?: string;
  blockDeviceMappings?: InstanceBlockDeviceMapping[];
}
export const InstanceConfiguration = S.suspend(() =>
  S.Struct({
    image: S.optional(S.String),
    blockDeviceMappings: S.optional(InstanceBlockDeviceMappings),
  }),
).annotate({
  identifier: "InstanceConfiguration",
}) as any as S.Schema<InstanceConfiguration>;
export type ContainerRepositoryService = "ECR" | (string & {});
export const ContainerRepositoryService = S.String;
export interface TargetContainerRepository {
  service: ContainerRepositoryService;
  repositoryName: string;
}
export const TargetContainerRepository = S.suspend(() =>
  S.Struct({ service: ContainerRepositoryService, repositoryName: S.String }),
).annotate({
  identifier: "TargetContainerRepository",
}) as any as S.Schema<TargetContainerRepository>;
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
export const CreateContainerRecipeRequest = S.suspend(() =>
  S.Struct({
    containerType: ContainerType,
    name: S.String,
    description: S.optional(S.String),
    semanticVersion: S.String,
    components: S.optional(ComponentConfigurationList),
    instanceConfiguration: S.optional(InstanceConfiguration),
    dockerfileTemplateData: S.optional(S.String),
    dockerfileTemplateUri: S.optional(S.String),
    platformOverride: S.optional(Platform),
    imageOsVersionOverride: S.optional(S.String),
    parentImage: S.String,
    tags: S.optional(TagMap),
    workingDirectory: S.optional(S.String),
    targetRepository: TargetContainerRepository,
    kmsKeyId: S.optional(S.String),
    clientToken: S.String.pipe(T.IdempotencyToken()),
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
).annotate({
  identifier: "CreateContainerRecipeRequest",
}) as any as S.Schema<CreateContainerRecipeRequest>;
export interface CreateContainerRecipeResponse {
  requestId?: string;
  clientToken?: string;
  containerRecipeArn?: string;
  latestVersionReferences?: LatestVersionReferences;
}
export const CreateContainerRecipeResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    clientToken: S.optional(S.String),
    containerRecipeArn: S.optional(S.String),
    latestVersionReferences: S.optional(LatestVersionReferences),
  }),
).annotate({
  identifier: "CreateContainerRecipeResponse",
}) as any as S.Schema<CreateContainerRecipeResponse>;
export type AccountList = string[];
export const AccountList = S.Array(S.String);
export type StringList = string[];
export const StringList = S.Array(S.String);
export type OrganizationArnList = string[];
export const OrganizationArnList = S.Array(S.String);
export type OrganizationalUnitArnList = string[];
export const OrganizationalUnitArnList = S.Array(S.String);
export interface LaunchPermissionConfiguration {
  userIds?: string[];
  userGroups?: string[];
  organizationArns?: string[];
  organizationalUnitArns?: string[];
}
export const LaunchPermissionConfiguration = S.suspend(() =>
  S.Struct({
    userIds: S.optional(AccountList),
    userGroups: S.optional(StringList),
    organizationArns: S.optional(OrganizationArnList),
    organizationalUnitArns: S.optional(OrganizationalUnitArnList),
  }),
).annotate({
  identifier: "LaunchPermissionConfiguration",
}) as any as S.Schema<LaunchPermissionConfiguration>;
export interface AmiDistributionConfiguration {
  name?: string;
  description?: string;
  targetAccountIds?: string[];
  amiTags?: { [key: string]: string | undefined };
  kmsKeyId?: string;
  launchPermission?: LaunchPermissionConfiguration;
}
export const AmiDistributionConfiguration = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    targetAccountIds: S.optional(AccountList),
    amiTags: S.optional(TagMap),
    kmsKeyId: S.optional(S.String),
    launchPermission: S.optional(LaunchPermissionConfiguration),
  }),
).annotate({
  identifier: "AmiDistributionConfiguration",
}) as any as S.Schema<AmiDistributionConfiguration>;
export interface ContainerDistributionConfiguration {
  description?: string;
  containerTags?: string[];
  targetRepository: TargetContainerRepository;
}
export const ContainerDistributionConfiguration = S.suspend(() =>
  S.Struct({
    description: S.optional(S.String),
    containerTags: S.optional(StringList),
    targetRepository: TargetContainerRepository,
  }),
).annotate({
  identifier: "ContainerDistributionConfiguration",
}) as any as S.Schema<ContainerDistributionConfiguration>;
export type LicenseConfigurationArnList = string[];
export const LicenseConfigurationArnList = S.Array(S.String);
export interface LaunchTemplateConfiguration {
  launchTemplateId: string;
  accountId?: string;
  setDefaultVersion?: boolean;
}
export const LaunchTemplateConfiguration = S.suspend(() =>
  S.Struct({
    launchTemplateId: S.String,
    accountId: S.optional(S.String),
    setDefaultVersion: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "LaunchTemplateConfiguration",
}) as any as S.Schema<LaunchTemplateConfiguration>;
export type LaunchTemplateConfigurationList = LaunchTemplateConfiguration[];
export const LaunchTemplateConfigurationList = S.Array(
  LaunchTemplateConfiguration,
);
export type DiskImageFormat = "VMDK" | "RAW" | "VHD" | (string & {});
export const DiskImageFormat = S.String;
export interface S3ExportConfiguration {
  roleName: string;
  diskImageFormat: DiskImageFormat;
  s3Bucket: string;
  s3Prefix?: string;
}
export const S3ExportConfiguration = S.suspend(() =>
  S.Struct({
    roleName: S.String,
    diskImageFormat: DiskImageFormat,
    s3Bucket: S.String,
    s3Prefix: S.optional(S.String),
  }),
).annotate({
  identifier: "S3ExportConfiguration",
}) as any as S.Schema<S3ExportConfiguration>;
export interface FastLaunchSnapshotConfiguration {
  targetResourceCount?: number;
}
export const FastLaunchSnapshotConfiguration = S.suspend(() =>
  S.Struct({ targetResourceCount: S.optional(S.Number) }),
).annotate({
  identifier: "FastLaunchSnapshotConfiguration",
}) as any as S.Schema<FastLaunchSnapshotConfiguration>;
export interface FastLaunchLaunchTemplateSpecification {
  launchTemplateId?: string;
  launchTemplateName?: string;
  launchTemplateVersion?: string;
}
export const FastLaunchLaunchTemplateSpecification = S.suspend(() =>
  S.Struct({
    launchTemplateId: S.optional(S.String),
    launchTemplateName: S.optional(S.String),
    launchTemplateVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "FastLaunchLaunchTemplateSpecification",
}) as any as S.Schema<FastLaunchLaunchTemplateSpecification>;
export interface FastLaunchConfiguration {
  enabled: boolean;
  snapshotConfiguration?: FastLaunchSnapshotConfiguration;
  maxParallelLaunches?: number;
  launchTemplate?: FastLaunchLaunchTemplateSpecification;
  accountId?: string;
}
export const FastLaunchConfiguration = S.suspend(() =>
  S.Struct({
    enabled: S.Boolean,
    snapshotConfiguration: S.optional(FastLaunchSnapshotConfiguration),
    maxParallelLaunches: S.optional(S.Number),
    launchTemplate: S.optional(FastLaunchLaunchTemplateSpecification),
    accountId: S.optional(S.String),
  }),
).annotate({
  identifier: "FastLaunchConfiguration",
}) as any as S.Schema<FastLaunchConfiguration>;
export type FastLaunchConfigurationList = FastLaunchConfiguration[];
export const FastLaunchConfigurationList = S.Array(FastLaunchConfiguration);
export type SsmParameterDataType = "text" | "aws:ec2:image" | (string & {});
export const SsmParameterDataType = S.String;
export interface SsmParameterConfiguration {
  amiAccountId?: string;
  parameterName: string;
  dataType?: SsmParameterDataType;
}
export const SsmParameterConfiguration = S.suspend(() =>
  S.Struct({
    amiAccountId: S.optional(S.String),
    parameterName: S.String,
    dataType: S.optional(SsmParameterDataType),
  }),
).annotate({
  identifier: "SsmParameterConfiguration",
}) as any as S.Schema<SsmParameterConfiguration>;
export type SsmParameterConfigurationList = SsmParameterConfiguration[];
export const SsmParameterConfigurationList = S.Array(SsmParameterConfiguration);
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
export const Distribution = S.suspend(() =>
  S.Struct({
    region: S.String,
    amiDistributionConfiguration: S.optional(AmiDistributionConfiguration),
    containerDistributionConfiguration: S.optional(
      ContainerDistributionConfiguration,
    ),
    licenseConfigurationArns: S.optional(LicenseConfigurationArnList),
    launchTemplateConfigurations: S.optional(LaunchTemplateConfigurationList),
    s3ExportConfiguration: S.optional(S3ExportConfiguration),
    fastLaunchConfigurations: S.optional(FastLaunchConfigurationList),
    ssmParameterConfigurations: S.optional(SsmParameterConfigurationList),
  }),
).annotate({ identifier: "Distribution" }) as any as S.Schema<Distribution>;
export type DistributionList = Distribution[];
export const DistributionList = S.Array(Distribution);
export interface CreateDistributionConfigurationRequest {
  name: string;
  description?: string;
  distributions: Distribution[];
  tags?: { [key: string]: string | undefined };
  clientToken: string;
}
export const CreateDistributionConfigurationRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    distributions: DistributionList,
    tags: S.optional(TagMap),
    clientToken: S.String.pipe(T.IdempotencyToken()),
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
).annotate({
  identifier: "CreateDistributionConfigurationRequest",
}) as any as S.Schema<CreateDistributionConfigurationRequest>;
export interface CreateDistributionConfigurationResponse {
  requestId?: string;
  clientToken?: string;
  distributionConfigurationArn?: string;
}
export const CreateDistributionConfigurationResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    clientToken: S.optional(S.String),
    distributionConfigurationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateDistributionConfigurationResponse",
}) as any as S.Schema<CreateDistributionConfigurationResponse>;
export interface ImageTestsConfiguration {
  imageTestsEnabled?: boolean;
  timeoutMinutes?: number;
}
export const ImageTestsConfiguration = S.suspend(() =>
  S.Struct({
    imageTestsEnabled: S.optional(S.Boolean),
    timeoutMinutes: S.optional(S.Number),
  }),
).annotate({
  identifier: "ImageTestsConfiguration",
}) as any as S.Schema<ImageTestsConfiguration>;
export interface EcrConfiguration {
  repositoryName?: string;
  containerTags?: string[];
}
export const EcrConfiguration = S.suspend(() =>
  S.Struct({
    repositoryName: S.optional(S.String),
    containerTags: S.optional(StringList),
  }),
).annotate({
  identifier: "EcrConfiguration",
}) as any as S.Schema<EcrConfiguration>;
export interface ImageScanningConfiguration {
  imageScanningEnabled?: boolean;
  ecrConfiguration?: EcrConfiguration;
}
export const ImageScanningConfiguration = S.suspend(() =>
  S.Struct({
    imageScanningEnabled: S.optional(S.Boolean),
    ecrConfiguration: S.optional(EcrConfiguration),
  }),
).annotate({
  identifier: "ImageScanningConfiguration",
}) as any as S.Schema<ImageScanningConfiguration>;
export type WorkflowParameterValueList = string[];
export const WorkflowParameterValueList = S.Array(S.String);
export interface WorkflowParameter {
  name: string;
  value: string[];
}
export const WorkflowParameter = S.suspend(() =>
  S.Struct({ name: S.String, value: WorkflowParameterValueList }),
).annotate({
  identifier: "WorkflowParameter",
}) as any as S.Schema<WorkflowParameter>;
export type WorkflowParameterList = WorkflowParameter[];
export const WorkflowParameterList = S.Array(WorkflowParameter);
export type OnWorkflowFailure = "CONTINUE" | "ABORT" | (string & {});
export const OnWorkflowFailure = S.String;
export interface WorkflowConfiguration {
  workflowArn: string;
  parameters?: WorkflowParameter[];
  parallelGroup?: string;
  onFailure?: OnWorkflowFailure;
}
export const WorkflowConfiguration = S.suspend(() =>
  S.Struct({
    workflowArn: S.String,
    parameters: S.optional(WorkflowParameterList),
    parallelGroup: S.optional(S.String),
    onFailure: S.optional(OnWorkflowFailure),
  }),
).annotate({
  identifier: "WorkflowConfiguration",
}) as any as S.Schema<WorkflowConfiguration>;
export type WorkflowConfigurationList = WorkflowConfiguration[];
export const WorkflowConfigurationList = S.Array(WorkflowConfiguration);
export interface ImageLoggingConfiguration {
  logGroupName?: string;
}
export const ImageLoggingConfiguration = S.suspend(() =>
  S.Struct({ logGroupName: S.optional(S.String) }),
).annotate({
  identifier: "ImageLoggingConfiguration",
}) as any as S.Schema<ImageLoggingConfiguration>;
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
export const CreateImageRequest = S.suspend(() =>
  S.Struct({
    imageRecipeArn: S.optional(S.String),
    containerRecipeArn: S.optional(S.String),
    distributionConfigurationArn: S.optional(S.String),
    infrastructureConfigurationArn: S.String,
    imageTestsConfiguration: S.optional(ImageTestsConfiguration),
    enhancedImageMetadataEnabled: S.optional(S.Boolean),
    tags: S.optional(TagMap),
    clientToken: S.String.pipe(T.IdempotencyToken()),
    imageScanningConfiguration: S.optional(ImageScanningConfiguration),
    workflows: S.optional(WorkflowConfigurationList),
    executionRole: S.optional(S.String),
    loggingConfiguration: S.optional(ImageLoggingConfiguration),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/CreateImage" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateImageRequest",
}) as any as S.Schema<CreateImageRequest>;
export interface CreateImageResponse {
  requestId?: string;
  clientToken?: string;
  imageBuildVersionArn?: string;
  latestVersionReferences?: LatestVersionReferences;
}
export const CreateImageResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    clientToken: S.optional(S.String),
    imageBuildVersionArn: S.optional(S.String),
    latestVersionReferences: S.optional(LatestVersionReferences),
  }),
).annotate({
  identifier: "CreateImageResponse",
}) as any as S.Schema<CreateImageResponse>;
export type PipelineExecutionStartCondition =
  | "EXPRESSION_MATCH_ONLY"
  | "EXPRESSION_MATCH_AND_DEPENDENCY_UPDATES_AVAILABLE"
  | (string & {});
export const PipelineExecutionStartCondition = S.String;
export interface AutoDisablePolicy {
  failureCount: number;
}
export const AutoDisablePolicy = S.suspend(() =>
  S.Struct({ failureCount: S.Number }),
).annotate({
  identifier: "AutoDisablePolicy",
}) as any as S.Schema<AutoDisablePolicy>;
export interface Schedule {
  scheduleExpression?: string;
  timezone?: string;
  pipelineExecutionStartCondition?: PipelineExecutionStartCondition;
  autoDisablePolicy?: AutoDisablePolicy;
}
export const Schedule = S.suspend(() =>
  S.Struct({
    scheduleExpression: S.optional(S.String),
    timezone: S.optional(S.String),
    pipelineExecutionStartCondition: S.optional(
      PipelineExecutionStartCondition,
    ),
    autoDisablePolicy: S.optional(AutoDisablePolicy),
  }),
).annotate({ identifier: "Schedule" }) as any as S.Schema<Schedule>;
export type PipelineStatus = "DISABLED" | "ENABLED" | (string & {});
export const PipelineStatus = S.String;
export interface PipelineLoggingConfiguration {
  imageLogGroupName?: string;
  pipelineLogGroupName?: string;
}
export const PipelineLoggingConfiguration = S.suspend(() =>
  S.Struct({
    imageLogGroupName: S.optional(S.String),
    pipelineLogGroupName: S.optional(S.String),
  }),
).annotate({
  identifier: "PipelineLoggingConfiguration",
}) as any as S.Schema<PipelineLoggingConfiguration>;
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
  clientToken: string;
  imageScanningConfiguration?: ImageScanningConfiguration;
  workflows?: WorkflowConfiguration[];
  executionRole?: string;
  loggingConfiguration?: PipelineLoggingConfiguration;
}
export const CreateImagePipelineRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    imageRecipeArn: S.optional(S.String),
    containerRecipeArn: S.optional(S.String),
    infrastructureConfigurationArn: S.String,
    distributionConfigurationArn: S.optional(S.String),
    imageTestsConfiguration: S.optional(ImageTestsConfiguration),
    enhancedImageMetadataEnabled: S.optional(S.Boolean),
    schedule: S.optional(Schedule),
    status: S.optional(PipelineStatus),
    tags: S.optional(TagMap),
    clientToken: S.String.pipe(T.IdempotencyToken()),
    imageScanningConfiguration: S.optional(ImageScanningConfiguration),
    workflows: S.optional(WorkflowConfigurationList),
    executionRole: S.optional(S.String),
    loggingConfiguration: S.optional(PipelineLoggingConfiguration),
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
).annotate({
  identifier: "CreateImagePipelineRequest",
}) as any as S.Schema<CreateImagePipelineRequest>;
export interface CreateImagePipelineResponse {
  requestId?: string;
  clientToken?: string;
  imagePipelineArn?: string;
}
export const CreateImagePipelineResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    clientToken: S.optional(S.String),
    imagePipelineArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateImagePipelineResponse",
}) as any as S.Schema<CreateImagePipelineResponse>;
export interface SystemsManagerAgent {
  uninstallAfterBuild?: boolean;
}
export const SystemsManagerAgent = S.suspend(() =>
  S.Struct({ uninstallAfterBuild: S.optional(S.Boolean) }),
).annotate({
  identifier: "SystemsManagerAgent",
}) as any as S.Schema<SystemsManagerAgent>;
export interface AdditionalInstanceConfiguration {
  systemsManagerAgent?: SystemsManagerAgent;
  userDataOverride?: string;
}
export const AdditionalInstanceConfiguration = S.suspend(() =>
  S.Struct({
    systemsManagerAgent: S.optional(SystemsManagerAgent),
    userDataOverride: S.optional(S.String),
  }),
).annotate({
  identifier: "AdditionalInstanceConfiguration",
}) as any as S.Schema<AdditionalInstanceConfiguration>;
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
  clientToken: string;
}
export const CreateImageRecipeRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    semanticVersion: S.String,
    components: S.optional(ComponentConfigurationList),
    parentImage: S.String,
    blockDeviceMappings: S.optional(InstanceBlockDeviceMappings),
    tags: S.optional(TagMap),
    workingDirectory: S.optional(S.String),
    additionalInstanceConfiguration: S.optional(
      AdditionalInstanceConfiguration,
    ),
    amiTags: S.optional(TagMap),
    clientToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/CreateImageRecipe" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateImageRecipeRequest",
}) as any as S.Schema<CreateImageRecipeRequest>;
export interface CreateImageRecipeResponse {
  requestId?: string;
  clientToken?: string;
  imageRecipeArn?: string;
  latestVersionReferences?: LatestVersionReferences;
}
export const CreateImageRecipeResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    clientToken: S.optional(S.String),
    imageRecipeArn: S.optional(S.String),
    latestVersionReferences: S.optional(LatestVersionReferences),
  }),
).annotate({
  identifier: "CreateImageRecipeResponse",
}) as any as S.Schema<CreateImageRecipeResponse>;
export type InstanceTypeList = string[];
export const InstanceTypeList = S.Array(S.String);
export type SecurityGroupIds = string[];
export const SecurityGroupIds = S.Array(S.String);
export interface S3Logs {
  s3BucketName?: string;
  s3KeyPrefix?: string;
}
export const S3Logs = S.suspend(() =>
  S.Struct({
    s3BucketName: S.optional(S.String),
    s3KeyPrefix: S.optional(S.String),
  }),
).annotate({ identifier: "S3Logs" }) as any as S.Schema<S3Logs>;
export interface Logging {
  s3Logs?: S3Logs;
}
export const Logging = S.suspend(() =>
  S.Struct({ s3Logs: S.optional(S3Logs) }),
).annotate({ identifier: "Logging" }) as any as S.Schema<Logging>;
export type ResourceTagMap = { [key: string]: string | undefined };
export const ResourceTagMap = S.Record(S.String, S.String.pipe(S.optional));
export interface InstanceMetadataOptions {
  httpTokens?: string;
  httpPutResponseHopLimit?: number;
}
export const InstanceMetadataOptions = S.suspend(() =>
  S.Struct({
    httpTokens: S.optional(S.String),
    httpPutResponseHopLimit: S.optional(S.Number),
  }),
).annotate({
  identifier: "InstanceMetadataOptions",
}) as any as S.Schema<InstanceMetadataOptions>;
export type TenancyType = "default" | "dedicated" | "host" | (string & {});
export const TenancyType = S.String;
export interface Placement {
  availabilityZone?: string;
  tenancy?: TenancyType;
  hostId?: string;
  hostResourceGroupArn?: string;
}
export const Placement = S.suspend(() =>
  S.Struct({
    availabilityZone: S.optional(S.String),
    tenancy: S.optional(TenancyType),
    hostId: S.optional(S.String),
    hostResourceGroupArn: S.optional(S.String),
  }),
).annotate({ identifier: "Placement" }) as any as S.Schema<Placement>;
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
export const CreateInfrastructureConfigurationRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    instanceTypes: S.optional(InstanceTypeList),
    instanceProfileName: S.String,
    securityGroupIds: S.optional(SecurityGroupIds),
    subnetId: S.optional(S.String),
    logging: S.optional(Logging),
    keyPair: S.optional(S.String),
    terminateInstanceOnFailure: S.optional(S.Boolean),
    snsTopicArn: S.optional(S.String),
    resourceTags: S.optional(ResourceTagMap),
    instanceMetadataOptions: S.optional(InstanceMetadataOptions),
    tags: S.optional(TagMap),
    placement: S.optional(Placement),
    clientToken: S.String.pipe(T.IdempotencyToken()),
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
).annotate({
  identifier: "CreateInfrastructureConfigurationRequest",
}) as any as S.Schema<CreateInfrastructureConfigurationRequest>;
export interface CreateInfrastructureConfigurationResponse {
  requestId?: string;
  clientToken?: string;
  infrastructureConfigurationArn?: string;
}
export const CreateInfrastructureConfigurationResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    clientToken: S.optional(S.String),
    infrastructureConfigurationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateInfrastructureConfigurationResponse",
}) as any as S.Schema<CreateInfrastructureConfigurationResponse>;
export type LifecyclePolicyStatus = "DISABLED" | "ENABLED" | (string & {});
export const LifecyclePolicyStatus = S.String;
export type LifecyclePolicyResourceType =
  | "AMI_IMAGE"
  | "CONTAINER_IMAGE"
  | (string & {});
export const LifecyclePolicyResourceType = S.String;
export type LifecyclePolicyDetailActionType =
  | "DELETE"
  | "DEPRECATE"
  | "DISABLE"
  | (string & {});
export const LifecyclePolicyDetailActionType = S.String;
export interface LifecyclePolicyDetailActionIncludeResources {
  amis?: boolean;
  snapshots?: boolean;
  containers?: boolean;
}
export const LifecyclePolicyDetailActionIncludeResources = S.suspend(() =>
  S.Struct({
    amis: S.optional(S.Boolean),
    snapshots: S.optional(S.Boolean),
    containers: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "LifecyclePolicyDetailActionIncludeResources",
}) as any as S.Schema<LifecyclePolicyDetailActionIncludeResources>;
export interface LifecyclePolicyDetailAction {
  type: LifecyclePolicyDetailActionType;
  includeResources?: LifecyclePolicyDetailActionIncludeResources;
}
export const LifecyclePolicyDetailAction = S.suspend(() =>
  S.Struct({
    type: LifecyclePolicyDetailActionType,
    includeResources: S.optional(LifecyclePolicyDetailActionIncludeResources),
  }),
).annotate({
  identifier: "LifecyclePolicyDetailAction",
}) as any as S.Schema<LifecyclePolicyDetailAction>;
export type LifecyclePolicyDetailFilterType = "AGE" | "COUNT" | (string & {});
export const LifecyclePolicyDetailFilterType = S.String;
export type LifecyclePolicyTimeUnit =
  | "DAYS"
  | "WEEKS"
  | "MONTHS"
  | "YEARS"
  | (string & {});
export const LifecyclePolicyTimeUnit = S.String;
export interface LifecyclePolicyDetailFilter {
  type: LifecyclePolicyDetailFilterType;
  value: number;
  unit?: LifecyclePolicyTimeUnit;
  retainAtLeast?: number;
}
export const LifecyclePolicyDetailFilter = S.suspend(() =>
  S.Struct({
    type: LifecyclePolicyDetailFilterType,
    value: S.Number,
    unit: S.optional(LifecyclePolicyTimeUnit),
    retainAtLeast: S.optional(S.Number),
  }),
).annotate({
  identifier: "LifecyclePolicyDetailFilter",
}) as any as S.Schema<LifecyclePolicyDetailFilter>;
export interface LifecyclePolicyDetailExclusionRulesAmisLastLaunched {
  value: number;
  unit: LifecyclePolicyTimeUnit;
}
export const LifecyclePolicyDetailExclusionRulesAmisLastLaunched = S.suspend(
  () => S.Struct({ value: S.Number, unit: LifecyclePolicyTimeUnit }),
).annotate({
  identifier: "LifecyclePolicyDetailExclusionRulesAmisLastLaunched",
}) as any as S.Schema<LifecyclePolicyDetailExclusionRulesAmisLastLaunched>;
export interface LifecyclePolicyDetailExclusionRulesAmis {
  isPublic?: boolean;
  regions?: string[];
  sharedAccounts?: string[];
  lastLaunched?: LifecyclePolicyDetailExclusionRulesAmisLastLaunched;
  tagMap?: { [key: string]: string | undefined };
}
export const LifecyclePolicyDetailExclusionRulesAmis = S.suspend(() =>
  S.Struct({
    isPublic: S.optional(S.Boolean),
    regions: S.optional(StringList),
    sharedAccounts: S.optional(AccountList),
    lastLaunched: S.optional(
      LifecyclePolicyDetailExclusionRulesAmisLastLaunched,
    ),
    tagMap: S.optional(TagMap),
  }),
).annotate({
  identifier: "LifecyclePolicyDetailExclusionRulesAmis",
}) as any as S.Schema<LifecyclePolicyDetailExclusionRulesAmis>;
export interface LifecyclePolicyDetailExclusionRules {
  tagMap?: { [key: string]: string | undefined };
  amis?: LifecyclePolicyDetailExclusionRulesAmis;
}
export const LifecyclePolicyDetailExclusionRules = S.suspend(() =>
  S.Struct({
    tagMap: S.optional(TagMap),
    amis: S.optional(LifecyclePolicyDetailExclusionRulesAmis),
  }),
).annotate({
  identifier: "LifecyclePolicyDetailExclusionRules",
}) as any as S.Schema<LifecyclePolicyDetailExclusionRules>;
export interface LifecyclePolicyDetail {
  action: LifecyclePolicyDetailAction;
  filter: LifecyclePolicyDetailFilter;
  exclusionRules?: LifecyclePolicyDetailExclusionRules;
}
export const LifecyclePolicyDetail = S.suspend(() =>
  S.Struct({
    action: LifecyclePolicyDetailAction,
    filter: LifecyclePolicyDetailFilter,
    exclusionRules: S.optional(LifecyclePolicyDetailExclusionRules),
  }),
).annotate({
  identifier: "LifecyclePolicyDetail",
}) as any as S.Schema<LifecyclePolicyDetail>;
export type LifecyclePolicyDetails = LifecyclePolicyDetail[];
export const LifecyclePolicyDetails = S.Array(LifecyclePolicyDetail);
export interface LifecyclePolicyResourceSelectionRecipe {
  name: string;
  semanticVersion: string;
}
export const LifecyclePolicyResourceSelectionRecipe = S.suspend(() =>
  S.Struct({ name: S.String, semanticVersion: S.String }),
).annotate({
  identifier: "LifecyclePolicyResourceSelectionRecipe",
}) as any as S.Schema<LifecyclePolicyResourceSelectionRecipe>;
export type LifecyclePolicyResourceSelectionRecipes =
  LifecyclePolicyResourceSelectionRecipe[];
export const LifecyclePolicyResourceSelectionRecipes = S.Array(
  LifecyclePolicyResourceSelectionRecipe,
);
export interface LifecyclePolicyResourceSelection {
  recipes?: LifecyclePolicyResourceSelectionRecipe[];
  tagMap?: { [key: string]: string | undefined };
}
export const LifecyclePolicyResourceSelection = S.suspend(() =>
  S.Struct({
    recipes: S.optional(LifecyclePolicyResourceSelectionRecipes),
    tagMap: S.optional(TagMap),
  }),
).annotate({
  identifier: "LifecyclePolicyResourceSelection",
}) as any as S.Schema<LifecyclePolicyResourceSelection>;
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
export const CreateLifecyclePolicyRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    status: S.optional(LifecyclePolicyStatus),
    executionRole: S.String,
    resourceType: LifecyclePolicyResourceType,
    policyDetails: LifecyclePolicyDetails,
    resourceSelection: LifecyclePolicyResourceSelection,
    tags: S.optional(TagMap),
    clientToken: S.String.pipe(T.IdempotencyToken()),
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
).annotate({
  identifier: "CreateLifecyclePolicyRequest",
}) as any as S.Schema<CreateLifecyclePolicyRequest>;
export interface CreateLifecyclePolicyResponse {
  clientToken?: string;
  lifecyclePolicyArn?: string;
}
export const CreateLifecyclePolicyResponse = S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String),
    lifecyclePolicyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateLifecyclePolicyResponse",
}) as any as S.Schema<CreateLifecyclePolicyResponse>;
export type WorkflowType = "BUILD" | "TEST" | "DISTRIBUTION" | (string & {});
export const WorkflowType = S.String;
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
export const CreateWorkflowRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    semanticVersion: S.String,
    description: S.optional(S.String),
    changeDescription: S.optional(S.String),
    data: S.optional(S.String),
    uri: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
    tags: S.optional(TagMap),
    clientToken: S.String.pipe(T.IdempotencyToken()),
    type: WorkflowType,
    dryRun: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/CreateWorkflow" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateWorkflowRequest",
}) as any as S.Schema<CreateWorkflowRequest>;
export interface CreateWorkflowResponse {
  clientToken?: string;
  workflowBuildVersionArn?: string;
  latestVersionReferences?: LatestVersionReferences;
}
export const CreateWorkflowResponse = S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String),
    workflowBuildVersionArn: S.optional(S.String),
    latestVersionReferences: S.optional(LatestVersionReferences),
  }),
).annotate({
  identifier: "CreateWorkflowResponse",
}) as any as S.Schema<CreateWorkflowResponse>;
export interface DeleteComponentRequest {
  componentBuildVersionArn: string;
}
export const DeleteComponentRequest = S.suspend(() =>
  S.Struct({
    componentBuildVersionArn: S.String.pipe(
      T.HttpQuery("componentBuildVersionArn"),
    ),
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
).annotate({
  identifier: "DeleteComponentRequest",
}) as any as S.Schema<DeleteComponentRequest>;
export interface DeleteComponentResponse {
  requestId?: string;
  componentBuildVersionArn?: string;
}
export const DeleteComponentResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    componentBuildVersionArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteComponentResponse",
}) as any as S.Schema<DeleteComponentResponse>;
export interface DeleteContainerRecipeRequest {
  containerRecipeArn: string;
}
export const DeleteContainerRecipeRequest = S.suspend(() =>
  S.Struct({
    containerRecipeArn: S.String.pipe(T.HttpQuery("containerRecipeArn")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/DeleteContainerRecipe" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteContainerRecipeRequest",
}) as any as S.Schema<DeleteContainerRecipeRequest>;
export interface DeleteContainerRecipeResponse {
  requestId?: string;
  containerRecipeArn?: string;
}
export const DeleteContainerRecipeResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    containerRecipeArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteContainerRecipeResponse",
}) as any as S.Schema<DeleteContainerRecipeResponse>;
export interface DeleteDistributionConfigurationRequest {
  distributionConfigurationArn: string;
}
export const DeleteDistributionConfigurationRequest = S.suspend(() =>
  S.Struct({
    distributionConfigurationArn: S.String.pipe(
      T.HttpQuery("distributionConfigurationArn"),
    ),
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
).annotate({
  identifier: "DeleteDistributionConfigurationRequest",
}) as any as S.Schema<DeleteDistributionConfigurationRequest>;
export interface DeleteDistributionConfigurationResponse {
  requestId?: string;
  distributionConfigurationArn?: string;
}
export const DeleteDistributionConfigurationResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    distributionConfigurationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteDistributionConfigurationResponse",
}) as any as S.Schema<DeleteDistributionConfigurationResponse>;
export interface DeleteImageRequest {
  imageBuildVersionArn: string;
}
export const DeleteImageRequest = S.suspend(() =>
  S.Struct({
    imageBuildVersionArn: S.String.pipe(T.HttpQuery("imageBuildVersionArn")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/DeleteImage" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteImageRequest",
}) as any as S.Schema<DeleteImageRequest>;
export interface DeleteImageResponse {
  requestId?: string;
  imageBuildVersionArn?: string;
}
export const DeleteImageResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    imageBuildVersionArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteImageResponse",
}) as any as S.Schema<DeleteImageResponse>;
export interface DeleteImagePipelineRequest {
  imagePipelineArn: string;
}
export const DeleteImagePipelineRequest = S.suspend(() =>
  S.Struct({
    imagePipelineArn: S.String.pipe(T.HttpQuery("imagePipelineArn")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/DeleteImagePipeline" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteImagePipelineRequest",
}) as any as S.Schema<DeleteImagePipelineRequest>;
export interface DeleteImagePipelineResponse {
  requestId?: string;
  imagePipelineArn?: string;
}
export const DeleteImagePipelineResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    imagePipelineArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteImagePipelineResponse",
}) as any as S.Schema<DeleteImagePipelineResponse>;
export interface DeleteImageRecipeRequest {
  imageRecipeArn: string;
}
export const DeleteImageRecipeRequest = S.suspend(() =>
  S.Struct({
    imageRecipeArn: S.String.pipe(T.HttpQuery("imageRecipeArn")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/DeleteImageRecipe" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteImageRecipeRequest",
}) as any as S.Schema<DeleteImageRecipeRequest>;
export interface DeleteImageRecipeResponse {
  requestId?: string;
  imageRecipeArn?: string;
}
export const DeleteImageRecipeResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    imageRecipeArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteImageRecipeResponse",
}) as any as S.Schema<DeleteImageRecipeResponse>;
export interface DeleteInfrastructureConfigurationRequest {
  infrastructureConfigurationArn: string;
}
export const DeleteInfrastructureConfigurationRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteInfrastructureConfigurationRequest",
}) as any as S.Schema<DeleteInfrastructureConfigurationRequest>;
export interface DeleteInfrastructureConfigurationResponse {
  requestId?: string;
  infrastructureConfigurationArn?: string;
}
export const DeleteInfrastructureConfigurationResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    infrastructureConfigurationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteInfrastructureConfigurationResponse",
}) as any as S.Schema<DeleteInfrastructureConfigurationResponse>;
export interface DeleteLifecyclePolicyRequest {
  lifecyclePolicyArn: string;
}
export const DeleteLifecyclePolicyRequest = S.suspend(() =>
  S.Struct({
    lifecyclePolicyArn: S.String.pipe(T.HttpQuery("lifecyclePolicyArn")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/DeleteLifecyclePolicy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteLifecyclePolicyRequest",
}) as any as S.Schema<DeleteLifecyclePolicyRequest>;
export interface DeleteLifecyclePolicyResponse {
  lifecyclePolicyArn?: string;
}
export const DeleteLifecyclePolicyResponse = S.suspend(() =>
  S.Struct({ lifecyclePolicyArn: S.optional(S.String) }),
).annotate({
  identifier: "DeleteLifecyclePolicyResponse",
}) as any as S.Schema<DeleteLifecyclePolicyResponse>;
export interface DeleteWorkflowRequest {
  workflowBuildVersionArn: string;
}
export const DeleteWorkflowRequest = S.suspend(() =>
  S.Struct({
    workflowBuildVersionArn: S.String.pipe(
      T.HttpQuery("workflowBuildVersionArn"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/DeleteWorkflow" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteWorkflowRequest",
}) as any as S.Schema<DeleteWorkflowRequest>;
export interface DeleteWorkflowResponse {
  workflowBuildVersionArn?: string;
}
export const DeleteWorkflowResponse = S.suspend(() =>
  S.Struct({ workflowBuildVersionArn: S.optional(S.String) }),
).annotate({
  identifier: "DeleteWorkflowResponse",
}) as any as S.Schema<DeleteWorkflowResponse>;
export interface DistributeImageRequest {
  sourceImage: string;
  distributionConfigurationArn: string;
  executionRole: string;
  tags?: { [key: string]: string | undefined };
  clientToken: string;
  loggingConfiguration?: ImageLoggingConfiguration;
}
export const DistributeImageRequest = S.suspend(() =>
  S.Struct({
    sourceImage: S.String,
    distributionConfigurationArn: S.String,
    executionRole: S.String,
    tags: S.optional(TagMap),
    clientToken: S.String.pipe(T.IdempotencyToken()),
    loggingConfiguration: S.optional(ImageLoggingConfiguration),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/DistributeImage" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DistributeImageRequest",
}) as any as S.Schema<DistributeImageRequest>;
export interface DistributeImageResponse {
  clientToken?: string;
  imageBuildVersionArn?: string;
}
export const DistributeImageResponse = S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String),
    imageBuildVersionArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DistributeImageResponse",
}) as any as S.Schema<DistributeImageResponse>;
export interface GetComponentRequest {
  componentBuildVersionArn: string;
}
export const GetComponentRequest = S.suspend(() =>
  S.Struct({
    componentBuildVersionArn: S.String.pipe(
      T.HttpQuery("componentBuildVersionArn"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/GetComponent" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetComponentRequest",
}) as any as S.Schema<GetComponentRequest>;
export type ComponentType = "BUILD" | "TEST" | (string & {});
export const ComponentType = S.String;
export type ComponentStatus =
  | "DEPRECATED"
  | "DISABLED"
  | "ACTIVE"
  | (string & {});
export const ComponentStatus = S.String;
export interface ComponentState {
  status?: ComponentStatus;
  reason?: string;
}
export const ComponentState = S.suspend(() =>
  S.Struct({
    status: S.optional(ComponentStatus),
    reason: S.optional(S.String),
  }),
).annotate({ identifier: "ComponentState" }) as any as S.Schema<ComponentState>;
export interface ComponentParameterDetail {
  name: string;
  type: string;
  defaultValue?: string[];
  description?: string;
}
export const ComponentParameterDetail = S.suspend(() =>
  S.Struct({
    name: S.String,
    type: S.String,
    defaultValue: S.optional(ComponentParameterValueList),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "ComponentParameterDetail",
}) as any as S.Schema<ComponentParameterDetail>;
export type ComponentParameterDetailList = ComponentParameterDetail[];
export const ComponentParameterDetailList = S.Array(ComponentParameterDetail);
export type ProductCodeType = "marketplace" | (string & {});
export const ProductCodeType = S.String;
export interface ProductCodeListItem {
  productCodeId: string;
  productCodeType: ProductCodeType;
}
export const ProductCodeListItem = S.suspend(() =>
  S.Struct({ productCodeId: S.String, productCodeType: ProductCodeType }),
).annotate({
  identifier: "ProductCodeListItem",
}) as any as S.Schema<ProductCodeListItem>;
export type ProductCodeList = ProductCodeListItem[];
export const ProductCodeList = S.Array(ProductCodeListItem);
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
export const Component = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    version: S.optional(S.String),
    description: S.optional(S.String),
    changeDescription: S.optional(S.String),
    type: S.optional(ComponentType),
    platform: S.optional(Platform),
    supportedOsVersions: S.optional(OsVersionList),
    state: S.optional(ComponentState),
    parameters: S.optional(ComponentParameterDetailList),
    owner: S.optional(S.String),
    data: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
    encrypted: S.optional(S.Boolean),
    dateCreated: S.optional(S.String),
    tags: S.optional(TagMap),
    publisher: S.optional(S.String),
    obfuscate: S.optional(S.Boolean),
    productCodes: S.optional(ProductCodeList),
  }),
).annotate({ identifier: "Component" }) as any as S.Schema<Component>;
export interface GetComponentResponse {
  requestId?: string;
  component?: Component;
  latestVersionReferences?: LatestVersionReferences;
}
export const GetComponentResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    component: S.optional(Component),
    latestVersionReferences: S.optional(LatestVersionReferences),
  }),
).annotate({
  identifier: "GetComponentResponse",
}) as any as S.Schema<GetComponentResponse>;
export interface GetComponentPolicyRequest {
  componentArn: string;
}
export const GetComponentPolicyRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetComponentPolicyRequest",
}) as any as S.Schema<GetComponentPolicyRequest>;
export interface GetComponentPolicyResponse {
  requestId?: string;
  policy?: string;
}
export const GetComponentPolicyResponse = S.suspend(() =>
  S.Struct({ requestId: S.optional(S.String), policy: S.optional(S.String) }),
).annotate({
  identifier: "GetComponentPolicyResponse",
}) as any as S.Schema<GetComponentPolicyResponse>;
export interface GetContainerRecipeRequest {
  containerRecipeArn: string;
}
export const GetContainerRecipeRequest = S.suspend(() =>
  S.Struct({
    containerRecipeArn: S.String.pipe(T.HttpQuery("containerRecipeArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/GetContainerRecipe" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetContainerRecipeRequest",
}) as any as S.Schema<GetContainerRecipeRequest>;
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
export const ContainerRecipe = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    containerType: S.optional(ContainerType),
    name: S.optional(S.String),
    description: S.optional(S.String),
    platform: S.optional(Platform),
    owner: S.optional(S.String),
    version: S.optional(S.String),
    components: S.optional(ComponentConfigurationList),
    instanceConfiguration: S.optional(InstanceConfiguration),
    dockerfileTemplateData: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
    encrypted: S.optional(S.Boolean),
    parentImage: S.optional(S.String),
    dateCreated: S.optional(S.String),
    tags: S.optional(TagMap),
    workingDirectory: S.optional(S.String),
    targetRepository: S.optional(TargetContainerRepository),
  }),
).annotate({
  identifier: "ContainerRecipe",
}) as any as S.Schema<ContainerRecipe>;
export interface GetContainerRecipeResponse {
  requestId?: string;
  containerRecipe?: ContainerRecipe;
  latestVersionReferences?: LatestVersionReferences;
}
export const GetContainerRecipeResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    containerRecipe: S.optional(ContainerRecipe),
    latestVersionReferences: S.optional(LatestVersionReferences),
  }),
).annotate({
  identifier: "GetContainerRecipeResponse",
}) as any as S.Schema<GetContainerRecipeResponse>;
export interface GetContainerRecipePolicyRequest {
  containerRecipeArn: string;
}
export const GetContainerRecipePolicyRequest = S.suspend(() =>
  S.Struct({
    containerRecipeArn: S.String.pipe(T.HttpQuery("containerRecipeArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/GetContainerRecipePolicy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetContainerRecipePolicyRequest",
}) as any as S.Schema<GetContainerRecipePolicyRequest>;
export interface GetContainerRecipePolicyResponse {
  requestId?: string;
  policy?: string;
}
export const GetContainerRecipePolicyResponse = S.suspend(() =>
  S.Struct({ requestId: S.optional(S.String), policy: S.optional(S.String) }),
).annotate({
  identifier: "GetContainerRecipePolicyResponse",
}) as any as S.Schema<GetContainerRecipePolicyResponse>;
export interface GetDistributionConfigurationRequest {
  distributionConfigurationArn: string;
}
export const GetDistributionConfigurationRequest = S.suspend(() =>
  S.Struct({
    distributionConfigurationArn: S.String.pipe(
      T.HttpQuery("distributionConfigurationArn"),
    ),
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
).annotate({
  identifier: "GetDistributionConfigurationRequest",
}) as any as S.Schema<GetDistributionConfigurationRequest>;
export interface DistributionConfiguration {
  arn?: string;
  name?: string;
  description?: string;
  distributions?: Distribution[];
  timeoutMinutes: number;
  dateCreated?: string;
  dateUpdated?: string;
  tags?: { [key: string]: string | undefined };
}
export const DistributionConfiguration = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    distributions: S.optional(DistributionList),
    timeoutMinutes: S.Number,
    dateCreated: S.optional(S.String),
    dateUpdated: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "DistributionConfiguration",
}) as any as S.Schema<DistributionConfiguration>;
export interface GetDistributionConfigurationResponse {
  requestId?: string;
  distributionConfiguration?: DistributionConfiguration;
}
export const GetDistributionConfigurationResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    distributionConfiguration: S.optional(DistributionConfiguration),
  }),
).annotate({
  identifier: "GetDistributionConfigurationResponse",
}) as any as S.Schema<GetDistributionConfigurationResponse>;
export interface GetImageRequest {
  imageBuildVersionArn: string;
}
export const GetImageRequest = S.suspend(() =>
  S.Struct({
    imageBuildVersionArn: S.String.pipe(T.HttpQuery("imageBuildVersionArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/GetImage" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetImageRequest",
}) as any as S.Schema<GetImageRequest>;
export type ImageType = "AMI" | "DOCKER" | (string & {});
export const ImageType = S.String;
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
export const ImageStatus = S.String;
export interface ImageState {
  status?: ImageStatus;
  reason?: string;
}
export const ImageState = S.suspend(() =>
  S.Struct({ status: S.optional(ImageStatus), reason: S.optional(S.String) }),
).annotate({ identifier: "ImageState" }) as any as S.Schema<ImageState>;
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
}
export const ImageRecipe = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    type: S.optional(ImageType),
    name: S.optional(S.String),
    description: S.optional(S.String),
    platform: S.optional(Platform),
    owner: S.optional(S.String),
    version: S.optional(S.String),
    components: S.optional(ComponentConfigurationList),
    parentImage: S.optional(S.String),
    blockDeviceMappings: S.optional(InstanceBlockDeviceMappings),
    dateCreated: S.optional(S.String),
    tags: S.optional(TagMap),
    workingDirectory: S.optional(S.String),
    additionalInstanceConfiguration: S.optional(
      AdditionalInstanceConfiguration,
    ),
    amiTags: S.optional(TagMap),
  }),
).annotate({ identifier: "ImageRecipe" }) as any as S.Schema<ImageRecipe>;
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
export const InfrastructureConfiguration = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    instanceTypes: S.optional(InstanceTypeList),
    instanceProfileName: S.optional(S.String),
    securityGroupIds: S.optional(SecurityGroupIds),
    subnetId: S.optional(S.String),
    logging: S.optional(Logging),
    keyPair: S.optional(S.String),
    terminateInstanceOnFailure: S.optional(S.Boolean),
    snsTopicArn: S.optional(S.String),
    dateCreated: S.optional(S.String),
    dateUpdated: S.optional(S.String),
    resourceTags: S.optional(ResourceTagMap),
    instanceMetadataOptions: S.optional(InstanceMetadataOptions),
    tags: S.optional(TagMap),
    placement: S.optional(Placement),
  }),
).annotate({
  identifier: "InfrastructureConfiguration",
}) as any as S.Schema<InfrastructureConfiguration>;
export interface Ami {
  region?: string;
  image?: string;
  name?: string;
  description?: string;
  state?: ImageState;
  accountId?: string;
}
export const Ami = S.suspend(() =>
  S.Struct({
    region: S.optional(S.String),
    image: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    state: S.optional(ImageState),
    accountId: S.optional(S.String),
  }),
).annotate({ identifier: "Ami" }) as any as S.Schema<Ami>;
export type AmiList = Ami[];
export const AmiList = S.Array(Ami);
export interface Container {
  region?: string;
  imageUris?: string[];
}
export const Container = S.suspend(() =>
  S.Struct({ region: S.optional(S.String), imageUris: S.optional(StringList) }),
).annotate({ identifier: "Container" }) as any as S.Schema<Container>;
export type ContainerList = Container[];
export const ContainerList = S.Array(Container);
export interface OutputResources {
  amis?: Ami[];
  containers?: Container[];
}
export const OutputResources = S.suspend(() =>
  S.Struct({
    amis: S.optional(AmiList),
    containers: S.optional(ContainerList),
  }),
).annotate({
  identifier: "OutputResources",
}) as any as S.Schema<OutputResources>;
export type BuildType =
  | "USER_INITIATED"
  | "SCHEDULED"
  | "IMPORT"
  | "IMPORT_ISO"
  | (string & {});
export const BuildType = S.String;
export type ImageSource =
  | "AMAZON_MANAGED"
  | "AWS_MARKETPLACE"
  | "IMPORTED"
  | "CUSTOM"
  | (string & {});
export const ImageSource = S.String;
export type ImageScanStatus =
  | "PENDING"
  | "SCANNING"
  | "COLLECTING"
  | "COMPLETED"
  | "ABANDONED"
  | "FAILED"
  | "TIMED_OUT"
  | (string & {});
export const ImageScanStatus = S.String;
export interface ImageScanState {
  status?: ImageScanStatus;
  reason?: string;
}
export const ImageScanState = S.suspend(() =>
  S.Struct({
    status: S.optional(ImageScanStatus),
    reason: S.optional(S.String),
  }),
).annotate({ identifier: "ImageScanState" }) as any as S.Schema<ImageScanState>;
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
export const Image = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    type: S.optional(ImageType),
    name: S.optional(S.String),
    version: S.optional(S.String),
    platform: S.optional(Platform),
    enhancedImageMetadataEnabled: S.optional(S.Boolean),
    osVersion: S.optional(S.String),
    state: S.optional(ImageState),
    imageRecipe: S.optional(ImageRecipe),
    containerRecipe: S.optional(ContainerRecipe),
    sourcePipelineName: S.optional(S.String),
    sourcePipelineArn: S.optional(S.String),
    infrastructureConfiguration: S.optional(InfrastructureConfiguration),
    distributionConfiguration: S.optional(DistributionConfiguration),
    imageTestsConfiguration: S.optional(ImageTestsConfiguration),
    dateCreated: S.optional(S.String),
    outputResources: S.optional(OutputResources),
    tags: S.optional(TagMap),
    buildType: S.optional(BuildType),
    imageSource: S.optional(ImageSource),
    scanState: S.optional(ImageScanState),
    imageScanningConfiguration: S.optional(ImageScanningConfiguration),
    deprecationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lifecycleExecutionId: S.optional(S.String),
    executionRole: S.optional(S.String),
    workflows: S.optional(WorkflowConfigurationList),
    loggingConfiguration: S.optional(ImageLoggingConfiguration),
  }),
).annotate({ identifier: "Image" }) as any as S.Schema<Image>;
export interface GetImageResponse {
  requestId?: string;
  image?: Image;
  latestVersionReferences?: LatestVersionReferences;
}
export const GetImageResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    image: S.optional(Image),
    latestVersionReferences: S.optional(LatestVersionReferences),
  }),
).annotate({
  identifier: "GetImageResponse",
}) as any as S.Schema<GetImageResponse>;
export interface GetImagePipelineRequest {
  imagePipelineArn: string;
}
export const GetImagePipelineRequest = S.suspend(() =>
  S.Struct({
    imagePipelineArn: S.String.pipe(T.HttpQuery("imagePipelineArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/GetImagePipeline" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetImagePipelineRequest",
}) as any as S.Schema<GetImagePipelineRequest>;
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
  executionRole?: string;
  workflows?: WorkflowConfiguration[];
  loggingConfiguration?: PipelineLoggingConfiguration;
  consecutiveFailures?: number;
}
export const ImagePipeline = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    platform: S.optional(Platform),
    enhancedImageMetadataEnabled: S.optional(S.Boolean),
    imageRecipeArn: S.optional(S.String),
    containerRecipeArn: S.optional(S.String),
    infrastructureConfigurationArn: S.optional(S.String),
    distributionConfigurationArn: S.optional(S.String),
    imageTestsConfiguration: S.optional(ImageTestsConfiguration),
    schedule: S.optional(Schedule),
    status: S.optional(PipelineStatus),
    dateCreated: S.optional(S.String),
    dateUpdated: S.optional(S.String),
    dateLastRun: S.optional(S.String),
    lastRunStatus: S.optional(ImageStatus),
    dateNextRun: S.optional(S.String),
    tags: S.optional(TagMap),
    imageScanningConfiguration: S.optional(ImageScanningConfiguration),
    executionRole: S.optional(S.String),
    workflows: S.optional(WorkflowConfigurationList),
    loggingConfiguration: S.optional(PipelineLoggingConfiguration),
    consecutiveFailures: S.optional(S.Number),
  }),
).annotate({ identifier: "ImagePipeline" }) as any as S.Schema<ImagePipeline>;
export interface GetImagePipelineResponse {
  requestId?: string;
  imagePipeline?: ImagePipeline;
}
export const GetImagePipelineResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    imagePipeline: S.optional(ImagePipeline),
  }),
).annotate({
  identifier: "GetImagePipelineResponse",
}) as any as S.Schema<GetImagePipelineResponse>;
export interface GetImagePolicyRequest {
  imageArn: string;
}
export const GetImagePolicyRequest = S.suspend(() =>
  S.Struct({ imageArn: S.String.pipe(T.HttpQuery("imageArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/GetImagePolicy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetImagePolicyRequest",
}) as any as S.Schema<GetImagePolicyRequest>;
export interface GetImagePolicyResponse {
  requestId?: string;
  policy?: string;
}
export const GetImagePolicyResponse = S.suspend(() =>
  S.Struct({ requestId: S.optional(S.String), policy: S.optional(S.String) }),
).annotate({
  identifier: "GetImagePolicyResponse",
}) as any as S.Schema<GetImagePolicyResponse>;
export interface GetImageRecipeRequest {
  imageRecipeArn: string;
}
export const GetImageRecipeRequest = S.suspend(() =>
  S.Struct({
    imageRecipeArn: S.String.pipe(T.HttpQuery("imageRecipeArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/GetImageRecipe" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetImageRecipeRequest",
}) as any as S.Schema<GetImageRecipeRequest>;
export interface GetImageRecipeResponse {
  requestId?: string;
  imageRecipe?: ImageRecipe;
  latestVersionReferences?: LatestVersionReferences;
}
export const GetImageRecipeResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    imageRecipe: S.optional(ImageRecipe),
    latestVersionReferences: S.optional(LatestVersionReferences),
  }),
).annotate({
  identifier: "GetImageRecipeResponse",
}) as any as S.Schema<GetImageRecipeResponse>;
export interface GetImageRecipePolicyRequest {
  imageRecipeArn: string;
}
export const GetImageRecipePolicyRequest = S.suspend(() =>
  S.Struct({
    imageRecipeArn: S.String.pipe(T.HttpQuery("imageRecipeArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/GetImageRecipePolicy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetImageRecipePolicyRequest",
}) as any as S.Schema<GetImageRecipePolicyRequest>;
export interface GetImageRecipePolicyResponse {
  requestId?: string;
  policy?: string;
}
export const GetImageRecipePolicyResponse = S.suspend(() =>
  S.Struct({ requestId: S.optional(S.String), policy: S.optional(S.String) }),
).annotate({
  identifier: "GetImageRecipePolicyResponse",
}) as any as S.Schema<GetImageRecipePolicyResponse>;
export interface GetInfrastructureConfigurationRequest {
  infrastructureConfigurationArn: string;
}
export const GetInfrastructureConfigurationRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetInfrastructureConfigurationRequest",
}) as any as S.Schema<GetInfrastructureConfigurationRequest>;
export interface GetInfrastructureConfigurationResponse {
  requestId?: string;
  infrastructureConfiguration?: InfrastructureConfiguration;
}
export const GetInfrastructureConfigurationResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    infrastructureConfiguration: S.optional(InfrastructureConfiguration),
  }),
).annotate({
  identifier: "GetInfrastructureConfigurationResponse",
}) as any as S.Schema<GetInfrastructureConfigurationResponse>;
export interface GetLifecycleExecutionRequest {
  lifecycleExecutionId: string;
}
export const GetLifecycleExecutionRequest = S.suspend(() =>
  S.Struct({
    lifecycleExecutionId: S.String.pipe(T.HttpQuery("lifecycleExecutionId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/GetLifecycleExecution" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLifecycleExecutionRequest",
}) as any as S.Schema<GetLifecycleExecutionRequest>;
export interface LifecycleExecutionResourcesImpactedSummary {
  hasImpactedResources?: boolean;
}
export const LifecycleExecutionResourcesImpactedSummary = S.suspend(() =>
  S.Struct({ hasImpactedResources: S.optional(S.Boolean) }),
).annotate({
  identifier: "LifecycleExecutionResourcesImpactedSummary",
}) as any as S.Schema<LifecycleExecutionResourcesImpactedSummary>;
export type LifecycleExecutionStatus =
  | "IN_PROGRESS"
  | "CANCELLED"
  | "CANCELLING"
  | "FAILED"
  | "SUCCESS"
  | "PENDING"
  | (string & {});
export const LifecycleExecutionStatus = S.String;
export interface LifecycleExecutionState {
  status?: LifecycleExecutionStatus;
  reason?: string;
}
export const LifecycleExecutionState = S.suspend(() =>
  S.Struct({
    status: S.optional(LifecycleExecutionStatus),
    reason: S.optional(S.String),
  }),
).annotate({
  identifier: "LifecycleExecutionState",
}) as any as S.Schema<LifecycleExecutionState>;
export interface LifecycleExecution {
  lifecycleExecutionId?: string;
  lifecyclePolicyArn?: string;
  resourcesImpactedSummary?: LifecycleExecutionResourcesImpactedSummary;
  state?: LifecycleExecutionState;
  startTime?: Date;
  endTime?: Date;
}
export const LifecycleExecution = S.suspend(() =>
  S.Struct({
    lifecycleExecutionId: S.optional(S.String),
    lifecyclePolicyArn: S.optional(S.String),
    resourcesImpactedSummary: S.optional(
      LifecycleExecutionResourcesImpactedSummary,
    ),
    state: S.optional(LifecycleExecutionState),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "LifecycleExecution",
}) as any as S.Schema<LifecycleExecution>;
export interface GetLifecycleExecutionResponse {
  lifecycleExecution?: LifecycleExecution;
}
export const GetLifecycleExecutionResponse = S.suspend(() =>
  S.Struct({ lifecycleExecution: S.optional(LifecycleExecution) }),
).annotate({
  identifier: "GetLifecycleExecutionResponse",
}) as any as S.Schema<GetLifecycleExecutionResponse>;
export interface GetLifecyclePolicyRequest {
  lifecyclePolicyArn: string;
}
export const GetLifecyclePolicyRequest = S.suspend(() =>
  S.Struct({
    lifecyclePolicyArn: S.String.pipe(T.HttpQuery("lifecyclePolicyArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/GetLifecyclePolicy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLifecyclePolicyRequest",
}) as any as S.Schema<GetLifecyclePolicyRequest>;
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
export const LifecyclePolicy = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    status: S.optional(LifecyclePolicyStatus),
    executionRole: S.optional(S.String),
    resourceType: S.optional(LifecyclePolicyResourceType),
    policyDetails: S.optional(LifecyclePolicyDetails),
    resourceSelection: S.optional(LifecyclePolicyResourceSelection),
    dateCreated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    dateUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    dateLastRun: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "LifecyclePolicy",
}) as any as S.Schema<LifecyclePolicy>;
export interface GetLifecyclePolicyResponse {
  lifecyclePolicy?: LifecyclePolicy;
}
export const GetLifecyclePolicyResponse = S.suspend(() =>
  S.Struct({ lifecyclePolicy: S.optional(LifecyclePolicy) }),
).annotate({
  identifier: "GetLifecyclePolicyResponse",
}) as any as S.Schema<GetLifecyclePolicyResponse>;
export type MarketplaceResourceType =
  | "COMPONENT_DATA"
  | "COMPONENT_ARTIFACT"
  | (string & {});
export const MarketplaceResourceType = S.String;
export interface GetMarketplaceResourceRequest {
  resourceType: MarketplaceResourceType;
  resourceArn: string;
  resourceLocation?: string;
}
export const GetMarketplaceResourceRequest = S.suspend(() =>
  S.Struct({
    resourceType: MarketplaceResourceType,
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
).annotate({
  identifier: "GetMarketplaceResourceRequest",
}) as any as S.Schema<GetMarketplaceResourceRequest>;
export interface GetMarketplaceResourceResponse {
  resourceArn?: string;
  url?: string;
  data?: string;
}
export const GetMarketplaceResourceResponse = S.suspend(() =>
  S.Struct({
    resourceArn: S.optional(S.String),
    url: S.optional(S.String),
    data: S.optional(S.String),
  }),
).annotate({
  identifier: "GetMarketplaceResourceResponse",
}) as any as S.Schema<GetMarketplaceResourceResponse>;
export interface GetWorkflowRequest {
  workflowBuildVersionArn: string;
}
export const GetWorkflowRequest = S.suspend(() =>
  S.Struct({
    workflowBuildVersionArn: S.String.pipe(
      T.HttpQuery("workflowBuildVersionArn"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/GetWorkflow" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWorkflowRequest",
}) as any as S.Schema<GetWorkflowRequest>;
export type WorkflowStatus = "DEPRECATED" | (string & {});
export const WorkflowStatus = S.String;
export interface WorkflowState {
  status?: WorkflowStatus;
  reason?: string;
}
export const WorkflowState = S.suspend(() =>
  S.Struct({
    status: S.optional(WorkflowStatus),
    reason: S.optional(S.String),
  }),
).annotate({ identifier: "WorkflowState" }) as any as S.Schema<WorkflowState>;
export interface WorkflowParameterDetail {
  name: string;
  type: string;
  defaultValue?: string[];
  description?: string;
}
export const WorkflowParameterDetail = S.suspend(() =>
  S.Struct({
    name: S.String,
    type: S.String,
    defaultValue: S.optional(WorkflowParameterValueList),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkflowParameterDetail",
}) as any as S.Schema<WorkflowParameterDetail>;
export type WorkflowParameterDetailList = WorkflowParameterDetail[];
export const WorkflowParameterDetailList = S.Array(WorkflowParameterDetail);
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
export const Workflow = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    version: S.optional(S.String),
    description: S.optional(S.String),
    changeDescription: S.optional(S.String),
    type: S.optional(WorkflowType),
    state: S.optional(WorkflowState),
    owner: S.optional(S.String),
    data: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
    dateCreated: S.optional(S.String),
    tags: S.optional(TagMap),
    parameters: S.optional(WorkflowParameterDetailList),
  }),
).annotate({ identifier: "Workflow" }) as any as S.Schema<Workflow>;
export interface GetWorkflowResponse {
  workflow?: Workflow;
  latestVersionReferences?: LatestVersionReferences;
}
export const GetWorkflowResponse = S.suspend(() =>
  S.Struct({
    workflow: S.optional(Workflow),
    latestVersionReferences: S.optional(LatestVersionReferences),
  }),
).annotate({
  identifier: "GetWorkflowResponse",
}) as any as S.Schema<GetWorkflowResponse>;
export interface GetWorkflowExecutionRequest {
  workflowExecutionId: string;
}
export const GetWorkflowExecutionRequest = S.suspend(() =>
  S.Struct({
    workflowExecutionId: S.String.pipe(T.HttpQuery("workflowExecutionId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/GetWorkflowExecution" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWorkflowExecutionRequest",
}) as any as S.Schema<GetWorkflowExecutionRequest>;
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
export const WorkflowExecutionStatus = S.String;
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
export const GetWorkflowExecutionResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    workflowBuildVersionArn: S.optional(S.String),
    workflowExecutionId: S.optional(S.String),
    imageBuildVersionArn: S.optional(S.String),
    type: S.optional(WorkflowType),
    status: S.optional(WorkflowExecutionStatus),
    message: S.optional(S.String),
    totalStepCount: S.optional(S.Number),
    totalStepsSucceeded: S.optional(S.Number),
    totalStepsFailed: S.optional(S.Number),
    totalStepsSkipped: S.optional(S.Number),
    startTime: S.optional(S.String),
    endTime: S.optional(S.String),
    parallelGroup: S.optional(S.String),
  }),
).annotate({
  identifier: "GetWorkflowExecutionResponse",
}) as any as S.Schema<GetWorkflowExecutionResponse>;
export interface GetWorkflowStepExecutionRequest {
  stepExecutionId: string;
}
export const GetWorkflowStepExecutionRequest = S.suspend(() =>
  S.Struct({
    stepExecutionId: S.String.pipe(T.HttpQuery("stepExecutionId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/GetWorkflowStepExecution" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWorkflowStepExecutionRequest",
}) as any as S.Schema<GetWorkflowStepExecutionRequest>;
export type WorkflowStepExecutionStatus =
  | "PENDING"
  | "SKIPPED"
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED"
  | (string & {});
export const WorkflowStepExecutionStatus = S.String;
export type WorkflowStepExecutionRollbackStatus =
  | "RUNNING"
  | "COMPLETED"
  | "SKIPPED"
  | "FAILED"
  | (string & {});
export const WorkflowStepExecutionRollbackStatus = S.String;
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
export const GetWorkflowStepExecutionResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    stepExecutionId: S.optional(S.String),
    workflowBuildVersionArn: S.optional(S.String),
    workflowExecutionId: S.optional(S.String),
    imageBuildVersionArn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    action: S.optional(S.String),
    status: S.optional(WorkflowStepExecutionStatus),
    rollbackStatus: S.optional(WorkflowStepExecutionRollbackStatus),
    message: S.optional(S.String),
    inputs: S.optional(S.String),
    outputs: S.optional(S.String),
    startTime: S.optional(S.String),
    endTime: S.optional(S.String),
    onFailure: S.optional(S.String),
    timeoutSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "GetWorkflowStepExecutionResponse",
}) as any as S.Schema<GetWorkflowStepExecutionResponse>;
export type ComponentFormat = "SHELL" | (string & {});
export const ComponentFormat = S.String;
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
export const ImportComponentRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    semanticVersion: S.String,
    description: S.optional(S.String),
    changeDescription: S.optional(S.String),
    type: ComponentType,
    format: ComponentFormat,
    platform: Platform,
    data: S.optional(S.String),
    uri: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
    tags: S.optional(TagMap),
    clientToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/ImportComponent" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ImportComponentRequest",
}) as any as S.Schema<ImportComponentRequest>;
export interface ImportComponentResponse {
  requestId?: string;
  clientToken?: string;
  componentBuildVersionArn?: string;
}
export const ImportComponentResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    clientToken: S.optional(S.String),
    componentBuildVersionArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ImportComponentResponse",
}) as any as S.Schema<ImportComponentResponse>;
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
  clientToken: string;
}
export const ImportDiskImageRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    semanticVersion: S.String,
    description: S.optional(S.String),
    platform: S.String,
    osVersion: S.String,
    executionRole: S.optional(S.String),
    infrastructureConfigurationArn: S.String,
    uri: S.String,
    loggingConfiguration: S.optional(ImageLoggingConfiguration),
    tags: S.optional(TagMap),
    clientToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/ImportDiskImage" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ImportDiskImageRequest",
}) as any as S.Schema<ImportDiskImageRequest>;
export interface ImportDiskImageResponse {
  clientToken?: string;
  imageBuildVersionArn?: string;
}
export const ImportDiskImageResponse = S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String),
    imageBuildVersionArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ImportDiskImageResponse",
}) as any as S.Schema<ImportDiskImageResponse>;
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
export const ImportVmImageRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    semanticVersion: S.String,
    description: S.optional(S.String),
    platform: Platform,
    osVersion: S.optional(S.String),
    vmImportTaskId: S.String,
    loggingConfiguration: S.optional(ImageLoggingConfiguration),
    tags: S.optional(TagMap),
    clientToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/ImportVmImage" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ImportVmImageRequest",
}) as any as S.Schema<ImportVmImageRequest>;
export interface ImportVmImageResponse {
  requestId?: string;
  imageArn?: string;
  clientToken?: string;
}
export const ImportVmImageResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    imageArn: S.optional(S.String),
    clientToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ImportVmImageResponse",
}) as any as S.Schema<ImportVmImageResponse>;
export interface ListComponentBuildVersionsRequest {
  componentVersionArn?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListComponentBuildVersionsRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListComponentBuildVersionsRequest",
}) as any as S.Schema<ListComponentBuildVersionsRequest>;
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
export const ComponentSummary = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    version: S.optional(S.String),
    platform: S.optional(Platform),
    supportedOsVersions: S.optional(OsVersionList),
    state: S.optional(ComponentState),
    type: S.optional(ComponentType),
    owner: S.optional(S.String),
    description: S.optional(S.String),
    changeDescription: S.optional(S.String),
    dateCreated: S.optional(S.String),
    tags: S.optional(TagMap),
    publisher: S.optional(S.String),
    obfuscate: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ComponentSummary",
}) as any as S.Schema<ComponentSummary>;
export type ComponentSummaryList = ComponentSummary[];
export const ComponentSummaryList = S.Array(ComponentSummary);
export interface ListComponentBuildVersionsResponse {
  requestId?: string;
  componentSummaryList?: ComponentSummary[];
  nextToken?: string;
}
export const ListComponentBuildVersionsResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    componentSummaryList: S.optional(ComponentSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListComponentBuildVersionsResponse",
}) as any as S.Schema<ListComponentBuildVersionsResponse>;
export type Ownership =
  | "Self"
  | "Shared"
  | "Amazon"
  | "ThirdParty"
  | "AWSMarketplace"
  | (string & {});
export const Ownership = S.String;
export type FilterValues = string[];
export const FilterValues = S.Array(S.String);
export interface Filter {
  name?: string;
  values?: string[];
}
export const Filter = S.suspend(() =>
  S.Struct({ name: S.optional(S.String), values: S.optional(FilterValues) }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type FilterList = Filter[];
export const FilterList = S.Array(Filter);
export interface ListComponentsRequest {
  owner?: Ownership;
  filters?: Filter[];
  byName?: boolean;
  maxResults?: number;
  nextToken?: string;
}
export const ListComponentsRequest = S.suspend(() =>
  S.Struct({
    owner: S.optional(Ownership),
    filters: S.optional(FilterList),
    byName: S.optional(S.Boolean),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListComponents" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListComponentsRequest",
}) as any as S.Schema<ListComponentsRequest>;
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
export const ComponentVersion = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    version: S.optional(S.String),
    description: S.optional(S.String),
    platform: S.optional(Platform),
    supportedOsVersions: S.optional(OsVersionList),
    type: S.optional(ComponentType),
    owner: S.optional(S.String),
    dateCreated: S.optional(S.String),
    status: S.optional(ComponentStatus),
    productCodes: S.optional(ProductCodeList),
  }),
).annotate({
  identifier: "ComponentVersion",
}) as any as S.Schema<ComponentVersion>;
export type ComponentVersionList = ComponentVersion[];
export const ComponentVersionList = S.Array(ComponentVersion);
export interface ListComponentsResponse {
  requestId?: string;
  componentVersionList?: ComponentVersion[];
  nextToken?: string;
}
export const ListComponentsResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    componentVersionList: S.optional(ComponentVersionList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListComponentsResponse",
}) as any as S.Schema<ListComponentsResponse>;
export interface ListContainerRecipesRequest {
  owner?: Ownership;
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListContainerRecipesRequest = S.suspend(() =>
  S.Struct({
    owner: S.optional(Ownership),
    filters: S.optional(FilterList),
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
).annotate({
  identifier: "ListContainerRecipesRequest",
}) as any as S.Schema<ListContainerRecipesRequest>;
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
export const ContainerRecipeSummary = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    containerType: S.optional(ContainerType),
    name: S.optional(S.String),
    platform: S.optional(Platform),
    owner: S.optional(S.String),
    parentImage: S.optional(S.String),
    dateCreated: S.optional(S.String),
    instanceImage: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "ContainerRecipeSummary",
}) as any as S.Schema<ContainerRecipeSummary>;
export type ContainerRecipeSummaryList = ContainerRecipeSummary[];
export const ContainerRecipeSummaryList = S.Array(ContainerRecipeSummary);
export interface ListContainerRecipesResponse {
  requestId?: string;
  containerRecipeSummaryList?: ContainerRecipeSummary[];
  nextToken?: string;
}
export const ListContainerRecipesResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    containerRecipeSummaryList: S.optional(ContainerRecipeSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListContainerRecipesResponse",
}) as any as S.Schema<ListContainerRecipesResponse>;
export interface ListDistributionConfigurationsRequest {
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListDistributionConfigurationsRequest = S.suspend(() =>
  S.Struct({
    filters: S.optional(FilterList),
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
).annotate({
  identifier: "ListDistributionConfigurationsRequest",
}) as any as S.Schema<ListDistributionConfigurationsRequest>;
export type RegionList = string[];
export const RegionList = S.Array(S.String);
export interface DistributionConfigurationSummary {
  arn?: string;
  name?: string;
  description?: string;
  dateCreated?: string;
  dateUpdated?: string;
  tags?: { [key: string]: string | undefined };
  regions?: string[];
}
export const DistributionConfigurationSummary = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    dateCreated: S.optional(S.String),
    dateUpdated: S.optional(S.String),
    tags: S.optional(TagMap),
    regions: S.optional(RegionList),
  }),
).annotate({
  identifier: "DistributionConfigurationSummary",
}) as any as S.Schema<DistributionConfigurationSummary>;
export type DistributionConfigurationSummaryList =
  DistributionConfigurationSummary[];
export const DistributionConfigurationSummaryList = S.Array(
  DistributionConfigurationSummary,
);
export interface ListDistributionConfigurationsResponse {
  requestId?: string;
  distributionConfigurationSummaryList?: DistributionConfigurationSummary[];
  nextToken?: string;
}
export const ListDistributionConfigurationsResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    distributionConfigurationSummaryList: S.optional(
      DistributionConfigurationSummaryList,
    ),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDistributionConfigurationsResponse",
}) as any as S.Schema<ListDistributionConfigurationsResponse>;
export interface ListImageBuildVersionsRequest {
  imageVersionArn?: string;
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListImageBuildVersionsRequest = S.suspend(() =>
  S.Struct({
    imageVersionArn: S.optional(S.String),
    filters: S.optional(FilterList),
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
).annotate({
  identifier: "ListImageBuildVersionsRequest",
}) as any as S.Schema<ListImageBuildVersionsRequest>;
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
export const ImageSummary = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    type: S.optional(ImageType),
    version: S.optional(S.String),
    platform: S.optional(Platform),
    osVersion: S.optional(S.String),
    state: S.optional(ImageState),
    owner: S.optional(S.String),
    dateCreated: S.optional(S.String),
    outputResources: S.optional(OutputResources),
    tags: S.optional(TagMap),
    buildType: S.optional(BuildType),
    imageSource: S.optional(ImageSource),
    deprecationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lifecycleExecutionId: S.optional(S.String),
    loggingConfiguration: S.optional(ImageLoggingConfiguration),
  }),
).annotate({ identifier: "ImageSummary" }) as any as S.Schema<ImageSummary>;
export type ImageSummaryList = ImageSummary[];
export const ImageSummaryList = S.Array(ImageSummary);
export interface ListImageBuildVersionsResponse {
  requestId?: string;
  imageSummaryList?: ImageSummary[];
  nextToken?: string;
}
export const ListImageBuildVersionsResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    imageSummaryList: S.optional(ImageSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListImageBuildVersionsResponse",
}) as any as S.Schema<ListImageBuildVersionsResponse>;
export interface ListImagePackagesRequest {
  imageBuildVersionArn: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListImagePackagesRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListImagePackagesRequest",
}) as any as S.Schema<ListImagePackagesRequest>;
export interface ImagePackage {
  packageName?: string;
  packageVersion?: string;
}
export const ImagePackage = S.suspend(() =>
  S.Struct({
    packageName: S.optional(S.String),
    packageVersion: S.optional(S.String),
  }),
).annotate({ identifier: "ImagePackage" }) as any as S.Schema<ImagePackage>;
export type ImagePackageList = ImagePackage[];
export const ImagePackageList = S.Array(ImagePackage);
export interface ListImagePackagesResponse {
  requestId?: string;
  imagePackageList?: ImagePackage[];
  nextToken?: string;
}
export const ListImagePackagesResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    imagePackageList: S.optional(ImagePackageList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListImagePackagesResponse",
}) as any as S.Schema<ListImagePackagesResponse>;
export interface ListImagePipelineImagesRequest {
  imagePipelineArn: string;
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListImagePipelineImagesRequest = S.suspend(() =>
  S.Struct({
    imagePipelineArn: S.String,
    filters: S.optional(FilterList),
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
).annotate({
  identifier: "ListImagePipelineImagesRequest",
}) as any as S.Schema<ListImagePipelineImagesRequest>;
export interface ListImagePipelineImagesResponse {
  requestId?: string;
  imageSummaryList?: ImageSummary[];
  nextToken?: string;
}
export const ListImagePipelineImagesResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    imageSummaryList: S.optional(ImageSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListImagePipelineImagesResponse",
}) as any as S.Schema<ListImagePipelineImagesResponse>;
export interface ListImagePipelinesRequest {
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListImagePipelinesRequest = S.suspend(() =>
  S.Struct({
    filters: S.optional(FilterList),
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
).annotate({
  identifier: "ListImagePipelinesRequest",
}) as any as S.Schema<ListImagePipelinesRequest>;
export type ImagePipelineList = ImagePipeline[];
export const ImagePipelineList = S.Array(ImagePipeline);
export interface ListImagePipelinesResponse {
  requestId?: string;
  imagePipelineList?: ImagePipeline[];
  nextToken?: string;
}
export const ListImagePipelinesResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    imagePipelineList: S.optional(ImagePipelineList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListImagePipelinesResponse",
}) as any as S.Schema<ListImagePipelinesResponse>;
export interface ListImageRecipesRequest {
  owner?: Ownership;
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListImageRecipesRequest = S.suspend(() =>
  S.Struct({
    owner: S.optional(Ownership),
    filters: S.optional(FilterList),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListImageRecipes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListImageRecipesRequest",
}) as any as S.Schema<ListImageRecipesRequest>;
export interface ImageRecipeSummary {
  arn?: string;
  name?: string;
  platform?: Platform;
  owner?: string;
  parentImage?: string;
  dateCreated?: string;
  tags?: { [key: string]: string | undefined };
}
export const ImageRecipeSummary = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    platform: S.optional(Platform),
    owner: S.optional(S.String),
    parentImage: S.optional(S.String),
    dateCreated: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "ImageRecipeSummary",
}) as any as S.Schema<ImageRecipeSummary>;
export type ImageRecipeSummaryList = ImageRecipeSummary[];
export const ImageRecipeSummaryList = S.Array(ImageRecipeSummary);
export interface ListImageRecipesResponse {
  requestId?: string;
  imageRecipeSummaryList?: ImageRecipeSummary[];
  nextToken?: string;
}
export const ListImageRecipesResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    imageRecipeSummaryList: S.optional(ImageRecipeSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListImageRecipesResponse",
}) as any as S.Schema<ListImageRecipesResponse>;
export interface ListImagesRequest {
  owner?: Ownership;
  filters?: Filter[];
  byName?: boolean;
  maxResults?: number;
  nextToken?: string;
  includeDeprecated?: boolean;
}
export const ListImagesRequest = S.suspend(() =>
  S.Struct({
    owner: S.optional(Ownership),
    filters: S.optional(FilterList),
    byName: S.optional(S.Boolean),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    includeDeprecated: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListImages" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListImagesRequest",
}) as any as S.Schema<ListImagesRequest>;
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
export const ImageVersion = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    type: S.optional(ImageType),
    version: S.optional(S.String),
    platform: S.optional(Platform),
    osVersion: S.optional(S.String),
    owner: S.optional(S.String),
    dateCreated: S.optional(S.String),
    buildType: S.optional(BuildType),
    imageSource: S.optional(ImageSource),
  }),
).annotate({ identifier: "ImageVersion" }) as any as S.Schema<ImageVersion>;
export type ImageVersionList = ImageVersion[];
export const ImageVersionList = S.Array(ImageVersion);
export interface ListImagesResponse {
  requestId?: string;
  imageVersionList?: ImageVersion[];
  nextToken?: string;
}
export const ListImagesResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    imageVersionList: S.optional(ImageVersionList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListImagesResponse",
}) as any as S.Schema<ListImagesResponse>;
export interface ListImageScanFindingAggregationsRequest {
  filter?: Filter;
  nextToken?: string;
}
export const ListImageScanFindingAggregationsRequest = S.suspend(() =>
  S.Struct({
    filter: S.optional(Filter),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListImageScanFindingAggregations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListImageScanFindingAggregationsRequest",
}) as any as S.Schema<ListImageScanFindingAggregationsRequest>;
export interface SeverityCounts {
  all?: number;
  critical?: number;
  high?: number;
  medium?: number;
}
export const SeverityCounts = S.suspend(() =>
  S.Struct({
    all: S.optional(S.Number),
    critical: S.optional(S.Number),
    high: S.optional(S.Number),
    medium: S.optional(S.Number),
  }),
).annotate({ identifier: "SeverityCounts" }) as any as S.Schema<SeverityCounts>;
export interface AccountAggregation {
  accountId?: string;
  severityCounts?: SeverityCounts;
}
export const AccountAggregation = S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    severityCounts: S.optional(SeverityCounts),
  }),
).annotate({
  identifier: "AccountAggregation",
}) as any as S.Schema<AccountAggregation>;
export interface ImageAggregation {
  imageBuildVersionArn?: string;
  severityCounts?: SeverityCounts;
}
export const ImageAggregation = S.suspend(() =>
  S.Struct({
    imageBuildVersionArn: S.optional(S.String),
    severityCounts: S.optional(SeverityCounts),
  }),
).annotate({
  identifier: "ImageAggregation",
}) as any as S.Schema<ImageAggregation>;
export interface ImagePipelineAggregation {
  imagePipelineArn?: string;
  severityCounts?: SeverityCounts;
}
export const ImagePipelineAggregation = S.suspend(() =>
  S.Struct({
    imagePipelineArn: S.optional(S.String),
    severityCounts: S.optional(SeverityCounts),
  }),
).annotate({
  identifier: "ImagePipelineAggregation",
}) as any as S.Schema<ImagePipelineAggregation>;
export interface VulnerabilityIdAggregation {
  vulnerabilityId?: string;
  severityCounts?: SeverityCounts;
}
export const VulnerabilityIdAggregation = S.suspend(() =>
  S.Struct({
    vulnerabilityId: S.optional(S.String),
    severityCounts: S.optional(SeverityCounts),
  }),
).annotate({
  identifier: "VulnerabilityIdAggregation",
}) as any as S.Schema<VulnerabilityIdAggregation>;
export interface ImageScanFindingAggregation {
  accountAggregation?: AccountAggregation;
  imageAggregation?: ImageAggregation;
  imagePipelineAggregation?: ImagePipelineAggregation;
  vulnerabilityIdAggregation?: VulnerabilityIdAggregation;
}
export const ImageScanFindingAggregation = S.suspend(() =>
  S.Struct({
    accountAggregation: S.optional(AccountAggregation),
    imageAggregation: S.optional(ImageAggregation),
    imagePipelineAggregation: S.optional(ImagePipelineAggregation),
    vulnerabilityIdAggregation: S.optional(VulnerabilityIdAggregation),
  }),
).annotate({
  identifier: "ImageScanFindingAggregation",
}) as any as S.Schema<ImageScanFindingAggregation>;
export type ImageScanFindingAggregationsList = ImageScanFindingAggregation[];
export const ImageScanFindingAggregationsList = S.Array(
  ImageScanFindingAggregation,
);
export interface ListImageScanFindingAggregationsResponse {
  requestId?: string;
  aggregationType?: string;
  responses?: ImageScanFindingAggregation[];
  nextToken?: string;
}
export const ListImageScanFindingAggregationsResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    aggregationType: S.optional(S.String),
    responses: S.optional(ImageScanFindingAggregationsList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListImageScanFindingAggregationsResponse",
}) as any as S.Schema<ListImageScanFindingAggregationsResponse>;
export type ImageScanFindingsFilterValues = string[];
export const ImageScanFindingsFilterValues = S.Array(S.String);
export interface ImageScanFindingsFilter {
  name?: string;
  values?: string[];
}
export const ImageScanFindingsFilter = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    values: S.optional(ImageScanFindingsFilterValues),
  }),
).annotate({
  identifier: "ImageScanFindingsFilter",
}) as any as S.Schema<ImageScanFindingsFilter>;
export type ImageScanFindingsFilterList = ImageScanFindingsFilter[];
export const ImageScanFindingsFilterList = S.Array(ImageScanFindingsFilter);
export interface ListImageScanFindingsRequest {
  filters?: ImageScanFindingsFilter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListImageScanFindingsRequest = S.suspend(() =>
  S.Struct({
    filters: S.optional(ImageScanFindingsFilterList),
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
).annotate({
  identifier: "ListImageScanFindingsRequest",
}) as any as S.Schema<ListImageScanFindingsRequest>;
export interface RemediationRecommendation {
  text?: string;
  url?: string;
}
export const RemediationRecommendation = S.suspend(() =>
  S.Struct({ text: S.optional(S.String), url: S.optional(S.String) }),
).annotate({
  identifier: "RemediationRecommendation",
}) as any as S.Schema<RemediationRecommendation>;
export interface Remediation {
  recommendation?: RemediationRecommendation;
}
export const Remediation = S.suspend(() =>
  S.Struct({ recommendation: S.optional(RemediationRecommendation) }),
).annotate({ identifier: "Remediation" }) as any as S.Schema<Remediation>;
export interface CvssScoreAdjustment {
  metric?: string;
  reason?: string;
}
export const CvssScoreAdjustment = S.suspend(() =>
  S.Struct({ metric: S.optional(S.String), reason: S.optional(S.String) }),
).annotate({
  identifier: "CvssScoreAdjustment",
}) as any as S.Schema<CvssScoreAdjustment>;
export type CvssScoreAdjustmentList = CvssScoreAdjustment[];
export const CvssScoreAdjustmentList = S.Array(CvssScoreAdjustment);
export interface CvssScoreDetails {
  scoreSource?: string;
  cvssSource?: string;
  version?: string;
  score?: number;
  scoringVector?: string;
  adjustments?: CvssScoreAdjustment[];
}
export const CvssScoreDetails = S.suspend(() =>
  S.Struct({
    scoreSource: S.optional(S.String),
    cvssSource: S.optional(S.String),
    version: S.optional(S.String),
    score: S.optional(S.Number),
    scoringVector: S.optional(S.String),
    adjustments: S.optional(CvssScoreAdjustmentList),
  }),
).annotate({
  identifier: "CvssScoreDetails",
}) as any as S.Schema<CvssScoreDetails>;
export interface InspectorScoreDetails {
  adjustedCvss?: CvssScoreDetails;
}
export const InspectorScoreDetails = S.suspend(() =>
  S.Struct({ adjustedCvss: S.optional(CvssScoreDetails) }),
).annotate({
  identifier: "InspectorScoreDetails",
}) as any as S.Schema<InspectorScoreDetails>;
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
export const VulnerablePackage = S.suspend(() =>
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
).annotate({
  identifier: "VulnerablePackage",
}) as any as S.Schema<VulnerablePackage>;
export type VulnerablePackageList = VulnerablePackage[];
export const VulnerablePackageList = S.Array(VulnerablePackage);
export interface CvssScore {
  baseScore?: number;
  scoringVector?: string;
  version?: string;
  source?: string;
}
export const CvssScore = S.suspend(() =>
  S.Struct({
    baseScore: S.optional(S.Number),
    scoringVector: S.optional(S.String),
    version: S.optional(S.String),
    source: S.optional(S.String),
  }),
).annotate({ identifier: "CvssScore" }) as any as S.Schema<CvssScore>;
export type CvssScoreList = CvssScore[];
export const CvssScoreList = S.Array(CvssScore);
export type VulnerabilityIdList = string[];
export const VulnerabilityIdList = S.Array(S.String);
export type NonEmptyStringList = string[];
export const NonEmptyStringList = S.Array(S.String);
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
export const PackageVulnerabilityDetails = S.suspend(() =>
  S.Struct({
    vulnerabilityId: S.String,
    vulnerablePackages: S.optional(VulnerablePackageList),
    source: S.optional(S.String),
    cvss: S.optional(CvssScoreList),
    relatedVulnerabilities: S.optional(VulnerabilityIdList),
    sourceUrl: S.optional(S.String),
    vendorSeverity: S.optional(S.String),
    vendorCreatedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    vendorUpdatedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    referenceUrls: S.optional(NonEmptyStringList),
  }),
).annotate({
  identifier: "PackageVulnerabilityDetails",
}) as any as S.Schema<PackageVulnerabilityDetails>;
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
export const ImageScanFinding = S.suspend(() =>
  S.Struct({
    awsAccountId: S.optional(S.String),
    imageBuildVersionArn: S.optional(S.String),
    imagePipelineArn: S.optional(S.String),
    type: S.optional(S.String),
    description: S.optional(S.String),
    title: S.optional(S.String),
    remediation: S.optional(Remediation),
    severity: S.optional(S.String),
    firstObservedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    inspectorScore: S.optional(S.Number),
    inspectorScoreDetails: S.optional(InspectorScoreDetails),
    packageVulnerabilityDetails: S.optional(PackageVulnerabilityDetails),
    fixAvailable: S.optional(S.String),
  }),
).annotate({
  identifier: "ImageScanFinding",
}) as any as S.Schema<ImageScanFinding>;
export type ImageScanFindingsList = ImageScanFinding[];
export const ImageScanFindingsList = S.Array(ImageScanFinding);
export interface ListImageScanFindingsResponse {
  requestId?: string;
  findings?: ImageScanFinding[];
  nextToken?: string;
}
export const ListImageScanFindingsResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    findings: S.optional(ImageScanFindingsList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListImageScanFindingsResponse",
}) as any as S.Schema<ListImageScanFindingsResponse>;
export interface ListInfrastructureConfigurationsRequest {
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListInfrastructureConfigurationsRequest = S.suspend(() =>
  S.Struct({
    filters: S.optional(FilterList),
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
).annotate({
  identifier: "ListInfrastructureConfigurationsRequest",
}) as any as S.Schema<ListInfrastructureConfigurationsRequest>;
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
export const InfrastructureConfigurationSummary = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    dateCreated: S.optional(S.String),
    dateUpdated: S.optional(S.String),
    resourceTags: S.optional(ResourceTagMap),
    tags: S.optional(TagMap),
    instanceTypes: S.optional(InstanceTypeList),
    instanceProfileName: S.optional(S.String),
    placement: S.optional(Placement),
  }),
).annotate({
  identifier: "InfrastructureConfigurationSummary",
}) as any as S.Schema<InfrastructureConfigurationSummary>;
export type InfrastructureConfigurationSummaryList =
  InfrastructureConfigurationSummary[];
export const InfrastructureConfigurationSummaryList = S.Array(
  InfrastructureConfigurationSummary,
);
export interface ListInfrastructureConfigurationsResponse {
  requestId?: string;
  infrastructureConfigurationSummaryList?: InfrastructureConfigurationSummary[];
  nextToken?: string;
}
export const ListInfrastructureConfigurationsResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    infrastructureConfigurationSummaryList: S.optional(
      InfrastructureConfigurationSummaryList,
    ),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListInfrastructureConfigurationsResponse",
}) as any as S.Schema<ListInfrastructureConfigurationsResponse>;
export interface ListLifecycleExecutionResourcesRequest {
  lifecycleExecutionId: string;
  parentResourceId?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListLifecycleExecutionResourcesRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListLifecycleExecutionResourcesRequest",
}) as any as S.Schema<ListLifecycleExecutionResourcesRequest>;
export type LifecycleExecutionResourceStatus =
  | "FAILED"
  | "IN_PROGRESS"
  | "SKIPPED"
  | "SUCCESS"
  | (string & {});
export const LifecycleExecutionResourceStatus = S.String;
export interface LifecycleExecutionResourceState {
  status?: LifecycleExecutionResourceStatus;
  reason?: string;
}
export const LifecycleExecutionResourceState = S.suspend(() =>
  S.Struct({
    status: S.optional(LifecycleExecutionResourceStatus),
    reason: S.optional(S.String),
  }),
).annotate({
  identifier: "LifecycleExecutionResourceState",
}) as any as S.Schema<LifecycleExecutionResourceState>;
export type LifecycleExecutionResourceActionName =
  | "AVAILABLE"
  | "DELETE"
  | "DEPRECATE"
  | "DISABLE"
  | (string & {});
export const LifecycleExecutionResourceActionName = S.String;
export interface LifecycleExecutionResourceAction {
  name?: LifecycleExecutionResourceActionName;
  reason?: string;
}
export const LifecycleExecutionResourceAction = S.suspend(() =>
  S.Struct({
    name: S.optional(LifecycleExecutionResourceActionName),
    reason: S.optional(S.String),
  }),
).annotate({
  identifier: "LifecycleExecutionResourceAction",
}) as any as S.Schema<LifecycleExecutionResourceAction>;
export interface LifecycleExecutionSnapshotResource {
  snapshotId?: string;
  state?: LifecycleExecutionResourceState;
}
export const LifecycleExecutionSnapshotResource = S.suspend(() =>
  S.Struct({
    snapshotId: S.optional(S.String),
    state: S.optional(LifecycleExecutionResourceState),
  }),
).annotate({
  identifier: "LifecycleExecutionSnapshotResource",
}) as any as S.Schema<LifecycleExecutionSnapshotResource>;
export type LifecycleExecutionSnapshotResourceList =
  LifecycleExecutionSnapshotResource[];
export const LifecycleExecutionSnapshotResourceList = S.Array(
  LifecycleExecutionSnapshotResource,
);
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
export const LifecycleExecutionResource = S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    resourceId: S.optional(S.String),
    state: S.optional(LifecycleExecutionResourceState),
    action: S.optional(LifecycleExecutionResourceAction),
    region: S.optional(S.String),
    snapshots: S.optional(LifecycleExecutionSnapshotResourceList),
    imageUris: S.optional(StringList),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "LifecycleExecutionResource",
}) as any as S.Schema<LifecycleExecutionResource>;
export type LifecycleExecutionResourceList = LifecycleExecutionResource[];
export const LifecycleExecutionResourceList = S.Array(
  LifecycleExecutionResource,
);
export interface ListLifecycleExecutionResourcesResponse {
  lifecycleExecutionId?: string;
  lifecycleExecutionState?: LifecycleExecutionState;
  resources?: LifecycleExecutionResource[];
  nextToken?: string;
}
export const ListLifecycleExecutionResourcesResponse = S.suspend(() =>
  S.Struct({
    lifecycleExecutionId: S.optional(S.String),
    lifecycleExecutionState: S.optional(LifecycleExecutionState),
    resources: S.optional(LifecycleExecutionResourceList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLifecycleExecutionResourcesResponse",
}) as any as S.Schema<ListLifecycleExecutionResourcesResponse>;
export interface ListLifecycleExecutionsRequest {
  maxResults?: number;
  nextToken?: string;
  resourceArn: string;
}
export const ListLifecycleExecutionsRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListLifecycleExecutionsRequest",
}) as any as S.Schema<ListLifecycleExecutionsRequest>;
export type LifecycleExecutionsList = LifecycleExecution[];
export const LifecycleExecutionsList = S.Array(LifecycleExecution);
export interface ListLifecycleExecutionsResponse {
  lifecycleExecutions?: LifecycleExecution[];
  nextToken?: string;
}
export const ListLifecycleExecutionsResponse = S.suspend(() =>
  S.Struct({
    lifecycleExecutions: S.optional(LifecycleExecutionsList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLifecycleExecutionsResponse",
}) as any as S.Schema<ListLifecycleExecutionsResponse>;
export interface ListLifecyclePoliciesRequest {
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListLifecyclePoliciesRequest = S.suspend(() =>
  S.Struct({
    filters: S.optional(FilterList),
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
).annotate({
  identifier: "ListLifecyclePoliciesRequest",
}) as any as S.Schema<ListLifecyclePoliciesRequest>;
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
export const LifecyclePolicySummary = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    status: S.optional(LifecyclePolicyStatus),
    executionRole: S.optional(S.String),
    resourceType: S.optional(LifecyclePolicyResourceType),
    dateCreated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    dateUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    dateLastRun: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "LifecyclePolicySummary",
}) as any as S.Schema<LifecyclePolicySummary>;
export type LifecyclePolicySummaryList = LifecyclePolicySummary[];
export const LifecyclePolicySummaryList = S.Array(LifecyclePolicySummary);
export interface ListLifecyclePoliciesResponse {
  lifecyclePolicySummaryList?: LifecyclePolicySummary[];
  nextToken?: string;
}
export const ListLifecyclePoliciesResponse = S.suspend(() =>
  S.Struct({
    lifecyclePolicySummaryList: S.optional(LifecyclePolicySummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLifecyclePoliciesResponse",
}) as any as S.Schema<ListLifecyclePoliciesResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListWaitingWorkflowStepsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListWaitingWorkflowStepsRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListWaitingWorkflowSteps" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWaitingWorkflowStepsRequest",
}) as any as S.Schema<ListWaitingWorkflowStepsRequest>;
export interface WorkflowStepExecution {
  stepExecutionId?: string;
  imageBuildVersionArn?: string;
  workflowExecutionId?: string;
  workflowBuildVersionArn?: string;
  name?: string;
  action?: string;
  startTime?: string;
}
export const WorkflowStepExecution = S.suspend(() =>
  S.Struct({
    stepExecutionId: S.optional(S.String),
    imageBuildVersionArn: S.optional(S.String),
    workflowExecutionId: S.optional(S.String),
    workflowBuildVersionArn: S.optional(S.String),
    name: S.optional(S.String),
    action: S.optional(S.String),
    startTime: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkflowStepExecution",
}) as any as S.Schema<WorkflowStepExecution>;
export type WorkflowStepExecutionList = WorkflowStepExecution[];
export const WorkflowStepExecutionList = S.Array(WorkflowStepExecution);
export interface ListWaitingWorkflowStepsResponse {
  steps?: WorkflowStepExecution[];
  nextToken?: string;
}
export const ListWaitingWorkflowStepsResponse = S.suspend(() =>
  S.Struct({
    steps: S.optional(WorkflowStepExecutionList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWaitingWorkflowStepsResponse",
}) as any as S.Schema<ListWaitingWorkflowStepsResponse>;
export interface ListWorkflowBuildVersionsRequest {
  workflowVersionArn?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListWorkflowBuildVersionsRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListWorkflowBuildVersionsRequest",
}) as any as S.Schema<ListWorkflowBuildVersionsRequest>;
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
export const WorkflowSummary = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    version: S.optional(S.String),
    description: S.optional(S.String),
    changeDescription: S.optional(S.String),
    type: S.optional(WorkflowType),
    owner: S.optional(S.String),
    state: S.optional(WorkflowState),
    dateCreated: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "WorkflowSummary",
}) as any as S.Schema<WorkflowSummary>;
export type WorkflowSummaryList = WorkflowSummary[];
export const WorkflowSummaryList = S.Array(WorkflowSummary);
export interface ListWorkflowBuildVersionsResponse {
  workflowSummaryList?: WorkflowSummary[];
  nextToken?: string;
}
export const ListWorkflowBuildVersionsResponse = S.suspend(() =>
  S.Struct({
    workflowSummaryList: S.optional(WorkflowSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWorkflowBuildVersionsResponse",
}) as any as S.Schema<ListWorkflowBuildVersionsResponse>;
export interface ListWorkflowExecutionsRequest {
  maxResults?: number;
  nextToken?: string;
  imageBuildVersionArn: string;
}
export const ListWorkflowExecutionsRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListWorkflowExecutionsRequest",
}) as any as S.Schema<ListWorkflowExecutionsRequest>;
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
export const WorkflowExecutionMetadata = S.suspend(() =>
  S.Struct({
    workflowBuildVersionArn: S.optional(S.String),
    workflowExecutionId: S.optional(S.String),
    type: S.optional(WorkflowType),
    status: S.optional(WorkflowExecutionStatus),
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
).annotate({
  identifier: "WorkflowExecutionMetadata",
}) as any as S.Schema<WorkflowExecutionMetadata>;
export type WorkflowExecutionsList = WorkflowExecutionMetadata[];
export const WorkflowExecutionsList = S.Array(WorkflowExecutionMetadata);
export interface ListWorkflowExecutionsResponse {
  requestId?: string;
  workflowExecutions?: WorkflowExecutionMetadata[];
  imageBuildVersionArn?: string;
  message?: string;
  nextToken?: string;
}
export const ListWorkflowExecutionsResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    workflowExecutions: S.optional(WorkflowExecutionsList),
    imageBuildVersionArn: S.optional(S.String),
    message: S.optional(S.String),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWorkflowExecutionsResponse",
}) as any as S.Schema<ListWorkflowExecutionsResponse>;
export interface ListWorkflowsRequest {
  owner?: Ownership;
  filters?: Filter[];
  byName?: boolean;
  maxResults?: number;
  nextToken?: string;
}
export const ListWorkflowsRequest = S.suspend(() =>
  S.Struct({
    owner: S.optional(Ownership),
    filters: S.optional(FilterList),
    byName: S.optional(S.Boolean),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListWorkflows" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWorkflowsRequest",
}) as any as S.Schema<ListWorkflowsRequest>;
export interface WorkflowVersion {
  arn?: string;
  name?: string;
  version?: string;
  description?: string;
  type?: WorkflowType;
  owner?: string;
  dateCreated?: string;
}
export const WorkflowVersion = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    version: S.optional(S.String),
    description: S.optional(S.String),
    type: S.optional(WorkflowType),
    owner: S.optional(S.String),
    dateCreated: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkflowVersion",
}) as any as S.Schema<WorkflowVersion>;
export type WorkflowVersionList = WorkflowVersion[];
export const WorkflowVersionList = S.Array(WorkflowVersion);
export interface ListWorkflowsResponse {
  workflowVersionList?: WorkflowVersion[];
  nextToken?: string;
}
export const ListWorkflowsResponse = S.suspend(() =>
  S.Struct({
    workflowVersionList: S.optional(WorkflowVersionList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWorkflowsResponse",
}) as any as S.Schema<ListWorkflowsResponse>;
export interface ListWorkflowStepExecutionsRequest {
  maxResults?: number;
  nextToken?: string;
  workflowExecutionId: string;
}
export const ListWorkflowStepExecutionsRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListWorkflowStepExecutionsRequest",
}) as any as S.Schema<ListWorkflowStepExecutionsRequest>;
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
export const WorkflowStepMetadata = S.suspend(() =>
  S.Struct({
    stepExecutionId: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    action: S.optional(S.String),
    status: S.optional(WorkflowStepExecutionStatus),
    rollbackStatus: S.optional(WorkflowStepExecutionRollbackStatus),
    message: S.optional(S.String),
    inputs: S.optional(S.String),
    outputs: S.optional(S.String),
    startTime: S.optional(S.String),
    endTime: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkflowStepMetadata",
}) as any as S.Schema<WorkflowStepMetadata>;
export type WorkflowStepExecutionsList = WorkflowStepMetadata[];
export const WorkflowStepExecutionsList = S.Array(WorkflowStepMetadata);
export interface ListWorkflowStepExecutionsResponse {
  requestId?: string;
  steps?: WorkflowStepMetadata[];
  workflowBuildVersionArn?: string;
  workflowExecutionId?: string;
  imageBuildVersionArn?: string;
  message?: string;
  nextToken?: string;
}
export const ListWorkflowStepExecutionsResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    steps: S.optional(WorkflowStepExecutionsList),
    workflowBuildVersionArn: S.optional(S.String),
    workflowExecutionId: S.optional(S.String),
    imageBuildVersionArn: S.optional(S.String),
    message: S.optional(S.String),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWorkflowStepExecutionsResponse",
}) as any as S.Schema<ListWorkflowStepExecutionsResponse>;
export interface PutComponentPolicyRequest {
  componentArn: string;
  policy: string;
}
export const PutComponentPolicyRequest = S.suspend(() =>
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
).annotate({
  identifier: "PutComponentPolicyRequest",
}) as any as S.Schema<PutComponentPolicyRequest>;
export interface PutComponentPolicyResponse {
  requestId?: string;
  componentArn?: string;
}
export const PutComponentPolicyResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    componentArn: S.optional(S.String),
  }),
).annotate({
  identifier: "PutComponentPolicyResponse",
}) as any as S.Schema<PutComponentPolicyResponse>;
export interface PutContainerRecipePolicyRequest {
  containerRecipeArn: string;
  policy: string;
}
export const PutContainerRecipePolicyRequest = S.suspend(() =>
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
).annotate({
  identifier: "PutContainerRecipePolicyRequest",
}) as any as S.Schema<PutContainerRecipePolicyRequest>;
export interface PutContainerRecipePolicyResponse {
  requestId?: string;
  containerRecipeArn?: string;
}
export const PutContainerRecipePolicyResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    containerRecipeArn: S.optional(S.String),
  }),
).annotate({
  identifier: "PutContainerRecipePolicyResponse",
}) as any as S.Schema<PutContainerRecipePolicyResponse>;
export interface PutImagePolicyRequest {
  imageArn: string;
  policy: string;
}
export const PutImagePolicyRequest = S.suspend(() =>
  S.Struct({ imageArn: S.String, policy: S.String }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/PutImagePolicy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutImagePolicyRequest",
}) as any as S.Schema<PutImagePolicyRequest>;
export interface PutImagePolicyResponse {
  requestId?: string;
  imageArn?: string;
}
export const PutImagePolicyResponse = S.suspend(() =>
  S.Struct({ requestId: S.optional(S.String), imageArn: S.optional(S.String) }),
).annotate({
  identifier: "PutImagePolicyResponse",
}) as any as S.Schema<PutImagePolicyResponse>;
export interface PutImageRecipePolicyRequest {
  imageRecipeArn: string;
  policy: string;
}
export const PutImageRecipePolicyRequest = S.suspend(() =>
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
).annotate({
  identifier: "PutImageRecipePolicyRequest",
}) as any as S.Schema<PutImageRecipePolicyRequest>;
export interface PutImageRecipePolicyResponse {
  requestId?: string;
  imageRecipeArn?: string;
}
export const PutImageRecipePolicyResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    imageRecipeArn: S.optional(S.String),
  }),
).annotate({
  identifier: "PutImageRecipePolicyResponse",
}) as any as S.Schema<PutImageRecipePolicyResponse>;
export interface RetryImageRequest {
  imageBuildVersionArn: string;
  clientToken: string;
}
export const RetryImageRequest = S.suspend(() =>
  S.Struct({
    imageBuildVersionArn: S.String,
    clientToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/RetryImage" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RetryImageRequest",
}) as any as S.Schema<RetryImageRequest>;
export interface RetryImageResponse {
  clientToken?: string;
  imageBuildVersionArn?: string;
}
export const RetryImageResponse = S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String),
    imageBuildVersionArn: S.optional(S.String),
  }),
).annotate({
  identifier: "RetryImageResponse",
}) as any as S.Schema<RetryImageResponse>;
export type WorkflowStepActionType = "RESUME" | "STOP" | (string & {});
export const WorkflowStepActionType = S.String;
export interface SendWorkflowStepActionRequest {
  stepExecutionId: string;
  imageBuildVersionArn: string;
  action: WorkflowStepActionType;
  reason?: string;
  clientToken: string;
}
export const SendWorkflowStepActionRequest = S.suspend(() =>
  S.Struct({
    stepExecutionId: S.String,
    imageBuildVersionArn: S.String,
    action: WorkflowStepActionType,
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
).annotate({
  identifier: "SendWorkflowStepActionRequest",
}) as any as S.Schema<SendWorkflowStepActionRequest>;
export interface SendWorkflowStepActionResponse {
  stepExecutionId?: string;
  imageBuildVersionArn?: string;
  clientToken?: string;
}
export const SendWorkflowStepActionResponse = S.suspend(() =>
  S.Struct({
    stepExecutionId: S.optional(S.String),
    imageBuildVersionArn: S.optional(S.String),
    clientToken: S.optional(S.String),
  }),
).annotate({
  identifier: "SendWorkflowStepActionResponse",
}) as any as S.Schema<SendWorkflowStepActionResponse>;
export interface StartImagePipelineExecutionRequest {
  imagePipelineArn: string;
  clientToken: string;
  tags?: { [key: string]: string | undefined };
}
export const StartImagePipelineExecutionRequest = S.suspend(() =>
  S.Struct({
    imagePipelineArn: S.String,
    clientToken: S.String.pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
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
).annotate({
  identifier: "StartImagePipelineExecutionRequest",
}) as any as S.Schema<StartImagePipelineExecutionRequest>;
export interface StartImagePipelineExecutionResponse {
  requestId?: string;
  clientToken?: string;
  imageBuildVersionArn?: string;
}
export const StartImagePipelineExecutionResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    clientToken: S.optional(S.String),
    imageBuildVersionArn: S.optional(S.String),
  }),
).annotate({
  identifier: "StartImagePipelineExecutionResponse",
}) as any as S.Schema<StartImagePipelineExecutionResponse>;
export type ResourceStatus =
  | "AVAILABLE"
  | "DELETED"
  | "DEPRECATED"
  | "DISABLED"
  | (string & {});
export const ResourceStatus = S.String;
export interface ResourceState {
  status?: ResourceStatus;
}
export const ResourceState = S.suspend(() =>
  S.Struct({ status: S.optional(ResourceStatus) }),
).annotate({ identifier: "ResourceState" }) as any as S.Schema<ResourceState>;
export interface ResourceStateUpdateIncludeResources {
  amis?: boolean;
  snapshots?: boolean;
  containers?: boolean;
}
export const ResourceStateUpdateIncludeResources = S.suspend(() =>
  S.Struct({
    amis: S.optional(S.Boolean),
    snapshots: S.optional(S.Boolean),
    containers: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ResourceStateUpdateIncludeResources",
}) as any as S.Schema<ResourceStateUpdateIncludeResources>;
export interface ResourceStateUpdateExclusionRules {
  amis?: LifecyclePolicyDetailExclusionRulesAmis;
}
export const ResourceStateUpdateExclusionRules = S.suspend(() =>
  S.Struct({ amis: S.optional(LifecyclePolicyDetailExclusionRulesAmis) }),
).annotate({
  identifier: "ResourceStateUpdateExclusionRules",
}) as any as S.Schema<ResourceStateUpdateExclusionRules>;
export interface StartResourceStateUpdateRequest {
  resourceArn: string;
  state: ResourceState;
  executionRole?: string;
  includeResources?: ResourceStateUpdateIncludeResources;
  exclusionRules?: ResourceStateUpdateExclusionRules;
  updateAt?: Date;
  clientToken: string;
}
export const StartResourceStateUpdateRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String,
    state: ResourceState,
    executionRole: S.optional(S.String),
    includeResources: S.optional(ResourceStateUpdateIncludeResources),
    exclusionRules: S.optional(ResourceStateUpdateExclusionRules),
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
).annotate({
  identifier: "StartResourceStateUpdateRequest",
}) as any as S.Schema<StartResourceStateUpdateRequest>;
export interface StartResourceStateUpdateResponse {
  lifecycleExecutionId?: string;
  resourceArn?: string;
}
export const StartResourceStateUpdateResponse = S.suspend(() =>
  S.Struct({
    lifecycleExecutionId: S.optional(S.String),
    resourceArn: S.optional(S.String),
  }),
).annotate({
  identifier: "StartResourceStateUpdateResponse",
}) as any as S.Schema<StartResourceStateUpdateResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagMap,
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
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeyList = string[];
export const TagKeyList = S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
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
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateDistributionConfigurationRequest {
  distributionConfigurationArn: string;
  description?: string;
  distributions: Distribution[];
  clientToken: string;
}
export const UpdateDistributionConfigurationRequest = S.suspend(() =>
  S.Struct({
    distributionConfigurationArn: S.String,
    description: S.optional(S.String),
    distributions: DistributionList,
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
).annotate({
  identifier: "UpdateDistributionConfigurationRequest",
}) as any as S.Schema<UpdateDistributionConfigurationRequest>;
export interface UpdateDistributionConfigurationResponse {
  requestId?: string;
  clientToken?: string;
  distributionConfigurationArn?: string;
}
export const UpdateDistributionConfigurationResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    clientToken: S.optional(S.String),
    distributionConfigurationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateDistributionConfigurationResponse",
}) as any as S.Schema<UpdateDistributionConfigurationResponse>;
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
}
export const UpdateImagePipelineRequest = S.suspend(() =>
  S.Struct({
    imagePipelineArn: S.String,
    description: S.optional(S.String),
    imageRecipeArn: S.optional(S.String),
    containerRecipeArn: S.optional(S.String),
    infrastructureConfigurationArn: S.String,
    distributionConfigurationArn: S.optional(S.String),
    imageTestsConfiguration: S.optional(ImageTestsConfiguration),
    enhancedImageMetadataEnabled: S.optional(S.Boolean),
    schedule: S.optional(Schedule),
    status: S.optional(PipelineStatus),
    clientToken: S.String.pipe(T.IdempotencyToken()),
    imageScanningConfiguration: S.optional(ImageScanningConfiguration),
    workflows: S.optional(WorkflowConfigurationList),
    loggingConfiguration: S.optional(PipelineLoggingConfiguration),
    executionRole: S.optional(S.String),
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
).annotate({
  identifier: "UpdateImagePipelineRequest",
}) as any as S.Schema<UpdateImagePipelineRequest>;
export interface UpdateImagePipelineResponse {
  requestId?: string;
  clientToken?: string;
  imagePipelineArn?: string;
}
export const UpdateImagePipelineResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    clientToken: S.optional(S.String),
    imagePipelineArn: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateImagePipelineResponse",
}) as any as S.Schema<UpdateImagePipelineResponse>;
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
export const UpdateInfrastructureConfigurationRequest = S.suspend(() =>
  S.Struct({
    infrastructureConfigurationArn: S.String,
    description: S.optional(S.String),
    instanceTypes: S.optional(InstanceTypeList),
    instanceProfileName: S.String,
    securityGroupIds: S.optional(SecurityGroupIds),
    subnetId: S.optional(S.String),
    logging: S.optional(Logging),
    keyPair: S.optional(S.String),
    terminateInstanceOnFailure: S.optional(S.Boolean),
    snsTopicArn: S.optional(S.String),
    resourceTags: S.optional(ResourceTagMap),
    instanceMetadataOptions: S.optional(InstanceMetadataOptions),
    placement: S.optional(Placement),
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
).annotate({
  identifier: "UpdateInfrastructureConfigurationRequest",
}) as any as S.Schema<UpdateInfrastructureConfigurationRequest>;
export interface UpdateInfrastructureConfigurationResponse {
  requestId?: string;
  clientToken?: string;
  infrastructureConfigurationArn?: string;
}
export const UpdateInfrastructureConfigurationResponse = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    clientToken: S.optional(S.String),
    infrastructureConfigurationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateInfrastructureConfigurationResponse",
}) as any as S.Schema<UpdateInfrastructureConfigurationResponse>;
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
export const UpdateLifecyclePolicyRequest = S.suspend(() =>
  S.Struct({
    lifecyclePolicyArn: S.String,
    description: S.optional(S.String),
    status: S.optional(LifecyclePolicyStatus),
    executionRole: S.String,
    resourceType: LifecyclePolicyResourceType,
    policyDetails: LifecyclePolicyDetails,
    resourceSelection: LifecyclePolicyResourceSelection,
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
).annotate({
  identifier: "UpdateLifecyclePolicyRequest",
}) as any as S.Schema<UpdateLifecyclePolicyRequest>;
export interface UpdateLifecyclePolicyResponse {
  lifecyclePolicyArn?: string;
}
export const UpdateLifecyclePolicyResponse = S.suspend(() =>
  S.Struct({ lifecyclePolicyArn: S.optional(S.String) }),
).annotate({
  identifier: "UpdateLifecyclePolicyResponse",
}) as any as S.Schema<UpdateLifecyclePolicyResponse>;

//# Errors
export class CallRateLimitExceededException extends S.TaggedErrorClass<CallRateLimitExceededException>()(
  "CallRateLimitExceededException",
  { message: S.optional(S.String) },
).pipe(C.withThrottlingError) {}
export class ClientException extends S.TaggedErrorClass<ClientException>()(
  "ClientException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ForbiddenException extends S.TaggedErrorClass<ForbiddenException>()(
  "ForbiddenException",
  { message: S.optional(S.String) },
).pipe(C.withAuthError) {}
export class IdempotentParameterMismatchException extends S.TaggedErrorClass<IdempotentParameterMismatchException>()(
  "IdempotentParameterMismatchException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class InvalidRequestException extends S.TaggedErrorClass<InvalidRequestException>()(
  "InvalidRequestException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ResourceInUseException extends S.TaggedErrorClass<ResourceInUseException>()(
  "ResourceInUseException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ServiceException extends S.TaggedErrorClass<ServiceException>()(
  "ServiceException",
  { message: S.optional(S.String) },
).pipe(C.withServerError) {}
export class ServiceUnavailableException extends S.TaggedErrorClass<ServiceUnavailableException>()(
  "ServiceUnavailableException",
  { message: S.optional(S.String) },
).pipe(C.withServerError) {}
export class DryRunOperationException extends S.TaggedErrorClass<DryRunOperationException>()(
  "DryRunOperationException",
  { message: S.optional(S.String) },
) {}
export class InvalidParameterCombinationException extends S.TaggedErrorClass<InvalidParameterCombinationException>()(
  "InvalidParameterCombinationException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class InvalidVersionNumberException extends S.TaggedErrorClass<InvalidVersionNumberException>()(
  "InvalidVersionNumberException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException extends S.TaggedErrorClass<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  { message: S.optional(S.String) },
).pipe(C.withQuotaError) {}
export class ResourceAlreadyExistsException extends S.TaggedErrorClass<ResourceAlreadyExistsException>()(
  "ResourceAlreadyExistsException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ResourceDependencyException extends S.TaggedErrorClass<ResourceDependencyException>()(
  "ResourceDependencyException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { message: S.optional(S.String) },
).pipe(C.withAuthError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class TooManyRequestsException extends S.TaggedErrorClass<TooManyRequestsException>()(
  "TooManyRequestsException",
  { message: S.optional(S.String) },
).pipe(C.withThrottlingError) {}
export class InvalidPaginationTokenException extends S.TaggedErrorClass<InvalidPaginationTokenException>()(
  "InvalidPaginationTokenException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class InvalidParameterException extends S.TaggedErrorClass<InvalidParameterException>()(
  "InvalidParameterException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class InvalidParameterValueException extends S.TaggedErrorClass<InvalidParameterValueException>()(
  "InvalidParameterValueException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}

//# Operations
export type CancelImageCreationError =
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
 * CancelImageCreation cancels the creation of Image. This operation can only be used on
 * images in a non-terminal state.
 */
export const cancelImageCreation: API.OperationMethod<
  CancelImageCreationRequest,
  CancelImageCreationResponse,
  CancelImageCreationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelImageCreationRequest,
  output: CancelImageCreationResponse,
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
 * Cancel a specific image lifecycle policy runtime instance.
 */
export const cancelLifecycleExecution: API.OperationMethod<
  CancelLifecycleExecutionRequest,
  CancelLifecycleExecutionResponse,
  CancelLifecycleExecutionError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelLifecycleExecutionRequest,
  output: CancelLifecycleExecutionResponse,
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
 */
export const createComponent: API.OperationMethod<
  CreateComponentRequest,
  CreateComponentResponse,
  CreateComponentError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateComponentRequest,
  output: CreateComponentResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateContainerRecipeRequest,
  output: CreateContainerRecipeResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateDistributionConfigurationRequest,
  output: CreateDistributionConfigurationResponse,
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
 * Creates a new image. This request will create a new image along with all of the
 * configured output resources defined in the distribution configuration. You must specify
 * exactly one recipe for your image, using either a ContainerRecipeArn or an
 * ImageRecipeArn.
 */
export const createImage: API.OperationMethod<
  CreateImageRequest,
  CreateImageResponse,
  CreateImageError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateImageRequest,
  output: CreateImageResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateImagePipelineRequest,
  output: CreateImagePipelineResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateImageRecipeRequest,
  output: CreateImageRecipeResponse,
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
}));
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
  | CommonErrors;
/**
 * Creates a new infrastructure configuration. An infrastructure configuration defines
 * the environment in which your image will be built and tested.
 */
export const createInfrastructureConfiguration: API.OperationMethod<
  CreateInfrastructureConfigurationRequest,
  CreateInfrastructureConfigurationResponse,
  CreateInfrastructureConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateInfrastructureConfigurationRequest,
  output: CreateInfrastructureConfigurationResponse,
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
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateLifecyclePolicyRequest,
  output: CreateLifecyclePolicyResponse,
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
 * Create a new workflow or a new version of an existing workflow.
 */
export const createWorkflow: API.OperationMethod<
  CreateWorkflowRequest,
  CreateWorkflowResponse,
  CreateWorkflowError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateWorkflowRequest,
  output: CreateWorkflowResponse,
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
}));
export type DeleteComponentError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ResourceDependencyException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes a component build version.
 */
export const deleteComponent: API.OperationMethod<
  DeleteComponentRequest,
  DeleteComponentResponse,
  DeleteComponentError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteComponentRequest,
  output: DeleteComponentResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ResourceDependencyException,
    ServiceException,
    ServiceUnavailableException,
  ],
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
 * Deletes a container recipe.
 */
export const deleteContainerRecipe: API.OperationMethod<
  DeleteContainerRecipeRequest,
  DeleteContainerRecipeResponse,
  DeleteContainerRecipeError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteContainerRecipeRequest,
  output: DeleteContainerRecipeResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ResourceDependencyException,
    ServiceException,
    ServiceUnavailableException,
  ],
}));
export type DeleteDistributionConfigurationError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ResourceDependencyException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes a distribution configuration.
 */
export const deleteDistributionConfiguration: API.OperationMethod<
  DeleteDistributionConfigurationRequest,
  DeleteDistributionConfigurationResponse,
  DeleteDistributionConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteDistributionConfigurationRequest,
  output: DeleteDistributionConfigurationResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ResourceDependencyException,
    ServiceException,
    ServiceUnavailableException,
  ],
}));
export type DeleteImageError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ResourceDependencyException
  | ServiceException
  | ServiceUnavailableException
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteImageRequest,
  output: DeleteImageResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ResourceDependencyException,
    ServiceException,
    ServiceUnavailableException,
  ],
}));
export type DeleteImagePipelineError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ResourceDependencyException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes an image pipeline.
 */
export const deleteImagePipeline: API.OperationMethod<
  DeleteImagePipelineRequest,
  DeleteImagePipelineResponse,
  DeleteImagePipelineError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteImagePipelineRequest,
  output: DeleteImagePipelineResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ResourceDependencyException,
    ServiceException,
    ServiceUnavailableException,
  ],
}));
export type DeleteImageRecipeError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ResourceDependencyException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes an image recipe.
 */
export const deleteImageRecipe: API.OperationMethod<
  DeleteImageRecipeRequest,
  DeleteImageRecipeResponse,
  DeleteImageRecipeError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteImageRecipeRequest,
  output: DeleteImageRecipeResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ResourceDependencyException,
    ServiceException,
    ServiceUnavailableException,
  ],
}));
export type DeleteInfrastructureConfigurationError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ResourceDependencyException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes an infrastructure configuration.
 */
export const deleteInfrastructureConfiguration: API.OperationMethod<
  DeleteInfrastructureConfigurationRequest,
  DeleteInfrastructureConfigurationResponse,
  DeleteInfrastructureConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteInfrastructureConfigurationRequest,
  output: DeleteInfrastructureConfigurationResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ResourceDependencyException,
    ServiceException,
    ServiceUnavailableException,
  ],
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
 * Delete the specified lifecycle policy resource.
 */
export const deleteLifecyclePolicy: API.OperationMethod<
  DeleteLifecyclePolicyRequest,
  DeleteLifecyclePolicyResponse,
  DeleteLifecyclePolicyError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteLifecyclePolicyRequest,
  output: DeleteLifecyclePolicyResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ResourceDependencyException,
    ServiceException,
    ServiceUnavailableException,
  ],
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
 * Deletes a specific workflow resource.
 */
export const deleteWorkflow: API.OperationMethod<
  DeleteWorkflowRequest,
  DeleteWorkflowResponse,
  DeleteWorkflowError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteWorkflowRequest,
  output: DeleteWorkflowResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ResourceDependencyException,
    ServiceException,
    ServiceUnavailableException,
  ],
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
 * DistributeImage distributes existing AMIs to additional regions and accounts without rebuilding the image.
 */
export const distributeImage: API.OperationMethod<
  DistributeImageRequest,
  DistributeImageResponse,
  DistributeImageError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DistributeImageRequest,
  output: DistributeImageResponse,
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
}));
export type GetComponentError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Gets a component object.
 */
export const getComponent: API.OperationMethod<
  GetComponentRequest,
  GetComponentResponse,
  GetComponentError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetComponentRequest,
  output: GetComponentResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
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
 * Gets a component policy.
 */
export const getComponentPolicy: API.OperationMethod<
  GetComponentPolicyRequest,
  GetComponentPolicyResponse,
  GetComponentPolicyError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetComponentPolicyRequest,
  output: GetComponentPolicyResponse,
  errors: [
    CallRateLimitExceededException,
    ForbiddenException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceException,
    ServiceUnavailableException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetContainerRecipeRequest,
  output: GetContainerRecipeResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetContainerRecipePolicyRequest,
  output: GetContainerRecipePolicyResponse,
  errors: [
    CallRateLimitExceededException,
    ForbiddenException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceException,
    ServiceUnavailableException,
  ],
}));
export type GetDistributionConfigurationError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Gets a distribution configuration.
 */
export const getDistributionConfiguration: API.OperationMethod<
  GetDistributionConfigurationRequest,
  GetDistributionConfigurationResponse,
  GetDistributionConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDistributionConfigurationRequest,
  output: GetDistributionConfigurationResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
}));
export type GetImageError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Gets an image.
 */
export const getImage: API.OperationMethod<
  GetImageRequest,
  GetImageResponse,
  GetImageError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetImageRequest,
  output: GetImageResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
}));
export type GetImagePipelineError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Gets an image pipeline.
 */
export const getImagePipeline: API.OperationMethod<
  GetImagePipelineRequest,
  GetImagePipelineResponse,
  GetImagePipelineError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetImagePipelineRequest,
  output: GetImagePipelineResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
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
 * Gets an image policy.
 */
export const getImagePolicy: API.OperationMethod<
  GetImagePolicyRequest,
  GetImagePolicyResponse,
  GetImagePolicyError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetImagePolicyRequest,
  output: GetImagePolicyResponse,
  errors: [
    CallRateLimitExceededException,
    ForbiddenException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceException,
    ServiceUnavailableException,
  ],
}));
export type GetImageRecipeError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Gets an image recipe.
 */
export const getImageRecipe: API.OperationMethod<
  GetImageRecipeRequest,
  GetImageRecipeResponse,
  GetImageRecipeError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetImageRecipeRequest,
  output: GetImageRecipeResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
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
 * Gets an image recipe policy.
 */
export const getImageRecipePolicy: API.OperationMethod<
  GetImageRecipePolicyRequest,
  GetImageRecipePolicyResponse,
  GetImageRecipePolicyError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetImageRecipePolicyRequest,
  output: GetImageRecipePolicyResponse,
  errors: [
    CallRateLimitExceededException,
    ForbiddenException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceException,
    ServiceUnavailableException,
  ],
}));
export type GetInfrastructureConfigurationError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Gets an infrastructure configuration.
 */
export const getInfrastructureConfiguration: API.OperationMethod<
  GetInfrastructureConfigurationRequest,
  GetInfrastructureConfigurationResponse,
  GetInfrastructureConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetInfrastructureConfigurationRequest,
  output: GetInfrastructureConfigurationResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
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
 * Get the runtime information that was logged for a specific runtime instance of the lifecycle policy.
 */
export const getLifecycleExecution: API.OperationMethod<
  GetLifecycleExecutionRequest,
  GetLifecycleExecutionResponse,
  GetLifecycleExecutionError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetLifecycleExecutionRequest,
  output: GetLifecycleExecutionResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
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
 * Get details for the specified image lifecycle policy.
 */
export const getLifecyclePolicy: API.OperationMethod<
  GetLifecyclePolicyRequest,
  GetLifecyclePolicyResponse,
  GetLifecyclePolicyError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetLifecyclePolicyRequest,
  output: GetLifecyclePolicyResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
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
 * Verify the subscription and perform resource dependency checks on the requested
 * Amazon Web Services Marketplace resource. For Amazon Web Services Marketplace components, the response contains fields to download the
 * components and their artifacts.
 */
export const getMarketplaceResource: API.OperationMethod<
  GetMarketplaceResourceRequest,
  GetMarketplaceResourceResponse,
  GetMarketplaceResourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetMarketplaceResourceRequest,
  output: GetMarketplaceResourceResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
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
 * Get a workflow resource object.
 */
export const getWorkflow: API.OperationMethod<
  GetWorkflowRequest,
  GetWorkflowResponse,
  GetWorkflowError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetWorkflowRequest,
  output: GetWorkflowResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
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
 * Get the runtime information that was logged for a specific runtime instance
 * of the workflow.
 */
export const getWorkflowExecution: API.OperationMethod<
  GetWorkflowExecutionRequest,
  GetWorkflowExecutionResponse,
  GetWorkflowExecutionError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetWorkflowExecutionRequest,
  output: GetWorkflowExecutionResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
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
 * Get the runtime information that was logged for a specific runtime instance of
 * the workflow step.
 */
export const getWorkflowStepExecution: API.OperationMethod<
  GetWorkflowStepExecutionRequest,
  GetWorkflowStepExecutionResponse,
  GetWorkflowStepExecutionError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetWorkflowStepExecutionRequest,
  output: GetWorkflowStepExecutionResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
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
 * Imports a component and transforms its data into a component document.
 */
export const importComponent: API.OperationMethod<
  ImportComponentRequest,
  ImportComponentResponse,
  ImportComponentError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ImportComponentRequest,
  output: ImportComponentResponse,
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
}));
export type ImportDiskImageError =
  | ClientException
  | ServiceException
  | ServiceUnavailableException
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ImportDiskImageRequest,
  output: ImportDiskImageResponse,
  errors: [ClientException, ServiceException, ServiceUnavailableException],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ImportVmImageRequest,
  output: ImportVmImageResponse,
  errors: [ClientException, ServiceException, ServiceUnavailableException],
}));
export type ListComponentBuildVersionsError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidPaginationTokenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns the list of component build versions for the specified component
 * version Amazon Resource Name (ARN).
 */
export const listComponentBuildVersions: API.OperationMethod<
  ListComponentBuildVersionsRequest,
  ListComponentBuildVersionsResponse,
  ListComponentBuildVersionsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListComponentBuildVersionsRequest,
  ) => stream.Stream<
    ListComponentBuildVersionsResponse,
    ListComponentBuildVersionsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListComponentBuildVersionsRequest,
  ) => stream.Stream<
    ComponentSummary,
    ListComponentBuildVersionsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListComponentBuildVersionsRequest,
  output: ListComponentBuildVersionsResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "componentSummaryList",
    pageSize: "maxResults",
  } as const,
}));
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
export const listComponents: API.OperationMethod<
  ListComponentsRequest,
  ListComponentsResponse,
  ListComponentsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListComponentsRequest,
  ) => stream.Stream<
    ListComponentsResponse,
    ListComponentsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListComponentsRequest,
  ) => stream.Stream<
    ComponentVersion,
    ListComponentsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListComponentsRequest,
  output: ListComponentsResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "componentVersionList",
    pageSize: "maxResults",
  } as const,
}));
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
export const listContainerRecipes: API.OperationMethod<
  ListContainerRecipesRequest,
  ListContainerRecipesResponse,
  ListContainerRecipesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListContainerRecipesRequest,
  ) => stream.Stream<
    ListContainerRecipesResponse,
    ListContainerRecipesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListContainerRecipesRequest,
  ) => stream.Stream<
    ContainerRecipeSummary,
    ListContainerRecipesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListContainerRecipesRequest,
  output: ListContainerRecipesResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "containerRecipeSummaryList",
    pageSize: "maxResults",
  } as const,
}));
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
export const listDistributionConfigurations: API.OperationMethod<
  ListDistributionConfigurationsRequest,
  ListDistributionConfigurationsResponse,
  ListDistributionConfigurationsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListDistributionConfigurationsRequest,
  ) => stream.Stream<
    ListDistributionConfigurationsResponse,
    ListDistributionConfigurationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListDistributionConfigurationsRequest,
  ) => stream.Stream<
    DistributionConfigurationSummary,
    ListDistributionConfigurationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDistributionConfigurationsRequest,
  output: ListDistributionConfigurationsResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "distributionConfigurationSummaryList",
    pageSize: "maxResults",
  } as const,
}));
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
export const listImageBuildVersions: API.OperationMethod<
  ListImageBuildVersionsRequest,
  ListImageBuildVersionsResponse,
  ListImageBuildVersionsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListImageBuildVersionsRequest,
  ) => stream.Stream<
    ListImageBuildVersionsResponse,
    ListImageBuildVersionsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListImageBuildVersionsRequest,
  ) => stream.Stream<
    ImageSummary,
    ListImageBuildVersionsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListImageBuildVersionsRequest,
  output: ListImageBuildVersionsResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "imageSummaryList",
    pageSize: "maxResults",
  } as const,
}));
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
export const listImagePackages: API.OperationMethod<
  ListImagePackagesRequest,
  ListImagePackagesResponse,
  ListImagePackagesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListImagePackagesRequest,
  ) => stream.Stream<
    ListImagePackagesResponse,
    ListImagePackagesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListImagePackagesRequest,
  ) => stream.Stream<
    ImagePackage,
    ListImagePackagesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListImagePackagesRequest,
  output: ListImagePackagesResponse,
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
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "imagePackageList",
    pageSize: "maxResults",
  } as const,
}));
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
export const listImagePipelineImages: API.OperationMethod<
  ListImagePipelineImagesRequest,
  ListImagePipelineImagesResponse,
  ListImagePipelineImagesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListImagePipelineImagesRequest,
  ) => stream.Stream<
    ListImagePipelineImagesResponse,
    ListImagePipelineImagesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListImagePipelineImagesRequest,
  ) => stream.Stream<
    ImageSummary,
    ListImagePipelineImagesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListImagePipelineImagesRequest,
  output: ListImagePipelineImagesResponse,
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
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "imageSummaryList",
    pageSize: "maxResults",
  } as const,
}));
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
export const listImagePipelines: API.OperationMethod<
  ListImagePipelinesRequest,
  ListImagePipelinesResponse,
  ListImagePipelinesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListImagePipelinesRequest,
  ) => stream.Stream<
    ListImagePipelinesResponse,
    ListImagePipelinesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListImagePipelinesRequest,
  ) => stream.Stream<
    ImagePipeline,
    ListImagePipelinesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListImagePipelinesRequest,
  output: ListImagePipelinesResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "imagePipelineList",
    pageSize: "maxResults",
  } as const,
}));
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
export const listImageRecipes: API.OperationMethod<
  ListImageRecipesRequest,
  ListImageRecipesResponse,
  ListImageRecipesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListImageRecipesRequest,
  ) => stream.Stream<
    ListImageRecipesResponse,
    ListImageRecipesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListImageRecipesRequest,
  ) => stream.Stream<
    ImageRecipeSummary,
    ListImageRecipesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListImageRecipesRequest,
  output: ListImageRecipesResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "imageRecipeSummaryList",
    pageSize: "maxResults",
  } as const,
}));
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
export const listImages: API.OperationMethod<
  ListImagesRequest,
  ListImagesResponse,
  ListImagesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListImagesRequest,
  ) => stream.Stream<
    ListImagesResponse,
    ListImagesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListImagesRequest,
  ) => stream.Stream<
    ImageVersion,
    ListImagesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListImagesRequest,
  output: ListImagesResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "imageVersionList",
    pageSize: "maxResults",
  } as const,
}));
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
export const listImageScanFindingAggregations: API.OperationMethod<
  ListImageScanFindingAggregationsRequest,
  ListImageScanFindingAggregationsResponse,
  ListImageScanFindingAggregationsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListImageScanFindingAggregationsRequest,
  ) => stream.Stream<
    ListImageScanFindingAggregationsResponse,
    ListImageScanFindingAggregationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListImageScanFindingAggregationsRequest,
  ) => stream.Stream<
    ImageScanFindingAggregation,
    ListImageScanFindingAggregationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListImageScanFindingAggregationsRequest,
  output: ListImageScanFindingAggregationsResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "responses",
  } as const,
}));
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
export const listImageScanFindings: API.OperationMethod<
  ListImageScanFindingsRequest,
  ListImageScanFindingsResponse,
  ListImageScanFindingsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListImageScanFindingsRequest,
  ) => stream.Stream<
    ListImageScanFindingsResponse,
    ListImageScanFindingsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListImageScanFindingsRequest,
  ) => stream.Stream<
    ImageScanFinding,
    ListImageScanFindingsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListImageScanFindingsRequest,
  output: ListImageScanFindingsResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "findings",
    pageSize: "maxResults",
  } as const,
}));
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
export const listInfrastructureConfigurations: API.OperationMethod<
  ListInfrastructureConfigurationsRequest,
  ListInfrastructureConfigurationsResponse,
  ListInfrastructureConfigurationsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListInfrastructureConfigurationsRequest,
  ) => stream.Stream<
    ListInfrastructureConfigurationsResponse,
    ListInfrastructureConfigurationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListInfrastructureConfigurationsRequest,
  ) => stream.Stream<
    InfrastructureConfigurationSummary,
    ListInfrastructureConfigurationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListInfrastructureConfigurationsRequest,
  output: ListInfrastructureConfigurationsResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "infrastructureConfigurationSummaryList",
    pageSize: "maxResults",
  } as const,
}));
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
export const listLifecycleExecutionResources: API.OperationMethod<
  ListLifecycleExecutionResourcesRequest,
  ListLifecycleExecutionResourcesResponse,
  ListLifecycleExecutionResourcesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListLifecycleExecutionResourcesRequest,
  ) => stream.Stream<
    ListLifecycleExecutionResourcesResponse,
    ListLifecycleExecutionResourcesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListLifecycleExecutionResourcesRequest,
  ) => stream.Stream<
    LifecycleExecutionResource,
    ListLifecycleExecutionResourcesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListLifecycleExecutionResourcesRequest,
  output: ListLifecycleExecutionResourcesResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "resources",
    pageSize: "maxResults",
  } as const,
}));
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
export const listLifecycleExecutions: API.OperationMethod<
  ListLifecycleExecutionsRequest,
  ListLifecycleExecutionsResponse,
  ListLifecycleExecutionsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListLifecycleExecutionsRequest,
  ) => stream.Stream<
    ListLifecycleExecutionsResponse,
    ListLifecycleExecutionsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListLifecycleExecutionsRequest,
  ) => stream.Stream<
    LifecycleExecution,
    ListLifecycleExecutionsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListLifecycleExecutionsRequest,
  output: ListLifecycleExecutionsResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "lifecycleExecutions",
    pageSize: "maxResults",
  } as const,
}));
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
export const listLifecyclePolicies: API.OperationMethod<
  ListLifecyclePoliciesRequest,
  ListLifecyclePoliciesResponse,
  ListLifecyclePoliciesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListLifecyclePoliciesRequest,
  ) => stream.Stream<
    ListLifecyclePoliciesResponse,
    ListLifecyclePoliciesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListLifecyclePoliciesRequest,
  ) => stream.Stream<
    LifecyclePolicySummary,
    ListLifecyclePoliciesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListLifecyclePoliciesRequest,
  output: ListLifecyclePoliciesResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "lifecyclePolicySummaryList",
    pageSize: "maxResults",
  } as const,
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceException,
  ],
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
 * Get a list of workflow steps that are waiting for action for workflows
 * in your Amazon Web Services account.
 */
export const listWaitingWorkflowSteps: API.OperationMethod<
  ListWaitingWorkflowStepsRequest,
  ListWaitingWorkflowStepsResponse,
  ListWaitingWorkflowStepsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListWaitingWorkflowStepsRequest,
  ) => stream.Stream<
    ListWaitingWorkflowStepsResponse,
    ListWaitingWorkflowStepsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListWaitingWorkflowStepsRequest,
  ) => stream.Stream<
    WorkflowStepExecution,
    ListWaitingWorkflowStepsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListWaitingWorkflowStepsRequest,
  output: ListWaitingWorkflowStepsResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "steps",
    pageSize: "maxResults",
  } as const,
}));
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
export const listWorkflowBuildVersions: API.OperationMethod<
  ListWorkflowBuildVersionsRequest,
  ListWorkflowBuildVersionsResponse,
  ListWorkflowBuildVersionsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListWorkflowBuildVersionsRequest,
  ) => stream.Stream<
    ListWorkflowBuildVersionsResponse,
    ListWorkflowBuildVersionsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListWorkflowBuildVersionsRequest,
  ) => stream.Stream<
    WorkflowSummary,
    ListWorkflowBuildVersionsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListWorkflowBuildVersionsRequest,
  output: ListWorkflowBuildVersionsResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workflowSummaryList",
    pageSize: "maxResults",
  } as const,
}));
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
export const listWorkflowExecutions: API.OperationMethod<
  ListWorkflowExecutionsRequest,
  ListWorkflowExecutionsResponse,
  ListWorkflowExecutionsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListWorkflowExecutionsRequest,
  ) => stream.Stream<
    ListWorkflowExecutionsResponse,
    ListWorkflowExecutionsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListWorkflowExecutionsRequest,
  ) => stream.Stream<
    WorkflowExecutionMetadata,
    ListWorkflowExecutionsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListWorkflowExecutionsRequest,
  output: ListWorkflowExecutionsResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workflowExecutions",
    pageSize: "maxResults",
  } as const,
}));
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
export const listWorkflows: API.OperationMethod<
  ListWorkflowsRequest,
  ListWorkflowsResponse,
  ListWorkflowsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListWorkflowsRequest,
  ) => stream.Stream<
    ListWorkflowsResponse,
    ListWorkflowsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListWorkflowsRequest,
  ) => stream.Stream<
    WorkflowVersion,
    ListWorkflowsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListWorkflowsRequest,
  output: ListWorkflowsResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workflowVersionList",
    pageSize: "maxResults",
  } as const,
}));
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
export const listWorkflowStepExecutions: API.OperationMethod<
  ListWorkflowStepExecutionsRequest,
  ListWorkflowStepExecutionsResponse,
  ListWorkflowStepExecutionsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListWorkflowStepExecutionsRequest,
  ) => stream.Stream<
    ListWorkflowStepExecutionsResponse,
    ListWorkflowStepExecutionsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListWorkflowStepExecutionsRequest,
  ) => stream.Stream<
    WorkflowStepMetadata,
    ListWorkflowStepExecutionsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListWorkflowStepExecutionsRequest,
  output: ListWorkflowStepExecutionsResponse,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "steps",
    pageSize: "maxResults",
  } as const,
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutComponentPolicyRequest,
  output: PutComponentPolicyResponse,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutContainerRecipePolicyRequest,
  output: PutContainerRecipePolicyResponse,
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
 * Applies a policy to an image. We recommend that you call the RAM API CreateResourceShare to share resources. If you call the Image Builder API
 * `PutImagePolicy`, you must also call the RAM API PromoteResourceShareCreatedFromPolicy in order for the resource to be
 * visible to all principals with whom the resource is shared.
 */
export const putImagePolicy: API.OperationMethod<
  PutImagePolicyRequest,
  PutImagePolicyResponse,
  PutImagePolicyError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutImagePolicyRequest,
  output: PutImagePolicyResponse,
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
 * Applies a policy to an image recipe. We recommend that you call the RAM API CreateResourceShare to share resources. If you call the Image Builder API
 * `PutImageRecipePolicy`, you must also call the RAM API PromoteResourceShareCreatedFromPolicy in order for the resource to be
 * visible to all principals with whom the resource is shared.
 */
export const putImageRecipePolicy: API.OperationMethod<
  PutImageRecipePolicyRequest,
  PutImageRecipePolicyResponse,
  PutImageRecipePolicyError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutImageRecipePolicyRequest,
  output: PutImageRecipePolicyResponse,
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
 * RetryImage retries an image distribution without rebuilding the image.
 */
export const retryImage: API.OperationMethod<
  RetryImageRequest,
  RetryImageResponse,
  RetryImageError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RetryImageRequest,
  output: RetryImageResponse,
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
 * Pauses or resumes image creation when the associated workflow runs a
 * `WaitForAction` step.
 */
export const sendWorkflowStepAction: API.OperationMethod<
  SendWorkflowStepActionRequest,
  SendWorkflowStepActionResponse,
  SendWorkflowStepActionError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SendWorkflowStepActionRequest,
  output: SendWorkflowStepActionResponse,
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
 * Manually triggers a pipeline to create an image.
 */
export const startImagePipelineExecution: API.OperationMethod<
  StartImagePipelineExecutionRequest,
  StartImagePipelineExecutionResponse,
  StartImagePipelineExecutionError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartImagePipelineExecutionRequest,
  output: StartImagePipelineExecutionResponse,
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
 * Begin asynchronous resource state update for lifecycle changes to the
 * specified image resources.
 */
export const startResourceStateUpdate: API.OperationMethod<
  StartResourceStateUpdateRequest,
  StartResourceStateUpdateResponse,
  StartResourceStateUpdateError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartResourceStateUpdateRequest,
  output: StartResourceStateUpdateResponse,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceException,
  ],
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
  | CommonErrors;
/**
 * Updates a new distribution configuration. Distribution configurations define and
 * configure the outputs of your pipeline.
 */
export const updateDistributionConfiguration: API.OperationMethod<
  UpdateDistributionConfigurationRequest,
  UpdateDistributionConfigurationResponse,
  UpdateDistributionConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateDistributionConfigurationRequest,
  output: UpdateDistributionConfigurationResponse,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateImagePipelineRequest,
  output: UpdateImagePipelineResponse,
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
  | CommonErrors;
/**
 * Updates a new infrastructure configuration. An infrastructure configuration defines
 * the environment in which your image will be built and tested.
 */
export const updateInfrastructureConfiguration: API.OperationMethod<
  UpdateInfrastructureConfigurationRequest,
  UpdateInfrastructureConfigurationResponse,
  UpdateInfrastructureConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateInfrastructureConfigurationRequest,
  output: UpdateInfrastructureConfigurationResponse,
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
 * Update the specified lifecycle policy.
 */
export const updateLifecyclePolicy: API.OperationMethod<
  UpdateLifecyclePolicyRequest,
  UpdateLifecyclePolicyResponse,
  UpdateLifecyclePolicyError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateLifecyclePolicyRequest,
  output: UpdateLifecyclePolicyResponse,
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
}));
