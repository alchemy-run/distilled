import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "MediaTailor",
  serviceShapeName: "MediaTailor",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "mediatailor" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-04-23");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://api.mediatailor.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://api.mediatailor.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://api.mediatailor.{R}.{D}","properties":{},"headers":{}}');

export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ChannelNotFound
  extends /*@__PURE__*/ S.TaggedError<ChannelNotFound>()(
    "ChannelNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({ from: "NotFoundException", message: { matches: ".*" } }),
  ).pipe(C.withNotFoundError) {}
export class PlaybackConfigurationNotFound
  extends /*@__PURE__*/ S.TaggedError<PlaybackConfigurationNotFound>()(
    "PlaybackConfigurationNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "NotFoundException",
      message: { includes: "not found" },
    }),
  ).pipe(C.withNotFoundError) {}
export class PrefetchScheduleNotFound
  extends /*@__PURE__*/ S.TaggedError<PrefetchScheduleNotFound>()(
    "PrefetchScheduleNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({ from: "NotFoundException", message: { matches: ".*" } }),
  ).pipe(C.withNotFoundError) {}
export class ProgramNotFound
  extends /*@__PURE__*/ S.TaggedError<ProgramNotFound>()(
    "ProgramNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({ from: "NotFoundException", message: { matches: ".*" } }),
  ).pipe(C.withNotFoundError) {}
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
export type LoggingStrategy = "VENDED_LOGS" | "LEGACY_CLOUDWATCH" | (string & {});
export type __listOfLoggingStrategies = LoggingStrategy[];
const __listOfLoggingStrategies = __S(1600, __c50, 0) as any as S.Schema<__listOfLoggingStrategies>;
export type AdsInteractionPublishOptInEventType =
  | "RAW_ADS_RESPONSE"
  | "RAW_ADS_REQUEST"
  | "RAW_BID_REQUEST"
  | "RAW_BID_RESPONSE"
  | "PRE_ADS_REQUEST_HOOK_SUMMARY"
  | "PRE_ADS_REQUEST_FUNCTION_COMPLETED"
  | "POST_ADS_RESPONSE_HOOK_SUMMARY"
  | "POST_ADS_RESPONSE_FUNCTION_COMPLETED"
  | "PRE_MANIFEST_INSERTION_HOOK_SUMMARY"
  | "PRE_MANIFEST_INSERTION_FUNCTION_COMPLETED"
  | (string & {});
export type __adsInteractionPublishOptInEventTypesList = AdsInteractionPublishOptInEventType[];
const __adsInteractionPublishOptInEventTypesList = __S(
  1600,
  __c50,
  0,
) as any as S.Schema<__adsInteractionPublishOptInEventTypesList>;
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
  | "BEACON_RECEIVED"
  | "POST_ADS_RESPONSE_HOOK_ERROR"
  | "POST_ADS_RESPONSE_FUNCTION_ERROR"
  | "PRE_MANIFEST_INSERTION_HOOK_ERROR"
  | "PRE_MANIFEST_INSERTION_FUNCTION_ERROR"
  | (string & {});
export type __adsInteractionExcludeEventTypesList = AdsInteractionExcludeEventType[];
const __adsInteractionExcludeEventTypesList = __S(
  1600,
  __c50,
  0,
) as any as S.Schema<__adsInteractionExcludeEventTypesList>;
export interface AdsInteractionLog {
  PublishOptInEventTypes?: AdsInteractionPublishOptInEventType[];
  ExcludeEventTypes?: AdsInteractionExcludeEventType[];
}
export type ManifestServicePublishOptInEventType =
  | "PRE_SESSION_INIT_HOOK_SUMMARY"
  | "PRE_SESSION_INIT_FUNCTION_COMPLETED"
  | (string & {});
