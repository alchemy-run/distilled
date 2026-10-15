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
  sdkId: "ConnectCampaignsV2",
  serviceShapeName: "AmazonConnectCampaignServiceV2",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "connect-campaigns" });
const ver = /*@__PURE__*/ T.ServiceVersion("2024-04-23");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://connect-campaigns.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://connect-campaigns.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://connect-campaigns.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      xAmzErrorType: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      xAmzErrorType: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      xAmzErrorType: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InvalidCampaignStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidCampaignStateException>()(
    "InvalidCampaignStateException",
    {
      state: S.String,
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      xAmzErrorType: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InvalidStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidStateException>()(
    "InvalidStateException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      xAmzErrorType: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      xAmzErrorType: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      xAmzErrorType: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      xAmzErrorType: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(429), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      xAmzErrorType: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
  | { progressive: ProgressiveConfig; predictive?: never; agentless?: never; preview?: never }
  | { progressive?: never; predictive: PredictiveConfig; agentless?: never; preview?: never }
  | { progressive?: never; predictive?: never; agentless: AgentlessConfig; preview?: never }
  | { progressive?: never; predictive?: never; agentless?: never; preview: PreviewConfig };
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
export type OpenHours = { dailyHours: { [key: string]: TimeRange[] | undefined } };
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
export type CommunicationLimits = { communicationLimitsList: CommunicationLimit[] };
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
  | { customerProfiles: CustomerProfilesIntegrationIdentifier; qConnect?: never; lambda?: never }
  | { customerProfiles?: never; qConnect: QConnectIntegrationIdentifier; lambda?: never }
  | { customerProfiles?: never; qConnect?: never; lambda: LambdaIntegrationIdentifier };
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
export type SuccessfulCampaignStateResponseList = SuccessfulCampaignStateResponse[];
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
  | { customerProfiles: CustomerProfilesIntegrationSummary; qConnect?: never; lambda?: never }
  | { customerProfiles?: never; qConnect: QConnectIntegrationSummary; lambda?: never }
  | { customerProfiles?: never; qConnect?: never; lambda: LambdaIntegrationSummary };
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
  | { customerProfiles: CustomerProfilesIntegrationConfig; qConnect?: never; lambda?: never }
  | { customerProfiles?: never; qConnect: QConnectIntegrationConfig; lambda?: never }
  | { customerProfiles?: never; qConnect?: never; lambda: LambdaIntegrationConfig };
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
  | { telephony: TelephonyChannelSubtypeParameters; sms?: never; email?: never; whatsApp?: never }
  | { telephony?: never; sms: SmsChannelSubtypeParameters; email?: never; whatsApp?: never }
  | { telephony?: never; sms?: never; email: EmailChannelSubtypeParameters; whatsApp?: never }
  | { telephony?: never; sms?: never; email?: never; whatsApp: WhatsAppChannelSubtypeParameters };
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
export type SuccessfulProfileOutboundRequestList = SuccessfulProfileOutboundRequest[];
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
  input: __S(672, __c42, 0) as any as S.Schema<CreateCampaignRequest>,
  output: __S(673, __c42, 1) as any as S.Schema<CreateCampaignResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<DeleteCampaignRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<DeleteCampaignResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCampaign",
}));

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
  input: __S(16, __c1, 0) as any as S.Schema<DeleteCampaignChannelSubtypeConfigRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<DeleteCampaignChannelSubtypeConfigResponse>,
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
}));

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
  input: __S(32, __c2, 0) as any as S.Schema<DeleteCampaignCommunicationLimitsRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<DeleteCampaignCommunicationLimitsResponse>,
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
}));

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
  input: __S(48, __c3, 0) as any as S.Schema<DeleteCampaignCommunicationTimeRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<DeleteCampaignCommunicationTimeResponse>,
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
}));

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
  input: __S(64, __c4, 0) as any as S.Schema<DeleteCampaignEntryLimitsRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<DeleteCampaignEntryLimitsResponse>,
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
}));

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
  input: __S(80, __c5, 0) as any as S.Schema<DeleteConnectInstanceConfigRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<DeleteConnectInstanceConfigResponse>,
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
}));

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
  input: __S(98, __c6, 2) as any as S.Schema<DeleteConnectInstanceIntegrationRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<DeleteConnectInstanceIntegrationResponse>,
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
}));

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
  input: __S(128, __c8, 0) as any as S.Schema<DeleteInstanceOnboardingJobRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<DeleteInstanceOnboardingJobResponse>,
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
}));

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
  input: __S(144, __c9, 0) as any as S.Schema<DescribeCampaignRequest>,
  output: __S(146, __c9, 2) as any as S.Schema<DescribeCampaignResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCampaign",
}));

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
  input: __S(160, __c10, 0) as any as S.Schema<GetCampaignStateRequest>,
  output: __S(161, __c10, 1) as any as S.Schema<GetCampaignStateResponse>,
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
}));

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
  input: __S(176, __c11, 0) as any as S.Schema<GetCampaignStateBatchRequest>,
  output: __S(181, __c11, 5) as any as S.Schema<GetCampaignStateBatchResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCampaignStateBatch",
}));

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
  input: __S(192, __c12, 0) as any as S.Schema<GetConnectInstanceConfigRequest>,
  output: __S(194, __c12, 2) as any as S.Schema<GetConnectInstanceConfigResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectInstanceConfig",
}));

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
  input: __S(224, __c14, 0) as any as S.Schema<GetInstanceCommunicationLimitsRequest>,
  output: __S(225, __c14, 1) as any as S.Schema<GetInstanceCommunicationLimitsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstanceCommunicationLimits",
}));

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
  input: __S(256, __c16, 0) as any as S.Schema<GetInstanceOnboardingJobStatusRequest>,
  output: __S(273, __c17, 1) as any as S.Schema<GetInstanceOnboardingJobStatusResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstanceOnboardingJobStatus",
}));

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
  input: __S(290, __c18, 2) as any as S.Schema<ListCampaignsRequest>,
  output: __S(293, __c18, 5) as any as S.Schema<ListCampaignsResponse>,
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
  input: __S(304, __c19, 0) as any as S.Schema<ListConnectInstanceIntegrationsRequest>,
  output: __S(306, __c19, 2) as any as S.Schema<ListConnectInstanceIntegrationsResponse>,
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
  input: __S(336, __c21, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(337, __c21, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
  input: __S(352, __c22, 0) as any as S.Schema<PauseCampaignRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<PauseCampaignResponse>,
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
}));

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
  input: __S(368, __c23, 0) as any as S.Schema<PutConnectInstanceIntegrationRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<PutConnectInstanceIntegrationResponse>,
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
}));

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
  input: __S(384, __c24, 0) as any as S.Schema<PutInstanceCommunicationLimitsRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<PutInstanceCommunicationLimitsResponse>,
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
}));

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
  input: __S(406, __c25, 6) as any as S.Schema<PutOutboundRequestBatchRequest>,
  output: __S(420, __c26, 4) as any as S.Schema<PutOutboundRequestBatchResponse>,
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
}));

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
  input: __S(437, __c27, 5) as any as S.Schema<PutProfileOutboundRequestBatchRequest>,
  output: __S(420, __c26, 4) as any as S.Schema<PutProfileOutboundRequestBatchResponse>,
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
}));

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
  input: __S(448, __c28, 0) as any as S.Schema<ResumeCampaignRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<ResumeCampaignResponse>,
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
}));

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
  input: __S(464, __c29, 0) as any as S.Schema<StartCampaignRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<StartCampaignResponse>,
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
}));

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
  input: __S(480, __c30, 0) as any as S.Schema<StartInstanceOnboardingJobRequest>,
  output: __S(273, __c17, 1) as any as S.Schema<StartInstanceOnboardingJobResponse>,
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
}));

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
  input: __S(496, __c31, 0) as any as S.Schema<StopCampaignRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<StopCampaignResponse>,
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
}));

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
  input: __S(512, __c32, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(528, __c33, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(544, __c34, 0) as any as S.Schema<UpdateCampaignChannelSubtypeConfigRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<UpdateCampaignChannelSubtypeConfigResponse>,
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
}));

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
  input: __S(560, __c35, 0) as any as S.Schema<UpdateCampaignCommunicationLimitsRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<UpdateCampaignCommunicationLimitsResponse>,
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
}));

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
  input: __S(576, __c36, 0) as any as S.Schema<UpdateCampaignCommunicationTimeRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<UpdateCampaignCommunicationTimeResponse>,
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
}));

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
  input: __S(592, __c37, 0) as any as S.Schema<UpdateCampaignEntryLimitsRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<UpdateCampaignEntryLimitsResponse>,
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
}));

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
  input: __S(608, __c38, 0) as any as S.Schema<UpdateCampaignFlowAssociationRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<UpdateCampaignFlowAssociationResponse>,
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
}));

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
  input: __S(624, __c39, 0) as any as S.Schema<UpdateCampaignNameRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<UpdateCampaignNameResponse>,
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
}));

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
  input: __S(640, __c40, 0) as any as S.Schema<UpdateCampaignScheduleRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<UpdateCampaignScheduleResponse>,
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
}));

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
  input: __S(656, __c41, 0) as any as S.Schema<UpdateCampaignSourceRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<UpdateCampaignSourceResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/campaigns/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCampaignRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          channelSubtype: S.String.pipe(T.HttpQuery("channelSubtype")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/campaigns/{id}/channel-subtype-config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCampaignChannelSubtypeConfigRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          config: S.String.pipe(T.HttpQuery("config")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/campaigns/{id}/communication-limits" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCampaignCommunicationLimitsRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          config: S.String.pipe(T.HttpQuery("config")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/campaigns/{id}/communication-time" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCampaignCommunicationTimeRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/campaigns/{id}/entry-limits" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCampaignEntryLimitsRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectInstanceId: S.String.pipe(T.HttpLabel("connectInstanceId")),
          campaignDeletionPolicy: S.optional(S.String).pipe(T.HttpQuery("campaignDeletionPolicy")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/connect-instance/{connectInstanceId}/config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConnectInstanceConfigRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ domainArn: S.String })).annotate({
        identifier: "CustomerProfilesIntegrationIdentifier",
      });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ customerProfiles: __S(96, __c6, 0) }),
        /*@__PURE__*/ S.Struct({ qConnect: __S(112, __c7, 0) }),
        /*@__PURE__*/ S.Struct({ lambda: __S(113, __c7, 1) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          connectInstanceId: S.String.pipe(T.HttpLabel("connectInstanceId")),
          integrationIdentifier: __S(97, __c6, 1),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v2/connect-instance/{connectInstanceId}/integrations/delete",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConnectInstanceIntegrationRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ knowledgeBaseArn: S.String })).annotate({
        identifier: "QConnectIntegrationIdentifier",
      });
    case 1:
      return S.suspend(() => S.Struct({ functionArn: S.String })).annotate({
        identifier: "LambdaIntegrationIdentifier",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ connectInstanceId: S.String.pipe(T.HttpLabel("connectInstanceId")) }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/connect-instance/{connectInstanceId}/onboarding",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteInstanceOnboardingJobRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v2/campaigns/{id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeCampaignRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          name: S.String,
          connectInstanceId: S.String,
          channelSubtypeConfig: S.optional(__S(815, __c50, 15)),
          type: S.optional(S.String),
          source: S.optional(__S(849, __c53, 1)),
          connectCampaignFlowArn: S.optional(S.String),
          schedule: S.optional(__S(752, __c47, 0)),
          entryLimitsConfig: S.optional(__S(736, __c46, 0)),
          communicationTimeConfig: S.optional(__S(841, __c52, 9)),
          communicationLimitsOverride: S.optional(__S(816, __c51, 0)),
          tags: S.optional(__S(768, __c48, 0)),
        }),
      ).annotate({ identifier: "Campaign" });
    case 2:
      return S.suspend(() => S.Struct({ campaign: S.optional(__S(145, __c9, 1)) })).annotate({
        identifier: "DescribeCampaignResponse",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/campaigns/{id}/state" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCampaignStateRequest" });
    case 1:
      return S.suspend(() => S.Struct({ state: S.optional(S.String) })).annotate({
        identifier: "GetCampaignStateResponse",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ campaignIds: __S(704, __c44, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/campaigns-state" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCampaignStateBatchRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ campaignId: S.optional(S.String), state: S.optional(S.String) }),
      ).annotate({ identifier: "SuccessfulCampaignStateResponse" });
    case 2:
      return S.Array(__S(177, __c11, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ campaignId: S.optional(S.String), failureCode: S.optional(S.String) }),
      ).annotate({ identifier: "FailedCampaignStateResponse" });
    case 4:
      return S.Array(__S(179, __c11, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          successfulRequests: S.optional(__S(178, __c11, 2)),
          failedRequests: S.optional(__S(180, __c11, 4)),
        }),
      ).annotate({ identifier: "GetCampaignStateBatchResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ connectInstanceId: S.String.pipe(T.HttpLabel("connectInstanceId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/connect-instance/{connectInstanceId}/config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConnectInstanceConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          connectInstanceId: S.String,
          serviceLinkedRoleArn: S.String,
          encryptionConfig: __S(208, __c13, 0),
        }),
      ).annotate({ identifier: "InstanceConfig" });
    case 2:
      return S.suspend(() =>
        S.Struct({ connectInstanceConfig: S.optional(__S(193, __c12, 1)) }),
      ).annotate({ identifier: "GetConnectInstanceConfigResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          enabled: S.Boolean,
          encryptionType: S.optional(S.String),
          keyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "EncryptionConfig" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ connectInstanceId: S.String.pipe(T.HttpLabel("connectInstanceId")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/connect-instance/{connectInstanceId}/communication-limits",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetInstanceCommunicationLimitsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ communicationLimitsConfig: S.optional(__S(240, __c15, 0)) }),
      ).annotate({ identifier: "GetInstanceCommunicationLimitsResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ allChannelSubtypes: S.optional(__S(722, __c45, 2)) }),
      ).annotate({ identifier: "InstanceCommunicationLimitsConfig" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ connectInstanceId: S.String.pipe(T.HttpLabel("connectInstanceId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/connect-instance/{connectInstanceId}/onboarding" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetInstanceOnboardingJobStatusRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectInstanceId: S.String,
          status: S.String,
          failureCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceOnboardingJobStatus" });
    case 1:
      return S.suspend(() =>
        S.Struct({ connectInstanceOnboardingJobStatus: S.optional(__S(272, __c17, 0)) }),
      ).annotate({ identifier: "GetInstanceOnboardingJobStatusResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ value: S.String, operator: S.String })).annotate({
        identifier: "InstanceIdFilter",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ instanceIdFilter: S.optional(__S(288, __c18, 0)) }),
      ).annotate({ identifier: "CampaignFilters" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          filters: S.optional(__S(289, __c18, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/campaigns-summary" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCampaignsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          name: S.String,
          connectInstanceId: S.String,
          channelSubtypes: __S(704, __c44, 0),
          type: S.optional(S.String),
          schedule: S.optional(__S(752, __c47, 0)),
          entryLimitsConfig: S.optional(__S(736, __c46, 0)),
          connectCampaignFlowArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CampaignSummary" });
    case 4:
      return S.Array(__S(291, __c18, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          campaignSummaryList: S.optional(__S(292, __c18, 4)),
        }),
      ).annotate({ identifier: "ListCampaignsResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectInstanceId: S.String.pipe(T.HttpLabel("connectInstanceId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/connect-instance/{connectInstanceId}/integrations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListConnectInstanceIntegrationsRequest" });
    case 1:
      return S.Array(__S(321, __c20, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          integrationSummaryList: S.optional(__S(305, __c19, 1)),
        }),
      ).annotate({ identifier: "ListConnectInstanceIntegrationsResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ domainArn: S.String, objectTypeNames: __S(768, __c48, 0) }),
      ).annotate({ identifier: "CustomerProfilesIntegrationSummary" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ customerProfiles: __S(320, __c20, 0) }),
        /*@__PURE__*/ S.Struct({ qConnect: __S(112, __c7, 0) }),
        /*@__PURE__*/ S.Struct({ lambda: __S(113, __c7, 1) }),
      ]);
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v2/tags/{arn}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(768, __c48, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/campaigns/{id}/pause" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PauseCampaignRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectInstanceId: S.String.pipe(T.HttpLabel("connectInstanceId")),
          integrationConfig: __S(321, __c20, 1),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v2/connect-instance/{connectInstanceId}/integrations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutConnectInstanceIntegrationRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectInstanceId: S.String.pipe(T.HttpLabel("connectInstanceId")),
          communicationLimitsConfig: __S(240, __c15, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v2/connect-instance/{connectInstanceId}/communication-limits",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutInstanceCommunicationLimitsRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          destinationPhoneNumber: SensitiveString,
          attributes: __S(768, __c48, 0),
          connectSourcePhoneNumber: S.optional(S.String),
          answerMachineDetectionConfig: S.optional(__S(784, __c49, 0)),
          ringTimeout: S.optional(S.Number),
        }),
      ).annotate({ identifier: "TelephonyChannelSubtypeParameters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          destinationPhoneNumber: SensitiveString,
          connectSourcePhoneNumberArn: S.optional(S.String),
          templateArn: S.optional(S.String),
          templateParameters: __S(768, __c48, 0),
        }),
      ).annotate({ identifier: "SmsChannelSubtypeParameters" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          destinationEmailAddress: SensitiveString,
          connectSourceEmailAddress: S.optional(SensitiveString),
          templateArn: S.optional(S.String),
          templateParameters: __S(768, __c48, 0),
        }),
      ).annotate({ identifier: "EmailChannelSubtypeParameters" });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ telephony: __S(400, __c25, 0) }),
        /*@__PURE__*/ S.Struct({ sms: __S(401, __c25, 1) }),
        /*@__PURE__*/ S.Struct({ email: __S(402, __c25, 2) }),
        /*@__PURE__*/ S.Struct({ whatsApp: __S(401, __c25, 1) }),
      ]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.String,
          expirationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          channelSubtypeParameters: __S(403, __c25, 3),
        }),
      ).annotate({ identifier: "OutboundRequest" });
    case 5:
      return S.Array(__S(404, __c25, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          outboundRequests: __S(405, __c25, 5),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v2/campaigns/{id}/outbound-requests" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutOutboundRequestBatchRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ clientToken: S.optional(S.String), id: S.optional(S.String) }),
      ).annotate({ identifier: "SuccessfulRequest" });
    case 1:
      return S.Array(__S(416, __c26, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String),
          id: S.optional(S.String),
          failureCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "FailedRequest" });
    case 3:
      return S.Array(__S(418, __c26, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          successfulRequests: S.optional(__S(417, __c26, 1)),
          failedRequests: S.optional(__S(419, __c26, 3)),
        }),
      ).annotate({ identifier: "PutOutboundRequestBatchResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ sessionId: S.optional(S.String), browserId: S.optional(S.String) }),
      ).annotate({ identifier: "WebNotificationContext" });
    case 1:
      return S.suspend(() =>
        S.Struct({ webNotificationContext: S.optional(__S(432, __c27, 0)) }),
      ).annotate({ identifier: "ChannelContext" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          sourceEvent: S.optional(S.String),
          channelContext: S.optional(__S(433, __c27, 1)),
        }),
      ).annotate({ identifier: "EventTriggerContext" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.String,
          profileId: S.String,
          expirationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          eventTriggerContext: S.optional(__S(434, __c27, 2)),
        }),
      ).annotate({ identifier: "ProfileOutboundRequest" });
    case 4:
      return S.Array(__S(435, __c27, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          profileOutboundRequests: __S(436, __c27, 4),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v2/campaigns/{id}/profile-outbound-requests" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutProfileOutboundRequestBatchRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/campaigns/{id}/resume" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ResumeCampaignRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/campaigns/{id}/start" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartCampaignRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectInstanceId: S.String.pipe(T.HttpLabel("connectInstanceId")),
          encryptionConfig: __S(208, __c13, 0),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v2/connect-instance/{connectInstanceId}/onboarding" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartInstanceOnboardingJobRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/campaigns/{id}/stop" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopCampaignRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")), tags: __S(768, __c48, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v2/tags/{arn}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String.pipe(T.HttpLabel("arn")),
          tagKeys: __S(704, __c44, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/v2/tags/{arn}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          channelSubtypeConfig: __S(815, __c50, 15),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/campaigns/{id}/channel-subtype-config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCampaignChannelSubtypeConfigRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          communicationLimitsOverride: __S(816, __c51, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/campaigns/{id}/communication-limits" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCampaignCommunicationLimitsRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          communicationTimeConfig: __S(841, __c52, 9),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/campaigns/{id}/communication-time" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCampaignCommunicationTimeRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          entryLimitsConfig: __S(736, __c46, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/campaigns/{id}/entry-limits" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCampaignEntryLimitsRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")), connectCampaignFlowArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/campaigns/{id}/flow" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCampaignFlowAssociationRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")), name: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/campaigns/{id}/name" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCampaignNameRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")), schedule: __S(752, __c47, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/campaigns/{id}/schedule" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCampaignScheduleRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")), source: __S(849, __c53, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/campaigns/{id}/source" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCampaignSourceRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          connectInstanceId: S.String,
          channelSubtypeConfig: S.optional(__S(815, __c50, 15)),
          type: S.optional(S.String),
          source: S.optional(__S(849, __c53, 1)),
          connectCampaignFlowArn: S.optional(S.String),
          schedule: S.optional(__S(752, __c47, 0)),
          entryLimitsConfig: S.optional(__S(736, __c46, 0)),
          communicationTimeConfig: S.optional(__S(841, __c52, 9)),
          communicationLimitsOverride: S.optional(__S(816, __c51, 0)),
          tags: S.optional(__S(768, __c48, 0)),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/v2/campaigns" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateCampaignRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          tags: S.optional(__S(768, __c48, 0)),
        }),
      ).annotate({ identifier: "CreateCampaignResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "AgentlessConfig" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxCountPerRecipient: S.Number, frequency: S.Number, unit: S.String }),
      ).annotate({ identifier: "CommunicationLimit" });
    case 1:
      return S.Array(__S(720, __c45, 0));
    case 2:
      return S.Union([/*@__PURE__*/ S.Struct({ communicationLimitsList: __S(721, __c45, 1) })]);
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxEntryCount: S.Number, minEntryInterval: S.String }),
      ).annotate({ identifier: "EntryLimitsConfig" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          endTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          refreshFrequency: S.optional(S.String),
        }),
      ).annotate({ identifier: "Schedule" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          enableAnswerMachineDetection: S.Boolean,
          awaitAnswerMachinePrompt: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AnswerMachineDetectionConfig" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ bandwidthAllocation: S.Number })).annotate({
        identifier: "ProgressiveConfig",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          targetRate: S.Number,
          connectionStartPoint: S.String,
          connectionThresholdSeconds: S.Number,
          evaluationWindow: S.String,
        }),
      ).annotate({ identifier: "AbandonmentRatePacingConfig" });
    case 2:
      return S.Union([/*@__PURE__*/ S.Struct({ abandonmentRate: __S(801, __c50, 1) })]);
    case 3:
      return S.Array(__S(802, __c50, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          bandwidthAllocation: S.Number,
          pacingStrategies: S.optional(__S(803, __c50, 3)),
        }),
      ).annotate({ identifier: "PredictiveConfig" });
    case 5:
      return S.suspend(() => S.Struct({ durationInSeconds: S.Number })).annotate({
        identifier: "TimeoutConfig",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          bandwidthAllocation: S.Number,
          timeoutConfig: __S(805, __c50, 5),
          agentActions: S.optional(__S(704, __c44, 0)),
        }),
      ).annotate({ identifier: "PreviewConfig" });
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ progressive: __S(800, __c50, 0) }),
        /*@__PURE__*/ S.Struct({ predictive: __S(804, __c50, 4) }),
        /*@__PURE__*/ S.Struct({ agentless: __S(688, __c43, 0) }),
        /*@__PURE__*/ S.Struct({ preview: __S(806, __c50, 6) }),
      ]);
    case 8:
      return S.suspend(() =>
        S.Struct({
          connectContactFlowId: S.String,
          connectSourcePhoneNumber: S.optional(S.String),
          answerMachineDetectionConfig: S.optional(__S(784, __c49, 0)),
          ringTimeout: S.optional(S.Number),
        }),
      ).annotate({ identifier: "TelephonyOutboundConfig" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          capacity: S.optional(S.Number),
          connectQueueId: S.optional(S.String),
          outboundMode: __S(807, __c50, 7),
          defaultOutboundConfig: __S(808, __c50, 8),
        }),
      ).annotate({ identifier: "TelephonyChannelSubtypeConfig" });
    case 10:
      return S.Union([/*@__PURE__*/ S.Struct({ agentless: __S(688, __c43, 0) })]);
    case 11:
      return S.suspend(() =>
        S.Struct({ connectSourcePhoneNumberArn: S.String, wisdomTemplateArn: S.String }),
      ).annotate({ identifier: "SmsOutboundConfig" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          capacity: S.optional(S.Number),
          outboundMode: __S(810, __c50, 10),
          defaultOutboundConfig: __S(811, __c50, 11),
        }),
      ).annotate({ identifier: "SmsChannelSubtypeConfig" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          connectSourceEmailAddress: SensitiveString,
          sourceEmailAddressDisplayName: S.optional(SensitiveString),
          wisdomTemplateArn: S.String,
        }),
      ).annotate({ identifier: "EmailOutboundConfig" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          capacity: S.optional(S.Number),
          outboundMode: __S(810, __c50, 10),
          defaultOutboundConfig: __S(813, __c50, 13),
        }),
      ).annotate({ identifier: "EmailChannelSubtypeConfig" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          telephony: S.optional(__S(809, __c50, 9)),
          sms: S.optional(__S(812, __c50, 12)),
          email: S.optional(__S(814, __c50, 14)),
          whatsApp: S.optional(__S(812, __c50, 12)),
        }),
      ).annotate({ identifier: "ChannelSubtypeConfig" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          allChannelSubtypes: S.optional(__S(722, __c45, 2)),
          instanceLimitsHandling: S.optional(S.String),
        }),
      ).annotate({ identifier: "CommunicationLimitsConfig" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          defaultTimeZone: S.optional(S.String),
          localTimeZoneDetection: S.optional(__S(704, __c44, 0)),
          localTimeZoneDetectionScope: S.optional(S.String),
        }),
      ).annotate({ identifier: "LocalTimeZoneConfig" });
    case 1:
      return S.suspend(() => S.Struct({ startTime: S.String, endTime: S.String })).annotate({
        identifier: "TimeRange",
      });
    case 2:
      return S.Array(__S(833, __c52, 1));
    case 3:
      return S.Record(S.String, /*@__PURE__*/ __S(834, __c52, 2).pipe(S.optional));
    case 4:
      return S.Union([/*@__PURE__*/ S.Struct({ dailyHours: __S(835, __c52, 3) })]);
    case 5:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), startDate: S.String, endDate: S.String }),
      ).annotate({ identifier: "RestrictedPeriod" });
    case 6:
      return S.Array(__S(837, __c52, 5));
    case 7:
      return S.Union([/*@__PURE__*/ S.Struct({ restrictedPeriodList: __S(838, __c52, 6) })]);
    case 8:
      return S.suspend(() =>
        S.Struct({
          openHours: __S(836, __c52, 4),
          restrictedPeriods: S.optional(__S(839, __c52, 7)),
        }),
      ).annotate({ identifier: "TimeWindow" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          localTimeZoneConfig: __S(832, __c52, 0),
          telephony: S.optional(__S(840, __c52, 8)),
          sms: S.optional(__S(840, __c52, 8)),
          email: S.optional(__S(840, __c52, 8)),
          whatsApp: S.optional(__S(840, __c52, 8)),
        }),
      ).annotate({ identifier: "CommunicationTimeConfig" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ customerProfilesDomainArn: S.optional(S.String) }),
      ).annotate({ identifier: "EventTrigger" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ customerProfilesSegmentArn: S.String }),
        /*@__PURE__*/ S.Struct({ eventTrigger: __S(848, __c53, 0) }),
      ]);
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
