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
  sdkId: "Wickr",
  target: "WickrAdminApi",
  version: "2024-02-01",
  sigv4: "wickr",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://admin.wickr.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://admin.wickr.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class BadRequestError
  extends /*@__PURE__*/ TE.TaggedError("BadRequestError", ["BadRequestError"], {
    status: 400,
  })<{ readonly message?: string }> {}
export class ForbiddenError
  extends /*@__PURE__*/ TE.TaggedError("ForbiddenError", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class InternalServerError
  extends /*@__PURE__*/ TE.TaggedError("InternalServerError", ["ServerError"], {
    status: 500,
  })<{ readonly message: string }> {}
export class RateLimitError
  extends /*@__PURE__*/ TE.TaggedError("RateLimitError", ["ThrottlingError"], {
    status: 429,
  })<{ readonly message?: string }> {}
export class ResourceNotFoundError
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundError",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class UnauthorizedError
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedError", ["AuthError"], {
    status: 401,
  })<{ readonly message?: string }> {}
export class ValidationError
  extends /*@__PURE__*/ TE.TaggedError("ValidationError", ["BadRequestError"], {
    status: 422,
  })<{ readonly reasons?: ErrorDetail[]; readonly message?: string }> {}
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
export type PermittedWickrEnterpriseNetworksList =
  PermittedWickrEnterpriseNetwork[];
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
export type DataRetentionActionType =
  | "ENABLE"
  | "DISABLE"
  | "PUBKEY_MSG_ACK"
  | (string & {});
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
  descriptor: {
    service: svc,
    http: "POST /networks/{networkId}/users",
    input: {
      networkId: 0,
      users: D.list({
        firstName: 0,
        lastName: 0,
        securityGroupIds: 0,
        username: 0,
        inviteCode: 0,
        inviteCodeTtl: 0,
        codeValidation: 0,
      }),
      clientToken: D.m({ header: "X-Client-Token", idempotency: true }),
    },
    output: { successful: D.list(o_User) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /networks/{networkId}/users/batch-delete",
    input: {
      networkId: 0,
      userIds: 0,
      clientToken: D.m({ header: "X-Client-Token", idempotency: true }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /networks/{networkId}/users/uname-lookup",
    input: {
      networkId: 0,
      unames: 0,
      clientToken: D.m({ header: "X-Client-Token", idempotency: true }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /networks/{networkId}/users/re-invite",
    input: {
      networkId: 0,
      userIds: 0,
      clientToken: D.m({ header: "X-Client-Token", idempotency: true }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /networks/{networkId}/users/{userId}/devices",
    input: {
      networkId: 0,
      userId: 0,
      appIds: 0,
      clientToken: D.m({ header: "X-Client-Token", idempotency: true }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /networks/{networkId}/users/toggleSuspend",
    input: {
      networkId: 0,
      suspend: D.m({ query: "suspend" }),
      userIds: 0,
      clientToken: D.m({ header: "X-Client-Token", idempotency: true }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /networks/{networkId}/bots",
    input: {
      networkId: 0,
      username: 0,
      displayName: 0,
      groupId: 0,
      challenge: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /networks/{networkId}/data-retention-bots",
    input: { networkId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /networks/{networkId}/data-retention-bots/challenge",
    input: { networkId: 0 },
    output: { challenge: D.secret },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /networks",
    input: {
      networkName: 0,
      accessLevel: 0,
      enablePremiumFreeTrial: 0,
      encryptionKeyArn: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /networks/{networkId}/security-groups",
    input: {
      networkId: 0,
      name: 0,
      securityGroupSettings: {
        lockoutThreshold: 0,
        permittedNetworks: 0,
        enableGuestFederation: 0,
        globalFederation: 0,
        federationMode: 0,
        enableRestrictedGlobalFederation: 0,
        permittedWickrAwsNetworks: D.list(i_WickrAwsNetworks),
        permittedWickrEnterpriseNetworks: D.list(
          i_PermittedWickrEnterpriseNetwork,
        ),
      },
      clientToken: D.m({ header: "X-Client-Token", idempotency: true }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /networks/{networkId}/bots/{botId}",
    input: { networkId: 0, botId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /networks/{networkId}/data-retention-bots",
    input: { networkId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /networks/{networkId}",
    input: {
      networkId: 0,
      clientToken: D.m({ header: "X-Client-Token", idempotency: true }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /networks/{networkId}/security-groups/{groupId}",
    input: { networkId: 0, groupId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /networks/{networkId}/bots/{botId}",
    input: { networkId: 0, botId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /networks/{networkId}/bots/count",
    input: { networkId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /networks/{networkId}/data-retention-bots",
    input: { networkId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /networks/{networkId}/guest-users/count",
    input: { networkId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /networks/{networkId}",
    input: { networkId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /networks/{networkId}/settings",
    input: { networkId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /networks/{networkId}/oidc",
    input: {
      networkId: 0,
      clientId: D.m({ query: "clientId" }),
      code: D.m({ query: "code" }),
      grantType: D.m({ query: "grantType" }),
      redirectUri: D.m({ query: "redirectUri" }),
      url: D.m({ query: "url" }),
      clientSecret: D.m({ query: "clientSecret" }),
      codeVerifier: D.m({ query: "codeVerifier" }),
      certificate: D.m({ query: "certificate" }),
    },
    output: { openidConnectInfo: { clientSecret: D.secret, secret: D.secret } },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /networks/{networkId}/tdf",
    input: { networkId: 0 },
    output: { clientSecret: D.secret },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /networks/{networkId}/security-groups/{groupId}",
    input: { networkId: 0, groupId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /networks/{networkId}/users/{userId}",
    input: {
      networkId: 0,
      userId: 0,
      startTime: D.m({ query: "startTime", shape: D.tsAs("epoch-seconds") }),
      endTime: D.m({ query: "endTime", shape: D.tsAs("epoch-seconds") }),
    },
    output: { firstName: D.secret, lastName: D.secret },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /networks/{networkId}/users/count",
    input: { networkId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /networks/{networkId}/guest-users/blocklist",
    input: {
      networkId: 0,
      maxResults: D.m({ query: "maxResults" }),
      sortDirection: D.m({ query: "sortDirection" }),
      sortFields: D.m({ query: "sortFields" }),
      username: D.m({ query: "username" }),
      admin: D.m({ query: "admin" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /networks/{networkId}/bots",
    input: {
      networkId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      sortFields: D.m({ query: "sortFields" }),
      sortDirection: D.m({ query: "sortDirection" }),
      displayName: D.m({ query: "displayName" }),
      username: D.m({ query: "username" }),
      status: D.m({ query: "status" }),
      groupId: D.m({ query: "groupId" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /networks/{networkId}/users/{userId}/devices",
    input: {
      networkId: 0,
      userId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      sortFields: D.m({ query: "sortFields" }),
      sortDirection: D.m({ query: "sortDirection" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /networks/{networkId}/guest-users",
    input: {
      networkId: 0,
      maxResults: D.m({ query: "maxResults" }),
      sortDirection: D.m({ query: "sortDirection" }),
      sortFields: D.m({ query: "sortFields" }),
      username: D.m({ query: "username" }),
      billingPeriod: D.m({ query: "billingPeriod" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /networks",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      sortFields: D.m({ query: "sortFields" }),
      sortDirection: D.m({ query: "sortDirection" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /networks/{networkId}/security-groups",
    input: {
      networkId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      sortFields: D.m({ query: "sortFields" }),
      sortDirection: D.m({ query: "sortDirection" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /networks/{networkId}/security-groups/{groupId}/users",
    input: {
      networkId: 0,
      groupId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      sortFields: D.m({ query: "sortFields" }),
      sortDirection: D.m({ query: "sortDirection" }),
    },
    output: { users: D.list(o_User) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /networks/{networkId}/users",
    input: {
      networkId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      sortFields: D.m({ query: "sortFields" }),
      sortDirection: D.m({ query: "sortDirection" }),
      firstName: D.m({ query: "firstName" }),
      lastName: D.m({ query: "lastName" }),
      username: D.m({ query: "username" }),
      status: D.m({ query: "status" }),
      groupId: D.m({ query: "groupId" }),
    },
    output: { users: D.list(o_User) },
  },
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
  descriptor: {
    service: svc,
    http: "POST /networks/{networkId}/oidc/save",
    input: {
      networkId: 0,
      companyId: 0,
      customUsername: 0,
      extraAuthParams: 0,
      issuer: 0,
      scopes: 0,
      secret: 0,
      ssoTokenBufferMinutes: 0,
      userId: 0,
    },
    output: { clientSecret: D.secret, secret: D.secret },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /networks/{networkId}/oidc/test",
    input: {
      networkId: 0,
      extraAuthParams: 0,
      issuer: 0,
      scopes: 0,
      certificate: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /networks/{networkId}/tdf",
    input: {
      networkId: 0,
      clientId: 0,
      clientSecret: 0,
      domain: 0,
      provider: 0,
      dryRun: D.m({ query: "dryRun" }),
    },
    output: { clientSecret: D.secret },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /networks/{networkId}/bots/{botId}",
    input: {
      networkId: 0,
      botId: 0,
      displayName: 0,
      groupId: 0,
      challenge: 0,
      suspend: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /networks/{networkId}/data-retention-bots",
    input: { networkId: 0, actionType: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /networks/{networkId}/guest-users/{usernameHash}",
    input: { networkId: 0, usernameHash: 0, block: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /networks/{networkId}",
    input: {
      networkId: 0,
      networkName: 0,
      clientToken: D.m({ header: "X-Client-Token", idempotency: true }),
      encryptionKeyArn: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /networks/{networkId}/settings",
    input: {
      networkId: 0,
      settings: {
        enableClientMetrics: 0,
        readReceiptConfig: { status: 0 },
        dataRetention: 0,
        enableTrustedDataFormat: 0,
        consentPopup: {
          enabled: 0,
          header: 0,
          content: 0,
          closeButtonLabel: 0,
        },
      },
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /networks/{networkId}/security-groups/{groupId}",
    input: {
      networkId: 0,
      groupId: 0,
      name: 0,
      securityGroupSettings: {
        alwaysReauthenticate: 0,
        atakPackageValues: 0,
        calling: { canStart11Call: 0, canVideoCall: 0, forceTcpCall: 0 },
        checkForUpdates: 0,
        enableAtak: 0,
        enableCrashReports: 0,
        enableFileDownload: 0,
        enableGuestFederation: 0,
        enableNotificationPreview: 0,
        enableOpenAccessOption: 0,
        enableRestrictedGlobalFederation: 0,
        filesEnabled: 0,
        forceDeviceLockout: 0,
        forceOpenAccess: 0,
        forceReadReceipts: 0,
        globalFederation: 0,
        isAtoEnabled: 0,
        isLinkPreviewEnabled: 0,
        locationAllowMaps: 0,
        locationEnabled: 0,
        maxAutoDownloadSize: 0,
        maxBor: 0,
        maxTtl: 0,
        messageForwardingEnabled: 0,
        passwordRequirements: {
          lowercase: 0,
          minLength: 0,
          numbers: 0,
          symbols: 0,
          uppercase: 0,
        },
        presenceEnabled: 0,
        quickResponses: 0,
        showMasterRecoveryKey: 0,
        shredder: { canProcessManually: 0, intensity: 0 },
        ssoMaxIdleMinutes: 0,
        maxNonSsoSessionMinutes: 0,
        federationMode: 0,
        lockoutThreshold: 0,
        permittedNetworks: 0,
        permittedWickrAwsNetworks: D.list(i_WickrAwsNetworks),
        permittedWickrEnterpriseNetworks: D.list(
          i_PermittedWickrEnterpriseNetwork,
        ),
      },
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /networks/{networkId}/users",
    input: {
      networkId: 0,
      userId: 0,
      userDetails: {
        firstName: 0,
        lastName: 0,
        username: 0,
        securityGroupIds: 0,
        inviteCode: 0,
        inviteCodeTtl: 0,
        codeValidation: 0,
      },
    },
    output: { firstName: D.secret, lastName: D.secret },
    body: true,
  },
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
})) as any;

const i_PermittedWickrEnterpriseNetwork: D.LazyStruct = () => ({
  domain: 0,
  networkId: 0,
});
const i_WickrAwsNetworks: D.LazyStruct = () => ({ region: 0, networkId: 0 });
const o_User: D.LazyStruct = () => ({
  firstName: D.secret,
  lastName: D.secret,
});
