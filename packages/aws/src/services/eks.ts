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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "EKS", serviceShapeName: "AWSWesleyFrontend" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "eks" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-11-01");
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
            return e(`https://eks-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://eks.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://eks.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://eks.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ClientException
  extends /*@__PURE__*/ S.TaggedError<ClientException>()(
    "ClientException",
    {
      clusterName: /*@__PURE__*/ S.optional(S.String),
      nodegroupName: /*@__PURE__*/ S.optional(S.String),
      addonName: /*@__PURE__*/ S.optional(S.String),
      subscriptionId: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    {
      clusterName: /*@__PURE__*/ S.optional(S.String),
      nodegroupName: /*@__PURE__*/ S.optional(S.String),
      fargateProfileName: /*@__PURE__*/ S.optional(S.String),
      addonName: /*@__PURE__*/ S.optional(S.String),
      subscriptionId: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    {
      clusterName: /*@__PURE__*/ S.optional(S.String),
      nodegroupName: /*@__PURE__*/ S.optional(S.String),
      addonName: /*@__PURE__*/ S.optional(S.String),
      subscriptionId: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidStateException>()(
    "InvalidStateException",
    {
      clusterName: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    {
      clusterName: /*@__PURE__*/ S.optional(S.String),
      nodegroupName: /*@__PURE__*/ S.optional(S.String),
      addonName: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceLimitExceededException>()(
    "ResourceLimitExceededException",
    {
      clusterName: /*@__PURE__*/ S.optional(S.String),
      nodegroupName: /*@__PURE__*/ S.optional(S.String),
      subscriptionId: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      clusterName: /*@__PURE__*/ S.optional(S.String),
      nodegroupName: /*@__PURE__*/ S.optional(S.String),
      fargateProfileName: /*@__PURE__*/ S.optional(S.String),
      addonName: /*@__PURE__*/ S.optional(S.String),
      subscriptionId: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourcePropagationDelayException
  extends /*@__PURE__*/ S.TaggedError<ResourcePropagationDelayException>()(
    "ResourcePropagationDelayException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(428),
  ) {}
export class ServerException
  extends /*@__PURE__*/ S.TaggedError<ServerException>()(
    "ServerException",
    {
      clusterName: /*@__PURE__*/ S.optional(S.String),
      nodegroupName: /*@__PURE__*/ S.optional(S.String),
      addonName: /*@__PURE__*/ S.optional(S.String),
      subscriptionId: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      clusterName: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnsupportedAvailabilityZoneException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedAvailabilityZoneException>()(
    "UnsupportedAvailabilityZoneException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      clusterName: /*@__PURE__*/ S.optional(S.String),
      nodegroupName: /*@__PURE__*/ S.optional(S.String),
      validZones: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(0, __c0, 0)).annotate({ identifier: "StringList" }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export interface ActivateCertificateAuthorityRequest {
  clusterName: string;
  certificateAuthorityId: string;
  clientRequestToken?: string;
}
export type UpdateStatus = "InProgress" | "Failed" | "Cancelled" | "Successful" | (string & {});
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
export type CancellationStatus = "InProgress" | "Failed" | "Successful" | (string & {});
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
export type CertificateAuthorityActivatedBy = "EKS" | "CUSTOMER" | (string & {});
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
export type ResolveConflicts = "OVERWRITE" | "NONE" | "PRESERVE" | (string & {});
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
export type ArgoCdEndpointPrefix = string;
export interface ArgoCdConfigRequest {
  namespace?: string;
  awsIdc: ArgoCdAwsIdcConfigRequest;
  rbacRoleMappings?: ArgoCdRoleMapping[];
  networkAccess?: ArgoCdNetworkAccessConfigRequest;
  endpointPrefix?: string;
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
  endpointPrefix?: string;
}
export interface CapabilityConfigurationResponse {
  argoCd?: ArgoCdConfigResponse;
}
export type CapabilityIssueCode = "AccessDenied" | "ClusterUnreachable" | (string & {});
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
export type AuthenticationMode = "API" | "API_AND_CONFIG_MAP" | "CONFIG_MAP" | (string & {});
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
export type ScoringStrategyType = "LeastAllocated" | "MostAllocated" | (string & {});
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
export type TaintEffect = "NO_SCHEDULE" | "NO_EXECUTE" | "PREFER_NO_SCHEDULE" | (string & {});
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
export type CapacityTypes = "ON_DEMAND" | "SPOT" | "CAPACITY_BLOCK" | (string & {});
export type WarmPoolState = "STOPPED" | "RUNNING" | "HIBERNATED" | (string & {});
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
export type VersionStatus = "UNSUPPORTED" | "STANDARD_SUPPORT" | "EXTENDED_SUPPORT" | (string & {});
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
export type InsightStatusValue = "PASSING" | "WARNING" | "ERROR" | "UNKNOWN" | (string & {});
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
export type InsightsRefreshStatus = "IN_PROGRESS" | "FAILED" | "COMPLETED" | (string & {});
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
export type EksAnywhereSubscriptionStatusValues = EksAnywhereSubscriptionStatus[];
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
  input: __S(32, __c1, 0) as any as S.Schema<ActivateCertificateAuthorityRequest>,
  output: __S(128, __c4, 0) as any as S.Schema<ActivateCertificateAuthorityResponse>,
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ActivateCertificateAuthority",
}));

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
  input: __S(192, __c6, 0) as any as S.Schema<AssociateAccessPolicyRequest>,
  output: __S(193, __c6, 1) as any as S.Schema<AssociateAccessPolicyResponse>,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateAccessPolicy",
}));

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
  input: __S(256, __c8, 0) as any as S.Schema<AssociateEncryptionConfigRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<AssociateEncryptionConfigResponse>,
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
}));

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
  input: __S(353, __c11, 1) as any as S.Schema<AssociateIdentityProviderConfigRequest>,
  output: __S(354, __c11, 2) as any as S.Schema<AssociateIdentityProviderConfigResponse>,
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
}));

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
  input: __S(416, __c13, 0) as any as S.Schema<CancelUpdateRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<CancelUpdateResponse>,
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
}));

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
  input: __S(448, __c14, 0) as any as S.Schema<CreateAccessEntryRequest>,
  output: __S(481, __c15, 1) as any as S.Schema<CreateAccessEntryResponse>,
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
}));

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
  input: __S(512, __c16, 0) as any as S.Schema<CreateAddonRequest>,
  output: __S(578, __c18, 2) as any as S.Schema<CreateAddonResponse>,
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
}));

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
  input: __S(675, __c21, 3) as any as S.Schema<CreateCapabilityRequest>,
  output: __S(711, __c22, 7) as any as S.Schema<CreateCapabilityResponse>,
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
}));

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
  input: __S(768, __c24, 0) as any as S.Schema<CreateCertificateAuthorityRequest>,
  output: __S(128, __c4, 0) as any as S.Schema<CreateCertificateAuthorityResponse>,
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
}));

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
  input: __S(800, __c25, 0) as any as S.Schema<CreateClusterRequest>,
  output: __S(908, __c28, 12) as any as S.Schema<CreateClusterResponse>,
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
}));

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
  input: __S(992, __c31, 0) as any as S.Schema<CreateEksAnywhereSubscriptionRequest>,
  output: __S(1056, __c33, 0) as any as S.Schema<CreateEksAnywhereSubscriptionResponse>,
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
}));

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
  input: __S(1088, __c34, 0) as any as S.Schema<CreateFargateProfileRequest>,
  output: __S(1123, __c35, 3) as any as S.Schema<CreateFargateProfileResponse>,
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
}));

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
  input: __S(1152, __c36, 0) as any as S.Schema<CreateNodegroupRequest>,
  output: __S(1189, __c37, 5) as any as S.Schema<CreateNodegroupResponse>,
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
}));

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
 * We recommend that you don't include association create/updates in the
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
  input: __S(1280, __c40, 0) as any as S.Schema<CreatePodIdentityAssociationRequest>,
  output: __S(1313, __c41, 1) as any as S.Schema<CreatePodIdentityAssociationResponse>,
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
}));

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
  input: __S(1344, __c42, 0) as any as S.Schema<DeleteAccessEntryRequest>,
  output: __S(1376, __c43, 0) as any as S.Schema<DeleteAccessEntryResponse>,
  errors: [InvalidRequestException, ResourceNotFoundException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessEntry",
}));

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
  input: __S(1408, __c44, 0) as any as S.Schema<DeleteAddonRequest>,
  output: __S(578, __c18, 2) as any as S.Schema<DeleteAddonResponse>,
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
}));

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
  input: __S(1440, __c45, 0) as any as S.Schema<DeleteCapabilityRequest>,
  output: __S(711, __c22, 7) as any as S.Schema<DeleteCapabilityResponse>,
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
}));

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
 * certificates for the cluster (its `signingStatus` is `IN_USE`) -- to
 * remove the outgoing CA, first activate the successor CA with
 * `ActivateCertificateAuthority`
 * . Amazon EKS also protects a successor CA
 * from deletion in certain cases to keep a valid rotation path -- for example, a successor
 * that Amazon EKS appended can't be deleted while it's the only successor on the cluster. This is
 * an asynchronous operation that returns an `update` object.
 */
export const deleteCertificateAuthority: API.OperationMethod<
  DeleteCertificateAuthorityRequest,
  DeleteCertificateAuthorityResponse,
  DeleteCertificateAuthorityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1472, __c46, 0) as any as S.Schema<DeleteCertificateAuthorityRequest>,
  output: __S(128, __c4, 0) as any as S.Schema<DeleteCertificateAuthorityResponse>,
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
}));

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
  input: __S(1504, __c47, 0) as any as S.Schema<DeleteClusterRequest>,
  output: __S(908, __c28, 12) as any as S.Schema<DeleteClusterResponse>,
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
}));

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
  input: __S(1536, __c48, 0) as any as S.Schema<DeleteEksAnywhereSubscriptionRequest>,
  output: __S(1056, __c33, 0) as any as S.Schema<DeleteEksAnywhereSubscriptionResponse>,
  errors: [ClientException, InvalidRequestException, ResourceNotFoundException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEksAnywhereSubscription",
}));

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
  input: __S(1568, __c49, 0) as any as S.Schema<DeleteFargateProfileRequest>,
  output: __S(1123, __c35, 3) as any as S.Schema<DeleteFargateProfileResponse>,
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
}));

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
  input: __S(1600, __c50, 0) as any as S.Schema<DeleteNodegroupRequest>,
  output: __S(1189, __c37, 5) as any as S.Schema<DeleteNodegroupResponse>,
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
}));

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
  input: __S(1632, __c51, 0) as any as S.Schema<DeletePodIdentityAssociationRequest>,
  output: __S(1313, __c41, 1) as any as S.Schema<DeletePodIdentityAssociationResponse>,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePodIdentityAssociation",
}));

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
  input: __S(1664, __c52, 0) as any as S.Schema<DeregisterClusterRequest>,
  output: __S(908, __c28, 12) as any as S.Schema<DeregisterClusterResponse>,
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
}));

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
  input: __S(1696, __c53, 0) as any as S.Schema<DescribeAccessEntryRequest>,
  output: __S(481, __c15, 1) as any as S.Schema<DescribeAccessEntryResponse>,
  errors: [InvalidRequestException, ResourceNotFoundException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccessEntry",
}));

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
  input: __S(1728, __c54, 0) as any as S.Schema<DescribeAddonRequest>,
  output: __S(578, __c18, 2) as any as S.Schema<DescribeAddonResponse>,
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
}));

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
  input: __S(1760, __c55, 0) as any as S.Schema<DescribeAddonConfigurationRequest>,
  output: __S(1763, __c55, 3) as any as S.Schema<DescribeAddonConfigurationResponse>,
  errors: [InvalidParameterException, ResourceNotFoundException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAddonConfiguration",
}));

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
  input: __S(1792, __c56, 0) as any as S.Schema<DescribeAddonVersionsRequest>,
  output: __S(1799, __c56, 7) as any as S.Schema<DescribeAddonVersionsResponse>,
  errors: [InvalidParameterException, ResourceNotFoundException, ServerException],
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
  input: __S(1824, __c57, 0) as any as S.Schema<DescribeCapabilityRequest>,
  output: __S(711, __c22, 7) as any as S.Schema<DescribeCapabilityResponse>,
  errors: [
    AccessDeniedException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCapability",
}));

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
  input: __S(1856, __c58, 0) as any as S.Schema<DescribeCertificateAuthorityRequest>,
  output: __S(1860, __c58, 4) as any as S.Schema<DescribeCertificateAuthorityResponse>,
  errors: [ResourceNotFoundException, ServerException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCertificateAuthority",
}));

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
  input: __S(1888, __c59, 0) as any as S.Schema<DescribeClusterRequest>,
  output: __S(908, __c28, 12) as any as S.Schema<DescribeClusterResponse>,
  errors: [
    ClientException,
    ResourceNotFoundException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCluster",
}));

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
  input: __S(1920, __c60, 0) as any as S.Schema<DescribeClusterVersionsRequest>,
  output: __S(1942, __c60, 22) as any as S.Schema<DescribeClusterVersionsResponse>,
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
  input: __S(1952, __c61, 0) as any as S.Schema<DescribeEksAnywhereSubscriptionRequest>,
  output: __S(1056, __c33, 0) as any as S.Schema<DescribeEksAnywhereSubscriptionResponse>,
  errors: [
    ClientException,
    ResourceNotFoundException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEksAnywhereSubscription",
}));

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
  input: __S(1984, __c62, 0) as any as S.Schema<DescribeFargateProfileRequest>,
  output: __S(1123, __c35, 3) as any as S.Schema<DescribeFargateProfileResponse>,
  errors: [ClientException, InvalidParameterException, ResourceNotFoundException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFargateProfile",
}));

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
  input: __S(2016, __c63, 0) as any as S.Schema<DescribeIdentityProviderConfigRequest>,
  output: __S(2019, __c63, 3) as any as S.Schema<DescribeIdentityProviderConfigResponse>,
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
}));

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
  input: __S(2080, __c65, 0) as any as S.Schema<DescribeInsightRequest>,
  output: __S(2091, __c65, 11) as any as S.Schema<DescribeInsightResponse>,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInsight",
}));

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
  input: __S(2112, __c66, 0) as any as S.Schema<DescribeInsightsRefreshRequest>,
  output: __S(2113, __c66, 1) as any as S.Schema<DescribeInsightsRefreshResponse>,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInsightsRefresh",
}));

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
  input: __S(2144, __c67, 0) as any as S.Schema<DescribeNodegroupRequest>,
  output: __S(1189, __c37, 5) as any as S.Schema<DescribeNodegroupResponse>,
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
}));

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
  input: __S(2176, __c68, 0) as any as S.Schema<DescribePodIdentityAssociationRequest>,
  output: __S(1313, __c41, 1) as any as S.Schema<DescribePodIdentityAssociationResponse>,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePodIdentityAssociation",
}));

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
  input: __S(2208, __c69, 0) as any as S.Schema<DescribeUpdateRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<DescribeUpdateResponse>,
  errors: [ClientException, InvalidParameterException, ResourceNotFoundException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUpdate",
}));

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
  input: __S(2240, __c70, 0) as any as S.Schema<DisassociateAccessPolicyRequest>,
  output: __S(1376, __c43, 0) as any as S.Schema<DisassociateAccessPolicyResponse>,
  errors: [InvalidRequestException, ResourceNotFoundException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateAccessPolicy",
}));

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
  input: __S(2272, __c71, 0) as any as S.Schema<DisassociateIdentityProviderConfigRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<DisassociateIdentityProviderConfigResponse>,
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
}));

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
  input: __S(2304, __c72, 0) as any as S.Schema<ListAccessEntriesRequest>,
  output: __S(2305, __c72, 1) as any as S.Schema<ListAccessEntriesResponse>,
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
  input: __S(2336, __c73, 0) as any as S.Schema<ListAccessPoliciesRequest>,
  output: __S(2339, __c73, 3) as any as S.Schema<ListAccessPoliciesResponse>,
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
  input: __S(2368, __c74, 0) as any as S.Schema<ListAddonsRequest>,
  output: __S(2369, __c74, 1) as any as S.Schema<ListAddonsResponse>,
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
  input: __S(2400, __c75, 0) as any as S.Schema<ListAssociatedAccessPoliciesRequest>,
  output: __S(2402, __c75, 2) as any as S.Schema<ListAssociatedAccessPoliciesResponse>,
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

export type ListCapabilitiesError = InvalidParameterException | ServerException | CommonErrors;
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
  input: __S(2432, __c76, 0) as any as S.Schema<ListCapabilitiesRequest>,
  output: __S(2435, __c76, 3) as any as S.Schema<ListCapabilitiesResponse>,
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
  input: __S(2464, __c77, 0) as any as S.Schema<ListCertificateAuthoritiesRequest>,
  output: __S(2466, __c77, 2) as any as S.Schema<ListCertificateAuthoritiesResponse>,
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
  input: __S(2496, __c78, 0) as any as S.Schema<ListClustersRequest>,
  output: __S(2497, __c78, 1) as any as S.Schema<ListClustersResponse>,
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
  input: __S(2528, __c79, 0) as any as S.Schema<ListEksAnywhereSubscriptionsRequest>,
  output: __S(2530, __c79, 2) as any as S.Schema<ListEksAnywhereSubscriptionsResponse>,
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
  input: __S(2560, __c80, 0) as any as S.Schema<ListFargateProfilesRequest>,
  output: __S(2561, __c80, 1) as any as S.Schema<ListFargateProfilesResponse>,
  errors: [ClientException, InvalidParameterException, ResourceNotFoundException, ServerException],
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
  input: __S(2592, __c81, 0) as any as S.Schema<ListIdentityProviderConfigsRequest>,
  output: __S(2594, __c81, 2) as any as S.Schema<ListIdentityProviderConfigsResponse>,
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
  input: __S(2625, __c82, 1) as any as S.Schema<ListInsightsRequest>,
  output: __S(2628, __c82, 4) as any as S.Schema<ListInsightsResponse>,
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
  input: __S(2656, __c83, 0) as any as S.Schema<ListNodegroupsRequest>,
  output: __S(2657, __c83, 1) as any as S.Schema<ListNodegroupsResponse>,
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
  input: __S(2688, __c84, 0) as any as S.Schema<ListPodIdentityAssociationsRequest>,
  output: __S(2691, __c84, 3) as any as S.Schema<ListPodIdentityAssociationsResponse>,
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

export type ListTagsForResourceError = BadRequestException | NotFoundException | CommonErrors;
/**
 * List the tags for an Amazon EKS resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2720, __c85, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(2721, __c85, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [BadRequestException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(2752, __c86, 0) as any as S.Schema<ListUpdatesRequest>,
  output: __S(2753, __c86, 1) as any as S.Schema<ListUpdatesResponse>,
  errors: [ClientException, InvalidParameterException, ResourceNotFoundException, ServerException],
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
  input: __S(2785, __c87, 1) as any as S.Schema<RegisterClusterRequest>,
  output: __S(908, __c28, 12) as any as S.Schema<RegisterClusterResponse>,
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
}));

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
  input: __S(2816, __c88, 0) as any as S.Schema<StartInsightsRefreshRequest>,
  output: __S(2817, __c88, 1) as any as S.Schema<StartInsightsRefreshResponse>,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartInsightsRefresh",
}));

export type TagResourceError = BadRequestException | NotFoundException | CommonErrors;
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
  input: __S(2848, __c89, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(1376, __c43, 0) as any as S.Schema<TagResourceResponse>,
  errors: [BadRequestException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = BadRequestException | NotFoundException | CommonErrors;
/**
 * Deletes specified tags from an Amazon EKS resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2880, __c90, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(1376, __c43, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [BadRequestException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(2912, __c91, 0) as any as S.Schema<UpdateAccessEntryRequest>,
  output: __S(481, __c15, 1) as any as S.Schema<UpdateAccessEntryResponse>,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccessEntry",
}));

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
  input: __S(2944, __c92, 0) as any as S.Schema<UpdateAddonRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<UpdateAddonResponse>,
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
}));

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
  input: __S(2979, __c93, 3) as any as S.Schema<UpdateCapabilityRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<UpdateCapabilityResponse>,
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
}));

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
  input: __S(3009, __c94, 1) as any as S.Schema<UpdateClusterConfigRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<UpdateClusterConfigResponse>,
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
}));

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
  input: __S(3041, __c95, 1) as any as S.Schema<UpdateClusterVersionRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<UpdateClusterVersionResponse>,
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
}));

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
  input: __S(3072, __c96, 0) as any as S.Schema<UpdateEksAnywhereSubscriptionRequest>,
  output: __S(1056, __c33, 0) as any as S.Schema<UpdateEksAnywhereSubscriptionResponse>,
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
}));

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
  input: __S(3106, __c97, 2) as any as S.Schema<UpdateNodegroupConfigRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<UpdateNodegroupConfigResponse>,
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
}));

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
  input: __S(3136, __c98, 0) as any as S.Schema<UpdateNodegroupVersionRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<UpdateNodegroupVersionResponse>,
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
}));

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
 * We recommend that you don't include association create/updates in the
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
  input: __S(3168, __c99, 0) as any as S.Schema<UpdatePodIdentityAssociationRequest>,
  output: __S(1313, __c41, 1) as any as S.Schema<UpdatePodIdentityAssociationResponse>,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePodIdentityAssociation",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          certificateAuthorityId: S.String.pipe(T.HttpLabel("certificateAuthorityId")),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/clusters/{clusterName}/certificate-authorities/{certificateAuthorityId}/activate",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ActivateCertificateAuthorityRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ status: S.optional(S.String), reason: S.optional(S.String) }),
      ).annotate({ identifier: "Cancellation" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ type: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "UpdateParam" });
    case 1:
      return S.Array(__S(96, __c3, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          errorCode: S.optional(S.String),
          errorMessage: S.optional(S.String),
          resourceIds: S.optional(__S(0, __c0, 0)),
        }),
      ).annotate({ identifier: "ErrorDetail" });
    case 3:
      return S.Array(__S(98, __c3, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          status: S.optional(S.String),
          type: S.optional(S.String),
          params: S.optional(__S(97, __c3, 1)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          errors: S.optional(__S(99, __c3, 3)),
          cancellation: S.optional(__S(64, __c2, 0)),
        }),
      ).annotate({ identifier: "Update" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          update: S.optional(__S(100, __c3, 4)),
          certificateAuthority: S.optional(__S(160, __c5, 0)),
        }),
      ).annotate({ identifier: "ActivateCertificateAuthorityResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          activatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          activatedBy: S.optional(S.String),
          signingStatus: S.optional(S.String),
          distributionStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "CertificateAuthoritySummary" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          principalArn: S.String.pipe(T.HttpLabel("principalArn")),
          policyArn: S.String,
          accessScope: __S(224, __c7, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/clusters/{clusterName}/access-entries/{principalArn}/access-policies",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateAccessPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.optional(S.String),
          principalArn: S.optional(S.String),
          associatedAccessPolicy: S.optional(__S(225, __c7, 1)),
        }),
      ).annotate({ identifier: "AssociateAccessPolicyResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ type: S.optional(S.String), namespaces: S.optional(__S(0, __c0, 0)) }),
      ).annotate({ identifier: "AccessScope" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.optional(S.String),
          accessScope: S.optional(__S(224, __c7, 0)),
          associatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "AssociatedAccessPolicy" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          encryptionConfig: __S(322, __c10, 2),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/clusters/{clusterName}/encryption-config/associate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateEncryptionConfigRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ update: S.optional(__S(100, __c3, 4)) })).annotate({
        identifier: "AssociateEncryptionConfigResponse",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ keyArn: S.optional(S.String) })).annotate({
        identifier: "Provider",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          resources: S.optional(__S(0, __c0, 0)),
          provider: S.optional(__S(320, __c10, 0)),
        }),
      ).annotate({ identifier: "EncryptionConfig" });
    case 2:
      return S.Array(__S(321, __c10, 1));
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          identityProviderConfigName: S.String,
          issuerUrl: S.String,
          clientId: S.String,
          usernameClaim: S.optional(S.String),
          usernamePrefix: S.optional(S.String),
          groupsClaim: S.optional(S.String),
          groupsPrefix: S.optional(S.String),
          requiredClaims: S.optional(__S(384, __c12, 0)),
        }),
      ).annotate({ identifier: "OidcIdentityProviderConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          oidc: __S(352, __c11, 0),
          tags: S.optional(__S(384, __c12, 0)),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/clusters/{clusterName}/identity-provider-configs/associate",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateIdentityProviderConfigRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ update: S.optional(__S(100, __c3, 4)), tags: S.optional(__S(384, __c12, 0)) }),
      ).annotate({ identifier: "AssociateIdentityProviderConfigResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          updateId: S.String.pipe(T.HttpLabel("updateId")),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/clusters/{name}/updates/{updateId}/cancel-update" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelUpdateRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          principalArn: S.String,
          kubernetesGroups: S.optional(__S(0, __c0, 0)),
          tags: S.optional(__S(384, __c12, 0)),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          username: S.optional(S.String),
          type: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/clusters/{clusterName}/access-entries" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAccessEntryRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.optional(S.String),
          principalArn: S.optional(S.String),
          kubernetesGroups: S.optional(__S(0, __c0, 0)),
          accessEntryArn: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(384, __c12, 0)),
          username: S.optional(S.String),
          type: S.optional(S.String),
        }),
      ).annotate({ identifier: "AccessEntry" });
    case 1:
      return S.suspend(() => S.Struct({ accessEntry: S.optional(__S(480, __c15, 0)) })).annotate({
        identifier: "CreateAccessEntryResponse",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          addonName: S.String,
          addonVersion: S.optional(S.String),
          serviceAccountRoleArn: S.optional(S.String),
          resolveConflicts: S.optional(S.String),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(384, __c12, 0)),
          configurationValues: S.optional(S.String),
          podIdentityAssociations: S.optional(__S(641, __c20, 1)),
          namespaceConfig: S.optional(__S(576, __c18, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/clusters/{clusterName}/addons" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAddonRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          code: S.optional(S.String),
          message: S.optional(S.String),
          resourceIds: S.optional(__S(0, __c0, 0)),
        }),
      ).annotate({ identifier: "AddonIssue" });
    case 1:
      return S.Array(__S(544, __c17, 0));
    case 2:
      return S.suspend(() => S.Struct({ issues: S.optional(__S(545, __c17, 1)) })).annotate({
        identifier: "AddonHealth",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ namespace: S.optional(S.String) })).annotate({
        identifier: "AddonNamespaceConfigRequest",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          addonName: S.optional(S.String),
          clusterName: S.optional(S.String),
          status: S.optional(S.String),
          addonVersion: S.optional(S.String),
          health: S.optional(__S(546, __c17, 2)),
          addonArn: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          serviceAccountRoleArn: S.optional(S.String),
          tags: S.optional(__S(384, __c12, 0)),
          publisher: S.optional(S.String),
          owner: S.optional(S.String),
          marketplaceInformation: S.optional(__S(608, __c19, 0)),
          configurationValues: S.optional(S.String),
          podIdentityAssociations: S.optional(__S(0, __c0, 0)),
          namespaceConfig: S.optional(__S(576, __c18, 0)),
        }),
      ).annotate({ identifier: "Addon" });
    case 2:
      return S.suspend(() => S.Struct({ addon: S.optional(__S(577, __c18, 1)) })).annotate({
        identifier: "CreateAddonResponse",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ productId: S.optional(S.String), productUrl: S.optional(S.String) }),
      ).annotate({ identifier: "MarketplaceInformation" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ serviceAccount: S.String, roleArn: S.String })).annotate({
        identifier: "AddonPodIdentityAssociations",
      });
    case 1:
      return S.Array(__S(640, __c20, 0));
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ idcInstanceArn: S.String, idcRegion: S.optional(S.String) }),
      ).annotate({ identifier: "ArgoCdAwsIdcConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          namespace: S.optional(S.String),
          awsIdc: __S(672, __c21, 0),
          rbacRoleMappings: S.optional(__S(739, __c23, 3)),
          networkAccess: S.optional(__S(740, __c23, 4)),
          endpointPrefix: S.optional(S.String),
        }),
      ).annotate({ identifier: "ArgoCdConfigRequest" });
    case 2:
      return S.suspend(() => S.Struct({ argoCd: S.optional(__S(673, __c21, 1)) })).annotate({
        identifier: "CapabilityConfigurationRequest",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          capabilityName: S.String,
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          type: S.String,
          roleArn: S.String,
          configuration: S.optional(__S(674, __c21, 2)),
          tags: S.optional(__S(384, __c12, 0)),
          deletePropagationPolicy: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/clusters/{clusterName}/capabilities" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCapabilityRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          idcInstanceArn: S.optional(S.String),
          idcRegion: S.optional(S.String),
          idcManagedApplicationArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ArgoCdAwsIdcConfigResponse" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          namespace: S.optional(S.String),
          awsIdc: S.optional(__S(704, __c22, 0)),
          rbacRoleMappings: S.optional(__S(739, __c23, 3)),
          networkAccess: S.optional(__S(740, __c23, 4)),
          serverUrl: S.optional(S.String),
          endpointPrefix: S.optional(S.String),
        }),
      ).annotate({ identifier: "ArgoCdConfigResponse" });
    case 2:
      return S.suspend(() => S.Struct({ argoCd: S.optional(__S(705, __c22, 1)) })).annotate({
        identifier: "CapabilityConfigurationResponse",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ code: S.optional(S.String), message: S.optional(S.String) }),
      ).annotate({ identifier: "CapabilityIssue" });
    case 4:
      return S.Array(__S(707, __c22, 3));
    case 5:
      return S.suspend(() => S.Struct({ issues: S.optional(__S(708, __c22, 4)) })).annotate({
        identifier: "CapabilityHealth",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          capabilityName: S.optional(S.String),
          arn: S.optional(S.String),
          clusterName: S.optional(S.String),
          type: S.optional(S.String),
          roleArn: S.optional(S.String),
          status: S.optional(S.String),
          version: S.optional(S.String),
          configuration: S.optional(__S(706, __c22, 2)),
          tags: S.optional(__S(384, __c12, 0)),
          health: S.optional(__S(709, __c22, 5)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          deletePropagationPolicy: S.optional(S.String),
        }),
      ).annotate({ identifier: "Capability" });
    case 7:
      return S.suspend(() => S.Struct({ capability: S.optional(__S(710, __c22, 6)) })).annotate({
        identifier: "CreateCapabilityResponse",
      });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ id: S.String, type: S.String })).annotate({
        identifier: "SsoIdentity",
      });
    case 1:
      return S.Array(__S(736, __c23, 0));
    case 2:
      return S.suspend(() => S.Struct({ role: S.String, identities: __S(737, __c23, 1) })).annotate(
        { identifier: "ArgoCdRoleMapping" },
      );
    case 3:
      return S.Array(__S(738, __c23, 2));
    case 4:
      return S.suspend(() => S.Struct({ vpceIds: S.optional(__S(0, __c0, 0)) })).annotate({
        identifier: "ArgoCdNetworkAccessConfigRequest",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/clusters/{clusterName}/certificate-authorities" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCertificateAuthorityRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          version: S.optional(S.String),
          roleArn: S.String,
          resourcesVpcConfig: __S(960, __c30, 0),
          kubernetesNetworkConfig: S.optional(__S(961, __c30, 1)),
          logging: S.optional(__S(931, __c29, 3)),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(384, __c12, 0)),
          encryptionConfig: S.optional(__S(322, __c10, 2)),
          outpostConfig: S.optional(__S(898, __c28, 2)),
          accessConfig: S.optional(__S(899, __c28, 3)),
          bootstrapSelfManagedAddons: S.optional(S.Boolean),
          upgradePolicy: S.optional(__S(932, __c29, 4)),
          zonalShiftConfig: S.optional(__S(928, __c29, 0)),
          remoteNetworkConfig: S.optional(__S(935, __c29, 7)),
          computeConfig: S.optional(__S(936, __c29, 8)),
          storageConfig: S.optional(__S(937, __c29, 9)),
          deletionProtection: S.optional(S.Boolean),
          controlPlaneScalingConfig: S.optional(__S(938, __c29, 10)),
          kubeApiServerConfig: S.optional(__S(939, __c29, 11)),
          kubeSchedulerConfig: S.optional(__S(941, __c29, 13)),
          kubeControllerManagerConfig: S.optional(__S(944, __c29, 16)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/clusters" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateClusterRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ minPort: S.optional(S.Number), maxPort: S.optional(S.Number) }),
      ).annotate({ identifier: "ServiceNodePortRange" });
    case 1:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), weight: S.optional(S.Number) }),
      ).annotate({ identifier: "ResourceWeight" });
    case 2:
      return S.Array(__S(833, __c26, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ type: S.optional(S.String), resources: S.optional(__S(834, __c26, 2)) }),
      ).annotate({ identifier: "ScoringStrategy" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ groupName: S.optional(S.String), spreadLevel: S.optional(S.String) }),
      ).annotate({ identifier: "ControlPlanePlacementRequest" });
    case 1:
      return S.suspend(() => S.Struct({ spreadLevel: S.optional(S.String) })).annotate({
        identifier: "EtcdPlacementRequest",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          outpostArns: __S(0, __c0, 0),
          controlPlaneInstanceType: S.String,
          controlPlanePlacement: S.optional(__S(896, __c28, 0)),
          etcdInstanceType: S.optional(S.String),
          etcdPlacement: S.optional(__S(897, __c28, 1)),
        }),
      ).annotate({ identifier: "OutpostConfigRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          bootstrapClusterCreatorAdminPermissions: S.optional(S.Boolean),
          authenticationMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateAccessConfigRequest" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          subnetIds: S.optional(__S(0, __c0, 0)),
          securityGroupIds: S.optional(__S(0, __c0, 0)),
          clusterSecurityGroupId: S.optional(S.String),
          vpcId: S.optional(S.String),
          endpointPublicAccess: S.optional(S.Boolean),
          endpointPrivateAccess: S.optional(S.Boolean),
          publicAccessCidrs: S.optional(__S(0, __c0, 0)),
          controlPlaneEgressMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "VpcConfigResponse" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          serviceIpv4Cidr: S.optional(S.String),
          serviceIpv6Cidr: S.optional(S.String),
          ipFamily: S.optional(S.String),
          elasticLoadBalancing: S.optional(__S(928, __c29, 0)),
        }),
      ).annotate({ identifier: "KubernetesNetworkConfigResponse" });
    case 6:
      return S.suspend(() => S.Struct({ issuer: S.optional(S.String) })).annotate({
        identifier: "OIDC",
      });
    case 7:
      return S.suspend(() => S.Struct({ oidc: S.optional(__S(902, __c28, 6)) })).annotate({
        identifier: "Identity",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({ id: S.optional(S.String), activatedBy: S.optional(S.String) }),
      ).annotate({ identifier: "ActiveCertificateAuthority" });
    case 9:
      return S.suspend(() =>
        S.Struct({ data: S.optional(S.String), active: S.optional(__S(904, __c28, 8)) }),
      ).annotate({ identifier: "Certificate" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          activationId: S.optional(S.String),
          activationCode: S.optional(S.String),
          activationExpiry: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          provider: S.optional(S.String),
          roleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConnectorConfigResponse" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          version: S.optional(S.String),
          endpoint: S.optional(S.String),
          roleArn: S.optional(S.String),
          resourcesVpcConfig: S.optional(__S(900, __c28, 4)),
          kubernetesNetworkConfig: S.optional(__S(901, __c28, 5)),
          logging: S.optional(__S(931, __c29, 3)),
          identity: S.optional(__S(903, __c28, 7)),
          status: S.optional(S.String),
          certificateAuthority: S.optional(__S(905, __c28, 9)),
          clientRequestToken: S.optional(S.String),
          platformVersion: S.optional(S.String),
          tags: S.optional(__S(384, __c12, 0)),
          encryptionConfig: S.optional(__S(322, __c10, 2)),
          connectorConfig: S.optional(__S(906, __c28, 10)),
          id: S.optional(S.String),
          health: S.optional(__S(546, __c17, 2)),
          outpostConfig: S.optional(__S(898, __c28, 2)),
          accessConfig: S.optional(__S(899, __c28, 3)),
          upgradePolicy: S.optional(__S(932, __c29, 4)),
          zonalShiftConfig: S.optional(__S(928, __c29, 0)),
          remoteNetworkConfig: S.optional(__S(935, __c29, 7)),
          computeConfig: S.optional(__S(936, __c29, 8)),
          storageConfig: S.optional(__S(937, __c29, 9)),
          deletionProtection: S.optional(S.Boolean),
          controlPlaneScalingConfig: S.optional(__S(938, __c29, 10)),
          kubeApiServerConfig: S.optional(__S(939, __c29, 11)),
          kubeSchedulerConfig: S.optional(__S(941, __c29, 13)),
          kubeControllerManagerConfig: S.optional(__S(944, __c29, 16)),
        }),
      ).annotate({ identifier: "Cluster" });
    case 12:
      return S.suspend(() => S.Struct({ cluster: S.optional(__S(907, __c28, 11)) })).annotate({
        identifier: "CreateClusterResponse",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ enabled: S.optional(S.Boolean) })).annotate({
        identifier: "ElasticLoadBalancing",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ types: S.optional(__S(864, __c27, 0)), enabled: S.optional(S.Boolean) }),
      ).annotate({ identifier: "LogSetup" });
    case 2:
      return S.Array(__S(929, __c29, 1));
    case 3:
      return S.suspend(() => S.Struct({ clusterLogging: S.optional(__S(930, __c29, 2)) })).annotate(
        { identifier: "Logging" },
      );
    case 4:
      return S.suspend(() => S.Struct({ supportType: S.optional(S.String) })).annotate({
        identifier: "UpgradePolicyRequest",
      });
    case 5:
      return S.suspend(() => S.Struct({ cidrs: S.optional(__S(0, __c0, 0)) })).annotate({
        identifier: "RemoteNodeNetwork",
      });
    case 6:
      return S.Array(__S(933, __c29, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          remoteNodeNetworks: S.optional(__S(934, __c29, 6)),
          remotePodNetworks: S.optional(__S(934, __c29, 6)),
        }),
      ).annotate({ identifier: "RemoteNetworkConfigRequest" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          enabled: S.optional(S.Boolean),
          nodePools: S.optional(__S(0, __c0, 0)),
          nodeRoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ComputeConfigRequest" });
    case 9:
      return S.suspend(() => S.Struct({ blockStorage: S.optional(__S(928, __c29, 0)) })).annotate({
        identifier: "StorageConfigRequest",
      });
    case 10:
      return S.suspend(() => S.Struct({ tier: S.optional(S.String) })).annotate({
        identifier: "ControlPlaneScalingConfig",
      });
    case 11:
      return S.suspend(() =>
        S.Struct({
          eventTtl: S.optional(S.String),
          serviceNodePortRange: S.optional(__S(832, __c26, 0)),
        }),
      ).annotate({ identifier: "KubeApiServerConfigRequest" });
    case 12:
      return S.suspend(() =>
        S.Struct({ scoringStrategy: S.optional(__S(835, __c26, 3)) }),
      ).annotate({ identifier: "NodeResourcesFitConfig" });
    case 13:
      return S.suspend(() =>
        S.Struct({ nodeResourcesFit: S.optional(__S(940, __c29, 12)) }),
      ).annotate({ identifier: "KubeSchedulerConfigRequest" });
    case 14:
      return S.suspend(() => S.Struct({ terminatedPodGcThreshold: S.optional(S.Number) })).annotate(
        { identifier: "PodGcControllerConfigRequest" },
      );
    case 15:
      return S.suspend(() =>
        S.Struct({ horizontalPodAutoscalerSyncPeriod: S.optional(S.String) }),
      ).annotate({ identifier: "HorizontalPodAutoscalerControllerConfigRequest" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          podGcControllerConfig: S.optional(__S(942, __c29, 14)),
          horizontalPodAutoscalerControllerConfig: S.optional(__S(943, __c29, 15)),
        }),
      ).annotate({ identifier: "KubeControllerManagerConfigRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          subnetIds: S.optional(__S(0, __c0, 0)),
          securityGroupIds: S.optional(__S(0, __c0, 0)),
          endpointPublicAccess: S.optional(S.Boolean),
          endpointPrivateAccess: S.optional(S.Boolean),
          publicAccessCidrs: S.optional(__S(0, __c0, 0)),
          controlPlaneEgressMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "VpcConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          serviceIpv4Cidr: S.optional(S.String),
          ipFamily: S.optional(S.String),
          elasticLoadBalancing: S.optional(__S(928, __c29, 0)),
        }),
      ).annotate({ identifier: "KubernetesNetworkConfigRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          term: __S(1024, __c32, 0),
          licenseQuantity: S.optional(S.Number),
          licenseType: S.optional(S.String),
          autoRenew: S.optional(S.Boolean),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(384, __c12, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/eks-anywhere-subscriptions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateEksAnywhereSubscriptionRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ duration: S.optional(S.Number), unit: S.optional(S.String) }),
      ).annotate({ identifier: "EksAnywhereSubscriptionTerm" });
    case 1:
      return S.suspend(() =>
        S.Struct({ id: S.optional(S.String), token: S.optional(S.String) }),
      ).annotate({ identifier: "License" });
    case 2:
      return S.Array(__S(1025, __c32, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          effectiveDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          expirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          licenseQuantity: S.optional(S.Number),
          licenseType: S.optional(S.String),
          term: S.optional(__S(1024, __c32, 0)),
          status: S.optional(S.String),
          autoRenew: S.optional(S.Boolean),
          licenseArns: S.optional(__S(0, __c0, 0)),
          licenses: S.optional(__S(1026, __c32, 2)),
          tags: S.optional(__S(384, __c12, 0)),
        }),
      ).annotate({ identifier: "EksAnywhereSubscription" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ subscription: S.optional(__S(1027, __c32, 3)) })).annotate({
        identifier: "CreateEksAnywhereSubscriptionResponse",
      });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          fargateProfileName: S.String,
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          podExecutionRoleArn: S.String,
          subnets: S.optional(__S(0, __c0, 0)),
          selectors: S.optional(__S(1121, __c35, 1)),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(384, __c12, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/clusters/{clusterName}/fargate-profiles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateFargateProfileRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ namespace: S.optional(S.String), labels: S.optional(__S(384, __c12, 0)) }),
      ).annotate({ identifier: "FargateProfileSelector" });
    case 1:
      return S.Array(__S(1120, __c35, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          fargateProfileName: S.optional(S.String),
          fargateProfileArn: S.optional(S.String),
          clusterName: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          podExecutionRoleArn: S.optional(S.String),
          subnets: S.optional(__S(0, __c0, 0)),
          selectors: S.optional(__S(1121, __c35, 1)),
          status: S.optional(S.String),
          tags: S.optional(__S(384, __c12, 0)),
          health: S.optional(__S(546, __c17, 2)),
        }),
      ).annotate({ identifier: "FargateProfile" });
    case 3:
      return S.suspend(() =>
        S.Struct({ fargateProfile: S.optional(__S(1122, __c35, 2)) }),
      ).annotate({ identifier: "CreateFargateProfileResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          nodegroupName: S.String,
          scalingConfig: S.optional(__S(1216, __c38, 0)),
          diskSize: S.optional(S.Number),
          subnets: __S(0, __c0, 0),
          instanceTypes: S.optional(__S(0, __c0, 0)),
          amiType: S.optional(S.String),
          remoteAccess: S.optional(__S(1184, __c37, 0)),
          nodeRole: S.String,
          labels: S.optional(__S(384, __c12, 0)),
          taints: S.optional(__S(1218, __c38, 2)),
          tags: S.optional(__S(384, __c12, 0)),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          launchTemplate: S.optional(__S(1248, __c39, 0)),
          updateConfig: S.optional(__S(1219, __c38, 3)),
          nodeRepairConfig: S.optional(__S(1222, __c38, 6)),
          capacityType: S.optional(S.String),
          version: S.optional(S.String),
          releaseVersion: S.optional(S.String),
          warmPoolConfig: S.optional(__S(1223, __c38, 7)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/clusters/{clusterName}/node-groups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateNodegroupRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ec2SshKey: S.optional(S.String),
          sourceSecurityGroups: S.optional(__S(0, __c0, 0)),
        }),
      ).annotate({ identifier: "RemoteAccessConfig" });
    case 1:
      return S.suspend(() => S.Struct({ name: S.optional(S.String) })).annotate({
        identifier: "AutoScalingGroup",
      });
    case 2:
      return S.Array(__S(1185, __c37, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          autoScalingGroups: S.optional(__S(1186, __c37, 2)),
          remoteAccessSecurityGroup: S.optional(S.String),
        }),
      ).annotate({ identifier: "NodegroupResources" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          nodegroupName: S.optional(S.String),
          nodegroupArn: S.optional(S.String),
          clusterName: S.optional(S.String),
          version: S.optional(S.String),
          releaseVersion: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          capacityType: S.optional(S.String),
          scalingConfig: S.optional(__S(1216, __c38, 0)),
          instanceTypes: S.optional(__S(0, __c0, 0)),
          subnets: S.optional(__S(0, __c0, 0)),
          remoteAccess: S.optional(__S(1184, __c37, 0)),
          amiType: S.optional(S.String),
          nodeRole: S.optional(S.String),
          labels: S.optional(__S(384, __c12, 0)),
          taints: S.optional(__S(1218, __c38, 2)),
          resources: S.optional(__S(1187, __c37, 3)),
          diskSize: S.optional(S.Number),
          health: S.optional(__S(546, __c17, 2)),
          updateConfig: S.optional(__S(1219, __c38, 3)),
          nodeRepairConfig: S.optional(__S(1222, __c38, 6)),
          launchTemplate: S.optional(__S(1248, __c39, 0)),
          tags: S.optional(__S(384, __c12, 0)),
          warmPoolConfig: S.optional(__S(1223, __c38, 7)),
        }),
      ).annotate({ identifier: "Nodegroup" });
    case 5:
      return S.suspend(() => S.Struct({ nodegroup: S.optional(__S(1188, __c37, 4)) })).annotate({
        identifier: "CreateNodegroupResponse",
      });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          minSize: S.optional(S.Number),
          maxSize: S.optional(S.Number),
          desiredSize: S.optional(S.Number),
        }),
      ).annotate({ identifier: "NodegroupScalingConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          key: S.optional(S.String),
          value: S.optional(S.String),
          effect: S.optional(S.String),
        }),
      ).annotate({ identifier: "Taint" });
    case 2:
      return S.Array(__S(1217, __c38, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          maxUnavailable: S.optional(S.Number),
          maxUnavailablePercentage: S.optional(S.Number),
          updateStrategy: S.optional(S.String),
        }),
      ).annotate({ identifier: "NodegroupUpdateConfig" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          nodeMonitoringCondition: S.optional(S.String),
          nodeUnhealthyReason: S.optional(S.String),
          minRepairWaitTimeMins: S.optional(S.Number),
          repairAction: S.optional(S.String),
        }),
      ).annotate({ identifier: "NodeRepairConfigOverrides" });
    case 5:
      return S.Array(__S(1220, __c38, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          enabled: S.optional(S.Boolean),
          maxUnhealthyNodeThresholdCount: S.optional(S.Number),
          maxUnhealthyNodeThresholdPercentage: S.optional(S.Number),
          maxParallelNodesRepairedCount: S.optional(S.Number),
          maxParallelNodesRepairedPercentage: S.optional(S.Number),
          nodeRepairConfigOverrides: S.optional(__S(1221, __c38, 5)),
        }),
      ).annotate({ identifier: "NodeRepairConfig" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          enabled: S.optional(S.Boolean),
          minSize: S.optional(S.Number),
          maxGroupPreparedCapacity: S.optional(S.Number),
          poolState: S.optional(S.String),
          reuseOnScaleIn: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "WarmPoolConfig" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          version: S.optional(S.String),
          id: S.optional(S.String),
        }),
      ).annotate({ identifier: "LaunchTemplateSpecification" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          namespace: S.String,
          serviceAccount: S.String,
          roleArn: S.String,
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(384, __c12, 0)),
          disableSessionTags: S.optional(S.Boolean),
          targetRoleArn: S.optional(S.String),
          policy: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/clusters/{clusterName}/pod-identity-associations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreatePodIdentityAssociationRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.optional(S.String),
          namespace: S.optional(S.String),
          serviceAccount: S.optional(S.String),
          roleArn: S.optional(S.String),
          associationArn: S.optional(S.String),
          associationId: S.optional(S.String),
          tags: S.optional(__S(384, __c12, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ownerArn: S.optional(S.String),
          disableSessionTags: S.optional(S.Boolean),
          targetRoleArn: S.optional(S.String),
          externalId: S.optional(S.String),
          policy: S.optional(S.String),
        }),
      ).annotate({ identifier: "PodIdentityAssociation" });
    case 1:
      return S.suspend(() => S.Struct({ association: S.optional(__S(1312, __c41, 0)) })).annotate({
        identifier: "CreatePodIdentityAssociationResponse",
      });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          principalArn: S.String.pipe(T.HttpLabel("principalArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/clusters/{clusterName}/access-entries/{principalArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAccessEntryRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteAccessEntryResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          addonName: S.String.pipe(T.HttpLabel("addonName")),
          preserve: S.optional(S.Boolean).pipe(T.HttpQuery("preserve")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/clusters/{clusterName}/addons/{addonName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAddonRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          capabilityName: S.String.pipe(T.HttpLabel("capabilityName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/clusters/{clusterName}/capabilities/{capabilityName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCapabilityRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          certificateAuthorityId: S.String.pipe(T.HttpLabel("certificateAuthorityId")),
          clientRequestToken: S.optional(S.String).pipe(
            T.HttpQuery("clientRequestToken"),
            T.IdempotencyToken(),
          ),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/clusters/{clusterName}/certificate-authorities/{certificateAuthorityId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCertificateAuthorityRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/clusters/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteClusterRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/eks-anywhere-subscriptions/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEksAnywhereSubscriptionRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          fargateProfileName: S.String.pipe(T.HttpLabel("fargateProfileName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/clusters/{clusterName}/fargate-profiles/{fargateProfileName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFargateProfileRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          nodegroupName: S.String.pipe(T.HttpLabel("nodegroupName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/clusters/{clusterName}/node-groups/{nodegroupName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteNodegroupRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          associationId: S.String.pipe(T.HttpLabel("associationId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/clusters/{clusterName}/pod-identity-associations/{associationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePodIdentityAssociationRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/cluster-registrations/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeregisterClusterRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          principalArn: S.String.pipe(T.HttpLabel("principalArn")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/clusters/{clusterName}/access-entries/{principalArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeAccessEntryRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          addonName: S.String.pipe(T.HttpLabel("addonName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/clusters/{clusterName}/addons/{addonName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeAddonRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          addonName: S.String.pipe(T.HttpQuery("addonName")),
          addonVersion: S.String.pipe(T.HttpQuery("addonVersion")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/addons/configuration-schemas" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeAddonConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          serviceAccount: S.optional(S.String),
          recommendedManagedPolicies: S.optional(__S(0, __c0, 0)),
        }),
      ).annotate({ identifier: "AddonPodIdentityConfiguration" });
    case 2:
      return S.Array(__S(1761, __c55, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          addonName: S.optional(S.String),
          addonVersion: S.optional(S.String),
          configurationSchema: S.optional(S.String),
          podIdentityConfiguration: S.optional(__S(1762, __c55, 2)),
        }),
      ).annotate({ identifier: "DescribeAddonConfigurationResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          kubernetesVersion: S.optional(S.String).pipe(T.HttpQuery("kubernetesVersion")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          addonName: S.optional(S.String).pipe(T.HttpQuery("addonName")),
          types: S.optional(__S(0, __c0, 0)).pipe(T.HttpQuery("types")),
          publishers: S.optional(__S(0, __c0, 0)).pipe(T.HttpQuery("publishers")),
          owners: S.optional(__S(0, __c0, 0)).pipe(T.HttpQuery("owners")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/addons/supported-versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeAddonVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          clusterVersion: S.optional(S.String),
          platformVersions: S.optional(__S(0, __c0, 0)),
          defaultVersion: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Compatibility" });
    case 2:
      return S.Array(__S(1793, __c56, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          addonVersion: S.optional(S.String),
          architecture: S.optional(__S(0, __c0, 0)),
          computeTypes: S.optional(__S(0, __c0, 0)),
          compatibilities: S.optional(__S(1794, __c56, 2)),
          requiresConfiguration: S.optional(S.Boolean),
          requiresIamPermissions: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AddonVersionInfo" });
    case 4:
      return S.Array(__S(1795, __c56, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          addonName: S.optional(S.String),
          type: S.optional(S.String),
          addonVersions: S.optional(__S(1796, __c56, 4)),
          publisher: S.optional(S.String),
          owner: S.optional(S.String),
          marketplaceInformation: S.optional(__S(608, __c19, 0)),
          defaultNamespace: S.optional(S.String),
        }),
      ).annotate({ identifier: "AddonInfo" });
    case 6:
      return S.Array(__S(1797, __c56, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ addons: S.optional(__S(1798, __c56, 6)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeAddonVersionsResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          capabilityName: S.String.pipe(T.HttpLabel("capabilityName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/clusters/{clusterName}/capabilities/{capabilityName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeCapabilityRequest" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          certificateAuthorityId: S.String.pipe(T.HttpLabel("certificateAuthorityId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/clusters/{clusterName}/certificate-authorities/{certificateAuthorityId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeCertificateAuthorityRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          notBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          notAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CertificateAuthorityValidity" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          firstAutoActivation: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          finalAutoActivation: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CertificateAuthorityScheduledEvents" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          activatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          activatedBy: S.optional(S.String),
          signingStatus: S.optional(S.String),
          distributionStatus: S.optional(S.String),
          validity: S.optional(__S(1857, __c58, 1)),
          scheduledEvents: S.optional(__S(1858, __c58, 2)),
          rollbackAvailable: S.optional(S.Boolean),
          data: S.optional(S.String),
        }),
      ).annotate({ identifier: "CertificateAuthority" });
    case 4:
      return S.suspend(() =>
        S.Struct({ certificateAuthority: S.optional(__S(1859, __c58, 3)) }),
      ).annotate({ identifier: "DescribeCertificateAuthorityResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/clusters/{name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeClusterRequest" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterType: S.optional(S.String).pipe(T.HttpQuery("clusterType")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          defaultOnly: S.optional(S.Boolean).pipe(T.HttpQuery("defaultOnly")),
          includeAll: S.optional(S.Boolean).pipe(T.HttpQuery("includeAll")),
          clusterVersions: S.optional(__S(0, __c0, 0)).pipe(T.HttpQuery("clusterVersions")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          versionStatus: S.optional(S.String).pipe(T.HttpQuery("versionStatus")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/cluster-versions" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeClusterVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ min: S.optional(S.String), max: S.optional(S.String) }),
      ).annotate({ identifier: "DurationConstraints" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          defaultValue: S.optional(S.String),
          constraints: S.optional(__S(1921, __c60, 1)),
        }),
      ).annotate({ identifier: "DurationParameterConfig" });
    case 3:
      return S.suspend(() =>
        S.Struct({ min: S.optional(S.Number), max: S.optional(S.Number) }),
      ).annotate({ identifier: "IntegerRangeConstraint" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          minPort: S.optional(__S(1923, __c60, 3)),
          maxPort: S.optional(__S(1923, __c60, 3)),
        }),
      ).annotate({ identifier: "PortRangeConstraints" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          defaultValue: S.optional(__S(832, __c26, 0)),
          constraints: S.optional(__S(1924, __c60, 4)),
        }),
      ).annotate({ identifier: "PortRangeParameterConfig" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          eventTtl: S.optional(__S(1922, __c60, 2)),
          serviceNodePortRange: S.optional(__S(1925, __c60, 5)),
        }),
      ).annotate({ identifier: "KubeApiServerVersionConfig" });
    case 7:
      return S.suspend(() => S.Struct({ allowedValues: S.optional(__S(0, __c0, 0)) })).annotate({
        identifier: "AllowedValuesConstraint",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(__S(1927, __c60, 7)),
          weight: S.optional(__S(1923, __c60, 3)),
        }),
      ).annotate({ identifier: "ResourceConstraints" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          scoringStrategy: S.optional(__S(1927, __c60, 7)),
          resources: S.optional(__S(1928, __c60, 8)),
        }),
      ).annotate({ identifier: "ScoringStrategyConstraints" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          defaultValue: S.optional(__S(835, __c26, 3)),
          constraints: S.optional(__S(1929, __c60, 9)),
        }),
      ).annotate({ identifier: "ScoringStrategyConfig" });
    case 11:
      return S.suspend(() =>
        S.Struct({ scoringStrategy: S.optional(__S(1930, __c60, 10)) }),
      ).annotate({ identifier: "NodeResourcesFitVersionConfig" });
    case 12:
      return S.suspend(() =>
        S.Struct({ nodeResourcesFit: S.optional(__S(1931, __c60, 11)) }),
      ).annotate({ identifier: "KubeSchedulerVersionConfig" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          defaultValue: S.optional(S.Number),
          constraints: S.optional(__S(1923, __c60, 3)),
        }),
      ).annotate({ identifier: "IntegerParameterConfig" });
    case 14:
      return S.suspend(() =>
        S.Struct({ terminatedPodGcThreshold: S.optional(__S(1933, __c60, 13)) }),
      ).annotate({ identifier: "PodGcControllerVersionConfig" });
    case 15:
      return S.suspend(() =>
        S.Struct({ horizontalPodAutoscalerSyncPeriod: S.optional(__S(1922, __c60, 2)) }),
      ).annotate({ identifier: "HorizontalPodAutoscalerControllerVersionConfig" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          podGcControllerConfig: S.optional(__S(1934, __c60, 14)),
          horizontalPodAutoscalerControllerConfig: S.optional(__S(1935, __c60, 15)),
        }),
      ).annotate({ identifier: "KubeControllerManagerVersionConfig" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          kubeApiServerConfig: S.optional(__S(1926, __c60, 6)),
          kubeSchedulerConfig: S.optional(__S(1932, __c60, 12)),
          kubeControllerManagerConfig: S.optional(__S(1936, __c60, 16)),
        }),
      ).annotate({ identifier: "ControlPlaneConfigInfo" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          tierName: S.optional(S.String),
          apiRequestConcurrency: S.optional(S.Number),
          podSchedulingRatePerSecond: S.optional(S.Number),
          clusterDatabaseSizeGb: S.optional(S.Number),
          controlPlaneComponentConfigOverrides: S.optional(__S(1937, __c60, 17)),
        }),
      ).annotate({ identifier: "ControlPlaneScalingTierInfo" });
    case 19:
      return S.Array(__S(1938, __c60, 18));
    case 20:
      return S.suspend(() =>
        S.Struct({
          clusterVersion: S.optional(S.String),
          clusterType: S.optional(S.String),
          defaultPlatformVersion: S.optional(S.String),
          defaultVersion: S.optional(S.Boolean),
          releaseDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endOfStandardSupportDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endOfExtendedSupportDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          versionStatus: S.optional(S.String),
          kubernetesPatchVersion: S.optional(S.String),
          controlPlaneScalingTiers: S.optional(__S(1939, __c60, 19)),
          controlPlaneComponentConfig: S.optional(__S(1937, __c60, 17)),
        }),
      ).annotate({ identifier: "ClusterVersionInformation" });
    case 21:
      return S.Array(__S(1940, __c60, 20));
    case 22:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          clusterVersions: S.optional(__S(1941, __c60, 21)),
        }),
      ).annotate({ identifier: "DescribeClusterVersionsResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/eks-anywhere-subscriptions/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeEksAnywhereSubscriptionRequest" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          fargateProfileName: S.String.pipe(T.HttpLabel("fargateProfileName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/clusters/{clusterName}/fargate-profiles/{fargateProfileName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeFargateProfileRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          identityProviderConfig: __S(2048, __c64, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/clusters/{clusterName}/identity-provider-configs/describe",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeIdentityProviderConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          identityProviderConfigName: S.optional(S.String),
          identityProviderConfigArn: S.optional(S.String),
          clusterName: S.optional(S.String),
          issuerUrl: S.optional(S.String),
          clientId: S.optional(S.String),
          usernameClaim: S.optional(S.String),
          usernamePrefix: S.optional(S.String),
          groupsClaim: S.optional(S.String),
          groupsPrefix: S.optional(S.String),
          requiredClaims: S.optional(__S(384, __c12, 0)),
          tags: S.optional(__S(384, __c12, 0)),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "OidcIdentityProviderConfig" });
    case 2:
      return S.suspend(() => S.Struct({ oidc: S.optional(__S(2017, __c63, 1)) })).annotate({
        identifier: "IdentityProviderConfigResponse",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ identityProviderConfig: S.optional(__S(2018, __c63, 2)) }),
      ).annotate({ identifier: "DescribeIdentityProviderConfigResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ type: S.String, name: S.String })).annotate({
        identifier: "IdentityProviderConfig",
      });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          id: S.String.pipe(T.HttpLabel("id")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/clusters/{clusterName}/insights/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeInsightRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          insightStatus: S.optional(__S(64, __c2, 0)),
          kubernetesResourceUri: S.optional(S.String),
          arn: S.optional(S.String),
        }),
      ).annotate({ identifier: "InsightResourceDetail" });
    case 2:
      return S.Array(__S(2081, __c65, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          userAgent: S.optional(S.String),
          numberOfRequestsLast30Days: S.optional(S.Number),
          lastRequestTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ClientStat" });
    case 4:
      return S.Array(__S(2083, __c65, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          usage: S.optional(S.String),
          replacedWith: S.optional(S.String),
          stopServingVersion: S.optional(S.String),
          startServingReplacementVersion: S.optional(S.String),
          clientStats: S.optional(__S(2084, __c65, 4)),
        }),
      ).annotate({ identifier: "DeprecationDetail" });
    case 6:
      return S.Array(__S(2085, __c65, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), compatibleVersions: S.optional(__S(0, __c0, 0)) }),
      ).annotate({ identifier: "AddonCompatibilityDetail" });
    case 8:
      return S.Array(__S(2087, __c65, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          deprecationDetails: S.optional(__S(2086, __c65, 6)),
          addonCompatibilityDetails: S.optional(__S(2088, __c65, 8)),
        }),
      ).annotate({ identifier: "InsightCategorySpecificSummary" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          category: S.optional(S.String),
          kubernetesVersion: S.optional(S.String),
          lastRefreshTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastTransitionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          description: S.optional(S.String),
          insightStatus: S.optional(__S(64, __c2, 0)),
          recommendation: S.optional(S.String),
          additionalInfo: S.optional(__S(384, __c12, 0)),
          resources: S.optional(__S(2082, __c65, 2)),
          categorySpecificSummary: S.optional(__S(2089, __c65, 9)),
        }),
      ).annotate({ identifier: "Insight" });
    case 11:
      return S.suspend(() => S.Struct({ insight: S.optional(__S(2090, __c65, 10)) })).annotate({
        identifier: "DescribeInsightResponse",
      });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ clusterName: S.String.pipe(T.HttpLabel("clusterName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/clusters/{clusterName}/insights-refresh" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeInsightsRefreshRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          message: S.optional(S.String),
          status: S.optional(S.String),
          startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DescribeInsightsRefreshResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          nodegroupName: S.String.pipe(T.HttpLabel("nodegroupName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/clusters/{clusterName}/node-groups/{nodegroupName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeNodegroupRequest" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          associationId: S.String.pipe(T.HttpLabel("associationId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/clusters/{clusterName}/pod-identity-associations/{associationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribePodIdentityAssociationRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          updateId: S.String.pipe(T.HttpLabel("updateId")),
          nodegroupName: S.optional(S.String).pipe(T.HttpQuery("nodegroupName")),
          addonName: S.optional(S.String).pipe(T.HttpQuery("addonName")),
          capabilityName: S.optional(S.String).pipe(T.HttpQuery("capabilityName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/clusters/{name}/updates/{updateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeUpdateRequest" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          principalArn: S.String.pipe(T.HttpLabel("principalArn")),
          policyArn: S.String.pipe(T.HttpLabel("policyArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/clusters/{clusterName}/access-entries/{principalArn}/access-policies/{policyArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateAccessPolicyRequest" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          identityProviderConfig: __S(2048, __c64, 0),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/clusters/{clusterName}/identity-provider-configs/disassociate",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateIdentityProviderConfigRequest" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          associatedPolicyArn: S.optional(S.String).pipe(T.HttpQuery("associatedPolicyArn")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/clusters/{clusterName}/access-entries" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAccessEntriesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ accessEntries: S.optional(__S(0, __c0, 0)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAccessEntriesResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/access-policies" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAccessPoliciesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), arn: S.optional(S.String) }),
      ).annotate({ identifier: "AccessPolicy" });
    case 2:
      return S.Array(__S(2337, __c73, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          accessPolicies: S.optional(__S(2338, __c73, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAccessPoliciesResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/clusters/{clusterName}/addons" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAddonsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ addons: S.optional(__S(0, __c0, 0)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAddonsResponse" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          principalArn: S.String.pipe(T.HttpLabel("principalArn")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/clusters/{clusterName}/access-entries/{principalArn}/access-policies",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAssociatedAccessPoliciesRequest" });
    case 1:
      return S.Array(__S(225, __c7, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.optional(S.String),
          principalArn: S.optional(S.String),
          nextToken: S.optional(S.String),
          associatedAccessPolicies: S.optional(__S(2401, __c75, 1)),
        }),
      ).annotate({ identifier: "ListAssociatedAccessPoliciesResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/clusters/{clusterName}/capabilities" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCapabilitiesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          capabilityName: S.optional(S.String),
          arn: S.optional(S.String),
          type: S.optional(S.String),
          status: S.optional(S.String),
          version: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CapabilitySummary" });
    case 2:
      return S.Array(__S(2433, __c76, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          capabilities: S.optional(__S(2434, __c76, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCapabilitiesResponse" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/clusters/{clusterName}/certificate-authorities" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCertificateAuthoritiesRequest" });
    case 1:
      return S.Array(__S(160, __c5, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          certificateAuthorities: S.optional(__S(2465, __c77, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCertificateAuthoritiesResponse" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          include: S.optional(__S(0, __c0, 0)).pipe(T.HttpQuery("include")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/clusters" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListClustersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ clusters: S.optional(__S(0, __c0, 0)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListClustersResponse" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          includeStatus: S.optional(__S(864, __c27, 0)).pipe(T.HttpQuery("includeStatus")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/eks-anywhere-subscriptions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEksAnywhereSubscriptionsRequest" });
    case 1:
      return S.Array(__S(1027, __c32, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({
          subscriptions: S.optional(__S(2529, __c79, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListEksAnywhereSubscriptionsResponse" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/clusters/{clusterName}/fargate-profiles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFargateProfilesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          fargateProfileNames: S.optional(__S(0, __c0, 0)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListFargateProfilesResponse" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/clusters/{clusterName}/identity-provider-configs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListIdentityProviderConfigsRequest" });
    case 1:
      return S.Array(__S(2048, __c64, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          identityProviderConfigs: S.optional(__S(2593, __c81, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListIdentityProviderConfigsResponse" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          categories: S.optional(__S(864, __c27, 0)),
          kubernetesVersions: S.optional(__S(0, __c0, 0)),
          statuses: S.optional(__S(864, __c27, 0)),
        }),
      ).annotate({ identifier: "InsightsFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          filter: S.optional(__S(2624, __c82, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/clusters/{clusterName}/insights" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListInsightsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          category: S.optional(S.String),
          kubernetesVersion: S.optional(S.String),
          lastRefreshTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastTransitionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          description: S.optional(S.String),
          insightStatus: S.optional(__S(64, __c2, 0)),
        }),
      ).annotate({ identifier: "InsightSummary" });
    case 3:
      return S.Array(__S(2626, __c82, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ insights: S.optional(__S(2627, __c82, 3)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListInsightsResponse" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/clusters/{clusterName}/node-groups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListNodegroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ nodegroups: S.optional(__S(0, __c0, 0)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListNodegroupsResponse" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
          serviceAccount: S.optional(S.String).pipe(T.HttpQuery("serviceAccount")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/clusters/{clusterName}/pod-identity-associations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPodIdentityAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.optional(S.String),
          namespace: S.optional(S.String),
          serviceAccount: S.optional(S.String),
          associationArn: S.optional(S.String),
          associationId: S.optional(S.String),
          ownerArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "PodIdentityAssociationSummary" });
    case 2:
      return S.Array(__S(2689, __c84, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          associations: S.optional(__S(2690, __c84, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPodIdentityAssociationsResponse" });
  }
}
function __c85(j: number): any {
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
      return S.suspend(() => S.Struct({ tags: S.optional(__S(384, __c12, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          nodegroupName: S.optional(S.String).pipe(T.HttpQuery("nodegroupName")),
          addonName: S.optional(S.String).pipe(T.HttpQuery("addonName")),
          capabilityName: S.optional(S.String).pipe(T.HttpQuery("capabilityName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/clusters/{name}/updates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListUpdatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ updateIds: S.optional(__S(0, __c0, 0)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListUpdatesResponse" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ roleArn: S.String, provider: S.String })).annotate({
        identifier: "ConnectorConfigRequest",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          connectorConfig: __S(2784, __c87, 0),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(384, __c12, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/cluster-registrations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RegisterClusterRequest" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ clusterName: S.String.pipe(T.HttpLabel("clusterName")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/clusters/{clusterName}/insights-refresh" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartInsightsRefreshRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ message: S.optional(S.String), status: S.optional(S.String) }),
      ).annotate({ identifier: "StartInsightsRefreshResponse" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(384, __c12, 0),
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
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(0, __c0, 0).pipe(T.HttpQuery("tagKeys")),
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
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          principalArn: S.String.pipe(T.HttpLabel("principalArn")),
          kubernetesGroups: S.optional(__S(0, __c0, 0)),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          username: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/clusters/{clusterName}/access-entries/{principalArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAccessEntryRequest" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          addonName: S.String.pipe(T.HttpLabel("addonName")),
          addonVersion: S.optional(S.String),
          serviceAccountRoleArn: S.optional(S.String),
          resolveConflicts: S.optional(S.String),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          configurationValues: S.optional(S.String),
          podIdentityAssociations: S.optional(__S(641, __c20, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/clusters/{clusterName}/addons/{addonName}/update" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAddonRequest" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          addOrUpdateRoleMappings: S.optional(__S(739, __c23, 3)),
          removeRoleMappings: S.optional(__S(739, __c23, 3)),
        }),
      ).annotate({ identifier: "UpdateRoleMappings" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          rbacRoleMappings: S.optional(__S(2976, __c93, 0)),
          networkAccess: S.optional(__S(740, __c23, 4)),
        }),
      ).annotate({ identifier: "UpdateArgoCdConfig" });
    case 2:
      return S.suspend(() => S.Struct({ argoCd: S.optional(__S(2977, __c93, 1)) })).annotate({
        identifier: "UpdateCapabilityConfiguration",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          capabilityName: S.String.pipe(T.HttpLabel("capabilityName")),
          roleArn: S.optional(S.String),
          configuration: S.optional(__S(2978, __c93, 2)),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          deletePropagationPolicy: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/clusters/{clusterName}/capabilities/{capabilityName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCapabilityRequest" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ authenticationMode: S.optional(S.String) })).annotate({
        identifier: "UpdateAccessConfigRequest",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          resourcesVpcConfig: S.optional(__S(960, __c30, 0)),
          logging: S.optional(__S(931, __c29, 3)),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          accessConfig: S.optional(__S(3008, __c94, 0)),
          upgradePolicy: S.optional(__S(932, __c29, 4)),
          zonalShiftConfig: S.optional(__S(928, __c29, 0)),
          computeConfig: S.optional(__S(936, __c29, 8)),
          kubernetesNetworkConfig: S.optional(__S(961, __c30, 1)),
          storageConfig: S.optional(__S(937, __c29, 9)),
          remoteNetworkConfig: S.optional(__S(935, __c29, 7)),
          deletionProtection: S.optional(S.Boolean),
          controlPlaneScalingConfig: S.optional(__S(938, __c29, 10)),
          kubeApiServerConfig: S.optional(__S(939, __c29, 11)),
          kubeSchedulerConfig: S.optional(__S(941, __c29, 13)),
          kubeControllerManagerConfig: S.optional(__S(944, __c29, 16)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/clusters/{name}/update-config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateClusterConfigRequest" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ timeoutMinutes: S.optional(S.Number) })).annotate({
        identifier: "RollbackConfig",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          version: S.String,
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          force: S.optional(S.Boolean),
          rollbackConfig: S.optional(__S(3040, __c95, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/clusters/{name}/updates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateClusterVersionRequest" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          autoRenew: S.Boolean,
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/eks-anywhere-subscriptions/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateEksAnywhereSubscriptionRequest" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          addOrUpdateLabels: S.optional(__S(384, __c12, 0)),
          removeLabels: S.optional(__S(0, __c0, 0)),
        }),
      ).annotate({ identifier: "UpdateLabelsPayload" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          addOrUpdateTaints: S.optional(__S(1218, __c38, 2)),
          removeTaints: S.optional(__S(1218, __c38, 2)),
        }),
      ).annotate({ identifier: "UpdateTaintsPayload" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          nodegroupName: S.String.pipe(T.HttpLabel("nodegroupName")),
          labels: S.optional(__S(3104, __c97, 0)),
          taints: S.optional(__S(3105, __c97, 1)),
          scalingConfig: S.optional(__S(1216, __c38, 0)),
          updateConfig: S.optional(__S(1219, __c38, 3)),
          nodeRepairConfig: S.optional(__S(1222, __c38, 6)),
          warmPoolConfig: S.optional(__S(1223, __c38, 7)),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/clusters/{clusterName}/node-groups/{nodegroupName}/update-config",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateNodegroupConfigRequest" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          nodegroupName: S.String.pipe(T.HttpLabel("nodegroupName")),
          version: S.optional(S.String),
          releaseVersion: S.optional(S.String),
          launchTemplate: S.optional(__S(1248, __c39, 0)),
          force: S.optional(S.Boolean),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/clusters/{clusterName}/node-groups/{nodegroupName}/update-version",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateNodegroupVersionRequest" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          associationId: S.String.pipe(T.HttpLabel("associationId")),
          roleArn: S.optional(S.String),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          disableSessionTags: S.optional(S.Boolean),
          targetRoleArn: S.optional(S.String),
          policy: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/clusters/{clusterName}/pod-identity-associations/{associationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePodIdentityAssociationRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
