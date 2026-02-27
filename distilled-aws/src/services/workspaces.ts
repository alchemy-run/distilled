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
import type { Region as Rgn } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const ns = T.XmlNamespace("http://workspaces.amazonaws.com/api/v1");
const svc = T.AwsApiService({
  sdkId: "WorkSpaces",
  serviceShapeName: "WorkspacesService",
});
const auth = T.AwsAuthSigv4({ name: "workspaces" });
const ver = T.ServiceVersion("2015-04-08");
const proto = T.AwsProtocolsAwsJson1_1();
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
});

//# Newtypes
export type LinkId = string;
export type ClientToken = string;
export type AwsAccount = string;
export type ExceptionMessage = string;
export type NonEmptyString = string;
export type ConnectionAliasId = string;
export type ConnectionIdentifier = string;
export type ExceptionErrorCode = string;
export type DirectoryId = string;
export type IpGroupId = string;
export type WorkspaceId = string;
export type WorkSpaceApplicationId = string;
export type String2048 = string;
export type IpRule = string;
export type IpRuleDesc = string;
export type WorkspaceImageName = string;
export type WorkspaceImageDescription = string;
export type WorkspaceImageId = string;
export type Region = string;
export type TagKey = string;
export type TagValue = string;
export type AddInName = string;
export type AddInUrl = string;
export type AmazonUuid = string;
export type ConnectionString = string;
export type IpGroupName = string;
export type IpGroupDesc = string;
export type VolumeEncryptionKey = string;
export type WorkspaceErrorCode = string;
export type Description = string;
export type UserName = string;
export type WorkspaceBundleName = string;
export type WorkspaceBundleDescription = string;
export type BundleId = string;
export type BundleOwner = string;
export type RunningModeAutoStopTimeoutInMinutes = number;
export type RootVolumeSizeGib = number;
export type UserVolumeSizeGib = number;
export type WorkspaceName = string;
export type Ipv6Address = string;
export type ErrorType = string;
export type IpAddress = string;
export type SubnetId = string;
export type ComputerName = string;
export type WorkspacesPoolName = string;
export type UpdateDescription = string;
export type DesiredUserSessions = number;
export type SettingsGroup = string;
export type DisconnectTimeoutInSeconds = number;
export type IdleDisconnectTimeoutInSeconds = number;
export type MaxUserDurationInSeconds = number;
export type WorkspacesPoolId = string;
export type ARN = string;
export type AvailableUserSessions = number;
export type ActualUserSessions = number;
export type ActiveUserSessions = number;
export type ErrorMessage = string;
export type S3BucketName = string;
export type DedicatedTenancyManagementCidrRange = string;
export type Message = string;
export type PaginationToken = string;
export type Limit = number;
export type WorkSpaceApplicationOwner = string;
export type ClientUrl = string;
export type ClientEmail = string;
export type ClientLocale = string;
export type ClientLoginMessage = string;
export type InfrastructureConfigurationArn = string;
export type WorkflowStateMessage = string;
export type Percentage = number;
export type Ec2ImportTaskId = string;
export type ImageBuildVersionArn = string;
export type Ec2ImageId = string;
export type ErrorCode = string;
export type ImageErrorMessage = string;
export type WorkspaceDirectoryName = string;
export type DescribeWorkspaceDirectoriesFilterValue = string;
export type Alias = string;
export type DirectoryName = string;
export type RegistrationCode = string;
export type SecurityGroupId = string;
export type DefaultOu = string;
export type AlphanumericDashUnderscoreNonEmptyString = string;
export type SamlUserAccessUrl = string;
export type CertificateAuthorityArn = string;
export type MicrosoftEntraConfigTenantId = string;
export type SecretsManagerArn = string;
export type WorkspaceDirectoryDescription = string;
export type DomainName = string;
export type MaximumLength = number;
export type WorkspaceImageErrorCode = string;
export type DescribeWorkspacesPoolsFilterValue = string;
export type WorkspacesPoolUserId = string;
export type Limit50 = number;
export type SessionInstanceId = string;
export type DefaultLogo = Uint8Array;
export type IosLogo = Uint8Array;
export type Ios2XLogo = Uint8Array;
export type Ios3XLogo = Uint8Array;
export type ManagementCidrRangeConstraint = string;
export type ManagementCidrRangeMaxResults = number;

