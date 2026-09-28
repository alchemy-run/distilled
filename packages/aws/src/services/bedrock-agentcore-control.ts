import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "Bedrock AgentCore Control",
  target: "AmazonBedrockAgentCoreControl",
  version: "2023-06-05",
  sigv4: "bedrock-agentcore",
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
                `https://bedrock-agentcore-control-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://bedrock-agentcore-control-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://bedrock-agentcore-control.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://bedrock-agentcore-control.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ConcurrentModificationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConcurrentModificationException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class DecryptionFailure
  extends /*@__PURE__*/ TE.TaggedError(
    "DecryptionFailure",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class EncryptionFailure
  extends /*@__PURE__*/ TE.TaggedError(
    "EncryptionFailure",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class RetryableConflictException
  extends /*@__PURE__*/ TE.TaggedError(
    "RetryableConflictException",
    ["ConflictError", "RetryableError"],
    { status: 409 },
  )<{ readonly message: string }> {}
export class ServiceException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class SubscriptionRequiredException
  extends /*@__PURE__*/ TE.TaggedError(
    "SubscriptionRequiredException",
    ["AuthError"],
    { status: 403 },
  )<{
    readonly message: string;
    readonly subscriptionUrl?: string;
    readonly productName?: string;
  }> {}
export class ThrottledException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottledException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class UnauthorizedException
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedException", ["AuthError"], {
    status: 401,
  })<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason: ValidationExceptionReason;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
export type DatasetId = string;
export type ClientToken = string;
export type SensitiveJson = unknown;
export type DatasetExampleList = any[];
export interface InlineExamplesSource {
  examples: any[];
}
export type S3Uri = string;
export interface S3Source {
  s3Uri: string;
}
export type DataSourceType =
  | { inlineExamples: InlineExamplesSource; s3Source?: never }
  | { inlineExamples?: never; s3Source: S3Source };
export interface AddDatasetExamplesRequest {
  datasetId: string;
  clientToken?: string;
  source: DataSourceType;
}
export type DatasetArn = string;
export type DatasetStatus =
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "ACTIVE"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | "DELETE_FAILED"
  | (string & {});
export type ExampleId = string;
export type ExampleIdList = string[];
export interface AddDatasetExamplesResponse {
  datasetArn: string;
  datasetId: string;
  status: DatasetStatus;
  addedCount: number;
  updatedAt: Date;
  exampleIds: string[];
}
export type GatewayIdentifier = string;
export type GatewayRateLimitId = string;
export type GatewayRateLimitDescription = string;
export type DimensionKey = string;
export type DimensionKeys = string[];
export type DimensionValue = string;
export type Dimensions = { [key: string]: string | undefined };
export type Period = "second" | "minute" | (string & {});
export interface RateConfig {
  rate: number;
  period: Period;
}
export type RateConfigs = RateConfig[];
export interface LimitEntry {
  dimensions: { [key: string]: string | undefined };
  requests?: RateConfig[];
  tokens?: RateConfig[];
  connections?: RateConfig[];
}
export type LimitEntries = LimitEntry[];
export interface BatchPutLimitEntry {
  rateLimitId?: string;
  description?: string;
  dimensionKeys: string[];
  entries: LimitEntry[];
}
export type BatchPutLimitEntries = BatchPutLimitEntry[];
export interface BatchPutGatewayRateLimitsRequest {
  gatewayIdentifier: string;
  clientToken?: string;
  rateLimits: BatchPutLimitEntry[];
}
export type GatewayRateLimitStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | (string & {});
export interface GatewayRateLimitDetail {
  rateLimitId: string;
  gatewayIdentifier: string;
  description?: string;
  dimensionKeys: string[];
  entries: LimitEntry[];
  status: GatewayRateLimitStatus;
  createdAt: Date;
  updatedAt: Date;
}
export type GatewayRateLimits = GatewayRateLimitDetail[];
export interface BatchPutGatewayRateLimitsResponse {
  rateLimits: GatewayRateLimitDetail[];
}
export type AgentRuntimeName = string;
export type RuntimeContainerUri = string;
export interface ContainerConfiguration {
  containerUri: string;
}
export interface S3Location {
  bucket: string;
  prefix: string;
  versionId?: string;
}
export type Code = { s3: S3Location };
export type AgentManagedRuntimeType =
  | "PYTHON_3_10"
  | "PYTHON_3_11"
  | "PYTHON_3_12"
  | "PYTHON_3_13"
  | "PYTHON_3_14"
  | "NODE_22"
  | (string & {});
export type EntryPoint = string;
export type EntryPoints = string[];
export interface CodeConfiguration {
  code: Code;
  runtime: AgentManagedRuntimeType;
  entryPoint: string[];
}
export type AgentRuntimeArtifact =
  | {
      containerConfiguration: ContainerConfiguration;
      codeConfiguration?: never;
    }
  | { containerConfiguration?: never; codeConfiguration: CodeConfiguration };
export type RoleArn = string;
export type NetworkMode = "PUBLIC" | "VPC" | (string & {});
export type SecurityGroupId = string;
export type SecurityGroups = string[];
export type SubnetId = string;
export type Subnets = string[];
export interface VpcConfig {
  securityGroups: string[];
  subnets: string[];
  requireServiceS3Endpoint?: boolean;
}
export interface NetworkConfiguration {
  networkMode: NetworkMode;
  networkModeConfig?: VpcConfig;
}
export type Description = string | redacted.Redacted<string>;
export type DiscoveryUrl = string;
export type AllowedAudience = string;
export type AllowedAudienceList = string[];
export type AllowedClient = string;
export type AllowedClientsList = string[];
export type AllowedScopeType = string;
export type AllowedScopesType = string[];
export type AdvertisedScopeMappingType = { [key: string]: string | undefined };
export type InboundTokenClaimNameType = string;
export type InboundTokenClaimValueType =
  | "STRING"
  | "STRING_ARRAY"
  | (string & {});
export type MatchValueString = string;
export type MatchValueStringList = string[];
export type ClaimMatchValueType =
  | { matchValueString: string; matchValueStringList?: never }
  | { matchValueString?: never; matchValueStringList: string[] };
export type ClaimMatchOperatorType =
  | "EQUALS"
  | "CONTAINS"
  | "CONTAINS_ANY"
  | (string & {});
export interface AuthorizingClaimMatchValueType {
  claimMatchValue: ClaimMatchValueType;
  claimMatchOperator: ClaimMatchOperatorType;
}
export interface CustomClaimValidationType {
  inboundTokenClaimName: string;
  inboundTokenClaimValueType: InboundTokenClaimValueType;
  authorizingClaimMatchValue: AuthorizingClaimMatchValueType;
}
export type CustomClaimValidationsType = CustomClaimValidationType[];
export type ResourceConfigurationIdentifier = string;
export type SelfManagedLatticeResource = {
  resourceConfigurationIdentifier: string;
};
export type VpcIdentifier = string;
export type SubnetIds = string[];
export type EndpointIpAddressType = "IPV4" | "IPV6" | (string & {});
export type SecurityGroupIdentifier = string;
export type SecurityGroupIds = string[];
export type TagKey = string;
export type TagValue = string;
export type TagsMap = { [key: string]: string | undefined };
export type RoutingDomain = string;
export interface ManagedVpcResource {
  vpcIdentifier: string;
  subnetIds: string[];
  endpointIpAddressType: EndpointIpAddressType;
  securityGroupIds?: string[];
  tags?: { [key: string]: string | undefined };
  routingDomain?: string;
}
export type PrivateEndpoint =
  | {
      selfManagedLatticeResource: SelfManagedLatticeResource;
      managedVpcResource?: never;
    }
  | {
      selfManagedLatticeResource?: never;
      managedVpcResource: ManagedVpcResource;
    };
export type PrivateEndpointOverrideDomain = string;
export interface PrivateEndpointOverride {
  domain: string;
  privateEndpoint: PrivateEndpoint;
}
export type PrivateEndpointOverrides = PrivateEndpointOverride[];
export type BedrockAgentcoreResourceArn = string;
export interface HostingEnvironment {
  arn: string;
}
export type HostingEnvironmentListType = HostingEnvironment[];
export type WorkloadIdentityNameType = string;
export type WorkloadIdentityNameListType = string[];
export interface AllowedWorkloadConfiguration {
  hostingEnvironments?: HostingEnvironment[];
  workloadIdentities?: string[];
}
export interface CustomJWTAuthorizerConfiguration {
  discoveryUrl: string;
  allowedAudience?: string[];
  allowedClients?: string[];
  allowedScopes?: string[];
  advertisedScopeMapping?: { [key: string]: string | undefined };
  customClaims?: CustomClaimValidationType[];
  privateEndpoint?: PrivateEndpoint;
  privateEndpointOverrides?: PrivateEndpointOverride[];
  allowedWorkloadConfiguration?: AllowedWorkloadConfiguration;
}
export type AuthorizerConfiguration = {
  customJWTAuthorizer: CustomJWTAuthorizerConfiguration;
};
export type HeaderName = string;
export type RequestHeaderAllowlist = string[];
export type RequestHeaderConfiguration = { requestHeaderAllowlist: string[] };
export type ServerProtocol = "MCP" | "HTTP" | "A2A" | "AGUI" | (string & {});
export interface ProtocolConfiguration {
  serverProtocol: ServerProtocol;
}
export interface LifecycleConfiguration {
  idleRuntimeSessionTimeout?: number;
  maxLifetime?: number;
}
export type EnvironmentVariableKey = string;
export type EnvironmentVariableValue = string;
export type EnvironmentVariablesMap = { [key: string]: string | undefined };
export type MountPath = string;
export interface SessionStorageConfiguration {
  mountPath: string;
}
export type S3FilesAccessPointArn = string;
export interface S3FilesAccessPointConfiguration {
  accessPointArn: string;
  mountPath: string;
}
export type EfsAccessPointArn = string;
export interface EfsAccessPointConfiguration {
  accessPointArn: string;
  mountPath: string;
}
export type CapacityProviderVolumeName = string;
export interface CapacityProviderVolumeConfiguration {
  volumeName: string;
  mountPath: string;
}
export type FilesystemConfiguration =
  | {
      sessionStorage: SessionStorageConfiguration;
      s3FilesAccessPoint?: never;
      efsAccessPoint?: never;
      capacityProviderVolume?: never;
    }
  | {
      sessionStorage?: never;
      s3FilesAccessPoint: S3FilesAccessPointConfiguration;
      efsAccessPoint?: never;
      capacityProviderVolume?: never;
    }
  | {
      sessionStorage?: never;
      s3FilesAccessPoint?: never;
      efsAccessPoint: EfsAccessPointConfiguration;
      capacityProviderVolume?: never;
    }
  | {
      sessionStorage?: never;
      s3FilesAccessPoint?: never;
      efsAccessPoint?: never;
      capacityProviderVolume: CapacityProviderVolumeConfiguration;
    };
export type FilesystemConfigurations = FilesystemConfiguration[];
export type CapacityProviderArn = string;
export interface CapacityProviderConfiguration {
  capacityProviderArn?: string;
}
export interface CreateAgentRuntimeRequest {
  agentRuntimeName: string;
  agentRuntimeArtifact: AgentRuntimeArtifact;
  roleArn: string;
  networkConfiguration?: NetworkConfiguration;
  clientToken?: string;
  description?: string | redacted.Redacted<string>;
  authorizerConfiguration?: AuthorizerConfiguration;
  requestHeaderConfiguration?: RequestHeaderConfiguration;
  protocolConfiguration?: ProtocolConfiguration;
  lifecycleConfiguration?: LifecycleConfiguration;
  environmentVariables?: { [key: string]: string | undefined };
  filesystemConfigurations?: FilesystemConfiguration[];
  capacityProviderConfiguration?: CapacityProviderConfiguration;
  tags?: { [key: string]: string | undefined };
}
export type AgentRuntimeArn = string;
export type WorkloadIdentityArn = string;
export interface WorkloadIdentityDetails {
  workloadIdentityArn?: string;
}
export type AgentRuntimeId = string;
export type AgentRuntimeVersion = string;
export type AgentRuntimeStatus =
  | "CREATING"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "READY"
  | "DELETING"
  | (string & {});
export interface CreateAgentRuntimeResponse {
  agentRuntimeArn: string;
  workloadIdentityDetails?: WorkloadIdentityDetails;
  agentRuntimeId: string;
  agentRuntimeVersion: string;
  createdAt: Date;
  status: AgentRuntimeStatus;
}
export type EndpointName = string | redacted.Redacted<string>;
export type AgentEndpointDescription = string;
export interface CreateAgentRuntimeEndpointRequest {
  agentRuntimeId: string;
  name: string | redacted.Redacted<string>;
  agentRuntimeVersion?: string;
  description?: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type AgentRuntimeEndpointArn = string;
export type AgentRuntimeEndpointStatus =
  | "CREATING"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "READY"
  | "DELETING"
  | (string & {});
export interface CreateAgentRuntimeEndpointResponse {
  targetVersion: string;
  agentRuntimeEndpointArn: string;
  agentRuntimeArn: string;
  agentRuntimeId?: string;
  endpointName?: string | redacted.Redacted<string>;
  status: AgentRuntimeEndpointStatus;
  createdAt: Date;
}
export type CredentialProviderName = string;
export type DefaultApiKeyType = string | redacted.Redacted<string>;
export type SecretIdType = string;
export type SecretJsonKeyType = string;
export interface SecretReference {
  secretId: string;
  jsonKey: string;
}
export type SecretSourceType = "MANAGED" | "EXTERNAL" | (string & {});
export interface CreateApiKeyCredentialProviderRequest {
  name: string;
  apiKey?: string | redacted.Redacted<string>;
  apiKeySecretConfig?: SecretReference;
  apiKeySecretSource?: SecretSourceType;
  tags?: { [key: string]: string | undefined };
}
export type SecretArn = string;
export interface Secret {
  secretArn: string;
}
export type ApiKeyCredentialProviderArnType = string;
export interface CreateApiKeyCredentialProviderResponse {
  apiKeySecretArn: Secret;
  apiKeySecretJsonKey?: string;
  apiKeySecretSource?: SecretSourceType;
  name: string;
  credentialProviderArn: string;
}
export type SandboxName = string;
export type BrowserNetworkMode = "PUBLIC" | "VPC" | (string & {});
export interface BrowserNetworkConfiguration {
  networkMode: BrowserNetworkMode;
  vpcConfig?: VpcConfig;
}
export interface RecordingConfig {
  enabled?: boolean;
  s3Location?: S3Location;
}
export interface BrowserSigningConfigInput {
  enabled: boolean;
}
export type ResourceLocation = { s3: S3Location };
export type BrowserEnterprisePolicyType =
  | "MANAGED"
  | "RECOMMENDED"
  | (string & {});
export interface BrowserEnterprisePolicy {
  location: ResourceLocation;
  type?: BrowserEnterprisePolicyType;
}
export type BrowserEnterprisePolicies = BrowserEnterprisePolicy[];
export type ToolSecretArn = string;
export interface SecretsManagerLocation {
  secretArn: string;
}
export type CertificateLocation = { secretsManager: SecretsManagerLocation };
export interface Certificate {
  location: CertificateLocation;
}
export type Certificates = Certificate[];
export type S3FilesFileSystemArn = string;
export interface S3FilesConfiguration {
  accessPointArn: string;
  mountPath: string;
  fileSystemArn: string;
}
export type EfsFileSystemArn = string;
export interface EfsConfiguration {
  accessPointArn: string;
  mountPath: string;
  fileSystemArn: string;
}
export type ToolsFileSystemConfiguration =
  | { s3FilesConfiguration: S3FilesConfiguration; efsConfiguration?: never }
  | { s3FilesConfiguration?: never; efsConfiguration: EfsConfiguration };
export type ToolsFileSystemConfigurations = ToolsFileSystemConfiguration[];
export interface CreateBrowserRequest {
  name: string;
  description?: string | redacted.Redacted<string>;
  executionRoleArn?: string;
  networkConfiguration: BrowserNetworkConfiguration;
  recording?: RecordingConfig;
  browserSigning?: BrowserSigningConfigInput;
  enterprisePolicies?: BrowserEnterprisePolicy[];
  certificates?: Certificate[];
  filesystemConfigurations?: ToolsFileSystemConfiguration[];
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type BrowserId = string;
export type BrowserArn = string;
export type BrowserStatus =
  | "CREATING"
  | "CREATE_FAILED"
  | "READY"
  | "DELETING"
  | "DELETE_FAILED"
  | "DELETED"
  | (string & {});
export interface CreateBrowserResponse {
  browserId: string;
  browserArn: string;
  createdAt: Date;
  status: BrowserStatus;
}
export type BrowserProfileName = string;
export interface CreateBrowserProfileRequest {
  name: string;
  description?: string | redacted.Redacted<string>;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type BrowserProfileId = string;
export type BrowserProfileArn = string;
export type BrowserProfileStatus =
  | "READY"
  | "DELETING"
  | "DELETED"
  | "SAVING"
  | (string & {});
export interface CreateBrowserProfileResponse {
  profileId: string;
  profileArn: string;
  createdAt: Date;
  status: BrowserProfileStatus;
}
export type CapacityProviderName = string;
export interface PermissionsConfiguration {
  capacityProviderOperatorRoleArn: string;
}
export type OperatingSystem = "LINUX_X86_64" | "LINUX_ARM64" | (string & {});
export type EC2InstanceType = string;
export type InstanceTypeList = string[];
export interface InstanceRequirements {
  allowedInstanceTypes: string[];
}
export type DeviceName = string;
export type VirtualDeviceName = string;
export type EbsVolumeType =
  | "standard"
  | "io1"
  | "io2"
  | "gp2"
  | "sc1"
  | "st1"
  | "gp3"
  | (string & {});
export type VolumeIops = number;
export type VolumeThroughput = number;
export type KmsKeyId = string;
export type EbsSnapshotId = string;
export type VolumeSizeGiB = number;
export type EbsVolumeInitializationRate = number;
export type EbsCardIndex = number;
export interface EphemeralEBSVolumeConfiguration {
  volumeType?: EbsVolumeType;
  iops?: number;
  throughput?: number;
  encrypted?: boolean;
  kmsKeyId?: string;
  snapshotId?: string;
  volumeSize?: number;
  volumeInitializationRate?: number;
  ebsCardIndex?: number;
}
export interface EphemeralBlockDeviceMapping {
  deviceName?: string;
  virtualName?: string;
  ebs?: EphemeralEBSVolumeConfiguration;
}
export type EphemeralBlockDeviceMappingList = EphemeralBlockDeviceMapping[];
export type Monitoring = "BASIC" | "DETAILED" | (string & {});
export type LicenseConfigurationArn = string;
export interface LicenseSpecification {
  licenseConfigurationArn: string;
}
export type LicenseSpecificationList = LicenseSpecification[];
export type CapacityReservationPreference =
  | "capacity-reservations-only"
  | "open"
  | "none"
  | (string & {});
export type CapacityReservationId = string;
export type CapacityReservationResourceGroupArn = string;
export interface CapacityReservationTarget {
  capacityReservationId?: string;
  capacityReservationResourceGroupArn?: string;
}
export interface CapacityReservationSpecification {
  capacityReservationPreference?: CapacityReservationPreference;
  capacityReservationTarget?: CapacityReservationTarget;
}
export type SSHKeyName = string;
export type InstanceProfileArn = string;
export interface LaunchParameters {
  operatingSystem: OperatingSystem;
  instanceRequirements: InstanceRequirements;
  ephemeralVolumes?: EphemeralBlockDeviceMapping[];
  monitoring?: Monitoring;
  licenseSpecifications?: LicenseSpecification[];
  capacityReservationSpecification?: CapacityReservationSpecification;
  sshKeyName?: string;
  instanceProfileArn?: string;
  propagatedTags?: { [key: string]: string | undefined };
}
export type LaunchTemplateSource = { launchParameters: LaunchParameters };
export type SubnetIdList = string[];
export type SecurityGroupIdList = string[];
export interface VpcConfiguration {
  subnets: string[];
  securityGroups: string[];
}
export type VolumeName = string;
export interface EbsVolumeConfiguration {
  name: string;
  sizeGiB: number;
  volumeType?: EbsVolumeType;
  iops?: number;
  throughput?: number;
  encrypted?: boolean;
  kmsKeyId?: string;
  snapshotId?: string;
}
export type VolumeConfiguration = { ebsConfiguration: EbsVolumeConfiguration };
export type VolumeConfigurationList = VolumeConfiguration[];
export interface InstanceLifecycleConfiguration {
  idleInstanceTimeout?: number;
  maxLifetime?: number;
}
export interface RootVolumeConfiguration {
  volumeType?: EbsVolumeType;
  iops?: number;
  throughput?: number;
  encrypted?: boolean;
  kmsKeyId?: string;
  freeSpaceGiB?: number;
}
export interface Ec2Configuration {
  launchTemplateSource: LaunchTemplateSource;
  vpcConfiguration: VpcConfiguration;
  volumes?: VolumeConfiguration[];
  lifecycleConfiguration?: InstanceLifecycleConfiguration;
  rootVolume?: RootVolumeConfiguration;
}
export type ComputeConfiguration = { ec2Configuration: Ec2Configuration };
export interface CreateCapacityProviderInput {
  name: string;
  description?: string | redacted.Redacted<string>;
  permissionsConfiguration: PermissionsConfiguration;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
  computeConfiguration: ComputeConfiguration;
}
export type CapacityProviderId = string;
export type CapacityProviderStatus =
  | "CREATING"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "READY"
  | "DELETING"
  | "DELETE_FAILED"
  | (string & {});
export interface CreateCapacityProviderOutput {
  capacityProviderId: string;
  capacityProviderArn: string;
  name: string;
  status: CapacityProviderStatus;
}
export type CodeInterpreterNetworkMode =
  | "PUBLIC"
  | "SANDBOX"
  | "VPC"
  | (string & {});
export interface CodeInterpreterNetworkConfiguration {
  networkMode: CodeInterpreterNetworkMode;
  vpcConfig?: VpcConfig;
}
export interface CreateCodeInterpreterRequest {
  name: string;
  description?: string | redacted.Redacted<string>;
  executionRoleArn?: string;
  networkConfiguration: CodeInterpreterNetworkConfiguration;
  certificates?: Certificate[];
  filesystemConfigurations?: ToolsFileSystemConfiguration[];
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type CodeInterpreterId = string;
export type CodeInterpreterArn = string;
export type CodeInterpreterStatus =
  | "CREATING"
  | "CREATE_FAILED"
  | "READY"
  | "DELETING"
  | "DELETE_FAILED"
  | "DELETED"
  | (string & {});
export interface CreateCodeInterpreterResponse {
  codeInterpreterId: string;
  codeInterpreterArn: string;
  createdAt: Date;
  status: CodeInterpreterStatus;
}
export type ConfigurationBundleName = string;
export type ConfigurationBundleDescription = string | redacted.Redacted<string>;
export type ComponentIdentifier = string;
export interface ComponentConfiguration {
  configuration: any;
}
export type ComponentConfigurationMap = {
  [key: string]: ComponentConfiguration | undefined;
};
export type BranchName = string;
export interface VersionCreatedBySource {
  name: string;
  arn?: string;
}
export type KmsKeyArn = string;
export interface CreateConfigurationBundleRequest {
  clientToken?: string;
  bundleName: string;
  description?: string | redacted.Redacted<string>;
  components: { [key: string]: ComponentConfiguration | undefined };
  branchName?: string;
  commitMessage?: string;
  createdBy?: VersionCreatedBySource;
  kmsKeyArn?: string;
  tags?: { [key: string]: string | undefined };
}
export type ConfigurationBundleArn = string;
export type ConfigurationBundleId = string;
export type ConfigurationBundleVersion = string;
export interface CreateConfigurationBundleResponse {
  bundleArn: string;
  bundleId: string;
  versionId: string;
  createdAt: Date;
}
export type DatasetName = string;
export type DatasetSchemaType =
  | "AGENTCORE_EVALUATION_PREDEFINED_V1"
  | "AGENTCORE_EVALUATION_SIMULATED_V1"
  | "THIRD_PARTY_EVALUATION_V1"
  | (string & {});
export interface CreateDatasetRequest {
  clientToken?: string;
  datasetName: string;
  description?: string;
  source: DataSourceType;
  schemaType: DatasetSchemaType;
  kmsKeyArn?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateDatasetResponse {
  datasetArn: string;
  datasetId: string;
  status: DatasetStatus;
  createdAt: Date;
}
export interface CreateDatasetVersionRequest {
  datasetId: string;
  clientToken?: string;
}
export type DatasetVersion = string;
export interface CreateDatasetVersionResponse {
  datasetArn: string;
  datasetId: string;
  status: DatasetStatus;
  datasetVersion: string;
  createdAt: Date;
}
export type CustomEvaluatorName = string;
export type EvaluatorDescription = string | redacted.Redacted<string>;
export type EvaluatorInstructions = string | redacted.Redacted<string>;
export interface NumericalScaleDefinition {
  definition: string;
  value: number;
  label: string;
}
export type NumericalScaleDefinitions = NumericalScaleDefinition[];
export interface CategoricalScaleDefinition {
  definition: string;
  label: string;
}
export type CategoricalScaleDefinitions = CategoricalScaleDefinition[];
export type RatingScale =
  | { numerical: NumericalScaleDefinition[]; categorical?: never }
  | { numerical?: never; categorical: CategoricalScaleDefinition[] };
export type ModelId = string;
export type NonEmptyString = string;
export type NonEmptyStringList = string[];
export interface InferenceConfiguration {
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  stopSequences?: string[];
}
export type AdditionalModelRequestFields = unknown;
export interface BedrockEvaluatorModelConfig {
  modelId: string;
  inferenceConfig?: InferenceConfiguration;
  additionalModelRequestFields?: any;
}
export interface ReasoningConfiguration {
  effort?: string;
}
export interface OpenResponsesEvaluatorModelConfig {
  modelId: string;
  maxOutputTokens?: number;
  temperature?: number;
  topP?: number;
  reasoning?: ReasoningConfiguration;
}
export type EvaluatorModelConfig =
  | {
      bedrockEvaluatorModelConfig: BedrockEvaluatorModelConfig;
      responsesEvaluatorModelConfig?: never;
    }
  | {
      bedrockEvaluatorModelConfig?: never;
      responsesEvaluatorModelConfig: OpenResponsesEvaluatorModelConfig;
    };
export interface LlmAsAJudgeEvaluatorConfig {
  instructions: string | redacted.Redacted<string>;
  ratingScale: RatingScale;
  modelConfig: EvaluatorModelConfig;
}
export type LambdaArn = string;
export interface LambdaEvaluatorConfig {
  lambdaArn: string;
  lambdaTimeoutInSeconds?: number;
}
export type CodeBasedEvaluatorConfig = { lambdaConfig: LambdaEvaluatorConfig };
export type EvaluatorId = string;
export interface DerivedEvaluatorConfig {
  baseEvaluatorId: string;
  modelConfig: EvaluatorModelConfig;
}
export type EvaluatorConfig =
  | {
      llmAsAJudge: LlmAsAJudgeEvaluatorConfig;
      codeBased?: never;
      derived?: never;
    }
  | {
      llmAsAJudge?: never;
      codeBased: CodeBasedEvaluatorConfig;
      derived?: never;
    }
  | { llmAsAJudge?: never; codeBased?: never; derived: DerivedEvaluatorConfig };
export type EvaluatorLevel = "TOOL_CALL" | "TRACE" | "SESSION" | (string & {});
export interface CreateEvaluatorRequest {
  clientToken?: string;
  evaluatorName: string;
  description?: string | redacted.Redacted<string>;
  evaluatorConfig: EvaluatorConfig;
  level: EvaluatorLevel;
  kmsKeyArn?: string;
  tags?: { [key: string]: string | undefined };
}
export type CustomEvaluatorArn = string;
export type EvaluatorStatus =
  | "ACTIVE"
  | "CREATING"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "DELETING"
  | (string & {});
export interface CreateEvaluatorResponse {
  evaluatorArn: string;
  evaluatorId: string;
  createdAt: Date;
  status: EvaluatorStatus;
}
export type GatewayName = string;
export type GatewayDescription = string | redacted.Redacted<string>;
export type GatewayProtocolType = "MCP" | (string & {});
export type McpVersion = string;
export type McpSupportedVersions = string[];
export type McpInstructions = string | redacted.Redacted<string>;
export type SearchType = "SEMANTIC" | (string & {});
export interface SessionConfiguration {
  sessionTimeoutInSeconds?: number;
}
export interface StreamingConfiguration {
  enableResponseStreaming?: boolean;
}
export interface MCPGatewayConfiguration {
  supportedVersions?: string[];
  instructions?: string | redacted.Redacted<string>;
  searchType?: SearchType;
  sessionConfiguration?: SessionConfiguration;
  streamingConfiguration?: StreamingConfiguration;
}
export type GatewayProtocolConfiguration = { mcp: MCPGatewayConfiguration };
export type AuthorizerType =
  | "CUSTOM_JWT"
  | "AWS_IAM"
  | "NONE"
  | "AUTHENTICATE_ONLY"
  | (string & {});
export type LambdaFunctionArn = string;
export interface LambdaInterceptorConfiguration {
  arn: string;
}
export type InterceptorConfiguration = {
  lambda: LambdaInterceptorConfiguration;
};
export type GatewayInterceptionPoint = "REQUEST" | "RESPONSE" | (string & {});
export type GatewayInterceptionPoints = GatewayInterceptionPoint[];
export type InterceptorPayloadExclusion = "RESPONSE_BODY" | (string & {});
export type InterceptorPayloadExclusionSelector = {
  field: InterceptorPayloadExclusion;
};
export type InterceptorPayloadExclusionSelectorList =
  InterceptorPayloadExclusionSelector[];
export interface InterceptorPayloadFilter {
  exclude: InterceptorPayloadExclusionSelector[];
}
export interface InterceptorInputConfiguration {
  passRequestHeaders: boolean;
  payloadFilter?: InterceptorPayloadFilter;
}
export interface GatewayInterceptorConfiguration {
  interceptor: InterceptorConfiguration;
  interceptionPoints: GatewayInterceptionPoint[];
  inputConfiguration?: InterceptorInputConfiguration;
}
export type GatewayInterceptorConfigurations =
  GatewayInterceptorConfiguration[];
export type GatewayPolicyEngineArn = string;
export type GatewayPolicyEngineMode = "LOG_ONLY" | "ENFORCE" | (string & {});
export interface GatewayPolicyEngineConfiguration {
  arn: string;
  mode: GatewayPolicyEngineMode;
}
export type ExceptionLevel = "DEBUG" | (string & {});
export interface CreateGatewayRequest {
  name: string;
  description?: string | redacted.Redacted<string>;
  clientToken?: string;
  roleArn: string;
  protocolType?: GatewayProtocolType;
  protocolConfiguration?: GatewayProtocolConfiguration;
  authorizerType: AuthorizerType;
  authorizerConfiguration?: AuthorizerConfiguration;
  kmsKeyArn?: string;
  interceptorConfigurations?: GatewayInterceptorConfiguration[];
  policyEngineConfiguration?: GatewayPolicyEngineConfiguration;
  exceptionLevel?: ExceptionLevel;
  tags?: { [key: string]: string | undefined };
}
export type GatewayArn = string;
export type GatewayId = string;
export type GatewayUrl = string;
export type GatewayStatus =
  | "CREATING"
  | "UPDATING"
  | "UPDATE_UNSUCCESSFUL"
  | "DELETING"
  | "READY"
  | "FAILED"
  | (string & {});
export type StatusReason = string;
export type StatusReasons = string[];
export interface LambdaTransformConfiguration {
  arn?: string;
}
export interface CustomTransformConfiguration {
  lambda?: LambdaTransformConfiguration;
}
export type WebAclArn = string;
export type WafFailureMode = "FAIL_CLOSE" | "FAIL_OPEN" | (string & {});
export interface WafConfiguration {
  failureMode?: WafFailureMode;
}
export interface CreateGatewayResponse {
  gatewayArn: string;
  gatewayId: string;
  gatewayUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  status: GatewayStatus;
  statusReasons?: string[];
  name: string;
  description?: string | redacted.Redacted<string>;
  roleArn?: string;
  protocolType?: GatewayProtocolType;
  protocolConfiguration?: GatewayProtocolConfiguration;
  authorizerType: AuthorizerType;
  authorizerConfiguration?: AuthorizerConfiguration;
  kmsKeyArn?: string;
  customTransformConfiguration?: CustomTransformConfiguration;
  interceptorConfigurations?: GatewayInterceptorConfiguration[];
  policyEngineConfiguration?: GatewayPolicyEngineConfiguration;
  workloadIdentityDetails?: WorkloadIdentityDetails;
  exceptionLevel?: ExceptionLevel;
  webAclArn?: string;
  wafConfiguration?: WafConfiguration;
}
export interface CreateGatewayRateLimitRequest {
  gatewayIdentifier: string;
  clientToken?: string;
  rateLimitId?: string;
  description?: string;
  dimensionKeys: string[];
  entries: LimitEntry[];
}
export interface CreateGatewayRateLimitResponse {
  rateLimitId: string;
  gatewayIdentifier: string;
  description?: string;
  dimensionKeys: string[];
  entries: LimitEntry[];
  status: GatewayRateLimitStatus;
  createdAt: Date;
  updatedAt: Date;
}
export type GatewayRulePriority = number;
export type IamPrincipalArn = string;
export type PrincipalMatchOperator =
  | "StringEquals"
  | "StringLike"
  | (string & {});
export interface IamPrincipal {
  arn: string;
  operator?: PrincipalMatchOperator;
}
export type MatchPrincipalEntry = { iamPrincipal: IamPrincipal };
export type MatchPrincipalEntries = MatchPrincipalEntry[];
export interface MatchPrincipals {
  anyOf: MatchPrincipalEntry[];
}
export type MatchPathPattern = string;
export type MatchPathPatterns = string[];
export interface MatchPaths {
  anyOf: string[];
}
export type Condition =
  | { matchPrincipals: MatchPrincipals; matchPaths?: never }
  | { matchPrincipals?: never; matchPaths: MatchPaths };
export type Conditions = Condition[];
export type GatewayConfigurationBundleArn = string;
export interface StaticOverride {
  bundleArn: string;
  bundleVersion: string;
}
export interface ConfigurationBundleReference {
  bundleArn: string;
  bundleVersion: string;
}
export type TrafficSplitMetadataKey = string;
export type TrafficSplitMetadataValue = string;
export type TrafficSplitMetadataMap = { [key: string]: string | undefined };
export interface TrafficSplitEntry {
  name: string;
  weight: number;
  configurationBundle: ConfigurationBundleReference;
  description?: string;
  metadata?: { [key: string]: string | undefined };
}
export type TrafficSplitEntries = TrafficSplitEntry[];
export interface WeightedOverride {
  trafficSplit: TrafficSplitEntry[];
}
export type ConfigurationBundleAction =
  | { staticOverride: StaticOverride; weightedOverride?: never }
  | { staticOverride?: never; weightedOverride: WeightedOverride };
export type TargetName = string | redacted.Redacted<string>;
export interface StaticRoute {
  targetName: string | redacted.Redacted<string>;
}
export interface TargetTrafficSplitEntry {
  name: string;
  weight: number;
  targetName: string | redacted.Redacted<string>;
  description?: string;
  metadata?: { [key: string]: string | undefined };
}
export type TargetTrafficSplitEntries = TargetTrafficSplitEntry[];
export interface WeightedRoute {
  trafficSplit: TargetTrafficSplitEntry[];
}
export type RouteToTargetAction =
  | { staticRoute: StaticRoute; weightedRoute?: never }
  | { staticRoute?: never; weightedRoute: WeightedRoute };
export type Action =
  | { configurationBundle: ConfigurationBundleAction; routeToTarget?: never }
  | { configurationBundle?: never; routeToTarget: RouteToTargetAction };
export type Actions = Action[];
export type GatewayRuleDescription = string;
export interface CreateGatewayRuleRequest {
  gatewayIdentifier: string;
  clientToken?: string;
  priority: number;
  conditions?: Condition[];
  actions: Action[];
  description?: string;
}
export type GatewayRuleId = string;
export type GatewayRuleStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | (string & {});
export interface SystemManagedBlock {
  managedBy: string;
}
export interface CreateGatewayRuleResponse {
  ruleId: string;
  gatewayArn: string;
  priority: number;
  conditions?: Condition[];
  actions: Action[];
  description?: string;
  createdAt: Date;
  status: GatewayRuleStatus;
  system?: SystemManagedBlock;
}
export type TargetDescription = string | redacted.Redacted<string>;
export type S3BucketUri = string;
export type AwsAccountId = string;
export interface S3Configuration {
  uri?: string;
  bucketOwnerAccountId?: string;
}
export type InlinePayload = string | redacted.Redacted<string>;
export type ApiSchemaConfiguration =
  | { s3: S3Configuration; inlinePayload?: never }
  | { s3?: never; inlinePayload: string | redacted.Redacted<string> };
export type SchemaType =
  | "string"
  | "number"
  | "object"
  | "array"
  | "boolean"
  | "integer"
  | (string & {});
export type SchemaProperties = { [key: string]: SchemaDefinition | undefined };
export type RequiredProperties = string[];
export interface SchemaDefinition {
  type: SchemaType;
  properties?: { [key: string]: SchemaDefinition | undefined };
  required?: string[];
  items?: SchemaDefinition;
  description?: string;
}
export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: SchemaDefinition;
  outputSchema?: SchemaDefinition;
}
export type ToolDefinitions = ToolDefinition[];
export type ToolSchema =
  | { s3: S3Configuration; inlinePayload?: never }
  | { s3?: never; inlinePayload: ToolDefinition[] };
export interface McpLambdaTargetConfiguration {
  lambdaArn: string;
  toolSchema: ToolSchema;
}
export type McpToolSchemaConfiguration =
  | { s3: S3Configuration; inlinePayload?: never }
  | { s3?: never; inlinePayload: string | redacted.Redacted<string> };
export type ListingMode = "DEFAULT" | "DYNAMIC" | (string & {});
export type TargetResourcePriority = number;
export interface McpServerTargetConfiguration {
  endpoint: string;
  mcpToolSchema?: McpToolSchemaConfiguration;
  listingMode?: ListingMode;
  resourcePriority?: number;
}
export type RestApiMethod =
  | "GET"
  | "DELETE"
  | "HEAD"
  | "OPTIONS"
  | "PATCH"
  | "PUT"
  | "POST"
  | (string & {});
export interface ApiGatewayToolOverride {
  name: string;
  description?: string;
  path: string;
  method: RestApiMethod;
}
export type ApiGatewayToolOverrides = ApiGatewayToolOverride[];
export type RestApiMethods = RestApiMethod[];
export interface ApiGatewayToolFilter {
  filterPath: string;
  methods: RestApiMethod[];
}
export type ApiGatewayToolFilters = ApiGatewayToolFilter[];
export interface ApiGatewayToolConfiguration {
  toolOverrides?: ApiGatewayToolOverride[];
  toolFilters: ApiGatewayToolFilter[];
}
export interface ApiGatewayTargetConfiguration {
  restApiId: string;
  stage: string;
  apiGatewayToolConfiguration: ApiGatewayToolConfiguration;
}
export type ConnectorId = string;
export type ConnectorVersion = string;
export interface ConnectorSource {
  connectorId: string;
  version?: string;
}
export type EnabledConnectors = string[];
export interface ConnectorParameterOverride {
  path: string;
  description?: string;
  visible?: boolean;
}
export type ConnectorParameterOverrides = ConnectorParameterOverride[];
export interface ConnectorConfiguration {
  name: string;
  description?: string;
  parameterValues?: any;
  parameterOverrides?: ConnectorParameterOverride[];
}
export type ConnectorConfigurations = ConnectorConfiguration[];
export interface ConnectorTargetConfiguration {
  source: ConnectorSource;
  enabled?: string[];
  configurations?: ConnectorConfiguration[];
}
export type McpTargetConfiguration =
  | {
      openApiSchema: ApiSchemaConfiguration;
      smithyModel?: never;
      lambda?: never;
      mcpServer?: never;
      apiGateway?: never;
      connector?: never;
    }
  | {
      openApiSchema?: never;
      smithyModel: ApiSchemaConfiguration;
      lambda?: never;
      mcpServer?: never;
      apiGateway?: never;
      connector?: never;
    }
  | {
      openApiSchema?: never;
      smithyModel?: never;
      lambda: McpLambdaTargetConfiguration;
      mcpServer?: never;
      apiGateway?: never;
      connector?: never;
    }
  | {
      openApiSchema?: never;
      smithyModel?: never;
      lambda?: never;
      mcpServer: McpServerTargetConfiguration;
      apiGateway?: never;
      connector?: never;
    }
  | {
      openApiSchema?: never;
      smithyModel?: never;
      lambda?: never;
      mcpServer?: never;
      apiGateway: ApiGatewayTargetConfiguration;
      connector?: never;
    }
  | {
      openApiSchema?: never;
      smithyModel?: never;
      lambda?: never;
      mcpServer?: never;
      apiGateway?: never;
      connector: ConnectorTargetConfiguration;
    };
export type RuntimeArn = string;
export type RuntimeQualifier = string;
export interface HttpApiSchemaConfiguration {
  source: ApiSchemaConfiguration;
}
export interface RuntimeTargetConfiguration {
  arn: string;
  qualifier?: string;
  schema?: HttpApiSchemaConfiguration;
}
export type PassthroughEndpoint = string;
export type PassthroughProtocolType =
  | "MCP"
  | "A2A"
  | "INFERENCE"
  | "CUSTOM"
  | (string & {});
export type StickinessTimeout = number;
export type CompositeIdentifierEntry = string;
export type CompositeIdentifierList = string[];
export interface StickinessConfiguration {
  identifier: string;
  timeout?: number;
  compositeIdentifier?: string[];
}
export type StaticQueryParameterName = string;
export type StaticQueryParameterValue = string | redacted.Redacted<string>;
export type StaticQueryParameters = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export type StaticQueryParameterConflictResolution =
  | "CLIENT_OVERRIDE"
  | "STATIC_OVERRIDE"
  | (string & {});
export interface PassthroughTargetConfiguration {
  endpoint: string;
  protocolType: PassthroughProtocolType;
  schema?: HttpApiSchemaConfiguration;
  stickinessConfiguration?: StickinessConfiguration;
  staticQueryParameters?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  staticQueryParameterConflictResolution?: StaticQueryParameterConflictResolution;
}
export interface HttpConnectorSource {
  connectorId: string;
}
export type ConnectorParameterName = string;
export type ConnectorParameterValue = string;
export type HttpConnectorParameters = { [key: string]: string | undefined };
export interface HttpConnectorTargetConfiguration {
  source: HttpConnectorSource;
  parameters?: { [key: string]: string | undefined };
}
export type HttpTargetConfiguration =
  | {
      agentcoreRuntime: RuntimeTargetConfiguration;
      passthrough?: never;
      connector?: never;
    }
  | {
      agentcoreRuntime?: never;
      passthrough: PassthroughTargetConfiguration;
      connector?: never;
    }
  | {
      agentcoreRuntime?: never;
      passthrough?: never;
      connector: HttpConnectorTargetConfiguration;
    };
export type InferenceConnectorId = string;
export interface InferenceConnectorSource {
  connectorId: string;
}
export interface InferenceConnectorTargetConfiguration {
  source: InferenceConnectorSource;
}
export interface ProviderPrefix {
  strip?: boolean;
  separator?: string;
}
export interface ModelMapping {
  providerPrefix?: ProviderPrefix;
}
export type InferenceOperationPath = string;
export type ModelPattern = string;
export interface ModelEntry {
  model: string;
}
export type ModelEntries = ModelEntry[];
export interface InferenceOperationConfiguration {
  path: string;
  providerPath?: string;
  models?: ModelEntry[];
}
export type InferenceOperationConfigurations =
  InferenceOperationConfiguration[];
export interface InferenceProviderTargetConfiguration {
  endpoint: string;
  modelMapping?: ModelMapping;
  operations?: InferenceOperationConfiguration[];
}
export type InferenceTargetConfiguration =
  | { connector: InferenceConnectorTargetConfiguration; provider?: never }
  | { connector?: never; provider: InferenceProviderTargetConfiguration };
export type TargetConfiguration =
  | { mcp: McpTargetConfiguration; http?: never; inference?: never }
  | { mcp?: never; http: HttpTargetConfiguration; inference?: never }
  | { mcp?: never; http?: never; inference: InferenceTargetConfiguration };
export type CredentialProviderType =
  | "GATEWAY_IAM_ROLE"
  | "OAUTH"
  | "API_KEY"
  | "CALLER_IAM_CREDENTIALS"
  | "JWT_PASSTHROUGH"
  | (string & {});
export type OAuthCredentialProviderArn = string;
export type OAuthScope = string;
export type OAuthScopes = string[];
export type OAuthCustomParametersKey = string;
export type OAuthCustomParametersValue = string | redacted.Redacted<string>;
export type OAuthCustomParameters = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export type OAuthGrantType =
  | "CLIENT_CREDENTIALS"
  | "AUTHORIZATION_CODE"
  | "TOKEN_EXCHANGE"
  | (string & {});
export type OAuthDefaultReturnUrl = string;
export interface OAuthCredentialProvider {
  providerArn: string;
  scopes: string[];
  customParameters?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  grantType?: OAuthGrantType;
  defaultReturnUrl?: string;
}
export type ApiKeyCredentialProviderArn = string;
export type ApiKeyCredentialParameterName = string;
export type ApiKeyCredentialPrefix = string;
export type ApiKeyCredentialLocation =
  | "HEADER"
  | "QUERY_PARAMETER"
  | (string & {});
export interface GatewayApiKeyCredentialProvider {
  providerArn: string;
  credentialParameterName?: string;
  credentialPrefix?: string;
  credentialLocation?: ApiKeyCredentialLocation;
}
export interface IamCredentialProvider {
  service: string;
  region?: string;
}
export type CredentialProvider =
  | {
      oauthCredentialProvider: OAuthCredentialProvider;
      apiKeyCredentialProvider?: never;
      iamCredentialProvider?: never;
    }
  | {
      oauthCredentialProvider?: never;
      apiKeyCredentialProvider: GatewayApiKeyCredentialProvider;
      iamCredentialProvider?: never;
    }
  | {
      oauthCredentialProvider?: never;
      apiKeyCredentialProvider?: never;
      iamCredentialProvider: IamCredentialProvider;
    };
export interface CredentialProviderConfiguration {
  credentialProviderType: CredentialProviderType;
  credentialProvider?: CredentialProvider;
}
export type CredentialProviderConfigurations =
  CredentialProviderConfiguration[];
export type HttpHeaderName = string;
export type AllowedRequestHeaders = string[];
export type HttpQueryParameterName = string;
export type AllowedQueryParameters = string[];
export type AllowedResponseHeaders = string[];
export interface MetadataConfiguration {
  allowedRequestHeaders?: string[];
  allowedQueryParameters?: string[];
  allowedResponseHeaders?: string[];
}
export interface CreateGatewayTargetRequest {
  gatewayIdentifier: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  clientToken?: string;
  targetConfiguration: TargetConfiguration;
  credentialProviderConfigurations?: CredentialProviderConfiguration[];
  metadataConfiguration?: MetadataConfiguration;
  privateEndpoint?: PrivateEndpoint;
}
export type TargetId = string;
export type TargetStatus =
  | "CREATING"
  | "UPDATING"
  | "UPDATE_UNSUCCESSFUL"
  | "DELETING"
  | "READY"
  | "FAILED"
  | "SYNCHRONIZING"
  | "SYNCHRONIZE_UNSUCCESSFUL"
  | "CREATE_PENDING_AUTH"
  | "UPDATE_PENDING_AUTH"
  | "SYNCHRONIZE_PENDING_AUTH"
  | (string & {});
export type DomainName = string;
export type ResourceGatewayArn = string;
export type ResourceAssociationArn = string;
export interface ManagedResourceDetails {
  domain?: string;
  resourceGatewayArn?: string;
  resourceAssociationArn?: string;
}
export type PrivateEndpointManagedResources = ManagedResourceDetails[];
export interface OAuth2AuthorizationData {
  authorizationUrl: string;
  userId?: string;
}
export type AuthorizationData = { oauth2: OAuth2AuthorizationData };
export type TargetProtocolType = "MCP" | "HTTP" | (string & {});
export interface CreateGatewayTargetResponse {
  gatewayArn: string;
  targetId: string;
  createdAt: Date;
  updatedAt: Date;
  status: TargetStatus;
  statusReasons?: string[];
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  targetConfiguration: TargetConfiguration;
  credentialProviderConfigurations: CredentialProviderConfiguration[];
  lastSynchronizedAt?: Date;
  metadataConfiguration?: MetadataConfiguration;
  privateEndpoint?: PrivateEndpoint;
  privateEndpointManagedResources?: ManagedResourceDetails[];
  authorizationData?: AuthorizationData;
  protocolType?: TargetProtocolType;
}
export type HarnessName = string;
export interface HarnessAgentCoreRuntimeEnvironmentRequest {
  lifecycleConfiguration?: LifecycleConfiguration;
  networkConfiguration?: NetworkConfiguration;
  filesystemConfigurations?: FilesystemConfiguration[];
}
export type HarnessEnvironmentProviderRequest = {
  agentCoreRuntimeEnvironment: HarnessAgentCoreRuntimeEnvironmentRequest;
};
export type HarnessEnvironmentArtifact = {
  containerConfiguration: ContainerConfiguration;
};
export type MaxTokens = number;
export type Temperature = number;
export type TopP = number;
export type HarnessBedrockApiFormat =
  | "converse_stream"
  | "responses"
  | "chat_completions"
  | (string & {});
export interface HarnessBedrockModelConfig {
  modelId: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  apiFormat?: HarnessBedrockApiFormat;
  additionalParams?: any;
}
export type ApiKeyArn = string;
export type HarnessOpenAiApiFormat =
  | "chat_completions"
  | "responses"
  | (string & {});
export interface HarnessOpenAiModelConfig {
  modelId: string;
  apiKeyArn: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  apiFormat?: HarnessOpenAiApiFormat;
  additionalParams?: any;
}
export type TopK = number;
export interface HarnessGeminiModelConfig {
  modelId: string;
  apiKeyArn: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  topK?: number;
  additionalParams?: any;
}
export type HarnessLiteLlmApiBase = string | redacted.Redacted<string>;
export interface HarnessLiteLlmModelConfig {
  modelId: string;
  apiKeyArn?: string;
  apiBase?: string | redacted.Redacted<string>;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  additionalParams?: any;
}
export type HarnessModelConfiguration =
  | {
      bedrockModelConfig: HarnessBedrockModelConfig;
      openAiModelConfig?: never;
      geminiModelConfig?: never;
      liteLlmModelConfig?: never;
    }
  | {
      bedrockModelConfig?: never;
      openAiModelConfig: HarnessOpenAiModelConfig;
      geminiModelConfig?: never;
      liteLlmModelConfig?: never;
    }
  | {
      bedrockModelConfig?: never;
      openAiModelConfig?: never;
      geminiModelConfig: HarnessGeminiModelConfig;
      liteLlmModelConfig?: never;
    }
  | {
      bedrockModelConfig?: never;
      openAiModelConfig?: never;
      geminiModelConfig?: never;
      liteLlmModelConfig: HarnessLiteLlmModelConfig;
    };
export type SensitiveText = string | redacted.Redacted<string>;
export type HarnessSystemContentBlock = {
  text: string | redacted.Redacted<string>;
};
export type HarnessSystemPrompt = HarnessSystemContentBlock[];
export type HarnessToolType =
  | "remote_mcp"
  | "agentcore_browser"
  | "agentcore_gateway"
  | "inline_function"
  | "agentcore_code_interpreter"
  | (string & {});
export type HarnessToolName = string;
export type HarnessRemoteMcpUrl = string | redacted.Redacted<string>;
export type HttpHeaderKey = string;
export type HttpHeaderValue = string;
export type HttpHeadersMap = { [key: string]: string | undefined };
export interface HarnessRemoteMcpConfig {
  url: string | redacted.Redacted<string>;
  headers?: { [key: string]: string | undefined };
}
export type HarnessBrowserArn = string;
export interface HarnessAgentCoreBrowserConfig {
  browserArn?: string;
}
export type HarnessGatewayOutboundAuth =
  | { awsIam: Record<string, never>; none?: never; oauth?: never }
  | { awsIam?: never; none: Record<string, never>; oauth?: never }
  | { awsIam?: never; none?: never; oauth: OAuthCredentialProvider };
export interface HarnessAgentCoreGatewayConfig {
  gatewayArn: string;
  outboundAuth?: HarnessGatewayOutboundAuth;
}
export type HarnessInlineFunctionDescription =
  | string
  | redacted.Redacted<string>;
export interface HarnessInlineFunctionConfig {
  description: string | redacted.Redacted<string>;
  inputSchema: any;
}
export type HarnessCodeInterpreterArn = string;
export interface HarnessAgentCoreCodeInterpreterConfig {
  codeInterpreterArn?: string;
}
export type HarnessToolConfiguration =
  | {
      remoteMcp: HarnessRemoteMcpConfig;
      agentCoreBrowser?: never;
      agentCoreGateway?: never;
      inlineFunction?: never;
      agentCoreCodeInterpreter?: never;
    }
  | {
      remoteMcp?: never;
      agentCoreBrowser: HarnessAgentCoreBrowserConfig;
      agentCoreGateway?: never;
      inlineFunction?: never;
      agentCoreCodeInterpreter?: never;
    }
  | {
      remoteMcp?: never;
      agentCoreBrowser?: never;
      agentCoreGateway: HarnessAgentCoreGatewayConfig;
      inlineFunction?: never;
      agentCoreCodeInterpreter?: never;
    }
  | {
      remoteMcp?: never;
      agentCoreBrowser?: never;
      agentCoreGateway?: never;
      inlineFunction: HarnessInlineFunctionConfig;
      agentCoreCodeInterpreter?: never;
    }
  | {
      remoteMcp?: never;
      agentCoreBrowser?: never;
      agentCoreGateway?: never;
      inlineFunction?: never;
      agentCoreCodeInterpreter: HarnessAgentCoreCodeInterpreterConfig;
    };
export interface HarnessTool {
  type: HarnessToolType;
  name?: string;
  config?: HarnessToolConfiguration;
}
export type HarnessTools = HarnessTool[];
export type HarnessSkillPath = string;
export type HarnessSkillS3Uri = string;
export interface HarnessSkillS3Source {
  uri: string;
}
export type HarnessSkillGitUrl = string;
export interface HarnessSkillGitAuth {
  credentialArn: string;
  username?: string;
}
export interface HarnessSkillGitSource {
  url: string;
  path?: string;
  auth?: HarnessSkillGitAuth;
}
export type HarnessAwsSkillPath = string;
export type HarnessAwsSkillPaths = string[];
export interface HarnessSkillAwsSkillsSource {
  paths?: string[];
}
export type HarnessSkill =
  | { path: string; s3?: never; git?: never; awsSkills?: never }
  | { path?: never; s3: HarnessSkillS3Source; git?: never; awsSkills?: never }
  | { path?: never; s3?: never; git: HarnessSkillGitSource; awsSkills?: never }
  | {
      path?: never;
      s3?: never;
      git?: never;
      awsSkills: HarnessSkillAwsSkillsSource;
    };
export type HarnessSkills = HarnessSkill[];
export type HarnessAllowedTool = string;
export type HarnessAllowedTools = string[];
export type MemoryArn = string;
export interface HarnessAgentCoreMemoryRetrievalConfig {
  topK?: number;
  relevanceScore?: number;
  strategyId?: string;
}
export type HarnessAgentCoreMemoryRetrievalConfigs = {
  [key: string]: HarnessAgentCoreMemoryRetrievalConfig | undefined;
};
export interface HarnessAgentCoreMemoryConfiguration {
  arn: string;
  actorId?: string;
  messagesCount?: number;
  retrievalConfig?: {
    [key: string]: HarnessAgentCoreMemoryRetrievalConfig | undefined;
  };
}
export type HarnessManagedMemoryStrategyType =
  | "SEMANTIC"
  | "SUMMARIZATION"
  | "USER_PREFERENCE"
  | "EPISODIC"
  | (string & {});
export type HarnessManagedMemoryStrategyList =
  HarnessManagedMemoryStrategyType[];
export interface HarnessManagedMemoryConfiguration {
  arn?: string;
  strategies?: HarnessManagedMemoryStrategyType[];
  eventExpiryDuration?: number;
  encryptionKeyArn?: string;
}
export interface HarnessDisabledMemoryConfiguration {}
export type HarnessMemoryConfiguration =
  | {
      agentCoreMemoryConfiguration: HarnessAgentCoreMemoryConfiguration;
      managedMemoryConfiguration?: never;
      disabled?: never;
    }
  | {
      agentCoreMemoryConfiguration?: never;
      managedMemoryConfiguration: HarnessManagedMemoryConfiguration;
      disabled?: never;
    }
  | {
      agentCoreMemoryConfiguration?: never;
      managedMemoryConfiguration?: never;
      disabled: HarnessDisabledMemoryConfiguration;
    };
export type HarnessTruncationStrategy =
  | "sliding_window"
  | "summarization"
  | "none"
  | (string & {});
export interface HarnessSlidingWindowConfiguration {
  messagesCount?: number;
}
export interface HarnessSummarizationConfiguration {
  summaryRatio?: number;
  preserveRecentMessages?: number;
  summarizationSystemPrompt?: string;
}
export type HarnessTruncationStrategyConfiguration =
  | { slidingWindow: HarnessSlidingWindowConfiguration; summarization?: never }
  | { slidingWindow?: never; summarization: HarnessSummarizationConfiguration };
export interface HarnessTruncationConfiguration {
  strategy: HarnessTruncationStrategy;
  config?: HarnessTruncationStrategyConfiguration;
}
export interface CreateHarnessRequest {
  harnessName: string;
  clientToken?: string;
  executionRoleArn: string;
  environment?: HarnessEnvironmentProviderRequest;
  environmentArtifact?: HarnessEnvironmentArtifact;
  environmentVariables?: { [key: string]: string | undefined };
  authorizerConfiguration?: AuthorizerConfiguration;
  model?: HarnessModelConfiguration;
  systemPrompt?: HarnessSystemContentBlock[];
  tools?: HarnessTool[];
  skills?: HarnessSkill[];
  allowedTools?: string[];
  memory?: HarnessMemoryConfiguration;
  truncation?: HarnessTruncationConfiguration;
  maxIterations?: number;
  maxTokens?: number;
  timeoutSeconds?: number;
  tags?: { [key: string]: string | undefined };
}
export type HarnessId = string;
export type HarnessArn = string;
export type HarnessStatus =
  | "CREATING"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "READY"
  | "DELETING"
  | "DELETE_FAILED"
  | (string & {});
export type HarnessVersion = string;
export interface HarnessAgentCoreRuntimeEnvironment {
  agentRuntimeArn: string;
  agentRuntimeName: string;
  agentRuntimeId: string;
  lifecycleConfiguration: LifecycleConfiguration;
  networkConfiguration: NetworkConfiguration;
  filesystemConfigurations?: FilesystemConfiguration[];
}
export type HarnessEnvironmentProvider = {
  agentCoreRuntimeEnvironment: HarnessAgentCoreRuntimeEnvironment;
};
export interface Harness {
  harnessId: string;
  harnessName: string;
  arn: string;
  status: HarnessStatus;
  harnessVersion?: string;
  executionRoleArn: string;
  createdAt: Date;
  updatedAt: Date;
  model: HarnessModelConfiguration;
  systemPrompt: HarnessSystemContentBlock[];
  tools: HarnessTool[];
  skills: HarnessSkill[];
  allowedTools: string[];
  truncation: HarnessTruncationConfiguration;
  environment: HarnessEnvironmentProvider;
  environmentArtifact?: HarnessEnvironmentArtifact;
  environmentVariables?: { [key: string]: string | undefined };
  authorizerConfiguration?: AuthorizerConfiguration;
  memory?: HarnessMemoryConfiguration;
  maxIterations?: number;
  maxTokens?: number;
  timeoutSeconds?: number;
  failureReason?: string;
}
export interface CreateHarnessResponse {
  harness: Harness;
}
export type HarnessEndpointName = string;
export type HarnessEndpointDescription = string;
export interface CreateHarnessEndpointRequest {
  harnessId: string;
  endpointName: string;
  targetVersion?: string;
  description?: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type HarnessEndpointArn = string;
export type HarnessEndpointStatus =
  | "CREATING"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "READY"
  | "DELETING"
  | "DELETE_FAILED"
  | (string & {});
export interface HarnessEndpoint {
  harnessId: string;
  harnessName: string;
  endpointName: string;
  arn: string;
  status: HarnessEndpointStatus;
  createdAt: Date;
  updatedAt: Date;
  liveVersion?: string;
  targetVersion?: string;
  description?: string;
  failureReason?: string;
}
export interface CreateHarnessEndpointResponse {
  endpoint: HarnessEndpoint;
}
export type Name = string;
export type Arn = string;
export type Namespace = string;
export type NamespacesList = string[];
export type MetadataKey = string;
export type MetadataValueType =
  | "STRING"
  | "STRINGLIST"
  | "NUMBER"
  | (string & {});
export type ExtractionType =
  | "LLM_INFERRED"
  | "STRICTLY_CONSISTENT"
  | (string & {});
export type LlmExtractionInstruction = string | redacted.Redacted<string>;
export type Definition = string | redacted.Redacted<string>;
export type AllowedStringValue = string;
export type AllowedStringValuesList = string[];
export interface StringValidation {
  allowedValues: string[];
}
export type AllowedStringListValue = string;
export type AllowedStringListValuesList = string[];
export interface StringListValidation {
  allowedValues?: string[];
  maxItems?: number;
}
export interface NumberValidation {
  minValue?: number;
  maxValue?: number;
}
export type Validation =
  | {
      stringValidation: StringValidation;
      stringListValidation?: never;
      numberValidation?: never;
    }
  | {
      stringValidation?: never;
      stringListValidation: StringListValidation;
      numberValidation?: never;
    }
  | {
      stringValidation?: never;
      stringListValidation?: never;
      numberValidation: NumberValidation;
    };
export interface LlmExtractionConfig {
  llmExtractionInstruction?: string | redacted.Redacted<string>;
  definition: string | redacted.Redacted<string>;
  validation?: Validation;
}
export type ExtractionConfig = { llmExtractionConfig: LlmExtractionConfig };
export interface MetadataSchemaEntry {
  key: string;
  type?: MetadataValueType;
  extractionType?: ExtractionType;
  extractionConfig?: ExtractionConfig;
}
export type MetadataSchemaList = MetadataSchemaEntry[];
export interface MemoryRecordSchema {
  metadataSchema?: MetadataSchemaEntry[];
}
export interface SemanticMemoryStrategyInput {
  name: string;
  description?: string | redacted.Redacted<string>;
  namespaces?: string[];
  namespaceTemplates?: string[];
  memoryRecordSchema?: MemoryRecordSchema;
}
export interface SummaryMemoryStrategyInput {
  name: string;
  description?: string | redacted.Redacted<string>;
  namespaces?: string[];
  namespaceTemplates?: string[];
  memoryRecordSchema?: MemoryRecordSchema;
}
export interface UserPreferenceMemoryStrategyInput {
  name: string;
  description?: string | redacted.Redacted<string>;
  namespaces?: string[];
  namespaceTemplates?: string[];
  memoryRecordSchema?: MemoryRecordSchema;
}
export type Prompt = string | redacted.Redacted<string>;
export interface SemanticOverrideExtractionConfigurationInput {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
}
export interface SemanticOverrideConsolidationConfigurationInput {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
}
export interface SemanticOverrideConfigurationInput {
  extraction?: SemanticOverrideExtractionConfigurationInput;
  consolidation?: SemanticOverrideConsolidationConfigurationInput;
}
export interface SummaryOverrideConsolidationConfigurationInput {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
}
export interface SummaryOverrideConfigurationInput {
  consolidation?: SummaryOverrideConsolidationConfigurationInput;
}
export interface UserPreferenceOverrideExtractionConfigurationInput {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
}
export interface UserPreferenceOverrideConsolidationConfigurationInput {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
}
export interface UserPreferenceOverrideConfigurationInput {
  extraction?: UserPreferenceOverrideExtractionConfigurationInput;
  consolidation?: UserPreferenceOverrideConsolidationConfigurationInput;
}
export interface EpisodicOverrideExtractionConfigurationInput {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
}
export interface EpisodicOverrideConsolidationConfigurationInput {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
}
export interface EpisodicOverrideReflectionConfigurationInput {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
  namespaces?: string[];
  namespaceTemplates?: string[];
  memoryRecordSchema?: MemoryRecordSchema;
}
export interface EpisodicOverrideConfigurationInput {
  extraction?: EpisodicOverrideExtractionConfigurationInput;
  consolidation?: EpisodicOverrideConsolidationConfigurationInput;
  reflection?: EpisodicOverrideReflectionConfigurationInput;
}
export interface MessageBasedTriggerInput {
  messageCount?: number;
}
export interface TokenBasedTriggerInput {
  tokenCount?: number;
}
export interface TimeBasedTriggerInput {
  idleSessionTimeout?: number;
}
export type TriggerConditionInput =
  | {
      messageBasedTrigger: MessageBasedTriggerInput;
      tokenBasedTrigger?: never;
      timeBasedTrigger?: never;
    }
  | {
      messageBasedTrigger?: never;
      tokenBasedTrigger: TokenBasedTriggerInput;
      timeBasedTrigger?: never;
    }
  | {
      messageBasedTrigger?: never;
      tokenBasedTrigger?: never;
      timeBasedTrigger: TimeBasedTriggerInput;
    };
export type TriggerConditionInputList = TriggerConditionInput[];
export interface InvocationConfigurationInput {
  topicArn: string;
  payloadDeliveryBucketName: string;
}
export interface SelfManagedConfigurationInput {
  triggerConditions?: TriggerConditionInput[];
  invocationConfiguration: InvocationConfigurationInput;
  historicalContextWindowSize?: number;
}
export type CustomConfigurationInput =
  | {
      semanticOverride: SemanticOverrideConfigurationInput;
      summaryOverride?: never;
      userPreferenceOverride?: never;
      episodicOverride?: never;
      selfManagedConfiguration?: never;
    }
  | {
      semanticOverride?: never;
      summaryOverride: SummaryOverrideConfigurationInput;
      userPreferenceOverride?: never;
      episodicOverride?: never;
      selfManagedConfiguration?: never;
    }
  | {
      semanticOverride?: never;
      summaryOverride?: never;
      userPreferenceOverride: UserPreferenceOverrideConfigurationInput;
      episodicOverride?: never;
      selfManagedConfiguration?: never;
    }
  | {
      semanticOverride?: never;
      summaryOverride?: never;
      userPreferenceOverride?: never;
      episodicOverride: EpisodicOverrideConfigurationInput;
      selfManagedConfiguration?: never;
    }
  | {
      semanticOverride?: never;
      summaryOverride?: never;
      userPreferenceOverride?: never;
      episodicOverride?: never;
      selfManagedConfiguration: SelfManagedConfigurationInput;
    };
export interface CustomMemoryStrategyInput {
  name: string;
  description?: string | redacted.Redacted<string>;
  namespaces?: string[];
  namespaceTemplates?: string[];
  configuration?: CustomConfigurationInput;
  memoryRecordSchema?: MemoryRecordSchema;
}
export interface EpisodicReflectionConfigurationInput {
  namespaces?: string[];
  namespaceTemplates?: string[];
  memoryRecordSchema?: MemoryRecordSchema;
}
export interface EpisodicMemoryStrategyInput {
  name: string;
  description?: string | redacted.Redacted<string>;
  namespaces?: string[];
  namespaceTemplates?: string[];
  reflectionConfiguration?: EpisodicReflectionConfigurationInput;
  memoryRecordSchema?: MemoryRecordSchema;
}
export type MemoryStrategyInput =
  | {
      semanticMemoryStrategy: SemanticMemoryStrategyInput;
      summaryMemoryStrategy?: never;
      userPreferenceMemoryStrategy?: never;
      customMemoryStrategy?: never;
      episodicMemoryStrategy?: never;
    }
  | {
      semanticMemoryStrategy?: never;
      summaryMemoryStrategy: SummaryMemoryStrategyInput;
      userPreferenceMemoryStrategy?: never;
      customMemoryStrategy?: never;
      episodicMemoryStrategy?: never;
    }
  | {
      semanticMemoryStrategy?: never;
      summaryMemoryStrategy?: never;
      userPreferenceMemoryStrategy: UserPreferenceMemoryStrategyInput;
      customMemoryStrategy?: never;
      episodicMemoryStrategy?: never;
    }
  | {
      semanticMemoryStrategy?: never;
      summaryMemoryStrategy?: never;
      userPreferenceMemoryStrategy?: never;
      customMemoryStrategy: CustomMemoryStrategyInput;
      episodicMemoryStrategy?: never;
    }
  | {
      semanticMemoryStrategy?: never;
      summaryMemoryStrategy?: never;
      userPreferenceMemoryStrategy?: never;
      customMemoryStrategy?: never;
      episodicMemoryStrategy: EpisodicMemoryStrategyInput;
    };
export type MemoryStrategyInputList = MemoryStrategyInput[];
export interface IndexedKey {
  key: string;
  type: MetadataValueType;
}
export type IndexedKeysList = IndexedKey[];
export type NamespaceVariableKey = string;
export type NamespaceAllowedValue = string;
export type NamespaceAllowedValuesList = string[];
export type NamespaceRegexPattern = string;
export interface NamespaceKeyValidation {
  allowedValues?: string[];
  regexPattern?: string;
}
export interface NamespaceKeyEntry {
  key: string;
  validation?: NamespaceKeyValidation;
}
export type NamespaceKeysList = NamespaceKeyEntry[];
export type ContentType = "MEMORY_RECORDS" | (string & {});
export type ContentLevel = "METADATA_ONLY" | "FULL_CONTENT" | (string & {});
export interface ContentConfiguration {
  type: ContentType;
  level?: ContentLevel;
}
export type ContentConfigurationList = ContentConfiguration[];
export interface KinesisResource {
  dataStreamArn: string;
  contentConfigurations: ContentConfiguration[];
}
export type StreamDeliveryResource = { kinesis: KinesisResource };
export type StreamDeliveryResourcesList = StreamDeliveryResource[];
export interface StreamDeliveryResources {
  resources: StreamDeliveryResource[];
}
export interface CreateMemoryInput {
  clientToken?: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  encryptionKeyArn?: string;
  memoryExecutionRoleArn?: string;
  eventExpiryDuration: number;
  memoryStrategies?: MemoryStrategyInput[];
  indexedKeys?: IndexedKey[];
  namespaceKeys?: NamespaceKeyEntry[];
  streamDeliveryResources?: StreamDeliveryResources;
  tags?: { [key: string]: string | undefined };
}
export type MemoryId = string;
export type MemoryStatus =
  | "CREATING"
  | "ACTIVE"
  | "FAILED"
  | "DELETING"
  | "UPDATING"
  | (string & {});
export type MemoryStrategyId = string;
export type OverrideType =
  | "SEMANTIC_OVERRIDE"
  | "SUMMARY_OVERRIDE"
  | "USER_PREFERENCE_OVERRIDE"
  | "SELF_MANAGED"
  | "EPISODIC_OVERRIDE"
  | (string & {});
export interface SemanticExtractionOverride {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
}
export interface UserPreferenceExtractionOverride {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
}
export interface EpisodicExtractionOverride {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
}
export type CustomExtractionConfiguration =
  | {
      semanticExtractionOverride: SemanticExtractionOverride;
      userPreferenceExtractionOverride?: never;
      episodicExtractionOverride?: never;
    }
  | {
      semanticExtractionOverride?: never;
      userPreferenceExtractionOverride: UserPreferenceExtractionOverride;
      episodicExtractionOverride?: never;
    }
  | {
      semanticExtractionOverride?: never;
      userPreferenceExtractionOverride?: never;
      episodicExtractionOverride: EpisodicExtractionOverride;
    };
export type ExtractionConfiguration = {
  customExtractionConfiguration: CustomExtractionConfiguration;
};
export interface SemanticConsolidationOverride {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
}
export interface SummaryConsolidationOverride {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
}
export interface UserPreferenceConsolidationOverride {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
}
export interface EpisodicConsolidationOverride {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
}
export type CustomConsolidationConfiguration =
  | {
      semanticConsolidationOverride: SemanticConsolidationOverride;
      summaryConsolidationOverride?: never;
      userPreferenceConsolidationOverride?: never;
      episodicConsolidationOverride?: never;
    }
  | {
      semanticConsolidationOverride?: never;
      summaryConsolidationOverride: SummaryConsolidationOverride;
      userPreferenceConsolidationOverride?: never;
      episodicConsolidationOverride?: never;
    }
  | {
      semanticConsolidationOverride?: never;
      summaryConsolidationOverride?: never;
      userPreferenceConsolidationOverride: UserPreferenceConsolidationOverride;
      episodicConsolidationOverride?: never;
    }
  | {
      semanticConsolidationOverride?: never;
      summaryConsolidationOverride?: never;
      userPreferenceConsolidationOverride?: never;
      episodicConsolidationOverride: EpisodicConsolidationOverride;
    };
export type ConsolidationConfiguration = {
  customConsolidationConfiguration: CustomConsolidationConfiguration;
};
export interface EpisodicReflectionOverride {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
  namespaces?: string[];
  namespaceTemplates?: string[];
  memoryRecordSchema?: MemoryRecordSchema;
}
export type CustomReflectionConfiguration = {
  episodicReflectionOverride: EpisodicReflectionOverride;
};
export interface EpisodicReflectionConfiguration {
  namespaces?: string[];
  namespaceTemplates?: string[];
  memoryRecordSchema?: MemoryRecordSchema;
}
export type ReflectionConfiguration =
  | {
      customReflectionConfiguration: CustomReflectionConfiguration;
      episodicReflectionConfiguration?: never;
    }
  | {
      customReflectionConfiguration?: never;
      episodicReflectionConfiguration: EpisodicReflectionConfiguration;
    };
export interface MessageBasedTrigger {
  messageCount?: number;
}
export interface TokenBasedTrigger {
  tokenCount?: number;
}
export interface TimeBasedTrigger {
  idleSessionTimeout?: number;
}
export type TriggerCondition =
  | {
      messageBasedTrigger: MessageBasedTrigger;
      tokenBasedTrigger?: never;
      timeBasedTrigger?: never;
    }
  | {
      messageBasedTrigger?: never;
      tokenBasedTrigger: TokenBasedTrigger;
      timeBasedTrigger?: never;
    }
  | {
      messageBasedTrigger?: never;
      tokenBasedTrigger?: never;
      timeBasedTrigger: TimeBasedTrigger;
    };
export type TriggerConditionsList = TriggerCondition[];
export interface InvocationConfiguration {
  topicArn: string;
  payloadDeliveryBucketName: string;
}
export interface SelfManagedConfiguration {
  triggerConditions: TriggerCondition[];
  invocationConfiguration: InvocationConfiguration;
  historicalContextWindowSize: number;
}
export interface StrategyConfiguration {
  type?: OverrideType;
  extraction?: ExtractionConfiguration;
  consolidation?: ConsolidationConfiguration;
  reflection?: ReflectionConfiguration;
  selfManagedConfiguration?: SelfManagedConfiguration;
}
export type MemoryStrategyType =
  | "SEMANTIC"
  | "SUMMARIZATION"
  | "USER_PREFERENCE"
  | "CUSTOM"
  | "EPISODIC"
  | (string & {});
export type MemoryStrategyStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | (string & {});
export interface MemoryStrategy {
  strategyId: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  configuration?: StrategyConfiguration;
  type: MemoryStrategyType;
  namespaces: string[];
  namespaceTemplates: string[];
  createdAt?: Date;
  updatedAt?: Date;
  status?: MemoryStrategyStatus;
  memoryRecordSchema?: MemoryRecordSchema;
}
export type MemoryStrategyList = MemoryStrategy[];
export interface Memory {
  arn: string;
  id: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  encryptionKeyArn?: string;
  memoryExecutionRoleArn?: string;
  eventExpiryDuration: number;
  status: MemoryStatus;
  failureReason?: string;
  createdAt: Date;
  updatedAt: Date;
  strategies?: MemoryStrategy[];
  indexedKeys?: IndexedKey[];
  namespaceKeys?: NamespaceKeyEntry[];
  streamDeliveryResources?: StreamDeliveryResources;
  managedByResourceArn?: string;
}
export interface CreateMemoryOutput {
  memory?: Memory;
}
export type CredentialProviderVendorType =
  | "GoogleOauth2"
  | "GithubOauth2"
  | "SlackOauth2"
  | "SalesforceOauth2"
  | "MicrosoftOauth2"
  | "CustomOauth2"
  | "AtlassianOauth2"
  | "LinkedinOauth2"
  | "XOauth2"
  | "OktaOauth2"
  | "OneLoginOauth2"
  | "PingOneOauth2"
  | "FacebookOauth2"
  | "YandexOauth2"
  | "RedditOauth2"
  | "ZoomOauth2"
  | "TwitchOauth2"
  | "SpotifyOauth2"
  | "DropboxOauth2"
  | "NotionOauth2"
  | "HubspotOauth2"
  | "CyberArkOauth2"
  | "FusionAuthOauth2"
  | "Auth0Oauth2"
  | "CognitoOauth2"
  | (string & {});
export type DiscoveryUrlType = string;
export type IssuerUrlType = string;
export type AuthorizationEndpointType = string;
export type TokenEndpointType = string;
export type ResponseType = string;
export type ResponseListType = string[];
export type TokenAuthMethod = string;
export type TokenEndpointAuthMethodsType = string[];
export interface Oauth2AuthorizationServerMetadata {
  issuer: string;
  authorizationEndpoint: string;
  tokenEndpoint: string;
  responseTypes?: string[];
  tokenEndpointAuthMethods?: string[];
}
export type Oauth2Discovery =
  | { discoveryUrl: string; authorizationServerMetadata?: never }
  | {
      discoveryUrl?: never;
      authorizationServerMetadata: Oauth2AuthorizationServerMetadata;
    };
export type DefaultClientIdType = string;
export type DefaultClientSecretType = string | redacted.Redacted<string>;
export type OnBehalfOfTokenExchangeGrantTypeType =
  | "TOKEN_EXCHANGE"
  | "JWT_AUTHORIZATION_GRANT"
  | (string & {});
export type ActorTokenContentType =
  | "NONE"
  | "M2M"
  | "AWS_IAM_ID_TOKEN_JWT"
  | (string & {});
export type ScopeType = string;
export type ScopesListType = string[];
export interface TokenExchangeGrantTypeConfigType {
  actorTokenContent: ActorTokenContentType;
  actorTokenScopes?: string[];
}
export interface OnBehalfOfTokenExchangeConfigType {
  grantType: OnBehalfOfTokenExchangeGrantTypeType;
  tokenExchangeGrantTypeConfig?: TokenExchangeGrantTypeConfigType;
}
export type ClientAuthenticationMethodType =
  | "CLIENT_SECRET_BASIC"
  | "CLIENT_SECRET_POST"
  | "AWS_IAM_ID_TOKEN_JWT"
  | "PRIVATE_KEY_JWT"
  | (string & {});
export interface KmsKeySourceType {
  kmsKeyArn: string;
}
export type PrivateKeySource = { kmsKeySource: KmsKeySourceType };
export type SigningAlgorithm = "RS256" | "PS256" | "ES256" | (string & {});
export type AdditionalClaimName = string;
export type AdditionalClaimValue = string | redacted.Redacted<string>;
export type AdditionalClaims = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export interface PrivateKeyJwtConfig {
  privateKeySource?: PrivateKeySource;
  signingAlgorithm?: SigningAlgorithm;
  additionalHeaderClaims?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  additionalPayloadClaims?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
}
export interface CustomOauth2ProviderConfigInput {
  oauthDiscovery: Oauth2Discovery;
  clientId?: string;
  clientSecret?: string | redacted.Redacted<string>;
  clientSecretConfig?: SecretReference;
  clientSecretSource?: SecretSourceType;
  onBehalfOfTokenExchangeConfig?: OnBehalfOfTokenExchangeConfigType;
  clientAuthenticationMethod?: ClientAuthenticationMethodType;
  privateKeyJwtConfig?: PrivateKeyJwtConfig;
  privateEndpoint?: PrivateEndpoint;
  privateEndpointOverrides?: PrivateEndpointOverride[];
}
export type ClientIdType = string;
export interface GoogleOauth2ProviderConfigInput {
  clientId: string;
  clientSecret?: string | redacted.Redacted<string>;
  clientSecretConfig?: SecretReference;
  clientSecretSource?: SecretSourceType;
}
export interface GithubOauth2ProviderConfigInput {
  clientId: string;
  clientSecret?: string | redacted.Redacted<string>;
  clientSecretConfig?: SecretReference;
  clientSecretSource?: SecretSourceType;
}
export interface SlackOauth2ProviderConfigInput {
  clientId: string;
  clientSecret?: string | redacted.Redacted<string>;
  clientSecretConfig?: SecretReference;
  clientSecretSource?: SecretSourceType;
}
export interface SalesforceOauth2ProviderConfigInput {
  clientId: string;
  clientSecret?: string | redacted.Redacted<string>;
  clientSecretConfig?: SecretReference;
  clientSecretSource?: SecretSourceType;
}
export type TenantIdType = string;
export interface MicrosoftOauth2ProviderConfigInput {
  clientId: string;
  clientSecret?: string | redacted.Redacted<string>;
  clientSecretConfig?: SecretReference;
  clientSecretSource?: SecretSourceType;
  tenantId?: string;
}
export interface AtlassianOauth2ProviderConfigInput {
  clientId: string;
  clientSecret?: string | redacted.Redacted<string>;
  clientSecretConfig?: SecretReference;
  clientSecretSource?: SecretSourceType;
}
export interface LinkedinOauth2ProviderConfigInput {
  clientId: string;
  clientSecret?: string | redacted.Redacted<string>;
  clientSecretConfig?: SecretReference;
  clientSecretSource?: SecretSourceType;
}
export interface IncludedOauth2ProviderConfigInput {
  clientId: string;
  clientSecret?: string | redacted.Redacted<string>;
  clientSecretConfig?: SecretReference;
  clientSecretSource?: SecretSourceType;
  issuer?: string;
  authorizationEndpoint?: string;
  tokenEndpoint?: string;
}
export type Oauth2ProviderConfigInput =
  | {
      customOauth2ProviderConfig: CustomOauth2ProviderConfigInput;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig: GoogleOauth2ProviderConfigInput;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig: GithubOauth2ProviderConfigInput;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig: SlackOauth2ProviderConfigInput;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig: SalesforceOauth2ProviderConfigInput;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig: MicrosoftOauth2ProviderConfigInput;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig: AtlassianOauth2ProviderConfigInput;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig: LinkedinOauth2ProviderConfigInput;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig: IncludedOauth2ProviderConfigInput;
    };
export interface CreateOauth2CredentialProviderRequest {
  name: string;
  credentialProviderVendor: CredentialProviderVendorType;
  oauth2ProviderConfigInput: Oauth2ProviderConfigInput;
  tags?: { [key: string]: string | undefined };
}
export type CredentialProviderArnType = string;
export interface CustomOauth2ProviderConfigOutput {
  oauthDiscovery: Oauth2Discovery;
  clientId?: string;
  onBehalfOfTokenExchangeConfig?: OnBehalfOfTokenExchangeConfigType;
  clientAuthenticationMethod?: ClientAuthenticationMethodType;
  privateEndpoint?: PrivateEndpoint;
  privateEndpointOverrides?: PrivateEndpointOverride[];
  privateKeyJwtConfig?: PrivateKeyJwtConfig;
}
export interface GoogleOauth2ProviderConfigOutput {
  oauthDiscovery: Oauth2Discovery;
  clientId?: string;
}
export interface GithubOauth2ProviderConfigOutput {
  oauthDiscovery: Oauth2Discovery;
  clientId?: string;
}
export interface SlackOauth2ProviderConfigOutput {
  oauthDiscovery: Oauth2Discovery;
  clientId?: string;
}
export interface SalesforceOauth2ProviderConfigOutput {
  oauthDiscovery: Oauth2Discovery;
  clientId?: string;
}
export interface MicrosoftOauth2ProviderConfigOutput {
  oauthDiscovery: Oauth2Discovery;
  clientId?: string;
}
export interface AtlassianOauth2ProviderConfigOutput {
  oauthDiscovery: Oauth2Discovery;
  clientId?: string;
}
export interface LinkedinOauth2ProviderConfigOutput {
  oauthDiscovery: Oauth2Discovery;
  clientId?: string;
}
export interface IncludedOauth2ProviderConfigOutput {
  oauthDiscovery: Oauth2Discovery;
  clientId?: string;
}
export type Oauth2ProviderConfigOutput =
  | {
      customOauth2ProviderConfig: CustomOauth2ProviderConfigOutput;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig: GoogleOauth2ProviderConfigOutput;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig: GithubOauth2ProviderConfigOutput;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig: SlackOauth2ProviderConfigOutput;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig: SalesforceOauth2ProviderConfigOutput;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig: MicrosoftOauth2ProviderConfigOutput;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig: AtlassianOauth2ProviderConfigOutput;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig: LinkedinOauth2ProviderConfigOutput;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig: IncludedOauth2ProviderConfigOutput;
    };
export type Status =
  | "CREATING"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "READY"
  | "DELETING"
  | "DELETE_FAILED"
  | (string & {});
export interface CreateOauth2CredentialProviderResponse {
  clientSecretArn: Secret;
  clientSecretJsonKey?: string;
  clientSecretSource?: SecretSourceType;
  name: string;
  credentialProviderArn: string;
  callbackUrl?: string;
  oauth2ProviderConfigOutput?: Oauth2ProviderConfigOutput;
  status?: Status;
}
export type EvaluationConfigName = string;
export type EvaluationConfigDescription = string | redacted.Redacted<string>;
export type SamplingPercentage = number;
export interface SamplingConfig {
  samplingPercentage: number;
}
export type FilterOperator =
  | "Equals"
  | "NotEquals"
  | "GreaterThan"
  | "LessThan"
  | "GreaterThanOrEqual"
  | "LessThanOrEqual"
  | "Contains"
  | "NotContains"
  | (string & {});
export type FilterValue =
  | { stringValue: string; doubleValue?: never; booleanValue?: never }
  | { stringValue?: never; doubleValue: number; booleanValue?: never }
  | { stringValue?: never; doubleValue?: never; booleanValue: boolean };
export interface Filter {
  key: string;
  operator: FilterOperator;
  value: FilterValue;
}
export type FilterList = Filter[];
export interface SessionConfig {
  sessionTimeoutMinutes: number;
}
export interface Rule {
  samplingConfig: SamplingConfig;
  filters?: Filter[];
  sessionConfig?: SessionConfig;
}
export type LogGroupName = string;
export type LogGroupNamesList = string[];
export type ServiceName = string;
export type ServiceNamesList = string[];
export interface CloudWatchLogsInputConfig {
  logGroupNames: string[];
  serviceNames: string[];
}
export type DataSourceConfig = { cloudWatchLogs: CloudWatchLogsInputConfig };
export type EvaluatorReference = { evaluatorId: string };
export type EvaluatorList = EvaluatorReference[];
export type InsightId = string;
export interface Insight {
  insightId: string;
}
export type InsightList = Insight[];
export type ClusteringFrequency =
  | "DAILY"
  | "WEEKLY"
  | "MONTHLY"
  | (string & {});
export type ClusteringFrequencyList = ClusteringFrequency[];
export interface ClusteringConfig {
  frequencies: ClusteringFrequency[];
}
export interface CreateOnlineEvaluationConfigRequest {
  clientToken?: string;
  onlineEvaluationConfigName: string;
  description?: string | redacted.Redacted<string>;
  rule: Rule;
  dataSourceConfig: DataSourceConfig;
  evaluators?: EvaluatorReference[];
  insights?: Insight[];
  clusteringConfig?: ClusteringConfig;
  evaluationExecutionRoleArn: string;
  enableOnCreate: boolean;
  tags?: { [key: string]: string | undefined };
}
export type OnlineEvaluationConfigArn = string;
export type OnlineEvaluationConfigId = string;
export interface CloudWatchOutputConfig {
  logGroupName: string;
}
export interface OutputConfig {
  cloudWatchConfig: CloudWatchOutputConfig;
}
export type OnlineEvaluationConfigStatus =
  | "ACTIVE"
  | "CREATING"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "DELETING"
  | "ERROR"
  | (string & {});
export type OnlineEvaluationExecutionStatus =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export interface CreateOnlineEvaluationConfigResponse {
  onlineEvaluationConfigArn: string;
  onlineEvaluationConfigId: string;
  createdAt: Date;
  outputConfig?: OutputConfig;
  status: OnlineEvaluationConfigStatus;
  executionStatus: OnlineEvaluationExecutionStatus;
  failureReason?: string;
}
export type PaymentManagerId = string;
export type PaymentConnectorName = string;
export type PaymentsDescription = string;
export type PaymentConnectorType =
  | "CoinbaseCDP"
  | "StripePrivy"
  | (string & {});
export type PaymentCredentialProviderArn = string;
export interface PaymentCredentialProviderConfiguration {
  credentialProviderArn: string;
}
export type CredentialsProviderConfiguration =
  | { coinbaseCDP: PaymentCredentialProviderConfiguration; stripePrivy?: never }
  | {
      coinbaseCDP?: never;
      stripePrivy: PaymentCredentialProviderConfiguration;
    };
export type CredentialsProviderConfigurations =
  CredentialsProviderConfiguration[];
export type PaymentConnectorProvisionMode =
  | "MANUAL"
  | "QUICK_CREATE"
  | (string & {});
export interface CreatePaymentConnectorRequest {
  paymentManagerId: string;
  name: string;
  description?: string;
  type: PaymentConnectorType;
  credentialProviderConfigurations: CredentialsProviderConfiguration[];
  provisionMode?: PaymentConnectorProvisionMode;
  clientToken?: string;
}
export type PaymentConnectorId = string;
export type PaymentConnectorStatus =
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "READY"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | "DELETE_FAILED"
  | "AWS_MARKETPLACE_SUBSCRIPTION_REQUIRED"
  | "PENDING_AUTHENTICATION"
  | "PROVISIONING"
  | "AUTHENTICATION_EXPIRED"
  | "AUTHENTICATION_FAILED"
  | (string & {});
export type PaymentConnectorAuthorizationUrl = string;
export interface CreatePaymentConnectorResponse {
  paymentConnectorId: string;
  paymentManagerId: string;
  name: string;
  type: PaymentConnectorType;
  credentialProviderConfigurations: CredentialsProviderConfiguration[];
  createdAt: Date;
  status: PaymentConnectorStatus;
  authorizationUrl?: string;
}
export type PaymentCredentialProviderVendorType =
  | "CoinbaseCDP"
  | "StripePrivy"
  | (string & {});
export type CoinbaseCdpApiKeyIdType = string;
export type DefaultCoinbaseCdpApiKeySecretType =
  | string
  | redacted.Redacted<string>;
export type DefaultCoinbaseCdpWalletSecretType =
  | string
  | redacted.Redacted<string>;
export interface CoinbaseCdpConfigurationInput {
  apiKeyId: string;
  apiKeySecret?: string | redacted.Redacted<string>;
  apiKeySecretSource?: SecretSourceType;
  apiKeySecretConfig?: SecretReference;
  walletSecret?: string | redacted.Redacted<string>;
  walletSecretSource?: SecretSourceType;
  walletSecretConfig?: SecretReference;
}
export type StripePrivyAppIdType = string;
export type DefaultStripePrivyAppSecretType =
  | string
  | redacted.Redacted<string>;
export type DefaultStripePrivyAuthorizationPrivateKeyType =
  | string
  | redacted.Redacted<string>;
export type StripePrivyAuthorizationIdType = string;
export interface StripePrivyConfigurationInput {
  appId: string;
  appSecret?: string | redacted.Redacted<string>;
  appSecretSource?: SecretSourceType;
  appSecretConfig?: SecretReference;
  authorizationPrivateKey?: string | redacted.Redacted<string>;
  authorizationPrivateKeySource?: SecretSourceType;
  authorizationPrivateKeyConfig?: SecretReference;
  authorizationId: string;
}
export type PaymentProviderConfigurationInput =
  | {
      coinbaseCdpConfiguration: CoinbaseCdpConfigurationInput;
      stripePrivyConfiguration?: never;
    }
  | {
      coinbaseCdpConfiguration?: never;
      stripePrivyConfiguration: StripePrivyConfigurationInput;
    };
export interface CreatePaymentCredentialProviderRequest {
  name: string;
  credentialProviderVendor: PaymentCredentialProviderVendorType;
  providerConfigurationInput: PaymentProviderConfigurationInput;
  tags?: { [key: string]: string | undefined };
}
export type PaymentCredentialProviderArnType = string;
export interface CoinbaseCdpConfigurationOutput {
  apiKeyId: string;
  apiKeySecretArn: Secret;
  apiKeySecretJsonKey?: string;
  apiKeySecretSource?: SecretSourceType;
  walletSecretArn: Secret;
  walletSecretJsonKey?: string;
  walletSecretSource?: SecretSourceType;
}
export interface StripePrivyConfigurationOutput {
  appId: string;
  appSecretArn: Secret;
  appSecretJsonKey?: string;
  appSecretSource?: SecretSourceType;
  authorizationPrivateKeyArn: Secret;
  authorizationPrivateKeyJsonKey?: string;
  authorizationPrivateKeySource?: SecretSourceType;
  authorizationId: string;
}
export type PaymentProviderConfigurationOutput =
  | {
      coinbaseCdpConfiguration: CoinbaseCdpConfigurationOutput;
      stripePrivyConfiguration?: never;
    }
  | {
      coinbaseCdpConfiguration?: never;
      stripePrivyConfiguration: StripePrivyConfigurationOutput;
    };
export interface CreatePaymentCredentialProviderResponse {
  name: string;
  credentialProviderVendor: PaymentCredentialProviderVendorType;
  credentialProviderArn: string;
  providerConfigurationOutput: PaymentProviderConfigurationOutput;
}
export type PaymentManagerName = string;
export type PaymentsAuthorizerType = "CUSTOM_JWT" | "AWS_IAM" | (string & {});
export interface CreatePaymentManagerRequest {
  name: string;
  description?: string;
  authorizerType: PaymentsAuthorizerType;
  authorizerConfiguration?: AuthorizerConfiguration;
  roleArn: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
}
export type PaymentManagerArn = string;
export type PaymentManagerStatus =
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "READY"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | "DELETE_FAILED"
  | (string & {});
export interface CreatePaymentManagerResponse {
  paymentManagerArn: string;
  paymentManagerId: string;
  name: string;
  authorizerType: PaymentsAuthorizerType;
  authorizerConfiguration?: AuthorizerConfiguration;
  roleArn: string;
  workloadIdentityDetails?: WorkloadIdentityDetails;
  createdAt: Date;
  status: PaymentManagerStatus;
  tags?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
}
export type PolicyName = string;
export type Statement = string;
export interface CedarPolicy {
  statement: string;
}
export type ResourceId = string;
export interface PolicyGenerationDetails {
  policyGenerationId: string;
  policyGenerationAssetId: string;
}
export interface PolicyStatement {
  statement: string;
}
export type PolicyDefinition =
  | { cedar: CedarPolicy; policyGeneration?: never; policy?: never }
  | { cedar?: never; policyGeneration: PolicyGenerationDetails; policy?: never }
  | { cedar?: never; policyGeneration?: never; policy: PolicyStatement };
export type PolicyValidationMode =
  | "FAIL_ON_ANY_FINDINGS"
  | "IGNORE_ALL_FINDINGS"
  | (string & {});
export type EnforcementMode = "ACTIVE" | "LOG_ONLY" | (string & {});
export interface CreatePolicyRequest {
  name: string;
  definition: PolicyDefinition;
  description?: string | redacted.Redacted<string>;
  validationMode?: PolicyValidationMode;
  enforcementMode?: EnforcementMode;
  policyEngineId: string;
  clientToken?: string;
}
export type PolicyArn = string;
export type PolicyStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | "DELETE_FAILED"
  | (string & {});
export type PolicyStatusReasons = string[];
export interface CreatePolicyResponse {
  policyId: string;
  name: string;
  policyEngineId: string;
  createdAt: Date;
  updatedAt: Date;
  policyArn: string;
  status: PolicyStatus;
  enforcementMode?: EnforcementMode;
  definition: PolicyDefinition;
  description?: string | redacted.Redacted<string>;
  statusReasons: string[];
}
export type PolicyEngineName = string;
export interface CreatePolicyEngineRequest {
  name: string;
  description?: string | redacted.Redacted<string>;
  clientToken?: string;
  encryptionKeyArn?: string;
  tags?: { [key: string]: string | undefined };
}
export type PolicyEngineArn = string;
export type PolicyEngineStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | "DELETE_FAILED"
  | (string & {});
export interface CreatePolicyEngineResponse {
  policyEngineId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  policyEngineArn: string;
  status: PolicyEngineStatus;
  encryptionKeyArn?: string;
  description?: string | redacted.Redacted<string>;
  statusReasons: string[];
}
export type RegistryName = string;
export type RegistryAuthorizerType = "CUSTOM_JWT" | "AWS_IAM" | (string & {});
export interface ApprovalConfiguration {
  autoApproval?: boolean;
}
export interface CreateRegistryRequest {
  name: string;
  description?: string | redacted.Redacted<string>;
  authorizerType?: RegistryAuthorizerType;
  authorizerConfiguration?: AuthorizerConfiguration;
  clientToken?: string;
  approvalConfiguration?: ApprovalConfiguration;
}
export type RegistryArn = string;
export interface CreateRegistryResponse {
  registryArn: string;
}
export type RegistryIdentifier = string;
export type RegistryRecordName = string;
export type DescriptorType =
  | "MCP"
  | "A2A"
  | "CUSTOM"
  | "AGENT_SKILLS"
  | (string & {});
export type SchemaVersion = string;
export type InlineContent = string;
export interface ServerDefinition {
  schemaVersion?: string;
  inlineContent?: string;
}
export interface ToolsDefinition {
  protocolVersion?: string;
  inlineContent?: string;
}
export interface McpDescriptor {
  server?: ServerDefinition;
  tools?: ToolsDefinition;
}
export interface AgentCardDefinition {
  schemaVersion?: string;
  inlineContent?: string;
}
export interface A2aDescriptor {
  agentCard?: AgentCardDefinition;
}
export interface CustomDescriptor {
  inlineContent?: string;
}
export interface SkillMdDefinition {
  inlineContent?: string;
}
export interface SkillDefinition {
  schemaVersion?: string;
  inlineContent?: string;
}
export interface AgentSkillsDescriptor {
  skillMd?: SkillMdDefinition;
  skillDefinition?: SkillDefinition;
}
export interface Descriptors {
  mcp?: McpDescriptor;
  a2a?: A2aDescriptor;
  custom?: CustomDescriptor;
  agentSkills?: AgentSkillsDescriptor;
}
export type RegistryRecordVersion = string;
export type SynchronizationType = "URL" | (string & {});
export type McpServerUrl = string;
export type RegistryRecordCredentialProviderType =
  | "OAUTH"
  | "IAM"
  | (string & {});
export type CredentialProviderArn = string;
export type RegistryRecordOAuthGrantType = "CLIENT_CREDENTIALS" | (string & {});
export type ScopeList = string[];
export type CustomParameterMap = { [key: string]: string | undefined };
export interface RegistryRecordOAuthCredentialProvider {
  providerArn: string;
  grantType?: RegistryRecordOAuthGrantType;
  scopes?: string[];
  customParameters?: { [key: string]: string | undefined };
}
export type IamRoleArn = string;
export type IamSigningServiceName = string;
export type IamSigningRegion = string;
export interface RegistryRecordIamCredentialProvider {
  roleArn?: string;
  service?: string;
  region?: string;
}
export type RegistryRecordCredentialProviderUnion =
  | {
      oauthCredentialProvider: RegistryRecordOAuthCredentialProvider;
      iamCredentialProvider?: never;
    }
  | {
      oauthCredentialProvider?: never;
      iamCredentialProvider: RegistryRecordIamCredentialProvider;
    };
export interface RegistryRecordCredentialProviderConfiguration {
  credentialProviderType: RegistryRecordCredentialProviderType;
  credentialProvider: RegistryRecordCredentialProviderUnion;
}
export type RegistryRecordCredentialProviderConfigurationList =
  RegistryRecordCredentialProviderConfiguration[];
export interface FromUrlSynchronizationConfiguration {
  url: string;
  credentialProviderConfigurations?: RegistryRecordCredentialProviderConfiguration[];
}
export interface SynchronizationConfiguration {
  fromUrl?: FromUrlSynchronizationConfiguration;
}
export interface CreateRegistryRecordRequest {
  registryId: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  descriptorType: DescriptorType;
  descriptors?: Descriptors;
  recordVersion?: string;
  synchronizationType?: SynchronizationType;
  synchronizationConfiguration?: SynchronizationConfiguration;
  clientToken?: string;
}
export type RegistryRecordArn = string;
export type RegistryRecordStatus =
  | "DRAFT"
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "DEPRECATED"
  | "CREATING"
  | "UPDATING"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | (string & {});
export interface CreateRegistryRecordResponse {
  recordArn: string;
  status: RegistryRecordStatus;
}
export type ResourceOauth2ReturnUrlType = string;
export type ResourceOauth2ReturnUrlListType = string[];
export interface CreateWorkloadIdentityRequest {
  name: string;
  allowedResourceOauth2ReturnUrls?: string[];
  tags?: { [key: string]: string | undefined };
}
export type WorkloadIdentityArnType = string;
export interface CreateWorkloadIdentityResponse {
  name: string;
  workloadIdentityArn: string;
  allowedResourceOauth2ReturnUrls?: string[];
}
export interface DeleteAgentRuntimeRequest {
  agentRuntimeId: string;
  agentRuntimeVersion?: string;
  clientToken?: string;
}
export interface DeleteAgentRuntimeResponse {
  status: AgentRuntimeStatus;
  agentRuntimeId?: string;
  agentRuntimeVersion?: string;
}
export interface DeleteAgentRuntimeEndpointRequest {
  agentRuntimeId: string;
  endpointName: string | redacted.Redacted<string>;
  clientToken?: string;
}
export interface DeleteAgentRuntimeEndpointResponse {
  status: AgentRuntimeEndpointStatus;
  agentRuntimeId?: string;
  endpointName?: string | redacted.Redacted<string>;
}
export interface DeleteApiKeyCredentialProviderRequest {
  name: string;
}
export interface DeleteApiKeyCredentialProviderResponse {}
export interface DeleteBrowserRequest {
  browserId: string;
  clientToken?: string;
}
export interface DeleteBrowserResponse {
  browserId: string;
  status: BrowserStatus;
  lastUpdatedAt: Date;
}
export interface DeleteBrowserProfileRequest {
  profileId: string;
  clientToken?: string;
}
export interface DeleteBrowserProfileResponse {
  profileId: string;
  profileArn: string;
  status: BrowserProfileStatus;
  lastUpdatedAt: Date;
  lastSavedAt?: Date;
}
export interface DeleteCapacityProviderInput {
  capacityProviderId: string;
  clientToken?: string;
}
export interface DeleteCapacityProviderOutput {
  capacityProviderId: string;
  status: CapacityProviderStatus;
}
export interface DeleteCodeInterpreterRequest {
  codeInterpreterId: string;
  clientToken?: string;
}
export interface DeleteCodeInterpreterResponse {
  codeInterpreterId: string;
  status: CodeInterpreterStatus;
  lastUpdatedAt: Date;
}
export interface DeleteConfigurationBundleRequest {
  bundleId: string;
}
export type ConfigurationBundleStatus =
  | "ACTIVE"
  | "CREATING"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "DELETING"
  | "DELETE_FAILED"
  | (string & {});
export interface DeleteConfigurationBundleResponse {
  bundleId: string;
  status: ConfigurationBundleStatus;
}
export interface DeleteDatasetRequest {
  datasetId: string;
  datasetVersion?: string;
}
export interface DeleteDatasetResponse {
  datasetArn: string;
  datasetId: string;
  status: DatasetStatus;
  datasetVersion: string;
  updatedAt: Date;
}
export interface DeleteDatasetExamplesRequest {
  datasetId: string;
  clientToken?: string;
  exampleIds: string[];
}
export interface DeleteDatasetExamplesResponse {
  datasetArn: string;
  datasetId: string;
  status: DatasetStatus;
  deletedCount: number;
  updatedAt: Date;
}
export interface DeleteEvaluatorRequest {
  evaluatorId: string;
}
export type EvaluatorArn = string;
export interface DeleteEvaluatorResponse {
  evaluatorArn: string;
  evaluatorId: string;
  status: EvaluatorStatus;
}
export interface DeleteGatewayRequest {
  gatewayIdentifier: string;
}
export interface DeleteGatewayResponse {
  gatewayId: string;
  status: GatewayStatus;
  statusReasons?: string[];
}
export interface DeleteGatewayRateLimitRequest {
  gatewayIdentifier: string;
  rateLimitId: string;
}
export interface DeleteGatewayRateLimitResponse {
  rateLimitId: string;
  status: GatewayRateLimitStatus;
}
export interface DeleteGatewayRuleRequest {
  gatewayIdentifier: string;
  ruleId: string;
}
export interface DeleteGatewayRuleResponse {
  ruleId: string;
  status: GatewayRuleStatus;
}
export interface DeleteGatewayTargetRequest {
  gatewayIdentifier: string;
  targetId: string;
}
export interface DeleteGatewayTargetResponse {
  gatewayArn: string;
  targetId: string;
  status: TargetStatus;
  statusReasons?: string[];
}
export interface DeleteHarnessRequest {
  harnessId: string;
  clientToken?: string;
  deleteManagedMemory?: boolean;
}
export interface DeleteHarnessResponse {
  harness?: Harness;
}
export interface DeleteHarnessEndpointRequest {
  harnessId: string;
  endpointName: string;
  clientToken?: string;
}
export interface DeleteHarnessEndpointResponse {
  endpoint: HarnessEndpoint;
}
export interface DeleteMemoryInput {
  clientToken?: string;
  memoryId: string;
}
export interface DeleteMemoryOutput {
  memoryId: string;
  status?: MemoryStatus;
}
export interface DeleteOauth2CredentialProviderRequest {
  name: string;
}
export interface DeleteOauth2CredentialProviderResponse {}
export interface DeleteOnlineEvaluationConfigRequest {
  onlineEvaluationConfigId: string;
}
export interface DeleteOnlineEvaluationConfigResponse {
  onlineEvaluationConfigArn: string;
  onlineEvaluationConfigId: string;
  status: OnlineEvaluationConfigStatus;
}
export interface DeletePaymentConnectorRequest {
  paymentManagerId: string;
  paymentConnectorId: string;
  clientToken?: string;
}
export interface DeletePaymentConnectorResponse {
  status: PaymentConnectorStatus;
  paymentConnectorId?: string;
}
export interface DeletePaymentCredentialProviderRequest {
  name: string;
}
export interface DeletePaymentCredentialProviderResponse {}
export interface DeletePaymentManagerRequest {
  paymentManagerId: string;
  clientToken?: string;
}
export interface DeletePaymentManagerResponse {
  status: PaymentManagerStatus;
  paymentManagerId?: string;
}
export interface DeletePolicyRequest {
  policyEngineId: string;
  policyId: string;
}
export interface DeletePolicyResponse {
  policyId: string;
  name: string;
  policyEngineId: string;
  createdAt: Date;
  updatedAt: Date;
  policyArn: string;
  status: PolicyStatus;
  enforcementMode?: EnforcementMode;
  definition: PolicyDefinition;
  description?: string | redacted.Redacted<string>;
  statusReasons: string[];
}
export interface DeletePolicyEngineRequest {
  policyEngineId: string;
}
export interface DeletePolicyEngineResponse {
  policyEngineId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  policyEngineArn: string;
  status: PolicyEngineStatus;
  encryptionKeyArn?: string;
  description?: string | redacted.Redacted<string>;
  statusReasons: string[];
}
export interface DeleteRegistryRequest {
  registryId: string;
}
export type RegistryStatus =
  | "CREATING"
  | "READY"
  | "UPDATING"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | "DELETING"
  | "DELETE_FAILED"
  | (string & {});
export interface DeleteRegistryResponse {
  status: RegistryStatus;
}
export type RecordIdentifier = string;
export interface DeleteRegistryRecordRequest {
  registryId: string;
  recordId: string;
}
export interface DeleteRegistryRecordResponse {}
export interface DeleteResourcePolicyRequest {
  resourceArn: string;
}
export interface DeleteResourcePolicyResponse {}
export interface DeleteWorkloadIdentityRequest {
  name: string;
}
export interface DeleteWorkloadIdentityResponse {}
export interface GetAgentRuntimeRequest {
  agentRuntimeId: string;
  agentRuntimeVersion?: string;
}
export interface RuntimeMetadataConfiguration {
  requireMMDSV2: boolean;
}
export interface GetAgentRuntimeResponse {
  agentRuntimeArn: string;
  agentRuntimeName: string;
  agentRuntimeId: string;
  agentRuntimeVersion: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  roleArn: string;
  networkConfiguration?: NetworkConfiguration;
  status: AgentRuntimeStatus;
  lifecycleConfiguration: LifecycleConfiguration;
  failureReason?: string;
  description?: string | redacted.Redacted<string>;
  workloadIdentityDetails?: WorkloadIdentityDetails;
  agentRuntimeArtifact?: AgentRuntimeArtifact;
  protocolConfiguration?: ProtocolConfiguration;
  environmentVariables?: { [key: string]: string | undefined };
  authorizerConfiguration?: AuthorizerConfiguration;
  requestHeaderConfiguration?: RequestHeaderConfiguration;
  metadataConfiguration?: RuntimeMetadataConfiguration;
  filesystemConfigurations?: FilesystemConfiguration[];
  capacityProviderConfiguration?: CapacityProviderConfiguration & {
    capacityProviderArn: CapacityProviderArn;
  };
}
export interface GetAgentRuntimeEndpointRequest {
  agentRuntimeId: string;
  endpointName: string | redacted.Redacted<string>;
}
export type AgentRuntimeEndpointId = string;
export interface GetAgentRuntimeEndpointResponse {
  liveVersion?: string;
  targetVersion?: string;
  agentRuntimeEndpointArn: string;
  agentRuntimeArn: string;
  description?: string;
  status: AgentRuntimeEndpointStatus;
  createdAt: Date;
  lastUpdatedAt: Date;
  failureReason?: string;
  name: string | redacted.Redacted<string>;
  id: string;
}
export interface GetApiKeyCredentialProviderRequest {
  name: string;
}
export interface GetApiKeyCredentialProviderResponse {
  apiKeySecretArn: Secret;
  apiKeySecretJsonKey?: string;
  apiKeySecretSource?: SecretSourceType;
  name: string;
  credentialProviderArn: string;
  createdTime: Date;
  lastUpdatedTime: Date;
}
export interface GetBrowserRequest {
  browserId: string;
}
export interface BrowserSigningConfigOutput {
  enabled: boolean;
}
export interface GetBrowserResponse {
  browserId: string;
  browserArn: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  executionRoleArn?: string;
  networkConfiguration: BrowserNetworkConfiguration;
  recording?: RecordingConfig;
  browserSigning?: BrowserSigningConfigOutput;
  enterprisePolicies?: BrowserEnterprisePolicy[];
  certificates?: Certificate[];
  filesystemConfigurations?: ToolsFileSystemConfiguration[];
  status: BrowserStatus;
  failureReason?: string;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export interface GetBrowserProfileRequest {
  profileId: string;
}
export type BrowserSessionId = string;
export interface GetBrowserProfileResponse {
  profileId: string;
  profileArn: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  status: BrowserProfileStatus;
  createdAt: Date;
  lastUpdatedAt: Date;
  lastSavedAt?: Date;
  lastSavedBrowserSessionId?: string;
  lastSavedBrowserId?: string;
}
export interface GetCapacityProviderInput {
  capacityProviderId: string;
}
export type CapacityProviderStatusCode =
  | "VALIDATION_ERROR"
  | "QUOTA_EXCEEDED"
  | "THROTTLED"
  | "INTERNAL_SERVER_EXCEPTION"
  | (string & {});
export interface GetCapacityProviderOutput {
  capacityProviderId: string;
  capacityProviderArn: string;
  name: string;
  status: CapacityProviderStatus;
  description?: string | redacted.Redacted<string>;
  statusCode?: CapacityProviderStatusCode;
  statusReason?: string;
  permissionsConfiguration: PermissionsConfiguration;
  computeConfiguration: ComputeConfiguration;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export interface GetCodeInterpreterRequest {
  codeInterpreterId: string;
}
export interface GetCodeInterpreterResponse {
  codeInterpreterId: string;
  codeInterpreterArn: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  executionRoleArn?: string;
  networkConfiguration: CodeInterpreterNetworkConfiguration;
  status: CodeInterpreterStatus;
  certificates?: Certificate[];
  filesystemConfigurations?: ToolsFileSystemConfiguration[];
  failureReason?: string;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export interface GetConfigurationBundleRequest {
  bundleId: string;
  branchName?: string;
}
export type ConfigurationBundleVersionList = string[];
export interface VersionLineageMetadata {
  parentVersionIds?: string[];
  branchName?: string;
  createdBy?: VersionCreatedBySource;
  commitMessage?: string;
}
export interface GetConfigurationBundleResponse {
  bundleArn: string;
  bundleId: string;
  bundleName: string;
  description?: string | redacted.Redacted<string>;
  versionId: string;
  components: { [key: string]: ComponentConfiguration | undefined };
  lineageMetadata?: VersionLineageMetadata;
  createdAt: Date;
  updatedAt: Date;
  kmsKeyArn?: string;
}
export interface GetConfigurationBundleVersionRequest {
  bundleId: string;
  versionId: string;
}
export interface GetConfigurationBundleVersionResponse {
  bundleArn: string;
  bundleId: string;
  bundleName: string;
  description?: string | redacted.Redacted<string>;
  versionId: string;
  components: { [key: string]: ComponentConfiguration | undefined };
  lineageMetadata?: VersionLineageMetadata;
  createdAt: Date;
  versionCreatedAt: Date;
  kmsKeyArn?: string;
}
export interface GetDatasetRequest {
  datasetId: string;
  datasetVersion?: string;
}
export type DraftStatus = "MODIFIED" | "UNMODIFIED" | (string & {});
export type DownloadUrl = string | redacted.Redacted<string>;
export interface GetDatasetResponse {
  datasetArn: string;
  datasetId: string;
  datasetVersion: string;
  datasetName: string;
  description?: string;
  status: DatasetStatus;
  draftStatus?: DraftStatus;
  failureReason?: string;
  schemaType: DatasetSchemaType;
  kmsKeyArn?: string;
  exampleCount: number;
  downloadUrl?: string | redacted.Redacted<string>;
  downloadUrlExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  tags?: { [key: string]: string | undefined };
}
export type IncludedData = "ALL_DATA" | "METADATA_ONLY" | (string & {});
export interface GetEvaluatorRequest {
  evaluatorId: string;
  includedData?: IncludedData;
}
export type EvaluatorName = string;
export type EvaluatorType =
  | "Builtin"
  | "ThirdParty"
  | "Custom"
  | "CustomCode"
  | "CustomDerived"
  | (string & {});
export type Provider =
  | "AWS"
  | "DeepEval"
  | "AutoEval"
  | "Custom"
  | (string & {});
export interface GetEvaluatorResponse {
  evaluatorArn: string;
  evaluatorId: string;
  evaluatorName: string;
  description?: string | redacted.Redacted<string>;
  evaluatorConfig: EvaluatorConfig;
  evaluatorType?: EvaluatorType;
  provider?: Provider;
  level: EvaluatorLevel;
  status: EvaluatorStatus;
  createdAt: Date;
  updatedAt: Date;
  lockedForModification?: boolean;
  kmsKeyArn?: string;
}
export interface GetGatewayRequest {
  gatewayIdentifier: string;
}
export interface GetGatewayResponse {
  gatewayArn: string;
  gatewayId: string;
  gatewayUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  status: GatewayStatus;
  statusReasons?: string[];
  name: string;
  description?: string | redacted.Redacted<string>;
  roleArn?: string;
  protocolType?: GatewayProtocolType;
  protocolConfiguration?: GatewayProtocolConfiguration;
  authorizerType: AuthorizerType;
  authorizerConfiguration?: AuthorizerConfiguration;
  kmsKeyArn?: string;
  customTransformConfiguration?: CustomTransformConfiguration;
  interceptorConfigurations?: GatewayInterceptorConfiguration[];
  policyEngineConfiguration?: GatewayPolicyEngineConfiguration;
  workloadIdentityDetails?: WorkloadIdentityDetails;
  exceptionLevel?: ExceptionLevel;
  webAclArn?: string;
  wafConfiguration?: WafConfiguration;
}
export interface GetGatewayRateLimitRequest {
  gatewayIdentifier: string;
  rateLimitId: string;
}
export interface GetGatewayRateLimitResponse {
  rateLimitId: string;
  gatewayIdentifier: string;
  description?: string;
  dimensionKeys: string[];
  entries: LimitEntry[];
  status: GatewayRateLimitStatus;
  createdAt: Date;
  updatedAt: Date;
}
export interface GetGatewayRuleRequest {
  gatewayIdentifier: string;
  ruleId: string;
}
export interface GetGatewayRuleResponse {
  ruleId: string;
  gatewayArn: string;
  priority: number;
  conditions?: Condition[];
  actions: Action[];
  description?: string;
  createdAt: Date;
  status: GatewayRuleStatus;
  system?: SystemManagedBlock;
  updatedAt?: Date;
}
export interface GetGatewayTargetRequest {
  gatewayIdentifier: string;
  targetId: string;
}
export interface GetGatewayTargetResponse {
  gatewayArn: string;
  targetId: string;
  createdAt: Date;
  updatedAt: Date;
  status: TargetStatus;
  statusReasons?: string[];
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  targetConfiguration: TargetConfiguration;
  credentialProviderConfigurations: CredentialProviderConfiguration[];
  lastSynchronizedAt?: Date;
  metadataConfiguration?: MetadataConfiguration;
  privateEndpoint?: PrivateEndpoint;
  privateEndpointManagedResources?: ManagedResourceDetails[];
  authorizationData?: AuthorizationData;
  protocolType?: TargetProtocolType;
}
export interface GetHarnessRequest {
  harnessId: string;
  harnessVersion?: string;
}
export interface GetHarnessResponse {
  harness: Harness;
}
export interface GetHarnessEndpointRequest {
  harnessId: string;
  endpointName: string;
}
export interface GetHarnessEndpointResponse {
  endpoint: HarnessEndpoint;
}
export type MemoryView = "full" | "without_decryption" | (string & {});
export interface GetMemoryInput {
  memoryId: string;
  view?: MemoryView;
}
export interface GetMemoryOutput {
  memory: Memory;
}
export interface GetOauth2CredentialProviderRequest {
  name: string;
}
export interface GetOauth2CredentialProviderResponse {
  clientSecretArn: Secret;
  clientSecretJsonKey?: string;
  clientSecretSource?: SecretSourceType;
  name: string;
  credentialProviderArn: string;
  credentialProviderVendor: CredentialProviderVendorType;
  callbackUrl?: string;
  oauth2ProviderConfigOutput: Oauth2ProviderConfigOutput;
  createdTime: Date;
  lastUpdatedTime: Date;
  status?: Status;
  failureReason?: string;
}
export interface GetOnlineEvaluationConfigRequest {
  onlineEvaluationConfigId: string;
}
export interface GetOnlineEvaluationConfigResponse {
  onlineEvaluationConfigArn: string;
  onlineEvaluationConfigId: string;
  onlineEvaluationConfigName: string;
  description?: string | redacted.Redacted<string>;
  rule: Rule;
  dataSourceConfig: DataSourceConfig;
  evaluators?: EvaluatorReference[];
  insights?: Insight[];
  clusteringConfig?: ClusteringConfig;
  outputConfig?: OutputConfig;
  evaluationExecutionRoleArn?: string;
  status: OnlineEvaluationConfigStatus;
  executionStatus: OnlineEvaluationExecutionStatus;
  createdAt: Date;
  updatedAt: Date;
  failureReason?: string;
}
export interface GetPaymentConnectorRequest {
  paymentManagerId: string;
  paymentConnectorId: string;
}
export interface GetPaymentConnectorResponse {
  paymentConnectorId: string;
  name: string;
  description?: string;
  type: PaymentConnectorType;
  credentialProviderConfigurations: CredentialsProviderConfiguration[];
  createdAt: Date;
  lastUpdatedAt: Date;
  status: PaymentConnectorStatus;
  authorizationUrl?: string;
}
export interface GetPaymentCredentialProviderRequest {
  name: string;
}
export interface GetPaymentCredentialProviderResponse {
  name: string;
  credentialProviderArn: string;
  credentialProviderVendor: PaymentCredentialProviderVendorType;
  providerConfigurationOutput: PaymentProviderConfigurationOutput;
  createdTime: Date;
  lastUpdatedTime: Date;
  tags?: { [key: string]: string | undefined };
}
export interface GetPaymentManagerRequest {
  paymentManagerId: string;
}
export interface GetPaymentManagerResponse {
  paymentManagerArn: string;
  paymentManagerId: string;
  name: string;
  description?: string;
  authorizerType: PaymentsAuthorizerType;
  authorizerConfiguration?: AuthorizerConfiguration;
  roleArn: string;
  workloadIdentityDetails?: WorkloadIdentityDetails;
  createdAt: Date;
  lastUpdatedAt: Date;
  status: PaymentManagerStatus;
  tags?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
}
export interface GetPolicyRequest {
  policyEngineId: string;
  policyId: string;
}
export interface GetPolicyResponse {
  policyId: string;
  name: string;
  policyEngineId: string;
  createdAt: Date;
  updatedAt: Date;
  policyArn: string;
  status: PolicyStatus;
  enforcementMode?: EnforcementMode;
  definition: PolicyDefinition;
  description?: string | redacted.Redacted<string>;
  statusReasons: string[];
}
export interface GetPolicyEngineRequest {
  policyEngineId: string;
}
export interface GetPolicyEngineResponse {
  policyEngineId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  policyEngineArn: string;
  status: PolicyEngineStatus;
  encryptionKeyArn?: string;
  description?: string | redacted.Redacted<string>;
  statusReasons: string[];
}
export interface GetPolicyEngineSummaryRequest {
  policyEngineId: string;
}
export interface GetPolicyEngineSummaryResponse {
  policyEngineId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  policyEngineArn: string;
  status: PolicyEngineStatus;
  encryptionKeyArn?: string;
}
export interface GetPolicyGenerationRequest {
  policyGenerationId: string;
  policyEngineId: string;
}
export type PolicyGenerationName = string;
export type PolicyGenerationArn = string;
export type Resource = { arn: string };
export type PolicyGenerationStatus =
  | "GENERATING"
  | "GENERATED"
  | "GENERATE_FAILED"
  | "DELETE_FAILED"
  | (string & {});
export interface GetPolicyGenerationResponse {
  policyEngineId: string;
  policyGenerationId: string;
  name: string;
  policyGenerationArn: string;
  resource: Resource;
  createdAt: Date;
  updatedAt: Date;
  status: PolicyGenerationStatus;
  findings?: string;
  statusReasons: string[];
}
export interface GetPolicyGenerationSummaryRequest {
  policyGenerationId: string;
  policyEngineId: string;
}
export interface GetPolicyGenerationSummaryResponse {
  policyEngineId: string;
  policyGenerationId: string;
  name: string;
  policyGenerationArn: string;
  resource: Resource;
  createdAt: Date;
  updatedAt: Date;
  status: PolicyGenerationStatus;
  findings?: string;
}
export interface GetPolicySummaryRequest {
  policyEngineId: string;
  policyId: string;
}
export interface GetPolicySummaryResponse {
  policyId: string;
  name: string;
  policyEngineId: string;
  createdAt: Date;
  updatedAt: Date;
  policyArn: string;
  status: PolicyStatus;
  enforcementMode?: EnforcementMode;
}
export interface GetRegistryRequest {
  registryId: string;
}
export type RegistryId = string;
export interface GetRegistryResponse {
  name: string;
  description?: string | redacted.Redacted<string>;
  registryId: string;
  registryArn: string;
  authorizerType?: RegistryAuthorizerType;
  authorizerConfiguration?: AuthorizerConfiguration;
  approvalConfiguration?: ApprovalConfiguration;
  status: RegistryStatus;
  statusReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface GetRegistryRecordRequest {
  registryId: string;
  recordId: string;
}
export type RegistryRecordId = string;
export interface GetRegistryRecordResponse {
  registryArn: string;
  recordArn: string;
  recordId: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  descriptorType: DescriptorType;
  descriptors: Descriptors;
  recordVersion?: string;
  status: RegistryRecordStatus;
  createdAt: Date;
  updatedAt: Date;
  statusReason?: string;
  synchronizationType?: SynchronizationType;
  synchronizationConfiguration?: SynchronizationConfiguration;
}
export interface GetResourcePolicyRequest {
  resourceArn: string;
}
export type ResourcePolicyBody = string;
export interface GetResourcePolicyResponse {
  policy?: string;
}
export type TokenVaultIdType = string;
export interface GetTokenVaultRequest {
  tokenVaultId?: string;
}
export type KeyType =
  | "CustomerManagedKey"
  | "ServiceManagedKey"
  | (string & {});
export interface KmsConfiguration {
  keyType: KeyType;
  kmsKeyArn?: string;
}
export interface GetTokenVaultResponse {
  tokenVaultId: string;
  kmsConfiguration: KmsConfiguration;
  lastModifiedDate: Date;
}
export interface GetWorkloadIdentityRequest {
  name: string;
}
export interface GetWorkloadIdentityResponse {
  name: string;
  workloadIdentityArn: string;
  allowedResourceOauth2ReturnUrls?: string[];
  createdTime: Date;
  lastUpdatedTime: Date;
}
export type MaxResults = number;
export type NextToken = string;
export interface ListAgentRuntimeEndpointsRequest {
  agentRuntimeId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface AgentRuntimeEndpoint {
  name: string | redacted.Redacted<string>;
  liveVersion?: string;
  targetVersion?: string;
  agentRuntimeEndpointArn: string;
  agentRuntimeArn: string;
  status: AgentRuntimeEndpointStatus;
  id: string;
  description?: string;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export type AgentRuntimeEndpoints = AgentRuntimeEndpoint[];
export interface ListAgentRuntimeEndpointsResponse {
  runtimeEndpoints: AgentRuntimeEndpoint[];
  nextToken?: string;
}
export interface ListAgentRuntimesRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface AgentRuntime {
  agentRuntimeArn: string;
  agentRuntimeId: string;
  agentRuntimeVersion: string;
  agentRuntimeName: string;
  description: string | redacted.Redacted<string>;
  lastUpdatedAt: Date;
  status: AgentRuntimeStatus;
}
export type AgentRuntimes = AgentRuntime[];
export interface ListAgentRuntimesResponse {
  agentRuntimes: AgentRuntime[];
  nextToken?: string;
}
export interface ListAgentRuntimeVersionsRequest {
  agentRuntimeId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ListAgentRuntimeVersionsResponse {
  agentRuntimes: AgentRuntime[];
  nextToken?: string;
}
export interface ListAgentRuntimeVersionsByCapacityProviderInput {
  capacityProviderId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface AgentRuntimeVersionSummary {
  agentRuntimeArn: string;
  agentRuntimeVersion: string;
  status: AgentRuntimeStatus;
}
export type AgentRuntimeVersionSummaryList = AgentRuntimeVersionSummary[];
export interface ListAgentRuntimeVersionsByCapacityProviderOutput {
  agentRuntimes: AgentRuntimeVersionSummary[];
  nextToken?: string;
}
export interface ListApiKeyCredentialProvidersRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface ApiKeyCredentialProviderItem {
  name: string;
  credentialProviderArn: string;
  createdTime: Date;
  lastUpdatedTime: Date;
}
export type ApiKeyCredentialProviders = ApiKeyCredentialProviderItem[];
export interface ListApiKeyCredentialProvidersResponse {
  credentialProviders: ApiKeyCredentialProviderItem[];
  nextToken?: string;
}
export interface ListBrowserProfilesRequest {
  maxResults?: number;
  nextToken?: string;
  name?: string;
}
export interface BrowserProfileSummary {
  profileId: string;
  profileArn: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  status: BrowserProfileStatus;
  createdAt: Date;
  lastUpdatedAt: Date;
  lastSavedAt?: Date;
  lastSavedBrowserSessionId?: string;
  lastSavedBrowserId?: string;
}
export type BrowserProfileSummaries = BrowserProfileSummary[];
export interface ListBrowserProfilesResponse {
  profileSummaries: BrowserProfileSummary[];
  nextToken?: string;
}
export type ResourceType = "SYSTEM" | "CUSTOM" | (string & {});
export interface ListBrowsersRequest {
  maxResults?: number;
  nextToken?: string;
  type?: ResourceType;
}
export interface BrowserSummary {
  browserId: string;
  browserArn: string;
  name?: string;
  description?: string | redacted.Redacted<string>;
  status: BrowserStatus;
  createdAt: Date;
  lastUpdatedAt?: Date;
}
export type BrowserSummaries = BrowserSummary[];
export interface ListBrowsersResponse {
  browserSummaries: BrowserSummary[];
  nextToken?: string;
}
export interface ListCapacityProvidersInput {
  maxResults?: number;
  nextToken?: string;
}
export interface CapacityProviderSummary {
  capacityProviderId: string;
  capacityProviderArn: string;
  name: string;
  status: CapacityProviderStatus;
  lastUpdatedAt: Date;
}
export type CapacityProviderList = CapacityProviderSummary[];
export interface ListCapacityProvidersOutput {
  capacityProviders: CapacityProviderSummary[];
  nextToken?: string;
}
export interface ListCodeInterpretersRequest {
  maxResults?: number;
  nextToken?: string;
  type?: ResourceType;
}
export interface CodeInterpreterSummary {
  codeInterpreterId: string;
  codeInterpreterArn: string;
  name?: string;
  description?: string | redacted.Redacted<string>;
  status: CodeInterpreterStatus;
  createdAt: Date;
  lastUpdatedAt?: Date;
}
export type CodeInterpreterSummaries = CodeInterpreterSummary[];
export interface ListCodeInterpretersResponse {
  codeInterpreterSummaries: CodeInterpreterSummary[];
  nextToken?: string;
}
export interface ListConfigurationBundlesRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface ConfigurationBundleSummary {
  bundleArn: string;
  bundleId: string;
  bundleName: string;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
}
export type ConfigurationBundleSummaryList = ConfigurationBundleSummary[];
export interface ListConfigurationBundlesResponse {
  bundles: ConfigurationBundleSummary[];
  nextToken?: string;
}
export interface VersionFilter {
  branchName?: string;
  createdByName?: string;
  latestPerBranch?: boolean;
}
export interface ListConfigurationBundleVersionsRequest {
  bundleId: string;
  nextToken?: string;
  maxResults?: number;
  filter?: VersionFilter;
}
export interface ConfigurationBundleVersionSummary {
  bundleArn: string;
  bundleId: string;
  versionId: string;
  lineageMetadata?: VersionLineageMetadata;
  versionCreatedAt: Date;
}
export type ConfigurationBundleVersionSummaryList =
  ConfigurationBundleVersionSummary[];
export interface ListConfigurationBundleVersionsResponse {
  versions: ConfigurationBundleVersionSummary[];
  nextToken?: string;
}
export interface ListDatasetExamplesRequest {
  datasetId: string;
  datasetVersion?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ListDatasetExamplesResponse {
  datasetArn: string;
  datasetId: string;
  datasetVersion: string;
  examples: any[];
  nextToken?: string;
}
export interface ListDatasetsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface DatasetSummary {
  datasetArn: string;
  datasetId: string;
  datasetName: string;
  description?: string;
  status: DatasetStatus;
  draftStatus?: DraftStatus;
  schemaType: DatasetSchemaType;
  exampleCount: number;
  createdAt: Date;
  updatedAt: Date;
}
export type DatasetSummaryList = DatasetSummary[];
export interface ListDatasetsResponse {
  datasets: DatasetSummary[];
  nextToken?: string;
}
export interface ListDatasetVersionsRequest {
  datasetId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface DatasetVersionSummary {
  datasetVersion: string;
  exampleCount: number;
  createdAt: Date;
}
export type DatasetVersionSummaryList = DatasetVersionSummary[];
export interface ListDatasetVersionsResponse {
  versions: DatasetVersionSummary[];
  nextToken?: string;
}
export interface ListEvaluatorsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface EvaluatorSummary {
  evaluatorArn: string;
  evaluatorId: string;
  evaluatorName: string;
  description?: string | redacted.Redacted<string>;
  evaluatorType: EvaluatorType;
  provider?: Provider;
  level?: EvaluatorLevel;
  status: EvaluatorStatus;
  createdAt: Date;
  updatedAt: Date;
  lockedForModification?: boolean;
  kmsKeyArn?: string;
}
export type EvaluatorSummaryList = EvaluatorSummary[];
export interface ListEvaluatorsResponse {
  evaluators: EvaluatorSummary[];
  nextToken?: string;
}
export type GatewayRateLimitMaxResults = number;
export type GatewayRateLimitNextToken = string;
export interface ListGatewayRateLimitsRequest {
  gatewayIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ListGatewayRateLimitsResponse {
  rateLimits: GatewayRateLimitDetail[];
  nextToken?: string;
}
export type GatewayRuleMaxResults = number;
export type GatewayRuleNextToken = string;
export interface ListGatewayRulesRequest {
  gatewayIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export interface GatewayRuleDetail {
  ruleId: string;
  gatewayArn: string;
  priority: number;
  conditions?: Condition[];
  actions: Action[];
  description?: string;
  createdAt: Date;
  status: GatewayRuleStatus;
  system?: SystemManagedBlock;
  updatedAt?: Date;
}
export type GatewayRules = GatewayRuleDetail[];
export interface ListGatewayRulesResponse {
  gatewayRules: GatewayRuleDetail[];
  nextToken?: string;
}
export type GatewayMaxResults = number;
export type GatewayNextToken = string;
export interface ListGatewaysRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface GatewaySummary {
  gatewayId: string;
  name: string;
  status: GatewayStatus;
  description?: string | redacted.Redacted<string>;
  createdAt: Date;
  updatedAt: Date;
  authorizerType: AuthorizerType;
  protocolType?: GatewayProtocolType;
}
export type GatewaySummaries = GatewaySummary[];
export interface ListGatewaysResponse {
  items: GatewaySummary[];
  nextToken?: string;
}
export type TargetMaxResults = number;
export type TargetNextToken = string;
export interface ListGatewayTargetsRequest {
  gatewayIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export type TargetType =
  | "OPEN_API_SCHEMA"
  | "SMITHY_MODEL"
  | "MCP_SERVER"
  | "LAMBDA"
  | "API_GATEWAY"
  | "CONNECTOR"
  | "AGENTCORE_RUNTIME"
  | "PASSTHROUGH"
  | "PROVIDER"
  | "HTTP_CONNECTOR"
  | (string & {});
export interface TargetSummary {
  targetId: string;
  name: string | redacted.Redacted<string>;
  status: TargetStatus;
  description?: string | redacted.Redacted<string>;
  createdAt: Date;
  updatedAt: Date;
  resourcePriority?: number;
  lastSynchronizedAt?: Date;
  authorizationData?: AuthorizationData;
  targetType?: TargetType;
  listingMode?: ListingMode;
}
export type TargetSummaries = TargetSummary[];
export interface ListGatewayTargetsResponse {
  items: TargetSummary[];
  nextToken?: string;
}
export interface ListHarnessEndpointsRequest {
  harnessId: string;
  maxResults?: number;
  nextToken?: string;
}
export type HarnessEndpoints = HarnessEndpoint[];
export interface ListHarnessEndpointsResponse {
  endpoints: HarnessEndpoint[];
  nextToken?: string;
}
export interface ListHarnessesRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface HarnessSummary {
  harnessId: string;
  harnessName: string;
  arn: string;
  status: HarnessStatus;
  createdAt: Date;
  updatedAt: Date;
  harnessVersion?: string;
}
export type HarnessSummaries = HarnessSummary[];
export interface ListHarnessesResponse {
  harnesses: HarnessSummary[];
  nextToken?: string;
}
export interface ListHarnessVersionsRequest {
  harnessId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface HarnessVersionSummary {
  harnessId: string;
  harnessName: string;
  arn: string;
  harnessVersion: string;
  status: HarnessStatus;
  createdAt: Date;
  updatedAt: Date;
  failureReason?: string;
}
export type HarnessVersionSummaries = HarnessVersionSummary[];
export interface ListHarnessVersionsResponse {
  harnessVersions: HarnessVersionSummary[];
  nextToken?: string;
}
export interface ListMemoriesInput {
  maxResults?: number;
  nextToken?: string;
}
export interface MemorySummary {
  arn?: string;
  id?: string;
  status?: MemoryStatus;
  createdAt: Date;
  updatedAt: Date;
  managedByResourceArn?: string;
}
export type MemorySummaryList = MemorySummary[];
export interface ListMemoriesOutput {
  memories: MemorySummary[];
  nextToken?: string;
}
export interface ListOauth2CredentialProvidersRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface Oauth2CredentialProviderItem {
  name: string;
  credentialProviderVendor: CredentialProviderVendorType;
  credentialProviderArn: string;
  createdTime: Date;
  lastUpdatedTime: Date;
}
export type Oauth2CredentialProviders = Oauth2CredentialProviderItem[];
export interface ListOauth2CredentialProvidersResponse {
  credentialProviders: Oauth2CredentialProviderItem[];
  nextToken?: string;
}
export interface ListOnlineEvaluationConfigsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface OnlineEvaluationConfigSummary {
  onlineEvaluationConfigArn: string;
  onlineEvaluationConfigId: string;
  onlineEvaluationConfigName: string;
  description?: string | redacted.Redacted<string>;
  status: OnlineEvaluationConfigStatus;
  executionStatus: OnlineEvaluationExecutionStatus;
  createdAt: Date;
  updatedAt: Date;
  failureReason?: string;
  insights?: Insight[];
  clusteringConfig?: ClusteringConfig;
}
export type OnlineEvaluationConfigSummaryList = OnlineEvaluationConfigSummary[];
export interface ListOnlineEvaluationConfigsResponse {
  onlineEvaluationConfigs: OnlineEvaluationConfigSummary[];
  nextToken?: string;
}
export interface ListPaymentConnectorsRequest {
  paymentManagerId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface PaymentConnectorSummary {
  paymentConnectorId: string;
  name: string;
  type: PaymentConnectorType;
  status: PaymentConnectorStatus;
  lastUpdatedAt: Date;
}
export type PaymentConnectorSummaries = PaymentConnectorSummary[];
export interface ListPaymentConnectorsResponse {
  paymentConnectors: PaymentConnectorSummary[];
  nextToken?: string;
}
export interface ListPaymentCredentialProvidersRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface PaymentCredentialProviderItem {
  name: string;
  credentialProviderVendor: PaymentCredentialProviderVendorType;
  credentialProviderArn: string;
  createdTime: Date;
  lastUpdatedTime: Date;
}
export type PaymentCredentialProviders = PaymentCredentialProviderItem[];
export interface ListPaymentCredentialProvidersResponse {
  credentialProviders: PaymentCredentialProviderItem[];
  nextToken?: string;
}
export interface ListPaymentManagersRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface PaymentManagerSummary {
  paymentManagerArn: string;
  paymentManagerId: string;
  name: string;
  description?: string;
  authorizerType: PaymentsAuthorizerType;
  roleArn: string;
  status: PaymentManagerStatus;
  createdAt?: Date;
  lastUpdatedAt: Date;
  kmsKeyArn?: string;
}
export type PaymentManagerSummaries = PaymentManagerSummary[];
export interface ListPaymentManagersResponse {
  paymentManagers: PaymentManagerSummary[];
  nextToken?: string;
}
export interface ListPoliciesRequest {
  nextToken?: string;
  maxResults?: number;
  policyEngineId: string;
  targetResourceScope?: string;
}
export interface Policy {
  policyId: string;
  name: string;
  policyEngineId: string;
  createdAt: Date;
  updatedAt: Date;
  policyArn: string;
  status: PolicyStatus;
  enforcementMode?: EnforcementMode;
  definition: PolicyDefinition;
  description?: string | redacted.Redacted<string>;
  statusReasons: string[];
}
export type Policies = Policy[];
export interface ListPoliciesResponse {
  policies: Policy[];
  nextToken?: string;
}
export interface ListPolicyEnginesRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface PolicyEngine {
  policyEngineId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  policyEngineArn: string;
  status: PolicyEngineStatus;
  encryptionKeyArn?: string;
  description?: string | redacted.Redacted<string>;
  statusReasons: string[];
}
export type PolicyEngines = PolicyEngine[];
export interface ListPolicyEnginesResponse {
  policyEngines: PolicyEngine[];
  nextToken?: string;
}
export interface ListPolicyEngineSummariesRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface PolicyEngineSummary {
  policyEngineId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  policyEngineArn: string;
  status: PolicyEngineStatus;
  encryptionKeyArn?: string;
}
export type PolicyEngineSummaryList = PolicyEngineSummary[];
export interface ListPolicyEngineSummariesResponse {
  policyEngines: PolicyEngineSummary[];
  nextToken?: string;
}
export interface ListPolicyGenerationAssetsRequest {
  policyGenerationId: string;
  policyEngineId: string;
  nextToken?: string;
  maxResults?: number;
}
export type NaturalLanguage = string;
export type FindingType =
  | "VALID"
  | "INVALID"
  | "NOT_TRANSLATABLE"
  | "ALLOW_ALL"
  | "ALLOW_NONE"
  | "DENY_ALL"
  | "DENY_NONE"
  | (string & {});
export interface Finding {
  type?: FindingType;
  description?: string;
}
export type Findings = Finding[];
export interface PolicyGenerationAsset {
  policyGenerationAssetId: string;
  definition?: PolicyDefinition;
  rawTextFragment: string;
  findings: Finding[];
}
export type PolicyGenerationAssets = PolicyGenerationAsset[];
export interface ListPolicyGenerationAssetsResponse {
  policyGenerationAssets?: PolicyGenerationAsset[];
  nextToken?: string;
}
export interface ListPolicyGenerationsRequest {
  nextToken?: string;
  maxResults?: number;
  policyEngineId: string;
}
export interface PolicyGeneration {
  policyEngineId: string;
  policyGenerationId: string;
  name: string;
  policyGenerationArn: string;
  resource: Resource;
  createdAt: Date;
  updatedAt: Date;
  status: PolicyGenerationStatus;
  findings?: string;
  statusReasons: string[];
}
export type PolicyGenerations = PolicyGeneration[];
export interface ListPolicyGenerationsResponse {
  policyGenerations: PolicyGeneration[];
  nextToken?: string;
}
export interface ListPolicyGenerationSummariesRequest {
  nextToken?: string;
  maxResults?: number;
  policyEngineId: string;
}
export interface PolicyGenerationSummary {
  policyEngineId: string;
  policyGenerationId: string;
  name: string;
  policyGenerationArn: string;
  resource: Resource;
  createdAt: Date;
  updatedAt: Date;
  status: PolicyGenerationStatus;
  findings?: string;
}
export type PolicyGenerationSummaryList = PolicyGenerationSummary[];
export interface ListPolicyGenerationSummariesResponse {
  policyGenerations: PolicyGenerationSummary[];
  nextToken?: string;
}
export interface ListPolicySummariesRequest {
  nextToken?: string;
  maxResults?: number;
  policyEngineId: string;
  targetResourceScope?: string;
}
export interface PolicySummary {
  policyId: string;
  name: string;
  policyEngineId: string;
  createdAt: Date;
  updatedAt: Date;
  policyArn: string;
  status: PolicyStatus;
  enforcementMode?: EnforcementMode;
}
export type PolicySummaryList = PolicySummary[];
export interface ListPolicySummariesResponse {
  policies: PolicySummary[];
  nextToken?: string;
}
export interface ListRegistriesRequest {
  maxResults?: number;
  nextToken?: string;
  status?: RegistryStatus;
  authorizerType?: RegistryAuthorizerType;
}
export interface RegistrySummary {
  name: string;
  description?: string | redacted.Redacted<string>;
  registryId: string;
  registryArn: string;
  authorizerType?: RegistryAuthorizerType;
  status: RegistryStatus;
  statusReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
export type RegistrySummaryList = RegistrySummary[];
export interface ListRegistriesResponse {
  registries: RegistrySummary[];
  nextToken?: string;
}
export interface ListRegistryRecordsRequest {
  registryId: string;
  maxResults?: number;
  nextToken?: string;
  name?: string;
  status?: RegistryRecordStatus;
  descriptorType?: DescriptorType;
}
export interface RegistryRecordSummary {
  registryArn: string;
  recordArn: string;
  recordId: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  descriptorType: DescriptorType;
  recordVersion: string;
  status: RegistryRecordStatus;
  createdAt: Date;
  updatedAt: Date;
}
export type RegistryRecordSummaryList = RegistryRecordSummary[];
export interface ListRegistryRecordsResponse {
  registryRecords: RegistryRecordSummary[];
  nextToken?: string;
}
export type TaggableResourcesArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface ListWorkloadIdentitiesRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface WorkloadIdentityType {
  name: string;
  workloadIdentityArn: string;
}
export type WorkloadIdentityList = WorkloadIdentityType[];
export interface ListWorkloadIdentitiesResponse {
  workloadIdentities: WorkloadIdentityType[];
  nextToken?: string;
}
export interface PutResourcePolicyRequest {
  resourceArn: string;
  policy: string;
}
export interface PutResourcePolicyResponse {
  policy: string;
}
export interface SetTokenVaultCMKRequest {
  tokenVaultId?: string;
  kmsConfiguration: KmsConfiguration;
}
export interface SetTokenVaultCMKResponse {
  tokenVaultId: string;
  kmsConfiguration: KmsConfiguration;
  lastModifiedDate: Date;
}
export type Content = { rawText: string };
export interface StartPolicyGenerationRequest {
  policyEngineId: string;
  resource: Resource;
  content: Content;
  name: string;
  clientToken?: string;
}
export interface StartPolicyGenerationResponse {
  policyEngineId: string;
  policyGenerationId: string;
  name: string;
  policyGenerationArn: string;
  resource: Resource;
  createdAt: Date;
  updatedAt: Date;
  status: PolicyGenerationStatus;
  findings?: string;
  statusReasons: string[];
}
export interface SubmitRegistryRecordForApprovalRequest {
  registryId: string;
  recordId: string;
}
export interface SubmitRegistryRecordForApprovalResponse {
  registryArn: string;
  recordArn: string;
  recordId: string;
  status: RegistryRecordStatus;
  updatedAt: Date;
}
export type TargetIdList = string[];
export interface SynchronizeGatewayTargetsRequest {
  gatewayIdentifier: string;
  targetIdList: string[];
}
export interface GatewayTarget {
  gatewayArn: string;
  targetId: string;
  createdAt: Date;
  updatedAt: Date;
  status: TargetStatus;
  statusReasons?: string[];
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  targetConfiguration: TargetConfiguration;
  credentialProviderConfigurations: CredentialProviderConfiguration[];
  lastSynchronizedAt?: Date;
  metadataConfiguration?: MetadataConfiguration;
  privateEndpoint?: PrivateEndpoint;
  privateEndpointManagedResources?: ManagedResourceDetails[];
  authorizationData?: AuthorizationData;
  protocolType?: TargetProtocolType;
}
export type GatewayTargetList = GatewayTarget[];
export interface SynchronizeGatewayTargetsResponse {
  targets?: GatewayTarget[];
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
export interface UpdateAgentRuntimeRequest {
  agentRuntimeId: string;
  agentRuntimeArtifact: AgentRuntimeArtifact;
  roleArn: string;
  networkConfiguration?: NetworkConfiguration;
  description?: string | redacted.Redacted<string>;
  authorizerConfiguration?: AuthorizerConfiguration;
  requestHeaderConfiguration?: RequestHeaderConfiguration;
  protocolConfiguration?: ProtocolConfiguration;
  lifecycleConfiguration?: LifecycleConfiguration;
  metadataConfiguration?: RuntimeMetadataConfiguration;
  environmentVariables?: { [key: string]: string | undefined };
  filesystemConfigurations?: FilesystemConfiguration[];
  capacityProviderConfiguration?: CapacityProviderConfiguration;
  clientToken?: string;
}
export interface UpdateAgentRuntimeResponse {
  agentRuntimeArn: string;
  agentRuntimeId: string;
  workloadIdentityDetails?: WorkloadIdentityDetails;
  agentRuntimeVersion: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  status: AgentRuntimeStatus;
}
export interface UpdateAgentRuntimeEndpointRequest {
  agentRuntimeId: string;
  endpointName: string | redacted.Redacted<string>;
  agentRuntimeVersion?: string;
  description?: string;
  clientToken?: string;
}
export interface UpdateAgentRuntimeEndpointResponse {
  liveVersion?: string;
  targetVersion?: string;
  agentRuntimeEndpointArn: string;
  agentRuntimeArn: string;
  status: AgentRuntimeEndpointStatus;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export interface UpdateApiKeyCredentialProviderRequest {
  name: string;
  apiKey?: string | redacted.Redacted<string>;
  apiKeySecretConfig?: SecretReference;
  apiKeySecretSource?: SecretSourceType;
}
export interface UpdateApiKeyCredentialProviderResponse {
  apiKeySecretArn: Secret;
  apiKeySecretJsonKey?: string;
  apiKeySecretSource?: SecretSourceType;
  name: string;
  credentialProviderArn: string;
  createdTime: Date;
  lastUpdatedTime: Date;
}
export interface UpdatedDescription {
  optionalValue?: string | redacted.Redacted<string>;
}
export interface UpdateCapacityProviderInput {
  capacityProviderId: string;
  description?: UpdatedDescription;
  clientToken?: string;
}
export interface UpdateCapacityProviderOutput {
  capacityProviderId: string;
  capacityProviderArn: string;
  name: string;
  status: CapacityProviderStatus;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export interface UpdateConfigurationBundleRequest {
  clientToken?: string;
  bundleId: string;
  bundleName?: string;
  description?: string | redacted.Redacted<string>;
  components?: { [key: string]: ComponentConfiguration | undefined };
  parentVersionIds?: string[];
  branchName?: string;
  commitMessage?: string;
  createdBy?: VersionCreatedBySource;
  kmsKeyArn?: string;
}
export interface UpdateConfigurationBundleResponse {
  bundleArn: string;
  bundleId: string;
  versionId: string;
  updatedAt: Date;
}
export interface UpdateDatasetRequest {
  datasetId: string;
  clientToken?: string;
  description?: string;
}
export interface UpdateDatasetResponse {
  datasetArn: string;
  datasetId: string;
  updatedAt: Date;
}
export interface UpdateDatasetExamplesRequest {
  datasetId: string;
  clientToken?: string;
  examples: any[];
}
export interface UpdateDatasetExamplesResponse {
  datasetArn: string;
  datasetId: string;
  status: DatasetStatus;
  updatedCount: number;
  updatedAt: Date;
}
export interface UpdateEvaluatorRequest {
  clientToken?: string;
  evaluatorId: string;
  description?: string | redacted.Redacted<string>;
  evaluatorConfig?: EvaluatorConfig;
  level?: EvaluatorLevel;
  kmsKeyArn?: string;
}
export interface UpdateEvaluatorResponse {
  evaluatorArn: string;
  evaluatorId: string;
  updatedAt: Date;
  status: EvaluatorStatus;
}
export interface UpdateGatewayRequest {
  gatewayIdentifier: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  roleArn: string;
  protocolType?: GatewayProtocolType;
  protocolConfiguration?: GatewayProtocolConfiguration;
  authorizerType: AuthorizerType;
  authorizerConfiguration?: AuthorizerConfiguration;
  kmsKeyArn?: string;
  customTransformConfiguration?: CustomTransformConfiguration;
  interceptorConfigurations?: GatewayInterceptorConfiguration[];
  policyEngineConfiguration?: GatewayPolicyEngineConfiguration;
  exceptionLevel?: ExceptionLevel;
  wafConfiguration?: WafConfiguration;
}
export interface UpdateGatewayResponse {
  gatewayArn: string;
  gatewayId: string;
  gatewayUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  status: GatewayStatus;
  statusReasons?: string[];
  name: string;
  description?: string | redacted.Redacted<string>;
  roleArn?: string;
  protocolType?: GatewayProtocolType;
  protocolConfiguration?: GatewayProtocolConfiguration;
  authorizerType: AuthorizerType;
  authorizerConfiguration?: AuthorizerConfiguration;
  kmsKeyArn?: string;
  customTransformConfiguration?: CustomTransformConfiguration;
  interceptorConfigurations?: GatewayInterceptorConfiguration[];
  policyEngineConfiguration?: GatewayPolicyEngineConfiguration;
  workloadIdentityDetails?: WorkloadIdentityDetails;
  exceptionLevel?: ExceptionLevel;
  webAclArn?: string;
  wafConfiguration?: WafConfiguration;
}
export interface UpdateGatewayRateLimitRequest {
  gatewayIdentifier: string;
  rateLimitId: string;
  description?: string;
  entries: LimitEntry[];
}
export interface UpdateGatewayRateLimitResponse {
  rateLimitId: string;
  gatewayIdentifier: string;
  description?: string;
  dimensionKeys: string[];
  entries: LimitEntry[];
  status: GatewayRateLimitStatus;
  createdAt: Date;
  updatedAt: Date;
}
export interface UpdateGatewayRuleRequest {
  gatewayIdentifier: string;
  ruleId: string;
  priority?: number;
  conditions?: Condition[];
  actions?: Action[];
  description?: string;
}
export interface UpdateGatewayRuleResponse {
  ruleId: string;
  gatewayArn: string;
  priority: number;
  conditions?: Condition[];
  actions: Action[];
  description?: string;
  createdAt: Date;
  status: GatewayRuleStatus;
  system?: SystemManagedBlock;
  updatedAt?: Date;
}
export interface UpdateGatewayTargetRequest {
  gatewayIdentifier: string;
  targetId: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  targetConfiguration: TargetConfiguration;
  credentialProviderConfigurations?: CredentialProviderConfiguration[];
  metadataConfiguration?: MetadataConfiguration;
  privateEndpoint?: PrivateEndpoint;
}
export interface UpdateGatewayTargetResponse {
  gatewayArn: string;
  targetId: string;
  createdAt: Date;
  updatedAt: Date;
  status: TargetStatus;
  statusReasons?: string[];
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  targetConfiguration: TargetConfiguration;
  credentialProviderConfigurations: CredentialProviderConfiguration[];
  lastSynchronizedAt?: Date;
  metadataConfiguration?: MetadataConfiguration;
  privateEndpoint?: PrivateEndpoint;
  privateEndpointManagedResources?: ManagedResourceDetails[];
  authorizationData?: AuthorizationData;
  protocolType?: TargetProtocolType;
}
export interface UpdatedHarnessEnvironmentArtifact {
  optionalValue?: HarnessEnvironmentArtifact;
}
export interface UpdatedAuthorizerConfiguration {
  optionalValue?: AuthorizerConfiguration;
}
export interface UpdatedHarnessMemoryConfiguration {
  optionalValue?: HarnessMemoryConfiguration;
}
export interface UpdateHarnessRequest {
  harnessId: string;
  clientToken?: string;
  executionRoleArn?: string;
  environment?: HarnessEnvironmentProviderRequest;
  environmentArtifact?: UpdatedHarnessEnvironmentArtifact;
  environmentVariables?: { [key: string]: string | undefined };
  authorizerConfiguration?: UpdatedAuthorizerConfiguration;
  model?: HarnessModelConfiguration;
  systemPrompt?: HarnessSystemContentBlock[];
  tools?: HarnessTool[];
  skills?: HarnessSkill[];
  allowedTools?: string[];
  memory?: UpdatedHarnessMemoryConfiguration;
  truncation?: HarnessTruncationConfiguration;
  maxIterations?: number;
  maxTokens?: number;
  timeoutSeconds?: number;
}
export interface UpdateHarnessResponse {
  harness: Harness;
}
export interface UpdateHarnessEndpointRequest {
  harnessId: string;
  endpointName: string;
  targetVersion?: string;
  description?: string;
  clientToken?: string;
}
export interface UpdateHarnessEndpointResponse {
  endpoint: HarnessEndpoint;
}
export type CustomExtractionConfigurationInput =
  | {
      semanticExtractionOverride: SemanticOverrideExtractionConfigurationInput;
      userPreferenceExtractionOverride?: never;
      episodicExtractionOverride?: never;
    }
  | {
      semanticExtractionOverride?: never;
      userPreferenceExtractionOverride: UserPreferenceOverrideExtractionConfigurationInput;
      episodicExtractionOverride?: never;
    }
  | {
      semanticExtractionOverride?: never;
      userPreferenceExtractionOverride?: never;
      episodicExtractionOverride: EpisodicOverrideExtractionConfigurationInput;
    };
export type ModifyExtractionConfiguration = {
  customExtractionConfiguration: CustomExtractionConfigurationInput;
};
export type CustomConsolidationConfigurationInput =
  | {
      semanticConsolidationOverride: SemanticOverrideConsolidationConfigurationInput;
      summaryConsolidationOverride?: never;
      userPreferenceConsolidationOverride?: never;
      episodicConsolidationOverride?: never;
    }
  | {
      semanticConsolidationOverride?: never;
      summaryConsolidationOverride: SummaryOverrideConsolidationConfigurationInput;
      userPreferenceConsolidationOverride?: never;
      episodicConsolidationOverride?: never;
    }
  | {
      semanticConsolidationOverride?: never;
      summaryConsolidationOverride?: never;
      userPreferenceConsolidationOverride: UserPreferenceOverrideConsolidationConfigurationInput;
      episodicConsolidationOverride?: never;
    }
  | {
      semanticConsolidationOverride?: never;
      summaryConsolidationOverride?: never;
      userPreferenceConsolidationOverride?: never;
      episodicConsolidationOverride: EpisodicOverrideConsolidationConfigurationInput;
    };
export type ModifyConsolidationConfiguration = {
  customConsolidationConfiguration: CustomConsolidationConfigurationInput;
};
export type CustomReflectionConfigurationInput = {
  episodicReflectionOverride: EpisodicOverrideReflectionConfigurationInput;
};
export type ModifyReflectionConfiguration =
  | {
      episodicReflectionConfiguration: EpisodicReflectionConfigurationInput;
      customReflectionConfiguration?: never;
    }
  | {
      episodicReflectionConfiguration?: never;
      customReflectionConfiguration: CustomReflectionConfigurationInput;
    };
export interface ModifyInvocationConfigurationInput {
  topicArn?: string;
  payloadDeliveryBucketName?: string;
}
export interface ModifySelfManagedConfiguration {
  triggerConditions?: TriggerConditionInput[];
  invocationConfiguration?: ModifyInvocationConfigurationInput;
  historicalContextWindowSize?: number;
}
export interface ModifyStrategyConfiguration {
  extraction?: ModifyExtractionConfiguration;
  consolidation?: ModifyConsolidationConfiguration;
  reflection?: ModifyReflectionConfiguration;
  selfManagedConfiguration?: ModifySelfManagedConfiguration;
}
export interface ModifyMemoryStrategyInput {
  memoryStrategyId: string;
  description?: string | redacted.Redacted<string>;
  namespaces?: string[];
  namespaceTemplates?: string[];
  configuration?: ModifyStrategyConfiguration;
  memoryRecordSchema?: MemoryRecordSchema;
}
export type ModifyMemoryStrategiesList = ModifyMemoryStrategyInput[];
export interface DeleteMemoryStrategyInput {
  memoryStrategyId: string;
}
export type DeleteMemoryStrategiesList = DeleteMemoryStrategyInput[];
export interface ModifyMemoryStrategies {
  addMemoryStrategies?: MemoryStrategyInput[];
  modifyMemoryStrategies?: ModifyMemoryStrategyInput[];
  deleteMemoryStrategies?: DeleteMemoryStrategyInput[];
}
export interface UpdateMemoryInput {
  clientToken?: string;
  memoryId: string;
  description?: string | redacted.Redacted<string>;
  eventExpiryDuration?: number;
  memoryExecutionRoleArn?: string;
  memoryStrategies?: ModifyMemoryStrategies;
  addIndexedKeys?: IndexedKey[];
  namespaceKeys?: NamespaceKeyEntry[];
  streamDeliveryResources?: StreamDeliveryResources;
}
export interface UpdateMemoryOutput {
  memory?: Memory;
}
export interface UpdateOauth2CredentialProviderRequest {
  name: string;
  credentialProviderVendor: CredentialProviderVendorType;
  oauth2ProviderConfigInput: Oauth2ProviderConfigInput;
}
export interface UpdateOauth2CredentialProviderResponse {
  clientSecretArn: Secret;
  clientSecretJsonKey?: string;
  clientSecretSource?: SecretSourceType;
  name: string;
  credentialProviderVendor: CredentialProviderVendorType;
  credentialProviderArn: string;
  callbackUrl?: string;
  oauth2ProviderConfigOutput: Oauth2ProviderConfigOutput;
  createdTime: Date;
  lastUpdatedTime: Date;
  status?: Status;
}
export interface UpdateOnlineEvaluationConfigRequest {
  clientToken?: string;
  onlineEvaluationConfigId: string;
  description?: string | redacted.Redacted<string>;
  rule?: Rule;
  dataSourceConfig?: DataSourceConfig;
  evaluators?: EvaluatorReference[];
  insights?: Insight[];
  clusteringConfig?: ClusteringConfig;
  evaluationExecutionRoleArn?: string;
  executionStatus?: OnlineEvaluationExecutionStatus;
}
export interface UpdateOnlineEvaluationConfigResponse {
  onlineEvaluationConfigArn: string;
  onlineEvaluationConfigId: string;
  updatedAt: Date;
  status: OnlineEvaluationConfigStatus;
  executionStatus: OnlineEvaluationExecutionStatus;
  failureReason?: string;
}
export interface UpdatePaymentConnectorRequest {
  paymentManagerId: string;
  paymentConnectorId: string;
  description?: string;
  type?: PaymentConnectorType;
  credentialProviderConfigurations?: CredentialsProviderConfiguration[];
  clientToken?: string;
}
export interface UpdatePaymentConnectorResponse {
  paymentConnectorId: string;
  paymentManagerId: string;
  name: string;
  type: PaymentConnectorType;
  credentialProviderConfigurations: CredentialsProviderConfiguration[];
  lastUpdatedAt: Date;
  status: PaymentConnectorStatus;
  authorizationUrl?: string;
}
export interface UpdatePaymentCredentialProviderRequest {
  name: string;
  credentialProviderVendor: PaymentCredentialProviderVendorType;
  providerConfigurationInput: PaymentProviderConfigurationInput;
}
export interface UpdatePaymentCredentialProviderResponse {
  name: string;
  credentialProviderVendor: PaymentCredentialProviderVendorType;
  credentialProviderArn: string;
  providerConfigurationOutput: PaymentProviderConfigurationOutput;
  createdTime: Date;
  lastUpdatedTime: Date;
}
export interface UpdatePaymentManagerRequest {
  paymentManagerId: string;
  description?: string;
  authorizerType?: PaymentsAuthorizerType;
  authorizerConfiguration?: AuthorizerConfiguration;
  roleArn?: string;
  clientToken?: string;
  kmsKeyArn?: string;
}
export interface UpdatePaymentManagerResponse {
  paymentManagerArn: string;
  paymentManagerId: string;
  name: string;
  authorizerType: PaymentsAuthorizerType;
  roleArn: string;
  workloadIdentityDetails?: WorkloadIdentityDetails;
  lastUpdatedAt: Date;
  status: PaymentManagerStatus;
  kmsKeyArn?: string;
}
export interface UpdatePolicyRequest {
  policyEngineId: string;
  policyId: string;
  description?: UpdatedDescription;
  definition?: PolicyDefinition;
  validationMode?: PolicyValidationMode;
  enforcementMode?: EnforcementMode;
}
export interface UpdatePolicyResponse {
  policyId: string;
  name: string;
  policyEngineId: string;
  createdAt: Date;
  updatedAt: Date;
  policyArn: string;
  status: PolicyStatus;
  enforcementMode?: EnforcementMode;
  definition: PolicyDefinition;
  description?: string | redacted.Redacted<string>;
  statusReasons: string[];
}
export interface UpdatePolicyEngineRequest {
  policyEngineId: string;
  description?: UpdatedDescription;
}
export interface UpdatePolicyEngineResponse {
  policyEngineId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  policyEngineArn: string;
  status: PolicyEngineStatus;
  encryptionKeyArn?: string;
  description?: string | redacted.Redacted<string>;
  statusReasons: string[];
}
export interface UpdatedApprovalConfiguration {
  optionalValue?: ApprovalConfiguration;
}
export interface UpdateRegistryRequest {
  registryId: string;
  name?: string;
  description?: UpdatedDescription;
  authorizerConfiguration?: UpdatedAuthorizerConfiguration;
  approvalConfiguration?: UpdatedApprovalConfiguration;
}
export interface UpdateRegistryResponse {
  name: string;
  description?: string | redacted.Redacted<string>;
  registryId: string;
  registryArn: string;
  authorizerType?: RegistryAuthorizerType;
  authorizerConfiguration?: AuthorizerConfiguration;
  approvalConfiguration?: ApprovalConfiguration;
  status: RegistryStatus;
  statusReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface UpdatedServerDefinition {
  optionalValue?: ServerDefinition;
}
export interface UpdatedToolsDefinition {
  optionalValue?: ToolsDefinition;
}
export interface UpdatedMcpDescriptorFields {
  server?: UpdatedServerDefinition;
  tools?: UpdatedToolsDefinition;
}
export interface UpdatedMcpDescriptor {
  optionalValue?: UpdatedMcpDescriptorFields;
}
export interface UpdatedA2aDescriptor {
  optionalValue?: A2aDescriptor;
}
export interface UpdatedCustomDescriptor {
  optionalValue?: CustomDescriptor;
}
export interface UpdatedSkillMdDefinition {
  optionalValue?: SkillMdDefinition;
}
export interface UpdatedSkillDefinition {
  optionalValue?: SkillDefinition;
}
export interface UpdatedAgentSkillsDescriptorFields {
  skillMd?: UpdatedSkillMdDefinition;
  skillDefinition?: UpdatedSkillDefinition;
}
export interface UpdatedAgentSkillsDescriptor {
  optionalValue?: UpdatedAgentSkillsDescriptorFields;
}
export interface UpdatedDescriptorsUnion {
  mcp?: UpdatedMcpDescriptor;
  a2a?: UpdatedA2aDescriptor;
  custom?: UpdatedCustomDescriptor;
  agentSkills?: UpdatedAgentSkillsDescriptor;
}
export interface UpdatedDescriptors {
  optionalValue?: UpdatedDescriptorsUnion;
}
export interface UpdatedSynchronizationType {
  optionalValue?: SynchronizationType;
}
export interface UpdatedSynchronizationConfiguration {
  optionalValue?: SynchronizationConfiguration;
}
export interface UpdateRegistryRecordRequest {
  registryId: string;
  recordId: string;
  name?: string;
  description?: UpdatedDescription;
  descriptorType?: DescriptorType;
  descriptors?: UpdatedDescriptors;
  recordVersion?: string;
  synchronizationType?: UpdatedSynchronizationType;
  synchronizationConfiguration?: UpdatedSynchronizationConfiguration;
  triggerSynchronization?: boolean;
}
export interface UpdateRegistryRecordResponse {
  registryArn: string;
  recordArn: string;
  recordId: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  descriptorType: DescriptorType;
  descriptors: Descriptors;
  recordVersion?: string;
  status: RegistryRecordStatus;
  createdAt: Date;
  updatedAt: Date;
  statusReason?: string;
  synchronizationType?: SynchronizationType;
  synchronizationConfiguration?: SynchronizationConfiguration;
}
export interface UpdateRegistryRecordStatusRequest {
  registryId: string;
  recordId: string;
  status: RegistryRecordStatus;
  statusReason: string;
}
export interface UpdateRegistryRecordStatusResponse {
  registryArn: string;
  recordArn: string;
  recordId: string;
  status: RegistryRecordStatus;
  statusReason: string;
  updatedAt: Date;
}
export interface UpdateWorkloadIdentityRequest {
  name: string;
  allowedResourceOauth2ReturnUrls?: string[];
}
export interface UpdateWorkloadIdentityResponse {
  name: string;
  workloadIdentityArn: string;
  allowedResourceOauth2ReturnUrls?: string[];
  createdTime: Date;
  lastUpdatedTime: Date;
}
export type NonBlankString = string;
export type ValidationExceptionReason =
  | "CannotParse"
  | "FieldValidationFailed"
  | "IdempotentParameterMismatchException"
  | "EventInOtherSession"
  | "ResourceConflict"
  | (string & {});
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type AddDatasetExamplesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds examples to the dataset's DRAFT. All examples are validated against the dataset's schema type before any writes occur. If any example fails validation, the entire batch is rejected (all-or-nothing semantics).
 */
export const addDatasetExamples: API.OperationMethod<
  AddDatasetExamplesRequest,
  AddDatasetExamplesResponse,
  AddDatasetExamplesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /datasets/{datasetId}/examples/add",
    input: {
      datasetId: 0,
      clientToken: D.m({ idempotency: true }),
      source: i_DataSourceType,
    },
    output: { updatedAt: D.ts },
    body: true,
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
  operationName: "AddDatasetExamples",
})) as any;

export type BatchPutGatewayRateLimitsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Atomically creates or updates multiple rate limits for a gateway. The operation updates existing limits with matching keys and creates new limits for new keys. If the operation fails, the service applies no changes. Retry the request after resolving the issue.
 */
export const batchPutGatewayRateLimits: API.OperationMethod<
  BatchPutGatewayRateLimitsRequest,
  BatchPutGatewayRateLimitsResponse,
  BatchPutGatewayRateLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /gateways/{gatewayIdentifier}/rate-limits/batch",
    input: {
      gatewayIdentifier: 0,
      clientToken: D.m({ idempotency: true }),
      rateLimits: D.list({
        rateLimitId: 0,
        description: 0,
        dimensionKeys: 0,
        entries: D.list(i_LimitEntry),
      }),
    },
    output: { rateLimits: D.list(o_GatewayRateLimitDetail) },
    body: true,
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
  operationName: "BatchPutGatewayRateLimits",
})) as any;

export type CreateAgentRuntimeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Bedrock AgentCore Runtime.
 */
export const createAgentRuntime: API.OperationMethod<
  CreateAgentRuntimeRequest,
  CreateAgentRuntimeResponse,
  CreateAgentRuntimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /runtimes/",
    input: {
      agentRuntimeName: 0,
      agentRuntimeArtifact: i_AgentRuntimeArtifact,
      roleArn: 0,
      networkConfiguration: i_NetworkConfiguration,
      clientToken: D.m({ idempotency: true }),
      description: 0,
      authorizerConfiguration: i_AuthorizerConfiguration,
      requestHeaderConfiguration: i_RequestHeaderConfiguration,
      protocolConfiguration: i_ProtocolConfiguration,
      lifecycleConfiguration: i_LifecycleConfiguration,
      environmentVariables: 0,
      filesystemConfigurations: D.list(i_FilesystemConfiguration),
      capacityProviderConfiguration: i_CapacityProviderConfiguration,
      tags: 0,
    },
    output: { createdAt: D.ts },
    body: true,
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
  operationName: "CreateAgentRuntime",
})) as any;

export type CreateAgentRuntimeEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an AgentCore Runtime endpoint.
 */
export const createAgentRuntimeEndpoint: API.OperationMethod<
  CreateAgentRuntimeEndpointRequest,
  CreateAgentRuntimeEndpointResponse,
  CreateAgentRuntimeEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /runtimes/{agentRuntimeId}/runtime-endpoints/",
    input: {
      agentRuntimeId: 0,
      name: 0,
      agentRuntimeVersion: 0,
      description: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: { endpointName: D.secret, createdAt: D.ts },
    body: true,
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
  operationName: "CreateAgentRuntimeEndpoint",
})) as any;

export type CreateApiKeyCredentialProviderError =
  | AccessDeniedException
  | ConflictException
  | DecryptionFailure
  | EncryptionFailure
  | InternalServerException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new API key credential provider.
 */
export const createApiKeyCredentialProvider: API.OperationMethod<
  CreateApiKeyCredentialProviderRequest,
  CreateApiKeyCredentialProviderResponse,
  CreateApiKeyCredentialProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/CreateApiKeyCredentialProvider",
    input: {
      name: 0,
      apiKey: 0,
      apiKeySecretConfig: i_SecretReference,
      apiKeySecretSource: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DecryptionFailure,
    EncryptionFailure,
    InternalServerException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApiKeyCredentialProvider",
})) as any;

export type CreateBrowserError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a custom browser.
 */
export const createBrowser: API.OperationMethod<
  CreateBrowserRequest,
  CreateBrowserResponse,
  CreateBrowserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /browsers",
    input: {
      name: 0,
      description: 0,
      executionRoleArn: 0,
      networkConfiguration: { networkMode: 0, vpcConfig: i_VpcConfig },
      recording: { enabled: 0, s3Location: i_S3Location },
      browserSigning: { enabled: 0 },
      enterprisePolicies: D.list({ location: { s3: i_S3Location }, type: 0 }),
      certificates: D.list(i_Certificate),
      filesystemConfigurations: D.list(i_ToolsFileSystemConfiguration),
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: { createdAt: D.ts },
    body: true,
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
  operationName: "CreateBrowser",
})) as any;

export type CreateBrowserProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a browser profile in Amazon Bedrock AgentCore. A browser profile stores persistent browser data such as cookies, local storage, session storage, and browsing history that can be saved from browser sessions and reused in subsequent sessions.
 */
export const createBrowserProfile: API.OperationMethod<
  CreateBrowserProfileRequest,
  CreateBrowserProfileResponse,
  CreateBrowserProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /browser-profiles",
    input: {
      name: 0,
      description: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: { createdAt: D.ts },
    body: true,
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
  operationName: "CreateBrowserProfile",
})) as any;

export type CreateCapacityProviderError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | RetryableConflictException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a capacity provider. A capacity provider defines the Amazon EC2 infrastructure for AgentCore Runtime, including the operating system, allowed instance types, networking, and storage. It also specifies the IAM permissions that AgentCore uses to manage those instances.
 *
 * The capacity provider name must be unique within your account. After you create the capacity provider, it enters a `CREATING` state and transitions to `READY` when it is available for use.
 */
export const createCapacityProvider: API.OperationMethod<
  CreateCapacityProviderInput,
  CreateCapacityProviderOutput,
  CreateCapacityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /capacity-providers",
    input: {
      name: 0,
      description: 0,
      permissionsConfiguration: { capacityProviderOperatorRoleArn: 0 },
      clientToken: D.m({ idempotency: true }),
      tags: 0,
      computeConfiguration: {
        ec2Configuration: {
          launchTemplateSource: {
            launchParameters: {
              operatingSystem: 0,
              instanceRequirements: { allowedInstanceTypes: 0 },
              ephemeralVolumes: D.list({
                deviceName: 0,
                virtualName: 0,
                ebs: {
                  volumeType: 0,
                  iops: 0,
                  throughput: 0,
                  encrypted: 0,
                  kmsKeyId: 0,
                  snapshotId: 0,
                  volumeSize: 0,
                  volumeInitializationRate: 0,
                  ebsCardIndex: 0,
                },
              }),
              monitoring: 0,
              licenseSpecifications: D.list({ licenseConfigurationArn: 0 }),
              capacityReservationSpecification: {
                capacityReservationPreference: 0,
                capacityReservationTarget: {
                  capacityReservationId: 0,
                  capacityReservationResourceGroupArn: 0,
                },
              },
              sshKeyName: 0,
              instanceProfileArn: 0,
              propagatedTags: 0,
            },
          },
          vpcConfiguration: { subnets: 0, securityGroups: 0 },
          volumes: D.list({
            ebsConfiguration: {
              name: 0,
              sizeGiB: 0,
              volumeType: 0,
              iops: 0,
              throughput: 0,
              encrypted: 0,
              kmsKeyId: 0,
              snapshotId: 0,
            },
          }),
          lifecycleConfiguration: { idleInstanceTimeout: 0, maxLifetime: 0 },
          rootVolume: {
            volumeType: 0,
            iops: 0,
            throughput: 0,
            encrypted: 0,
            kmsKeyId: 0,
            freeSpaceGiB: 0,
          },
        },
      },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    RetryableConflictException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCapacityProvider",
})) as any;

export type CreateCodeInterpreterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a custom code interpreter.
 */
export const createCodeInterpreter: API.OperationMethod<
  CreateCodeInterpreterRequest,
  CreateCodeInterpreterResponse,
  CreateCodeInterpreterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /code-interpreters",
    input: {
      name: 0,
      description: 0,
      executionRoleArn: 0,
      networkConfiguration: { networkMode: 0, vpcConfig: i_VpcConfig },
      certificates: D.list(i_Certificate),
      filesystemConfigurations: D.list(i_ToolsFileSystemConfiguration),
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: { createdAt: D.ts },
    body: true,
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
  operationName: "CreateCodeInterpreter",
})) as any;

export type CreateConfigurationBundleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new configuration bundle resource. A configuration bundle stores versioned component configurations for agent evaluation workflows.
 */
export const createConfigurationBundle: API.OperationMethod<
  CreateConfigurationBundleRequest,
  CreateConfigurationBundleResponse,
  CreateConfigurationBundleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /configuration-bundles/create",
    input: {
      clientToken: D.m({ idempotency: true }),
      bundleName: 0,
      description: 0,
      components: D.map(i_ComponentConfiguration),
      branchName: 0,
      commitMessage: 0,
      createdBy: i_VersionCreatedBySource,
      kmsKeyArn: 0,
      tags: 0,
    },
    output: { createdAt: D.ts },
    body: true,
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
  operationName: "CreateConfigurationBundle",
})) as any;

export type CreateDatasetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new dataset resource asynchronously. Returns immediately with status CREATING. Poll `GetDataset` until status transitions to ACTIVE or CREATE_FAILED.
 */
export const createDataset: API.OperationMethod<
  CreateDatasetRequest,
  CreateDatasetResponse,
  CreateDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /datasets",
    input: {
      clientToken: D.m({ idempotency: true }),
      datasetName: 0,
      description: 0,
      source: i_DataSourceType,
      schemaType: 0,
      kmsKeyArn: 0,
      tags: 0,
    },
    output: { createdAt: D.ts },
    body: true,
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
  operationName: "CreateDataset",
})) as any;

export type CreateDatasetVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Publishes the current DRAFT as a new numbered version. The DRAFT is preserved and remains editable after publishing. Returns immediately with status UPDATING. Poll `GetDataset` until status transitions to ACTIVE or UPDATE_FAILED.
 */
export const createDatasetVersion: API.OperationMethod<
  CreateDatasetVersionRequest,
  CreateDatasetVersionResponse,
  CreateDatasetVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /datasets/{datasetId}/versions",
    input: { datasetId: 0, clientToken: D.m({ idempotency: true }) },
    output: { createdAt: D.ts },
    body: true,
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
  operationName: "CreateDatasetVersion",
})) as any;

export type CreateEvaluatorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a custom evaluator for agent quality assessment. Custom evaluators can use either LLM-as-a-Judge configurations with user-defined prompts, rating scales, and model settings, or code-based configurations with customer-managed Lambda functions to evaluate agent performance at tool call, trace, or session levels.
 */
export const createEvaluator: API.OperationMethod<
  CreateEvaluatorRequest,
  CreateEvaluatorResponse,
  CreateEvaluatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /evaluators/create",
    input: {
      clientToken: D.m({ idempotency: true }),
      evaluatorName: 0,
      description: 0,
      evaluatorConfig: i_EvaluatorConfig,
      level: 0,
      kmsKeyArn: 0,
      tags: 0,
    },
    output: { createdAt: D.ts },
    body: true,
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
  operationName: "CreateEvaluator",
})) as any;

export type CreateGatewayError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a gateway for Amazon Bedrock Agent. A gateway serves as an integration point between your agent and external services.
 *
 * If you specify `CUSTOM_JWT` as the `authorizerType`, you must provide an `authorizerConfiguration`.
 */
export const createGateway: API.OperationMethod<
  CreateGatewayRequest,
  CreateGatewayResponse,
  CreateGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /gateways/",
    input: {
      name: 0,
      description: 0,
      clientToken: D.m({ idempotency: true }),
      roleArn: 0,
      protocolType: 0,
      protocolConfiguration: i_GatewayProtocolConfiguration,
      authorizerType: 0,
      authorizerConfiguration: i_AuthorizerConfiguration,
      kmsKeyArn: 0,
      interceptorConfigurations: D.list(i_GatewayInterceptorConfiguration),
      policyEngineConfiguration: i_GatewayPolicyEngineConfiguration,
      exceptionLevel: 0,
      tags: 0,
    },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      description: D.secret,
      protocolConfiguration: o_GatewayProtocolConfiguration,
    },
    body: true,
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
  operationName: "CreateGateway",
})) as any;

export type CreateGatewayRateLimitError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a rate limit for a gateway. Rate limits define throttling rules for each dimension that control request rates, token consumption rates, and concurrent connections through the gateway.
 */
export const createGatewayRateLimit: API.OperationMethod<
  CreateGatewayRateLimitRequest,
  CreateGatewayRateLimitResponse,
  CreateGatewayRateLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /gateways/{gatewayIdentifier}/rate-limits",
    input: {
      gatewayIdentifier: 0,
      clientToken: D.m({ idempotency: true }),
      rateLimitId: 0,
      description: 0,
      dimensionKeys: 0,
      entries: D.list(i_LimitEntry),
    },
    output: { createdAt: D.ts, updatedAt: D.ts },
    body: true,
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
  operationName: "CreateGatewayRateLimit",
})) as any;

export type CreateGatewayRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a rule for a gateway. Rules define conditions and actions that control how requests are routed and processed through the gateway, including principal-based access control and path-based routing.
 */
export const createGatewayRule: API.OperationMethod<
  CreateGatewayRuleRequest,
  CreateGatewayRuleResponse,
  CreateGatewayRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /gateways/{gatewayIdentifier}/rules",
    input: {
      gatewayIdentifier: 0,
      clientToken: D.m({ idempotency: true }),
      priority: 0,
      conditions: D.list(i_Condition),
      actions: D.list(i_Action),
      description: 0,
    },
    output: { actions: D.list(o_Action), createdAt: D.ts },
    body: true,
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
  operationName: "CreateGatewayRule",
})) as any;

export type CreateGatewayTargetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a target for a gateway. A target defines an endpoint that the gateway can connect to.
 */
export const createGatewayTarget: API.OperationMethod<
  CreateGatewayTargetRequest,
  CreateGatewayTargetResponse,
  CreateGatewayTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /gateways/{gatewayIdentifier}/targets/",
    input: {
      gatewayIdentifier: 0,
      name: 0,
      description: 0,
      clientToken: D.m({ idempotency: true }),
      targetConfiguration: i_TargetConfiguration,
      credentialProviderConfigurations: D.list(
        i_CredentialProviderConfiguration,
      ),
      metadataConfiguration: i_MetadataConfiguration,
      privateEndpoint: i_PrivateEndpoint,
    },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      name: D.secret,
      description: D.secret,
      targetConfiguration: o_TargetConfiguration,
      credentialProviderConfigurations: D.list(
        o_CredentialProviderConfiguration,
      ),
      lastSynchronizedAt: D.ts,
    },
    body: true,
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
  operationName: "CreateGatewayTarget",
})) as any;

export type CreateHarnessError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Operation to create a harness.
 */
export const createHarness: API.OperationMethod<
  CreateHarnessRequest,
  CreateHarnessResponse,
  CreateHarnessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /harnesses",
    input: {
      harnessName: 0,
      clientToken: D.m({ idempotency: true }),
      executionRoleArn: 0,
      environment: i_HarnessEnvironmentProviderRequest,
      environmentArtifact: i_HarnessEnvironmentArtifact,
      environmentVariables: 0,
      authorizerConfiguration: i_AuthorizerConfiguration,
      model: i_HarnessModelConfiguration,
      systemPrompt: D.list(i_HarnessSystemContentBlock),
      tools: D.list(i_HarnessTool),
      skills: D.list(i_HarnessSkill),
      allowedTools: 0,
      memory: i_HarnessMemoryConfiguration,
      truncation: i_HarnessTruncationConfiguration,
      maxIterations: 0,
      maxTokens: 0,
      timeoutSeconds: 0,
      tags: 0,
    },
    output: { harness: o_Harness },
    body: true,
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
  operationName: "CreateHarness",
})) as any;

export type CreateHarnessEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Operation to create a harness endpoint.
 */
export const createHarnessEndpoint: API.OperationMethod<
  CreateHarnessEndpointRequest,
  CreateHarnessEndpointResponse,
  CreateHarnessEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /harnesses/{harnessId}/endpoints",
    input: {
      harnessId: 0,
      endpointName: 0,
      targetVersion: 0,
      description: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: { endpoint: o_HarnessEndpoint },
    body: true,
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
  operationName: "CreateHarnessEndpoint",
})) as any;

export type CreateMemoryError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Amazon Bedrock AgentCore Memory resource.
 */
export const createMemory: API.OperationMethod<
  CreateMemoryInput,
  CreateMemoryOutput,
  CreateMemoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /memories/create",
    input: {
      clientToken: D.m({ idempotency: true }),
      name: 0,
      description: 0,
      encryptionKeyArn: 0,
      memoryExecutionRoleArn: 0,
      eventExpiryDuration: 0,
      memoryStrategies: D.list(i_MemoryStrategyInput),
      indexedKeys: D.list(i_IndexedKey),
      namespaceKeys: D.list(i_NamespaceKeyEntry),
      streamDeliveryResources: i_StreamDeliveryResources,
      tags: 0,
    },
    output: { memory: o_Memory },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMemory",
})) as any;

export type CreateOauth2CredentialProviderError =
  | AccessDeniedException
  | ConflictException
  | DecryptionFailure
  | EncryptionFailure
  | InternalServerException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new OAuth2 credential provider.
 */
export const createOauth2CredentialProvider: API.OperationMethod<
  CreateOauth2CredentialProviderRequest,
  CreateOauth2CredentialProviderResponse,
  CreateOauth2CredentialProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/CreateOauth2CredentialProvider",
    input: {
      name: 0,
      credentialProviderVendor: 0,
      oauth2ProviderConfigInput: i_Oauth2ProviderConfigInput,
      tags: 0,
    },
    output: { oauth2ProviderConfigOutput: o_Oauth2ProviderConfigOutput },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DecryptionFailure,
    EncryptionFailure,
    InternalServerException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOauth2CredentialProvider",
})) as any;

export type CreateOnlineEvaluationConfigError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an online evaluation configuration for continuous monitoring of agent performance. Online evaluation automatically samples live traffic from CloudWatch logs at specified rates and applies evaluators to assess agent quality in production.
 */
export const createOnlineEvaluationConfig: API.OperationMethod<
  CreateOnlineEvaluationConfigRequest,
  CreateOnlineEvaluationConfigResponse,
  CreateOnlineEvaluationConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /online-evaluation-configs/create",
    input: {
      clientToken: D.m({ idempotency: true }),
      onlineEvaluationConfigName: 0,
      description: 0,
      rule: i_Rule,
      dataSourceConfig: i_DataSourceConfig,
      evaluators: D.list(i_EvaluatorReference),
      insights: D.list(i_Insight),
      clusteringConfig: i_ClusteringConfig,
      evaluationExecutionRoleArn: 0,
      enableOnCreate: 0,
      tags: 0,
    },
    output: { createdAt: D.ts },
    body: true,
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
  operationName: "CreateOnlineEvaluationConfig",
})) as any;

export type CreatePaymentConnectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | SubscriptionRequiredException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new payment connector for a payment manager. A payment connector integrates with a supported payment provider to enable payment processing capabilities.
 */
export const createPaymentConnector: API.OperationMethod<
  CreatePaymentConnectorRequest,
  CreatePaymentConnectorResponse,
  CreatePaymentConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /payments/managers/{paymentManagerId}/connectors",
    input: {
      paymentManagerId: 0,
      name: 0,
      description: 0,
      type: 0,
      credentialProviderConfigurations: D.list(
        i_CredentialsProviderConfiguration,
      ),
      provisionMode: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { createdAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    SubscriptionRequiredException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePaymentConnector",
})) as any;

export type CreatePaymentCredentialProviderError =
  | AccessDeniedException
  | ConflictException
  | DecryptionFailure
  | EncryptionFailure
  | InternalServerException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new payment credential provider for storing authentication credentials used by payment connectors to communicate with external payment providers.
 */
export const createPaymentCredentialProvider: API.OperationMethod<
  CreatePaymentCredentialProviderRequest,
  CreatePaymentCredentialProviderResponse,
  CreatePaymentCredentialProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/CreatePaymentCredentialProvider",
    input: {
      name: 0,
      credentialProviderVendor: 0,
      providerConfigurationInput: i_PaymentProviderConfigurationInput,
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DecryptionFailure,
    EncryptionFailure,
    InternalServerException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePaymentCredentialProvider",
})) as any;

export type CreatePaymentManagerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new payment manager in your Amazon Web Services account. A payment manager serves as the top-level resource for managing payment processing capabilities, including payment connectors that integrate with supported payment providers.
 *
 * If you specify `CUSTOM_JWT` as the `authorizerType`, you must provide an `authorizerConfiguration`.
 */
export const createPaymentManager: API.OperationMethod<
  CreatePaymentManagerRequest,
  CreatePaymentManagerResponse,
  CreatePaymentManagerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /payments/managers",
    input: {
      name: 0,
      description: 0,
      authorizerType: 0,
      authorizerConfiguration: i_AuthorizerConfiguration,
      roleArn: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
      kmsKeyArn: 0,
    },
    output: { createdAt: D.ts },
    body: true,
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
  operationName: "CreatePaymentManager",
})) as any;

export type CreatePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a policy within the AgentCore Policy system. Policies provide real-time, deterministic control over agentic interactions with AgentCore Gateway. Using the Cedar policy language, you can define fine-grained policies that specify which interactions with Gateway tools are permitted based on input parameters and OAuth claims, ensuring agents operate within defined boundaries and business rules. The policy is validated during creation against the Cedar schema generated from the Gateway's tools' input schemas, which defines the available tools, their parameters, and expected data types. This is an asynchronous operation. Use the GetPolicy operation to poll the `status` field to track completion.
 *
 * If the new policy is a temporal policy, creating it invalidates the policy engine's active temporal sessions. For more information about temporal policy sessions, see session-based temporal policies. The policy engine returns an HTTP 409 `ConflictException` to in-flight sessions. To resume, you must start a new session with a new session ID.
 */
export const createPolicy: API.OperationMethod<
  CreatePolicyRequest,
  CreatePolicyResponse,
  CreatePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /policy-engines/{policyEngineId}/policies",
    input: {
      name: 0,
      definition: i_PolicyDefinition,
      description: 0,
      validationMode: 0,
      enforcementMode: 0,
      policyEngineId: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { createdAt: D.ts, updatedAt: D.ts, description: D.secret },
    body: true,
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
  operationName: "CreatePolicy",
})) as any;

export type CreatePolicyEngineError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new policy engine within the AgentCore Policy system. A policy engine is a collection of policies that evaluates and authorizes agent tool calls. When associated with Gateways (each Gateway can be associated with at most one policy engine, but multiple Gateways can be associated with the same engine), the policy engine intercepts all agent requests and determines whether to allow or deny each action based on the defined policies. This is an asynchronous operation. Use the GetPolicyEngine operation to poll the `status` field to track completion.
 */
export const createPolicyEngine: API.OperationMethod<
  CreatePolicyEngineRequest,
  CreatePolicyEngineResponse,
  CreatePolicyEngineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /policy-engines",
    input: {
      name: 0,
      description: 0,
      clientToken: D.m({ idempotency: true }),
      encryptionKeyArn: 0,
      tags: 0,
    },
    output: { createdAt: D.ts, updatedAt: D.ts, description: D.secret },
    body: true,
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
  operationName: "CreatePolicyEngine",
})) as any;

export type CreateRegistryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new registry in your Amazon Web Services account. A registry serves as a centralized catalog for organizing and managing registry records, including MCP servers, A2A agents, agent skills, and custom resource types.
 *
 * If you specify `CUSTOM_JWT` as the `authorizerType`, you must provide an `authorizerConfiguration`.
 */
export const createRegistry: API.OperationMethod<
  CreateRegistryRequest,
  CreateRegistryResponse,
  CreateRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /registries",
    input: {
      name: 0,
      description: 0,
      authorizerType: 0,
      authorizerConfiguration: i_AuthorizerConfiguration,
      clientToken: D.m({ idempotency: true }),
      approvalConfiguration: i_ApprovalConfiguration,
    },
    body: true,
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
  operationName: "CreateRegistry",
})) as any;

export type CreateRegistryRecordError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new registry record within the specified registry. A registry record represents an individual AI resource's metadata in the registry. This could be an MCP server (and associated tools), A2A agent, agent skill, or a custom resource with a custom schema.
 *
 * The record is processed asynchronously and returns HTTP 202 Accepted.
 */
export const createRegistryRecord: API.OperationMethod<
  CreateRegistryRecordRequest,
  CreateRegistryRecordResponse,
  CreateRegistryRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /registries/{registryId}/records",
    input: {
      registryId: 0,
      name: 0,
      description: 0,
      descriptorType: 0,
      descriptors: {
        mcp: { server: i_ServerDefinition, tools: i_ToolsDefinition },
        a2a: i_A2aDescriptor,
        custom: i_CustomDescriptor,
        agentSkills: {
          skillMd: i_SkillMdDefinition,
          skillDefinition: i_SkillDefinition,
        },
      },
      recordVersion: 0,
      synchronizationType: 0,
      synchronizationConfiguration: i_SynchronizationConfiguration,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
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
  operationName: "CreateRegistryRecord",
})) as any;

export type CreateWorkloadIdentityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new workload identity.
 */
export const createWorkloadIdentity: API.OperationMethod<
  CreateWorkloadIdentityRequest,
  CreateWorkloadIdentityResponse,
  CreateWorkloadIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/CreateWorkloadIdentity",
    input: { name: 0, allowedResourceOauth2ReturnUrls: 0, tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkloadIdentity",
})) as any;

export type DeleteAgentRuntimeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an Amazon Bedrock AgentCore Runtime, or a single version of an AgentCore Runtime when you provide the version qualifier.
 */
export const deleteAgentRuntime: API.OperationMethod<
  DeleteAgentRuntimeRequest,
  DeleteAgentRuntimeResponse,
  DeleteAgentRuntimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /runtimes/{agentRuntimeId}/",
    input: {
      agentRuntimeId: 0,
      agentRuntimeVersion: D.m({ query: "version" }),
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAgentRuntime",
})) as any;

export type DeleteAgentRuntimeEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an AgentCore Runtime endpoint.
 */
export const deleteAgentRuntimeEndpoint: API.OperationMethod<
  DeleteAgentRuntimeEndpointRequest,
  DeleteAgentRuntimeEndpointResponse,
  DeleteAgentRuntimeEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /runtimes/{agentRuntimeId}/runtime-endpoints/{endpointName}/",
    input: {
      agentRuntimeId: 0,
      endpointName: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
    output: { endpointName: D.secret },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAgentRuntimeEndpoint",
})) as any;

export type DeleteApiKeyCredentialProviderError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an API key credential provider.
 */
export const deleteApiKeyCredentialProvider: API.OperationMethod<
  DeleteApiKeyCredentialProviderRequest,
  DeleteApiKeyCredentialProviderResponse,
  DeleteApiKeyCredentialProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/DeleteApiKeyCredentialProvider",
    input: { name: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApiKeyCredentialProvider",
})) as any;

export type DeleteBrowserError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a custom browser.
 */
export const deleteBrowser: API.OperationMethod<
  DeleteBrowserRequest,
  DeleteBrowserResponse,
  DeleteBrowserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /browsers/{browserId}",
    input: {
      browserId: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
    output: { lastUpdatedAt: D.ts },
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
  operationName: "DeleteBrowser",
})) as any;

export type DeleteBrowserProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a browser profile.
 */
export const deleteBrowserProfile: API.OperationMethod<
  DeleteBrowserProfileRequest,
  DeleteBrowserProfileResponse,
  DeleteBrowserProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /browser-profiles/{profileId}",
    input: {
      profileId: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
    output: { lastUpdatedAt: D.ts, lastSavedAt: D.ts },
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
  operationName: "DeleteBrowserProfile",
})) as any;

export type DeleteCapacityProviderError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | RetryableConflictException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a capacity provider. Before you delete a capacity provider, disassociate all agent runtimes and runtime versions that reference it. If any references remain, the operation fails.
 */
export const deleteCapacityProvider: API.OperationMethod<
  DeleteCapacityProviderInput,
  DeleteCapacityProviderOutput,
  DeleteCapacityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /capacity-providers/{capacityProviderId}",
    input: {
      capacityProviderId: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    RetryableConflictException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCapacityProvider",
})) as any;

export type DeleteCodeInterpreterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a custom code interpreter.
 */
export const deleteCodeInterpreter: API.OperationMethod<
  DeleteCodeInterpreterRequest,
  DeleteCodeInterpreterResponse,
  DeleteCodeInterpreterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /code-interpreters/{codeInterpreterId}",
    input: {
      codeInterpreterId: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
    output: { lastUpdatedAt: D.ts },
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
  operationName: "DeleteCodeInterpreter",
})) as any;

export type DeleteConfigurationBundleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a configuration bundle and all of its versions.
 */
export const deleteConfigurationBundle: API.OperationMethod<
  DeleteConfigurationBundleRequest,
  DeleteConfigurationBundleResponse,
  DeleteConfigurationBundleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /configuration-bundles/{bundleId}",
    input: { bundleId: 0 },
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
  operationName: "DeleteConfigurationBundle",
})) as any;

export type DeleteDatasetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a dataset version or an entire dataset asynchronously. If `datasetVersion` is absent, deletes all versions and the dataset record itself. If provided, deletes only that specific version.
 */
export const deleteDataset: API.OperationMethod<
  DeleteDatasetRequest,
  DeleteDatasetResponse,
  DeleteDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /datasets/{datasetId}",
    input: { datasetId: 0, datasetVersion: D.m({ query: "datasetVersion" }) },
    output: { updatedAt: D.ts },
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
  operationName: "DeleteDataset",
})) as any;

export type DeleteDatasetExamplesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes specific examples by ID from DRAFT. All example IDs are validated before any deletes occur. If any ID does not exist in DRAFT, the entire batch is rejected (all-or-nothing semantics).
 */
export const deleteDatasetExamples: API.OperationMethod<
  DeleteDatasetExamplesRequest,
  DeleteDatasetExamplesResponse,
  DeleteDatasetExamplesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /datasets/{datasetId}/examples/delete",
    input: {
      datasetId: 0,
      clientToken: D.m({ idempotency: true }),
      exampleIds: 0,
    },
    output: { updatedAt: D.ts },
    body: true,
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
  operationName: "DeleteDatasetExamples",
})) as any;

export type DeleteEvaluatorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a custom evaluator. Builtin evaluators cannot be deleted. The evaluator must not be referenced by any active online evaluation configurations.
 */
export const deleteEvaluator: API.OperationMethod<
  DeleteEvaluatorRequest,
  DeleteEvaluatorResponse,
  DeleteEvaluatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /evaluators/{evaluatorId}",
    input: { evaluatorId: 0 },
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
  operationName: "DeleteEvaluator",
})) as any;

export type DeleteGatewayError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a gateway.
 */
export const deleteGateway: API.OperationMethod<
  DeleteGatewayRequest,
  DeleteGatewayResponse,
  DeleteGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /gateways/{gatewayIdentifier}/",
    input: { gatewayIdentifier: 0 },
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
  operationName: "DeleteGateway",
})) as any;

export type DeleteGatewayRateLimitError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a gateway rate limit.
 */
export const deleteGatewayRateLimit: API.OperationMethod<
  DeleteGatewayRateLimitRequest,
  DeleteGatewayRateLimitResponse,
  DeleteGatewayRateLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /gateways/{gatewayIdentifier}/rate-limits/{rateLimitId}",
    input: { gatewayIdentifier: 0, rateLimitId: 0 },
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
  operationName: "DeleteGatewayRateLimit",
})) as any;

export type DeleteGatewayRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a gateway rule.
 */
export const deleteGatewayRule: API.OperationMethod<
  DeleteGatewayRuleRequest,
  DeleteGatewayRuleResponse,
  DeleteGatewayRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /gateways/{gatewayIdentifier}/rules/{ruleId}",
    input: { gatewayIdentifier: 0, ruleId: 0 },
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
  operationName: "DeleteGatewayRule",
})) as any;

export type DeleteGatewayTargetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a gateway target.
 *
 * You cannot delete a target that is in a pending authorization state (`CREATE_PENDING_AUTH`, `UPDATE_PENDING_AUTH`, or `SYNCHRONIZE_PENDING_AUTH`). Wait for the authorization to complete or fail before deleting the target.
 */
export const deleteGatewayTarget: API.OperationMethod<
  DeleteGatewayTargetRequest,
  DeleteGatewayTargetResponse,
  DeleteGatewayTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /gateways/{gatewayIdentifier}/targets/{targetId}/",
    input: { gatewayIdentifier: 0, targetId: 0 },
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
  operationName: "DeleteGatewayTarget",
})) as any;

export type DeleteHarnessError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Operation to delete a Harness.
 */
export const deleteHarness: API.OperationMethod<
  DeleteHarnessRequest,
  DeleteHarnessResponse,
  DeleteHarnessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /harnesses/{harnessId}",
    input: {
      harnessId: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
      deleteManagedMemory: D.m({ query: "deleteManagedMemory" }),
    },
    output: { harness: o_Harness },
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
  operationName: "DeleteHarness",
})) as any;

export type DeleteHarnessEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Operation to delete a harness endpoint.
 */
export const deleteHarnessEndpoint: API.OperationMethod<
  DeleteHarnessEndpointRequest,
  DeleteHarnessEndpointResponse,
  DeleteHarnessEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /harnesses/{harnessId}/endpoints/{endpointName}",
    input: {
      harnessId: 0,
      endpointName: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
    output: { endpoint: o_HarnessEndpoint },
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
  operationName: "DeleteHarnessEndpoint",
})) as any;

export type DeleteMemoryError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Bedrock AgentCore Memory resource. When you delete a memory resource, it is permanently removed.
 */
export const deleteMemory: API.OperationMethod<
  DeleteMemoryInput,
  DeleteMemoryOutput,
  DeleteMemoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /memories/{memoryId}/delete",
    input: {
      clientToken: D.m({ query: "clientToken", idempotency: true }),
      memoryId: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMemory",
})) as any;

export type DeleteOauth2CredentialProviderError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an OAuth2 credential provider.
 */
export const deleteOauth2CredentialProvider: API.OperationMethod<
  DeleteOauth2CredentialProviderRequest,
  DeleteOauth2CredentialProviderResponse,
  DeleteOauth2CredentialProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/DeleteOauth2CredentialProvider",
    input: { name: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOauth2CredentialProvider",
})) as any;

export type DeleteOnlineEvaluationConfigError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an online evaluation configuration and stops any ongoing evaluation processes associated with it.
 */
export const deleteOnlineEvaluationConfig: API.OperationMethod<
  DeleteOnlineEvaluationConfigRequest,
  DeleteOnlineEvaluationConfigResponse,
  DeleteOnlineEvaluationConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /online-evaluation-configs/{onlineEvaluationConfigId}",
    input: { onlineEvaluationConfigId: 0 },
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
  operationName: "DeleteOnlineEvaluationConfig",
})) as any;

export type DeletePaymentConnectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a payment connector.
 */
export const deletePaymentConnector: API.OperationMethod<
  DeletePaymentConnectorRequest,
  DeletePaymentConnectorResponse,
  DeletePaymentConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /payments/managers/{paymentManagerId}/connectors/{paymentConnectorId}",
    input: {
      paymentManagerId: 0,
      paymentConnectorId: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePaymentConnector",
})) as any;

export type DeletePaymentCredentialProviderError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a payment credential provider and its associated stored credentials.
 */
export const deletePaymentCredentialProvider: API.OperationMethod<
  DeletePaymentCredentialProviderRequest,
  DeletePaymentCredentialProviderResponse,
  DeletePaymentCredentialProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/DeletePaymentCredentialProvider",
    input: { name: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePaymentCredentialProvider",
})) as any;

export type DeletePaymentManagerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a payment manager. All payment connectors associated with the payment manager must be deleted before the payment manager can be deleted. This operation initiates the deletion process asynchronously.
 */
export const deletePaymentManager: API.OperationMethod<
  DeletePaymentManagerRequest,
  DeletePaymentManagerResponse,
  DeletePaymentManagerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /payments/managers/{paymentManagerId}",
    input: {
      paymentManagerId: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePaymentManager",
})) as any;

export type DeletePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing policy from the AgentCore Policy system. Once deleted, the policy can no longer be used for agent behavior control and all references to it become invalid. This is an asynchronous operation. Use the `GetPolicy` operation to poll the `status` field to track completion.
 */
export const deletePolicy: API.OperationMethod<
  DeletePolicyRequest,
  DeletePolicyResponse,
  DeletePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /policy-engines/{policyEngineId}/policies/{policyId}",
    input: { policyEngineId: 0, policyId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts, description: D.secret },
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
  operationName: "DeletePolicy",
})) as any;

export type DeletePolicyEngineError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing policy engine from the AgentCore Policy system. The policy engine must not have any associated policies before deletion. Once deleted, the policy engine and all its configurations become unavailable for policy management and evaluation. This is an asynchronous operation. Use the `GetPolicyEngine` operation to poll the `status` field to track completion.
 */
export const deletePolicyEngine: API.OperationMethod<
  DeletePolicyEngineRequest,
  DeletePolicyEngineResponse,
  DeletePolicyEngineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /policy-engines/{policyEngineId}",
    input: { policyEngineId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts, description: D.secret },
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
  operationName: "DeletePolicyEngine",
})) as any;

export type DeleteRegistryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a registry. The registry must contain zero records before it can be deleted. This operation initiates the deletion process asynchronously.
 */
export const deleteRegistry: API.OperationMethod<
  DeleteRegistryRequest,
  DeleteRegistryResponse,
  DeleteRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /registries/{registryId}",
    input: { registryId: 0 },
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
  operationName: "DeleteRegistry",
})) as any;

export type DeleteRegistryRecordError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a registry record. The record's status transitions to `DELETING` and the record is removed asynchronously.
 */
export const deleteRegistryRecord: API.OperationMethod<
  DeleteRegistryRecordRequest,
  DeleteRegistryRecordResponse,
  DeleteRegistryRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /registries/{registryId}/records/{recordId}",
    input: { registryId: 0, recordId: 0 },
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
  operationName: "DeleteRegistryRecord",
})) as any;

export type DeleteResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the resource-based policy for a specified resource.
 *
 * This feature is currently available only for AgentCore Runtime and Gateway.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /resourcepolicy/{resourceArn}",
    input: { resourceArn: 0 },
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
  operationName: "DeleteResourcePolicy",
})) as any;

export type DeleteWorkloadIdentityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a workload identity.
 */
export const deleteWorkloadIdentity: API.OperationMethod<
  DeleteWorkloadIdentityRequest,
  DeleteWorkloadIdentityResponse,
  DeleteWorkloadIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/DeleteWorkloadIdentity",
    input: { name: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkloadIdentity",
})) as any;

export type GetAgentRuntimeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an Amazon Bedrock AgentCore Runtime.
 */
export const getAgentRuntime: API.OperationMethod<
  GetAgentRuntimeRequest,
  GetAgentRuntimeResponse,
  GetAgentRuntimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /runtimes/{agentRuntimeId}/",
    input: {
      agentRuntimeId: 0,
      agentRuntimeVersion: D.m({ query: "version" }),
    },
    output: { createdAt: D.ts, lastUpdatedAt: D.ts, description: D.secret },
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
  operationName: "GetAgentRuntime",
})) as any;

export type GetAgentRuntimeEndpointError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about an Amazon Secure AgentEndpoint.
 */
export const getAgentRuntimeEndpoint: API.OperationMethod<
  GetAgentRuntimeEndpointRequest,
  GetAgentRuntimeEndpointResponse,
  GetAgentRuntimeEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /runtimes/{agentRuntimeId}/runtime-endpoints/{endpointName}/",
    input: { agentRuntimeId: 0, endpointName: 0 },
    output: { createdAt: D.ts, lastUpdatedAt: D.ts, name: D.secret },
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
  operationName: "GetAgentRuntimeEndpoint",
})) as any;

export type GetApiKeyCredentialProviderError =
  | AccessDeniedException
  | DecryptionFailure
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an API key credential provider.
 */
export const getApiKeyCredentialProvider: API.OperationMethod<
  GetApiKeyCredentialProviderRequest,
  GetApiKeyCredentialProviderResponse,
  GetApiKeyCredentialProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/GetApiKeyCredentialProvider",
    input: { name: 0 },
    output: { createdTime: D.ts, lastUpdatedTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DecryptionFailure,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApiKeyCredentialProvider",
})) as any;

export type GetBrowserError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about a custom browser.
 */
export const getBrowser: API.OperationMethod<
  GetBrowserRequest,
  GetBrowserResponse,
  GetBrowserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /browsers/{browserId}",
    input: { browserId: 0 },
    output: { description: D.secret, createdAt: D.ts, lastUpdatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBrowser",
})) as any;

export type GetBrowserProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a browser profile.
 */
export const getBrowserProfile: API.OperationMethod<
  GetBrowserProfileRequest,
  GetBrowserProfileResponse,
  GetBrowserProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /browser-profiles/{profileId}",
    input: { profileId: 0 },
    output: {
      description: D.secret,
      createdAt: D.ts,
      lastUpdatedAt: D.ts,
      lastSavedAt: D.ts,
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
  operationName: "GetBrowserProfile",
})) as any;

export type GetCapacityProviderError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a capacity provider, including its status, permissions configuration, and compute configuration.
 */
export const getCapacityProvider: API.OperationMethod<
  GetCapacityProviderInput,
  GetCapacityProviderOutput,
  GetCapacityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /capacity-providers/{capacityProviderId}",
    input: { capacityProviderId: 0 },
    output: { description: D.secret, createdAt: D.ts, lastUpdatedAt: D.ts },
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
  operationName: "GetCapacityProvider",
})) as any;

export type GetCodeInterpreterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about a custom code interpreter.
 */
export const getCodeInterpreter: API.OperationMethod<
  GetCodeInterpreterRequest,
  GetCodeInterpreterResponse,
  GetCodeInterpreterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /code-interpreters/{codeInterpreterId}",
    input: { codeInterpreterId: 0 },
    output: { description: D.secret, createdAt: D.ts, lastUpdatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCodeInterpreter",
})) as any;

export type GetConfigurationBundleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the latest version of a configuration bundle. By default, returns the latest version on the mainline branch. Use `GetConfigurationBundleVersion` to retrieve a specific historical version.
 */
export const getConfigurationBundle: API.OperationMethod<
  GetConfigurationBundleRequest,
  GetConfigurationBundleResponse,
  GetConfigurationBundleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /configuration-bundles/{bundleId}",
    input: { bundleId: 0, branchName: D.m({ query: "branchName" }) },
    output: { description: D.secret, createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetConfigurationBundle",
})) as any;

export type GetConfigurationBundleVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a specific version of a configuration bundle by its version identifier.
 */
export const getConfigurationBundleVersion: API.OperationMethod<
  GetConfigurationBundleVersionRequest,
  GetConfigurationBundleVersionResponse,
  GetConfigurationBundleVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /configuration-bundles/{bundleId}/versions/{versionId}",
    input: { bundleId: 0, versionId: 0 },
    output: { description: D.secret, createdAt: D.ts, versionCreatedAt: D.ts },
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
  operationName: "GetConfigurationBundleVersion",
})) as any;

export type GetDatasetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves dataset metadata. Use the `datasetVersion` query parameter to retrieve a specific version's metadata. If absent, defaults to DRAFT. For paginated example content, use `ListDatasetExamples`.
 */
export const getDataset: API.OperationMethod<
  GetDatasetRequest,
  GetDatasetResponse,
  GetDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /datasets/{datasetId}",
    input: { datasetId: 0, datasetVersion: D.m({ query: "datasetVersion" }) },
    output: {
      downloadUrl: D.secret,
      downloadUrlExpiresAt: D.ts,
      createdAt: D.ts,
      updatedAt: D.ts,
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
  operationName: "GetDataset",
})) as any;

export type GetEvaluatorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about an evaluator, including its configuration, status, and metadata. Works with both built-in and custom evaluators.
 */
export const getEvaluator: API.OperationMethod<
  GetEvaluatorRequest,
  GetEvaluatorResponse,
  GetEvaluatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /evaluators/{evaluatorId}",
    input: { evaluatorId: 0, includedData: D.m({ query: "includedData" }) },
    output: {
      description: D.secret,
      evaluatorConfig: { llmAsAJudge: { instructions: D.secret } },
      createdAt: D.ts,
      updatedAt: D.ts,
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
  operationName: "GetEvaluator",
})) as any;

export type GetGatewayError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specific Gateway.
 */
export const getGateway: API.OperationMethod<
  GetGatewayRequest,
  GetGatewayResponse,
  GetGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /gateways/{gatewayIdentifier}/",
    input: { gatewayIdentifier: 0 },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      description: D.secret,
      protocolConfiguration: o_GatewayProtocolConfiguration,
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
  operationName: "GetGateway",
})) as any;

export type GetGatewayRateLimitError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a gateway rate limit.
 */
export const getGatewayRateLimit: API.OperationMethod<
  GetGatewayRateLimitRequest,
  GetGatewayRateLimitResponse,
  GetGatewayRateLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /gateways/{gatewayIdentifier}/rate-limits/{rateLimitId}",
    input: { gatewayIdentifier: 0, rateLimitId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetGatewayRateLimit",
})) as any;

export type GetGatewayRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific gateway rule.
 */
export const getGatewayRule: API.OperationMethod<
  GetGatewayRuleRequest,
  GetGatewayRuleResponse,
  GetGatewayRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /gateways/{gatewayIdentifier}/rules/{ruleId}",
    input: { gatewayIdentifier: 0, ruleId: 0 },
    output: { actions: D.list(o_Action), createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetGatewayRule",
})) as any;

export type GetGatewayTargetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specific gateway target.
 */
export const getGatewayTarget: API.OperationMethod<
  GetGatewayTargetRequest,
  GetGatewayTargetResponse,
  GetGatewayTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /gateways/{gatewayIdentifier}/targets/{targetId}/",
    input: { gatewayIdentifier: 0, targetId: 0 },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      name: D.secret,
      description: D.secret,
      targetConfiguration: o_TargetConfiguration,
      credentialProviderConfigurations: D.list(
        o_CredentialProviderConfiguration,
      ),
      lastSynchronizedAt: D.ts,
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
  operationName: "GetGatewayTarget",
})) as any;

export type GetHarnessError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Operation to get a single harness.
 */
export const getHarness: API.OperationMethod<
  GetHarnessRequest,
  GetHarnessResponse,
  GetHarnessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /harnesses/{harnessId}",
    input: { harnessId: 0, harnessVersion: D.m({ query: "harnessVersion" }) },
    output: { harness: o_Harness },
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
  operationName: "GetHarness",
})) as any;

export type GetHarnessEndpointError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Operation to get a single harness endpoint.
 */
export const getHarnessEndpoint: API.OperationMethod<
  GetHarnessEndpointRequest,
  GetHarnessEndpointResponse,
  GetHarnessEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /harnesses/{harnessId}/endpoints/{endpointName}",
    input: { harnessId: 0, endpointName: 0 },
    output: { endpoint: o_HarnessEndpoint },
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
  operationName: "GetHarnessEndpoint",
})) as any;

export type GetMemoryError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ServiceException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Retrieve an existing Amazon Bedrock AgentCore Memory resource.
 */
export const getMemory: API.OperationMethod<
  GetMemoryInput,
  GetMemoryOutput,
  GetMemoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /memories/{memoryId}/details",
    input: { memoryId: 0, view: D.m({ query: "view" }) },
    output: { memory: o_Memory },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ServiceException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMemory",
})) as any;

export type GetOauth2CredentialProviderError =
  | AccessDeniedException
  | DecryptionFailure
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an OAuth2 credential provider.
 */
export const getOauth2CredentialProvider: API.OperationMethod<
  GetOauth2CredentialProviderRequest,
  GetOauth2CredentialProviderResponse,
  GetOauth2CredentialProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/GetOauth2CredentialProvider",
    input: { name: 0 },
    output: {
      oauth2ProviderConfigOutput: o_Oauth2ProviderConfigOutput,
      createdTime: D.ts,
      lastUpdatedTime: D.ts,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DecryptionFailure,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOauth2CredentialProvider",
})) as any;

export type GetOnlineEvaluationConfigError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about an online evaluation configuration, including its rules, data sources, evaluators, and execution status.
 */
export const getOnlineEvaluationConfig: API.OperationMethod<
  GetOnlineEvaluationConfigRequest,
  GetOnlineEvaluationConfigResponse,
  GetOnlineEvaluationConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /online-evaluation-configs/{onlineEvaluationConfigId}",
    input: { onlineEvaluationConfigId: 0 },
    output: { description: D.secret, createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetOnlineEvaluationConfig",
})) as any;

export type GetPaymentConnectorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specific payment connector.
 */
export const getPaymentConnector: API.OperationMethod<
  GetPaymentConnectorRequest,
  GetPaymentConnectorResponse,
  GetPaymentConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /payments/managers/{paymentManagerId}/connectors/{paymentConnectorId}",
    input: { paymentManagerId: 0, paymentConnectorId: 0 },
    output: { createdAt: D.ts, lastUpdatedAt: D.ts },
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
  operationName: "GetPaymentConnector",
})) as any;

export type GetPaymentCredentialProviderError =
  | AccessDeniedException
  | DecryptionFailure
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specific payment credential provider.
 */
export const getPaymentCredentialProvider: API.OperationMethod<
  GetPaymentCredentialProviderRequest,
  GetPaymentCredentialProviderResponse,
  GetPaymentCredentialProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/GetPaymentCredentialProvider",
    input: { name: 0 },
    output: { createdTime: D.ts, lastUpdatedTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DecryptionFailure,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPaymentCredentialProvider",
})) as any;

export type GetPaymentManagerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specific payment manager.
 */
export const getPaymentManager: API.OperationMethod<
  GetPaymentManagerRequest,
  GetPaymentManagerResponse,
  GetPaymentManagerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /payments/managers/{paymentManagerId}",
    input: { paymentManagerId: 0 },
    output: { createdAt: D.ts, lastUpdatedAt: D.ts },
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
  operationName: "GetPaymentManager",
})) as any;

export type GetPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific policy within the AgentCore Policy system. This operation returns the complete policy definition, metadata, and current status, allowing administrators to review and manage policy configurations.
 */
export const getPolicy: API.OperationMethod<
  GetPolicyRequest,
  GetPolicyResponse,
  GetPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /policy-engines/{policyEngineId}/policies/{policyId}",
    input: { policyEngineId: 0, policyId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts, description: D.secret },
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
  operationName: "GetPolicy",
})) as any;

export type GetPolicyEngineError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific policy engine within the AgentCore Policy system. This operation returns the complete policy engine configuration, metadata, and current status, allowing administrators to review and manage policy engine settings.
 */
export const getPolicyEngine: API.OperationMethod<
  GetPolicyEngineRequest,
  GetPolicyEngineResponse,
  GetPolicyEngineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /policy-engines/{policyEngineId}",
    input: { policyEngineId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts, description: D.secret },
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
  operationName: "GetPolicyEngine",
})) as any;

export type GetPolicyEngineSummaryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a metadata-only summary of a specific policy engine without decrypting customer content. This lightweight read operation returns resource identifiers, status, timestamps, and the encryption key ARN, but does not include the description or status reasons. Because this operation does not require access to the customer's KMS key, it is suitable for resource discovery, inventory, and integration scenarios where only metadata is needed.
 */
export const getPolicyEngineSummary: API.OperationMethod<
  GetPolicyEngineSummaryRequest,
  GetPolicyEngineSummaryResponse,
  GetPolicyEngineSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /policy-engine-summaries/{policyEngineId}",
    input: { policyEngineId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetPolicyEngineSummary",
})) as any;

export type GetPolicyGenerationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a policy generation request within the AgentCore Policy system. Policy generation converts natural language descriptions into Cedar policy statements using AI-powered translation, enabling non-technical users to create policies.
 */
export const getPolicyGeneration: API.OperationMethod<
  GetPolicyGenerationRequest,
  GetPolicyGenerationResponse,
  GetPolicyGenerationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /policy-engines/{policyEngineId}/policy-generations/{policyGenerationId}",
    input: { policyGenerationId: 0, policyEngineId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetPolicyGeneration",
})) as any;

export type GetPolicyGenerationSummaryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a metadata-only summary of a specific policy generation request without decrypting customer content. This lightweight read operation returns resource identifiers, status, timestamps, and findings, but does not include status reasons. Because this operation does not require access to the customer's KMS key, it is suitable for resource discovery, inventory, and integration scenarios where only metadata is needed.
 */
export const getPolicyGenerationSummary: API.OperationMethod<
  GetPolicyGenerationSummaryRequest,
  GetPolicyGenerationSummaryResponse,
  GetPolicyGenerationSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /policy-engines/{policyEngineId}/policy-generation-summaries/{policyGenerationId}",
    input: { policyGenerationId: 0, policyEngineId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetPolicyGenerationSummary",
})) as any;

export type GetPolicySummaryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a metadata-only summary of a specific policy without decrypting customer content. This lightweight read operation returns resource identifiers, status, and timestamps, but does not include the policy definition, description, or status reasons. Because this operation does not require access to the customer's KMS key, it is suitable for resource discovery, inventory, and integration scenarios where only metadata is needed.
 */
export const getPolicySummary: API.OperationMethod<
  GetPolicySummaryRequest,
  GetPolicySummaryResponse,
  GetPolicySummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /policy-engines/{policyEngineId}/policy-summaries/{policyId}",
    input: { policyEngineId: 0, policyId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetPolicySummary",
})) as any;

export type GetRegistryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specific registry.
 */
export const getRegistry: API.OperationMethod<
  GetRegistryRequest,
  GetRegistryResponse,
  GetRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /registries/{registryId}",
    input: { registryId: 0 },
    output: { description: D.secret, createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetRegistry",
})) as any;

export type GetRegistryRecordError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specific registry record.
 */
export const getRegistryRecord: API.OperationMethod<
  GetRegistryRecordRequest,
  GetRegistryRecordResponse,
  GetRegistryRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /registries/{registryId}/records/{recordId}",
    input: { registryId: 0, recordId: 0 },
    output: { description: D.secret, createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetRegistryRecord",
})) as any;

export type GetResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the resource-based policy for a specified resource.
 *
 * This feature is currently available only for AgentCore Runtime and Gateway.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /resourcepolicy/{resourceArn}",
    input: { resourceArn: 0 },
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
  operationName: "GetResourcePolicy",
})) as any;

export type GetTokenVaultError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a token vault.
 */
export const getTokenVault: API.OperationMethod<
  GetTokenVaultRequest,
  GetTokenVaultResponse,
  GetTokenVaultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/get-token-vault",
    input: { tokenVaultId: 0 },
    output: { lastModifiedDate: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTokenVault",
})) as any;

export type GetWorkloadIdentityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a workload identity.
 */
export const getWorkloadIdentity: API.OperationMethod<
  GetWorkloadIdentityRequest,
  GetWorkloadIdentityResponse,
  GetWorkloadIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/GetWorkloadIdentity",
    input: { name: 0 },
    output: { createdTime: D.ts, lastUpdatedTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkloadIdentity",
})) as any;

export type ListAgentRuntimeEndpointsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all endpoints for a specific Amazon Secure Agent.
 */
export const listAgentRuntimeEndpoints: API.PaginatedOperationMethod<
  ListAgentRuntimeEndpointsRequest,
  ListAgentRuntimeEndpointsResponse,
  ListAgentRuntimeEndpointsError,
  Credentials | HttpClient.HttpClient,
  AgentRuntimeEndpoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /runtimes/{agentRuntimeId}/runtime-endpoints/",
    input: {
      agentRuntimeId: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      runtimeEndpoints: D.list({
        name: D.secret,
        createdAt: D.ts,
        lastUpdatedAt: D.ts,
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
  operationName: "ListAgentRuntimeEndpoints",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "runtimeEndpoints",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAgentRuntimesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Amazon Secure Agents in your account.
 */
export const listAgentRuntimes: API.PaginatedOperationMethod<
  ListAgentRuntimesRequest,
  ListAgentRuntimesResponse,
  ListAgentRuntimesError,
  Credentials | HttpClient.HttpClient,
  AgentRuntime
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /runtimes/",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { agentRuntimes: D.list(o_AgentRuntime) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgentRuntimes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "agentRuntimes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAgentRuntimeVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all versions of a specific Amazon Secure Agent.
 */
export const listAgentRuntimeVersions: API.PaginatedOperationMethod<
  ListAgentRuntimeVersionsRequest,
  ListAgentRuntimeVersionsResponse,
  ListAgentRuntimeVersionsError,
  Credentials | HttpClient.HttpClient,
  AgentRuntime
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /runtimes/{agentRuntimeId}/versions/",
    input: {
      agentRuntimeId: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { agentRuntimes: D.list(o_AgentRuntime) },
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
  operationName: "ListAgentRuntimeVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "agentRuntimes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAgentRuntimeVersionsByCapacityProviderError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the agent runtime versions that are associated with a capacity provider. Use this operation to identify the runtimes you must disassociate before you can delete the capacity provider. Results are paginated; use the `nextToken` parameter to retrieve additional results.
 */
export const listAgentRuntimeVersionsByCapacityProvider: API.PaginatedOperationMethod<
  ListAgentRuntimeVersionsByCapacityProviderInput,
  ListAgentRuntimeVersionsByCapacityProviderOutput,
  ListAgentRuntimeVersionsByCapacityProviderError,
  Credentials | HttpClient.HttpClient,
  AgentRuntimeVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /capacity-providers/{capacityProviderId}/runtime-versions",
    input: {
      capacityProviderId: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
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
  operationName: "ListAgentRuntimeVersionsByCapacityProvider",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "agentRuntimes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListApiKeyCredentialProvidersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all API key credential providers in your account.
 */
export const listApiKeyCredentialProviders: API.PaginatedOperationMethod<
  ListApiKeyCredentialProvidersRequest,
  ListApiKeyCredentialProvidersResponse,
  ListApiKeyCredentialProvidersError,
  Credentials | HttpClient.HttpClient,
  ApiKeyCredentialProviderItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/ListApiKeyCredentialProviders",
    input: { nextToken: 0, maxResults: 0 },
    output: {
      credentialProviders: D.list({ createdTime: D.ts, lastUpdatedTime: D.ts }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApiKeyCredentialProviders",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "credentialProviders",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBrowserProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all browser profiles in your account.
 */
export const listBrowserProfiles: API.PaginatedOperationMethod<
  ListBrowserProfilesRequest,
  ListBrowserProfilesResponse,
  ListBrowserProfilesError,
  Credentials | HttpClient.HttpClient,
  BrowserProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /browser-profiles",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      name: 0,
    },
    output: {
      profileSummaries: D.list({
        description: D.secret,
        createdAt: D.ts,
        lastUpdatedAt: D.ts,
        lastSavedAt: D.ts,
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBrowserProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "profileSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBrowsersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all custom browsers in your account.
 */
export const listBrowsers: API.PaginatedOperationMethod<
  ListBrowsersRequest,
  ListBrowsersResponse,
  ListBrowsersError,
  Credentials | HttpClient.HttpClient,
  BrowserSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /browsers",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      type: D.m({ query: "type" }),
    },
    output: {
      browserSummaries: D.list({
        description: D.secret,
        createdAt: D.ts,
        lastUpdatedAt: D.ts,
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
  operationName: "ListBrowsers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "browserSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCapacityProvidersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the capacity providers in your account and returns summary information for each one. To retrieve the full configuration for a specific capacity provider, use `GetCapacityProvider`. Results are paginated; use the `nextToken` parameter to retrieve additional results.
 */
export const listCapacityProviders: API.PaginatedOperationMethod<
  ListCapacityProvidersInput,
  ListCapacityProvidersOutput,
  ListCapacityProvidersError,
  Credentials | HttpClient.HttpClient,
  CapacityProviderSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /capacity-providers",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { capacityProviders: D.list({ lastUpdatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCapacityProviders",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "capacityProviders",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCodeInterpretersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all custom code interpreters in your account.
 */
export const listCodeInterpreters: API.PaginatedOperationMethod<
  ListCodeInterpretersRequest,
  ListCodeInterpretersResponse,
  ListCodeInterpretersError,
  Credentials | HttpClient.HttpClient,
  CodeInterpreterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /code-interpreters",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      type: D.m({ query: "type" }),
    },
    output: {
      codeInterpreterSummaries: D.list({
        description: D.secret,
        createdAt: D.ts,
        lastUpdatedAt: D.ts,
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
  operationName: "ListCodeInterpreters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "codeInterpreterSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConfigurationBundlesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all configuration bundles in the account.
 */
export const listConfigurationBundles: API.PaginatedOperationMethod<
  ListConfigurationBundlesRequest,
  ListConfigurationBundlesResponse,
  ListConfigurationBundlesError,
  Credentials | HttpClient.HttpClient,
  ConfigurationBundleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /configuration-bundles",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { bundles: D.list({ description: D.secret, createdAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationBundles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "bundles",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConfigurationBundleVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all versions of a configuration bundle, with optional filtering by branch name or creation source.
 */
export const listConfigurationBundleVersions: API.PaginatedOperationMethod<
  ListConfigurationBundleVersionsRequest,
  ListConfigurationBundleVersionsResponse,
  ListConfigurationBundleVersionsError,
  Credentials | HttpClient.HttpClient,
  ConfigurationBundleVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /configuration-bundles/{bundleId}/versions",
    input: {
      bundleId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      filter: { branchName: 0, createdByName: 0, latestPerBranch: 0 },
    },
    output: { versions: D.list({ versionCreatedAt: D.ts }) },
    body: true,
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
  operationName: "ListConfigurationBundleVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "versions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDatasetExamplesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns paginated examples from the dataset. The server embeds the resolved version in the pagination token. Once pagination begins, all subsequent pages are pinned to that version regardless of concurrent mutations.
 */
export const listDatasetExamples: API.PaginatedOperationMethod<
  ListDatasetExamplesRequest,
  ListDatasetExamplesResponse,
  ListDatasetExamplesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /datasets/{datasetId}/examples",
    input: {
      datasetId: 0,
      datasetVersion: D.m({ query: "datasetVersion" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
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
  operationName: "ListDatasetExamples",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "examples",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDatasetsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all datasets in the caller's account, paginated.
 */
export const listDatasets: API.PaginatedOperationMethod<
  ListDatasetsRequest,
  ListDatasetsResponse,
  ListDatasetsError,
  Credentials | HttpClient.HttpClient,
  DatasetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /datasets",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { datasets: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "datasets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDatasetVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all published versions of a dataset, sorted by version number descending (newest first). Does not include the DRAFT working copy.
 */
export const listDatasetVersions: API.PaginatedOperationMethod<
  ListDatasetVersionsRequest,
  ListDatasetVersionsResponse,
  ListDatasetVersionsError,
  Credentials | HttpClient.HttpClient,
  DatasetVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /datasets/{datasetId}/versions",
    input: {
      datasetId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { versions: D.list({ createdAt: D.ts }) },
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
  operationName: "ListDatasetVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "versions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEvaluatorsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all available evaluators, including both builtin evaluators provided by the service and custom evaluators created by the user.
 */
export const listEvaluators: API.PaginatedOperationMethod<
  ListEvaluatorsRequest,
  ListEvaluatorsResponse,
  ListEvaluatorsError,
  Credentials | HttpClient.HttpClient,
  EvaluatorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /evaluators",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      evaluators: D.list({
        description: D.secret,
        createdAt: D.ts,
        updatedAt: D.ts,
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
  operationName: "ListEvaluators",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "evaluators",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGatewayRateLimitsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all rate limits for a gateway. Results are paginated. Use the `nextToken` parameter to retrieve additional results.
 */
export const listGatewayRateLimits: API.PaginatedOperationMethod<
  ListGatewayRateLimitsRequest,
  ListGatewayRateLimitsResponse,
  ListGatewayRateLimitsError,
  Credentials | HttpClient.HttpClient,
  GatewayRateLimitDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /gateways/{gatewayIdentifier}/rate-limits",
    input: {
      gatewayIdentifier: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { rateLimits: D.list(o_GatewayRateLimitDetail) },
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
  operationName: "ListGatewayRateLimits",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "rateLimits",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGatewayRulesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all rules for a gateway.
 */
export const listGatewayRules: API.PaginatedOperationMethod<
  ListGatewayRulesRequest,
  ListGatewayRulesResponse,
  ListGatewayRulesError,
  Credentials | HttpClient.HttpClient,
  GatewayRuleDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /gateways/{gatewayIdentifier}/rules",
    input: {
      gatewayIdentifier: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      gatewayRules: D.list({
        actions: D.list(o_Action),
        createdAt: D.ts,
        updatedAt: D.ts,
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
  operationName: "ListGatewayRules",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "gatewayRules",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGatewaysError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all gateways in the account.
 */
export const listGateways: API.PaginatedOperationMethod<
  ListGatewaysRequest,
  ListGatewaysResponse,
  ListGatewaysError,
  Credentials | HttpClient.HttpClient,
  GatewaySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /gateways/",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      items: D.list({
        description: D.secret,
        createdAt: D.ts,
        updatedAt: D.ts,
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
  operationName: "ListGateways",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGatewayTargetsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all targets for a specific gateway.
 */
export const listGatewayTargets: API.PaginatedOperationMethod<
  ListGatewayTargetsRequest,
  ListGatewayTargetsResponse,
  ListGatewayTargetsError,
  Credentials | HttpClient.HttpClient,
  TargetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /gateways/{gatewayIdentifier}/targets/",
    input: {
      gatewayIdentifier: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      items: D.list({
        name: D.secret,
        description: D.secret,
        createdAt: D.ts,
        updatedAt: D.ts,
        lastSynchronizedAt: D.ts,
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
  operationName: "ListGatewayTargets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListHarnessEndpointsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Operation to list the endpoints of a harness.
 */
export const listHarnessEndpoints: API.PaginatedOperationMethod<
  ListHarnessEndpointsRequest,
  ListHarnessEndpointsResponse,
  ListHarnessEndpointsError,
  Credentials | HttpClient.HttpClient,
  HarnessEndpoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /harnesses/{harnessId}/endpoints",
    input: {
      harnessId: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { endpoints: D.list(o_HarnessEndpoint) },
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
  operationName: "ListHarnessEndpoints",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "endpoints",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListHarnessesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Operation to list harnesses.
 */
export const listHarnesses: API.PaginatedOperationMethod<
  ListHarnessesRequest,
  ListHarnessesResponse,
  ListHarnessesError,
  Credentials | HttpClient.HttpClient,
  HarnessSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /harnesses",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { harnesses: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHarnesses",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "harnesses",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListHarnessVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Operation to list the versions of a Harness.
 */
export const listHarnessVersions: API.PaginatedOperationMethod<
  ListHarnessVersionsRequest,
  ListHarnessVersionsResponse,
  ListHarnessVersionsError,
  Credentials | HttpClient.HttpClient,
  HarnessVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /harnesses/{harnessId}/versions",
    input: {
      harnessId: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { harnessVersions: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
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
  operationName: "ListHarnessVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "harnessVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMemoriesError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ServiceException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Lists the available Amazon Bedrock AgentCore Memory resources in the current Amazon Web Services Region.
 */
export const listMemories: API.PaginatedOperationMethod<
  ListMemoriesInput,
  ListMemoriesOutput,
  ListMemoriesError,
  Credentials | HttpClient.HttpClient,
  MemorySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /memories/",
    input: { maxResults: 0, nextToken: 0 },
    output: { memories: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ServiceException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMemories",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "memories",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListOauth2CredentialProvidersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all OAuth2 credential providers in your account.
 */
export const listOauth2CredentialProviders: API.PaginatedOperationMethod<
  ListOauth2CredentialProvidersRequest,
  ListOauth2CredentialProvidersResponse,
  ListOauth2CredentialProvidersError,
  Credentials | HttpClient.HttpClient,
  Oauth2CredentialProviderItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/ListOauth2CredentialProviders",
    input: { nextToken: 0, maxResults: 0 },
    output: {
      credentialProviders: D.list({ createdTime: D.ts, lastUpdatedTime: D.ts }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOauth2CredentialProviders",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "credentialProviders",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListOnlineEvaluationConfigsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all online evaluation configurations in the account, providing summary information about each configuration's status and settings.
 */
export const listOnlineEvaluationConfigs: API.PaginatedOperationMethod<
  ListOnlineEvaluationConfigsRequest,
  ListOnlineEvaluationConfigsResponse,
  ListOnlineEvaluationConfigsError,
  Credentials | HttpClient.HttpClient,
  OnlineEvaluationConfigSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /online-evaluation-configs",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      onlineEvaluationConfigs: D.list({
        description: D.secret,
        createdAt: D.ts,
        updatedAt: D.ts,
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
  operationName: "ListOnlineEvaluationConfigs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "onlineEvaluationConfigs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPaymentConnectorsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all payment connectors for a specified payment manager.
 */
export const listPaymentConnectors: API.PaginatedOperationMethod<
  ListPaymentConnectorsRequest,
  ListPaymentConnectorsResponse,
  ListPaymentConnectorsError,
  Credentials | HttpClient.HttpClient,
  PaymentConnectorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /payments/managers/{paymentManagerId}/connectors-list",
    input: {
      paymentManagerId: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { paymentConnectors: D.list({ lastUpdatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPaymentConnectors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "paymentConnectors",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPaymentCredentialProvidersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all payment credential providers in the account.
 */
export const listPaymentCredentialProviders: API.PaginatedOperationMethod<
  ListPaymentCredentialProvidersRequest,
  ListPaymentCredentialProvidersResponse,
  ListPaymentCredentialProvidersError,
  Credentials | HttpClient.HttpClient,
  PaymentCredentialProviderItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/ListPaymentCredentialProviders",
    input: { nextToken: 0, maxResults: 0 },
    output: {
      credentialProviders: D.list({ createdTime: D.ts, lastUpdatedTime: D.ts }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPaymentCredentialProviders",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "credentialProviders",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPaymentManagersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all payment managers in the account.
 */
export const listPaymentManagers: API.PaginatedOperationMethod<
  ListPaymentManagersRequest,
  ListPaymentManagersResponse,
  ListPaymentManagersError,
  Credentials | HttpClient.HttpClient,
  PaymentManagerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /payments/managers-list",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      paymentManagers: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts }),
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
  operationName: "ListPaymentManagers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "paymentManagers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPoliciesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of policies within the AgentCore Policy engine. This operation supports pagination and filtering to help administrators manage and discover policies across policy engines. Results can be filtered by policy engine or resource associations.
 */
export const listPolicies: API.PaginatedOperationMethod<
  ListPoliciesRequest,
  ListPoliciesResponse,
  ListPoliciesError,
  Credentials | HttpClient.HttpClient,
  Policy
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /policy-engines/{policyEngineId}/policies",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      policyEngineId: 0,
      targetResourceScope: D.m({ query: "targetResourceScope" }),
    },
    output: {
      policies: D.list({
        createdAt: D.ts,
        updatedAt: D.ts,
        description: D.secret,
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
  operationName: "ListPolicies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "policies",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPolicyEnginesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of policy engines within the AgentCore Policy system. This operation supports pagination to help administrators discover and manage policy engines across their account. Each policy engine serves as a container for related policies.
 */
export const listPolicyEngines: API.PaginatedOperationMethod<
  ListPolicyEnginesRequest,
  ListPolicyEnginesResponse,
  ListPolicyEnginesError,
  Credentials | HttpClient.HttpClient,
  PolicyEngine
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /policy-engines",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      policyEngines: D.list({
        createdAt: D.ts,
        updatedAt: D.ts,
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
  operationName: "ListPolicyEngines",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "policyEngines",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPolicyEngineSummariesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of metadata-only policy engine summaries without decrypting customer content. This lightweight read operation returns resource identifiers, status, and timestamps for each policy engine, but does not include descriptions or status reasons. Because this operation does not require access to the customer's KMS key, it is suitable for resource discovery, inventory, and integration scenarios where only metadata is needed.
 */
export const listPolicyEngineSummaries: API.PaginatedOperationMethod<
  ListPolicyEngineSummariesRequest,
  ListPolicyEngineSummariesResponse,
  ListPolicyEngineSummariesError,
  Credentials | HttpClient.HttpClient,
  PolicyEngineSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /policy-engine-summaries",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { policyEngines: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicyEngineSummaries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "policyEngines",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPolicyGenerationAssetsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of generated policy assets from a policy generation request within the AgentCore Policy system. This operation returns the actual Cedar policies and related artifacts produced by the AI-powered policy generation process, allowing users to review and select from multiple generated policy options.
 */
export const listPolicyGenerationAssets: API.PaginatedOperationMethod<
  ListPolicyGenerationAssetsRequest,
  ListPolicyGenerationAssetsResponse,
  ListPolicyGenerationAssetsError,
  Credentials | HttpClient.HttpClient,
  PolicyGenerationAsset
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /policy-engines/{policyEngineId}/policy-generations/{policyGenerationId}/assets",
    input: {
      policyGenerationId: 0,
      policyEngineId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
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
  operationName: "ListPolicyGenerationAssets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "policyGenerationAssets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPolicyGenerationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of policy generation requests within the AgentCore Policy system. This operation supports pagination and filtering to help track and manage AI-powered policy generation operations.
 */
export const listPolicyGenerations: API.PaginatedOperationMethod<
  ListPolicyGenerationsRequest,
  ListPolicyGenerationsResponse,
  ListPolicyGenerationsError,
  Credentials | HttpClient.HttpClient,
  PolicyGeneration
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /policy-engines/{policyEngineId}/policy-generations",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      policyEngineId: 0,
    },
    output: { policyGenerations: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
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
  operationName: "ListPolicyGenerations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "policyGenerations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPolicyGenerationSummariesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of metadata-only policy generation summaries within a policy engine without decrypting customer content. This lightweight read operation returns resource identifiers, status, timestamps, and findings for each policy generation, but does not include status reasons. Because this operation does not require access to the customer's KMS key, it is suitable for resource discovery, inventory, and integration scenarios where only metadata is needed.
 */
export const listPolicyGenerationSummaries: API.PaginatedOperationMethod<
  ListPolicyGenerationSummariesRequest,
  ListPolicyGenerationSummariesResponse,
  ListPolicyGenerationSummariesError,
  Credentials | HttpClient.HttpClient,
  PolicyGenerationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /policy-engines/{policyEngineId}/policy-generation-summaries",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      policyEngineId: 0,
    },
    output: { policyGenerations: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
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
  operationName: "ListPolicyGenerationSummaries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "policyGenerations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPolicySummariesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of metadata-only policy summaries within a policy engine without decrypting customer content. This lightweight read operation returns resource identifiers, status, and timestamps for each policy, but does not include policy definitions, descriptions, or status reasons. Because this operation does not require access to the customer's KMS key, it is suitable for resource discovery, inventory, and integration scenarios where only metadata is needed.
 */
export const listPolicySummaries: API.PaginatedOperationMethod<
  ListPolicySummariesRequest,
  ListPolicySummariesResponse,
  ListPolicySummariesError,
  Credentials | HttpClient.HttpClient,
  PolicySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /policy-engines/{policyEngineId}/policy-summaries",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      policyEngineId: 0,
      targetResourceScope: D.m({ query: "targetResourceScope" }),
    },
    output: { policies: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
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
  operationName: "ListPolicySummaries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "policies",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRegistriesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all registries in the account. You can optionally filter results by status using the `status` parameter, or by authorizer type using the `authorizerType` parameter.
 */
export const listRegistries: API.PaginatedOperationMethod<
  ListRegistriesRequest,
  ListRegistriesResponse,
  ListRegistriesError,
  Credentials | HttpClient.HttpClient,
  RegistrySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /registries",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      status: D.m({ query: "status" }),
      authorizerType: D.m({ query: "authorizerType" }),
    },
    output: {
      registries: D.list({
        description: D.secret,
        createdAt: D.ts,
        updatedAt: D.ts,
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
  operationName: "ListRegistries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "registries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRegistryRecordsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists registry records within a registry. You can optionally filter results using the `name`, `status`, and `descriptorType` parameters. When multiple filters are specified, they are combined using AND logic.
 */
export const listRegistryRecords: API.PaginatedOperationMethod<
  ListRegistryRecordsRequest,
  ListRegistryRecordsResponse,
  ListRegistryRecordsError,
  Credentials | HttpClient.HttpClient,
  RegistryRecordSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /registries/{registryId}/records",
    input: {
      registryId: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      name: D.m({ query: "name" }),
      status: D.m({ query: "status" }),
      descriptorType: D.m({ query: "descriptorType" }),
    },
    output: {
      registryRecords: D.list({
        description: D.secret,
        createdAt: D.ts,
        updatedAt: D.ts,
      }),
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
  operationName: "ListRegistryRecords",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "registryRecords",
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
 * Lists the tags associated with the specified resource.
 *
 * This feature is currently available only for AgentCore Runtime, Browser, Browser Profile, Code Interpreter tool, and Gateway.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListWorkloadIdentitiesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all workload identities in your account.
 */
export const listWorkloadIdentities: API.PaginatedOperationMethod<
  ListWorkloadIdentitiesRequest,
  ListWorkloadIdentitiesResponse,
  ListWorkloadIdentitiesError,
  Credentials | HttpClient.HttpClient,
  WorkloadIdentityType
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/ListWorkloadIdentities",
    input: { nextToken: 0, maxResults: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkloadIdentities",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workloadIdentities",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates a resource-based policy for a resource with the specified resourceArn.
 *
 * This feature is currently available only for AgentCore Runtime and Gateway.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /resourcepolicy/{resourceArn}",
    input: { resourceArn: 0, policy: 0 },
    body: true,
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
  operationName: "PutResourcePolicy",
})) as any;

export type SetTokenVaultCMKError =
  | AccessDeniedException
  | ConcurrentModificationException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Sets the customer master key (CMK) for a token vault.
 */
export const setTokenVaultCMK: API.OperationMethod<
  SetTokenVaultCMKRequest,
  SetTokenVaultCMKResponse,
  SetTokenVaultCMKError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/set-token-vault-cmk",
    input: { tokenVaultId: 0, kmsConfiguration: { keyType: 0, kmsKeyArn: 0 } },
    output: { lastModifiedDate: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetTokenVaultCMK",
})) as any;

export type StartPolicyGenerationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates the AI-powered generation of Cedar policies from natural language descriptions within the AgentCore Policy system. This feature enables both technical and non-technical users to create policies by describing their authorization requirements in plain English, which is then automatically translated into formal Cedar policy statements. The generation process analyzes the natural language input along with the Gateway's tool context to produce validated policy options. Generated policy assets are automatically deleted after 7 days, so you should review and create policies from the generated assets within this timeframe. Once created, policies are permanent and not subject to this expiration. Generated policies should be reviewed and tested in log-only mode before deploying to production. Use this when you want to describe policy intent naturally rather than learning Cedar syntax, though generated policies may require refinement for complex scenarios.
 */
export const startPolicyGeneration: API.OperationMethod<
  StartPolicyGenerationRequest,
  StartPolicyGenerationResponse,
  StartPolicyGenerationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /policy-engines/{policyEngineId}/policy-generations",
    input: {
      policyEngineId: 0,
      resource: { arn: 0 },
      content: { rawText: 0 },
      name: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { createdAt: D.ts, updatedAt: D.ts },
    body: true,
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
  operationName: "StartPolicyGeneration",
})) as any;

export type SubmitRegistryRecordForApprovalError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Submits a registry record for approval. This transitions the record from `DRAFT` status to `PENDING_APPROVAL` status. If the registry has auto-approval enabled, the record is automatically approved.
 */
export const submitRegistryRecordForApproval: API.OperationMethod<
  SubmitRegistryRecordForApprovalRequest,
  SubmitRegistryRecordForApprovalResponse,
  SubmitRegistryRecordForApprovalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /registries/{registryId}/records/{recordId}/submit-for-approval",
    input: { registryId: 0, recordId: 0 },
    output: { updatedAt: D.ts },
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
  operationName: "SubmitRegistryRecordForApproval",
})) as any;

export type SynchronizeGatewayTargetsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Synchronizes the gateway targets by fetching the latest tool definitions from the target endpoints.
 *
 * You cannot synchronize a target that is in a pending authorization state (`CREATE_PENDING_AUTH`, `UPDATE_PENDING_AUTH`, or `SYNCHRONIZE_PENDING_AUTH`). Wait for the authorization to complete or fail before synchronizing.
 *
 * You cannot synchronize a target that has a static tool schema (`mcpToolSchema`) configured. Remove the static schema through an `UpdateGatewayTarget` call to enable dynamic tool synchronization.
 */
export const synchronizeGatewayTargets: API.OperationMethod<
  SynchronizeGatewayTargetsRequest,
  SynchronizeGatewayTargetsResponse,
  SynchronizeGatewayTargetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /gateways/{gatewayIdentifier}/synchronizeTargets",
    input: { gatewayIdentifier: 0, targetIdList: 0 },
    output: {
      targets: D.list({
        createdAt: D.ts,
        updatedAt: D.ts,
        name: D.secret,
        description: D.secret,
        targetConfiguration: o_TargetConfiguration,
        credentialProviderConfigurations: D.list(
          o_CredentialProviderConfiguration,
        ),
        lastSynchronizedAt: D.ts,
      }),
    },
    body: true,
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
  operationName: "SynchronizeGatewayTargets",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates the specified tags to a resource with the specified resourceArn. If existing tags on a resource are not specified in the request parameters, they are not changed. When a resource is deleted, the tags associated with that resource are also deleted.
 *
 * This feature is currently available only for AgentCore Runtime, Browser, Browser Profile, Code Interpreter tool, and Gateway.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified tags from the specified resource.
 *
 * This feature is currently available only for AgentCore Runtime, Browser, Browser Profile, Code Interpreter tool, and Gateway.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAgentRuntimeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing Amazon Secure Agent.
 */
export const updateAgentRuntime: API.OperationMethod<
  UpdateAgentRuntimeRequest,
  UpdateAgentRuntimeResponse,
  UpdateAgentRuntimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /runtimes/{agentRuntimeId}/",
    input: {
      agentRuntimeId: 0,
      agentRuntimeArtifact: i_AgentRuntimeArtifact,
      roleArn: 0,
      networkConfiguration: i_NetworkConfiguration,
      description: 0,
      authorizerConfiguration: i_AuthorizerConfiguration,
      requestHeaderConfiguration: i_RequestHeaderConfiguration,
      protocolConfiguration: i_ProtocolConfiguration,
      lifecycleConfiguration: i_LifecycleConfiguration,
      metadataConfiguration: { requireMMDSV2: 0 },
      environmentVariables: 0,
      filesystemConfigurations: D.list(i_FilesystemConfiguration),
      capacityProviderConfiguration: i_CapacityProviderConfiguration,
      clientToken: D.m({ idempotency: true }),
    },
    output: { createdAt: D.ts, lastUpdatedAt: D.ts },
    body: true,
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
  operationName: "UpdateAgentRuntime",
})) as any;

export type UpdateAgentRuntimeEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing Amazon Bedrock AgentCore Runtime endpoint.
 */
export const updateAgentRuntimeEndpoint: API.OperationMethod<
  UpdateAgentRuntimeEndpointRequest,
  UpdateAgentRuntimeEndpointResponse,
  UpdateAgentRuntimeEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /runtimes/{agentRuntimeId}/runtime-endpoints/{endpointName}/",
    input: {
      agentRuntimeId: 0,
      endpointName: 0,
      agentRuntimeVersion: 0,
      description: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { createdAt: D.ts, lastUpdatedAt: D.ts },
    body: true,
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
  operationName: "UpdateAgentRuntimeEndpoint",
})) as any;

export type UpdateApiKeyCredentialProviderError =
  | AccessDeniedException
  | ConflictException
  | DecryptionFailure
  | EncryptionFailure
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing API key credential provider.
 */
export const updateApiKeyCredentialProvider: API.OperationMethod<
  UpdateApiKeyCredentialProviderRequest,
  UpdateApiKeyCredentialProviderResponse,
  UpdateApiKeyCredentialProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/UpdateApiKeyCredentialProvider",
    input: {
      name: 0,
      apiKey: 0,
      apiKeySecretConfig: i_SecretReference,
      apiKeySecretSource: 0,
    },
    output: { createdTime: D.ts, lastUpdatedTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DecryptionFailure,
    EncryptionFailure,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApiKeyCredentialProvider",
})) as any;

export type UpdateCapacityProviderError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | RetryableConflictException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a capacity provider. Only the description can be changed. To change other configuration, such as instance types, networking, or storage, create a new capacity provider.
 */
export const updateCapacityProvider: API.OperationMethod<
  UpdateCapacityProviderInput,
  UpdateCapacityProviderOutput,
  UpdateCapacityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /capacity-providers/{capacityProviderId}",
    input: {
      capacityProviderId: 0,
      description: i_UpdatedDescription,
      clientToken: D.m({ idempotency: true }),
    },
    output: { createdAt: D.ts, lastUpdatedAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    RetryableConflictException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCapacityProvider",
})) as any;

export type UpdateConfigurationBundleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a configuration bundle by creating a new version with the specified changes. Each update creates a new version in the version history.
 */
export const updateConfigurationBundle: API.OperationMethod<
  UpdateConfigurationBundleRequest,
  UpdateConfigurationBundleResponse,
  UpdateConfigurationBundleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /configuration-bundles/{bundleId}",
    input: {
      clientToken: D.m({ idempotency: true }),
      bundleId: 0,
      bundleName: 0,
      description: 0,
      components: D.map(i_ComponentConfiguration),
      parentVersionIds: 0,
      branchName: 0,
      commitMessage: 0,
      createdBy: i_VersionCreatedBySource,
      kmsKeyArn: 0,
    },
    output: { updatedAt: D.ts },
    body: true,
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
  operationName: "UpdateConfigurationBundle",
})) as any;

export type UpdateDatasetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a dataset's metadata. Synchronous operation. Only provided fields are updated; omitted fields remain unchanged. To modify dataset content, use `AddDatasetExamples`, `UpdateDatasetExamples`, or `DeleteDatasetExamples`.
 */
export const updateDataset: API.OperationMethod<
  UpdateDatasetRequest,
  UpdateDatasetResponse,
  UpdateDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /datasets/{datasetId}",
    input: {
      datasetId: 0,
      clientToken: D.m({ idempotency: true }),
      description: 0,
    },
    output: { updatedAt: D.ts },
    body: true,
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
  operationName: "UpdateDataset",
})) as any;

export type UpdateDatasetExamplesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates multiple existing examples in-place on DRAFT. All examples are validated against the dataset's schema type before any writes occur. If any example fails validation, the entire batch is rejected (all-or-nothing semantics).
 */
export const updateDatasetExamples: API.OperationMethod<
  UpdateDatasetExamplesRequest,
  UpdateDatasetExamplesResponse,
  UpdateDatasetExamplesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /datasets/{datasetId}/examples/update",
    input: {
      datasetId: 0,
      clientToken: D.m({ idempotency: true }),
      examples: 0,
    },
    output: { updatedAt: D.ts },
    body: true,
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
  operationName: "UpdateDatasetExamples",
})) as any;

export type UpdateEvaluatorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a custom evaluator's configuration, description, or evaluation level. Built-in evaluators cannot be updated. The evaluator must not be locked for modification.
 */
export const updateEvaluator: API.OperationMethod<
  UpdateEvaluatorRequest,
  UpdateEvaluatorResponse,
  UpdateEvaluatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /evaluators/{evaluatorId}",
    input: {
      clientToken: D.m({ idempotency: true }),
      evaluatorId: 0,
      description: 0,
      evaluatorConfig: i_EvaluatorConfig,
      level: 0,
      kmsKeyArn: 0,
    },
    output: { updatedAt: D.ts },
    body: true,
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
  operationName: "UpdateEvaluator",
})) as any;

export type UpdateGatewayError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing gateway.
 */
export const updateGateway: API.OperationMethod<
  UpdateGatewayRequest,
  UpdateGatewayResponse,
  UpdateGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /gateways/{gatewayIdentifier}/",
    input: {
      gatewayIdentifier: 0,
      name: 0,
      description: 0,
      roleArn: 0,
      protocolType: 0,
      protocolConfiguration: i_GatewayProtocolConfiguration,
      authorizerType: 0,
      authorizerConfiguration: i_AuthorizerConfiguration,
      kmsKeyArn: 0,
      customTransformConfiguration: { lambda: { arn: 0 } },
      interceptorConfigurations: D.list(i_GatewayInterceptorConfiguration),
      policyEngineConfiguration: i_GatewayPolicyEngineConfiguration,
      exceptionLevel: 0,
      wafConfiguration: { failureMode: 0 },
    },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      description: D.secret,
      protocolConfiguration: o_GatewayProtocolConfiguration,
    },
    body: true,
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
  operationName: "UpdateGateway",
})) as any;

export type UpdateGatewayRateLimitError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the entries of a gateway rate limit. The dimension keys are immutable after creation.
 */
export const updateGatewayRateLimit: API.OperationMethod<
  UpdateGatewayRateLimitRequest,
  UpdateGatewayRateLimitResponse,
  UpdateGatewayRateLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /gateways/{gatewayIdentifier}/rate-limits/{rateLimitId}",
    input: {
      gatewayIdentifier: 0,
      rateLimitId: 0,
      description: 0,
      entries: D.list(i_LimitEntry),
    },
    output: { createdAt: D.ts, updatedAt: D.ts },
    body: true,
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
  operationName: "UpdateGatewayRateLimit",
})) as any;

export type UpdateGatewayRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a gateway rule's priority, conditions, actions, or description.
 */
export const updateGatewayRule: API.OperationMethod<
  UpdateGatewayRuleRequest,
  UpdateGatewayRuleResponse,
  UpdateGatewayRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /gateways/{gatewayIdentifier}/rules/{ruleId}",
    input: {
      gatewayIdentifier: 0,
      ruleId: 0,
      priority: 0,
      conditions: D.list(i_Condition),
      actions: D.list(i_Action),
      description: 0,
    },
    output: { actions: D.list(o_Action), createdAt: D.ts, updatedAt: D.ts },
    body: true,
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
  operationName: "UpdateGatewayRule",
})) as any;

export type UpdateGatewayTargetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing gateway target.
 *
 * You cannot update a target that is in a pending authorization state (`CREATE_PENDING_AUTH`, `UPDATE_PENDING_AUTH`, or `SYNCHRONIZE_PENDING_AUTH`). Wait for the authorization to complete or fail before updating the target.
 */
export const updateGatewayTarget: API.OperationMethod<
  UpdateGatewayTargetRequest,
  UpdateGatewayTargetResponse,
  UpdateGatewayTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /gateways/{gatewayIdentifier}/targets/{targetId}/",
    input: {
      gatewayIdentifier: 0,
      targetId: 0,
      name: 0,
      description: 0,
      targetConfiguration: i_TargetConfiguration,
      credentialProviderConfigurations: D.list(
        i_CredentialProviderConfiguration,
      ),
      metadataConfiguration: i_MetadataConfiguration,
      privateEndpoint: i_PrivateEndpoint,
    },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      name: D.secret,
      description: D.secret,
      targetConfiguration: o_TargetConfiguration,
      credentialProviderConfigurations: D.list(
        o_CredentialProviderConfiguration,
      ),
      lastSynchronizedAt: D.ts,
    },
    body: true,
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
  operationName: "UpdateGatewayTarget",
})) as any;

export type UpdateHarnessError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Operation to update a harness.
 */
export const updateHarness: API.OperationMethod<
  UpdateHarnessRequest,
  UpdateHarnessResponse,
  UpdateHarnessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /harnesses/{harnessId}",
    input: {
      harnessId: 0,
      clientToken: D.m({ idempotency: true }),
      executionRoleArn: 0,
      environment: i_HarnessEnvironmentProviderRequest,
      environmentArtifact: { optionalValue: i_HarnessEnvironmentArtifact },
      environmentVariables: 0,
      authorizerConfiguration: i_UpdatedAuthorizerConfiguration,
      model: i_HarnessModelConfiguration,
      systemPrompt: D.list(i_HarnessSystemContentBlock),
      tools: D.list(i_HarnessTool),
      skills: D.list(i_HarnessSkill),
      allowedTools: 0,
      memory: { optionalValue: i_HarnessMemoryConfiguration },
      truncation: i_HarnessTruncationConfiguration,
      maxIterations: 0,
      maxTokens: 0,
      timeoutSeconds: 0,
    },
    output: { harness: o_Harness },
    body: true,
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
  operationName: "UpdateHarness",
})) as any;

export type UpdateHarnessEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Operation to update a harness endpoint.
 */
export const updateHarnessEndpoint: API.OperationMethod<
  UpdateHarnessEndpointRequest,
  UpdateHarnessEndpointResponse,
  UpdateHarnessEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /harnesses/{harnessId}/endpoints/{endpointName}",
    input: {
      harnessId: 0,
      endpointName: 0,
      targetVersion: 0,
      description: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { endpoint: o_HarnessEndpoint },
    body: true,
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
  operationName: "UpdateHarnessEndpoint",
})) as any;

export type UpdateMemoryError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Update an Amazon Bedrock AgentCore Memory resource memory.
 */
export const updateMemory: API.OperationMethod<
  UpdateMemoryInput,
  UpdateMemoryOutput,
  UpdateMemoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /memories/{memoryId}/update",
    input: {
      clientToken: D.m({ idempotency: true }),
      memoryId: 0,
      description: 0,
      eventExpiryDuration: 0,
      memoryExecutionRoleArn: 0,
      memoryStrategies: {
        addMemoryStrategies: D.list(i_MemoryStrategyInput),
        modifyMemoryStrategies: D.list({
          memoryStrategyId: 0,
          description: 0,
          namespaces: 0,
          namespaceTemplates: 0,
          configuration: {
            extraction: {
              customExtractionConfiguration: {
                semanticExtractionOverride:
                  i_SemanticOverrideExtractionConfigurationInput,
                userPreferenceExtractionOverride:
                  i_UserPreferenceOverrideExtractionConfigurationInput,
                episodicExtractionOverride:
                  i_EpisodicOverrideExtractionConfigurationInput,
              },
            },
            consolidation: {
              customConsolidationConfiguration: {
                semanticConsolidationOverride:
                  i_SemanticOverrideConsolidationConfigurationInput,
                summaryConsolidationOverride:
                  i_SummaryOverrideConsolidationConfigurationInput,
                userPreferenceConsolidationOverride:
                  i_UserPreferenceOverrideConsolidationConfigurationInput,
                episodicConsolidationOverride:
                  i_EpisodicOverrideConsolidationConfigurationInput,
              },
            },
            reflection: {
              episodicReflectionConfiguration:
                i_EpisodicReflectionConfigurationInput,
              customReflectionConfiguration: {
                episodicReflectionOverride:
                  i_EpisodicOverrideReflectionConfigurationInput,
              },
            },
            selfManagedConfiguration: {
              triggerConditions: D.list(i_TriggerConditionInput),
              invocationConfiguration: {
                topicArn: 0,
                payloadDeliveryBucketName: 0,
              },
              historicalContextWindowSize: 0,
            },
          },
          memoryRecordSchema: i_MemoryRecordSchema,
        }),
        deleteMemoryStrategies: D.list({ memoryStrategyId: 0 }),
      },
      addIndexedKeys: D.list(i_IndexedKey),
      namespaceKeys: D.list(i_NamespaceKeyEntry),
      streamDeliveryResources: i_StreamDeliveryResources,
    },
    output: { memory: o_Memory },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMemory",
})) as any;

export type UpdateOauth2CredentialProviderError =
  | AccessDeniedException
  | ConflictException
  | DecryptionFailure
  | EncryptionFailure
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing OAuth2 credential provider.
 */
export const updateOauth2CredentialProvider: API.OperationMethod<
  UpdateOauth2CredentialProviderRequest,
  UpdateOauth2CredentialProviderResponse,
  UpdateOauth2CredentialProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/UpdateOauth2CredentialProvider",
    input: {
      name: 0,
      credentialProviderVendor: 0,
      oauth2ProviderConfigInput: i_Oauth2ProviderConfigInput,
    },
    output: {
      oauth2ProviderConfigOutput: o_Oauth2ProviderConfigOutput,
      createdTime: D.ts,
      lastUpdatedTime: D.ts,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DecryptionFailure,
    EncryptionFailure,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOauth2CredentialProvider",
})) as any;

export type UpdateOnlineEvaluationConfigError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an online evaluation configuration's settings, including rules, data sources, evaluators, and execution status. Changes take effect immediately for ongoing evaluations.
 */
export const updateOnlineEvaluationConfig: API.OperationMethod<
  UpdateOnlineEvaluationConfigRequest,
  UpdateOnlineEvaluationConfigResponse,
  UpdateOnlineEvaluationConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /online-evaluation-configs/{onlineEvaluationConfigId}",
    input: {
      clientToken: D.m({ idempotency: true }),
      onlineEvaluationConfigId: 0,
      description: 0,
      rule: i_Rule,
      dataSourceConfig: i_DataSourceConfig,
      evaluators: D.list(i_EvaluatorReference),
      insights: D.list(i_Insight),
      clusteringConfig: i_ClusteringConfig,
      evaluationExecutionRoleArn: 0,
      executionStatus: 0,
    },
    output: { updatedAt: D.ts },
    body: true,
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
  operationName: "UpdateOnlineEvaluationConfig",
})) as any;

export type UpdatePaymentConnectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | SubscriptionRequiredException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing payment connector. This operation uses PATCH semantics, so you only need to specify the fields you want to change.
 */
export const updatePaymentConnector: API.OperationMethod<
  UpdatePaymentConnectorRequest,
  UpdatePaymentConnectorResponse,
  UpdatePaymentConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /payments/managers/{paymentManagerId}/connectors/{paymentConnectorId}",
    input: {
      paymentManagerId: 0,
      paymentConnectorId: 0,
      description: 0,
      type: 0,
      credentialProviderConfigurations: D.list(
        i_CredentialsProviderConfiguration,
      ),
      clientToken: D.m({ idempotency: true }),
    },
    output: { lastUpdatedAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    SubscriptionRequiredException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePaymentConnector",
})) as any;

export type UpdatePaymentCredentialProviderError =
  | AccessDeniedException
  | ConflictException
  | DecryptionFailure
  | EncryptionFailure
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing payment credential provider with new authentication credentials.
 */
export const updatePaymentCredentialProvider: API.OperationMethod<
  UpdatePaymentCredentialProviderRequest,
  UpdatePaymentCredentialProviderResponse,
  UpdatePaymentCredentialProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/UpdatePaymentCredentialProvider",
    input: {
      name: 0,
      credentialProviderVendor: 0,
      providerConfigurationInput: i_PaymentProviderConfigurationInput,
    },
    output: { createdTime: D.ts, lastUpdatedTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DecryptionFailure,
    EncryptionFailure,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePaymentCredentialProvider",
})) as any;

export type UpdatePaymentManagerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing payment manager. This operation uses PATCH semantics, so you only need to specify the fields you want to change.
 */
export const updatePaymentManager: API.OperationMethod<
  UpdatePaymentManagerRequest,
  UpdatePaymentManagerResponse,
  UpdatePaymentManagerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /payments/managers/{paymentManagerId}",
    input: {
      paymentManagerId: 0,
      description: 0,
      authorizerType: 0,
      authorizerConfiguration: i_AuthorizerConfiguration,
      roleArn: 0,
      clientToken: D.m({ idempotency: true }),
      kmsKeyArn: 0,
    },
    output: { lastUpdatedAt: D.ts },
    body: true,
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
  operationName: "UpdatePaymentManager",
})) as any;

export type UpdatePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing policy within the AgentCore Policy system. This operation allows modification of the policy description and definition while maintaining the policy's identity. The updated policy is validated against the Cedar schema before being applied. This is an asynchronous operation. Use the `GetPolicy` operation to poll the `status` field to track completion.
 *
 * If the updated policy is a temporal policy, the policy engine invalidates all active temporal sessions. If the update adds or removes temporal operators, the policy engine also invalidates active temporal sessions. For more information about temporal policy sessions, see session-based temporal policies. The policy engine returns an HTTP 409 `ConflictException` to in-flight sessions. To resume, you must start a new session with a new session ID.
 */
export const updatePolicy: API.OperationMethod<
  UpdatePolicyRequest,
  UpdatePolicyResponse,
  UpdatePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /policy-engines/{policyEngineId}/policies/{policyId}",
    input: {
      policyEngineId: 0,
      policyId: 0,
      description: i_UpdatedDescription,
      definition: i_PolicyDefinition,
      validationMode: 0,
      enforcementMode: 0,
    },
    output: { createdAt: D.ts, updatedAt: D.ts, description: D.secret },
    body: true,
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
  operationName: "UpdatePolicy",
})) as any;

export type UpdatePolicyEngineError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing policy engine within the AgentCore Policy system. This operation allows modification of the policy engine description while maintaining its identity. This is an asynchronous operation. Use the `GetPolicyEngine` operation to poll the `status` field to track completion.
 */
export const updatePolicyEngine: API.OperationMethod<
  UpdatePolicyEngineRequest,
  UpdatePolicyEngineResponse,
  UpdatePolicyEngineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /policy-engines/{policyEngineId}",
    input: { policyEngineId: 0, description: i_UpdatedDescription },
    output: { createdAt: D.ts, updatedAt: D.ts, description: D.secret },
    body: true,
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
  operationName: "UpdatePolicyEngine",
})) as any;

export type UpdateRegistryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing registry. This operation uses PATCH semantics, so you only need to specify the fields you want to change.
 */
export const updateRegistry: API.OperationMethod<
  UpdateRegistryRequest,
  UpdateRegistryResponse,
  UpdateRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /registries/{registryId}",
    input: {
      registryId: 0,
      name: 0,
      description: i_UpdatedDescription,
      authorizerConfiguration: i_UpdatedAuthorizerConfiguration,
      approvalConfiguration: { optionalValue: i_ApprovalConfiguration },
    },
    output: { description: D.secret, createdAt: D.ts, updatedAt: D.ts },
    body: true,
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
  operationName: "UpdateRegistry",
})) as any;

export type UpdateRegistryRecordError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing registry record. This operation uses PATCH semantics, so you only need to specify the fields you want to change. The update is processed asynchronously and returns HTTP 202 Accepted.
 */
export const updateRegistryRecord: API.OperationMethod<
  UpdateRegistryRecordRequest,
  UpdateRegistryRecordResponse,
  UpdateRegistryRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /registries/{registryId}/records/{recordId}",
    input: {
      registryId: 0,
      recordId: 0,
      name: 0,
      description: i_UpdatedDescription,
      descriptorType: 0,
      descriptors: {
        optionalValue: {
          mcp: {
            optionalValue: {
              server: { optionalValue: i_ServerDefinition },
              tools: { optionalValue: i_ToolsDefinition },
            },
          },
          a2a: { optionalValue: i_A2aDescriptor },
          custom: { optionalValue: i_CustomDescriptor },
          agentSkills: {
            optionalValue: {
              skillMd: { optionalValue: i_SkillMdDefinition },
              skillDefinition: { optionalValue: i_SkillDefinition },
            },
          },
        },
      },
      recordVersion: 0,
      synchronizationType: { optionalValue: 0 },
      synchronizationConfiguration: {
        optionalValue: i_SynchronizationConfiguration,
      },
      triggerSynchronization: 0,
    },
    output: { description: D.secret, createdAt: D.ts, updatedAt: D.ts },
    body: true,
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
  operationName: "UpdateRegistryRecord",
})) as any;

export type UpdateRegistryRecordStatusError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the status of a registry record. Use this operation to approve, reject, or deprecate a registry record.
 */
export const updateRegistryRecordStatus: API.OperationMethod<
  UpdateRegistryRecordStatusRequest,
  UpdateRegistryRecordStatusResponse,
  UpdateRegistryRecordStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /registries/{registryId}/records/{recordId}/status",
    input: { registryId: 0, recordId: 0, status: 0, statusReason: 0 },
    output: { updatedAt: D.ts },
    body: true,
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
  operationName: "UpdateRegistryRecordStatus",
})) as any;

export type UpdateWorkloadIdentityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing workload identity.
 */
export const updateWorkloadIdentity: API.OperationMethod<
  UpdateWorkloadIdentityRequest,
  UpdateWorkloadIdentityResponse,
  UpdateWorkloadIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/UpdateWorkloadIdentity",
    input: { name: 0, allowedResourceOauth2ReturnUrls: 0 },
    output: { createdTime: D.ts, lastUpdatedTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkloadIdentity",
})) as any;

const i_A2aDescriptor: D.LazyStruct = () => ({
  agentCard: { schemaVersion: 0, inlineContent: 0 },
});
const i_Action: D.LazyStruct = () => ({
  configurationBundle: {
    staticOverride: { bundleArn: 0, bundleVersion: 0 },
    weightedOverride: {
      trafficSplit: D.list({
        name: 0,
        weight: 0,
        configurationBundle: { bundleArn: 0, bundleVersion: 0 },
        description: 0,
        metadata: 0,
      }),
    },
  },
  routeToTarget: {
    staticRoute: { targetName: 0 },
    weightedRoute: {
      trafficSplit: D.list({
        name: 0,
        weight: 0,
        targetName: 0,
        description: 0,
        metadata: 0,
      }),
    },
  },
});
const i_AgentRuntimeArtifact: D.LazyStruct = () => ({
  containerConfiguration: i_ContainerConfiguration,
  codeConfiguration: { code: { s3: i_S3Location }, runtime: 0, entryPoint: 0 },
});
const i_ApprovalConfiguration: D.LazyStruct = () => ({ autoApproval: 0 });
const i_AuthorizerConfiguration: D.LazyStruct = () => ({
  customJWTAuthorizer: {
    discoveryUrl: 0,
    allowedAudience: 0,
    allowedClients: 0,
    allowedScopes: 0,
    advertisedScopeMapping: 0,
    customClaims: D.list({
      inboundTokenClaimName: 0,
      inboundTokenClaimValueType: 0,
      authorizingClaimMatchValue: {
        claimMatchValue: { matchValueString: 0, matchValueStringList: 0 },
        claimMatchOperator: 0,
      },
    }),
    privateEndpoint: i_PrivateEndpoint,
    privateEndpointOverrides: D.list(i_PrivateEndpointOverride),
    allowedWorkloadConfiguration: {
      hostingEnvironments: D.list({ arn: 0 }),
      workloadIdentities: 0,
    },
  },
});
const i_CapacityProviderConfiguration: D.LazyStruct = () => ({
  capacityProviderArn: 0,
});
const i_Certificate: D.LazyStruct = () => ({
  location: { secretsManager: { secretArn: 0 } },
});
const i_ClusteringConfig: D.LazyStruct = () => ({ frequencies: 0 });
const i_ComponentConfiguration: D.LazyStruct = () => ({ configuration: 0 });
const i_Condition: D.LazyStruct = () => ({
  matchPrincipals: { anyOf: D.list({ iamPrincipal: { arn: 0, operator: 0 } }) },
  matchPaths: { anyOf: 0 },
});
const i_CredentialProviderConfiguration: D.LazyStruct = () => ({
  credentialProviderType: 0,
  credentialProvider: {
    oauthCredentialProvider: i_OAuthCredentialProvider,
    apiKeyCredentialProvider: {
      providerArn: 0,
      credentialParameterName: 0,
      credentialPrefix: 0,
      credentialLocation: 0,
    },
    iamCredentialProvider: { service: 0, region: 0 },
  },
});
const i_CredentialsProviderConfiguration: D.LazyStruct = () => ({
  coinbaseCDP: i_PaymentCredentialProviderConfiguration,
  stripePrivy: i_PaymentCredentialProviderConfiguration,
});
const i_CustomDescriptor: D.LazyStruct = () => ({ inlineContent: 0 });
const i_DataSourceConfig: D.LazyStruct = () => ({
  cloudWatchLogs: { logGroupNames: 0, serviceNames: 0 },
});
const i_DataSourceType: D.LazyStruct = () => ({
  inlineExamples: { examples: 0 },
  s3Source: { s3Uri: 0 },
});
const i_EpisodicOverrideConsolidationConfigurationInput: D.LazyStruct = () => ({
  appendToPrompt: 0,
  modelId: 0,
});
const i_EpisodicOverrideExtractionConfigurationInput: D.LazyStruct = () => ({
  appendToPrompt: 0,
  modelId: 0,
});
const i_EpisodicOverrideReflectionConfigurationInput: D.LazyStruct = () => ({
  appendToPrompt: 0,
  modelId: 0,
  namespaces: 0,
  namespaceTemplates: 0,
  memoryRecordSchema: i_MemoryRecordSchema,
});
const i_EpisodicReflectionConfigurationInput: D.LazyStruct = () => ({
  namespaces: 0,
  namespaceTemplates: 0,
  memoryRecordSchema: i_MemoryRecordSchema,
});
const i_EvaluatorConfig: D.LazyStruct = () => ({
  llmAsAJudge: {
    instructions: 0,
    ratingScale: {
      numerical: D.list({ definition: 0, value: 0, label: 0 }),
      categorical: D.list({ definition: 0, label: 0 }),
    },
    modelConfig: i_EvaluatorModelConfig,
  },
  codeBased: { lambdaConfig: { lambdaArn: 0, lambdaTimeoutInSeconds: 0 } },
  derived: { baseEvaluatorId: 0, modelConfig: i_EvaluatorModelConfig },
});
const i_EvaluatorReference: D.LazyStruct = () => ({ evaluatorId: 0 });
const i_FilesystemConfiguration: D.LazyStruct = () => ({
  sessionStorage: { mountPath: 0 },
  s3FilesAccessPoint: { accessPointArn: 0, mountPath: 0 },
  efsAccessPoint: { accessPointArn: 0, mountPath: 0 },
  capacityProviderVolume: { volumeName: 0, mountPath: 0 },
});
const i_GatewayInterceptorConfiguration: D.LazyStruct = () => ({
  interceptor: { lambda: { arn: 0 } },
  interceptionPoints: 0,
  inputConfiguration: {
    passRequestHeaders: 0,
    payloadFilter: { exclude: D.list({ field: 0 }) },
  },
});
const i_GatewayPolicyEngineConfiguration: D.LazyStruct = () => ({
  arn: 0,
  mode: 0,
});
const i_GatewayProtocolConfiguration: D.LazyStruct = () => ({
  mcp: {
    supportedVersions: 0,
    instructions: 0,
    searchType: 0,
    sessionConfiguration: { sessionTimeoutInSeconds: 0 },
    streamingConfiguration: { enableResponseStreaming: 0 },
  },
});
const i_HarnessEnvironmentArtifact: D.LazyStruct = () => ({
  containerConfiguration: i_ContainerConfiguration,
});
const i_HarnessEnvironmentProviderRequest: D.LazyStruct = () => ({
  agentCoreRuntimeEnvironment: {
    lifecycleConfiguration: i_LifecycleConfiguration,
    networkConfiguration: i_NetworkConfiguration,
    filesystemConfigurations: D.list(i_FilesystemConfiguration),
  },
});
const i_HarnessMemoryConfiguration: D.LazyStruct = () => ({
  agentCoreMemoryConfiguration: {
    arn: 0,
    actorId: 0,
    messagesCount: 0,
    retrievalConfig: D.map({ topK: 0, relevanceScore: 0, strategyId: 0 }),
  },
  managedMemoryConfiguration: {
    arn: 0,
    strategies: 0,
    eventExpiryDuration: 0,
    encryptionKeyArn: 0,
  },
  disabled: {},
});
const i_HarnessModelConfiguration: D.LazyStruct = () => ({
  bedrockModelConfig: {
    modelId: 0,
    maxTokens: 0,
    temperature: 0,
    topP: 0,
    apiFormat: 0,
    additionalParams: 0,
  },
  openAiModelConfig: {
    modelId: 0,
    apiKeyArn: 0,
    maxTokens: 0,
    temperature: 0,
    topP: 0,
    apiFormat: 0,
    additionalParams: 0,
  },
  geminiModelConfig: {
    modelId: 0,
    apiKeyArn: 0,
    maxTokens: 0,
    temperature: 0,
    topP: 0,
    topK: 0,
    additionalParams: 0,
  },
  liteLlmModelConfig: {
    modelId: 0,
    apiKeyArn: 0,
    apiBase: 0,
    maxTokens: 0,
    temperature: 0,
    topP: 0,
    additionalParams: 0,
  },
});
const i_HarnessSkill: D.LazyStruct = () => ({
  path: 0,
  s3: { uri: 0 },
  git: { url: 0, path: 0, auth: { credentialArn: 0, username: 0 } },
  awsSkills: { paths: 0 },
});
const i_HarnessSystemContentBlock: D.LazyStruct = () => ({ text: 0 });
const i_HarnessTool: D.LazyStruct = () => ({
  type: 0,
  name: 0,
  config: {
    remoteMcp: { url: 0, headers: 0 },
    agentCoreBrowser: { browserArn: 0 },
    agentCoreGateway: {
      gatewayArn: 0,
      outboundAuth: {
        awsIam: i_Unit,
        none: i_Unit,
        oauth: i_OAuthCredentialProvider,
      },
    },
    inlineFunction: { description: 0, inputSchema: 0 },
    agentCoreCodeInterpreter: { codeInterpreterArn: 0 },
  },
});
const i_HarnessTruncationConfiguration: D.LazyStruct = () => ({
  strategy: 0,
  config: {
    slidingWindow: { messagesCount: 0 },
    summarization: {
      summaryRatio: 0,
      preserveRecentMessages: 0,
      summarizationSystemPrompt: 0,
    },
  },
});
const i_IndexedKey: D.LazyStruct = () => ({ key: 0, type: 0 });
const i_Insight: D.LazyStruct = () => ({ insightId: 0 });
const i_LifecycleConfiguration: D.LazyStruct = () => ({
  idleRuntimeSessionTimeout: 0,
  maxLifetime: 0,
});
const i_LimitEntry: D.LazyStruct = () => ({
  dimensions: 0,
  requests: D.list(i_RateConfig),
  tokens: D.list(i_RateConfig),
  connections: D.list(i_RateConfig),
});
const i_MemoryRecordSchema: D.LazyStruct = () => ({
  metadataSchema: D.list({
    key: 0,
    type: 0,
    extractionType: 0,
    extractionConfig: {
      llmExtractionConfig: {
        llmExtractionInstruction: 0,
        definition: 0,
        validation: {
          stringValidation: { allowedValues: 0 },
          stringListValidation: { allowedValues: 0, maxItems: 0 },
          numberValidation: { minValue: 0, maxValue: 0 },
        },
      },
    },
  }),
});
const i_MemoryStrategyInput: D.LazyStruct = () => ({
  semanticMemoryStrategy: {
    name: 0,
    description: 0,
    namespaces: 0,
    namespaceTemplates: 0,
    memoryRecordSchema: i_MemoryRecordSchema,
  },
  summaryMemoryStrategy: {
    name: 0,
    description: 0,
    namespaces: 0,
    namespaceTemplates: 0,
    memoryRecordSchema: i_MemoryRecordSchema,
  },
  userPreferenceMemoryStrategy: {
    name: 0,
    description: 0,
    namespaces: 0,
    namespaceTemplates: 0,
    memoryRecordSchema: i_MemoryRecordSchema,
  },
  customMemoryStrategy: {
    name: 0,
    description: 0,
    namespaces: 0,
    namespaceTemplates: 0,
    configuration: {
      semanticOverride: {
        extraction: i_SemanticOverrideExtractionConfigurationInput,
        consolidation: i_SemanticOverrideConsolidationConfigurationInput,
      },
      summaryOverride: {
        consolidation: i_SummaryOverrideConsolidationConfigurationInput,
      },
      userPreferenceOverride: {
        extraction: i_UserPreferenceOverrideExtractionConfigurationInput,
        consolidation: i_UserPreferenceOverrideConsolidationConfigurationInput,
      },
      episodicOverride: {
        extraction: i_EpisodicOverrideExtractionConfigurationInput,
        consolidation: i_EpisodicOverrideConsolidationConfigurationInput,
        reflection: i_EpisodicOverrideReflectionConfigurationInput,
      },
      selfManagedConfiguration: {
        triggerConditions: D.list(i_TriggerConditionInput),
        invocationConfiguration: { topicArn: 0, payloadDeliveryBucketName: 0 },
        historicalContextWindowSize: 0,
      },
    },
    memoryRecordSchema: i_MemoryRecordSchema,
  },
  episodicMemoryStrategy: {
    name: 0,
    description: 0,
    namespaces: 0,
    namespaceTemplates: 0,
    reflectionConfiguration: i_EpisodicReflectionConfigurationInput,
    memoryRecordSchema: i_MemoryRecordSchema,
  },
});
const i_MetadataConfiguration: D.LazyStruct = () => ({
  allowedRequestHeaders: 0,
  allowedQueryParameters: 0,
  allowedResponseHeaders: 0,
});
const i_NamespaceKeyEntry: D.LazyStruct = () => ({
  key: 0,
  validation: { allowedValues: 0, regexPattern: 0 },
});
const i_NetworkConfiguration: D.LazyStruct = () => ({
  networkMode: 0,
  networkModeConfig: i_VpcConfig,
});
const i_Oauth2ProviderConfigInput: D.LazyStruct = () => ({
  customOauth2ProviderConfig: {
    oauthDiscovery: {
      discoveryUrl: 0,
      authorizationServerMetadata: {
        issuer: 0,
        authorizationEndpoint: 0,
        tokenEndpoint: 0,
        responseTypes: 0,
        tokenEndpointAuthMethods: 0,
      },
    },
    clientId: 0,
    clientSecret: 0,
    clientSecretConfig: i_SecretReference,
    clientSecretSource: 0,
    onBehalfOfTokenExchangeConfig: {
      grantType: 0,
      tokenExchangeGrantTypeConfig: {
        actorTokenContent: 0,
        actorTokenScopes: 0,
      },
    },
    clientAuthenticationMethod: 0,
    privateKeyJwtConfig: {
      privateKeySource: { kmsKeySource: { kmsKeyArn: 0 } },
      signingAlgorithm: 0,
      additionalHeaderClaims: 0,
      additionalPayloadClaims: 0,
    },
    privateEndpoint: i_PrivateEndpoint,
    privateEndpointOverrides: D.list(i_PrivateEndpointOverride),
  },
  googleOauth2ProviderConfig: {
    clientId: 0,
    clientSecret: 0,
    clientSecretConfig: i_SecretReference,
    clientSecretSource: 0,
  },
  githubOauth2ProviderConfig: {
    clientId: 0,
    clientSecret: 0,
    clientSecretConfig: i_SecretReference,
    clientSecretSource: 0,
  },
  slackOauth2ProviderConfig: {
    clientId: 0,
    clientSecret: 0,
    clientSecretConfig: i_SecretReference,
    clientSecretSource: 0,
  },
  salesforceOauth2ProviderConfig: {
    clientId: 0,
    clientSecret: 0,
    clientSecretConfig: i_SecretReference,
    clientSecretSource: 0,
  },
  microsoftOauth2ProviderConfig: {
    clientId: 0,
    clientSecret: 0,
    clientSecretConfig: i_SecretReference,
    clientSecretSource: 0,
    tenantId: 0,
  },
  atlassianOauth2ProviderConfig: {
    clientId: 0,
    clientSecret: 0,
    clientSecretConfig: i_SecretReference,
    clientSecretSource: 0,
  },
  linkedinOauth2ProviderConfig: {
    clientId: 0,
    clientSecret: 0,
    clientSecretConfig: i_SecretReference,
    clientSecretSource: 0,
  },
  includedOauth2ProviderConfig: {
    clientId: 0,
    clientSecret: 0,
    clientSecretConfig: i_SecretReference,
    clientSecretSource: 0,
    issuer: 0,
    authorizationEndpoint: 0,
    tokenEndpoint: 0,
  },
});
const i_PaymentProviderConfigurationInput: D.LazyStruct = () => ({
  coinbaseCdpConfiguration: {
    apiKeyId: 0,
    apiKeySecret: 0,
    apiKeySecretSource: 0,
    apiKeySecretConfig: i_SecretReference,
    walletSecret: 0,
    walletSecretSource: 0,
    walletSecretConfig: i_SecretReference,
  },
  stripePrivyConfiguration: {
    appId: 0,
    appSecret: 0,
    appSecretSource: 0,
    appSecretConfig: i_SecretReference,
    authorizationPrivateKey: 0,
    authorizationPrivateKeySource: 0,
    authorizationPrivateKeyConfig: i_SecretReference,
    authorizationId: 0,
  },
});
const i_PolicyDefinition: D.LazyStruct = () => ({
  cedar: { statement: 0 },
  policyGeneration: { policyGenerationId: 0, policyGenerationAssetId: 0 },
  policy: { statement: 0 },
});
const i_PrivateEndpoint: D.LazyStruct = () => ({
  selfManagedLatticeResource: { resourceConfigurationIdentifier: 0 },
  managedVpcResource: {
    vpcIdentifier: 0,
    subnetIds: 0,
    endpointIpAddressType: 0,
    securityGroupIds: 0,
    tags: 0,
    routingDomain: 0,
  },
});
const i_ProtocolConfiguration: D.LazyStruct = () => ({ serverProtocol: 0 });
const i_RequestHeaderConfiguration: D.LazyStruct = () => ({
  requestHeaderAllowlist: 0,
});
const i_Rule: D.LazyStruct = () => ({
  samplingConfig: { samplingPercentage: 0 },
  filters: D.list({
    key: 0,
    operator: 0,
    value: { stringValue: 0, doubleValue: 0, booleanValue: 0 },
  }),
  sessionConfig: { sessionTimeoutMinutes: 0 },
});
const i_S3Location: D.LazyStruct = () => ({
  bucket: 0,
  prefix: 0,
  versionId: 0,
});
const i_SecretReference: D.LazyStruct = () => ({ secretId: 0, jsonKey: 0 });
const i_SemanticOverrideConsolidationConfigurationInput: D.LazyStruct = () => ({
  appendToPrompt: 0,
  modelId: 0,
});
const i_SemanticOverrideExtractionConfigurationInput: D.LazyStruct = () => ({
  appendToPrompt: 0,
  modelId: 0,
});
const i_ServerDefinition: D.LazyStruct = () => ({
  schemaVersion: 0,
  inlineContent: 0,
});
const i_SkillDefinition: D.LazyStruct = () => ({
  schemaVersion: 0,
  inlineContent: 0,
});
const i_SkillMdDefinition: D.LazyStruct = () => ({ inlineContent: 0 });
const i_StreamDeliveryResources: D.LazyStruct = () => ({
  resources: D.list({
    kinesis: {
      dataStreamArn: 0,
      contentConfigurations: D.list({ type: 0, level: 0 }),
    },
  }),
});
const i_SummaryOverrideConsolidationConfigurationInput: D.LazyStruct = () => ({
  appendToPrompt: 0,
  modelId: 0,
});
const i_SynchronizationConfiguration: D.LazyStruct = () => ({
  fromUrl: {
    url: 0,
    credentialProviderConfigurations: D.list({
      credentialProviderType: 0,
      credentialProvider: {
        oauthCredentialProvider: {
          providerArn: 0,
          grantType: 0,
          scopes: 0,
          customParameters: 0,
        },
        iamCredentialProvider: { roleArn: 0, service: 0, region: 0 },
      },
    }),
  },
});
const i_TargetConfiguration: D.LazyStruct = () => ({
  mcp: {
    openApiSchema: i_ApiSchemaConfiguration,
    smithyModel: i_ApiSchemaConfiguration,
    lambda: {
      lambdaArn: 0,
      toolSchema: {
        s3: i_S3Configuration,
        inlinePayload: D.list({
          name: 0,
          description: 0,
          inputSchema: i_SchemaDefinition,
          outputSchema: i_SchemaDefinition,
        }),
      },
    },
    mcpServer: {
      endpoint: 0,
      mcpToolSchema: { s3: i_S3Configuration, inlinePayload: 0 },
      listingMode: 0,
      resourcePriority: 0,
    },
    apiGateway: {
      restApiId: 0,
      stage: 0,
      apiGatewayToolConfiguration: {
        toolOverrides: D.list({ name: 0, description: 0, path: 0, method: 0 }),
        toolFilters: D.list({ filterPath: 0, methods: 0 }),
      },
    },
    connector: {
      source: { connectorId: 0, version: 0 },
      enabled: 0,
      configurations: D.list({
        name: 0,
        description: 0,
        parameterValues: 0,
        parameterOverrides: D.list({ path: 0, description: 0, visible: 0 }),
      }),
    },
  },
  http: {
    agentcoreRuntime: {
      arn: 0,
      qualifier: 0,
      schema: i_HttpApiSchemaConfiguration,
    },
    passthrough: {
      endpoint: 0,
      protocolType: 0,
      schema: i_HttpApiSchemaConfiguration,
      stickinessConfiguration: {
        identifier: 0,
        timeout: 0,
        compositeIdentifier: 0,
      },
      staticQueryParameters: 0,
      staticQueryParameterConflictResolution: 0,
    },
    connector: { source: { connectorId: 0 }, parameters: 0 },
  },
  inference: {
    connector: { source: { connectorId: 0 } },
    provider: {
      endpoint: 0,
      modelMapping: { providerPrefix: { strip: 0, separator: 0 } },
      operations: D.list({
        path: 0,
        providerPath: 0,
        models: D.list({ model: 0 }),
      }),
    },
  },
});
const i_ToolsDefinition: D.LazyStruct = () => ({
  protocolVersion: 0,
  inlineContent: 0,
});
const i_ToolsFileSystemConfiguration: D.LazyStruct = () => ({
  s3FilesConfiguration: { accessPointArn: 0, mountPath: 0, fileSystemArn: 0 },
  efsConfiguration: { accessPointArn: 0, mountPath: 0, fileSystemArn: 0 },
});
const i_TriggerConditionInput: D.LazyStruct = () => ({
  messageBasedTrigger: { messageCount: 0 },
  tokenBasedTrigger: { tokenCount: 0 },
  timeBasedTrigger: { idleSessionTimeout: 0 },
});
const i_UpdatedAuthorizerConfiguration: D.LazyStruct = () => ({
  optionalValue: i_AuthorizerConfiguration,
});
const i_UpdatedDescription: D.LazyStruct = () => ({ optionalValue: 0 });
const i_UserPreferenceOverrideConsolidationConfigurationInput: D.LazyStruct =
  () => ({ appendToPrompt: 0, modelId: 0 });
const i_UserPreferenceOverrideExtractionConfigurationInput: D.LazyStruct =
  () => ({ appendToPrompt: 0, modelId: 0 });
const i_VersionCreatedBySource: D.LazyStruct = () => ({ name: 0, arn: 0 });
const i_VpcConfig: D.LazyStruct = () => ({
  securityGroups: 0,
  subnets: 0,
  requireServiceS3Endpoint: 0,
});
const o_Action: D.LazyStruct = () => ({
  routeToTarget: {
    staticRoute: { targetName: D.secret },
    weightedRoute: { trafficSplit: D.list({ targetName: D.secret }) },
  },
});
const o_AgentRuntime: D.LazyStruct = () => ({
  description: D.secret,
  lastUpdatedAt: D.ts,
});
const o_CredentialProviderConfiguration: D.LazyStruct = () => ({
  credentialProvider: { oauthCredentialProvider: o_OAuthCredentialProvider },
});
const o_GatewayProtocolConfiguration: D.LazyStruct = () => ({
  mcp: { instructions: D.secret },
});
const o_GatewayRateLimitDetail: D.LazyStruct = () => ({
  createdAt: D.ts,
  updatedAt: D.ts,
});
const o_Harness: D.LazyStruct = () => ({
  createdAt: D.ts,
  updatedAt: D.ts,
  model: { liteLlmModelConfig: { apiBase: D.secret } },
  systemPrompt: D.list({ text: D.secret }),
  tools: D.list({
    config: {
      remoteMcp: { url: D.secret },
      agentCoreGateway: { outboundAuth: { oauth: o_OAuthCredentialProvider } },
      inlineFunction: { description: D.secret },
    },
  }),
});
const o_HarnessEndpoint: D.LazyStruct = () => ({
  createdAt: D.ts,
  updatedAt: D.ts,
});
const o_Memory: D.LazyStruct = () => ({
  description: D.secret,
  createdAt: D.ts,
  updatedAt: D.ts,
  strategies: D.list({
    description: D.secret,
    configuration: {
      extraction: {
        customExtractionConfiguration: {
          semanticExtractionOverride: { appendToPrompt: D.secret },
          userPreferenceExtractionOverride: { appendToPrompt: D.secret },
          episodicExtractionOverride: { appendToPrompt: D.secret },
        },
      },
      consolidation: {
        customConsolidationConfiguration: {
          semanticConsolidationOverride: { appendToPrompt: D.secret },
          summaryConsolidationOverride: { appendToPrompt: D.secret },
          userPreferenceConsolidationOverride: { appendToPrompt: D.secret },
          episodicConsolidationOverride: { appendToPrompt: D.secret },
        },
      },
      reflection: {
        customReflectionConfiguration: {
          episodicReflectionOverride: {
            appendToPrompt: D.secret,
            memoryRecordSchema: o_MemoryRecordSchema,
          },
        },
        episodicReflectionConfiguration: {
          memoryRecordSchema: o_MemoryRecordSchema,
        },
      },
    },
    createdAt: D.ts,
    updatedAt: D.ts,
    memoryRecordSchema: o_MemoryRecordSchema,
  }),
});
const o_Oauth2ProviderConfigOutput: D.LazyStruct = () => ({
  customOauth2ProviderConfig: {
    privateKeyJwtConfig: {
      additionalHeaderClaims: D.map(D.secret),
      additionalPayloadClaims: D.map(D.secret),
    },
  },
});
const o_TargetConfiguration: D.LazyStruct = () => ({
  mcp: {
    openApiSchema: o_ApiSchemaConfiguration,
    smithyModel: o_ApiSchemaConfiguration,
    mcpServer: { mcpToolSchema: { inlinePayload: D.secret } },
  },
  http: {
    agentcoreRuntime: { schema: o_HttpApiSchemaConfiguration },
    passthrough: {
      schema: o_HttpApiSchemaConfiguration,
      staticQueryParameters: D.map(D.secret),
    },
  },
});
const i_ApiSchemaConfiguration: D.LazyStruct = () => ({
  s3: i_S3Configuration,
  inlinePayload: 0,
});
const i_ContainerConfiguration: D.LazyStruct = () => ({ containerUri: 0 });
const i_EvaluatorModelConfig: D.LazyStruct = () => ({
  bedrockEvaluatorModelConfig: {
    modelId: 0,
    inferenceConfig: {
      maxTokens: 0,
      temperature: 0,
      topP: 0,
      stopSequences: 0,
    },
    additionalModelRequestFields: 0,
  },
  responsesEvaluatorModelConfig: {
    modelId: 0,
    maxOutputTokens: 0,
    temperature: 0,
    topP: 0,
    reasoning: { effort: 0 },
  },
});
const i_HttpApiSchemaConfiguration: D.LazyStruct = () => ({
  source: i_ApiSchemaConfiguration,
});
const i_OAuthCredentialProvider: D.LazyStruct = () => ({
  providerArn: 0,
  scopes: 0,
  customParameters: 0,
  grantType: 0,
  defaultReturnUrl: 0,
});
const i_PaymentCredentialProviderConfiguration: D.LazyStruct = () => ({
  credentialProviderArn: 0,
});
const i_PrivateEndpointOverride: D.LazyStruct = () => ({
  domain: 0,
  privateEndpoint: i_PrivateEndpoint,
});
const i_RateConfig: D.LazyStruct = () => ({ rate: 0, period: 0 });
const i_S3Configuration: D.LazyStruct = () => ({
  uri: 0,
  bucketOwnerAccountId: 0,
});
const i_SchemaDefinition: D.LazyStruct = () => ({
  type: 0,
  properties: D.map(i_SchemaDefinition),
  required: 0,
  items: i_SchemaDefinition,
  description: 0,
});
const i_Unit: D.LazyStruct = () => ({});
const o_ApiSchemaConfiguration: D.LazyStruct = () => ({
  inlinePayload: D.secret,
});
const o_HttpApiSchemaConfiguration: D.LazyStruct = () => ({
  source: o_ApiSchemaConfiguration,
});
const o_MemoryRecordSchema: D.LazyStruct = () => ({
  metadataSchema: D.list({
    extractionConfig: {
      llmExtractionConfig: {
        llmExtractionInstruction: D.secret,
        definition: D.secret,
      },
    },
  }),
});
const o_OAuthCredentialProvider: D.LazyStruct = () => ({
  customParameters: D.map(D.secret),
});