export type __manifestServicePublishOptInEventTypesList = ManifestServicePublishOptInEventType[];
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
export type __manifestServiceExcludeEventTypesList = ManifestServiceExcludeEventType[];
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
const __mapOf__string = /*@__PURE__*/ __L.at(__c62, 0);
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
const __listOfAvailMatchingCriteria = /*@__PURE__*/ __L.at(__c67, 1);
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
const __listOfAdBreak = /*@__PURE__*/ __L.at(__c2, 7);
export type RelativePosition = "BEFORE_PROGRAM" | "AFTER_PROGRAM" | (string & {});
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
const __listOfAlternateMedia = /*@__PURE__*/ __L.at(__c2, 10);
export interface AudienceMedia {
  Audience?: string;
  AlternateMedia?: AlternateMedia[];
}
export type __listOfAudienceMedia = AudienceMedia[];
const __listOfAudienceMedia = /*@__PURE__*/ __L.at(__c2, 12);
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
export type __listOfSegmentDeliveryConfiguration = SegmentDeliveryConfiguration[];
const __listOfSegmentDeliveryConfiguration = /*@__PURE__*/ __L.at(__c4, 5);
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
const __listOfScheduleAdBreak = /*@__PURE__*/ __L.at(__c25, 2);
export type ScheduleEntryType = "PROGRAM" | "FILLER_SLATE" | "ALTERNATE_MEDIA" | (string & {});
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
const __listOfScheduleEntry = /*@__PURE__*/ __L.at(__c25, 4);
export interface GetChannelScheduleResponse {
  Items?: ScheduleEntry[];
  NextToken?: string;
}
export interface GetFunctionRequest {
  FunctionId: string;
}
export type FunctionType =
  | "HTTP_REQUEST"
  | "AWS_SERVICE_REQUEST"
  | "CUSTOM_OUTPUT"
  | "CONCURRENT_EXECUTOR"
  | "SEQUENTIAL_EXECUTOR"
  | "VAST_REQUEST"
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
export type AwsTargetService = string;
export interface AwsServiceRequestConfiguration {
  Runtime: RuntimeType;
  Output?: { [key: string]: string | undefined };
  MethodType: MethodType;
  RequestTimeoutMilliseconds: number;
  Url: string;
  Body?: string;
  Headers?: { [key: string]: string | undefined };
  TargetService: string;
  TargetRegion: string;
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
const __listOfFunctionsRef = /*@__PURE__*/ __L.at(__c27, 4);
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
export interface VastRequestConfiguration {
  Runtime: RuntimeType;
  Output?: { [key: string]: string | undefined };
  MethodType: MethodType;
  RequestTimeoutMilliseconds: number;
  Url: string;
  Body?: string;
  Headers?: { [key: string]: string | undefined };
}
export interface GetFunctionResponse {
  FunctionId: string;
  FunctionType: FunctionType;
  Description?: string;
  HttpRequestConfiguration?: HttpRequestConfiguration;
  AwsServiceRequestConfiguration?: AwsServiceRequestConfiguration;
  CustomOutputConfiguration?: CustomOutputConfiguration;
  ConcurrentExecutorConfiguration?: ConcurrentExecutorConfiguration;
  SequentialExecutorConfiguration?: SequentialExecutorConfiguration;
  VastRequestConfiguration?: VastRequestConfiguration;
  Tags?: { [key: string]: string | undefined };
  Arn?: string;
}
export interface GetPlaybackConfigurationRequest {
  Name: string;
}
export type Mode = "OFF" | "BEHIND_LIVE_EDGE" | "AFTER_LIVE_EDGE" | (string & {});
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
export type OriginManifestType = "SINGLE_PERIOD" | "MULTI_PERIOD" | (string & {});
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
export type PreRollAdSequencingMode = "FOLLOW_AD_SEQUENCE" | "IGNORE_AD_SEQUENCE" | (string & {});
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
export type StreamingMediaFileConditioning = "TRANSCODE" | "NONE" | (string & {});
export interface AdConditioningConfiguration {
  StreamingMediaFileConditioning: StreamingMediaFileConditioning;
}
export type Method = "GET" | "POST" | (string & {});
export type StringMap = { [key: string]: string | undefined };
const StringMap = __mapOf__string as any as S.Schema<StringMap>;
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
export type MinimumUnfilledDurationSeconds = number;
export type ApsPublisherId = string;
export type ApsRegion = "AMERICAS" | "EUROPE" | "ASIA_PACIFIC" | (string & {});
export type OpenRtbTemplateString = string;
export interface YieldOptimizationConfiguration {
  MinimumUnfilledDuration: number;
  PublisherId: string;
  Region: ApsRegion;
  OpenRtbTemplate: string;
}
export type EventName =
  | "PRE_SESSION_INITIALIZATION"
  | "PRE_ADS_REQUEST"
  | "POST_ADS_RESPONSE"
  | "PRE_MANIFEST_INSERTION"
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
export type ClientSideBeaconingMode = "DISABLED" | "INSIGHTS" | (string & {});
export type BeaconEventType = "MUTE" | "UNMUTE" | "PAUSE" | "SKIP" | (string & {});
export type BeaconEventTypeList = BeaconEventType[];
export interface ClientSideBeaconingConfiguration {
  ReportingMode: ClientSideBeaconingMode;
  AdditionalEventTypes?: BeaconEventType[];
}
export interface BeaconingConfiguration {
  ClientSide?: ClientSideBeaconingConfiguration;
}
export interface GetPlaybackConfigurationResponse {
  AdDecisionServerUrl?: string;
  AvailSuppression?: AvailSuppression;
  Bumper?: Bumper;
  CdnConfiguration?: CdnConfiguration;
  ConfigurationAliases?: { [key: string]: { [key: string]: string | undefined } | undefined };
  DashConfiguration?: DashConfiguration;
  HlsConfiguration?: HlsConfiguration;
  InsertionMode?: InsertionMode;
  LivePreRollConfiguration?: LivePreRollConfiguration;
  LogConfiguration?: LogConfiguration & { EnabledLoggingStrategies: __listOfLoggingStrategies };
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
  YieldOptimizationConfiguration?: YieldOptimizationConfiguration;
  FunctionMapping?: { [key: string]: string | undefined };
  AdsPersonalizationTimeouts?: AdsPersonalizationTimeouts;
  AdsPersonalizationConcurrency?: AdsPersonalizationConcurrency;
  BeaconingConfiguration?: BeaconingConfiguration;
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
const __listOf__string = __S(1856, __c58, 0) as any as S.Schema<__listOf__string>;
export type AlertCategory = "SCHEDULING_ERROR" | "PLAYBACK_WARNING" | "INFO" | (string & {});
export interface Alert {
  AlertCode: string;
  AlertMessage: string;
  LastModifiedTime: Date;
  RelatedResourceArns: string[];
  ResourceArn: string;
  Category?: AlertCategory;
}
export type __listOfAlert = Alert[];
const __listOfAlert = /*@__PURE__*/ __L.at(__c31, 2);
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
const __listOfChannel = /*@__PURE__*/ __L.at(__c32, 2);
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
  AwsServiceRequestConfiguration?: AwsServiceRequestConfiguration;
  CustomOutputConfiguration?: CustomOutputConfiguration;
  ConcurrentExecutorConfiguration?: ConcurrentExecutorConfiguration;
  SequentialExecutorConfiguration?: SequentialExecutorConfiguration;
  VastRequestConfiguration?: VastRequestConfiguration;
  Tags?: { [key: string]: string | undefined };
  Arn?: string;
}
export type __listOfFunctionsResponse = Function[];
const __listOfFunctionsResponse = /*@__PURE__*/ __L.at(__c33, 1);
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
const __listOfLiveSource = /*@__PURE__*/ __L.at(__c34, 2);
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
  ConfigurationAliases?: { [key: string]: { [key: string]: string | undefined } | undefined };
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
  YieldOptimizationConfiguration?: YieldOptimizationConfiguration;
  FunctionMapping?: { [key: string]: string | undefined };
  AdsPersonalizationTimeouts?: AdsPersonalizationTimeouts;
  AdsPersonalizationConcurrency?: AdsPersonalizationConcurrency;
  BeaconingConfiguration?: BeaconingConfiguration;
}
export type __listOfPlaybackConfiguration = PlaybackConfiguration[];
const __listOfPlaybackConfiguration = /*@__PURE__*/ __L.at(__c35, 1);
export interface ListPlaybackConfigurationsResponse {
  Items?: (PlaybackConfiguration & {
    LogConfiguration: LogConfiguration & { EnabledLoggingStrategies: __listOfLoggingStrategies };
  })[];
  NextToken?: string;
}
export type __integerMin1Max100 = number;
export type ListPrefetchScheduleType = "SINGLE" | "RECURRING" | "ALL" | (string & {});
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
const __listOfPrefetchSchedule = /*@__PURE__*/ __L.at(__c36, 2);
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
const __listOfSourceLocation = /*@__PURE__*/ __L.at(__c37, 2);
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
const __listOfVodSource = /*@__PURE__*/ __L.at(__c39, 2);
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
  AwsServiceRequestConfiguration?: AwsServiceRequestConfiguration;
  CustomOutputConfiguration?: CustomOutputConfiguration;
  ConcurrentExecutorConfiguration?: ConcurrentExecutorConfiguration;
  SequentialExecutorConfiguration?: SequentialExecutorConfiguration;
  VastRequestConfiguration?: VastRequestConfiguration;
  Tags?: { [key: string]: string | undefined };
}
export interface PutFunctionResponse {
  FunctionId: string;
  FunctionType: FunctionType;
  Description?: string;
  HttpRequestConfiguration?: HttpRequestConfiguration;
  AwsServiceRequestConfiguration?: AwsServiceRequestConfiguration;
  CustomOutputConfiguration?: CustomOutputConfiguration;
  ConcurrentExecutorConfiguration?: ConcurrentExecutorConfiguration;
  SequentialExecutorConfiguration?: SequentialExecutorConfiguration;
  VastRequestConfiguration?: VastRequestConfiguration;
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
  ConfigurationAliases?: { [key: string]: { [key: string]: string | undefined } | undefined };
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
  YieldOptimizationConfiguration?: YieldOptimizationConfiguration;
  FunctionMapping?: { [key: string]: string | undefined };
  AdsPersonalizationTimeouts?: AdsPersonalizationTimeouts;
  AdsPersonalizationConcurrency?: AdsPersonalizationConcurrency;
  BeaconingConfiguration?: BeaconingConfiguration;
}
export interface PutPlaybackConfigurationResponse {
  AdDecisionServerUrl?: string;
  AvailSuppression?: AvailSuppression;
  Bumper?: Bumper;
  CdnConfiguration?: CdnConfiguration;
  ConfigurationAliases?: { [key: string]: { [key: string]: string | undefined } | undefined };
  DashConfiguration?: DashConfiguration;
  HlsConfiguration?: HlsConfiguration;
  InsertionMode?: InsertionMode;
  LivePreRollConfiguration?: LivePreRollConfiguration;
  LogConfiguration?: LogConfiguration & { EnabledLoggingStrategies: __listOfLoggingStrategies };
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
  YieldOptimizationConfiguration?: YieldOptimizationConfiguration;
  FunctionMapping?: { [key: string]: string | undefined };
  AdsPersonalizationTimeouts?: AdsPersonalizationTimeouts;
  AdsPersonalizationConcurrency?: AdsPersonalizationConcurrency;
  BeaconingConfiguration?: BeaconingConfiguration;
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
  input: __S(1568, __c49, 0) as any as S.Schema<ConfigureLogsForChannelRequest>,
  output: __S(1569, __c49, 1) as any as S.Schema<ConfigureLogsForChannelResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfigureLogsForChannel",
}));

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
  input: __S(1728, __c54, 0) as any as S.Schema<ConfigureLogsForPlaybackConfigurationRequest>,
  output: __S(1729, __c54, 1) as any as S.Schema<ConfigureLogsForPlaybackConfigurationResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfigureLogsForPlaybackConfiguration",
}));

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
  input: __S(1792, __c56, 0) as any as S.Schema<CreateChannelRequest>,
  output: __S(1954, __c61, 2) as any as S.Schema<CreateChannelResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChannel",
}));

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
  input: __S(2016, __c63, 0) as any as S.Schema<CreateLiveSourceRequest>,
  output: __S(2080, __c65, 0) as any as S.Schema<CreateLiveSourceResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLiveSource",
}));

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
  input: __S(2112, __c66, 0) as any as S.Schema<CreatePrefetchScheduleRequest>,
  output: __S(2113, __c66, 1) as any as S.Schema<CreatePrefetchScheduleResponse>,
  errors: [BadRequestException, PlaybackConfigurationNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePrefetchSchedule",
}));

