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
  sdkId: "Chime",
  target: "UCBuzzConsoleService",
  version: "2018-05-01",
  sigv4: "chime",
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
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              "https://chime.us-east-1.amazonaws.com",
              {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "chime",
                    signingRegion: "us-east-1",
                  },
                ],
              },
              {},
            );
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://chime-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://chime-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://chime.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://chime.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class ForbiddenException
  extends /*@__PURE__*/ TE.TaggedError("ForbiddenException", ["AuthError"], {
    status: 403,
  })<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class ServiceFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceFailureException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { status: 503 },
  )<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class ThrottledClientException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottledClientException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class UnauthorizedClientException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnauthorizedClientException",
    ["AuthError"],
    { status: 401 },
  )<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export class UnprocessableEntityException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnprocessableEntityException",
    ["BadRequestError"],
    { status: 422 },
  )<{ readonly Code?: ErrorCode; readonly message?: string }> {}
export type E164PhoneNumber = string | redacted.Redacted<string>;
export interface AssociatePhoneNumberWithUserRequest {
  AccountId: string;
  UserId: string;
  E164PhoneNumber: string | redacted.Redacted<string>;
}
export interface AssociatePhoneNumberWithUserResponse {}
export type NonEmptyString = string;
export interface SigninDelegateGroup {
  GroupName?: string;
}
export type SigninDelegateGroupList = SigninDelegateGroup[];
export interface AssociateSigninDelegateGroupsWithAccountRequest {
  AccountId: string;
  SigninDelegateGroups: SigninDelegateGroup[];
}
export interface AssociateSigninDelegateGroupsWithAccountResponse {}
export type RoomMembershipRole = "Administrator" | "Member" | (string & {});
export interface MembershipItem {
  MemberId?: string;
  Role?: RoomMembershipRole;
}
export type MembershipItemList = MembershipItem[];
export interface BatchCreateRoomMembershipRequest {
  AccountId: string;
  RoomId: string;
  MembershipItemList: MembershipItem[];
}
export type ErrorCode =
  | "BadRequest"
  | "Conflict"
  | "Forbidden"
  | "NotFound"
  | "PreconditionFailed"
  | "ResourceLimitExceeded"
  | "ServiceFailure"
  | "AccessDenied"
  | "ServiceUnavailable"
  | "Throttled"
  | "Throttling"
  | "Unauthorized"
  | "Unprocessable"
  | "VoiceConnectorGroupAssociationsExist"
  | "PhoneNumberAssociationsExist"
  | (string & {});
export interface MemberError {
  MemberId?: string;
  ErrorCode?: ErrorCode;
  ErrorMessage?: string;
}
export type MemberErrorList = MemberError[];
export interface BatchCreateRoomMembershipResponse {
  Errors?: MemberError[];
}
export type NonEmptyStringList = string[];
export interface BatchDeletePhoneNumberRequest {
  PhoneNumberIds: string[];
}
export interface PhoneNumberError {
  PhoneNumberId?: string;
  ErrorCode?: ErrorCode;
  ErrorMessage?: string;
}
export type PhoneNumberErrorList = PhoneNumberError[];
export interface BatchDeletePhoneNumberResponse {
  PhoneNumberErrors?: PhoneNumberError[];
}
export type UserIdList = string[];
export interface BatchSuspendUserRequest {
  AccountId: string;
  UserIdList: string[];
}
export interface UserError {
  UserId?: string;
  ErrorCode?: ErrorCode;
  ErrorMessage?: string;
}
export type UserErrorList = UserError[];
export interface BatchSuspendUserResponse {
  UserErrors?: UserError[];
}
export interface BatchUnsuspendUserRequest {
  AccountId: string;
  UserIdList: string[];
}
export interface BatchUnsuspendUserResponse {
  UserErrors?: UserError[];
}
export type PhoneNumberProductType =
  | "BusinessCalling"
  | "VoiceConnector"
  | "SipMediaApplicationDialIn"
  | (string & {});
export type CallingName = string | redacted.Redacted<string>;
export interface UpdatePhoneNumberRequestItem {
  PhoneNumberId: string;
  ProductType?: PhoneNumberProductType;
  CallingName?: string | redacted.Redacted<string>;
}
export type UpdatePhoneNumberRequestItemList = UpdatePhoneNumberRequestItem[];
export interface BatchUpdatePhoneNumberRequest {
  UpdatePhoneNumberRequestItems: UpdatePhoneNumberRequestItem[];
}
export interface BatchUpdatePhoneNumberResponse {
  PhoneNumberErrors?: PhoneNumberError[];
}
export type License = "Basic" | "Plus" | "Pro" | "ProTrial" | (string & {});
export type UserType = "PrivateUser" | "SharedDevice" | (string & {});
export type SensitiveString = string | redacted.Redacted<string>;
export interface AlexaForBusinessMetadata {
  IsAlexaForBusinessEnabled?: boolean;
  AlexaForBusinessRoomArn?: string | redacted.Redacted<string>;
}
export interface UpdateUserRequestItem {
  UserId: string;
  LicenseType?: License;
  UserType?: UserType;
  AlexaForBusinessMetadata?: AlexaForBusinessMetadata;
}
export type UpdateUserRequestItemList = UpdateUserRequestItem[];
export interface BatchUpdateUserRequest {
  AccountId: string;
  UpdateUserRequestItems: UpdateUserRequestItem[];
}
export interface BatchUpdateUserResponse {
  UserErrors?: UserError[];
}
export type AccountName = string;
export interface CreateAccountRequest {
  Name: string;
}
export type AccountType =
  | "Team"
  | "EnterpriseDirectory"
  | "EnterpriseLWA"
  | "EnterpriseOIDC"
  | (string & {});
export type Iso8601Timestamp = Date;
export type LicenseList = License[];
export type AccountStatus = "Suspended" | "Active" | (string & {});
export interface Account {
  AwsAccountId: string;
  AccountId: string;
  Name: string;
  AccountType?: AccountType;
  CreatedTimestamp?: Date;
  DefaultLicense?: License;
  SupportedLicenses?: License[];
  AccountStatus?: AccountStatus;
  SigninDelegateGroups?: SigninDelegateGroup[];
}
export interface CreateAccountResponse {
  Account?: Account;
}
export interface CreateBotRequest {
  AccountId: string;
  DisplayName: string | redacted.Redacted<string>;
  Domain?: string;
}
export type BotType = "ChatBot" | (string & {});
export interface Bot {
  BotId?: string;
  UserId?: string;
  DisplayName?: string | redacted.Redacted<string>;
  BotType?: BotType;
  Disabled?: boolean;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  BotEmail?: string | redacted.Redacted<string>;
  SecurityToken?: string | redacted.Redacted<string>;
}
export interface CreateBotResponse {
  Bot?: Bot;
}
export type GuidString = string;
export type JoinTokenString = string | redacted.Redacted<string>;
export interface CreateMeetingDialOutRequest {
  MeetingId: string;
  FromPhoneNumber: string | redacted.Redacted<string>;
  ToPhoneNumber: string | redacted.Redacted<string>;
  JoinToken: string | redacted.Redacted<string>;
}
export interface CreateMeetingDialOutResponse {
  TransactionId?: string;
}
export type E164PhoneNumberList = (string | redacted.Redacted<string>)[];
export interface CreatePhoneNumberOrderRequest {
  ProductType: PhoneNumberProductType;
  E164PhoneNumbers: (string | redacted.Redacted<string>)[];
}
export type PhoneNumberOrderStatus =
  | "Processing"
  | "Successful"
  | "Failed"
  | "Partial"
  | (string & {});
