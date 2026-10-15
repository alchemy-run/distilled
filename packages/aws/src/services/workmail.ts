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
  sdkId: "WorkMail",
  serviceShapeName: "WorkMailService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "workmail" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-10-01");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
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
              `https://workmail-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://workmail-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://workmail.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://workmail.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://workmail.{R}.{D}","properties":{},"headers":{}}');

export class DirectoryInUseException
  extends /*@__PURE__*/ S.TaggedError<DirectoryInUseException>()("DirectoryInUseException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class DirectoryServiceAuthenticationFailedException
  extends /*@__PURE__*/ S.TaggedError<DirectoryServiceAuthenticationFailedException>()(
    "DirectoryServiceAuthenticationFailedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class DirectoryUnavailableException
  extends /*@__PURE__*/ S.TaggedError<DirectoryUnavailableException>()(
    "DirectoryUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class EmailAddressInUseException
  extends /*@__PURE__*/ S.TaggedError<EmailAddressInUseException>()("EmailAddressInUseException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class EntityAlreadyRegisteredException
  extends /*@__PURE__*/ S.TaggedError<EntityAlreadyRegisteredException>()(
    "EntityAlreadyRegisteredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class EntityNotFoundException
  extends /*@__PURE__*/ S.TaggedError<EntityNotFoundException>()("EntityNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class EntityStateException
  extends /*@__PURE__*/ S.TaggedError<EntityStateException>()("EntityStateException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidConfigurationException
  extends /*@__PURE__*/ S.TaggedError<InvalidConfigurationException>()(
    "InvalidConfigurationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidCustomSesConfigurationException
  extends /*@__PURE__*/ S.TaggedError<InvalidCustomSesConfigurationException>()(
    "InvalidCustomSesConfigurationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()("InvalidParameterException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidPasswordException
  extends /*@__PURE__*/ S.TaggedError<InvalidPasswordException>()("InvalidPasswordException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()("LimitExceededException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class MailDomainInUseException
  extends /*@__PURE__*/ S.TaggedError<MailDomainInUseException>()("MailDomainInUseException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class MailDomainNotFoundException
  extends /*@__PURE__*/ S.TaggedError<MailDomainNotFoundException>()(
    "MailDomainNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class MailDomainStateException
  extends /*@__PURE__*/ S.TaggedError<MailDomainStateException>()("MailDomainStateException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class NameAvailabilityException
  extends /*@__PURE__*/ S.TaggedError<NameAvailabilityException>()("NameAvailabilityException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class OrganizationNotFoundException
  extends /*@__PURE__*/ S.TaggedError<OrganizationNotFoundException>()(
    "OrganizationNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class OrganizationStateException
  extends /*@__PURE__*/ S.TaggedError<OrganizationStateException>()("OrganizationStateException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ReservedNameException
  extends /*@__PURE__*/ S.TaggedError<ReservedNameException>()("ReservedNameException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperationException>()(
    "UnsupportedOperationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
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
export type UserRole = "USER" | "RESOURCE" | "SYSTEM_USER" | "REMOTE_USER" | (string & {});
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
export type PersonalAccessTokenConfigurationStatus = "ACTIVE" | "INACTIVE" | (string & {});
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
export type RetentionAction = "NONE" | "DELETE" | "PERMANENTLY_DELETE" | (string & {});
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
export type DnsRecordVerificationStatus = "PENDING" | "VERIFIED" | "FAILED" | (string & {});
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
export type PermissionType = "FULL_ACCESS" | "SEND_AS" | "SEND_ON_BEHALF" | (string & {});
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
  input: __S(112, __c14, 0) as any as S.Schema<AssociateDelegateToResourceRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<AssociateDelegateToResourceResponse>,
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
}));

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
  input: __S(128, __c16, 0) as any as S.Schema<AssociateMemberToGroupRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<AssociateMemberToGroupResponse>,
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
}));

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
  input: __S(136, __c17, 0) as any as S.Schema<AssumeImpersonationRoleRequest>,
  output: __S(137, __c17, 1) as any as S.Schema<AssumeImpersonationRoleResponse>,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssumeImpersonationRole",
}));

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
  input: __S(144, __c18, 0) as any as S.Schema<CancelMailboxExportJobRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<CancelMailboxExportJobResponse>,
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelMailboxExportJob",
}));

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
  input: __S(152, __c19, 0) as any as S.Schema<CreateAliasRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<CreateAliasResponse>,
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
}));

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
  input: __S(160, __c20, 0) as any as S.Schema<CreateAvailabilityConfigurationRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<CreateAvailabilityConfigurationResponse>,
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
}));

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
  input: __S(184, __c23, 0) as any as S.Schema<CreateGroupRequest>,
  output: __S(185, __c23, 1) as any as S.Schema<CreateGroupResponse>,
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
}));

export type CreateIdentityCenterApplicationError = InvalidParameterException | CommonErrors;
/**
 * Creates the WorkMail application in IAM Identity Center that can be used later in the WorkMail - IdC integration. For more information, see PutIdentityProviderConfiguration. This action does not affect the authentication settings for any WorkMail organizations.
 */
export const createIdentityCenterApplication: API.OperationMethod<
  CreateIdentityCenterApplicationRequest,
  CreateIdentityCenterApplicationResponse,
  CreateIdentityCenterApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<CreateIdentityCenterApplicationRequest>,
  output: __S(193, __c24, 1) as any as S.Schema<CreateIdentityCenterApplicationResponse>,
  errors: [InvalidParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIdentityCenterApplication",
}));

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
  input: __S(200, __c25, 0) as any as S.Schema<CreateImpersonationRoleRequest>,
  output: __S(201, __c25, 1) as any as S.Schema<CreateImpersonationRoleResponse>,
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
}));

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
  input: __S(224, __c28, 0) as any as S.Schema<CreateMobileDeviceAccessRuleRequest>,
  output: __S(225, __c28, 1) as any as S.Schema<CreateMobileDeviceAccessRuleResponse>,
  errors: [
    InvalidParameterException,
    LimitExceededException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMobileDeviceAccessRule",
}));

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
  input: __S(234, __c29, 2) as any as S.Schema<CreateOrganizationRequest>,
  output: __S(235, __c29, 3) as any as S.Schema<CreateOrganizationResponse>,
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
}));

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
  input: __S(240, __c30, 0) as any as S.Schema<CreateResourceRequest>,
  output: __S(241, __c30, 1) as any as S.Schema<CreateResourceResponse>,
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
}));

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
  input: __S(248, __c31, 0) as any as S.Schema<CreateUserRequest>,
  output: __S(249, __c31, 1) as any as S.Schema<CreateUserResponse>,
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
}));

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
  input: __S(256, __c32, 0) as any as S.Schema<DeleteAccessControlRuleRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<DeleteAccessControlRuleResponse>,
  errors: [OrganizationNotFoundException, OrganizationStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessControlRule",
}));

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
  input: __S(264, __c33, 0) as any as S.Schema<DeleteAliasRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<DeleteAliasResponse>,
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
}));

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
  input: __S(272, __c34, 0) as any as S.Schema<DeleteAvailabilityConfigurationRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<DeleteAvailabilityConfigurationResponse>,
  errors: [OrganizationNotFoundException, OrganizationStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAvailabilityConfiguration",
}));

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
  input: __S(280, __c35, 0) as any as S.Schema<DeleteEmailMonitoringConfigurationRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<DeleteEmailMonitoringConfigurationResponse>,
  errors: [InvalidParameterException, OrganizationNotFoundException, OrganizationStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEmailMonitoringConfiguration",
}));

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
  input: __S(288, __c36, 0) as any as S.Schema<DeleteGroupRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<DeleteGroupResponse>,
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
}));

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
  input: __S(296, __c37, 0) as any as S.Schema<DeleteIdentityCenterApplicationRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<DeleteIdentityCenterApplicationResponse>,
  errors: [InvalidParameterException, OrganizationStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIdentityCenterApplication",
}));

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
  input: __S(304, __c38, 0) as any as S.Schema<DeleteIdentityProviderConfigurationRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<DeleteIdentityProviderConfigurationResponse>,
  errors: [InvalidParameterException, OrganizationNotFoundException, OrganizationStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIdentityProviderConfiguration",
}));

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
  input: __S(312, __c39, 0) as any as S.Schema<DeleteImpersonationRoleRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<DeleteImpersonationRoleResponse>,
  errors: [InvalidParameterException, OrganizationNotFoundException, OrganizationStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteImpersonationRole",
}));

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
  input: __S(320, __c40, 0) as any as S.Schema<DeleteMailboxPermissionsRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<DeleteMailboxPermissionsResponse>,
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
}));

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
  input: __S(328, __c41, 0) as any as S.Schema<DeleteMobileDeviceAccessOverrideRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<DeleteMobileDeviceAccessOverrideResponse>,
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMobileDeviceAccessOverride",
}));

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
  input: __S(336, __c42, 0) as any as S.Schema<DeleteMobileDeviceAccessRuleRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<DeleteMobileDeviceAccessRuleResponse>,
  errors: [InvalidParameterException, OrganizationNotFoundException, OrganizationStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMobileDeviceAccessRule",
}));

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
  input: __S(344, __c43, 0) as any as S.Schema<DeleteOrganizationRequest>,
  output: __S(345, __c43, 1) as any as S.Schema<DeleteOrganizationResponse>,
  errors: [InvalidParameterException, OrganizationNotFoundException, OrganizationStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOrganization",
}));

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
  input: __S(352, __c44, 0) as any as S.Schema<DeletePersonalAccessTokenRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<DeletePersonalAccessTokenResponse>,
  errors: [InvalidParameterException, OrganizationNotFoundException, OrganizationStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePersonalAccessToken",
}));

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
  input: __S(360, __c45, 0) as any as S.Schema<DeleteResourceRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<DeleteResourceResponse>,
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
}));

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
  input: __S(368, __c46, 0) as any as S.Schema<DeleteRetentionPolicyRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<DeleteRetentionPolicyResponse>,
  errors: [InvalidParameterException, OrganizationNotFoundException, OrganizationStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRetentionPolicy",
}));

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
  input: __S(376, __c47, 0) as any as S.Schema<DeleteUserRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<DeleteUserResponse>,
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
}));

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
  input: __S(384, __c48, 0) as any as S.Schema<DeregisterFromWorkMailRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<DeregisterFromWorkMailResponse>,
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
}));

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
  input: __S(392, __c49, 0) as any as S.Schema<DeregisterMailDomainRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<DeregisterMailDomainResponse>,
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
}));

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
  input: __S(400, __c50, 0) as any as S.Schema<DescribeEmailMonitoringConfigurationRequest>,
  output: __S(401, __c50, 1) as any as S.Schema<DescribeEmailMonitoringConfigurationResponse>,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEmailMonitoringConfiguration",
}));

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
  input: __S(408, __c51, 0) as any as S.Schema<DescribeEntityRequest>,
  output: __S(409, __c51, 1) as any as S.Schema<DescribeEntityResponse>,
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEntity",
}));

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
  input: __S(416, __c52, 0) as any as S.Schema<DescribeGroupRequest>,
  output: __S(417, __c52, 1) as any as S.Schema<DescribeGroupResponse>,
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGroup",
}));

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
  input: __S(424, __c53, 0) as any as S.Schema<DescribeIdentityProviderConfigurationRequest>,
  output: __S(425, __c53, 1) as any as S.Schema<DescribeIdentityProviderConfigurationResponse>,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIdentityProviderConfiguration",
}));

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
  input: __S(440, __c55, 0) as any as S.Schema<DescribeInboundDmarcSettingsRequest>,
  output: __S(441, __c55, 1) as any as S.Schema<DescribeInboundDmarcSettingsResponse>,
  errors: [OrganizationNotFoundException, OrganizationStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInboundDmarcSettings",
}));

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
  input: __S(448, __c56, 0) as any as S.Schema<DescribeMailboxExportJobRequest>,
  output: __S(449, __c56, 1) as any as S.Schema<DescribeMailboxExportJobResponse>,
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMailboxExportJob",
}));

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
  input: __S(456, __c57, 0) as any as S.Schema<DescribeOrganizationRequest>,
  output: __S(457, __c57, 1) as any as S.Schema<DescribeOrganizationResponse>,
  errors: [InvalidParameterException, OrganizationNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrganization",
}));

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
  input: __S(464, __c58, 0) as any as S.Schema<DescribeResourceRequest>,
  output: __S(465, __c58, 1) as any as S.Schema<DescribeResourceResponse>,
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
}));

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
  input: __S(480, __c60, 0) as any as S.Schema<DescribeUserRequest>,
  output: __S(481, __c60, 1) as any as S.Schema<DescribeUserResponse>,
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
}));

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
  input: __S(488, __c61, 0) as any as S.Schema<DisassociateDelegateFromResourceRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<DisassociateDelegateFromResourceResponse>,
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
}));

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
  input: __S(496, __c62, 0) as any as S.Schema<DisassociateMemberFromGroupRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<DisassociateMemberFromGroupResponse>,
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
}));

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
  input: __S(504, __c63, 0) as any as S.Schema<GetAccessControlEffectRequest>,
  output: __S(505, __c63, 1) as any as S.Schema<GetAccessControlEffectResponse>,
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
}));

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
  input: __S(512, __c64, 0) as any as S.Schema<GetDefaultRetentionPolicyRequest>,
  output: __S(513, __c64, 1) as any as S.Schema<GetDefaultRetentionPolicyResponse>,
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDefaultRetentionPolicy",
}));

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
  input: __S(528, __c66, 0) as any as S.Schema<GetImpersonationRoleRequest>,
  output: __S(529, __c66, 1) as any as S.Schema<GetImpersonationRoleResponse>,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImpersonationRole",
}));

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
  input: __S(536, __c67, 0) as any as S.Schema<GetImpersonationRoleEffectRequest>,
  output: __S(539, __c67, 3) as any as S.Schema<GetImpersonationRoleEffectResponse>,
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
}));

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
  input: __S(544, __c68, 0) as any as S.Schema<GetMailboxDetailsRequest>,
  output: __S(545, __c68, 1) as any as S.Schema<GetMailboxDetailsResponse>,
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMailboxDetails",
}));

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
  input: __S(552, __c69, 0) as any as S.Schema<GetMailDomainRequest>,
  output: __S(555, __c69, 3) as any as S.Schema<GetMailDomainResponse>,
  errors: [
    InvalidParameterException,
    MailDomainNotFoundException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMailDomain",
}));

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
  input: __S(560, __c70, 0) as any as S.Schema<GetMobileDeviceAccessEffectRequest>,
  output: __S(563, __c70, 3) as any as S.Schema<GetMobileDeviceAccessEffectResponse>,
  errors: [InvalidParameterException, OrganizationNotFoundException, OrganizationStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMobileDeviceAccessEffect",
}));

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
  input: __S(568, __c71, 0) as any as S.Schema<GetMobileDeviceAccessOverrideRequest>,
  output: __S(576, __c72, 0) as any as S.Schema<GetMobileDeviceAccessOverrideResponse>,
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
}));

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
  input: __S(584, __c73, 0) as any as S.Schema<GetPersonalAccessTokenMetadataRequest>,
  output: __S(592, __c74, 0) as any as S.Schema<GetPersonalAccessTokenMetadataResponse>,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPersonalAccessTokenMetadata",
}));

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
  input: __S(600, __c75, 0) as any as S.Schema<ListAccessControlRulesRequest>,
  output: __S(603, __c75, 3) as any as S.Schema<ListAccessControlRulesResponse>,
  errors: [OrganizationNotFoundException, OrganizationStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessControlRules",
}));

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
  input: __S(608, __c76, 0) as any as S.Schema<ListAliasesRequest>,
  output: __S(609, __c76, 1) as any as S.Schema<ListAliasesResponse>,
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
  input: __S(616, __c77, 0) as any as S.Schema<ListAvailabilityConfigurationsRequest>,
  output: __S(620, __c77, 4) as any as S.Schema<ListAvailabilityConfigurationsResponse>,
  errors: [InvalidParameterException, OrganizationNotFoundException, OrganizationStateException],
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
  input: __S(624, __c78, 0) as any as S.Schema<ListGroupMembersRequest>,
  output: __S(627, __c78, 3) as any as S.Schema<ListGroupMembersResponse>,
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
  input: __S(632, __c79, 0) as any as S.Schema<ListGroupsRequest>,
  output: __S(635, __c79, 3) as any as S.Schema<ListGroupsResponse>,
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
  input: __S(649, __c81, 1) as any as S.Schema<ListGroupsForEntityRequest>,
  output: __S(652, __c81, 4) as any as S.Schema<ListGroupsForEntityResponse>,
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
  input: __S(656, __c82, 0) as any as S.Schema<ListImpersonationRolesRequest>,
  output: __S(659, __c82, 3) as any as S.Schema<ListImpersonationRolesResponse>,
  errors: [InvalidParameterException, OrganizationNotFoundException, OrganizationStateException],
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
  input: __S(664, __c83, 0) as any as S.Schema<ListMailboxExportJobsRequest>,
  output: __S(667, __c83, 3) as any as S.Schema<ListMailboxExportJobsResponse>,
  errors: [InvalidParameterException, OrganizationNotFoundException, OrganizationStateException],
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
  input: __S(672, __c84, 0) as any as S.Schema<ListMailboxPermissionsRequest>,
  output: __S(675, __c84, 3) as any as S.Schema<ListMailboxPermissionsResponse>,
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
  input: __S(688, __c86, 0) as any as S.Schema<ListMailDomainsRequest>,
  output: __S(691, __c86, 3) as any as S.Schema<ListMailDomainsResponse>,
  errors: [InvalidParameterException, OrganizationNotFoundException, OrganizationStateException],
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
  input: __S(696, __c87, 0) as any as S.Schema<ListMobileDeviceAccessOverridesRequest>,
  output: __S(698, __c87, 2) as any as S.Schema<ListMobileDeviceAccessOverridesResponse>,
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
  input: __S(704, __c88, 0) as any as S.Schema<ListMobileDeviceAccessRulesRequest>,
  output: __S(707, __c88, 3) as any as S.Schema<ListMobileDeviceAccessRulesResponse>,
  errors: [InvalidParameterException, OrganizationNotFoundException, OrganizationStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMobileDeviceAccessRules",
}));

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
  input: __S(712, __c89, 0) as any as S.Schema<ListOrganizationsRequest>,
  output: __S(715, __c89, 3) as any as S.Schema<ListOrganizationsResponse>,
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
  input: __S(720, __c90, 0) as any as S.Schema<ListPersonalAccessTokensRequest>,
  output: __S(722, __c90, 2) as any as S.Schema<ListPersonalAccessTokensResponse>,
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
  input: __S(728, __c91, 0) as any as S.Schema<ListResourceDelegatesRequest>,
  output: __S(731, __c91, 3) as any as S.Schema<ListResourceDelegatesResponse>,
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
  input: __S(736, __c92, 0) as any as S.Schema<ListResourcesRequest>,
  output: __S(739, __c92, 3) as any as S.Schema<ListResourcesResponse>,
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
  input: __S(744, __c93, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(745, __c93, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(761, __c95, 1) as any as S.Schema<ListUsersRequest>,
  output: __S(764, __c95, 4) as any as S.Schema<ListUsersResponse>,
  errors: [InvalidParameterException, OrganizationNotFoundException, OrganizationStateException],
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
  input: __S(768, __c96, 0) as any as S.Schema<PutAccessControlRuleRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<PutAccessControlRuleResponse>,
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
}));

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
  input: __S(776, __c97, 0) as any as S.Schema<PutEmailMonitoringConfigurationRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<PutEmailMonitoringConfigurationResponse>,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEmailMonitoringConfiguration",
}));

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
  input: __S(784, __c98, 0) as any as S.Schema<PutIdentityProviderConfigurationRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<PutIdentityProviderConfigurationResponse>,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutIdentityProviderConfiguration",
}));

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
  input: __S(792, __c99, 0) as any as S.Schema<PutInboundDmarcSettingsRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<PutInboundDmarcSettingsResponse>,
  errors: [OrganizationNotFoundException, OrganizationStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutInboundDmarcSettings",
}));

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
  input: __S(800, __c100, 0) as any as S.Schema<PutMailboxPermissionsRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<PutMailboxPermissionsResponse>,
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
}));

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
  input: __S(808, __c101, 0) as any as S.Schema<PutMobileDeviceAccessOverrideRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<PutMobileDeviceAccessOverrideResponse>,
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
}));

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
  input: __S(816, __c102, 0) as any as S.Schema<PutRetentionPolicyRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<PutRetentionPolicyResponse>,
  errors: [
    InvalidParameterException,
    LimitExceededException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRetentionPolicy",
}));

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
  input: __S(824, __c103, 0) as any as S.Schema<RegisterMailDomainRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<RegisterMailDomainResponse>,
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
}));

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
  input: __S(832, __c104, 0) as any as S.Schema<RegisterToWorkMailRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<RegisterToWorkMailResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<ResetPasswordRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<ResetPasswordResponse>,
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
}));

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
  input: __S(8, __c1, 0) as any as S.Schema<StartMailboxExportJobRequest>,
  output: __S(9, __c1, 1) as any as S.Schema<StartMailboxExportJobResponse>,
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
}));

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
  input: __S(16, __c2, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    InvalidParameterException,
    OrganizationStateException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(24, __c3, 0) as any as S.Schema<TestAvailabilityConfigurationRequest>,
  output: __S(25, __c3, 1) as any as S.Schema<TestAvailabilityConfigurationResponse>,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestAvailabilityConfiguration",
}));

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
  input: __S(32, __c4, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(40, __c5, 0) as any as S.Schema<UpdateAvailabilityConfigurationRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<UpdateAvailabilityConfigurationResponse>,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAvailabilityConfiguration",
}));

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
  input: __S(48, __c6, 0) as any as S.Schema<UpdateDefaultMailDomainRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<UpdateDefaultMailDomainResponse>,
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
}));

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
  input: __S(56, __c7, 0) as any as S.Schema<UpdateGroupRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<UpdateGroupResponse>,
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
}));

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
  input: __S(64, __c8, 0) as any as S.Schema<UpdateImpersonationRoleRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<UpdateImpersonationRoleResponse>,
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
}));

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
  input: __S(72, __c9, 0) as any as S.Schema<UpdateMailboxQuotaRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<UpdateMailboxQuotaResponse>,
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
}));

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
  input: __S(80, __c10, 0) as any as S.Schema<UpdateMobileDeviceAccessRuleRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<UpdateMobileDeviceAccessRuleResponse>,
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMobileDeviceAccessRule",
}));

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
  input: __S(88, __c11, 0) as any as S.Schema<UpdatePrimaryEmailAddressRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<UpdatePrimaryEmailAddressResponse>,
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
}));

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
  input: __S(96, __c12, 0) as any as S.Schema<UpdateResourceRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<UpdateResourceResponse>,
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
}));

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
  input: __S(104, __c13, 0) as any as S.Schema<UpdateUserRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<UpdateUserResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, UserId: S.String, Password: SensitiveString }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ResetPasswordRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientToken: S.String.pipe(T.IdempotencyToken()),
          OrganizationId: S.String,
          EntityId: S.String,
          Description: S.optional(S.String),
          RoleArn: S.String,
          KmsKeyArn: S.String,
          S3BucketName: S.String,
          S3Prefix: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartMailboxExportJobRequest" });
    case 1:
      return S.suspend(() => S.Struct({ JobId: S.optional(S.String) })).annotate({
        identifier: "StartMailboxExportJobResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, Tags: __S(753, __c94, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          DomainName: S.optional(S.String),
          EwsProvider: S.optional(__S(168, __c21, 0)),
          LambdaProvider: S.optional(__S(176, __c22, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "TestAvailabilityConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ TestPassed: S.optional(S.Boolean), FailureReason: S.optional(S.String) }),
      ).annotate({ identifier: "TestAvailabilityConfigurationResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, TagKeys: __S(208, __c26, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          DomainName: S.String,
          EwsProvider: S.optional(__S(168, __c21, 0)),
          LambdaProvider: S.optional(__S(176, __c22, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateAvailabilityConfigurationRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, DomainName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateDefaultMailDomainRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          GroupId: S.String,
          HiddenFromGlobalAddressList: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateGroupRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          ImpersonationRoleId: S.String,
          Name: S.String,
          Type: S.String,
          Description: S.optional(S.String),
          Rules: __S(217, __c27, 1),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateImpersonationRoleRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, UserId: S.String, MailboxQuota: S.Number }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateMailboxQuotaRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          MobileDeviceAccessRuleId: S.String,
          Name: S.String,
          Description: S.optional(S.String),
          Effect: S.String,
          DeviceTypes: S.optional(__S(208, __c26, 0)),
          NotDeviceTypes: S.optional(__S(208, __c26, 0)),
          DeviceModels: S.optional(__S(208, __c26, 0)),
          NotDeviceModels: S.optional(__S(208, __c26, 0)),
          DeviceOperatingSystems: S.optional(__S(208, __c26, 0)),
          NotDeviceOperatingSystems: S.optional(__S(208, __c26, 0)),
          DeviceUserAgents: S.optional(__S(208, __c26, 0)),
          NotDeviceUserAgents: S.optional(__S(208, __c26, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateMobileDeviceAccessRuleRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, EntityId: S.String, Email: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdatePrimaryEmailAddressRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          ResourceId: S.String,
          Name: S.optional(S.String),
          BookingOptions: S.optional(__S(472, __c59, 0)),
          Description: S.optional(SensitiveString),
          Type: S.optional(S.String),
          HiddenFromGlobalAddressList: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateResourceRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          UserId: S.String,
          Role: S.optional(S.String),
          DisplayName: S.optional(SensitiveString),
          FirstName: S.optional(SensitiveString),
          LastName: S.optional(SensitiveString),
          HiddenFromGlobalAddressList: S.optional(S.Boolean),
          Initials: S.optional(SensitiveString),
          Telephone: S.optional(SensitiveString),
          Street: S.optional(SensitiveString),
          JobTitle: S.optional(SensitiveString),
          City: S.optional(SensitiveString),
          Company: S.optional(SensitiveString),
          ZipCode: S.optional(SensitiveString),
          Department: S.optional(SensitiveString),
          Country: S.optional(SensitiveString),
          Office: S.optional(SensitiveString),
          IdentityProviderUserId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateUserRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, ResourceId: S.String, EntityId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateDelegateToResourceRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "AssociateDelegateToResourceResponse",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, GroupId: S.String, MemberId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateMemberToGroupRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, ImpersonationRoleId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssumeImpersonationRoleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Token: S.optional(S.String), ExpiresIn: S.optional(S.Number) }),
      ).annotate({ identifier: "AssumeImpersonationRoleResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientToken: S.String.pipe(T.IdempotencyToken()),
          JobId: S.String,
          OrganizationId: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CancelMailboxExportJobRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, EntityId: S.String, Alias: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateAliasRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          OrganizationId: S.String,
          DomainName: S.String,
          EwsProvider: S.optional(__S(168, __c21, 0)),
          LambdaProvider: S.optional(__S(176, __c22, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAvailabilityConfigurationRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EwsEndpoint: S.String, EwsUsername: S.String, EwsPassword: SensitiveString }),
      ).annotate({ identifier: "EwsAvailabilityProvider" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ LambdaArn: S.String })).annotate({
        identifier: "LambdaAvailabilityProvider",
      });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          Name: S.String,
          HiddenFromGlobalAddressList: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateGroupRequest" });
    case 1:
      return S.suspend(() => S.Struct({ GroupId: S.optional(S.String) })).annotate({
        identifier: "CreateGroupResponse",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          InstanceArn: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateIdentityCenterApplicationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ApplicationArn: S.optional(S.String) })).annotate({
        identifier: "CreateIdentityCenterApplicationResponse",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          OrganizationId: S.String,
          Name: S.String,
          Type: S.String,
          Description: S.optional(S.String),
          Rules: __S(217, __c27, 1),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateImpersonationRoleRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ImpersonationRoleId: S.optional(S.String) })).annotate({
        identifier: "CreateImpersonationRoleResponse",
      });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ImpersonationRuleId: S.String,
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Effect: S.String,
          TargetUsers: S.optional(__S(208, __c26, 0)),
          NotTargetUsers: S.optional(__S(208, __c26, 0)),
        }),
      ).annotate({ identifier: "ImpersonationRule" });
    case 1:
      return S.Array(__S(216, __c27, 0));
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Name: S.String,
          Description: S.optional(S.String),
          Effect: S.String,
          DeviceTypes: S.optional(__S(208, __c26, 0)),
          NotDeviceTypes: S.optional(__S(208, __c26, 0)),
          DeviceModels: S.optional(__S(208, __c26, 0)),
          NotDeviceModels: S.optional(__S(208, __c26, 0)),
          DeviceOperatingSystems: S.optional(__S(208, __c26, 0)),
          NotDeviceOperatingSystems: S.optional(__S(208, __c26, 0)),
          DeviceUserAgents: S.optional(__S(208, __c26, 0)),
          NotDeviceUserAgents: S.optional(__S(208, __c26, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateMobileDeviceAccessRuleRequest" });
    case 1:
      return S.suspend(() => S.Struct({ MobileDeviceAccessRuleId: S.optional(S.String) })).annotate(
        { identifier: "CreateMobileDeviceAccessRuleResponse" },
      );
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String, HostedZoneId: S.optional(S.String) }),
      ).annotate({ identifier: "Domain" });
    case 1:
      return S.Array(__S(232, __c29, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          Alias: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Domains: S.optional(__S(233, __c29, 1)),
          KmsKeyArn: S.optional(S.String),
          EnableInteroperability: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateOrganizationRequest" });
    case 3:
      return S.suspend(() => S.Struct({ OrganizationId: S.optional(S.String) })).annotate({
        identifier: "CreateOrganizationResponse",
      });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          Name: S.String,
          Type: S.String,
          Description: S.optional(SensitiveString),
          HiddenFromGlobalAddressList: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ResourceId: S.optional(S.String) })).annotate({
        identifier: "CreateResourceResponse",
      });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          Name: S.String,
          DisplayName: SensitiveString,
          Password: S.optional(SensitiveString),
          Role: S.optional(S.String),
          FirstName: S.optional(SensitiveString),
          LastName: S.optional(SensitiveString),
          HiddenFromGlobalAddressList: S.optional(S.Boolean),
          IdentityProviderUserId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateUserRequest" });
    case 1:
      return S.suspend(() => S.Struct({ UserId: S.optional(S.String) })).annotate({
        identifier: "CreateUserResponse",
      });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, Name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAccessControlRuleRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, EntityId: S.String, Alias: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAliasRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, DomainName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAvailabilityConfigurationRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteEmailMonitoringConfigurationRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, GroupId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteGroupRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteIdentityCenterApplicationRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteIdentityProviderConfigurationRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, ImpersonationRoleId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteImpersonationRoleRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, EntityId: S.String, GranteeId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteMailboxPermissionsRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, UserId: S.String, DeviceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteMobileDeviceAccessOverrideRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, MobileDeviceAccessRuleId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteMobileDeviceAccessRuleRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          OrganizationId: S.String,
          DeleteDirectory: S.Boolean,
          ForceDelete: S.optional(S.Boolean),
          DeleteIdentityCenterApplication: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteOrganizationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.optional(S.String), State: S.optional(S.String) }),
      ).annotate({ identifier: "DeleteOrganizationResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, PersonalAccessTokenId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeletePersonalAccessTokenRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, ResourceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteResourceRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, Id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteRetentionPolicyRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, UserId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteUserRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, EntityId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeregisterFromWorkMailRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, DomainName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeregisterMailDomainRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeEmailMonitoringConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RoleArn: S.optional(S.String), LogGroupArn: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeEmailMonitoringConfigurationResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, Email: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeEntityRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EntityId: S.optional(S.String),
          Name: S.optional(S.String),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeEntityResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, GroupId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GroupId: S.optional(S.String),
          Name: S.optional(S.String),
          Email: S.optional(S.String),
          State: S.optional(S.String),
          EnabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DisabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          HiddenFromGlobalAddressList: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DescribeGroupResponse" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeIdentityProviderConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AuthenticationMode: S.optional(S.String),
          IdentityCenterConfiguration: S.optional(__S(432, __c54, 0)),
          PersonalAccessTokenConfiguration: S.optional(__S(433, __c54, 1)),
        }),
      ).annotate({ identifier: "DescribeIdentityProviderConfigurationResponse" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InstanceArn: S.String, ApplicationArn: S.String }),
      ).annotate({ identifier: "IdentityCenterConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Status: S.String, LifetimeInDays: S.optional(S.Number) }),
      ).annotate({ identifier: "PersonalAccessTokenConfiguration" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeInboundDmarcSettingsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Enforced: S.optional(S.Boolean) })).annotate({
        identifier: "DescribeInboundDmarcSettingsResponse",
      });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String, OrganizationId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeMailboxExportJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EntityId: S.optional(S.String),
          Description: S.optional(S.String),
          RoleArn: S.optional(S.String),
          KmsKeyArn: S.optional(S.String),
          S3BucketName: S.optional(S.String),
          S3Prefix: S.optional(S.String),
          S3Path: S.optional(S.String),
          EstimatedProgress: S.optional(S.Number),
          State: S.optional(S.String),
          ErrorInfo: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DescribeMailboxExportJobResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeOrganizationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.optional(S.String),
          Alias: S.optional(S.String),
          State: S.optional(S.String),
          DirectoryId: S.optional(S.String),
          DirectoryType: S.optional(S.String),
          DefaultMailDomain: S.optional(S.String),
          CompletedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ErrorMessage: S.optional(S.String),
          ARN: S.optional(S.String),
          MigrationAdmin: S.optional(S.String),
          InteroperabilityEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DescribeOrganizationResponse" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, ResourceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceId: S.optional(S.String),
          Email: S.optional(S.String),
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          BookingOptions: S.optional(__S(472, __c59, 0)),
          State: S.optional(S.String),
          EnabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DisabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Description: S.optional(SensitiveString),
          HiddenFromGlobalAddressList: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DescribeResourceResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoAcceptRequests: S.optional(S.Boolean),
          AutoDeclineRecurringRequests: S.optional(S.Boolean),
          AutoDeclineConflictingRequests: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "BookingOptions" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, UserId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeUserRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UserId: S.optional(S.String),
          Name: S.optional(S.String),
          Email: S.optional(S.String),
          DisplayName: S.optional(SensitiveString),
          State: S.optional(S.String),
          UserRole: S.optional(S.String),
          EnabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DisabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          MailboxProvisionedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          MailboxDeprovisionedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FirstName: S.optional(SensitiveString),
          LastName: S.optional(SensitiveString),
          HiddenFromGlobalAddressList: S.optional(S.Boolean),
          Initials: S.optional(SensitiveString),
          Telephone: S.optional(SensitiveString),
          Street: S.optional(SensitiveString),
          JobTitle: S.optional(SensitiveString),
          City: S.optional(SensitiveString),
          Company: S.optional(SensitiveString),
          ZipCode: S.optional(SensitiveString),
          Department: S.optional(SensitiveString),
          Country: S.optional(SensitiveString),
          Office: S.optional(SensitiveString),
          IdentityProviderUserId: S.optional(S.String),
          IdentityProviderIdentityStoreId: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeUserResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, ResourceId: S.String, EntityId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateDelegateFromResourceRequest" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, GroupId: S.String, MemberId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateMemberFromGroupRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          IpAddress: S.String,
          Action: S.String,
          UserId: S.optional(S.String),
          ImpersonationRoleId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetAccessControlEffectRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Effect: S.optional(S.String), MatchedRules: S.optional(__S(208, __c26, 0)) }),
      ).annotate({ identifier: "GetAccessControlEffectResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDefaultRetentionPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          FolderConfigurations: S.optional(__S(521, __c65, 1)),
        }),
      ).annotate({ identifier: "GetDefaultRetentionPolicyResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Action: S.String, Period: S.optional(S.Number) }),
      ).annotate({ identifier: "FolderConfiguration" });
    case 1:
      return S.Array(__S(520, __c65, 0));
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, ImpersonationRoleId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetImpersonationRoleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ImpersonationRoleId: S.optional(S.String),
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          Description: S.optional(S.String),
          Rules: S.optional(__S(217, __c27, 1)),
          DateCreated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DateModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetImpersonationRoleResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          ImpersonationRoleId: S.String,
          TargetUser: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetImpersonationRoleEffectRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ImpersonationRuleId: S.optional(S.String), Name: S.optional(S.String) }),
      ).annotate({ identifier: "ImpersonationMatchedRule" });
    case 2:
      return S.Array(__S(537, __c67, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          Effect: S.optional(S.String),
          MatchedRules: S.optional(__S(538, __c67, 2)),
        }),
      ).annotate({ identifier: "GetImpersonationRoleEffectResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, UserId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetMailboxDetailsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ MailboxQuota: S.optional(S.Number), MailboxSize: S.optional(S.Number) }),
      ).annotate({ identifier: "GetMailboxDetailsResponse" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, DomainName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetMailDomainRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          Hostname: S.optional(S.String),
          Value: S.optional(S.String),
        }),
      ).annotate({ identifier: "DnsRecord" });
    case 2:
      return S.Array(__S(553, __c69, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Records: S.optional(__S(554, __c69, 2)),
          IsTestDomain: S.optional(S.Boolean),
          IsDefault: S.optional(S.Boolean),
          OwnershipVerificationStatus: S.optional(S.String),
          DkimVerificationStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetMailDomainResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          DeviceType: S.optional(S.String),
          DeviceModel: S.optional(S.String),
          DeviceOperatingSystem: S.optional(S.String),
          DeviceUserAgent: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetMobileDeviceAccessEffectRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ MobileDeviceAccessRuleId: S.optional(S.String), Name: S.optional(S.String) }),
      ).annotate({ identifier: "MobileDeviceAccessMatchedRule" });
    case 2:
      return S.Array(__S(561, __c70, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Effect: S.optional(S.String), MatchedRules: S.optional(__S(562, __c70, 2)) }),
      ).annotate({ identifier: "GetMobileDeviceAccessEffectResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, UserId: S.String, DeviceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetMobileDeviceAccessOverrideRequest" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserId: S.optional(S.String),
          DeviceId: S.optional(S.String),
          Effect: S.optional(S.String),
          Description: S.optional(S.String),
          DateCreated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DateModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetMobileDeviceAccessOverrideResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, PersonalAccessTokenId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetPersonalAccessTokenMetadataRequest" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PersonalAccessTokenId: S.optional(S.String),
          UserId: S.optional(S.String),
          Name: S.optional(S.String),
          DateCreated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DateLastUsed: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ExpiresTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Scopes: S.optional(__S(208, __c26, 0)),
        }),
      ).annotate({ identifier: "GetPersonalAccessTokenMetadataResponse" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAccessControlRulesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Effect: S.optional(S.String),
          Description: S.optional(S.String),
          IpRanges: S.optional(__S(208, __c26, 0)),
          NotIpRanges: S.optional(__S(208, __c26, 0)),
          Actions: S.optional(__S(208, __c26, 0)),
          NotActions: S.optional(__S(208, __c26, 0)),
          UserIds: S.optional(__S(208, __c26, 0)),
          NotUserIds: S.optional(__S(208, __c26, 0)),
          DateCreated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DateModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ImpersonationRoleIds: S.optional(__S(208, __c26, 0)),
          NotImpersonationRoleIds: S.optional(__S(208, __c26, 0)),
        }),
      ).annotate({ identifier: "AccessControlRule" });
    case 2:
      return S.Array(__S(601, __c75, 1));
    case 3:
      return S.suspend(() => S.Struct({ Rules: S.optional(__S(602, __c75, 2)) })).annotate({
        identifier: "ListAccessControlRulesResponse",
      });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          EntityId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAliasesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Aliases: S.optional(__S(208, __c26, 0)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAliasesResponse" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAvailabilityConfigurationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EwsEndpoint: S.optional(S.String), EwsUsername: S.optional(S.String) }),
      ).annotate({ identifier: "RedactedEwsAvailabilityProvider" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.optional(S.String),
          ProviderType: S.optional(S.String),
          EwsProvider: S.optional(__S(617, __c77, 1)),
          LambdaProvider: S.optional(__S(176, __c22, 0)),
          DateCreated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DateModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "AvailabilityConfiguration" });
    case 3:
      return S.Array(__S(618, __c77, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          AvailabilityConfigurations: S.optional(__S(619, __c77, 3)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAvailabilityConfigurationsResponse" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          GroupId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListGroupMembersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          State: S.optional(S.String),
          EnabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DisabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Member" });
    case 2:
      return S.Array(__S(625, __c78, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Members: S.optional(__S(626, __c78, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListGroupMembersResponse" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Filters: S.optional(__S(640, __c80, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Email: S.optional(S.String),
          Name: S.optional(S.String),
          State: S.optional(S.String),
          EnabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DisabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Group" });
    case 2:
      return S.Array(__S(633, __c79, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Groups: S.optional(__S(634, __c79, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListGroupsResponse" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NamePrefix: S.optional(S.String),
          PrimaryEmailPrefix: S.optional(S.String),
          State: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListGroupsFilters" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ GroupNamePrefix: S.optional(S.String) })).annotate({
        identifier: "ListGroupsForEntityFilters",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          EntityId: S.String,
          Filters: S.optional(__S(648, __c81, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListGroupsForEntityRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ GroupId: S.optional(S.String), GroupName: S.optional(S.String) }),
      ).annotate({ identifier: "GroupIdentifier" });
    case 3:
      return S.Array(__S(650, __c81, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ Groups: S.optional(__S(651, __c81, 3)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListGroupsForEntityResponse" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListImpersonationRolesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ImpersonationRoleId: S.optional(S.String),
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          DateCreated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DateModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ImpersonationRole" });
    case 2:
      return S.Array(__S(657, __c82, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Roles: S.optional(__S(658, __c82, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListImpersonationRolesResponse" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListMailboxExportJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          JobId: S.optional(S.String),
          EntityId: S.optional(S.String),
          Description: S.optional(S.String),
          S3BucketName: S.optional(S.String),
          S3Path: S.optional(S.String),
          EstimatedProgress: S.optional(S.Number),
          State: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "MailboxExportJob" });
    case 2:
      return S.Array(__S(665, __c83, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Jobs: S.optional(__S(666, __c83, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListMailboxExportJobsResponse" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          EntityId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListMailboxPermissionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GranteeId: S.String,
          GranteeType: S.String,
          PermissionValues: __S(680, __c85, 0),
        }),
      ).annotate({ identifier: "Permission" });
    case 2:
      return S.Array(__S(673, __c84, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Permissions: S.optional(__S(674, __c84, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListMailboxPermissionsResponse" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListMailDomainsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DomainName: S.optional(S.String), DefaultDomain: S.optional(S.Boolean) }),
      ).annotate({ identifier: "MailDomainSummary" });
    case 2:
      return S.Array(__S(689, __c86, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ MailDomains: S.optional(__S(690, __c86, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListMailDomainsResponse" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          UserId: S.optional(S.String),
          DeviceId: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListMobileDeviceAccessOverridesRequest" });
    case 1:
      return S.Array(__S(576, __c72, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Overrides: S.optional(__S(697, __c87, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListMobileDeviceAccessOverridesResponse" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListMobileDeviceAccessRulesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MobileDeviceAccessRuleId: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Effect: S.optional(S.String),
          DeviceTypes: S.optional(__S(208, __c26, 0)),
          NotDeviceTypes: S.optional(__S(208, __c26, 0)),
          DeviceModels: S.optional(__S(208, __c26, 0)),
          NotDeviceModels: S.optional(__S(208, __c26, 0)),
          DeviceOperatingSystems: S.optional(__S(208, __c26, 0)),
          NotDeviceOperatingSystems: S.optional(__S(208, __c26, 0)),
          DeviceUserAgents: S.optional(__S(208, __c26, 0)),
          NotDeviceUserAgents: S.optional(__S(208, __c26, 0)),
          DateCreated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DateModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "MobileDeviceAccessRule" });
    case 2:
      return S.Array(__S(705, __c88, 1));
    case 3:
      return S.suspend(() => S.Struct({ Rules: S.optional(__S(706, __c88, 2)) })).annotate({
        identifier: "ListMobileDeviceAccessRulesResponse",
      });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListOrganizationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.optional(S.String),
          Alias: S.optional(S.String),
          DefaultMailDomain: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          State: S.optional(S.String),
        }),
      ).annotate({ identifier: "OrganizationSummary" });
    case 2:
      return S.Array(__S(713, __c89, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          OrganizationSummaries: S.optional(__S(714, __c89, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListOrganizationsResponse" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          UserId: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPersonalAccessTokensRequest" });
    case 1:
      return S.Array(__S(592, __c74, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          PersonalAccessTokenSummaries: S.optional(__S(721, __c90, 1)),
        }),
      ).annotate({ identifier: "ListPersonalAccessTokensResponse" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          ResourceId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListResourceDelegatesRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Id: S.String, Type: S.String })).annotate({
        identifier: "Delegate",
      });
    case 2:
      return S.Array(__S(729, __c91, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Delegates: S.optional(__S(730, __c91, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListResourceDelegatesResponse" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Filters: S.optional(__S(640, __c80, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListResourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Email: S.optional(S.String),
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          State: S.optional(S.String),
          EnabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DisabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Description: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "Resource" });
    case 2:
      return S.Array(__S(737, __c92, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Resources: S.optional(__S(738, __c92, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListResourcesResponse" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(753, __c94, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(752, __c94, 0));
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UsernamePrefix: S.optional(S.String),
          DisplayNamePrefix: S.optional(SensitiveString),
          PrimaryEmailPrefix: S.optional(S.String),
          State: S.optional(S.String),
          IdentityProviderUserIdPrefix: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListUsersFilters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Filters: S.optional(__S(760, __c95, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListUsersRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Email: S.optional(S.String),
          Name: S.optional(S.String),
          DisplayName: S.optional(S.String),
          State: S.optional(S.String),
          UserRole: S.optional(S.String),
          EnabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DisabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          IdentityProviderUserId: S.optional(S.String),
          IdentityProviderIdentityStoreId: S.optional(S.String),
        }),
      ).annotate({ identifier: "User" });
    case 3:
      return S.Array(__S(762, __c95, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ Users: S.optional(__S(763, __c95, 3)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListUsersResponse" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Effect: S.String,
          Description: S.String,
          IpRanges: S.optional(__S(208, __c26, 0)),
          NotIpRanges: S.optional(__S(208, __c26, 0)),
          Actions: S.optional(__S(208, __c26, 0)),
          NotActions: S.optional(__S(208, __c26, 0)),
          UserIds: S.optional(__S(208, __c26, 0)),
          NotUserIds: S.optional(__S(208, __c26, 0)),
          OrganizationId: S.String,
          ImpersonationRoleIds: S.optional(__S(208, __c26, 0)),
          NotImpersonationRoleIds: S.optional(__S(208, __c26, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutAccessControlRuleRequest" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          RoleArn: S.optional(S.String),
          LogGroupArn: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutEmailMonitoringConfigurationRequest" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          AuthenticationMode: S.String,
          IdentityCenterConfiguration: __S(432, __c54, 0),
          PersonalAccessTokenConfiguration: __S(433, __c54, 1),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutIdentityProviderConfigurationRequest" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, Enforced: S.Boolean }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutInboundDmarcSettingsRequest" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          EntityId: S.String,
          GranteeId: S.String,
          PermissionValues: __S(680, __c85, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutMailboxPermissionsRequest" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          UserId: S.String,
          DeviceId: S.String,
          Effect: S.String,
          Description: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutMobileDeviceAccessOverrideRequest" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String,
          Id: S.optional(S.String),
          Name: S.String,
          Description: S.optional(SensitiveString),
          FolderConfigurations: __S(521, __c65, 1),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutRetentionPolicyRequest" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          OrganizationId: S.String,
          DomainName: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RegisterMailDomainRequest" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationId: S.String, EntityId: S.String, Email: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RegisterToWorkMailRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
