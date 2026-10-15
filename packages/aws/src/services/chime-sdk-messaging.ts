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
  sdkId: "Chime SDK Messaging",
  serviceShapeName: "ChimeMessagingService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "chime" });
const ver = /*@__PURE__*/ T.ServiceVersion("2021-05-15");
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
              `https://messaging-chime-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://messaging-chime-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://messaging-chime.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://messaging-chime.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://messaging-chime.{R}.{D}","properties":{},"headers":{}}');

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
export type ChimeArn = string;
export interface AssociateChannelFlowRequest {
  ChannelArn: string;
  ChannelFlowArn: string;
  ChimeBearer: string;
}
export interface AssociateChannelFlowResponse {}
export type ChannelMembershipType = "DEFAULT" | "HIDDEN" | (string & {});
export type MemberArns = string[];
export type SubChannelId = string;
export interface BatchCreateChannelMembershipRequest {
  ChannelArn: string;
  Type?: ChannelMembershipType;
  MemberArns: string[];
  ChimeBearer: string;
  SubChannelId?: string;
}
export type ResourceName = string | redacted.Redacted<string>;
export interface Identity {
  Arn?: string;
  Name?: string | redacted.Redacted<string>;
}
export type Members = Identity[];
export interface BatchChannelMemberships {
  InvitedBy?: Identity;
  Type?: ChannelMembershipType;
  Members?: Identity[];
  ChannelArn?: string;
  SubChannelId?: string;
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
export interface BatchCreateChannelMembershipError_ {
  MemberArn?: string;
  ErrorCode?: ErrorCode;
  ErrorMessage?: string;
}
export type BatchCreateChannelMembershipErrors = BatchCreateChannelMembershipError_[];
export interface BatchCreateChannelMembershipResponse {
  BatchChannelMemberships?: BatchChannelMemberships;
  Errors?: BatchCreateChannelMembershipError_[];
}
export type CallbackIdType = string;
export type NonNullableBoolean = boolean;
export type MessageId = string;
export type NonEmptyContent = string | redacted.Redacted<string>;
export type Metadata = string | redacted.Redacted<string>;
export type PushNotificationTitle = string | redacted.Redacted<string>;
export type PushNotificationBody = string | redacted.Redacted<string>;
export type PushNotificationType = "DEFAULT" | "VOIP" | (string & {});
export interface PushNotificationConfiguration {
  Title?: string | redacted.Redacted<string>;
  Body?: string | redacted.Redacted<string>;
  Type?: PushNotificationType;
}
export type MessageAttributeName = string | redacted.Redacted<string>;
export type MessageAttributeStringValue = string | redacted.Redacted<string>;
export type MessageAttributeStringValues = (string | redacted.Redacted<string>)[];
export interface MessageAttributeValue {
  StringValues?: (string | redacted.Redacted<string>)[];
}
export type MessageAttributeMap = { [key: string]: MessageAttributeValue | undefined };
export type ContentType = string | redacted.Redacted<string>;
export interface ChannelMessageCallback {
  MessageId: string;
  Content?: string | redacted.Redacted<string>;
  Metadata?: string | redacted.Redacted<string>;
  PushNotification?: PushNotificationConfiguration;
  MessageAttributes?: { [key: string]: MessageAttributeValue | undefined };
  SubChannelId?: string;
  ContentType?: string | redacted.Redacted<string>;
}
export interface ChannelFlowCallbackRequest {
  CallbackId: string;
  ChannelArn: string;
  DeleteResource?: boolean;
  ChannelMessage: ChannelMessageCallback;
}
export interface ChannelFlowCallbackResponse {
  ChannelArn?: string;
  CallbackId?: string;
}
export type NonEmptyResourceName = string | redacted.Redacted<string>;
export type ChannelMode = "UNRESTRICTED" | "RESTRICTED" | (string & {});
export type ChannelPrivacy = "PUBLIC" | "PRIVATE" | (string & {});
export type ClientRequestToken = string | redacted.Redacted<string>;
export type TagKey = string | redacted.Redacted<string>;
export type TagValue = string | redacted.Redacted<string>;
export interface Tag {
  Key: string | redacted.Redacted<string>;
  Value: string | redacted.Redacted<string>;
}
export type TagList = Tag[];
export type ChannelId = string | redacted.Redacted<string>;
export type ChannelMemberArns = string[];
export type ChannelModeratorArns = string[];
export type MaximumSubChannels = number;
export type TargetMembershipsPerSubChannel = number;
export type MinimumMembershipPercentage = number;
export interface ElasticChannelConfiguration {
  MaximumSubChannels: number;
  TargetMembershipsPerSubChannel: number;
  MinimumMembershipPercentage: number;
}
export type ExpirationDays = number;
export type ExpirationCriterion = "CREATED_TIMESTAMP" | "LAST_MESSAGE_TIMESTAMP" | (string & {});
export interface ExpirationSettings {
  ExpirationDays: number;
  ExpirationCriterion: ExpirationCriterion;
}
export interface CreateChannelRequest {
  AppInstanceArn: string;
  Name: string | redacted.Redacted<string>;
  Mode?: ChannelMode;
  Privacy?: ChannelPrivacy;
  Metadata?: string | redacted.Redacted<string>;
  ClientRequestToken: string | redacted.Redacted<string>;
  Tags?: Tag[];
  ChimeBearer: string;
  ChannelId?: string | redacted.Redacted<string>;
  MemberArns?: string[];
  ModeratorArns?: string[];
  ElasticChannelConfiguration?: ElasticChannelConfiguration;
  ExpirationSettings?: ExpirationSettings;
}
export interface CreateChannelResponse {
  ChannelArn?: string;
}
export interface CreateChannelBanRequest {
  ChannelArn: string;
  MemberArn: string;
  ChimeBearer: string;
}
export interface CreateChannelBanResponse {
  ChannelArn?: string;
  Member?: Identity;
}
export type LambdaFunctionArn = string;
export type InvocationType = "ASYNC" | (string & {});
export interface LambdaConfiguration {
  ResourceArn: string;
  InvocationType: InvocationType;
}
export interface ProcessorConfiguration {
  Lambda: LambdaConfiguration;
}
export type ChannelFlowExecutionOrder = number;
export type FallbackAction = "CONTINUE" | "ABORT" | (string & {});
export interface Processor {
  Name: string | redacted.Redacted<string>;
  Configuration: ProcessorConfiguration;
  ExecutionOrder: number;
  FallbackAction: FallbackAction;
}
export type ProcessorList = Processor[];
export interface CreateChannelFlowRequest {
  AppInstanceArn: string;
  Processors: Processor[];
  Name: string | redacted.Redacted<string>;
  Tags?: Tag[];
  ClientRequestToken: string | redacted.Redacted<string>;
}
export interface CreateChannelFlowResponse {
  ChannelFlowArn?: string;
}
export interface CreateChannelMembershipRequest {
  ChannelArn: string;
  MemberArn: string;
  Type: ChannelMembershipType;
  ChimeBearer: string;
  SubChannelId?: string;
}
export interface CreateChannelMembershipResponse {
  ChannelArn?: string;
  Member?: Identity;
  SubChannelId?: string;
}
export interface CreateChannelModeratorRequest {
  ChannelArn: string;
  ChannelModeratorArn: string;
  ChimeBearer: string;
}
export interface CreateChannelModeratorResponse {
  ChannelArn?: string;
  ChannelModerator?: Identity;
}
export interface DeleteChannelRequest {
  ChannelArn: string;
  ChimeBearer: string;
}
export interface DeleteChannelResponse {}
export interface DeleteChannelBanRequest {
  ChannelArn: string;
  MemberArn: string;
  ChimeBearer: string;
}
export interface DeleteChannelBanResponse {}
export interface DeleteChannelFlowRequest {
  ChannelFlowArn: string;
}
export interface DeleteChannelFlowResponse {}
export interface DeleteChannelMembershipRequest {
  ChannelArn: string;
  MemberArn: string;
  ChimeBearer: string;
  SubChannelId?: string;
}
export interface DeleteChannelMembershipResponse {}
export interface DeleteChannelMessageRequest {
  ChannelArn: string;
  MessageId: string;
  ChimeBearer: string;
  SubChannelId?: string;
}
export interface DeleteChannelMessageResponse {}
export interface DeleteChannelModeratorRequest {
  ChannelArn: string;
  ChannelModeratorArn: string;
  ChimeBearer: string;
}
export interface DeleteChannelModeratorResponse {}
export interface DeleteMessagingStreamingConfigurationsRequest {
  AppInstanceArn: string;
}
export interface DeleteMessagingStreamingConfigurationsResponse {}
export interface DescribeChannelRequest {
  ChannelArn: string;
  ChimeBearer: string;
}
export interface Channel {
  Name?: string | redacted.Redacted<string>;
  ChannelArn?: string;
  Mode?: ChannelMode;
  Privacy?: ChannelPrivacy;
  Metadata?: string | redacted.Redacted<string>;
  CreatedBy?: Identity;
  CreatedTimestamp?: Date;
  LastMessageTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
  ChannelFlowArn?: string;
  ElasticChannelConfiguration?: ElasticChannelConfiguration;
  ExpirationSettings?: ExpirationSettings;
}
export interface DescribeChannelResponse {
  Channel?: Channel;
}
export interface DescribeChannelBanRequest {
  ChannelArn: string;
  MemberArn: string;
  ChimeBearer: string;
}
export interface ChannelBan {
  Member?: Identity;
  ChannelArn?: string;
  CreatedTimestamp?: Date;
  CreatedBy?: Identity;
}
export interface DescribeChannelBanResponse {
  ChannelBan?: ChannelBan;
}
export interface DescribeChannelFlowRequest {
  ChannelFlowArn: string;
}
export interface ChannelFlow {
  ChannelFlowArn?: string;
  Processors?: Processor[];
  Name?: string | redacted.Redacted<string>;
  CreatedTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
}
export interface DescribeChannelFlowResponse {
  ChannelFlow?: ChannelFlow;
}
export interface DescribeChannelMembershipRequest {
  ChannelArn: string;
  MemberArn: string;
  ChimeBearer: string;
  SubChannelId?: string;
}
export interface ChannelMembership {
  InvitedBy?: Identity;
  Type?: ChannelMembershipType;
  Member?: Identity;
  ChannelArn?: string;
  CreatedTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
  SubChannelId?: string;
}
export interface DescribeChannelMembershipResponse {
  ChannelMembership?: ChannelMembership;
}
export interface DescribeChannelMembershipForAppInstanceUserRequest {
  ChannelArn: string;
  AppInstanceUserArn: string;
  ChimeBearer: string;
}
export interface ChannelSummary {
  Name?: string | redacted.Redacted<string>;
  ChannelArn?: string;
  Mode?: ChannelMode;
  Privacy?: ChannelPrivacy;
  Metadata?: string | redacted.Redacted<string>;
  LastMessageTimestamp?: Date;
}
export interface AppInstanceUserMembershipSummary {
  Type?: ChannelMembershipType;
  ReadMarkerTimestamp?: Date;
  SubChannelId?: string;
}
export interface ChannelMembershipForAppInstanceUserSummary {
  ChannelSummary?: ChannelSummary;
  AppInstanceUserMembershipSummary?: AppInstanceUserMembershipSummary;
}
export interface DescribeChannelMembershipForAppInstanceUserResponse {
  ChannelMembership?: ChannelMembershipForAppInstanceUserSummary;
}
export interface DescribeChannelModeratedByAppInstanceUserRequest {
  ChannelArn: string;
  AppInstanceUserArn: string;
  ChimeBearer: string;
}
export interface ChannelModeratedByAppInstanceUserSummary {
  ChannelSummary?: ChannelSummary;
}
export interface DescribeChannelModeratedByAppInstanceUserResponse {
  Channel?: ChannelModeratedByAppInstanceUserSummary;
}
export interface DescribeChannelModeratorRequest {
  ChannelArn: string;
  ChannelModeratorArn: string;
  ChimeBearer: string;
}
export interface ChannelModerator {
  Moderator?: Identity;
  ChannelArn?: string;
  CreatedTimestamp?: Date;
  CreatedBy?: Identity;
}
export interface DescribeChannelModeratorResponse {
  ChannelModerator?: ChannelModerator;
}
export interface DisassociateChannelFlowRequest {
  ChannelArn: string;
  ChannelFlowArn: string;
  ChimeBearer: string;
}
export interface DisassociateChannelFlowResponse {}
export interface GetChannelMembershipPreferencesRequest {
  ChannelArn: string;
  MemberArn: string;
  ChimeBearer: string;
}
export type AllowNotifications = "ALL" | "NONE" | "FILTERED" | (string & {});
export type FilterRule = string | redacted.Redacted<string>;
export interface PushNotificationPreferences {
  AllowNotifications: AllowNotifications;
  FilterRule?: string | redacted.Redacted<string>;
}
export interface ChannelMembershipPreferences {
  PushNotifications?: PushNotificationPreferences;
}
export interface GetChannelMembershipPreferencesResponse {
  ChannelArn?: string;
  Member?: Identity;
  Preferences?: ChannelMembershipPreferences;
}
export interface GetChannelMessageRequest {
  ChannelArn: string;
  MessageId: string;
  ChimeBearer: string;
  SubChannelId?: string;
}
export type Content = string | redacted.Redacted<string>;
export type ChannelMessageType = "STANDARD" | "CONTROL" | (string & {});
export type ChannelMessagePersistenceType = "PERSISTENT" | "NON_PERSISTENT" | (string & {});
export type ChannelMessageStatus = "SENT" | "PENDING" | "FAILED" | "DENIED" | (string & {});
export type StatusDetail = string;
export interface ChannelMessageStatusStructure {
  Value?: ChannelMessageStatus;
  Detail?: string;
}
export interface Target {
  MemberArn?: string;
}
export type TargetList = Target[];
export interface ChannelMessage {
  ChannelArn?: string;
  MessageId?: string;
  Content?: string | redacted.Redacted<string>;
  Metadata?: string | redacted.Redacted<string>;
  Type?: ChannelMessageType;
  CreatedTimestamp?: Date;
  LastEditedTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
  Sender?: Identity;
  Redacted?: boolean;
  Persistence?: ChannelMessagePersistenceType;
  Status?: ChannelMessageStatusStructure;
  MessageAttributes?: { [key: string]: MessageAttributeValue | undefined };
  SubChannelId?: string;
  ContentType?: string | redacted.Redacted<string>;
  Target?: Target[];
}
export interface GetChannelMessageResponse {
  ChannelMessage?: ChannelMessage;
}
export interface GetChannelMessageStatusRequest {
  ChannelArn: string;
  MessageId: string;
  ChimeBearer: string;
  SubChannelId?: string;
}
export interface GetChannelMessageStatusResponse {
  Status?: ChannelMessageStatusStructure;
}
export type NetworkType = "IPV4_ONLY" | "DUAL_STACK" | (string & {});
export interface GetMessagingSessionEndpointRequest {
  NetworkType?: NetworkType;
}
export type UrlType = string;
export interface MessagingSessionEndpoint {
  Url?: string;
}
export interface GetMessagingSessionEndpointResponse {
  Endpoint?: MessagingSessionEndpoint;
}
export interface GetMessagingStreamingConfigurationsRequest {
  AppInstanceArn: string;
}
export type MessagingDataType = "Channel" | "ChannelMessage" | (string & {});
export interface StreamingConfiguration {
  DataType: MessagingDataType;
  ResourceArn: string;
}
export type StreamingConfigurationList = StreamingConfiguration[];
export interface GetMessagingStreamingConfigurationsResponse {
  StreamingConfigurations?: StreamingConfiguration[];
}
export type MaxResults = number;
export type NextToken = string | redacted.Redacted<string>;
export interface ListChannelBansRequest {
  ChannelArn: string;
  MaxResults?: number;
  NextToken?: string | redacted.Redacted<string>;
  ChimeBearer: string;
}
export interface ChannelBanSummary {
  Member?: Identity;
}
export type ChannelBanSummaryList = ChannelBanSummary[];
export interface ListChannelBansResponse {
  ChannelArn?: string;
  NextToken?: string | redacted.Redacted<string>;
  ChannelBans?: ChannelBanSummary[];
}
export interface ListChannelFlowsRequest {
  AppInstanceArn: string;
  MaxResults?: number;
  NextToken?: string | redacted.Redacted<string>;
}
export interface ChannelFlowSummary {
  ChannelFlowArn?: string;
  Name?: string | redacted.Redacted<string>;
  Processors?: Processor[];
}
export type ChannelFlowSummaryList = ChannelFlowSummary[];
export interface ListChannelFlowsResponse {
  ChannelFlows?: ChannelFlowSummary[];
  NextToken?: string | redacted.Redacted<string>;
}
export interface ListChannelMembershipsRequest {
  ChannelArn: string;
  Type?: ChannelMembershipType;
  MaxResults?: number;
  NextToken?: string | redacted.Redacted<string>;
  ChimeBearer: string;
  SubChannelId?: string;
}
export interface ChannelMembershipSummary {
  Member?: Identity;
}
export type ChannelMembershipSummaryList = ChannelMembershipSummary[];
export interface ListChannelMembershipsResponse {
  ChannelArn?: string;
  ChannelMemberships?: ChannelMembershipSummary[];
  NextToken?: string | redacted.Redacted<string>;
}
export interface ListChannelMembershipsForAppInstanceUserRequest {
  AppInstanceUserArn?: string;
  MaxResults?: number;
  NextToken?: string | redacted.Redacted<string>;
  ChimeBearer: string;
}
export type ChannelMembershipForAppInstanceUserSummaryList =
  ChannelMembershipForAppInstanceUserSummary[];
export interface ListChannelMembershipsForAppInstanceUserResponse {
  ChannelMemberships?: ChannelMembershipForAppInstanceUserSummary[];
  NextToken?: string | redacted.Redacted<string>;
}
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export interface ListChannelMessagesRequest {
  ChannelArn: string;
  SortOrder?: SortOrder;
  NotBefore?: Date;
  NotAfter?: Date;
  MaxResults?: number;
  NextToken?: string | redacted.Redacted<string>;
  ChimeBearer: string;
  SubChannelId?: string;
}
export interface ChannelMessageSummary {
  MessageId?: string;
  Content?: string | redacted.Redacted<string>;
  Metadata?: string | redacted.Redacted<string>;
  Type?: ChannelMessageType;
  CreatedTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
  LastEditedTimestamp?: Date;
  Sender?: Identity;
  Redacted?: boolean;
  Status?: ChannelMessageStatusStructure;
  MessageAttributes?: { [key: string]: MessageAttributeValue | undefined };
  ContentType?: string | redacted.Redacted<string>;
  Target?: Target[];
}
export type ChannelMessageSummaryList = ChannelMessageSummary[];
export interface ListChannelMessagesResponse {
  ChannelArn?: string;
  NextToken?: string | redacted.Redacted<string>;
  ChannelMessages?: ChannelMessageSummary[];
  SubChannelId?: string;
}
export interface ListChannelModeratorsRequest {
  ChannelArn: string;
  MaxResults?: number;
  NextToken?: string | redacted.Redacted<string>;
  ChimeBearer: string;
}
export interface ChannelModeratorSummary {
  Moderator?: Identity;
}
export type ChannelModeratorSummaryList = ChannelModeratorSummary[];
export interface ListChannelModeratorsResponse {
  ChannelArn?: string;
  NextToken?: string | redacted.Redacted<string>;
  ChannelModerators?: ChannelModeratorSummary[];
}
export interface ListChannelsRequest {
  AppInstanceArn: string;
  Privacy?: ChannelPrivacy;
  MaxResults?: number;
  NextToken?: string | redacted.Redacted<string>;
  ChimeBearer: string;
}
export type ChannelSummaryList = ChannelSummary[];
export interface ListChannelsResponse {
  Channels?: ChannelSummary[];
  NextToken?: string | redacted.Redacted<string>;
}
export interface ListChannelsAssociatedWithChannelFlowRequest {
  ChannelFlowArn: string;
  MaxResults?: number;
  NextToken?: string | redacted.Redacted<string>;
}
export interface ChannelAssociatedWithFlowSummary {
  Name?: string | redacted.Redacted<string>;
  ChannelArn?: string;
  Mode?: ChannelMode;
  Privacy?: ChannelPrivacy;
  Metadata?: string | redacted.Redacted<string>;
}
export type ChannelAssociatedWithFlowSummaryList = ChannelAssociatedWithFlowSummary[];
export interface ListChannelsAssociatedWithChannelFlowResponse {
  Channels?: ChannelAssociatedWithFlowSummary[];
  NextToken?: string | redacted.Redacted<string>;
}
export interface ListChannelsModeratedByAppInstanceUserRequest {
  AppInstanceUserArn?: string;
  MaxResults?: number;
  NextToken?: string | redacted.Redacted<string>;
  ChimeBearer: string;
}
export type ChannelModeratedByAppInstanceUserSummaryList =
  ChannelModeratedByAppInstanceUserSummary[];
export interface ListChannelsModeratedByAppInstanceUserResponse {
  Channels?: ChannelModeratedByAppInstanceUserSummary[];
  NextToken?: string | redacted.Redacted<string>;
}
export interface ListSubChannelsRequest {
  ChannelArn: string;
  ChimeBearer: string;
  MaxResults?: number;
  NextToken?: string | redacted.Redacted<string>;
}
export type MembershipCount = number;
export interface SubChannelSummary {
  SubChannelId?: string;
  MembershipCount?: number;
}
export type SubChannelSummaryList = SubChannelSummary[];
export interface ListSubChannelsResponse {
  ChannelArn?: string;
  SubChannels?: SubChannelSummary[];
  NextToken?: string | redacted.Redacted<string>;
}
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface PutChannelExpirationSettingsRequest {
  ChannelArn: string;
  ChimeBearer?: string;
  ExpirationSettings?: ExpirationSettings;
}
export interface PutChannelExpirationSettingsResponse {
  ChannelArn?: string;
  ExpirationSettings?: ExpirationSettings;
}
export interface PutChannelMembershipPreferencesRequest {
  ChannelArn: string;
  MemberArn: string;
  ChimeBearer: string;
  Preferences: ChannelMembershipPreferences;
}
export interface PutChannelMembershipPreferencesResponse {
  ChannelArn?: string;
  Member?: Identity;
  Preferences?: ChannelMembershipPreferences;
}
export interface PutMessagingStreamingConfigurationsRequest {
  AppInstanceArn: string;
  StreamingConfigurations: StreamingConfiguration[];
}
export interface PutMessagingStreamingConfigurationsResponse {
  StreamingConfigurations?: StreamingConfiguration[];
}
export interface RedactChannelMessageRequest {
  ChannelArn: string;
  MessageId: string;
  ChimeBearer: string;
  SubChannelId?: string;
}
export interface RedactChannelMessageResponse {
  ChannelArn?: string;
  MessageId?: string;
  SubChannelId?: string;
}
export type SearchFieldKey = "MEMBERS" | (string & {});
export type SearchFieldValue = string;
export type SearchFieldValues = string[];
export type SearchFieldOperator = "EQUALS" | "INCLUDES" | (string & {});
export interface SearchField {
  Key: SearchFieldKey;
  Values: string[];
  Operator: SearchFieldOperator;
}
export type SearchFields = SearchField[];
export interface SearchChannelsRequest {
  ChimeBearer?: string;
  Fields: SearchField[];
  MaxResults?: number;
  NextToken?: string | redacted.Redacted<string>;
}
export interface SearchChannelsResponse {
  Channels?: ChannelSummary[];
  NextToken?: string | redacted.Redacted<string>;
}
export interface SendChannelMessageRequest {
  ChannelArn: string;
  Content: string | redacted.Redacted<string>;
  Type: ChannelMessageType;
  Persistence: ChannelMessagePersistenceType;
  Metadata?: string | redacted.Redacted<string>;
  ClientRequestToken: string | redacted.Redacted<string>;
  ChimeBearer: string;
  PushNotification?: PushNotificationConfiguration;
  MessageAttributes?: { [key: string]: MessageAttributeValue | undefined };
  SubChannelId?: string;
  ContentType?: string | redacted.Redacted<string>;
  Target?: Target[];
}
export interface SendChannelMessageResponse {
  ChannelArn?: string;
  MessageId?: string;
  Status?: ChannelMessageStatusStructure;
  SubChannelId?: string;
}
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = (string | redacted.Redacted<string>)[];
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: (string | redacted.Redacted<string>)[];
}
export interface UntagResourceResponse {}
export interface UpdateChannelRequest {
  ChannelArn: string;
  Name?: string | redacted.Redacted<string>;
  Mode?: ChannelMode;
  Metadata?: string | redacted.Redacted<string>;
  ChimeBearer: string;
}
export interface UpdateChannelResponse {
  ChannelArn?: string;
}
export interface UpdateChannelFlowRequest {
  ChannelFlowArn: string;
  Processors: Processor[];
  Name: string | redacted.Redacted<string>;
}
export interface UpdateChannelFlowResponse {
  ChannelFlowArn?: string;
}
export interface UpdateChannelMessageRequest {
  ChannelArn: string;
  MessageId: string;
  Content: string | redacted.Redacted<string>;
  Metadata?: string | redacted.Redacted<string>;
  ChimeBearer: string;
  SubChannelId?: string;
  ContentType?: string | redacted.Redacted<string>;
}
export interface UpdateChannelMessageResponse {
  ChannelArn?: string;
  MessageId?: string;
  Status?: ChannelMessageStatusStructure;
  SubChannelId?: string;
}
export interface UpdateChannelReadMarkerRequest {
  ChannelArn: string;
  ChimeBearer: string;
}
export interface UpdateChannelReadMarkerResponse {
  ChannelArn?: string;
}
export type AssociateChannelFlowError =
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
 * Associates a channel flow with a channel. Once associated, all messages to that channel go through channel flow processors. To stop processing, use the
 * `DisassociateChannelFlow` API.
 *
 * Only administrators or channel moderators can associate a channel flow. The
 * `x-amz-chime-bearer` request header is mandatory. Use the ARN of the
 * `AppInstanceUser` or `AppInstanceBot`
 * that makes the API call as the value in the header.
 */
export const associateChannelFlow: API.OperationMethod<
  AssociateChannelFlowRequest,
  AssociateChannelFlowResponse,
  AssociateChannelFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(568, __c71, 0) as any as S.Schema<AssociateChannelFlowRequest>,
  output: __S(576, __c72, 0) as any as S.Schema<AssociateChannelFlowResponse>,
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
  operationName: "AssociateChannelFlow",
}));

export type BatchCreateChannelMembershipError =
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
 * Adds a specified number of users and bots to a channel.
 */
export const batchCreateChannelMembership: API.OperationMethod<
  BatchCreateChannelMembershipRequest,
  BatchCreateChannelMembershipResponse,
  BatchCreateChannelMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<BatchCreateChannelMembershipRequest>,
  output: __S(5, __c0, 5) as any as S.Schema<BatchCreateChannelMembershipResponse>,
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
  operationName: "BatchCreateChannelMembership",
}));

export type ChannelFlowCallbackError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Calls back Amazon Chime SDK messaging with a processing response message. This should be invoked from the processor Lambda. This is a developer API.
 *
 * You can return one of the following processing responses:
 *
 * - Update message content or metadata
 *
 * - Deny a message
 *
 * - Make no changes to the message
 */
export const channelFlowCallback: API.OperationMethod<
  ChannelFlowCallbackRequest,
  ChannelFlowCallbackResponse,
  ChannelFlowCallbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(25, __c3, 1) as any as S.Schema<ChannelFlowCallbackRequest>,
  output: __S(26, __c3, 2) as any as S.Schema<ChannelFlowCallbackResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ChannelFlowCallback",
}));

export type CreateChannelError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates a channel to which you can add users and send messages.
 *
 * **Restriction**: You can't change a channel's
 * privacy.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 */
export const createChannel: API.OperationMethod<
  CreateChannelRequest,
  CreateChannelResponse,
  CreateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<CreateChannelRequest>,
  output: __S(88, __c11, 0) as any as S.Schema<CreateChannelResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChannel",
}));

export type CreateChannelBanError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Permanently bans a member from a channel. Moderators can't add banned members to a
 * channel. To undo a ban, you first have to `DeleteChannelBan`, and then
 * `CreateChannelMembership`. Bans are cleaned up when you delete users or
 * channels.
 *
 * If you ban a user who is already part of a channel, that user is automatically kicked
 * from the channel.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 */
export const createChannelBan: API.OperationMethod<
  CreateChannelBanRequest,
  CreateChannelBanResponse,
  CreateChannelBanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<CreateChannelBanRequest>,
  output: __S(97, __c12, 1) as any as S.Schema<CreateChannelBanResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChannelBan",
}));

export type CreateChannelFlowError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates a channel flow, a container for processors. Processors are AWS Lambda functions
 * that perform actions on chat messages, such as stripping out profanity. You can associate
 * channel flows with channels, and the processors in the channel flow then take action on all
 * messages sent to that channel. This is a developer API.
 *
 * Channel flows process the following items:
 *
 * - New and updated messages
 *
 * - Persistent and non-persistent messages
 *
 * - The Standard message type
 *
 * Channel flows don't process Control or System messages. For more information about the message types provided by Chime SDK messaging, refer to
 * Message types in the *Amazon Chime developer guide*.
 */
export const createChannelFlow: API.OperationMethod<
  CreateChannelFlowRequest,
  CreateChannelFlowResponse,
  CreateChannelFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<CreateChannelFlowRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<CreateChannelFlowResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChannelFlow",
}));

export type CreateChannelMembershipError =
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
 * Adds a member to a channel. The `InvitedBy` field in `ChannelMembership`
 * is derived from the request header. A channel member can:
 *
 * - List messages
 *
 * - Send messages
 *
 * - Receive messages
 *
 * - Edit their own messages
 *
 * - Leave the channel
 *
 * Privacy settings impact this action as follows:
 *
 * - Public Channels: You do not need to be a member to list messages, but you must be
 * a member to send messages.
 *
 * - Private Channels: You must be a member to list or send messages.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUserArn` or `AppInstanceBot` that makes the API call
 * as the value in the header.
 */