//# Schemas
export interface AcceptAccountLinkInvitationRequest {
  LinkId: string;
  ClientToken?: string;
}
export const AcceptAccountLinkInvitationRequest = S.suspend(() =>
  S.Struct({ LinkId: S.String, ClientToken: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AcceptAccountLinkInvitationRequest",
}) as any as S.Schema<AcceptAccountLinkInvitationRequest>;
export type AccountLinkStatusEnum =
  | "LINKED"
  | "LINKING_FAILED"
  | "LINK_NOT_FOUND"
  | "PENDING_ACCEPTANCE_BY_TARGET_ACCOUNT"
  | "REJECTED"
  | (string & {});
export const AccountLinkStatusEnum = S.String;
export interface AccountLink {
  AccountLinkId?: string;
  AccountLinkStatus?: AccountLinkStatusEnum;
  SourceAccountId?: string;
  TargetAccountId?: string;
}
export const AccountLink = S.suspend(() =>
  S.Struct({
    AccountLinkId: S.optional(S.String),
    AccountLinkStatus: S.optional(AccountLinkStatusEnum),
    SourceAccountId: S.optional(S.String),
    TargetAccountId: S.optional(S.String),
  }),
).annotate({ identifier: "AccountLink" }) as any as S.Schema<AccountLink>;
export interface AcceptAccountLinkInvitationResult {
  AccountLink?: AccountLink;
}
export const AcceptAccountLinkInvitationResult = S.suspend(() =>
  S.Struct({ AccountLink: S.optional(AccountLink) }).pipe(ns),
).annotate({
  identifier: "AcceptAccountLinkInvitationResult",
}) as any as S.Schema<AcceptAccountLinkInvitationResult>;
export interface AssociateConnectionAliasRequest {
  AliasId: string;
  ResourceId: string;
}
export const AssociateConnectionAliasRequest = S.suspend(() =>
  S.Struct({ AliasId: S.String, ResourceId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateConnectionAliasRequest",
}) as any as S.Schema<AssociateConnectionAliasRequest>;
export interface AssociateConnectionAliasResult {
  ConnectionIdentifier?: string;
}
export const AssociateConnectionAliasResult = S.suspend(() =>
  S.Struct({ ConnectionIdentifier: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "AssociateConnectionAliasResult",
}) as any as S.Schema<AssociateConnectionAliasResult>;
export type IpGroupIdList = string[];
export const IpGroupIdList = S.Array(S.String);
export interface AssociateIpGroupsRequest {
  DirectoryId: string;
  GroupIds: string[];
}
export const AssociateIpGroupsRequest = S.suspend(() =>
  S.Struct({ DirectoryId: S.String, GroupIds: IpGroupIdList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateIpGroupsRequest",
}) as any as S.Schema<AssociateIpGroupsRequest>;
export interface AssociateIpGroupsResult {}
export const AssociateIpGroupsResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AssociateIpGroupsResult",
}) as any as S.Schema<AssociateIpGroupsResult>;
export interface AssociateWorkspaceApplicationRequest {
  WorkspaceId: string;
  ApplicationId: string;
}
export const AssociateWorkspaceApplicationRequest = S.suspend(() =>
  S.Struct({ WorkspaceId: S.String, ApplicationId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateWorkspaceApplicationRequest",
}) as any as S.Schema<AssociateWorkspaceApplicationRequest>;
export type WorkSpaceAssociatedResourceType = "APPLICATION" | (string & {});
export const WorkSpaceAssociatedResourceType = S.String;
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
export const AssociationState = S.String;
export type AssociationErrorCode =
  | "ValidationError.InsufficientDiskSpace"
  | "ValidationError.InsufficientMemory"
  | "ValidationError.UnsupportedOperatingSystem"
  | "DeploymentError.InternalServerError"
  | "DeploymentError.WorkspaceUnreachable"
  | "ValidationError.ApplicationOldVersionExists"
  | (string & {});
export const AssociationErrorCode = S.String;
export interface AssociationStateReason {
  ErrorCode?: AssociationErrorCode;
  ErrorMessage?: string;
}
export const AssociationStateReason = S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(AssociationErrorCode),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "AssociationStateReason",
}) as any as S.Schema<AssociationStateReason>;
export interface WorkspaceResourceAssociation {
  AssociatedResourceId?: string;
  AssociatedResourceType?: WorkSpaceAssociatedResourceType;
  Created?: Date;
  LastUpdatedTime?: Date;
  State?: AssociationState;
  StateReason?: AssociationStateReason;
  WorkspaceId?: string;
}
export const WorkspaceResourceAssociation = S.suspend(() =>
  S.Struct({
    AssociatedResourceId: S.optional(S.String),
    AssociatedResourceType: S.optional(WorkSpaceAssociatedResourceType),
    Created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    State: S.optional(AssociationState),
    StateReason: S.optional(AssociationStateReason),
    WorkspaceId: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkspaceResourceAssociation",
}) as any as S.Schema<WorkspaceResourceAssociation>;
export interface AssociateWorkspaceApplicationResult {
  Association?: WorkspaceResourceAssociation;
}
export const AssociateWorkspaceApplicationResult = S.suspend(() =>
  S.Struct({ Association: S.optional(WorkspaceResourceAssociation) }).pipe(ns),
).annotate({
  identifier: "AssociateWorkspaceApplicationResult",
}) as any as S.Schema<AssociateWorkspaceApplicationResult>;
export interface IpRuleItem {
  ipRule?: string;
  ruleDesc?: string;
}
export const IpRuleItem = S.suspend(() =>
  S.Struct({ ipRule: S.optional(S.String), ruleDesc: S.optional(S.String) }),
).annotate({ identifier: "IpRuleItem" }) as any as S.Schema<IpRuleItem>;
export type IpRuleList = IpRuleItem[];
export const IpRuleList = S.Array(IpRuleItem);
export interface AuthorizeIpRulesRequest {
  GroupId: string;
  UserRules: IpRuleItem[];
}
export const AuthorizeIpRulesRequest = S.suspend(() =>
  S.Struct({ GroupId: S.String, UserRules: IpRuleList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AuthorizeIpRulesRequest",
}) as any as S.Schema<AuthorizeIpRulesRequest>;
export interface AuthorizeIpRulesResult {}
export const AuthorizeIpRulesResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AuthorizeIpRulesResult",
}) as any as S.Schema<AuthorizeIpRulesResult>;
export interface Tag {
  Key: string;
  Value?: string;
}
export const Tag = S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = S.Array(Tag);
export interface CopyWorkspaceImageRequest {
  Name: string;
  Description?: string;
  SourceImageId: string;
  SourceRegion: string;
  Tags?: Tag[];
}
export const CopyWorkspaceImageRequest = S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    SourceImageId: S.String,
    SourceRegion: S.String,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CopyWorkspaceImageRequest",
}) as any as S.Schema<CopyWorkspaceImageRequest>;
export interface CopyWorkspaceImageResult {
  ImageId?: string;
}
export const CopyWorkspaceImageResult = S.suspend(() =>
  S.Struct({ ImageId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CopyWorkspaceImageResult",
}) as any as S.Schema<CopyWorkspaceImageResult>;
export interface CreateAccountLinkInvitationRequest {
  TargetAccountId: string;
  ClientToken?: string;
}
export const CreateAccountLinkInvitationRequest = S.suspend(() =>
  S.Struct({
    TargetAccountId: S.String,
    ClientToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAccountLinkInvitationRequest",
}) as any as S.Schema<CreateAccountLinkInvitationRequest>;
export interface CreateAccountLinkInvitationResult {
  AccountLink?: AccountLink;
}
export const CreateAccountLinkInvitationResult = S.suspend(() =>
  S.Struct({ AccountLink: S.optional(AccountLink) }).pipe(ns),
).annotate({
  identifier: "CreateAccountLinkInvitationResult",
}) as any as S.Schema<CreateAccountLinkInvitationResult>;
export interface CreateConnectClientAddInRequest {
  ResourceId: string;
  Name: string;
  URL: string;
}
export const CreateConnectClientAddInRequest = S.suspend(() =>
  S.Struct({ ResourceId: S.String, Name: S.String, URL: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateConnectClientAddInRequest",
}) as any as S.Schema<CreateConnectClientAddInRequest>;
export interface CreateConnectClientAddInResult {
  AddInId?: string;
}
export const CreateConnectClientAddInResult = S.suspend(() =>
  S.Struct({ AddInId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateConnectClientAddInResult",
}) as any as S.Schema<CreateConnectClientAddInResult>;
export interface CreateConnectionAliasRequest {
  ConnectionString: string;
  Tags?: Tag[];
}
export const CreateConnectionAliasRequest = S.suspend(() =>
  S.Struct({ ConnectionString: S.String, Tags: S.optional(TagList) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateConnectionAliasRequest",
}) as any as S.Schema<CreateConnectionAliasRequest>;
export interface CreateConnectionAliasResult {
  AliasId?: string;
}
export const CreateConnectionAliasResult = S.suspend(() =>
  S.Struct({ AliasId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateConnectionAliasResult",
}) as any as S.Schema<CreateConnectionAliasResult>;
export interface CreateIpGroupRequest {
  GroupName: string;
  GroupDesc?: string;
  UserRules?: IpRuleItem[];
  Tags?: Tag[];
}
export const CreateIpGroupRequest = S.suspend(() =>
  S.Struct({
    GroupName: S.String,
    GroupDesc: S.optional(S.String),
    UserRules: S.optional(IpRuleList),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateIpGroupRequest",
}) as any as S.Schema<CreateIpGroupRequest>;
export interface CreateIpGroupResult {
  GroupId?: string;
}
export const CreateIpGroupResult = S.suspend(() =>
  S.Struct({ GroupId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateIpGroupResult",
}) as any as S.Schema<CreateIpGroupResult>;
export type DataReplication =
  | "NO_REPLICATION"
  | "PRIMARY_AS_SOURCE"
  | (string & {});
export const DataReplication = S.String;
export interface StandbyWorkspace {
  PrimaryWorkspaceId: string;
  VolumeEncryptionKey?: string;
  DirectoryId: string;
  Tags?: Tag[];
  DataReplication?: DataReplication;
}
export const StandbyWorkspace = S.suspend(() =>
  S.Struct({
    PrimaryWorkspaceId: S.String,
    VolumeEncryptionKey: S.optional(S.String),
    DirectoryId: S.String,
    Tags: S.optional(TagList),
    DataReplication: S.optional(DataReplication),
  }),
).annotate({
  identifier: "StandbyWorkspace",
}) as any as S.Schema<StandbyWorkspace>;
export type StandbyWorkspacesList = StandbyWorkspace[];
export const StandbyWorkspacesList = S.Array(StandbyWorkspace);
export interface CreateStandbyWorkspacesRequest {
  PrimaryRegion: string;
  StandbyWorkspaces: StandbyWorkspace[];
}
export const CreateStandbyWorkspacesRequest = S.suspend(() =>
  S.Struct({
    PrimaryRegion: S.String,
    StandbyWorkspaces: StandbyWorkspacesList,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateStandbyWorkspacesRequest",
}) as any as S.Schema<CreateStandbyWorkspacesRequest>;
export interface FailedCreateStandbyWorkspacesRequest {
  StandbyWorkspaceRequest?: StandbyWorkspace;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export const FailedCreateStandbyWorkspacesRequest = S.suspend(() =>
  S.Struct({
    StandbyWorkspaceRequest: S.optional(StandbyWorkspace),
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "FailedCreateStandbyWorkspacesRequest",
}) as any as S.Schema<FailedCreateStandbyWorkspacesRequest>;
export type FailedCreateStandbyWorkspacesRequestList =
  FailedCreateStandbyWorkspacesRequest[];
export const FailedCreateStandbyWorkspacesRequestList = S.Array(
  FailedCreateStandbyWorkspacesRequest,
);
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
export const WorkspaceState = S.String;
export interface PendingCreateStandbyWorkspacesRequest {
  UserName?: string;
  DirectoryId?: string;
  State?: WorkspaceState;
  WorkspaceId?: string;
}
export const PendingCreateStandbyWorkspacesRequest = S.suspend(() =>
  S.Struct({
    UserName: S.optional(S.String),
    DirectoryId: S.optional(S.String),
    State: S.optional(WorkspaceState),
    WorkspaceId: S.optional(S.String),
  }),
).annotate({
  identifier: "PendingCreateStandbyWorkspacesRequest",
}) as any as S.Schema<PendingCreateStandbyWorkspacesRequest>;
export type PendingCreateStandbyWorkspacesRequestList =
  PendingCreateStandbyWorkspacesRequest[];
export const PendingCreateStandbyWorkspacesRequestList = S.Array(
  PendingCreateStandbyWorkspacesRequest,
);
export interface CreateStandbyWorkspacesResult {
  FailedStandbyRequests?: FailedCreateStandbyWorkspacesRequest[];
  PendingStandbyRequests?: PendingCreateStandbyWorkspacesRequest[];
}
export const CreateStandbyWorkspacesResult = S.suspend(() =>
  S.Struct({
    FailedStandbyRequests: S.optional(FailedCreateStandbyWorkspacesRequestList),
    PendingStandbyRequests: S.optional(
      PendingCreateStandbyWorkspacesRequestList,
    ),
  }).pipe(ns),
).annotate({
  identifier: "CreateStandbyWorkspacesResult",
}) as any as S.Schema<CreateStandbyWorkspacesResult>;
export interface CreateTagsRequest {
  ResourceId: string;
  Tags: Tag[];
}
export const CreateTagsRequest = S.suspend(() =>
  S.Struct({ ResourceId: S.String, Tags: TagList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateTagsRequest",
}) as any as S.Schema<CreateTagsRequest>;
export interface CreateTagsResult {}
export const CreateTagsResult = S.suspend(() => S.Struct({}).pipe(ns)).annotate(
  { identifier: "CreateTagsResult" },
) as any as S.Schema<CreateTagsResult>;
export interface CreateUpdatedWorkspaceImageRequest {
  Name: string;
  Description: string;
  SourceImageId: string;
  Tags?: Tag[];
}
export const CreateUpdatedWorkspaceImageRequest = S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.String,
    SourceImageId: S.String,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateUpdatedWorkspaceImageRequest",
}) as any as S.Schema<CreateUpdatedWorkspaceImageRequest>;
export interface CreateUpdatedWorkspaceImageResult {
  ImageId?: string;
}
export const CreateUpdatedWorkspaceImageResult = S.suspend(() =>
  S.Struct({ ImageId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateUpdatedWorkspaceImageResult",
}) as any as S.Schema<CreateUpdatedWorkspaceImageResult>;
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
export const Compute = S.String;
export interface ComputeType {
  Name?: Compute;
}
export const ComputeType = S.suspend(() =>
  S.Struct({ Name: S.optional(Compute) }),
).annotate({ identifier: "ComputeType" }) as any as S.Schema<ComputeType>;
export interface UserStorage {
  Capacity: string;
}
export const UserStorage = S.suspend(() =>
  S.Struct({ Capacity: S.String }),
).annotate({ identifier: "UserStorage" }) as any as S.Schema<UserStorage>;
export interface RootStorage {
  Capacity: string;
}
export const RootStorage = S.suspend(() =>
  S.Struct({ Capacity: S.String }),
).annotate({ identifier: "RootStorage" }) as any as S.Schema<RootStorage>;
export interface CreateWorkspaceBundleRequest {
  BundleName: string;
  BundleDescription: string;
  ImageId: string;
  ComputeType: ComputeType;
  UserStorage: UserStorage;
  RootStorage?: RootStorage;
  Tags?: Tag[];
}
export const CreateWorkspaceBundleRequest = S.suspend(() =>
  S.Struct({
    BundleName: S.String,
    BundleDescription: S.String,
    ImageId: S.String,
    ComputeType: ComputeType,
    UserStorage: UserStorage,
    RootStorage: S.optional(RootStorage),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateWorkspaceBundleRequest",
}) as any as S.Schema<CreateWorkspaceBundleRequest>;
export type WorkspaceBundleState =
  | "AVAILABLE"
  | "PENDING"
  | "ERROR"
  | (string & {});
export const WorkspaceBundleState = S.String;
export type BundleType = "REGULAR" | "STANDBY" | (string & {});
export const BundleType = S.String;
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
export const WorkspaceBundle = S.suspend(() =>
  S.Struct({
    BundleId: S.optional(S.String),
    Name: S.optional(S.String),
    Owner: S.optional(S.String),
    Description: S.optional(S.String),
    ImageId: S.optional(S.String),
    RootStorage: S.optional(RootStorage),
    UserStorage: S.optional(UserStorage),
    ComputeType: S.optional(ComputeType),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    State: S.optional(WorkspaceBundleState),
    BundleType: S.optional(BundleType),
  }),
).annotate({
  identifier: "WorkspaceBundle",
}) as any as S.Schema<WorkspaceBundle>;
export interface CreateWorkspaceBundleResult {
  WorkspaceBundle?: WorkspaceBundle;
}
export const CreateWorkspaceBundleResult = S.suspend(() =>
  S.Struct({ WorkspaceBundle: S.optional(WorkspaceBundle) }).pipe(ns),
).annotate({
  identifier: "CreateWorkspaceBundleResult",
}) as any as S.Schema<CreateWorkspaceBundleResult>;
export interface CreateWorkspaceImageRequest {
  Name: string;
  Description: string;
  WorkspaceId: string;
  Tags?: Tag[];
}
export const CreateWorkspaceImageRequest = S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.String,
    WorkspaceId: S.String,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateWorkspaceImageRequest",
}) as any as S.Schema<CreateWorkspaceImageRequest>;
export type OperatingSystemType = "WINDOWS" | "LINUX" | (string & {});
export const OperatingSystemType = S.String;
export interface OperatingSystem {
  Type?: OperatingSystemType;
}
export const OperatingSystem = S.suspend(() =>
  S.Struct({ Type: S.optional(OperatingSystemType) }),
).annotate({
  identifier: "OperatingSystem",
}) as any as S.Schema<OperatingSystem>;
export type WorkspaceImageState =
  | "AVAILABLE"
  | "PENDING"
  | "ERROR"
  | (string & {});
export const WorkspaceImageState = S.String;
export type WorkspaceImageRequiredTenancy =
  | "DEFAULT"
  | "DEDICATED"
  | (string & {});
export const WorkspaceImageRequiredTenancy = S.String;
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
export const CreateWorkspaceImageResult = S.suspend(() =>
  S.Struct({
    ImageId: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    OperatingSystem: S.optional(OperatingSystem),
    State: S.optional(WorkspaceImageState),
    RequiredTenancy: S.optional(WorkspaceImageRequiredTenancy),
    Created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    OwnerAccountId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateWorkspaceImageResult",
}) as any as S.Schema<CreateWorkspaceImageResult>;
export type RunningMode = "AUTO_STOP" | "ALWAYS_ON" | "MANUAL" | (string & {});
export const RunningMode = S.String;
export type Protocol = "PCOIP" | "WSP" | (string & {});
export const Protocol = S.String;
export type ProtocolList = Protocol[];
export const ProtocolList = S.Array(Protocol);
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
  | "RHEL_8"
  | "ROCKY_8"
  | (string & {});
export const OperatingSystemName = S.String;
export type AGAModeForWorkSpaceEnum =
  | "ENABLED_AUTO"
  | "DISABLED"
  | "INHERITED"
  | (string & {});
export const AGAModeForWorkSpaceEnum = S.String;
export type AGAPreferredProtocolForWorkSpace =
  | "TCP"
  | "NONE"
  | "INHERITED"
  | (string & {});
export const AGAPreferredProtocolForWorkSpace = S.String;
export interface GlobalAcceleratorForWorkSpace {
  Mode: AGAModeForWorkSpaceEnum;
  PreferredProtocol?: AGAPreferredProtocolForWorkSpace;
}
export const GlobalAcceleratorForWorkSpace = S.suspend(() =>
  S.Struct({
    Mode: AGAModeForWorkSpaceEnum,
    PreferredProtocol: S.optional(AGAPreferredProtocolForWorkSpace),
  }),
).annotate({
  identifier: "GlobalAcceleratorForWorkSpace",
}) as any as S.Schema<GlobalAcceleratorForWorkSpace>;
export interface WorkspaceProperties {
  RunningMode?: RunningMode;
  RunningModeAutoStopTimeoutInMinutes?: number;
  RootVolumeSizeGib?: number;
  UserVolumeSizeGib?: number;
  ComputeTypeName?: Compute;
  Protocols?: Protocol[];
  OperatingSystemName?: OperatingSystemName;
  GlobalAccelerator?: GlobalAcceleratorForWorkSpace;
}
export const WorkspaceProperties = S.suspend(() =>
  S.Struct({
    RunningMode: S.optional(RunningMode),
    RunningModeAutoStopTimeoutInMinutes: S.optional(S.Number),
    RootVolumeSizeGib: S.optional(S.Number),
    UserVolumeSizeGib: S.optional(S.Number),
    ComputeTypeName: S.optional(Compute),
    Protocols: S.optional(ProtocolList),
    OperatingSystemName: S.optional(OperatingSystemName),
    GlobalAccelerator: S.optional(GlobalAcceleratorForWorkSpace),
  }),
).annotate({
  identifier: "WorkspaceProperties",
}) as any as S.Schema<WorkspaceProperties>;
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
export const WorkspaceRequest = S.suspend(() =>
  S.Struct({
    DirectoryId: S.String,
    UserName: S.String,
    BundleId: S.String,
    VolumeEncryptionKey: S.optional(S.String),
    UserVolumeEncryptionEnabled: S.optional(S.Boolean),
    RootVolumeEncryptionEnabled: S.optional(S.Boolean),
    WorkspaceProperties: S.optional(WorkspaceProperties),
    Tags: S.optional(TagList),
    WorkspaceName: S.optional(S.String),
    Ipv6Address: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkspaceRequest",
}) as any as S.Schema<WorkspaceRequest>;
export type WorkspaceRequestList = WorkspaceRequest[];
export const WorkspaceRequestList = S.Array(WorkspaceRequest);
export interface CreateWorkspacesRequest {
  Workspaces: WorkspaceRequest[];
}
export const CreateWorkspacesRequest = S.suspend(() =>
  S.Struct({ Workspaces: WorkspaceRequestList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateWorkspacesRequest",
}) as any as S.Schema<CreateWorkspacesRequest>;
export interface FailedCreateWorkspaceRequest {
  WorkspaceRequest?: WorkspaceRequest;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export const FailedCreateWorkspaceRequest = S.suspend(() =>
  S.Struct({
    WorkspaceRequest: S.optional(WorkspaceRequest),
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "FailedCreateWorkspaceRequest",
}) as any as S.Schema<FailedCreateWorkspaceRequest>;
export type FailedCreateWorkspaceRequests = FailedCreateWorkspaceRequest[];
export const FailedCreateWorkspaceRequests = S.Array(
  FailedCreateWorkspaceRequest,
);
export type ModificationResourceEnum =
  | "ROOT_VOLUME"
  | "USER_VOLUME"
  | "COMPUTE_TYPE"
  | (string & {});
export const ModificationResourceEnum = S.String;
export type ModificationStateEnum =
  | "UPDATE_INITIATED"
  | "UPDATE_IN_PROGRESS"
  | (string & {});
export const ModificationStateEnum = S.String;
export interface ModificationState {
  Resource?: ModificationResourceEnum;
  State?: ModificationStateEnum;
}
export const ModificationState = S.suspend(() =>
  S.Struct({
    Resource: S.optional(ModificationResourceEnum),
    State: S.optional(ModificationStateEnum),
  }),
).annotate({
  identifier: "ModificationState",
}) as any as S.Schema<ModificationState>;
export type ModificationStateList = ModificationState[];
export const ModificationStateList = S.Array(ModificationState);
export type StandbyWorkspaceRelationshipType =
  | "PRIMARY"
  | "STANDBY"
  | (string & {});
export const StandbyWorkspaceRelationshipType = S.String;
export interface RelatedWorkspaceProperties {
  WorkspaceId?: string;
  Region?: string;
  State?: WorkspaceState;
  Type?: StandbyWorkspaceRelationshipType;
}
export const RelatedWorkspaceProperties = S.suspend(() =>
  S.Struct({
    WorkspaceId: S.optional(S.String),
    Region: S.optional(S.String),
    State: S.optional(WorkspaceState),
    Type: S.optional(StandbyWorkspaceRelationshipType),
  }),
).annotate({
  identifier: "RelatedWorkspaceProperties",
}) as any as S.Schema<RelatedWorkspaceProperties>;
export type RelatedWorkspaces = RelatedWorkspaceProperties[];
export const RelatedWorkspaces = S.Array(RelatedWorkspaceProperties);
export interface DataReplicationSettings {
  DataReplication?: DataReplication;
  RecoverySnapshotTime?: Date;
}
export const DataReplicationSettings = S.suspend(() =>
  S.Struct({
    DataReplication: S.optional(DataReplication),
    RecoverySnapshotTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DataReplicationSettings",
}) as any as S.Schema<DataReplicationSettings>;
export interface StandbyWorkspacesProperties {
  StandbyWorkspaceId?: string;
  DataReplication?: DataReplication;
  RecoverySnapshotTime?: Date;
}
export const StandbyWorkspacesProperties = S.suspend(() =>
  S.Struct({
    StandbyWorkspaceId: S.optional(S.String),
    DataReplication: S.optional(DataReplication),
    RecoverySnapshotTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "StandbyWorkspacesProperties",
}) as any as S.Schema<StandbyWorkspacesProperties>;
export type StandbyWorkspacesPropertiesList = StandbyWorkspacesProperties[];
export const StandbyWorkspacesPropertiesList = S.Array(
  StandbyWorkspacesProperties,
);
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
export const Workspace = S.suspend(() =>
  S.Struct({
    WorkspaceId: S.optional(S.String),
    DirectoryId: S.optional(S.String),
    UserName: S.optional(S.String),
    IpAddress: S.optional(S.String),
    Ipv6Address: S.optional(S.String),
    State: S.optional(WorkspaceState),
    BundleId: S.optional(S.String),
    SubnetId: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
    ErrorCode: S.optional(S.String),
    ComputerName: S.optional(S.String),
    VolumeEncryptionKey: S.optional(S.String),
    UserVolumeEncryptionEnabled: S.optional(S.Boolean),
    RootVolumeEncryptionEnabled: S.optional(S.Boolean),
    WorkspaceName: S.optional(S.String),
    WorkspaceProperties: S.optional(WorkspaceProperties),
    ModificationStates: S.optional(ModificationStateList),
    RelatedWorkspaces: S.optional(RelatedWorkspaces),
    DataReplicationSettings: S.optional(DataReplicationSettings),
    StandbyWorkspacesProperties: S.optional(StandbyWorkspacesPropertiesList),
  }),
).annotate({ identifier: "Workspace" }) as any as S.Schema<Workspace>;
export type WorkspaceList = Workspace[];
export const WorkspaceList = S.Array(Workspace);
export interface CreateWorkspacesResult {
  FailedRequests?: FailedCreateWorkspaceRequest[];
  PendingRequests?: Workspace[];
}
export const CreateWorkspacesResult = S.suspend(() =>
  S.Struct({
    FailedRequests: S.optional(FailedCreateWorkspaceRequests),
    PendingRequests: S.optional(WorkspaceList),
  }).pipe(ns),
).annotate({
  identifier: "CreateWorkspacesResult",
}) as any as S.Schema<CreateWorkspacesResult>;
export interface Capacity {
  DesiredUserSessions: number;
}
export const Capacity = S.suspend(() =>
  S.Struct({ DesiredUserSessions: S.Number }),
).annotate({ identifier: "Capacity" }) as any as S.Schema<Capacity>;
export type ApplicationSettingsStatusEnum =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const ApplicationSettingsStatusEnum = S.String;
export interface ApplicationSettingsRequest {
  Status: ApplicationSettingsStatusEnum;
  SettingsGroup?: string;
}
export const ApplicationSettingsRequest = S.suspend(() =>
  S.Struct({
    Status: ApplicationSettingsStatusEnum,
    SettingsGroup: S.optional(S.String),
  }),
).annotate({
  identifier: "ApplicationSettingsRequest",
}) as any as S.Schema<ApplicationSettingsRequest>;
export interface TimeoutSettings {
  DisconnectTimeoutInSeconds?: number;
  IdleDisconnectTimeoutInSeconds?: number;
  MaxUserDurationInSeconds?: number;
}
export const TimeoutSettings = S.suspend(() =>
  S.Struct({
    DisconnectTimeoutInSeconds: S.optional(S.Number),
    IdleDisconnectTimeoutInSeconds: S.optional(S.Number),
    MaxUserDurationInSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "TimeoutSettings",
}) as any as S.Schema<TimeoutSettings>;
export type PoolsRunningMode = "AUTO_STOP" | "ALWAYS_ON" | (string & {});
export const PoolsRunningMode = S.String;
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
export const CreateWorkspacesPoolRequest = S.suspend(() =>
  S.Struct({
    PoolName: S.String,
    Description: S.String,
    BundleId: S.String,
    DirectoryId: S.String,
    Capacity: Capacity,
    Tags: S.optional(TagList),
    ApplicationSettings: S.optional(ApplicationSettingsRequest),
    TimeoutSettings: S.optional(TimeoutSettings),
    RunningMode: S.optional(PoolsRunningMode),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateWorkspacesPoolRequest",
}) as any as S.Schema<CreateWorkspacesPoolRequest>;
export interface CapacityStatus {
  AvailableUserSessions: number;
  DesiredUserSessions: number;
  ActualUserSessions: number;
  ActiveUserSessions: number;
}
export const CapacityStatus = S.suspend(() =>
  S.Struct({
    AvailableUserSessions: S.Number,
    DesiredUserSessions: S.Number,
    ActualUserSessions: S.Number,
    ActiveUserSessions: S.Number,
  }),
).annotate({ identifier: "CapacityStatus" }) as any as S.Schema<CapacityStatus>;
export type WorkspacesPoolState =
  | "CREATING"
  | "DELETING"
  | "RUNNING"
  | "STARTING"
  | "STOPPED"
  | "STOPPING"
  | "UPDATING"
  | (string & {});
export const WorkspacesPoolState = S.String;
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
export const WorkspacesPoolErrorCode = S.String;
export interface WorkspacesPoolError {
  ErrorCode?: WorkspacesPoolErrorCode;
  ErrorMessage?: string;
}
export const WorkspacesPoolError = S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(WorkspacesPoolErrorCode),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkspacesPoolError",
}) as any as S.Schema<WorkspacesPoolError>;
export type WorkspacesPoolErrors = WorkspacesPoolError[];
export const WorkspacesPoolErrors = S.Array(WorkspacesPoolError);
export interface ApplicationSettingsResponse {
  Status: ApplicationSettingsStatusEnum;
  SettingsGroup?: string;
  S3BucketName?: string;
}
export const ApplicationSettingsResponse = S.suspend(() =>
  S.Struct({
    Status: ApplicationSettingsStatusEnum,
    SettingsGroup: S.optional(S.String),
    S3BucketName: S.optional(S.String),
  }),
).annotate({
  identifier: "ApplicationSettingsResponse",
}) as any as S.Schema<ApplicationSettingsResponse>;
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
export const WorkspacesPool = S.suspend(() =>
  S.Struct({
    PoolId: S.String,
    PoolArn: S.String,
    CapacityStatus: CapacityStatus,
    PoolName: S.String,
    Description: S.optional(S.String),
    State: WorkspacesPoolState,
    CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    BundleId: S.String,
    DirectoryId: S.String,
    Errors: S.optional(WorkspacesPoolErrors),
    ApplicationSettings: S.optional(ApplicationSettingsResponse),
    TimeoutSettings: S.optional(TimeoutSettings),
    RunningMode: PoolsRunningMode,
  }),
).annotate({ identifier: "WorkspacesPool" }) as any as S.Schema<WorkspacesPool>;
export interface CreateWorkspacesPoolResult {
  WorkspacesPool?: WorkspacesPool;
}
export const CreateWorkspacesPoolResult = S.suspend(() =>
  S.Struct({ WorkspacesPool: S.optional(WorkspacesPool) }).pipe(ns),
).annotate({
  identifier: "CreateWorkspacesPoolResult",
}) as any as S.Schema<CreateWorkspacesPoolResult>;
export interface DeleteAccountLinkInvitationRequest {
  LinkId: string;
  ClientToken?: string;
}
export const DeleteAccountLinkInvitationRequest = S.suspend(() =>
  S.Struct({ LinkId: S.String, ClientToken: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAccountLinkInvitationRequest",
}) as any as S.Schema<DeleteAccountLinkInvitationRequest>;
export interface DeleteAccountLinkInvitationResult {
  AccountLink?: AccountLink;
}
export const DeleteAccountLinkInvitationResult = S.suspend(() =>
  S.Struct({ AccountLink: S.optional(AccountLink) }).pipe(ns),
).annotate({
  identifier: "DeleteAccountLinkInvitationResult",
}) as any as S.Schema<DeleteAccountLinkInvitationResult>;
export type ClientDeviceType =
  | "DeviceTypeWindows"
  | "DeviceTypeOsx"
  | "DeviceTypeAndroid"
  | "DeviceTypeIos"
  | "DeviceTypeLinux"
  | "DeviceTypeWeb"
  | (string & {});
export const ClientDeviceType = S.String;
export type ClientDeviceTypeList = ClientDeviceType[];
export const ClientDeviceTypeList = S.Array(ClientDeviceType);
export interface DeleteClientBrandingRequest {
  ResourceId: string;
  Platforms: ClientDeviceType[];
}
export const DeleteClientBrandingRequest = S.suspend(() =>
  S.Struct({ ResourceId: S.String, Platforms: ClientDeviceTypeList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteClientBrandingRequest",
}) as any as S.Schema<DeleteClientBrandingRequest>;
export interface DeleteClientBrandingResult {}
export const DeleteClientBrandingResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteClientBrandingResult",
}) as any as S.Schema<DeleteClientBrandingResult>;
export interface DeleteConnectClientAddInRequest {
  AddInId: string;
  ResourceId: string;
}
export const DeleteConnectClientAddInRequest = S.suspend(() =>
  S.Struct({ AddInId: S.String, ResourceId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConnectClientAddInRequest",
}) as any as S.Schema<DeleteConnectClientAddInRequest>;
export interface DeleteConnectClientAddInResult {}
export const DeleteConnectClientAddInResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteConnectClientAddInResult",
}) as any as S.Schema<DeleteConnectClientAddInResult>;
export interface DeleteConnectionAliasRequest {
  AliasId: string;
}
export const DeleteConnectionAliasRequest = S.suspend(() =>
  S.Struct({ AliasId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConnectionAliasRequest",
}) as any as S.Schema<DeleteConnectionAliasRequest>;
export interface DeleteConnectionAliasResult {}
export const DeleteConnectionAliasResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteConnectionAliasResult",
}) as any as S.Schema<DeleteConnectionAliasResult>;
export interface DeleteIpGroupRequest {
  GroupId: string;
}
export const DeleteIpGroupRequest = S.suspend(() =>
  S.Struct({ GroupId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIpGroupRequest",
}) as any as S.Schema<DeleteIpGroupRequest>;
export interface DeleteIpGroupResult {}
export const DeleteIpGroupResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteIpGroupResult",
}) as any as S.Schema<DeleteIpGroupResult>;
export type TagKeyList = string[];
export const TagKeyList = S.Array(S.String);
export interface DeleteTagsRequest {
  ResourceId: string;
  TagKeys: string[];
}
export const DeleteTagsRequest = S.suspend(() =>
  S.Struct({ ResourceId: S.String, TagKeys: TagKeyList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTagsRequest",
}) as any as S.Schema<DeleteTagsRequest>;
export interface DeleteTagsResult {}
export const DeleteTagsResult = S.suspend(() => S.Struct({}).pipe(ns)).annotate(
  { identifier: "DeleteTagsResult" },
) as any as S.Schema<DeleteTagsResult>;
export interface DeleteWorkspaceBundleRequest {
  BundleId?: string;
}
export const DeleteWorkspaceBundleRequest = S.suspend(() =>
  S.Struct({ BundleId: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteWorkspaceBundleRequest",
}) as any as S.Schema<DeleteWorkspaceBundleRequest>;
export interface DeleteWorkspaceBundleResult {}
export const DeleteWorkspaceBundleResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteWorkspaceBundleResult",
}) as any as S.Schema<DeleteWorkspaceBundleResult>;
export interface DeleteWorkspaceImageRequest {
  ImageId: string;
}
export const DeleteWorkspaceImageRequest = S.suspend(() =>
  S.Struct({ ImageId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteWorkspaceImageRequest",
}) as any as S.Schema<DeleteWorkspaceImageRequest>;
export interface DeleteWorkspaceImageResult {}
export const DeleteWorkspaceImageResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteWorkspaceImageResult",
}) as any as S.Schema<DeleteWorkspaceImageResult>;
export interface DeployWorkspaceApplicationsRequest {
  WorkspaceId: string;
  Force?: boolean;
}
export const DeployWorkspaceApplicationsRequest = S.suspend(() =>
  S.Struct({ WorkspaceId: S.String, Force: S.optional(S.Boolean) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeployWorkspaceApplicationsRequest",
}) as any as S.Schema<DeployWorkspaceApplicationsRequest>;
export type WorkspaceResourceAssociationList = WorkspaceResourceAssociation[];
export const WorkspaceResourceAssociationList = S.Array(
  WorkspaceResourceAssociation,
);
export interface WorkSpaceApplicationDeployment {
  Associations?: WorkspaceResourceAssociation[];
}
export const WorkSpaceApplicationDeployment = S.suspend(() =>
  S.Struct({ Associations: S.optional(WorkspaceResourceAssociationList) }),
).annotate({
  identifier: "WorkSpaceApplicationDeployment",
}) as any as S.Schema<WorkSpaceApplicationDeployment>;
export interface DeployWorkspaceApplicationsResult {
  Deployment?: WorkSpaceApplicationDeployment;
}
export const DeployWorkspaceApplicationsResult = S.suspend(() =>
  S.Struct({ Deployment: S.optional(WorkSpaceApplicationDeployment) }).pipe(ns),
).annotate({
  identifier: "DeployWorkspaceApplicationsResult",
}) as any as S.Schema<DeployWorkspaceApplicationsResult>;
export interface DeregisterWorkspaceDirectoryRequest {
  DirectoryId: string;
}
export const DeregisterWorkspaceDirectoryRequest = S.suspend(() =>
  S.Struct({ DirectoryId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeregisterWorkspaceDirectoryRequest",
}) as any as S.Schema<DeregisterWorkspaceDirectoryRequest>;
export interface DeregisterWorkspaceDirectoryResult {}
export const DeregisterWorkspaceDirectoryResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeregisterWorkspaceDirectoryResult",
}) as any as S.Schema<DeregisterWorkspaceDirectoryResult>;
export interface DescribeAccountRequest {}
export const DescribeAccountRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAccountRequest",
}) as any as S.Schema<DescribeAccountRequest>;
export type DedicatedTenancySupportResultEnum =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const DedicatedTenancySupportResultEnum = S.String;
export type DedicatedTenancyAccountType =
  | "SOURCE_ACCOUNT"
  | "TARGET_ACCOUNT"
  | (string & {});
export const DedicatedTenancyAccountType = S.String;
export interface DescribeAccountResult {
  DedicatedTenancySupport?: DedicatedTenancySupportResultEnum;
  DedicatedTenancyManagementCidrRange?: string;
  DedicatedTenancyAccountType?: DedicatedTenancyAccountType;
  Message?: string;
}
export const DescribeAccountResult = S.suspend(() =>
  S.Struct({
    DedicatedTenancySupport: S.optional(DedicatedTenancySupportResultEnum),
    DedicatedTenancyManagementCidrRange: S.optional(S.String),
    DedicatedTenancyAccountType: S.optional(DedicatedTenancyAccountType),
    Message: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeAccountResult",
}) as any as S.Schema<DescribeAccountResult>;
export interface DescribeAccountModificationsRequest {
  NextToken?: string;
}
export const DescribeAccountModificationsRequest = S.suspend(() =>
  S.Struct({ NextToken: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAccountModificationsRequest",
}) as any as S.Schema<DescribeAccountModificationsRequest>;
export type DedicatedTenancyModificationStateEnum =
  | "PENDING"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export const DedicatedTenancyModificationStateEnum = S.String;
export interface AccountModification {
  ModificationState?: DedicatedTenancyModificationStateEnum;
  DedicatedTenancySupport?: DedicatedTenancySupportResultEnum;
  DedicatedTenancyManagementCidrRange?: string;
  StartTime?: Date;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export const AccountModification = S.suspend(() =>
  S.Struct({
    ModificationState: S.optional(DedicatedTenancyModificationStateEnum),
    DedicatedTenancySupport: S.optional(DedicatedTenancySupportResultEnum),
    DedicatedTenancyManagementCidrRange: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "AccountModification",
}) as any as S.Schema<AccountModification>;
export type AccountModificationList = AccountModification[];
export const AccountModificationList = S.Array(AccountModification);
export interface DescribeAccountModificationsResult {
  AccountModifications?: AccountModification[];
  NextToken?: string;
}
export const DescribeAccountModificationsResult = S.suspend(() =>
  S.Struct({
    AccountModifications: S.optional(AccountModificationList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeAccountModificationsResult",
}) as any as S.Schema<DescribeAccountModificationsResult>;
export type ApplicationAssociatedResourceType =
  | "WORKSPACE"
  | "BUNDLE"
  | "IMAGE"
  | (string & {});
export const ApplicationAssociatedResourceType = S.String;
export type ApplicationAssociatedResourceTypeList =
  ApplicationAssociatedResourceType[];
export const ApplicationAssociatedResourceTypeList = S.Array(
  ApplicationAssociatedResourceType,
);
export interface DescribeApplicationAssociationsRequest {
  MaxResults?: number;
  NextToken?: string;
  ApplicationId: string;
  AssociatedResourceTypes: ApplicationAssociatedResourceType[];
}
export const DescribeApplicationAssociationsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    ApplicationId: S.String,
    AssociatedResourceTypes: ApplicationAssociatedResourceTypeList,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeApplicationAssociationsRequest",
}) as any as S.Schema<DescribeApplicationAssociationsRequest>;
export interface ApplicationResourceAssociation {
  ApplicationId?: string;
  AssociatedResourceId?: string;
  AssociatedResourceType?: ApplicationAssociatedResourceType;
  Created?: Date;
  LastUpdatedTime?: Date;
  State?: AssociationState;
  StateReason?: AssociationStateReason;
}
export const ApplicationResourceAssociation = S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    AssociatedResourceId: S.optional(S.String),
    AssociatedResourceType: S.optional(ApplicationAssociatedResourceType),
    Created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    State: S.optional(AssociationState),
    StateReason: S.optional(AssociationStateReason),
  }),
).annotate({
  identifier: "ApplicationResourceAssociation",
}) as any as S.Schema<ApplicationResourceAssociation>;
export type ApplicationResourceAssociationList =
  ApplicationResourceAssociation[];
export const ApplicationResourceAssociationList = S.Array(
  ApplicationResourceAssociation,
);
export interface DescribeApplicationAssociationsResult {
  Associations?: ApplicationResourceAssociation[];
  NextToken?: string;
}
export const DescribeApplicationAssociationsResult = S.suspend(() =>
  S.Struct({
    Associations: S.optional(ApplicationResourceAssociationList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeApplicationAssociationsResult",
}) as any as S.Schema<DescribeApplicationAssociationsResult>;
export type WorkSpaceApplicationIdList = string[];
export const WorkSpaceApplicationIdList = S.Array(S.String);
export type ComputeList = Compute[];
export const ComputeList = S.Array(Compute);
export type WorkSpaceApplicationLicenseType =
  | "LICENSED"
  | "UNLICENSED"
  | (string & {});
export const WorkSpaceApplicationLicenseType = S.String;
export type OperatingSystemNameList = OperatingSystemName[];
export const OperatingSystemNameList = S.Array(OperatingSystemName);
export interface DescribeApplicationsRequest {
  ApplicationIds?: string[];
  ComputeTypeNames?: Compute[];
  LicenseType?: WorkSpaceApplicationLicenseType;
  OperatingSystemNames?: OperatingSystemName[];
  Owner?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeApplicationsRequest = S.suspend(() =>
  S.Struct({
    ApplicationIds: S.optional(WorkSpaceApplicationIdList),
    ComputeTypeNames: S.optional(ComputeList),
    LicenseType: S.optional(WorkSpaceApplicationLicenseType),
    OperatingSystemNames: S.optional(OperatingSystemNameList),
    Owner: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeApplicationsRequest",
}) as any as S.Schema<DescribeApplicationsRequest>;
export type WorkSpaceApplicationState =
  | "PENDING"
  | "ERROR"
  | "AVAILABLE"
  | "UNINSTALL_ONLY"
  | (string & {});
export const WorkSpaceApplicationState = S.String;
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
export const WorkSpaceApplication = S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    Created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Description: S.optional(S.String),
    LicenseType: S.optional(WorkSpaceApplicationLicenseType),
    Name: S.optional(S.String),
    Owner: S.optional(S.String),
    State: S.optional(WorkSpaceApplicationState),
    SupportedComputeTypeNames: S.optional(ComputeList),
    SupportedOperatingSystemNames: S.optional(OperatingSystemNameList),
  }),
).annotate({
  identifier: "WorkSpaceApplication",
}) as any as S.Schema<WorkSpaceApplication>;
export type WorkSpaceApplicationList = WorkSpaceApplication[];
export const WorkSpaceApplicationList = S.Array(WorkSpaceApplication);
export interface DescribeApplicationsResult {
  Applications?: WorkSpaceApplication[];
  NextToken?: string;
}
export const DescribeApplicationsResult = S.suspend(() =>
  S.Struct({
    Applications: S.optional(WorkSpaceApplicationList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeApplicationsResult",
}) as any as S.Schema<DescribeApplicationsResult>;
export type BundleAssociatedResourceType = "APPLICATION" | (string & {});
export const BundleAssociatedResourceType = S.String;
export type BundleAssociatedResourceTypeList = BundleAssociatedResourceType[];
export const BundleAssociatedResourceTypeList = S.Array(
  BundleAssociatedResourceType,
);
export interface DescribeBundleAssociationsRequest {
  BundleId: string;
  AssociatedResourceTypes: BundleAssociatedResourceType[];
}
export const DescribeBundleAssociationsRequest = S.suspend(() =>
  S.Struct({
    BundleId: S.String,
    AssociatedResourceTypes: BundleAssociatedResourceTypeList,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeBundleAssociationsRequest",
}) as any as S.Schema<DescribeBundleAssociationsRequest>;
export interface BundleResourceAssociation {
  AssociatedResourceId?: string;
  AssociatedResourceType?: BundleAssociatedResourceType;
  BundleId?: string;
  Created?: Date;
  LastUpdatedTime?: Date;
  State?: AssociationState;
  StateReason?: AssociationStateReason;
}
export const BundleResourceAssociation = S.suspend(() =>
  S.Struct({
    AssociatedResourceId: S.optional(S.String),
    AssociatedResourceType: S.optional(BundleAssociatedResourceType),
    BundleId: S.optional(S.String),
    Created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    State: S.optional(AssociationState),
    StateReason: S.optional(AssociationStateReason),
  }),
).annotate({
  identifier: "BundleResourceAssociation",
}) as any as S.Schema<BundleResourceAssociation>;
export type BundleResourceAssociationList = BundleResourceAssociation[];
export const BundleResourceAssociationList = S.Array(BundleResourceAssociation);
export interface DescribeBundleAssociationsResult {
  Associations?: BundleResourceAssociation[];
}
export const DescribeBundleAssociationsResult = S.suspend(() =>
  S.Struct({ Associations: S.optional(BundleResourceAssociationList) }).pipe(
    ns,
  ),
).annotate({
  identifier: "DescribeBundleAssociationsResult",
}) as any as S.Schema<DescribeBundleAssociationsResult>;
export interface DescribeClientBrandingRequest {
  ResourceId: string;
}
export const DescribeClientBrandingRequest = S.suspend(() =>
  S.Struct({ ResourceId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeClientBrandingRequest",
}) as any as S.Schema<DescribeClientBrandingRequest>;
export type LoginMessage = { [key: string]: string | undefined };
export const LoginMessage = S.Record(S.String, S.String.pipe(S.optional));
export interface DefaultClientBrandingAttributes {
  LogoUrl?: string;
  SupportEmail?: string;
  SupportLink?: string;
  ForgotPasswordLink?: string;
  LoginMessage?: { [key: string]: string | undefined };
}
export const DefaultClientBrandingAttributes = S.suspend(() =>
  S.Struct({
    LogoUrl: S.optional(S.String),
    SupportEmail: S.optional(S.String),
    SupportLink: S.optional(S.String),
    ForgotPasswordLink: S.optional(S.String),
    LoginMessage: S.optional(LoginMessage),
  }),
).annotate({
  identifier: "DefaultClientBrandingAttributes",
}) as any as S.Schema<DefaultClientBrandingAttributes>;
export interface IosClientBrandingAttributes {
  LogoUrl?: string;
  Logo2xUrl?: string;
  Logo3xUrl?: string;
  SupportEmail?: string;
  SupportLink?: string;
  ForgotPasswordLink?: string;
  LoginMessage?: { [key: string]: string | undefined };
}
export const IosClientBrandingAttributes = S.suspend(() =>
  S.Struct({
    LogoUrl: S.optional(S.String),
    Logo2xUrl: S.optional(S.String),
    Logo3xUrl: S.optional(S.String),
    SupportEmail: S.optional(S.String),
    SupportLink: S.optional(S.String),
    ForgotPasswordLink: S.optional(S.String),
    LoginMessage: S.optional(LoginMessage),
  }),
).annotate({
  identifier: "IosClientBrandingAttributes",
}) as any as S.Schema<IosClientBrandingAttributes>;
export interface DescribeClientBrandingResult {
  DeviceTypeWindows?: DefaultClientBrandingAttributes;
  DeviceTypeOsx?: DefaultClientBrandingAttributes;
  DeviceTypeAndroid?: DefaultClientBrandingAttributes;
  DeviceTypeIos?: IosClientBrandingAttributes;
  DeviceTypeLinux?: DefaultClientBrandingAttributes;
  DeviceTypeWeb?: DefaultClientBrandingAttributes;
}
export const DescribeClientBrandingResult = S.suspend(() =>
  S.Struct({
    DeviceTypeWindows: S.optional(DefaultClientBrandingAttributes),
    DeviceTypeOsx: S.optional(DefaultClientBrandingAttributes),
    DeviceTypeAndroid: S.optional(DefaultClientBrandingAttributes),
    DeviceTypeIos: S.optional(IosClientBrandingAttributes),
    DeviceTypeLinux: S.optional(DefaultClientBrandingAttributes),
    DeviceTypeWeb: S.optional(DefaultClientBrandingAttributes),
  }).pipe(ns),
).annotate({
  identifier: "DescribeClientBrandingResult",
}) as any as S.Schema<DescribeClientBrandingResult>;
export type ResourceIdList = string[];
export const ResourceIdList = S.Array(S.String);
export interface DescribeClientPropertiesRequest {
  ResourceIds: string[];
}
export const DescribeClientPropertiesRequest = S.suspend(() =>
  S.Struct({ ResourceIds: ResourceIdList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeClientPropertiesRequest",
}) as any as S.Schema<DescribeClientPropertiesRequest>;
export type ReconnectEnum = "ENABLED" | "DISABLED" | (string & {});
export const ReconnectEnum = S.String;
export type LogUploadEnum = "ENABLED" | "DISABLED" | (string & {});
export const LogUploadEnum = S.String;
export interface ClientProperties {
  ReconnectEnabled?: ReconnectEnum;
  LogUploadEnabled?: LogUploadEnum;
}
export const ClientProperties = S.suspend(() =>
  S.Struct({
    ReconnectEnabled: S.optional(ReconnectEnum),
    LogUploadEnabled: S.optional(LogUploadEnum),
  }),
).annotate({
  identifier: "ClientProperties",
}) as any as S.Schema<ClientProperties>;
export interface ClientPropertiesResult {
  ResourceId?: string;
  ClientProperties?: ClientProperties;
}
export const ClientPropertiesResult = S.suspend(() =>
  S.Struct({
    ResourceId: S.optional(S.String),
    ClientProperties: S.optional(ClientProperties),
  }),
).annotate({
  identifier: "ClientPropertiesResult",
}) as any as S.Schema<ClientPropertiesResult>;
export type ClientPropertiesList = ClientPropertiesResult[];
export const ClientPropertiesList = S.Array(ClientPropertiesResult);
export interface DescribeClientPropertiesResult {
  ClientPropertiesList?: ClientPropertiesResult[];
}
export const DescribeClientPropertiesResult = S.suspend(() =>
  S.Struct({ ClientPropertiesList: S.optional(ClientPropertiesList) }).pipe(ns),
).annotate({
  identifier: "DescribeClientPropertiesResult",
}) as any as S.Schema<DescribeClientPropertiesResult>;
export interface DescribeConnectClientAddInsRequest {
  ResourceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeConnectClientAddInsRequest = S.suspend(() =>
  S.Struct({
    ResourceId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeConnectClientAddInsRequest",
}) as any as S.Schema<DescribeConnectClientAddInsRequest>;
export interface ConnectClientAddIn {
  AddInId?: string;
  ResourceId?: string;
  Name?: string;
  URL?: string;
}
export const ConnectClientAddIn = S.suspend(() =>
  S.Struct({
    AddInId: S.optional(S.String),
    ResourceId: S.optional(S.String),
    Name: S.optional(S.String),
    URL: S.optional(S.String),
  }),
).annotate({
  identifier: "ConnectClientAddIn",
}) as any as S.Schema<ConnectClientAddIn>;
export type ConnectClientAddInList = ConnectClientAddIn[];
export const ConnectClientAddInList = S.Array(ConnectClientAddIn);
export interface DescribeConnectClientAddInsResult {
  AddIns?: ConnectClientAddIn[];
  NextToken?: string;
}
export const DescribeConnectClientAddInsResult = S.suspend(() =>
  S.Struct({
    AddIns: S.optional(ConnectClientAddInList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeConnectClientAddInsResult",
}) as any as S.Schema<DescribeConnectClientAddInsResult>;
export type ConnectionAliasIdList = string[];
export const ConnectionAliasIdList = S.Array(S.String);
export interface DescribeConnectionAliasesRequest {
  AliasIds?: string[];
  ResourceId?: string;
  Limit?: number;
  NextToken?: string;
}
export const DescribeConnectionAliasesRequest = S.suspend(() =>
  S.Struct({
    AliasIds: S.optional(ConnectionAliasIdList),
    ResourceId: S.optional(S.String),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeConnectionAliasesRequest",
}) as any as S.Schema<DescribeConnectionAliasesRequest>;
export type ConnectionAliasState =
  | "CREATING"
  | "CREATED"
  | "DELETING"
  | (string & {});
export const ConnectionAliasState = S.String;
export type AssociationStatus =
  | "NOT_ASSOCIATED"
  | "ASSOCIATED_WITH_OWNER_ACCOUNT"
  | "ASSOCIATED_WITH_SHARED_ACCOUNT"
  | "PENDING_ASSOCIATION"
  | "PENDING_DISASSOCIATION"
  | (string & {});
export const AssociationStatus = S.String;
export interface ConnectionAliasAssociation {
  AssociationStatus?: AssociationStatus;
  AssociatedAccountId?: string;
  ResourceId?: string;
  ConnectionIdentifier?: string;
}
export const ConnectionAliasAssociation = S.suspend(() =>
  S.Struct({
    AssociationStatus: S.optional(AssociationStatus),
    AssociatedAccountId: S.optional(S.String),
    ResourceId: S.optional(S.String),
    ConnectionIdentifier: S.optional(S.String),
  }),
).annotate({
  identifier: "ConnectionAliasAssociation",
}) as any as S.Schema<ConnectionAliasAssociation>;
export type ConnectionAliasAssociationList = ConnectionAliasAssociation[];
export const ConnectionAliasAssociationList = S.Array(
  ConnectionAliasAssociation,
);
export interface ConnectionAlias {
  ConnectionString?: string;
  AliasId?: string;
  State?: ConnectionAliasState;
  OwnerAccountId?: string;
  Associations?: ConnectionAliasAssociation[];
}
export const ConnectionAlias = S.suspend(() =>
  S.Struct({
    ConnectionString: S.optional(S.String),
    AliasId: S.optional(S.String),
    State: S.optional(ConnectionAliasState),
    OwnerAccountId: S.optional(S.String),
    Associations: S.optional(ConnectionAliasAssociationList),
  }),
).annotate({
  identifier: "ConnectionAlias",
}) as any as S.Schema<ConnectionAlias>;
export type ConnectionAliasList = ConnectionAlias[];
export const ConnectionAliasList = S.Array(ConnectionAlias);
export interface DescribeConnectionAliasesResult {
  ConnectionAliases?: ConnectionAlias[];
  NextToken?: string;
}
export const DescribeConnectionAliasesResult = S.suspend(() =>
  S.Struct({
    ConnectionAliases: S.optional(ConnectionAliasList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeConnectionAliasesResult",
}) as any as S.Schema<DescribeConnectionAliasesResult>;
export interface DescribeConnectionAliasPermissionsRequest {
  AliasId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeConnectionAliasPermissionsRequest = S.suspend(() =>
  S.Struct({
    AliasId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeConnectionAliasPermissionsRequest",
}) as any as S.Schema<DescribeConnectionAliasPermissionsRequest>;
export interface ConnectionAliasPermission {
  SharedAccountId: string;
  AllowAssociation: boolean;
}
export const ConnectionAliasPermission = S.suspend(() =>
  S.Struct({ SharedAccountId: S.String, AllowAssociation: S.Boolean }),
).annotate({
  identifier: "ConnectionAliasPermission",
}) as any as S.Schema<ConnectionAliasPermission>;
export type ConnectionAliasPermissions = ConnectionAliasPermission[];
export const ConnectionAliasPermissions = S.Array(ConnectionAliasPermission);
export interface DescribeConnectionAliasPermissionsResult {
  AliasId?: string;
  ConnectionAliasPermissions?: ConnectionAliasPermission[];
  NextToken?: string;
}
export const DescribeConnectionAliasPermissionsResult = S.suspend(() =>
  S.Struct({
    AliasId: S.optional(S.String),
    ConnectionAliasPermissions: S.optional(ConnectionAliasPermissions),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeConnectionAliasPermissionsResult",
}) as any as S.Schema<DescribeConnectionAliasPermissionsResult>;
export interface DescribeCustomWorkspaceImageImportRequest {
  ImageId: string;
}
export const DescribeCustomWorkspaceImageImportRequest = S.suspend(() =>
  S.Struct({ ImageId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeCustomWorkspaceImageImportRequest",
}) as any as S.Schema<DescribeCustomWorkspaceImageImportRequest>;
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
export const CustomWorkspaceImageImportState = S.String;
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
export const ImageSourceIdentifier = S.Union([
  S.Struct({ Ec2ImportTaskId: S.String }),
  S.Struct({ ImageBuildVersionArn: S.String }),
  S.Struct({ Ec2ImageId: S.String }),
]);
export interface CustomWorkspaceImageImportErrorDetails {
  ErrorCode?: string;
  ErrorMessage?: string;
}
export const CustomWorkspaceImageImportErrorDetails = S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "CustomWorkspaceImageImportErrorDetails",
}) as any as S.Schema<CustomWorkspaceImageImportErrorDetails>;
export type CustomWorkspaceImageImportErrorDetailsList =
  CustomWorkspaceImageImportErrorDetails[];
export const CustomWorkspaceImageImportErrorDetailsList = S.Array(
  CustomWorkspaceImageImportErrorDetails,
);
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
export const DescribeCustomWorkspaceImageImportResult = S.suspend(() =>
  S.Struct({
    ImageId: S.optional(S.String),
    InfrastructureConfigurationArn: S.optional(S.String),
    State: S.optional(CustomWorkspaceImageImportState),
    StateMessage: S.optional(S.String),
    ProgressPercentage: S.optional(S.Number),
    Created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ImageSource: S.optional(ImageSourceIdentifier),
    ImageBuilderInstanceId: S.optional(S.String),
    ErrorDetails: S.optional(CustomWorkspaceImageImportErrorDetailsList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeCustomWorkspaceImageImportResult",
}) as any as S.Schema<DescribeCustomWorkspaceImageImportResult>;
export type ImageAssociatedResourceType = "APPLICATION" | (string & {});
export const ImageAssociatedResourceType = S.String;
export type ImageAssociatedResourceTypeList = ImageAssociatedResourceType[];
export const ImageAssociatedResourceTypeList = S.Array(
  ImageAssociatedResourceType,
);
export interface DescribeImageAssociationsRequest {
  ImageId: string;
  AssociatedResourceTypes: ImageAssociatedResourceType[];
}
export const DescribeImageAssociationsRequest = S.suspend(() =>
  S.Struct({
    ImageId: S.String,
    AssociatedResourceTypes: ImageAssociatedResourceTypeList,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeImageAssociationsRequest",
}) as any as S.Schema<DescribeImageAssociationsRequest>;
export interface ImageResourceAssociation {
  AssociatedResourceId?: string;
  AssociatedResourceType?: ImageAssociatedResourceType;
  Created?: Date;
  LastUpdatedTime?: Date;
  ImageId?: string;
  State?: AssociationState;
  StateReason?: AssociationStateReason;
}
export const ImageResourceAssociation = S.suspend(() =>
  S.Struct({
    AssociatedResourceId: S.optional(S.String),
    AssociatedResourceType: S.optional(ImageAssociatedResourceType),
    Created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ImageId: S.optional(S.String),
    State: S.optional(AssociationState),
    StateReason: S.optional(AssociationStateReason),
  }),
).annotate({
  identifier: "ImageResourceAssociation",
}) as any as S.Schema<ImageResourceAssociation>;
export type ImageResourceAssociationList = ImageResourceAssociation[];
export const ImageResourceAssociationList = S.Array(ImageResourceAssociation);
export interface DescribeImageAssociationsResult {
  Associations?: ImageResourceAssociation[];
}
export const DescribeImageAssociationsResult = S.suspend(() =>
  S.Struct({ Associations: S.optional(ImageResourceAssociationList) }).pipe(ns),
).annotate({
  identifier: "DescribeImageAssociationsResult",
}) as any as S.Schema<DescribeImageAssociationsResult>;
export interface DescribeIpGroupsRequest {
  GroupIds?: string[];
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeIpGroupsRequest = S.suspend(() =>
  S.Struct({
    GroupIds: S.optional(IpGroupIdList),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeIpGroupsRequest",
}) as any as S.Schema<DescribeIpGroupsRequest>;
export interface WorkspacesIpGroup {
  groupId?: string;
  groupName?: string;
  groupDesc?: string;
  userRules?: IpRuleItem[];
}
export const WorkspacesIpGroup = S.suspend(() =>
  S.Struct({
    groupId: S.optional(S.String),
    groupName: S.optional(S.String),
    groupDesc: S.optional(S.String),
    userRules: S.optional(IpRuleList),
  }),
).annotate({
  identifier: "WorkspacesIpGroup",
}) as any as S.Schema<WorkspacesIpGroup>;
export type WorkspacesIpGroupsList = WorkspacesIpGroup[];
export const WorkspacesIpGroupsList = S.Array(WorkspacesIpGroup);
export interface DescribeIpGroupsResult {
  Result?: WorkspacesIpGroup[];
  NextToken?: string;
}
export const DescribeIpGroupsResult = S.suspend(() =>
  S.Struct({
    Result: S.optional(WorkspacesIpGroupsList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeIpGroupsResult",
}) as any as S.Schema<DescribeIpGroupsResult>;
export interface DescribeTagsRequest {
  ResourceId: string;
}
export const DescribeTagsRequest = S.suspend(() =>
  S.Struct({ ResourceId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeTagsRequest",
}) as any as S.Schema<DescribeTagsRequest>;
export interface DescribeTagsResult {
  TagList?: Tag[];
}
export const DescribeTagsResult = S.suspend(() =>
  S.Struct({ TagList: S.optional(TagList) }).pipe(ns),
).annotate({
  identifier: "DescribeTagsResult",
}) as any as S.Schema<DescribeTagsResult>;
export type WorkSpaceAssociatedResourceTypeList =
  WorkSpaceAssociatedResourceType[];
export const WorkSpaceAssociatedResourceTypeList = S.Array(
  WorkSpaceAssociatedResourceType,
);
export interface DescribeWorkspaceAssociationsRequest {
  WorkspaceId: string;
  AssociatedResourceTypes: WorkSpaceAssociatedResourceType[];
}
export const DescribeWorkspaceAssociationsRequest = S.suspend(() =>
  S.Struct({
    WorkspaceId: S.String,
    AssociatedResourceTypes: WorkSpaceAssociatedResourceTypeList,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeWorkspaceAssociationsRequest",
}) as any as S.Schema<DescribeWorkspaceAssociationsRequest>;
export interface DescribeWorkspaceAssociationsResult {
  Associations?: WorkspaceResourceAssociation[];
}
export const DescribeWorkspaceAssociationsResult = S.suspend(() =>
  S.Struct({ Associations: S.optional(WorkspaceResourceAssociationList) }).pipe(
    ns,
  ),
).annotate({
  identifier: "DescribeWorkspaceAssociationsResult",
}) as any as S.Schema<DescribeWorkspaceAssociationsResult>;
export type BundleIdList = string[];
export const BundleIdList = S.Array(S.String);
export interface DescribeWorkspaceBundlesRequest {
  BundleIds?: string[];
  Owner?: string;
  NextToken?: string;
}
export const DescribeWorkspaceBundlesRequest = S.suspend(() =>
  S.Struct({
    BundleIds: S.optional(BundleIdList),
    Owner: S.optional(S.String),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeWorkspaceBundlesRequest",
}) as any as S.Schema<DescribeWorkspaceBundlesRequest>;
export type BundleList = WorkspaceBundle[];
export const BundleList = S.Array(WorkspaceBundle);
export interface DescribeWorkspaceBundlesResult {
  Bundles?: WorkspaceBundle[];
  NextToken?: string;
}
export const DescribeWorkspaceBundlesResult = S.suspend(() =>
  S.Struct({
    Bundles: S.optional(BundleList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeWorkspaceBundlesResult",
}) as any as S.Schema<DescribeWorkspaceBundlesResult>;
export type DirectoryIdList = string[];
export const DirectoryIdList = S.Array(S.String);
export type WorkspaceDirectoryNameList = string[];
export const WorkspaceDirectoryNameList = S.Array(S.String);
export type DescribeWorkspaceDirectoriesFilterName =
  | "USER_IDENTITY_TYPE"
  | "WORKSPACE_TYPE"
  | (string & {});
export const DescribeWorkspaceDirectoriesFilterName = S.String;
export type DescribeWorkspaceDirectoriesFilterValues = string[];
export const DescribeWorkspaceDirectoriesFilterValues = S.Array(S.String);
export interface DescribeWorkspaceDirectoriesFilter {
  Name: DescribeWorkspaceDirectoriesFilterName;
  Values: string[];
}
export const DescribeWorkspaceDirectoriesFilter = S.suspend(() =>
  S.Struct({
    Name: DescribeWorkspaceDirectoriesFilterName,
    Values: DescribeWorkspaceDirectoriesFilterValues,
  }),
).annotate({
  identifier: "DescribeWorkspaceDirectoriesFilter",
}) as any as S.Schema<DescribeWorkspaceDirectoriesFilter>;
export type DescribeWorkspaceDirectoriesFilterList =
  DescribeWorkspaceDirectoriesFilter[];
export const DescribeWorkspaceDirectoriesFilterList = S.Array(
  DescribeWorkspaceDirectoriesFilter,
);
export interface DescribeWorkspaceDirectoriesRequest {
  DirectoryIds?: string[];
  WorkspaceDirectoryNames?: string[];
  Limit?: number;
  NextToken?: string;
  Filters?: DescribeWorkspaceDirectoriesFilter[];
}
export const DescribeWorkspaceDirectoriesRequest = S.suspend(() =>
  S.Struct({
    DirectoryIds: S.optional(DirectoryIdList),
    WorkspaceDirectoryNames: S.optional(WorkspaceDirectoryNameList),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(DescribeWorkspaceDirectoriesFilterList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeWorkspaceDirectoriesRequest",
}) as any as S.Schema<DescribeWorkspaceDirectoriesRequest>;
export type SubnetIds = string[];
export const SubnetIds = S.Array(S.String);
export type DnsIpAddresses = string[];
export const DnsIpAddresses = S.Array(S.String);
export type DnsIpv6Addresses = string[];
export const DnsIpv6Addresses = S.Array(S.String);
export type WorkspaceDirectoryType =
  | "SIMPLE_AD"
  | "AD_CONNECTOR"
  | "CUSTOMER_MANAGED"
  | "AWS_IAM_IDENTITY_CENTER"
  | (string & {});
export const WorkspaceDirectoryType = S.String;
export type WorkspaceDirectoryState =
  | "REGISTERING"
  | "REGISTERED"
  | "DEREGISTERING"
  | "DEREGISTERED"
  | "ERROR"
  | (string & {});
export const WorkspaceDirectoryState = S.String;
export interface DefaultWorkspaceCreationProperties {
  EnableInternetAccess?: boolean;
  DefaultOu?: string;
  CustomSecurityGroupId?: string;
  UserEnabledAsLocalAdministrator?: boolean;
  EnableMaintenanceMode?: boolean;
  InstanceIamRoleArn?: string;
}
export const DefaultWorkspaceCreationProperties = S.suspend(() =>
  S.Struct({
    EnableInternetAccess: S.optional(S.Boolean),
    DefaultOu: S.optional(S.String),
    CustomSecurityGroupId: S.optional(S.String),
    UserEnabledAsLocalAdministrator: S.optional(S.Boolean),
    EnableMaintenanceMode: S.optional(S.Boolean),
    InstanceIamRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DefaultWorkspaceCreationProperties",
}) as any as S.Schema<DefaultWorkspaceCreationProperties>;
export type AccessPropertyValue = "ALLOW" | "DENY" | (string & {});
export const AccessPropertyValue = S.String;
export type AccessEndpointType = "STREAMING_WSP" | (string & {});
export const AccessEndpointType = S.String;
export interface AccessEndpoint {
  AccessEndpointType?: AccessEndpointType;
  VpcEndpointId?: string;
}
export const AccessEndpoint = S.suspend(() =>
  S.Struct({
    AccessEndpointType: S.optional(AccessEndpointType),
    VpcEndpointId: S.optional(S.String),
  }),
).annotate({ identifier: "AccessEndpoint" }) as any as S.Schema<AccessEndpoint>;
export type AccessEndpointList = AccessEndpoint[];
export const AccessEndpointList = S.Array(AccessEndpoint);
export type InternetFallbackProtocol = "PCOIP" | (string & {});
export const InternetFallbackProtocol = S.String;
export type InternetFallbackProtocolList = InternetFallbackProtocol[];
export const InternetFallbackProtocolList = S.Array(InternetFallbackProtocol);
export interface AccessEndpointConfig {
  AccessEndpoints: AccessEndpoint[];
  InternetFallbackProtocols?: InternetFallbackProtocol[];
}
export const AccessEndpointConfig = S.suspend(() =>
  S.Struct({
    AccessEndpoints: AccessEndpointList,
    InternetFallbackProtocols: S.optional(InternetFallbackProtocolList),
  }),
).annotate({
  identifier: "AccessEndpointConfig",
}) as any as S.Schema<AccessEndpointConfig>;
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
export const WorkspaceAccessProperties = S.suspend(() =>
  S.Struct({
    DeviceTypeWindows: S.optional(AccessPropertyValue),
    DeviceTypeOsx: S.optional(AccessPropertyValue),
    DeviceTypeWeb: S.optional(AccessPropertyValue),
    DeviceTypeIos: S.optional(AccessPropertyValue),
    DeviceTypeAndroid: S.optional(AccessPropertyValue),
    DeviceTypeChromeOs: S.optional(AccessPropertyValue),
    DeviceTypeZeroClient: S.optional(AccessPropertyValue),
    DeviceTypeLinux: S.optional(AccessPropertyValue),
    DeviceTypeWorkSpacesThinClient: S.optional(AccessPropertyValue),
    AccessEndpointConfig: S.optional(AccessEndpointConfig),
  }),
).annotate({
  identifier: "WorkspaceAccessProperties",
}) as any as S.Schema<WorkspaceAccessProperties>;
export type Tenancy = "DEDICATED" | "SHARED" | (string & {});
export const Tenancy = S.String;
export interface SelfservicePermissions {
  RestartWorkspace?: ReconnectEnum;
  IncreaseVolumeSize?: ReconnectEnum;
  ChangeComputeType?: ReconnectEnum;
  SwitchRunningMode?: ReconnectEnum;
  RebuildWorkspace?: ReconnectEnum;
}
export const SelfservicePermissions = S.suspend(() =>
  S.Struct({
    RestartWorkspace: S.optional(ReconnectEnum),
    IncreaseVolumeSize: S.optional(ReconnectEnum),
    ChangeComputeType: S.optional(ReconnectEnum),
    SwitchRunningMode: S.optional(ReconnectEnum),
    RebuildWorkspace: S.optional(ReconnectEnum),
  }),
).annotate({
  identifier: "SelfservicePermissions",
}) as any as S.Schema<SelfservicePermissions>;
export type SamlStatusEnum =
  | "DISABLED"
  | "ENABLED"
  | "ENABLED_WITH_DIRECTORY_LOGIN_FALLBACK"
  | (string & {});
export const SamlStatusEnum = S.String;
export interface SamlProperties {
  Status?: SamlStatusEnum;
  UserAccessUrl?: string;
  RelayStateParameterName?: string;
}
export const SamlProperties = S.suspend(() =>
  S.Struct({
    Status: S.optional(SamlStatusEnum),
    UserAccessUrl: S.optional(S.String),
    RelayStateParameterName: S.optional(S.String),
  }),
).annotate({ identifier: "SamlProperties" }) as any as S.Schema<SamlProperties>;
export type CertificateBasedAuthStatusEnum =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const CertificateBasedAuthStatusEnum = S.String;
export interface CertificateBasedAuthProperties {
  Status?: CertificateBasedAuthStatusEnum;
  CertificateAuthorityArn?: string;
}
export const CertificateBasedAuthProperties = S.suspend(() =>
  S.Struct({
    Status: S.optional(CertificateBasedAuthStatusEnum),
    CertificateAuthorityArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CertificateBasedAuthProperties",
}) as any as S.Schema<CertificateBasedAuthProperties>;
export type EndpointEncryptionMode =
  | "STANDARD_TLS"
  | "FIPS_VALIDATED"
  | (string & {});
export const EndpointEncryptionMode = S.String;
export interface MicrosoftEntraConfig {
  TenantId?: string;
  ApplicationConfigSecretArn?: string;
}
export const MicrosoftEntraConfig = S.suspend(() =>
  S.Struct({
    TenantId: S.optional(S.String),
    ApplicationConfigSecretArn: S.optional(S.String),
  }),
).annotate({
  identifier: "MicrosoftEntraConfig",
}) as any as S.Schema<MicrosoftEntraConfig>;
export type UserIdentityType =
  | "CUSTOMER_MANAGED"
  | "AWS_DIRECTORY_SERVICE"
  | "AWS_IAM_IDENTITY_CENTER"
  | (string & {});
export const UserIdentityType = S.String;
export type WorkspaceType = "PERSONAL" | "POOLS" | (string & {});
export const WorkspaceType = S.String;
export interface IDCConfig {
  InstanceArn?: string;
  ApplicationArn?: string;
}
export const IDCConfig = S.suspend(() =>
  S.Struct({
    InstanceArn: S.optional(S.String),
    ApplicationArn: S.optional(S.String),
  }),
).annotate({ identifier: "IDCConfig" }) as any as S.Schema<IDCConfig>;
export interface ActiveDirectoryConfig {
  DomainName: string;
  ServiceAccountSecretArn: string;
}
export const ActiveDirectoryConfig = S.suspend(() =>
  S.Struct({ DomainName: S.String, ServiceAccountSecretArn: S.String }),
).annotate({
  identifier: "ActiveDirectoryConfig",
}) as any as S.Schema<ActiveDirectoryConfig>;
export type StreamingExperiencePreferredProtocolEnum =
  | "TCP"
  | "UDP"
  | (string & {});
export const StreamingExperiencePreferredProtocolEnum = S.String;
export type UserSettingActionEnum =
  | "CLIPBOARD_COPY_FROM_LOCAL_DEVICE"
  | "CLIPBOARD_COPY_TO_LOCAL_DEVICE"
  | "PRINTING_TO_LOCAL_DEVICE"
  | "SMART_CARD"
  | (string & {});
export const UserSettingActionEnum = S.String;
export type UserSettingPermissionEnum = "ENABLED" | "DISABLED" | (string & {});
export const UserSettingPermissionEnum = S.String;
export interface UserSetting {
  Action: UserSettingActionEnum;
  Permission: UserSettingPermissionEnum;
  MaximumLength?: number;
}
export const UserSetting = S.suspend(() =>
  S.Struct({
    Action: UserSettingActionEnum,
    Permission: UserSettingPermissionEnum,
    MaximumLength: S.optional(S.Number),
  }),
).annotate({ identifier: "UserSetting" }) as any as S.Schema<UserSetting>;
export type UserSettings = UserSetting[];
export const UserSettings = S.Array(UserSetting);
export type StorageConnectorTypeEnum = "HOME_FOLDER" | (string & {});
export const StorageConnectorTypeEnum = S.String;
export type StorageConnectorStatusEnum = "ENABLED" | "DISABLED" | (string & {});
export const StorageConnectorStatusEnum = S.String;
export interface StorageConnector {
  ConnectorType: StorageConnectorTypeEnum;
  Status: StorageConnectorStatusEnum;
}
export const StorageConnector = S.suspend(() =>
  S.Struct({
    ConnectorType: StorageConnectorTypeEnum,
    Status: StorageConnectorStatusEnum,
  }),
).annotate({
  identifier: "StorageConnector",
}) as any as S.Schema<StorageConnector>;
export type StorageConnectors = StorageConnector[];
export const StorageConnectors = S.Array(StorageConnector);
export type AGAModeForDirectoryEnum =
  | "ENABLED_AUTO"
  | "DISABLED"
  | (string & {});
export const AGAModeForDirectoryEnum = S.String;
export type AGAPreferredProtocolForDirectory = "TCP" | "NONE" | (string & {});
export const AGAPreferredProtocolForDirectory = S.String;
export interface GlobalAcceleratorForDirectory {
  Mode: AGAModeForDirectoryEnum;
  PreferredProtocol?: AGAPreferredProtocolForDirectory;
}
export const GlobalAcceleratorForDirectory = S.suspend(() =>
  S.Struct({
    Mode: AGAModeForDirectoryEnum,
    PreferredProtocol: S.optional(AGAPreferredProtocolForDirectory),
  }),
).annotate({
  identifier: "GlobalAcceleratorForDirectory",
}) as any as S.Schema<GlobalAcceleratorForDirectory>;
export interface StreamingProperties {
  StreamingExperiencePreferredProtocol?: StreamingExperiencePreferredProtocolEnum;
  UserSettings?: UserSetting[];
  StorageConnectors?: StorageConnector[];
  GlobalAccelerator?: GlobalAcceleratorForDirectory;
}
export const StreamingProperties = S.suspend(() =>
  S.Struct({
    StreamingExperiencePreferredProtocol: S.optional(
      StreamingExperiencePreferredProtocolEnum,
    ),
    UserSettings: S.optional(UserSettings),
    StorageConnectors: S.optional(StorageConnectors),
    GlobalAccelerator: S.optional(GlobalAcceleratorForDirectory),
  }),
).annotate({
  identifier: "StreamingProperties",
}) as any as S.Schema<StreamingProperties>;
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
export const WorkspaceDirectory = S.suspend(() =>
  S.Struct({
    DirectoryId: S.optional(S.String),
    Alias: S.optional(S.String),
    DirectoryName: S.optional(S.String),
    RegistrationCode: S.optional(S.String),
    SubnetIds: S.optional(SubnetIds),
    DnsIpAddresses: S.optional(DnsIpAddresses),
    DnsIpv6Addresses: S.optional(DnsIpv6Addresses),
    CustomerUserName: S.optional(S.String),
    IamRoleId: S.optional(S.String),
    DirectoryType: S.optional(WorkspaceDirectoryType),
    WorkspaceSecurityGroupId: S.optional(S.String),
    State: S.optional(WorkspaceDirectoryState),
    WorkspaceCreationProperties: S.optional(DefaultWorkspaceCreationProperties),
    ipGroupIds: S.optional(IpGroupIdList),
    WorkspaceAccessProperties: S.optional(WorkspaceAccessProperties),
    Tenancy: S.optional(Tenancy),
    SelfservicePermissions: S.optional(SelfservicePermissions),
    SamlProperties: S.optional(SamlProperties),
    CertificateBasedAuthProperties: S.optional(CertificateBasedAuthProperties),
    EndpointEncryptionMode: S.optional(EndpointEncryptionMode),
    MicrosoftEntraConfig: S.optional(MicrosoftEntraConfig),
    WorkspaceDirectoryName: S.optional(S.String),
    WorkspaceDirectoryDescription: S.optional(S.String),
    UserIdentityType: S.optional(UserIdentityType),
    WorkspaceType: S.optional(WorkspaceType),
    IDCConfig: S.optional(IDCConfig),
    ActiveDirectoryConfig: S.optional(ActiveDirectoryConfig),
    StreamingProperties: S.optional(StreamingProperties),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkspaceDirectory",
}) as any as S.Schema<WorkspaceDirectory>;
export type DirectoryList = WorkspaceDirectory[];
export const DirectoryList = S.Array(WorkspaceDirectory);
export interface DescribeWorkspaceDirectoriesResult {
  Directories?: WorkspaceDirectory[];
  NextToken?: string;
}
export const DescribeWorkspaceDirectoriesResult = S.suspend(() =>
  S.Struct({
    Directories: S.optional(DirectoryList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeWorkspaceDirectoriesResult",
}) as any as S.Schema<DescribeWorkspaceDirectoriesResult>;
export interface DescribeWorkspaceImagePermissionsRequest {
  ImageId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeWorkspaceImagePermissionsRequest = S.suspend(() =>
  S.Struct({
    ImageId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeWorkspaceImagePermissionsRequest",
}) as any as S.Schema<DescribeWorkspaceImagePermissionsRequest>;
export interface ImagePermission {
  SharedAccountId?: string;
}
export const ImagePermission = S.suspend(() =>
  S.Struct({ SharedAccountId: S.optional(S.String) }),
).annotate({
  identifier: "ImagePermission",
}) as any as S.Schema<ImagePermission>;
export type ImagePermissions = ImagePermission[];
export const ImagePermissions = S.Array(ImagePermission);
export interface DescribeWorkspaceImagePermissionsResult {
  ImageId?: string;
  ImagePermissions?: ImagePermission[];
  NextToken?: string;
}
export const DescribeWorkspaceImagePermissionsResult = S.suspend(() =>
  S.Struct({
    ImageId: S.optional(S.String),
    ImagePermissions: S.optional(ImagePermissions),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeWorkspaceImagePermissionsResult",
}) as any as S.Schema<DescribeWorkspaceImagePermissionsResult>;
export type WorkspaceImageIdList = string[];
export const WorkspaceImageIdList = S.Array(S.String);
export type ImageType = "OWNED" | "SHARED" | (string & {});
export const ImageType = S.String;
export interface DescribeWorkspaceImagesRequest {
  ImageIds?: string[];
  ImageType?: ImageType;
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeWorkspaceImagesRequest = S.suspend(() =>
  S.Struct({
    ImageIds: S.optional(WorkspaceImageIdList),
    ImageType: S.optional(ImageType),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeWorkspaceImagesRequest",
}) as any as S.Schema<DescribeWorkspaceImagesRequest>;
export interface UpdateResult {
  UpdateAvailable?: boolean;
  Description?: string;
}
export const UpdateResult = S.suspend(() =>
  S.Struct({
    UpdateAvailable: S.optional(S.Boolean),
    Description: S.optional(S.String),
  }),
).annotate({ identifier: "UpdateResult" }) as any as S.Schema<UpdateResult>;
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
export const WorkspaceImageErrorDetailCode = S.String;
export interface ErrorDetails {
  ErrorCode?: WorkspaceImageErrorDetailCode;
  ErrorMessage?: string;
}
export const ErrorDetails = S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(WorkspaceImageErrorDetailCode),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "ErrorDetails" }) as any as S.Schema<ErrorDetails>;
export type ErrorDetailsList = ErrorDetails[];
export const ErrorDetailsList = S.Array(ErrorDetails);
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
export const WorkspaceImage = S.suspend(() =>
  S.Struct({
    ImageId: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    OperatingSystem: S.optional(OperatingSystem),
    State: S.optional(WorkspaceImageState),
    RequiredTenancy: S.optional(WorkspaceImageRequiredTenancy),
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
    Created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    OwnerAccountId: S.optional(S.String),
    Updates: S.optional(UpdateResult),
    ErrorDetails: S.optional(ErrorDetailsList),
  }),
).annotate({ identifier: "WorkspaceImage" }) as any as S.Schema<WorkspaceImage>;
export type WorkspaceImageList = WorkspaceImage[];
export const WorkspaceImageList = S.Array(WorkspaceImage);
export interface DescribeWorkspaceImagesResult {
  Images?: WorkspaceImage[];
  NextToken?: string;
}
export const DescribeWorkspaceImagesResult = S.suspend(() =>
  S.Struct({
    Images: S.optional(WorkspaceImageList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeWorkspaceImagesResult",
}) as any as S.Schema<DescribeWorkspaceImagesResult>;
export type WorkspaceIdList = string[];
export const WorkspaceIdList = S.Array(S.String);
export interface DescribeWorkspacesRequest {
  WorkspaceIds?: string[];
  DirectoryId?: string;
  UserName?: string;
  BundleId?: string;
  Limit?: number;
  NextToken?: string;
  WorkspaceName?: string;
}
export const DescribeWorkspacesRequest = S.suspend(() =>
  S.Struct({
    WorkspaceIds: S.optional(WorkspaceIdList),
    DirectoryId: S.optional(S.String),
    UserName: S.optional(S.String),
    BundleId: S.optional(S.String),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
    WorkspaceName: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeWorkspacesRequest",
}) as any as S.Schema<DescribeWorkspacesRequest>;
export interface DescribeWorkspacesResult {
  Workspaces?: Workspace[];
  NextToken?: string;
}
export const DescribeWorkspacesResult = S.suspend(() =>
  S.Struct({
    Workspaces: S.optional(WorkspaceList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeWorkspacesResult",
}) as any as S.Schema<DescribeWorkspacesResult>;
export interface DescribeWorkspacesConnectionStatusRequest {
  WorkspaceIds?: string[];
  NextToken?: string;
}
export const DescribeWorkspacesConnectionStatusRequest = S.suspend(() =>
  S.Struct({
    WorkspaceIds: S.optional(WorkspaceIdList),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeWorkspacesConnectionStatusRequest",
}) as any as S.Schema<DescribeWorkspacesConnectionStatusRequest>;
export type ConnectionState =
  | "CONNECTED"
  | "DISCONNECTED"
  | "UNKNOWN"
  | (string & {});
export const ConnectionState = S.String;
export interface WorkspaceConnectionStatus {
  WorkspaceId?: string;
  ConnectionState?: ConnectionState;
  ConnectionStateCheckTimestamp?: Date;
  LastKnownUserConnectionTimestamp?: Date;
}
export const WorkspaceConnectionStatus = S.suspend(() =>
  S.Struct({
    WorkspaceId: S.optional(S.String),
    ConnectionState: S.optional(ConnectionState),
    ConnectionStateCheckTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastKnownUserConnectionTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "WorkspaceConnectionStatus",
}) as any as S.Schema<WorkspaceConnectionStatus>;
export type WorkspaceConnectionStatusList = WorkspaceConnectionStatus[];
export const WorkspaceConnectionStatusList = S.Array(WorkspaceConnectionStatus);
export interface DescribeWorkspacesConnectionStatusResult {
  WorkspacesConnectionStatus?: WorkspaceConnectionStatus[];
  NextToken?: string;
}
export const DescribeWorkspacesConnectionStatusResult = S.suspend(() =>
  S.Struct({
    WorkspacesConnectionStatus: S.optional(WorkspaceConnectionStatusList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeWorkspacesConnectionStatusResult",
}) as any as S.Schema<DescribeWorkspacesConnectionStatusResult>;
export interface DescribeWorkspaceSnapshotsRequest {
  WorkspaceId: string;
}
export const DescribeWorkspaceSnapshotsRequest = S.suspend(() =>
  S.Struct({ WorkspaceId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeWorkspaceSnapshotsRequest",
}) as any as S.Schema<DescribeWorkspaceSnapshotsRequest>;
export interface Snapshot {
  SnapshotTime?: Date;
}
export const Snapshot = S.suspend(() =>
  S.Struct({
    SnapshotTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Snapshot" }) as any as S.Schema<Snapshot>;
export type SnapshotList = Snapshot[];
export const SnapshotList = S.Array(Snapshot);
export interface DescribeWorkspaceSnapshotsResult {
  RebuildSnapshots?: Snapshot[];
  RestoreSnapshots?: Snapshot[];
}
export const DescribeWorkspaceSnapshotsResult = S.suspend(() =>
  S.Struct({
    RebuildSnapshots: S.optional(SnapshotList),
    RestoreSnapshots: S.optional(SnapshotList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeWorkspaceSnapshotsResult",
}) as any as S.Schema<DescribeWorkspaceSnapshotsResult>;
export type WorkspacesPoolIds = string[];
export const WorkspacesPoolIds = S.Array(S.String);
export type DescribeWorkspacesPoolsFilterName = "PoolName" | (string & {});
export const DescribeWorkspacesPoolsFilterName = S.String;
export type DescribeWorkspacesPoolsFilterValues = string[];
export const DescribeWorkspacesPoolsFilterValues = S.Array(S.String);
export type DescribeWorkspacesPoolsFilterOperator =
  | "EQUALS"
  | "NOTEQUALS"
  | "CONTAINS"
  | "NOTCONTAINS"
  | (string & {});
export const DescribeWorkspacesPoolsFilterOperator = S.String;
export interface DescribeWorkspacesPoolsFilter {
  Name: DescribeWorkspacesPoolsFilterName;
  Values: string[];
  Operator: DescribeWorkspacesPoolsFilterOperator;
}
export const DescribeWorkspacesPoolsFilter = S.suspend(() =>
  S.Struct({
    Name: DescribeWorkspacesPoolsFilterName,
    Values: DescribeWorkspacesPoolsFilterValues,
    Operator: DescribeWorkspacesPoolsFilterOperator,
  }),
).annotate({
  identifier: "DescribeWorkspacesPoolsFilter",
}) as any as S.Schema<DescribeWorkspacesPoolsFilter>;
export type DescribeWorkspacesPoolsFilters = DescribeWorkspacesPoolsFilter[];
export const DescribeWorkspacesPoolsFilters = S.Array(
  DescribeWorkspacesPoolsFilter,
);
export interface DescribeWorkspacesPoolsRequest {
  PoolIds?: string[];
  Filters?: DescribeWorkspacesPoolsFilter[];
  Limit?: number;
  NextToken?: string;
}
export const DescribeWorkspacesPoolsRequest = S.suspend(() =>
  S.Struct({
    PoolIds: S.optional(WorkspacesPoolIds),
    Filters: S.optional(DescribeWorkspacesPoolsFilters),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeWorkspacesPoolsRequest",
}) as any as S.Schema<DescribeWorkspacesPoolsRequest>;
export type WorkspacesPools = WorkspacesPool[];
export const WorkspacesPools = S.Array(WorkspacesPool);
export interface DescribeWorkspacesPoolsResult {
  WorkspacesPools?: WorkspacesPool[];
  NextToken?: string;
}
export const DescribeWorkspacesPoolsResult = S.suspend(() =>
  S.Struct({
    WorkspacesPools: S.optional(WorkspacesPools),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeWorkspacesPoolsResult",
}) as any as S.Schema<DescribeWorkspacesPoolsResult>;
export interface DescribeWorkspacesPoolSessionsRequest {
  PoolId: string;
  UserId?: string;
  Limit?: number;
  NextToken?: string;
}
export const DescribeWorkspacesPoolSessionsRequest = S.suspend(() =>
  S.Struct({
    PoolId: S.String,
    UserId: S.optional(S.String),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeWorkspacesPoolSessionsRequest",
}) as any as S.Schema<DescribeWorkspacesPoolSessionsRequest>;
export type AuthenticationType = "SAML" | (string & {});
export const AuthenticationType = S.String;
export type SessionConnectionState =
  | "CONNECTED"
  | "NOT_CONNECTED"
  | (string & {});
export const SessionConnectionState = S.String;
export interface NetworkAccessConfiguration {
  EniPrivateIpAddress?: string;
  EniId?: string;
}
export const NetworkAccessConfiguration = S.suspend(() =>
  S.Struct({
    EniPrivateIpAddress: S.optional(S.String),
    EniId: S.optional(S.String),
  }),
).annotate({
  identifier: "NetworkAccessConfiguration",
}) as any as S.Schema<NetworkAccessConfiguration>;
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
export const WorkspacesPoolSession = S.suspend(() =>
  S.Struct({
    AuthenticationType: S.optional(AuthenticationType),
    ConnectionState: S.optional(SessionConnectionState),
    SessionId: S.String,
    InstanceId: S.optional(S.String),
    PoolId: S.String,
    ExpirationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    NetworkAccessConfiguration: S.optional(NetworkAccessConfiguration),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UserId: S.String,
  }),
).annotate({
  identifier: "WorkspacesPoolSession",
}) as any as S.Schema<WorkspacesPoolSession>;
export type WorkspacesPoolSessions = WorkspacesPoolSession[];
export const WorkspacesPoolSessions = S.Array(WorkspacesPoolSession);
export interface DescribeWorkspacesPoolSessionsResult {
  Sessions?: WorkspacesPoolSession[];
  NextToken?: string;
}
export const DescribeWorkspacesPoolSessionsResult = S.suspend(() =>
  S.Struct({
    Sessions: S.optional(WorkspacesPoolSessions),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeWorkspacesPoolSessionsResult",
}) as any as S.Schema<DescribeWorkspacesPoolSessionsResult>;
export interface DisassociateConnectionAliasRequest {
  AliasId: string;
}
export const DisassociateConnectionAliasRequest = S.suspend(() =>
  S.Struct({ AliasId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateConnectionAliasRequest",
}) as any as S.Schema<DisassociateConnectionAliasRequest>;
export interface DisassociateConnectionAliasResult {}
export const DisassociateConnectionAliasResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DisassociateConnectionAliasResult",
}) as any as S.Schema<DisassociateConnectionAliasResult>;
export interface DisassociateIpGroupsRequest {
  DirectoryId: string;
  GroupIds: string[];
}
export const DisassociateIpGroupsRequest = S.suspend(() =>
  S.Struct({ DirectoryId: S.String, GroupIds: IpGroupIdList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateIpGroupsRequest",
}) as any as S.Schema<DisassociateIpGroupsRequest>;
export interface DisassociateIpGroupsResult {}
export const DisassociateIpGroupsResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DisassociateIpGroupsResult",
}) as any as S.Schema<DisassociateIpGroupsResult>;
export interface DisassociateWorkspaceApplicationRequest {
  WorkspaceId: string;
  ApplicationId: string;
}
export const DisassociateWorkspaceApplicationRequest = S.suspend(() =>
  S.Struct({ WorkspaceId: S.String, ApplicationId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateWorkspaceApplicationRequest",
}) as any as S.Schema<DisassociateWorkspaceApplicationRequest>;
export interface DisassociateWorkspaceApplicationResult {
  Association?: WorkspaceResourceAssociation;
}
export const DisassociateWorkspaceApplicationResult = S.suspend(() =>
  S.Struct({ Association: S.optional(WorkspaceResourceAssociation) }).pipe(ns),
).annotate({
  identifier: "DisassociateWorkspaceApplicationResult",
}) as any as S.Schema<DisassociateWorkspaceApplicationResult>;
export interface GetAccountLinkRequest {
  LinkId?: string;
  LinkedAccountId?: string;
}
export const GetAccountLinkRequest = S.suspend(() =>
  S.Struct({
    LinkId: S.optional(S.String),
    LinkedAccountId: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAccountLinkRequest",
}) as any as S.Schema<GetAccountLinkRequest>;
export interface GetAccountLinkResult {
  AccountLink?: AccountLink;
}
export const GetAccountLinkResult = S.suspend(() =>
  S.Struct({ AccountLink: S.optional(AccountLink) }).pipe(ns),
).annotate({
  identifier: "GetAccountLinkResult",
}) as any as S.Schema<GetAccountLinkResult>;
export interface DefaultImportClientBrandingAttributes {
  Logo?: Uint8Array;
  SupportEmail?: string;
  SupportLink?: string;
  ForgotPasswordLink?: string;
  LoginMessage?: { [key: string]: string | undefined };
}
export const DefaultImportClientBrandingAttributes = S.suspend(() =>
  S.Struct({
    Logo: S.optional(T.Blob),
    SupportEmail: S.optional(S.String),
    SupportLink: S.optional(S.String),
    ForgotPasswordLink: S.optional(S.String),
    LoginMessage: S.optional(LoginMessage),
  }),
).annotate({
  identifier: "DefaultImportClientBrandingAttributes",
}) as any as S.Schema<DefaultImportClientBrandingAttributes>;
export interface IosImportClientBrandingAttributes {
  Logo?: Uint8Array;
  Logo2x?: Uint8Array;
  Logo3x?: Uint8Array;
  SupportEmail?: string;
  SupportLink?: string;
  ForgotPasswordLink?: string;
  LoginMessage?: { [key: string]: string | undefined };
}
export const IosImportClientBrandingAttributes = S.suspend(() =>
  S.Struct({
    Logo: S.optional(T.Blob),
    Logo2x: S.optional(T.Blob),
    Logo3x: S.optional(T.Blob),
    SupportEmail: S.optional(S.String),
    SupportLink: S.optional(S.String),
    ForgotPasswordLink: S.optional(S.String),
    LoginMessage: S.optional(LoginMessage),
  }),
).annotate({
  identifier: "IosImportClientBrandingAttributes",
}) as any as S.Schema<IosImportClientBrandingAttributes>;
export interface ImportClientBrandingRequest {
  ResourceId: string;
  DeviceTypeWindows?: DefaultImportClientBrandingAttributes;
  DeviceTypeOsx?: DefaultImportClientBrandingAttributes;
  DeviceTypeAndroid?: DefaultImportClientBrandingAttributes;
  DeviceTypeIos?: IosImportClientBrandingAttributes;
  DeviceTypeLinux?: DefaultImportClientBrandingAttributes;
  DeviceTypeWeb?: DefaultImportClientBrandingAttributes;
}
export const ImportClientBrandingRequest = S.suspend(() =>
  S.Struct({
    ResourceId: S.String,
    DeviceTypeWindows: S.optional(DefaultImportClientBrandingAttributes),
    DeviceTypeOsx: S.optional(DefaultImportClientBrandingAttributes),
    DeviceTypeAndroid: S.optional(DefaultImportClientBrandingAttributes),
    DeviceTypeIos: S.optional(IosImportClientBrandingAttributes),
    DeviceTypeLinux: S.optional(DefaultImportClientBrandingAttributes),
    DeviceTypeWeb: S.optional(DefaultImportClientBrandingAttributes),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ImportClientBrandingRequest",
}) as any as S.Schema<ImportClientBrandingRequest>;
export interface ImportClientBrandingResult {
  DeviceTypeWindows?: DefaultClientBrandingAttributes;
  DeviceTypeOsx?: DefaultClientBrandingAttributes;
  DeviceTypeAndroid?: DefaultClientBrandingAttributes;
  DeviceTypeIos?: IosClientBrandingAttributes;
  DeviceTypeLinux?: DefaultClientBrandingAttributes;
  DeviceTypeWeb?: DefaultClientBrandingAttributes;
}
export const ImportClientBrandingResult = S.suspend(() =>
  S.Struct({
    DeviceTypeWindows: S.optional(DefaultClientBrandingAttributes),
    DeviceTypeOsx: S.optional(DefaultClientBrandingAttributes),
    DeviceTypeAndroid: S.optional(DefaultClientBrandingAttributes),
    DeviceTypeIos: S.optional(IosClientBrandingAttributes),
    DeviceTypeLinux: S.optional(DefaultClientBrandingAttributes),
    DeviceTypeWeb: S.optional(DefaultClientBrandingAttributes),
  }).pipe(ns),
).annotate({
  identifier: "ImportClientBrandingResult",
}) as any as S.Schema<ImportClientBrandingResult>;
export type ImageComputeType =
  | "BASE"
  | "GRAPHICS_G4DN"
  | "GRAPHICS_G6"
  | (string & {});
export const ImageComputeType = S.String;
export type CustomImageProtocol = "PCOIP" | "DCV" | "BYOP" | (string & {});
export const CustomImageProtocol = S.String;
export type Platform = "WINDOWS" | (string & {});
export const Platform = S.String;
export type OSVersion = "Windows_10" | "Windows_11" | (string & {});
export const OSVersion = S.String;
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
export const ImportCustomWorkspaceImageRequest = S.suspend(() =>
  S.Struct({
    ImageName: S.String,
    ImageDescription: S.String,
    ComputeType: ImageComputeType,
    Protocol: CustomImageProtocol,
    ImageSource: ImageSourceIdentifier,
    InfrastructureConfigurationArn: S.String,
    Platform: Platform,
    OsVersion: OSVersion,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ImportCustomWorkspaceImageRequest",
}) as any as S.Schema<ImportCustomWorkspaceImageRequest>;
export interface ImportCustomWorkspaceImageResult {
  ImageId?: string;
  State?: CustomWorkspaceImageImportState;
}
export const ImportCustomWorkspaceImageResult = S.suspend(() =>
  S.Struct({
    ImageId: S.optional(S.String),
    State: S.optional(CustomWorkspaceImageImportState),
  }).pipe(ns),
).annotate({
  identifier: "ImportCustomWorkspaceImageResult",
}) as any as S.Schema<ImportCustomWorkspaceImageResult>;
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
export const WorkspaceImageIngestionProcess = S.String;
export type Application =
  | "Microsoft_Office_2016"
  | "Microsoft_Office_2019"
  | (string & {});
export const Application = S.String;
export type ApplicationList = Application[];
export const ApplicationList = S.Array(Application);
export interface ImportWorkspaceImageRequest {
  Ec2ImageId: string;
  IngestionProcess: WorkspaceImageIngestionProcess;
  ImageName: string;
  ImageDescription: string;
  Tags?: Tag[];
  Applications?: Application[];
}
export const ImportWorkspaceImageRequest = S.suspend(() =>
  S.Struct({
    Ec2ImageId: S.String,
    IngestionProcess: WorkspaceImageIngestionProcess,
    ImageName: S.String,
    ImageDescription: S.String,
    Tags: S.optional(TagList),
    Applications: S.optional(ApplicationList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ImportWorkspaceImageRequest",
}) as any as S.Schema<ImportWorkspaceImageRequest>;
export interface ImportWorkspaceImageResult {
  ImageId?: string;
}
export const ImportWorkspaceImageResult = S.suspend(() =>
  S.Struct({ ImageId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "ImportWorkspaceImageResult",
}) as any as S.Schema<ImportWorkspaceImageResult>;
export type LinkStatusFilterList = AccountLinkStatusEnum[];
export const LinkStatusFilterList = S.Array(AccountLinkStatusEnum);
export interface ListAccountLinksRequest {
  LinkStatusFilter?: AccountLinkStatusEnum[];
  NextToken?: string;
  MaxResults?: number;
}
export const ListAccountLinksRequest = S.suspend(() =>
  S.Struct({
    LinkStatusFilter: S.optional(LinkStatusFilterList),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAccountLinksRequest",
}) as any as S.Schema<ListAccountLinksRequest>;
export type AccountLinkList = AccountLink[];
export const AccountLinkList = S.Array(AccountLink);
export interface ListAccountLinksResult {
  AccountLinks?: AccountLink[];
  NextToken?: string;
}
export const ListAccountLinksResult = S.suspend(() =>
  S.Struct({
    AccountLinks: S.optional(AccountLinkList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListAccountLinksResult",
}) as any as S.Schema<ListAccountLinksResult>;
export interface ListAvailableManagementCidrRangesRequest {
  ManagementCidrRangeConstraint: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListAvailableManagementCidrRangesRequest = S.suspend(() =>
  S.Struct({
    ManagementCidrRangeConstraint: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAvailableManagementCidrRangesRequest",
}) as any as S.Schema<ListAvailableManagementCidrRangesRequest>;
export type DedicatedTenancyCidrRangeList = string[];
export const DedicatedTenancyCidrRangeList = S.Array(S.String);
export interface ListAvailableManagementCidrRangesResult {
  ManagementCidrRanges?: string[];
  NextToken?: string;
}
export const ListAvailableManagementCidrRangesResult = S.suspend(() =>
  S.Struct({
    ManagementCidrRanges: S.optional(DedicatedTenancyCidrRangeList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListAvailableManagementCidrRangesResult",
}) as any as S.Schema<ListAvailableManagementCidrRangesResult>;
export interface MigrateWorkspaceRequest {
  SourceWorkspaceId: string;
  BundleId: string;
}
export const MigrateWorkspaceRequest = S.suspend(() =>
  S.Struct({ SourceWorkspaceId: S.String, BundleId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "MigrateWorkspaceRequest",
}) as any as S.Schema<MigrateWorkspaceRequest>;
export interface MigrateWorkspaceResult {
  SourceWorkspaceId?: string;
  TargetWorkspaceId?: string;
}
export const MigrateWorkspaceResult = S.suspend(() =>
  S.Struct({
    SourceWorkspaceId: S.optional(S.String),
    TargetWorkspaceId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "MigrateWorkspaceResult",
}) as any as S.Schema<MigrateWorkspaceResult>;
export type DedicatedTenancySupportEnum = "ENABLED" | (string & {});
export const DedicatedTenancySupportEnum = S.String;
export interface ModifyAccountRequest {
  DedicatedTenancySupport?: DedicatedTenancySupportEnum;
  DedicatedTenancyManagementCidrRange?: string;
}
export const ModifyAccountRequest = S.suspend(() =>
  S.Struct({
    DedicatedTenancySupport: S.optional(DedicatedTenancySupportEnum),
    DedicatedTenancyManagementCidrRange: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ModifyAccountRequest",
}) as any as S.Schema<ModifyAccountRequest>;
export interface ModifyAccountResult {
  Message?: string;
}
export const ModifyAccountResult = S.suspend(() =>
  S.Struct({ Message: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "ModifyAccountResult",
}) as any as S.Schema<ModifyAccountResult>;
export type DeletableCertificateBasedAuthProperty =
  | "CERTIFICATE_BASED_AUTH_PROPERTIES_CERTIFICATE_AUTHORITY_ARN"
  | (string & {});
export const DeletableCertificateBasedAuthProperty = S.String;
export type DeletableCertificateBasedAuthPropertiesList =
  DeletableCertificateBasedAuthProperty[];
export const DeletableCertificateBasedAuthPropertiesList = S.Array(
  DeletableCertificateBasedAuthProperty,
);
export interface ModifyCertificateBasedAuthPropertiesRequest {
  ResourceId: string;
  CertificateBasedAuthProperties?: CertificateBasedAuthProperties;
  PropertiesToDelete?: DeletableCertificateBasedAuthProperty[];
}
export const ModifyCertificateBasedAuthPropertiesRequest = S.suspend(() =>
  S.Struct({
    ResourceId: S.String,
    CertificateBasedAuthProperties: S.optional(CertificateBasedAuthProperties),
    PropertiesToDelete: S.optional(DeletableCertificateBasedAuthPropertiesList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ModifyCertificateBasedAuthPropertiesRequest",
}) as any as S.Schema<ModifyCertificateBasedAuthPropertiesRequest>;
export interface ModifyCertificateBasedAuthPropertiesResult {}
export const ModifyCertificateBasedAuthPropertiesResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ModifyCertificateBasedAuthPropertiesResult",
}) as any as S.Schema<ModifyCertificateBasedAuthPropertiesResult>;
export interface ModifyClientPropertiesRequest {
  ResourceId: string;
  ClientProperties: ClientProperties;
}
export const ModifyClientPropertiesRequest = S.suspend(() =>
  S.Struct({ ResourceId: S.String, ClientProperties: ClientProperties }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ModifyClientPropertiesRequest",
}) as any as S.Schema<ModifyClientPropertiesRequest>;
export interface ModifyClientPropertiesResult {}
export const ModifyClientPropertiesResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ModifyClientPropertiesResult",
}) as any as S.Schema<ModifyClientPropertiesResult>;
export interface ModifyEndpointEncryptionModeRequest {
  DirectoryId: string;
  EndpointEncryptionMode: EndpointEncryptionMode;
}
export const ModifyEndpointEncryptionModeRequest = S.suspend(() =>
  S.Struct({
    DirectoryId: S.String,
    EndpointEncryptionMode: EndpointEncryptionMode,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ModifyEndpointEncryptionModeRequest",
}) as any as S.Schema<ModifyEndpointEncryptionModeRequest>;
export interface ModifyEndpointEncryptionModeResponse {}
export const ModifyEndpointEncryptionModeResponse = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ModifyEndpointEncryptionModeResponse",
}) as any as S.Schema<ModifyEndpointEncryptionModeResponse>;
export type DeletableSamlProperty =
  | "SAML_PROPERTIES_USER_ACCESS_URL"
  | "SAML_PROPERTIES_RELAY_STATE_PARAMETER_NAME"
  | (string & {});
export const DeletableSamlProperty = S.String;
export type DeletableSamlPropertiesList = DeletableSamlProperty[];
export const DeletableSamlPropertiesList = S.Array(DeletableSamlProperty);
export interface ModifySamlPropertiesRequest {
  ResourceId: string;
  SamlProperties?: SamlProperties;
  PropertiesToDelete?: DeletableSamlProperty[];
}
export const ModifySamlPropertiesRequest = S.suspend(() =>
  S.Struct({
    ResourceId: S.String,
    SamlProperties: S.optional(SamlProperties),
    PropertiesToDelete: S.optional(DeletableSamlPropertiesList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ModifySamlPropertiesRequest",
}) as any as S.Schema<ModifySamlPropertiesRequest>;
export interface ModifySamlPropertiesResult {}
export const ModifySamlPropertiesResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ModifySamlPropertiesResult",
}) as any as S.Schema<ModifySamlPropertiesResult>;
export interface ModifySelfservicePermissionsRequest {
  ResourceId: string;
  SelfservicePermissions: SelfservicePermissions;
}
export const ModifySelfservicePermissionsRequest = S.suspend(() =>
  S.Struct({
    ResourceId: S.String,
    SelfservicePermissions: SelfservicePermissions,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ModifySelfservicePermissionsRequest",
}) as any as S.Schema<ModifySelfservicePermissionsRequest>;
export interface ModifySelfservicePermissionsResult {}
export const ModifySelfservicePermissionsResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ModifySelfservicePermissionsResult",
}) as any as S.Schema<ModifySelfservicePermissionsResult>;
export interface ModifyStreamingPropertiesRequest {
  ResourceId: string;
  StreamingProperties?: StreamingProperties;
}
export const ModifyStreamingPropertiesRequest = S.suspend(() =>
  S.Struct({
    ResourceId: S.String,
    StreamingProperties: S.optional(StreamingProperties),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ModifyStreamingPropertiesRequest",
}) as any as S.Schema<ModifyStreamingPropertiesRequest>;
export interface ModifyStreamingPropertiesResult {}
export const ModifyStreamingPropertiesResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ModifyStreamingPropertiesResult",
}) as any as S.Schema<ModifyStreamingPropertiesResult>;
export interface ModifyWorkspaceAccessPropertiesRequest {
  ResourceId: string;
  WorkspaceAccessProperties: WorkspaceAccessProperties;
}
export const ModifyWorkspaceAccessPropertiesRequest = S.suspend(() =>
  S.Struct({
    ResourceId: S.String,
    WorkspaceAccessProperties: WorkspaceAccessProperties,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ModifyWorkspaceAccessPropertiesRequest",
}) as any as S.Schema<ModifyWorkspaceAccessPropertiesRequest>;
export interface ModifyWorkspaceAccessPropertiesResult {}
export const ModifyWorkspaceAccessPropertiesResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ModifyWorkspaceAccessPropertiesResult",
}) as any as S.Schema<ModifyWorkspaceAccessPropertiesResult>;
export interface WorkspaceCreationProperties {
  EnableInternetAccess?: boolean;
  DefaultOu?: string;
  CustomSecurityGroupId?: string;
  UserEnabledAsLocalAdministrator?: boolean;
  EnableMaintenanceMode?: boolean;
  InstanceIamRoleArn?: string;
}
export const WorkspaceCreationProperties = S.suspend(() =>
  S.Struct({
    EnableInternetAccess: S.optional(S.Boolean),
    DefaultOu: S.optional(S.String),
    CustomSecurityGroupId: S.optional(S.String),
    UserEnabledAsLocalAdministrator: S.optional(S.Boolean),
    EnableMaintenanceMode: S.optional(S.Boolean),
    InstanceIamRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkspaceCreationProperties",
}) as any as S.Schema<WorkspaceCreationProperties>;
export interface ModifyWorkspaceCreationPropertiesRequest {
  ResourceId: string;
  WorkspaceCreationProperties: WorkspaceCreationProperties;
}
export const ModifyWorkspaceCreationPropertiesRequest = S.suspend(() =>
  S.Struct({
    ResourceId: S.String,
    WorkspaceCreationProperties: WorkspaceCreationProperties,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ModifyWorkspaceCreationPropertiesRequest",
}) as any as S.Schema<ModifyWorkspaceCreationPropertiesRequest>;
export interface ModifyWorkspaceCreationPropertiesResult {}
export const ModifyWorkspaceCreationPropertiesResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ModifyWorkspaceCreationPropertiesResult",
}) as any as S.Schema<ModifyWorkspaceCreationPropertiesResult>;
export interface ModifyWorkspacePropertiesRequest {
  WorkspaceId: string;
  WorkspaceProperties?: WorkspaceProperties;
  DataReplication?: DataReplication;
}
export const ModifyWorkspacePropertiesRequest = S.suspend(() =>
  S.Struct({
    WorkspaceId: S.String,
    WorkspaceProperties: S.optional(WorkspaceProperties),
    DataReplication: S.optional(DataReplication),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ModifyWorkspacePropertiesRequest",
}) as any as S.Schema<ModifyWorkspacePropertiesRequest>;
export interface ModifyWorkspacePropertiesResult {}
export const ModifyWorkspacePropertiesResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ModifyWorkspacePropertiesResult",
}) as any as S.Schema<ModifyWorkspacePropertiesResult>;
export type TargetWorkspaceState =
  | "AVAILABLE"
  | "ADMIN_MAINTENANCE"
  | (string & {});
export const TargetWorkspaceState = S.String;
export interface ModifyWorkspaceStateRequest {
  WorkspaceId: string;
  WorkspaceState: TargetWorkspaceState;
}
export const ModifyWorkspaceStateRequest = S.suspend(() =>
  S.Struct({
    WorkspaceId: S.String,
    WorkspaceState: TargetWorkspaceState,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ModifyWorkspaceStateRequest",
}) as any as S.Schema<ModifyWorkspaceStateRequest>;
export interface ModifyWorkspaceStateResult {}
export const ModifyWorkspaceStateResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ModifyWorkspaceStateResult",
}) as any as S.Schema<ModifyWorkspaceStateResult>;
export interface RebootRequest {
  WorkspaceId: string;
}
export const RebootRequest = S.suspend(() =>
  S.Struct({ WorkspaceId: S.String }),
).annotate({ identifier: "RebootRequest" }) as any as S.Schema<RebootRequest>;
export type RebootWorkspaceRequests = RebootRequest[];
export const RebootWorkspaceRequests = S.Array(RebootRequest);
export interface RebootWorkspacesRequest {
  RebootWorkspaceRequests: RebootRequest[];
}
export const RebootWorkspacesRequest = S.suspend(() =>
  S.Struct({ RebootWorkspaceRequests: RebootWorkspaceRequests }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RebootWorkspacesRequest",
}) as any as S.Schema<RebootWorkspacesRequest>;
export interface FailedWorkspaceChangeRequest {
  WorkspaceId?: string;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export const FailedWorkspaceChangeRequest = S.suspend(() =>
  S.Struct({
    WorkspaceId: S.optional(S.String),
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "FailedWorkspaceChangeRequest",
}) as any as S.Schema<FailedWorkspaceChangeRequest>;
export type FailedRebootWorkspaceRequests = FailedWorkspaceChangeRequest[];
export const FailedRebootWorkspaceRequests = S.Array(
  FailedWorkspaceChangeRequest,
);
export interface RebootWorkspacesResult {
  FailedRequests?: FailedWorkspaceChangeRequest[];
}
export const RebootWorkspacesResult = S.suspend(() =>
  S.Struct({ FailedRequests: S.optional(FailedRebootWorkspaceRequests) }).pipe(
    ns,
  ),
).annotate({
  identifier: "RebootWorkspacesResult",
}) as any as S.Schema<RebootWorkspacesResult>;
export interface RebuildRequest {
  WorkspaceId: string;
}
export const RebuildRequest = S.suspend(() =>
  S.Struct({ WorkspaceId: S.String }),
).annotate({ identifier: "RebuildRequest" }) as any as S.Schema<RebuildRequest>;
export type RebuildWorkspaceRequests = RebuildRequest[];
export const RebuildWorkspaceRequests = S.Array(RebuildRequest);
export interface RebuildWorkspacesRequest {
  RebuildWorkspaceRequests: RebuildRequest[];
}
export const RebuildWorkspacesRequest = S.suspend(() =>
  S.Struct({ RebuildWorkspaceRequests: RebuildWorkspaceRequests }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RebuildWorkspacesRequest",
}) as any as S.Schema<RebuildWorkspacesRequest>;
export type FailedRebuildWorkspaceRequests = FailedWorkspaceChangeRequest[];
export const FailedRebuildWorkspaceRequests = S.Array(
  FailedWorkspaceChangeRequest,
);
export interface RebuildWorkspacesResult {
  FailedRequests?: FailedWorkspaceChangeRequest[];
}
export const RebuildWorkspacesResult = S.suspend(() =>
  S.Struct({ FailedRequests: S.optional(FailedRebuildWorkspaceRequests) }).pipe(
    ns,
  ),
).annotate({
  identifier: "RebuildWorkspacesResult",
}) as any as S.Schema<RebuildWorkspacesResult>;
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
export const RegisterWorkspaceDirectoryRequest = S.suspend(() =>
  S.Struct({
    DirectoryId: S.optional(S.String),
    SubnetIds: S.optional(SubnetIds),
    EnableSelfService: S.optional(S.Boolean),
    Tenancy: S.optional(Tenancy),
    Tags: S.optional(TagList),
    WorkspaceDirectoryName: S.optional(S.String),
    WorkspaceDirectoryDescription: S.optional(S.String),
    UserIdentityType: S.optional(UserIdentityType),
    IdcInstanceArn: S.optional(S.String),
    MicrosoftEntraConfig: S.optional(MicrosoftEntraConfig),
    WorkspaceType: S.optional(WorkspaceType),
    ActiveDirectoryConfig: S.optional(ActiveDirectoryConfig),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterWorkspaceDirectoryRequest",
}) as any as S.Schema<RegisterWorkspaceDirectoryRequest>;
export interface RegisterWorkspaceDirectoryResult {
  DirectoryId?: string;
  State?: WorkspaceDirectoryState;
}
export const RegisterWorkspaceDirectoryResult = S.suspend(() =>
  S.Struct({
    DirectoryId: S.optional(S.String),
    State: S.optional(WorkspaceDirectoryState),
  }).pipe(ns),
).annotate({
  identifier: "RegisterWorkspaceDirectoryResult",
}) as any as S.Schema<RegisterWorkspaceDirectoryResult>;
export interface RejectAccountLinkInvitationRequest {
  LinkId: string;
  ClientToken?: string;
}
export const RejectAccountLinkInvitationRequest = S.suspend(() =>
  S.Struct({ LinkId: S.String, ClientToken: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RejectAccountLinkInvitationRequest",
}) as any as S.Schema<RejectAccountLinkInvitationRequest>;
export interface RejectAccountLinkInvitationResult {
  AccountLink?: AccountLink;
}
export const RejectAccountLinkInvitationResult = S.suspend(() =>
  S.Struct({ AccountLink: S.optional(AccountLink) }).pipe(ns),
).annotate({
  identifier: "RejectAccountLinkInvitationResult",
}) as any as S.Schema<RejectAccountLinkInvitationResult>;
export interface RestoreWorkspaceRequest {
  WorkspaceId: string;
}
export const RestoreWorkspaceRequest = S.suspend(() =>
  S.Struct({ WorkspaceId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RestoreWorkspaceRequest",
}) as any as S.Schema<RestoreWorkspaceRequest>;
export interface RestoreWorkspaceResult {}
export const RestoreWorkspaceResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RestoreWorkspaceResult",
}) as any as S.Schema<RestoreWorkspaceResult>;
export type IpRevokedRuleList = string[];
export const IpRevokedRuleList = S.Array(S.String);
export interface RevokeIpRulesRequest {
  GroupId: string;
  UserRules: string[];
}
export const RevokeIpRulesRequest = S.suspend(() =>
  S.Struct({ GroupId: S.String, UserRules: IpRevokedRuleList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RevokeIpRulesRequest",
}) as any as S.Schema<RevokeIpRulesRequest>;
export interface RevokeIpRulesResult {}
export const RevokeIpRulesResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RevokeIpRulesResult",
}) as any as S.Schema<RevokeIpRulesResult>;
export interface StartRequest {
  WorkspaceId?: string;
}
export const StartRequest = S.suspend(() =>
  S.Struct({ WorkspaceId: S.optional(S.String) }),
).annotate({ identifier: "StartRequest" }) as any as S.Schema<StartRequest>;
export type StartWorkspaceRequests = StartRequest[];
export const StartWorkspaceRequests = S.Array(StartRequest);
export interface StartWorkspacesRequest {
  StartWorkspaceRequests: StartRequest[];
}
export const StartWorkspacesRequest = S.suspend(() =>
  S.Struct({ StartWorkspaceRequests: StartWorkspaceRequests }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartWorkspacesRequest",
}) as any as S.Schema<StartWorkspacesRequest>;
export type FailedStartWorkspaceRequests = FailedWorkspaceChangeRequest[];
export const FailedStartWorkspaceRequests = S.Array(
  FailedWorkspaceChangeRequest,
);
export interface StartWorkspacesResult {
  FailedRequests?: FailedWorkspaceChangeRequest[];
}
export const StartWorkspacesResult = S.suspend(() =>
  S.Struct({ FailedRequests: S.optional(FailedStartWorkspaceRequests) }).pipe(
    ns,
  ),
).annotate({
  identifier: "StartWorkspacesResult",
}) as any as S.Schema<StartWorkspacesResult>;
export interface StartWorkspacesPoolRequest {
  PoolId: string;
}
export const StartWorkspacesPoolRequest = S.suspend(() =>
  S.Struct({ PoolId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartWorkspacesPoolRequest",
}) as any as S.Schema<StartWorkspacesPoolRequest>;
export interface StartWorkspacesPoolResult {}
export const StartWorkspacesPoolResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "StartWorkspacesPoolResult",
}) as any as S.Schema<StartWorkspacesPoolResult>;
export interface StopRequest {
  WorkspaceId?: string;
}
export const StopRequest = S.suspend(() =>
  S.Struct({ WorkspaceId: S.optional(S.String) }),
).annotate({ identifier: "StopRequest" }) as any as S.Schema<StopRequest>;
export type StopWorkspaceRequests = StopRequest[];
export const StopWorkspaceRequests = S.Array(StopRequest);
export interface StopWorkspacesRequest {
  StopWorkspaceRequests: StopRequest[];
}
export const StopWorkspacesRequest = S.suspend(() =>
  S.Struct({ StopWorkspaceRequests: StopWorkspaceRequests }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopWorkspacesRequest",
}) as any as S.Schema<StopWorkspacesRequest>;
export type FailedStopWorkspaceRequests = FailedWorkspaceChangeRequest[];
export const FailedStopWorkspaceRequests = S.Array(
  FailedWorkspaceChangeRequest,
);
export interface StopWorkspacesResult {
  FailedRequests?: FailedWorkspaceChangeRequest[];
}
export const StopWorkspacesResult = S.suspend(() =>
  S.Struct({ FailedRequests: S.optional(FailedStopWorkspaceRequests) }).pipe(
    ns,
  ),
).annotate({
  identifier: "StopWorkspacesResult",
}) as any as S.Schema<StopWorkspacesResult>;
export interface StopWorkspacesPoolRequest {
  PoolId: string;
}
export const StopWorkspacesPoolRequest = S.suspend(() =>
  S.Struct({ PoolId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopWorkspacesPoolRequest",
}) as any as S.Schema<StopWorkspacesPoolRequest>;
export interface StopWorkspacesPoolResult {}
export const StopWorkspacesPoolResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "StopWorkspacesPoolResult",
}) as any as S.Schema<StopWorkspacesPoolResult>;
export interface TerminateRequest {
  WorkspaceId: string;
}
export const TerminateRequest = S.suspend(() =>
  S.Struct({ WorkspaceId: S.String }),
).annotate({
  identifier: "TerminateRequest",
}) as any as S.Schema<TerminateRequest>;
export type TerminateWorkspaceRequests = TerminateRequest[];
export const TerminateWorkspaceRequests = S.Array(TerminateRequest);
export interface TerminateWorkspacesRequest {
  TerminateWorkspaceRequests: TerminateRequest[];
}
export const TerminateWorkspacesRequest = S.suspend(() =>
  S.Struct({ TerminateWorkspaceRequests: TerminateWorkspaceRequests }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TerminateWorkspacesRequest",
}) as any as S.Schema<TerminateWorkspacesRequest>;
export type FailedTerminateWorkspaceRequests = FailedWorkspaceChangeRequest[];
export const FailedTerminateWorkspaceRequests = S.Array(
  FailedWorkspaceChangeRequest,
);
export interface TerminateWorkspacesResult {
  FailedRequests?: FailedWorkspaceChangeRequest[];
}
export const TerminateWorkspacesResult = S.suspend(() =>
  S.Struct({
    FailedRequests: S.optional(FailedTerminateWorkspaceRequests),
  }).pipe(ns),
).annotate({
  identifier: "TerminateWorkspacesResult",
}) as any as S.Schema<TerminateWorkspacesResult>;
export interface TerminateWorkspacesPoolRequest {
  PoolId: string;
}
export const TerminateWorkspacesPoolRequest = S.suspend(() =>
  S.Struct({ PoolId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TerminateWorkspacesPoolRequest",
}) as any as S.Schema<TerminateWorkspacesPoolRequest>;
export interface TerminateWorkspacesPoolResult {}
export const TerminateWorkspacesPoolResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "TerminateWorkspacesPoolResult",
}) as any as S.Schema<TerminateWorkspacesPoolResult>;
export interface TerminateWorkspacesPoolSessionRequest {
  SessionId: string;
}
export const TerminateWorkspacesPoolSessionRequest = S.suspend(() =>
  S.Struct({ SessionId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TerminateWorkspacesPoolSessionRequest",
}) as any as S.Schema<TerminateWorkspacesPoolSessionRequest>;
export interface TerminateWorkspacesPoolSessionResult {}
export const TerminateWorkspacesPoolSessionResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "TerminateWorkspacesPoolSessionResult",
}) as any as S.Schema<TerminateWorkspacesPoolSessionResult>;
export interface UpdateConnectClientAddInRequest {
  AddInId: string;
  ResourceId: string;
  Name?: string;
  URL?: string;
}
export const UpdateConnectClientAddInRequest = S.suspend(() =>
  S.Struct({
    AddInId: S.String,
    ResourceId: S.String,
    Name: S.optional(S.String),
    URL: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateConnectClientAddInRequest",
}) as any as S.Schema<UpdateConnectClientAddInRequest>;
export interface UpdateConnectClientAddInResult {}
export const UpdateConnectClientAddInResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateConnectClientAddInResult",
}) as any as S.Schema<UpdateConnectClientAddInResult>;
export interface UpdateConnectionAliasPermissionRequest {
  AliasId: string;
  ConnectionAliasPermission: ConnectionAliasPermission;
}
export const UpdateConnectionAliasPermissionRequest = S.suspend(() =>
  S.Struct({
    AliasId: S.String,
    ConnectionAliasPermission: ConnectionAliasPermission,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateConnectionAliasPermissionRequest",
}) as any as S.Schema<UpdateConnectionAliasPermissionRequest>;
export interface UpdateConnectionAliasPermissionResult {}
export const UpdateConnectionAliasPermissionResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateConnectionAliasPermissionResult",
}) as any as S.Schema<UpdateConnectionAliasPermissionResult>;
export interface UpdateRulesOfIpGroupRequest {
  GroupId: string;
  UserRules: IpRuleItem[];
}
export const UpdateRulesOfIpGroupRequest = S.suspend(() =>
  S.Struct({ GroupId: S.String, UserRules: IpRuleList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRulesOfIpGroupRequest",
}) as any as S.Schema<UpdateRulesOfIpGroupRequest>;
export interface UpdateRulesOfIpGroupResult {}
export const UpdateRulesOfIpGroupResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateRulesOfIpGroupResult",
}) as any as S.Schema<UpdateRulesOfIpGroupResult>;
export interface UpdateWorkspaceBundleRequest {
  BundleId?: string;
  ImageId?: string;
}
export const UpdateWorkspaceBundleRequest = S.suspend(() =>
  S.Struct({
    BundleId: S.optional(S.String),
    ImageId: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateWorkspaceBundleRequest",
}) as any as S.Schema<UpdateWorkspaceBundleRequest>;
export interface UpdateWorkspaceBundleResult {}
export const UpdateWorkspaceBundleResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateWorkspaceBundleResult",
}) as any as S.Schema<UpdateWorkspaceBundleResult>;
export interface UpdateWorkspaceImagePermissionRequest {
  ImageId: string;
  AllowCopyImage: boolean;
  SharedAccountId: string;
}
export const UpdateWorkspaceImagePermissionRequest = S.suspend(() =>
  S.Struct({
    ImageId: S.String,
    AllowCopyImage: S.Boolean,
    SharedAccountId: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateWorkspaceImagePermissionRequest",
}) as any as S.Schema<UpdateWorkspaceImagePermissionRequest>;
export interface UpdateWorkspaceImagePermissionResult {}
export const UpdateWorkspaceImagePermissionResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateWorkspaceImagePermissionResult",
}) as any as S.Schema<UpdateWorkspaceImagePermissionResult>;
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
export const UpdateWorkspacesPoolRequest = S.suspend(() =>
  S.Struct({
    PoolId: S.String,
    Description: S.optional(S.String),
    BundleId: S.optional(S.String),
    DirectoryId: S.optional(S.String),
    Capacity: S.optional(Capacity),
    ApplicationSettings: S.optional(ApplicationSettingsRequest),
    TimeoutSettings: S.optional(TimeoutSettings),
    RunningMode: S.optional(PoolsRunningMode),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateWorkspacesPoolRequest",
}) as any as S.Schema<UpdateWorkspacesPoolRequest>;
export interface UpdateWorkspacesPoolResult {
  WorkspacesPool?: WorkspacesPool;
}
export const UpdateWorkspacesPoolResult = S.suspend(() =>
  S.Struct({ WorkspacesPool: S.optional(WorkspacesPool) }).pipe(ns),
).annotate({
  identifier: "UpdateWorkspacesPoolResult",
}) as any as S.Schema<UpdateWorkspacesPoolResult>;

//# Errors
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { message: S.optional(S.String) },
).pipe(C.withAuthError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { message: S.optional(S.String) },
) {}
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  { message: S.optional(S.String) },
) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { message: S.optional(S.String), ResourceId: S.optional(S.String) },
) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  { message: S.optional(S.String) },
) {}
export class InvalidParameterValuesException extends S.TaggedErrorClass<InvalidParameterValuesException>()(
  "InvalidParameterValuesException",
  { message: S.optional(S.String) },
) {}
export class InvalidResourceStateException extends S.TaggedErrorClass<InvalidResourceStateException>()(
  "InvalidResourceStateException",
  { message: S.optional(S.String) },
) {}
export class OperationNotSupportedException extends S.TaggedErrorClass<OperationNotSupportedException>()(
  "OperationNotSupportedException",
  { message: S.optional(S.String), reason: S.optional(S.String) },
) {}
export class ResourceAssociatedException extends S.TaggedErrorClass<ResourceAssociatedException>()(
  "ResourceAssociatedException",
  { message: S.optional(S.String) },
) {}
export class ResourceLimitExceededException extends S.TaggedErrorClass<ResourceLimitExceededException>()(
  "ResourceLimitExceededException",
  { message: S.optional(S.String) },
) {}
export class ApplicationNotSupportedException extends S.TaggedErrorClass<ApplicationNotSupportedException>()(
  "ApplicationNotSupportedException",
  {},
) {}
export class ComputeNotCompatibleException extends S.TaggedErrorClass<ComputeNotCompatibleException>()(
  "ComputeNotCompatibleException",
  {},
) {}
export class IncompatibleApplicationsException extends S.TaggedErrorClass<IncompatibleApplicationsException>()(
  "IncompatibleApplicationsException",
  {},
) {}
export class OperatingSystemNotCompatibleException extends S.TaggedErrorClass<OperatingSystemNotCompatibleException>()(
  "OperatingSystemNotCompatibleException",
  {},
) {}
export class ResourceAlreadyExistsException extends S.TaggedErrorClass<ResourceAlreadyExistsException>()(
  "ResourceAlreadyExistsException",
  { message: S.optional(S.String) },
).pipe(C.withAlreadyExistsError) {}
export class ResourceInUseException extends S.TaggedErrorClass<ResourceInUseException>()(
  "ResourceInUseException",
  { message: S.optional(S.String), ResourceId: S.optional(S.String) },
) {}
export class ResourceUnavailableException extends S.TaggedErrorClass<ResourceUnavailableException>()(
  "ResourceUnavailableException",
  { message: S.optional(S.String), ResourceId: S.optional(S.String) },
) {}
export class ResourceCreationFailedException extends S.TaggedErrorClass<ResourceCreationFailedException>()(
  "ResourceCreationFailedException",
  { message: S.optional(S.String) },
) {}
export class OperationInProgressException extends S.TaggedErrorClass<OperationInProgressException>()(
  "OperationInProgressException",
  { message: S.optional(S.String) },
) {}
export class InvalidParameterCombinationException extends S.TaggedErrorClass<InvalidParameterCombinationException>()(
  "InvalidParameterCombinationException",
  { message: S.optional(S.String) },
) {}
export class UnsupportedWorkspaceConfigurationException extends S.TaggedErrorClass<UnsupportedWorkspaceConfigurationException>()(
  "UnsupportedWorkspaceConfigurationException",
  { message: S.optional(S.String) },
) {}
export class UnsupportedNetworkConfigurationException extends S.TaggedErrorClass<UnsupportedNetworkConfigurationException>()(
  "UnsupportedNetworkConfigurationException",
  { message: S.optional(S.String) },
) {}
export class WorkspacesDefaultRoleNotFoundException extends S.TaggedErrorClass<WorkspacesDefaultRoleNotFoundException>()(
  "WorkspacesDefaultRoleNotFoundException",
  { message: S.optional(S.String) },
) {}

//# Operations
/**
 * Accepts the account link invitation.
 *
 * There's currently no unlinking capability after you accept the account linking invitation.
 */
export const acceptAccountLinkInvitation: API.OperationMethod<
  AcceptAccountLinkInvitationRequest,
  AcceptAccountLinkInvitationResult,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AcceptAccountLinkInvitationRequest,
  output: AcceptAccountLinkInvitationResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
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
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceAssociatedException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AssociateConnectionAliasRequest,
  output: AssociateConnectionAliasResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceAssociatedException,
    ResourceNotFoundException,
  ],
}));
/**
 * Associates the specified IP access control group with the specified directory.
 */
export const associateIpGroups: API.OperationMethod<
  AssociateIpGroupsRequest,
  AssociateIpGroupsResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AssociateIpGroupsRequest,
  output: AssociateIpGroupsResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
}));
/**
 * Associates the specified application to the specified WorkSpace.
 */
export const associateWorkspaceApplication: API.OperationMethod<
  AssociateWorkspaceApplicationRequest,
  AssociateWorkspaceApplicationResult,
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
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AssociateWorkspaceApplicationRequest,
  output: AssociateWorkspaceApplicationResult,
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
}));
/**
 * Adds one or more rules to the specified IP access control group.
 *
 * This action gives users permission to access their WorkSpaces from the CIDR address
 * ranges specified in the rules.
 */
export const authorizeIpRules: API.OperationMethod<
  AuthorizeIpRulesRequest,
  AuthorizeIpRulesResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AuthorizeIpRulesRequest,
  output: AuthorizeIpRulesResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
}));
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
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CopyWorkspaceImageRequest,
  output: CopyWorkspaceImageResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ResourceUnavailableException,
  ],
}));
/**
 * Creates the account link invitation.
 */
export const createAccountLinkInvitation: API.OperationMethod<
  CreateAccountLinkInvitationRequest,
  CreateAccountLinkInvitationResult,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAccountLinkInvitationRequest,
  output: CreateAccountLinkInvitationResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ValidationException,
  ],
}));
/**
 * Creates a client-add-in for Amazon Connect within a directory. You can create only
 * one Amazon Connect client add-in within a directory.
 *
 * This client add-in allows WorkSpaces users to seamlessly connect to Amazon Connect.
 */
export const createConnectClientAddIn: API.OperationMethod<
  CreateConnectClientAddInRequest,
  CreateConnectClientAddInResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceAlreadyExistsException
  | ResourceCreationFailedException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateConnectClientAddInRequest,
  output: CreateConnectClientAddInResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceAlreadyExistsException,
    ResourceCreationFailedException,
    ResourceNotFoundException,
  ],
}));
/**
 * Creates the specified connection alias for use with cross-Region redirection. For more
 * information, see Cross-Region
 * Redirection for Amazon WorkSpaces.
 */
export const createConnectionAlias: API.OperationMethod<
  CreateConnectionAliasRequest,
  CreateConnectionAliasResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateConnectionAliasRequest,
  output: CreateConnectionAliasResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
  ],
}));
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
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceAlreadyExistsException
  | ResourceCreationFailedException
  | ResourceLimitExceededException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateIpGroupRequest,
  output: CreateIpGroupResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceAlreadyExistsException,
    ResourceCreationFailedException,
    ResourceLimitExceededException,
  ],
}));
/**
 * Creates a standby WorkSpace in a secondary Region.
 */
export const createStandbyWorkspaces: API.OperationMethod<
  CreateStandbyWorkspacesRequest,
  CreateStandbyWorkspacesResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateStandbyWorkspacesRequest,
  output: CreateStandbyWorkspacesResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
}));
/**
 * Creates the specified tags for the specified WorkSpaces resource.
 */
export const createTags: API.OperationMethod<
  CreateTagsRequest,
  CreateTagsResult,
  | InvalidParameterValuesException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateTagsRequest,
  output: CreateTagsResult,
  errors: [
    InvalidParameterValuesException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
}));
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
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateUpdatedWorkspaceImageRequest,
  output: CreateUpdatedWorkspaceImageResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
}));
/**
 * Creates the specified WorkSpace bundle. For more information about creating WorkSpace bundles, see
 *
 * Create a Custom WorkSpaces Image and Bundle.
 */
export const createWorkspaceBundle: API.OperationMethod<
  CreateWorkspaceBundleRequest,
  CreateWorkspaceBundleResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateWorkspaceBundleRequest,
  output: CreateWorkspaceBundleResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ResourceUnavailableException,
  ],
}));
/**
 * Creates a new WorkSpace image from an existing WorkSpace.
 */
export const createWorkspaceImage: API.OperationMethod<
  CreateWorkspaceImageRequest,
  CreateWorkspaceImageResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateWorkspaceImageRequest,
  output: CreateWorkspaceImageResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
}));
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
  | InvalidParameterValuesException
  | ResourceLimitExceededException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateWorkspacesRequest,
  output: CreateWorkspacesResult,
  errors: [InvalidParameterValuesException, ResourceLimitExceededException],
}));
/**
 * Creates a pool of WorkSpaces.
 */
export const createWorkspacesPool: API.OperationMethod<
  CreateWorkspacesPoolRequest,
  CreateWorkspacesPoolResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateWorkspacesPoolRequest,
  output: CreateWorkspacesPoolResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
}));
/**
 * Deletes the account link invitation.
 */
export const deleteAccountLinkInvitation: API.OperationMethod<
  DeleteAccountLinkInvitationRequest,
  DeleteAccountLinkInvitationResult,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAccountLinkInvitationRequest,
  output: DeleteAccountLinkInvitationResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
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
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteClientBrandingRequest,
  output: DeleteClientBrandingResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
}));
/**
 * Deletes a client-add-in for Amazon Connect that is configured within a
 * directory.
 */
export const deleteConnectClientAddIn: API.OperationMethod<
  DeleteConnectClientAddInRequest,
  DeleteConnectClientAddInResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteConnectClientAddInRequest,
  output: DeleteConnectClientAddInResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
}));
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
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceAssociatedException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteConnectionAliasRequest,
  output: DeleteConnectionAliasResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceAssociatedException,
    ResourceNotFoundException,
  ],
}));
/**
 * Deletes the specified IP access control group.
 *
 * You cannot delete an IP access control group that is associated with a directory.
 */
export const deleteIpGroup: API.OperationMethod<
  DeleteIpGroupRequest,
  DeleteIpGroupResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceAssociatedException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteIpGroupRequest,
  output: DeleteIpGroupResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceAssociatedException,
    ResourceNotFoundException,
  ],
}));
/**
 * Deletes the specified tags from the specified WorkSpaces resource.
 */