export type CreateProgramError = BadRequestException | ChannelNotFound | CommonErrors;
/**
 * Creates a program within a channel. For information about programs, see Working with programs in the *MediaTailor User Guide*.
 */
export const createProgram: API.OperationMethod<
  CreateProgramRequest,
  CreateProgramResponse,
  CreateProgramError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2, __c0, 2) as any as S.Schema<CreateProgramRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<CreateProgramResponse>,
  errors: [BadRequestException, ChannelNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProgram",
}));

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
  input: __S(96, __c3, 0) as any as S.Schema<CreateSourceLocationRequest>,
  output: __S(160, __c5, 0) as any as S.Schema<CreateSourceLocationResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSourceLocation",
}));

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
  input: __S(192, __c6, 0) as any as S.Schema<CreateVodSourceRequest>,
  output: __S(224, __c7, 0) as any as S.Schema<CreateVodSourceResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVodSource",
}));

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
  input: __S(256, __c8, 0) as any as S.Schema<DeleteChannelRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<DeleteChannelResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChannel",
}));

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
  input: __S(320, __c10, 0) as any as S.Schema<DeleteChannelPolicyRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<DeleteChannelPolicyResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChannelPolicy",
}));

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
  input: __S(352, __c11, 0) as any as S.Schema<DeleteFunctionRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<DeleteFunctionResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFunction",
}));

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
  input: __S(384, __c12, 0) as any as S.Schema<DeleteLiveSourceRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<DeleteLiveSourceResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLiveSource",
}));

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
  input: __S(416, __c13, 0) as any as S.Schema<DeletePlaybackConfigurationRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<DeletePlaybackConfigurationResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePlaybackConfiguration",
}));

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
  input: __S(448, __c14, 0) as any as S.Schema<DeletePrefetchScheduleRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<DeletePrefetchScheduleResponse>,
  errors: [BadRequestException, PrefetchScheduleNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePrefetchSchedule",
}));

export type DeleteProgramError = BadRequestException | ProgramNotFound | CommonErrors;
/**
 * Deletes a program within a channel. For information about programs, see Working with programs in the *MediaTailor User Guide*.
 */
export const deleteProgram: API.OperationMethod<
  DeleteProgramRequest,
  DeleteProgramResponse,
  DeleteProgramError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c15, 0) as any as S.Schema<DeleteProgramRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<DeleteProgramResponse>,
  errors: [BadRequestException, ProgramNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProgram",
}));

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
  input: __S(512, __c16, 0) as any as S.Schema<DeleteSourceLocationRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<DeleteSourceLocationResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSourceLocation",
}));

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
  input: __S(544, __c17, 0) as any as S.Schema<DeleteVodSourceRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<DeleteVodSourceResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVodSource",
}));

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
  input: __S(576, __c18, 0) as any as S.Schema<DescribeChannelRequest>,
  output: __S(577, __c18, 1) as any as S.Schema<DescribeChannelResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeChannel",
}));

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
  input: __S(640, __c20, 0) as any as S.Schema<DescribeLiveSourceRequest>,
  output: __S(2080, __c65, 0) as any as S.Schema<DescribeLiveSourceResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLiveSource",
}));

export type DescribeProgramError = BadRequestException | ProgramNotFound | CommonErrors;
/**
 * Describes a program within a channel. For information about programs, see Working with programs in the *MediaTailor User Guide*.
 */
export const describeProgram: API.OperationMethod<
  DescribeProgramRequest,
  DescribeProgramResponse,
  DescribeProgramError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c21, 0) as any as S.Schema<DescribeProgramRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<DescribeProgramResponse>,
  errors: [BadRequestException, ProgramNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProgram",
}));

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
  input: __S(704, __c22, 0) as any as S.Schema<DescribeSourceLocationRequest>,
  output: __S(160, __c5, 0) as any as S.Schema<DescribeSourceLocationResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSourceLocation",
}));

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
  input: __S(736, __c23, 0) as any as S.Schema<DescribeVodSourceRequest>,
  output: __S(739, __c23, 3) as any as S.Schema<DescribeVodSourceResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVodSource",
}));

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
  input: __S(768, __c24, 0) as any as S.Schema<GetChannelPolicyRequest>,
  output: __S(769, __c24, 1) as any as S.Schema<GetChannelPolicyResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChannelPolicy",
}));

export type GetChannelScheduleError = BadRequestException | ChannelNotFound | CommonErrors;
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
  input: __S(800, __c25, 0) as any as S.Schema<GetChannelScheduleRequest>,
  output: __S(805, __c25, 5) as any as S.Schema<GetChannelScheduleResponse>,
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
  input: __S(832, __c26, 0) as any as S.Schema<GetFunctionRequest>,
  output: __S(871, __c27, 7) as any as S.Schema<GetFunctionResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunction",
}));

export type GetPlaybackConfigurationError = PlaybackConfigurationNotFound | CommonErrors;
/**
 * Retrieves a playback configuration. For information about MediaTailor configurations, see Working with configurations in AWS Elemental MediaTailor.
 */
export const getPlaybackConfiguration: API.OperationMethod<
  GetPlaybackConfigurationRequest,
  GetPlaybackConfigurationResponse,
  GetPlaybackConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c28, 0) as any as S.Schema<GetPlaybackConfigurationRequest>,
  output: __S(949, __c29, 21) as any as S.Schema<GetPlaybackConfigurationResponse>,
  errors: [PlaybackConfigurationNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPlaybackConfiguration",
}));

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
  input: __S(960, __c30, 0) as any as S.Schema<GetPrefetchScheduleRequest>,
  output: __S(961, __c30, 1) as any as S.Schema<GetPrefetchScheduleResponse>,
  errors: [BadRequestException, PrefetchScheduleNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPrefetchSchedule",
}));

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
  input: __S(992, __c31, 0) as any as S.Schema<ListAlertsRequest>,
  output: __S(995, __c31, 3) as any as S.Schema<ListAlertsResponse>,
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
  input: __S(1024, __c32, 0) as any as S.Schema<ListChannelsRequest>,
  output: __S(1027, __c32, 3) as any as S.Schema<ListChannelsResponse>,
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
  input: __S(1056, __c33, 0) as any as S.Schema<ListFunctionsRequest>,
  output: __S(1058, __c33, 2) as any as S.Schema<ListFunctionsResponse>,
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
  input: __S(1088, __c34, 0) as any as S.Schema<ListLiveSourcesRequest>,
  output: __S(1091, __c34, 3) as any as S.Schema<ListLiveSourcesResponse>,
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
  input: __S(1120, __c35, 0) as any as S.Schema<ListPlaybackConfigurationsRequest>,
  output: __S(1122, __c35, 2) as any as S.Schema<ListPlaybackConfigurationsResponse>,
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
  input: __S(1152, __c36, 0) as any as S.Schema<ListPrefetchSchedulesRequest>,
  output: __S(1155, __c36, 3) as any as S.Schema<ListPrefetchSchedulesResponse>,
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
  input: __S(1184, __c37, 0) as any as S.Schema<ListSourceLocationsRequest>,
  output: __S(1187, __c37, 3) as any as S.Schema<ListSourceLocationsResponse>,
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
  input: __S(1216, __c38, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(1217, __c38, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(1248, __c39, 0) as any as S.Schema<ListVodSourcesRequest>,
  output: __S(1251, __c39, 3) as any as S.Schema<ListVodSourcesResponse>,
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
  input: __S(1280, __c40, 0) as any as S.Schema<PutChannelPolicyRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<PutChannelPolicyResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutChannelPolicy",
}));

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
  input: __S(1312, __c41, 0) as any as S.Schema<PutFunctionRequest>,
  output: __S(871, __c27, 7) as any as S.Schema<PutFunctionResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFunction",
}));

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
  input: __S(1345, __c42, 1) as any as S.Schema<PutPlaybackConfigurationRequest>,
  output: __S(949, __c29, 21) as any as S.Schema<PutPlaybackConfigurationResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutPlaybackConfiguration",
}));

export type StartChannelError = BadRequestException | ChannelNotFound | CommonErrors;
/**
 * Starts a channel. For information about MediaTailor channels, see Working with channels in the *MediaTailor User Guide*.
 */