export const createChannelMembership: API.OperationMethod<
  CreateChannelMembershipRequest,
  CreateChannelMembershipResponse,
  CreateChannelMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<CreateChannelMembershipRequest>,
  output: __S(129, __c16, 1) as any as S.Schema<CreateChannelMembershipResponse>,
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
  operationName: "CreateChannelMembership",
}));

export type CreateChannelModeratorError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates a new `ChannelModerator`. A channel moderator can:
 *
 * - Add and remove other members of the channel.
 *
 * - Add and remove other moderators of the channel.
 *
 * - Add and remove user bans for the channel.
 *
 * - Redact messages in the channel.
 *
 * - List messages in the channel.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot`of the user that makes the API call as the value in
 * the header.
 */
export const createChannelModerator: API.OperationMethod<
  CreateChannelModeratorRequest,
  CreateChannelModeratorResponse,
  CreateChannelModeratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<CreateChannelModeratorRequest>,
  output: __S(137, __c17, 1) as any as S.Schema<CreateChannelModeratorResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChannelModerator",
}));

export type DeleteChannelError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Immediately makes a channel and its memberships inaccessible and marks them for
 * deletion. This is an irreversible process.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUserArn` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 */
export const deleteChannel: API.OperationMethod<
  DeleteChannelRequest,
  DeleteChannelResponse,
  DeleteChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<DeleteChannelRequest>,
  output: __S(576, __c72, 0) as any as S.Schema<DeleteChannelResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChannel",
}));