export const deleteTags: API.OperationMethod<
  DeleteTagsRequest,
  DeleteTagsResult,
  InvalidParameterValuesException | ResourceNotFoundException | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteTagsRequest,
  output: DeleteTagsResult,
  errors: [InvalidParameterValuesException, ResourceNotFoundException],
}));
/**
 * Deletes the specified WorkSpace bundle. For more information about deleting WorkSpace bundles, see
 *
 * Delete a Custom WorkSpaces Bundle or Image.
 */
export const deleteWorkspaceBundle: API.OperationMethod<
  DeleteWorkspaceBundleRequest,
  DeleteWorkspaceBundleResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceAssociatedException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteWorkspaceBundleRequest,
  output: DeleteWorkspaceBundleResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceAssociatedException,
    ResourceNotFoundException,
  ],
}));
/**
 * Deletes the specified image from your account. To delete an image, you must first delete
 * any bundles that are associated with the image and unshare the image if it is shared with
 * other accounts.
 */
export const deleteWorkspaceImage: API.OperationMethod<
  DeleteWorkspaceImageRequest,
  DeleteWorkspaceImageResult,
  | AccessDeniedException
  | InvalidResourceStateException
  | ResourceAssociatedException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteWorkspaceImageRequest,
  output: DeleteWorkspaceImageResult,
  errors: [
    AccessDeniedException,
    InvalidResourceStateException,
    ResourceAssociatedException,
  ],
}));
/**
 * Deploys associated applications to the specified WorkSpace
 */
