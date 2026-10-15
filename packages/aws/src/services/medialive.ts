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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "MediaLive", serviceShapeName: "MediaLive" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "medialive" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-10-14");
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
              `https://medialive-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://medialive-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://medialive.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://medialive.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://medialive.{R}.{D}","properties":{},"headers":{}}');

export class BadGatewayException
  extends /*@__PURE__*/ S.TaggedError<BadGatewayException>()(
    "BadGatewayException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(502),
  ).pipe(C.withServerError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class GatewayTimeoutException
  extends /*@__PURE__*/ S.TaggedError<GatewayTimeoutException>()(
    "GatewayTimeoutException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(504),
  ).pipe(C.withTimeoutError) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class MediaLiveRoleNotYetTrusted
  extends /*@__PURE__*/ S.TaggedError<MediaLiveRoleNotYetTrusted>()(
    "MediaLiveRoleNotYetTrusted",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ValidationErrors: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __listOfValidationError).annotate({
          identifier: "__listOfValidationError",
        }),
      ),
    },
    /*@__PURE__*/ T.SyntheticError({
      from: "UnprocessableEntityException",
      message: { includes: "is a trusted service" },
    }),
  ).pipe(C.withRetryableError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnprocessableEntityException
  extends /*@__PURE__*/ S.TaggedError<UnprocessableEntityException>()(
    "UnprocessableEntityException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ValidationErrors: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __listOfValidationError).annotate({
          identifier: "__listOfValidationError",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(422),
  ).pipe(C.withBadRequestError) {}
export interface AcceptInputDeviceTransferRequest {
  InputDeviceId: string;
}
export interface AcceptInputDeviceTransferResponse {}
export type __listOf__string = string[];
const __listOf__string = /*@__PURE__*/ __L.at(__c14, 0);
export interface BatchDeleteRequest {
  ChannelIds?: string[];
  InputIds?: string[];
  InputSecurityGroupIds?: string[];
  MultiplexIds?: string[];
}
export interface BatchFailedResultModel {
  Arn?: string;
  Code?: string;
  Id?: string;
  Message?: string;
}
export type __listOfBatchFailedResultModel = BatchFailedResultModel[];
const __listOfBatchFailedResultModel = /*@__PURE__*/ __L.at(__c13, 1);
export interface BatchSuccessfulResultModel {
  Arn?: string;
  Id?: string;
  State?: string;
}
export type __listOfBatchSuccessfulResultModel = BatchSuccessfulResultModel[];
const __listOfBatchSuccessfulResultModel = /*@__PURE__*/ __L.at(__c13, 3);
export interface BatchDeleteResponse {
  Failed?: BatchFailedResultModel[];
  Successful?: BatchSuccessfulResultModel[];
}
export interface BatchStartRequest {
  ChannelIds?: string[];
  MultiplexIds?: string[];
}
export interface BatchStartResponse {
  Failed?: BatchFailedResultModel[];
  Successful?: BatchSuccessfulResultModel[];
}
export interface BatchStopRequest {
  ChannelIds?: string[];
  MultiplexIds?: string[];
}
export interface BatchStopResponse {
  Failed?: BatchFailedResultModel[];
  Successful?: BatchSuccessfulResultModel[];
}
export interface HlsId3SegmentTaggingScheduleActionSettings {
  Tag?: string;
  Id3?: string;
}
export interface HlsTimedMetadataScheduleActionSettings {
  Id3?: string;
}
export type InputTimecodeSource = "ZEROBASED" | "EMBEDDED" | (string & {});
export interface StartTimecode {
  Timecode?: string;
}
export type LastFrameClippingBehavior = "EXCLUDE_LAST_FRAME" | "INCLUDE_LAST_FRAME" | (string & {});
export interface StopTimecode {
  LastFrameClippingBehavior?: LastFrameClippingBehavior;
  Timecode?: string;
}
export interface InputClippingSettings {
  InputTimecodeSource?: InputTimecodeSource;
  StartTimecode?: StartTimecode;
  StopTimecode?: StopTimecode;
}
export interface InputPrepareScheduleActionSettings {
  InputAttachmentNameReference?: string;
  InputClippingSettings?: InputClippingSettings;
  UrlPath?: string[];
}
export interface InputSwitchScheduleActionSettings {
  InputAttachmentNameReference?: string;
  InputClippingSettings?: InputClippingSettings;
  UrlPath?: string[];
}
export type __longMin0Max86400000 = number;
export interface MotionGraphicsActivateScheduleActionSettings {
  Duration?: number;
  PasswordParam?: string;
  Url?: string;
  Username?: string;
}
export interface MotionGraphicsDeactivateScheduleActionSettings {}
export type PipelineId = "PIPELINE_0" | "PIPELINE_1" | (string & {});
export interface PipelinePauseStateSettings {
  PipelineId?: PipelineId;
}
export type __listOfPipelinePauseStateSettings = PipelinePauseStateSettings[];
const __listOfPipelinePauseStateSettings = /*@__PURE__*/ __L.at(__c43, 8);
export interface PauseStateScheduleActionSettings {
  Pipelines?: PipelinePauseStateSettings[];
}
export type Scte35InputMode = "FIXED" | "FOLLOW_ACTIVE" | (string & {});
export interface Scte35InputScheduleActionSettings {
  InputAttachmentNameReference?: string;
  Mode?: Scte35InputMode;
}
export type __longMin0Max4294967295 = number;
export interface Scte35ReturnToNetworkScheduleActionSettings {
  SpliceEventId?: number;
}
export type __longMin0Max8589934591 = number;
export interface Scte35SpliceInsertScheduleActionSettings {
  Duration?: number;
  SpliceEventId?: number;
}
export type Scte35ArchiveAllowedFlag = "ARCHIVE_NOT_ALLOWED" | "ARCHIVE_ALLOWED" | (string & {});
export type Scte35DeviceRestrictions =
  | "NONE"
  | "RESTRICT_GROUP0"
  | "RESTRICT_GROUP1"
  | "RESTRICT_GROUP2"
  | (string & {});
export type Scte35NoRegionalBlackoutFlag =
  | "REGIONAL_BLACKOUT"
  | "NO_REGIONAL_BLACKOUT"
  | (string & {});
export type Scte35WebDeliveryAllowedFlag =
  | "WEB_DELIVERY_NOT_ALLOWED"
  | "WEB_DELIVERY_ALLOWED"
  | (string & {});
export interface Scte35DeliveryRestrictions {
  ArchiveAllowedFlag?: Scte35ArchiveAllowedFlag;
  DeviceRestrictions?: Scte35DeviceRestrictions;
  NoRegionalBlackoutFlag?: Scte35NoRegionalBlackoutFlag;
  WebDeliveryAllowedFlag?: Scte35WebDeliveryAllowedFlag;
}
export type __integerMin0Max255 = number;
export type Scte35SegmentationCancelIndicator =
  | "SEGMENTATION_EVENT_NOT_CANCELED"
  | "SEGMENTATION_EVENT_CANCELED"
  | (string & {});
export type __longMin0Max1099511627775 = number;
export interface Scte35SegmentationDescriptor {
  DeliveryRestrictions?: Scte35DeliveryRestrictions;
  SegmentNum?: number;
  SegmentationCancelIndicator?: Scte35SegmentationCancelIndicator;
  SegmentationDuration?: number;
  SegmentationEventId?: number;
  SegmentationTypeId?: number;
  SegmentationUpid?: string;
  SegmentationUpidType?: number;
  SegmentsExpected?: number;
  SubSegmentNum?: number;
  SubSegmentsExpected?: number;
}
export interface Scte35DescriptorSettings {
  SegmentationDescriptorScte35DescriptorSettings?: Scte35SegmentationDescriptor;
}
export interface Scte35Descriptor {
  Scte35DescriptorSettings?: Scte35DescriptorSettings;
}
export type __listOfScte35Descriptor = Scte35Descriptor[];
const __listOfScte35Descriptor = /*@__PURE__*/ __L.at(__c43, 17);
export interface Scte35TimeSignalScheduleActionSettings {
  Scte35Descriptors?: Scte35Descriptor[];
}
export type __integerMin0 = number;
export type __integerMin1 = number;
export type __stringMax2048 = string;
export interface InputLocation {
  PasswordParam?: string;
  Uri?: string;
  Username?: string;
}
export type __integerMin0Max7 = number;
export type __integerMin0Max100 = number;
export interface StaticImageActivateScheduleActionSettings {
  Duration?: number;
  FadeIn?: number;
  FadeOut?: number;
  Height?: number;
  Image?: InputLocation;
  ImageX?: number;
  ImageY?: number;
  Layer?: number;
  Opacity?: number;
  Width?: number;
}
export interface StaticImageDeactivateScheduleActionSettings {
  FadeOut?: number;
  Layer?: number;
}
export interface StaticImageOutputActivateScheduleActionSettings {
  Duration?: number;
  FadeIn?: number;
  FadeOut?: number;
  Height?: number;
  Image?: InputLocation;
  ImageX?: number;
  ImageY?: number;
  Layer?: number;
  Opacity?: number;
  OutputNames?: string[];
  Width?: number;
}
export interface StaticImageOutputDeactivateScheduleActionSettings {
  FadeOut?: number;
  Layer?: number;
  OutputNames?: string[];
}
export interface Id3SegmentTaggingScheduleActionSettings {
  Id3?: string;
  Tag?: string;
}
export interface TimedMetadataScheduleActionSettings {
  Id3?: string;
}
export interface ScheduleActionSettings {
  HlsId3SegmentTaggingSettings?: HlsId3SegmentTaggingScheduleActionSettings;
  HlsTimedMetadataSettings?: HlsTimedMetadataScheduleActionSettings;
  InputPrepareSettings?: InputPrepareScheduleActionSettings;
  InputSwitchSettings?: InputSwitchScheduleActionSettings;
  MotionGraphicsImageActivateSettings?: MotionGraphicsActivateScheduleActionSettings;
  MotionGraphicsImageDeactivateSettings?: MotionGraphicsDeactivateScheduleActionSettings;
  PauseStateSettings?: PauseStateScheduleActionSettings;
  Scte35InputSettings?: Scte35InputScheduleActionSettings;
  Scte35ReturnToNetworkSettings?: Scte35ReturnToNetworkScheduleActionSettings;
  Scte35SpliceInsertSettings?: Scte35SpliceInsertScheduleActionSettings;
  Scte35TimeSignalSettings?: Scte35TimeSignalScheduleActionSettings;
  StaticImageActivateSettings?: StaticImageActivateScheduleActionSettings;
  StaticImageDeactivateSettings?: StaticImageDeactivateScheduleActionSettings;
  StaticImageOutputActivateSettings?: StaticImageOutputActivateScheduleActionSettings;
  StaticImageOutputDeactivateSettings?: StaticImageOutputDeactivateScheduleActionSettings;
  Id3SegmentTaggingSettings?: Id3SegmentTaggingScheduleActionSettings;
  TimedMetadataSettings?: TimedMetadataScheduleActionSettings;
}
export interface FixedModeScheduleActionStartSettings {
  Time?: string;
}
export type FollowPoint = "END" | "START" | (string & {});
export interface FollowModeScheduleActionStartSettings {
  FollowPoint?: FollowPoint;
  ReferenceActionName?: string;
}
export interface ImmediateModeScheduleActionStartSettings {}
export interface ScheduleActionStartSettings {
  FixedModeScheduleActionStartSettings?: FixedModeScheduleActionStartSettings;
  FollowModeScheduleActionStartSettings?: FollowModeScheduleActionStartSettings;
  ImmediateModeScheduleActionStartSettings?: ImmediateModeScheduleActionStartSettings;
}
export interface ScheduleAction {
  ActionName?: string;
  ScheduleActionSettings?: ScheduleActionSettings;
  ScheduleActionStartSettings?: ScheduleActionStartSettings;
}
export type __listOfScheduleAction = ScheduleAction[];
const __listOfScheduleAction = /*@__PURE__*/ __L.at(__c43, 29);
export interface BatchScheduleActionCreateRequest {
  ScheduleActions?: ScheduleAction[];
}
export interface BatchScheduleActionDeleteRequest {
  ActionNames?: string[];
}
export interface BatchUpdateScheduleRequest {
  ChannelId: string;
  Creates?: BatchScheduleActionCreateRequest;
  Deletes?: BatchScheduleActionDeleteRequest;
}
export interface BatchScheduleActionCreateResult {
  ScheduleActions?: ScheduleAction[];
}
export interface BatchScheduleActionDeleteResult {
  ScheduleActions?: ScheduleAction[];
}
export interface BatchUpdateScheduleResponse {
  Creates?: BatchScheduleActionCreateResult & {
    ScheduleActions: (ScheduleAction & {
      ActionName: string;
      ScheduleActionSettings: ScheduleActionSettings & {
        HlsTimedMetadataSettings: HlsTimedMetadataScheduleActionSettings & { Id3: string };
        InputPrepareSettings: InputPrepareScheduleActionSettings & {
          InputClippingSettings: InputClippingSettings & {
            InputTimecodeSource: InputTimecodeSource;
          };
        };
        InputSwitchSettings: InputSwitchScheduleActionSettings & {
          InputAttachmentNameReference: string;
          InputClippingSettings: InputClippingSettings & {
            InputTimecodeSource: InputTimecodeSource;
          };
        };
        PauseStateSettings: PauseStateScheduleActionSettings & {
          Pipelines: (PipelinePauseStateSettings & { PipelineId: PipelineId })[];
        };
        Scte35InputSettings: Scte35InputScheduleActionSettings & { Mode: Scte35InputMode };
        Scte35ReturnToNetworkSettings: Scte35ReturnToNetworkScheduleActionSettings & {
          SpliceEventId: __longMin0Max4294967295;
        };
        Scte35SpliceInsertSettings: Scte35SpliceInsertScheduleActionSettings & {
          SpliceEventId: __longMin0Max4294967295;
        };
        Scte35TimeSignalSettings: Scte35TimeSignalScheduleActionSettings & {
          Scte35Descriptors: (Scte35Descriptor & {
            Scte35DescriptorSettings: Scte35DescriptorSettings & {
              SegmentationDescriptorScte35DescriptorSettings: Scte35SegmentationDescriptor & {
                SegmentationCancelIndicator: Scte35SegmentationCancelIndicator;
                SegmentationEventId: __longMin0Max4294967295;
                DeliveryRestrictions: Scte35DeliveryRestrictions & {
                  ArchiveAllowedFlag: Scte35ArchiveAllowedFlag;
                  DeviceRestrictions: Scte35DeviceRestrictions;
                  NoRegionalBlackoutFlag: Scte35NoRegionalBlackoutFlag;
                  WebDeliveryAllowedFlag: Scte35WebDeliveryAllowedFlag;
                };
              };
            };
          })[];
        };
        StaticImageActivateSettings: StaticImageActivateScheduleActionSettings & {
          Image: InputLocation & { Uri: __stringMax2048 };
        };
        StaticImageOutputActivateSettings: StaticImageOutputActivateScheduleActionSettings & {
          Image: InputLocation & { Uri: __stringMax2048 };
          OutputNames: __listOf__string;
        };
        StaticImageOutputDeactivateSettings: StaticImageOutputDeactivateScheduleActionSettings & {
          OutputNames: __listOf__string;
        };
        TimedMetadataSettings: TimedMetadataScheduleActionSettings & { Id3: string };
      };
      ScheduleActionStartSettings: ScheduleActionStartSettings & {
        FixedModeScheduleActionStartSettings: FixedModeScheduleActionStartSettings & {
          Time: string;
        };
        FollowModeScheduleActionStartSettings: FollowModeScheduleActionStartSettings & {
          FollowPoint: FollowPoint;
          ReferenceActionName: string;
        };
      };
    })[];
  };
  Deletes?: BatchScheduleActionDeleteResult & {
    ScheduleActions: (ScheduleAction & {
      ActionName: string;
      ScheduleActionSettings: ScheduleActionSettings & {
        HlsTimedMetadataSettings: HlsTimedMetadataScheduleActionSettings & { Id3: string };
        InputPrepareSettings: InputPrepareScheduleActionSettings & {
          InputClippingSettings: InputClippingSettings & {
            InputTimecodeSource: InputTimecodeSource;
          };
        };
        InputSwitchSettings: InputSwitchScheduleActionSettings & {
          InputAttachmentNameReference: string;
          InputClippingSettings: InputClippingSettings & {
            InputTimecodeSource: InputTimecodeSource;
          };
        };
        PauseStateSettings: PauseStateScheduleActionSettings & {
          Pipelines: (PipelinePauseStateSettings & { PipelineId: PipelineId })[];
        };
        Scte35InputSettings: Scte35InputScheduleActionSettings & { Mode: Scte35InputMode };
        Scte35ReturnToNetworkSettings: Scte35ReturnToNetworkScheduleActionSettings & {
          SpliceEventId: __longMin0Max4294967295;
        };
        Scte35SpliceInsertSettings: Scte35SpliceInsertScheduleActionSettings & {
          SpliceEventId: __longMin0Max4294967295;
        };
        Scte35TimeSignalSettings: Scte35TimeSignalScheduleActionSettings & {
          Scte35Descriptors: (Scte35Descriptor & {
            Scte35DescriptorSettings: Scte35DescriptorSettings & {
              SegmentationDescriptorScte35DescriptorSettings: Scte35SegmentationDescriptor & {
                SegmentationCancelIndicator: Scte35SegmentationCancelIndicator;
                SegmentationEventId: __longMin0Max4294967295;
                DeliveryRestrictions: Scte35DeliveryRestrictions & {
                  ArchiveAllowedFlag: Scte35ArchiveAllowedFlag;
                  DeviceRestrictions: Scte35DeviceRestrictions;
                  NoRegionalBlackoutFlag: Scte35NoRegionalBlackoutFlag;
                  WebDeliveryAllowedFlag: Scte35WebDeliveryAllowedFlag;
                };
              };
            };
          })[];
        };
        StaticImageActivateSettings: StaticImageActivateScheduleActionSettings & {
          Image: InputLocation & { Uri: __stringMax2048 };
        };
        StaticImageOutputActivateSettings: StaticImageOutputActivateScheduleActionSettings & {
          Image: InputLocation & { Uri: __stringMax2048 };
          OutputNames: __listOf__string;
        };
        StaticImageOutputDeactivateSettings: StaticImageOutputDeactivateScheduleActionSettings & {
          OutputNames: __listOf__string;
        };
        TimedMetadataSettings: TimedMetadataScheduleActionSettings & { Id3: string };
      };
      ScheduleActionStartSettings: ScheduleActionStartSettings & {
        FixedModeScheduleActionStartSettings: FixedModeScheduleActionStartSettings & {
          Time: string;
        };
        FollowModeScheduleActionStartSettings: FollowModeScheduleActionStartSettings & {
          FollowPoint: FollowPoint;
          ReferenceActionName: string;
        };
      };
    })[];
  };
}
export interface CancelInputDeviceTransferRequest {
  InputDeviceId: string;
}
export interface CancelInputDeviceTransferResponse {}
export interface ClaimDeviceRequest {
  Id?: string;
}
export interface ClaimDeviceResponse {}
export type CdiInputResolution = "SD" | "HD" | "FHD" | "UHD" | (string & {});
export interface CdiInputSpecification {
  Resolution?: CdiInputResolution;
}
export type ChannelClass = "STANDARD" | "SINGLE_PIPELINE" | (string & {});
export type __stringMin1 = string;
export interface MediaPackageOutputDestinationSettings {
  ChannelId?: string;
  ChannelGroup?: string;
  ChannelName?: string;
  ChannelEndpointId?: string;
  MediaPackageRegionName?: string;
}
export type __listOfMediaPackageOutputDestinationSettings = MediaPackageOutputDestinationSettings[];
const __listOfMediaPackageOutputDestinationSettings = /*@__PURE__*/ __L.at(__c56, 2);
export interface MultiplexProgramChannelDestinationSettings {
  MultiplexId?: string;
  ProgramName?: string;
}
export interface OutputDestinationSettings {
  PasswordParam?: string;
  StreamName?: string;
  Url?: string;
  Username?: string;
  VirtualSourceAddress?: string;
}
export type __listOfOutputDestinationSettings = OutputDestinationSettings[];
const __listOfOutputDestinationSettings = /*@__PURE__*/ __L.at(__c56, 5);
export type ConnectionMode = "CALLER" | "LISTENER" | (string & {});
export type __integerMin1Max65535 = number;
export interface SrtOutputDestinationSettings {
  EncryptionPassphraseSecretArn?: string;
  StreamId?: string;
  Url?: string;
  ConnectionMode?: ConnectionMode;
  ListenerPort?: number;
}
export type __listOfSrtOutputDestinationSettings = SrtOutputDestinationSettings[];
const __listOfSrtOutputDestinationSettings = /*@__PURE__*/ __L.at(__c56, 7);
export type MediaConnectRouterOutputEncryptionType =
  | "AUTOMATIC"
  | "SECRETS_MANAGER"
  | (string & {});
export interface MediaConnectRouterOutputDestinationSettings {
  EncryptionType?: MediaConnectRouterOutputEncryptionType;
  SecretArn?: string;
}
export type __listOfMediaConnectRouterOutputDestinationSettings =
  MediaConnectRouterOutputDestinationSettings[];
const __listOfMediaConnectRouterOutputDestinationSettings = /*@__PURE__*/ __L.at(__c56, 9);
export interface OutputDestination {
  Id?: string;
  MediaPackageSettings?: MediaPackageOutputDestinationSettings[];
  MultiplexSettings?: MultiplexProgramChannelDestinationSettings;
  Settings?: OutputDestinationSettings[];
  SrtSettings?: SrtOutputDestinationSettings[];
  LogicalInterfaceNames?: string[];
  MediaConnectRouterSettings?: MediaConnectRouterOutputDestinationSettings[];
}
export type __listOfOutputDestination = OutputDestination[];
const __listOfOutputDestination = /*@__PURE__*/ __L.at(__c56, 11);
export type AudioNormalizationAlgorithm =
  | "ITU_1770_1"
  | "ITU_1770_2"
  | "ITU_1770_3"
  | "ITU_1770_4"
  | (string & {});
export type AudioNormalizationAlgorithmControl = "CORRECT_AUDIO" | (string & {});
export type __doubleMinNegative59Max0 = number;
export type AudioNormalizationPeakCalculation = "NONE" | "TRUE_PEAK" | (string & {});
export type __doubleMinNegative8Max0 = number;
export interface AudioNormalizationSettings {
  Algorithm?: AudioNormalizationAlgorithm;
  AlgorithmControl?: AudioNormalizationAlgorithmControl;
  TargetLkfs?: number;
  PeakCalculation?: AudioNormalizationPeakCalculation;
  PeakLimiterThreshold?: number;
}
export type AudioType =
  | "CLEAN_EFFECTS"
  | "HEARING_IMPAIRED"
  | "UNDEFINED"
  | "VISUAL_IMPAIRED_COMMENTARY"
  | (string & {});
export type AudioDescriptionAudioTypeControl = "FOLLOW_INPUT" | "USE_CONFIGURED" | (string & {});
export type __stringMin2Max2 = string;
export type NielsenWatermarksCbetStepaside = "DISABLED" | "ENABLED" | (string & {});
export type __stringMin1Max7 = string;
export interface NielsenCBET {
  CbetCheckDigitString?: string;
  CbetStepaside?: NielsenWatermarksCbetStepaside;
  Csid?: string;
}
export type NielsenWatermarksDistributionTypes =
  | "FINAL_DISTRIBUTOR"
  | "PROGRAM_CONTENT"
  | (string & {});
export type __doubleMin1Max65535 = number;
export type NielsenWatermarkTimezones =
  | "AMERICA_PUERTO_RICO"
  | "US_ALASKA"
  | "US_ARIZONA"
  | "US_CENTRAL"
  | "US_EASTERN"
  | "US_HAWAII"
  | "US_MOUNTAIN"
  | "US_PACIFIC"
  | "US_SAMOA"
  | "UTC"
  | (string & {});
export interface NielsenNaesIiNw {
  CheckDigitString?: string;
  Sid?: number;
  Timezone?: NielsenWatermarkTimezones;
}
export interface NielsenNwOnly {
  CheckDigitString?: string;
  Sid?: number;
  Timezone?: NielsenWatermarkTimezones;
}
export interface NielsenWatermarksSettings {
  NielsenCbetSettings?: NielsenCBET;
  NielsenDistributionType?: NielsenWatermarksDistributionTypes;
  NielsenNaesIiNwSettings?: NielsenNaesIiNw;
  NielsenNwOnlySettings?: NielsenNwOnly;
}
export interface AudioWatermarkSettings {
  NielsenWatermarksSettings?: NielsenWatermarksSettings;
}
export type AacCodingMode =
  | "AD_RECEIVER_MIX"
  | "CODING_MODE_1_0"
  | "CODING_MODE_1_1"
  | "CODING_MODE_2_0"
  | "CODING_MODE_5_1"
  | (string & {});
export type AacInputType = "BROADCASTER_MIXED_AD" | "NORMAL" | (string & {});
export type AacProfile = "HEV1" | "HEV2" | "LC" | (string & {});
export type AacRateControlMode = "CBR" | "VBR" | (string & {});
export type AacRawFormat = "LATM_LOAS" | "NONE" | (string & {});
export type AacSpec = "MPEG2" | "MPEG4" | (string & {});
export type AacVbrQuality = "HIGH" | "LOW" | "MEDIUM_HIGH" | "MEDIUM_LOW" | (string & {});
export interface AacSettings {
  Bitrate?: number;
  CodingMode?: AacCodingMode;
  InputType?: AacInputType;
  Profile?: AacProfile;
  RateControlMode?: AacRateControlMode;
  RawFormat?: AacRawFormat;
  SampleRate?: number;
  Spec?: AacSpec;
  VbrQuality?: AacVbrQuality;
}
export type Ac3BitstreamMode =
  | "COMMENTARY"
  | "COMPLETE_MAIN"
  | "DIALOGUE"
  | "EMERGENCY"
  | "HEARING_IMPAIRED"
  | "MUSIC_AND_EFFECTS"
  | "VISUALLY_IMPAIRED"
  | "VOICE_OVER"
  | (string & {});
export type Ac3CodingMode =
  | "CODING_MODE_1_0"
  | "CODING_MODE_1_1"
  | "CODING_MODE_2_0"
  | "CODING_MODE_3_2_LFE"
  | (string & {});
export type __integerMin1Max31 = number;
export type Ac3DrcProfile = "FILM_STANDARD" | "NONE" | (string & {});
export type Ac3LfeFilter = "DISABLED" | "ENABLED" | (string & {});
export type Ac3MetadataControl = "FOLLOW_INPUT" | "USE_CONFIGURED" | (string & {});
export type Ac3AttenuationControl = "ATTENUATE_3_DB" | "NONE" | (string & {});
export interface Ac3Settings {
  Bitrate?: number;
  BitstreamMode?: Ac3BitstreamMode;
  CodingMode?: Ac3CodingMode;
  Dialnorm?: number;
  DrcProfile?: Ac3DrcProfile;
  LfeFilter?: Ac3LfeFilter;
  MetadataControl?: Ac3MetadataControl;
  AttenuationControl?: Ac3AttenuationControl;
}
export type Eac3AtmosCodingMode =
  | "CODING_MODE_5_1_4"
  | "CODING_MODE_7_1_4"
  | "CODING_MODE_9_1_6"
  | (string & {});
export type Eac3AtmosDrcLine =
  | "FILM_LIGHT"
  | "FILM_STANDARD"
  | "MUSIC_LIGHT"
  | "MUSIC_STANDARD"
  | "NONE"
  | "SPEECH"
  | (string & {});
export type Eac3AtmosDrcRf =
  | "FILM_LIGHT"
  | "FILM_STANDARD"
  | "MUSIC_LIGHT"
  | "MUSIC_STANDARD"
  | "NONE"
  | "SPEECH"
  | (string & {});
export interface Eac3AtmosSettings {
  Bitrate?: number;
  CodingMode?: Eac3AtmosCodingMode;
  Dialnorm?: number;
  DrcLine?: Eac3AtmosDrcLine;
  DrcRf?: Eac3AtmosDrcRf;
  HeightTrim?: number;
  SurroundTrim?: number;
}
export type Eac3AttenuationControl = "ATTENUATE_3_DB" | "NONE" | (string & {});
export type Eac3BitstreamMode =
  | "COMMENTARY"
  | "COMPLETE_MAIN"
  | "EMERGENCY"
  | "HEARING_IMPAIRED"
  | "VISUALLY_IMPAIRED"
  | (string & {});
export type Eac3CodingMode =
  | "CODING_MODE_1_0"
  | "CODING_MODE_2_0"
  | "CODING_MODE_3_2"
  | (string & {});
export type Eac3DcFilter = "DISABLED" | "ENABLED" | (string & {});
export type Eac3DrcLine =
  | "FILM_LIGHT"
  | "FILM_STANDARD"
  | "MUSIC_LIGHT"
  | "MUSIC_STANDARD"
  | "NONE"
  | "SPEECH"
  | (string & {});
export type Eac3DrcRf =
  | "FILM_LIGHT"
  | "FILM_STANDARD"
  | "MUSIC_LIGHT"
  | "MUSIC_STANDARD"
  | "NONE"
  | "SPEECH"
  | (string & {});
export type Eac3LfeControl = "LFE" | "NO_LFE" | (string & {});
export type Eac3LfeFilter = "DISABLED" | "ENABLED" | (string & {});
export type Eac3MetadataControl = "FOLLOW_INPUT" | "USE_CONFIGURED" | (string & {});
export type Eac3PassthroughControl = "NO_PASSTHROUGH" | "WHEN_POSSIBLE" | (string & {});
export type Eac3PhaseControl = "NO_SHIFT" | "SHIFT_90_DEGREES" | (string & {});
export type Eac3StereoDownmix = "DPL2" | "LO_RO" | "LT_RT" | "NOT_INDICATED" | (string & {});
export type Eac3SurroundExMode = "DISABLED" | "ENABLED" | "NOT_INDICATED" | (string & {});
export type Eac3SurroundMode = "DISABLED" | "ENABLED" | "NOT_INDICATED" | (string & {});
export interface Eac3Settings {
  AttenuationControl?: Eac3AttenuationControl;
  Bitrate?: number;
  BitstreamMode?: Eac3BitstreamMode;
  CodingMode?: Eac3CodingMode;
  DcFilter?: Eac3DcFilter;
  Dialnorm?: number;
  DrcLine?: Eac3DrcLine;
  DrcRf?: Eac3DrcRf;
  LfeControl?: Eac3LfeControl;
  LfeFilter?: Eac3LfeFilter;
  LoRoCenterMixLevel?: number;
  LoRoSurroundMixLevel?: number;
  LtRtCenterMixLevel?: number;
  LtRtSurroundMixLevel?: number;
  MetadataControl?: Eac3MetadataControl;
  PassthroughControl?: Eac3PassthroughControl;
  PhaseControl?: Eac3PhaseControl;
  StereoDownmix?: Eac3StereoDownmix;
  SurroundExMode?: Eac3SurroundExMode;
  SurroundMode?: Eac3SurroundMode;
}
export type Mp2CodingMode = "CODING_MODE_1_0" | "CODING_MODE_2_0" | (string & {});
export interface Mp2Settings {
  Bitrate?: number;
  CodingMode?: Mp2CodingMode;
  SampleRate?: number;
}
export interface PassThroughSettings {}
export type WavCodingMode =
  | "CODING_MODE_1_0"
  | "CODING_MODE_2_0"
  | "CODING_MODE_4_0"
  | "CODING_MODE_8_0"
  | (string & {});
export interface WavSettings {
  BitDepth?: number;
  CodingMode?: WavCodingMode;
  SampleRate?: number;
}
export interface AudioCodecSettings {
  AacSettings?: AacSettings;
  Ac3Settings?: Ac3Settings;
  Eac3AtmosSettings?: Eac3AtmosSettings;
  Eac3Settings?: Eac3Settings;
  Mp2Settings?: Mp2Settings;
  PassThroughSettings?: PassThroughSettings;
  WavSettings?: WavSettings;
}
export type __stringMin1Max35 = string;
export type AudioDescriptionLanguageCodeControl = "FOLLOW_INPUT" | "USE_CONFIGURED" | (string & {});
export type __stringMax255 = string;
export type __integerMinNegative60Max6 = number;
export type __integerMin0Max15 = number;
export interface InputChannelLevel {
  Gain?: number;
  InputChannel?: number;
}
export type __listOfInputChannelLevel = InputChannelLevel[];
const __listOfInputChannelLevel = /*@__PURE__*/ __L.at(__c56, 14);
export interface AudioChannelMapping {
  InputChannelLevels?: InputChannelLevel[];
  OutputChannel?: number;
}
export type __listOfAudioChannelMapping = AudioChannelMapping[];
const __listOfAudioChannelMapping = /*@__PURE__*/ __L.at(__c56, 16);
export type __integerMin1Max16 = number;
export type __integerMin1Max8 = number;
export interface RemixSettings {
  ChannelMappings?: AudioChannelMapping[];
  ChannelsIn?: number;
  ChannelsOut?: number;
}
export type DashRoleAudio =
  | "ALTERNATE"
  | "COMMENTARY"
  | "DESCRIPTION"
  | "DUB"
  | "EMERGENCY"
  | "ENHANCED-AUDIO-INTELLIGIBILITY"
  | "KARAOKE"
  | "MAIN"
  | "SUPPLEMENTARY"
  | (string & {});
export type __listOfDashRoleAudio = DashRoleAudio[];
const __listOfDashRoleAudio = /*@__PURE__*/ __L.at(__c56, 18);
export type DvbDashAccessibility =
  | "DVBDASH_1_VISUALLY_IMPAIRED"
  | "DVBDASH_2_HARD_OF_HEARING"
  | "DVBDASH_3_SUPPLEMENTAL_COMMENTARY"
  | "DVBDASH_4_DIRECTORS_COMMENTARY"
  | "DVBDASH_5_EDUCATIONAL_NOTES"
  | "DVBDASH_6_MAIN_PROGRAM"
  | "DVBDASH_7_CLEAN_FEED"
  | (string & {});
export interface AudioDescription {
  AudioNormalizationSettings?: AudioNormalizationSettings;
  AudioSelectorName?: string;
  AudioType?: AudioType;
  AudioTypeControl?: AudioDescriptionAudioTypeControl;
  AudioWatermarkingSettings?: AudioWatermarkSettings;
  CodecSettings?: AudioCodecSettings;
  LanguageCode?: string;
  LanguageCodeControl?: AudioDescriptionLanguageCodeControl;
  Name?: string;
  RemixSettings?: RemixSettings;
  StreamName?: string;
  AudioDashRoles?: DashRoleAudio[];
  DvbDashAccessibility?: DvbDashAccessibility;
}
export type __listOfAudioDescription = AudioDescription[];
const __listOfAudioDescription = /*@__PURE__*/ __L.at(__c50, 12);
export type AvailBlankingState = "DISABLED" | "ENABLED" | (string & {});
export interface AvailBlanking {
  AvailBlankingImage?: InputLocation;
  State?: AvailBlankingState;
}
export type __stringMax256 = string;
export type __integerMinNegative1000Max1000 = number;
export interface Esam {
  AcquisitionPointId?: string;
  AdAvailOffset?: number;
  PasswordParam?: string;
  PoisEndpoint?: string;
  Username?: string;
  ZoneIdentity?: string;
}
export type Scte35SpliceInsertNoRegionalBlackoutBehavior = "FOLLOW" | "IGNORE" | (string & {});
export type Scte35SpliceInsertWebDeliveryAllowedBehavior = "FOLLOW" | "IGNORE" | (string & {});
export interface Scte35SpliceInsert {
  AdAvailOffset?: number;
  NoRegionalBlackoutFlag?: Scte35SpliceInsertNoRegionalBlackoutBehavior;
  WebDeliveryAllowedFlag?: Scte35SpliceInsertWebDeliveryAllowedBehavior;
}
export type Scte35AposNoRegionalBlackoutBehavior = "FOLLOW" | "IGNORE" | (string & {});
export type Scte35AposWebDeliveryAllowedBehavior = "FOLLOW" | "IGNORE" | (string & {});
export interface Scte35TimeSignalApos {
  AdAvailOffset?: number;
  NoRegionalBlackoutFlag?: Scte35AposNoRegionalBlackoutBehavior;
  WebDeliveryAllowedFlag?: Scte35AposWebDeliveryAllowedBehavior;
}
export interface AvailSettings {
  Esam?: Esam;
  Scte35SpliceInsert?: Scte35SpliceInsert;
  Scte35TimeSignalApos?: Scte35TimeSignalApos;
}
export type Scte35SegmentationScope =
  | "ALL_OUTPUT_GROUPS"
  | "SCTE35_ENABLED_OUTPUT_GROUPS"
  | (string & {});
export interface AvailConfiguration {
  AvailSettings?: AvailSettings;
  Scte35SegmentationScope?: Scte35SegmentationScope;
}
export type BlackoutSlateNetworkEndBlackout = "DISABLED" | "ENABLED" | (string & {});
export type __stringMin34Max34 = string;
export type BlackoutSlateState = "DISABLED" | "ENABLED" | (string & {});
export interface BlackoutSlate {
  BlackoutSlateImage?: InputLocation;
  NetworkEndBlackout?: BlackoutSlateNetworkEndBlackout;
  NetworkEndBlackoutImage?: InputLocation;
  NetworkId?: string;
  State?: BlackoutSlateState;
}
export type AccessibilityType =
  | "DOES_NOT_IMPLEMENT_ACCESSIBILITY_FEATURES"
  | "IMPLEMENTS_ACCESSIBILITY_FEATURES"
  | (string & {});
export interface AribDestinationSettings {}
export type BurnInAlignment = "CENTERED" | "LEFT" | "SMART" | (string & {});
export type BurnInBackgroundColor = "BLACK" | "NONE" | "WHITE" | (string & {});
export type BurnInFontColor =
  | "BLACK"
  | "BLUE"
  | "GREEN"
  | "RED"
  | "WHITE"
  | "YELLOW"
  | (string & {});
export type __integerMin96Max600 = number;
export type BurnInOutlineColor =
  | "BLACK"
  | "BLUE"
  | "GREEN"
  | "RED"
  | "WHITE"
  | "YELLOW"
  | (string & {});
export type __integerMin0Max10 = number;
export type BurnInShadowColor = "BLACK" | "NONE" | "WHITE" | (string & {});
export type BurnInTeletextGridControl = "FIXED" | "SCALED" | (string & {});
export type BurnInDestinationSubtitleRows = "ROWS_16" | "ROWS_20" | "ROWS_24" | (string & {});
export interface BurnInDestinationSettings {
  Alignment?: BurnInAlignment;
  BackgroundColor?: BurnInBackgroundColor;
  BackgroundOpacity?: number;
  Font?: InputLocation;
  FontColor?: BurnInFontColor;
  FontOpacity?: number;
  FontResolution?: number;
  FontSize?: string;
  OutlineColor?: BurnInOutlineColor;
  OutlineSize?: number;
  ShadowColor?: BurnInShadowColor;
  ShadowOpacity?: number;
  ShadowXOffset?: number;
  ShadowYOffset?: number;
  TeletextGridControl?: BurnInTeletextGridControl;
  XPosition?: number;
  YPosition?: number;
  SubtitleRows?: BurnInDestinationSubtitleRows;
}
export type DvbSubDestinationAlignment = "CENTERED" | "LEFT" | "SMART" | (string & {});
export type DvbSubDestinationBackgroundColor = "BLACK" | "NONE" | "WHITE" | (string & {});
export type DvbSubDestinationFontColor =
  | "BLACK"
  | "BLUE"
  | "GREEN"
  | "RED"
  | "WHITE"
  | "YELLOW"
  | (string & {});
export type DvbSubDestinationOutlineColor =
  | "BLACK"
  | "BLUE"
  | "GREEN"
  | "RED"
  | "WHITE"
  | "YELLOW"
  | (string & {});
export type DvbSubDestinationShadowColor = "BLACK" | "NONE" | "WHITE" | (string & {});
export type DvbSubDestinationTeletextGridControl = "FIXED" | "SCALED" | (string & {});
export type DvbSubDestinationSubtitleRows = "ROWS_16" | "ROWS_20" | "ROWS_24" | (string & {});
export interface DvbSubDestinationSettings {
  Alignment?: DvbSubDestinationAlignment;
  BackgroundColor?: DvbSubDestinationBackgroundColor;
  BackgroundOpacity?: number;
  Font?: InputLocation;
  FontColor?: DvbSubDestinationFontColor;
  FontOpacity?: number;
  FontResolution?: number;
  FontSize?: string;
  OutlineColor?: DvbSubDestinationOutlineColor;
  OutlineSize?: number;
  ShadowColor?: DvbSubDestinationShadowColor;
  ShadowOpacity?: number;
  ShadowXOffset?: number;
  ShadowYOffset?: number;
  TeletextGridControl?: DvbSubDestinationTeletextGridControl;
  XPosition?: number;
  YPosition?: number;
  SubtitleRows?: DvbSubDestinationSubtitleRows;
}
export type __stringMax1000 = string;
export type EbuTtDFillLineGapControl = "DISABLED" | "ENABLED" | (string & {});
export type EbuTtDDestinationStyleControl = "EXCLUDE" | "INCLUDE" | (string & {});
export type __integerMin1Max800 = number;
export type __integerMin80Max800 = number;
export interface EbuTtDDestinationSettings {
  CopyrightHolder?: string;
  FillLineGap?: EbuTtDFillLineGapControl;
  FontFamily?: string;
  StyleControl?: EbuTtDDestinationStyleControl;
  DefaultFontSize?: number;
  DefaultLineHeight?: number;
}
export type __integerMin1Max15 = number;
export interface EmbeddedCaptionPositionSettings {
  YPositionLine?: number;
}
export type EmbeddedDestinationStyleControl = "MANUAL" | "PASSTHROUGH" | (string & {});
export interface EmbeddedDestinationSettings {
  Position?: EmbeddedCaptionPositionSettings;
  StyleControl?: EmbeddedDestinationStyleControl;
}
export interface EmbeddedPlusScte20DestinationSettings {}
export interface RtmpCaptionInfoDestinationSettings {}
export interface Scte20PlusEmbeddedDestinationSettings {}
export interface Scte27DestinationSettings {}
export interface SmpteTtDestinationSettings {}
export interface TeletextDestinationSettings {}
export type TtmlDestinationStyleControl =
  | "PASSTHROUGH"
  | "USE_CONFIGURED"
  | "MANUAL"
  | (string & {});
export interface TextCaptionPositionSettings {
  YPositionPercentage?: number;
}
export interface TtmlDestinationSettings {
  StyleControl?: TtmlDestinationStyleControl;
  Position?: TextCaptionPositionSettings;
}
export type WebvttDestinationStyleControl =
  | "NO_STYLE_DATA"
  | "PASSTHROUGH"
  | "MANUAL"
  | (string & {});
export interface WebvttDestinationSettings {
  StyleControl?: WebvttDestinationStyleControl;
  Position?: TextCaptionPositionSettings;
}
export interface CaptionDestinationSettings {
  AribDestinationSettings?: AribDestinationSettings;
  BurnInDestinationSettings?: BurnInDestinationSettings;
  DvbSubDestinationSettings?: DvbSubDestinationSettings;
  EbuTtDDestinationSettings?: EbuTtDDestinationSettings;
  EmbeddedDestinationSettings?: EmbeddedDestinationSettings;
  EmbeddedPlusScte20DestinationSettings?: EmbeddedPlusScte20DestinationSettings;
  RtmpCaptionInfoDestinationSettings?: RtmpCaptionInfoDestinationSettings;
  Scte20PlusEmbeddedDestinationSettings?: Scte20PlusEmbeddedDestinationSettings;
  Scte27DestinationSettings?: Scte27DestinationSettings;
  SmpteTtDestinationSettings?: SmpteTtDestinationSettings;
  TeletextDestinationSettings?: TeletextDestinationSettings;
  TtmlDestinationSettings?: TtmlDestinationSettings;
  WebvttDestinationSettings?: WebvttDestinationSettings;
}
export type DashRoleCaption =
  | "ALTERNATE"
  | "CAPTION"
  | "COMMENTARY"
  | "DESCRIPTION"
  | "DUB"
  | "EASYREADER"
  | "EMERGENCY"
  | "FORCED-SUBTITLE"
  | "KARAOKE"
  | "MAIN"
  | "METADATA"
  | "SUBTITLE"
  | "SUPPLEMENTARY"
  | (string & {});
export type __listOfDashRoleCaption = DashRoleCaption[];
const __listOfDashRoleCaption = __listOfDashRoleAudio as any as S.Schema<__listOfDashRoleCaption>;
export interface CaptionDescription {
  Accessibility?: AccessibilityType;
  CaptionSelectorName?: string;
  DestinationSettings?: CaptionDestinationSettings;
  LanguageCode?: string;
  LanguageDescription?: string;
  Name?: string;
  CaptionDashRoles?: DashRoleCaption[];
  DvbDashAccessibility?: DvbDashAccessibility;
}
export type __listOfCaptionDescription = CaptionDescription[];
const __listOfCaptionDescription = /*@__PURE__*/ __L.at(__c50, 27);
export type FeatureActivationsInputPrepareScheduleActions = "DISABLED" | "ENABLED" | (string & {});
export type FeatureActivationsOutputStaticImageOverlayScheduleActions =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export interface FeatureActivations {
  InputPrepareScheduleActions?: FeatureActivationsInputPrepareScheduleActions;
  OutputStaticImageOverlayScheduleActions?: FeatureActivationsOutputStaticImageOverlayScheduleActions;
}
export type __integerMinNegative60Max60 = number;
export type GlobalConfigurationInputEndAction = "NONE" | "SWITCH_AND_LOOP_INPUTS" | (string & {});
export type __integerMin0Max1000000 = number;
export type __stringMin6Max6 = string;
export type InputLossImageType = "COLOR" | "SLATE" | (string & {});
export interface InputLossBehavior {
  BlackFrameMsec?: number;
  InputLossImageColor?: string;
  InputLossImageSlate?: InputLocation;
  InputLossImageType?: InputLossImageType;
  RepeatFrameMsec?: number;
}
export type GlobalConfigurationOutputLockingMode =
  | "EPOCH_LOCKING"
  | "PIPELINE_LOCKING"
  | "DISABLED"
  | (string & {});
export type GlobalConfigurationOutputTimingSource = "INPUT_CLOCK" | "SYSTEM_CLOCK" | (string & {});
export type GlobalConfigurationLowFramerateInputs = "DISABLED" | "ENABLED" | (string & {});
export interface EpochLockingSettings {
  CustomEpoch?: string;
  JamSyncTime?: string;
}
export type PipelineLockingMethod = "SOURCE_TIMECODE" | "VIDEO_ALIGNMENT" | (string & {});
export interface PipelineLockingSettings {
  PipelineLockingMethod?: PipelineLockingMethod;
  CustomEpoch?: string;
}
export interface DisabledLockingSettings {
  CustomEpoch?: string;
}
export interface OutputLockingSettings {
  EpochLockingSettings?: EpochLockingSettings;
  PipelineLockingSettings?: PipelineLockingSettings;
  DisabledLockingSettings?: DisabledLockingSettings;
}
export interface GlobalConfiguration {
  InitialAudioGain?: number;
  InputEndAction?: GlobalConfigurationInputEndAction;
  InputLossBehavior?: InputLossBehavior;
  OutputLockingMode?: GlobalConfigurationOutputLockingMode;
  OutputTimingSource?: GlobalConfigurationOutputTimingSource;
  SupportLowFramerateInputs?: GlobalConfigurationLowFramerateInputs;
  OutputLockingSettings?: OutputLockingSettings;
}
export type MotionGraphicsInsertion = "DISABLED" | "ENABLED" | (string & {});
export interface HtmlMotionGraphicsSettings {}
export interface MotionGraphicsSettings {
  HtmlMotionGraphicsSettings?: HtmlMotionGraphicsSettings;
}
export interface MotionGraphicsConfiguration {
  MotionGraphicsInsertion?: MotionGraphicsInsertion;
  MotionGraphicsSettings?: MotionGraphicsSettings;
}
export type NielsenPcmToId3TaggingState = "DISABLED" | "ENABLED" | (string & {});
export interface NielsenConfiguration {
  DistributorId?: string;
  NielsenPcmToId3Tagging?: NielsenPcmToId3TaggingState;
}
export type __stringMax32 = string;
export type S3CannedAcl =
  | "AUTHENTICATED_READ"
  | "BUCKET_OWNER_FULL_CONTROL"
  | "BUCKET_OWNER_READ"
  | "PUBLIC_READ"
  | (string & {});
export interface ArchiveS3Settings {
  CannedAcl?: S3CannedAcl;
}
export interface ArchiveCdnSettings {
  ArchiveS3Settings?: ArchiveS3Settings;
}
export interface OutputLocationRef {
  DestinationRefId?: string;
}
export interface ArchiveGroupSettings {
  ArchiveCdnSettings?: ArchiveCdnSettings;
  Destination?: OutputLocationRef;
  RolloverInterval?: number;
}
export interface FrameCaptureS3Settings {
  CannedAcl?: S3CannedAcl;
}
export interface FrameCaptureCdnSettings {
  FrameCaptureS3Settings?: FrameCaptureS3Settings;
}
export interface FrameCaptureGroupSettings {
  Destination?: OutputLocationRef;
  FrameCaptureCdnSettings?: FrameCaptureCdnSettings;
}
export type HlsAdMarkers = "ADOBE" | "ELEMENTAL" | "ELEMENTAL_SCTE35" | (string & {});
export type __listOfHlsAdMarkers = HlsAdMarkers[];
const __listOfHlsAdMarkers = __listOfDashRoleAudio as any as S.Schema<__listOfHlsAdMarkers>;
export type __integerMin1Max4 = number;
export type __stringMin3Max3 = string;
export interface CaptionLanguageMapping {
  CaptionChannel?: number;
  LanguageCode?: string;
  LanguageDescription?: string;
}
export type __listOfCaptionLanguageMapping = CaptionLanguageMapping[];
const __listOfCaptionLanguageMapping = /*@__PURE__*/ __L.at(__c51, 13);
export type HlsCaptionLanguageSetting = "INSERT" | "NONE" | "OMIT" | (string & {});
export type HlsClientCache = "DISABLED" | "ENABLED" | (string & {});
export type HlsCodecSpecification = "RFC_4281" | "RFC_6381" | (string & {});
export type __stringMin32Max32 = string;
export type HlsDirectoryStructure = "SINGLE_DIRECTORY" | "SUBDIRECTORY_PER_STREAM" | (string & {});
export type HlsDiscontinuityTags = "INSERT" | "NEVER_INSERT" | (string & {});
export type HlsEncryptionType = "AES128" | "SAMPLE_AES" | (string & {});
export type __integerMin0Max600 = number;
export type HlsAkamaiHttpTransferMode = "CHUNKED" | "NON_CHUNKED" | (string & {});
export interface HlsAkamaiSettings {
  ConnectionRetryInterval?: number;
  FilecacheDuration?: number;
  HttpTransferMode?: HlsAkamaiHttpTransferMode;
  NumRetries?: number;
  RestartDelay?: number;
  Salt?: string;
  Token?: string;
}
export interface HlsBasicPutSettings {
  ConnectionRetryInterval?: number;
  FilecacheDuration?: number;
  NumRetries?: number;
  RestartDelay?: number;
}
export type HlsMediaStoreStorageClass = "TEMPORAL" | (string & {});
export interface HlsMediaStoreSettings {
  ConnectionRetryInterval?: number;
  FilecacheDuration?: number;
  MediaStoreStorageClass?: HlsMediaStoreStorageClass;
  NumRetries?: number;
  RestartDelay?: number;
}
export interface HlsS3Settings {
  CannedAcl?: S3CannedAcl;
}
export type HlsWebdavHttpTransferMode = "CHUNKED" | "NON_CHUNKED" | (string & {});
export interface HlsWebdavSettings {
  ConnectionRetryInterval?: number;
  FilecacheDuration?: number;
  HttpTransferMode?: HlsWebdavHttpTransferMode;
  NumRetries?: number;
  RestartDelay?: number;
}
export interface HlsCdnSettings {
  HlsAkamaiSettings?: HlsAkamaiSettings;
  HlsBasicPutSettings?: HlsBasicPutSettings;
  HlsMediaStoreSettings?: HlsMediaStoreSettings;
  HlsS3Settings?: HlsS3Settings;
  HlsWebdavSettings?: HlsWebdavSettings;
}
export type HlsId3SegmentTaggingState = "DISABLED" | "ENABLED" | (string & {});
export type IFrameOnlyPlaylistType = "DISABLED" | "STANDARD" | (string & {});
export type HlsIncompleteSegmentBehavior = "AUTO" | "SUPPRESS" | (string & {});
export type __integerMin3 = number;
export type InputLossActionForHlsOut = "EMIT_OUTPUT" | "PAUSE_OUTPUT" | (string & {});
export type HlsIvInManifest = "EXCLUDE" | "INCLUDE" | (string & {});
export type HlsIvSource = "EXPLICIT" | "FOLLOWS_SEGMENT_NUMBER" | (string & {});
export interface StaticKeySettings {
  KeyProviderServer?: InputLocation;
  StaticKeyValue?: string | redacted.Redacted<string>;
}
export interface KeyProviderSettings {
  StaticKeySettings?: StaticKeySettings;
}
export type HlsManifestCompression = "GZIP" | "NONE" | (string & {});
export type HlsManifestDurationFormat = "FLOATING_POINT" | "INTEGER" | (string & {});
export type HlsMode = "LIVE" | "VOD" | (string & {});
export type HlsOutputSelection =
  | "MANIFESTS_AND_SEGMENTS"
  | "SEGMENTS_ONLY"
  | "VARIANT_MANIFESTS_AND_SEGMENTS"
  | (string & {});
export type HlsProgramDateTime = "EXCLUDE" | "INCLUDE" | (string & {});
export type HlsProgramDateTimeClock =
  | "INITIALIZE_FROM_OUTPUT_TIMECODE"
  | "SYSTEM_CLOCK"
  | (string & {});
export type __integerMin0Max3600 = number;
export type HlsRedundantManifest = "DISABLED" | "ENABLED" | (string & {});
export type HlsSegmentationMode = "USE_INPUT_SEGMENTATION" | "USE_SEGMENT_DURATION" | (string & {});
export type HlsStreamInfResolution = "EXCLUDE" | "INCLUDE" | (string & {});
export type HlsTimedMetadataId3Frame = "NONE" | "PRIV" | "TDRL" | (string & {});
export type HlsTsFileMode = "SEGMENTED_FILES" | "SINGLE_FILE" | (string & {});
export interface HlsGroupSettings {
  AdMarkers?: HlsAdMarkers[];
  BaseUrlContent?: string;
  BaseUrlContent1?: string;
  BaseUrlManifest?: string;
  BaseUrlManifest1?: string;
  CaptionLanguageMappings?: CaptionLanguageMapping[];
  CaptionLanguageSetting?: HlsCaptionLanguageSetting;
  ClientCache?: HlsClientCache;
  CodecSpecification?: HlsCodecSpecification;
  ConstantIv?: string;
  Destination?: OutputLocationRef;
  DirectoryStructure?: HlsDirectoryStructure;
  DiscontinuityTags?: HlsDiscontinuityTags;
  EncryptionType?: HlsEncryptionType;
  HlsCdnSettings?: HlsCdnSettings;
  HlsId3SegmentTagging?: HlsId3SegmentTaggingState;
  IFrameOnlyPlaylists?: IFrameOnlyPlaylistType;
  IncompleteSegmentBehavior?: HlsIncompleteSegmentBehavior;
  IndexNSegments?: number;
  InputLossAction?: InputLossActionForHlsOut;
  IvInManifest?: HlsIvInManifest;
  IvSource?: HlsIvSource;
  KeepSegments?: number;
  KeyFormat?: string;
  KeyFormatVersions?: string;
  KeyProviderSettings?: KeyProviderSettings;
  ManifestCompression?: HlsManifestCompression;
  ManifestDurationFormat?: HlsManifestDurationFormat;
  MinSegmentLength?: number;
  Mode?: HlsMode;
  OutputSelection?: HlsOutputSelection;
  ProgramDateTime?: HlsProgramDateTime;
  ProgramDateTimeClock?: HlsProgramDateTimeClock;
  ProgramDateTimePeriod?: number;
  RedundantManifest?: HlsRedundantManifest;
  SegmentLength?: number;
  SegmentationMode?: HlsSegmentationMode;
  SegmentsPerSubdirectory?: number;
  StreamInfResolution?: HlsStreamInfResolution;
  TimedMetadataId3Frame?: HlsTimedMetadataId3Frame;
  TimedMetadataId3Period?: number;
  TimestampDeltaMilliseconds?: number;
  TsFileMode?: HlsTsFileMode;
}
export type CmafId3Behavior = "DISABLED" | "ENABLED" | (string & {});
export type CmafKLVBehavior = "NO_PASSTHROUGH" | "PASSTHROUGH" | (string & {});
export type CmafNielsenId3Behavior = "NO_PASSTHROUGH" | "PASSTHROUGH" | (string & {});
export type Scte35Type =
  | "NONE"
  | "SCTE_35_WITHOUT_SEGMENTATION"
  | "SCTE_35_WITHOUT_IDR"
  | (string & {});
export type CmafIngestSegmentLengthUnits = "MILLISECONDS" | "SECONDS" | (string & {});
export type CmafTimedMetadataId3Frame = "NONE" | "PRIV" | "TDRL" | (string & {});
export type __integerMin0Max10000 = number;
export type CmafTimedMetadataPassthrough = "DISABLED" | "ENABLED" | (string & {});
export interface MediaPackageAdditionalDestinations {
  Destination?: OutputLocationRef;
}
export type __listOfMediaPackageAdditionalDestinations = MediaPackageAdditionalDestinations[];
const __listOfMediaPackageAdditionalDestinations = /*@__PURE__*/ __L.at(__c51, 23);
export type __listOfOutputLocationRef = OutputLocationRef[];
const __listOfOutputLocationRef = /*@__PURE__*/ __L.at(__c51, 24);
export type __doubleMin250Max5000 = number;
export type __doubleMinNegative1Max5 = number;
export type __doubleMin32Max46 = number;
export interface AbWatermarkingCustomProfile {
  EmbeddingFrequency?: number;
  SceneCut?: number;
  TargetPsnr?: number;
}
export type __integerMin1Max511 = number;
export type __integerMin1Max1000 = number;
export type AbWatermarkingProfile =
  | "CAMCORDING"
  | "CUSTOM"
  | "DEFAULT"
  | "HQ"
  | "MEZZANINE"
  | "ROBUST"
  | (string & {});
export type AbWatermarkerIdLength = "ID_2048" | "ID_512" | (string & {});
export interface MediaPackageV2AbWatermarkerIrdetoSettings {
  AdditionalDestinationsAlternateDestinations?: OutputLocationRef[];
  AlternateDestination?: OutputLocationRef;
  CustomProfile?: AbWatermarkingCustomProfile;
  License?: string;
  OperatorId?: number;
  PolyPeriod?: number;
  Profile?: AbWatermarkingProfile;
  WatermarkIdLength?: AbWatermarkerIdLength;
}
export interface MediaPackageV2WatermarkingSettings {
  MediaPackageV2AbWatermarkerIrdetoSettings?: MediaPackageV2AbWatermarkerIrdetoSettings;
}
export interface MediaPackageV2GroupSettings {
  CaptionLanguageMappings?: CaptionLanguageMapping[];
  Id3Behavior?: CmafId3Behavior;
  KlvBehavior?: CmafKLVBehavior;
  NielsenId3Behavior?: CmafNielsenId3Behavior;
  Scte35Type?: Scte35Type;
  SegmentLength?: number;
  SegmentLengthUnits?: CmafIngestSegmentLengthUnits;
  TimedMetadataId3Frame?: CmafTimedMetadataId3Frame;
  TimedMetadataId3Period?: number;
  TimedMetadataPassthrough?: CmafTimedMetadataPassthrough;
  AdditionalDestinations?: MediaPackageAdditionalDestinations[];
  WatermarkingSettings?: MediaPackageV2WatermarkingSettings;
}
export interface MediaPackageGroupSettings {
  Destination?: OutputLocationRef;
  MediapackageV2GroupSettings?: MediaPackageV2GroupSettings;
}
export type SmoothGroupAudioOnlyTimecodeControl =
  | "PASSTHROUGH"
  | "USE_CONFIGURED_CLOCK"
  | (string & {});
export type SmoothGroupCertificateMode = "SELF_SIGNED" | "VERIFY_AUTHENTICITY" | (string & {});
export type SmoothGroupEventIdMode =
  | "NO_EVENT_ID"
  | "USE_CONFIGURED"
  | "USE_TIMESTAMP"
  | (string & {});
export type SmoothGroupEventStopBehavior = "NONE" | "SEND_EOS" | (string & {});
export type InputLossActionForMsSmoothOut = "EMIT_OUTPUT" | "PAUSE_OUTPUT" | (string & {});
export type SmoothGroupSegmentationMode =
  | "USE_INPUT_SEGMENTATION"
  | "USE_SEGMENT_DURATION"
  | (string & {});
export type SmoothGroupSparseTrackType =
  | "NONE"
  | "SCTE_35"
  | "SCTE_35_WITHOUT_SEGMENTATION"
  | (string & {});
export type SmoothGroupStreamManifestBehavior = "DO_NOT_SEND" | "SEND" | (string & {});
export type SmoothGroupTimestampOffsetMode =
  | "USE_CONFIGURED_OFFSET"
  | "USE_EVENT_START_DATE"
  | (string & {});
export interface MsSmoothGroupSettings {
  AcquisitionPointId?: string;
  AudioOnlyTimecodeControl?: SmoothGroupAudioOnlyTimecodeControl;
  CertificateMode?: SmoothGroupCertificateMode;
  ConnectionRetryInterval?: number;
  Destination?: OutputLocationRef;
  EventId?: string;
  EventIdMode?: SmoothGroupEventIdMode;
  EventStopBehavior?: SmoothGroupEventStopBehavior;
  FilecacheDuration?: number;
  FragmentLength?: number;
  InputLossAction?: InputLossActionForMsSmoothOut;
  NumRetries?: number;
  RestartDelay?: number;
  SegmentationMode?: SmoothGroupSegmentationMode;
  SendDelayMs?: number;
  SparseTrackType?: SmoothGroupSparseTrackType;
  StreamManifestBehavior?: SmoothGroupStreamManifestBehavior;
  TimestampOffset?: string;
  TimestampOffsetMode?: SmoothGroupTimestampOffsetMode;
}
export interface MultiplexGroupSettings {}
export type RtmpAdMarkers = "ON_CUE_POINT_SCTE35" | (string & {});
export type __listOfRtmpAdMarkers = RtmpAdMarkers[];
const __listOfRtmpAdMarkers = __listOfDashRoleAudio as any as S.Schema<__listOfRtmpAdMarkers>;
export type AuthenticationScheme = "AKAMAI" | "COMMON" | (string & {});
export type RtmpCacheFullBehavior = "DISCONNECT_IMMEDIATELY" | "WAIT_FOR_SERVER" | (string & {});
export type __integerMin30 = number;
export type RtmpCaptionData = "ALL" | "FIELD1_608" | "FIELD1_AND_FIELD2_608" | (string & {});
export type InputLossActionForRtmpOut = "EMIT_OUTPUT" | "PAUSE_OUTPUT" | (string & {});
export type IncludeFillerNalUnits = "AUTO" | "DROP" | "INCLUDE" | (string & {});
export interface RtmpGroupSettings {
  AdMarkers?: RtmpAdMarkers[];
  AuthenticationScheme?: AuthenticationScheme;
  CacheFullBehavior?: RtmpCacheFullBehavior;
  CacheLength?: number;
  CaptionData?: RtmpCaptionData;
  InputLossAction?: InputLossActionForRtmpOut;
  RestartDelay?: number;
  IncludeFillerNalUnits?: IncludeFillerNalUnits;
}
export type InputLossActionForUdpOut = "DROP_PROGRAM" | "DROP_TS" | "EMIT_PROGRAM" | (string & {});
export type UdpTimedMetadataId3Frame = "NONE" | "PRIV" | "TDRL" | (string & {});
export interface UdpGroupSettings {
  InputLossAction?: InputLossActionForUdpOut;
  TimedMetadataId3Frame?: UdpTimedMetadataId3Frame;
  TimedMetadataId3Period?: number;
}
export type __integerMin0Max2000 = number;
export type __stringMax100 = string;
export interface CmafIngestCaptionLanguageMapping {
  CaptionChannel?: number;
  LanguageCode?: string;
}
export type __listOfCmafIngestCaptionLanguageMapping = CmafIngestCaptionLanguageMapping[];
const __listOfCmafIngestCaptionLanguageMapping = /*@__PURE__*/ __L.at(__c52, 2);
export interface AdditionalDestinations {
  Destination?: OutputLocationRef;
}
export type __listOfAdditionalDestinations = AdditionalDestinations[];
const __listOfAdditionalDestinations =
  __listOfMediaPackageAdditionalDestinations as any as S.Schema<__listOfAdditionalDestinations>;
export interface CmafIngestAbWatermarkerIrdetoSettings {
  AdditionalDestinationsAlternateDestinations?: OutputLocationRef[];
  AlternateDestination?: OutputLocationRef;
  CustomProfile?: AbWatermarkingCustomProfile;
  License?: string;
  OperatorId?: number;
  PolyPeriod?: number;
  Profile?: AbWatermarkingProfile;
  WatermarkIdLength?: AbWatermarkerIdLength;
}
export interface CmafIngestWatermarkingSettings {
  CmafIngestAbWatermarkerIrdetoSettings?: CmafIngestAbWatermarkerIrdetoSettings;
}
export interface CmafIngestGroupSettings {
  Destination?: OutputLocationRef;
  NielsenId3Behavior?: CmafNielsenId3Behavior;
  Scte35Type?: Scte35Type;
  SegmentLength?: number;
  SegmentLengthUnits?: CmafIngestSegmentLengthUnits;
  SendDelayMs?: number;
  KlvBehavior?: CmafKLVBehavior;
  KlvNameModifier?: string;
  NielsenId3NameModifier?: string;
  Scte35NameModifier?: string;
  Id3Behavior?: CmafId3Behavior;
  Id3NameModifier?: string;
  CaptionLanguageMappings?: CmafIngestCaptionLanguageMapping[];
  TimedMetadataId3Frame?: CmafTimedMetadataId3Frame;
  TimedMetadataId3Period?: number;
  TimedMetadataPassthrough?: CmafTimedMetadataPassthrough;
  AdditionalDestinations?: AdditionalDestinations[];
  WatermarkingSettings?: CmafIngestWatermarkingSettings;
}
export interface SrtGroupSettings {
  InputLossAction?: InputLossActionForUdpOut;
}
export interface MediaConnectRouterGroupSettings {
  AvailabilityZones?: string[];
}
export interface OutputGroupSettings {
  ArchiveGroupSettings?: ArchiveGroupSettings;
  FrameCaptureGroupSettings?: FrameCaptureGroupSettings;
  HlsGroupSettings?: HlsGroupSettings;
  MediaPackageGroupSettings?: MediaPackageGroupSettings;
  MsSmoothGroupSettings?: MsSmoothGroupSettings;
  MultiplexGroupSettings?: MultiplexGroupSettings;
  RtmpGroupSettings?: RtmpGroupSettings;
  UdpGroupSettings?: UdpGroupSettings;
  CmafIngestGroupSettings?: CmafIngestGroupSettings;
  SrtGroupSettings?: SrtGroupSettings;
  MediaConnectRouterGroupSettings?: MediaConnectRouterGroupSettings;
}
export type __stringMin1Max255 = string;
export type M2tsAbsentInputAudioBehavior = "DROP" | "ENCODE_SILENCE" | (string & {});
export type M2tsArib = "DISABLED" | "ENABLED" | (string & {});
export type M2tsAribCaptionsPidControl = "AUTO" | "USE_CONFIGURED" | (string & {});
export type M2tsAudioBufferModel = "ATSC" | "DVB" | (string & {});
export type M2tsAudioStreamType = "ATSC" | "DVB" | (string & {});
export type M2tsBufferModel = "MULTIPLEX" | "NONE" | (string & {});
export type M2tsCcDescriptor = "DISABLED" | "ENABLED" | (string & {});
export type __integerMin0Max65536 = number;
export type __stringMin1Max256 = string;
export type __integerMin25Max10000 = number;
export interface DvbNitSettings {
  NetworkId?: number;
  NetworkName?: string;
  RepInterval?: number;
}
export type DvbSdtOutputSdt =
  | "SDT_FOLLOW"
  | "SDT_FOLLOW_IF_PRESENT"
  | "SDT_MANUAL"
  | "SDT_NONE"
  | (string & {});
export type __integerMin25Max2000 = number;
export interface DvbSdtSettings {
  OutputSdt?: DvbSdtOutputSdt;
  RepInterval?: number;
  ServiceName?: string;
  ServiceProviderName?: string;
}
export type __integerMin1000Max30000 = number;
export interface DvbTdtSettings {
  RepInterval?: number;
}
export type M2tsEbifControl = "NONE" | "PASSTHROUGH" | (string & {});
export type M2tsAudioInterval = "VIDEO_AND_FIXED_INTERVALS" | "VIDEO_INTERVAL" | (string & {});
export type M2tsEbpPlacement = "VIDEO_AND_AUDIO_PIDS" | "VIDEO_PID" | (string & {});
export type M2tsEsRateInPes = "EXCLUDE" | "INCLUDE" | (string & {});
export type __doubleMin0 = number;
export type M2tsKlv = "NONE" | "PASSTHROUGH" | (string & {});
export type M2tsNielsenId3Behavior = "NO_PASSTHROUGH" | "PASSTHROUGH" | (string & {});
export type __integerMin0Max1000 = number;
export type M2tsPcrControl = "CONFIGURED_PCR_PERIOD" | "PCR_EVERY_PES_PACKET" | (string & {});
export type __integerMin0Max500 = number;
export type __integerMin0Max65535 = number;
export type M2tsRateMode = "CBR" | "VBR" | (string & {});
export type M2tsScte35Control = "NONE" | "PASSTHROUGH" | "SCTE_35_WITHOUT_IDR" | (string & {});
export type M2tsSegmentationMarkers =
  | "EBP"
  | "EBP_LEGACY"
  | "NONE"
  | "PSI_SEGSTART"
  | "RAI_ADAPT"
  | "RAI_SEGSTART"
  | (string & {});
export type M2tsSegmentationStyle = "MAINTAIN_CADENCE" | "RESET_CADENCE" | (string & {});
export type __doubleMin1 = number;
export type M2tsTimedMetadataBehavior = "NO_PASSTHROUGH" | "PASSTHROUGH" | (string & {});
export type __doubleMin0Max5000 = number;
export interface M2tsSettings {
  AbsentInputAudioBehavior?: M2tsAbsentInputAudioBehavior;
  Arib?: M2tsArib;
  AribCaptionsPid?: string;
  AribCaptionsPidControl?: M2tsAribCaptionsPidControl;
  AudioBufferModel?: M2tsAudioBufferModel;
  AudioFramesPerPes?: number;
  AudioPids?: string;
  AudioStreamType?: M2tsAudioStreamType;
  Bitrate?: number;
  BufferModel?: M2tsBufferModel;
  CcDescriptor?: M2tsCcDescriptor;
  DvbNitSettings?: DvbNitSettings;
  DvbSdtSettings?: DvbSdtSettings;
  DvbSubPids?: string;
  DvbTdtSettings?: DvbTdtSettings;
  DvbTeletextPid?: string;
  Ebif?: M2tsEbifControl;
  EbpAudioInterval?: M2tsAudioInterval;
  EbpLookaheadMs?: number;
  EbpPlacement?: M2tsEbpPlacement;
  EcmPid?: string;
  EsRateInPes?: M2tsEsRateInPes;
  EtvPlatformPid?: string;
  EtvSignalPid?: string;
  FragmentTime?: number;
  Klv?: M2tsKlv;
  KlvDataPids?: string;
  NielsenId3Behavior?: M2tsNielsenId3Behavior;
  NullPacketBitrate?: number;
  PatInterval?: number;
  PcrControl?: M2tsPcrControl;
  PcrPeriod?: number;
  PcrPid?: string;
  PmtInterval?: number;
  PmtPid?: string;
  ProgramNum?: number;
  RateMode?: M2tsRateMode;
  Scte27Pids?: string;
  Scte35Control?: M2tsScte35Control;
  Scte35Pid?: string;
  SegmentationMarkers?: M2tsSegmentationMarkers;
  SegmentationStyle?: M2tsSegmentationStyle;
  SegmentationTime?: number;
  TimedMetadataBehavior?: M2tsTimedMetadataBehavior;
  TimedMetadataPid?: string;
  TransportStreamId?: number;
  VideoPid?: string;
  Scte35PrerollPullupMilliseconds?: number;
}
export interface RawSettings {}
export interface ArchiveContainerSettings {
  M2tsSettings?: M2tsSettings;
  RawSettings?: RawSettings;
}
export interface ArchiveOutputSettings {
  ContainerSettings?: ArchiveContainerSettings;
  Extension?: string;
  NameModifier?: string;
}
export interface FrameCaptureOutputSettings {
  NameModifier?: string;
}
export type HlsH265PackagingType = "HEV1" | "HVC1" | (string & {});
export type AudioOnlyHlsTrackType =
  | "ALTERNATE_AUDIO_AUTO_SELECT"
  | "ALTERNATE_AUDIO_AUTO_SELECT_DEFAULT"
  | "ALTERNATE_AUDIO_NOT_AUTO_SELECT"
  | "AUDIO_ONLY_VARIANT_STREAM"
  | (string & {});
export type AudioOnlyHlsSegmentType = "AAC" | "FMP4" | (string & {});
export interface AudioOnlyHlsSettings {
  AudioGroupId?: string;
  AudioOnlyImage?: InputLocation;
  AudioTrackType?: AudioOnlyHlsTrackType;
  SegmentType?: AudioOnlyHlsSegmentType;
}
export type Fmp4NielsenId3Behavior = "NO_PASSTHROUGH" | "PASSTHROUGH" | (string & {});
export type Fmp4TimedMetadataBehavior = "NO_PASSTHROUGH" | "PASSTHROUGH" | (string & {});
export interface Fmp4HlsSettings {
  AudioRenditionSets?: string;
  NielsenId3Behavior?: Fmp4NielsenId3Behavior;
  TimedMetadataBehavior?: Fmp4TimedMetadataBehavior;
}
export interface FrameCaptureHlsSettings {}
export type M3u8NielsenId3Behavior = "NO_PASSTHROUGH" | "PASSTHROUGH" | (string & {});
export type M3u8PcrControl = "CONFIGURED_PCR_PERIOD" | "PCR_EVERY_PES_PACKET" | (string & {});
export type M3u8Scte35Behavior = "NO_PASSTHROUGH" | "PASSTHROUGH" | (string & {});
export type M3u8TimedMetadataBehavior = "NO_PASSTHROUGH" | "PASSTHROUGH" | (string & {});
export type M3u8KlvBehavior = "NO_PASSTHROUGH" | "PASSTHROUGH" | (string & {});
export interface M3u8Settings {
  AudioFramesPerPes?: number;
  AudioPids?: string;
  EcmPid?: string;
  NielsenId3Behavior?: M3u8NielsenId3Behavior;
  PatInterval?: number;
  PcrControl?: M3u8PcrControl;
  PcrPeriod?: number;
  PcrPid?: string;
  PmtInterval?: number;
  PmtPid?: string;
  ProgramNum?: number;
  Scte35Behavior?: M3u8Scte35Behavior;
  Scte35Pid?: string;
  TimedMetadataBehavior?: M3u8TimedMetadataBehavior;
  TimedMetadataPid?: string;
  TransportStreamId?: number;
  VideoPid?: string;
  KlvBehavior?: M3u8KlvBehavior;
  KlvDataPids?: string;
}
export interface StandardHlsSettings {
  AudioRenditionSets?: string;
  M3u8Settings?: M3u8Settings;
}
export interface HlsSettings {
  AudioOnlyHlsSettings?: AudioOnlyHlsSettings;
  Fmp4HlsSettings?: Fmp4HlsSettings;
  FrameCaptureHlsSettings?: FrameCaptureHlsSettings;
  StandardHlsSettings?: StandardHlsSettings;
}
export interface HlsOutputSettings {
  H265PackagingType?: HlsH265PackagingType;
  HlsSettings?: HlsSettings;
  NameModifier?: string;
  SegmentModifier?: string;
}
export type HlsAutoSelect = "NO" | "OMIT" | "YES" | (string & {});
export type HlsDefault = "NO" | "OMIT" | "YES" | (string & {});
export type OutputUsage =
  | "MULTIVIEW_EQUAL_SIZE_VIEW"
  | "MULTIVIEW_PRIMARY_VIEW"
  | "MULTIVIEW_SECONDARY_VIEW"
  | (string & {});
export type __listOfOutputUsage = OutputUsage[];
const __listOfOutputUsage = __listOfDashRoleAudio as any as S.Schema<__listOfOutputUsage>;
export interface MediaPackageV2DestinationSettings {
  AudioGroupId?: string;
  AudioRenditionSets?: string;
  HlsAutoSelect?: HlsAutoSelect;
  HlsDefault?: HlsDefault;
  OutputUsage?: OutputUsage[];
}
export interface MediaPackageOutputSettings {
  MediaPackageV2DestinationSettings?: MediaPackageV2DestinationSettings;
}
export type MsSmoothH265PackagingType = "HEV1" | "HVC1" | (string & {});
export interface MsSmoothOutputSettings {
  H265PackagingType?: MsSmoothH265PackagingType;
  NameModifier?: string;
}
export interface MultiplexM2tsSettings {
  AbsentInputAudioBehavior?: M2tsAbsentInputAudioBehavior;
  Arib?: M2tsArib;
  AudioBufferModel?: M2tsAudioBufferModel;
  AudioFramesPerPes?: number;
  AudioStreamType?: M2tsAudioStreamType;
  CcDescriptor?: M2tsCcDescriptor;
  Ebif?: M2tsEbifControl;
  EsRateInPes?: M2tsEsRateInPes;
  Klv?: M2tsKlv;
  NielsenId3Behavior?: M2tsNielsenId3Behavior;
  PcrControl?: M2tsPcrControl;
  PcrPeriod?: number;
  Scte35Control?: M2tsScte35Control;
  Scte35PrerollPullupMilliseconds?: number;
}
export interface MultiplexContainerSettings {
  MultiplexM2tsSettings?: MultiplexM2tsSettings;
}
export interface MultiplexOutputSettings {
  Destination?: OutputLocationRef;
  ContainerSettings?: MultiplexContainerSettings;
}
export type RtmpOutputCertificateMode = "SELF_SIGNED" | "VERIFY_AUTHENTICITY" | (string & {});
export interface RtmpOutputSettings {
  CertificateMode?: RtmpOutputCertificateMode;
  ConnectionRetryInterval?: number;
  Destination?: OutputLocationRef;
  NumRetries?: number;
}
export interface UdpContainerSettings {
  M2tsSettings?: M2tsSettings;
}
export type __integerMin4Max20 = number;
export type FecOutputIncludeFec = "COLUMN" | "COLUMN_AND_ROW" | (string & {});
export type __integerMin1Max20 = number;
export interface FecOutputSettings {
  ColumnDepth?: number;
  IncludeFec?: FecOutputIncludeFec;
  RowLength?: number;
}
export interface UdpOutputSettings {
  BufferMsec?: number;
  ContainerSettings?: UdpContainerSettings;
  Destination?: OutputLocationRef;
  FecOutputSettings?: FecOutputSettings;
}
export interface CmafIngestOutputSettings {
  NameModifier?: string;
}
export type SrtEncryptionType = "AES128" | "AES192" | "AES256" | (string & {});
export type __integerMin40Max16000 = number;
export interface SrtOutputSettings {
  BufferMsec?: number;
  ContainerSettings?: UdpContainerSettings;
  Destination?: OutputLocationRef;
  EncryptionType?: SrtEncryptionType;
  Latency?: number;
}
export interface MediaConnectRouterOutputConnectionMap {
  Pipeline0?: string;
  Pipeline1?: string;
}
export interface MediaConnectRouterContainerSettings {
  M2tsSettings?: M2tsSettings;
}
export interface MediaConnectRouterOutputSettings {
  ConnectedRouterInputs?: MediaConnectRouterOutputConnectionMap;
  ContainerSettings?: MediaConnectRouterContainerSettings;
  Destination?: OutputLocationRef;
}
export interface OutputSettings {
  ArchiveOutputSettings?: ArchiveOutputSettings;
  FrameCaptureOutputSettings?: FrameCaptureOutputSettings;
  HlsOutputSettings?: HlsOutputSettings;
  MediaPackageOutputSettings?: MediaPackageOutputSettings;
  MsSmoothOutputSettings?: MsSmoothOutputSettings;
  MultiplexOutputSettings?: MultiplexOutputSettings;
  RtmpOutputSettings?: RtmpOutputSettings;
  UdpOutputSettings?: UdpOutputSettings;
  CmafIngestOutputSettings?: CmafIngestOutputSettings;
  SrtOutputSettings?: SrtOutputSettings;
  MediaConnectRouterOutputSettings?: MediaConnectRouterOutputSettings;
}
export interface Output {
  AudioDescriptionNames?: string[];
  CaptionDescriptionNames?: string[];
  OutputName?: string;
  OutputSettings?: OutputSettings;
  VideoDescriptionName?: string;
}
export type __listOfOutput = Output[];
const __listOfOutput = /*@__PURE__*/ __L.at(__c53, 4);
export interface OutputGroup {
  Name?: string;
  OutputGroupSettings?: OutputGroupSettings;
  Outputs?: Output[];
}
export type __listOfOutputGroup = OutputGroup[];
const __listOfOutputGroup = /*@__PURE__*/ __L.at(__c53, 6);
export type TimecodeConfigSource = "EMBEDDED" | "SYSTEMCLOCK" | "ZEROBASED" | (string & {});
export type __integerMin1Max1000000 = number;
export interface TimecodeConfig {
  Source?: TimecodeConfigSource;
  SyncThreshold?: number;
}
export type __integerMin1Max3600000 = number;
export type FrameCaptureIntervalUnit = "MILLISECONDS" | "SECONDS" | (string & {});
export type TimecodeBurninFontSize =
  | "EXTRA_SMALL_10"
  | "LARGE_48"
  | "MEDIUM_32"
  | "SMALL_16"
  | (string & {});
export type TimecodeBurninPosition =
  | "BOTTOM_CENTER"
  | "BOTTOM_LEFT"
  | "BOTTOM_RIGHT"
  | "MIDDLE_CENTER"
  | "MIDDLE_LEFT"
  | "MIDDLE_RIGHT"
  | "TOP_CENTER"
  | "TOP_LEFT"
  | "TOP_RIGHT"
  | (string & {});
export interface TimecodeBurninSettings {
  FontSize?: TimecodeBurninFontSize;
  Position?: TimecodeBurninPosition;
  Prefix?: string;
}
export interface FrameCaptureSettings {
  CaptureInterval?: number;
  CaptureIntervalUnits?: FrameCaptureIntervalUnit;
  TimecodeBurninSettings?: TimecodeBurninSettings;
}
export type H264AdaptiveQuantization =
  | "AUTO"
  | "HIGH"
  | "HIGHER"
  | "LOW"
  | "MAX"
  | "MEDIUM"
  | "OFF"
  | (string & {});
export type AfdSignaling = "AUTO" | "FIXED" | "NONE" | (string & {});
export type __integerMin1000 = number;
export type H264ColorMetadata = "IGNORE" | "INSERT" | (string & {});
export interface ColorSpacePassthroughSettings {}
export interface Rec601Settings {}
export interface Rec709Settings {}
export interface H264ColorSpaceSettings {
  ColorSpacePassthroughSettings?: ColorSpacePassthroughSettings;
  Rec601Settings?: Rec601Settings;
  Rec709Settings?: Rec709Settings;
}
export type H264EntropyEncoding = "CABAC" | "CAVLC" | (string & {});
export type TemporalFilterPostFilterSharpening = "AUTO" | "DISABLED" | "ENABLED" | (string & {});
export type TemporalFilterStrength =
  | "AUTO"
  | "STRENGTH_1"
  | "STRENGTH_2"
  | "STRENGTH_3"
  | "STRENGTH_4"
  | "STRENGTH_5"
  | "STRENGTH_6"
  | "STRENGTH_7"
  | "STRENGTH_8"
  | "STRENGTH_9"
  | "STRENGTH_10"
  | "STRENGTH_11"
  | "STRENGTH_12"
  | "STRENGTH_13"
  | "STRENGTH_14"
  | "STRENGTH_15"
  | "STRENGTH_16"
  | (string & {});
export interface TemporalFilterSettings {
  PostFilterSharpening?: TemporalFilterPostFilterSharpening;
  Strength?: TemporalFilterStrength;
}
export type BandwidthReductionPostFilterSharpening =
  | "DISABLED"
  | "SHARPENING_1"
  | "SHARPENING_2"
  | "SHARPENING_3"
  | (string & {});
export type BandwidthReductionFilterStrength =
  | "AUTO"
  | "STRENGTH_1"
  | "STRENGTH_2"
  | "STRENGTH_3"
  | "STRENGTH_4"
  | (string & {});
export interface BandwidthReductionFilterSettings {
  PostFilterSharpening?: BandwidthReductionPostFilterSharpening;
  Strength?: BandwidthReductionFilterStrength;
}
export interface H264FilterSettings {
  TemporalFilterSettings?: TemporalFilterSettings;
  BandwidthReductionFilterSettings?: BandwidthReductionFilterSettings;
}
export type FixedAfd =
  | "AFD_0000"
  | "AFD_0010"
  | "AFD_0011"
  | "AFD_0100"
  | "AFD_1000"
  | "AFD_1001"
  | "AFD_1010"
  | "AFD_1011"
  | "AFD_1101"
  | "AFD_1110"
  | "AFD_1111"
  | (string & {});
export type H264FlickerAq = "DISABLED" | "ENABLED" | (string & {});
export type H264ForceFieldPictures = "DISABLED" | "ENABLED" | (string & {});
export type H264FramerateControl = "INITIALIZE_FROM_SOURCE" | "SPECIFIED" | (string & {});
export type H264GopBReference = "DISABLED" | "ENABLED" | (string & {});
export type H264GopSizeUnits = "FRAMES" | "SECONDS" | (string & {});
export type H264Level =
  | "H264_LEVEL_1"
  | "H264_LEVEL_1_1"
  | "H264_LEVEL_1_2"
  | "H264_LEVEL_1_3"
  | "H264_LEVEL_2"
  | "H264_LEVEL_2_1"
  | "H264_LEVEL_2_2"
  | "H264_LEVEL_3"
  | "H264_LEVEL_3_1"
  | "H264_LEVEL_3_2"
  | "H264_LEVEL_4"
  | "H264_LEVEL_4_1"
  | "H264_LEVEL_4_2"
  | "H264_LEVEL_5"
  | "H264_LEVEL_5_1"
  | "H264_LEVEL_5_2"
  | "H264_LEVEL_AUTO"
  | (string & {});
export type H264LookAheadRateControl = "HIGH" | "LOW" | "MEDIUM" | (string & {});
export type __integerMin0Max30 = number;
export type __integerMin1Max6 = number;
export type H264ParControl = "INITIALIZE_FROM_SOURCE" | "SPECIFIED" | (string & {});
export type H264Profile =
  | "BASELINE"
  | "HIGH"
  | "HIGH_10BIT"
  | "HIGH_422"
  | "HIGH_422_10BIT"
  | "MAIN"
  | (string & {});
export type H264QualityLevel = "ENHANCED_QUALITY" | "STANDARD_QUALITY" | (string & {});
export type __integerMin1Max10 = number;
export type H264RateControlMode = "CBR" | "MULTIPLEX" | "QVBR" | "VBR" | (string & {});
export type H264ScanType = "INTERLACED" | "PROGRESSIVE" | (string & {});
export type H264SceneChangeDetect = "DISABLED" | "ENABLED" | (string & {});
export type __integerMin1Max32 = number;
export type __integerMin0Max128 = number;
export type H264SpatialAq = "DISABLED" | "ENABLED" | (string & {});
export type H264SubGopLength = "DYNAMIC" | "FIXED" | (string & {});
export type H264Syntax = "DEFAULT" | "RP2027" | (string & {});
export type H264TemporalAq = "DISABLED" | "ENABLED" | (string & {});
export type H264TimecodeInsertionBehavior = "DISABLED" | "PIC_TIMING_SEI" | (string & {});
export type __integerMin1Max51 = number;
export interface H264Settings {
  AdaptiveQuantization?: H264AdaptiveQuantization;
  AfdSignaling?: AfdSignaling;
  Bitrate?: number;
  BufFillPct?: number;
  BufSize?: number;
  ColorMetadata?: H264ColorMetadata;
  ColorSpaceSettings?: H264ColorSpaceSettings;
  EntropyEncoding?: H264EntropyEncoding;
  FilterSettings?: H264FilterSettings;
  FixedAfd?: FixedAfd;
  FlickerAq?: H264FlickerAq;
  ForceFieldPictures?: H264ForceFieldPictures;
  FramerateControl?: H264FramerateControl;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  GopBReference?: H264GopBReference;
  GopClosedCadence?: number;
  GopNumBFrames?: number;
  GopSize?: number;
  GopSizeUnits?: H264GopSizeUnits;
  Level?: H264Level;
  LookAheadRateControl?: H264LookAheadRateControl;
  MaxBitrate?: number;
  MinIInterval?: number;
  NumRefFrames?: number;
  ParControl?: H264ParControl;
  ParDenominator?: number;
  ParNumerator?: number;
  Profile?: H264Profile;
  QualityLevel?: H264QualityLevel;
  QvbrQualityLevel?: number;
  RateControlMode?: H264RateControlMode;
  ScanType?: H264ScanType;
  SceneChangeDetect?: H264SceneChangeDetect;
  Slices?: number;
  Softness?: number;
  SpatialAq?: H264SpatialAq;
  SubgopLength?: H264SubGopLength;
  Syntax?: H264Syntax;
  TemporalAq?: H264TemporalAq;
  TimecodeInsertion?: H264TimecodeInsertionBehavior;
  TimecodeBurninSettings?: TimecodeBurninSettings;
  MinQp?: number;
  MinBitrate?: number;
}
export type H265AdaptiveQuantization =
  | "AUTO"
  | "HIGH"
  | "HIGHER"
  | "LOW"
  | "MAX"
  | "MEDIUM"
  | "OFF"
  | (string & {});
export type H265AlternativeTransferFunction = "INSERT" | "OMIT" | (string & {});
export type __integerMin100000Max40000000 = number;
export type __integerMin100000Max80000000 = number;
export type H265ColorMetadata = "IGNORE" | "INSERT" | (string & {});
export interface DolbyVision81Settings {}
export type __integerMin0Max32768 = number;
export interface Hdr10Settings {
  MaxCll?: number;
  MaxFall?: number;
}
export interface Hlg2020Settings {}
export interface H265ColorSpaceSettings {
  ColorSpacePassthroughSettings?: ColorSpacePassthroughSettings;
  DolbyVision81Settings?: DolbyVision81Settings;
  Hdr10Settings?: Hdr10Settings;
  Rec601Settings?: Rec601Settings;
  Rec709Settings?: Rec709Settings;
  Hlg2020Settings?: Hlg2020Settings;
}
export interface H265FilterSettings {
  TemporalFilterSettings?: TemporalFilterSettings;
  BandwidthReductionFilterSettings?: BandwidthReductionFilterSettings;
}
export type H265FlickerAq = "DISABLED" | "ENABLED" | (string & {});
export type __integerMin1Max3003 = number;
export type H265GopSizeUnits = "FRAMES" | "SECONDS" | (string & {});
export type H265Level =
  | "H265_LEVEL_1"
  | "H265_LEVEL_2"
  | "H265_LEVEL_2_1"
  | "H265_LEVEL_3"
  | "H265_LEVEL_3_1"
  | "H265_LEVEL_4"
  | "H265_LEVEL_4_1"
  | "H265_LEVEL_5"
  | "H265_LEVEL_5_1"
  | "H265_LEVEL_5_2"
  | "H265_LEVEL_6"
  | "H265_LEVEL_6_1"
  | "H265_LEVEL_6_2"
  | "H265_LEVEL_AUTO"
  | (string & {});
export type H265LookAheadRateControl = "HIGH" | "LOW" | "MEDIUM" | (string & {});
export type H265Profile = "MAIN" | "MAIN_10BIT" | (string & {});
export type H265RateControlMode = "CBR" | "MULTIPLEX" | "QVBR" | (string & {});
export type H265ScanType = "INTERLACED" | "PROGRESSIVE" | (string & {});
export type H265SceneChangeDetect = "DISABLED" | "ENABLED" | (string & {});
export type H265Tier = "HIGH" | "MAIN" | (string & {});
export type H265TimecodeInsertionBehavior = "DISABLED" | "PIC_TIMING_SEI" | (string & {});
export type H265MvOverPictureBoundaries = "DISABLED" | "ENABLED" | (string & {});
export type H265MvTemporalPredictor = "DISABLED" | "ENABLED" | (string & {});
export type __integerMin64Max2160 = number;
export type H265TilePadding = "NONE" | "PADDED" | (string & {});
export type __integerMin256Max3840 = number;
export type H265TreeblockSize = "AUTO" | "TREE_SIZE_32X32" | (string & {});
export type H265Deblocking = "DISABLED" | "ENABLED" | (string & {});
export type H265GopBReference = "DISABLED" | "ENABLED" | (string & {});
export type __integerMin0Max3 = number;
export type __integerMin0Max40000000 = number;
export type H265SubGopLength = "DYNAMIC" | "FIXED" | (string & {});
export interface H265Settings {
  AdaptiveQuantization?: H265AdaptiveQuantization;
  AfdSignaling?: AfdSignaling;
  AlternativeTransferFunction?: H265AlternativeTransferFunction;
  Bitrate?: number;
  BufSize?: number;
  ColorMetadata?: H265ColorMetadata;
  ColorSpaceSettings?: H265ColorSpaceSettings;
  FilterSettings?: H265FilterSettings;
  FixedAfd?: FixedAfd;
  FlickerAq?: H265FlickerAq;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  GopClosedCadence?: number;
  GopSize?: number;
  GopSizeUnits?: H265GopSizeUnits;
  Level?: H265Level;
  LookAheadRateControl?: H265LookAheadRateControl;
  MaxBitrate?: number;
  MinIInterval?: number;
  ParDenominator?: number;
  ParNumerator?: number;
  Profile?: H265Profile;
  QvbrQualityLevel?: number;
  RateControlMode?: H265RateControlMode;
  ScanType?: H265ScanType;
  SceneChangeDetect?: H265SceneChangeDetect;
  Slices?: number;
  Tier?: H265Tier;
  TimecodeInsertion?: H265TimecodeInsertionBehavior;
  TimecodeBurninSettings?: TimecodeBurninSettings;
  MvOverPictureBoundaries?: H265MvOverPictureBoundaries;
  MvTemporalPredictor?: H265MvTemporalPredictor;
  TileHeight?: number;
  TilePadding?: H265TilePadding;
  TileWidth?: number;
  TreeblockSize?: H265TreeblockSize;
  MinQp?: number;
  Deblocking?: H265Deblocking;
  GopBReference?: H265GopBReference;
  GopNumBFrames?: number;
  MinBitrate?: number;
  SubgopLength?: H265SubGopLength;
}
export type Mpeg2AdaptiveQuantization = "AUTO" | "HIGH" | "LOW" | "MEDIUM" | "OFF" | (string & {});
export type Mpeg2ColorMetadata = "IGNORE" | "INSERT" | (string & {});
export type Mpeg2ColorSpace = "AUTO" | "PASSTHROUGH" | (string & {});
export type Mpeg2DisplayRatio = "DISPLAYRATIO16X9" | "DISPLAYRATIO4X3" | (string & {});
export interface Mpeg2FilterSettings {
  TemporalFilterSettings?: TemporalFilterSettings;
}
export type Mpeg2GopSizeUnits = "FRAMES" | "SECONDS" | (string & {});
export type Mpeg2ScanType = "INTERLACED" | "PROGRESSIVE" | (string & {});
export type Mpeg2SubGopLength = "DYNAMIC" | "FIXED" | (string & {});
export type Mpeg2TimecodeInsertionBehavior = "DISABLED" | "GOP_TIMECODE" | (string & {});
export interface Mpeg2Settings {
  AdaptiveQuantization?: Mpeg2AdaptiveQuantization;
  AfdSignaling?: AfdSignaling;
  ColorMetadata?: Mpeg2ColorMetadata;
  ColorSpace?: Mpeg2ColorSpace;
  DisplayAspectRatio?: Mpeg2DisplayRatio;
  FilterSettings?: Mpeg2FilterSettings;
  FixedAfd?: FixedAfd;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  GopClosedCadence?: number;
  GopNumBFrames?: number;
  GopSize?: number;
  GopSizeUnits?: Mpeg2GopSizeUnits;
  ScanType?: Mpeg2ScanType;
  SubgopLength?: Mpeg2SubGopLength;
  TimecodeInsertion?: Mpeg2TimecodeInsertionBehavior;
  TimecodeBurninSettings?: TimecodeBurninSettings;
}
export type __integerMin50000Max24000000 = number;
export interface Av1ColorSpaceSettings {
  ColorSpacePassthroughSettings?: ColorSpacePassthroughSettings;
  Hdr10Settings?: Hdr10Settings;
  Rec601Settings?: Rec601Settings;
  Rec709Settings?: Rec709Settings;
  Hlg2020Settings?: Hlg2020Settings;
}
export type Av1GopSizeUnits = "FRAMES" | "SECONDS" | (string & {});
export type Av1Level =
  | "AV1_LEVEL_2"
  | "AV1_LEVEL_2_1"
  | "AV1_LEVEL_3"
  | "AV1_LEVEL_3_1"
  | "AV1_LEVEL_4"
  | "AV1_LEVEL_4_1"
  | "AV1_LEVEL_5"
  | "AV1_LEVEL_5_1"
  | "AV1_LEVEL_5_2"
  | "AV1_LEVEL_5_3"
  | "AV1_LEVEL_6"
  | "AV1_LEVEL_6_1"
  | "AV1_LEVEL_6_2"
  | "AV1_LEVEL_6_3"
  | "AV1_LEVEL_AUTO"
  | (string & {});
export type Av1LookAheadRateControl = "HIGH" | "LOW" | "MEDIUM" | (string & {});
export type __integerMin50000Max12000000 = number;
export type Av1SceneChangeDetect = "DISABLED" | "ENABLED" | (string & {});
export type Av1RateControlMode = "CBR" | "QVBR" | (string & {});
export type __integerMin0Max8000000 = number;
export type Av1SpatialAq = "DISABLED" | "ENABLED" | (string & {});
export type Av1TemporalAq = "DISABLED" | "ENABLED" | (string & {});
export type Av1TimecodeInsertionBehavior = "DISABLED" | "METADATA_OBU" | (string & {});
export type Av1BitDepth = "DEPTH_10" | "DEPTH_8" | (string & {});
export interface Av1Settings {
  AfdSignaling?: AfdSignaling;
  BufSize?: number;
  ColorSpaceSettings?: Av1ColorSpaceSettings;
  FixedAfd?: FixedAfd;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  GopSize?: number;
  GopSizeUnits?: Av1GopSizeUnits;
  Level?: Av1Level;
  LookAheadRateControl?: Av1LookAheadRateControl;
  MaxBitrate?: number;
  MinIInterval?: number;
  ParDenominator?: number;
  ParNumerator?: number;
  QvbrQualityLevel?: number;
  SceneChangeDetect?: Av1SceneChangeDetect;
  TimecodeBurninSettings?: TimecodeBurninSettings;
  Bitrate?: number;
  RateControlMode?: Av1RateControlMode;
  MinBitrate?: number;
  SpatialAq?: Av1SpatialAq;
  TemporalAq?: Av1TemporalAq;
  TimecodeInsertion?: Av1TimecodeInsertionBehavior;
  BitDepth?: Av1BitDepth;
}
export interface VideoCodecSettings {
  FrameCaptureSettings?: FrameCaptureSettings;
  H264Settings?: H264Settings;
  H265Settings?: H265Settings;
  Mpeg2Settings?: Mpeg2Settings;
  Av1Settings?: Av1Settings;
}
export type VideoDescriptionRespondToAfd = "NONE" | "PASSTHROUGH" | "RESPOND" | (string & {});
export type VideoDescriptionScalingBehavior =
  | "DEFAULT"
  | "STRETCH_TO_OUTPUT"
  | "SMART_CROP"
  | (string & {});
export type __integerMin2Max8192 = number;
export type __integerMin0Max8190 = number;
export interface VideoPositionRectangle {
  Height?: number;
  Width?: number;
  X?: number;
  Y?: number;
}
export interface VideoDescription {
  CodecSettings?: VideoCodecSettings;
  Height?: number;
  Name?: string;
  RespondToAfd?: VideoDescriptionRespondToAfd;
  ScalingBehavior?: VideoDescriptionScalingBehavior;
  Sharpness?: number;
  Width?: number;
  CropRectangle?: VideoPositionRectangle;
  OutputPositionRectangle?: VideoPositionRectangle;
  Border?: number;
}
export type __listOfVideoDescription = VideoDescription[];
const __listOfVideoDescription = /*@__PURE__*/ __L.at(__c53, 23);
export type ThumbnailState = "AUTO" | "DISABLED" | (string & {});
export interface ThumbnailConfiguration {
  State?: ThumbnailState;
}
export type ColorSpace = "HDR10" | "HLG_2020" | "REC_601" | "REC_709" | (string & {});
export interface ColorCorrection {
  InputColorSpace?: ColorSpace;
  OutputColorSpace?: ColorSpace;
  Uri?: string;
}
export type __listOfColorCorrection = ColorCorrection[];
const __listOfColorCorrection = /*@__PURE__*/ __L.at(__c53, 26);
export interface ColorCorrectionSettings {
  GlobalColorCorrections?: ColorCorrection[];
}
export interface EncoderSettings {
  AudioDescriptions?: AudioDescription[];
  AvailBlanking?: AvailBlanking;
  AvailConfiguration?: AvailConfiguration;
  BlackoutSlate?: BlackoutSlate;
  CaptionDescriptions?: CaptionDescription[];
  FeatureActivations?: FeatureActivations;
  GlobalConfiguration?: GlobalConfiguration;
  MotionGraphicsConfiguration?: MotionGraphicsConfiguration;
  NielsenConfiguration?: NielsenConfiguration;
  OutputGroups?: OutputGroup[];
  TimecodeConfig?: TimecodeConfig;
  VideoDescriptions?: VideoDescription[];
  ThumbnailConfiguration?: ThumbnailConfiguration;
  ColorCorrectionSettings?: ColorCorrectionSettings;
}
export interface AudioSilenceFailoverSettings {
  AudioSelectorName?: string;
  AudioSilenceThresholdMsec?: number;
}
export type __integerMin100 = number;
export interface InputLossFailoverSettings {
  InputLossThresholdMsec?: number;
}
export type __doubleMin0Max1 = number;
export interface VideoBlackFailoverSettings {
  BlackDetectThreshold?: number;
  VideoBlackThresholdMsec?: number;
}
export interface FailoverConditionSettings {
  AudioSilenceSettings?: AudioSilenceFailoverSettings;
  InputLossSettings?: InputLossFailoverSettings;
  VideoBlackSettings?: VideoBlackFailoverSettings;
}
export interface FailoverCondition {
  FailoverConditionSettings?: FailoverConditionSettings;
}
export type __listOfFailoverCondition = FailoverCondition[];
const __listOfFailoverCondition = /*@__PURE__*/ __L.at(__c56, 25);
export type InputPreference = "EQUAL_INPUT_PREFERENCE" | "PRIMARY_INPUT_PREFERRED" | (string & {});
export interface AutomaticInputFailoverSettings {
  ErrorClearTimeMsec?: number;
  FailoverConditions?: FailoverCondition[];
  InputPreference?: InputPreference;
  SecondaryInputId?: string;
}
export interface AudioHlsRenditionSelection {
  GroupId?: string;
  Name?: string;
}
export type AudioLanguageSelectionPolicy = "LOOSE" | "STRICT" | (string & {});
export interface AudioLanguageSelection {
  LanguageCode?: string;
  LanguageSelectionPolicy?: AudioLanguageSelectionPolicy;
}
export type __integerMin0Max8191 = number;
export type DolbyEProgramSelection =
  | "ALL_CHANNELS"
  | "PROGRAM_1"
  | "PROGRAM_2"
  | "PROGRAM_3"
  | "PROGRAM_4"
  | "PROGRAM_5"
  | "PROGRAM_6"
  | "PROGRAM_7"
  | "PROGRAM_8"
  | (string & {});
export interface AudioDolbyEDecode {
  ProgramSelection?: DolbyEProgramSelection;
}
export type __doubleMinNegative60Max60 = number;
export interface AudioPreMixerSettings {
  AudioNormalizationSettings?: AudioNormalizationSettings;
  Channels?: number;
  GainDb?: number;
  RemixSettings?: RemixSettings;
}
export interface AudioPid {
  DolbyEDecode?: AudioDolbyEDecode;
  Pid?: number;
  PremixSettings?: AudioPreMixerSettings;
}
export type __listOfAudioPid = AudioPid[];
const __listOfAudioPid = /*@__PURE__*/ __L.at(__c57, 0);
export interface AudioPidSelection {
  Pid?: number;
  Pids?: AudioPid[];
}
export interface AudioTrack {
  Track?: number;
  PremixSettings?: AudioPreMixerSettings;
}
export type __listOfAudioTrack = AudioTrack[];
const __listOfAudioTrack = /*@__PURE__*/ __L.at(__c57, 3);
export interface AudioTrackSelection {
  Tracks?: AudioTrack[];
  DolbyEDecode?: AudioDolbyEDecode;
}
export interface AudioSelectorSettings {
  AudioHlsRenditionSelection?: AudioHlsRenditionSelection;
  AudioLanguageSelection?: AudioLanguageSelection;
  AudioPidSelection?: AudioPidSelection;
  AudioTrackSelection?: AudioTrackSelection;
}
export interface AudioSelector {
  Name?: string;
  SelectorSettings?: AudioSelectorSettings;
}
export type __listOfAudioSelector = AudioSelector[];
const __listOfAudioSelector = /*@__PURE__*/ __L.at(__c57, 7);
export interface AncillarySourceSettings {
  SourceAncillaryChannelNumber?: number;
}
export interface AribSourceSettings {}
export type DvbSubOcrLanguage = "DEU" | "ENG" | "FRA" | "NLD" | "POR" | "SPA" | (string & {});
export interface DvbSubSourceSettings {
  OcrLanguage?: DvbSubOcrLanguage;
  Pid?: number;
}
export type EmbeddedConvert608To708 = "DISABLED" | "UPCONVERT" | (string & {});
export type EmbeddedScte20Detection = "AUTO" | "OFF" | (string & {});
export type __integerMin1Max5 = number;
export interface EmbeddedSourceSettings {
  Convert608To708?: EmbeddedConvert608To708;
  Scte20Detection?: EmbeddedScte20Detection;
  Source608ChannelNumber?: number;
  Source608TrackNumber?: number;
}
export type Scte20Convert608To708 = "DISABLED" | "UPCONVERT" | (string & {});
export interface Scte20SourceSettings {
  Convert608To708?: Scte20Convert608To708;
  Source608ChannelNumber?: number;
}
export type Scte27OcrLanguage = "DEU" | "ENG" | "FRA" | "NLD" | "POR" | "SPA" | (string & {});
export interface Scte27SourceSettings {
  OcrLanguage?: Scte27OcrLanguage;
  Pid?: number;
}
export type __doubleMin0Max100 = number;
export interface CaptionRectangle {
  Height?: number;
  LeftOffset?: number;
  TopOffset?: number;
  Width?: number;
}
export interface TeletextSourceSettings {
  OutputRectangle?: CaptionRectangle;
  PageNumber?: string;
}
export type CaptionSynchronizationMode =
  | "NO_VIDEO_DELAY"
  | "VIDEO_ALIGNED_CAPTIONS"
  | (string & {});
export interface SmartSubtitleSourceSettings {
  CaptionSynchronizationMode?: CaptionSynchronizationMode;
  InferenceFeedOutput?: string;
}
export interface CaptionSelectorSettings {
  AncillarySourceSettings?: AncillarySourceSettings;
  AribSourceSettings?: AribSourceSettings;
  DvbSubSourceSettings?: DvbSubSourceSettings;
  EmbeddedSourceSettings?: EmbeddedSourceSettings;
  Scte20SourceSettings?: Scte20SourceSettings;
  Scte27SourceSettings?: Scte27SourceSettings;
  TeletextSourceSettings?: TeletextSourceSettings;
  SmartSubtitleSourceSettings?: SmartSubtitleSourceSettings;
}
export interface CaptionSelector {
  LanguageCode?: string;
  Name?: string;
  SelectorSettings?: CaptionSelectorSettings;
}
export type __listOfCaptionSelector = CaptionSelector[];
const __listOfCaptionSelector = /*@__PURE__*/ __L.at(__c57, 17);
export type InputDeblockFilter = "DISABLED" | "ENABLED" | (string & {});
export type InputDenoiseFilter = "DISABLED" | "ENABLED" | (string & {});
export type InputFilter = "AUTO" | "DISABLED" | "FORCED" | (string & {});
export type HlsScte35SourceType = "MANIFEST" | "SEGMENTS" | (string & {});
export interface HlsInputSettings {
  Bandwidth?: number;
  BufferSegments?: number;
  Retries?: number;
  RetryInterval?: number;
  Scte35Source?: HlsScte35SourceType;
}
export type NetworkInputServerValidation =
  | "CHECK_CRYPTOGRAPHY_AND_VALIDATE_NAME"
  | "CHECK_CRYPTOGRAPHY_ONLY"
  | (string & {});
export interface MulticastInputSettings {
  SourceIpAddress?: string;
}
export interface NetworkInputSettings {
  HlsInputSettings?: HlsInputSettings;
  ServerValidation?: NetworkInputServerValidation;
  MulticastInputSettings?: MulticastInputSettings;
}
export type __integerMin32Max8191 = number;
export type Smpte2038DataPreference = "IGNORE" | "PREFER" | (string & {});
export type InputSourceEndBehavior = "CONTINUE" | "LOOP" | (string & {});
export type VideoSelectorColorSpace =
  | "FOLLOW"
  | "HDR10"
  | "HLG_2020"
  | "REC_601"
  | "REC_709"
  | (string & {});
export interface VideoSelectorColorSpaceSettings {
  Hdr10Settings?: Hdr10Settings;
}
export type VideoSelectorColorSpaceUsage = "FALLBACK" | "FORCE" | (string & {});
export interface VideoSelectorPid {
  Pid?: number;
}
export interface VideoSelectorProgramId {
  ProgramId?: number;
}
export interface VideoSelectorSettings {
  VideoSelectorPid?: VideoSelectorPid;
  VideoSelectorProgramId?: VideoSelectorProgramId;
}
export interface VideoSelector {
  ColorSpace?: VideoSelectorColorSpace;
  ColorSpaceSettings?: VideoSelectorColorSpaceSettings;
  ColorSpaceUsage?: VideoSelectorColorSpaceUsage;
  SelectorSettings?: VideoSelectorSettings;
}
export interface InputSettings {
  AudioSelectors?: AudioSelector[];
  CaptionSelectors?: CaptionSelector[];
  DeblockFilter?: InputDeblockFilter;
  DenoiseFilter?: InputDenoiseFilter;
  FilterStrength?: number;
  InputFilter?: InputFilter;
  NetworkInputSettings?: NetworkInputSettings;
  Scte35Pid?: number;
  Smpte2038DataPreference?: Smpte2038DataPreference;
  SourceEndBehavior?: InputSourceEndBehavior;
  VideoSelector?: VideoSelector;
}
export interface InputAttachment {
  AutomaticInputFailoverSettings?: AutomaticInputFailoverSettings;
  InputAttachmentName?: string;
  InputId?: string;
  InputSettings?: InputSettings;
  LogicalInterfaceNames?: string[];
}
export type __listOfInputAttachment = InputAttachment[];
const __listOfInputAttachment = /*@__PURE__*/ __L.at(__c57, 28);
export type InputCodec = "MPEG2" | "AVC" | "HEVC" | (string & {});
export type InputMaximumBitrate = "MAX_10_MBPS" | "MAX_20_MBPS" | "MAX_50_MBPS" | (string & {});
export type InputResolution = "SD" | "HD" | "UHD" | (string & {});
export interface InputSpecification {
  Codec?: InputCodec;
  MaximumBitrate?: InputMaximumBitrate;
  Resolution?: InputResolution;
}
export type LogLevel = "ERROR" | "WARNING" | "INFO" | "DEBUG" | "DISABLED" | (string & {});
export type MaintenanceDay =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY"
  | (string & {});
export type __stringPattern010920300 = string;
export interface MaintenanceCreateSettings {
  MaintenanceDay?: MaintenanceDay;
  MaintenanceStartTime?: string;
}
export type Tags = { [key: string]: string | undefined };
export interface VpcOutputSettings {
  PublicAddressAllocationIds?: string[];
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
}
export interface AnywhereSettings {
  ChannelPlacementGroupId?: string;
  ClusterId?: string;
}
export interface ChannelEngineVersionRequest {
  Version?: string;
}
export type LinkedChannelType = "FOLLOWING_CHANNEL" | "PRIMARY_CHANNEL" | (string & {});
export interface FollowerChannelSettings {
  LinkedChannelType?: LinkedChannelType;
  PrimaryChannelArn?: string;
}
export interface PrimaryChannelSettings {
  LinkedChannelType?: LinkedChannelType;
}
export interface LinkedChannelSettings {
  FollowerChannelSettings?: FollowerChannelSettings;
  PrimaryChannelSettings?: PrimaryChannelSettings;
}
export interface AudioFeedInput {
  AudioSelectorName?: string;
  FeedInput?: string;
}
export type __listOfAudioFeedInput = AudioFeedInput[];
const __listOfAudioFeedInput = /*@__PURE__*/ __L.at(__c58, 1);
export type EnrichmentMethod = "SCTE35_ELEMENTAL_INFERENCE_QUERY_PARAMS" | (string & {});
export type __listOfEnrichmentMethod = EnrichmentMethod[];
const __listOfEnrichmentMethod = __listOfDashRoleAudio as any as S.Schema<__listOfEnrichmentMethod>;
export interface InferenceSettings {
  FeedArn?: string;
  AudioFeedInputs?: AudioFeedInput[];
  EnrichmentMethods?: EnrichmentMethod[];
}
export interface CreateChannelRequest {
  CdiInputSpecification?: CdiInputSpecification;
  ChannelClass?: ChannelClass;
  Destinations?: OutputDestination[];
  EncoderSettings?: EncoderSettings;
  InputAttachments?: InputAttachment[];
  InputSpecification?: InputSpecification;
  LogLevel?: LogLevel;
  Maintenance?: MaintenanceCreateSettings;
  Name?: string;
  RequestId?: string;
  Reserved?: string;
  RoleArn?: string;
  Tags?: { [key: string]: string | undefined };
  Vpc?: VpcOutputSettings;
  AnywhereSettings?: AnywhereSettings;
  ChannelEngineVersion?: ChannelEngineVersionRequest;
  DryRun?: boolean;
  LinkedChannelSettings?: LinkedChannelSettings;
  ChannelSecurityGroups?: string[];
  InferenceSettings?: InferenceSettings;
}
export interface ChannelEgressEndpoint {
  SourceIp?: string;
}
export type __listOfChannelEgressEndpoint = ChannelEgressEndpoint[];
const __listOfChannelEgressEndpoint = /*@__PURE__*/ __L.at(__c58, 4);
export interface MaintenanceStatus {
  MaintenanceDay?: MaintenanceDay;
  MaintenanceDeadline?: string;
  MaintenanceScheduledDate?: string;
  MaintenanceStartTime?: string;
}
export type __timestampIso8601 = Date;
export interface ChannelEngineVersionResponse {
  ExpirationDate?: Date;
  Version?: string;
}
export interface MediaConnectRouterOutputConnection {
  RouterInputArn?: string;
}
export type MediaConnectRouterOutputConnections = {
  [key: string]: MediaConnectRouterOutputConnection | undefined;
};
export interface PipelineDetail {
  ActiveInputAttachmentName?: string;
  ActiveInputSwitchActionName?: string;
  ActiveMotionGraphicsActionName?: string;
  ActiveMotionGraphicsUri?: string;
  PipelineId?: string;
  ChannelEngineVersion?: ChannelEngineVersionResponse;
  MediaConnectRouterOutputConnectionMap?: {
    [key: string]: MediaConnectRouterOutputConnection | undefined;
  };
}
export type __listOfPipelineDetail = PipelineDetail[];
const __listOfPipelineDetail = /*@__PURE__*/ __L.at(__c54, 0);
export type ChannelState =
  | "CREATING"
  | "CREATE_FAILED"
  | "IDLE"
  | "STARTING"
  | "RUNNING"
  | "RECOVERING"
  | "STOPPING"
  | "DELETING"
  | "DELETED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | (string & {});
export interface VpcOutputSettingsDescription {
  AvailabilityZones?: string[];
  NetworkInterfaceIds?: string[];
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
}
export interface DescribeAnywhereSettings {
  ChannelPlacementGroupId?: string;
  ClusterId?: string;
}
export interface DescribeFollowerChannelSettings {
  LinkedChannelType?: LinkedChannelType;
  PrimaryChannelArn?: string;
}
export interface DescribePrimaryChannelSettings {
  FollowingChannelArns?: string[];
  LinkedChannelType?: LinkedChannelType;
}
export interface DescribeLinkedChannelSettings {
  FollowerChannelSettings?: DescribeFollowerChannelSettings;
  PrimaryChannelSettings?: DescribePrimaryChannelSettings;
}
export interface DescribeInferenceSettings {
  FeedArn?: string;
  AudioFeedInputs?: AudioFeedInput[];
  EnrichmentMethods?: EnrichmentMethod[];
}
export interface Channel {
  Arn?: string;
  CdiInputSpecification?: CdiInputSpecification;
  ChannelClass?: ChannelClass;
  Destinations?: OutputDestination[];
  EgressEndpoints?: ChannelEgressEndpoint[];
  EncoderSettings?: EncoderSettings;
  Id?: string;
  InputAttachments?: InputAttachment[];
  InputSpecification?: InputSpecification;
  LogLevel?: LogLevel;
  Maintenance?: MaintenanceStatus;
  Name?: string;
  PipelineDetails?: PipelineDetail[];
  PipelinesRunningCount?: number;
  RoleArn?: string;
  State?: ChannelState;
  Tags?: { [key: string]: string | undefined };
  Vpc?: VpcOutputSettingsDescription;
  AnywhereSettings?: DescribeAnywhereSettings;
  ChannelEngineVersion?: ChannelEngineVersionResponse;
  LinkedChannelSettings?: DescribeLinkedChannelSettings;
  ChannelSecurityGroups?: string[];
  InferenceSettings?: DescribeInferenceSettings;
}
export interface CreateChannelResponse {
  Channel?: Channel & {
    EncoderSettings: EncoderSettings & {
      AudioDescriptions: (AudioDescription & {
        AudioSelectorName: string;
        Name: __stringMax255;
        AudioWatermarkingSettings: AudioWatermarkSettings & {
          NielsenWatermarksSettings: NielsenWatermarksSettings & {
            NielsenCbetSettings: NielsenCBET & {
              CbetCheckDigitString: __stringMin2Max2;
              CbetStepaside: NielsenWatermarksCbetStepaside;
              Csid: __stringMin1Max7;
            };
            NielsenNaesIiNwSettings: NielsenNaesIiNw & {
              CheckDigitString: __stringMin2Max2;
              Sid: __doubleMin1Max65535;
            };
            NielsenNwOnlySettings: NielsenNwOnly & {
              CheckDigitString: __stringMin2Max2;
              Sid: __doubleMin1Max65535;
            };
          };
        };
        RemixSettings: RemixSettings & {
          ChannelMappings: (AudioChannelMapping & {
            InputChannelLevels: (InputChannelLevel & {
              Gain: __integerMinNegative60Max6;
              InputChannel: __integerMin0Max15;
            })[];
            OutputChannel: __integerMin0Max7;
          })[];
        };
      })[];
      OutputGroups: (OutputGroup & {
        OutputGroupSettings: OutputGroupSettings & {
          ArchiveGroupSettings: ArchiveGroupSettings & { Destination: OutputLocationRef };
          FrameCaptureGroupSettings: FrameCaptureGroupSettings & { Destination: OutputLocationRef };
          HlsGroupSettings: HlsGroupSettings & {
            Destination: OutputLocationRef;
            CaptionLanguageMappings: (CaptionLanguageMapping & {
              CaptionChannel: __integerMin1Max4;
              LanguageCode: __stringMin3Max3;
              LanguageDescription: __stringMin1;
            })[];
            KeyProviderSettings: KeyProviderSettings & {
              StaticKeySettings: StaticKeySettings & {
                StaticKeyValue: __stringMin32Max32;
                KeyProviderServer: InputLocation & { Uri: __stringMax2048 };
              };
            };
          };
          MediaPackageGroupSettings: MediaPackageGroupSettings & {
            Destination: OutputLocationRef;
            MediapackageV2GroupSettings: MediaPackageV2GroupSettings & {
              CaptionLanguageMappings: (CaptionLanguageMapping & {
                CaptionChannel: __integerMin1Max4;
                LanguageCode: __stringMin3Max3;
                LanguageDescription: __stringMin1;
              })[];
              AdditionalDestinations: (MediaPackageAdditionalDestinations & {
                Destination: OutputLocationRef;
              })[];
              WatermarkingSettings: MediaPackageV2WatermarkingSettings & {
                MediaPackageV2AbWatermarkerIrdetoSettings: MediaPackageV2AbWatermarkerIrdetoSettings & {
                  AlternateDestination: OutputLocationRef;
                  OperatorId: __integerMin1Max511;
                  Profile: AbWatermarkingProfile;
                  CustomProfile: AbWatermarkingCustomProfile & {
                    EmbeddingFrequency: __doubleMin250Max5000;
                    SceneCut: __doubleMinNegative1Max5;
                    TargetPsnr: __doubleMin32Max46;
                  };
                };
              };
            };
          };
          MsSmoothGroupSettings: MsSmoothGroupSettings & { Destination: OutputLocationRef };
          CmafIngestGroupSettings: CmafIngestGroupSettings & {
            Destination: OutputLocationRef;
            CaptionLanguageMappings: (CmafIngestCaptionLanguageMapping & {
              CaptionChannel: __integerMin1Max4;
              LanguageCode: __stringMin3Max3;
            })[];
            AdditionalDestinations: (AdditionalDestinations & { Destination: OutputLocationRef })[];
            WatermarkingSettings: CmafIngestWatermarkingSettings & {
              CmafIngestAbWatermarkerIrdetoSettings: CmafIngestAbWatermarkerIrdetoSettings & {
                AlternateDestination: OutputLocationRef;
                OperatorId: __integerMin1Max511;
                Profile: AbWatermarkingProfile;
                CustomProfile: AbWatermarkingCustomProfile & {
                  EmbeddingFrequency: __doubleMin250Max5000;
                  SceneCut: __doubleMinNegative1Max5;
                  TargetPsnr: __doubleMin32Max46;
                };
              };
            };
          };
        };
        Outputs: (Output & {
          OutputSettings: OutputSettings & {
            ArchiveOutputSettings: ArchiveOutputSettings & {
              ContainerSettings: ArchiveContainerSettings & {
                M2tsSettings: M2tsSettings & {
                  DvbNitSettings: DvbNitSettings & {
                    NetworkId: __integerMin0Max65536;
                    NetworkName: __stringMin1Max256;
                  };
                };
              };
            };
            HlsOutputSettings: HlsOutputSettings & {
              HlsSettings: HlsSettings & {
                AudioOnlyHlsSettings: AudioOnlyHlsSettings & {
                  AudioOnlyImage: InputLocation & { Uri: __stringMax2048 };
                };
                StandardHlsSettings: StandardHlsSettings & { M3u8Settings: M3u8Settings };
              };
            };
            MultiplexOutputSettings: MultiplexOutputSettings & { Destination: OutputLocationRef };
            RtmpOutputSettings: RtmpOutputSettings & { Destination: OutputLocationRef };
            UdpOutputSettings: UdpOutputSettings & {
              ContainerSettings: UdpContainerSettings & {
                M2tsSettings: M2tsSettings & {
                  DvbNitSettings: DvbNitSettings & {
                    NetworkId: __integerMin0Max65536;
                    NetworkName: __stringMin1Max256;
                  };
                };
              };
              Destination: OutputLocationRef;
            };
            SrtOutputSettings: SrtOutputSettings & {
              ContainerSettings: UdpContainerSettings & {
                M2tsSettings: M2tsSettings & {
                  DvbNitSettings: DvbNitSettings & {
                    NetworkId: __integerMin0Max65536;
                    NetworkName: __stringMin1Max256;
                  };
                };
              };
              Destination: OutputLocationRef;
            };
            MediaConnectRouterOutputSettings: MediaConnectRouterOutputSettings & {
              ContainerSettings: MediaConnectRouterContainerSettings & {
                M2tsSettings: M2tsSettings & {
                  DvbNitSettings: DvbNitSettings & {
                    NetworkId: __integerMin0Max65536;
                    NetworkName: __stringMin1Max256;
                  };
                };
              };
              Destination: OutputLocationRef;
            };
          };
        })[];
      })[];
      TimecodeConfig: TimecodeConfig & { Source: TimecodeConfigSource };
      VideoDescriptions: (VideoDescription & {
        Name: string;
        CodecSettings: VideoCodecSettings & {
          FrameCaptureSettings: FrameCaptureSettings & {
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
          H264Settings: H264Settings & {
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
          H265Settings: H265Settings & {
            FramerateDenominator: __integerMin1Max3003;
            FramerateNumerator: __integerMin1;
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
          Mpeg2Settings: Mpeg2Settings & {
            FramerateDenominator: __integerMin1;
            FramerateNumerator: __integerMin1;
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
          Av1Settings: Av1Settings & {
            FramerateDenominator: __integerMin1Max3003;
            FramerateNumerator: __integerMin1;
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
        };
        CropRectangle: VideoPositionRectangle & {
          Height: __integerMin2Max8192;
          Width: __integerMin2Max8192;
          X: __integerMin0Max8190;
          Y: __integerMin0Max8190;
        };
        OutputPositionRectangle: VideoPositionRectangle & {
          Height: __integerMin2Max8192;
          Width: __integerMin2Max8192;
          X: __integerMin0Max8190;
          Y: __integerMin0Max8190;
        };
      })[];
      AvailBlanking: AvailBlanking & {
        AvailBlankingImage: InputLocation & { Uri: __stringMax2048 };
      };
      AvailConfiguration: AvailConfiguration & {
        AvailSettings: AvailSettings & {
          Esam: Esam & { AcquisitionPointId: __stringMax256; PoisEndpoint: __stringMax2048 };
        };
      };
      BlackoutSlate: BlackoutSlate & {
        BlackoutSlateImage: InputLocation & { Uri: __stringMax2048 };
        NetworkEndBlackoutImage: InputLocation & { Uri: __stringMax2048 };
      };
      CaptionDescriptions: (CaptionDescription & {
        CaptionSelectorName: string;
        Name: string;
        DestinationSettings: CaptionDestinationSettings & {
          BurnInDestinationSettings: BurnInDestinationSettings & {
            Font: InputLocation & { Uri: __stringMax2048 };
          };
          DvbSubDestinationSettings: DvbSubDestinationSettings & {
            Font: InputLocation & { Uri: __stringMax2048 };
          };
        };
      })[];
      GlobalConfiguration: GlobalConfiguration & {
        InputLossBehavior: InputLossBehavior & {
          InputLossImageSlate: InputLocation & { Uri: __stringMax2048 };
        };
      };
      MotionGraphicsConfiguration: MotionGraphicsConfiguration & {
        MotionGraphicsSettings: MotionGraphicsSettings;
      };
      ThumbnailConfiguration: ThumbnailConfiguration & { State: ThumbnailState };
      ColorCorrectionSettings: ColorCorrectionSettings & {
        GlobalColorCorrections: (ColorCorrection & {
          InputColorSpace: ColorSpace;
          OutputColorSpace: ColorSpace;
          Uri: string;
        })[];
      };
    };
    InputAttachments: (InputAttachment & {
      AutomaticInputFailoverSettings: AutomaticInputFailoverSettings & {
        SecondaryInputId: string;
        FailoverConditions: (FailoverCondition & {
          FailoverConditionSettings: FailoverConditionSettings & {
            AudioSilenceSettings: AudioSilenceFailoverSettings & { AudioSelectorName: string };
          };
        })[];
      };
      InputSettings: InputSettings & {
        AudioSelectors: (AudioSelector & {
          Name: __stringMin1;
          SelectorSettings: AudioSelectorSettings & {
            AudioHlsRenditionSelection: AudioHlsRenditionSelection & {
              GroupId: __stringMin1;
              Name: __stringMin1;
            };
            AudioLanguageSelection: AudioLanguageSelection & { LanguageCode: string };
            AudioPidSelection: AudioPidSelection & {
              Pid: __integerMin0Max8191;
              Pids: (AudioPid & {
                Pid: __integerMin0Max8191;
                DolbyEDecode: AudioDolbyEDecode & { ProgramSelection: DolbyEProgramSelection };
                PremixSettings: AudioPreMixerSettings & {
                  RemixSettings: RemixSettings & {
                    ChannelMappings: (AudioChannelMapping & {
                      InputChannelLevels: (InputChannelLevel & {
                        Gain: __integerMinNegative60Max6;
                        InputChannel: __integerMin0Max15;
                      })[];
                      OutputChannel: __integerMin0Max7;
                    })[];
                  };
                };
              })[];
            };
            AudioTrackSelection: AudioTrackSelection & {
              Tracks: (AudioTrack & {
                Track: __integerMin1;
                PremixSettings: AudioPreMixerSettings & {
                  RemixSettings: RemixSettings & {
                    ChannelMappings: (AudioChannelMapping & {
                      InputChannelLevels: (InputChannelLevel & {
                        Gain: __integerMinNegative60Max6;
                        InputChannel: __integerMin0Max15;
                      })[];
                      OutputChannel: __integerMin0Max7;
                    })[];
                  };
                };
              })[];
              DolbyEDecode: AudioDolbyEDecode & { ProgramSelection: DolbyEProgramSelection };
            };
          };
        })[];
        CaptionSelectors: (CaptionSelector & {
          Name: __stringMin1;
          SelectorSettings: CaptionSelectorSettings & {
            TeletextSourceSettings: TeletextSourceSettings & {
              OutputRectangle: CaptionRectangle & {
                Height: __doubleMin0Max100;
                LeftOffset: __doubleMin0Max100;
                TopOffset: __doubleMin0Max100;
                Width: __doubleMin0Max100;
              };
            };
          };
        })[];
      };
    })[];
  };
}
export interface CreateChannelPlacementGroupRequest {
  ClusterId: string;
  Name?: string;
  Nodes?: string[];
  RequestId?: string;
  Tags?: { [key: string]: string | undefined };
}
export type ChannelPlacementGroupState =
  | "UNASSIGNED"
  | "ASSIGNING"
  | "ASSIGNED"
  | "DELETING"
  | "DELETE_FAILED"
  | "DELETED"
  | "UNASSIGNING"
  | (string & {});
export interface CreateChannelPlacementGroupResponse {
  Arn?: string;
  Channels?: string[];
  ClusterId?: string;
  Id?: string;
  Name?: string;
  Nodes?: string[];
  State?: ChannelPlacementGroupState;
}
export type CloudWatchAlarmTemplateComparisonOperator =
  | "GreaterThanOrEqualToThreshold"
  | "GreaterThanThreshold"
  | "LessThanThreshold"
  | "LessThanOrEqualToThreshold"
  | (string & {});
export type __stringMin0Max1024 = string;
export type __stringPatternS = string;
export type __stringMax64 = string;
export type __stringMin1Max255PatternS = string;
export type __integerMin10Max86400 = number;
export type CloudWatchAlarmTemplateStatistic =
  | "SampleCount"
  | "Average"
  | "Sum"
  | "Minimum"
  | "Maximum"
  | (string & {});
export type TagMap = { [key: string]: string | undefined };
export type CloudWatchAlarmTemplateTargetResourceType =
  | "CLOUDFRONT_DISTRIBUTION"
  | "MEDIALIVE_MULTIPLEX"
  | "MEDIALIVE_CHANNEL"
  | "MEDIALIVE_INPUT_DEVICE"
  | "MEDIAPACKAGE_CHANNEL"
  | "MEDIAPACKAGE_ORIGIN_ENDPOINT"
  | "MEDIACONNECT_FLOW"
  | "S3_BUCKET"
  | "MEDIATAILOR_PLAYBACK_CONFIGURATION"
  | (string & {});
export type CloudWatchAlarmTemplateTreatMissingData =
  | "notBreaching"
  | "breaching"
  | "ignore"
  | "missing"
  | (string & {});
export type __stringMin1Max256PatternS = string;
export interface CreateCloudWatchAlarmTemplateRequest {
  ComparisonOperator?: CloudWatchAlarmTemplateComparisonOperator;
  DatapointsToAlarm?: number;
  Description?: string;
  EvaluationPeriods?: number;
  GroupIdentifier?: string;
  MetricName?: string;
  Name?: string;
  Period?: number;
  Statistic?: CloudWatchAlarmTemplateStatistic;
  Tags?: { [key: string]: string | undefined };
  TargetResourceType?: CloudWatchAlarmTemplateTargetResourceType;
  Threshold?: number;
  TreatMissingData?: CloudWatchAlarmTemplateTreatMissingData;
  RequestId?: string;
}
export type __stringPatternArnMedialiveCloudwatchAlarmTemplate = string;
export type __stringMin7Max11PatternAws097 = string;
export interface CreateCloudWatchAlarmTemplateResponse {
  Arn?: string;
  ComparisonOperator?: CloudWatchAlarmTemplateComparisonOperator;
  CreatedAt?: Date;
  DatapointsToAlarm?: number;
  Description?: string;
  EvaluationPeriods?: number;
  GroupId?: string;
  Id?: string;
  MetricName?: string;
  ModifiedAt?: Date;
  Name?: string;
  Period?: number;
  Statistic?: CloudWatchAlarmTemplateStatistic;
  Tags?: { [key: string]: string | undefined };
  TargetResourceType?: CloudWatchAlarmTemplateTargetResourceType;
  Threshold?: number;
  TreatMissingData?: CloudWatchAlarmTemplateTreatMissingData;
}
export interface CreateCloudWatchAlarmTemplateGroupRequest {
  Description?: string;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
  RequestId?: string;
}
export type __stringPatternArnMedialiveCloudwatchAlarmTemplateGroup = string;
export interface CreateCloudWatchAlarmTemplateGroupResponse {
  Arn?: string;
  CreatedAt?: Date;
  Description?: string;
  Id?: string;
  ModifiedAt?: Date;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export type ClusterType = "ON_PREMISES" | (string & {});
export interface InterfaceMappingCreateRequest {
  LogicalInterfaceName?: string;
  NetworkId?: string;
}
export type __listOfInterfaceMappingCreateRequest = InterfaceMappingCreateRequest[];
const __listOfInterfaceMappingCreateRequest = /*@__PURE__*/ __L.at(__c68, 1);
export interface ClusterNetworkSettingsCreateRequest {
  DefaultRoute?: string;
  InterfaceMappings?: InterfaceMappingCreateRequest[];
}
export interface CreateClusterRequest {
  ClusterType?: ClusterType;
  InstanceRoleArn?: string;
  Name?: string;
  NetworkSettings?: ClusterNetworkSettingsCreateRequest;
  RequestId?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface InterfaceMapping {
  LogicalInterfaceName?: string;
  NetworkId?: string;
}
export type __listOfInterfaceMapping = InterfaceMapping[];
export interface ClusterNetworkSettings {
  DefaultRoute?: string;
  InterfaceMappings?: InterfaceMapping[];
}
export type ClusterState =
  | "CREATING"
  | "CREATE_FAILED"
  | "ACTIVE"
  | "DELETING"
  | "DELETE_FAILED"
  | "DELETED"
  | (string & {});
export interface CreateClusterResponse {
  Arn?: string;
  ChannelIds?: string[];
  ClusterType?: ClusterType;
  Id?: string;
  InstanceRoleArn?: string;
  Name?: string;
  NetworkSettings?: ClusterNetworkSettings;
  State?: ClusterState;
}
export type __stringMin1Max2048PatternArn = string;
export interface EventBridgeRuleTemplateTarget {
  Arn?: string;
}
export type __listOfEventBridgeRuleTemplateTarget = EventBridgeRuleTemplateTarget[];
const __listOfEventBridgeRuleTemplateTarget = /*@__PURE__*/ __L.at(__c70, 1);
export type EventBridgeRuleTemplateEventType =
  | "MEDIALIVE_MULTIPLEX_ALERT"
  | "MEDIALIVE_MULTIPLEX_STATE_CHANGE"
  | "MEDIALIVE_CHANNEL_ALERT"
  | "MEDIALIVE_CHANNEL_INPUT_CHANGE"
  | "MEDIALIVE_CHANNEL_STATE_CHANGE"
  | "MEDIAPACKAGE_INPUT_NOTIFICATION"
  | "MEDIAPACKAGE_KEY_PROVIDER_NOTIFICATION"
  | "MEDIAPACKAGE_HARVEST_JOB_NOTIFICATION"
  | "SIGNAL_MAP_ACTIVE_ALARM"
  | "MEDIACONNECT_ALERT"
  | "MEDIACONNECT_SOURCE_HEALTH"
  | "MEDIACONNECT_OUTPUT_HEALTH"
  | "MEDIACONNECT_FLOW_STATUS_CHANGE"
  | (string & {});
export interface CreateEventBridgeRuleTemplateRequest {
  Description?: string;
  EventTargets?: EventBridgeRuleTemplateTarget[];
  EventType?: EventBridgeRuleTemplateEventType;
  GroupIdentifier?: string;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
  RequestId?: string;
}
export type __stringPatternArnMedialiveEventbridgeRuleTemplate = string;
export interface CreateEventBridgeRuleTemplateResponse {
  Arn?: string;
  CreatedAt?: Date;
  Description?: string;
  EventTargets?: (EventBridgeRuleTemplateTarget & { Arn: __stringMin1Max2048PatternArn })[];
  EventType?: EventBridgeRuleTemplateEventType;
  GroupId?: string;
  Id?: string;
  ModifiedAt?: Date;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateEventBridgeRuleTemplateGroupRequest {
  Description?: string;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
  RequestId?: string;
}
export type __stringPatternArnMedialiveEventbridgeRuleTemplateGroup = string;
export interface CreateEventBridgeRuleTemplateGroupResponse {
  Arn?: string;
  CreatedAt?: Date;
  Description?: string;
  Id?: string;
  ModifiedAt?: Date;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface InputRequestDestinationRoute {
  Cidr?: string;
  Gateway?: string;
}
export type __listOfInputRequestDestinationRoute = InputRequestDestinationRoute[];
const __listOfInputRequestDestinationRoute = /*@__PURE__*/ __L.at(__c74, 1);
export interface InputDestinationRequest {
  StreamName?: string;
  Network?: string;
  NetworkRoutes?: InputRequestDestinationRoute[];
  StaticIpAddress?: string;
}
export type __listOfInputDestinationRequest = InputDestinationRequest[];
const __listOfInputDestinationRequest = /*@__PURE__*/ __L.at(__c73, 1);
export interface InputDeviceSettings {
  Id?: string;
}
export type __listOfInputDeviceSettings = InputDeviceSettings[];
const __listOfInputDeviceSettings = /*@__PURE__*/ __L.at(__c76, 1);
export interface MediaConnectFlowRequest {
  FlowArn?: string;
}
export type __listOfMediaConnectFlowRequest = MediaConnectFlowRequest[];
const __listOfMediaConnectFlowRequest = /*@__PURE__*/ __L.at(__c76, 3);
export interface InputSourceRequest {
  PasswordParam?: string;
  Url?: string;
  Username?: string;
}
export type __listOfInputSourceRequest = InputSourceRequest[];
const __listOfInputSourceRequest = /*@__PURE__*/ __L.at(__c76, 5);
export type InputType =
  | "UDP_PUSH"
  | "RTP_PUSH"
  | "RTMP_PUSH"
  | "RTMP_PULL"
  | "URL_PULL"
  | "MP4_FILE"
  | "MEDIACONNECT"
  | "INPUT_DEVICE"
  | "AWS_CDI"
  | "TS_FILE"
  | "SRT_CALLER"
  | "MULTICAST"
  | "SMPTE_2110_RECEIVER_GROUP"
  | "SDI"
  | "MEDIACONNECT_ROUTER"
  | "SRT_LISTENER"
  | (string & {});
export interface InputVpcRequest {
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
}
export type Algorithm = "AES128" | "AES192" | "AES256" | (string & {});
export interface SrtCallerDecryptionRequest {
  Algorithm?: Algorithm;
  PassphraseSecretArn?: string;
}
export interface SrtCallerSourceRequest {
  Decryption?: SrtCallerDecryptionRequest;
  MinimumLatency?: number;
  SrtListenerAddress?: string;
  SrtListenerPort?: string;
  StreamId?: string;
}
export type __listOfSrtCallerSourceRequest = SrtCallerSourceRequest[];
const __listOfSrtCallerSourceRequest = /*@__PURE__*/ __L.at(__c76, 8);
export interface SrtListenerDecryptionRequest {
  Algorithm?: Algorithm;
  PassphraseSecretArn?: string;
}
export interface SrtListenerSettingsRequest {
  Decryption?: SrtListenerDecryptionRequest;
  MinimumLatency?: number;
  StreamId?: string;
}
export interface SrtSettingsRequest {
  SrtCallerSources?: SrtCallerSourceRequest[];
  SrtListenerSettings?: SrtListenerSettingsRequest;
}
export type InputNetworkLocation = "AWS" | "ON_PREMISES" | (string & {});
export interface MulticastSourceCreateRequest {
  SourceIp?: string;
  Url?: string;
}
export type __listOfMulticastSourceCreateRequest = MulticastSourceCreateRequest[];
const __listOfMulticastSourceCreateRequest = /*@__PURE__*/ __L.at(__c76, 12);
export interface MulticastSettingsCreateRequest {
  Sources?: MulticastSourceCreateRequest[];
}
export interface InputSdpLocation {
  MediaIndex?: number;
  SdpUrl?: string;
}
export type __listOfInputSdpLocation = InputSdpLocation[];
const __listOfInputSdpLocation = /*@__PURE__*/ __L.at(__c76, 15);
export interface Smpte2110ReceiverGroupSdpSettings {
  AncillarySdps?: InputSdpLocation[];
  AudioSdps?: InputSdpLocation[];
  VideoSdp?: InputSdpLocation;
}
export interface Smpte2110ReceiverGroup {
  SdpSettings?: Smpte2110ReceiverGroupSdpSettings;
}
export type __listOfSmpte2110ReceiverGroup = Smpte2110ReceiverGroup[];
const __listOfSmpte2110ReceiverGroup = /*@__PURE__*/ __L.at(__c76, 18);
export interface Smpte2110ReceiverGroupSettings {
  Smpte2110ReceiverGroups?: Smpte2110ReceiverGroup[];
}
export type InputSdiSources = string[];
const InputSdiSources = __listOf__string as any as S.Schema<InputSdiSources>;
export interface RouterDestinationSettings {
  AvailabilityZoneName?: string;
}
export type __listOfRouterDestinationSettings = RouterDestinationSettings[];
const __listOfRouterDestinationSettings = /*@__PURE__*/ __L.at(__c72, 2);
export type RouterEncryptionType = "AUTOMATIC" | "SECRETS_MANAGER" | (string & {});
export interface RouterSettings {
  Destinations?: RouterDestinationSettings[];
  EncryptionType?: RouterEncryptionType;
  SecretArn?: string;
}
export interface CreateInputRequest {
  Destinations?: InputDestinationRequest[];
  InputDevices?: InputDeviceSettings[];
  InputSecurityGroups?: string[];
  MediaConnectFlows?: MediaConnectFlowRequest[];
  Name?: string;
  RequestId?: string;
  RoleArn?: string;
  Sources?: InputSourceRequest[];
  Tags?: { [key: string]: string | undefined };
  Type?: InputType;
  Vpc?: InputVpcRequest;
  SrtSettings?: SrtSettingsRequest;
  InputNetworkLocation?: InputNetworkLocation;
  MulticastSettings?: MulticastSettingsCreateRequest;
  Smpte2110ReceiverGroupSettings?: Smpte2110ReceiverGroupSettings;
  SdiSources?: string[];
  RouterSettings?: RouterSettings;
}
export interface InputDestinationVpc {
  AvailabilityZone?: string;
  NetworkInterfaceId?: string;
}
export interface InputDestinationRoute {
  Cidr?: string;
  Gateway?: string;
}
export type __listOfInputDestinationRoute = InputDestinationRoute[];
const __listOfInputDestinationRoute =
  __listOfInputRequestDestinationRoute as any as S.Schema<__listOfInputDestinationRoute>;
export interface InputDestination {
  Ip?: string;
  Port?: string;
  Url?: string;
  Vpc?: InputDestinationVpc;
  Network?: string;
  NetworkRoutes?: InputDestinationRoute[];
}
export type __listOfInputDestination = InputDestination[];
const __listOfInputDestination = /*@__PURE__*/ __L.at(__c76, 22);
export type InputClass = "STANDARD" | "SINGLE_PIPELINE" | (string & {});
export type InputSourceType = "STATIC" | "DYNAMIC" | (string & {});
export interface MediaConnectFlow {
  FlowArn?: string;
}
export type __listOfMediaConnectFlow = MediaConnectFlow[];
const __listOfMediaConnectFlow =
  __listOfMediaConnectFlowRequest as any as S.Schema<__listOfMediaConnectFlow>;
export interface InputSource {
  PasswordParam?: string;
  Url?: string;
  Username?: string;
}
export type __listOfInputSource = InputSource[];
const __listOfInputSource = __listOfInputSourceRequest as any as S.Schema<__listOfInputSource>;
export type InputState =
  | "CREATING"
  | "DETACHED"
  | "ATTACHED"
  | "DELETING"
  | "DELETED"
  | (string & {});
export interface SrtCallerDecryption {
  Algorithm?: Algorithm;
  PassphraseSecretArn?: string;
}
export interface SrtCallerSource {
  Decryption?: SrtCallerDecryption;
  MinimumLatency?: number;
  SrtListenerAddress?: string;
  SrtListenerPort?: string;
  StreamId?: string;
}
export type __listOfSrtCallerSource = SrtCallerSource[];
export interface SrtListenerDecryption {
  Algorithm?: Algorithm;
  PassphraseSecretArn?: string;
}
export interface SrtListenerSettings {
  Decryption?: SrtListenerDecryption;
  MinimumLatency?: number;
  StreamId?: string;
}
export interface SrtSettings {
  SrtCallerSources?: SrtCallerSource[];
  SrtListenerSettings?: SrtListenerSettings;
}
export interface MulticastSource {
  SourceIp?: string;
  Url?: string;
}
export type __listOfMulticastSource = MulticastSource[];
export interface MulticastSettings {
  Sources?: MulticastSource[];
}
export interface RouterDestination {
  AvailabilityZoneName?: string;
  RouterOutputArn?: string;
}
export type __listOfRouterDestination = RouterDestination[];
const __listOfRouterDestination = /*@__PURE__*/ __L.at(__c76, 24);
export interface RouterInputSettings {
  Destinations?: RouterDestination[];
  EncryptionType?: RouterEncryptionType;
  SecretArn?: string;
}
export interface Input {
  Arn?: string;
  AttachedChannels?: string[];
  Destinations?: InputDestination[];
  Id?: string;
  InputClass?: InputClass;
  InputDevices?: InputDeviceSettings[];
  InputPartnerIds?: string[];
  InputSourceType?: InputSourceType;
  MediaConnectFlows?: MediaConnectFlow[];
  Name?: string;
  RoleArn?: string;
  SecurityGroups?: string[];
  Sources?: InputSource[];
  State?: InputState;
  Tags?: { [key: string]: string | undefined };
  Type?: InputType;
  SrtSettings?: SrtSettings;
  InputNetworkLocation?: InputNetworkLocation;
  MulticastSettings?: MulticastSettings;
  Smpte2110ReceiverGroupSettings?: Smpte2110ReceiverGroupSettings;
  SdiSources?: string[];
  RouterSettings?: RouterInputSettings;
}
export interface CreateInputResponse {
  Input?: Input & {
    SrtSettings: SrtSettings & {
      SrtListenerSettings: SrtListenerSettings & {
        Decryption: SrtListenerDecryption & { Algorithm: Algorithm; PassphraseSecretArn: string };
      };
    };
    MulticastSettings: MulticastSettings & { Sources: (MulticastSource & { Url: string })[] };
  };
}
export interface InputWhitelistRuleCidr {
  Cidr?: string;
}
export type __listOfInputWhitelistRuleCidr = InputWhitelistRuleCidr[];
const __listOfInputWhitelistRuleCidr = /*@__PURE__*/ __L.at(__c79, 1);
export interface CreateInputSecurityGroupRequest {
  Tags?: { [key: string]: string | undefined };
  WhitelistRules?: InputWhitelistRuleCidr[];
}
export type InputSecurityGroupState = "IDLE" | "IN_USE" | "UPDATING" | "DELETED" | (string & {});
export interface InputWhitelistRule {
  Cidr?: string;
}
export type __listOfInputWhitelistRule = InputWhitelistRule[];
const __listOfInputWhitelistRule =
  __listOfInputWhitelistRuleCidr as any as S.Schema<__listOfInputWhitelistRule>;
export interface InputSecurityGroup {
  Arn?: string;
  Id?: string;
  Inputs?: string[];
  State?: InputSecurityGroupState;
  Tags?: { [key: string]: string | undefined };
  WhitelistRules?: InputWhitelistRule[];
  Channels?: string[];
}
export interface CreateInputSecurityGroupResponse {
  SecurityGroup?: InputSecurityGroup;
}
export type __integerMin800Max3000 = number;
export type __integerMin1000000Max100000000 = number;
export type __integerMin0Max100000000 = number;
export interface MultiplexSettings {
  MaximumVideoBufferDelayMilliseconds?: number;
  TransportStreamBitrate?: number;
  TransportStreamId?: number;
  TransportStreamReservedBitrate?: number;
}
export interface CreateMultiplexRequest {
  AvailabilityZones?: string[];
  MultiplexSettings?: MultiplexSettings;
  Name?: string;
  RequestId?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface MultiplexMediaConnectOutputDestinationSettings {
  EntitlementArn?: string;
}
export interface MultiplexOutputDestination {
  MediaConnectSettings?: MultiplexMediaConnectOutputDestinationSettings;
}
export type __listOfMultiplexOutputDestination = MultiplexOutputDestination[];
const __listOfMultiplexOutputDestination = /*@__PURE__*/ __L.at(__c83, 3);
export type MultiplexState =
  | "CREATING"
  | "CREATE_FAILED"
  | "IDLE"
  | "STARTING"
  | "RUNNING"
  | "RECOVERING"
  | "STOPPING"
  | "DELETING"
  | "DELETED"
  | (string & {});
export interface Multiplex {
  Arn?: string;
  AvailabilityZones?: string[];
  Destinations?: MultiplexOutputDestination[];
  Id?: string;
  MultiplexSettings?: MultiplexSettings;
  Name?: string;
  PipelinesRunningCount?: number;
  ProgramCount?: number;
  State?: MultiplexState;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateMultiplexResponse {
  Multiplex?: Multiplex & {
    MultiplexSettings: MultiplexSettings & {
      TransportStreamBitrate: __integerMin1000000Max100000000;
      TransportStreamId: __integerMin0Max65535;
    };
  };
}
export type PreferredChannelPipeline =
  | "CURRENTLY_ACTIVE"
  | "PIPELINE_0"
  | "PIPELINE_1"
  | (string & {});
export interface MultiplexProgramServiceDescriptor {
  ProviderName?: string;
  ServiceName?: string;
}
export type __integerMin100000Max100000000 = number;
export type __integerMinNegative5Max5 = number;
export interface MultiplexStatmuxVideoSettings {
  MaximumBitrate?: number;
  MinimumBitrate?: number;
  Priority?: number;
}
export interface MultiplexVideoSettings {
  ConstantBitrate?: number;
  StatmuxSettings?: MultiplexStatmuxVideoSettings;
}
export interface MultiplexProgramSettings {
  PreferredChannelPipeline?: PreferredChannelPipeline;
  ProgramNumber?: number;
  ServiceDescriptor?: MultiplexProgramServiceDescriptor;
  VideoSettings?: MultiplexVideoSettings;
}
export interface CreateMultiplexProgramRequest {
  MultiplexId: string;
  MultiplexProgramSettings?: MultiplexProgramSettings;
  ProgramName?: string;
  RequestId?: string;
}
export type __listOf__integer = number[];
const __listOf__integer = /*@__PURE__*/ __L.at(__c86, 0);
export interface MultiplexProgramPacketIdentifiersMap {
  AudioPids?: number[];
  DvbSubPids?: number[];
  DvbTeletextPid?: number;
  EtvPlatformPid?: number;
  EtvSignalPid?: number;
  KlvDataPids?: number[];
  PcrPid?: number;
  PmtPid?: number;
  PrivateMetadataPid?: number;
  Scte27Pids?: number[];
  Scte35Pid?: number;
  TimedMetadataPid?: number;
  VideoPid?: number;
  AribCaptionsPid?: number;
  DvbTeletextPids?: number[];
  EcmPid?: number;
  Smpte2038Pid?: number;
}
export interface MultiplexProgramPipelineDetail {
  ActiveChannelPipeline?: string;
  PipelineId?: string;
}
export type __listOfMultiplexProgramPipelineDetail = MultiplexProgramPipelineDetail[];
const __listOfMultiplexProgramPipelineDetail = /*@__PURE__*/ __L.at(__c87, 5);
export interface MultiplexProgram {
  ChannelId?: string;
  MultiplexProgramSettings?: MultiplexProgramSettings;
  PacketIdentifiersMap?: MultiplexProgramPacketIdentifiersMap;
  PipelineDetails?: MultiplexProgramPipelineDetail[];
  ProgramName?: string;
}
export interface CreateMultiplexProgramResponse {
  MultiplexProgram?: MultiplexProgram & {
    MultiplexProgramSettings: MultiplexProgramSettings & {
      ProgramNumber: __integerMin0Max65535;
      ServiceDescriptor: MultiplexProgramServiceDescriptor & {
        ProviderName: __stringMax256;
        ServiceName: __stringMax256;
      };
    };
  };
}
export interface IpPoolCreateRequest {
  Cidr?: string;
}
export type __listOfIpPoolCreateRequest = IpPoolCreateRequest[];
const __listOfIpPoolCreateRequest =
  __listOfInputWhitelistRuleCidr as any as S.Schema<__listOfIpPoolCreateRequest>;
export interface RouteCreateRequest {
  Cidr?: string;
  Gateway?: string;
}
export type __listOfRouteCreateRequest = RouteCreateRequest[];
const __listOfRouteCreateRequest =
  __listOfInputRequestDestinationRoute as any as S.Schema<__listOfRouteCreateRequest>;
export interface CreateNetworkRequest {
  IpPools?: IpPoolCreateRequest[];
  Name?: string;
  RequestId?: string;
  Routes?: RouteCreateRequest[];
  Tags?: { [key: string]: string | undefined };
}
export interface IpPool {
  Cidr?: string;
}
export type __listOfIpPool = IpPool[];
const __listOfIpPool = __listOfInputWhitelistRuleCidr as any as S.Schema<__listOfIpPool>;
export interface Route {
  Cidr?: string;
  Gateway?: string;
}
export type __listOfRoute = Route[];
const __listOfRoute = __listOfInputRequestDestinationRoute as any as S.Schema<__listOfRoute>;
export type NetworkState =
  | "CREATING"
  | "CREATE_FAILED"
  | "ACTIVE"
  | "DELETING"
  | "IDLE"
  | "IN_USE"
  | "UPDATING"
  | "DELETE_FAILED"
  | "DELETED"
  | (string & {});
export interface CreateNetworkResponse {
  Arn?: string;
  AssociatedClusterIds?: string[];
  Id?: string;
  IpPools?: IpPool[];
  Name?: string;
  Routes?: Route[];
  State?: NetworkState;
}
export type NetworkInterfaceMode = "NAT" | "BRIDGE" | (string & {});
export interface NodeInterfaceMappingCreateRequest {
  LogicalInterfaceName?: string;
  NetworkInterfaceMode?: NetworkInterfaceMode;
  PhysicalInterfaceName?: string;
}
export type __listOfNodeInterfaceMappingCreateRequest = NodeInterfaceMappingCreateRequest[];
const __listOfNodeInterfaceMappingCreateRequest = /*@__PURE__*/ __L.at(__c90, 1);
export type NodeRole = "BACKUP" | "ACTIVE" | (string & {});
export interface CreateNodeRequest {
  ClusterId: string;
  Name?: string;
  NodeInterfaceMappings?: NodeInterfaceMappingCreateRequest[];
  RequestId?: string;
  Role?: NodeRole;
  Tags?: { [key: string]: string | undefined };
}
export type NodeConnectionState = "CONNECTED" | "DISCONNECTED" | (string & {});
export interface NodeInterfaceMapping {
  LogicalInterfaceName?: string;
  NetworkInterfaceMode?: NetworkInterfaceMode;
  PhysicalInterfaceName?: string;
  PhysicalInterfaceIpAddresses?: string[];
}
export type __listOfNodeInterfaceMapping = NodeInterfaceMapping[];
const __listOfNodeInterfaceMapping = /*@__PURE__*/ __L.at(__c91, 1);
export type NodeState =
  | "CREATED"
  | "REGISTERING"
  | "READY_TO_ACTIVATE"
  | "REGISTRATION_FAILED"
  | "ACTIVATION_FAILED"
  | "ACTIVE"
  | "READY"
  | "IN_USE"
  | "DEREGISTERING"
  | "DRAINING"
  | "DEREGISTRATION_FAILED"
  | "DEREGISTERED"
  | (string & {});
export interface SdiSourceMapping {
  CardNumber?: number;
  ChannelNumber?: number;
  SdiSource?: string;
}
export type SdiSourceMappings = SdiSourceMapping[];
export interface CreateNodeResponse {
  Arn?: string;
  ChannelPlacementGroups?: string[];
  ClusterId?: string;
  ConnectionState?: NodeConnectionState;
  Id?: string;
  InstanceArn?: string;
  Name?: string;
  NodeInterfaceMappings?: NodeInterfaceMapping[];
  Role?: NodeRole;
  State?: NodeState;
  SdiSourceMappings?: SdiSourceMapping[];
}
export interface CreateNodeRegistrationScriptRequest {
  ClusterId: string;
  Id?: string;
  Name?: string;
  NodeInterfaceMappings?: NodeInterfaceMapping[];
  RequestId?: string;
  Role?: NodeRole;
}
export interface CreateNodeRegistrationScriptResponse {
  NodeRegistrationScript?: string;
}
export interface CreatePartnerInputRequest {
  InputId: string;
  RequestId?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreatePartnerInputResponse {
  Input?: Input & {
    SrtSettings: SrtSettings & {
      SrtListenerSettings: SrtListenerSettings & {
        Decryption: SrtListenerDecryption & { Algorithm: Algorithm; PassphraseSecretArn: string };
      };
    };
    MulticastSettings: MulticastSettings & { Sources: (MulticastSource & { Url: string })[] };
  };
}
export type SdiSourceMode = "QUADRANT" | "INTERLEAVE" | (string & {});
export type SdiSourceType = "SINGLE" | "QUAD" | (string & {});
export interface CreateSdiSourceRequest {
  Mode?: SdiSourceMode;
  Name?: string;
  RequestId?: string;
  Tags?: { [key: string]: string | undefined };
  Type?: SdiSourceType;
}
export type SdiSourceState = "IDLE" | "IN_USE" | "DELETED" | (string & {});
export interface SdiSource {
  Arn?: string;
  Id?: string;
  Inputs?: string[];
  Mode?: SdiSourceMode;
  Name?: string;
  State?: SdiSourceState;
  Type?: SdiSourceType;
}
export interface CreateSdiSourceResponse {
  SdiSource?: SdiSource;
}
export type __listOf__stringPatternS = string[];
const __listOf__stringPatternS = __listOf__string as any as S.Schema<__listOf__stringPatternS>;
export type __stringMin1Max2048 = string;
export interface CreateSignalMapRequest {
  CloudWatchAlarmTemplateGroupIdentifiers?: string[];
  Description?: string;
  DiscoveryEntryPointArn?: string;
  EventBridgeRuleTemplateGroupIdentifiers?: string[];
  Name?: string;
  Tags?: { [key: string]: string | undefined };
  RequestId?: string;
}
export type __stringPatternArnMedialiveSignalMap = string;
export type __listOf__stringMin7Max11PatternAws097 = string[];
const __listOf__stringMin7Max11PatternAws097 =
  __listOf__string as any as S.Schema<__listOf__stringMin7Max11PatternAws097>;
export interface MediaResourceNeighbor {
  Arn?: string;
  Name?: string;
}
export type __listOfMediaResourceNeighbor = MediaResourceNeighbor[];
const __listOfMediaResourceNeighbor = /*@__PURE__*/ __L.at(__c100, 1);
export interface MediaResource {
  Destinations?: MediaResourceNeighbor[];
  Name?: string;
  Sources?: MediaResourceNeighbor[];
}
export type FailedMediaResourceMap = { [key: string]: MediaResource | undefined };
export type SignalMapMonitorDeploymentStatus =
  | "NOT_DEPLOYED"
  | "DRY_RUN_DEPLOYMENT_COMPLETE"
  | "DRY_RUN_DEPLOYMENT_FAILED"
  | "DRY_RUN_DEPLOYMENT_IN_PROGRESS"
  | "DEPLOYMENT_COMPLETE"
  | "DEPLOYMENT_FAILED"
  | "DEPLOYMENT_IN_PROGRESS"
  | "DELETE_COMPLETE"
  | "DELETE_FAILED"
  | "DELETE_IN_PROGRESS"
  | (string & {});
export interface SuccessfulMonitorDeployment {
  DetailsUri?: string;
  Status?: SignalMapMonitorDeploymentStatus;
}
export type MediaResourceMap = { [key: string]: MediaResource | undefined };
export interface MonitorDeployment {
  DetailsUri?: string;
  ErrorMessage?: string;
  Status?: SignalMapMonitorDeploymentStatus;
}
export type SignalMapStatus =
  | "CREATE_IN_PROGRESS"
  | "CREATE_COMPLETE"
  | "CREATE_FAILED"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_COMPLETE"
  | "UPDATE_REVERTED"
  | "UPDATE_FAILED"
  | "READY"
  | "NOT_READY"
  | (string & {});
export interface CreateSignalMapResponse {
  Arn?: string;
  CloudWatchAlarmTemplateGroupIds?: string[];
  CreatedAt?: Date;
  Description?: string;
  DiscoveryEntryPointArn?: string;
  ErrorMessage?: string;
  EventBridgeRuleTemplateGroupIds?: string[];
  FailedMediaResourceMap?: {
    [key: string]:
      | (MediaResource & {
          Destinations: (MediaResourceNeighbor & { Arn: __stringMin1Max2048PatternArn })[];
          Sources: (MediaResourceNeighbor & { Arn: __stringMin1Max2048PatternArn })[];
        })
      | undefined;
  };
  Id?: string;
  LastDiscoveredAt?: Date;
  LastSuccessfulMonitorDeployment?: SuccessfulMonitorDeployment & {
    DetailsUri: __stringMin1Max2048;
    Status: SignalMapMonitorDeploymentStatus;
  };
  MediaResourceMap?: {
    [key: string]:
      | (MediaResource & {
          Destinations: (MediaResourceNeighbor & { Arn: __stringMin1Max2048PatternArn })[];
          Sources: (MediaResourceNeighbor & { Arn: __stringMin1Max2048PatternArn })[];
        })
      | undefined;
  };
  ModifiedAt?: Date;
  MonitorChangesPendingDeployment?: boolean;
  MonitorDeployment?: MonitorDeployment & { Status: SignalMapMonitorDeploymentStatus };
  Name?: string;
  Status?: SignalMapStatus;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateTagsRequest {
  ResourceArn: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateTagsResponse {}
export interface DeleteChannelRequest {
  ChannelId: string;
}
export interface DeleteChannelResponse {
  Arn?: string;
  CdiInputSpecification?: CdiInputSpecification;
  ChannelClass?: ChannelClass;
  Destinations?: OutputDestination[];
  EgressEndpoints?: ChannelEgressEndpoint[];
  EncoderSettings?: EncoderSettings & {
    AudioDescriptions: (AudioDescription & {
      AudioSelectorName: string;
      Name: __stringMax255;
      AudioWatermarkingSettings: AudioWatermarkSettings & {
        NielsenWatermarksSettings: NielsenWatermarksSettings & {
          NielsenCbetSettings: NielsenCBET & {
            CbetCheckDigitString: __stringMin2Max2;
            CbetStepaside: NielsenWatermarksCbetStepaside;
            Csid: __stringMin1Max7;
          };
          NielsenNaesIiNwSettings: NielsenNaesIiNw & {
            CheckDigitString: __stringMin2Max2;
            Sid: __doubleMin1Max65535;
          };
          NielsenNwOnlySettings: NielsenNwOnly & {
            CheckDigitString: __stringMin2Max2;
            Sid: __doubleMin1Max65535;
          };
        };
      };
      RemixSettings: RemixSettings & {
        ChannelMappings: (AudioChannelMapping & {
          InputChannelLevels: (InputChannelLevel & {
            Gain: __integerMinNegative60Max6;
            InputChannel: __integerMin0Max15;
          })[];
          OutputChannel: __integerMin0Max7;
        })[];
      };
    })[];
    OutputGroups: (OutputGroup & {
      OutputGroupSettings: OutputGroupSettings & {
        ArchiveGroupSettings: ArchiveGroupSettings & { Destination: OutputLocationRef };
        FrameCaptureGroupSettings: FrameCaptureGroupSettings & { Destination: OutputLocationRef };
        HlsGroupSettings: HlsGroupSettings & {
          Destination: OutputLocationRef;
          CaptionLanguageMappings: (CaptionLanguageMapping & {
            CaptionChannel: __integerMin1Max4;
            LanguageCode: __stringMin3Max3;
            LanguageDescription: __stringMin1;
          })[];
          KeyProviderSettings: KeyProviderSettings & {
            StaticKeySettings: StaticKeySettings & {
              StaticKeyValue: __stringMin32Max32;
              KeyProviderServer: InputLocation & { Uri: __stringMax2048 };
            };
          };
        };
        MediaPackageGroupSettings: MediaPackageGroupSettings & {
          Destination: OutputLocationRef;
          MediapackageV2GroupSettings: MediaPackageV2GroupSettings & {
            CaptionLanguageMappings: (CaptionLanguageMapping & {
              CaptionChannel: __integerMin1Max4;
              LanguageCode: __stringMin3Max3;
              LanguageDescription: __stringMin1;
            })[];
            AdditionalDestinations: (MediaPackageAdditionalDestinations & {
              Destination: OutputLocationRef;
            })[];
            WatermarkingSettings: MediaPackageV2WatermarkingSettings & {
              MediaPackageV2AbWatermarkerIrdetoSettings: MediaPackageV2AbWatermarkerIrdetoSettings & {
                AlternateDestination: OutputLocationRef;
                OperatorId: __integerMin1Max511;
                Profile: AbWatermarkingProfile;
                CustomProfile: AbWatermarkingCustomProfile & {
                  EmbeddingFrequency: __doubleMin250Max5000;
                  SceneCut: __doubleMinNegative1Max5;
                  TargetPsnr: __doubleMin32Max46;
                };
              };
            };
          };
        };
        MsSmoothGroupSettings: MsSmoothGroupSettings & { Destination: OutputLocationRef };
        CmafIngestGroupSettings: CmafIngestGroupSettings & {
          Destination: OutputLocationRef;
          CaptionLanguageMappings: (CmafIngestCaptionLanguageMapping & {
            CaptionChannel: __integerMin1Max4;
            LanguageCode: __stringMin3Max3;
          })[];
          AdditionalDestinations: (AdditionalDestinations & { Destination: OutputLocationRef })[];
          WatermarkingSettings: CmafIngestWatermarkingSettings & {
            CmafIngestAbWatermarkerIrdetoSettings: CmafIngestAbWatermarkerIrdetoSettings & {
              AlternateDestination: OutputLocationRef;
              OperatorId: __integerMin1Max511;
              Profile: AbWatermarkingProfile;
              CustomProfile: AbWatermarkingCustomProfile & {
                EmbeddingFrequency: __doubleMin250Max5000;
                SceneCut: __doubleMinNegative1Max5;
                TargetPsnr: __doubleMin32Max46;
              };
            };
          };
        };
      };
      Outputs: (Output & {
        OutputSettings: OutputSettings & {
          ArchiveOutputSettings: ArchiveOutputSettings & {
            ContainerSettings: ArchiveContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
          };
          HlsOutputSettings: HlsOutputSettings & {
            HlsSettings: HlsSettings & {
              AudioOnlyHlsSettings: AudioOnlyHlsSettings & {
                AudioOnlyImage: InputLocation & { Uri: __stringMax2048 };
              };
              StandardHlsSettings: StandardHlsSettings & { M3u8Settings: M3u8Settings };
            };
          };
          MultiplexOutputSettings: MultiplexOutputSettings & { Destination: OutputLocationRef };
          RtmpOutputSettings: RtmpOutputSettings & { Destination: OutputLocationRef };
          UdpOutputSettings: UdpOutputSettings & {
            ContainerSettings: UdpContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
          SrtOutputSettings: SrtOutputSettings & {
            ContainerSettings: UdpContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
          MediaConnectRouterOutputSettings: MediaConnectRouterOutputSettings & {
            ContainerSettings: MediaConnectRouterContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
        };
      })[];
    })[];
    TimecodeConfig: TimecodeConfig & { Source: TimecodeConfigSource };
    VideoDescriptions: (VideoDescription & {
      Name: string;
      CodecSettings: VideoCodecSettings & {
        FrameCaptureSettings: FrameCaptureSettings & {
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        H264Settings: H264Settings & {
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        H265Settings: H265Settings & {
          FramerateDenominator: __integerMin1Max3003;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        Mpeg2Settings: Mpeg2Settings & {
          FramerateDenominator: __integerMin1;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        Av1Settings: Av1Settings & {
          FramerateDenominator: __integerMin1Max3003;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
      };
      CropRectangle: VideoPositionRectangle & {
        Height: __integerMin2Max8192;
        Width: __integerMin2Max8192;
        X: __integerMin0Max8190;
        Y: __integerMin0Max8190;
      };
      OutputPositionRectangle: VideoPositionRectangle & {
        Height: __integerMin2Max8192;
        Width: __integerMin2Max8192;
        X: __integerMin0Max8190;
        Y: __integerMin0Max8190;
      };
    })[];
    AvailBlanking: AvailBlanking & { AvailBlankingImage: InputLocation & { Uri: __stringMax2048 } };
    AvailConfiguration: AvailConfiguration & {
      AvailSettings: AvailSettings & {
        Esam: Esam & { AcquisitionPointId: __stringMax256; PoisEndpoint: __stringMax2048 };
      };
    };
    BlackoutSlate: BlackoutSlate & {
      BlackoutSlateImage: InputLocation & { Uri: __stringMax2048 };
      NetworkEndBlackoutImage: InputLocation & { Uri: __stringMax2048 };
    };
    CaptionDescriptions: (CaptionDescription & {
      CaptionSelectorName: string;
      Name: string;
      DestinationSettings: CaptionDestinationSettings & {
        BurnInDestinationSettings: BurnInDestinationSettings & {
          Font: InputLocation & { Uri: __stringMax2048 };
        };
        DvbSubDestinationSettings: DvbSubDestinationSettings & {
          Font: InputLocation & { Uri: __stringMax2048 };
        };
      };
    })[];
    GlobalConfiguration: GlobalConfiguration & {
      InputLossBehavior: InputLossBehavior & {
        InputLossImageSlate: InputLocation & { Uri: __stringMax2048 };
      };
    };
    MotionGraphicsConfiguration: MotionGraphicsConfiguration & {
      MotionGraphicsSettings: MotionGraphicsSettings;
    };
    ThumbnailConfiguration: ThumbnailConfiguration & { State: ThumbnailState };
    ColorCorrectionSettings: ColorCorrectionSettings & {
      GlobalColorCorrections: (ColorCorrection & {
        InputColorSpace: ColorSpace;
        OutputColorSpace: ColorSpace;
        Uri: string;
      })[];
    };
  };
  Id?: string;
  InputAttachments?: (InputAttachment & {
    AutomaticInputFailoverSettings: AutomaticInputFailoverSettings & {
      SecondaryInputId: string;
      FailoverConditions: (FailoverCondition & {
        FailoverConditionSettings: FailoverConditionSettings & {
          AudioSilenceSettings: AudioSilenceFailoverSettings & { AudioSelectorName: string };
        };
      })[];
    };
    InputSettings: InputSettings & {
      AudioSelectors: (AudioSelector & {
        Name: __stringMin1;
        SelectorSettings: AudioSelectorSettings & {
          AudioHlsRenditionSelection: AudioHlsRenditionSelection & {
            GroupId: __stringMin1;
            Name: __stringMin1;
          };
          AudioLanguageSelection: AudioLanguageSelection & { LanguageCode: string };
          AudioPidSelection: AudioPidSelection & {
            Pid: __integerMin0Max8191;
            Pids: (AudioPid & {
              Pid: __integerMin0Max8191;
              DolbyEDecode: AudioDolbyEDecode & { ProgramSelection: DolbyEProgramSelection };
              PremixSettings: AudioPreMixerSettings & {
                RemixSettings: RemixSettings & {
                  ChannelMappings: (AudioChannelMapping & {
                    InputChannelLevels: (InputChannelLevel & {
                      Gain: __integerMinNegative60Max6;
                      InputChannel: __integerMin0Max15;
                    })[];
                    OutputChannel: __integerMin0Max7;
                  })[];
                };
              };
            })[];
          };
          AudioTrackSelection: AudioTrackSelection & {
            Tracks: (AudioTrack & {
              Track: __integerMin1;
              PremixSettings: AudioPreMixerSettings & {
                RemixSettings: RemixSettings & {
                  ChannelMappings: (AudioChannelMapping & {
                    InputChannelLevels: (InputChannelLevel & {
                      Gain: __integerMinNegative60Max6;
                      InputChannel: __integerMin0Max15;
                    })[];
                    OutputChannel: __integerMin0Max7;
                  })[];
                };
              };
            })[];
            DolbyEDecode: AudioDolbyEDecode & { ProgramSelection: DolbyEProgramSelection };
          };
        };
      })[];
      CaptionSelectors: (CaptionSelector & {
        Name: __stringMin1;
        SelectorSettings: CaptionSelectorSettings & {
          TeletextSourceSettings: TeletextSourceSettings & {
            OutputRectangle: CaptionRectangle & {
              Height: __doubleMin0Max100;
              LeftOffset: __doubleMin0Max100;
              TopOffset: __doubleMin0Max100;
              Width: __doubleMin0Max100;
            };
          };
        };
      })[];
    };
  })[];
  InputSpecification?: InputSpecification;
  LogLevel?: LogLevel;
  Maintenance?: MaintenanceStatus;
  Name?: string;
  PipelineDetails?: PipelineDetail[];
  PipelinesRunningCount?: number;
  RoleArn?: string;
  State?: ChannelState;
  Tags?: { [key: string]: string | undefined };
  Vpc?: VpcOutputSettingsDescription;
  AnywhereSettings?: DescribeAnywhereSettings;
  ChannelEngineVersion?: ChannelEngineVersionResponse;
  LinkedChannelSettings?: DescribeLinkedChannelSettings;
  ChannelSecurityGroups?: string[];
  InferenceSettings?: DescribeInferenceSettings;
}
export interface DeleteChannelPlacementGroupRequest {
  ChannelPlacementGroupId: string;
  ClusterId: string;
}
export interface DeleteChannelPlacementGroupResponse {
  Arn?: string;
  Channels?: string[];
  ClusterId?: string;
  Id?: string;
  Name?: string;
  Nodes?: string[];
  State?: ChannelPlacementGroupState;
}
export interface DeleteCloudWatchAlarmTemplateRequest {
  Identifier: string;
}
export interface DeleteCloudWatchAlarmTemplateResponse {}
export interface DeleteCloudWatchAlarmTemplateGroupRequest {
  Identifier: string;
}
export interface DeleteCloudWatchAlarmTemplateGroupResponse {}
export interface DeleteClusterRequest {
  ClusterId: string;
}
export interface DeleteClusterResponse {
  Arn?: string;
  ChannelIds?: string[];
  ClusterType?: ClusterType;
  Id?: string;
  InstanceRoleArn?: string;
  Name?: string;
  NetworkSettings?: ClusterNetworkSettings;
  State?: ClusterState;
}
export interface DeleteEventBridgeRuleTemplateRequest {
  Identifier: string;
}
export interface DeleteEventBridgeRuleTemplateResponse {}
export interface DeleteEventBridgeRuleTemplateGroupRequest {
  Identifier: string;
}
export interface DeleteEventBridgeRuleTemplateGroupResponse {}
export interface DeleteInputRequest {
  InputId: string;
}
export interface DeleteInputResponse {}
export interface DeleteInputSecurityGroupRequest {
  InputSecurityGroupId: string;
}
export interface DeleteInputSecurityGroupResponse {}
export interface DeleteMultiplexRequest {
  MultiplexId: string;
}
export interface DeleteMultiplexResponse {
  Arn?: string;
  AvailabilityZones?: string[];
  Destinations?: MultiplexOutputDestination[];
  Id?: string;
  MultiplexSettings?: MultiplexSettings & {
    TransportStreamBitrate: __integerMin1000000Max100000000;
    TransportStreamId: __integerMin0Max65535;
  };
  Name?: string;
  PipelinesRunningCount?: number;
  ProgramCount?: number;
  State?: MultiplexState;
  Tags?: { [key: string]: string | undefined };
}
export interface DeleteMultiplexProgramRequest {
  MultiplexId: string;
  ProgramName: string;
}
export interface DeleteMultiplexProgramResponse {
  ChannelId?: string;
  MultiplexProgramSettings?: MultiplexProgramSettings & {
    ProgramNumber: __integerMin0Max65535;
    ServiceDescriptor: MultiplexProgramServiceDescriptor & {
      ProviderName: __stringMax256;
      ServiceName: __stringMax256;
    };
  };
  PacketIdentifiersMap?: MultiplexProgramPacketIdentifiersMap;
  PipelineDetails?: MultiplexProgramPipelineDetail[];
  ProgramName?: string;
}
export interface DeleteNetworkRequest {
  NetworkId: string;
}
export interface DeleteNetworkResponse {
  Arn?: string;
  AssociatedClusterIds?: string[];
  Id?: string;
  IpPools?: IpPool[];
  Name?: string;
  Routes?: Route[];
  State?: NetworkState;
}
export interface DeleteNodeRequest {
  ClusterId: string;
  NodeId: string;
}
export interface DeleteNodeResponse {
  Arn?: string;
  ChannelPlacementGroups?: string[];
  ClusterId?: string;
  ConnectionState?: NodeConnectionState;
  Id?: string;
  InstanceArn?: string;
  Name?: string;
  NodeInterfaceMappings?: NodeInterfaceMapping[];
  Role?: NodeRole;
  State?: NodeState;
  SdiSourceMappings?: SdiSourceMapping[];
}
export interface DeleteReservationRequest {
  ReservationId: string;
}
export type OfferingDurationUnits = "MONTHS" | (string & {});
export type OfferingType = "NO_UPFRONT" | (string & {});
export type ReservationAutomaticRenewal = "DISABLED" | "ENABLED" | "UNAVAILABLE" | (string & {});
export interface RenewalSettings {
  AutomaticRenewal?: ReservationAutomaticRenewal;
  RenewalCount?: number;
}
export type ReservationCodec = "MPEG2" | "AVC" | "HEVC" | "AUDIO" | "LINK" | "AV1" | (string & {});
export type ReservationMaximumBitrate =
  | "MAX_10_MBPS"
  | "MAX_20_MBPS"
  | "MAX_50_MBPS"
  | (string & {});
export type ReservationMaximumFramerate = "MAX_30_FPS" | "MAX_60_FPS" | (string & {});
export type ReservationResolution = "SD" | "HD" | "FHD" | "UHD" | (string & {});
export type ReservationResourceType = "INPUT" | "OUTPUT" | "MULTIPLEX" | "CHANNEL" | (string & {});
export type ReservationSpecialFeature =
  | "ADVANCED_AUDIO"
  | "AUDIO_NORMALIZATION"
  | "MGHD"
  | "MGUHD"
  | (string & {});
export type ReservationVideoQuality = "STANDARD" | "ENHANCED" | "PREMIUM" | (string & {});
export interface ReservationResourceSpecification {
  ChannelClass?: ChannelClass;
  Codec?: ReservationCodec;
  MaximumBitrate?: ReservationMaximumBitrate;
  MaximumFramerate?: ReservationMaximumFramerate;
  Resolution?: ReservationResolution;
  ResourceType?: ReservationResourceType;
  SpecialFeature?: ReservationSpecialFeature;
  VideoQuality?: ReservationVideoQuality;
}
export type ReservationState = "ACTIVE" | "EXPIRED" | "CANCELED" | "DELETED" | (string & {});
export interface DeleteReservationResponse {
  Arn?: string;
  Count?: number;
  CurrencyCode?: string;
  Duration?: number;
  DurationUnits?: OfferingDurationUnits;
  End?: string;
  FixedPrice?: number;
  Name?: string;
  OfferingDescription?: string;
  OfferingId?: string;
  OfferingType?: OfferingType;
  Region?: string;
  RenewalSettings?: RenewalSettings;
  ReservationId?: string;
  ResourceSpecification?: ReservationResourceSpecification;
  Start?: string;
  State?: ReservationState;
  Tags?: { [key: string]: string | undefined };
  UsagePrice?: number;
}
export interface DeleteScheduleRequest {
  ChannelId: string;
}
export interface DeleteScheduleResponse {}
export interface DeleteSdiSourceRequest {
  SdiSourceId: string;
}
export interface DeleteSdiSourceResponse {
  SdiSource?: SdiSource;
}
export interface DeleteSignalMapRequest {
  Identifier: string;
}
export interface DeleteSignalMapResponse {}
export interface DeleteTagsRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export interface DeleteTagsResponse {}
export interface DescribeAccountConfigurationRequest {}
export interface AccountConfiguration {
  KmsKeyId?: string;
}
export interface DescribeAccountConfigurationResponse {
  AccountConfiguration?: AccountConfiguration;
}
export interface DescribeChannelRequest {
  ChannelId: string;
}
export interface DescribeChannelResponse {
  Arn?: string;
  CdiInputSpecification?: CdiInputSpecification;
  ChannelClass?: ChannelClass;
  Destinations?: OutputDestination[];
  EgressEndpoints?: ChannelEgressEndpoint[];
  EncoderSettings?: EncoderSettings & {
    AudioDescriptions: (AudioDescription & {
      AudioSelectorName: string;
      Name: __stringMax255;
      AudioWatermarkingSettings: AudioWatermarkSettings & {
        NielsenWatermarksSettings: NielsenWatermarksSettings & {
          NielsenCbetSettings: NielsenCBET & {
            CbetCheckDigitString: __stringMin2Max2;
            CbetStepaside: NielsenWatermarksCbetStepaside;
            Csid: __stringMin1Max7;
          };
          NielsenNaesIiNwSettings: NielsenNaesIiNw & {
            CheckDigitString: __stringMin2Max2;
            Sid: __doubleMin1Max65535;
          };
          NielsenNwOnlySettings: NielsenNwOnly & {
            CheckDigitString: __stringMin2Max2;
            Sid: __doubleMin1Max65535;
          };
        };
      };
      RemixSettings: RemixSettings & {
        ChannelMappings: (AudioChannelMapping & {
          InputChannelLevels: (InputChannelLevel & {
            Gain: __integerMinNegative60Max6;
            InputChannel: __integerMin0Max15;
          })[];
          OutputChannel: __integerMin0Max7;
        })[];
      };
    })[];
    OutputGroups: (OutputGroup & {
      OutputGroupSettings: OutputGroupSettings & {
        ArchiveGroupSettings: ArchiveGroupSettings & { Destination: OutputLocationRef };
        FrameCaptureGroupSettings: FrameCaptureGroupSettings & { Destination: OutputLocationRef };
        HlsGroupSettings: HlsGroupSettings & {
          Destination: OutputLocationRef;
          CaptionLanguageMappings: (CaptionLanguageMapping & {
            CaptionChannel: __integerMin1Max4;
            LanguageCode: __stringMin3Max3;
            LanguageDescription: __stringMin1;
          })[];
          KeyProviderSettings: KeyProviderSettings & {
            StaticKeySettings: StaticKeySettings & {
              StaticKeyValue: __stringMin32Max32;
              KeyProviderServer: InputLocation & { Uri: __stringMax2048 };
            };
          };
        };
        MediaPackageGroupSettings: MediaPackageGroupSettings & {
          Destination: OutputLocationRef;
          MediapackageV2GroupSettings: MediaPackageV2GroupSettings & {
            CaptionLanguageMappings: (CaptionLanguageMapping & {
              CaptionChannel: __integerMin1Max4;
              LanguageCode: __stringMin3Max3;
              LanguageDescription: __stringMin1;
            })[];
            AdditionalDestinations: (MediaPackageAdditionalDestinations & {
              Destination: OutputLocationRef;
            })[];
            WatermarkingSettings: MediaPackageV2WatermarkingSettings & {
              MediaPackageV2AbWatermarkerIrdetoSettings: MediaPackageV2AbWatermarkerIrdetoSettings & {
                AlternateDestination: OutputLocationRef;
                OperatorId: __integerMin1Max511;
                Profile: AbWatermarkingProfile;
                CustomProfile: AbWatermarkingCustomProfile & {
                  EmbeddingFrequency: __doubleMin250Max5000;
                  SceneCut: __doubleMinNegative1Max5;
                  TargetPsnr: __doubleMin32Max46;
                };
              };
            };
          };
        };
        MsSmoothGroupSettings: MsSmoothGroupSettings & { Destination: OutputLocationRef };
        CmafIngestGroupSettings: CmafIngestGroupSettings & {
          Destination: OutputLocationRef;
          CaptionLanguageMappings: (CmafIngestCaptionLanguageMapping & {
            CaptionChannel: __integerMin1Max4;
            LanguageCode: __stringMin3Max3;
          })[];
          AdditionalDestinations: (AdditionalDestinations & { Destination: OutputLocationRef })[];
          WatermarkingSettings: CmafIngestWatermarkingSettings & {
            CmafIngestAbWatermarkerIrdetoSettings: CmafIngestAbWatermarkerIrdetoSettings & {
              AlternateDestination: OutputLocationRef;
              OperatorId: __integerMin1Max511;
              Profile: AbWatermarkingProfile;
              CustomProfile: AbWatermarkingCustomProfile & {
                EmbeddingFrequency: __doubleMin250Max5000;
                SceneCut: __doubleMinNegative1Max5;
                TargetPsnr: __doubleMin32Max46;
              };
            };
          };
        };
      };
      Outputs: (Output & {
        OutputSettings: OutputSettings & {
          ArchiveOutputSettings: ArchiveOutputSettings & {
            ContainerSettings: ArchiveContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
          };
          HlsOutputSettings: HlsOutputSettings & {
            HlsSettings: HlsSettings & {
              AudioOnlyHlsSettings: AudioOnlyHlsSettings & {
                AudioOnlyImage: InputLocation & { Uri: __stringMax2048 };
              };
              StandardHlsSettings: StandardHlsSettings & { M3u8Settings: M3u8Settings };
            };
          };
          MultiplexOutputSettings: MultiplexOutputSettings & { Destination: OutputLocationRef };
          RtmpOutputSettings: RtmpOutputSettings & { Destination: OutputLocationRef };
          UdpOutputSettings: UdpOutputSettings & {
            ContainerSettings: UdpContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
          SrtOutputSettings: SrtOutputSettings & {
            ContainerSettings: UdpContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
          MediaConnectRouterOutputSettings: MediaConnectRouterOutputSettings & {
            ContainerSettings: MediaConnectRouterContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
        };
      })[];
    })[];
    TimecodeConfig: TimecodeConfig & { Source: TimecodeConfigSource };
    VideoDescriptions: (VideoDescription & {
      Name: string;
      CodecSettings: VideoCodecSettings & {
        FrameCaptureSettings: FrameCaptureSettings & {
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        H264Settings: H264Settings & {
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        H265Settings: H265Settings & {
          FramerateDenominator: __integerMin1Max3003;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        Mpeg2Settings: Mpeg2Settings & {
          FramerateDenominator: __integerMin1;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        Av1Settings: Av1Settings & {
          FramerateDenominator: __integerMin1Max3003;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
      };
      CropRectangle: VideoPositionRectangle & {
        Height: __integerMin2Max8192;
        Width: __integerMin2Max8192;
        X: __integerMin0Max8190;
        Y: __integerMin0Max8190;
      };
      OutputPositionRectangle: VideoPositionRectangle & {
        Height: __integerMin2Max8192;
        Width: __integerMin2Max8192;
        X: __integerMin0Max8190;
        Y: __integerMin0Max8190;
      };
    })[];
    AvailBlanking: AvailBlanking & { AvailBlankingImage: InputLocation & { Uri: __stringMax2048 } };
    AvailConfiguration: AvailConfiguration & {
      AvailSettings: AvailSettings & {
        Esam: Esam & { AcquisitionPointId: __stringMax256; PoisEndpoint: __stringMax2048 };
      };
    };
    BlackoutSlate: BlackoutSlate & {
      BlackoutSlateImage: InputLocation & { Uri: __stringMax2048 };
      NetworkEndBlackoutImage: InputLocation & { Uri: __stringMax2048 };
    };
    CaptionDescriptions: (CaptionDescription & {
      CaptionSelectorName: string;
      Name: string;
      DestinationSettings: CaptionDestinationSettings & {
        BurnInDestinationSettings: BurnInDestinationSettings & {
          Font: InputLocation & { Uri: __stringMax2048 };
        };
        DvbSubDestinationSettings: DvbSubDestinationSettings & {
          Font: InputLocation & { Uri: __stringMax2048 };
        };
      };
    })[];
    GlobalConfiguration: GlobalConfiguration & {
      InputLossBehavior: InputLossBehavior & {
        InputLossImageSlate: InputLocation & { Uri: __stringMax2048 };
      };
    };
    MotionGraphicsConfiguration: MotionGraphicsConfiguration & {
      MotionGraphicsSettings: MotionGraphicsSettings;
    };
    ThumbnailConfiguration: ThumbnailConfiguration & { State: ThumbnailState };
    ColorCorrectionSettings: ColorCorrectionSettings & {
      GlobalColorCorrections: (ColorCorrection & {
        InputColorSpace: ColorSpace;
        OutputColorSpace: ColorSpace;
        Uri: string;
      })[];
    };
  };
  Id?: string;
  InputAttachments?: (InputAttachment & {
    AutomaticInputFailoverSettings: AutomaticInputFailoverSettings & {
      SecondaryInputId: string;
      FailoverConditions: (FailoverCondition & {
        FailoverConditionSettings: FailoverConditionSettings & {
          AudioSilenceSettings: AudioSilenceFailoverSettings & { AudioSelectorName: string };
        };
      })[];
    };
    InputSettings: InputSettings & {
      AudioSelectors: (AudioSelector & {
        Name: __stringMin1;
        SelectorSettings: AudioSelectorSettings & {
          AudioHlsRenditionSelection: AudioHlsRenditionSelection & {
            GroupId: __stringMin1;
            Name: __stringMin1;
          };
          AudioLanguageSelection: AudioLanguageSelection & { LanguageCode: string };
          AudioPidSelection: AudioPidSelection & {
            Pid: __integerMin0Max8191;
            Pids: (AudioPid & {
              Pid: __integerMin0Max8191;
              DolbyEDecode: AudioDolbyEDecode & { ProgramSelection: DolbyEProgramSelection };
              PremixSettings: AudioPreMixerSettings & {
                RemixSettings: RemixSettings & {
                  ChannelMappings: (AudioChannelMapping & {
                    InputChannelLevels: (InputChannelLevel & {
                      Gain: __integerMinNegative60Max6;
                      InputChannel: __integerMin0Max15;
                    })[];
                    OutputChannel: __integerMin0Max7;
                  })[];
                };
              };
            })[];
          };
          AudioTrackSelection: AudioTrackSelection & {
            Tracks: (AudioTrack & {
              Track: __integerMin1;
              PremixSettings: AudioPreMixerSettings & {
                RemixSettings: RemixSettings & {
                  ChannelMappings: (AudioChannelMapping & {
                    InputChannelLevels: (InputChannelLevel & {
                      Gain: __integerMinNegative60Max6;
                      InputChannel: __integerMin0Max15;
                    })[];
                    OutputChannel: __integerMin0Max7;
                  })[];
                };
              };
            })[];
            DolbyEDecode: AudioDolbyEDecode & { ProgramSelection: DolbyEProgramSelection };
          };
        };
      })[];
      CaptionSelectors: (CaptionSelector & {
        Name: __stringMin1;
        SelectorSettings: CaptionSelectorSettings & {
          TeletextSourceSettings: TeletextSourceSettings & {
            OutputRectangle: CaptionRectangle & {
              Height: __doubleMin0Max100;
              LeftOffset: __doubleMin0Max100;
              TopOffset: __doubleMin0Max100;
              Width: __doubleMin0Max100;
            };
          };
        };
      })[];
    };
  })[];
  InputSpecification?: InputSpecification;
  LogLevel?: LogLevel;
  Maintenance?: MaintenanceStatus;
  Name?: string;
  PipelineDetails?: PipelineDetail[];
  PipelinesRunningCount?: number;
  RoleArn?: string;
  State?: ChannelState;
  Tags?: { [key: string]: string | undefined };
  Vpc?: VpcOutputSettingsDescription;
  AnywhereSettings?: DescribeAnywhereSettings;
  ChannelEngineVersion?: ChannelEngineVersionResponse;
  LinkedChannelSettings?: DescribeLinkedChannelSettings;
  ChannelSecurityGroups?: string[];
  InferenceSettings?: DescribeInferenceSettings;
}
export interface DescribeChannelPlacementGroupRequest {
  ChannelPlacementGroupId: string;
  ClusterId: string;
}
export interface DescribeChannelPlacementGroupResponse {
  Arn?: string;
  Channels?: string[];
  ClusterId?: string;
  Id?: string;
  Name?: string;
  Nodes?: string[];
  State?: ChannelPlacementGroupState;
}
export interface DescribeClusterRequest {
  ClusterId: string;
}
export interface DescribeClusterResponse {
  Arn?: string;
  ChannelIds?: string[];
  ClusterType?: ClusterType;
  Id?: string;
  InstanceRoleArn?: string;
  Name?: string;
  NetworkSettings?: ClusterNetworkSettings;
  State?: ClusterState;
}
export interface DescribeInputRequest {
  InputId: string;
}
export interface DescribeInputResponse {
  Arn?: string;
  AttachedChannels?: string[];
  Destinations?: InputDestination[];
  Id?: string;
  InputClass?: InputClass;
  InputDevices?: InputDeviceSettings[];
  InputPartnerIds?: string[];
  InputSourceType?: InputSourceType;
  MediaConnectFlows?: MediaConnectFlow[];
  Name?: string;
  RoleArn?: string;
  SecurityGroups?: string[];
  Sources?: InputSource[];
  State?: InputState;
  Tags?: { [key: string]: string | undefined };
  Type?: InputType;
  SrtSettings?: SrtSettings & {
    SrtListenerSettings: SrtListenerSettings & {
      Decryption: SrtListenerDecryption & { Algorithm: Algorithm; PassphraseSecretArn: string };
    };
  };
  InputNetworkLocation?: InputNetworkLocation;
  MulticastSettings?: MulticastSettings & { Sources: (MulticastSource & { Url: string })[] };
  Smpte2110ReceiverGroupSettings?: Smpte2110ReceiverGroupSettings;
  SdiSources?: string[];
  RouterSettings?: RouterInputSettings;
}
export interface DescribeInputDeviceRequest {
  InputDeviceId: string;
}
export type InputDeviceConnectionState = "DISCONNECTED" | "CONNECTED" | (string & {});
export type DeviceSettingsSyncState = "SYNCED" | "SYNCING" | (string & {});
export type DeviceUpdateStatus = "UP_TO_DATE" | "NOT_UP_TO_DATE" | "UPDATING" | (string & {});
export type InputDeviceActiveInput = "HDMI" | "SDI" | (string & {});
export type InputDeviceConfiguredInput = "AUTO" | "HDMI" | "SDI" | (string & {});
export type InputDeviceState = "IDLE" | "STREAMING" | (string & {});
export type InputDeviceScanType = "INTERLACED" | "PROGRESSIVE" | (string & {});
export interface InputDeviceHdSettings {
  ActiveInput?: InputDeviceActiveInput;
  ConfiguredInput?: InputDeviceConfiguredInput;
  DeviceState?: InputDeviceState;
  Framerate?: number;
  Height?: number;
  MaxBitrate?: number;
  ScanType?: InputDeviceScanType;
  Width?: number;
  LatencyMs?: number;
}
export type InputDeviceIpScheme = "STATIC" | "DHCP" | (string & {});
export interface InputDeviceNetworkSettings {
  DnsAddresses?: string[];
  Gateway?: string;
  IpAddress?: string;
  IpScheme?: InputDeviceIpScheme;
  SubnetMask?: string;
}
export type InputDeviceType = "HD" | "UHD" | (string & {});
export type InputDeviceCodec = "HEVC" | "AVC" | (string & {});
export interface InputDeviceMediaConnectSettings {
  FlowArn?: string;
  RoleArn?: string;
  SecretArn?: string;
  SourceName?: string;
}
export type InputDeviceUhdAudioChannelPairProfile =
  | "DISABLED"
  | "VBR-AAC_HHE-16000"
  | "VBR-AAC_HE-64000"
  | "VBR-AAC_LC-128000"
  | "CBR-AAC_HQ-192000"
  | "CBR-AAC_HQ-256000"
  | "CBR-AAC_HQ-384000"
  | "CBR-AAC_HQ-512000"
  | (string & {});
export interface InputDeviceUhdAudioChannelPairConfig {
  Id?: number;
  Profile?: InputDeviceUhdAudioChannelPairProfile;
}
export type __listOfInputDeviceUhdAudioChannelPairConfig = InputDeviceUhdAudioChannelPairConfig[];
const __listOfInputDeviceUhdAudioChannelPairConfig = /*@__PURE__*/ __L.at(__c129, 4);
export interface InputDeviceUhdSettings {
  ActiveInput?: InputDeviceActiveInput;
  ConfiguredInput?: InputDeviceConfiguredInput;
  DeviceState?: InputDeviceState;
  Framerate?: number;
  Height?: number;
  MaxBitrate?: number;
  ScanType?: InputDeviceScanType;
  Width?: number;
  LatencyMs?: number;
  Codec?: InputDeviceCodec;
  MediaconnectSettings?: InputDeviceMediaConnectSettings;
  AudioChannelPairs?: InputDeviceUhdAudioChannelPairConfig[];
  InputResolution?: string;
}
export type InputDeviceOutputType =
  | "NONE"
  | "MEDIALIVE_INPUT"
  | "MEDIACONNECT_FLOW"
  | (string & {});
export interface DescribeInputDeviceResponse {
  Arn?: string;
  ConnectionState?: InputDeviceConnectionState;
  DeviceSettingsSyncState?: DeviceSettingsSyncState;
  DeviceUpdateStatus?: DeviceUpdateStatus;
  HdDeviceSettings?: InputDeviceHdSettings;
  Id?: string;
  MacAddress?: string;
  Name?: string;
  NetworkSettings?: InputDeviceNetworkSettings;
  SerialNumber?: string;
  Type?: InputDeviceType;
  UhdDeviceSettings?: InputDeviceUhdSettings;
  Tags?: { [key: string]: string | undefined };
  AvailabilityZone?: string;
  MedialiveInputArns?: string[];
  OutputType?: InputDeviceOutputType;
}
export type AcceptHeader = "image/jpeg" | (string & {});
export interface DescribeInputDeviceThumbnailRequest {
  InputDeviceId: string;
  Accept?: AcceptHeader;
}
export type ContentType = "image/jpeg" | (string & {});
export type __timestamp = Date;
export interface DescribeInputDeviceThumbnailResponse {
  Body?: T.StreamingOutputBody;
  ContentType?: ContentType;
  ContentLength?: number;
  ETag?: string;
  LastModified?: Date;
}
export interface DescribeInputSecurityGroupRequest {
  InputSecurityGroupId: string;
}
export interface DescribeInputSecurityGroupResponse {
  Arn?: string;
  Id?: string;
  Inputs?: string[];
  State?: InputSecurityGroupState;
  Tags?: { [key: string]: string | undefined };
  WhitelistRules?: InputWhitelistRule[];
  Channels?: string[];
}
export interface DescribeMultiplexRequest {
  MultiplexId: string;
}
export interface DescribeMultiplexResponse {
  Arn?: string;
  AvailabilityZones?: string[];
  Destinations?: MultiplexOutputDestination[];
  Id?: string;
  MultiplexSettings?: MultiplexSettings & {
    TransportStreamBitrate: __integerMin1000000Max100000000;
    TransportStreamId: __integerMin0Max65535;
  };
  Name?: string;
  PipelinesRunningCount?: number;
  ProgramCount?: number;
  State?: MultiplexState;
  Tags?: { [key: string]: string | undefined };
}
export interface DescribeMultiplexProgramRequest {
  MultiplexId: string;
  ProgramName: string;
}
export interface DescribeMultiplexProgramResponse {
  ChannelId?: string;
  MultiplexProgramSettings?: MultiplexProgramSettings & {
    ProgramNumber: __integerMin0Max65535;
    ServiceDescriptor: MultiplexProgramServiceDescriptor & {
      ProviderName: __stringMax256;
      ServiceName: __stringMax256;
    };
  };
  PacketIdentifiersMap?: MultiplexProgramPacketIdentifiersMap;
  PipelineDetails?: MultiplexProgramPipelineDetail[];
  ProgramName?: string;
}
export interface DescribeNetworkRequest {
  NetworkId: string;
}
export interface DescribeNetworkResponse {
  Arn?: string;
  AssociatedClusterIds?: string[];
  Id?: string;
  IpPools?: IpPool[];
  Name?: string;
  Routes?: Route[];
  State?: NetworkState;
}
export interface DescribeNodeRequest {
  ClusterId: string;
  NodeId: string;
}
export interface DescribeNodeResponse {
  Arn?: string;
  ChannelPlacementGroups?: string[];
  ClusterId?: string;
  ConnectionState?: NodeConnectionState;
  Id?: string;
  InstanceArn?: string;
  Name?: string;
  NodeInterfaceMappings?: NodeInterfaceMapping[];
  Role?: NodeRole;
  State?: NodeState;
  SdiSourceMappings?: SdiSourceMapping[];
}
export interface DescribeOfferingRequest {
  OfferingId: string;
}
export interface DescribeOfferingResponse {
  Arn?: string;
  CurrencyCode?: string;
  Duration?: number;
  DurationUnits?: OfferingDurationUnits;
  FixedPrice?: number;
  OfferingDescription?: string;
  OfferingId?: string;
  OfferingType?: OfferingType;
  Region?: string;
  ResourceSpecification?: ReservationResourceSpecification;
  UsagePrice?: number;
}
export interface DescribeReservationRequest {
  ReservationId: string;
}
export interface DescribeReservationResponse {
  Arn?: string;
  Count?: number;
  CurrencyCode?: string;
  Duration?: number;
  DurationUnits?: OfferingDurationUnits;
  End?: string;
  FixedPrice?: number;
  Name?: string;
  OfferingDescription?: string;
  OfferingId?: string;
  OfferingType?: OfferingType;
  Region?: string;
  RenewalSettings?: RenewalSettings;
  ReservationId?: string;
  ResourceSpecification?: ReservationResourceSpecification;
  Start?: string;
  State?: ReservationState;
  Tags?: { [key: string]: string | undefined };
  UsagePrice?: number;
}
export type MaxResults = number;
export interface DescribeScheduleRequest {
  ChannelId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface DescribeScheduleResponse {
  NextToken?: string;
  ScheduleActions?: (ScheduleAction & {
    ActionName: string;
    ScheduleActionSettings: ScheduleActionSettings & {
      HlsTimedMetadataSettings: HlsTimedMetadataScheduleActionSettings & { Id3: string };
      InputPrepareSettings: InputPrepareScheduleActionSettings & {
        InputClippingSettings: InputClippingSettings & { InputTimecodeSource: InputTimecodeSource };
      };
      InputSwitchSettings: InputSwitchScheduleActionSettings & {
        InputAttachmentNameReference: string;
        InputClippingSettings: InputClippingSettings & { InputTimecodeSource: InputTimecodeSource };
      };
      PauseStateSettings: PauseStateScheduleActionSettings & {
        Pipelines: (PipelinePauseStateSettings & { PipelineId: PipelineId })[];
      };
      Scte35InputSettings: Scte35InputScheduleActionSettings & { Mode: Scte35InputMode };
      Scte35ReturnToNetworkSettings: Scte35ReturnToNetworkScheduleActionSettings & {
        SpliceEventId: __longMin0Max4294967295;
      };
      Scte35SpliceInsertSettings: Scte35SpliceInsertScheduleActionSettings & {
        SpliceEventId: __longMin0Max4294967295;
      };
      Scte35TimeSignalSettings: Scte35TimeSignalScheduleActionSettings & {
        Scte35Descriptors: (Scte35Descriptor & {
          Scte35DescriptorSettings: Scte35DescriptorSettings & {
            SegmentationDescriptorScte35DescriptorSettings: Scte35SegmentationDescriptor & {
              SegmentationCancelIndicator: Scte35SegmentationCancelIndicator;
              SegmentationEventId: __longMin0Max4294967295;
              DeliveryRestrictions: Scte35DeliveryRestrictions & {
                ArchiveAllowedFlag: Scte35ArchiveAllowedFlag;
                DeviceRestrictions: Scte35DeviceRestrictions;
                NoRegionalBlackoutFlag: Scte35NoRegionalBlackoutFlag;
                WebDeliveryAllowedFlag: Scte35WebDeliveryAllowedFlag;
              };
            };
          };
        })[];
      };
      StaticImageActivateSettings: StaticImageActivateScheduleActionSettings & {
        Image: InputLocation & { Uri: __stringMax2048 };
      };
      StaticImageOutputActivateSettings: StaticImageOutputActivateScheduleActionSettings & {
        Image: InputLocation & { Uri: __stringMax2048 };
        OutputNames: __listOf__string;
      };
      StaticImageOutputDeactivateSettings: StaticImageOutputDeactivateScheduleActionSettings & {
        OutputNames: __listOf__string;
      };
      TimedMetadataSettings: TimedMetadataScheduleActionSettings & { Id3: string };
    };
    ScheduleActionStartSettings: ScheduleActionStartSettings & {
      FixedModeScheduleActionStartSettings: FixedModeScheduleActionStartSettings & { Time: string };
      FollowModeScheduleActionStartSettings: FollowModeScheduleActionStartSettings & {
        FollowPoint: FollowPoint;
        ReferenceActionName: string;
      };
    };
  })[];
}
export interface DescribeSdiSourceRequest {
  SdiSourceId: string;
}
export interface DescribeSdiSourceResponse {
  SdiSource?: SdiSource;
}
export interface DescribeThumbnailsRequest {
  ChannelId: string;
  PipelineId?: string;
  ThumbnailType?: string;
}
export type ThumbnailType = "UNSPECIFIED" | "CURRENT_ACTIVE" | (string & {});
export interface Thumbnail {
  Body?: string;
  ContentType?: string;
  ThumbnailType?: ThumbnailType;
  TimeStamp?: Date;
}
export type __listOfThumbnail = Thumbnail[];
const __listOfThumbnail = /*@__PURE__*/ __L.at(__c142, 2);
export interface ThumbnailDetail {
  PipelineId?: string;
  Thumbnails?: Thumbnail[];
}
export type __listOfThumbnailDetail = ThumbnailDetail[];
const __listOfThumbnailDetail = /*@__PURE__*/ __L.at(__c142, 4);
export interface DescribeThumbnailsResponse {
  ThumbnailDetails?: ThumbnailDetail[];
}
export interface GetCloudWatchAlarmTemplateRequest {
  Identifier: string;
}
export interface GetCloudWatchAlarmTemplateResponse {
  Arn?: string;
  ComparisonOperator?: CloudWatchAlarmTemplateComparisonOperator;
  CreatedAt?: Date;
  DatapointsToAlarm?: number;
  Description?: string;
  EvaluationPeriods?: number;
  GroupId?: string;
  Id?: string;
  MetricName?: string;
  ModifiedAt?: Date;
  Name?: string;
  Period?: number;
  Statistic?: CloudWatchAlarmTemplateStatistic;
  Tags?: { [key: string]: string | undefined };
  TargetResourceType?: CloudWatchAlarmTemplateTargetResourceType;
  Threshold?: number;
  TreatMissingData?: CloudWatchAlarmTemplateTreatMissingData;
}
export interface GetCloudWatchAlarmTemplateGroupRequest {
  Identifier: string;
}
export interface GetCloudWatchAlarmTemplateGroupResponse {
  Arn?: string;
  CreatedAt?: Date;
  Description?: string;
  Id?: string;
  ModifiedAt?: Date;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface GetEventBridgeRuleTemplateRequest {
  Identifier: string;
}
export interface GetEventBridgeRuleTemplateResponse {
  Arn?: string;
  CreatedAt?: Date;
  Description?: string;
  EventTargets?: (EventBridgeRuleTemplateTarget & { Arn: __stringMin1Max2048PatternArn })[];
  EventType?: EventBridgeRuleTemplateEventType;
  GroupId?: string;
  Id?: string;
  ModifiedAt?: Date;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface GetEventBridgeRuleTemplateGroupRequest {
  Identifier: string;
}
export interface GetEventBridgeRuleTemplateGroupResponse {
  Arn?: string;
  CreatedAt?: Date;
  Description?: string;
  Id?: string;
  ModifiedAt?: Date;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface GetSignalMapRequest {
  Identifier: string;
}
export interface GetSignalMapResponse {
  Arn?: string;
  CloudWatchAlarmTemplateGroupIds?: string[];
  CreatedAt?: Date;
  Description?: string;
  DiscoveryEntryPointArn?: string;
  ErrorMessage?: string;
  EventBridgeRuleTemplateGroupIds?: string[];
  FailedMediaResourceMap?: {
    [key: string]:
      | (MediaResource & {
          Destinations: (MediaResourceNeighbor & { Arn: __stringMin1Max2048PatternArn })[];
          Sources: (MediaResourceNeighbor & { Arn: __stringMin1Max2048PatternArn })[];
        })
      | undefined;
  };
  Id?: string;
  LastDiscoveredAt?: Date;
  LastSuccessfulMonitorDeployment?: SuccessfulMonitorDeployment & {
    DetailsUri: __stringMin1Max2048;
    Status: SignalMapMonitorDeploymentStatus;
  };
  MediaResourceMap?: {
    [key: string]:
      | (MediaResource & {
          Destinations: (MediaResourceNeighbor & { Arn: __stringMin1Max2048PatternArn })[];
          Sources: (MediaResourceNeighbor & { Arn: __stringMin1Max2048PatternArn })[];
        })
      | undefined;
  };
  ModifiedAt?: Date;
  MonitorChangesPendingDeployment?: boolean;
  MonitorDeployment?: MonitorDeployment & { Status: SignalMapMonitorDeploymentStatus };
  Name?: string;
  Status?: SignalMapStatus;
  Tags?: { [key: string]: string | undefined };
}
export interface ListAlertsRequest {
  ChannelId: string;
  MaxResults?: number;
  NextToken?: string;
  StateFilter?: string;
}
export type ChannelAlertState = "SET" | "CLEARED" | (string & {});
export interface ChannelAlert {
  AlertType?: string;
  ClearedTimestamp?: Date;
  Id?: string;
  Message?: string;
  PipelineId?: string;
  SetTimestamp?: Date;
  State?: ChannelAlertState;
}
export type __listOfChannelAlert = ChannelAlert[];
const __listOfChannelAlert = /*@__PURE__*/ __L.at(__c149, 1);
export interface ListAlertsResponse {
  Alerts?: ChannelAlert[];
  NextToken?: string;
}
export interface ListChannelPlacementGroupsRequest {
  ClusterId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface DescribeChannelPlacementGroupSummary {
  Arn?: string;
  Channels?: string[];
  ClusterId?: string;
  Id?: string;
  Name?: string;
  Nodes?: string[];
  State?: ChannelPlacementGroupState;
}
export type __listOfDescribeChannelPlacementGroupSummary = DescribeChannelPlacementGroupSummary[];
const __listOfDescribeChannelPlacementGroupSummary = /*@__PURE__*/ __L.at(__c150, 1);
export interface ListChannelPlacementGroupsResponse {
  ChannelPlacementGroups?: DescribeChannelPlacementGroupSummary[];
  NextToken?: string;
}
export interface ListChannelsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type __listOfChannelEngineVersionResponse = ChannelEngineVersionResponse[];
const __listOfChannelEngineVersionResponse = /*@__PURE__*/ __L.at(__c152, 0);
export interface ChannelSummary {
  Arn?: string;
  CdiInputSpecification?: CdiInputSpecification;
  ChannelClass?: ChannelClass;
  Destinations?: OutputDestination[];
  EgressEndpoints?: ChannelEgressEndpoint[];
  Id?: string;
  InputAttachments?: InputAttachment[];
  InputSpecification?: InputSpecification;
  LogLevel?: LogLevel;
  Maintenance?: MaintenanceStatus;
  Name?: string;
  PipelinesRunningCount?: number;
  RoleArn?: string;
  State?: ChannelState;
  Tags?: { [key: string]: string | undefined };
  Vpc?: VpcOutputSettingsDescription;
  AnywhereSettings?: DescribeAnywhereSettings;
  ChannelEngineVersion?: ChannelEngineVersionResponse;
  UsedChannelEngineVersions?: ChannelEngineVersionResponse[];
  LinkedChannelSettings?: DescribeLinkedChannelSettings;
  ChannelSecurityGroups?: string[];
  InferenceSettings?: DescribeInferenceSettings;
}
export type __listOfChannelSummary = ChannelSummary[];
const __listOfChannelSummary = /*@__PURE__*/ __L.at(__c151, 2);
export interface ListChannelsResponse {
  Channels?: (ChannelSummary & {
    InputAttachments: (InputAttachment & {
      AutomaticInputFailoverSettings: AutomaticInputFailoverSettings & {
        SecondaryInputId: string;
        FailoverConditions: (FailoverCondition & {
          FailoverConditionSettings: FailoverConditionSettings & {
            AudioSilenceSettings: AudioSilenceFailoverSettings & { AudioSelectorName: string };
          };
        })[];
      };
      InputSettings: InputSettings & {
        AudioSelectors: (AudioSelector & {
          Name: __stringMin1;
          SelectorSettings: AudioSelectorSettings & {
            AudioHlsRenditionSelection: AudioHlsRenditionSelection & {
              GroupId: __stringMin1;
              Name: __stringMin1;
            };
            AudioLanguageSelection: AudioLanguageSelection & { LanguageCode: string };
            AudioPidSelection: AudioPidSelection & {
              Pid: __integerMin0Max8191;
              Pids: (AudioPid & {
                Pid: __integerMin0Max8191;
                DolbyEDecode: AudioDolbyEDecode & { ProgramSelection: DolbyEProgramSelection };
                PremixSettings: AudioPreMixerSettings & {
                  RemixSettings: RemixSettings & {
                    ChannelMappings: (AudioChannelMapping & {
                      InputChannelLevels: (InputChannelLevel & {
                        Gain: __integerMinNegative60Max6;
                        InputChannel: __integerMin0Max15;
                      })[];
                      OutputChannel: __integerMin0Max7;
                    })[];
                  };
                };
              })[];
            };
            AudioTrackSelection: AudioTrackSelection & {
              Tracks: (AudioTrack & {
                Track: __integerMin1;
                PremixSettings: AudioPreMixerSettings & {
                  RemixSettings: RemixSettings & {
                    ChannelMappings: (AudioChannelMapping & {
                      InputChannelLevels: (InputChannelLevel & {
                        Gain: __integerMinNegative60Max6;
                        InputChannel: __integerMin0Max15;
                      })[];
                      OutputChannel: __integerMin0Max7;
                    })[];
                  };
                };
              })[];
              DolbyEDecode: AudioDolbyEDecode & { ProgramSelection: DolbyEProgramSelection };
            };
          };
        })[];
        CaptionSelectors: (CaptionSelector & {
          Name: __stringMin1;
          SelectorSettings: CaptionSelectorSettings & {
            TeletextSourceSettings: TeletextSourceSettings & {
              OutputRectangle: CaptionRectangle & {
                Height: __doubleMin0Max100;
                LeftOffset: __doubleMin0Max100;
                TopOffset: __doubleMin0Max100;
                Width: __doubleMin0Max100;
              };
            };
          };
        })[];
      };
    })[];
  })[];
  NextToken?: string;
}
export interface ListCloudWatchAlarmTemplateGroupsRequest {
  MaxResults?: number;
  NextToken?: string;
  Scope?: string;
  SignalMapIdentifier?: string;
}
export interface CloudWatchAlarmTemplateGroupSummary {
  Arn?: string;
  CreatedAt?: Date;
  Description?: string;
  Id?: string;
  ModifiedAt?: Date;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
  TemplateCount?: number;
}
export type __listOfCloudWatchAlarmTemplateGroupSummary = CloudWatchAlarmTemplateGroupSummary[];
const __listOfCloudWatchAlarmTemplateGroupSummary = /*@__PURE__*/ __L.at(__c154, 1);
export interface ListCloudWatchAlarmTemplateGroupsResponse {
  CloudWatchAlarmTemplateGroups?: (CloudWatchAlarmTemplateGroupSummary & {
    Arn: __stringPatternArnMedialiveCloudwatchAlarmTemplateGroup;
    CreatedAt: __timestampIso8601;
    Id: __stringMin7Max11PatternAws097;
    Name: __stringMin1Max255PatternS;
    TemplateCount: number;
  })[];
  NextToken?: string;
}
export interface ListCloudWatchAlarmTemplatesRequest {
  GroupIdentifier?: string;
  MaxResults?: number;
  NextToken?: string;
  Scope?: string;
  SignalMapIdentifier?: string;
}
export interface CloudWatchAlarmTemplateSummary {
  Arn?: string;
  ComparisonOperator?: CloudWatchAlarmTemplateComparisonOperator;
  CreatedAt?: Date;
  DatapointsToAlarm?: number;
  Description?: string;
  EvaluationPeriods?: number;
  GroupId?: string;
  Id?: string;
  MetricName?: string;
  ModifiedAt?: Date;
  Name?: string;
  Period?: number;
  Statistic?: CloudWatchAlarmTemplateStatistic;
  Tags?: { [key: string]: string | undefined };
  TargetResourceType?: CloudWatchAlarmTemplateTargetResourceType;
  Threshold?: number;
  TreatMissingData?: CloudWatchAlarmTemplateTreatMissingData;
}
export type __listOfCloudWatchAlarmTemplateSummary = CloudWatchAlarmTemplateSummary[];
const __listOfCloudWatchAlarmTemplateSummary = /*@__PURE__*/ __L.at(__c155, 1);
export interface ListCloudWatchAlarmTemplatesResponse {
  CloudWatchAlarmTemplates?: (CloudWatchAlarmTemplateSummary & {
    Arn: __stringPatternArnMedialiveCloudwatchAlarmTemplate;
    ComparisonOperator: CloudWatchAlarmTemplateComparisonOperator;
    CreatedAt: __timestampIso8601;
    EvaluationPeriods: __integerMin1;
    GroupId: __stringMin7Max11PatternAws097;
    Id: __stringMin7Max11PatternAws097;
    MetricName: __stringMax64;
    Name: __stringMin1Max255PatternS;
    Period: __integerMin10Max86400;
    Statistic: CloudWatchAlarmTemplateStatistic;
    TargetResourceType: CloudWatchAlarmTemplateTargetResourceType;
    Threshold: number;
    TreatMissingData: CloudWatchAlarmTemplateTreatMissingData;
  })[];
  NextToken?: string;
}
export interface ListClusterAlertsRequest {
  ClusterId: string;
  MaxResults?: number;
  NextToken?: string;
  StateFilter?: string;
}
export type ClusterAlertState = "SET" | "CLEARED" | (string & {});
export interface ClusterAlert {
  AlertType?: string;
  ChannelId?: string;
  ClearedTimestamp?: Date;
  Id?: string;
  Message?: string;
  NodeId?: string;
  SetTimestamp?: Date;
  State?: ClusterAlertState;
}
export type __listOfClusterAlert = ClusterAlert[];
const __listOfClusterAlert = /*@__PURE__*/ __L.at(__c156, 2);
export interface ListClusterAlertsResponse {
  Alerts?: ClusterAlert[];
  NextToken?: string;
}
export interface ListClustersRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface DescribeClusterSummary {
  Arn?: string;
  ChannelIds?: string[];
  ClusterType?: ClusterType;
  Id?: string;
  InstanceRoleArn?: string;
  Name?: string;
  NetworkSettings?: ClusterNetworkSettings;
  State?: ClusterState;
}
export type __listOfDescribeClusterSummary = DescribeClusterSummary[];
const __listOfDescribeClusterSummary = /*@__PURE__*/ __L.at(__c157, 1);
export interface ListClustersResponse {
  Clusters?: DescribeClusterSummary[];
  NextToken?: string;
}
export interface ListEventBridgeRuleTemplateGroupsRequest {
  MaxResults?: number;
  NextToken?: string;
  SignalMapIdentifier?: string;
}
export interface EventBridgeRuleTemplateGroupSummary {
  Arn?: string;
  CreatedAt?: Date;
  Description?: string;
  Id?: string;
  ModifiedAt?: Date;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
  TemplateCount?: number;
}
export type __listOfEventBridgeRuleTemplateGroupSummary = EventBridgeRuleTemplateGroupSummary[];
const __listOfEventBridgeRuleTemplateGroupSummary =
  __listOfCloudWatchAlarmTemplateGroupSummary as any as S.Schema<__listOfEventBridgeRuleTemplateGroupSummary>;
export interface ListEventBridgeRuleTemplateGroupsResponse {
  EventBridgeRuleTemplateGroups?: (EventBridgeRuleTemplateGroupSummary & {
    Arn: __stringPatternArnMedialiveEventbridgeRuleTemplateGroup;
    CreatedAt: __timestampIso8601;
    Id: __stringMin7Max11PatternAws097;
    Name: __stringMin1Max255PatternS;
    TemplateCount: number;
  })[];
  NextToken?: string;
}
export interface ListEventBridgeRuleTemplatesRequest {
  GroupIdentifier?: string;
  MaxResults?: number;
  NextToken?: string;
  SignalMapIdentifier?: string;
}
export type __integerMax5 = number;
export interface EventBridgeRuleTemplateSummary {
  Arn?: string;
  CreatedAt?: Date;
  Description?: string;
  EventTargetCount?: number;
  EventType?: EventBridgeRuleTemplateEventType;
  GroupId?: string;
  Id?: string;
  ModifiedAt?: Date;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export type __listOfEventBridgeRuleTemplateSummary = EventBridgeRuleTemplateSummary[];
const __listOfEventBridgeRuleTemplateSummary = /*@__PURE__*/ __L.at(__c159, 2);
export interface ListEventBridgeRuleTemplatesResponse {
  EventBridgeRuleTemplates?: (EventBridgeRuleTemplateSummary & {
    Arn: __stringPatternArnMedialiveEventbridgeRuleTemplate;
    CreatedAt: __timestampIso8601;
    EventTargetCount: __integerMax5;
    EventType: EventBridgeRuleTemplateEventType;
    GroupId: __stringMin7Max11PatternAws097;
    Id: __stringMin7Max11PatternAws097;
    Name: __stringMin1Max255PatternS;
  })[];
  NextToken?: string;
}
export interface ListInputDevicesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface InputDeviceSummary {
  Arn?: string;
  ConnectionState?: InputDeviceConnectionState;
  DeviceSettingsSyncState?: DeviceSettingsSyncState;
  DeviceUpdateStatus?: DeviceUpdateStatus;
  HdDeviceSettings?: InputDeviceHdSettings;
  Id?: string;
  MacAddress?: string;
  Name?: string;
  NetworkSettings?: InputDeviceNetworkSettings;
  SerialNumber?: string;
  Type?: InputDeviceType;
  UhdDeviceSettings?: InputDeviceUhdSettings;
  Tags?: { [key: string]: string | undefined };
  AvailabilityZone?: string;
  MedialiveInputArns?: string[];
  OutputType?: InputDeviceOutputType;
}
export type __listOfInputDeviceSummary = InputDeviceSummary[];
const __listOfInputDeviceSummary = /*@__PURE__*/ __L.at(__c160, 1);
export interface ListInputDevicesResponse {
  InputDevices?: InputDeviceSummary[];
  NextToken?: string;
}
export interface ListInputDeviceTransfersRequest {
  MaxResults?: number;
  NextToken?: string;
  TransferType?: string;
}
export type InputDeviceTransferType = "OUTGOING" | "INCOMING" | (string & {});
export interface TransferringInputDeviceSummary {
  Id?: string;
  Message?: string;
  TargetCustomerId?: string;
  TransferType?: InputDeviceTransferType;
}
export type __listOfTransferringInputDeviceSummary = TransferringInputDeviceSummary[];
const __listOfTransferringInputDeviceSummary = /*@__PURE__*/ __L.at(__c161, 2);
export interface ListInputDeviceTransfersResponse {
  InputDeviceTransfers?: TransferringInputDeviceSummary[];
  NextToken?: string;
}
export interface ListInputsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type __listOfInput = Input[];
const __listOfInput = /*@__PURE__*/ __L.at(__c162, 1);
export interface ListInputsResponse {
  Inputs?: (Input & {
    SrtSettings: SrtSettings & {
      SrtListenerSettings: SrtListenerSettings & {
        Decryption: SrtListenerDecryption & { Algorithm: Algorithm; PassphraseSecretArn: string };
      };
    };
    MulticastSettings: MulticastSettings & { Sources: (MulticastSource & { Url: string })[] };
  })[];
  NextToken?: string;
}
export interface ListInputSecurityGroupsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type __listOfInputSecurityGroup = InputSecurityGroup[];
const __listOfInputSecurityGroup = /*@__PURE__*/ __L.at(__c163, 1);
export interface ListInputSecurityGroupsResponse {
  InputSecurityGroups?: InputSecurityGroup[];
  NextToken?: string;
}
export interface ListMultiplexAlertsRequest {
  MaxResults?: number;
  MultiplexId: string;
  NextToken?: string;
  StateFilter?: string;
}
export type MultiplexAlertState = "SET" | "CLEARED" | (string & {});
export interface MultiplexAlert {
  AlertType?: string;
  ClearedTimestamp?: Date;
  Id?: string;
  Message?: string;
  PipelineId?: string;
  SetTimestamp?: Date;
  State?: MultiplexAlertState;
}
export type __listOfMultiplexAlert = MultiplexAlert[];
export interface ListMultiplexAlertsResponse {
  Alerts?: MultiplexAlert[];
  NextToken?: string;
}
export interface ListMultiplexesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface MultiplexSettingsSummary {
  TransportStreamBitrate?: number;
}
export interface MultiplexSummary {
  Arn?: string;
  AvailabilityZones?: string[];
  Id?: string;
  MultiplexSettings?: MultiplexSettingsSummary;
  Name?: string;
  PipelinesRunningCount?: number;
  ProgramCount?: number;
  State?: MultiplexState;
  Tags?: { [key: string]: string | undefined };
}
export type __listOfMultiplexSummary = MultiplexSummary[];
const __listOfMultiplexSummary = /*@__PURE__*/ __L.at(__c165, 3);
export interface ListMultiplexesResponse {
  Multiplexes?: MultiplexSummary[];
  NextToken?: string;
}
export interface ListMultiplexProgramsRequest {
  MaxResults?: number;
  MultiplexId: string;
  NextToken?: string;
}
export interface MultiplexProgramSummary {
  ChannelId?: string;
  ProgramName?: string;
}
export type __listOfMultiplexProgramSummary = MultiplexProgramSummary[];
const __listOfMultiplexProgramSummary = /*@__PURE__*/ __L.at(__c166, 2);
export interface ListMultiplexProgramsResponse {
  MultiplexPrograms?: MultiplexProgramSummary[];
  NextToken?: string;
}
export interface ListNetworksRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface DescribeNetworkSummary {
  Arn?: string;
  AssociatedClusterIds?: string[];
  Id?: string;
  IpPools?: IpPool[];
  Name?: string;
  Routes?: Route[];
  State?: NetworkState;
}
export type __listOfDescribeNetworkSummary = DescribeNetworkSummary[];
const __listOfDescribeNetworkSummary = /*@__PURE__*/ __L.at(__c167, 1);
export interface ListNetworksResponse {
  Networks?: DescribeNetworkSummary[];
  NextToken?: string;
}
export interface ListNodesRequest {
  ClusterId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface DescribeNodeSummary {
  Arn?: string;
  ChannelPlacementGroups?: string[];
  ClusterId?: string;
  ConnectionState?: NodeConnectionState;
  Id?: string;
  InstanceArn?: string;
  ManagedInstanceId?: string;
  Name?: string;
  NodeInterfaceMappings?: NodeInterfaceMapping[];
  Role?: NodeRole;
  State?: NodeState;
  SdiSourceMappings?: SdiSourceMapping[];
}
export type __listOfDescribeNodeSummary = DescribeNodeSummary[];
const __listOfDescribeNodeSummary = /*@__PURE__*/ __L.at(__c168, 2);
export interface ListNodesResponse {
  NextToken?: string;
  Nodes?: DescribeNodeSummary[];
}
export interface ListOfferingsRequest {
  ChannelClass?: string;
  ChannelConfiguration?: string;
  Codec?: string;
  Duration?: string;
  MaxResults?: number;
  MaximumBitrate?: string;
  MaximumFramerate?: string;
  NextToken?: string;
  Resolution?: string;
  ResourceType?: string;
  SpecialFeature?: string;
  VideoQuality?: string;
}
export interface Offering {
  Arn?: string;
  CurrencyCode?: string;
  Duration?: number;
  DurationUnits?: OfferingDurationUnits;
  FixedPrice?: number;
  OfferingDescription?: string;
  OfferingId?: string;
  OfferingType?: OfferingType;
  Region?: string;
  ResourceSpecification?: ReservationResourceSpecification;
  UsagePrice?: number;
}
export type __listOfOffering = Offering[];
const __listOfOffering = /*@__PURE__*/ __L.at(__c169, 1);
export interface ListOfferingsResponse {
  NextToken?: string;
  Offerings?: Offering[];
}
export interface ListReservationsRequest {
  ChannelClass?: string;
  Codec?: string;
  MaxResults?: number;
  MaximumBitrate?: string;
  MaximumFramerate?: string;
  NextToken?: string;
  Resolution?: string;
  ResourceType?: string;
  SpecialFeature?: string;
  VideoQuality?: string;
}
export interface Reservation {
  Arn?: string;
  Count?: number;
  CurrencyCode?: string;
  Duration?: number;
  DurationUnits?: OfferingDurationUnits;
  End?: string;
  FixedPrice?: number;
  Name?: string;
  OfferingDescription?: string;
  OfferingId?: string;
  OfferingType?: OfferingType;
  Region?: string;
  RenewalSettings?: RenewalSettings;
  ReservationId?: string;
  ResourceSpecification?: ReservationResourceSpecification;
  Start?: string;
  State?: ReservationState;
  Tags?: { [key: string]: string | undefined };
  UsagePrice?: number;
}
export type __listOfReservation = Reservation[];
const __listOfReservation = /*@__PURE__*/ __L.at(__c170, 1);
export interface ListReservationsResponse {
  NextToken?: string;
  Reservations?: Reservation[];
}
export interface ListSdiSourcesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface SdiSourceSummary {
  Arn?: string;
  Id?: string;
  Inputs?: string[];
  Mode?: SdiSourceMode;
  Name?: string;
  State?: SdiSourceState;
  Type?: SdiSourceType;
}
export type __listOfSdiSourceSummary = SdiSourceSummary[];
const __listOfSdiSourceSummary = /*@__PURE__*/ __L.at(__c171, 1);
export interface ListSdiSourcesResponse {
  NextToken?: string;
  SdiSources?: SdiSourceSummary[];
}
export interface ListSignalMapsRequest {
  CloudWatchAlarmTemplateGroupIdentifier?: string;
  EventBridgeRuleTemplateGroupIdentifier?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface SignalMapSummary {
  Arn?: string;
  CreatedAt?: Date;
  Description?: string;
  Id?: string;
  ModifiedAt?: Date;
  MonitorDeploymentStatus?: SignalMapMonitorDeploymentStatus;
  Name?: string;
  Status?: SignalMapStatus;
  Tags?: { [key: string]: string | undefined };
}
export type __listOfSignalMapSummary = SignalMapSummary[];
const __listOfSignalMapSummary = /*@__PURE__*/ __L.at(__c172, 2);
export interface ListSignalMapsResponse {
  NextToken?: string;
  SignalMaps?: (SignalMapSummary & {
    Arn: __stringPatternArnMedialiveSignalMap;
    CreatedAt: __timestampIso8601;
    Id: __stringMin7Max11PatternAws097;
    MonitorDeploymentStatus: SignalMapMonitorDeploymentStatus;
    Name: __stringMin1Max255PatternS;
    Status: SignalMapStatus;
  })[];
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface ListVersionsRequest {}
export interface ListVersionsResponse {
  Versions?: ChannelEngineVersionResponse[];
}
export interface PurchaseOfferingRequest {
  Count?: number;
  Name?: string;
  OfferingId: string;
  RenewalSettings?: RenewalSettings;
  RequestId?: string;
  Start?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface PurchaseOfferingResponse {
  Reservation?: Reservation;
}
export type RebootInputDeviceForce = "NO" | "YES" | (string & {});
export interface RebootInputDeviceRequest {
  Force?: RebootInputDeviceForce;
  InputDeviceId: string;
}
export interface RebootInputDeviceResponse {}
export interface RejectInputDeviceTransferRequest {
  InputDeviceId: string;
}
export interface RejectInputDeviceTransferResponse {}
export type ChannelPipelineIdToRestart = "PIPELINE_0" | "PIPELINE_1" | (string & {});
export type __listOfChannelPipelineIdToRestart = ChannelPipelineIdToRestart[];
const __listOfChannelPipelineIdToRestart =
  __listOfDashRoleAudio as any as S.Schema<__listOfChannelPipelineIdToRestart>;
export interface RestartChannelPipelinesRequest {
  ChannelId: string;
  PipelineIds?: ChannelPipelineIdToRestart[];
}
export interface RestartChannelPipelinesResponse {
  Arn?: string;
  CdiInputSpecification?: CdiInputSpecification;
  ChannelClass?: ChannelClass;
  Destinations?: OutputDestination[];
  EgressEndpoints?: ChannelEgressEndpoint[];
  EncoderSettings?: EncoderSettings & {
    AudioDescriptions: (AudioDescription & {
      AudioSelectorName: string;
      Name: __stringMax255;
      AudioWatermarkingSettings: AudioWatermarkSettings & {
        NielsenWatermarksSettings: NielsenWatermarksSettings & {
          NielsenCbetSettings: NielsenCBET & {
            CbetCheckDigitString: __stringMin2Max2;
            CbetStepaside: NielsenWatermarksCbetStepaside;
            Csid: __stringMin1Max7;
          };
          NielsenNaesIiNwSettings: NielsenNaesIiNw & {
            CheckDigitString: __stringMin2Max2;
            Sid: __doubleMin1Max65535;
          };
          NielsenNwOnlySettings: NielsenNwOnly & {
            CheckDigitString: __stringMin2Max2;
            Sid: __doubleMin1Max65535;
          };
        };
      };
      RemixSettings: RemixSettings & {
        ChannelMappings: (AudioChannelMapping & {
          InputChannelLevels: (InputChannelLevel & {
            Gain: __integerMinNegative60Max6;
            InputChannel: __integerMin0Max15;
          })[];
          OutputChannel: __integerMin0Max7;
        })[];
      };
    })[];
    OutputGroups: (OutputGroup & {
      OutputGroupSettings: OutputGroupSettings & {
        ArchiveGroupSettings: ArchiveGroupSettings & { Destination: OutputLocationRef };
        FrameCaptureGroupSettings: FrameCaptureGroupSettings & { Destination: OutputLocationRef };
        HlsGroupSettings: HlsGroupSettings & {
          Destination: OutputLocationRef;
          CaptionLanguageMappings: (CaptionLanguageMapping & {
            CaptionChannel: __integerMin1Max4;
            LanguageCode: __stringMin3Max3;
            LanguageDescription: __stringMin1;
          })[];
          KeyProviderSettings: KeyProviderSettings & {
            StaticKeySettings: StaticKeySettings & {
              StaticKeyValue: __stringMin32Max32;
              KeyProviderServer: InputLocation & { Uri: __stringMax2048 };
            };
          };
        };
        MediaPackageGroupSettings: MediaPackageGroupSettings & {
          Destination: OutputLocationRef;
          MediapackageV2GroupSettings: MediaPackageV2GroupSettings & {
            CaptionLanguageMappings: (CaptionLanguageMapping & {
              CaptionChannel: __integerMin1Max4;
              LanguageCode: __stringMin3Max3;
              LanguageDescription: __stringMin1;
            })[];
            AdditionalDestinations: (MediaPackageAdditionalDestinations & {
              Destination: OutputLocationRef;
            })[];
            WatermarkingSettings: MediaPackageV2WatermarkingSettings & {
              MediaPackageV2AbWatermarkerIrdetoSettings: MediaPackageV2AbWatermarkerIrdetoSettings & {
                AlternateDestination: OutputLocationRef;
                OperatorId: __integerMin1Max511;
                Profile: AbWatermarkingProfile;
                CustomProfile: AbWatermarkingCustomProfile & {
                  EmbeddingFrequency: __doubleMin250Max5000;
                  SceneCut: __doubleMinNegative1Max5;
                  TargetPsnr: __doubleMin32Max46;
                };
              };
            };
          };
        };
        MsSmoothGroupSettings: MsSmoothGroupSettings & { Destination: OutputLocationRef };
        CmafIngestGroupSettings: CmafIngestGroupSettings & {
          Destination: OutputLocationRef;
          CaptionLanguageMappings: (CmafIngestCaptionLanguageMapping & {
            CaptionChannel: __integerMin1Max4;
            LanguageCode: __stringMin3Max3;
          })[];
          AdditionalDestinations: (AdditionalDestinations & { Destination: OutputLocationRef })[];
          WatermarkingSettings: CmafIngestWatermarkingSettings & {
            CmafIngestAbWatermarkerIrdetoSettings: CmafIngestAbWatermarkerIrdetoSettings & {
              AlternateDestination: OutputLocationRef;
              OperatorId: __integerMin1Max511;
              Profile: AbWatermarkingProfile;
              CustomProfile: AbWatermarkingCustomProfile & {
                EmbeddingFrequency: __doubleMin250Max5000;
                SceneCut: __doubleMinNegative1Max5;
                TargetPsnr: __doubleMin32Max46;
              };
            };
          };
        };
      };
      Outputs: (Output & {
        OutputSettings: OutputSettings & {
          ArchiveOutputSettings: ArchiveOutputSettings & {
            ContainerSettings: ArchiveContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
          };
          HlsOutputSettings: HlsOutputSettings & {
            HlsSettings: HlsSettings & {
              AudioOnlyHlsSettings: AudioOnlyHlsSettings & {
                AudioOnlyImage: InputLocation & { Uri: __stringMax2048 };
              };
              StandardHlsSettings: StandardHlsSettings & { M3u8Settings: M3u8Settings };
            };
          };
          MultiplexOutputSettings: MultiplexOutputSettings & { Destination: OutputLocationRef };
          RtmpOutputSettings: RtmpOutputSettings & { Destination: OutputLocationRef };
          UdpOutputSettings: UdpOutputSettings & {
            ContainerSettings: UdpContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
          SrtOutputSettings: SrtOutputSettings & {
            ContainerSettings: UdpContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
          MediaConnectRouterOutputSettings: MediaConnectRouterOutputSettings & {
            ContainerSettings: MediaConnectRouterContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
        };
      })[];
    })[];
    TimecodeConfig: TimecodeConfig & { Source: TimecodeConfigSource };
    VideoDescriptions: (VideoDescription & {
      Name: string;
      CodecSettings: VideoCodecSettings & {
        FrameCaptureSettings: FrameCaptureSettings & {
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        H264Settings: H264Settings & {
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        H265Settings: H265Settings & {
          FramerateDenominator: __integerMin1Max3003;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        Mpeg2Settings: Mpeg2Settings & {
          FramerateDenominator: __integerMin1;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        Av1Settings: Av1Settings & {
          FramerateDenominator: __integerMin1Max3003;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
      };
      CropRectangle: VideoPositionRectangle & {
        Height: __integerMin2Max8192;
        Width: __integerMin2Max8192;
        X: __integerMin0Max8190;
        Y: __integerMin0Max8190;
      };
      OutputPositionRectangle: VideoPositionRectangle & {
        Height: __integerMin2Max8192;
        Width: __integerMin2Max8192;
        X: __integerMin0Max8190;
        Y: __integerMin0Max8190;
      };
    })[];
    AvailBlanking: AvailBlanking & { AvailBlankingImage: InputLocation & { Uri: __stringMax2048 } };
    AvailConfiguration: AvailConfiguration & {
      AvailSettings: AvailSettings & {
        Esam: Esam & { AcquisitionPointId: __stringMax256; PoisEndpoint: __stringMax2048 };
      };
    };
    BlackoutSlate: BlackoutSlate & {
      BlackoutSlateImage: InputLocation & { Uri: __stringMax2048 };
      NetworkEndBlackoutImage: InputLocation & { Uri: __stringMax2048 };
    };
    CaptionDescriptions: (CaptionDescription & {
      CaptionSelectorName: string;
      Name: string;
      DestinationSettings: CaptionDestinationSettings & {
        BurnInDestinationSettings: BurnInDestinationSettings & {
          Font: InputLocation & { Uri: __stringMax2048 };
        };
        DvbSubDestinationSettings: DvbSubDestinationSettings & {
          Font: InputLocation & { Uri: __stringMax2048 };
        };
      };
    })[];
    GlobalConfiguration: GlobalConfiguration & {
      InputLossBehavior: InputLossBehavior & {
        InputLossImageSlate: InputLocation & { Uri: __stringMax2048 };
      };
    };
    MotionGraphicsConfiguration: MotionGraphicsConfiguration & {
      MotionGraphicsSettings: MotionGraphicsSettings;
    };
    ThumbnailConfiguration: ThumbnailConfiguration & { State: ThumbnailState };
    ColorCorrectionSettings: ColorCorrectionSettings & {
      GlobalColorCorrections: (ColorCorrection & {
        InputColorSpace: ColorSpace;
        OutputColorSpace: ColorSpace;
        Uri: string;
      })[];
    };
  };
  Id?: string;
  InputAttachments?: (InputAttachment & {
    AutomaticInputFailoverSettings: AutomaticInputFailoverSettings & {
      SecondaryInputId: string;
      FailoverConditions: (FailoverCondition & {
        FailoverConditionSettings: FailoverConditionSettings & {
          AudioSilenceSettings: AudioSilenceFailoverSettings & { AudioSelectorName: string };
        };
      })[];
    };
    InputSettings: InputSettings & {
      AudioSelectors: (AudioSelector & {
        Name: __stringMin1;
        SelectorSettings: AudioSelectorSettings & {
          AudioHlsRenditionSelection: AudioHlsRenditionSelection & {
            GroupId: __stringMin1;
            Name: __stringMin1;
          };
          AudioLanguageSelection: AudioLanguageSelection & { LanguageCode: string };
          AudioPidSelection: AudioPidSelection & {
            Pid: __integerMin0Max8191;
            Pids: (AudioPid & {
              Pid: __integerMin0Max8191;
              DolbyEDecode: AudioDolbyEDecode & { ProgramSelection: DolbyEProgramSelection };
              PremixSettings: AudioPreMixerSettings & {
                RemixSettings: RemixSettings & {
                  ChannelMappings: (AudioChannelMapping & {
                    InputChannelLevels: (InputChannelLevel & {
                      Gain: __integerMinNegative60Max6;
                      InputChannel: __integerMin0Max15;
                    })[];
                    OutputChannel: __integerMin0Max7;
                  })[];
                };
              };
            })[];
          };
          AudioTrackSelection: AudioTrackSelection & {
            Tracks: (AudioTrack & {
              Track: __integerMin1;
              PremixSettings: AudioPreMixerSettings & {
                RemixSettings: RemixSettings & {
                  ChannelMappings: (AudioChannelMapping & {
                    InputChannelLevels: (InputChannelLevel & {
                      Gain: __integerMinNegative60Max6;
                      InputChannel: __integerMin0Max15;
                    })[];
                    OutputChannel: __integerMin0Max7;
                  })[];
                };
              };
            })[];
            DolbyEDecode: AudioDolbyEDecode & { ProgramSelection: DolbyEProgramSelection };
          };
        };
      })[];
      CaptionSelectors: (CaptionSelector & {
        Name: __stringMin1;
        SelectorSettings: CaptionSelectorSettings & {
          TeletextSourceSettings: TeletextSourceSettings & {
            OutputRectangle: CaptionRectangle & {
              Height: __doubleMin0Max100;
              LeftOffset: __doubleMin0Max100;
              TopOffset: __doubleMin0Max100;
              Width: __doubleMin0Max100;
            };
          };
        };
      })[];
    };
  })[];
  InputSpecification?: InputSpecification;
  LogLevel?: LogLevel;
  Maintenance?: MaintenanceStatus;
  MaintenanceStatus?: string;
  Name?: string;
  PipelineDetails?: PipelineDetail[];
  PipelinesRunningCount?: number;
  RoleArn?: string;
  State?: ChannelState;
  Tags?: { [key: string]: string | undefined };
  Vpc?: VpcOutputSettingsDescription;
  AnywhereSettings?: DescribeAnywhereSettings;
  ChannelEngineVersion?: ChannelEngineVersionResponse;
  LinkedChannelSettings?: DescribeLinkedChannelSettings;
  ChannelSecurityGroups?: string[];
  InferenceSettings?: DescribeInferenceSettings;
}
export interface StartChannelRequest {
  ChannelId: string;
}
export interface StartChannelResponse {
  Arn?: string;
  CdiInputSpecification?: CdiInputSpecification;
  ChannelClass?: ChannelClass;
  Destinations?: OutputDestination[];
  EgressEndpoints?: ChannelEgressEndpoint[];
  EncoderSettings?: EncoderSettings & {
    AudioDescriptions: (AudioDescription & {
      AudioSelectorName: string;
      Name: __stringMax255;
      AudioWatermarkingSettings: AudioWatermarkSettings & {
        NielsenWatermarksSettings: NielsenWatermarksSettings & {
          NielsenCbetSettings: NielsenCBET & {
            CbetCheckDigitString: __stringMin2Max2;
            CbetStepaside: NielsenWatermarksCbetStepaside;
            Csid: __stringMin1Max7;
          };
          NielsenNaesIiNwSettings: NielsenNaesIiNw & {
            CheckDigitString: __stringMin2Max2;
            Sid: __doubleMin1Max65535;
          };
          NielsenNwOnlySettings: NielsenNwOnly & {
            CheckDigitString: __stringMin2Max2;
            Sid: __doubleMin1Max65535;
          };
        };
      };
      RemixSettings: RemixSettings & {
        ChannelMappings: (AudioChannelMapping & {
          InputChannelLevels: (InputChannelLevel & {
            Gain: __integerMinNegative60Max6;
            InputChannel: __integerMin0Max15;
          })[];
          OutputChannel: __integerMin0Max7;
        })[];
      };
    })[];
    OutputGroups: (OutputGroup & {
      OutputGroupSettings: OutputGroupSettings & {
        ArchiveGroupSettings: ArchiveGroupSettings & { Destination: OutputLocationRef };
        FrameCaptureGroupSettings: FrameCaptureGroupSettings & { Destination: OutputLocationRef };
        HlsGroupSettings: HlsGroupSettings & {
          Destination: OutputLocationRef;
          CaptionLanguageMappings: (CaptionLanguageMapping & {
            CaptionChannel: __integerMin1Max4;
            LanguageCode: __stringMin3Max3;
            LanguageDescription: __stringMin1;
          })[];
          KeyProviderSettings: KeyProviderSettings & {
            StaticKeySettings: StaticKeySettings & {
              StaticKeyValue: __stringMin32Max32;
              KeyProviderServer: InputLocation & { Uri: __stringMax2048 };
            };
          };
        };
        MediaPackageGroupSettings: MediaPackageGroupSettings & {
          Destination: OutputLocationRef;
          MediapackageV2GroupSettings: MediaPackageV2GroupSettings & {
            CaptionLanguageMappings: (CaptionLanguageMapping & {
              CaptionChannel: __integerMin1Max4;
              LanguageCode: __stringMin3Max3;
              LanguageDescription: __stringMin1;
            })[];
            AdditionalDestinations: (MediaPackageAdditionalDestinations & {
              Destination: OutputLocationRef;
            })[];
            WatermarkingSettings: MediaPackageV2WatermarkingSettings & {
              MediaPackageV2AbWatermarkerIrdetoSettings: MediaPackageV2AbWatermarkerIrdetoSettings & {
                AlternateDestination: OutputLocationRef;
                OperatorId: __integerMin1Max511;
                Profile: AbWatermarkingProfile;
                CustomProfile: AbWatermarkingCustomProfile & {
                  EmbeddingFrequency: __doubleMin250Max5000;
                  SceneCut: __doubleMinNegative1Max5;
                  TargetPsnr: __doubleMin32Max46;
                };
              };
            };
          };
        };
        MsSmoothGroupSettings: MsSmoothGroupSettings & { Destination: OutputLocationRef };
        CmafIngestGroupSettings: CmafIngestGroupSettings & {
          Destination: OutputLocationRef;
          CaptionLanguageMappings: (CmafIngestCaptionLanguageMapping & {
            CaptionChannel: __integerMin1Max4;
            LanguageCode: __stringMin3Max3;
          })[];
          AdditionalDestinations: (AdditionalDestinations & { Destination: OutputLocationRef })[];
          WatermarkingSettings: CmafIngestWatermarkingSettings & {
            CmafIngestAbWatermarkerIrdetoSettings: CmafIngestAbWatermarkerIrdetoSettings & {
              AlternateDestination: OutputLocationRef;
              OperatorId: __integerMin1Max511;
              Profile: AbWatermarkingProfile;
              CustomProfile: AbWatermarkingCustomProfile & {
                EmbeddingFrequency: __doubleMin250Max5000;
                SceneCut: __doubleMinNegative1Max5;
                TargetPsnr: __doubleMin32Max46;
              };
            };
          };
        };
      };
      Outputs: (Output & {
        OutputSettings: OutputSettings & {
          ArchiveOutputSettings: ArchiveOutputSettings & {
            ContainerSettings: ArchiveContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
          };
          HlsOutputSettings: HlsOutputSettings & {
            HlsSettings: HlsSettings & {
              AudioOnlyHlsSettings: AudioOnlyHlsSettings & {
                AudioOnlyImage: InputLocation & { Uri: __stringMax2048 };
              };
              StandardHlsSettings: StandardHlsSettings & { M3u8Settings: M3u8Settings };
            };
          };
          MultiplexOutputSettings: MultiplexOutputSettings & { Destination: OutputLocationRef };
          RtmpOutputSettings: RtmpOutputSettings & { Destination: OutputLocationRef };
          UdpOutputSettings: UdpOutputSettings & {
            ContainerSettings: UdpContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
          SrtOutputSettings: SrtOutputSettings & {
            ContainerSettings: UdpContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
          MediaConnectRouterOutputSettings: MediaConnectRouterOutputSettings & {
            ContainerSettings: MediaConnectRouterContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
        };
      })[];
    })[];
    TimecodeConfig: TimecodeConfig & { Source: TimecodeConfigSource };
    VideoDescriptions: (VideoDescription & {
      Name: string;
      CodecSettings: VideoCodecSettings & {
        FrameCaptureSettings: FrameCaptureSettings & {
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        H264Settings: H264Settings & {
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        H265Settings: H265Settings & {
          FramerateDenominator: __integerMin1Max3003;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        Mpeg2Settings: Mpeg2Settings & {
          FramerateDenominator: __integerMin1;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        Av1Settings: Av1Settings & {
          FramerateDenominator: __integerMin1Max3003;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
      };
      CropRectangle: VideoPositionRectangle & {
        Height: __integerMin2Max8192;
        Width: __integerMin2Max8192;
        X: __integerMin0Max8190;
        Y: __integerMin0Max8190;
      };
      OutputPositionRectangle: VideoPositionRectangle & {
        Height: __integerMin2Max8192;
        Width: __integerMin2Max8192;
        X: __integerMin0Max8190;
        Y: __integerMin0Max8190;
      };
    })[];
    AvailBlanking: AvailBlanking & { AvailBlankingImage: InputLocation & { Uri: __stringMax2048 } };
    AvailConfiguration: AvailConfiguration & {
      AvailSettings: AvailSettings & {
        Esam: Esam & { AcquisitionPointId: __stringMax256; PoisEndpoint: __stringMax2048 };
      };
    };
    BlackoutSlate: BlackoutSlate & {
      BlackoutSlateImage: InputLocation & { Uri: __stringMax2048 };
      NetworkEndBlackoutImage: InputLocation & { Uri: __stringMax2048 };
    };
    CaptionDescriptions: (CaptionDescription & {
      CaptionSelectorName: string;
      Name: string;
      DestinationSettings: CaptionDestinationSettings & {
        BurnInDestinationSettings: BurnInDestinationSettings & {
          Font: InputLocation & { Uri: __stringMax2048 };
        };
        DvbSubDestinationSettings: DvbSubDestinationSettings & {
          Font: InputLocation & { Uri: __stringMax2048 };
        };
      };
    })[];
    GlobalConfiguration: GlobalConfiguration & {
      InputLossBehavior: InputLossBehavior & {
        InputLossImageSlate: InputLocation & { Uri: __stringMax2048 };
      };
    };
    MotionGraphicsConfiguration: MotionGraphicsConfiguration & {
      MotionGraphicsSettings: MotionGraphicsSettings;
    };
    ThumbnailConfiguration: ThumbnailConfiguration & { State: ThumbnailState };
    ColorCorrectionSettings: ColorCorrectionSettings & {
      GlobalColorCorrections: (ColorCorrection & {
        InputColorSpace: ColorSpace;
        OutputColorSpace: ColorSpace;
        Uri: string;
      })[];
    };
  };
  Id?: string;
  InputAttachments?: (InputAttachment & {
    AutomaticInputFailoverSettings: AutomaticInputFailoverSettings & {
      SecondaryInputId: string;
      FailoverConditions: (FailoverCondition & {
        FailoverConditionSettings: FailoverConditionSettings & {
          AudioSilenceSettings: AudioSilenceFailoverSettings & { AudioSelectorName: string };
        };
      })[];
    };
    InputSettings: InputSettings & {
      AudioSelectors: (AudioSelector & {
        Name: __stringMin1;
        SelectorSettings: AudioSelectorSettings & {
          AudioHlsRenditionSelection: AudioHlsRenditionSelection & {
            GroupId: __stringMin1;
            Name: __stringMin1;
          };
          AudioLanguageSelection: AudioLanguageSelection & { LanguageCode: string };
          AudioPidSelection: AudioPidSelection & {
            Pid: __integerMin0Max8191;
            Pids: (AudioPid & {
              Pid: __integerMin0Max8191;
              DolbyEDecode: AudioDolbyEDecode & { ProgramSelection: DolbyEProgramSelection };
              PremixSettings: AudioPreMixerSettings & {
                RemixSettings: RemixSettings & {
                  ChannelMappings: (AudioChannelMapping & {
                    InputChannelLevels: (InputChannelLevel & {
                      Gain: __integerMinNegative60Max6;
                      InputChannel: __integerMin0Max15;
                    })[];
                    OutputChannel: __integerMin0Max7;
                  })[];
                };
              };
            })[];
          };
          AudioTrackSelection: AudioTrackSelection & {
            Tracks: (AudioTrack & {
              Track: __integerMin1;
              PremixSettings: AudioPreMixerSettings & {
                RemixSettings: RemixSettings & {
                  ChannelMappings: (AudioChannelMapping & {
                    InputChannelLevels: (InputChannelLevel & {
                      Gain: __integerMinNegative60Max6;
                      InputChannel: __integerMin0Max15;
                    })[];
                    OutputChannel: __integerMin0Max7;
                  })[];
                };
              };
            })[];
            DolbyEDecode: AudioDolbyEDecode & { ProgramSelection: DolbyEProgramSelection };
          };
        };
      })[];
      CaptionSelectors: (CaptionSelector & {
        Name: __stringMin1;
        SelectorSettings: CaptionSelectorSettings & {
          TeletextSourceSettings: TeletextSourceSettings & {
            OutputRectangle: CaptionRectangle & {
              Height: __doubleMin0Max100;
              LeftOffset: __doubleMin0Max100;
              TopOffset: __doubleMin0Max100;
              Width: __doubleMin0Max100;
            };
          };
        };
      })[];
    };
  })[];
  InputSpecification?: InputSpecification;
  LogLevel?: LogLevel;
  Maintenance?: MaintenanceStatus;
  Name?: string;
  PipelineDetails?: PipelineDetail[];
  PipelinesRunningCount?: number;
  RoleArn?: string;
  State?: ChannelState;
  Tags?: { [key: string]: string | undefined };
  Vpc?: VpcOutputSettingsDescription;
  AnywhereSettings?: DescribeAnywhereSettings;
  ChannelEngineVersion?: ChannelEngineVersionResponse;
  LinkedChannelSettings?: DescribeLinkedChannelSettings;
  ChannelSecurityGroups?: string[];
  InferenceSettings?: DescribeInferenceSettings;
}
export interface StartDeleteMonitorDeploymentRequest {
  Identifier: string;
}
export interface StartDeleteMonitorDeploymentResponse {
  Arn?: string;
  CloudWatchAlarmTemplateGroupIds?: string[];
  CreatedAt?: Date;
  Description?: string;
  DiscoveryEntryPointArn?: string;
  ErrorMessage?: string;
  EventBridgeRuleTemplateGroupIds?: string[];
  FailedMediaResourceMap?: {
    [key: string]:
      | (MediaResource & {
          Destinations: (MediaResourceNeighbor & { Arn: __stringMin1Max2048PatternArn })[];
          Sources: (MediaResourceNeighbor & { Arn: __stringMin1Max2048PatternArn })[];
        })
      | undefined;
  };
  Id?: string;
  LastDiscoveredAt?: Date;
  LastSuccessfulMonitorDeployment?: SuccessfulMonitorDeployment & {
    DetailsUri: __stringMin1Max2048;
    Status: SignalMapMonitorDeploymentStatus;
  };
  MediaResourceMap?: {
    [key: string]:
      | (MediaResource & {
          Destinations: (MediaResourceNeighbor & { Arn: __stringMin1Max2048PatternArn })[];
          Sources: (MediaResourceNeighbor & { Arn: __stringMin1Max2048PatternArn })[];
        })
      | undefined;
  };
  ModifiedAt?: Date;
  MonitorChangesPendingDeployment?: boolean;
  MonitorDeployment?: MonitorDeployment & { Status: SignalMapMonitorDeploymentStatus };
  Name?: string;
  Status?: SignalMapStatus;
  Tags?: { [key: string]: string | undefined };
}
export interface StartInputDeviceRequest {
  InputDeviceId: string;
}
export interface StartInputDeviceResponse {}
export interface StartInputDeviceMaintenanceWindowRequest {
  InputDeviceId: string;
}
export interface StartInputDeviceMaintenanceWindowResponse {}
export interface StartMonitorDeploymentRequest {
  DryRun?: boolean;
  Identifier: string;
}
export interface StartMonitorDeploymentResponse {
  Arn?: string;
  CloudWatchAlarmTemplateGroupIds?: string[];
  CreatedAt?: Date;
  Description?: string;
  DiscoveryEntryPointArn?: string;
  ErrorMessage?: string;
  EventBridgeRuleTemplateGroupIds?: string[];
  FailedMediaResourceMap?: {
    [key: string]:
      | (MediaResource & {
          Destinations: (MediaResourceNeighbor & { Arn: __stringMin1Max2048PatternArn })[];
          Sources: (MediaResourceNeighbor & { Arn: __stringMin1Max2048PatternArn })[];
        })
      | undefined;
  };
  Id?: string;
  LastDiscoveredAt?: Date;
  LastSuccessfulMonitorDeployment?: SuccessfulMonitorDeployment & {
    DetailsUri: __stringMin1Max2048;
    Status: SignalMapMonitorDeploymentStatus;
  };
  MediaResourceMap?: {
    [key: string]:
      | (MediaResource & {
          Destinations: (MediaResourceNeighbor & { Arn: __stringMin1Max2048PatternArn })[];
          Sources: (MediaResourceNeighbor & { Arn: __stringMin1Max2048PatternArn })[];
        })
      | undefined;
  };
  ModifiedAt?: Date;
  MonitorChangesPendingDeployment?: boolean;
  MonitorDeployment?: MonitorDeployment & { Status: SignalMapMonitorDeploymentStatus };
  Name?: string;
  Status?: SignalMapStatus;
  Tags?: { [key: string]: string | undefined };
}
export interface StartMultiplexRequest {
  MultiplexId: string;
}
export interface StartMultiplexResponse {
  Arn?: string;
  AvailabilityZones?: string[];
  Destinations?: MultiplexOutputDestination[];
  Id?: string;
  MultiplexSettings?: MultiplexSettings & {
    TransportStreamBitrate: __integerMin1000000Max100000000;
    TransportStreamId: __integerMin0Max65535;
  };
  Name?: string;
  PipelinesRunningCount?: number;
  ProgramCount?: number;
  State?: MultiplexState;
  Tags?: { [key: string]: string | undefined };
}
export interface StartUpdateSignalMapRequest {
  CloudWatchAlarmTemplateGroupIdentifiers?: string[];
  Description?: string;
  DiscoveryEntryPointArn?: string;
  EventBridgeRuleTemplateGroupIdentifiers?: string[];
  ForceRediscovery?: boolean;
  Identifier: string;
  Name?: string;
}
export interface StartUpdateSignalMapResponse {
  Arn?: string;
  CloudWatchAlarmTemplateGroupIds?: string[];
  CreatedAt?: Date;
  Description?: string;
  DiscoveryEntryPointArn?: string;
  ErrorMessage?: string;
  EventBridgeRuleTemplateGroupIds?: string[];
  FailedMediaResourceMap?: {
    [key: string]:
      | (MediaResource & {
          Destinations: (MediaResourceNeighbor & { Arn: __stringMin1Max2048PatternArn })[];
          Sources: (MediaResourceNeighbor & { Arn: __stringMin1Max2048PatternArn })[];
        })
      | undefined;
  };
  Id?: string;
  LastDiscoveredAt?: Date;
  LastSuccessfulMonitorDeployment?: SuccessfulMonitorDeployment & {
    DetailsUri: __stringMin1Max2048;
    Status: SignalMapMonitorDeploymentStatus;
  };
  MediaResourceMap?: {
    [key: string]:
      | (MediaResource & {
          Destinations: (MediaResourceNeighbor & { Arn: __stringMin1Max2048PatternArn })[];
          Sources: (MediaResourceNeighbor & { Arn: __stringMin1Max2048PatternArn })[];
        })
      | undefined;
  };
  ModifiedAt?: Date;
  MonitorChangesPendingDeployment?: boolean;
  MonitorDeployment?: MonitorDeployment & { Status: SignalMapMonitorDeploymentStatus };
  Name?: string;
  Status?: SignalMapStatus;
  Tags?: { [key: string]: string | undefined };
}
export interface StopChannelRequest {
  ChannelId: string;
}
export interface StopChannelResponse {
  Arn?: string;
  CdiInputSpecification?: CdiInputSpecification;
  ChannelClass?: ChannelClass;
  Destinations?: OutputDestination[];
  EgressEndpoints?: ChannelEgressEndpoint[];
  EncoderSettings?: EncoderSettings & {
    AudioDescriptions: (AudioDescription & {
      AudioSelectorName: string;
      Name: __stringMax255;
      AudioWatermarkingSettings: AudioWatermarkSettings & {
        NielsenWatermarksSettings: NielsenWatermarksSettings & {
          NielsenCbetSettings: NielsenCBET & {
            CbetCheckDigitString: __stringMin2Max2;
            CbetStepaside: NielsenWatermarksCbetStepaside;
            Csid: __stringMin1Max7;
          };
          NielsenNaesIiNwSettings: NielsenNaesIiNw & {
            CheckDigitString: __stringMin2Max2;
            Sid: __doubleMin1Max65535;
          };
          NielsenNwOnlySettings: NielsenNwOnly & {
            CheckDigitString: __stringMin2Max2;
            Sid: __doubleMin1Max65535;
          };
        };
      };
      RemixSettings: RemixSettings & {
        ChannelMappings: (AudioChannelMapping & {
          InputChannelLevels: (InputChannelLevel & {
            Gain: __integerMinNegative60Max6;
            InputChannel: __integerMin0Max15;
          })[];
          OutputChannel: __integerMin0Max7;
        })[];
      };
    })[];
    OutputGroups: (OutputGroup & {
      OutputGroupSettings: OutputGroupSettings & {
        ArchiveGroupSettings: ArchiveGroupSettings & { Destination: OutputLocationRef };
        FrameCaptureGroupSettings: FrameCaptureGroupSettings & { Destination: OutputLocationRef };
        HlsGroupSettings: HlsGroupSettings & {
          Destination: OutputLocationRef;
          CaptionLanguageMappings: (CaptionLanguageMapping & {
            CaptionChannel: __integerMin1Max4;
            LanguageCode: __stringMin3Max3;
            LanguageDescription: __stringMin1;
          })[];
          KeyProviderSettings: KeyProviderSettings & {
            StaticKeySettings: StaticKeySettings & {
              StaticKeyValue: __stringMin32Max32;
              KeyProviderServer: InputLocation & { Uri: __stringMax2048 };
            };
          };
        };
        MediaPackageGroupSettings: MediaPackageGroupSettings & {
          Destination: OutputLocationRef;
          MediapackageV2GroupSettings: MediaPackageV2GroupSettings & {
            CaptionLanguageMappings: (CaptionLanguageMapping & {
              CaptionChannel: __integerMin1Max4;
              LanguageCode: __stringMin3Max3;
              LanguageDescription: __stringMin1;
            })[];
            AdditionalDestinations: (MediaPackageAdditionalDestinations & {
              Destination: OutputLocationRef;
            })[];
            WatermarkingSettings: MediaPackageV2WatermarkingSettings & {
              MediaPackageV2AbWatermarkerIrdetoSettings: MediaPackageV2AbWatermarkerIrdetoSettings & {
                AlternateDestination: OutputLocationRef;
                OperatorId: __integerMin1Max511;
                Profile: AbWatermarkingProfile;
                CustomProfile: AbWatermarkingCustomProfile & {
                  EmbeddingFrequency: __doubleMin250Max5000;
                  SceneCut: __doubleMinNegative1Max5;
                  TargetPsnr: __doubleMin32Max46;
                };
              };
            };
          };
        };
        MsSmoothGroupSettings: MsSmoothGroupSettings & { Destination: OutputLocationRef };
        CmafIngestGroupSettings: CmafIngestGroupSettings & {
          Destination: OutputLocationRef;
          CaptionLanguageMappings: (CmafIngestCaptionLanguageMapping & {
            CaptionChannel: __integerMin1Max4;
            LanguageCode: __stringMin3Max3;
          })[];
          AdditionalDestinations: (AdditionalDestinations & { Destination: OutputLocationRef })[];
          WatermarkingSettings: CmafIngestWatermarkingSettings & {
            CmafIngestAbWatermarkerIrdetoSettings: CmafIngestAbWatermarkerIrdetoSettings & {
              AlternateDestination: OutputLocationRef;
              OperatorId: __integerMin1Max511;
              Profile: AbWatermarkingProfile;
              CustomProfile: AbWatermarkingCustomProfile & {
                EmbeddingFrequency: __doubleMin250Max5000;
                SceneCut: __doubleMinNegative1Max5;
                TargetPsnr: __doubleMin32Max46;
              };
            };
          };
        };
      };
      Outputs: (Output & {
        OutputSettings: OutputSettings & {
          ArchiveOutputSettings: ArchiveOutputSettings & {
            ContainerSettings: ArchiveContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
          };
          HlsOutputSettings: HlsOutputSettings & {
            HlsSettings: HlsSettings & {
              AudioOnlyHlsSettings: AudioOnlyHlsSettings & {
                AudioOnlyImage: InputLocation & { Uri: __stringMax2048 };
              };
              StandardHlsSettings: StandardHlsSettings & { M3u8Settings: M3u8Settings };
            };
          };
          MultiplexOutputSettings: MultiplexOutputSettings & { Destination: OutputLocationRef };
          RtmpOutputSettings: RtmpOutputSettings & { Destination: OutputLocationRef };
          UdpOutputSettings: UdpOutputSettings & {
            ContainerSettings: UdpContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
          SrtOutputSettings: SrtOutputSettings & {
            ContainerSettings: UdpContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
          MediaConnectRouterOutputSettings: MediaConnectRouterOutputSettings & {
            ContainerSettings: MediaConnectRouterContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
        };
      })[];
    })[];
    TimecodeConfig: TimecodeConfig & { Source: TimecodeConfigSource };
    VideoDescriptions: (VideoDescription & {
      Name: string;
      CodecSettings: VideoCodecSettings & {
        FrameCaptureSettings: FrameCaptureSettings & {
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        H264Settings: H264Settings & {
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        H265Settings: H265Settings & {
          FramerateDenominator: __integerMin1Max3003;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        Mpeg2Settings: Mpeg2Settings & {
          FramerateDenominator: __integerMin1;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        Av1Settings: Av1Settings & {
          FramerateDenominator: __integerMin1Max3003;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
      };
      CropRectangle: VideoPositionRectangle & {
        Height: __integerMin2Max8192;
        Width: __integerMin2Max8192;
        X: __integerMin0Max8190;
        Y: __integerMin0Max8190;
      };
      OutputPositionRectangle: VideoPositionRectangle & {
        Height: __integerMin2Max8192;
        Width: __integerMin2Max8192;
        X: __integerMin0Max8190;
        Y: __integerMin0Max8190;
      };
    })[];
    AvailBlanking: AvailBlanking & { AvailBlankingImage: InputLocation & { Uri: __stringMax2048 } };
    AvailConfiguration: AvailConfiguration & {
      AvailSettings: AvailSettings & {
        Esam: Esam & { AcquisitionPointId: __stringMax256; PoisEndpoint: __stringMax2048 };
      };
    };
    BlackoutSlate: BlackoutSlate & {
      BlackoutSlateImage: InputLocation & { Uri: __stringMax2048 };
      NetworkEndBlackoutImage: InputLocation & { Uri: __stringMax2048 };
    };
    CaptionDescriptions: (CaptionDescription & {
      CaptionSelectorName: string;
      Name: string;
      DestinationSettings: CaptionDestinationSettings & {
        BurnInDestinationSettings: BurnInDestinationSettings & {
          Font: InputLocation & { Uri: __stringMax2048 };
        };
        DvbSubDestinationSettings: DvbSubDestinationSettings & {
          Font: InputLocation & { Uri: __stringMax2048 };
        };
      };
    })[];
    GlobalConfiguration: GlobalConfiguration & {
      InputLossBehavior: InputLossBehavior & {
        InputLossImageSlate: InputLocation & { Uri: __stringMax2048 };
      };
    };
    MotionGraphicsConfiguration: MotionGraphicsConfiguration & {
      MotionGraphicsSettings: MotionGraphicsSettings;
    };
    ThumbnailConfiguration: ThumbnailConfiguration & { State: ThumbnailState };
    ColorCorrectionSettings: ColorCorrectionSettings & {
      GlobalColorCorrections: (ColorCorrection & {
        InputColorSpace: ColorSpace;
        OutputColorSpace: ColorSpace;
        Uri: string;
      })[];
    };
  };
  Id?: string;
  InputAttachments?: (InputAttachment & {
    AutomaticInputFailoverSettings: AutomaticInputFailoverSettings & {
      SecondaryInputId: string;
      FailoverConditions: (FailoverCondition & {
        FailoverConditionSettings: FailoverConditionSettings & {
          AudioSilenceSettings: AudioSilenceFailoverSettings & { AudioSelectorName: string };
        };
      })[];
    };
    InputSettings: InputSettings & {
      AudioSelectors: (AudioSelector & {
        Name: __stringMin1;
        SelectorSettings: AudioSelectorSettings & {
          AudioHlsRenditionSelection: AudioHlsRenditionSelection & {
            GroupId: __stringMin1;
            Name: __stringMin1;
          };
          AudioLanguageSelection: AudioLanguageSelection & { LanguageCode: string };
          AudioPidSelection: AudioPidSelection & {
            Pid: __integerMin0Max8191;
            Pids: (AudioPid & {
              Pid: __integerMin0Max8191;
              DolbyEDecode: AudioDolbyEDecode & { ProgramSelection: DolbyEProgramSelection };
              PremixSettings: AudioPreMixerSettings & {
                RemixSettings: RemixSettings & {
                  ChannelMappings: (AudioChannelMapping & {
                    InputChannelLevels: (InputChannelLevel & {
                      Gain: __integerMinNegative60Max6;
                      InputChannel: __integerMin0Max15;
                    })[];
                    OutputChannel: __integerMin0Max7;
                  })[];
                };
              };
            })[];
          };
          AudioTrackSelection: AudioTrackSelection & {
            Tracks: (AudioTrack & {
              Track: __integerMin1;
              PremixSettings: AudioPreMixerSettings & {
                RemixSettings: RemixSettings & {
                  ChannelMappings: (AudioChannelMapping & {
                    InputChannelLevels: (InputChannelLevel & {
                      Gain: __integerMinNegative60Max6;
                      InputChannel: __integerMin0Max15;
                    })[];
                    OutputChannel: __integerMin0Max7;
                  })[];
                };
              };
            })[];
            DolbyEDecode: AudioDolbyEDecode & { ProgramSelection: DolbyEProgramSelection };
          };
        };
      })[];
      CaptionSelectors: (CaptionSelector & {
        Name: __stringMin1;
        SelectorSettings: CaptionSelectorSettings & {
          TeletextSourceSettings: TeletextSourceSettings & {
            OutputRectangle: CaptionRectangle & {
              Height: __doubleMin0Max100;
              LeftOffset: __doubleMin0Max100;
              TopOffset: __doubleMin0Max100;
              Width: __doubleMin0Max100;
            };
          };
        };
      })[];
    };
  })[];
  InputSpecification?: InputSpecification;
  LogLevel?: LogLevel;
  Maintenance?: MaintenanceStatus;
  Name?: string;
  PipelineDetails?: PipelineDetail[];
  PipelinesRunningCount?: number;
  RoleArn?: string;
  State?: ChannelState;
  Tags?: { [key: string]: string | undefined };
  Vpc?: VpcOutputSettingsDescription;
  AnywhereSettings?: DescribeAnywhereSettings;
  ChannelEngineVersion?: ChannelEngineVersionResponse;
  LinkedChannelSettings?: DescribeLinkedChannelSettings;
  ChannelSecurityGroups?: string[];
  InferenceSettings?: DescribeInferenceSettings;
}
export interface StopInputDeviceRequest {
  InputDeviceId: string;
}
export interface StopInputDeviceResponse {}
export interface StopMultiplexRequest {
  MultiplexId: string;
}
export interface StopMultiplexResponse {
  Arn?: string;
  AvailabilityZones?: string[];
  Destinations?: MultiplexOutputDestination[];
  Id?: string;
  MultiplexSettings?: MultiplexSettings & {
    TransportStreamBitrate: __integerMin1000000Max100000000;
    TransportStreamId: __integerMin0Max65535;
  };
  Name?: string;
  PipelinesRunningCount?: number;
  ProgramCount?: number;
  State?: MultiplexState;
  Tags?: { [key: string]: string | undefined };
}
export interface TransferInputDeviceRequest {
  InputDeviceId: string;
  TargetCustomerId?: string;
  TargetRegion?: string;
  TransferMessage?: string;
}
export interface TransferInputDeviceResponse {}
export interface UpdateAccountConfigurationRequest {
  AccountConfiguration?: AccountConfiguration;
}
export interface UpdateAccountConfigurationResponse {
  AccountConfiguration?: AccountConfiguration;
}
export interface MaintenanceUpdateSettings {
  MaintenanceDay?: MaintenanceDay;
  MaintenanceScheduledDate?: string;
  MaintenanceStartTime?: string;
}
export interface SpecialRouterSettings {
  RouterArn?: string;
}
export interface UpdateChannelRequest {
  CdiInputSpecification?: CdiInputSpecification;
  ChannelId: string;
  Destinations?: OutputDestination[];
  EncoderSettings?: EncoderSettings;
  InputAttachments?: InputAttachment[];
  InputSpecification?: InputSpecification;
  LogLevel?: LogLevel;
  Maintenance?: MaintenanceUpdateSettings;
  Name?: string;
  RoleArn?: string;
  ChannelEngineVersion?: ChannelEngineVersionRequest;
  DryRun?: boolean;
  AnywhereSettings?: AnywhereSettings;
  LinkedChannelSettings?: LinkedChannelSettings;
  ChannelSecurityGroups?: string[];
  InferenceSettings?: InferenceSettings;
  SpecialRouterSettings?: SpecialRouterSettings;
}
export interface UpdateChannelResponse {
  Channel?: Channel & {
    EncoderSettings: EncoderSettings & {
      AudioDescriptions: (AudioDescription & {
        AudioSelectorName: string;
        Name: __stringMax255;
        AudioWatermarkingSettings: AudioWatermarkSettings & {
          NielsenWatermarksSettings: NielsenWatermarksSettings & {
            NielsenCbetSettings: NielsenCBET & {
              CbetCheckDigitString: __stringMin2Max2;
              CbetStepaside: NielsenWatermarksCbetStepaside;
              Csid: __stringMin1Max7;
            };
            NielsenNaesIiNwSettings: NielsenNaesIiNw & {
              CheckDigitString: __stringMin2Max2;
              Sid: __doubleMin1Max65535;
            };
            NielsenNwOnlySettings: NielsenNwOnly & {
              CheckDigitString: __stringMin2Max2;
              Sid: __doubleMin1Max65535;
            };
          };
        };
        RemixSettings: RemixSettings & {
          ChannelMappings: (AudioChannelMapping & {
            InputChannelLevels: (InputChannelLevel & {
              Gain: __integerMinNegative60Max6;
              InputChannel: __integerMin0Max15;
            })[];
            OutputChannel: __integerMin0Max7;
          })[];
        };
      })[];
      OutputGroups: (OutputGroup & {
        OutputGroupSettings: OutputGroupSettings & {
          ArchiveGroupSettings: ArchiveGroupSettings & { Destination: OutputLocationRef };
          FrameCaptureGroupSettings: FrameCaptureGroupSettings & { Destination: OutputLocationRef };
          HlsGroupSettings: HlsGroupSettings & {
            Destination: OutputLocationRef;
            CaptionLanguageMappings: (CaptionLanguageMapping & {
              CaptionChannel: __integerMin1Max4;
              LanguageCode: __stringMin3Max3;
              LanguageDescription: __stringMin1;
            })[];
            KeyProviderSettings: KeyProviderSettings & {
              StaticKeySettings: StaticKeySettings & {
                StaticKeyValue: __stringMin32Max32;
                KeyProviderServer: InputLocation & { Uri: __stringMax2048 };
              };
            };
          };
          MediaPackageGroupSettings: MediaPackageGroupSettings & {
            Destination: OutputLocationRef;
            MediapackageV2GroupSettings: MediaPackageV2GroupSettings & {
              CaptionLanguageMappings: (CaptionLanguageMapping & {
                CaptionChannel: __integerMin1Max4;
                LanguageCode: __stringMin3Max3;
                LanguageDescription: __stringMin1;
              })[];
              AdditionalDestinations: (MediaPackageAdditionalDestinations & {
                Destination: OutputLocationRef;
              })[];
              WatermarkingSettings: MediaPackageV2WatermarkingSettings & {
                MediaPackageV2AbWatermarkerIrdetoSettings: MediaPackageV2AbWatermarkerIrdetoSettings & {
                  AlternateDestination: OutputLocationRef;
                  OperatorId: __integerMin1Max511;
                  Profile: AbWatermarkingProfile;
                  CustomProfile: AbWatermarkingCustomProfile & {
                    EmbeddingFrequency: __doubleMin250Max5000;
                    SceneCut: __doubleMinNegative1Max5;
                    TargetPsnr: __doubleMin32Max46;
                  };
                };
              };
            };
          };
          MsSmoothGroupSettings: MsSmoothGroupSettings & { Destination: OutputLocationRef };
          CmafIngestGroupSettings: CmafIngestGroupSettings & {
            Destination: OutputLocationRef;
            CaptionLanguageMappings: (CmafIngestCaptionLanguageMapping & {
              CaptionChannel: __integerMin1Max4;
              LanguageCode: __stringMin3Max3;
            })[];
            AdditionalDestinations: (AdditionalDestinations & { Destination: OutputLocationRef })[];
            WatermarkingSettings: CmafIngestWatermarkingSettings & {
              CmafIngestAbWatermarkerIrdetoSettings: CmafIngestAbWatermarkerIrdetoSettings & {
                AlternateDestination: OutputLocationRef;
                OperatorId: __integerMin1Max511;
                Profile: AbWatermarkingProfile;
                CustomProfile: AbWatermarkingCustomProfile & {
                  EmbeddingFrequency: __doubleMin250Max5000;
                  SceneCut: __doubleMinNegative1Max5;
                  TargetPsnr: __doubleMin32Max46;
                };
              };
            };
          };
        };
        Outputs: (Output & {
          OutputSettings: OutputSettings & {
            ArchiveOutputSettings: ArchiveOutputSettings & {
              ContainerSettings: ArchiveContainerSettings & {
                M2tsSettings: M2tsSettings & {
                  DvbNitSettings: DvbNitSettings & {
                    NetworkId: __integerMin0Max65536;
                    NetworkName: __stringMin1Max256;
                  };
                };
              };
            };
            HlsOutputSettings: HlsOutputSettings & {
              HlsSettings: HlsSettings & {
                AudioOnlyHlsSettings: AudioOnlyHlsSettings & {
                  AudioOnlyImage: InputLocation & { Uri: __stringMax2048 };
                };
                StandardHlsSettings: StandardHlsSettings & { M3u8Settings: M3u8Settings };
              };
            };
            MultiplexOutputSettings: MultiplexOutputSettings & { Destination: OutputLocationRef };
            RtmpOutputSettings: RtmpOutputSettings & { Destination: OutputLocationRef };
            UdpOutputSettings: UdpOutputSettings & {
              ContainerSettings: UdpContainerSettings & {
                M2tsSettings: M2tsSettings & {
                  DvbNitSettings: DvbNitSettings & {
                    NetworkId: __integerMin0Max65536;
                    NetworkName: __stringMin1Max256;
                  };
                };
              };
              Destination: OutputLocationRef;
            };
            SrtOutputSettings: SrtOutputSettings & {
              ContainerSettings: UdpContainerSettings & {
                M2tsSettings: M2tsSettings & {
                  DvbNitSettings: DvbNitSettings & {
                    NetworkId: __integerMin0Max65536;
                    NetworkName: __stringMin1Max256;
                  };
                };
              };
              Destination: OutputLocationRef;
            };
            MediaConnectRouterOutputSettings: MediaConnectRouterOutputSettings & {
              ContainerSettings: MediaConnectRouterContainerSettings & {
                M2tsSettings: M2tsSettings & {
                  DvbNitSettings: DvbNitSettings & {
                    NetworkId: __integerMin0Max65536;
                    NetworkName: __stringMin1Max256;
                  };
                };
              };
              Destination: OutputLocationRef;
            };
          };
        })[];
      })[];
      TimecodeConfig: TimecodeConfig & { Source: TimecodeConfigSource };
      VideoDescriptions: (VideoDescription & {
        Name: string;
        CodecSettings: VideoCodecSettings & {
          FrameCaptureSettings: FrameCaptureSettings & {
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
          H264Settings: H264Settings & {
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
          H265Settings: H265Settings & {
            FramerateDenominator: __integerMin1Max3003;
            FramerateNumerator: __integerMin1;
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
          Mpeg2Settings: Mpeg2Settings & {
            FramerateDenominator: __integerMin1;
            FramerateNumerator: __integerMin1;
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
          Av1Settings: Av1Settings & {
            FramerateDenominator: __integerMin1Max3003;
            FramerateNumerator: __integerMin1;
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
        };
        CropRectangle: VideoPositionRectangle & {
          Height: __integerMin2Max8192;
          Width: __integerMin2Max8192;
          X: __integerMin0Max8190;
          Y: __integerMin0Max8190;
        };
        OutputPositionRectangle: VideoPositionRectangle & {
          Height: __integerMin2Max8192;
          Width: __integerMin2Max8192;
          X: __integerMin0Max8190;
          Y: __integerMin0Max8190;
        };
      })[];
      AvailBlanking: AvailBlanking & {
        AvailBlankingImage: InputLocation & { Uri: __stringMax2048 };
      };
      AvailConfiguration: AvailConfiguration & {
        AvailSettings: AvailSettings & {
          Esam: Esam & { AcquisitionPointId: __stringMax256; PoisEndpoint: __stringMax2048 };
        };
      };
      BlackoutSlate: BlackoutSlate & {
        BlackoutSlateImage: InputLocation & { Uri: __stringMax2048 };
        NetworkEndBlackoutImage: InputLocation & { Uri: __stringMax2048 };
      };
      CaptionDescriptions: (CaptionDescription & {
        CaptionSelectorName: string;
        Name: string;
        DestinationSettings: CaptionDestinationSettings & {
          BurnInDestinationSettings: BurnInDestinationSettings & {
            Font: InputLocation & { Uri: __stringMax2048 };
          };
          DvbSubDestinationSettings: DvbSubDestinationSettings & {
            Font: InputLocation & { Uri: __stringMax2048 };
          };
        };
      })[];
      GlobalConfiguration: GlobalConfiguration & {
        InputLossBehavior: InputLossBehavior & {
          InputLossImageSlate: InputLocation & { Uri: __stringMax2048 };
        };
      };
      MotionGraphicsConfiguration: MotionGraphicsConfiguration & {
        MotionGraphicsSettings: MotionGraphicsSettings;
      };
      ThumbnailConfiguration: ThumbnailConfiguration & { State: ThumbnailState };
      ColorCorrectionSettings: ColorCorrectionSettings & {
        GlobalColorCorrections: (ColorCorrection & {
          InputColorSpace: ColorSpace;
          OutputColorSpace: ColorSpace;
          Uri: string;
        })[];
      };
    };
    InputAttachments: (InputAttachment & {
      AutomaticInputFailoverSettings: AutomaticInputFailoverSettings & {
        SecondaryInputId: string;
        FailoverConditions: (FailoverCondition & {
          FailoverConditionSettings: FailoverConditionSettings & {
            AudioSilenceSettings: AudioSilenceFailoverSettings & { AudioSelectorName: string };
          };
        })[];
      };
      InputSettings: InputSettings & {
        AudioSelectors: (AudioSelector & {
          Name: __stringMin1;
          SelectorSettings: AudioSelectorSettings & {
            AudioHlsRenditionSelection: AudioHlsRenditionSelection & {
              GroupId: __stringMin1;
              Name: __stringMin1;
            };
            AudioLanguageSelection: AudioLanguageSelection & { LanguageCode: string };
            AudioPidSelection: AudioPidSelection & {
              Pid: __integerMin0Max8191;
              Pids: (AudioPid & {
                Pid: __integerMin0Max8191;
                DolbyEDecode: AudioDolbyEDecode & { ProgramSelection: DolbyEProgramSelection };
                PremixSettings: AudioPreMixerSettings & {
                  RemixSettings: RemixSettings & {
                    ChannelMappings: (AudioChannelMapping & {
                      InputChannelLevels: (InputChannelLevel & {
                        Gain: __integerMinNegative60Max6;
                        InputChannel: __integerMin0Max15;
                      })[];
                      OutputChannel: __integerMin0Max7;
                    })[];
                  };
                };
              })[];
            };
            AudioTrackSelection: AudioTrackSelection & {
              Tracks: (AudioTrack & {
                Track: __integerMin1;
                PremixSettings: AudioPreMixerSettings & {
                  RemixSettings: RemixSettings & {
                    ChannelMappings: (AudioChannelMapping & {
                      InputChannelLevels: (InputChannelLevel & {
                        Gain: __integerMinNegative60Max6;
                        InputChannel: __integerMin0Max15;
                      })[];
                      OutputChannel: __integerMin0Max7;
                    })[];
                  };
                };
              })[];
              DolbyEDecode: AudioDolbyEDecode & { ProgramSelection: DolbyEProgramSelection };
            };
          };
        })[];
        CaptionSelectors: (CaptionSelector & {
          Name: __stringMin1;
          SelectorSettings: CaptionSelectorSettings & {
            TeletextSourceSettings: TeletextSourceSettings & {
              OutputRectangle: CaptionRectangle & {
                Height: __doubleMin0Max100;
                LeftOffset: __doubleMin0Max100;
                TopOffset: __doubleMin0Max100;
                Width: __doubleMin0Max100;
              };
            };
          };
        })[];
      };
    })[];
  };
}
export interface UpdateChannelClassRequest {
  ChannelClass?: ChannelClass;
  ChannelId: string;
  Destinations?: OutputDestination[];
}
export interface UpdateChannelClassResponse {
  Channel?: Channel & {
    EncoderSettings: EncoderSettings & {
      AudioDescriptions: (AudioDescription & {
        AudioSelectorName: string;
        Name: __stringMax255;
        AudioWatermarkingSettings: AudioWatermarkSettings & {
          NielsenWatermarksSettings: NielsenWatermarksSettings & {
            NielsenCbetSettings: NielsenCBET & {
              CbetCheckDigitString: __stringMin2Max2;
              CbetStepaside: NielsenWatermarksCbetStepaside;
              Csid: __stringMin1Max7;
            };
            NielsenNaesIiNwSettings: NielsenNaesIiNw & {
              CheckDigitString: __stringMin2Max2;
              Sid: __doubleMin1Max65535;
            };
            NielsenNwOnlySettings: NielsenNwOnly & {
              CheckDigitString: __stringMin2Max2;
              Sid: __doubleMin1Max65535;
            };
          };
        };
        RemixSettings: RemixSettings & {
          ChannelMappings: (AudioChannelMapping & {
            InputChannelLevels: (InputChannelLevel & {
              Gain: __integerMinNegative60Max6;
              InputChannel: __integerMin0Max15;
            })[];
            OutputChannel: __integerMin0Max7;
          })[];
        };
      })[];
      OutputGroups: (OutputGroup & {
        OutputGroupSettings: OutputGroupSettings & {
          ArchiveGroupSettings: ArchiveGroupSettings & { Destination: OutputLocationRef };
          FrameCaptureGroupSettings: FrameCaptureGroupSettings & { Destination: OutputLocationRef };
          HlsGroupSettings: HlsGroupSettings & {
            Destination: OutputLocationRef;
            CaptionLanguageMappings: (CaptionLanguageMapping & {
              CaptionChannel: __integerMin1Max4;
              LanguageCode: __stringMin3Max3;
              LanguageDescription: __stringMin1;
            })[];
            KeyProviderSettings: KeyProviderSettings & {
              StaticKeySettings: StaticKeySettings & {
                StaticKeyValue: __stringMin32Max32;
                KeyProviderServer: InputLocation & { Uri: __stringMax2048 };
              };
            };
          };
          MediaPackageGroupSettings: MediaPackageGroupSettings & {
            Destination: OutputLocationRef;
            MediapackageV2GroupSettings: MediaPackageV2GroupSettings & {
              CaptionLanguageMappings: (CaptionLanguageMapping & {
                CaptionChannel: __integerMin1Max4;
                LanguageCode: __stringMin3Max3;
                LanguageDescription: __stringMin1;
              })[];
              AdditionalDestinations: (MediaPackageAdditionalDestinations & {
                Destination: OutputLocationRef;
              })[];
              WatermarkingSettings: MediaPackageV2WatermarkingSettings & {
                MediaPackageV2AbWatermarkerIrdetoSettings: MediaPackageV2AbWatermarkerIrdetoSettings & {
                  AlternateDestination: OutputLocationRef;
                  OperatorId: __integerMin1Max511;
                  Profile: AbWatermarkingProfile;
                  CustomProfile: AbWatermarkingCustomProfile & {
                    EmbeddingFrequency: __doubleMin250Max5000;
                    SceneCut: __doubleMinNegative1Max5;
                    TargetPsnr: __doubleMin32Max46;
                  };
                };
              };
            };
          };
          MsSmoothGroupSettings: MsSmoothGroupSettings & { Destination: OutputLocationRef };
          CmafIngestGroupSettings: CmafIngestGroupSettings & {
            Destination: OutputLocationRef;
            CaptionLanguageMappings: (CmafIngestCaptionLanguageMapping & {
              CaptionChannel: __integerMin1Max4;
              LanguageCode: __stringMin3Max3;
            })[];
            AdditionalDestinations: (AdditionalDestinations & { Destination: OutputLocationRef })[];
            WatermarkingSettings: CmafIngestWatermarkingSettings & {
              CmafIngestAbWatermarkerIrdetoSettings: CmafIngestAbWatermarkerIrdetoSettings & {
                AlternateDestination: OutputLocationRef;
                OperatorId: __integerMin1Max511;
                Profile: AbWatermarkingProfile;
                CustomProfile: AbWatermarkingCustomProfile & {
                  EmbeddingFrequency: __doubleMin250Max5000;
                  SceneCut: __doubleMinNegative1Max5;
                  TargetPsnr: __doubleMin32Max46;
                };
              };
            };
          };
        };
        Outputs: (Output & {
          OutputSettings: OutputSettings & {
            ArchiveOutputSettings: ArchiveOutputSettings & {
              ContainerSettings: ArchiveContainerSettings & {
                M2tsSettings: M2tsSettings & {
                  DvbNitSettings: DvbNitSettings & {
                    NetworkId: __integerMin0Max65536;
                    NetworkName: __stringMin1Max256;
                  };
                };
              };
            };
            HlsOutputSettings: HlsOutputSettings & {
              HlsSettings: HlsSettings & {
                AudioOnlyHlsSettings: AudioOnlyHlsSettings & {
                  AudioOnlyImage: InputLocation & { Uri: __stringMax2048 };
                };
                StandardHlsSettings: StandardHlsSettings & { M3u8Settings: M3u8Settings };
              };
            };
            MultiplexOutputSettings: MultiplexOutputSettings & { Destination: OutputLocationRef };
            RtmpOutputSettings: RtmpOutputSettings & { Destination: OutputLocationRef };
            UdpOutputSettings: UdpOutputSettings & {
              ContainerSettings: UdpContainerSettings & {
                M2tsSettings: M2tsSettings & {
                  DvbNitSettings: DvbNitSettings & {
                    NetworkId: __integerMin0Max65536;
                    NetworkName: __stringMin1Max256;
                  };
                };
              };
              Destination: OutputLocationRef;
            };
            SrtOutputSettings: SrtOutputSettings & {
              ContainerSettings: UdpContainerSettings & {
                M2tsSettings: M2tsSettings & {
                  DvbNitSettings: DvbNitSettings & {
                    NetworkId: __integerMin0Max65536;
                    NetworkName: __stringMin1Max256;
                  };
                };
              };
              Destination: OutputLocationRef;
            };
            MediaConnectRouterOutputSettings: MediaConnectRouterOutputSettings & {
              ContainerSettings: MediaConnectRouterContainerSettings & {
                M2tsSettings: M2tsSettings & {
                  DvbNitSettings: DvbNitSettings & {
                    NetworkId: __integerMin0Max65536;
                    NetworkName: __stringMin1Max256;
                  };
                };
              };
              Destination: OutputLocationRef;
            };
          };
        })[];
      })[];
      TimecodeConfig: TimecodeConfig & { Source: TimecodeConfigSource };
      VideoDescriptions: (VideoDescription & {
        Name: string;
        CodecSettings: VideoCodecSettings & {
          FrameCaptureSettings: FrameCaptureSettings & {
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
          H264Settings: H264Settings & {
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
          H265Settings: H265Settings & {
            FramerateDenominator: __integerMin1Max3003;
            FramerateNumerator: __integerMin1;
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
          Mpeg2Settings: Mpeg2Settings & {
            FramerateDenominator: __integerMin1;
            FramerateNumerator: __integerMin1;
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
          Av1Settings: Av1Settings & {
            FramerateDenominator: __integerMin1Max3003;
            FramerateNumerator: __integerMin1;
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
        };
        CropRectangle: VideoPositionRectangle & {
          Height: __integerMin2Max8192;
          Width: __integerMin2Max8192;
          X: __integerMin0Max8190;
          Y: __integerMin0Max8190;
        };
        OutputPositionRectangle: VideoPositionRectangle & {
          Height: __integerMin2Max8192;
          Width: __integerMin2Max8192;
          X: __integerMin0Max8190;
          Y: __integerMin0Max8190;
        };
      })[];
      AvailBlanking: AvailBlanking & {
        AvailBlankingImage: InputLocation & { Uri: __stringMax2048 };
      };
      AvailConfiguration: AvailConfiguration & {
        AvailSettings: AvailSettings & {
          Esam: Esam & { AcquisitionPointId: __stringMax256; PoisEndpoint: __stringMax2048 };
        };
      };
      BlackoutSlate: BlackoutSlate & {
        BlackoutSlateImage: InputLocation & { Uri: __stringMax2048 };
        NetworkEndBlackoutImage: InputLocation & { Uri: __stringMax2048 };
      };
      CaptionDescriptions: (CaptionDescription & {
        CaptionSelectorName: string;
        Name: string;
        DestinationSettings: CaptionDestinationSettings & {
          BurnInDestinationSettings: BurnInDestinationSettings & {
            Font: InputLocation & { Uri: __stringMax2048 };
          };
          DvbSubDestinationSettings: DvbSubDestinationSettings & {
            Font: InputLocation & { Uri: __stringMax2048 };
          };
        };
      })[];
      GlobalConfiguration: GlobalConfiguration & {
        InputLossBehavior: InputLossBehavior & {
          InputLossImageSlate: InputLocation & { Uri: __stringMax2048 };
        };
      };
      MotionGraphicsConfiguration: MotionGraphicsConfiguration & {
        MotionGraphicsSettings: MotionGraphicsSettings;
      };
      ThumbnailConfiguration: ThumbnailConfiguration & { State: ThumbnailState };
      ColorCorrectionSettings: ColorCorrectionSettings & {
        GlobalColorCorrections: (ColorCorrection & {
          InputColorSpace: ColorSpace;
          OutputColorSpace: ColorSpace;
          Uri: string;
        })[];
      };
    };
    InputAttachments: (InputAttachment & {
      AutomaticInputFailoverSettings: AutomaticInputFailoverSettings & {
        SecondaryInputId: string;
        FailoverConditions: (FailoverCondition & {
          FailoverConditionSettings: FailoverConditionSettings & {
            AudioSilenceSettings: AudioSilenceFailoverSettings & { AudioSelectorName: string };
          };
        })[];
      };
      InputSettings: InputSettings & {
        AudioSelectors: (AudioSelector & {
          Name: __stringMin1;
          SelectorSettings: AudioSelectorSettings & {
            AudioHlsRenditionSelection: AudioHlsRenditionSelection & {
              GroupId: __stringMin1;
              Name: __stringMin1;
            };
            AudioLanguageSelection: AudioLanguageSelection & { LanguageCode: string };
            AudioPidSelection: AudioPidSelection & {
              Pid: __integerMin0Max8191;
              Pids: (AudioPid & {
                Pid: __integerMin0Max8191;
                DolbyEDecode: AudioDolbyEDecode & { ProgramSelection: DolbyEProgramSelection };
                PremixSettings: AudioPreMixerSettings & {
                  RemixSettings: RemixSettings & {
                    ChannelMappings: (AudioChannelMapping & {
                      InputChannelLevels: (InputChannelLevel & {
                        Gain: __integerMinNegative60Max6;
                        InputChannel: __integerMin0Max15;
                      })[];
                      OutputChannel: __integerMin0Max7;
                    })[];
                  };
                };
              })[];
            };
            AudioTrackSelection: AudioTrackSelection & {
              Tracks: (AudioTrack & {
                Track: __integerMin1;
                PremixSettings: AudioPreMixerSettings & {
                  RemixSettings: RemixSettings & {
                    ChannelMappings: (AudioChannelMapping & {
                      InputChannelLevels: (InputChannelLevel & {
                        Gain: __integerMinNegative60Max6;
                        InputChannel: __integerMin0Max15;
                      })[];
                      OutputChannel: __integerMin0Max7;
                    })[];
                  };
                };
              })[];
              DolbyEDecode: AudioDolbyEDecode & { ProgramSelection: DolbyEProgramSelection };
            };
          };
        })[];
        CaptionSelectors: (CaptionSelector & {
          Name: __stringMin1;
          SelectorSettings: CaptionSelectorSettings & {
            TeletextSourceSettings: TeletextSourceSettings & {
              OutputRectangle: CaptionRectangle & {
                Height: __doubleMin0Max100;
                LeftOffset: __doubleMin0Max100;
                TopOffset: __doubleMin0Max100;
                Width: __doubleMin0Max100;
              };
            };
          };
        })[];
      };
    })[];
  };
}
export interface UpdateChannelPlacementGroupRequest {
  ChannelPlacementGroupId: string;
  ClusterId: string;
  Name?: string;
  Nodes?: string[];
}
export interface UpdateChannelPlacementGroupResponse {
  Arn?: string;
  Channels?: string[];
  ClusterId?: string;
  Id?: string;
  Name?: string;
  Nodes?: string[];
  State?: ChannelPlacementGroupState;
}
export interface UpdateCloudWatchAlarmTemplateRequest {
  ComparisonOperator?: CloudWatchAlarmTemplateComparisonOperator;
  DatapointsToAlarm?: number;
  Description?: string;
  EvaluationPeriods?: number;
  GroupIdentifier?: string;
  Identifier: string;
  MetricName?: string;
  Name?: string;
  Period?: number;
  Statistic?: CloudWatchAlarmTemplateStatistic;
  TargetResourceType?: CloudWatchAlarmTemplateTargetResourceType;
  Threshold?: number;
  TreatMissingData?: CloudWatchAlarmTemplateTreatMissingData;
}
export interface UpdateCloudWatchAlarmTemplateResponse {
  Arn?: string;
  ComparisonOperator?: CloudWatchAlarmTemplateComparisonOperator;
  CreatedAt?: Date;
  DatapointsToAlarm?: number;
  Description?: string;
  EvaluationPeriods?: number;
  GroupId?: string;
  Id?: string;
  MetricName?: string;
  ModifiedAt?: Date;
  Name?: string;
  Period?: number;
  Statistic?: CloudWatchAlarmTemplateStatistic;
  Tags?: { [key: string]: string | undefined };
  TargetResourceType?: CloudWatchAlarmTemplateTargetResourceType;
  Threshold?: number;
  TreatMissingData?: CloudWatchAlarmTemplateTreatMissingData;
}
export interface UpdateCloudWatchAlarmTemplateGroupRequest {
  Description?: string;
  Identifier: string;
}
export interface UpdateCloudWatchAlarmTemplateGroupResponse {
  Arn?: string;
  CreatedAt?: Date;
  Description?: string;
  Id?: string;
  ModifiedAt?: Date;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface InterfaceMappingUpdateRequest {
  LogicalInterfaceName?: string;
  NetworkId?: string;
}
export type __listOfInterfaceMappingUpdateRequest = InterfaceMappingUpdateRequest[];
export interface ClusterNetworkSettingsUpdateRequest {
  DefaultRoute?: string;
  InterfaceMappings?: InterfaceMappingUpdateRequest[];
}
export interface UpdateClusterRequest {
  ClusterId: string;
  Name?: string;
  NetworkSettings?: ClusterNetworkSettingsUpdateRequest;
}
export interface UpdateClusterResponse {
  Arn?: string;
  ChannelIds?: string[];
  ClusterType?: ClusterType;
  Id?: string;
  Name?: string;
  NetworkSettings?: ClusterNetworkSettings;
  State?: ClusterState;
}
export interface UpdateEventBridgeRuleTemplateRequest {
  Description?: string;
  EventTargets?: EventBridgeRuleTemplateTarget[];
  EventType?: EventBridgeRuleTemplateEventType;
  GroupIdentifier?: string;
  Identifier: string;
  Name?: string;
}
export interface UpdateEventBridgeRuleTemplateResponse {
  Arn?: string;
  CreatedAt?: Date;
  Description?: string;
  EventTargets?: (EventBridgeRuleTemplateTarget & { Arn: __stringMin1Max2048PatternArn })[];
  EventType?: EventBridgeRuleTemplateEventType;
  GroupId?: string;
  Id?: string;
  ModifiedAt?: Date;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface UpdateEventBridgeRuleTemplateGroupRequest {
  Description?: string;
  Identifier: string;
}
export interface UpdateEventBridgeRuleTemplateGroupResponse {
  Arn?: string;
  CreatedAt?: Date;
  Description?: string;
  Id?: string;
  ModifiedAt?: Date;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface InputDeviceRequest {
  Id?: string;
}
export type __listOfInputDeviceRequest = InputDeviceRequest[];
const __listOfInputDeviceRequest =
  __listOfInputDeviceSettings as any as S.Schema<__listOfInputDeviceRequest>;
export interface MulticastSourceUpdateRequest {
  SourceIp?: string;
  Url?: string;
}
export type __listOfMulticastSourceUpdateRequest = MulticastSourceUpdateRequest[];
export interface MulticastSettingsUpdateRequest {
  Sources?: MulticastSourceUpdateRequest[];
}
export interface UpdateInputRequest {
  Destinations?: InputDestinationRequest[];
  InputDevices?: InputDeviceRequest[];
  InputId: string;
  InputSecurityGroups?: string[];
  MediaConnectFlows?: MediaConnectFlowRequest[];
  Name?: string;
  RoleArn?: string;
  Sources?: InputSourceRequest[];
  SrtSettings?: SrtSettingsRequest;
  MulticastSettings?: MulticastSettingsUpdateRequest;
  Smpte2110ReceiverGroupSettings?: Smpte2110ReceiverGroupSettings;
  SdiSources?: string[];
  SpecialRouterSettings?: SpecialRouterSettings;
}
export interface UpdateInputResponse {
  Input?: Input & {
    SrtSettings: SrtSettings & {
      SrtListenerSettings: SrtListenerSettings & {
        Decryption: SrtListenerDecryption & { Algorithm: Algorithm; PassphraseSecretArn: string };
      };
    };
    MulticastSettings: MulticastSettings & { Sources: (MulticastSource & { Url: string })[] };
  };
}
export interface InputDeviceMediaConnectConfigurableSettings {
  FlowArn?: string;
  RoleArn?: string;
  SecretArn?: string;
  SourceName?: string;
}
export type InputDeviceConfigurableAudioChannelPairProfile =
  | "DISABLED"
  | "VBR-AAC_HHE-16000"
  | "VBR-AAC_HE-64000"
  | "VBR-AAC_LC-128000"
  | "CBR-AAC_HQ-192000"
  | "CBR-AAC_HQ-256000"
  | "CBR-AAC_HQ-384000"
  | "CBR-AAC_HQ-512000"
  | (string & {});
export interface InputDeviceConfigurableAudioChannelPairConfig {
  Id?: number;
  Profile?: InputDeviceConfigurableAudioChannelPairProfile;
}
export type __listOfInputDeviceConfigurableAudioChannelPairConfig =
  InputDeviceConfigurableAudioChannelPairConfig[];
const __listOfInputDeviceConfigurableAudioChannelPairConfig =
  __listOfInputDeviceUhdAudioChannelPairConfig as any as S.Schema<__listOfInputDeviceConfigurableAudioChannelPairConfig>;
export interface InputDeviceConfigurableSettings {
  ConfiguredInput?: InputDeviceConfiguredInput;
  MaxBitrate?: number;
  LatencyMs?: number;
  Codec?: InputDeviceCodec;
  MediaconnectSettings?: InputDeviceMediaConnectConfigurableSettings;
  AudioChannelPairs?: InputDeviceConfigurableAudioChannelPairConfig[];
  InputResolution?: string;
}
export interface UpdateInputDeviceRequest {
  HdDeviceSettings?: InputDeviceConfigurableSettings;
  InputDeviceId: string;
  Name?: string;
  UhdDeviceSettings?: InputDeviceConfigurableSettings;
  AvailabilityZone?: string;
}
export interface UpdateInputDeviceResponse {
  Arn?: string;
  ConnectionState?: InputDeviceConnectionState;
  DeviceSettingsSyncState?: DeviceSettingsSyncState;
  DeviceUpdateStatus?: DeviceUpdateStatus;
  HdDeviceSettings?: InputDeviceHdSettings;
  Id?: string;
  MacAddress?: string;
  Name?: string;
  NetworkSettings?: InputDeviceNetworkSettings;
  SerialNumber?: string;
  Type?: InputDeviceType;
  UhdDeviceSettings?: InputDeviceUhdSettings;
  Tags?: { [key: string]: string | undefined };
  AvailabilityZone?: string;
  MedialiveInputArns?: string[];
  OutputType?: InputDeviceOutputType;
}
export interface UpdateInputSecurityGroupRequest {
  InputSecurityGroupId: string;
  Tags?: { [key: string]: string | undefined };
  WhitelistRules?: InputWhitelistRuleCidr[];
}
export interface UpdateInputSecurityGroupResponse {
  SecurityGroup?: InputSecurityGroup;
}
export type MultiplexPacketIdentifiersMapping = {
  [key: string]: MultiplexProgramPacketIdentifiersMap | undefined;
};
export interface UpdateMultiplexRequest {
  MultiplexId: string;
  MultiplexSettings?: MultiplexSettings;
  Name?: string;
  PacketIdentifiersMapping?: { [key: string]: MultiplexProgramPacketIdentifiersMap | undefined };
}
export interface UpdateMultiplexResponse {
  Multiplex?: Multiplex & {
    MultiplexSettings: MultiplexSettings & {
      TransportStreamBitrate: __integerMin1000000Max100000000;
      TransportStreamId: __integerMin0Max65535;
    };
  };
}
export interface UpdateMultiplexProgramRequest {
  MultiplexId: string;
  MultiplexProgramSettings?: MultiplexProgramSettings;
  ProgramName: string;
}
export interface UpdateMultiplexProgramResponse {
  MultiplexProgram?: MultiplexProgram & {
    MultiplexProgramSettings: MultiplexProgramSettings & {
      ProgramNumber: __integerMin0Max65535;
      ServiceDescriptor: MultiplexProgramServiceDescriptor & {
        ProviderName: __stringMax256;
        ServiceName: __stringMax256;
      };
    };
  };
}
export interface IpPoolUpdateRequest {
  Cidr?: string;
}
export type __listOfIpPoolUpdateRequest = IpPoolUpdateRequest[];
const __listOfIpPoolUpdateRequest =
  __listOfInputWhitelistRuleCidr as any as S.Schema<__listOfIpPoolUpdateRequest>;
export interface RouteUpdateRequest {
  Cidr?: string;
  Gateway?: string;
}
export type __listOfRouteUpdateRequest = RouteUpdateRequest[];
const __listOfRouteUpdateRequest =
  __listOfInputRequestDestinationRoute as any as S.Schema<__listOfRouteUpdateRequest>;
export interface UpdateNetworkRequest {
  IpPools?: IpPoolUpdateRequest[];
  Name?: string;
  NetworkId: string;
  Routes?: RouteUpdateRequest[];
}
export interface UpdateNetworkResponse {
  Arn?: string;
  AssociatedClusterIds?: string[];
  Id?: string;
  IpPools?: IpPool[];
  Name?: string;
  Routes?: Route[];
  State?: NetworkState;
}
export interface SdiSourceMappingUpdateRequest {
  CardNumber?: number;
  ChannelNumber?: number;
  SdiSource?: string;
}
export type SdiSourceMappingsUpdateRequest = SdiSourceMappingUpdateRequest[];
export interface UpdateNodeRequest {
  ClusterId: string;
  Name?: string;
  NodeId: string;
  Role?: NodeRole;
  SdiSourceMappings?: SdiSourceMappingUpdateRequest[];
}
export interface UpdateNodeResponse {
  Arn?: string;
  ChannelPlacementGroups?: string[];
  ClusterId?: string;
  ConnectionState?: NodeConnectionState;
  Id?: string;
  InstanceArn?: string;
  Name?: string;
  NodeInterfaceMappings?: NodeInterfaceMapping[];
  Role?: NodeRole;
  State?: NodeState;
  SdiSourceMappings?: SdiSourceMapping[];
}
export type UpdateNodeStateShape = "ACTIVE" | "DRAINING" | (string & {});
export interface UpdateNodeStateRequest {
  ClusterId: string;
  NodeId: string;
  State?: UpdateNodeStateShape;
}
export interface UpdateNodeStateResponse {
  Arn?: string;
  ChannelPlacementGroups?: string[];
  ClusterId?: string;
  ConnectionState?: NodeConnectionState;
  Id?: string;
  InstanceArn?: string;
  Name?: string;
  NodeInterfaceMappings?: NodeInterfaceMapping[];
  Role?: NodeRole;
  State?: NodeState;
  SdiSourceMappings?: SdiSourceMapping[];
}
export interface UpdateReservationRequest {
  Name?: string;
  RenewalSettings?: RenewalSettings;
  ReservationId: string;
}
export interface UpdateReservationResponse {
  Reservation?: Reservation;
}
export interface UpdateSdiSourceRequest {
  Mode?: SdiSourceMode;
  Name?: string;
  SdiSourceId: string;
  Type?: SdiSourceType;
}
export interface UpdateSdiSourceResponse {
  SdiSource?: SdiSource;
}
export interface ValidationError {
  ElementPath?: string;
  ErrorMessage?: string;
}
export type __listOfValidationError = ValidationError[];
const __listOfValidationError = /*@__PURE__*/ __L.at(__c131, 1);
export type AcceptInputDeviceTransferError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Accept an incoming input device transfer. The ownership of the device will transfer to your AWS account.
 */
export const acceptInputDeviceTransfer: API.OperationMethod<
  AcceptInputDeviceTransferRequest,
  AcceptInputDeviceTransferResponse,
  AcceptInputDeviceTransferError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<AcceptInputDeviceTransferRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<AcceptInputDeviceTransferResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptInputDeviceTransfer",
}));

export type BatchDeleteError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Starts delete of resources.
 */
export const batchDelete: API.OperationMethod<
  BatchDeleteRequest,
  BatchDeleteResponse,
  BatchDeleteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c12, 0) as any as S.Schema<BatchDeleteRequest>,
  output: __S(420, __c13, 4) as any as S.Schema<BatchDeleteResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDelete",
}));

export type BatchStartError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Starts existing resources
 */
export const batchStart: API.OperationMethod<
  BatchStartRequest,
  BatchStartResponse,
  BatchStartError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c26, 0) as any as S.Schema<BatchStartRequest>,
  output: __S(420, __c13, 4) as any as S.Schema<BatchStartResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchStart",
}));

export type BatchStopError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Stops running resources
 */
export const batchStop: API.OperationMethod<
  BatchStopRequest,
  BatchStopResponse,
  BatchStopError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c37, 0) as any as S.Schema<BatchStopRequest>,
  output: __S(420, __c13, 4) as any as S.Schema<BatchStopResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchStop",
}));

export type BatchUpdateScheduleError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Update a channel schedule
 */
export const batchUpdateSchedule: API.OperationMethod<
  BatchUpdateScheduleRequest,
  BatchUpdateScheduleResponse,
  BatchUpdateScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1314, __c41, 2) as any as S.Schema<BatchUpdateScheduleRequest>,
  output: __S(1315, __c41, 3) as any as S.Schema<BatchUpdateScheduleResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateSchedule",
}));

export type CancelInputDeviceTransferError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Cancel an input device transfer that you have requested.
 */
export const cancelInputDeviceTransfer: API.OperationMethod<
  CancelInputDeviceTransferRequest,
  CancelInputDeviceTransferResponse,
  CancelInputDeviceTransferError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1408, __c44, 0) as any as S.Schema<CancelInputDeviceTransferRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<CancelInputDeviceTransferResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelInputDeviceTransfer",
}));

export type ClaimDeviceError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Send a request to claim an AWS Elemental device that you have purchased from a third-party vendor. After the request succeeds, you will own the device.
 */
export const claimDevice: API.OperationMethod<
  ClaimDeviceRequest,
  ClaimDeviceResponse,
  ClaimDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1440, __c45, 0) as any as S.Schema<ClaimDeviceRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<ClaimDeviceResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ClaimDevice",
}));

export type CreateChannelError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | UnprocessableEntityException
  | MediaLiveRoleNotYetTrusted
  | CommonErrors;
/**
 * Creates a new channel
 */
export const createChannel: API.OperationMethod<
  CreateChannelRequest,
  CreateChannelResponse,
  CreateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1474, __c46, 2) as any as S.Schema<CreateChannelRequest>,
  output: __S(1536, __c48, 0) as any as S.Schema<CreateChannelResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
    UnprocessableEntityException,
    MediaLiveRoleNotYetTrusted,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChannel",
}));

export type CreateChannelPlacementGroupError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Create a ChannelPlacementGroup in the specified Cluster. As part of the create operation, you specify the Nodes to attach the group to.After you create a ChannelPlacementGroup, you add Channels to the group (you do this by modifying the Channels to add them to a specific group). You now have an association of Channels to ChannelPlacementGroup, and ChannelPlacementGroup to Nodes. This association means that all the Channels in the group are able to run on any of the Nodes associated with the group.
 */
export const createChannelPlacementGroup: API.OperationMethod<
  CreateChannelPlacementGroupRequest,
  CreateChannelPlacementGroupResponse,
  CreateChannelPlacementGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1920, __c60, 0) as any as S.Schema<CreateChannelPlacementGroupRequest>,
  output: __S(1952, __c61, 0) as any as S.Schema<CreateChannelPlacementGroupResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChannelPlacementGroup",
}));

export type CreateCloudWatchAlarmTemplateError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a cloudwatch alarm template to dynamically generate cloudwatch metric alarms on targeted resource types.
 */
export const createCloudWatchAlarmTemplate: API.OperationMethod<
  CreateCloudWatchAlarmTemplateRequest,
  CreateCloudWatchAlarmTemplateResponse,
  CreateCloudWatchAlarmTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1984, __c62, 0) as any as S.Schema<CreateCloudWatchAlarmTemplateRequest>,
  output: __S(2016, __c63, 0) as any as S.Schema<CreateCloudWatchAlarmTemplateResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCloudWatchAlarmTemplate",
}));

export type CreateCloudWatchAlarmTemplateGroupError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a cloudwatch alarm template group to group your cloudwatch alarm templates and to attach to signal maps for dynamically creating alarms.
 */
export const createCloudWatchAlarmTemplateGroup: API.OperationMethod<
  CreateCloudWatchAlarmTemplateGroupRequest,
  CreateCloudWatchAlarmTemplateGroupResponse,
  CreateCloudWatchAlarmTemplateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2048, __c64, 0) as any as S.Schema<CreateCloudWatchAlarmTemplateGroupRequest>,
  output: __S(2080, __c65, 0) as any as S.Schema<CreateCloudWatchAlarmTemplateGroupResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCloudWatchAlarmTemplateGroup",
}));

export type CreateClusterError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a new Cluster.
 */
export const createCluster: API.OperationMethod<
  CreateClusterRequest,
  CreateClusterResponse,
  CreateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2112, __c66, 0) as any as S.Schema<CreateClusterRequest>,
  output: __S(2144, __c67, 0) as any as S.Schema<CreateClusterResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCluster",
}));

export type CreateEventBridgeRuleTemplateError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an eventbridge rule template to monitor events and send notifications to your targeted resources.
 */
export const createEventBridgeRuleTemplate: API.OperationMethod<
  CreateEventBridgeRuleTemplateRequest,
  CreateEventBridgeRuleTemplateResponse,
  CreateEventBridgeRuleTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2208, __c69, 0) as any as S.Schema<CreateEventBridgeRuleTemplateRequest>,
  output: __S(2242, __c70, 2) as any as S.Schema<CreateEventBridgeRuleTemplateResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEventBridgeRuleTemplate",
}));

export type CreateEventBridgeRuleTemplateGroupError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an eventbridge rule template group to group your eventbridge rule templates and to attach to signal maps for dynamically creating notification rules.
 */
export const createEventBridgeRuleTemplateGroup: API.OperationMethod<
  CreateEventBridgeRuleTemplateGroupRequest,
  CreateEventBridgeRuleTemplateGroupResponse,
  CreateEventBridgeRuleTemplateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2272, __c71, 0) as any as S.Schema<CreateEventBridgeRuleTemplateGroupRequest>,
  output: __S(2080, __c65, 0) as any as S.Schema<CreateEventBridgeRuleTemplateGroupResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEventBridgeRuleTemplateGroup",
}));

export type CreateInputError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create an input
 */
export const createInput: API.OperationMethod<
  CreateInputRequest,
  CreateInputResponse,
  CreateInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2308, __c72, 4) as any as S.Schema<CreateInputRequest>,
  output: __S(2400, __c75, 0) as any as S.Schema<CreateInputResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInput",
}));

export type CreateInputSecurityGroupError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a Input Security Group
 */
export const createInputSecurityGroup: API.OperationMethod<
  CreateInputSecurityGroupRequest,
  CreateInputSecurityGroupResponse,
  CreateInputSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2464, __c77, 0) as any as S.Schema<CreateInputSecurityGroupRequest>,
  output: __S(2496, __c78, 0) as any as S.Schema<CreateInputSecurityGroupResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInputSecurityGroup",
}));

export type CreateMultiplexError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Create a new multiplex.
 */
export const createMultiplex: API.OperationMethod<
  CreateMultiplexRequest,
  CreateMultiplexResponse,
  CreateMultiplexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2592, __c81, 0) as any as S.Schema<CreateMultiplexRequest>,
  output: __S(2624, __c82, 0) as any as S.Schema<CreateMultiplexResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMultiplex",
}));

export type CreateMultiplexProgramError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Create a new program in the multiplex.
 */
export const createMultiplexProgram: API.OperationMethod<
  CreateMultiplexProgramRequest,
  CreateMultiplexProgramResponse,
  CreateMultiplexProgramError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2688, __c84, 0) as any as S.Schema<CreateMultiplexProgramRequest>,
  output: __S(2720, __c85, 0) as any as S.Schema<CreateMultiplexProgramResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMultiplexProgram",
}));

export type CreateNetworkError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create as many Networks as you need. You will associate one or more Clusters with each Network.Each Network provides MediaLive Anywhere with required information about the network in your organization that you are using for video encoding using MediaLive.
 */
export const createNetwork: API.OperationMethod<
  CreateNetworkRequest,
  CreateNetworkResponse,
  CreateNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2816, __c88, 0) as any as S.Schema<CreateNetworkRequest>,
  output: __S(2848, __c89, 0) as any as S.Schema<CreateNetworkResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNetwork",
}));

export type CreateNodeError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Create a Node in the specified Cluster. You can also create Nodes using the CreateNodeRegistrationScript. Note that you can't move a Node to another Cluster.
 */
export const createNode: API.OperationMethod<
  CreateNodeRequest,
  CreateNodeResponse,
  CreateNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2882, __c90, 2) as any as S.Schema<CreateNodeRequest>,
  output: __S(2944, __c92, 0) as any as S.Schema<CreateNodeResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNode",
}));

export type CreateNodeRegistrationScriptError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create the Register Node script for all the nodes intended for a specific Cluster. You will then run the script on each hardware unit that is intended for that Cluster. The script creates a Node in the specified Cluster. It then binds the Node to this hardware unit, and activates the node hardware for use with MediaLive Anywhere.
 */
export const createNodeRegistrationScript: API.OperationMethod<
  CreateNodeRegistrationScriptRequest,
  CreateNodeRegistrationScriptResponse,
  CreateNodeRegistrationScriptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3008, __c94, 0) as any as S.Schema<CreateNodeRegistrationScriptRequest>,
  output: __S(3009, __c94, 1) as any as S.Schema<CreateNodeRegistrationScriptResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNodeRegistrationScript",
}));

export type CreatePartnerInputError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a partner input
 */
export const createPartnerInput: API.OperationMethod<
  CreatePartnerInputRequest,
  CreatePartnerInputResponse,
  CreatePartnerInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3040, __c95, 0) as any as S.Schema<CreatePartnerInputRequest>,
  output: __S(2400, __c75, 0) as any as S.Schema<CreatePartnerInputResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePartnerInput",
}));

export type CreateSdiSourceError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create an SdiSource for each video source that uses the SDI protocol. You will reference the SdiSource when you create an SDI input in MediaLive. You will also reference it in an SdiSourceMapping, in order to create a connection between the logical SdiSource and the physical SDI card and port that the physical SDI source uses.
 */
export const createSdiSource: API.OperationMethod<
  CreateSdiSourceRequest,
  CreateSdiSourceResponse,
  CreateSdiSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3072, __c96, 0) as any as S.Schema<CreateSdiSourceRequest>,
  output: __S(3104, __c97, 0) as any as S.Schema<CreateSdiSourceResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSdiSource",
}));

export type CreateSignalMapError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Initiates the creation of a new signal map. Will discover a new mediaResourceMap based on the provided discoveryEntryPointArn.
 */
export const createSignalMap: API.OperationMethod<
  CreateSignalMapRequest,
  CreateSignalMapResponse,
  CreateSignalMapError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3168, __c99, 0) as any as S.Schema<CreateSignalMapRequest>,
  output: __S(3206, __c100, 6) as any as S.Schema<CreateSignalMapResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSignalMap",
}));

export type CreateTagsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Create tags for a resource
 */
export const createTags: API.OperationMethod<
  CreateTagsRequest,
  CreateTagsResponse,
  CreateTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3232, __c101, 0) as any as S.Schema<CreateTagsRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<CreateTagsResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTags",
}));

export type DeleteChannelError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Starts deletion of channel. The associated outputs are also deleted.
 */
export const deleteChannel: API.OperationMethod<
  DeleteChannelRequest,
  DeleteChannelResponse,
  DeleteChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3264, __c102, 0) as any as S.Schema<DeleteChannelRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<DeleteChannelResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChannel",
}));

export type DeleteChannelPlacementGroupError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete the specified ChannelPlacementGroup that exists in the specified Cluster.
 */
export const deleteChannelPlacementGroup: API.OperationMethod<
  DeleteChannelPlacementGroupRequest,
  DeleteChannelPlacementGroupResponse,
  DeleteChannelPlacementGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3296, __c103, 0) as any as S.Schema<DeleteChannelPlacementGroupRequest>,
  output: __S(1952, __c61, 0) as any as S.Schema<DeleteChannelPlacementGroupResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChannelPlacementGroup",
}));

export type DeleteCloudWatchAlarmTemplateError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a cloudwatch alarm template.
 */
export const deleteCloudWatchAlarmTemplate: API.OperationMethod<
  DeleteCloudWatchAlarmTemplateRequest,
  DeleteCloudWatchAlarmTemplateResponse,
  DeleteCloudWatchAlarmTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3328, __c104, 0) as any as S.Schema<DeleteCloudWatchAlarmTemplateRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<DeleteCloudWatchAlarmTemplateResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCloudWatchAlarmTemplate",
}));

export type DeleteCloudWatchAlarmTemplateGroupError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a cloudwatch alarm template group. You must detach this group from all signal maps and ensure its existing templates are moved to another group or deleted.
 */
export const deleteCloudWatchAlarmTemplateGroup: API.OperationMethod<
  DeleteCloudWatchAlarmTemplateGroupRequest,
  DeleteCloudWatchAlarmTemplateGroupResponse,
  DeleteCloudWatchAlarmTemplateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3360, __c105, 0) as any as S.Schema<DeleteCloudWatchAlarmTemplateGroupRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<DeleteCloudWatchAlarmTemplateGroupResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCloudWatchAlarmTemplateGroup",
}));

export type DeleteClusterError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete a Cluster. The Cluster must be idle.
 */
export const deleteCluster: API.OperationMethod<
  DeleteClusterRequest,
  DeleteClusterResponse,
  DeleteClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3392, __c106, 0) as any as S.Schema<DeleteClusterRequest>,
  output: __S(2144, __c67, 0) as any as S.Schema<DeleteClusterResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCluster",
}));

export type DeleteEventBridgeRuleTemplateError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an eventbridge rule template.
 */
export const deleteEventBridgeRuleTemplate: API.OperationMethod<
  DeleteEventBridgeRuleTemplateRequest,
  DeleteEventBridgeRuleTemplateResponse,
  DeleteEventBridgeRuleTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3424, __c107, 0) as any as S.Schema<DeleteEventBridgeRuleTemplateRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<DeleteEventBridgeRuleTemplateResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventBridgeRuleTemplate",
}));

export type DeleteEventBridgeRuleTemplateGroupError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an eventbridge rule template group. You must detach this group from all signal maps and ensure its existing templates are moved to another group or deleted.
 */
export const deleteEventBridgeRuleTemplateGroup: API.OperationMethod<
  DeleteEventBridgeRuleTemplateGroupRequest,
  DeleteEventBridgeRuleTemplateGroupResponse,
  DeleteEventBridgeRuleTemplateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3456, __c108, 0) as any as S.Schema<DeleteEventBridgeRuleTemplateGroupRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<DeleteEventBridgeRuleTemplateGroupResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventBridgeRuleTemplateGroup",
}));

export type DeleteInputError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the input end point
 */
export const deleteInput: API.OperationMethod<
  DeleteInputRequest,
  DeleteInputResponse,
  DeleteInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3488, __c109, 0) as any as S.Schema<DeleteInputRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<DeleteInputResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInput",
}));

export type DeleteInputSecurityGroupError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an Input Security Group
 */
export const deleteInputSecurityGroup: API.OperationMethod<
  DeleteInputSecurityGroupRequest,
  DeleteInputSecurityGroupResponse,
  DeleteInputSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3520, __c110, 0) as any as S.Schema<DeleteInputSecurityGroupRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<DeleteInputSecurityGroupResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInputSecurityGroup",
}));

export type DeleteMultiplexError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete a multiplex. The multiplex must be idle.
 */
export const deleteMultiplex: API.OperationMethod<
  DeleteMultiplexRequest,
  DeleteMultiplexResponse,
  DeleteMultiplexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3552, __c111, 0) as any as S.Schema<DeleteMultiplexRequest>,
  output: __S(2660, __c83, 4) as any as S.Schema<DeleteMultiplexResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMultiplex",
}));

export type DeleteMultiplexProgramError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete a program from a multiplex.
 */
export const deleteMultiplexProgram: API.OperationMethod<
  DeleteMultiplexProgramRequest,
  DeleteMultiplexProgramResponse,
  DeleteMultiplexProgramError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3584, __c112, 0) as any as S.Schema<DeleteMultiplexProgramRequest>,
  output: __S(2790, __c87, 6) as any as S.Schema<DeleteMultiplexProgramResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMultiplexProgram",
}));

export type DeleteNetworkError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete a Network. The Network must have no resources associated with it.
 */
export const deleteNetwork: API.OperationMethod<
  DeleteNetworkRequest,
  DeleteNetworkResponse,
  DeleteNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3616, __c113, 0) as any as S.Schema<DeleteNetworkRequest>,
  output: __S(2848, __c89, 0) as any as S.Schema<DeleteNetworkResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNetwork",
}));

export type DeleteNodeError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete a Node. The Node must be IDLE.
 */
export const deleteNode: API.OperationMethod<
  DeleteNodeRequest,
  DeleteNodeResponse,
  DeleteNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3648, __c114, 0) as any as S.Schema<DeleteNodeRequest>,
  output: __S(2944, __c92, 0) as any as S.Schema<DeleteNodeResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNode",
}));

export type DeleteReservationError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete an expired reservation.
 */
export const deleteReservation: API.OperationMethod<
  DeleteReservationRequest,
  DeleteReservationResponse,
  DeleteReservationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3680, __c115, 0) as any as S.Schema<DeleteReservationRequest>,
  output: __S(3745, __c117, 1) as any as S.Schema<DeleteReservationResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReservation",
}));

export type DeleteScheduleError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete all schedule actions on a channel.
 */
export const deleteSchedule: API.OperationMethod<
  DeleteScheduleRequest,
  DeleteScheduleResponse,
  DeleteScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3776, __c118, 0) as any as S.Schema<DeleteScheduleRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<DeleteScheduleResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSchedule",
}));

export type DeleteSdiSourceError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete an SdiSource. The SdiSource must not be part of any SidSourceMapping and must not be attached to any input.
 */
export const deleteSdiSource: API.OperationMethod<
  DeleteSdiSourceRequest,
  DeleteSdiSourceResponse,
  DeleteSdiSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3808, __c119, 0) as any as S.Schema<DeleteSdiSourceRequest>,
  output: __S(3104, __c97, 0) as any as S.Schema<DeleteSdiSourceResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSdiSource",
}));

export type DeleteSignalMapError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the specified signal map.
 */
export const deleteSignalMap: API.OperationMethod<
  DeleteSignalMapRequest,
  DeleteSignalMapResponse,
  DeleteSignalMapError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3840, __c120, 0) as any as S.Schema<DeleteSignalMapRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<DeleteSignalMapResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSignalMap",
}));

export type DeleteTagsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Removes tags for a resource
 */
export const deleteTags: API.OperationMethod<
  DeleteTagsRequest,
  DeleteTagsResponse,
  DeleteTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3872, __c121, 0) as any as S.Schema<DeleteTagsRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<DeleteTagsResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTags",
}));

export type DescribeAccountConfigurationError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Describe account configuration
 */
export const describeAccountConfiguration: API.OperationMethod<
  DescribeAccountConfigurationRequest,
  DescribeAccountConfigurationResponse,
  DescribeAccountConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3904, __c122, 0) as any as S.Schema<DescribeAccountConfigurationRequest>,
  output: __S(3937, __c123, 1) as any as S.Schema<DescribeAccountConfigurationResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountConfiguration",
}));

export type DescribeChannelError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets details about a channel
 */
export const describeChannel: API.OperationMethod<
  DescribeChannelRequest,
  DescribeChannelResponse,
  DescribeChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3968, __c124, 0) as any as S.Schema<DescribeChannelRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<DescribeChannelResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeChannel",
}));

export type DescribeChannelPlacementGroupError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get details about a ChannelPlacementGroup.
 */
export const describeChannelPlacementGroup: API.OperationMethod<
  DescribeChannelPlacementGroupRequest,
  DescribeChannelPlacementGroupResponse,
  DescribeChannelPlacementGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4000, __c125, 0) as any as S.Schema<DescribeChannelPlacementGroupRequest>,
  output: __S(1952, __c61, 0) as any as S.Schema<DescribeChannelPlacementGroupResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeChannelPlacementGroup",
}));

export type DescribeClusterError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get details about a Cluster.
 */
export const describeCluster: API.OperationMethod<
  DescribeClusterRequest,
  DescribeClusterResponse,
  DescribeClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4032, __c126, 0) as any as S.Schema<DescribeClusterRequest>,
  output: __S(2144, __c67, 0) as any as S.Schema<DescribeClusterResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCluster",
}));

export type DescribeInputError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Produces details about an input
 */
export const describeInput: API.OperationMethod<
  DescribeInputRequest,
  DescribeInputResponse,
  DescribeInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4064, __c127, 0) as any as S.Schema<DescribeInputRequest>,
  output: __S(2458, __c76, 26) as any as S.Schema<DescribeInputResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInput",
}));

export type DescribeInputDeviceError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the details for the input device
 */
export const describeInputDevice: API.OperationMethod<
  DescribeInputDeviceRequest,
  DescribeInputDeviceResponse,
  DescribeInputDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4096, __c128, 0) as any as S.Schema<DescribeInputDeviceRequest>,
  output: __S(4134, __c129, 6) as any as S.Schema<DescribeInputDeviceResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInputDevice",
}));

export type DescribeInputDeviceThumbnailError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get the latest thumbnail data for the input device.
 */
export const describeInputDeviceThumbnail: API.OperationMethod<
  DescribeInputDeviceThumbnailRequest,
  DescribeInputDeviceThumbnailResponse,
  DescribeInputDeviceThumbnailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4160, __c130, 0) as any as S.Schema<DescribeInputDeviceThumbnailRequest>,
  output: __S(4161, __c130, 1) as any as S.Schema<DescribeInputDeviceThumbnailResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInputDeviceThumbnail",
}));

export type DescribeInputSecurityGroupError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Produces a summary of an Input Security Group
 */
export const describeInputSecurityGroup: API.OperationMethod<
  DescribeInputSecurityGroupRequest,
  DescribeInputSecurityGroupResponse,
  DescribeInputSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4224, __c132, 0) as any as S.Schema<DescribeInputSecurityGroupRequest>,
  output: __S(2560, __c80, 0) as any as S.Schema<DescribeInputSecurityGroupResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInputSecurityGroup",
}));

export type DescribeMultiplexError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets details about a multiplex.
 */
export const describeMultiplex: API.OperationMethod<
  DescribeMultiplexRequest,
  DescribeMultiplexResponse,
  DescribeMultiplexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4256, __c133, 0) as any as S.Schema<DescribeMultiplexRequest>,
  output: __S(2660, __c83, 4) as any as S.Schema<DescribeMultiplexResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMultiplex",
}));

export type DescribeMultiplexProgramError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get the details for a program in a multiplex.
 */
export const describeMultiplexProgram: API.OperationMethod<
  DescribeMultiplexProgramRequest,
  DescribeMultiplexProgramResponse,
  DescribeMultiplexProgramError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4288, __c134, 0) as any as S.Schema<DescribeMultiplexProgramRequest>,
  output: __S(2790, __c87, 6) as any as S.Schema<DescribeMultiplexProgramResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMultiplexProgram",
}));

export type DescribeNetworkError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get details about a Network.
 */
export const describeNetwork: API.OperationMethod<
  DescribeNetworkRequest,
  DescribeNetworkResponse,
  DescribeNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4320, __c135, 0) as any as S.Schema<DescribeNetworkRequest>,
  output: __S(2848, __c89, 0) as any as S.Schema<DescribeNetworkResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNetwork",
}));

export type DescribeNodeError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get details about a Node in the specified Cluster.
 */
export const describeNode: API.OperationMethod<
  DescribeNodeRequest,
  DescribeNodeResponse,
  DescribeNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4352, __c136, 0) as any as S.Schema<DescribeNodeRequest>,
  output: __S(2944, __c92, 0) as any as S.Schema<DescribeNodeResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNode",
}));

export type DescribeOfferingError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get details for an offering.
 */
export const describeOffering: API.OperationMethod<
  DescribeOfferingRequest,
  DescribeOfferingResponse,
  DescribeOfferingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4384, __c137, 0) as any as S.Schema<DescribeOfferingRequest>,
  output: __S(4416, __c138, 0) as any as S.Schema<DescribeOfferingResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOffering",
}));

export type DescribeReservationError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get details for a reservation.
 */
export const describeReservation: API.OperationMethod<
  DescribeReservationRequest,
  DescribeReservationResponse,
  DescribeReservationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4448, __c139, 0) as any as S.Schema<DescribeReservationRequest>,
  output: __S(3745, __c117, 1) as any as S.Schema<DescribeReservationResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservation",
}));

export type DescribeScheduleError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get a channel schedule
 */
export const describeSchedule: API.PaginatedOperationMethod<
  DescribeScheduleRequest,
  DescribeScheduleResponse,
  DescribeScheduleError,
  Credentials | HttpClient.HttpClient,
  ScheduleAction
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4480, __c140, 0) as any as S.Schema<DescribeScheduleRequest>,
  output: __S(4481, __c140, 1) as any as S.Schema<DescribeScheduleResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSchedule",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ScheduleActions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeSdiSourceError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets details about a SdiSource.
 */
export const describeSdiSource: API.OperationMethod<
  DescribeSdiSourceRequest,
  DescribeSdiSourceResponse,
  DescribeSdiSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4512, __c141, 0) as any as S.Schema<DescribeSdiSourceRequest>,
  output: __S(3104, __c97, 0) as any as S.Schema<DescribeSdiSourceResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSdiSource",
}));

export type DescribeThumbnailsError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Describe the latest thumbnails data.
 */
export const describeThumbnails: API.OperationMethod<
  DescribeThumbnailsRequest,
  DescribeThumbnailsResponse,
  DescribeThumbnailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4544, __c142, 0) as any as S.Schema<DescribeThumbnailsRequest>,
  output: __S(4549, __c142, 5) as any as S.Schema<DescribeThumbnailsResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeThumbnails",
}));

export type GetCloudWatchAlarmTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the specified cloudwatch alarm template.
 */
export const getCloudWatchAlarmTemplate: API.OperationMethod<
  GetCloudWatchAlarmTemplateRequest,
  GetCloudWatchAlarmTemplateResponse,
  GetCloudWatchAlarmTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4576, __c143, 0) as any as S.Schema<GetCloudWatchAlarmTemplateRequest>,
  output: __S(2016, __c63, 0) as any as S.Schema<GetCloudWatchAlarmTemplateResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCloudWatchAlarmTemplate",
}));

export type GetCloudWatchAlarmTemplateGroupError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the specified cloudwatch alarm template group.
 */
export const getCloudWatchAlarmTemplateGroup: API.OperationMethod<
  GetCloudWatchAlarmTemplateGroupRequest,
  GetCloudWatchAlarmTemplateGroupResponse,
  GetCloudWatchAlarmTemplateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4608, __c144, 0) as any as S.Schema<GetCloudWatchAlarmTemplateGroupRequest>,
  output: __S(2080, __c65, 0) as any as S.Schema<GetCloudWatchAlarmTemplateGroupResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCloudWatchAlarmTemplateGroup",
}));

export type GetEventBridgeRuleTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the specified eventbridge rule template.
 */
export const getEventBridgeRuleTemplate: API.OperationMethod<
  GetEventBridgeRuleTemplateRequest,
  GetEventBridgeRuleTemplateResponse,
  GetEventBridgeRuleTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4640, __c145, 0) as any as S.Schema<GetEventBridgeRuleTemplateRequest>,
  output: __S(2242, __c70, 2) as any as S.Schema<GetEventBridgeRuleTemplateResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventBridgeRuleTemplate",
}));

export type GetEventBridgeRuleTemplateGroupError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the specified eventbridge rule template group.
 */
export const getEventBridgeRuleTemplateGroup: API.OperationMethod<
  GetEventBridgeRuleTemplateGroupRequest,
  GetEventBridgeRuleTemplateGroupResponse,
  GetEventBridgeRuleTemplateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4672, __c146, 0) as any as S.Schema<GetEventBridgeRuleTemplateGroupRequest>,
  output: __S(2080, __c65, 0) as any as S.Schema<GetEventBridgeRuleTemplateGroupResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventBridgeRuleTemplateGroup",
}));

export type GetSignalMapError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the specified signal map.
 */
export const getSignalMap: API.OperationMethod<
  GetSignalMapRequest,
  GetSignalMapResponse,
  GetSignalMapError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4704, __c147, 0) as any as S.Schema<GetSignalMapRequest>,
  output: __S(3206, __c100, 6) as any as S.Schema<GetSignalMapResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSignalMap",
}));

export type ListAlertsError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List the alerts for a channel with optional filtering based on alert state.
 */
export const listAlerts: API.PaginatedOperationMethod<
  ListAlertsRequest,
  ListAlertsResponse,
  ListAlertsError,
  Credentials | HttpClient.HttpClient,
  ChannelAlert
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4736, __c148, 0) as any as S.Schema<ListAlertsRequest>,
  output: __S(4770, __c149, 2) as any as S.Schema<ListAlertsResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAlerts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Alerts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListChannelPlacementGroupsError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve the list of ChannelPlacementGroups in the specified Cluster.
 */
export const listChannelPlacementGroups: API.PaginatedOperationMethod<
  ListChannelPlacementGroupsRequest,
  ListChannelPlacementGroupsResponse,
  ListChannelPlacementGroupsError,
  Credentials | HttpClient.HttpClient,
  DescribeChannelPlacementGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4800, __c150, 0) as any as S.Schema<ListChannelPlacementGroupsRequest>,
  output: __S(4802, __c150, 2) as any as S.Schema<ListChannelPlacementGroupsResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChannelPlacementGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ChannelPlacementGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListChannelsError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Produces list of channels that have been created
 */
export const listChannels: API.PaginatedOperationMethod<
  ListChannelsRequest,
  ListChannelsResponse,
  ListChannelsError,
  Credentials | HttpClient.HttpClient,
  ChannelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4832, __c151, 0) as any as S.Schema<ListChannelsRequest>,
  output: __S(4835, __c151, 3) as any as S.Schema<ListChannelsResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChannels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Channels",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCloudWatchAlarmTemplateGroupsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists cloudwatch alarm template groups.
 */
export const listCloudWatchAlarmTemplateGroups: API.PaginatedOperationMethod<
  ListCloudWatchAlarmTemplateGroupsRequest,
  ListCloudWatchAlarmTemplateGroupsResponse,
  ListCloudWatchAlarmTemplateGroupsError,
  Credentials | HttpClient.HttpClient,
  CloudWatchAlarmTemplateGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4896, __c153, 0) as any as S.Schema<ListCloudWatchAlarmTemplateGroupsRequest>,
  output: __S(4897, __c153, 1) as any as S.Schema<ListCloudWatchAlarmTemplateGroupsResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCloudWatchAlarmTemplateGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CloudWatchAlarmTemplateGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCloudWatchAlarmTemplatesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists cloudwatch alarm templates.
 */
export const listCloudWatchAlarmTemplates: API.PaginatedOperationMethod<
  ListCloudWatchAlarmTemplatesRequest,
  ListCloudWatchAlarmTemplatesResponse,
  ListCloudWatchAlarmTemplatesError,
  Credentials | HttpClient.HttpClient,
  CloudWatchAlarmTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4960, __c155, 0) as any as S.Schema<ListCloudWatchAlarmTemplatesRequest>,
  output: __S(4962, __c155, 2) as any as S.Schema<ListCloudWatchAlarmTemplatesResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCloudWatchAlarmTemplates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CloudWatchAlarmTemplates",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListClusterAlertsError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List the alerts for a cluster with optional filtering based on alert state.
 */
export const listClusterAlerts: API.PaginatedOperationMethod<
  ListClusterAlertsRequest,
  ListClusterAlertsResponse,
  ListClusterAlertsError,
  Credentials | HttpClient.HttpClient,
  ClusterAlert
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4992, __c156, 0) as any as S.Schema<ListClusterAlertsRequest>,
  output: __S(4995, __c156, 3) as any as S.Schema<ListClusterAlertsResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClusterAlerts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Alerts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListClustersError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve the list of Clusters.
 */
export const listClusters: API.PaginatedOperationMethod<
  ListClustersRequest,
  ListClustersResponse,
  ListClustersError,
  Credentials | HttpClient.HttpClient,
  DescribeClusterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(5024, __c157, 0) as any as S.Schema<ListClustersRequest>,
  output: __S(5026, __c157, 2) as any as S.Schema<ListClustersResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClusters",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Clusters",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEventBridgeRuleTemplateGroupsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists eventbridge rule template groups.
 */
export const listEventBridgeRuleTemplateGroups: API.PaginatedOperationMethod<
  ListEventBridgeRuleTemplateGroupsRequest,
  ListEventBridgeRuleTemplateGroupsResponse,
  ListEventBridgeRuleTemplateGroupsError,
  Credentials | HttpClient.HttpClient,
  EventBridgeRuleTemplateGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(5056, __c158, 0) as any as S.Schema<ListEventBridgeRuleTemplateGroupsRequest>,
  output: __S(5057, __c158, 1) as any as S.Schema<ListEventBridgeRuleTemplateGroupsResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventBridgeRuleTemplateGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EventBridgeRuleTemplateGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEventBridgeRuleTemplatesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists eventbridge rule templates.
 */
export const listEventBridgeRuleTemplates: API.PaginatedOperationMethod<
  ListEventBridgeRuleTemplatesRequest,
  ListEventBridgeRuleTemplatesResponse,
  ListEventBridgeRuleTemplatesError,
  Credentials | HttpClient.HttpClient,
  EventBridgeRuleTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(5088, __c159, 0) as any as S.Schema<ListEventBridgeRuleTemplatesRequest>,
  output: __S(5091, __c159, 3) as any as S.Schema<ListEventBridgeRuleTemplatesResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventBridgeRuleTemplates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EventBridgeRuleTemplates",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInputDevicesError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List input devices
 */
export const listInputDevices: API.PaginatedOperationMethod<
  ListInputDevicesRequest,
  ListInputDevicesResponse,
  ListInputDevicesError,
  Credentials | HttpClient.HttpClient,
  InputDeviceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(5120, __c160, 0) as any as S.Schema<ListInputDevicesRequest>,
  output: __S(5122, __c160, 2) as any as S.Schema<ListInputDevicesResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInputDevices",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InputDevices",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInputDeviceTransfersError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * List input devices that are currently being transferred. List input devices that you are transferring from your AWS account or input devices that another AWS account is transferring to you.
 */
export const listInputDeviceTransfers: API.PaginatedOperationMethod<
  ListInputDeviceTransfersRequest,
  ListInputDeviceTransfersResponse,
  ListInputDeviceTransfersError,
  Credentials | HttpClient.HttpClient,
  TransferringInputDeviceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(5152, __c161, 0) as any as S.Schema<ListInputDeviceTransfersRequest>,
  output: __S(5155, __c161, 3) as any as S.Schema<ListInputDeviceTransfersResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInputDeviceTransfers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InputDeviceTransfers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInputsError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Produces list of inputs that have been created
 */
export const listInputs: API.PaginatedOperationMethod<
  ListInputsRequest,
  ListInputsResponse,
  ListInputsError,
  Credentials | HttpClient.HttpClient,
  Input
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(5184, __c162, 0) as any as S.Schema<ListInputsRequest>,
  output: __S(5186, __c162, 2) as any as S.Schema<ListInputsResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInputs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Inputs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInputSecurityGroupsError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Produces a list of Input Security Groups for an account
 */
export const listInputSecurityGroups: API.PaginatedOperationMethod<
  ListInputSecurityGroupsRequest,
  ListInputSecurityGroupsResponse,
  ListInputSecurityGroupsError,
  Credentials | HttpClient.HttpClient,
  InputSecurityGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(5216, __c163, 0) as any as S.Schema<ListInputSecurityGroupsRequest>,
  output: __S(5218, __c163, 2) as any as S.Schema<ListInputSecurityGroupsResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInputSecurityGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InputSecurityGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMultiplexAlertsError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List the alerts for a multiplex with optional filtering based on alert state.
 */
export const listMultiplexAlerts: API.PaginatedOperationMethod<
  ListMultiplexAlertsRequest,
  ListMultiplexAlertsResponse,
  ListMultiplexAlertsError,
  Credentials | HttpClient.HttpClient,
  MultiplexAlert
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(5248, __c164, 0) as any as S.Schema<ListMultiplexAlertsRequest>,
  output: __S(4770, __c149, 2) as any as S.Schema<ListMultiplexAlertsResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMultiplexAlerts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Alerts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMultiplexesError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve a list of the existing multiplexes.
 */
export const listMultiplexes: API.PaginatedOperationMethod<
  ListMultiplexesRequest,
  ListMultiplexesResponse,
  ListMultiplexesError,
  Credentials | HttpClient.HttpClient,
  MultiplexSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(5280, __c165, 0) as any as S.Schema<ListMultiplexesRequest>,
  output: __S(5284, __c165, 4) as any as S.Schema<ListMultiplexesResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMultiplexes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Multiplexes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMultiplexProgramsError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List the programs that currently exist for a specific multiplex.
 */
export const listMultiplexPrograms: API.PaginatedOperationMethod<
  ListMultiplexProgramsRequest,
  ListMultiplexProgramsResponse,
  ListMultiplexProgramsError,
  Credentials | HttpClient.HttpClient,
  MultiplexProgramSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(5312, __c166, 0) as any as S.Schema<ListMultiplexProgramsRequest>,
  output: __S(5315, __c166, 3) as any as S.Schema<ListMultiplexProgramsResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMultiplexPrograms",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "MultiplexPrograms",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNetworksError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve the list of Networks.
 */
export const listNetworks: API.PaginatedOperationMethod<
  ListNetworksRequest,
  ListNetworksResponse,
  ListNetworksError,
  Credentials | HttpClient.HttpClient,
  DescribeNetworkSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(5344, __c167, 0) as any as S.Schema<ListNetworksRequest>,
  output: __S(5346, __c167, 2) as any as S.Schema<ListNetworksResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Networks",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNodesError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve the list of Nodes.
 */
export const listNodes: API.PaginatedOperationMethod<
  ListNodesRequest,
  ListNodesResponse,
  ListNodesError,
  Credentials | HttpClient.HttpClient,
  DescribeNodeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(5376, __c168, 0) as any as S.Schema<ListNodesRequest>,
  output: __S(5379, __c168, 3) as any as S.Schema<ListNodesResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNodes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Nodes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOfferingsError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List offerings available for purchase.
 */
export const listOfferings: API.PaginatedOperationMethod<
  ListOfferingsRequest,
  ListOfferingsResponse,
  ListOfferingsError,
  Credentials | HttpClient.HttpClient,
  Offering
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(5408, __c169, 0) as any as S.Schema<ListOfferingsRequest>,
  output: __S(5410, __c169, 2) as any as S.Schema<ListOfferingsResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOfferings",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Offerings",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListReservationsError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List purchased reservations.
 */
export const listReservations: API.PaginatedOperationMethod<
  ListReservationsRequest,
  ListReservationsResponse,
  ListReservationsError,
  Credentials | HttpClient.HttpClient,
  Reservation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(5440, __c170, 0) as any as S.Schema<ListReservationsRequest>,
  output: __S(5442, __c170, 2) as any as S.Schema<ListReservationsResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReservations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Reservations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSdiSourcesError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List all the SdiSources in the AWS account.
 */
export const listSdiSources: API.PaginatedOperationMethod<
  ListSdiSourcesRequest,
  ListSdiSourcesResponse,
  ListSdiSourcesError,
  Credentials | HttpClient.HttpClient,
  SdiSourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(5472, __c171, 0) as any as S.Schema<ListSdiSourcesRequest>,
  output: __S(5474, __c171, 2) as any as S.Schema<ListSdiSourcesResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSdiSources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SdiSources",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSignalMapsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists signal maps.
 */
export const listSignalMaps: API.PaginatedOperationMethod<
  ListSignalMapsRequest,
  ListSignalMapsResponse,
  ListSignalMapsError,
  Credentials | HttpClient.HttpClient,
  SignalMapSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(5504, __c172, 0) as any as S.Schema<ListSignalMapsRequest>,
  output: __S(5507, __c172, 3) as any as S.Schema<ListSignalMapsResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSignalMaps",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SignalMaps",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Produces list of tags that have been created for a resource
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5536, __c173, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(5537, __c173, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListVersionsError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves an array of all the encoder engine versions that are available in this AWS account.
 */
export const listVersions: API.OperationMethod<
  ListVersionsRequest,
  ListVersionsResponse,
  ListVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5568, __c174, 0) as any as S.Schema<ListVersionsRequest>,
  output: __S(5569, __c174, 1) as any as S.Schema<ListVersionsResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVersions",
}));

export type PurchaseOfferingError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Purchase an offering and create a reservation.
 */
export const purchaseOffering: API.OperationMethod<
  PurchaseOfferingRequest,
  PurchaseOfferingResponse,
  PurchaseOfferingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5600, __c175, 0) as any as S.Schema<PurchaseOfferingRequest>,
  output: __S(5632, __c176, 0) as any as S.Schema<PurchaseOfferingResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PurchaseOffering",
}));

export type RebootInputDeviceError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Send a reboot command to the specified input device. The device will begin rebooting within a few seconds of sending the command. When the reboot is complete, the device's connection status will change to connected.
 */
export const rebootInputDevice: API.OperationMethod<
  RebootInputDeviceRequest,
  RebootInputDeviceResponse,
  RebootInputDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c2, 0) as any as S.Schema<RebootInputDeviceRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<RebootInputDeviceResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootInputDevice",
}));

export type RejectInputDeviceTransferError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Reject the transfer of the specified input device to your AWS account.
 */
export const rejectInputDeviceTransfer: API.OperationMethod<
  RejectInputDeviceTransferRequest,
  RejectInputDeviceTransferResponse,
  RejectInputDeviceTransferError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c3, 0) as any as S.Schema<RejectInputDeviceTransferRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<RejectInputDeviceTransferResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectInputDeviceTransfer",
}));

export type RestartChannelPipelinesError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Restart pipelines in one channel that is currently running.
 */
export const restartChannelPipelines: API.OperationMethod<
  RestartChannelPipelinesRequest,
  RestartChannelPipelinesResponse,
  RestartChannelPipelinesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c4, 0) as any as S.Schema<RestartChannelPipelinesRequest>,
  output: __S(129, __c4, 1) as any as S.Schema<RestartChannelPipelinesResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestartChannelPipelines",
}));

export type StartChannelError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Starts an existing channel
 */
export const startChannel: API.OperationMethod<
  StartChannelRequest,
  StartChannelResponse,
  StartChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c5, 0) as any as S.Schema<StartChannelRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<StartChannelResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartChannel",
}));

export type StartDeleteMonitorDeploymentError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Initiates a deployment to delete the monitor of the specified signal map.
 */
export const startDeleteMonitorDeployment: API.OperationMethod<
  StartDeleteMonitorDeploymentRequest,
  StartDeleteMonitorDeploymentResponse,
  StartDeleteMonitorDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c6, 0) as any as S.Schema<StartDeleteMonitorDeploymentRequest>,
  output: __S(3206, __c100, 6) as any as S.Schema<StartDeleteMonitorDeploymentResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDeleteMonitorDeployment",
}));

export type StartInputDeviceError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Start an input device that is attached to a MediaConnect flow. (There is no need to start a device that is attached to a MediaLive input; MediaLive starts the device when the channel starts.)
 */
export const startInputDevice: API.OperationMethod<
  StartInputDeviceRequest,
  StartInputDeviceResponse,
  StartInputDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c7, 0) as any as S.Schema<StartInputDeviceRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<StartInputDeviceResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartInputDevice",
}));

export type StartInputDeviceMaintenanceWindowError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Start a maintenance window for the specified input device. Starting a maintenance window will give the device up to two hours to install software. If the device was streaming prior to the maintenance, it will resume streaming when the software is fully installed. Devices automatically install updates while they are powered on and their MediaLive channels are stopped. A maintenance window allows you to update a device without having to stop MediaLive channels that use the device. The device must remain powered on and connected to the internet for the duration of the maintenance.
 */
export const startInputDeviceMaintenanceWindow: API.OperationMethod<
  StartInputDeviceMaintenanceWindowRequest,
  StartInputDeviceMaintenanceWindowResponse,
  StartInputDeviceMaintenanceWindowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c8, 0) as any as S.Schema<StartInputDeviceMaintenanceWindowRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<StartInputDeviceMaintenanceWindowResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartInputDeviceMaintenanceWindow",
}));

export type StartMonitorDeploymentError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Initiates a deployment to deploy the latest monitor of the specified signal map.
 */
export const startMonitorDeployment: API.OperationMethod<
  StartMonitorDeploymentRequest,
  StartMonitorDeploymentResponse,
  StartMonitorDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c9, 0) as any as S.Schema<StartMonitorDeploymentRequest>,
  output: __S(3206, __c100, 6) as any as S.Schema<StartMonitorDeploymentResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMonitorDeployment",
}));

export type StartMultiplexError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Start (run) the multiplex. Starting the multiplex does not start the channels. You must explicitly start each channel.
 */
export const startMultiplex: API.OperationMethod<
  StartMultiplexRequest,
  StartMultiplexResponse,
  StartMultiplexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c10, 0) as any as S.Schema<StartMultiplexRequest>,
  output: __S(2660, __c83, 4) as any as S.Schema<StartMultiplexResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMultiplex",
}));

export type StartUpdateSignalMapError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Initiates an update for the specified signal map. Will discover a new signal map if a changed discoveryEntryPointArn is provided.
 */
export const startUpdateSignalMap: API.OperationMethod<
  StartUpdateSignalMapRequest,
  StartUpdateSignalMapResponse,
  StartUpdateSignalMapError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c11, 0) as any as S.Schema<StartUpdateSignalMapRequest>,
  output: __S(3206, __c100, 6) as any as S.Schema<StartUpdateSignalMapResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartUpdateSignalMap",
}));

export type StopChannelError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Stops a running channel
 */
export const stopChannel: API.OperationMethod<
  StopChannelRequest,
  StopChannelResponse,
  StopChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c15, 0) as any as S.Schema<StopChannelRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<StopChannelResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopChannel",
}));

export type StopInputDeviceError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Stop an input device that is attached to a MediaConnect flow. (There is no need to stop a device that is attached to a MediaLive input; MediaLive automatically stops the device when the channel stops.)
 */
export const stopInputDevice: API.OperationMethod<
  StopInputDeviceRequest,
  StopInputDeviceResponse,
  StopInputDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c16, 0) as any as S.Schema<StopInputDeviceRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<StopInputDeviceResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopInputDevice",
}));

export type StopMultiplexError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Stops a running multiplex. If the multiplex isn't running, this action has no effect.
 */
export const stopMultiplex: API.OperationMethod<
  StopMultiplexRequest,
  StopMultiplexResponse,
  StopMultiplexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c17, 0) as any as S.Schema<StopMultiplexRequest>,
  output: __S(2660, __c83, 4) as any as S.Schema<StopMultiplexResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopMultiplex",
}));

export type TransferInputDeviceError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Start an input device transfer to another AWS account. After you make the request, the other account must accept or reject the transfer.
 */
export const transferInputDevice: API.OperationMethod<
  TransferInputDeviceRequest,
  TransferInputDeviceResponse,
  TransferInputDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c18, 0) as any as S.Schema<TransferInputDeviceRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<TransferInputDeviceResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TransferInputDevice",
}));

export type UpdateAccountConfigurationError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Update account configuration
 */
export const updateAccountConfiguration: API.OperationMethod<
  UpdateAccountConfigurationRequest,
  UpdateAccountConfigurationResponse,
  UpdateAccountConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c19, 0) as any as S.Schema<UpdateAccountConfigurationRequest>,
  output: __S(3937, __c123, 1) as any as S.Schema<UpdateAccountConfigurationResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountConfiguration",
}));

export type UpdateChannelError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Updates a channel.
 */
export const updateChannel: API.OperationMethod<
  UpdateChannelRequest,
  UpdateChannelResponse,
  UpdateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(641, __c20, 1) as any as S.Schema<UpdateChannelRequest>,
  output: __S(1536, __c48, 0) as any as S.Schema<UpdateChannelResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateChannel",
}));

export type UpdateChannelClassError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Changes the class of the channel.
 */
export const updateChannelClass: API.OperationMethod<
  UpdateChannelClassRequest,
  UpdateChannelClassResponse,
  UpdateChannelClassError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c22, 0) as any as S.Schema<UpdateChannelClassRequest>,
  output: __S(1536, __c48, 0) as any as S.Schema<UpdateChannelClassResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateChannelClass",
}));

export type UpdateChannelPlacementGroupError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Change the settings for a ChannelPlacementGroup.
 */
export const updateChannelPlacementGroup: API.OperationMethod<
  UpdateChannelPlacementGroupRequest,
  UpdateChannelPlacementGroupResponse,
  UpdateChannelPlacementGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c23, 0) as any as S.Schema<UpdateChannelPlacementGroupRequest>,
  output: __S(1952, __c61, 0) as any as S.Schema<UpdateChannelPlacementGroupResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateChannelPlacementGroup",
}));

export type UpdateCloudWatchAlarmTemplateError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the specified cloudwatch alarm template.
 */
export const updateCloudWatchAlarmTemplate: API.OperationMethod<
  UpdateCloudWatchAlarmTemplateRequest,
  UpdateCloudWatchAlarmTemplateResponse,
  UpdateCloudWatchAlarmTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c24, 0) as any as S.Schema<UpdateCloudWatchAlarmTemplateRequest>,
  output: __S(2016, __c63, 0) as any as S.Schema<UpdateCloudWatchAlarmTemplateResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCloudWatchAlarmTemplate",
}));

export type UpdateCloudWatchAlarmTemplateGroupError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the specified cloudwatch alarm template group.
 */
export const updateCloudWatchAlarmTemplateGroup: API.OperationMethod<
  UpdateCloudWatchAlarmTemplateGroupRequest,
  UpdateCloudWatchAlarmTemplateGroupResponse,
  UpdateCloudWatchAlarmTemplateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c25, 0) as any as S.Schema<UpdateCloudWatchAlarmTemplateGroupRequest>,
  output: __S(2080, __c65, 0) as any as S.Schema<UpdateCloudWatchAlarmTemplateGroupResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCloudWatchAlarmTemplateGroup",
}));

export type UpdateClusterError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Change the settings for a Cluster.
 */
export const updateCluster: API.OperationMethod<
  UpdateClusterRequest,
  UpdateClusterResponse,
  UpdateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c27, 0) as any as S.Schema<UpdateClusterRequest>,
  output: __S(865, __c27, 1) as any as S.Schema<UpdateClusterResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCluster",
}));

export type UpdateEventBridgeRuleTemplateError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the specified eventbridge rule template.
 */
export const updateEventBridgeRuleTemplate: API.OperationMethod<
  UpdateEventBridgeRuleTemplateRequest,
  UpdateEventBridgeRuleTemplateResponse,
  UpdateEventBridgeRuleTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c28, 0) as any as S.Schema<UpdateEventBridgeRuleTemplateRequest>,
  output: __S(2242, __c70, 2) as any as S.Schema<UpdateEventBridgeRuleTemplateResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEventBridgeRuleTemplate",
}));

export type UpdateEventBridgeRuleTemplateGroupError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the specified eventbridge rule template group.
 */
export const updateEventBridgeRuleTemplateGroup: API.OperationMethod<
  UpdateEventBridgeRuleTemplateGroupRequest,
  UpdateEventBridgeRuleTemplateGroupResponse,
  UpdateEventBridgeRuleTemplateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c29, 0) as any as S.Schema<UpdateEventBridgeRuleTemplateGroupRequest>,
  output: __S(2080, __c65, 0) as any as S.Schema<UpdateEventBridgeRuleTemplateGroupResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEventBridgeRuleTemplateGroup",
}));

export type UpdateInputError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Updates an input.
 */
export const updateInput: API.OperationMethod<
  UpdateInputRequest,
  UpdateInputResponse,
  UpdateInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c30, 0) as any as S.Schema<UpdateInputRequest>,
  output: __S(2400, __c75, 0) as any as S.Schema<UpdateInputResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInput",
}));

export type UpdateInputDeviceError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Updates the parameters for the input device.
 */
export const updateInputDevice: API.OperationMethod<
  UpdateInputDeviceRequest,
  UpdateInputDeviceResponse,
  UpdateInputDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(993, __c31, 1) as any as S.Schema<UpdateInputDeviceRequest>,
  output: __S(4134, __c129, 6) as any as S.Schema<UpdateInputDeviceResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInputDevice",
}));

export type UpdateInputSecurityGroupError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Update an Input Security Group's Whilelists.
 */
export const updateInputSecurityGroup: API.OperationMethod<
  UpdateInputSecurityGroupRequest,
  UpdateInputSecurityGroupResponse,
  UpdateInputSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c32, 0) as any as S.Schema<UpdateInputSecurityGroupRequest>,
  output: __S(2496, __c78, 0) as any as S.Schema<UpdateInputSecurityGroupResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInputSecurityGroup",
}));

export type UpdateMultiplexError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Updates a multiplex.
 */
export const updateMultiplex: API.OperationMethod<
  UpdateMultiplexRequest,
  UpdateMultiplexResponse,
  UpdateMultiplexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1057, __c33, 1) as any as S.Schema<UpdateMultiplexRequest>,
  output: __S(2624, __c82, 0) as any as S.Schema<UpdateMultiplexResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMultiplex",
}));

export type UpdateMultiplexProgramError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Update a program in a multiplex.
 */
export const updateMultiplexProgram: API.OperationMethod<
  UpdateMultiplexProgramRequest,
  UpdateMultiplexProgramResponse,
  UpdateMultiplexProgramError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c34, 0) as any as S.Schema<UpdateMultiplexProgramRequest>,
  output: __S(2720, __c85, 0) as any as S.Schema<UpdateMultiplexProgramResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMultiplexProgram",
}));

export type UpdateNetworkError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Change the settings for a Network.
 */
export const updateNetwork: API.OperationMethod<
  UpdateNetworkRequest,
  UpdateNetworkResponse,
  UpdateNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c35, 0) as any as S.Schema<UpdateNetworkRequest>,
  output: __S(2848, __c89, 0) as any as S.Schema<UpdateNetworkResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNetwork",
}));

export type UpdateNodeError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Change the settings for a Node.
 */
export const updateNode: API.OperationMethod<
  UpdateNodeRequest,
  UpdateNodeResponse,
  UpdateNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c36, 0) as any as S.Schema<UpdateNodeRequest>,
  output: __S(2944, __c92, 0) as any as S.Schema<UpdateNodeResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNode",
}));

export type UpdateNodeStateError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Update the state of a node.
 */
export const updateNodeState: API.OperationMethod<
  UpdateNodeStateRequest,
  UpdateNodeStateResponse,
  UpdateNodeStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c38, 0) as any as S.Schema<UpdateNodeStateRequest>,
  output: __S(2944, __c92, 0) as any as S.Schema<UpdateNodeStateResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNodeState",
}));

export type UpdateReservationError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Update reservation.
 */
export const updateReservation: API.OperationMethod<
  UpdateReservationRequest,
  UpdateReservationResponse,
  UpdateReservationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c39, 0) as any as S.Schema<UpdateReservationRequest>,
  output: __S(5632, __c176, 0) as any as S.Schema<UpdateReservationResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReservation",
}));

export type UpdateSdiSourceError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Change some of the settings in an SdiSource.
 */
export const updateSdiSource: API.OperationMethod<
  UpdateSdiSourceRequest,
  UpdateSdiSourceResponse,
  UpdateSdiSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1280, __c40, 0) as any as S.Schema<UpdateSdiSourceRequest>,
  output: __S(3104, __c97, 0) as any as S.Schema<UpdateSdiSourceResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSdiSource",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InputDeviceId: S.String.pipe(T.HttpLabel("InputDeviceId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/prod/inputDevices/{InputDeviceId}/accept" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AcceptInputDeviceTransferRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "AcceptInputDeviceTransferResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Force: S.optional(S.String),
          InputDeviceId: S.String.pipe(T.HttpLabel("InputDeviceId")),
        })
          .pipe(S.encodeKeys({ Force: "force" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/prod/inputDevices/{InputDeviceId}/reboot" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "RebootInputDeviceRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InputDeviceId: S.String.pipe(T.HttpLabel("InputDeviceId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/prod/inputDevices/{InputDeviceId}/reject" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RejectInputDeviceTransferRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelId: S.String.pipe(T.HttpLabel("ChannelId")),
          PipelineIds: S.optional(__listOfChannelPipelineIdToRestart),
        })
          .pipe(S.encodeKeys({ PipelineIds: "pipelineIds" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/prod/channels/{ChannelId}/restartChannelPipelines" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "RestartChannelPipelinesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CdiInputSpecification: S.optional(__S(1792, __c56, 0)),
          ChannelClass: S.optional(S.String),
          Destinations: S.optional(__listOfOutputDestination),
          EgressEndpoints: S.optional(__listOfChannelEgressEndpoint),
          EncoderSettings: S.optional(__S(1724, __c53, 28)),
          Id: S.optional(S.String),
          InputAttachments: S.optional(__listOfInputAttachment),
          InputSpecification: S.optional(__S(1853, __c57, 29)),
          LogLevel: S.optional(S.String),
          Maintenance: S.optional(__S(1861, __c58, 5)),
          MaintenanceStatus: S.optional(S.String),
          Name: S.optional(S.String),
          PipelineDetails: S.optional(__listOfPipelineDetail),
          PipelinesRunningCount: S.optional(S.Number),
          RoleArn: S.optional(S.String),
          State: S.optional(S.String),
          Tags: S.optional(__S(1568, __c49, 0)),
          Vpc: S.optional(__S(1862, __c58, 6)),
          AnywhereSettings: S.optional(__S(1854, __c57, 30)),
          ChannelEngineVersion: S.optional(__S(1888, __c59, 0)),
          LinkedChannelSettings: S.optional(__S(1864, __c58, 8)),
          ChannelSecurityGroups: S.optional(__listOf__string),
          InferenceSettings: S.optional(__S(1858, __c58, 2)),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            CdiInputSpecification: "cdiInputSpecification",
            ChannelClass: "channelClass",
            Destinations: "destinations",
            EgressEndpoints: "egressEndpoints",
            EncoderSettings: "encoderSettings",
            Id: "id",
            InputAttachments: "inputAttachments",
            InputSpecification: "inputSpecification",
            LogLevel: "logLevel",
            Maintenance: "maintenance",
            MaintenanceStatus: "maintenanceStatus",
            Name: "name",
            PipelineDetails: "pipelineDetails",
            PipelinesRunningCount: "pipelinesRunningCount",
            RoleArn: "roleArn",
            State: "state",
            Tags: "tags",
            Vpc: "vpc",
            AnywhereSettings: "anywhereSettings",
            ChannelEngineVersion: "channelEngineVersion",
            LinkedChannelSettings: "linkedChannelSettings",
            ChannelSecurityGroups: "channelSecurityGroups",
            InferenceSettings: "inferenceSettings",
          }),
        ),
      ).annotate({ identifier: "RestartChannelPipelinesResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChannelId: S.String.pipe(T.HttpLabel("ChannelId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/prod/channels/{ChannelId}/start" }),
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
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/prod/signal-maps/{Identifier}/monitor-deployment" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartDeleteMonitorDeploymentRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InputDeviceId: S.String.pipe(T.HttpLabel("InputDeviceId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/prod/inputDevices/{InputDeviceId}/start" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartInputDeviceRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InputDeviceId: S.String.pipe(T.HttpLabel("InputDeviceId")) }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/prod/inputDevices/{InputDeviceId}/startInputDeviceMaintenanceWindow",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartInputDeviceMaintenanceWindowRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DryRun: S.optional(S.Boolean),
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
        })
          .pipe(S.encodeKeys({ DryRun: "dryRun" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/prod/signal-maps/{Identifier}/monitor-deployment" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "StartMonitorDeploymentRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MultiplexId: S.String.pipe(T.HttpLabel("MultiplexId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/prod/multiplexes/{MultiplexId}/start" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartMultiplexRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CloudWatchAlarmTemplateGroupIdentifiers: S.optional(__listOf__stringPatternS),
          Description: S.optional(S.String),
          DiscoveryEntryPointArn: S.optional(S.String),
          EventBridgeRuleTemplateGroupIdentifiers: S.optional(__listOf__stringPatternS),
          ForceRediscovery: S.optional(S.Boolean),
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          Name: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              CloudWatchAlarmTemplateGroupIdentifiers: "cloudWatchAlarmTemplateGroupIdentifiers",
              Description: "description",
              DiscoveryEntryPointArn: "discoveryEntryPointArn",
              EventBridgeRuleTemplateGroupIdentifiers: "eventBridgeRuleTemplateGroupIdentifiers",
              ForceRediscovery: "forceRediscovery",
              Name: "name",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PATCH", uri: "/prod/signal-maps/{Identifier}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "StartUpdateSignalMapRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelIds: S.optional(__listOf__string),
          InputIds: S.optional(__listOf__string),
          InputSecurityGroupIds: S.optional(__listOf__string),
          MultiplexIds: S.optional(__listOf__string),
        })
          .pipe(
            S.encodeKeys({
              ChannelIds: "channelIds",
              InputIds: "inputIds",
              InputSecurityGroupIds: "inputSecurityGroupIds",
              MultiplexIds: "multiplexIds",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/prod/batch/delete" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "BatchDeleteRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Code: S.optional(S.String),
          Id: S.optional(S.String),
          Message: S.optional(S.String),
        }).pipe(S.encodeKeys({ Arn: "arn", Code: "code", Id: "id", Message: "message" })),
      ).annotate({ identifier: "BatchFailedResultModel" });
    case 1:
      return S.Array(__S(416, __c13, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Id: S.optional(S.String),
          State: S.optional(S.String),
        }).pipe(S.encodeKeys({ Arn: "arn", Id: "id", State: "state" })),
      ).annotate({ identifier: "BatchSuccessfulResultModel" });
    case 3:
      return S.Array(__S(418, __c13, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Failed: S.optional(__listOfBatchFailedResultModel),
          Successful: S.optional(__listOfBatchSuccessfulResultModel),
        }).pipe(S.encodeKeys({ Failed: "failed", Successful: "successful" })),
      ).annotate({ identifier: "BatchDeleteResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChannelId: S.String.pipe(T.HttpLabel("ChannelId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/prod/channels/{ChannelId}/stop" }),
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
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InputDeviceId: S.String.pipe(T.HttpLabel("InputDeviceId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/prod/inputDevices/{InputDeviceId}/stop" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopInputDeviceRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MultiplexId: S.String.pipe(T.HttpLabel("MultiplexId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/prod/multiplexes/{MultiplexId}/stop" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopMultiplexRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InputDeviceId: S.String.pipe(T.HttpLabel("InputDeviceId")),
          TargetCustomerId: S.optional(S.String),
          TargetRegion: S.optional(S.String),
          TransferMessage: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              TargetCustomerId: "targetCustomerId",
              TargetRegion: "targetRegion",
              TransferMessage: "transferMessage",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/prod/inputDevices/{InputDeviceId}/transfer" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "TransferInputDeviceRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountConfiguration: S.optional(__S(3936, __c123, 0)) })
          .pipe(S.encodeKeys({ AccountConfiguration: "accountConfiguration" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/prod/accountConfiguration" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateAccountConfigurationRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaintenanceDay: S.optional(S.String),
          MaintenanceScheduledDate: S.optional(S.String),
          MaintenanceStartTime: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            MaintenanceDay: "maintenanceDay",
            MaintenanceScheduledDate: "maintenanceScheduledDate",
            MaintenanceStartTime: "maintenanceStartTime",
          }),
        ),
      ).annotate({ identifier: "MaintenanceUpdateSettings" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CdiInputSpecification: S.optional(__S(1792, __c56, 0)),
          ChannelId: S.String.pipe(T.HttpLabel("ChannelId")),
          Destinations: S.optional(__listOfOutputDestination),
          EncoderSettings: S.optional(__S(1724, __c53, 28)),
          InputAttachments: S.optional(__listOfInputAttachment),
          InputSpecification: S.optional(__S(1853, __c57, 29)),
          LogLevel: S.optional(S.String),
          Maintenance: S.optional(__S(640, __c20, 0)),
          Name: S.optional(S.String),
          RoleArn: S.optional(S.String),
          ChannelEngineVersion: S.optional(__S(1504, __c47, 0)),
          DryRun: S.optional(S.Boolean),
          AnywhereSettings: S.optional(__S(1854, __c57, 30)),
          LinkedChannelSettings: S.optional(__S(1506, __c47, 2)),
          ChannelSecurityGroups: S.optional(__listOf__string),
          InferenceSettings: S.optional(__S(1858, __c58, 2)),
          SpecialRouterSettings: S.optional(__S(672, __c21, 0)),
        })
          .pipe(
            S.encodeKeys({
              CdiInputSpecification: "cdiInputSpecification",
              Destinations: "destinations",
              EncoderSettings: "encoderSettings",
              InputAttachments: "inputAttachments",
              InputSpecification: "inputSpecification",
              LogLevel: "logLevel",
              Maintenance: "maintenance",
              Name: "name",
              RoleArn: "roleArn",
              ChannelEngineVersion: "channelEngineVersion",
              DryRun: "dryRun",
              AnywhereSettings: "anywhereSettings",
              LinkedChannelSettings: "linkedChannelSettings",
              ChannelSecurityGroups: "channelSecurityGroups",
              InferenceSettings: "inferenceSettings",
              SpecialRouterSettings: "specialRouterSettings",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/prod/channels/{ChannelId}" }),
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
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RouterArn: S.optional(S.String) }).pipe(
          S.encodeKeys({ RouterArn: "routerArn" }),
        ),
      ).annotate({ identifier: "SpecialRouterSettings" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelClass: S.optional(S.String),
          ChannelId: S.String.pipe(T.HttpLabel("ChannelId")),
          Destinations: S.optional(__listOfOutputDestination),
        })
          .pipe(S.encodeKeys({ ChannelClass: "channelClass", Destinations: "destinations" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/prod/channels/{ChannelId}/channelClass" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateChannelClassRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelPlacementGroupId: S.String.pipe(T.HttpLabel("ChannelPlacementGroupId")),
          ClusterId: S.String.pipe(T.HttpLabel("ClusterId")),
          Name: S.optional(S.String),
          Nodes: S.optional(__listOf__string),
        })
          .pipe(S.encodeKeys({ Name: "name", Nodes: "nodes" }))
          .pipe(
            T.all(
              T.Http({
                method: "PUT",
                uri: "/prod/clusters/{ClusterId}/channelplacementgroups/{ChannelPlacementGroupId}",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateChannelPlacementGroupRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ComparisonOperator: S.optional(S.String),
          DatapointsToAlarm: S.optional(S.Number),
          Description: S.optional(S.String),
          EvaluationPeriods: S.optional(S.Number),
          GroupIdentifier: S.optional(S.String),
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          MetricName: S.optional(S.String),
          Name: S.optional(S.String),
          Period: S.optional(S.Number),
          Statistic: S.optional(S.String),
          TargetResourceType: S.optional(S.String),
          Threshold: S.optional(S.Number),
          TreatMissingData: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              ComparisonOperator: "comparisonOperator",
              DatapointsToAlarm: "datapointsToAlarm",
              Description: "description",
              EvaluationPeriods: "evaluationPeriods",
              GroupIdentifier: "groupIdentifier",
              MetricName: "metricName",
              Name: "name",
              Period: "period",
              Statistic: "statistic",
              TargetResourceType: "targetResourceType",
              Threshold: "threshold",
              TreatMissingData: "treatMissingData",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PATCH", uri: "/prod/cloudwatch-alarm-templates/{Identifier}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateCloudWatchAlarmTemplateRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
        })
          .pipe(S.encodeKeys({ Description: "description" }))
          .pipe(
            T.all(
              T.Http({
                method: "PATCH",
                uri: "/prod/cloudwatch-alarm-template-groups/{Identifier}",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateCloudWatchAlarmTemplateGroupRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelIds: S.optional(__listOf__string),
          MultiplexIds: S.optional(__listOf__string),
        })
          .pipe(S.encodeKeys({ ChannelIds: "channelIds", MultiplexIds: "multiplexIds" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/prod/batch/start" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "BatchStartRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.String.pipe(T.HttpLabel("ClusterId")),
          Name: S.optional(S.String),
          NetworkSettings: S.optional(__S(2178, __c68, 2)),
        })
          .pipe(S.encodeKeys({ Name: "name", NetworkSettings: "networkSettings" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/prod/clusters/{ClusterId}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateClusterRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          ChannelIds: S.optional(__listOf__string),
          ClusterType: S.optional(S.String),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          NetworkSettings: S.optional(__S(2178, __c68, 2)),
          State: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            ChannelIds: "channelIds",
            ClusterType: "clusterType",
            Id: "id",
            Name: "name",
            NetworkSettings: "networkSettings",
            State: "state",
          }),
        ),
      ).annotate({ identifier: "UpdateClusterResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          EventTargets: S.optional(__listOfEventBridgeRuleTemplateTarget),
          EventType: S.optional(S.String),
          GroupIdentifier: S.optional(S.String),
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          Name: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              Description: "description",
              EventTargets: "eventTargets",
              EventType: "eventType",
              GroupIdentifier: "groupIdentifier",
              Name: "name",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PATCH", uri: "/prod/eventbridge-rule-templates/{Identifier}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateEventBridgeRuleTemplateRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
        })
          .pipe(S.encodeKeys({ Description: "description" }))
          .pipe(
            T.all(
              T.Http({
                method: "PATCH",
                uri: "/prod/eventbridge-rule-template-groups/{Identifier}",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateEventBridgeRuleTemplateGroupRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Destinations: S.optional(__listOfInputDestinationRequest),
          InputDevices: S.optional(__listOfInputDeviceRequest),
          InputId: S.String.pipe(T.HttpLabel("InputId")),
          InputSecurityGroups: S.optional(__listOf__string),
          MediaConnectFlows: S.optional(__listOfMediaConnectFlowRequest),
          Name: S.optional(S.String),
          RoleArn: S.optional(S.String),
          Sources: S.optional(__listOfInputSourceRequest),
          SrtSettings: S.optional(__S(2442, __c76, 10)),
          MulticastSettings: S.optional(__S(2445, __c76, 13)),
          Smpte2110ReceiverGroupSettings: S.optional(__S(2451, __c76, 19)),
          SdiSources: S.optional(InputSdiSources),
          SpecialRouterSettings: S.optional(__S(672, __c21, 0)),
        })
          .pipe(
            S.encodeKeys({
              Destinations: "destinations",
              InputDevices: "inputDevices",
              InputSecurityGroups: "inputSecurityGroups",
              MediaConnectFlows: "mediaConnectFlows",
              Name: "name",
              RoleArn: "roleArn",
              Sources: "sources",
              SrtSettings: "srtSettings",
              MulticastSettings: "multicastSettings",
              Smpte2110ReceiverGroupSettings: "smpte2110ReceiverGroupSettings",
              SdiSources: "sdiSources",
              SpecialRouterSettings: "specialRouterSettings",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/prod/inputs/{InputId}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateInputRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfiguredInput: S.optional(S.String),
          MaxBitrate: S.optional(S.Number),
          LatencyMs: S.optional(S.Number),
          Codec: S.optional(S.String),
          MediaconnectSettings: S.optional(__S(4130, __c129, 2)),
          AudioChannelPairs: S.optional(__listOfInputDeviceConfigurableAudioChannelPairConfig),
          InputResolution: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ConfiguredInput: "configuredInput",
            MaxBitrate: "maxBitrate",
            LatencyMs: "latencyMs",
            Codec: "codec",
            MediaconnectSettings: "mediaconnectSettings",
            AudioChannelPairs: "audioChannelPairs",
            InputResolution: "inputResolution",
          }),
        ),
      ).annotate({ identifier: "InputDeviceConfigurableSettings" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          HdDeviceSettings: S.optional(__S(992, __c31, 0)),
          InputDeviceId: S.String.pipe(T.HttpLabel("InputDeviceId")),
          Name: S.optional(S.String),
          UhdDeviceSettings: S.optional(__S(992, __c31, 0)),
          AvailabilityZone: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              HdDeviceSettings: "hdDeviceSettings",
              Name: "name",
              UhdDeviceSettings: "uhdDeviceSettings",
              AvailabilityZone: "availabilityZone",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/prod/inputDevices/{InputDeviceId}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateInputDeviceRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InputSecurityGroupId: S.String.pipe(T.HttpLabel("InputSecurityGroupId")),
          Tags: S.optional(__S(1568, __c49, 0)),
          WhitelistRules: S.optional(__listOfInputWhitelistRuleCidr),
        })
          .pipe(S.encodeKeys({ Tags: "tags", WhitelistRules: "whitelistRules" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/prod/inputSecurityGroups/{InputSecurityGroupId}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateInputSecurityGroupRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(2753, __c86, 1).pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          MultiplexId: S.String.pipe(T.HttpLabel("MultiplexId")),
          MultiplexSettings: S.optional(__S(2656, __c83, 0)),
          Name: S.optional(S.String),
          PacketIdentifiersMapping: S.optional(__S(1056, __c33, 0)),
        })
          .pipe(
            S.encodeKeys({
              MultiplexSettings: "multiplexSettings",
              Name: "name",
              PacketIdentifiersMapping: "packetIdentifiersMapping",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/prod/multiplexes/{MultiplexId}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateMultiplexRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MultiplexId: S.String.pipe(T.HttpLabel("MultiplexId")),
          MultiplexProgramSettings: S.optional(__S(2787, __c87, 3)),
          ProgramName: S.String.pipe(T.HttpLabel("ProgramName")),
        })
          .pipe(S.encodeKeys({ MultiplexProgramSettings: "multiplexProgramSettings" }))
          .pipe(
            T.all(
              T.Http({
                method: "PUT",
                uri: "/prod/multiplexes/{MultiplexId}/programs/{ProgramName}",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateMultiplexProgramRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IpPools: S.optional(__listOfIpPoolUpdateRequest),
          Name: S.optional(S.String),
          NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
          Routes: S.optional(__listOfRouteUpdateRequest),
        })
          .pipe(S.encodeKeys({ IpPools: "ipPools", Name: "name", Routes: "routes" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/prod/networks/{NetworkId}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateNetworkRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.String.pipe(T.HttpLabel("ClusterId")),
          Name: S.optional(S.String),
          NodeId: S.String.pipe(T.HttpLabel("NodeId")),
          Role: S.optional(S.String),
          SdiSourceMappings: S.optional(__S(2977, __c93, 1)),
        })
          .pipe(
            S.encodeKeys({ Name: "name", Role: "role", SdiSourceMappings: "sdiSourceMappings" }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/prod/clusters/{ClusterId}/nodes/{NodeId}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateNodeRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelIds: S.optional(__listOf__string),
          MultiplexIds: S.optional(__listOf__string),
        })
          .pipe(S.encodeKeys({ ChannelIds: "channelIds", MultiplexIds: "multiplexIds" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/prod/batch/stop" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "BatchStopRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.String.pipe(T.HttpLabel("ClusterId")),
          NodeId: S.String.pipe(T.HttpLabel("NodeId")),
          State: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ State: "state" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/prod/clusters/{ClusterId}/nodes/{NodeId}/state" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateNodeStateRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          RenewalSettings: S.optional(__S(3744, __c117, 0)),
          ReservationId: S.String.pipe(T.HttpLabel("ReservationId")),
        })
          .pipe(S.encodeKeys({ Name: "name", RenewalSettings: "renewalSettings" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/prod/reservations/{ReservationId}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateReservationRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Mode: S.optional(S.String),
          Name: S.optional(S.String),
          SdiSourceId: S.String.pipe(T.HttpLabel("SdiSourceId")),
          Type: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ Mode: "mode", Name: "name", Type: "type" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/prod/sdiSources/{SdiSourceId}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateSdiSourceRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ScheduleActions: S.optional(__listOfScheduleAction) }).pipe(
          S.encodeKeys({ ScheduleActions: "scheduleActions" }),
        ),
      ).annotate({ identifier: "BatchScheduleActionCreateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ActionNames: S.optional(__listOf__string) }).pipe(
          S.encodeKeys({ ActionNames: "actionNames" }),
        ),
      ).annotate({ identifier: "BatchScheduleActionDeleteRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ChannelId: S.String.pipe(T.HttpLabel("ChannelId")),
          Creates: S.optional(__S(1312, __c41, 0)),
          Deletes: S.optional(__S(1313, __c41, 1)),
        })
          .pipe(S.encodeKeys({ Creates: "creates", Deletes: "deletes" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/prod/channels/{ChannelId}/schedule" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "BatchUpdateScheduleRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Creates: S.optional(__S(1312, __c41, 0)),
          Deletes: S.optional(__S(1312, __c41, 0)),
        }).pipe(S.encodeKeys({ Creates: "creates", Deletes: "deletes" })),
      ).annotate({ identifier: "BatchUpdateScheduleResponse" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PasswordParam: S.optional(S.String),
          Uri: S.optional(S.String),
          Username: S.optional(S.String),
        }).pipe(S.encodeKeys({ PasswordParam: "passwordParam", Uri: "uri", Username: "username" })),
      ).annotate({ identifier: "InputLocation" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Tag: S.optional(S.String), Id3: S.optional(S.String) }).pipe(
          S.encodeKeys({ Tag: "tag", Id3: "id3" }),
        ),
      ).annotate({ identifier: "HlsId3SegmentTaggingScheduleActionSettings" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Id3: S.optional(S.String) }).pipe(S.encodeKeys({ Id3: "id3" })),
      ).annotate({ identifier: "HlsTimedMetadataScheduleActionSettings" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Timecode: S.optional(S.String) }).pipe(S.encodeKeys({ Timecode: "timecode" })),
      ).annotate({ identifier: "StartTimecode" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          LastFrameClippingBehavior: S.optional(S.String),
          Timecode: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            LastFrameClippingBehavior: "lastFrameClippingBehavior",
            Timecode: "timecode",
          }),
        ),
      ).annotate({ identifier: "StopTimecode" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          InputTimecodeSource: S.optional(S.String),
          StartTimecode: S.optional(__S(1378, __c43, 2)),
          StopTimecode: S.optional(__S(1379, __c43, 3)),
        }).pipe(
          S.encodeKeys({
            InputTimecodeSource: "inputTimecodeSource",
            StartTimecode: "startTimecode",
            StopTimecode: "stopTimecode",
          }),
        ),
      ).annotate({ identifier: "InputClippingSettings" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          InputAttachmentNameReference: S.optional(S.String),
          InputClippingSettings: S.optional(__S(1380, __c43, 4)),
          UrlPath: S.optional(__listOf__string),
        }).pipe(
          S.encodeKeys({
            InputAttachmentNameReference: "inputAttachmentNameReference",
            InputClippingSettings: "inputClippingSettings",
            UrlPath: "urlPath",
          }),
        ),
      ).annotate({ identifier: "InputPrepareScheduleActionSettings" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Duration: S.optional(S.Number),
          PasswordParam: S.optional(S.String),
          Url: S.optional(S.String),
          Username: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Duration: "duration",
            PasswordParam: "passwordParam",
            Url: "url",
            Username: "username",
          }),
        ),
      ).annotate({ identifier: "MotionGraphicsActivateScheduleActionSettings" });
    case 7:
      return S.suspend(() =>
        S.Struct({ PipelineId: S.optional(S.String) }).pipe(
          S.encodeKeys({ PipelineId: "pipelineId" }),
        ),
      ).annotate({ identifier: "PipelinePauseStateSettings" });
    case 8:
      return S.Array(__S(1383, __c43, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({ Pipelines: S.optional(__listOfPipelinePauseStateSettings) }).pipe(
          S.encodeKeys({ Pipelines: "pipelines" }),
        ),
      ).annotate({ identifier: "PauseStateScheduleActionSettings" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          InputAttachmentNameReference: S.optional(S.String),
          Mode: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            InputAttachmentNameReference: "inputAttachmentNameReference",
            Mode: "mode",
          }),
        ),
      ).annotate({ identifier: "Scte35InputScheduleActionSettings" });
    case 11:
      return S.suspend(() =>
        S.Struct({ SpliceEventId: S.optional(S.Number) }).pipe(
          S.encodeKeys({ SpliceEventId: "spliceEventId" }),
        ),
      ).annotate({ identifier: "Scte35ReturnToNetworkScheduleActionSettings" });
    case 12:
      return S.suspend(() =>
        S.Struct({ Duration: S.optional(S.Number), SpliceEventId: S.optional(S.Number) }).pipe(
          S.encodeKeys({ Duration: "duration", SpliceEventId: "spliceEventId" }),
        ),
      ).annotate({ identifier: "Scte35SpliceInsertScheduleActionSettings" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          ArchiveAllowedFlag: S.optional(S.String),
          DeviceRestrictions: S.optional(S.String),
          NoRegionalBlackoutFlag: S.optional(S.String),
          WebDeliveryAllowedFlag: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ArchiveAllowedFlag: "archiveAllowedFlag",
            DeviceRestrictions: "deviceRestrictions",
            NoRegionalBlackoutFlag: "noRegionalBlackoutFlag",
            WebDeliveryAllowedFlag: "webDeliveryAllowedFlag",
          }),
        ),
      ).annotate({ identifier: "Scte35DeliveryRestrictions" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          DeliveryRestrictions: S.optional(__S(1389, __c43, 13)),
          SegmentNum: S.optional(S.Number),
          SegmentationCancelIndicator: S.optional(S.String),
          SegmentationDuration: S.optional(S.Number),
          SegmentationEventId: S.optional(S.Number),
          SegmentationTypeId: S.optional(S.Number),
          SegmentationUpid: S.optional(S.String),
          SegmentationUpidType: S.optional(S.Number),
          SegmentsExpected: S.optional(S.Number),
          SubSegmentNum: S.optional(S.Number),
          SubSegmentsExpected: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            DeliveryRestrictions: "deliveryRestrictions",
            SegmentNum: "segmentNum",
            SegmentationCancelIndicator: "segmentationCancelIndicator",
            SegmentationDuration: "segmentationDuration",
            SegmentationEventId: "segmentationEventId",
            SegmentationTypeId: "segmentationTypeId",
            SegmentationUpid: "segmentationUpid",
            SegmentationUpidType: "segmentationUpidType",
            SegmentsExpected: "segmentsExpected",
            SubSegmentNum: "subSegmentNum",
            SubSegmentsExpected: "subSegmentsExpected",
          }),
        ),
      ).annotate({ identifier: "Scte35SegmentationDescriptor" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          SegmentationDescriptorScte35DescriptorSettings: S.optional(__S(1390, __c43, 14)),
        }).pipe(
          S.encodeKeys({
            SegmentationDescriptorScte35DescriptorSettings:
              "segmentationDescriptorScte35DescriptorSettings",
          }),
        ),
      ).annotate({ identifier: "Scte35DescriptorSettings" });
    case 16:
      return S.suspend(() =>
        S.Struct({ Scte35DescriptorSettings: S.optional(__S(1391, __c43, 15)) }).pipe(
          S.encodeKeys({ Scte35DescriptorSettings: "scte35DescriptorSettings" }),
        ),
      ).annotate({ identifier: "Scte35Descriptor" });
    case 17:
      return S.Array(__S(1392, __c43, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({ Scte35Descriptors: S.optional(__listOfScte35Descriptor) }).pipe(
          S.encodeKeys({ Scte35Descriptors: "scte35Descriptors" }),
        ),
      ).annotate({ identifier: "Scte35TimeSignalScheduleActionSettings" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          Duration: S.optional(S.Number),
          FadeIn: S.optional(S.Number),
          FadeOut: S.optional(S.Number),
          Height: S.optional(S.Number),
          Image: S.optional(__S(1344, __c42, 0)),
          ImageX: S.optional(S.Number),
          ImageY: S.optional(S.Number),
          Layer: S.optional(S.Number),
          Opacity: S.optional(S.Number),
          Width: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            Duration: "duration",
            FadeIn: "fadeIn",
            FadeOut: "fadeOut",
            Height: "height",
            Image: "image",
            ImageX: "imageX",
            ImageY: "imageY",
            Layer: "layer",
            Opacity: "opacity",
            Width: "width",
          }),
        ),
      ).annotate({ identifier: "StaticImageActivateScheduleActionSettings" });
    case 20:
      return S.suspend(() =>
        S.Struct({ FadeOut: S.optional(S.Number), Layer: S.optional(S.Number) }).pipe(
          S.encodeKeys({ FadeOut: "fadeOut", Layer: "layer" }),
        ),
      ).annotate({ identifier: "StaticImageDeactivateScheduleActionSettings" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          Duration: S.optional(S.Number),
          FadeIn: S.optional(S.Number),
          FadeOut: S.optional(S.Number),
          Height: S.optional(S.Number),
          Image: S.optional(__S(1344, __c42, 0)),
          ImageX: S.optional(S.Number),
          ImageY: S.optional(S.Number),
          Layer: S.optional(S.Number),
          Opacity: S.optional(S.Number),
          OutputNames: S.optional(__listOf__string),
          Width: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            Duration: "duration",
            FadeIn: "fadeIn",
            FadeOut: "fadeOut",
            Height: "height",
            Image: "image",
            ImageX: "imageX",
            ImageY: "imageY",
            Layer: "layer",
            Opacity: "opacity",
            OutputNames: "outputNames",
            Width: "width",
          }),
        ),
      ).annotate({ identifier: "StaticImageOutputActivateScheduleActionSettings" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          FadeOut: S.optional(S.Number),
          Layer: S.optional(S.Number),
          OutputNames: S.optional(__listOf__string),
        }).pipe(S.encodeKeys({ FadeOut: "fadeOut", Layer: "layer", OutputNames: "outputNames" })),
      ).annotate({ identifier: "StaticImageOutputDeactivateScheduleActionSettings" });
    case 23:
      return S.suspend(() =>
        S.Struct({ Id3: S.optional(S.String), Tag: S.optional(S.String) }).pipe(
          S.encodeKeys({ Id3: "id3", Tag: "tag" }),
        ),
      ).annotate({ identifier: "Id3SegmentTaggingScheduleActionSettings" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          HlsId3SegmentTaggingSettings: S.optional(__S(1376, __c43, 0)),
          HlsTimedMetadataSettings: S.optional(__S(1377, __c43, 1)),
          InputPrepareSettings: S.optional(__S(1381, __c43, 5)),
          InputSwitchSettings: S.optional(__S(1381, __c43, 5)),
          MotionGraphicsImageActivateSettings: S.optional(__S(1382, __c43, 6)),
          MotionGraphicsImageDeactivateSettings: S.optional(__S(32, __c1, 0)),
          PauseStateSettings: S.optional(__S(1385, __c43, 9)),
          Scte35InputSettings: S.optional(__S(1386, __c43, 10)),
          Scte35ReturnToNetworkSettings: S.optional(__S(1387, __c43, 11)),
          Scte35SpliceInsertSettings: S.optional(__S(1388, __c43, 12)),
          Scte35TimeSignalSettings: S.optional(__S(1394, __c43, 18)),
          StaticImageActivateSettings: S.optional(__S(1395, __c43, 19)),
          StaticImageDeactivateSettings: S.optional(__S(1396, __c43, 20)),
          StaticImageOutputActivateSettings: S.optional(__S(1397, __c43, 21)),
          StaticImageOutputDeactivateSettings: S.optional(__S(1398, __c43, 22)),
          Id3SegmentTaggingSettings: S.optional(__S(1399, __c43, 23)),
          TimedMetadataSettings: S.optional(__S(1377, __c43, 1)),
        }).pipe(
          S.encodeKeys({
            HlsId3SegmentTaggingSettings: "hlsId3SegmentTaggingSettings",
            HlsTimedMetadataSettings: "hlsTimedMetadataSettings",
            InputPrepareSettings: "inputPrepareSettings",
            InputSwitchSettings: "inputSwitchSettings",
            MotionGraphicsImageActivateSettings: "motionGraphicsImageActivateSettings",
            MotionGraphicsImageDeactivateSettings: "motionGraphicsImageDeactivateSettings",
            PauseStateSettings: "pauseStateSettings",
            Scte35InputSettings: "scte35InputSettings",
            Scte35ReturnToNetworkSettings: "scte35ReturnToNetworkSettings",
            Scte35SpliceInsertSettings: "scte35SpliceInsertSettings",
            Scte35TimeSignalSettings: "scte35TimeSignalSettings",
            StaticImageActivateSettings: "staticImageActivateSettings",
            StaticImageDeactivateSettings: "staticImageDeactivateSettings",
            StaticImageOutputActivateSettings: "staticImageOutputActivateSettings",
            StaticImageOutputDeactivateSettings: "staticImageOutputDeactivateSettings",
            Id3SegmentTaggingSettings: "id3SegmentTaggingSettings",
            TimedMetadataSettings: "timedMetadataSettings",
          }),
        ),
      ).annotate({ identifier: "ScheduleActionSettings" });
    case 25:
      return S.suspend(() =>
        S.Struct({ Time: S.optional(S.String) }).pipe(S.encodeKeys({ Time: "time" })),
      ).annotate({ identifier: "FixedModeScheduleActionStartSettings" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          FollowPoint: S.optional(S.String),
          ReferenceActionName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({ FollowPoint: "followPoint", ReferenceActionName: "referenceActionName" }),
        ),
      ).annotate({ identifier: "FollowModeScheduleActionStartSettings" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          FixedModeScheduleActionStartSettings: S.optional(__S(1401, __c43, 25)),
          FollowModeScheduleActionStartSettings: S.optional(__S(1402, __c43, 26)),
          ImmediateModeScheduleActionStartSettings: S.optional(__S(32, __c1, 0)),
        }).pipe(
          S.encodeKeys({
            FixedModeScheduleActionStartSettings: "fixedModeScheduleActionStartSettings",
            FollowModeScheduleActionStartSettings: "followModeScheduleActionStartSettings",
            ImmediateModeScheduleActionStartSettings: "immediateModeScheduleActionStartSettings",
          }),
        ),
      ).annotate({ identifier: "ScheduleActionStartSettings" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          ActionName: S.optional(S.String),
          ScheduleActionSettings: S.optional(__S(1400, __c43, 24)),
          ScheduleActionStartSettings: S.optional(__S(1403, __c43, 27)),
        }).pipe(
          S.encodeKeys({
            ActionName: "actionName",
            ScheduleActionSettings: "scheduleActionSettings",
            ScheduleActionStartSettings: "scheduleActionStartSettings",
          }),
        ),
      ).annotate({ identifier: "ScheduleAction" });
    case 29:
      return S.Array(__S(1404, __c43, 28));
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InputDeviceId: S.String.pipe(T.HttpLabel("InputDeviceId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/prod/inputDevices/{InputDeviceId}/cancel" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelInputDeviceTransferRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.optional(S.String) })
          .pipe(S.encodeKeys({ Id: "id" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/prod/claimDevice" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "ClaimDeviceRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaintenanceDay: S.optional(S.String),
          MaintenanceStartTime: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            MaintenanceDay: "maintenanceDay",
            MaintenanceStartTime: "maintenanceStartTime",
          }),
        ),
      ).annotate({ identifier: "MaintenanceCreateSettings" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PublicAddressAllocationIds: S.optional(__listOf__string),
          SecurityGroupIds: S.optional(__listOf__string),
          SubnetIds: S.optional(__listOf__string),
        }).pipe(
          S.encodeKeys({
            PublicAddressAllocationIds: "publicAddressAllocationIds",
            SecurityGroupIds: "securityGroupIds",
            SubnetIds: "subnetIds",
          }),
        ),
      ).annotate({ identifier: "VpcOutputSettings" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          CdiInputSpecification: S.optional(__S(1792, __c56, 0)),
          ChannelClass: S.optional(S.String),
          Destinations: S.optional(__listOfOutputDestination),
          EncoderSettings: S.optional(__S(1724, __c53, 28)),
          InputAttachments: S.optional(__listOfInputAttachment),
          InputSpecification: S.optional(__S(1853, __c57, 29)),
          LogLevel: S.optional(S.String),
          Maintenance: S.optional(__S(1472, __c46, 0)),
          Name: S.optional(S.String),
          RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
          Reserved: S.optional(S.String),
          RoleArn: S.optional(S.String),
          Tags: S.optional(__S(1568, __c49, 0)),
          Vpc: S.optional(__S(1473, __c46, 1)),
          AnywhereSettings: S.optional(__S(1854, __c57, 30)),
          ChannelEngineVersion: S.optional(__S(1504, __c47, 0)),
          DryRun: S.optional(S.Boolean),
          LinkedChannelSettings: S.optional(__S(1506, __c47, 2)),
          ChannelSecurityGroups: S.optional(__listOf__string),
          InferenceSettings: S.optional(__S(1858, __c58, 2)),
        })
          .pipe(
            S.encodeKeys({
              CdiInputSpecification: "cdiInputSpecification",
              ChannelClass: "channelClass",
              Destinations: "destinations",
              EncoderSettings: "encoderSettings",
              InputAttachments: "inputAttachments",
              InputSpecification: "inputSpecification",
              LogLevel: "logLevel",
              Maintenance: "maintenance",
              Name: "name",
              RequestId: "requestId",
              Reserved: "reserved",
              RoleArn: "roleArn",
              Tags: "tags",
              Vpc: "vpc",
              AnywhereSettings: "anywhereSettings",
              ChannelEngineVersion: "channelEngineVersion",
              DryRun: "dryRun",
              LinkedChannelSettings: "linkedChannelSettings",
              ChannelSecurityGroups: "channelSecurityGroups",
              InferenceSettings: "inferenceSettings",
            }),
          )
          .pipe(
            T.all(T.Http({ method: "POST", uri: "/prod/channels" }), svc, auth, proto, ver, rules),
          ),
      ).annotate({ identifier: "CreateChannelRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Version: S.optional(S.String) }).pipe(S.encodeKeys({ Version: "version" })),
      ).annotate({ identifier: "ChannelEngineVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ LinkedChannelType: S.optional(S.String) }).pipe(
          S.encodeKeys({ LinkedChannelType: "linkedChannelType" }),
        ),
      ).annotate({ identifier: "PrimaryChannelSettings" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          FollowerChannelSettings: S.optional(__S(1855, __c57, 31)),
          PrimaryChannelSettings: S.optional(__S(1505, __c47, 1)),
        }).pipe(
          S.encodeKeys({
            FollowerChannelSettings: "followerChannelSettings",
            PrimaryChannelSettings: "primaryChannelSettings",
          }),
        ),
      ).annotate({ identifier: "LinkedChannelSettings" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Channel: S.optional(__S(1760, __c55, 0)) }).pipe(
          S.encodeKeys({ Channel: "channel" }),
        ),
      ).annotate({ identifier: "CreateChannelResponse" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CbetCheckDigitString: S.optional(S.String),
          CbetStepaside: S.optional(S.String),
          Csid: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            CbetCheckDigitString: "cbetCheckDigitString",
            CbetStepaside: "cbetStepaside",
            Csid: "csid",
          }),
        ),
      ).annotate({ identifier: "NielsenCBET" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CheckDigitString: S.optional(S.String),
          Sid: S.optional(S.Number),
          Timezone: S.optional(S.String),
        }).pipe(
          S.encodeKeys({ CheckDigitString: "checkDigitString", Sid: "sid", Timezone: "timezone" }),
        ),
      ).annotate({ identifier: "NielsenNaesIiNw" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          NielsenCbetSettings: S.optional(__S(1600, __c50, 0)),
          NielsenDistributionType: S.optional(S.String),
          NielsenNaesIiNwSettings: S.optional(__S(1601, __c50, 1)),
          NielsenNwOnlySettings: S.optional(__S(1601, __c50, 1)),
        }).pipe(
          S.encodeKeys({
            NielsenCbetSettings: "nielsenCbetSettings",
            NielsenDistributionType: "nielsenDistributionType",
            NielsenNaesIiNwSettings: "nielsenNaesIiNwSettings",
            NielsenNwOnlySettings: "nielsenNwOnlySettings",
          }),
        ),
      ).annotate({ identifier: "NielsenWatermarksSettings" });
    case 3:
      return S.suspend(() =>
        S.Struct({ NielsenWatermarksSettings: S.optional(__S(1602, __c50, 2)) }).pipe(
          S.encodeKeys({ NielsenWatermarksSettings: "nielsenWatermarksSettings" }),
        ),
      ).annotate({ identifier: "AudioWatermarkSettings" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Bitrate: S.optional(S.Number),
          CodingMode: S.optional(S.String),
          InputType: S.optional(S.String),
          Profile: S.optional(S.String),
          RateControlMode: S.optional(S.String),
          RawFormat: S.optional(S.String),
          SampleRate: S.optional(S.Number),
          Spec: S.optional(S.String),
          VbrQuality: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Bitrate: "bitrate",
            CodingMode: "codingMode",
            InputType: "inputType",
            Profile: "profile",
            RateControlMode: "rateControlMode",
            RawFormat: "rawFormat",
            SampleRate: "sampleRate",
            Spec: "spec",
            VbrQuality: "vbrQuality",
          }),
        ),
      ).annotate({ identifier: "AacSettings" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Bitrate: S.optional(S.Number),
          BitstreamMode: S.optional(S.String),
          CodingMode: S.optional(S.String),
          Dialnorm: S.optional(S.Number),
          DrcProfile: S.optional(S.String),
          LfeFilter: S.optional(S.String),
          MetadataControl: S.optional(S.String),
          AttenuationControl: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Bitrate: "bitrate",
            BitstreamMode: "bitstreamMode",
            CodingMode: "codingMode",
            Dialnorm: "dialnorm",
            DrcProfile: "drcProfile",
            LfeFilter: "lfeFilter",
            MetadataControl: "metadataControl",
            AttenuationControl: "attenuationControl",
          }),
        ),
      ).annotate({ identifier: "Ac3Settings" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Bitrate: S.optional(S.Number),
          CodingMode: S.optional(S.String),
          Dialnorm: S.optional(S.Number),
          DrcLine: S.optional(S.String),
          DrcRf: S.optional(S.String),
          HeightTrim: S.optional(S.Number),
          SurroundTrim: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            Bitrate: "bitrate",
            CodingMode: "codingMode",
            Dialnorm: "dialnorm",
            DrcLine: "drcLine",
            DrcRf: "drcRf",
            HeightTrim: "heightTrim",
            SurroundTrim: "surroundTrim",
          }),
        ),
      ).annotate({ identifier: "Eac3AtmosSettings" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          AttenuationControl: S.optional(S.String),
          Bitrate: S.optional(S.Number),
          BitstreamMode: S.optional(S.String),
          CodingMode: S.optional(S.String),
          DcFilter: S.optional(S.String),
          Dialnorm: S.optional(S.Number),
          DrcLine: S.optional(S.String),
          DrcRf: S.optional(S.String),
          LfeControl: S.optional(S.String),
          LfeFilter: S.optional(S.String),
          LoRoCenterMixLevel: S.optional(S.Number),
          LoRoSurroundMixLevel: S.optional(S.Number),
          LtRtCenterMixLevel: S.optional(S.Number),
          LtRtSurroundMixLevel: S.optional(S.Number),
          MetadataControl: S.optional(S.String),
          PassthroughControl: S.optional(S.String),
          PhaseControl: S.optional(S.String),
          StereoDownmix: S.optional(S.String),
          SurroundExMode: S.optional(S.String),
          SurroundMode: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AttenuationControl: "attenuationControl",
            Bitrate: "bitrate",
            BitstreamMode: "bitstreamMode",
            CodingMode: "codingMode",
            DcFilter: "dcFilter",
            Dialnorm: "dialnorm",
            DrcLine: "drcLine",
            DrcRf: "drcRf",
            LfeControl: "lfeControl",
            LfeFilter: "lfeFilter",
            LoRoCenterMixLevel: "loRoCenterMixLevel",
            LoRoSurroundMixLevel: "loRoSurroundMixLevel",
            LtRtCenterMixLevel: "ltRtCenterMixLevel",
            LtRtSurroundMixLevel: "ltRtSurroundMixLevel",
            MetadataControl: "metadataControl",
            PassthroughControl: "passthroughControl",
            PhaseControl: "phaseControl",
            StereoDownmix: "stereoDownmix",
            SurroundExMode: "surroundExMode",
            SurroundMode: "surroundMode",
          }),
        ),
      ).annotate({ identifier: "Eac3Settings" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          Bitrate: S.optional(S.Number),
          CodingMode: S.optional(S.String),
          SampleRate: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({ Bitrate: "bitrate", CodingMode: "codingMode", SampleRate: "sampleRate" }),
        ),
      ).annotate({ identifier: "Mp2Settings" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          BitDepth: S.optional(S.Number),
          CodingMode: S.optional(S.String),
          SampleRate: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            BitDepth: "bitDepth",
            CodingMode: "codingMode",
            SampleRate: "sampleRate",
          }),
        ),
      ).annotate({ identifier: "WavSettings" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          AacSettings: S.optional(__S(1604, __c50, 4)),
          Ac3Settings: S.optional(__S(1605, __c50, 5)),
          Eac3AtmosSettings: S.optional(__S(1606, __c50, 6)),
          Eac3Settings: S.optional(__S(1607, __c50, 7)),
          Mp2Settings: S.optional(__S(1608, __c50, 8)),
          PassThroughSettings: S.optional(__S(32, __c1, 0)),
          WavSettings: S.optional(__S(1609, __c50, 9)),
        }).pipe(
          S.encodeKeys({
            AacSettings: "aacSettings",
            Ac3Settings: "ac3Settings",
            Eac3AtmosSettings: "eac3AtmosSettings",
            Eac3Settings: "eac3Settings",
            Mp2Settings: "mp2Settings",
            PassThroughSettings: "passThroughSettings",
            WavSettings: "wavSettings",
          }),
        ),
      ).annotate({ identifier: "AudioCodecSettings" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          AudioNormalizationSettings: S.optional(__S(1804, __c56, 12)),
          AudioSelectorName: S.optional(S.String),
          AudioType: S.optional(S.String),
          AudioTypeControl: S.optional(S.String),
          AudioWatermarkingSettings: S.optional(__S(1603, __c50, 3)),
          CodecSettings: S.optional(__S(1610, __c50, 10)),
          LanguageCode: S.optional(S.String),
          LanguageCodeControl: S.optional(S.String),
          Name: S.optional(S.String),
          RemixSettings: S.optional(__S(1809, __c56, 17)),
          StreamName: S.optional(S.String),
          AudioDashRoles: S.optional(__listOfDashRoleAudio),
          DvbDashAccessibility: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AudioNormalizationSettings: "audioNormalizationSettings",
            AudioSelectorName: "audioSelectorName",
            AudioType: "audioType",
            AudioTypeControl: "audioTypeControl",
            AudioWatermarkingSettings: "audioWatermarkingSettings",
            CodecSettings: "codecSettings",
            LanguageCode: "languageCode",
            LanguageCodeControl: "languageCodeControl",
            Name: "name",
            RemixSettings: "remixSettings",
            StreamName: "streamName",
            AudioDashRoles: "audioDashRoles",
            DvbDashAccessibility: "dvbDashAccessibility",
          }),
        ),
      ).annotate({ identifier: "AudioDescription" });
    case 12:
      return S.Array(__S(1611, __c50, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          AvailBlankingImage: S.optional(__S(1344, __c42, 0)),
          State: S.optional(S.String),
        }).pipe(S.encodeKeys({ AvailBlankingImage: "availBlankingImage", State: "state" })),
      ).annotate({ identifier: "AvailBlanking" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          AcquisitionPointId: S.optional(S.String),
          AdAvailOffset: S.optional(S.Number),
          PasswordParam: S.optional(S.String),
          PoisEndpoint: S.optional(S.String),
          Username: S.optional(S.String),
          ZoneIdentity: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AcquisitionPointId: "acquisitionPointId",
            AdAvailOffset: "adAvailOffset",
            PasswordParam: "passwordParam",
            PoisEndpoint: "poisEndpoint",
            Username: "username",
            ZoneIdentity: "zoneIdentity",
          }),
        ),
      ).annotate({ identifier: "Esam" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          AdAvailOffset: S.optional(S.Number),
          NoRegionalBlackoutFlag: S.optional(S.String),
          WebDeliveryAllowedFlag: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AdAvailOffset: "adAvailOffset",
            NoRegionalBlackoutFlag: "noRegionalBlackoutFlag",
            WebDeliveryAllowedFlag: "webDeliveryAllowedFlag",
          }),
        ),
      ).annotate({ identifier: "Scte35SpliceInsert" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          Esam: S.optional(__S(1614, __c50, 14)),
          Scte35SpliceInsert: S.optional(__S(1615, __c50, 15)),
          Scte35TimeSignalApos: S.optional(__S(1615, __c50, 15)),
        }).pipe(
          S.encodeKeys({
            Esam: "esam",
            Scte35SpliceInsert: "scte35SpliceInsert",
            Scte35TimeSignalApos: "scte35TimeSignalApos",
          }),
        ),
      ).annotate({ identifier: "AvailSettings" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          AvailSettings: S.optional(__S(1616, __c50, 16)),
          Scte35SegmentationScope: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AvailSettings: "availSettings",
            Scte35SegmentationScope: "scte35SegmentationScope",
          }),
        ),
      ).annotate({ identifier: "AvailConfiguration" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          BlackoutSlateImage: S.optional(__S(1344, __c42, 0)),
          NetworkEndBlackout: S.optional(S.String),
          NetworkEndBlackoutImage: S.optional(__S(1344, __c42, 0)),
          NetworkId: S.optional(S.String),
          State: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            BlackoutSlateImage: "blackoutSlateImage",
            NetworkEndBlackout: "networkEndBlackout",
            NetworkEndBlackoutImage: "networkEndBlackoutImage",
            NetworkId: "networkId",
            State: "state",
          }),
        ),
      ).annotate({ identifier: "BlackoutSlate" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          Alignment: S.optional(S.String),
          BackgroundColor: S.optional(S.String),
          BackgroundOpacity: S.optional(S.Number),
          Font: S.optional(__S(1344, __c42, 0)),
          FontColor: S.optional(S.String),
          FontOpacity: S.optional(S.Number),
          FontResolution: S.optional(S.Number),
          FontSize: S.optional(S.String),
          OutlineColor: S.optional(S.String),
          OutlineSize: S.optional(S.Number),
          ShadowColor: S.optional(S.String),
          ShadowOpacity: S.optional(S.Number),
          ShadowXOffset: S.optional(S.Number),
          ShadowYOffset: S.optional(S.Number),
          TeletextGridControl: S.optional(S.String),
          XPosition: S.optional(S.Number),
          YPosition: S.optional(S.Number),
          SubtitleRows: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Alignment: "alignment",
            BackgroundColor: "backgroundColor",
            BackgroundOpacity: "backgroundOpacity",
            Font: "font",
            FontColor: "fontColor",
            FontOpacity: "fontOpacity",
            FontResolution: "fontResolution",
            FontSize: "fontSize",
            OutlineColor: "outlineColor",
            OutlineSize: "outlineSize",
            ShadowColor: "shadowColor",
            ShadowOpacity: "shadowOpacity",
            ShadowXOffset: "shadowXOffset",
            ShadowYOffset: "shadowYOffset",
            TeletextGridControl: "teletextGridControl",
            XPosition: "xPosition",
            YPosition: "yPosition",
            SubtitleRows: "subtitleRows",
          }),
        ),
      ).annotate({ identifier: "BurnInDestinationSettings" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          CopyrightHolder: S.optional(S.String),
          FillLineGap: S.optional(S.String),
          FontFamily: S.optional(S.String),
          StyleControl: S.optional(S.String),
          DefaultFontSize: S.optional(S.Number),
          DefaultLineHeight: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            CopyrightHolder: "copyrightHolder",
            FillLineGap: "fillLineGap",
            FontFamily: "fontFamily",
            StyleControl: "styleControl",
            DefaultFontSize: "defaultFontSize",
            DefaultLineHeight: "defaultLineHeight",
          }),
        ),
      ).annotate({ identifier: "EbuTtDDestinationSettings" });
    case 21:
      return S.suspend(() =>
        S.Struct({ YPositionLine: S.optional(S.Number) }).pipe(
          S.encodeKeys({ YPositionLine: "yPositionLine" }),
        ),
      ).annotate({ identifier: "EmbeddedCaptionPositionSettings" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          Position: S.optional(__S(1621, __c50, 21)),
          StyleControl: S.optional(S.String),
        }).pipe(S.encodeKeys({ Position: "position", StyleControl: "styleControl" })),
      ).annotate({ identifier: "EmbeddedDestinationSettings" });
    case 23:
      return S.suspend(() =>
        S.Struct({ YPositionPercentage: S.optional(S.Number) }).pipe(
          S.encodeKeys({ YPositionPercentage: "yPositionPercentage" }),
        ),
      ).annotate({ identifier: "TextCaptionPositionSettings" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          StyleControl: S.optional(S.String),
          Position: S.optional(__S(1623, __c50, 23)),
        }).pipe(S.encodeKeys({ StyleControl: "styleControl", Position: "position" })),
      ).annotate({ identifier: "TtmlDestinationSettings" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          AribDestinationSettings: S.optional(__S(32, __c1, 0)),
          BurnInDestinationSettings: S.optional(__S(1619, __c50, 19)),
          DvbSubDestinationSettings: S.optional(__S(1619, __c50, 19)),
          EbuTtDDestinationSettings: S.optional(__S(1620, __c50, 20)),
          EmbeddedDestinationSettings: S.optional(__S(1622, __c50, 22)),
          EmbeddedPlusScte20DestinationSettings: S.optional(__S(32, __c1, 0)),
          RtmpCaptionInfoDestinationSettings: S.optional(__S(32, __c1, 0)),
          Scte20PlusEmbeddedDestinationSettings: S.optional(__S(32, __c1, 0)),
          Scte27DestinationSettings: S.optional(__S(32, __c1, 0)),
          SmpteTtDestinationSettings: S.optional(__S(32, __c1, 0)),
          TeletextDestinationSettings: S.optional(__S(32, __c1, 0)),
          TtmlDestinationSettings: S.optional(__S(1624, __c50, 24)),
          WebvttDestinationSettings: S.optional(__S(1624, __c50, 24)),
        }).pipe(
          S.encodeKeys({
            AribDestinationSettings: "aribDestinationSettings",
            BurnInDestinationSettings: "burnInDestinationSettings",
            DvbSubDestinationSettings: "dvbSubDestinationSettings",
            EbuTtDDestinationSettings: "ebuTtDDestinationSettings",
            EmbeddedDestinationSettings: "embeddedDestinationSettings",
            EmbeddedPlusScte20DestinationSettings: "embeddedPlusScte20DestinationSettings",
            RtmpCaptionInfoDestinationSettings: "rtmpCaptionInfoDestinationSettings",
            Scte20PlusEmbeddedDestinationSettings: "scte20PlusEmbeddedDestinationSettings",
            Scte27DestinationSettings: "scte27DestinationSettings",
            SmpteTtDestinationSettings: "smpteTtDestinationSettings",
            TeletextDestinationSettings: "teletextDestinationSettings",
            TtmlDestinationSettings: "ttmlDestinationSettings",
            WebvttDestinationSettings: "webvttDestinationSettings",
          }),
        ),
      ).annotate({ identifier: "CaptionDestinationSettings" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          Accessibility: S.optional(S.String),
          CaptionSelectorName: S.optional(S.String),
          DestinationSettings: S.optional(__S(1625, __c50, 25)),
          LanguageCode: S.optional(S.String),
          LanguageDescription: S.optional(S.String),
          Name: S.optional(S.String),
          CaptionDashRoles: S.optional(__listOfDashRoleCaption),
          DvbDashAccessibility: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Accessibility: "accessibility",
            CaptionSelectorName: "captionSelectorName",
            DestinationSettings: "destinationSettings",
            LanguageCode: "languageCode",
            LanguageDescription: "languageDescription",
            Name: "name",
            CaptionDashRoles: "captionDashRoles",
            DvbDashAccessibility: "dvbDashAccessibility",
          }),
        ),
      ).annotate({ identifier: "CaptionDescription" });
    case 27:
      return S.Array(__S(1626, __c50, 26));
    case 28:
      return S.suspend(() =>
        S.Struct({
          InputPrepareScheduleActions: S.optional(S.String),
          OutputStaticImageOverlayScheduleActions: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            InputPrepareScheduleActions: "inputPrepareScheduleActions",
            OutputStaticImageOverlayScheduleActions: "outputStaticImageOverlayScheduleActions",
          }),
        ),
      ).annotate({ identifier: "FeatureActivations" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          BlackFrameMsec: S.optional(S.Number),
          InputLossImageColor: S.optional(S.String),
          InputLossImageSlate: S.optional(__S(1344, __c42, 0)),
          InputLossImageType: S.optional(S.String),
          RepeatFrameMsec: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            BlackFrameMsec: "blackFrameMsec",
            InputLossImageColor: "inputLossImageColor",
            InputLossImageSlate: "inputLossImageSlate",
            InputLossImageType: "inputLossImageType",
            RepeatFrameMsec: "repeatFrameMsec",
          }),
        ),
      ).annotate({ identifier: "InputLossBehavior" });
    case 30:
      return S.suspend(() =>
        S.Struct({ CustomEpoch: S.optional(S.String), JamSyncTime: S.optional(S.String) }).pipe(
          S.encodeKeys({ CustomEpoch: "customEpoch", JamSyncTime: "jamSyncTime" }),
        ),
      ).annotate({ identifier: "EpochLockingSettings" });
    case 31:
      return S.suspend(() =>
        S.Struct({
          PipelineLockingMethod: S.optional(S.String),
          CustomEpoch: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            PipelineLockingMethod: "pipelineLockingMethod",
            CustomEpoch: "customEpoch",
          }),
        ),
      ).annotate({ identifier: "PipelineLockingSettings" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CustomEpoch: S.optional(S.String) }).pipe(
          S.encodeKeys({ CustomEpoch: "customEpoch" }),
        ),
      ).annotate({ identifier: "DisabledLockingSettings" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EpochLockingSettings: S.optional(__S(1630, __c50, 30)),
          PipelineLockingSettings: S.optional(__S(1631, __c50, 31)),
          DisabledLockingSettings: S.optional(__S(1632, __c51, 0)),
        }).pipe(
          S.encodeKeys({
            EpochLockingSettings: "epochLockingSettings",
            PipelineLockingSettings: "pipelineLockingSettings",
            DisabledLockingSettings: "disabledLockingSettings",
          }),
        ),
      ).annotate({ identifier: "OutputLockingSettings" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          InitialAudioGain: S.optional(S.Number),
          InputEndAction: S.optional(S.String),
          InputLossBehavior: S.optional(__S(1629, __c50, 29)),
          OutputLockingMode: S.optional(S.String),
          OutputTimingSource: S.optional(S.String),
          SupportLowFramerateInputs: S.optional(S.String),
          OutputLockingSettings: S.optional(__S(1633, __c51, 1)),
        }).pipe(
          S.encodeKeys({
            InitialAudioGain: "initialAudioGain",
            InputEndAction: "inputEndAction",
            InputLossBehavior: "inputLossBehavior",
            OutputLockingMode: "outputLockingMode",
            OutputTimingSource: "outputTimingSource",
            SupportLowFramerateInputs: "supportLowFramerateInputs",
            OutputLockingSettings: "outputLockingSettings",
          }),
        ),
      ).annotate({ identifier: "GlobalConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({ HtmlMotionGraphicsSettings: S.optional(__S(32, __c1, 0)) }).pipe(
          S.encodeKeys({ HtmlMotionGraphicsSettings: "htmlMotionGraphicsSettings" }),
        ),
      ).annotate({ identifier: "MotionGraphicsSettings" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          MotionGraphicsInsertion: S.optional(S.String),
          MotionGraphicsSettings: S.optional(__S(1635, __c51, 3)),
        }).pipe(
          S.encodeKeys({
            MotionGraphicsInsertion: "motionGraphicsInsertion",
            MotionGraphicsSettings: "motionGraphicsSettings",
          }),
        ),
      ).annotate({ identifier: "MotionGraphicsConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          DistributorId: S.optional(S.String),
          NielsenPcmToId3Tagging: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            DistributorId: "distributorId",
            NielsenPcmToId3Tagging: "nielsenPcmToId3Tagging",
          }),
        ),
      ).annotate({ identifier: "NielsenConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({ CannedAcl: S.optional(S.String) }).pipe(
          S.encodeKeys({ CannedAcl: "cannedAcl" }),
        ),
      ).annotate({ identifier: "ArchiveS3Settings" });
    case 7:
      return S.suspend(() =>
        S.Struct({ ArchiveS3Settings: S.optional(__S(1638, __c51, 6)) }).pipe(
          S.encodeKeys({ ArchiveS3Settings: "archiveS3Settings" }),
        ),
      ).annotate({ identifier: "ArchiveCdnSettings" });
    case 8:
      return S.suspend(() =>
        S.Struct({ DestinationRefId: S.optional(S.String) }).pipe(
          S.encodeKeys({ DestinationRefId: "destinationRefId" }),
        ),
      ).annotate({ identifier: "OutputLocationRef" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          ArchiveCdnSettings: S.optional(__S(1639, __c51, 7)),
          Destination: S.optional(__S(1640, __c51, 8)),
          RolloverInterval: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            ArchiveCdnSettings: "archiveCdnSettings",
            Destination: "destination",
            RolloverInterval: "rolloverInterval",
          }),
        ),
      ).annotate({ identifier: "ArchiveGroupSettings" });
    case 10:
      return S.suspend(() =>
        S.Struct({ FrameCaptureS3Settings: S.optional(__S(1638, __c51, 6)) }).pipe(
          S.encodeKeys({ FrameCaptureS3Settings: "frameCaptureS3Settings" }),
        ),
      ).annotate({ identifier: "FrameCaptureCdnSettings" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          Destination: S.optional(__S(1640, __c51, 8)),
          FrameCaptureCdnSettings: S.optional(__S(1642, __c51, 10)),
        }).pipe(
          S.encodeKeys({
            Destination: "destination",
            FrameCaptureCdnSettings: "frameCaptureCdnSettings",
          }),
        ),
      ).annotate({ identifier: "FrameCaptureGroupSettings" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          CaptionChannel: S.optional(S.Number),
          LanguageCode: S.optional(S.String),
          LanguageDescription: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            CaptionChannel: "captionChannel",
            LanguageCode: "languageCode",
            LanguageDescription: "languageDescription",
          }),
        ),
      ).annotate({ identifier: "CaptionLanguageMapping" });
    case 13:
      return S.Array(__S(1644, __c51, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          ConnectionRetryInterval: S.optional(S.Number),
          FilecacheDuration: S.optional(S.Number),
          HttpTransferMode: S.optional(S.String),
          NumRetries: S.optional(S.Number),
          RestartDelay: S.optional(S.Number),
          Salt: S.optional(S.String),
          Token: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ConnectionRetryInterval: "connectionRetryInterval",
            FilecacheDuration: "filecacheDuration",
            HttpTransferMode: "httpTransferMode",
            NumRetries: "numRetries",
            RestartDelay: "restartDelay",
            Salt: "salt",
            Token: "token",
          }),
        ),
      ).annotate({ identifier: "HlsAkamaiSettings" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          ConnectionRetryInterval: S.optional(S.Number),
          FilecacheDuration: S.optional(S.Number),
          NumRetries: S.optional(S.Number),
          RestartDelay: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            ConnectionRetryInterval: "connectionRetryInterval",
            FilecacheDuration: "filecacheDuration",
            NumRetries: "numRetries",
            RestartDelay: "restartDelay",
          }),
        ),
      ).annotate({ identifier: "HlsBasicPutSettings" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          ConnectionRetryInterval: S.optional(S.Number),
          FilecacheDuration: S.optional(S.Number),
          MediaStoreStorageClass: S.optional(S.String),
          NumRetries: S.optional(S.Number),
          RestartDelay: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            ConnectionRetryInterval: "connectionRetryInterval",
            FilecacheDuration: "filecacheDuration",
            MediaStoreStorageClass: "mediaStoreStorageClass",
            NumRetries: "numRetries",
            RestartDelay: "restartDelay",
          }),
        ),
      ).annotate({ identifier: "HlsMediaStoreSettings" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          ConnectionRetryInterval: S.optional(S.Number),
          FilecacheDuration: S.optional(S.Number),
          HttpTransferMode: S.optional(S.String),
          NumRetries: S.optional(S.Number),
          RestartDelay: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            ConnectionRetryInterval: "connectionRetryInterval",
            FilecacheDuration: "filecacheDuration",
            HttpTransferMode: "httpTransferMode",
            NumRetries: "numRetries",
            RestartDelay: "restartDelay",
          }),
        ),
      ).annotate({ identifier: "HlsWebdavSettings" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          HlsAkamaiSettings: S.optional(__S(1646, __c51, 14)),
          HlsBasicPutSettings: S.optional(__S(1647, __c51, 15)),
          HlsMediaStoreSettings: S.optional(__S(1648, __c51, 16)),
          HlsS3Settings: S.optional(__S(1638, __c51, 6)),
          HlsWebdavSettings: S.optional(__S(1649, __c51, 17)),
        }).pipe(
          S.encodeKeys({
            HlsAkamaiSettings: "hlsAkamaiSettings",
            HlsBasicPutSettings: "hlsBasicPutSettings",
            HlsMediaStoreSettings: "hlsMediaStoreSettings",
            HlsS3Settings: "hlsS3Settings",
            HlsWebdavSettings: "hlsWebdavSettings",
          }),
        ),
      ).annotate({ identifier: "HlsCdnSettings" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          KeyProviderServer: S.optional(__S(1344, __c42, 0)),
          StaticKeyValue: S.optional(SensitiveString),
        }).pipe(
          S.encodeKeys({
            KeyProviderServer: "keyProviderServer",
            StaticKeyValue: "staticKeyValue",
          }),
        ),
      ).annotate({ identifier: "StaticKeySettings" });
    case 20:
      return S.suspend(() =>
        S.Struct({ StaticKeySettings: S.optional(__S(1651, __c51, 19)) }).pipe(
          S.encodeKeys({ StaticKeySettings: "staticKeySettings" }),
        ),
      ).annotate({ identifier: "KeyProviderSettings" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          AdMarkers: S.optional(__listOfHlsAdMarkers),
          BaseUrlContent: S.optional(S.String),
          BaseUrlContent1: S.optional(S.String),
          BaseUrlManifest: S.optional(S.String),
          BaseUrlManifest1: S.optional(S.String),
          CaptionLanguageMappings: S.optional(__listOfCaptionLanguageMapping),
          CaptionLanguageSetting: S.optional(S.String),
          ClientCache: S.optional(S.String),
          CodecSpecification: S.optional(S.String),
          ConstantIv: S.optional(S.String),
          Destination: S.optional(__S(1640, __c51, 8)),
          DirectoryStructure: S.optional(S.String),
          DiscontinuityTags: S.optional(S.String),
          EncryptionType: S.optional(S.String),
          HlsCdnSettings: S.optional(__S(1650, __c51, 18)),
          HlsId3SegmentTagging: S.optional(S.String),
          IFrameOnlyPlaylists: S.optional(S.String),
          IncompleteSegmentBehavior: S.optional(S.String),
          IndexNSegments: S.optional(S.Number),
          InputLossAction: S.optional(S.String),
          IvInManifest: S.optional(S.String),
          IvSource: S.optional(S.String),
          KeepSegments: S.optional(S.Number),
          KeyFormat: S.optional(S.String),
          KeyFormatVersions: S.optional(S.String),
          KeyProviderSettings: S.optional(__S(1652, __c51, 20)),
          ManifestCompression: S.optional(S.String),
          ManifestDurationFormat: S.optional(S.String),
          MinSegmentLength: S.optional(S.Number),
          Mode: S.optional(S.String),
          OutputSelection: S.optional(S.String),
          ProgramDateTime: S.optional(S.String),
          ProgramDateTimeClock: S.optional(S.String),
          ProgramDateTimePeriod: S.optional(S.Number),
          RedundantManifest: S.optional(S.String),
          SegmentLength: S.optional(S.Number),
          SegmentationMode: S.optional(S.String),
          SegmentsPerSubdirectory: S.optional(S.Number),
          StreamInfResolution: S.optional(S.String),
          TimedMetadataId3Frame: S.optional(S.String),
          TimedMetadataId3Period: S.optional(S.Number),
          TimestampDeltaMilliseconds: S.optional(S.Number),
          TsFileMode: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AdMarkers: "adMarkers",
            BaseUrlContent: "baseUrlContent",
            BaseUrlContent1: "baseUrlContent1",
            BaseUrlManifest: "baseUrlManifest",
            BaseUrlManifest1: "baseUrlManifest1",
            CaptionLanguageMappings: "captionLanguageMappings",
            CaptionLanguageSetting: "captionLanguageSetting",
            ClientCache: "clientCache",
            CodecSpecification: "codecSpecification",
            ConstantIv: "constantIv",
            Destination: "destination",
            DirectoryStructure: "directoryStructure",
            DiscontinuityTags: "discontinuityTags",
            EncryptionType: "encryptionType",
            HlsCdnSettings: "hlsCdnSettings",
            HlsId3SegmentTagging: "hlsId3SegmentTagging",
            IFrameOnlyPlaylists: "iFrameOnlyPlaylists",
            IncompleteSegmentBehavior: "incompleteSegmentBehavior",
            IndexNSegments: "indexNSegments",
            InputLossAction: "inputLossAction",
            IvInManifest: "ivInManifest",
            IvSource: "ivSource",
            KeepSegments: "keepSegments",
            KeyFormat: "keyFormat",
            KeyFormatVersions: "keyFormatVersions",
            KeyProviderSettings: "keyProviderSettings",
            ManifestCompression: "manifestCompression",
            ManifestDurationFormat: "manifestDurationFormat",
            MinSegmentLength: "minSegmentLength",
            Mode: "mode",
            OutputSelection: "outputSelection",
            ProgramDateTime: "programDateTime",
            ProgramDateTimeClock: "programDateTimeClock",
            ProgramDateTimePeriod: "programDateTimePeriod",
            RedundantManifest: "redundantManifest",
            SegmentLength: "segmentLength",
            SegmentationMode: "segmentationMode",
            SegmentsPerSubdirectory: "segmentsPerSubdirectory",
            StreamInfResolution: "streamInfResolution",
            TimedMetadataId3Frame: "timedMetadataId3Frame",
            TimedMetadataId3Period: "timedMetadataId3Period",
            TimestampDeltaMilliseconds: "timestampDeltaMilliseconds",
            TsFileMode: "tsFileMode",
          }),
        ),
      ).annotate({ identifier: "HlsGroupSettings" });
    case 22:
      return S.suspend(() =>
        S.Struct({ Destination: S.optional(__S(1640, __c51, 8)) }).pipe(
          S.encodeKeys({ Destination: "destination" }),
        ),
      ).annotate({ identifier: "MediaPackageAdditionalDestinations" });
    case 23:
      return S.Array(__S(1654, __c51, 22));
    case 24:
      return S.Array(__S(1640, __c51, 8));
    case 25:
      return S.suspend(() =>
        S.Struct({
          EmbeddingFrequency: S.optional(S.Number),
          SceneCut: S.optional(S.Number),
          TargetPsnr: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            EmbeddingFrequency: "embeddingFrequency",
            SceneCut: "sceneCut",
            TargetPsnr: "targetPsnr",
          }),
        ),
      ).annotate({ identifier: "AbWatermarkingCustomProfile" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          AdditionalDestinationsAlternateDestinations: S.optional(__listOfOutputLocationRef),
          AlternateDestination: S.optional(__S(1640, __c51, 8)),
          CustomProfile: S.optional(__S(1657, __c51, 25)),
          License: S.optional(S.String),
          OperatorId: S.optional(S.Number),
          PolyPeriod: S.optional(S.Number),
          Profile: S.optional(S.String),
          WatermarkIdLength: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AdditionalDestinationsAlternateDestinations:
              "additionalDestinationsAlternateDestinations",
            AlternateDestination: "alternateDestination",
            CustomProfile: "customProfile",
            License: "license",
            OperatorId: "operatorId",
            PolyPeriod: "polyPeriod",
            Profile: "profile",
            WatermarkIdLength: "watermarkIdLength",
          }),
        ),
      ).annotate({ identifier: "MediaPackageV2AbWatermarkerIrdetoSettings" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          MediaPackageV2AbWatermarkerIrdetoSettings: S.optional(__S(1658, __c51, 26)),
        }).pipe(
          S.encodeKeys({
            MediaPackageV2AbWatermarkerIrdetoSettings: "mediaPackageV2AbWatermarkerIrdetoSettings",
          }),
        ),
      ).annotate({ identifier: "MediaPackageV2WatermarkingSettings" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          CaptionLanguageMappings: S.optional(__listOfCaptionLanguageMapping),
          Id3Behavior: S.optional(S.String),
          KlvBehavior: S.optional(S.String),
          NielsenId3Behavior: S.optional(S.String),
          Scte35Type: S.optional(S.String),
          SegmentLength: S.optional(S.Number),
          SegmentLengthUnits: S.optional(S.String),
          TimedMetadataId3Frame: S.optional(S.String),
          TimedMetadataId3Period: S.optional(S.Number),
          TimedMetadataPassthrough: S.optional(S.String),
          AdditionalDestinations: S.optional(__listOfMediaPackageAdditionalDestinations),
          WatermarkingSettings: S.optional(__S(1659, __c51, 27)),
        }).pipe(
          S.encodeKeys({
            CaptionLanguageMappings: "captionLanguageMappings",
            Id3Behavior: "id3Behavior",
            KlvBehavior: "klvBehavior",
            NielsenId3Behavior: "nielsenId3Behavior",
            Scte35Type: "scte35Type",
            SegmentLength: "segmentLength",
            SegmentLengthUnits: "segmentLengthUnits",
            TimedMetadataId3Frame: "timedMetadataId3Frame",
            TimedMetadataId3Period: "timedMetadataId3Period",
            TimedMetadataPassthrough: "timedMetadataPassthrough",
            AdditionalDestinations: "additionalDestinations",
            WatermarkingSettings: "watermarkingSettings",
          }),
        ),
      ).annotate({ identifier: "MediaPackageV2GroupSettings" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          Destination: S.optional(__S(1640, __c51, 8)),
          MediapackageV2GroupSettings: S.optional(__S(1660, __c51, 28)),
        }).pipe(
          S.encodeKeys({
            Destination: "destination",
            MediapackageV2GroupSettings: "mediapackageV2GroupSettings",
          }),
        ),
      ).annotate({ identifier: "MediaPackageGroupSettings" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          AcquisitionPointId: S.optional(S.String),
          AudioOnlyTimecodeControl: S.optional(S.String),
          CertificateMode: S.optional(S.String),
          ConnectionRetryInterval: S.optional(S.Number),
          Destination: S.optional(__S(1640, __c51, 8)),
          EventId: S.optional(S.String),
          EventIdMode: S.optional(S.String),
          EventStopBehavior: S.optional(S.String),
          FilecacheDuration: S.optional(S.Number),
          FragmentLength: S.optional(S.Number),
          InputLossAction: S.optional(S.String),
          NumRetries: S.optional(S.Number),
          RestartDelay: S.optional(S.Number),
          SegmentationMode: S.optional(S.String),
          SendDelayMs: S.optional(S.Number),
          SparseTrackType: S.optional(S.String),
          StreamManifestBehavior: S.optional(S.String),
          TimestampOffset: S.optional(S.String),
          TimestampOffsetMode: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AcquisitionPointId: "acquisitionPointId",
            AudioOnlyTimecodeControl: "audioOnlyTimecodeControl",
            CertificateMode: "certificateMode",
            ConnectionRetryInterval: "connectionRetryInterval",
            Destination: "destination",
            EventId: "eventId",
            EventIdMode: "eventIdMode",
            EventStopBehavior: "eventStopBehavior",
            FilecacheDuration: "filecacheDuration",
            FragmentLength: "fragmentLength",
            InputLossAction: "inputLossAction",
            NumRetries: "numRetries",
            RestartDelay: "restartDelay",
            SegmentationMode: "segmentationMode",
            SendDelayMs: "sendDelayMs",
            SparseTrackType: "sparseTrackType",
            StreamManifestBehavior: "streamManifestBehavior",
            TimestampOffset: "timestampOffset",
            TimestampOffsetMode: "timestampOffsetMode",
          }),
        ),
      ).annotate({ identifier: "MsSmoothGroupSettings" });
    case 31:
      return S.suspend(() =>
        S.Struct({
          AdMarkers: S.optional(__listOfRtmpAdMarkers),
          AuthenticationScheme: S.optional(S.String),
          CacheFullBehavior: S.optional(S.String),
          CacheLength: S.optional(S.Number),
          CaptionData: S.optional(S.String),
          InputLossAction: S.optional(S.String),
          RestartDelay: S.optional(S.Number),
          IncludeFillerNalUnits: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AdMarkers: "adMarkers",
            AuthenticationScheme: "authenticationScheme",
            CacheFullBehavior: "cacheFullBehavior",
            CacheLength: "cacheLength",
            CaptionData: "captionData",
            InputLossAction: "inputLossAction",
            RestartDelay: "restartDelay",
            IncludeFillerNalUnits: "includeFillerNalUnits",
          }),
        ),
      ).annotate({ identifier: "RtmpGroupSettings" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InputLossAction: S.optional(S.String),
          TimedMetadataId3Frame: S.optional(S.String),
          TimedMetadataId3Period: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            InputLossAction: "inputLossAction",
            TimedMetadataId3Frame: "timedMetadataId3Frame",
            TimedMetadataId3Period: "timedMetadataId3Period",
          }),
        ),
      ).annotate({ identifier: "UdpGroupSettings" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CaptionChannel: S.optional(S.Number), LanguageCode: S.optional(S.String) }).pipe(
          S.encodeKeys({ CaptionChannel: "captionChannel", LanguageCode: "languageCode" }),
        ),
      ).annotate({ identifier: "CmafIngestCaptionLanguageMapping" });
    case 2:
      return S.Array(__S(1665, __c52, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ CmafIngestAbWatermarkerIrdetoSettings: S.optional(__S(1658, __c51, 26)) }).pipe(
          S.encodeKeys({
            CmafIngestAbWatermarkerIrdetoSettings: "cmafIngestAbWatermarkerIrdetoSettings",
          }),
        ),
      ).annotate({ identifier: "CmafIngestWatermarkingSettings" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Destination: S.optional(__S(1640, __c51, 8)),
          NielsenId3Behavior: S.optional(S.String),
          Scte35Type: S.optional(S.String),
          SegmentLength: S.optional(S.Number),
          SegmentLengthUnits: S.optional(S.String),
          SendDelayMs: S.optional(S.Number),
          KlvBehavior: S.optional(S.String),
          KlvNameModifier: S.optional(S.String),
          NielsenId3NameModifier: S.optional(S.String),
          Scte35NameModifier: S.optional(S.String),
          Id3Behavior: S.optional(S.String),
          Id3NameModifier: S.optional(S.String),
          CaptionLanguageMappings: S.optional(__listOfCmafIngestCaptionLanguageMapping),
          TimedMetadataId3Frame: S.optional(S.String),
          TimedMetadataId3Period: S.optional(S.Number),
          TimedMetadataPassthrough: S.optional(S.String),
          AdditionalDestinations: S.optional(__listOfAdditionalDestinations),
          WatermarkingSettings: S.optional(__S(1667, __c52, 3)),
        }).pipe(
          S.encodeKeys({
            Destination: "destination",
            NielsenId3Behavior: "nielsenId3Behavior",
            Scte35Type: "scte35Type",
            SegmentLength: "segmentLength",
            SegmentLengthUnits: "segmentLengthUnits",
            SendDelayMs: "sendDelayMs",
            KlvBehavior: "klvBehavior",
            KlvNameModifier: "klvNameModifier",
            NielsenId3NameModifier: "nielsenId3NameModifier",
            Scte35NameModifier: "scte35NameModifier",
            Id3Behavior: "id3Behavior",
            Id3NameModifier: "id3NameModifier",
            CaptionLanguageMappings: "captionLanguageMappings",
            TimedMetadataId3Frame: "timedMetadataId3Frame",
            TimedMetadataId3Period: "timedMetadataId3Period",
            TimedMetadataPassthrough: "timedMetadataPassthrough",
            AdditionalDestinations: "additionalDestinations",
            WatermarkingSettings: "watermarkingSettings",
          }),
        ),
      ).annotate({ identifier: "CmafIngestGroupSettings" });
    case 5:
      return S.suspend(() =>
        S.Struct({ InputLossAction: S.optional(S.String) }).pipe(
          S.encodeKeys({ InputLossAction: "inputLossAction" }),
        ),
      ).annotate({ identifier: "SrtGroupSettings" });
    case 6:
      return S.suspend(() =>
        S.Struct({ AvailabilityZones: S.optional(__listOf__string) }).pipe(
          S.encodeKeys({ AvailabilityZones: "availabilityZones" }),
        ),
      ).annotate({ identifier: "MediaConnectRouterGroupSettings" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          ArchiveGroupSettings: S.optional(__S(1641, __c51, 9)),
          FrameCaptureGroupSettings: S.optional(__S(1643, __c51, 11)),
          HlsGroupSettings: S.optional(__S(1653, __c51, 21)),
          MediaPackageGroupSettings: S.optional(__S(1661, __c51, 29)),
          MsSmoothGroupSettings: S.optional(__S(1662, __c51, 30)),
          MultiplexGroupSettings: S.optional(__S(32, __c1, 0)),
          RtmpGroupSettings: S.optional(__S(1663, __c51, 31)),
          UdpGroupSettings: S.optional(__S(1664, __c52, 0)),
          CmafIngestGroupSettings: S.optional(__S(1668, __c52, 4)),
          SrtGroupSettings: S.optional(__S(1669, __c52, 5)),
          MediaConnectRouterGroupSettings: S.optional(__S(1670, __c52, 6)),
        }).pipe(
          S.encodeKeys({
            ArchiveGroupSettings: "archiveGroupSettings",
            FrameCaptureGroupSettings: "frameCaptureGroupSettings",
            HlsGroupSettings: "hlsGroupSettings",
            MediaPackageGroupSettings: "mediaPackageGroupSettings",
            MsSmoothGroupSettings: "msSmoothGroupSettings",
            MultiplexGroupSettings: "multiplexGroupSettings",
            RtmpGroupSettings: "rtmpGroupSettings",
            UdpGroupSettings: "udpGroupSettings",
            CmafIngestGroupSettings: "cmafIngestGroupSettings",
            SrtGroupSettings: "srtGroupSettings",
            MediaConnectRouterGroupSettings: "mediaConnectRouterGroupSettings",
          }),
        ),
      ).annotate({ identifier: "OutputGroupSettings" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          NetworkId: S.optional(S.Number),
          NetworkName: S.optional(S.String),
          RepInterval: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            NetworkId: "networkId",
            NetworkName: "networkName",
            RepInterval: "repInterval",
          }),
        ),
      ).annotate({ identifier: "DvbNitSettings" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          OutputSdt: S.optional(S.String),
          RepInterval: S.optional(S.Number),
          ServiceName: S.optional(S.String),
          ServiceProviderName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            OutputSdt: "outputSdt",
            RepInterval: "repInterval",
            ServiceName: "serviceName",
            ServiceProviderName: "serviceProviderName",
          }),
        ),
      ).annotate({ identifier: "DvbSdtSettings" });
    case 10:
      return S.suspend(() =>
        S.Struct({ RepInterval: S.optional(S.Number) }).pipe(
          S.encodeKeys({ RepInterval: "repInterval" }),
        ),
      ).annotate({ identifier: "DvbTdtSettings" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          AbsentInputAudioBehavior: S.optional(S.String),
          Arib: S.optional(S.String),
          AribCaptionsPid: S.optional(S.String),
          AribCaptionsPidControl: S.optional(S.String),
          AudioBufferModel: S.optional(S.String),
          AudioFramesPerPes: S.optional(S.Number),
          AudioPids: S.optional(S.String),
          AudioStreamType: S.optional(S.String),
          Bitrate: S.optional(S.Number),
          BufferModel: S.optional(S.String),
          CcDescriptor: S.optional(S.String),
          DvbNitSettings: S.optional(__S(1672, __c52, 8)),
          DvbSdtSettings: S.optional(__S(1673, __c52, 9)),
          DvbSubPids: S.optional(S.String),
          DvbTdtSettings: S.optional(__S(1674, __c52, 10)),
          DvbTeletextPid: S.optional(S.String),
          Ebif: S.optional(S.String),
          EbpAudioInterval: S.optional(S.String),
          EbpLookaheadMs: S.optional(S.Number),
          EbpPlacement: S.optional(S.String),
          EcmPid: S.optional(S.String),
          EsRateInPes: S.optional(S.String),
          EtvPlatformPid: S.optional(S.String),
          EtvSignalPid: S.optional(S.String),
          FragmentTime: S.optional(S.Number),
          Klv: S.optional(S.String),
          KlvDataPids: S.optional(S.String),
          NielsenId3Behavior: S.optional(S.String),
          NullPacketBitrate: S.optional(S.Number),
          PatInterval: S.optional(S.Number),
          PcrControl: S.optional(S.String),
          PcrPeriod: S.optional(S.Number),
          PcrPid: S.optional(S.String),
          PmtInterval: S.optional(S.Number),
          PmtPid: S.optional(S.String),
          ProgramNum: S.optional(S.Number),
          RateMode: S.optional(S.String),
          Scte27Pids: S.optional(S.String),
          Scte35Control: S.optional(S.String),
          Scte35Pid: S.optional(S.String),
          SegmentationMarkers: S.optional(S.String),
          SegmentationStyle: S.optional(S.String),
          SegmentationTime: S.optional(S.Number),
          TimedMetadataBehavior: S.optional(S.String),
          TimedMetadataPid: S.optional(S.String),
          TransportStreamId: S.optional(S.Number),
          VideoPid: S.optional(S.String),
          Scte35PrerollPullupMilliseconds: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            AbsentInputAudioBehavior: "absentInputAudioBehavior",
            Arib: "arib",
            AribCaptionsPid: "aribCaptionsPid",
            AribCaptionsPidControl: "aribCaptionsPidControl",
            AudioBufferModel: "audioBufferModel",
            AudioFramesPerPes: "audioFramesPerPes",
            AudioPids: "audioPids",
            AudioStreamType: "audioStreamType",
            Bitrate: "bitrate",
            BufferModel: "bufferModel",
            CcDescriptor: "ccDescriptor",
            DvbNitSettings: "dvbNitSettings",
            DvbSdtSettings: "dvbSdtSettings",
            DvbSubPids: "dvbSubPids",
            DvbTdtSettings: "dvbTdtSettings",
            DvbTeletextPid: "dvbTeletextPid",
            Ebif: "ebif",
            EbpAudioInterval: "ebpAudioInterval",
            EbpLookaheadMs: "ebpLookaheadMs",
            EbpPlacement: "ebpPlacement",
            EcmPid: "ecmPid",
            EsRateInPes: "esRateInPes",
            EtvPlatformPid: "etvPlatformPid",
            EtvSignalPid: "etvSignalPid",
            FragmentTime: "fragmentTime",
            Klv: "klv",
            KlvDataPids: "klvDataPids",
            NielsenId3Behavior: "nielsenId3Behavior",
            NullPacketBitrate: "nullPacketBitrate",
            PatInterval: "patInterval",
            PcrControl: "pcrControl",
            PcrPeriod: "pcrPeriod",
            PcrPid: "pcrPid",
            PmtInterval: "pmtInterval",
            PmtPid: "pmtPid",
            ProgramNum: "programNum",
            RateMode: "rateMode",
            Scte27Pids: "scte27Pids",
            Scte35Control: "scte35Control",
            Scte35Pid: "scte35Pid",
            SegmentationMarkers: "segmentationMarkers",
            SegmentationStyle: "segmentationStyle",
            SegmentationTime: "segmentationTime",
            TimedMetadataBehavior: "timedMetadataBehavior",
            TimedMetadataPid: "timedMetadataPid",
            TransportStreamId: "transportStreamId",
            VideoPid: "videoPid",
            Scte35PrerollPullupMilliseconds: "scte35PrerollPullupMilliseconds",
          }),
        ),
      ).annotate({ identifier: "M2tsSettings" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          M2tsSettings: S.optional(__S(1675, __c52, 11)),
          RawSettings: S.optional(__S(32, __c1, 0)),
        }).pipe(S.encodeKeys({ M2tsSettings: "m2tsSettings", RawSettings: "rawSettings" })),
      ).annotate({ identifier: "ArchiveContainerSettings" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          ContainerSettings: S.optional(__S(1676, __c52, 12)),
          Extension: S.optional(S.String),
          NameModifier: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ContainerSettings: "containerSettings",
            Extension: "extension",
            NameModifier: "nameModifier",
          }),
        ),
      ).annotate({ identifier: "ArchiveOutputSettings" });
    case 14:
      return S.suspend(() =>
        S.Struct({ NameModifier: S.optional(S.String) }).pipe(
          S.encodeKeys({ NameModifier: "nameModifier" }),
        ),
      ).annotate({ identifier: "FrameCaptureOutputSettings" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          AudioGroupId: S.optional(S.String),
          AudioOnlyImage: S.optional(__S(1344, __c42, 0)),
          AudioTrackType: S.optional(S.String),
          SegmentType: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AudioGroupId: "audioGroupId",
            AudioOnlyImage: "audioOnlyImage",
            AudioTrackType: "audioTrackType",
            SegmentType: "segmentType",
          }),
        ),
      ).annotate({ identifier: "AudioOnlyHlsSettings" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          AudioRenditionSets: S.optional(S.String),
          NielsenId3Behavior: S.optional(S.String),
          TimedMetadataBehavior: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AudioRenditionSets: "audioRenditionSets",
            NielsenId3Behavior: "nielsenId3Behavior",
            TimedMetadataBehavior: "timedMetadataBehavior",
          }),
        ),
      ).annotate({ identifier: "Fmp4HlsSettings" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          AudioFramesPerPes: S.optional(S.Number),
          AudioPids: S.optional(S.String),
          EcmPid: S.optional(S.String),
          NielsenId3Behavior: S.optional(S.String),
          PatInterval: S.optional(S.Number),
          PcrControl: S.optional(S.String),
          PcrPeriod: S.optional(S.Number),
          PcrPid: S.optional(S.String),
          PmtInterval: S.optional(S.Number),
          PmtPid: S.optional(S.String),
          ProgramNum: S.optional(S.Number),
          Scte35Behavior: S.optional(S.String),
          Scte35Pid: S.optional(S.String),
          TimedMetadataBehavior: S.optional(S.String),
          TimedMetadataPid: S.optional(S.String),
          TransportStreamId: S.optional(S.Number),
          VideoPid: S.optional(S.String),
          KlvBehavior: S.optional(S.String),
          KlvDataPids: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AudioFramesPerPes: "audioFramesPerPes",
            AudioPids: "audioPids",
            EcmPid: "ecmPid",
            NielsenId3Behavior: "nielsenId3Behavior",
            PatInterval: "patInterval",
            PcrControl: "pcrControl",
            PcrPeriod: "pcrPeriod",
            PcrPid: "pcrPid",
            PmtInterval: "pmtInterval",
            PmtPid: "pmtPid",
            ProgramNum: "programNum",
            Scte35Behavior: "scte35Behavior",
            Scte35Pid: "scte35Pid",
            TimedMetadataBehavior: "timedMetadataBehavior",
            TimedMetadataPid: "timedMetadataPid",
            TransportStreamId: "transportStreamId",
            VideoPid: "videoPid",
            KlvBehavior: "klvBehavior",
            KlvDataPids: "klvDataPids",
          }),
        ),
      ).annotate({ identifier: "M3u8Settings" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          AudioRenditionSets: S.optional(S.String),
          M3u8Settings: S.optional(__S(1681, __c52, 17)),
        }).pipe(
          S.encodeKeys({ AudioRenditionSets: "audioRenditionSets", M3u8Settings: "m3u8Settings" }),
        ),
      ).annotate({ identifier: "StandardHlsSettings" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          AudioOnlyHlsSettings: S.optional(__S(1679, __c52, 15)),
          Fmp4HlsSettings: S.optional(__S(1680, __c52, 16)),
          FrameCaptureHlsSettings: S.optional(__S(32, __c1, 0)),
          StandardHlsSettings: S.optional(__S(1682, __c52, 18)),
        }).pipe(
          S.encodeKeys({
            AudioOnlyHlsSettings: "audioOnlyHlsSettings",
            Fmp4HlsSettings: "fmp4HlsSettings",
            FrameCaptureHlsSettings: "frameCaptureHlsSettings",
            StandardHlsSettings: "standardHlsSettings",
          }),
        ),
      ).annotate({ identifier: "HlsSettings" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          H265PackagingType: S.optional(S.String),
          HlsSettings: S.optional(__S(1683, __c52, 19)),
          NameModifier: S.optional(S.String),
          SegmentModifier: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            H265PackagingType: "h265PackagingType",
            HlsSettings: "hlsSettings",
            NameModifier: "nameModifier",
            SegmentModifier: "segmentModifier",
          }),
        ),
      ).annotate({ identifier: "HlsOutputSettings" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          AudioGroupId: S.optional(S.String),
          AudioRenditionSets: S.optional(S.String),
          HlsAutoSelect: S.optional(S.String),
          HlsDefault: S.optional(S.String),
          OutputUsage: S.optional(__listOfOutputUsage),
        }).pipe(
          S.encodeKeys({
            AudioGroupId: "audioGroupId",
            AudioRenditionSets: "audioRenditionSets",
            HlsAutoSelect: "hlsAutoSelect",
            HlsDefault: "hlsDefault",
            OutputUsage: "outputUsage",
          }),
        ),
      ).annotate({ identifier: "MediaPackageV2DestinationSettings" });
    case 22:
      return S.suspend(() =>
        S.Struct({ MediaPackageV2DestinationSettings: S.optional(__S(1685, __c52, 21)) }).pipe(
          S.encodeKeys({ MediaPackageV2DestinationSettings: "mediaPackageV2DestinationSettings" }),
        ),
      ).annotate({ identifier: "MediaPackageOutputSettings" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          H265PackagingType: S.optional(S.String),
          NameModifier: S.optional(S.String),
        }).pipe(
          S.encodeKeys({ H265PackagingType: "h265PackagingType", NameModifier: "nameModifier" }),
        ),
      ).annotate({ identifier: "MsSmoothOutputSettings" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          AbsentInputAudioBehavior: S.optional(S.String),
          Arib: S.optional(S.String),
          AudioBufferModel: S.optional(S.String),
          AudioFramesPerPes: S.optional(S.Number),
          AudioStreamType: S.optional(S.String),
          CcDescriptor: S.optional(S.String),
          Ebif: S.optional(S.String),
          EsRateInPes: S.optional(S.String),
          Klv: S.optional(S.String),
          NielsenId3Behavior: S.optional(S.String),
          PcrControl: S.optional(S.String),
          PcrPeriod: S.optional(S.Number),
          Scte35Control: S.optional(S.String),
          Scte35PrerollPullupMilliseconds: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            AbsentInputAudioBehavior: "absentInputAudioBehavior",
            Arib: "arib",
            AudioBufferModel: "audioBufferModel",
            AudioFramesPerPes: "audioFramesPerPes",
            AudioStreamType: "audioStreamType",
            CcDescriptor: "ccDescriptor",
            Ebif: "ebif",
            EsRateInPes: "esRateInPes",
            Klv: "klv",
            NielsenId3Behavior: "nielsenId3Behavior",
            PcrControl: "pcrControl",
            PcrPeriod: "pcrPeriod",
            Scte35Control: "scte35Control",
            Scte35PrerollPullupMilliseconds: "scte35PrerollPullupMilliseconds",
          }),
        ),
      ).annotate({ identifier: "MultiplexM2tsSettings" });
    case 25:
      return S.suspend(() =>
        S.Struct({ MultiplexM2tsSettings: S.optional(__S(1688, __c52, 24)) }).pipe(
          S.encodeKeys({ MultiplexM2tsSettings: "multiplexM2tsSettings" }),
        ),
      ).annotate({ identifier: "MultiplexContainerSettings" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          Destination: S.optional(__S(1640, __c51, 8)),
          ContainerSettings: S.optional(__S(1689, __c52, 25)),
        }).pipe(
          S.encodeKeys({ Destination: "destination", ContainerSettings: "containerSettings" }),
        ),
      ).annotate({ identifier: "MultiplexOutputSettings" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          CertificateMode: S.optional(S.String),
          ConnectionRetryInterval: S.optional(S.Number),
          Destination: S.optional(__S(1640, __c51, 8)),
          NumRetries: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            CertificateMode: "certificateMode",
            ConnectionRetryInterval: "connectionRetryInterval",
            Destination: "destination",
            NumRetries: "numRetries",
          }),
        ),
      ).annotate({ identifier: "RtmpOutputSettings" });
    case 28:
      return S.suspend(() =>
        S.Struct({ M2tsSettings: S.optional(__S(1675, __c52, 11)) }).pipe(
          S.encodeKeys({ M2tsSettings: "m2tsSettings" }),
        ),
      ).annotate({ identifier: "UdpContainerSettings" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          ColumnDepth: S.optional(S.Number),
          IncludeFec: S.optional(S.String),
          RowLength: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            ColumnDepth: "columnDepth",
            IncludeFec: "includeFec",
            RowLength: "rowLength",
          }),
        ),
      ).annotate({ identifier: "FecOutputSettings" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          BufferMsec: S.optional(S.Number),
          ContainerSettings: S.optional(__S(1692, __c52, 28)),
          Destination: S.optional(__S(1640, __c51, 8)),
          FecOutputSettings: S.optional(__S(1693, __c52, 29)),
        }).pipe(
          S.encodeKeys({
            BufferMsec: "bufferMsec",
            ContainerSettings: "containerSettings",
            Destination: "destination",
            FecOutputSettings: "fecOutputSettings",
          }),
        ),
      ).annotate({ identifier: "UdpOutputSettings" });
    case 31:
      return S.suspend(() =>
        S.Struct({
          BufferMsec: S.optional(S.Number),
          ContainerSettings: S.optional(__S(1692, __c52, 28)),
          Destination: S.optional(__S(1640, __c51, 8)),
          EncryptionType: S.optional(S.String),
          Latency: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            BufferMsec: "bufferMsec",
            ContainerSettings: "containerSettings",
            Destination: "destination",
            EncryptionType: "encryptionType",
            Latency: "latency",
          }),
        ),
      ).annotate({ identifier: "SrtOutputSettings" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Pipeline0: S.optional(S.String), Pipeline1: S.optional(S.String) }).pipe(
          S.encodeKeys({ Pipeline0: "pipeline0", Pipeline1: "pipeline1" }),
        ),
      ).annotate({ identifier: "MediaConnectRouterOutputConnectionMap" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConnectedRouterInputs: S.optional(__S(1696, __c53, 0)),
          ContainerSettings: S.optional(__S(1692, __c52, 28)),
          Destination: S.optional(__S(1640, __c51, 8)),
        }).pipe(
          S.encodeKeys({
            ConnectedRouterInputs: "connectedRouterInputs",
            ContainerSettings: "containerSettings",
            Destination: "destination",
          }),
        ),
      ).annotate({ identifier: "MediaConnectRouterOutputSettings" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ArchiveOutputSettings: S.optional(__S(1677, __c52, 13)),
          FrameCaptureOutputSettings: S.optional(__S(1678, __c52, 14)),
          HlsOutputSettings: S.optional(__S(1684, __c52, 20)),
          MediaPackageOutputSettings: S.optional(__S(1686, __c52, 22)),
          MsSmoothOutputSettings: S.optional(__S(1687, __c52, 23)),
          MultiplexOutputSettings: S.optional(__S(1690, __c52, 26)),
          RtmpOutputSettings: S.optional(__S(1691, __c52, 27)),
          UdpOutputSettings: S.optional(__S(1694, __c52, 30)),
          CmafIngestOutputSettings: S.optional(__S(1678, __c52, 14)),
          SrtOutputSettings: S.optional(__S(1695, __c52, 31)),
          MediaConnectRouterOutputSettings: S.optional(__S(1697, __c53, 1)),
        }).pipe(
          S.encodeKeys({
            ArchiveOutputSettings: "archiveOutputSettings",
            FrameCaptureOutputSettings: "frameCaptureOutputSettings",
            HlsOutputSettings: "hlsOutputSettings",
            MediaPackageOutputSettings: "mediaPackageOutputSettings",
            MsSmoothOutputSettings: "msSmoothOutputSettings",
            MultiplexOutputSettings: "multiplexOutputSettings",
            RtmpOutputSettings: "rtmpOutputSettings",
            UdpOutputSettings: "udpOutputSettings",
            CmafIngestOutputSettings: "cmafIngestOutputSettings",
            SrtOutputSettings: "srtOutputSettings",
            MediaConnectRouterOutputSettings: "mediaConnectRouterOutputSettings",
          }),
        ),
      ).annotate({ identifier: "OutputSettings" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AudioDescriptionNames: S.optional(__listOf__string),
          CaptionDescriptionNames: S.optional(__listOf__string),
          OutputName: S.optional(S.String),
          OutputSettings: S.optional(__S(1698, __c53, 2)),
          VideoDescriptionName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AudioDescriptionNames: "audioDescriptionNames",
            CaptionDescriptionNames: "captionDescriptionNames",
            OutputName: "outputName",
            OutputSettings: "outputSettings",
            VideoDescriptionName: "videoDescriptionName",
          }),
        ),
      ).annotate({ identifier: "Output" });
    case 4:
      return S.Array(__S(1699, __c53, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          OutputGroupSettings: S.optional(__S(1671, __c52, 7)),
          Outputs: S.optional(__listOfOutput),
        }).pipe(
          S.encodeKeys({
            Name: "name",
            OutputGroupSettings: "outputGroupSettings",
            Outputs: "outputs",
          }),
        ),
      ).annotate({ identifier: "OutputGroup" });
    case 6:
      return S.Array(__S(1701, __c53, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ Source: S.optional(S.String), SyncThreshold: S.optional(S.Number) }).pipe(
          S.encodeKeys({ Source: "source", SyncThreshold: "syncThreshold" }),
        ),
      ).annotate({ identifier: "TimecodeConfig" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          FontSize: S.optional(S.String),
          Position: S.optional(S.String),
          Prefix: S.optional(S.String),
        }).pipe(S.encodeKeys({ FontSize: "fontSize", Position: "position", Prefix: "prefix" })),
      ).annotate({ identifier: "TimecodeBurninSettings" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          CaptureInterval: S.optional(S.Number),
          CaptureIntervalUnits: S.optional(S.String),
          TimecodeBurninSettings: S.optional(__S(1704, __c53, 8)),
        }).pipe(
          S.encodeKeys({
            CaptureInterval: "captureInterval",
            CaptureIntervalUnits: "captureIntervalUnits",
            TimecodeBurninSettings: "timecodeBurninSettings",
          }),
        ),
      ).annotate({ identifier: "FrameCaptureSettings" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          ColorSpacePassthroughSettings: S.optional(__S(32, __c1, 0)),
          Rec601Settings: S.optional(__S(32, __c1, 0)),
          Rec709Settings: S.optional(__S(32, __c1, 0)),
        }).pipe(
          S.encodeKeys({
            ColorSpacePassthroughSettings: "colorSpacePassthroughSettings",
            Rec601Settings: "rec601Settings",
            Rec709Settings: "rec709Settings",
          }),
        ),
      ).annotate({ identifier: "H264ColorSpaceSettings" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          PostFilterSharpening: S.optional(S.String),
          Strength: S.optional(S.String),
        }).pipe(
          S.encodeKeys({ PostFilterSharpening: "postFilterSharpening", Strength: "strength" }),
        ),
      ).annotate({ identifier: "TemporalFilterSettings" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          TemporalFilterSettings: S.optional(__S(1707, __c53, 11)),
          BandwidthReductionFilterSettings: S.optional(__S(1707, __c53, 11)),
        }).pipe(
          S.encodeKeys({
            TemporalFilterSettings: "temporalFilterSettings",
            BandwidthReductionFilterSettings: "bandwidthReductionFilterSettings",
          }),
        ),
      ).annotate({ identifier: "H264FilterSettings" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          AdaptiveQuantization: S.optional(S.String),
          AfdSignaling: S.optional(S.String),
          Bitrate: S.optional(S.Number),
          BufFillPct: S.optional(S.Number),
          BufSize: S.optional(S.Number),
          ColorMetadata: S.optional(S.String),
          ColorSpaceSettings: S.optional(__S(1706, __c53, 10)),
          EntropyEncoding: S.optional(S.String),
          FilterSettings: S.optional(__S(1708, __c53, 12)),
          FixedAfd: S.optional(S.String),
          FlickerAq: S.optional(S.String),
          ForceFieldPictures: S.optional(S.String),
          FramerateControl: S.optional(S.String),
          FramerateDenominator: S.optional(S.Number),
          FramerateNumerator: S.optional(S.Number),
          GopBReference: S.optional(S.String),
          GopClosedCadence: S.optional(S.Number),
          GopNumBFrames: S.optional(S.Number),
          GopSize: S.optional(S.Number),
          GopSizeUnits: S.optional(S.String),
          Level: S.optional(S.String),
          LookAheadRateControl: S.optional(S.String),
          MaxBitrate: S.optional(S.Number),
          MinIInterval: S.optional(S.Number),
          NumRefFrames: S.optional(S.Number),
          ParControl: S.optional(S.String),
          ParDenominator: S.optional(S.Number),
          ParNumerator: S.optional(S.Number),
          Profile: S.optional(S.String),
          QualityLevel: S.optional(S.String),
          QvbrQualityLevel: S.optional(S.Number),
          RateControlMode: S.optional(S.String),
          ScanType: S.optional(S.String),
          SceneChangeDetect: S.optional(S.String),
          Slices: S.optional(S.Number),
          Softness: S.optional(S.Number),
          SpatialAq: S.optional(S.String),
          SubgopLength: S.optional(S.String),
          Syntax: S.optional(S.String),
          TemporalAq: S.optional(S.String),
          TimecodeInsertion: S.optional(S.String),
          TimecodeBurninSettings: S.optional(__S(1704, __c53, 8)),
          MinQp: S.optional(S.Number),
          MinBitrate: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            AdaptiveQuantization: "adaptiveQuantization",
            AfdSignaling: "afdSignaling",
            Bitrate: "bitrate",
            BufFillPct: "bufFillPct",
            BufSize: "bufSize",
            ColorMetadata: "colorMetadata",
            ColorSpaceSettings: "colorSpaceSettings",
            EntropyEncoding: "entropyEncoding",
            FilterSettings: "filterSettings",
            FixedAfd: "fixedAfd",
            FlickerAq: "flickerAq",
            ForceFieldPictures: "forceFieldPictures",
            FramerateControl: "framerateControl",
            FramerateDenominator: "framerateDenominator",
            FramerateNumerator: "framerateNumerator",
            GopBReference: "gopBReference",
            GopClosedCadence: "gopClosedCadence",
            GopNumBFrames: "gopNumBFrames",
            GopSize: "gopSize",
            GopSizeUnits: "gopSizeUnits",
            Level: "level",
            LookAheadRateControl: "lookAheadRateControl",
            MaxBitrate: "maxBitrate",
            MinIInterval: "minIInterval",
            NumRefFrames: "numRefFrames",
            ParControl: "parControl",
            ParDenominator: "parDenominator",
            ParNumerator: "parNumerator",
            Profile: "profile",
            QualityLevel: "qualityLevel",
            QvbrQualityLevel: "qvbrQualityLevel",
            RateControlMode: "rateControlMode",
            ScanType: "scanType",
            SceneChangeDetect: "sceneChangeDetect",
            Slices: "slices",
            Softness: "softness",
            SpatialAq: "spatialAq",
            SubgopLength: "subgopLength",
            Syntax: "syntax",
            TemporalAq: "temporalAq",
            TimecodeInsertion: "timecodeInsertion",
            TimecodeBurninSettings: "timecodeBurninSettings",
            MinQp: "minQp",
            MinBitrate: "minBitrate",
          }),
        ),
      ).annotate({ identifier: "H264Settings" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          ColorSpacePassthroughSettings: S.optional(__S(32, __c1, 0)),
          DolbyVision81Settings: S.optional(__S(32, __c1, 0)),
          Hdr10Settings: S.optional(__S(1811, __c56, 19)),
          Rec601Settings: S.optional(__S(32, __c1, 0)),
          Rec709Settings: S.optional(__S(32, __c1, 0)),
          Hlg2020Settings: S.optional(__S(32, __c1, 0)),
        }).pipe(
          S.encodeKeys({
            ColorSpacePassthroughSettings: "colorSpacePassthroughSettings",
            DolbyVision81Settings: "dolbyVision81Settings",
            Hdr10Settings: "hdr10Settings",
            Rec601Settings: "rec601Settings",
            Rec709Settings: "rec709Settings",
            Hlg2020Settings: "hlg2020Settings",
          }),
        ),
      ).annotate({ identifier: "H265ColorSpaceSettings" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          AdaptiveQuantization: S.optional(S.String),
          AfdSignaling: S.optional(S.String),
          AlternativeTransferFunction: S.optional(S.String),
          Bitrate: S.optional(S.Number),
          BufSize: S.optional(S.Number),
          ColorMetadata: S.optional(S.String),
          ColorSpaceSettings: S.optional(__S(1710, __c53, 14)),
          FilterSettings: S.optional(__S(1708, __c53, 12)),
          FixedAfd: S.optional(S.String),
          FlickerAq: S.optional(S.String),
          FramerateDenominator: S.optional(S.Number),
          FramerateNumerator: S.optional(S.Number),
          GopClosedCadence: S.optional(S.Number),
          GopSize: S.optional(S.Number),
          GopSizeUnits: S.optional(S.String),
          Level: S.optional(S.String),
          LookAheadRateControl: S.optional(S.String),
          MaxBitrate: S.optional(S.Number),
          MinIInterval: S.optional(S.Number),
          ParDenominator: S.optional(S.Number),
          ParNumerator: S.optional(S.Number),
          Profile: S.optional(S.String),
          QvbrQualityLevel: S.optional(S.Number),
          RateControlMode: S.optional(S.String),
          ScanType: S.optional(S.String),
          SceneChangeDetect: S.optional(S.String),
          Slices: S.optional(S.Number),
          Tier: S.optional(S.String),
          TimecodeInsertion: S.optional(S.String),
          TimecodeBurninSettings: S.optional(__S(1704, __c53, 8)),
          MvOverPictureBoundaries: S.optional(S.String),
          MvTemporalPredictor: S.optional(S.String),
          TileHeight: S.optional(S.Number),
          TilePadding: S.optional(S.String),
          TileWidth: S.optional(S.Number),
          TreeblockSize: S.optional(S.String),
          MinQp: S.optional(S.Number),
          Deblocking: S.optional(S.String),
          GopBReference: S.optional(S.String),
          GopNumBFrames: S.optional(S.Number),
          MinBitrate: S.optional(S.Number),
          SubgopLength: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AdaptiveQuantization: "adaptiveQuantization",
            AfdSignaling: "afdSignaling",
            AlternativeTransferFunction: "alternativeTransferFunction",
            Bitrate: "bitrate",
            BufSize: "bufSize",
            ColorMetadata: "colorMetadata",
            ColorSpaceSettings: "colorSpaceSettings",
            FilterSettings: "filterSettings",
            FixedAfd: "fixedAfd",
            FlickerAq: "flickerAq",
            FramerateDenominator: "framerateDenominator",
            FramerateNumerator: "framerateNumerator",
            GopClosedCadence: "gopClosedCadence",
            GopSize: "gopSize",
            GopSizeUnits: "gopSizeUnits",
            Level: "level",
            LookAheadRateControl: "lookAheadRateControl",
            MaxBitrate: "maxBitrate",
            MinIInterval: "minIInterval",
            ParDenominator: "parDenominator",
            ParNumerator: "parNumerator",
            Profile: "profile",
            QvbrQualityLevel: "qvbrQualityLevel",
            RateControlMode: "rateControlMode",
            ScanType: "scanType",
            SceneChangeDetect: "sceneChangeDetect",
            Slices: "slices",
            Tier: "tier",
            TimecodeInsertion: "timecodeInsertion",
            TimecodeBurninSettings: "timecodeBurninSettings",
            MvOverPictureBoundaries: "mvOverPictureBoundaries",
            MvTemporalPredictor: "mvTemporalPredictor",
            TileHeight: "tileHeight",
            TilePadding: "tilePadding",
            TileWidth: "tileWidth",
            TreeblockSize: "treeblockSize",
            MinQp: "minQp",
            Deblocking: "deblocking",
            GopBReference: "gopBReference",
            GopNumBFrames: "gopNumBFrames",
            MinBitrate: "minBitrate",
            SubgopLength: "subgopLength",
          }),
        ),
      ).annotate({ identifier: "H265Settings" });
    case 16:
      return S.suspend(() =>
        S.Struct({ TemporalFilterSettings: S.optional(__S(1707, __c53, 11)) }).pipe(
          S.encodeKeys({ TemporalFilterSettings: "temporalFilterSettings" }),
        ),
      ).annotate({ identifier: "Mpeg2FilterSettings" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          AdaptiveQuantization: S.optional(S.String),
          AfdSignaling: S.optional(S.String),
          ColorMetadata: S.optional(S.String),
          ColorSpace: S.optional(S.String),
          DisplayAspectRatio: S.optional(S.String),
          FilterSettings: S.optional(__S(1712, __c53, 16)),
          FixedAfd: S.optional(S.String),
          FramerateDenominator: S.optional(S.Number),
          FramerateNumerator: S.optional(S.Number),
          GopClosedCadence: S.optional(S.Number),
          GopNumBFrames: S.optional(S.Number),
          GopSize: S.optional(S.Number),
          GopSizeUnits: S.optional(S.String),
          ScanType: S.optional(S.String),
          SubgopLength: S.optional(S.String),
          TimecodeInsertion: S.optional(S.String),
          TimecodeBurninSettings: S.optional(__S(1704, __c53, 8)),
        }).pipe(
          S.encodeKeys({
            AdaptiveQuantization: "adaptiveQuantization",
            AfdSignaling: "afdSignaling",
            ColorMetadata: "colorMetadata",
            ColorSpace: "colorSpace",
            DisplayAspectRatio: "displayAspectRatio",
            FilterSettings: "filterSettings",
            FixedAfd: "fixedAfd",
            FramerateDenominator: "framerateDenominator",
            FramerateNumerator: "framerateNumerator",
            GopClosedCadence: "gopClosedCadence",
            GopNumBFrames: "gopNumBFrames",
            GopSize: "gopSize",
            GopSizeUnits: "gopSizeUnits",
            ScanType: "scanType",
            SubgopLength: "subgopLength",
            TimecodeInsertion: "timecodeInsertion",
            TimecodeBurninSettings: "timecodeBurninSettings",
          }),
        ),
      ).annotate({ identifier: "Mpeg2Settings" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          ColorSpacePassthroughSettings: S.optional(__S(32, __c1, 0)),
          Hdr10Settings: S.optional(__S(1811, __c56, 19)),
          Rec601Settings: S.optional(__S(32, __c1, 0)),
          Rec709Settings: S.optional(__S(32, __c1, 0)),
          Hlg2020Settings: S.optional(__S(32, __c1, 0)),
        }).pipe(
          S.encodeKeys({
            ColorSpacePassthroughSettings: "colorSpacePassthroughSettings",
            Hdr10Settings: "hdr10Settings",
            Rec601Settings: "rec601Settings",
            Rec709Settings: "rec709Settings",
            Hlg2020Settings: "hlg2020Settings",
          }),
        ),
      ).annotate({ identifier: "Av1ColorSpaceSettings" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          AfdSignaling: S.optional(S.String),
          BufSize: S.optional(S.Number),
          ColorSpaceSettings: S.optional(__S(1714, __c53, 18)),
          FixedAfd: S.optional(S.String),
          FramerateDenominator: S.optional(S.Number),
          FramerateNumerator: S.optional(S.Number),
          GopSize: S.optional(S.Number),
          GopSizeUnits: S.optional(S.String),
          Level: S.optional(S.String),
          LookAheadRateControl: S.optional(S.String),
          MaxBitrate: S.optional(S.Number),
          MinIInterval: S.optional(S.Number),
          ParDenominator: S.optional(S.Number),
          ParNumerator: S.optional(S.Number),
          QvbrQualityLevel: S.optional(S.Number),
          SceneChangeDetect: S.optional(S.String),
          TimecodeBurninSettings: S.optional(__S(1704, __c53, 8)),
          Bitrate: S.optional(S.Number),
          RateControlMode: S.optional(S.String),
          MinBitrate: S.optional(S.Number),
          SpatialAq: S.optional(S.String),
          TemporalAq: S.optional(S.String),
          TimecodeInsertion: S.optional(S.String),
          BitDepth: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AfdSignaling: "afdSignaling",
            BufSize: "bufSize",
            ColorSpaceSettings: "colorSpaceSettings",
            FixedAfd: "fixedAfd",
            FramerateDenominator: "framerateDenominator",
            FramerateNumerator: "framerateNumerator",
            GopSize: "gopSize",
            GopSizeUnits: "gopSizeUnits",
            Level: "level",
            LookAheadRateControl: "lookAheadRateControl",
            MaxBitrate: "maxBitrate",
            MinIInterval: "minIInterval",
            ParDenominator: "parDenominator",
            ParNumerator: "parNumerator",
            QvbrQualityLevel: "qvbrQualityLevel",
            SceneChangeDetect: "sceneChangeDetect",
            TimecodeBurninSettings: "timecodeBurninSettings",
            Bitrate: "bitrate",
            RateControlMode: "rateControlMode",
            MinBitrate: "minBitrate",
            SpatialAq: "spatialAq",
            TemporalAq: "temporalAq",
            TimecodeInsertion: "timecodeInsertion",
            BitDepth: "bitDepth",
          }),
        ),
      ).annotate({ identifier: "Av1Settings" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          FrameCaptureSettings: S.optional(__S(1705, __c53, 9)),
          H264Settings: S.optional(__S(1709, __c53, 13)),
          H265Settings: S.optional(__S(1711, __c53, 15)),
          Mpeg2Settings: S.optional(__S(1713, __c53, 17)),
          Av1Settings: S.optional(__S(1715, __c53, 19)),
        }).pipe(
          S.encodeKeys({
            FrameCaptureSettings: "frameCaptureSettings",
            H264Settings: "h264Settings",
            H265Settings: "h265Settings",
            Mpeg2Settings: "mpeg2Settings",
            Av1Settings: "av1Settings",
          }),
        ),
      ).annotate({ identifier: "VideoCodecSettings" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          Height: S.optional(S.Number),
          Width: S.optional(S.Number),
          X: S.optional(S.Number),
          Y: S.optional(S.Number),
        }).pipe(S.encodeKeys({ Height: "height", Width: "width", X: "x", Y: "y" })),
      ).annotate({ identifier: "VideoPositionRectangle" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          CodecSettings: S.optional(__S(1716, __c53, 20)),
          Height: S.optional(S.Number),
          Name: S.optional(S.String),
          RespondToAfd: S.optional(S.String),
          ScalingBehavior: S.optional(S.String),
          Sharpness: S.optional(S.Number),
          Width: S.optional(S.Number),
          CropRectangle: S.optional(__S(1717, __c53, 21)),
          OutputPositionRectangle: S.optional(__S(1717, __c53, 21)),
          Border: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            CodecSettings: "codecSettings",
            Height: "height",
            Name: "name",
            RespondToAfd: "respondToAfd",
            ScalingBehavior: "scalingBehavior",
            Sharpness: "sharpness",
            Width: "width",
            CropRectangle: "cropRectangle",
            OutputPositionRectangle: "outputPositionRectangle",
            Border: "border",
          }),
        ),
      ).annotate({ identifier: "VideoDescription" });
    case 23:
      return S.Array(__S(1718, __c53, 22));
    case 24:
      return S.suspend(() =>
        S.Struct({ State: S.optional(S.String) }).pipe(S.encodeKeys({ State: "state" })),
      ).annotate({ identifier: "ThumbnailConfiguration" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          InputColorSpace: S.optional(S.String),
          OutputColorSpace: S.optional(S.String),
          Uri: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            InputColorSpace: "inputColorSpace",
            OutputColorSpace: "outputColorSpace",
            Uri: "uri",
          }),
        ),
      ).annotate({ identifier: "ColorCorrection" });
    case 26:
      return S.Array(__S(1721, __c53, 25));
    case 27:
      return S.suspend(() =>
        S.Struct({ GlobalColorCorrections: S.optional(__listOfColorCorrection) }).pipe(
          S.encodeKeys({ GlobalColorCorrections: "globalColorCorrections" }),
        ),
      ).annotate({ identifier: "ColorCorrectionSettings" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          AudioDescriptions: S.optional(__listOfAudioDescription),
          AvailBlanking: S.optional(__S(1613, __c50, 13)),
          AvailConfiguration: S.optional(__S(1617, __c50, 17)),
          BlackoutSlate: S.optional(__S(1618, __c50, 18)),
          CaptionDescriptions: S.optional(__listOfCaptionDescription),
          FeatureActivations: S.optional(__S(1628, __c50, 28)),
          GlobalConfiguration: S.optional(__S(1634, __c51, 2)),
          MotionGraphicsConfiguration: S.optional(__S(1636, __c51, 4)),
          NielsenConfiguration: S.optional(__S(1637, __c51, 5)),
          OutputGroups: S.optional(__listOfOutputGroup),
          TimecodeConfig: S.optional(__S(1703, __c53, 7)),
          VideoDescriptions: S.optional(__listOfVideoDescription),
          ThumbnailConfiguration: S.optional(__S(1720, __c53, 24)),
          ColorCorrectionSettings: S.optional(__S(1723, __c53, 27)),
        }).pipe(
          S.encodeKeys({
            AudioDescriptions: "audioDescriptions",
            AvailBlanking: "availBlanking",
            AvailConfiguration: "availConfiguration",
            BlackoutSlate: "blackoutSlate",
            CaptionDescriptions: "captionDescriptions",
            FeatureActivations: "featureActivations",
            GlobalConfiguration: "globalConfiguration",
            MotionGraphicsConfiguration: "motionGraphicsConfiguration",
            NielsenConfiguration: "nielsenConfiguration",
            OutputGroups: "outputGroups",
            TimecodeConfig: "timecodeConfig",
            VideoDescriptions: "videoDescriptions",
            ThumbnailConfiguration: "thumbnailConfiguration",
            ColorCorrectionSettings: "colorCorrectionSettings",
          }),
        ),
      ).annotate({ identifier: "EncoderSettings" });
    case 29:
      return S.suspend(() =>
        S.Struct({ RouterInputArn: S.optional(S.String) }).pipe(
          S.encodeKeys({ RouterInputArn: "routerInputArn" }),
        ),
      ).annotate({ identifier: "MediaConnectRouterOutputConnection" });
    case 30:
      return S.Record(S.String, /*@__PURE__*/ __S(1725, __c53, 29).pipe(S.optional));
    case 31:
      return S.suspend(() =>
        S.Struct({
          ActiveInputAttachmentName: S.optional(S.String),
          ActiveInputSwitchActionName: S.optional(S.String),
          ActiveMotionGraphicsActionName: S.optional(S.String),
          ActiveMotionGraphicsUri: S.optional(S.String),
          PipelineId: S.optional(S.String),
          ChannelEngineVersion: S.optional(__S(1888, __c59, 0)),
          MediaConnectRouterOutputConnectionMap: S.optional(__S(1726, __c53, 30)),
        }).pipe(
          S.encodeKeys({
            ActiveInputAttachmentName: "activeInputAttachmentName",
            ActiveInputSwitchActionName: "activeInputSwitchActionName",
            ActiveMotionGraphicsActionName: "activeMotionGraphicsActionName",
            ActiveMotionGraphicsUri: "activeMotionGraphicsUri",
            PipelineId: "pipelineId",
            ChannelEngineVersion: "channelEngineVersion",
            MediaConnectRouterOutputConnectionMap: "mediaConnectRouterOutputConnectionMap",
          }),
        ),
      ).annotate({ identifier: "PipelineDetail" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1727, __c53, 31));
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CdiInputSpecification: S.optional(__S(1792, __c56, 0)),
          ChannelClass: S.optional(S.String),
          Destinations: S.optional(__listOfOutputDestination),
          EgressEndpoints: S.optional(__listOfChannelEgressEndpoint),
          EncoderSettings: S.optional(__S(1724, __c53, 28)),
          Id: S.optional(S.String),
          InputAttachments: S.optional(__listOfInputAttachment),
          InputSpecification: S.optional(__S(1853, __c57, 29)),
          LogLevel: S.optional(S.String),
          Maintenance: S.optional(__S(1861, __c58, 5)),
          Name: S.optional(S.String),
          PipelineDetails: S.optional(__listOfPipelineDetail),
          PipelinesRunningCount: S.optional(S.Number),
          RoleArn: S.optional(S.String),
          State: S.optional(S.String),
          Tags: S.optional(__S(1568, __c49, 0)),
          Vpc: S.optional(__S(1862, __c58, 6)),
          AnywhereSettings: S.optional(__S(1854, __c57, 30)),
          ChannelEngineVersion: S.optional(__S(1888, __c59, 0)),
          LinkedChannelSettings: S.optional(__S(1864, __c58, 8)),
          ChannelSecurityGroups: S.optional(__listOf__string),
          InferenceSettings: S.optional(__S(1858, __c58, 2)),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            CdiInputSpecification: "cdiInputSpecification",
            ChannelClass: "channelClass",
            Destinations: "destinations",
            EgressEndpoints: "egressEndpoints",
            EncoderSettings: "encoderSettings",
            Id: "id",
            InputAttachments: "inputAttachments",
            InputSpecification: "inputSpecification",
            LogLevel: "logLevel",
            Maintenance: "maintenance",
            Name: "name",
            PipelineDetails: "pipelineDetails",
            PipelinesRunningCount: "pipelinesRunningCount",
            RoleArn: "roleArn",
            State: "state",
            Tags: "tags",
            Vpc: "vpc",
            AnywhereSettings: "anywhereSettings",
            ChannelEngineVersion: "channelEngineVersion",
            LinkedChannelSettings: "linkedChannelSettings",
            ChannelSecurityGroups: "channelSecurityGroups",
            InferenceSettings: "inferenceSettings",
          }),
        ),
      ).annotate({ identifier: "Channel" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Resolution: S.optional(S.String) }).pipe(
          S.encodeKeys({ Resolution: "resolution" }),
        ),
      ).annotate({ identifier: "CdiInputSpecification" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ChannelId: S.optional(S.String),
          ChannelGroup: S.optional(S.String),
          ChannelName: S.optional(S.String),
          ChannelEndpointId: S.optional(S.String),
          MediaPackageRegionName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ChannelId: "channelId",
            ChannelGroup: "channelGroup",
            ChannelName: "channelName",
            ChannelEndpointId: "channelEndpointId",
            MediaPackageRegionName: "mediaPackageRegionName",
          }),
        ),
      ).annotate({ identifier: "MediaPackageOutputDestinationSettings" });
    case 2:
      return S.Array(__S(1793, __c56, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ MultiplexId: S.optional(S.String), ProgramName: S.optional(S.String) }).pipe(
          S.encodeKeys({ MultiplexId: "multiplexId", ProgramName: "programName" }),
        ),
      ).annotate({ identifier: "MultiplexProgramChannelDestinationSettings" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          PasswordParam: S.optional(S.String),
          StreamName: S.optional(S.String),
          Url: S.optional(S.String),
          Username: S.optional(S.String),
          VirtualSourceAddress: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            PasswordParam: "passwordParam",
            StreamName: "streamName",
            Url: "url",
            Username: "username",
            VirtualSourceAddress: "virtualSourceAddress",
          }),
        ),
      ).annotate({ identifier: "OutputDestinationSettings" });
    case 5:
      return S.Array(__S(1796, __c56, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          EncryptionPassphraseSecretArn: S.optional(S.String),
          StreamId: S.optional(S.String),
          Url: S.optional(S.String),
          ConnectionMode: S.optional(S.String),
          ListenerPort: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            EncryptionPassphraseSecretArn: "encryptionPassphraseSecretArn",
            StreamId: "streamId",
            Url: "url",
            ConnectionMode: "connectionMode",
            ListenerPort: "listenerPort",
          }),
        ),
      ).annotate({ identifier: "SrtOutputDestinationSettings" });
    case 7:
      return S.Array(__S(1798, __c56, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ EncryptionType: S.optional(S.String), SecretArn: S.optional(S.String) }).pipe(
          S.encodeKeys({ EncryptionType: "encryptionType", SecretArn: "secretArn" }),
        ),
      ).annotate({ identifier: "MediaConnectRouterOutputDestinationSettings" });
    case 9:
      return S.Array(__S(1800, __c56, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          MediaPackageSettings: S.optional(__listOfMediaPackageOutputDestinationSettings),
          MultiplexSettings: S.optional(__S(1795, __c56, 3)),
          Settings: S.optional(__listOfOutputDestinationSettings),
          SrtSettings: S.optional(__listOfSrtOutputDestinationSettings),
          LogicalInterfaceNames: S.optional(__listOf__string),
          MediaConnectRouterSettings: S.optional(
            __listOfMediaConnectRouterOutputDestinationSettings,
          ),
        }).pipe(
          S.encodeKeys({
            Id: "id",
            MediaPackageSettings: "mediaPackageSettings",
            MultiplexSettings: "multiplexSettings",
            Settings: "settings",
            SrtSettings: "srtSettings",
            LogicalInterfaceNames: "logicalInterfaceNames",
            MediaConnectRouterSettings: "mediaConnectRouterSettings",
          }),
        ),
      ).annotate({ identifier: "OutputDestination" });
    case 11:
      return S.Array(__S(1802, __c56, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          Algorithm: S.optional(S.String),
          AlgorithmControl: S.optional(S.String),
          TargetLkfs: S.optional(S.Number),
          PeakCalculation: S.optional(S.String),
          PeakLimiterThreshold: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            Algorithm: "algorithm",
            AlgorithmControl: "algorithmControl",
            TargetLkfs: "targetLkfs",
            PeakCalculation: "peakCalculation",
            PeakLimiterThreshold: "peakLimiterThreshold",
          }),
        ),
      ).annotate({ identifier: "AudioNormalizationSettings" });
    case 13:
      return S.suspend(() =>
        S.Struct({ Gain: S.optional(S.Number), InputChannel: S.optional(S.Number) }).pipe(
          S.encodeKeys({ Gain: "gain", InputChannel: "inputChannel" }),
        ),
      ).annotate({ identifier: "InputChannelLevel" });
    case 14:
      return S.Array(__S(1805, __c56, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          InputChannelLevels: S.optional(__listOfInputChannelLevel),
          OutputChannel: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            InputChannelLevels: "inputChannelLevels",
            OutputChannel: "outputChannel",
          }),
        ),
      ).annotate({ identifier: "AudioChannelMapping" });
    case 16:
      return S.Array(__S(1807, __c56, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({
          ChannelMappings: S.optional(__listOfAudioChannelMapping),
          ChannelsIn: S.optional(S.Number),
          ChannelsOut: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            ChannelMappings: "channelMappings",
            ChannelsIn: "channelsIn",
            ChannelsOut: "channelsOut",
          }),
        ),
      ).annotate({ identifier: "RemixSettings" });
    case 18:
      return S.Array(S.String);
    case 19:
      return S.suspend(() =>
        S.Struct({ MaxCll: S.optional(S.Number), MaxFall: S.optional(S.Number) }).pipe(
          S.encodeKeys({ MaxCll: "maxCll", MaxFall: "maxFall" }),
        ),
      ).annotate({ identifier: "Hdr10Settings" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          AudioSelectorName: S.optional(S.String),
          AudioSilenceThresholdMsec: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            AudioSelectorName: "audioSelectorName",
            AudioSilenceThresholdMsec: "audioSilenceThresholdMsec",
          }),
        ),
      ).annotate({ identifier: "AudioSilenceFailoverSettings" });
    case 21:
      return S.suspend(() =>
        S.Struct({ InputLossThresholdMsec: S.optional(S.Number) }).pipe(
          S.encodeKeys({ InputLossThresholdMsec: "inputLossThresholdMsec" }),
        ),
      ).annotate({ identifier: "InputLossFailoverSettings" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          BlackDetectThreshold: S.optional(S.Number),
          VideoBlackThresholdMsec: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            BlackDetectThreshold: "blackDetectThreshold",
            VideoBlackThresholdMsec: "videoBlackThresholdMsec",
          }),
        ),
      ).annotate({ identifier: "VideoBlackFailoverSettings" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          AudioSilenceSettings: S.optional(__S(1812, __c56, 20)),
          InputLossSettings: S.optional(__S(1813, __c56, 21)),
          VideoBlackSettings: S.optional(__S(1814, __c56, 22)),
        }).pipe(
          S.encodeKeys({
            AudioSilenceSettings: "audioSilenceSettings",
            InputLossSettings: "inputLossSettings",
            VideoBlackSettings: "videoBlackSettings",
          }),
        ),
      ).annotate({ identifier: "FailoverConditionSettings" });
    case 24:
      return S.suspend(() =>
        S.Struct({ FailoverConditionSettings: S.optional(__S(1815, __c56, 23)) }).pipe(
          S.encodeKeys({ FailoverConditionSettings: "failoverConditionSettings" }),
        ),
      ).annotate({ identifier: "FailoverCondition" });
    case 25:
      return S.Array(__S(1816, __c56, 24));
    case 26:
      return S.suspend(() =>
        S.Struct({
          ErrorClearTimeMsec: S.optional(S.Number),
          FailoverConditions: S.optional(__listOfFailoverCondition),
          InputPreference: S.optional(S.String),
          SecondaryInputId: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ErrorClearTimeMsec: "errorClearTimeMsec",
            FailoverConditions: "failoverConditions",
            InputPreference: "inputPreference",
            SecondaryInputId: "secondaryInputId",
          }),
        ),
      ).annotate({ identifier: "AutomaticInputFailoverSettings" });
    case 27:
      return S.suspend(() =>
        S.Struct({ GroupId: S.optional(S.String), Name: S.optional(S.String) }).pipe(
          S.encodeKeys({ GroupId: "groupId", Name: "name" }),
        ),
      ).annotate({ identifier: "AudioHlsRenditionSelection" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          LanguageCode: S.optional(S.String),
          LanguageSelectionPolicy: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            LanguageCode: "languageCode",
            LanguageSelectionPolicy: "languageSelectionPolicy",
          }),
        ),
      ).annotate({ identifier: "AudioLanguageSelection" });
    case 29:
      return S.suspend(() =>
        S.Struct({ ProgramSelection: S.optional(S.String) }).pipe(
          S.encodeKeys({ ProgramSelection: "programSelection" }),
        ),
      ).annotate({ identifier: "AudioDolbyEDecode" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          AudioNormalizationSettings: S.optional(__S(1804, __c56, 12)),
          Channels: S.optional(S.Number),
          GainDb: S.optional(S.Number),
          RemixSettings: S.optional(__S(1809, __c56, 17)),
        }).pipe(
          S.encodeKeys({
            AudioNormalizationSettings: "audioNormalizationSettings",
            Channels: "channels",
            GainDb: "gainDb",
            RemixSettings: "remixSettings",
          }),
        ),
      ).annotate({ identifier: "AudioPreMixerSettings" });
    case 31:
      return S.suspend(() =>
        S.Struct({
          DolbyEDecode: S.optional(__S(1821, __c56, 29)),
          Pid: S.optional(S.Number),
          PremixSettings: S.optional(__S(1822, __c56, 30)),
        }).pipe(
          S.encodeKeys({
            DolbyEDecode: "dolbyEDecode",
            Pid: "pid",
            PremixSettings: "premixSettings",
          }),
        ),
      ).annotate({ identifier: "AudioPid" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1823, __c56, 31));
    case 1:
      return S.suspend(() =>
        S.Struct({ Pid: S.optional(S.Number), Pids: S.optional(__listOfAudioPid) }).pipe(
          S.encodeKeys({ Pid: "pid", Pids: "pids" }),
        ),
      ).annotate({ identifier: "AudioPidSelection" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Track: S.optional(S.Number),
          PremixSettings: S.optional(__S(1822, __c56, 30)),
        }).pipe(S.encodeKeys({ Track: "track", PremixSettings: "premixSettings" })),
      ).annotate({ identifier: "AudioTrack" });
    case 3:
      return S.Array(__S(1826, __c57, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Tracks: S.optional(__listOfAudioTrack),
          DolbyEDecode: S.optional(__S(1821, __c56, 29)),
        }).pipe(S.encodeKeys({ Tracks: "tracks", DolbyEDecode: "dolbyEDecode" })),
      ).annotate({ identifier: "AudioTrackSelection" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          AudioHlsRenditionSelection: S.optional(__S(1819, __c56, 27)),
          AudioLanguageSelection: S.optional(__S(1820, __c56, 28)),
          AudioPidSelection: S.optional(__S(1825, __c57, 1)),
          AudioTrackSelection: S.optional(__S(1828, __c57, 4)),
        }).pipe(
          S.encodeKeys({
            AudioHlsRenditionSelection: "audioHlsRenditionSelection",
            AudioLanguageSelection: "audioLanguageSelection",
            AudioPidSelection: "audioPidSelection",
            AudioTrackSelection: "audioTrackSelection",
          }),
        ),
      ).annotate({ identifier: "AudioSelectorSettings" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          SelectorSettings: S.optional(__S(1829, __c57, 5)),
        }).pipe(S.encodeKeys({ Name: "name", SelectorSettings: "selectorSettings" })),
      ).annotate({ identifier: "AudioSelector" });
    case 7:
      return S.Array(__S(1830, __c57, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ SourceAncillaryChannelNumber: S.optional(S.Number) }).pipe(
          S.encodeKeys({ SourceAncillaryChannelNumber: "sourceAncillaryChannelNumber" }),
        ),
      ).annotate({ identifier: "AncillarySourceSettings" });
    case 9:
      return S.suspend(() =>
        S.Struct({ OcrLanguage: S.optional(S.String), Pid: S.optional(S.Number) }).pipe(
          S.encodeKeys({ OcrLanguage: "ocrLanguage", Pid: "pid" }),
        ),
      ).annotate({ identifier: "DvbSubSourceSettings" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          Convert608To708: S.optional(S.String),
          Scte20Detection: S.optional(S.String),
          Source608ChannelNumber: S.optional(S.Number),
          Source608TrackNumber: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            Convert608To708: "convert608To708",
            Scte20Detection: "scte20Detection",
            Source608ChannelNumber: "source608ChannelNumber",
            Source608TrackNumber: "source608TrackNumber",
          }),
        ),
      ).annotate({ identifier: "EmbeddedSourceSettings" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          Convert608To708: S.optional(S.String),
          Source608ChannelNumber: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            Convert608To708: "convert608To708",
            Source608ChannelNumber: "source608ChannelNumber",
          }),
        ),
      ).annotate({ identifier: "Scte20SourceSettings" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          Height: S.optional(S.Number),
          LeftOffset: S.optional(S.Number),
          TopOffset: S.optional(S.Number),
          Width: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            Height: "height",
            LeftOffset: "leftOffset",
            TopOffset: "topOffset",
            Width: "width",
          }),
        ),
      ).annotate({ identifier: "CaptionRectangle" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          OutputRectangle: S.optional(__S(1836, __c57, 12)),
          PageNumber: S.optional(S.String),
        }).pipe(S.encodeKeys({ OutputRectangle: "outputRectangle", PageNumber: "pageNumber" })),
      ).annotate({ identifier: "TeletextSourceSettings" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          CaptionSynchronizationMode: S.optional(S.String),
          InferenceFeedOutput: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            CaptionSynchronizationMode: "captionSynchronizationMode",
            InferenceFeedOutput: "inferenceFeedOutput",
          }),
        ),
      ).annotate({ identifier: "SmartSubtitleSourceSettings" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          AncillarySourceSettings: S.optional(__S(1832, __c57, 8)),
          AribSourceSettings: S.optional(__S(32, __c1, 0)),
          DvbSubSourceSettings: S.optional(__S(1833, __c57, 9)),
          EmbeddedSourceSettings: S.optional(__S(1834, __c57, 10)),
          Scte20SourceSettings: S.optional(__S(1835, __c57, 11)),
          Scte27SourceSettings: S.optional(__S(1833, __c57, 9)),
          TeletextSourceSettings: S.optional(__S(1837, __c57, 13)),
          SmartSubtitleSourceSettings: S.optional(__S(1838, __c57, 14)),
        }).pipe(
          S.encodeKeys({
            AncillarySourceSettings: "ancillarySourceSettings",
            AribSourceSettings: "aribSourceSettings",
            DvbSubSourceSettings: "dvbSubSourceSettings",
            EmbeddedSourceSettings: "embeddedSourceSettings",
            Scte20SourceSettings: "scte20SourceSettings",
            Scte27SourceSettings: "scte27SourceSettings",
            TeletextSourceSettings: "teletextSourceSettings",
            SmartSubtitleSourceSettings: "smartSubtitleSourceSettings",
          }),
        ),
      ).annotate({ identifier: "CaptionSelectorSettings" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          LanguageCode: S.optional(S.String),
          Name: S.optional(S.String),
          SelectorSettings: S.optional(__S(1839, __c57, 15)),
        }).pipe(
          S.encodeKeys({
            LanguageCode: "languageCode",
            Name: "name",
            SelectorSettings: "selectorSettings",
          }),
        ),
      ).annotate({ identifier: "CaptionSelector" });
    case 17:
      return S.Array(__S(1840, __c57, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({
          Bandwidth: S.optional(S.Number),
          BufferSegments: S.optional(S.Number),
          Retries: S.optional(S.Number),
          RetryInterval: S.optional(S.Number),
          Scte35Source: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Bandwidth: "bandwidth",
            BufferSegments: "bufferSegments",
            Retries: "retries",
            RetryInterval: "retryInterval",
            Scte35Source: "scte35Source",
          }),
        ),
      ).annotate({ identifier: "HlsInputSettings" });
    case 19:
      return S.suspend(() =>
        S.Struct({ SourceIpAddress: S.optional(S.String) }).pipe(
          S.encodeKeys({ SourceIpAddress: "sourceIpAddress" }),
        ),
      ).annotate({ identifier: "MulticastInputSettings" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          HlsInputSettings: S.optional(__S(1842, __c57, 18)),
          ServerValidation: S.optional(S.String),
          MulticastInputSettings: S.optional(__S(1843, __c57, 19)),
        }).pipe(
          S.encodeKeys({
            HlsInputSettings: "hlsInputSettings",
            ServerValidation: "serverValidation",
            MulticastInputSettings: "multicastInputSettings",
          }),
        ),
      ).annotate({ identifier: "NetworkInputSettings" });
    case 21:
      return S.suspend(() =>
        S.Struct({ Hdr10Settings: S.optional(__S(1811, __c56, 19)) }).pipe(
          S.encodeKeys({ Hdr10Settings: "hdr10Settings" }),
        ),
      ).annotate({ identifier: "VideoSelectorColorSpaceSettings" });
    case 22:
      return S.suspend(() =>
        S.Struct({ Pid: S.optional(S.Number) }).pipe(S.encodeKeys({ Pid: "pid" })),
      ).annotate({ identifier: "VideoSelectorPid" });
    case 23:
      return S.suspend(() =>
        S.Struct({ ProgramId: S.optional(S.Number) }).pipe(
          S.encodeKeys({ ProgramId: "programId" }),
        ),
      ).annotate({ identifier: "VideoSelectorProgramId" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          VideoSelectorPid: S.optional(__S(1846, __c57, 22)),
          VideoSelectorProgramId: S.optional(__S(1847, __c57, 23)),
        }).pipe(
          S.encodeKeys({
            VideoSelectorPid: "videoSelectorPid",
            VideoSelectorProgramId: "videoSelectorProgramId",
          }),
        ),
      ).annotate({ identifier: "VideoSelectorSettings" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          ColorSpace: S.optional(S.String),
          ColorSpaceSettings: S.optional(__S(1845, __c57, 21)),
          ColorSpaceUsage: S.optional(S.String),
          SelectorSettings: S.optional(__S(1848, __c57, 24)),
        }).pipe(
          S.encodeKeys({
            ColorSpace: "colorSpace",
            ColorSpaceSettings: "colorSpaceSettings",
            ColorSpaceUsage: "colorSpaceUsage",
            SelectorSettings: "selectorSettings",
          }),
        ),
      ).annotate({ identifier: "VideoSelector" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          AudioSelectors: S.optional(__listOfAudioSelector),
          CaptionSelectors: S.optional(__listOfCaptionSelector),
          DeblockFilter: S.optional(S.String),
          DenoiseFilter: S.optional(S.String),
          FilterStrength: S.optional(S.Number),
          InputFilter: S.optional(S.String),
          NetworkInputSettings: S.optional(__S(1844, __c57, 20)),
          Scte35Pid: S.optional(S.Number),
          Smpte2038DataPreference: S.optional(S.String),
          SourceEndBehavior: S.optional(S.String),
          VideoSelector: S.optional(__S(1849, __c57, 25)),
        }).pipe(
          S.encodeKeys({
            AudioSelectors: "audioSelectors",
            CaptionSelectors: "captionSelectors",
            DeblockFilter: "deblockFilter",
            DenoiseFilter: "denoiseFilter",
            FilterStrength: "filterStrength",
            InputFilter: "inputFilter",
            NetworkInputSettings: "networkInputSettings",
            Scte35Pid: "scte35Pid",
            Smpte2038DataPreference: "smpte2038DataPreference",
            SourceEndBehavior: "sourceEndBehavior",
            VideoSelector: "videoSelector",
          }),
        ),
      ).annotate({ identifier: "InputSettings" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          AutomaticInputFailoverSettings: S.optional(__S(1818, __c56, 26)),
          InputAttachmentName: S.optional(S.String),
          InputId: S.optional(S.String),
          InputSettings: S.optional(__S(1850, __c57, 26)),
          LogicalInterfaceNames: S.optional(__listOf__string),
        }).pipe(
          S.encodeKeys({
            AutomaticInputFailoverSettings: "automaticInputFailoverSettings",
            InputAttachmentName: "inputAttachmentName",
            InputId: "inputId",
            InputSettings: "inputSettings",
            LogicalInterfaceNames: "logicalInterfaceNames",
          }),
        ),
      ).annotate({ identifier: "InputAttachment" });
    case 28:
      return S.Array(__S(1851, __c57, 27));
    case 29:
      return S.suspend(() =>
        S.Struct({
          Codec: S.optional(S.String),
          MaximumBitrate: S.optional(S.String),
          Resolution: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Codec: "codec",
            MaximumBitrate: "maximumBitrate",
            Resolution: "resolution",
          }),
        ),
      ).annotate({ identifier: "InputSpecification" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          ChannelPlacementGroupId: S.optional(S.String),
          ClusterId: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ChannelPlacementGroupId: "channelPlacementGroupId",
            ClusterId: "clusterId",
          }),
        ),
      ).annotate({ identifier: "AnywhereSettings" });
    case 31:
      return S.suspend(() =>
        S.Struct({
          LinkedChannelType: S.optional(S.String),
          PrimaryChannelArn: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            LinkedChannelType: "linkedChannelType",
            PrimaryChannelArn: "primaryChannelArn",
          }),
        ),
      ).annotate({ identifier: "FollowerChannelSettings" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AudioSelectorName: S.optional(S.String), FeedInput: S.optional(S.String) }).pipe(
          S.encodeKeys({ AudioSelectorName: "audioSelectorName", FeedInput: "feedInput" }),
        ),
      ).annotate({ identifier: "AudioFeedInput" });
    case 1:
      return S.Array(__S(1856, __c58, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          FeedArn: S.optional(S.String),
          AudioFeedInputs: S.optional(__listOfAudioFeedInput),
          EnrichmentMethods: S.optional(__listOfEnrichmentMethod),
        }).pipe(
          S.encodeKeys({
            FeedArn: "feedArn",
            AudioFeedInputs: "audioFeedInputs",
            EnrichmentMethods: "enrichmentMethods",
          }),
        ),
      ).annotate({ identifier: "InferenceSettings" });
    case 3:
      return S.suspend(() =>
        S.Struct({ SourceIp: S.optional(S.String) }).pipe(S.encodeKeys({ SourceIp: "sourceIp" })),
      ).annotate({ identifier: "ChannelEgressEndpoint" });
    case 4:
      return S.Array(__S(1859, __c58, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          MaintenanceDay: S.optional(S.String),
          MaintenanceDeadline: S.optional(S.String),
          MaintenanceScheduledDate: S.optional(S.String),
          MaintenanceStartTime: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            MaintenanceDay: "maintenanceDay",
            MaintenanceDeadline: "maintenanceDeadline",
            MaintenanceScheduledDate: "maintenanceScheduledDate",
            MaintenanceStartTime: "maintenanceStartTime",
          }),
        ),
      ).annotate({ identifier: "MaintenanceStatus" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          AvailabilityZones: S.optional(__listOf__string),
          NetworkInterfaceIds: S.optional(__listOf__string),
          SecurityGroupIds: S.optional(__listOf__string),
          SubnetIds: S.optional(__listOf__string),
        }).pipe(
          S.encodeKeys({
            AvailabilityZones: "availabilityZones",
            NetworkInterfaceIds: "networkInterfaceIds",
            SecurityGroupIds: "securityGroupIds",
            SubnetIds: "subnetIds",
          }),
        ),
      ).annotate({ identifier: "VpcOutputSettingsDescription" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          FollowingChannelArns: S.optional(__listOf__string),
          LinkedChannelType: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            FollowingChannelArns: "followingChannelArns",
            LinkedChannelType: "linkedChannelType",
          }),
        ),
      ).annotate({ identifier: "DescribePrimaryChannelSettings" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          FollowerChannelSettings: S.optional(__S(1855, __c57, 31)),
          PrimaryChannelSettings: S.optional(__S(1863, __c58, 7)),
        }).pipe(
          S.encodeKeys({
            FollowerChannelSettings: "followerChannelSettings",
            PrimaryChannelSettings: "primaryChannelSettings",
          }),
        ),
      ).annotate({ identifier: "DescribeLinkedChannelSettings" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ExpirationDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Version: S.optional(S.String),
        }).pipe(S.encodeKeys({ ExpirationDate: "expirationDate", Version: "version" })),
      ).annotate({ identifier: "ChannelEngineVersionResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.String.pipe(T.HttpLabel("ClusterId")),
          Name: S.optional(S.String),
          Nodes: S.optional(__listOf__string),
          RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(1568, __c49, 0)),
        })
          .pipe(
            S.encodeKeys({ Name: "name", Nodes: "nodes", RequestId: "requestId", Tags: "tags" }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/prod/clusters/{ClusterId}/channelplacementgroups" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateChannelPlacementGroupRequest" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Channels: S.optional(__listOf__string),
          ClusterId: S.optional(S.String),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Nodes: S.optional(__listOf__string),
          State: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            Channels: "channels",
            ClusterId: "clusterId",
            Id: "id",
            Name: "name",
            Nodes: "nodes",
            State: "state",
          }),
        ),
      ).annotate({ identifier: "CreateChannelPlacementGroupResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ComparisonOperator: S.optional(S.String),
          DatapointsToAlarm: S.optional(S.Number),
          Description: S.optional(S.String),
          EvaluationPeriods: S.optional(S.Number),
          GroupIdentifier: S.optional(S.String),
          MetricName: S.optional(S.String),
          Name: S.optional(S.String),
          Period: S.optional(S.Number),
          Statistic: S.optional(S.String),
          Tags: S.optional(__S(1568, __c49, 0)),
          TargetResourceType: S.optional(S.String),
          Threshold: S.optional(S.Number),
          TreatMissingData: S.optional(S.String),
          RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
        })
          .pipe(
            S.encodeKeys({
              ComparisonOperator: "comparisonOperator",
              DatapointsToAlarm: "datapointsToAlarm",
              Description: "description",
              EvaluationPeriods: "evaluationPeriods",
              GroupIdentifier: "groupIdentifier",
              MetricName: "metricName",
              Name: "name",
              Period: "period",
              Statistic: "statistic",
              Tags: "tags",
              TargetResourceType: "targetResourceType",
              Threshold: "threshold",
              TreatMissingData: "treatMissingData",
              RequestId: "requestId",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/prod/cloudwatch-alarm-templates" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateCloudWatchAlarmTemplateRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          ComparisonOperator: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          DatapointsToAlarm: S.optional(S.Number),
          Description: S.optional(S.String),
          EvaluationPeriods: S.optional(S.Number),
          GroupId: S.optional(S.String),
          Id: S.optional(S.String),
          MetricName: S.optional(S.String),
          ModifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Name: S.optional(S.String),
          Period: S.optional(S.Number),
          Statistic: S.optional(S.String),
          Tags: S.optional(__S(1568, __c49, 0)),
          TargetResourceType: S.optional(S.String),
          Threshold: S.optional(S.Number),
          TreatMissingData: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            ComparisonOperator: "comparisonOperator",
            CreatedAt: "createdAt",
            DatapointsToAlarm: "datapointsToAlarm",
            Description: "description",
            EvaluationPeriods: "evaluationPeriods",
            GroupId: "groupId",
            Id: "id",
            MetricName: "metricName",
            ModifiedAt: "modifiedAt",
            Name: "name",
            Period: "period",
            Statistic: "statistic",
            Tags: "tags",
            TargetResourceType: "targetResourceType",
            Threshold: "threshold",
            TreatMissingData: "treatMissingData",
          }),
        ),
      ).annotate({ identifier: "CreateCloudWatchAlarmTemplateResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          Name: S.optional(S.String),
          Tags: S.optional(__S(1568, __c49, 0)),
          RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
        })
          .pipe(
            S.encodeKeys({
              Description: "description",
              Name: "name",
              Tags: "tags",
              RequestId: "requestId",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/prod/cloudwatch-alarm-template-groups" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateCloudWatchAlarmTemplateGroupRequest" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Description: S.optional(S.String),
          Id: S.optional(S.String),
          ModifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Name: S.optional(S.String),
          Tags: S.optional(__S(1568, __c49, 0)),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            CreatedAt: "createdAt",
            Description: "description",
            Id: "id",
            ModifiedAt: "modifiedAt",
            Name: "name",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "CreateCloudWatchAlarmTemplateGroupResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterType: S.optional(S.String),
          InstanceRoleArn: S.optional(S.String),
          Name: S.optional(S.String),
          NetworkSettings: S.optional(__S(2178, __c68, 2)),
          RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(1568, __c49, 0)),
        })
          .pipe(
            S.encodeKeys({
              ClusterType: "clusterType",
              InstanceRoleArn: "instanceRoleArn",
              Name: "name",
              NetworkSettings: "networkSettings",
              RequestId: "requestId",
              Tags: "tags",
            }),
          )
          .pipe(
            T.all(T.Http({ method: "POST", uri: "/prod/clusters" }), svc, auth, proto, ver, rules),
          ),
      ).annotate({ identifier: "CreateClusterRequest" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          ChannelIds: S.optional(__listOf__string),
          ClusterType: S.optional(S.String),
          Id: S.optional(S.String),
          InstanceRoleArn: S.optional(S.String),
          Name: S.optional(S.String),
          NetworkSettings: S.optional(__S(2178, __c68, 2)),
          State: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            ChannelIds: "channelIds",
            ClusterType: "clusterType",
            Id: "id",
            InstanceRoleArn: "instanceRoleArn",
            Name: "name",
            NetworkSettings: "networkSettings",
            State: "state",
          }),
        ),
      ).annotate({ identifier: "CreateClusterResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LogicalInterfaceName: S.optional(S.String),
          NetworkId: S.optional(S.String),
        }).pipe(
          S.encodeKeys({ LogicalInterfaceName: "logicalInterfaceName", NetworkId: "networkId" }),
        ),
      ).annotate({ identifier: "InterfaceMappingCreateRequest" });
    case 1:
      return S.Array(__S(2176, __c68, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DefaultRoute: S.optional(S.String),
          InterfaceMappings: S.optional(__listOfInterfaceMappingCreateRequest),
        }).pipe(
          S.encodeKeys({ DefaultRoute: "defaultRoute", InterfaceMappings: "interfaceMappings" }),
        ),
      ).annotate({ identifier: "ClusterNetworkSettingsCreateRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          EventTargets: S.optional(__listOfEventBridgeRuleTemplateTarget),
          EventType: S.optional(S.String),
          GroupIdentifier: S.optional(S.String),
          Name: S.optional(S.String),
          Tags: S.optional(__S(1568, __c49, 0)),
          RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
        })
          .pipe(
            S.encodeKeys({
              Description: "description",
              EventTargets: "eventTargets",
              EventType: "eventType",
              GroupIdentifier: "groupIdentifier",
              Name: "name",
              Tags: "tags",
              RequestId: "requestId",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/prod/eventbridge-rule-templates" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateEventBridgeRuleTemplateRequest" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String) }).pipe(S.encodeKeys({ Arn: "arn" })),
      ).annotate({ identifier: "EventBridgeRuleTemplateTarget" });
    case 1:
      return S.Array(__S(2240, __c70, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Description: S.optional(S.String),
          EventTargets: S.optional(__listOfEventBridgeRuleTemplateTarget),
          EventType: S.optional(S.String),
          GroupId: S.optional(S.String),
          Id: S.optional(S.String),
          ModifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Name: S.optional(S.String),
          Tags: S.optional(__S(1568, __c49, 0)),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            CreatedAt: "createdAt",
            Description: "description",
            EventTargets: "eventTargets",
            EventType: "eventType",
            GroupId: "groupId",
            Id: "id",
            ModifiedAt: "modifiedAt",
            Name: "name",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "CreateEventBridgeRuleTemplateResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          Name: S.optional(S.String),
          Tags: S.optional(__S(1568, __c49, 0)),
          RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
        })
          .pipe(
            S.encodeKeys({
              Description: "description",
              Name: "name",
              Tags: "tags",
              RequestId: "requestId",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/prod/eventbridge-rule-template-groups" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateEventBridgeRuleTemplateGroupRequest" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SecurityGroupIds: S.optional(__listOf__string),
          SubnetIds: S.optional(__listOf__string),
        }).pipe(S.encodeKeys({ SecurityGroupIds: "securityGroupIds", SubnetIds: "subnetIds" })),
      ).annotate({ identifier: "InputVpcRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AvailabilityZoneName: S.optional(S.String) }).pipe(
          S.encodeKeys({ AvailabilityZoneName: "availabilityZoneName" }),
        ),
      ).annotate({ identifier: "RouterDestinationSettings" });
    case 2:
      return S.Array(__S(2305, __c72, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Destinations: S.optional(__listOfRouterDestinationSettings),
          EncryptionType: S.optional(S.String),
          SecretArn: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Destinations: "destinations",
            EncryptionType: "encryptionType",
            SecretArn: "secretArn",
          }),
        ),
      ).annotate({ identifier: "RouterSettings" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Destinations: S.optional(__listOfInputDestinationRequest),
          InputDevices: S.optional(__listOfInputDeviceSettings),
          InputSecurityGroups: S.optional(__listOf__string),
          MediaConnectFlows: S.optional(__listOfMediaConnectFlowRequest),
          Name: S.optional(S.String),
          RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
          RoleArn: S.optional(S.String),
          Sources: S.optional(__listOfInputSourceRequest),
          Tags: S.optional(__S(1568, __c49, 0)),
          Type: S.optional(S.String),
          Vpc: S.optional(__S(2304, __c72, 0)),
          SrtSettings: S.optional(__S(2442, __c76, 10)),
          InputNetworkLocation: S.optional(S.String),
          MulticastSettings: S.optional(__S(2445, __c76, 13)),
          Smpte2110ReceiverGroupSettings: S.optional(__S(2451, __c76, 19)),
          SdiSources: S.optional(InputSdiSources),
          RouterSettings: S.optional(__S(2307, __c72, 3)),
        })
          .pipe(
            S.encodeKeys({
              Destinations: "destinations",
              InputDevices: "inputDevices",
              InputSecurityGroups: "inputSecurityGroups",
              MediaConnectFlows: "mediaConnectFlows",
              Name: "name",
              RequestId: "requestId",
              RoleArn: "roleArn",
              Sources: "sources",
              Tags: "tags",
              Type: "type",
              Vpc: "vpc",
              SrtSettings: "srtSettings",
              InputNetworkLocation: "inputNetworkLocation",
              MulticastSettings: "multicastSettings",
              Smpte2110ReceiverGroupSettings: "smpte2110ReceiverGroupSettings",
              SdiSources: "sdiSources",
              RouterSettings: "routerSettings",
            }),
          )
          .pipe(
            T.all(T.Http({ method: "POST", uri: "/prod/inputs" }), svc, auth, proto, ver, rules),
          ),
      ).annotate({ identifier: "CreateInputRequest" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          Network: S.optional(S.String),
          NetworkRoutes: S.optional(__listOfInputRequestDestinationRoute),
          StaticIpAddress: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            StreamName: "streamName",
            Network: "network",
            NetworkRoutes: "networkRoutes",
            StaticIpAddress: "staticIpAddress",
          }),
        ),
      ).annotate({ identifier: "InputDestinationRequest" });
    case 1:
      return S.Array(__S(2336, __c73, 0));
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Cidr: S.optional(S.String), Gateway: S.optional(S.String) }).pipe(
          S.encodeKeys({ Cidr: "cidr", Gateway: "gateway" }),
        ),
      ).annotate({ identifier: "InputRequestDestinationRoute" });
    case 1:
      return S.Array(__S(2368, __c74, 0));
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Input: S.optional(__S(2458, __c76, 26)) }).pipe(
          S.encodeKeys({ Input: "input" }),
        ),
      ).annotate({ identifier: "CreateInputResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.optional(S.String) }).pipe(S.encodeKeys({ Id: "id" })),
      ).annotate({ identifier: "InputDeviceSettings" });
    case 1:
      return S.Array(__S(2432, __c76, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ FlowArn: S.optional(S.String) }).pipe(S.encodeKeys({ FlowArn: "flowArn" })),
      ).annotate({ identifier: "MediaConnectFlowRequest" });
    case 3:
      return S.Array(__S(2434, __c76, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          PasswordParam: S.optional(S.String),
          Url: S.optional(S.String),
          Username: S.optional(S.String),
        }).pipe(S.encodeKeys({ PasswordParam: "passwordParam", Url: "url", Username: "username" })),
      ).annotate({ identifier: "InputSourceRequest" });
    case 5:
      return S.Array(__S(2436, __c76, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Algorithm: S.optional(S.String),
          PassphraseSecretArn: S.optional(S.String),
        }).pipe(
          S.encodeKeys({ Algorithm: "algorithm", PassphraseSecretArn: "passphraseSecretArn" }),
        ),
      ).annotate({ identifier: "SrtCallerDecryptionRequest" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Decryption: S.optional(__S(2438, __c76, 6)),
          MinimumLatency: S.optional(S.Number),
          SrtListenerAddress: S.optional(S.String),
          SrtListenerPort: S.optional(S.String),
          StreamId: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Decryption: "decryption",
            MinimumLatency: "minimumLatency",
            SrtListenerAddress: "srtListenerAddress",
            SrtListenerPort: "srtListenerPort",
            StreamId: "streamId",
          }),
        ),
      ).annotate({ identifier: "SrtCallerSourceRequest" });
    case 8:
      return S.Array(__S(2439, __c76, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          Decryption: S.optional(__S(2438, __c76, 6)),
          MinimumLatency: S.optional(S.Number),
          StreamId: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Decryption: "decryption",
            MinimumLatency: "minimumLatency",
            StreamId: "streamId",
          }),
        ),
      ).annotate({ identifier: "SrtListenerSettingsRequest" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          SrtCallerSources: S.optional(__listOfSrtCallerSourceRequest),
          SrtListenerSettings: S.optional(__S(2441, __c76, 9)),
        }).pipe(
          S.encodeKeys({
            SrtCallerSources: "srtCallerSources",
            SrtListenerSettings: "srtListenerSettings",
          }),
        ),
      ).annotate({ identifier: "SrtSettingsRequest" });
    case 11:
      return S.suspend(() =>
        S.Struct({ SourceIp: S.optional(S.String), Url: S.optional(S.String) }).pipe(
          S.encodeKeys({ SourceIp: "sourceIp", Url: "url" }),
        ),
      ).annotate({ identifier: "MulticastSourceCreateRequest" });
    case 12:
      return S.Array(__S(2443, __c76, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({ Sources: S.optional(__listOfMulticastSourceCreateRequest) }).pipe(
          S.encodeKeys({ Sources: "sources" }),
        ),
      ).annotate({ identifier: "MulticastSettingsCreateRequest" });
    case 14:
      return S.suspend(() =>
        S.Struct({ MediaIndex: S.optional(S.Number), SdpUrl: S.optional(S.String) }).pipe(
          S.encodeKeys({ MediaIndex: "mediaIndex", SdpUrl: "sdpUrl" }),
        ),
      ).annotate({ identifier: "InputSdpLocation" });
    case 15:
      return S.Array(__S(2446, __c76, 14));
    case 16:
      return S.suspend(() =>
        S.Struct({
          AncillarySdps: S.optional(__listOfInputSdpLocation),
          AudioSdps: S.optional(__listOfInputSdpLocation),
          VideoSdp: S.optional(__S(2446, __c76, 14)),
        }).pipe(
          S.encodeKeys({
            AncillarySdps: "ancillarySdps",
            AudioSdps: "audioSdps",
            VideoSdp: "videoSdp",
          }),
        ),
      ).annotate({ identifier: "Smpte2110ReceiverGroupSdpSettings" });
    case 17:
      return S.suspend(() =>
        S.Struct({ SdpSettings: S.optional(__S(2448, __c76, 16)) }).pipe(
          S.encodeKeys({ SdpSettings: "sdpSettings" }),
        ),
      ).annotate({ identifier: "Smpte2110ReceiverGroup" });
    case 18:
      return S.Array(__S(2449, __c76, 17));
    case 19:
      return S.suspend(() =>
        S.Struct({ Smpte2110ReceiverGroups: S.optional(__listOfSmpte2110ReceiverGroup) }).pipe(
          S.encodeKeys({ Smpte2110ReceiverGroups: "smpte2110ReceiverGroups" }),
        ),
      ).annotate({ identifier: "Smpte2110ReceiverGroupSettings" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          AvailabilityZone: S.optional(S.String),
          NetworkInterfaceId: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AvailabilityZone: "availabilityZone",
            NetworkInterfaceId: "networkInterfaceId",
          }),
        ),
      ).annotate({ identifier: "InputDestinationVpc" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          Ip: S.optional(S.String),
          Port: S.optional(S.String),
          Url: S.optional(S.String),
          Vpc: S.optional(__S(2452, __c76, 20)),
          Network: S.optional(S.String),
          NetworkRoutes: S.optional(__listOfInputDestinationRoute),
        }).pipe(
          S.encodeKeys({
            Ip: "ip",
            Port: "port",
            Url: "url",
            Vpc: "vpc",
            Network: "network",
            NetworkRoutes: "networkRoutes",
          }),
        ),
      ).annotate({ identifier: "InputDestination" });
    case 22:
      return S.Array(__S(2453, __c76, 21));
    case 23:
      return S.suspend(() =>
        S.Struct({
          AvailabilityZoneName: S.optional(S.String),
          RouterOutputArn: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AvailabilityZoneName: "availabilityZoneName",
            RouterOutputArn: "routerOutputArn",
          }),
        ),
      ).annotate({ identifier: "RouterDestination" });
    case 24:
      return S.Array(__S(2455, __c76, 23));
    case 25:
      return S.suspend(() =>
        S.Struct({
          Destinations: S.optional(__listOfRouterDestination),
          EncryptionType: S.optional(S.String),
          SecretArn: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Destinations: "destinations",
            EncryptionType: "encryptionType",
            SecretArn: "secretArn",
          }),
        ),
      ).annotate({ identifier: "RouterInputSettings" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          AttachedChannels: S.optional(__listOf__string),
          Destinations: S.optional(__listOfInputDestination),
          Id: S.optional(S.String),
          InputClass: S.optional(S.String),
          InputDevices: S.optional(__listOfInputDeviceSettings),
          InputPartnerIds: S.optional(__listOf__string),
          InputSourceType: S.optional(S.String),
          MediaConnectFlows: S.optional(__listOfMediaConnectFlow),
          Name: S.optional(S.String),
          RoleArn: S.optional(S.String),
          SecurityGroups: S.optional(__listOf__string),
          Sources: S.optional(__listOfInputSource),
          State: S.optional(S.String),
          Tags: S.optional(__S(1568, __c49, 0)),
          Type: S.optional(S.String),
          SrtSettings: S.optional(__S(2442, __c76, 10)),
          InputNetworkLocation: S.optional(S.String),
          MulticastSettings: S.optional(__S(2445, __c76, 13)),
          Smpte2110ReceiverGroupSettings: S.optional(__S(2451, __c76, 19)),
          SdiSources: S.optional(InputSdiSources),
          RouterSettings: S.optional(__S(2457, __c76, 25)),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            AttachedChannels: "attachedChannels",
            Destinations: "destinations",
            Id: "id",
            InputClass: "inputClass",
            InputDevices: "inputDevices",
            InputPartnerIds: "inputPartnerIds",
            InputSourceType: "inputSourceType",
            MediaConnectFlows: "mediaConnectFlows",
            Name: "name",
            RoleArn: "roleArn",
            SecurityGroups: "securityGroups",
            Sources: "sources",
            State: "state",
            Tags: "tags",
            Type: "type",
            SrtSettings: "srtSettings",
            InputNetworkLocation: "inputNetworkLocation",
            MulticastSettings: "multicastSettings",
            Smpte2110ReceiverGroupSettings: "smpte2110ReceiverGroupSettings",
            SdiSources: "sdiSources",
            RouterSettings: "routerSettings",
          }),
        ),
      ).annotate({ identifier: "Input" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Tags: S.optional(__S(1568, __c49, 0)),
          WhitelistRules: S.optional(__listOfInputWhitelistRuleCidr),
        })
          .pipe(S.encodeKeys({ Tags: "tags", WhitelistRules: "whitelistRules" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/prod/inputSecurityGroups" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateInputSecurityGroupRequest" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SecurityGroup: S.optional(__S(2560, __c80, 0)) }).pipe(
          S.encodeKeys({ SecurityGroup: "securityGroup" }),
        ),
      ).annotate({ identifier: "CreateInputSecurityGroupResponse" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Cidr: S.optional(S.String) }).pipe(S.encodeKeys({ Cidr: "cidr" })),
      ).annotate({ identifier: "InputWhitelistRuleCidr" });
    case 1:
      return S.Array(__S(2528, __c79, 0));
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Id: S.optional(S.String),
          Inputs: S.optional(__listOf__string),
          State: S.optional(S.String),
          Tags: S.optional(__S(1568, __c49, 0)),
          WhitelistRules: S.optional(__listOfInputWhitelistRule),
          Channels: S.optional(__listOf__string),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            Id: "id",
            Inputs: "inputs",
            State: "state",
            Tags: "tags",
            WhitelistRules: "whitelistRules",
            Channels: "channels",
          }),
        ),
      ).annotate({ identifier: "InputSecurityGroup" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AvailabilityZones: S.optional(__listOf__string),
          MultiplexSettings: S.optional(__S(2656, __c83, 0)),
          Name: S.optional(S.String),
          RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(1568, __c49, 0)),
        })
          .pipe(
            S.encodeKeys({
              AvailabilityZones: "availabilityZones",
              MultiplexSettings: "multiplexSettings",
              Name: "name",
              RequestId: "requestId",
              Tags: "tags",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/prod/multiplexes" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateMultiplexRequest" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Multiplex: S.optional(__S(2660, __c83, 4)) }).pipe(
          S.encodeKeys({ Multiplex: "multiplex" }),
        ),
      ).annotate({ identifier: "CreateMultiplexResponse" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaximumVideoBufferDelayMilliseconds: S.optional(S.Number),
          TransportStreamBitrate: S.optional(S.Number),
          TransportStreamId: S.optional(S.Number),
          TransportStreamReservedBitrate: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            MaximumVideoBufferDelayMilliseconds: "maximumVideoBufferDelayMilliseconds",
            TransportStreamBitrate: "transportStreamBitrate",
            TransportStreamId: "transportStreamId",
            TransportStreamReservedBitrate: "transportStreamReservedBitrate",
          }),
        ),
      ).annotate({ identifier: "MultiplexSettings" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EntitlementArn: S.optional(S.String) }).pipe(
          S.encodeKeys({ EntitlementArn: "entitlementArn" }),
        ),
      ).annotate({ identifier: "MultiplexMediaConnectOutputDestinationSettings" });
    case 2:
      return S.suspend(() =>
        S.Struct({ MediaConnectSettings: S.optional(__S(2657, __c83, 1)) }).pipe(
          S.encodeKeys({ MediaConnectSettings: "mediaConnectSettings" }),
        ),
      ).annotate({ identifier: "MultiplexOutputDestination" });
    case 3:
      return S.Array(__S(2658, __c83, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          AvailabilityZones: S.optional(__listOf__string),
          Destinations: S.optional(__listOfMultiplexOutputDestination),
          Id: S.optional(S.String),
          MultiplexSettings: S.optional(__S(2656, __c83, 0)),
          Name: S.optional(S.String),
          PipelinesRunningCount: S.optional(S.Number),
          ProgramCount: S.optional(S.Number),
          State: S.optional(S.String),
          Tags: S.optional(__S(1568, __c49, 0)),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            AvailabilityZones: "availabilityZones",
            Destinations: "destinations",
            Id: "id",
            MultiplexSettings: "multiplexSettings",
            Name: "name",
            PipelinesRunningCount: "pipelinesRunningCount",
            ProgramCount: "programCount",
            State: "state",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "Multiplex" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MultiplexId: S.String.pipe(T.HttpLabel("MultiplexId")),
          MultiplexProgramSettings: S.optional(__S(2787, __c87, 3)),
          ProgramName: S.optional(S.String),
          RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
        })
          .pipe(
            S.encodeKeys({
              MultiplexProgramSettings: "multiplexProgramSettings",
              ProgramName: "programName",
              RequestId: "requestId",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/prod/multiplexes/{MultiplexId}/programs" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateMultiplexProgramRequest" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MultiplexProgram: S.optional(__S(2790, __c87, 6)) }).pipe(
          S.encodeKeys({ MultiplexProgram: "multiplexProgram" }),
        ),
      ).annotate({ identifier: "CreateMultiplexProgramResponse" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
    case 1:
      return S.suspend(() =>
        S.Struct({
          AudioPids: S.optional(__listOf__integer),
          DvbSubPids: S.optional(__listOf__integer),
          DvbTeletextPid: S.optional(S.Number),
          EtvPlatformPid: S.optional(S.Number),
          EtvSignalPid: S.optional(S.Number),
          KlvDataPids: S.optional(__listOf__integer),
          PcrPid: S.optional(S.Number),
          PmtPid: S.optional(S.Number),
          PrivateMetadataPid: S.optional(S.Number),
          Scte27Pids: S.optional(__listOf__integer),
          Scte35Pid: S.optional(S.Number),
          TimedMetadataPid: S.optional(S.Number),
          VideoPid: S.optional(S.Number),
          AribCaptionsPid: S.optional(S.Number),
          DvbTeletextPids: S.optional(__listOf__integer),
          EcmPid: S.optional(S.Number),
          Smpte2038Pid: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            AudioPids: "audioPids",
            DvbSubPids: "dvbSubPids",
            DvbTeletextPid: "dvbTeletextPid",
            EtvPlatformPid: "etvPlatformPid",
            EtvSignalPid: "etvSignalPid",
            KlvDataPids: "klvDataPids",
            PcrPid: "pcrPid",
            PmtPid: "pmtPid",
            PrivateMetadataPid: "privateMetadataPid",
            Scte27Pids: "scte27Pids",
            Scte35Pid: "scte35Pid",
            TimedMetadataPid: "timedMetadataPid",
            VideoPid: "videoPid",
            AribCaptionsPid: "aribCaptionsPid",
            DvbTeletextPids: "dvbTeletextPids",
            EcmPid: "ecmPid",
            Smpte2038Pid: "smpte2038Pid",
          }),
        ),
      ).annotate({ identifier: "MultiplexProgramPacketIdentifiersMap" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProviderName: S.optional(S.String), ServiceName: S.optional(S.String) }).pipe(
          S.encodeKeys({ ProviderName: "providerName", ServiceName: "serviceName" }),
        ),
      ).annotate({ identifier: "MultiplexProgramServiceDescriptor" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MaximumBitrate: S.optional(S.Number),
          MinimumBitrate: S.optional(S.Number),
          Priority: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            MaximumBitrate: "maximumBitrate",
            MinimumBitrate: "minimumBitrate",
            Priority: "priority",
          }),
        ),
      ).annotate({ identifier: "MultiplexStatmuxVideoSettings" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ConstantBitrate: S.optional(S.Number),
          StatmuxSettings: S.optional(__S(2785, __c87, 1)),
        }).pipe(
          S.encodeKeys({ ConstantBitrate: "constantBitrate", StatmuxSettings: "statmuxSettings" }),
        ),
      ).annotate({ identifier: "MultiplexVideoSettings" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          PreferredChannelPipeline: S.optional(S.String),
          ProgramNumber: S.optional(S.Number),
          ServiceDescriptor: S.optional(__S(2784, __c87, 0)),
          VideoSettings: S.optional(__S(2786, __c87, 2)),
        }).pipe(
          S.encodeKeys({
            PreferredChannelPipeline: "preferredChannelPipeline",
            ProgramNumber: "programNumber",
            ServiceDescriptor: "serviceDescriptor",
            VideoSettings: "videoSettings",
          }),
        ),
      ).annotate({ identifier: "MultiplexProgramSettings" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          ActiveChannelPipeline: S.optional(S.String),
          PipelineId: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ActiveChannelPipeline: "activeChannelPipeline",
            PipelineId: "pipelineId",
          }),
        ),
      ).annotate({ identifier: "MultiplexProgramPipelineDetail" });
    case 5:
      return S.Array(__S(2788, __c87, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          ChannelId: S.optional(S.String),
          MultiplexProgramSettings: S.optional(__S(2787, __c87, 3)),
          PacketIdentifiersMap: S.optional(__S(2753, __c86, 1)),
          PipelineDetails: S.optional(__listOfMultiplexProgramPipelineDetail),
          ProgramName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ChannelId: "channelId",
            MultiplexProgramSettings: "multiplexProgramSettings",
            PacketIdentifiersMap: "packetIdentifiersMap",
            PipelineDetails: "pipelineDetails",
            ProgramName: "programName",
          }),
        ),
      ).annotate({ identifier: "MultiplexProgram" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IpPools: S.optional(__listOfIpPoolCreateRequest),
          Name: S.optional(S.String),
          RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
          Routes: S.optional(__listOfRouteCreateRequest),
          Tags: S.optional(__S(1568, __c49, 0)),
        })
          .pipe(
            S.encodeKeys({
              IpPools: "ipPools",
              Name: "name",
              RequestId: "requestId",
              Routes: "routes",
              Tags: "tags",
            }),
          )
          .pipe(
            T.all(T.Http({ method: "POST", uri: "/prod/networks" }), svc, auth, proto, ver, rules),
          ),
      ).annotate({ identifier: "CreateNetworkRequest" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          AssociatedClusterIds: S.optional(__listOf__string),
          Id: S.optional(S.String),
          IpPools: S.optional(__listOfIpPool),
          Name: S.optional(S.String),
          Routes: S.optional(__listOfRoute),
          State: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            AssociatedClusterIds: "associatedClusterIds",
            Id: "id",
            IpPools: "ipPools",
            Name: "name",
            Routes: "routes",
            State: "state",
          }),
        ),
      ).annotate({ identifier: "CreateNetworkResponse" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LogicalInterfaceName: S.optional(S.String),
          NetworkInterfaceMode: S.optional(S.String),
          PhysicalInterfaceName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            LogicalInterfaceName: "logicalInterfaceName",
            NetworkInterfaceMode: "networkInterfaceMode",
            PhysicalInterfaceName: "physicalInterfaceName",
          }),
        ),
      ).annotate({ identifier: "NodeInterfaceMappingCreateRequest" });
    case 1:
      return S.Array(__S(2880, __c90, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.String.pipe(T.HttpLabel("ClusterId")),
          Name: S.optional(S.String),
          NodeInterfaceMappings: S.optional(__listOfNodeInterfaceMappingCreateRequest),
          RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
          Role: S.optional(S.String),
          Tags: S.optional(__S(1568, __c49, 0)),
        })
          .pipe(
            S.encodeKeys({
              Name: "name",
              NodeInterfaceMappings: "nodeInterfaceMappings",
              RequestId: "requestId",
              Role: "role",
              Tags: "tags",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/prod/clusters/{ClusterId}/nodes" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateNodeRequest" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LogicalInterfaceName: S.optional(S.String),
          NetworkInterfaceMode: S.optional(S.String),
          PhysicalInterfaceName: S.optional(S.String),
          PhysicalInterfaceIpAddresses: S.optional(__listOf__string),
        }).pipe(
          S.encodeKeys({
            LogicalInterfaceName: "logicalInterfaceName",
            NetworkInterfaceMode: "networkInterfaceMode",
            PhysicalInterfaceName: "physicalInterfaceName",
            PhysicalInterfaceIpAddresses: "physicalInterfaceIpAddresses",
          }),
        ),
      ).annotate({ identifier: "NodeInterfaceMapping" });
    case 1:
      return S.Array(__S(2912, __c91, 0));
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          ChannelPlacementGroups: S.optional(__listOf__string),
          ClusterId: S.optional(S.String),
          ConnectionState: S.optional(S.String),
          Id: S.optional(S.String),
          InstanceArn: S.optional(S.String),
          Name: S.optional(S.String),
          NodeInterfaceMappings: S.optional(__listOfNodeInterfaceMapping),
          Role: S.optional(S.String),
          State: S.optional(S.String),
          SdiSourceMappings: S.optional(__S(2977, __c93, 1)),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            ChannelPlacementGroups: "channelPlacementGroups",
            ClusterId: "clusterId",
            ConnectionState: "connectionState",
            Id: "id",
            InstanceArn: "instanceArn",
            Name: "name",
            NodeInterfaceMappings: "nodeInterfaceMappings",
            Role: "role",
            State: "state",
            SdiSourceMappings: "sdiSourceMappings",
          }),
        ),
      ).annotate({ identifier: "CreateNodeResponse" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CardNumber: S.optional(S.Number),
          ChannelNumber: S.optional(S.Number),
          SdiSource: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            CardNumber: "cardNumber",
            ChannelNumber: "channelNumber",
            SdiSource: "sdiSource",
          }),
        ),
      ).annotate({ identifier: "SdiSourceMapping" });
    case 1:
      return S.Array(__S(2976, __c93, 0));
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.String.pipe(T.HttpLabel("ClusterId")),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          NodeInterfaceMappings: S.optional(__listOfNodeInterfaceMapping),
          RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
          Role: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              Id: "id",
              Name: "name",
              NodeInterfaceMappings: "nodeInterfaceMappings",
              RequestId: "requestId",
              Role: "role",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/prod/clusters/{ClusterId}/nodeRegistrationScript" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateNodeRegistrationScriptRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ NodeRegistrationScript: S.optional(S.String) }).pipe(
          S.encodeKeys({ NodeRegistrationScript: "nodeRegistrationScript" }),
        ),
      ).annotate({ identifier: "CreateNodeRegistrationScriptResponse" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InputId: S.String.pipe(T.HttpLabel("InputId")),
          RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(1568, __c49, 0)),
        })
          .pipe(S.encodeKeys({ RequestId: "requestId", Tags: "tags" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/prod/inputs/{InputId}/partners" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreatePartnerInputRequest" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Mode: S.optional(S.String),
          Name: S.optional(S.String),
          RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(1568, __c49, 0)),
          Type: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              Mode: "mode",
              Name: "name",
              RequestId: "requestId",
              Tags: "tags",
              Type: "type",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/prod/sdiSources" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateSdiSourceRequest" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SdiSource: S.optional(__S(3136, __c98, 0)) }).pipe(
          S.encodeKeys({ SdiSource: "sdiSource" }),
        ),
      ).annotate({ identifier: "CreateSdiSourceResponse" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Id: S.optional(S.String),
          Inputs: S.optional(__listOf__string),
          Mode: S.optional(S.String),
          Name: S.optional(S.String),
          State: S.optional(S.String),
          Type: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            Id: "id",
            Inputs: "inputs",
            Mode: "mode",
            Name: "name",
            State: "state",
            Type: "type",
          }),
        ),
      ).annotate({ identifier: "SdiSource" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CloudWatchAlarmTemplateGroupIdentifiers: S.optional(__listOf__stringPatternS),
          Description: S.optional(S.String),
          DiscoveryEntryPointArn: S.optional(S.String),
          EventBridgeRuleTemplateGroupIdentifiers: S.optional(__listOf__stringPatternS),
          Name: S.optional(S.String),
          Tags: S.optional(__S(1568, __c49, 0)),
          RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
        })
          .pipe(
            S.encodeKeys({
              CloudWatchAlarmTemplateGroupIdentifiers: "cloudWatchAlarmTemplateGroupIdentifiers",
              Description: "description",
              DiscoveryEntryPointArn: "discoveryEntryPointArn",
              EventBridgeRuleTemplateGroupIdentifiers: "eventBridgeRuleTemplateGroupIdentifiers",
              Name: "name",
              Tags: "tags",
              RequestId: "requestId",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/prod/signal-maps" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateSignalMapRequest" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String), Name: S.optional(S.String) }).pipe(
          S.encodeKeys({ Arn: "arn", Name: "name" }),
        ),
      ).annotate({ identifier: "MediaResourceNeighbor" });
    case 1:
      return S.Array(__S(3200, __c100, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Destinations: S.optional(__listOfMediaResourceNeighbor),
          Name: S.optional(S.String),
          Sources: S.optional(__listOfMediaResourceNeighbor),
        }).pipe(S.encodeKeys({ Destinations: "destinations", Name: "name", Sources: "sources" })),
      ).annotate({ identifier: "MediaResource" });
    case 3:
      return S.Record(S.String, /*@__PURE__*/ __S(3202, __c100, 2).pipe(S.optional));
    case 4:
      return S.suspend(() =>
        S.Struct({ DetailsUri: S.optional(S.String), Status: S.optional(S.String) }).pipe(
          S.encodeKeys({ DetailsUri: "detailsUri", Status: "status" }),
        ),
      ).annotate({ identifier: "SuccessfulMonitorDeployment" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          DetailsUri: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          Status: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            DetailsUri: "detailsUri",
            ErrorMessage: "errorMessage",
            Status: "status",
          }),
        ),
      ).annotate({ identifier: "MonitorDeployment" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CloudWatchAlarmTemplateGroupIds: S.optional(__listOf__stringMin7Max11PatternAws097),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Description: S.optional(S.String),
          DiscoveryEntryPointArn: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          EventBridgeRuleTemplateGroupIds: S.optional(__listOf__stringMin7Max11PatternAws097),
          FailedMediaResourceMap: S.optional(__S(3203, __c100, 3)),
          Id: S.optional(S.String),
          LastDiscoveredAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          LastSuccessfulMonitorDeployment: S.optional(__S(3204, __c100, 4)),
          MediaResourceMap: S.optional(__S(3203, __c100, 3)),
          ModifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          MonitorChangesPendingDeployment: S.optional(S.Boolean),
          MonitorDeployment: S.optional(__S(3205, __c100, 5)),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          Tags: S.optional(__S(1568, __c49, 0)),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            CloudWatchAlarmTemplateGroupIds: "cloudWatchAlarmTemplateGroupIds",
            CreatedAt: "createdAt",
            Description: "description",
            DiscoveryEntryPointArn: "discoveryEntryPointArn",
            ErrorMessage: "errorMessage",
            EventBridgeRuleTemplateGroupIds: "eventBridgeRuleTemplateGroupIds",
            FailedMediaResourceMap: "failedMediaResourceMap",
            Id: "id",
            LastDiscoveredAt: "lastDiscoveredAt",
            LastSuccessfulMonitorDeployment: "lastSuccessfulMonitorDeployment",
            MediaResourceMap: "mediaResourceMap",
            ModifiedAt: "modifiedAt",
            MonitorChangesPendingDeployment: "monitorChangesPendingDeployment",
            MonitorDeployment: "monitorDeployment",
            Name: "name",
            Status: "status",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "CreateSignalMapResponse" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: S.optional(__S(1568, __c49, 0)),
        })
          .pipe(S.encodeKeys({ Tags: "tags" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/prod/tags/{ResourceArn}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateTagsRequest" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChannelId: S.String.pipe(T.HttpLabel("ChannelId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/prod/channels/{ChannelId}" }),
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
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelPlacementGroupId: S.String.pipe(T.HttpLabel("ChannelPlacementGroupId")),
          ClusterId: S.String.pipe(T.HttpLabel("ClusterId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/prod/clusters/{ClusterId}/channelplacementgroups/{ChannelPlacementGroupId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteChannelPlacementGroupRequest" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/prod/cloudwatch-alarm-templates/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCloudWatchAlarmTemplateRequest" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/prod/cloudwatch-alarm-template-groups/{Identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCloudWatchAlarmTemplateGroupRequest" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterId: S.String.pipe(T.HttpLabel("ClusterId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/prod/clusters/{ClusterId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteClusterRequest" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/prod/eventbridge-rule-templates/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEventBridgeRuleTemplateRequest" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/prod/eventbridge-rule-template-groups/{Identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEventBridgeRuleTemplateGroupRequest" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InputId: S.String.pipe(T.HttpLabel("InputId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/prod/inputs/{InputId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteInputRequest" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InputSecurityGroupId: S.String.pipe(T.HttpLabel("InputSecurityGroupId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/prod/inputSecurityGroups/{InputSecurityGroupId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteInputSecurityGroupRequest" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MultiplexId: S.String.pipe(T.HttpLabel("MultiplexId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/prod/multiplexes/{MultiplexId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMultiplexRequest" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MultiplexId: S.String.pipe(T.HttpLabel("MultiplexId")),
          ProgramName: S.String.pipe(T.HttpLabel("ProgramName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/prod/multiplexes/{MultiplexId}/programs/{ProgramName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMultiplexProgramRequest" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NetworkId: S.String.pipe(T.HttpLabel("NetworkId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/prod/networks/{NetworkId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteNetworkRequest" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.String.pipe(T.HttpLabel("ClusterId")),
          NodeId: S.String.pipe(T.HttpLabel("NodeId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/prod/clusters/{ClusterId}/nodes/{NodeId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteNodeRequest" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ReservationId: S.String.pipe(T.HttpLabel("ReservationId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/prod/reservations/{ReservationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteReservationRequest" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelClass: S.optional(S.String),
          Codec: S.optional(S.String),
          MaximumBitrate: S.optional(S.String),
          MaximumFramerate: S.optional(S.String),
          Resolution: S.optional(S.String),
          ResourceType: S.optional(S.String),
          SpecialFeature: S.optional(S.String),
          VideoQuality: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ChannelClass: "channelClass",
            Codec: "codec",
            MaximumBitrate: "maximumBitrate",
            MaximumFramerate: "maximumFramerate",
            Resolution: "resolution",
            ResourceType: "resourceType",
            SpecialFeature: "specialFeature",
            VideoQuality: "videoQuality",
          }),
        ),
      ).annotate({ identifier: "ReservationResourceSpecification" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutomaticRenewal: S.optional(S.String),
          RenewalCount: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({ AutomaticRenewal: "automaticRenewal", RenewalCount: "renewalCount" }),
        ),
      ).annotate({ identifier: "RenewalSettings" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Count: S.optional(S.Number),
          CurrencyCode: S.optional(S.String),
          Duration: S.optional(S.Number),
          DurationUnits: S.optional(S.String),
          End: S.optional(S.String),
          FixedPrice: S.optional(S.Number),
          Name: S.optional(S.String),
          OfferingDescription: S.optional(S.String),
          OfferingId: S.optional(S.String),
          OfferingType: S.optional(S.String),
          Region: S.optional(S.String),
          RenewalSettings: S.optional(__S(3744, __c117, 0)),
          ReservationId: S.optional(S.String),
          ResourceSpecification: S.optional(__S(3712, __c116, 0)),
          Start: S.optional(S.String),
          State: S.optional(S.String),
          Tags: S.optional(__S(1568, __c49, 0)),
          UsagePrice: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            Count: "count",
            CurrencyCode: "currencyCode",
            Duration: "duration",
            DurationUnits: "durationUnits",
            End: "end",
            FixedPrice: "fixedPrice",
            Name: "name",
            OfferingDescription: "offeringDescription",
            OfferingId: "offeringId",
            OfferingType: "offeringType",
            Region: "region",
            RenewalSettings: "renewalSettings",
            ReservationId: "reservationId",
            ResourceSpecification: "resourceSpecification",
            Start: "start",
            State: "state",
            Tags: "tags",
            UsagePrice: "usagePrice",
          }),
        ),
      ).annotate({ identifier: "DeleteReservationResponse" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChannelId: S.String.pipe(T.HttpLabel("ChannelId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/prod/channels/{ChannelId}/schedule" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteScheduleRequest" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SdiSourceId: S.String.pipe(T.HttpLabel("SdiSourceId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/prod/sdiSources/{SdiSourceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSdiSourceRequest" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/prod/signal-maps/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSignalMapRequest" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: S.optional(__listOf__string).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/prod/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTagsRequest" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/accountConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeAccountConfigurationRequest" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ KmsKeyId: S.optional(S.String) }).pipe(S.encodeKeys({ KmsKeyId: "kmsKeyId" })),
      ).annotate({ identifier: "AccountConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AccountConfiguration: S.optional(__S(3936, __c123, 0)) }).pipe(
          S.encodeKeys({ AccountConfiguration: "accountConfiguration" }),
        ),
      ).annotate({ identifier: "DescribeAccountConfigurationResponse" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChannelId: S.String.pipe(T.HttpLabel("ChannelId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/channels/{ChannelId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeChannelRequest" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelPlacementGroupId: S.String.pipe(T.HttpLabel("ChannelPlacementGroupId")),
          ClusterId: S.String.pipe(T.HttpLabel("ClusterId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/prod/clusters/{ClusterId}/channelplacementgroups/{ChannelPlacementGroupId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeChannelPlacementGroupRequest" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterId: S.String.pipe(T.HttpLabel("ClusterId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/clusters/{ClusterId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeClusterRequest" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InputId: S.String.pipe(T.HttpLabel("InputId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/inputs/{InputId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeInputRequest" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InputDeviceId: S.String.pipe(T.HttpLabel("InputDeviceId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/inputDevices/{InputDeviceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeInputDeviceRequest" });
  }
}
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ActiveInput: S.optional(S.String),
          ConfiguredInput: S.optional(S.String),
          DeviceState: S.optional(S.String),
          Framerate: S.optional(S.Number),
          Height: S.optional(S.Number),
          MaxBitrate: S.optional(S.Number),
          ScanType: S.optional(S.String),
          Width: S.optional(S.Number),
          LatencyMs: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            ActiveInput: "activeInput",
            ConfiguredInput: "configuredInput",
            DeviceState: "deviceState",
            Framerate: "framerate",
            Height: "height",
            MaxBitrate: "maxBitrate",
            ScanType: "scanType",
            Width: "width",
            LatencyMs: "latencyMs",
          }),
        ),
      ).annotate({ identifier: "InputDeviceHdSettings" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DnsAddresses: S.optional(__listOf__string),
          Gateway: S.optional(S.String),
          IpAddress: S.optional(S.String),
          IpScheme: S.optional(S.String),
          SubnetMask: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            DnsAddresses: "dnsAddresses",
            Gateway: "gateway",
            IpAddress: "ipAddress",
            IpScheme: "ipScheme",
            SubnetMask: "subnetMask",
          }),
        ),
      ).annotate({ identifier: "InputDeviceNetworkSettings" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          FlowArn: S.optional(S.String),
          RoleArn: S.optional(S.String),
          SecretArn: S.optional(S.String),
          SourceName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            FlowArn: "flowArn",
            RoleArn: "roleArn",
            SecretArn: "secretArn",
            SourceName: "sourceName",
          }),
        ),
      ).annotate({ identifier: "InputDeviceMediaConnectSettings" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Id: S.optional(S.Number), Profile: S.optional(S.String) }).pipe(
          S.encodeKeys({ Id: "id", Profile: "profile" }),
        ),
      ).annotate({ identifier: "InputDeviceUhdAudioChannelPairConfig" });
    case 4:
      return S.Array(__S(4131, __c129, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          ActiveInput: S.optional(S.String),
          ConfiguredInput: S.optional(S.String),
          DeviceState: S.optional(S.String),
          Framerate: S.optional(S.Number),
          Height: S.optional(S.Number),
          MaxBitrate: S.optional(S.Number),
          ScanType: S.optional(S.String),
          Width: S.optional(S.Number),
          LatencyMs: S.optional(S.Number),
          Codec: S.optional(S.String),
          MediaconnectSettings: S.optional(__S(4130, __c129, 2)),
          AudioChannelPairs: S.optional(__listOfInputDeviceUhdAudioChannelPairConfig),
          InputResolution: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ActiveInput: "activeInput",
            ConfiguredInput: "configuredInput",
            DeviceState: "deviceState",
            Framerate: "framerate",
            Height: "height",
            MaxBitrate: "maxBitrate",
            ScanType: "scanType",
            Width: "width",
            LatencyMs: "latencyMs",
            Codec: "codec",
            MediaconnectSettings: "mediaconnectSettings",
            AudioChannelPairs: "audioChannelPairs",
            InputResolution: "inputResolution",
          }),
        ),
      ).annotate({ identifier: "InputDeviceUhdSettings" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          ConnectionState: S.optional(S.String),
          DeviceSettingsSyncState: S.optional(S.String),
          DeviceUpdateStatus: S.optional(S.String),
          HdDeviceSettings: S.optional(__S(4128, __c129, 0)),
          Id: S.optional(S.String),
          MacAddress: S.optional(S.String),
          Name: S.optional(S.String),
          NetworkSettings: S.optional(__S(4129, __c129, 1)),
          SerialNumber: S.optional(S.String),
          Type: S.optional(S.String),
          UhdDeviceSettings: S.optional(__S(4133, __c129, 5)),
          Tags: S.optional(__S(1568, __c49, 0)),
          AvailabilityZone: S.optional(S.String),
          MedialiveInputArns: S.optional(__listOf__string),
          OutputType: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            ConnectionState: "connectionState",
            DeviceSettingsSyncState: "deviceSettingsSyncState",
            DeviceUpdateStatus: "deviceUpdateStatus",
            HdDeviceSettings: "hdDeviceSettings",
            Id: "id",
            MacAddress: "macAddress",
            Name: "name",
            NetworkSettings: "networkSettings",
            SerialNumber: "serialNumber",
            Type: "type",
            UhdDeviceSettings: "uhdDeviceSettings",
            Tags: "tags",
            AvailabilityZone: "availabilityZone",
            MedialiveInputArns: "medialiveInputArns",
            OutputType: "outputType",
          }),
        ),
      ).annotate({ identifier: "DescribeInputDeviceResponse" });
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InputDeviceId: S.String.pipe(T.HttpLabel("InputDeviceId")),
          Accept: S.optional(S.String).pipe(T.HttpHeader("accept")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/inputDevices/{InputDeviceId}/thumbnailData" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeInputDeviceThumbnailRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Body: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
          ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          ContentLength: S.optional(S.Number).pipe(T.HttpHeader("Content-Length")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
          LastModified: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("Last-Modified"),
          ),
        }).pipe(S.encodeKeys({ Body: "body" })),
      ).annotate({ identifier: "DescribeInputDeviceThumbnailResponse" });
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ElementPath: S.optional(S.String), ErrorMessage: S.optional(S.String) }).pipe(
          S.encodeKeys({ ElementPath: "elementPath", ErrorMessage: "errorMessage" }),
        ),
      ).annotate({ identifier: "ValidationError" });
    case 1:
      return S.Array(__S(4192, __c131, 0));
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InputSecurityGroupId: S.String.pipe(T.HttpLabel("InputSecurityGroupId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/inputSecurityGroups/{InputSecurityGroupId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeInputSecurityGroupRequest" });
  }
}
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MultiplexId: S.String.pipe(T.HttpLabel("MultiplexId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/multiplexes/{MultiplexId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeMultiplexRequest" });
  }
}
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MultiplexId: S.String.pipe(T.HttpLabel("MultiplexId")),
          ProgramName: S.String.pipe(T.HttpLabel("ProgramName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/prod/multiplexes/{MultiplexId}/programs/{ProgramName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeMultiplexProgramRequest" });
  }
}
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NetworkId: S.String.pipe(T.HttpLabel("NetworkId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/networks/{NetworkId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeNetworkRequest" });
  }
}
function __c136(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.String.pipe(T.HttpLabel("ClusterId")),
          NodeId: S.String.pipe(T.HttpLabel("NodeId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/clusters/{ClusterId}/nodes/{NodeId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeNodeRequest" });
  }
}
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OfferingId: S.String.pipe(T.HttpLabel("OfferingId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/offerings/{OfferingId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeOfferingRequest" });
  }
}
function __c138(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CurrencyCode: S.optional(S.String),
          Duration: S.optional(S.Number),
          DurationUnits: S.optional(S.String),
          FixedPrice: S.optional(S.Number),
          OfferingDescription: S.optional(S.String),
          OfferingId: S.optional(S.String),
          OfferingType: S.optional(S.String),
          Region: S.optional(S.String),
          ResourceSpecification: S.optional(__S(3712, __c116, 0)),
          UsagePrice: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            CurrencyCode: "currencyCode",
            Duration: "duration",
            DurationUnits: "durationUnits",
            FixedPrice: "fixedPrice",
            OfferingDescription: "offeringDescription",
            OfferingId: "offeringId",
            OfferingType: "offeringType",
            Region: "region",
            ResourceSpecification: "resourceSpecification",
            UsagePrice: "usagePrice",
          }),
        ),
      ).annotate({ identifier: "DescribeOfferingResponse" });
  }
}
function __c139(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ReservationId: S.String.pipe(T.HttpLabel("ReservationId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/reservations/{ReservationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeReservationRequest" });
  }
}
function __c140(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelId: S.String.pipe(T.HttpLabel("ChannelId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/channels/{ChannelId}/schedule" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeScheduleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          ScheduleActions: S.optional(__listOfScheduleAction),
        }).pipe(S.encodeKeys({ NextToken: "nextToken", ScheduleActions: "scheduleActions" })),
      ).annotate({ identifier: "DescribeScheduleResponse" });
  }
}
function __c141(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SdiSourceId: S.String.pipe(T.HttpLabel("SdiSourceId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/sdiSources/{SdiSourceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeSdiSourceRequest" });
  }
}
function __c142(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelId: S.String.pipe(T.HttpLabel("ChannelId")),
          PipelineId: S.optional(S.String).pipe(T.HttpQuery("pipelineId")),
          ThumbnailType: S.optional(S.String).pipe(T.HttpQuery("thumbnailType")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/channels/{ChannelId}/thumbnails" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeThumbnailsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Body: S.optional(S.String),
          ContentType: S.optional(S.String),
          ThumbnailType: S.optional(S.String),
          TimeStamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }).pipe(
          S.encodeKeys({
            Body: "body",
            ContentType: "contentType",
            ThumbnailType: "thumbnailType",
            TimeStamp: "timeStamp",
          }),
        ),
      ).annotate({ identifier: "Thumbnail" });
    case 2:
      return S.Array(__S(4545, __c142, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          PipelineId: S.optional(S.String),
          Thumbnails: S.optional(__listOfThumbnail),
        }).pipe(S.encodeKeys({ PipelineId: "pipelineId", Thumbnails: "thumbnails" })),
      ).annotate({ identifier: "ThumbnailDetail" });
    case 4:
      return S.Array(__S(4547, __c142, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ ThumbnailDetails: S.optional(__listOfThumbnailDetail) }).pipe(
          S.encodeKeys({ ThumbnailDetails: "thumbnailDetails" }),
        ),
      ).annotate({ identifier: "DescribeThumbnailsResponse" });
  }
}
function __c143(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/cloudwatch-alarm-templates/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCloudWatchAlarmTemplateRequest" });
  }
}
function __c144(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/cloudwatch-alarm-template-groups/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCloudWatchAlarmTemplateGroupRequest" });
  }
}
function __c145(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/eventbridge-rule-templates/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEventBridgeRuleTemplateRequest" });
  }
}
function __c146(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/eventbridge-rule-template-groups/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEventBridgeRuleTemplateGroupRequest" });
  }
}
function __c147(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/signal-maps/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSignalMapRequest" });
  }
}
function __c148(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelId: S.String.pipe(T.HttpLabel("ChannelId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          StateFilter: S.optional(S.String).pipe(T.HttpQuery("stateFilter")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/channels/{ChannelId}/alerts" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAlertsRequest" });
  }
}
function __c149(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AlertType: S.optional(S.String),
          ClearedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Id: S.optional(S.String),
          Message: S.optional(S.String),
          PipelineId: S.optional(S.String),
          SetTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          State: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AlertType: "alertType",
            ClearedTimestamp: "clearedTimestamp",
            Id: "id",
            Message: "message",
            PipelineId: "pipelineId",
            SetTimestamp: "setTimestamp",
            State: "state",
          }),
        ),
      ).annotate({ identifier: "ChannelAlert" });
    case 1:
      return S.Array(__S(4768, __c149, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Alerts: S.optional(__listOfChannelAlert),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Alerts: "alerts", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListAlertsResponse" });
  }
}
function __c150(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.String.pipe(T.HttpLabel("ClusterId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/clusters/{ClusterId}/channelplacementgroups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListChannelPlacementGroupsRequest" });
    case 1:
      return S.Array(__S(1952, __c61, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ChannelPlacementGroups: S.optional(__listOfDescribeChannelPlacementGroupSummary),
          NextToken: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ChannelPlacementGroups: "channelPlacementGroups",
            NextToken: "nextToken",
          }),
        ),
      ).annotate({ identifier: "ListChannelPlacementGroupsResponse" });
  }
}
function __c151(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/prod/channels" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListChannelsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CdiInputSpecification: S.optional(__S(1792, __c56, 0)),
          ChannelClass: S.optional(S.String),
          Destinations: S.optional(__listOfOutputDestination),
          EgressEndpoints: S.optional(__listOfChannelEgressEndpoint),
          Id: S.optional(S.String),
          InputAttachments: S.optional(__listOfInputAttachment),
          InputSpecification: S.optional(__S(1853, __c57, 29)),
          LogLevel: S.optional(S.String),
          Maintenance: S.optional(__S(1861, __c58, 5)),
          Name: S.optional(S.String),
          PipelinesRunningCount: S.optional(S.Number),
          RoleArn: S.optional(S.String),
          State: S.optional(S.String),
          Tags: S.optional(__S(1568, __c49, 0)),
          Vpc: S.optional(__S(1862, __c58, 6)),
          AnywhereSettings: S.optional(__S(1854, __c57, 30)),
          ChannelEngineVersion: S.optional(__S(1888, __c59, 0)),
          UsedChannelEngineVersions: S.optional(__listOfChannelEngineVersionResponse),
          LinkedChannelSettings: S.optional(__S(1864, __c58, 8)),
          ChannelSecurityGroups: S.optional(__listOf__string),
          InferenceSettings: S.optional(__S(1858, __c58, 2)),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            CdiInputSpecification: "cdiInputSpecification",
            ChannelClass: "channelClass",
            Destinations: "destinations",
            EgressEndpoints: "egressEndpoints",
            Id: "id",
            InputAttachments: "inputAttachments",
            InputSpecification: "inputSpecification",
            LogLevel: "logLevel",
            Maintenance: "maintenance",
            Name: "name",
            PipelinesRunningCount: "pipelinesRunningCount",
            RoleArn: "roleArn",
            State: "state",
            Tags: "tags",
            Vpc: "vpc",
            AnywhereSettings: "anywhereSettings",
            ChannelEngineVersion: "channelEngineVersion",
            UsedChannelEngineVersions: "usedChannelEngineVersions",
            LinkedChannelSettings: "linkedChannelSettings",
            ChannelSecurityGroups: "channelSecurityGroups",
            InferenceSettings: "inferenceSettings",
          }),
        ),
      ).annotate({ identifier: "ChannelSummary" });
    case 2:
      return S.Array(__S(4833, __c151, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Channels: S.optional(__listOfChannelSummary),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Channels: "channels", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListChannelsResponse" });
  }
}
function __c152(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1888, __c59, 0));
  }
}
function __c153(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          Scope: S.optional(S.String).pipe(T.HttpQuery("scope")),
          SignalMapIdentifier: S.optional(S.String).pipe(T.HttpQuery("signalMapIdentifier")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/cloudwatch-alarm-template-groups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCloudWatchAlarmTemplateGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CloudWatchAlarmTemplateGroups: S.optional(__listOfCloudWatchAlarmTemplateGroupSummary),
          NextToken: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            CloudWatchAlarmTemplateGroups: "cloudWatchAlarmTemplateGroups",
            NextToken: "nextToken",
          }),
        ),
      ).annotate({ identifier: "ListCloudWatchAlarmTemplateGroupsResponse" });
  }
}
function __c154(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Description: S.optional(S.String),
          Id: S.optional(S.String),
          ModifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Name: S.optional(S.String),
          Tags: S.optional(__S(1568, __c49, 0)),
          TemplateCount: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            CreatedAt: "createdAt",
            Description: "description",
            Id: "id",
            ModifiedAt: "modifiedAt",
            Name: "name",
            Tags: "tags",
            TemplateCount: "templateCount",
          }),
        ),
      ).annotate({ identifier: "CloudWatchAlarmTemplateGroupSummary" });
    case 1:
      return S.Array(__S(4928, __c154, 0));
  }
}
function __c155(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GroupIdentifier: S.optional(S.String).pipe(T.HttpQuery("groupIdentifier")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          Scope: S.optional(S.String).pipe(T.HttpQuery("scope")),
          SignalMapIdentifier: S.optional(S.String).pipe(T.HttpQuery("signalMapIdentifier")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/cloudwatch-alarm-templates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCloudWatchAlarmTemplatesRequest" });
    case 1:
      return S.Array(__S(2016, __c63, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          CloudWatchAlarmTemplates: S.optional(__listOfCloudWatchAlarmTemplateSummary),
          NextToken: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            CloudWatchAlarmTemplates: "cloudWatchAlarmTemplates",
            NextToken: "nextToken",
          }),
        ),
      ).annotate({ identifier: "ListCloudWatchAlarmTemplatesResponse" });
  }
}
function __c156(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.String.pipe(T.HttpLabel("ClusterId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          StateFilter: S.optional(S.String).pipe(T.HttpQuery("stateFilter")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/clusters/{ClusterId}/alerts" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListClusterAlertsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AlertType: S.optional(S.String),
          ChannelId: S.optional(S.String),
          ClearedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Id: S.optional(S.String),
          Message: S.optional(S.String),
          NodeId: S.optional(S.String),
          SetTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          State: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AlertType: "alertType",
            ChannelId: "channelId",
            ClearedTimestamp: "clearedTimestamp",
            Id: "id",
            Message: "message",
            NodeId: "nodeId",
            SetTimestamp: "setTimestamp",
            State: "state",
          }),
        ),
      ).annotate({ identifier: "ClusterAlert" });
    case 2:
      return S.Array(__S(4993, __c156, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Alerts: S.optional(__listOfClusterAlert),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Alerts: "alerts", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListClusterAlertsResponse" });
  }
}
function __c157(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/prod/clusters" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListClustersRequest" });
    case 1:
      return S.Array(__S(2144, __c67, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Clusters: S.optional(__listOfDescribeClusterSummary),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Clusters: "clusters", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListClustersResponse" });
  }
}
function __c158(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          SignalMapIdentifier: S.optional(S.String).pipe(T.HttpQuery("signalMapIdentifier")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/eventbridge-rule-template-groups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEventBridgeRuleTemplateGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EventBridgeRuleTemplateGroups: S.optional(__listOfEventBridgeRuleTemplateGroupSummary),
          NextToken: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            EventBridgeRuleTemplateGroups: "eventBridgeRuleTemplateGroups",
            NextToken: "nextToken",
          }),
        ),
      ).annotate({ identifier: "ListEventBridgeRuleTemplateGroupsResponse" });
  }
}
function __c159(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GroupIdentifier: S.optional(S.String).pipe(T.HttpQuery("groupIdentifier")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          SignalMapIdentifier: S.optional(S.String).pipe(T.HttpQuery("signalMapIdentifier")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/eventbridge-rule-templates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEventBridgeRuleTemplatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Description: S.optional(S.String),
          EventTargetCount: S.optional(S.Number),
          EventType: S.optional(S.String),
          GroupId: S.optional(S.String),
          Id: S.optional(S.String),
          ModifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Name: S.optional(S.String),
          Tags: S.optional(__S(1568, __c49, 0)),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            CreatedAt: "createdAt",
            Description: "description",
            EventTargetCount: "eventTargetCount",
            EventType: "eventType",
            GroupId: "groupId",
            Id: "id",
            ModifiedAt: "modifiedAt",
            Name: "name",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "EventBridgeRuleTemplateSummary" });
    case 2:
      return S.Array(__S(5089, __c159, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          EventBridgeRuleTemplates: S.optional(__listOfEventBridgeRuleTemplateSummary),
          NextToken: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            EventBridgeRuleTemplates: "eventBridgeRuleTemplates",
            NextToken: "nextToken",
          }),
        ),
      ).annotate({ identifier: "ListEventBridgeRuleTemplatesResponse" });
  }
}
function __c160(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/prod/inputDevices" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListInputDevicesRequest" });
    case 1:
      return S.Array(__S(4134, __c129, 6));
    case 2:
      return S.suspend(() =>
        S.Struct({
          InputDevices: S.optional(__listOfInputDeviceSummary),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ InputDevices: "inputDevices", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListInputDevicesResponse" });
  }
}
function __c161(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          TransferType: S.optional(S.String).pipe(T.HttpQuery("transferType")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/inputDeviceTransfers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListInputDeviceTransfersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Message: S.optional(S.String),
          TargetCustomerId: S.optional(S.String),
          TransferType: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Id: "id",
            Message: "message",
            TargetCustomerId: "targetCustomerId",
            TransferType: "transferType",
          }),
        ),
      ).annotate({ identifier: "TransferringInputDeviceSummary" });
    case 2:
      return S.Array(__S(5153, __c161, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          InputDeviceTransfers: S.optional(__listOfTransferringInputDeviceSummary),
          NextToken: S.optional(S.String),
        }).pipe(
          S.encodeKeys({ InputDeviceTransfers: "inputDeviceTransfers", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "ListInputDeviceTransfersResponse" });
  }
}
function __c162(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/prod/inputs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListInputsRequest" });
    case 1:
      return S.Array(__S(2458, __c76, 26));
    case 2:
      return S.suspend(() =>
        S.Struct({ Inputs: S.optional(__listOfInput), NextToken: S.optional(S.String) }).pipe(
          S.encodeKeys({ Inputs: "inputs", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "ListInputsResponse" });
  }
}
function __c163(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/inputSecurityGroups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListInputSecurityGroupsRequest" });
    case 1:
      return S.Array(__S(2560, __c80, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          InputSecurityGroups: S.optional(__listOfInputSecurityGroup),
          NextToken: S.optional(S.String),
        }).pipe(
          S.encodeKeys({ InputSecurityGroups: "inputSecurityGroups", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "ListInputSecurityGroupsResponse" });
  }
}
function __c164(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          MultiplexId: S.String.pipe(T.HttpLabel("MultiplexId")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          StateFilter: S.optional(S.String).pipe(T.HttpQuery("stateFilter")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/multiplexes/{MultiplexId}/alerts" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMultiplexAlertsRequest" });
  }
}
function __c165(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/prod/multiplexes" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListMultiplexesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ TransportStreamBitrate: S.optional(S.Number) }).pipe(
          S.encodeKeys({ TransportStreamBitrate: "transportStreamBitrate" }),
        ),
      ).annotate({ identifier: "MultiplexSettingsSummary" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          AvailabilityZones: S.optional(__listOf__string),
          Id: S.optional(S.String),
          MultiplexSettings: S.optional(__S(5281, __c165, 1)),
          Name: S.optional(S.String),
          PipelinesRunningCount: S.optional(S.Number),
          ProgramCount: S.optional(S.Number),
          State: S.optional(S.String),
          Tags: S.optional(__S(1568, __c49, 0)),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            AvailabilityZones: "availabilityZones",
            Id: "id",
            MultiplexSettings: "multiplexSettings",
            Name: "name",
            PipelinesRunningCount: "pipelinesRunningCount",
            ProgramCount: "programCount",
            State: "state",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "MultiplexSummary" });
    case 3:
      return S.Array(__S(5282, __c165, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Multiplexes: S.optional(__listOfMultiplexSummary),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Multiplexes: "multiplexes", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListMultiplexesResponse" });
  }
}
function __c166(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          MultiplexId: S.String.pipe(T.HttpLabel("MultiplexId")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/multiplexes/{MultiplexId}/programs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMultiplexProgramsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ChannelId: S.optional(S.String), ProgramName: S.optional(S.String) }).pipe(
          S.encodeKeys({ ChannelId: "channelId", ProgramName: "programName" }),
        ),
      ).annotate({ identifier: "MultiplexProgramSummary" });
    case 2:
      return S.Array(__S(5313, __c166, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          MultiplexPrograms: S.optional(__listOfMultiplexProgramSummary),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ MultiplexPrograms: "multiplexPrograms", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListMultiplexProgramsResponse" });
  }
}
function __c167(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/prod/networks" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListNetworksRequest" });
    case 1:
      return S.Array(__S(2848, __c89, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Networks: S.optional(__listOfDescribeNetworkSummary),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Networks: "networks", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListNetworksResponse" });
  }
}
function __c168(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.String.pipe(T.HttpLabel("ClusterId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/clusters/{ClusterId}/nodes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListNodesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          ChannelPlacementGroups: S.optional(__listOf__string),
          ClusterId: S.optional(S.String),
          ConnectionState: S.optional(S.String),
          Id: S.optional(S.String),
          InstanceArn: S.optional(S.String),
          ManagedInstanceId: S.optional(S.String),
          Name: S.optional(S.String),
          NodeInterfaceMappings: S.optional(__listOfNodeInterfaceMapping),
          Role: S.optional(S.String),
          State: S.optional(S.String),
          SdiSourceMappings: S.optional(__S(2977, __c93, 1)),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            ChannelPlacementGroups: "channelPlacementGroups",
            ClusterId: "clusterId",
            ConnectionState: "connectionState",
            Id: "id",
            InstanceArn: "instanceArn",
            ManagedInstanceId: "managedInstanceId",
            Name: "name",
            NodeInterfaceMappings: "nodeInterfaceMappings",
            Role: "role",
            State: "state",
            SdiSourceMappings: "sdiSourceMappings",
          }),
        ),
      ).annotate({ identifier: "DescribeNodeSummary" });
    case 2:
      return S.Array(__S(5377, __c168, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          Nodes: S.optional(__listOfDescribeNodeSummary),
        }).pipe(S.encodeKeys({ NextToken: "nextToken", Nodes: "nodes" })),
      ).annotate({ identifier: "ListNodesResponse" });
  }
}
function __c169(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelClass: S.optional(S.String).pipe(T.HttpQuery("channelClass")),
          ChannelConfiguration: S.optional(S.String).pipe(T.HttpQuery("channelConfiguration")),
          Codec: S.optional(S.String).pipe(T.HttpQuery("codec")),
          Duration: S.optional(S.String).pipe(T.HttpQuery("duration")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          MaximumBitrate: S.optional(S.String).pipe(T.HttpQuery("maximumBitrate")),
          MaximumFramerate: S.optional(S.String).pipe(T.HttpQuery("maximumFramerate")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          Resolution: S.optional(S.String).pipe(T.HttpQuery("resolution")),
          ResourceType: S.optional(S.String).pipe(T.HttpQuery("resourceType")),
          SpecialFeature: S.optional(S.String).pipe(T.HttpQuery("specialFeature")),
          VideoQuality: S.optional(S.String).pipe(T.HttpQuery("videoQuality")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/prod/offerings" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListOfferingsRequest" });
    case 1:
      return S.Array(__S(4416, __c138, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Offerings: S.optional(__listOfOffering) }).pipe(
          S.encodeKeys({ NextToken: "nextToken", Offerings: "offerings" }),
        ),
      ).annotate({ identifier: "ListOfferingsResponse" });
  }
}
function __c170(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelClass: S.optional(S.String).pipe(T.HttpQuery("channelClass")),
          Codec: S.optional(S.String).pipe(T.HttpQuery("codec")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          MaximumBitrate: S.optional(S.String).pipe(T.HttpQuery("maximumBitrate")),
          MaximumFramerate: S.optional(S.String).pipe(T.HttpQuery("maximumFramerate")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          Resolution: S.optional(S.String).pipe(T.HttpQuery("resolution")),
          ResourceType: S.optional(S.String).pipe(T.HttpQuery("resourceType")),
          SpecialFeature: S.optional(S.String).pipe(T.HttpQuery("specialFeature")),
          VideoQuality: S.optional(S.String).pipe(T.HttpQuery("videoQuality")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/prod/reservations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListReservationsRequest" });
    case 1:
      return S.Array(__S(3745, __c117, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          Reservations: S.optional(__listOfReservation),
        }).pipe(S.encodeKeys({ NextToken: "nextToken", Reservations: "reservations" })),
      ).annotate({ identifier: "ListReservationsResponse" });
  }
}
function __c171(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/prod/sdiSources" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSdiSourcesRequest" });
    case 1:
      return S.Array(__S(3136, __c98, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          SdiSources: S.optional(__listOfSdiSourceSummary),
        }).pipe(S.encodeKeys({ NextToken: "nextToken", SdiSources: "sdiSources" })),
      ).annotate({ identifier: "ListSdiSourcesResponse" });
  }
}
function __c172(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CloudWatchAlarmTemplateGroupIdentifier: S.optional(S.String).pipe(
            T.HttpQuery("cloudWatchAlarmTemplateGroupIdentifier"),
          ),
          EventBridgeRuleTemplateGroupIdentifier: S.optional(S.String).pipe(
            T.HttpQuery("eventBridgeRuleTemplateGroupIdentifier"),
          ),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/prod/signal-maps" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSignalMapsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Description: S.optional(S.String),
          Id: S.optional(S.String),
          ModifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          MonitorDeploymentStatus: S.optional(S.String),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          Tags: S.optional(__S(1568, __c49, 0)),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            CreatedAt: "createdAt",
            Description: "description",
            Id: "id",
            ModifiedAt: "modifiedAt",
            MonitorDeploymentStatus: "monitorDeploymentStatus",
            Name: "name",
            Status: "status",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "SignalMapSummary" });
    case 2:
      return S.Array(__S(5505, __c172, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          SignalMaps: S.optional(__listOfSignalMapSummary),
        }).pipe(S.encodeKeys({ NextToken: "nextToken", SignalMaps: "signalMaps" })),
      ).annotate({ identifier: "ListSignalMapsResponse" });
  }
}
function __c173(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prod/tags/{ResourceArn}" }),
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
        S.Struct({ Tags: S.optional(__S(1568, __c49, 0)) }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c174(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/prod/versions" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Versions: S.optional(__listOfChannelEngineVersionResponse) }).pipe(
          S.encodeKeys({ Versions: "versions" }),
        ),
      ).annotate({ identifier: "ListVersionsResponse" });
  }
}
function __c175(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Count: S.optional(S.Number),
          Name: S.optional(S.String),
          OfferingId: S.String.pipe(T.HttpLabel("OfferingId")),
          RenewalSettings: S.optional(__S(3744, __c117, 0)),
          RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
          Start: S.optional(S.String),
          Tags: S.optional(__S(1568, __c49, 0)),
        })
          .pipe(
            S.encodeKeys({
              Count: "count",
              Name: "name",
              RenewalSettings: "renewalSettings",
              RequestId: "requestId",
              Start: "start",
              Tags: "tags",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/prod/offerings/{OfferingId}/purchase" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "PurchaseOfferingRequest" });
  }
}
function __c176(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Reservation: S.optional(__S(3745, __c117, 1)) }).pipe(
          S.encodeKeys({ Reservation: "reservation" }),
        ),
      ).annotate({ identifier: "PurchaseOfferingResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