export type DeleteChannelBanError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Removes a member from a channel's ban list.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 */
export const deleteChannelBan: API.OperationMethod<
  DeleteChannelBanRequest,
  DeleteChannelBanResponse,
  DeleteChannelBanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<DeleteChannelBanRequest>,
  output: __S(576, __c72, 0) as any as S.Schema<DeleteChannelBanResponse>,
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
  operationName: "DeleteChannelBan",
}));

export type DeleteChannelFlowError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes a channel flow, an irreversible process. This is a developer API.
 *
 * This API works only when the channel flow is not associated with any channel. To get a list of all channels that a channel flow is associated with, use the
 * `ListChannelsAssociatedWithChannelFlow` API. Use the `DisassociateChannelFlow` API to disassociate a channel flow from all channels.
 */
export const deleteChannelFlow: API.OperationMethod<
  DeleteChannelFlowRequest,
  DeleteChannelFlowResponse,
  DeleteChannelFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<DeleteChannelFlowRequest>,
  output: __S(576, __c72, 0) as any as S.Schema<DeleteChannelFlowResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChannelFlow",
}));

export type DeleteChannelMembershipError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Removes a member from a channel.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * `AppInstanceUserArn` of the user that makes the API call as the value in
 * the header.
 */
export const deleteChannelMembership: API.OperationMethod<
  DeleteChannelMembershipRequest,
  DeleteChannelMembershipResponse,
  DeleteChannelMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<DeleteChannelMembershipRequest>,
  output: __S(576, __c72, 0) as any as S.Schema<DeleteChannelMembershipResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChannelMembership",
}));