export type OrderedPhoneNumberStatus =
  | "Processing"
  | "Acquired"
  | "Failed"
  | (string & {});
export interface OrderedPhoneNumber {
  E164PhoneNumber?: string | redacted.Redacted<string>;
  Status?: OrderedPhoneNumberStatus;
}
export type OrderedPhoneNumberList = OrderedPhoneNumber[];
export interface PhoneNumberOrder {
  PhoneNumberOrderId?: string;
  ProductType?: PhoneNumberProductType;
  Status?: PhoneNumberOrderStatus;
  OrderedPhoneNumbers?: OrderedPhoneNumber[];
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export interface CreatePhoneNumberOrderResponse {
  PhoneNumberOrder?: PhoneNumberOrder;
}
export type ClientRequestToken = string | redacted.Redacted<string>;
export interface CreateRoomRequest {
  AccountId: string;
  Name: string | redacted.Redacted<string>;
  ClientRequestToken?: string | redacted.Redacted<string>;
}
export interface Room {
  RoomId?: string;
  Name?: string | redacted.Redacted<string>;
  AccountId?: string;
  CreatedBy?: string;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export interface CreateRoomResponse {
  Room?: Room;
}
export interface CreateRoomMembershipRequest {
  AccountId: string;
  RoomId: string;
  MemberId: string;
  Role?: RoomMembershipRole;
}
export type MemberType = "User" | "Bot" | "Webhook" | (string & {});
export interface Member {
  MemberId?: string;
  MemberType?: MemberType;
  Email?: string | redacted.Redacted<string>;
  FullName?: string | redacted.Redacted<string>;
  AccountId?: string;
}
export interface RoomMembership {
  RoomId?: string;
  Member?: Member;
  Role?: RoomMembershipRole;
  InvitedBy?: string;
  UpdatedTimestamp?: Date;
}
export interface CreateRoomMembershipResponse {
  RoomMembership?: RoomMembership;
}
export type EmailAddress = string | redacted.Redacted<string>;
export interface CreateUserRequest {
  AccountId: string;
  Username?: string;
  Email?: string | redacted.Redacted<string>;
  UserType?: UserType;
}
export type RegistrationStatus =
  | "Unregistered"
  | "Registered"
  | "Suspended"
  | (string & {});
export type InviteStatus = "Pending" | "Accepted" | "Failed" | (string & {});
export interface User {
  UserId: string;
  AccountId?: string;
  PrimaryEmail?: string | redacted.Redacted<string>;
  PrimaryProvisionedNumber?: string | redacted.Redacted<string>;
  DisplayName?: string | redacted.Redacted<string>;
  LicenseType?: License;
  UserType?: UserType;
  UserRegistrationStatus?: RegistrationStatus;
  UserInvitationStatus?: InviteStatus;
  RegisteredOn?: Date;
  InvitedOn?: Date;
  AlexaForBusinessMetadata?: AlexaForBusinessMetadata;
  PersonalPIN?: string;
}
export interface CreateUserResponse {
  User?: User;
}
export interface DeleteAccountRequest {
  AccountId: string;
}
export interface DeleteAccountResponse {}
export interface DeleteEventsConfigurationRequest {
  AccountId: string;
  BotId: string;
}
export interface DeleteEventsConfigurationResponse {}
export interface DeletePhoneNumberRequest {
  PhoneNumberId: string;
}
export interface DeletePhoneNumberResponse {}
export interface DeleteRoomRequest {
  AccountId: string;
  RoomId: string;
}
export interface DeleteRoomResponse {}
export interface DeleteRoomMembershipRequest {
  AccountId: string;
  RoomId: string;
  MemberId: string;
}
export interface DeleteRoomMembershipResponse {}
export interface DisassociatePhoneNumberFromUserRequest {
  AccountId: string;
  UserId: string;
}
export interface DisassociatePhoneNumberFromUserResponse {}
export interface DisassociateSigninDelegateGroupsFromAccountRequest {
  AccountId: string;
  GroupNames: string[];
}
export interface DisassociateSigninDelegateGroupsFromAccountResponse {}
export interface GetAccountRequest {
  AccountId: string;
}
export interface GetAccountResponse {
  Account?: Account;
}
export interface GetAccountSettingsRequest {
  AccountId: string;
}
export interface AccountSettings {
  DisableRemoteControl?: boolean;
  EnableDialOut?: boolean;
}
export interface GetAccountSettingsResponse {
  AccountSettings?: AccountSettings;
}
export interface GetBotRequest {
  AccountId: string;
  BotId: string;
}
export interface GetBotResponse {
  Bot?: Bot;
}
export interface GetEventsConfigurationRequest {
  AccountId: string;
  BotId: string;
}
export interface EventsConfiguration {
  BotId?: string;
  OutboundEventsHTTPSEndpoint?: string | redacted.Redacted<string>;
  LambdaFunctionArn?: string | redacted.Redacted<string>;
}
export interface GetEventsConfigurationResponse {
  EventsConfiguration?: EventsConfiguration;
}
export interface GetGlobalSettingsRequest {}
export interface BusinessCallingSettings {
  CdrBucket?: string;
}
export interface VoiceConnectorSettings {
  CdrBucket?: string;
}
export interface GetGlobalSettingsResponse {
  BusinessCalling?: BusinessCallingSettings;
  VoiceConnector?: VoiceConnectorSettings;
}
export interface GetPhoneNumberRequest {
  PhoneNumberId: string;
}
export type Alpha2CountryCode = string;
export type PhoneNumberType = "Local" | "TollFree" | (string & {});
export type PhoneNumberStatus =
  | "AcquireInProgress"
  | "AcquireFailed"
  | "Unassigned"
  | "Assigned"
  | "ReleaseInProgress"
  | "DeleteInProgress"
  | "ReleaseFailed"
  | "DeleteFailed"
  | (string & {});
export interface PhoneNumberCapabilities {
  InboundCall?: boolean;
  OutboundCall?: boolean;
  InboundSMS?: boolean;
  OutboundSMS?: boolean;
  InboundMMS?: boolean;
  OutboundMMS?: boolean;
}
export type PhoneNumberAssociationName =
  | "AccountId"
  | "UserId"
  | "VoiceConnectorId"
  | "VoiceConnectorGroupId"
  | "SipRuleId"
  | (string & {});
export interface PhoneNumberAssociation {
  Value?: string;
  Name?: PhoneNumberAssociationName;
  AssociatedTimestamp?: Date;
}
export type PhoneNumberAssociationList = PhoneNumberAssociation[];
export type CallingNameStatus =
  | "Unassigned"
  | "UpdateInProgress"
  | "UpdateSucceeded"
  | "UpdateFailed"
  | (string & {});
export interface PhoneNumber {
  PhoneNumberId?: string;
  E164PhoneNumber?: string | redacted.Redacted<string>;
  Country?: string;
  Type?: PhoneNumberType;
  ProductType?: PhoneNumberProductType;
  Status?: PhoneNumberStatus;
  Capabilities?: PhoneNumberCapabilities;
  Associations?: PhoneNumberAssociation[];
  CallingName?: string | redacted.Redacted<string>;
  CallingNameStatus?: CallingNameStatus;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  DeletionTimestamp?: Date;
}
export interface GetPhoneNumberResponse {
  PhoneNumber?: PhoneNumber;
}
export interface GetPhoneNumberOrderRequest {
  PhoneNumberOrderId: string;
}
export interface GetPhoneNumberOrderResponse {
  PhoneNumberOrder?: PhoneNumberOrder;
}
export interface GetPhoneNumberSettingsRequest {}
export interface GetPhoneNumberSettingsResponse {
  CallingName?: string | redacted.Redacted<string>;
  CallingNameUpdatedTimestamp?: Date;
}
export interface GetRetentionSettingsRequest {
  AccountId: string;
}
export type RetentionDays = number;
export interface RoomRetentionSettings {
  RetentionDays?: number;
}
export interface ConversationRetentionSettings {
  RetentionDays?: number;
}
export interface RetentionSettings {
  RoomRetentionSettings?: RoomRetentionSettings;
  ConversationRetentionSettings?: ConversationRetentionSettings;
}
export interface GetRetentionSettingsResponse {
  RetentionSettings?: RetentionSettings;
  InitiateDeletionTimestamp?: Date;
}
export interface GetRoomRequest {
  AccountId: string;
  RoomId: string;
}
export interface GetRoomResponse {
  Room?: Room;
}
export interface GetUserRequest {
  AccountId: string;
  UserId: string;
}
export interface GetUserResponse {
  User?: User;
}
export interface GetUserSettingsRequest {
  AccountId: string;
  UserId: string;
}
export interface TelephonySettings {
  InboundCalling: boolean;
  OutboundCalling: boolean;
  SMS: boolean;
}
export interface UserSettings {
  Telephony: TelephonySettings;
}
export interface GetUserSettingsResponse {
  UserSettings?: UserSettings;
}
export type UserEmailList = (string | redacted.Redacted<string>)[];
export interface InviteUsersRequest {
  AccountId: string;
  UserEmailList: (string | redacted.Redacted<string>)[];
  UserType?: UserType;
}
export type EmailStatus = "NotSent" | "Sent" | "Failed" | (string & {});
export interface Invite {
  InviteId?: string;
  Status?: InviteStatus;
  EmailAddress?: string | redacted.Redacted<string>;
  EmailStatus?: EmailStatus;
}
export type InviteList = Invite[];
export interface InviteUsersResponse {
  Invites?: Invite[];
}
export type ProfileServiceMaxResults = number;
export interface ListAccountsRequest {
  Name?: string;
  UserEmail?: string | redacted.Redacted<string>;
  NextToken?: string;
  MaxResults?: number;
}
export type AccountList = Account[];
export interface ListAccountsResponse {
  Accounts?: Account[];
  NextToken?: string;
}
export type ResultMax = number;
export interface ListBotsRequest {
  AccountId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type BotList = Bot[];
export interface ListBotsResponse {
  Bots?: Bot[];
  NextToken?: string;
}
export interface ListPhoneNumberOrdersRequest {
  NextToken?: string;
  MaxResults?: number;
}
export type PhoneNumberOrderList = PhoneNumberOrder[];
export interface ListPhoneNumberOrdersResponse {
  PhoneNumberOrders?: PhoneNumberOrder[];
  NextToken?: string;
}
export interface ListPhoneNumbersRequest {
  Status?: PhoneNumberStatus;
  ProductType?: PhoneNumberProductType;
  FilterName?: PhoneNumberAssociationName;
  FilterValue?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type PhoneNumberList = PhoneNumber[];
export interface ListPhoneNumbersResponse {
  PhoneNumbers?: PhoneNumber[];
  NextToken?: string;
}
export interface ListRoomMembershipsRequest {
  AccountId: string;
  RoomId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type RoomMembershipList = RoomMembership[];
export interface ListRoomMembershipsResponse {
  RoomMemberships?: RoomMembership[];
  NextToken?: string;
}
export interface ListRoomsRequest {
  AccountId: string;
  MemberId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type RoomList = Room[];
export interface ListRoomsResponse {
  Rooms?: Room[];
  NextToken?: string;
}
export interface ListSupportedPhoneNumberCountriesRequest {
  ProductType: PhoneNumberProductType;
}
export type PhoneNumberTypeList = PhoneNumberType[];
export interface PhoneNumberCountry {
  CountryCode?: string;
  SupportedPhoneNumberTypes?: PhoneNumberType[];
}
export type PhoneNumberCountriesList = PhoneNumberCountry[];
export interface ListSupportedPhoneNumberCountriesResponse {
  PhoneNumberCountries?: PhoneNumberCountry[];
}
export interface ListUsersRequest {
  AccountId: string;
  UserEmail?: string | redacted.Redacted<string>;
  UserType?: UserType;
  MaxResults?: number;
  NextToken?: string;
}
export type UserList = User[];
export interface ListUsersResponse {
  Users?: User[];
  NextToken?: string;
}
export interface LogoutUserRequest {
  AccountId: string;
  UserId: string;
}
export interface LogoutUserResponse {}
export interface PutEventsConfigurationRequest {
  AccountId: string;
  BotId: string;
  OutboundEventsHTTPSEndpoint?: string | redacted.Redacted<string>;
  LambdaFunctionArn?: string | redacted.Redacted<string>;
}
export interface PutEventsConfigurationResponse {
  EventsConfiguration?: EventsConfiguration;
}
export interface PutRetentionSettingsRequest {
  AccountId: string;
  RetentionSettings: RetentionSettings;
}
export interface PutRetentionSettingsResponse {
  RetentionSettings?: RetentionSettings;
  InitiateDeletionTimestamp?: Date;
}
export interface RedactConversationMessageRequest {
  AccountId: string;
  ConversationId: string;
  MessageId: string;
}
export interface RedactConversationMessageResponse {}
export interface RedactRoomMessageRequest {
  AccountId: string;
  RoomId: string;
  MessageId: string;
}
export interface RedactRoomMessageResponse {}
export interface RegenerateSecurityTokenRequest {
  AccountId: string;
  BotId: string;
}
export interface RegenerateSecurityTokenResponse {
  Bot?: Bot;
}
export interface ResetPersonalPINRequest {
  AccountId: string;
  UserId: string;
}
export interface ResetPersonalPINResponse {
  User?: User;
}
export interface RestorePhoneNumberRequest {
  PhoneNumberId: string;
}
export interface RestorePhoneNumberResponse {
  PhoneNumber?: PhoneNumber;
}
export type TollFreePrefix = string;
export type PhoneNumberMaxResults = number;
export interface SearchAvailablePhoneNumbersRequest {
  AreaCode?: string;
  City?: string;
  Country?: string;
  State?: string;
  TollFreePrefix?: string;
  PhoneNumberType?: PhoneNumberType;
  MaxResults?: number;
  NextToken?: string;
}
export interface SearchAvailablePhoneNumbersResponse {
  E164PhoneNumbers?: (string | redacted.Redacted<string>)[];
  NextToken?: string;
}
export interface UpdateAccountRequest {
  AccountId: string;
  Name?: string;
  DefaultLicense?: License;
}
export interface UpdateAccountResponse {
  Account?: Account;
}
export interface UpdateAccountSettingsRequest {
  AccountId: string;
  AccountSettings: AccountSettings;
}
export interface UpdateAccountSettingsResponse {}
export interface UpdateBotRequest {
  AccountId: string;
  BotId: string;
  Disabled?: boolean;
}
export interface UpdateBotResponse {
  Bot?: Bot;
}
export interface UpdateGlobalSettingsRequest {
  BusinessCalling?: BusinessCallingSettings;
  VoiceConnector?: VoiceConnectorSettings;
}
export interface UpdateGlobalSettingsResponse {}
export interface UpdatePhoneNumberRequest {
  PhoneNumberId: string;
  ProductType?: PhoneNumberProductType;
  CallingName?: string | redacted.Redacted<string>;
}
export interface UpdatePhoneNumberResponse {
  PhoneNumber?: PhoneNumber;
}
export interface UpdatePhoneNumberSettingsRequest {
  CallingName: string | redacted.Redacted<string>;
}
export interface UpdatePhoneNumberSettingsResponse {}
export interface UpdateRoomRequest {
  AccountId: string;
  RoomId: string;
  Name?: string | redacted.Redacted<string>;
}
export interface UpdateRoomResponse {
  Room?: Room;
}
export interface UpdateRoomMembershipRequest {
  AccountId: string;
  RoomId: string;
  MemberId: string;
  Role?: RoomMembershipRole;
}
export interface UpdateRoomMembershipResponse {
  RoomMembership?: RoomMembership;
}
export interface UpdateUserRequest {
  AccountId: string;
  UserId: string;
  LicenseType?: License;
  UserType?: UserType;
  AlexaForBusinessMetadata?: AlexaForBusinessMetadata;
}
export interface UpdateUserResponse {
  User?: User;
}
export interface UpdateUserSettingsRequest {
  AccountId: string;
  UserId: string;
  UserSettings: UserSettings;
}
export interface UpdateUserSettingsResponse {}
export type AssociatePhoneNumberWithUserError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Associates a phone number with the specified Amazon Chime user.
 */
export const associatePhoneNumberWithUser: API.OperationMethod<
  AssociatePhoneNumberWithUserRequest,
  AssociatePhoneNumberWithUserResponse,
  AssociatePhoneNumberWithUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AccountId}/users/{UserId}?operation=associate-phone-number",
    input: { AccountId: 0, UserId: 0, E164PhoneNumber: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociatePhoneNumberWithUser",
})) as any;

export type AssociateSigninDelegateGroupsWithAccountError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Associates the specified sign-in delegate groups with the specified Amazon Chime account.
 */
export const associateSigninDelegateGroupsWithAccount: API.OperationMethod<
  AssociateSigninDelegateGroupsWithAccountRequest,
  AssociateSigninDelegateGroupsWithAccountResponse,
  AssociateSigninDelegateGroupsWithAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AccountId}?operation=associate-signin-delegate-groups",
    input: { AccountId: 0, SigninDelegateGroups: D.list({ GroupName: 0 }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateSigninDelegateGroupsWithAccount",
})) as any;

export type BatchCreateRoomMembershipError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Adds up to 50 members to a chat room in an Amazon Chime Enterprise account. Members can be users or bots. The member role designates whether the member is a
 * chat room administrator or a general chat room member.
 */
export const batchCreateRoomMembership: API.OperationMethod<
  BatchCreateRoomMembershipRequest,
  BatchCreateRoomMembershipResponse,
  BatchCreateRoomMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AccountId}/rooms/{RoomId}/memberships?operation=batch-create",
    input: {
      AccountId: 0,
      RoomId: 0,
      MembershipItemList: D.list({ MemberId: 0, Role: 0 }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateRoomMembership",
})) as any;

