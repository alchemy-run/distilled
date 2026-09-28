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
  sdkId: "ConnectCampaignsV2",
  target: "AmazonConnectCampaignServiceV2",
  version: "2024-04-23",
  sigv4: "connect-campaigns",
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
                `https://connect-campaigns-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://connect-campaigns-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://connect-campaigns.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://connect-campaigns.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    headers: { xAmzErrorType: "x-amzn-ErrorType" },
  })<{ readonly message: string; readonly xAmzErrorType?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
    headers: { xAmzErrorType: "x-amzn-ErrorType" },
  })<{ readonly message: string; readonly xAmzErrorType?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500, headers: { xAmzErrorType: "x-amzn-ErrorType" } },
  )<{ readonly message: string; readonly xAmzErrorType?: string }> {}
export class InvalidCampaignStateException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidCampaignStateException",
    ["ConflictError"],
    { status: 409, headers: { xAmzErrorType: "x-amzn-ErrorType" } },
  )<{
    readonly state: string;
    readonly message: string;
    readonly xAmzErrorType?: string;
  }> {}
export class InvalidStateException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidStateException",
    ["ConflictError"],
    { status: 409, headers: { xAmzErrorType: "x-amzn-ErrorType" } },
  )<{ readonly message: string; readonly xAmzErrorType?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404, headers: { xAmzErrorType: "x-amzn-ErrorType" } },
  )<{ readonly message: string; readonly xAmzErrorType?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402, headers: { xAmzErrorType: "x-amzn-ErrorType" } },
  )<{ readonly message: string; readonly xAmzErrorType?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, headers: { xAmzErrorType: "x-amzn-ErrorType" } },
  )<{ readonly message: string; readonly xAmzErrorType?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400, headers: { xAmzErrorType: "x-amzn-ErrorType" } },
  )<{ readonly message: string; readonly xAmzErrorType?: string }> {}
export type CampaignName = string;
export type InstanceId = string;
export type Capacity = number;
export type QueueId = string;
export type BandwidthAllocation = number;
export interface ProgressiveConfig {
  bandwidthAllocation: number;
}
export type TargetRate = number;
export type ConnectionStartPoint = string;
export type EvaluationWindow = string;
export interface AbandonmentRatePacingConfig {
  targetRate: number;
  connectionStartPoint: string;
  connectionThresholdSeconds: number;
  evaluationWindow: string;
}
export type PacingStrategy = { abandonmentRate: AbandonmentRatePacingConfig };
export type PacingStrategyList = PacingStrategy[];
export interface PredictiveConfig {
  bandwidthAllocation: number;
  pacingStrategies?: PacingStrategy[];
}
export interface AgentlessConfig {}
export type TimeoutDuration = number;
export interface TimeoutConfig {
  durationInSeconds: number;
}
export type AgentAction = string;
export type AgentActions = string[];
export interface PreviewConfig {
  bandwidthAllocation: number;
  timeoutConfig: TimeoutConfig;
  agentActions?: string[];
}
export type TelephonyOutboundMode =
  | {
      progressive: ProgressiveConfig;
      predictive?: never;
      agentless?: never;
      preview?: never;
    }
  | {
      progressive?: never;
      predictive: PredictiveConfig;
      agentless?: never;
      preview?: never;
    }
  | {
      progressive?: never;
      predictive?: never;
      agentless: AgentlessConfig;
      preview?: never;
    }
  | {
      progressive?: never;
      predictive?: never;
      agentless?: never;
      preview: PreviewConfig;
    };
export type ContactFlowId = string;
export type SourcePhoneNumber = string;
export interface AnswerMachineDetectionConfig {
  enableAnswerMachineDetection: boolean;
  awaitAnswerMachinePrompt?: boolean;
}
export type RingTimeout = number;
export interface TelephonyOutboundConfig {
  connectContactFlowId: string;
  connectSourcePhoneNumber?: string;
  answerMachineDetectionConfig?: AnswerMachineDetectionConfig;
  ringTimeout?: number;
}
export interface TelephonyChannelSubtypeConfig {
  capacity?: number;
  connectQueueId?: string;
  outboundMode: TelephonyOutboundMode;
  defaultOutboundConfig: TelephonyOutboundConfig;
}
export type SmsOutboundMode = { agentless: AgentlessConfig };
export type Arn = string;
export interface SmsOutboundConfig {
  connectSourcePhoneNumberArn: string;
  wisdomTemplateArn: string;
}
export interface SmsChannelSubtypeConfig {
  capacity?: number;
  outboundMode: SmsOutboundMode;
  defaultOutboundConfig: SmsOutboundConfig;
}
export type EmailOutboundMode = { agentless: AgentlessConfig };
export type EmailAddress = string | redacted.Redacted<string>;
export type EmailDisplayName = string | redacted.Redacted<string>;
export interface EmailOutboundConfig {
  connectSourceEmailAddress: string | redacted.Redacted<string>;
  sourceEmailAddressDisplayName?: string | redacted.Redacted<string>;
  wisdomTemplateArn: string;
}
export interface EmailChannelSubtypeConfig {
  capacity?: number;
  outboundMode: EmailOutboundMode;
  defaultOutboundConfig: EmailOutboundConfig;
}
export type WhatsAppOutboundMode = { agentless: AgentlessConfig };
export interface WhatsAppOutboundConfig {
  connectSourcePhoneNumberArn: string;
  wisdomTemplateArn: string;
}
export interface WhatsAppChannelSubtypeConfig {
  capacity?: number;
  outboundMode: WhatsAppOutboundMode;
  defaultOutboundConfig: WhatsAppOutboundConfig;
}
export interface ChannelSubtypeConfig {
  telephony?: TelephonyChannelSubtypeConfig;
  sms?: SmsChannelSubtypeConfig;
  email?: EmailChannelSubtypeConfig;
  whatsApp?: WhatsAppChannelSubtypeConfig;
}
export type ExternalCampaignType = string;
export interface EventTrigger {
  customerProfilesDomainArn?: string;
}
export type Source =
  | { customerProfilesSegmentArn: string; eventTrigger?: never }
  | { customerProfilesSegmentArn?: never; eventTrigger: EventTrigger };
export type Iso8601Duration = string;
export interface Schedule {
  startTime: Date;
  endTime: Date;
  refreshFrequency?: string;
}
export interface EntryLimitsConfig {
  maxEntryCount: number;
  minEntryInterval: string;
}
export type TimeZone = string;
export type LocalTimeZoneDetectionType = string;
export type LocalTimeZoneDetection = string[];
export type LocalTimeZoneDetectionScope = string;
export interface LocalTimeZoneConfig {
  defaultTimeZone?: string;
  localTimeZoneDetection?: string[];
  localTimeZoneDetectionScope?: string;
}
export type DayOfWeek = string;
export type Iso8601Time = string;
export interface TimeRange {
  startTime: string;
  endTime: string;
}
export type TimeRangeList = TimeRange[];
export type DailyHours = { [key: string]: TimeRange[] | undefined };
export type OpenHours = {
  dailyHours: { [key: string]: TimeRange[] | undefined };
};
export type RestrictedPeriodName = string;
export type Iso8601Date = string;
export interface RestrictedPeriod {
  name?: string;
  startDate: string;
  endDate: string;
}
export type RestrictedPeriodList = RestrictedPeriod[];
export type RestrictedPeriods = { restrictedPeriodList: RestrictedPeriod[] };
export interface TimeWindow {
  openHours: OpenHours;
  restrictedPeriods?: RestrictedPeriods;
}
export interface CommunicationTimeConfig {
  localTimeZoneConfig: LocalTimeZoneConfig;
  telephony?: TimeWindow;
  sms?: TimeWindow;
  email?: TimeWindow;
  whatsApp?: TimeWindow;
}
export type CommunicationLimitTimeUnit = string;
export interface CommunicationLimit {
  maxCountPerRecipient: number;
  frequency: number;
  unit: string;
}
export type CommunicationLimitList = CommunicationLimit[];
export type CommunicationLimits = {
  communicationLimitsList: CommunicationLimit[];
};
export type InstanceLimitsHandling = string;
export interface CommunicationLimitsConfig {
  allChannelSubtypes?: CommunicationLimits;
  instanceLimitsHandling?: string;
}
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateCampaignRequest {
  name: string;
  connectInstanceId: string;
  channelSubtypeConfig?: ChannelSubtypeConfig;
  type?: string;
  source?: Source;
  connectCampaignFlowArn?: string;
  schedule?: Schedule;
  entryLimitsConfig?: EntryLimitsConfig;
  communicationTimeConfig?: CommunicationTimeConfig;
  communicationLimitsOverride?: CommunicationLimitsConfig;
  tags?: { [key: string]: string | undefined };
}
export type CampaignId = string;
export type CampaignArn = string;
export interface CreateCampaignResponse {
  id?: string;
  arn?: string;
  tags?: { [key: string]: string | undefined };
}
export interface DeleteCampaignRequest {
  id: string;
}
export interface DeleteCampaignResponse {}
export type ChannelSubtype = string;
export interface DeleteCampaignChannelSubtypeConfigRequest {
  id: string;
  channelSubtype: string;
}
export interface DeleteCampaignChannelSubtypeConfigResponse {}
export type CommunicationLimitsConfigType = string;
export interface DeleteCampaignCommunicationLimitsRequest {
  id: string;
  config: string;
}
export interface DeleteCampaignCommunicationLimitsResponse {}
export type CommunicationTimeConfigType = string;
export interface DeleteCampaignCommunicationTimeRequest {
  id: string;
  config: string;
}
export interface DeleteCampaignCommunicationTimeResponse {}
export interface DeleteCampaignEntryLimitsRequest {
  id: string;
}
export interface DeleteCampaignEntryLimitsResponse {}
export type CampaignDeletionPolicy = string;
export interface DeleteConnectInstanceConfigRequest {
  connectInstanceId: string;
  campaignDeletionPolicy?: string;
}
export interface DeleteConnectInstanceConfigResponse {}
export interface CustomerProfilesIntegrationIdentifier {
  domainArn: string;
}
export interface QConnectIntegrationIdentifier {
  knowledgeBaseArn: string;
}
export type LambdaArn = string;
export interface LambdaIntegrationIdentifier {
  functionArn: string;
}
export type IntegrationIdentifier =
  | {
      customerProfiles: CustomerProfilesIntegrationIdentifier;
      qConnect?: never;
      lambda?: never;
    }
  | {
      customerProfiles?: never;
      qConnect: QConnectIntegrationIdentifier;
      lambda?: never;
    }
  | {
      customerProfiles?: never;
      qConnect?: never;
      lambda: LambdaIntegrationIdentifier;
    };
export interface DeleteConnectInstanceIntegrationRequest {
  connectInstanceId: string;
  integrationIdentifier: IntegrationIdentifier;
}
export interface DeleteConnectInstanceIntegrationResponse {}
export interface DeleteInstanceOnboardingJobRequest {
  connectInstanceId: string;
}
export interface DeleteInstanceOnboardingJobResponse {}
export interface DescribeCampaignRequest {
  id: string;
}
export interface Campaign {
  id: string;
  arn: string;
  name: string;
  connectInstanceId: string;
  channelSubtypeConfig?: ChannelSubtypeConfig;
  type?: string;
  source?: Source;
  connectCampaignFlowArn?: string;
  schedule?: Schedule;
  entryLimitsConfig?: EntryLimitsConfig;
  communicationTimeConfig?: CommunicationTimeConfig;
  communicationLimitsOverride?: CommunicationLimitsConfig;
  tags?: { [key: string]: string | undefined };
}
export interface DescribeCampaignResponse {
  campaign?: Campaign;
}
export interface GetCampaignStateRequest {
  id: string;
}
export type CampaignState = string;
export interface GetCampaignStateResponse {
  state?: string;
}
export type CampaignIdList = string[];
export interface GetCampaignStateBatchRequest {
  campaignIds: string[];
}
export interface SuccessfulCampaignStateResponse {
  campaignId?: string;
  state?: string;
}
export type SuccessfulCampaignStateResponseList =
  SuccessfulCampaignStateResponse[];
export type GetCampaignStateBatchFailureCode = string;
export interface FailedCampaignStateResponse {
  campaignId?: string;
  failureCode?: string;
}
export type FailedCampaignStateResponseList = FailedCampaignStateResponse[];
export interface GetCampaignStateBatchResponse {
  successfulRequests?: SuccessfulCampaignStateResponse[];
  failedRequests?: FailedCampaignStateResponse[];
}
export interface GetConnectInstanceConfigRequest {
  connectInstanceId: string;
}
export type ServiceLinkedRoleArn = string;
export type Enabled = boolean;
export type EncryptionType = string;
export type EncryptionKey = string;
export interface EncryptionConfig {
  enabled: boolean;
  encryptionType?: string;
  keyArn?: string;
}
export interface InstanceConfig {
  connectInstanceId: string;
  serviceLinkedRoleArn: string;
  encryptionConfig: EncryptionConfig;
}
export interface GetConnectInstanceConfigResponse {
  connectInstanceConfig?: InstanceConfig;
}
export interface GetInstanceCommunicationLimitsRequest {
  connectInstanceId: string;
}
export interface InstanceCommunicationLimitsConfig {
  allChannelSubtypes?: CommunicationLimits;
}
export interface GetInstanceCommunicationLimitsResponse {
  communicationLimitsConfig?: InstanceCommunicationLimitsConfig;
}
export interface GetInstanceOnboardingJobStatusRequest {
  connectInstanceId: string;
}
export type InstanceOnboardingJobStatusCode = string;
export type InstanceOnboardingJobFailureCode = string;
export interface InstanceOnboardingJobStatus {
  connectInstanceId: string;
  status: string;
  failureCode?: string;
}
export interface GetInstanceOnboardingJobStatusResponse {
  connectInstanceOnboardingJobStatus?: InstanceOnboardingJobStatus;
}
export type MaxResults = number;
export type NextToken = string;
export type InstanceIdFilterOperator = string;
export interface InstanceIdFilter {
  value: string;
  operator: string;
}
export interface CampaignFilters {
  instanceIdFilter?: InstanceIdFilter;
}
export interface ListCampaignsRequest {
  maxResults?: number;
  nextToken?: string;
  filters?: CampaignFilters;
}
export type ChannelSubtypeList = string[];
export interface CampaignSummary {
  id: string;
  arn: string;
  name: string;
  connectInstanceId: string;
  channelSubtypes: string[];
  type?: string;
  schedule?: Schedule;
  entryLimitsConfig?: EntryLimitsConfig;
  connectCampaignFlowArn?: string;
}
export type CampaignSummaryList = CampaignSummary[];
export interface ListCampaignsResponse {
  nextToken?: string;
  campaignSummaryList?: CampaignSummary[];
}
export interface ListConnectInstanceIntegrationsRequest {
  connectInstanceId: string;
  maxResults?: number;
  nextToken?: string;
}
export type EventType = string;
export type ObjectTypeName = string;
export type ObjectTypeNamesMap = { [key: string]: string | undefined };
export interface CustomerProfilesIntegrationSummary {
  domainArn: string;
  objectTypeNames: { [key: string]: string | undefined };
}
export interface QConnectIntegrationSummary {
  knowledgeBaseArn: string;
}
export interface LambdaIntegrationSummary {
  functionArn: string;
}
export type IntegrationSummary =
  | {
      customerProfiles: CustomerProfilesIntegrationSummary;
      qConnect?: never;
      lambda?: never;
    }
  | {
      customerProfiles?: never;
      qConnect: QConnectIntegrationSummary;
      lambda?: never;
    }
  | {
      customerProfiles?: never;
      qConnect?: never;
      lambda: LambdaIntegrationSummary;
    };
export type IntegrationSummaryList = IntegrationSummary[];
export interface ListConnectInstanceIntegrationsResponse {
  nextToken?: string;
  integrationSummaryList?: IntegrationSummary[];
}
export interface ListTagsForResourceRequest {
  arn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface PauseCampaignRequest {
  id: string;
}
export interface PauseCampaignResponse {}
export interface CustomerProfilesIntegrationConfig {
  domainArn: string;
  objectTypeNames: { [key: string]: string | undefined };
}
export interface QConnectIntegrationConfig {
  knowledgeBaseArn: string;
}
export interface LambdaIntegrationConfig {
  functionArn: string;
}
export type IntegrationConfig =
  | {
      customerProfiles: CustomerProfilesIntegrationConfig;
      qConnect?: never;
      lambda?: never;
    }
  | {
      customerProfiles?: never;
      qConnect: QConnectIntegrationConfig;
      lambda?: never;
    }
  | {
      customerProfiles?: never;
      qConnect?: never;
      lambda: LambdaIntegrationConfig;
    };
export interface PutConnectInstanceIntegrationRequest {
  connectInstanceId: string;
  integrationConfig: IntegrationConfig;
}
export interface PutConnectInstanceIntegrationResponse {}
export interface PutInstanceCommunicationLimitsRequest {
  connectInstanceId: string;
  communicationLimitsConfig: InstanceCommunicationLimitsConfig;
}
export interface PutInstanceCommunicationLimitsResponse {}
export type ClientToken = string;
export type DestinationPhoneNumber = string | redacted.Redacted<string>;
export type AttributeName = string;
export type AttributeValue = string;
export type Attributes = { [key: string]: string | undefined };
export interface TelephonyChannelSubtypeParameters {
  destinationPhoneNumber: string | redacted.Redacted<string>;
  attributes: { [key: string]: string | undefined };
  connectSourcePhoneNumber?: string;
  answerMachineDetectionConfig?: AnswerMachineDetectionConfig;
  ringTimeout?: number;
}
export interface SmsChannelSubtypeParameters {
  destinationPhoneNumber: string | redacted.Redacted<string>;
  connectSourcePhoneNumberArn?: string;
  templateArn?: string;
  templateParameters: { [key: string]: string | undefined };
}
export interface EmailChannelSubtypeParameters {
  destinationEmailAddress: string | redacted.Redacted<string>;
  connectSourceEmailAddress?: string | redacted.Redacted<string>;
  templateArn?: string;
  templateParameters: { [key: string]: string | undefined };
}
export interface WhatsAppChannelSubtypeParameters {
  destinationPhoneNumber: string | redacted.Redacted<string>;
  connectSourcePhoneNumberArn?: string;
  templateArn?: string;
  templateParameters: { [key: string]: string | undefined };
}
export type ChannelSubtypeParameters =
  | {
      telephony: TelephonyChannelSubtypeParameters;
      sms?: never;
      email?: never;
      whatsApp?: never;
    }
  | {
      telephony?: never;
      sms: SmsChannelSubtypeParameters;
      email?: never;
      whatsApp?: never;
    }
  | {
      telephony?: never;
      sms?: never;
      email: EmailChannelSubtypeParameters;
      whatsApp?: never;
    }
  | {
      telephony?: never;
      sms?: never;
      email?: never;
      whatsApp: WhatsAppChannelSubtypeParameters;
    };
export interface OutboundRequest {
  clientToken: string;
  expirationTime: Date;
  channelSubtypeParameters: ChannelSubtypeParameters;
}
export type OutboundRequestList = OutboundRequest[];
export interface PutOutboundRequestBatchRequest {
  id: string;
  outboundRequests: OutboundRequest[];
}
export type DialRequestId = string;
export interface SuccessfulRequest {
  clientToken?: string;
  id?: string;
}
export type SuccessfulRequestList = SuccessfulRequest[];
export type FailureCode = string;
export interface FailedRequest {
  clientToken?: string;
  id?: string;
  failureCode?: string;
}
export type FailedRequestList = FailedRequest[];
export interface PutOutboundRequestBatchResponse {
  successfulRequests?: SuccessfulRequest[];
  failedRequests?: FailedRequest[];
}
export type ProfileId = string;
export type SourceEvent = string;
export type SessionId = string;
export type BrowserId = string;
export interface WebNotificationContext {
  sessionId?: string;
  browserId?: string;
}
export interface ChannelContext {
  webNotificationContext?: WebNotificationContext;
}
export interface EventTriggerContext {
  sourceEvent?: string;
  channelContext?: ChannelContext;
}
export interface ProfileOutboundRequest {
  clientToken: string;
  profileId: string;
  expirationTime?: Date;
  eventTriggerContext?: EventTriggerContext;
}
export type ProfileOutboundRequestList = ProfileOutboundRequest[];
export interface PutProfileOutboundRequestBatchRequest {
  id: string;
  profileOutboundRequests: ProfileOutboundRequest[];
}
export type ProfileOutboundRequestId = string;
export interface SuccessfulProfileOutboundRequest {
  clientToken?: string;
  id?: string;
}
export type SuccessfulProfileOutboundRequestList =
  SuccessfulProfileOutboundRequest[];
export type ProfileOutboundRequestFailureCode = string;
export interface FailedProfileOutboundRequest {
  clientToken?: string;
  id?: string;
  failureCode?: string;
}
export type FailedProfileOutboundRequestList = FailedProfileOutboundRequest[];
export interface PutProfileOutboundRequestBatchResponse {
  successfulRequests?: SuccessfulProfileOutboundRequest[];
  failedRequests?: FailedProfileOutboundRequest[];
}
export interface ResumeCampaignRequest {
  id: string;
}
export interface ResumeCampaignResponse {}
export interface StartCampaignRequest {
  id: string;
}
export interface StartCampaignResponse {}
export interface StartInstanceOnboardingJobRequest {
  connectInstanceId: string;
  encryptionConfig: EncryptionConfig;
}
export interface StartInstanceOnboardingJobResponse {
  connectInstanceOnboardingJobStatus?: InstanceOnboardingJobStatus;
}
export interface StopCampaignRequest {
  id: string;
}
export interface StopCampaignResponse {}
export interface TagResourceRequest {
  arn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  arn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateCampaignChannelSubtypeConfigRequest {
  id: string;
  channelSubtypeConfig: ChannelSubtypeConfig;
}
export interface UpdateCampaignChannelSubtypeConfigResponse {}
export interface UpdateCampaignCommunicationLimitsRequest {
  id: string;
  communicationLimitsOverride: CommunicationLimitsConfig;
}
export interface UpdateCampaignCommunicationLimitsResponse {}
export interface UpdateCampaignCommunicationTimeRequest {
  id: string;
  communicationTimeConfig: CommunicationTimeConfig;
}
export interface UpdateCampaignCommunicationTimeResponse {}
export interface UpdateCampaignEntryLimitsRequest {
  id: string;
  entryLimitsConfig: EntryLimitsConfig;
}
export interface UpdateCampaignEntryLimitsResponse {}
export interface UpdateCampaignFlowAssociationRequest {
  id: string;
  connectCampaignFlowArn: string;
}
export interface UpdateCampaignFlowAssociationResponse {}
export interface UpdateCampaignNameRequest {
  id: string;
  name: string;
}
export interface UpdateCampaignNameResponse {}
export interface UpdateCampaignScheduleRequest {
  id: string;
  schedule: Schedule;
}
export interface UpdateCampaignScheduleResponse {}
export interface UpdateCampaignSourceRequest {
  id: string;
  source: Source;
}
export interface UpdateCampaignSourceResponse {}
export type XAmazonErrorType = string;
export type CreateCampaignError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a campaign for the specified Amazon Connect account. This API is idempotent.
 */
export const createCampaign: API.OperationMethod<
  CreateCampaignRequest,
  CreateCampaignResponse,
  CreateCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/campaigns",
    input: {
      name: 0,
      connectInstanceId: 0,
      channelSubtypeConfig: i_ChannelSubtypeConfig,
      type: 0,
      source: i_Source,
      connectCampaignFlowArn: 0,
      schedule: i_Schedule,
      entryLimitsConfig: i_EntryLimitsConfig,
      communicationTimeConfig: i_CommunicationTimeConfig,
      communicationLimitsOverride: i_CommunicationLimitsConfig,
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCampaign",
})) as any;

export type DeleteCampaignError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a campaign from the specified Amazon Connect account.
 */
export const deleteCampaign: API.OperationMethod<
  DeleteCampaignRequest,
  DeleteCampaignResponse,
  DeleteCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/campaigns/{id}",
    input: { id: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCampaign",
})) as any;

export type DeleteCampaignChannelSubtypeConfigError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the channel subtype config of a campaign. This API is idempotent.
 */
export const deleteCampaignChannelSubtypeConfig: API.OperationMethod<
  DeleteCampaignChannelSubtypeConfigRequest,
  DeleteCampaignChannelSubtypeConfigResponse,
  DeleteCampaignChannelSubtypeConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/campaigns/{id}/channel-subtype-config",
    input: { id: 0, channelSubtype: D.m({ query: "channelSubtype" }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCampaignChannelSubtypeConfig",
})) as any;

export type DeleteCampaignCommunicationLimitsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the communication limits config for a campaign. This API is idempotent.
 */
export const deleteCampaignCommunicationLimits: API.OperationMethod<
  DeleteCampaignCommunicationLimitsRequest,
  DeleteCampaignCommunicationLimitsResponse,
  DeleteCampaignCommunicationLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/campaigns/{id}/communication-limits",
    input: { id: 0, config: D.m({ query: "config" }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCampaignCommunicationLimits",
})) as any;

export type DeleteCampaignCommunicationTimeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the communication time config for a campaign. This API is idempotent.
 */
export const deleteCampaignCommunicationTime: API.OperationMethod<
  DeleteCampaignCommunicationTimeRequest,
  DeleteCampaignCommunicationTimeResponse,
  DeleteCampaignCommunicationTimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/campaigns/{id}/communication-time",
    input: { id: 0, config: D.m({ query: "config" }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCampaignCommunicationTime",
})) as any;

export type DeleteCampaignEntryLimitsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the entry limits config for a campaign. This API is idempotent.
 */
export const deleteCampaignEntryLimits: API.OperationMethod<
  DeleteCampaignEntryLimitsRequest,
  DeleteCampaignEntryLimitsResponse,
  DeleteCampaignEntryLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/campaigns/{id}/entry-limits",
    input: { id: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCampaignEntryLimits",
})) as any;

export type DeleteConnectInstanceConfigError =
  | AccessDeniedException
  | InternalServerException
  | InvalidStateException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a connect instance config from the specified AWS account.
 */
export const deleteConnectInstanceConfig: API.OperationMethod<
  DeleteConnectInstanceConfigRequest,
  DeleteConnectInstanceConfigResponse,
  DeleteConnectInstanceConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/connect-instance/{connectInstanceId}/config",
    input: {
      connectInstanceId: 0,
      campaignDeletionPolicy: D.m({ query: "campaignDeletionPolicy" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidStateException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnectInstanceConfig",
})) as any;

export type DeleteConnectInstanceIntegrationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete the integration for the specified Amazon Connect instance.
 */
export const deleteConnectInstanceIntegration: API.OperationMethod<
  DeleteConnectInstanceIntegrationRequest,
  DeleteConnectInstanceIntegrationResponse,
  DeleteConnectInstanceIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/connect-instance/{connectInstanceId}/integrations/delete",
    input: {
      connectInstanceId: 0,
      integrationIdentifier: {
        customerProfiles: { domainArn: 0 },
        qConnect: { knowledgeBaseArn: 0 },
        lambda: { functionArn: 0 },
      },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnectInstanceIntegration",
})) as any;

export type DeleteInstanceOnboardingJobError =
  | AccessDeniedException
  | InternalServerException
  | InvalidStateException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Delete the Connect Campaigns onboarding job for the specified Amazon Connect instance.
 */
export const deleteInstanceOnboardingJob: API.OperationMethod<
  DeleteInstanceOnboardingJobRequest,
  DeleteInstanceOnboardingJobResponse,
  DeleteInstanceOnboardingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/connect-instance/{connectInstanceId}/onboarding",
    input: { connectInstanceId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidStateException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInstanceOnboardingJob",
})) as any;

export type DescribeCampaignError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specific campaign.
 */
export const describeCampaign: API.OperationMethod<
  DescribeCampaignRequest,
  DescribeCampaignResponse,
  DescribeCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/campaigns/{id}",
    input: { id: 0 },
    output: {
      campaign: {
        channelSubtypeConfig: {
          email: {
            defaultOutboundConfig: {
              connectSourceEmailAddress: D.secret,
              sourceEmailAddressDisplayName: D.secret,
            },
          },
        },
        schedule: o_Schedule,
      },
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCampaign",
})) as any;

export type GetCampaignStateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get state of a campaign for the specified Amazon Connect account.
 */
export const getCampaignState: API.OperationMethod<
  GetCampaignStateRequest,
  GetCampaignStateResponse,
  GetCampaignStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/campaigns/{id}/state",
    input: { id: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCampaignState",
})) as any;

export type GetCampaignStateBatchError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get state of campaigns for the specified Amazon Connect account.
 */
export const getCampaignStateBatch: API.OperationMethod<
  GetCampaignStateBatchRequest,
  GetCampaignStateBatchResponse,
  GetCampaignStateBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/campaigns-state",
    input: { campaignIds: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCampaignStateBatch",
})) as any;

export type GetConnectInstanceConfigError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Get the specific Connect instance config.
 */
export const getConnectInstanceConfig: API.OperationMethod<
  GetConnectInstanceConfigRequest,
  GetConnectInstanceConfigResponse,
  GetConnectInstanceConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/connect-instance/{connectInstanceId}/config",
    input: { connectInstanceId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectInstanceConfig",
})) as any;

export type GetInstanceCommunicationLimitsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Get the instance communication limits.
 */
export const getInstanceCommunicationLimits: API.OperationMethod<
  GetInstanceCommunicationLimitsRequest,
  GetInstanceCommunicationLimitsResponse,
  GetInstanceCommunicationLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/connect-instance/{connectInstanceId}/communication-limits",
    input: { connectInstanceId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstanceCommunicationLimits",
})) as any;

export type GetInstanceOnboardingJobStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Get the specific instance onboarding job status.
 */
export const getInstanceOnboardingJobStatus: API.OperationMethod<
  GetInstanceOnboardingJobStatusRequest,
  GetInstanceOnboardingJobStatusResponse,
  GetInstanceOnboardingJobStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/connect-instance/{connectInstanceId}/onboarding",
    input: { connectInstanceId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstanceOnboardingJobStatus",
})) as any;

export type ListCampaignsError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Provides summary information about the campaigns under the specified Amazon Connect account.
 */
export const listCampaigns: API.PaginatedOperationMethod<
  ListCampaignsRequest,
  ListCampaignsResponse,
  ListCampaignsError,
  Credentials | HttpClient.HttpClient,
  CampaignSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/campaigns-summary",
    input: {
      maxResults: 0,
      nextToken: 0,
      filters: { instanceIdFilter: { value: 0, operator: 0 } },
    },
    output: { campaignSummaryList: D.list({ schedule: o_Schedule }) },
    body: true,
  },
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCampaigns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "campaignSummaryList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConnectInstanceIntegrationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides summary information about the integration under the specified Connect instance.
 */
export const listConnectInstanceIntegrations: API.PaginatedOperationMethod<
  ListConnectInstanceIntegrationsRequest,
  ListConnectInstanceIntegrationsResponse,
  ListConnectInstanceIntegrationsError,
  Credentials | HttpClient.HttpClient,
  IntegrationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/connect-instance/{connectInstanceId}/integrations",
    input: {
      connectInstanceId: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectInstanceIntegrations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "integrationSummaryList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List tags for a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /v2/tags/{arn}", input: { arn: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type PauseCampaignError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Pauses a campaign for the specified Amazon Connect account.
 */
export const pauseCampaign: API.OperationMethod<
  PauseCampaignRequest,
  PauseCampaignResponse,
  PauseCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/campaigns/{id}/pause",
    input: { id: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PauseCampaign",
})) as any;

export type PutConnectInstanceIntegrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Put or update the integration for the specified Amazon Connect instance.
 */
export const putConnectInstanceIntegration: API.OperationMethod<
  PutConnectInstanceIntegrationRequest,
  PutConnectInstanceIntegrationResponse,
  PutConnectInstanceIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/connect-instance/{connectInstanceId}/integrations",
    input: {
      connectInstanceId: 0,
      integrationConfig: {
        customerProfiles: { domainArn: 0, objectTypeNames: 0 },
        qConnect: { knowledgeBaseArn: 0 },
        lambda: { functionArn: 0 },
      },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConnectInstanceIntegration",
})) as any;

export type PutInstanceCommunicationLimitsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Put the instance communication limits. This API is idempotent.
 */
export const putInstanceCommunicationLimits: API.OperationMethod<
  PutInstanceCommunicationLimitsRequest,
  PutInstanceCommunicationLimitsResponse,
  PutInstanceCommunicationLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/connect-instance/{connectInstanceId}/communication-limits",
    input: {
      connectInstanceId: 0,
      communicationLimitsConfig: { allChannelSubtypes: i_CommunicationLimits },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutInstanceCommunicationLimits",
})) as any;

export type PutOutboundRequestBatchError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates outbound requests for the specified campaign Amazon Connect account. This API is idempotent.
 */
export const putOutboundRequestBatch: API.OperationMethod<
  PutOutboundRequestBatchRequest,
  PutOutboundRequestBatchResponse,
  PutOutboundRequestBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/campaigns/{id}/outbound-requests",
    input: {
      id: 0,
      outboundRequests: D.list({
        clientToken: 0,
        expirationTime: D.tsAs("date-time"),
        channelSubtypeParameters: {
          telephony: {
            destinationPhoneNumber: 0,
            attributes: 0,
            connectSourcePhoneNumber: 0,
            answerMachineDetectionConfig: i_AnswerMachineDetectionConfig,
            ringTimeout: 0,
          },
          sms: {
            destinationPhoneNumber: 0,
            connectSourcePhoneNumberArn: 0,
            templateArn: 0,
            templateParameters: 0,
          },
          email: {
            destinationEmailAddress: 0,
            connectSourceEmailAddress: 0,
            templateArn: 0,
            templateParameters: 0,
          },
          whatsApp: {
            destinationPhoneNumber: 0,
            connectSourcePhoneNumberArn: 0,
            templateArn: 0,
            templateParameters: 0,
          },
        },
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutOutboundRequestBatch",
})) as any;

export type PutProfileOutboundRequestBatchError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Takes in a list of profile outbound requests to be placed as part of an outbound campaign. This API is idempotent.
 */
export const putProfileOutboundRequestBatch: API.OperationMethod<
  PutProfileOutboundRequestBatchRequest,
  PutProfileOutboundRequestBatchResponse,
  PutProfileOutboundRequestBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/campaigns/{id}/profile-outbound-requests",
    input: {
      id: 0,
      profileOutboundRequests: D.list({
        clientToken: 0,
        profileId: 0,
        expirationTime: D.tsAs("date-time"),
        eventTriggerContext: {
          sourceEvent: 0,
          channelContext: {
            webNotificationContext: { sessionId: 0, browserId: 0 },
          },
        },
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutProfileOutboundRequestBatch",
})) as any;

export type ResumeCampaignError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a campaign for the specified Amazon Connect account.
 */
export const resumeCampaign: API.OperationMethod<
  ResumeCampaignRequest,
  ResumeCampaignResponse,
  ResumeCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/campaigns/{id}/resume",
    input: { id: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResumeCampaign",
})) as any;

export type StartCampaignError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a campaign for the specified Amazon Connect account.
 */
export const startCampaign: API.OperationMethod<
  StartCampaignRequest,
  StartCampaignResponse,
  StartCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/campaigns/{id}/start",
    input: { id: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCampaign",
})) as any;

export type StartInstanceOnboardingJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Onboard the specific Amazon Connect instance to Connect Campaigns.
 */
export const startInstanceOnboardingJob: API.OperationMethod<
  StartInstanceOnboardingJobRequest,
  StartInstanceOnboardingJobResponse,
  StartInstanceOnboardingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/connect-instance/{connectInstanceId}/onboarding",
    input: {
      connectInstanceId: 0,
      encryptionConfig: { enabled: 0, encryptionType: 0, keyArn: 0 },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartInstanceOnboardingJob",
})) as any;

export type StopCampaignError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a campaign for the specified Amazon Connect account.
 */
export const stopCampaign: API.OperationMethod<
  StopCampaignRequest,
  StopCampaignResponse,
  StopCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/campaigns/{id}/stop",
    input: { id: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopCampaign",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Tag a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/tags/{arn}",
    input: { arn: 0, tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Untag a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/tags/{arn}",
    input: { arn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateCampaignChannelSubtypeConfigError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the channel subtype config of a campaign. This API is idempotent.
 */
export const updateCampaignChannelSubtypeConfig: API.OperationMethod<
  UpdateCampaignChannelSubtypeConfigRequest,
  UpdateCampaignChannelSubtypeConfigResponse,
  UpdateCampaignChannelSubtypeConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/campaigns/{id}/channel-subtype-config",
    input: { id: 0, channelSubtypeConfig: i_ChannelSubtypeConfig },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaignChannelSubtypeConfig",
})) as any;

export type UpdateCampaignCommunicationLimitsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the communication limits config for a campaign. This API is idempotent.
 */
export const updateCampaignCommunicationLimits: API.OperationMethod<
  UpdateCampaignCommunicationLimitsRequest,
  UpdateCampaignCommunicationLimitsResponse,
  UpdateCampaignCommunicationLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/campaigns/{id}/communication-limits",
    input: { id: 0, communicationLimitsOverride: i_CommunicationLimitsConfig },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaignCommunicationLimits",
})) as any;

export type UpdateCampaignCommunicationTimeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the communication time config for a campaign. This API is idempotent.
 */
export const updateCampaignCommunicationTime: API.OperationMethod<
  UpdateCampaignCommunicationTimeRequest,
  UpdateCampaignCommunicationTimeResponse,
  UpdateCampaignCommunicationTimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/campaigns/{id}/communication-time",
    input: { id: 0, communicationTimeConfig: i_CommunicationTimeConfig },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaignCommunicationTime",
})) as any;

export type UpdateCampaignEntryLimitsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the entry limits config for a campaign. This API is idempotent.
 */
export const updateCampaignEntryLimits: API.OperationMethod<
  UpdateCampaignEntryLimitsRequest,
  UpdateCampaignEntryLimitsResponse,
  UpdateCampaignEntryLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/campaigns/{id}/entry-limits",
    input: { id: 0, entryLimitsConfig: i_EntryLimitsConfig },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaignEntryLimits",
})) as any;

export type UpdateCampaignFlowAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the campaign flow associated with a campaign. This API is idempotent.
 */
export const updateCampaignFlowAssociation: API.OperationMethod<
  UpdateCampaignFlowAssociationRequest,
  UpdateCampaignFlowAssociationResponse,
  UpdateCampaignFlowAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/campaigns/{id}/flow",
    input: { id: 0, connectCampaignFlowArn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaignFlowAssociation",
})) as any;

export type UpdateCampaignNameError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the name of a campaign. This API is idempotent.
 */
export const updateCampaignName: API.OperationMethod<
  UpdateCampaignNameRequest,
  UpdateCampaignNameResponse,
  UpdateCampaignNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/campaigns/{id}/name",
    input: { id: 0, name: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaignName",
})) as any;

export type UpdateCampaignScheduleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the schedule for a campaign. This API is idempotent.
 */
export const updateCampaignSchedule: API.OperationMethod<
  UpdateCampaignScheduleRequest,
  UpdateCampaignScheduleResponse,
  UpdateCampaignScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/campaigns/{id}/schedule",
    input: { id: 0, schedule: i_Schedule },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaignSchedule",
})) as any;

export type UpdateCampaignSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the campaign source with a campaign. This API is idempotent.
 */
export const updateCampaignSource: API.OperationMethod<
  UpdateCampaignSourceRequest,
  UpdateCampaignSourceResponse,
  UpdateCampaignSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/campaigns/{id}/source",
    input: { id: 0, source: i_Source },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaignSource",
})) as any;

const i_AnswerMachineDetectionConfig: D.LazyStruct = () => ({
  enableAnswerMachineDetection: 0,
  awaitAnswerMachinePrompt: 0,
});
const i_ChannelSubtypeConfig: D.LazyStruct = () => ({
  telephony: {
    capacity: 0,
    connectQueueId: 0,
    outboundMode: {
      progressive: { bandwidthAllocation: 0 },
      predictive: {
        bandwidthAllocation: 0,
        pacingStrategies: D.list({
          abandonmentRate: {
            targetRate: 0,
            connectionStartPoint: 0,
            connectionThresholdSeconds: 0,
            evaluationWindow: 0,
          },
        }),
      },
      agentless: i_AgentlessConfig,
      preview: {
        bandwidthAllocation: 0,
        timeoutConfig: { durationInSeconds: 0 },
        agentActions: 0,
      },
    },
    defaultOutboundConfig: {
      connectContactFlowId: 0,
      connectSourcePhoneNumber: 0,
      answerMachineDetectionConfig: i_AnswerMachineDetectionConfig,
      ringTimeout: 0,
    },
  },
  sms: {
    capacity: 0,
    outboundMode: { agentless: i_AgentlessConfig },
    defaultOutboundConfig: {
      connectSourcePhoneNumberArn: 0,
      wisdomTemplateArn: 0,
    },
  },
  email: {
    capacity: 0,
    outboundMode: { agentless: i_AgentlessConfig },
    defaultOutboundConfig: {
      connectSourceEmailAddress: 0,
      sourceEmailAddressDisplayName: 0,
      wisdomTemplateArn: 0,
    },
  },
  whatsApp: {
    capacity: 0,
    outboundMode: { agentless: i_AgentlessConfig },
    defaultOutboundConfig: {
      connectSourcePhoneNumberArn: 0,
      wisdomTemplateArn: 0,
    },
  },
});
const i_CommunicationLimits: D.LazyStruct = () => ({
  communicationLimitsList: D.list({
    maxCountPerRecipient: 0,
    frequency: 0,
    unit: 0,
  }),
});
const i_CommunicationLimitsConfig: D.LazyStruct = () => ({
  allChannelSubtypes: i_CommunicationLimits,
  instanceLimitsHandling: 0,
});
const i_CommunicationTimeConfig: D.LazyStruct = () => ({
  localTimeZoneConfig: {
    defaultTimeZone: 0,
    localTimeZoneDetection: 0,
    localTimeZoneDetectionScope: 0,
  },
  telephony: i_TimeWindow,
  sms: i_TimeWindow,
  email: i_TimeWindow,
  whatsApp: i_TimeWindow,
});
const i_EntryLimitsConfig: D.LazyStruct = () => ({
  maxEntryCount: 0,
  minEntryInterval: 0,
});
const i_Schedule: D.LazyStruct = () => ({
  startTime: D.tsAs("date-time"),
  endTime: D.tsAs("date-time"),
  refreshFrequency: 0,
});
const i_Source: D.LazyStruct = () => ({
  customerProfilesSegmentArn: 0,
  eventTrigger: { customerProfilesDomainArn: 0 },
});
const o_Schedule: D.LazyStruct = () => ({ startTime: D.ts, endTime: D.ts });
const i_AgentlessConfig: D.LazyStruct = () => ({});
const i_TimeWindow: D.LazyStruct = () => ({
  openHours: { dailyHours: D.map(D.list({ startTime: 0, endTime: 0 })) },
  restrictedPeriods: {
    restrictedPeriodList: D.list({ name: 0, startDate: 0, endDate: 0 }),
  },
});