export const deployWorkspaceApplications: API.OperationMethod<
  DeployWorkspaceApplicationsRequest,
  DeployWorkspaceApplicationsResult,
  | AccessDeniedException
  | IncompatibleApplicationsException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeployWorkspaceApplicationsRequest,
  output: DeployWorkspaceApplicationsResult,
  errors: [
    AccessDeniedException,
    IncompatibleApplicationsException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
}));
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
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeregisterWorkspaceDirectoryRequest,
  output: DeregisterWorkspaceDirectoryResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
}));
/**
 * Retrieves a list that describes the configuration of Bring Your Own License (BYOL) for
 * the specified account.
 */
export const describeAccount: API.OperationMethod<
  DescribeAccountRequest,
  DescribeAccountResult,
  AccessDeniedException | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeAccountRequest,
  output: DescribeAccountResult,
  errors: [AccessDeniedException],
}));
/**
 * Retrieves a list that describes modifications to the configuration of Bring Your Own
 * License (BYOL) for the specified account.
 */
export const describeAccountModifications: API.OperationMethod<
  DescribeAccountModificationsRequest,
  DescribeAccountModificationsResult,
  AccessDeniedException | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeAccountModificationsRequest,
  output: DescribeAccountModificationsResult,
  errors: [AccessDeniedException],
}));
/**
 * Describes the associations between the application and the specified associated resources.
 */