export type BatchDeletePhoneNumberError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Moves phone numbers into the
 * **Deletion queue**. Phone numbers must be disassociated from any users or Amazon Chime Voice Connectors before they can be deleted.
 *
 * Phone numbers remain in the
 * **Deletion queue** for 7 days before they are deleted permanently.
 */
export const batchDeletePhoneNumber: API.OperationMethod<
  BatchDeletePhoneNumberRequest,
  BatchDeletePhoneNumberResponse,
  BatchDeletePhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /phone-numbers?operation=batch-delete",
    input: { PhoneNumberIds: 0 },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeletePhoneNumber",
})) as any;

export type BatchSuspendUserError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Suspends up to 50 users from a `Team` or `EnterpriseLWA` Amazon Chime
 * account. For more information about different account types, see Managing Your Amazon Chime Accounts in the Amazon Chime Administration
 * Guide.
 *
 * Users suspended from a `Team` account are disassociated from the account,but they
 * can continue to use Amazon Chime as free users. To remove the suspension from suspended
 * `Team` account users, invite them to the `Team` account again.
 * You can use the InviteUsers action to do so.
 *
 * Users suspended from an `EnterpriseLWA` account are immediately signed out of
 * Amazon Chime and can no longer sign in. To remove the suspension from suspended `EnterpriseLWA` account users, use the
 * BatchUnsuspendUser action.
 *
 * To sign out users without suspending them, use the
 * LogoutUser action.
 */