export type DeleteChannelMessageError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes a channel message. Only admins can perform this action. Deletion makes messages
 * inaccessible immediately. A background process deletes any revisions created by
 * `UpdateChannelMessage`.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 */
export const deleteChannelMessage: API.OperationMethod<
  DeleteChannelMessageRequest,
  DeleteChannelMessageResponse,
  DeleteChannelMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<DeleteChannelMessageRequest>,
  output: __S(576, __c72, 0) as any as S.Schema<DeleteChannelMessageResponse>,
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
  operationName: "DeleteChannelMessage",
}));

export type DeleteChannelModeratorError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes a channel moderator.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 */
export const deleteChannelModerator: API.OperationMethod<
  DeleteChannelModeratorRequest,
  DeleteChannelModeratorResponse,
  DeleteChannelModeratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<DeleteChannelModeratorRequest>,
  output: __S(576, __c72, 0) as any as S.Schema<DeleteChannelModeratorResponse>,
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
  operationName: "DeleteChannelModerator",
}));

export type DeleteMessagingStreamingConfigurationsError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes the streaming configurations for an `AppInstance`. For more information, see
 * Streaming messaging data in the *Amazon Chime SDK Developer Guide*.
 */
export const deleteMessagingStreamingConfigurations: API.OperationMethod<
  DeleteMessagingStreamingConfigurationsRequest,
  DeleteMessagingStreamingConfigurationsResponse,
  DeleteMessagingStreamingConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<DeleteMessagingStreamingConfigurationsRequest>,
  output: __S(576, __c72, 0) as any as S.Schema<DeleteMessagingStreamingConfigurationsResponse>,
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
  operationName: "DeleteMessagingStreamingConfigurations",
}));

export type DescribeChannelError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Returns the full details of a channel in an Amazon Chime
 * `AppInstance`.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 */
export const describeChannel: API.OperationMethod<
  DescribeChannelRequest,
  DescribeChannelResponse,
  DescribeChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<DescribeChannelRequest>,
  output: __S(202, __c25, 2) as any as S.Schema<DescribeChannelResponse>,
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
  operationName: "DescribeChannel",
}));

export type DescribeChannelBanError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Returns the full details of a channel ban.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 */
export const describeChannelBan: API.OperationMethod<
  DescribeChannelBanRequest,
  DescribeChannelBanResponse,
  DescribeChannelBanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<DescribeChannelBanRequest>,
  output: __S(210, __c26, 2) as any as S.Schema<DescribeChannelBanResponse>,
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
  operationName: "DescribeChannelBan",
}));

export type DescribeChannelFlowError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Returns the full details of a channel flow in an Amazon Chime `AppInstance`. This is a developer API.
 */
export const describeChannelFlow: API.OperationMethod<
  DescribeChannelFlowRequest,
  DescribeChannelFlowResponse,
  DescribeChannelFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(216, __c27, 0) as any as S.Schema<DescribeChannelFlowRequest>,
  output: __S(218, __c27, 2) as any as S.Schema<DescribeChannelFlowResponse>,
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
  operationName: "DescribeChannelFlow",
}));

export type DescribeChannelMembershipError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Returns the full details of a user's channel membership.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 */
export const describeChannelMembership: API.OperationMethod<
  DescribeChannelMembershipRequest,
  DescribeChannelMembershipResponse,
  DescribeChannelMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c28, 0) as any as S.Schema<DescribeChannelMembershipRequest>,
  output: __S(226, __c28, 2) as any as S.Schema<DescribeChannelMembershipResponse>,
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
  operationName: "DescribeChannelMembership",
}));

export type DescribeChannelMembershipForAppInstanceUserError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Returns the details of a channel based on the membership of the specified
 * `AppInstanceUser` or `AppInstanceBot`.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 */
export const describeChannelMembershipForAppInstanceUser: API.OperationMethod<
  DescribeChannelMembershipForAppInstanceUserRequest,
  DescribeChannelMembershipForAppInstanceUserResponse,
  DescribeChannelMembershipForAppInstanceUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<DescribeChannelMembershipForAppInstanceUserRequest>,
  output: __S(
    233,
    __c29,
    1,
  ) as any as S.Schema<DescribeChannelMembershipForAppInstanceUserResponse>,
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
  operationName: "DescribeChannelMembershipForAppInstanceUser",
}));

export type DescribeChannelModeratedByAppInstanceUserError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Returns the full details of a channel moderated by the specified
 * `AppInstanceUser` or `AppInstanceBot`.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 */
export const describeChannelModeratedByAppInstanceUser: API.OperationMethod<
  DescribeChannelModeratedByAppInstanceUserRequest,
  DescribeChannelModeratedByAppInstanceUserResponse,
  DescribeChannelModeratedByAppInstanceUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c32, 0) as any as S.Schema<DescribeChannelModeratedByAppInstanceUserRequest>,
  output: __S(257, __c32, 1) as any as S.Schema<DescribeChannelModeratedByAppInstanceUserResponse>,
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
  operationName: "DescribeChannelModeratedByAppInstanceUser",
}));

export type DescribeChannelModeratorError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Returns the full details of a single ChannelModerator.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * `AppInstanceUserArn` of the user that makes the API call as the value in
 * the header.
 */
export const describeChannelModerator: API.OperationMethod<
  DescribeChannelModeratorRequest,
  DescribeChannelModeratorResponse,
  DescribeChannelModeratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c34, 0) as any as S.Schema<DescribeChannelModeratorRequest>,
  output: __S(274, __c34, 2) as any as S.Schema<DescribeChannelModeratorResponse>,
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
  operationName: "DescribeChannelModerator",
}));

export type DisassociateChannelFlowError =
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
 * Disassociates a channel flow from all its channels. Once disassociated, all messages to
 * that channel stop going through the channel flow processor.
 *
 * Only administrators or channel moderators can disassociate a channel flow.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 */
export const disassociateChannelFlow: API.OperationMethod<
  DisassociateChannelFlowRequest,
  DisassociateChannelFlowResponse,
  DisassociateChannelFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(280, __c35, 0) as any as S.Schema<DisassociateChannelFlowRequest>,
  output: __S(576, __c72, 0) as any as S.Schema<DisassociateChannelFlowResponse>,
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
  operationName: "DisassociateChannelFlow",
}));

export type GetChannelMembershipPreferencesError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Gets the membership preferences of an `AppInstanceUser` or `AppInstanceBot`
 * for the specified channel. A user or a bot must be a member of the channel and own the membership in order to retrieve membership preferences.
 * Users or bots in the `AppInstanceAdmin` and channel moderator roles can't
 * retrieve preferences for other users or bots. Banned users or bots can't retrieve membership preferences for the
 * channel from which they are banned.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 */
