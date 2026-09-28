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
  sdkId: "EKS",
  target: "AWSWesleyFrontend",
  version: "2017-11-01",
  sigv4: "eks",
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
                `https://eks-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws") {
                return e(`https://fips.eks.${Region}.amazonaws.com`);
              }
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(`https://eks.${Region}.amazonaws.com`);
              }
              return e(
                `https://eks-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://eks.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://eks.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ClientException
  extends /*@__PURE__*/ TE.TaggedError("ClientException", ["BadRequestError"], {
    status: 400,
  })<{
    readonly clusterName?: string;
    readonly nodegroupName?: string;
    readonly addonName?: string;
    readonly subscriptionId?: string;
    readonly message?: string;
  }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly clusterName?: string;
    readonly nodegroupName?: string;
    readonly fargateProfileName?: string;
    readonly addonName?: string;
    readonly subscriptionId?: string;
    readonly message?: string;
  }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly clusterName?: string;
    readonly nodegroupName?: string;
    readonly addonName?: string;
    readonly subscriptionId?: string;
    readonly message?: string;
  }> {}
export class InvalidStateException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidStateException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly clusterName?: string; readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceInUseException",
    ["ConflictError"],
    { status: 409 },
  )<{
    readonly clusterName?: string;
    readonly nodegroupName?: string;
    readonly addonName?: string;
    readonly message?: string;
  }> {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly clusterName?: string;
    readonly nodegroupName?: string;
    readonly subscriptionId?: string;
    readonly message?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly clusterName?: string;
    readonly nodegroupName?: string;
    readonly fargateProfileName?: string;
    readonly addonName?: string;
    readonly subscriptionId?: string;
    readonly message?: string;
  }> {}
export class ResourcePropagationDelayException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourcePropagationDelayException",
    [],
    { status: 428 },
  )<{ readonly message?: string }> {}
export class ServerException
  extends /*@__PURE__*/ TE.TaggedError("ServerException", ["ServerError"], {
    status: 500,
  })<{
    readonly clusterName?: string;
    readonly nodegroupName?: string;
    readonly addonName?: string;
    readonly subscriptionId?: string;
    readonly message?: string;
  }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { status: 503 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly clusterName?: string; readonly message?: string }> {}
export class UnsupportedAvailabilityZoneException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedAvailabilityZoneException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message?: string;
    readonly clusterName?: string;
    readonly nodegroupName?: string;
    readonly validZones?: string[];
  }> {}
export interface ActivateCertificateAuthorityRequest {
  clusterName: string;
  certificateAuthorityId: string;
  clientRequestToken?: string;
}
export type UpdateStatus =
  | "InProgress"
  | "Failed"
  | "Cancelled"
  | "Successful"
  | (string & {});
export type UpdateType =
  | "VersionUpdate"
  | "EndpointAccessUpdate"
  | "LoggingUpdate"
  | "ConfigUpdate"
  | "AssociateIdentityProviderConfig"
  | "DisassociateIdentityProviderConfig"
  | "AssociateEncryptionConfig"
  | "AddonUpdate"
  | "VpcConfigUpdate"
  | "AccessConfigUpdate"
  | "UpgradePolicyUpdate"
  | "ZonalShiftConfigUpdate"
  | "AutoModeUpdate"
  | "RemoteNetworkConfigUpdate"
  | "DeletionProtectionUpdate"
  | "CapabilityUpdate"
  | "ControlPlaneScalingConfigUpdate"
  | "VendedLogsUpdate"
  | "ControlPlaneEgressUpdate"
  | "VersionRollback"
  | "ControlPlaneComponentConfigUpdate"
  | "CertificateAuthorityUpdate"
  | (string & {});
export type UpdateParamType =
  | "Version"
  | "PlatformVersion"
  | "EndpointPrivateAccess"
  | "EndpointPublicAccess"
  | "ClusterLogging"
  | "DesiredSize"
  | "LabelsToAdd"
  | "LabelsToRemove"
  | "TaintsToAdd"
  | "TaintsToRemove"
  | "MaxSize"
  | "MinSize"
  | "ReleaseVersion"
  | "PublicAccessCidrs"
  | "LaunchTemplateName"
  | "LaunchTemplateVersion"
  | "IdentityProviderConfig"
  | "EncryptionConfig"
  | "AddonVersion"
  | "ServiceAccountRoleArn"
  | "ResolveConflicts"
  | "MaxUnavailable"
  | "MaxUnavailablePercentage"
  | "NodeRepairEnabled"
  | "UpdateStrategy"
  | "ConfigurationValues"
  | "SecurityGroups"
  | "Subnets"
  | "AuthenticationMode"
  | "PodIdentityAssociations"
  | "UpgradePolicy"
  | "ZonalShiftConfig"
  | "ComputeConfig"
  | "StorageConfig"
  | "KubernetesNetworkConfig"
  | "RemoteNetworkConfig"
  | "DeletionProtection"
  | "NodeRepairConfig"
  | "RoleArn"
  | "RoleMappingsToAddOrUpdate"
  | "RoleMappingsToRemove"
  | "NetworkAccess"
  | "VendedLogs"
  | "UpdatedTier"
  | "PreviousTier"
  | "WarmPoolEnabled"
  | "WarmPoolMaxGroupPreparedCapacity"
  | "WarmPoolMinSize"
  | "WarmPoolState"
  | "WarmPoolReuseOnScaleIn"
  | "ControlPlaneEgressMode"
  | "KubeApiServerConfig"
  | "KubeSchedulerConfig"
  | "KubeControllerManagerConfig"
  | "ActiveCertificateAuthority"
  | "TrustedCertificateAuthorities"
  | "CertificateAuthorityId"
  | "SigningStatus"
  | (string & {});
export interface UpdateParam {
  type?: UpdateParamType;
  value?: string;
}
export type UpdateParams = UpdateParam[];
export type ErrorCode =
  | "SubnetNotFound"
  | "SecurityGroupNotFound"
  | "EniLimitReached"
  | "IpNotAvailable"
  | "AccessDenied"
  | "OperationNotPermitted"
  | "VpcIdNotFound"
  | "Unknown"
  | "NodeCreationFailure"
  | "PodEvictionFailure"
  | "InsufficientFreeAddresses"
  | "ClusterUnreachable"
  | "InsufficientNumberOfReplicas"
  | "ConfigurationConflict"
  | "AdmissionRequestDenied"
  | "UnsupportedAddonModification"
  | "K8sResourceNotFound"
  | (string & {});
export type StringList = string[];
export interface ErrorDetail {
  errorCode?: ErrorCode;
  errorMessage?: string;
  resourceIds?: string[];
}
export type ErrorDetails = ErrorDetail[];
export type CancellationStatus =
  | "InProgress"
  | "Failed"
  | "Successful"
  | (string & {});
export interface Cancellation {
  status?: CancellationStatus;
  reason?: string;
}
export interface Update {
  id?: string;
  status?: UpdateStatus;
  type?: UpdateType;
  params?: UpdateParam[];
  createdAt?: Date;
  errors?: ErrorDetail[];
  cancellation?: Cancellation;
}
export type CertificateAuthorityCreatedBy = "EKS" | "CUSTOMER" | (string & {});
export type CertificateAuthorityActivatedBy =
  | "EKS"
  | "CUSTOMER"
  | (string & {});
export type CertificateAuthoritySigningStatus =
  | "NOT_USED"
  | "ACTIVATING"
  | "IN_USE"
  | (string & {});
export type CertificateAuthorityDistributionStatus =
  | "IN_PROGRESS"
  | "COMPLETE"
  | "FAILED"
  | "DELETING"
  | (string & {});
export interface CertificateAuthoritySummary {
  id?: string;
  createdAt?: Date;
  createdBy?: CertificateAuthorityCreatedBy;
  activatedAt?: Date;
  activatedBy?: CertificateAuthorityActivatedBy;
  signingStatus?: CertificateAuthoritySigningStatus;
  distributionStatus?: CertificateAuthorityDistributionStatus;
}
export interface ActivateCertificateAuthorityResponse {
  update?: Update;
  certificateAuthority?: CertificateAuthoritySummary;
}
export type AccessScopeType = "cluster" | "namespace" | (string & {});
export interface AccessScope {
  type?: AccessScopeType;
  namespaces?: string[];
}
export interface AssociateAccessPolicyRequest {
  clusterName: string;
  principalArn: string;
  policyArn: string;
  accessScope: AccessScope;
}
export interface AssociatedAccessPolicy {
  policyArn?: string;
  accessScope?: AccessScope;
  associatedAt?: Date;
  modifiedAt?: Date;
}
export interface AssociateAccessPolicyResponse {
  clusterName?: string;
  principalArn?: string;
  associatedAccessPolicy?: AssociatedAccessPolicy;
}
export interface Provider {
  keyArn?: string;
}
export interface EncryptionConfig {
  resources?: string[];
  provider?: Provider;
}
export type EncryptionConfigList = EncryptionConfig[];
export interface AssociateEncryptionConfigRequest {
  clusterName: string;
  encryptionConfig: EncryptionConfig[];
  clientRequestToken?: string;
}
export interface AssociateEncryptionConfigResponse {
  update?: Update;
}
export type RequiredClaimsKey = string;
export type RequiredClaimsValue = string;
export type RequiredClaimsMap = { [key: string]: string | undefined };
export interface OidcIdentityProviderConfigRequest {
  identityProviderConfigName: string;
  issuerUrl: string;
  clientId: string;
  usernameClaim?: string;
  usernamePrefix?: string;
  groupsClaim?: string;
  groupsPrefix?: string;
  requiredClaims?: { [key: string]: string | undefined };
}
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface AssociateIdentityProviderConfigRequest {
  clusterName: string;
  oidc: OidcIdentityProviderConfigRequest;
  tags?: { [key: string]: string | undefined };
  clientRequestToken?: string;
}
export interface AssociateIdentityProviderConfigResponse {
  update?: Update;
  tags?: { [key: string]: string | undefined };
}
export interface CancelUpdateRequest {
  name: string;
  updateId: string;
  clientRequestToken?: string;
}
export interface CancelUpdateResponse {
  update?: Update;
}
export interface CreateAccessEntryRequest {
  clusterName: string;
  principalArn: string;
  kubernetesGroups?: string[];
  tags?: { [key: string]: string | undefined };
  clientRequestToken?: string;
  username?: string;
  type?: string;
}
export interface AccessEntry {
  clusterName?: string;
  principalArn?: string;
  kubernetesGroups?: string[];
  accessEntryArn?: string;
  createdAt?: Date;
  modifiedAt?: Date;
  tags?: { [key: string]: string | undefined };
  username?: string;
  type?: string;
}
export interface CreateAccessEntryResponse {
  accessEntry?: AccessEntry;
}
export type ClusterName = string;
export type RoleArn = string;
export type ResolveConflicts =
  | "OVERWRITE"
  | "NONE"
  | "PRESERVE"
  | (string & {});
export interface AddonPodIdentityAssociations {
  serviceAccount: string;
  roleArn: string;
}
export type AddonPodIdentityAssociationsList = AddonPodIdentityAssociations[];
export type Namespace = string;
export interface AddonNamespaceConfigRequest {
  namespace?: string;
}
export interface CreateAddonRequest {
  clusterName: string;
  addonName: string;
  addonVersion?: string;
  serviceAccountRoleArn?: string;
  resolveConflicts?: ResolveConflicts;
  clientRequestToken?: string;
  tags?: { [key: string]: string | undefined };
  configurationValues?: string;
  podIdentityAssociations?: AddonPodIdentityAssociations[];
  namespaceConfig?: AddonNamespaceConfigRequest;
}
export type AddonStatus =
  | "CREATING"
  | "ACTIVE"
  | "CREATE_FAILED"
  | "UPDATING"
  | "DELETING"
  | "DELETE_FAILED"
  | "DEGRADED"
  | "UPDATE_FAILED"
  | (string & {});
export type AddonIssueCode =
  | "AccessDenied"
  | "InternalFailure"
  | "ClusterUnreachable"
  | "InsufficientNumberOfReplicas"
  | "ConfigurationConflict"
  | "AdmissionRequestDenied"
  | "UnsupportedAddonModification"
  | "K8sResourceNotFound"
  | "AddonSubscriptionNeeded"
  | "AddonPermissionFailure"
  | (string & {});
export interface AddonIssue {
  code?: AddonIssueCode;
  message?: string;
  resourceIds?: string[];
}
export type AddonIssueList = AddonIssue[];
export interface AddonHealth {
  issues?: AddonIssue[];
}
export interface MarketplaceInformation {
  productId?: string;
  productUrl?: string;
}
export interface AddonNamespaceConfigResponse {
  namespace?: string;
}
export interface Addon {
  addonName?: string;
  clusterName?: string;
  status?: AddonStatus;
  addonVersion?: string;
  health?: AddonHealth;
  addonArn?: string;
  createdAt?: Date;
  modifiedAt?: Date;
  serviceAccountRoleArn?: string;
  tags?: { [key: string]: string | undefined };
  publisher?: string;
  owner?: string;
  marketplaceInformation?: MarketplaceInformation;
  configurationValues?: string;
  podIdentityAssociations?: string[];
  namespaceConfig?: AddonNamespaceConfigResponse;
}
export interface CreateAddonResponse {
  addon?: Addon;
}
export type CapabilityType = "ACK" | "KRO" | "ARGOCD" | (string & {});
export interface ArgoCdAwsIdcConfigRequest {
  idcInstanceArn: string;
  idcRegion?: string;
}
export type ArgoCdRole = "ADMIN" | "EDITOR" | "VIEWER" | (string & {});
export type SsoIdentityType = "SSO_USER" | "SSO_GROUP" | (string & {});
export interface SsoIdentity {
  id: string;
  type: SsoIdentityType;
}
export type SsoIdentityList = SsoIdentity[];
export interface ArgoCdRoleMapping {
  role: ArgoCdRole;
  identities: SsoIdentity[];
}
export type ArgoCdRoleMappingList = ArgoCdRoleMapping[];
export interface ArgoCdNetworkAccessConfigRequest {
  vpceIds?: string[];
}
export interface ArgoCdConfigRequest {
  namespace?: string;
  awsIdc: ArgoCdAwsIdcConfigRequest;
  rbacRoleMappings?: ArgoCdRoleMapping[];
  networkAccess?: ArgoCdNetworkAccessConfigRequest;
}
export interface CapabilityConfigurationRequest {
  argoCd?: ArgoCdConfigRequest;
}
export type CapabilityDeletePropagationPolicy = "RETAIN" | (string & {});
export interface CreateCapabilityRequest {
  capabilityName: string;
  clusterName: string;
  clientRequestToken?: string;
  type: CapabilityType;
  roleArn: string;
  configuration?: CapabilityConfigurationRequest;
  tags?: { [key: string]: string | undefined };
  deletePropagationPolicy: CapabilityDeletePropagationPolicy;
}
export type CapabilityStatus =
  | "CREATING"
  | "CREATE_FAILED"
  | "UPDATING"
  | "DELETING"
  | "DELETE_FAILED"
  | "ACTIVE"
  | "DEGRADED"
  | (string & {});
export interface ArgoCdAwsIdcConfigResponse {
  idcInstanceArn?: string;
  idcRegion?: string;
  idcManagedApplicationArn?: string;
}
export interface ArgoCdNetworkAccessConfigResponse {
  vpceIds?: string[];
}
export interface ArgoCdConfigResponse {
  namespace?: string;
  awsIdc?: ArgoCdAwsIdcConfigResponse;
  rbacRoleMappings?: ArgoCdRoleMapping[];
  networkAccess?: ArgoCdNetworkAccessConfigResponse;
  serverUrl?: string;
}
export interface CapabilityConfigurationResponse {
  argoCd?: ArgoCdConfigResponse;
}
export type CapabilityIssueCode =
  | "AccessDenied"
  | "ClusterUnreachable"
  | (string & {});
export interface CapabilityIssue {
  code?: CapabilityIssueCode;
  message?: string;
}
export type CapabilityIssueList = CapabilityIssue[];
export interface CapabilityHealth {
  issues?: CapabilityIssue[];
}
export interface Capability {
  capabilityName?: string;
  arn?: string;
  clusterName?: string;
  type?: CapabilityType;
  roleArn?: string;
  status?: CapabilityStatus;
  version?: string;
  configuration?: CapabilityConfigurationResponse;
  tags?: { [key: string]: string | undefined };
  health?: CapabilityHealth;
  createdAt?: Date;
  modifiedAt?: Date;
  deletePropagationPolicy?: CapabilityDeletePropagationPolicy;
}
export interface CreateCapabilityResponse {
  capability?: Capability;
}
export interface CreateCertificateAuthorityRequest {
  clusterName: string;
  clientRequestToken?: string;
}
export interface CreateCertificateAuthorityResponse {
  update?: Update;
  certificateAuthority?: CertificateAuthoritySummary;
}
export type BoxedBoolean = boolean;
export type ControlPlaneEgressModeType =
  | "AWS_MANAGED"
  | "CUSTOMER_ROUTED"
  | "CUSTOMER_ISOLATED"
  | (string & {});
export interface VpcConfigRequest {
  subnetIds?: string[];
  securityGroupIds?: string[];
  endpointPublicAccess?: boolean;
  endpointPrivateAccess?: boolean;
  publicAccessCidrs?: string[];
  controlPlaneEgressMode?: ControlPlaneEgressModeType;
}
export type IpFamily = "ipv4" | "ipv6" | (string & {});
export interface ElasticLoadBalancing {
  enabled?: boolean;
}
export interface KubernetesNetworkConfigRequest {
  serviceIpv4Cidr?: string;
  ipFamily?: IpFamily;
  elasticLoadBalancing?: ElasticLoadBalancing;
}
export type LogType =
  | "api"
  | "audit"
  | "authenticator"
  | "controllerManager"
  | "scheduler"
  | (string & {});
export type LogTypes = LogType[];
export interface LogSetup {
  types?: LogType[];
  enabled?: boolean;
}
export type LogSetups = LogSetup[];
export interface Logging {
  clusterLogging?: LogSetup[];
}
export type SpreadLevel = "host" | "rack" | (string & {});
export interface ControlPlanePlacementRequest {
  groupName?: string;
  spreadLevel?: SpreadLevel;
}
export interface EtcdPlacementRequest {
  spreadLevel?: SpreadLevel;
}
export interface OutpostConfigRequest {
  outpostArns: string[];
  controlPlaneInstanceType: string;
  controlPlanePlacement?: ControlPlanePlacementRequest;
  etcdInstanceType?: string;
  etcdPlacement?: EtcdPlacementRequest;
}
export type AuthenticationMode =
  | "API"
  | "API_AND_CONFIG_MAP"
  | "CONFIG_MAP"
  | (string & {});
export interface CreateAccessConfigRequest {
  bootstrapClusterCreatorAdminPermissions?: boolean;
  authenticationMode?: AuthenticationMode;
}
export type SupportType = "STANDARD" | "EXTENDED" | (string & {});
export interface UpgradePolicyRequest {
  supportType?: SupportType;
}
export interface ZonalShiftConfigRequest {
  enabled?: boolean;
}
export interface RemoteNodeNetwork {
  cidrs?: string[];
}
export type RemoteNodeNetworkList = RemoteNodeNetwork[];
export interface RemotePodNetwork {
  cidrs?: string[];
}
export type RemotePodNetworkList = RemotePodNetwork[];
export interface RemoteNetworkConfigRequest {
  remoteNodeNetworks?: RemoteNodeNetwork[];
  remotePodNetworks?: RemotePodNetwork[];
}
export interface ComputeConfigRequest {
  enabled?: boolean;
  nodePools?: string[];
  nodeRoleArn?: string;
}
export interface BlockStorage {
  enabled?: boolean;
}
export interface StorageConfigRequest {
  blockStorage?: BlockStorage;
}
export type ProvisionedControlPlaneTier =
  | "standard"
  | "tier-xl"
  | "tier-2xl"
  | "tier-4xl"
  | "tier-8xl"
  | (string & {});
export interface ControlPlaneScalingConfig {
  tier?: ProvisionedControlPlaneTier;
}
export interface ServiceNodePortRange {
  minPort?: number;
  maxPort?: number;
}
export interface KubeApiServerConfigRequest {
  eventTtl?: string;
  serviceNodePortRange?: ServiceNodePortRange;
}
export type ScoringStrategyType =
  | "LeastAllocated"
  | "MostAllocated"
  | (string & {});
export type ResourceWeightName = string;
export type ResourceWeightValue = number;
export interface ResourceWeight {
  name?: string;
  weight?: number;
}
export type ResourceWeightList = ResourceWeight[];
export interface ScoringStrategy {
  type?: ScoringStrategyType;
  resources?: ResourceWeight[];
}
export interface NodeResourcesFitConfig {
  scoringStrategy?: ScoringStrategy;
}
export interface KubeSchedulerConfigRequest {
  nodeResourcesFit?: NodeResourcesFitConfig;
}
export type TerminatedPodGcThresholdValue = number;
export interface PodGcControllerConfigRequest {
  terminatedPodGcThreshold?: number;
}
export interface HorizontalPodAutoscalerControllerConfigRequest {
  horizontalPodAutoscalerSyncPeriod?: string;
}
export interface KubeControllerManagerConfigRequest {
  podGcControllerConfig?: PodGcControllerConfigRequest;
  horizontalPodAutoscalerControllerConfig?: HorizontalPodAutoscalerControllerConfigRequest;
}
export interface CreateClusterRequest {
  name: string;
  version?: string;
  roleArn: string;
  resourcesVpcConfig: VpcConfigRequest;
  kubernetesNetworkConfig?: KubernetesNetworkConfigRequest;
  logging?: Logging;
  clientRequestToken?: string;
  tags?: { [key: string]: string | undefined };
  encryptionConfig?: EncryptionConfig[];
  outpostConfig?: OutpostConfigRequest;
  accessConfig?: CreateAccessConfigRequest;
  bootstrapSelfManagedAddons?: boolean;
  upgradePolicy?: UpgradePolicyRequest;
  zonalShiftConfig?: ZonalShiftConfigRequest;
  remoteNetworkConfig?: RemoteNetworkConfigRequest;
  computeConfig?: ComputeConfigRequest;
  storageConfig?: StorageConfigRequest;
  deletionProtection?: boolean;
  controlPlaneScalingConfig?: ControlPlaneScalingConfig;
  kubeApiServerConfig?: KubeApiServerConfigRequest;
  kubeSchedulerConfig?: KubeSchedulerConfigRequest;
  kubeControllerManagerConfig?: KubeControllerManagerConfigRequest;
}
export interface VpcConfigResponse {
  subnetIds?: string[];
  securityGroupIds?: string[];
  clusterSecurityGroupId?: string;
  vpcId?: string;
  endpointPublicAccess?: boolean;
  endpointPrivateAccess?: boolean;
  publicAccessCidrs?: string[];
  controlPlaneEgressMode?: ControlPlaneEgressModeType;
}
export interface KubernetesNetworkConfigResponse {
  serviceIpv4Cidr?: string;
  serviceIpv6Cidr?: string;
  ipFamily?: IpFamily;
  elasticLoadBalancing?: ElasticLoadBalancing;
}
export interface OIDC {
  issuer?: string;
}
export interface Identity {
  oidc?: OIDC;
}
export type ClusterStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | "UPDATING"
  | "PENDING"
  | (string & {});
export interface ActiveCertificateAuthority {
  id?: string;
  activatedBy?: CertificateAuthorityActivatedBy;
}
export interface Certificate {
  data?: string;
  active?: ActiveCertificateAuthority;
}
export interface ConnectorConfigResponse {
  activationId?: string;
  activationCode?: string;
  activationExpiry?: Date;
  provider?: string;
  roleArn?: string;
}
export type ClusterIssueCode =
  | "AccessDenied"
  | "ClusterUnreachable"
  | "ConfigurationConflict"
  | "InternalFailure"
  | "ResourceLimitExceeded"
  | "ResourceNotFound"
  | "IamRoleNotFound"
  | "VpcNotFound"
  | "InsufficientFreeAddresses"
  | "Ec2ServiceNotSubscribed"
  | "Ec2SubnetNotFound"
  | "Ec2SecurityGroupNotFound"
  | "KmsGrantRevoked"
  | "KmsKeyNotFound"
  | "KmsKeyMarkedForDeletion"
  | "KmsKeyDisabled"
  | "StsRegionalEndpointDisabled"
  | "UnsupportedVersion"
  | "Other"
  | (string & {});
export interface ClusterIssue {
  code?: ClusterIssueCode;
  message?: string;
  resourceIds?: string[];
}
export type ClusterIssueList = ClusterIssue[];
export interface ClusterHealth {
  issues?: ClusterIssue[];
}
export interface ControlPlanePlacementResponse {
  groupName?: string;
  spreadLevel?: SpreadLevel;
}
export interface EtcdPlacementResponse {
  spreadLevel?: SpreadLevel;
}
export interface OutpostConfigResponse {
  outpostArns: string[];
  controlPlaneInstanceType: string;
  controlPlanePlacement?: ControlPlanePlacementResponse;
  etcdInstanceType?: string;
  etcdPlacement?: EtcdPlacementResponse;
}
export interface AccessConfigResponse {
  bootstrapClusterCreatorAdminPermissions?: boolean;
  authenticationMode?: AuthenticationMode;
}
export interface UpgradePolicyResponse {
  supportType?: SupportType;
}
export interface ZonalShiftConfigResponse {
  enabled?: boolean;
}
export interface RemoteNetworkConfigResponse {
  remoteNodeNetworks?: RemoteNodeNetwork[];
  remotePodNetworks?: RemotePodNetwork[];
}
export interface ComputeConfigResponse {
  enabled?: boolean;
  nodePools?: string[];
  nodeRoleArn?: string;
}
export interface StorageConfigResponse {
  blockStorage?: BlockStorage;
}
export interface KubeApiServerConfigResponse {
  eventTtl?: string;
  serviceNodePortRange?: ServiceNodePortRange;
}
export interface KubeSchedulerConfigResponse {
  nodeResourcesFit?: NodeResourcesFitConfig;
}
export interface PodGcControllerConfigResponse {
  terminatedPodGcThreshold?: number;
}
export interface HorizontalPodAutoscalerControllerConfigResponse {
  horizontalPodAutoscalerSyncPeriod?: string;
}
export interface KubeControllerManagerConfigResponse {
  podGcControllerConfig?: PodGcControllerConfigResponse;
  horizontalPodAutoscalerControllerConfig?: HorizontalPodAutoscalerControllerConfigResponse;
}
export interface Cluster {
  name?: string;
  arn?: string;
  createdAt?: Date;
  version?: string;
  endpoint?: string;
  roleArn?: string;
  resourcesVpcConfig?: VpcConfigResponse;
  kubernetesNetworkConfig?: KubernetesNetworkConfigResponse;
  logging?: Logging;
  identity?: Identity;
  status?: ClusterStatus;
  certificateAuthority?: Certificate;
  clientRequestToken?: string;
  platformVersion?: string;
  tags?: { [key: string]: string | undefined };
  encryptionConfig?: EncryptionConfig[];
  connectorConfig?: ConnectorConfigResponse;
  id?: string;
  health?: ClusterHealth;
  outpostConfig?: OutpostConfigResponse;
  accessConfig?: AccessConfigResponse;
  upgradePolicy?: UpgradePolicyResponse;
  zonalShiftConfig?: ZonalShiftConfigResponse;
  remoteNetworkConfig?: RemoteNetworkConfigResponse;
  computeConfig?: ComputeConfigResponse;
  storageConfig?: StorageConfigResponse;
  deletionProtection?: boolean;
  controlPlaneScalingConfig?: ControlPlaneScalingConfig;
  kubeApiServerConfig?: KubeApiServerConfigResponse;
  kubeSchedulerConfig?: KubeSchedulerConfigResponse;
  kubeControllerManagerConfig?: KubeControllerManagerConfigResponse;
}
export interface CreateClusterResponse {
  cluster?: Cluster;
}
export type EksAnywhereSubscriptionName = string;
export type EksAnywhereSubscriptionTermUnit = "MONTHS" | (string & {});
export interface EksAnywhereSubscriptionTerm {
  duration?: number;
  unit?: EksAnywhereSubscriptionTermUnit;
}
export type EksAnywhereSubscriptionLicenseType = "Cluster" | (string & {});
export interface CreateEksAnywhereSubscriptionRequest {
  name: string;
  term: EksAnywhereSubscriptionTerm;
  licenseQuantity?: number;
  licenseType?: EksAnywhereSubscriptionLicenseType;
  autoRenew?: boolean;
  clientRequestToken?: string;
  tags?: { [key: string]: string | undefined };
}
export interface License {
  id?: string;
  token?: string;
}
export type LicenseList = License[];
export interface EksAnywhereSubscription {
  id?: string;
  arn?: string;
  createdAt?: Date;
  effectiveDate?: Date;
  expirationDate?: Date;
  licenseQuantity?: number;
  licenseType?: EksAnywhereSubscriptionLicenseType;
  term?: EksAnywhereSubscriptionTerm;
  status?: string;
  autoRenew?: boolean;
  licenseArns?: string[];
  licenses?: License[];
  tags?: { [key: string]: string | undefined };
}
export interface CreateEksAnywhereSubscriptionResponse {
  subscription?: EksAnywhereSubscription;
}
export type FargateProfileLabel = { [key: string]: string | undefined };
export interface FargateProfileSelector {
  namespace?: string;
  labels?: { [key: string]: string | undefined };
}
export type FargateProfileSelectors = FargateProfileSelector[];
export interface CreateFargateProfileRequest {
  fargateProfileName: string;
  clusterName: string;
  podExecutionRoleArn: string;
  subnets?: string[];
  selectors?: FargateProfileSelector[];
  clientRequestToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type FargateProfileStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "CREATE_FAILED"
  | "DELETE_FAILED"
  | (string & {});
export type FargateProfileIssueCode =
  | "PodExecutionRoleAlreadyInUse"
  | "AccessDenied"
  | "ClusterUnreachable"
  | "InternalFailure"
  | (string & {});
export interface FargateProfileIssue {
  code?: FargateProfileIssueCode;
  message?: string;
  resourceIds?: string[];
}
export type FargateProfileIssueList = FargateProfileIssue[];
export interface FargateProfileHealth {
  issues?: FargateProfileIssue[];
}
export interface FargateProfile {
  fargateProfileName?: string;
  fargateProfileArn?: string;
  clusterName?: string;
  createdAt?: Date;
  podExecutionRoleArn?: string;
  subnets?: string[];
  selectors?: FargateProfileSelector[];
  status?: FargateProfileStatus;
  tags?: { [key: string]: string | undefined };
  health?: FargateProfileHealth;
}
export interface CreateFargateProfileResponse {
  fargateProfile?: FargateProfile;
}
export type ZeroCapacity = number;
export type Capacity = number;
export interface NodegroupScalingConfig {
  minSize?: number;
  maxSize?: number;
  desiredSize?: number;
}
export type BoxedInteger = number;
export type AMITypes =
  | "AL2_x86_64"
  | "AL2_x86_64_GPU"
  | "AL2_ARM_64"
  | "CUSTOM"
  | "BOTTLEROCKET_ARM_64"
  | "BOTTLEROCKET_x86_64"
  | "BOTTLEROCKET_ARM_64_FIPS"
  | "BOTTLEROCKET_x86_64_FIPS"
  | "BOTTLEROCKET_ARM_64_NVIDIA"
  | "BOTTLEROCKET_x86_64_NVIDIA"
  | "BOTTLEROCKET_ARM_64_NVIDIA_FIPS"
  | "BOTTLEROCKET_x86_64_NVIDIA_FIPS"
  | "WINDOWS_CORE_2019_x86_64"
  | "WINDOWS_FULL_2019_x86_64"
  | "WINDOWS_CORE_2022_x86_64"
  | "WINDOWS_FULL_2022_x86_64"
  | "WINDOWS_CORE_2025_x86_64"
  | "WINDOWS_FULL_2025_x86_64"
  | "AL2023_x86_64_STANDARD"
  | "AL2023_ARM_64_STANDARD"
  | "AL2023_x86_64_NEURON"
  | "AL2023_x86_64_NVIDIA"
  | "AL2023_ARM_64_NVIDIA"
  | (string & {});
export interface RemoteAccessConfig {
  ec2SshKey?: string;
  sourceSecurityGroups?: string[];
}
export type LabelKey = string;
export type LabelValue = string;
export type LabelsMap = { [key: string]: string | undefined };
export type TaintKey = string;
export type TaintValue = string;
export type TaintEffect =
  | "NO_SCHEDULE"
  | "NO_EXECUTE"
  | "PREFER_NO_SCHEDULE"
  | (string & {});
export interface Taint {
  key?: string;
  value?: string;
  effect?: TaintEffect;
}
export type TaintsList = Taint[];
export interface LaunchTemplateSpecification {
  name?: string;
  version?: string;
  id?: string;
}
export type NonZeroInteger = number;
export type PercentCapacity = number;
export type NodegroupUpdateStrategies = "DEFAULT" | "MINIMAL" | (string & {});
export interface NodegroupUpdateConfig {
  maxUnavailable?: number;
  maxUnavailablePercentage?: number;
  updateStrategy?: NodegroupUpdateStrategies;
}
export type RepairAction = "Replace" | "Reboot" | "NoAction" | (string & {});
export interface NodeRepairConfigOverrides {
  nodeMonitoringCondition?: string;
  nodeUnhealthyReason?: string;
  minRepairWaitTimeMins?: number;
  repairAction?: RepairAction;
}
export type NodeRepairConfigOverridesList = NodeRepairConfigOverrides[];
export interface NodeRepairConfig {
  enabled?: boolean;
  maxUnhealthyNodeThresholdCount?: number;
  maxUnhealthyNodeThresholdPercentage?: number;
  maxParallelNodesRepairedCount?: number;
  maxParallelNodesRepairedPercentage?: number;
  nodeRepairConfigOverrides?: NodeRepairConfigOverrides[];
}
export type CapacityTypes =
  | "ON_DEMAND"
  | "SPOT"
  | "CAPACITY_BLOCK"
  | (string & {});
export type WarmPoolState =
  | "STOPPED"
  | "RUNNING"
  | "HIBERNATED"
  | (string & {});
export interface WarmPoolConfig {
  enabled?: boolean;
  minSize?: number;
  maxGroupPreparedCapacity?: number;
  poolState?: WarmPoolState;
  reuseOnScaleIn?: boolean;
}
export interface CreateNodegroupRequest {
  clusterName: string;
  nodegroupName: string;
  scalingConfig?: NodegroupScalingConfig;
  diskSize?: number;
  subnets: string[];
  instanceTypes?: string[];
  amiType?: AMITypes;
  remoteAccess?: RemoteAccessConfig;
  nodeRole: string;
  labels?: { [key: string]: string | undefined };
  taints?: Taint[];
  tags?: { [key: string]: string | undefined };
  clientRequestToken?: string;
  launchTemplate?: LaunchTemplateSpecification;
  updateConfig?: NodegroupUpdateConfig;
  nodeRepairConfig?: NodeRepairConfig;
  capacityType?: CapacityTypes;
  version?: string;
  releaseVersion?: string;
  warmPoolConfig?: WarmPoolConfig;
}
export type NodegroupStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "CREATE_FAILED"
  | "DELETE_FAILED"
  | "DEGRADED"
  | (string & {});
export interface AutoScalingGroup {
  name?: string;
}
export type AutoScalingGroupList = AutoScalingGroup[];
export interface NodegroupResources {
  autoScalingGroups?: AutoScalingGroup[];
  remoteAccessSecurityGroup?: string;
}
export type NodegroupIssueCode =
  | "AutoScalingGroupNotFound"
  | "AutoScalingGroupInvalidConfiguration"
  | "Ec2SecurityGroupNotFound"
  | "Ec2SecurityGroupDeletionFailure"
  | "Ec2LaunchTemplateNotFound"
  | "Ec2LaunchTemplateVersionMismatch"
  | "Ec2SubnetNotFound"
  | "Ec2SubnetInvalidConfiguration"
  | "IamInstanceProfileNotFound"
  | "Ec2SubnetMissingIpv6Assignment"
  | "IamLimitExceeded"
  | "IamNodeRoleNotFound"
  | "NodeCreationFailure"
  | "AsgInstanceLaunchFailures"
  | "InstanceLimitExceeded"
  | "InsufficientFreeAddresses"
  | "AccessDenied"
  | "InternalFailure"
  | "ClusterUnreachable"
  | "AmiIdNotFound"
  | "AutoScalingGroupOptInRequired"
  | "AutoScalingGroupRateLimitExceeded"
  | "Ec2LaunchTemplateDeletionFailure"
  | "Ec2LaunchTemplateInvalidConfiguration"
  | "Ec2LaunchTemplateMaxLimitExceeded"
  | "Ec2SubnetListTooLong"
  | "IamThrottling"
  | "NodeTerminationFailure"
  | "PodEvictionFailure"
  | "SourceEc2LaunchTemplateNotFound"
  | "LimitExceeded"
  | "Unknown"
  | "AutoScalingGroupInstanceRefreshActive"
  | "KubernetesLabelInvalid"
  | "Ec2LaunchTemplateVersionMaxLimitExceeded"
  | "Ec2InstanceTypeDoesNotExist"
  | (string & {});
export interface Issue {
  code?: NodegroupIssueCode;
  message?: string;
  resourceIds?: string[];
}
export type IssueList = Issue[];
export interface NodegroupHealth {
  issues?: Issue[];
}
export interface Nodegroup {
  nodegroupName?: string;
  nodegroupArn?: string;
  clusterName?: string;
  version?: string;
  releaseVersion?: string;
  createdAt?: Date;
  modifiedAt?: Date;
  status?: NodegroupStatus;
  capacityType?: CapacityTypes;
  scalingConfig?: NodegroupScalingConfig;
  instanceTypes?: string[];
  subnets?: string[];
  remoteAccess?: RemoteAccessConfig;
  amiType?: AMITypes;
  nodeRole?: string;
  labels?: { [key: string]: string | undefined };
  taints?: Taint[];
  resources?: NodegroupResources;
  diskSize?: number;
  health?: NodegroupHealth;
  updateConfig?: NodegroupUpdateConfig;
  nodeRepairConfig?: NodeRepairConfig;
  launchTemplate?: LaunchTemplateSpecification;
  tags?: { [key: string]: string | undefined };
  warmPoolConfig?: WarmPoolConfig;
}
export interface CreateNodegroupResponse {
  nodegroup?: Nodegroup;
}
export interface CreatePodIdentityAssociationRequest {
  clusterName: string;
  namespace: string;
  serviceAccount: string;
  roleArn: string;
  clientRequestToken?: string;
  tags?: { [key: string]: string | undefined };
  disableSessionTags?: boolean;
  targetRoleArn?: string;
  policy?: string;
}
export interface PodIdentityAssociation {
  clusterName?: string;
  namespace?: string;
  serviceAccount?: string;
  roleArn?: string;
  associationArn?: string;
  associationId?: string;
  tags?: { [key: string]: string | undefined };
  createdAt?: Date;
  modifiedAt?: Date;
  ownerArn?: string;
  disableSessionTags?: boolean;
  targetRoleArn?: string;
  externalId?: string;
  policy?: string;
}
export interface CreatePodIdentityAssociationResponse {
  association?: PodIdentityAssociation;
}
export interface DeleteAccessEntryRequest {
  clusterName: string;
  principalArn: string;
}
export interface DeleteAccessEntryResponse {}
export interface DeleteAddonRequest {
  clusterName: string;
  addonName: string;
  preserve?: boolean;
}
export interface DeleteAddonResponse {
  addon?: Addon;
}
export interface DeleteCapabilityRequest {
  clusterName: string;
  capabilityName: string;
}
export interface DeleteCapabilityResponse {
  capability?: Capability;
}
export interface DeleteCertificateAuthorityRequest {
  clusterName: string;
  certificateAuthorityId: string;
  clientRequestToken?: string;
}
export interface DeleteCertificateAuthorityResponse {
  update?: Update;
  certificateAuthority?: CertificateAuthoritySummary;
}
export interface DeleteClusterRequest {
  name: string;
}
export interface DeleteClusterResponse {
  cluster?: Cluster;
}
export interface DeleteEksAnywhereSubscriptionRequest {
  id: string;
}
export interface DeleteEksAnywhereSubscriptionResponse {
  subscription?: EksAnywhereSubscription;
}
export interface DeleteFargateProfileRequest {
  clusterName: string;
  fargateProfileName: string;
}
export interface DeleteFargateProfileResponse {
  fargateProfile?: FargateProfile;
}
export interface DeleteNodegroupRequest {
  clusterName: string;
  nodegroupName: string;
}
export interface DeleteNodegroupResponse {
  nodegroup?: Nodegroup;
}
export interface DeletePodIdentityAssociationRequest {
  clusterName: string;
  associationId: string;
}
export interface DeletePodIdentityAssociationResponse {
  association?: PodIdentityAssociation;
}
export interface DeregisterClusterRequest {
  name: string;
}
export interface DeregisterClusterResponse {
  cluster?: Cluster;
}
export interface DescribeAccessEntryRequest {
  clusterName: string;
  principalArn: string;
}
export interface DescribeAccessEntryResponse {
  accessEntry?: AccessEntry;
}
export interface DescribeAddonRequest {
  clusterName: string;
  addonName: string;
}
export interface DescribeAddonResponse {
  addon?: Addon;
}
export interface DescribeAddonConfigurationRequest {
  addonName: string;
  addonVersion: string;
}
export interface AddonPodIdentityConfiguration {
  serviceAccount?: string;
  recommendedManagedPolicies?: string[];
}
export type AddonPodIdentityConfigurationList = AddonPodIdentityConfiguration[];
export interface DescribeAddonConfigurationResponse {
  addonName?: string;
  addonVersion?: string;
  configurationSchema?: string;
  podIdentityConfiguration?: AddonPodIdentityConfiguration[];
}
export type DescribeAddonVersionsRequestMaxResults = number;
export interface DescribeAddonVersionsRequest {
  kubernetesVersion?: string;
  maxResults?: number;
  nextToken?: string;
  addonName?: string;
  types?: string[];
  publishers?: string[];
  owners?: string[];
}
export interface Compatibility {
  clusterVersion?: string;
  platformVersions?: string[];
  defaultVersion?: boolean;
}
export type Compatibilities = Compatibility[];
export interface AddonVersionInfo {
  addonVersion?: string;
  architecture?: string[];
  computeTypes?: string[];
  compatibilities?: Compatibility[];
  requiresConfiguration?: boolean;
  requiresIamPermissions?: boolean;
}
export type AddonVersionInfoList = AddonVersionInfo[];
export interface AddonInfo {
  addonName?: string;
  type?: string;
  addonVersions?: AddonVersionInfo[];
  publisher?: string;
  owner?: string;
  marketplaceInformation?: MarketplaceInformation;
  defaultNamespace?: string;
}
export type Addons = AddonInfo[];
export interface DescribeAddonVersionsResponse {
  addons?: AddonInfo[];
  nextToken?: string;
}
export interface DescribeCapabilityRequest {
  clusterName: string;
  capabilityName: string;
}
export interface DescribeCapabilityResponse {
  capability?: Capability;
}
export interface DescribeCertificateAuthorityRequest {
  clusterName: string;
  certificateAuthorityId: string;
}
export interface CertificateAuthorityValidity {
  notBefore?: Date;
  notAfter?: Date;
}
export interface CertificateAuthorityScheduledEvents {
  firstAutoActivation?: Date;
  finalAutoActivation?: Date;
}
export interface CertificateAuthority {
  id?: string;
  createdAt?: Date;
  createdBy?: CertificateAuthorityCreatedBy;
  activatedAt?: Date;
  activatedBy?: CertificateAuthorityActivatedBy;
  signingStatus?: CertificateAuthoritySigningStatus;
  distributionStatus?: CertificateAuthorityDistributionStatus;
  validity?: CertificateAuthorityValidity;
  scheduledEvents?: CertificateAuthorityScheduledEvents;
  rollbackAvailable?: boolean;
  data?: string;
}
export interface DescribeCertificateAuthorityResponse {
  certificateAuthority?: CertificateAuthority;
}
export interface DescribeClusterRequest {
  name: string;
}
export interface DescribeClusterResponse {
  cluster?: Cluster;
}
export type DescribeClusterVersionMaxResults = number;
export type ClusterVersionStatus =
  | "unsupported"
  | "standard-support"
  | "extended-support"
  | (string & {});
export type VersionStatus =
  | "UNSUPPORTED"
  | "STANDARD_SUPPORT"
  | "EXTENDED_SUPPORT"
  | (string & {});
export interface DescribeClusterVersionsRequest {
  clusterType?: string;
  maxResults?: number;
  nextToken?: string;
  defaultOnly?: boolean;
  includeAll?: boolean;
  clusterVersions?: string[];
  status?: ClusterVersionStatus;
  versionStatus?: VersionStatus;
}
export interface DurationConstraints {
  min?: string;
  max?: string;
}
export interface DurationParameterConfig {
  defaultValue?: string;
  constraints?: DurationConstraints;
}
export interface IntegerRangeConstraint {
  min?: number;
  max?: number;
}
export interface PortRangeConstraints {
  minPort?: IntegerRangeConstraint;
  maxPort?: IntegerRangeConstraint;
}
export interface PortRangeParameterConfig {
  defaultValue?: ServiceNodePortRange;
  constraints?: PortRangeConstraints;
}
export interface KubeApiServerVersionConfig {
  eventTtl?: DurationParameterConfig;
  serviceNodePortRange?: PortRangeParameterConfig;
}
export type AllowedValuesList = string[];
export interface AllowedValuesConstraint {
  allowedValues?: string[];
}
export interface ResourceConstraints {
  name?: AllowedValuesConstraint;
  weight?: IntegerRangeConstraint;
}
export interface ScoringStrategyConstraints {
  scoringStrategy?: AllowedValuesConstraint;
  resources?: ResourceConstraints;
}
export interface ScoringStrategyConfig {
  defaultValue?: ScoringStrategy;
  constraints?: ScoringStrategyConstraints;
}
export interface NodeResourcesFitVersionConfig {
  scoringStrategy?: ScoringStrategyConfig;
}
export interface KubeSchedulerVersionConfig {
  nodeResourcesFit?: NodeResourcesFitVersionConfig;
}
export interface IntegerConstraints {
  min?: number;
  max?: number;
}
export interface IntegerParameterConfig {
  defaultValue?: number;
  constraints?: IntegerConstraints;
}
export interface PodGcControllerVersionConfig {
  terminatedPodGcThreshold?: IntegerParameterConfig;
}
export interface HorizontalPodAutoscalerControllerVersionConfig {
  horizontalPodAutoscalerSyncPeriod?: DurationParameterConfig;
}
export interface KubeControllerManagerVersionConfig {
  podGcControllerConfig?: PodGcControllerVersionConfig;
  horizontalPodAutoscalerControllerConfig?: HorizontalPodAutoscalerControllerVersionConfig;
}
export interface ControlPlaneConfigInfo {
  kubeApiServerConfig?: KubeApiServerVersionConfig;
  kubeSchedulerConfig?: KubeSchedulerVersionConfig;
  kubeControllerManagerConfig?: KubeControllerManagerVersionConfig;
}
export interface ControlPlaneScalingTierInfo {
  tierName?: string;
  apiRequestConcurrency?: number;
  podSchedulingRatePerSecond?: number;
  clusterDatabaseSizeGb?: number;
  controlPlaneComponentConfigOverrides?: ControlPlaneConfigInfo;
}
export type ControlPlaneScalingTierList = ControlPlaneScalingTierInfo[];
export interface ClusterVersionInformation {
  clusterVersion?: string;
  clusterType?: string;
  defaultPlatformVersion?: string;
  defaultVersion?: boolean;
  releaseDate?: Date;
  endOfStandardSupportDate?: Date;
  endOfExtendedSupportDate?: Date;
  status?: ClusterVersionStatus;
  versionStatus?: VersionStatus;
  kubernetesPatchVersion?: string;
  controlPlaneScalingTiers?: ControlPlaneScalingTierInfo[];
  controlPlaneComponentConfig?: ControlPlaneConfigInfo;
}
export type ClusterVersionList = ClusterVersionInformation[];
export interface DescribeClusterVersionsResponse {
  nextToken?: string;
  clusterVersions?: ClusterVersionInformation[];
}
export interface DescribeEksAnywhereSubscriptionRequest {
  id: string;
}
export interface DescribeEksAnywhereSubscriptionResponse {
  subscription?: EksAnywhereSubscription;
}
export interface DescribeFargateProfileRequest {
  clusterName: string;
  fargateProfileName: string;
}
export interface DescribeFargateProfileResponse {
  fargateProfile?: FargateProfile;
}
export interface IdentityProviderConfig {
  type: string;
  name: string;
}
export interface DescribeIdentityProviderConfigRequest {
  clusterName: string;
  identityProviderConfig: IdentityProviderConfig;
}
export type ConfigStatus = "CREATING" | "DELETING" | "ACTIVE" | (string & {});
export interface OidcIdentityProviderConfig {
  identityProviderConfigName?: string;
  identityProviderConfigArn?: string;
  clusterName?: string;
  issuerUrl?: string;
  clientId?: string;
  usernameClaim?: string;
  usernamePrefix?: string;
  groupsClaim?: string;
  groupsPrefix?: string;
  requiredClaims?: { [key: string]: string | undefined };
  tags?: { [key: string]: string | undefined };
  status?: ConfigStatus;
}
export interface IdentityProviderConfigResponse {
  oidc?: OidcIdentityProviderConfig;
}
export interface DescribeIdentityProviderConfigResponse {
  identityProviderConfig?: IdentityProviderConfigResponse;
}
export interface DescribeInsightRequest {
  clusterName: string;
  id: string;
}
export type Category =
  | "UPGRADE_READINESS"
  | "MISCONFIGURATION"
  | "ROLLBACK_READINESS"
  | (string & {});
export type InsightStatusValue =
  | "PASSING"
  | "WARNING"
  | "ERROR"
  | "UNKNOWN"
  | (string & {});
export interface InsightStatus {
  status?: InsightStatusValue;
  reason?: string;
}
export type AdditionalInfoMap = { [key: string]: string | undefined };
export interface InsightResourceDetail {
  insightStatus?: InsightStatus;
  kubernetesResourceUri?: string;
  arn?: string;
}
export type InsightResourceDetails = InsightResourceDetail[];
export interface ClientStat {
  userAgent?: string;
  numberOfRequestsLast30Days?: number;
  lastRequestTime?: Date;
}
export type ClientStats = ClientStat[];
export interface DeprecationDetail {
  usage?: string;
  replacedWith?: string;
  stopServingVersion?: string;
  startServingReplacementVersion?: string;
  clientStats?: ClientStat[];
}
export type DeprecationDetails = DeprecationDetail[];
export interface AddonCompatibilityDetail {
  name?: string;
  compatibleVersions?: string[];
}
export type AddonCompatibilityDetails = AddonCompatibilityDetail[];
export interface InsightCategorySpecificSummary {
  deprecationDetails?: DeprecationDetail[];
  addonCompatibilityDetails?: AddonCompatibilityDetail[];
}
export interface Insight {
  id?: string;
  name?: string;
  category?: Category;
  kubernetesVersion?: string;
  lastRefreshTime?: Date;
  lastTransitionTime?: Date;
  description?: string;
  insightStatus?: InsightStatus;
  recommendation?: string;
  additionalInfo?: { [key: string]: string | undefined };
  resources?: InsightResourceDetail[];
  categorySpecificSummary?: InsightCategorySpecificSummary;
}
export interface DescribeInsightResponse {
  insight?: Insight;
}
export interface DescribeInsightsRefreshRequest {
  clusterName: string;
}
export type InsightsRefreshStatus =
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export interface DescribeInsightsRefreshResponse {
  message?: string;
  status?: InsightsRefreshStatus;
  startedAt?: Date;
  endedAt?: Date;
}
export interface DescribeNodegroupRequest {
  clusterName: string;
  nodegroupName: string;
}
export interface DescribeNodegroupResponse {
  nodegroup?: Nodegroup;
}
export interface DescribePodIdentityAssociationRequest {
  clusterName: string;
  associationId: string;
}
export interface DescribePodIdentityAssociationResponse {
  association?: PodIdentityAssociation;
}
export interface DescribeUpdateRequest {
  name: string;
  updateId: string;
  nodegroupName?: string;
  addonName?: string;
  capabilityName?: string;
}
export interface DescribeUpdateResponse {
  update?: Update;
}
export interface DisassociateAccessPolicyRequest {
  clusterName: string;
  principalArn: string;
  policyArn: string;
}
export interface DisassociateAccessPolicyResponse {}
export interface DisassociateIdentityProviderConfigRequest {
  clusterName: string;
  identityProviderConfig: IdentityProviderConfig;
  clientRequestToken?: string;
}
export interface DisassociateIdentityProviderConfigResponse {
  update?: Update;
}
export type ListAccessEntriesRequestMaxResults = number;
export interface ListAccessEntriesRequest {
  clusterName: string;
  associatedPolicyArn?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ListAccessEntriesResponse {
  accessEntries?: string[];
  nextToken?: string;
}
export type ListAccessPoliciesRequestMaxResults = number;
export interface ListAccessPoliciesRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface AccessPolicy {
  name?: string;
  arn?: string;
}
export type AccessPoliciesList = AccessPolicy[];
export interface ListAccessPoliciesResponse {
  accessPolicies?: AccessPolicy[];
  nextToken?: string;
}
export type ListAddonsRequestMaxResults = number;
export interface ListAddonsRequest {
  clusterName: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ListAddonsResponse {
  addons?: string[];
  nextToken?: string;
}
export type ListAssociatedAccessPoliciesRequestMaxResults = number;
export interface ListAssociatedAccessPoliciesRequest {
  clusterName: string;
  principalArn: string;
  maxResults?: number;
  nextToken?: string;
}
export type AssociatedAccessPoliciesList = AssociatedAccessPolicy[];
export interface ListAssociatedAccessPoliciesResponse {
  clusterName?: string;
  principalArn?: string;
  nextToken?: string;
  associatedAccessPolicies?: AssociatedAccessPolicy[];
}
export type ListCapabilitiesRequestMaxResults = number;
export interface ListCapabilitiesRequest {
  clusterName: string;
  nextToken?: string;
  maxResults?: number;
}
export interface CapabilitySummary {
  capabilityName?: string;
  arn?: string;
  type?: CapabilityType;
  status?: CapabilityStatus;
  version?: string;
  createdAt?: Date;
  modifiedAt?: Date;
}
export type CapabilitySummaryList = CapabilitySummary[];
export interface ListCapabilitiesResponse {
  capabilities?: CapabilitySummary[];
  nextToken?: string;
}
export type CertificateAuthorityMaxResults = number;
export interface ListCertificateAuthoritiesRequest {
  clusterName: string;
  maxResults?: number;
  nextToken?: string;
}
export type CertificateAuthoritySummaryList = CertificateAuthoritySummary[];
export interface ListCertificateAuthoritiesResponse {
  certificateAuthorities?: CertificateAuthoritySummary[];
  nextToken?: string;
}
export type ListClustersRequestMaxResults = number;
export type IncludeClustersList = string[];
export interface ListClustersRequest {
  maxResults?: number;
  nextToken?: string;
  include?: string[];
}
export interface ListClustersResponse {
  clusters?: string[];
  nextToken?: string;
}
export type ListEksAnywhereSubscriptionsRequestMaxResults = number;
export type EksAnywhereSubscriptionStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "EXPIRING"
  | "EXPIRED"
  | "DELETING"
  | (string & {});
export type EksAnywhereSubscriptionStatusValues =
  EksAnywhereSubscriptionStatus[];
export interface ListEksAnywhereSubscriptionsRequest {
  maxResults?: number;
  nextToken?: string;
  includeStatus?: EksAnywhereSubscriptionStatus[];
}
export type EksAnywhereSubscriptionList = EksAnywhereSubscription[];
export interface ListEksAnywhereSubscriptionsResponse {
  subscriptions?: EksAnywhereSubscription[];
  nextToken?: string;
}
export type FargateProfilesRequestMaxResults = number;
export interface ListFargateProfilesRequest {
  clusterName: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ListFargateProfilesResponse {
  fargateProfileNames?: string[];
  nextToken?: string;
}
export type ListIdentityProviderConfigsRequestMaxResults = number;
export interface ListIdentityProviderConfigsRequest {
  clusterName: string;
  maxResults?: number;
  nextToken?: string;
}
export type IdentityProviderConfigs = IdentityProviderConfig[];
export interface ListIdentityProviderConfigsResponse {
  identityProviderConfigs?: IdentityProviderConfig[];
  nextToken?: string;
}
export type CategoryList = Category[];
export type InsightStatusValueList = InsightStatusValue[];
export interface InsightsFilter {
  categories?: Category[];
  kubernetesVersions?: string[];
  statuses?: InsightStatusValue[];
}
export type ListInsightsMaxResults = number;
export interface ListInsightsRequest {
  clusterName: string;
  filter?: InsightsFilter;
  maxResults?: number;
  nextToken?: string;
}
export interface InsightSummary {
  id?: string;
  name?: string;
  category?: Category;
  kubernetesVersion?: string;
  lastRefreshTime?: Date;
  lastTransitionTime?: Date;
  description?: string;
  insightStatus?: InsightStatus;
}
export type InsightSummaries = InsightSummary[];
export interface ListInsightsResponse {
  insights?: InsightSummary[];
  nextToken?: string;
}
export type ListNodegroupsRequestMaxResults = number;
export interface ListNodegroupsRequest {
  clusterName: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ListNodegroupsResponse {
  nodegroups?: string[];
  nextToken?: string;
}
export type ListPodIdentityAssociationsMaxResults = number;
export interface ListPodIdentityAssociationsRequest {
  clusterName: string;
  namespace?: string;
  serviceAccount?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface PodIdentityAssociationSummary {
  clusterName?: string;
  namespace?: string;
  serviceAccount?: string;
  associationArn?: string;
  associationId?: string;
  ownerArn?: string;
}
export type PodIdentityAssociationSummaries = PodIdentityAssociationSummary[];
export interface ListPodIdentityAssociationsResponse {
  associations?: PodIdentityAssociationSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export type ListUpdatesRequestMaxResults = number;
export interface ListUpdatesRequest {
  name: string;
  nodegroupName?: string;
  addonName?: string;
  capabilityName?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListUpdatesResponse {
  updateIds?: string[];
  nextToken?: string;
}
export type ConnectorConfigProvider =
  | "EKS_ANYWHERE"
  | "ANTHOS"
  | "GKE"
  | "AKS"
  | "OPENSHIFT"
  | "TANZU"
  | "RANCHER"
  | "EC2"
  | "OTHER"
  | (string & {});
export interface ConnectorConfigRequest {
  roleArn: string;
  provider: ConnectorConfigProvider;
}
export interface RegisterClusterRequest {
  name: string;
  connectorConfig: ConnectorConfigRequest;
  clientRequestToken?: string;
  tags?: { [key: string]: string | undefined };
}
export interface RegisterClusterResponse {
  cluster?: Cluster;
}
export interface StartInsightsRefreshRequest {
  clusterName: string;
}
export interface StartInsightsRefreshResponse {
  message?: string;
  status?: InsightsRefreshStatus;
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
export interface UpdateAccessEntryRequest {
  clusterName: string;
  principalArn: string;
  kubernetesGroups?: string[];
  clientRequestToken?: string;
  username?: string;
}
export interface UpdateAccessEntryResponse {
  accessEntry?: AccessEntry;
}
export interface UpdateAddonRequest {
  clusterName: string;
  addonName: string;
  addonVersion?: string;
  serviceAccountRoleArn?: string;
  resolveConflicts?: ResolveConflicts;
  clientRequestToken?: string;
  configurationValues?: string;
  podIdentityAssociations?: AddonPodIdentityAssociations[];
}
export interface UpdateAddonResponse {
  update?: Update;
}
export interface UpdateRoleMappings {
  addOrUpdateRoleMappings?: ArgoCdRoleMapping[];
  removeRoleMappings?: ArgoCdRoleMapping[];
}
export interface UpdateArgoCdConfig {
  rbacRoleMappings?: UpdateRoleMappings;
  networkAccess?: ArgoCdNetworkAccessConfigRequest;
}
export interface UpdateCapabilityConfiguration {
  argoCd?: UpdateArgoCdConfig;
}
export interface UpdateCapabilityRequest {
  clusterName: string;
  capabilityName: string;
  roleArn?: string;
  configuration?: UpdateCapabilityConfiguration;
  clientRequestToken?: string;
  deletePropagationPolicy?: CapabilityDeletePropagationPolicy;
}
export interface UpdateCapabilityResponse {
  update?: Update;
}
export interface UpdateAccessConfigRequest {
  authenticationMode?: AuthenticationMode;
}
export interface UpdateClusterConfigRequest {
  name: string;
  resourcesVpcConfig?: VpcConfigRequest;
  logging?: Logging;
  clientRequestToken?: string;
  accessConfig?: UpdateAccessConfigRequest;
  upgradePolicy?: UpgradePolicyRequest;
  zonalShiftConfig?: ZonalShiftConfigRequest;
  computeConfig?: ComputeConfigRequest;
  kubernetesNetworkConfig?: KubernetesNetworkConfigRequest;
  storageConfig?: StorageConfigRequest;
  remoteNetworkConfig?: RemoteNetworkConfigRequest;
  deletionProtection?: boolean;
  controlPlaneScalingConfig?: ControlPlaneScalingConfig;
  kubeApiServerConfig?: KubeApiServerConfigRequest;
  kubeSchedulerConfig?: KubeSchedulerConfigRequest;
  kubeControllerManagerConfig?: KubeControllerManagerConfigRequest;
}
export interface UpdateClusterConfigResponse {
  update?: Update;
}
export interface RollbackConfig {
  timeoutMinutes?: number;
}
export interface UpdateClusterVersionRequest {
  name: string;
  version: string;
  clientRequestToken?: string;
  force?: boolean;
  rollbackConfig?: RollbackConfig;
}
export interface UpdateClusterVersionResponse {
  update?: Update;
}
export interface UpdateEksAnywhereSubscriptionRequest {
  id: string;
  autoRenew: boolean;
  clientRequestToken?: string;
}
export interface UpdateEksAnywhereSubscriptionResponse {
  subscription?: EksAnywhereSubscription;
}
export type LabelsKeyList = string[];
export interface UpdateLabelsPayload {
  addOrUpdateLabels?: { [key: string]: string | undefined };
  removeLabels?: string[];
}
export interface UpdateTaintsPayload {
  addOrUpdateTaints?: Taint[];
  removeTaints?: Taint[];
}
export interface UpdateNodegroupConfigRequest {
  clusterName: string;
  nodegroupName: string;
  labels?: UpdateLabelsPayload;
  taints?: UpdateTaintsPayload;
  scalingConfig?: NodegroupScalingConfig;
  updateConfig?: NodegroupUpdateConfig;
  nodeRepairConfig?: NodeRepairConfig;
  warmPoolConfig?: WarmPoolConfig;
  clientRequestToken?: string;
}
export interface UpdateNodegroupConfigResponse {
  update?: Update;
}
export interface UpdateNodegroupVersionRequest {
  clusterName: string;
  nodegroupName: string;
  version?: string;
  releaseVersion?: string;
  launchTemplate?: LaunchTemplateSpecification;
  force?: boolean;
  clientRequestToken?: string;
}
export interface UpdateNodegroupVersionResponse {
  update?: Update;
}
export interface UpdatePodIdentityAssociationRequest {
  clusterName: string;
  associationId: string;
  roleArn?: string;
  clientRequestToken?: string;
  disableSessionTags?: boolean;
  targetRoleArn?: string;
  policy?: string;
}
export interface UpdatePodIdentityAssociationResponse {
  association?: PodIdentityAssociation;
}
export type ActivateCertificateAuthorityError =
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Activates a successor certificate authority (CA) as the signing certificate authority
 * for your cluster, completing a CA rotation.
 *
 * When you activate a successor CA, Amazon EKS promotes it to be the cluster's signer (its
 * `signingStatus` becomes `IN_USE`) and the outgoing CA is
 * retired (`NOT_USED`). The outgoing CA remains in the cluster's trust bundle but
 * no longer signs certificates. The successor CA you activate must already be present on
 * the cluster and fully distributed (its `distributionStatus` must be
 * `COMPLETE`). This is an asynchronous operation that returns an
 * `update` object you can track with
 * `DescribeUpdate`
 * .
 *
 * Before you activate the successor CA, make sure the worker nodes you manage and your
 * external clients have been updated to trust it, so they maintain connectivity to the API
 * server after activation. For a limited period after activation, CA rollback is available
 * to revert to the outgoing CA if needed. If you don't activate the successor CA yourself,
 * Amazon EKS activates it automatically as the expiration deadline approaches. For more
 * information, see Rotate the Amazon EKS
 * cluster certificate authority in the *Amazon EKS User Guide*.
 */
export const activateCertificateAuthority: API.OperationMethod<
  ActivateCertificateAuthorityRequest,
  ActivateCertificateAuthorityResponse,
  ActivateCertificateAuthorityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /clusters/{clusterName}/certificate-authorities/{certificateAuthorityId}/activate",
    input: {
      clusterName: 0,
      certificateAuthorityId: 0,
      clientRequestToken: D.m({ idempotency: true }),
    },
    output: {
      update: o_Update,
      certificateAuthority: o_CertificateAuthoritySummary,
    },
    body: true,
  },
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ActivateCertificateAuthority",
})) as any;

export type AssociateAccessPolicyError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Associates an access policy and its scope to an access entry. For more information
 * about associating access policies, see Associating and disassociating
 * access policies to and from access entries in the *Amazon EKS User Guide*.
 */
export const associateAccessPolicy: API.OperationMethod<
  AssociateAccessPolicyRequest,
  AssociateAccessPolicyResponse,
  AssociateAccessPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /clusters/{clusterName}/access-entries/{principalArn}/access-policies",
    input: {
      clusterName: 0,
      principalArn: 0,
      policyArn: 0,
      accessScope: { type: 0, namespaces: 0 },
    },
    output: { associatedAccessPolicy: o_AssociatedAccessPolicy },
    body: true,
  },
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateAccessPolicy",
})) as any;

export type AssociateEncryptionConfigError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates an encryption configuration to an existing cluster.
 *
 * Use this API to enable encryption on existing clusters that don't already have
 * encryption enabled. This allows you to implement a defense-in-depth security strategy
 * without migrating applications to new Amazon EKS clusters.
 */
export const associateEncryptionConfig: API.OperationMethod<
  AssociateEncryptionConfigRequest,
  AssociateEncryptionConfigResponse,
  AssociateEncryptionConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /clusters/{clusterName}/encryption-config/associate",
    input: {
      clusterName: 0,
      encryptionConfig: D.list(i_EncryptionConfig),
      clientRequestToken: D.m({ idempotency: true }),
    },
    output: { update: o_Update },
    body: true,
  },
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateEncryptionConfig",
})) as any;

export type AssociateIdentityProviderConfigError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates an identity provider configuration to a cluster.
 *
 * If you want to authenticate identities using an identity provider, you can create an
 * identity provider configuration and associate it to your cluster. After configuring
 * authentication to your cluster you can create Kubernetes `Role` and
 * `ClusterRole` objects, assign permissions to them, and then bind them to
 * the identities using Kubernetes `RoleBinding` and `ClusterRoleBinding`
 * objects. For more information see Using RBAC
 * Authorization in the Kubernetes documentation.
 */
export const associateIdentityProviderConfig: API.OperationMethod<
  AssociateIdentityProviderConfigRequest,
  AssociateIdentityProviderConfigResponse,
  AssociateIdentityProviderConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /clusters/{clusterName}/identity-provider-configs/associate",
    input: {
      clusterName: 0,
      oidc: {
        identityProviderConfigName: 0,
        issuerUrl: 0,
        clientId: 0,
        usernameClaim: 0,
        usernamePrefix: 0,
        groupsClaim: 0,
        groupsPrefix: 0,
        requiredClaims: 0,
      },
      tags: 0,
      clientRequestToken: D.m({ idempotency: true }),
    },
    output: { update: o_Update },
    body: true,
  },
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateIdentityProviderConfig",
})) as any;

export type CancelUpdateError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | InvalidStateException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Cancels an in-progress update to an Amazon EKS cluster on a best-effort basis. Cancellation
 * is only performed if the update can be cancelled. Currently, this is supported for
 * `VersionRollback` update types on EKS Auto Mode clusters when nodes are
 * rolling back.
 *
 * A successful cancellation stops the node rollback. After cancellation, nodes converge
 * to the current cluster version honoring configured disruption controls. If the control
 * plane rollback has already begun, the cancellation request fails.
 */
export const cancelUpdate: API.OperationMethod<
  CancelUpdateRequest,
  CancelUpdateResponse,
  CancelUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /clusters/{name}/updates/{updateId}/cancel-update",
    input: {
      name: 0,
      updateId: 0,
      clientRequestToken: D.m({ idempotency: true }),
    },
    output: { update: o_Update },
    body: true,
  },
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    InvalidStateException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelUpdate",
})) as any;

export type CreateAccessEntryError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Creates an access entry.
 *
 * An access entry allows an IAM principal to access your cluster. Access
 * entries can replace the need to maintain entries in the `aws-auth`
 * `ConfigMap` for authentication. You have the following options for
 * authorizing an IAM principal to access Kubernetes objects on your cluster: Kubernetes
 * role-based access control (RBAC), Amazon EKS, or both. Kubernetes RBAC authorization requires you
 * to create and manage Kubernetes `Role`, `ClusterRole`,
 * `RoleBinding`, and `ClusterRoleBinding` objects, in addition
 * to managing access entries. If you use Amazon EKS authorization exclusively, you don't need
 * to create and manage Kubernetes `Role`, `ClusterRole`,
 * `RoleBinding`, and `ClusterRoleBinding` objects.
 *
 * For more information about access entries, see Access entries in the
 * *Amazon EKS User Guide*.
 */
export const createAccessEntry: API.OperationMethod<
  CreateAccessEntryRequest,
  CreateAccessEntryResponse,
  CreateAccessEntryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /clusters/{clusterName}/access-entries",
    input: {
      clusterName: 0,
      principalArn: 0,
      kubernetesGroups: 0,
      tags: 0,
      clientRequestToken: D.m({ idempotency: true }),
      username: 0,
      type: 0,
    },
    output: { accessEntry: o_AccessEntry },
    body: true,
  },
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessEntry",
})) as any;

export type CreateAddonError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Creates an Amazon EKS add-on.
 *
 * Amazon EKS add-ons help to automate the provisioning and lifecycle management of common
 * operational software for Amazon EKS clusters. For more information, see Amazon EKS
 * add-ons in the *Amazon EKS User Guide*.
 */
export const createAddon: API.OperationMethod<
  CreateAddonRequest,
  CreateAddonResponse,
  CreateAddonError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /clusters/{clusterName}/addons",
    input: {
      clusterName: 0,
      addonName: 0,
      addonVersion: 0,
      serviceAccountRoleArn: 0,
      resolveConflicts: 0,
      clientRequestToken: D.m({ idempotency: true }),
      tags: 0,
      configurationValues: 0,
      podIdentityAssociations: D.list(i_AddonPodIdentityAssociations),
      namespaceConfig: { namespace: 0 },
    },
    output: { addon: o_Addon },
    body: true,
  },
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAddon",
})) as any;

export type CreateCapabilityError =
  | AccessDeniedException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceLimitExceededException
  | ServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a managed capability resource for an Amazon EKS cluster.
 *
 * Capabilities provide fully managed capabilities to build and scale with Kubernetes. When you create a capability, Amazon EKSprovisions and manages the infrastructure required to run the capability outside of your cluster. This approach reduces operational overhead and preserves cluster resources.
 *
 * You can only create one Capability of each type on a given Amazon EKS cluster. Valid types are Argo CD for declarative GitOps deployment, Amazon Web Services Controllers for Kubernetes (ACK) for resource management, and Kube Resource Orchestrator (KRO) for Kubernetes custom resource orchestration.
 *
 * For more information, see EKS Capabilities in the *Amazon EKS User Guide*.
 */
export const createCapability: API.OperationMethod<
  CreateCapabilityRequest,
  CreateCapabilityResponse,
  CreateCapabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /clusters/{clusterName}/capabilities",
    input: {
      capabilityName: 0,
      clusterName: 0,
      clientRequestToken: D.m({ idempotency: true }),
      type: 0,
      roleArn: 0,
      configuration: {
        argoCd: {
          namespace: 0,
          awsIdc: { idcInstanceArn: 0, idcRegion: 0 },
          rbacRoleMappings: D.list(i_ArgoCdRoleMapping),
          networkAccess: i_ArgoCdNetworkAccessConfigRequest,
        },
      },
      tags: 0,
      deletePropagationPolicy: 0,
    },
    output: { capability: o_Capability },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceLimitExceededException,
    ServerException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCapability",
})) as any;

export type CreateCertificateAuthorityError =
  | InvalidParameterException
  | ResourceInUseException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Appends a successor certificate authority (CA) to your cluster, beginning the CA
 * rotation process.
 *
 * A cluster certificate authority is the root of trust for your cluster's control plane.
 * It signs the certificates that secure communication between the Kubernetes API server and its
 * clients, and its public certificate is distributed to your cluster's trust bundle so that
 * worker nodes and clients can verify the API server's identity. Each cluster can have at
 * most two certificate authorities at a time: the outgoing CA that's currently signing (its
 * `signingStatus` is `IN_USE`) and one successor CA
 * (`signingStatus` of `NOT_USED`) that you can later activate to
 * complete the rotation.
 *
 * Appending a successor CA adds its public certificate to the cluster's trust bundle so
 * that the cluster trusts both CAs simultaneously (the dual trust period), but it doesn't
 * begin signing certificates. Amazon EKS then distributes the successor CA to the Amazon Web Services managed
 * components in your cluster; you can track this through the CA's
 * `distributionStatus`. The successor CA can't be activated until its
 * `distributionStatus` is `COMPLETE`. To activate it as the
 * cluster's signer, use
 * `ActivateCertificateAuthority`
 * . This is an asynchronous operation
 * that returns an `update` object. If you don't append a successor CA yourself,
 * Amazon EKS appends one automatically before the outgoing CA approaches expiration.
 *
 * For more information, see Rotate the Amazon EKS
 * cluster certificate authority in the *Amazon EKS User Guide*.
 */
export const createCertificateAuthority: API.OperationMethod<
  CreateCertificateAuthorityRequest,
  CreateCertificateAuthorityResponse,
  CreateCertificateAuthorityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /clusters/{clusterName}/certificate-authorities",
    input: { clusterName: 0, clientRequestToken: D.m({ idempotency: true }) },
    output: {
      update: o_Update,
      certificateAuthority: o_CertificateAuthoritySummary,
    },
    body: true,
  },
  errors: [
    InvalidParameterException,
    ResourceInUseException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCertificateAuthority",
})) as any;

export type CreateClusterError =
  | ClientException
  | InvalidParameterException
  | ResourceInUseException
  | ResourceLimitExceededException
  | ServerException
  | ServiceUnavailableException
  | UnsupportedAvailabilityZoneException
  | CommonErrors;
/**
 * Creates an Amazon EKS control plane.
 *
 * The Amazon EKS control plane consists of control plane instances that run the Kubernetes
 * software, such as `etcd` and the API server. The control plane runs in an
 * account managed by Amazon Web Services, and the Kubernetes API is exposed by the Amazon EKS API server endpoint.
 * Each Amazon EKS cluster control plane is single tenant and unique. It runs on its own set of
 * Amazon EC2 instances.
 *
 * The cluster control plane is provisioned across multiple Availability Zones and fronted by an Elastic Load Balancing
 * Network Load Balancer. Amazon EKS also provisions elastic network interfaces in your VPC subnets to provide
 * connectivity from the control plane instances to the nodes (for example, to support
 * `kubectl exec`, `logs`, and `proxy` data
 * flows).
 *
 * Amazon EKS nodes run in your Amazon Web Services account and connect to your cluster's control plane over
 * the Kubernetes API server endpoint and a certificate file that is created for your
 * cluster.
 *
 * You can use the `endpointPublicAccess` and
 * `endpointPrivateAccess` parameters to enable or disable public and
 * private access to your cluster's Kubernetes API server endpoint. By default, public access is
 * enabled, and private access is disabled. The
 * endpoint domain name and IP address family depends on the value of the
 * `ipFamily` for the cluster. For more information, see Amazon EKS Cluster
 * Endpoint Access Control in the
 * *Amazon EKS User Guide*
 * .
 *
 * You can use the `logging` parameter to enable or disable exporting the
 * Kubernetes control plane logs for your cluster to CloudWatch Logs. By default, cluster control plane
 * logs aren't exported to CloudWatch Logs. For more information, see Amazon EKS
 * Cluster Control Plane Logs in the
 *
 * *Amazon EKS User Guide*
 * .
 *
 * CloudWatch Logs ingestion, archive storage, and data scanning rates apply to exported
 * control plane logs. For more information, see CloudWatch Pricing.
 *
 * In most cases, it takes several minutes to create a cluster. After you create an Amazon EKS
 * cluster, you must configure your Kubernetes tooling to communicate with the API server and
 * launch nodes into your cluster. For more information, see Allowing users to
 * access your cluster and Launching Amazon EKS
 * nodes in the *Amazon EKS User Guide*.
 */
export const createCluster: API.OperationMethod<
  CreateClusterRequest,
  CreateClusterResponse,
  CreateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /clusters",
    input: {
      name: 0,
      version: 0,
      roleArn: 0,
      resourcesVpcConfig: i_VpcConfigRequest,
      kubernetesNetworkConfig: i_KubernetesNetworkConfigRequest,
      logging: i_Logging,
      clientRequestToken: D.m({ idempotency: true }),
      tags: 0,
      encryptionConfig: D.list(i_EncryptionConfig),
      outpostConfig: {
        outpostArns: 0,
        controlPlaneInstanceType: 0,
        controlPlanePlacement: { groupName: 0, spreadLevel: 0 },
        etcdInstanceType: 0,
        etcdPlacement: { spreadLevel: 0 },
      },
      accessConfig: {
        bootstrapClusterCreatorAdminPermissions: 0,
        authenticationMode: 0,
      },
      bootstrapSelfManagedAddons: 0,
      upgradePolicy: i_UpgradePolicyRequest,
      zonalShiftConfig: i_ZonalShiftConfigRequest,
      remoteNetworkConfig: i_RemoteNetworkConfigRequest,
      computeConfig: i_ComputeConfigRequest,
      storageConfig: i_StorageConfigRequest,
      deletionProtection: 0,
      controlPlaneScalingConfig: i_ControlPlaneScalingConfig,
      kubeApiServerConfig: i_KubeApiServerConfigRequest,
      kubeSchedulerConfig: i_KubeSchedulerConfigRequest,
      kubeControllerManagerConfig: i_KubeControllerManagerConfigRequest,
    },
    output: { cluster: o_Cluster },
    body: true,
  },
  errors: [
    ClientException,
    InvalidParameterException,
    ResourceInUseException,
    ResourceLimitExceededException,
    ServerException,
    ServiceUnavailableException,
    UnsupportedAvailabilityZoneException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCluster",
})) as any;

export type CreateEksAnywhereSubscriptionError =
  | ClientException
  | InvalidParameterException
  | ResourceLimitExceededException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates an EKS Anywhere subscription. When a subscription is created, it is a contract
 * agreement for the length of the term specified in the request. Licenses that are used to
 * validate support are provisioned in Amazon Web Services License Manager and the caller account is
 * granted access to EKS Anywhere Curated Packages.
 */
export const createEksAnywhereSubscription: API.OperationMethod<
  CreateEksAnywhereSubscriptionRequest,
  CreateEksAnywhereSubscriptionResponse,
  CreateEksAnywhereSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /eks-anywhere-subscriptions",
    input: {
      name: 0,
      term: { duration: 0, unit: 0 },
      licenseQuantity: 0,
      licenseType: 0,
      autoRenew: 0,
      clientRequestToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: { subscription: o_EksAnywhereSubscription },
    body: true,
  },
  errors: [
    ClientException,
    InvalidParameterException,
    ResourceLimitExceededException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEksAnywhereSubscription",
})) as any;

export type CreateFargateProfileError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceLimitExceededException
  | ServerException
  | UnsupportedAvailabilityZoneException
  | ResourceInUseException
  | CommonErrors;
/**
 * Creates an Fargate profile for your Amazon EKS cluster. You must have at least one
 * Fargate profile in a cluster to be able to run pods on Fargate.
 *
 * The Fargate profile allows an administrator to declare which pods run on Fargate
 * and specify which pods run on which Fargate profile. This declaration is done through
 * the profile's selectors. Each profile can have up to five selectors that contain a
 * namespace and labels. A namespace is required for every selector. The label field
 * consists of multiple optional key-value pairs. Pods that match the selectors are
 * scheduled on Fargate. If a to-be-scheduled pod matches any of the selectors in the
 * Fargate profile, then that pod is run on Fargate.
 *
 * When you create a Fargate profile, you must specify a pod execution role to use with
 * the pods that are scheduled with the profile. This role is added to the cluster's Kubernetes
 * Role
 * Based Access Control (RBAC) for authorization so that the
 * `kubelet` that is running on the Fargate infrastructure can register
 * with your Amazon EKS cluster so that it can appear in your cluster as a node. The pod
 * execution role also provides IAM permissions to the Fargate infrastructure to allow
 * read access to Amazon ECR image repositories. For more information, see Pod
 * Execution Role in the *Amazon EKS User Guide*.
 *
 * Fargate profiles are immutable. However, you can create a new updated profile to
 * replace an existing profile and then delete the original after the updated profile has
 * finished creating.
 *
 * If any Fargate profiles in a cluster are in the `DELETING` status, you
 * must wait for that Fargate profile to finish deleting before you can create any other
 * profiles in that cluster.
 *
 * For more information, see Fargate profile in the *Amazon EKS User Guide*.
 */
export const createFargateProfile: API.OperationMethod<
  CreateFargateProfileRequest,
  CreateFargateProfileResponse,
  CreateFargateProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /clusters/{clusterName}/fargate-profiles",
    input: {
      fargateProfileName: 0,
      clusterName: 0,
      podExecutionRoleArn: 0,
      subnets: 0,
      selectors: D.list({ namespace: 0, labels: 0 }),
      clientRequestToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: { fargateProfile: o_FargateProfile },
    body: true,
  },
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceLimitExceededException,
    ServerException,
    UnsupportedAvailabilityZoneException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFargateProfile",
})) as any;

export type CreateNodegroupError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceLimitExceededException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a managed node group for an Amazon EKS cluster.
 *
 * You can only create a node group for your cluster that is equal to the current Kubernetes
 * version for the cluster. All node groups are created with the latest AMI release version
 * for the respective minor Kubernetes version of the cluster, unless you deploy a custom AMI
 * using a launch template.
 *
 * For later updates, you will only be able to update a node group using a launch
 * template only if it was originally deployed with a launch template. Additionally, the
 * launch template ID or name must match what was used when the node group was created. You
 * can update the launch template version with necessary changes. For more information
 * about using launch templates, see Customizing managed nodes with
 * launch templates.
 *
 * An Amazon EKS managed node group is an Amazon EC2 Auto Scaling group and associated Amazon EC2 instances that
 * are managed by Amazon Web Services for an Amazon EKS cluster. For more information, see Managed
 * node groups in the *Amazon EKS User Guide*.
 *
 * Windows AMI types are only supported for commercial Amazon Web Services Regions that support
 * Windows on Amazon EKS.
 */
export const createNodegroup: API.OperationMethod<
  CreateNodegroupRequest,
  CreateNodegroupResponse,
  CreateNodegroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /clusters/{clusterName}/node-groups",
    input: {
      clusterName: 0,
      nodegroupName: 0,
      scalingConfig: i_NodegroupScalingConfig,
      diskSize: 0,
      subnets: 0,
      instanceTypes: 0,
      amiType: 0,
      remoteAccess: { ec2SshKey: 0, sourceSecurityGroups: 0 },
      nodeRole: 0,
      labels: 0,
      taints: D.list(i_Taint),
      tags: 0,
      clientRequestToken: D.m({ idempotency: true }),
      launchTemplate: i_LaunchTemplateSpecification,
      updateConfig: i_NodegroupUpdateConfig,
      nodeRepairConfig: i_NodeRepairConfig,
      capacityType: 0,
      version: 0,
      releaseVersion: 0,
      warmPoolConfig: i_WarmPoolConfig,
    },
    output: { nodegroup: o_Nodegroup },
    body: true,
  },
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceLimitExceededException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNodegroup",
})) as any;

export type CreatePodIdentityAssociationError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Creates an EKS Pod Identity association between a service account in an Amazon EKS cluster and an IAM role
 * with *EKS Pod Identity*. Use EKS Pod Identity to give temporary IAM credentials to
 * Pods and the credentials are rotated automatically.
 *
 * Amazon EKS Pod Identity associations provide the ability to manage credentials for your applications, similar to the way that Amazon EC2 instance profiles provide credentials to Amazon EC2 instances.
 *
 * If a Pod uses a service account that has an association, Amazon EKS sets environment variables
 * in the containers of the Pod. The environment variables configure the Amazon Web Services SDKs,
 * including the Command Line Interface, to use the EKS Pod Identity credentials.
 *
 * EKS Pod Identity is a simpler method than IAM roles for service
 * accounts, as this method doesn't use OIDC identity providers.
 * Additionally, you can configure a role for EKS Pod Identity once, and reuse it across
 * clusters.
 *
 * Similar to Amazon Web Services IAM behavior, EKS Pod Identity associations are eventually consistent,
 * and may take several seconds to be effective after the initial API call returns
 * successfully. You must design your applications to account for these potential delays.
 * We recommend that you don’t include association create/updates in the
 * critical, high-availability code paths of your application. Instead, make changes in a
 * separate initialization or setup routine that you run less frequently.
 *
 * You can set a *target IAM role* in the same or a different
 * account for advanced scenarios. With a target role, EKS Pod Identity automatically performs two
 * role assumptions in sequence: first assuming the role in the association that is in this
 * account, then using those credentials to assume the target IAM role. This process
 * provides your Pod with temporary credentials that have the permissions defined in the
 * target role, allowing secure access to resources in another Amazon Web Services account.
 */
export const createPodIdentityAssociation: API.OperationMethod<
  CreatePodIdentityAssociationRequest,
  CreatePodIdentityAssociationResponse,
  CreatePodIdentityAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /clusters/{clusterName}/pod-identity-associations",
    input: {
      clusterName: 0,
      namespace: 0,
      serviceAccount: 0,
      roleArn: 0,
      clientRequestToken: D.m({ idempotency: true }),
      tags: 0,
      disableSessionTags: 0,
      targetRoleArn: 0,
      policy: 0,
    },
    output: { association: o_PodIdentityAssociation },
    body: true,
  },
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePodIdentityAssociation",
})) as any;

export type DeleteAccessEntryError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Deletes an access entry.
 *
 * Deleting an access entry of a type other than `Standard` can cause your
 * cluster to function improperly. If you delete an access entry in error, you can recreate
 * it.
 */
export const deleteAccessEntry: API.OperationMethod<
  DeleteAccessEntryRequest,
  DeleteAccessEntryResponse,
  DeleteAccessEntryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /clusters/{clusterName}/access-entries/{principalArn}",
    input: { clusterName: 0, principalArn: 0 },
  },
  errors: [InvalidRequestException, ResourceNotFoundException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessEntry",
})) as any;

export type DeleteAddonError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Deletes an Amazon EKS add-on.
 *
 * When you remove an add-on, it's deleted from the cluster. You can always manually
 * start an add-on on the cluster using the Kubernetes API.
 */
export const deleteAddon: API.OperationMethod<
  DeleteAddonRequest,
  DeleteAddonResponse,
  DeleteAddonError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /clusters/{clusterName}/addons/{addonName}",
    input: {
      clusterName: 0,
      addonName: 0,
      preserve: D.m({ query: "preserve" }),
    },
    output: { addon: o_Addon },
  },
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAddon",
})) as any;

export type DeleteCapabilityError =
  | AccessDeniedException
  | InvalidParameterException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Deletes a managed capability from your Amazon EKS cluster. When you delete a capability, Amazon EKS removes the capability infrastructure but retains all resources that were managed by the capability.
 *
 * Before deleting a capability, you should delete all Kubernetes resources that were created by the capability. After the capability is deleted, these resources become difficult to manage because the controller that managed them is no longer available. To delete resources before removing the capability, use `kubectl delete` or remove them through your GitOps workflow.
 */
export const deleteCapability: API.OperationMethod<
  DeleteCapabilityRequest,
  DeleteCapabilityResponse,
  DeleteCapabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /clusters/{clusterName}/capabilities/{capabilityName}",
    input: { clusterName: 0, capabilityName: 0 },
    output: { capability: o_Capability },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCapability",
})) as any;

export type DeleteCertificateAuthorityError =
  | InvalidParameterException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes a certificate authority (CA) from your cluster.
 *
 * Deleting a certificate authority removes its public certificate from the cluster's
 * trust bundle. You can't delete the certificate authority that's currently signing
 * certificates for the cluster (its `signingStatus` is `IN_USE`) — to
 * remove the outgoing CA, first activate the successor CA with
 * `ActivateCertificateAuthority`
 * . Amazon EKS also protects a successor CA
 * from deletion in certain cases to keep a valid rotation path — for example, a successor
 * that Amazon EKS appended can't be deleted while it's the only successor on the cluster. This is
 * an asynchronous operation that returns an `update` object.
 */
export const deleteCertificateAuthority: API.OperationMethod<
  DeleteCertificateAuthorityRequest,
  DeleteCertificateAuthorityResponse,
  DeleteCertificateAuthorityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /clusters/{clusterName}/certificate-authorities/{certificateAuthorityId}",
    input: {
      clusterName: 0,
      certificateAuthorityId: 0,
      clientRequestToken: D.m({
        query: "clientRequestToken",
        idempotency: true,
      }),
    },
    output: {
      update: o_Update,
      certificateAuthority: o_CertificateAuthoritySummary,
    },
  },
  errors: [
    InvalidParameterException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCertificateAuthority",
})) as any;

export type DeleteClusterError =
  | ClientException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes an Amazon EKS cluster control plane.
 *
 * If you have active services and ingress resources in your cluster that are associated with a load balancer,
 * you must delete those services before deleting the cluster so that the load balancers
 * are deleted properly. Otherwise, you can have orphaned resources in your VPC that
 * prevent you from being able to delete the VPC. For more information, see Deleting a
 * cluster in the *Amazon EKS User Guide*.
 *
 * If you have managed node groups or Fargate profiles attached to the cluster, you
 * must delete them first. For more information, see `DeleteNodgroup` and
 * `DeleteFargateProfile`.
 */
export const deleteCluster: API.OperationMethod<
  DeleteClusterRequest,
  DeleteClusterResponse,
  DeleteClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /clusters/{name}",
    input: { name: 0 },
    output: { cluster: o_Cluster },
  },
  errors: [
    ClientException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCluster",
})) as any;

export type DeleteEksAnywhereSubscriptionError =
  | ClientException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Deletes an expired or inactive subscription. Deleting inactive subscriptions removes
 * them from the Amazon Web Services Management Console view and from list/describe API responses. Subscriptions can
 * only be cancelled within 7 days of creation and are cancelled by creating a ticket in
 * the Amazon Web Services Support Center.
 */
export const deleteEksAnywhereSubscription: API.OperationMethod<
  DeleteEksAnywhereSubscriptionRequest,
  DeleteEksAnywhereSubscriptionResponse,
  DeleteEksAnywhereSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /eks-anywhere-subscriptions/{id}",
    input: { id: 0 },
    output: { subscription: o_EksAnywhereSubscription },
  },
  errors: [
    ClientException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEksAnywhereSubscription",
})) as any;

export type DeleteFargateProfileError =
  | ClientException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | ResourceInUseException
  | CommonErrors;
/**
 * Deletes an Fargate profile.
 *
 * When you delete a Fargate profile, any `Pod` running on Fargate that
 * was created with the profile is deleted. If the `Pod` matches another
 * Fargate profile, then it is scheduled on Fargate with that profile. If it no longer
 * matches any Fargate profiles, then it's not scheduled on Fargate and may remain in a
 * pending state.
 *
 * Only one Fargate profile in a cluster can be in the `DELETING` status at
 * a time. You must wait for a Fargate profile to finish deleting before you can delete
 * any other profiles in that cluster.
 */
export const deleteFargateProfile: API.OperationMethod<
  DeleteFargateProfileRequest,
  DeleteFargateProfileResponse,
  DeleteFargateProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /clusters/{clusterName}/fargate-profiles/{fargateProfileName}",
    input: { clusterName: 0, fargateProfileName: 0 },
    output: { fargateProfile: o_FargateProfile },
  },
  errors: [
    ClientException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFargateProfile",
})) as any;

export type DeleteNodegroupError =
  | ClientException
  | InvalidParameterException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes a managed node group.
 */
export const deleteNodegroup: API.OperationMethod<
  DeleteNodegroupRequest,
  DeleteNodegroupResponse,
  DeleteNodegroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /clusters/{clusterName}/node-groups/{nodegroupName}",
    input: { clusterName: 0, nodegroupName: 0 },
    output: { nodegroup: o_Nodegroup },
  },
  errors: [
    ClientException,
    InvalidParameterException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNodegroup",
})) as any;

export type DeletePodIdentityAssociationError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Deletes a EKS Pod Identity association.
 *
 * The temporary Amazon Web Services credentials from the previous IAM role session might still be valid until the session expiry. If you need to immediately revoke the temporary session credentials, then go to the role in the IAM console.
 */
export const deletePodIdentityAssociation: API.OperationMethod<
  DeletePodIdentityAssociationRequest,
  DeletePodIdentityAssociationResponse,
  DeletePodIdentityAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /clusters/{clusterName}/pod-identity-associations/{associationId}",
    input: { clusterName: 0, associationId: 0 },
    output: { association: o_PodIdentityAssociation },
  },
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePodIdentityAssociation",
})) as any;

export type DeregisterClusterError =
  | AccessDeniedException
  | ClientException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deregisters a connected cluster to remove it from the Amazon EKS control plane.
 *
 * A connected cluster is a Kubernetes cluster that you've connected to your control plane
 * using the Amazon EKS Connector.
 */
export const deregisterCluster: API.OperationMethod<
  DeregisterClusterRequest,
  DeregisterClusterResponse,
  DeregisterClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /cluster-registrations/{name}",
    input: { name: 0 },
    output: { cluster: o_Cluster },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterCluster",
})) as any;

export type DescribeAccessEntryError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Describes an access entry.
 */
export const describeAccessEntry: API.OperationMethod<
  DescribeAccessEntryRequest,
  DescribeAccessEntryResponse,
  DescribeAccessEntryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /clusters/{clusterName}/access-entries/{principalArn}",
    input: { clusterName: 0, principalArn: 0 },
    output: { accessEntry: o_AccessEntry },
  },
  errors: [InvalidRequestException, ResourceNotFoundException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccessEntry",
})) as any;

export type DescribeAddonError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Describes an Amazon EKS add-on.
 */
export const describeAddon: API.OperationMethod<
  DescribeAddonRequest,
  DescribeAddonResponse,
  DescribeAddonError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /clusters/{clusterName}/addons/{addonName}",
    input: { clusterName: 0, addonName: 0 },
    output: { addon: o_Addon },
  },
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAddon",
})) as any;

export type DescribeAddonConfigurationError =
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Returns configuration options.
 */
export const describeAddonConfiguration: API.OperationMethod<
  DescribeAddonConfigurationRequest,
  DescribeAddonConfigurationResponse,
  DescribeAddonConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /addons/configuration-schemas",
    input: {
      addonName: D.m({ query: "addonName" }),
      addonVersion: D.m({ query: "addonVersion" }),
    },
  },
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAddonConfiguration",
})) as any;

export type DescribeAddonVersionsError =
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Describes the versions for an add-on.
 *
 * Information such as the Kubernetes versions that you can use the add-on with, the
 * `owner`, `publisher`, and the `type` of the add-on
 * are returned.
 */
export const describeAddonVersions: API.PaginatedOperationMethod<
  DescribeAddonVersionsRequest,
  DescribeAddonVersionsResponse,
  DescribeAddonVersionsError,
  Credentials | HttpClient.HttpClient,
  AddonInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /addons/supported-versions",
    input: {
      kubernetesVersion: D.m({ query: "kubernetesVersion" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      addonName: D.m({ query: "addonName" }),
      types: D.m({ query: "types" }),
      publishers: D.m({ query: "publishers" }),
      owners: D.m({ query: "owners" }),
    },
  },
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAddonVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "addons",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeCapabilityError =
  | AccessDeniedException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Returns detailed information about a specific managed capability in your Amazon EKS cluster, including its current status, configuration, health information, and any issues that may be affecting its operation.
 */
export const describeCapability: API.OperationMethod<
  DescribeCapabilityRequest,
  DescribeCapabilityResponse,
  DescribeCapabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /clusters/{clusterName}/capabilities/{capabilityName}",
    input: { clusterName: 0, capabilityName: 0 },
    output: { capability: o_Capability },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCapability",
})) as any;

export type DescribeCertificateAuthorityError =
  | ResourceNotFoundException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns detailed information about a certificate authority (CA) in your cluster,
 * including its validity period, signing and distribution status, provenance, scheduled
 * auto-activation events, and public certificate data.
 */
export const describeCertificateAuthority: API.OperationMethod<
  DescribeCertificateAuthorityRequest,
  DescribeCertificateAuthorityResponse,
  DescribeCertificateAuthorityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /clusters/{clusterName}/certificate-authorities/{certificateAuthorityId}",
    input: { clusterName: 0, certificateAuthorityId: 0 },
    output: {
      certificateAuthority: {
        createdAt: D.ts,
        activatedAt: D.ts,
        validity: { notBefore: D.ts, notAfter: D.ts },
        scheduledEvents: {
          firstAutoActivation: D.ts,
          finalAutoActivation: D.ts,
        },
      },
    },
  },
  errors: [
    ResourceNotFoundException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCertificateAuthority",
})) as any;

export type DescribeClusterError =
  | ClientException
  | ResourceNotFoundException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Describes an Amazon EKS cluster.
 *
 * The API server endpoint and certificate authority data returned by this operation are
 * required for `kubelet` and `kubectl` to communicate with your
 * Kubernetes API server. For more information, see Creating or
 * updating a `kubeconfig` file for an Amazon EKS cluster.
 *
 * The API server endpoint and certificate authority data aren't available until the
 * cluster reaches the `ACTIVE` state.
 */
export const describeCluster: API.OperationMethod<
  DescribeClusterRequest,
  DescribeClusterResponse,
  DescribeClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /clusters/{name}",
    input: { name: 0 },
    output: { cluster: o_Cluster },
  },
  errors: [
    ClientException,
    ResourceNotFoundException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCluster",
})) as any;

export type DescribeClusterVersionsError =
  | InvalidParameterException
  | InvalidRequestException
  | ServerException
  | CommonErrors;
/**
 * Lists available Kubernetes versions for Amazon EKS clusters.
 */
export const describeClusterVersions: API.PaginatedOperationMethod<
  DescribeClusterVersionsRequest,
  DescribeClusterVersionsResponse,
  DescribeClusterVersionsError,
  Credentials | HttpClient.HttpClient,
  ClusterVersionInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /cluster-versions",
    input: {
      clusterType: D.m({ query: "clusterType" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      defaultOnly: D.m({ query: "defaultOnly" }),
      includeAll: D.m({ query: "includeAll" }),
      clusterVersions: D.m({ query: "clusterVersions" }),
      status: D.m({ query: "status" }),
      versionStatus: D.m({ query: "versionStatus" }),
    },
    output: {
      clusterVersions: D.list({
        releaseDate: D.ts,
        endOfStandardSupportDate: D.ts,
        endOfExtendedSupportDate: D.ts,
      }),
    },
  },
  errors: [InvalidParameterException, InvalidRequestException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "clusterVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeEksAnywhereSubscriptionError =
  | ClientException
  | ResourceNotFoundException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns descriptive information about a subscription.
 */
export const describeEksAnywhereSubscription: API.OperationMethod<
  DescribeEksAnywhereSubscriptionRequest,
  DescribeEksAnywhereSubscriptionResponse,
  DescribeEksAnywhereSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /eks-anywhere-subscriptions/{id}",
    input: { id: 0 },
    output: { subscription: o_EksAnywhereSubscription },
  },
  errors: [
    ClientException,
    ResourceNotFoundException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEksAnywhereSubscription",
})) as any;

export type DescribeFargateProfileError =
  | ClientException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Describes an Fargate profile.
 */
export const describeFargateProfile: API.OperationMethod<
  DescribeFargateProfileRequest,
  DescribeFargateProfileResponse,
  DescribeFargateProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /clusters/{clusterName}/fargate-profiles/{fargateProfileName}",
    input: { clusterName: 0, fargateProfileName: 0 },
    output: { fargateProfile: o_FargateProfile },
  },
  errors: [
    ClientException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFargateProfile",
})) as any;

export type DescribeIdentityProviderConfigError =
  | ClientException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Describes an identity provider configuration.
 */
export const describeIdentityProviderConfig: API.OperationMethod<
  DescribeIdentityProviderConfigRequest,
  DescribeIdentityProviderConfigResponse,
  DescribeIdentityProviderConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /clusters/{clusterName}/identity-provider-configs/describe",
    input: { clusterName: 0, identityProviderConfig: i_IdentityProviderConfig },
    body: true,
  },
  errors: [
    ClientException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIdentityProviderConfig",
})) as any;

export type DescribeInsightError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Returns details about an insight that you specify using its ID.
 */
export const describeInsight: API.OperationMethod<
  DescribeInsightRequest,
  DescribeInsightResponse,
  DescribeInsightError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /clusters/{clusterName}/insights/{id}",
    input: { clusterName: 0, id: 0 },
    output: {
      insight: {
        lastRefreshTime: D.ts,
        lastTransitionTime: D.ts,
        categorySpecificSummary: {
          deprecationDetails: D.list({
            clientStats: D.list({ lastRequestTime: D.ts }),
          }),
        },
      },
    },
  },
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInsight",
})) as any;

export type DescribeInsightsRefreshError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Returns the status of the latest on-demand cluster insights refresh operation.
 */
export const describeInsightsRefresh: API.OperationMethod<
  DescribeInsightsRefreshRequest,
  DescribeInsightsRefreshResponse,
  DescribeInsightsRefreshError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /clusters/{clusterName}/insights-refresh",
    input: { clusterName: 0 },
    output: { startedAt: D.ts, endedAt: D.ts },
  },
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInsightsRefresh",
})) as any;

export type DescribeNodegroupError =
  | ClientException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Describes a managed node group.
 */
export const describeNodegroup: API.OperationMethod<
  DescribeNodegroupRequest,
  DescribeNodegroupResponse,
  DescribeNodegroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /clusters/{clusterName}/node-groups/{nodegroupName}",
    input: { clusterName: 0, nodegroupName: 0 },
    output: { nodegroup: o_Nodegroup },
  },
  errors: [
    ClientException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNodegroup",
})) as any;

export type DescribePodIdentityAssociationError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Returns descriptive information about an EKS Pod Identity association.
 *
 * This action requires the ID of the association. You can get the ID from the response to
 * the `CreatePodIdentityAssocation` for newly created associations. Or, you can
 * list the IDs for associations with `ListPodIdentityAssociations` and filter the
 * list by namespace or service account.
 */
export const describePodIdentityAssociation: API.OperationMethod<
  DescribePodIdentityAssociationRequest,
  DescribePodIdentityAssociationResponse,
  DescribePodIdentityAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /clusters/{clusterName}/pod-identity-associations/{associationId}",
    input: { clusterName: 0, associationId: 0 },
    output: { association: o_PodIdentityAssociation },
  },
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePodIdentityAssociation",
})) as any;

export type DescribeUpdateError =
  | ClientException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Describes an update to an Amazon EKS resource.
 *
 * When the status of the update is `Successful`, the update is complete. If
 * an update fails, the status is `Failed`, and an error detail explains the
 * reason for the failure.
 */
export const describeUpdate: API.OperationMethod<
  DescribeUpdateRequest,
  DescribeUpdateResponse,
  DescribeUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /clusters/{name}/updates/{updateId}",
    input: {
      name: 0,
      updateId: 0,
      nodegroupName: D.m({ query: "nodegroupName" }),
      addonName: D.m({ query: "addonName" }),
      capabilityName: D.m({ query: "capabilityName" }),
    },
    output: { update: o_Update },
  },
  errors: [
    ClientException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUpdate",
})) as any;

export type DisassociateAccessPolicyError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Disassociates an access policy from an access entry.
 */
export const disassociateAccessPolicy: API.OperationMethod<
  DisassociateAccessPolicyRequest,
  DisassociateAccessPolicyResponse,
  DisassociateAccessPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /clusters/{clusterName}/access-entries/{principalArn}/access-policies/{policyArn}",
    input: { clusterName: 0, principalArn: 0, policyArn: 0 },
  },
  errors: [InvalidRequestException, ResourceNotFoundException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateAccessPolicy",
})) as any;

export type DisassociateIdentityProviderConfigError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Disassociates an identity provider configuration from a cluster.
 *
 * If you disassociate an identity provider from your cluster, users included in the
 * provider can no longer access the cluster. However, you can still access the cluster
 * with IAM principals.
 */
export const disassociateIdentityProviderConfig: API.OperationMethod<
  DisassociateIdentityProviderConfigRequest,
  DisassociateIdentityProviderConfigResponse,
  DisassociateIdentityProviderConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /clusters/{clusterName}/identity-provider-configs/disassociate",
    input: {
      clusterName: 0,
      identityProviderConfig: i_IdentityProviderConfig,
      clientRequestToken: D.m({ idempotency: true }),
    },
    output: { update: o_Update },
    body: true,
  },
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateIdentityProviderConfig",
})) as any;

export type ListAccessEntriesError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Lists the access entries for your cluster.
 */
export const listAccessEntries: API.PaginatedOperationMethod<
  ListAccessEntriesRequest,
  ListAccessEntriesResponse,
  ListAccessEntriesError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /clusters/{clusterName}/access-entries",
    input: {
      clusterName: 0,
      associatedPolicyArn: D.m({ query: "associatedPolicyArn" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessEntries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "accessEntries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAccessPoliciesError = ServerException | CommonErrors;
/**
 * Lists the available access policies.
 */
export const listAccessPolicies: API.PaginatedOperationMethod<
  ListAccessPoliciesRequest,
  ListAccessPoliciesResponse,
  ListAccessPoliciesError,
  Credentials | HttpClient.HttpClient,
  AccessPolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /access-policies",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessPolicies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "accessPolicies",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAddonsError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Lists the installed add-ons.
 */
export const listAddons: API.PaginatedOperationMethod<
  ListAddonsRequest,
  ListAddonsResponse,
  ListAddonsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /clusters/{clusterName}/addons",
    input: {
      clusterName: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAddons",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "addons",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssociatedAccessPoliciesError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Lists the access policies associated with an access entry.
 */
export const listAssociatedAccessPolicies: API.PaginatedOperationMethod<
  ListAssociatedAccessPoliciesRequest,
  ListAssociatedAccessPoliciesResponse,
  ListAssociatedAccessPoliciesError,
  Credentials | HttpClient.HttpClient,
  AssociatedAccessPolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /clusters/{clusterName}/access-entries/{principalArn}/access-policies",
    input: {
      clusterName: 0,
      principalArn: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { associatedAccessPolicies: D.list(o_AssociatedAccessPolicy) },
  },
  errors: [InvalidRequestException, ResourceNotFoundException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociatedAccessPolicies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "associatedAccessPolicies",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCapabilitiesError =
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Lists all managed capabilities in your Amazon EKS cluster. You can use this operation to get an overview of all capabilities and their current status.
 */
export const listCapabilities: API.PaginatedOperationMethod<
  ListCapabilitiesRequest,
  ListCapabilitiesResponse,
  ListCapabilitiesError,
  Credentials | HttpClient.HttpClient,
  CapabilitySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /clusters/{clusterName}/capabilities",
    input: {
      clusterName: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { capabilities: D.list({ createdAt: D.ts, modifiedAt: D.ts }) },
  },
  errors: [InvalidParameterException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCapabilities",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "capabilities",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCertificateAuthoritiesError =
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists the certificate authorities (CAs) for your cluster. A cluster has at most two
 * certificate authorities: the outgoing CA that's currently signing and, during a rotation,
 * one successor CA.
 */
export const listCertificateAuthorities: API.PaginatedOperationMethod<
  ListCertificateAuthoritiesRequest,
  ListCertificateAuthoritiesResponse,
  ListCertificateAuthoritiesError,
  Credentials | HttpClient.HttpClient,
  CertificateAuthoritySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /clusters/{clusterName}/certificate-authorities",
    input: {
      clusterName: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { certificateAuthorities: D.list(o_CertificateAuthoritySummary) },
  },
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCertificateAuthorities",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "certificateAuthorities",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListClustersError =
  | ClientException
  | InvalidParameterException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists the Amazon EKS clusters in your Amazon Web Services account in the specified Amazon Web Services Region.
 */
export const listClusters: API.PaginatedOperationMethod<
  ListClustersRequest,
  ListClustersResponse,
  ListClustersError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /clusters",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      include: D.m({ query: "include" }),
    },
  },
  errors: [
    ClientException,
    InvalidParameterException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClusters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "clusters",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEksAnywhereSubscriptionsError =
  | ClientException
  | InvalidParameterException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Displays the full description of the subscription.
 */
export const listEksAnywhereSubscriptions: API.PaginatedOperationMethod<
  ListEksAnywhereSubscriptionsRequest,
  ListEksAnywhereSubscriptionsResponse,
  ListEksAnywhereSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  EksAnywhereSubscription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /eks-anywhere-subscriptions",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      includeStatus: D.m({ query: "includeStatus" }),
    },
    output: { subscriptions: D.list(o_EksAnywhereSubscription) },
  },
  errors: [
    ClientException,
    InvalidParameterException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEksAnywhereSubscriptions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "subscriptions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFargateProfilesError =
  | ClientException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Lists the Fargate profiles associated with the specified cluster in your Amazon Web Services
 * account in the specified Amazon Web Services Region.
 */
export const listFargateProfiles: API.PaginatedOperationMethod<
  ListFargateProfilesRequest,
  ListFargateProfilesResponse,
  ListFargateProfilesError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /clusters/{clusterName}/fargate-profiles",
    input: {
      clusterName: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    ClientException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFargateProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "fargateProfileNames",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIdentityProviderConfigsError =
  | ClientException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists the identity provider configurations for your cluster.
 */
export const listIdentityProviderConfigs: API.PaginatedOperationMethod<
  ListIdentityProviderConfigsRequest,
  ListIdentityProviderConfigsResponse,
  ListIdentityProviderConfigsError,
  Credentials | HttpClient.HttpClient,
  IdentityProviderConfig
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /clusters/{clusterName}/identity-provider-configs",
    input: {
      clusterName: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    ClientException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdentityProviderConfigs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "identityProviderConfigs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListInsightsError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Returns a list of all insights checked for against the specified cluster. You can
 * filter which insights are returned by category, associated Kubernetes version, and
 * status. The default filter lists all categories and every status.
 *
 * The following lists the available categories:
 *
 * - `UPGRADE_READINESS`: Amazon EKS identifies issues that could impact your
 * ability to upgrade to new versions of Kubernetes. These are called upgrade insights.
 *
 * - `MISCONFIGURATION`: Amazon EKS identifies misconfiguration in your EKS
 * Hybrid Nodes setup that could impair functionality of your cluster or
 * workloads. These are called configuration insights.
 */
export const listInsights: API.PaginatedOperationMethod<
  ListInsightsRequest,
  ListInsightsResponse,
  ListInsightsError,
  Credentials | HttpClient.HttpClient,
  InsightSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /clusters/{clusterName}/insights",
    input: {
      clusterName: 0,
      filter: { categories: 0, kubernetesVersions: 0, statuses: 0 },
      maxResults: 0,
      nextToken: 0,
    },
    output: {
      insights: D.list({ lastRefreshTime: D.ts, lastTransitionTime: D.ts }),
    },
    body: true,
  },
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInsights",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "insights",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNodegroupsError =
  | ClientException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists the managed node groups associated with the specified cluster in your Amazon Web Services
 * account in the specified Amazon Web Services Region. Self-managed node groups aren't listed.
 */
export const listNodegroups: API.PaginatedOperationMethod<
  ListNodegroupsRequest,
  ListNodegroupsResponse,
  ListNodegroupsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /clusters/{clusterName}/node-groups",
    input: {
      clusterName: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    ClientException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNodegroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "nodegroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPodIdentityAssociationsError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * List the EKS Pod Identity associations in a cluster. You can filter the list by the namespace that the
 * association is in or the service account that the association uses.
 */
export const listPodIdentityAssociations: API.PaginatedOperationMethod<
  ListPodIdentityAssociationsRequest,
  ListPodIdentityAssociationsResponse,
  ListPodIdentityAssociationsError,
  Credentials | HttpClient.HttpClient,
  PodIdentityAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /clusters/{clusterName}/pod-identity-associations",
    input: {
      clusterName: 0,
      namespace: D.m({ query: "namespace" }),
      serviceAccount: D.m({ query: "serviceAccount" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPodIdentityAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "associations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | NotFoundException
  | CommonErrors;
/**
 * List the tags for an Amazon EKS resource.
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
  errors: [BadRequestException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListUpdatesError =
  | ClientException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Lists the updates associated with an Amazon EKS resource in your Amazon Web Services account, in the
 * specified Amazon Web Services Region.
 */
export const listUpdates: API.PaginatedOperationMethod<
  ListUpdatesRequest,
  ListUpdatesResponse,
  ListUpdatesError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /clusters/{name}/updates",
    input: {
      name: 0,
      nodegroupName: D.m({ query: "nodegroupName" }),
      addonName: D.m({ query: "addonName" }),
      capabilityName: D.m({ query: "capabilityName" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    ClientException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUpdates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "updateIds",
    pageSize: "maxResults",
  } as const,
})) as any;

export type RegisterClusterError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ResourceInUseException
  | ResourceLimitExceededException
  | ResourcePropagationDelayException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Connects a Kubernetes cluster to the Amazon EKS control plane.
 *
 * Any Kubernetes cluster can be connected to the Amazon EKS control plane to view current
 * information about the cluster and its nodes.
 *
 * Cluster connection requires two steps. First, send a
 * `RegisterClusterRequest`
 * to add it to the Amazon EKS control
 * plane.
 *
 * Second, a Manifest containing the `activationID` and
 * `activationCode` must be applied to the Kubernetes cluster through it's native
 * provider to provide visibility.
 *
 * After the manifest is updated and applied, the connected cluster is visible to the
 * Amazon EKS control plane. If the manifest isn't applied within three days, the connected
 * cluster will no longer be visible and must be deregistered using
 * `DeregisterCluster`.
 */
export const registerCluster: API.OperationMethod<
  RegisterClusterRequest,
  RegisterClusterResponse,
  RegisterClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /cluster-registrations",
    input: {
      name: 0,
      connectorConfig: { roleArn: 0, provider: 0 },
      clientRequestToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: { cluster: o_Cluster },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ResourceInUseException,
    ResourceLimitExceededException,
    ResourcePropagationDelayException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterCluster",
})) as any;

export type StartInsightsRefreshError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Initiates an on-demand refresh operation for cluster insights, getting the latest analysis outside of the standard refresh schedule.
 */
export const startInsightsRefresh: API.OperationMethod<
  StartInsightsRefreshRequest,
  StartInsightsRefreshResponse,
  StartInsightsRefreshError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /clusters/{clusterName}/insights-refresh",
    input: { clusterName: 0 },
  },
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartInsightsRefresh",
})) as any;

export type TagResourceError =
  | BadRequestException
  | NotFoundException
  | CommonErrors;
/**
 * Associates the specified tags to an Amazon EKS resource with the specified
 * `resourceArn`. If existing tags on a resource are not specified in the
 * request parameters, they aren't changed. When a resource is deleted, the tags associated
 * with that resource are also deleted. Tags that you create for Amazon EKS resources don't
 * propagate to any other resources associated with the cluster. For example, if you tag a
 * cluster with this operation, that tag doesn't automatically propagate to the subnets and
 * nodes associated with the cluster.
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
  errors: [BadRequestException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | BadRequestException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes specified tags from an Amazon EKS resource.
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
  errors: [BadRequestException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAccessEntryError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Updates an access entry.
 */
export const updateAccessEntry: API.OperationMethod<
  UpdateAccessEntryRequest,
  UpdateAccessEntryResponse,
  UpdateAccessEntryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /clusters/{clusterName}/access-entries/{principalArn}",
    input: {
      clusterName: 0,
      principalArn: 0,
      kubernetesGroups: 0,
      clientRequestToken: D.m({ idempotency: true }),
      username: 0,
    },
    output: { accessEntry: o_AccessEntry },
    body: true,
  },
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccessEntry",
})) as any;

export type UpdateAddonError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Updates an Amazon EKS add-on.
 */
export const updateAddon: API.OperationMethod<
  UpdateAddonRequest,
  UpdateAddonResponse,
  UpdateAddonError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /clusters/{clusterName}/addons/{addonName}/update",
    input: {
      clusterName: 0,
      addonName: 0,
      addonVersion: 0,
      serviceAccountRoleArn: 0,
      resolveConflicts: 0,
      clientRequestToken: D.m({ idempotency: true }),
      configurationValues: 0,
      podIdentityAssociations: D.list(i_AddonPodIdentityAssociations),
    },
    output: { update: o_Update },
    body: true,
  },
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAddon",
})) as any;

export type UpdateCapabilityError =
  | AccessDeniedException
  | InvalidParameterException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Updates the configuration of a managed capability in your Amazon EKS cluster. You can update the IAM role, configuration settings, and delete propagation policy for a capability.
 *
 * When you update a capability, Amazon EKS applies the changes and may restart capability components as needed. The capability remains available during the update process, but some operations may be temporarily unavailable.
 */
export const updateCapability: API.OperationMethod<
  UpdateCapabilityRequest,
  UpdateCapabilityResponse,
  UpdateCapabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /clusters/{clusterName}/capabilities/{capabilityName}",
    input: {
      clusterName: 0,
      capabilityName: 0,
      roleArn: 0,
      configuration: {
        argoCd: {
          rbacRoleMappings: {
            addOrUpdateRoleMappings: D.list(i_ArgoCdRoleMapping),
            removeRoleMappings: D.list(i_ArgoCdRoleMapping),
          },
          networkAccess: i_ArgoCdNetworkAccessConfigRequest,
        },
      },
      clientRequestToken: D.m({ idempotency: true }),
      deletePropagationPolicy: 0,
    },
    output: { update: o_Update },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InvalidParameterException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCapability",
})) as any;

export type UpdateClusterConfigError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an Amazon EKS cluster configuration. Your cluster continues to function during the
 * update. The response output includes an update ID that you can use to track the status
 * of your cluster update with `DescribeUpdate`.
 *
 * You can use this operation to do the following actions:
 *
 * - You can use this API operation to enable or disable exporting the Kubernetes
 * control plane logs for your cluster to CloudWatch Logs. By default, cluster control plane
 * logs aren't exported to CloudWatch Logs. For more information, see Amazon EKS Cluster control plane logs in the
 *
 * *Amazon EKS User Guide*
 * .
 *
 * CloudWatch Logs ingestion, archive storage, and data scanning rates apply to
 * exported control plane logs. For more information, see CloudWatch Pricing.
 *
 * - You can also use this API operation to enable or disable public and private
 * access to your cluster's Kubernetes API server endpoint. By default, public access is
 * enabled, and private access is disabled. For more information, see
 * Cluster API server endpoint in the
 *
 * *Amazon EKS User Guide*
 * .
 *
 * - You can also use this API operation to choose different subnets and security
 * groups for the cluster. You must specify at least two subnets that are in
 * different Availability Zones. You can't change which VPC the subnets are from, the subnets
 * must be in the same VPC as the subnets that the cluster was created with. For
 * more information about the VPC requirements, see https://docs.aws.amazon.com/eks/latest/userguide/network_reqs.html in the
 *
 * *Amazon EKS User Guide*
 * .
 *
 * - You can also use this API operation to enable or disable ARC zonal shift. If
 * zonal shift is enabled, Amazon Web Services configures zonal autoshift for the cluster.
 *
 * - You can also use this API operation to add, change, or remove the
 * configuration in the cluster for EKS Hybrid Nodes. To remove the configuration,
 * use the `remoteNetworkConfig` key with an object containing both
 * subkeys with empty arrays for each. Here is an inline example:
 * "remoteNetworkConfig": { "remoteNodeNetworks": [],
 * "remotePodNetworks": [] }.
 *
 * Cluster updates are asynchronous, and they should finish within a few minutes. During
 * an update, the cluster status moves to `UPDATING` (this status transition is
 * eventually consistent). When the update is complete (either `Failed` or
 * `Successful`), the cluster status moves to `Active`.
 */
export const updateClusterConfig: API.OperationMethod<
  UpdateClusterConfigRequest,
  UpdateClusterConfigResponse,
  UpdateClusterConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /clusters/{name}/update-config",
    input: {
      name: 0,
      resourcesVpcConfig: i_VpcConfigRequest,
      logging: i_Logging,
      clientRequestToken: D.m({ idempotency: true }),
      accessConfig: { authenticationMode: 0 },
      upgradePolicy: i_UpgradePolicyRequest,
      zonalShiftConfig: i_ZonalShiftConfigRequest,
      computeConfig: i_ComputeConfigRequest,
      kubernetesNetworkConfig: i_KubernetesNetworkConfigRequest,
      storageConfig: i_StorageConfigRequest,
      remoteNetworkConfig: i_RemoteNetworkConfigRequest,
      deletionProtection: 0,
      controlPlaneScalingConfig: i_ControlPlaneScalingConfig,
      kubeApiServerConfig: i_KubeApiServerConfigRequest,
      kubeSchedulerConfig: i_KubeSchedulerConfigRequest,
      kubeControllerManagerConfig: i_KubeControllerManagerConfigRequest,
    },
    output: { update: o_Update },
    body: true,
  },
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateClusterConfig",
})) as any;

export type UpdateClusterVersionError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | InvalidStateException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an Amazon EKS cluster to the specified Kubernetes version. Your cluster continues to
 * function during the update. The response output includes an update ID that you can use
 * to track the status of your cluster update with the
 * `DescribeUpdate`
 * API operation.
 *
 * Cluster updates are asynchronous, and they should finish within a few minutes. During
 * an update, the cluster status moves to `UPDATING` (this status transition is
 * eventually consistent). When the update is complete (either `Failed` or
 * `Successful`), the cluster status moves to `Active`.
 *
 * If your cluster has managed node groups attached to it, all of your node groups' Kubernetes
 * versions must match the cluster's Kubernetes version in order to update the cluster to a new
 * Kubernetes version.
 */
export const updateClusterVersion: API.OperationMethod<
  UpdateClusterVersionRequest,
  UpdateClusterVersionResponse,
  UpdateClusterVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /clusters/{name}/updates",
    input: {
      name: 0,
      version: 0,
      clientRequestToken: D.m({ idempotency: true }),
      force: 0,
      rollbackConfig: { timeoutMinutes: 0 },
    },
    output: { update: o_Update },
    body: true,
  },
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    InvalidStateException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateClusterVersion",
})) as any;

export type UpdateEksAnywhereSubscriptionError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Update an EKS Anywhere Subscription. Only auto renewal and tags can be updated after
 * subscription creation.
 */
export const updateEksAnywhereSubscription: API.OperationMethod<
  UpdateEksAnywhereSubscriptionRequest,
  UpdateEksAnywhereSubscriptionResponse,
  UpdateEksAnywhereSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /eks-anywhere-subscriptions/{id}",
    input: {
      id: 0,
      autoRenew: 0,
      clientRequestToken: D.m({ idempotency: true }),
    },
    output: { subscription: o_EksAnywhereSubscription },
    body: true,
  },
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEksAnywhereSubscription",
})) as any;

export type UpdateNodegroupConfigError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Updates an Amazon EKS managed node group configuration. Your node group continues to
 * function during the update. The response output includes an update ID that you can use
 * to track the status of your node group update with the
 * `DescribeUpdate`
 * API operation. You can update the Kubernetes labels
 * and taints for a node group and the scaling and version update configuration.
 */
export const updateNodegroupConfig: API.OperationMethod<
  UpdateNodegroupConfigRequest,
  UpdateNodegroupConfigResponse,
  UpdateNodegroupConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /clusters/{clusterName}/node-groups/{nodegroupName}/update-config",
    input: {
      clusterName: 0,
      nodegroupName: 0,
      labels: { addOrUpdateLabels: 0, removeLabels: 0 },
      taints: {
        addOrUpdateTaints: D.list(i_Taint),
        removeTaints: D.list(i_Taint),
      },
      scalingConfig: i_NodegroupScalingConfig,
      updateConfig: i_NodegroupUpdateConfig,
      nodeRepairConfig: i_NodeRepairConfig,
      warmPoolConfig: i_WarmPoolConfig,
      clientRequestToken: D.m({ idempotency: true }),
    },
    output: { update: o_Update },
    body: true,
  },
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNodegroupConfig",
})) as any;

export type UpdateNodegroupVersionError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Updates the Kubernetes version or AMI version of an Amazon EKS managed node group.
 *
 * You can update a node group using a launch template only if the node group was
 * originally deployed with a launch template. Additionally, the launch template ID or name
 * must match what was used when the node group was created. You can update the launch
 * template version with necessary changes.
 *
 * If you need to update a custom AMI in a node group that was deployed with a launch
 * template, then update your custom AMI, specify the new ID in a new version of the launch
 * template, and then update the node group to the new version of the launch
 * template.
 *
 * If you update without a launch template, then you can update to the latest available
 * AMI version of a node group's current Kubernetes version by not specifying a Kubernetes version in
 * the request. You can update to the latest AMI version of your cluster's current Kubernetes
 * version by specifying your cluster's Kubernetes version in the request. For information about
 * Linux versions, see Amazon EKS optimized Amazon Linux AMI versions in the
 * *Amazon EKS User Guide*. For information about Windows versions, see Amazon EKS
 * optimized Windows AMI versions in the *Amazon EKS User Guide*.
 *
 * You cannot roll back a node group to an earlier Kubernetes version or AMI version.
 *
 * When a node in a managed node group is terminated due to a scaling action or update,
 * every `Pod` on that node is drained first. Amazon EKS attempts to drain the nodes
 * gracefully and will fail if it is unable to do so. You can `force` the update
 * if Amazon EKS is unable to drain the nodes as a result of a `Pod` disruption
 * budget issue.
 */
export const updateNodegroupVersion: API.OperationMethod<
  UpdateNodegroupVersionRequest,
  UpdateNodegroupVersionResponse,
  UpdateNodegroupVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /clusters/{clusterName}/node-groups/{nodegroupName}/update-version",
    input: {
      clusterName: 0,
      nodegroupName: 0,
      version: 0,
      releaseVersion: 0,
      launchTemplate: i_LaunchTemplateSpecification,
      force: 0,
      clientRequestToken: D.m({ idempotency: true }),
    },
    output: { update: o_Update },
    body: true,
  },
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNodegroupVersion",
})) as any;

export type UpdatePodIdentityAssociationError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Updates a EKS Pod Identity association. In an update, you can change the IAM role, the target IAM role, or `disableSessionTags`.
 * You must change at least one of these in an update. An association can't be moved
 * between clusters, namespaces, or service accounts. If you need to edit the namespace
 * or service account, you need to delete the association and then create a new
 * association with your desired settings.
 *
 * Similar to Amazon Web Services IAM behavior, EKS Pod Identity associations are eventually consistent,
 * and may take several seconds to be effective after the initial API call returns
 * successfully. You must design your applications to account for these potential delays.
 * We recommend that you don’t include association create/updates in the
 * critical, high-availability code paths of your application. Instead, make changes in a
 * separate initialization or setup routine that you run less frequently.
 *
 * You can set a *target IAM role* in the same or a different
 * account for advanced scenarios. With a target role, EKS Pod Identity automatically performs two
 * role assumptions in sequence: first assuming the role in the association that is in this
 * account, then using those credentials to assume the target IAM role. This process
 * provides your Pod with temporary credentials that have the permissions defined in the
 * target role, allowing secure access to resources in another Amazon Web Services account.
 */
export const updatePodIdentityAssociation: API.OperationMethod<
  UpdatePodIdentityAssociationRequest,
  UpdatePodIdentityAssociationResponse,
  UpdatePodIdentityAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /clusters/{clusterName}/pod-identity-associations/{associationId}",
    input: {
      clusterName: 0,
      associationId: 0,
      roleArn: 0,
      clientRequestToken: D.m({ idempotency: true }),
      disableSessionTags: 0,
      targetRoleArn: 0,
      policy: 0,
    },
    output: { association: o_PodIdentityAssociation },
    body: true,
  },
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePodIdentityAssociation",
})) as any;

const i_AddonPodIdentityAssociations: D.LazyStruct = () => ({
  serviceAccount: 0,
  roleArn: 0,
});
const i_ArgoCdNetworkAccessConfigRequest: D.LazyStruct = () => ({ vpceIds: 0 });
const i_ArgoCdRoleMapping: D.LazyStruct = () => ({
  role: 0,
  identities: D.list({ id: 0, type: 0 }),
});
const i_ComputeConfigRequest: D.LazyStruct = () => ({
  enabled: 0,
  nodePools: 0,
  nodeRoleArn: 0,
});
const i_ControlPlaneScalingConfig: D.LazyStruct = () => ({ tier: 0 });
const i_EncryptionConfig: D.LazyStruct = () => ({
  resources: 0,
  provider: { keyArn: 0 },
});
const i_IdentityProviderConfig: D.LazyStruct = () => ({ type: 0, name: 0 });
const i_KubeApiServerConfigRequest: D.LazyStruct = () => ({
  eventTtl: 0,
  serviceNodePortRange: { minPort: 0, maxPort: 0 },
});
const i_KubeControllerManagerConfigRequest: D.LazyStruct = () => ({
  podGcControllerConfig: { terminatedPodGcThreshold: 0 },
  horizontalPodAutoscalerControllerConfig: {
    horizontalPodAutoscalerSyncPeriod: 0,
  },
});
const i_KubeSchedulerConfigRequest: D.LazyStruct = () => ({
  nodeResourcesFit: {
    scoringStrategy: { type: 0, resources: D.list({ name: 0, weight: 0 }) },
  },
});
const i_KubernetesNetworkConfigRequest: D.LazyStruct = () => ({
  serviceIpv4Cidr: 0,
  ipFamily: 0,
  elasticLoadBalancing: { enabled: 0 },
});
const i_LaunchTemplateSpecification: D.LazyStruct = () => ({
  name: 0,
  version: 0,
  id: 0,
});
const i_Logging: D.LazyStruct = () => ({
  clusterLogging: D.list({ types: 0, enabled: 0 }),
});
const i_NodeRepairConfig: D.LazyStruct = () => ({
  enabled: 0,
  maxUnhealthyNodeThresholdCount: 0,
  maxUnhealthyNodeThresholdPercentage: 0,
  maxParallelNodesRepairedCount: 0,
  maxParallelNodesRepairedPercentage: 0,
  nodeRepairConfigOverrides: D.list({
    nodeMonitoringCondition: 0,
    nodeUnhealthyReason: 0,
    minRepairWaitTimeMins: 0,
    repairAction: 0,
  }),
});
const i_NodegroupScalingConfig: D.LazyStruct = () => ({
  minSize: 0,
  maxSize: 0,
  desiredSize: 0,
});
const i_NodegroupUpdateConfig: D.LazyStruct = () => ({
  maxUnavailable: 0,
  maxUnavailablePercentage: 0,
  updateStrategy: 0,
});
const i_RemoteNetworkConfigRequest: D.LazyStruct = () => ({
  remoteNodeNetworks: D.list({ cidrs: 0 }),
  remotePodNetworks: D.list({ cidrs: 0 }),
});
const i_StorageConfigRequest: D.LazyStruct = () => ({
  blockStorage: { enabled: 0 },
});
const i_Taint: D.LazyStruct = () => ({ key: 0, value: 0, effect: 0 });
const i_UpgradePolicyRequest: D.LazyStruct = () => ({ supportType: 0 });
const i_VpcConfigRequest: D.LazyStruct = () => ({
  subnetIds: 0,
  securityGroupIds: 0,
  endpointPublicAccess: 0,
  endpointPrivateAccess: 0,
  publicAccessCidrs: 0,
  controlPlaneEgressMode: 0,
});
const i_WarmPoolConfig: D.LazyStruct = () => ({
  enabled: 0,
  minSize: 0,
  maxGroupPreparedCapacity: 0,
  poolState: 0,
  reuseOnScaleIn: 0,
});
const i_ZonalShiftConfigRequest: D.LazyStruct = () => ({ enabled: 0 });
const o_AccessEntry: D.LazyStruct = () => ({
  createdAt: D.ts,
  modifiedAt: D.ts,
});
const o_Addon: D.LazyStruct = () => ({ createdAt: D.ts, modifiedAt: D.ts });
const o_AssociatedAccessPolicy: D.LazyStruct = () => ({
  associatedAt: D.ts,
  modifiedAt: D.ts,
});
const o_Capability: D.LazyStruct = () => ({
  createdAt: D.ts,
  modifiedAt: D.ts,
});
const o_CertificateAuthoritySummary: D.LazyStruct = () => ({
  createdAt: D.ts,
  activatedAt: D.ts,
});
const o_Cluster: D.LazyStruct = () => ({
  createdAt: D.ts,
  connectorConfig: { activationExpiry: D.ts },
});
const o_EksAnywhereSubscription: D.LazyStruct = () => ({
  createdAt: D.ts,
  effectiveDate: D.ts,
  expirationDate: D.ts,
});
const o_FargateProfile: D.LazyStruct = () => ({ createdAt: D.ts });
const o_Nodegroup: D.LazyStruct = () => ({ createdAt: D.ts, modifiedAt: D.ts });
const o_PodIdentityAssociation: D.LazyStruct = () => ({
  createdAt: D.ts,
  modifiedAt: D.ts,
});
const o_Update: D.LazyStruct = () => ({ createdAt: D.ts });