export const describeApplicationAssociations: API.OperationMethod<
  DescribeApplicationAssociationsRequest,
  DescribeApplicationAssociationsResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: DescribeApplicationAssociationsRequest,
  ) => stream.Stream<
    DescribeApplicationAssociationsResult,
    | AccessDeniedException
    | InvalidParameterValuesException
    | OperationNotSupportedException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: DescribeApplicationAssociationsRequest,
  ) => stream.Stream<
    unknown,
    | AccessDeniedException
    | InvalidParameterValuesException
    | OperationNotSupportedException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DescribeApplicationAssociationsRequest,
  output: DescribeApplicationAssociationsResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Describes the specified applications by filtering based on their compute types, license availability, operating systems, and owners.
 */
export const describeApplications: API.OperationMethod<
  DescribeApplicationsRequest,
  DescribeApplicationsResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: DescribeApplicationsRequest,
  ) => stream.Stream<
    DescribeApplicationsResult,
    | AccessDeniedException
    | InvalidParameterValuesException
    | OperationNotSupportedException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: DescribeApplicationsRequest,
  ) => stream.Stream<
    unknown,
    | AccessDeniedException
    | InvalidParameterValuesException
    | OperationNotSupportedException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DescribeApplicationsRequest,
  output: DescribeApplicationsResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Describes the associations between the applications and the specified bundle.
 */