export const getChannelMembershipPreferences: API.OperationMethod<
  GetChannelMembershipPreferencesRequest,
  GetChannelMembershipPreferencesResponse,
  GetChannelMembershipPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c36, 0) as any as S.Schema<GetChannelMembershipPreferencesRequest>,
  output: __S(298, __c37, 2) as any as S.Schema<GetChannelMembershipPreferencesResponse>,
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
  operationName: "GetChannelMembershipPreferences",
}));

export type GetChannelMessageError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Gets the full details of a channel message.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 */
export const getChannelMessage: API.OperationMethod<
  GetChannelMessageRequest,
  GetChannelMessageResponse,
  GetChannelMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c38, 0) as any as S.Schema<GetChannelMessageRequest>,
  output: __S(306, __c38, 2) as any as S.Schema<GetChannelMessageResponse>,
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
  operationName: "GetChannelMessage",
}));

export type GetChannelMessageStatusError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Gets message status for a specified `messageId`. Use this API to determine the intermediate status of messages going through channel flow processing. The API provides an alternative to
 * retrieving message status if the event was not received because a client wasn't connected to a websocket.
 *
 * Messages can have any one of these statuses.
 *
 * ### SENT
 *
 * Message processed successfully
 *
 * ### PENDING
 *
 * Ongoing processing
 *
 * ### FAILED
 *
 * Processing failed
 *
 * ### DENIED
 *
 * Message denied by the processor
 *
 * - This API does not return statuses for denied messages, because we don't store them once the processor denies them.
 *
 * - Only the message sender can invoke this API.
 *
 * - The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 */
export const getChannelMessageStatus: API.OperationMethod<
  GetChannelMessageStatusRequest,
  GetChannelMessageStatusResponse,
  GetChannelMessageStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(328, __c41, 0) as any as S.Schema<GetChannelMessageStatusRequest>,
  output: __S(329, __c41, 1) as any as S.Schema<GetChannelMessageStatusResponse>,
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
  operationName: "GetChannelMessageStatus",
}));

export type GetMessagingSessionEndpointError =
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * The details of the endpoint for the messaging session.
 */
export const getMessagingSessionEndpoint: API.OperationMethod<
  GetMessagingSessionEndpointRequest,
  GetMessagingSessionEndpointResponse,
  GetMessagingSessionEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c42, 0) as any as S.Schema<GetMessagingSessionEndpointRequest>,
  output: __S(338, __c42, 2) as any as S.Schema<GetMessagingSessionEndpointResponse>,
  errors: [
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMessagingSessionEndpoint",
}));

export type GetMessagingStreamingConfigurationsError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves the data streaming configuration for an `AppInstance`. For more information, see
 * Streaming messaging data in the *Amazon Chime SDK Developer Guide*.
 */
export const getMessagingStreamingConfigurations: API.OperationMethod<
  GetMessagingStreamingConfigurationsRequest,
  GetMessagingStreamingConfigurationsResponse,
  GetMessagingStreamingConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(344, __c43, 0) as any as S.Schema<GetMessagingStreamingConfigurationsRequest>,
  output: __S(354, __c44, 2) as any as S.Schema<GetMessagingStreamingConfigurationsResponse>,
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
  operationName: "GetMessagingStreamingConfigurations",
}));

export type ListChannelBansError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists all the users and bots banned from a particular channel.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 */
export const listChannelBans: API.PaginatedOperationMethod<
  ListChannelBansRequest,
  ListChannelBansResponse,
  ListChannelBansError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(360, __c45, 0) as any as S.Schema<ListChannelBansRequest>,
  output: __S(361, __c45, 1) as any as S.Schema<ListChannelBansResponse>,
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
  operationName: "ListChannelBans",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListChannelFlowsError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Returns a paginated lists of all the channel flows created under a single Chime. This is a developer API.
 */
export const listChannelFlows: API.PaginatedOperationMethod<
  ListChannelFlowsRequest,
  ListChannelFlowsResponse,
  ListChannelFlowsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(376, __c47, 0) as any as S.Schema<ListChannelFlowsRequest>,
  output: __S(379, __c47, 3) as any as S.Schema<ListChannelFlowsResponse>,
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
  operationName: "ListChannelFlows",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListChannelMembershipsError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists all channel memberships in a channel.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 *
 * If you want to list the channels to which a specific app instance user belongs, see the
 * ListChannelMembershipsForAppInstanceUser API.
 */
export const listChannelMemberships: API.PaginatedOperationMethod<
  ListChannelMembershipsRequest,
  ListChannelMembershipsResponse,
  ListChannelMembershipsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(384, __c48, 0) as any as S.Schema<ListChannelMembershipsRequest>,
  output: __S(385, __c48, 1) as any as S.Schema<ListChannelMembershipsResponse>,
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
  operationName: "ListChannelMemberships",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListChannelMembershipsForAppInstanceUserError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists all channels that an `AppInstanceUser` or `AppInstanceBot` is a part of.
 * Only an `AppInstanceAdmin` can call the API with a user ARN that is not their own.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 */
export const listChannelMembershipsForAppInstanceUser: API.PaginatedOperationMethod<
  ListChannelMembershipsForAppInstanceUserRequest,
  ListChannelMembershipsForAppInstanceUserResponse,
  ListChannelMembershipsForAppInstanceUserError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(392, __c49, 0) as any as S.Schema<ListChannelMembershipsForAppInstanceUserRequest>,
  output: __S(394, __c49, 2) as any as S.Schema<ListChannelMembershipsForAppInstanceUserResponse>,
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
  operationName: "ListChannelMembershipsForAppInstanceUser",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListChannelMessagesError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * List all the messages in a channel. Returns a paginated list of
 * `ChannelMessages`. By default, sorted by creation timestamp in descending
 * order.
 *
 * Redacted messages appear in the results as empty, since they are only redacted, not
 * deleted. Deleted messages do not appear in the results. This action always returns the
 * latest version of an edited message.
 *
 * Also, the `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 */
export const listChannelMessages: API.PaginatedOperationMethod<
  ListChannelMessagesRequest,
  ListChannelMessagesResponse,
  ListChannelMessagesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(400, __c50, 0) as any as S.Schema<ListChannelMessagesRequest>,
  output: __S(403, __c50, 3) as any as S.Schema<ListChannelMessagesResponse>,
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
  operationName: "ListChannelMessages",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListChannelModeratorsError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists all the moderators for a channel.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 */
export const listChannelModerators: API.PaginatedOperationMethod<
  ListChannelModeratorsRequest,
  ListChannelModeratorsResponse,
  ListChannelModeratorsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(408, __c51, 0) as any as S.Schema<ListChannelModeratorsRequest>,
  output: __S(411, __c51, 3) as any as S.Schema<ListChannelModeratorsResponse>,
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
  operationName: "ListChannelModerators",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListChannelsError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists all Channels created under a single Chime App as a paginated list. You can specify
 * filters to narrow results.
 *
 * **Functionality & restrictions**
 *
 * - Use privacy = `PUBLIC` to retrieve all public channels in the
 * account.
 *
 * - Only an `AppInstanceAdmin` can set privacy = `PRIVATE` to
 * list the private channels in an account.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 */
export const listChannels: API.PaginatedOperationMethod<
  ListChannelsRequest,
  ListChannelsResponse,
  ListChannelsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(416, __c52, 0) as any as S.Schema<ListChannelsRequest>,
  output: __S(425, __c53, 1) as any as S.Schema<ListChannelsResponse>,
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
  operationName: "ListChannels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListChannelsAssociatedWithChannelFlowError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists all channels associated with a specified channel flow. You can associate a channel flow with multiple channels, but you can only associate a channel with one channel flow. This is a developer API.
 */
export const listChannelsAssociatedWithChannelFlow: API.PaginatedOperationMethod<
  ListChannelsAssociatedWithChannelFlowRequest,
  ListChannelsAssociatedWithChannelFlowResponse,
  ListChannelsAssociatedWithChannelFlowError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(432, __c54, 0) as any as S.Schema<ListChannelsAssociatedWithChannelFlowRequest>,
  output: __S(435, __c54, 3) as any as S.Schema<ListChannelsAssociatedWithChannelFlowResponse>,
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
  operationName: "ListChannelsAssociatedWithChannelFlow",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListChannelsModeratedByAppInstanceUserError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * A list of the channels moderated by an `AppInstanceUser`.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 */
export const listChannelsModeratedByAppInstanceUser: API.PaginatedOperationMethod<
  ListChannelsModeratedByAppInstanceUserRequest,
  ListChannelsModeratedByAppInstanceUserResponse,
  ListChannelsModeratedByAppInstanceUserError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(440, __c55, 0) as any as S.Schema<ListChannelsModeratedByAppInstanceUserRequest>,
  output: __S(442, __c55, 2) as any as S.Schema<ListChannelsModeratedByAppInstanceUserResponse>,
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
  operationName: "ListChannelsModeratedByAppInstanceUser",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSubChannelsError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists all the SubChannels in an elastic channel when given a channel ID. Available only to the app instance admins and channel moderators of elastic channels.
 */
export const listSubChannels: API.PaginatedOperationMethod<
  ListSubChannelsRequest,
  ListSubChannelsResponse,
  ListSubChannelsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(448, __c56, 0) as any as S.Schema<ListSubChannelsRequest>,
  output: __S(451, __c56, 3) as any as S.Schema<ListSubChannelsResponse>,
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
  operationName: "ListSubChannels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the tags applied to an Amazon Chime SDK messaging resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(456, __c57, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(457, __c57, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
  operationName: "ListTagsForResource",
}));

export type PutChannelExpirationSettingsError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Sets the number of days before the channel is automatically deleted.
 *
 * - A background process deletes expired channels within 6 hours of expiration.
 * Actual deletion times may vary.
 *
 * - Expired channels that have not yet been deleted appear as active, and you can update
 * their expiration settings. The system honors the new settings.
 *
 * - The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 */
export const putChannelExpirationSettings: API.OperationMethod<
  PutChannelExpirationSettingsRequest,
  PutChannelExpirationSettingsResponse,
  PutChannelExpirationSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c58, 0) as any as S.Schema<PutChannelExpirationSettingsRequest>,
  output: __S(465, __c58, 1) as any as S.Schema<PutChannelExpirationSettingsResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutChannelExpirationSettings",
}));

export type PutChannelMembershipPreferencesError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Sets the membership preferences of an `AppInstanceUser` or `AppInstanceBot`
 * for the specified channel. The user or bot must be a member of the channel. Only the user or bot who owns the
 * membership can set preferences. Users or bots in the `AppInstanceAdmin` and channel moderator roles can't set
 * preferences for other users. Banned users or bots can't set membership preferences for the channel from
 * which they are banned.
 *
 * The x-amz-chime-bearer request header is mandatory. Use the ARN of an
 * `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in the
 * header.
 */