export const startChannel: API.OperationMethod<
  StartChannelRequest,
  StartChannelResponse,
  StartChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1376, __c43, 0) as any as S.Schema<StartChannelRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<StartChannelResponse>,
  errors: [BadRequestException, ChannelNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartChannel",
}));

export type StopChannelError = BadRequestException | ChannelNotFound | CommonErrors;
/**
 * Stops a channel. For information about MediaTailor channels, see Working with channels in the *MediaTailor User Guide*.
 */
export const stopChannel: API.OperationMethod<
  StopChannelRequest,
  StopChannelResponse,
  StopChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1408, __c44, 0) as any as S.Schema<StopChannelRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<StopChannelResponse>,
  errors: [BadRequestException, ChannelNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopChannel",
}));

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
  input: __S(1440, __c45, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<TagResourceResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(1472, __c46, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(1504, __c47, 0) as any as S.Schema<UpdateChannelRequest>,
  output: __S(1954, __c61, 2) as any as S.Schema<UpdateChannelResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateChannel",
}));

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
  input: __S(1536, __c48, 0) as any as S.Schema<UpdateLiveSourceRequest>,
  output: __S(2080, __c65, 0) as any as S.Schema<UpdateLiveSourceResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLiveSource",
}));

export type UpdateProgramError = BadRequestException | ProgramNotFound | CommonErrors;
/**
 * Updates a program within a channel.
 */