export const describeBundleAssociations: API.OperationMethod<
  DescribeBundleAssociationsRequest,
  DescribeBundleAssociationsResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeBundleAssociationsRequest,
  output: DescribeBundleAssociationsResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
}));
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
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeClientBrandingRequest,
  output: DescribeClientBrandingResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
}));
/**
 * Retrieves a list that describes one or more specified Amazon WorkSpaces clients.
 */
export const describeClientProperties: API.OperationMethod<
  DescribeClientPropertiesRequest,
  DescribeClientPropertiesResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeClientPropertiesRequest,
  output: DescribeClientPropertiesResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
}));
/**
 * Retrieves a list of Amazon Connect client add-ins that have been created.
 */
export const describeConnectClientAddIns: API.OperationMethod<
  DescribeConnectClientAddInsRequest,
  DescribeConnectClientAddInsResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeConnectClientAddInsRequest,
  output: DescribeConnectClientAddInsResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
}));
/**
 * Retrieves a list that describes the connection aliases used for cross-Region
 * redirection. For more information, see Cross-Region
 * Redirection for Amazon WorkSpaces.
 */
export const describeConnectionAliases: API.OperationMethod<
  DescribeConnectionAliasesRequest,
  DescribeConnectionAliasesResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeConnectionAliasesRequest,
  output: DescribeConnectionAliasesResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
  ],
}));
/**
 * Describes the permissions that the owner of a connection alias has granted to another
 * Amazon Web Services account for the specified connection alias. For more information, see
 * Cross-Region
 * Redirection for Amazon WorkSpaces.
 */