export const batchSuspendUser: API.OperationMethod<
  BatchSuspendUserRequest,
  BatchSuspendUserResponse,
  BatchSuspendUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AccountId}/users?operation=suspend",
    input: { AccountId: 0, UserIdList: 0 },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchSuspendUser",
})) as any;

export type BatchUnsuspendUserError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Removes the suspension from up to 50 previously suspended users for the specified Amazon
 * Chime `EnterpriseLWA` account. Only users on `EnterpriseLWA`
 * accounts can be unsuspended using this action. For more information about different account types, see
 *
 * Managing Your Amazon Chime Accounts
 * in the account types, in the *Amazon Chime Administration Guide*.
 *
 * Previously suspended users who are unsuspended using this action are returned to
 * `Registered`
 * status. Users who are not previously suspended are ignored.
 */
export const batchUnsuspendUser: API.OperationMethod<
  BatchUnsuspendUserRequest,
  BatchUnsuspendUserResponse,
  BatchUnsuspendUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AccountId}/users?operation=unsuspend",
    input: { AccountId: 0, UserIdList: 0 },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUnsuspendUser",
})) as any;

export type BatchUpdatePhoneNumberError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates phone number product types or calling names. You can update one attribute at a time for each `UpdatePhoneNumberRequestItem`. For example, you can update the product type or the calling name.
 *
 * For toll-free numbers, you cannot use the Amazon Chime Business Calling product type. For numbers outside the U.S., you must use the Amazon Chime SIP Media Application Dial-In product type.
 *
 * Updates to outbound calling names can take up to 72 hours to complete. Pending updates to outbound calling names must be complete before you can request another update.
 */
export const batchUpdatePhoneNumber: API.OperationMethod<
  BatchUpdatePhoneNumberRequest,
  BatchUpdatePhoneNumberResponse,
  BatchUpdatePhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /phone-numbers?operation=batch-update",
    input: {
      UpdatePhoneNumberRequestItems: D.list({
        PhoneNumberId: 0,
        ProductType: 0,
        CallingName: 0,
      }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdatePhoneNumber",
})) as any;

export type BatchUpdateUserError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates user details within the UpdateUserRequestItem object for up to 20 users for the specified Amazon Chime account. Currently, only `LicenseType` updates are supported for this action.
 */
export const batchUpdateUser: API.OperationMethod<
  BatchUpdateUserRequest,
  BatchUpdateUserResponse,
  BatchUpdateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AccountId}/users",
    input: {
      AccountId: 0,
      UpdateUserRequestItems: D.list({
        UserId: 0,
        LicenseType: 0,
        UserType: 0,
        AlexaForBusinessMetadata: i_AlexaForBusinessMetadata,
      }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateUser",
})) as any;