export const putChannelMembershipPreferences: API.OperationMethod<
  PutChannelMembershipPreferencesRequest,
  PutChannelMembershipPreferencesResponse,
  PutChannelMembershipPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(472, __c59, 0) as any as S.Schema<PutChannelMembershipPreferencesRequest>,
  output: __S(298, __c37, 2) as any as S.Schema<PutChannelMembershipPreferencesResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutChannelMembershipPreferences",
}));

export type PutMessagingStreamingConfigurationsError =
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
 * Sets the data streaming configuration for an `AppInstance`. For more information, see
 * Streaming messaging data in the *Amazon Chime SDK Developer Guide*.
 */
export const putMessagingStreamingConfigurations: API.OperationMethod<
  PutMessagingStreamingConfigurationsRequest,
  PutMessagingStreamingConfigurationsResponse,
  PutMessagingStreamingConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c60, 0) as any as S.Schema<PutMessagingStreamingConfigurationsRequest>,
  output: __S(354, __c44, 2) as any as S.Schema<PutMessagingStreamingConfigurationsResponse>,
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
  operationName: "PutMessagingStreamingConfigurations",
}));

export type RedactChannelMessageError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Redacts message content and metadata. The message exists in the back end, but the
 * action returns null content, and the state shows as redacted.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 */
export const redactChannelMessage: API.OperationMethod<
  RedactChannelMessageRequest,
  RedactChannelMessageResponse,
  RedactChannelMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(488, __c61, 0) as any as S.Schema<RedactChannelMessageRequest>,
  output: __S(489, __c61, 1) as any as S.Schema<RedactChannelMessageResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RedactChannelMessage",
}));

export type SearchChannelsError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Allows the `ChimeBearer` to search channels by channel members. Users or bots can search
 * across the channels that they belong to. Users in the `AppInstanceAdmin` role can search across
 * all channels.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 *
 * This operation isn't supported for `AppInstanceUsers` with a large number of memberships.
 */
export const searchChannels: API.PaginatedOperationMethod<
  SearchChannelsRequest,
  SearchChannelsResponse,
  SearchChannelsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(498, __c62, 2) as any as S.Schema<SearchChannelsRequest>,
  output: __S(425, __c53, 1) as any as S.Schema<SearchChannelsResponse>,
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
  operationName: "SearchChannels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SendChannelMessageError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Sends a message to a particular channel that the member is a part of.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 *
 * Also, `STANDARD` messages can be up to 4KB in size and contain metadata. Metadata is arbitrary,
 * and you can use it in a variety of ways, such as containing a link to an attachment.
 *
 * `CONTROL` messages are limited to 30 bytes and do not contain metadata.
 */
export const sendChannelMessage: API.OperationMethod<
  SendChannelMessageRequest,
  SendChannelMessageResponse,
  SendChannelMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(504, __c63, 0) as any as S.Schema<SendChannelMessageRequest>,
  output: __S(512, __c64, 0) as any as S.Schema<SendChannelMessageResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendChannelMessage",
}));

export type TagResourceError =
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Applies the specified tags to the specified Amazon Chime SDK messaging resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(520, __c65, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(576, __c72, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
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
  operationName: "TagResource",
}));

export type UntagResourceError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Removes the specified tags from the specified Amazon Chime SDK messaging resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c66, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(576, __c72, 0) as any as S.Schema<UntagResourceResponse>,
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
  operationName: "UntagResource",
}));

export type UpdateChannelError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Update a channel's attributes.
 *
 * **Restriction**: You can't change a channel's privacy.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 */
export const updateChannel: API.OperationMethod<
  UpdateChannelRequest,
  UpdateChannelResponse,
  UpdateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(536, __c67, 0) as any as S.Schema<UpdateChannelRequest>,
  output: __S(88, __c11, 0) as any as S.Schema<UpdateChannelResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateChannel",
}));

export type UpdateChannelFlowError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates channel flow attributes. This is a developer API.
 */
export const updateChannelFlow: API.OperationMethod<
  UpdateChannelFlowRequest,
  UpdateChannelFlowResponse,
  UpdateChannelFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c68, 0) as any as S.Schema<UpdateChannelFlowRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<UpdateChannelFlowResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateChannelFlow",
}));

export type UpdateChannelMessageError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates the content of a message.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 */
export const updateChannelMessage: API.OperationMethod<
  UpdateChannelMessageRequest,
  UpdateChannelMessageResponse,
  UpdateChannelMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(552, __c69, 0) as any as S.Schema<UpdateChannelMessageRequest>,
  output: __S(512, __c64, 0) as any as S.Schema<UpdateChannelMessageResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateChannelMessage",
}));

export type UpdateChannelReadMarkerError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * The details of the time when a user last read messages in a channel.
 *
 * The `x-amz-chime-bearer` request header is mandatory. Use the
 * ARN of the `AppInstanceUser` or `AppInstanceBot` that makes the API call as the value in
 * the header.
 */