export const updateProgram: API.OperationMethod<
  UpdateProgramRequest,
  UpdateProgramResponse,
  UpdateProgramError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1634, __c51, 2) as any as S.Schema<UpdateProgramRequest>,
  output: __S(1635, __c51, 3) as any as S.Schema<UpdateProgramResponse>,
  errors: [BadRequestException, ProgramNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProgram",
}));

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
  input: __S(1664, __c52, 0) as any as S.Schema<UpdateSourceLocationRequest>,
  output: __S(160, __c5, 0) as any as S.Schema<UpdateSourceLocationResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSourceLocation",
}));

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
  input: __S(1696, __c53, 0) as any as S.Schema<UpdateVodSourceRequest>,
  output: __S(224, __c7, 0) as any as S.Schema<UpdateVodSourceResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVodSource",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DurationMillis: S.optional(S.Number),
          RelativePosition: S.String,
          RelativeProgram: S.optional(S.String),
          ScheduledStartTimeMillis: S.optional(S.Number),
          Type: S.String,
        }),
      ).annotate({ identifier: "Transition" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Transition: __S(0, __c0, 0), ClipRange: S.optional(__S(72, __c2, 8)) }),
      ).annotate({ identifier: "ScheduleConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AdBreaks: S.optional(__listOfAdBreak),
          ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
          LiveSourceName: S.optional(S.String),
          ProgramName: S.String.pipe(T.HttpLabel("ProgramName")),
          ScheduleConfiguration: __S(1, __c0, 1),
          SourceLocationName: S.String,
          VodSourceName: S.optional(S.String),
          AudienceMedia: S.optional(__listOfAudienceMedia),
          Tags: S.optional(__mapOf__string),
        })
          .pipe(S.encodeKeys({ Tags: "tags" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/channel/{ChannelName}/program/{ProgramName}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateProgramRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AdBreaks: S.optional(__listOfAdBreak),
          Arn: S.optional(S.String),
          ChannelName: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LiveSourceName: S.optional(S.String),
          ProgramName: S.optional(S.String),
          ScheduledStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SourceLocationName: S.optional(S.String),
          VodSourceName: S.optional(S.String),
          ClipRange: S.optional(__S(72, __c2, 8)),
          DurationMillis: S.optional(S.Number),
          AudienceMedia: S.optional(__listOfAudienceMedia),
          Tags: S.optional(__mapOf__string),
        }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "CreateProgramResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AvailNum: S.optional(S.Number),
          AvailsExpected: S.optional(S.Number),
          SpliceEventId: S.optional(S.Number),
          UniqueProgramId: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SpliceInsertMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SegmentationEventId: S.optional(S.Number),
          SegmentationUpidType: S.optional(S.Number),
          SegmentationUpid: S.optional(S.String),
          SegmentationTypeId: S.optional(S.Number),
          SegmentNum: S.optional(S.Number),
          SegmentsExpected: S.optional(S.Number),
          SubSegmentNum: S.optional(S.Number),
          SubSegmentsExpected: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SegmentationDescriptor" });
    case 2:
      return S.Array(__S(65, __c2, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ SegmentationDescriptors: S.optional(__S(66, __c2, 2)) }),
      ).annotate({ identifier: "TimeSignalMessage" });
    case 4:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "KeyValuePair",
      });
    case 5:
      return S.Array(__S(68, __c2, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          MessageType: S.optional(S.String),
          OffsetMillis: S.Number,
          Slate: S.optional(__S(1824, __c57, 0)),
          SpliceInsertMessage: S.optional(__S(64, __c2, 0)),
          TimeSignalMessage: S.optional(__S(67, __c2, 3)),
          AdBreakMetadata: S.optional(__S(69, __c2, 5)),
        }),
      ).annotate({ identifier: "AdBreak" });
    case 7:
      return S.Array(__S(70, __c2, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          EndOffsetMillis: S.optional(S.Number),
          StartOffsetMillis: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ClipRange" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          SourceLocationName: S.optional(S.String),
          LiveSourceName: S.optional(S.String),
          VodSourceName: S.optional(S.String),
          ClipRange: S.optional(__S(72, __c2, 8)),
          ScheduledStartTimeMillis: S.optional(S.Number),
          AdBreaks: S.optional(__listOfAdBreak),
          DurationMillis: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AlternateMedia" });
    case 10:
      return S.Array(__S(73, __c2, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({
          Audience: S.optional(S.String),
          AlternateMedia: S.optional(__listOfAlternateMedia),
        }),
      ).annotate({ identifier: "AudienceMedia" });
    case 12:
      return S.Array(__S(75, __c2, 11));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccessConfiguration: S.optional(__S(129, __c4, 1)),
          DefaultSegmentDeliveryConfiguration: S.optional(__S(130, __c4, 2)),
          HttpConfiguration: __S(131, __c4, 3),
          SegmentDeliveryConfigurations: S.optional(__listOfSegmentDeliveryConfiguration),
          SourceLocationName: S.String.pipe(T.HttpLabel("SourceLocationName")),
          Tags: S.optional(__mapOf__string),
        })
          .pipe(S.encodeKeys({ Tags: "tags" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/sourceLocation/{SourceLocationName}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateSourceLocationRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HeaderName: S.optional(S.String),
          SecretArn: S.optional(S.String),
          SecretStringKey: S.optional(S.String),
        }),
      ).annotate({ identifier: "SecretsManagerAccessTokenConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccessType: S.optional(S.String),
          SecretsManagerAccessTokenConfiguration: S.optional(__S(128, __c4, 0)),
        }),
      ).annotate({ identifier: "AccessConfiguration" });
    case 2:
      return S.suspend(() => S.Struct({ BaseUrl: S.optional(S.String) })).annotate({
        identifier: "DefaultSegmentDeliveryConfiguration",
      });
    case 3:
      return S.suspend(() => S.Struct({ BaseUrl: S.String })).annotate({
        identifier: "HttpConfiguration",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({ BaseUrl: S.optional(S.String), Name: S.optional(S.String) }),
      ).annotate({ identifier: "SegmentDeliveryConfiguration" });
    case 5:
      return S.Array(__S(132, __c4, 4));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccessConfiguration: S.optional(__S(129, __c4, 1)),
          Arn: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DefaultSegmentDeliveryConfiguration: S.optional(__S(130, __c4, 2)),
          HttpConfiguration: S.optional(__S(131, __c4, 3)),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SegmentDeliveryConfigurations: S.optional(__listOfSegmentDeliveryConfiguration),
          SourceLocationName: S.optional(S.String),
          Tags: S.optional(__mapOf__string),
        }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "CreateSourceLocationResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HttpPackageConfigurations: __S(2049, __c64, 1),
          SourceLocationName: S.String.pipe(T.HttpLabel("SourceLocationName")),
          Tags: S.optional(__mapOf__string),
          VodSourceName: S.String.pipe(T.HttpLabel("VodSourceName")),
        })
          .pipe(S.encodeKeys({ Tags: "tags" }))
          .pipe(
            T.all(
              T.Http({
                method: "POST",
                uri: "/sourceLocation/{SourceLocationName}/vodSource/{VodSourceName}",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateVodSourceRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          HttpPackageConfigurations: S.optional(__S(2049, __c64, 1)),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SourceLocationName: S.optional(S.String),
          Tags: S.optional(__mapOf__string),
          VodSourceName: S.optional(S.String),
        }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "CreateVodSourceResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChannelName: S.String.pipe(T.HttpLabel("ChannelName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/channel/{ChannelName}" }),
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
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteChannelResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChannelName: S.String.pipe(T.HttpLabel("ChannelName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/channel/{ChannelName}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteChannelPolicyRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FunctionId: S.String.pipe(T.HttpLabel("FunctionId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/function/{FunctionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFunctionRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LiveSourceName: S.String.pipe(T.HttpLabel("LiveSourceName")),
          SourceLocationName: S.String.pipe(T.HttpLabel("SourceLocationName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/sourceLocation/{SourceLocationName}/liveSource/{LiveSourceName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteLiveSourceRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/playbackConfiguration/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePlaybackConfigurationRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          PlaybackConfigurationName: S.String.pipe(T.HttpLabel("PlaybackConfigurationName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/prefetchSchedule/{PlaybackConfigurationName}/{Name}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePrefetchScheduleRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
          ProgramName: S.String.pipe(T.HttpLabel("ProgramName")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/channel/{ChannelName}/program/{ProgramName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteProgramRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SourceLocationName: S.String.pipe(T.HttpLabel("SourceLocationName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/sourceLocation/{SourceLocationName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSourceLocationRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceLocationName: S.String.pipe(T.HttpLabel("SourceLocationName")),
          VodSourceName: S.String.pipe(T.HttpLabel("VodSourceName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/sourceLocation/{SourceLocationName}/vodSource/{VodSourceName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVodSourceRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChannelName: S.String.pipe(T.HttpLabel("ChannelName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/channel/{ChannelName}" }),
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
          Arn: S.optional(S.String),
          ChannelName: S.optional(S.String),
          ChannelState: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FillerSlate: S.optional(__S(1824, __c57, 0)),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Outputs: S.optional(__S(1891, __c59, 3)),
          PlaybackMode: S.optional(S.String),
          Tags: S.optional(__mapOf__string),
          Tier: S.optional(S.String),
          LogConfiguration: __S(608, __c19, 0),
          TimeShiftConfiguration: S.optional(__S(1920, __c60, 0)),
          Audiences: S.optional(__S(1856, __c58, 0)),
        }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "DescribeChannelResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ LogTypes: S.optional(__S(1600, __c50, 0)) })).annotate({
        identifier: "LogConfigurationForChannel",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LiveSourceName: S.String.pipe(T.HttpLabel("LiveSourceName")),
          SourceLocationName: S.String.pipe(T.HttpLabel("SourceLocationName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/sourceLocation/{SourceLocationName}/liveSource/{LiveSourceName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeLiveSourceRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
          ProgramName: S.String.pipe(T.HttpLabel("ProgramName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/channel/{ChannelName}/program/{ProgramName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeProgramRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SourceLocationName: S.String.pipe(T.HttpLabel("SourceLocationName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/sourceLocation/{SourceLocationName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeSourceLocationRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceLocationName: S.String.pipe(T.HttpLabel("SourceLocationName")),
          VodSourceName: S.String.pipe(T.HttpLabel("VodSourceName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/sourceLocation/{SourceLocationName}/vodSource/{VodSourceName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeVodSourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ OffsetMillis: S.Number })).annotate({
        identifier: "AdBreakOpportunity",
      });
    case 2:
      return S.Array(__S(737, __c23, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AdBreakOpportunities: S.optional(__S(738, __c23, 2)),
          Arn: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          HttpPackageConfigurations: S.optional(__S(2049, __c64, 1)),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SourceLocationName: S.optional(S.String),
          Tags: S.optional(__mapOf__string),
          VodSourceName: S.optional(S.String),
        }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "DescribeVodSourceResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChannelName: S.String.pipe(T.HttpLabel("ChannelName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/channel/{ChannelName}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetChannelPolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Policy: S.optional(S.String) })).annotate({
        identifier: "GetChannelPolicyResponse",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
          DurationMinutes: S.optional(S.String).pipe(T.HttpQuery("durationMinutes")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          Audience: S.optional(S.String).pipe(T.HttpQuery("audience")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/channel/{ChannelName}/schedule" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetChannelScheduleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApproximateDurationSeconds: S.optional(S.Number),
          ApproximateStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SourceLocationName: S.optional(S.String),
          VodSourceName: S.optional(S.String),
        }),
      ).annotate({ identifier: "ScheduleAdBreak" });
    case 2:
      return S.Array(__S(801, __c25, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ApproximateDurationSeconds: S.optional(S.Number),
          ApproximateStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Arn: S.String,
          ChannelName: S.String,
          LiveSourceName: S.optional(S.String),
          ProgramName: S.String,
          ScheduleAdBreaks: S.optional(__listOfScheduleAdBreak),
          ScheduleEntryType: S.optional(S.String),
          SourceLocationName: S.String,
          VodSourceName: S.optional(S.String),
          Audiences: S.optional(__S(1856, __c58, 0)),
        }),
      ).annotate({ identifier: "ScheduleEntry" });
    case 4:
      return S.Array(__S(803, __c25, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__listOfScheduleEntry), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetChannelScheduleResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FunctionId: S.String.pipe(T.HttpLabel("FunctionId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/function/{FunctionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFunctionRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Runtime: S.String,
          Output: S.optional(__mapOf__string),
          MethodType: S.String,
          RequestTimeoutMilliseconds: S.Number,
          Url: S.String,
          Body: S.optional(S.String),
          Headers: S.optional(__mapOf__string),
        }),
      ).annotate({ identifier: "HttpRequestConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Runtime: S.String,
          Output: S.optional(__mapOf__string),
          MethodType: S.String,
          RequestTimeoutMilliseconds: S.Number,
          Url: S.String,
          Body: S.optional(S.String),
          Headers: S.optional(__mapOf__string),
          TargetService: S.String,
          TargetRegion: S.String,
        }),
      ).annotate({ identifier: "AwsServiceRequestConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Runtime: S.String, Output: S.optional(__mapOf__string) }),
      ).annotate({ identifier: "CustomOutputConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          RunCondition: S.optional(S.String),
          FunctionId: S.optional(S.String),
          Alias: S.optional(S.String),
        }),
      ).annotate({ identifier: "FunctionRef" });
    case 4:
      return S.Array(__S(867, __c27, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Runtime: S.String,
          Output: __mapOf__string,
          FunctionList: __listOfFunctionsRef,
          TimeoutMilliseconds: S.Number,
          MaxConcurrency: S.Number,
        }),
      ).annotate({ identifier: "ConcurrentExecutorConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Runtime: S.String,
          Output: S.optional(__mapOf__string),
          FunctionList: __listOfFunctionsRef,
          TimeoutMilliseconds: S.Number,
        }),
      ).annotate({ identifier: "SequentialExecutorConfiguration" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          FunctionId: S.String,
          FunctionType: S.String,
          Description: S.optional(S.String),
          HttpRequestConfiguration: S.optional(__S(864, __c27, 0)),
          AwsServiceRequestConfiguration: S.optional(__S(865, __c27, 1)),
          CustomOutputConfiguration: S.optional(__S(866, __c27, 2)),
          ConcurrentExecutorConfiguration: S.optional(__S(869, __c27, 5)),
          SequentialExecutorConfiguration: S.optional(__S(870, __c27, 6)),
          VastRequestConfiguration: S.optional(__S(864, __c27, 0)),
          Tags: S.optional(__mapOf__string),
          Arn: S.optional(S.String),
        }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "GetFunctionResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/playbackConfiguration/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPlaybackConfigurationRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Mode: S.optional(S.String),
          Value: S.optional(S.String),
          FillPolicy: S.optional(S.String),
        }),
      ).annotate({ identifier: "AvailSuppression" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EndUrl: S.optional(S.String), StartUrl: S.optional(S.String) }),
      ).annotate({ identifier: "Bumper" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AdSegmentUrlPrefix: S.optional(S.String),
          ContentSegmentUrlPrefix: S.optional(S.String),
        }),
      ).annotate({ identifier: "CdnConfiguration" });
    case 3:
      return S.Record(S.String, /*@__PURE__*/ __mapOf__string.pipe(S.optional));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ManifestEndpointPrefix: S.optional(S.String),
          DualStackManifestEndpointPrefix: S.optional(S.String),
          MpdLocation: S.optional(S.String),
          OriginManifestType: S.optional(S.String),
        }),
      ).annotate({ identifier: "DashConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          ManifestEndpointPrefix: S.optional(S.String),
          DualStackManifestEndpointPrefix: S.optional(S.String),
        }),
      ).annotate({ identifier: "HlsConfiguration" });
    case 6:
      return S.suspend(() => S.Struct({ AdSequencingMode: S.optional(S.String) })).annotate({
        identifier: "PreRollVastResponse",
      });
    case 7:
      return S.suspend(() => S.Struct({ VastResponse: S.optional(__S(934, __c29, 6)) })).annotate({
        identifier: "PreRollAdDecisionServerConfiguration",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          AdDecisionServerUrl: S.optional(S.String),
          MaxDurationSeconds: S.optional(S.Number),
          AdDecisionServerConfiguration: S.optional(__S(935, __c29, 7)),
        }),
      ).annotate({ identifier: "LivePreRollConfiguration" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          PercentEnabled: S.Number,
          EnabledLoggingStrategies: S.optional(__listOfLoggingStrategies),
          AdsInteractionLog: S.optional(__S(1760, __c55, 0)),
          ManifestServiceInteractionLog: S.optional(__S(1760, __c55, 0)),
        }),
      ).annotate({ identifier: "LogConfiguration" });
    case 10:
      return S.suspend(() => S.Struct({ Enabled: S.optional(S.Boolean) })).annotate({
        identifier: "AdMarkerPassthrough",
      });
    case 11:
      return S.suspend(() =>
        S.Struct({ AdMarkerPassthrough: S.optional(__S(938, __c29, 10)) }),
      ).annotate({ identifier: "ManifestProcessingRules" });
    case 12:
      return S.suspend(() => S.Struct({ StreamingMediaFileConditioning: S.String })).annotate({
        identifier: "AdConditioningConfiguration",
      });
    case 13:
      return S.suspend(() =>
        S.Struct({
          Method: S.optional(S.String),
          Body: S.optional(S.String),
          Headers: S.optional(StringMap),
          CompressRequest: S.optional(S.String),
        }),
      ).annotate({ identifier: "HttpRequest" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          HttpRequest: S.optional(__S(941, __c29, 13)),
          VastResponse: S.optional(__S(934, __c29, 6)),
        }),
      ).annotate({ identifier: "AdDecisionServerConfiguration" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          MinimumUnfilledDuration: S.Number,
          PublisherId: S.String,
          Region: S.String,
          OpenRtbTemplate: S.String,
        }),
      ).annotate({ identifier: "YieldOptimizationConfiguration" });
    case 16:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 17:
      return S.suspend(() =>
        S.Struct({
          AdsRequestTimeoutMilliseconds: S.optional(S.Number),
          LiveMaximumAdsPersonalizationTimeMilliseconds: S.optional(S.Number),
          VodMaximumAdsPersonalizationTimeMilliseconds: S.optional(S.Number),
          PrefetchAdsRequestTimeoutMilliseconds: S.optional(S.Number),
          PrefetchMaximumAdsPersonalizationTimeMilliseconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AdsPersonalizationTimeouts" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          MaxConcurrentAdsRequests: S.optional(S.Number),
          EnableVodVastParallelization: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AdsPersonalizationConcurrency" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          ReportingMode: S.String,
          AdditionalEventTypes: S.optional(__S(1600, __c50, 0)),
        }),
      ).annotate({ identifier: "ClientSideBeaconingConfiguration" });
    case 20:
      return S.suspend(() => S.Struct({ ClientSide: S.optional(__S(947, __c29, 19)) })).annotate({
        identifier: "BeaconingConfiguration",
      });
    case 21:
      return S.suspend(() =>
        S.Struct({
          AdDecisionServerUrl: S.optional(S.String),
          AvailSuppression: S.optional(__S(928, __c29, 0)),
          Bumper: S.optional(__S(929, __c29, 1)),
          CdnConfiguration: S.optional(__S(930, __c29, 2)),
          ConfigurationAliases: S.optional(__S(931, __c29, 3)),
          DashConfiguration: S.optional(__S(932, __c29, 4)),
          HlsConfiguration: S.optional(__S(933, __c29, 5)),
          InsertionMode: S.optional(S.String),
          LivePreRollConfiguration: S.optional(__S(936, __c29, 8)),
          LogConfiguration: S.optional(__S(937, __c29, 9)),
          ManifestProcessingRules: S.optional(__S(939, __c29, 11)),
          Name: S.optional(S.String),
          PersonalizationThresholdSeconds: S.optional(S.Number),
          PlaybackConfigurationArn: S.optional(S.String),
          PlaybackEndpointPrefix: S.optional(S.String),
          DualStackPlaybackEndpointPrefix: S.optional(S.String),
          SessionInitializationEndpointPrefix: S.optional(S.String),
          DualStackSessionInitializationEndpointPrefix: S.optional(S.String),
          SlateAdUrl: S.optional(S.String),
          Tags: S.optional(__mapOf__string),
          TranscodeProfileName: S.optional(S.String),
          VideoContentSourceUrl: S.optional(S.String),
          AdConditioningConfiguration: S.optional(__S(940, __c29, 12)),
          AdDecisionServerConfiguration: S.optional(__S(942, __c29, 14)),
          YieldOptimizationConfiguration: S.optional(__S(943, __c29, 15)),
          FunctionMapping: S.optional(__S(944, __c29, 16)),
          AdsPersonalizationTimeouts: S.optional(__S(945, __c29, 17)),
          AdsPersonalizationConcurrency: S.optional(__S(946, __c29, 18)),
          BeaconingConfiguration: S.optional(__S(948, __c29, 20)),
        }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "GetPlaybackConfigurationResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          PlaybackConfigurationName: S.String.pipe(T.HttpLabel("PlaybackConfigurationName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prefetchSchedule/{PlaybackConfigurationName}/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPrefetchScheduleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Consumption: S.optional(__S(2146, __c67, 2)),
          Name: S.optional(S.String),
          PlaybackConfigurationName: S.optional(S.String),
          Retrieval: S.optional(__S(2149, __c67, 5)),
          ScheduleType: S.optional(S.String),
          RecurringPrefetchConfiguration: S.optional(__S(2152, __c67, 8)),
          StreamId: S.optional(S.String),
          Tags: S.optional(__mapOf__string),
        }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "GetPrefetchScheduleResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          ResourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/alerts" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAlertsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AlertCode: S.String,
          AlertMessage: S.String,
          LastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          RelatedResourceArns: __listOf__string,
          ResourceArn: S.String,
          Category: S.optional(S.String),
        }),
      ).annotate({ identifier: "Alert" });
    case 2:
      return S.Array(__S(993, __c31, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__listOfAlert), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAlertsResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/channels" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListChannelsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          ChannelName: S.String,
          ChannelState: S.String,
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FillerSlate: S.optional(__S(1824, __c57, 0)),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Outputs: __S(1891, __c59, 3),
          PlaybackMode: S.String,
          Tags: S.optional(__mapOf__string),
          Tier: S.String,
          LogConfiguration: __S(608, __c19, 0),
          Audiences: S.optional(__S(1856, __c58, 0)),
        }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "Channel" });
    case 2:
      return S.Array(__S(1025, __c32, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__listOfChannel), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListChannelsResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/functions" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFunctionsRequest" });
    case 1:
      return S.Array(__S(871, __c27, 7));
    case 2:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__listOfFunctionsResponse), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFunctionsResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          SourceLocationName: S.String.pipe(T.HttpLabel("SourceLocationName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/sourceLocation/{SourceLocationName}/liveSources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListLiveSourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          HttpPackageConfigurations: __S(2049, __c64, 1),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LiveSourceName: S.String,
          SourceLocationName: S.String,
          Tags: S.optional(__mapOf__string),
        }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "LiveSource" });
    case 2:
      return S.Array(__S(1089, __c34, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__listOfLiveSource), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListLiveSourcesResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/playbackConfigurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPlaybackConfigurationsRequest" });
    case 1:
      return S.Array(__S(949, __c29, 21));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Items: S.optional(__listOfPlaybackConfiguration),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPlaybackConfigurationsResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          PlaybackConfigurationName: S.String.pipe(T.HttpLabel("PlaybackConfigurationName")),
          ScheduleType: S.optional(S.String),
          StreamId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/prefetchSchedule/{PlaybackConfigurationName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPrefetchSchedulesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Consumption: S.optional(__S(2146, __c67, 2)),
          Name: S.String,
          PlaybackConfigurationName: S.String,
          Retrieval: S.optional(__S(2149, __c67, 5)),
          ScheduleType: S.optional(S.String),
          RecurringPrefetchConfiguration: S.optional(__S(2152, __c67, 8)),
          StreamId: S.optional(S.String),
          Tags: S.optional(__mapOf__string),
        }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "PrefetchSchedule" });
    case 2:
      return S.Array(__S(1153, __c36, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__listOfPrefetchSchedule), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPrefetchSchedulesResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/sourceLocations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSourceLocationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccessConfiguration: S.optional(__S(129, __c4, 1)),
          Arn: S.String,
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DefaultSegmentDeliveryConfiguration: S.optional(__S(130, __c4, 2)),
          HttpConfiguration: __S(131, __c4, 3),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SegmentDeliveryConfigurations: S.optional(__listOfSegmentDeliveryConfiguration),
          SourceLocationName: S.String,
          Tags: S.optional(__mapOf__string),
        }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "SourceLocation" });
    case 2:
      return S.Array(__S(1185, __c37, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__listOfSourceLocation), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSourceLocationsResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__mapOf__string) }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          SourceLocationName: S.String.pipe(T.HttpLabel("SourceLocationName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/sourceLocation/{SourceLocationName}/vodSources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListVodSourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          HttpPackageConfigurations: __S(2049, __c64, 1),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SourceLocationName: S.String,
          Tags: S.optional(__mapOf__string),
          VodSourceName: S.String,
        }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "VodSource" });
    case 2:
      return S.Array(__S(1249, __c39, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__listOfVodSource), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListVodSourcesResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChannelName: S.String.pipe(T.HttpLabel("ChannelName")), Policy: S.String }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/channel/{ChannelName}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutChannelPolicyRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionId: S.String.pipe(T.HttpLabel("FunctionId")),
          FunctionType: S.String,
          Description: S.optional(S.String),
          HttpRequestConfiguration: S.optional(__S(864, __c27, 0)),
          AwsServiceRequestConfiguration: S.optional(__S(865, __c27, 1)),
          CustomOutputConfiguration: S.optional(__S(866, __c27, 2)),
          ConcurrentExecutorConfiguration: S.optional(__S(869, __c27, 5)),
          SequentialExecutorConfiguration: S.optional(__S(870, __c27, 6)),
          VastRequestConfiguration: S.optional(__S(864, __c27, 0)),
          Tags: S.optional(__mapOf__string),
        })
          .pipe(S.encodeKeys({ Tags: "tags" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/function/{FunctionId}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "PutFunctionRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MpdLocation: S.optional(S.String), OriginManifestType: S.optional(S.String) }),
      ).annotate({ identifier: "DashConfigurationForPut" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AdDecisionServerUrl: S.optional(S.String),
          AvailSuppression: S.optional(__S(928, __c29, 0)),
          Bumper: S.optional(__S(929, __c29, 1)),
          CdnConfiguration: S.optional(__S(930, __c29, 2)),
          ConfigurationAliases: S.optional(__S(931, __c29, 3)),
          DashConfiguration: S.optional(__S(1344, __c42, 0)),
          InsertionMode: S.optional(S.String),
          LivePreRollConfiguration: S.optional(__S(936, __c29, 8)),
          ManifestProcessingRules: S.optional(__S(939, __c29, 11)),
          Name: S.String,
          PersonalizationThresholdSeconds: S.optional(S.Number),
          SlateAdUrl: S.optional(S.String),
          Tags: S.optional(__mapOf__string),
          TranscodeProfileName: S.optional(S.String),
          VideoContentSourceUrl: S.optional(S.String),
          AdConditioningConfiguration: S.optional(__S(940, __c29, 12)),
          AdDecisionServerConfiguration: S.optional(__S(942, __c29, 14)),
          YieldOptimizationConfiguration: S.optional(__S(943, __c29, 15)),
          FunctionMapping: S.optional(__S(944, __c29, 16)),
          AdsPersonalizationTimeouts: S.optional(__S(945, __c29, 17)),
          AdsPersonalizationConcurrency: S.optional(__S(946, __c29, 18)),
          BeaconingConfiguration: S.optional(__S(948, __c29, 20)),
        })
          .pipe(S.encodeKeys({ Tags: "tags" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/playbackConfiguration" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "PutPlaybackConfigurationRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChannelName: S.String.pipe(T.HttpLabel("ChannelName")) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/channel/{ChannelName}/start" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartChannelRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChannelName: S.String.pipe(T.HttpLabel("ChannelName")) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/channel/{ChannelName}/stop" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopChannelRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")), Tags: __mapOf__string })
          .pipe(S.encodeKeys({ Tags: "tags" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
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
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: __listOf__string.pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
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
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
          FillerSlate: S.optional(__S(1824, __c57, 0)),
          Outputs: __S(1953, __c61, 1),
          TimeShiftConfiguration: S.optional(__S(1920, __c60, 0)),
          Audiences: S.optional(__S(1856, __c58, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/channel/{ChannelName}" }),
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
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HttpPackageConfigurations: __S(2049, __c64, 1),
          LiveSourceName: S.String.pipe(T.HttpLabel("LiveSourceName")),
          SourceLocationName: S.String.pipe(T.HttpLabel("SourceLocationName")),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/sourceLocation/{SourceLocationName}/liveSource/{LiveSourceName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateLiveSourceRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChannelName: S.String, LogTypes: __S(1600, __c50, 0) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/configureLogs/channel" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ConfigureLogsForChannelRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ChannelName: S.optional(S.String), LogTypes: S.optional(__S(1600, __c50, 0)) }),
      ).annotate({ identifier: "ConfigureLogsForChannelResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ScheduledStartTimeMillis: S.optional(S.Number),
          DurationMillis: S.optional(S.Number),
        }),
      ).annotate({ identifier: "UpdateProgramTransition" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Transition: S.optional(__S(1632, __c51, 0)),
          ClipRange: S.optional(__S(72, __c2, 8)),
        }),
      ).annotate({ identifier: "UpdateProgramScheduleConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AdBreaks: S.optional(__listOfAdBreak),
          ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
          ProgramName: S.String.pipe(T.HttpLabel("ProgramName")),
          ScheduleConfiguration: __S(1633, __c51, 1),
          AudienceMedia: S.optional(__listOfAudienceMedia),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/channel/{ChannelName}/program/{ProgramName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateProgramRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AdBreaks: S.optional(__listOfAdBreak),
          Arn: S.optional(S.String),
          ChannelName: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ProgramName: S.optional(S.String),
          SourceLocationName: S.optional(S.String),
          VodSourceName: S.optional(S.String),
          LiveSourceName: S.optional(S.String),
          ClipRange: S.optional(__S(72, __c2, 8)),
          DurationMillis: S.optional(S.Number),
          ScheduledStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AudienceMedia: S.optional(__listOfAudienceMedia),
          Tags: S.optional(__mapOf__string),
        }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "UpdateProgramResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccessConfiguration: S.optional(__S(129, __c4, 1)),
          DefaultSegmentDeliveryConfiguration: S.optional(__S(130, __c4, 2)),
          HttpConfiguration: __S(131, __c4, 3),
          SegmentDeliveryConfigurations: S.optional(__listOfSegmentDeliveryConfiguration),
          SourceLocationName: S.String.pipe(T.HttpLabel("SourceLocationName")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/sourceLocation/{SourceLocationName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSourceLocationRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HttpPackageConfigurations: __S(2049, __c64, 1),
          SourceLocationName: S.String.pipe(T.HttpLabel("SourceLocationName")),
          VodSourceName: S.String.pipe(T.HttpLabel("VodSourceName")),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/sourceLocation/{SourceLocationName}/vodSource/{VodSourceName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateVodSourceRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PercentEnabled: S.Number,
          PlaybackConfigurationName: S.String,
          EnabledLoggingStrategies: S.optional(__listOfLoggingStrategies),
          AdsInteractionLog: S.optional(__S(1760, __c55, 0)),
          ManifestServiceInteractionLog: S.optional(__S(1760, __c55, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/configureLogs/playbackConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ConfigureLogsForPlaybackConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PercentEnabled: S.Number,
          PlaybackConfigurationName: S.optional(S.String),
          EnabledLoggingStrategies: S.optional(__listOfLoggingStrategies),
          AdsInteractionLog: S.optional(__S(1760, __c55, 0)),
          ManifestServiceInteractionLog: S.optional(__S(1760, __c55, 0)),
        }),
      ).annotate({ identifier: "ConfigureLogsForPlaybackConfigurationResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PublishOptInEventTypes: S.optional(__adsInteractionPublishOptInEventTypesList),
          ExcludeEventTypes: S.optional(__adsInteractionExcludeEventTypesList),
        }),
      ).annotate({ identifier: "AdsInteractionLog" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
          FillerSlate: S.optional(__S(1824, __c57, 0)),
          Outputs: __S(1953, __c61, 1),
          PlaybackMode: S.String,
          Tags: S.optional(__mapOf__string),
          Tier: S.optional(S.String),
          TimeShiftConfiguration: S.optional(__S(1920, __c60, 0)),
          Audiences: S.optional(__S(1856, __c58, 0)),
        })
          .pipe(S.encodeKeys({ Tags: "tags" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/channel/{ChannelName}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateChannelRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SourceLocationName: S.optional(S.String), VodSourceName: S.optional(S.String) }),
      ).annotate({ identifier: "SlateSource" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ManifestWindowSeconds: S.optional(S.Number),
          MinBufferTimeSeconds: S.optional(S.Number),
          MinUpdatePeriodSeconds: S.optional(S.Number),
          SuggestedPresentationDelaySeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DashPlaylistSettings" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ManifestWindowSeconds: S.optional(S.Number),
          AdMarkupType: S.optional(__S(1600, __c50, 0)),
        }),
      ).annotate({ identifier: "HlsPlaylistSettings" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DashPlaylistSettings: S.optional(__S(1888, __c59, 0)),
          HlsPlaylistSettings: S.optional(__S(1889, __c59, 1)),
          ManifestName: S.String,
          PlaybackUrl: S.String,
          DualStackPlaybackUrl: S.optional(S.String),
          SourceGroup: S.String,
        }),
      ).annotate({ identifier: "ResponseOutputItem" });
    case 3:
      return S.Array(__S(1890, __c59, 2));
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ MaxTimeDelaySeconds: S.Number })).annotate({
        identifier: "TimeShiftConfiguration",
      });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DashPlaylistSettings: S.optional(__S(1888, __c59, 0)),
          HlsPlaylistSettings: S.optional(__S(1889, __c59, 1)),
          ManifestName: S.String,
          SourceGroup: S.String,
        }),
      ).annotate({ identifier: "RequestOutputItem" });
    case 1:
      return S.Array(__S(1952, __c61, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          ChannelName: S.optional(S.String),
          ChannelState: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FillerSlate: S.optional(__S(1824, __c57, 0)),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Outputs: S.optional(__S(1891, __c59, 3)),
          PlaybackMode: S.optional(S.String),
          Tags: S.optional(__mapOf__string),
          Tier: S.optional(S.String),
          TimeShiftConfiguration: S.optional(__S(1920, __c60, 0)),
          Audiences: S.optional(__S(1856, __c58, 0)),
        }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "CreateChannelResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HttpPackageConfigurations: __S(2049, __c64, 1),
          LiveSourceName: S.String.pipe(T.HttpLabel("LiveSourceName")),
          SourceLocationName: S.String.pipe(T.HttpLabel("SourceLocationName")),
          Tags: S.optional(__mapOf__string),
        })
          .pipe(S.encodeKeys({ Tags: "tags" }))
          .pipe(
            T.all(
              T.Http({
                method: "POST",
                uri: "/sourceLocation/{SourceLocationName}/liveSource/{LiveSourceName}",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateLiveSourceRequest" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Path: S.String, SourceGroup: S.String, Type: S.String }),
      ).annotate({ identifier: "HttpPackageConfiguration" });
    case 1:
      return S.Array(__S(2048, __c64, 0));
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          HttpPackageConfigurations: S.optional(__S(2049, __c64, 1)),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LiveSourceName: S.optional(S.String),
          SourceLocationName: S.optional(S.String),
          Tags: S.optional(__mapOf__string),
        }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "CreateLiveSourceResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Consumption: S.optional(__S(2146, __c67, 2)),
          Name: S.String.pipe(T.HttpLabel("Name")),
          PlaybackConfigurationName: S.String.pipe(T.HttpLabel("PlaybackConfigurationName")),
          Retrieval: S.optional(__S(2149, __c67, 5)),
          RecurringPrefetchConfiguration: S.optional(__S(2152, __c67, 8)),
          ScheduleType: S.optional(S.String),
          StreamId: S.optional(S.String),
          Tags: S.optional(__mapOf__string),
        })
          .pipe(S.encodeKeys({ Tags: "tags" }))
          .pipe(
            T.all(
              T.Http({
                method: "POST",
                uri: "/prefetchSchedule/{PlaybackConfigurationName}/{Name}",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreatePrefetchScheduleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Consumption: S.optional(__S(2146, __c67, 2)),
          Name: S.optional(S.String),
          PlaybackConfigurationName: S.optional(S.String),
          Retrieval: S.optional(__S(2149, __c67, 5)),
          RecurringPrefetchConfiguration: S.optional(__S(2152, __c67, 8)),
          ScheduleType: S.optional(S.String),
          StreamId: S.optional(S.String),
          Tags: S.optional(__mapOf__string),
        }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "CreatePrefetchScheduleResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ DynamicVariable: S.String, Operator: S.String })).annotate({
        identifier: "AvailMatchingCriteria",
      });
    case 1:
      return S.Array(__S(2144, __c67, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          AvailMatchingCriteria: S.optional(__listOfAvailMatchingCriteria),
          EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "PrefetchConsumption" });
    case 3:
      return S.suspend(() =>
        S.Struct({ RetrievalWindowDurationSeconds: S.optional(S.Number) }),
      ).annotate({ identifier: "TrafficShapingRetrievalWindow" });
    case 4:
      return S.suspend(() =>
        S.Struct({ PeakTps: S.optional(S.Number), PeakConcurrentUsers: S.optional(S.Number) }),
      ).annotate({ identifier: "TrafficShapingTpsConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          DynamicVariables: S.optional(__mapOf__string),
          EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TrafficShapingType: S.optional(S.String),
          TrafficShapingRetrievalWindow: S.optional(__S(2147, __c67, 3)),
          TrafficShapingTpsConfiguration: S.optional(__S(2148, __c67, 4)),
        }),
      ).annotate({ identifier: "PrefetchRetrieval" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          RetrievedAdExpirationSeconds: S.optional(S.Number),
          AvailMatchingCriteria: S.optional(__listOfAvailMatchingCriteria),
        }),
      ).annotate({ identifier: "RecurringConsumption" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          DynamicVariables: S.optional(__mapOf__string),
          DelayAfterAvailEndSeconds: S.optional(S.Number),
          TrafficShapingType: S.optional(S.String),
          TrafficShapingRetrievalWindow: S.optional(__S(2147, __c67, 3)),
          TrafficShapingTpsConfiguration: S.optional(__S(2148, __c67, 4)),
        }),
      ).annotate({ identifier: "RecurringRetrieval" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          RecurringConsumption: __S(2150, __c67, 6),
          RecurringRetrieval: __S(2151, __c67, 7),
        }),
      ).annotate({ identifier: "RecurringPrefetchConfiguration" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