export type CreateAccountError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates an Amazon Chime account under the administrator's AWS account. Only `Team`
 * account types are currently supported for this action. For more information about different account types, see
 * Managing Your Amazon Chime Accounts in the Amazon Chime
 * Administration Guide.
 */
export const createAccount: API.OperationMethod<
  CreateAccountRequest,
  CreateAccountResponse,
  CreateAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts",
    input: { Name: 0 },
    output: { Account: o_Account },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccount",
})) as any;

export type CreateBotError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates a bot for an Amazon Chime Enterprise account.
 */
export const createBot: API.OperationMethod<
  CreateBotRequest,
  CreateBotResponse,
  CreateBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AccountId}/bots",
    input: { AccountId: 0, DisplayName: 0, Domain: 0 },
    output: { Bot: o_Bot },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBot",
})) as any;

export type CreateMeetingDialOutError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Uses the join token and call metadata in a meeting request (From number, To number, and so forth) to initiate an outbound call to a public
 * switched telephone network (PSTN) and join them into a Chime meeting. Also ensures that the From number belongs to the customer.
 *
 * To play welcome audio or implement an interactive voice response (IVR), use the
 * `CreateSipMediaApplicationCall` action with the corresponding SIP media application ID.
 *
 * **This API is not available in a dedicated namespace.**
 */
export const createMeetingDialOut: API.OperationMethod<
  CreateMeetingDialOutRequest,
  CreateMeetingDialOutResponse,
  CreateMeetingDialOutError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /meetings/{MeetingId}/dial-outs",
    input: { MeetingId: 0, FromPhoneNumber: 0, ToPhoneNumber: 0, JoinToken: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMeetingDialOut",
})) as any;

export type CreatePhoneNumberOrderError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates an order for phone numbers to be provisioned. For toll-free numbers, you cannot use the Amazon Chime Business Calling product type.
 * For numbers outside the U.S., you must use the Amazon Chime SIP Media Application Dial-In product type.
 */
export const createPhoneNumberOrder: API.OperationMethod<
  CreatePhoneNumberOrderRequest,
  CreatePhoneNumberOrderResponse,
  CreatePhoneNumberOrderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /phone-number-orders",
    input: { ProductType: 0, E164PhoneNumbers: 0 },
    output: { PhoneNumberOrder: o_PhoneNumberOrder },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePhoneNumberOrder",
})) as any;

export type CreateRoomError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates a chat room for the specified Amazon Chime Enterprise account.
 */
export const createRoom: API.OperationMethod<
  CreateRoomRequest,
  CreateRoomResponse,
  CreateRoomError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AccountId}/rooms",
    input: {
      AccountId: 0,
      Name: 0,
      ClientRequestToken: D.m({ idempotency: true }),
    },
    output: { Room: o_Room },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRoom",
})) as any;

export type CreateRoomMembershipError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Adds a member to a chat room in an Amazon Chime Enterprise account. A member can be either a user or a bot. The member role designates whether the member is a chat room administrator or a general chat room member.
 */
export const createRoomMembership: API.OperationMethod<
  CreateRoomMembershipRequest,
  CreateRoomMembershipResponse,
  CreateRoomMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AccountId}/rooms/{RoomId}/memberships",
    input: { AccountId: 0, RoomId: 0, MemberId: 0, Role: 0 },
    output: { RoomMembership: o_RoomMembership },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRoomMembership",
})) as any;

export type CreateUserError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates a user under the specified Amazon Chime account.
 */
export const createUser: API.OperationMethod<
  CreateUserRequest,
  CreateUserResponse,
  CreateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AccountId}/users?operation=create",
    input: { AccountId: 0, Username: 0, Email: 0, UserType: 0 },
    output: { User: o_User },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUser",
})) as any;

export type DeleteAccountError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Deletes the specified Amazon Chime account. You must suspend all users before deleting
 * `Team` account. You can use the BatchSuspendUser action
 * to dodo.
 *
 * For `EnterpriseLWA` and `EnterpriseAD` accounts, you must release the
 * claimed domains for your Amazon Chime account before deletion. As soon as you release
 * the domain, all users under that account are suspended.
 *
 * Deleted accounts appear in your `Disabled` accounts list for 90 days. To restore
 * deleted account from your `Disabled` accounts list, you must contact AWS
 * Support.
 *
 * After 90 days, deleted accounts are permanently removed from your
 * `Disabled` accounts list.
 */
export const deleteAccount: API.OperationMethod<
  DeleteAccountRequest,
  DeleteAccountResponse,
  DeleteAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AccountId}",
    input: { AccountId: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccount",
})) as any;

export type DeleteEventsConfigurationError =
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes the events configuration that allows a bot to receive outgoing events.
 */
export const deleteEventsConfiguration: API.OperationMethod<
  DeleteEventsConfigurationRequest,
  DeleteEventsConfigurationResponse,
  DeleteEventsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AccountId}/bots/{BotId}/events-configuration",
    input: { AccountId: 0, BotId: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventsConfiguration",
})) as any;

export type DeletePhoneNumberError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Moves the specified phone number into the **Deletion queue**. A
 * phone number must be disassociated from any users or Amazon Chime Voice Connectors
 * before it can be deleted.
 *
 * Deleted phone numbers remain in the
 * **Deletion queue**
 * for 7 days before they are deleted permanently.
 */
export const deletePhoneNumber: API.OperationMethod<
  DeletePhoneNumberRequest,
  DeletePhoneNumberResponse,
  DeletePhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /phone-numbers/{PhoneNumberId}",
    input: { PhoneNumberId: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePhoneNumber",
})) as any;

export type DeleteRoomError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes a chat room in an Amazon Chime Enterprise account.
 */
export const deleteRoom: API.OperationMethod<
  DeleteRoomRequest,
  DeleteRoomResponse,
  DeleteRoomError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AccountId}/rooms/{RoomId}",
    input: { AccountId: 0, RoomId: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRoom",
})) as any;

export type DeleteRoomMembershipError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Removes a member from a chat room in an Amazon Chime Enterprise account.
 */
export const deleteRoomMembership: API.OperationMethod<
  DeleteRoomMembershipRequest,
  DeleteRoomMembershipResponse,
  DeleteRoomMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AccountId}/rooms/{RoomId}/memberships/{MemberId}",
    input: { AccountId: 0, RoomId: 0, MemberId: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRoomMembership",
})) as any;

export type DisassociatePhoneNumberFromUserError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Disassociates the primary provisioned phone number from the specified Amazon Chime user.
 */
export const disassociatePhoneNumberFromUser: API.OperationMethod<
  DisassociatePhoneNumberFromUserRequest,
  DisassociatePhoneNumberFromUserResponse,
  DisassociatePhoneNumberFromUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AccountId}/users/{UserId}?operation=disassociate-phone-number",
    input: { AccountId: 0, UserId: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociatePhoneNumberFromUser",
})) as any;

export type DisassociateSigninDelegateGroupsFromAccountError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Disassociates the specified sign-in delegate groups from the specified Amazon Chime account.
 */
export const disassociateSigninDelegateGroupsFromAccount: API.OperationMethod<
  DisassociateSigninDelegateGroupsFromAccountRequest,
  DisassociateSigninDelegateGroupsFromAccountResponse,
  DisassociateSigninDelegateGroupsFromAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AccountId}?operation=disassociate-signin-delegate-groups",
    input: { AccountId: 0, GroupNames: 0 },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateSigninDelegateGroupsFromAccount",
})) as any;

export type GetAccountError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves details for the specified Amazon Chime account, such as account type and supported
 * licenses.
 */
