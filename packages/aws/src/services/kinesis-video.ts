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
  sdkId: "Kinesis Video",
  target: "KinesisVideo_20170930",
  version: "2017-09-30",
  sigv4: "kinesisvideo",
  protocol: restJson1Protocol,
  xmlns: "https://kinesisvideo.amazonaws.com/doc/2017-09-30/",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://kinesisvideo.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://kinesisvideo.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 401,
  })<{ readonly message?: string }> {}
export class AccountChannelLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "AccountChannelLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class AccountStreamLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "AccountStreamLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ClientLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ClientLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DeviceStreamLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "DeviceStreamLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidArgumentException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidArgumentException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidDeviceException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDeviceException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidResourceFormatException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidResourceFormatException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class NoDataRetentionException
  extends /*@__PURE__*/ TE.TaggedError(
    "NoDataRetentionException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class NotAuthorizedException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotAuthorizedException",
    ["AuthError"],
    { status: 401 },
  )<{ readonly message?: string }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceInUseException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class StreamEdgeConfigurationNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "StreamEdgeConfigurationNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class StreamNotActive
  extends /*@__PURE__*/ TE.TaggedError(
    "StreamNotActive",
    ["ConflictError", "RetryableError"],
    {
      synthetic: {
        from: "ResourceNotFoundException",
        message: { includes: "not active" },
      },
    },
  )<{ readonly message?: string }> {}
export class TagsPerResourceExceededLimitException
  extends /*@__PURE__*/ TE.TaggedError(
    "TagsPerResourceExceededLimitException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class VersionMismatchException
  extends /*@__PURE__*/ TE.TaggedError(
    "VersionMismatchException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
export type StrategyOnFullSize =
  | "DELETE_OLDEST_MEDIA"
  | "DENY_NEW_MEDIA"
  | (string & {});
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
export type RecorderStatus =
  | "SUCCESS"
  | "USER_ERROR"
  | "SYSTEM_ERROR"
  | (string & {});
export interface LastRecorderStatus {
  JobStatusDetails?: string;
  LastCollectedTime?: Date;
  LastUpdatedTime?: Date;
  RecorderStatus?: RecorderStatus;
}
export type UploaderStatus =
  | "SUCCESS"
  | "USER_ERROR"
  | "SYSTEM_ERROR"
  | (string & {});
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
export type ImageSelectorType =
  | "SERVER_TIMESTAMP"
  | "PRODUCER_TIMESTAMP"
  | (string & {});
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
export type MappedResourceConfigurationList =
  MappedResourceConfigurationListItem[];
export interface DescribeMappedResourceConfigurationOutput {
  MappedResourceConfigurationList?: MappedResourceConfigurationListItem[];
  NextToken?: string;
}
export interface DescribeMediaStorageConfigurationInput {
  ChannelName?: string;
  ChannelARN?: string;
}
export type MediaStorageConfigurationStatus =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
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
export type Status =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | (string & {});
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
export type ListEdgeAgentConfigurationsEdgeConfigList =
  ListEdgeAgentConfigurationsEdgeConfig[];
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
  descriptor: {
    service: svc,
    http: "POST /createSignalingChannel",
    input: {
      ChannelName: 0,
      ChannelType: 0,
      SingleMasterConfiguration: i_SingleMasterConfiguration,
      Tags: D.list(i_Tag),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /createStream",
    input: {
      DeviceName: 0,
      StreamName: 0,
      MediaType: 0,
      KmsKeyId: 0,
      DataRetentionInHours: 0,
      Tags: 0,
      StreamStorageConfiguration: i_StreamStorageConfiguration,
    },
    body: true,
  },
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
})) as any;

export type DeleteEdgeConfigurationError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceNotFoundException
  | StreamEdgeConfigurationNotFoundException
  | CommonErrors;
