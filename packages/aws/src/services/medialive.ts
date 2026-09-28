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
  sdkId: "MediaLive",
  target: "MediaLive",
  version: "2017-10-14",
  sigv4: "medialive",
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
                `https://medialive-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://medialive-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://medialive.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://medialive.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class BadGatewayException
  extends /*@__PURE__*/ TE.TaggedError("BadGatewayException", ["ServerError"], {
    status: 502,
    renames: { Message: "message" },
  })<{ readonly message?: string }> {}
export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
    renames: { Message: "message" },
  })<{ readonly message?: string }> {}
export class ForbiddenException
  extends /*@__PURE__*/ TE.TaggedError("ForbiddenException", ["AuthError"], {
    status: 403,
    renames: { Message: "message" },
  })<{ readonly message?: string }> {}
export class GatewayTimeoutException
  extends /*@__PURE__*/ TE.TaggedError(
    "GatewayTimeoutException",
    ["TimeoutError"],
    { status: 504, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
export class InternalServerErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerErrorException",
    ["ServerError"],
    { status: 500, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
export class MediaLiveRoleNotYetTrusted
  extends /*@__PURE__*/ TE.TaggedError(
    "MediaLiveRoleNotYetTrusted",
    ["RetryableError"],
    {
      synthetic: {
        from: "UnprocessableEntityException",
        message: { includes: "is a trusted service" },
      },
      renames: { Message: "message", ValidationErrors: "validationErrors" },
    },
  )<{
    readonly message?: string;
    readonly ValidationErrors?: ValidationError[];
  }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { status: 429, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
export class UnprocessableEntityException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnprocessableEntityException",
    ["BadRequestError"],
    {
      status: 422,
      renames: { Message: "message", ValidationErrors: "validationErrors" },
    },
  )<{
    readonly message?: string;
    readonly ValidationErrors?: ValidationError[];
  }> {}
export interface AcceptInputDeviceTransferRequest {
  InputDeviceId: string;
}
export interface AcceptInputDeviceTransferResponse {}
export type __listOf__string = string[];
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
export interface BatchSuccessfulResultModel {
  Arn?: string;
  Id?: string;
  State?: string;
}
export type __listOfBatchSuccessfulResultModel = BatchSuccessfulResultModel[];
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
export type LastFrameClippingBehavior =
  | "EXCLUDE_LAST_FRAME"
  | "INCLUDE_LAST_FRAME"
  | (string & {});
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
export type Scte35ArchiveAllowedFlag =
  | "ARCHIVE_NOT_ALLOWED"
  | "ARCHIVE_ALLOWED"
  | (string & {});
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
        HlsTimedMetadataSettings: HlsTimedMetadataScheduleActionSettings & {
          Id3: string;
        };
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
          Pipelines: (PipelinePauseStateSettings & {
            PipelineId: PipelineId;
          })[];
        };
        Scte35InputSettings: Scte35InputScheduleActionSettings & {
          Mode: Scte35InputMode;
        };
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
        TimedMetadataSettings: TimedMetadataScheduleActionSettings & {
          Id3: string;
        };
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
        HlsTimedMetadataSettings: HlsTimedMetadataScheduleActionSettings & {
          Id3: string;
        };
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
          Pipelines: (PipelinePauseStateSettings & {
            PipelineId: PipelineId;
          })[];
        };
        Scte35InputSettings: Scte35InputScheduleActionSettings & {
          Mode: Scte35InputMode;
        };
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
        TimedMetadataSettings: TimedMetadataScheduleActionSettings & {
          Id3: string;
        };
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
export type __listOfMediaPackageOutputDestinationSettings =
  MediaPackageOutputDestinationSettings[];
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
export type ConnectionMode = "CALLER" | "LISTENER" | (string & {});
export type __integerMin1Max65535 = number;
export interface SrtOutputDestinationSettings {
  EncryptionPassphraseSecretArn?: string;
  StreamId?: string;
  Url?: string;
  ConnectionMode?: ConnectionMode;
  ListenerPort?: number;
}
export type __listOfSrtOutputDestinationSettings =
  SrtOutputDestinationSettings[];
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
export type AudioNormalizationAlgorithm =
  | "ITU_1770_1"
  | "ITU_1770_2"
  | "ITU_1770_3"
  | "ITU_1770_4"
  | (string & {});
export type AudioNormalizationAlgorithmControl =
  | "CORRECT_AUDIO"
  | (string & {});
export type __doubleMinNegative59Max0 = number;
export type AudioNormalizationPeakCalculation =
  | "NONE"
  | "TRUE_PEAK"
  | (string & {});
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
export type AudioDescriptionAudioTypeControl =
  | "FOLLOW_INPUT"
  | "USE_CONFIGURED"
  | (string & {});
export type __stringMin2Max2 = string;
export type NielsenWatermarksCbetStepaside =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
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
export type AacVbrQuality =
  | "HIGH"
  | "LOW"
  | "MEDIUM_HIGH"
  | "MEDIUM_LOW"
  | (string & {});
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
export type Ac3MetadataControl =
  | "FOLLOW_INPUT"
  | "USE_CONFIGURED"
  | (string & {});
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
export type Eac3MetadataControl =
  | "FOLLOW_INPUT"
  | "USE_CONFIGURED"
  | (string & {});
export type Eac3PassthroughControl =
  | "NO_PASSTHROUGH"
  | "WHEN_POSSIBLE"
  | (string & {});
export type Eac3PhaseControl = "NO_SHIFT" | "SHIFT_90_DEGREES" | (string & {});
export type Eac3StereoDownmix =
  | "DPL2"
  | "LO_RO"
  | "LT_RT"
  | "NOT_INDICATED"
  | (string & {});
export type Eac3SurroundExMode =
  | "DISABLED"
  | "ENABLED"
  | "NOT_INDICATED"
  | (string & {});
export type Eac3SurroundMode =
  | "DISABLED"
  | "ENABLED"
  | "NOT_INDICATED"
  | (string & {});
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
export type Mp2CodingMode =
  | "CODING_MODE_1_0"
  | "CODING_MODE_2_0"
  | (string & {});
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
export type AudioDescriptionLanguageCodeControl =
  | "FOLLOW_INPUT"
  | "USE_CONFIGURED"
  | (string & {});
export type __stringMax255 = string;
export type __integerMinNegative60Max6 = number;
export type __integerMin0Max15 = number;
export interface InputChannelLevel {
  Gain?: number;
  InputChannel?: number;
}
export type __listOfInputChannelLevel = InputChannelLevel[];
export interface AudioChannelMapping {
  InputChannelLevels?: InputChannelLevel[];
  OutputChannel?: number;
}
export type __listOfAudioChannelMapping = AudioChannelMapping[];
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
export type Scte35SpliceInsertNoRegionalBlackoutBehavior =
  | "FOLLOW"
  | "IGNORE"
  | (string & {});
export type Scte35SpliceInsertWebDeliveryAllowedBehavior =
  | "FOLLOW"
  | "IGNORE"
  | (string & {});
export interface Scte35SpliceInsert {
  AdAvailOffset?: number;
  NoRegionalBlackoutFlag?: Scte35SpliceInsertNoRegionalBlackoutBehavior;
  WebDeliveryAllowedFlag?: Scte35SpliceInsertWebDeliveryAllowedBehavior;
}
export type Scte35AposNoRegionalBlackoutBehavior =
  | "FOLLOW"
  | "IGNORE"
  | (string & {});
export type Scte35AposWebDeliveryAllowedBehavior =
  | "FOLLOW"
  | "IGNORE"
  | (string & {});
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
export type BlackoutSlateNetworkEndBlackout =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
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
export type BurnInDestinationSubtitleRows =
  | "ROWS_16"
  | "ROWS_20"
  | "ROWS_24"
  | (string & {});
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
export type DvbSubDestinationAlignment =
  | "CENTERED"
  | "LEFT"
  | "SMART"
  | (string & {});
export type DvbSubDestinationBackgroundColor =
  | "BLACK"
  | "NONE"
  | "WHITE"
  | (string & {});
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
export type DvbSubDestinationShadowColor =
  | "BLACK"
  | "NONE"
  | "WHITE"
  | (string & {});
export type DvbSubDestinationTeletextGridControl =
  | "FIXED"
  | "SCALED"
  | (string & {});
export type DvbSubDestinationSubtitleRows =
  | "ROWS_16"
  | "ROWS_20"
  | "ROWS_24"
  | (string & {});
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
export type EbuTtDDestinationStyleControl =
  | "EXCLUDE"
  | "INCLUDE"
  | (string & {});
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
export interface EmbeddedDestinationSettings {}
export interface EmbeddedPlusScte20DestinationSettings {}
export interface RtmpCaptionInfoDestinationSettings {}
export interface Scte20PlusEmbeddedDestinationSettings {}
export interface Scte27DestinationSettings {}
export interface SmpteTtDestinationSettings {}
export interface TeletextDestinationSettings {}
export type TtmlDestinationStyleControl =
  | "PASSTHROUGH"
  | "USE_CONFIGURED"
  | (string & {});
export interface TtmlDestinationSettings {
  StyleControl?: TtmlDestinationStyleControl;
}
export type WebvttDestinationStyleControl =
  | "NO_STYLE_DATA"
  | "PASSTHROUGH"
  | (string & {});
export interface WebvttDestinationSettings {
  StyleControl?: WebvttDestinationStyleControl;
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
export type FeatureActivationsInputPrepareScheduleActions =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export type FeatureActivationsOutputStaticImageOverlayScheduleActions =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export interface FeatureActivations {
  InputPrepareScheduleActions?: FeatureActivationsInputPrepareScheduleActions;
  OutputStaticImageOverlayScheduleActions?: FeatureActivationsOutputStaticImageOverlayScheduleActions;
}
export type __integerMinNegative60Max60 = number;
export type GlobalConfigurationInputEndAction =
  | "NONE"
  | "SWITCH_AND_LOOP_INPUTS"
  | (string & {});
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
export type GlobalConfigurationOutputTimingSource =
  | "INPUT_CLOCK"
  | "SYSTEM_CLOCK"
  | (string & {});
export type GlobalConfigurationLowFramerateInputs =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export interface EpochLockingSettings {
  CustomEpoch?: string;
  JamSyncTime?: string;
}
export type PipelineLockingMethod =
  | "SOURCE_TIMECODE"
  | "VIDEO_ALIGNMENT"
  | (string & {});
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
export type NielsenPcmToId3TaggingState =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
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
export type HlsAdMarkers =
  | "ADOBE"
  | "ELEMENTAL"
  | "ELEMENTAL_SCTE35"
  | (string & {});
export type __listOfHlsAdMarkers = HlsAdMarkers[];
export type __integerMin1Max4 = number;
export type __stringMin3Max3 = string;
export interface CaptionLanguageMapping {
  CaptionChannel?: number;
  LanguageCode?: string;
  LanguageDescription?: string;
}
export type __listOfCaptionLanguageMapping = CaptionLanguageMapping[];
export type HlsCaptionLanguageSetting =
  | "INSERT"
  | "NONE"
  | "OMIT"
  | (string & {});
export type HlsClientCache = "DISABLED" | "ENABLED" | (string & {});
export type HlsCodecSpecification = "RFC_4281" | "RFC_6381" | (string & {});
export type __stringMin32Max32 = string;
export type HlsDirectoryStructure =
  | "SINGLE_DIRECTORY"
  | "SUBDIRECTORY_PER_STREAM"
  | (string & {});
export type HlsDiscontinuityTags = "INSERT" | "NEVER_INSERT" | (string & {});
export type HlsEncryptionType = "AES128" | "SAMPLE_AES" | (string & {});
export type __integerMin0Max600 = number;
export type HlsAkamaiHttpTransferMode =
  | "CHUNKED"
  | "NON_CHUNKED"
  | (string & {});
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
export type HlsWebdavHttpTransferMode =
  | "CHUNKED"
  | "NON_CHUNKED"
  | (string & {});
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
export type InputLossActionForHlsOut =
  | "EMIT_OUTPUT"
  | "PAUSE_OUTPUT"
  | (string & {});
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
export type HlsManifestDurationFormat =
  | "FLOATING_POINT"
  | "INTEGER"
  | (string & {});
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
export type HlsSegmentationMode =
  | "USE_INPUT_SEGMENTATION"
  | "USE_SEGMENT_DURATION"
  | (string & {});
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
export type CmafNielsenId3Behavior =
  | "NO_PASSTHROUGH"
  | "PASSTHROUGH"
  | (string & {});
export type Scte35Type =
  | "NONE"
  | "SCTE_35_WITHOUT_SEGMENTATION"
  | "SCTE_35_WITHOUT_IDR"
  | (string & {});
export type CmafIngestSegmentLengthUnits =
  | "MILLISECONDS"
  | "SECONDS"
  | (string & {});
export type CmafTimedMetadataId3Frame =
  | "NONE"
  | "PRIV"
  | "TDRL"
  | (string & {});
export type __integerMin0Max10000 = number;
export type CmafTimedMetadataPassthrough =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export interface MediaPackageAdditionalDestinations {
  Destination?: OutputLocationRef;
}
export type __listOfMediaPackageAdditionalDestinations =
  MediaPackageAdditionalDestinations[];
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
}
export interface MediaPackageGroupSettings {
  Destination?: OutputLocationRef;
  MediapackageV2GroupSettings?: MediaPackageV2GroupSettings;
}
export type SmoothGroupAudioOnlyTimecodeControl =
  | "PASSTHROUGH"
  | "USE_CONFIGURED_CLOCK"
  | (string & {});
export type SmoothGroupCertificateMode =
  | "SELF_SIGNED"
  | "VERIFY_AUTHENTICITY"
  | (string & {});
export type SmoothGroupEventIdMode =
  | "NO_EVENT_ID"
  | "USE_CONFIGURED"
  | "USE_TIMESTAMP"
  | (string & {});
export type SmoothGroupEventStopBehavior = "NONE" | "SEND_EOS" | (string & {});
export type InputLossActionForMsSmoothOut =
  | "EMIT_OUTPUT"
  | "PAUSE_OUTPUT"
  | (string & {});
export type SmoothGroupSegmentationMode =
  | "USE_INPUT_SEGMENTATION"
  | "USE_SEGMENT_DURATION"
  | (string & {});
export type SmoothGroupSparseTrackType =
  | "NONE"
  | "SCTE_35"
  | "SCTE_35_WITHOUT_SEGMENTATION"
  | (string & {});
export type SmoothGroupStreamManifestBehavior =
  | "DO_NOT_SEND"
  | "SEND"
  | (string & {});
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
export type AuthenticationScheme = "AKAMAI" | "COMMON" | (string & {});
export type RtmpCacheFullBehavior =
  | "DISCONNECT_IMMEDIATELY"
  | "WAIT_FOR_SERVER"
  | (string & {});
export type __integerMin30 = number;
export type RtmpCaptionData =
  | "ALL"
  | "FIELD1_608"
  | "FIELD1_AND_FIELD2_608"
  | (string & {});
export type InputLossActionForRtmpOut =
  | "EMIT_OUTPUT"
  | "PAUSE_OUTPUT"
  | (string & {});
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
export type InputLossActionForUdpOut =
  | "DROP_PROGRAM"
  | "DROP_TS"
  | "EMIT_PROGRAM"
  | (string & {});
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
export type __listOfCmafIngestCaptionLanguageMapping =
  CmafIngestCaptionLanguageMapping[];
export interface AdditionalDestinations {
  Destination?: OutputLocationRef;
}
export type __listOfAdditionalDestinations = AdditionalDestinations[];
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
export type M2tsAbsentInputAudioBehavior =
  | "DROP"
  | "ENCODE_SILENCE"
  | (string & {});
export type M2tsArib = "DISABLED" | "ENABLED" | (string & {});
export type M2tsAribCaptionsPidControl =
  | "AUTO"
  | "USE_CONFIGURED"
  | (string & {});
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
export type M2tsAudioInterval =
  | "VIDEO_AND_FIXED_INTERVALS"
  | "VIDEO_INTERVAL"
  | (string & {});
export type M2tsEbpPlacement =
  | "VIDEO_AND_AUDIO_PIDS"
  | "VIDEO_PID"
  | (string & {});
export type M2tsEsRateInPes = "EXCLUDE" | "INCLUDE" | (string & {});
export type __doubleMin0 = number;
export type M2tsKlv = "NONE" | "PASSTHROUGH" | (string & {});
export type M2tsNielsenId3Behavior =
  | "NO_PASSTHROUGH"
  | "PASSTHROUGH"
  | (string & {});
export type __integerMin0Max1000 = number;
export type M2tsPcrControl =
  | "CONFIGURED_PCR_PERIOD"
  | "PCR_EVERY_PES_PACKET"
  | (string & {});
export type __integerMin0Max500 = number;
export type __integerMin0Max65535 = number;
export type M2tsRateMode = "CBR" | "VBR" | (string & {});
export type M2tsScte35Control =
  | "NONE"
  | "PASSTHROUGH"
  | "SCTE_35_WITHOUT_IDR"
  | (string & {});
export type M2tsSegmentationMarkers =
  | "EBP"
  | "EBP_LEGACY"
  | "NONE"
  | "PSI_SEGSTART"
  | "RAI_ADAPT"
  | "RAI_SEGSTART"
  | (string & {});
export type M2tsSegmentationStyle =
  | "MAINTAIN_CADENCE"
  | "RESET_CADENCE"
  | (string & {});
export type __doubleMin1 = number;
export type M2tsTimedMetadataBehavior =
  | "NO_PASSTHROUGH"
  | "PASSTHROUGH"
  | (string & {});
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
export type Fmp4NielsenId3Behavior =
  | "NO_PASSTHROUGH"
  | "PASSTHROUGH"
  | (string & {});
export type Fmp4TimedMetadataBehavior =
  | "NO_PASSTHROUGH"
  | "PASSTHROUGH"
  | (string & {});
export interface Fmp4HlsSettings {
  AudioRenditionSets?: string;
  NielsenId3Behavior?: Fmp4NielsenId3Behavior;
  TimedMetadataBehavior?: Fmp4TimedMetadataBehavior;
}
export interface FrameCaptureHlsSettings {}
export type M3u8NielsenId3Behavior =
  | "NO_PASSTHROUGH"
  | "PASSTHROUGH"
  | (string & {});
export type M3u8PcrControl =
  | "CONFIGURED_PCR_PERIOD"
  | "PCR_EVERY_PES_PACKET"
  | (string & {});
export type M3u8Scte35Behavior =
  | "NO_PASSTHROUGH"
  | "PASSTHROUGH"
  | (string & {});
export type M3u8TimedMetadataBehavior =
  | "NO_PASSTHROUGH"
  | "PASSTHROUGH"
  | (string & {});
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
export interface MediaPackageV2DestinationSettings {
  AudioGroupId?: string;
  AudioRenditionSets?: string;
  HlsAutoSelect?: HlsAutoSelect;
  HlsDefault?: HlsDefault;
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
export type RtmpOutputCertificateMode =
  | "SELF_SIGNED"
  | "VERIFY_AUTHENTICITY"
  | (string & {});
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
export interface OutputGroup {
  Name?: string;
  OutputGroupSettings?: OutputGroupSettings;
  Outputs?: Output[];
}
export type __listOfOutputGroup = OutputGroup[];
export type TimecodeConfigSource =
  | "EMBEDDED"
  | "SYSTEMCLOCK"
  | "ZEROBASED"
  | (string & {});
export type __integerMin1Max1000000 = number;
export interface TimecodeConfig {
  Source?: TimecodeConfigSource;
  SyncThreshold?: number;
}
export type __integerMin1Max3600000 = number;
export type FrameCaptureIntervalUnit =
  | "MILLISECONDS"
  | "SECONDS"
  | (string & {});
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
export type TemporalFilterPostFilterSharpening =
  | "AUTO"
  | "DISABLED"
  | "ENABLED"
  | (string & {});
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
export type H264FramerateControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
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
export type H264LookAheadRateControl =
  | "HIGH"
  | "LOW"
  | "MEDIUM"
  | (string & {});
export type __integerMin0Max30 = number;
export type __integerMin1Max6 = number;
export type H264ParControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export type H264Profile =
  | "BASELINE"
  | "HIGH"
  | "HIGH_10BIT"
  | "HIGH_422"
  | "HIGH_422_10BIT"
  | "MAIN"
  | (string & {});
export type H264QualityLevel =
  | "ENHANCED_QUALITY"
  | "STANDARD_QUALITY"
  | (string & {});
export type __integerMin1Max10 = number;
export type H264RateControlMode =
  | "CBR"
  | "MULTIPLEX"
  | "QVBR"
  | "VBR"
  | (string & {});
export type H264ScanType = "INTERLACED" | "PROGRESSIVE" | (string & {});
export type H264SceneChangeDetect = "DISABLED" | "ENABLED" | (string & {});
export type __integerMin1Max32 = number;
export type __integerMin0Max128 = number;
export type H264SpatialAq = "DISABLED" | "ENABLED" | (string & {});
export type H264SubGopLength = "DYNAMIC" | "FIXED" | (string & {});
export type H264Syntax = "DEFAULT" | "RP2027" | (string & {});
export type H264TemporalAq = "DISABLED" | "ENABLED" | (string & {});
export type H264TimecodeInsertionBehavior =
  | "DISABLED"
  | "PIC_TIMING_SEI"
  | (string & {});
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
export type H265LookAheadRateControl =
  | "HIGH"
  | "LOW"
  | "MEDIUM"
  | (string & {});
export type H265Profile = "MAIN" | "MAIN_10BIT" | (string & {});
export type H265RateControlMode = "CBR" | "MULTIPLEX" | "QVBR" | (string & {});
export type H265ScanType = "INTERLACED" | "PROGRESSIVE" | (string & {});
export type H265SceneChangeDetect = "DISABLED" | "ENABLED" | (string & {});
export type H265Tier = "HIGH" | "MAIN" | (string & {});
export type H265TimecodeInsertionBehavior =
  | "DISABLED"
  | "PIC_TIMING_SEI"
  | (string & {});
export type H265MvOverPictureBoundaries =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
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
export type Mpeg2AdaptiveQuantization =
  | "AUTO"
  | "HIGH"
  | "LOW"
  | "MEDIUM"
  | "OFF"
  | (string & {});
export type Mpeg2ColorMetadata = "IGNORE" | "INSERT" | (string & {});
export type Mpeg2ColorSpace = "AUTO" | "PASSTHROUGH" | (string & {});
export type Mpeg2DisplayRatio =
  | "DISPLAYRATIO16X9"
  | "DISPLAYRATIO4X3"
  | (string & {});
export interface Mpeg2FilterSettings {
  TemporalFilterSettings?: TemporalFilterSettings;
}
export type Mpeg2GopSizeUnits = "FRAMES" | "SECONDS" | (string & {});
export type Mpeg2ScanType = "INTERLACED" | "PROGRESSIVE" | (string & {});
export type Mpeg2SubGopLength = "DYNAMIC" | "FIXED" | (string & {});
export type Mpeg2TimecodeInsertionBehavior =
  | "DISABLED"
  | "GOP_TIMECODE"
  | (string & {});
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
export type Av1TimecodeInsertionBehavior =
  | "DISABLED"
  | "METADATA_OBU"
  | (string & {});
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
export type VideoDescriptionRespondToAfd =
  | "NONE"
  | "PASSTHROUGH"
  | "RESPOND"
  | (string & {});
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
}
export type __listOfVideoDescription = VideoDescription[];
export type ThumbnailState = "AUTO" | "DISABLED" | (string & {});
export interface ThumbnailConfiguration {
  State?: ThumbnailState;
}
export type ColorSpace =
  | "HDR10"
  | "HLG_2020"
  | "REC_601"
  | "REC_709"
  | (string & {});
export interface ColorCorrection {
  InputColorSpace?: ColorSpace;
  OutputColorSpace?: ColorSpace;
  Uri?: string;
}
export type __listOfColorCorrection = ColorCorrection[];
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
export type InputPreference =
  | "EQUAL_INPUT_PREFERENCE"
  | "PRIMARY_INPUT_PREFERRED"
  | (string & {});
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
export interface AudioPidSelection {
  Pid?: number;
  Pids?: AudioPid[];
}
export interface AudioTrack {
  Track?: number;
  PremixSettings?: AudioPreMixerSettings;
}
export type __listOfAudioTrack = AudioTrack[];
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
export interface AncillarySourceSettings {
  SourceAncillaryChannelNumber?: number;
}
export interface AribSourceSettings {}
export type DvbSubOcrLanguage =
  | "DEU"
  | "ENG"
  | "FRA"
  | "NLD"
  | "POR"
  | "SPA"
  | (string & {});
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
export type Scte27OcrLanguage =
  | "DEU"
  | "ENG"
  | "FRA"
  | "NLD"
  | "POR"
  | "SPA"
  | (string & {});
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
export type InputCodec = "MPEG2" | "AVC" | "HEVC" | (string & {});
export type InputMaximumBitrate =
  | "MAX_10_MBPS"
  | "MAX_20_MBPS"
  | "MAX_50_MBPS"
  | (string & {});
export type InputResolution = "SD" | "HD" | "UHD" | (string & {});
export interface InputSpecification {
  Codec?: InputCodec;
  MaximumBitrate?: InputMaximumBitrate;
  Resolution?: InputResolution;
}
export type LogLevel =
  | "ERROR"
  | "WARNING"
  | "INFO"
  | "DEBUG"
  | "DISABLED"
  | (string & {});
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
export type LinkedChannelType =
  | "FOLLOWING_CHANNEL"
  | "PRIMARY_CHANNEL"
  | (string & {});
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
export interface InferenceSettings {
  FeedArn?: string;
  AudioFeedInputs?: AudioFeedInput[];
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
          ArchiveGroupSettings: ArchiveGroupSettings & {
            Destination: OutputLocationRef;
          };
          FrameCaptureGroupSettings: FrameCaptureGroupSettings & {
            Destination: OutputLocationRef;
          };
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
            };
          };
          MsSmoothGroupSettings: MsSmoothGroupSettings & {
            Destination: OutputLocationRef;
          };
          CmafIngestGroupSettings: CmafIngestGroupSettings & {
            Destination: OutputLocationRef;
            CaptionLanguageMappings: (CmafIngestCaptionLanguageMapping & {
              CaptionChannel: __integerMin1Max4;
              LanguageCode: __stringMin3Max3;
            })[];
            AdditionalDestinations: (AdditionalDestinations & {
              Destination: OutputLocationRef;
            })[];
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
                StandardHlsSettings: StandardHlsSettings & {
                  M3u8Settings: M3u8Settings;
                };
              };
            };
            MultiplexOutputSettings: MultiplexOutputSettings & {
              Destination: OutputLocationRef;
            };
            RtmpOutputSettings: RtmpOutputSettings & {
              Destination: OutputLocationRef;
            };
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
          Esam: Esam & {
            AcquisitionPointId: __stringMax256;
            PoisEndpoint: __stringMax2048;
          };
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
      ThumbnailConfiguration: ThumbnailConfiguration & {
        State: ThumbnailState;
      };
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
            AudioSilenceSettings: AudioSilenceFailoverSettings & {
              AudioSelectorName: string;
            };
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
            AudioLanguageSelection: AudioLanguageSelection & {
              LanguageCode: string;
            };
            AudioPidSelection: AudioPidSelection & {
              Pid: __integerMin0Max8191;
              Pids: (AudioPid & {
                Pid: __integerMin0Max8191;
                DolbyEDecode: AudioDolbyEDecode & {
                  ProgramSelection: DolbyEProgramSelection;
                };
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
              DolbyEDecode: AudioDolbyEDecode & {
                ProgramSelection: DolbyEProgramSelection;
              };
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
export type __listOfInterfaceMappingCreateRequest =
  InterfaceMappingCreateRequest[];
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
export type __listOfEventBridgeRuleTemplateTarget =
  EventBridgeRuleTemplateTarget[];
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
  EventTargets?: (EventBridgeRuleTemplateTarget & {
    Arn: __stringMin1Max2048PatternArn;
  })[];
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
export type __listOfInputRequestDestinationRoute =
  InputRequestDestinationRoute[];
export interface InputDestinationRequest {
  StreamName?: string;
  Network?: string;
  NetworkRoutes?: InputRequestDestinationRoute[];
  StaticIpAddress?: string;
}
export type __listOfInputDestinationRequest = InputDestinationRequest[];
export interface InputDeviceSettings {
  Id?: string;
}
export type __listOfInputDeviceSettings = InputDeviceSettings[];
export interface MediaConnectFlowRequest {
  FlowArn?: string;
}
export type __listOfMediaConnectFlowRequest = MediaConnectFlowRequest[];
export interface InputSourceRequest {
  PasswordParam?: string;
  Url?: string;
  Username?: string;
}
export type __listOfInputSourceRequest = InputSourceRequest[];
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
export type __listOfMulticastSourceCreateRequest =
  MulticastSourceCreateRequest[];
export interface MulticastSettingsCreateRequest {
  Sources?: MulticastSourceCreateRequest[];
}
export interface InputSdpLocation {
  MediaIndex?: number;
  SdpUrl?: string;
}
export type __listOfInputSdpLocation = InputSdpLocation[];
export interface Smpte2110ReceiverGroupSdpSettings {
  AncillarySdps?: InputSdpLocation[];
  AudioSdps?: InputSdpLocation[];
  VideoSdp?: InputSdpLocation;
}
export interface Smpte2110ReceiverGroup {
  SdpSettings?: Smpte2110ReceiverGroupSdpSettings;
}
export type __listOfSmpte2110ReceiverGroup = Smpte2110ReceiverGroup[];
export interface Smpte2110ReceiverGroupSettings {
  Smpte2110ReceiverGroups?: Smpte2110ReceiverGroup[];
}
export type InputSdiSources = string[];
export interface RouterDestinationSettings {
  AvailabilityZoneName?: string;
}
export type __listOfRouterDestinationSettings = RouterDestinationSettings[];
export type RouterEncryptionType =
  | "AUTOMATIC"
  | "SECRETS_MANAGER"
  | (string & {});
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
export interface InputDestination {
  Ip?: string;
  Port?: string;
  Url?: string;
  Vpc?: InputDestinationVpc;
  Network?: string;
  NetworkRoutes?: InputDestinationRoute[];
}
export type __listOfInputDestination = InputDestination[];
export type InputClass = "STANDARD" | "SINGLE_PIPELINE" | (string & {});
export type InputSourceType = "STATIC" | "DYNAMIC" | (string & {});
export interface MediaConnectFlow {
  FlowArn?: string;
}
export type __listOfMediaConnectFlow = MediaConnectFlow[];
export interface InputSource {
  PasswordParam?: string;
  Url?: string;
  Username?: string;
}
export type __listOfInputSource = InputSource[];
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
        Decryption: SrtListenerDecryption & {
          Algorithm: Algorithm;
          PassphraseSecretArn: string;
        };
      };
    };
    MulticastSettings: MulticastSettings & {
      Sources: (MulticastSource & { Url: string })[];
    };
  };
}
export interface InputWhitelistRuleCidr {
  Cidr?: string;
}
export type __listOfInputWhitelistRuleCidr = InputWhitelistRuleCidr[];
export interface CreateInputSecurityGroupRequest {
  Tags?: { [key: string]: string | undefined };
  WhitelistRules?: InputWhitelistRuleCidr[];
}
export type InputSecurityGroupState =
  | "IDLE"
  | "IN_USE"
  | "UPDATING"
  | "DELETED"
  | (string & {});
export interface InputWhitelistRule {
  Cidr?: string;
}
export type __listOfInputWhitelistRule = InputWhitelistRule[];
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
export type __listOfMultiplexProgramPipelineDetail =
  MultiplexProgramPipelineDetail[];
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
export interface RouteCreateRequest {
  Cidr?: string;
  Gateway?: string;
}
export type __listOfRouteCreateRequest = RouteCreateRequest[];
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
export interface Route {
  Cidr?: string;
  Gateway?: string;
}
export type __listOfRoute = Route[];
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
export type __listOfNodeInterfaceMappingCreateRequest =
  NodeInterfaceMappingCreateRequest[];
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
        Decryption: SrtListenerDecryption & {
          Algorithm: Algorithm;
          PassphraseSecretArn: string;
        };
      };
    };
    MulticastSettings: MulticastSettings & {
      Sources: (MulticastSource & { Url: string })[];
    };
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
export interface MediaResourceNeighbor {
  Arn?: string;
  Name?: string;
}
export type __listOfMediaResourceNeighbor = MediaResourceNeighbor[];
export interface MediaResource {
  Destinations?: MediaResourceNeighbor[];
  Name?: string;
  Sources?: MediaResourceNeighbor[];
}
export type FailedMediaResourceMap = {
  [key: string]: MediaResource | undefined;
};
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
          Destinations: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
          Sources: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
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
          Destinations: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
          Sources: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
        })
      | undefined;
  };
  ModifiedAt?: Date;
  MonitorChangesPendingDeployment?: boolean;
  MonitorDeployment?: MonitorDeployment & {
    Status: SignalMapMonitorDeploymentStatus;
  };
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
        ArchiveGroupSettings: ArchiveGroupSettings & {
          Destination: OutputLocationRef;
        };
        FrameCaptureGroupSettings: FrameCaptureGroupSettings & {
          Destination: OutputLocationRef;
        };
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
          };
        };
        MsSmoothGroupSettings: MsSmoothGroupSettings & {
          Destination: OutputLocationRef;
        };
        CmafIngestGroupSettings: CmafIngestGroupSettings & {
          Destination: OutputLocationRef;
          CaptionLanguageMappings: (CmafIngestCaptionLanguageMapping & {
            CaptionChannel: __integerMin1Max4;
            LanguageCode: __stringMin3Max3;
          })[];
          AdditionalDestinations: (AdditionalDestinations & {
            Destination: OutputLocationRef;
          })[];
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
              StandardHlsSettings: StandardHlsSettings & {
                M3u8Settings: M3u8Settings;
              };
            };
          };
          MultiplexOutputSettings: MultiplexOutputSettings & {
            Destination: OutputLocationRef;
          };
          RtmpOutputSettings: RtmpOutputSettings & {
            Destination: OutputLocationRef;
          };
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
        Esam: Esam & {
          AcquisitionPointId: __stringMax256;
          PoisEndpoint: __stringMax2048;
        };
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
          AudioSilenceSettings: AudioSilenceFailoverSettings & {
            AudioSelectorName: string;
          };
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
          AudioLanguageSelection: AudioLanguageSelection & {
            LanguageCode: string;
          };
          AudioPidSelection: AudioPidSelection & {
            Pid: __integerMin0Max8191;
            Pids: (AudioPid & {
              Pid: __integerMin0Max8191;
              DolbyEDecode: AudioDolbyEDecode & {
                ProgramSelection: DolbyEProgramSelection;
              };
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
            DolbyEDecode: AudioDolbyEDecode & {
              ProgramSelection: DolbyEProgramSelection;
            };
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
export type ReservationAutomaticRenewal =
  | "DISABLED"
  | "ENABLED"
  | "UNAVAILABLE"
  | (string & {});
export interface RenewalSettings {
  AutomaticRenewal?: ReservationAutomaticRenewal;
  RenewalCount?: number;
}
export type ReservationCodec =
  | "MPEG2"
  | "AVC"
  | "HEVC"
  | "AUDIO"
  | "LINK"
  | "AV1"
  | (string & {});
export type ReservationMaximumBitrate =
  | "MAX_10_MBPS"
  | "MAX_20_MBPS"
  | "MAX_50_MBPS"
  | (string & {});
export type ReservationMaximumFramerate =
  | "MAX_30_FPS"
  | "MAX_60_FPS"
  | (string & {});
export type ReservationResolution = "SD" | "HD" | "FHD" | "UHD" | (string & {});
export type ReservationResourceType =
  | "INPUT"
  | "OUTPUT"
  | "MULTIPLEX"
  | "CHANNEL"
  | (string & {});
export type ReservationSpecialFeature =
  | "ADVANCED_AUDIO"
  | "AUDIO_NORMALIZATION"
  | "MGHD"
  | "MGUHD"
  | (string & {});
export type ReservationVideoQuality =
  | "STANDARD"
  | "ENHANCED"
  | "PREMIUM"
  | (string & {});
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
export type ReservationState =
  | "ACTIVE"
  | "EXPIRED"
  | "CANCELED"
  | "DELETED"
  | (string & {});
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
        ArchiveGroupSettings: ArchiveGroupSettings & {
          Destination: OutputLocationRef;
        };
        FrameCaptureGroupSettings: FrameCaptureGroupSettings & {
          Destination: OutputLocationRef;
        };
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
          };
        };
        MsSmoothGroupSettings: MsSmoothGroupSettings & {
          Destination: OutputLocationRef;
        };
        CmafIngestGroupSettings: CmafIngestGroupSettings & {
          Destination: OutputLocationRef;
          CaptionLanguageMappings: (CmafIngestCaptionLanguageMapping & {
            CaptionChannel: __integerMin1Max4;
            LanguageCode: __stringMin3Max3;
          })[];
          AdditionalDestinations: (AdditionalDestinations & {
            Destination: OutputLocationRef;
          })[];
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
              StandardHlsSettings: StandardHlsSettings & {
                M3u8Settings: M3u8Settings;
              };
            };
          };
          MultiplexOutputSettings: MultiplexOutputSettings & {
            Destination: OutputLocationRef;
          };
          RtmpOutputSettings: RtmpOutputSettings & {
            Destination: OutputLocationRef;
          };
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
        Esam: Esam & {
          AcquisitionPointId: __stringMax256;
          PoisEndpoint: __stringMax2048;
        };
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
          AudioSilenceSettings: AudioSilenceFailoverSettings & {
            AudioSelectorName: string;
          };
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
          AudioLanguageSelection: AudioLanguageSelection & {
            LanguageCode: string;
          };
          AudioPidSelection: AudioPidSelection & {
            Pid: __integerMin0Max8191;
            Pids: (AudioPid & {
              Pid: __integerMin0Max8191;
              DolbyEDecode: AudioDolbyEDecode & {
                ProgramSelection: DolbyEProgramSelection;
              };
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
            DolbyEDecode: AudioDolbyEDecode & {
              ProgramSelection: DolbyEProgramSelection;
            };
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
      Decryption: SrtListenerDecryption & {
        Algorithm: Algorithm;
        PassphraseSecretArn: string;
      };
    };
  };
  InputNetworkLocation?: InputNetworkLocation;
  MulticastSettings?: MulticastSettings & {
    Sources: (MulticastSource & { Url: string })[];
  };
  Smpte2110ReceiverGroupSettings?: Smpte2110ReceiverGroupSettings;
  SdiSources?: string[];
  RouterSettings?: RouterInputSettings;
}
export interface DescribeInputDeviceRequest {
  InputDeviceId: string;
}
export type InputDeviceConnectionState =
  | "DISCONNECTED"
  | "CONNECTED"
  | (string & {});
export type DeviceSettingsSyncState = "SYNCED" | "SYNCING" | (string & {});
export type DeviceUpdateStatus =
  | "UP_TO_DATE"
  | "NOT_UP_TO_DATE"
  | "UPDATING"
  | (string & {});
export type InputDeviceActiveInput = "HDMI" | "SDI" | (string & {});
export type InputDeviceConfiguredInput =
  | "AUTO"
  | "HDMI"
  | "SDI"
  | (string & {});
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
export type __listOfInputDeviceUhdAudioChannelPairConfig =
  InputDeviceUhdAudioChannelPairConfig[];
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
      HlsTimedMetadataSettings: HlsTimedMetadataScheduleActionSettings & {
        Id3: string;
      };
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
      Scte35InputSettings: Scte35InputScheduleActionSettings & {
        Mode: Scte35InputMode;
      };
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
      TimedMetadataSettings: TimedMetadataScheduleActionSettings & {
        Id3: string;
      };
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
export interface ThumbnailDetail {
  PipelineId?: string;
  Thumbnails?: Thumbnail[];
}
export type __listOfThumbnailDetail = ThumbnailDetail[];
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
  EventTargets?: (EventBridgeRuleTemplateTarget & {
    Arn: __stringMin1Max2048PatternArn;
  })[];
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
          Destinations: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
          Sources: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
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
          Destinations: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
          Sources: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
        })
      | undefined;
  };
  ModifiedAt?: Date;
  MonitorChangesPendingDeployment?: boolean;
  MonitorDeployment?: MonitorDeployment & {
    Status: SignalMapMonitorDeploymentStatus;
  };
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
export type __listOfDescribeChannelPlacementGroupSummary =
  DescribeChannelPlacementGroupSummary[];
export interface ListChannelPlacementGroupsResponse {
  ChannelPlacementGroups?: DescribeChannelPlacementGroupSummary[];
  NextToken?: string;
}
export interface ListChannelsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type __listOfChannelEngineVersionResponse =
  ChannelEngineVersionResponse[];
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
export interface ListChannelsResponse {
  Channels?: (ChannelSummary & {
    InputAttachments: (InputAttachment & {
      AutomaticInputFailoverSettings: AutomaticInputFailoverSettings & {
        SecondaryInputId: string;
        FailoverConditions: (FailoverCondition & {
          FailoverConditionSettings: FailoverConditionSettings & {
            AudioSilenceSettings: AudioSilenceFailoverSettings & {
              AudioSelectorName: string;
            };
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
            AudioLanguageSelection: AudioLanguageSelection & {
              LanguageCode: string;
            };
            AudioPidSelection: AudioPidSelection & {
              Pid: __integerMin0Max8191;
              Pids: (AudioPid & {
                Pid: __integerMin0Max8191;
                DolbyEDecode: AudioDolbyEDecode & {
                  ProgramSelection: DolbyEProgramSelection;
                };
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
              DolbyEDecode: AudioDolbyEDecode & {
                ProgramSelection: DolbyEProgramSelection;
              };
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
export type __listOfCloudWatchAlarmTemplateGroupSummary =
  CloudWatchAlarmTemplateGroupSummary[];
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
export type __listOfCloudWatchAlarmTemplateSummary =
  CloudWatchAlarmTemplateSummary[];
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
export type __listOfEventBridgeRuleTemplateGroupSummary =
  EventBridgeRuleTemplateGroupSummary[];
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
export type __listOfEventBridgeRuleTemplateSummary =
  EventBridgeRuleTemplateSummary[];
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
export type __listOfTransferringInputDeviceSummary =
  TransferringInputDeviceSummary[];
export interface ListInputDeviceTransfersResponse {
  InputDeviceTransfers?: TransferringInputDeviceSummary[];
  NextToken?: string;
}
export interface ListInputsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type __listOfInput = Input[];
export interface ListInputsResponse {
  Inputs?: (Input & {
    SrtSettings: SrtSettings & {
      SrtListenerSettings: SrtListenerSettings & {
        Decryption: SrtListenerDecryption & {
          Algorithm: Algorithm;
          PassphraseSecretArn: string;
        };
      };
    };
    MulticastSettings: MulticastSettings & {
      Sources: (MulticastSource & { Url: string })[];
    };
  })[];
  NextToken?: string;
}
export interface ListInputSecurityGroupsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type __listOfInputSecurityGroup = InputSecurityGroup[];
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
export type ChannelPipelineIdToRestart =
  | "PIPELINE_0"
  | "PIPELINE_1"
  | (string & {});
export type __listOfChannelPipelineIdToRestart = ChannelPipelineIdToRestart[];
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
        ArchiveGroupSettings: ArchiveGroupSettings & {
          Destination: OutputLocationRef;
        };
        FrameCaptureGroupSettings: FrameCaptureGroupSettings & {
          Destination: OutputLocationRef;
        };
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
          };
        };
        MsSmoothGroupSettings: MsSmoothGroupSettings & {
          Destination: OutputLocationRef;
        };
        CmafIngestGroupSettings: CmafIngestGroupSettings & {
          Destination: OutputLocationRef;
          CaptionLanguageMappings: (CmafIngestCaptionLanguageMapping & {
            CaptionChannel: __integerMin1Max4;
            LanguageCode: __stringMin3Max3;
          })[];
          AdditionalDestinations: (AdditionalDestinations & {
            Destination: OutputLocationRef;
          })[];
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
              StandardHlsSettings: StandardHlsSettings & {
                M3u8Settings: M3u8Settings;
              };
            };
          };
          MultiplexOutputSettings: MultiplexOutputSettings & {
            Destination: OutputLocationRef;
          };
          RtmpOutputSettings: RtmpOutputSettings & {
            Destination: OutputLocationRef;
          };
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
        Esam: Esam & {
          AcquisitionPointId: __stringMax256;
          PoisEndpoint: __stringMax2048;
        };
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
          AudioSilenceSettings: AudioSilenceFailoverSettings & {
            AudioSelectorName: string;
          };
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
          AudioLanguageSelection: AudioLanguageSelection & {
            LanguageCode: string;
          };
          AudioPidSelection: AudioPidSelection & {
            Pid: __integerMin0Max8191;
            Pids: (AudioPid & {
              Pid: __integerMin0Max8191;
              DolbyEDecode: AudioDolbyEDecode & {
                ProgramSelection: DolbyEProgramSelection;
              };
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
            DolbyEDecode: AudioDolbyEDecode & {
              ProgramSelection: DolbyEProgramSelection;
            };
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
        ArchiveGroupSettings: ArchiveGroupSettings & {
          Destination: OutputLocationRef;
        };
        FrameCaptureGroupSettings: FrameCaptureGroupSettings & {
          Destination: OutputLocationRef;
        };
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
          };
        };
        MsSmoothGroupSettings: MsSmoothGroupSettings & {
          Destination: OutputLocationRef;
        };
        CmafIngestGroupSettings: CmafIngestGroupSettings & {
          Destination: OutputLocationRef;
          CaptionLanguageMappings: (CmafIngestCaptionLanguageMapping & {
            CaptionChannel: __integerMin1Max4;
            LanguageCode: __stringMin3Max3;
          })[];
          AdditionalDestinations: (AdditionalDestinations & {
            Destination: OutputLocationRef;
          })[];
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
              StandardHlsSettings: StandardHlsSettings & {
                M3u8Settings: M3u8Settings;
              };
            };
          };
          MultiplexOutputSettings: MultiplexOutputSettings & {
            Destination: OutputLocationRef;
          };
          RtmpOutputSettings: RtmpOutputSettings & {
            Destination: OutputLocationRef;
          };
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
        Esam: Esam & {
          AcquisitionPointId: __stringMax256;
          PoisEndpoint: __stringMax2048;
        };
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
          AudioSilenceSettings: AudioSilenceFailoverSettings & {
            AudioSelectorName: string;
          };
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
          AudioLanguageSelection: AudioLanguageSelection & {
            LanguageCode: string;
          };
          AudioPidSelection: AudioPidSelection & {
            Pid: __integerMin0Max8191;
            Pids: (AudioPid & {
              Pid: __integerMin0Max8191;
              DolbyEDecode: AudioDolbyEDecode & {
                ProgramSelection: DolbyEProgramSelection;
              };
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
            DolbyEDecode: AudioDolbyEDecode & {
              ProgramSelection: DolbyEProgramSelection;
            };
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
          Destinations: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
          Sources: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
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
          Destinations: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
          Sources: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
        })
      | undefined;
  };
  ModifiedAt?: Date;
  MonitorChangesPendingDeployment?: boolean;
  MonitorDeployment?: MonitorDeployment & {
    Status: SignalMapMonitorDeploymentStatus;
  };
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
          Destinations: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
          Sources: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
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
          Destinations: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
          Sources: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
        })
      | undefined;
  };
  ModifiedAt?: Date;
  MonitorChangesPendingDeployment?: boolean;
  MonitorDeployment?: MonitorDeployment & {
    Status: SignalMapMonitorDeploymentStatus;
  };
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
          Destinations: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
          Sources: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
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
          Destinations: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
          Sources: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
        })
      | undefined;
  };
  ModifiedAt?: Date;
  MonitorChangesPendingDeployment?: boolean;
  MonitorDeployment?: MonitorDeployment & {
    Status: SignalMapMonitorDeploymentStatus;
  };
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
        ArchiveGroupSettings: ArchiveGroupSettings & {
          Destination: OutputLocationRef;
        };
        FrameCaptureGroupSettings: FrameCaptureGroupSettings & {
          Destination: OutputLocationRef;
        };
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
          };
        };
        MsSmoothGroupSettings: MsSmoothGroupSettings & {
          Destination: OutputLocationRef;
        };
        CmafIngestGroupSettings: CmafIngestGroupSettings & {
          Destination: OutputLocationRef;
          CaptionLanguageMappings: (CmafIngestCaptionLanguageMapping & {
            CaptionChannel: __integerMin1Max4;
            LanguageCode: __stringMin3Max3;
          })[];
          AdditionalDestinations: (AdditionalDestinations & {
            Destination: OutputLocationRef;
          })[];
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
              StandardHlsSettings: StandardHlsSettings & {
                M3u8Settings: M3u8Settings;
              };
            };
          };
          MultiplexOutputSettings: MultiplexOutputSettings & {
            Destination: OutputLocationRef;
          };
          RtmpOutputSettings: RtmpOutputSettings & {
            Destination: OutputLocationRef;
          };
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
        Esam: Esam & {
          AcquisitionPointId: __stringMax256;
          PoisEndpoint: __stringMax2048;
        };
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
          AudioSilenceSettings: AudioSilenceFailoverSettings & {
            AudioSelectorName: string;
          };
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
          AudioLanguageSelection: AudioLanguageSelection & {
            LanguageCode: string;
          };
          AudioPidSelection: AudioPidSelection & {
            Pid: __integerMin0Max8191;
            Pids: (AudioPid & {
              Pid: __integerMin0Max8191;
              DolbyEDecode: AudioDolbyEDecode & {
                ProgramSelection: DolbyEProgramSelection;
              };
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
            DolbyEDecode: AudioDolbyEDecode & {
              ProgramSelection: DolbyEProgramSelection;
            };
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
          ArchiveGroupSettings: ArchiveGroupSettings & {
            Destination: OutputLocationRef;
          };
          FrameCaptureGroupSettings: FrameCaptureGroupSettings & {
            Destination: OutputLocationRef;
          };
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
            };
          };
          MsSmoothGroupSettings: MsSmoothGroupSettings & {
            Destination: OutputLocationRef;
          };
          CmafIngestGroupSettings: CmafIngestGroupSettings & {
            Destination: OutputLocationRef;
            CaptionLanguageMappings: (CmafIngestCaptionLanguageMapping & {
              CaptionChannel: __integerMin1Max4;
              LanguageCode: __stringMin3Max3;
            })[];
            AdditionalDestinations: (AdditionalDestinations & {
              Destination: OutputLocationRef;
            })[];
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
                StandardHlsSettings: StandardHlsSettings & {
                  M3u8Settings: M3u8Settings;
                };
              };
            };
            MultiplexOutputSettings: MultiplexOutputSettings & {
              Destination: OutputLocationRef;
            };
            RtmpOutputSettings: RtmpOutputSettings & {
              Destination: OutputLocationRef;
            };
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
          Esam: Esam & {
            AcquisitionPointId: __stringMax256;
            PoisEndpoint: __stringMax2048;
          };
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
      ThumbnailConfiguration: ThumbnailConfiguration & {
        State: ThumbnailState;
      };
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
            AudioSilenceSettings: AudioSilenceFailoverSettings & {
              AudioSelectorName: string;
            };
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
            AudioLanguageSelection: AudioLanguageSelection & {
              LanguageCode: string;
            };
            AudioPidSelection: AudioPidSelection & {
              Pid: __integerMin0Max8191;
              Pids: (AudioPid & {
                Pid: __integerMin0Max8191;
                DolbyEDecode: AudioDolbyEDecode & {
                  ProgramSelection: DolbyEProgramSelection;
                };
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
              DolbyEDecode: AudioDolbyEDecode & {
                ProgramSelection: DolbyEProgramSelection;
              };
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
          ArchiveGroupSettings: ArchiveGroupSettings & {
            Destination: OutputLocationRef;
          };
          FrameCaptureGroupSettings: FrameCaptureGroupSettings & {
            Destination: OutputLocationRef;
          };
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
            };
          };
          MsSmoothGroupSettings: MsSmoothGroupSettings & {
            Destination: OutputLocationRef;
          };
          CmafIngestGroupSettings: CmafIngestGroupSettings & {
            Destination: OutputLocationRef;
            CaptionLanguageMappings: (CmafIngestCaptionLanguageMapping & {
              CaptionChannel: __integerMin1Max4;
              LanguageCode: __stringMin3Max3;
            })[];
            AdditionalDestinations: (AdditionalDestinations & {
              Destination: OutputLocationRef;
            })[];
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
                StandardHlsSettings: StandardHlsSettings & {
                  M3u8Settings: M3u8Settings;
                };
              };
            };
            MultiplexOutputSettings: MultiplexOutputSettings & {
              Destination: OutputLocationRef;
            };
            RtmpOutputSettings: RtmpOutputSettings & {
              Destination: OutputLocationRef;
            };
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
          Esam: Esam & {
            AcquisitionPointId: __stringMax256;
            PoisEndpoint: __stringMax2048;
          };
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
      ThumbnailConfiguration: ThumbnailConfiguration & {
        State: ThumbnailState;
      };
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
            AudioSilenceSettings: AudioSilenceFailoverSettings & {
              AudioSelectorName: string;
            };
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
            AudioLanguageSelection: AudioLanguageSelection & {
              LanguageCode: string;
            };
            AudioPidSelection: AudioPidSelection & {
              Pid: __integerMin0Max8191;
              Pids: (AudioPid & {
                Pid: __integerMin0Max8191;
                DolbyEDecode: AudioDolbyEDecode & {
                  ProgramSelection: DolbyEProgramSelection;
                };
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
              DolbyEDecode: AudioDolbyEDecode & {
                ProgramSelection: DolbyEProgramSelection;
              };
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
export type __listOfInterfaceMappingUpdateRequest =
  InterfaceMappingUpdateRequest[];
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
  EventTargets?: (EventBridgeRuleTemplateTarget & {
    Arn: __stringMin1Max2048PatternArn;
  })[];
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
export interface MulticastSourceUpdateRequest {
  SourceIp?: string;
  Url?: string;
}
export type __listOfMulticastSourceUpdateRequest =
  MulticastSourceUpdateRequest[];
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
        Decryption: SrtListenerDecryption & {
          Algorithm: Algorithm;
          PassphraseSecretArn: string;
        };
      };
    };
    MulticastSettings: MulticastSettings & {
      Sources: (MulticastSource & { Url: string })[];
    };
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
  PacketIdentifiersMapping?: {
    [key: string]: MultiplexProgramPacketIdentifiersMap | undefined;
  };
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
export interface RouteUpdateRequest {
  Cidr?: string;
  Gateway?: string;
}
export type __listOfRouteUpdateRequest = RouteUpdateRequest[];
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
  descriptor: {
    service: svc,
    http: "POST /prod/inputDevices/{InputDeviceId}/accept",
    input: { InputDeviceId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/batch/delete",
    input: {
      ChannelIds: D.m({ wire: "channelIds" }),
      InputIds: D.m({ wire: "inputIds" }),
      InputSecurityGroupIds: D.m({ wire: "inputSecurityGroupIds" }),
      MultiplexIds: D.m({ wire: "multiplexIds" }),
    },
    output: {
      Failed: D.m({ wire: "failed", shape: D.list(o_BatchFailedResultModel) }),
      Successful: D.m({
        wire: "successful",
        shape: D.list(o_BatchSuccessfulResultModel),
      }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/batch/start",
    input: {
      ChannelIds: D.m({ wire: "channelIds" }),
      MultiplexIds: D.m({ wire: "multiplexIds" }),
    },
    output: {
      Failed: D.m({ wire: "failed", shape: D.list(o_BatchFailedResultModel) }),
      Successful: D.m({
        wire: "successful",
        shape: D.list(o_BatchSuccessfulResultModel),
      }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/batch/stop",
    input: {
      ChannelIds: D.m({ wire: "channelIds" }),
      MultiplexIds: D.m({ wire: "multiplexIds" }),
    },
    output: {
      Failed: D.m({ wire: "failed", shape: D.list(o_BatchFailedResultModel) }),
      Successful: D.m({
        wire: "successful",
        shape: D.list(o_BatchSuccessfulResultModel),
      }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /prod/channels/{ChannelId}/schedule",
    input: {
      ChannelId: 0,
      Creates: D.m({
        wire: "creates",
        shape: {
          ScheduleActions: D.m({
            wire: "scheduleActions",
            shape: D.list({
              ActionName: D.m({ wire: "actionName" }),
              ScheduleActionSettings: D.m({
                wire: "scheduleActionSettings",
                shape: {
                  HlsId3SegmentTaggingSettings: D.m({
                    wire: "hlsId3SegmentTaggingSettings",
                    shape: {
                      Tag: D.m({ wire: "tag" }),
                      Id3: D.m({ wire: "id3" }),
                    },
                  }),
                  HlsTimedMetadataSettings: D.m({
                    wire: "hlsTimedMetadataSettings",
                    shape: { Id3: D.m({ wire: "id3" }) },
                  }),
                  InputPrepareSettings: D.m({
                    wire: "inputPrepareSettings",
                    shape: {
                      InputAttachmentNameReference: D.m({
                        wire: "inputAttachmentNameReference",
                      }),
                      InputClippingSettings: D.m({
                        wire: "inputClippingSettings",
                        shape: i_InputClippingSettings,
                      }),
                      UrlPath: D.m({ wire: "urlPath" }),
                    },
                  }),
                  InputSwitchSettings: D.m({
                    wire: "inputSwitchSettings",
                    shape: {
                      InputAttachmentNameReference: D.m({
                        wire: "inputAttachmentNameReference",
                      }),
                      InputClippingSettings: D.m({
                        wire: "inputClippingSettings",
                        shape: i_InputClippingSettings,
                      }),
                      UrlPath: D.m({ wire: "urlPath" }),
                    },
                  }),
                  MotionGraphicsImageActivateSettings: D.m({
                    wire: "motionGraphicsImageActivateSettings",
                    shape: {
                      Duration: D.m({ wire: "duration" }),
                      PasswordParam: D.m({ wire: "passwordParam" }),
                      Url: D.m({ wire: "url" }),
                      Username: D.m({ wire: "username" }),
                    },
                  }),
                  MotionGraphicsImageDeactivateSettings: D.m({
                    wire: "motionGraphicsImageDeactivateSettings",
                    shape: {},
                  }),
                  PauseStateSettings: D.m({
                    wire: "pauseStateSettings",
                    shape: {
                      Pipelines: D.m({
                        wire: "pipelines",
                        shape: D.list({
                          PipelineId: D.m({ wire: "pipelineId" }),
                        }),
                      }),
                    },
                  }),
                  Scte35InputSettings: D.m({
                    wire: "scte35InputSettings",
                    shape: {
                      InputAttachmentNameReference: D.m({
                        wire: "inputAttachmentNameReference",
                      }),
                      Mode: D.m({ wire: "mode" }),
                    },
                  }),
                  Scte35ReturnToNetworkSettings: D.m({
                    wire: "scte35ReturnToNetworkSettings",
                    shape: { SpliceEventId: D.m({ wire: "spliceEventId" }) },
                  }),
                  Scte35SpliceInsertSettings: D.m({
                    wire: "scte35SpliceInsertSettings",
                    shape: {
                      Duration: D.m({ wire: "duration" }),
                      SpliceEventId: D.m({ wire: "spliceEventId" }),
                    },
                  }),
                  Scte35TimeSignalSettings: D.m({
                    wire: "scte35TimeSignalSettings",
                    shape: {
                      Scte35Descriptors: D.m({
                        wire: "scte35Descriptors",
                        shape: D.list({
                          Scte35DescriptorSettings: D.m({
                            wire: "scte35DescriptorSettings",
                            shape: {
                              SegmentationDescriptorScte35DescriptorSettings:
                                D.m({
                                  wire: "segmentationDescriptorScte35DescriptorSettings",
                                  shape: {
                                    DeliveryRestrictions: D.m({
                                      wire: "deliveryRestrictions",
                                      shape: {
                                        ArchiveAllowedFlag: D.m({
                                          wire: "archiveAllowedFlag",
                                        }),
                                        DeviceRestrictions: D.m({
                                          wire: "deviceRestrictions",
                                        }),
                                        NoRegionalBlackoutFlag: D.m({
                                          wire: "noRegionalBlackoutFlag",
                                        }),
                                        WebDeliveryAllowedFlag: D.m({
                                          wire: "webDeliveryAllowedFlag",
                                        }),
                                      },
                                    }),
                                    SegmentNum: D.m({ wire: "segmentNum" }),
                                    SegmentationCancelIndicator: D.m({
                                      wire: "segmentationCancelIndicator",
                                    }),
                                    SegmentationDuration: D.m({
                                      wire: "segmentationDuration",
                                    }),
                                    SegmentationEventId: D.m({
                                      wire: "segmentationEventId",
                                    }),
                                    SegmentationTypeId: D.m({
                                      wire: "segmentationTypeId",
                                    }),
                                    SegmentationUpid: D.m({
                                      wire: "segmentationUpid",
                                    }),
                                    SegmentationUpidType: D.m({
                                      wire: "segmentationUpidType",
                                    }),
                                    SegmentsExpected: D.m({
                                      wire: "segmentsExpected",
                                    }),
                                    SubSegmentNum: D.m({
                                      wire: "subSegmentNum",
                                    }),
                                    SubSegmentsExpected: D.m({
                                      wire: "subSegmentsExpected",
                                    }),
                                  },
                                }),
                            },
                          }),
                        }),
                      }),
                    },
                  }),
                  StaticImageActivateSettings: D.m({
                    wire: "staticImageActivateSettings",
                    shape: {
                      Duration: D.m({ wire: "duration" }),
                      FadeIn: D.m({ wire: "fadeIn" }),
                      FadeOut: D.m({ wire: "fadeOut" }),
                      Height: D.m({ wire: "height" }),
                      Image: D.m({ wire: "image", shape: i_InputLocation }),
                      ImageX: D.m({ wire: "imageX" }),
                      ImageY: D.m({ wire: "imageY" }),
                      Layer: D.m({ wire: "layer" }),
                      Opacity: D.m({ wire: "opacity" }),
                      Width: D.m({ wire: "width" }),
                    },
                  }),
                  StaticImageDeactivateSettings: D.m({
                    wire: "staticImageDeactivateSettings",
                    shape: {
                      FadeOut: D.m({ wire: "fadeOut" }),
                      Layer: D.m({ wire: "layer" }),
                    },
                  }),
                  StaticImageOutputActivateSettings: D.m({
                    wire: "staticImageOutputActivateSettings",
                    shape: {
                      Duration: D.m({ wire: "duration" }),
                      FadeIn: D.m({ wire: "fadeIn" }),
                      FadeOut: D.m({ wire: "fadeOut" }),
                      Height: D.m({ wire: "height" }),
                      Image: D.m({ wire: "image", shape: i_InputLocation }),
                      ImageX: D.m({ wire: "imageX" }),
                      ImageY: D.m({ wire: "imageY" }),
                      Layer: D.m({ wire: "layer" }),
                      Opacity: D.m({ wire: "opacity" }),
                      OutputNames: D.m({ wire: "outputNames" }),
                      Width: D.m({ wire: "width" }),
                    },
                  }),
                  StaticImageOutputDeactivateSettings: D.m({
                    wire: "staticImageOutputDeactivateSettings",
                    shape: {
                      FadeOut: D.m({ wire: "fadeOut" }),
                      Layer: D.m({ wire: "layer" }),
                      OutputNames: D.m({ wire: "outputNames" }),
                    },
                  }),
                  Id3SegmentTaggingSettings: D.m({
                    wire: "id3SegmentTaggingSettings",
                    shape: {
                      Id3: D.m({ wire: "id3" }),
                      Tag: D.m({ wire: "tag" }),
                    },
                  }),
                  TimedMetadataSettings: D.m({
                    wire: "timedMetadataSettings",
                    shape: { Id3: D.m({ wire: "id3" }) },
                  }),
                },
              }),
              ScheduleActionStartSettings: D.m({
                wire: "scheduleActionStartSettings",
                shape: {
                  FixedModeScheduleActionStartSettings: D.m({
                    wire: "fixedModeScheduleActionStartSettings",
                    shape: { Time: D.m({ wire: "time" }) },
                  }),
                  FollowModeScheduleActionStartSettings: D.m({
                    wire: "followModeScheduleActionStartSettings",
                    shape: {
                      FollowPoint: D.m({ wire: "followPoint" }),
                      ReferenceActionName: D.m({ wire: "referenceActionName" }),
                    },
                  }),
                  ImmediateModeScheduleActionStartSettings: D.m({
                    wire: "immediateModeScheduleActionStartSettings",
                    shape: {},
                  }),
                },
              }),
            }),
          }),
        },
      }),
      Deletes: D.m({
        wire: "deletes",
        shape: { ActionNames: D.m({ wire: "actionNames" }) },
      }),
    },
    output: {
      Creates: D.m({
        wire: "creates",
        shape: {
          ScheduleActions: D.m({
            wire: "scheduleActions",
            shape: D.list(o_ScheduleAction),
          }),
        },
      }),
      Deletes: D.m({
        wire: "deletes",
        shape: {
          ScheduleActions: D.m({
            wire: "scheduleActions",
            shape: D.list(o_ScheduleAction),
          }),
        },
      }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/inputDevices/{InputDeviceId}/cancel",
    input: { InputDeviceId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/claimDevice",
    input: { Id: D.m({ wire: "id" }) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/channels",
    input: {
      CdiInputSpecification: D.m({
        wire: "cdiInputSpecification",
        shape: i_CdiInputSpecification,
      }),
      ChannelClass: D.m({ wire: "channelClass" }),
      Destinations: D.m({
        wire: "destinations",
        shape: D.list(i_OutputDestination),
      }),
      EncoderSettings: D.m({
        wire: "encoderSettings",
        shape: i_EncoderSettings,
      }),
      InputAttachments: D.m({
        wire: "inputAttachments",
        shape: D.list(i_InputAttachment),
      }),
      InputSpecification: D.m({
        wire: "inputSpecification",
        shape: i_InputSpecification,
      }),
      LogLevel: D.m({ wire: "logLevel" }),
      Maintenance: D.m({
        wire: "maintenance",
        shape: {
          MaintenanceDay: D.m({ wire: "maintenanceDay" }),
          MaintenanceStartTime: D.m({ wire: "maintenanceStartTime" }),
        },
      }),
      Name: D.m({ wire: "name" }),
      RequestId: D.m({ idempotency: true, wire: "requestId" }),
      Reserved: D.m({ wire: "reserved" }),
      RoleArn: D.m({ wire: "roleArn" }),
      Tags: D.m({ wire: "tags" }),
      Vpc: D.m({
        wire: "vpc",
        shape: {
          PublicAddressAllocationIds: D.m({
            wire: "publicAddressAllocationIds",
          }),
          SecurityGroupIds: D.m({ wire: "securityGroupIds" }),
          SubnetIds: D.m({ wire: "subnetIds" }),
        },
      }),
      AnywhereSettings: D.m({
        wire: "anywhereSettings",
        shape: i_AnywhereSettings,
      }),
      ChannelEngineVersion: D.m({
        wire: "channelEngineVersion",
        shape: i_ChannelEngineVersionRequest,
      }),
      DryRun: D.m({ wire: "dryRun" }),
      LinkedChannelSettings: D.m({
        wire: "linkedChannelSettings",
        shape: i_LinkedChannelSettings,
      }),
      ChannelSecurityGroups: D.m({ wire: "channelSecurityGroups" }),
      InferenceSettings: D.m({
        wire: "inferenceSettings",
        shape: i_InferenceSettings,
      }),
    },
    output: { Channel: D.m({ wire: "channel", shape: o_Channel }) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/clusters/{ClusterId}/channelplacementgroups",
    input: {
      ClusterId: 0,
      Name: D.m({ wire: "name" }),
      Nodes: D.m({ wire: "nodes" }),
      RequestId: D.m({ idempotency: true, wire: "requestId" }),
      Tags: D.m({ wire: "tags" }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      Channels: D.m({ wire: "channels" }),
      ClusterId: D.m({ wire: "clusterId" }),
      Id: D.m({ wire: "id" }),
      Name: D.m({ wire: "name" }),
      Nodes: D.m({ wire: "nodes" }),
      State: D.m({ wire: "state" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/cloudwatch-alarm-templates",
    input: {
      ComparisonOperator: D.m({ wire: "comparisonOperator" }),
      DatapointsToAlarm: D.m({ wire: "datapointsToAlarm" }),
      Description: D.m({ wire: "description" }),
      EvaluationPeriods: D.m({ wire: "evaluationPeriods" }),
      GroupIdentifier: D.m({ wire: "groupIdentifier" }),
      MetricName: D.m({ wire: "metricName" }),
      Name: D.m({ wire: "name" }),
      Period: D.m({ wire: "period" }),
      Statistic: D.m({ wire: "statistic" }),
      Tags: D.m({ wire: "tags" }),
      TargetResourceType: D.m({ wire: "targetResourceType" }),
      Threshold: D.m({ wire: "threshold" }),
      TreatMissingData: D.m({ wire: "treatMissingData" }),
      RequestId: D.m({ idempotency: true, wire: "requestId" }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      ComparisonOperator: D.m({ wire: "comparisonOperator" }),
      CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
      DatapointsToAlarm: D.m({ wire: "datapointsToAlarm" }),
      Description: D.m({ wire: "description" }),
      EvaluationPeriods: D.m({ wire: "evaluationPeriods" }),
      GroupId: D.m({ wire: "groupId" }),
      Id: D.m({ wire: "id" }),
      MetricName: D.m({ wire: "metricName" }),
      ModifiedAt: D.m({ wire: "modifiedAt", shape: D.ts }),
      Name: D.m({ wire: "name" }),
      Period: D.m({ wire: "period" }),
      Statistic: D.m({ wire: "statistic" }),
      Tags: D.m({ wire: "tags" }),
      TargetResourceType: D.m({ wire: "targetResourceType" }),
      Threshold: D.m({ wire: "threshold" }),
      TreatMissingData: D.m({ wire: "treatMissingData" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/cloudwatch-alarm-template-groups",
    input: {
      Description: D.m({ wire: "description" }),
      Name: D.m({ wire: "name" }),
      Tags: D.m({ wire: "tags" }),
      RequestId: D.m({ idempotency: true, wire: "requestId" }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
      Description: D.m({ wire: "description" }),
      Id: D.m({ wire: "id" }),
      ModifiedAt: D.m({ wire: "modifiedAt", shape: D.ts }),
      Name: D.m({ wire: "name" }),
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/clusters",
    input: {
      ClusterType: D.m({ wire: "clusterType" }),
      InstanceRoleArn: D.m({ wire: "instanceRoleArn" }),
      Name: D.m({ wire: "name" }),
      NetworkSettings: D.m({
        wire: "networkSettings",
        shape: {
          DefaultRoute: D.m({ wire: "defaultRoute" }),
          InterfaceMappings: D.m({
            wire: "interfaceMappings",
            shape: D.list({
              LogicalInterfaceName: D.m({ wire: "logicalInterfaceName" }),
              NetworkId: D.m({ wire: "networkId" }),
            }),
          }),
        },
      }),
      RequestId: D.m({ idempotency: true, wire: "requestId" }),
      Tags: D.m({ wire: "tags" }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      ChannelIds: D.m({ wire: "channelIds" }),
      ClusterType: D.m({ wire: "clusterType" }),
      Id: D.m({ wire: "id" }),
      InstanceRoleArn: D.m({ wire: "instanceRoleArn" }),
      Name: D.m({ wire: "name" }),
      NetworkSettings: D.m({
        wire: "networkSettings",
        shape: o_ClusterNetworkSettings,
      }),
      State: D.m({ wire: "state" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/eventbridge-rule-templates",
    input: {
      Description: D.m({ wire: "description" }),
      EventTargets: D.m({
        wire: "eventTargets",
        shape: D.list(i_EventBridgeRuleTemplateTarget),
      }),
      EventType: D.m({ wire: "eventType" }),
      GroupIdentifier: D.m({ wire: "groupIdentifier" }),
      Name: D.m({ wire: "name" }),
      Tags: D.m({ wire: "tags" }),
      RequestId: D.m({ idempotency: true, wire: "requestId" }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
      Description: D.m({ wire: "description" }),
      EventTargets: D.m({
        wire: "eventTargets",
        shape: D.list(o_EventBridgeRuleTemplateTarget),
      }),
      EventType: D.m({ wire: "eventType" }),
      GroupId: D.m({ wire: "groupId" }),
      Id: D.m({ wire: "id" }),
      ModifiedAt: D.m({ wire: "modifiedAt", shape: D.ts }),
      Name: D.m({ wire: "name" }),
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/eventbridge-rule-template-groups",
    input: {
      Description: D.m({ wire: "description" }),
      Name: D.m({ wire: "name" }),
      Tags: D.m({ wire: "tags" }),
      RequestId: D.m({ idempotency: true, wire: "requestId" }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
      Description: D.m({ wire: "description" }),
      Id: D.m({ wire: "id" }),
      ModifiedAt: D.m({ wire: "modifiedAt", shape: D.ts }),
      Name: D.m({ wire: "name" }),
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/inputs",
    input: {
      Destinations: D.m({
        wire: "destinations",
        shape: D.list(i_InputDestinationRequest),
      }),
      InputDevices: D.m({
        wire: "inputDevices",
        shape: D.list({ Id: D.m({ wire: "id" }) }),
      }),
      InputSecurityGroups: D.m({ wire: "inputSecurityGroups" }),
      MediaConnectFlows: D.m({
        wire: "mediaConnectFlows",
        shape: D.list(i_MediaConnectFlowRequest),
      }),
      Name: D.m({ wire: "name" }),
      RequestId: D.m({ idempotency: true, wire: "requestId" }),
      RoleArn: D.m({ wire: "roleArn" }),
      Sources: D.m({ wire: "sources", shape: D.list(i_InputSourceRequest) }),
      Tags: D.m({ wire: "tags" }),
      Type: D.m({ wire: "type" }),
      Vpc: D.m({
        wire: "vpc",
        shape: {
          SecurityGroupIds: D.m({ wire: "securityGroupIds" }),
          SubnetIds: D.m({ wire: "subnetIds" }),
        },
      }),
      SrtSettings: D.m({ wire: "srtSettings", shape: i_SrtSettingsRequest }),
      InputNetworkLocation: D.m({ wire: "inputNetworkLocation" }),
      MulticastSettings: D.m({
        wire: "multicastSettings",
        shape: {
          Sources: D.m({
            wire: "sources",
            shape: D.list({
              SourceIp: D.m({ wire: "sourceIp" }),
              Url: D.m({ wire: "url" }),
            }),
          }),
        },
      }),
      Smpte2110ReceiverGroupSettings: D.m({
        wire: "smpte2110ReceiverGroupSettings",
        shape: i_Smpte2110ReceiverGroupSettings,
      }),
      SdiSources: D.m({ wire: "sdiSources" }),
      RouterSettings: D.m({
        wire: "routerSettings",
        shape: {
          Destinations: D.m({
            wire: "destinations",
            shape: D.list({
              AvailabilityZoneName: D.m({ wire: "availabilityZoneName" }),
            }),
          }),
          EncryptionType: D.m({ wire: "encryptionType" }),
          SecretArn: D.m({ wire: "secretArn" }),
        },
      }),
    },
    output: { Input: D.m({ wire: "input", shape: o_Input }) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/inputSecurityGroups",
    input: {
      Tags: D.m({ wire: "tags" }),
      WhitelistRules: D.m({
        wire: "whitelistRules",
        shape: D.list(i_InputWhitelistRuleCidr),
      }),
    },
    output: {
      SecurityGroup: D.m({
        wire: "securityGroup",
        shape: o_InputSecurityGroup,
      }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/multiplexes",
    input: {
      AvailabilityZones: D.m({ wire: "availabilityZones" }),
      MultiplexSettings: D.m({
        wire: "multiplexSettings",
        shape: i_MultiplexSettings,
      }),
      Name: D.m({ wire: "name" }),
      RequestId: D.m({ idempotency: true, wire: "requestId" }),
      Tags: D.m({ wire: "tags" }),
    },
    output: { Multiplex: D.m({ wire: "multiplex", shape: o_Multiplex }) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/multiplexes/{MultiplexId}/programs",
    input: {
      MultiplexId: 0,
      MultiplexProgramSettings: D.m({
        wire: "multiplexProgramSettings",
        shape: i_MultiplexProgramSettings,
      }),
      ProgramName: D.m({ wire: "programName" }),
      RequestId: D.m({ idempotency: true, wire: "requestId" }),
    },
    output: {
      MultiplexProgram: D.m({
        wire: "multiplexProgram",
        shape: o_MultiplexProgram,
      }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/networks",
    input: {
      IpPools: D.m({
        wire: "ipPools",
        shape: D.list({ Cidr: D.m({ wire: "cidr" }) }),
      }),
      Name: D.m({ wire: "name" }),
      RequestId: D.m({ idempotency: true, wire: "requestId" }),
      Routes: D.m({
        wire: "routes",
        shape: D.list({
          Cidr: D.m({ wire: "cidr" }),
          Gateway: D.m({ wire: "gateway" }),
        }),
      }),
      Tags: D.m({ wire: "tags" }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      AssociatedClusterIds: D.m({ wire: "associatedClusterIds" }),
      Id: D.m({ wire: "id" }),
      IpPools: D.m({ wire: "ipPools", shape: D.list(o_IpPool) }),
      Name: D.m({ wire: "name" }),
      Routes: D.m({ wire: "routes", shape: D.list(o_Route) }),
      State: D.m({ wire: "state" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/clusters/{ClusterId}/nodes",
    input: {
      ClusterId: 0,
      Name: D.m({ wire: "name" }),
      NodeInterfaceMappings: D.m({
        wire: "nodeInterfaceMappings",
        shape: D.list({
          LogicalInterfaceName: D.m({ wire: "logicalInterfaceName" }),
          NetworkInterfaceMode: D.m({ wire: "networkInterfaceMode" }),
          PhysicalInterfaceName: D.m({ wire: "physicalInterfaceName" }),
        }),
      }),
      RequestId: D.m({ idempotency: true, wire: "requestId" }),
      Role: D.m({ wire: "role" }),
      Tags: D.m({ wire: "tags" }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      ChannelPlacementGroups: D.m({ wire: "channelPlacementGroups" }),
      ClusterId: D.m({ wire: "clusterId" }),
      ConnectionState: D.m({ wire: "connectionState" }),
      Id: D.m({ wire: "id" }),
      InstanceArn: D.m({ wire: "instanceArn" }),
      Name: D.m({ wire: "name" }),
      NodeInterfaceMappings: D.m({
        wire: "nodeInterfaceMappings",
        shape: D.list(o_NodeInterfaceMapping),
      }),
      Role: D.m({ wire: "role" }),
      State: D.m({ wire: "state" }),
      SdiSourceMappings: D.m({
        wire: "sdiSourceMappings",
        shape: D.list(o_SdiSourceMapping),
      }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/clusters/{ClusterId}/nodeRegistrationScript",
    input: {
      ClusterId: 0,
      Id: D.m({ wire: "id" }),
      Name: D.m({ wire: "name" }),
      NodeInterfaceMappings: D.m({
        wire: "nodeInterfaceMappings",
        shape: D.list({
          LogicalInterfaceName: D.m({ wire: "logicalInterfaceName" }),
          NetworkInterfaceMode: D.m({ wire: "networkInterfaceMode" }),
          PhysicalInterfaceName: D.m({ wire: "physicalInterfaceName" }),
          PhysicalInterfaceIpAddresses: D.m({
            wire: "physicalInterfaceIpAddresses",
          }),
        }),
      }),
      RequestId: D.m({ idempotency: true, wire: "requestId" }),
      Role: D.m({ wire: "role" }),
    },
    output: { NodeRegistrationScript: D.m({ wire: "nodeRegistrationScript" }) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/inputs/{InputId}/partners",
    input: {
      InputId: 0,
      RequestId: D.m({ idempotency: true, wire: "requestId" }),
      Tags: D.m({ wire: "tags" }),
    },
    output: { Input: D.m({ wire: "input", shape: o_Input }) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/sdiSources",
    input: {
      Mode: D.m({ wire: "mode" }),
      Name: D.m({ wire: "name" }),
      RequestId: D.m({ idempotency: true, wire: "requestId" }),
      Tags: D.m({ wire: "tags" }),
      Type: D.m({ wire: "type" }),
    },
    output: { SdiSource: D.m({ wire: "sdiSource", shape: o_SdiSource }) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/signal-maps",
    input: {
      CloudWatchAlarmTemplateGroupIdentifiers: D.m({
        wire: "cloudWatchAlarmTemplateGroupIdentifiers",
      }),
      Description: D.m({ wire: "description" }),
      DiscoveryEntryPointArn: D.m({ wire: "discoveryEntryPointArn" }),
      EventBridgeRuleTemplateGroupIdentifiers: D.m({
        wire: "eventBridgeRuleTemplateGroupIdentifiers",
      }),
      Name: D.m({ wire: "name" }),
      Tags: D.m({ wire: "tags" }),
      RequestId: D.m({ idempotency: true, wire: "requestId" }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      CloudWatchAlarmTemplateGroupIds: D.m({
        wire: "cloudWatchAlarmTemplateGroupIds",
      }),
      CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
      Description: D.m({ wire: "description" }),
      DiscoveryEntryPointArn: D.m({ wire: "discoveryEntryPointArn" }),
      ErrorMessage: D.m({ wire: "errorMessage" }),
      EventBridgeRuleTemplateGroupIds: D.m({
        wire: "eventBridgeRuleTemplateGroupIds",
      }),
      FailedMediaResourceMap: D.m({
        wire: "failedMediaResourceMap",
        shape: D.map(o_MediaResource),
      }),
      Id: D.m({ wire: "id" }),
      LastDiscoveredAt: D.m({ wire: "lastDiscoveredAt", shape: D.ts }),
      LastSuccessfulMonitorDeployment: D.m({
        wire: "lastSuccessfulMonitorDeployment",
        shape: o_SuccessfulMonitorDeployment,
      }),
      MediaResourceMap: D.m({
        wire: "mediaResourceMap",
        shape: D.map(o_MediaResource),
      }),
      ModifiedAt: D.m({ wire: "modifiedAt", shape: D.ts }),
      MonitorChangesPendingDeployment: D.m({
        wire: "monitorChangesPendingDeployment",
      }),
      MonitorDeployment: D.m({
        wire: "monitorDeployment",
        shape: o_MonitorDeployment,
      }),
      Name: D.m({ wire: "name" }),
      Status: D.m({ wire: "status" }),
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: D.m({ wire: "tags" }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTags",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /prod/channels/{ChannelId}",
    input: { ChannelId: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      CdiInputSpecification: D.m({
        wire: "cdiInputSpecification",
        shape: o_CdiInputSpecification,
      }),
      ChannelClass: D.m({ wire: "channelClass" }),
      Destinations: D.m({
        wire: "destinations",
        shape: D.list(o_OutputDestination),
      }),
      EgressEndpoints: D.m({
        wire: "egressEndpoints",
        shape: D.list(o_ChannelEgressEndpoint),
      }),
      EncoderSettings: D.m({
        wire: "encoderSettings",
        shape: o_EncoderSettings,
      }),
      Id: D.m({ wire: "id" }),
      InputAttachments: D.m({
        wire: "inputAttachments",
        shape: D.list(o_InputAttachment),
      }),
      InputSpecification: D.m({
        wire: "inputSpecification",
        shape: o_InputSpecification,
      }),
      LogLevel: D.m({ wire: "logLevel" }),
      Maintenance: D.m({ wire: "maintenance", shape: o_MaintenanceStatus }),
      Name: D.m({ wire: "name" }),
      PipelineDetails: D.m({
        wire: "pipelineDetails",
        shape: D.list(o_PipelineDetail),
      }),
      PipelinesRunningCount: D.m({ wire: "pipelinesRunningCount" }),
      RoleArn: D.m({ wire: "roleArn" }),
      State: D.m({ wire: "state" }),
      Tags: D.m({ wire: "tags" }),
      Vpc: D.m({ wire: "vpc", shape: o_VpcOutputSettingsDescription }),
      AnywhereSettings: D.m({
        wire: "anywhereSettings",
        shape: o_DescribeAnywhereSettings,
      }),
      ChannelEngineVersion: D.m({
        wire: "channelEngineVersion",
        shape: o_ChannelEngineVersionResponse,
      }),
      LinkedChannelSettings: D.m({
        wire: "linkedChannelSettings",
        shape: o_DescribeLinkedChannelSettings,
      }),
      ChannelSecurityGroups: D.m({ wire: "channelSecurityGroups" }),
      InferenceSettings: D.m({
        wire: "inferenceSettings",
        shape: o_DescribeInferenceSettings,
      }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /prod/clusters/{ClusterId}/channelplacementgroups/{ChannelPlacementGroupId}",
    input: { ChannelPlacementGroupId: 0, ClusterId: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      Channels: D.m({ wire: "channels" }),
      ClusterId: D.m({ wire: "clusterId" }),
      Id: D.m({ wire: "id" }),
      Name: D.m({ wire: "name" }),
      Nodes: D.m({ wire: "nodes" }),
      State: D.m({ wire: "state" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /prod/cloudwatch-alarm-templates/{Identifier}",
    input: { Identifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /prod/cloudwatch-alarm-template-groups/{Identifier}",
    input: { Identifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /prod/clusters/{ClusterId}",
    input: { ClusterId: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      ChannelIds: D.m({ wire: "channelIds" }),
      ClusterType: D.m({ wire: "clusterType" }),
      Id: D.m({ wire: "id" }),
      InstanceRoleArn: D.m({ wire: "instanceRoleArn" }),
      Name: D.m({ wire: "name" }),
      NetworkSettings: D.m({
        wire: "networkSettings",
        shape: o_ClusterNetworkSettings,
      }),
      State: D.m({ wire: "state" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /prod/eventbridge-rule-templates/{Identifier}",
    input: { Identifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /prod/eventbridge-rule-template-groups/{Identifier}",
    input: { Identifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /prod/inputs/{InputId}",
    input: { InputId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /prod/inputSecurityGroups/{InputSecurityGroupId}",
    input: { InputSecurityGroupId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /prod/multiplexes/{MultiplexId}",
    input: { MultiplexId: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      AvailabilityZones: D.m({ wire: "availabilityZones" }),
      Destinations: D.m({
        wire: "destinations",
        shape: D.list(o_MultiplexOutputDestination),
      }),
      Id: D.m({ wire: "id" }),
      MultiplexSettings: D.m({
        wire: "multiplexSettings",
        shape: o_MultiplexSettings,
      }),
      Name: D.m({ wire: "name" }),
      PipelinesRunningCount: D.m({ wire: "pipelinesRunningCount" }),
      ProgramCount: D.m({ wire: "programCount" }),
      State: D.m({ wire: "state" }),
      Tags: D.m({ wire: "tags" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /prod/multiplexes/{MultiplexId}/programs/{ProgramName}",
    input: { MultiplexId: 0, ProgramName: 0 },
    output: {
      ChannelId: D.m({ wire: "channelId" }),
      MultiplexProgramSettings: D.m({
        wire: "multiplexProgramSettings",
        shape: o_MultiplexProgramSettings,
      }),
      PacketIdentifiersMap: D.m({
        wire: "packetIdentifiersMap",
        shape: o_MultiplexProgramPacketIdentifiersMap,
      }),
      PipelineDetails: D.m({
        wire: "pipelineDetails",
        shape: D.list(o_MultiplexProgramPipelineDetail),
      }),
      ProgramName: D.m({ wire: "programName" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /prod/networks/{NetworkId}",
    input: { NetworkId: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      AssociatedClusterIds: D.m({ wire: "associatedClusterIds" }),
      Id: D.m({ wire: "id" }),
      IpPools: D.m({ wire: "ipPools", shape: D.list(o_IpPool) }),
      Name: D.m({ wire: "name" }),
      Routes: D.m({ wire: "routes", shape: D.list(o_Route) }),
      State: D.m({ wire: "state" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /prod/clusters/{ClusterId}/nodes/{NodeId}",
    input: { ClusterId: 0, NodeId: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      ChannelPlacementGroups: D.m({ wire: "channelPlacementGroups" }),
      ClusterId: D.m({ wire: "clusterId" }),
      ConnectionState: D.m({ wire: "connectionState" }),
      Id: D.m({ wire: "id" }),
      InstanceArn: D.m({ wire: "instanceArn" }),
      Name: D.m({ wire: "name" }),
      NodeInterfaceMappings: D.m({
        wire: "nodeInterfaceMappings",
        shape: D.list(o_NodeInterfaceMapping),
      }),
      Role: D.m({ wire: "role" }),
      State: D.m({ wire: "state" }),
      SdiSourceMappings: D.m({
        wire: "sdiSourceMappings",
        shape: D.list(o_SdiSourceMapping),
      }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /prod/reservations/{ReservationId}",
    input: { ReservationId: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      Count: D.m({ wire: "count" }),
      CurrencyCode: D.m({ wire: "currencyCode" }),
      Duration: D.m({ wire: "duration" }),
      DurationUnits: D.m({ wire: "durationUnits" }),
      End: D.m({ wire: "end" }),
      FixedPrice: D.m({ wire: "fixedPrice" }),
      Name: D.m({ wire: "name" }),
      OfferingDescription: D.m({ wire: "offeringDescription" }),
      OfferingId: D.m({ wire: "offeringId" }),
      OfferingType: D.m({ wire: "offeringType" }),
      Region: D.m({ wire: "region" }),
      RenewalSettings: D.m({
        wire: "renewalSettings",
        shape: o_RenewalSettings,
      }),
      ReservationId: D.m({ wire: "reservationId" }),
      ResourceSpecification: D.m({
        wire: "resourceSpecification",
        shape: o_ReservationResourceSpecification,
      }),
      Start: D.m({ wire: "start" }),
      State: D.m({ wire: "state" }),
      Tags: D.m({ wire: "tags" }),
      UsagePrice: D.m({ wire: "usagePrice" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /prod/channels/{ChannelId}/schedule",
    input: { ChannelId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /prod/sdiSources/{SdiSourceId}",
    input: { SdiSourceId: 0 },
    output: { SdiSource: D.m({ wire: "sdiSource", shape: o_SdiSource }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /prod/signal-maps/{Identifier}",
    input: { Identifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /prod/tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTags",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /prod/accountConfiguration",
    input: {},
    output: {
      AccountConfiguration: D.m({
        wire: "accountConfiguration",
        shape: o_AccountConfiguration,
      }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /prod/channels/{ChannelId}",
    input: { ChannelId: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      CdiInputSpecification: D.m({
        wire: "cdiInputSpecification",
        shape: o_CdiInputSpecification,
      }),
      ChannelClass: D.m({ wire: "channelClass" }),
      Destinations: D.m({
        wire: "destinations",
        shape: D.list(o_OutputDestination),
      }),
      EgressEndpoints: D.m({
        wire: "egressEndpoints",
        shape: D.list(o_ChannelEgressEndpoint),
      }),
      EncoderSettings: D.m({
        wire: "encoderSettings",
        shape: o_EncoderSettings,
      }),
      Id: D.m({ wire: "id" }),
      InputAttachments: D.m({
        wire: "inputAttachments",
        shape: D.list(o_InputAttachment),
      }),
      InputSpecification: D.m({
        wire: "inputSpecification",
        shape: o_InputSpecification,
      }),
      LogLevel: D.m({ wire: "logLevel" }),
      Maintenance: D.m({ wire: "maintenance", shape: o_MaintenanceStatus }),
      Name: D.m({ wire: "name" }),
      PipelineDetails: D.m({
        wire: "pipelineDetails",
        shape: D.list(o_PipelineDetail),
      }),
      PipelinesRunningCount: D.m({ wire: "pipelinesRunningCount" }),
      RoleArn: D.m({ wire: "roleArn" }),
      State: D.m({ wire: "state" }),
      Tags: D.m({ wire: "tags" }),
      Vpc: D.m({ wire: "vpc", shape: o_VpcOutputSettingsDescription }),
      AnywhereSettings: D.m({
        wire: "anywhereSettings",
        shape: o_DescribeAnywhereSettings,
      }),
      ChannelEngineVersion: D.m({
        wire: "channelEngineVersion",
        shape: o_ChannelEngineVersionResponse,
      }),
      LinkedChannelSettings: D.m({
        wire: "linkedChannelSettings",
        shape: o_DescribeLinkedChannelSettings,
      }),
      ChannelSecurityGroups: D.m({ wire: "channelSecurityGroups" }),
      InferenceSettings: D.m({
        wire: "inferenceSettings",
        shape: o_DescribeInferenceSettings,
      }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /prod/clusters/{ClusterId}/channelplacementgroups/{ChannelPlacementGroupId}",
    input: { ChannelPlacementGroupId: 0, ClusterId: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      Channels: D.m({ wire: "channels" }),
      ClusterId: D.m({ wire: "clusterId" }),
      Id: D.m({ wire: "id" }),
      Name: D.m({ wire: "name" }),
      Nodes: D.m({ wire: "nodes" }),
      State: D.m({ wire: "state" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /prod/clusters/{ClusterId}",
    input: { ClusterId: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      ChannelIds: D.m({ wire: "channelIds" }),
      ClusterType: D.m({ wire: "clusterType" }),
      Id: D.m({ wire: "id" }),
      InstanceRoleArn: D.m({ wire: "instanceRoleArn" }),
      Name: D.m({ wire: "name" }),
      NetworkSettings: D.m({
        wire: "networkSettings",
        shape: o_ClusterNetworkSettings,
      }),
      State: D.m({ wire: "state" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /prod/inputs/{InputId}",
    input: { InputId: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      AttachedChannels: D.m({ wire: "attachedChannels" }),
      Destinations: D.m({
        wire: "destinations",
        shape: D.list(o_InputDestination),
      }),
      Id: D.m({ wire: "id" }),
      InputClass: D.m({ wire: "inputClass" }),
      InputDevices: D.m({
        wire: "inputDevices",
        shape: D.list(o_InputDeviceSettings),
      }),
      InputPartnerIds: D.m({ wire: "inputPartnerIds" }),
      InputSourceType: D.m({ wire: "inputSourceType" }),
      MediaConnectFlows: D.m({
        wire: "mediaConnectFlows",
        shape: D.list(o_MediaConnectFlow),
      }),
      Name: D.m({ wire: "name" }),
      RoleArn: D.m({ wire: "roleArn" }),
      SecurityGroups: D.m({ wire: "securityGroups" }),
      Sources: D.m({ wire: "sources", shape: D.list(o_InputSource) }),
      State: D.m({ wire: "state" }),
      Tags: D.m({ wire: "tags" }),
      Type: D.m({ wire: "type" }),
      SrtSettings: D.m({ wire: "srtSettings", shape: o_SrtSettings }),
      InputNetworkLocation: D.m({ wire: "inputNetworkLocation" }),
      MulticastSettings: D.m({
        wire: "multicastSettings",
        shape: o_MulticastSettings,
      }),
      Smpte2110ReceiverGroupSettings: D.m({
        wire: "smpte2110ReceiverGroupSettings",
        shape: o_Smpte2110ReceiverGroupSettings,
      }),
      SdiSources: D.m({ wire: "sdiSources" }),
      RouterSettings: D.m({
        wire: "routerSettings",
        shape: o_RouterInputSettings,
      }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /prod/inputDevices/{InputDeviceId}",
    input: { InputDeviceId: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      ConnectionState: D.m({ wire: "connectionState" }),
      DeviceSettingsSyncState: D.m({ wire: "deviceSettingsSyncState" }),
      DeviceUpdateStatus: D.m({ wire: "deviceUpdateStatus" }),
      HdDeviceSettings: D.m({
        wire: "hdDeviceSettings",
        shape: o_InputDeviceHdSettings,
      }),
      Id: D.m({ wire: "id" }),
      MacAddress: D.m({ wire: "macAddress" }),
      Name: D.m({ wire: "name" }),
      NetworkSettings: D.m({
        wire: "networkSettings",
        shape: o_InputDeviceNetworkSettings,
      }),
      SerialNumber: D.m({ wire: "serialNumber" }),
      Type: D.m({ wire: "type" }),
      UhdDeviceSettings: D.m({
        wire: "uhdDeviceSettings",
        shape: o_InputDeviceUhdSettings,
      }),
      Tags: D.m({ wire: "tags" }),
      AvailabilityZone: D.m({ wire: "availabilityZone" }),
      MedialiveInputArns: D.m({ wire: "medialiveInputArns" }),
      OutputType: D.m({ wire: "outputType" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /prod/inputDevices/{InputDeviceId}/thumbnailData",
    input: { InputDeviceId: 0, Accept: D.m({ header: "accept" }) },
    output: {
      Body: D.m({ payload: true, wire: "body", shape: D.stream }),
      ContentType: D.m({ header: "Content-Type" }),
      ContentLength: D.m({ header: "Content-Length", shape: D.num }),
      ETag: D.m({ header: "ETag" }),
      LastModified: D.m({ header: "Last-Modified", shape: D.ts }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /prod/inputSecurityGroups/{InputSecurityGroupId}",
    input: { InputSecurityGroupId: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      Id: D.m({ wire: "id" }),
      Inputs: D.m({ wire: "inputs" }),
      State: D.m({ wire: "state" }),
      Tags: D.m({ wire: "tags" }),
      WhitelistRules: D.m({
        wire: "whitelistRules",
        shape: D.list(o_InputWhitelistRule),
      }),
      Channels: D.m({ wire: "channels" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /prod/multiplexes/{MultiplexId}",
    input: { MultiplexId: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      AvailabilityZones: D.m({ wire: "availabilityZones" }),
      Destinations: D.m({
        wire: "destinations",
        shape: D.list(o_MultiplexOutputDestination),
      }),
      Id: D.m({ wire: "id" }),
      MultiplexSettings: D.m({
        wire: "multiplexSettings",
        shape: o_MultiplexSettings,
      }),
      Name: D.m({ wire: "name" }),
      PipelinesRunningCount: D.m({ wire: "pipelinesRunningCount" }),
      ProgramCount: D.m({ wire: "programCount" }),
      State: D.m({ wire: "state" }),
      Tags: D.m({ wire: "tags" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /prod/multiplexes/{MultiplexId}/programs/{ProgramName}",
    input: { MultiplexId: 0, ProgramName: 0 },
    output: {
      ChannelId: D.m({ wire: "channelId" }),
      MultiplexProgramSettings: D.m({
        wire: "multiplexProgramSettings",
        shape: o_MultiplexProgramSettings,
      }),
      PacketIdentifiersMap: D.m({
        wire: "packetIdentifiersMap",
        shape: o_MultiplexProgramPacketIdentifiersMap,
      }),
      PipelineDetails: D.m({
        wire: "pipelineDetails",
        shape: D.list(o_MultiplexProgramPipelineDetail),
      }),
      ProgramName: D.m({ wire: "programName" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /prod/networks/{NetworkId}",
    input: { NetworkId: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      AssociatedClusterIds: D.m({ wire: "associatedClusterIds" }),
      Id: D.m({ wire: "id" }),
      IpPools: D.m({ wire: "ipPools", shape: D.list(o_IpPool) }),
      Name: D.m({ wire: "name" }),
      Routes: D.m({ wire: "routes", shape: D.list(o_Route) }),
      State: D.m({ wire: "state" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /prod/clusters/{ClusterId}/nodes/{NodeId}",
    input: { ClusterId: 0, NodeId: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      ChannelPlacementGroups: D.m({ wire: "channelPlacementGroups" }),
      ClusterId: D.m({ wire: "clusterId" }),
      ConnectionState: D.m({ wire: "connectionState" }),
      Id: D.m({ wire: "id" }),
      InstanceArn: D.m({ wire: "instanceArn" }),
      Name: D.m({ wire: "name" }),
      NodeInterfaceMappings: D.m({
        wire: "nodeInterfaceMappings",
        shape: D.list(o_NodeInterfaceMapping),
      }),
      Role: D.m({ wire: "role" }),
      State: D.m({ wire: "state" }),
      SdiSourceMappings: D.m({
        wire: "sdiSourceMappings",
        shape: D.list(o_SdiSourceMapping),
      }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /prod/offerings/{OfferingId}",
    input: { OfferingId: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      CurrencyCode: D.m({ wire: "currencyCode" }),
      Duration: D.m({ wire: "duration" }),
      DurationUnits: D.m({ wire: "durationUnits" }),
      FixedPrice: D.m({ wire: "fixedPrice" }),
      OfferingDescription: D.m({ wire: "offeringDescription" }),
      OfferingId: D.m({ wire: "offeringId" }),
      OfferingType: D.m({ wire: "offeringType" }),
      Region: D.m({ wire: "region" }),
      ResourceSpecification: D.m({
        wire: "resourceSpecification",
        shape: o_ReservationResourceSpecification,
      }),
      UsagePrice: D.m({ wire: "usagePrice" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /prod/reservations/{ReservationId}",
    input: { ReservationId: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      Count: D.m({ wire: "count" }),
      CurrencyCode: D.m({ wire: "currencyCode" }),
      Duration: D.m({ wire: "duration" }),
      DurationUnits: D.m({ wire: "durationUnits" }),
      End: D.m({ wire: "end" }),
      FixedPrice: D.m({ wire: "fixedPrice" }),
      Name: D.m({ wire: "name" }),
      OfferingDescription: D.m({ wire: "offeringDescription" }),
      OfferingId: D.m({ wire: "offeringId" }),
      OfferingType: D.m({ wire: "offeringType" }),
      Region: D.m({ wire: "region" }),
      RenewalSettings: D.m({
        wire: "renewalSettings",
        shape: o_RenewalSettings,
      }),
      ReservationId: D.m({ wire: "reservationId" }),
      ResourceSpecification: D.m({
        wire: "resourceSpecification",
        shape: o_ReservationResourceSpecification,
      }),
      Start: D.m({ wire: "start" }),
      State: D.m({ wire: "state" }),
      Tags: D.m({ wire: "tags" }),
      UsagePrice: D.m({ wire: "usagePrice" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /prod/channels/{ChannelId}/schedule",
    input: {
      ChannelId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      NextToken: D.m({ wire: "nextToken" }),
      ScheduleActions: D.m({
        wire: "scheduleActions",
        shape: D.list(o_ScheduleAction),
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /prod/sdiSources/{SdiSourceId}",
    input: { SdiSourceId: 0 },
    output: { SdiSource: D.m({ wire: "sdiSource", shape: o_SdiSource }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /prod/channels/{ChannelId}/thumbnails",
    input: {
      ChannelId: 0,
      PipelineId: D.m({ query: "pipelineId" }),
      ThumbnailType: D.m({ query: "thumbnailType" }),
    },
    output: {
      ThumbnailDetails: D.m({
        wire: "thumbnailDetails",
        shape: D.list({
          PipelineId: D.m({ wire: "pipelineId" }),
          Thumbnails: D.m({
            wire: "thumbnails",
            shape: D.list({
              Body: D.m({ wire: "body" }),
              ContentType: D.m({ wire: "contentType" }),
              ThumbnailType: D.m({ wire: "thumbnailType" }),
              TimeStamp: D.m({ wire: "timeStamp", shape: D.ts }),
            }),
          }),
        }),
      }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /prod/cloudwatch-alarm-templates/{Identifier}",
    input: { Identifier: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      ComparisonOperator: D.m({ wire: "comparisonOperator" }),
      CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
      DatapointsToAlarm: D.m({ wire: "datapointsToAlarm" }),
      Description: D.m({ wire: "description" }),
      EvaluationPeriods: D.m({ wire: "evaluationPeriods" }),
      GroupId: D.m({ wire: "groupId" }),
      Id: D.m({ wire: "id" }),
      MetricName: D.m({ wire: "metricName" }),
      ModifiedAt: D.m({ wire: "modifiedAt", shape: D.ts }),
      Name: D.m({ wire: "name" }),
      Period: D.m({ wire: "period" }),
      Statistic: D.m({ wire: "statistic" }),
      Tags: D.m({ wire: "tags" }),
      TargetResourceType: D.m({ wire: "targetResourceType" }),
      Threshold: D.m({ wire: "threshold" }),
      TreatMissingData: D.m({ wire: "treatMissingData" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /prod/cloudwatch-alarm-template-groups/{Identifier}",
    input: { Identifier: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
      Description: D.m({ wire: "description" }),
      Id: D.m({ wire: "id" }),
      ModifiedAt: D.m({ wire: "modifiedAt", shape: D.ts }),
      Name: D.m({ wire: "name" }),
      Tags: D.m({ wire: "tags" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /prod/eventbridge-rule-templates/{Identifier}",
    input: { Identifier: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
      Description: D.m({ wire: "description" }),
      EventTargets: D.m({
        wire: "eventTargets",
        shape: D.list(o_EventBridgeRuleTemplateTarget),
      }),
      EventType: D.m({ wire: "eventType" }),
      GroupId: D.m({ wire: "groupId" }),
      Id: D.m({ wire: "id" }),
      ModifiedAt: D.m({ wire: "modifiedAt", shape: D.ts }),
      Name: D.m({ wire: "name" }),
      Tags: D.m({ wire: "tags" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /prod/eventbridge-rule-template-groups/{Identifier}",
    input: { Identifier: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
      Description: D.m({ wire: "description" }),
      Id: D.m({ wire: "id" }),
      ModifiedAt: D.m({ wire: "modifiedAt", shape: D.ts }),
      Name: D.m({ wire: "name" }),
      Tags: D.m({ wire: "tags" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /prod/signal-maps/{Identifier}",
    input: { Identifier: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      CloudWatchAlarmTemplateGroupIds: D.m({
        wire: "cloudWatchAlarmTemplateGroupIds",
      }),
      CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
      Description: D.m({ wire: "description" }),
      DiscoveryEntryPointArn: D.m({ wire: "discoveryEntryPointArn" }),
      ErrorMessage: D.m({ wire: "errorMessage" }),
      EventBridgeRuleTemplateGroupIds: D.m({
        wire: "eventBridgeRuleTemplateGroupIds",
      }),
      FailedMediaResourceMap: D.m({
        wire: "failedMediaResourceMap",
        shape: D.map(o_MediaResource),
      }),
      Id: D.m({ wire: "id" }),
      LastDiscoveredAt: D.m({ wire: "lastDiscoveredAt", shape: D.ts }),
      LastSuccessfulMonitorDeployment: D.m({
        wire: "lastSuccessfulMonitorDeployment",
        shape: o_SuccessfulMonitorDeployment,
      }),
      MediaResourceMap: D.m({
        wire: "mediaResourceMap",
        shape: D.map(o_MediaResource),
      }),
      ModifiedAt: D.m({ wire: "modifiedAt", shape: D.ts }),
      MonitorChangesPendingDeployment: D.m({
        wire: "monitorChangesPendingDeployment",
      }),
      MonitorDeployment: D.m({
        wire: "monitorDeployment",
        shape: o_MonitorDeployment,
      }),
      Name: D.m({ wire: "name" }),
      Status: D.m({ wire: "status" }),
      Tags: D.m({ wire: "tags" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /prod/channels/{ChannelId}/alerts",
    input: {
      ChannelId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      StateFilter: D.m({ query: "stateFilter" }),
    },
    output: {
      Alerts: D.m({
        wire: "alerts",
        shape: D.list({
          AlertType: D.m({ wire: "alertType" }),
          ClearedTimestamp: D.m({ wire: "clearedTimestamp", shape: D.ts }),
          Id: D.m({ wire: "id" }),
          Message: D.m({ wire: "message" }),
          PipelineId: D.m({ wire: "pipelineId" }),
          SetTimestamp: D.m({ wire: "setTimestamp", shape: D.ts }),
          State: D.m({ wire: "state" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /prod/clusters/{ClusterId}/channelplacementgroups",
    input: {
      ClusterId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      ChannelPlacementGroups: D.m({
        wire: "channelPlacementGroups",
        shape: D.list({
          Arn: D.m({ wire: "arn" }),
          Channels: D.m({ wire: "channels" }),
          ClusterId: D.m({ wire: "clusterId" }),
          Id: D.m({ wire: "id" }),
          Name: D.m({ wire: "name" }),
          Nodes: D.m({ wire: "nodes" }),
          State: D.m({ wire: "state" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /prod/channels",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Channels: D.m({
        wire: "channels",
        shape: D.list({
          Arn: D.m({ wire: "arn" }),
          CdiInputSpecification: D.m({
            wire: "cdiInputSpecification",
            shape: o_CdiInputSpecification,
          }),
          ChannelClass: D.m({ wire: "channelClass" }),
          Destinations: D.m({
            wire: "destinations",
            shape: D.list(o_OutputDestination),
          }),
          EgressEndpoints: D.m({
            wire: "egressEndpoints",
            shape: D.list(o_ChannelEgressEndpoint),
          }),
          Id: D.m({ wire: "id" }),
          InputAttachments: D.m({
            wire: "inputAttachments",
            shape: D.list(o_InputAttachment),
          }),
          InputSpecification: D.m({
            wire: "inputSpecification",
            shape: o_InputSpecification,
          }),
          LogLevel: D.m({ wire: "logLevel" }),
          Maintenance: D.m({ wire: "maintenance", shape: o_MaintenanceStatus }),
          Name: D.m({ wire: "name" }),
          PipelinesRunningCount: D.m({ wire: "pipelinesRunningCount" }),
          RoleArn: D.m({ wire: "roleArn" }),
          State: D.m({ wire: "state" }),
          Tags: D.m({ wire: "tags" }),
          Vpc: D.m({ wire: "vpc", shape: o_VpcOutputSettingsDescription }),
          AnywhereSettings: D.m({
            wire: "anywhereSettings",
            shape: o_DescribeAnywhereSettings,
          }),
          ChannelEngineVersion: D.m({
            wire: "channelEngineVersion",
            shape: o_ChannelEngineVersionResponse,
          }),
          UsedChannelEngineVersions: D.m({
            wire: "usedChannelEngineVersions",
            shape: D.list(o_ChannelEngineVersionResponse),
          }),
          LinkedChannelSettings: D.m({
            wire: "linkedChannelSettings",
            shape: o_DescribeLinkedChannelSettings,
          }),
          ChannelSecurityGroups: D.m({ wire: "channelSecurityGroups" }),
          InferenceSettings: D.m({
            wire: "inferenceSettings",
            shape: o_DescribeInferenceSettings,
          }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /prod/cloudwatch-alarm-template-groups",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      Scope: D.m({ query: "scope" }),
      SignalMapIdentifier: D.m({ query: "signalMapIdentifier" }),
    },
    output: {
      CloudWatchAlarmTemplateGroups: D.m({
        wire: "cloudWatchAlarmTemplateGroups",
        shape: D.list({
          Arn: D.m({ wire: "arn" }),
          CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
          Description: D.m({ wire: "description" }),
          Id: D.m({ wire: "id" }),
          ModifiedAt: D.m({ wire: "modifiedAt", shape: D.ts }),
          Name: D.m({ wire: "name" }),
          Tags: D.m({ wire: "tags" }),
          TemplateCount: D.m({ wire: "templateCount" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /prod/cloudwatch-alarm-templates",
    input: {
      GroupIdentifier: D.m({ query: "groupIdentifier" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      Scope: D.m({ query: "scope" }),
      SignalMapIdentifier: D.m({ query: "signalMapIdentifier" }),
    },
    output: {
      CloudWatchAlarmTemplates: D.m({
        wire: "cloudWatchAlarmTemplates",
        shape: D.list({
          Arn: D.m({ wire: "arn" }),
          ComparisonOperator: D.m({ wire: "comparisonOperator" }),
          CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
          DatapointsToAlarm: D.m({ wire: "datapointsToAlarm" }),
          Description: D.m({ wire: "description" }),
          EvaluationPeriods: D.m({ wire: "evaluationPeriods" }),
          GroupId: D.m({ wire: "groupId" }),
          Id: D.m({ wire: "id" }),
          MetricName: D.m({ wire: "metricName" }),
          ModifiedAt: D.m({ wire: "modifiedAt", shape: D.ts }),
          Name: D.m({ wire: "name" }),
          Period: D.m({ wire: "period" }),
          Statistic: D.m({ wire: "statistic" }),
          Tags: D.m({ wire: "tags" }),
          TargetResourceType: D.m({ wire: "targetResourceType" }),
          Threshold: D.m({ wire: "threshold" }),
          TreatMissingData: D.m({ wire: "treatMissingData" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /prod/clusters/{ClusterId}/alerts",
    input: {
      ClusterId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      StateFilter: D.m({ query: "stateFilter" }),
    },
    output: {
      Alerts: D.m({
        wire: "alerts",
        shape: D.list({
          AlertType: D.m({ wire: "alertType" }),
          ChannelId: D.m({ wire: "channelId" }),
          ClearedTimestamp: D.m({ wire: "clearedTimestamp", shape: D.ts }),
          Id: D.m({ wire: "id" }),
          Message: D.m({ wire: "message" }),
          NodeId: D.m({ wire: "nodeId" }),
          SetTimestamp: D.m({ wire: "setTimestamp", shape: D.ts }),
          State: D.m({ wire: "state" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /prod/clusters",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Clusters: D.m({
        wire: "clusters",
        shape: D.list({
          Arn: D.m({ wire: "arn" }),
          ChannelIds: D.m({ wire: "channelIds" }),
          ClusterType: D.m({ wire: "clusterType" }),
          Id: D.m({ wire: "id" }),
          InstanceRoleArn: D.m({ wire: "instanceRoleArn" }),
          Name: D.m({ wire: "name" }),
          NetworkSettings: D.m({
            wire: "networkSettings",
            shape: o_ClusterNetworkSettings,
          }),
          State: D.m({ wire: "state" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /prod/eventbridge-rule-template-groups",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      SignalMapIdentifier: D.m({ query: "signalMapIdentifier" }),
    },
    output: {
      EventBridgeRuleTemplateGroups: D.m({
        wire: "eventBridgeRuleTemplateGroups",
        shape: D.list({
          Arn: D.m({ wire: "arn" }),
          CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
          Description: D.m({ wire: "description" }),
          Id: D.m({ wire: "id" }),
          ModifiedAt: D.m({ wire: "modifiedAt", shape: D.ts }),
          Name: D.m({ wire: "name" }),
          Tags: D.m({ wire: "tags" }),
          TemplateCount: D.m({ wire: "templateCount" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /prod/eventbridge-rule-templates",
    input: {
      GroupIdentifier: D.m({ query: "groupIdentifier" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      SignalMapIdentifier: D.m({ query: "signalMapIdentifier" }),
    },
    output: {
      EventBridgeRuleTemplates: D.m({
        wire: "eventBridgeRuleTemplates",
        shape: D.list({
          Arn: D.m({ wire: "arn" }),
          CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
          Description: D.m({ wire: "description" }),
          EventTargetCount: D.m({ wire: "eventTargetCount" }),
          EventType: D.m({ wire: "eventType" }),
          GroupId: D.m({ wire: "groupId" }),
          Id: D.m({ wire: "id" }),
          ModifiedAt: D.m({ wire: "modifiedAt", shape: D.ts }),
          Name: D.m({ wire: "name" }),
          Tags: D.m({ wire: "tags" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /prod/inputDevices",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      InputDevices: D.m({
        wire: "inputDevices",
        shape: D.list({
          Arn: D.m({ wire: "arn" }),
          ConnectionState: D.m({ wire: "connectionState" }),
          DeviceSettingsSyncState: D.m({ wire: "deviceSettingsSyncState" }),
          DeviceUpdateStatus: D.m({ wire: "deviceUpdateStatus" }),
          HdDeviceSettings: D.m({
            wire: "hdDeviceSettings",
            shape: o_InputDeviceHdSettings,
          }),
          Id: D.m({ wire: "id" }),
          MacAddress: D.m({ wire: "macAddress" }),
          Name: D.m({ wire: "name" }),
          NetworkSettings: D.m({
            wire: "networkSettings",
            shape: o_InputDeviceNetworkSettings,
          }),
          SerialNumber: D.m({ wire: "serialNumber" }),
          Type: D.m({ wire: "type" }),
          UhdDeviceSettings: D.m({
            wire: "uhdDeviceSettings",
            shape: o_InputDeviceUhdSettings,
          }),
          Tags: D.m({ wire: "tags" }),
          AvailabilityZone: D.m({ wire: "availabilityZone" }),
          MedialiveInputArns: D.m({ wire: "medialiveInputArns" }),
          OutputType: D.m({ wire: "outputType" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /prod/inputDeviceTransfers",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      TransferType: D.m({ query: "transferType" }),
    },
    output: {
      InputDeviceTransfers: D.m({
        wire: "inputDeviceTransfers",
        shape: D.list({
          Id: D.m({ wire: "id" }),
          Message: D.m({ wire: "message" }),
          TargetCustomerId: D.m({ wire: "targetCustomerId" }),
          TransferType: D.m({ wire: "transferType" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /prod/inputs",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Inputs: D.m({ wire: "inputs", shape: D.list(o_Input) }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /prod/inputSecurityGroups",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      InputSecurityGroups: D.m({
        wire: "inputSecurityGroups",
        shape: D.list(o_InputSecurityGroup),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /prod/multiplexes/{MultiplexId}/alerts",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      MultiplexId: 0,
      NextToken: D.m({ query: "nextToken" }),
      StateFilter: D.m({ query: "stateFilter" }),
    },
    output: {
      Alerts: D.m({
        wire: "alerts",
        shape: D.list({
          AlertType: D.m({ wire: "alertType" }),
          ClearedTimestamp: D.m({ wire: "clearedTimestamp", shape: D.ts }),
          Id: D.m({ wire: "id" }),
          Message: D.m({ wire: "message" }),
          PipelineId: D.m({ wire: "pipelineId" }),
          SetTimestamp: D.m({ wire: "setTimestamp", shape: D.ts }),
          State: D.m({ wire: "state" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /prod/multiplexes",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Multiplexes: D.m({
        wire: "multiplexes",
        shape: D.list({
          Arn: D.m({ wire: "arn" }),
          AvailabilityZones: D.m({ wire: "availabilityZones" }),
          Id: D.m({ wire: "id" }),
          MultiplexSettings: D.m({
            wire: "multiplexSettings",
            shape: {
              TransportStreamBitrate: D.m({ wire: "transportStreamBitrate" }),
            },
          }),
          Name: D.m({ wire: "name" }),
          PipelinesRunningCount: D.m({ wire: "pipelinesRunningCount" }),
          ProgramCount: D.m({ wire: "programCount" }),
          State: D.m({ wire: "state" }),
          Tags: D.m({ wire: "tags" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /prod/multiplexes/{MultiplexId}/programs",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      MultiplexId: 0,
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      MultiplexPrograms: D.m({
        wire: "multiplexPrograms",
        shape: D.list({
          ChannelId: D.m({ wire: "channelId" }),
          ProgramName: D.m({ wire: "programName" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /prod/networks",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Networks: D.m({
        wire: "networks",
        shape: D.list({
          Arn: D.m({ wire: "arn" }),
          AssociatedClusterIds: D.m({ wire: "associatedClusterIds" }),
          Id: D.m({ wire: "id" }),
          IpPools: D.m({ wire: "ipPools", shape: D.list(o_IpPool) }),
          Name: D.m({ wire: "name" }),
          Routes: D.m({ wire: "routes", shape: D.list(o_Route) }),
          State: D.m({ wire: "state" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /prod/clusters/{ClusterId}/nodes",
    input: {
      ClusterId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      NextToken: D.m({ wire: "nextToken" }),
      Nodes: D.m({
        wire: "nodes",
        shape: D.list({
          Arn: D.m({ wire: "arn" }),
          ChannelPlacementGroups: D.m({ wire: "channelPlacementGroups" }),
          ClusterId: D.m({ wire: "clusterId" }),
          ConnectionState: D.m({ wire: "connectionState" }),
          Id: D.m({ wire: "id" }),
          InstanceArn: D.m({ wire: "instanceArn" }),
          ManagedInstanceId: D.m({ wire: "managedInstanceId" }),
          Name: D.m({ wire: "name" }),
          NodeInterfaceMappings: D.m({
            wire: "nodeInterfaceMappings",
            shape: D.list(o_NodeInterfaceMapping),
          }),
          Role: D.m({ wire: "role" }),
          State: D.m({ wire: "state" }),
          SdiSourceMappings: D.m({
            wire: "sdiSourceMappings",
            shape: D.list(o_SdiSourceMapping),
          }),
        }),
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /prod/offerings",
    input: {
      ChannelClass: D.m({ query: "channelClass" }),
      ChannelConfiguration: D.m({ query: "channelConfiguration" }),
      Codec: D.m({ query: "codec" }),
      Duration: D.m({ query: "duration" }),
      MaxResults: D.m({ query: "maxResults" }),
      MaximumBitrate: D.m({ query: "maximumBitrate" }),
      MaximumFramerate: D.m({ query: "maximumFramerate" }),
      NextToken: D.m({ query: "nextToken" }),
      Resolution: D.m({ query: "resolution" }),
      ResourceType: D.m({ query: "resourceType" }),
      SpecialFeature: D.m({ query: "specialFeature" }),
      VideoQuality: D.m({ query: "videoQuality" }),
    },
    output: {
      NextToken: D.m({ wire: "nextToken" }),
      Offerings: D.m({
        wire: "offerings",
        shape: D.list({
          Arn: D.m({ wire: "arn" }),
          CurrencyCode: D.m({ wire: "currencyCode" }),
          Duration: D.m({ wire: "duration" }),
          DurationUnits: D.m({ wire: "durationUnits" }),
          FixedPrice: D.m({ wire: "fixedPrice" }),
          OfferingDescription: D.m({ wire: "offeringDescription" }),
          OfferingId: D.m({ wire: "offeringId" }),
          OfferingType: D.m({ wire: "offeringType" }),
          Region: D.m({ wire: "region" }),
          ResourceSpecification: D.m({
            wire: "resourceSpecification",
            shape: o_ReservationResourceSpecification,
          }),
          UsagePrice: D.m({ wire: "usagePrice" }),
        }),
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /prod/reservations",
    input: {
      ChannelClass: D.m({ query: "channelClass" }),
      Codec: D.m({ query: "codec" }),
      MaxResults: D.m({ query: "maxResults" }),
      MaximumBitrate: D.m({ query: "maximumBitrate" }),
      MaximumFramerate: D.m({ query: "maximumFramerate" }),
      NextToken: D.m({ query: "nextToken" }),
      Resolution: D.m({ query: "resolution" }),
      ResourceType: D.m({ query: "resourceType" }),
      SpecialFeature: D.m({ query: "specialFeature" }),
      VideoQuality: D.m({ query: "videoQuality" }),
    },
    output: {
      NextToken: D.m({ wire: "nextToken" }),
      Reservations: D.m({ wire: "reservations", shape: D.list(o_Reservation) }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /prod/sdiSources",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      NextToken: D.m({ wire: "nextToken" }),
      SdiSources: D.m({
        wire: "sdiSources",
        shape: D.list({
          Arn: D.m({ wire: "arn" }),
          Id: D.m({ wire: "id" }),
          Inputs: D.m({ wire: "inputs" }),
          Mode: D.m({ wire: "mode" }),
          Name: D.m({ wire: "name" }),
          State: D.m({ wire: "state" }),
          Type: D.m({ wire: "type" }),
        }),
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /prod/signal-maps",
    input: {
      CloudWatchAlarmTemplateGroupIdentifier: D.m({
        query: "cloudWatchAlarmTemplateGroupIdentifier",
      }),
      EventBridgeRuleTemplateGroupIdentifier: D.m({
        query: "eventBridgeRuleTemplateGroupIdentifier",
      }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      NextToken: D.m({ wire: "nextToken" }),
      SignalMaps: D.m({
        wire: "signalMaps",
        shape: D.list({
          Arn: D.m({ wire: "arn" }),
          CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
          Description: D.m({ wire: "description" }),
          Id: D.m({ wire: "id" }),
          ModifiedAt: D.m({ wire: "modifiedAt", shape: D.ts }),
          MonitorDeploymentStatus: D.m({ wire: "monitorDeploymentStatus" }),
          Name: D.m({ wire: "name" }),
          Status: D.m({ wire: "status" }),
          Tags: D.m({ wire: "tags" }),
        }),
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /prod/tags/{ResourceArn}",
    input: { ResourceArn: 0 },
    output: { Tags: D.m({ wire: "tags" }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /prod/versions",
    input: {},
    output: {
      Versions: D.m({
        wire: "versions",
        shape: D.list(o_ChannelEngineVersionResponse),
      }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/offerings/{OfferingId}/purchase",
    input: {
      Count: D.m({ wire: "count" }),
      Name: D.m({ wire: "name" }),
      OfferingId: 0,
      RenewalSettings: D.m({
        wire: "renewalSettings",
        shape: i_RenewalSettings,
      }),
      RequestId: D.m({ idempotency: true, wire: "requestId" }),
      Start: D.m({ wire: "start" }),
      Tags: D.m({ wire: "tags" }),
    },
    output: { Reservation: D.m({ wire: "reservation", shape: o_Reservation }) },
    body: true,
  },
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
})) as any;

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
 * Send a reboot command to the specified input device. The device will begin rebooting within a few seconds of sending the command. When the reboot is complete, the device’s connection status will change to connected.
 */
export const rebootInputDevice: API.OperationMethod<
  RebootInputDeviceRequest,
  RebootInputDeviceResponse,
  RebootInputDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /prod/inputDevices/{InputDeviceId}/reboot",
    input: { Force: D.m({ wire: "force" }), InputDeviceId: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/inputDevices/{InputDeviceId}/reject",
    input: { InputDeviceId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/channels/{ChannelId}/restartChannelPipelines",
    input: { ChannelId: 0, PipelineIds: D.m({ wire: "pipelineIds" }) },
    output: {
      Arn: D.m({ wire: "arn" }),
      CdiInputSpecification: D.m({
        wire: "cdiInputSpecification",
        shape: o_CdiInputSpecification,
      }),
      ChannelClass: D.m({ wire: "channelClass" }),
      Destinations: D.m({
        wire: "destinations",
        shape: D.list(o_OutputDestination),
      }),
      EgressEndpoints: D.m({
        wire: "egressEndpoints",
        shape: D.list(o_ChannelEgressEndpoint),
      }),
      EncoderSettings: D.m({
        wire: "encoderSettings",
        shape: o_EncoderSettings,
      }),
      Id: D.m({ wire: "id" }),
      InputAttachments: D.m({
        wire: "inputAttachments",
        shape: D.list(o_InputAttachment),
      }),
      InputSpecification: D.m({
        wire: "inputSpecification",
        shape: o_InputSpecification,
      }),
      LogLevel: D.m({ wire: "logLevel" }),
      Maintenance: D.m({ wire: "maintenance", shape: o_MaintenanceStatus }),
      MaintenanceStatus: D.m({ wire: "maintenanceStatus" }),
      Name: D.m({ wire: "name" }),
      PipelineDetails: D.m({
        wire: "pipelineDetails",
        shape: D.list(o_PipelineDetail),
      }),
      PipelinesRunningCount: D.m({ wire: "pipelinesRunningCount" }),
      RoleArn: D.m({ wire: "roleArn" }),
      State: D.m({ wire: "state" }),
      Tags: D.m({ wire: "tags" }),
      Vpc: D.m({ wire: "vpc", shape: o_VpcOutputSettingsDescription }),
      AnywhereSettings: D.m({
        wire: "anywhereSettings",
        shape: o_DescribeAnywhereSettings,
      }),
      ChannelEngineVersion: D.m({
        wire: "channelEngineVersion",
        shape: o_ChannelEngineVersionResponse,
      }),
      LinkedChannelSettings: D.m({
        wire: "linkedChannelSettings",
        shape: o_DescribeLinkedChannelSettings,
      }),
      ChannelSecurityGroups: D.m({ wire: "channelSecurityGroups" }),
      InferenceSettings: D.m({
        wire: "inferenceSettings",
        shape: o_DescribeInferenceSettings,
      }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/channels/{ChannelId}/start",
    input: { ChannelId: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      CdiInputSpecification: D.m({
        wire: "cdiInputSpecification",
        shape: o_CdiInputSpecification,
      }),
      ChannelClass: D.m({ wire: "channelClass" }),
      Destinations: D.m({
        wire: "destinations",
        shape: D.list(o_OutputDestination),
      }),
      EgressEndpoints: D.m({
        wire: "egressEndpoints",
        shape: D.list(o_ChannelEgressEndpoint),
      }),
      EncoderSettings: D.m({
        wire: "encoderSettings",
        shape: o_EncoderSettings,
      }),
      Id: D.m({ wire: "id" }),
      InputAttachments: D.m({
        wire: "inputAttachments",
        shape: D.list(o_InputAttachment),
      }),
      InputSpecification: D.m({
        wire: "inputSpecification",
        shape: o_InputSpecification,
      }),
      LogLevel: D.m({ wire: "logLevel" }),
      Maintenance: D.m({ wire: "maintenance", shape: o_MaintenanceStatus }),
      Name: D.m({ wire: "name" }),
      PipelineDetails: D.m({
        wire: "pipelineDetails",
        shape: D.list(o_PipelineDetail),
      }),
      PipelinesRunningCount: D.m({ wire: "pipelinesRunningCount" }),
      RoleArn: D.m({ wire: "roleArn" }),
      State: D.m({ wire: "state" }),
      Tags: D.m({ wire: "tags" }),
      Vpc: D.m({ wire: "vpc", shape: o_VpcOutputSettingsDescription }),
      AnywhereSettings: D.m({
        wire: "anywhereSettings",
        shape: o_DescribeAnywhereSettings,
      }),
      ChannelEngineVersion: D.m({
        wire: "channelEngineVersion",
        shape: o_ChannelEngineVersionResponse,
      }),
      LinkedChannelSettings: D.m({
        wire: "linkedChannelSettings",
        shape: o_DescribeLinkedChannelSettings,
      }),
      ChannelSecurityGroups: D.m({ wire: "channelSecurityGroups" }),
      InferenceSettings: D.m({
        wire: "inferenceSettings",
        shape: o_DescribeInferenceSettings,
      }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /prod/signal-maps/{Identifier}/monitor-deployment",
    input: { Identifier: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      CloudWatchAlarmTemplateGroupIds: D.m({
        wire: "cloudWatchAlarmTemplateGroupIds",
      }),
      CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
      Description: D.m({ wire: "description" }),
      DiscoveryEntryPointArn: D.m({ wire: "discoveryEntryPointArn" }),
      ErrorMessage: D.m({ wire: "errorMessage" }),
      EventBridgeRuleTemplateGroupIds: D.m({
        wire: "eventBridgeRuleTemplateGroupIds",
      }),
      FailedMediaResourceMap: D.m({
        wire: "failedMediaResourceMap",
        shape: D.map(o_MediaResource),
      }),
      Id: D.m({ wire: "id" }),
      LastDiscoveredAt: D.m({ wire: "lastDiscoveredAt", shape: D.ts }),
      LastSuccessfulMonitorDeployment: D.m({
        wire: "lastSuccessfulMonitorDeployment",
        shape: o_SuccessfulMonitorDeployment,
      }),
      MediaResourceMap: D.m({
        wire: "mediaResourceMap",
        shape: D.map(o_MediaResource),
      }),
      ModifiedAt: D.m({ wire: "modifiedAt", shape: D.ts }),
      MonitorChangesPendingDeployment: D.m({
        wire: "monitorChangesPendingDeployment",
      }),
      MonitorDeployment: D.m({
        wire: "monitorDeployment",
        shape: o_MonitorDeployment,
      }),
      Name: D.m({ wire: "name" }),
      Status: D.m({ wire: "status" }),
      Tags: D.m({ wire: "tags" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/inputDevices/{InputDeviceId}/start",
    input: { InputDeviceId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/inputDevices/{InputDeviceId}/startInputDeviceMaintenanceWindow",
    input: { InputDeviceId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/signal-maps/{Identifier}/monitor-deployment",
    input: { DryRun: D.m({ wire: "dryRun" }), Identifier: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      CloudWatchAlarmTemplateGroupIds: D.m({
        wire: "cloudWatchAlarmTemplateGroupIds",
      }),
      CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
      Description: D.m({ wire: "description" }),
      DiscoveryEntryPointArn: D.m({ wire: "discoveryEntryPointArn" }),
      ErrorMessage: D.m({ wire: "errorMessage" }),
      EventBridgeRuleTemplateGroupIds: D.m({
        wire: "eventBridgeRuleTemplateGroupIds",
      }),
      FailedMediaResourceMap: D.m({
        wire: "failedMediaResourceMap",
        shape: D.map(o_MediaResource),
      }),
      Id: D.m({ wire: "id" }),
      LastDiscoveredAt: D.m({ wire: "lastDiscoveredAt", shape: D.ts }),
      LastSuccessfulMonitorDeployment: D.m({
        wire: "lastSuccessfulMonitorDeployment",
        shape: o_SuccessfulMonitorDeployment,
      }),
      MediaResourceMap: D.m({
        wire: "mediaResourceMap",
        shape: D.map(o_MediaResource),
      }),
      ModifiedAt: D.m({ wire: "modifiedAt", shape: D.ts }),
      MonitorChangesPendingDeployment: D.m({
        wire: "monitorChangesPendingDeployment",
      }),
      MonitorDeployment: D.m({
        wire: "monitorDeployment",
        shape: o_MonitorDeployment,
      }),
      Name: D.m({ wire: "name" }),
      Status: D.m({ wire: "status" }),
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/multiplexes/{MultiplexId}/start",
    input: { MultiplexId: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      AvailabilityZones: D.m({ wire: "availabilityZones" }),
      Destinations: D.m({
        wire: "destinations",
        shape: D.list(o_MultiplexOutputDestination),
      }),
      Id: D.m({ wire: "id" }),
      MultiplexSettings: D.m({
        wire: "multiplexSettings",
        shape: o_MultiplexSettings,
      }),
      Name: D.m({ wire: "name" }),
      PipelinesRunningCount: D.m({ wire: "pipelinesRunningCount" }),
      ProgramCount: D.m({ wire: "programCount" }),
      State: D.m({ wire: "state" }),
      Tags: D.m({ wire: "tags" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /prod/signal-maps/{Identifier}",
    input: {
      CloudWatchAlarmTemplateGroupIdentifiers: D.m({
        wire: "cloudWatchAlarmTemplateGroupIdentifiers",
      }),
      Description: D.m({ wire: "description" }),
      DiscoveryEntryPointArn: D.m({ wire: "discoveryEntryPointArn" }),
      EventBridgeRuleTemplateGroupIdentifiers: D.m({
        wire: "eventBridgeRuleTemplateGroupIdentifiers",
      }),
      ForceRediscovery: D.m({ wire: "forceRediscovery" }),
      Identifier: 0,
      Name: D.m({ wire: "name" }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      CloudWatchAlarmTemplateGroupIds: D.m({
        wire: "cloudWatchAlarmTemplateGroupIds",
      }),
      CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
      Description: D.m({ wire: "description" }),
      DiscoveryEntryPointArn: D.m({ wire: "discoveryEntryPointArn" }),
      ErrorMessage: D.m({ wire: "errorMessage" }),
      EventBridgeRuleTemplateGroupIds: D.m({
        wire: "eventBridgeRuleTemplateGroupIds",
      }),
      FailedMediaResourceMap: D.m({
        wire: "failedMediaResourceMap",
        shape: D.map(o_MediaResource),
      }),
      Id: D.m({ wire: "id" }),
      LastDiscoveredAt: D.m({ wire: "lastDiscoveredAt", shape: D.ts }),
      LastSuccessfulMonitorDeployment: D.m({
        wire: "lastSuccessfulMonitorDeployment",
        shape: o_SuccessfulMonitorDeployment,
      }),
      MediaResourceMap: D.m({
        wire: "mediaResourceMap",
        shape: D.map(o_MediaResource),
      }),
      ModifiedAt: D.m({ wire: "modifiedAt", shape: D.ts }),
      MonitorChangesPendingDeployment: D.m({
        wire: "monitorChangesPendingDeployment",
      }),
      MonitorDeployment: D.m({
        wire: "monitorDeployment",
        shape: o_MonitorDeployment,
      }),
      Name: D.m({ wire: "name" }),
      Status: D.m({ wire: "status" }),
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/channels/{ChannelId}/stop",
    input: { ChannelId: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      CdiInputSpecification: D.m({
        wire: "cdiInputSpecification",
        shape: o_CdiInputSpecification,
      }),
      ChannelClass: D.m({ wire: "channelClass" }),
      Destinations: D.m({
        wire: "destinations",
        shape: D.list(o_OutputDestination),
      }),
      EgressEndpoints: D.m({
        wire: "egressEndpoints",
        shape: D.list(o_ChannelEgressEndpoint),
      }),
      EncoderSettings: D.m({
        wire: "encoderSettings",
        shape: o_EncoderSettings,
      }),
      Id: D.m({ wire: "id" }),
      InputAttachments: D.m({
        wire: "inputAttachments",
        shape: D.list(o_InputAttachment),
      }),
      InputSpecification: D.m({
        wire: "inputSpecification",
        shape: o_InputSpecification,
      }),
      LogLevel: D.m({ wire: "logLevel" }),
      Maintenance: D.m({ wire: "maintenance", shape: o_MaintenanceStatus }),
      Name: D.m({ wire: "name" }),
      PipelineDetails: D.m({
        wire: "pipelineDetails",
        shape: D.list(o_PipelineDetail),
      }),
      PipelinesRunningCount: D.m({ wire: "pipelinesRunningCount" }),
      RoleArn: D.m({ wire: "roleArn" }),
      State: D.m({ wire: "state" }),
      Tags: D.m({ wire: "tags" }),
      Vpc: D.m({ wire: "vpc", shape: o_VpcOutputSettingsDescription }),
      AnywhereSettings: D.m({
        wire: "anywhereSettings",
        shape: o_DescribeAnywhereSettings,
      }),
      ChannelEngineVersion: D.m({
        wire: "channelEngineVersion",
        shape: o_ChannelEngineVersionResponse,
      }),
      LinkedChannelSettings: D.m({
        wire: "linkedChannelSettings",
        shape: o_DescribeLinkedChannelSettings,
      }),
      ChannelSecurityGroups: D.m({ wire: "channelSecurityGroups" }),
      InferenceSettings: D.m({
        wire: "inferenceSettings",
        shape: o_DescribeInferenceSettings,
      }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/inputDevices/{InputDeviceId}/stop",
    input: { InputDeviceId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/multiplexes/{MultiplexId}/stop",
    input: { MultiplexId: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      AvailabilityZones: D.m({ wire: "availabilityZones" }),
      Destinations: D.m({
        wire: "destinations",
        shape: D.list(o_MultiplexOutputDestination),
      }),
      Id: D.m({ wire: "id" }),
      MultiplexSettings: D.m({
        wire: "multiplexSettings",
        shape: o_MultiplexSettings,
      }),
      Name: D.m({ wire: "name" }),
      PipelinesRunningCount: D.m({ wire: "pipelinesRunningCount" }),
      ProgramCount: D.m({ wire: "programCount" }),
      State: D.m({ wire: "state" }),
      Tags: D.m({ wire: "tags" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prod/inputDevices/{InputDeviceId}/transfer",
    input: {
      InputDeviceId: 0,
      TargetCustomerId: D.m({ wire: "targetCustomerId" }),
      TargetRegion: D.m({ wire: "targetRegion" }),
      TransferMessage: D.m({ wire: "transferMessage" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /prod/accountConfiguration",
    input: {
      AccountConfiguration: D.m({
        wire: "accountConfiguration",
        shape: { KmsKeyId: D.m({ wire: "kmsKeyId" }) },
      }),
    },
    output: {
      AccountConfiguration: D.m({
        wire: "accountConfiguration",
        shape: o_AccountConfiguration,
      }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /prod/channels/{ChannelId}",
    input: {
      CdiInputSpecification: D.m({
        wire: "cdiInputSpecification",
        shape: i_CdiInputSpecification,
      }),
      ChannelId: 0,
      Destinations: D.m({
        wire: "destinations",
        shape: D.list(i_OutputDestination),
      }),
      EncoderSettings: D.m({
        wire: "encoderSettings",
        shape: i_EncoderSettings,
      }),
      InputAttachments: D.m({
        wire: "inputAttachments",
        shape: D.list(i_InputAttachment),
      }),
      InputSpecification: D.m({
        wire: "inputSpecification",
        shape: i_InputSpecification,
      }),
      LogLevel: D.m({ wire: "logLevel" }),
      Maintenance: D.m({
        wire: "maintenance",
        shape: {
          MaintenanceDay: D.m({ wire: "maintenanceDay" }),
          MaintenanceScheduledDate: D.m({ wire: "maintenanceScheduledDate" }),
          MaintenanceStartTime: D.m({ wire: "maintenanceStartTime" }),
        },
      }),
      Name: D.m({ wire: "name" }),
      RoleArn: D.m({ wire: "roleArn" }),
      ChannelEngineVersion: D.m({
        wire: "channelEngineVersion",
        shape: i_ChannelEngineVersionRequest,
      }),
      DryRun: D.m({ wire: "dryRun" }),
      AnywhereSettings: D.m({
        wire: "anywhereSettings",
        shape: i_AnywhereSettings,
      }),
      LinkedChannelSettings: D.m({
        wire: "linkedChannelSettings",
        shape: i_LinkedChannelSettings,
      }),
      ChannelSecurityGroups: D.m({ wire: "channelSecurityGroups" }),
      InferenceSettings: D.m({
        wire: "inferenceSettings",
        shape: i_InferenceSettings,
      }),
      SpecialRouterSettings: D.m({
        wire: "specialRouterSettings",
        shape: i_SpecialRouterSettings,
      }),
    },
    output: { Channel: D.m({ wire: "channel", shape: o_Channel }) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /prod/channels/{ChannelId}/channelClass",
    input: {
      ChannelClass: D.m({ wire: "channelClass" }),
      ChannelId: 0,
      Destinations: D.m({
        wire: "destinations",
        shape: D.list(i_OutputDestination),
      }),
    },
    output: { Channel: D.m({ wire: "channel", shape: o_Channel }) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /prod/clusters/{ClusterId}/channelplacementgroups/{ChannelPlacementGroupId}",
    input: {
      ChannelPlacementGroupId: 0,
      ClusterId: 0,
      Name: D.m({ wire: "name" }),
      Nodes: D.m({ wire: "nodes" }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      Channels: D.m({ wire: "channels" }),
      ClusterId: D.m({ wire: "clusterId" }),
      Id: D.m({ wire: "id" }),
      Name: D.m({ wire: "name" }),
      Nodes: D.m({ wire: "nodes" }),
      State: D.m({ wire: "state" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /prod/cloudwatch-alarm-templates/{Identifier}",
    input: {
      ComparisonOperator: D.m({ wire: "comparisonOperator" }),
      DatapointsToAlarm: D.m({ wire: "datapointsToAlarm" }),
      Description: D.m({ wire: "description" }),
      EvaluationPeriods: D.m({ wire: "evaluationPeriods" }),
      GroupIdentifier: D.m({ wire: "groupIdentifier" }),
      Identifier: 0,
      MetricName: D.m({ wire: "metricName" }),
      Name: D.m({ wire: "name" }),
      Period: D.m({ wire: "period" }),
      Statistic: D.m({ wire: "statistic" }),
      TargetResourceType: D.m({ wire: "targetResourceType" }),
      Threshold: D.m({ wire: "threshold" }),
      TreatMissingData: D.m({ wire: "treatMissingData" }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      ComparisonOperator: D.m({ wire: "comparisonOperator" }),
      CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
      DatapointsToAlarm: D.m({ wire: "datapointsToAlarm" }),
      Description: D.m({ wire: "description" }),
      EvaluationPeriods: D.m({ wire: "evaluationPeriods" }),
      GroupId: D.m({ wire: "groupId" }),
      Id: D.m({ wire: "id" }),
      MetricName: D.m({ wire: "metricName" }),
      ModifiedAt: D.m({ wire: "modifiedAt", shape: D.ts }),
      Name: D.m({ wire: "name" }),
      Period: D.m({ wire: "period" }),
      Statistic: D.m({ wire: "statistic" }),
      Tags: D.m({ wire: "tags" }),
      TargetResourceType: D.m({ wire: "targetResourceType" }),
      Threshold: D.m({ wire: "threshold" }),
      TreatMissingData: D.m({ wire: "treatMissingData" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /prod/cloudwatch-alarm-template-groups/{Identifier}",
    input: { Description: D.m({ wire: "description" }), Identifier: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
      Description: D.m({ wire: "description" }),
      Id: D.m({ wire: "id" }),
      ModifiedAt: D.m({ wire: "modifiedAt", shape: D.ts }),
      Name: D.m({ wire: "name" }),
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /prod/clusters/{ClusterId}",
    input: {
      ClusterId: 0,
      Name: D.m({ wire: "name" }),
      NetworkSettings: D.m({
        wire: "networkSettings",
        shape: {
          DefaultRoute: D.m({ wire: "defaultRoute" }),
          InterfaceMappings: D.m({
            wire: "interfaceMappings",
            shape: D.list({
              LogicalInterfaceName: D.m({ wire: "logicalInterfaceName" }),
              NetworkId: D.m({ wire: "networkId" }),
            }),
          }),
        },
      }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      ChannelIds: D.m({ wire: "channelIds" }),
      ClusterType: D.m({ wire: "clusterType" }),
      Id: D.m({ wire: "id" }),
      Name: D.m({ wire: "name" }),
      NetworkSettings: D.m({
        wire: "networkSettings",
        shape: o_ClusterNetworkSettings,
      }),
      State: D.m({ wire: "state" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /prod/eventbridge-rule-templates/{Identifier}",
    input: {
      Description: D.m({ wire: "description" }),
      EventTargets: D.m({
        wire: "eventTargets",
        shape: D.list(i_EventBridgeRuleTemplateTarget),
      }),
      EventType: D.m({ wire: "eventType" }),
      GroupIdentifier: D.m({ wire: "groupIdentifier" }),
      Identifier: 0,
      Name: D.m({ wire: "name" }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
      Description: D.m({ wire: "description" }),
      EventTargets: D.m({
        wire: "eventTargets",
        shape: D.list(o_EventBridgeRuleTemplateTarget),
      }),
      EventType: D.m({ wire: "eventType" }),
      GroupId: D.m({ wire: "groupId" }),
      Id: D.m({ wire: "id" }),
      ModifiedAt: D.m({ wire: "modifiedAt", shape: D.ts }),
      Name: D.m({ wire: "name" }),
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /prod/eventbridge-rule-template-groups/{Identifier}",
    input: { Description: D.m({ wire: "description" }), Identifier: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
      Description: D.m({ wire: "description" }),
      Id: D.m({ wire: "id" }),
      ModifiedAt: D.m({ wire: "modifiedAt", shape: D.ts }),
      Name: D.m({ wire: "name" }),
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /prod/inputs/{InputId}",
    input: {
      Destinations: D.m({
        wire: "destinations",
        shape: D.list(i_InputDestinationRequest),
      }),
      InputDevices: D.m({
        wire: "inputDevices",
        shape: D.list({ Id: D.m({ wire: "id" }) }),
      }),
      InputId: 0,
      InputSecurityGroups: D.m({ wire: "inputSecurityGroups" }),
      MediaConnectFlows: D.m({
        wire: "mediaConnectFlows",
        shape: D.list(i_MediaConnectFlowRequest),
      }),
      Name: D.m({ wire: "name" }),
      RoleArn: D.m({ wire: "roleArn" }),
      Sources: D.m({ wire: "sources", shape: D.list(i_InputSourceRequest) }),
      SrtSettings: D.m({ wire: "srtSettings", shape: i_SrtSettingsRequest }),
      MulticastSettings: D.m({
        wire: "multicastSettings",
        shape: {
          Sources: D.m({
            wire: "sources",
            shape: D.list({
              SourceIp: D.m({ wire: "sourceIp" }),
              Url: D.m({ wire: "url" }),
            }),
          }),
        },
      }),
      Smpte2110ReceiverGroupSettings: D.m({
        wire: "smpte2110ReceiverGroupSettings",
        shape: i_Smpte2110ReceiverGroupSettings,
      }),
      SdiSources: D.m({ wire: "sdiSources" }),
      SpecialRouterSettings: D.m({
        wire: "specialRouterSettings",
        shape: i_SpecialRouterSettings,
      }),
    },
    output: { Input: D.m({ wire: "input", shape: o_Input }) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /prod/inputDevices/{InputDeviceId}",
    input: {
      HdDeviceSettings: D.m({
        wire: "hdDeviceSettings",
        shape: i_InputDeviceConfigurableSettings,
      }),
      InputDeviceId: 0,
      Name: D.m({ wire: "name" }),
      UhdDeviceSettings: D.m({
        wire: "uhdDeviceSettings",
        shape: i_InputDeviceConfigurableSettings,
      }),
      AvailabilityZone: D.m({ wire: "availabilityZone" }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      ConnectionState: D.m({ wire: "connectionState" }),
      DeviceSettingsSyncState: D.m({ wire: "deviceSettingsSyncState" }),
      DeviceUpdateStatus: D.m({ wire: "deviceUpdateStatus" }),
      HdDeviceSettings: D.m({
        wire: "hdDeviceSettings",
        shape: o_InputDeviceHdSettings,
      }),
      Id: D.m({ wire: "id" }),
      MacAddress: D.m({ wire: "macAddress" }),
      Name: D.m({ wire: "name" }),
      NetworkSettings: D.m({
        wire: "networkSettings",
        shape: o_InputDeviceNetworkSettings,
      }),
      SerialNumber: D.m({ wire: "serialNumber" }),
      Type: D.m({ wire: "type" }),
      UhdDeviceSettings: D.m({
        wire: "uhdDeviceSettings",
        shape: o_InputDeviceUhdSettings,
      }),
      Tags: D.m({ wire: "tags" }),
      AvailabilityZone: D.m({ wire: "availabilityZone" }),
      MedialiveInputArns: D.m({ wire: "medialiveInputArns" }),
      OutputType: D.m({ wire: "outputType" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /prod/inputSecurityGroups/{InputSecurityGroupId}",
    input: {
      InputSecurityGroupId: 0,
      Tags: D.m({ wire: "tags" }),
      WhitelistRules: D.m({
        wire: "whitelistRules",
        shape: D.list(i_InputWhitelistRuleCidr),
      }),
    },
    output: {
      SecurityGroup: D.m({
        wire: "securityGroup",
        shape: o_InputSecurityGroup,
      }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /prod/multiplexes/{MultiplexId}",
    input: {
      MultiplexId: 0,
      MultiplexSettings: D.m({
        wire: "multiplexSettings",
        shape: i_MultiplexSettings,
      }),
      Name: D.m({ wire: "name" }),
      PacketIdentifiersMapping: D.m({
        wire: "packetIdentifiersMapping",
        shape: D.map({
          AudioPids: D.m({ wire: "audioPids" }),
          DvbSubPids: D.m({ wire: "dvbSubPids" }),
          DvbTeletextPid: D.m({ wire: "dvbTeletextPid" }),
          EtvPlatformPid: D.m({ wire: "etvPlatformPid" }),
          EtvSignalPid: D.m({ wire: "etvSignalPid" }),
          KlvDataPids: D.m({ wire: "klvDataPids" }),
          PcrPid: D.m({ wire: "pcrPid" }),
          PmtPid: D.m({ wire: "pmtPid" }),
          PrivateMetadataPid: D.m({ wire: "privateMetadataPid" }),
          Scte27Pids: D.m({ wire: "scte27Pids" }),
          Scte35Pid: D.m({ wire: "scte35Pid" }),
          TimedMetadataPid: D.m({ wire: "timedMetadataPid" }),
          VideoPid: D.m({ wire: "videoPid" }),
          AribCaptionsPid: D.m({ wire: "aribCaptionsPid" }),
          DvbTeletextPids: D.m({ wire: "dvbTeletextPids" }),
          EcmPid: D.m({ wire: "ecmPid" }),
          Smpte2038Pid: D.m({ wire: "smpte2038Pid" }),
        }),
      }),
    },
    output: { Multiplex: D.m({ wire: "multiplex", shape: o_Multiplex }) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /prod/multiplexes/{MultiplexId}/programs/{ProgramName}",
    input: {
      MultiplexId: 0,
      MultiplexProgramSettings: D.m({
        wire: "multiplexProgramSettings",
        shape: i_MultiplexProgramSettings,
      }),
      ProgramName: 0,
    },
    output: {
      MultiplexProgram: D.m({
        wire: "multiplexProgram",
        shape: o_MultiplexProgram,
      }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /prod/networks/{NetworkId}",
    input: {
      IpPools: D.m({
        wire: "ipPools",
        shape: D.list({ Cidr: D.m({ wire: "cidr" }) }),
      }),
      Name: D.m({ wire: "name" }),
      NetworkId: 0,
      Routes: D.m({
        wire: "routes",
        shape: D.list({
          Cidr: D.m({ wire: "cidr" }),
          Gateway: D.m({ wire: "gateway" }),
        }),
      }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      AssociatedClusterIds: D.m({ wire: "associatedClusterIds" }),
      Id: D.m({ wire: "id" }),
      IpPools: D.m({ wire: "ipPools", shape: D.list(o_IpPool) }),
      Name: D.m({ wire: "name" }),
      Routes: D.m({ wire: "routes", shape: D.list(o_Route) }),
      State: D.m({ wire: "state" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /prod/clusters/{ClusterId}/nodes/{NodeId}",
    input: {
      ClusterId: 0,
      Name: D.m({ wire: "name" }),
      NodeId: 0,
      Role: D.m({ wire: "role" }),
      SdiSourceMappings: D.m({
        wire: "sdiSourceMappings",
        shape: D.list({
          CardNumber: D.m({ wire: "cardNumber" }),
          ChannelNumber: D.m({ wire: "channelNumber" }),
          SdiSource: D.m({ wire: "sdiSource" }),
        }),
      }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      ChannelPlacementGroups: D.m({ wire: "channelPlacementGroups" }),
      ClusterId: D.m({ wire: "clusterId" }),
      ConnectionState: D.m({ wire: "connectionState" }),
      Id: D.m({ wire: "id" }),
      InstanceArn: D.m({ wire: "instanceArn" }),
      Name: D.m({ wire: "name" }),
      NodeInterfaceMappings: D.m({
        wire: "nodeInterfaceMappings",
        shape: D.list(o_NodeInterfaceMapping),
      }),
      Role: D.m({ wire: "role" }),
      State: D.m({ wire: "state" }),
      SdiSourceMappings: D.m({
        wire: "sdiSourceMappings",
        shape: D.list(o_SdiSourceMapping),
      }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /prod/clusters/{ClusterId}/nodes/{NodeId}/state",
    input: { ClusterId: 0, NodeId: 0, State: D.m({ wire: "state" }) },
    output: {
      Arn: D.m({ wire: "arn" }),
      ChannelPlacementGroups: D.m({ wire: "channelPlacementGroups" }),
      ClusterId: D.m({ wire: "clusterId" }),
      ConnectionState: D.m({ wire: "connectionState" }),
      Id: D.m({ wire: "id" }),
      InstanceArn: D.m({ wire: "instanceArn" }),
      Name: D.m({ wire: "name" }),
      NodeInterfaceMappings: D.m({
        wire: "nodeInterfaceMappings",
        shape: D.list(o_NodeInterfaceMapping),
      }),
      Role: D.m({ wire: "role" }),
      State: D.m({ wire: "state" }),
      SdiSourceMappings: D.m({
        wire: "sdiSourceMappings",
        shape: D.list(o_SdiSourceMapping),
      }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /prod/reservations/{ReservationId}",
    input: {
      Name: D.m({ wire: "name" }),
      RenewalSettings: D.m({
        wire: "renewalSettings",
        shape: i_RenewalSettings,
      }),
      ReservationId: 0,
    },
    output: { Reservation: D.m({ wire: "reservation", shape: o_Reservation }) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /prod/sdiSources/{SdiSourceId}",
    input: {
      Mode: D.m({ wire: "mode" }),
      Name: D.m({ wire: "name" }),
      SdiSourceId: 0,
      Type: D.m({ wire: "type" }),
    },
    output: { SdiSource: D.m({ wire: "sdiSource", shape: o_SdiSource }) },
    body: true,
  },
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
})) as any;

const i_AnywhereSettings: D.LazyStruct = () => ({
  ChannelPlacementGroupId: D.m({ wire: "channelPlacementGroupId" }),
  ClusterId: D.m({ wire: "clusterId" }),
});
const i_CdiInputSpecification: D.LazyStruct = () => ({
  Resolution: D.m({ wire: "resolution" }),
});
const i_ChannelEngineVersionRequest: D.LazyStruct = () => ({
  Version: D.m({ wire: "version" }),
});
const i_EncoderSettings: D.LazyStruct = () => ({
  AudioDescriptions: D.m({
    wire: "audioDescriptions",
    shape: D.list({
      AudioNormalizationSettings: D.m({
        wire: "audioNormalizationSettings",
        shape: i_AudioNormalizationSettings,
      }),
      AudioSelectorName: D.m({ wire: "audioSelectorName" }),
      AudioType: D.m({ wire: "audioType" }),
      AudioTypeControl: D.m({ wire: "audioTypeControl" }),
      AudioWatermarkingSettings: D.m({
        wire: "audioWatermarkingSettings",
        shape: {
          NielsenWatermarksSettings: D.m({
            wire: "nielsenWatermarksSettings",
            shape: {
              NielsenCbetSettings: D.m({
                wire: "nielsenCbetSettings",
                shape: {
                  CbetCheckDigitString: D.m({ wire: "cbetCheckDigitString" }),
                  CbetStepaside: D.m({ wire: "cbetStepaside" }),
                  Csid: D.m({ wire: "csid" }),
                },
              }),
              NielsenDistributionType: D.m({ wire: "nielsenDistributionType" }),
              NielsenNaesIiNwSettings: D.m({
                wire: "nielsenNaesIiNwSettings",
                shape: {
                  CheckDigitString: D.m({ wire: "checkDigitString" }),
                  Sid: D.m({ wire: "sid" }),
                  Timezone: D.m({ wire: "timezone" }),
                },
              }),
              NielsenNwOnlySettings: D.m({
                wire: "nielsenNwOnlySettings",
                shape: {
                  CheckDigitString: D.m({ wire: "checkDigitString" }),
                  Sid: D.m({ wire: "sid" }),
                  Timezone: D.m({ wire: "timezone" }),
                },
              }),
            },
          }),
        },
      }),
      CodecSettings: D.m({
        wire: "codecSettings",
        shape: {
          AacSettings: D.m({
            wire: "aacSettings",
            shape: {
              Bitrate: D.m({ wire: "bitrate" }),
              CodingMode: D.m({ wire: "codingMode" }),
              InputType: D.m({ wire: "inputType" }),
              Profile: D.m({ wire: "profile" }),
              RateControlMode: D.m({ wire: "rateControlMode" }),
              RawFormat: D.m({ wire: "rawFormat" }),
              SampleRate: D.m({ wire: "sampleRate" }),
              Spec: D.m({ wire: "spec" }),
              VbrQuality: D.m({ wire: "vbrQuality" }),
            },
          }),
          Ac3Settings: D.m({
            wire: "ac3Settings",
            shape: {
              Bitrate: D.m({ wire: "bitrate" }),
              BitstreamMode: D.m({ wire: "bitstreamMode" }),
              CodingMode: D.m({ wire: "codingMode" }),
              Dialnorm: D.m({ wire: "dialnorm" }),
              DrcProfile: D.m({ wire: "drcProfile" }),
              LfeFilter: D.m({ wire: "lfeFilter" }),
              MetadataControl: D.m({ wire: "metadataControl" }),
              AttenuationControl: D.m({ wire: "attenuationControl" }),
            },
          }),
          Eac3AtmosSettings: D.m({
            wire: "eac3AtmosSettings",
            shape: {
              Bitrate: D.m({ wire: "bitrate" }),
              CodingMode: D.m({ wire: "codingMode" }),
              Dialnorm: D.m({ wire: "dialnorm" }),
              DrcLine: D.m({ wire: "drcLine" }),
              DrcRf: D.m({ wire: "drcRf" }),
              HeightTrim: D.m({ wire: "heightTrim" }),
              SurroundTrim: D.m({ wire: "surroundTrim" }),
            },
          }),
          Eac3Settings: D.m({
            wire: "eac3Settings",
            shape: {
              AttenuationControl: D.m({ wire: "attenuationControl" }),
              Bitrate: D.m({ wire: "bitrate" }),
              BitstreamMode: D.m({ wire: "bitstreamMode" }),
              CodingMode: D.m({ wire: "codingMode" }),
              DcFilter: D.m({ wire: "dcFilter" }),
              Dialnorm: D.m({ wire: "dialnorm" }),
              DrcLine: D.m({ wire: "drcLine" }),
              DrcRf: D.m({ wire: "drcRf" }),
              LfeControl: D.m({ wire: "lfeControl" }),
              LfeFilter: D.m({ wire: "lfeFilter" }),
              LoRoCenterMixLevel: D.m({ wire: "loRoCenterMixLevel" }),
              LoRoSurroundMixLevel: D.m({ wire: "loRoSurroundMixLevel" }),
              LtRtCenterMixLevel: D.m({ wire: "ltRtCenterMixLevel" }),
              LtRtSurroundMixLevel: D.m({ wire: "ltRtSurroundMixLevel" }),
              MetadataControl: D.m({ wire: "metadataControl" }),
              PassthroughControl: D.m({ wire: "passthroughControl" }),
              PhaseControl: D.m({ wire: "phaseControl" }),
              StereoDownmix: D.m({ wire: "stereoDownmix" }),
              SurroundExMode: D.m({ wire: "surroundExMode" }),
              SurroundMode: D.m({ wire: "surroundMode" }),
            },
          }),
          Mp2Settings: D.m({
            wire: "mp2Settings",
            shape: {
              Bitrate: D.m({ wire: "bitrate" }),
              CodingMode: D.m({ wire: "codingMode" }),
              SampleRate: D.m({ wire: "sampleRate" }),
            },
          }),
          PassThroughSettings: D.m({ wire: "passThroughSettings", shape: {} }),
          WavSettings: D.m({
            wire: "wavSettings",
            shape: {
              BitDepth: D.m({ wire: "bitDepth" }),
              CodingMode: D.m({ wire: "codingMode" }),
              SampleRate: D.m({ wire: "sampleRate" }),
            },
          }),
        },
      }),
      LanguageCode: D.m({ wire: "languageCode" }),
      LanguageCodeControl: D.m({ wire: "languageCodeControl" }),
      Name: D.m({ wire: "name" }),
      RemixSettings: D.m({ wire: "remixSettings", shape: i_RemixSettings }),
      StreamName: D.m({ wire: "streamName" }),
      AudioDashRoles: D.m({ wire: "audioDashRoles" }),
      DvbDashAccessibility: D.m({ wire: "dvbDashAccessibility" }),
    }),
  }),
  AvailBlanking: D.m({
    wire: "availBlanking",
    shape: {
      AvailBlankingImage: D.m({
        wire: "availBlankingImage",
        shape: i_InputLocation,
      }),
      State: D.m({ wire: "state" }),
    },
  }),
  AvailConfiguration: D.m({
    wire: "availConfiguration",
    shape: {
      AvailSettings: D.m({
        wire: "availSettings",
        shape: {
          Esam: D.m({
            wire: "esam",
            shape: {
              AcquisitionPointId: D.m({ wire: "acquisitionPointId" }),
              AdAvailOffset: D.m({ wire: "adAvailOffset" }),
              PasswordParam: D.m({ wire: "passwordParam" }),
              PoisEndpoint: D.m({ wire: "poisEndpoint" }),
              Username: D.m({ wire: "username" }),
              ZoneIdentity: D.m({ wire: "zoneIdentity" }),
            },
          }),
          Scte35SpliceInsert: D.m({
            wire: "scte35SpliceInsert",
            shape: {
              AdAvailOffset: D.m({ wire: "adAvailOffset" }),
              NoRegionalBlackoutFlag: D.m({ wire: "noRegionalBlackoutFlag" }),
              WebDeliveryAllowedFlag: D.m({ wire: "webDeliveryAllowedFlag" }),
            },
          }),
          Scte35TimeSignalApos: D.m({
            wire: "scte35TimeSignalApos",
            shape: {
              AdAvailOffset: D.m({ wire: "adAvailOffset" }),
              NoRegionalBlackoutFlag: D.m({ wire: "noRegionalBlackoutFlag" }),
              WebDeliveryAllowedFlag: D.m({ wire: "webDeliveryAllowedFlag" }),
            },
          }),
        },
      }),
      Scte35SegmentationScope: D.m({ wire: "scte35SegmentationScope" }),
    },
  }),
  BlackoutSlate: D.m({
    wire: "blackoutSlate",
    shape: {
      BlackoutSlateImage: D.m({
        wire: "blackoutSlateImage",
        shape: i_InputLocation,
      }),
      NetworkEndBlackout: D.m({ wire: "networkEndBlackout" }),
      NetworkEndBlackoutImage: D.m({
        wire: "networkEndBlackoutImage",
        shape: i_InputLocation,
      }),
      NetworkId: D.m({ wire: "networkId" }),
      State: D.m({ wire: "state" }),
    },
  }),
  CaptionDescriptions: D.m({
    wire: "captionDescriptions",
    shape: D.list({
      Accessibility: D.m({ wire: "accessibility" }),
      CaptionSelectorName: D.m({ wire: "captionSelectorName" }),
      DestinationSettings: D.m({
        wire: "destinationSettings",
        shape: {
          AribDestinationSettings: D.m({
            wire: "aribDestinationSettings",
            shape: {},
          }),
          BurnInDestinationSettings: D.m({
            wire: "burnInDestinationSettings",
            shape: {
              Alignment: D.m({ wire: "alignment" }),
              BackgroundColor: D.m({ wire: "backgroundColor" }),
              BackgroundOpacity: D.m({ wire: "backgroundOpacity" }),
              Font: D.m({ wire: "font", shape: i_InputLocation }),
              FontColor: D.m({ wire: "fontColor" }),
              FontOpacity: D.m({ wire: "fontOpacity" }),
              FontResolution: D.m({ wire: "fontResolution" }),
              FontSize: D.m({ wire: "fontSize" }),
              OutlineColor: D.m({ wire: "outlineColor" }),
              OutlineSize: D.m({ wire: "outlineSize" }),
              ShadowColor: D.m({ wire: "shadowColor" }),
              ShadowOpacity: D.m({ wire: "shadowOpacity" }),
              ShadowXOffset: D.m({ wire: "shadowXOffset" }),
              ShadowYOffset: D.m({ wire: "shadowYOffset" }),
              TeletextGridControl: D.m({ wire: "teletextGridControl" }),
              XPosition: D.m({ wire: "xPosition" }),
              YPosition: D.m({ wire: "yPosition" }),
              SubtitleRows: D.m({ wire: "subtitleRows" }),
            },
          }),
          DvbSubDestinationSettings: D.m({
            wire: "dvbSubDestinationSettings",
            shape: {
              Alignment: D.m({ wire: "alignment" }),
              BackgroundColor: D.m({ wire: "backgroundColor" }),
              BackgroundOpacity: D.m({ wire: "backgroundOpacity" }),
              Font: D.m({ wire: "font", shape: i_InputLocation }),
              FontColor: D.m({ wire: "fontColor" }),
              FontOpacity: D.m({ wire: "fontOpacity" }),
              FontResolution: D.m({ wire: "fontResolution" }),
              FontSize: D.m({ wire: "fontSize" }),
              OutlineColor: D.m({ wire: "outlineColor" }),
              OutlineSize: D.m({ wire: "outlineSize" }),
              ShadowColor: D.m({ wire: "shadowColor" }),
              ShadowOpacity: D.m({ wire: "shadowOpacity" }),
              ShadowXOffset: D.m({ wire: "shadowXOffset" }),
              ShadowYOffset: D.m({ wire: "shadowYOffset" }),
              TeletextGridControl: D.m({ wire: "teletextGridControl" }),
              XPosition: D.m({ wire: "xPosition" }),
              YPosition: D.m({ wire: "yPosition" }),
              SubtitleRows: D.m({ wire: "subtitleRows" }),
            },
          }),
          EbuTtDDestinationSettings: D.m({
            wire: "ebuTtDDestinationSettings",
            shape: {
              CopyrightHolder: D.m({ wire: "copyrightHolder" }),
              FillLineGap: D.m({ wire: "fillLineGap" }),
              FontFamily: D.m({ wire: "fontFamily" }),
              StyleControl: D.m({ wire: "styleControl" }),
              DefaultFontSize: D.m({ wire: "defaultFontSize" }),
              DefaultLineHeight: D.m({ wire: "defaultLineHeight" }),
            },
          }),
          EmbeddedDestinationSettings: D.m({
            wire: "embeddedDestinationSettings",
            shape: {},
          }),
          EmbeddedPlusScte20DestinationSettings: D.m({
            wire: "embeddedPlusScte20DestinationSettings",
            shape: {},
          }),
          RtmpCaptionInfoDestinationSettings: D.m({
            wire: "rtmpCaptionInfoDestinationSettings",
            shape: {},
          }),
          Scte20PlusEmbeddedDestinationSettings: D.m({
            wire: "scte20PlusEmbeddedDestinationSettings",
            shape: {},
          }),
          Scte27DestinationSettings: D.m({
            wire: "scte27DestinationSettings",
            shape: {},
          }),
          SmpteTtDestinationSettings: D.m({
            wire: "smpteTtDestinationSettings",
            shape: {},
          }),
          TeletextDestinationSettings: D.m({
            wire: "teletextDestinationSettings",
            shape: {},
          }),
          TtmlDestinationSettings: D.m({
            wire: "ttmlDestinationSettings",
            shape: { StyleControl: D.m({ wire: "styleControl" }) },
          }),
          WebvttDestinationSettings: D.m({
            wire: "webvttDestinationSettings",
            shape: { StyleControl: D.m({ wire: "styleControl" }) },
          }),
        },
      }),
      LanguageCode: D.m({ wire: "languageCode" }),
      LanguageDescription: D.m({ wire: "languageDescription" }),
      Name: D.m({ wire: "name" }),
      CaptionDashRoles: D.m({ wire: "captionDashRoles" }),
      DvbDashAccessibility: D.m({ wire: "dvbDashAccessibility" }),
    }),
  }),
  FeatureActivations: D.m({
    wire: "featureActivations",
    shape: {
      InputPrepareScheduleActions: D.m({ wire: "inputPrepareScheduleActions" }),
      OutputStaticImageOverlayScheduleActions: D.m({
        wire: "outputStaticImageOverlayScheduleActions",
      }),
    },
  }),
  GlobalConfiguration: D.m({
    wire: "globalConfiguration",
    shape: {
      InitialAudioGain: D.m({ wire: "initialAudioGain" }),
      InputEndAction: D.m({ wire: "inputEndAction" }),
      InputLossBehavior: D.m({
        wire: "inputLossBehavior",
        shape: {
          BlackFrameMsec: D.m({ wire: "blackFrameMsec" }),
          InputLossImageColor: D.m({ wire: "inputLossImageColor" }),
          InputLossImageSlate: D.m({
            wire: "inputLossImageSlate",
            shape: i_InputLocation,
          }),
          InputLossImageType: D.m({ wire: "inputLossImageType" }),
          RepeatFrameMsec: D.m({ wire: "repeatFrameMsec" }),
        },
      }),
      OutputLockingMode: D.m({ wire: "outputLockingMode" }),
      OutputTimingSource: D.m({ wire: "outputTimingSource" }),
      SupportLowFramerateInputs: D.m({ wire: "supportLowFramerateInputs" }),
      OutputLockingSettings: D.m({
        wire: "outputLockingSettings",
        shape: {
          EpochLockingSettings: D.m({
            wire: "epochLockingSettings",
            shape: {
              CustomEpoch: D.m({ wire: "customEpoch" }),
              JamSyncTime: D.m({ wire: "jamSyncTime" }),
            },
          }),
          PipelineLockingSettings: D.m({
            wire: "pipelineLockingSettings",
            shape: {
              PipelineLockingMethod: D.m({ wire: "pipelineLockingMethod" }),
              CustomEpoch: D.m({ wire: "customEpoch" }),
            },
          }),
          DisabledLockingSettings: D.m({
            wire: "disabledLockingSettings",
            shape: { CustomEpoch: D.m({ wire: "customEpoch" }) },
          }),
        },
      }),
    },
  }),
  MotionGraphicsConfiguration: D.m({
    wire: "motionGraphicsConfiguration",
    shape: {
      MotionGraphicsInsertion: D.m({ wire: "motionGraphicsInsertion" }),
      MotionGraphicsSettings: D.m({
        wire: "motionGraphicsSettings",
        shape: {
          HtmlMotionGraphicsSettings: D.m({
            wire: "htmlMotionGraphicsSettings",
            shape: {},
          }),
        },
      }),
    },
  }),
  NielsenConfiguration: D.m({
    wire: "nielsenConfiguration",
    shape: {
      DistributorId: D.m({ wire: "distributorId" }),
      NielsenPcmToId3Tagging: D.m({ wire: "nielsenPcmToId3Tagging" }),
    },
  }),
  OutputGroups: D.m({
    wire: "outputGroups",
    shape: D.list({
      Name: D.m({ wire: "name" }),
      OutputGroupSettings: D.m({
        wire: "outputGroupSettings",
        shape: {
          ArchiveGroupSettings: D.m({
            wire: "archiveGroupSettings",
            shape: {
              ArchiveCdnSettings: D.m({
                wire: "archiveCdnSettings",
                shape: {
                  ArchiveS3Settings: D.m({
                    wire: "archiveS3Settings",
                    shape: { CannedAcl: D.m({ wire: "cannedAcl" }) },
                  }),
                },
              }),
              Destination: D.m({
                wire: "destination",
                shape: i_OutputLocationRef,
              }),
              RolloverInterval: D.m({ wire: "rolloverInterval" }),
            },
          }),
          FrameCaptureGroupSettings: D.m({
            wire: "frameCaptureGroupSettings",
            shape: {
              Destination: D.m({
                wire: "destination",
                shape: i_OutputLocationRef,
              }),
              FrameCaptureCdnSettings: D.m({
                wire: "frameCaptureCdnSettings",
                shape: {
                  FrameCaptureS3Settings: D.m({
                    wire: "frameCaptureS3Settings",
                    shape: { CannedAcl: D.m({ wire: "cannedAcl" }) },
                  }),
                },
              }),
            },
          }),
          HlsGroupSettings: D.m({
            wire: "hlsGroupSettings",
            shape: {
              AdMarkers: D.m({ wire: "adMarkers" }),
              BaseUrlContent: D.m({ wire: "baseUrlContent" }),
              BaseUrlContent1: D.m({ wire: "baseUrlContent1" }),
              BaseUrlManifest: D.m({ wire: "baseUrlManifest" }),
              BaseUrlManifest1: D.m({ wire: "baseUrlManifest1" }),
              CaptionLanguageMappings: D.m({
                wire: "captionLanguageMappings",
                shape: D.list(i_CaptionLanguageMapping),
              }),
              CaptionLanguageSetting: D.m({ wire: "captionLanguageSetting" }),
              ClientCache: D.m({ wire: "clientCache" }),
              CodecSpecification: D.m({ wire: "codecSpecification" }),
              ConstantIv: D.m({ wire: "constantIv" }),
              Destination: D.m({
                wire: "destination",
                shape: i_OutputLocationRef,
              }),
              DirectoryStructure: D.m({ wire: "directoryStructure" }),
              DiscontinuityTags: D.m({ wire: "discontinuityTags" }),
              EncryptionType: D.m({ wire: "encryptionType" }),
              HlsCdnSettings: D.m({
                wire: "hlsCdnSettings",
                shape: {
                  HlsAkamaiSettings: D.m({
                    wire: "hlsAkamaiSettings",
                    shape: {
                      ConnectionRetryInterval: D.m({
                        wire: "connectionRetryInterval",
                      }),
                      FilecacheDuration: D.m({ wire: "filecacheDuration" }),
                      HttpTransferMode: D.m({ wire: "httpTransferMode" }),
                      NumRetries: D.m({ wire: "numRetries" }),
                      RestartDelay: D.m({ wire: "restartDelay" }),
                      Salt: D.m({ wire: "salt" }),
                      Token: D.m({ wire: "token" }),
                    },
                  }),
                  HlsBasicPutSettings: D.m({
                    wire: "hlsBasicPutSettings",
                    shape: {
                      ConnectionRetryInterval: D.m({
                        wire: "connectionRetryInterval",
                      }),
                      FilecacheDuration: D.m({ wire: "filecacheDuration" }),
                      NumRetries: D.m({ wire: "numRetries" }),
                      RestartDelay: D.m({ wire: "restartDelay" }),
                    },
                  }),
                  HlsMediaStoreSettings: D.m({
                    wire: "hlsMediaStoreSettings",
                    shape: {
                      ConnectionRetryInterval: D.m({
                        wire: "connectionRetryInterval",
                      }),
                      FilecacheDuration: D.m({ wire: "filecacheDuration" }),
                      MediaStoreStorageClass: D.m({
                        wire: "mediaStoreStorageClass",
                      }),
                      NumRetries: D.m({ wire: "numRetries" }),
                      RestartDelay: D.m({ wire: "restartDelay" }),
                    },
                  }),
                  HlsS3Settings: D.m({
                    wire: "hlsS3Settings",
                    shape: { CannedAcl: D.m({ wire: "cannedAcl" }) },
                  }),
                  HlsWebdavSettings: D.m({
                    wire: "hlsWebdavSettings",
                    shape: {
                      ConnectionRetryInterval: D.m({
                        wire: "connectionRetryInterval",
                      }),
                      FilecacheDuration: D.m({ wire: "filecacheDuration" }),
                      HttpTransferMode: D.m({ wire: "httpTransferMode" }),
                      NumRetries: D.m({ wire: "numRetries" }),
                      RestartDelay: D.m({ wire: "restartDelay" }),
                    },
                  }),
                },
              }),
              HlsId3SegmentTagging: D.m({ wire: "hlsId3SegmentTagging" }),
              IFrameOnlyPlaylists: D.m({ wire: "iFrameOnlyPlaylists" }),
              IncompleteSegmentBehavior: D.m({
                wire: "incompleteSegmentBehavior",
              }),
              IndexNSegments: D.m({ wire: "indexNSegments" }),
              InputLossAction: D.m({ wire: "inputLossAction" }),
              IvInManifest: D.m({ wire: "ivInManifest" }),
              IvSource: D.m({ wire: "ivSource" }),
              KeepSegments: D.m({ wire: "keepSegments" }),
              KeyFormat: D.m({ wire: "keyFormat" }),
              KeyFormatVersions: D.m({ wire: "keyFormatVersions" }),
              KeyProviderSettings: D.m({
                wire: "keyProviderSettings",
                shape: {
                  StaticKeySettings: D.m({
                    wire: "staticKeySettings",
                    shape: {
                      KeyProviderServer: D.m({
                        wire: "keyProviderServer",
                        shape: i_InputLocation,
                      }),
                      StaticKeyValue: D.m({ wire: "staticKeyValue" }),
                    },
                  }),
                },
              }),
              ManifestCompression: D.m({ wire: "manifestCompression" }),
              ManifestDurationFormat: D.m({ wire: "manifestDurationFormat" }),
              MinSegmentLength: D.m({ wire: "minSegmentLength" }),
              Mode: D.m({ wire: "mode" }),
              OutputSelection: D.m({ wire: "outputSelection" }),
              ProgramDateTime: D.m({ wire: "programDateTime" }),
              ProgramDateTimeClock: D.m({ wire: "programDateTimeClock" }),
              ProgramDateTimePeriod: D.m({ wire: "programDateTimePeriod" }),
              RedundantManifest: D.m({ wire: "redundantManifest" }),
              SegmentLength: D.m({ wire: "segmentLength" }),
              SegmentationMode: D.m({ wire: "segmentationMode" }),
              SegmentsPerSubdirectory: D.m({ wire: "segmentsPerSubdirectory" }),
              StreamInfResolution: D.m({ wire: "streamInfResolution" }),
              TimedMetadataId3Frame: D.m({ wire: "timedMetadataId3Frame" }),
              TimedMetadataId3Period: D.m({ wire: "timedMetadataId3Period" }),
              TimestampDeltaMilliseconds: D.m({
                wire: "timestampDeltaMilliseconds",
              }),
              TsFileMode: D.m({ wire: "tsFileMode" }),
            },
          }),
          MediaPackageGroupSettings: D.m({
            wire: "mediaPackageGroupSettings",
            shape: {
              Destination: D.m({
                wire: "destination",
                shape: i_OutputLocationRef,
              }),
              MediapackageV2GroupSettings: D.m({
                wire: "mediapackageV2GroupSettings",
                shape: {
                  CaptionLanguageMappings: D.m({
                    wire: "captionLanguageMappings",
                    shape: D.list(i_CaptionLanguageMapping),
                  }),
                  Id3Behavior: D.m({ wire: "id3Behavior" }),
                  KlvBehavior: D.m({ wire: "klvBehavior" }),
                  NielsenId3Behavior: D.m({ wire: "nielsenId3Behavior" }),
                  Scte35Type: D.m({ wire: "scte35Type" }),
                  SegmentLength: D.m({ wire: "segmentLength" }),
                  SegmentLengthUnits: D.m({ wire: "segmentLengthUnits" }),
                  TimedMetadataId3Frame: D.m({ wire: "timedMetadataId3Frame" }),
                  TimedMetadataId3Period: D.m({
                    wire: "timedMetadataId3Period",
                  }),
                  TimedMetadataPassthrough: D.m({
                    wire: "timedMetadataPassthrough",
                  }),
                  AdditionalDestinations: D.m({
                    wire: "additionalDestinations",
                    shape: D.list({
                      Destination: D.m({
                        wire: "destination",
                        shape: i_OutputLocationRef,
                      }),
                    }),
                  }),
                },
              }),
            },
          }),
          MsSmoothGroupSettings: D.m({
            wire: "msSmoothGroupSettings",
            shape: {
              AcquisitionPointId: D.m({ wire: "acquisitionPointId" }),
              AudioOnlyTimecodeControl: D.m({
                wire: "audioOnlyTimecodeControl",
              }),
              CertificateMode: D.m({ wire: "certificateMode" }),
              ConnectionRetryInterval: D.m({ wire: "connectionRetryInterval" }),
              Destination: D.m({
                wire: "destination",
                shape: i_OutputLocationRef,
              }),
              EventId: D.m({ wire: "eventId" }),
              EventIdMode: D.m({ wire: "eventIdMode" }),
              EventStopBehavior: D.m({ wire: "eventStopBehavior" }),
              FilecacheDuration: D.m({ wire: "filecacheDuration" }),
              FragmentLength: D.m({ wire: "fragmentLength" }),
              InputLossAction: D.m({ wire: "inputLossAction" }),
              NumRetries: D.m({ wire: "numRetries" }),
              RestartDelay: D.m({ wire: "restartDelay" }),
              SegmentationMode: D.m({ wire: "segmentationMode" }),
              SendDelayMs: D.m({ wire: "sendDelayMs" }),
              SparseTrackType: D.m({ wire: "sparseTrackType" }),
              StreamManifestBehavior: D.m({ wire: "streamManifestBehavior" }),
              TimestampOffset: D.m({ wire: "timestampOffset" }),
              TimestampOffsetMode: D.m({ wire: "timestampOffsetMode" }),
            },
          }),
          MultiplexGroupSettings: D.m({
            wire: "multiplexGroupSettings",
            shape: {},
          }),
          RtmpGroupSettings: D.m({
            wire: "rtmpGroupSettings",
            shape: {
              AdMarkers: D.m({ wire: "adMarkers" }),
              AuthenticationScheme: D.m({ wire: "authenticationScheme" }),
              CacheFullBehavior: D.m({ wire: "cacheFullBehavior" }),
              CacheLength: D.m({ wire: "cacheLength" }),
              CaptionData: D.m({ wire: "captionData" }),
              InputLossAction: D.m({ wire: "inputLossAction" }),
              RestartDelay: D.m({ wire: "restartDelay" }),
              IncludeFillerNalUnits: D.m({ wire: "includeFillerNalUnits" }),
            },
          }),
          UdpGroupSettings: D.m({
            wire: "udpGroupSettings",
            shape: {
              InputLossAction: D.m({ wire: "inputLossAction" }),
              TimedMetadataId3Frame: D.m({ wire: "timedMetadataId3Frame" }),
              TimedMetadataId3Period: D.m({ wire: "timedMetadataId3Period" }),
            },
          }),
          CmafIngestGroupSettings: D.m({
            wire: "cmafIngestGroupSettings",
            shape: {
              Destination: D.m({
                wire: "destination",
                shape: i_OutputLocationRef,
              }),
              NielsenId3Behavior: D.m({ wire: "nielsenId3Behavior" }),
              Scte35Type: D.m({ wire: "scte35Type" }),
              SegmentLength: D.m({ wire: "segmentLength" }),
              SegmentLengthUnits: D.m({ wire: "segmentLengthUnits" }),
              SendDelayMs: D.m({ wire: "sendDelayMs" }),
              KlvBehavior: D.m({ wire: "klvBehavior" }),
              KlvNameModifier: D.m({ wire: "klvNameModifier" }),
              NielsenId3NameModifier: D.m({ wire: "nielsenId3NameModifier" }),
              Scte35NameModifier: D.m({ wire: "scte35NameModifier" }),
              Id3Behavior: D.m({ wire: "id3Behavior" }),
              Id3NameModifier: D.m({ wire: "id3NameModifier" }),
              CaptionLanguageMappings: D.m({
                wire: "captionLanguageMappings",
                shape: D.list({
                  CaptionChannel: D.m({ wire: "captionChannel" }),
                  LanguageCode: D.m({ wire: "languageCode" }),
                }),
              }),
              TimedMetadataId3Frame: D.m({ wire: "timedMetadataId3Frame" }),
              TimedMetadataId3Period: D.m({ wire: "timedMetadataId3Period" }),
              TimedMetadataPassthrough: D.m({
                wire: "timedMetadataPassthrough",
              }),
              AdditionalDestinations: D.m({
                wire: "additionalDestinations",
                shape: D.list({
                  Destination: D.m({
                    wire: "destination",
                    shape: i_OutputLocationRef,
                  }),
                }),
              }),
            },
          }),
          SrtGroupSettings: D.m({
            wire: "srtGroupSettings",
            shape: { InputLossAction: D.m({ wire: "inputLossAction" }) },
          }),
          MediaConnectRouterGroupSettings: D.m({
            wire: "mediaConnectRouterGroupSettings",
            shape: { AvailabilityZones: D.m({ wire: "availabilityZones" }) },
          }),
        },
      }),
      Outputs: D.m({
        wire: "outputs",
        shape: D.list({
          AudioDescriptionNames: D.m({ wire: "audioDescriptionNames" }),
          CaptionDescriptionNames: D.m({ wire: "captionDescriptionNames" }),
          OutputName: D.m({ wire: "outputName" }),
          OutputSettings: D.m({
            wire: "outputSettings",
            shape: {
              ArchiveOutputSettings: D.m({
                wire: "archiveOutputSettings",
                shape: {
                  ContainerSettings: D.m({
                    wire: "containerSettings",
                    shape: {
                      M2tsSettings: D.m({
                        wire: "m2tsSettings",
                        shape: i_M2tsSettings,
                      }),
                      RawSettings: D.m({ wire: "rawSettings", shape: {} }),
                    },
                  }),
                  Extension: D.m({ wire: "extension" }),
                  NameModifier: D.m({ wire: "nameModifier" }),
                },
              }),
              FrameCaptureOutputSettings: D.m({
                wire: "frameCaptureOutputSettings",
                shape: { NameModifier: D.m({ wire: "nameModifier" }) },
              }),
              HlsOutputSettings: D.m({
                wire: "hlsOutputSettings",
                shape: {
                  H265PackagingType: D.m({ wire: "h265PackagingType" }),
                  HlsSettings: D.m({
                    wire: "hlsSettings",
                    shape: {
                      AudioOnlyHlsSettings: D.m({
                        wire: "audioOnlyHlsSettings",
                        shape: {
                          AudioGroupId: D.m({ wire: "audioGroupId" }),
                          AudioOnlyImage: D.m({
                            wire: "audioOnlyImage",
                            shape: i_InputLocation,
                          }),
                          AudioTrackType: D.m({ wire: "audioTrackType" }),
                          SegmentType: D.m({ wire: "segmentType" }),
                        },
                      }),
                      Fmp4HlsSettings: D.m({
                        wire: "fmp4HlsSettings",
                        shape: {
                          AudioRenditionSets: D.m({
                            wire: "audioRenditionSets",
                          }),
                          NielsenId3Behavior: D.m({
                            wire: "nielsenId3Behavior",
                          }),
                          TimedMetadataBehavior: D.m({
                            wire: "timedMetadataBehavior",
                          }),
                        },
                      }),
                      FrameCaptureHlsSettings: D.m({
                        wire: "frameCaptureHlsSettings",
                        shape: {},
                      }),
                      StandardHlsSettings: D.m({
                        wire: "standardHlsSettings",
                        shape: {
                          AudioRenditionSets: D.m({
                            wire: "audioRenditionSets",
                          }),
                          M3u8Settings: D.m({
                            wire: "m3u8Settings",
                            shape: {
                              AudioFramesPerPes: D.m({
                                wire: "audioFramesPerPes",
                              }),
                              AudioPids: D.m({ wire: "audioPids" }),
                              EcmPid: D.m({ wire: "ecmPid" }),
                              NielsenId3Behavior: D.m({
                                wire: "nielsenId3Behavior",
                              }),
                              PatInterval: D.m({ wire: "patInterval" }),
                              PcrControl: D.m({ wire: "pcrControl" }),
                              PcrPeriod: D.m({ wire: "pcrPeriod" }),
                              PcrPid: D.m({ wire: "pcrPid" }),
                              PmtInterval: D.m({ wire: "pmtInterval" }),
                              PmtPid: D.m({ wire: "pmtPid" }),
                              ProgramNum: D.m({ wire: "programNum" }),
                              Scte35Behavior: D.m({ wire: "scte35Behavior" }),
                              Scte35Pid: D.m({ wire: "scte35Pid" }),
                              TimedMetadataBehavior: D.m({
                                wire: "timedMetadataBehavior",
                              }),
                              TimedMetadataPid: D.m({
                                wire: "timedMetadataPid",
                              }),
                              TransportStreamId: D.m({
                                wire: "transportStreamId",
                              }),
                              VideoPid: D.m({ wire: "videoPid" }),
                              KlvBehavior: D.m({ wire: "klvBehavior" }),
                              KlvDataPids: D.m({ wire: "klvDataPids" }),
                            },
                          }),
                        },
                      }),
                    },
                  }),
                  NameModifier: D.m({ wire: "nameModifier" }),
                  SegmentModifier: D.m({ wire: "segmentModifier" }),
                },
              }),
              MediaPackageOutputSettings: D.m({
                wire: "mediaPackageOutputSettings",
                shape: {
                  MediaPackageV2DestinationSettings: D.m({
                    wire: "mediaPackageV2DestinationSettings",
                    shape: {
                      AudioGroupId: D.m({ wire: "audioGroupId" }),
                      AudioRenditionSets: D.m({ wire: "audioRenditionSets" }),
                      HlsAutoSelect: D.m({ wire: "hlsAutoSelect" }),
                      HlsDefault: D.m({ wire: "hlsDefault" }),
                    },
                  }),
                },
              }),
              MsSmoothOutputSettings: D.m({
                wire: "msSmoothOutputSettings",
                shape: {
                  H265PackagingType: D.m({ wire: "h265PackagingType" }),
                  NameModifier: D.m({ wire: "nameModifier" }),
                },
              }),
              MultiplexOutputSettings: D.m({
                wire: "multiplexOutputSettings",
                shape: {
                  Destination: D.m({
                    wire: "destination",
                    shape: i_OutputLocationRef,
                  }),
                  ContainerSettings: D.m({
                    wire: "containerSettings",
                    shape: {
                      MultiplexM2tsSettings: D.m({
                        wire: "multiplexM2tsSettings",
                        shape: {
                          AbsentInputAudioBehavior: D.m({
                            wire: "absentInputAudioBehavior",
                          }),
                          Arib: D.m({ wire: "arib" }),
                          AudioBufferModel: D.m({ wire: "audioBufferModel" }),
                          AudioFramesPerPes: D.m({ wire: "audioFramesPerPes" }),
                          AudioStreamType: D.m({ wire: "audioStreamType" }),
                          CcDescriptor: D.m({ wire: "ccDescriptor" }),
                          Ebif: D.m({ wire: "ebif" }),
                          EsRateInPes: D.m({ wire: "esRateInPes" }),
                          Klv: D.m({ wire: "klv" }),
                          NielsenId3Behavior: D.m({
                            wire: "nielsenId3Behavior",
                          }),
                          PcrControl: D.m({ wire: "pcrControl" }),
                          PcrPeriod: D.m({ wire: "pcrPeriod" }),
                          Scte35Control: D.m({ wire: "scte35Control" }),
                          Scte35PrerollPullupMilliseconds: D.m({
                            wire: "scte35PrerollPullupMilliseconds",
                          }),
                        },
                      }),
                    },
                  }),
                },
              }),
              RtmpOutputSettings: D.m({
                wire: "rtmpOutputSettings",
                shape: {
                  CertificateMode: D.m({ wire: "certificateMode" }),
                  ConnectionRetryInterval: D.m({
                    wire: "connectionRetryInterval",
                  }),
                  Destination: D.m({
                    wire: "destination",
                    shape: i_OutputLocationRef,
                  }),
                  NumRetries: D.m({ wire: "numRetries" }),
                },
              }),
              UdpOutputSettings: D.m({
                wire: "udpOutputSettings",
                shape: {
                  BufferMsec: D.m({ wire: "bufferMsec" }),
                  ContainerSettings: D.m({
                    wire: "containerSettings",
                    shape: i_UdpContainerSettings,
                  }),
                  Destination: D.m({
                    wire: "destination",
                    shape: i_OutputLocationRef,
                  }),
                  FecOutputSettings: D.m({
                    wire: "fecOutputSettings",
                    shape: {
                      ColumnDepth: D.m({ wire: "columnDepth" }),
                      IncludeFec: D.m({ wire: "includeFec" }),
                      RowLength: D.m({ wire: "rowLength" }),
                    },
                  }),
                },
              }),
              CmafIngestOutputSettings: D.m({
                wire: "cmafIngestOutputSettings",
                shape: { NameModifier: D.m({ wire: "nameModifier" }) },
              }),
              SrtOutputSettings: D.m({
                wire: "srtOutputSettings",
                shape: {
                  BufferMsec: D.m({ wire: "bufferMsec" }),
                  ContainerSettings: D.m({
                    wire: "containerSettings",
                    shape: i_UdpContainerSettings,
                  }),
                  Destination: D.m({
                    wire: "destination",
                    shape: i_OutputLocationRef,
                  }),
                  EncryptionType: D.m({ wire: "encryptionType" }),
                  Latency: D.m({ wire: "latency" }),
                },
              }),
              MediaConnectRouterOutputSettings: D.m({
                wire: "mediaConnectRouterOutputSettings",
                shape: {
                  ConnectedRouterInputs: D.m({
                    wire: "connectedRouterInputs",
                    shape: {
                      Pipeline0: D.m({ wire: "pipeline0" }),
                      Pipeline1: D.m({ wire: "pipeline1" }),
                    },
                  }),
                  ContainerSettings: D.m({
                    wire: "containerSettings",
                    shape: {
                      M2tsSettings: D.m({
                        wire: "m2tsSettings",
                        shape: i_M2tsSettings,
                      }),
                    },
                  }),
                  Destination: D.m({
                    wire: "destination",
                    shape: i_OutputLocationRef,
                  }),
                },
              }),
            },
          }),
          VideoDescriptionName: D.m({ wire: "videoDescriptionName" }),
        }),
      }),
    }),
  }),
  TimecodeConfig: D.m({
    wire: "timecodeConfig",
    shape: {
      Source: D.m({ wire: "source" }),
      SyncThreshold: D.m({ wire: "syncThreshold" }),
    },
  }),
  VideoDescriptions: D.m({
    wire: "videoDescriptions",
    shape: D.list({
      CodecSettings: D.m({
        wire: "codecSettings",
        shape: {
          FrameCaptureSettings: D.m({
            wire: "frameCaptureSettings",
            shape: {
              CaptureInterval: D.m({ wire: "captureInterval" }),
              CaptureIntervalUnits: D.m({ wire: "captureIntervalUnits" }),
              TimecodeBurninSettings: D.m({
                wire: "timecodeBurninSettings",
                shape: i_TimecodeBurninSettings,
              }),
            },
          }),
          H264Settings: D.m({
            wire: "h264Settings",
            shape: {
              AdaptiveQuantization: D.m({ wire: "adaptiveQuantization" }),
              AfdSignaling: D.m({ wire: "afdSignaling" }),
              Bitrate: D.m({ wire: "bitrate" }),
              BufFillPct: D.m({ wire: "bufFillPct" }),
              BufSize: D.m({ wire: "bufSize" }),
              ColorMetadata: D.m({ wire: "colorMetadata" }),
              ColorSpaceSettings: D.m({
                wire: "colorSpaceSettings",
                shape: {
                  ColorSpacePassthroughSettings: D.m({
                    wire: "colorSpacePassthroughSettings",
                    shape: i_ColorSpacePassthroughSettings,
                  }),
                  Rec601Settings: D.m({
                    wire: "rec601Settings",
                    shape: i_Rec601Settings,
                  }),
                  Rec709Settings: D.m({
                    wire: "rec709Settings",
                    shape: i_Rec709Settings,
                  }),
                },
              }),
              EntropyEncoding: D.m({ wire: "entropyEncoding" }),
              FilterSettings: D.m({
                wire: "filterSettings",
                shape: {
                  TemporalFilterSettings: D.m({
                    wire: "temporalFilterSettings",
                    shape: i_TemporalFilterSettings,
                  }),
                  BandwidthReductionFilterSettings: D.m({
                    wire: "bandwidthReductionFilterSettings",
                    shape: i_BandwidthReductionFilterSettings,
                  }),
                },
              }),
              FixedAfd: D.m({ wire: "fixedAfd" }),
              FlickerAq: D.m({ wire: "flickerAq" }),
              ForceFieldPictures: D.m({ wire: "forceFieldPictures" }),
              FramerateControl: D.m({ wire: "framerateControl" }),
              FramerateDenominator: D.m({ wire: "framerateDenominator" }),
              FramerateNumerator: D.m({ wire: "framerateNumerator" }),
              GopBReference: D.m({ wire: "gopBReference" }),
              GopClosedCadence: D.m({ wire: "gopClosedCadence" }),
              GopNumBFrames: D.m({ wire: "gopNumBFrames" }),
              GopSize: D.m({ wire: "gopSize" }),
              GopSizeUnits: D.m({ wire: "gopSizeUnits" }),
              Level: D.m({ wire: "level" }),
              LookAheadRateControl: D.m({ wire: "lookAheadRateControl" }),
              MaxBitrate: D.m({ wire: "maxBitrate" }),
              MinIInterval: D.m({ wire: "minIInterval" }),
              NumRefFrames: D.m({ wire: "numRefFrames" }),
              ParControl: D.m({ wire: "parControl" }),
              ParDenominator: D.m({ wire: "parDenominator" }),
              ParNumerator: D.m({ wire: "parNumerator" }),
              Profile: D.m({ wire: "profile" }),
              QualityLevel: D.m({ wire: "qualityLevel" }),
              QvbrQualityLevel: D.m({ wire: "qvbrQualityLevel" }),
              RateControlMode: D.m({ wire: "rateControlMode" }),
              ScanType: D.m({ wire: "scanType" }),
              SceneChangeDetect: D.m({ wire: "sceneChangeDetect" }),
              Slices: D.m({ wire: "slices" }),
              Softness: D.m({ wire: "softness" }),
              SpatialAq: D.m({ wire: "spatialAq" }),
              SubgopLength: D.m({ wire: "subgopLength" }),
              Syntax: D.m({ wire: "syntax" }),
              TemporalAq: D.m({ wire: "temporalAq" }),
              TimecodeInsertion: D.m({ wire: "timecodeInsertion" }),
              TimecodeBurninSettings: D.m({
                wire: "timecodeBurninSettings",
                shape: i_TimecodeBurninSettings,
              }),
              MinQp: D.m({ wire: "minQp" }),
              MinBitrate: D.m({ wire: "minBitrate" }),
            },
          }),
          H265Settings: D.m({
            wire: "h265Settings",
            shape: {
              AdaptiveQuantization: D.m({ wire: "adaptiveQuantization" }),
              AfdSignaling: D.m({ wire: "afdSignaling" }),
              AlternativeTransferFunction: D.m({
                wire: "alternativeTransferFunction",
              }),
              Bitrate: D.m({ wire: "bitrate" }),
              BufSize: D.m({ wire: "bufSize" }),
              ColorMetadata: D.m({ wire: "colorMetadata" }),
              ColorSpaceSettings: D.m({
                wire: "colorSpaceSettings",
                shape: {
                  ColorSpacePassthroughSettings: D.m({
                    wire: "colorSpacePassthroughSettings",
                    shape: i_ColorSpacePassthroughSettings,
                  }),
                  DolbyVision81Settings: D.m({
                    wire: "dolbyVision81Settings",
                    shape: {},
                  }),
                  Hdr10Settings: D.m({
                    wire: "hdr10Settings",
                    shape: i_Hdr10Settings,
                  }),
                  Rec601Settings: D.m({
                    wire: "rec601Settings",
                    shape: i_Rec601Settings,
                  }),
                  Rec709Settings: D.m({
                    wire: "rec709Settings",
                    shape: i_Rec709Settings,
                  }),
                  Hlg2020Settings: D.m({
                    wire: "hlg2020Settings",
                    shape: i_Hlg2020Settings,
                  }),
                },
              }),
              FilterSettings: D.m({
                wire: "filterSettings",
                shape: {
                  TemporalFilterSettings: D.m({
                    wire: "temporalFilterSettings",
                    shape: i_TemporalFilterSettings,
                  }),
                  BandwidthReductionFilterSettings: D.m({
                    wire: "bandwidthReductionFilterSettings",
                    shape: i_BandwidthReductionFilterSettings,
                  }),
                },
              }),
              FixedAfd: D.m({ wire: "fixedAfd" }),
              FlickerAq: D.m({ wire: "flickerAq" }),
              FramerateDenominator: D.m({ wire: "framerateDenominator" }),
              FramerateNumerator: D.m({ wire: "framerateNumerator" }),
              GopClosedCadence: D.m({ wire: "gopClosedCadence" }),
              GopSize: D.m({ wire: "gopSize" }),
              GopSizeUnits: D.m({ wire: "gopSizeUnits" }),
              Level: D.m({ wire: "level" }),
              LookAheadRateControl: D.m({ wire: "lookAheadRateControl" }),
              MaxBitrate: D.m({ wire: "maxBitrate" }),
              MinIInterval: D.m({ wire: "minIInterval" }),
              ParDenominator: D.m({ wire: "parDenominator" }),
              ParNumerator: D.m({ wire: "parNumerator" }),
              Profile: D.m({ wire: "profile" }),
              QvbrQualityLevel: D.m({ wire: "qvbrQualityLevel" }),
              RateControlMode: D.m({ wire: "rateControlMode" }),
              ScanType: D.m({ wire: "scanType" }),
              SceneChangeDetect: D.m({ wire: "sceneChangeDetect" }),
              Slices: D.m({ wire: "slices" }),
              Tier: D.m({ wire: "tier" }),
              TimecodeInsertion: D.m({ wire: "timecodeInsertion" }),
              TimecodeBurninSettings: D.m({
                wire: "timecodeBurninSettings",
                shape: i_TimecodeBurninSettings,
              }),
              MvOverPictureBoundaries: D.m({ wire: "mvOverPictureBoundaries" }),
              MvTemporalPredictor: D.m({ wire: "mvTemporalPredictor" }),
              TileHeight: D.m({ wire: "tileHeight" }),
              TilePadding: D.m({ wire: "tilePadding" }),
              TileWidth: D.m({ wire: "tileWidth" }),
              TreeblockSize: D.m({ wire: "treeblockSize" }),
              MinQp: D.m({ wire: "minQp" }),
              Deblocking: D.m({ wire: "deblocking" }),
              GopBReference: D.m({ wire: "gopBReference" }),
              GopNumBFrames: D.m({ wire: "gopNumBFrames" }),
              MinBitrate: D.m({ wire: "minBitrate" }),
              SubgopLength: D.m({ wire: "subgopLength" }),
            },
          }),
          Mpeg2Settings: D.m({
            wire: "mpeg2Settings",
            shape: {
              AdaptiveQuantization: D.m({ wire: "adaptiveQuantization" }),
              AfdSignaling: D.m({ wire: "afdSignaling" }),
              ColorMetadata: D.m({ wire: "colorMetadata" }),
              ColorSpace: D.m({ wire: "colorSpace" }),
              DisplayAspectRatio: D.m({ wire: "displayAspectRatio" }),
              FilterSettings: D.m({
                wire: "filterSettings",
                shape: {
                  TemporalFilterSettings: D.m({
                    wire: "temporalFilterSettings",
                    shape: i_TemporalFilterSettings,
                  }),
                },
              }),
              FixedAfd: D.m({ wire: "fixedAfd" }),
              FramerateDenominator: D.m({ wire: "framerateDenominator" }),
              FramerateNumerator: D.m({ wire: "framerateNumerator" }),
              GopClosedCadence: D.m({ wire: "gopClosedCadence" }),
              GopNumBFrames: D.m({ wire: "gopNumBFrames" }),
              GopSize: D.m({ wire: "gopSize" }),
              GopSizeUnits: D.m({ wire: "gopSizeUnits" }),
              ScanType: D.m({ wire: "scanType" }),
              SubgopLength: D.m({ wire: "subgopLength" }),
              TimecodeInsertion: D.m({ wire: "timecodeInsertion" }),
              TimecodeBurninSettings: D.m({
                wire: "timecodeBurninSettings",
                shape: i_TimecodeBurninSettings,
              }),
            },
          }),
          Av1Settings: D.m({
            wire: "av1Settings",
            shape: {
              AfdSignaling: D.m({ wire: "afdSignaling" }),
              BufSize: D.m({ wire: "bufSize" }),
              ColorSpaceSettings: D.m({
                wire: "colorSpaceSettings",
                shape: {
                  ColorSpacePassthroughSettings: D.m({
                    wire: "colorSpacePassthroughSettings",
                    shape: i_ColorSpacePassthroughSettings,
                  }),
                  Hdr10Settings: D.m({
                    wire: "hdr10Settings",
                    shape: i_Hdr10Settings,
                  }),
                  Rec601Settings: D.m({
                    wire: "rec601Settings",
                    shape: i_Rec601Settings,
                  }),
                  Rec709Settings: D.m({
                    wire: "rec709Settings",
                    shape: i_Rec709Settings,
                  }),
                  Hlg2020Settings: D.m({
                    wire: "hlg2020Settings",
                    shape: i_Hlg2020Settings,
                  }),
                },
              }),
              FixedAfd: D.m({ wire: "fixedAfd" }),
              FramerateDenominator: D.m({ wire: "framerateDenominator" }),
              FramerateNumerator: D.m({ wire: "framerateNumerator" }),
              GopSize: D.m({ wire: "gopSize" }),
              GopSizeUnits: D.m({ wire: "gopSizeUnits" }),
              Level: D.m({ wire: "level" }),
              LookAheadRateControl: D.m({ wire: "lookAheadRateControl" }),
              MaxBitrate: D.m({ wire: "maxBitrate" }),
              MinIInterval: D.m({ wire: "minIInterval" }),
              ParDenominator: D.m({ wire: "parDenominator" }),
              ParNumerator: D.m({ wire: "parNumerator" }),
              QvbrQualityLevel: D.m({ wire: "qvbrQualityLevel" }),
              SceneChangeDetect: D.m({ wire: "sceneChangeDetect" }),
              TimecodeBurninSettings: D.m({
                wire: "timecodeBurninSettings",
                shape: i_TimecodeBurninSettings,
              }),
              Bitrate: D.m({ wire: "bitrate" }),
              RateControlMode: D.m({ wire: "rateControlMode" }),
              MinBitrate: D.m({ wire: "minBitrate" }),
              SpatialAq: D.m({ wire: "spatialAq" }),
              TemporalAq: D.m({ wire: "temporalAq" }),
              TimecodeInsertion: D.m({ wire: "timecodeInsertion" }),
              BitDepth: D.m({ wire: "bitDepth" }),
            },
          }),
        },
      }),
      Height: D.m({ wire: "height" }),
      Name: D.m({ wire: "name" }),
      RespondToAfd: D.m({ wire: "respondToAfd" }),
      ScalingBehavior: D.m({ wire: "scalingBehavior" }),
      Sharpness: D.m({ wire: "sharpness" }),
      Width: D.m({ wire: "width" }),
      CropRectangle: D.m({
        wire: "cropRectangle",
        shape: i_VideoPositionRectangle,
      }),
      OutputPositionRectangle: D.m({
        wire: "outputPositionRectangle",
        shape: i_VideoPositionRectangle,
      }),
    }),
  }),
  ThumbnailConfiguration: D.m({
    wire: "thumbnailConfiguration",
    shape: { State: D.m({ wire: "state" }) },
  }),
  ColorCorrectionSettings: D.m({
    wire: "colorCorrectionSettings",
    shape: {
      GlobalColorCorrections: D.m({
        wire: "globalColorCorrections",
        shape: D.list({
          InputColorSpace: D.m({ wire: "inputColorSpace" }),
          OutputColorSpace: D.m({ wire: "outputColorSpace" }),
          Uri: D.m({ wire: "uri" }),
        }),
      }),
    },
  }),
});
const i_EventBridgeRuleTemplateTarget: D.LazyStruct = () => ({
  Arn: D.m({ wire: "arn" }),
});
const i_InferenceSettings: D.LazyStruct = () => ({
  FeedArn: D.m({ wire: "feedArn" }),
  AudioFeedInputs: D.m({
    wire: "audioFeedInputs",
    shape: D.list({
      AudioSelectorName: D.m({ wire: "audioSelectorName" }),
      FeedInput: D.m({ wire: "feedInput" }),
    }),
  }),
});
const i_InputAttachment: D.LazyStruct = () => ({
  AutomaticInputFailoverSettings: D.m({
    wire: "automaticInputFailoverSettings",
    shape: {
      ErrorClearTimeMsec: D.m({ wire: "errorClearTimeMsec" }),
      FailoverConditions: D.m({
        wire: "failoverConditions",
        shape: D.list({
          FailoverConditionSettings: D.m({
            wire: "failoverConditionSettings",
            shape: {
              AudioSilenceSettings: D.m({
                wire: "audioSilenceSettings",
                shape: {
                  AudioSelectorName: D.m({ wire: "audioSelectorName" }),
                  AudioSilenceThresholdMsec: D.m({
                    wire: "audioSilenceThresholdMsec",
                  }),
                },
              }),
              InputLossSettings: D.m({
                wire: "inputLossSettings",
                shape: {
                  InputLossThresholdMsec: D.m({
                    wire: "inputLossThresholdMsec",
                  }),
                },
              }),
              VideoBlackSettings: D.m({
                wire: "videoBlackSettings",
                shape: {
                  BlackDetectThreshold: D.m({ wire: "blackDetectThreshold" }),
                  VideoBlackThresholdMsec: D.m({
                    wire: "videoBlackThresholdMsec",
                  }),
                },
              }),
            },
          }),
        }),
      }),
      InputPreference: D.m({ wire: "inputPreference" }),
      SecondaryInputId: D.m({ wire: "secondaryInputId" }),
    },
  }),
  InputAttachmentName: D.m({ wire: "inputAttachmentName" }),
  InputId: D.m({ wire: "inputId" }),
  InputSettings: D.m({
    wire: "inputSettings",
    shape: {
      AudioSelectors: D.m({
        wire: "audioSelectors",
        shape: D.list({
          Name: D.m({ wire: "name" }),
          SelectorSettings: D.m({
            wire: "selectorSettings",
            shape: {
              AudioHlsRenditionSelection: D.m({
                wire: "audioHlsRenditionSelection",
                shape: {
                  GroupId: D.m({ wire: "groupId" }),
                  Name: D.m({ wire: "name" }),
                },
              }),
              AudioLanguageSelection: D.m({
                wire: "audioLanguageSelection",
                shape: {
                  LanguageCode: D.m({ wire: "languageCode" }),
                  LanguageSelectionPolicy: D.m({
                    wire: "languageSelectionPolicy",
                  }),
                },
              }),
              AudioPidSelection: D.m({
                wire: "audioPidSelection",
                shape: {
                  Pid: D.m({ wire: "pid" }),
                  Pids: D.m({
                    wire: "pids",
                    shape: D.list({
                      DolbyEDecode: D.m({
                        wire: "dolbyEDecode",
                        shape: i_AudioDolbyEDecode,
                      }),
                      Pid: D.m({ wire: "pid" }),
                      PremixSettings: D.m({
                        wire: "premixSettings",
                        shape: i_AudioPreMixerSettings,
                      }),
                    }),
                  }),
                },
              }),
              AudioTrackSelection: D.m({
                wire: "audioTrackSelection",
                shape: {
                  Tracks: D.m({
                    wire: "tracks",
                    shape: D.list({
                      Track: D.m({ wire: "track" }),
                      PremixSettings: D.m({
                        wire: "premixSettings",
                        shape: i_AudioPreMixerSettings,
                      }),
                    }),
                  }),
                  DolbyEDecode: D.m({
                    wire: "dolbyEDecode",
                    shape: i_AudioDolbyEDecode,
                  }),
                },
              }),
            },
          }),
        }),
      }),
      CaptionSelectors: D.m({
        wire: "captionSelectors",
        shape: D.list({
          LanguageCode: D.m({ wire: "languageCode" }),
          Name: D.m({ wire: "name" }),
          SelectorSettings: D.m({
            wire: "selectorSettings",
            shape: {
              AncillarySourceSettings: D.m({
                wire: "ancillarySourceSettings",
                shape: {
                  SourceAncillaryChannelNumber: D.m({
                    wire: "sourceAncillaryChannelNumber",
                  }),
                },
              }),
              AribSourceSettings: D.m({
                wire: "aribSourceSettings",
                shape: {},
              }),
              DvbSubSourceSettings: D.m({
                wire: "dvbSubSourceSettings",
                shape: {
                  OcrLanguage: D.m({ wire: "ocrLanguage" }),
                  Pid: D.m({ wire: "pid" }),
                },
              }),
              EmbeddedSourceSettings: D.m({
                wire: "embeddedSourceSettings",
                shape: {
                  Convert608To708: D.m({ wire: "convert608To708" }),
                  Scte20Detection: D.m({ wire: "scte20Detection" }),
                  Source608ChannelNumber: D.m({
                    wire: "source608ChannelNumber",
                  }),
                  Source608TrackNumber: D.m({ wire: "source608TrackNumber" }),
                },
              }),
              Scte20SourceSettings: D.m({
                wire: "scte20SourceSettings",
                shape: {
                  Convert608To708: D.m({ wire: "convert608To708" }),
                  Source608ChannelNumber: D.m({
                    wire: "source608ChannelNumber",
                  }),
                },
              }),
              Scte27SourceSettings: D.m({
                wire: "scte27SourceSettings",
                shape: {
                  OcrLanguage: D.m({ wire: "ocrLanguage" }),
                  Pid: D.m({ wire: "pid" }),
                },
              }),
              TeletextSourceSettings: D.m({
                wire: "teletextSourceSettings",
                shape: {
                  OutputRectangle: D.m({
                    wire: "outputRectangle",
                    shape: {
                      Height: D.m({ wire: "height" }),
                      LeftOffset: D.m({ wire: "leftOffset" }),
                      TopOffset: D.m({ wire: "topOffset" }),
                      Width: D.m({ wire: "width" }),
                    },
                  }),
                  PageNumber: D.m({ wire: "pageNumber" }),
                },
              }),
              SmartSubtitleSourceSettings: D.m({
                wire: "smartSubtitleSourceSettings",
                shape: {
                  CaptionSynchronizationMode: D.m({
                    wire: "captionSynchronizationMode",
                  }),
                  InferenceFeedOutput: D.m({ wire: "inferenceFeedOutput" }),
                },
              }),
            },
          }),
        }),
      }),
      DeblockFilter: D.m({ wire: "deblockFilter" }),
      DenoiseFilter: D.m({ wire: "denoiseFilter" }),
      FilterStrength: D.m({ wire: "filterStrength" }),
      InputFilter: D.m({ wire: "inputFilter" }),
      NetworkInputSettings: D.m({
        wire: "networkInputSettings",
        shape: {
          HlsInputSettings: D.m({
            wire: "hlsInputSettings",
            shape: {
              Bandwidth: D.m({ wire: "bandwidth" }),
              BufferSegments: D.m({ wire: "bufferSegments" }),
              Retries: D.m({ wire: "retries" }),
              RetryInterval: D.m({ wire: "retryInterval" }),
              Scte35Source: D.m({ wire: "scte35Source" }),
            },
          }),
          ServerValidation: D.m({ wire: "serverValidation" }),
          MulticastInputSettings: D.m({
            wire: "multicastInputSettings",
            shape: { SourceIpAddress: D.m({ wire: "sourceIpAddress" }) },
          }),
        },
      }),
      Scte35Pid: D.m({ wire: "scte35Pid" }),
      Smpte2038DataPreference: D.m({ wire: "smpte2038DataPreference" }),
      SourceEndBehavior: D.m({ wire: "sourceEndBehavior" }),
      VideoSelector: D.m({
        wire: "videoSelector",
        shape: {
          ColorSpace: D.m({ wire: "colorSpace" }),
          ColorSpaceSettings: D.m({
            wire: "colorSpaceSettings",
            shape: {
              Hdr10Settings: D.m({
                wire: "hdr10Settings",
                shape: i_Hdr10Settings,
              }),
            },
          }),
          ColorSpaceUsage: D.m({ wire: "colorSpaceUsage" }),
          SelectorSettings: D.m({
            wire: "selectorSettings",
            shape: {
              VideoSelectorPid: D.m({
                wire: "videoSelectorPid",
                shape: { Pid: D.m({ wire: "pid" }) },
              }),
              VideoSelectorProgramId: D.m({
                wire: "videoSelectorProgramId",
                shape: { ProgramId: D.m({ wire: "programId" }) },
              }),
            },
          }),
        },
      }),
    },
  }),
  LogicalInterfaceNames: D.m({ wire: "logicalInterfaceNames" }),
});
const i_InputClippingSettings: D.LazyStruct = () => ({
  InputTimecodeSource: D.m({ wire: "inputTimecodeSource" }),
  StartTimecode: D.m({
    wire: "startTimecode",
    shape: { Timecode: D.m({ wire: "timecode" }) },
  }),
  StopTimecode: D.m({
    wire: "stopTimecode",
    shape: {
      LastFrameClippingBehavior: D.m({ wire: "lastFrameClippingBehavior" }),
      Timecode: D.m({ wire: "timecode" }),
    },
  }),
});
const i_InputDestinationRequest: D.LazyStruct = () => ({
  StreamName: D.m({ wire: "streamName" }),
  Network: D.m({ wire: "network" }),
  NetworkRoutes: D.m({
    wire: "networkRoutes",
    shape: D.list({
      Cidr: D.m({ wire: "cidr" }),
      Gateway: D.m({ wire: "gateway" }),
    }),
  }),
  StaticIpAddress: D.m({ wire: "staticIpAddress" }),
});
const i_InputDeviceConfigurableSettings: D.LazyStruct = () => ({
  ConfiguredInput: D.m({ wire: "configuredInput" }),
  MaxBitrate: D.m({ wire: "maxBitrate" }),
  LatencyMs: D.m({ wire: "latencyMs" }),
  Codec: D.m({ wire: "codec" }),
  MediaconnectSettings: D.m({
    wire: "mediaconnectSettings",
    shape: {
      FlowArn: D.m({ wire: "flowArn" }),
      RoleArn: D.m({ wire: "roleArn" }),
      SecretArn: D.m({ wire: "secretArn" }),
      SourceName: D.m({ wire: "sourceName" }),
    },
  }),
  AudioChannelPairs: D.m({
    wire: "audioChannelPairs",
    shape: D.list({
      Id: D.m({ wire: "id" }),
      Profile: D.m({ wire: "profile" }),
    }),
  }),
  InputResolution: D.m({ wire: "inputResolution" }),
});
const i_InputLocation: D.LazyStruct = () => ({
  PasswordParam: D.m({ wire: "passwordParam" }),
  Uri: D.m({ wire: "uri" }),
  Username: D.m({ wire: "username" }),
});
const i_InputSourceRequest: D.LazyStruct = () => ({
  PasswordParam: D.m({ wire: "passwordParam" }),
  Url: D.m({ wire: "url" }),
  Username: D.m({ wire: "username" }),
});
const i_InputSpecification: D.LazyStruct = () => ({
  Codec: D.m({ wire: "codec" }),
  MaximumBitrate: D.m({ wire: "maximumBitrate" }),
  Resolution: D.m({ wire: "resolution" }),
});
const i_InputWhitelistRuleCidr: D.LazyStruct = () => ({
  Cidr: D.m({ wire: "cidr" }),
});
const i_LinkedChannelSettings: D.LazyStruct = () => ({
  FollowerChannelSettings: D.m({
    wire: "followerChannelSettings",
    shape: {
      LinkedChannelType: D.m({ wire: "linkedChannelType" }),
      PrimaryChannelArn: D.m({ wire: "primaryChannelArn" }),
    },
  }),
  PrimaryChannelSettings: D.m({
    wire: "primaryChannelSettings",
    shape: { LinkedChannelType: D.m({ wire: "linkedChannelType" }) },
  }),
});
const i_MediaConnectFlowRequest: D.LazyStruct = () => ({
  FlowArn: D.m({ wire: "flowArn" }),
});
const i_MultiplexProgramSettings: D.LazyStruct = () => ({
  PreferredChannelPipeline: D.m({ wire: "preferredChannelPipeline" }),
  ProgramNumber: D.m({ wire: "programNumber" }),
  ServiceDescriptor: D.m({
    wire: "serviceDescriptor",
    shape: {
      ProviderName: D.m({ wire: "providerName" }),
      ServiceName: D.m({ wire: "serviceName" }),
    },
  }),
  VideoSettings: D.m({
    wire: "videoSettings",
    shape: {
      ConstantBitrate: D.m({ wire: "constantBitrate" }),
      StatmuxSettings: D.m({
        wire: "statmuxSettings",
        shape: {
          MaximumBitrate: D.m({ wire: "maximumBitrate" }),
          MinimumBitrate: D.m({ wire: "minimumBitrate" }),
          Priority: D.m({ wire: "priority" }),
        },
      }),
    },
  }),
});
const i_MultiplexSettings: D.LazyStruct = () => ({
  MaximumVideoBufferDelayMilliseconds: D.m({
    wire: "maximumVideoBufferDelayMilliseconds",
  }),
  TransportStreamBitrate: D.m({ wire: "transportStreamBitrate" }),
  TransportStreamId: D.m({ wire: "transportStreamId" }),
  TransportStreamReservedBitrate: D.m({
    wire: "transportStreamReservedBitrate",
  }),
});
const i_OutputDestination: D.LazyStruct = () => ({
  Id: D.m({ wire: "id" }),
  MediaPackageSettings: D.m({
    wire: "mediaPackageSettings",
    shape: D.list({
      ChannelId: D.m({ wire: "channelId" }),
      ChannelGroup: D.m({ wire: "channelGroup" }),
      ChannelName: D.m({ wire: "channelName" }),
      ChannelEndpointId: D.m({ wire: "channelEndpointId" }),
      MediaPackageRegionName: D.m({ wire: "mediaPackageRegionName" }),
    }),
  }),
  MultiplexSettings: D.m({
    wire: "multiplexSettings",
    shape: {
      MultiplexId: D.m({ wire: "multiplexId" }),
      ProgramName: D.m({ wire: "programName" }),
    },
  }),
  Settings: D.m({
    wire: "settings",
    shape: D.list({
      PasswordParam: D.m({ wire: "passwordParam" }),
      StreamName: D.m({ wire: "streamName" }),
      Url: D.m({ wire: "url" }),
      Username: D.m({ wire: "username" }),
      VirtualSourceAddress: D.m({ wire: "virtualSourceAddress" }),
    }),
  }),
  SrtSettings: D.m({
    wire: "srtSettings",
    shape: D.list({
      EncryptionPassphraseSecretArn: D.m({
        wire: "encryptionPassphraseSecretArn",
      }),
      StreamId: D.m({ wire: "streamId" }),
      Url: D.m({ wire: "url" }),
      ConnectionMode: D.m({ wire: "connectionMode" }),
      ListenerPort: D.m({ wire: "listenerPort" }),
    }),
  }),
  LogicalInterfaceNames: D.m({ wire: "logicalInterfaceNames" }),
  MediaConnectRouterSettings: D.m({
    wire: "mediaConnectRouterSettings",
    shape: D.list({
      EncryptionType: D.m({ wire: "encryptionType" }),
      SecretArn: D.m({ wire: "secretArn" }),
    }),
  }),
});
const i_RenewalSettings: D.LazyStruct = () => ({
  AutomaticRenewal: D.m({ wire: "automaticRenewal" }),
  RenewalCount: D.m({ wire: "renewalCount" }),
});
const i_Smpte2110ReceiverGroupSettings: D.LazyStruct = () => ({
  Smpte2110ReceiverGroups: D.m({
    wire: "smpte2110ReceiverGroups",
    shape: D.list({
      SdpSettings: D.m({
        wire: "sdpSettings",
        shape: {
          AncillarySdps: D.m({
            wire: "ancillarySdps",
            shape: D.list(i_InputSdpLocation),
          }),
          AudioSdps: D.m({
            wire: "audioSdps",
            shape: D.list(i_InputSdpLocation),
          }),
          VideoSdp: D.m({ wire: "videoSdp", shape: i_InputSdpLocation }),
        },
      }),
    }),
  }),
});
const i_SpecialRouterSettings: D.LazyStruct = () => ({
  RouterArn: D.m({ wire: "routerArn" }),
});
const i_SrtSettingsRequest: D.LazyStruct = () => ({
  SrtCallerSources: D.m({
    wire: "srtCallerSources",
    shape: D.list({
      Decryption: D.m({
        wire: "decryption",
        shape: {
          Algorithm: D.m({ wire: "algorithm" }),
          PassphraseSecretArn: D.m({ wire: "passphraseSecretArn" }),
        },
      }),
      MinimumLatency: D.m({ wire: "minimumLatency" }),
      SrtListenerAddress: D.m({ wire: "srtListenerAddress" }),
      SrtListenerPort: D.m({ wire: "srtListenerPort" }),
      StreamId: D.m({ wire: "streamId" }),
    }),
  }),
  SrtListenerSettings: D.m({
    wire: "srtListenerSettings",
    shape: {
      Decryption: D.m({
        wire: "decryption",
        shape: {
          Algorithm: D.m({ wire: "algorithm" }),
          PassphraseSecretArn: D.m({ wire: "passphraseSecretArn" }),
        },
      }),
      MinimumLatency: D.m({ wire: "minimumLatency" }),
      StreamId: D.m({ wire: "streamId" }),
    },
  }),
});
const o_AccountConfiguration: D.LazyStruct = () => ({
  KmsKeyId: D.m({ wire: "kmsKeyId" }),
});
const o_BatchFailedResultModel: D.LazyStruct = () => ({
  Arn: D.m({ wire: "arn" }),
  Code: D.m({ wire: "code" }),
  Id: D.m({ wire: "id" }),
  Message: D.m({ wire: "message" }),
});
const o_BatchSuccessfulResultModel: D.LazyStruct = () => ({
  Arn: D.m({ wire: "arn" }),
  Id: D.m({ wire: "id" }),
  State: D.m({ wire: "state" }),
});
const o_CdiInputSpecification: D.LazyStruct = () => ({
  Resolution: D.m({ wire: "resolution" }),
});
const o_Channel: D.LazyStruct = () => ({
  Arn: D.m({ wire: "arn" }),
  CdiInputSpecification: D.m({
    wire: "cdiInputSpecification",
    shape: o_CdiInputSpecification,
  }),
  ChannelClass: D.m({ wire: "channelClass" }),
  Destinations: D.m({
    wire: "destinations",
    shape: D.list(o_OutputDestination),
  }),
  EgressEndpoints: D.m({
    wire: "egressEndpoints",
    shape: D.list(o_ChannelEgressEndpoint),
  }),
  EncoderSettings: D.m({ wire: "encoderSettings", shape: o_EncoderSettings }),
  Id: D.m({ wire: "id" }),
  InputAttachments: D.m({
    wire: "inputAttachments",
    shape: D.list(o_InputAttachment),
  }),
  InputSpecification: D.m({
    wire: "inputSpecification",
    shape: o_InputSpecification,
  }),
  LogLevel: D.m({ wire: "logLevel" }),
  Maintenance: D.m({ wire: "maintenance", shape: o_MaintenanceStatus }),
  Name: D.m({ wire: "name" }),
  PipelineDetails: D.m({
    wire: "pipelineDetails",
    shape: D.list(o_PipelineDetail),
  }),
  PipelinesRunningCount: D.m({ wire: "pipelinesRunningCount" }),
  RoleArn: D.m({ wire: "roleArn" }),
  State: D.m({ wire: "state" }),
  Tags: D.m({ wire: "tags" }),
  Vpc: D.m({ wire: "vpc", shape: o_VpcOutputSettingsDescription }),
  AnywhereSettings: D.m({
    wire: "anywhereSettings",
    shape: o_DescribeAnywhereSettings,
  }),
  ChannelEngineVersion: D.m({
    wire: "channelEngineVersion",
    shape: o_ChannelEngineVersionResponse,
  }),
  LinkedChannelSettings: D.m({
    wire: "linkedChannelSettings",
    shape: o_DescribeLinkedChannelSettings,
  }),
  ChannelSecurityGroups: D.m({ wire: "channelSecurityGroups" }),
  InferenceSettings: D.m({
    wire: "inferenceSettings",
    shape: o_DescribeInferenceSettings,
  }),
});
const o_ChannelEgressEndpoint: D.LazyStruct = () => ({
  SourceIp: D.m({ wire: "sourceIp" }),
});
const o_ChannelEngineVersionResponse: D.LazyStruct = () => ({
  ExpirationDate: D.m({ wire: "expirationDate", shape: D.ts }),
  Version: D.m({ wire: "version" }),
});
const o_ClusterNetworkSettings: D.LazyStruct = () => ({
  DefaultRoute: D.m({ wire: "defaultRoute" }),
  InterfaceMappings: D.m({
    wire: "interfaceMappings",
    shape: D.list({
      LogicalInterfaceName: D.m({ wire: "logicalInterfaceName" }),
      NetworkId: D.m({ wire: "networkId" }),
    }),
  }),
});
const o_DescribeAnywhereSettings: D.LazyStruct = () => ({
  ChannelPlacementGroupId: D.m({ wire: "channelPlacementGroupId" }),
  ClusterId: D.m({ wire: "clusterId" }),
});
const o_DescribeInferenceSettings: D.LazyStruct = () => ({
  FeedArn: D.m({ wire: "feedArn" }),
  AudioFeedInputs: D.m({
    wire: "audioFeedInputs",
    shape: D.list({
      AudioSelectorName: D.m({ wire: "audioSelectorName" }),
      FeedInput: D.m({ wire: "feedInput" }),
    }),
  }),
});
const o_DescribeLinkedChannelSettings: D.LazyStruct = () => ({
  FollowerChannelSettings: D.m({
    wire: "followerChannelSettings",
    shape: {
      LinkedChannelType: D.m({ wire: "linkedChannelType" }),
      PrimaryChannelArn: D.m({ wire: "primaryChannelArn" }),
    },
  }),
  PrimaryChannelSettings: D.m({
    wire: "primaryChannelSettings",
    shape: {
      FollowingChannelArns: D.m({ wire: "followingChannelArns" }),
      LinkedChannelType: D.m({ wire: "linkedChannelType" }),
    },
  }),
});
const o_EncoderSettings: D.LazyStruct = () => ({
  AudioDescriptions: D.m({
    wire: "audioDescriptions",
    shape: D.list({
      AudioNormalizationSettings: D.m({
        wire: "audioNormalizationSettings",
        shape: o_AudioNormalizationSettings,
      }),
      AudioSelectorName: D.m({ wire: "audioSelectorName" }),
      AudioType: D.m({ wire: "audioType" }),
      AudioTypeControl: D.m({ wire: "audioTypeControl" }),
      AudioWatermarkingSettings: D.m({
        wire: "audioWatermarkingSettings",
        shape: {
          NielsenWatermarksSettings: D.m({
            wire: "nielsenWatermarksSettings",
            shape: {
              NielsenCbetSettings: D.m({
                wire: "nielsenCbetSettings",
                shape: {
                  CbetCheckDigitString: D.m({ wire: "cbetCheckDigitString" }),
                  CbetStepaside: D.m({ wire: "cbetStepaside" }),
                  Csid: D.m({ wire: "csid" }),
                },
              }),
              NielsenDistributionType: D.m({ wire: "nielsenDistributionType" }),
              NielsenNaesIiNwSettings: D.m({
                wire: "nielsenNaesIiNwSettings",
                shape: {
                  CheckDigitString: D.m({ wire: "checkDigitString" }),
                  Sid: D.m({ wire: "sid" }),
                  Timezone: D.m({ wire: "timezone" }),
                },
              }),
              NielsenNwOnlySettings: D.m({
                wire: "nielsenNwOnlySettings",
                shape: {
                  CheckDigitString: D.m({ wire: "checkDigitString" }),
                  Sid: D.m({ wire: "sid" }),
                  Timezone: D.m({ wire: "timezone" }),
                },
              }),
            },
          }),
        },
      }),
      CodecSettings: D.m({
        wire: "codecSettings",
        shape: {
          AacSettings: D.m({
            wire: "aacSettings",
            shape: {
              Bitrate: D.m({ wire: "bitrate" }),
              CodingMode: D.m({ wire: "codingMode" }),
              InputType: D.m({ wire: "inputType" }),
              Profile: D.m({ wire: "profile" }),
              RateControlMode: D.m({ wire: "rateControlMode" }),
              RawFormat: D.m({ wire: "rawFormat" }),
              SampleRate: D.m({ wire: "sampleRate" }),
              Spec: D.m({ wire: "spec" }),
              VbrQuality: D.m({ wire: "vbrQuality" }),
            },
          }),
          Ac3Settings: D.m({
            wire: "ac3Settings",
            shape: {
              Bitrate: D.m({ wire: "bitrate" }),
              BitstreamMode: D.m({ wire: "bitstreamMode" }),
              CodingMode: D.m({ wire: "codingMode" }),
              Dialnorm: D.m({ wire: "dialnorm" }),
              DrcProfile: D.m({ wire: "drcProfile" }),
              LfeFilter: D.m({ wire: "lfeFilter" }),
              MetadataControl: D.m({ wire: "metadataControl" }),
              AttenuationControl: D.m({ wire: "attenuationControl" }),
            },
          }),
          Eac3AtmosSettings: D.m({
            wire: "eac3AtmosSettings",
            shape: {
              Bitrate: D.m({ wire: "bitrate" }),
              CodingMode: D.m({ wire: "codingMode" }),
              Dialnorm: D.m({ wire: "dialnorm" }),
              DrcLine: D.m({ wire: "drcLine" }),
              DrcRf: D.m({ wire: "drcRf" }),
              HeightTrim: D.m({ wire: "heightTrim" }),
              SurroundTrim: D.m({ wire: "surroundTrim" }),
            },
          }),
          Eac3Settings: D.m({
            wire: "eac3Settings",
            shape: {
              AttenuationControl: D.m({ wire: "attenuationControl" }),
              Bitrate: D.m({ wire: "bitrate" }),
              BitstreamMode: D.m({ wire: "bitstreamMode" }),
              CodingMode: D.m({ wire: "codingMode" }),
              DcFilter: D.m({ wire: "dcFilter" }),
              Dialnorm: D.m({ wire: "dialnorm" }),
              DrcLine: D.m({ wire: "drcLine" }),
              DrcRf: D.m({ wire: "drcRf" }),
              LfeControl: D.m({ wire: "lfeControl" }),
              LfeFilter: D.m({ wire: "lfeFilter" }),
              LoRoCenterMixLevel: D.m({ wire: "loRoCenterMixLevel" }),
              LoRoSurroundMixLevel: D.m({ wire: "loRoSurroundMixLevel" }),
              LtRtCenterMixLevel: D.m({ wire: "ltRtCenterMixLevel" }),
              LtRtSurroundMixLevel: D.m({ wire: "ltRtSurroundMixLevel" }),
              MetadataControl: D.m({ wire: "metadataControl" }),
              PassthroughControl: D.m({ wire: "passthroughControl" }),
              PhaseControl: D.m({ wire: "phaseControl" }),
              StereoDownmix: D.m({ wire: "stereoDownmix" }),
              SurroundExMode: D.m({ wire: "surroundExMode" }),
              SurroundMode: D.m({ wire: "surroundMode" }),
            },
          }),
          Mp2Settings: D.m({
            wire: "mp2Settings",
            shape: {
              Bitrate: D.m({ wire: "bitrate" }),
              CodingMode: D.m({ wire: "codingMode" }),
              SampleRate: D.m({ wire: "sampleRate" }),
            },
          }),
          PassThroughSettings: D.m({ wire: "passThroughSettings" }),
          WavSettings: D.m({
            wire: "wavSettings",
            shape: {
              BitDepth: D.m({ wire: "bitDepth" }),
              CodingMode: D.m({ wire: "codingMode" }),
              SampleRate: D.m({ wire: "sampleRate" }),
            },
          }),
        },
      }),
      LanguageCode: D.m({ wire: "languageCode" }),
      LanguageCodeControl: D.m({ wire: "languageCodeControl" }),
      Name: D.m({ wire: "name" }),
      RemixSettings: D.m({ wire: "remixSettings", shape: o_RemixSettings }),
      StreamName: D.m({ wire: "streamName" }),
      AudioDashRoles: D.m({ wire: "audioDashRoles" }),
      DvbDashAccessibility: D.m({ wire: "dvbDashAccessibility" }),
    }),
  }),
  AvailBlanking: D.m({
    wire: "availBlanking",
    shape: {
      AvailBlankingImage: D.m({
        wire: "availBlankingImage",
        shape: o_InputLocation,
      }),
      State: D.m({ wire: "state" }),
    },
  }),
  AvailConfiguration: D.m({
    wire: "availConfiguration",
    shape: {
      AvailSettings: D.m({
        wire: "availSettings",
        shape: {
          Esam: D.m({
            wire: "esam",
            shape: {
              AcquisitionPointId: D.m({ wire: "acquisitionPointId" }),
              AdAvailOffset: D.m({ wire: "adAvailOffset" }),
              PasswordParam: D.m({ wire: "passwordParam" }),
              PoisEndpoint: D.m({ wire: "poisEndpoint" }),
              Username: D.m({ wire: "username" }),
              ZoneIdentity: D.m({ wire: "zoneIdentity" }),
            },
          }),
          Scte35SpliceInsert: D.m({
            wire: "scte35SpliceInsert",
            shape: {
              AdAvailOffset: D.m({ wire: "adAvailOffset" }),
              NoRegionalBlackoutFlag: D.m({ wire: "noRegionalBlackoutFlag" }),
              WebDeliveryAllowedFlag: D.m({ wire: "webDeliveryAllowedFlag" }),
            },
          }),
          Scte35TimeSignalApos: D.m({
            wire: "scte35TimeSignalApos",
            shape: {
              AdAvailOffset: D.m({ wire: "adAvailOffset" }),
              NoRegionalBlackoutFlag: D.m({ wire: "noRegionalBlackoutFlag" }),
              WebDeliveryAllowedFlag: D.m({ wire: "webDeliveryAllowedFlag" }),
            },
          }),
        },
      }),
      Scte35SegmentationScope: D.m({ wire: "scte35SegmentationScope" }),
    },
  }),
  BlackoutSlate: D.m({
    wire: "blackoutSlate",
    shape: {
      BlackoutSlateImage: D.m({
        wire: "blackoutSlateImage",
        shape: o_InputLocation,
      }),
      NetworkEndBlackout: D.m({ wire: "networkEndBlackout" }),
      NetworkEndBlackoutImage: D.m({
        wire: "networkEndBlackoutImage",
        shape: o_InputLocation,
      }),
      NetworkId: D.m({ wire: "networkId" }),
      State: D.m({ wire: "state" }),
    },
  }),
  CaptionDescriptions: D.m({
    wire: "captionDescriptions",
    shape: D.list({
      Accessibility: D.m({ wire: "accessibility" }),
      CaptionSelectorName: D.m({ wire: "captionSelectorName" }),
      DestinationSettings: D.m({
        wire: "destinationSettings",
        shape: {
          AribDestinationSettings: D.m({ wire: "aribDestinationSettings" }),
          BurnInDestinationSettings: D.m({
            wire: "burnInDestinationSettings",
            shape: {
              Alignment: D.m({ wire: "alignment" }),
              BackgroundColor: D.m({ wire: "backgroundColor" }),
              BackgroundOpacity: D.m({ wire: "backgroundOpacity" }),
              Font: D.m({ wire: "font", shape: o_InputLocation }),
              FontColor: D.m({ wire: "fontColor" }),
              FontOpacity: D.m({ wire: "fontOpacity" }),
              FontResolution: D.m({ wire: "fontResolution" }),
              FontSize: D.m({ wire: "fontSize" }),
              OutlineColor: D.m({ wire: "outlineColor" }),
              OutlineSize: D.m({ wire: "outlineSize" }),
              ShadowColor: D.m({ wire: "shadowColor" }),
              ShadowOpacity: D.m({ wire: "shadowOpacity" }),
              ShadowXOffset: D.m({ wire: "shadowXOffset" }),
              ShadowYOffset: D.m({ wire: "shadowYOffset" }),
              TeletextGridControl: D.m({ wire: "teletextGridControl" }),
              XPosition: D.m({ wire: "xPosition" }),
              YPosition: D.m({ wire: "yPosition" }),
              SubtitleRows: D.m({ wire: "subtitleRows" }),
            },
          }),
          DvbSubDestinationSettings: D.m({
            wire: "dvbSubDestinationSettings",
            shape: {
              Alignment: D.m({ wire: "alignment" }),
              BackgroundColor: D.m({ wire: "backgroundColor" }),
              BackgroundOpacity: D.m({ wire: "backgroundOpacity" }),
              Font: D.m({ wire: "font", shape: o_InputLocation }),
              FontColor: D.m({ wire: "fontColor" }),
              FontOpacity: D.m({ wire: "fontOpacity" }),
              FontResolution: D.m({ wire: "fontResolution" }),
              FontSize: D.m({ wire: "fontSize" }),
              OutlineColor: D.m({ wire: "outlineColor" }),
              OutlineSize: D.m({ wire: "outlineSize" }),
              ShadowColor: D.m({ wire: "shadowColor" }),
              ShadowOpacity: D.m({ wire: "shadowOpacity" }),
              ShadowXOffset: D.m({ wire: "shadowXOffset" }),
              ShadowYOffset: D.m({ wire: "shadowYOffset" }),
              TeletextGridControl: D.m({ wire: "teletextGridControl" }),
              XPosition: D.m({ wire: "xPosition" }),
              YPosition: D.m({ wire: "yPosition" }),
              SubtitleRows: D.m({ wire: "subtitleRows" }),
            },
          }),
          EbuTtDDestinationSettings: D.m({
            wire: "ebuTtDDestinationSettings",
            shape: {
              CopyrightHolder: D.m({ wire: "copyrightHolder" }),
              FillLineGap: D.m({ wire: "fillLineGap" }),
              FontFamily: D.m({ wire: "fontFamily" }),
              StyleControl: D.m({ wire: "styleControl" }),
              DefaultFontSize: D.m({ wire: "defaultFontSize" }),
              DefaultLineHeight: D.m({ wire: "defaultLineHeight" }),
            },
          }),
          EmbeddedDestinationSettings: D.m({
            wire: "embeddedDestinationSettings",
          }),
          EmbeddedPlusScte20DestinationSettings: D.m({
            wire: "embeddedPlusScte20DestinationSettings",
          }),
          RtmpCaptionInfoDestinationSettings: D.m({
            wire: "rtmpCaptionInfoDestinationSettings",
          }),
          Scte20PlusEmbeddedDestinationSettings: D.m({
            wire: "scte20PlusEmbeddedDestinationSettings",
          }),
          Scte27DestinationSettings: D.m({ wire: "scte27DestinationSettings" }),
          SmpteTtDestinationSettings: D.m({
            wire: "smpteTtDestinationSettings",
          }),
          TeletextDestinationSettings: D.m({
            wire: "teletextDestinationSettings",
          }),
          TtmlDestinationSettings: D.m({
            wire: "ttmlDestinationSettings",
            shape: { StyleControl: D.m({ wire: "styleControl" }) },
          }),
          WebvttDestinationSettings: D.m({
            wire: "webvttDestinationSettings",
            shape: { StyleControl: D.m({ wire: "styleControl" }) },
          }),
        },
      }),
      LanguageCode: D.m({ wire: "languageCode" }),
      LanguageDescription: D.m({ wire: "languageDescription" }),
      Name: D.m({ wire: "name" }),
      CaptionDashRoles: D.m({ wire: "captionDashRoles" }),
      DvbDashAccessibility: D.m({ wire: "dvbDashAccessibility" }),
    }),
  }),
  FeatureActivations: D.m({
    wire: "featureActivations",
    shape: {
      InputPrepareScheduleActions: D.m({ wire: "inputPrepareScheduleActions" }),
      OutputStaticImageOverlayScheduleActions: D.m({
        wire: "outputStaticImageOverlayScheduleActions",
      }),
    },
  }),
  GlobalConfiguration: D.m({
    wire: "globalConfiguration",
    shape: {
      InitialAudioGain: D.m({ wire: "initialAudioGain" }),
      InputEndAction: D.m({ wire: "inputEndAction" }),
      InputLossBehavior: D.m({
        wire: "inputLossBehavior",
        shape: {
          BlackFrameMsec: D.m({ wire: "blackFrameMsec" }),
          InputLossImageColor: D.m({ wire: "inputLossImageColor" }),
          InputLossImageSlate: D.m({
            wire: "inputLossImageSlate",
            shape: o_InputLocation,
          }),
          InputLossImageType: D.m({ wire: "inputLossImageType" }),
          RepeatFrameMsec: D.m({ wire: "repeatFrameMsec" }),
        },
      }),
      OutputLockingMode: D.m({ wire: "outputLockingMode" }),
      OutputTimingSource: D.m({ wire: "outputTimingSource" }),
      SupportLowFramerateInputs: D.m({ wire: "supportLowFramerateInputs" }),
      OutputLockingSettings: D.m({
        wire: "outputLockingSettings",
        shape: {
          EpochLockingSettings: D.m({
            wire: "epochLockingSettings",
            shape: {
              CustomEpoch: D.m({ wire: "customEpoch" }),
              JamSyncTime: D.m({ wire: "jamSyncTime" }),
            },
          }),
          PipelineLockingSettings: D.m({
            wire: "pipelineLockingSettings",
            shape: {
              PipelineLockingMethod: D.m({ wire: "pipelineLockingMethod" }),
              CustomEpoch: D.m({ wire: "customEpoch" }),
            },
          }),
          DisabledLockingSettings: D.m({
            wire: "disabledLockingSettings",
            shape: { CustomEpoch: D.m({ wire: "customEpoch" }) },
          }),
        },
      }),
    },
  }),
  MotionGraphicsConfiguration: D.m({
    wire: "motionGraphicsConfiguration",
    shape: {
      MotionGraphicsInsertion: D.m({ wire: "motionGraphicsInsertion" }),
      MotionGraphicsSettings: D.m({
        wire: "motionGraphicsSettings",
        shape: {
          HtmlMotionGraphicsSettings: D.m({
            wire: "htmlMotionGraphicsSettings",
          }),
        },
      }),
    },
  }),
  NielsenConfiguration: D.m({
    wire: "nielsenConfiguration",
    shape: {
      DistributorId: D.m({ wire: "distributorId" }),
      NielsenPcmToId3Tagging: D.m({ wire: "nielsenPcmToId3Tagging" }),
    },
  }),
  OutputGroups: D.m({
    wire: "outputGroups",
    shape: D.list({
      Name: D.m({ wire: "name" }),
      OutputGroupSettings: D.m({
        wire: "outputGroupSettings",
        shape: {
          ArchiveGroupSettings: D.m({
            wire: "archiveGroupSettings",
            shape: {
              ArchiveCdnSettings: D.m({
                wire: "archiveCdnSettings",
                shape: {
                  ArchiveS3Settings: D.m({
                    wire: "archiveS3Settings",
                    shape: { CannedAcl: D.m({ wire: "cannedAcl" }) },
                  }),
                },
              }),
              Destination: D.m({
                wire: "destination",
                shape: o_OutputLocationRef,
              }),
              RolloverInterval: D.m({ wire: "rolloverInterval" }),
            },
          }),
          FrameCaptureGroupSettings: D.m({
            wire: "frameCaptureGroupSettings",
            shape: {
              Destination: D.m({
                wire: "destination",
                shape: o_OutputLocationRef,
              }),
              FrameCaptureCdnSettings: D.m({
                wire: "frameCaptureCdnSettings",
                shape: {
                  FrameCaptureS3Settings: D.m({
                    wire: "frameCaptureS3Settings",
                    shape: { CannedAcl: D.m({ wire: "cannedAcl" }) },
                  }),
                },
              }),
            },
          }),
          HlsGroupSettings: D.m({
            wire: "hlsGroupSettings",
            shape: {
              AdMarkers: D.m({ wire: "adMarkers" }),
              BaseUrlContent: D.m({ wire: "baseUrlContent" }),
              BaseUrlContent1: D.m({ wire: "baseUrlContent1" }),
              BaseUrlManifest: D.m({ wire: "baseUrlManifest" }),
              BaseUrlManifest1: D.m({ wire: "baseUrlManifest1" }),
              CaptionLanguageMappings: D.m({
                wire: "captionLanguageMappings",
                shape: D.list(o_CaptionLanguageMapping),
              }),
              CaptionLanguageSetting: D.m({ wire: "captionLanguageSetting" }),
              ClientCache: D.m({ wire: "clientCache" }),
              CodecSpecification: D.m({ wire: "codecSpecification" }),
              ConstantIv: D.m({ wire: "constantIv" }),
              Destination: D.m({
                wire: "destination",
                shape: o_OutputLocationRef,
              }),
              DirectoryStructure: D.m({ wire: "directoryStructure" }),
              DiscontinuityTags: D.m({ wire: "discontinuityTags" }),
              EncryptionType: D.m({ wire: "encryptionType" }),
              HlsCdnSettings: D.m({
                wire: "hlsCdnSettings",
                shape: {
                  HlsAkamaiSettings: D.m({
                    wire: "hlsAkamaiSettings",
                    shape: {
                      ConnectionRetryInterval: D.m({
                        wire: "connectionRetryInterval",
                      }),
                      FilecacheDuration: D.m({ wire: "filecacheDuration" }),
                      HttpTransferMode: D.m({ wire: "httpTransferMode" }),
                      NumRetries: D.m({ wire: "numRetries" }),
                      RestartDelay: D.m({ wire: "restartDelay" }),
                      Salt: D.m({ wire: "salt" }),
                      Token: D.m({ wire: "token" }),
                    },
                  }),
                  HlsBasicPutSettings: D.m({
                    wire: "hlsBasicPutSettings",
                    shape: {
                      ConnectionRetryInterval: D.m({
                        wire: "connectionRetryInterval",
                      }),
                      FilecacheDuration: D.m({ wire: "filecacheDuration" }),
                      NumRetries: D.m({ wire: "numRetries" }),
                      RestartDelay: D.m({ wire: "restartDelay" }),
                    },
                  }),
                  HlsMediaStoreSettings: D.m({
                    wire: "hlsMediaStoreSettings",
                    shape: {
                      ConnectionRetryInterval: D.m({
                        wire: "connectionRetryInterval",
                      }),
                      FilecacheDuration: D.m({ wire: "filecacheDuration" }),
                      MediaStoreStorageClass: D.m({
                        wire: "mediaStoreStorageClass",
                      }),
                      NumRetries: D.m({ wire: "numRetries" }),
                      RestartDelay: D.m({ wire: "restartDelay" }),
                    },
                  }),
                  HlsS3Settings: D.m({
                    wire: "hlsS3Settings",
                    shape: { CannedAcl: D.m({ wire: "cannedAcl" }) },
                  }),
                  HlsWebdavSettings: D.m({
                    wire: "hlsWebdavSettings",
                    shape: {
                      ConnectionRetryInterval: D.m({
                        wire: "connectionRetryInterval",
                      }),
                      FilecacheDuration: D.m({ wire: "filecacheDuration" }),
                      HttpTransferMode: D.m({ wire: "httpTransferMode" }),
                      NumRetries: D.m({ wire: "numRetries" }),
                      RestartDelay: D.m({ wire: "restartDelay" }),
                    },
                  }),
                },
              }),
              HlsId3SegmentTagging: D.m({ wire: "hlsId3SegmentTagging" }),
              IFrameOnlyPlaylists: D.m({ wire: "iFrameOnlyPlaylists" }),
              IncompleteSegmentBehavior: D.m({
                wire: "incompleteSegmentBehavior",
              }),
              IndexNSegments: D.m({ wire: "indexNSegments" }),
              InputLossAction: D.m({ wire: "inputLossAction" }),
              IvInManifest: D.m({ wire: "ivInManifest" }),
              IvSource: D.m({ wire: "ivSource" }),
              KeepSegments: D.m({ wire: "keepSegments" }),
              KeyFormat: D.m({ wire: "keyFormat" }),
              KeyFormatVersions: D.m({ wire: "keyFormatVersions" }),
              KeyProviderSettings: D.m({
                wire: "keyProviderSettings",
                shape: {
                  StaticKeySettings: D.m({
                    wire: "staticKeySettings",
                    shape: {
                      KeyProviderServer: D.m({
                        wire: "keyProviderServer",
                        shape: o_InputLocation,
                      }),
                      StaticKeyValue: D.m({
                        wire: "staticKeyValue",
                        shape: D.secret,
                      }),
                    },
                  }),
                },
              }),
              ManifestCompression: D.m({ wire: "manifestCompression" }),
              ManifestDurationFormat: D.m({ wire: "manifestDurationFormat" }),
              MinSegmentLength: D.m({ wire: "minSegmentLength" }),
              Mode: D.m({ wire: "mode" }),
              OutputSelection: D.m({ wire: "outputSelection" }),
              ProgramDateTime: D.m({ wire: "programDateTime" }),
              ProgramDateTimeClock: D.m({ wire: "programDateTimeClock" }),
              ProgramDateTimePeriod: D.m({ wire: "programDateTimePeriod" }),
              RedundantManifest: D.m({ wire: "redundantManifest" }),
              SegmentLength: D.m({ wire: "segmentLength" }),
              SegmentationMode: D.m({ wire: "segmentationMode" }),
              SegmentsPerSubdirectory: D.m({ wire: "segmentsPerSubdirectory" }),
              StreamInfResolution: D.m({ wire: "streamInfResolution" }),
              TimedMetadataId3Frame: D.m({ wire: "timedMetadataId3Frame" }),
              TimedMetadataId3Period: D.m({ wire: "timedMetadataId3Period" }),
              TimestampDeltaMilliseconds: D.m({
                wire: "timestampDeltaMilliseconds",
              }),
              TsFileMode: D.m({ wire: "tsFileMode" }),
            },
          }),
          MediaPackageGroupSettings: D.m({
            wire: "mediaPackageGroupSettings",
            shape: {
              Destination: D.m({
                wire: "destination",
                shape: o_OutputLocationRef,
              }),
              MediapackageV2GroupSettings: D.m({
                wire: "mediapackageV2GroupSettings",
                shape: {
                  CaptionLanguageMappings: D.m({
                    wire: "captionLanguageMappings",
                    shape: D.list(o_CaptionLanguageMapping),
                  }),
                  Id3Behavior: D.m({ wire: "id3Behavior" }),
                  KlvBehavior: D.m({ wire: "klvBehavior" }),
                  NielsenId3Behavior: D.m({ wire: "nielsenId3Behavior" }),
                  Scte35Type: D.m({ wire: "scte35Type" }),
                  SegmentLength: D.m({ wire: "segmentLength" }),
                  SegmentLengthUnits: D.m({ wire: "segmentLengthUnits" }),
                  TimedMetadataId3Frame: D.m({ wire: "timedMetadataId3Frame" }),
                  TimedMetadataId3Period: D.m({
                    wire: "timedMetadataId3Period",
                  }),
                  TimedMetadataPassthrough: D.m({
                    wire: "timedMetadataPassthrough",
                  }),
                  AdditionalDestinations: D.m({
                    wire: "additionalDestinations",
                    shape: D.list({
                      Destination: D.m({
                        wire: "destination",
                        shape: o_OutputLocationRef,
                      }),
                    }),
                  }),
                },
              }),
            },
          }),
          MsSmoothGroupSettings: D.m({
            wire: "msSmoothGroupSettings",
            shape: {
              AcquisitionPointId: D.m({ wire: "acquisitionPointId" }),
              AudioOnlyTimecodeControl: D.m({
                wire: "audioOnlyTimecodeControl",
              }),
              CertificateMode: D.m({ wire: "certificateMode" }),
              ConnectionRetryInterval: D.m({ wire: "connectionRetryInterval" }),
              Destination: D.m({
                wire: "destination",
                shape: o_OutputLocationRef,
              }),
              EventId: D.m({ wire: "eventId" }),
              EventIdMode: D.m({ wire: "eventIdMode" }),
              EventStopBehavior: D.m({ wire: "eventStopBehavior" }),
              FilecacheDuration: D.m({ wire: "filecacheDuration" }),
              FragmentLength: D.m({ wire: "fragmentLength" }),
              InputLossAction: D.m({ wire: "inputLossAction" }),
              NumRetries: D.m({ wire: "numRetries" }),
              RestartDelay: D.m({ wire: "restartDelay" }),
              SegmentationMode: D.m({ wire: "segmentationMode" }),
              SendDelayMs: D.m({ wire: "sendDelayMs" }),
              SparseTrackType: D.m({ wire: "sparseTrackType" }),
              StreamManifestBehavior: D.m({ wire: "streamManifestBehavior" }),
              TimestampOffset: D.m({ wire: "timestampOffset" }),
              TimestampOffsetMode: D.m({ wire: "timestampOffsetMode" }),
            },
          }),
          MultiplexGroupSettings: D.m({ wire: "multiplexGroupSettings" }),
          RtmpGroupSettings: D.m({
            wire: "rtmpGroupSettings",
            shape: {
              AdMarkers: D.m({ wire: "adMarkers" }),
              AuthenticationScheme: D.m({ wire: "authenticationScheme" }),
              CacheFullBehavior: D.m({ wire: "cacheFullBehavior" }),
              CacheLength: D.m({ wire: "cacheLength" }),
              CaptionData: D.m({ wire: "captionData" }),
              InputLossAction: D.m({ wire: "inputLossAction" }),
              RestartDelay: D.m({ wire: "restartDelay" }),
              IncludeFillerNalUnits: D.m({ wire: "includeFillerNalUnits" }),
            },
          }),
          UdpGroupSettings: D.m({
            wire: "udpGroupSettings",
            shape: {
              InputLossAction: D.m({ wire: "inputLossAction" }),
              TimedMetadataId3Frame: D.m({ wire: "timedMetadataId3Frame" }),
              TimedMetadataId3Period: D.m({ wire: "timedMetadataId3Period" }),
            },
          }),
          CmafIngestGroupSettings: D.m({
            wire: "cmafIngestGroupSettings",
            shape: {
              Destination: D.m({
                wire: "destination",
                shape: o_OutputLocationRef,
              }),
              NielsenId3Behavior: D.m({ wire: "nielsenId3Behavior" }),
              Scte35Type: D.m({ wire: "scte35Type" }),
              SegmentLength: D.m({ wire: "segmentLength" }),
              SegmentLengthUnits: D.m({ wire: "segmentLengthUnits" }),
              SendDelayMs: D.m({ wire: "sendDelayMs" }),
              KlvBehavior: D.m({ wire: "klvBehavior" }),
              KlvNameModifier: D.m({ wire: "klvNameModifier" }),
              NielsenId3NameModifier: D.m({ wire: "nielsenId3NameModifier" }),
              Scte35NameModifier: D.m({ wire: "scte35NameModifier" }),
              Id3Behavior: D.m({ wire: "id3Behavior" }),
              Id3NameModifier: D.m({ wire: "id3NameModifier" }),
              CaptionLanguageMappings: D.m({
                wire: "captionLanguageMappings",
                shape: D.list({
                  CaptionChannel: D.m({ wire: "captionChannel" }),
                  LanguageCode: D.m({ wire: "languageCode" }),
                }),
              }),
              TimedMetadataId3Frame: D.m({ wire: "timedMetadataId3Frame" }),
              TimedMetadataId3Period: D.m({ wire: "timedMetadataId3Period" }),
              TimedMetadataPassthrough: D.m({
                wire: "timedMetadataPassthrough",
              }),
              AdditionalDestinations: D.m({
                wire: "additionalDestinations",
                shape: D.list({
                  Destination: D.m({
                    wire: "destination",
                    shape: o_OutputLocationRef,
                  }),
                }),
              }),
            },
          }),
          SrtGroupSettings: D.m({
            wire: "srtGroupSettings",
            shape: { InputLossAction: D.m({ wire: "inputLossAction" }) },
          }),
          MediaConnectRouterGroupSettings: D.m({
            wire: "mediaConnectRouterGroupSettings",
            shape: { AvailabilityZones: D.m({ wire: "availabilityZones" }) },
          }),
        },
      }),
      Outputs: D.m({
        wire: "outputs",
        shape: D.list({
          AudioDescriptionNames: D.m({ wire: "audioDescriptionNames" }),
          CaptionDescriptionNames: D.m({ wire: "captionDescriptionNames" }),
          OutputName: D.m({ wire: "outputName" }),
          OutputSettings: D.m({
            wire: "outputSettings",
            shape: {
              ArchiveOutputSettings: D.m({
                wire: "archiveOutputSettings",
                shape: {
                  ContainerSettings: D.m({
                    wire: "containerSettings",
                    shape: {
                      M2tsSettings: D.m({
                        wire: "m2tsSettings",
                        shape: o_M2tsSettings,
                      }),
                      RawSettings: D.m({ wire: "rawSettings" }),
                    },
                  }),
                  Extension: D.m({ wire: "extension" }),
                  NameModifier: D.m({ wire: "nameModifier" }),
                },
              }),
              FrameCaptureOutputSettings: D.m({
                wire: "frameCaptureOutputSettings",
                shape: { NameModifier: D.m({ wire: "nameModifier" }) },
              }),
              HlsOutputSettings: D.m({
                wire: "hlsOutputSettings",
                shape: {
                  H265PackagingType: D.m({ wire: "h265PackagingType" }),
                  HlsSettings: D.m({
                    wire: "hlsSettings",
                    shape: {
                      AudioOnlyHlsSettings: D.m({
                        wire: "audioOnlyHlsSettings",
                        shape: {
                          AudioGroupId: D.m({ wire: "audioGroupId" }),
                          AudioOnlyImage: D.m({
                            wire: "audioOnlyImage",
                            shape: o_InputLocation,
                          }),
                          AudioTrackType: D.m({ wire: "audioTrackType" }),
                          SegmentType: D.m({ wire: "segmentType" }),
                        },
                      }),
                      Fmp4HlsSettings: D.m({
                        wire: "fmp4HlsSettings",
                        shape: {
                          AudioRenditionSets: D.m({
                            wire: "audioRenditionSets",
                          }),
                          NielsenId3Behavior: D.m({
                            wire: "nielsenId3Behavior",
                          }),
                          TimedMetadataBehavior: D.m({
                            wire: "timedMetadataBehavior",
                          }),
                        },
                      }),
                      FrameCaptureHlsSettings: D.m({
                        wire: "frameCaptureHlsSettings",
                      }),
                      StandardHlsSettings: D.m({
                        wire: "standardHlsSettings",
                        shape: {
                          AudioRenditionSets: D.m({
                            wire: "audioRenditionSets",
                          }),
                          M3u8Settings: D.m({
                            wire: "m3u8Settings",
                            shape: {
                              AudioFramesPerPes: D.m({
                                wire: "audioFramesPerPes",
                              }),
                              AudioPids: D.m({ wire: "audioPids" }),
                              EcmPid: D.m({ wire: "ecmPid" }),
                              NielsenId3Behavior: D.m({
                                wire: "nielsenId3Behavior",
                              }),
                              PatInterval: D.m({ wire: "patInterval" }),
                              PcrControl: D.m({ wire: "pcrControl" }),
                              PcrPeriod: D.m({ wire: "pcrPeriod" }),
                              PcrPid: D.m({ wire: "pcrPid" }),
                              PmtInterval: D.m({ wire: "pmtInterval" }),
                              PmtPid: D.m({ wire: "pmtPid" }),
                              ProgramNum: D.m({ wire: "programNum" }),
                              Scte35Behavior: D.m({ wire: "scte35Behavior" }),
                              Scte35Pid: D.m({ wire: "scte35Pid" }),
                              TimedMetadataBehavior: D.m({
                                wire: "timedMetadataBehavior",
                              }),
                              TimedMetadataPid: D.m({
                                wire: "timedMetadataPid",
                              }),
                              TransportStreamId: D.m({
                                wire: "transportStreamId",
                              }),
                              VideoPid: D.m({ wire: "videoPid" }),
                              KlvBehavior: D.m({ wire: "klvBehavior" }),
                              KlvDataPids: D.m({ wire: "klvDataPids" }),
                            },
                          }),
                        },
                      }),
                    },
                  }),
                  NameModifier: D.m({ wire: "nameModifier" }),
                  SegmentModifier: D.m({ wire: "segmentModifier" }),
                },
              }),
              MediaPackageOutputSettings: D.m({
                wire: "mediaPackageOutputSettings",
                shape: {
                  MediaPackageV2DestinationSettings: D.m({
                    wire: "mediaPackageV2DestinationSettings",
                    shape: {
                      AudioGroupId: D.m({ wire: "audioGroupId" }),
                      AudioRenditionSets: D.m({ wire: "audioRenditionSets" }),
                      HlsAutoSelect: D.m({ wire: "hlsAutoSelect" }),
                      HlsDefault: D.m({ wire: "hlsDefault" }),
                    },
                  }),
                },
              }),
              MsSmoothOutputSettings: D.m({
                wire: "msSmoothOutputSettings",
                shape: {
                  H265PackagingType: D.m({ wire: "h265PackagingType" }),
                  NameModifier: D.m({ wire: "nameModifier" }),
                },
              }),
              MultiplexOutputSettings: D.m({
                wire: "multiplexOutputSettings",
                shape: {
                  Destination: D.m({
                    wire: "destination",
                    shape: o_OutputLocationRef,
                  }),
                  ContainerSettings: D.m({
                    wire: "containerSettings",
                    shape: {
                      MultiplexM2tsSettings: D.m({
                        wire: "multiplexM2tsSettings",
                        shape: {
                          AbsentInputAudioBehavior: D.m({
                            wire: "absentInputAudioBehavior",
                          }),
                          Arib: D.m({ wire: "arib" }),
                          AudioBufferModel: D.m({ wire: "audioBufferModel" }),
                          AudioFramesPerPes: D.m({ wire: "audioFramesPerPes" }),
                          AudioStreamType: D.m({ wire: "audioStreamType" }),
                          CcDescriptor: D.m({ wire: "ccDescriptor" }),
                          Ebif: D.m({ wire: "ebif" }),
                          EsRateInPes: D.m({ wire: "esRateInPes" }),
                          Klv: D.m({ wire: "klv" }),
                          NielsenId3Behavior: D.m({
                            wire: "nielsenId3Behavior",
                          }),
                          PcrControl: D.m({ wire: "pcrControl" }),
                          PcrPeriod: D.m({ wire: "pcrPeriod" }),
                          Scte35Control: D.m({ wire: "scte35Control" }),
                          Scte35PrerollPullupMilliseconds: D.m({
                            wire: "scte35PrerollPullupMilliseconds",
                          }),
                        },
                      }),
                    },
                  }),
                },
              }),
              RtmpOutputSettings: D.m({
                wire: "rtmpOutputSettings",
                shape: {
                  CertificateMode: D.m({ wire: "certificateMode" }),
                  ConnectionRetryInterval: D.m({
                    wire: "connectionRetryInterval",
                  }),
                  Destination: D.m({
                    wire: "destination",
                    shape: o_OutputLocationRef,
                  }),
                  NumRetries: D.m({ wire: "numRetries" }),
                },
              }),
              UdpOutputSettings: D.m({
                wire: "udpOutputSettings",
                shape: {
                  BufferMsec: D.m({ wire: "bufferMsec" }),
                  ContainerSettings: D.m({
                    wire: "containerSettings",
                    shape: o_UdpContainerSettings,
                  }),
                  Destination: D.m({
                    wire: "destination",
                    shape: o_OutputLocationRef,
                  }),
                  FecOutputSettings: D.m({
                    wire: "fecOutputSettings",
                    shape: {
                      ColumnDepth: D.m({ wire: "columnDepth" }),
                      IncludeFec: D.m({ wire: "includeFec" }),
                      RowLength: D.m({ wire: "rowLength" }),
                    },
                  }),
                },
              }),
              CmafIngestOutputSettings: D.m({
                wire: "cmafIngestOutputSettings",
                shape: { NameModifier: D.m({ wire: "nameModifier" }) },
              }),
              SrtOutputSettings: D.m({
                wire: "srtOutputSettings",
                shape: {
                  BufferMsec: D.m({ wire: "bufferMsec" }),
                  ContainerSettings: D.m({
                    wire: "containerSettings",
                    shape: o_UdpContainerSettings,
                  }),
                  Destination: D.m({
                    wire: "destination",
                    shape: o_OutputLocationRef,
                  }),
                  EncryptionType: D.m({ wire: "encryptionType" }),
                  Latency: D.m({ wire: "latency" }),
                },
              }),
              MediaConnectRouterOutputSettings: D.m({
                wire: "mediaConnectRouterOutputSettings",
                shape: {
                  ConnectedRouterInputs: D.m({
                    wire: "connectedRouterInputs",
                    shape: {
                      Pipeline0: D.m({ wire: "pipeline0" }),
                      Pipeline1: D.m({ wire: "pipeline1" }),
                    },
                  }),
                  ContainerSettings: D.m({
                    wire: "containerSettings",
                    shape: {
                      M2tsSettings: D.m({
                        wire: "m2tsSettings",
                        shape: o_M2tsSettings,
                      }),
                    },
                  }),
                  Destination: D.m({
                    wire: "destination",
                    shape: o_OutputLocationRef,
                  }),
                },
              }),
            },
          }),
          VideoDescriptionName: D.m({ wire: "videoDescriptionName" }),
        }),
      }),
    }),
  }),
  TimecodeConfig: D.m({
    wire: "timecodeConfig",
    shape: {
      Source: D.m({ wire: "source" }),
      SyncThreshold: D.m({ wire: "syncThreshold" }),
    },
  }),
  VideoDescriptions: D.m({
    wire: "videoDescriptions",
    shape: D.list({
      CodecSettings: D.m({
        wire: "codecSettings",
        shape: {
          FrameCaptureSettings: D.m({
            wire: "frameCaptureSettings",
            shape: {
              CaptureInterval: D.m({ wire: "captureInterval" }),
              CaptureIntervalUnits: D.m({ wire: "captureIntervalUnits" }),
              TimecodeBurninSettings: D.m({
                wire: "timecodeBurninSettings",
                shape: o_TimecodeBurninSettings,
              }),
            },
          }),
          H264Settings: D.m({
            wire: "h264Settings",
            shape: {
              AdaptiveQuantization: D.m({ wire: "adaptiveQuantization" }),
              AfdSignaling: D.m({ wire: "afdSignaling" }),
              Bitrate: D.m({ wire: "bitrate" }),
              BufFillPct: D.m({ wire: "bufFillPct" }),
              BufSize: D.m({ wire: "bufSize" }),
              ColorMetadata: D.m({ wire: "colorMetadata" }),
              ColorSpaceSettings: D.m({
                wire: "colorSpaceSettings",
                shape: {
                  ColorSpacePassthroughSettings: D.m({
                    wire: "colorSpacePassthroughSettings",
                  }),
                  Rec601Settings: D.m({ wire: "rec601Settings" }),
                  Rec709Settings: D.m({ wire: "rec709Settings" }),
                },
              }),
              EntropyEncoding: D.m({ wire: "entropyEncoding" }),
              FilterSettings: D.m({
                wire: "filterSettings",
                shape: {
                  TemporalFilterSettings: D.m({
                    wire: "temporalFilterSettings",
                    shape: o_TemporalFilterSettings,
                  }),
                  BandwidthReductionFilterSettings: D.m({
                    wire: "bandwidthReductionFilterSettings",
                    shape: o_BandwidthReductionFilterSettings,
                  }),
                },
              }),
              FixedAfd: D.m({ wire: "fixedAfd" }),
              FlickerAq: D.m({ wire: "flickerAq" }),
              ForceFieldPictures: D.m({ wire: "forceFieldPictures" }),
              FramerateControl: D.m({ wire: "framerateControl" }),
              FramerateDenominator: D.m({ wire: "framerateDenominator" }),
              FramerateNumerator: D.m({ wire: "framerateNumerator" }),
              GopBReference: D.m({ wire: "gopBReference" }),
              GopClosedCadence: D.m({ wire: "gopClosedCadence" }),
              GopNumBFrames: D.m({ wire: "gopNumBFrames" }),
              GopSize: D.m({ wire: "gopSize" }),
              GopSizeUnits: D.m({ wire: "gopSizeUnits" }),
              Level: D.m({ wire: "level" }),
              LookAheadRateControl: D.m({ wire: "lookAheadRateControl" }),
              MaxBitrate: D.m({ wire: "maxBitrate" }),
              MinIInterval: D.m({ wire: "minIInterval" }),
              NumRefFrames: D.m({ wire: "numRefFrames" }),
              ParControl: D.m({ wire: "parControl" }),
              ParDenominator: D.m({ wire: "parDenominator" }),
              ParNumerator: D.m({ wire: "parNumerator" }),
              Profile: D.m({ wire: "profile" }),
              QualityLevel: D.m({ wire: "qualityLevel" }),
              QvbrQualityLevel: D.m({ wire: "qvbrQualityLevel" }),
              RateControlMode: D.m({ wire: "rateControlMode" }),
              ScanType: D.m({ wire: "scanType" }),
              SceneChangeDetect: D.m({ wire: "sceneChangeDetect" }),
              Slices: D.m({ wire: "slices" }),
              Softness: D.m({ wire: "softness" }),
              SpatialAq: D.m({ wire: "spatialAq" }),
              SubgopLength: D.m({ wire: "subgopLength" }),
              Syntax: D.m({ wire: "syntax" }),
              TemporalAq: D.m({ wire: "temporalAq" }),
              TimecodeInsertion: D.m({ wire: "timecodeInsertion" }),
              TimecodeBurninSettings: D.m({
                wire: "timecodeBurninSettings",
                shape: o_TimecodeBurninSettings,
              }),
              MinQp: D.m({ wire: "minQp" }),
              MinBitrate: D.m({ wire: "minBitrate" }),
            },
          }),
          H265Settings: D.m({
            wire: "h265Settings",
            shape: {
              AdaptiveQuantization: D.m({ wire: "adaptiveQuantization" }),
              AfdSignaling: D.m({ wire: "afdSignaling" }),
              AlternativeTransferFunction: D.m({
                wire: "alternativeTransferFunction",
              }),
              Bitrate: D.m({ wire: "bitrate" }),
              BufSize: D.m({ wire: "bufSize" }),
              ColorMetadata: D.m({ wire: "colorMetadata" }),
              ColorSpaceSettings: D.m({
                wire: "colorSpaceSettings",
                shape: {
                  ColorSpacePassthroughSettings: D.m({
                    wire: "colorSpacePassthroughSettings",
                  }),
                  DolbyVision81Settings: D.m({ wire: "dolbyVision81Settings" }),
                  Hdr10Settings: D.m({
                    wire: "hdr10Settings",
                    shape: o_Hdr10Settings,
                  }),
                  Rec601Settings: D.m({ wire: "rec601Settings" }),
                  Rec709Settings: D.m({ wire: "rec709Settings" }),
                  Hlg2020Settings: D.m({ wire: "hlg2020Settings" }),
                },
              }),
              FilterSettings: D.m({
                wire: "filterSettings",
                shape: {
                  TemporalFilterSettings: D.m({
                    wire: "temporalFilterSettings",
                    shape: o_TemporalFilterSettings,
                  }),
                  BandwidthReductionFilterSettings: D.m({
                    wire: "bandwidthReductionFilterSettings",
                    shape: o_BandwidthReductionFilterSettings,
                  }),
                },
              }),
              FixedAfd: D.m({ wire: "fixedAfd" }),
              FlickerAq: D.m({ wire: "flickerAq" }),
              FramerateDenominator: D.m({ wire: "framerateDenominator" }),
              FramerateNumerator: D.m({ wire: "framerateNumerator" }),
              GopClosedCadence: D.m({ wire: "gopClosedCadence" }),
              GopSize: D.m({ wire: "gopSize" }),
              GopSizeUnits: D.m({ wire: "gopSizeUnits" }),
              Level: D.m({ wire: "level" }),
              LookAheadRateControl: D.m({ wire: "lookAheadRateControl" }),
              MaxBitrate: D.m({ wire: "maxBitrate" }),
              MinIInterval: D.m({ wire: "minIInterval" }),
              ParDenominator: D.m({ wire: "parDenominator" }),
              ParNumerator: D.m({ wire: "parNumerator" }),
              Profile: D.m({ wire: "profile" }),
              QvbrQualityLevel: D.m({ wire: "qvbrQualityLevel" }),
              RateControlMode: D.m({ wire: "rateControlMode" }),
              ScanType: D.m({ wire: "scanType" }),
              SceneChangeDetect: D.m({ wire: "sceneChangeDetect" }),
              Slices: D.m({ wire: "slices" }),
              Tier: D.m({ wire: "tier" }),
              TimecodeInsertion: D.m({ wire: "timecodeInsertion" }),
              TimecodeBurninSettings: D.m({
                wire: "timecodeBurninSettings",
                shape: o_TimecodeBurninSettings,
              }),
              MvOverPictureBoundaries: D.m({ wire: "mvOverPictureBoundaries" }),
              MvTemporalPredictor: D.m({ wire: "mvTemporalPredictor" }),
              TileHeight: D.m({ wire: "tileHeight" }),
              TilePadding: D.m({ wire: "tilePadding" }),
              TileWidth: D.m({ wire: "tileWidth" }),
              TreeblockSize: D.m({ wire: "treeblockSize" }),
              MinQp: D.m({ wire: "minQp" }),
              Deblocking: D.m({ wire: "deblocking" }),
              GopBReference: D.m({ wire: "gopBReference" }),
              GopNumBFrames: D.m({ wire: "gopNumBFrames" }),
              MinBitrate: D.m({ wire: "minBitrate" }),
              SubgopLength: D.m({ wire: "subgopLength" }),
            },
          }),
          Mpeg2Settings: D.m({
            wire: "mpeg2Settings",
            shape: {
              AdaptiveQuantization: D.m({ wire: "adaptiveQuantization" }),
              AfdSignaling: D.m({ wire: "afdSignaling" }),
              ColorMetadata: D.m({ wire: "colorMetadata" }),
              ColorSpace: D.m({ wire: "colorSpace" }),
              DisplayAspectRatio: D.m({ wire: "displayAspectRatio" }),
              FilterSettings: D.m({
                wire: "filterSettings",
                shape: {
                  TemporalFilterSettings: D.m({
                    wire: "temporalFilterSettings",
                    shape: o_TemporalFilterSettings,
                  }),
                },
              }),
              FixedAfd: D.m({ wire: "fixedAfd" }),
              FramerateDenominator: D.m({ wire: "framerateDenominator" }),
              FramerateNumerator: D.m({ wire: "framerateNumerator" }),
              GopClosedCadence: D.m({ wire: "gopClosedCadence" }),
              GopNumBFrames: D.m({ wire: "gopNumBFrames" }),
              GopSize: D.m({ wire: "gopSize" }),
              GopSizeUnits: D.m({ wire: "gopSizeUnits" }),
              ScanType: D.m({ wire: "scanType" }),
              SubgopLength: D.m({ wire: "subgopLength" }),
              TimecodeInsertion: D.m({ wire: "timecodeInsertion" }),
              TimecodeBurninSettings: D.m({
                wire: "timecodeBurninSettings",
                shape: o_TimecodeBurninSettings,
              }),
            },
          }),
          Av1Settings: D.m({
            wire: "av1Settings",
            shape: {
              AfdSignaling: D.m({ wire: "afdSignaling" }),
              BufSize: D.m({ wire: "bufSize" }),
              ColorSpaceSettings: D.m({
                wire: "colorSpaceSettings",
                shape: {
                  ColorSpacePassthroughSettings: D.m({
                    wire: "colorSpacePassthroughSettings",
                  }),
                  Hdr10Settings: D.m({
                    wire: "hdr10Settings",
                    shape: o_Hdr10Settings,
                  }),
                  Rec601Settings: D.m({ wire: "rec601Settings" }),
                  Rec709Settings: D.m({ wire: "rec709Settings" }),
                  Hlg2020Settings: D.m({ wire: "hlg2020Settings" }),
                },
              }),
              FixedAfd: D.m({ wire: "fixedAfd" }),
              FramerateDenominator: D.m({ wire: "framerateDenominator" }),
              FramerateNumerator: D.m({ wire: "framerateNumerator" }),
              GopSize: D.m({ wire: "gopSize" }),
              GopSizeUnits: D.m({ wire: "gopSizeUnits" }),
              Level: D.m({ wire: "level" }),
              LookAheadRateControl: D.m({ wire: "lookAheadRateControl" }),
              MaxBitrate: D.m({ wire: "maxBitrate" }),
              MinIInterval: D.m({ wire: "minIInterval" }),
              ParDenominator: D.m({ wire: "parDenominator" }),
              ParNumerator: D.m({ wire: "parNumerator" }),
              QvbrQualityLevel: D.m({ wire: "qvbrQualityLevel" }),
              SceneChangeDetect: D.m({ wire: "sceneChangeDetect" }),
              TimecodeBurninSettings: D.m({
                wire: "timecodeBurninSettings",
                shape: o_TimecodeBurninSettings,
              }),
              Bitrate: D.m({ wire: "bitrate" }),
              RateControlMode: D.m({ wire: "rateControlMode" }),
              MinBitrate: D.m({ wire: "minBitrate" }),
              SpatialAq: D.m({ wire: "spatialAq" }),
              TemporalAq: D.m({ wire: "temporalAq" }),
              TimecodeInsertion: D.m({ wire: "timecodeInsertion" }),
              BitDepth: D.m({ wire: "bitDepth" }),
            },
          }),
        },
      }),
      Height: D.m({ wire: "height" }),
      Name: D.m({ wire: "name" }),
      RespondToAfd: D.m({ wire: "respondToAfd" }),
      ScalingBehavior: D.m({ wire: "scalingBehavior" }),
      Sharpness: D.m({ wire: "sharpness" }),
      Width: D.m({ wire: "width" }),
      CropRectangle: D.m({
        wire: "cropRectangle",
        shape: o_VideoPositionRectangle,
      }),
      OutputPositionRectangle: D.m({
        wire: "outputPositionRectangle",
        shape: o_VideoPositionRectangle,
      }),
    }),
  }),
  ThumbnailConfiguration: D.m({
    wire: "thumbnailConfiguration",
    shape: { State: D.m({ wire: "state" }) },
  }),
  ColorCorrectionSettings: D.m({
    wire: "colorCorrectionSettings",
    shape: {
      GlobalColorCorrections: D.m({
        wire: "globalColorCorrections",
        shape: D.list({
          InputColorSpace: D.m({ wire: "inputColorSpace" }),
          OutputColorSpace: D.m({ wire: "outputColorSpace" }),
          Uri: D.m({ wire: "uri" }),
        }),
      }),
    },
  }),
});
const o_EventBridgeRuleTemplateTarget: D.LazyStruct = () => ({
  Arn: D.m({ wire: "arn" }),
});
const o_Input: D.LazyStruct = () => ({
  Arn: D.m({ wire: "arn" }),
  AttachedChannels: D.m({ wire: "attachedChannels" }),
  Destinations: D.m({
    wire: "destinations",
    shape: D.list(o_InputDestination),
  }),
  Id: D.m({ wire: "id" }),
  InputClass: D.m({ wire: "inputClass" }),
  InputDevices: D.m({
    wire: "inputDevices",
    shape: D.list(o_InputDeviceSettings),
  }),
  InputPartnerIds: D.m({ wire: "inputPartnerIds" }),
  InputSourceType: D.m({ wire: "inputSourceType" }),
  MediaConnectFlows: D.m({
    wire: "mediaConnectFlows",
    shape: D.list(o_MediaConnectFlow),
  }),
  Name: D.m({ wire: "name" }),
  RoleArn: D.m({ wire: "roleArn" }),
  SecurityGroups: D.m({ wire: "securityGroups" }),
  Sources: D.m({ wire: "sources", shape: D.list(o_InputSource) }),
  State: D.m({ wire: "state" }),
  Tags: D.m({ wire: "tags" }),
  Type: D.m({ wire: "type" }),
  SrtSettings: D.m({ wire: "srtSettings", shape: o_SrtSettings }),
  InputNetworkLocation: D.m({ wire: "inputNetworkLocation" }),
  MulticastSettings: D.m({
    wire: "multicastSettings",
    shape: o_MulticastSettings,
  }),
  Smpte2110ReceiverGroupSettings: D.m({
    wire: "smpte2110ReceiverGroupSettings",
    shape: o_Smpte2110ReceiverGroupSettings,
  }),
  SdiSources: D.m({ wire: "sdiSources" }),
  RouterSettings: D.m({ wire: "routerSettings", shape: o_RouterInputSettings }),
});
const o_InputAttachment: D.LazyStruct = () => ({
  AutomaticInputFailoverSettings: D.m({
    wire: "automaticInputFailoverSettings",
    shape: {
      ErrorClearTimeMsec: D.m({ wire: "errorClearTimeMsec" }),
      FailoverConditions: D.m({
        wire: "failoverConditions",
        shape: D.list({
          FailoverConditionSettings: D.m({
            wire: "failoverConditionSettings",
            shape: {
              AudioSilenceSettings: D.m({
                wire: "audioSilenceSettings",
                shape: {
                  AudioSelectorName: D.m({ wire: "audioSelectorName" }),
                  AudioSilenceThresholdMsec: D.m({
                    wire: "audioSilenceThresholdMsec",
                  }),
                },
              }),
              InputLossSettings: D.m({
                wire: "inputLossSettings",
                shape: {
                  InputLossThresholdMsec: D.m({
                    wire: "inputLossThresholdMsec",
                  }),
                },
              }),
              VideoBlackSettings: D.m({
                wire: "videoBlackSettings",
                shape: {
                  BlackDetectThreshold: D.m({ wire: "blackDetectThreshold" }),
                  VideoBlackThresholdMsec: D.m({
                    wire: "videoBlackThresholdMsec",
                  }),
                },
              }),
            },
          }),
        }),
      }),
      InputPreference: D.m({ wire: "inputPreference" }),
      SecondaryInputId: D.m({ wire: "secondaryInputId" }),
    },
  }),
  InputAttachmentName: D.m({ wire: "inputAttachmentName" }),
  InputId: D.m({ wire: "inputId" }),
  InputSettings: D.m({
    wire: "inputSettings",
    shape: {
      AudioSelectors: D.m({
        wire: "audioSelectors",
        shape: D.list({
          Name: D.m({ wire: "name" }),
          SelectorSettings: D.m({
            wire: "selectorSettings",
            shape: {
              AudioHlsRenditionSelection: D.m({
                wire: "audioHlsRenditionSelection",
                shape: {
                  GroupId: D.m({ wire: "groupId" }),
                  Name: D.m({ wire: "name" }),
                },
              }),
              AudioLanguageSelection: D.m({
                wire: "audioLanguageSelection",
                shape: {
                  LanguageCode: D.m({ wire: "languageCode" }),
                  LanguageSelectionPolicy: D.m({
                    wire: "languageSelectionPolicy",
                  }),
                },
              }),
              AudioPidSelection: D.m({
                wire: "audioPidSelection",
                shape: {
                  Pid: D.m({ wire: "pid" }),
                  Pids: D.m({
                    wire: "pids",
                    shape: D.list({
                      DolbyEDecode: D.m({
                        wire: "dolbyEDecode",
                        shape: o_AudioDolbyEDecode,
                      }),
                      Pid: D.m({ wire: "pid" }),
                      PremixSettings: D.m({
                        wire: "premixSettings",
                        shape: o_AudioPreMixerSettings,
                      }),
                    }),
                  }),
                },
              }),
              AudioTrackSelection: D.m({
                wire: "audioTrackSelection",
                shape: {
                  Tracks: D.m({
                    wire: "tracks",
                    shape: D.list({
                      Track: D.m({ wire: "track" }),
                      PremixSettings: D.m({
                        wire: "premixSettings",
                        shape: o_AudioPreMixerSettings,
                      }),
                    }),
                  }),
                  DolbyEDecode: D.m({
                    wire: "dolbyEDecode",
                    shape: o_AudioDolbyEDecode,
                  }),
                },
              }),
            },
          }),
        }),
      }),
      CaptionSelectors: D.m({
        wire: "captionSelectors",
        shape: D.list({
          LanguageCode: D.m({ wire: "languageCode" }),
          Name: D.m({ wire: "name" }),
          SelectorSettings: D.m({
            wire: "selectorSettings",
            shape: {
              AncillarySourceSettings: D.m({
                wire: "ancillarySourceSettings",
                shape: {
                  SourceAncillaryChannelNumber: D.m({
                    wire: "sourceAncillaryChannelNumber",
                  }),
                },
              }),
              AribSourceSettings: D.m({ wire: "aribSourceSettings" }),
              DvbSubSourceSettings: D.m({
                wire: "dvbSubSourceSettings",
                shape: {
                  OcrLanguage: D.m({ wire: "ocrLanguage" }),
                  Pid: D.m({ wire: "pid" }),
                },
              }),
              EmbeddedSourceSettings: D.m({
                wire: "embeddedSourceSettings",
                shape: {
                  Convert608To708: D.m({ wire: "convert608To708" }),
                  Scte20Detection: D.m({ wire: "scte20Detection" }),
                  Source608ChannelNumber: D.m({
                    wire: "source608ChannelNumber",
                  }),
                  Source608TrackNumber: D.m({ wire: "source608TrackNumber" }),
                },
              }),
              Scte20SourceSettings: D.m({
                wire: "scte20SourceSettings",
                shape: {
                  Convert608To708: D.m({ wire: "convert608To708" }),
                  Source608ChannelNumber: D.m({
                    wire: "source608ChannelNumber",
                  }),
                },
              }),
              Scte27SourceSettings: D.m({
                wire: "scte27SourceSettings",
                shape: {
                  OcrLanguage: D.m({ wire: "ocrLanguage" }),
                  Pid: D.m({ wire: "pid" }),
                },
              }),
              TeletextSourceSettings: D.m({
                wire: "teletextSourceSettings",
                shape: {
                  OutputRectangle: D.m({
                    wire: "outputRectangle",
                    shape: {
                      Height: D.m({ wire: "height" }),
                      LeftOffset: D.m({ wire: "leftOffset" }),
                      TopOffset: D.m({ wire: "topOffset" }),
                      Width: D.m({ wire: "width" }),
                    },
                  }),
                  PageNumber: D.m({ wire: "pageNumber" }),
                },
              }),
              SmartSubtitleSourceSettings: D.m({
                wire: "smartSubtitleSourceSettings",
                shape: {
                  CaptionSynchronizationMode: D.m({
                    wire: "captionSynchronizationMode",
                  }),
                  InferenceFeedOutput: D.m({ wire: "inferenceFeedOutput" }),
                },
              }),
            },
          }),
        }),
      }),
      DeblockFilter: D.m({ wire: "deblockFilter" }),
      DenoiseFilter: D.m({ wire: "denoiseFilter" }),
      FilterStrength: D.m({ wire: "filterStrength" }),
      InputFilter: D.m({ wire: "inputFilter" }),
      NetworkInputSettings: D.m({
        wire: "networkInputSettings",
        shape: {
          HlsInputSettings: D.m({
            wire: "hlsInputSettings",
            shape: {
              Bandwidth: D.m({ wire: "bandwidth" }),
              BufferSegments: D.m({ wire: "bufferSegments" }),
              Retries: D.m({ wire: "retries" }),
              RetryInterval: D.m({ wire: "retryInterval" }),
              Scte35Source: D.m({ wire: "scte35Source" }),
            },
          }),
          ServerValidation: D.m({ wire: "serverValidation" }),
          MulticastInputSettings: D.m({
            wire: "multicastInputSettings",
            shape: { SourceIpAddress: D.m({ wire: "sourceIpAddress" }) },
          }),
        },
      }),
      Scte35Pid: D.m({ wire: "scte35Pid" }),
      Smpte2038DataPreference: D.m({ wire: "smpte2038DataPreference" }),
      SourceEndBehavior: D.m({ wire: "sourceEndBehavior" }),
      VideoSelector: D.m({
        wire: "videoSelector",
        shape: {
          ColorSpace: D.m({ wire: "colorSpace" }),
          ColorSpaceSettings: D.m({
            wire: "colorSpaceSettings",
            shape: {
              Hdr10Settings: D.m({
                wire: "hdr10Settings",
                shape: o_Hdr10Settings,
              }),
            },
          }),
          ColorSpaceUsage: D.m({ wire: "colorSpaceUsage" }),
          SelectorSettings: D.m({
            wire: "selectorSettings",
            shape: {
              VideoSelectorPid: D.m({
                wire: "videoSelectorPid",
                shape: { Pid: D.m({ wire: "pid" }) },
              }),
              VideoSelectorProgramId: D.m({
                wire: "videoSelectorProgramId",
                shape: { ProgramId: D.m({ wire: "programId" }) },
              }),
            },
          }),
        },
      }),
    },
  }),
  LogicalInterfaceNames: D.m({ wire: "logicalInterfaceNames" }),
});
const o_InputDestination: D.LazyStruct = () => ({
  Ip: D.m({ wire: "ip" }),
  Port: D.m({ wire: "port" }),
  Url: D.m({ wire: "url" }),
  Vpc: D.m({
    wire: "vpc",
    shape: {
      AvailabilityZone: D.m({ wire: "availabilityZone" }),
      NetworkInterfaceId: D.m({ wire: "networkInterfaceId" }),
    },
  }),
  Network: D.m({ wire: "network" }),
  NetworkRoutes: D.m({
    wire: "networkRoutes",
    shape: D.list({
      Cidr: D.m({ wire: "cidr" }),
      Gateway: D.m({ wire: "gateway" }),
    }),
  }),
});
const o_InputDeviceHdSettings: D.LazyStruct = () => ({
  ActiveInput: D.m({ wire: "activeInput" }),
  ConfiguredInput: D.m({ wire: "configuredInput" }),
  DeviceState: D.m({ wire: "deviceState" }),
  Framerate: D.m({ wire: "framerate" }),
  Height: D.m({ wire: "height" }),
  MaxBitrate: D.m({ wire: "maxBitrate" }),
  ScanType: D.m({ wire: "scanType" }),
  Width: D.m({ wire: "width" }),
  LatencyMs: D.m({ wire: "latencyMs" }),
});
const o_InputDeviceNetworkSettings: D.LazyStruct = () => ({
  DnsAddresses: D.m({ wire: "dnsAddresses" }),
  Gateway: D.m({ wire: "gateway" }),
  IpAddress: D.m({ wire: "ipAddress" }),
  IpScheme: D.m({ wire: "ipScheme" }),
  SubnetMask: D.m({ wire: "subnetMask" }),
});
const o_InputDeviceSettings: D.LazyStruct = () => ({ Id: D.m({ wire: "id" }) });
const o_InputDeviceUhdSettings: D.LazyStruct = () => ({
  ActiveInput: D.m({ wire: "activeInput" }),
  ConfiguredInput: D.m({ wire: "configuredInput" }),
  DeviceState: D.m({ wire: "deviceState" }),
  Framerate: D.m({ wire: "framerate" }),
  Height: D.m({ wire: "height" }),
  MaxBitrate: D.m({ wire: "maxBitrate" }),
  ScanType: D.m({ wire: "scanType" }),
  Width: D.m({ wire: "width" }),
  LatencyMs: D.m({ wire: "latencyMs" }),
  Codec: D.m({ wire: "codec" }),
  MediaconnectSettings: D.m({
    wire: "mediaconnectSettings",
    shape: {
      FlowArn: D.m({ wire: "flowArn" }),
      RoleArn: D.m({ wire: "roleArn" }),
      SecretArn: D.m({ wire: "secretArn" }),
      SourceName: D.m({ wire: "sourceName" }),
    },
  }),
  AudioChannelPairs: D.m({
    wire: "audioChannelPairs",
    shape: D.list({
      Id: D.m({ wire: "id" }),
      Profile: D.m({ wire: "profile" }),
    }),
  }),
  InputResolution: D.m({ wire: "inputResolution" }),
});
const o_InputSecurityGroup: D.LazyStruct = () => ({
  Arn: D.m({ wire: "arn" }),
  Id: D.m({ wire: "id" }),
  Inputs: D.m({ wire: "inputs" }),
  State: D.m({ wire: "state" }),
  Tags: D.m({ wire: "tags" }),
  WhitelistRules: D.m({
    wire: "whitelistRules",
    shape: D.list(o_InputWhitelistRule),
  }),
  Channels: D.m({ wire: "channels" }),
});
const o_InputSource: D.LazyStruct = () => ({
  PasswordParam: D.m({ wire: "passwordParam" }),
  Url: D.m({ wire: "url" }),
  Username: D.m({ wire: "username" }),
});
const o_InputSpecification: D.LazyStruct = () => ({
  Codec: D.m({ wire: "codec" }),
  MaximumBitrate: D.m({ wire: "maximumBitrate" }),
  Resolution: D.m({ wire: "resolution" }),
});
const o_InputWhitelistRule: D.LazyStruct = () => ({
  Cidr: D.m({ wire: "cidr" }),
});
const o_IpPool: D.LazyStruct = () => ({ Cidr: D.m({ wire: "cidr" }) });
const o_MaintenanceStatus: D.LazyStruct = () => ({
  MaintenanceDay: D.m({ wire: "maintenanceDay" }),
  MaintenanceDeadline: D.m({ wire: "maintenanceDeadline" }),
  MaintenanceScheduledDate: D.m({ wire: "maintenanceScheduledDate" }),
  MaintenanceStartTime: D.m({ wire: "maintenanceStartTime" }),
});
const o_MediaConnectFlow: D.LazyStruct = () => ({
  FlowArn: D.m({ wire: "flowArn" }),
});
const o_MediaResource: D.LazyStruct = () => ({
  Destinations: D.m({
    wire: "destinations",
    shape: D.list(o_MediaResourceNeighbor),
  }),
  Name: D.m({ wire: "name" }),
  Sources: D.m({ wire: "sources", shape: D.list(o_MediaResourceNeighbor) }),
});
const o_MonitorDeployment: D.LazyStruct = () => ({
  DetailsUri: D.m({ wire: "detailsUri" }),
  ErrorMessage: D.m({ wire: "errorMessage" }),
  Status: D.m({ wire: "status" }),
});
const o_MulticastSettings: D.LazyStruct = () => ({
  Sources: D.m({
    wire: "sources",
    shape: D.list({
      SourceIp: D.m({ wire: "sourceIp" }),
      Url: D.m({ wire: "url" }),
    }),
  }),
});
const o_Multiplex: D.LazyStruct = () => ({
  Arn: D.m({ wire: "arn" }),
  AvailabilityZones: D.m({ wire: "availabilityZones" }),
  Destinations: D.m({
    wire: "destinations",
    shape: D.list(o_MultiplexOutputDestination),
  }),
  Id: D.m({ wire: "id" }),
  MultiplexSettings: D.m({
    wire: "multiplexSettings",
    shape: o_MultiplexSettings,
  }),
  Name: D.m({ wire: "name" }),
  PipelinesRunningCount: D.m({ wire: "pipelinesRunningCount" }),
  ProgramCount: D.m({ wire: "programCount" }),
  State: D.m({ wire: "state" }),
  Tags: D.m({ wire: "tags" }),
});
const o_MultiplexOutputDestination: D.LazyStruct = () => ({
  MediaConnectSettings: D.m({
    wire: "mediaConnectSettings",
    shape: { EntitlementArn: D.m({ wire: "entitlementArn" }) },
  }),
});
const o_MultiplexProgram: D.LazyStruct = () => ({
  ChannelId: D.m({ wire: "channelId" }),
  MultiplexProgramSettings: D.m({
    wire: "multiplexProgramSettings",
    shape: o_MultiplexProgramSettings,
  }),
  PacketIdentifiersMap: D.m({
    wire: "packetIdentifiersMap",
    shape: o_MultiplexProgramPacketIdentifiersMap,
  }),
  PipelineDetails: D.m({
    wire: "pipelineDetails",
    shape: D.list(o_MultiplexProgramPipelineDetail),
  }),
  ProgramName: D.m({ wire: "programName" }),
});
const o_MultiplexProgramPacketIdentifiersMap: D.LazyStruct = () => ({
  AudioPids: D.m({ wire: "audioPids" }),
  DvbSubPids: D.m({ wire: "dvbSubPids" }),
  DvbTeletextPid: D.m({ wire: "dvbTeletextPid" }),
  EtvPlatformPid: D.m({ wire: "etvPlatformPid" }),
  EtvSignalPid: D.m({ wire: "etvSignalPid" }),
  KlvDataPids: D.m({ wire: "klvDataPids" }),
  PcrPid: D.m({ wire: "pcrPid" }),
  PmtPid: D.m({ wire: "pmtPid" }),
  PrivateMetadataPid: D.m({ wire: "privateMetadataPid" }),
  Scte27Pids: D.m({ wire: "scte27Pids" }),
  Scte35Pid: D.m({ wire: "scte35Pid" }),
  TimedMetadataPid: D.m({ wire: "timedMetadataPid" }),
  VideoPid: D.m({ wire: "videoPid" }),
  AribCaptionsPid: D.m({ wire: "aribCaptionsPid" }),
  DvbTeletextPids: D.m({ wire: "dvbTeletextPids" }),
  EcmPid: D.m({ wire: "ecmPid" }),
  Smpte2038Pid: D.m({ wire: "smpte2038Pid" }),
});
const o_MultiplexProgramPipelineDetail: D.LazyStruct = () => ({
  ActiveChannelPipeline: D.m({ wire: "activeChannelPipeline" }),
  PipelineId: D.m({ wire: "pipelineId" }),
});
const o_MultiplexProgramSettings: D.LazyStruct = () => ({
  PreferredChannelPipeline: D.m({ wire: "preferredChannelPipeline" }),
  ProgramNumber: D.m({ wire: "programNumber" }),
  ServiceDescriptor: D.m({
    wire: "serviceDescriptor",
    shape: {
      ProviderName: D.m({ wire: "providerName" }),
      ServiceName: D.m({ wire: "serviceName" }),
    },
  }),
  VideoSettings: D.m({
    wire: "videoSettings",
    shape: {
      ConstantBitrate: D.m({ wire: "constantBitrate" }),
      StatmuxSettings: D.m({
        wire: "statmuxSettings",
        shape: {
          MaximumBitrate: D.m({ wire: "maximumBitrate" }),
          MinimumBitrate: D.m({ wire: "minimumBitrate" }),
          Priority: D.m({ wire: "priority" }),
        },
      }),
    },
  }),
});
const o_MultiplexSettings: D.LazyStruct = () => ({
  MaximumVideoBufferDelayMilliseconds: D.m({
    wire: "maximumVideoBufferDelayMilliseconds",
  }),
  TransportStreamBitrate: D.m({ wire: "transportStreamBitrate" }),
  TransportStreamId: D.m({ wire: "transportStreamId" }),
  TransportStreamReservedBitrate: D.m({
    wire: "transportStreamReservedBitrate",
  }),
});
const o_NodeInterfaceMapping: D.LazyStruct = () => ({
  LogicalInterfaceName: D.m({ wire: "logicalInterfaceName" }),
  NetworkInterfaceMode: D.m({ wire: "networkInterfaceMode" }),
  PhysicalInterfaceName: D.m({ wire: "physicalInterfaceName" }),
  PhysicalInterfaceIpAddresses: D.m({ wire: "physicalInterfaceIpAddresses" }),
});
const o_OutputDestination: D.LazyStruct = () => ({
  Id: D.m({ wire: "id" }),
  MediaPackageSettings: D.m({
    wire: "mediaPackageSettings",
    shape: D.list({
      ChannelId: D.m({ wire: "channelId" }),
      ChannelGroup: D.m({ wire: "channelGroup" }),
      ChannelName: D.m({ wire: "channelName" }),
      ChannelEndpointId: D.m({ wire: "channelEndpointId" }),
      MediaPackageRegionName: D.m({ wire: "mediaPackageRegionName" }),
    }),
  }),
  MultiplexSettings: D.m({
    wire: "multiplexSettings",
    shape: {
      MultiplexId: D.m({ wire: "multiplexId" }),
      ProgramName: D.m({ wire: "programName" }),
    },
  }),
  Settings: D.m({
    wire: "settings",
    shape: D.list({
      PasswordParam: D.m({ wire: "passwordParam" }),
      StreamName: D.m({ wire: "streamName" }),
      Url: D.m({ wire: "url" }),
      Username: D.m({ wire: "username" }),
      VirtualSourceAddress: D.m({ wire: "virtualSourceAddress" }),
    }),
  }),
  SrtSettings: D.m({
    wire: "srtSettings",
    shape: D.list({
      EncryptionPassphraseSecretArn: D.m({
        wire: "encryptionPassphraseSecretArn",
      }),
      StreamId: D.m({ wire: "streamId" }),
      Url: D.m({ wire: "url" }),
      ConnectionMode: D.m({ wire: "connectionMode" }),
      ListenerPort: D.m({ wire: "listenerPort" }),
    }),
  }),
  LogicalInterfaceNames: D.m({ wire: "logicalInterfaceNames" }),
  MediaConnectRouterSettings: D.m({
    wire: "mediaConnectRouterSettings",
    shape: D.list({
      EncryptionType: D.m({ wire: "encryptionType" }),
      SecretArn: D.m({ wire: "secretArn" }),
    }),
  }),
});
const o_PipelineDetail: D.LazyStruct = () => ({
  ActiveInputAttachmentName: D.m({ wire: "activeInputAttachmentName" }),
  ActiveInputSwitchActionName: D.m({ wire: "activeInputSwitchActionName" }),
  ActiveMotionGraphicsActionName: D.m({
    wire: "activeMotionGraphicsActionName",
  }),
  ActiveMotionGraphicsUri: D.m({ wire: "activeMotionGraphicsUri" }),
  PipelineId: D.m({ wire: "pipelineId" }),
  ChannelEngineVersion: D.m({
    wire: "channelEngineVersion",
    shape: o_ChannelEngineVersionResponse,
  }),
  MediaConnectRouterOutputConnectionMap: D.m({
    wire: "mediaConnectRouterOutputConnectionMap",
    shape: D.map({ RouterInputArn: D.m({ wire: "routerInputArn" }) }),
  }),
});
const o_RenewalSettings: D.LazyStruct = () => ({
  AutomaticRenewal: D.m({ wire: "automaticRenewal" }),
  RenewalCount: D.m({ wire: "renewalCount" }),
});
const o_Reservation: D.LazyStruct = () => ({
  Arn: D.m({ wire: "arn" }),
  Count: D.m({ wire: "count" }),
  CurrencyCode: D.m({ wire: "currencyCode" }),
  Duration: D.m({ wire: "duration" }),
  DurationUnits: D.m({ wire: "durationUnits" }),
  End: D.m({ wire: "end" }),
  FixedPrice: D.m({ wire: "fixedPrice" }),
  Name: D.m({ wire: "name" }),
  OfferingDescription: D.m({ wire: "offeringDescription" }),
  OfferingId: D.m({ wire: "offeringId" }),
  OfferingType: D.m({ wire: "offeringType" }),
  Region: D.m({ wire: "region" }),
  RenewalSettings: D.m({ wire: "renewalSettings", shape: o_RenewalSettings }),
  ReservationId: D.m({ wire: "reservationId" }),
  ResourceSpecification: D.m({
    wire: "resourceSpecification",
    shape: o_ReservationResourceSpecification,
  }),
  Start: D.m({ wire: "start" }),
  State: D.m({ wire: "state" }),
  Tags: D.m({ wire: "tags" }),
  UsagePrice: D.m({ wire: "usagePrice" }),
});
const o_ReservationResourceSpecification: D.LazyStruct = () => ({
  ChannelClass: D.m({ wire: "channelClass" }),
  Codec: D.m({ wire: "codec" }),
  MaximumBitrate: D.m({ wire: "maximumBitrate" }),
  MaximumFramerate: D.m({ wire: "maximumFramerate" }),
  Resolution: D.m({ wire: "resolution" }),
  ResourceType: D.m({ wire: "resourceType" }),
  SpecialFeature: D.m({ wire: "specialFeature" }),
  VideoQuality: D.m({ wire: "videoQuality" }),
});
const o_Route: D.LazyStruct = () => ({
  Cidr: D.m({ wire: "cidr" }),
  Gateway: D.m({ wire: "gateway" }),
});
const o_RouterInputSettings: D.LazyStruct = () => ({
  Destinations: D.m({
    wire: "destinations",
    shape: D.list({
      AvailabilityZoneName: D.m({ wire: "availabilityZoneName" }),
      RouterOutputArn: D.m({ wire: "routerOutputArn" }),
    }),
  }),
  EncryptionType: D.m({ wire: "encryptionType" }),
  SecretArn: D.m({ wire: "secretArn" }),
});
const o_ScheduleAction: D.LazyStruct = () => ({
  ActionName: D.m({ wire: "actionName" }),
  ScheduleActionSettings: D.m({
    wire: "scheduleActionSettings",
    shape: {
      HlsId3SegmentTaggingSettings: D.m({
        wire: "hlsId3SegmentTaggingSettings",
        shape: { Tag: D.m({ wire: "tag" }), Id3: D.m({ wire: "id3" }) },
      }),
      HlsTimedMetadataSettings: D.m({
        wire: "hlsTimedMetadataSettings",
        shape: { Id3: D.m({ wire: "id3" }) },
      }),
      InputPrepareSettings: D.m({
        wire: "inputPrepareSettings",
        shape: {
          InputAttachmentNameReference: D.m({
            wire: "inputAttachmentNameReference",
          }),
          InputClippingSettings: D.m({
            wire: "inputClippingSettings",
            shape: o_InputClippingSettings,
          }),
          UrlPath: D.m({ wire: "urlPath" }),
        },
      }),
      InputSwitchSettings: D.m({
        wire: "inputSwitchSettings",
        shape: {
          InputAttachmentNameReference: D.m({
            wire: "inputAttachmentNameReference",
          }),
          InputClippingSettings: D.m({
            wire: "inputClippingSettings",
            shape: o_InputClippingSettings,
          }),
          UrlPath: D.m({ wire: "urlPath" }),
        },
      }),
      MotionGraphicsImageActivateSettings: D.m({
        wire: "motionGraphicsImageActivateSettings",
        shape: {
          Duration: D.m({ wire: "duration" }),
          PasswordParam: D.m({ wire: "passwordParam" }),
          Url: D.m({ wire: "url" }),
          Username: D.m({ wire: "username" }),
        },
      }),
      MotionGraphicsImageDeactivateSettings: D.m({
        wire: "motionGraphicsImageDeactivateSettings",
      }),
      PauseStateSettings: D.m({
        wire: "pauseStateSettings",
        shape: {
          Pipelines: D.m({
            wire: "pipelines",
            shape: D.list({ PipelineId: D.m({ wire: "pipelineId" }) }),
          }),
        },
      }),
      Scte35InputSettings: D.m({
        wire: "scte35InputSettings",
        shape: {
          InputAttachmentNameReference: D.m({
            wire: "inputAttachmentNameReference",
          }),
          Mode: D.m({ wire: "mode" }),
        },
      }),
      Scte35ReturnToNetworkSettings: D.m({
        wire: "scte35ReturnToNetworkSettings",
        shape: { SpliceEventId: D.m({ wire: "spliceEventId" }) },
      }),
      Scte35SpliceInsertSettings: D.m({
        wire: "scte35SpliceInsertSettings",
        shape: {
          Duration: D.m({ wire: "duration" }),
          SpliceEventId: D.m({ wire: "spliceEventId" }),
        },
      }),
      Scte35TimeSignalSettings: D.m({
        wire: "scte35TimeSignalSettings",
        shape: {
          Scte35Descriptors: D.m({
            wire: "scte35Descriptors",
            shape: D.list({
              Scte35DescriptorSettings: D.m({
                wire: "scte35DescriptorSettings",
                shape: {
                  SegmentationDescriptorScte35DescriptorSettings: D.m({
                    wire: "segmentationDescriptorScte35DescriptorSettings",
                    shape: {
                      DeliveryRestrictions: D.m({
                        wire: "deliveryRestrictions",
                        shape: {
                          ArchiveAllowedFlag: D.m({
                            wire: "archiveAllowedFlag",
                          }),
                          DeviceRestrictions: D.m({
                            wire: "deviceRestrictions",
                          }),
                          NoRegionalBlackoutFlag: D.m({
                            wire: "noRegionalBlackoutFlag",
                          }),
                          WebDeliveryAllowedFlag: D.m({
                            wire: "webDeliveryAllowedFlag",
                          }),
                        },
                      }),
                      SegmentNum: D.m({ wire: "segmentNum" }),
                      SegmentationCancelIndicator: D.m({
                        wire: "segmentationCancelIndicator",
                      }),
                      SegmentationDuration: D.m({
                        wire: "segmentationDuration",
                      }),
                      SegmentationEventId: D.m({ wire: "segmentationEventId" }),
                      SegmentationTypeId: D.m({ wire: "segmentationTypeId" }),
                      SegmentationUpid: D.m({ wire: "segmentationUpid" }),
                      SegmentationUpidType: D.m({
                        wire: "segmentationUpidType",
                      }),
                      SegmentsExpected: D.m({ wire: "segmentsExpected" }),
                      SubSegmentNum: D.m({ wire: "subSegmentNum" }),
                      SubSegmentsExpected: D.m({ wire: "subSegmentsExpected" }),
                    },
                  }),
                },
              }),
            }),
          }),
        },
      }),
      StaticImageActivateSettings: D.m({
        wire: "staticImageActivateSettings",
        shape: {
          Duration: D.m({ wire: "duration" }),
          FadeIn: D.m({ wire: "fadeIn" }),
          FadeOut: D.m({ wire: "fadeOut" }),
          Height: D.m({ wire: "height" }),
          Image: D.m({ wire: "image", shape: o_InputLocation }),
          ImageX: D.m({ wire: "imageX" }),
          ImageY: D.m({ wire: "imageY" }),
          Layer: D.m({ wire: "layer" }),
          Opacity: D.m({ wire: "opacity" }),
          Width: D.m({ wire: "width" }),
        },
      }),
      StaticImageDeactivateSettings: D.m({
        wire: "staticImageDeactivateSettings",
        shape: {
          FadeOut: D.m({ wire: "fadeOut" }),
          Layer: D.m({ wire: "layer" }),
        },
      }),
      StaticImageOutputActivateSettings: D.m({
        wire: "staticImageOutputActivateSettings",
        shape: {
          Duration: D.m({ wire: "duration" }),
          FadeIn: D.m({ wire: "fadeIn" }),
          FadeOut: D.m({ wire: "fadeOut" }),
          Height: D.m({ wire: "height" }),
          Image: D.m({ wire: "image", shape: o_InputLocation }),
          ImageX: D.m({ wire: "imageX" }),
          ImageY: D.m({ wire: "imageY" }),
          Layer: D.m({ wire: "layer" }),
          Opacity: D.m({ wire: "opacity" }),
          OutputNames: D.m({ wire: "outputNames" }),
          Width: D.m({ wire: "width" }),
        },
      }),
      StaticImageOutputDeactivateSettings: D.m({
        wire: "staticImageOutputDeactivateSettings",
        shape: {
          FadeOut: D.m({ wire: "fadeOut" }),
          Layer: D.m({ wire: "layer" }),
          OutputNames: D.m({ wire: "outputNames" }),
        },
      }),
      Id3SegmentTaggingSettings: D.m({
        wire: "id3SegmentTaggingSettings",
        shape: { Id3: D.m({ wire: "id3" }), Tag: D.m({ wire: "tag" }) },
      }),
      TimedMetadataSettings: D.m({
        wire: "timedMetadataSettings",
        shape: { Id3: D.m({ wire: "id3" }) },
      }),
    },
  }),
  ScheduleActionStartSettings: D.m({
    wire: "scheduleActionStartSettings",
    shape: {
      FixedModeScheduleActionStartSettings: D.m({
        wire: "fixedModeScheduleActionStartSettings",
        shape: { Time: D.m({ wire: "time" }) },
      }),
      FollowModeScheduleActionStartSettings: D.m({
        wire: "followModeScheduleActionStartSettings",
        shape: {
          FollowPoint: D.m({ wire: "followPoint" }),
          ReferenceActionName: D.m({ wire: "referenceActionName" }),
        },
      }),
      ImmediateModeScheduleActionStartSettings: D.m({
        wire: "immediateModeScheduleActionStartSettings",
      }),
    },
  }),
});
const o_SdiSource: D.LazyStruct = () => ({
  Arn: D.m({ wire: "arn" }),
  Id: D.m({ wire: "id" }),
  Inputs: D.m({ wire: "inputs" }),
  Mode: D.m({ wire: "mode" }),
  Name: D.m({ wire: "name" }),
  State: D.m({ wire: "state" }),
  Type: D.m({ wire: "type" }),
});
const o_SdiSourceMapping: D.LazyStruct = () => ({
  CardNumber: D.m({ wire: "cardNumber" }),
  ChannelNumber: D.m({ wire: "channelNumber" }),
  SdiSource: D.m({ wire: "sdiSource" }),
});
const o_Smpte2110ReceiverGroupSettings: D.LazyStruct = () => ({
  Smpte2110ReceiverGroups: D.m({
    wire: "smpte2110ReceiverGroups",
    shape: D.list({
      SdpSettings: D.m({
        wire: "sdpSettings",
        shape: {
          AncillarySdps: D.m({
            wire: "ancillarySdps",
            shape: D.list(o_InputSdpLocation),
          }),
          AudioSdps: D.m({
            wire: "audioSdps",
            shape: D.list(o_InputSdpLocation),
          }),
          VideoSdp: D.m({ wire: "videoSdp", shape: o_InputSdpLocation }),
        },
      }),
    }),
  }),
});
const o_SrtSettings: D.LazyStruct = () => ({
  SrtCallerSources: D.m({
    wire: "srtCallerSources",
    shape: D.list({
      Decryption: D.m({
        wire: "decryption",
        shape: {
          Algorithm: D.m({ wire: "algorithm" }),
          PassphraseSecretArn: D.m({ wire: "passphraseSecretArn" }),
        },
      }),
      MinimumLatency: D.m({ wire: "minimumLatency" }),
      SrtListenerAddress: D.m({ wire: "srtListenerAddress" }),
      SrtListenerPort: D.m({ wire: "srtListenerPort" }),
      StreamId: D.m({ wire: "streamId" }),
    }),
  }),
  SrtListenerSettings: D.m({
    wire: "srtListenerSettings",
    shape: {
      Decryption: D.m({
        wire: "decryption",
        shape: {
          Algorithm: D.m({ wire: "algorithm" }),
          PassphraseSecretArn: D.m({ wire: "passphraseSecretArn" }),
        },
      }),
      MinimumLatency: D.m({ wire: "minimumLatency" }),
      StreamId: D.m({ wire: "streamId" }),
    },
  }),
});
const o_SuccessfulMonitorDeployment: D.LazyStruct = () => ({
  DetailsUri: D.m({ wire: "detailsUri" }),
  Status: D.m({ wire: "status" }),
});
const o_VpcOutputSettingsDescription: D.LazyStruct = () => ({
  AvailabilityZones: D.m({ wire: "availabilityZones" }),
  NetworkInterfaceIds: D.m({ wire: "networkInterfaceIds" }),
  SecurityGroupIds: D.m({ wire: "securityGroupIds" }),
  SubnetIds: D.m({ wire: "subnetIds" }),
});
const i_AudioDolbyEDecode: D.LazyStruct = () => ({
  ProgramSelection: D.m({ wire: "programSelection" }),
});
const i_AudioNormalizationSettings: D.LazyStruct = () => ({
  Algorithm: D.m({ wire: "algorithm" }),
  AlgorithmControl: D.m({ wire: "algorithmControl" }),
  TargetLkfs: D.m({ wire: "targetLkfs" }),
  PeakCalculation: D.m({ wire: "peakCalculation" }),
  PeakLimiterThreshold: D.m({ wire: "peakLimiterThreshold" }),
});
const i_AudioPreMixerSettings: D.LazyStruct = () => ({
  AudioNormalizationSettings: D.m({
    wire: "audioNormalizationSettings",
    shape: i_AudioNormalizationSettings,
  }),
  Channels: D.m({ wire: "channels" }),
  GainDb: D.m({ wire: "gainDb" }),
  RemixSettings: D.m({ wire: "remixSettings", shape: i_RemixSettings }),
});
const i_BandwidthReductionFilterSettings: D.LazyStruct = () => ({
  PostFilterSharpening: D.m({ wire: "postFilterSharpening" }),
  Strength: D.m({ wire: "strength" }),
});
const i_CaptionLanguageMapping: D.LazyStruct = () => ({
  CaptionChannel: D.m({ wire: "captionChannel" }),
  LanguageCode: D.m({ wire: "languageCode" }),
  LanguageDescription: D.m({ wire: "languageDescription" }),
});
const i_ColorSpacePassthroughSettings: D.LazyStruct = () => ({});
const i_Hdr10Settings: D.LazyStruct = () => ({
  MaxCll: D.m({ wire: "maxCll" }),
  MaxFall: D.m({ wire: "maxFall" }),
});
const i_Hlg2020Settings: D.LazyStruct = () => ({});
const i_InputSdpLocation: D.LazyStruct = () => ({
  MediaIndex: D.m({ wire: "mediaIndex" }),
  SdpUrl: D.m({ wire: "sdpUrl" }),
});
const i_M2tsSettings: D.LazyStruct = () => ({
  AbsentInputAudioBehavior: D.m({ wire: "absentInputAudioBehavior" }),
  Arib: D.m({ wire: "arib" }),
  AribCaptionsPid: D.m({ wire: "aribCaptionsPid" }),
  AribCaptionsPidControl: D.m({ wire: "aribCaptionsPidControl" }),
  AudioBufferModel: D.m({ wire: "audioBufferModel" }),
  AudioFramesPerPes: D.m({ wire: "audioFramesPerPes" }),
  AudioPids: D.m({ wire: "audioPids" }),
  AudioStreamType: D.m({ wire: "audioStreamType" }),
  Bitrate: D.m({ wire: "bitrate" }),
  BufferModel: D.m({ wire: "bufferModel" }),
  CcDescriptor: D.m({ wire: "ccDescriptor" }),
  DvbNitSettings: D.m({
    wire: "dvbNitSettings",
    shape: {
      NetworkId: D.m({ wire: "networkId" }),
      NetworkName: D.m({ wire: "networkName" }),
      RepInterval: D.m({ wire: "repInterval" }),
    },
  }),
  DvbSdtSettings: D.m({
    wire: "dvbSdtSettings",
    shape: {
      OutputSdt: D.m({ wire: "outputSdt" }),
      RepInterval: D.m({ wire: "repInterval" }),
      ServiceName: D.m({ wire: "serviceName" }),
      ServiceProviderName: D.m({ wire: "serviceProviderName" }),
    },
  }),
  DvbSubPids: D.m({ wire: "dvbSubPids" }),
  DvbTdtSettings: D.m({
    wire: "dvbTdtSettings",
    shape: { RepInterval: D.m({ wire: "repInterval" }) },
  }),
  DvbTeletextPid: D.m({ wire: "dvbTeletextPid" }),
  Ebif: D.m({ wire: "ebif" }),
  EbpAudioInterval: D.m({ wire: "ebpAudioInterval" }),
  EbpLookaheadMs: D.m({ wire: "ebpLookaheadMs" }),
  EbpPlacement: D.m({ wire: "ebpPlacement" }),
  EcmPid: D.m({ wire: "ecmPid" }),
  EsRateInPes: D.m({ wire: "esRateInPes" }),
  EtvPlatformPid: D.m({ wire: "etvPlatformPid" }),
  EtvSignalPid: D.m({ wire: "etvSignalPid" }),
  FragmentTime: D.m({ wire: "fragmentTime" }),
  Klv: D.m({ wire: "klv" }),
  KlvDataPids: D.m({ wire: "klvDataPids" }),
  NielsenId3Behavior: D.m({ wire: "nielsenId3Behavior" }),
  NullPacketBitrate: D.m({ wire: "nullPacketBitrate" }),
  PatInterval: D.m({ wire: "patInterval" }),
  PcrControl: D.m({ wire: "pcrControl" }),
  PcrPeriod: D.m({ wire: "pcrPeriod" }),
  PcrPid: D.m({ wire: "pcrPid" }),
  PmtInterval: D.m({ wire: "pmtInterval" }),
  PmtPid: D.m({ wire: "pmtPid" }),
  ProgramNum: D.m({ wire: "programNum" }),
  RateMode: D.m({ wire: "rateMode" }),
  Scte27Pids: D.m({ wire: "scte27Pids" }),
  Scte35Control: D.m({ wire: "scte35Control" }),
  Scte35Pid: D.m({ wire: "scte35Pid" }),
  SegmentationMarkers: D.m({ wire: "segmentationMarkers" }),
  SegmentationStyle: D.m({ wire: "segmentationStyle" }),
  SegmentationTime: D.m({ wire: "segmentationTime" }),
  TimedMetadataBehavior: D.m({ wire: "timedMetadataBehavior" }),
  TimedMetadataPid: D.m({ wire: "timedMetadataPid" }),
  TransportStreamId: D.m({ wire: "transportStreamId" }),
  VideoPid: D.m({ wire: "videoPid" }),
  Scte35PrerollPullupMilliseconds: D.m({
    wire: "scte35PrerollPullupMilliseconds",
  }),
});
const i_OutputLocationRef: D.LazyStruct = () => ({
  DestinationRefId: D.m({ wire: "destinationRefId" }),
});
const i_Rec601Settings: D.LazyStruct = () => ({});
const i_Rec709Settings: D.LazyStruct = () => ({});
const i_RemixSettings: D.LazyStruct = () => ({
  ChannelMappings: D.m({
    wire: "channelMappings",
    shape: D.list({
      InputChannelLevels: D.m({
        wire: "inputChannelLevels",
        shape: D.list({
          Gain: D.m({ wire: "gain" }),
          InputChannel: D.m({ wire: "inputChannel" }),
        }),
      }),
      OutputChannel: D.m({ wire: "outputChannel" }),
    }),
  }),
  ChannelsIn: D.m({ wire: "channelsIn" }),
  ChannelsOut: D.m({ wire: "channelsOut" }),
});
const i_TemporalFilterSettings: D.LazyStruct = () => ({
  PostFilterSharpening: D.m({ wire: "postFilterSharpening" }),
  Strength: D.m({ wire: "strength" }),
});
const i_TimecodeBurninSettings: D.LazyStruct = () => ({
  FontSize: D.m({ wire: "fontSize" }),
  Position: D.m({ wire: "position" }),
  Prefix: D.m({ wire: "prefix" }),
});
const i_UdpContainerSettings: D.LazyStruct = () => ({
  M2tsSettings: D.m({ wire: "m2tsSettings", shape: i_M2tsSettings }),
});
const i_VideoPositionRectangle: D.LazyStruct = () => ({
  Height: D.m({ wire: "height" }),
  Width: D.m({ wire: "width" }),
  X: D.m({ wire: "x" }),
  Y: D.m({ wire: "y" }),
});
const o_AudioDolbyEDecode: D.LazyStruct = () => ({
  ProgramSelection: D.m({ wire: "programSelection" }),
});
const o_AudioNormalizationSettings: D.LazyStruct = () => ({
  Algorithm: D.m({ wire: "algorithm" }),
  AlgorithmControl: D.m({ wire: "algorithmControl" }),
  TargetLkfs: D.m({ wire: "targetLkfs" }),
  PeakCalculation: D.m({ wire: "peakCalculation" }),
  PeakLimiterThreshold: D.m({ wire: "peakLimiterThreshold" }),
});
const o_AudioPreMixerSettings: D.LazyStruct = () => ({
  AudioNormalizationSettings: D.m({
    wire: "audioNormalizationSettings",
    shape: o_AudioNormalizationSettings,
  }),
  Channels: D.m({ wire: "channels" }),
  GainDb: D.m({ wire: "gainDb" }),
  RemixSettings: D.m({ wire: "remixSettings", shape: o_RemixSettings }),
});
const o_BandwidthReductionFilterSettings: D.LazyStruct = () => ({
  PostFilterSharpening: D.m({ wire: "postFilterSharpening" }),
  Strength: D.m({ wire: "strength" }),
});
const o_CaptionLanguageMapping: D.LazyStruct = () => ({
  CaptionChannel: D.m({ wire: "captionChannel" }),
  LanguageCode: D.m({ wire: "languageCode" }),
  LanguageDescription: D.m({ wire: "languageDescription" }),
});
const o_Hdr10Settings: D.LazyStruct = () => ({
  MaxCll: D.m({ wire: "maxCll" }),
  MaxFall: D.m({ wire: "maxFall" }),
});
const o_InputClippingSettings: D.LazyStruct = () => ({
  InputTimecodeSource: D.m({ wire: "inputTimecodeSource" }),
  StartTimecode: D.m({
    wire: "startTimecode",
    shape: { Timecode: D.m({ wire: "timecode" }) },
  }),
  StopTimecode: D.m({
    wire: "stopTimecode",
    shape: {
      LastFrameClippingBehavior: D.m({ wire: "lastFrameClippingBehavior" }),
      Timecode: D.m({ wire: "timecode" }),
    },
  }),
});
const o_InputLocation: D.LazyStruct = () => ({
  PasswordParam: D.m({ wire: "passwordParam" }),
  Uri: D.m({ wire: "uri" }),
  Username: D.m({ wire: "username" }),
});
const o_InputSdpLocation: D.LazyStruct = () => ({
  MediaIndex: D.m({ wire: "mediaIndex" }),
  SdpUrl: D.m({ wire: "sdpUrl" }),
});
const o_M2tsSettings: D.LazyStruct = () => ({
  AbsentInputAudioBehavior: D.m({ wire: "absentInputAudioBehavior" }),
  Arib: D.m({ wire: "arib" }),
  AribCaptionsPid: D.m({ wire: "aribCaptionsPid" }),
  AribCaptionsPidControl: D.m({ wire: "aribCaptionsPidControl" }),
  AudioBufferModel: D.m({ wire: "audioBufferModel" }),
  AudioFramesPerPes: D.m({ wire: "audioFramesPerPes" }),
  AudioPids: D.m({ wire: "audioPids" }),
  AudioStreamType: D.m({ wire: "audioStreamType" }),
  Bitrate: D.m({ wire: "bitrate" }),
  BufferModel: D.m({ wire: "bufferModel" }),
  CcDescriptor: D.m({ wire: "ccDescriptor" }),
  DvbNitSettings: D.m({
    wire: "dvbNitSettings",
    shape: {
      NetworkId: D.m({ wire: "networkId" }),
      NetworkName: D.m({ wire: "networkName" }),
      RepInterval: D.m({ wire: "repInterval" }),
    },
  }),
  DvbSdtSettings: D.m({
    wire: "dvbSdtSettings",
    shape: {
      OutputSdt: D.m({ wire: "outputSdt" }),
      RepInterval: D.m({ wire: "repInterval" }),
      ServiceName: D.m({ wire: "serviceName" }),
      ServiceProviderName: D.m({ wire: "serviceProviderName" }),
    },
  }),
  DvbSubPids: D.m({ wire: "dvbSubPids" }),
  DvbTdtSettings: D.m({
    wire: "dvbTdtSettings",
    shape: { RepInterval: D.m({ wire: "repInterval" }) },
  }),
  DvbTeletextPid: D.m({ wire: "dvbTeletextPid" }),
  Ebif: D.m({ wire: "ebif" }),
  EbpAudioInterval: D.m({ wire: "ebpAudioInterval" }),
  EbpLookaheadMs: D.m({ wire: "ebpLookaheadMs" }),
  EbpPlacement: D.m({ wire: "ebpPlacement" }),
  EcmPid: D.m({ wire: "ecmPid" }),
  EsRateInPes: D.m({ wire: "esRateInPes" }),
  EtvPlatformPid: D.m({ wire: "etvPlatformPid" }),
  EtvSignalPid: D.m({ wire: "etvSignalPid" }),
  FragmentTime: D.m({ wire: "fragmentTime" }),
  Klv: D.m({ wire: "klv" }),
  KlvDataPids: D.m({ wire: "klvDataPids" }),
  NielsenId3Behavior: D.m({ wire: "nielsenId3Behavior" }),
  NullPacketBitrate: D.m({ wire: "nullPacketBitrate" }),
  PatInterval: D.m({ wire: "patInterval" }),
  PcrControl: D.m({ wire: "pcrControl" }),
  PcrPeriod: D.m({ wire: "pcrPeriod" }),
  PcrPid: D.m({ wire: "pcrPid" }),
  PmtInterval: D.m({ wire: "pmtInterval" }),
  PmtPid: D.m({ wire: "pmtPid" }),
  ProgramNum: D.m({ wire: "programNum" }),
  RateMode: D.m({ wire: "rateMode" }),
  Scte27Pids: D.m({ wire: "scte27Pids" }),
  Scte35Control: D.m({ wire: "scte35Control" }),
  Scte35Pid: D.m({ wire: "scte35Pid" }),
  SegmentationMarkers: D.m({ wire: "segmentationMarkers" }),
  SegmentationStyle: D.m({ wire: "segmentationStyle" }),
  SegmentationTime: D.m({ wire: "segmentationTime" }),
  TimedMetadataBehavior: D.m({ wire: "timedMetadataBehavior" }),
  TimedMetadataPid: D.m({ wire: "timedMetadataPid" }),
  TransportStreamId: D.m({ wire: "transportStreamId" }),
  VideoPid: D.m({ wire: "videoPid" }),
  Scte35PrerollPullupMilliseconds: D.m({
    wire: "scte35PrerollPullupMilliseconds",
  }),
});
const o_MediaResourceNeighbor: D.LazyStruct = () => ({
  Arn: D.m({ wire: "arn" }),
  Name: D.m({ wire: "name" }),
});
const o_OutputLocationRef: D.LazyStruct = () => ({
  DestinationRefId: D.m({ wire: "destinationRefId" }),
});
const o_RemixSettings: D.LazyStruct = () => ({
  ChannelMappings: D.m({
    wire: "channelMappings",
    shape: D.list({
      InputChannelLevels: D.m({
        wire: "inputChannelLevels",
        shape: D.list({
          Gain: D.m({ wire: "gain" }),
          InputChannel: D.m({ wire: "inputChannel" }),
        }),
      }),
      OutputChannel: D.m({ wire: "outputChannel" }),
    }),
  }),
  ChannelsIn: D.m({ wire: "channelsIn" }),
  ChannelsOut: D.m({ wire: "channelsOut" }),
});
const o_TemporalFilterSettings: D.LazyStruct = () => ({
  PostFilterSharpening: D.m({ wire: "postFilterSharpening" }),
  Strength: D.m({ wire: "strength" }),
});
const o_TimecodeBurninSettings: D.LazyStruct = () => ({
  FontSize: D.m({ wire: "fontSize" }),
  Position: D.m({ wire: "position" }),
  Prefix: D.m({ wire: "prefix" }),
});
const o_UdpContainerSettings: D.LazyStruct = () => ({
  M2tsSettings: D.m({ wire: "m2tsSettings", shape: o_M2tsSettings }),
});
const o_VideoPositionRectangle: D.LazyStruct = () => ({
  Height: D.m({ wire: "height" }),
  Width: D.m({ wire: "width" }),
  X: D.m({ wire: "x" }),
  Y: D.m({ wire: "y" }),
});