export const getAccount: API.OperationMethod<
  GetAccountRequest,
  GetAccountResponse,
  GetAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AccountId}",
    input: { AccountId: 0 },
    output: { Account: o_Account },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccount",
})) as any;

export type GetAccountSettingsError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves account settings for the specified Amazon Chime account ID, such as remote control
 * and dialout settings. For more information about these settings, see
 * Use the Policies Page in the *Amazon Chime Administration Guide*.
 */
export const getAccountSettings: API.OperationMethod<
  GetAccountSettingsRequest,
  GetAccountSettingsResponse,
  GetAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AccountId}/settings",
    input: { AccountId: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountSettings",
})) as any;

export type GetBotError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves details for the specified bot, such as bot email address, bot type, status, and display name.
 */
export const getBot: API.OperationMethod<
  GetBotRequest,
  GetBotResponse,
  GetBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AccountId}/bots/{BotId}",
    input: { AccountId: 0, BotId: 0 },
    output: { Bot: o_Bot },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBot",
})) as any;

export type GetEventsConfigurationError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Gets details for an events configuration that allows a bot to receive outgoing events, such as an HTTPS endpoint or Lambda function ARN.
 */
export const getEventsConfiguration: API.OperationMethod<
  GetEventsConfigurationRequest,
  GetEventsConfigurationResponse,
  GetEventsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AccountId}/bots/{BotId}/events-configuration",
    input: { AccountId: 0, BotId: 0 },
    output: { EventsConfiguration: o_EventsConfiguration },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventsConfiguration",
})) as any;

export type GetGlobalSettingsError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves global settings for the administrator's AWS account, such as Amazon Chime Business
 * Calling and Amazon Chime Voice Connector settings.
 */
export const getGlobalSettings: API.OperationMethod<
  GetGlobalSettingsRequest,
  GetGlobalSettingsResponse,
  GetGlobalSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /settings" },
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGlobalSettings",
})) as any;

export type GetPhoneNumberError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves details for the specified phone number ID, such as associations, capabilities, and product type.
 */
export const getPhoneNumber: API.OperationMethod<
  GetPhoneNumberRequest,
  GetPhoneNumberResponse,
  GetPhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /phone-numbers/{PhoneNumberId}",
    input: { PhoneNumberId: 0 },
    output: { PhoneNumber: o_PhoneNumber },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPhoneNumber",
})) as any;

export type GetPhoneNumberOrderError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves details for the specified phone number order, such as the order creation timestamp, phone
 * numbers in E.164 format, product type, and order status.
 */
export const getPhoneNumberOrder: API.OperationMethod<
  GetPhoneNumberOrderRequest,
  GetPhoneNumberOrderResponse,
  GetPhoneNumberOrderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /phone-number-orders/{PhoneNumberOrderId}",
    input: { PhoneNumberOrderId: 0 },
    output: { PhoneNumberOrder: o_PhoneNumberOrder },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPhoneNumberOrder",
})) as any;

export type GetPhoneNumberSettingsError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves the phone number settings for the administrator's AWS account, such as the default outbound calling name.
 */
export const getPhoneNumberSettings: API.OperationMethod<
  GetPhoneNumberSettingsRequest,
  GetPhoneNumberSettingsResponse,
  GetPhoneNumberSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /settings/phone-number",
    output: { CallingName: D.secret, CallingNameUpdatedTimestamp: D.ts },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPhoneNumberSettings",
})) as any;

export type GetRetentionSettingsError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Gets the retention settings for the specified Amazon Chime Enterprise account. For more information about retention settings, see
 * Managing Chat Retention Policies in the *Amazon Chime Administration Guide*.
 */
export const getRetentionSettings: API.OperationMethod<
  GetRetentionSettingsRequest,
  GetRetentionSettingsResponse,
  GetRetentionSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AccountId}/retention-settings",
    input: { AccountId: 0 },
    output: { InitiateDeletionTimestamp: D.ts },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRetentionSettings",
})) as any;

export type GetRoomError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves room details, such as the room name, for a room in an Amazon Chime Enterprise account.
 */
export const getRoom: API.OperationMethod<
  GetRoomRequest,
  GetRoomResponse,
  GetRoomError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AccountId}/rooms/{RoomId}",
    input: { AccountId: 0, RoomId: 0 },
    output: { Room: o_Room },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRoom",
})) as any;

export type GetUserError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves details for the specified user ID, such as primary email address, license type,and personal meeting PIN.
 *
 * To retrieve user details with an email address instead of a user ID, use the
 * ListUsers action, and then filter by email address.
 */
export const getUser: API.OperationMethod<
  GetUserRequest,
  GetUserResponse,
  GetUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AccountId}/users/{UserId}",
    input: { AccountId: 0, UserId: 0 },
    output: { User: o_User },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUser",
})) as any;

export type GetUserSettingsError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves settings for the specified user ID, such as any associated phone number settings.
 */
export const getUserSettings: API.OperationMethod<
  GetUserSettingsRequest,
  GetUserSettingsResponse,
  GetUserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AccountId}/users/{UserId}/settings",
    input: { AccountId: 0, UserId: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserSettings",
})) as any;

export type InviteUsersError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Sends email to a maximum of 50 users, inviting them to the specified Amazon Chime
 * `Team` account. Only `Team` account types are currently
 * supported for this action.
 */
export const inviteUsers: API.OperationMethod<
  InviteUsersRequest,
  InviteUsersResponse,
  InviteUsersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AccountId}/users?operation=add",
    input: { AccountId: 0, UserEmailList: 0, UserType: 0 },
    output: { Invites: D.list({ EmailAddress: D.secret }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InviteUsers",
})) as any;

export type ListAccountsError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the Amazon Chime accounts under the administrator's AWS account. You can filter accounts
 * by account name prefix. To find out which Amazon Chime account a user belongs to, you can
 * filter by the user's email address, which returns one account result.
 */