/**
 * An asynchronous API that deletes a stream’s existing edge configuration, as well as the corresponding media from the Edge Agent.
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
  descriptor: {
    service: svc,
    http: "POST /deleteEdgeConfiguration",
    input: { StreamName: 0, StreamARN: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /deleteSignalingChannel",
    input: { ChannelARN: 0, CurrentVersion: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /deleteStream",
    input: { StreamARN: 0, CurrentVersion: 0 },
    body: true,
  },
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
})) as any;

export type DescribeEdgeConfigurationError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceNotFoundException
  | StreamEdgeConfigurationNotFoundException
  | CommonErrors;
/**
 * Describes a stream’s edge configuration that was set using the
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
  descriptor: {
    service: svc,
    http: "POST /describeEdgeConfiguration",
    input: { StreamName: 0, StreamARN: 0 },
    output: {
      CreationTime: D.ts,
      LastUpdatedTime: D.ts,
      EdgeConfig: o_EdgeConfig,
      EdgeAgentStatus: {
        LastRecorderStatus: { LastCollectedTime: D.ts, LastUpdatedTime: D.ts },
        LastUploaderStatus: { LastCollectedTime: D.ts, LastUpdatedTime: D.ts },
      },
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /describeImageGenerationConfiguration",
    input: { StreamName: 0, StreamARN: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImageGenerationConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /describeMappedResourceConfiguration",
    input: { StreamName: 0, StreamARN: 0, MaxResults: 0, NextToken: 0 },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /describeMediaStorageConfiguration",
    input: { ChannelName: 0, ChannelARN: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMediaStorageConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /describeNotificationConfiguration",
    input: { StreamName: 0, StreamARN: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNotificationConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /describeSignalingChannel",
    input: { ChannelName: 0, ChannelARN: 0 },
    output: { ChannelInfo: o_ChannelInfo },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSignalingChannel",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /describeStream",
    input: { StreamName: 0, StreamARN: 0 },
    output: { StreamInfo: o_StreamInfo },
    body: true,
  },
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    NotAuthorizedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStream",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /describeStreamStorageConfiguration",
    input: { StreamName: 0, StreamARN: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStreamStorageConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /getDataEndpoint",
    input: { StreamName: 0, StreamARN: 0, APIName: 0 },
    body: true,
  },
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    NotAuthorizedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataEndpoint",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /getSignalingChannelEndpoint",
    input: {
      ChannelARN: 0,
      SingleMasterChannelEndpointConfiguration: { Protocols: 0, Role: 0 },
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /listEdgeAgentConfigurations",
    input: { HubDeviceArn: 0, MaxResults: 0, NextToken: 0 },
    output: {
      EdgeConfigs: D.list({
        CreationTime: D.ts,
        LastUpdatedTime: D.ts,
        EdgeConfig: o_EdgeConfig,
      }),
    },
    body: true,
  },
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
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
  descriptor: {
    service: svc,
    http: "POST /listSignalingChannels",
    input: {
      MaxResults: 0,
      NextToken: 0,
      ChannelNameCondition: { ComparisonOperator: 0, ComparisonValue: 0 },
    },
    output: { ChannelInfoList: D.list(o_ChannelInfo) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
  ],
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
  descriptor: {
    service: svc,
    http: "POST /listStreams",
    input: {
      MaxResults: 0,
      NextToken: 0,
      StreamNameCondition: { ComparisonOperator: 0, ComparisonValue: 0 },
    },
    output: { StreamInfoList: D.list(o_StreamInfo) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListTagsForResource",
    input: { NextToken: 0, ResourceARN: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /listTagsForStream",
    input: { NextToken: 0, StreamARN: 0, StreamName: 0 },
    body: true,
  },
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
})) as any;

export type StartEdgeConfigurationUpdateError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | NoDataRetentionException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * An asynchronous API that updates a stream’s existing edge configuration.
 * The Kinesis Video Stream will sync the stream’s edge configuration with the Edge Agent IoT Greengrass
 * component that runs on an IoT Hub Device, setup at your premise. The time to sync can vary
 * and depends on the connectivity of the Hub Device.
 * The `SyncStatus` will be updated as the edge configuration is acknowledged,
 * and synced with the Edge Agent.
 *
 * If this API is invoked for the first time, a new edge configuration will be created for the stream,
 * and the sync status will be set to `SYNCING`. You will have to wait for the sync status
 * to reach a terminal state such as: `IN_SYNC`, or `SYNC_FAILED`, before using this API again.
 * If you invoke this API during the syncing process, a `ResourceInUseException` will be thrown.
 * The connectivity of the stream’s edge configuration and the Edge Agent will be retried for 15 minutes. After 15 minutes,
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
  descriptor: {
    service: svc,
    http: "POST /startEdgeConfigurationUpdate",
    input: {
      StreamName: 0,
      StreamARN: 0,
      EdgeConfig: {
        HubDeviceArn: 0,
        RecorderConfig: {
          MediaSourceConfig: { MediaUriSecretArn: 0, MediaUriType: 0 },
          ScheduleConfig: i_ScheduleConfig,
        },
        UploaderConfig: { ScheduleConfig: i_ScheduleConfig },
        DeletionConfig: {
          EdgeRetentionInHours: 0,
          LocalSizeConfig: { MaxLocalMediaSizeInMB: 0, StrategyOnFullSize: 0 },
          DeleteAfterUpload: 0,
        },
      },
    },
    output: {
      CreationTime: D.ts,
      LastUpdatedTime: D.ts,
      EdgeConfig: o_EdgeConfig,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /TagResource",
    input: { ResourceARN: 0, Tags: D.list(i_Tag) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tagStream",
    input: { StreamARN: 0, StreamName: 0, Tags: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /UntagResource",
    input: { ResourceARN: 0, TagKeyList: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /untagStream",
    input: { StreamARN: 0, StreamName: 0, TagKeyList: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /updateDataRetention",
    input: {
      StreamName: 0,
      StreamARN: 0,
      CurrentVersion: 0,
      Operation: 0,
      DataRetentionChangeInHours: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /updateImageGenerationConfiguration",
    input: {
      StreamName: 0,
      StreamARN: 0,
      ImageGenerationConfiguration: {
        Status: 0,
        ImageSelectorType: 0,
        DestinationConfig: { Uri: 0, DestinationRegion: 0 },
        SamplingInterval: 0,
        Format: 0,
        FormatConfig: 0,
        WidthPixels: 0,
        HeightPixels: 0,
      },
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /updateMediaStorageConfiguration",
    input: {
      ChannelARN: 0,
      MediaStorageConfiguration: { StreamARN: 0, Status: 0 },
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /updateNotificationConfiguration",
    input: {
      StreamName: 0,
      StreamARN: 0,
      NotificationConfiguration: { Status: 0, DestinationConfig: { Uri: 0 } },
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /updateSignalingChannel",
    input: {
      ChannelARN: 0,
      CurrentVersion: 0,
      SingleMasterConfiguration: i_SingleMasterConfiguration,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /updateStream",
    input: {
      StreamName: 0,
      StreamARN: 0,
      CurrentVersion: 0,
      DeviceName: 0,
      MediaType: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /updateStreamStorageConfiguration",
    input: {
      StreamName: 0,
      StreamARN: 0,
      CurrentVersion: 0,
      StreamStorageConfiguration: i_StreamStorageConfiguration,
    },
    body: true,
  },
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
})) as any;

const i_ScheduleConfig: D.LazyStruct = () => ({
  ScheduleExpression: 0,
  DurationInSeconds: 0,
});
const i_SingleMasterConfiguration: D.LazyStruct = () => ({
  MessageTtlSeconds: 0,
});
const i_StreamStorageConfiguration: D.LazyStruct = () => ({
  DefaultStorageTier: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_ChannelInfo: D.LazyStruct = () => ({ CreationTime: D.ts });
const o_EdgeConfig: D.LazyStruct = () => ({
  RecorderConfig: { MediaSourceConfig: { MediaUriSecretArn: D.secret } },
});
const o_StreamInfo: D.LazyStruct = () => ({ CreationTime: D.ts });
