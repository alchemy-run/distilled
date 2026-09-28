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
  sdkId: "Chime SDK Messaging",
  target: "ChimeMessagingService",
  version: "2021-05-15",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://messaging-chime.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://messaging-chime.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

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
export type BatchCreateChannelMembershipErrors =
  BatchCreateChannelMembershipError_[];
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
export type MessageAttributeStringValues = (
  | string
  | redacted.Redacted<string>
)[];
export interface MessageAttributeValue {
  StringValues?: (string | redacted.Redacted<string>)[];
}
export type MessageAttributeMap = {
  [key: string]: MessageAttributeValue | undefined;
};
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
export type ExpirationCriterion =
  | "CREATED_TIMESTAMP"
  | "LAST_MESSAGE_TIMESTAMP"
  | (string & {});
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
export type ChannelMessagePersistenceType =
  | "PERSISTENT"
  | "NON_PERSISTENT"
  | (string & {});
export type ChannelMessageStatus =
  | "SENT"
  | "PENDING"
  | "FAILED"
  | "DENIED"
  | (string & {});
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
export type ChannelAssociatedWithFlowSummaryList =
  ChannelAssociatedWithFlowSummary[];
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
  descriptor: {
    service: svc,
    http: "PUT /channels/{ChannelArn}/channel-flow",
    input: {
      ChannelArn: 0,
      ChannelFlowArn: 0,
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
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
  operationName: "AssociateChannelFlow",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /channels/{ChannelArn}/memberships?operation=batch-create",
    input: {
      ChannelArn: 0,
      Type: 0,
      MemberArns: 0,
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
      SubChannelId: 0,
    },
    output: {
      BatchChannelMemberships: {
        InvitedBy: o_Identity,
        Members: D.list(o_Identity),
      },
    },
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
  operationName: "BatchCreateChannelMembership",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /channels/{ChannelArn}?operation=channel-flow-callback",
    input: {
      CallbackId: D.m({ idempotency: true }),
      ChannelArn: 0,
      DeleteResource: 0,
      ChannelMessage: {
        MessageId: 0,
        Content: 0,
        Metadata: 0,
        PushNotification: i_PushNotificationConfiguration,
        MessageAttributes: D.map(i_MessageAttributeValue),
        SubChannelId: 0,
        ContentType: 0,
      },
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /channels",
    input: {
      AppInstanceArn: 0,
      Name: 0,
      Mode: 0,
      Privacy: 0,
      Metadata: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
      ChannelId: 0,
      MemberArns: 0,
      ModeratorArns: 0,
      ElasticChannelConfiguration: {
        MaximumSubChannels: 0,
        TargetMembershipsPerSubChannel: 0,
        MinimumMembershipPercentage: 0,
      },
      ExpirationSettings: i_ExpirationSettings,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /channels/{ChannelArn}/bans",
    input: {
      ChannelArn: 0,
      MemberArn: 0,
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
    },
    output: { Member: o_Identity },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /channel-flows",
    input: {
      AppInstanceArn: 0,
      Processors: D.list(i_Processor),
      Name: 0,
      Tags: D.list(i_Tag),
      ClientRequestToken: D.m({ idempotency: true }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /channels/{ChannelArn}/memberships",
    input: {
      ChannelArn: 0,
      MemberArn: 0,
      Type: 0,
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
      SubChannelId: 0,
    },
    output: { Member: o_Identity },
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
  operationName: "CreateChannelMembership",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /channels/{ChannelArn}/moderators",
    input: {
      ChannelArn: 0,
      ChannelModeratorArn: 0,
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
    },
    output: { ChannelModerator: o_Identity },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /channels/{ChannelArn}",
    input: {
      ChannelArn: 0,
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /channels/{ChannelArn}/bans/{MemberArn}",
    input: {
      ChannelArn: 0,
      MemberArn: 0,
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
    },
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
  operationName: "DeleteChannelBan",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /channel-flows/{ChannelFlowArn}",
    input: { ChannelFlowArn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /channels/{ChannelArn}/memberships/{MemberArn}",
    input: {
      ChannelArn: 0,
      MemberArn: 0,
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
      SubChannelId: D.m({ query: "sub-channel-id" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /channels/{ChannelArn}/messages/{MessageId}",
    input: {
      ChannelArn: 0,
      MessageId: 0,
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
      SubChannelId: D.m({ query: "sub-channel-id" }),
    },
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
  operationName: "DeleteChannelMessage",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /channels/{ChannelArn}/moderators/{ChannelModeratorArn}",
    input: {
      ChannelArn: 0,
      ChannelModeratorArn: 0,
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
    },
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
  operationName: "DeleteChannelModerator",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /app-instances/{AppInstanceArn}/streaming-configurations",
    input: { AppInstanceArn: 0 },
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
  operationName: "DeleteMessagingStreamingConfigurations",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /channels/{ChannelArn}",
    input: {
      ChannelArn: 0,
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
    },
    output: {
      Channel: {
        Name: D.secret,
        Metadata: D.secret,
        CreatedBy: o_Identity,
        CreatedTimestamp: D.ts,
        LastMessageTimestamp: D.ts,
        LastUpdatedTimestamp: D.ts,
      },
    },
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
  operationName: "DescribeChannel",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /channels/{ChannelArn}/bans/{MemberArn}",
    input: {
      ChannelArn: 0,
      MemberArn: 0,
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
    },
    output: {
      ChannelBan: {
        Member: o_Identity,
        CreatedTimestamp: D.ts,
        CreatedBy: o_Identity,
      },
    },
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
  operationName: "DescribeChannelBan",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /channel-flows/{ChannelFlowArn}",
    input: { ChannelFlowArn: 0 },
    output: {
      ChannelFlow: {
        Processors: D.list(o_Processor),
        Name: D.secret,
        CreatedTimestamp: D.ts,
        LastUpdatedTimestamp: D.ts,
      },
    },
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
  operationName: "DescribeChannelFlow",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /channels/{ChannelArn}/memberships/{MemberArn}",
    input: {
      ChannelArn: 0,
      MemberArn: 0,
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
      SubChannelId: D.m({ query: "sub-channel-id" }),
    },
    output: {
      ChannelMembership: {
        InvitedBy: o_Identity,
        Member: o_Identity,
        CreatedTimestamp: D.ts,
        LastUpdatedTimestamp: D.ts,
      },
    },
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
  operationName: "DescribeChannelMembership",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /channels/{ChannelArn}?scope=app-instance-user-membership",
    input: {
      ChannelArn: 0,
      AppInstanceUserArn: D.m({ query: "app-instance-user-arn" }),
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
    },
    output: { ChannelMembership: o_ChannelMembershipForAppInstanceUserSummary },
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
  operationName: "DescribeChannelMembershipForAppInstanceUser",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /channels/{ChannelArn}?scope=app-instance-user-moderated-channel",
    input: {
      ChannelArn: 0,
      AppInstanceUserArn: D.m({ query: "app-instance-user-arn" }),
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
    },
    output: { Channel: o_ChannelModeratedByAppInstanceUserSummary },
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
  operationName: "DescribeChannelModeratedByAppInstanceUser",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /channels/{ChannelArn}/moderators/{ChannelModeratorArn}",
    input: {
      ChannelArn: 0,
      ChannelModeratorArn: 0,
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
    },
    output: {
      ChannelModerator: {
        Moderator: o_Identity,
        CreatedTimestamp: D.ts,
        CreatedBy: o_Identity,
      },
    },
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
  operationName: "DescribeChannelModerator",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /channels/{ChannelArn}/channel-flow/{ChannelFlowArn}",
    input: {
      ChannelArn: 0,
      ChannelFlowArn: 0,
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
    },
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
  operationName: "DisassociateChannelFlow",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /channels/{ChannelArn}/memberships/{MemberArn}/preferences",
    input: {
      ChannelArn: 0,
      MemberArn: 0,
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
    },
    output: { Member: o_Identity, Preferences: o_ChannelMembershipPreferences },
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
  operationName: "GetChannelMembershipPreferences",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /channels/{ChannelArn}/messages/{MessageId}",
    input: {
      ChannelArn: 0,
      MessageId: 0,
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
      SubChannelId: D.m({ query: "sub-channel-id" }),
    },
    output: {
      ChannelMessage: {
        Content: D.secret,
        Metadata: D.secret,
        CreatedTimestamp: D.ts,
        LastEditedTimestamp: D.ts,
        LastUpdatedTimestamp: D.ts,
        Sender: o_Identity,
        MessageAttributes: D.map(o_MessageAttributeValue),
        ContentType: D.secret,
      },
    },
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
  operationName: "GetChannelMessage",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /channels/{ChannelArn}/messages/{MessageId}?scope=message-status",
    input: {
      ChannelArn: 0,
      MessageId: 0,
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
      SubChannelId: D.m({ query: "sub-channel-id" }),
    },
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
  operationName: "GetChannelMessageStatus",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /endpoints/messaging-session",
    input: { NetworkType: D.m({ query: "network-type" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /app-instances/{AppInstanceArn}/streaming-configurations",
    input: { AppInstanceArn: 0 },
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
  operationName: "GetMessagingStreamingConfigurations",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /channels/{ChannelArn}/bans",
    input: {
      ChannelArn: 0,
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
    },
    output: {
      NextToken: D.secret,
      ChannelBans: D.list({ Member: o_Identity }),
    },
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
  descriptor: {
    service: svc,
    http: "GET /channel-flows",
    input: {
      AppInstanceArn: D.m({ query: "app-instance-arn" }),
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: {
      ChannelFlows: D.list({ Name: D.secret, Processors: D.list(o_Processor) }),
      NextToken: D.secret,
    },
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
  descriptor: {
    service: svc,
    http: "GET /channels/{ChannelArn}/memberships",
    input: {
      ChannelArn: 0,
      Type: D.m({ query: "type" }),
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
      SubChannelId: D.m({ query: "sub-channel-id" }),
    },
    output: {
      ChannelMemberships: D.list({ Member: o_Identity }),
      NextToken: D.secret,
    },
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
  descriptor: {
    service: svc,
    http: "GET /channels?scope=app-instance-user-memberships",
    input: {
      AppInstanceUserArn: D.m({ query: "app-instance-user-arn" }),
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
    },
    output: {
      ChannelMemberships: D.list(o_ChannelMembershipForAppInstanceUserSummary),
      NextToken: D.secret,
    },
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
  descriptor: {
    service: svc,
    http: "GET /channels/{ChannelArn}/messages",
    input: {
      ChannelArn: 0,
      SortOrder: D.m({ query: "sort-order" }),
      NotBefore: D.m({ query: "not-before", shape: D.tsAs("epoch-seconds") }),
      NotAfter: D.m({ query: "not-after", shape: D.tsAs("epoch-seconds") }),
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
      SubChannelId: D.m({ query: "sub-channel-id" }),
    },
    output: {
      NextToken: D.secret,
      ChannelMessages: D.list({
        Content: D.secret,
        Metadata: D.secret,
        CreatedTimestamp: D.ts,
        LastUpdatedTimestamp: D.ts,
        LastEditedTimestamp: D.ts,
        Sender: o_Identity,
        MessageAttributes: D.map(o_MessageAttributeValue),
        ContentType: D.secret,
      }),
    },
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
  descriptor: {
    service: svc,
    http: "GET /channels/{ChannelArn}/moderators",
    input: {
      ChannelArn: 0,
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
    },
    output: {
      NextToken: D.secret,
      ChannelModerators: D.list({ Moderator: o_Identity }),
    },
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
  descriptor: {
    service: svc,
    http: "GET /channels",
    input: {
      AppInstanceArn: D.m({ query: "app-instance-arn" }),
      Privacy: D.m({ query: "privacy" }),
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
    },
    output: { Channels: D.list(o_ChannelSummary), NextToken: D.secret },
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
  descriptor: {
    service: svc,
    http: "GET /channels?scope=channel-flow-associations",
    input: {
      ChannelFlowArn: D.m({ query: "channel-flow-arn" }),
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: {
      Channels: D.list({ Name: D.secret, Metadata: D.secret }),
      NextToken: D.secret,
    },
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
  descriptor: {
    service: svc,
    http: "GET /channels?scope=app-instance-user-moderated-channels",
    input: {
      AppInstanceUserArn: D.m({ query: "app-instance-user-arn" }),
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
    },
    output: {
      Channels: D.list(o_ChannelModeratedByAppInstanceUserSummary),
      NextToken: D.secret,
    },
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
  descriptor: {
    service: svc,
    http: "GET /channels/{ChannelArn}/subchannels",
    input: {
      ChannelArn: 0,
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: { NextToken: D.secret },
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
  descriptor: {
    service: svc,
    http: "GET /tags",
    input: { ResourceARN: D.m({ query: "arn" }) },
    output: { Tags: D.list({ Key: D.secret, Value: D.secret }) },
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
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /channels/{ChannelArn}/expiration-settings",
    input: {
      ChannelArn: 0,
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
      ExpirationSettings: i_ExpirationSettings,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /channels/{ChannelArn}/memberships/{MemberArn}/preferences",
    input: {
      ChannelArn: 0,
      MemberArn: 0,
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
      Preferences: {
        PushNotifications: { AllowNotifications: 0, FilterRule: 0 },
      },
    },
    output: { Member: o_Identity, Preferences: o_ChannelMembershipPreferences },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /app-instances/{AppInstanceArn}/streaming-configurations",
    input: {
      AppInstanceArn: 0,
      StreamingConfigurations: D.list({ DataType: 0, ResourceArn: 0 }),
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
  operationName: "PutMessagingStreamingConfigurations",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /channels/{ChannelArn}/messages/{MessageId}?operation=redact",
    input: {
      ChannelArn: 0,
      MessageId: 0,
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
      SubChannelId: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /channels?operation=search",
    input: {
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
      Fields: D.list({ Key: 0, Values: 0, Operator: 0 }),
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: { Channels: D.list(o_ChannelSummary), NextToken: D.secret },
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
  descriptor: {
    service: svc,
    http: "POST /channels/{ChannelArn}/messages",
    input: {
      ChannelArn: 0,
      Content: 0,
      Type: 0,
      Persistence: 0,
      Metadata: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
      PushNotification: i_PushNotificationConfiguration,
      MessageAttributes: D.map(i_MessageAttributeValue),
      SubChannelId: 0,
      ContentType: 0,
      Target: D.list({ MemberArn: 0 }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags?operation=tag-resource",
    input: { ResourceARN: 0, Tags: D.list(i_Tag) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags?operation=untag-resource",
    input: { ResourceARN: 0, TagKeys: 0 },
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
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /channels/{ChannelArn}",
    input: {
      ChannelArn: 0,
      Name: 0,
      Mode: 0,
      Metadata: 0,
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /channel-flows/{ChannelFlowArn}",
    input: { ChannelFlowArn: 0, Processors: D.list(i_Processor), Name: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /channels/{ChannelArn}/messages/{MessageId}",
    input: {
      ChannelArn: 0,
      MessageId: 0,
      Content: 0,
      Metadata: 0,
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
      SubChannelId: 0,
      ContentType: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /channels/{ChannelArn}/readMarker",
    input: {
      ChannelArn: 0,
      ChimeBearer: D.m({ header: "x-amz-chime-bearer" }),
    },
  },
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
})) as any;

const i_ExpirationSettings: D.LazyStruct = () => ({
  ExpirationDays: 0,
  ExpirationCriterion: 0,
});
const i_MessageAttributeValue: D.LazyStruct = () => ({ StringValues: 0 });
const i_Processor: D.LazyStruct = () => ({
  Name: 0,
  Configuration: { Lambda: { ResourceArn: 0, InvocationType: 0 } },
  ExecutionOrder: 0,
  FallbackAction: 0,
});
const i_PushNotificationConfiguration: D.LazyStruct = () => ({
  Title: 0,
  Body: 0,
  Type: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_ChannelMembershipForAppInstanceUserSummary: D.LazyStruct = () => ({
  ChannelSummary: o_ChannelSummary,
  AppInstanceUserMembershipSummary: { ReadMarkerTimestamp: D.ts },
});
const o_ChannelMembershipPreferences: D.LazyStruct = () => ({
  PushNotifications: { FilterRule: D.secret },
});
const o_ChannelModeratedByAppInstanceUserSummary: D.LazyStruct = () => ({
  ChannelSummary: o_ChannelSummary,
});
const o_ChannelSummary: D.LazyStruct = () => ({
  Name: D.secret,
  Metadata: D.secret,
  LastMessageTimestamp: D.ts,
});
const o_Identity: D.LazyStruct = () => ({ Name: D.secret });
const o_MessageAttributeValue: D.LazyStruct = () => ({
  StringValues: D.list(D.secret),
});
const o_Processor: D.LazyStruct = () => ({ Name: D.secret });