export const describeConnectionAliasPermissions: API.OperationMethod<
  DescribeConnectionAliasPermissionsRequest,
  DescribeConnectionAliasPermissionsResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeConnectionAliasPermissionsRequest,
  output: DescribeConnectionAliasPermissionsResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
}));
/**
 * Retrieves information about a WorkSpace BYOL image being imported via ImportCustomWorkspaceImage.
 */
export const describeCustomWorkspaceImageImport: API.OperationMethod<
  DescribeCustomWorkspaceImageImportRequest,
  DescribeCustomWorkspaceImageImportResult,
  AccessDeniedException | ResourceNotFoundException | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeCustomWorkspaceImageImportRequest,
  output: DescribeCustomWorkspaceImageImportResult,
  errors: [AccessDeniedException, ResourceNotFoundException],
}));
/**
 * Describes the associations between the applications and the specified image.
 */
export const describeImageAssociations: API.OperationMethod<
  DescribeImageAssociationsRequest,
  DescribeImageAssociationsResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeImageAssociationsRequest,
  output: DescribeImageAssociationsResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
}));
/**
 * Describes one or more of your IP access control groups.
 */
export const describeIpGroups: API.OperationMethod<
  DescribeIpGroupsRequest,
  DescribeIpGroupsResult,
  AccessDeniedException | InvalidParameterValuesException | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeIpGroupsRequest,
  output: DescribeIpGroupsResult,
  errors: [AccessDeniedException, InvalidParameterValuesException],
}));
/**
 * Describes the specified tags for the specified WorkSpaces resource.
 */
