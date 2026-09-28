import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "WorkMail",
  target: "WorkMailService",
  version: "2017-10-01",
  sigv4: "workmail",
  protocol: awsJson1_1Protocol,
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
                `https://workmail-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://workmail-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://workmail.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://workmail.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class DirectoryInUseException
  extends /*@__PURE__*/ TE.TaggedError("DirectoryInUseException")<{
    readonly message?: string;
  }> {}
export class DirectoryServiceAuthenticationFailedException
  extends /*@__PURE__*/ TE.TaggedError(
    "DirectoryServiceAuthenticationFailedException",
  )<{ readonly message?: string }> {}
export class DirectoryUnavailableException
  extends /*@__PURE__*/ TE.TaggedError("DirectoryUnavailableException")<{
    readonly message?: string;
  }> {}
export class EmailAddressInUseException
  extends /*@__PURE__*/ TE.TaggedError("EmailAddressInUseException")<{
    readonly message?: string;
  }> {}
export class EntityAlreadyRegisteredException
  extends /*@__PURE__*/ TE.TaggedError("EntityAlreadyRegisteredException")<{
    readonly message?: string;
  }> {}
export class EntityNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("EntityNotFoundException")<{
    readonly message?: string;
  }> {}
export class EntityStateException
  extends /*@__PURE__*/ TE.TaggedError("EntityStateException")<{
    readonly message?: string;
  }> {}
export class InvalidConfigurationException
  extends /*@__PURE__*/ TE.TaggedError("InvalidConfigurationException")<{
    readonly message?: string;
  }> {}
export class InvalidCustomSesConfigurationException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidCustomSesConfigurationException",
  )<{ readonly message?: string }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError("InvalidParameterException")<{
    readonly message?: string;
  }> {}
export class InvalidPasswordException
  extends /*@__PURE__*/ TE.TaggedError("InvalidPasswordException")<{
    readonly message?: string;
  }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException")<{
    readonly message?: string;
  }> {}
export class MailDomainInUseException
  extends /*@__PURE__*/ TE.TaggedError("MailDomainInUseException")<{
    readonly message?: string;
  }> {}
export class MailDomainNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("MailDomainNotFoundException")<{
    readonly message?: string;
  }> {}
export class MailDomainStateException
  extends /*@__PURE__*/ TE.TaggedError("MailDomainStateException")<{
    readonly message?: string;
  }> {}
export class NameAvailabilityException
  extends /*@__PURE__*/ TE.TaggedError("NameAvailabilityException")<{
    readonly message?: string;
  }> {}
export class OrganizationNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("OrganizationNotFoundException")<{
    readonly message?: string;
  }> {}
export class OrganizationStateException
  extends /*@__PURE__*/ TE.TaggedError("OrganizationStateException")<{
    readonly message?: string;
  }> {}
export class ReservedNameException
  extends /*@__PURE__*/ TE.TaggedError("ReservedNameException")<{
    readonly message?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ TE.TaggedError("UnsupportedOperationException")<{
    readonly message?: string;
  }> {}
export type OrganizationId = string;
export type EntityIdentifier = string;
export interface AssociateDelegateToResourceRequest {
  OrganizationId: string;
  ResourceId: string;
  EntityId: string;
}
export interface AssociateDelegateToResourceResponse {}
export interface AssociateMemberToGroupRequest {
  OrganizationId: string;
  GroupId: string;
  MemberId: string;
}
export interface AssociateMemberToGroupResponse {}
export type ImpersonationRoleId = string;
export interface AssumeImpersonationRoleRequest {
  OrganizationId: string;
  ImpersonationRoleId: string;
}
export type ImpersonationToken = string;
export type ExpiresIn = number;
export interface AssumeImpersonationRoleResponse {
  Token?: string;
  ExpiresIn?: number;
}
export type IdempotencyClientToken = string;
export type MailboxExportJobId = string;
export interface CancelMailboxExportJobRequest {
  ClientToken: string;
  JobId: string;
  OrganizationId: string;
}
export interface CancelMailboxExportJobResponse {}
export type WorkMailIdentifier = string;
export type EmailAddress = string;
export interface CreateAliasRequest {
  OrganizationId: string;
  EntityId: string;
  Alias: string;
}
export interface CreateAliasResponse {}
export type DomainName = string;
export type Url = string;
export type ExternalUserName = string;
export type Password = string | redacted.Redacted<string>;
export interface EwsAvailabilityProvider {
  EwsEndpoint: string;
  EwsUsername: string;
  EwsPassword: string | redacted.Redacted<string>;
}
export type LambdaArn = string;
export interface LambdaAvailabilityProvider {
  LambdaArn: string;
}
export interface CreateAvailabilityConfigurationRequest {
  ClientToken?: string;
  OrganizationId: string;
  DomainName: string;
  EwsProvider?: EwsAvailabilityProvider;
  LambdaProvider?: LambdaAvailabilityProvider;
}
export interface CreateAvailabilityConfigurationResponse {}
export type GroupName = string;
export interface CreateGroupRequest {
  OrganizationId: string;
  Name: string;
  HiddenFromGlobalAddressList?: boolean;
}
export interface CreateGroupResponse {
  GroupId?: string;
}
export type IdentityCenterApplicationName = string;
export type InstanceArn = string;
export interface CreateIdentityCenterApplicationRequest {
  Name: string;
  InstanceArn: string;
  ClientToken?: string;
}
export type ApplicationArn = string;
export interface CreateIdentityCenterApplicationResponse {
  ApplicationArn?: string;
}
export type ImpersonationRoleName = string;
export type ImpersonationRoleType = "FULL_ACCESS" | "READ_ONLY" | (string & {});
export type ImpersonationRoleDescription = string;
export type ImpersonationRuleId = string;
export type ImpersonationRuleName = string;
export type ImpersonationRuleDescription = string;
export type AccessEffect = "ALLOW" | "DENY" | (string & {});
export type TargetUsers = string[];
export interface ImpersonationRule {
  ImpersonationRuleId: string;
  Name?: string;
  Description?: string;
  Effect: AccessEffect;
  TargetUsers?: string[];
  NotTargetUsers?: string[];
}
export type ImpersonationRuleList = ImpersonationRule[];
export interface CreateImpersonationRoleRequest {
  ClientToken?: string;
  OrganizationId: string;
  Name: string;
  Type: ImpersonationRoleType;
  Description?: string;
  Rules: ImpersonationRule[];
}
export interface CreateImpersonationRoleResponse {
  ImpersonationRoleId?: string;
}
export type MobileDeviceAccessRuleName = string;
export type MobileDeviceAccessRuleDescription = string;
export type MobileDeviceAccessRuleEffect = "ALLOW" | "DENY" | (string & {});
export type DeviceType = string;
export type DeviceTypeList = string[];
export type DeviceModel = string;
export type DeviceModelList = string[];
export type DeviceOperatingSystem = string;
export type DeviceOperatingSystemList = string[];
export type DeviceUserAgent = string;
export type DeviceUserAgentList = string[];
export interface CreateMobileDeviceAccessRuleRequest {
  OrganizationId: string;
  ClientToken?: string;
  Name: string;
  Description?: string;
  Effect: MobileDeviceAccessRuleEffect;
  DeviceTypes?: string[];
  NotDeviceTypes?: string[];
  DeviceModels?: string[];
  NotDeviceModels?: string[];
  DeviceOperatingSystems?: string[];
  NotDeviceOperatingSystems?: string[];
  DeviceUserAgents?: string[];
  NotDeviceUserAgents?: string[];
}
export type MobileDeviceAccessRuleId = string;
export interface CreateMobileDeviceAccessRuleResponse {
  MobileDeviceAccessRuleId?: string;
}
export type DirectoryId = string;
export type OrganizationName = string;
export type HostedZoneId = string;
export interface Domain {
  DomainName: string;
  HostedZoneId?: string;
}
export type Domains = Domain[];
export type KmsKeyArn = string;
export interface CreateOrganizationRequest {
  DirectoryId?: string;
  Alias: string;
  ClientToken?: string;
  Domains?: Domain[];
  KmsKeyArn?: string;
  EnableInteroperability?: boolean;
}
export interface CreateOrganizationResponse {
  OrganizationId?: string;
}
export type ResourceName = string;
export type ResourceType = "ROOM" | "EQUIPMENT" | (string & {});
export type ResourceDescription = string | redacted.Redacted<string>;
export interface CreateResourceRequest {
  OrganizationId: string;
  Name: string;
  Type: ResourceType;
  Description?: string | redacted.Redacted<string>;
  HiddenFromGlobalAddressList?: boolean;
}
export type ResourceId = string;
export interface CreateResourceResponse {
  ResourceId?: string;
}
export type UserName = string;
export type UserAttribute = string | redacted.Redacted<string>;
export type UserRole =
  | "USER"
  | "RESOURCE"
  | "SYSTEM_USER"
  | "REMOTE_USER"
  | (string & {});
export type IdentityProviderUserId = string;
export interface CreateUserRequest {
  OrganizationId: string;
  Name: string;
  DisplayName: string | redacted.Redacted<string>;
  Password?: string | redacted.Redacted<string>;
  Role?: UserRole;
  FirstName?: string | redacted.Redacted<string>;
  LastName?: string | redacted.Redacted<string>;
  HiddenFromGlobalAddressList?: boolean;
  IdentityProviderUserId?: string;
}
export interface CreateUserResponse {
  UserId?: string;
}
export type AccessControlRuleName = string;
export interface DeleteAccessControlRuleRequest {
  OrganizationId: string;
  Name: string;
}
export interface DeleteAccessControlRuleResponse {}
export interface DeleteAliasRequest {
  OrganizationId: string;
  EntityId: string;
  Alias: string;
}
export interface DeleteAliasResponse {}
export interface DeleteAvailabilityConfigurationRequest {
  OrganizationId: string;
  DomainName: string;
}
export interface DeleteAvailabilityConfigurationResponse {}
export interface DeleteEmailMonitoringConfigurationRequest {
  OrganizationId: string;
}
export interface DeleteEmailMonitoringConfigurationResponse {}
export interface DeleteGroupRequest {
  OrganizationId: string;
  GroupId: string;
}
export interface DeleteGroupResponse {}
export interface DeleteIdentityCenterApplicationRequest {
  ApplicationArn: string;
}
export interface DeleteIdentityCenterApplicationResponse {}
export interface DeleteIdentityProviderConfigurationRequest {
  OrganizationId: string;
}
export interface DeleteIdentityProviderConfigurationResponse {}
export interface DeleteImpersonationRoleRequest {
  OrganizationId: string;
  ImpersonationRoleId: string;
}
export interface DeleteImpersonationRoleResponse {}
export interface DeleteMailboxPermissionsRequest {
  OrganizationId: string;
  EntityId: string;
  GranteeId: string;
}
export interface DeleteMailboxPermissionsResponse {}
export type DeviceId = string;
export interface DeleteMobileDeviceAccessOverrideRequest {
  OrganizationId: string;
  UserId: string;
  DeviceId: string;
}
export interface DeleteMobileDeviceAccessOverrideResponse {}
export interface DeleteMobileDeviceAccessRuleRequest {
  OrganizationId: string;
  MobileDeviceAccessRuleId: string;
}
export interface DeleteMobileDeviceAccessRuleResponse {}
export interface DeleteOrganizationRequest {
  ClientToken?: string;
  OrganizationId: string;
  DeleteDirectory: boolean;
  ForceDelete?: boolean;
  DeleteIdentityCenterApplication?: boolean;
}
export interface DeleteOrganizationResponse {
  OrganizationId?: string;
  State?: string;
}
export type PersonalAccessTokenId = string;
export interface DeletePersonalAccessTokenRequest {
  OrganizationId: string;
  PersonalAccessTokenId: string;
}
export interface DeletePersonalAccessTokenResponse {}
export interface DeleteResourceRequest {
  OrganizationId: string;
  ResourceId: string;
}
export interface DeleteResourceResponse {}
export type ShortString = string;
export interface DeleteRetentionPolicyRequest {
  OrganizationId: string;
  Id: string;
}
export interface DeleteRetentionPolicyResponse {}
export interface DeleteUserRequest {
  OrganizationId: string;
  UserId: string;
}
export interface DeleteUserResponse {}
export interface DeregisterFromWorkMailRequest {
  OrganizationId: string;
  EntityId: string;
}
export interface DeregisterFromWorkMailResponse {}
export type WorkMailDomainName = string;
export interface DeregisterMailDomainRequest {
  OrganizationId: string;
  DomainName: string;
}
export interface DeregisterMailDomainResponse {}
export interface DescribeEmailMonitoringConfigurationRequest {
  OrganizationId: string;
}
export type RoleArn = string;
export type LogGroupArn = string;
export interface DescribeEmailMonitoringConfigurationResponse {
  RoleArn?: string;
  LogGroupArn?: string;
}
export interface DescribeEntityRequest {
  OrganizationId: string;
  Email: string;
}
export type EntityType = "GROUP" | "USER" | "RESOURCE" | (string & {});
export interface DescribeEntityResponse {
  EntityId?: string;
  Name?: string;
  Type?: EntityType;
}
export interface DescribeGroupRequest {
  OrganizationId: string;
  GroupId: string;
}
export type EntityState = "ENABLED" | "DISABLED" | "DELETED" | (string & {});
export interface DescribeGroupResponse {
  GroupId?: string;
  Name?: string;
  Email?: string;
  State?: EntityState;
  EnabledDate?: Date;
  DisabledDate?: Date;
  HiddenFromGlobalAddressList?: boolean;
}
export interface DescribeIdentityProviderConfigurationRequest {
  OrganizationId: string;
}
export type IdentityProviderAuthenticationMode =
  | "IDENTITY_PROVIDER_ONLY"
  | "IDENTITY_PROVIDER_AND_DIRECTORY"
  | (string & {});
export interface IdentityCenterConfiguration {
  InstanceArn: string;
  ApplicationArn: string;
}
export type PersonalAccessTokenConfigurationStatus =
  | "ACTIVE"
  | "INACTIVE"
  | (string & {});
export type PersonalAccessTokenLifetimeInDays = number;
export interface PersonalAccessTokenConfiguration {
  Status: PersonalAccessTokenConfigurationStatus;
  LifetimeInDays?: number;
}
export interface DescribeIdentityProviderConfigurationResponse {
  AuthenticationMode?: IdentityProviderAuthenticationMode;
  IdentityCenterConfiguration?: IdentityCenterConfiguration;
  PersonalAccessTokenConfiguration?: PersonalAccessTokenConfiguration;
}
export interface DescribeInboundDmarcSettingsRequest {
  OrganizationId: string;
}
export interface DescribeInboundDmarcSettingsResponse {
  Enforced?: boolean;
}
export interface DescribeMailboxExportJobRequest {
  JobId: string;
  OrganizationId: string;
}
export type Description = string;
export type S3BucketName = string;
export type S3ObjectKey = string;
export type Percentage = number;
export type MailboxExportJobState =
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED"
  | (string & {});
export type MailboxExportErrorInfo = string;
export interface DescribeMailboxExportJobResponse {
  EntityId?: string;
  Description?: string;
  RoleArn?: string;
  KmsKeyArn?: string;
  S3BucketName?: string;
  S3Prefix?: string;
  S3Path?: string;
  EstimatedProgress?: number;
  State?: MailboxExportJobState;
  ErrorInfo?: string;
  StartTime?: Date;
  EndTime?: Date;
}
export interface DescribeOrganizationRequest {
  OrganizationId: string;
}
export type AmazonResourceName = string;
export interface DescribeOrganizationResponse {
  OrganizationId?: string;
  Alias?: string;
  State?: string;
  DirectoryId?: string;
  DirectoryType?: string;
  DefaultMailDomain?: string;
  CompletedDate?: Date;
  ErrorMessage?: string;
  ARN?: string;
  MigrationAdmin?: string;
  InteroperabilityEnabled?: boolean;
}
export interface DescribeResourceRequest {
  OrganizationId: string;
  ResourceId: string;
}
export interface BookingOptions {
  AutoAcceptRequests?: boolean;
  AutoDeclineRecurringRequests?: boolean;
  AutoDeclineConflictingRequests?: boolean;
}
export interface DescribeResourceResponse {
  ResourceId?: string;
  Email?: string;
  Name?: string;
  Type?: ResourceType;
  BookingOptions?: BookingOptions;
  State?: EntityState;
  EnabledDate?: Date;
  DisabledDate?: Date;
  Description?: string | redacted.Redacted<string>;
  HiddenFromGlobalAddressList?: boolean;
}
export interface DescribeUserRequest {
  OrganizationId: string;
  UserId: string;
}
export type IdentityProviderIdentityStoreId = string;
export interface DescribeUserResponse {
  UserId?: string;
  Name?: string;
  Email?: string;
  DisplayName?: string | redacted.Redacted<string>;
  State?: EntityState;
  UserRole?: UserRole;
  EnabledDate?: Date;
  DisabledDate?: Date;
  MailboxProvisionedDate?: Date;
  MailboxDeprovisionedDate?: Date;
  FirstName?: string | redacted.Redacted<string>;
  LastName?: string | redacted.Redacted<string>;
  HiddenFromGlobalAddressList?: boolean;
  Initials?: string | redacted.Redacted<string>;
  Telephone?: string | redacted.Redacted<string>;
  Street?: string | redacted.Redacted<string>;
  JobTitle?: string | redacted.Redacted<string>;
  City?: string | redacted.Redacted<string>;
  Company?: string | redacted.Redacted<string>;
  ZipCode?: string | redacted.Redacted<string>;
  Department?: string | redacted.Redacted<string>;
  Country?: string | redacted.Redacted<string>;
  Office?: string | redacted.Redacted<string>;
  IdentityProviderUserId?: string;
  IdentityProviderIdentityStoreId?: string;
}
export interface DisassociateDelegateFromResourceRequest {
  OrganizationId: string;
  ResourceId: string;
  EntityId: string;
}
export interface DisassociateDelegateFromResourceResponse {}
export interface DisassociateMemberFromGroupRequest {
  OrganizationId: string;
  GroupId: string;
  MemberId: string;
}
export interface DisassociateMemberFromGroupResponse {}
export type IpAddress = string;
export type AccessControlRuleAction = string;
export interface GetAccessControlEffectRequest {
  OrganizationId: string;
  IpAddress: string;
  Action: string;
  UserId?: string;
  ImpersonationRoleId?: string;
}
export type AccessControlRuleEffect = "ALLOW" | "DENY" | (string & {});
export type AccessControlRuleNameList = string[];
export interface GetAccessControlEffectResponse {
  Effect?: AccessControlRuleEffect;
  MatchedRules?: string[];
}
export interface GetDefaultRetentionPolicyRequest {
  OrganizationId: string;
}
export type FolderName =
  | "INBOX"
  | "DELETED_ITEMS"
  | "SENT_ITEMS"
  | "DRAFTS"
  | "JUNK_EMAIL"
  | (string & {});
export type RetentionAction =
  | "NONE"
  | "DELETE"
  | "PERMANENTLY_DELETE"
  | (string & {});
export type RetentionPeriod = number;
export interface FolderConfiguration {
  Name: FolderName;
  Action: RetentionAction;
  Period?: number;
}
export type FolderConfigurations = FolderConfiguration[];
export interface GetDefaultRetentionPolicyResponse {
  Id?: string;
  Name?: string;
  Description?: string;
  FolderConfigurations?: FolderConfiguration[];
}
export interface GetImpersonationRoleRequest {
  OrganizationId: string;
  ImpersonationRoleId: string;
}
export interface GetImpersonationRoleResponse {
  ImpersonationRoleId?: string;
  Name?: string;
  Type?: ImpersonationRoleType;
  Description?: string;
  Rules?: ImpersonationRule[];
  DateCreated?: Date;
  DateModified?: Date;
}
export interface GetImpersonationRoleEffectRequest {
  OrganizationId: string;
  ImpersonationRoleId: string;
  TargetUser: string;
}
export interface ImpersonationMatchedRule {
  ImpersonationRuleId?: string;
  Name?: string;
}
export type ImpersonationMatchedRuleList = ImpersonationMatchedRule[];
export interface GetImpersonationRoleEffectResponse {
  Type?: ImpersonationRoleType;
  Effect?: AccessEffect;
  MatchedRules?: ImpersonationMatchedRule[];
}
export interface GetMailboxDetailsRequest {
  OrganizationId: string;
  UserId: string;
}
export type MailboxQuota = number;
export type MailboxSize = number;
export interface GetMailboxDetailsResponse {
  MailboxQuota?: number;
  MailboxSize?: number;
}
export interface GetMailDomainRequest {
  OrganizationId: string;
  DomainName: string;
}
export interface DnsRecord {
  Type?: string;
  Hostname?: string;
  Value?: string;
}
export type DnsRecords = DnsRecord[];
export type DnsRecordVerificationStatus =
  | "PENDING"
  | "VERIFIED"
  | "FAILED"
  | (string & {});
export interface GetMailDomainResponse {
  Records?: DnsRecord[];
  IsTestDomain?: boolean;
  IsDefault?: boolean;
  OwnershipVerificationStatus?: DnsRecordVerificationStatus;
  DkimVerificationStatus?: DnsRecordVerificationStatus;
}
export interface GetMobileDeviceAccessEffectRequest {
  OrganizationId: string;
  DeviceType?: string;
  DeviceModel?: string;
  DeviceOperatingSystem?: string;
  DeviceUserAgent?: string;
}
export interface MobileDeviceAccessMatchedRule {
  MobileDeviceAccessRuleId?: string;
  Name?: string;
}
export type MobileDeviceAccessMatchedRuleList = MobileDeviceAccessMatchedRule[];
export interface GetMobileDeviceAccessEffectResponse {
  Effect?: MobileDeviceAccessRuleEffect;
  MatchedRules?: MobileDeviceAccessMatchedRule[];
}
export interface GetMobileDeviceAccessOverrideRequest {
  OrganizationId: string;
  UserId: string;
  DeviceId: string;
}
export interface GetMobileDeviceAccessOverrideResponse {
  UserId?: string;
  DeviceId?: string;
  Effect?: MobileDeviceAccessRuleEffect;
  Description?: string;
  DateCreated?: Date;
  DateModified?: Date;
}
export interface GetPersonalAccessTokenMetadataRequest {
  OrganizationId: string;
  PersonalAccessTokenId: string;
}
export type PersonalAccessTokenName = string;
export type PersonalAccessTokenScope = string;
export type PersonalAccessTokenScopeList = string[];
export interface GetPersonalAccessTokenMetadataResponse {
  PersonalAccessTokenId?: string;
  UserId?: string;
  Name?: string;
  DateCreated?: Date;
  DateLastUsed?: Date;
  ExpiresTime?: Date;
  Scopes?: string[];
}
export interface ListAccessControlRulesRequest {
  OrganizationId: string;
}
export type AccessControlRuleDescription = string;
export type IpRange = string;
export type IpRangeList = string[];
export type ActionsList = string[];
export type UserIdList = string[];
export type ImpersonationRoleIdList = string[];
export interface AccessControlRule {
  Name?: string;
  Effect?: AccessControlRuleEffect;
  Description?: string;
  IpRanges?: string[];
  NotIpRanges?: string[];
  Actions?: string[];
  NotActions?: string[];
  UserIds?: string[];
  NotUserIds?: string[];
  DateCreated?: Date;
  DateModified?: Date;
  ImpersonationRoleIds?: string[];
  NotImpersonationRoleIds?: string[];
}
export type AccessControlRulesList = AccessControlRule[];
export interface ListAccessControlRulesResponse {
  Rules?: AccessControlRule[];
}
export type NextToken = string;
export type MaxResults = number;
export interface ListAliasesRequest {
  OrganizationId: string;
  EntityId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type Aliases = string[];
export interface ListAliasesResponse {
  Aliases?: string[];
  NextToken?: string;
}
export interface ListAvailabilityConfigurationsRequest {
  OrganizationId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type AvailabilityProviderType = "EWS" | "LAMBDA" | (string & {});
export interface RedactedEwsAvailabilityProvider {
  EwsEndpoint?: string;
  EwsUsername?: string;
}
export interface AvailabilityConfiguration {
  DomainName?: string;
  ProviderType?: AvailabilityProviderType;
  EwsProvider?: RedactedEwsAvailabilityProvider;
  LambdaProvider?: LambdaAvailabilityProvider;
  DateCreated?: Date;
  DateModified?: Date;
}
export type AvailabilityConfigurationList = AvailabilityConfiguration[];
export interface ListAvailabilityConfigurationsResponse {
  AvailabilityConfigurations?: AvailabilityConfiguration[];
  NextToken?: string;
}
export interface ListGroupMembersRequest {
  OrganizationId: string;
  GroupId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type MemberType = "GROUP" | "USER" | (string & {});
export interface Member {
  Id?: string;
  Name?: string;
  Type?: MemberType;
  State?: EntityState;
  EnabledDate?: Date;
  DisabledDate?: Date;
}
export type Members = Member[];
export interface ListGroupMembersResponse {
  Members?: Member[];
  NextToken?: string;
}
export interface ListGroupsFilters {
  NamePrefix?: string;
  PrimaryEmailPrefix?: string;
  State?: EntityState;
}
export interface ListGroupsRequest {
  OrganizationId: string;
  NextToken?: string;
  MaxResults?: number;
  Filters?: ListGroupsFilters;
}
export interface Group {
  Id?: string;
  Email?: string;
  Name?: string;
  State?: EntityState;
  EnabledDate?: Date;
  DisabledDate?: Date;
}
export type Groups = Group[];
export interface ListGroupsResponse {
  Groups?: Group[];
  NextToken?: string;
}
export interface ListGroupsForEntityFilters {
  GroupNamePrefix?: string;
}
export interface ListGroupsForEntityRequest {
  OrganizationId: string;
  EntityId: string;
  Filters?: ListGroupsForEntityFilters;
  NextToken?: string;
  MaxResults?: number;
}
export interface GroupIdentifier {
  GroupId?: string;
  GroupName?: string;
}
export type GroupIdentifiers = GroupIdentifier[];
export interface ListGroupsForEntityResponse {
  Groups?: GroupIdentifier[];
  NextToken?: string;
}
export interface ListImpersonationRolesRequest {
  OrganizationId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ImpersonationRole {
  ImpersonationRoleId?: string;
  Name?: string;
  Type?: ImpersonationRoleType;
  DateCreated?: Date;
  DateModified?: Date;
}
export type ImpersonationRoleList = ImpersonationRole[];
export interface ListImpersonationRolesResponse {
  Roles?: ImpersonationRole[];
  NextToken?: string;
}
export interface ListMailboxExportJobsRequest {
  OrganizationId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface MailboxExportJob {
  JobId?: string;
  EntityId?: string;
  Description?: string;
  S3BucketName?: string;
  S3Path?: string;
  EstimatedProgress?: number;
  State?: MailboxExportJobState;
  StartTime?: Date;
  EndTime?: Date;
}
export type Jobs = MailboxExportJob[];
export interface ListMailboxExportJobsResponse {
  Jobs?: MailboxExportJob[];
  NextToken?: string;
}
export interface ListMailboxPermissionsRequest {
  OrganizationId: string;
  EntityId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type PermissionType =
  | "FULL_ACCESS"
  | "SEND_AS"
  | "SEND_ON_BEHALF"
  | (string & {});
export type PermissionValues = PermissionType[];
export interface Permission {
  GranteeId: string;
  GranteeType: MemberType;
  PermissionValues: PermissionType[];
}
export type Permissions = Permission[];
export interface ListMailboxPermissionsResponse {
  Permissions?: Permission[];
  NextToken?: string;
}
export interface ListMailDomainsRequest {
  OrganizationId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface MailDomainSummary {
  DomainName?: string;
  DefaultDomain?: boolean;
}
export type MailDomains = MailDomainSummary[];
export interface ListMailDomainsResponse {
  MailDomains?: MailDomainSummary[];
  NextToken?: string;
}
export interface ListMobileDeviceAccessOverridesRequest {
  OrganizationId: string;
  UserId?: string;
  DeviceId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface MobileDeviceAccessOverride {
  UserId?: string;
  DeviceId?: string;
  Effect?: MobileDeviceAccessRuleEffect;
  Description?: string;
  DateCreated?: Date;
  DateModified?: Date;
}
export type MobileDeviceAccessOverridesList = MobileDeviceAccessOverride[];
export interface ListMobileDeviceAccessOverridesResponse {
  Overrides?: MobileDeviceAccessOverride[];
  NextToken?: string;
}
export interface ListMobileDeviceAccessRulesRequest {
  OrganizationId: string;
}
export interface MobileDeviceAccessRule {
  MobileDeviceAccessRuleId?: string;
  Name?: string;
  Description?: string;
  Effect?: MobileDeviceAccessRuleEffect;
  DeviceTypes?: string[];
  NotDeviceTypes?: string[];
  DeviceModels?: string[];
  NotDeviceModels?: string[];
  DeviceOperatingSystems?: string[];
  NotDeviceOperatingSystems?: string[];
  DeviceUserAgents?: string[];
  NotDeviceUserAgents?: string[];
  DateCreated?: Date;
  DateModified?: Date;
}
export type MobileDeviceAccessRulesList = MobileDeviceAccessRule[];
export interface ListMobileDeviceAccessRulesResponse {
  Rules?: MobileDeviceAccessRule[];
}
export interface ListOrganizationsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface OrganizationSummary {
  OrganizationId?: string;
  Alias?: string;
  DefaultMailDomain?: string;
  ErrorMessage?: string;
  State?: string;
}
export type OrganizationSummaries = OrganizationSummary[];
export interface ListOrganizationsResponse {
  OrganizationSummaries?: OrganizationSummary[];
  NextToken?: string;
}
export interface ListPersonalAccessTokensRequest {
  OrganizationId: string;
  UserId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface PersonalAccessTokenSummary {
  PersonalAccessTokenId?: string;
  UserId?: string;
  Name?: string;
  DateCreated?: Date;
  DateLastUsed?: Date;
  ExpiresTime?: Date;
  Scopes?: string[];
}
export type PersonalAccessTokenSummaryList = PersonalAccessTokenSummary[];
export interface ListPersonalAccessTokensResponse {
  NextToken?: string;
  PersonalAccessTokenSummaries?: PersonalAccessTokenSummary[];
}
export interface ListResourceDelegatesRequest {
  OrganizationId: string;
  ResourceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface Delegate {
  Id: string;
  Type: MemberType;
}
export type ResourceDelegates = Delegate[];
export interface ListResourceDelegatesResponse {
  Delegates?: Delegate[];
  NextToken?: string;
}
export interface ListResourcesFilters {
  NamePrefix?: string;
  PrimaryEmailPrefix?: string;
  State?: EntityState;
}
export interface ListResourcesRequest {
  OrganizationId: string;
  NextToken?: string;
  MaxResults?: number;
  Filters?: ListResourcesFilters;
}
export interface Resource {
  Id?: string;
  Email?: string;
  Name?: string;
  Type?: ResourceType;
  State?: EntityState;
  EnabledDate?: Date;
  DisabledDate?: Date;
  Description?: string | redacted.Redacted<string>;
}
export type Resources = Resource[];
export interface ListResourcesResponse {
  Resources?: Resource[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export type IdentityProviderUserIdPrefix = string;
export interface ListUsersFilters {
  UsernamePrefix?: string;
  DisplayNamePrefix?: string | redacted.Redacted<string>;
  PrimaryEmailPrefix?: string;
  State?: EntityState;
  IdentityProviderUserIdPrefix?: string;
}
export interface ListUsersRequest {
  OrganizationId: string;
  NextToken?: string;
  MaxResults?: number;
  Filters?: ListUsersFilters;
}
export interface User {
  Id?: string;
  Email?: string;
  Name?: string;
  DisplayName?: string;
  State?: EntityState;
  UserRole?: UserRole;
  EnabledDate?: Date;
  DisabledDate?: Date;
  IdentityProviderUserId?: string;
  IdentityProviderIdentityStoreId?: string;
}
export type Users = User[];
export interface ListUsersResponse {
  Users?: User[];
  NextToken?: string;
}
export interface PutAccessControlRuleRequest {
  Name: string;
  Effect: AccessControlRuleEffect;
  Description: string;
  IpRanges?: string[];
  NotIpRanges?: string[];
  Actions?: string[];
  NotActions?: string[];
  UserIds?: string[];
  NotUserIds?: string[];
  OrganizationId: string;
  ImpersonationRoleIds?: string[];
  NotImpersonationRoleIds?: string[];
}
export interface PutAccessControlRuleResponse {}
export interface PutEmailMonitoringConfigurationRequest {
  OrganizationId: string;
  RoleArn?: string;
  LogGroupArn: string;
}
export interface PutEmailMonitoringConfigurationResponse {}
export interface PutIdentityProviderConfigurationRequest {
  OrganizationId: string;
  AuthenticationMode: IdentityProviderAuthenticationMode;
  IdentityCenterConfiguration: IdentityCenterConfiguration;
  PersonalAccessTokenConfiguration: PersonalAccessTokenConfiguration;
}
export interface PutIdentityProviderConfigurationResponse {}
export interface PutInboundDmarcSettingsRequest {
  OrganizationId: string;
  Enforced: boolean;
}
export interface PutInboundDmarcSettingsResponse {}
export interface PutMailboxPermissionsRequest {
  OrganizationId: string;
  EntityId: string;
  GranteeId: string;
  PermissionValues: PermissionType[];
}
export interface PutMailboxPermissionsResponse {}
export interface PutMobileDeviceAccessOverrideRequest {
  OrganizationId: string;
  UserId: string;
  DeviceId: string;
  Effect: MobileDeviceAccessRuleEffect;
  Description?: string;
}
export interface PutMobileDeviceAccessOverrideResponse {}
export type PolicyDescription = string | redacted.Redacted<string>;
export interface PutRetentionPolicyRequest {
  OrganizationId: string;
  Id?: string;
  Name: string;
  Description?: string | redacted.Redacted<string>;
  FolderConfigurations: FolderConfiguration[];
}
export interface PutRetentionPolicyResponse {}
export interface RegisterMailDomainRequest {
  ClientToken?: string;
  OrganizationId: string;
  DomainName: string;
}
export interface RegisterMailDomainResponse {}
export interface RegisterToWorkMailRequest {
  OrganizationId: string;
  EntityId: string;
  Email: string;
}
export interface RegisterToWorkMailResponse {}
export interface ResetPasswordRequest {
  OrganizationId: string;
  UserId: string;
  Password: string | redacted.Redacted<string>;
}
export interface ResetPasswordResponse {}
export interface StartMailboxExportJobRequest {
  ClientToken: string;
  OrganizationId: string;
  EntityId: string;
  Description?: string;
  RoleArn: string;
  KmsKeyArn: string;
  S3BucketName: string;
  S3Prefix: string;
}
export interface StartMailboxExportJobResponse {
  JobId?: string;
}
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export interface TestAvailabilityConfigurationRequest {
  OrganizationId: string;
  DomainName?: string;
  EwsProvider?: EwsAvailabilityProvider;
  LambdaProvider?: LambdaAvailabilityProvider;
}
export interface TestAvailabilityConfigurationResponse {
  TestPassed?: boolean;
  FailureReason?: string;
}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAvailabilityConfigurationRequest {
  OrganizationId: string;
  DomainName: string;
  EwsProvider?: EwsAvailabilityProvider;
  LambdaProvider?: LambdaAvailabilityProvider;
}
export interface UpdateAvailabilityConfigurationResponse {}
export interface UpdateDefaultMailDomainRequest {
  OrganizationId: string;
  DomainName: string;
}
export interface UpdateDefaultMailDomainResponse {}
export interface UpdateGroupRequest {
  OrganizationId: string;
  GroupId: string;
  HiddenFromGlobalAddressList?: boolean;
}
export interface UpdateGroupResponse {}
export interface UpdateImpersonationRoleRequest {
  OrganizationId: string;
  ImpersonationRoleId: string;
  Name: string;
  Type: ImpersonationRoleType;
  Description?: string;
  Rules: ImpersonationRule[];
}
export interface UpdateImpersonationRoleResponse {}
export interface UpdateMailboxQuotaRequest {
  OrganizationId: string;
  UserId: string;
  MailboxQuota: number;
}
export interface UpdateMailboxQuotaResponse {}
export interface UpdateMobileDeviceAccessRuleRequest {
  OrganizationId: string;
  MobileDeviceAccessRuleId: string;
  Name: string;
  Description?: string;
  Effect: MobileDeviceAccessRuleEffect;
  DeviceTypes?: string[];
  NotDeviceTypes?: string[];
  DeviceModels?: string[];
  NotDeviceModels?: string[];
  DeviceOperatingSystems?: string[];
  NotDeviceOperatingSystems?: string[];
  DeviceUserAgents?: string[];
  NotDeviceUserAgents?: string[];
}
export interface UpdateMobileDeviceAccessRuleResponse {}
export interface UpdatePrimaryEmailAddressRequest {
  OrganizationId: string;
  EntityId: string;
  Email: string;
}
export interface UpdatePrimaryEmailAddressResponse {}
export type NewResourceDescription = string | redacted.Redacted<string>;
export interface UpdateResourceRequest {
  OrganizationId: string;
  ResourceId: string;
  Name?: string;
  BookingOptions?: BookingOptions;
  Description?: string | redacted.Redacted<string>;
  Type?: ResourceType;
  HiddenFromGlobalAddressList?: boolean;
}
export interface UpdateResourceResponse {}
export type IdentityProviderUserIdForUpdate = string;
export interface UpdateUserRequest {
  OrganizationId: string;
  UserId: string;
  Role?: UserRole;
  DisplayName?: string | redacted.Redacted<string>;
  FirstName?: string | redacted.Redacted<string>;
  LastName?: string | redacted.Redacted<string>;
  HiddenFromGlobalAddressList?: boolean;
  Initials?: string | redacted.Redacted<string>;
  Telephone?: string | redacted.Redacted<string>;
  Street?: string | redacted.Redacted<string>;
  JobTitle?: string | redacted.Redacted<string>;
  City?: string | redacted.Redacted<string>;
  Company?: string | redacted.Redacted<string>;
  ZipCode?: string | redacted.Redacted<string>;
  Department?: string | redacted.Redacted<string>;
  Country?: string | redacted.Redacted<string>;
  Office?: string | redacted.Redacted<string>;
  IdentityProviderUserId?: string;
}
export interface UpdateUserResponse {}
export type AssociateDelegateToResourceError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Adds a member (user or group) to the resource's set of delegates.
 */
export const associateDelegateToResource: API.OperationMethod<
  AssociateDelegateToResourceRequest,
  AssociateDelegateToResourceResponse,
  AssociateDelegateToResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, ResourceId: 0, EntityId: 0 },
  },
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateDelegateToResource",
})) as any;

export type AssociateMemberToGroupError =
  | DirectoryServiceAuthenticationFailedException
  | DirectoryUnavailableException
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Adds a member (user or group) to the group's set.
 */
export const associateMemberToGroup: API.OperationMethod<
  AssociateMemberToGroupRequest,
  AssociateMemberToGroupResponse,
  AssociateMemberToGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, GroupId: 0, MemberId: 0 },
  },
  errors: [
    DirectoryServiceAuthenticationFailedException,
    DirectoryUnavailableException,
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateMemberToGroup",
})) as any;

export type AssumeImpersonationRoleError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Assumes an impersonation role for the given WorkMail organization. This method returns an
 * authentication token you can use to make impersonated calls.
 */
export const assumeImpersonationRole: API.OperationMethod<
  AssumeImpersonationRoleRequest,
  AssumeImpersonationRoleResponse,
  AssumeImpersonationRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, ImpersonationRoleId: 0 },
  },
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssumeImpersonationRole",
})) as any;

export type CancelMailboxExportJobError =
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Cancels a mailbox export job.
 *
 * If the mailbox export job is near completion, it might not be possible to cancel
 * it.
 */
export const cancelMailboxExportJob: API.OperationMethod<
  CancelMailboxExportJobRequest,
  CancelMailboxExportJobResponse,
  CancelMailboxExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientToken: D.m({ idempotency: true }),
      JobId: 0,
      OrganizationId: 0,
    },
  },
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelMailboxExportJob",
})) as any;

export type CreateAliasError =
  | EmailAddressInUseException
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | LimitExceededException
  | MailDomainNotFoundException
  | MailDomainStateException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Adds an alias to the set of a given member (user or group) of WorkMail.
 */
export const createAlias: API.OperationMethod<
  CreateAliasRequest,
  CreateAliasResponse,
  CreateAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, EntityId: 0, Alias: 0 },
  },
  errors: [
    EmailAddressInUseException,
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    LimitExceededException,
    MailDomainNotFoundException,
    MailDomainStateException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAlias",
})) as any;

export type CreateAvailabilityConfigurationError =
  | InvalidParameterException
  | LimitExceededException
  | NameAvailabilityException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Creates an `AvailabilityConfiguration` for the given WorkMail organization and domain.
 */
export const createAvailabilityConfiguration: API.OperationMethod<
  CreateAvailabilityConfigurationRequest,
  CreateAvailabilityConfigurationResponse,
  CreateAvailabilityConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientToken: D.m({ idempotency: true }),
      OrganizationId: 0,
      DomainName: 0,
      EwsProvider: i_EwsAvailabilityProvider,
      LambdaProvider: i_LambdaAvailabilityProvider,
    },
  },
  errors: [
    InvalidParameterException,
    LimitExceededException,
    NameAvailabilityException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAvailabilityConfiguration",
})) as any;

export type CreateGroupError =
  | DirectoryServiceAuthenticationFailedException
  | DirectoryUnavailableException
  | InvalidParameterException
  | NameAvailabilityException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ReservedNameException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates a group that can be used in WorkMail by calling the RegisterToWorkMail operation.
 */
export const createGroup: API.OperationMethod<
  CreateGroupRequest,
  CreateGroupResponse,
  CreateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, Name: 0, HiddenFromGlobalAddressList: 0 },
  },
  errors: [
    DirectoryServiceAuthenticationFailedException,
    DirectoryUnavailableException,
    InvalidParameterException,
    NameAvailabilityException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ReservedNameException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroup",
})) as any;

export type CreateIdentityCenterApplicationError =
  | InvalidParameterException
  | CommonErrors;
/**
 * Creates the WorkMail application in IAM Identity Center that can be used later in the WorkMail - IdC integration. For more information, see PutIdentityProviderConfiguration. This action does not affect the authentication settings for any WorkMail organizations.
 */
export const createIdentityCenterApplication: API.OperationMethod<
  CreateIdentityCenterApplicationRequest,
  CreateIdentityCenterApplicationResponse,
  CreateIdentityCenterApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, InstanceArn: 0, ClientToken: D.m({ idempotency: true }) },
  },
  errors: [InvalidParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIdentityCenterApplication",
})) as any;

export type CreateImpersonationRoleError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | LimitExceededException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Creates an impersonation role for the given WorkMail organization.
 *
 * *Idempotency* ensures that an API request completes no more than one
 * time. With an idempotent request, if the original request completes successfully, any
 * subsequent retries also complete successfully without performing any further
 * actions.
 */
export const createImpersonationRole: API.OperationMethod<
  CreateImpersonationRoleRequest,
  CreateImpersonationRoleResponse,
  CreateImpersonationRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientToken: D.m({ idempotency: true }),
      OrganizationId: 0,
      Name: 0,
      Type: 0,
      Description: 0,
      Rules: D.list(i_ImpersonationRule),
    },
  },
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    LimitExceededException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateImpersonationRole",
})) as any;

export type CreateMobileDeviceAccessRuleError =
  | InvalidParameterException
  | LimitExceededException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Creates a new mobile device access rule for the specified WorkMail organization.
 */
export const createMobileDeviceAccessRule: API.OperationMethod<
  CreateMobileDeviceAccessRuleRequest,
  CreateMobileDeviceAccessRuleResponse,
  CreateMobileDeviceAccessRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      OrganizationId: 0,
      ClientToken: D.m({ idempotency: true }),
      Name: 0,
      Description: 0,
      Effect: 0,
      DeviceTypes: 0,
      NotDeviceTypes: 0,
      DeviceModels: 0,
      NotDeviceModels: 0,
      DeviceOperatingSystems: 0,
      NotDeviceOperatingSystems: 0,
      DeviceUserAgents: 0,
      NotDeviceUserAgents: 0,
    },
  },
  errors: [
    InvalidParameterException,
    LimitExceededException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMobileDeviceAccessRule",
})) as any;

export type CreateOrganizationError =
  | DirectoryInUseException
  | DirectoryUnavailableException
  | InvalidParameterException
  | LimitExceededException
  | NameAvailabilityException
  | CommonErrors;
/**
 * Creates a new WorkMail organization. Optionally, you can choose to associate an existing AWS Directory Service directory with your organization. If an AWS Directory Service directory ID is specified, the organization alias must match the directory alias. If you choose not to associate an existing directory with your organization, then we create a new WorkMail directory for you. For more information, see Adding an organization in the *WorkMail Administrator Guide*.
 *
 * You can associate multiple email domains with an organization, then choose your
 * default email domain from the WorkMail console. You can also associate a domain that is managed
 * in an Amazon Route 53 public hosted zone. For more information, see Adding a
 * domain and Choosing the default domain
 * in the *WorkMail Administrator Guide*.
 *
 * Optionally, you can use a customer managed key from AWS Key Management Service (AWS
 * KMS) to encrypt email for your organization. If you don't associate an AWS KMS key, WorkMail
 * creates a default, AWS managed key for you.
 */
export const createOrganization: API.OperationMethod<
  CreateOrganizationRequest,
  CreateOrganizationResponse,
  CreateOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DirectoryId: 0,
      Alias: 0,
      ClientToken: D.m({ idempotency: true }),
      Domains: D.list({ DomainName: 0, HostedZoneId: 0 }),
      KmsKeyArn: 0,
      EnableInteroperability: 0,
    },
  },
  errors: [
    DirectoryInUseException,
    DirectoryUnavailableException,
    InvalidParameterException,
    LimitExceededException,
    NameAvailabilityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOrganization",
})) as any;

export type CreateResourceError =
  | DirectoryServiceAuthenticationFailedException
  | DirectoryUnavailableException
  | InvalidParameterException
  | NameAvailabilityException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ReservedNameException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates a new WorkMail resource.
 */
export const createResource: API.OperationMethod<
  CreateResourceRequest,
  CreateResourceResponse,
  CreateResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      OrganizationId: 0,
      Name: 0,
      Type: 0,
      Description: 0,
      HiddenFromGlobalAddressList: 0,
    },
  },
  errors: [
    DirectoryServiceAuthenticationFailedException,
    DirectoryUnavailableException,
    InvalidParameterException,
    NameAvailabilityException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ReservedNameException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResource",
})) as any;

export type CreateUserError =
  | DirectoryServiceAuthenticationFailedException
  | DirectoryUnavailableException
  | InvalidParameterException
  | InvalidPasswordException
  | NameAvailabilityException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ReservedNameException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates a user who can be used in WorkMail by calling the RegisterToWorkMail operation.
 */
export const createUser: API.OperationMethod<
  CreateUserRequest,
  CreateUserResponse,
  CreateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      OrganizationId: 0,
      Name: 0,
      DisplayName: 0,
      Password: 0,
      Role: 0,
      FirstName: 0,
      LastName: 0,
      HiddenFromGlobalAddressList: 0,
      IdentityProviderUserId: 0,
    },
  },
  errors: [
    DirectoryServiceAuthenticationFailedException,
    DirectoryUnavailableException,
    InvalidParameterException,
    InvalidPasswordException,
    NameAvailabilityException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ReservedNameException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUser",
})) as any;

export type DeleteAccessControlRuleError =
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Deletes an access control rule for the specified WorkMail organization.
 *
 * Deleting already deleted and non-existing rules does not produce an error. In those cases, the service sends back an HTTP 200 response with an empty HTTP body.
 */
export const deleteAccessControlRule: API.OperationMethod<
  DeleteAccessControlRuleRequest,
  DeleteAccessControlRuleResponse,
  DeleteAccessControlRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { OrganizationId: 0, Name: 0 } },
  errors: [OrganizationNotFoundException, OrganizationStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessControlRule",
})) as any;

export type DeleteAliasError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Remove one or more specified aliases from a set of aliases for a given
 * user.
 */
export const deleteAlias: API.OperationMethod<
  DeleteAliasRequest,
  DeleteAliasResponse,
  DeleteAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, EntityId: 0, Alias: 0 },
  },
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAlias",
})) as any;

export type DeleteAvailabilityConfigurationError =
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Deletes the `AvailabilityConfiguration` for the given WorkMail organization and domain.
 */
export const deleteAvailabilityConfiguration: API.OperationMethod<
  DeleteAvailabilityConfigurationRequest,
  DeleteAvailabilityConfigurationResponse,
  DeleteAvailabilityConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { OrganizationId: 0, DomainName: 0 } },
  errors: [OrganizationNotFoundException, OrganizationStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAvailabilityConfiguration",
})) as any;

export type DeleteEmailMonitoringConfigurationError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Deletes the email monitoring configuration for a specified organization.
 */
export const deleteEmailMonitoringConfiguration: API.OperationMethod<
  DeleteEmailMonitoringConfigurationRequest,
  DeleteEmailMonitoringConfigurationResponse,
  DeleteEmailMonitoringConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { OrganizationId: 0 } },
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEmailMonitoringConfiguration",
})) as any;

export type DeleteGroupError =
  | DirectoryServiceAuthenticationFailedException
  | DirectoryUnavailableException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes a group from WorkMail.
 */
export const deleteGroup: API.OperationMethod<
  DeleteGroupRequest,
  DeleteGroupResponse,
  DeleteGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { OrganizationId: 0, GroupId: 0 } },
  errors: [
    DirectoryServiceAuthenticationFailedException,
    DirectoryUnavailableException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroup",
})) as any;

export type DeleteIdentityCenterApplicationError =
  | InvalidParameterException
  | OrganizationStateException
  | CommonErrors;
/**
 * Deletes the IAM Identity Center application from WorkMail. This action does not affect the authentication settings for any WorkMail organizations.
 */
export const deleteIdentityCenterApplication: API.OperationMethod<
  DeleteIdentityCenterApplicationRequest,
  DeleteIdentityCenterApplicationResponse,
  DeleteIdentityCenterApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ApplicationArn: 0 } },
  errors: [InvalidParameterException, OrganizationStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIdentityCenterApplication",
})) as any;

export type DeleteIdentityProviderConfigurationError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Disables the integration between IdC and WorkMail. Authentication will continue with the directory as it was before the IdC integration. You might have to reset your directory passwords and reconfigure your desktop and mobile email clients.
 */
export const deleteIdentityProviderConfiguration: API.OperationMethod<
  DeleteIdentityProviderConfigurationRequest,
  DeleteIdentityProviderConfigurationResponse,
  DeleteIdentityProviderConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { OrganizationId: 0 } },
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIdentityProviderConfiguration",
})) as any;

export type DeleteImpersonationRoleError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Deletes an impersonation role for the given WorkMail organization.
 */
export const deleteImpersonationRole: API.OperationMethod<
  DeleteImpersonationRoleRequest,
  DeleteImpersonationRoleResponse,
  DeleteImpersonationRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, ImpersonationRoleId: 0 },
  },
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteImpersonationRole",
})) as any;

export type DeleteMailboxPermissionsError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Deletes permissions granted to a member (user or group).
 */
export const deleteMailboxPermissions: API.OperationMethod<
  DeleteMailboxPermissionsRequest,
  DeleteMailboxPermissionsResponse,
  DeleteMailboxPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, EntityId: 0, GranteeId: 0 },
  },
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMailboxPermissions",
})) as any;

export type DeleteMobileDeviceAccessOverrideError =
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Deletes the mobile device access override for the given WorkMail organization, user, and device.
 *
 * Deleting already deleted and non-existing overrides does not produce an error. In those cases, the service sends back an HTTP 200 response with an empty HTTP body.
 */
export const deleteMobileDeviceAccessOverride: API.OperationMethod<
  DeleteMobileDeviceAccessOverrideRequest,
  DeleteMobileDeviceAccessOverrideResponse,
  DeleteMobileDeviceAccessOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, UserId: 0, DeviceId: 0 },
  },
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMobileDeviceAccessOverride",
})) as any;

export type DeleteMobileDeviceAccessRuleError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Deletes a mobile device access rule for the specified WorkMail organization.
 *
 * Deleting already deleted and non-existing rules does not produce an error. In those cases, the service sends back an HTTP 200 response with an empty HTTP body.
 */
export const deleteMobileDeviceAccessRule: API.OperationMethod<
  DeleteMobileDeviceAccessRuleRequest,
  DeleteMobileDeviceAccessRuleResponse,
  DeleteMobileDeviceAccessRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, MobileDeviceAccessRuleId: 0 },
  },
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMobileDeviceAccessRule",
})) as any;

export type DeleteOrganizationError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Deletes an WorkMail organization and all underlying AWS resources managed by WorkMail as part of the organization. You can choose whether to delete the associated directory. For more information, see Removing an organization in the *WorkMail Administrator Guide*.
 */
export const deleteOrganization: API.OperationMethod<
  DeleteOrganizationRequest,
  DeleteOrganizationResponse,
  DeleteOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientToken: D.m({ idempotency: true }),
      OrganizationId: 0,
      DeleteDirectory: 0,
      ForceDelete: 0,
      DeleteIdentityCenterApplication: 0,
    },
  },
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOrganization",
})) as any;

export type DeletePersonalAccessTokenError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Deletes the Personal Access Token from the provided WorkMail Organization.
 */
export const deletePersonalAccessToken: API.OperationMethod<
  DeletePersonalAccessTokenRequest,
  DeletePersonalAccessTokenResponse,
  DeletePersonalAccessTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, PersonalAccessTokenId: 0 },
  },
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePersonalAccessToken",
})) as any;

export type DeleteResourceError =
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes the specified resource.
 */
export const deleteResource: API.OperationMethod<
  DeleteResourceRequest,
  DeleteResourceResponse,
  DeleteResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { OrganizationId: 0, ResourceId: 0 } },
  errors: [
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResource",
})) as any;

export type DeleteRetentionPolicyError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Deletes the specified retention policy from the specified organization.
 */
export const deleteRetentionPolicy: API.OperationMethod<
  DeleteRetentionPolicyRequest,
  DeleteRetentionPolicyResponse,
  DeleteRetentionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { OrganizationId: 0, Id: 0 } },
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRetentionPolicy",
})) as any;

export type DeleteUserError =
  | DirectoryServiceAuthenticationFailedException
  | DirectoryUnavailableException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes a user from WorkMail and all subsequent systems. Before you can delete a
 * user, the user state must be `DISABLED`. Use the DescribeUser
 * action to confirm the user state.
 *
 * Deleting a user is permanent and cannot be undone. WorkMail archives user mailboxes for
 * 30 days before they are permanently removed.
 */
export const deleteUser: API.OperationMethod<
  DeleteUserRequest,
  DeleteUserResponse,
  DeleteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { OrganizationId: 0, UserId: 0 } },
  errors: [
    DirectoryServiceAuthenticationFailedException,
    DirectoryUnavailableException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUser",
})) as any;

export type DeregisterFromWorkMailError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Mark a user, group, or resource as no longer used in WorkMail. This action
 * disassociates the mailbox and schedules it for clean-up. WorkMail keeps mailboxes for 30 days
 * before they are permanently removed. The functionality in the console is
 * *Disable*.
 */
export const deregisterFromWorkMail: API.OperationMethod<
  DeregisterFromWorkMailRequest,
  DeregisterFromWorkMailResponse,
  DeregisterFromWorkMailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { OrganizationId: 0, EntityId: 0 } },
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterFromWorkMail",
})) as any;

export type DeregisterMailDomainError =
  | InvalidCustomSesConfigurationException
  | InvalidParameterException
  | MailDomainInUseException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Removes a domain from WorkMail, stops email routing to WorkMail, and removes the authorization allowing WorkMail use. SES keeps the domain because other applications may use it. You must first
 * remove any email address used by WorkMail entities before you remove the domain.
 */
export const deregisterMailDomain: API.OperationMethod<
  DeregisterMailDomainRequest,
  DeregisterMailDomainResponse,
  DeregisterMailDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { OrganizationId: 0, DomainName: 0 } },
  errors: [
    InvalidCustomSesConfigurationException,
    InvalidParameterException,
    MailDomainInUseException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterMailDomain",
})) as any;

export type DescribeEmailMonitoringConfigurationError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the current email monitoring configuration for a specified organization.
 */
export const describeEmailMonitoringConfiguration: API.OperationMethod<
  DescribeEmailMonitoringConfigurationRequest,
  DescribeEmailMonitoringConfigurationResponse,
  DescribeEmailMonitoringConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { OrganizationId: 0 } },
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEmailMonitoringConfiguration",
})) as any;

export type DescribeEntityError =
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Returns basic details about an entity in WorkMail.
 */
export const describeEntity: API.OperationMethod<
  DescribeEntityRequest,
  DescribeEntityResponse,
  DescribeEntityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { OrganizationId: 0, Email: 0 } },
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEntity",
})) as any;

export type DescribeGroupError =
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Returns the data available for the group.
 */
export const describeGroup: API.OperationMethod<
  DescribeGroupRequest,
  DescribeGroupResponse,
  DescribeGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, GroupId: 0 },
    output: { EnabledDate: D.ts, DisabledDate: D.ts },
  },
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGroup",
})) as any;

export type DescribeIdentityProviderConfigurationError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns detailed information on the current IdC setup for the WorkMail organization.
 */
export const describeIdentityProviderConfiguration: API.OperationMethod<
  DescribeIdentityProviderConfigurationRequest,
  DescribeIdentityProviderConfigurationResponse,
  DescribeIdentityProviderConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { OrganizationId: 0 } },
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIdentityProviderConfiguration",
})) as any;

export type DescribeInboundDmarcSettingsError =
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Lists the settings in a DMARC policy for a specified organization.
 */
export const describeInboundDmarcSettings: API.OperationMethod<
  DescribeInboundDmarcSettingsRequest,
  DescribeInboundDmarcSettingsResponse,
  DescribeInboundDmarcSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { OrganizationId: 0 } },
  errors: [OrganizationNotFoundException, OrganizationStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInboundDmarcSettings",
})) as any;

export type DescribeMailboxExportJobError =
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Describes the current status of a mailbox export job.
 */
export const describeMailboxExportJob: API.OperationMethod<
  DescribeMailboxExportJobRequest,
  DescribeMailboxExportJobResponse,
  DescribeMailboxExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobId: 0, OrganizationId: 0 },
    output: { StartTime: D.ts, EndTime: D.ts },
  },
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMailboxExportJob",
})) as any;

export type DescribeOrganizationError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | CommonErrors;
/**
 * Provides more information regarding a given organization based on its
 * identifier.
 */
export const describeOrganization: API.OperationMethod<
  DescribeOrganizationRequest,
  DescribeOrganizationResponse,
  DescribeOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0 },
    output: { CompletedDate: D.ts },
  },
  errors: [InvalidParameterException, OrganizationNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrganization",
})) as any;

export type DescribeResourceError =
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns the data available for the resource.
 */
export const describeResource: API.OperationMethod<
  DescribeResourceRequest,
  DescribeResourceResponse,
  DescribeResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, ResourceId: 0 },
    output: { EnabledDate: D.ts, DisabledDate: D.ts, Description: D.secret },
  },
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResource",
})) as any;

export type DescribeUserError =
  | DirectoryServiceAuthenticationFailedException
  | DirectoryUnavailableException
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Provides information regarding the user.
 */
export const describeUser: API.OperationMethod<
  DescribeUserRequest,
  DescribeUserResponse,
  DescribeUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, UserId: 0 },
    output: {
      DisplayName: D.secret,
      EnabledDate: D.ts,
      DisabledDate: D.ts,
      MailboxProvisionedDate: D.ts,
      MailboxDeprovisionedDate: D.ts,
      FirstName: D.secret,
      LastName: D.secret,
      Initials: D.secret,
      Telephone: D.secret,
      Street: D.secret,
      JobTitle: D.secret,
      City: D.secret,
      Company: D.secret,
      ZipCode: D.secret,
      Department: D.secret,
      Country: D.secret,
      Office: D.secret,
    },
  },
  errors: [
    DirectoryServiceAuthenticationFailedException,
    DirectoryUnavailableException,
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUser",
})) as any;

export type DisassociateDelegateFromResourceError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Removes a member from the resource's set of delegates.
 */
export const disassociateDelegateFromResource: API.OperationMethod<
  DisassociateDelegateFromResourceRequest,
  DisassociateDelegateFromResourceResponse,
  DisassociateDelegateFromResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, ResourceId: 0, EntityId: 0 },
  },
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateDelegateFromResource",
})) as any;

export type DisassociateMemberFromGroupError =
  | DirectoryServiceAuthenticationFailedException
  | DirectoryUnavailableException
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Removes a member from a group.
 */
export const disassociateMemberFromGroup: API.OperationMethod<
  DisassociateMemberFromGroupRequest,
  DisassociateMemberFromGroupResponse,
  DisassociateMemberFromGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, GroupId: 0, MemberId: 0 },
  },
  errors: [
    DirectoryServiceAuthenticationFailedException,
    DirectoryUnavailableException,
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateMemberFromGroup",
})) as any;

export type GetAccessControlEffectError =
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the effects of an organization's access control rules as they apply to a
 * specified IPv4 address, access protocol action, and user ID or impersonation role ID. You must provide either the user ID or impersonation role ID. Impersonation role ID can only be used with Action EWS.
 */
export const getAccessControlEffect: API.OperationMethod<
  GetAccessControlEffectRequest,
  GetAccessControlEffectResponse,
  GetAccessControlEffectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      OrganizationId: 0,
      IpAddress: 0,
      Action: 0,
      UserId: 0,
      ImpersonationRoleId: 0,
    },
  },
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessControlEffect",
})) as any;

export type GetDefaultRetentionPolicyError =
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Gets the default retention policy details for the specified organization.
 */
export const getDefaultRetentionPolicy: API.OperationMethod<
  GetDefaultRetentionPolicyRequest,
  GetDefaultRetentionPolicyResponse,
  GetDefaultRetentionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { OrganizationId: 0 } },
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDefaultRetentionPolicy",
})) as any;

export type GetImpersonationRoleError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the impersonation role details for the given WorkMail organization.
 */
export const getImpersonationRole: API.OperationMethod<
  GetImpersonationRoleRequest,
  GetImpersonationRoleResponse,
  GetImpersonationRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, ImpersonationRoleId: 0 },
    output: { DateCreated: D.ts, DateModified: D.ts },
  },
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImpersonationRole",
})) as any;

export type GetImpersonationRoleEffectError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Tests whether the given impersonation role can impersonate a target user.
 */
export const getImpersonationRoleEffect: API.OperationMethod<
  GetImpersonationRoleEffectRequest,
  GetImpersonationRoleEffectResponse,
  GetImpersonationRoleEffectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, ImpersonationRoleId: 0, TargetUser: 0 },
  },
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImpersonationRoleEffect",
})) as any;

export type GetMailboxDetailsError =
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Requests a user's mailbox details for a specified organization and user.
 */
export const getMailboxDetails: API.OperationMethod<
  GetMailboxDetailsRequest,
  GetMailboxDetailsResponse,
  GetMailboxDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { OrganizationId: 0, UserId: 0 } },
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMailboxDetails",
})) as any;

export type GetMailDomainError =
  | InvalidParameterException
  | MailDomainNotFoundException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Gets details for a mail domain, including domain records required to configure your domain with recommended security.
 */
export const getMailDomain: API.OperationMethod<
  GetMailDomainRequest,
  GetMailDomainResponse,
  GetMailDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { OrganizationId: 0, DomainName: 0 } },
  errors: [
    InvalidParameterException,
    MailDomainNotFoundException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMailDomain",
})) as any;

export type GetMobileDeviceAccessEffectError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Simulates the effect of the mobile device access rules for the given attributes of a sample access event. Use this method to test the effects of the current set of mobile device access
 * rules for the WorkMail organization for a particular user's attributes.
 */
export const getMobileDeviceAccessEffect: API.OperationMethod<
  GetMobileDeviceAccessEffectRequest,
  GetMobileDeviceAccessEffectResponse,
  GetMobileDeviceAccessEffectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      OrganizationId: 0,
      DeviceType: 0,
      DeviceModel: 0,
      DeviceOperatingSystem: 0,
      DeviceUserAgent: 0,
    },
  },
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMobileDeviceAccessEffect",
})) as any;

export type GetMobileDeviceAccessOverrideError =
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the mobile device access override for the given WorkMail organization, user, and device.
 */
export const getMobileDeviceAccessOverride: API.OperationMethod<
  GetMobileDeviceAccessOverrideRequest,
  GetMobileDeviceAccessOverrideResponse,
  GetMobileDeviceAccessOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, UserId: 0, DeviceId: 0 },
    output: { DateCreated: D.ts, DateModified: D.ts },
  },
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMobileDeviceAccessOverride",
})) as any;

export type GetPersonalAccessTokenMetadataError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Requests details of a specific Personal Access Token within the WorkMail organization.
 */
export const getPersonalAccessTokenMetadata: API.OperationMethod<
  GetPersonalAccessTokenMetadataRequest,
  GetPersonalAccessTokenMetadataResponse,
  GetPersonalAccessTokenMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, PersonalAccessTokenId: 0 },
    output: { DateCreated: D.ts, DateLastUsed: D.ts, ExpiresTime: D.ts },
  },
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPersonalAccessTokenMetadata",
})) as any;

export type ListAccessControlRulesError =
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Lists the access control rules for the specified organization.
 */
export const listAccessControlRules: API.OperationMethod<
  ListAccessControlRulesRequest,
  ListAccessControlRulesResponse,
  ListAccessControlRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0 },
    output: { Rules: D.list({ DateCreated: D.ts, DateModified: D.ts }) },
  },
  errors: [OrganizationNotFoundException, OrganizationStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessControlRules",
})) as any;

export type ListAliasesError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Creates a paginated call to list the aliases associated with a given
 * entity.
 */
export const listAliases: API.PaginatedOperationMethod<
  ListAliasesRequest,
  ListAliasesResponse,
  ListAliasesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, EntityId: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAliases",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAvailabilityConfigurationsError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * List all the `AvailabilityConfiguration`'s for the given WorkMail organization.
 */
export const listAvailabilityConfigurations: API.PaginatedOperationMethod<
  ListAvailabilityConfigurationsRequest,
  ListAvailabilityConfigurationsResponse,
  ListAvailabilityConfigurationsError,
  Credentials | HttpClient.HttpClient,
  AvailabilityConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, MaxResults: 0, NextToken: 0 },
    output: {
      AvailabilityConfigurations: D.list({
        DateCreated: D.ts,
        DateModified: D.ts,
      }),
    },
  },
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAvailabilityConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AvailabilityConfigurations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGroupMembersError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Returns an overview of the members of a group. Users and groups can be members of a
 * group.
 */
export const listGroupMembers: API.PaginatedOperationMethod<
  ListGroupMembersRequest,
  ListGroupMembersResponse,
  ListGroupMembersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, GroupId: 0, NextToken: 0, MaxResults: 0 },
    output: { Members: D.list({ EnabledDate: D.ts, DisabledDate: D.ts }) },
  },
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupMembers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGroupsError =
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Returns summaries of the organization's groups.
 */
export const listGroups: API.PaginatedOperationMethod<
  ListGroupsRequest,
  ListGroupsResponse,
  ListGroupsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      OrganizationId: 0,
      NextToken: 0,
      MaxResults: 0,
      Filters: { NamePrefix: 0, PrimaryEmailPrefix: 0, State: 0 },
    },
    output: { Groups: D.list({ EnabledDate: D.ts, DisabledDate: D.ts }) },
  },
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGroupsForEntityError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Returns all the groups to which an entity belongs.
 */
export const listGroupsForEntity: API.PaginatedOperationMethod<
  ListGroupsForEntityRequest,
  ListGroupsForEntityResponse,
  ListGroupsForEntityError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      OrganizationId: 0,
      EntityId: 0,
      Filters: { GroupNamePrefix: 0 },
      NextToken: 0,
      MaxResults: 0,
    },
  },
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupsForEntity",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListImpersonationRolesError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Lists all the impersonation roles for the given WorkMail organization.
 */
export const listImpersonationRoles: API.PaginatedOperationMethod<
  ListImpersonationRolesRequest,
  ListImpersonationRolesResponse,
  ListImpersonationRolesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, NextToken: 0, MaxResults: 0 },
    output: { Roles: D.list({ DateCreated: D.ts, DateModified: D.ts }) },
  },
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImpersonationRoles",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMailboxExportJobsError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Lists the mailbox export jobs started for the specified organization within the last
 * seven days.
 */
export const listMailboxExportJobs: API.PaginatedOperationMethod<
  ListMailboxExportJobsRequest,
  ListMailboxExportJobsResponse,
  ListMailboxExportJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, NextToken: 0, MaxResults: 0 },
    output: { Jobs: D.list({ StartTime: D.ts, EndTime: D.ts }) },
  },
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMailboxExportJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMailboxPermissionsError =
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Lists the mailbox permissions associated with a user, group, or resource
 * mailbox.
 */
export const listMailboxPermissions: API.PaginatedOperationMethod<
  ListMailboxPermissionsRequest,
  ListMailboxPermissionsResponse,
  ListMailboxPermissionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, EntityId: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMailboxPermissions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMailDomainsError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Lists the mail domains in a given WorkMail organization.
 */
export const listMailDomains: API.PaginatedOperationMethod<
  ListMailDomainsRequest,
  ListMailDomainsResponse,
  ListMailDomainsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMailDomains",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMobileDeviceAccessOverridesError =
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Lists all the mobile device access overrides for any given combination of WorkMail organization, user, or device.
 */
export const listMobileDeviceAccessOverrides: API.PaginatedOperationMethod<
  ListMobileDeviceAccessOverridesRequest,
  ListMobileDeviceAccessOverridesResponse,
  ListMobileDeviceAccessOverridesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      OrganizationId: 0,
      UserId: 0,
      DeviceId: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: { Overrides: D.list({ DateCreated: D.ts, DateModified: D.ts }) },
  },
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMobileDeviceAccessOverrides",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMobileDeviceAccessRulesError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Lists the mobile device access rules for the specified WorkMail organization.
 */
export const listMobileDeviceAccessRules: API.OperationMethod<
  ListMobileDeviceAccessRulesRequest,
  ListMobileDeviceAccessRulesResponse,
  ListMobileDeviceAccessRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0 },
    output: { Rules: D.list({ DateCreated: D.ts, DateModified: D.ts }) },
  },
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMobileDeviceAccessRules",
})) as any;

export type ListOrganizationsError = InvalidParameterException | CommonErrors;
/**
 * Returns summaries of the customer's organizations.
 */
export const listOrganizations: API.PaginatedOperationMethod<
  ListOrganizationsRequest,
  ListOrganizationsResponse,
  ListOrganizationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { NextToken: 0, MaxResults: 0 } },
  errors: [InvalidParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOrganizations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPersonalAccessTokensError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Returns a summary of your Personal Access Tokens.
 */
export const listPersonalAccessTokens: API.PaginatedOperationMethod<
  ListPersonalAccessTokensRequest,
  ListPersonalAccessTokensResponse,
  ListPersonalAccessTokensError,
  Credentials | HttpClient.HttpClient,
  PersonalAccessTokenSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, UserId: 0, NextToken: 0, MaxResults: 0 },
    output: {
      PersonalAccessTokenSummaries: D.list({
        DateCreated: D.ts,
        DateLastUsed: D.ts,
        ExpiresTime: D.ts,
      }),
    },
  },
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPersonalAccessTokens",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PersonalAccessTokenSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourceDelegatesError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Lists the delegates associated with a resource. Users and groups can be resource
 * delegates and answer requests on behalf of the resource.
 */
export const listResourceDelegates: API.PaginatedOperationMethod<
  ListResourceDelegatesRequest,
  ListResourceDelegatesResponse,
  ListResourceDelegatesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, ResourceId: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceDelegates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourcesError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns summaries of the organization's resources.
 */
export const listResources: API.PaginatedOperationMethod<
  ListResourcesRequest,
  ListResourcesResponse,
  ListResourcesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      OrganizationId: 0,
      NextToken: 0,
      MaxResults: 0,
      Filters: { NamePrefix: 0, PrimaryEmailPrefix: 0, State: 0 },
    },
    output: {
      Resources: D.list({
        EnabledDate: D.ts,
        DisabledDate: D.ts,
        Description: D.secret,
      }),
    },
  },
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Lists the tags applied to an WorkMail organization resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListUsersError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Returns summaries of the organization's users.
 */
export const listUsers: API.PaginatedOperationMethod<
  ListUsersRequest,
  ListUsersResponse,
  ListUsersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      OrganizationId: 0,
      NextToken: 0,
      MaxResults: 0,
      Filters: {
        UsernamePrefix: 0,
        DisplayNamePrefix: 0,
        PrimaryEmailPrefix: 0,
        State: 0,
        IdentityProviderUserIdPrefix: 0,
      },
    },
    output: { Users: D.list({ EnabledDate: D.ts, DisabledDate: D.ts }) },
  },
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUsers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutAccessControlRuleError =
  | EntityNotFoundException
  | InvalidParameterException
  | LimitExceededException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds a new access control rule for the specified organization. The rule allows or
 * denies access to the organization for the specified IPv4 addresses, access protocol
 * actions, user IDs and impersonation IDs. Adding a new rule with the same name as an existing rule replaces
 * the older rule.
 */
export const putAccessControlRule: API.OperationMethod<
  PutAccessControlRuleRequest,
  PutAccessControlRuleResponse,
  PutAccessControlRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Effect: 0,
      Description: 0,
      IpRanges: 0,
      NotIpRanges: 0,
      Actions: 0,
      NotActions: 0,
      UserIds: 0,
      NotUserIds: 0,
      OrganizationId: 0,
      ImpersonationRoleIds: 0,
      NotImpersonationRoleIds: 0,
    },
  },
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    LimitExceededException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccessControlRule",
})) as any;

export type PutEmailMonitoringConfigurationError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates or updates the email monitoring configuration for a specified organization.
 */
export const putEmailMonitoringConfiguration: API.OperationMethod<
  PutEmailMonitoringConfigurationRequest,
  PutEmailMonitoringConfigurationResponse,
  PutEmailMonitoringConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, RoleArn: 0, LogGroupArn: 0 },
  },
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEmailMonitoringConfiguration",
})) as any;

export type PutIdentityProviderConfigurationError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Enables integration between IAM Identity Center (IdC) and WorkMail to proxy authentication requests for mailbox users. You can connect your IdC directory or your external directory to WorkMail through
 * IdC and manage access to WorkMail mailboxes in a single place. For enhanced protection, you could enable Multifactor Authentication (MFA) and Personal Access Tokens.
 */
export const putIdentityProviderConfiguration: API.OperationMethod<
  PutIdentityProviderConfigurationRequest,
  PutIdentityProviderConfigurationResponse,
  PutIdentityProviderConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      OrganizationId: 0,
      AuthenticationMode: 0,
      IdentityCenterConfiguration: { InstanceArn: 0, ApplicationArn: 0 },
      PersonalAccessTokenConfiguration: { Status: 0, LifetimeInDays: 0 },
    },
  },
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutIdentityProviderConfiguration",
})) as any;

export type PutInboundDmarcSettingsError =
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Enables or disables a DMARC policy for a given organization.
 */
export const putInboundDmarcSettings: API.OperationMethod<
  PutInboundDmarcSettingsRequest,
  PutInboundDmarcSettingsResponse,
  PutInboundDmarcSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { OrganizationId: 0, Enforced: 0 } },
  errors: [OrganizationNotFoundException, OrganizationStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutInboundDmarcSettings",
})) as any;

export type PutMailboxPermissionsError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Sets permissions for a user, group, or resource. This replaces any pre-existing
 * permissions.
 */
export const putMailboxPermissions: API.OperationMethod<
  PutMailboxPermissionsRequest,
  PutMailboxPermissionsResponse,
  PutMailboxPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      OrganizationId: 0,
      EntityId: 0,
      GranteeId: 0,
      PermissionValues: 0,
    },
  },
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMailboxPermissions",
})) as any;

export type PutMobileDeviceAccessOverrideError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Creates or updates a mobile device access override for the given WorkMail organization, user, and device.
 */
export const putMobileDeviceAccessOverride: API.OperationMethod<
  PutMobileDeviceAccessOverrideRequest,
  PutMobileDeviceAccessOverrideResponse,
  PutMobileDeviceAccessOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      OrganizationId: 0,
      UserId: 0,
      DeviceId: 0,
      Effect: 0,
      Description: 0,
    },
  },
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMobileDeviceAccessOverride",
})) as any;

export type PutRetentionPolicyError =
  | InvalidParameterException
  | LimitExceededException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Puts a retention policy to the specified organization.
 */
export const putRetentionPolicy: API.OperationMethod<
  PutRetentionPolicyRequest,
  PutRetentionPolicyResponse,
  PutRetentionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      OrganizationId: 0,
      Id: 0,
      Name: 0,
      Description: 0,
      FolderConfigurations: D.list({ Name: 0, Action: 0, Period: 0 }),
    },
  },
  errors: [
    InvalidParameterException,
    LimitExceededException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRetentionPolicy",
})) as any;

export type RegisterMailDomainError =
  | InvalidParameterException
  | LimitExceededException
  | MailDomainInUseException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Registers a new domain in WorkMail and SES, and configures it for use by WorkMail. Emails received by SES for this domain are routed to the specified WorkMail organization, and WorkMail has
 * permanent permission to use the specified domain for sending your users' emails.
 */
export const registerMailDomain: API.OperationMethod<
  RegisterMailDomainRequest,
  RegisterMailDomainResponse,
  RegisterMailDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientToken: D.m({ idempotency: true }),
      OrganizationId: 0,
      DomainName: 0,
    },
  },
  errors: [
    InvalidParameterException,
    LimitExceededException,
    MailDomainInUseException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterMailDomain",
})) as any;

export type RegisterToWorkMailError =
  | DirectoryServiceAuthenticationFailedException
  | DirectoryUnavailableException
  | EmailAddressInUseException
  | EntityAlreadyRegisteredException
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | MailDomainNotFoundException
  | MailDomainStateException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Registers an existing and disabled user, group, or resource for WorkMail use by
 * associating a mailbox and calendaring capabilities. It performs no change if the user,
 * group, or resource is enabled and fails if the user, group, or resource is deleted. This
 * operation results in the accumulation of costs. For more information, see Pricing. The equivalent console
 * functionality for this operation is *Enable*.
 *
 * Users can either be created by calling the CreateUser API operation
 * or they can be synchronized from your directory. For more information, see DeregisterFromWorkMail.
 */
export const registerToWorkMail: API.OperationMethod<
  RegisterToWorkMailRequest,
  RegisterToWorkMailResponse,
  RegisterToWorkMailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, EntityId: 0, Email: 0 },
  },
  errors: [
    DirectoryServiceAuthenticationFailedException,
    DirectoryUnavailableException,
    EmailAddressInUseException,
    EntityAlreadyRegisteredException,
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    MailDomainNotFoundException,
    MailDomainStateException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterToWorkMail",
})) as any;

export type ResetPasswordError =
  | DirectoryServiceAuthenticationFailedException
  | DirectoryUnavailableException
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | InvalidPasswordException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Allows the administrator to reset the password for a user.
 */
export const resetPassword: API.OperationMethod<
  ResetPasswordRequest,
  ResetPasswordResponse,
  ResetPasswordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, UserId: 0, Password: 0 },
  },
  errors: [
    DirectoryServiceAuthenticationFailedException,
    DirectoryUnavailableException,
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    InvalidPasswordException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetPassword",
})) as any;

export type StartMailboxExportJobError =
  | EntityNotFoundException
  | InvalidParameterException
  | LimitExceededException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Starts a mailbox export job to export MIME-format email messages and calendar items
 * from the specified mailbox to the specified Amazon Simple Storage Service (Amazon S3)
 * bucket. For more information, see Exporting mailbox content in
 * the *WorkMail Administrator Guide*.
 */
export const startMailboxExportJob: API.OperationMethod<
  StartMailboxExportJobRequest,
  StartMailboxExportJobResponse,
  StartMailboxExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientToken: D.m({ idempotency: true }),
      OrganizationId: 0,
      EntityId: 0,
      Description: 0,
      RoleArn: 0,
      KmsKeyArn: 0,
      S3BucketName: 0,
      S3Prefix: 0,
    },
  },
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    LimitExceededException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMailboxExportJob",
})) as any;

export type TagResourceError =
  | InvalidParameterException
  | OrganizationStateException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Applies the specified tags to the specified WorkMailorganization
 * resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceARN: 0, Tags: D.list({ Key: 0, Value: 0 }) },
  },
  errors: [
    InvalidParameterException,
    OrganizationStateException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type TestAvailabilityConfigurationError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Performs a test on an availability provider to ensure that access is allowed. For EWS, it verifies the provided credentials can be used to successfully log in. For Lambda, it verifies that the Lambda function can be invoked and that the resource access
 * policy was configured to deny anonymous access. An anonymous invocation is one done without providing either a `SourceArn` or `SourceAccount` header.
 *
 * The request must contain either one provider definition (`EwsProvider` or
 * `LambdaProvider`) or the `DomainName` parameter. If the
 * `DomainName` parameter is provided, the configuration stored under the
 * `DomainName` will be tested.
 */
export const testAvailabilityConfiguration: API.OperationMethod<
  TestAvailabilityConfigurationRequest,
  TestAvailabilityConfigurationResponse,
  TestAvailabilityConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      OrganizationId: 0,
      DomainName: 0,
      EwsProvider: i_EwsAvailabilityProvider,
      LambdaProvider: i_LambdaAvailabilityProvider,
    },
  },
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestAvailabilityConfiguration",
})) as any;

export type UntagResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Untags the specified tags from the specified WorkMail organization
 * resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, TagKeys: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAvailabilityConfigurationError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an existing `AvailabilityConfiguration` for the given WorkMail
 * organization and domain.
 */
export const updateAvailabilityConfiguration: API.OperationMethod<
  UpdateAvailabilityConfigurationRequest,
  UpdateAvailabilityConfigurationResponse,
  UpdateAvailabilityConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      OrganizationId: 0,
      DomainName: 0,
      EwsProvider: i_EwsAvailabilityProvider,
      LambdaProvider: i_LambdaAvailabilityProvider,
    },
  },
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAvailabilityConfiguration",
})) as any;

export type UpdateDefaultMailDomainError =
  | InvalidParameterException
  | MailDomainNotFoundException
  | MailDomainStateException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Updates the default mail domain for an organization. The default mail domain is used by the WorkMail AWS Console to suggest an email address when enabling a mail user. You can only have one default domain.
 */
export const updateDefaultMailDomain: API.OperationMethod<
  UpdateDefaultMailDomainRequest,
  UpdateDefaultMailDomainResponse,
  UpdateDefaultMailDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { OrganizationId: 0, DomainName: 0 } },
  errors: [
    InvalidParameterException,
    MailDomainNotFoundException,
    MailDomainStateException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDefaultMailDomain",
})) as any;

export type UpdateGroupError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Updates attributes in a group.
 */
export const updateGroup: API.OperationMethod<
  UpdateGroupRequest,
  UpdateGroupResponse,
  UpdateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, GroupId: 0, HiddenFromGlobalAddressList: 0 },
  },
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGroup",
})) as any;

export type UpdateImpersonationRoleError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | LimitExceededException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an impersonation role for the given WorkMail organization.
 */
export const updateImpersonationRole: API.OperationMethod<
  UpdateImpersonationRoleRequest,
  UpdateImpersonationRoleResponse,
  UpdateImpersonationRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      OrganizationId: 0,
      ImpersonationRoleId: 0,
      Name: 0,
      Type: 0,
      Description: 0,
      Rules: D.list(i_ImpersonationRule),
    },
  },
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    LimitExceededException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateImpersonationRole",
})) as any;

export type UpdateMailboxQuotaError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Updates a user's current mailbox quota for a specified organization and
 * user.
 */
export const updateMailboxQuota: API.OperationMethod<
  UpdateMailboxQuotaRequest,
  UpdateMailboxQuotaResponse,
  UpdateMailboxQuotaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, UserId: 0, MailboxQuota: 0 },
  },
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMailboxQuota",
})) as any;

export type UpdateMobileDeviceAccessRuleError =
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Updates a mobile device access rule for the specified WorkMail organization.
 */
export const updateMobileDeviceAccessRule: API.OperationMethod<
  UpdateMobileDeviceAccessRuleRequest,
  UpdateMobileDeviceAccessRuleResponse,
  UpdateMobileDeviceAccessRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      OrganizationId: 0,
      MobileDeviceAccessRuleId: 0,
      Name: 0,
      Description: 0,
      Effect: 0,
      DeviceTypes: 0,
      NotDeviceTypes: 0,
      DeviceModels: 0,
      NotDeviceModels: 0,
      DeviceOperatingSystems: 0,
      NotDeviceOperatingSystems: 0,
      DeviceUserAgents: 0,
      NotDeviceUserAgents: 0,
    },
  },
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMobileDeviceAccessRule",
})) as any;

export type UpdatePrimaryEmailAddressError =
  | DirectoryServiceAuthenticationFailedException
  | DirectoryUnavailableException
  | EmailAddressInUseException
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | MailDomainNotFoundException
  | MailDomainStateException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Updates the primary email for a user, group, or resource. The current email is moved
 * into the list of aliases (or swapped between an existing alias and the current primary
 * email), and the email provided in the input is promoted as the primary.
 */
export const updatePrimaryEmailAddress: API.OperationMethod<
  UpdatePrimaryEmailAddressRequest,
  UpdatePrimaryEmailAddressResponse,
  UpdatePrimaryEmailAddressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OrganizationId: 0, EntityId: 0, Email: 0 },
  },
  errors: [
    DirectoryServiceAuthenticationFailedException,
    DirectoryUnavailableException,
    EmailAddressInUseException,
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    MailDomainNotFoundException,
    MailDomainStateException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePrimaryEmailAddress",
})) as any;

export type UpdateResourceError =
  | DirectoryUnavailableException
  | EmailAddressInUseException
  | EntityNotFoundException
  | EntityStateException
  | InvalidConfigurationException
  | InvalidParameterException
  | MailDomainNotFoundException
  | MailDomainStateException
  | NameAvailabilityException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Updates data for the resource. To have the latest information, it must be preceded by
 * a DescribeResource call. The dataset in the request should be the one
 * expected when performing another `DescribeResource` call.
 */
export const updateResource: API.OperationMethod<
  UpdateResourceRequest,
  UpdateResourceResponse,
  UpdateResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      OrganizationId: 0,
      ResourceId: 0,
      Name: 0,
      BookingOptions: {
        AutoAcceptRequests: 0,
        AutoDeclineRecurringRequests: 0,
        AutoDeclineConflictingRequests: 0,
      },
      Description: 0,
      Type: 0,
      HiddenFromGlobalAddressList: 0,
    },
  },
  errors: [
    DirectoryUnavailableException,
    EmailAddressInUseException,
    EntityNotFoundException,
    EntityStateException,
    InvalidConfigurationException,
    InvalidParameterException,
    MailDomainNotFoundException,
    MailDomainStateException,
    NameAvailabilityException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResource",
})) as any;

export type UpdateUserError =
  | DirectoryServiceAuthenticationFailedException
  | DirectoryUnavailableException
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Updates data for the user. To have the latest information, it must be preceded by a
 * DescribeUser call. The dataset in the request should be the one
 * expected when performing another `DescribeUser` call.
 */
export const updateUser: API.OperationMethod<
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      OrganizationId: 0,
      UserId: 0,
      Role: 0,
      DisplayName: 0,
      FirstName: 0,
      LastName: 0,
      HiddenFromGlobalAddressList: 0,
      Initials: 0,
      Telephone: 0,
      Street: 0,
      JobTitle: 0,
      City: 0,
      Company: 0,
      ZipCode: 0,
      Department: 0,
      Country: 0,
      Office: 0,
      IdentityProviderUserId: 0,
    },
  },
  errors: [
    DirectoryServiceAuthenticationFailedException,
    DirectoryUnavailableException,
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUser",
})) as any;

const i_EwsAvailabilityProvider: D.LazyStruct = () => ({
  EwsEndpoint: 0,
  EwsUsername: 0,
  EwsPassword: 0,
});
const i_ImpersonationRule: D.LazyStruct = () => ({
  ImpersonationRuleId: 0,
  Name: 0,
  Description: 0,
  Effect: 0,
  TargetUsers: 0,
  NotTargetUsers: 0,
});
const i_LambdaAvailabilityProvider: D.LazyStruct = () => ({ LambdaArn: 0 });