export const listAccounts: API.PaginatedOperationMethod<
  ListAccountsRequest,
  ListAccountsResponse,
  ListAccountsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts",
    input: {
      Name: D.m({ query: "name" }),
      UserEmail: D.m({ query: "user-email" }),
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: { Accounts: D.list(o_Account) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccounts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListBotsError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the bots associated with the administrator's Amazon Chime Enterprise account ID.
 */
export const listBots: API.PaginatedOperationMethod<
  ListBotsRequest,
  ListBotsResponse,
  ListBotsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AccountId}/bots",
    input: {
      AccountId: 0,
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: { Bots: D.list(o_Bot) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBots",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPhoneNumberOrdersError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the phone number orders for the administrator's Amazon Chime account.
 */
export const listPhoneNumberOrders: API.PaginatedOperationMethod<
  ListPhoneNumberOrdersRequest,
  ListPhoneNumberOrdersResponse,
  ListPhoneNumberOrdersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /phone-number-orders",
    input: {
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: { PhoneNumberOrders: D.list(o_PhoneNumberOrder) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPhoneNumberOrders",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPhoneNumbersError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the phone numbers for the specified Amazon Chime account, Amazon Chime user, Amazon Chime Voice Connector, or Amazon Chime Voice Connector group.
 */
export const listPhoneNumbers: API.PaginatedOperationMethod<
  ListPhoneNumbersRequest,
  ListPhoneNumbersResponse,
  ListPhoneNumbersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /phone-numbers",
    input: {
      Status: D.m({ query: "status" }),
      ProductType: D.m({ query: "product-type" }),
      FilterName: D.m({ query: "filter-name" }),
      FilterValue: D.m({ query: "filter-value" }),
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: { PhoneNumbers: D.list(o_PhoneNumber) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPhoneNumbers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRoomMembershipsError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the membership details for the specified room in an Amazon Chime Enterprise account,
 * such as the members' IDs, email addresses, and names.
 */
export const listRoomMemberships: API.PaginatedOperationMethod<
  ListRoomMembershipsRequest,
  ListRoomMembershipsResponse,
  ListRoomMembershipsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AccountId}/rooms/{RoomId}/memberships",
    input: {
      AccountId: 0,
      RoomId: 0,
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: { RoomMemberships: D.list(o_RoomMembership) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRoomMemberships",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRoomsError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the room details for the specified Amazon Chime Enterprise account. Optionally, filter the results by a member ID (user ID or bot ID) to see a list of rooms that the member belongs to.
 */
export const listRooms: API.PaginatedOperationMethod<
  ListRoomsRequest,
  ListRoomsResponse,
  ListRoomsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AccountId}/rooms",
    input: {
      AccountId: 0,
      MemberId: D.m({ query: "member-id" }),
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: { Rooms: D.list(o_Room) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRooms",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSupportedPhoneNumberCountriesError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists supported phone number countries.
 */
export const listSupportedPhoneNumberCountries: API.OperationMethod<
  ListSupportedPhoneNumberCountriesRequest,
  ListSupportedPhoneNumberCountriesResponse,
  ListSupportedPhoneNumberCountriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /phone-number-countries",
    input: { ProductType: D.m({ query: "product-type" }) },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSupportedPhoneNumberCountries",
})) as any;

export type ListUsersError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the users that belong to the specified Amazon Chime account. You can specify an email
 * address to list only the user that the email address belongs to.
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
    http: "GET /accounts/{AccountId}/users",
    input: {
      AccountId: 0,
      UserEmail: D.m({ query: "user-email" }),
      UserType: D.m({ query: "user-type" }),
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: { Users: D.list(o_User) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
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

export type LogoutUserError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Logs out the specified user from all of the devices they are currently logged into.
 */
export const logoutUser: API.OperationMethod<
  LogoutUserRequest,
  LogoutUserResponse,
  LogoutUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AccountId}/users/{UserId}?operation=logout",
    input: { AccountId: 0, UserId: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "LogoutUser",
})) as any;

export type PutEventsConfigurationError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates an events configuration that allows a bot to receive outgoing events sent by Amazon
 * Chime. Choose either an HTTPS endpoint or a Lambda function ARN. For more information,
 * see Bot.
 */
export const putEventsConfiguration: API.OperationMethod<
  PutEventsConfigurationRequest,
  PutEventsConfigurationResponse,
  PutEventsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AccountId}/bots/{BotId}/events-configuration",
    input: {
      AccountId: 0,
      BotId: 0,
      OutboundEventsHTTPSEndpoint: 0,
      LambdaFunctionArn: 0,
    },
    output: { EventsConfiguration: o_EventsConfiguration },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEventsConfiguration",
})) as any;

export type PutRetentionSettingsError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Puts retention settings for the specified Amazon Chime Enterprise account. We recommend using AWS CloudTrail to monitor usage of this API for your account. For more information, see
 * Logging Amazon Chime API Calls with AWS CloudTrail
 * in the *Amazon Chime Administration Guide*.
 *
 * To turn off existing retention settings, remove the number of days from the corresponding
 * **RetentionDays**
 * field in the
 * **RetentionSettings**
 * object. For more information about retention settings, see
 * Managing Chat Retention Policies
 * in the *Amazon Chime Administration Guide*.
 */
export const putRetentionSettings: API.OperationMethod<
  PutRetentionSettingsRequest,
  PutRetentionSettingsResponse,
  PutRetentionSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AccountId}/retention-settings",
    input: {
      AccountId: 0,
      RetentionSettings: {
        RoomRetentionSettings: { RetentionDays: 0 },
        ConversationRetentionSettings: { RetentionDays: 0 },
      },
    },
    output: { InitiateDeletionTimestamp: D.ts },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRetentionSettings",
})) as any;

export type RedactConversationMessageError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Redacts the specified message from the specified Amazon Chime conversation.
 */
export const redactConversationMessage: API.OperationMethod<
  RedactConversationMessageRequest,
  RedactConversationMessageResponse,
  RedactConversationMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AccountId}/conversations/{ConversationId}/messages/{MessageId}?operation=redact",
    input: { AccountId: 0, ConversationId: 0, MessageId: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RedactConversationMessage",
})) as any;

export type RedactRoomMessageError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Redacts the specified message from the specified Amazon Chime channel.
 */
export const redactRoomMessage: API.OperationMethod<
  RedactRoomMessageRequest,
  RedactRoomMessageResponse,
  RedactRoomMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AccountId}/rooms/{RoomId}/messages/{MessageId}?operation=redact",
    input: { AccountId: 0, RoomId: 0, MessageId: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RedactRoomMessage",
})) as any;

export type RegenerateSecurityTokenError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Regenerates the security token for a bot.
 */
export const regenerateSecurityToken: API.OperationMethod<
  RegenerateSecurityTokenRequest,
  RegenerateSecurityTokenResponse,
  RegenerateSecurityTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AccountId}/bots/{BotId}?operation=regenerate-security-token",
    input: { AccountId: 0, BotId: 0 },
    output: { Bot: o_Bot },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegenerateSecurityToken",
})) as any;

export type ResetPersonalPINError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Resets the personal meeting PIN for the specified user on an Amazon Chime account. Returns
 * the User object with the updated personal meeting PIN.
 */
export const resetPersonalPIN: API.OperationMethod<
  ResetPersonalPINRequest,
  ResetPersonalPINResponse,
  ResetPersonalPINError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AccountId}/users/{UserId}?operation=reset-personal-pin",
    input: { AccountId: 0, UserId: 0 },
    output: { User: o_User },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetPersonalPIN",
})) as any;

export type RestorePhoneNumberError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Moves a phone number from the **Deletion queue** back into the
 * phone number **Inventory**.
 */
export const restorePhoneNumber: API.OperationMethod<
  RestorePhoneNumberRequest,
  RestorePhoneNumberResponse,
  RestorePhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /phone-numbers/{PhoneNumberId}?operation=restore",
    input: { PhoneNumberId: 0 },
    output: { PhoneNumber: o_PhoneNumber },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestorePhoneNumber",
})) as any;

export type SearchAvailablePhoneNumbersError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Searches for phone numbers that can be ordered. For US numbers, provide at least one of
 * the following search filters: `AreaCode`, `City`,
 * `State`, or `TollFreePrefix`. If you provide
 * `City`, you must also provide `State`. Numbers outside the US only
 * support the `PhoneNumberType` filter, which you must use.
 */
export const searchAvailablePhoneNumbers: API.PaginatedOperationMethod<
  SearchAvailablePhoneNumbersRequest,
  SearchAvailablePhoneNumbersResponse,
  SearchAvailablePhoneNumbersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /search?type=phone-numbers",
    input: {
      AreaCode: D.m({ query: "area-code" }),
      City: D.m({ query: "city" }),
      Country: D.m({ query: "country" }),
      State: D.m({ query: "state" }),
      TollFreePrefix: D.m({ query: "toll-free-prefix" }),
      PhoneNumberType: D.m({ query: "phone-number-type" }),
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: { E164PhoneNumbers: D.list(D.secret) },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchAvailablePhoneNumbers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type UpdateAccountError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates account details for the specified Amazon Chime account. Currently, only account name and default license updates are supported for this action.
 */
export const updateAccount: API.OperationMethod<
  UpdateAccountRequest,
  UpdateAccountResponse,
  UpdateAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AccountId}",
    input: { AccountId: 0, Name: 0, DefaultLicense: 0 },
    output: { Account: o_Account },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccount",
})) as any;