export const describeTags: API.OperationMethod<
  DescribeTagsRequest,
  DescribeTagsResult,
  ResourceNotFoundException | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeTagsRequest,
  output: DescribeTagsResult,
  errors: [ResourceNotFoundException],
}));
/**
 * Describes the associations betweens applications and the specified WorkSpace.
 */
export const describeWorkspaceAssociations: API.OperationMethod<
  DescribeWorkspaceAssociationsRequest,
  DescribeWorkspaceAssociationsResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeWorkspaceAssociationsRequest,
  output: DescribeWorkspaceAssociationsResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
}));
/**
 * Retrieves a list that describes the available WorkSpace bundles.
 *
 * You can filter the results using either bundle ID or owner, but not both.
 */
export const describeWorkspaceBundles: API.OperationMethod<
  DescribeWorkspaceBundlesRequest,
  DescribeWorkspaceBundlesResult,
  InvalidParameterValuesException | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: DescribeWorkspaceBundlesRequest,
  ) => stream.Stream<
    DescribeWorkspaceBundlesResult,
    InvalidParameterValuesException | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: DescribeWorkspaceBundlesRequest,
  ) => stream.Stream<
    WorkspaceBundle,
    InvalidParameterValuesException | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DescribeWorkspaceBundlesRequest,
  output: DescribeWorkspaceBundlesResult,
  errors: [InvalidParameterValuesException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Bundles",
  } as const,
}));
/**
 * Describes the available directories that are registered with Amazon WorkSpaces.
 */
export const describeWorkspaceDirectories: API.OperationMethod<
  DescribeWorkspaceDirectoriesRequest,
  DescribeWorkspaceDirectoriesResult,
  InvalidParameterValuesException | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: DescribeWorkspaceDirectoriesRequest,
  ) => stream.Stream<
    DescribeWorkspaceDirectoriesResult,
    InvalidParameterValuesException | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: DescribeWorkspaceDirectoriesRequest,
  ) => stream.Stream<
    WorkspaceDirectory,
    InvalidParameterValuesException | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DescribeWorkspaceDirectoriesRequest,
  output: DescribeWorkspaceDirectoriesResult,
  errors: [InvalidParameterValuesException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Directories",
  } as const,
}));
/**
 * Describes the permissions that the owner of an image has granted to other Amazon Web Services accounts for an image.
 */
export const describeWorkspaceImagePermissions: API.OperationMethod<
  DescribeWorkspaceImagePermissionsRequest,
  DescribeWorkspaceImagePermissionsResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeWorkspaceImagePermissionsRequest,
  output: DescribeWorkspaceImagePermissionsResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
}));
/**
 * Retrieves a list that describes one or more specified images, if the image identifiers
 * are provided. Otherwise, all images in the account are described.
 */
export const describeWorkspaceImages: API.OperationMethod<
  DescribeWorkspaceImagesRequest,
  DescribeWorkspaceImagesResult,
  AccessDeniedException | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeWorkspaceImagesRequest,
  output: DescribeWorkspaceImagesResult,
  errors: [AccessDeniedException],
}));
/**
 * Describes the specified WorkSpaces.
 *
 * You can filter the results by using the bundle identifier, directory identifier, or
 * owner, but you can specify only one filter at a time.
 */
export const describeWorkspaces: API.OperationMethod<
  DescribeWorkspacesRequest,
  DescribeWorkspacesResult,
  InvalidParameterValuesException | ResourceUnavailableException | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: DescribeWorkspacesRequest,
  ) => stream.Stream<
    DescribeWorkspacesResult,
    | InvalidParameterValuesException
    | ResourceUnavailableException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: DescribeWorkspacesRequest,
  ) => stream.Stream<
    Workspace,
    | InvalidParameterValuesException
    | ResourceUnavailableException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DescribeWorkspacesRequest,
  output: DescribeWorkspacesResult,
  errors: [InvalidParameterValuesException, ResourceUnavailableException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Workspaces",
    pageSize: "Limit",
  } as const,
}));
/**
 * Describes the connection status of the specified WorkSpaces.
 */
export const describeWorkspacesConnectionStatus: API.OperationMethod<
  DescribeWorkspacesConnectionStatusRequest,
  DescribeWorkspacesConnectionStatusResult,
  InvalidParameterValuesException | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeWorkspacesConnectionStatusRequest,
  output: DescribeWorkspacesConnectionStatusResult,
  errors: [InvalidParameterValuesException],
}));
/**
 * Describes the snapshots for the specified WorkSpace.
 */
export const describeWorkspaceSnapshots: API.OperationMethod<
  DescribeWorkspaceSnapshotsRequest,
  DescribeWorkspaceSnapshotsResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeWorkspaceSnapshotsRequest,
  output: DescribeWorkspaceSnapshotsResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
}));
/**
 * Describes the specified WorkSpaces Pools.
 */
export const describeWorkspacesPools: API.OperationMethod<
  DescribeWorkspacesPoolsRequest,
  DescribeWorkspacesPoolsResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeWorkspacesPoolsRequest,
  output: DescribeWorkspacesPoolsResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
}));
/**
 * Retrieves a list that describes the streaming sessions for a specified pool.
 */
export const describeWorkspacesPoolSessions: API.OperationMethod<
  DescribeWorkspacesPoolSessionsRequest,
  DescribeWorkspacesPoolSessionsResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeWorkspacesPoolSessionsRequest,
  output: DescribeWorkspacesPoolSessionsResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
}));
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
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateConnectionAliasRequest,
  output: DisassociateConnectionAliasResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
}));
/**
 * Disassociates the specified IP access control group from the specified directory.
 */
export const disassociateIpGroups: API.OperationMethod<
  DisassociateIpGroupsRequest,
  DisassociateIpGroupsResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateIpGroupsRequest,
  output: DisassociateIpGroupsResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
}));
/**
 * Disassociates the specified application from a WorkSpace.
 */
export const disassociateWorkspaceApplication: API.OperationMethod<
  DisassociateWorkspaceApplicationRequest,
  DisassociateWorkspaceApplicationResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateWorkspaceApplicationRequest,
  output: DisassociateWorkspaceApplicationResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
}));
/**
 * Retrieves account link information.
 */
export const getAccountLink: API.OperationMethod<
  GetAccountLinkRequest,
  GetAccountLinkResult,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAccountLinkRequest,
  output: GetAccountLinkResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
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
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ImportClientBrandingRequest,
  output: ImportClientBrandingResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
}));
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
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ImportCustomWorkspaceImageRequest,
  output: ImportCustomWorkspaceImageResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
}));
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
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ImportWorkspaceImageRequest,
  output: ImportWorkspaceImageResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
}));
/**
 * Lists all account links.
 */
export const listAccountLinks: API.OperationMethod<
  ListAccountLinksRequest,
  ListAccountLinksResult,
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListAccountLinksRequest,
  ) => stream.Stream<
    ListAccountLinksResult,
    | AccessDeniedException
    | InternalServerException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListAccountLinksRequest,
  ) => stream.Stream<
    AccountLink,
    | AccessDeniedException
    | InternalServerException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAccountLinksRequest,
  output: ListAccountLinksResult,
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AccountLinks",
    pageSize: "MaxResults",
  } as const,
}));
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
  AccessDeniedException | InvalidParameterValuesException | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListAvailableManagementCidrRangesRequest,
  output: ListAvailableManagementCidrRangesResult,
  errors: [AccessDeniedException, InvalidParameterValuesException],
}));
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
 */
export const migrateWorkspace: API.OperationMethod<
  MigrateWorkspaceRequest,
  MigrateWorkspaceResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationInProgressException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: MigrateWorkspaceRequest,
  output: MigrateWorkspaceResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationInProgressException,
    OperationNotSupportedException,
    ResourceNotFoundException,
    ResourceUnavailableException,
  ],
}));
/**
 * Modifies the configuration of Bring Your Own License (BYOL) for the specified
 * account.
 */
export const modifyAccount: API.OperationMethod<
  ModifyAccountRequest,
  ModifyAccountResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ModifyAccountRequest,
  output: ModifyAccountResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    ResourceNotFoundException,
    ResourceUnavailableException,
  ],
}));
/**
 * Modifies the properties of the certificate-based authentication you want
 * to use with your WorkSpaces.
 */
export const modifyCertificateBasedAuthProperties: API.OperationMethod<
  ModifyCertificateBasedAuthPropertiesRequest,
  ModifyCertificateBasedAuthPropertiesResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ModifyCertificateBasedAuthPropertiesRequest,
  output: ModifyCertificateBasedAuthPropertiesResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
}));
/**
 * Modifies the properties of the specified Amazon WorkSpaces clients.
 */
export const modifyClientProperties: API.OperationMethod<
  ModifyClientPropertiesRequest,
  ModifyClientPropertiesResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ModifyClientPropertiesRequest,
  output: ModifyClientPropertiesResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
}));
/**
 * Modifies the endpoint encryption mode that allows you to configure the specified
 * directory between Standard TLS and FIPS 140-2 validated mode.
 */
export const modifyEndpointEncryptionMode: API.OperationMethod<
  ModifyEndpointEncryptionModeRequest,
  ModifyEndpointEncryptionModeResponse,
  | AccessDeniedException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ModifyEndpointEncryptionModeRequest,
  output: ModifyEndpointEncryptionModeResponse,
  errors: [
    AccessDeniedException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
}));
/**
 * Modifies multiple properties related to SAML 2.0 authentication, including the enablement status,
 * user access URL, and relay state parameter name that are used for configuring federation with an
 * SAML 2.0 identity provider.
 */
export const modifySamlProperties: API.OperationMethod<
  ModifySamlPropertiesRequest,
  ModifySamlPropertiesResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ModifySamlPropertiesRequest,
  output: ModifySamlPropertiesResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
}));
/**
 * Modifies the self-service WorkSpace management capabilities for your users. For more
 * information, see Enable Self-Service WorkSpace Management Capabilities for Your Users.
 */
export const modifySelfservicePermissions: API.OperationMethod<
  ModifySelfservicePermissionsRequest,
  ModifySelfservicePermissionsResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ModifySelfservicePermissionsRequest,
  output: ModifySelfservicePermissionsResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
}));
/**
 * Modifies the specified streaming properties.
 */
export const modifyStreamingProperties: API.OperationMethod<
  ModifyStreamingPropertiesRequest,
  ModifyStreamingPropertiesResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ModifyStreamingPropertiesRequest,
  output: ModifyStreamingPropertiesResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
}));
/**
 * Specifies which devices and operating systems users can use to access their WorkSpaces.
 * For more information, see
 * Control Device Access.
 */
export const modifyWorkspaceAccessProperties: API.OperationMethod<
  ModifyWorkspaceAccessPropertiesRequest,
  ModifyWorkspaceAccessPropertiesResult,
  | AccessDeniedException
  | InvalidParameterCombinationException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ModifyWorkspaceAccessPropertiesRequest,
  output: ModifyWorkspaceAccessPropertiesResult,
  errors: [
    AccessDeniedException,
    InvalidParameterCombinationException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
}));
/**
 * Modify the default properties used to create WorkSpaces.
 */
export const modifyWorkspaceCreationProperties: API.OperationMethod<
  ModifyWorkspaceCreationPropertiesRequest,
  ModifyWorkspaceCreationPropertiesResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ModifyWorkspaceCreationPropertiesRequest,
  output: ModifyWorkspaceCreationPropertiesResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
}));
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
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationInProgressException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | UnsupportedWorkspaceConfigurationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ModifyWorkspacePropertiesRequest,
  output: ModifyWorkspacePropertiesResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationInProgressException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    UnsupportedWorkspaceConfigurationException,
  ],
}));
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
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ModifyWorkspaceStateRequest,
  output: ModifyWorkspaceStateResult,
  errors: [
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
}));
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
  OperationNotSupportedException | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RebootWorkspacesRequest,
  output: RebootWorkspacesResult,
  errors: [OperationNotSupportedException],
}));
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
  OperationNotSupportedException | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RebuildWorkspacesRequest,
  output: RebuildWorkspacesResult,
  errors: [OperationNotSupportedException],
}));
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
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | UnsupportedNetworkConfigurationException
  | WorkspacesDefaultRoleNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RegisterWorkspaceDirectoryRequest,
  output: RegisterWorkspaceDirectoryResult,
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
}));
/**
 * Rejects the account link invitation.
 */
export const rejectAccountLinkInvitation: API.OperationMethod<
  RejectAccountLinkInvitationRequest,
  RejectAccountLinkInvitationResult,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RejectAccountLinkInvitationRequest,
  output: RejectAccountLinkInvitationResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
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
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RestoreWorkspaceRequest,
  output: RestoreWorkspaceResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
}));
/**
 * Removes one or more rules from the specified IP access control group.
 */
export const revokeIpRules: API.OperationMethod<
  RevokeIpRulesRequest,
  RevokeIpRulesResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RevokeIpRulesRequest,
  output: RevokeIpRulesResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    ResourceNotFoundException,
  ],
}));
/**
 * Starts the specified WorkSpaces.
 *
 * You cannot start a WorkSpace unless it has a running mode of `AutoStop` or
 * `Manual` and a state of `STOPPED`.
 */
export const startWorkspaces: API.OperationMethod<
  StartWorkspacesRequest,
  StartWorkspacesResult,
  CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartWorkspacesRequest,
  output: StartWorkspacesResult,
  errors: [],
}));
/**
 * Starts the specified pool.
 *
 * You cannot start a pool unless it has a running mode of
 * `AutoStop` and a state of `STOPPED`.
 */
export const startWorkspacesPool: API.OperationMethod<
  StartWorkspacesPoolRequest,
  StartWorkspacesPoolResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationInProgressException
  | OperationNotSupportedException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartWorkspacesPoolRequest,
  output: StartWorkspacesPoolResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationInProgressException,
    OperationNotSupportedException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
}));
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
  CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopWorkspacesRequest,
  output: StopWorkspacesResult,
  errors: [],
}));
/**
 * Stops the specified pool.
 *
 * You cannot stop a WorkSpace pool unless it has a running mode of `AutoStop`
 * and a state of `AVAILABLE`, `IMPAIRED`, `UNHEALTHY`, or `ERROR`.
 */
export const stopWorkspacesPool: API.OperationMethod<
  StopWorkspacesPoolRequest,
  StopWorkspacesPoolResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationInProgressException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopWorkspacesPoolRequest,
  output: StopWorkspacesPoolResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationInProgressException,
    ResourceNotFoundException,
  ],
}));
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
  CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TerminateWorkspacesRequest,
  output: TerminateWorkspacesResult,
  errors: [],
}));
/**
 * Terminates the specified pool.
 */
export const terminateWorkspacesPool: API.OperationMethod<
  TerminateWorkspacesPoolRequest,
  TerminateWorkspacesPoolResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationInProgressException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TerminateWorkspacesPoolRequest,
  output: TerminateWorkspacesPoolResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationInProgressException,
    ResourceNotFoundException,
  ],
}));
/**
 * Terminates the pool session.
 */
export const terminateWorkspacesPoolSession: API.OperationMethod<
  TerminateWorkspacesPoolSessionRequest,
  TerminateWorkspacesPoolSessionResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationInProgressException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TerminateWorkspacesPoolSessionRequest,
  output: TerminateWorkspacesPoolSessionResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationInProgressException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
}));
/**
 * Updates a Amazon Connect client add-in. Use this action to update the name and
 * endpoint URL of a Amazon Connect client add-in.
 */
export const updateConnectClientAddIn: API.OperationMethod<
  UpdateConnectClientAddInRequest,
  UpdateConnectClientAddInResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateConnectClientAddInRequest,
  output: UpdateConnectClientAddInResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
}));
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
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceAssociatedException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateConnectionAliasPermissionRequest,
  output: UpdateConnectionAliasPermissionResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceAssociatedException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
}));
/**
 * Replaces the current rules of the specified IP access control group with the specified
 * rules.
 */
export const updateRulesOfIpGroup: API.OperationMethod<
  UpdateRulesOfIpGroupRequest,
  UpdateRulesOfIpGroupResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRulesOfIpGroupRequest,
  output: UpdateRulesOfIpGroupResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
}));
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
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateWorkspaceBundleRequest,
  output: UpdateWorkspaceBundleResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
    ResourceUnavailableException,
  ],
}));
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
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateWorkspaceImagePermissionRequest,
  output: UpdateWorkspaceImagePermissionResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
    ResourceUnavailableException,
  ],
}));
/**
 * Updates the specified pool.
 */
export const updateWorkspacesPool: API.OperationMethod<
  UpdateWorkspacesPoolRequest,
  UpdateWorkspacesPoolResult,
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationInProgressException
  | OperationNotSupportedException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateWorkspacesPoolRequest,
  output: UpdateWorkspacesPoolResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationInProgressException,
    OperationNotSupportedException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
}));