export const updateChannelReadMarker: API.OperationMethod<
  UpdateChannelReadMarkerRequest,
  UpdateChannelReadMarkerResponse,
  UpdateChannelReadMarkerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c70, 0) as any as S.Schema<UpdateChannelReadMarkerRequest>,
  output: __S(88, __c11, 0) as any as S.Schema<UpdateChannelReadMarkerResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateChannelReadMarker",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          Type: S.optional(S.String),
          MemberArns: __S(8, __c1, 0),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
          SubChannelId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/channels/{ChannelArn}/memberships?operation=batch-create",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchCreateChannelMembershipRequest" });
    case 1:
      return S.Array(__S(16, __c2, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          InvitedBy: S.optional(__S(16, __c2, 0)),
          Type: S.optional(S.String),
          Members: S.optional(__S(1, __c0, 1)),
          ChannelArn: S.optional(S.String),
          SubChannelId: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchChannelMemberships" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          MemberArn: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchCreateChannelMembershipError" });
    case 4:
      return S.Array(__S(3, __c0, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          BatchChannelMemberships: S.optional(__S(2, __c0, 2)),
          Errors: S.optional(__S(4, __c0, 4)),
        }),
      ).annotate({ identifier: "BatchCreateChannelMembershipResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String), Name: S.optional(SensitiveString) }),
      ).annotate({ identifier: "Identity" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MessageId: S.String,
          Content: S.optional(SensitiveString),
          Metadata: S.optional(SensitiveString),
          PushNotification: S.optional(__S(48, __c6, 0)),
          MessageAttributes: S.optional(__S(33, __c4, 1)),
          SubChannelId: S.optional(S.String),
          ContentType: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ChannelMessageCallback" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CallbackId: S.String.pipe(T.IdempotencyToken()),
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          DeleteResource: S.optional(S.Boolean),
          ChannelMessage: __S(24, __c3, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/channels/{ChannelArn}?operation=channel-flow-callback",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ChannelFlowCallbackRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ ChannelArn: S.optional(S.String), CallbackId: S.optional(S.String) }),
      ).annotate({ identifier: "ChannelFlowCallbackResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ StringValues: S.optional(__S(40, __c5, 0)) })).annotate({
        identifier: "MessageAttributeValue",
      });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(32, __c4, 0).pipe(S.optional));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Title: S.optional(SensitiveString),
          Body: S.optional(SensitiveString),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "PushNotificationConfiguration" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppInstanceArn: S.String,
          Name: SensitiveString,
          Mode: S.optional(S.String),
          Privacy: S.optional(S.String),
          Metadata: S.optional(SensitiveString),
          ClientRequestToken: SensitiveString.pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(65, __c8, 1)),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
          ChannelId: S.optional(SensitiveString),
          MemberArns: S.optional(__S(8, __c1, 0)),
          ModeratorArns: S.optional(__S(8, __c1, 0)),
          ElasticChannelConfiguration: S.optional(__S(72, __c9, 0)),
          ExpirationSettings: S.optional(__S(80, __c10, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/channels" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateChannelRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: SensitiveString, Value: SensitiveString })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(64, __c8, 0));
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaximumSubChannels: S.Number,
          TargetMembershipsPerSubChannel: S.Number,
          MinimumMembershipPercentage: S.Number,
        }),
      ).annotate({ identifier: "ElasticChannelConfiguration" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ExpirationDays: S.Number, ExpirationCriterion: S.String }),
      ).annotate({ identifier: "ExpirationSettings" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ChannelArn: S.optional(S.String) })).annotate({
        identifier: "CreateChannelResponse",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          MemberArn: S.String,
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/channels/{ChannelArn}/bans" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateChannelBanRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ChannelArn: S.optional(S.String), Member: S.optional(__S(16, __c2, 0)) }),
      ).annotate({ identifier: "CreateChannelBanResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppInstanceArn: S.String,
          Processors: __S(115, __c14, 3),
          Name: SensitiveString,
          Tags: S.optional(__S(65, __c8, 1)),
          ClientRequestToken: SensitiveString.pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/channel-flows" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateChannelFlowRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, InvocationType: S.String }),
      ).annotate({ identifier: "LambdaConfiguration" });
    case 1:
      return S.suspend(() => S.Struct({ Lambda: __S(112, __c14, 0) })).annotate({
        identifier: "ProcessorConfiguration",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Name: SensitiveString,
          Configuration: __S(113, __c14, 1),
          ExecutionOrder: S.Number,
          FallbackAction: S.String,
        }),
      ).annotate({ identifier: "Processor" });
    case 3:
      return S.Array(__S(114, __c14, 2));
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ChannelFlowArn: S.optional(S.String) })).annotate({
        identifier: "CreateChannelFlowResponse",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          MemberArn: S.String,
          Type: S.String,
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
          SubChannelId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/channels/{ChannelArn}/memberships" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateChannelMembershipRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.optional(S.String),
          Member: S.optional(__S(16, __c2, 0)),
          SubChannelId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateChannelMembershipResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          ChannelModeratorArn: S.String,
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/channels/{ChannelArn}/moderators" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateChannelModeratorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.optional(S.String),
          ChannelModerator: S.optional(__S(16, __c2, 0)),
        }),
      ).annotate({ identifier: "CreateChannelModeratorResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/channels/{ChannelArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteChannelRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          MemberArn: S.String.pipe(T.HttpLabel("MemberArn")),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/channels/{ChannelArn}/bans/{MemberArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteChannelBanRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChannelFlowArn: S.String.pipe(T.HttpLabel("ChannelFlowArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/channel-flows/{ChannelFlowArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteChannelFlowRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          MemberArn: S.String.pipe(T.HttpLabel("MemberArn")),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
          SubChannelId: S.optional(S.String).pipe(T.HttpQuery("sub-channel-id")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/channels/{ChannelArn}/memberships/{MemberArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteChannelMembershipRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          MessageId: S.String.pipe(T.HttpLabel("MessageId")),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
          SubChannelId: S.optional(S.String).pipe(T.HttpQuery("sub-channel-id")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/channels/{ChannelArn}/messages/{MessageId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteChannelMessageRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          ChannelModeratorArn: S.String.pipe(T.HttpLabel("ChannelModeratorArn")),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/channels/{ChannelArn}/moderators/{ChannelModeratorArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteChannelModeratorRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AppInstanceArn: S.String.pipe(T.HttpLabel("AppInstanceArn")) }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/app-instances/{AppInstanceArn}/streaming-configurations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMessagingStreamingConfigurationsRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/channels/{ChannelArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeChannelRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(SensitiveString),
          ChannelArn: S.optional(S.String),
          Mode: S.optional(S.String),
          Privacy: S.optional(S.String),
          Metadata: S.optional(SensitiveString),
          CreatedBy: S.optional(__S(16, __c2, 0)),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastMessageTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ChannelFlowArn: S.optional(S.String),
          ElasticChannelConfiguration: S.optional(__S(72, __c9, 0)),
          ExpirationSettings: S.optional(__S(80, __c10, 0)),
        }),
      ).annotate({ identifier: "Channel" });
    case 2:
      return S.suspend(() => S.Struct({ Channel: S.optional(__S(201, __c25, 1)) })).annotate({
        identifier: "DescribeChannelResponse",
      });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          MemberArn: S.String.pipe(T.HttpLabel("MemberArn")),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/channels/{ChannelArn}/bans/{MemberArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeChannelBanRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Member: S.optional(__S(16, __c2, 0)),
          ChannelArn: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedBy: S.optional(__S(16, __c2, 0)),
        }),
      ).annotate({ identifier: "ChannelBan" });
    case 2:
      return S.suspend(() => S.Struct({ ChannelBan: S.optional(__S(209, __c26, 1)) })).annotate({
        identifier: "DescribeChannelBanResponse",
      });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChannelFlowArn: S.String.pipe(T.HttpLabel("ChannelFlowArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/channel-flows/{ChannelFlowArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeChannelFlowRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ChannelFlowArn: S.optional(S.String),
          Processors: S.optional(__S(115, __c14, 3)),
          Name: S.optional(SensitiveString),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ChannelFlow" });
    case 2:
      return S.suspend(() => S.Struct({ ChannelFlow: S.optional(__S(217, __c27, 1)) })).annotate({
        identifier: "DescribeChannelFlowResponse",
      });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          MemberArn: S.String.pipe(T.HttpLabel("MemberArn")),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
          SubChannelId: S.optional(S.String).pipe(T.HttpQuery("sub-channel-id")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/channels/{ChannelArn}/memberships/{MemberArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeChannelMembershipRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InvitedBy: S.optional(__S(16, __c2, 0)),
          Type: S.optional(S.String),
          Member: S.optional(__S(16, __c2, 0)),
          ChannelArn: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SubChannelId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ChannelMembership" });
    case 2:
      return S.suspend(() =>
        S.Struct({ ChannelMembership: S.optional(__S(225, __c28, 1)) }),
      ).annotate({ identifier: "DescribeChannelMembershipResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          AppInstanceUserArn: S.String.pipe(T.HttpQuery("app-instance-user-arn")),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/channels/{ChannelArn}?scope=app-instance-user-membership",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeChannelMembershipForAppInstanceUserRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ChannelMembership: S.optional(__S(249, __c31, 1)) }),
      ).annotate({ identifier: "DescribeChannelMembershipForAppInstanceUserResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(SensitiveString),
          ChannelArn: S.optional(S.String),
          Mode: S.optional(S.String),
          Privacy: S.optional(S.String),
          Metadata: S.optional(SensitiveString),
          LastMessageTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ChannelSummary" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          ReadMarkerTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SubChannelId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AppInstanceUserMembershipSummary" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ChannelSummary: S.optional(__S(240, __c30, 0)),
          AppInstanceUserMembershipSummary: S.optional(__S(248, __c31, 0)),
        }),
      ).annotate({ identifier: "ChannelMembershipForAppInstanceUserSummary" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          AppInstanceUserArn: S.String.pipe(T.HttpQuery("app-instance-user-arn")),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/channels/{ChannelArn}?scope=app-instance-user-moderated-channel",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeChannelModeratedByAppInstanceUserRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Channel: S.optional(__S(264, __c33, 0)) })).annotate({
        identifier: "DescribeChannelModeratedByAppInstanceUserResponse",
      });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ChannelSummary: S.optional(__S(240, __c30, 0)) })).annotate(
        { identifier: "ChannelModeratedByAppInstanceUserSummary" },
      );
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          ChannelModeratorArn: S.String.pipe(T.HttpLabel("ChannelModeratorArn")),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/channels/{ChannelArn}/moderators/{ChannelModeratorArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeChannelModeratorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Moderator: S.optional(__S(16, __c2, 0)),
          ChannelArn: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedBy: S.optional(__S(16, __c2, 0)),
        }),
      ).annotate({ identifier: "ChannelModerator" });
    case 2:
      return S.suspend(() =>
        S.Struct({ ChannelModerator: S.optional(__S(273, __c34, 1)) }),
      ).annotate({ identifier: "DescribeChannelModeratorResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          ChannelFlowArn: S.String.pipe(T.HttpLabel("ChannelFlowArn")),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/channels/{ChannelArn}/channel-flow/{ChannelFlowArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateChannelFlowRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          MemberArn: S.String.pipe(T.HttpLabel("MemberArn")),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/channels/{ChannelArn}/memberships/{MemberArn}/preferences",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetChannelMembershipPreferencesRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AllowNotifications: S.String, FilterRule: S.optional(SensitiveString) }),
      ).annotate({ identifier: "PushNotificationPreferences" });
    case 1:
      return S.suspend(() =>
        S.Struct({ PushNotifications: S.optional(__S(296, __c37, 0)) }),
      ).annotate({ identifier: "ChannelMembershipPreferences" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.optional(S.String),
          Member: S.optional(__S(16, __c2, 0)),
          Preferences: S.optional(__S(297, __c37, 1)),
        }),
      ).annotate({ identifier: "GetChannelMembershipPreferencesResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          MessageId: S.String.pipe(T.HttpLabel("MessageId")),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
          SubChannelId: S.optional(S.String).pipe(T.HttpQuery("sub-channel-id")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/channels/{ChannelArn}/messages/{MessageId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetChannelMessageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.optional(S.String),
          MessageId: S.optional(S.String),
          Content: S.optional(SensitiveString),
          Metadata: S.optional(SensitiveString),
          Type: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastEditedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Sender: S.optional(__S(16, __c2, 0)),
          Redacted: S.optional(S.Boolean),
          Persistence: S.optional(S.String),
          Status: S.optional(__S(312, __c39, 0)),
          MessageAttributes: S.optional(__S(33, __c4, 1)),
          SubChannelId: S.optional(S.String),
          ContentType: S.optional(SensitiveString),
          Target: S.optional(__S(321, __c40, 1)),
        }),
      ).annotate({ identifier: "ChannelMessage" });
    case 2:
      return S.suspend(() => S.Struct({ ChannelMessage: S.optional(__S(305, __c38, 1)) })).annotate(
        { identifier: "GetChannelMessageResponse" },
      );
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Value: S.optional(S.String), Detail: S.optional(S.String) }),
      ).annotate({ identifier: "ChannelMessageStatusStructure" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ MemberArn: S.optional(S.String) })).annotate({
        identifier: "Target",
      });
    case 1:
      return S.Array(__S(320, __c40, 0));
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          MessageId: S.String.pipe(T.HttpLabel("MessageId")),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
          SubChannelId: S.optional(S.String).pipe(T.HttpQuery("sub-channel-id")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/channels/{ChannelArn}/messages/{MessageId}?scope=message-status",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetChannelMessageStatusRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Status: S.optional(__S(312, __c39, 0)) })).annotate({
        identifier: "GetChannelMessageStatusResponse",
      });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NetworkType: S.optional(S.String).pipe(T.HttpQuery("network-type")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/endpoints/messaging-session" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMessagingSessionEndpointRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Url: S.optional(S.String) })).annotate({
        identifier: "MessagingSessionEndpoint",
      });
    case 2:
      return S.suspend(() => S.Struct({ Endpoint: S.optional(__S(337, __c42, 1)) })).annotate({
        identifier: "GetMessagingSessionEndpointResponse",
      });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AppInstanceArn: S.String.pipe(T.HttpLabel("AppInstanceArn")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/app-instances/{AppInstanceArn}/streaming-configurations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMessagingStreamingConfigurationsRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ DataType: S.String, ResourceArn: S.String })).annotate({
        identifier: "StreamingConfiguration",
      });
    case 1:
      return S.Array(__S(352, __c44, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ StreamingConfigurations: S.optional(__S(353, __c44, 1)) }),
      ).annotate({ identifier: "GetMessagingStreamingConfigurationsResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(SensitiveString).pipe(T.HttpQuery("next-token")),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/channels/{ChannelArn}/bans" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListChannelBansRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.optional(S.String),
          NextToken: S.optional(SensitiveString),
          ChannelBans: S.optional(__S(369, __c46, 1)),
        }),
      ).annotate({ identifier: "ListChannelBansResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Member: S.optional(__S(16, __c2, 0)) })).annotate({
        identifier: "ChannelBanSummary",
      });
    case 1:
      return S.Array(__S(368, __c46, 0));
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppInstanceArn: S.String.pipe(T.HttpQuery("app-instance-arn")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(SensitiveString).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/channel-flows" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListChannelFlowsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ChannelFlowArn: S.optional(S.String),
          Name: S.optional(SensitiveString),
          Processors: S.optional(__S(115, __c14, 3)),
        }),
      ).annotate({ identifier: "ChannelFlowSummary" });
    case 2:
      return S.Array(__S(377, __c47, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ChannelFlows: S.optional(__S(378, __c47, 2)),
          NextToken: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ListChannelFlowsResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          Type: S.optional(S.String).pipe(T.HttpQuery("type")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(SensitiveString).pipe(T.HttpQuery("next-token")),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
          SubChannelId: S.optional(S.String).pipe(T.HttpQuery("sub-channel-id")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/channels/{ChannelArn}/memberships" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListChannelMembershipsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.optional(S.String),
          ChannelMemberships: S.optional(__S(369, __c46, 1)),
          NextToken: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ListChannelMembershipsResponse" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppInstanceUserArn: S.optional(S.String).pipe(T.HttpQuery("app-instance-user-arn")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(SensitiveString).pipe(T.HttpQuery("next-token")),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/channels?scope=app-instance-user-memberships" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListChannelMembershipsForAppInstanceUserRequest" });
    case 1:
      return S.Array(__S(249, __c31, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ChannelMemberships: S.optional(__S(393, __c49, 1)),
          NextToken: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ListChannelMembershipsForAppInstanceUserResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          SortOrder: S.optional(S.String).pipe(T.HttpQuery("sort-order")),
          NotBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("not-before"),
          ),
          NotAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("not-after"),
          ),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(SensitiveString).pipe(T.HttpQuery("next-token")),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
          SubChannelId: S.optional(S.String).pipe(T.HttpQuery("sub-channel-id")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/channels/{ChannelArn}/messages" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListChannelMessagesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MessageId: S.optional(S.String),
          Content: S.optional(SensitiveString),
          Metadata: S.optional(SensitiveString),
          Type: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastEditedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Sender: S.optional(__S(16, __c2, 0)),
          Redacted: S.optional(S.Boolean),
          Status: S.optional(__S(312, __c39, 0)),
          MessageAttributes: S.optional(__S(33, __c4, 1)),
          ContentType: S.optional(SensitiveString),
          Target: S.optional(__S(321, __c40, 1)),
        }),
      ).annotate({ identifier: "ChannelMessageSummary" });
    case 2:
      return S.Array(__S(401, __c50, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.optional(S.String),
          NextToken: S.optional(SensitiveString),
          ChannelMessages: S.optional(__S(402, __c50, 2)),
          SubChannelId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListChannelMessagesResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(SensitiveString).pipe(T.HttpQuery("next-token")),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/channels/{ChannelArn}/moderators" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListChannelModeratorsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Moderator: S.optional(__S(16, __c2, 0)) })).annotate({
        identifier: "ChannelModeratorSummary",
      });
    case 2:
      return S.Array(__S(409, __c51, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.optional(S.String),
          NextToken: S.optional(SensitiveString),
          ChannelModerators: S.optional(__S(410, __c51, 2)),
        }),
      ).annotate({ identifier: "ListChannelModeratorsResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppInstanceArn: S.String.pipe(T.HttpQuery("app-instance-arn")),
          Privacy: S.optional(S.String).pipe(T.HttpQuery("privacy")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(SensitiveString).pipe(T.HttpQuery("next-token")),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/channels" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListChannelsRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(240, __c30, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Channels: S.optional(__S(424, __c53, 0)),
          NextToken: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ListChannelsResponse" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelFlowArn: S.String.pipe(T.HttpQuery("channel-flow-arn")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(SensitiveString).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/channels?scope=channel-flow-associations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListChannelsAssociatedWithChannelFlowRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(SensitiveString),
          ChannelArn: S.optional(S.String),
          Mode: S.optional(S.String),
          Privacy: S.optional(S.String),
          Metadata: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ChannelAssociatedWithFlowSummary" });
    case 2:
      return S.Array(__S(433, __c54, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Channels: S.optional(__S(434, __c54, 2)),
          NextToken: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ListChannelsAssociatedWithChannelFlowResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppInstanceUserArn: S.optional(S.String).pipe(T.HttpQuery("app-instance-user-arn")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(SensitiveString).pipe(T.HttpQuery("next-token")),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/channels?scope=app-instance-user-moderated-channels" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListChannelsModeratedByAppInstanceUserRequest" });
    case 1:
      return S.Array(__S(264, __c33, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Channels: S.optional(__S(441, __c55, 1)),
          NextToken: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ListChannelsModeratedByAppInstanceUserResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(SensitiveString).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/channels/{ChannelArn}/subchannels" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSubChannelsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ SubChannelId: S.optional(S.String), MembershipCount: S.optional(S.Number) }),
      ).annotate({ identifier: "SubChannelSummary" });
    case 2:
      return S.Array(__S(449, __c56, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.optional(S.String),
          SubChannels: S.optional(__S(450, __c56, 2)),
          NextToken: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ListSubChannelsResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String.pipe(T.HttpQuery("arn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/tags" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(65, __c8, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          ChimeBearer: S.optional(S.String).pipe(T.HttpHeader("x-amz-chime-bearer")),
          ExpirationSettings: S.optional(__S(80, __c10, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/channels/{ChannelArn}/expiration-settings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutChannelExpirationSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.optional(S.String),
          ExpirationSettings: S.optional(__S(80, __c10, 0)),
        }),
      ).annotate({ identifier: "PutChannelExpirationSettingsResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          MemberArn: S.String.pipe(T.HttpLabel("MemberArn")),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
          Preferences: __S(297, __c37, 1),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/channels/{ChannelArn}/memberships/{MemberArn}/preferences",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutChannelMembershipPreferencesRequest" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppInstanceArn: S.String.pipe(T.HttpLabel("AppInstanceArn")),
          StreamingConfigurations: __S(353, __c44, 1),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/app-instances/{AppInstanceArn}/streaming-configurations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutMessagingStreamingConfigurationsRequest" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          MessageId: S.String.pipe(T.HttpLabel("MessageId")),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
          SubChannelId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/channels/{ChannelArn}/messages/{MessageId}?operation=redact",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RedactChannelMessageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.optional(S.String),
          MessageId: S.optional(S.String),
          SubChannelId: S.optional(S.String),
        }),
      ).annotate({ identifier: "RedactChannelMessageResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.String, Values: __S(8, __c1, 0), Operator: S.String }),
      ).annotate({ identifier: "SearchField" });
    case 1:
      return S.Array(__S(496, __c62, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ChimeBearer: S.optional(S.String).pipe(T.HttpHeader("x-amz-chime-bearer")),
          Fields: __S(497, __c62, 1),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(SensitiveString).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/channels?operation=search" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchChannelsRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          Content: SensitiveString,
          Type: S.String,
          Persistence: S.String,
          Metadata: S.optional(SensitiveString),
          ClientRequestToken: SensitiveString.pipe(T.IdempotencyToken()),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
          PushNotification: S.optional(__S(48, __c6, 0)),
          MessageAttributes: S.optional(__S(33, __c4, 1)),
          SubChannelId: S.optional(S.String),
          ContentType: S.optional(SensitiveString),
          Target: S.optional(__S(321, __c40, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/channels/{ChannelArn}/messages" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendChannelMessageRequest" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.optional(S.String),
          MessageId: S.optional(S.String),
          Status: S.optional(__S(312, __c39, 0)),
          SubChannelId: S.optional(S.String),
        }),
      ).annotate({ identifier: "SendChannelMessageResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, Tags: __S(65, __c8, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags?operation=tag-resource" }),
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
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, TagKeys: __S(40, __c5, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags?operation=untag-resource" }),
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
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          Name: S.optional(SensitiveString),
          Mode: S.optional(S.String),
          Metadata: S.optional(SensitiveString),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/channels/{ChannelArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateChannelRequest" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelFlowArn: S.String.pipe(T.HttpLabel("ChannelFlowArn")),
          Processors: __S(115, __c14, 3),
          Name: SensitiveString,
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/channel-flows/{ChannelFlowArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateChannelFlowRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          MessageId: S.String.pipe(T.HttpLabel("MessageId")),
          Content: SensitiveString,
          Metadata: S.optional(SensitiveString),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
          SubChannelId: S.optional(S.String),
          ContentType: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/channels/{ChannelArn}/messages/{MessageId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateChannelMessageRequest" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/channels/{ChannelArn}/readMarker" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateChannelReadMarkerRequest" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.String.pipe(T.HttpLabel("ChannelArn")),
          ChannelFlowArn: S.String,
          ChimeBearer: S.String.pipe(T.HttpHeader("x-amz-chime-bearer")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/channels/{ChannelArn}/channel-flow" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateChannelFlowRequest" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "AssociateChannelFlowResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
