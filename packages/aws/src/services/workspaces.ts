import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "WorkSpaces",
  target: "WorkspacesService",
  version: "2015-04-08",
  sigv4: "workspaces",
  protocol: awsJson1_1Protocol,
  xmlns: "http://workspaces.amazonaws.com/api/v1",
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
                `https://workspaces-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://workspaces-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://workspaces.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://workspaces.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"])<{
    readonly message?: string;
  }> {}
export class ApplicationNotSupportedException
  extends /*@__PURE__*/ TE.TaggedError("ApplicationNotSupportedException")<{
    readonly message?: string;
  }> {}
export class ComputeNotCompatibleException
  extends /*@__PURE__*/ TE.TaggedError("ComputeNotCompatibleException")<{
    readonly message?: string;
  }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException")<{
    readonly message?: string;
  }> {}
export class IncompatibleApplicationsException
  extends /*@__PURE__*/ TE.TaggedError("IncompatibleApplicationsException")<{
    readonly message?: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError("InternalServerException")<{
    readonly message?: string;
  }> {}
export class InvalidParameterCombinationException
  extends /*@__PURE__*/ TE.TaggedError("InvalidParameterCombinationException")<{
    readonly message?: string;
  }> {}
export class InvalidParameterValuesException
  extends /*@__PURE__*/ TE.TaggedError("InvalidParameterValuesException")<{
    readonly message?: string;
  }> {}
export class InvalidResourceStateException
  extends /*@__PURE__*/ TE.TaggedError("InvalidResourceStateException")<{
    readonly message?: string;
  }> {}
export class OperatingSystemNotCompatibleException
  extends /*@__PURE__*/ TE.TaggedError(
    "OperatingSystemNotCompatibleException",
  )<{ readonly message?: string }> {}
export class OperationInProgressException
  extends /*@__PURE__*/ TE.TaggedError("OperationInProgressException")<{
    readonly message?: string;
  }> {}
export class OperationNotSupportedException
  extends /*@__PURE__*/ TE.TaggedError("OperationNotSupportedException")<{
    readonly message?: string;
    readonly reason?: string;
  }> {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("ResourceAlreadyExistsException", [
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class ResourceAssociatedException
  extends /*@__PURE__*/ TE.TaggedError("ResourceAssociatedException")<{
    readonly message?: string;
  }> {}
export class ResourceCreationFailedException
  extends /*@__PURE__*/ TE.TaggedError("ResourceCreationFailedException")<{
    readonly message?: string;
  }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError("ResourceInUseException")<{
    readonly message?: string;
    readonly ResourceId?: string;
  }> {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("ResourceLimitExceededException")<{
    readonly message?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException")<{
    readonly message?: string;
    readonly ResourceId?: string;
  }> {}
export class ResourceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError("ResourceUnavailableException")<{
    readonly message?: string;
    readonly ResourceId?: string;
  }> {}
export class UnsupportedNetworkConfigurationException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedNetworkConfigurationException",
  )<{ readonly message?: string }> {}
export class UnsupportedWorkspaceConfigurationException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedWorkspaceConfigurationException",
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError("ValidationException")<{
    readonly message?: string;
  }> {}
export class WorkspacesDefaultRoleNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "WorkspacesDefaultRoleNotFoundException",
  )<{ readonly message?: string }> {}
export type LinkId = string;
export type ClientToken = string;
export interface AcceptAccountLinkInvitationRequest {
  LinkId: string;
  ClientToken?: string;
}
export type AccountLinkStatusEnum =
  | "LINKED"
  | "LINKING_FAILED"
  | "LINK_NOT_FOUND"
  | "PENDING_ACCEPTANCE_BY_TARGET_ACCOUNT"
  | "REJECTED"
  | (string & {});
export type AwsAccount = string;
export interface AccountLink {
  AccountLinkId?: string;
  AccountLinkStatus?: AccountLinkStatusEnum;
  SourceAccountId?: string;
  TargetAccountId?: string;
}
export interface AcceptAccountLinkInvitationResult {
  AccountLink?: AccountLink;
}
export type ConnectionAliasId = string;
export type NonEmptyString = string;
export interface AssociateConnectionAliasRequest {
  AliasId: string;
  ResourceId: string;
}
export type ConnectionIdentifier = string;
export interface AssociateConnectionAliasResult {
  ConnectionIdentifier?: string;
}
export type DirectoryId = string;
export type IpGroupId = string;
export type IpGroupIdList = string[];
export interface AssociateIpGroupsRequest {
  DirectoryId: string;
  GroupIds: string[];
}
export interface AssociateIpGroupsResult {}
export type WorkspaceId = string;
export type WorkSpaceApplicationId = string;
export interface AssociateWorkspaceApplicationRequest {
  WorkspaceId: string;
  ApplicationId: string;
}
export type WorkSpaceAssociatedResourceType = "APPLICATION" | (string & {});
export type AssociationState =
  | "PENDING_INSTALL"
  | "PENDING_INSTALL_DEPLOYMENT"
  | "PENDING_UNINSTALL"
  | "PENDING_UNINSTALL_DEPLOYMENT"
  | "INSTALLING"
  | "UNINSTALLING"
  | "ERROR"
  | "COMPLETED"
  | "REMOVED"
  | (string & {});
export type AssociationErrorCode =
  | "ValidationError.InsufficientDiskSpace"
  | "ValidationError.InsufficientMemory"
  | "ValidationError.UnsupportedOperatingSystem"
  | "DeploymentError.InternalServerError"
  | "DeploymentError.WorkspaceUnreachable"
  | "ValidationError.ApplicationOldVersionExists"
  | (string & {});
export type String2048 = string;
export interface AssociationStateReason {
  ErrorCode?: AssociationErrorCode;
  ErrorMessage?: string;
}
export interface WorkspaceResourceAssociation {
  AssociatedResourceId?: string;
  AssociatedResourceType?: WorkSpaceAssociatedResourceType;
  Created?: Date;
  LastUpdatedTime?: Date;
  State?: AssociationState;
  StateReason?: AssociationStateReason;
  WorkspaceId?: string;
}
export interface AssociateWorkspaceApplicationResult {
  Association?: WorkspaceResourceAssociation;
}
export type IpRule = string;
export type IpRuleDesc = string;
export interface IpRuleItem {
  ipRule?: string;
  ruleDesc?: string;
}
export type IpRuleList = IpRuleItem[];
export interface AuthorizeIpRulesRequest {
  GroupId: string;
  UserRules: IpRuleItem[];
}
export interface AuthorizeIpRulesResult {}
export type WorkspaceImageName = string;
export type WorkspaceImageDescription = string;
export type WorkspaceImageId = string;
export type Region = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value?: string;
}
export type TagList = Tag[];
export interface CopyWorkspaceImageRequest {
  Name: string;
  Description?: string;
  SourceImageId: string;
  SourceRegion: string;
  Tags?: Tag[];
}
export interface CopyWorkspaceImageResult {
  ImageId?: string;
}
export interface CreateAccountLinkInvitationRequest {
  TargetAccountId: string;
  ClientToken?: string;
}
export interface CreateAccountLinkInvitationResult {
  AccountLink?: AccountLink;
}
export type AddInName = string;
export type AddInUrl = string;
export interface CreateConnectClientAddInRequest {
  ResourceId: string;
  Name: string;
  URL: string;
}
export type AmazonUuid = string;
export interface CreateConnectClientAddInResult {
  AddInId?: string;
}
export type ConnectionString = string;
export interface CreateConnectionAliasRequest {
  ConnectionString: string;
  Tags?: Tag[];
}
export interface CreateConnectionAliasResult {
  AliasId?: string;
}
export type IpGroupName = string;
export type IpGroupDesc = string;
export interface CreateIpGroupRequest {
  GroupName: string;
  GroupDesc?: string;
  UserRules?: IpRuleItem[];
  Tags?: Tag[];
}
export interface CreateIpGroupResult {
  GroupId?: string;
}
export type VolumeEncryptionKey = string;
export type DataReplication =
  | "NO_REPLICATION"
  | "PRIMARY_AS_SOURCE"
  | (string & {});
export interface StandbyWorkspace {
  PrimaryWorkspaceId: string;
  VolumeEncryptionKey?: string;
  DirectoryId: string;
  Tags?: Tag[];
  DataReplication?: DataReplication;
}
export type StandbyWorkspacesList = StandbyWorkspace[];
export interface CreateStandbyWorkspacesRequest {
  PrimaryRegion: string;
  StandbyWorkspaces: StandbyWorkspace[];
}
export type WorkspaceErrorCode = string;
export type Description = string;
export interface FailedCreateStandbyWorkspacesRequest {
  StandbyWorkspaceRequest?: StandbyWorkspace;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type FailedCreateStandbyWorkspacesRequestList =
  FailedCreateStandbyWorkspacesRequest[];
export type UserName = string;
export type WorkspaceState =
  | "PENDING"
  | "AVAILABLE"
  | "IMPAIRED"
  | "UNHEALTHY"
  | "REBOOTING"
  | "STARTING"
  | "REBUILDING"
  | "RESTORING"
  | "MAINTENANCE"
  | "ADMIN_MAINTENANCE"
  | "TERMINATING"
  | "TERMINATED"
  | "SUSPENDED"
  | "UPDATING"
  | "STOPPING"
  | "STOPPED"
  | "ERROR"
  | (string & {});
export interface PendingCreateStandbyWorkspacesRequest {
  UserName?: string;
  DirectoryId?: string;
  State?: WorkspaceState;
  WorkspaceId?: string;
}
export type PendingCreateStandbyWorkspacesRequestList =
  PendingCreateStandbyWorkspacesRequest[];
export interface CreateStandbyWorkspacesResult {
  FailedStandbyRequests?: FailedCreateStandbyWorkspacesRequest[];
  PendingStandbyRequests?: PendingCreateStandbyWorkspacesRequest[];
}
export interface CreateTagsRequest {
  ResourceId: string;
  Tags: Tag[];
}
export interface CreateTagsResult {}
export interface CreateUpdatedWorkspaceImageRequest {
  Name: string;
  Description: string;
  SourceImageId: string;
  Tags?: Tag[];
}
export interface CreateUpdatedWorkspaceImageResult {
  ImageId?: string;
}
export type WorkspaceBundleName = string;
export type WorkspaceBundleDescription = string;
export type Compute =
  | "VALUE"
  | "STANDARD"
  | "PERFORMANCE"
  | "POWER"
  | "GRAPHICS"
  | "POWERPRO"
  | "GENERALPURPOSE_4XLARGE"
  | "GENERALPURPOSE_8XLARGE"
  | "GRAPHICSPRO"
  | "GRAPHICS_G4DN"
  | "GRAPHICSPRO_G4DN"
  | "GRAPHICS_G6_XLARGE"
  | "GRAPHICS_G6_2XLARGE"
  | "GRAPHICS_G6_4XLARGE"
  | "GRAPHICS_G6_8XLARGE"
  | "GRAPHICS_G6_16XLARGE"
  | "GRAPHICS_GR6_4XLARGE"
  | "GRAPHICS_GR6_8XLARGE"
  | "GRAPHICS_G6F_LARGE"
  | "GRAPHICS_G6F_XLARGE"
  | "GRAPHICS_G6F_2XLARGE"
  | "GRAPHICS_G6F_4XLARGE"
  | "GRAPHICS_GR6F_4XLARGE"
  | (string & {});
export interface ComputeType {
  Name?: Compute;
}
export interface UserStorage {
  Capacity: string;
}
export interface RootStorage {
  Capacity: string;
}
export interface CreateWorkspaceBundleRequest {
  BundleName: string;
  BundleDescription: string;
  ImageId: string;
  ComputeType: ComputeType;
  UserStorage: UserStorage;
  RootStorage?: RootStorage;
  Tags?: Tag[];
}
export type BundleId = string;
export type BundleOwner = string;
export type WorkspaceBundleState =
  | "AVAILABLE"
  | "PENDING"
  | "ERROR"
  | (string & {});
export type BundleType = "REGULAR" | "STANDBY" | (string & {});
export interface WorkspaceBundle {
  BundleId?: string;
  Name?: string;
  Owner?: string;
  Description?: string;
  ImageId?: string;
  RootStorage?: RootStorage;
  UserStorage?: UserStorage;
  ComputeType?: ComputeType;
  LastUpdatedTime?: Date;
  CreationTime?: Date;
  State?: WorkspaceBundleState;
  BundleType?: BundleType;
}
export interface CreateWorkspaceBundleResult {
  WorkspaceBundle?: WorkspaceBundle;
}
export interface CreateWorkspaceImageRequest {
  Name: string;
  Description: string;
  WorkspaceId: string;
  Tags?: Tag[];
}
export type OperatingSystemType = "WINDOWS" | "LINUX" | (string & {});
export interface OperatingSystem {
  Type?: OperatingSystemType;
}
export type WorkspaceImageState =
  | "AVAILABLE"
  | "PENDING"
  | "ERROR"
  | (string & {});
export type WorkspaceImageRequiredTenancy =
  | "DEFAULT"
  | "DEDICATED"
  | (string & {});
export interface CreateWorkspaceImageResult {
  ImageId?: string;
  Name?: string;
  Description?: string;
  OperatingSystem?: OperatingSystem;
  State?: WorkspaceImageState;
  RequiredTenancy?: WorkspaceImageRequiredTenancy;
  Created?: Date;
  OwnerAccountId?: string;
}
export type RunningMode = "AUTO_STOP" | "ALWAYS_ON" | "MANUAL" | (string & {});
export type RunningModeAutoStopTimeoutInMinutes = number;
export type RootVolumeSizeGib = number;
export type UserVolumeSizeGib = number;
export type Protocol = "PCOIP" | "WSP" | (string & {});
export type ProtocolList = Protocol[];
export type OperatingSystemName =
  | "AMAZON_LINUX_2"
  | "UBUNTU_18_04"
  | "UBUNTU_20_04"
  | "UBUNTU_22_04"
  | "UNKNOWN"
  | "WINDOWS_10"
  | "WINDOWS_11"
  | "WINDOWS_7"
  | "WINDOWS_SERVER_2016"
  | "WINDOWS_SERVER_2019"
  | "WINDOWS_SERVER_2022"
  | "WINDOWS_SERVER_2025"
  | "RHEL_8"
  | "ROCKY_8"
  | (string & {});
export type AGAModeForWorkSpaceEnum =
  | "ENABLED_AUTO"
  | "DISABLED"
  | "INHERITED"
  | (string & {});
export type AGAPreferredProtocolForWorkSpace =
  | "TCP"
  | "NONE"
  | "INHERITED"
  | (string & {});
export interface GlobalAcceleratorForWorkSpace {
  Mode: AGAModeForWorkSpaceEnum;
  PreferredProtocol?: AGAPreferredProtocolForWorkSpace;
}
export interface WorkspaceProperties {
  RunningMode?: RunningMode;
  RunningModeAutoStopTimeoutInMinutes?: number;
  RootVolumeSizeGib?: number;
  UserVolumeSizeGib?: number;
  ComputeTypeName?: Compute;
  Protocols?: Protocol[];
  OperatingSystemName?: OperatingSystemName;
  GlobalAccelerator?: GlobalAcceleratorForWorkSpace;
  NestedVirtualizationEnabled?: boolean;
}
export type WorkspaceName = string;
export type Ipv6Address = string;
export interface WorkspaceRequest {
  DirectoryId: string;
  UserName: string;
  BundleId: string;
  VolumeEncryptionKey?: string;
  UserVolumeEncryptionEnabled?: boolean;
  RootVolumeEncryptionEnabled?: boolean;
  WorkspaceProperties?: WorkspaceProperties;
  Tags?: Tag[];
  WorkspaceName?: string;
  Ipv6Address?: string;
}
export type WorkspaceRequestList = WorkspaceRequest[];
export interface CreateWorkspacesRequest {
  Workspaces: WorkspaceRequest[];
}
export type ErrorType = string;
export interface FailedCreateWorkspaceRequest {
  WorkspaceRequest?: WorkspaceRequest;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type FailedCreateWorkspaceRequests = FailedCreateWorkspaceRequest[];
export type IpAddress = string;
export type SubnetId = string;
export type ComputerName = string;
export type ModificationResourceEnum =
  | "ROOT_VOLUME"
  | "USER_VOLUME"
  | "COMPUTE_TYPE"
  | "PROTOCOL"
  | "NESTED_VIRTUALIZATION"
  | (string & {});
export type ModificationStateEnum =
  | "UPDATE_INITIATED"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_FAILED"
  | (string & {});
export interface ModificationState {
  Resource?: ModificationResourceEnum;
  State?: ModificationStateEnum;
}
export type ModificationStateList = ModificationState[];
export type StandbyWorkspaceRelationshipType =
  | "PRIMARY"
  | "STANDBY"
  | (string & {});
export interface RelatedWorkspaceProperties {
  WorkspaceId?: string;
  Region?: string;
  State?: WorkspaceState;
  Type?: StandbyWorkspaceRelationshipType;
}
export type RelatedWorkspaces = RelatedWorkspaceProperties[];
export interface DataReplicationSettings {
  DataReplication?: DataReplication;
  RecoverySnapshotTime?: Date;
}
export interface StandbyWorkspacesProperties {
  StandbyWorkspaceId?: string;
  DataReplication?: DataReplication;
  RecoverySnapshotTime?: Date;
}
export type StandbyWorkspacesPropertiesList = StandbyWorkspacesProperties[];
export interface Workspace {
  WorkspaceId?: string;
  DirectoryId?: string;
  UserName?: string;
  IpAddress?: string;
  Ipv6Address?: string;
  State?: WorkspaceState;
  BundleId?: string;
  SubnetId?: string;
  ErrorMessage?: string;
  ErrorCode?: string;
  ComputerName?: string;
  VolumeEncryptionKey?: string;
  UserVolumeEncryptionEnabled?: boolean;
  RootVolumeEncryptionEnabled?: boolean;
  WorkspaceName?: string;
  WorkspaceProperties?: WorkspaceProperties;
  ModificationStates?: ModificationState[];
  RelatedWorkspaces?: RelatedWorkspaceProperties[];
  DataReplicationSettings?: DataReplicationSettings;
  StandbyWorkspacesProperties?: StandbyWorkspacesProperties[];
}
export type WorkspaceList = Workspace[];
export interface CreateWorkspacesResult {
  FailedRequests?: FailedCreateWorkspaceRequest[];
  PendingRequests?: Workspace[];
}
export type WorkspacesPoolName = string;
export type UpdateDescription = string;
export type DesiredUserSessions = number;
export interface Capacity {
  DesiredUserSessions: number;
}
export type ApplicationSettingsStatusEnum =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export type SettingsGroup = string;
export interface ApplicationSettingsRequest {
  Status: ApplicationSettingsStatusEnum;
  SettingsGroup?: string;
}
export type DisconnectTimeoutInSeconds = number;
export type IdleDisconnectTimeoutInSeconds = number;
export type MaxUserDurationInSeconds = number;
export interface TimeoutSettings {
  DisconnectTimeoutInSeconds?: number;
  IdleDisconnectTimeoutInSeconds?: number;
  MaxUserDurationInSeconds?: number;
}
export type PoolsRunningMode = "AUTO_STOP" | "ALWAYS_ON" | (string & {});
export interface CreateWorkspacesPoolRequest {
  PoolName: string;
  Description: string;
  BundleId: string;
  DirectoryId: string;
  Capacity: Capacity;
  Tags?: Tag[];
  ApplicationSettings?: ApplicationSettingsRequest;
  TimeoutSettings?: TimeoutSettings;
  RunningMode?: PoolsRunningMode;
}
export type WorkspacesPoolId = string;
export type ARN = string;
export type AvailableUserSessions = number;
export type ActualUserSessions = number;
export type ActiveUserSessions = number;
export interface CapacityStatus {
  AvailableUserSessions: number;
  DesiredUserSessions: number;
  ActualUserSessions: number;
  ActiveUserSessions: number;
}
export type WorkspacesPoolState =
  | "CREATING"
  | "DELETING"
  | "RUNNING"
  | "STARTING"
  | "STOPPED"
  | "STOPPING"
  | "UPDATING"
  | (string & {});
export type WorkspacesPoolErrorCode =
  | "IAM_SERVICE_ROLE_IS_MISSING"
  | "IAM_SERVICE_ROLE_MISSING_ENI_DESCRIBE_ACTION"
  | "IAM_SERVICE_ROLE_MISSING_ENI_CREATE_ACTION"
  | "IAM_SERVICE_ROLE_MISSING_ENI_DELETE_ACTION"
  | "NETWORK_INTERFACE_LIMIT_EXCEEDED"
  | "INTERNAL_SERVICE_ERROR"
  | "MACHINE_ROLE_IS_MISSING"
  | "STS_DISABLED_IN_REGION"
  | "SUBNET_HAS_INSUFFICIENT_IP_ADDRESSES"
  | "IAM_SERVICE_ROLE_MISSING_DESCRIBE_SUBNET_ACTION"
  | "SUBNET_NOT_FOUND"
  | "IMAGE_NOT_FOUND"
  | "INVALID_SUBNET_CONFIGURATION"
  | "SECURITY_GROUPS_NOT_FOUND"
  | "IGW_NOT_ATTACHED"
  | "IAM_SERVICE_ROLE_MISSING_DESCRIBE_SECURITY_GROUPS_ACTION"
  | "WORKSPACES_POOL_STOPPED"
  | "WORKSPACES_POOL_INSTANCE_PROVISIONING_FAILURE"
  | "DOMAIN_JOIN_ERROR_FILE_NOT_FOUND"
  | "DOMAIN_JOIN_ERROR_ACCESS_DENIED"
  | "DOMAIN_JOIN_ERROR_LOGON_FAILURE"
  | "DOMAIN_JOIN_ERROR_INVALID_PARAMETER"
  | "DOMAIN_JOIN_ERROR_MORE_DATA"
  | "DOMAIN_JOIN_ERROR_NO_SUCH_DOMAIN"
  | "DOMAIN_JOIN_ERROR_NOT_SUPPORTED"
  | "DOMAIN_JOIN_NERR_INVALID_WORKGROUP_NAME"
  | "DOMAIN_JOIN_NERR_WORKSTATION_NOT_STARTED"
  | "DOMAIN_JOIN_ERROR_DS_MACHINE_ACCOUNT_QUOTA_EXCEEDED"
  | "DOMAIN_JOIN_NERR_PASSWORD_EXPIRED"
  | "DOMAIN_JOIN_INTERNAL_SERVICE_ERROR"
  | "DOMAIN_JOIN_ERROR_SECRET_ACTION_PERMISSION_IS_MISSING"
  | "DOMAIN_JOIN_ERROR_SECRET_DECRYPTION_FAILURE"
  | "DOMAIN_JOIN_ERROR_SECRET_STATE_INVALID"
  | "DOMAIN_JOIN_ERROR_SECRET_NOT_FOUND"
  | "DOMAIN_JOIN_ERROR_SECRET_VALUE_KEY_NOT_FOUND"
  | "DOMAIN_JOIN_ERROR_SECRET_INVALID"
  | "BUNDLE_NOT_FOUND"
  | "DIRECTORY_NOT_FOUND"
  | "INSUFFICIENT_PERMISSIONS_ERROR"
  | "DEFAULT_OU_IS_MISSING"
  | (string & {});
export type ErrorMessage = string;
export interface WorkspacesPoolError {
  ErrorCode?: WorkspacesPoolErrorCode;
  ErrorMessage?: string;
}
export type WorkspacesPoolErrors = WorkspacesPoolError[];
export type S3BucketName = string;
export interface ApplicationSettingsResponse {
  Status: ApplicationSettingsStatusEnum;
  SettingsGroup?: string;
  S3BucketName?: string;
}
export interface WorkspacesPool {
  PoolId: string;
  PoolArn: string;
  CapacityStatus: CapacityStatus;
  PoolName: string;
  Description?: string;
  State: WorkspacesPoolState;
  CreatedAt: Date;
  BundleId: string;
  DirectoryId: string;
  Errors?: WorkspacesPoolError[];
  ApplicationSettings?: ApplicationSettingsResponse;
  TimeoutSettings?: TimeoutSettings;
  RunningMode: PoolsRunningMode;
}
export interface CreateWorkspacesPoolResult {
  WorkspacesPool?: WorkspacesPool;
}
export interface DeleteAccountLinkInvitationRequest {
  LinkId: string;
  ClientToken?: string;
}
export interface DeleteAccountLinkInvitationResult {
  AccountLink?: AccountLink;
}
export type ClientDeviceType =
  | "DeviceTypeWindows"
  | "DeviceTypeOsx"
  | "DeviceTypeAndroid"
  | "DeviceTypeIos"
  | "DeviceTypeLinux"
  | "DeviceTypeWeb"
  | (string & {});
export type ClientDeviceTypeList = ClientDeviceType[];
export interface DeleteClientBrandingRequest {
  ResourceId: string;
  Platforms: ClientDeviceType[];
}
export interface DeleteClientBrandingResult {}
export interface DeleteConnectClientAddInRequest {
  AddInId: string;
  ResourceId: string;
}
export interface DeleteConnectClientAddInResult {}
export interface DeleteConnectionAliasRequest {
  AliasId: string;
}
export interface DeleteConnectionAliasResult {}
export interface DeleteIpGroupRequest {
  GroupId: string;
}
export interface DeleteIpGroupResult {}
export type TagKeyList = string[];
export interface DeleteTagsRequest {
  ResourceId: string;
  TagKeys: string[];
}
export interface DeleteTagsResult {}
export interface DeleteWorkspaceBundleRequest {
  BundleId?: string;
}
export interface DeleteWorkspaceBundleResult {}
export interface DeleteWorkspaceImageRequest {
  ImageId: string;
}
export interface DeleteWorkspaceImageResult {}
export interface DeployWorkspaceApplicationsRequest {
  WorkspaceId: string;
  Force?: boolean;
}
export type WorkspaceResourceAssociationList = WorkspaceResourceAssociation[];
export interface WorkSpaceApplicationDeployment {
  Associations?: WorkspaceResourceAssociation[];
}
export interface DeployWorkspaceApplicationsResult {
  Deployment?: WorkSpaceApplicationDeployment;
}
export interface DeregisterWorkspaceDirectoryRequest {
  DirectoryId: string;
}
export interface DeregisterWorkspaceDirectoryResult {}
export interface DescribeAccountRequest {}
export type DedicatedTenancySupportResultEnum =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export type DedicatedTenancyManagementCidrRange = string;
export type DedicatedTenancyAccountType =
  | "SOURCE_ACCOUNT"
  | "TARGET_ACCOUNT"
  | (string & {});
export type Message = string;
export interface DescribeAccountResult {
  DedicatedTenancySupport?: DedicatedTenancySupportResultEnum;
  DedicatedTenancyManagementCidrRange?: string;
  DedicatedTenancyAccountType?: DedicatedTenancyAccountType;
  Message?: string;
}
export type PaginationToken = string;
export interface DescribeAccountModificationsRequest {
  NextToken?: string;
}
export type DedicatedTenancyModificationStateEnum =
  | "PENDING"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export interface AccountModification {
  ModificationState?: DedicatedTenancyModificationStateEnum;
  DedicatedTenancySupport?: DedicatedTenancySupportResultEnum;
  DedicatedTenancyManagementCidrRange?: string;
  StartTime?: Date;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type AccountModificationList = AccountModification[];
export interface DescribeAccountModificationsResult {
  AccountModifications?: AccountModification[];
  NextToken?: string;
}
export type Limit = number;
export type ApplicationAssociatedResourceType =
  | "WORKSPACE"
  | "BUNDLE"
  | "IMAGE"
  | (string & {});
export type ApplicationAssociatedResourceTypeList =
  ApplicationAssociatedResourceType[];
export interface DescribeApplicationAssociationsRequest {
  MaxResults?: number;
  NextToken?: string;
  ApplicationId: string;
  AssociatedResourceTypes: ApplicationAssociatedResourceType[];
}
export interface ApplicationResourceAssociation {
  ApplicationId?: string;
  AssociatedResourceId?: string;
  AssociatedResourceType?: ApplicationAssociatedResourceType;
  Created?: Date;
  LastUpdatedTime?: Date;
  State?: AssociationState;
  StateReason?: AssociationStateReason;
}
export type ApplicationResourceAssociationList =
  ApplicationResourceAssociation[];
export interface DescribeApplicationAssociationsResult {
  Associations?: ApplicationResourceAssociation[];
  NextToken?: string;
}
export type WorkSpaceApplicationIdList = string[];
export type ComputeList = Compute[];
export type WorkSpaceApplicationLicenseType =
  | "LICENSED"
  | "UNLICENSED"
  | (string & {});
export type OperatingSystemNameList = OperatingSystemName[];
export type WorkSpaceApplicationOwner = string;
export interface DescribeApplicationsRequest {
  ApplicationIds?: string[];
  ComputeTypeNames?: Compute[];
  LicenseType?: WorkSpaceApplicationLicenseType;
  OperatingSystemNames?: OperatingSystemName[];
  Owner?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type WorkSpaceApplicationState =
  | "PENDING"
  | "ERROR"
  | "AVAILABLE"
  | "UNINSTALL_ONLY"
  | (string & {});
export interface WorkSpaceApplication {
  ApplicationId?: string;
  Created?: Date;
  Description?: string;
  LicenseType?: WorkSpaceApplicationLicenseType;
  Name?: string;
  Owner?: string;
  State?: WorkSpaceApplicationState;
  SupportedComputeTypeNames?: Compute[];
  SupportedOperatingSystemNames?: OperatingSystemName[];
}
export type WorkSpaceApplicationList = WorkSpaceApplication[];
export interface DescribeApplicationsResult {
  Applications?: WorkSpaceApplication[];
  NextToken?: string;
}
export type BundleAssociatedResourceType = "APPLICATION" | (string & {});
export type BundleAssociatedResourceTypeList = BundleAssociatedResourceType[];
export interface DescribeBundleAssociationsRequest {
  BundleId: string;
  AssociatedResourceTypes: BundleAssociatedResourceType[];
}
export interface BundleResourceAssociation {
  AssociatedResourceId?: string;
  AssociatedResourceType?: BundleAssociatedResourceType;
  BundleId?: string;
  Created?: Date;
  LastUpdatedTime?: Date;
  State?: AssociationState;
  StateReason?: AssociationStateReason;
}
export type BundleResourceAssociationList = BundleResourceAssociation[];
export interface DescribeBundleAssociationsResult {
  Associations?: BundleResourceAssociation[];
}
export interface DescribeClientBrandingRequest {
  ResourceId: string;
}
export type ClientUrl = string;
export type ClientEmail = string;
export type ClientLocale = string;
export type ClientLoginMessage = string;
export type LoginMessage = { [key: string]: string | undefined };
export interface DefaultClientBrandingAttributes {
  LogoUrl?: string;
  SupportEmail?: string;
  SupportLink?: string;
  ForgotPasswordLink?: string;
  LoginMessage?: { [key: string]: string | undefined };
}
export interface IosClientBrandingAttributes {
  LogoUrl?: string;
  Logo2xUrl?: string;
  Logo3xUrl?: string;
  SupportEmail?: string;
  SupportLink?: string;
  ForgotPasswordLink?: string;
  LoginMessage?: { [key: string]: string | undefined };
}
export interface DescribeClientBrandingResult {
  DeviceTypeWindows?: DefaultClientBrandingAttributes;
  DeviceTypeOsx?: DefaultClientBrandingAttributes;
  DeviceTypeAndroid?: DefaultClientBrandingAttributes;
  DeviceTypeIos?: IosClientBrandingAttributes;
  DeviceTypeLinux?: DefaultClientBrandingAttributes;
  DeviceTypeWeb?: DefaultClientBrandingAttributes;
}
export type ResourceIdList = string[];
export interface DescribeClientPropertiesRequest {
  ResourceIds: string[];
}
export type ReconnectEnum = "ENABLED" | "DISABLED" | (string & {});
export type LogUploadEnum = "ENABLED" | "DISABLED" | (string & {});
export type ClientExperiencePolicy = string;
export interface ClientProperties {
  ReconnectEnabled?: ReconnectEnum;
  LogUploadEnabled?: LogUploadEnum;
  ClientExperiencePolicy?: string;
}
export interface ClientPropertiesResult {
  ResourceId?: string;
  ClientProperties?: ClientProperties;
}
export type ClientPropertiesList = ClientPropertiesResult[];
export interface DescribeClientPropertiesResult {
  ClientPropertiesList?: ClientPropertiesResult[];
}
export interface DescribeConnectClientAddInsRequest {
  ResourceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ConnectClientAddIn {
  AddInId?: string;
  ResourceId?: string;
  Name?: string;
  URL?: string;
}
export type ConnectClientAddInList = ConnectClientAddIn[];
export interface DescribeConnectClientAddInsResult {
  AddIns?: ConnectClientAddIn[];
  NextToken?: string;
}
export type ConnectionAliasIdList = string[];
export interface DescribeConnectionAliasesRequest {
  AliasIds?: string[];
  ResourceId?: string;
  Limit?: number;
  NextToken?: string;
}
export type ConnectionAliasState =
  | "CREATING"
  | "CREATED"
  | "DELETING"
  | (string & {});
export type AssociationStatus =
  | "NOT_ASSOCIATED"
  | "ASSOCIATED_WITH_OWNER_ACCOUNT"
  | "ASSOCIATED_WITH_SHARED_ACCOUNT"
  | "PENDING_ASSOCIATION"
  | "PENDING_DISASSOCIATION"
  | (string & {});
export interface ConnectionAliasAssociation {
  AssociationStatus?: AssociationStatus;
  AssociatedAccountId?: string;
  ResourceId?: string;
  ConnectionIdentifier?: string;
}
export type ConnectionAliasAssociationList = ConnectionAliasAssociation[];
export interface ConnectionAlias {
  ConnectionString?: string;
  AliasId?: string;
  State?: ConnectionAliasState;
  OwnerAccountId?: string;
  Associations?: ConnectionAliasAssociation[];
}
export type ConnectionAliasList = ConnectionAlias[];
export interface DescribeConnectionAliasesResult {
  ConnectionAliases?: ConnectionAlias[];
  NextToken?: string;
}
export interface DescribeConnectionAliasPermissionsRequest {
  AliasId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ConnectionAliasPermission {
  SharedAccountId: string;
  AllowAssociation: boolean;
}
export type ConnectionAliasPermissions = ConnectionAliasPermission[];
export interface DescribeConnectionAliasPermissionsResult {
  AliasId?: string;
  ConnectionAliasPermissions?: ConnectionAliasPermission[];
  NextToken?: string;
}
export interface DescribeCustomWorkspaceImageImportRequest {
  ImageId: string;
}
export type InfrastructureConfigurationArn = string;
export type CustomWorkspaceImageImportState =
  | "PENDING"
  | "IN_PROGRESS"
  | "PROCESSING_SOURCE_IMAGE"
  | "IMAGE_TESTING_START"
  | "UPDATING_OPERATING_SYSTEM"
  | "IMAGE_COMPATIBILITY_CHECKING"
  | "IMAGE_TESTING_GENERALIZATION"
  | "CREATING_TEST_INSTANCE"
  | "INSTALLING_COMPONENTS"
  | "GENERALIZING"
  | "VALIDATING"
  | "PUBLISHING"
  | "COMPLETED"
  | "ERROR"
  | (string & {});
export type WorkflowStateMessage = string;
export type Percentage = number;
export type Ec2ImportTaskId = string;
export type ImageBuildVersionArn = string;
export type Ec2ImageId = string;
export type ImageSourceIdentifier =
  | {
      Ec2ImportTaskId: string;
      ImageBuildVersionArn?: never;
      Ec2ImageId?: never;
    }
  | {
      Ec2ImportTaskId?: never;
      ImageBuildVersionArn: string;
      Ec2ImageId?: never;
    }
  | {
      Ec2ImportTaskId?: never;
      ImageBuildVersionArn?: never;
      Ec2ImageId: string;
    };
export type ErrorCode = string;
export type ImageErrorMessage = string;
export interface CustomWorkspaceImageImportErrorDetails {
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type CustomWorkspaceImageImportErrorDetailsList =
  CustomWorkspaceImageImportErrorDetails[];
export interface DescribeCustomWorkspaceImageImportResult {
  ImageId?: string;
  InfrastructureConfigurationArn?: string;
  State?: CustomWorkspaceImageImportState;
  StateMessage?: string;
  ProgressPercentage?: number;
  Created?: Date;
  LastUpdatedTime?: Date;
  ImageSource?: ImageSourceIdentifier;
  ImageBuilderInstanceId?: string;
  ErrorDetails?: CustomWorkspaceImageImportErrorDetails[];
}
export type ImageAssociatedResourceType = "APPLICATION" | (string & {});
export type ImageAssociatedResourceTypeList = ImageAssociatedResourceType[];
export interface DescribeImageAssociationsRequest {
  ImageId: string;
  AssociatedResourceTypes: ImageAssociatedResourceType[];
}
export interface ImageResourceAssociation {
  AssociatedResourceId?: string;
  AssociatedResourceType?: ImageAssociatedResourceType;
  Created?: Date;
  LastUpdatedTime?: Date;
  ImageId?: string;
  State?: AssociationState;
  StateReason?: AssociationStateReason;
}
export type ImageResourceAssociationList = ImageResourceAssociation[];
export interface DescribeImageAssociationsResult {
  Associations?: ImageResourceAssociation[];
}
export interface DescribeIpGroupsRequest {
  GroupIds?: string[];
  NextToken?: string;
  MaxResults?: number;
}
export interface WorkspacesIpGroup {
  groupId?: string;
  groupName?: string;
  groupDesc?: string;
  userRules?: IpRuleItem[];
}
export type WorkspacesIpGroupsList = WorkspacesIpGroup[];
export interface DescribeIpGroupsResult {
  Result?: WorkspacesIpGroup[];
  NextToken?: string;
}
export interface DescribeTagsRequest {
  ResourceId: string;
}
export interface DescribeTagsResult {
  TagList?: Tag[];
}
export type WorkSpaceAssociatedResourceTypeList =
  WorkSpaceAssociatedResourceType[];
export interface DescribeWorkspaceAssociationsRequest {
  WorkspaceId: string;
  AssociatedResourceTypes: WorkSpaceAssociatedResourceType[];
}
export interface DescribeWorkspaceAssociationsResult {
  Associations?: WorkspaceResourceAssociation[];
}
export type BundleIdList = string[];
export interface DescribeWorkspaceBundlesRequest {
  BundleIds?: string[];
  Owner?: string;
  NextToken?: string;
}
export type BundleList = WorkspaceBundle[];
export interface DescribeWorkspaceBundlesResult {
  Bundles?: WorkspaceBundle[];
  NextToken?: string;
}
export type DirectoryIdList = string[];
export type WorkspaceDirectoryName = string;
export type WorkspaceDirectoryNameList = string[];
export type DescribeWorkspaceDirectoriesFilterName =
  | "USER_IDENTITY_TYPE"
  | "WORKSPACE_TYPE"
  | (string & {});
export type DescribeWorkspaceDirectoriesFilterValue = string;
export type DescribeWorkspaceDirectoriesFilterValues = string[];
export interface DescribeWorkspaceDirectoriesFilter {
  Name: DescribeWorkspaceDirectoriesFilterName;
  Values: string[];
}
export type DescribeWorkspaceDirectoriesFilterList =
  DescribeWorkspaceDirectoriesFilter[];
export interface DescribeWorkspaceDirectoriesRequest {
  DirectoryIds?: string[];
  WorkspaceDirectoryNames?: string[];
  Limit?: number;
  NextToken?: string;
  Filters?: DescribeWorkspaceDirectoriesFilter[];
}
export type Alias = string;
export type DirectoryName = string;
export type RegistrationCode = string;
export type SubnetIds = string[];
export type DnsIpAddresses = string[];
export type DnsIpv6Addresses = string[];
export type WorkspaceDirectoryType =
  | "SIMPLE_AD"
  | "AD_CONNECTOR"
  | "CUSTOMER_MANAGED"
  | "AWS_IAM_IDENTITY_CENTER"
  | (string & {});
export type SecurityGroupId = string;
export type WorkspaceDirectoryState =
  | "REGISTERING"
  | "REGISTERED"
  | "DEREGISTERING"
  | "DEREGISTERED"
  | "ERROR"
  | (string & {});
export type DefaultOu = string;
export interface DefaultWorkspaceCreationProperties {
  EnableInternetAccess?: boolean;
  DefaultOu?: string;
  CustomSecurityGroupId?: string;
  UserEnabledAsLocalAdministrator?: boolean;
  EnableMaintenanceMode?: boolean;
  InstanceIamRoleArn?: string;
}
export type AccessPropertyValue = "ALLOW" | "DENY" | (string & {});
export type AccessEndpointType = "STREAMING_WSP" | (string & {});
export type AlphanumericDashUnderscoreNonEmptyString = string;
export interface AccessEndpoint {
  AccessEndpointType?: AccessEndpointType;
  VpcEndpointId?: string;
}
export type AccessEndpointList = AccessEndpoint[];
export type InternetFallbackProtocol = "PCOIP" | (string & {});
export type InternetFallbackProtocolList = InternetFallbackProtocol[];
export interface AccessEndpointConfig {
  AccessEndpoints: AccessEndpoint[];
  InternetFallbackProtocols?: InternetFallbackProtocol[];
}
export interface WorkspaceAccessProperties {
  DeviceTypeWindows?: AccessPropertyValue;
  DeviceTypeOsx?: AccessPropertyValue;
  DeviceTypeWeb?: AccessPropertyValue;
  DeviceTypeIos?: AccessPropertyValue;
  DeviceTypeAndroid?: AccessPropertyValue;
  DeviceTypeChromeOs?: AccessPropertyValue;
  DeviceTypeZeroClient?: AccessPropertyValue;
  DeviceTypeLinux?: AccessPropertyValue;
  DeviceTypeWorkSpacesThinClient?: AccessPropertyValue;
  AccessEndpointConfig?: AccessEndpointConfig;
}
export type Tenancy = "DEDICATED" | "SHARED" | (string & {});
export interface SelfservicePermissions {
  RestartWorkspace?: ReconnectEnum;
  IncreaseVolumeSize?: ReconnectEnum;
  ChangeComputeType?: ReconnectEnum;
  SwitchRunningMode?: ReconnectEnum;
  RebuildWorkspace?: ReconnectEnum;
}
export type SamlStatusEnum =
  | "DISABLED"
  | "ENABLED"
  | "ENABLED_WITH_DIRECTORY_LOGIN_FALLBACK"
  | (string & {});
export type SamlUserAccessUrl = string;
export interface SamlProperties {
  Status?: SamlStatusEnum;
  UserAccessUrl?: string;
  RelayStateParameterName?: string;
}
export type CertificateBasedAuthStatusEnum =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export type CertificateAuthorityArn = string;
export interface CertificateBasedAuthProperties {
  Status?: CertificateBasedAuthStatusEnum;
  CertificateAuthorityArn?: string;
}
export type EndpointEncryptionMode =
  | "STANDARD_TLS"
  | "FIPS_VALIDATED"
  | (string & {});
export type MicrosoftEntraConfigTenantId = string;
export type SecretsManagerArn = string;
export interface MicrosoftEntraConfig {
  TenantId?: string;
  ApplicationConfigSecretArn?: string;
}
export type WorkspaceDirectoryDescription = string;
export type UserIdentityType =
  | "CUSTOMER_MANAGED"
  | "AWS_DIRECTORY_SERVICE"
  | "AWS_IAM_IDENTITY_CENTER"
  | (string & {});
export type WorkspaceType = "PERSONAL" | "POOLS" | (string & {});
export interface IDCConfig {
  InstanceArn?: string;
  ApplicationArn?: string;
}
export type DomainName = string;
export interface ActiveDirectoryConfig {
  DomainName: string;
  ServiceAccountSecretArn: string;
}
export type StreamingExperiencePreferredProtocolEnum =
  | "TCP"
  | "UDP"
  | (string & {});
export type UserSettingActionEnum =
  | "CLIPBOARD_COPY_FROM_LOCAL_DEVICE"
  | "CLIPBOARD_COPY_TO_LOCAL_DEVICE"
  | "PRINTING_TO_LOCAL_DEVICE"
  | "SMART_CARD"
  | (string & {});
export type UserSettingPermissionEnum = "ENABLED" | "DISABLED" | (string & {});
export type MaximumLength = number;
export interface UserSetting {
  Action: UserSettingActionEnum;
  Permission: UserSettingPermissionEnum;
  MaximumLength?: number;
}
export type UserSettings = UserSetting[];
export type StorageConnectorTypeEnum = "HOME_FOLDER" | (string & {});
export type StorageConnectorStatusEnum = "ENABLED" | "DISABLED" | (string & {});
export interface StorageConnector {
  ConnectorType: StorageConnectorTypeEnum;
  Status: StorageConnectorStatusEnum;
}
export type StorageConnectors = StorageConnector[];
export type AGAModeForDirectoryEnum =
  | "ENABLED_AUTO"
  | "DISABLED"
  | (string & {});
export type AGAPreferredProtocolForDirectory = "TCP" | "NONE" | (string & {});
export interface GlobalAcceleratorForDirectory {
  Mode: AGAModeForDirectoryEnum;
  PreferredProtocol?: AGAPreferredProtocolForDirectory;
}
export interface StreamingProperties {
  StreamingExperiencePreferredProtocol?: StreamingExperiencePreferredProtocolEnum;
  UserSettings?: UserSetting[];
  StorageConnectors?: StorageConnector[];
  GlobalAccelerator?: GlobalAcceleratorForDirectory;
}
export interface WorkspaceDirectory {
  DirectoryId?: string;
  Alias?: string;
  DirectoryName?: string;
  RegistrationCode?: string;
  SubnetIds?: string[];
  DnsIpAddresses?: string[];
  DnsIpv6Addresses?: string[];
  CustomerUserName?: string;
  IamRoleId?: string;
  DirectoryType?: WorkspaceDirectoryType;
  WorkspaceSecurityGroupId?: string;
  State?: WorkspaceDirectoryState;
  WorkspaceCreationProperties?: DefaultWorkspaceCreationProperties;
  ipGroupIds?: string[];
  WorkspaceAccessProperties?: WorkspaceAccessProperties;
  Tenancy?: Tenancy;
  SelfservicePermissions?: SelfservicePermissions;
  SamlProperties?: SamlProperties;
  CertificateBasedAuthProperties?: CertificateBasedAuthProperties;
  EndpointEncryptionMode?: EndpointEncryptionMode;
  MicrosoftEntraConfig?: MicrosoftEntraConfig;
  WorkspaceDirectoryName?: string;
  WorkspaceDirectoryDescription?: string;
  UserIdentityType?: UserIdentityType;
  WorkspaceType?: WorkspaceType;
  IDCConfig?: IDCConfig;
  ActiveDirectoryConfig?: ActiveDirectoryConfig;
  StreamingProperties?: StreamingProperties;
  ErrorMessage?: string;
}
export type DirectoryList = WorkspaceDirectory[];
export interface DescribeWorkspaceDirectoriesResult {
  Directories?: WorkspaceDirectory[];
  NextToken?: string;
}
export interface DescribeWorkspaceImagePermissionsRequest {
  ImageId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ImagePermission {
  SharedAccountId?: string;
}
export type ImagePermissions = ImagePermission[];
export interface DescribeWorkspaceImagePermissionsResult {
  ImageId?: string;
  ImagePermissions?: ImagePermission[];
  NextToken?: string;
}
export type WorkspaceImageIdList = string[];
export type ImageType = "OWNED" | "SHARED" | (string & {});
export interface DescribeWorkspaceImagesRequest {
  ImageIds?: string[];
  ImageType?: ImageType;
  NextToken?: string;
  MaxResults?: number;
}
export type WorkspaceImageErrorCode = string;
export interface UpdateResult {
  UpdateAvailable?: boolean;
  Description?: string;
}
export type WorkspaceImageErrorDetailCode =
  | "OutdatedPowershellVersion"
  | "OfficeInstalled"
  | "PCoIPAgentInstalled"
  | "WindowsUpdatesEnabled"
  | "AutoMountDisabled"
  | "WorkspacesBYOLAccountNotFound"
  | "WorkspacesBYOLAccountDisabled"
  | "DHCPDisabled"
  | "DiskFreeSpace"
  | "AdditionalDrivesAttached"
  | "OSNotSupported"
  | "DomainJoined"
  | "AzureDomainJoined"
  | "FirewallEnabled"
  | "VMWareToolsInstalled"
  | "DiskSizeExceeded"
  | "IncompatiblePartitioning"
  | "PendingReboot"
  | "AutoLogonEnabled"
  | "RealTimeUniversalDisabled"
  | "MultipleBootPartition"
  | "Requires64BitOS"
  | "ZeroRearmCount"
  | "InPlaceUpgrade"
  | "AntiVirusInstalled"
  | "UEFINotSupported"
  | "UnknownError"
  | "AppXPackagesInstalled"
  | "ReservedStorageInUse"
  | "AdditionalDrivesPresent"
  | "WindowsUpdatesRequired"
  | "SysPrepFileMissing"
  | "UserProfileMissing"
  | "InsufficientDiskSpace"
  | "EnvironmentVariablesPathMissingEntries"
  | "DomainAccountServicesFound"
  | "InvalidIp"
  | "RemoteDesktopServicesDisabled"
  | "WindowsModulesInstallerDisabled"
  | "AmazonSsmAgentEnabled"
  | "UnsupportedSecurityProtocol"
  | "MultipleUserProfiles"
  | "StagedAppxPackage"
  | "UnsupportedOsUpgrade"
  | "InsufficientRearmCount"
  | "ProtocolOSIncompatibility"
  | "MemoryIntegrityIncompatibility"
  | "RestrictedDriveLetterInUse"
  | (string & {});
export interface ErrorDetails {
  ErrorCode?: WorkspaceImageErrorDetailCode;
  ErrorMessage?: string;
}
export type ErrorDetailsList = ErrorDetails[];
export interface WorkspaceImage {
  ImageId?: string;
  Name?: string;
  Description?: string;
  OperatingSystem?: OperatingSystem;
  State?: WorkspaceImageState;
  RequiredTenancy?: WorkspaceImageRequiredTenancy;
  ErrorCode?: string;
  ErrorMessage?: string;
  Created?: Date;
  OwnerAccountId?: string;
  Updates?: UpdateResult;
  ErrorDetails?: ErrorDetails[];
}
export type WorkspaceImageList = WorkspaceImage[];
export interface DescribeWorkspaceImagesResult {
  Images?: WorkspaceImage[];
  NextToken?: string;
}
export type WorkspaceIdList = string[];
export interface DescribeWorkspacesRequest {
  WorkspaceIds?: string[];
  DirectoryId?: string;
  UserName?: string;
  BundleId?: string;
  Limit?: number;
  NextToken?: string;
  WorkspaceName?: string;
}
export interface DescribeWorkspacesResult {
  Workspaces?: Workspace[];
  NextToken?: string;
}
export interface DescribeWorkspacesConnectionStatusRequest {
  WorkspaceIds?: string[];
  NextToken?: string;
}
export type ConnectionState =
  | "CONNECTED"
  | "DISCONNECTED"
  | "UNKNOWN"
  | (string & {});
export interface WorkspaceConnectionStatus {
  WorkspaceId?: string;
  ConnectionState?: ConnectionState;
  ConnectionStateCheckTimestamp?: Date;
  LastKnownUserConnectionTimestamp?: Date;
}
export type WorkspaceConnectionStatusList = WorkspaceConnectionStatus[];
export interface DescribeWorkspacesConnectionStatusResult {
  WorkspacesConnectionStatus?: WorkspaceConnectionStatus[];
  NextToken?: string;
}
export interface DescribeWorkspaceSnapshotsRequest {
  WorkspaceId: string;
}
export interface Snapshot {
  SnapshotTime?: Date;
}
export type SnapshotList = Snapshot[];
export interface DescribeWorkspaceSnapshotsResult {
  RebuildSnapshots?: Snapshot[];
  RestoreSnapshots?: Snapshot[];
}
export type WorkspacesPoolIds = string[];
export type DescribeWorkspacesPoolsFilterName = "PoolName" | (string & {});
export type DescribeWorkspacesPoolsFilterValue = string;
export type DescribeWorkspacesPoolsFilterValues = string[];
export type DescribeWorkspacesPoolsFilterOperator =
  | "EQUALS"
  | "NOTEQUALS"
  | "CONTAINS"
  | "NOTCONTAINS"
  | (string & {});
export interface DescribeWorkspacesPoolsFilter {
  Name: DescribeWorkspacesPoolsFilterName;
  Values: string[];
  Operator: DescribeWorkspacesPoolsFilterOperator;
}
export type DescribeWorkspacesPoolsFilters = DescribeWorkspacesPoolsFilter[];
export interface DescribeWorkspacesPoolsRequest {
  PoolIds?: string[];
  Filters?: DescribeWorkspacesPoolsFilter[];
  Limit?: number;
  NextToken?: string;
}
export type WorkspacesPools = WorkspacesPool[];
export interface DescribeWorkspacesPoolsResult {
  WorkspacesPools?: WorkspacesPool[];
  NextToken?: string;
}
export type WorkspacesPoolUserId = string;
export type Limit50 = number;
export interface DescribeWorkspacesPoolSessionsRequest {
  PoolId: string;
  UserId?: string;
  Limit?: number;
  NextToken?: string;
}
export type AuthenticationType = "SAML" | (string & {});
export type SessionConnectionState =
  | "CONNECTED"
  | "NOT_CONNECTED"
  | (string & {});
export type SessionInstanceId = string;
export interface NetworkAccessConfiguration {
  EniPrivateIpAddress?: string;
  EniId?: string;
}
export interface WorkspacesPoolSession {
  AuthenticationType?: AuthenticationType;
  ConnectionState?: SessionConnectionState;
  SessionId: string;
  InstanceId?: string;
  PoolId: string;
  ExpirationTime?: Date;
  NetworkAccessConfiguration?: NetworkAccessConfiguration;
  StartTime?: Date;
  UserId: string;
}
export type WorkspacesPoolSessions = WorkspacesPoolSession[];
export interface DescribeWorkspacesPoolSessionsResult {
  Sessions?: WorkspacesPoolSession[];
  NextToken?: string;
}
export interface DisassociateConnectionAliasRequest {
  AliasId: string;
}
export interface DisassociateConnectionAliasResult {}
export interface DisassociateIpGroupsRequest {
  DirectoryId: string;
  GroupIds: string[];
}
export interface DisassociateIpGroupsResult {}
export interface DisassociateWorkspaceApplicationRequest {
  WorkspaceId: string;
  ApplicationId: string;
}
export interface DisassociateWorkspaceApplicationResult {
  Association?: WorkspaceResourceAssociation;
}
export interface GetAccountLinkRequest {
  LinkId?: string;
  LinkedAccountId?: string;
}
export interface GetAccountLinkResult {
  AccountLink?: AccountLink;
}
export type DefaultLogo = Uint8Array;
export interface DefaultImportClientBrandingAttributes {
  Logo?: Uint8Array;
  SupportEmail?: string;
  SupportLink?: string;
  ForgotPasswordLink?: string;
  LoginMessage?: { [key: string]: string | undefined };
}
export type IosLogo = Uint8Array;
export type Ios2XLogo = Uint8Array;
export type Ios3XLogo = Uint8Array;
export interface IosImportClientBrandingAttributes {
  Logo?: Uint8Array;
  Logo2x?: Uint8Array;
  Logo3x?: Uint8Array;
  SupportEmail?: string;
  SupportLink?: string;
  ForgotPasswordLink?: string;
  LoginMessage?: { [key: string]: string | undefined };
}
export interface ImportClientBrandingRequest {
  ResourceId: string;
  DeviceTypeWindows?: DefaultImportClientBrandingAttributes;
  DeviceTypeOsx?: DefaultImportClientBrandingAttributes;
  DeviceTypeAndroid?: DefaultImportClientBrandingAttributes;
  DeviceTypeIos?: IosImportClientBrandingAttributes;
  DeviceTypeLinux?: DefaultImportClientBrandingAttributes;
  DeviceTypeWeb?: DefaultImportClientBrandingAttributes;
}
export interface ImportClientBrandingResult {
  DeviceTypeWindows?: DefaultClientBrandingAttributes;
  DeviceTypeOsx?: DefaultClientBrandingAttributes;
  DeviceTypeAndroid?: DefaultClientBrandingAttributes;
  DeviceTypeIos?: IosClientBrandingAttributes;
  DeviceTypeLinux?: DefaultClientBrandingAttributes;
  DeviceTypeWeb?: DefaultClientBrandingAttributes;
}
export type ImageComputeType =
  | "BASE"
  | "GRAPHICS_G4DN"
  | "GRAPHICS_G6"
  | (string & {});
export type CustomImageProtocol = "PCOIP" | "DCV" | "BYOP" | (string & {});
export type Platform = "WINDOWS" | (string & {});
export type OSVersion = "Windows_10" | "Windows_11" | (string & {});
export interface ImportCustomWorkspaceImageRequest {
  ImageName: string;
  ImageDescription: string;
  ComputeType: ImageComputeType;
  Protocol: CustomImageProtocol;
  ImageSource: ImageSourceIdentifier;
  InfrastructureConfigurationArn: string;
  Platform: Platform;
  OsVersion: OSVersion;
  Tags?: Tag[];
}
export interface ImportCustomWorkspaceImageResult {
  ImageId?: string;
  State?: CustomWorkspaceImageImportState;
}
export type WorkspaceImageIngestionProcess =
  | "BYOL_REGULAR"
  | "BYOL_GRAPHICS"
  | "BYOL_GRAPHICSPRO"
  | "BYOL_GRAPHICS_G4DN"
  | "BYOL_REGULAR_WSP"
  | "BYOL_GRAPHICS_G4DN_WSP"
  | "BYOL_REGULAR_BYOP"
  | "BYOL_GRAPHICS_G4DN_BYOP"
  | (string & {});
export type Application =
  | "Microsoft_Office_2016"
  | "Microsoft_Office_2019"
  | (string & {});
export type ApplicationList = Application[];
export interface ImportWorkspaceImageRequest {
  Ec2ImageId: string;
  IngestionProcess: WorkspaceImageIngestionProcess;
  ImageName: string;
  ImageDescription: string;
  Tags?: Tag[];
  Applications?: Application[];
}
export interface ImportWorkspaceImageResult {
  ImageId?: string;
}
export type LinkStatusFilterList = AccountLinkStatusEnum[];
export interface ListAccountLinksRequest {
  LinkStatusFilter?: AccountLinkStatusEnum[];
  NextToken?: string;
  MaxResults?: number;
}
export type AccountLinkList = AccountLink[];
export interface ListAccountLinksResult {
  AccountLinks?: AccountLink[];
  NextToken?: string;
}
export type ManagementCidrRangeConstraint = string;
export type ManagementCidrRangeMaxResults = number;
export interface ListAvailableManagementCidrRangesRequest {
  ManagementCidrRangeConstraint: string;
  MaxResults?: number;
  NextToken?: string;
}
export type DedicatedTenancyCidrRangeList = string[];
export interface ListAvailableManagementCidrRangesResult {
  ManagementCidrRanges?: string[];
  NextToken?: string;
}
export interface MigrateWorkspaceRequest {
  SourceWorkspaceId: string;
  BundleId: string;
}
export interface MigrateWorkspaceResult {
  SourceWorkspaceId?: string;
  TargetWorkspaceId?: string;
}
export type DedicatedTenancySupportEnum = "ENABLED" | (string & {});
export interface ModifyAccountRequest {
  DedicatedTenancySupport?: DedicatedTenancySupportEnum;
  DedicatedTenancyManagementCidrRange?: string;
}
export interface ModifyAccountResult {
  Message?: string;
}
export type DeletableCertificateBasedAuthProperty =
  | "CERTIFICATE_BASED_AUTH_PROPERTIES_CERTIFICATE_AUTHORITY_ARN"
  | (string & {});
export type DeletableCertificateBasedAuthPropertiesList =
  DeletableCertificateBasedAuthProperty[];
export interface ModifyCertificateBasedAuthPropertiesRequest {
  ResourceId: string;
  CertificateBasedAuthProperties?: CertificateBasedAuthProperties;
  PropertiesToDelete?: DeletableCertificateBasedAuthProperty[];
}
export interface ModifyCertificateBasedAuthPropertiesResult {}
export interface ModifyClientPropertiesRequest {
  ResourceId: string;
  ClientProperties: ClientProperties;
}
export interface ModifyClientPropertiesResult {}
export interface ModifyEndpointEncryptionModeRequest {
  DirectoryId: string;
  EndpointEncryptionMode: EndpointEncryptionMode;
}
export interface ModifyEndpointEncryptionModeResponse {}
export type DeletableSamlProperty =
  | "SAML_PROPERTIES_USER_ACCESS_URL"
  | "SAML_PROPERTIES_RELAY_STATE_PARAMETER_NAME"
  | (string & {});
export type DeletableSamlPropertiesList = DeletableSamlProperty[];
export interface ModifySamlPropertiesRequest {
  ResourceId: string;
  SamlProperties?: SamlProperties;
  PropertiesToDelete?: DeletableSamlProperty[];
}
export interface ModifySamlPropertiesResult {}
export interface ModifySelfservicePermissionsRequest {
  ResourceId: string;
  SelfservicePermissions: SelfservicePermissions;
}
export interface ModifySelfservicePermissionsResult {}
export interface ModifyStreamingPropertiesRequest {
  ResourceId: string;
  StreamingProperties?: StreamingProperties;
}
export interface ModifyStreamingPropertiesResult {}
export interface ModifyWorkspaceAccessPropertiesRequest {
  ResourceId: string;
  WorkspaceAccessProperties: WorkspaceAccessProperties;
}
export interface ModifyWorkspaceAccessPropertiesResult {}
export interface WorkspaceCreationProperties {
  EnableInternetAccess?: boolean;
  DefaultOu?: string;
  CustomSecurityGroupId?: string;
  UserEnabledAsLocalAdministrator?: boolean;
  EnableMaintenanceMode?: boolean;
  InstanceIamRoleArn?: string;
}
export interface ModifyWorkspaceCreationPropertiesRequest {
  ResourceId: string;
  WorkspaceCreationProperties: WorkspaceCreationProperties;
}
export interface ModifyWorkspaceCreationPropertiesResult {}
export interface ModifyWorkspacePropertiesRequest {
  WorkspaceId: string;
  WorkspaceProperties?: WorkspaceProperties;
  DataReplication?: DataReplication;
}
export interface ModifyWorkspacePropertiesResult {}
export type TargetWorkspaceState =
  | "AVAILABLE"
  | "ADMIN_MAINTENANCE"
  | (string & {});
export interface ModifyWorkspaceStateRequest {
  WorkspaceId: string;
  WorkspaceState: TargetWorkspaceState;
}
export interface ModifyWorkspaceStateResult {}
export interface RebootRequest {
  WorkspaceId: string;
}
export type RebootWorkspaceRequests = RebootRequest[];
export interface RebootWorkspacesRequest {
  RebootWorkspaceRequests: RebootRequest[];
}
export interface FailedWorkspaceChangeRequest {
  WorkspaceId?: string;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type FailedRebootWorkspaceRequests = FailedWorkspaceChangeRequest[];
export interface RebootWorkspacesResult {
  FailedRequests?: FailedWorkspaceChangeRequest[];
}
export interface RebuildRequest {
  WorkspaceId: string;
}
export type RebuildWorkspaceRequests = RebuildRequest[];
export interface RebuildWorkspacesRequest {
  RebuildWorkspaceRequests: RebuildRequest[];
}
export type FailedRebuildWorkspaceRequests = FailedWorkspaceChangeRequest[];
export interface RebuildWorkspacesResult {
  FailedRequests?: FailedWorkspaceChangeRequest[];
}
export interface RegisterWorkspaceDirectoryRequest {
  DirectoryId?: string;
  SubnetIds?: string[];
  EnableSelfService?: boolean;
  Tenancy?: Tenancy;
  Tags?: Tag[];
  WorkspaceDirectoryName?: string;
  WorkspaceDirectoryDescription?: string;
  UserIdentityType?: UserIdentityType;
  IdcInstanceArn?: string;
  MicrosoftEntraConfig?: MicrosoftEntraConfig;
  WorkspaceType?: WorkspaceType;
  ActiveDirectoryConfig?: ActiveDirectoryConfig;
}
export interface RegisterWorkspaceDirectoryResult {
  DirectoryId?: string;
  State?: WorkspaceDirectoryState;
}
export interface RejectAccountLinkInvitationRequest {
  LinkId: string;
  ClientToken?: string;
}
export interface RejectAccountLinkInvitationResult {
  AccountLink?: AccountLink;
}
export interface RestoreWorkspaceRequest {
  WorkspaceId: string;
}
export interface RestoreWorkspaceResult {}
export type IpRevokedRuleList = string[];
export interface RevokeIpRulesRequest {
  GroupId: string;
  UserRules: string[];
}
export interface RevokeIpRulesResult {}
export interface StartRequest {
  WorkspaceId?: string;
}
export type StartWorkspaceRequests = StartRequest[];
export interface StartWorkspacesRequest {
  StartWorkspaceRequests: StartRequest[];
}
export type FailedStartWorkspaceRequests = FailedWorkspaceChangeRequest[];
export interface StartWorkspacesResult {
  FailedRequests?: FailedWorkspaceChangeRequest[];
}
export interface StartWorkspacesPoolRequest {
  PoolId: string;
}
export interface StartWorkspacesPoolResult {}
export interface StopRequest {
  WorkspaceId?: string;
}
export type StopWorkspaceRequests = StopRequest[];
export interface StopWorkspacesRequest {
  StopWorkspaceRequests: StopRequest[];
}
export type FailedStopWorkspaceRequests = FailedWorkspaceChangeRequest[];
export interface StopWorkspacesResult {
  FailedRequests?: FailedWorkspaceChangeRequest[];
}
export interface StopWorkspacesPoolRequest {
  PoolId: string;
}
export interface StopWorkspacesPoolResult {}
export interface TerminateRequest {
  WorkspaceId: string;
}
export type TerminateWorkspaceRequests = TerminateRequest[];
export interface TerminateWorkspacesRequest {
  TerminateWorkspaceRequests: TerminateRequest[];
}
export type FailedTerminateWorkspaceRequests = FailedWorkspaceChangeRequest[];
export interface TerminateWorkspacesResult {
  FailedRequests?: FailedWorkspaceChangeRequest[];
}
export interface TerminateWorkspacesPoolRequest {
  PoolId: string;
}
export interface TerminateWorkspacesPoolResult {}
export interface TerminateWorkspacesPoolSessionRequest {
  SessionId: string;
}
export interface TerminateWorkspacesPoolSessionResult {}
export interface UpdateConnectClientAddInRequest {
  AddInId: string;
  ResourceId: string;
  Name?: string;
  URL?: string;
}
export interface UpdateConnectClientAddInResult {}
export interface UpdateConnectionAliasPermissionRequest {
  AliasId: string;
  ConnectionAliasPermission: ConnectionAliasPermission;
}
export interface UpdateConnectionAliasPermissionResult {}
export interface UpdateRulesOfIpGroupRequest {
  GroupId: string;
  UserRules: IpRuleItem[];
}
export interface UpdateRulesOfIpGroupResult {}
export interface UpdateWorkspaceBundleRequest {
  BundleId?: string;
  ImageId?: string;
}
export interface UpdateWorkspaceBundleResult {}
export interface UpdateWorkspaceImagePermissionRequest {
  ImageId: string;
  AllowCopyImage: boolean;
  SharedAccountId: string;
}
export interface UpdateWorkspaceImagePermissionResult {}
export interface UpdateWorkspacesPoolRequest {
  PoolId: string;
  Description?: string;
  BundleId?: string;
  DirectoryId?: string;
  Capacity?: Capacity;
  ApplicationSettings?: ApplicationSettingsRequest;
  TimeoutSettings?: TimeoutSettings;
  RunningMode?: PoolsRunningMode;
}
export interface UpdateWorkspacesPoolResult {
  WorkspacesPool?: WorkspacesPool;
}
export type ExceptionMessage = string;
export type ExceptionErrorCode = string;
export type AcceptAccountLinkInvitationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Accepts the account link invitation.
 *
 * There's currently no unlinking capability after you accept the account linking invitation.
 */
export const acceptAccountLinkInvitation: API.OperationMethod<
  AcceptAccountLinkInvitationRequest,
  AcceptAccountLinkInvitationResult,
  AcceptAccountLinkInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { LinkId: 0, ClientToken: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptAccountLinkInvitation",
})) as any;

export type AssociateConnectionAliasError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceAssociatedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates the specified connection alias with the specified directory to enable
 * cross-Region redirection. For more information, see Cross-Region
 * Redirection for Amazon WorkSpaces.
 *
 * Before performing this operation, call
 * DescribeConnectionAliases to make sure that the current state of the
 * connection alias is `CREATED`.
 */
export const associateConnectionAlias: API.OperationMethod<
  AssociateConnectionAliasRequest,
  AssociateConnectionAliasResult,
  AssociateConnectionAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AliasId: 0, ResourceId: 0 } },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceAssociatedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateConnectionAlias",
})) as any;

export type AssociateIpGroupsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates the specified IP access control group with the specified directory.
 */
export const associateIpGroups: API.OperationMethod<
  AssociateIpGroupsRequest,
  AssociateIpGroupsResult,
  AssociateIpGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DirectoryId: 0, GroupIds: 0 } },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateIpGroups",
})) as any;

export type AssociateWorkspaceApplicationError =
  | AccessDeniedException
  | ApplicationNotSupportedException
  | ComputeNotCompatibleException
  | IncompatibleApplicationsException
  | InvalidParameterValuesException
  | OperatingSystemNotCompatibleException
  | OperationNotSupportedException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates the specified application to the specified WorkSpace.
 */
export const associateWorkspaceApplication: API.OperationMethod<
  AssociateWorkspaceApplicationRequest,
  AssociateWorkspaceApplicationResult,
  AssociateWorkspaceApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { WorkspaceId: 0, ApplicationId: 0 },
    output: { Association: o_WorkspaceResourceAssociation },
  },
  errors: [
    AccessDeniedException,
    ApplicationNotSupportedException,
    ComputeNotCompatibleException,
    IncompatibleApplicationsException,
    InvalidParameterValuesException,
    OperatingSystemNotCompatibleException,
    OperationNotSupportedException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateWorkspaceApplication",
})) as any;

export type AuthorizeIpRulesError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds one or more rules to the specified IP access control group.
 *
 * This action gives users permission to access their WorkSpaces from the CIDR address
 * ranges specified in the rules.
 */
export const authorizeIpRules: API.OperationMethod<
  AuthorizeIpRulesRequest,
  AuthorizeIpRulesResult,
  AuthorizeIpRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { GroupId: 0, UserRules: D.list(i_IpRuleItem) },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AuthorizeIpRules",
})) as any;

export type CopyWorkspaceImageError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | CommonErrors;
/**
 * Copies the specified image from the specified Region to the current Region. For more
 * information about copying images, see Copy a Custom WorkSpaces
 * Image.
 *
 * In the China (Ningxia) Region, you can copy images only within the same Region.
 *
 * In Amazon Web Services GovCloud (US), to copy images to and from other Regions, contact Amazon Web Services Support.
 *
 * Before copying a shared image, be sure to verify that it has been shared from the
 * correct Amazon Web Services account. To determine if an image has been shared and to see
 * the ID of the Amazon Web Services account that owns an image, use the DescribeWorkSpaceImages and DescribeWorkspaceImagePermissions API operations.
 */
export const copyWorkspaceImage: API.OperationMethod<
  CopyWorkspaceImageRequest,
  CopyWorkspaceImageResult,
  CopyWorkspaceImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      SourceImageId: 0,
      SourceRegion: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ResourceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyWorkspaceImage",
})) as any;

export type CreateAccountLinkInvitationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Creates the account link invitation.
 */
export const createAccountLinkInvitation: API.OperationMethod<
  CreateAccountLinkInvitationRequest,
  CreateAccountLinkInvitationResult,
  CreateAccountLinkInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TargetAccountId: 0, ClientToken: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccountLinkInvitation",
})) as any;

export type CreateConnectClientAddInError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceAlreadyExistsException
  | ResourceCreationFailedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a client-add-in for Connect Customer within a directory. You can create only
 * one Connect Customer client add-in within a directory.
 *
 * This client add-in allows WorkSpaces users to seamlessly connect to Connect Customer.
 */
export const createConnectClientAddIn: API.OperationMethod<
  CreateConnectClientAddInRequest,
  CreateConnectClientAddInResult,
  CreateConnectClientAddInError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceId: 0, Name: 0, URL: 0 } },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceAlreadyExistsException,
    ResourceCreationFailedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnectClientAddIn",
})) as any;

export type CreateConnectionAliasError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | CommonErrors;
/**
 * Creates the specified connection alias for use with cross-Region redirection. For more
 * information, see Cross-Region
 * Redirection for Amazon WorkSpaces.
 */
export const createConnectionAlias: API.OperationMethod<
  CreateConnectionAliasRequest,
  CreateConnectionAliasResult,
  CreateConnectionAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ConnectionString: 0, Tags: D.list(i_Tag) },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnectionAlias",
})) as any;

export type CreateIpGroupError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceAlreadyExistsException
  | ResourceCreationFailedException
  | ResourceLimitExceededException
  | CommonErrors;
/**
 * Creates an IP access control group.
 *
 * An IP access control group provides you with the ability to control the IP addresses
 * from which users are allowed to access their WorkSpaces. To specify the CIDR address
 * ranges, add rules to your IP access control group and then associate the group with your
 * directory. You can add rules when you create the group or at any time using AuthorizeIpRules.
 *
 * There is a default IP access control group associated with your directory. If you don't
 * associate an IP access control group with your directory, the default group is used. The
 * default group includes a default rule that allows users to access their WorkSpaces from
 * anywhere. You cannot modify the default IP access control group for your directory.
 */
export const createIpGroup: API.OperationMethod<
  CreateIpGroupRequest,
  CreateIpGroupResult,
  CreateIpGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      GroupName: 0,
      GroupDesc: 0,
      UserRules: D.list(i_IpRuleItem),
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceAlreadyExistsException,
    ResourceCreationFailedException,
    ResourceLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIpGroup",
})) as any;

export type CreateStandbyWorkspacesError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a standby WorkSpace in a secondary Region.
 */
export const createStandbyWorkspaces: API.OperationMethod<
  CreateStandbyWorkspacesRequest,
  CreateStandbyWorkspacesResult,
  CreateStandbyWorkspacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      PrimaryRegion: 0,
      StandbyWorkspaces: D.list({
        PrimaryWorkspaceId: 0,
        VolumeEncryptionKey: 0,
        DirectoryId: 0,
        Tags: D.list(i_Tag),
        DataReplication: 0,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStandbyWorkspaces",
})) as any;

export type CreateTagsError =
  | InvalidParameterValuesException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates the specified tags for the specified WorkSpaces resource.
 */
export const createTags: API.OperationMethod<
  CreateTagsRequest,
  CreateTagsResult,
  CreateTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceId: 0, Tags: D.list(i_Tag) } },
  errors: [
    InvalidParameterValuesException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTags",
})) as any;

export type CreateUpdatedWorkspaceImageError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a new updated WorkSpace image based on the specified source image. The new
 * updated WorkSpace image has the latest drivers and other updates required by the
 * Amazon WorkSpaces components.
 *
 * To determine which WorkSpace images need to be updated with the latest Amazon WorkSpaces
 * requirements, use
 * DescribeWorkspaceImages.
 *
 * - Only Windows 10, Windows Server 2016, and Windows Server 2019 WorkSpace images
 * can be programmatically updated at this time.
 *
 * - Microsoft Windows updates and other application updates are not included in the
 * update process.
 *
 * - The source WorkSpace image is not deleted. You can delete the source image
 * after you've verified your new updated image and created a new bundle.
 */
export const createUpdatedWorkspaceImage: API.OperationMethod<
  CreateUpdatedWorkspaceImageRequest,
  CreateUpdatedWorkspaceImageResult,
  CreateUpdatedWorkspaceImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, Description: 0, SourceImageId: 0, Tags: D.list(i_Tag) },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUpdatedWorkspaceImage",
})) as any;

export type CreateWorkspaceBundleError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | CommonErrors;
/**
 * Creates the specified WorkSpace bundle. For more information about creating WorkSpace bundles, see
 *
 * Create a Custom WorkSpaces Image and Bundle.
 */
export const createWorkspaceBundle: API.OperationMethod<
  CreateWorkspaceBundleRequest,
  CreateWorkspaceBundleResult,
  CreateWorkspaceBundleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      BundleName: 0,
      BundleDescription: 0,
      ImageId: 0,
      ComputeType: { Name: 0 },
      UserStorage: { Capacity: 0 },
      RootStorage: { Capacity: 0 },
      Tags: D.list(i_Tag),
    },
    output: { WorkspaceBundle: o_WorkspaceBundle },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ResourceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkspaceBundle",
})) as any;

export type CreateWorkspaceImageError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a new WorkSpace image from an existing WorkSpace.
 */
export const createWorkspaceImage: API.OperationMethod<
  CreateWorkspaceImageRequest,
  CreateWorkspaceImageResult,
  CreateWorkspaceImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, Description: 0, WorkspaceId: 0, Tags: D.list(i_Tag) },
    output: { Created: D.ts },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkspaceImage",
})) as any;

export type CreateWorkspacesError =
  | InvalidParameterValuesException
  | ResourceLimitExceededException
  | CommonErrors;
/**
 * Creates one or more WorkSpaces.
 *
 * This operation is asynchronous and returns before the WorkSpaces are created.
 *
 * - The `MANUAL` running mode value is only supported by Amazon WorkSpaces
 * Core. Contact your account team to be allow-listed to use this value. For more
 * information, see Amazon WorkSpaces
 * Core.
 *
 * - You don't need to specify the `PCOIP` protocol for Linux bundles
 * because `DCV` (formerly WSP) is the default protocol for those bundles.
 *
 * - User-decoupled WorkSpaces are only supported by Amazon WorkSpaces
 * Core.
 *
 * - Review your running mode to ensure you are using one that is optimal for your needs and budget.
 * For more information on switching running modes, see
 *
 * Can I switch between hourly and monthly billing?
 */
export const createWorkspaces: API.OperationMethod<
  CreateWorkspacesRequest,
  CreateWorkspacesResult,
  CreateWorkspacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Workspaces: D.list({
        DirectoryId: 0,
        UserName: 0,
        BundleId: 0,
        VolumeEncryptionKey: 0,
        UserVolumeEncryptionEnabled: 0,
        RootVolumeEncryptionEnabled: 0,
        WorkspaceProperties: i_WorkspaceProperties,
        Tags: D.list(i_Tag),
        WorkspaceName: 0,
        Ipv6Address: 0,
      }),
    },
    output: { PendingRequests: D.list(o_Workspace) },
  },
  errors: [InvalidParameterValuesException, ResourceLimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkspaces",
})) as any;

export type CreateWorkspacesPoolError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * End of support notice: On December 31, 2027, Amazon Web Services will end support for Amazon WorkSpaces Pools. After December 31, 2027,
 * you will no longer be able to access the Amazon WorkSpaces Pools console or Amazon WorkSpaces Pools resources. For more information, see
 * Amazon WorkSpaces Pools end of support.
 *
 * Creates a pool of WorkSpaces.
 */
export const createWorkspacesPool: API.OperationMethod<
  CreateWorkspacesPoolRequest,
  CreateWorkspacesPoolResult,
  CreateWorkspacesPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      PoolName: 0,
      Description: 0,
      BundleId: 0,
      DirectoryId: 0,
      Capacity: i_Capacity,
      Tags: D.list(i_Tag),
      ApplicationSettings: i_ApplicationSettingsRequest,
      TimeoutSettings: i_TimeoutSettings,
      RunningMode: 0,
    },
    output: { WorkspacesPool: o_WorkspacesPool },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkspacesPool",
})) as any;

export type DeleteAccountLinkInvitationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the account link invitation.
 */
export const deleteAccountLinkInvitation: API.OperationMethod<
  DeleteAccountLinkInvitationRequest,
  DeleteAccountLinkInvitationResult,
  DeleteAccountLinkInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { LinkId: 0, ClientToken: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccountLinkInvitation",
})) as any;

export type DeleteClientBrandingError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes customized client branding. Client branding allows you to customize your
 * WorkSpace's client login portal. You can tailor your login portal company logo, the support
 * email address, support link, link to reset password, and a custom message for users trying
 * to sign in.
 *
 * After you delete your customized client branding, your login portal reverts to the
 * default client branding.
 */
export const deleteClientBranding: API.OperationMethod<
  DeleteClientBrandingRequest,
  DeleteClientBrandingResult,
  DeleteClientBrandingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceId: 0, Platforms: 0 } },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteClientBranding",
})) as any;

export type DeleteConnectClientAddInError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a client-add-in for Connect Customer that is configured within a
 * directory.
 */
export const deleteConnectClientAddIn: API.OperationMethod<
  DeleteConnectClientAddInRequest,
  DeleteConnectClientAddInResult,
  DeleteConnectClientAddInError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AddInId: 0, ResourceId: 0 } },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnectClientAddIn",
})) as any;

export type DeleteConnectionAliasError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceAssociatedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified connection alias. For more information, see
 * Cross-Region Redirection for Amazon WorkSpaces.
 *
 * If you will no longer be using a fully qualified domain name
 * (FQDN) as the registration code for your WorkSpaces users, you must take certain
 * precautions to prevent potential security issues. For more information,
 * see Security Considerations if You Stop Using Cross-Region Redirection.
 *
 * To delete a connection alias that has been shared, the shared account must first
 * disassociate the connection alias from any directories it has been associated with. Then
 * you must unshare the connection alias from the account it has been shared with. You can
 * delete a connection alias only after it is no longer shared with any accounts or
 * associated with any directories.
 */
export const deleteConnectionAlias: API.OperationMethod<
  DeleteConnectionAliasRequest,
  DeleteConnectionAliasResult,
  DeleteConnectionAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AliasId: 0 } },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceAssociatedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnectionAlias",
})) as any;

export type DeleteIpGroupError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceAssociatedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified IP access control group.
 *
 * You cannot delete an IP access control group that is associated with a directory.
 */
export const deleteIpGroup: API.OperationMethod<
  DeleteIpGroupRequest,
  DeleteIpGroupResult,
  DeleteIpGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { GroupId: 0 } },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceAssociatedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIpGroup",
})) as any;

export type DeleteTagsError =
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified tags from the specified WorkSpaces resource.
 */
export const deleteTags: API.OperationMethod<
  DeleteTagsRequest,
  DeleteTagsResult,
  DeleteTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceId: 0, TagKeys: 0 } },
  errors: [InvalidParameterValuesException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTags",
})) as any;

export type DeleteWorkspaceBundleError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceAssociatedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified WorkSpace bundle. For more information about deleting WorkSpace bundles, see
 *
 * Delete a Custom WorkSpaces Bundle or Image.
 */
export const deleteWorkspaceBundle: API.OperationMethod<
  DeleteWorkspaceBundleRequest,
  DeleteWorkspaceBundleResult,
  DeleteWorkspaceBundleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { BundleId: 0 } },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceAssociatedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkspaceBundle",
})) as any;

export type DeleteWorkspaceImageError =
  | AccessDeniedException
  | InvalidResourceStateException
  | ResourceAssociatedException
  | CommonErrors;
/**
 * Deletes the specified image from your account. To delete an image, you must first delete
 * any bundles that are associated with the image and unshare the image if it is shared with
 * other accounts.
 */
export const deleteWorkspaceImage: API.OperationMethod<
  DeleteWorkspaceImageRequest,
  DeleteWorkspaceImageResult,
  DeleteWorkspaceImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ImageId: 0 } },
  errors: [
    AccessDeniedException,
    InvalidResourceStateException,
    ResourceAssociatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkspaceImage",
})) as any;

export type DeployWorkspaceApplicationsError =
  | AccessDeniedException
  | IncompatibleApplicationsException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deploys associated applications to the specified WorkSpace
 */
export const deployWorkspaceApplications: API.OperationMethod<
  DeployWorkspaceApplicationsRequest,
  DeployWorkspaceApplicationsResult,
  DeployWorkspaceApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { WorkspaceId: 0, Force: 0 },
    output: {
      Deployment: { Associations: D.list(o_WorkspaceResourceAssociation) },
    },
  },
  errors: [
    AccessDeniedException,
    IncompatibleApplicationsException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeployWorkspaceApplications",
})) as any;

export type DeregisterWorkspaceDirectoryError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deregisters the specified directory. This operation is asynchronous and returns before
 * the WorkSpace directory is deregistered. If any WorkSpaces are registered to this
 * directory, you must remove them before you can deregister the directory.
 *
 * Simple AD and AD Connector are made available to you free of charge to use with
 * WorkSpaces. If there are no WorkSpaces being used with your Simple AD or AD Connector
 * directory for 30 consecutive days, this directory will be automatically deregistered for
 * use with Amazon WorkSpaces, and you will be charged for this directory as per the Directory Service pricing
 * terms.
 *
 * To delete empty directories, see Delete the
 * Directory for Your WorkSpaces. If you delete your Simple AD or AD Connector
 * directory, you can always create a new one when you want to start using WorkSpaces
 * again.
 */
export const deregisterWorkspaceDirectory: API.OperationMethod<
  DeregisterWorkspaceDirectoryRequest,
  DeregisterWorkspaceDirectoryResult,
  DeregisterWorkspaceDirectoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DirectoryId: 0 } },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterWorkspaceDirectory",
})) as any;

export type DescribeAccountError = AccessDeniedException | CommonErrors;
/**
 * Retrieves a list that describes the configuration of Bring Your Own License (BYOL) for
 * the specified account.
 */
export const describeAccount: API.OperationMethod<
  DescribeAccountRequest,
  DescribeAccountResult,
  DescribeAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [AccessDeniedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccount",
})) as any;

export type DescribeAccountModificationsError =
  | AccessDeniedException
  | CommonErrors;
/**
 * Retrieves a list that describes modifications to the configuration of Bring Your Own
 * License (BYOL) for the specified account.
 */
export const describeAccountModifications: API.OperationMethod<
  DescribeAccountModificationsRequest,
  DescribeAccountModificationsResult,
  DescribeAccountModificationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0 },
    output: { AccountModifications: D.list({ StartTime: D.ts }) },
  },
  errors: [AccessDeniedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountModifications",
})) as any;

export type DescribeApplicationAssociationsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the associations between the application and the specified associated resources.
 */
export const describeApplicationAssociations: API.PaginatedOperationMethod<
  DescribeApplicationAssociationsRequest,
  DescribeApplicationAssociationsResult,
  DescribeApplicationAssociationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      MaxResults: 0,
      NextToken: 0,
      ApplicationId: 0,
      AssociatedResourceTypes: 0,
    },
    output: { Associations: D.list({ Created: D.ts, LastUpdatedTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplicationAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeApplicationsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the specified applications by filtering based on their compute types, license availability, operating systems, and owners.
 */
export const describeApplications: API.PaginatedOperationMethod<
  DescribeApplicationsRequest,
  DescribeApplicationsResult,
  DescribeApplicationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationIds: 0,
      ComputeTypeNames: 0,
      LicenseType: 0,
      OperatingSystemNames: 0,
      Owner: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { Applications: D.list({ Created: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplications",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeBundleAssociationsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the associations between the applications and the specified bundle.
 */
export const describeBundleAssociations: API.OperationMethod<
  DescribeBundleAssociationsRequest,
  DescribeBundleAssociationsResult,
  DescribeBundleAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { BundleId: 0, AssociatedResourceTypes: 0 },
    output: { Associations: D.list({ Created: D.ts, LastUpdatedTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBundleAssociations",
})) as any;

export type DescribeClientBrandingError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the specified client branding. Client branding allows you to customize the log
 * in page of various device types for your users. You can add your company logo, the support
 * email address, support link, link to reset password, and a custom message for users trying
 * to sign in.
 *
 * Only device types that have branding information configured will be shown in the
 * response.
 */
export const describeClientBranding: API.OperationMethod<
  DescribeClientBrandingRequest,
  DescribeClientBrandingResult,
  DescribeClientBrandingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceId: 0 } },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClientBranding",
})) as any;

export type DescribeClientPropertiesError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list that describes one or more specified Amazon WorkSpaces clients.
 */
export const describeClientProperties: API.OperationMethod<
  DescribeClientPropertiesRequest,
  DescribeClientPropertiesResult,
  DescribeClientPropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceIds: 0 } },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClientProperties",
})) as any;

export type DescribeConnectClientAddInsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list of Connect Customer client add-ins that have been created.
 */
export const describeConnectClientAddIns: API.OperationMethod<
  DescribeConnectClientAddInsRequest,
  DescribeConnectClientAddInsResult,
  DescribeConnectClientAddInsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceId: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnectClientAddIns",
})) as any;

export type DescribeConnectionAliasesError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | CommonErrors;
/**
 * Retrieves a list that describes the connection aliases used for cross-Region
 * redirection. For more information, see Cross-Region
 * Redirection for Amazon WorkSpaces.
 */
export const describeConnectionAliases: API.OperationMethod<
  DescribeConnectionAliasesRequest,
  DescribeConnectionAliasesResult,
  DescribeConnectionAliasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AliasIds: 0, ResourceId: 0, Limit: 0, NextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnectionAliases",
})) as any;

export type DescribeConnectionAliasPermissionsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the permissions that the owner of a connection alias has granted to another
 * Amazon Web Services account for the specified connection alias. For more information, see
 * Cross-Region
 * Redirection for Amazon WorkSpaces.
 */
export const describeConnectionAliasPermissions: API.OperationMethod<
  DescribeConnectionAliasPermissionsRequest,
  DescribeConnectionAliasPermissionsResult,
  DescribeConnectionAliasPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AliasId: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnectionAliasPermissions",
})) as any;

export type DescribeCustomWorkspaceImageImportError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves information about a WorkSpace BYOL image being imported via ImportCustomWorkspaceImage.
 */
export const describeCustomWorkspaceImageImport: API.OperationMethod<
  DescribeCustomWorkspaceImageImportRequest,
  DescribeCustomWorkspaceImageImportResult,
  DescribeCustomWorkspaceImageImportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ImageId: 0 },
    output: { Created: D.ts, LastUpdatedTime: D.ts },
  },
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCustomWorkspaceImageImport",
})) as any;

export type DescribeImageAssociationsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the associations between the applications and the specified image.
 */
export const describeImageAssociations: API.OperationMethod<
  DescribeImageAssociationsRequest,
  DescribeImageAssociationsResult,
  DescribeImageAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ImageId: 0, AssociatedResourceTypes: 0 },
    output: { Associations: D.list({ Created: D.ts, LastUpdatedTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImageAssociations",
})) as any;

export type DescribeIpGroupsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | CommonErrors;
/**
 * Describes one or more of your IP access control groups.
 */
export const describeIpGroups: API.OperationMethod<
  DescribeIpGroupsRequest,
  DescribeIpGroupsResult,
  DescribeIpGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { GroupIds: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [AccessDeniedException, InvalidParameterValuesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIpGroups",
})) as any;

export type DescribeTagsError = ResourceNotFoundException | CommonErrors;
/**
 * Describes the specified tags for the specified WorkSpaces resource.
 */
export const describeTags: API.OperationMethod<
  DescribeTagsRequest,
  DescribeTagsResult,
  DescribeTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceId: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTags",
})) as any;

export type DescribeWorkspaceAssociationsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the associations betweens applications and the specified WorkSpace.
 */
export const describeWorkspaceAssociations: API.OperationMethod<
  DescribeWorkspaceAssociationsRequest,
  DescribeWorkspaceAssociationsResult,
  DescribeWorkspaceAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { WorkspaceId: 0, AssociatedResourceTypes: 0 },
    output: { Associations: D.list(o_WorkspaceResourceAssociation) },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspaceAssociations",
})) as any;

export type DescribeWorkspaceBundlesError =
  | InvalidParameterValuesException
  | CommonErrors;
/**
 * Retrieves a list that describes the available WorkSpace bundles.
 *
 * You can filter the results using either bundle ID or owner, but not both.
 */
export const describeWorkspaceBundles: API.PaginatedOperationMethod<
  DescribeWorkspaceBundlesRequest,
  DescribeWorkspaceBundlesResult,
  DescribeWorkspaceBundlesError,
  Credentials | HttpClient.HttpClient,
  WorkspaceBundle
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { BundleIds: 0, Owner: 0, NextToken: 0 },
    output: { Bundles: D.list(o_WorkspaceBundle) },
  },
  errors: [InvalidParameterValuesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspaceBundles",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Bundles",
  } as const,
})) as any;

export type DescribeWorkspaceDirectoriesError =
  | InvalidParameterValuesException
  | CommonErrors;
/**
 * Describes the available directories that are registered with Amazon WorkSpaces.
 */
export const describeWorkspaceDirectories: API.PaginatedOperationMethod<
  DescribeWorkspaceDirectoriesRequest,
  DescribeWorkspaceDirectoriesResult,
  DescribeWorkspaceDirectoriesError,
  Credentials | HttpClient.HttpClient,
  WorkspaceDirectory
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      DirectoryIds: 0,
      WorkspaceDirectoryNames: 0,
      Limit: 0,
      NextToken: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
    },
  },
  errors: [InvalidParameterValuesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspaceDirectories",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Directories",
  } as const,
})) as any;

export type DescribeWorkspaceImagePermissionsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the permissions that the owner of an image has granted to other Amazon Web Services accounts for an image.
 */
export const describeWorkspaceImagePermissions: API.OperationMethod<
  DescribeWorkspaceImagePermissionsRequest,
  DescribeWorkspaceImagePermissionsResult,
  DescribeWorkspaceImagePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ImageId: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspaceImagePermissions",
})) as any;

export type DescribeWorkspaceImagesError = AccessDeniedException | CommonErrors;
/**
 * Retrieves a list that describes one or more specified images, if the image identifiers
 * are provided. Otherwise, all images in the account are described.
 */
export const describeWorkspaceImages: API.OperationMethod<
  DescribeWorkspaceImagesRequest,
  DescribeWorkspaceImagesResult,
  DescribeWorkspaceImagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ImageIds: 0, ImageType: 0, NextToken: 0, MaxResults: 0 },
    output: { Images: D.list({ Created: D.ts }) },
  },
  errors: [AccessDeniedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspaceImages",
})) as any;

export type DescribeWorkspacesError =
  | InvalidParameterValuesException
  | ResourceUnavailableException
  | CommonErrors;
/**
 * Describes the specified WorkSpaces.
 *
 * You can filter the results by using the bundle identifier, directory identifier, or
 * owner, but you can specify only one filter at a time.
 */
export const describeWorkspaces: API.PaginatedOperationMethod<
  DescribeWorkspacesRequest,
  DescribeWorkspacesResult,
  DescribeWorkspacesError,
  Credentials | HttpClient.HttpClient,
  Workspace
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      WorkspaceIds: 0,
      DirectoryId: 0,
      UserName: 0,
      BundleId: 0,
      Limit: 0,
      NextToken: 0,
      WorkspaceName: 0,
    },
    output: { Workspaces: D.list(o_Workspace) },
  },
  errors: [InvalidParameterValuesException, ResourceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspaces",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Workspaces",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeWorkspacesConnectionStatusError =
  | InvalidParameterValuesException
  | CommonErrors;
/**
 * Describes the connection status of the specified WorkSpaces.
 */
export const describeWorkspacesConnectionStatus: API.OperationMethod<
  DescribeWorkspacesConnectionStatusRequest,
  DescribeWorkspacesConnectionStatusResult,
  DescribeWorkspacesConnectionStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { WorkspaceIds: 0, NextToken: 0 },
    output: {
      WorkspacesConnectionStatus: D.list({
        ConnectionStateCheckTimestamp: D.ts,
        LastKnownUserConnectionTimestamp: D.ts,
      }),
    },
  },
  errors: [InvalidParameterValuesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspacesConnectionStatus",
})) as any;

export type DescribeWorkspaceSnapshotsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the snapshots for the specified WorkSpace.
 */
export const describeWorkspaceSnapshots: API.OperationMethod<
  DescribeWorkspaceSnapshotsRequest,
  DescribeWorkspaceSnapshotsResult,
  DescribeWorkspaceSnapshotsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { WorkspaceId: 0 },
    output: {
      RebuildSnapshots: D.list(o_Snapshot),
      RestoreSnapshots: D.list(o_Snapshot),
    },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspaceSnapshots",
})) as any;

export type DescribeWorkspacesPoolsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * End of support notice: On December 31, 2027, Amazon Web Services will end support for Amazon WorkSpaces Pools. After December 31, 2027,
 * you will no longer be able to access the Amazon WorkSpaces Pools console or Amazon WorkSpaces Pools resources. For more information, see
 * Amazon WorkSpaces Pools end of support.
 *
 * Describes the specified WorkSpaces Pools.
 */
export const describeWorkspacesPools: API.OperationMethod<
  DescribeWorkspacesPoolsRequest,
  DescribeWorkspacesPoolsResult,
  DescribeWorkspacesPoolsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      PoolIds: 0,
      Filters: D.list({ Name: 0, Values: 0, Operator: 0 }),
      Limit: 0,
      NextToken: 0,
    },
    output: { WorkspacesPools: D.list(o_WorkspacesPool) },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspacesPools",
})) as any;

export type DescribeWorkspacesPoolSessionsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * End of support notice: On December 31, 2027, Amazon Web Services will end support for Amazon WorkSpaces Pools. After December 31, 2027,
 * you will no longer be able to access the Amazon WorkSpaces Pools console or Amazon WorkSpaces Pools resources. For more information, see
 * Amazon WorkSpaces Pools end of support.
 *
 * Retrieves a list that describes the streaming sessions for a specified pool.
 */
export const describeWorkspacesPoolSessions: API.OperationMethod<
  DescribeWorkspacesPoolSessionsRequest,
  DescribeWorkspacesPoolSessionsResult,
  DescribeWorkspacesPoolSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { PoolId: 0, UserId: 0, Limit: 0, NextToken: 0 },
    output: { Sessions: D.list({ ExpirationTime: D.ts, StartTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspacesPoolSessions",
})) as any;

export type DisassociateConnectionAliasError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates a connection alias from a directory. Disassociating a connection alias
 * disables cross-Region redirection between two directories in different Regions. For more
 * information, see Cross-Region
 * Redirection for Amazon WorkSpaces.
 *
 * Before performing this operation, call
 * DescribeConnectionAliases to make sure that the current state of the
 * connection alias is `CREATED`.
 */
export const disassociateConnectionAlias: API.OperationMethod<
  DisassociateConnectionAliasRequest,
  DisassociateConnectionAliasResult,
  DisassociateConnectionAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AliasId: 0 } },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateConnectionAlias",
})) as any;

export type DisassociateIpGroupsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates the specified IP access control group from the specified directory.
 */
export const disassociateIpGroups: API.OperationMethod<
  DisassociateIpGroupsRequest,
  DisassociateIpGroupsResult,
  DisassociateIpGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DirectoryId: 0, GroupIds: 0 } },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateIpGroups",
})) as any;

export type DisassociateWorkspaceApplicationError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates the specified application from a WorkSpace.
 */
export const disassociateWorkspaceApplication: API.OperationMethod<
  DisassociateWorkspaceApplicationRequest,
  DisassociateWorkspaceApplicationResult,
  DisassociateWorkspaceApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { WorkspaceId: 0, ApplicationId: 0 },
    output: { Association: o_WorkspaceResourceAssociation },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateWorkspaceApplication",
})) as any;

export type GetAccountLinkError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves account link information.
 */
export const getAccountLink: API.OperationMethod<
  GetAccountLinkRequest,
  GetAccountLinkResult,
  GetAccountLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { LinkId: 0, LinkedAccountId: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountLink",
})) as any;

export type ImportClientBrandingError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Imports client branding. Client branding allows you to customize your WorkSpace's client
 * login portal. You can tailor your login portal company logo, the support email address,
 * support link, link to reset password, and a custom message for users trying to sign
 * in.
 *
 * After you import client branding, the default branding experience for the specified
 * platform type is replaced with the imported experience
 *
 * - You must specify at least one platform type when importing client
 * branding.
 *
 * - You can import up to 6 MB of data with each request. If your request exceeds
 * this limit, you can import client branding for different platform types using
 * separate requests.
 *
 * - In each platform type, the `SupportEmail` and
 * `SupportLink` parameters are mutually exclusive. You can specify
 * only one parameter for each platform type, but not both.
 *
 * - Imported data can take up to a minute to appear in the WorkSpaces
 * client.
 */
export const importClientBranding: API.OperationMethod<
  ImportClientBrandingRequest,
  ImportClientBrandingResult,
  ImportClientBrandingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceId: 0,
      DeviceTypeWindows: i_DefaultImportClientBrandingAttributes,
      DeviceTypeOsx: i_DefaultImportClientBrandingAttributes,
      DeviceTypeAndroid: i_DefaultImportClientBrandingAttributes,
      DeviceTypeIos: {
        Logo: 0,
        Logo2x: 0,
        Logo3x: 0,
        SupportEmail: 0,
        SupportLink: 0,
        ForgotPasswordLink: 0,
        LoginMessage: 0,
      },
      DeviceTypeLinux: i_DefaultImportClientBrandingAttributes,
      DeviceTypeWeb: i_DefaultImportClientBrandingAttributes,
    },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportClientBranding",
})) as any;

export type ImportCustomWorkspaceImageError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Imports the specified Windows 10 or 11 Bring Your Own License (BYOL)
 * image into Amazon WorkSpaces using EC2 Image Builder. The image must be an already licensed image that is
 * in your Amazon Web Services account, and you must own the image. For more information about
 * creating BYOL images, see Bring Your Own Windows
 * Desktop Licenses.
 */
export const importCustomWorkspaceImage: API.OperationMethod<
  ImportCustomWorkspaceImageRequest,
  ImportCustomWorkspaceImageResult,
  ImportCustomWorkspaceImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ImageName: 0,
      ImageDescription: 0,
      ComputeType: 0,
      Protocol: 0,
      ImageSource: {
        Ec2ImportTaskId: 0,
        ImageBuildVersionArn: 0,
        Ec2ImageId: 0,
      },
      InfrastructureConfigurationArn: 0,
      Platform: 0,
      OsVersion: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportCustomWorkspaceImage",
})) as any;

export type ImportWorkspaceImageError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Imports the specified Windows 10 or 11 Bring Your Own License (BYOL)
 * image into Amazon WorkSpaces. The image must be an already licensed Amazon EC2 image that is
 * in your Amazon Web Services account, and you must own the image. For more information about
 * creating BYOL images, see Bring Your Own Windows
 * Desktop Licenses.
 */
export const importWorkspaceImage: API.OperationMethod<
  ImportWorkspaceImageRequest,
  ImportWorkspaceImageResult,
  ImportWorkspaceImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Ec2ImageId: 0,
      IngestionProcess: 0,
      ImageName: 0,
      ImageDescription: 0,
      Tags: D.list(i_Tag),
      Applications: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportWorkspaceImage",
})) as any;

export type ListAccountLinksError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists all account links.
 */
export const listAccountLinks: API.PaginatedOperationMethod<
  ListAccountLinksRequest,
  ListAccountLinksResult,
  ListAccountLinksError,
  Credentials | HttpClient.HttpClient,
  AccountLink
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { LinkStatusFilter: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccountLinks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AccountLinks",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAvailableManagementCidrRangesError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | CommonErrors;
/**
 * Retrieves a list of IP address ranges, specified as IPv4 CIDR blocks, that you can use
 * for the network management interface when you enable Bring Your Own License (BYOL).
 *
 * This operation can be run only by Amazon Web Services accounts that are enabled for BYOL.
 * If your account isn't enabled for BYOL, you'll receive an
 * `AccessDeniedException` error.
 *
 * The management network interface is connected to a secure Amazon WorkSpaces management
 * network. It is used for interactive streaming of the WorkSpace desktop to Amazon WorkSpaces
 * clients, and to allow Amazon WorkSpaces to manage the WorkSpace.
 */
export const listAvailableManagementCidrRanges: API.OperationMethod<
  ListAvailableManagementCidrRangesRequest,
  ListAvailableManagementCidrRangesResult,
  ListAvailableManagementCidrRangesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ManagementCidrRangeConstraint: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [AccessDeniedException, InvalidParameterValuesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAvailableManagementCidrRanges",
})) as any;

export type MigrateWorkspaceError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationInProgressException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | CommonErrors;
/**
 * Migrates a WorkSpace from one operating system or bundle type to another, while
 * retaining the data on the user volume.
 *
 * The migration process recreates the WorkSpace by using a new root volume from the target
 * bundle image and the user volume from the last available snapshot of the original
 * WorkSpace. During migration, the original `D:\Users\%USERNAME%` user profile
 * folder is renamed to `D:\Users\%USERNAME%MMddyyTHHmmss%.NotMigrated`. A new
 * `D:\Users\%USERNAME%\` folder is generated by the new OS. Certain files in
 * the old user profile are moved to the new user profile.
 *
 * For available migration scenarios, details about what happens during migration, and best
 * practices, see Migrate a
 * WorkSpace.
 *
 * If the source WorkSpace has nested virtualization enabled and the target bundle does
 * not support nested virtualization, the migration fails.
 */
export const migrateWorkspace: API.OperationMethod<
  MigrateWorkspaceRequest,
  MigrateWorkspaceResult,
  MigrateWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SourceWorkspaceId: 0, BundleId: 0 } },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationInProgressException,
    OperationNotSupportedException,
    ResourceNotFoundException,
    ResourceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "MigrateWorkspace",
})) as any;

export type ModifyAccountError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | CommonErrors;
/**
 * Modifies the configuration of Bring Your Own License (BYOL) for the specified
 * account.
 */
export const modifyAccount: API.OperationMethod<
  ModifyAccountRequest,
  ModifyAccountResult,
  ModifyAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DedicatedTenancySupport: 0,
      DedicatedTenancyManagementCidrRange: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    ResourceNotFoundException,
    ResourceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyAccount",
})) as any;

export type ModifyCertificateBasedAuthPropertiesError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Modifies the properties of the certificate-based authentication you want
 * to use with your WorkSpaces.
 */
export const modifyCertificateBasedAuthProperties: API.OperationMethod<
  ModifyCertificateBasedAuthPropertiesRequest,
  ModifyCertificateBasedAuthPropertiesResult,
  ModifyCertificateBasedAuthPropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceId: 0,
      CertificateBasedAuthProperties: { Status: 0, CertificateAuthorityArn: 0 },
      PropertiesToDelete: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyCertificateBasedAuthProperties",
})) as any;

export type ModifyClientPropertiesError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Modifies the properties of the specified Amazon WorkSpaces clients.
 */
export const modifyClientProperties: API.OperationMethod<
  ModifyClientPropertiesRequest,
  ModifyClientPropertiesResult,
  ModifyClientPropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceId: 0,
      ClientProperties: {
        ReconnectEnabled: 0,
        LogUploadEnabled: 0,
        ClientExperiencePolicy: 0,
      },
    },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyClientProperties",
})) as any;

export type ModifyEndpointEncryptionModeError =
  | AccessDeniedException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Modifies the endpoint encryption mode that allows you to configure the specified
 * directory between Standard TLS and FIPS 140-2 validated mode.
 */
export const modifyEndpointEncryptionMode: API.OperationMethod<
  ModifyEndpointEncryptionModeRequest,
  ModifyEndpointEncryptionModeResponse,
  ModifyEndpointEncryptionModeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DirectoryId: 0, EndpointEncryptionMode: 0 },
  },
  errors: [
    AccessDeniedException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyEndpointEncryptionMode",
})) as any;

export type ModifySamlPropertiesError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Modifies multiple properties related to SAML 2.0 authentication, including the enablement status,
 * user access URL, and relay state parameter name that are used for configuring federation with an
 * SAML 2.0 identity provider.
 */
export const modifySamlProperties: API.OperationMethod<
  ModifySamlPropertiesRequest,
  ModifySamlPropertiesResult,
  ModifySamlPropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceId: 0,
      SamlProperties: {
        Status: 0,
        UserAccessUrl: 0,
        RelayStateParameterName: 0,
      },
      PropertiesToDelete: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifySamlProperties",
})) as any;

export type ModifySelfservicePermissionsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Modifies the self-service WorkSpace management capabilities for your users. For more
 * information, see Enable Self-Service WorkSpace Management Capabilities for Your Users.
 */
export const modifySelfservicePermissions: API.OperationMethod<
  ModifySelfservicePermissionsRequest,
  ModifySelfservicePermissionsResult,
  ModifySelfservicePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceId: 0,
      SelfservicePermissions: {
        RestartWorkspace: 0,
        IncreaseVolumeSize: 0,
        ChangeComputeType: 0,
        SwitchRunningMode: 0,
        RebuildWorkspace: 0,
      },
    },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifySelfservicePermissions",
})) as any;

export type ModifyStreamingPropertiesError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Modifies the specified streaming properties.
 */
export const modifyStreamingProperties: API.OperationMethod<
  ModifyStreamingPropertiesRequest,
  ModifyStreamingPropertiesResult,
  ModifyStreamingPropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceId: 0,
      StreamingProperties: {
        StreamingExperiencePreferredProtocol: 0,
        UserSettings: D.list({ Action: 0, Permission: 0, MaximumLength: 0 }),
        StorageConnectors: D.list({ ConnectorType: 0, Status: 0 }),
        GlobalAccelerator: { Mode: 0, PreferredProtocol: 0 },
      },
    },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyStreamingProperties",
})) as any;

export type ModifyWorkspaceAccessPropertiesError =
  | AccessDeniedException
  | InvalidParameterCombinationException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Specifies which devices and operating systems users can use to access their WorkSpaces.
 * For more information, see
 * Control Device Access.
 */
export const modifyWorkspaceAccessProperties: API.OperationMethod<
  ModifyWorkspaceAccessPropertiesRequest,
  ModifyWorkspaceAccessPropertiesResult,
  ModifyWorkspaceAccessPropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceId: 0,
      WorkspaceAccessProperties: {
        DeviceTypeWindows: 0,
        DeviceTypeOsx: 0,
        DeviceTypeWeb: 0,
        DeviceTypeIos: 0,
        DeviceTypeAndroid: 0,
        DeviceTypeChromeOs: 0,
        DeviceTypeZeroClient: 0,
        DeviceTypeLinux: 0,
        DeviceTypeWorkSpacesThinClient: 0,
        AccessEndpointConfig: {
          AccessEndpoints: D.list({ AccessEndpointType: 0, VpcEndpointId: 0 }),
          InternetFallbackProtocols: 0,
        },
      },
    },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterCombinationException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyWorkspaceAccessProperties",
})) as any;

export type ModifyWorkspaceCreationPropertiesError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Modify the default properties used to create WorkSpaces.
 */
export const modifyWorkspaceCreationProperties: API.OperationMethod<
  ModifyWorkspaceCreationPropertiesRequest,
  ModifyWorkspaceCreationPropertiesResult,
  ModifyWorkspaceCreationPropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceId: 0,
      WorkspaceCreationProperties: {
        EnableInternetAccess: 0,
        DefaultOu: 0,
        CustomSecurityGroupId: 0,
        UserEnabledAsLocalAdministrator: 0,
        EnableMaintenanceMode: 0,
        InstanceIamRoleArn: 0,
      },
    },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyWorkspaceCreationProperties",
})) as any;

export type ModifyWorkspacePropertiesError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationInProgressException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | UnsupportedWorkspaceConfigurationException
  | CommonErrors;
/**
 * Modifies the specified WorkSpace properties. For important information about how to
 * modify the size of the root and user volumes, see Modify a WorkSpace.
 *
 * The `MANUAL` running mode value is only supported by Amazon WorkSpaces
 * Core. Contact your account team to be allow-listed to use this value. For more
 * information, see Amazon WorkSpaces
 * Core.
 */
export const modifyWorkspaceProperties: API.OperationMethod<
  ModifyWorkspacePropertiesRequest,
  ModifyWorkspacePropertiesResult,
  ModifyWorkspacePropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      WorkspaceId: 0,
      WorkspaceProperties: i_WorkspaceProperties,
      DataReplication: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationInProgressException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    UnsupportedWorkspaceConfigurationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyWorkspaceProperties",
})) as any;

export type ModifyWorkspaceStateError =
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Sets the state of the specified WorkSpace.
 *
 * To maintain a WorkSpace without being interrupted, set the WorkSpace state to
 * `ADMIN_MAINTENANCE`. WorkSpaces in this state do not respond to requests to
 * reboot, stop, start, rebuild, or restore. An AutoStop WorkSpace in this state is not
 * stopped. Users cannot log into a WorkSpace in the `ADMIN_MAINTENANCE`
 * state.
 */
export const modifyWorkspaceState: API.OperationMethod<
  ModifyWorkspaceStateRequest,
  ModifyWorkspaceStateResult,
  ModifyWorkspaceStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { WorkspaceId: 0, WorkspaceState: 0 } },
  errors: [
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyWorkspaceState",
})) as any;

export type RebootWorkspacesError =
  | OperationNotSupportedException
  | CommonErrors;
/**
 * Reboots the specified WorkSpaces.
 *
 * You cannot reboot a WorkSpace unless its state is `AVAILABLE`,
 * `UNHEALTHY`, or `REBOOTING`. Reboot a WorkSpace in the `REBOOTING`
 * state only if your WorkSpace has been stuck in the `REBOOTING` state for over 20 minutes.
 *
 * This operation is asynchronous and returns before the WorkSpaces have rebooted.
 */
export const rebootWorkspaces: API.OperationMethod<
  RebootWorkspacesRequest,
  RebootWorkspacesResult,
  RebootWorkspacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RebootWorkspaceRequests: D.list({ WorkspaceId: 0 }) },
  },
  errors: [OperationNotSupportedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootWorkspaces",
})) as any;

export type RebuildWorkspacesError =
  | OperationNotSupportedException
  | CommonErrors;
/**
 * Rebuilds the specified WorkSpace.
 *
 * You cannot rebuild a WorkSpace unless its state is `AVAILABLE`,
 * `ERROR`, `UNHEALTHY`, `STOPPED`, or
 * `REBOOTING`.
 *
 * Rebuilding a WorkSpace is a potentially destructive action that can result in the loss
 * of data. For more information, see Rebuild a
 * WorkSpace.
 *
 * This operation is asynchronous and returns before the WorkSpaces have been completely
 * rebuilt.
 */
export const rebuildWorkspaces: API.OperationMethod<
  RebuildWorkspacesRequest,
  RebuildWorkspacesResult,
  RebuildWorkspacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RebuildWorkspaceRequests: D.list({ WorkspaceId: 0 }) },
  },
  errors: [OperationNotSupportedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebuildWorkspaces",
})) as any;

export type RegisterWorkspaceDirectoryError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | UnsupportedNetworkConfigurationException
  | WorkspacesDefaultRoleNotFoundException
  | CommonErrors;
/**
 * Registers the specified directory. This operation is asynchronous and returns before the
 * WorkSpace directory is registered. If this is the first time you are registering a
 * directory, you will need to create the workspaces_DefaultRole role before you can register
 * a directory. For more information, see
 * Creating the workspaces_DefaultRole Role.
 */
export const registerWorkspaceDirectory: API.OperationMethod<
  RegisterWorkspaceDirectoryRequest,
  RegisterWorkspaceDirectoryResult,
  RegisterWorkspaceDirectoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DirectoryId: 0,
      SubnetIds: 0,
      EnableSelfService: 0,
      Tenancy: 0,
      Tags: D.list(i_Tag),
      WorkspaceDirectoryName: 0,
      WorkspaceDirectoryDescription: 0,
      UserIdentityType: 0,
      IdcInstanceArn: 0,
      MicrosoftEntraConfig: { TenantId: 0, ApplicationConfigSecretArn: 0 },
      WorkspaceType: 0,
      ActiveDirectoryConfig: { DomainName: 0, ServiceAccountSecretArn: 0 },
    },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    UnsupportedNetworkConfigurationException,
    WorkspacesDefaultRoleNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterWorkspaceDirectory",
})) as any;

export type RejectAccountLinkInvitationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Rejects the account link invitation.
 */
export const rejectAccountLinkInvitation: API.OperationMethod<
  RejectAccountLinkInvitationRequest,
  RejectAccountLinkInvitationResult,
  RejectAccountLinkInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { LinkId: 0, ClientToken: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectAccountLinkInvitation",
})) as any;

export type RestoreWorkspaceError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Restores the specified WorkSpace to its last known healthy state.
 *
 * You cannot restore a WorkSpace unless its state is ` AVAILABLE`,
 * `ERROR`, `UNHEALTHY`, or `STOPPED`.
 *
 * Restoring a WorkSpace is a potentially destructive action that can result in the loss of
 * data. For more information, see Restore a
 * WorkSpace.
 *
 * This operation is asynchronous and returns before the WorkSpace is completely
 * restored.
 */
export const restoreWorkspace: API.OperationMethod<
  RestoreWorkspaceRequest,
  RestoreWorkspaceResult,
  RestoreWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { WorkspaceId: 0 } },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreWorkspace",
})) as any;

export type RevokeIpRulesError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes one or more rules from the specified IP access control group.
 */
export const revokeIpRules: API.OperationMethod<
  RevokeIpRulesRequest,
  RevokeIpRulesResult,
  RevokeIpRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { GroupId: 0, UserRules: 0 } },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeIpRules",
})) as any;

export type StartWorkspacesError = CommonErrors;
/**
 * Starts the specified WorkSpaces.
 *
 * You cannot start a WorkSpace unless it has a running mode of `AutoStop` or
 * `Manual` and a state of `STOPPED`.
 */
export const startWorkspaces: API.OperationMethod<
  StartWorkspacesRequest,
  StartWorkspacesResult,
  StartWorkspacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { StartWorkspaceRequests: D.list({ WorkspaceId: 0 }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartWorkspaces",
})) as any;

export type StartWorkspacesPoolError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationInProgressException
  | OperationNotSupportedException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * End of support notice: On December 31, 2027, Amazon Web Services will end support for Amazon WorkSpaces Pools. After December 31, 2027,
 * you will no longer be able to access the Amazon WorkSpaces Pools console or Amazon WorkSpaces Pools resources. For more information, see
 * Amazon WorkSpaces Pools end of support.
 *
 * Starts the specified pool.
 *
 * You cannot start a pool unless it has a running mode of
 * `AutoStop` and a state of `STOPPED`.
 */
export const startWorkspacesPool: API.OperationMethod<
  StartWorkspacesPoolRequest,
  StartWorkspacesPoolResult,
  StartWorkspacesPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { PoolId: 0 } },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationInProgressException,
    OperationNotSupportedException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartWorkspacesPool",
})) as any;

export type StopWorkspacesError = CommonErrors;
/**
 * Stops the specified WorkSpaces.
 *
 * You cannot stop a WorkSpace unless it has a running mode of `AutoStop` or
 * `Manual` and a state of `AVAILABLE`, `IMPAIRED`,
 * `UNHEALTHY`, or `ERROR`.
 */
export const stopWorkspaces: API.OperationMethod<
  StopWorkspacesRequest,
  StopWorkspacesResult,
  StopWorkspacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { StopWorkspaceRequests: D.list({ WorkspaceId: 0 }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopWorkspaces",
})) as any;

export type StopWorkspacesPoolError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationInProgressException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * End of support notice: On December 31, 2027, Amazon Web Services will end support for Amazon WorkSpaces Pools. After December 31, 2027,
 * you will no longer be able to access the Amazon WorkSpaces Pools console or Amazon WorkSpaces Pools resources. For more information, see
 * Amazon WorkSpaces Pools end of support.
 *
 * Stops the specified pool.
 *
 * You cannot stop a WorkSpace pool unless it has a running mode of `AutoStop`
 * and a state of `AVAILABLE`, `IMPAIRED`, `UNHEALTHY`, or `ERROR`.
 */
export const stopWorkspacesPool: API.OperationMethod<
  StopWorkspacesPoolRequest,
  StopWorkspacesPoolResult,
  StopWorkspacesPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { PoolId: 0 } },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationInProgressException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopWorkspacesPool",
})) as any;

export type TerminateWorkspacesError = CommonErrors;
/**
 * Terminates the specified WorkSpaces.
 *
 * Terminating a WorkSpace is a permanent action and cannot be undone. The user's data
 * is destroyed. If you need to archive any user data, contact Amazon Web Services Support before
 * terminating the WorkSpace.
 *
 * You can terminate a WorkSpace that is in any state except `SUSPENDED`.
 *
 * This operation is asynchronous and returns before the WorkSpaces have been completely
 * terminated. After a WorkSpace is terminated, the `TERMINATED` state is returned
 * only briefly before the WorkSpace directory metadata is cleaned up, so this state is rarely
 * returned. To confirm that a WorkSpace is terminated, check for the WorkSpace ID by using
 *
 * DescribeWorkSpaces. If the WorkSpace ID isn't returned, then the WorkSpace has
 * been successfully terminated.
 *
 * Simple AD and AD Connector are made available to you free of charge to use with
 * WorkSpaces. If there are no WorkSpaces being used with your Simple AD or AD Connector
 * directory for 30 consecutive days, this directory will be automatically deregistered for
 * use with Amazon WorkSpaces, and you will be charged for this directory as per the Directory Service pricing
 * terms.
 *
 * To delete empty directories, see Delete the
 * Directory for Your WorkSpaces. If you delete your Simple AD or AD Connector
 * directory, you can always create a new one when you want to start using WorkSpaces
 * again.
 */
export const terminateWorkspaces: API.OperationMethod<
  TerminateWorkspacesRequest,
  TerminateWorkspacesResult,
  TerminateWorkspacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TerminateWorkspaceRequests: D.list({ WorkspaceId: 0 }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateWorkspaces",
})) as any;

export type TerminateWorkspacesPoolError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationInProgressException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * End of support notice: On December 31, 2027, Amazon Web Services will end support for Amazon WorkSpaces Pools. After December 31, 2027,
 * you will no longer be able to access the Amazon WorkSpaces Pools console or Amazon WorkSpaces Pools resources. For more information, see
 * Amazon WorkSpaces Pools end of support.
 *
 * Terminates the specified pool.
 */
export const terminateWorkspacesPool: API.OperationMethod<
  TerminateWorkspacesPoolRequest,
  TerminateWorkspacesPoolResult,
  TerminateWorkspacesPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { PoolId: 0 } },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationInProgressException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateWorkspacesPool",
})) as any;

export type TerminateWorkspacesPoolSessionError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationInProgressException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * End of support notice: On December 31, 2027, Amazon Web Services will end support for Amazon WorkSpaces Pools. After December 31, 2027,
 * you will no longer be able to access the Amazon WorkSpaces Pools console or Amazon WorkSpaces Pools resources. For more information, see
 * Amazon WorkSpaces Pools end of support.
 *
 * Terminates the pool session.
 */
export const terminateWorkspacesPoolSession: API.OperationMethod<
  TerminateWorkspacesPoolSessionRequest,
  TerminateWorkspacesPoolSessionResult,
  TerminateWorkspacesPoolSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SessionId: 0 } },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationInProgressException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateWorkspacesPoolSession",
})) as any;

export type UpdateConnectClientAddInError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a Connect Customer client add-in. Use this action to update the name and
 * endpoint URL of a Connect Customer client add-in.
 */
export const updateConnectClientAddIn: API.OperationMethod<
  UpdateConnectClientAddInRequest,
  UpdateConnectClientAddInResult,
  UpdateConnectClientAddInError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AddInId: 0, ResourceId: 0, Name: 0, URL: 0 },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnectClientAddIn",
})) as any;

export type UpdateConnectionAliasPermissionError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceAssociatedException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Shares or unshares a connection alias with one account by specifying whether that
 * account has permission to associate the connection alias with a directory. If the
 * association permission is granted, the connection alias is shared with that account. If the
 * association permission is revoked, the connection alias is unshared with the account. For
 * more information, see Cross-Region
 * Redirection for Amazon WorkSpaces.
 *
 * - Before performing this operation, call
 * DescribeConnectionAliases to make sure that the current state of the
 * connection alias is `CREATED`.
 *
 * - To delete a connection alias that has been shared, the shared account must
 * first disassociate the connection alias from any directories it has been
 * associated with. Then you must unshare the connection alias from the account it
 * has been shared with. You can delete a connection alias only after it is no longer
 * shared with any accounts or associated with any directories.
 */
export const updateConnectionAliasPermission: API.OperationMethod<
  UpdateConnectionAliasPermissionRequest,
  UpdateConnectionAliasPermissionResult,
  UpdateConnectionAliasPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AliasId: 0,
      ConnectionAliasPermission: { SharedAccountId: 0, AllowAssociation: 0 },
    },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceAssociatedException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnectionAliasPermission",
})) as any;

export type UpdateRulesOfIpGroupError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Replaces the current rules of the specified IP access control group with the specified
 * rules.
 */
export const updateRulesOfIpGroup: API.OperationMethod<
  UpdateRulesOfIpGroupRequest,
  UpdateRulesOfIpGroupResult,
  UpdateRulesOfIpGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { GroupId: 0, UserRules: D.list(i_IpRuleItem) },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRulesOfIpGroup",
})) as any;

export type UpdateWorkspaceBundleError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | CommonErrors;
/**
 * Updates a WorkSpace bundle with a new image. For more information about updating WorkSpace bundles, see
 *
 * Update a Custom WorkSpaces Bundle.
 *
 * Existing WorkSpaces aren't automatically updated when you update the bundle that they're
 * based on. To update existing WorkSpaces that are based on a bundle that you've updated, you
 * must either rebuild the WorkSpaces or delete and recreate them.
 */
export const updateWorkspaceBundle: API.OperationMethod<
  UpdateWorkspaceBundleRequest,
  UpdateWorkspaceBundleResult,
  UpdateWorkspaceBundleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { BundleId: 0, ImageId: 0 } },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
    ResourceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkspaceBundle",
})) as any;

export type UpdateWorkspaceImagePermissionError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | CommonErrors;
/**
 * Shares or unshares an image with one account in the same Amazon Web Services Region by
 * specifying whether that account has permission to copy the image. If the copy image
 * permission is granted, the image is shared with that account. If the copy image permission
 * is revoked, the image is unshared with the account.
 *
 * After an image has been shared, the recipient account can copy the image to other
 * Regions as needed.
 *
 * In the China (Ningxia) Region, you can copy images only within the same Region.
 *
 * In Amazon Web Services GovCloud (US), to copy images to and from other Regions, contact Amazon Web Services Support.
 *
 * For more information about sharing images, see Share or Unshare a Custom
 * WorkSpaces Image.
 *
 * - To delete an image that has been shared, you must unshare the image before you
 * delete it.
 *
 * - Sharing Bring Your Own License (BYOL) images across Amazon Web Services accounts
 * isn't supported at this time in Amazon Web Services GovCloud (US). To share BYOL images
 * across accounts in Amazon Web Services GovCloud (US), contact Amazon Web Services Support.
 */
export const updateWorkspaceImagePermission: API.OperationMethod<
  UpdateWorkspaceImagePermissionRequest,
  UpdateWorkspaceImagePermissionResult,
  UpdateWorkspaceImagePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ImageId: 0, AllowCopyImage: 0, SharedAccountId: 0 },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
    ResourceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkspaceImagePermission",
})) as any;

export type UpdateWorkspacesPoolError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationInProgressException
  | OperationNotSupportedException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * End of support notice: On December 31, 2027, Amazon Web Services will end support for Amazon WorkSpaces Pools. After December 31, 2027,
 * you will no longer be able to access the Amazon WorkSpaces Pools console or Amazon WorkSpaces Pools resources. For more information, see
 * Amazon WorkSpaces Pools end of support.
 *
 * Updates the specified pool.
 */
export const updateWorkspacesPool: API.OperationMethod<
  UpdateWorkspacesPoolRequest,
  UpdateWorkspacesPoolResult,
  UpdateWorkspacesPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      PoolId: 0,
      Description: 0,
      BundleId: 0,
      DirectoryId: 0,
      Capacity: i_Capacity,
      ApplicationSettings: i_ApplicationSettingsRequest,
      TimeoutSettings: i_TimeoutSettings,
      RunningMode: 0,
    },
    output: { WorkspacesPool: o_WorkspacesPool },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationInProgressException,
    OperationNotSupportedException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkspacesPool",
})) as any;

const i_ApplicationSettingsRequest: D.LazyStruct = () => ({
  Status: 0,
  SettingsGroup: 0,
});
const i_Capacity: D.LazyStruct = () => ({ DesiredUserSessions: 0 });
const i_DefaultImportClientBrandingAttributes: D.LazyStruct = () => ({
  Logo: 0,
  SupportEmail: 0,
  SupportLink: 0,
  ForgotPasswordLink: 0,
  LoginMessage: 0,
});
const i_IpRuleItem: D.LazyStruct = () => ({ ipRule: 0, ruleDesc: 0 });
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_TimeoutSettings: D.LazyStruct = () => ({
  DisconnectTimeoutInSeconds: 0,
  IdleDisconnectTimeoutInSeconds: 0,
  MaxUserDurationInSeconds: 0,
});
const i_WorkspaceProperties: D.LazyStruct = () => ({
  RunningMode: 0,
  RunningModeAutoStopTimeoutInMinutes: 0,
  RootVolumeSizeGib: 0,
  UserVolumeSizeGib: 0,
  ComputeTypeName: 0,
  Protocols: 0,
  OperatingSystemName: 0,
  GlobalAccelerator: { Mode: 0, PreferredProtocol: 0 },
  NestedVirtualizationEnabled: 0,
});
const o_Snapshot: D.LazyStruct = () => ({ SnapshotTime: D.ts });
const o_Workspace: D.LazyStruct = () => ({
  DataReplicationSettings: { RecoverySnapshotTime: D.ts },
  StandbyWorkspacesProperties: D.list({ RecoverySnapshotTime: D.ts }),
});
const o_WorkspaceBundle: D.LazyStruct = () => ({
  LastUpdatedTime: D.ts,
  CreationTime: D.ts,
});
const o_WorkspaceResourceAssociation: D.LazyStruct = () => ({
  Created: D.ts,
  LastUpdatedTime: D.ts,
});
const o_WorkspacesPool: D.LazyStruct = () => ({ CreatedAt: D.ts });
