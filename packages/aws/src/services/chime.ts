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
  sdkId: "Chime",
  serviceShapeName: "UCBuzzConsoleService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "chime" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-05-01");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
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
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              "https://chime.us-east-1.amazonaws.com",
              {
                authSchemes: [{ name: "sigv4", signingName: "chime", signingRegion: "us-east-1" }],
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
              return e(`https://chime-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
            }
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://chime.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err("DualStack is enabled but this partition does not support DualStack");
          }
          return e(`https://chime.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://chime.us-east-1.{D}","properties":{"authSchemes":[{"name":"sigv4","signingName":"chime","signingRegion":"us-east-1"}]},"headers":{}}',
  [
    "us-gov-west-1",
    "us-gov-east-1",
    "aws-us-gov-global",
    "cn-north-1",
    "cn-northwest-1",
    "aws-cn-global",
    "us-iso-east-1",
    "us-iso-west-1",
    "aws-iso-global",
    "us-isob-east-1",
    "aws-iso-b-global",
    "aws-iso-f-global",
    "us-isof-east-1",
    "us-isof-south-1",
    "eusc-de-east-1",
  ],
);

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceLimitExceededException>()(
    "ResourceLimitExceededException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ServiceFailureException
  extends /*@__PURE__*/ S.TaggedError<ServiceFailureException>()(
    "ServiceFailureException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ThrottledClientException
  extends /*@__PURE__*/ S.TaggedError<ThrottledClientException>()(
    "ThrottledClientException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedClientException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedClientException>()(
    "UnauthorizedClientException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class UnprocessableEntityException
  extends /*@__PURE__*/ S.TaggedError<UnprocessableEntityException>()(
    "UnprocessableEntityException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(422),
  ).pipe(C.withBadRequestError) {}
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
export type OrderedPhoneNumberStatus = "Processing" | "Acquired" | "Failed" | (string & {});
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
export type RegistrationStatus = "Unregistered" | "Registered" | "Suspended" | (string & {});
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
  input: __S(0, __c0, 0) as any as S.Schema<AssociatePhoneNumberWithUserRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<AssociatePhoneNumberWithUserResponse>,
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
}));

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
  input: __S(16, __c2, 0) as any as S.Schema<AssociateSigninDelegateGroupsWithAccountRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<AssociateSigninDelegateGroupsWithAccountResponse>,
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
}));

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
  input: __S(34, __c4, 2) as any as S.Schema<BatchCreateRoomMembershipRequest>,
  output: __S(37, __c4, 5) as any as S.Schema<BatchCreateRoomMembershipResponse>,
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
}));

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
  input: __S(40, __c5, 0) as any as S.Schema<BatchDeletePhoneNumberRequest>,
  output: __S(58, __c7, 2) as any as S.Schema<BatchDeletePhoneNumberResponse>,
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
}));

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
  input: __S(64, __c8, 0) as any as S.Schema<BatchSuspendUserRequest>,
  output: __S(74, __c9, 2) as any as S.Schema<BatchSuspendUserResponse>,
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
}));

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
  input: __S(80, __c10, 0) as any as S.Schema<BatchUnsuspendUserRequest>,
  output: __S(74, __c9, 2) as any as S.Schema<BatchUnsuspendUserResponse>,
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
}));

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
  input: __S(90, __c11, 2) as any as S.Schema<BatchUpdatePhoneNumberRequest>,
  output: __S(58, __c7, 2) as any as S.Schema<BatchUpdatePhoneNumberResponse>,
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
}));

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
  input: __S(98, __c12, 2) as any as S.Schema<BatchUpdateUserRequest>,
  output: __S(74, __c9, 2) as any as S.Schema<BatchUpdateUserResponse>,
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
}));

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
  input: __S(112, __c14, 0) as any as S.Schema<CreateAccountRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<CreateAccountResponse>,
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
}));

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
  input: __S(144, __c18, 0) as any as S.Schema<CreateBotRequest>,
  output: __S(160, __c20, 0) as any as S.Schema<CreateBotResponse>,
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
}));

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
  input: __S(168, __c21, 0) as any as S.Schema<CreateMeetingDialOutRequest>,
  output: __S(169, __c21, 1) as any as S.Schema<CreateMeetingDialOutResponse>,
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
}));

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
  input: __S(176, __c22, 0) as any as S.Schema<CreatePhoneNumberOrderRequest>,
  output: __S(184, __c23, 0) as any as S.Schema<CreatePhoneNumberOrderResponse>,
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
}));

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
  input: __S(208, __c26, 0) as any as S.Schema<CreateRoomRequest>,
  output: __S(224, __c28, 0) as any as S.Schema<CreateRoomResponse>,
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
}));

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
  input: __S(232, __c29, 0) as any as S.Schema<CreateRoomMembershipRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<CreateRoomMembershipResponse>,
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
}));

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
  input: __S(256, __c32, 0) as any as S.Schema<CreateUserRequest>,
  output: __S(272, __c34, 0) as any as S.Schema<CreateUserResponse>,
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
}));

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
  input: __S(280, __c35, 0) as any as S.Schema<DeleteAccountRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteAccountResponse>,
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
}));

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
  input: __S(288, __c36, 0) as any as S.Schema<DeleteEventsConfigurationRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteEventsConfigurationResponse>,
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
}));

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
  input: __S(296, __c37, 0) as any as S.Schema<DeletePhoneNumberRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DeletePhoneNumberResponse>,
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
}));

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
  input: __S(304, __c38, 0) as any as S.Schema<DeleteRoomRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteRoomResponse>,
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
}));

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
  input: __S(312, __c39, 0) as any as S.Schema<DeleteRoomMembershipRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteRoomMembershipResponse>,
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
}));

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
  input: __S(320, __c40, 0) as any as S.Schema<DisassociatePhoneNumberFromUserRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DisassociatePhoneNumberFromUserResponse>,
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
}));

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
  input: __S(328, __c41, 0) as any as S.Schema<DisassociateSigninDelegateGroupsFromAccountRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DisassociateSigninDelegateGroupsFromAccountResponse>,
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
}));

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
  input: __S(336, __c42, 0) as any as S.Schema<GetAccountRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<GetAccountResponse>,
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
}));

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
  input: __S(344, __c43, 0) as any as S.Schema<GetAccountSettingsRequest>,
  output: __S(345, __c43, 1) as any as S.Schema<GetAccountSettingsResponse>,
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
}));

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
  input: __S(360, __c45, 0) as any as S.Schema<GetBotRequest>,
  output: __S(160, __c20, 0) as any as S.Schema<GetBotResponse>,
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
}));

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
  input: __S(368, __c46, 0) as any as S.Schema<GetEventsConfigurationRequest>,
  output: __S(377, __c47, 1) as any as S.Schema<GetEventsConfigurationResponse>,
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
}));

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
  input: __S(384, __c48, 0) as any as S.Schema<GetGlobalSettingsRequest>,
  output: __S(385, __c48, 1) as any as S.Schema<GetGlobalSettingsResponse>,
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
}));

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
  input: __S(400, __c50, 0) as any as S.Schema<GetPhoneNumberRequest>,
  output: __S(416, __c52, 0) as any as S.Schema<GetPhoneNumberResponse>,
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
}));

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
  input: __S(424, __c53, 0) as any as S.Schema<GetPhoneNumberOrderRequest>,
  output: __S(184, __c23, 0) as any as S.Schema<GetPhoneNumberOrderResponse>,
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
}));

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
  input: __S(432, __c54, 0) as any as S.Schema<GetPhoneNumberSettingsRequest>,
  output: __S(433, __c54, 1) as any as S.Schema<GetPhoneNumberSettingsResponse>,
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
}));

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
  input: __S(440, __c55, 0) as any as S.Schema<GetRetentionSettingsRequest>,
  output: __S(450, __c56, 2) as any as S.Schema<GetRetentionSettingsResponse>,
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
}));

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
  input: __S(456, __c57, 0) as any as S.Schema<GetRoomRequest>,
  output: __S(224, __c28, 0) as any as S.Schema<GetRoomResponse>,
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
}));

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
  input: __S(464, __c58, 0) as any as S.Schema<GetUserRequest>,
  output: __S(272, __c34, 0) as any as S.Schema<GetUserResponse>,
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
}));

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
  input: __S(472, __c59, 0) as any as S.Schema<GetUserSettingsRequest>,
  output: __S(473, __c59, 1) as any as S.Schema<GetUserSettingsResponse>,
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
}));

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
  input: __S(488, __c61, 0) as any as S.Schema<InviteUsersRequest>,
  output: __S(491, __c61, 3) as any as S.Schema<InviteUsersResponse>,
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
}));

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
  input: __S(496, __c62, 0) as any as S.Schema<ListAccountsRequest>,
  output: __S(498, __c62, 2) as any as S.Schema<ListAccountsResponse>,
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
  input: __S(504, __c63, 0) as any as S.Schema<ListBotsRequest>,
  output: __S(506, __c63, 2) as any as S.Schema<ListBotsResponse>,
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
  input: __S(512, __c64, 0) as any as S.Schema<ListPhoneNumberOrdersRequest>,
  output: __S(514, __c64, 2) as any as S.Schema<ListPhoneNumberOrdersResponse>,
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
  input: __S(520, __c65, 0) as any as S.Schema<ListPhoneNumbersRequest>,
  output: __S(522, __c65, 2) as any as S.Schema<ListPhoneNumbersResponse>,
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
  input: __S(528, __c66, 0) as any as S.Schema<ListRoomMembershipsRequest>,
  output: __S(530, __c66, 2) as any as S.Schema<ListRoomMembershipsResponse>,
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
  input: __S(536, __c67, 0) as any as S.Schema<ListRoomsRequest>,
  output: __S(538, __c67, 2) as any as S.Schema<ListRoomsResponse>,
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
  input: __S(544, __c68, 0) as any as S.Schema<ListSupportedPhoneNumberCountriesRequest>,
  output: __S(547, __c68, 3) as any as S.Schema<ListSupportedPhoneNumberCountriesResponse>,
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
}));

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
  input: __S(552, __c69, 0) as any as S.Schema<ListUsersRequest>,
  output: __S(554, __c69, 2) as any as S.Schema<ListUsersResponse>,
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
  input: __S(560, __c70, 0) as any as S.Schema<LogoutUserRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<LogoutUserResponse>,
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
}));

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
  input: __S(568, __c71, 0) as any as S.Schema<PutEventsConfigurationRequest>,
  output: __S(377, __c47, 1) as any as S.Schema<PutEventsConfigurationResponse>,
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
}));

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
  input: __S(576, __c72, 0) as any as S.Schema<PutRetentionSettingsRequest>,
  output: __S(450, __c56, 2) as any as S.Schema<PutRetentionSettingsResponse>,
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
}));

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
  input: __S(584, __c73, 0) as any as S.Schema<RedactConversationMessageRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<RedactConversationMessageResponse>,
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
}));

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
  input: __S(592, __c74, 0) as any as S.Schema<RedactRoomMessageRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<RedactRoomMessageResponse>,
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
}));

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
  input: __S(600, __c75, 0) as any as S.Schema<RegenerateSecurityTokenRequest>,
  output: __S(160, __c20, 0) as any as S.Schema<RegenerateSecurityTokenResponse>,
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
}));

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
  input: __S(608, __c76, 0) as any as S.Schema<ResetPersonalPINRequest>,
  output: __S(272, __c34, 0) as any as S.Schema<ResetPersonalPINResponse>,
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
}));

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
  input: __S(616, __c77, 0) as any as S.Schema<RestorePhoneNumberRequest>,
  output: __S(416, __c52, 0) as any as S.Schema<RestorePhoneNumberResponse>,
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
}));

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
  input: __S(624, __c78, 0) as any as S.Schema<SearchAvailablePhoneNumbersRequest>,
  output: __S(625, __c78, 1) as any as S.Schema<SearchAvailablePhoneNumbersResponse>,
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
  input: __S(632, __c79, 0) as any as S.Schema<UpdateAccountRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<UpdateAccountResponse>,
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
}));

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
  input: __S(640, __c80, 0) as any as S.Schema<UpdateAccountSettingsRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<UpdateAccountSettingsResponse>,
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
}));

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
  input: __S(648, __c81, 0) as any as S.Schema<UpdateBotRequest>,
  output: __S(160, __c20, 0) as any as S.Schema<UpdateBotResponse>,
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
}));

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
  input: __S(656, __c82, 0) as any as S.Schema<UpdateGlobalSettingsRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<UpdateGlobalSettingsResponse>,
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
}));

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
  input: __S(664, __c83, 0) as any as S.Schema<UpdatePhoneNumberRequest>,
  output: __S(416, __c52, 0) as any as S.Schema<UpdatePhoneNumberResponse>,
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
}));

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
  input: __S(672, __c84, 0) as any as S.Schema<UpdatePhoneNumberSettingsRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<UpdatePhoneNumberSettingsResponse>,
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
}));

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
  input: __S(680, __c85, 0) as any as S.Schema<UpdateRoomRequest>,
  output: __S(224, __c28, 0) as any as S.Schema<UpdateRoomResponse>,
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
}));

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
  input: __S(688, __c86, 0) as any as S.Schema<UpdateRoomMembershipRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<UpdateRoomMembershipResponse>,
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
}));

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
  input: __S(696, __c87, 0) as any as S.Schema<UpdateUserRequest>,
  output: __S(272, __c34, 0) as any as S.Schema<UpdateUserResponse>,
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
}));

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
  input: __S(704, __c88, 0) as any as S.Schema<UpdateUserSettingsRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<UpdateUserSettingsResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          UserId: S.String.pipe(T.HttpLabel("UserId")),
          E164PhoneNumber: SensitiveString,
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/accounts/{AccountId}/users/{UserId}?operation=associate-phone-number",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociatePhoneNumberWithUserRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "AssociatePhoneNumberWithUserResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          SigninDelegateGroups: __S(25, __c3, 1),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/accounts/{AccountId}?operation=associate-signin-delegate-groups",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateSigninDelegateGroupsWithAccountRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ GroupName: S.optional(S.String) })).annotate({
        identifier: "SigninDelegateGroup",
      });
    case 1:
      return S.Array(__S(24, __c3, 0));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MemberId: S.optional(S.String), Role: S.optional(S.String) }),
      ).annotate({ identifier: "MembershipItem" });
    case 1:
      return S.Array(__S(32, __c4, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          RoomId: S.String.pipe(T.HttpLabel("RoomId")),
          MembershipItemList: __S(33, __c4, 1),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/accounts/{AccountId}/rooms/{RoomId}/memberships?operation=batch-create",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchCreateRoomMembershipRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          MemberId: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "MemberError" });
    case 4:
      return S.Array(__S(35, __c4, 3));
    case 5:
      return S.suspend(() => S.Struct({ Errors: S.optional(__S(36, __c4, 4)) })).annotate({
        identifier: "BatchCreateRoomMembershipResponse",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PhoneNumberIds: __S(48, __c6, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/phone-numbers?operation=batch-delete" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchDeletePhoneNumberRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PhoneNumberId: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "PhoneNumberError" });
    case 1:
      return S.Array(__S(56, __c7, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ PhoneNumberErrors: S.optional(__S(57, __c7, 1)) }),
      ).annotate({ identifier: "BatchDeletePhoneNumberResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          UserIdList: __S(48, __c6, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/accounts/{AccountId}/users?operation=suspend" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchSuspendUserRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserId: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "UserError" });
    case 1:
      return S.Array(__S(72, __c9, 0));
    case 2:
      return S.suspend(() => S.Struct({ UserErrors: S.optional(__S(73, __c9, 1)) })).annotate({
        identifier: "BatchSuspendUserResponse",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          UserIdList: __S(48, __c6, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/accounts/{AccountId}/users?operation=unsuspend" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchUnsuspendUserRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PhoneNumberId: S.String,
          ProductType: S.optional(S.String),
          CallingName: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "UpdatePhoneNumberRequestItem" });
    case 1:
      return S.Array(__S(88, __c11, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ UpdatePhoneNumberRequestItems: __S(89, __c11, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/phone-numbers?operation=batch-update" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchUpdatePhoneNumberRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserId: S.String,
          LicenseType: S.optional(S.String),
          UserType: S.optional(S.String),
          AlexaForBusinessMetadata: S.optional(__S(104, __c13, 0)),
        }),
      ).annotate({ identifier: "UpdateUserRequestItem" });
    case 1:
      return S.Array(__S(96, __c12, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          UpdateUserRequestItems: __S(97, __c12, 1),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/accounts/{AccountId}/users" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchUpdateUserRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IsAlexaForBusinessEnabled: S.optional(S.Boolean),
          AlexaForBusinessRoomArn: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "AlexaForBusinessMetadata" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/accounts" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateAccountRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AwsAccountId: S.String,
          AccountId: S.String,
          Name: S.String,
          AccountType: S.optional(S.String),
          CreatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          DefaultLicense: S.optional(S.String),
          SupportedLicenses: S.optional(__S(120, __c15, 0)),
          AccountStatus: S.optional(S.String),
          SigninDelegateGroups: S.optional(__S(25, __c3, 1)),
        }),
      ).annotate({ identifier: "Account" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Account: S.optional(__S(128, __c16, 0)) })).annotate({
        identifier: "CreateAccountResponse",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          DisplayName: SensitiveString,
          Domain: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/accounts/{AccountId}/bots" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateBotRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BotId: S.optional(S.String),
          UserId: S.optional(S.String),
          DisplayName: S.optional(SensitiveString),
          BotType: S.optional(S.String),
          Disabled: S.optional(S.Boolean),
          CreatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          BotEmail: S.optional(SensitiveString),
          SecurityToken: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "Bot" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Bot: S.optional(__S(152, __c19, 0)) })).annotate({
        identifier: "CreateBotResponse",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MeetingId: S.String.pipe(T.HttpLabel("MeetingId")),
          FromPhoneNumber: SensitiveString,
          ToPhoneNumber: SensitiveString,
          JoinToken: SensitiveString,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/meetings/{MeetingId}/dial-outs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMeetingDialOutRequest" });
    case 1:
      return S.suspend(() => S.Struct({ TransactionId: S.optional(S.String) })).annotate({
        identifier: "CreateMeetingDialOutResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProductType: S.String, E164PhoneNumbers: __S(200, __c25, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/phone-number-orders" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreatePhoneNumberOrderRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PhoneNumberOrder: S.optional(__S(194, __c24, 2)) }),
      ).annotate({ identifier: "CreatePhoneNumberOrderResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ E164PhoneNumber: S.optional(SensitiveString), Status: S.optional(S.String) }),
      ).annotate({ identifier: "OrderedPhoneNumber" });
    case 1:
      return S.Array(__S(192, __c24, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          PhoneNumberOrderId: S.optional(S.String),
          ProductType: S.optional(S.String),
          Status: S.optional(S.String),
          OrderedPhoneNumbers: S.optional(__S(193, __c24, 1)),
          CreatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "PhoneNumberOrder" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          Name: SensitiveString,
          ClientRequestToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/accounts/{AccountId}/rooms" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRoomRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RoomId: S.optional(S.String),
          Name: S.optional(SensitiveString),
          AccountId: S.optional(S.String),
          CreatedBy: S.optional(S.String),
          CreatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "Room" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Room: S.optional(__S(216, __c27, 0)) })).annotate({
        identifier: "CreateRoomResponse",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          RoomId: S.String.pipe(T.HttpLabel("RoomId")),
          MemberId: S.String,
          Role: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/accounts/{AccountId}/rooms/{RoomId}/memberships" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRoomMembershipRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MemberId: S.optional(S.String),
          MemberType: S.optional(S.String),
          Email: S.optional(SensitiveString),
          FullName: S.optional(SensitiveString),
          AccountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "Member" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RoomId: S.optional(S.String),
          Member: S.optional(__S(240, __c30, 0)),
          Role: S.optional(S.String),
          InvitedBy: S.optional(S.String),
          UpdatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "RoomMembership" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RoomMembership: S.optional(__S(241, __c30, 1)) })).annotate(
        { identifier: "CreateRoomMembershipResponse" },
      );
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          Username: S.optional(S.String),
          Email: S.optional(SensitiveString),
          UserType: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/accounts/{AccountId}/users?operation=create" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateUserRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserId: S.String,
          AccountId: S.optional(S.String),
          PrimaryEmail: S.optional(SensitiveString),
          PrimaryProvisionedNumber: S.optional(SensitiveString),
          DisplayName: S.optional(SensitiveString),
          LicenseType: S.optional(S.String),
          UserType: S.optional(S.String),
          UserRegistrationStatus: S.optional(S.String),
          UserInvitationStatus: S.optional(S.String),
          RegisteredOn: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          InvitedOn: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          AlexaForBusinessMetadata: S.optional(__S(104, __c13, 0)),
          PersonalPIN: S.optional(S.String),
        }),
      ).annotate({ identifier: "User" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ User: S.optional(__S(264, __c33, 0)) })).annotate({
        identifier: "CreateUserResponse",
      });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.String.pipe(T.HttpLabel("AccountId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/accounts/{AccountId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAccountRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          BotId: S.String.pipe(T.HttpLabel("BotId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/accounts/{AccountId}/bots/{BotId}/events-configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEventsConfigurationRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PhoneNumberId: S.String.pipe(T.HttpLabel("PhoneNumberId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/phone-numbers/{PhoneNumberId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePhoneNumberRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          RoomId: S.String.pipe(T.HttpLabel("RoomId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/accounts/{AccountId}/rooms/{RoomId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRoomRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          RoomId: S.String.pipe(T.HttpLabel("RoomId")),
          MemberId: S.String.pipe(T.HttpLabel("MemberId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/accounts/{AccountId}/rooms/{RoomId}/memberships/{MemberId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRoomMembershipRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          UserId: S.String.pipe(T.HttpLabel("UserId")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/accounts/{AccountId}/users/{UserId}?operation=disassociate-phone-number",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociatePhoneNumberFromUserRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          GroupNames: __S(48, __c6, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/accounts/{AccountId}?operation=disassociate-signin-delegate-groups",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateSigninDelegateGroupsFromAccountRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.String.pipe(T.HttpLabel("AccountId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/accounts/{AccountId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAccountRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.String.pipe(T.HttpLabel("AccountId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/accounts/{AccountId}/settings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAccountSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AccountSettings: S.optional(__S(352, __c44, 0)) }),
      ).annotate({ identifier: "GetAccountSettingsResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DisableRemoteControl: S.optional(S.Boolean),
          EnableDialOut: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AccountSettings" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          BotId: S.String.pipe(T.HttpLabel("BotId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/accounts/{AccountId}/bots/{BotId}" }),
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
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          BotId: S.String.pipe(T.HttpLabel("BotId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/accounts/{AccountId}/bots/{BotId}/events-configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEventsConfigurationRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BotId: S.optional(S.String),
          OutboundEventsHTTPSEndpoint: S.optional(SensitiveString),
          LambdaFunctionArn: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "EventsConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EventsConfiguration: S.optional(__S(376, __c47, 0)) }),
      ).annotate({ identifier: "GetEventsConfigurationResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/settings" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetGlobalSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BusinessCalling: S.optional(__S(392, __c49, 0)),
          VoiceConnector: S.optional(__S(392, __c49, 0)),
        }),
      ).annotate({ identifier: "GetGlobalSettingsResponse" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ CdrBucket: S.optional(S.String) })).annotate({
        identifier: "BusinessCallingSettings",
      });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PhoneNumberId: S.String.pipe(T.HttpLabel("PhoneNumberId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/phone-numbers/{PhoneNumberId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPhoneNumberRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InboundCall: S.optional(S.Boolean),
          OutboundCall: S.optional(S.Boolean),
          InboundSMS: S.optional(S.Boolean),
          OutboundSMS: S.optional(S.Boolean),
          InboundMMS: S.optional(S.Boolean),
          OutboundMMS: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "PhoneNumberCapabilities" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Value: S.optional(S.String),
          Name: S.optional(S.String),
          AssociatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "PhoneNumberAssociation" });
    case 2:
      return S.Array(__S(409, __c51, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          PhoneNumberId: S.optional(S.String),
          E164PhoneNumber: S.optional(SensitiveString),
          Country: S.optional(S.String),
          Type: S.optional(S.String),
          ProductType: S.optional(S.String),
          Status: S.optional(S.String),
          Capabilities: S.optional(__S(408, __c51, 0)),
          Associations: S.optional(__S(410, __c51, 2)),
          CallingName: S.optional(SensitiveString),
          CallingNameStatus: S.optional(S.String),
          CreatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          DeletionTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "PhoneNumber" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ PhoneNumber: S.optional(__S(411, __c51, 3)) })).annotate({
        identifier: "GetPhoneNumberResponse",
      });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PhoneNumberOrderId: S.String.pipe(T.HttpLabel("PhoneNumberOrderId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/phone-number-orders/{PhoneNumberOrderId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPhoneNumberOrderRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/settings/phone-number" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPhoneNumberSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CallingName: S.optional(SensitiveString),
          CallingNameUpdatedTimestamp: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
        }),
      ).annotate({ identifier: "GetPhoneNumberSettingsResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.String.pipe(T.HttpLabel("AccountId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/accounts/{AccountId}/retention-settings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRetentionSettingsRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RetentionDays: S.optional(S.Number) })).annotate({
        identifier: "RoomRetentionSettings",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RoomRetentionSettings: S.optional(__S(448, __c56, 0)),
          ConversationRetentionSettings: S.optional(__S(448, __c56, 0)),
        }),
      ).annotate({ identifier: "RetentionSettings" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          RetentionSettings: S.optional(__S(449, __c56, 1)),
          InitiateDeletionTimestamp: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
        }),
      ).annotate({ identifier: "GetRetentionSettingsResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          RoomId: S.String.pipe(T.HttpLabel("RoomId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/accounts/{AccountId}/rooms/{RoomId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRoomRequest" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          UserId: S.String.pipe(T.HttpLabel("UserId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/accounts/{AccountId}/users/{UserId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetUserRequest" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          UserId: S.String.pipe(T.HttpLabel("UserId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/accounts/{AccountId}/users/{UserId}/settings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetUserSettingsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ UserSettings: S.optional(__S(481, __c60, 1)) })).annotate({
        identifier: "GetUserSettingsResponse",
      });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InboundCalling: S.Boolean, OutboundCalling: S.Boolean, SMS: S.Boolean }),
      ).annotate({ identifier: "TelephonySettings" });
    case 1:
      return S.suspend(() => S.Struct({ Telephony: __S(480, __c60, 0) })).annotate({
        identifier: "UserSettings",
      });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          UserEmailList: __S(200, __c25, 0),
          UserType: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/accounts/{AccountId}/users?operation=add" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "InviteUsersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InviteId: S.optional(S.String),
          Status: S.optional(S.String),
          EmailAddress: S.optional(SensitiveString),
          EmailStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "Invite" });
    case 2:
      return S.Array(__S(489, __c61, 1));
    case 3:
      return S.suspend(() => S.Struct({ Invites: S.optional(__S(490, __c61, 2)) })).annotate({
        identifier: "InviteUsersResponse",
      });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String).pipe(T.HttpQuery("name")),
          UserEmail: S.optional(SensitiveString).pipe(T.HttpQuery("user-email")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/accounts" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAccountsRequest" });
    case 1:
      return S.Array(__S(128, __c16, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Accounts: S.optional(__S(497, __c62, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAccountsResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/accounts/{AccountId}/bots" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListBotsRequest" });
    case 1:
      return S.Array(__S(152, __c19, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Bots: S.optional(__S(505, __c63, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListBotsResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/phone-number-orders" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPhoneNumberOrdersRequest" });
    case 1:
      return S.Array(__S(194, __c24, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          PhoneNumberOrders: S.optional(__S(513, __c64, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPhoneNumberOrdersResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String).pipe(T.HttpQuery("status")),
          ProductType: S.optional(S.String).pipe(T.HttpQuery("product-type")),
          FilterName: S.optional(S.String).pipe(T.HttpQuery("filter-name")),
          FilterValue: S.optional(S.String).pipe(T.HttpQuery("filter-value")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/phone-numbers" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListPhoneNumbersRequest" });
    case 1:
      return S.Array(__S(411, __c51, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({ PhoneNumbers: S.optional(__S(521, __c65, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPhoneNumbersResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          RoomId: S.String.pipe(T.HttpLabel("RoomId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/accounts/{AccountId}/rooms/{RoomId}/memberships" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRoomMembershipsRequest" });
    case 1:
      return S.Array(__S(241, __c30, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          RoomMemberships: S.optional(__S(529, __c66, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListRoomMembershipsResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          MemberId: S.optional(S.String).pipe(T.HttpQuery("member-id")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/accounts/{AccountId}/rooms" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRoomsRequest" });
    case 1:
      return S.Array(__S(216, __c27, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Rooms: S.optional(__S(537, __c67, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRoomsResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProductType: S.String.pipe(T.HttpQuery("product-type")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/phone-number-countries" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSupportedPhoneNumberCountriesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CountryCode: S.optional(S.String),
          SupportedPhoneNumberTypes: S.optional(__S(120, __c15, 0)),
        }),
      ).annotate({ identifier: "PhoneNumberCountry" });
    case 2:
      return S.Array(__S(545, __c68, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ PhoneNumberCountries: S.optional(__S(546, __c68, 2)) }),
      ).annotate({ identifier: "ListSupportedPhoneNumberCountriesResponse" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          UserEmail: S.optional(SensitiveString).pipe(T.HttpQuery("user-email")),
          UserType: S.optional(S.String).pipe(T.HttpQuery("user-type")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/accounts/{AccountId}/users" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListUsersRequest" });
    case 1:
      return S.Array(__S(264, __c33, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Users: S.optional(__S(553, __c69, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListUsersResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          UserId: S.String.pipe(T.HttpLabel("UserId")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/accounts/{AccountId}/users/{UserId}?operation=logout",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "LogoutUserRequest" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          BotId: S.String.pipe(T.HttpLabel("BotId")),
          OutboundEventsHTTPSEndpoint: S.optional(SensitiveString),
          LambdaFunctionArn: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/accounts/{AccountId}/bots/{BotId}/events-configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutEventsConfigurationRequest" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          RetentionSettings: __S(449, __c56, 1),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/accounts/{AccountId}/retention-settings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutRetentionSettingsRequest" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          ConversationId: S.String.pipe(T.HttpLabel("ConversationId")),
          MessageId: S.String.pipe(T.HttpLabel("MessageId")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/accounts/{AccountId}/conversations/{ConversationId}/messages/{MessageId}?operation=redact",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RedactConversationMessageRequest" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          RoomId: S.String.pipe(T.HttpLabel("RoomId")),
          MessageId: S.String.pipe(T.HttpLabel("MessageId")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/accounts/{AccountId}/rooms/{RoomId}/messages/{MessageId}?operation=redact",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RedactRoomMessageRequest" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          BotId: S.String.pipe(T.HttpLabel("BotId")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/accounts/{AccountId}/bots/{BotId}?operation=regenerate-security-token",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RegenerateSecurityTokenRequest" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          UserId: S.String.pipe(T.HttpLabel("UserId")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/accounts/{AccountId}/users/{UserId}?operation=reset-personal-pin",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ResetPersonalPINRequest" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PhoneNumberId: S.String.pipe(T.HttpLabel("PhoneNumberId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/phone-numbers/{PhoneNumberId}?operation=restore" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RestorePhoneNumberRequest" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AreaCode: S.optional(S.String).pipe(T.HttpQuery("area-code")),
          City: S.optional(S.String).pipe(T.HttpQuery("city")),
          Country: S.optional(S.String).pipe(T.HttpQuery("country")),
          State: S.optional(S.String).pipe(T.HttpQuery("state")),
          TollFreePrefix: S.optional(S.String).pipe(T.HttpQuery("toll-free-prefix")),
          PhoneNumberType: S.optional(S.String).pipe(T.HttpQuery("phone-number-type")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/search?type=phone-numbers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchAvailablePhoneNumbersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          E164PhoneNumbers: S.optional(__S(200, __c25, 0)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "SearchAvailablePhoneNumbersResponse" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          Name: S.optional(S.String),
          DefaultLicense: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/accounts/{AccountId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAccountRequest" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          AccountSettings: __S(352, __c44, 0),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/accounts/{AccountId}/settings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAccountSettingsRequest" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          BotId: S.String.pipe(T.HttpLabel("BotId")),
          Disabled: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/accounts/{AccountId}/bots/{BotId}" }),
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
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BusinessCalling: S.optional(__S(392, __c49, 0)),
          VoiceConnector: S.optional(__S(392, __c49, 0)),
        }).pipe(T.all(T.Http({ method: "PUT", uri: "/settings" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateGlobalSettingsRequest" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PhoneNumberId: S.String.pipe(T.HttpLabel("PhoneNumberId")),
          ProductType: S.optional(S.String),
          CallingName: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/phone-numbers/{PhoneNumberId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePhoneNumberRequest" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CallingName: SensitiveString }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/settings/phone-number" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePhoneNumberSettingsRequest" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          RoomId: S.String.pipe(T.HttpLabel("RoomId")),
          Name: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/accounts/{AccountId}/rooms/{RoomId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRoomRequest" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          RoomId: S.String.pipe(T.HttpLabel("RoomId")),
          MemberId: S.String.pipe(T.HttpLabel("MemberId")),
          Role: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/accounts/{AccountId}/rooms/{RoomId}/memberships/{MemberId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRoomMembershipRequest" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          UserId: S.String.pipe(T.HttpLabel("UserId")),
          LicenseType: S.optional(S.String),
          UserType: S.optional(S.String),
          AlexaForBusinessMetadata: S.optional(__S(104, __c13, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/accounts/{AccountId}/users/{UserId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateUserRequest" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(T.HttpLabel("AccountId")),
          UserId: S.String.pipe(T.HttpLabel("UserId")),
          UserSettings: __S(481, __c60, 1),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/accounts/{AccountId}/users/{UserId}/settings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateUserSettingsRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
