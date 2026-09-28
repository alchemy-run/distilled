import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "MediaTailor",
  target: "MediaTailor",
  version: "2018-04-23",
  sigv4: "mediatailor",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
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
            UseDualStack === true
          ) {
            return e(
              `https://mediatailor.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://api.mediatailor-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true && UseDualStack === false) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://api.mediatailor-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://api.mediatailor.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://api.mediatailor.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  )<{ readonly message?: string }> {}
export class ChannelNotFound
  extends /*@__PURE__*/ TE.TaggedError("ChannelNotFound", ["NotFoundError"], {
    synthetic: { from: "NotFoundException", message: { matches: ".*" } },
  })<{ readonly message?: string }> {}
export class PlaybackConfigurationNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "PlaybackConfigurationNotFound",
    ["NotFoundError"],
    {
      synthetic: {
        from: "NotFoundException",
        message: { includes: "not found" },
      },
    },
  )<{ readonly message?: string }> {}
export class PrefetchScheduleNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "PrefetchScheduleNotFound",
    ["NotFoundError"],
    { synthetic: { from: "NotFoundException", message: { matches: ".*" } } },
  )<{ readonly message?: string }> {}
export class ProgramNotFound
  extends /*@__PURE__*/ TE.TaggedError("ProgramNotFound", ["NotFoundError"], {
    synthetic: { from: "NotFoundException", message: { matches: ".*" } },
  })<{ readonly message?: string }> {}
export type LogType = "AS_RUN" | (string & {});
export type LogTypes = LogType[];
export interface ConfigureLogsForChannelRequest {
  ChannelName: string;
  LogTypes: LogType[];
}
export interface ConfigureLogsForChannelResponse {
  ChannelName?: string;
  LogTypes?: LogType[];
}
export type LoggingStrategy =
  | "VENDED_LOGS"
  | "LEGACY_CLOUDWATCH"
  | (string & {});
export type __listOfLoggingStrategies = LoggingStrategy[];
export type AdsInteractionPublishOptInEventType =
  | "RAW_ADS_RESPONSE"
  | "RAW_ADS_REQUEST"
  | "PRE_ADS_REQUEST_HOOK_SUMMARY"
  | "PRE_ADS_REQUEST_FUNCTION_COMPLETED"
  | (string & {});
export type __adsInteractionPublishOptInEventTypesList =
  AdsInteractionPublishOptInEventType[];
export type AdsInteractionExcludeEventType =
  | "AD_MARKER_FOUND"
  | "NON_AD_MARKER_FOUND"
  | "MAKING_ADS_REQUEST"
  | "MODIFIED_TARGET_URL"
  | "VAST_REDIRECT"
  | "EMPTY_VAST_RESPONSE"
  | "EMPTY_VMAP_RESPONSE"
  | "VAST_RESPONSE"
  | "REDIRECTED_VAST_RESPONSE"
  | "FILLED_AVAIL"
  | "FILLED_OVERLAY_AVAIL"
  | "BEACON_FIRED"
  | "WARNING_NO_ADVERTISEMENTS"
  | "WARNING_VPAID_AD_DROPPED"
  | "WARNING_URL_VARIABLE_SUBSTITUTION_FAILED"
  | "ERROR_UNKNOWN"
  | "ERROR_UNKNOWN_HOST"
  | "ERROR_DISALLOWED_HOST"
  | "ERROR_ADS_IO"
  | "ERROR_ADS_TIMEOUT"
  | "ERROR_ADS_RESPONSE_PARSE"
  | "ERROR_ADS_RESPONSE_UNKNOWN_ROOT_ELEMENT"
  | "ERROR_ADS_INVALID_RESPONSE"
  | "ERROR_VAST_REDIRECT_EMPTY_RESPONSE"
  | "ERROR_VAST_REDIRECT_MULTIPLE_VAST"
  | "ERROR_VAST_REDIRECT_FAILED"
  | "ERROR_VAST_MISSING_MEDIAFILES"
  | "ERROR_VAST_MISSING_CREATIVES"
  | "ERROR_VAST_MISSING_OVERLAYS"
  | "ERROR_VAST_MISSING_IMPRESSION"
  | "ERROR_VAST_INVALID_VAST_AD_TAG_URI"
  | "ERROR_VAST_MULTIPLE_TRACKING_EVENTS"
  | "ERROR_VAST_MULTIPLE_LINEAR"
  | "ERROR_VAST_INVALID_MEDIA_FILE"
  | "ERROR_FIRING_BEACON_FAILED"
  | "ERROR_PERSONALIZATION_DISABLED"
  | "VOD_TIME_BASED_AVAIL_PLAN_VAST_RESPONSE_FOR_OFFSET"
  | "VOD_TIME_BASED_AVAIL_PLAN_SUCCESS"
  | "VOD_TIME_BASED_AVAIL_PLAN_WARNING_NO_ADVERTISEMENTS"
  | "INTERSTITIAL_VOD_SUCCESS"
  | "INTERSTITIAL_VOD_FAILURE"
  | "PRE_ADS_REQUEST_HOOK_ERROR"
  | "PRE_ADS_REQUEST_FUNCTION_ERROR"
  | (string & {});
export type __adsInteractionExcludeEventTypesList =
  AdsInteractionExcludeEventType[];
export interface AdsInteractionLog {
  PublishOptInEventTypes?: AdsInteractionPublishOptInEventType[];
  ExcludeEventTypes?: AdsInteractionExcludeEventType[];
}
export type ManifestServicePublishOptInEventType =
  | "PRE_SESSION_INIT_HOOK_SUMMARY"
  | "PRE_SESSION_INIT_FUNCTION_COMPLETED"
  | (string & {});
export type __manifestServicePublishOptInEventTypesList =
  ManifestServicePublishOptInEventType[];
export type ManifestServiceExcludeEventType =
  | "GENERATED_MANIFEST"
  | "ORIGIN_MANIFEST"
  | "SESSION_INITIALIZED"
  | "TRACKING_RESPONSE"
  | "CONFIG_SYNTAX_ERROR"
  | "CONFIG_SECURITY_ERROR"
  | "UNKNOWN_HOST"
  | "TIMEOUT_ERROR"
  | "CONNECTION_ERROR"
  | "IO_ERROR"
  | "UNKNOWN_ERROR"
  | "HOST_DISALLOWED"
  | "PARSING_ERROR"
  | "MANIFEST_ERROR"
  | "NO_MASTER_OR_MEDIA_PLAYLIST"
  | "NO_MASTER_PLAYLIST"
  | "NO_MEDIA_PLAYLIST"
  | "INCOMPATIBLE_HLS_VERSION"
  | "SCTE35_PARSING_ERROR"
  | "INVALID_SINGLE_PERIOD_DASH_MANIFEST"
  | "UNSUPPORTED_SINGLE_PERIOD_DASH_MANIFEST"
  | "LAST_PERIOD_MISSING_AUDIO"
  | "LAST_PERIOD_MISSING_AUDIO_WARNING"
  | "ERROR_ORIGIN_PREFIX_INTERPOLATION"
  | "ERROR_ADS_INTERPOLATION"
  | "ERROR_LIVE_PRE_ROLL_ADS_INTERPOLATION"
  | "ERROR_CDN_AD_SEGMENT_INTERPOLATION"
  | "ERROR_CDN_CONTENT_SEGMENT_INTERPOLATION"
  | "ERROR_SLATE_AD_URL_INTERPOLATION"
  | "ERROR_PROFILE_NAME_INTERPOLATION"
  | "ERROR_BUMPER_START_INTERPOLATION"
  | "ERROR_BUMPER_END_INTERPOLATION"
  | "PRE_SESSION_INIT_HOOK_ERROR"
  | "PRE_SESSION_INIT_FUNCTION_ERROR"
  | (string & {});
export type __manifestServiceExcludeEventTypesList =
  ManifestServiceExcludeEventType[];
export interface ManifestServiceInteractionLog {
  PublishOptInEventTypes?: ManifestServicePublishOptInEventType[];
  ExcludeEventTypes?: ManifestServiceExcludeEventType[];
}
export interface ConfigureLogsForPlaybackConfigurationRequest {
  PercentEnabled: number;
  PlaybackConfigurationName: string;
  EnabledLoggingStrategies?: LoggingStrategy[];
  AdsInteractionLog?: AdsInteractionLog;
  ManifestServiceInteractionLog?: ManifestServiceInteractionLog;
}
export interface ConfigureLogsForPlaybackConfigurationResponse {
  PercentEnabled: number;
  PlaybackConfigurationName?: string;
  EnabledLoggingStrategies?: LoggingStrategy[];
  AdsInteractionLog?: AdsInteractionLog;
  ManifestServiceInteractionLog?: ManifestServiceInteractionLog;
}
export interface SlateSource {
  SourceLocationName?: string;
  VodSourceName?: string;
}
export interface DashPlaylistSettings {
  ManifestWindowSeconds?: number;
  MinBufferTimeSeconds?: number;
  MinUpdatePeriodSeconds?: number;
  SuggestedPresentationDelaySeconds?: number;
}
export type AdMarkupType = "DATERANGE" | "SCTE35_ENHANCED" | (string & {});
export type AdMarkupTypes = AdMarkupType[];
export interface HlsPlaylistSettings {
  ManifestWindowSeconds?: number;
  AdMarkupType?: AdMarkupType[];
}
export interface RequestOutputItem {
  DashPlaylistSettings?: DashPlaylistSettings;
  HlsPlaylistSettings?: HlsPlaylistSettings;
  ManifestName: string;
  SourceGroup: string;
}
export type RequestOutputs = RequestOutputItem[];
export type PlaybackMode = "LOOP" | "LINEAR" | (string & {});
export type __mapOf__string = { [key: string]: string | undefined };
export type Tier = "BASIC" | "STANDARD" | (string & {});
export interface TimeShiftConfiguration {
  MaxTimeDelaySeconds: number;
}
export type Audiences = string[];
export interface CreateChannelRequest {
  ChannelName: string;
  FillerSlate?: SlateSource;
  Outputs: RequestOutputItem[];
  PlaybackMode: PlaybackMode;
  Tags?: { [key: string]: string | undefined };
  Tier?: Tier;
  TimeShiftConfiguration?: TimeShiftConfiguration;
  Audiences?: string[];
}
export type ChannelState = "RUNNING" | "STOPPED" | (string & {});
export type __timestampUnix = Date;
export interface ResponseOutputItem {
  DashPlaylistSettings?: DashPlaylistSettings;
  HlsPlaylistSettings?: HlsPlaylistSettings;
  ManifestName: string;
  PlaybackUrl: string;
  DualStackPlaybackUrl?: string;
  SourceGroup: string;
}
export type ResponseOutputs = ResponseOutputItem[];
export interface CreateChannelResponse {
  Arn?: string;
  ChannelName?: string;
  ChannelState?: ChannelState;
  CreationTime?: Date;
  FillerSlate?: SlateSource;
  LastModifiedTime?: Date;
  Outputs?: ResponseOutputItem[];
  PlaybackMode?: string;
  Tags?: { [key: string]: string | undefined };
  Tier?: string;
  TimeShiftConfiguration?: TimeShiftConfiguration;
  Audiences?: string[];
}
export type Type = "DASH" | "HLS" | (string & {});
export interface HttpPackageConfiguration {
  Path: string;
  SourceGroup: string;
  Type: Type;
}
export type HttpPackageConfigurations = HttpPackageConfiguration[];
export interface CreateLiveSourceRequest {
  HttpPackageConfigurations: HttpPackageConfiguration[];
  LiveSourceName: string;
  SourceLocationName: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateLiveSourceResponse {
  Arn?: string;
  CreationTime?: Date;
  HttpPackageConfigurations?: HttpPackageConfiguration[];
  LastModifiedTime?: Date;
  LiveSourceName?: string;
  SourceLocationName?: string;
  Tags?: { [key: string]: string | undefined };
}
export type Operator = "EQUALS" | (string & {});
export interface AvailMatchingCriteria {
  DynamicVariable: string;
  Operator: Operator;
}
export type __listOfAvailMatchingCriteria = AvailMatchingCriteria[];
export interface PrefetchConsumption {
  AvailMatchingCriteria?: AvailMatchingCriteria[];
  EndTime: Date;
  StartTime?: Date;
}
export type TrafficShapingType = "RETRIEVAL_WINDOW" | "TPS" | (string & {});
export interface TrafficShapingRetrievalWindow {
  RetrievalWindowDurationSeconds?: number;
}
export interface TrafficShapingTpsConfiguration {
  PeakTps?: number;
  PeakConcurrentUsers?: number;
}
export interface PrefetchRetrieval {
  DynamicVariables?: { [key: string]: string | undefined };
  EndTime: Date;
  StartTime?: Date;
  TrafficShapingType?: TrafficShapingType;
  TrafficShapingRetrievalWindow?: TrafficShapingRetrievalWindow;
  TrafficShapingTpsConfiguration?: TrafficShapingTpsConfiguration;
}
export interface RecurringConsumption {
  RetrievedAdExpirationSeconds?: number;
  AvailMatchingCriteria?: AvailMatchingCriteria[];
}
export interface RecurringRetrieval {
  DynamicVariables?: { [key: string]: string | undefined };
  DelayAfterAvailEndSeconds?: number;
  TrafficShapingType?: TrafficShapingType;
  TrafficShapingRetrievalWindow?: TrafficShapingRetrievalWindow;
  TrafficShapingTpsConfiguration?: TrafficShapingTpsConfiguration;
}
export interface RecurringPrefetchConfiguration {
  StartTime?: Date;
  EndTime: Date;
  RecurringConsumption: RecurringConsumption;
  RecurringRetrieval: RecurringRetrieval;
}
export type PrefetchScheduleType = "SINGLE" | "RECURRING" | (string & {});
export interface CreatePrefetchScheduleRequest {
  Consumption?: PrefetchConsumption;
  Name: string;
  PlaybackConfigurationName: string;
  Retrieval?: PrefetchRetrieval;
  RecurringPrefetchConfiguration?: RecurringPrefetchConfiguration;
  ScheduleType?: PrefetchScheduleType;
  StreamId?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreatePrefetchScheduleResponse {
  Arn?: string;
  Consumption?: PrefetchConsumption;
  Name?: string;
  PlaybackConfigurationName?: string;
  Retrieval?: PrefetchRetrieval;
  RecurringPrefetchConfiguration?: RecurringPrefetchConfiguration;
  ScheduleType?: PrefetchScheduleType;
  StreamId?: string;
  Tags?: { [key: string]: string | undefined };
}
export type MessageType = "SPLICE_INSERT" | "TIME_SIGNAL" | (string & {});
export interface SpliceInsertMessage {
  AvailNum?: number;
  AvailsExpected?: number;
  SpliceEventId?: number;
  UniqueProgramId?: number;
}
export interface SegmentationDescriptor {
  SegmentationEventId?: number;
  SegmentationUpidType?: number;
  SegmentationUpid?: string;
  SegmentationTypeId?: number;
  SegmentNum?: number;
  SegmentsExpected?: number;
  SubSegmentNum?: number;
  SubSegmentsExpected?: number;
}
export type SegmentationDescriptorList = SegmentationDescriptor[];
export interface TimeSignalMessage {
  SegmentationDescriptors?: SegmentationDescriptor[];
}
export interface KeyValuePair {
  Key: string;
  Value: string;
}
export type AdBreakMetadataList = KeyValuePair[];
export interface AdBreak {
  MessageType?: MessageType;
  OffsetMillis: number;
  Slate?: SlateSource;
  SpliceInsertMessage?: SpliceInsertMessage;
  TimeSignalMessage?: TimeSignalMessage;
  AdBreakMetadata?: KeyValuePair[];
}
export type __listOfAdBreak = AdBreak[];
export type RelativePosition =
  | "BEFORE_PROGRAM"
  | "AFTER_PROGRAM"
  | (string & {});
export interface Transition {
  DurationMillis?: number;
  RelativePosition: RelativePosition;
  RelativeProgram?: string;
  ScheduledStartTimeMillis?: number;
  Type: string;
}
export interface ClipRange {
  EndOffsetMillis?: number;
  StartOffsetMillis?: number;
}
export interface ScheduleConfiguration {
  Transition: Transition;
  ClipRange?: ClipRange;
}
export interface AlternateMedia {
  SourceLocationName?: string;
  LiveSourceName?: string;
  VodSourceName?: string;
  ClipRange?: ClipRange;
  ScheduledStartTimeMillis?: number;
  AdBreaks?: AdBreak[];
  DurationMillis?: number;
}
export type __listOfAlternateMedia = AlternateMedia[];
export interface AudienceMedia {
  Audience?: string;
  AlternateMedia?: AlternateMedia[];
}
export type __listOfAudienceMedia = AudienceMedia[];
export interface CreateProgramRequest {
  AdBreaks?: AdBreak[];
  ChannelName: string;
  LiveSourceName?: string;
  ProgramName: string;
  ScheduleConfiguration: ScheduleConfiguration;
  SourceLocationName: string;
  VodSourceName?: string;
  AudienceMedia?: AudienceMedia[];
  Tags?: { [key: string]: string | undefined };
}
export interface CreateProgramResponse {
  AdBreaks?: AdBreak[];
  Arn?: string;
  ChannelName?: string;
  CreationTime?: Date;
  LiveSourceName?: string;
  ProgramName?: string;
  ScheduledStartTime?: Date;
  SourceLocationName?: string;
  VodSourceName?: string;
  ClipRange?: ClipRange;
  DurationMillis?: number;
  AudienceMedia?: AudienceMedia[];
  Tags?: { [key: string]: string | undefined };
}
export type AccessType =
  | "S3_SIGV4"
  | "SECRETS_MANAGER_ACCESS_TOKEN"
  | "AUTODETECT_SIGV4"
  | (string & {});
export interface SecretsManagerAccessTokenConfiguration {
  HeaderName?: string;
  SecretArn?: string;
  SecretStringKey?: string;
}
export interface AccessConfiguration {
  AccessType?: AccessType;
  SecretsManagerAccessTokenConfiguration?: SecretsManagerAccessTokenConfiguration;
}
export interface DefaultSegmentDeliveryConfiguration {
  BaseUrl?: string;
}
export interface HttpConfiguration {
  BaseUrl: string;
}
export interface SegmentDeliveryConfiguration {
  BaseUrl?: string;
  Name?: string;
}
export type __listOfSegmentDeliveryConfiguration =
  SegmentDeliveryConfiguration[];
export interface CreateSourceLocationRequest {
  AccessConfiguration?: AccessConfiguration;
  DefaultSegmentDeliveryConfiguration?: DefaultSegmentDeliveryConfiguration;
  HttpConfiguration: HttpConfiguration;
  SegmentDeliveryConfigurations?: SegmentDeliveryConfiguration[];
  SourceLocationName: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateSourceLocationResponse {
  AccessConfiguration?: AccessConfiguration;
  Arn?: string;
  CreationTime?: Date;
  DefaultSegmentDeliveryConfiguration?: DefaultSegmentDeliveryConfiguration;
  HttpConfiguration?: HttpConfiguration;
  LastModifiedTime?: Date;
  SegmentDeliveryConfigurations?: SegmentDeliveryConfiguration[];
  SourceLocationName?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateVodSourceRequest {
  HttpPackageConfigurations: HttpPackageConfiguration[];
  SourceLocationName: string;
  Tags?: { [key: string]: string | undefined };
  VodSourceName: string;
}
export interface CreateVodSourceResponse {
  Arn?: string;
  CreationTime?: Date;
  HttpPackageConfigurations?: HttpPackageConfiguration[];
  LastModifiedTime?: Date;
  SourceLocationName?: string;
  Tags?: { [key: string]: string | undefined };
  VodSourceName?: string;
}
export interface DeleteChannelRequest {
  ChannelName: string;
}
export interface DeleteChannelResponse {}
export interface DeleteChannelPolicyRequest {
  ChannelName: string;
}
export interface DeleteChannelPolicyResponse {}
export interface DeleteFunctionRequest {
  FunctionId: string;
}
export interface DeleteFunctionResponse {}
export interface DeleteLiveSourceRequest {
  LiveSourceName: string;
  SourceLocationName: string;
}
export interface DeleteLiveSourceResponse {}
export interface DeletePlaybackConfigurationRequest {
  Name: string;
}
export interface DeletePlaybackConfigurationResponse {}
export interface DeletePrefetchScheduleRequest {
  Name: string;
  PlaybackConfigurationName: string;
}
export interface DeletePrefetchScheduleResponse {}
export interface DeleteProgramRequest {
  ChannelName: string;
  ProgramName: string;
}
export interface DeleteProgramResponse {}
export interface DeleteSourceLocationRequest {
  SourceLocationName: string;
}
export interface DeleteSourceLocationResponse {}
export interface DeleteVodSourceRequest {
  SourceLocationName: string;
  VodSourceName: string;
}
export interface DeleteVodSourceResponse {}
export interface DescribeChannelRequest {
  ChannelName: string;
}
export interface LogConfigurationForChannel {
  LogTypes?: LogType[];
}
export interface DescribeChannelResponse {
  Arn?: string;
  ChannelName?: string;
  ChannelState?: ChannelState;
  CreationTime?: Date;
  FillerSlate?: SlateSource;
  LastModifiedTime?: Date;
  Outputs?: ResponseOutputItem[];
  PlaybackMode?: string;
  Tags?: { [key: string]: string | undefined };
  Tier?: string;
  LogConfiguration: LogConfigurationForChannel;
  TimeShiftConfiguration?: TimeShiftConfiguration;
  Audiences?: string[];
}
export interface DescribeLiveSourceRequest {
  LiveSourceName: string;
  SourceLocationName: string;
}
export interface DescribeLiveSourceResponse {
  Arn?: string;
  CreationTime?: Date;
  HttpPackageConfigurations?: HttpPackageConfiguration[];
  LastModifiedTime?: Date;
  LiveSourceName?: string;
  SourceLocationName?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface DescribeProgramRequest {
  ChannelName: string;
  ProgramName: string;
}
export interface DescribeProgramResponse {
  AdBreaks?: AdBreak[];
  Arn?: string;
  ChannelName?: string;
  CreationTime?: Date;
  LiveSourceName?: string;
  ProgramName?: string;
  ScheduledStartTime?: Date;
  SourceLocationName?: string;
  VodSourceName?: string;
  ClipRange?: ClipRange;
  DurationMillis?: number;
  AudienceMedia?: AudienceMedia[];
  Tags?: { [key: string]: string | undefined };
}
export interface DescribeSourceLocationRequest {
  SourceLocationName: string;
}
export interface DescribeSourceLocationResponse {
  AccessConfiguration?: AccessConfiguration;
  Arn?: string;
  CreationTime?: Date;
  DefaultSegmentDeliveryConfiguration?: DefaultSegmentDeliveryConfiguration;
  HttpConfiguration?: HttpConfiguration;
  LastModifiedTime?: Date;
  SegmentDeliveryConfigurations?: SegmentDeliveryConfiguration[];
  SourceLocationName?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface DescribeVodSourceRequest {
  SourceLocationName: string;
  VodSourceName: string;
}
export interface AdBreakOpportunity {
  OffsetMillis: number;
}
export type AdBreakOpportunities = AdBreakOpportunity[];
export interface DescribeVodSourceResponse {
  AdBreakOpportunities?: AdBreakOpportunity[];
  Arn?: string;
  CreationTime?: Date;
  HttpPackageConfigurations?: HttpPackageConfiguration[];
  LastModifiedTime?: Date;
  SourceLocationName?: string;
  Tags?: { [key: string]: string | undefined };
  VodSourceName?: string;
}
export interface GetChannelPolicyRequest {
  ChannelName: string;
}
export interface GetChannelPolicyResponse {
  Policy?: string;
}
export type MaxResults = number;
export interface GetChannelScheduleRequest {
  ChannelName: string;
  DurationMinutes?: string;
  MaxResults?: number;
  NextToken?: string;
  Audience?: string;
}
export interface ScheduleAdBreak {
  ApproximateDurationSeconds?: number;
  ApproximateStartTime?: Date;
  SourceLocationName?: string;
  VodSourceName?: string;
}
export type __listOfScheduleAdBreak = ScheduleAdBreak[];
export type ScheduleEntryType =
  | "PROGRAM"
  | "FILLER_SLATE"
  | "ALTERNATE_MEDIA"
  | (string & {});
export interface ScheduleEntry {
  ApproximateDurationSeconds?: number;
  ApproximateStartTime?: Date;
  Arn: string;
  ChannelName: string;
  LiveSourceName?: string;
  ProgramName: string;
  ScheduleAdBreaks?: ScheduleAdBreak[];
  ScheduleEntryType?: ScheduleEntryType;
  SourceLocationName: string;
  VodSourceName?: string;
  Audiences?: string[];
}
export type __listOfScheduleEntry = ScheduleEntry[];
export interface GetChannelScheduleResponse {
  Items?: ScheduleEntry[];
  NextToken?: string;
}
export interface GetFunctionRequest {
  FunctionId: string;
}
export type FunctionType =
  | "HTTP_REQUEST"
  | "CUSTOM_OUTPUT"
  | "CONCURRENT_EXECUTOR"
  | "SEQUENTIAL_EXECUTOR"
  | (string & {});
export type RuntimeType = "JSONATA" | (string & {});
export type MethodType = "GET" | "POST" | (string & {});
export interface HttpRequestConfiguration {
  Runtime: RuntimeType;
  Output?: { [key: string]: string | undefined };
  MethodType: MethodType;
  RequestTimeoutMilliseconds: number;
  Url: string;
  Body?: string;
  Headers?: { [key: string]: string | undefined };
}
export interface CustomOutputConfiguration {
  Runtime: RuntimeType;
  Output?: { [key: string]: string | undefined };
}
export interface FunctionRef {
  RunCondition?: string;
  FunctionId?: string;
  Alias?: string;
}
export type __listOfFunctionsRef = FunctionRef[];
export interface ConcurrentExecutorConfiguration {
  Runtime: RuntimeType;
  Output: { [key: string]: string | undefined };
  FunctionList: FunctionRef[];
  TimeoutMilliseconds: number;
  MaxConcurrency: number;
}
export interface SequentialExecutorConfiguration {
  Runtime: RuntimeType;
  Output?: { [key: string]: string | undefined };
  FunctionList: FunctionRef[];
  TimeoutMilliseconds: number;
}
export interface GetFunctionResponse {
  FunctionId: string;
  FunctionType: FunctionType;
  Description?: string;
  HttpRequestConfiguration?: HttpRequestConfiguration;
  CustomOutputConfiguration?: CustomOutputConfiguration;
  ConcurrentExecutorConfiguration?: ConcurrentExecutorConfiguration;
  SequentialExecutorConfiguration?: SequentialExecutorConfiguration;
  Tags?: { [key: string]: string | undefined };
  Arn?: string;
}
export interface GetPlaybackConfigurationRequest {
  Name: string;
}
export type Mode =
  | "OFF"
  | "BEHIND_LIVE_EDGE"
  | "AFTER_LIVE_EDGE"
  | (string & {});
export type FillPolicy = "FULL_AVAIL_ONLY" | "PARTIAL_AVAIL" | (string & {});
export interface AvailSuppression {
  Mode?: Mode;
  Value?: string;
  FillPolicy?: FillPolicy;
}
export interface Bumper {
  EndUrl?: string;
  StartUrl?: string;
}
export interface CdnConfiguration {
  AdSegmentUrlPrefix?: string;
  ContentSegmentUrlPrefix?: string;
}
export type ConfigurationAliasesResponse = {
  [key: string]: { [key: string]: string | undefined } | undefined;
};
export type OriginManifestType =
  | "SINGLE_PERIOD"
  | "MULTI_PERIOD"
  | (string & {});
export interface DashConfiguration {
  ManifestEndpointPrefix?: string;
  DualStackManifestEndpointPrefix?: string;
  MpdLocation?: string;
  OriginManifestType?: OriginManifestType;
}
export interface HlsConfiguration {
  ManifestEndpointPrefix?: string;
  DualStackManifestEndpointPrefix?: string;
}
export type InsertionMode = "STITCHED_ONLY" | "PLAYER_SELECT" | (string & {});
export type PreRollAdSequencingMode =
  | "FOLLOW_AD_SEQUENCE"
  | "IGNORE_AD_SEQUENCE"
  | (string & {});
export interface PreRollVastResponse {
  AdSequencingMode?: PreRollAdSequencingMode;
}
export interface PreRollAdDecisionServerConfiguration {
  VastResponse?: PreRollVastResponse;
}
export interface LivePreRollConfiguration {
  AdDecisionServerUrl?: string;
  MaxDurationSeconds?: number;
  AdDecisionServerConfiguration?: PreRollAdDecisionServerConfiguration;
}
export interface LogConfiguration {
  PercentEnabled: number;
  EnabledLoggingStrategies?: LoggingStrategy[];
  AdsInteractionLog?: AdsInteractionLog;
  ManifestServiceInteractionLog?: ManifestServiceInteractionLog;
}
export interface AdMarkerPassthrough {
  Enabled?: boolean;
}
export interface ManifestProcessingRules {
  AdMarkerPassthrough?: AdMarkerPassthrough;
}
export type __integerMin1 = number;
export type StreamingMediaFileConditioning =
  | "TRANSCODE"
  | "NONE"
  | (string & {});
export interface AdConditioningConfiguration {
  StreamingMediaFileConditioning: StreamingMediaFileConditioning;
}
export type Method = "GET" | "POST" | (string & {});
export type StringMap = { [key: string]: string | undefined };
export type CompressionMethod = "NONE" | "GZIP" | (string & {});
export interface HttpRequest {
  Method?: Method;
  Body?: string;
  Headers?: { [key: string]: string | undefined };
  CompressRequest?: CompressionMethod;
}
export type AdSequencingMode =
  | "FOLLOW_AD_SEQUENCE"
  | "IGNORE_AD_SEQUENCE"
  | "FOLLOW_AD_SEQUENCE_ONLY_LIVE"
  | "FOLLOW_AD_SEQUENCE_ONLY_VOD"
  | (string & {});
export interface VastResponse {
  AdSequencingMode?: AdSequencingMode;
}
export interface AdDecisionServerConfiguration {
  HttpRequest?: HttpRequest;
  VastResponse?: VastResponse;
}
export type EventName =
  | "PRE_SESSION_INITIALIZATION"
  | "PRE_ADS_REQUEST"
  | (string & {});
export type FunctionMapping = { [key in EventName]?: string };
export interface AdsPersonalizationTimeouts {
  AdsRequestTimeoutMilliseconds?: number;
  LiveMaximumAdsPersonalizationTimeMilliseconds?: number;
  VodMaximumAdsPersonalizationTimeMilliseconds?: number;
  PrefetchAdsRequestTimeoutMilliseconds?: number;
  PrefetchMaximumAdsPersonalizationTimeMilliseconds?: number;
}
export interface AdsPersonalizationConcurrency {
  MaxConcurrentAdsRequests?: number;
  EnableVodVastParallelization?: boolean;
}
export interface GetPlaybackConfigurationResponse {
  AdDecisionServerUrl?: string;
  AvailSuppression?: AvailSuppression;
  Bumper?: Bumper;
  CdnConfiguration?: CdnConfiguration;
  ConfigurationAliases?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  DashConfiguration?: DashConfiguration;
  HlsConfiguration?: HlsConfiguration;
  InsertionMode?: InsertionMode;
  LivePreRollConfiguration?: LivePreRollConfiguration;
  LogConfiguration?: LogConfiguration & {
    EnabledLoggingStrategies: __listOfLoggingStrategies;
  };
  ManifestProcessingRules?: ManifestProcessingRules;
  Name?: string;
  PersonalizationThresholdSeconds?: number;
  PlaybackConfigurationArn?: string;
  PlaybackEndpointPrefix?: string;
  DualStackPlaybackEndpointPrefix?: string;
  SessionInitializationEndpointPrefix?: string;
  DualStackSessionInitializationEndpointPrefix?: string;
  SlateAdUrl?: string;
  Tags?: { [key: string]: string | undefined };
  TranscodeProfileName?: string;
  VideoContentSourceUrl?: string;
  AdConditioningConfiguration?: AdConditioningConfiguration;
  AdDecisionServerConfiguration?: AdDecisionServerConfiguration;
  FunctionMapping?: { [key: string]: string | undefined };
  AdsPersonalizationTimeouts?: AdsPersonalizationTimeouts;
  AdsPersonalizationConcurrency?: AdsPersonalizationConcurrency;
}
export interface GetPrefetchScheduleRequest {
  Name: string;
  PlaybackConfigurationName: string;
}
export interface GetPrefetchScheduleResponse {
  Arn?: string;
  Consumption?: PrefetchConsumption;
  Name?: string;
  PlaybackConfigurationName?: string;
  Retrieval?: PrefetchRetrieval;
  ScheduleType?: PrefetchScheduleType;
  RecurringPrefetchConfiguration?: RecurringPrefetchConfiguration;
  StreamId?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface ListAlertsRequest {
  MaxResults?: number;
  NextToken?: string;
  ResourceArn: string;
}
export type __listOf__string = string[];
export type AlertCategory =
  | "SCHEDULING_ERROR"
  | "PLAYBACK_WARNING"
  | "INFO"
  | (string & {});
export interface Alert {
  AlertCode: string;
  AlertMessage: string;
  LastModifiedTime: Date;
  RelatedResourceArns: string[];
  ResourceArn: string;
  Category?: AlertCategory;
}
export type __listOfAlert = Alert[];
export interface ListAlertsResponse {
  Items?: Alert[];
  NextToken?: string;
}
export interface ListChannelsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface Channel {
  Arn: string;
  ChannelName: string;
  ChannelState: string;
  CreationTime?: Date;
  FillerSlate?: SlateSource;
  LastModifiedTime?: Date;
  Outputs: ResponseOutputItem[];
  PlaybackMode: string;
  Tags?: { [key: string]: string | undefined };
  Tier: string;
  LogConfiguration: LogConfigurationForChannel;
  Audiences?: string[];
}
export type __listOfChannel = Channel[];
export interface ListChannelsResponse {
  Items?: Channel[];
  NextToken?: string;
}
export interface ListFunctionsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface Function {
  FunctionId: string;
  FunctionType: FunctionType;
  Description?: string;
  HttpRequestConfiguration?: HttpRequestConfiguration;
  CustomOutputConfiguration?: CustomOutputConfiguration;
  ConcurrentExecutorConfiguration?: ConcurrentExecutorConfiguration;
  SequentialExecutorConfiguration?: SequentialExecutorConfiguration;
  Tags?: { [key: string]: string | undefined };
  Arn?: string;
}
export type __listOfFunctionsResponse = Function[];
export interface ListFunctionsResponse {
  Items?: Function[];
  NextToken?: string;
}
export interface ListLiveSourcesRequest {
  MaxResults?: number;
  NextToken?: string;
  SourceLocationName: string;
}
export interface LiveSource {
  Arn: string;
  CreationTime?: Date;
  HttpPackageConfigurations: HttpPackageConfiguration[];
  LastModifiedTime?: Date;
  LiveSourceName: string;
  SourceLocationName: string;
  Tags?: { [key: string]: string | undefined };
}
export type __listOfLiveSource = LiveSource[];
export interface ListLiveSourcesResponse {
  Items?: LiveSource[];
  NextToken?: string;
}
export interface ListPlaybackConfigurationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface PlaybackConfiguration {
  AdDecisionServerUrl?: string;
  AvailSuppression?: AvailSuppression;
  Bumper?: Bumper;
  CdnConfiguration?: CdnConfiguration;
  ConfigurationAliases?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  DashConfiguration?: DashConfiguration;
  HlsConfiguration?: HlsConfiguration;
  InsertionMode?: InsertionMode;
  LivePreRollConfiguration?: LivePreRollConfiguration;
  LogConfiguration?: LogConfiguration;
  ManifestProcessingRules?: ManifestProcessingRules;
  Name?: string;
  PersonalizationThresholdSeconds?: number;
  PlaybackConfigurationArn?: string;
  PlaybackEndpointPrefix?: string;
  DualStackPlaybackEndpointPrefix?: string;
  SessionInitializationEndpointPrefix?: string;
  DualStackSessionInitializationEndpointPrefix?: string;
  SlateAdUrl?: string;
  Tags?: { [key: string]: string | undefined };
  TranscodeProfileName?: string;
  VideoContentSourceUrl?: string;
  AdConditioningConfiguration?: AdConditioningConfiguration;
  AdDecisionServerConfiguration?: AdDecisionServerConfiguration;
  FunctionMapping?: { [key: string]: string | undefined };
  AdsPersonalizationTimeouts?: AdsPersonalizationTimeouts;
  AdsPersonalizationConcurrency?: AdsPersonalizationConcurrency;
}
export type __listOfPlaybackConfiguration = PlaybackConfiguration[];
export interface ListPlaybackConfigurationsResponse {
  Items?: (PlaybackConfiguration & {
    LogConfiguration: LogConfiguration & {
      EnabledLoggingStrategies: __listOfLoggingStrategies;
    };
  })[];
  NextToken?: string;
}
export type __integerMin1Max100 = number;
export type ListPrefetchScheduleType =
  | "SINGLE"
  | "RECURRING"
  | "ALL"
  | (string & {});
export interface ListPrefetchSchedulesRequest {
  MaxResults?: number;
  NextToken?: string;
  PlaybackConfigurationName: string;
  ScheduleType?: ListPrefetchScheduleType;
  StreamId?: string;
}
export interface PrefetchSchedule {
  Arn: string;
  Consumption?: PrefetchConsumption;
  Name: string;
  PlaybackConfigurationName: string;
  Retrieval?: PrefetchRetrieval;
  ScheduleType?: PrefetchScheduleType;
  RecurringPrefetchConfiguration?: RecurringPrefetchConfiguration;
  StreamId?: string;
  Tags?: { [key: string]: string | undefined };
}
export type __listOfPrefetchSchedule = PrefetchSchedule[];
export interface ListPrefetchSchedulesResponse {
  Items?: PrefetchSchedule[];
  NextToken?: string;
}
export interface ListSourceLocationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface SourceLocation {
  AccessConfiguration?: AccessConfiguration;
  Arn: string;
  CreationTime?: Date;
  DefaultSegmentDeliveryConfiguration?: DefaultSegmentDeliveryConfiguration;
  HttpConfiguration: HttpConfiguration;
  LastModifiedTime?: Date;
  SegmentDeliveryConfigurations?: SegmentDeliveryConfiguration[];
  SourceLocationName: string;
  Tags?: { [key: string]: string | undefined };
}
export type __listOfSourceLocation = SourceLocation[];
export interface ListSourceLocationsResponse {
  Items?: SourceLocation[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface ListVodSourcesRequest {
  MaxResults?: number;
  NextToken?: string;
  SourceLocationName: string;
}
export interface VodSource {
  Arn: string;
  CreationTime?: Date;
  HttpPackageConfigurations: HttpPackageConfiguration[];
  LastModifiedTime?: Date;
  SourceLocationName: string;
  Tags?: { [key: string]: string | undefined };
  VodSourceName: string;
}
export type __listOfVodSource = VodSource[];
export interface ListVodSourcesResponse {
  Items?: VodSource[];
  NextToken?: string;
}
export interface PutChannelPolicyRequest {
  ChannelName: string;
  Policy: string;
}
export interface PutChannelPolicyResponse {}
export interface PutFunctionRequest {
  FunctionId: string;
  FunctionType: FunctionType;
  Description?: string;
  HttpRequestConfiguration?: HttpRequestConfiguration;
  CustomOutputConfiguration?: CustomOutputConfiguration;
  ConcurrentExecutorConfiguration?: ConcurrentExecutorConfiguration;
  SequentialExecutorConfiguration?: SequentialExecutorConfiguration;
  Tags?: { [key: string]: string | undefined };
}
export interface PutFunctionResponse {
  FunctionId: string;
  FunctionType: FunctionType;
  Description?: string;
  HttpRequestConfiguration?: HttpRequestConfiguration;
  CustomOutputConfiguration?: CustomOutputConfiguration;
  ConcurrentExecutorConfiguration?: ConcurrentExecutorConfiguration;
  SequentialExecutorConfiguration?: SequentialExecutorConfiguration;
  Tags?: { [key: string]: string | undefined };
  Arn?: string;
}
export type ConfigurationAliasesRequest = {
  [key: string]: { [key: string]: string | undefined } | undefined;
};
export interface DashConfigurationForPut {
  MpdLocation?: string;
  OriginManifestType?: OriginManifestType;
}
export interface PutPlaybackConfigurationRequest {
  AdDecisionServerUrl?: string;
  AvailSuppression?: AvailSuppression;
  Bumper?: Bumper;
  CdnConfiguration?: CdnConfiguration;
  ConfigurationAliases?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  DashConfiguration?: DashConfigurationForPut;
  InsertionMode?: InsertionMode;
  LivePreRollConfiguration?: LivePreRollConfiguration;
  ManifestProcessingRules?: ManifestProcessingRules;
  Name: string;
  PersonalizationThresholdSeconds?: number;
  SlateAdUrl?: string;
  Tags?: { [key: string]: string | undefined };
  TranscodeProfileName?: string;
  VideoContentSourceUrl?: string;
  AdConditioningConfiguration?: AdConditioningConfiguration;
  AdDecisionServerConfiguration?: AdDecisionServerConfiguration;
  FunctionMapping?: { [key: string]: string | undefined };
  AdsPersonalizationTimeouts?: AdsPersonalizationTimeouts;
  AdsPersonalizationConcurrency?: AdsPersonalizationConcurrency;
}
export interface PutPlaybackConfigurationResponse {
  AdDecisionServerUrl?: string;
  AvailSuppression?: AvailSuppression;
  Bumper?: Bumper;
  CdnConfiguration?: CdnConfiguration;
  ConfigurationAliases?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  DashConfiguration?: DashConfiguration;
  HlsConfiguration?: HlsConfiguration;
  InsertionMode?: InsertionMode;
  LivePreRollConfiguration?: LivePreRollConfiguration;
  LogConfiguration?: LogConfiguration & {
    EnabledLoggingStrategies: __listOfLoggingStrategies;
  };
  ManifestProcessingRules?: ManifestProcessingRules;
  Name?: string;
  PersonalizationThresholdSeconds?: number;
  PlaybackConfigurationArn?: string;
  PlaybackEndpointPrefix?: string;
  DualStackPlaybackEndpointPrefix?: string;
  SessionInitializationEndpointPrefix?: string;
  DualStackSessionInitializationEndpointPrefix?: string;
  SlateAdUrl?: string;
  Tags?: { [key: string]: string | undefined };
  TranscodeProfileName?: string;
  VideoContentSourceUrl?: string;
  AdConditioningConfiguration?: AdConditioningConfiguration;
  AdDecisionServerConfiguration?: AdDecisionServerConfiguration;
  FunctionMapping?: { [key: string]: string | undefined };
  AdsPersonalizationTimeouts?: AdsPersonalizationTimeouts;
  AdsPersonalizationConcurrency?: AdsPersonalizationConcurrency;
}
export interface StartChannelRequest {
  ChannelName: string;
}
export interface StartChannelResponse {}
export interface StopChannelRequest {
  ChannelName: string;
}
export interface StopChannelResponse {}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateChannelRequest {
  ChannelName: string;
  FillerSlate?: SlateSource;
  Outputs: RequestOutputItem[];
  TimeShiftConfiguration?: TimeShiftConfiguration;
  Audiences?: string[];
}
export interface UpdateChannelResponse {
  Arn?: string;
  ChannelName?: string;
  ChannelState?: ChannelState;
  CreationTime?: Date;
  FillerSlate?: SlateSource;
  LastModifiedTime?: Date;
  Outputs?: ResponseOutputItem[];
  PlaybackMode?: string;
  Tags?: { [key: string]: string | undefined };
  Tier?: string;
  TimeShiftConfiguration?: TimeShiftConfiguration;
  Audiences?: string[];
}
export interface UpdateLiveSourceRequest {
  HttpPackageConfigurations: HttpPackageConfiguration[];
  LiveSourceName: string;
  SourceLocationName: string;
}
export interface UpdateLiveSourceResponse {
  Arn?: string;
  CreationTime?: Date;
  HttpPackageConfigurations?: HttpPackageConfiguration[];
  LastModifiedTime?: Date;
  LiveSourceName?: string;
  SourceLocationName?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface UpdateProgramTransition {
  ScheduledStartTimeMillis?: number;
  DurationMillis?: number;
}
export interface UpdateProgramScheduleConfiguration {
  Transition?: UpdateProgramTransition;
  ClipRange?: ClipRange;
}
export interface UpdateProgramRequest {
  AdBreaks?: AdBreak[];
  ChannelName: string;
  ProgramName: string;
  ScheduleConfiguration: UpdateProgramScheduleConfiguration;
  AudienceMedia?: AudienceMedia[];
}
export interface UpdateProgramResponse {
  AdBreaks?: AdBreak[];
  Arn?: string;
  ChannelName?: string;
  CreationTime?: Date;
  ProgramName?: string;
  SourceLocationName?: string;
  VodSourceName?: string;
  LiveSourceName?: string;
  ClipRange?: ClipRange;
  DurationMillis?: number;
  ScheduledStartTime?: Date;
  AudienceMedia?: AudienceMedia[];
  Tags?: { [key: string]: string | undefined };
}
export interface UpdateSourceLocationRequest {
  AccessConfiguration?: AccessConfiguration;
  DefaultSegmentDeliveryConfiguration?: DefaultSegmentDeliveryConfiguration;
  HttpConfiguration: HttpConfiguration;
  SegmentDeliveryConfigurations?: SegmentDeliveryConfiguration[];
  SourceLocationName: string;
}
export interface UpdateSourceLocationResponse {
  AccessConfiguration?: AccessConfiguration;
  Arn?: string;
  CreationTime?: Date;
  DefaultSegmentDeliveryConfiguration?: DefaultSegmentDeliveryConfiguration;
  HttpConfiguration?: HttpConfiguration;
  LastModifiedTime?: Date;
  SegmentDeliveryConfigurations?: SegmentDeliveryConfiguration[];
  SourceLocationName?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface UpdateVodSourceRequest {
  HttpPackageConfigurations: HttpPackageConfiguration[];
  SourceLocationName: string;
  VodSourceName: string;
}
export interface UpdateVodSourceResponse {
  Arn?: string;
  CreationTime?: Date;
  HttpPackageConfigurations?: HttpPackageConfiguration[];
  LastModifiedTime?: Date;
  SourceLocationName?: string;
  Tags?: { [key: string]: string | undefined };
  VodSourceName?: string;
}
export type ConfigureLogsForChannelError = CommonErrors;
/**
 * Configures Amazon CloudWatch log settings for a channel.
 */
export const configureLogsForChannel: API.OperationMethod<
  ConfigureLogsForChannelRequest,
  ConfigureLogsForChannelResponse,
  ConfigureLogsForChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /configureLogs/channel",
    input: { ChannelName: 0, LogTypes: 0 },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfigureLogsForChannel",
})) as any;

export type ConfigureLogsForPlaybackConfigurationError = CommonErrors;
/**
 * Defines where AWS Elemental MediaTailor sends logs for the playback configuration.
 */
export const configureLogsForPlaybackConfiguration: API.OperationMethod<
  ConfigureLogsForPlaybackConfigurationRequest,
  ConfigureLogsForPlaybackConfigurationResponse,
  ConfigureLogsForPlaybackConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /configureLogs/playbackConfiguration",
    input: {
      PercentEnabled: 0,
      PlaybackConfigurationName: 0,
      EnabledLoggingStrategies: 0,
      AdsInteractionLog: { PublishOptInEventTypes: 0, ExcludeEventTypes: 0 },
      ManifestServiceInteractionLog: {
        PublishOptInEventTypes: 0,
        ExcludeEventTypes: 0,
      },
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfigureLogsForPlaybackConfiguration",
})) as any;

export type CreateChannelError = CommonErrors;
/**
 * Creates a channel. For information about MediaTailor channels, see Working with channels in the *MediaTailor User Guide*.
 */
export const createChannel: API.OperationMethod<
  CreateChannelRequest,
  CreateChannelResponse,
  CreateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /channel/{ChannelName}",
    input: {
      ChannelName: 0,
      FillerSlate: i_SlateSource,
      Outputs: D.list(i_RequestOutputItem),
      PlaybackMode: 0,
      Tags: D.m({ wire: "tags" }),
      Tier: 0,
      TimeShiftConfiguration: i_TimeShiftConfiguration,
      Audiences: 0,
    },
    output: {
      CreationTime: D.ts,
      LastModifiedTime: D.ts,
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChannel",
})) as any;

export type CreateLiveSourceError = CommonErrors;
/**
 * The live source configuration.
 */
export const createLiveSource: API.OperationMethod<
  CreateLiveSourceRequest,
  CreateLiveSourceResponse,
  CreateLiveSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sourceLocation/{SourceLocationName}/liveSource/{LiveSourceName}",
    input: {
      HttpPackageConfigurations: D.list(i_HttpPackageConfiguration),
      LiveSourceName: 0,
      SourceLocationName: 0,
      Tags: D.m({ wire: "tags" }),
    },
    output: {
      CreationTime: D.ts,
      LastModifiedTime: D.ts,
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLiveSource",
})) as any;

export type CreatePrefetchScheduleError =
  | BadRequestException
  | PlaybackConfigurationNotFound
  | CommonErrors;
/**
 * Creates a prefetch schedule for a playback configuration. A prefetch schedule allows you to tell MediaTailor to fetch and prepare certain ads before an ad break happens. For more information about ad prefetching, see Using ad prefetching in the *MediaTailor User Guide*.
 */
export const createPrefetchSchedule: API.OperationMethod<
  CreatePrefetchScheduleRequest,
  CreatePrefetchScheduleResponse,
  CreatePrefetchScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /prefetchSchedule/{PlaybackConfigurationName}/{Name}",
    input: {
      Consumption: {
        AvailMatchingCriteria: D.list(i_AvailMatchingCriteria),
        EndTime: 0,
        StartTime: 0,
      },
      Name: 0,
      PlaybackConfigurationName: 0,
      Retrieval: {
        DynamicVariables: 0,
        EndTime: 0,
        StartTime: 0,
        TrafficShapingType: 0,
        TrafficShapingRetrievalWindow: i_TrafficShapingRetrievalWindow,
        TrafficShapingTpsConfiguration: i_TrafficShapingTpsConfiguration,
      },
      RecurringPrefetchConfiguration: {
        StartTime: 0,
        EndTime: 0,
        RecurringConsumption: {
          RetrievedAdExpirationSeconds: 0,
          AvailMatchingCriteria: D.list(i_AvailMatchingCriteria),
        },
        RecurringRetrieval: {
          DynamicVariables: 0,
          DelayAfterAvailEndSeconds: 0,
          TrafficShapingType: 0,
          TrafficShapingRetrievalWindow: i_TrafficShapingRetrievalWindow,
          TrafficShapingTpsConfiguration: i_TrafficShapingTpsConfiguration,
        },
      },
      ScheduleType: 0,
      StreamId: 0,
      Tags: D.m({ wire: "tags" }),
    },
    output: {
      Consumption: o_PrefetchConsumption,
      Retrieval: o_PrefetchRetrieval,
      RecurringPrefetchConfiguration: o_RecurringPrefetchConfiguration,
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
  errors: [BadRequestException, PlaybackConfigurationNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePrefetchSchedule",
})) as any;

export type CreateProgramError =
  | BadRequestException
  | ChannelNotFound
  | CommonErrors;
/**
 * Creates a program within a channel. For information about programs, see Working with programs in the *MediaTailor User Guide*.
 */
export const createProgram: API.OperationMethod<
  CreateProgramRequest,
  CreateProgramResponse,
  CreateProgramError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /channel/{ChannelName}/program/{ProgramName}",
    input: {
      AdBreaks: D.list(i_AdBreak),
      ChannelName: 0,
      LiveSourceName: 0,
      ProgramName: 0,
      ScheduleConfiguration: {
        Transition: {
          DurationMillis: 0,
          RelativePosition: 0,
          RelativeProgram: 0,
          ScheduledStartTimeMillis: 0,
          Type: 0,
        },
        ClipRange: i_ClipRange,
      },
      SourceLocationName: 0,
      VodSourceName: 0,
      AudienceMedia: D.list(i_AudienceMedia),
      Tags: D.m({ wire: "tags" }),
    },
    output: {
      CreationTime: D.ts,
      ScheduledStartTime: D.ts,
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
  errors: [BadRequestException, ChannelNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProgram",
})) as any;

export type CreateSourceLocationError = CommonErrors;
/**
 * Creates a source location. A source location is a container for sources. For more information about source locations, see Working with source locations in the *MediaTailor User Guide*.
 */
export const createSourceLocation: API.OperationMethod<
  CreateSourceLocationRequest,
  CreateSourceLocationResponse,
  CreateSourceLocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sourceLocation/{SourceLocationName}",
    input: {
      AccessConfiguration: i_AccessConfiguration,
      DefaultSegmentDeliveryConfiguration:
        i_DefaultSegmentDeliveryConfiguration,
      HttpConfiguration: i_HttpConfiguration,
      SegmentDeliveryConfigurations: D.list(i_SegmentDeliveryConfiguration),
      SourceLocationName: 0,
      Tags: D.m({ wire: "tags" }),
    },
    output: {
      CreationTime: D.ts,
      LastModifiedTime: D.ts,
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSourceLocation",
})) as any;

export type CreateVodSourceError = CommonErrors;
/**
 * The VOD source configuration parameters.
 */
export const createVodSource: API.OperationMethod<
  CreateVodSourceRequest,
  CreateVodSourceResponse,
  CreateVodSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sourceLocation/{SourceLocationName}/vodSource/{VodSourceName}",
    input: {
      HttpPackageConfigurations: D.list(i_HttpPackageConfiguration),
      SourceLocationName: 0,
      Tags: D.m({ wire: "tags" }),
      VodSourceName: 0,
    },
    output: {
      CreationTime: D.ts,
      LastModifiedTime: D.ts,
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVodSource",
})) as any;

export type DeleteChannelError = CommonErrors;
/**
 * Deletes a channel. For information about MediaTailor channels, see Working with channels in the *MediaTailor User Guide*.
 */
export const deleteChannel: API.OperationMethod<
  DeleteChannelRequest,
  DeleteChannelResponse,
  DeleteChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /channel/{ChannelName}",
    input: { ChannelName: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChannel",
})) as any;

export type DeleteChannelPolicyError = CommonErrors;
/**
 * The channel policy to delete.
 */
export const deleteChannelPolicy: API.OperationMethod<
  DeleteChannelPolicyRequest,
  DeleteChannelPolicyResponse,
  DeleteChannelPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /channel/{ChannelName}/policy",
    input: { ChannelName: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChannelPolicy",
})) as any;

export type DeleteFunctionError = CommonErrors;
/**
 * Deletes a function. MediaTailor prevents deletion of a function that is still referenced by a playback configuration or by another function. Remove all references before deleting. For more information about functions, see Working with functions in the *MediaTailor User Guide*.
 */
export const deleteFunction: API.OperationMethod<
  DeleteFunctionRequest,
  DeleteFunctionResponse,
  DeleteFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /function/{FunctionId}",
    input: { FunctionId: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFunction",
})) as any;

export type DeleteLiveSourceError = CommonErrors;
/**
 * The live source to delete.
 */
export const deleteLiveSource: API.OperationMethod<
  DeleteLiveSourceRequest,
  DeleteLiveSourceResponse,
  DeleteLiveSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /sourceLocation/{SourceLocationName}/liveSource/{LiveSourceName}",
    input: { LiveSourceName: 0, SourceLocationName: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLiveSource",
})) as any;

export type DeletePlaybackConfigurationError = CommonErrors;
/**
 * Deletes a playback configuration. For information about MediaTailor configurations, see Working with configurations in AWS Elemental MediaTailor.
 */
export const deletePlaybackConfiguration: API.OperationMethod<
  DeletePlaybackConfigurationRequest,
  DeletePlaybackConfigurationResponse,
  DeletePlaybackConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /playbackConfiguration/{Name}",
    input: { Name: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePlaybackConfiguration",
})) as any;

export type DeletePrefetchScheduleError =
  | BadRequestException
  | PrefetchScheduleNotFound
  | CommonErrors;
/**
 * Deletes a prefetch schedule for a specific playback configuration. If you call `DeletePrefetchSchedule` on an expired prefetch schedule, MediaTailor returns an HTTP 404 status code. For more information about ad prefetching, see Using ad prefetching in the *MediaTailor User Guide*.
 */
export const deletePrefetchSchedule: API.OperationMethod<
  DeletePrefetchScheduleRequest,
  DeletePrefetchScheduleResponse,
  DeletePrefetchScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /prefetchSchedule/{PlaybackConfigurationName}/{Name}",
    input: { Name: 0, PlaybackConfigurationName: 0 },
  },
  errors: [BadRequestException, PrefetchScheduleNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePrefetchSchedule",
})) as any;

export type DeleteProgramError =
  | BadRequestException
  | ProgramNotFound
  | CommonErrors;
/**
 * Deletes a program within a channel. For information about programs, see Working with programs in the *MediaTailor User Guide*.
 */
export const deleteProgram: API.OperationMethod<
  DeleteProgramRequest,
  DeleteProgramResponse,
  DeleteProgramError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /channel/{ChannelName}/program/{ProgramName}",
    input: { ChannelName: 0, ProgramName: 0 },
  },
  errors: [BadRequestException, ProgramNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProgram",
})) as any;

export type DeleteSourceLocationError = CommonErrors;
/**
 * Deletes a source location. A source location is a container for sources. For more information about source locations, see Working with source locations in the *MediaTailor User Guide*.
 */
export const deleteSourceLocation: API.OperationMethod<
  DeleteSourceLocationRequest,
  DeleteSourceLocationResponse,
  DeleteSourceLocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /sourceLocation/{SourceLocationName}",
    input: { SourceLocationName: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSourceLocation",
})) as any;

export type DeleteVodSourceError = CommonErrors;
/**
 * The video on demand (VOD) source to delete.
 */
export const deleteVodSource: API.OperationMethod<
  DeleteVodSourceRequest,
  DeleteVodSourceResponse,
  DeleteVodSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /sourceLocation/{SourceLocationName}/vodSource/{VodSourceName}",
    input: { SourceLocationName: 0, VodSourceName: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVodSource",
})) as any;

export type DescribeChannelError = CommonErrors;
/**
 * Describes a channel. For information about MediaTailor channels, see Working with channels in the *MediaTailor User Guide*.
 */
export const describeChannel: API.OperationMethod<
  DescribeChannelRequest,
  DescribeChannelResponse,
  DescribeChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /channel/{ChannelName}",
    input: { ChannelName: 0 },
    output: {
      CreationTime: D.ts,
      LastModifiedTime: D.ts,
      Tags: D.m({ wire: "tags" }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeChannel",
})) as any;

export type DescribeLiveSourceError = CommonErrors;
/**
 * The live source to describe.
 */
export const describeLiveSource: API.OperationMethod<
  DescribeLiveSourceRequest,
  DescribeLiveSourceResponse,
  DescribeLiveSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sourceLocation/{SourceLocationName}/liveSource/{LiveSourceName}",
    input: { LiveSourceName: 0, SourceLocationName: 0 },
    output: {
      CreationTime: D.ts,
      LastModifiedTime: D.ts,
      Tags: D.m({ wire: "tags" }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLiveSource",
})) as any;

export type DescribeProgramError =
  | BadRequestException
  | ProgramNotFound
  | CommonErrors;
/**
 * Describes a program within a channel. For information about programs, see Working with programs in the *MediaTailor User Guide*.
 */
export const describeProgram: API.OperationMethod<
  DescribeProgramRequest,
  DescribeProgramResponse,
  DescribeProgramError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /channel/{ChannelName}/program/{ProgramName}",
    input: { ChannelName: 0, ProgramName: 0 },
    output: {
      CreationTime: D.ts,
      ScheduledStartTime: D.ts,
      Tags: D.m({ wire: "tags" }),
    },
  },
  errors: [BadRequestException, ProgramNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProgram",
})) as any;

export type DescribeSourceLocationError = CommonErrors;
/**
 * Describes a source location. A source location is a container for sources. For more information about source locations, see Working with source locations in the *MediaTailor User Guide*.
 */
export const describeSourceLocation: API.OperationMethod<
  DescribeSourceLocationRequest,
  DescribeSourceLocationResponse,
  DescribeSourceLocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sourceLocation/{SourceLocationName}",
    input: { SourceLocationName: 0 },
    output: {
      CreationTime: D.ts,
      LastModifiedTime: D.ts,
      Tags: D.m({ wire: "tags" }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSourceLocation",
})) as any;

export type DescribeVodSourceError = CommonErrors;
/**
 * Provides details about a specific video on demand (VOD) source in a specific source location.
 */
export const describeVodSource: API.OperationMethod<
  DescribeVodSourceRequest,
  DescribeVodSourceResponse,
  DescribeVodSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sourceLocation/{SourceLocationName}/vodSource/{VodSourceName}",
    input: { SourceLocationName: 0, VodSourceName: 0 },
    output: {
      CreationTime: D.ts,
      LastModifiedTime: D.ts,
      Tags: D.m({ wire: "tags" }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVodSource",
})) as any;

export type GetChannelPolicyError = CommonErrors;
/**
 * Returns the channel's IAM policy. IAM policies are used to control access to your channel.
 */
export const getChannelPolicy: API.OperationMethod<
  GetChannelPolicyRequest,
  GetChannelPolicyResponse,
  GetChannelPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /channel/{ChannelName}/policy",
    input: { ChannelName: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChannelPolicy",
})) as any;

export type GetChannelScheduleError =
  | BadRequestException
  | ChannelNotFound
  | CommonErrors;
/**
 * Retrieves information about your channel's schedule.
 */
export const getChannelSchedule: API.PaginatedOperationMethod<
  GetChannelScheduleRequest,
  GetChannelScheduleResponse,
  GetChannelScheduleError,
  Credentials | HttpClient.HttpClient,
  ScheduleEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /channel/{ChannelName}/schedule",
    input: {
      ChannelName: 0,
      DurationMinutes: D.m({ query: "durationMinutes" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      Audience: D.m({ query: "audience" }),
    },
    output: {
      Items: D.list({
        ApproximateStartTime: D.ts,
        ScheduleAdBreaks: D.list({ ApproximateStartTime: D.ts }),
      }),
    },
  },
  errors: [BadRequestException, ChannelNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChannelSchedule",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetFunctionError = CommonErrors;
/**
 * Retrieves the configuration and metadata for a function. For more information about functions, see Working with functions in the *MediaTailor User Guide*.
 */
export const getFunction: API.OperationMethod<
  GetFunctionRequest,
  GetFunctionResponse,
  GetFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /function/{FunctionId}",
    input: { FunctionId: 0 },
    output: { Tags: D.m({ wire: "tags" }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunction",
})) as any;

export type GetPlaybackConfigurationError =
  | PlaybackConfigurationNotFound
  | CommonErrors;
/**
 * Retrieves a playback configuration. For information about MediaTailor configurations, see Working with configurations in AWS Elemental MediaTailor.
 */
export const getPlaybackConfiguration: API.OperationMethod<
  GetPlaybackConfigurationRequest,
  GetPlaybackConfigurationResponse,
  GetPlaybackConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /playbackConfiguration/{Name}",
    input: { Name: 0 },
    output: { Tags: D.m({ wire: "tags" }) },
  },
  errors: [PlaybackConfigurationNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPlaybackConfiguration",
})) as any;

export type GetPrefetchScheduleError =
  | BadRequestException
  | PrefetchScheduleNotFound
  | CommonErrors;
/**
 * Retrieves a prefetch schedule for a playback configuration. A prefetch schedule allows you to tell MediaTailor to fetch and prepare certain ads before an ad break happens. For more information about ad prefetching, see Using ad prefetching in the *MediaTailor User Guide*.
 */
export const getPrefetchSchedule: API.OperationMethod<
  GetPrefetchScheduleRequest,
  GetPrefetchScheduleResponse,
  GetPrefetchScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /prefetchSchedule/{PlaybackConfigurationName}/{Name}",
    input: { Name: 0, PlaybackConfigurationName: 0 },
    output: {
      Consumption: o_PrefetchConsumption,
      Retrieval: o_PrefetchRetrieval,
      RecurringPrefetchConfiguration: o_RecurringPrefetchConfiguration,
      Tags: D.m({ wire: "tags" }),
    },
  },
  errors: [BadRequestException, PrefetchScheduleNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPrefetchSchedule",
})) as any;

export type ListAlertsError = BadRequestException | CommonErrors;
/**
 * Lists the alerts that are associated with a MediaTailor channel assembly resource.
 */
export const listAlerts: API.PaginatedOperationMethod<
  ListAlertsRequest,
  ListAlertsResponse,
  ListAlertsError,
  Credentials | HttpClient.HttpClient,
  Alert
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /alerts",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      ResourceArn: D.m({ query: "resourceArn" }),
    },
    output: { Items: D.list({ LastModifiedTime: D.ts }) },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAlerts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListChannelsError = CommonErrors;
/**
 * Retrieves information about the channels that are associated with the current AWS account.
 */
export const listChannels: API.PaginatedOperationMethod<
  ListChannelsRequest,
  ListChannelsResponse,
  ListChannelsError,
  Credentials | HttpClient.HttpClient,
  Channel
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /channels",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Items: D.list({
        CreationTime: D.ts,
        LastModifiedTime: D.ts,
        Tags: D.m({ wire: "tags" }),
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChannels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFunctionsError = CommonErrors;
/**
 * Retrieves all functions associated with your AWS account in the current Region. For more information about functions, see Working with functions in the *MediaTailor User Guide*.
 */
export const listFunctions: API.PaginatedOperationMethod<
  ListFunctionsRequest,
  ListFunctionsResponse,
  ListFunctionsError,
  Credentials | HttpClient.HttpClient,
  Function
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /functions",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: { Items: D.list({ Tags: D.m({ wire: "tags" }) }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFunctions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLiveSourcesError = CommonErrors;
/**
 * Lists the live sources contained in a source location. A source represents a piece of content.
 */
export const listLiveSources: API.PaginatedOperationMethod<
  ListLiveSourcesRequest,
  ListLiveSourcesResponse,
  ListLiveSourcesError,
  Credentials | HttpClient.HttpClient,
  LiveSource
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /sourceLocation/{SourceLocationName}/liveSources",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      SourceLocationName: 0,
    },
    output: {
      Items: D.list({
        CreationTime: D.ts,
        LastModifiedTime: D.ts,
        Tags: D.m({ wire: "tags" }),
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLiveSources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPlaybackConfigurationsError = CommonErrors;
/**
 * Retrieves existing playback configurations. For information about MediaTailor configurations, see Working with Configurations in AWS Elemental MediaTailor.
 */
export const listPlaybackConfigurations: API.PaginatedOperationMethod<
  ListPlaybackConfigurationsRequest,
  ListPlaybackConfigurationsResponse,
  ListPlaybackConfigurationsError,
  Credentials | HttpClient.HttpClient,
  PlaybackConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /playbackConfigurations",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: { Items: D.list({ Tags: D.m({ wire: "tags" }) }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPlaybackConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPrefetchSchedulesError =
  | BadRequestException
  | PlaybackConfigurationNotFound
  | CommonErrors;
/**
 * Lists the prefetch schedules for a playback configuration.
 */
export const listPrefetchSchedules: API.PaginatedOperationMethod<
  ListPrefetchSchedulesRequest,
  ListPrefetchSchedulesResponse,
  ListPrefetchSchedulesError,
  Credentials | HttpClient.HttpClient,
  PrefetchSchedule
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /prefetchSchedule/{PlaybackConfigurationName}",
    input: {
      MaxResults: 0,
      NextToken: 0,
      PlaybackConfigurationName: 0,
      ScheduleType: 0,
      StreamId: 0,
    },
    output: {
      Items: D.list({
        Consumption: o_PrefetchConsumption,
        Retrieval: o_PrefetchRetrieval,
        RecurringPrefetchConfiguration: o_RecurringPrefetchConfiguration,
        Tags: D.m({ wire: "tags" }),
      }),
    },
    body: true,
  },
  errors: [BadRequestException, PlaybackConfigurationNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPrefetchSchedules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSourceLocationsError = CommonErrors;
/**
 * Lists the source locations for a channel. A source location defines the host server URL, and contains a list of sources.
 */
export const listSourceLocations: API.PaginatedOperationMethod<
  ListSourceLocationsRequest,
  ListSourceLocationsResponse,
  ListSourceLocationsError,
  Credentials | HttpClient.HttpClient,
  SourceLocation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /sourceLocations",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Items: D.list({
        CreationTime: D.ts,
        LastModifiedTime: D.ts,
        Tags: D.m({ wire: "tags" }),
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSourceLocations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = BadRequestException | CommonErrors;
/**
 * A list of tags that are associated with this resource. Tags are key-value pairs that you can associate with Amazon resources to help with organization, access control, and cost tracking. For more information, see Tagging AWS Elemental MediaTailor Resources.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: { ResourceArn: 0 },
    output: { Tags: D.m({ wire: "tags" }) },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListVodSourcesError = CommonErrors;
/**
 * Lists the VOD sources contained in a source location. A source represents a piece of content.
 */
export const listVodSources: API.PaginatedOperationMethod<
  ListVodSourcesRequest,
  ListVodSourcesResponse,
  ListVodSourcesError,
  Credentials | HttpClient.HttpClient,
  VodSource
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /sourceLocation/{SourceLocationName}/vodSources",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      SourceLocationName: 0,
    },
    output: {
      Items: D.list({
        CreationTime: D.ts,
        LastModifiedTime: D.ts,
        Tags: D.m({ wire: "tags" }),
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVodSources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutChannelPolicyError = CommonErrors;
/**
 * Creates an IAM policy for the channel. IAM policies are used to control access to your channel.
 */
export const putChannelPolicy: API.OperationMethod<
  PutChannelPolicyRequest,
  PutChannelPolicyResponse,
  PutChannelPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /channel/{ChannelName}/policy",
    input: { ChannelName: 0, Policy: 0 },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutChannelPolicy",
})) as any;

export type PutFunctionError = CommonErrors;
/**
 * Creates or updates a function. A function defines reusable logic that MediaTailor executes at lifecycle hooks during ad insertion. For more information about functions, see Working with functions in the *MediaTailor User Guide*.
 */
export const putFunction: API.OperationMethod<
  PutFunctionRequest,
  PutFunctionResponse,
  PutFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /function/{FunctionId}",
    input: {
      FunctionId: 0,
      FunctionType: 0,
      Description: 0,
      HttpRequestConfiguration: {
        Runtime: 0,
        Output: 0,
        MethodType: 0,
        RequestTimeoutMilliseconds: 0,
        Url: 0,
        Body: 0,
        Headers: 0,
      },
      CustomOutputConfiguration: { Runtime: 0, Output: 0 },
      ConcurrentExecutorConfiguration: {
        Runtime: 0,
        Output: 0,
        FunctionList: D.list(i_FunctionRef),
        TimeoutMilliseconds: 0,
        MaxConcurrency: 0,
      },
      SequentialExecutorConfiguration: {
        Runtime: 0,
        Output: 0,
        FunctionList: D.list(i_FunctionRef),
        TimeoutMilliseconds: 0,
      },
      Tags: D.m({ wire: "tags" }),
    },
    output: { Tags: D.m({ wire: "tags" }) },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFunction",
})) as any;

export type PutPlaybackConfigurationError = CommonErrors;
/**
 * Creates a playback configuration. For information about MediaTailor configurations, see Working with configurations in AWS Elemental MediaTailor.
 */
export const putPlaybackConfiguration: API.OperationMethod<
  PutPlaybackConfigurationRequest,
  PutPlaybackConfigurationResponse,
  PutPlaybackConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /playbackConfiguration",
    input: {
      AdDecisionServerUrl: 0,
      AvailSuppression: { Mode: 0, Value: 0, FillPolicy: 0 },
      Bumper: { EndUrl: 0, StartUrl: 0 },
      CdnConfiguration: { AdSegmentUrlPrefix: 0, ContentSegmentUrlPrefix: 0 },
      ConfigurationAliases: 0,
      DashConfiguration: { MpdLocation: 0, OriginManifestType: 0 },
      InsertionMode: 0,
      LivePreRollConfiguration: {
        AdDecisionServerUrl: 0,
        MaxDurationSeconds: 0,
        AdDecisionServerConfiguration: {
          VastResponse: { AdSequencingMode: 0 },
        },
      },
      ManifestProcessingRules: { AdMarkerPassthrough: { Enabled: 0 } },
      Name: 0,
      PersonalizationThresholdSeconds: 0,
      SlateAdUrl: 0,
      Tags: D.m({ wire: "tags" }),
      TranscodeProfileName: 0,
      VideoContentSourceUrl: 0,
      AdConditioningConfiguration: { StreamingMediaFileConditioning: 0 },
      AdDecisionServerConfiguration: {
        HttpRequest: { Method: 0, Body: 0, Headers: 0, CompressRequest: 0 },
        VastResponse: { AdSequencingMode: 0 },
      },
      FunctionMapping: 0,
      AdsPersonalizationTimeouts: {
        AdsRequestTimeoutMilliseconds: 0,
        LiveMaximumAdsPersonalizationTimeMilliseconds: 0,
        VodMaximumAdsPersonalizationTimeMilliseconds: 0,
        PrefetchAdsRequestTimeoutMilliseconds: 0,
        PrefetchMaximumAdsPersonalizationTimeMilliseconds: 0,
      },
      AdsPersonalizationConcurrency: {
        MaxConcurrentAdsRequests: 0,
        EnableVodVastParallelization: 0,
      },
    },
    output: { Tags: D.m({ wire: "tags" }) },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutPlaybackConfiguration",
})) as any;

export type StartChannelError =
  | BadRequestException
  | ChannelNotFound
  | CommonErrors;
/**
 * Starts a channel. For information about MediaTailor channels, see Working with channels in the *MediaTailor User Guide*.
 */
export const startChannel: API.OperationMethod<
  StartChannelRequest,
  StartChannelResponse,
  StartChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /channel/{ChannelName}/start",
    input: { ChannelName: 0 },
  },
  errors: [BadRequestException, ChannelNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartChannel",
})) as any;

export type StopChannelError =
  | BadRequestException
  | ChannelNotFound
  | CommonErrors;
/**
 * Stops a channel. For information about MediaTailor channels, see Working with channels in the *MediaTailor User Guide*.
 */
export const stopChannel: API.OperationMethod<
  StopChannelRequest,
  StopChannelResponse,
  StopChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /channel/{ChannelName}/stop",
    input: { ChannelName: 0 },
  },
  errors: [BadRequestException, ChannelNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopChannel",
})) as any;

export type TagResourceError = BadRequestException | CommonErrors;
/**
 * The resource to tag. Tags are key-value pairs that you can associate with Amazon resources to help with organization, access control, and cost tracking. For more information, see Tagging AWS Elemental MediaTailor Resources.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: D.m({ wire: "tags" }) },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError = BadRequestException | CommonErrors;
/**
 * The resource to untag.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateChannelError = CommonErrors;
/**
 * Updates a channel. For information about MediaTailor channels, see Working with channels in the *MediaTailor User Guide*.
 */
export const updateChannel: API.OperationMethod<
  UpdateChannelRequest,
  UpdateChannelResponse,
  UpdateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /channel/{ChannelName}",
    input: {
      ChannelName: 0,
      FillerSlate: i_SlateSource,
      Outputs: D.list(i_RequestOutputItem),
      TimeShiftConfiguration: i_TimeShiftConfiguration,
      Audiences: 0,
    },
    output: {
      CreationTime: D.ts,
      LastModifiedTime: D.ts,
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateChannel",
})) as any;

export type UpdateLiveSourceError = CommonErrors;
/**
 * Updates a live source's configuration.
 */
export const updateLiveSource: API.OperationMethod<
  UpdateLiveSourceRequest,
  UpdateLiveSourceResponse,
  UpdateLiveSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /sourceLocation/{SourceLocationName}/liveSource/{LiveSourceName}",
    input: {
      HttpPackageConfigurations: D.list(i_HttpPackageConfiguration),
      LiveSourceName: 0,
      SourceLocationName: 0,
    },
    output: {
      CreationTime: D.ts,
      LastModifiedTime: D.ts,
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLiveSource",
})) as any;

export type UpdateProgramError =
  | BadRequestException
  | ProgramNotFound
  | CommonErrors;
/**
 * Updates a program within a channel.
 */
export const updateProgram: API.OperationMethod<
  UpdateProgramRequest,
  UpdateProgramResponse,
  UpdateProgramError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /channel/{ChannelName}/program/{ProgramName}",
    input: {
      AdBreaks: D.list(i_AdBreak),
      ChannelName: 0,
      ProgramName: 0,
      ScheduleConfiguration: {
        Transition: { ScheduledStartTimeMillis: 0, DurationMillis: 0 },
        ClipRange: i_ClipRange,
      },
      AudienceMedia: D.list(i_AudienceMedia),
    },
    output: {
      CreationTime: D.ts,
      ScheduledStartTime: D.ts,
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
  errors: [BadRequestException, ProgramNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProgram",
})) as any;

export type UpdateSourceLocationError = CommonErrors;
/**
 * Updates a source location. A source location is a container for sources. For more information about source locations, see Working with source locations in the *MediaTailor User Guide*.
 */
export const updateSourceLocation: API.OperationMethod<
  UpdateSourceLocationRequest,
  UpdateSourceLocationResponse,
  UpdateSourceLocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /sourceLocation/{SourceLocationName}",
    input: {
      AccessConfiguration: i_AccessConfiguration,
      DefaultSegmentDeliveryConfiguration:
        i_DefaultSegmentDeliveryConfiguration,
      HttpConfiguration: i_HttpConfiguration,
      SegmentDeliveryConfigurations: D.list(i_SegmentDeliveryConfiguration),
      SourceLocationName: 0,
    },
    output: {
      CreationTime: D.ts,
      LastModifiedTime: D.ts,
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSourceLocation",
})) as any;

export type UpdateVodSourceError = CommonErrors;
/**
 * Updates a VOD source's configuration.
 */
export const updateVodSource: API.OperationMethod<
  UpdateVodSourceRequest,
  UpdateVodSourceResponse,
  UpdateVodSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /sourceLocation/{SourceLocationName}/vodSource/{VodSourceName}",
    input: {
      HttpPackageConfigurations: D.list(i_HttpPackageConfiguration),
      SourceLocationName: 0,
      VodSourceName: 0,
    },
    output: {
      CreationTime: D.ts,
      LastModifiedTime: D.ts,
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVodSource",
})) as any;

const i_AccessConfiguration: D.LazyStruct = () => ({
  AccessType: 0,
  SecretsManagerAccessTokenConfiguration: {
    HeaderName: 0,
    SecretArn: 0,
    SecretStringKey: 0,
  },
});
const i_AdBreak: D.LazyStruct = () => ({
  MessageType: 0,
  OffsetMillis: 0,
  Slate: i_SlateSource,
  SpliceInsertMessage: {
    AvailNum: 0,
    AvailsExpected: 0,
    SpliceEventId: 0,
    UniqueProgramId: 0,
  },
  TimeSignalMessage: {
    SegmentationDescriptors: D.list({
      SegmentationEventId: 0,
      SegmentationUpidType: 0,
      SegmentationUpid: 0,
      SegmentationTypeId: 0,
      SegmentNum: 0,
      SegmentsExpected: 0,
      SubSegmentNum: 0,
      SubSegmentsExpected: 0,
    }),
  },
  AdBreakMetadata: D.list({ Key: 0, Value: 0 }),
});
const i_AudienceMedia: D.LazyStruct = () => ({
  Audience: 0,
  AlternateMedia: D.list({
    SourceLocationName: 0,
    LiveSourceName: 0,
    VodSourceName: 0,
    ClipRange: i_ClipRange,
    ScheduledStartTimeMillis: 0,
    AdBreaks: D.list(i_AdBreak),
    DurationMillis: 0,
  }),
});
const i_AvailMatchingCriteria: D.LazyStruct = () => ({
  DynamicVariable: 0,
  Operator: 0,
});
const i_ClipRange: D.LazyStruct = () => ({
  EndOffsetMillis: 0,
  StartOffsetMillis: 0,
});
const i_DefaultSegmentDeliveryConfiguration: D.LazyStruct = () => ({
  BaseUrl: 0,
});
const i_FunctionRef: D.LazyStruct = () => ({
  RunCondition: 0,
  FunctionId: 0,
  Alias: 0,
});
const i_HttpConfiguration: D.LazyStruct = () => ({ BaseUrl: 0 });
const i_HttpPackageConfiguration: D.LazyStruct = () => ({
  Path: 0,
  SourceGroup: 0,
  Type: 0,
});
const i_RequestOutputItem: D.LazyStruct = () => ({
  DashPlaylistSettings: {
    ManifestWindowSeconds: 0,
    MinBufferTimeSeconds: 0,
    MinUpdatePeriodSeconds: 0,
    SuggestedPresentationDelaySeconds: 0,
  },
  HlsPlaylistSettings: { ManifestWindowSeconds: 0, AdMarkupType: 0 },
  ManifestName: 0,
  SourceGroup: 0,
});
const i_SegmentDeliveryConfiguration: D.LazyStruct = () => ({
  BaseUrl: 0,
  Name: 0,
});
const i_SlateSource: D.LazyStruct = () => ({
  SourceLocationName: 0,
  VodSourceName: 0,
});
const i_TimeShiftConfiguration: D.LazyStruct = () => ({
  MaxTimeDelaySeconds: 0,
});
const i_TrafficShapingRetrievalWindow: D.LazyStruct = () => ({
  RetrievalWindowDurationSeconds: 0,
});
const i_TrafficShapingTpsConfiguration: D.LazyStruct = () => ({
  PeakTps: 0,
  PeakConcurrentUsers: 0,
});
const o_PrefetchConsumption: D.LazyStruct = () => ({
  EndTime: D.ts,
  StartTime: D.ts,
});
const o_PrefetchRetrieval: D.LazyStruct = () => ({
  EndTime: D.ts,
  StartTime: D.ts,
});
const o_RecurringPrefetchConfiguration: D.LazyStruct = () => ({
  StartTime: D.ts,
  EndTime: D.ts,
});