export type UpdateAccountSettingsError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates the settings for the specified Amazon Chime account. You can update settings for
 * remote control of shared screens, or for the dial-out option. For more information about
 * these settings, see Use
 * the Policies Page in the Amazon Chime Administration
 * Guide.
 */
export const updateAccountSettings: API.OperationMethod<
  UpdateAccountSettingsRequest,
  UpdateAccountSettingsResponse,
  UpdateAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AccountId}/settings",
    input: {
      AccountId: 0,
      AccountSettings: { DisableRemoteControl: 0, EnableDialOut: 0 },
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountSettings",
})) as any;

export type UpdateBotError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates the status of the specified bot, such as starting or stopping the bot from running in your Amazon Chime Enterprise account.
 */
export const updateBot: API.OperationMethod<
  UpdateBotRequest,
  UpdateBotResponse,
  UpdateBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AccountId}/bots/{BotId}",
    input: { AccountId: 0, BotId: 0, Disabled: 0 },
    output: { Bot: o_Bot },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBot",
})) as any;

export type UpdateGlobalSettingsError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates global settings for the administrator's AWS account, such as Amazon Chime Business Calling and Amazon Chime Voice Connector settings.
 */
export const updateGlobalSettings: API.OperationMethod<
  UpdateGlobalSettingsRequest,
  UpdateGlobalSettingsResponse,
  UpdateGlobalSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /settings",
    input: {
      BusinessCalling: { CdrBucket: 0 },
      VoiceConnector: { CdrBucket: 0 },
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGlobalSettings",
})) as any;

export type UpdatePhoneNumberError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates phone number details, such as product type or calling name, for the specified phone number ID. You can update one phone number detail at a time. For example, you can update either the product type or the calling name in one action.
 *
 * For toll-free numbers, you cannot use the Amazon Chime Business Calling product type. For numbers outside the U.S., you must use the Amazon Chime SIP Media Application Dial-In product type.
 *
 * Updates to outbound calling names can take 72 hours to complete. Pending updates to outbound calling names must be complete before you can request another update.
 */
export const updatePhoneNumber: API.OperationMethod<
  UpdatePhoneNumberRequest,
  UpdatePhoneNumberResponse,
  UpdatePhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /phone-numbers/{PhoneNumberId}",
    input: { PhoneNumberId: 0, ProductType: 0, CallingName: 0 },
    output: { PhoneNumber: o_PhoneNumber },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePhoneNumber",
})) as any;

export type UpdatePhoneNumberSettingsError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates the phone number settings for the administrator's AWS account, such as the default
 * outbound calling name. You can update the default outbound calling name once every seven
 * days. Outbound calling names can take up to 72 hours to update.
 */
export const updatePhoneNumberSettings: API.OperationMethod<
  UpdatePhoneNumberSettingsRequest,
  UpdatePhoneNumberSettingsResponse,
  UpdatePhoneNumberSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /settings/phone-number",
    input: { CallingName: 0 },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePhoneNumberSettings",
})) as any;

export type UpdateRoomError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates room details, such as the room name, for a room in an Amazon Chime Enterprise account.
 */
export const updateRoom: API.OperationMethod<
  UpdateRoomRequest,
  UpdateRoomResponse,
  UpdateRoomError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AccountId}/rooms/{RoomId}",
    input: { AccountId: 0, RoomId: 0, Name: 0 },
    output: { Room: o_Room },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRoom",
})) as any;

export type UpdateRoomMembershipError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates room membership details, such as the member role, for a room in an Amazon Chime
 * Enterprise account. The member role designates whether the member is a chat room
 * administrator or a general chat room member. The member role can be updated only for
 * user IDs.
 */
export const updateRoomMembership: API.OperationMethod<
  UpdateRoomMembershipRequest,
  UpdateRoomMembershipResponse,
  UpdateRoomMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AccountId}/rooms/{RoomId}/memberships/{MemberId}",
    input: { AccountId: 0, RoomId: 0, MemberId: 0, Role: 0 },
    output: { RoomMembership: o_RoomMembership },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRoomMembership",
})) as any;

export type UpdateUserError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates user details for a specified user ID. Currently, only `LicenseType` updates are supported for this action.
 */
export const updateUser: API.OperationMethod<
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AccountId}/users/{UserId}",
    input: {
      AccountId: 0,
      UserId: 0,
      LicenseType: 0,
      UserType: 0,
      AlexaForBusinessMetadata: i_AlexaForBusinessMetadata,
    },
    output: { User: o_User },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUser",
})) as any;

export type UpdateUserSettingsError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates the settings for the specified user, such as phone number settings.
 */
export const updateUserSettings: API.OperationMethod<
  UpdateUserSettingsRequest,
  UpdateUserSettingsResponse,
  UpdateUserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AccountId}/users/{UserId}/settings",
    input: {
      AccountId: 0,
      UserId: 0,
      UserSettings: {
        Telephony: { InboundCalling: 0, OutboundCalling: 0, SMS: 0 },
      },
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserSettings",
})) as any;

const i_AlexaForBusinessMetadata: D.LazyStruct = () => ({
  IsAlexaForBusinessEnabled: 0,
  AlexaForBusinessRoomArn: 0,
});
const o_Account: D.LazyStruct = () => ({ CreatedTimestamp: D.ts });
const o_Bot: D.LazyStruct = () => ({
  DisplayName: D.secret,
  CreatedTimestamp: D.ts,
  UpdatedTimestamp: D.ts,
  BotEmail: D.secret,
  SecurityToken: D.secret,
});
const o_EventsConfiguration: D.LazyStruct = () => ({
  OutboundEventsHTTPSEndpoint: D.secret,
  LambdaFunctionArn: D.secret,
});
const o_PhoneNumber: D.LazyStruct = () => ({
  E164PhoneNumber: D.secret,
  Associations: D.list({ AssociatedTimestamp: D.ts }),
  CallingName: D.secret,
  CreatedTimestamp: D.ts,
  UpdatedTimestamp: D.ts,
  DeletionTimestamp: D.ts,
});
const o_PhoneNumberOrder: D.LazyStruct = () => ({
  OrderedPhoneNumbers: D.list({ E164PhoneNumber: D.secret }),
  CreatedTimestamp: D.ts,
  UpdatedTimestamp: D.ts,
});
const o_Room: D.LazyStruct = () => ({
  Name: D.secret,
  CreatedTimestamp: D.ts,
  UpdatedTimestamp: D.ts,
});
const o_RoomMembership: D.LazyStruct = () => ({
  Member: { Email: D.secret, FullName: D.secret },
  UpdatedTimestamp: D.ts,
});
const o_User: D.LazyStruct = () => ({
  PrimaryEmail: D.secret,
  PrimaryProvisionedNumber: D.secret,
  DisplayName: D.secret,
  RegisteredOn: D.ts,
  InvitedOn: D.ts,
  AlexaForBusinessMetadata: { AlexaForBusinessRoomArn: D.secret },
});
