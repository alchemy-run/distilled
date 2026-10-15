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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "Wickr", serviceShapeName: "WickrAdminApi" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "wickr" });
const ver = /*@__PURE__*/ T.ServiceVersion("2024-02-01");
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
              `https://admin.wickr-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://admin.wickr-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://admin.wickr.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://admin.wickr.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://admin.wickr.{R}.{D}","properties":{},"headers":{}}');

export class BadRequestError
  extends /*@__PURE__*/ S.TaggedError<BadRequestError>()(
    "BadRequestError",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ForbiddenError
  extends /*@__PURE__*/ S.TaggedError<ForbiddenError>()(
    "ForbiddenError",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerError
  extends /*@__PURE__*/ S.TaggedError<InternalServerError>()(
    "InternalServerError",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class RateLimitError
  extends /*@__PURE__*/ S.TaggedError<RateLimitError>()(
    "RateLimitError",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ResourceNotFoundError
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundError>()(
    "ResourceNotFoundError",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class UnauthorizedError
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedError>()(
    "UnauthorizedError",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class ValidationError
  extends /*@__PURE__*/ S.TaggedError<ValidationError>()(
    "ValidationError",
    {
      reasons: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(785, __c49, 1)).annotate({
          identifier: "ErrorDetailList",
        }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(422),
  ).pipe(C.withBadRequestError) {}
export type NetworkId = string;
export type SensitiveString = string | redacted.Redacted<string>;
export type SecurityGroupId = string;
export type SecurityGroupIdList = string[];
export interface BatchCreateUserRequestItem {
  firstName?: string | redacted.Redacted<string>;
  lastName?: string | redacted.Redacted<string>;
  securityGroupIds: string[];
  username: string;
  inviteCode?: string;
  inviteCodeTtl?: number;
  codeValidation?: boolean;
}
export type BatchCreateUserRequestItems = BatchCreateUserRequestItem[];
export type ClientToken = string;
export interface BatchCreateUserRequest {
  networkId: string;
  users: BatchCreateUserRequestItem[];
  clientToken?: string;
}
export type UserId = string;
export interface User {
  userId?: string;
  firstName?: string | redacted.Redacted<string>;
  lastName?: string | redacted.Redacted<string>;
  username?: string;
  securityGroups?: string[];
  isAdmin?: boolean;
  suspended?: boolean;
  status?: number;
  otpEnabled?: boolean;
  scimId?: string;
  type?: string;
  cell?: string;
  countryCode?: string;
  challengeFailures?: number;
  isInviteExpired?: boolean;
  isUser?: boolean;
  inviteCode?: string;
  codeValidation?: boolean;
  uname?: string;
}
export type Users = User[];
export interface BatchUserErrorResponseItem {
  field?: string;
  reason?: string;
  userId: string;
}
export type BatchUserErrorResponseItems = BatchUserErrorResponseItem[];
export interface BatchCreateUserResponse {
  message?: string;
  successful?: User[];
  failed?: BatchUserErrorResponseItem[];
}
export type UserIds = string[];
export interface BatchDeleteUserRequest {
  networkId: string;
  userIds: string[];
  clientToken?: string;
}
export interface BatchUserSuccessResponseItem {
  userId: string;
}
export type BatchUserSuccessResponseItems = BatchUserSuccessResponseItem[];
export interface BatchDeleteUserResponse {
  message?: string;
  successful?: BatchUserSuccessResponseItem[];
  failed?: BatchUserErrorResponseItem[];
}
export type Unames = string[];
export interface BatchLookupUserUnameRequest {
  networkId: string;
  unames: string[];
  clientToken?: string;
}
export type Uname = string;
export interface BatchUnameSuccessResponseItem {
  uname: string;
  username: string;
}
export type BatchUnameSuccessResponseItems = BatchUnameSuccessResponseItem[];
export interface BatchUnameErrorResponseItem {
  field?: string;
  reason?: string;
  uname: string;
}
export type BatchUnameErrorResponseItems = BatchUnameErrorResponseItem[];
export interface BatchLookupUserUnameResponse {
  message?: string;
  successful?: BatchUnameSuccessResponseItem[];
  failed?: BatchUnameErrorResponseItem[];
}
export interface BatchReinviteUserRequest {
  networkId: string;
  userIds: string[];
  clientToken?: string;
}
export interface BatchReinviteUserResponse {
  message?: string;
  successful?: BatchUserSuccessResponseItem[];
  failed?: BatchUserErrorResponseItem[];
}
export type AppIds = string[];
export interface BatchResetDevicesForUserRequest {
  networkId: string;
  userId: string;
  appIds: string[];
  clientToken?: string;
}
export interface BatchDeviceSuccessResponseItem {
  appId: string;
}
export type BatchDeviceSuccessResponseItems = BatchDeviceSuccessResponseItem[];
export interface BatchDeviceErrorResponseItem {
  field?: string;
  reason?: string;
  appId: string;
}
export type BatchDeviceErrorResponseItems = BatchDeviceErrorResponseItem[];
export interface BatchResetDevicesForUserResponse {
  message?: string;
  successful?: BatchDeviceSuccessResponseItem[];
  failed?: BatchDeviceErrorResponseItem[];
}
export interface BatchToggleUserSuspendStatusRequest {
  networkId: string;
  suspend: boolean;
  userIds: string[];
  clientToken?: string;
}
export interface BatchToggleUserSuspendStatusResponse {
  message?: string;
  successful?: BatchUserSuccessResponseItem[];
  failed?: BatchUserErrorResponseItem[];
}
export interface CreateBotRequest {
  networkId: string;
  username: string;
  displayName?: string;
  groupId: string;
  challenge: string | redacted.Redacted<string>;
}
export type BotId = string;
export interface CreateBotResponse {
  message?: string;
  botId: string;
  networkId?: string;
  username?: string;
  displayName?: string;
  groupId?: string;
}
export interface CreateDataRetentionBotRequest {
  networkId: string;
}
export interface CreateDataRetentionBotResponse {
  message?: string;
}
export interface CreateDataRetentionBotChallengeRequest {
  networkId: string;
}
export interface CreateDataRetentionBotChallengeResponse {
  challenge: string | redacted.Redacted<string>;
}
export type AccessLevel = "STANDARD" | "PREMIUM" | (string & {});
export interface CreateNetworkRequest {
  networkName: string;
  accessLevel: AccessLevel;
  enablePremiumFreeTrial?: boolean;
  encryptionKeyArn?: string;
}
export interface CreateNetworkResponse {
  networkId?: string;
  networkName?: string;
  encryptionKeyArn?: string;
}
export type PermittedNetworksList = string[];
export interface WickrAwsNetworks {
  region: string;
  networkId: string;
}
export type WickrAwsNetworksList = WickrAwsNetworks[];
export interface PermittedWickrEnterpriseNetwork {
  domain: string;
  networkId: string;
}
export type PermittedWickrEnterpriseNetworksList = PermittedWickrEnterpriseNetwork[];
export interface SecurityGroupSettingsRequest {
  lockoutThreshold?: number;
  permittedNetworks?: string[];
  enableGuestFederation?: boolean;
  globalFederation?: boolean;
  federationMode?: number;
  enableRestrictedGlobalFederation?: boolean;
  permittedWickrAwsNetworks?: WickrAwsNetworks[];
  permittedWickrEnterpriseNetworks?: PermittedWickrEnterpriseNetwork[];
}
export interface CreateSecurityGroupRequest {
  networkId: string;
  name: string;
  securityGroupSettings: SecurityGroupSettingsRequest;
  clientToken?: string;
}
export type SecurityGroupStringList = string[];
export interface CallingSettings {
  canStart11Call?: boolean;
  canVideoCall?: boolean;
  forceTcpCall?: boolean;
}
export interface PasswordRequirements {
  lowercase?: number;
  minLength?: number;
  numbers?: number;
  symbols?: number;
  uppercase?: number;
}
export interface ShredderSettings {
  canProcessManually?: boolean;
  intensity?: number;
}
export interface SecurityGroupSettings {
  alwaysReauthenticate?: boolean;
  atakPackageValues?: string[];
  calling?: CallingSettings;
  checkForUpdates?: boolean;
  enableAtak?: boolean;
  enableCrashReports?: boolean;
  enableFileDownload?: boolean;
  enableGuestFederation?: boolean;
  enableNotificationPreview?: boolean;
  enableOpenAccessOption?: boolean;
  enableRestrictedGlobalFederation?: boolean;
  filesEnabled?: boolean;
  forceDeviceLockout?: number;
  forceOpenAccess?: boolean;
  forceReadReceipts?: boolean;
  globalFederation?: boolean;
  isAtoEnabled?: boolean;
  isLinkPreviewEnabled?: boolean;
  locationAllowMaps?: boolean;
  locationEnabled?: boolean;
  maxAutoDownloadSize?: number;
  maxBor?: number;
  maxTtl?: number;
  messageForwardingEnabled?: boolean;
  passwordRequirements?: PasswordRequirements;
  presenceEnabled?: boolean;
  quickResponses?: string[];
  showMasterRecoveryKey?: boolean;
  shredder?: ShredderSettings;
  ssoMaxIdleMinutes?: number;
  maxNonSsoSessionMinutes?: number;
  federationMode?: number;
  lockoutThreshold?: number;
  permittedNetworks?: string[];
  permittedWickrAwsNetworks?: WickrAwsNetworks[];
  permittedWickrEnterpriseNetworks?: PermittedWickrEnterpriseNetwork[];
}
export interface SecurityGroup {
  activeMembers: number;
  botMembers: number;
  activeDirectoryGuid?: string;
  id: string;
  isDefault: boolean;
  name: string;
  modified: number;
  securityGroupSettings: SecurityGroupSettings;
}
export interface CreateSecurityGroupResponse {
  securityGroup: SecurityGroup;
}
export interface DeleteBotRequest {
  networkId: string;
  botId: string;
}
export interface DeleteBotResponse {
  message?: string;
}
export interface DeleteDataRetentionBotRequest {
  networkId: string;
}
export interface DeleteDataRetentionBotResponse {
  message?: string;
}
export interface DeleteNetworkRequest {
  networkId: string;
  clientToken?: string;
}
export interface DeleteNetworkResponse {
  message?: string;
}
export interface DeleteSecurityGroupRequest {
  networkId: string;
  groupId: string;
}
export interface DeleteSecurityGroupResponse {
  message?: string;
  networkId?: string;
  groupId?: string;
}
export interface GetBotRequest {
  networkId: string;
  botId: string;
}
export type BotStatus = 1 | 2 | (number & {});
export interface GetBotResponse {
  botId?: string;
  displayName?: string;
  username?: string;
  uname?: string;
  pubkey?: string;
  status?: BotStatus;
  groupId?: string;
  hasChallenge?: boolean;
  suspended?: boolean;
  lastLogin?: string;
}
export interface GetBotsCountRequest {
  networkId: string;
}
export interface GetBotsCountResponse {
  pending: number;
  active: number;
  total: number;
}
export interface GetDataRetentionBotRequest {
  networkId: string;
}
export interface GetDataRetentionBotResponse {
  botName?: string;
  botExists?: boolean;
  isBotActive?: boolean;
  isDataRetentionBotRegistered?: boolean;
  isDataRetentionServiceEnabled?: boolean;
  isPubkeyMsgAcked?: boolean;
}
export interface GetGuestUserHistoryCountRequest {
  networkId: string;
}
export interface GuestUserHistoryCount {
  month: string;
  count: string;
}
export type GuestUserHistoryCountList = GuestUserHistoryCount[];
export interface GetGuestUserHistoryCountResponse {
  history: GuestUserHistoryCount[];
}
export interface GetNetworkRequest {
  networkId: string;
}
export interface GetNetworkResponse {
  networkId: string;
  networkName: string;
  accessLevel: AccessLevel;
  awsAccountId: string;
  networkArn: string;
  standing?: number;
  freeTrialExpiration?: string;
  migrationState?: number;
  encryptionKeyArn?: string;
}
export interface GetNetworkSettingsRequest {
  networkId: string;
}
export interface Setting {
  optionName: string;
  value: string;
  type: string;
}
export type SettingsList = Setting[];
export interface GetNetworkSettingsResponse {
  settings: Setting[];
}
export interface GetOidcInfoRequest {
  networkId: string;
  clientId?: string;
  code?: string;
  grantType?: string;
  redirectUri?: string;
  url?: string;
  clientSecret?: string | redacted.Redacted<string>;
  codeVerifier?: string;
  certificate?: string;
}
export interface OidcConfigInfo {
  applicationName?: string;
  clientId?: string;
  companyId: string;
  scopes: string;
  issuer: string;
  clientSecret?: string | redacted.Redacted<string>;
  secret?: string | redacted.Redacted<string>;
  redirectUrl?: string;
  userId?: string;
  customUsername?: string;
  caCertificate?: string;
  applicationId?: number;
  ssoTokenBufferMinutes?: number;
  extraAuthParams?: string;
}
export interface OidcTokenInfo {
  codeVerifier?: string;
  codeChallenge?: string;
  accessToken?: string;
  idToken?: string;
  refreshToken?: string;
  tokenType?: string;
  expiresIn?: number;
}
export interface GetOidcInfoResponse {
  openidConnectInfo?: OidcConfigInfo;
  tokenInfo?: OidcTokenInfo;
}
export interface GetOpentdfConfigRequest {
  networkId: string;
}
export interface GetOpentdfConfigResponse {
  clientId: string;
  domain: string;
  clientSecret: string | redacted.Redacted<string>;
  provider: string;
}
export interface GetSecurityGroupRequest {
  networkId: string;
  groupId: string;
}
export interface GetSecurityGroupResponse {
  securityGroup: SecurityGroup;
}
export interface GetUserRequest {
  networkId: string;
  userId: string;
  startTime?: Date;
  endTime?: Date;
}
export interface GetUserResponse {
  userId: string;
  firstName?: string | redacted.Redacted<string>;
  lastName?: string | redacted.Redacted<string>;
  username?: string;
  isAdmin?: boolean;
  suspended?: boolean;
  status?: number;
  lastActivity?: number;
  lastLogin?: number;
  securityGroupIds?: string[];
}
export interface GetUsersCountRequest {
  networkId: string;
}
export interface GetUsersCountResponse {
  pending: number;
  active: number;
  rejected: number;
  remaining: number;
  total: number;
}
export type SortDirection = "ASC" | "DESC" | (string & {});
export interface ListBlockedGuestUsersRequest {
  networkId: string;
  maxResults?: number;
  sortDirection?: SortDirection;
  sortFields?: string;
  username?: string;
  admin?: string;
  nextToken?: string;
}
export interface BlockedGuestUser {
  username: string;
  admin: string;
  modified: string;
  usernameHash: string;
}
export type BlockedGuestUserList = BlockedGuestUser[];
export interface ListBlockedGuestUsersResponse {
  nextToken?: string;
  blocklist: BlockedGuestUser[];
}
export interface ListBotsRequest {
  networkId: string;
  nextToken?: string;
  maxResults?: number;
  sortFields?: string;
  sortDirection?: SortDirection;
  displayName?: string;
  username?: string;
  status?: BotStatus;
  groupId?: string;
}
export interface Bot {
  botId?: string;
  displayName?: string;
  username?: string;
  uname?: string;
  pubkey?: string;
  status?: BotStatus;
  groupId?: string;
  hasChallenge?: boolean;
  suspended?: boolean;
  lastLogin?: string;
}
export type Bots = Bot[];
export interface ListBotsResponse {
  bots: Bot[];
  nextToken?: string;
}
export interface ListDevicesForUserRequest {
  networkId: string;
  userId: string;
  nextToken?: string;
  maxResults?: number;
  sortFields?: string;
  sortDirection?: SortDirection;
}
export interface BasicDeviceObject {
  appId?: string;
  created?: string;
  lastLogin?: string;
  statusText?: string;
  suspend?: boolean;
  type?: string;
}
export type Devices = BasicDeviceObject[];
export interface ListDevicesForUserResponse {
  nextToken?: string;
  devices: BasicDeviceObject[];
}
export interface ListGuestUsersRequest {
  networkId: string;
  maxResults?: number;
  sortDirection?: SortDirection;
  sortFields?: string;
  username?: string;
  billingPeriod?: string;
  nextToken?: string;
}
export interface GuestUser {
  billingPeriod: string;
  username: string;
  usernameHash: string;
}
export type GuestUserList = GuestUser[];
export interface ListGuestUsersResponse {
  nextToken?: string;
  guestlist: GuestUser[];
}
export interface ListNetworksRequest {
  maxResults?: number;
  sortFields?: string;
  sortDirection?: SortDirection;
  nextToken?: string;
}
export interface Network {
  networkId: string;
  networkName: string;
  accessLevel: AccessLevel;
  awsAccountId: string;
  networkArn: string;
  standing?: number;
  freeTrialExpiration?: string;
  migrationState?: number;
  encryptionKeyArn?: string;
}
export type NetworkList = Network[];
export interface ListNetworksResponse {
  networks: Network[];
  nextToken?: string;
}
export interface ListSecurityGroupsRequest {
  networkId: string;
  nextToken?: string;
  maxResults?: number;
  sortFields?: string;
  sortDirection?: SortDirection;
}
export type SecurityGroupList = SecurityGroup[];
export interface ListSecurityGroupsResponse {
  securityGroups?: SecurityGroup[];
  nextToken?: string;
}
export interface ListSecurityGroupUsersRequest {
  networkId: string;
  groupId: string;
  nextToken?: string;
  maxResults?: number;
  sortFields?: string;
  sortDirection?: SortDirection;
}
export interface ListSecurityGroupUsersResponse {
  users: User[];
  nextToken?: string;
}
export type UserStatus = 1 | 2 | (number & {});
export interface ListUsersRequest {
  networkId: string;
  nextToken?: string;
  maxResults?: number;
  sortFields?: string;
  sortDirection?: SortDirection;
  firstName?: string | redacted.Redacted<string>;
  lastName?: string | redacted.Redacted<string>;
  username?: string;
  status?: UserStatus;
  groupId?: string;
}
export interface ListUsersResponse {
  nextToken?: string;
  users?: User[];
}
export interface RegisterOidcConfigRequest {
  networkId: string;
  companyId: string;
  customUsername?: string;
  extraAuthParams?: string;
  issuer: string;
  scopes: string;
  secret?: string | redacted.Redacted<string>;
  ssoTokenBufferMinutes?: number;
  userId?: string;
}
export interface RegisterOidcConfigResponse {
  applicationName?: string;
  clientId?: string;
  companyId: string;
  scopes: string;
  issuer: string;
  clientSecret?: string | redacted.Redacted<string>;
  secret?: string | redacted.Redacted<string>;
  redirectUrl?: string;
  userId?: string;
  customUsername?: string;
  caCertificate?: string;
  applicationId?: number;
  ssoTokenBufferMinutes?: number;
  extraAuthParams?: string;
}
export interface RegisterOidcConfigTestRequest {
  networkId: string;
  extraAuthParams?: string;
  issuer: string;
  scopes: string;
  certificate?: string;
}
export type StringList = string[];
export interface RegisterOidcConfigTestResponse {
  tokenEndpoint?: string;
  userinfoEndpoint?: string;
  responseTypesSupported?: string[];
  scopesSupported?: string[];
  issuer?: string;
  authorizationEndpoint?: string;
  endSessionEndpoint?: string;
  logoutEndpoint?: string;
  grantTypesSupported?: string[];
  revocationEndpoint?: string;
  tokenEndpointAuthMethodsSupported?: string[];
  microsoftMultiRefreshToken?: boolean;
}
export interface RegisterOpentdfConfigRequest {
  networkId: string;
  clientId: string;
  clientSecret: string | redacted.Redacted<string>;
  domain: string;
  provider: string;
  dryRun?: boolean;
}
export interface RegisterOpentdfConfigResponse {
  clientId: string;
  domain: string;
  clientSecret: string | redacted.Redacted<string>;
  provider: string;
}
export interface UpdateBotRequest {
  networkId: string;
  botId: string;
  displayName?: string;
  groupId?: string;
  challenge?: string | redacted.Redacted<string>;
  suspend?: boolean;
}
export interface UpdateBotResponse {
  message?: string;
}
export type DataRetentionActionType = "ENABLE" | "DISABLE" | "PUBKEY_MSG_ACK" | (string & {});
export interface UpdateDataRetentionRequest {
  networkId: string;
  actionType: DataRetentionActionType;
}
export interface UpdateDataRetentionResponse {
  message?: string;
}
export interface UpdateGuestUserRequest {
  networkId: string;
  usernameHash: string;
  block: boolean;
}
export interface UpdateGuestUserResponse {
  message?: string;
}
export interface UpdateNetworkRequest {
  networkId: string;
  networkName: string;
  clientToken?: string;
  encryptionKeyArn?: string;
}
export interface UpdateNetworkResponse {
  message?: string;
}
export type Status = "DISABLED" | "ENABLED" | "FORCE_ENABLED" | (string & {});
export interface ReadReceiptConfig {
  status?: Status;
}
export interface ConsentPopupConfig {
  enabled: boolean;
  header?: string;
  content?: string;
  closeButtonLabel?: string;
}
export interface NetworkSettings {
  enableClientMetrics?: boolean;
  readReceiptConfig?: ReadReceiptConfig;
  dataRetention?: boolean;
  enableTrustedDataFormat?: boolean;
  consentPopup?: ConsentPopupConfig;
}
export interface UpdateNetworkSettingsRequest {
  networkId: string;
  settings: NetworkSettings;
}
export interface UpdateNetworkSettingsResponse {
  settings: Setting[];
}
export interface UpdateSecurityGroupRequest {
  networkId: string;
  groupId: string;
  name?: string;
  securityGroupSettings?: SecurityGroupSettings;
}
export interface UpdateSecurityGroupResponse {
  securityGroup: SecurityGroup;
}
export interface UpdateUserDetails {
  firstName?: string | redacted.Redacted<string>;
  lastName?: string | redacted.Redacted<string>;
  username?: string;
  securityGroupIds?: string[];
  inviteCode?: string;
  inviteCodeTtl?: number;
  codeValidation?: boolean;
}
export interface UpdateUserRequest {
  networkId: string;
  userId: string;
  userDetails?: UpdateUserDetails;
}
export interface UpdateUserResponse {
  userId: string;
  networkId: string;
  securityGroupIds?: string[];
  firstName?: string | redacted.Redacted<string>;
  lastName?: string | redacted.Redacted<string>;
  middleName?: string;
  suspended: boolean;
  modified?: number;
  status?: number;
  inviteCode?: string;
  inviteExpiration?: number;
  codeValidation?: boolean;
}
export interface ErrorDetail {
  field?: string;
  reason?: string;
}
export type ErrorDetailList = ErrorDetail[];
export type BatchCreateUserError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Creates multiple users in a specified Wickr network. This operation allows you to provision multiple user accounts simultaneously, optionally specifying security groups, and validation requirements for each user.
 *
 * `codeValidation`, `inviteCode`, and `inviteCodeTtl` are restricted to networks under preview only.
 */
export const batchCreateUser: API.OperationMethod<
  BatchCreateUserRequest,
  BatchCreateUserResponse,
  BatchCreateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(802, __c50, 2) as any as S.Schema<BatchCreateUserRequest>,
  output: __S(803, __c50, 3) as any as S.Schema<BatchCreateUserResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateUser",
}));

export type BatchDeleteUserError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Deletes multiple users from a specified Wickr network. This operation permanently removes user accounts and their associated data from the network.
 */
export const batchDeleteUser: API.OperationMethod<
  BatchDeleteUserRequest,
  BatchDeleteUserResponse,
  BatchDeleteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c54, 0) as any as S.Schema<BatchDeleteUserRequest>,
  output: __S(882, __c55, 2) as any as S.Schema<BatchDeleteUserResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteUser",
}));

export type BatchLookupUserUnameError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Looks up multiple user usernames from their unique username hashes (unames). This operation allows you to retrieve the email addresses associated with a list of username hashes.
 */
export const batchLookupUserUname: API.OperationMethod<
  BatchLookupUserUnameRequest,
  BatchLookupUserUnameResponse,
  BatchLookupUserUnameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c56, 0) as any as S.Schema<BatchLookupUserUnameRequest>,
  output: __S(901, __c56, 5) as any as S.Schema<BatchLookupUserUnameResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchLookupUserUname",
}));

export type BatchReinviteUserError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Resends invitation codes to multiple users who have pending invitations in a Wickr network. This operation is useful when users haven't accepted their initial invitations or when invitations have expired.
 */
export const batchReinviteUser: API.OperationMethod<
  BatchReinviteUserRequest,
  BatchReinviteUserResponse,
  BatchReinviteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<BatchReinviteUserRequest>,
  output: __S(882, __c55, 2) as any as S.Schema<BatchReinviteUserResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchReinviteUser",
}));

export type BatchResetDevicesForUserError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Resets multiple devices for a specific user in a Wickr network. This operation forces the selected devices to log out and requires users to re-authenticate, which is useful for security purposes or when devices need to be revoked.
 */
export const batchResetDevicesForUser: API.OperationMethod<
  BatchResetDevicesForUserRequest,
  BatchResetDevicesForUserResponse,
  BatchResetDevicesForUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c1, 0) as any as S.Schema<BatchResetDevicesForUserRequest>,
  output: __S(21, __c1, 5) as any as S.Schema<BatchResetDevicesForUserResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchResetDevicesForUser",
}));

export type BatchToggleUserSuspendStatusError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Suspends or unsuspends multiple users in a Wickr network. Suspended users cannot access the network until they are unsuspended. This operation is useful for temporarily restricting access without deleting user accounts.
 */
export const batchToggleUserSuspendStatus: API.OperationMethod<
  BatchToggleUserSuspendStatusRequest,
  BatchToggleUserSuspendStatusResponse,
  BatchToggleUserSuspendStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<BatchToggleUserSuspendStatusRequest>,
  output: __S(882, __c55, 2) as any as S.Schema<BatchToggleUserSuspendStatusResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchToggleUserSuspendStatus",
}));

export type CreateBotError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Creates a new bot in a specified Wickr network. Bots are automated accounts that can send and receive messages, enabling integration with external systems and automation of tasks.
 */
export const createBot: API.OperationMethod<
  CreateBotRequest,
  CreateBotResponse,
  CreateBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<CreateBotRequest>,
  output: __S(49, __c3, 1) as any as S.Schema<CreateBotResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBot",
}));

export type CreateDataRetentionBotError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Creates a data retention bot in a Wickr network. Data retention bots are specialized bots that handle message archiving and compliance by capturing and storing messages for regulatory or organizational requirements.
 */
export const createDataRetentionBot: API.OperationMethod<
  CreateDataRetentionBotRequest,
  CreateDataRetentionBotResponse,
  CreateDataRetentionBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<CreateDataRetentionBotRequest>,
  output: __S(80, __c5, 0) as any as S.Schema<CreateDataRetentionBotResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataRetentionBot",
}));

export type CreateDataRetentionBotChallengeError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Creates a new challenge password for the data retention bot. This password is used for authentication when the bot connects to the network.
 */
export const createDataRetentionBotChallenge: API.OperationMethod<
  CreateDataRetentionBotChallengeRequest,
  CreateDataRetentionBotChallengeResponse,
  CreateDataRetentionBotChallengeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<CreateDataRetentionBotChallengeRequest>,
  output: __S(97, __c6, 1) as any as S.Schema<CreateDataRetentionBotChallengeResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataRetentionBotChallenge",
}));

export type CreateNetworkError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Creates a new Wickr network with specified access level and configuration. This operation provisions a new communication network for your organization.
 */
export const createNetwork: API.OperationMethod<
  CreateNetworkRequest,
  CreateNetworkResponse,
  CreateNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<CreateNetworkRequest>,
  output: __S(113, __c7, 1) as any as S.Schema<CreateNetworkResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNetwork",
}));

export type CreateSecurityGroupError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Creates a new security group in a Wickr network. Security groups allow you to organize users and control their permissions, features, and security settings.
 */
export const createSecurityGroup: API.OperationMethod<
  CreateSecurityGroupRequest,
  CreateSecurityGroupResponse,
  CreateSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(129, __c8, 1) as any as S.Schema<CreateSecurityGroupRequest>,
  output: __S(160, __c10, 0) as any as S.Schema<CreateSecurityGroupResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSecurityGroup",
}));

export type DeleteBotError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Deletes a bot from a specified Wickr network. This operation permanently removes the bot account and its associated data from the network.
 */
export const deleteBot: API.OperationMethod<
  DeleteBotRequest,
  DeleteBotResponse,
  DeleteBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<DeleteBotRequest>,
  output: __S(80, __c5, 0) as any as S.Schema<DeleteBotResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBot",
}));

export type DeleteDataRetentionBotError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Deletes the data retention bot from a Wickr network. This operation permanently removes the bot and all its associated data from the database.
 */
export const deleteDataRetentionBot: API.OperationMethod<
  DeleteDataRetentionBotRequest,
  DeleteDataRetentionBotResponse,
  DeleteDataRetentionBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<DeleteDataRetentionBotRequest>,
  output: __S(80, __c5, 0) as any as S.Schema<DeleteDataRetentionBotResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataRetentionBot",
}));

export type DeleteNetworkError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Deletes a Wickr network and all its associated resources, including users, bots, security groups, and settings. This operation is permanent and cannot be undone.
 */
export const deleteNetwork: API.OperationMethod<
  DeleteNetworkRequest,
  DeleteNetworkResponse,
  DeleteNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<DeleteNetworkRequest>,
  output: __S(80, __c5, 0) as any as S.Schema<DeleteNetworkResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNetwork",
}));

export type DeleteSecurityGroupError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Deletes a security group from a Wickr network. This operation cannot be performed on the default security group.
 */
export const deleteSecurityGroup: API.OperationMethod<
  DeleteSecurityGroupRequest,
  DeleteSecurityGroupResponse,
  DeleteSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<DeleteSecurityGroupRequest>,
  output: __S(225, __c14, 1) as any as S.Schema<DeleteSecurityGroupResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSecurityGroup",
}));

export type GetBotError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves detailed information about a specific bot in a Wickr network, including its status, group membership, and authentication details.
 */
export const getBot: API.OperationMethod<
  GetBotRequest,
  GetBotResponse,
  GetBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<GetBotRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<GetBotResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBot",
}));

export type GetBotsCountError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves the count of bots in a Wickr network, categorized by their status (pending, active, and total).
 */
export const getBotsCount: API.OperationMethod<
  GetBotsCountRequest,
  GetBotsCountResponse,
  GetBotsCountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<GetBotsCountRequest>,
  output: __S(273, __c17, 1) as any as S.Schema<GetBotsCountResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBotsCount",
}));

export type GetDataRetentionBotError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves information about the data retention bot in a Wickr network, including its status and whether the data retention service is enabled.
 */
export const getDataRetentionBot: API.OperationMethod<
  GetDataRetentionBotRequest,
  GetDataRetentionBotResponse,
  GetDataRetentionBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<GetDataRetentionBotRequest>,
  output: __S(289, __c18, 1) as any as S.Schema<GetDataRetentionBotResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataRetentionBot",
}));

export type GetGuestUserHistoryCountError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves historical guest user count data for a Wickr network, showing the number of guest users per billing period over the past 90 days.
 */
export const getGuestUserHistoryCount: API.OperationMethod<
  GetGuestUserHistoryCountRequest,
  GetGuestUserHistoryCountResponse,
  GetGuestUserHistoryCountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<GetGuestUserHistoryCountRequest>,
  output: __S(307, __c19, 3) as any as S.Schema<GetGuestUserHistoryCountResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGuestUserHistoryCount",
}));

export type GetNetworkError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves detailed information about a specific Wickr network, including its configuration, access level, and status.
 */
export const getNetwork: API.OperationMethod<
  GetNetworkRequest,
  GetNetworkResponse,
  GetNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<GetNetworkRequest>,
  output: __S(336, __c21, 0) as any as S.Schema<GetNetworkResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNetwork",
}));

export type GetNetworkSettingsError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves all network-level settings for a Wickr network, including client metrics, data retention, and other configuration options.
 */
export const getNetworkSettings: API.OperationMethod<
  GetNetworkSettingsRequest,
  GetNetworkSettingsResponse,
  GetNetworkSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<GetNetworkSettingsRequest>,
  output: __S(370, __c23, 2) as any as S.Schema<GetNetworkSettingsResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNetworkSettings",
}));

export type GetOidcInfoError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves the OpenID Connect (OIDC) configuration for a Wickr network, including SSO settings and optional token information if access token parameters are provided.
 */
export const getOidcInfo: API.OperationMethod<
  GetOidcInfoRequest,
  GetOidcInfoResponse,
  GetOidcInfoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<GetOidcInfoRequest>,
  output: __S(386, __c24, 2) as any as S.Schema<GetOidcInfoResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOidcInfo",
}));

export type GetOpentdfConfigError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves the OpenTDF integration configuration for a Wickr network.
 */
export const getOpentdfConfig: API.OperationMethod<
  GetOpentdfConfigRequest,
  GetOpentdfConfigResponse,
  GetOpentdfConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<GetOpentdfConfigRequest>,
  output: __S(432, __c27, 0) as any as S.Schema<GetOpentdfConfigResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOpentdfConfig",
}));

export type GetSecurityGroupError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves detailed information about a specific security group in a Wickr network, including its settings, member counts, and configuration.
 */
export const getSecurityGroup: API.OperationMethod<
  GetSecurityGroupRequest,
  GetSecurityGroupResponse,
  GetSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<GetSecurityGroupRequest>,
  output: __S(160, __c10, 0) as any as S.Schema<GetSecurityGroupResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSecurityGroup",
}));

export type GetUserError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves detailed information about a specific user in a Wickr network, including their profile, status, and activity history.
 */
export const getUser: API.OperationMethod<
  GetUserRequest,
  GetUserResponse,
  GetUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<GetUserRequest>,
  output: __S(465, __c29, 1) as any as S.Schema<GetUserResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUser",
}));

export type GetUsersCountError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves the count of users in a Wickr network, categorized by their status (pending, active, rejected) and showing how many users can still be added.
 */
export const getUsersCount: API.OperationMethod<
  GetUsersCountRequest,
  GetUsersCountResponse,
  GetUsersCountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<GetUsersCountRequest>,
  output: __S(481, __c30, 1) as any as S.Schema<GetUsersCountResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUsersCount",
}));

export type ListBlockedGuestUsersError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves a paginated list of guest users who have been blocked from a Wickr network. You can filter and sort the results.
 */
export const listBlockedGuestUsers: API.PaginatedOperationMethod<
  ListBlockedGuestUsersRequest,
  ListBlockedGuestUsersResponse,
  ListBlockedGuestUsersError,
  Credentials | HttpClient.HttpClient,
  BlockedGuestUser
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<ListBlockedGuestUsersRequest>,
  output: __S(499, __c31, 3) as any as S.Schema<ListBlockedGuestUsersResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBlockedGuestUsers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "blocklist",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBotsError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves a paginated list of bots in a specified Wickr network. You can filter and sort the results based on various criteria.
 */
export const listBots: API.PaginatedOperationMethod<
  ListBotsRequest,
  ListBotsResponse,
  ListBotsError,
  Credentials | HttpClient.HttpClient,
  Bot
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<ListBotsRequest>,
  output: __S(514, __c32, 2) as any as S.Schema<ListBotsResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBots",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "bots",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDevicesForUserError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves a paginated list of devices associated with a specific user in a Wickr network. This operation returns information about all devices where the user has logged into Wickr.
 */
export const listDevicesForUser: API.PaginatedOperationMethod<
  ListDevicesForUserRequest,
  ListDevicesForUserResponse,
  ListDevicesForUserError,
  Credentials | HttpClient.HttpClient,
  BasicDeviceObject
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<ListDevicesForUserRequest>,
  output: __S(531, __c33, 3) as any as S.Schema<ListDevicesForUserResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDevicesForUser",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "devices",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGuestUsersError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves a paginated list of guest users who have communicated with your Wickr network. Guest users are external users from federated networks who can communicate with network members.
 */
export const listGuestUsers: API.PaginatedOperationMethod<
  ListGuestUsersRequest,
  ListGuestUsersResponse,
  ListGuestUsersError,
  Credentials | HttpClient.HttpClient,
  GuestUser
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<ListGuestUsersRequest>,
  output: __S(547, __c34, 3) as any as S.Schema<ListGuestUsersResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGuestUsers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "guestlist",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNetworksError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves a paginated list of all Wickr networks associated with your Amazon Web Services account. You can sort the results by network ID or name.
 */
export const listNetworks: API.PaginatedOperationMethod<
  ListNetworksRequest,
  ListNetworksResponse,
  ListNetworksError,
  Credentials | HttpClient.HttpClient,
  Network
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<ListNetworksRequest>,
  output: __S(562, __c35, 2) as any as S.Schema<ListNetworksResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "networks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSecurityGroupsError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves a paginated list of security groups in a specified Wickr network. You can sort the results by various criteria.
 */
export const listSecurityGroups: API.PaginatedOperationMethod<
  ListSecurityGroupsRequest,
  ListSecurityGroupsResponse,
  ListSecurityGroupsError,
  Credentials | HttpClient.HttpClient,
  SecurityGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<ListSecurityGroupsRequest>,
  output: __S(578, __c36, 2) as any as S.Schema<ListSecurityGroupsResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecurityGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "securityGroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSecurityGroupUsersError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves a paginated list of users who belong to a specific security group in a Wickr network.
 */
export const listSecurityGroupUsers: API.PaginatedOperationMethod<
  ListSecurityGroupUsersRequest,
  ListSecurityGroupUsersResponse,
  ListSecurityGroupUsersError,
  Credentials | HttpClient.HttpClient,
  User
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<ListSecurityGroupUsersRequest>,
  output: __S(593, __c37, 1) as any as S.Schema<ListSecurityGroupUsersResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecurityGroupUsers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "users",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListUsersError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves a paginated list of users in a specified Wickr network. You can filter and sort the results based on various criteria such as name, status, or security group membership.
 */
export const listUsers: API.PaginatedOperationMethod<
  ListUsersRequest,
  ListUsersResponse,
  ListUsersError,
  Credentials | HttpClient.HttpClient,
  User
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<ListUsersRequest>,
  output: __S(609, __c38, 1) as any as S.Schema<ListUsersResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUsers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "users",
    pageSize: "maxResults",
  } as const,
})) as any;

export type RegisterOidcConfigError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Registers and saves an OpenID Connect (OIDC) configuration for a Wickr network, enabling Single Sign-On (SSO) authentication through an identity provider.
 */
export const registerOidcConfig: API.OperationMethod<
  RegisterOidcConfigRequest,
  RegisterOidcConfigResponse,
  RegisterOidcConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<RegisterOidcConfigRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<RegisterOidcConfigResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterOidcConfig",
}));

export type RegisterOidcConfigTestError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Tests an OpenID Connect (OIDC) configuration for a Wickr network by validating the connection to the identity provider and retrieving its supported capabilities.
 */
export const registerOidcConfigTest: API.OperationMethod<
  RegisterOidcConfigTestRequest,
  RegisterOidcConfigTestResponse,
  RegisterOidcConfigTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c40, 0) as any as S.Schema<RegisterOidcConfigTestRequest>,
  output: __S(641, __c40, 1) as any as S.Schema<RegisterOidcConfigTestResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterOidcConfigTest",
}));

export type RegisterOpentdfConfigError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Registers and saves OpenTDF configuration for a Wickr network, enabling attribute-based access control for Wickr through an OpenTDF provider.
 */
export const registerOpentdfConfig: API.OperationMethod<
  RegisterOpentdfConfigRequest,
  RegisterOpentdfConfigResponse,
  RegisterOpentdfConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<RegisterOpentdfConfigRequest>,
  output: __S(432, __c27, 0) as any as S.Schema<RegisterOpentdfConfigResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterOpentdfConfig",
}));

export type UpdateBotError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Updates the properties of an existing bot in a Wickr network. This operation allows you to modify the bot's display name, security group, password, or suspension status.
 */
export const updateBot: API.OperationMethod<
  UpdateBotRequest,
  UpdateBotResponse,
  UpdateBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c42, 0) as any as S.Schema<UpdateBotRequest>,
  output: __S(80, __c5, 0) as any as S.Schema<UpdateBotResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBot",
}));

export type UpdateDataRetentionError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Updates the data retention bot settings, allowing you to enable or disable the data retention service, or acknowledge the public key message.
 */
export const updateDataRetention: API.OperationMethod<
  UpdateDataRetentionRequest,
  UpdateDataRetentionResponse,
  UpdateDataRetentionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<UpdateDataRetentionRequest>,
  output: __S(80, __c5, 0) as any as S.Schema<UpdateDataRetentionResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataRetention",
}));

export type UpdateGuestUserError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Updates the block status of a guest user in a Wickr network. This operation allows you to block or unblock a guest user from accessing the network.
 */
export const updateGuestUser: API.OperationMethod<
  UpdateGuestUserRequest,
  UpdateGuestUserResponse,
  UpdateGuestUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c44, 0) as any as S.Schema<UpdateGuestUserRequest>,
  output: __S(80, __c5, 0) as any as S.Schema<UpdateGuestUserResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGuestUser",
}));

export type UpdateNetworkError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Updates the properties of an existing Wickr network, such as its name or encryption key configuration.
 */
export const updateNetwork: API.OperationMethod<
  UpdateNetworkRequest,
  UpdateNetworkResponse,
  UpdateNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c45, 0) as any as S.Schema<UpdateNetworkRequest>,
  output: __S(80, __c5, 0) as any as S.Schema<UpdateNetworkResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNetwork",
}));

export type UpdateNetworkSettingsError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Updates network-level settings for a Wickr network. You can modify settings such as client metrics, data retention, and other network-wide options.
 */
export const updateNetworkSettings: API.OperationMethod<
  UpdateNetworkSettingsRequest,
  UpdateNetworkSettingsResponse,
  UpdateNetworkSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(739, __c46, 3) as any as S.Schema<UpdateNetworkSettingsRequest>,
  output: __S(370, __c23, 2) as any as S.Schema<UpdateNetworkSettingsResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNetworkSettings",
}));

export type UpdateSecurityGroupError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Updates the properties of an existing security group in a Wickr network, such as its name or settings.
 */
export const updateSecurityGroup: API.OperationMethod<
  UpdateSecurityGroupRequest,
  UpdateSecurityGroupResponse,
  UpdateSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(752, __c47, 0) as any as S.Schema<UpdateSecurityGroupRequest>,
  output: __S(160, __c10, 0) as any as S.Schema<UpdateSecurityGroupResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSecurityGroup",
}));

export type UpdateUserError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Updates the properties of an existing user in a Wickr network. This operation allows you to modify the user's name, password, security group membership, and invite code settings.
 *
 * `codeValidation`, `inviteCode`, and `inviteCodeTtl` are restricted to networks under preview only.
 */
export const updateUser: API.OperationMethod<
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(769, __c48, 1) as any as S.Schema<UpdateUserRequest>,
  output: __S(770, __c48, 2) as any as S.Schema<UpdateUserResponse>,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
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
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          userIds: __S(848, __c53, 0),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Client-Token"),
            T.IdempotencyToken(),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/networks/{networkId}/users/re-invite" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchReinviteUserRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          userId: S.String.pipe(T.HttpLabel("userId")),
          appIds: __S(848, __c53, 0),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Client-Token"),
            T.IdempotencyToken(),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/networks/{networkId}/users/{userId}/devices" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchResetDevicesForUserRequest" });
    case 1:
      return S.suspend(() => S.Struct({ appId: S.String })).annotate({
        identifier: "BatchDeviceSuccessResponseItem",
      });
    case 2:
      return S.Array(__S(17, __c1, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ field: S.optional(S.String), reason: S.optional(S.String), appId: S.String }),
      ).annotate({ identifier: "BatchDeviceErrorResponseItem" });
    case 4:
      return S.Array(__S(19, __c1, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          message: S.optional(S.String),
          successful: S.optional(__S(18, __c1, 2)),
          failed: S.optional(__S(20, __c1, 4)),
        }),
      ).annotate({ identifier: "BatchResetDevicesForUserResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          suspend: S.Boolean.pipe(T.HttpQuery("suspend")),
          userIds: __S(848, __c53, 0),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Client-Token"),
            T.IdempotencyToken(),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/networks/{networkId}/users/toggleSuspend" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchToggleUserSuspendStatusRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          username: S.String,
          displayName: S.optional(S.String),
          groupId: S.String,
          challenge: SensitiveString,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/networks/{networkId}/bots" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateBotRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          message: S.optional(S.String),
          botId: S.String,
          networkId: S.optional(S.String),
          username: S.optional(S.String),
          displayName: S.optional(S.String),
          groupId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateBotResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ networkId: S.String.pipe(T.HttpLabel("networkId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/networks/{networkId}/data-retention-bots" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDataRetentionBotRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ message: S.optional(S.String) })).annotate({
        identifier: "CreateDataRetentionBotResponse",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ networkId: S.String.pipe(T.HttpLabel("networkId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/networks/{networkId}/data-retention-bots/challenge" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDataRetentionBotChallengeRequest" });
    case 1:
      return S.suspend(() => S.Struct({ challenge: SensitiveString })).annotate({
        identifier: "CreateDataRetentionBotChallengeResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkName: S.String,
          accessLevel: S.String,
          enablePremiumFreeTrial: S.optional(S.Boolean),
          encryptionKeyArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/networks" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateNetworkRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          networkId: S.optional(S.String),
          networkName: S.optional(S.String),
          encryptionKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateNetworkResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          lockoutThreshold: S.optional(S.Number),
          permittedNetworks: S.optional(__S(848, __c53, 0)),
          enableGuestFederation: S.optional(S.Boolean),
          globalFederation: S.optional(S.Boolean),
          federationMode: S.optional(S.Number),
          enableRestrictedGlobalFederation: S.optional(S.Boolean),
          permittedWickrAwsNetworks: S.optional(__S(145, __c9, 1)),
          permittedWickrEnterpriseNetworks: S.optional(__S(147, __c9, 3)),
        }),
      ).annotate({ identifier: "SecurityGroupSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          name: S.String,
          securityGroupSettings: __S(128, __c8, 0),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Client-Token"),
            T.IdempotencyToken(),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/networks/{networkId}/security-groups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSecurityGroupRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ region: S.String, networkId: S.String })).annotate({
        identifier: "WickrAwsNetworks",
      });
    case 1:
      return S.Array(__S(144, __c9, 0));
    case 2:
      return S.suspend(() => S.Struct({ domain: S.String, networkId: S.String })).annotate({
        identifier: "PermittedWickrEnterpriseNetwork",
      });
    case 3:
      return S.Array(__S(146, __c9, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          canStart11Call: S.optional(S.Boolean),
          canVideoCall: S.optional(S.Boolean),
          forceTcpCall: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "CallingSettings" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          lowercase: S.optional(S.Number),
          minLength: S.optional(S.Number),
          numbers: S.optional(S.Number),
          symbols: S.optional(S.Number),
          uppercase: S.optional(S.Number),
        }),
      ).annotate({ identifier: "PasswordRequirements" });
    case 6:
      return S.suspend(() =>
        S.Struct({ canProcessManually: S.optional(S.Boolean), intensity: S.optional(S.Number) }),
      ).annotate({ identifier: "ShredderSettings" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          alwaysReauthenticate: S.optional(S.Boolean),
          atakPackageValues: S.optional(__S(848, __c53, 0)),
          calling: S.optional(__S(148, __c9, 4)),
          checkForUpdates: S.optional(S.Boolean),
          enableAtak: S.optional(S.Boolean),
          enableCrashReports: S.optional(S.Boolean),
          enableFileDownload: S.optional(S.Boolean),
          enableGuestFederation: S.optional(S.Boolean),
          enableNotificationPreview: S.optional(S.Boolean),
          enableOpenAccessOption: S.optional(S.Boolean),
          enableRestrictedGlobalFederation: S.optional(S.Boolean),
          filesEnabled: S.optional(S.Boolean),
          forceDeviceLockout: S.optional(S.Number),
          forceOpenAccess: S.optional(S.Boolean),
          forceReadReceipts: S.optional(S.Boolean),
          globalFederation: S.optional(S.Boolean),
          isAtoEnabled: S.optional(S.Boolean),
          isLinkPreviewEnabled: S.optional(S.Boolean),
          locationAllowMaps: S.optional(S.Boolean),
          locationEnabled: S.optional(S.Boolean),
          maxAutoDownloadSize: S.optional(S.Number),
          maxBor: S.optional(S.Number),
          maxTtl: S.optional(S.Number),
          messageForwardingEnabled: S.optional(S.Boolean),
          passwordRequirements: S.optional(__S(149, __c9, 5)),
          presenceEnabled: S.optional(S.Boolean),
          quickResponses: S.optional(__S(848, __c53, 0)),
          showMasterRecoveryKey: S.optional(S.Boolean),
          shredder: S.optional(__S(150, __c9, 6)),
          ssoMaxIdleMinutes: S.optional(S.Number),
          maxNonSsoSessionMinutes: S.optional(S.Number),
          federationMode: S.optional(S.Number),
          lockoutThreshold: S.optional(S.Number),
          permittedNetworks: S.optional(__S(848, __c53, 0)),
          permittedWickrAwsNetworks: S.optional(__S(145, __c9, 1)),
          permittedWickrEnterpriseNetworks: S.optional(__S(147, __c9, 3)),
        }),
      ).annotate({ identifier: "SecurityGroupSettings" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          activeMembers: S.Number,
          botMembers: S.Number,
          activeDirectoryGuid: S.optional(S.String),
          id: S.String,
          isDefault: S.Boolean,
          name: S.String,
          modified: S.Number,
          securityGroupSettings: __S(151, __c9, 7),
        }),
      ).annotate({ identifier: "SecurityGroup" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ securityGroup: __S(152, __c9, 8) })).annotate({
        identifier: "CreateSecurityGroupResponse",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          botId: S.String.pipe(T.HttpLabel("botId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/networks/{networkId}/bots/{botId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteBotRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ networkId: S.String.pipe(T.HttpLabel("networkId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/networks/{networkId}/data-retention-bots" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDataRetentionBotRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Client-Token"),
            T.IdempotencyToken(),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/networks/{networkId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteNetworkRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          groupId: S.String.pipe(T.HttpLabel("groupId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/networks/{networkId}/security-groups/{groupId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSecurityGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          message: S.optional(S.String),
          networkId: S.optional(S.String),
          groupId: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteSecurityGroupResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          botId: S.String.pipe(T.HttpLabel("botId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/networks/{networkId}/bots/{botId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBotRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          botId: S.optional(S.String),
          displayName: S.optional(S.String),
          username: S.optional(S.String),
          uname: S.optional(S.String),
          pubkey: S.optional(S.String),
          status: S.optional(S.Number),
          groupId: S.optional(S.String),
          hasChallenge: S.optional(S.Boolean),
          suspended: S.optional(S.Boolean),
          lastLogin: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetBotResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ networkId: S.String.pipe(T.HttpLabel("networkId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/networks/{networkId}/bots/count" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBotsCountRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ pending: S.Number, active: S.Number, total: S.Number }),
      ).annotate({ identifier: "GetBotsCountResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ networkId: S.String.pipe(T.HttpLabel("networkId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/networks/{networkId}/data-retention-bots" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataRetentionBotRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          botName: S.optional(S.String),
          botExists: S.optional(S.Boolean),
          isBotActive: S.optional(S.Boolean),
          isDataRetentionBotRegistered: S.optional(S.Boolean),
          isDataRetentionServiceEnabled: S.optional(S.Boolean),
          isPubkeyMsgAcked: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GetDataRetentionBotResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ networkId: S.String.pipe(T.HttpLabel("networkId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/networks/{networkId}/guest-users/count" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetGuestUserHistoryCountRequest" });
    case 1:
      return S.suspend(() => S.Struct({ month: S.String, count: S.String })).annotate({
        identifier: "GuestUserHistoryCount",
      });
    case 2:
      return S.Array(__S(305, __c19, 1));
    case 3:
      return S.suspend(() => S.Struct({ history: __S(306, __c19, 2) })).annotate({
        identifier: "GetGuestUserHistoryCountResponse",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ networkId: S.String.pipe(T.HttpLabel("networkId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/networks/{networkId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetNetworkRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String,
          networkName: S.String,
          accessLevel: S.String,
          awsAccountId: S.String,
          networkArn: S.String,
          standing: S.optional(S.Number),
          freeTrialExpiration: S.optional(S.String),
          migrationState: S.optional(S.Number),
          encryptionKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetNetworkResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ networkId: S.String.pipe(T.HttpLabel("networkId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/networks/{networkId}/settings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetNetworkSettingsRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ optionName: S.String, value: S.String, type: S.String }),
      ).annotate({ identifier: "Setting" });
    case 1:
      return S.Array(__S(368, __c23, 0));
    case 2:
      return S.suspend(() => S.Struct({ settings: __S(369, __c23, 1) })).annotate({
        identifier: "GetNetworkSettingsResponse",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          clientId: S.optional(S.String).pipe(T.HttpQuery("clientId")),
          code: S.optional(S.String).pipe(T.HttpQuery("code")),
          grantType: S.optional(S.String).pipe(T.HttpQuery("grantType")),
          redirectUri: S.optional(S.String).pipe(T.HttpQuery("redirectUri")),
          url: S.optional(S.String).pipe(T.HttpQuery("url")),
          clientSecret: S.optional(SensitiveString).pipe(T.HttpQuery("clientSecret")),
          codeVerifier: S.optional(S.String).pipe(T.HttpQuery("codeVerifier")),
          certificate: S.optional(S.String).pipe(T.HttpQuery("certificate")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/networks/{networkId}/oidc" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetOidcInfoRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          codeVerifier: S.optional(S.String),
          codeChallenge: S.optional(S.String),
          accessToken: S.optional(S.String),
          idToken: S.optional(S.String),
          refreshToken: S.optional(S.String),
          tokenType: S.optional(S.String),
          expiresIn: S.optional(S.Number),
        }),
      ).annotate({ identifier: "OidcTokenInfo" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          openidConnectInfo: S.optional(__S(400, __c25, 0)),
          tokenInfo: S.optional(__S(385, __c24, 1)),
        }),
      ).annotate({ identifier: "GetOidcInfoResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationName: S.optional(S.String),
          clientId: S.optional(S.String),
          companyId: S.String,
          scopes: S.String,
          issuer: S.String,
          clientSecret: S.optional(SensitiveString),
          secret: S.optional(SensitiveString),
          redirectUrl: S.optional(S.String),
          userId: S.optional(S.String),
          customUsername: S.optional(S.String),
          caCertificate: S.optional(S.String),
          applicationId: S.optional(S.Number),
          ssoTokenBufferMinutes: S.optional(S.Number),
          extraAuthParams: S.optional(S.String),
        }),
      ).annotate({ identifier: "OidcConfigInfo" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ networkId: S.String.pipe(T.HttpLabel("networkId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/networks/{networkId}/tdf" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetOpentdfConfigRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientId: S.String,
          domain: S.String,
          clientSecret: SensitiveString,
          provider: S.String,
        }),
      ).annotate({ identifier: "GetOpentdfConfigResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          groupId: S.String.pipe(T.HttpLabel("groupId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/networks/{networkId}/security-groups/{groupId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSecurityGroupRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          userId: S.String.pipe(T.HttpLabel("userId")),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("startTime"),
          ),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("endTime"),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/networks/{networkId}/users/{userId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetUserRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          userId: S.String,
          firstName: S.optional(SensitiveString),
          lastName: S.optional(SensitiveString),
          username: S.optional(S.String),
          isAdmin: S.optional(S.Boolean),
          suspended: S.optional(S.Boolean),
          status: S.optional(S.Number),
          lastActivity: S.optional(S.Number),
          lastLogin: S.optional(S.Number),
          securityGroupIds: S.optional(__S(848, __c53, 0)),
        }),
      ).annotate({ identifier: "GetUserResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ networkId: S.String.pipe(T.HttpLabel("networkId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/networks/{networkId}/users/count" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetUsersCountRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          pending: S.Number,
          active: S.Number,
          rejected: S.Number,
          remaining: S.Number,
          total: S.Number,
        }),
      ).annotate({ identifier: "GetUsersCountResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          sortDirection: S.optional(S.String).pipe(T.HttpQuery("sortDirection")),
          sortFields: S.optional(S.String).pipe(T.HttpQuery("sortFields")),
          username: S.optional(S.String).pipe(T.HttpQuery("username")),
          admin: S.optional(S.String).pipe(T.HttpQuery("admin")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/networks/{networkId}/guest-users/blocklist" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListBlockedGuestUsersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          username: S.String,
          admin: S.String,
          modified: S.String,
          usernameHash: S.String,
        }),
      ).annotate({ identifier: "BlockedGuestUser" });
    case 2:
      return S.Array(__S(497, __c31, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), blocklist: __S(498, __c31, 2) }),
      ).annotate({ identifier: "ListBlockedGuestUsersResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          sortFields: S.optional(S.String).pipe(T.HttpQuery("sortFields")),
          sortDirection: S.optional(S.String).pipe(T.HttpQuery("sortDirection")),
          displayName: S.optional(S.String).pipe(T.HttpQuery("displayName")),
          username: S.optional(S.String).pipe(T.HttpQuery("username")),
          status: S.optional(S.Number).pipe(T.HttpQuery("status")),
          groupId: S.optional(S.String).pipe(T.HttpQuery("groupId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/networks/{networkId}/bots" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListBotsRequest" });
    case 1:
      return S.Array(__S(256, __c16, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ bots: __S(513, __c32, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListBotsResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          userId: S.String.pipe(T.HttpLabel("userId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          sortFields: S.optional(S.String).pipe(T.HttpQuery("sortFields")),
          sortDirection: S.optional(S.String).pipe(T.HttpQuery("sortDirection")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/networks/{networkId}/users/{userId}/devices" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDevicesForUserRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          appId: S.optional(S.String),
          created: S.optional(S.String),
          lastLogin: S.optional(S.String),
          statusText: S.optional(S.String),
          suspend: S.optional(S.Boolean),
          type: S.optional(S.String),
        }),
      ).annotate({ identifier: "BasicDeviceObject" });
    case 2:
      return S.Array(__S(529, __c33, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), devices: __S(530, __c33, 2) }),
      ).annotate({ identifier: "ListDevicesForUserResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          sortDirection: S.optional(S.String).pipe(T.HttpQuery("sortDirection")),
          sortFields: S.optional(S.String).pipe(T.HttpQuery("sortFields")),
          username: S.optional(S.String).pipe(T.HttpQuery("username")),
          billingPeriod: S.optional(S.String).pipe(T.HttpQuery("billingPeriod")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/networks/{networkId}/guest-users" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListGuestUsersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ billingPeriod: S.String, username: S.String, usernameHash: S.String }),
      ).annotate({ identifier: "GuestUser" });
    case 2:
      return S.Array(__S(545, __c34, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), guestlist: __S(546, __c34, 2) }),
      ).annotate({ identifier: "ListGuestUsersResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          sortFields: S.optional(S.String).pipe(T.HttpQuery("sortFields")),
          sortDirection: S.optional(S.String).pipe(T.HttpQuery("sortDirection")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/networks" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListNetworksRequest" });
    case 1:
      return S.Array(__S(336, __c21, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ networks: __S(561, __c35, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListNetworksResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          sortFields: S.optional(S.String).pipe(T.HttpQuery("sortFields")),
          sortDirection: S.optional(S.String).pipe(T.HttpQuery("sortDirection")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/networks/{networkId}/security-groups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSecurityGroupsRequest" });
    case 1:
      return S.Array(__S(152, __c9, 8));
    case 2:
      return S.suspend(() =>
        S.Struct({
          securityGroups: S.optional(__S(577, __c36, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListSecurityGroupsResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          groupId: S.String.pipe(T.HttpLabel("groupId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          sortFields: S.optional(S.String).pipe(T.HttpQuery("sortFields")),
          sortDirection: S.optional(S.String).pipe(T.HttpQuery("sortDirection")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/networks/{networkId}/security-groups/{groupId}/users" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSecurityGroupUsersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ users: __S(817, __c51, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSecurityGroupUsersResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          sortFields: S.optional(S.String).pipe(T.HttpQuery("sortFields")),
          sortDirection: S.optional(S.String).pipe(T.HttpQuery("sortDirection")),
          firstName: S.optional(SensitiveString).pipe(T.HttpQuery("firstName")),
          lastName: S.optional(SensitiveString).pipe(T.HttpQuery("lastName")),
          username: S.optional(S.String).pipe(T.HttpQuery("username")),
          status: S.optional(S.Number).pipe(T.HttpQuery("status")),
          groupId: S.optional(S.String).pipe(T.HttpQuery("groupId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/networks/{networkId}/users" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListUsersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), users: S.optional(__S(817, __c51, 1)) }),
      ).annotate({ identifier: "ListUsersResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          companyId: S.String,
          customUsername: S.optional(S.String),
          extraAuthParams: S.optional(S.String),
          issuer: S.String,
          scopes: S.String,
          secret: S.optional(SensitiveString),
          ssoTokenBufferMinutes: S.optional(S.Number),
          userId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/networks/{networkId}/oidc/save" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RegisterOidcConfigRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          extraAuthParams: S.optional(S.String),
          issuer: S.String,
          scopes: S.String,
          certificate: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/networks/{networkId}/oidc/test" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RegisterOidcConfigTestRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          tokenEndpoint: S.optional(S.String),
          userinfoEndpoint: S.optional(S.String),
          responseTypesSupported: S.optional(__S(848, __c53, 0)),
          scopesSupported: S.optional(__S(848, __c53, 0)),
          issuer: S.optional(S.String),
          authorizationEndpoint: S.optional(S.String),
          endSessionEndpoint: S.optional(S.String),
          logoutEndpoint: S.optional(S.String),
          grantTypesSupported: S.optional(__S(848, __c53, 0)),
          revocationEndpoint: S.optional(S.String),
          tokenEndpointAuthMethodsSupported: S.optional(__S(848, __c53, 0)),
          microsoftMultiRefreshToken: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "RegisterOidcConfigTestResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          clientId: S.String,
          clientSecret: SensitiveString,
          domain: S.String,
          provider: S.String,
          dryRun: S.optional(S.Boolean).pipe(T.HttpQuery("dryRun")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/networks/{networkId}/tdf" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RegisterOpentdfConfigRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          botId: S.String.pipe(T.HttpLabel("botId")),
          displayName: S.optional(S.String),
          groupId: S.optional(S.String),
          challenge: S.optional(SensitiveString),
          suspend: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/networks/{networkId}/bots/{botId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateBotRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ networkId: S.String.pipe(T.HttpLabel("networkId")), actionType: S.String }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/networks/{networkId}/data-retention-bots" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDataRetentionRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          usernameHash: S.String.pipe(T.HttpLabel("usernameHash")),
          block: S.Boolean,
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/networks/{networkId}/guest-users/{usernameHash}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateGuestUserRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          networkName: S.String,
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Client-Token"),
            T.IdempotencyToken(),
          ),
          encryptionKeyArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/networks/{networkId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateNetworkRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ status: S.optional(S.String) })).annotate({
        identifier: "ReadReceiptConfig",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          enabled: S.Boolean,
          header: S.optional(S.String),
          content: S.optional(S.String),
          closeButtonLabel: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConsentPopupConfig" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          enableClientMetrics: S.optional(S.Boolean),
          readReceiptConfig: S.optional(__S(736, __c46, 0)),
          dataRetention: S.optional(S.Boolean),
          enableTrustedDataFormat: S.optional(S.Boolean),
          consentPopup: S.optional(__S(737, __c46, 1)),
        }),
      ).annotate({ identifier: "NetworkSettings" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          settings: __S(738, __c46, 2),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/networks/{networkId}/settings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateNetworkSettingsRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          groupId: S.String.pipe(T.HttpLabel("groupId")),
          name: S.optional(S.String),
          securityGroupSettings: S.optional(__S(151, __c9, 7)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/networks/{networkId}/security-groups/{groupId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSecurityGroupRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          firstName: S.optional(SensitiveString),
          lastName: S.optional(SensitiveString),
          username: S.optional(S.String),
          securityGroupIds: S.optional(__S(848, __c53, 0)),
          inviteCode: S.optional(S.String),
          inviteCodeTtl: S.optional(S.Number),
          codeValidation: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "UpdateUserDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          userId: S.String,
          userDetails: S.optional(__S(768, __c48, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/networks/{networkId}/users" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateUserRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          userId: S.String,
          networkId: S.String,
          securityGroupIds: S.optional(__S(848, __c53, 0)),
          firstName: S.optional(SensitiveString),
          lastName: S.optional(SensitiveString),
          middleName: S.optional(S.String),
          suspended: S.Boolean,
          modified: S.optional(S.Number),
          status: S.optional(S.Number),
          inviteCode: S.optional(S.String),
          inviteExpiration: S.optional(S.Number),
          codeValidation: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "UpdateUserResponse" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ field: S.optional(S.String), reason: S.optional(S.String) }),
      ).annotate({ identifier: "ErrorDetail" });
    case 1:
      return S.Array(__S(784, __c49, 0));
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          firstName: S.optional(SensitiveString),
          lastName: S.optional(SensitiveString),
          securityGroupIds: __S(848, __c53, 0),
          username: S.String,
          inviteCode: S.optional(S.String),
          inviteCodeTtl: S.optional(S.Number),
          codeValidation: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "BatchCreateUserRequestItem" });
    case 1:
      return S.Array(__S(800, __c50, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          users: __S(801, __c50, 1),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Client-Token"),
            T.IdempotencyToken(),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/networks/{networkId}/users" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchCreateUserRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          message: S.optional(S.String),
          successful: S.optional(__S(817, __c51, 1)),
          failed: S.optional(__S(833, __c52, 1)),
        }),
      ).annotate({ identifier: "BatchCreateUserResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userId: S.optional(S.String),
          firstName: S.optional(SensitiveString),
          lastName: S.optional(SensitiveString),
          username: S.optional(S.String),
          securityGroups: S.optional(__S(848, __c53, 0)),
          isAdmin: S.optional(S.Boolean),
          suspended: S.optional(S.Boolean),
          status: S.optional(S.Number),
          otpEnabled: S.optional(S.Boolean),
          scimId: S.optional(S.String),
          type: S.optional(S.String),
          cell: S.optional(S.String),
          countryCode: S.optional(S.String),
          challengeFailures: S.optional(S.Number),
          isInviteExpired: S.optional(S.Boolean),
          isUser: S.optional(S.Boolean),
          inviteCode: S.optional(S.String),
          codeValidation: S.optional(S.Boolean),
          uname: S.optional(S.String),
        }),
      ).annotate({ identifier: "User" });
    case 1:
      return S.Array(__S(816, __c51, 0));
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ field: S.optional(S.String), reason: S.optional(S.String), userId: S.String }),
      ).annotate({ identifier: "BatchUserErrorResponseItem" });
    case 1:
      return S.Array(__S(832, __c52, 0));
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          userIds: __S(848, __c53, 0),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Client-Token"),
            T.IdempotencyToken(),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/networks/{networkId}/users/batch-delete" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchDeleteUserRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ userId: S.String })).annotate({
        identifier: "BatchUserSuccessResponseItem",
      });
    case 1:
      return S.Array(__S(880, __c55, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          message: S.optional(S.String),
          successful: S.optional(__S(881, __c55, 1)),
          failed: S.optional(__S(833, __c52, 1)),
        }),
      ).annotate({ identifier: "BatchDeleteUserResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkId: S.String.pipe(T.HttpLabel("networkId")),
          unames: __S(848, __c53, 0),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Client-Token"),
            T.IdempotencyToken(),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/networks/{networkId}/users/uname-lookup" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchLookupUserUnameRequest" });
    case 1:
      return S.suspend(() => S.Struct({ uname: S.String, username: S.String })).annotate({
        identifier: "BatchUnameSuccessResponseItem",
      });
    case 2:
      return S.Array(__S(897, __c56, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ field: S.optional(S.String), reason: S.optional(S.String), uname: S.String }),
      ).annotate({ identifier: "BatchUnameErrorResponseItem" });
    case 4:
      return S.Array(__S(899, __c56, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          message: S.optional(S.String),
          successful: S.optional(__S(898, __c56, 2)),
          failed: S.optional(__S(900, __c56, 4)),
        }),
      ).annotate({ identifier: "BatchLookupUserUnameResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
