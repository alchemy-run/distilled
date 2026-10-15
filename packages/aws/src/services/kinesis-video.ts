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
const ns = /*@__PURE__*/ T.XmlNamespace("https://kinesisvideo.amazonaws.com/doc/2017-09-30/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Kinesis Video",
  serviceShapeName: "KinesisVideo_20170930",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "kinesisvideo" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-09-30");
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
              `https://kinesisvideo-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://kinesisvideo-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://kinesisvideo.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://kinesisvideo.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://kinesisvideo.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class AccountChannelLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<AccountChannelLimitExceededException>()(
    "AccountChannelLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class AccountStreamLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<AccountStreamLimitExceededException>()(
    "AccountStreamLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ClientLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ClientLimitExceededException>()(
    "ClientLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class DeviceStreamLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<DeviceStreamLimitExceededException>()(
    "DeviceStreamLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidArgumentException
  extends /*@__PURE__*/ S.TaggedError<InvalidArgumentException>()(
    "InvalidArgumentException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidDeviceException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeviceException>()(
    "InvalidDeviceException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidResourceFormatException
  extends /*@__PURE__*/ S.TaggedError<InvalidResourceFormatException>()(
    "InvalidResourceFormatException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NoDataRetentionException
  extends /*@__PURE__*/ S.TaggedError<NoDataRetentionException>()(
    "NoDataRetentionException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NotAuthorizedException
  extends /*@__PURE__*/ S.TaggedError<NotAuthorizedException>()(
    "NotAuthorizedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class StreamEdgeConfigurationNotFoundException
  extends /*@__PURE__*/ S.TaggedError<StreamEdgeConfigurationNotFoundException>()(
    "StreamEdgeConfigurationNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class StreamNotActive
  extends /*@__PURE__*/ S.TaggedError<StreamNotActive>()(
    "StreamNotActive",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "ResourceNotFoundException",
      message: { includes: "not active" },
    }),
  ).pipe(C.withConflictError, C.withRetryableError) {}
export class TagsPerResourceExceededLimitException
  extends /*@__PURE__*/ S.TaggedError<TagsPerResourceExceededLimitException>()(
    "TagsPerResourceExceededLimitException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class VersionMismatchException
  extends /*@__PURE__*/ S.TaggedError<VersionMismatchException>()(
    "VersionMismatchException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ChannelName = string;
export type ChannelType = "SINGLE_MASTER" | "FULL_MESH" | (string & {});
export type MessageTtlSeconds = number;
export interface SingleMasterConfiguration {
  MessageTtlSeconds?: number;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagOnCreateList = Tag[];
export interface CreateSignalingChannelInput {
  ChannelName: string;
  ChannelType?: ChannelType;
  SingleMasterConfiguration?: SingleMasterConfiguration;
  Tags?: Tag[];
}
export type ResourceARN = string;
export interface CreateSignalingChannelOutput {
  ChannelARN?: string;
}
export type DeviceName = string;
export type StreamName = string;
export type MediaType = string;
export type KmsKeyId = string;
export type DataRetentionInHours = number;
export type ResourceTags = { [key: string]: string | undefined };
export type DefaultStorageTier = "HOT" | "WARM" | (string & {});
export interface StreamStorageConfiguration {
  DefaultStorageTier: DefaultStorageTier;
}
export interface CreateStreamInput {
  DeviceName?: string;
  StreamName: string;
  MediaType?: string;
  KmsKeyId?: string;
  DataRetentionInHours?: number;
  Tags?: { [key: string]: string | undefined };
  StreamStorageConfiguration?: StreamStorageConfiguration;
}
export interface CreateStreamOutput {
  StreamARN?: string;
}
export interface DeleteEdgeConfigurationInput {
  StreamName?: string;
  StreamARN?: string;
}
export interface DeleteEdgeConfigurationOutput {}
export type Version = string;
export interface DeleteSignalingChannelInput {
  ChannelARN: string;
  CurrentVersion?: string;
}
export interface DeleteSignalingChannelOutput {}
export interface DeleteStreamInput {
  StreamARN: string;
  CurrentVersion?: string;
}
export interface DeleteStreamOutput {}
export interface DescribeEdgeConfigurationInput {
  StreamName?: string;
  StreamARN?: string;
}
export type SyncStatus =
  | "SYNCING"
  | "ACKNOWLEDGED"
  | "IN_SYNC"
  | "SYNC_FAILED"
  | "DELETING"
  | "DELETE_FAILED"
  | "DELETING_ACKNOWLEDGED"
  | (string & {});
export type FailedStatusDetails = string;
export type HubDeviceArn = string;
export type MediaUriSecretArn = string | redacted.Redacted<string>;
export type MediaUriType = "RTSP_URI" | "FILE_URI" | (string & {});
export interface MediaSourceConfig {
  MediaUriSecretArn: string | redacted.Redacted<string>;
  MediaUriType: MediaUriType;
}
export type ScheduleExpression = string;
export type DurationInSeconds = number;
export interface ScheduleConfig {
  ScheduleExpression: string;
  DurationInSeconds: number;
}
export interface RecorderConfig {
  MediaSourceConfig: MediaSourceConfig;
  ScheduleConfig?: ScheduleConfig;
}
export interface UploaderConfig {
  ScheduleConfig: ScheduleConfig;
}
export type EdgeRetentionInHours = number;
export type MaxLocalMediaSizeInMB = number;
export type StrategyOnFullSize = "DELETE_OLDEST_MEDIA" | "DENY_NEW_MEDIA" | (string & {});
export interface LocalSizeConfig {
  MaxLocalMediaSizeInMB?: number;
  StrategyOnFullSize?: StrategyOnFullSize;
}
export type DeleteAfterUpload = boolean;
export interface DeletionConfig {
  EdgeRetentionInHours?: number;
  LocalSizeConfig?: LocalSizeConfig;
  DeleteAfterUpload?: boolean;
}
export interface EdgeConfig {
  HubDeviceArn: string;
  RecorderConfig: RecorderConfig;
  UploaderConfig?: UploaderConfig;
  DeletionConfig?: DeletionConfig;
}
export type JobStatusDetails = string;
export type RecorderStatus = "SUCCESS" | "USER_ERROR" | "SYSTEM_ERROR" | (string & {});
export interface LastRecorderStatus {
  JobStatusDetails?: string;
  LastCollectedTime?: Date;
  LastUpdatedTime?: Date;
  RecorderStatus?: RecorderStatus;
}
export type UploaderStatus = "SUCCESS" | "USER_ERROR" | "SYSTEM_ERROR" | (string & {});
export interface LastUploaderStatus {
  JobStatusDetails?: string;
  LastCollectedTime?: Date;
  LastUpdatedTime?: Date;
  UploaderStatus?: UploaderStatus;
}
export interface EdgeAgentStatus {
  LastRecorderStatus?: LastRecorderStatus;
  LastUploaderStatus?: LastUploaderStatus;
}
export interface DescribeEdgeConfigurationOutput {
  StreamName?: string;
  StreamARN?: string;
  CreationTime?: Date;
  LastUpdatedTime?: Date;
  SyncStatus?: SyncStatus;
  FailedStatusDetails?: string;
  EdgeConfig?: EdgeConfig;
  EdgeAgentStatus?: EdgeAgentStatus;
}
export interface DescribeImageGenerationConfigurationInput {
  StreamName?: string;
  StreamARN?: string;
}
export type ConfigurationStatus = "ENABLED" | "DISABLED" | (string & {});
export type ImageSelectorType = "SERVER_TIMESTAMP" | "PRODUCER_TIMESTAMP" | (string & {});
export type DestinationUri = string;
export type DestinationRegion = string;
export interface ImageGenerationDestinationConfig {
  Uri: string;
  DestinationRegion: string;
}
export type SamplingInterval = number;
export type Format = "JPEG" | "PNG" | (string & {});
export type FormatConfigKey = "JPEGQuality" | (string & {});
export type FormatConfigValue = string;
export type FormatConfig = { [key in FormatConfigKey]?: string };
export type WidthPixels = number;
export type HeightPixels = number;
export interface ImageGenerationConfiguration {
  Status: ConfigurationStatus;
  ImageSelectorType: ImageSelectorType;
  DestinationConfig: ImageGenerationDestinationConfig;
  SamplingInterval: number;
  Format: Format;
  FormatConfig?: { [key: string]: string | undefined };
  WidthPixels?: number;
  HeightPixels?: number;
}
export interface DescribeImageGenerationConfigurationOutput {
  ImageGenerationConfiguration?: ImageGenerationConfiguration;
}
export type MappedResourceConfigurationListLimit = number;
export type NextToken = string;
export interface DescribeMappedResourceConfigurationInput {
  StreamName?: string;
  StreamARN?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type Type = string;
export interface MappedResourceConfigurationListItem {
  Type?: string;
  ARN?: string;
}
export type MappedResourceConfigurationList = MappedResourceConfigurationListItem[];
export interface DescribeMappedResourceConfigurationOutput {
  MappedResourceConfigurationList?: MappedResourceConfigurationListItem[];
  NextToken?: string;
}
export interface DescribeMediaStorageConfigurationInput {
  ChannelName?: string;
  ChannelARN?: string;
}
export type MediaStorageConfigurationStatus = "ENABLED" | "DISABLED" | (string & {});
export interface MediaStorageConfiguration {
  StreamARN?: string;
  Status: MediaStorageConfigurationStatus;
}
export interface DescribeMediaStorageConfigurationOutput {
  MediaStorageConfiguration?: MediaStorageConfiguration;
}
export interface DescribeNotificationConfigurationInput {
  StreamName?: string;
  StreamARN?: string;
}
export interface NotificationDestinationConfig {
  Uri: string;
}
export interface NotificationConfiguration {
  Status: ConfigurationStatus;
  DestinationConfig: NotificationDestinationConfig;
}
export interface DescribeNotificationConfigurationOutput {
  NotificationConfiguration?: NotificationConfiguration;
}
export interface DescribeSignalingChannelInput {
  ChannelName?: string;
  ChannelARN?: string;
}
export type Status = "CREATING" | "ACTIVE" | "UPDATING" | "DELETING" | (string & {});
export interface ChannelInfo {
  ChannelName?: string;
  ChannelARN?: string;
  ChannelType?: ChannelType;
  ChannelStatus?: Status;
  CreationTime?: Date;
  SingleMasterConfiguration?: SingleMasterConfiguration;
  Version?: string;
}
export interface DescribeSignalingChannelOutput {
  ChannelInfo?: ChannelInfo;
}
export interface DescribeStreamInput {
  StreamName?: string;
  StreamARN?: string;
}
export interface StreamInfo {
  DeviceName?: string;
  StreamName?: string;
  StreamARN?: string;
  MediaType?: string;
  KmsKeyId?: string;
  Version?: string;
  Status?: Status;
  CreationTime?: Date;
  DataRetentionInHours?: number;
}
export interface DescribeStreamOutput {
  StreamInfo?: StreamInfo;
}
export interface DescribeStreamStorageConfigurationInput {
  StreamName?: string;
  StreamARN?: string;
}
export interface DescribeStreamStorageConfigurationOutput {
  StreamName?: string;
  StreamARN?: string;
  StreamStorageConfiguration?: StreamStorageConfiguration;
}
export type APIName =
  | "PUT_MEDIA"
  | "GET_MEDIA"
  | "LIST_FRAGMENTS"
  | "GET_MEDIA_FOR_FRAGMENT_LIST"
  | "GET_HLS_STREAMING_SESSION_URL"
  | "GET_DASH_STREAMING_SESSION_URL"
  | "GET_CLIP"
  | "GET_IMAGES"
  | (string & {});
export interface GetDataEndpointInput {
  StreamName?: string;
  StreamARN?: string;
  APIName: APIName;
}
export type DataEndpoint = string;
export interface GetDataEndpointOutput {
  DataEndpoint?: string;
}
export type ChannelProtocol = "WSS" | "HTTPS" | "WEBRTC" | (string & {});
export type ListOfProtocols = ChannelProtocol[];
export type ChannelRole = "MASTER" | "VIEWER" | (string & {});
export interface SingleMasterChannelEndpointConfiguration {
  Protocols?: ChannelProtocol[];
  Role?: ChannelRole;
}
export interface GetSignalingChannelEndpointInput {
  ChannelARN: string;
  SingleMasterChannelEndpointConfiguration?: SingleMasterChannelEndpointConfiguration;
}
export type ResourceEndpoint = string;
export interface ResourceEndpointListItem {
  Protocol?: ChannelProtocol;
  ResourceEndpoint?: string;
}
export type ResourceEndpointList = ResourceEndpointListItem[];
export interface GetSignalingChannelEndpointOutput {
  ResourceEndpointList?: ResourceEndpointListItem[];
}
export type ListEdgeAgentConfigurationsInputLimit = number;
export interface ListEdgeAgentConfigurationsInput {
  HubDeviceArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListEdgeAgentConfigurationsEdgeConfig {
  StreamName?: string;
  StreamARN?: string;
  CreationTime?: Date;
  LastUpdatedTime?: Date;
  SyncStatus?: SyncStatus;
  FailedStatusDetails?: string;
  EdgeConfig?: EdgeConfig;
}
export type ListEdgeAgentConfigurationsEdgeConfigList = ListEdgeAgentConfigurationsEdgeConfig[];
export interface ListEdgeAgentConfigurationsOutput {
  EdgeConfigs?: ListEdgeAgentConfigurationsEdgeConfig[];
  NextToken?: string;
}
export type ListStreamsInputLimit = number;
export type ComparisonOperator = "BEGINS_WITH" | (string & {});
export interface ChannelNameCondition {
  ComparisonOperator?: ComparisonOperator;
  ComparisonValue?: string;
}
export interface ListSignalingChannelsInput {
  MaxResults?: number;
  NextToken?: string;
  ChannelNameCondition?: ChannelNameCondition;
}
export type ChannelInfoList = ChannelInfo[];
export interface ListSignalingChannelsOutput {
  ChannelInfoList?: ChannelInfo[];
  NextToken?: string;
}
export interface StreamNameCondition {
  ComparisonOperator?: ComparisonOperator;
  ComparisonValue?: string;
}
export interface ListStreamsInput {
  MaxResults?: number;
  NextToken?: string;
  StreamNameCondition?: StreamNameCondition;
}
export type StreamInfoList = StreamInfo[];
export interface ListStreamsOutput {
  StreamInfoList?: StreamInfo[];
  NextToken?: string;
}
export interface ListTagsForResourceInput {
  NextToken?: string;
  ResourceARN: string;
}
export interface ListTagsForResourceOutput {
  NextToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface ListTagsForStreamInput {
  NextToken?: string;
  StreamARN?: string;
  StreamName?: string;
}
export interface ListTagsForStreamOutput {
  NextToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface StartEdgeConfigurationUpdateInput {
  StreamName?: string;
  StreamARN?: string;
  EdgeConfig: EdgeConfig;
}
export interface StartEdgeConfigurationUpdateOutput {
  StreamName?: string;
  StreamARN?: string;
  CreationTime?: Date;
  LastUpdatedTime?: Date;
  SyncStatus?: SyncStatus;
  FailedStatusDetails?: string;
  EdgeConfig?: EdgeConfig;
}
export type TagList = Tag[];
export interface TagResourceInput {
  ResourceARN: string;
  Tags: Tag[];
}
export interface TagResourceOutput {}
export interface TagStreamInput {
  StreamARN?: string;
  StreamName?: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagStreamOutput {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  ResourceARN: string;
  TagKeyList: string[];
}
export interface UntagResourceOutput {}
export interface UntagStreamInput {
  StreamARN?: string;
  StreamName?: string;
  TagKeyList: string[];
}
export interface UntagStreamOutput {}
export type UpdateDataRetentionOperation =
  | "INCREASE_DATA_RETENTION"
  | "DECREASE_DATA_RETENTION"
  | (string & {});
export type DataRetentionChangeInHours = number;
export interface UpdateDataRetentionInput {
  StreamName?: string;
  StreamARN?: string;
  CurrentVersion: string;
  Operation: UpdateDataRetentionOperation;
  DataRetentionChangeInHours: number;
}
export interface UpdateDataRetentionOutput {}
export interface UpdateImageGenerationConfigurationInput {
  StreamName?: string;
  StreamARN?: string;
  ImageGenerationConfiguration?: ImageGenerationConfiguration;
}
export interface UpdateImageGenerationConfigurationOutput {}
export interface UpdateMediaStorageConfigurationInput {
  ChannelARN: string;
  MediaStorageConfiguration: MediaStorageConfiguration;
}
export interface UpdateMediaStorageConfigurationOutput {}
export interface UpdateNotificationConfigurationInput {
  StreamName?: string;
  StreamARN?: string;
  NotificationConfiguration?: NotificationConfiguration;
}
export interface UpdateNotificationConfigurationOutput {}
export interface UpdateSignalingChannelInput {
  ChannelARN: string;
  CurrentVersion: string;
  SingleMasterConfiguration?: SingleMasterConfiguration;
}
export interface UpdateSignalingChannelOutput {}
export interface UpdateStreamInput {
  StreamName?: string;
  StreamARN?: string;
  CurrentVersion: string;
  DeviceName?: string;
  MediaType?: string;
}
export interface UpdateStreamOutput {}
export interface UpdateStreamStorageConfigurationInput {
  StreamName?: string;
  StreamARN?: string;
  CurrentVersion: string;
  StreamStorageConfiguration: StreamStorageConfiguration;
}
export interface UpdateStreamStorageConfigurationOutput {}
export type ErrorMessage = string;
export type CreateSignalingChannelError =
  | AccessDeniedException
  | AccountChannelLimitExceededException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceInUseException
  | TagsPerResourceExceededLimitException
  | CommonErrors;
/**
 * Creates a signaling channel.
 *
 * `CreateSignalingChannel` is an asynchronous operation.
 */
export const createSignalingChannel: API.OperationMethod<
  CreateSignalingChannelInput,
  CreateSignalingChannelOutput,
  CreateSignalingChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateSignalingChannelInput>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateSignalingChannelOutput>,
  errors: [
    AccessDeniedException,
    AccountChannelLimitExceededException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceInUseException,
    TagsPerResourceExceededLimitException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSignalingChannel",
}));

export type CreateStreamError =
  | AccountStreamLimitExceededException
  | ClientLimitExceededException
  | DeviceStreamLimitExceededException
  | InvalidArgumentException
  | InvalidDeviceException
  | ResourceInUseException
  | TagsPerResourceExceededLimitException
  | CommonErrors;
/**
 * Creates a new Kinesis video stream.
 *
 * When you create a new stream, Kinesis Video Streams assigns it a version number.
 * When you change the stream's metadata, Kinesis Video Streams updates the version.
 *
 * `CreateStream` is an asynchronous operation.
 *
 * For information about how the service works, see How it Works.
 *
 * You must have permissions for the `KinesisVideo:CreateStream`
 * action.
 */
export const createStream: API.OperationMethod<
  CreateStreamInput,
  CreateStreamOutput,
  CreateStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<CreateStreamInput>,
  output: __S(25, __c3, 1) as any as S.Schema<CreateStreamOutput>,
  errors: [
    AccountStreamLimitExceededException,
    ClientLimitExceededException,
    DeviceStreamLimitExceededException,
    InvalidArgumentException,
    InvalidDeviceException,
    ResourceInUseException,
    TagsPerResourceExceededLimitException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStream",
}));

export type DeleteEdgeConfigurationError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceNotFoundException
  | StreamEdgeConfigurationNotFoundException
  | CommonErrors;
/**
 * An asynchronous API that deletes a stream's existing edge configuration, as well as the corresponding media from the Edge Agent.
 *
 * When you invoke this API, the sync status is set to `DELETING`. A deletion process starts, in which active edge jobs are stopped and all media is deleted from the edge device. The time to delete varies, depending on the total amount of stored media. If the deletion process fails, the sync status changes to `DELETE_FAILED`. You will need to re-try the deletion.
 *
 * When the deletion process has completed successfully, the edge configuration is no longer accessible.
 */
export const deleteEdgeConfiguration: API.OperationMethod<
  DeleteEdgeConfigurationInput,
  DeleteEdgeConfigurationOutput,
  DeleteEdgeConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<DeleteEdgeConfigurationInput>,
  output: __S(56, __c7, 0) as any as S.Schema<DeleteEdgeConfigurationOutput>,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceNotFoundException,
    StreamEdgeConfigurationNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEdgeConfiguration",
}));

export type DeleteSignalingChannelError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | VersionMismatchException
  | CommonErrors;
/**
 * Deletes a specified signaling channel. `DeleteSignalingChannel` is an
 * asynchronous operation. If you don't specify the channel's current version, the most
 * recent version is deleted.
 */
export const deleteSignalingChannel: API.OperationMethod<
  DeleteSignalingChannelInput,
  DeleteSignalingChannelOutput,
  DeleteSignalingChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<DeleteSignalingChannelInput>,
  output: __S(56, __c7, 0) as any as S.Schema<DeleteSignalingChannelOutput>,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceInUseException,
    ResourceNotFoundException,
    VersionMismatchException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSignalingChannel",
}));

export type DeleteStreamError =
  | ClientLimitExceededException
  | InvalidArgumentException
  | NotAuthorizedException
  | ResourceInUseException
  | ResourceNotFoundException
  | VersionMismatchException
  | CommonErrors;
/**
 * Deletes a Kinesis video stream and the data contained in the stream.
 *
 * This method marks the stream for deletion, and makes the data in the stream
 * inaccessible immediately.
 *
 * To ensure that you have the latest version of the stream before deleting it, you
 * can specify the stream version. Kinesis Video Streams assigns a version to each stream.
 * When you update a stream, Kinesis Video Streams assigns a new version number. To get the
 * latest stream version, use the `DescribeStream` API.
 *
 * This operation requires permission for the `KinesisVideo:DeleteStream`
 * action.
 */
export const deleteStream: API.OperationMethod<
  DeleteStreamInput,
  DeleteStreamOutput,
  DeleteStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<DeleteStreamInput>,
  output: __S(56, __c7, 0) as any as S.Schema<DeleteStreamOutput>,
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    NotAuthorizedException,
    ResourceInUseException,
    ResourceNotFoundException,
    VersionMismatchException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStream",
}));

export type DescribeEdgeConfigurationError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceNotFoundException
  | StreamEdgeConfigurationNotFoundException
  | CommonErrors;
/**
 * Describes a stream's edge configuration that was set using the
 * `StartEdgeConfigurationUpdate` API and the latest status of the edge
 * agent's recorder and uploader jobs. Use this API to get the status of the configuration
 * to determine if the configuration is in sync with the Edge Agent. Use this API to
 * evaluate the health of the Edge Agent.
 */
export const describeEdgeConfiguration: API.OperationMethod<
  DescribeEdgeConfigurationInput,
  DescribeEdgeConfigurationOutput,
  DescribeEdgeConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<DescribeEdgeConfigurationInput>,
  output: __S(84, __c10, 4) as any as S.Schema<DescribeEdgeConfigurationOutput>,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceNotFoundException,
    StreamEdgeConfigurationNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEdgeConfiguration",
}));

export type DescribeImageGenerationConfigurationError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the `ImageGenerationConfiguration` for a given Kinesis video stream.
 */
export const describeImageGenerationConfiguration: API.OperationMethod<
  DescribeImageGenerationConfigurationInput,
  DescribeImageGenerationConfigurationOutput,
  DescribeImageGenerationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<DescribeImageGenerationConfigurationInput>,
  output: __S(97, __c12, 1) as any as S.Schema<DescribeImageGenerationConfigurationOutput>,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImageGenerationConfiguration",
}));

export type DescribeMappedResourceConfigurationError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the most current information about the stream. The `streamName`
 * or `streamARN` should be provided in the input.
 */
export const describeMappedResourceConfiguration: API.PaginatedOperationMethod<
  DescribeMappedResourceConfigurationInput,
  DescribeMappedResourceConfigurationOutput,
  DescribeMappedResourceConfigurationError,
  Credentials | HttpClient.HttpClient,
  MappedResourceConfigurationListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<DescribeMappedResourceConfigurationInput>,
  output: __S(115, __c14, 3) as any as S.Schema<DescribeMappedResourceConfigurationOutput>,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMappedResourceConfiguration",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "MappedResourceConfigurationList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeMediaStorageConfigurationError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the most current information about the channel. Specify the `ChannelName`
 * or `ChannelARN` in the input.
 */
export const describeMediaStorageConfiguration: API.OperationMethod<
  DescribeMediaStorageConfigurationInput,
  DescribeMediaStorageConfigurationOutput,
  DescribeMediaStorageConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<DescribeMediaStorageConfigurationInput>,
  output: __S(121, __c15, 1) as any as S.Schema<DescribeMediaStorageConfigurationOutput>,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMediaStorageConfiguration",
}));

export type DescribeNotificationConfigurationError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the `NotificationConfiguration` for a given Kinesis video stream.
 */
export const describeNotificationConfiguration: API.OperationMethod<
  DescribeNotificationConfigurationInput,
  DescribeNotificationConfigurationOutput,
  DescribeNotificationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<DescribeNotificationConfigurationInput>,
  output: __S(137, __c17, 1) as any as S.Schema<DescribeNotificationConfigurationOutput>,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNotificationConfiguration",
}));

export type DescribeSignalingChannelError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the most current information about the signaling channel. You must specify
 * either the name or the Amazon Resource Name (ARN) of the channel that you want to
 * describe.
 */
export const describeSignalingChannel: API.OperationMethod<
  DescribeSignalingChannelInput,
  DescribeSignalingChannelOutput,
  DescribeSignalingChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<DescribeSignalingChannelInput>,
  output: __S(153, __c19, 1) as any as S.Schema<DescribeSignalingChannelOutput>,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSignalingChannel",
}));

export type DescribeStreamError =
  | ClientLimitExceededException
  | InvalidArgumentException
  | NotAuthorizedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the most current information about the specified stream. You must specify
 * either the `StreamName` or the `StreamARN`.
 */
export const describeStream: API.OperationMethod<
  DescribeStreamInput,
  DescribeStreamOutput,
  DescribeStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<DescribeStreamInput>,
  output: __S(169, __c21, 1) as any as S.Schema<DescribeStreamOutput>,
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    NotAuthorizedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStream",
}));

export type DescribeStreamStorageConfigurationError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the current storage configuration for the specified Kinesis video stream.
 *
 * In the request, you must specify either the `StreamName` or the `StreamARN`.
 *
 * You must have permissions for the `KinesisVideo:DescribeStreamStorageConfiguration` action.
 */
export const describeStreamStorageConfiguration: API.OperationMethod<
  DescribeStreamStorageConfigurationInput,
  DescribeStreamStorageConfigurationOutput,
  DescribeStreamStorageConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<DescribeStreamStorageConfigurationInput>,
  output: __S(185, __c23, 1) as any as S.Schema<DescribeStreamStorageConfigurationOutput>,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStreamStorageConfiguration",
}));

export type GetDataEndpointError =
  | ClientLimitExceededException
  | InvalidArgumentException
  | NotAuthorizedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets an endpoint for a specified stream for either reading or writing. Use this
 * endpoint in your application to read from the specified stream (using the
 * `GetMedia` or `GetMediaForFragmentList` operations) or write
 * to it (using the `PutMedia` operation).
 *
 * The returned endpoint does not have the API name appended. The client needs to
 * add the API name to the returned endpoint.
 *
 * In the request, specify the stream either by `StreamName` or
 * `StreamARN`.
 */
export const getDataEndpoint: API.OperationMethod<
  GetDataEndpointInput,
  GetDataEndpointOutput,
  GetDataEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<GetDataEndpointInput>,
  output: __S(193, __c24, 1) as any as S.Schema<GetDataEndpointOutput>,
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    NotAuthorizedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataEndpoint",
}));

export type GetSignalingChannelEndpointError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Provides an endpoint for the specified signaling channel to send and receive messages.
 * This API uses the `SingleMasterChannelEndpointConfiguration` input parameter,
 * which consists of the `Protocols` and `Role` properties.
 *
 * `Protocols` is used to determine the communication mechanism. For example,
 * if you specify `WSS` as the protocol, this API produces a secure websocket
 * endpoint. If you specify `HTTPS` as the protocol, this API generates an HTTPS
 * endpoint. If you specify `WEBRTC` as the protocol, but the signaling channel isn't
 * configured for ingestion, you will receive the error
 * `InvalidArgumentException`.
 *
 * `Role` determines the messaging permissions. A `MASTER` role
 * results in this API generating an endpoint that a client can use to communicate with any
 * of the viewers on the channel. A `VIEWER` role results in this API generating
 * an endpoint that a client can use to communicate only with a `MASTER`.
 */
export const getSignalingChannelEndpoint: API.OperationMethod<
  GetSignalingChannelEndpointInput,
  GetSignalingChannelEndpointOutput,
  GetSignalingChannelEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(202, __c25, 2) as any as S.Schema<GetSignalingChannelEndpointInput>,
  output: __S(205, __c25, 5) as any as S.Schema<GetSignalingChannelEndpointOutput>,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSignalingChannelEndpoint",
}));

export type ListEdgeAgentConfigurationsError =
  | ClientLimitExceededException
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Returns an array of edge configurations associated with the specified Edge Agent.
 *
 * In the request, you must specify the Edge Agent `HubDeviceArn`.
 */
export const listEdgeAgentConfigurations: API.PaginatedOperationMethod<
  ListEdgeAgentConfigurationsInput,
  ListEdgeAgentConfigurationsOutput,
  ListEdgeAgentConfigurationsError,
  Credentials | HttpClient.HttpClient,
  ListEdgeAgentConfigurationsEdgeConfig
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<ListEdgeAgentConfigurationsInput>,
  output: __S(211, __c26, 3) as any as S.Schema<ListEdgeAgentConfigurationsOutput>,
  errors: [ClientLimitExceededException, InvalidArgumentException, NotAuthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEdgeAgentConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EdgeConfigs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSignalingChannelsError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Returns an array of `ChannelInfo` objects. Each object describes a
 * signaling channel. To retrieve only those channels that satisfy a specific condition,
 * you can specify a `ChannelNameCondition`.
 */
export const listSignalingChannels: API.PaginatedOperationMethod<
  ListSignalingChannelsInput,
  ListSignalingChannelsOutput,
  ListSignalingChannelsError,
  Credentials | HttpClient.HttpClient,
  ChannelInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(216, __c27, 0) as any as S.Schema<ListSignalingChannelsInput>,
  output: __S(218, __c27, 2) as any as S.Schema<ListSignalingChannelsOutput>,
  errors: [AccessDeniedException, ClientLimitExceededException, InvalidArgumentException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSignalingChannels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ChannelInfoList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStreamsError =
  | ClientLimitExceededException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Returns an array of `StreamInfo` objects. Each object describes a
 * stream. To retrieve only streams that satisfy a specific condition, you can specify a
 * `StreamNameCondition`.
 */
export const listStreams: API.PaginatedOperationMethod<
  ListStreamsInput,
  ListStreamsOutput,
  ListStreamsError,
  Credentials | HttpClient.HttpClient,
  StreamInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<ListStreamsInput>,
  output: __S(234, __c29, 2) as any as S.Schema<ListStreamsOutput>,
  errors: [ClientLimitExceededException, InvalidArgumentException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStreams",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "StreamInfoList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of tags associated with the specified signaling channel.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(248, __c31, 0) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTagsForStreamError =
  | ClientLimitExceededException
  | InvalidArgumentException
  | InvalidResourceFormatException
  | NotAuthorizedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of tags associated with the specified stream.
 *
 * In the request, you must specify either the `StreamName` or the
 * `StreamARN`.
 */
export const listTagsForStream: API.OperationMethod<
  ListTagsForStreamInput,
  ListTagsForStreamOutput,
  ListTagsForStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c32, 0) as any as S.Schema<ListTagsForStreamInput>,
  output: __S(248, __c31, 0) as any as S.Schema<ListTagsForStreamOutput>,
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    InvalidResourceFormatException,
    NotAuthorizedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForStream",
}));

export type StartEdgeConfigurationUpdateError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | NoDataRetentionException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * An asynchronous API that updates a stream's existing edge configuration.
 * The Kinesis Video Stream will sync the stream's edge configuration with the Edge Agent IoT Greengrass
 * component that runs on an IoT Hub Device, setup at your premise. The time to sync can vary
 * and depends on the connectivity of the Hub Device.
 * The `SyncStatus` will be updated as the edge configuration is acknowledged,
 * and synced with the Edge Agent.
 *
 * If this API is invoked for the first time, a new edge configuration will be created for the stream,
 * and the sync status will be set to `SYNCING`. You will have to wait for the sync status
 * to reach a terminal state such as: `IN_SYNC`, or `SYNC_FAILED`, before using this API again.
 * If you invoke this API during the syncing process, a `ResourceInUseException` will be thrown.
 * The connectivity of the stream's edge configuration and the Edge Agent will be retried for 15 minutes. After 15 minutes,
 * the status will transition into the `SYNC_FAILED` state.
 *
 * To move an edge configuration from one device to another, use DeleteEdgeConfiguration to delete
 * the current edge configuration. You can then invoke StartEdgeConfigurationUpdate with an updated Hub Device ARN.
 */
export const startEdgeConfigurationUpdate: API.OperationMethod<
  StartEdgeConfigurationUpdateInput,
  StartEdgeConfigurationUpdateOutput,
  StartEdgeConfigurationUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(264, __c33, 0) as any as S.Schema<StartEdgeConfigurationUpdateInput>,
  output: __S(265, __c33, 1) as any as S.Schema<StartEdgeConfigurationUpdateOutput>,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    NoDataRetentionException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartEdgeConfigurationUpdate",
}));

export type TagResourceError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceNotFoundException
  | TagsPerResourceExceededLimitException
  | StreamNotActive
  | CommonErrors;
/**
 * Adds one or more tags to a signaling channel. A *tag* is a
 * key-value pair (the value is optional) that you can define and assign to Amazon Web Services resources.
 * If you specify a tag that already exists, the tag value is replaced with the value that
 * you specify in the request. For more information, see Using Cost Allocation
 * Tags in the Billing and Cost Management and Cost Management User
 * Guide.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c34, 0) as any as S.Schema<TagResourceInput>,
  output: __S(56, __c7, 0) as any as S.Schema<TagResourceOutput>,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceNotFoundException,
    TagsPerResourceExceededLimitException,
    StreamNotActive,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TagStreamError =
  | ClientLimitExceededException
  | InvalidArgumentException
  | InvalidResourceFormatException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TagsPerResourceExceededLimitException
  | StreamNotActive
  | CommonErrors;
/**
 * Adds one or more tags to a stream. A *tag* is a key-value pair
 * (the value is optional) that you can define and assign to Amazon Web Services resources. If you specify
 * a tag that already exists, the tag value is replaced with the value that you specify in
 * the request. For more information, see Using Cost Allocation
 * Tags in the *Billing and Cost Management and Cost Management User Guide*.
 *
 * You must provide either the `StreamName` or the
 * `StreamARN`.
 *
 * This operation requires permission for the `KinesisVideo:TagStream`
 * action.
 *
 * A Kinesis video stream can support up to 50 tags.
 */
export const tagStream: API.OperationMethod<
  TagStreamInput,
  TagStreamOutput,
  TagStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(280, __c35, 0) as any as S.Schema<TagStreamInput>,
  output: __S(56, __c7, 0) as any as S.Schema<TagStreamOutput>,
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    InvalidResourceFormatException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TagsPerResourceExceededLimitException,
    StreamNotActive,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagStream",
}));

export type UntagResourceError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceNotFoundException
  | StreamNotActive
  | CommonErrors;
/**
 * Removes one or more tags from a signaling channel. In the request, specify only a tag
 * key or keys; don't specify the value. If you specify a tag key that does not exist, it's
 * ignored.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c36, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(56, __c7, 0) as any as S.Schema<UntagResourceOutput>,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceNotFoundException,
    StreamNotActive,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UntagStreamError =
  | ClientLimitExceededException
  | InvalidArgumentException
  | InvalidResourceFormatException
  | NotAuthorizedException
  | ResourceNotFoundException
  | StreamNotActive
  | CommonErrors;
/**
 * Removes one or more tags from a stream. In the request, specify only a tag key or
 * keys; don't specify the value. If you specify a tag key that does not exist, it's
 * ignored.
 *
 * In the request, you must provide the `StreamName` or
 * `StreamARN`.
 */
export const untagStream: API.OperationMethod<
  UntagStreamInput,
  UntagStreamOutput,
  UntagStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c38, 0) as any as S.Schema<UntagStreamInput>,
  output: __S(56, __c7, 0) as any as S.Schema<UntagStreamOutput>,
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    InvalidResourceFormatException,
    NotAuthorizedException,
    ResourceNotFoundException,
    StreamNotActive,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagStream",
}));

export type UpdateDataRetentionError =
  | ClientLimitExceededException
  | InvalidArgumentException
  | NotAuthorizedException
  | ResourceInUseException
  | ResourceNotFoundException
  | VersionMismatchException
  | StreamNotActive
  | CommonErrors;
/**
 * Increases or decreases the stream's data retention period by the value that you
 * specify. To indicate whether you want to increase or decrease the data retention period,
 * specify the `Operation` parameter in the request body. In the request, you
 * must specify either the `StreamName` or the `StreamARN`.
 *
 * This operation requires permission for the
 * `KinesisVideo:UpdateDataRetention` action.
 *
 * Changing the data retention period affects the data in the stream as
 * follows:
 *
 * - If the data retention period is increased, existing data is retained for
 * the new retention period. For example, if the data retention period is increased
 * from one hour to seven hours, all existing data is retained for seven
 * hours.
 *
 * - If the data retention period is decreased, existing data is retained for
 * the new retention period. For example, if the data retention period is decreased
 * from seven hours to one hour, all existing data is retained for one hour, and
 * any data older than one hour is deleted immediately.
 */
export const updateDataRetention: API.OperationMethod<
  UpdateDataRetentionInput,
  UpdateDataRetentionOutput,
  UpdateDataRetentionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(312, __c39, 0) as any as S.Schema<UpdateDataRetentionInput>,
  output: __S(56, __c7, 0) as any as S.Schema<UpdateDataRetentionOutput>,
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    NotAuthorizedException,
    ResourceInUseException,
    ResourceNotFoundException,
    VersionMismatchException,
    StreamNotActive,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataRetention",
}));

export type UpdateImageGenerationConfigurationError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | NoDataRetentionException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the `StreamInfo` and `ImageProcessingConfiguration` fields.
 */
export const updateImageGenerationConfiguration: API.OperationMethod<
  UpdateImageGenerationConfigurationInput,
  UpdateImageGenerationConfigurationOutput,
  UpdateImageGenerationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c40, 0) as any as S.Schema<UpdateImageGenerationConfigurationInput>,
  output: __S(56, __c7, 0) as any as S.Schema<UpdateImageGenerationConfigurationOutput>,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    NoDataRetentionException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateImageGenerationConfiguration",
}));

export type UpdateMediaStorageConfigurationError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | NoDataRetentionException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates a `SignalingChannel` to a stream to store the media. There are
 * two signaling modes that you can specify :
 *
 * - If `StorageStatus` is enabled, the data will be stored in the
 * `StreamARN` provided. In order for WebRTC Ingestion to work, the stream must have data retention
 * enabled.
 *
 * - If `StorageStatus` is disabled, no data will be stored, and the
 * `StreamARN` parameter will not be needed.
 *
 * If `StorageStatus` is enabled, direct peer-to-peer (master-viewer) connections no
 * longer occur. Peers connect directly to the storage session. You must call the
 * `JoinStorageSession` API to trigger an SDP offer send and establish a
 * connection between a peer and the storage session.
 */
export const updateMediaStorageConfiguration: API.OperationMethod<
  UpdateMediaStorageConfigurationInput,
  UpdateMediaStorageConfigurationOutput,
  UpdateMediaStorageConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(328, __c41, 0) as any as S.Schema<UpdateMediaStorageConfigurationInput>,
  output: __S(56, __c7, 0) as any as S.Schema<UpdateMediaStorageConfigurationOutput>,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    NoDataRetentionException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMediaStorageConfiguration",
}));

export type UpdateNotificationConfigurationError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | NoDataRetentionException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the notification information for a stream.
 */
export const updateNotificationConfiguration: API.OperationMethod<
  UpdateNotificationConfigurationInput,
  UpdateNotificationConfigurationOutput,
  UpdateNotificationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c42, 0) as any as S.Schema<UpdateNotificationConfigurationInput>,
  output: __S(56, __c7, 0) as any as S.Schema<UpdateNotificationConfigurationOutput>,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    NoDataRetentionException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNotificationConfiguration",
}));

export type UpdateSignalingChannelError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | VersionMismatchException
  | StreamNotActive
  | CommonErrors;
/**
 * Updates the existing signaling channel. This is an asynchronous operation and takes
 * time to complete.
 *
 * If the `MessageTtlSeconds` value is updated (either increased or reduced),
 * it only applies to new messages sent via this channel after it's been updated. Existing
 * messages are still expired as per the previous `MessageTtlSeconds`
 * value.
 */
export const updateSignalingChannel: API.OperationMethod<
  UpdateSignalingChannelInput,
  UpdateSignalingChannelOutput,
  UpdateSignalingChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(344, __c43, 0) as any as S.Schema<UpdateSignalingChannelInput>,
  output: __S(56, __c7, 0) as any as S.Schema<UpdateSignalingChannelOutput>,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceInUseException,
    ResourceNotFoundException,
    VersionMismatchException,
    StreamNotActive,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSignalingChannel",
}));

export type UpdateStreamError =
  | ClientLimitExceededException
  | InvalidArgumentException
  | NotAuthorizedException
  | ResourceInUseException
  | ResourceNotFoundException
  | VersionMismatchException
  | StreamNotActive
  | CommonErrors;
/**
 * Updates stream metadata, such as the device name and media type.
 *
 * You must provide the stream name or the Amazon Resource Name (ARN) of the
 * stream.
 *
 * To make sure that you have the latest version of the stream before updating it, you
 * can specify the stream version. Kinesis Video Streams assigns a version to each stream.
 * When you update a stream, Kinesis Video Streams assigns a new version number. To get the
 * latest stream version, use the `DescribeStream` API.
 *
 * `UpdateStream` is an asynchronous operation, and takes time to
 * complete.
 */
export const updateStream: API.OperationMethod<
  UpdateStreamInput,
  UpdateStreamOutput,
  UpdateStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c44, 0) as any as S.Schema<UpdateStreamInput>,
  output: __S(56, __c7, 0) as any as S.Schema<UpdateStreamOutput>,
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    NotAuthorizedException,
    ResourceInUseException,
    ResourceNotFoundException,
    VersionMismatchException,
    StreamNotActive,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStream",
}));

export type UpdateStreamStorageConfigurationError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | VersionMismatchException
  | CommonErrors;
/**
 * Updates the storage configuration for an existing Kinesis video stream.
 *
 * This operation allows you to modify the storage tier settings for a stream, enabling you to optimize storage costs and performance based on your access patterns.
 *
 * `UpdateStreamStorageConfiguration` is an asynchronous operation.
 *
 * You must have permissions for the `KinesisVideo:UpdateStreamStorageConfiguration` action.
 */
export const updateStreamStorageConfiguration: API.OperationMethod<
  UpdateStreamStorageConfigurationInput,
  UpdateStreamStorageConfigurationOutput,
  UpdateStreamStorageConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(360, __c45, 0) as any as S.Schema<UpdateStreamStorageConfigurationInput>,
  output: __S(56, __c7, 0) as any as S.Schema<UpdateStreamStorageConfigurationOutput>,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceInUseException,
    ResourceNotFoundException,
    VersionMismatchException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStreamStorageConfiguration",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelName: S.String,
          ChannelType: S.optional(S.String),
          SingleMasterConfiguration: S.optional(__S(8, __c1, 0)),
          Tags: S.optional(__S(17, __c2, 1)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/createSignalingChannel" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSignalingChannelInput" });
    case 1:
      return S.suspend(() => S.Struct({ ChannelARN: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "CreateSignalingChannelOutput",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ MessageTtlSeconds: S.optional(S.Number) })).annotate({
        identifier: "SingleMasterConfiguration",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(16, __c2, 0));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DeviceName: S.optional(S.String),
          StreamName: S.String,
          MediaType: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          DataRetentionInHours: S.optional(S.Number),
          Tags: S.optional(__S(40, __c5, 0)),
          StreamStorageConfiguration: S.optional(__S(32, __c4, 0)),
        }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/createStream" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateStreamInput" });
    case 1:
      return S.suspend(() => S.Struct({ StreamARN: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "CreateStreamOutput",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ DefaultStorageTier: S.String })).annotate({
        identifier: "StreamStorageConfiguration",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StreamName: S.optional(S.String), StreamARN: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/deleteEdgeConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEdgeConfigurationInput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteEdgeConfigurationOutput",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChannelARN: S.String, CurrentVersion: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/deleteSignalingChannel" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSignalingChannelInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StreamARN: S.String, CurrentVersion: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/deleteStream" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteStreamInput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StreamName: S.optional(S.String), StreamARN: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/describeEdgeConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeEdgeConfigurationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          JobStatusDetails: S.optional(S.String),
          LastCollectedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RecorderStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "LastRecorderStatus" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          JobStatusDetails: S.optional(S.String),
          LastCollectedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UploaderStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "LastUploaderStatus" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          LastRecorderStatus: S.optional(__S(81, __c10, 1)),
          LastUploaderStatus: S.optional(__S(82, __c10, 2)),
        }),
      ).annotate({ identifier: "EdgeAgentStatus" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          StreamARN: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SyncStatus: S.optional(S.String),
          FailedStatusDetails: S.optional(S.String),
          EdgeConfig: S.optional(__S(94, __c11, 6)),
          EdgeAgentStatus: S.optional(__S(83, __c10, 3)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeEdgeConfigurationOutput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MediaUriSecretArn: SensitiveString, MediaUriType: S.String }),
      ).annotate({ identifier: "MediaSourceConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ScheduleExpression: S.String, DurationInSeconds: S.Number }),
      ).annotate({ identifier: "ScheduleConfig" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          MediaSourceConfig: __S(88, __c11, 0),
          ScheduleConfig: S.optional(__S(89, __c11, 1)),
        }),
      ).annotate({ identifier: "RecorderConfig" });
    case 3:
      return S.suspend(() => S.Struct({ ScheduleConfig: __S(89, __c11, 1) })).annotate({
        identifier: "UploaderConfig",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          MaxLocalMediaSizeInMB: S.optional(S.Number),
          StrategyOnFullSize: S.optional(S.String),
        }),
      ).annotate({ identifier: "LocalSizeConfig" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          EdgeRetentionInHours: S.optional(S.Number),
          LocalSizeConfig: S.optional(__S(92, __c11, 4)),
          DeleteAfterUpload: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DeletionConfig" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          HubDeviceArn: S.String,
          RecorderConfig: __S(90, __c11, 2),
          UploaderConfig: S.optional(__S(91, __c11, 3)),
          DeletionConfig: S.optional(__S(93, __c11, 5)),
        }),
      ).annotate({ identifier: "EdgeConfig" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StreamName: S.optional(S.String), StreamARN: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/describeImageGenerationConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeImageGenerationConfigurationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ImageGenerationConfiguration: S.optional(__S(106, __c13, 2)) }).pipe(ns),
      ).annotate({ identifier: "DescribeImageGenerationConfigurationOutput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Uri: S.String, DestinationRegion: S.String })).annotate({
        identifier: "ImageGenerationDestinationConfig",
      });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Status: S.String,
          ImageSelectorType: S.String,
          DestinationConfig: __S(104, __c13, 0),
          SamplingInterval: S.Number,
          Format: S.String,
          FormatConfig: S.optional(__S(105, __c13, 1)),
          WidthPixels: S.optional(S.Number),
          HeightPixels: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ImageGenerationConfiguration" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          StreamARN: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/describeMappedResourceConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeMappedResourceConfigurationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), ARN: S.optional(S.String) }),
      ).annotate({ identifier: "MappedResourceConfigurationListItem" });
    case 2:
      return S.Array(__S(113, __c14, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          MappedResourceConfigurationList: S.optional(__S(114, __c14, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeMappedResourceConfigurationOutput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChannelName: S.optional(S.String), ChannelARN: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/describeMediaStorageConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeMediaStorageConfigurationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ MediaStorageConfiguration: S.optional(__S(128, __c16, 0)) }).pipe(ns),
      ).annotate({ identifier: "DescribeMediaStorageConfigurationOutput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StreamARN: S.optional(S.String), Status: S.String }),
      ).annotate({ identifier: "MediaStorageConfiguration" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StreamName: S.optional(S.String), StreamARN: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/describeNotificationConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeNotificationConfigurationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ NotificationConfiguration: S.optional(__S(145, __c18, 1)) }).pipe(ns),
      ).annotate({ identifier: "DescribeNotificationConfigurationOutput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Uri: S.String })).annotate({
        identifier: "NotificationDestinationConfig",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ Status: S.String, DestinationConfig: __S(144, __c18, 0) }),
      ).annotate({ identifier: "NotificationConfiguration" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChannelName: S.optional(S.String), ChannelARN: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/describeSignalingChannel" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeSignalingChannelInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ChannelInfo: S.optional(__S(160, __c20, 0)) }).pipe(ns),
      ).annotate({ identifier: "DescribeSignalingChannelOutput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelName: S.optional(S.String),
          ChannelARN: S.optional(S.String),
          ChannelType: S.optional(S.String),
          ChannelStatus: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SingleMasterConfiguration: S.optional(__S(8, __c1, 0)),
          Version: S.optional(S.String),
        }),
      ).annotate({ identifier: "ChannelInfo" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StreamName: S.optional(S.String), StreamARN: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/describeStream" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeStreamInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ StreamInfo: S.optional(__S(176, __c22, 0)) }).pipe(ns),
      ).annotate({ identifier: "DescribeStreamOutput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DeviceName: S.optional(S.String),
          StreamName: S.optional(S.String),
          StreamARN: S.optional(S.String),
          MediaType: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          Version: S.optional(S.String),
          Status: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DataRetentionInHours: S.optional(S.Number),
        }),
      ).annotate({ identifier: "StreamInfo" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StreamName: S.optional(S.String), StreamARN: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/describeStreamStorageConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeStreamStorageConfigurationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          StreamARN: S.optional(S.String),
          StreamStorageConfiguration: S.optional(__S(32, __c4, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeStreamStorageConfigurationOutput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          StreamARN: S.optional(S.String),
          APIName: S.String,
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/getDataEndpoint" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataEndpointInput" });
    case 1:
      return S.suspend(() => S.Struct({ DataEndpoint: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "GetDataEndpointOutput",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({ Protocols: S.optional(__S(200, __c25, 0)), Role: S.optional(S.String) }),
      ).annotate({ identifier: "SingleMasterChannelEndpointConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ChannelARN: S.String,
          SingleMasterChannelEndpointConfiguration: S.optional(__S(201, __c25, 1)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/getSignalingChannelEndpoint" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSignalingChannelEndpointInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Protocol: S.optional(S.String), ResourceEndpoint: S.optional(S.String) }),
      ).annotate({ identifier: "ResourceEndpointListItem" });
    case 4:
      return S.Array(__S(203, __c25, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ ResourceEndpointList: S.optional(__S(204, __c25, 4)) }).pipe(ns),
      ).annotate({ identifier: "GetSignalingChannelEndpointOutput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HubDeviceArn: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/listEdgeAgentConfigurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEdgeAgentConfigurationsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          StreamARN: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SyncStatus: S.optional(S.String),
          FailedStatusDetails: S.optional(S.String),
          EdgeConfig: S.optional(__S(94, __c11, 6)),
        }),
      ).annotate({ identifier: "ListEdgeAgentConfigurationsEdgeConfig" });
    case 2:
      return S.Array(__S(209, __c26, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          EdgeConfigs: S.optional(__S(210, __c26, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListEdgeAgentConfigurationsOutput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          ChannelNameCondition: S.optional(__S(224, __c28, 0)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/listSignalingChannels" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSignalingChannelsInput" });
    case 1:
      return S.Array(__S(160, __c20, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ChannelInfoList: S.optional(__S(217, __c27, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListSignalingChannelsOutput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ComparisonOperator: S.optional(S.String),
          ComparisonValue: S.optional(S.String),
        }),
      ).annotate({ identifier: "ChannelNameCondition" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          StreamNameCondition: S.optional(__S(224, __c28, 0)),
        }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/listStreams" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListStreamsInput" });
    case 1:
      return S.Array(__S(176, __c22, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          StreamInfoList: S.optional(__S(233, __c29, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListStreamsOutput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), ResourceARN: S.String }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/ListTagsForResource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceInput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Tags: S.optional(__S(40, __c5, 0)) }).pipe(ns),
      ).annotate({ identifier: "ListTagsForResourceOutput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          StreamARN: S.optional(S.String),
          StreamName: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/listTagsForStream" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForStreamInput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          StreamARN: S.optional(S.String),
          EdgeConfig: __S(94, __c11, 6),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/startEdgeConfigurationUpdate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartEdgeConfigurationUpdateInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          StreamARN: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SyncStatus: S.optional(S.String),
          FailedStatusDetails: S.optional(S.String),
          EdgeConfig: S.optional(__S(94, __c11, 6)),
        }).pipe(ns),
      ).annotate({ identifier: "StartEdgeConfigurationUpdateOutput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, Tags: __S(17, __c2, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/TagResource" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamARN: S.optional(S.String),
          StreamName: S.optional(S.String),
          Tags: __S(40, __c5, 0),
        }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/tagStream" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagStreamInput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, TagKeyList: __S(296, __c37, 0) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/UntagResource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamARN: S.optional(S.String),
          StreamName: S.optional(S.String),
          TagKeyList: __S(296, __c37, 0),
        }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/untagStream" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagStreamInput" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          StreamARN: S.optional(S.String),
          CurrentVersion: S.String,
          Operation: S.String,
          DataRetentionChangeInHours: S.Number,
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/updateDataRetention" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDataRetentionInput" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          StreamARN: S.optional(S.String),
          ImageGenerationConfiguration: S.optional(__S(106, __c13, 2)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/updateImageGenerationConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateImageGenerationConfigurationInput" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChannelARN: S.String, MediaStorageConfiguration: __S(128, __c16, 0) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/updateMediaStorageConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMediaStorageConfigurationInput" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          StreamARN: S.optional(S.String),
          NotificationConfiguration: S.optional(__S(145, __c18, 1)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/updateNotificationConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateNotificationConfigurationInput" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelARN: S.String,
          CurrentVersion: S.String,
          SingleMasterConfiguration: S.optional(__S(8, __c1, 0)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/updateSignalingChannel" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSignalingChannelInput" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          StreamARN: S.optional(S.String),
          CurrentVersion: S.String,
          DeviceName: S.optional(S.String),
          MediaType: S.optional(S.String),
        }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/updateStream" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateStreamInput" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          StreamARN: S.optional(S.String),
          CurrentVersion: S.String,
          StreamStorageConfiguration: __S(32, __c4, 0),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/updateStreamStorageConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateStreamStorageConfigurationInput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
