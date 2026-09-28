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
  sdkId: "MediaConvert",
  target: "MediaConvert",
  version: "2017-08-29",
  sigv4: "mediaconvert",
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
                `https://mediaconvert-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(`https://mediaconvert.${Region}.amazonaws.com`);
              }
              return e(
                `https://mediaconvert-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://mediaconvert.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          if (Region === "cn-northwest-1") {
            return e(
              "https://subscribe.mediaconvert.cn-northwest-1.amazonaws.com.cn",
            );
          }
          return e(
            `https://mediaconvert.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class InternalServerErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerErrorException",
    ["ServerError"],
    { status: 500, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { status: 429, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
export interface AssociateCertificateRequest {
  Arn?: string;
}
export interface AssociateCertificateResponse {}
export interface CancelJobRequest {
  Id: string;
}
export interface CancelJobResponse {}
export type AccelerationMode =
  | "DISABLED"
  | "ENABLED"
  | "PREFERRED"
  | (string & {});
export interface AccelerationSettings {
  Mode?: AccelerationMode;
}
export type BillingTagsSource =
  | "QUEUE"
  | "PRESET"
  | "JOB_TEMPLATE"
  | "JOB"
  | (string & {});
export type __integerMinNegative50Max50 = number;
export interface HopDestination {
  Priority?: number;
  Queue?: string;
  WaitMinutes?: number;
}
export type __listOfHopDestination = HopDestination[];
export type __integerMinNegative1000Max1000 = number;
export type __stringMin14PatternS3BmpBMPPngPNGHttpsBmpBMPPngPNG = string;
export interface AvailBlanking {
  AvailBlankingImage?: string;
}
export type __stringMin14PatternS3CubeCUBEHttpsCubeCUBE = string;
export type ColorSpace =
  | "FOLLOW"
  | "REC_601"
  | "REC_709"
  | "HDR10"
  | "HLG_2020"
  | "P3DCI"
  | "P3D65_SDR"
  | "P3D65_HDR"
  | (string & {});
export type __integerMin0Max2147483647 = number;
export interface ColorConversion3DLUTSetting {
  FileInput?: string;
  InputColorSpace?: ColorSpace;
  InputMasteringLuminance?: number;
  OutputColorSpace?: ColorSpace;
  OutputMasteringLuminance?: number;
}
export type __listOfColorConversion3DLUTSetting = ColorConversion3DLUTSetting[];
export type __stringPatternSNManifestConfirmConditionNotificationNS = string;
export interface EsamManifestConfirmConditionNotification {
  MccXml?: string;
}
export type __integerMin0Max30000 = number;
export type __stringPatternSNSignalProcessingNotificationNS = string;
export interface EsamSignalProcessingNotification {
  SccXml?: string;
}
export interface EsamSettings {
  ManifestConfirmConditionNotification?: EsamManifestConfirmConditionNotification;
  ResponseSignalPreroll?: number;
  SignalProcessingNotification?: EsamSignalProcessingNotification;
}
export type CopyProtectionAction = "PASSTHROUGH" | "STRIP" | (string & {});
export type VchipAction = "PASSTHROUGH" | "STRIP" | (string & {});
export interface ExtendedDataServices {
  CopyProtectionAction?: CopyProtectionAction;
  VchipAction?: VchipAction;
}
export type __integerMin1Max150 = number;
export type AdvancedInputFilter = "ENABLED" | "DISABLED" | (string & {});
export type AdvancedInputFilterAddTexture =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export type AdvancedInputFilterSharpen = "OFF" | "LOW" | "HIGH" | (string & {});
export interface AdvancedInputFilterSettings {
  AddTexture?: AdvancedInputFilterAddTexture;
  Sharpening?: AdvancedInputFilterSharpen;
}
export type __stringMin1 = string;
export type __listOf__stringMin1 = string[];
export interface AudioSelectorGroup {
  AudioSelectorNames?: string[];
}
export type __mapOfAudioSelectorGroup = {
  [key: string]: AudioSelectorGroup | undefined;
};
export type AudioDurationCorrection =
  | "DISABLED"
  | "AUTO"
  | "TRACK"
  | "FRAME"
  | "FORCE"
  | (string & {});
export type __stringMin3Max3PatternAZaZ3 = string;
export type AudioDefaultSelection = "DEFAULT" | "NOT_DEFAULT" | (string & {});
export type __stringPatternS3Https = string;
export type LanguageCode =
  | "ENG"
  | "SPA"
  | "FRA"
  | "DEU"
  | "GER"
  | "ZHO"
  | "ARA"
  | "HIN"
  | "JPN"
  | "RUS"
  | "POR"
  | "ITA"
  | "URD"
  | "VIE"
  | "KOR"
  | "PAN"
  | "ABK"
  | "AAR"
  | "AFR"
  | "AKA"
  | "SQI"
  | "AMH"
  | "ARG"
  | "HYE"
  | "ASM"
  | "AVA"
  | "AVE"
  | "AYM"
  | "AZE"
  | "BAM"
  | "BAK"
  | "EUS"
  | "BEL"
  | "BEN"
  | "BIH"
  | "BIS"
  | "BOS"
  | "BRE"
  | "BUL"
  | "MYA"
  | "CAT"
  | "KHM"
  | "CHA"
  | "CHE"
  | "NYA"
  | "CHU"
  | "CHV"
  | "COR"
  | "COS"
  | "CRE"
  | "HRV"
  | "CES"
  | "DAN"
  | "DIV"
  | "NLD"
  | "DZO"
  | "ENM"
  | "EPO"
  | "EST"
  | "EWE"
  | "FAO"
  | "FIJ"
  | "FIN"
  | "FRM"
  | "FUL"
  | "GLA"
  | "GLG"
  | "LUG"
  | "KAT"
  | "ELL"
  | "GRN"
  | "GUJ"
  | "HAT"
  | "HAU"
  | "HEB"
  | "HER"
  | "HMO"
  | "HUN"
  | "ISL"
  | "IDO"
  | "IBO"
  | "IND"
  | "INA"
  | "ILE"
  | "IKU"
  | "IPK"
  | "GLE"
  | "JAV"
  | "KAL"
  | "KAN"
  | "KAU"
  | "KAS"
  | "KAZ"
  | "KIK"
  | "KIN"
  | "KIR"
  | "KOM"
  | "KON"
  | "KUA"
  | "KUR"
  | "LAO"
  | "LAT"
  | "LAV"
  | "LIM"
  | "LIN"
  | "LIT"
  | "LUB"
  | "LTZ"
  | "MKD"
  | "MLG"
  | "MSA"
  | "MAL"
  | "MLT"
  | "GLV"
  | "MRI"
  | "MAR"
  | "MAH"
  | "MON"
  | "NAU"
  | "NAV"
  | "NDE"
  | "NBL"
  | "NDO"
  | "NEP"
  | "SME"
  | "NOR"
  | "NOB"
  | "NNO"
  | "OCI"
  | "OJI"
  | "ORI"
  | "ORM"
  | "OSS"
  | "PLI"
  | "FAS"
  | "POL"
  | "PUS"
  | "QUE"
  | "QAA"
  | "RON"
  | "ROH"
  | "RUN"
  | "SMO"
  | "SAG"
  | "SAN"
  | "SRD"
  | "SRB"
  | "SNA"
  | "III"
  | "SND"
  | "SIN"
  | "SLK"
  | "SLV"
  | "SOM"
  | "SOT"
  | "SUN"
  | "SWA"
  | "SSW"
  | "SWE"
  | "TGL"
  | "TAH"
  | "TGK"
  | "TAM"
  | "TAT"
  | "TEL"
  | "THA"
  | "BOD"
  | "TIR"
  | "TON"
  | "TSO"
  | "TSN"
  | "TUR"
  | "TUK"
  | "TWI"
  | "UIG"
  | "UKR"
  | "UZB"
  | "VEN"
  | "VOL"
  | "WLN"
  | "CYM"
  | "FRY"
  | "WOL"
  | "XHO"
  | "YID"
  | "YOR"
  | "ZHA"
  | "ZUL"
  | "ORJ"
  | "QPC"
  | "TNG"
  | "SRP"
  | (string & {});
export interface HlsRenditionGroupSettings {
  RenditionGroupId?: string;
  RenditionLanguageCode?: LanguageCode;
  RenditionName?: string;
}
export type __integerMinNegative2147483648Max2147483647 = number;
export type __integerMin1Max2147483647 = number;
export type __listOf__integerMin1Max2147483647 = number[];
export type __integerMin0Max8 = number;
export type __integerMin1Max64 = number;
export type __integerMinNegative60Max6 = number;
export type __listOf__integerMinNegative60Max6 = number[];
export type __doubleMinNegative60Max6 = number;
export type __listOf__doubleMinNegative60Max6 = number[];
export interface OutputChannelMapping {
  InputChannels?: number[];
  InputChannelsFineTune?: number[];
}
export type __listOfOutputChannelMapping = OutputChannelMapping[];
export interface ChannelMapping {
  OutputChannels?: OutputChannelMapping[];
}
export interface RemixSettings {
  AudioDescriptionAudioChannel?: number;
  AudioDescriptionDataChannel?: number;
  ChannelMapping?: ChannelMapping;
  ChannelsIn?: number;
  ChannelsOut?: number;
}
export type AudioSelectorType =
  | "PID"
  | "TRACK"
  | "LANGUAGE_CODE"
  | "HLS_RENDITION_GROUP"
  | "ALL_PCM"
  | "STREAM"
  | (string & {});
export interface AudioSelector {
  AudioDurationCorrection?: AudioDurationCorrection;
  CustomLanguageCode?: string;
  DefaultSelection?: AudioDefaultSelection;
  ExternalAudioFileInput?: string;
  HlsRenditionGroupSettings?: HlsRenditionGroupSettings;
  LanguageCode?: LanguageCode;
  Offset?: number;
  Pids?: number[];
  ProgramSelection?: number;
  RemixSettings?: RemixSettings;
  SelectorType?: AudioSelectorType;
  Streams?: number[];
  Tracks?: number[];
}
export type __mapOfAudioSelector = { [key: string]: AudioSelector | undefined };
export type AncillaryConvert608To708 = "UPCONVERT" | "DISABLED" | (string & {});
export type __integerMin1Max4 = number;
export type AncillaryTerminateCaptions =
  | "END_OF_INPUT"
  | "DISABLED"
  | (string & {});
export interface AncillarySourceSettings {
  Convert608To708?: AncillaryConvert608To708;
  SourceAncillaryChannelNumber?: number;
  TerminateCaptions?: AncillaryTerminateCaptions;
}
export interface DvbSubSourceSettings {
  Pid?: number;
}
export type EmbeddedConvert608To708 = "UPCONVERT" | "DISABLED" | (string & {});
export type __integerMin1Max1 = number;
export type EmbeddedTerminateCaptions =
  | "END_OF_INPUT"
  | "DISABLED"
  | (string & {});
export interface EmbeddedSourceSettings {
  Convert608To708?: EmbeddedConvert608To708;
  Source608ChannelNumber?: number;
  Source608TrackNumber?: number;
  TerminateCaptions?: EmbeddedTerminateCaptions;
}
export type CaptionSourceByteRateLimit = "ENABLED" | "DISABLED" | (string & {});
export type FileSourceConvert608To708 =
  | "UPCONVERT"
  | "DISABLED"
  | (string & {});
export type CaptionSourceConvertPaintOnToPopOn =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export type __integerMin1Max1001 = number;
export type __integerMin1Max60000 = number;
export interface CaptionSourceFramerate {
  FramerateDenominator?: number;
  FramerateNumerator?: number;
}
export type __stringMin14PatternS3SccSCCTtmlTTMLDfxpDFXPStlSTLSrtSRTXmlXMLSmiSMIVttVTTWebvttWEBVTTHttpsSccSCCTtmlTTMLDfxpDFXPStlSTLSrtSRTXmlXMLSmiSMIVttVTTWebvttWEBVTT =
  string;
export type FileSourceTimeDeltaUnits =
  | "SECONDS"
  | "MILLISECONDS"
  | (string & {});
export type CaptionSourceUpconvertSTLToTeletext =
  | "UPCONVERT"
  | "DISABLED"
  | (string & {});
export interface FileSourceSettings {
  ByteRateLimit?: CaptionSourceByteRateLimit;
  Convert608To708?: FileSourceConvert608To708;
  ConvertPaintToPop?: CaptionSourceConvertPaintOnToPopOn;
  Framerate?: CaptionSourceFramerate;
  SourceFile?: string;
  TimeDelta?: number;
  TimeDeltaUnits?: FileSourceTimeDeltaUnits;
  UpconvertSTLToTeletext?: CaptionSourceUpconvertSTLToTeletext;
}
export type CaptionSourceType =
  | "ANCILLARY"
  | "DVB_SUB"
  | "EMBEDDED"
  | "SCTE20"
  | "SCC"
  | "TTML"
  | "STL"
  | "SRT"
  | "SMI"
  | "SMPTE_TT"
  | "TELETEXT"
  | "NULL_SOURCE"
  | "IMSC"
  | "WEBVTT"
  | "TT_3GPP"
  | (string & {});
export type __stringMin3Max3Pattern1809aFAF09aEAE = string;
export interface TeletextSourceSettings {
  PageNumber?: string;
}
export interface TrackSourceSettings {
  StreamNumber?: number;
  TrackNumber?: number;
}
export interface WebvttHlsSourceSettings {
  RenditionGroupId?: string;
  RenditionLanguageCode?: LanguageCode;
  RenditionName?: string;
}
export interface CaptionSourceSettings {
  AncillarySourceSettings?: AncillarySourceSettings;
  DvbSubSourceSettings?: DvbSubSourceSettings;
  EmbeddedSourceSettings?: EmbeddedSourceSettings;
  FileSourceSettings?: FileSourceSettings;
  SourceType?: CaptionSourceType;
  TeletextSourceSettings?: TeletextSourceSettings;
  TrackSourceSettings?: TrackSourceSettings;
  WebvttHlsSourceSettings?: WebvttHlsSourceSettings;
}
export interface CaptionSelector {
  CustomLanguageCode?: string;
  LanguageCode?: LanguageCode;
  SourceSettings?: CaptionSourceSettings;
}
export type __mapOfCaptionSelector = {
  [key: string]: CaptionSelector | undefined;
};
export type __integerMin2Max2147483647 = number;
export interface Rectangle {
  Height?: number;
  Width?: number;
  X?: number;
  Y?: number;
}
export type InputDeblockFilter = "ENABLED" | "DISABLED" | (string & {});
export type DecryptionMode = "AES_CTR" | "AES_CBC" | "AES_GCM" | (string & {});
export type __stringMin24Max512PatternAZaZ0902 = string;
export type __stringMin16Max24PatternAZaZ0922AZaZ0916 = string;
export type __stringMin9Max19PatternAZ26EastWestCentralNorthSouthEastWest1912 =
  string;
export interface InputDecryptionSettings {
  DecryptionMode?: DecryptionMode;
  EncryptedDecryptionKey?: string;
  InitializationVector?: string;
  KmsKeyRegion?: string;
}
export type InputDenoiseFilter = "ENABLED" | "DISABLED" | (string & {});
export type __stringMin14PatternS3XmlXMLHttpsXmlXML = string;
export type DynamicAudioSelectorType =
  | "ALL_TRACKS"
  | "LANGUAGE_CODE"
  | (string & {});
export interface DynamicAudioSelector {
  AudioDurationCorrection?: AudioDurationCorrection;
  ExternalAudioFileInput?: string;
  LanguageCode?: LanguageCode;
  Offset?: number;
  SelectorType?: DynamicAudioSelectorType;
}
export type __mapOfDynamicAudioSelector = {
  [key: string]: DynamicAudioSelector | undefined;
};
export type __stringMax2048PatternS3Https = string;
export type InputFilterEnable = "AUTO" | "DISABLE" | "FORCE" | (string & {});
export type __integerMin0Max5 = number;
export type __stringMin14PatternS3BmpBMPPngPNGTgaTGAHttpsBmpBMPPngPNGTgaTGA =
  string;
export type __integerMin0Max99 = number;
export type __integerMin0Max100 = number;
export type __stringPattern01D20305D205D = string;
export interface InsertableImage {
  Duration?: number;
  FadeIn?: number;
  FadeOut?: number;
  Height?: number;
  ImageInserterInput?: string;
  ImageX?: number;
  ImageY?: number;
  Layer?: number;
  Opacity?: number;
  StartTime?: string;
  Width?: number;
}
export type __listOfInsertableImage = InsertableImage[];
export type __integerMin100Max1000 = number;
export interface ImageInserter {
  InsertableImages?: InsertableImage[];
  SdrReferenceWhiteLevel?: number;
}
export type __stringPattern010920405090509092090909 = string;
export interface InputClipping {
  EndTimecode?: string;
  StartTimecode?: string;
}
export type __listOfInputClipping = InputClipping[];
export type InputScanType = "AUTO" | "PSF" | (string & {});
export interface MultiViewInput {
  FileInput?: string;
}
export interface MultiViewSettings {
  Input?: MultiViewInput;
}
export type __listOfMultiViewSettings = MultiViewSettings[];
export type InputPsiControl = "IGNORE_PSI" | "USE_PSI" | (string & {});
export type __stringPatternS3ASSETMAPXml = string;
export type __listOf__stringPatternS3ASSETMAPXml = string[];
export type __stringPatternArnAwsAZ09EventsAZ090912ConnectionAZAZ09AF0936 =
  string;
export type TamsGapHandling =
  | "SKIP_GAPS"
  | "FILL_WITH_BLACK"
  | "HOLD_LAST_FRAME"
  | (string & {});
export type __stringPattern019090190908019090190908 = string;
export interface InputTamsSettings {
  AuthConnectionArn?: string;
  GapHandling?: TamsGapHandling;
  SourceId?: string;
  Timerange?: string;
}
export type InputTimecodeSource =
  | "EMBEDDED"
  | "ZEROBASED"
  | "SPECIFIEDSTART"
  | (string & {});
export type __stringMin11Max11Pattern01D20305D205D = string;
export type __integerMin1Max32 = number;
export type __integerMin1Max86400000 = number;
export type __integerMin32Max8192 = number;
export type __integerMin32000Max48000 = number;
export interface InputVideoGenerator {
  Channels?: number;
  Duration?: number;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  Height?: number;
  ImageInput?: string;
  SampleRate?: number;
  Width?: number;
}
export type VideoOverlayUnit = "PIXELS" | "PERCENTAGE" | (string & {});
export interface VideoOverlayCrop {
  Height?: number;
  Unit?: VideoOverlayUnit;
  Width?: number;
  X?: number;
  Y?: number;
}
export type __stringPattern010920405090509092 = string;
export type __integerMinNegative1Max2147483647 = number;
export interface VideoOverlayPosition {
  Height?: number;
  Opacity?: number;
  Unit?: VideoOverlayUnit;
  Width?: number;
  XPosition?: number;
  YPosition?: number;
}
export interface VideoOverlayInputClipping {
  EndTimecode?: string;
  StartTimecode?: string;
}
export type __listOfVideoOverlayInputClipping = VideoOverlayInputClipping[];
export interface VideoOverlayInput {
  AudioSelectors?: { [key: string]: AudioSelector | undefined };
  FileInput?: string;
  InputClippings?: VideoOverlayInputClipping[];
  TimecodeSource?: InputTimecodeSource;
  TimecodeStart?: string;
}
export type VideoOverlayPlayBackMode = "ONCE" | "REPEAT" | (string & {});
export interface VideoOverlayTransition {
  EndPosition?: VideoOverlayPosition;
  EndTimecode?: string;
  StartTimecode?: string;
}
export type __listOfVideoOverlayTransition = VideoOverlayTransition[];
export interface VideoOverlay {
  Crop?: VideoOverlayCrop;
  EndTimecode?: string;
  InitialPosition?: VideoOverlayPosition;
  Input?: VideoOverlayInput;
  Playback?: VideoOverlayPlayBackMode;
  StartTimecode?: string;
  Transitions?: VideoOverlayTransition[];
}
export type __listOfVideoOverlay = VideoOverlay[];
export type AlphaBehavior = "DISCARD" | "REMAP_TO_LUMA" | (string & {});
export type ColorSpaceUsage = "FORCE" | "FALLBACK" | (string & {});
export type EmbeddedTimecodeOverride = "NONE" | "USE_MDPM" | (string & {});
export type __integerMin0Max50000 = number;
export type __integerMin0Max65535 = number;
export interface Hdr10Metadata {
  BluePrimaryX?: number;
  BluePrimaryY?: number;
  GreenPrimaryX?: number;
  GreenPrimaryY?: number;
  MaxContentLightLevel?: number;
  MaxFrameAverageLightLevel?: number;
  MaxLuminance?: number;
  MinLuminance?: number;
  RedPrimaryX?: number;
  RedPrimaryY?: number;
  WhitePointX?: number;
  WhitePointY?: number;
}
export type PadVideo = "DISABLED" | "BLACK" | (string & {});
export type InputRotate =
  | "DEGREE_0"
  | "DEGREES_90"
  | "DEGREES_180"
  | "DEGREES_270"
  | "AUTO"
  | (string & {});
export type InputSampleRange =
  | "FOLLOW"
  | "FULL_RANGE"
  | "LIMITED_RANGE"
  | (string & {});
export type VideoSelectorType = "AUTO" | "STREAM" | (string & {});
export interface VideoSelector {
  AlphaBehavior?: AlphaBehavior;
  ColorSpace?: ColorSpace;
  ColorSpaceUsage?: ColorSpaceUsage;
  EmbeddedTimecodeOverride?: EmbeddedTimecodeOverride;
  Hdr10Metadata?: Hdr10Metadata;
  MaxLuminance?: number;
  PadVideo?: PadVideo;
  Pid?: number;
  ProgramNumber?: number;
  Rotate?: InputRotate;
  SampleRange?: InputSampleRange;
  SelectorType?: VideoSelectorType;
  Streams?: number[];
}
export interface Input {
  AdvancedInputFilter?: AdvancedInputFilter;
  AdvancedInputFilterSettings?: AdvancedInputFilterSettings;
  AudioSelectorGroups?: { [key: string]: AudioSelectorGroup | undefined };
  AudioSelectors?: { [key: string]: AudioSelector | undefined };
  CaptionSelectors?: { [key: string]: CaptionSelector | undefined };
  Crop?: Rectangle;
  DeblockFilter?: InputDeblockFilter;
  DecryptionSettings?: InputDecryptionSettings;
  DenoiseFilter?: InputDenoiseFilter;
  DolbyVisionMetadataXml?: string;
  DynamicAudioSelectors?: { [key: string]: DynamicAudioSelector | undefined };
  FileInput?: string;
  FilterEnable?: InputFilterEnable;
  FilterStrength?: number;
  ImageInserter?: ImageInserter;
  InputClippings?: InputClipping[];
  InputScanType?: InputScanType;
  MultiViewSettings?: MultiViewSettings[];
  Position?: Rectangle;
  ProgramNumber?: number;
  PsiControl?: InputPsiControl;
  SupplementalImps?: string[];
  TamsSettings?: InputTamsSettings;
  TimecodeSource?: InputTimecodeSource;
  TimecodeStart?: string;
  VideoGenerator?: InputVideoGenerator;
  VideoOverlays?: VideoOverlay[];
  VideoSelector?: VideoSelector;
}
export type __listOfInput = Input[];
export type __stringMin1Max20 = string;
export type __stringMin1Max50PatternAZAZ09 = string;
export type __stringMin1Max2048PatternArnAZSecretsmanagerWD12SecretAZAZ09 =
  string;
export type __doubleMin0 = number;
export type __stringPatternHttpsKantarmedia55Prod = string;
export type __stringPatternS3 = string;
export type __stringMin1Max50 = string;
export interface KantarWatermarkSettings {
  ChannelName?: string;
  ContentReference?: string;
  CredentialsSecretName?: string;
  FileOffset?: number;
  KantarLicenseId?: number;
  KantarServerUrl?: string;
  LogDestination?: string;
  Metadata3?: string;
  Metadata4?: string;
  Metadata5?: string;
  Metadata6?: string;
  Metadata7?: string;
  Metadata8?: string;
}
export type __integerMin1Max17895697 = number;
export type __integerMin1Max2147483640 = number;
export interface MotionImageInsertionFramerate {
  FramerateDenominator?: number;
  FramerateNumerator?: number;
}
export type __stringMin14PatternS3Mov09PngHttpsMov09Png = string;
export type MotionImageInsertionMode = "MOV" | "PNG" | (string & {});
export interface MotionImageInsertionOffset {
  ImageX?: number;
  ImageY?: number;
}
export type MotionImagePlayback = "ONCE" | "REPEAT" | (string & {});
export interface MotionImageInserter {
  Framerate?: MotionImageInsertionFramerate;
  Input?: string;
  InsertionMode?: MotionImageInsertionMode;
  Offset?: MotionImageInsertionOffset;
  Playback?: MotionImagePlayback;
  StartTime?: string;
}
export type __integerMin0Max0 = number;
export interface NielsenConfiguration {
  BreakoutCode?: number;
  DistributorId?: string;
}
export type NielsenActiveWatermarkProcessType =
  | "NAES2_AND_NW"
  | "CBET"
  | "NAES2_AND_NW_AND_CBET"
  | (string & {});
export type __stringPattern0xAFaF0908190908 = string;
export type __integerMin0Max65534 = number;
export type NielsenSourceWatermarkStatusType =
  | "CLEAN"
  | "WATERMARKED"
  | (string & {});
export type __stringPatternHttps = string;
export type NielsenUniqueTicPerAudioTrackType =
  | "RESERVE_UNIQUE_TICS_PER_TRACK"
  | "SAME_TICS_PER_TRACK"
  | (string & {});
export interface NielsenNonLinearWatermarkSettings {
  ActiveWatermarkProcess?: NielsenActiveWatermarkProcessType;
  AdiFilename?: string;
  AssetId?: string;
  AssetName?: string;
  CbetSourceId?: string;
  EpisodeId?: string;
  MetadataDestination?: string;
  SourceId?: number;
  SourceWatermarkStatus?: NielsenSourceWatermarkStatusType;
  TicServerUrl?: string;
  UniqueTicPerAudioTrack?: NielsenUniqueTicPerAudioTrackType;
}
export type __integerMin100000Max100000000 = number;
export type __doubleMin1Max10 = number;
export type __integerMin3Max15 = number;
export type RequiredFlag = "ENABLED" | "DISABLED" | (string & {});
export interface AllowedRenditionSize {
  Height?: number;
  Required?: RequiredFlag;
  Width?: number;
}
export type __listOfAllowedRenditionSize = AllowedRenditionSize[];
export interface ForceIncludeRenditionSize {
  Height?: number;
  Width?: number;
}
export type __listOfForceIncludeRenditionSize = ForceIncludeRenditionSize[];
export interface MinBottomRenditionSize {
  Height?: number;
  Width?: number;
}
export interface MinTopRenditionSize {
  Height?: number;
  Width?: number;
}
export type RuleType =
  | "MIN_TOP_RENDITION_SIZE"
  | "MIN_BOTTOM_RENDITION_SIZE"
  | "FORCE_INCLUDE_RENDITIONS"
  | "ALLOWED_RENDITIONS"
  | (string & {});
export interface AutomatedAbrRule {
  AllowedRenditions?: AllowedRenditionSize[];
  ForceIncludeRenditions?: ForceIncludeRenditionSize[];
  MinBottomRenditionSize?: MinBottomRenditionSize;
  MinTopRenditionSize?: MinTopRenditionSize;
  Type?: RuleType;
}
export type __listOfAutomatedAbrRule = AutomatedAbrRule[];
export interface AutomatedAbrSettings {
  MaxAbrBitrate?: number;
  MaxQualityLevel?: number;
  MaxRenditions?: number;
  MinAbrBitrate?: number;
  Rules?: AutomatedAbrRule[];
}
export interface AutomatedEncodingSettings {
  AbrSettings?: AutomatedAbrSettings;
}
export type __stringMax2048 = string;
export interface CmafAdditionalManifest {
  ManifestNameModifier?: string;
  SelectedOutputs?: string[];
}
export type __listOfCmafAdditionalManifest = CmafAdditionalManifest[];
export type CmafClientCache = "DISABLED" | "ENABLED" | (string & {});
export type CmafCodecSpecification = "RFC_6381" | "RFC_4281" | (string & {});
export type __stringMin1Max256 = string;
export type DashManifestStyle =
  | "BASIC"
  | "COMPACT"
  | "DISTINCT"
  | "FULL"
  | (string & {});
export type S3ObjectCannedAcl =
  | "PUBLIC_READ"
  | "AUTHENTICATED_READ"
  | "BUCKET_OWNER_READ"
  | "BUCKET_OWNER_FULL_CONTROL"
  | (string & {});
export interface S3DestinationAccessControl {
  CannedAcl?: S3ObjectCannedAcl;
}
export type S3ServerSideEncryptionType =
  | "SERVER_SIDE_ENCRYPTION_S3"
  | "SERVER_SIDE_ENCRYPTION_KMS"
  | (string & {});
export type __stringPatternAZaZ0902 = string;
export type __stringPatternArnAwsUsGovCnKmsAZ26EastWestCentralNorthSouthEastWest1912D12KeyAFAF098AFAF094AFAF094AFAF094AFAF0912MrkAFAF0932 =
  string;
export interface S3EncryptionSettings {
  EncryptionType?: S3ServerSideEncryptionType;
  KmsEncryptionContext?: string;
  KmsKeyArn?: string;
}
export type S3StorageClass =
  | "STANDARD"
  | "REDUCED_REDUNDANCY"
  | "STANDARD_IA"
  | "ONEZONE_IA"
  | "INTELLIGENT_TIERING"
  | "GLACIER"
  | "DEEP_ARCHIVE"
  | "GLACIER_IR"
  | (string & {});
export interface S3DestinationSettings {
  AccessControl?: S3DestinationAccessControl;
  Encryption?: S3EncryptionSettings;
  StorageClass?: S3StorageClass;
}
export interface DestinationSettings {
  S3Settings?: S3DestinationSettings;
}
export type __integerMin1Max9999 = number;
export type __stringMin32Max32Pattern09aFAF32 = string;
export type CmafEncryptionType = "SAMPLE_AES" | "AES_CTR" | (string & {});
export type CmafInitializationVectorInManifest =
  | "INCLUDE"
  | "EXCLUDE"
  | (string & {});
export type __stringPatternArnAwsUsGovAcm = string;
export type __stringMin36Max36Pattern09aFAF809aFAF409aFAF409aFAF409aFAF12 =
  string;
export type __listOf__stringMin36Max36Pattern09aFAF809aFAF409aFAF409aFAF409aFAF12 =
  string[];
export type PresetSpeke20Audio =
  | "PRESET_AUDIO_1"
  | "PRESET_AUDIO_2"
  | "PRESET_AUDIO_3"
  | "SHARED"
  | "UNENCRYPTED"
  | (string & {});
export type PresetSpeke20Video =
  | "PRESET_VIDEO_1"
  | "PRESET_VIDEO_2"
  | "PRESET_VIDEO_3"
  | "PRESET_VIDEO_4"
  | "PRESET_VIDEO_5"
  | "PRESET_VIDEO_6"
  | "PRESET_VIDEO_7"
  | "PRESET_VIDEO_8"
  | "SHARED"
  | "UNENCRYPTED"
  | (string & {});
export interface EncryptionContractConfiguration {
  SpekeAudioPreset?: PresetSpeke20Audio;
  SpekeVideoPreset?: PresetSpeke20Video;
}
export type __stringPatternW = string;
export type __stringPatternHttpsD = string;
export interface SpekeKeyProviderCmaf {
  CertificateArn?: string;
  DashSignaledSystemIds?: string[];
  EncryptionContractConfiguration?: EncryptionContractConfiguration;
  HlsSignaledSystemIds?: string[];
  ResourceId?: string;
  Url?: string;
}
export type __stringPatternIdentityAZaZ26AZaZ09163 = string;
export type __stringPatternDD = string;
export type __stringPatternAZaZ0932 = string;
export interface StaticKeyProvider {
  KeyFormat?: string;
  KeyFormatVersions?: string;
  StaticKeyValue?: string | redacted.Redacted<string>;
  Url?: string;
}
export type CmafKeyProviderType = "SPEKE" | "STATIC_KEY" | (string & {});
export interface CmafEncryptionSettings {
  ClearLeadSegments?: number;
  ConstantInitializationVector?: string;
  EncryptionMethod?: CmafEncryptionType;
  InitializationVectorInManifest?: CmafInitializationVectorInManifest;
  SpekeKeyProvider?: SpekeKeyProviderCmaf;
  StaticKeyProvider?: StaticKeyProvider;
  Type?: CmafKeyProviderType;
}
export type CmafImageBasedTrickPlay =
  | "NONE"
  | "THUMBNAIL"
  | "THUMBNAIL_AND_FULLFRAME"
  | "ADVANCED"
  | "VARIANTS"
  | (string & {});
export type CmafIntervalCadence =
  | "FOLLOW_IFRAME"
  | "FOLLOW_CUSTOM"
  | "FOLLOW_SEGMENTATION"
  | (string & {});
export type __integerMin2Max4096 = number;
export type __doubleMin0Max2147483647 = number;
export type __integerMin8Max4096 = number;
export type __integerMin1Max2048 = number;
export type __integerMin1Max512 = number;
export interface CmafImageBasedTrickPlaySettings {
  IntervalCadence?: CmafIntervalCadence;
  ThumbnailHeight?: number;
  ThumbnailInterval?: number;
  ThumbnailWidth?: number;
  TileHeight?: number;
  TileWidth?: number;
}
export interface CmafImageBasedTrickPlayVariant {
  IntervalCadence?: CmafIntervalCadence;
  ThumbnailHeight?: number;
  ThumbnailInterval?: number;
  ThumbnailWidth?: number;
  TileHeight?: number;
  TileWidth?: number;
}
export type __listOfCmafImageBasedTrickPlayVariant =
  CmafImageBasedTrickPlayVariant[];
export type CmafManifestCompression = "GZIP" | "NONE" | (string & {});
export type CmafManifestDurationFormat =
  | "FLOATING_POINT"
  | "INTEGER"
  | (string & {});
export type CmafMpdManifestBandwidthType = "AVERAGE" | "MAX" | (string & {});
export type CmafMpdProfile =
  | "MAIN_PROFILE"
  | "ON_DEMAND_PROFILE"
  | (string & {});
export type CmafPtsOffsetHandlingForBFrames =
  | "ZERO_BASED"
  | "MATCH_INITIAL_PTS"
  | (string & {});
export type CmafSegmentControl =
  | "SINGLE_FILE"
  | "SEGMENTED_FILES"
  | (string & {});
export type CmafSegmentLengthControl =
  | "EXACT"
  | "GOP_MULTIPLE"
  | "MATCH"
  | (string & {});
export type CmafStreamInfResolution = "INCLUDE" | "EXCLUDE" | (string & {});
export type CmafTargetDurationCompatibilityMode =
  | "LEGACY"
  | "SPEC_COMPLIANT"
  | (string & {});
export type CmafVideoCompositionOffsets = "SIGNED" | "UNSIGNED" | (string & {});
export type CmafWriteDASHManifest = "DISABLED" | "ENABLED" | (string & {});
export type CmafWriteHLSManifest = "DISABLED" | "ENABLED" | (string & {});
export type CmafWriteSegmentTimelineInRepresentation =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export interface CmafGroupSettings {
  AdditionalManifests?: CmafAdditionalManifest[];
  BaseUrl?: string;
  ClientCache?: CmafClientCache;
  CodecSpecification?: CmafCodecSpecification;
  DashIFrameTrickPlayNameModifier?: string;
  DashManifestStyle?: DashManifestStyle;
  Destination?: string;
  DestinationSettings?: DestinationSettings;
  Encryption?: CmafEncryptionSettings;
  FragmentLength?: number;
  ImageBasedTrickPlay?: CmafImageBasedTrickPlay;
  ImageBasedTrickPlaySettings?: CmafImageBasedTrickPlaySettings;
  ImageBasedTrickPlayVariants?: CmafImageBasedTrickPlayVariant[];
  ManifestCompression?: CmafManifestCompression;
  ManifestDurationFormat?: CmafManifestDurationFormat;
  MinBufferTime?: number;
  MinFinalSegmentLength?: number;
  MpdManifestBandwidthType?: CmafMpdManifestBandwidthType;
  MpdProfile?: CmafMpdProfile;
  PtsOffsetHandlingForBFrames?: CmafPtsOffsetHandlingForBFrames;
  SegmentControl?: CmafSegmentControl;
  SegmentLength?: number;
  SegmentLengthControl?: CmafSegmentLengthControl;
  StreamInfResolution?: CmafStreamInfResolution;
  TargetDurationCompatibilityMode?: CmafTargetDurationCompatibilityMode;
  VideoCompositionOffsets?: CmafVideoCompositionOffsets;
  WriteDashManifest?: CmafWriteDASHManifest;
  WriteHlsManifest?: CmafWriteHLSManifest;
  WriteSegmentTimelineInRepresentation?: CmafWriteSegmentTimelineInRepresentation;
}
export interface DashAdditionalManifest {
  ManifestNameModifier?: string;
  SelectedOutputs?: string[];
}
export type __listOfDashAdditionalManifest = DashAdditionalManifest[];
export type DashIsoGroupAudioChannelConfigSchemeIdUri =
  | "MPEG_CHANNEL_CONFIGURATION"
  | "DOLBY_CHANNEL_CONFIGURATION"
  | (string & {});
export type DashIsoPlaybackDeviceCompatibility =
  | "CENC_V1"
  | "UNENCRYPTED_SEI"
  | (string & {});
export type __stringPattern09aFAF809aFAF409aFAF409aFAF409aFAF12 = string;
export type __listOf__stringPattern09aFAF809aFAF409aFAF409aFAF409aFAF12 =
  string[];
export interface SpekeKeyProvider {
  CertificateArn?: string;
  EncryptionContractConfiguration?: EncryptionContractConfiguration;
  ResourceId?: string;
  SystemIds?: string[];
  Url?: string;
}
export interface DashIsoEncryptionSettings {
  PlaybackDeviceCompatibility?: DashIsoPlaybackDeviceCompatibility;
  SpekeKeyProvider?: SpekeKeyProvider;
}
export type DashIsoHbbtvCompliance = "HBBTV_1_5" | "NONE" | (string & {});
export type DashIsoImageBasedTrickPlay =
  | "NONE"
  | "THUMBNAIL"
  | "THUMBNAIL_AND_FULLFRAME"
  | "ADVANCED"
  | "VARIANTS"
  | (string & {});
export type DashIsoIntervalCadence =
  | "FOLLOW_IFRAME"
  | "FOLLOW_CUSTOM"
  | "FOLLOW_SEGMENTATION"
  | (string & {});
export type __integerMin1Max4096 = number;
export interface DashIsoImageBasedTrickPlaySettings {
  IntervalCadence?: DashIsoIntervalCadence;
  ThumbnailHeight?: number;
  ThumbnailInterval?: number;
  ThumbnailWidth?: number;
  TileHeight?: number;
  TileWidth?: number;
}
export interface DashIsoImageBasedTrickPlayVariant {
  IntervalCadence?: DashIsoIntervalCadence;
  ThumbnailHeight?: number;
  ThumbnailInterval?: number;
  ThumbnailWidth?: number;
  TileHeight?: number;
  TileWidth?: number;
}
export type __listOfDashIsoImageBasedTrickPlayVariant =
  DashIsoImageBasedTrickPlayVariant[];
export type DashIsoMpdManifestBandwidthType = "AVERAGE" | "MAX" | (string & {});
export type DashIsoMpdProfile =
  | "MAIN_PROFILE"
  | "ON_DEMAND_PROFILE"
  | (string & {});
export type DashIsoPtsOffsetHandlingForBFrames =
  | "ZERO_BASED"
  | "MATCH_INITIAL_PTS"
  | (string & {});
export type DashIsoSegmentControl =
  | "SINGLE_FILE"
  | "SEGMENTED_FILES"
  | (string & {});
export type DashIsoSegmentLengthControl =
  | "EXACT"
  | "GOP_MULTIPLE"
  | "MATCH"
  | (string & {});
export type DashIsoVideoCompositionOffsets =
  | "SIGNED"
  | "UNSIGNED"
  | (string & {});
export type DashIsoWriteSegmentTimelineInRepresentation =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export interface DashIsoGroupSettings {
  AdditionalManifests?: DashAdditionalManifest[];
  AudioChannelConfigSchemeIdUri?: DashIsoGroupAudioChannelConfigSchemeIdUri;
  BaseUrl?: string;
  DashIFrameTrickPlayNameModifier?: string;
  DashManifestStyle?: DashManifestStyle;
  Destination?: string;
  DestinationSettings?: DestinationSettings;
  Encryption?: DashIsoEncryptionSettings;
  FragmentLength?: number;
  HbbtvCompliance?: DashIsoHbbtvCompliance;
  ImageBasedTrickPlay?: DashIsoImageBasedTrickPlay;
  ImageBasedTrickPlaySettings?: DashIsoImageBasedTrickPlaySettings;
  ImageBasedTrickPlayVariants?: DashIsoImageBasedTrickPlayVariant[];
  MinBufferTime?: number;
  MinFinalSegmentLength?: number;
  MpdManifestBandwidthType?: DashIsoMpdManifestBandwidthType;
  MpdProfile?: DashIsoMpdProfile;
  PtsOffsetHandlingForBFrames?: DashIsoPtsOffsetHandlingForBFrames;
  SegmentControl?: DashIsoSegmentControl;
  SegmentLength?: number;
  SegmentLengthControl?: DashIsoSegmentLengthControl;
  VideoCompositionOffsets?: DashIsoVideoCompositionOffsets;
  WriteSegmentTimelineInRepresentation?: DashIsoWriteSegmentTimelineInRepresentation;
}
export interface FileGroupSettings {
  Destination?: string;
  DestinationSettings?: DestinationSettings;
}
export type HlsAdMarkers = "ELEMENTAL" | "ELEMENTAL_SCTE35" | (string & {});
export type __listOfHlsAdMarkers = HlsAdMarkers[];
export interface HlsAdditionalManifest {
  ManifestNameModifier?: string;
  SelectedOutputs?: string[];
}
export type __listOfHlsAdditionalManifest = HlsAdditionalManifest[];
export type HlsAudioOnlyHeader = "INCLUDE" | "EXCLUDE" | (string & {});
export interface HlsCaptionLanguageMapping {
  CaptionChannel?: number;
  CustomLanguageCode?: string;
  LanguageCode?: LanguageCode;
  LanguageDescription?: string;
}
export type __listOfHlsCaptionLanguageMapping = HlsCaptionLanguageMapping[];
export type HlsCaptionLanguageSetting =
  | "INSERT"
  | "OMIT"
  | "NONE"
  | (string & {});
export type HlsCaptionSegmentLengthControl =
  | "LARGE_SEGMENTS"
  | "MATCH_VIDEO"
  | (string & {});
export type HlsClientCache = "DISABLED" | "ENABLED" | (string & {});
export type HlsCodecSpecification = "RFC_6381" | "RFC_4281" | (string & {});
export type HlsDirectoryStructure =
  | "SINGLE_DIRECTORY"
  | "SUBDIRECTORY_PER_STREAM"
  | (string & {});
export type HlsEncryptionType = "AES128" | "SAMPLE_AES" | (string & {});
export type HlsInitializationVectorInManifest =
  | "INCLUDE"
  | "EXCLUDE"
  | (string & {});
export type HlsOfflineEncrypted = "ENABLED" | "DISABLED" | (string & {});
export type HlsKeyProviderType = "SPEKE" | "STATIC_KEY" | (string & {});
export interface HlsEncryptionSettings {
  ConstantInitializationVector?: string;
  EncryptionMethod?: HlsEncryptionType;
  InitializationVectorInManifest?: HlsInitializationVectorInManifest;
  OfflineEncrypted?: HlsOfflineEncrypted;
  SpekeKeyProvider?: SpekeKeyProvider;
  StaticKeyProvider?: StaticKeyProvider;
  Type?: HlsKeyProviderType;
}
export type HlsImageBasedTrickPlay =
  | "NONE"
  | "THUMBNAIL"
  | "THUMBNAIL_AND_FULLFRAME"
  | "ADVANCED"
  | "VARIANTS"
  | (string & {});
export type HlsIntervalCadence =
  | "FOLLOW_IFRAME"
  | "FOLLOW_CUSTOM"
  | "FOLLOW_SEGMENTATION"
  | (string & {});
export interface HlsImageBasedTrickPlaySettings {
  IntervalCadence?: HlsIntervalCadence;
  ThumbnailHeight?: number;
  ThumbnailInterval?: number;
  ThumbnailWidth?: number;
  TileHeight?: number;
  TileWidth?: number;
}
export interface HlsImageBasedTrickPlayVariant {
  IntervalCadence?: HlsIntervalCadence;
  ThumbnailHeight?: number;
  ThumbnailInterval?: number;
  ThumbnailWidth?: number;
  TileHeight?: number;
  TileWidth?: number;
}
export type __listOfHlsImageBasedTrickPlayVariant =
  HlsImageBasedTrickPlayVariant[];
export type HlsManifestCompression = "GZIP" | "NONE" | (string & {});
export type HlsManifestDurationFormat =
  | "FLOATING_POINT"
  | "INTEGER"
  | (string & {});
export type HlsOutputSelection =
  | "MANIFESTS_AND_SEGMENTS"
  | "SEGMENTS_ONLY"
  | (string & {});
export type HlsProgramDateTime = "INCLUDE" | "EXCLUDE" | (string & {});
export type __integerMin0Max3600 = number;
export type HlsProgressiveWriteHlsManifest =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export type HlsSegmentControl =
  | "SINGLE_FILE"
  | "SEGMENTED_FILES"
  | (string & {});
export type HlsSegmentLengthControl =
  | "EXACT"
  | "GOP_MULTIPLE"
  | "MATCH"
  | (string & {});
export type HlsStreamInfResolution = "INCLUDE" | "EXCLUDE" | (string & {});
export type HlsTargetDurationCompatibilityMode =
  | "LEGACY"
  | "SPEC_COMPLIANT"
  | (string & {});
export type HlsTimedMetadataId3Frame = "NONE" | "PRIV" | "TDRL" | (string & {});
export interface HlsGroupSettings {
  AdMarkers?: HlsAdMarkers[];
  AdditionalManifests?: HlsAdditionalManifest[];
  AudioOnlyHeader?: HlsAudioOnlyHeader;
  BaseUrl?: string;
  CaptionLanguageMappings?: HlsCaptionLanguageMapping[];
  CaptionLanguageSetting?: HlsCaptionLanguageSetting;
  CaptionSegmentLengthControl?: HlsCaptionSegmentLengthControl;
  ClientCache?: HlsClientCache;
  CodecSpecification?: HlsCodecSpecification;
  Destination?: string;
  DestinationSettings?: DestinationSettings;
  DirectoryStructure?: HlsDirectoryStructure;
  Encryption?: HlsEncryptionSettings;
  ImageBasedTrickPlay?: HlsImageBasedTrickPlay;
  ImageBasedTrickPlaySettings?: HlsImageBasedTrickPlaySettings;
  ImageBasedTrickPlayVariants?: HlsImageBasedTrickPlayVariant[];
  ManifestCompression?: HlsManifestCompression;
  ManifestDurationFormat?: HlsManifestDurationFormat;
  MinFinalSegmentLength?: number;
  MinSegmentLength?: number;
  OutputSelection?: HlsOutputSelection;
  ProgramDateTime?: HlsProgramDateTime;
  ProgramDateTimePeriod?: number;
  ProgressiveWriteHlsManifest?: HlsProgressiveWriteHlsManifest;
  SegmentControl?: HlsSegmentControl;
  SegmentLength?: number;
  SegmentLengthControl?: HlsSegmentLengthControl;
  SegmentsPerSubdirectory?: number;
  StreamInfResolution?: HlsStreamInfResolution;
  TargetDurationCompatibilityMode?: HlsTargetDurationCompatibilityMode;
  TimedMetadataId3Frame?: HlsTimedMetadataId3Frame;
  TimedMetadataId3Period?: number;
  TimestampDeltaMilliseconds?: number;
}
export interface MsSmoothAdditionalManifest {
  ManifestNameModifier?: string;
  SelectedOutputs?: string[];
}
export type __listOfMsSmoothAdditionalManifest = MsSmoothAdditionalManifest[];
export type MsSmoothAudioDeduplication =
  | "COMBINE_DUPLICATE_STREAMS"
  | "NONE"
  | (string & {});
export interface MsSmoothEncryptionSettings {
  SpekeKeyProvider?: SpekeKeyProvider;
}
export type MsSmoothFragmentLengthControl =
  | "EXACT"
  | "GOP_MULTIPLE"
  | (string & {});
export type MsSmoothManifestEncoding = "UTF8" | "UTF16" | (string & {});
export interface MsSmoothGroupSettings {
  AdditionalManifests?: MsSmoothAdditionalManifest[];
  AudioDeduplication?: MsSmoothAudioDeduplication;
  Destination?: string;
  DestinationSettings?: DestinationSettings;
  Encryption?: MsSmoothEncryptionSettings;
  FragmentLength?: number;
  FragmentLengthControl?: MsSmoothFragmentLengthControl;
  ManifestEncoding?: MsSmoothManifestEncoding;
}
export type FrameMetricType =
  | "PSNR"
  | "SSIM"
  | "MS_SSIM"
  | "PSNR_HVS"
  | "VMAF"
  | "QVBR"
  | "SHOT_CHANGE"
  | (string & {});
export type __listOfFrameMetricType = FrameMetricType[];
export type OutputGroupType =
  | "HLS_GROUP_SETTINGS"
  | "DASH_ISO_GROUP_SETTINGS"
  | "FILE_GROUP_SETTINGS"
  | "MS_SMOOTH_GROUP_SETTINGS"
  | "CMAF_GROUP_SETTINGS"
  | (string & {});
export interface OutputGroupSettings {
  CmafGroupSettings?: CmafGroupSettings;
  DashIsoGroupSettings?: DashIsoGroupSettings;
  FileGroupSettings?: FileGroupSettings;
  HlsGroupSettings?: HlsGroupSettings;
  MsSmoothGroupSettings?: MsSmoothGroupSettings;
  PerFrameMetrics?: FrameMetricType[];
  Type?: OutputGroupType;
}
export type AudioChannelTag =
  | "L"
  | "R"
  | "C"
  | "LFE"
  | "LS"
  | "RS"
  | "LC"
  | "RC"
  | "CS"
  | "LSD"
  | "RSD"
  | "TCS"
  | "VHL"
  | "VHC"
  | "VHR"
  | "TBL"
  | "TBC"
  | "TBR"
  | "RSL"
  | "RSR"
  | "LW"
  | "RW"
  | "LFE2"
  | "LT"
  | "RT"
  | "HI"
  | "NAR"
  | "M"
  | (string & {});
export type __listOfAudioChannelTag = AudioChannelTag[];
export interface AudioChannelTaggingSettings {
  ChannelTag?: AudioChannelTag;
  ChannelTags?: AudioChannelTag[];
}
export type AudioNormalizationAlgorithm =
  | "ITU_BS_1770_1"
  | "ITU_BS_1770_2"
  | "ITU_BS_1770_3"
  | "ITU_BS_1770_4"
  | (string & {});
export type AudioNormalizationAlgorithmControl =
  | "CORRECT_AUDIO"
  | "MEASURE_ONLY"
  | (string & {});
export type __integerMinNegative70Max0 = number;
export type AudioNormalizationLoudnessLogging =
  | "LOG"
  | "DONT_LOG"
  | (string & {});
export type AudioNormalizationPeakCalculation =
  | "TRUE_PEAK"
  | "NONE"
  | (string & {});
export type __doubleMinNegative59Max0 = number;
export type __doubleMinNegative8Max0 = number;
export interface AudioNormalizationSettings {
  Algorithm?: AudioNormalizationAlgorithm;
  AlgorithmControl?: AudioNormalizationAlgorithmControl;
  CorrectionGateLevel?: number;
  LoudnessLogging?: AudioNormalizationLoudnessLogging;
  PeakCalculation?: AudioNormalizationPeakCalculation;
  TargetLkfs?: number;
  TruePeakLimiterThreshold?: number;
}
export type SlowPalPitchCorrection = "DISABLED" | "ENABLED" | (string & {});
export interface AudioPitchCorrectionSettings {
  SlowPalPitchCorrection?: SlowPalPitchCorrection;
}
export type __integerMin0Max255 = number;
export type AudioTypeControl =
  | "FOLLOW_INPUT"
  | "USE_CONFIGURED"
  | (string & {});
export type AacAudioDescriptionBroadcasterMix =
  | "BROADCASTER_MIXED_AD"
  | "NORMAL"
  | (string & {});
export type __integerMin6000Max1024000 = number;
export type AacCodecProfile = "LC" | "HEV1" | "HEV2" | "XHE" | (string & {});
export type AacCodingMode =
  | "AD_RECEIVER_MIX"
  | "CODING_MODE_1_0"
  | "CODING_MODE_1_1"
  | "CODING_MODE_2_0"
  | "CODING_MODE_5_1"
  | "CODING_MODE_AUTO"
  | (string & {});
export type AacLoudnessMeasurementMode = "PROGRAM" | "ANCHOR" | (string & {});
export type __integerMin2000Max30000 = number;
export type AacRateControlMode = "CBR" | "VBR" | (string & {});
export type AacRawFormat = "LATM_LOAS" | "NONE" | (string & {});
export type __integerMin8000Max96000 = number;
export type AacSpecification = "MPEG2" | "MPEG4" | (string & {});
export type __integerMin6Max16 = number;
export type AacVbrQuality =
  | "LOW"
  | "MEDIUM_LOW"
  | "MEDIUM_HIGH"
  | "HIGH"
  | (string & {});
export interface AacSettings {
  AudioDescriptionBroadcasterMix?: AacAudioDescriptionBroadcasterMix;
  Bitrate?: number;
  CodecProfile?: AacCodecProfile;
  CodingMode?: AacCodingMode;
  LoudnessMeasurementMode?: AacLoudnessMeasurementMode;
  RapInterval?: number;
  RateControlMode?: AacRateControlMode;
  RawFormat?: AacRawFormat;
  SampleRate?: number;
  Specification?: AacSpecification;
  TargetLoudnessRange?: number;
  VbrQuality?: AacVbrQuality;
}
export type __integerMin64000Max640000 = number;
export type Ac3BitstreamMode =
  | "COMPLETE_MAIN"
  | "COMMENTARY"
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
  | "CODING_MODE_AUTO"
  | (string & {});
export type __integerMin1Max31 = number;
export type Ac3DynamicRangeCompressionLine =
  | "FILM_STANDARD"
  | "FILM_LIGHT"
  | "MUSIC_STANDARD"
  | "MUSIC_LIGHT"
  | "SPEECH"
  | "NONE"
  | (string & {});
export type Ac3DynamicRangeCompressionProfile =
  | "FILM_STANDARD"
  | "NONE"
  | (string & {});
export type Ac3DynamicRangeCompressionRf =
  | "FILM_STANDARD"
  | "FILM_LIGHT"
  | "MUSIC_STANDARD"
  | "MUSIC_LIGHT"
  | "SPEECH"
  | "NONE"
  | (string & {});
export type Ac3LfeFilter = "ENABLED" | "DISABLED" | (string & {});
export type Ac3MetadataControl =
  | "FOLLOW_INPUT"
  | "USE_CONFIGURED"
  | (string & {});
export type __integerMin48000Max48000 = number;
export interface Ac3Settings {
  Bitrate?: number;
  BitstreamMode?: Ac3BitstreamMode;
  CodingMode?: Ac3CodingMode;
  Dialnorm?: number;
  DynamicRangeCompressionLine?: Ac3DynamicRangeCompressionLine;
  DynamicRangeCompressionProfile?: Ac3DynamicRangeCompressionProfile;
  DynamicRangeCompressionRf?: Ac3DynamicRangeCompressionRf;
  LfeFilter?: Ac3LfeFilter;
  MetadataControl?: Ac3MetadataControl;
  SampleRate?: number;
}
export type __integerMin48000Max768000 = number;
export type Ac4BitstreamMode = "COMPLETE_MAIN" | "EMERGENCY" | (string & {});
export type Ac4CodingMode =
  | "CODING_MODE_2_0"
  | "CODING_MODE_3_2_LFE"
  | "CODING_MODE_5_1_4"
  | (string & {});
export type Ac4DynamicRangeCompressionDrcProfile =
  | "NONE"
  | "FILM_STANDARD"
  | "FILM_LIGHT"
  | "MUSIC_STANDARD"
  | "MUSIC_LIGHT"
  | "SPEECH"
  | (string & {});
export type __doubleMinNegative1000Max3 = number;
export type __doubleMinNegative1000MaxNegative1 = number;
export type Ac4StereoDownmix =
  | "NOT_INDICATED"
  | "LO_RO"
  | "LT_RT"
  | "DPL2"
  | (string & {});
export interface Ac4Settings {
  Bitrate?: number;
  BitstreamMode?: Ac4BitstreamMode;
  CodingMode?: Ac4CodingMode;
  DynamicRangeCompressionFlatPanelTv?: Ac4DynamicRangeCompressionDrcProfile;
  DynamicRangeCompressionHomeTheater?: Ac4DynamicRangeCompressionDrcProfile;
  DynamicRangeCompressionPortableHeadphones?: Ac4DynamicRangeCompressionDrcProfile;
  DynamicRangeCompressionPortableSpeakers?: Ac4DynamicRangeCompressionDrcProfile;
  LoRoCenterMixLevel?: number;
  LoRoSurroundMixLevel?: number;
  LtRtCenterMixLevel?: number;
  LtRtSurroundMixLevel?: number;
  SampleRate?: number;
  StereoDownmix?: Ac4StereoDownmix;
}
export type __integerMin16Max24 = number;
export type __integerMin0Max64 = number;
export type __integerMin8000Max192000 = number;
export interface AiffSettings {
  BitDepth?: number;
  Channels?: number;
  SampleRate?: number;
}
export type AudioCodec =
  | "AAC"
  | "MP2"
  | "MP3"
  | "WAV"
  | "AIFF"
  | "AC3"
  | "AC4"
  | "EAC3"
  | "EAC3_ATMOS"
  | "VORBIS"
  | "OPUS"
  | "PASSTHROUGH"
  | "FLAC"
  | (string & {});
export type __integerMin384000Max1024000 = number;
export type Eac3AtmosBitstreamMode = "COMPLETE_MAIN" | (string & {});
export type Eac3AtmosCodingMode =
  | "CODING_MODE_AUTO"
  | "CODING_MODE_5_1_4"
  | "CODING_MODE_7_1_4"
  | "CODING_MODE_9_1_6"
  | (string & {});
export type Eac3AtmosDialogueIntelligence =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export type Eac3AtmosDownmixControl =
  | "SPECIFIED"
  | "INITIALIZE_FROM_SOURCE"
  | (string & {});
export type Eac3AtmosDynamicRangeCompressionLine =
  | "NONE"
  | "FILM_STANDARD"
  | "FILM_LIGHT"
  | "MUSIC_STANDARD"
  | "MUSIC_LIGHT"
  | "SPEECH"
  | (string & {});
export type Eac3AtmosDynamicRangeCompressionRf =
  | "NONE"
  | "FILM_STANDARD"
  | "FILM_LIGHT"
  | "MUSIC_STANDARD"
  | "MUSIC_LIGHT"
  | "SPEECH"
  | (string & {});
export type Eac3AtmosDynamicRangeControl =
  | "SPECIFIED"
  | "INITIALIZE_FROM_SOURCE"
  | (string & {});
export type __doubleMinNegative6Max3 = number;
export type __doubleMinNegative60MaxNegative1 = number;
export type Eac3AtmosMeteringMode =
  | "LEQ_A"
  | "ITU_BS_1770_1"
  | "ITU_BS_1770_2"
  | "ITU_BS_1770_3"
  | "ITU_BS_1770_4"
  | (string & {});
export type Eac3AtmosStereoDownmix =
  | "NOT_INDICATED"
  | "STEREO"
  | "SURROUND"
  | "DPL2"
  | (string & {});
export type Eac3AtmosSurroundExMode =
  | "NOT_INDICATED"
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export interface Eac3AtmosSettings {
  Bitrate?: number;
  BitstreamMode?: Eac3AtmosBitstreamMode;
  CodingMode?: Eac3AtmosCodingMode;
  DialogueIntelligence?: Eac3AtmosDialogueIntelligence;
  DownmixControl?: Eac3AtmosDownmixControl;
  DynamicRangeCompressionLine?: Eac3AtmosDynamicRangeCompressionLine;
  DynamicRangeCompressionRf?: Eac3AtmosDynamicRangeCompressionRf;
  DynamicRangeControl?: Eac3AtmosDynamicRangeControl;
  LoRoCenterMixLevel?: number;
  LoRoSurroundMixLevel?: number;
  LtRtCenterMixLevel?: number;
  LtRtSurroundMixLevel?: number;
  MeteringMode?: Eac3AtmosMeteringMode;
  SampleRate?: number;
  SpeechThreshold?: number;
  StereoDownmix?: Eac3AtmosStereoDownmix;
  SurroundExMode?: Eac3AtmosSurroundExMode;
}
export type Eac3AttenuationControl = "ATTENUATE_3_DB" | "NONE" | (string & {});
export type __integerMin32000Max3024000 = number;
export type Eac3BitstreamMode =
  | "COMPLETE_MAIN"
  | "COMMENTARY"
  | "EMERGENCY"
  | "HEARING_IMPAIRED"
  | "VISUALLY_IMPAIRED"
  | (string & {});
export type Eac3CodingMode =
  | "CODING_MODE_1_0"
  | "CODING_MODE_2_0"
  | "CODING_MODE_3_2"
  | "CODING_MODE_AUTO"
  | (string & {});
export type Eac3DcFilter = "ENABLED" | "DISABLED" | (string & {});
export type Eac3DynamicRangeCompressionLine =
  | "NONE"
  | "FILM_STANDARD"
  | "FILM_LIGHT"
  | "MUSIC_STANDARD"
  | "MUSIC_LIGHT"
  | "SPEECH"
  | (string & {});
export type Eac3DynamicRangeCompressionRf =
  | "NONE"
  | "FILM_STANDARD"
  | "FILM_LIGHT"
  | "MUSIC_STANDARD"
  | "MUSIC_LIGHT"
  | "SPEECH"
  | (string & {});
export type Eac3LfeControl = "LFE" | "NO_LFE" | (string & {});
export type Eac3LfeFilter = "ENABLED" | "DISABLED" | (string & {});
export type __doubleMinNegative60Max3 = number;
export type Eac3MetadataControl =
  | "FOLLOW_INPUT"
  | "USE_CONFIGURED"
  | (string & {});
export type Eac3PassthroughControl =
  | "WHEN_POSSIBLE"
  | "NO_PASSTHROUGH"
  | (string & {});
export type Eac3PhaseControl = "SHIFT_90_DEGREES" | "NO_SHIFT" | (string & {});
export type Eac3StereoDownmix =
  | "NOT_INDICATED"
  | "LO_RO"
  | "LT_RT"
  | "DPL2"
  | (string & {});
export type Eac3SurroundExMode =
  | "NOT_INDICATED"
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export type Eac3SurroundMode =
  | "NOT_INDICATED"
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export interface Eac3Settings {
  AttenuationControl?: Eac3AttenuationControl;
  Bitrate?: number;
  BitstreamMode?: Eac3BitstreamMode;
  CodingMode?: Eac3CodingMode;
  DcFilter?: Eac3DcFilter;
  Dialnorm?: number;
  DynamicRangeCompressionLine?: Eac3DynamicRangeCompressionLine;
  DynamicRangeCompressionRf?: Eac3DynamicRangeCompressionRf;
  LfeControl?: Eac3LfeControl;
  LfeFilter?: Eac3LfeFilter;
  LoRoCenterMixLevel?: number;
  LoRoSurroundMixLevel?: number;
  LtRtCenterMixLevel?: number;
  LtRtSurroundMixLevel?: number;
  MetadataControl?: Eac3MetadataControl;
  PassthroughControl?: Eac3PassthroughControl;
  PhaseControl?: Eac3PhaseControl;
  SampleRate?: number;
  StereoDownmix?: Eac3StereoDownmix;
  SurroundExMode?: Eac3SurroundExMode;
  SurroundMode?: Eac3SurroundMode;
}
export type __integerMin22050Max192000 = number;
export interface FlacSettings {
  BitDepth?: number;
  Channels?: number;
  SampleRate?: number;
}
export type Mp2AudioDescriptionMix =
  | "BROADCASTER_MIXED_AD"
  | "NONE"
  | (string & {});
export type __integerMin32000Max384000 = number;
export type __integerMin0Max2 = number;
export interface Mp2Settings {
  AudioDescriptionMix?: Mp2AudioDescriptionMix;
  Bitrate?: number;
  Channels?: number;
  SampleRate?: number;
}
export type __integerMin16000Max320000 = number;
export type Mp3RateControlMode = "CBR" | "VBR" | (string & {});
export type __integerMin22050Max48000 = number;
export type __integerMin0Max9 = number;
export interface Mp3Settings {
  Bitrate?: number;
  Channels?: number;
  RateControlMode?: Mp3RateControlMode;
  SampleRate?: number;
  VbrQuality?: number;
}
export type __integerMin32000Max192000 = number;
export type __integerMin16000Max48000 = number;
export interface OpusSettings {
  Bitrate?: number;
  Channels?: number;
  SampleRate?: number;
}
export type __integerMinNegative1Max10 = number;
export interface VorbisSettings {
  Channels?: number;
  SampleRate?: number;
  VbrQuality?: number;
}
export type WavFormat = "RIFF" | "RF64" | "EXTENSIBLE" | (string & {});
export interface WavSettings {
  BitDepth?: number;
  Channels?: number;
  Format?: WavFormat;
  SampleRate?: number;
}
export interface AudioCodecSettings {
  AacSettings?: AacSettings;
  Ac3Settings?: Ac3Settings;
  Ac4Settings?: Ac4Settings;
  AiffSettings?: AiffSettings;
  Codec?: AudioCodec;
  Eac3AtmosSettings?: Eac3AtmosSettings;
  Eac3Settings?: Eac3Settings;
  FlacSettings?: FlacSettings;
  Mp2Settings?: Mp2Settings;
  Mp3Settings?: Mp3Settings;
  OpusSettings?: OpusSettings;
  VorbisSettings?: VorbisSettings;
  WavSettings?: WavSettings;
}
export type __stringPatternAZaZ23AZaZ09 = string;
export type AudioLanguageCodeControl =
  | "FOLLOW_INPUT"
  | "USE_CONFIGURED"
  | (string & {});
export type __stringPatternWS = string;
export interface AudioDescription {
  AudioChannelTaggingSettings?: AudioChannelTaggingSettings;
  AudioNormalizationSettings?: AudioNormalizationSettings;
  AudioPitchCorrectionSettings?: AudioPitchCorrectionSettings;
  AudioSourceName?: string;
  AudioType?: number;
  AudioTypeControl?: AudioTypeControl;
  CodecSettings?: AudioCodecSettings;
  CustomLanguageCode?: string;
  LanguageCode?: LanguageCode;
  LanguageCodeControl?: AudioLanguageCodeControl;
  RemixSettings?: RemixSettings;
  StreamName?: string;
}
export type __listOfAudioDescription = AudioDescription[];
export type __stringPatternAZaZ23AZaZ = string;
export type BurninSubtitleAlignment =
  | "CENTERED"
  | "LEFT"
  | "AUTO"
  | (string & {});
export type BurninSubtitleApplyFontColor =
  | "WHITE_TEXT_ONLY"
  | "ALL_TEXT"
  | (string & {});
export type BurninSubtitleBackgroundColor =
  | "NONE"
  | "BLACK"
  | "WHITE"
  | "AUTO"
  | (string & {});
export type BurninSubtitleFallbackFont =
  | "BEST_MATCH"
  | "MONOSPACED_SANSSERIF"
  | "MONOSPACED_SERIF"
  | "PROPORTIONAL_SANSSERIF"
  | "PROPORTIONAL_SERIF"
  | (string & {});
export type BurninSubtitleFontColor =
  | "WHITE"
  | "BLACK"
  | "YELLOW"
  | "RED"
  | "GREEN"
  | "BLUE"
  | "HEX"
  | "AUTO"
  | (string & {});
export type __stringPatternS3TtfHttpsTtf = string;
export type __integerMin96Max600 = number;
export type FontScript = "AUTOMATIC" | "HANS" | "HANT" | (string & {});
export type __integerMin0Max96 = number;
export type __stringMin6Max8Pattern09aFAF609aFAF2 = string;
export type BurninSubtitleOutlineColor =
  | "BLACK"
  | "WHITE"
  | "YELLOW"
  | "RED"
  | "GREEN"
  | "BLUE"
  | "AUTO"
  | (string & {});
export type __integerMin0Max10 = number;
export type RemoveRubyReserveAttributes =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export type BurninSubtitleShadowColor =
  | "NONE"
  | "BLACK"
  | "WHITE"
  | "AUTO"
  | (string & {});
export type BurnInSubtitleStylePassthrough =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export type BurninSubtitleTeletextSpacing =
  | "FIXED_GRID"
  | "PROPORTIONAL"
  | "AUTO"
  | (string & {});
export interface BurninDestinationSettings {
  Alignment?: BurninSubtitleAlignment;
  ApplyFontColor?: BurninSubtitleApplyFontColor;
  BackgroundColor?: BurninSubtitleBackgroundColor;
  BackgroundOpacity?: number;
  FallbackFont?: BurninSubtitleFallbackFont;
  FontColor?: BurninSubtitleFontColor;
  FontFileBold?: string;
  FontFileBoldItalic?: string;
  FontFileItalic?: string;
  FontFileRegular?: string;
  FontOpacity?: number;
  FontResolution?: number;
  FontScript?: FontScript;
  FontSize?: number;
  HexFontColor?: string;
  OutlineColor?: BurninSubtitleOutlineColor;
  OutlineSize?: number;
  RemoveRubyReserveAttributes?: RemoveRubyReserveAttributes;
  ShadowColor?: BurninSubtitleShadowColor;
  ShadowOpacity?: number;
  ShadowXOffset?: number;
  ShadowYOffset?: number;
  StylePassthrough?: BurnInSubtitleStylePassthrough;
  TeletextSpacing?: BurninSubtitleTeletextSpacing;
  XPosition?: number;
  YPosition?: number;
}
export type CaptionDestinationType =
  | "BURN_IN"
  | "DVB_SUB"
  | "EMBEDDED"
  | "EMBEDDED_PLUS_SCTE20"
  | "IMSC"
  | "SCTE20_PLUS_EMBEDDED"
  | "SCC"
  | "SRT"
  | "SMI"
  | "TELETEXT"
  | "TTML"
  | "WEBVTT"
  | (string & {});
export type DvbSubtitleAlignment = "CENTERED" | "LEFT" | "AUTO" | (string & {});
export type DvbSubtitleApplyFontColor =
  | "WHITE_TEXT_ONLY"
  | "ALL_TEXT"
  | (string & {});
export type DvbSubtitleBackgroundColor =
  | "NONE"
  | "BLACK"
  | "WHITE"
  | "AUTO"
  | (string & {});
export type DvbddsHandling =
  | "NONE"
  | "SPECIFIED"
  | "NO_DISPLAY_WINDOW"
  | "SPECIFIED_OPTIMAL"
  | (string & {});
export type DvbSubSubtitleFallbackFont =
  | "BEST_MATCH"
  | "MONOSPACED_SANSSERIF"
  | "MONOSPACED_SERIF"
  | "PROPORTIONAL_SANSSERIF"
  | "PROPORTIONAL_SERIF"
  | (string & {});
export type DvbSubtitleFontColor =
  | "WHITE"
  | "BLACK"
  | "YELLOW"
  | "RED"
  | "GREEN"
  | "BLUE"
  | "HEX"
  | "AUTO"
  | (string & {});
export type DvbSubtitleOutlineColor =
  | "BLACK"
  | "WHITE"
  | "YELLOW"
  | "RED"
  | "GREEN"
  | "BLUE"
  | "AUTO"
  | (string & {});
export type DvbSubtitleShadowColor =
  | "NONE"
  | "BLACK"
  | "WHITE"
  | "AUTO"
  | (string & {});
export type DvbSubtitleStylePassthrough =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export type DvbSubtitlingType = "HEARING_IMPAIRED" | "STANDARD" | (string & {});
export type DvbSubtitleTeletextSpacing =
  | "FIXED_GRID"
  | "PROPORTIONAL"
  | "AUTO"
  | (string & {});
export interface DvbSubDestinationSettings {
  Alignment?: DvbSubtitleAlignment;
  ApplyFontColor?: DvbSubtitleApplyFontColor;
  BackgroundColor?: DvbSubtitleBackgroundColor;
  BackgroundOpacity?: number;
  DdsHandling?: DvbddsHandling;
  DdsXCoordinate?: number;
  DdsYCoordinate?: number;
  FallbackFont?: DvbSubSubtitleFallbackFont;
  FontColor?: DvbSubtitleFontColor;
  FontFileBold?: string;
  FontFileBoldItalic?: string;
  FontFileItalic?: string;
  FontFileRegular?: string;
  FontOpacity?: number;
  FontResolution?: number;
  FontScript?: FontScript;
  FontSize?: number;
  Height?: number;
  HexFontColor?: string;
  OutlineColor?: DvbSubtitleOutlineColor;
  OutlineSize?: number;
  ShadowColor?: DvbSubtitleShadowColor;
  ShadowOpacity?: number;
  ShadowXOffset?: number;
  ShadowYOffset?: number;
  StylePassthrough?: DvbSubtitleStylePassthrough;
  SubtitlingType?: DvbSubtitlingType;
  TeletextSpacing?: DvbSubtitleTeletextSpacing;
  Width?: number;
  XPosition?: number;
  YPosition?: number;
}
export type __integerMin1Max6 = number;
export interface EmbeddedDestinationSettings {
  Destination608ChannelNumber?: number;
  Destination708ServiceNumber?: number;
}
export type ImscAccessibilitySubs = "DISABLED" | "ENABLED" | (string & {});
export type ImscStylePassthrough = "ENABLED" | "DISABLED" | (string & {});
export interface ImscDestinationSettings {
  Accessibility?: ImscAccessibilitySubs;
  StylePassthrough?: ImscStylePassthrough;
}
export type SccDestinationFramerate =
  | "FRAMERATE_23_97"
  | "FRAMERATE_24"
  | "FRAMERATE_25"
  | "FRAMERATE_29_97_DROPFRAME"
  | "FRAMERATE_29_97_NON_DROPFRAME"
  | (string & {});
export interface SccDestinationSettings {
  Framerate?: SccDestinationFramerate;
}
export type SrtStylePassthrough = "ENABLED" | "DISABLED" | (string & {});
export interface SrtDestinationSettings {
  StylePassthrough?: SrtStylePassthrough;
}
export type TeletextPageType =
  | "PAGE_TYPE_INITIAL"
  | "PAGE_TYPE_SUBTITLE"
  | "PAGE_TYPE_ADDL_INFO"
  | "PAGE_TYPE_PROGRAM_SCHEDULE"
  | "PAGE_TYPE_HEARING_IMPAIRED_SUBTITLE"
  | (string & {});
export type __listOfTeletextPageType = TeletextPageType[];
export interface TeletextDestinationSettings {
  PageNumber?: string;
  PageTypes?: TeletextPageType[];
}
export type TtmlStylePassthrough = "ENABLED" | "DISABLED" | (string & {});
export interface TtmlDestinationSettings {
  StylePassthrough?: TtmlStylePassthrough;
}
export type WebvttAccessibilitySubs = "DISABLED" | "ENABLED" | (string & {});
export type WebvttStylePassthrough =
  | "ENABLED"
  | "DISABLED"
  | "STRICT"
  | "MERGE"
  | (string & {});
export interface WebvttDestinationSettings {
  Accessibility?: WebvttAccessibilitySubs;
  StylePassthrough?: WebvttStylePassthrough;
}
export interface CaptionDestinationSettings {
  BurninDestinationSettings?: BurninDestinationSettings;
  DestinationType?: CaptionDestinationType;
  DvbSubDestinationSettings?: DvbSubDestinationSettings;
  EmbeddedDestinationSettings?: EmbeddedDestinationSettings;
  ImscDestinationSettings?: ImscDestinationSettings;
  SccDestinationSettings?: SccDestinationSettings;
  SrtDestinationSettings?: SrtDestinationSettings;
  TeletextDestinationSettings?: TeletextDestinationSettings;
  TtmlDestinationSettings?: TtmlDestinationSettings;
  WebvttDestinationSettings?: WebvttDestinationSettings;
}
export interface CaptionDescription {
  CaptionSelectorName?: string;
  CustomLanguageCode?: string;
  DestinationSettings?: CaptionDestinationSettings;
  LanguageCode?: LanguageCode;
  LanguageDescription?: string;
}
export type __listOfCaptionDescription = CaptionDescription[];
export type CmfcAudioDuration =
  | "DEFAULT_CODEC_DURATION"
  | "MATCH_VIDEO_DURATION"
  | (string & {});
export type CmfcAudioTrackType =
  | "ALTERNATE_AUDIO_AUTO_SELECT_DEFAULT"
  | "ALTERNATE_AUDIO_AUTO_SELECT"
  | "ALTERNATE_AUDIO_NOT_AUTO_SELECT"
  | "AUDIO_ONLY_VARIANT_STREAM"
  | (string & {});
export type CmfcC2paManifest = "INCLUDE" | "EXCLUDE" | (string & {});
export type CmfcDescriptiveVideoServiceFlag =
  | "DONT_FLAG"
  | "FLAG"
  | (string & {});
export type CmfcIFrameOnlyManifest = "INCLUDE" | "EXCLUDE" | (string & {});
export type CmfcKlvMetadata = "PASSTHROUGH" | "NONE" | (string & {});
export type CmfcManifestMetadataSignaling =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export type CmfcScte35Esam = "INSERT" | "NONE" | (string & {});
export type CmfcScte35Source = "PASSTHROUGH" | "NONE" | (string & {});
export type __stringMin1PatternArnAwsUsGovCnKmsAZ26EastWestCentralNorthSouthEastWest1912D12KeyAFAF098AFAF094AFAF094AFAF094AFAF0912MrkAFAF0932 =
  string;
export type CmfcTimedMetadata = "PASSTHROUGH" | "NONE" | (string & {});
export type CmfcTimedMetadataBoxVersion =
  | "VERSION_0"
  | "VERSION_1"
  | (string & {});
export type __stringMax1000 = string;
export interface CmfcSettings {
  AudioDuration?: CmfcAudioDuration;
  AudioGroupId?: string;
  AudioRenditionSets?: string;
  AudioTrackType?: CmfcAudioTrackType;
  C2paManifest?: CmfcC2paManifest;
  CertificateSecret?: string;
  DescriptiveVideoServiceFlag?: CmfcDescriptiveVideoServiceFlag;
  IFrameOnlyManifest?: CmfcIFrameOnlyManifest;
  KlvMetadata?: CmfcKlvMetadata;
  ManifestMetadataSignaling?: CmfcManifestMetadataSignaling;
  Scte35Esam?: CmfcScte35Esam;
  Scte35Source?: CmfcScte35Source;
  SigningKmsKey?: string;
  TimedMetadata?: CmfcTimedMetadata;
  TimedMetadataBoxVersion?: CmfcTimedMetadataBoxVersion;
  TimedMetadataSchemeIdUri?: string;
  TimedMetadataValue?: string;
}
export type ContainerType =
  | "F4V"
  | "GIF"
  | "ISMV"
  | "M2TS"
  | "M3U8"
  | "CMFC"
  | "MOV"
  | "MP4"
  | "MPD"
  | "MXF"
  | "OGG"
  | "WEBM"
  | "RAW"
  | "Y4M"
  | (string & {});
export type F4vMoovPlacement =
  | "PROGRESSIVE_DOWNLOAD"
  | "NORMAL"
  | (string & {});
export interface F4vSettings {
  MoovPlacement?: F4vMoovPlacement;
}
export type M2tsAudioBufferModel = "DVB" | "ATSC" | (string & {});
export type M2tsAudioDuration =
  | "DEFAULT_CODEC_DURATION"
  | "MATCH_VIDEO_DURATION"
  | (string & {});
export type __integerMin32Max8182 = number;
export type __listOf__integerMin32Max8182 = number[];
export type __integerMinNegative10000Max10000 = number;
export type M2tsBufferModel = "MULTIPLEX" | "NONE" | (string & {});
export type M2tsDataPtsControl = "AUTO" | "ALIGN_TO_VIDEO" | (string & {});
export type __integerMin25Max10000 = number;
export interface DvbNitSettings {
  NetworkId?: number;
  NetworkName?: string;
  NitInterval?: number;
}
export type OutputSdt =
  | "SDT_FOLLOW"
  | "SDT_FOLLOW_IF_PRESENT"
  | "SDT_MANUAL"
  | "SDT_NONE"
  | (string & {});
export type __integerMin25Max2000 = number;
export interface DvbSdtSettings {
  OutputSdt?: OutputSdt;
  SdtInterval?: number;
  ServiceName?: string;
  ServiceProviderName?: string;
}
export type __integerMin1000Max30000 = number;
export interface DvbTdtSettings {
  TdtInterval?: number;
}
export type M2tsEbpAudioInterval =
  | "VIDEO_AND_FIXED_INTERVALS"
  | "VIDEO_INTERVAL"
  | (string & {});
export type M2tsEbpPlacement =
  | "VIDEO_AND_AUDIO_PIDS"
  | "VIDEO_PID"
  | (string & {});
export type M2tsEsRateInPes = "INCLUDE" | "EXCLUDE" | (string & {});
export type M2tsForceTsVideoEbpOrder = "FORCE" | "DEFAULT" | (string & {});
export type M2tsKlvMetadata = "PASSTHROUGH" | "NONE" | (string & {});
export type __integerMin0Max500 = number;
export type __integerMin0Max10000 = number;
export type M2tsNielsenId3 = "INSERT" | "NONE" | (string & {});
export type __integerMin0Max1000 = number;
export type M2tsPcrControl =
  | "PCR_EVERY_PES_PACKET"
  | "CONFIGURED_PCR_PERIOD"
  | (string & {});
export type M2tsPreventBufferUnderflow = "DISABLED" | "ENABLED" | (string & {});
export type TsPtsOffset = "AUTO" | "SECONDS" | "MILLISECONDS" | (string & {});
export type M2tsRateMode = "VBR" | "CBR" | (string & {});
export interface M2tsScte35Esam {
  Scte35EsamPid?: number;
}
export type M2tsScte35Source = "PASSTHROUGH" | "NONE" | (string & {});
export type M2tsSegmentationMarkers =
  | "NONE"
  | "RAI_SEGSTART"
  | "RAI_ADAPT"
  | "PSI_SEGSTART"
  | "EBP"
  | "EBP_LEGACY"
  | (string & {});
export type M2tsSegmentationStyle =
  | "MAINTAIN_CADENCE"
  | "RESET_CADENCE"
  | (string & {});
export interface M2tsSettings {
  AudioBufferModel?: M2tsAudioBufferModel;
  AudioDuration?: M2tsAudioDuration;
  AudioFramesPerPes?: number;
  AudioPids?: number[];
  AudioPtsOffsetDelta?: number;
  Bitrate?: number;
  BufferModel?: M2tsBufferModel;
  DataPTSControl?: M2tsDataPtsControl;
  DvbNitSettings?: DvbNitSettings;
  DvbSdtSettings?: DvbSdtSettings;
  DvbSubPids?: number[];
  DvbTdtSettings?: DvbTdtSettings;
  DvbTeletextPid?: number;
  EbpAudioInterval?: M2tsEbpAudioInterval;
  EbpPlacement?: M2tsEbpPlacement;
  EsRateInPes?: M2tsEsRateInPes;
  ForceTsVideoEbpOrder?: M2tsForceTsVideoEbpOrder;
  FragmentTime?: number;
  KlvMetadata?: M2tsKlvMetadata;
  MaxPcrInterval?: number;
  MinEbpInterval?: number;
  NielsenId3?: M2tsNielsenId3;
  NullPacketBitrate?: number;
  PatInterval?: number;
  PcrControl?: M2tsPcrControl;
  PcrPid?: number;
  PmtInterval?: number;
  PmtPid?: number;
  PreventBufferUnderflow?: M2tsPreventBufferUnderflow;
  PrivateMetadataPid?: number;
  ProgramNumber?: number;
  PtsOffset?: number;
  PtsOffsetMode?: TsPtsOffset;
  RateMode?: M2tsRateMode;
  Scte35Esam?: M2tsScte35Esam;
  Scte35Pid?: number;
  Scte35Source?: M2tsScte35Source;
  SegmentationMarkers?: M2tsSegmentationMarkers;
  SegmentationStyle?: M2tsSegmentationStyle;
  SegmentationTime?: number;
  TimedMetadataPid?: number;
  TransportStreamId?: number;
  VideoPid?: number;
}
export type M3u8AudioDuration =
  | "DEFAULT_CODEC_DURATION"
  | "MATCH_VIDEO_DURATION"
  | (string & {});
export type M3u8DataPtsControl = "AUTO" | "ALIGN_TO_VIDEO" | (string & {});
export type M3u8NielsenId3 = "INSERT" | "NONE" | (string & {});
export type M3u8PcrControl =
  | "PCR_EVERY_PES_PACKET"
  | "CONFIGURED_PCR_PERIOD"
  | (string & {});
export type M3u8Scte35Source = "PASSTHROUGH" | "NONE" | (string & {});
export type TimedMetadata = "PASSTHROUGH" | "NONE" | (string & {});
export interface M3u8Settings {
  AudioDuration?: M3u8AudioDuration;
  AudioFramesPerPes?: number;
  AudioPids?: number[];
  AudioPtsOffsetDelta?: number;
  DataPTSControl?: M3u8DataPtsControl;
  MaxPcrInterval?: number;
  NielsenId3?: M3u8NielsenId3;
  PatInterval?: number;
  PcrControl?: M3u8PcrControl;
  PcrPid?: number;
  PmtInterval?: number;
  PmtPid?: number;
  PrivateMetadataPid?: number;
  ProgramNumber?: number;
  PtsOffset?: number;
  PtsOffsetMode?: TsPtsOffset;
  Scte35Pid?: number;
  Scte35Source?: M3u8Scte35Source;
  TimedMetadata?: TimedMetadata;
  TimedMetadataPid?: number;
  TransportStreamId?: number;
  VideoPid?: number;
}
export type MovClapAtom = "INCLUDE" | "EXCLUDE" | (string & {});
export type MovCslgAtom = "INCLUDE" | "EXCLUDE" | (string & {});
export type MovMpeg2FourCCControl = "XDCAM" | "MPEG" | (string & {});
export type MovPaddingControl = "OMNEON" | "NONE" | (string & {});
export type MovReference = "SELF_CONTAINED" | "EXTERNAL" | (string & {});
export interface MovSettings {
  AudioDuration?: CmfcAudioDuration;
  ClapAtom?: MovClapAtom;
  CslgAtom?: MovCslgAtom;
  Mpeg2FourCCControl?: MovMpeg2FourCCControl;
  PaddingControl?: MovPaddingControl;
  Reference?: MovReference;
}
export type Mp4C2paManifest = "INCLUDE" | "EXCLUDE" | (string & {});
export type Mp4CslgAtom = "INCLUDE" | "EXCLUDE" | (string & {});
export type __integerMin0Max1 = number;
export type Mp4FreeSpaceBox = "INCLUDE" | "EXCLUDE" | (string & {});
export type Mp4MoovPlacement =
  | "PROGRESSIVE_DOWNLOAD"
  | "NORMAL"
  | (string & {});
export interface Mp4Settings {
  AudioDuration?: CmfcAudioDuration;
  C2paManifest?: Mp4C2paManifest;
  CertificateSecret?: string;
  CslgAtom?: Mp4CslgAtom;
  CttsVersion?: number;
  FreeSpaceBox?: Mp4FreeSpaceBox;
  MoovPlacement?: Mp4MoovPlacement;
  Mp4MajorBrand?: string;
  SigningKmsKey?: string;
}
export type MpdAccessibilityCaptionHints =
  | "INCLUDE"
  | "EXCLUDE"
  | (string & {});
export type MpdAudioDuration =
  | "DEFAULT_CODEC_DURATION"
  | "MATCH_VIDEO_DURATION"
  | (string & {});
export type MpdC2paManifest = "INCLUDE" | "EXCLUDE" | (string & {});
export type MpdCaptionContainerType = "RAW" | "FRAGMENTED_MP4" | (string & {});
export type MpdKlvMetadata = "NONE" | "PASSTHROUGH" | (string & {});
export type MpdManifestMetadataSignaling =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export type MpdScte35Esam = "INSERT" | "NONE" | (string & {});
export type MpdScte35Source = "PASSTHROUGH" | "NONE" | (string & {});
export type MpdTimedMetadata = "PASSTHROUGH" | "NONE" | (string & {});
export type MpdTimedMetadataBoxVersion =
  | "VERSION_0"
  | "VERSION_1"
  | (string & {});
export interface MpdSettings {
  AccessibilityCaptionHints?: MpdAccessibilityCaptionHints;
  AudioDuration?: MpdAudioDuration;
  C2paManifest?: MpdC2paManifest;
  CaptionContainerType?: MpdCaptionContainerType;
  CertificateSecret?: string;
  KlvMetadata?: MpdKlvMetadata;
  ManifestMetadataSignaling?: MpdManifestMetadataSignaling;
  Scte35Esam?: MpdScte35Esam;
  Scte35Source?: MpdScte35Source;
  SigningKmsKey?: string;
  TimedMetadata?: MpdTimedMetadata;
  TimedMetadataBoxVersion?: MpdTimedMetadataBoxVersion;
  TimedMetadataSchemeIdUri?: string;
  TimedMetadataValue?: string;
}
export type MxfAfdSignaling = "NO_COPY" | "COPY_FROM_VIDEO" | (string & {});
export type MxfProfile =
  | "D_10"
  | "XDCAM"
  | "OP1A"
  | "XAVC"
  | "XDCAM_RDD9"
  | (string & {});
export type MxfUncompressedAudioWrapping = "AUTO" | "AES3" | (string & {});
export type MxfXavcDurationMode =
  | "ALLOW_ANY_DURATION"
  | "DROP_FRAMES_FOR_COMPLIANCE"
  | (string & {});
export interface MxfXavcProfileSettings {
  DurationMode?: MxfXavcDurationMode;
  MaxAncDataSize?: number;
}
export interface MxfSettings {
  AfdSignaling?: MxfAfdSignaling;
  Profile?: MxfProfile;
  UncompressedAudioWrapping?: MxfUncompressedAudioWrapping;
  XavcProfileSettings?: MxfXavcProfileSettings;
}
export interface ContainerSettings {
  CmfcSettings?: CmfcSettings;
  Container?: ContainerType;
  F4vSettings?: F4vSettings;
  M2tsSettings?: M2tsSettings;
  M3u8Settings?: M3u8Settings;
  MovSettings?: MovSettings;
  Mp4Settings?: Mp4Settings;
  MpdSettings?: MpdSettings;
  MxfSettings?: MxfSettings;
}
export type __stringMax256 = string;
export type HlsAudioOnlyContainer = "AUTOMATIC" | "M2TS" | (string & {});
export type HlsAudioTrackType =
  | "ALTERNATE_AUDIO_AUTO_SELECT_DEFAULT"
  | "ALTERNATE_AUDIO_AUTO_SELECT"
  | "ALTERNATE_AUDIO_NOT_AUTO_SELECT"
  | "AUDIO_ONLY_VARIANT_STREAM"
  | (string & {});
export type HlsDescriptiveVideoServiceFlag =
  | "DONT_FLAG"
  | "FLAG"
  | (string & {});
export type HlsIFrameOnlyManifest =
  | "INCLUDE"
  | "INCLUDE_AS_TS"
  | "EXCLUDE"
  | (string & {});
export interface HlsSettings {
  AudioGroupId?: string;
  AudioOnlyContainer?: HlsAudioOnlyContainer;
  AudioRenditionSets?: string;
  AudioTrackType?: HlsAudioTrackType;
  DescriptiveVideoServiceFlag?: HlsDescriptiveVideoServiceFlag;
  IFrameOnlyManifest?: HlsIFrameOnlyManifest;
  SegmentModifier?: string;
}
export interface OutputSettings {
  HlsSettings?: HlsSettings;
}
export type __stringMin0 = string;
export type AfdSignaling = "NONE" | "AUTO" | "FIXED" | (string & {});
export type AntiAlias = "DISABLED" | "ENABLED" | (string & {});
export type ChromaPositionMode =
  | "AUTO"
  | "FORCE_CENTER"
  | "FORCE_TOP_LEFT"
  | (string & {});
export type Av1AdaptiveQuantization =
  | "OFF"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "HIGHER"
  | "MAX"
  | (string & {});
export type Av1BitDepth = "BIT_8" | "BIT_10" | (string & {});
export type Av1FilmGrainSynthesis = "DISABLED" | "ENABLED" | (string & {});
export type Av1FramerateControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export type Av1FramerateConversionAlgorithm =
  | "DUPLICATE_DROP"
  | "INTERPOLATE"
  | "FRAMEFORMER"
  | "MAINTAIN_FRAME_COUNT"
  | (string & {});
export type __integerMin1000Max1152000000 = number;
export type __integerMin0Max15 = number;
export type __integerMin1Max10 = number;
export type __doubleMin0Max1 = number;
export interface Av1QvbrSettings {
  QvbrQualityLevel?: number;
  QvbrQualityLevelFineTune?: number;
}
export type Av1RateControlMode = "QVBR" | (string & {});
export type Av1SpatialAdaptiveQuantization =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export interface Av1Settings {
  AdaptiveQuantization?: Av1AdaptiveQuantization;
  BitDepth?: Av1BitDepth;
  FilmGrainSynthesis?: Av1FilmGrainSynthesis;
  FramerateControl?: Av1FramerateControl;
  FramerateConversionAlgorithm?: Av1FramerateConversionAlgorithm;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  GopSize?: number;
  MaxBitrate?: number;
  NumberBFramesBetweenReferenceFrames?: number;
  PerFrameMetrics?: FrameMetricType[];
  QvbrSettings?: Av1QvbrSettings;
  RateControlMode?: Av1RateControlMode;
  Slices?: number;
  SpatialAdaptiveQuantization?: Av1SpatialAdaptiveQuantization;
}
export type AvcIntraClass =
  | "CLASS_50"
  | "CLASS_100"
  | "CLASS_200"
  | "CLASS_4K_2K"
  | (string & {});
export type AvcIntraUhdQualityTuningLevel =
  | "SINGLE_PASS"
  | "MULTI_PASS"
  | (string & {});
export interface AvcIntraUhdSettings {
  QualityTuningLevel?: AvcIntraUhdQualityTuningLevel;
}
export type AvcIntraFramerateControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export type AvcIntraFramerateConversionAlgorithm =
  | "DUPLICATE_DROP"
  | "INTERPOLATE"
  | "FRAMEFORMER"
  | "MAINTAIN_FRAME_COUNT"
  | (string & {});
export type __integerMin24Max60000 = number;
export type AvcIntraInterlaceMode =
  | "PROGRESSIVE"
  | "TOP_FIELD"
  | "BOTTOM_FIELD"
  | "FOLLOW_TOP_FIELD"
  | "FOLLOW_BOTTOM_FIELD"
  | (string & {});
export type AvcIntraScanTypeConversionMode =
  | "INTERLACED"
  | "INTERLACED_OPTIMIZE"
  | (string & {});
export type AvcIntraSlowPal = "DISABLED" | "ENABLED" | (string & {});
export type AvcIntraTelecine = "NONE" | "HARD" | (string & {});
export interface AvcIntraSettings {
  AvcIntraClass?: AvcIntraClass;
  AvcIntraUhdSettings?: AvcIntraUhdSettings;
  FramerateControl?: AvcIntraFramerateControl;
  FramerateConversionAlgorithm?: AvcIntraFramerateConversionAlgorithm;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  InterlaceMode?: AvcIntraInterlaceMode;
  PerFrameMetrics?: FrameMetricType[];
  ScanTypeConversionMode?: AvcIntraScanTypeConversionMode;
  SlowPal?: AvcIntraSlowPal;
  Telecine?: AvcIntraTelecine;
}
export type VideoCodec =
  | "AV1"
  | "AVC_INTRA"
  | "FRAME_CAPTURE"
  | "GIF"
  | "H_264"
  | "H_265"
  | "MPEG2"
  | "PASSTHROUGH"
  | "PRORES"
  | "UNCOMPRESSED"
  | "VC3"
  | "VP8"
  | "VP9"
  | "XAVC"
  | (string & {});
export type __integerMin1Max10000000 = number;
export type __integerMin1Max100 = number;
export interface FrameCaptureSettings {
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  MaxCaptures?: number;
  Quality?: number;
}
export type GifFramerateControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export type GifFramerateConversionAlgorithm =
  | "DUPLICATE_DROP"
  | "INTERPOLATE"
  | (string & {});
export interface GifSettings {
  FramerateControl?: GifFramerateControl;
  FramerateConversionAlgorithm?: GifFramerateConversionAlgorithm;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
}
export type H264AdaptiveQuantization =
  | "OFF"
  | "AUTO"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "HIGHER"
  | "MAX"
  | (string & {});
export type BandwidthReductionFilterSharpening =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "OFF"
  | (string & {});
export type BandwidthReductionFilterStrength =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "AUTO"
  | "OFF"
  | (string & {});
export interface BandwidthReductionFilter {
  Sharpening?: BandwidthReductionFilterSharpening;
  Strength?: BandwidthReductionFilterStrength;
}
export type H264CodecLevel =
  | "AUTO"
  | "LEVEL_1"
  | "LEVEL_1_1"
  | "LEVEL_1_2"
  | "LEVEL_1_3"
  | "LEVEL_2"
  | "LEVEL_2_1"
  | "LEVEL_2_2"
  | "LEVEL_3"
  | "LEVEL_3_1"
  | "LEVEL_3_2"
  | "LEVEL_4"
  | "LEVEL_4_1"
  | "LEVEL_4_2"
  | "LEVEL_5"
  | "LEVEL_5_1"
  | "LEVEL_5_2"
  | (string & {});
export type H264CodecProfile =
  | "BASELINE"
  | "HIGH"
  | "HIGH_10BIT"
  | "HIGH_422"
  | "HIGH_422_10BIT"
  | "MAIN"
  | (string & {});
export type H264DynamicSubGop = "ADAPTIVE" | "STATIC" | (string & {});
export type H264EndOfStreamMarkers = "INCLUDE" | "SUPPRESS" | (string & {});
export type H264EntropyEncoding = "CABAC" | "CAVLC" | (string & {});
export type H264ExplicitWeightedPrediction =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export type H264FieldEncoding =
  | "PAFF"
  | "FORCE_FIELD"
  | "MBAFF"
  | (string & {});
export type H264FlickerAdaptiveQuantization =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export type H264FramerateControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export type H264FramerateConversionAlgorithm =
  | "DUPLICATE_DROP"
  | "INTERPOLATE"
  | "FRAMEFORMER"
  | "MAINTAIN_FRAME_COUNT"
  | (string & {});
export type H264GopBReference = "DISABLED" | "ENABLED" | (string & {});
export type H264GopSizeUnits = "FRAMES" | "SECONDS" | "AUTO" | (string & {});
export type __integerMin0Max1152000000 = number;
export type H264InterlaceMode =
  | "PROGRESSIVE"
  | "TOP_FIELD"
  | "BOTTOM_FIELD"
  | "FOLLOW_TOP_FIELD"
  | "FOLLOW_BOTTOM_FIELD"
  | (string & {});
export type __integerMin0Max30 = number;
export type __integerMin0Max7 = number;
export type H264ParControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export type H264QualityTuningLevel =
  | "SINGLE_PASS"
  | "SINGLE_PASS_HQ"
  | "MULTI_PASS_HQ"
  | (string & {});
export interface H264QvbrSettings {
  MaxAverageBitrate?: number;
  QvbrQualityLevel?: number;
  QvbrQualityLevelFineTune?: number;
}
export type H264RateControlMode = "VBR" | "CBR" | "QVBR" | (string & {});
export type H264RepeatPps = "DISABLED" | "ENABLED" | (string & {});
export type H264SaliencyAwareEncoding =
  | "DISABLED"
  | "PREFERRED"
  | (string & {});
export type H264ScanTypeConversionMode =
  | "INTERLACED"
  | "INTERLACED_OPTIMIZE"
  | (string & {});
export type H264SceneChangeDetect =
  | "DISABLED"
  | "ENABLED"
  | "TRANSITION_DETECTION"
  | (string & {});
export type H264SlowPal = "DISABLED" | "ENABLED" | (string & {});
export type __integerMin0Max128 = number;
export type H264SpatialAdaptiveQuantization =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export type H264Syntax = "DEFAULT" | "RP2027" | (string & {});
export type H264Telecine = "NONE" | "SOFT" | "HARD" | (string & {});
export type H264TemporalAdaptiveQuantization =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export type H264UnregisteredSeiTimecode =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export type H264WriteMp4PackagingType = "AVC1" | "AVC3" | (string & {});
export interface H264Settings {
  AdaptiveQuantization?: H264AdaptiveQuantization;
  BandwidthReductionFilter?: BandwidthReductionFilter;
  Bitrate?: number;
  CodecLevel?: H264CodecLevel;
  CodecProfile?: H264CodecProfile;
  DynamicSubGop?: H264DynamicSubGop;
  EndOfStreamMarkers?: H264EndOfStreamMarkers;
  EntropyEncoding?: H264EntropyEncoding;
  ExplicitWeightedPrediction?: H264ExplicitWeightedPrediction;
  FieldEncoding?: H264FieldEncoding;
  FlickerAdaptiveQuantization?: H264FlickerAdaptiveQuantization;
  FramerateControl?: H264FramerateControl;
  FramerateConversionAlgorithm?: H264FramerateConversionAlgorithm;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  GopBReference?: H264GopBReference;
  GopClosedCadence?: number;
  GopSize?: number;
  GopSizeUnits?: H264GopSizeUnits;
  HrdBufferFinalFillPercentage?: number;
  HrdBufferInitialFillPercentage?: number;
  HrdBufferSize?: number;
  InterlaceMode?: H264InterlaceMode;
  MaxBitrate?: number;
  MinIInterval?: number;
  NumberBFramesBetweenReferenceFrames?: number;
  NumberReferenceFrames?: number;
  ParControl?: H264ParControl;
  ParDenominator?: number;
  ParNumerator?: number;
  PerFrameMetrics?: FrameMetricType[];
  QualityTuningLevel?: H264QualityTuningLevel;
  QvbrSettings?: H264QvbrSettings;
  RateControlMode?: H264RateControlMode;
  RepeatPps?: H264RepeatPps;
  SaliencyAwareEncoding?: H264SaliencyAwareEncoding;
  ScanTypeConversionMode?: H264ScanTypeConversionMode;
  SceneChangeDetect?: H264SceneChangeDetect;
  Slices?: number;
  SlowPal?: H264SlowPal;
  Softness?: number;
  SpatialAdaptiveQuantization?: H264SpatialAdaptiveQuantization;
  Syntax?: H264Syntax;
  Telecine?: H264Telecine;
  TemporalAdaptiveQuantization?: H264TemporalAdaptiveQuantization;
  UnregisteredSeiTimecode?: H264UnregisteredSeiTimecode;
  WriteMp4PackagingType?: H264WriteMp4PackagingType;
}
export type H265AdaptiveQuantization =
  | "OFF"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "HIGHER"
  | "MAX"
  | "AUTO"
  | (string & {});
export type H265AlternateTransferFunctionSei =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export type __integerMin1000Max1466400000 = number;
export type H265CodecLevel =
  | "AUTO"
  | "LEVEL_1"
  | "LEVEL_2"
  | "LEVEL_2_1"
  | "LEVEL_3"
  | "LEVEL_3_1"
  | "LEVEL_4"
  | "LEVEL_4_1"
  | "LEVEL_5"
  | "LEVEL_5_1"
  | "LEVEL_5_2"
  | "LEVEL_6"
  | "LEVEL_6_1"
  | "LEVEL_6_2"
  | (string & {});
export type H265CodecProfile =
  | "MAIN_MAIN"
  | "MAIN_HIGH"
  | "MAIN10_MAIN"
  | "MAIN10_HIGH"
  | "MAIN_422_8BIT_MAIN"
  | "MAIN_422_8BIT_HIGH"
  | "MAIN_422_10BIT_MAIN"
  | "MAIN_422_10BIT_HIGH"
  | (string & {});
export type H265Deblocking = "ENABLED" | "DISABLED" | (string & {});
export type H265DynamicSubGop = "ADAPTIVE" | "STATIC" | (string & {});
export type H265EndOfStreamMarkers = "INCLUDE" | "SUPPRESS" | (string & {});
export type H265FlickerAdaptiveQuantization =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export type H265FramerateControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export type H265FramerateConversionAlgorithm =
  | "DUPLICATE_DROP"
  | "INTERPOLATE"
  | "FRAMEFORMER"
  | "MAINTAIN_FRAME_COUNT"
  | (string & {});
export type H265GopBReference = "DISABLED" | "ENABLED" | (string & {});
export type H265GopSizeUnits = "FRAMES" | "SECONDS" | "AUTO" | (string & {});
export type __integerMin0Max1466400000 = number;
export type H265InterlaceMode =
  | "PROGRESSIVE"
  | "TOP_FIELD"
  | "BOTTOM_FIELD"
  | "FOLLOW_TOP_FIELD"
  | "FOLLOW_BOTTOM_FIELD"
  | (string & {});
export type H265MvOverPictureBoundaries =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export type H265MvTemporalPredictor = "ENABLED" | "DISABLED" | (string & {});
export type H265ParControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export type H265QualityTuningLevel =
  | "SINGLE_PASS"
  | "SINGLE_PASS_HQ"
  | "MULTI_PASS_HQ"
  | (string & {});
export interface H265QvbrSettings {
  MaxAverageBitrate?: number;
  QvbrQualityLevel?: number;
  QvbrQualityLevelFineTune?: number;
}
export type H265RateControlMode = "VBR" | "CBR" | "QVBR" | (string & {});
export type H265SampleAdaptiveOffsetFilterMode =
  | "DEFAULT"
  | "ADAPTIVE"
  | "OFF"
  | (string & {});
export type H265ScanTypeConversionMode =
  | "INTERLACED"
  | "INTERLACED_OPTIMIZE"
  | (string & {});
export type H265SceneChangeDetect =
  | "DISABLED"
  | "ENABLED"
  | "TRANSITION_DETECTION"
  | (string & {});
export type H265SlowPal = "DISABLED" | "ENABLED" | (string & {});
export type H265SpatialAdaptiveQuantization =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export type H265Telecine = "NONE" | "SOFT" | "HARD" | (string & {});
export type H265TemporalAdaptiveQuantization =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export type H265TemporalIds = "DISABLED" | "ENABLED" | (string & {});
export type __integerMin64Max2160 = number;
export type H265TilePadding = "NONE" | "PADDED" | (string & {});
export type __integerMin256Max3840 = number;
export type H265Tiles = "DISABLED" | "ENABLED" | (string & {});
export type H265TreeBlockSize = "AUTO" | "TREE_SIZE_32X32" | (string & {});
export type H265UnregisteredSeiTimecode =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export type H265WriteMp4PackagingType = "HVC1" | "HEV1" | (string & {});
export interface H265Settings {
  AdaptiveQuantization?: H265AdaptiveQuantization;
  AlternateTransferFunctionSei?: H265AlternateTransferFunctionSei;
  BandwidthReductionFilter?: BandwidthReductionFilter;
  Bitrate?: number;
  CodecLevel?: H265CodecLevel;
  CodecProfile?: H265CodecProfile;
  Deblocking?: H265Deblocking;
  DynamicSubGop?: H265DynamicSubGop;
  EndOfStreamMarkers?: H265EndOfStreamMarkers;
  FlickerAdaptiveQuantization?: H265FlickerAdaptiveQuantization;
  FramerateControl?: H265FramerateControl;
  FramerateConversionAlgorithm?: H265FramerateConversionAlgorithm;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  GopBReference?: H265GopBReference;
  GopClosedCadence?: number;
  GopSize?: number;
  GopSizeUnits?: H265GopSizeUnits;
  HrdBufferFinalFillPercentage?: number;
  HrdBufferInitialFillPercentage?: number;
  HrdBufferSize?: number;
  InterlaceMode?: H265InterlaceMode;
  MaxBitrate?: number;
  MinIInterval?: number;
  MvOverPictureBoundaries?: H265MvOverPictureBoundaries;
  MvTemporalPredictor?: H265MvTemporalPredictor;
  NumberBFramesBetweenReferenceFrames?: number;
  NumberReferenceFrames?: number;
  ParControl?: H265ParControl;
  ParDenominator?: number;
  ParNumerator?: number;
  PerFrameMetrics?: FrameMetricType[];
  QualityTuningLevel?: H265QualityTuningLevel;
  QvbrSettings?: H265QvbrSettings;
  RateControlMode?: H265RateControlMode;
  SampleAdaptiveOffsetFilterMode?: H265SampleAdaptiveOffsetFilterMode;
  ScanTypeConversionMode?: H265ScanTypeConversionMode;
  SceneChangeDetect?: H265SceneChangeDetect;
  Slices?: number;
  SlowPal?: H265SlowPal;
  SpatialAdaptiveQuantization?: H265SpatialAdaptiveQuantization;
  Telecine?: H265Telecine;
  TemporalAdaptiveQuantization?: H265TemporalAdaptiveQuantization;
  TemporalIds?: H265TemporalIds;
  TileHeight?: number;
  TilePadding?: H265TilePadding;
  TileWidth?: number;
  Tiles?: H265Tiles;
  TreeBlockSize?: H265TreeBlockSize;
  UnregisteredSeiTimecode?: H265UnregisteredSeiTimecode;
  WriteMp4PackagingType?: H265WriteMp4PackagingType;
}
export type Mpeg2AdaptiveQuantization =
  | "OFF"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | (string & {});
export type __integerMin1000Max288000000 = number;
export type Mpeg2CodecLevel =
  | "AUTO"
  | "LOW"
  | "MAIN"
  | "HIGH1440"
  | "HIGH"
  | (string & {});
export type Mpeg2CodecProfile = "MAIN" | "PROFILE_422" | (string & {});
export type Mpeg2DynamicSubGop = "ADAPTIVE" | "STATIC" | (string & {});
export type Mpeg2FramerateControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export type Mpeg2FramerateConversionAlgorithm =
  | "DUPLICATE_DROP"
  | "INTERPOLATE"
  | "FRAMEFORMER"
  | "MAINTAIN_FRAME_COUNT"
  | (string & {});
export type Mpeg2GopSizeUnits = "FRAMES" | "SECONDS" | (string & {});
export type __integerMin0Max47185920 = number;
export type Mpeg2InterlaceMode =
  | "PROGRESSIVE"
  | "TOP_FIELD"
  | "BOTTOM_FIELD"
  | "FOLLOW_TOP_FIELD"
  | "FOLLOW_BOTTOM_FIELD"
  | (string & {});
export type Mpeg2IntraDcPrecision =
  | "AUTO"
  | "INTRA_DC_PRECISION_8"
  | "INTRA_DC_PRECISION_9"
  | "INTRA_DC_PRECISION_10"
  | "INTRA_DC_PRECISION_11"
  | (string & {});
export type __integerMin1000Max300000000 = number;
export type Mpeg2ParControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export type Mpeg2QualityTuningLevel =
  | "SINGLE_PASS"
  | "MULTI_PASS"
  | (string & {});
export type Mpeg2RateControlMode = "VBR" | "CBR" | (string & {});
export type Mpeg2ScanTypeConversionMode =
  | "INTERLACED"
  | "INTERLACED_OPTIMIZE"
  | (string & {});
export type Mpeg2SceneChangeDetect = "DISABLED" | "ENABLED" | (string & {});
export type Mpeg2SlowPal = "DISABLED" | "ENABLED" | (string & {});
export type Mpeg2SpatialAdaptiveQuantization =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export type Mpeg2Syntax = "DEFAULT" | "D_10" | (string & {});
export type Mpeg2Telecine = "NONE" | "SOFT" | "HARD" | (string & {});
export type Mpeg2TemporalAdaptiveQuantization =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export interface Mpeg2Settings {
  AdaptiveQuantization?: Mpeg2AdaptiveQuantization;
  Bitrate?: number;
  CodecLevel?: Mpeg2CodecLevel;
  CodecProfile?: Mpeg2CodecProfile;
  DynamicSubGop?: Mpeg2DynamicSubGop;
  FramerateControl?: Mpeg2FramerateControl;
  FramerateConversionAlgorithm?: Mpeg2FramerateConversionAlgorithm;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  GopClosedCadence?: number;
  GopSize?: number;
  GopSizeUnits?: Mpeg2GopSizeUnits;
  HrdBufferFinalFillPercentage?: number;
  HrdBufferInitialFillPercentage?: number;
  HrdBufferSize?: number;
  InterlaceMode?: Mpeg2InterlaceMode;
  IntraDcPrecision?: Mpeg2IntraDcPrecision;
  MaxBitrate?: number;
  MinIInterval?: number;
  NumberBFramesBetweenReferenceFrames?: number;
  ParControl?: Mpeg2ParControl;
  ParDenominator?: number;
  ParNumerator?: number;
  PerFrameMetrics?: FrameMetricType[];
  QualityTuningLevel?: Mpeg2QualityTuningLevel;
  RateControlMode?: Mpeg2RateControlMode;
  ScanTypeConversionMode?: Mpeg2ScanTypeConversionMode;
  SceneChangeDetect?: Mpeg2SceneChangeDetect;
  SlowPal?: Mpeg2SlowPal;
  Softness?: number;
  SpatialAdaptiveQuantization?: Mpeg2SpatialAdaptiveQuantization;
  Syntax?: Mpeg2Syntax;
  Telecine?: Mpeg2Telecine;
  TemporalAdaptiveQuantization?: Mpeg2TemporalAdaptiveQuantization;
}
export type FrameControl =
  | "NEAREST_IDRFRAME"
  | "NEAREST_IFRAME"
  | (string & {});
export type VideoSelectorMode = "AUTO" | "REMUX_ALL" | (string & {});
export interface PassthroughSettings {
  FrameControl?: FrameControl;
  VideoSelectorMode?: VideoSelectorMode;
}
export type ProresChromaSampling =
  | "PRESERVE_444_SAMPLING"
  | "SUBSAMPLE_TO_422"
  | (string & {});
export type ProresCodecProfile =
  | "APPLE_PRORES_422"
  | "APPLE_PRORES_422_HQ"
  | "APPLE_PRORES_422_LT"
  | "APPLE_PRORES_422_PROXY"
  | "APPLE_PRORES_4444"
  | "APPLE_PRORES_4444_XQ"
  | (string & {});
export type ProresFramerateControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export type ProresFramerateConversionAlgorithm =
  | "DUPLICATE_DROP"
  | "INTERPOLATE"
  | "FRAMEFORMER"
  | "MAINTAIN_FRAME_COUNT"
  | (string & {});
export type ProresInterlaceMode =
  | "PROGRESSIVE"
  | "TOP_FIELD"
  | "BOTTOM_FIELD"
  | "FOLLOW_TOP_FIELD"
  | "FOLLOW_BOTTOM_FIELD"
  | (string & {});
export type ProresParControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export type ProresScanTypeConversionMode =
  | "INTERLACED"
  | "INTERLACED_OPTIMIZE"
  | (string & {});
export type ProresSlowPal = "DISABLED" | "ENABLED" | (string & {});
export type ProresTelecine = "NONE" | "HARD" | (string & {});
export interface ProresSettings {
  ChromaSampling?: ProresChromaSampling;
  CodecProfile?: ProresCodecProfile;
  FramerateControl?: ProresFramerateControl;
  FramerateConversionAlgorithm?: ProresFramerateConversionAlgorithm;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  InterlaceMode?: ProresInterlaceMode;
  ParControl?: ProresParControl;
  ParDenominator?: number;
  ParNumerator?: number;
  PerFrameMetrics?: FrameMetricType[];
  ScanTypeConversionMode?: ProresScanTypeConversionMode;
  SlowPal?: ProresSlowPal;
  Telecine?: ProresTelecine;
}
export type UncompressedFourcc = "I420" | "I422" | "I444" | (string & {});
export type UncompressedFramerateControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export type UncompressedFramerateConversionAlgorithm =
  | "DUPLICATE_DROP"
  | "INTERPOLATE"
  | "FRAMEFORMER"
  | "MAINTAIN_FRAME_COUNT"
  | (string & {});
export type UncompressedInterlaceMode =
  | "INTERLACED"
  | "PROGRESSIVE"
  | (string & {});
export type UncompressedScanTypeConversionMode =
  | "INTERLACED"
  | "INTERLACED_OPTIMIZE"
  | (string & {});
export type UncompressedSlowPal = "DISABLED" | "ENABLED" | (string & {});
export type UncompressedTelecine = "NONE" | "HARD" | (string & {});
export interface UncompressedSettings {
  Fourcc?: UncompressedFourcc;
  FramerateControl?: UncompressedFramerateControl;
  FramerateConversionAlgorithm?: UncompressedFramerateConversionAlgorithm;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  InterlaceMode?: UncompressedInterlaceMode;
  ScanTypeConversionMode?: UncompressedScanTypeConversionMode;
  SlowPal?: UncompressedSlowPal;
  Telecine?: UncompressedTelecine;
}
export type Vc3FramerateControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export type Vc3FramerateConversionAlgorithm =
  | "DUPLICATE_DROP"
  | "INTERPOLATE"
  | "FRAMEFORMER"
  | "MAINTAIN_FRAME_COUNT"
  | (string & {});
export type Vc3InterlaceMode = "INTERLACED" | "PROGRESSIVE" | (string & {});
export type Vc3ScanTypeConversionMode =
  | "INTERLACED"
  | "INTERLACED_OPTIMIZE"
  | (string & {});
export type Vc3SlowPal = "DISABLED" | "ENABLED" | (string & {});
export type Vc3Telecine = "NONE" | "HARD" | (string & {});
export type Vc3Class =
  | "CLASS_145_8BIT"
  | "CLASS_220_8BIT"
  | "CLASS_220_10BIT"
  | (string & {});
export interface Vc3Settings {
  FramerateControl?: Vc3FramerateControl;
  FramerateConversionAlgorithm?: Vc3FramerateConversionAlgorithm;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  InterlaceMode?: Vc3InterlaceMode;
  ScanTypeConversionMode?: Vc3ScanTypeConversionMode;
  SlowPal?: Vc3SlowPal;
  Telecine?: Vc3Telecine;
  Vc3Class?: Vc3Class;
}
export type Vp8FramerateControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export type Vp8FramerateConversionAlgorithm =
  | "DUPLICATE_DROP"
  | "INTERPOLATE"
  | "FRAMEFORMER"
  | "MAINTAIN_FRAME_COUNT"
  | (string & {});
export type Vp8ParControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export type Vp8QualityTuningLevel =
  | "MULTI_PASS"
  | "MULTI_PASS_HQ"
  | (string & {});
export type Vp8RateControlMode = "VBR" | (string & {});
export interface Vp8Settings {
  Bitrate?: number;
  FramerateControl?: Vp8FramerateControl;
  FramerateConversionAlgorithm?: Vp8FramerateConversionAlgorithm;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  GopSize?: number;
  HrdBufferSize?: number;
  MaxBitrate?: number;
  ParControl?: Vp8ParControl;
  ParDenominator?: number;
  ParNumerator?: number;
  QualityTuningLevel?: Vp8QualityTuningLevel;
  RateControlMode?: Vp8RateControlMode;
}
export type __integerMin1000Max480000000 = number;
export type Vp9FramerateControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export type Vp9FramerateConversionAlgorithm =
  | "DUPLICATE_DROP"
  | "INTERPOLATE"
  | "FRAMEFORMER"
  | "MAINTAIN_FRAME_COUNT"
  | (string & {});
export type Vp9ParControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export type Vp9QualityTuningLevel =
  | "MULTI_PASS"
  | "MULTI_PASS_HQ"
  | (string & {});
export type Vp9RateControlMode = "VBR" | (string & {});
export interface Vp9Settings {
  Bitrate?: number;
  FramerateControl?: Vp9FramerateControl;
  FramerateConversionAlgorithm?: Vp9FramerateConversionAlgorithm;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  GopSize?: number;
  HrdBufferSize?: number;
  MaxBitrate?: number;
  ParControl?: Vp9ParControl;
  ParDenominator?: number;
  ParNumerator?: number;
  QualityTuningLevel?: Vp9QualityTuningLevel;
  RateControlMode?: Vp9RateControlMode;
}
export type XavcAdaptiveQuantization =
  | "OFF"
  | "AUTO"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "HIGHER"
  | "MAX"
  | (string & {});
export type XavcEntropyEncoding = "AUTO" | "CABAC" | "CAVLC" | (string & {});
export type XavcFramerateControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export type XavcFramerateConversionAlgorithm =
  | "DUPLICATE_DROP"
  | "INTERPOLATE"
  | "FRAMEFORMER"
  | "MAINTAIN_FRAME_COUNT"
  | (string & {});
export type XavcProfile =
  | "XAVC_HD_INTRA_CBG"
  | "XAVC_4K_INTRA_CBG"
  | "XAVC_4K_INTRA_VBR"
  | "XAVC_HD"
  | "XAVC_4K"
  | (string & {});
export type XavcSlowPal = "DISABLED" | "ENABLED" | (string & {});
export type XavcSpatialAdaptiveQuantization =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export type XavcTemporalAdaptiveQuantization =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export type Xavc4kIntraCbgProfileClass =
  | "CLASS_100"
  | "CLASS_300"
  | "CLASS_480"
  | (string & {});
export interface Xavc4kIntraCbgProfileSettings {
  XavcClass?: Xavc4kIntraCbgProfileClass;
}
export type Xavc4kIntraVbrProfileClass =
  | "CLASS_100"
  | "CLASS_300"
  | "CLASS_480"
  | (string & {});
export interface Xavc4kIntraVbrProfileSettings {
  XavcClass?: Xavc4kIntraVbrProfileClass;
}
export type Xavc4kProfileBitrateClass =
  | "BITRATE_CLASS_100"
  | "BITRATE_CLASS_140"
  | "BITRATE_CLASS_200"
  | (string & {});
export type Xavc4kProfileCodecProfile = "HIGH" | "HIGH_422" | (string & {});
export type XavcFlickerAdaptiveQuantization =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export type XavcGopBReference = "DISABLED" | "ENABLED" | (string & {});
export type Xavc4kProfileQualityTuningLevel =
  | "SINGLE_PASS"
  | "SINGLE_PASS_HQ"
  | "MULTI_PASS_HQ"
  | (string & {});
export type __integerMin8Max12 = number;
export interface Xavc4kProfileSettings {
  BitrateClass?: Xavc4kProfileBitrateClass;
  CodecProfile?: Xavc4kProfileCodecProfile;
  FlickerAdaptiveQuantization?: XavcFlickerAdaptiveQuantization;
  GopBReference?: XavcGopBReference;
  GopClosedCadence?: number;
  HrdBufferSize?: number;
  QualityTuningLevel?: Xavc4kProfileQualityTuningLevel;
  Slices?: number;
}
export type XavcHdIntraCbgProfileClass =
  | "CLASS_50"
  | "CLASS_100"
  | "CLASS_200"
  | (string & {});
export interface XavcHdIntraCbgProfileSettings {
  XavcClass?: XavcHdIntraCbgProfileClass;
}
export type XavcHdProfileBitrateClass =
  | "BITRATE_CLASS_25"
  | "BITRATE_CLASS_35"
  | "BITRATE_CLASS_50"
  | (string & {});
export type XavcInterlaceMode =
  | "PROGRESSIVE"
  | "TOP_FIELD"
  | "BOTTOM_FIELD"
  | "FOLLOW_TOP_FIELD"
  | "FOLLOW_BOTTOM_FIELD"
  | (string & {});
export type XavcHdProfileQualityTuningLevel =
  | "SINGLE_PASS"
  | "SINGLE_PASS_HQ"
  | "MULTI_PASS_HQ"
  | (string & {});
export type __integerMin4Max12 = number;
export type XavcHdProfileTelecine = "NONE" | "HARD" | (string & {});
export interface XavcHdProfileSettings {
  BitrateClass?: XavcHdProfileBitrateClass;
  FlickerAdaptiveQuantization?: XavcFlickerAdaptiveQuantization;
  GopBReference?: XavcGopBReference;
  GopClosedCadence?: number;
  HrdBufferSize?: number;
  InterlaceMode?: XavcInterlaceMode;
  QualityTuningLevel?: XavcHdProfileQualityTuningLevel;
  Slices?: number;
  Telecine?: XavcHdProfileTelecine;
}
export interface XavcSettings {
  AdaptiveQuantization?: XavcAdaptiveQuantization;
  EntropyEncoding?: XavcEntropyEncoding;
  FramerateControl?: XavcFramerateControl;
  FramerateConversionAlgorithm?: XavcFramerateConversionAlgorithm;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  PerFrameMetrics?: FrameMetricType[];
  Profile?: XavcProfile;
  SlowPal?: XavcSlowPal;
  Softness?: number;
  SpatialAdaptiveQuantization?: XavcSpatialAdaptiveQuantization;
  TemporalAdaptiveQuantization?: XavcTemporalAdaptiveQuantization;
  Xavc4kIntraCbgProfileSettings?: Xavc4kIntraCbgProfileSettings;
  Xavc4kIntraVbrProfileSettings?: Xavc4kIntraVbrProfileSettings;
  Xavc4kProfileSettings?: Xavc4kProfileSettings;
  XavcHdIntraCbgProfileSettings?: XavcHdIntraCbgProfileSettings;
  XavcHdProfileSettings?: XavcHdProfileSettings;
}
export interface VideoCodecSettings {
  Av1Settings?: Av1Settings;
  AvcIntraSettings?: AvcIntraSettings;
  Codec?: VideoCodec;
  FrameCaptureSettings?: FrameCaptureSettings;
  GifSettings?: GifSettings;
  H264Settings?: H264Settings;
  H265Settings?: H265Settings;
  Mpeg2Settings?: Mpeg2Settings;
  PassthroughSettings?: PassthroughSettings;
  ProresSettings?: ProresSettings;
  UncompressedSettings?: UncompressedSettings;
  Vc3Settings?: Vc3Settings;
  Vp8Settings?: Vp8Settings;
  Vp9Settings?: Vp9Settings;
  XavcSettings?: XavcSettings;
}
export type ColorMetadata = "IGNORE" | "INSERT" | (string & {});
export type DropFrameTimecode = "DISABLED" | "ENABLED" | (string & {});
export type RespondToAfd = "NONE" | "RESPOND" | "PASSTHROUGH" | (string & {});
export type ScalingBehavior =
  | "DEFAULT"
  | "STRETCH_TO_OUTPUT"
  | "FIT"
  | "FIT_NO_UPSCALE"
  | "FILL"
  | "SMART_CROP"
  | (string & {});
export type VideoTimecodeInsertion =
  | "DISABLED"
  | "PIC_TIMING_SEI"
  | (string & {});
export type TimecodeTrack = "DISABLED" | "ENABLED" | (string & {});
export type __integerMin90Max105 = number;
export type __integerMin920Max1023 = number;
export type __integerMinNegative5Max10 = number;
export interface ClipLimits {
  MaximumRGBTolerance?: number;
  MaximumYUV?: number;
  MinimumRGBTolerance?: number;
  MinimumYUV?: number;
}
export type ColorSpaceConversion =
  | "NONE"
  | "FORCE_601"
  | "FORCE_709"
  | "FORCE_HDR10"
  | "FORCE_HLG_2020"
  | "FORCE_P3DCI"
  | "FORCE_P3D65_SDR"
  | "FORCE_P3D65_HDR"
  | (string & {});
export type HDRToSDRToneMapper = "PRESERVE_DETAILS" | "VIBRANT" | (string & {});
export type __integerMinNegative180Max180 = number;
export type SampleRangeConversion =
  | "LIMITED_RANGE_SQUEEZE"
  | "NONE"
  | "LIMITED_RANGE_CLIP"
  | (string & {});
export interface ColorCorrector {
  Brightness?: number;
  ClipLimits?: ClipLimits;
  ColorSpaceConversion?: ColorSpaceConversion;
  Contrast?: number;
  Hdr10Metadata?: Hdr10Metadata;
  HdrToSdrToneMapper?: HDRToSDRToneMapper;
  Hue?: number;
  MaxLuminance?: number;
  SampleRangeConversion?: SampleRangeConversion;
  Saturation?: number;
  SdrReferenceWhiteLevel?: number;
}
export type DeinterlaceAlgorithm =
  | "INTERPOLATE"
  | "INTERPOLATE_TICKER"
  | "BLEND"
  | "BLEND_TICKER"
  | "LINEAR_INTERPOLATION"
  | (string & {});
export type DeinterlacerControl = "FORCE_ALL_FRAMES" | "NORMAL" | (string & {});
export type DeinterlacerMode =
  | "DEINTERLACE"
  | "INVERSE_TELECINE"
  | "ADAPTIVE"
  | (string & {});
export interface Deinterlacer {
  Algorithm?: DeinterlaceAlgorithm;
  Control?: DeinterlacerControl;
  Mode?: DeinterlacerMode;
}
export type DolbyVisionCompatibility =
  | "DUPLICATE_STREAM"
  | "SUPPLEMENTAL_CODECS"
  | (string & {});
export interface DolbyVisionLevel6Metadata {
  MaxCll?: number;
  MaxFall?: number;
}
export type DolbyVisionLevel6Mode =
  | "PASSTHROUGH"
  | "RECALCULATE"
  | "SPECIFY"
  | (string & {});
export type DolbyVisionMapping = "HDR10_NOMAP" | "HDR10_1000" | (string & {});
export type DolbyVisionProfile = "PROFILE_5" | "PROFILE_8_1" | (string & {});
export interface DolbyVision {
  Compatibility?: DolbyVisionCompatibility;
  L6Metadata?: DolbyVisionLevel6Metadata;
  L6Mode?: DolbyVisionLevel6Mode;
  Mapping?: DolbyVisionMapping;
  Profile?: DolbyVisionProfile;
}
export interface DurationControl {
  IntegerDurationMaximumCompressionDenominator?: number;
  IntegerDurationMaximumCompressionNumerator?: number;
  IntegerDurationTrimThresholdMilliseconds?: number;
}
export type __integerMin0Max4000 = number;
export interface Hdr10Plus {
  MasteringMonitorNits?: number;
  TargetMonitorNits?: number;
}
export type NoiseReducerFilter =
  | "BILATERAL"
  | "MEAN"
  | "GAUSSIAN"
  | "LANCZOS"
  | "SHARPEN"
  | "CONSERVE"
  | "SPATIAL"
  | "TEMPORAL"
  | (string & {});
export type __integerMin0Max3 = number;
export interface NoiseReducerFilterSettings {
  Strength?: number;
}
export type __integerMinNegative2Max3 = number;
export type __integerMin0Max16 = number;
export interface NoiseReducerSpatialFilterSettings {
  PostFilterSharpenStrength?: number;
  Speed?: number;
  Strength?: number;
}
export type __integerMin0Max4 = number;
export type NoiseFilterPostTemporalSharpening =
  | "DISABLED"
  | "ENABLED"
  | "AUTO"
  | (string & {});
export type NoiseFilterPostTemporalSharpeningStrength =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | (string & {});
export type __integerMinNegative1Max3 = number;
export interface NoiseReducerTemporalFilterSettings {
  AggressiveMode?: number;
  PostTemporalSharpening?: NoiseFilterPostTemporalSharpening;
  PostTemporalSharpeningStrength?: NoiseFilterPostTemporalSharpeningStrength;
  Speed?: number;
  Strength?: number;
}
export interface NoiseReducer {
  Filter?: NoiseReducerFilter;
  FilterSettings?: NoiseReducerFilterSettings;
  SpatialFilterSettings?: NoiseReducerSpatialFilterSettings;
  TemporalFilterSettings?: NoiseReducerTemporalFilterSettings;
}
export type __stringMin1Max100000 = string;
export type __integerMin0Max4194303 = number;
export type WatermarkingStrength =
  | "LIGHTEST"
  | "LIGHTER"
  | "DEFAULT"
  | "STRONGER"
  | "STRONGEST"
  | (string & {});
export interface NexGuardFileMarkerSettings {
  License?: string;
  Payload?: number;
  Preset?: string;
  Strength?: WatermarkingStrength;
}
export interface PartnerWatermarking {
  NexguardFileMarkerSettings?: NexGuardFileMarkerSettings;
}
export type __integerMin10Max48 = number;
export type TimecodeBurninPosition =
  | "TOP_CENTER"
  | "TOP_LEFT"
  | "TOP_RIGHT"
  | "MIDDLE_LEFT"
  | "MIDDLE_CENTER"
  | "MIDDLE_RIGHT"
  | "BOTTOM_LEFT"
  | "BOTTOM_CENTER"
  | "BOTTOM_RIGHT"
  | (string & {});
export type __stringPattern = string;
export interface TimecodeBurnin {
  FontSize?: number;
  Position?: TimecodeBurninPosition;
  Prefix?: string;
}
export interface VideoPreprocessor {
  ColorCorrector?: ColorCorrector;
  Deinterlacer?: Deinterlacer;
  DolbyVision?: DolbyVision;
  DurationControl?: DurationControl;
  Hdr10Plus?: Hdr10Plus;
  ImageInserter?: ImageInserter;
  NoiseReducer?: NoiseReducer;
  PartnerWatermarking?: PartnerWatermarking;
  TimecodeBurnin?: TimecodeBurnin;
}
export interface VideoDescription {
  AfdSignaling?: AfdSignaling;
  AntiAlias?: AntiAlias;
  ChromaPositionMode?: ChromaPositionMode;
  CodecSettings?: VideoCodecSettings;
  ColorMetadata?: ColorMetadata;
  Crop?: Rectangle;
  DropFrameTimecode?: DropFrameTimecode;
  FixedAfd?: number;
  Height?: number;
  Position?: Rectangle;
  RespondToAfd?: RespondToAfd;
  ScalingBehavior?: ScalingBehavior;
  Sharpness?: number;
  TimecodeInsertion?: VideoTimecodeInsertion;
  TimecodeTrack?: TimecodeTrack;
  VideoPreprocessors?: VideoPreprocessor;
  Width?: number;
}
export interface Output {
  AudioDescriptions?: AudioDescription[];
  CaptionDescriptions?: CaptionDescription[];
  ContainerSettings?: ContainerSettings;
  Extension?: string;
  NameModifier?: string;
  OutputSettings?: OutputSettings;
  Preset?: string;
  VideoDescription?: VideoDescription;
}
export type __listOfOutput = Output[];
export interface OutputGroup {
  AutomatedEncodingSettings?: AutomatedEncodingSettings;
  CustomName?: string;
  Name?: string;
  OutputGroupSettings?: OutputGroupSettings;
  Outputs?: Output[];
}
export type __listOfOutputGroup = OutputGroup[];
export type TimecodeSource =
  | "EMBEDDED"
  | "ZEROBASED"
  | "SPECIFIEDSTART"
  | (string & {});
export type __stringPattern0940191020191209301 = string;
export interface TimecodeConfig {
  Anchor?: string;
  Source?: TimecodeSource;
  Start?: string;
  TimestampOffset?: string;
}
export interface Id3Insertion {
  Id3?: string;
  Timecode?: string;
}
export type __listOfId3Insertion = Id3Insertion[];
export interface TimedMetadataInsertion {
  Id3Insertions?: Id3Insertion[];
}
export interface JobSettings {
  AdAvailOffset?: number;
  AvailBlanking?: AvailBlanking;
  ColorConversion3DLUTSettings?: ColorConversion3DLUTSetting[];
  Esam?: EsamSettings;
  ExtendedDataServices?: ExtendedDataServices;
  FollowSource?: number;
  Inputs?: Input[];
  KantarWatermark?: KantarWatermarkSettings;
  MotionImageInserter?: MotionImageInserter;
  NielsenConfiguration?: NielsenConfiguration;
  NielsenNonLinearWatermark?: NielsenNonLinearWatermarkSettings;
  OutputGroups?: OutputGroup[];
  TimecodeConfig?: TimecodeConfig;
  TimedMetadataInsertion?: TimedMetadataInsertion;
}
export type SimulateReservedQueue = "DISABLED" | "ENABLED" | (string & {});
export type StatusUpdateInterval =
  | "SECONDS_10"
  | "SECONDS_12"
  | "SECONDS_15"
  | "SECONDS_20"
  | "SECONDS_30"
  | "SECONDS_60"
  | "SECONDS_120"
  | "SECONDS_180"
  | "SECONDS_240"
  | "SECONDS_300"
  | "SECONDS_360"
  | "SECONDS_420"
  | "SECONDS_480"
  | "SECONDS_540"
  | "SECONDS_600"
  | (string & {});
export type __mapOf__string = { [key: string]: string | undefined };
export interface CreateJobRequest {
  AccelerationSettings?: AccelerationSettings;
  BillingTagsSource?: BillingTagsSource;
  ClientRequestToken?: string;
  HopDestinations?: HopDestination[];
  JobEngineVersion?: string;
  JobTemplate?: string;
  Priority?: number;
  Queue?: string;
  Role?: string;
  Settings?: JobSettings;
  SimulateReservedQueue?: SimulateReservedQueue;
  StatusUpdateInterval?: StatusUpdateInterval;
  Tags?: { [key: string]: string | undefined };
  UserMetadata?: { [key: string]: string | undefined };
}
export type AccelerationStatus =
  | "NOT_APPLICABLE"
  | "IN_PROGRESS"
  | "ACCELERATED"
  | "NOT_ACCELERATED"
  | (string & {});
export type __timestampUnix = Date;
export type JobPhase = "PROBING" | "TRANSCODING" | "UPLOADING" | (string & {});
export type ElementalInferenceFeature = "SMART_CROP" | (string & {});
export type __listOfElementalInferenceFeature = ElementalInferenceFeature[];
export type ElementalInferenceFeedManagementState =
  | "CREATED"
  | "ASSOCIATED"
  | "PENDING_DELETION"
  | "DELETED"
  | (string & {});
export interface ElementalInferenceFeed {
  Arn?: string;
  FeedManagementState?: ElementalInferenceFeedManagementState;
}
export type __listOfElementalInferenceFeed = ElementalInferenceFeed[];
export interface ElementalInferenceConfiguration {
  Features?: ElementalInferenceFeature[];
  Feeds?: ElementalInferenceFeed[];
}
export type __listOf__string = string[];
export interface JobMessages {
  Info?: string[];
  Warning?: string[];
}
export interface VideoDetail {
  HeightInPx?: number;
  WidthInPx?: number;
}
export interface OutputDetail {
  DurationInMs?: number;
  VideoDetails?: VideoDetail;
}
export type __listOfOutputDetail = OutputDetail[];
export interface OutputGroupDetail {
  OutputDetails?: OutputDetail[];
}
export type __listOfOutputGroupDetail = OutputGroupDetail[];
export interface QueueTransition {
  DestinationQueue?: string;
  SourceQueue?: string;
  Timestamp?: Date;
}
export type __listOfQueueTransition = QueueTransition[];
export type ShareStatus = "NOT_SHARED" | "INITIATED" | "SHARED" | (string & {});
export type JobStatus =
  | "SUBMITTED"
  | "PROGRESSING"
  | "COMPLETE"
  | "CANCELED"
  | "ERROR"
  | (string & {});
export interface Timing {
  FinishTime?: Date;
  StartTime?: Date;
  SubmitTime?: Date;
}
export interface WarningGroup {
  Code?: number;
  Count?: number;
}
export type __listOfWarningGroup = WarningGroup[];
export interface Job {
  AccelerationSettings?: AccelerationSettings;
  AccelerationStatus?: AccelerationStatus;
  Arn?: string;
  BillingTagsSource?: BillingTagsSource;
  ClientRequestToken?: string;
  CreatedAt?: Date;
  CurrentPhase?: JobPhase;
  ElementalInferenceConfiguration?: ElementalInferenceConfiguration;
  ErrorCode?: number;
  ErrorMessage?: string;
  HopDestinations?: HopDestination[];
  Id?: string;
  JobEngineVersionRequested?: string;
  JobEngineVersionUsed?: string;
  JobPercentComplete?: number;
  JobTemplate?: string;
  LastShareDetails?: string;
  Messages?: JobMessages;
  OutputGroupDetails?: OutputGroupDetail[];
  Priority?: number;
  Queue?: string;
  QueueTransitions?: QueueTransition[];
  RetryCount?: number;
  Role?: string;
  Settings?: JobSettings;
  ShareStatus?: ShareStatus;
  SimulateReservedQueue?: SimulateReservedQueue;
  Status?: JobStatus;
  StatusUpdateInterval?: StatusUpdateInterval;
  Timing?: Timing;
  UserMetadata?: { [key: string]: string | undefined };
  Warnings?: WarningGroup[];
}
export interface CreateJobResponse {
  Job?: Job & {
    Role: string;
    Settings: JobSettings;
    AccelerationSettings: AccelerationSettings & { Mode: AccelerationMode };
    Warnings: (WarningGroup & { Code: number; Count: number })[];
  };
}
export interface InputTemplate {
  AdvancedInputFilter?: AdvancedInputFilter;
  AdvancedInputFilterSettings?: AdvancedInputFilterSettings;
  AudioSelectorGroups?: { [key: string]: AudioSelectorGroup | undefined };
  AudioSelectors?: { [key: string]: AudioSelector | undefined };
  CaptionSelectors?: { [key: string]: CaptionSelector | undefined };
  Crop?: Rectangle;
  DeblockFilter?: InputDeblockFilter;
  DenoiseFilter?: InputDenoiseFilter;
  DolbyVisionMetadataXml?: string;
  DynamicAudioSelectors?: { [key: string]: DynamicAudioSelector | undefined };
  FilterEnable?: InputFilterEnable;
  FilterStrength?: number;
  ImageInserter?: ImageInserter;
  InputClippings?: InputClipping[];
  InputScanType?: InputScanType;
  MultiViewSettings?: MultiViewSettings[];
  Position?: Rectangle;
  ProgramNumber?: number;
  PsiControl?: InputPsiControl;
  TimecodeSource?: InputTimecodeSource;
  TimecodeStart?: string;
  VideoOverlays?: VideoOverlay[];
  VideoSelector?: VideoSelector;
}
export type __listOfInputTemplate = InputTemplate[];
export interface JobTemplateSettings {
  AdAvailOffset?: number;
  AvailBlanking?: AvailBlanking;
  ColorConversion3DLUTSettings?: ColorConversion3DLUTSetting[];
  Esam?: EsamSettings;
  ExtendedDataServices?: ExtendedDataServices;
  FollowSource?: number;
  Inputs?: InputTemplate[];
  KantarWatermark?: KantarWatermarkSettings;
  MotionImageInserter?: MotionImageInserter;
  NielsenConfiguration?: NielsenConfiguration;
  NielsenNonLinearWatermark?: NielsenNonLinearWatermarkSettings;
  OutputGroups?: OutputGroup[];
  TimecodeConfig?: TimecodeConfig;
  TimedMetadataInsertion?: TimedMetadataInsertion;
}
export interface CreateJobTemplateRequest {
  AccelerationSettings?: AccelerationSettings;
  Category?: string;
  Description?: string;
  HopDestinations?: HopDestination[];
  Name?: string;
  Priority?: number;
  Queue?: string;
  Settings?: JobTemplateSettings;
  StatusUpdateInterval?: StatusUpdateInterval;
  Tags?: { [key: string]: string | undefined };
}
export type Type = "SYSTEM" | "CUSTOM" | (string & {});
export interface JobTemplate {
  AccelerationSettings?: AccelerationSettings;
  Arn?: string;
  Category?: string;
  CreatedAt?: Date;
  Description?: string;
  HopDestinations?: HopDestination[];
  LastUpdated?: Date;
  Name?: string;
  Priority?: number;
  Queue?: string;
  Settings?: JobTemplateSettings;
  StatusUpdateInterval?: StatusUpdateInterval;
  Type?: Type;
}
export interface CreateJobTemplateResponse {
  JobTemplate?: JobTemplate & {
    Name: string;
    Settings: JobTemplateSettings;
    AccelerationSettings: AccelerationSettings & { Mode: AccelerationMode };
  };
}
export interface CaptionDescriptionPreset {
  CustomLanguageCode?: string;
  DestinationSettings?: CaptionDestinationSettings;
  LanguageCode?: LanguageCode;
  LanguageDescription?: string;
}
export type __listOfCaptionDescriptionPreset = CaptionDescriptionPreset[];
export interface PresetSettings {
  AudioDescriptions?: AudioDescription[];
  CaptionDescriptions?: CaptionDescriptionPreset[];
  ContainerSettings?: ContainerSettings;
  VideoDescription?: VideoDescription;
}
export interface CreatePresetRequest {
  Category?: string;
  Description?: string;
  Name?: string;
  Settings?: PresetSettings;
  Tags?: { [key: string]: string | undefined };
}
export interface Preset {
  Arn?: string;
  Category?: string;
  CreatedAt?: Date;
  Description?: string;
  LastUpdated?: Date;
  Name?: string;
  Settings?: PresetSettings;
  Type?: Type;
}
export interface CreatePresetResponse {
  Preset?: Preset & { Name: string; Settings: PresetSettings };
}
export type __integerMin0 = number;
export type PricingPlan = "ON_DEMAND" | "RESERVED" | (string & {});
export type Commitment = "ONE_YEAR" | (string & {});
export type RenewalType = "AUTO_RENEW" | "EXPIRE" | (string & {});
export interface ReservationPlanSettings {
  Commitment?: Commitment;
  RenewalType?: RenewalType;
  ReservedSlots?: number;
}
export type QueueStatus = "ACTIVE" | "PAUSED" | (string & {});
export interface CreateQueueRequest {
  ConcurrentJobs?: number;
  Description?: string;
  MaximumConcurrentFeeds?: number;
  Name?: string;
  PricingPlan?: PricingPlan;
  ReservationPlanSettings?: ReservationPlanSettings;
  Status?: QueueStatus;
  Tags?: { [key: string]: string | undefined };
}
export type ReservationPlanStatus = "ACTIVE" | "EXPIRED" | (string & {});
export interface ReservationPlan {
  Commitment?: Commitment;
  ExpiresAt?: Date;
  PurchasedAt?: Date;
  RenewalType?: RenewalType;
  ReservedSlots?: number;
  Status?: ReservationPlanStatus;
}
export interface ServiceOverride {
  Message?: string;
  Name?: string;
  OverrideValue?: string;
  Value?: string;
}
export type __listOfServiceOverride = ServiceOverride[];
export interface Queue {
  Arn?: string;
  ConcurrentJobs?: number;
  CreatedAt?: Date;
  Description?: string;
  LastUpdated?: Date;
  MaximumConcurrentFeeds?: number;
  Name?: string;
  PricingPlan?: PricingPlan;
  ProgressingJobsCount?: number;
  ReservationPlan?: ReservationPlan;
  ServiceOverrides?: ServiceOverride[];
  Status?: QueueStatus;
  SubmittedJobsCount?: number;
  Type?: Type;
}
export interface CreateQueueResponse {
  Queue?: Queue & { Name: string };
}
export interface CreateResourceShareRequest {
  JobId?: string;
  SupportCaseId?: string;
}
export interface CreateResourceShareResponse {}
export interface DeleteJobTemplateRequest {
  Name: string;
}
export interface DeleteJobTemplateResponse {}
export interface DeletePolicyRequest {}
export interface DeletePolicyResponse {}
export interface DeletePresetRequest {
  Name: string;
}
export interface DeletePresetResponse {}
export interface DeleteQueueRequest {
  Name: string;
}
export interface DeleteQueueResponse {}
export type DescribeEndpointsMode = "DEFAULT" | "GET_ONLY" | (string & {});
export interface DescribeEndpointsRequest {
  MaxResults?: number;
  Mode?: DescribeEndpointsMode;
  NextToken?: string;
}
export interface Endpoint {
  Url?: string;
}
export type __listOfEndpoint = Endpoint[];
export interface DescribeEndpointsResponse {
  Endpoints?: Endpoint[];
  NextToken?: string;
}
export interface DisassociateCertificateRequest {
  Arn: string;
}
export interface DisassociateCertificateResponse {}
export interface GetJobRequest {
  Id: string;
}
export interface GetJobResponse {
  Job?: Job & {
    Role: string;
    Settings: JobSettings;
    AccelerationSettings: AccelerationSettings & { Mode: AccelerationMode };
    Warnings: (WarningGroup & { Code: number; Count: number })[];
  };
}
export interface GetJobsQueryResultsRequest {
  Id: string;
}
export type __listOfJob = Job[];
export type JobsQueryStatus =
  | "SUBMITTED"
  | "PROGRESSING"
  | "COMPLETE"
  | "ERROR"
  | (string & {});
export interface GetJobsQueryResultsResponse {
  Jobs?: (Job & {
    Role: string;
    Settings: JobSettings;
    AccelerationSettings: AccelerationSettings & { Mode: AccelerationMode };
    Warnings: (WarningGroup & { Code: number; Count: number })[];
  })[];
  NextToken?: string;
  Status?: JobsQueryStatus;
}
export interface GetJobTemplateRequest {
  Name: string;
}
export interface GetJobTemplateResponse {
  JobTemplate?: JobTemplate & {
    Name: string;
    Settings: JobTemplateSettings;
    AccelerationSettings: AccelerationSettings & { Mode: AccelerationMode };
  };
}
export interface GetPolicyRequest {}
export type InputPolicy = "ALLOWED" | "DISALLOWED" | (string & {});
export interface Policy {
  HttpInputs?: InputPolicy;
  HttpsInputs?: InputPolicy;
  S3Inputs?: InputPolicy;
}
export interface GetPolicyResponse {
  Policy?: Policy;
}
export interface GetPresetRequest {
  Name: string;
}
export interface GetPresetResponse {
  Preset?: Preset & { Name: string; Settings: PresetSettings };
}
export interface GetQueueRequest {
  Name: string;
}
export interface GetQueueResponse {
  Queue?: Queue & { Name: string };
}
export type __integerMin1Max20 = number;
export type Order = "ASCENDING" | "DESCENDING" | (string & {});
export interface ListJobsRequest {
  MaxResults?: number;
  NextToken?: string;
  Order?: Order;
  Queue?: string;
  Status?: JobStatus;
}
export interface ListJobsResponse {
  Jobs?: (Job & {
    Role: string;
    Settings: JobSettings;
    AccelerationSettings: AccelerationSettings & { Mode: AccelerationMode };
    Warnings: (WarningGroup & { Code: number; Count: number })[];
  })[];
  NextToken?: string;
}
export type JobTemplateListBy =
  | "NAME"
  | "CREATION_DATE"
  | "SYSTEM"
  | (string & {});
export interface ListJobTemplatesRequest {
  Category?: string;
  ListBy?: JobTemplateListBy;
  MaxResults?: number;
  NextToken?: string;
  Order?: Order;
}
export type __listOfJobTemplate = JobTemplate[];
export interface ListJobTemplatesResponse {
  JobTemplates?: (JobTemplate & {
    Name: string;
    Settings: JobTemplateSettings;
    AccelerationSettings: AccelerationSettings & { Mode: AccelerationMode };
  })[];
  NextToken?: string;
}
export type PresetListBy = "NAME" | "CREATION_DATE" | "SYSTEM" | (string & {});
export interface ListPresetsRequest {
  Category?: string;
  ListBy?: PresetListBy;
  MaxResults?: number;
  NextToken?: string;
  Order?: Order;
}
export type __listOfPreset = Preset[];
export interface ListPresetsResponse {
  NextToken?: string;
  Presets?: (Preset & { Name: string; Settings: PresetSettings })[];
}
export type QueueListBy = "NAME" | "CREATION_DATE" | (string & {});
export interface ListQueuesRequest {
  ListBy?: QueueListBy;
  MaxResults?: number;
  NextToken?: string;
  Order?: Order;
}
export type __listOfQueue = Queue[];
export interface ListQueuesResponse {
  NextToken?: string;
  Queues?: (Queue & { Name: string })[];
  TotalConcurrentJobs?: number;
  UnallocatedConcurrentJobs?: number;
}
export interface ListTagsForResourceRequest {
  Arn: string;
}
export interface ResourceTags {
  Arn?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface ListTagsForResourceResponse {
  ResourceTags?: ResourceTags;
}
export interface ListVersionsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface JobEngineVersion {
  ExpirationDate?: Date;
  Version?: string;
}
export type __listOfJobEngineVersion = JobEngineVersion[];
export interface ListVersionsResponse {
  NextToken?: string;
  Versions?: JobEngineVersion[];
}
export interface ProbeInputFile {
  FileUrl?: string;
}
export type __listOfProbeInputFile = ProbeInputFile[];
export interface ProbeRequest {
  InputFiles?: ProbeInputFile[];
}
export type Format =
  | "mp4"
  | "quicktime"
  | "matroska"
  | "webm"
  | "mxf"
  | "wave"
  | "avi"
  | "mpegts"
  | "mpegps"
  | "mp3"
  | (string & {});
export interface FrameRate {
  Denominator?: number;
  Numerator?: number;
}
export interface AudioProperties {
  BitDepth?: number;
  BitRate?: number;
  Channels?: number;
  FrameRate?: FrameRate;
  LanguageCode?: string;
  ObjectCount?: number;
  SampleRate?: number;
}
export type Codec =
  | "UNKNOWN"
  | "AAC"
  | "AC3"
  | "EAC3"
  | "FLAC"
  | "MP2"
  | "MP3"
  | "OPUS"
  | "PCM"
  | "VORBIS"
  | "AV1"
  | "AVC"
  | "HEVC"
  | "JPEG2000"
  | "MJPEG"
  | "MPEG1"
  | "MP4V"
  | "MPEG2"
  | "PRORES"
  | "QTRLE"
  | "THEORA"
  | "UNCOMPRESSED"
  | "VFW"
  | "VP8"
  | "VP9"
  | "C608"
  | "C708"
  | "WEBVTT"
  | (string & {});
export interface DataProperties {
  LanguageCode?: string;
}
export type TrackType = "video" | "audio" | "data" | (string & {});
export type ColorPrimaries =
  | "ITU_709"
  | "UNSPECIFIED"
  | "RESERVED"
  | "ITU_470M"
  | "ITU_470BG"
  | "SMPTE_170M"
  | "SMPTE_240M"
  | "GENERIC_FILM"
  | "ITU_2020"
  | "SMPTE_428_1"
  | "SMPTE_431_2"
  | "SMPTE_EG_432_1"
  | "IPT"
  | "SMPTE_2067XYZ"
  | "EBU_3213_E"
  | "LAST"
  | (string & {});
export interface ContentLightLevel {
  MaxContentLightLevel?: number;
  MaxFrameAverageLightLevel?: number;
}
export type MatrixCoefficients =
  | "RGB"
  | "ITU_709"
  | "UNSPECIFIED"
  | "RESERVED"
  | "FCC"
  | "ITU_470BG"
  | "SMPTE_170M"
  | "SMPTE_240M"
  | "YCgCo"
  | "ITU_2020_NCL"
  | "ITU_2020_CL"
  | "SMPTE_2085"
  | "CD_NCL"
  | "CD_CL"
  | "ITU_2100ICtCp"
  | "IPT"
  | "EBU3213"
  | "LAST"
  | (string & {});
export type TransferCharacteristics =
  | "ITU_709"
  | "UNSPECIFIED"
  | "RESERVED"
  | "ITU_470M"
  | "ITU_470BG"
  | "SMPTE_170M"
  | "SMPTE_240M"
  | "LINEAR"
  | "LOG10_2"
  | "LOC10_2_5"
  | "IEC_61966_2_4"
  | "ITU_1361"
  | "IEC_61966_2_1"
  | "ITU_2020_10bit"
  | "ITU_2020_12bit"
  | "SMPTE_2084"
  | "SMPTE_428_1"
  | "ARIB_B67"
  | "LAST"
  | (string & {});
export interface CodecMetadata {
  BitDepth?: number;
  ChromaSubsampling?: string;
  CodedFrameRate?: FrameRate;
  ColorPrimaries?: ColorPrimaries;
  ContentLightLevel?: ContentLightLevel;
  FieldOrder?: string;
  Height?: number;
  Level?: string;
  MatrixCoefficients?: MatrixCoefficients;
  Profile?: string;
  Rotation?: number;
  ScanType?: string;
  TransferCharacteristics?: TransferCharacteristics;
  Width?: number;
}
export interface MasteringDisplayColorVolume {
  BluePrimaryX?: number;
  BluePrimaryY?: number;
  GreenPrimaryX?: number;
  GreenPrimaryY?: number;
  MaxLuminance?: number;
  MinLuminance?: number;
  RedPrimaryX?: number;
  RedPrimaryY?: number;
  WhitePointX?: number;
  WhitePointY?: number;
}
export interface HdrMetadata {
  ContentLightLevel?: ContentLightLevel;
  MasteringDisplayColorVolume?: MasteringDisplayColorVolume;
}
export interface VideoProperties {
  BitDepth?: number;
  BitRate?: number;
  CodecMetadata?: CodecMetadata;
  ColorPrimaries?: ColorPrimaries;
  FrameRate?: FrameRate;
  HdrMetadata?: HdrMetadata;
  Height?: number;
  MatrixCoefficients?: MatrixCoefficients;
  Rotation?: number;
  TransferCharacteristics?: TransferCharacteristics;
  Width?: number;
}
export interface Track {
  AudioProperties?: AudioProperties;
  Codec?: Codec;
  DataProperties?: DataProperties;
  Duration?: number;
  Index?: number;
  TrackType?: TrackType;
  VideoProperties?: VideoProperties;
}
export type __listOfTrack = Track[];
export interface Container {
  BitRate?: number;
  Duration?: number;
  Format?: Format;
  StartTimecode?: string;
  Tracks?: Track[];
}
export interface Metadata {
  ETag?: string;
  FileSize?: number;
  LastModified?: Date;
  MimeType?: string;
}
export type __listOf__integer = number[];
export interface TrackMapping {
  AudioTrackIndexes?: number[];
  DataTrackIndexes?: number[];
  VideoTrackIndexes?: number[];
}
export type __listOfTrackMapping = TrackMapping[];
export interface ProbeResult {
  Container?: Container;
  Metadata?: Metadata;
  TrackMappings?: TrackMapping[];
}
export type __listOfProbeResult = ProbeResult[];
export interface ProbeResponse {
  ProbeResults?: ProbeResult[];
}
export interface PutPolicyRequest {
  Policy?: Policy;
}
export interface PutPolicyResponse {
  Policy?: Policy;
}
export interface SearchJobsRequest {
  InputFile?: string;
  MaxResults?: number;
  NextToken?: string;
  Order?: Order;
  Queue?: string;
  Status?: JobStatus;
}
export interface SearchJobsResponse {
  Jobs?: (Job & {
    Role: string;
    Settings: JobSettings;
    AccelerationSettings: AccelerationSettings & { Mode: AccelerationMode };
    Warnings: (WarningGroup & { Code: number; Count: number })[];
  })[];
  NextToken?: string;
}
export type JobsQueryFilterKey =
  | "queue"
  | "status"
  | "fileInput"
  | "jobEngineVersionRequested"
  | "jobEngineVersionUsed"
  | "audioCodec"
  | "videoCodec"
  | (string & {});
export type __stringMax100 = string;
export type __listOf__stringMax100 = string[];
export interface JobsQueryFilter {
  Key?: JobsQueryFilterKey;
  Values?: string[];
}
export type __listOfJobsQueryFilter = JobsQueryFilter[];
export interface StartJobsQueryRequest {
  FilterList?: JobsQueryFilter[];
  MaxResults?: number;
  NextToken?: string;
  Order?: Order;
}
export interface StartJobsQueryResponse {
  Id?: string;
}
export interface TagResourceRequest {
  Arn?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export interface UntagResourceRequest {
  Arn: string;
  TagKeys?: string[];
}
export interface UntagResourceResponse {}
export interface UpdateJobTemplateRequest {
  AccelerationSettings?: AccelerationSettings;
  Category?: string;
  Description?: string;
  HopDestinations?: HopDestination[];
  Name: string;
  Priority?: number;
  Queue?: string;
  Settings?: JobTemplateSettings;
  StatusUpdateInterval?: StatusUpdateInterval;
}
export interface UpdateJobTemplateResponse {
  JobTemplate?: JobTemplate & {
    Name: string;
    Settings: JobTemplateSettings;
    AccelerationSettings: AccelerationSettings & { Mode: AccelerationMode };
  };
}
export interface UpdatePresetRequest {
  Category?: string;
  Description?: string;
  Name: string;
  Settings?: PresetSettings;
}
export interface UpdatePresetResponse {
  Preset?: Preset & { Name: string; Settings: PresetSettings };
}
export interface UpdateQueueRequest {
  ConcurrentJobs?: number;
  Description?: string;
  MaximumConcurrentFeeds?: number;
  Name: string;
  ReservationPlanSettings?: ReservationPlanSettings;
  Status?: QueueStatus;
}
export interface UpdateQueueResponse {
  Queue?: Queue & { Name: string };
}
export type AssociateCertificateError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Associates an AWS Certificate Manager (ACM) Amazon Resource Name (ARN) with AWS Elemental MediaConvert.
 */
export const associateCertificate: API.OperationMethod<
  AssociateCertificateRequest,
  AssociateCertificateResponse,
  AssociateCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2017-08-29/certificates",
    input: { Arn: D.m({ wire: "arn" }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateCertificate",
})) as any;

export type CancelJobError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Permanently cancel a job. Once you have canceled a job, you can't start it again.
 */
export const cancelJob: API.OperationMethod<
  CancelJobRequest,
  CancelJobResponse,
  CancelJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2017-08-29/jobs/{Id}",
    input: { Id: 0 },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelJob",
})) as any;

export type CreateJobError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a new transcoding job. For information about jobs and job settings, see the User Guide at http://docs.aws.amazon.com/mediaconvert/latest/ug/what-is.html
 */
export const createJob: API.OperationMethod<
  CreateJobRequest,
  CreateJobResponse,
  CreateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2017-08-29/jobs",
    input: {
      AccelerationSettings: D.m({
        wire: "accelerationSettings",
        shape: i_AccelerationSettings,
      }),
      BillingTagsSource: D.m({ wire: "billingTagsSource" }),
      ClientRequestToken: D.m({
        idempotency: true,
        wire: "clientRequestToken",
      }),
      HopDestinations: D.m({
        wire: "hopDestinations",
        shape: D.list(i_HopDestination),
      }),
      JobEngineVersion: D.m({ wire: "jobEngineVersion" }),
      JobTemplate: D.m({ wire: "jobTemplate" }),
      Priority: D.m({ wire: "priority" }),
      Queue: D.m({ wire: "queue" }),
      Role: D.m({ wire: "role" }),
      Settings: D.m({
        wire: "settings",
        shape: {
          AdAvailOffset: D.m({ wire: "adAvailOffset" }),
          AvailBlanking: D.m({ wire: "availBlanking", shape: i_AvailBlanking }),
          ColorConversion3DLUTSettings: D.m({
            wire: "colorConversion3DLUTSettings",
            shape: D.list(i_ColorConversion3DLUTSetting),
          }),
          Esam: D.m({ wire: "esam", shape: i_EsamSettings }),
          ExtendedDataServices: D.m({
            wire: "extendedDataServices",
            shape: i_ExtendedDataServices,
          }),
          FollowSource: D.m({ wire: "followSource" }),
          Inputs: D.m({
            wire: "inputs",
            shape: D.list({
              AdvancedInputFilter: D.m({ wire: "advancedInputFilter" }),
              AdvancedInputFilterSettings: D.m({
                wire: "advancedInputFilterSettings",
                shape: i_AdvancedInputFilterSettings,
              }),
              AudioSelectorGroups: D.m({
                wire: "audioSelectorGroups",
                shape: D.map(i_AudioSelectorGroup),
              }),
              AudioSelectors: D.m({
                wire: "audioSelectors",
                shape: D.map(i_AudioSelector),
              }),
              CaptionSelectors: D.m({
                wire: "captionSelectors",
                shape: D.map(i_CaptionSelector),
              }),
              Crop: D.m({ wire: "crop", shape: i_Rectangle }),
              DeblockFilter: D.m({ wire: "deblockFilter" }),
              DecryptionSettings: D.m({
                wire: "decryptionSettings",
                shape: {
                  DecryptionMode: D.m({ wire: "decryptionMode" }),
                  EncryptedDecryptionKey: D.m({
                    wire: "encryptedDecryptionKey",
                  }),
                  InitializationVector: D.m({ wire: "initializationVector" }),
                  KmsKeyRegion: D.m({ wire: "kmsKeyRegion" }),
                },
              }),
              DenoiseFilter: D.m({ wire: "denoiseFilter" }),
              DolbyVisionMetadataXml: D.m({ wire: "dolbyVisionMetadataXml" }),
              DynamicAudioSelectors: D.m({
                wire: "dynamicAudioSelectors",
                shape: D.map(i_DynamicAudioSelector),
              }),
              FileInput: D.m({ wire: "fileInput" }),
              FilterEnable: D.m({ wire: "filterEnable" }),
              FilterStrength: D.m({ wire: "filterStrength" }),
              ImageInserter: D.m({
                wire: "imageInserter",
                shape: i_ImageInserter,
              }),
              InputClippings: D.m({
                wire: "inputClippings",
                shape: D.list(i_InputClipping),
              }),
              InputScanType: D.m({ wire: "inputScanType" }),
              MultiViewSettings: D.m({
                wire: "multiViewSettings",
                shape: D.list(i_MultiViewSettings),
              }),
              Position: D.m({ wire: "position", shape: i_Rectangle }),
              ProgramNumber: D.m({ wire: "programNumber" }),
              PsiControl: D.m({ wire: "psiControl" }),
              SupplementalImps: D.m({ wire: "supplementalImps" }),
              TamsSettings: D.m({
                wire: "tamsSettings",
                shape: {
                  AuthConnectionArn: D.m({ wire: "authConnectionArn" }),
                  GapHandling: D.m({ wire: "gapHandling" }),
                  SourceId: D.m({ wire: "sourceId" }),
                  Timerange: D.m({ wire: "timerange" }),
                },
              }),
              TimecodeSource: D.m({ wire: "timecodeSource" }),
              TimecodeStart: D.m({ wire: "timecodeStart" }),
              VideoGenerator: D.m({
                wire: "videoGenerator",
                shape: {
                  Channels: D.m({ wire: "channels" }),
                  Duration: D.m({ wire: "duration" }),
                  FramerateDenominator: D.m({ wire: "framerateDenominator" }),
                  FramerateNumerator: D.m({ wire: "framerateNumerator" }),
                  Height: D.m({ wire: "height" }),
                  ImageInput: D.m({ wire: "imageInput" }),
                  SampleRate: D.m({ wire: "sampleRate" }),
                  Width: D.m({ wire: "width" }),
                },
              }),
              VideoOverlays: D.m({
                wire: "videoOverlays",
                shape: D.list(i_VideoOverlay),
              }),
              VideoSelector: D.m({
                wire: "videoSelector",
                shape: i_VideoSelector,
              }),
            }),
          }),
          KantarWatermark: D.m({
            wire: "kantarWatermark",
            shape: i_KantarWatermarkSettings,
          }),
          MotionImageInserter: D.m({
            wire: "motionImageInserter",
            shape: i_MotionImageInserter,
          }),
          NielsenConfiguration: D.m({
            wire: "nielsenConfiguration",
            shape: i_NielsenConfiguration,
          }),
          NielsenNonLinearWatermark: D.m({
            wire: "nielsenNonLinearWatermark",
            shape: i_NielsenNonLinearWatermarkSettings,
          }),
          OutputGroups: D.m({
            wire: "outputGroups",
            shape: D.list(i_OutputGroup),
          }),
          TimecodeConfig: D.m({
            wire: "timecodeConfig",
            shape: i_TimecodeConfig,
          }),
          TimedMetadataInsertion: D.m({
            wire: "timedMetadataInsertion",
            shape: i_TimedMetadataInsertion,
          }),
        },
      }),
      SimulateReservedQueue: D.m({ wire: "simulateReservedQueue" }),
      StatusUpdateInterval: D.m({ wire: "statusUpdateInterval" }),
      Tags: D.m({ wire: "tags" }),
      UserMetadata: D.m({ wire: "userMetadata" }),
    },
    output: { Job: D.m({ wire: "job", shape: o_Job }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJob",
})) as any;

export type CreateJobTemplateError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a new job template. For information about job templates see the User Guide at http://docs.aws.amazon.com/mediaconvert/latest/ug/what-is.html
 */
export const createJobTemplate: API.OperationMethod<
  CreateJobTemplateRequest,
  CreateJobTemplateResponse,
  CreateJobTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2017-08-29/jobTemplates",
    input: {
      AccelerationSettings: D.m({
        wire: "accelerationSettings",
        shape: i_AccelerationSettings,
      }),
      Category: D.m({ wire: "category" }),
      Description: D.m({ wire: "description" }),
      HopDestinations: D.m({
        wire: "hopDestinations",
        shape: D.list(i_HopDestination),
      }),
      Name: D.m({ wire: "name" }),
      Priority: D.m({ wire: "priority" }),
      Queue: D.m({ wire: "queue" }),
      Settings: D.m({ wire: "settings", shape: i_JobTemplateSettings }),
      StatusUpdateInterval: D.m({ wire: "statusUpdateInterval" }),
      Tags: D.m({ wire: "tags" }),
    },
    output: { JobTemplate: D.m({ wire: "jobTemplate", shape: o_JobTemplate }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJobTemplate",
})) as any;

export type CreatePresetError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a new preset. For information about job templates see the User Guide at http://docs.aws.amazon.com/mediaconvert/latest/ug/what-is.html
 */
export const createPreset: API.OperationMethod<
  CreatePresetRequest,
  CreatePresetResponse,
  CreatePresetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2017-08-29/presets",
    input: {
      Category: D.m({ wire: "category" }),
      Description: D.m({ wire: "description" }),
      Name: D.m({ wire: "name" }),
      Settings: D.m({ wire: "settings", shape: i_PresetSettings }),
      Tags: D.m({ wire: "tags" }),
    },
    output: { Preset: D.m({ wire: "preset", shape: o_Preset }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePreset",
})) as any;

export type CreateQueueError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a new transcoding queue. For information about queues, see Working With Queues in the User Guide at https://docs.aws.amazon.com/mediaconvert/latest/ug/working-with-queues.html
 */
export const createQueue: API.OperationMethod<
  CreateQueueRequest,
  CreateQueueResponse,
  CreateQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2017-08-29/queues",
    input: {
      ConcurrentJobs: D.m({ wire: "concurrentJobs" }),
      Description: D.m({ wire: "description" }),
      MaximumConcurrentFeeds: D.m({ wire: "maximumConcurrentFeeds" }),
      Name: D.m({ wire: "name" }),
      PricingPlan: D.m({ wire: "pricingPlan" }),
      ReservationPlanSettings: D.m({
        wire: "reservationPlanSettings",
        shape: i_ReservationPlanSettings,
      }),
      Status: D.m({ wire: "status" }),
      Tags: D.m({ wire: "tags" }),
    },
    output: { Queue: D.m({ wire: "queue", shape: o_Queue }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQueue",
})) as any;

export type CreateResourceShareError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a new resource share request for MediaConvert resources with AWS Support.
 */
export const createResourceShare: API.OperationMethod<
  CreateResourceShareRequest,
  CreateResourceShareResponse,
  CreateResourceShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2017-08-29/resourceShares",
    input: {
      JobId: D.m({ wire: "jobId" }),
      SupportCaseId: D.m({ wire: "supportCaseId" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResourceShare",
})) as any;

export type DeleteJobTemplateError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Permanently delete a job template you have created.
 */
export const deleteJobTemplate: API.OperationMethod<
  DeleteJobTemplateRequest,
  DeleteJobTemplateResponse,
  DeleteJobTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2017-08-29/jobTemplates/{Name}",
    input: { Name: 0 },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJobTemplate",
})) as any;

export type DeletePolicyError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Permanently delete a policy that you created.
 */
export const deletePolicy: API.OperationMethod<
  DeletePolicyRequest,
  DeletePolicyResponse,
  DeletePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "DELETE /2017-08-29/policy", input: {} },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicy",
})) as any;

export type DeletePresetError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Permanently delete a preset you have created.
 */
export const deletePreset: API.OperationMethod<
  DeletePresetRequest,
  DeletePresetResponse,
  DeletePresetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2017-08-29/presets/{Name}",
    input: { Name: 0 },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePreset",
})) as any;

export type DeleteQueueError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Permanently delete a queue you have created.
 */
export const deleteQueue: API.OperationMethod<
  DeleteQueueRequest,
  DeleteQueueResponse,
  DeleteQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2017-08-29/queues/{Name}",
    input: { Name: 0 },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQueue",
})) as any;

export type DescribeEndpointsError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Send a request with an empty body to the regional API endpoint to get your account API endpoint. Note that DescribeEndpoints is no longer required. We recommend that you send your requests directly to the regional endpoint instead.
 */
export const describeEndpoints: API.PaginatedOperationMethod<
  DescribeEndpointsRequest,
  DescribeEndpointsResponse,
  DescribeEndpointsError,
  Credentials | HttpClient.HttpClient,
  Endpoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /2017-08-29/endpoints",
    input: {
      MaxResults: D.m({ wire: "maxResults" }),
      Mode: D.m({ wire: "mode" }),
      NextToken: D.m({ wire: "nextToken" }),
    },
    output: {
      Endpoints: D.m({
        wire: "endpoints",
        shape: D.list({ Url: D.m({ wire: "url" }) }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEndpoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Endpoints",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DisassociateCertificateError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes an association between the Amazon Resource Name (ARN) of an AWS Certificate Manager (ACM) certificate and an AWS Elemental MediaConvert resource.
 */
export const disassociateCertificate: API.OperationMethod<
  DisassociateCertificateRequest,
  DisassociateCertificateResponse,
  DisassociateCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2017-08-29/certificates/{Arn}",
    input: { Arn: 0 },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateCertificate",
})) as any;

export type GetJobError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve the JSON for a specific transcoding job.
 */
export const getJob: API.OperationMethod<
  GetJobRequest,
  GetJobResponse,
  GetJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2017-08-29/jobs/{Id}",
    input: { Id: 0 },
    output: { Job: D.m({ wire: "job", shape: o_Job }) },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJob",
})) as any;

export type GetJobsQueryResultsError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve a JSON array of up to twenty of your most recent jobs matched by a jobs query.
 */
export const getJobsQueryResults: API.OperationMethod<
  GetJobsQueryResultsRequest,
  GetJobsQueryResultsResponse,
  GetJobsQueryResultsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2017-08-29/jobsQueries/{Id}",
    input: { Id: 0 },
    output: {
      Jobs: D.m({ wire: "jobs", shape: D.list(o_Job) }),
      NextToken: D.m({ wire: "nextToken" }),
      Status: D.m({ wire: "status" }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobsQueryResults",
})) as any;

export type GetJobTemplateError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve the JSON for a specific job template.
 */
export const getJobTemplate: API.OperationMethod<
  GetJobTemplateRequest,
  GetJobTemplateResponse,
  GetJobTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2017-08-29/jobTemplates/{Name}",
    input: { Name: 0 },
    output: { JobTemplate: D.m({ wire: "jobTemplate", shape: o_JobTemplate }) },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobTemplate",
})) as any;

export type GetPolicyError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve the JSON for your policy.
 */
export const getPolicy: API.OperationMethod<
  GetPolicyRequest,
  GetPolicyResponse,
  GetPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2017-08-29/policy",
    input: {},
    output: { Policy: D.m({ wire: "policy", shape: o_Policy }) },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicy",
})) as any;

export type GetPresetError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve the JSON for a specific preset.
 */
export const getPreset: API.OperationMethod<
  GetPresetRequest,
  GetPresetResponse,
  GetPresetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2017-08-29/presets/{Name}",
    input: { Name: 0 },
    output: { Preset: D.m({ wire: "preset", shape: o_Preset }) },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPreset",
})) as any;

export type GetQueueError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve the JSON for a specific queue.
 */
export const getQueue: API.OperationMethod<
  GetQueueRequest,
  GetQueueResponse,
  GetQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2017-08-29/queues/{Name}",
    input: { Name: 0 },
    output: { Queue: D.m({ wire: "queue", shape: o_Queue }) },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueue",
})) as any;

export type ListJobsError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve a JSON array of up to twenty of your most recently created jobs. This array includes in-process, completed, and errored jobs. This will return the jobs themselves, not just a list of the jobs. To retrieve the twenty next most recent jobs, use the nextToken string returned with the array.
 */
export const listJobs: API.PaginatedOperationMethod<
  ListJobsRequest,
  ListJobsResponse,
  ListJobsError,
  Credentials | HttpClient.HttpClient,
  Job
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2017-08-29/jobs",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      Order: D.m({ query: "order" }),
      Queue: D.m({ query: "queue" }),
      Status: D.m({ query: "status" }),
    },
    output: {
      Jobs: D.m({ wire: "jobs", shape: D.list(o_Job) }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Jobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListJobTemplatesError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve a JSON array of up to twenty of your job templates. This will return the templates themselves, not just a list of them. To retrieve the next twenty templates, use the nextToken string returned with the array
 */
export const listJobTemplates: API.PaginatedOperationMethod<
  ListJobTemplatesRequest,
  ListJobTemplatesResponse,
  ListJobTemplatesError,
  Credentials | HttpClient.HttpClient,
  JobTemplate
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2017-08-29/jobTemplates",
    input: {
      Category: D.m({ query: "category" }),
      ListBy: D.m({ query: "listBy" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      Order: D.m({ query: "order" }),
    },
    output: {
      JobTemplates: D.m({ wire: "jobTemplates", shape: D.list(o_JobTemplate) }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobTemplates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "JobTemplates",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPresetsError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve a JSON array of up to twenty of your presets. This will return the presets themselves, not just a list of them. To retrieve the next twenty presets, use the nextToken string returned with the array.
 */
export const listPresets: API.PaginatedOperationMethod<
  ListPresetsRequest,
  ListPresetsResponse,
  ListPresetsError,
  Credentials | HttpClient.HttpClient,
  Preset
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2017-08-29/presets",
    input: {
      Category: D.m({ query: "category" }),
      ListBy: D.m({ query: "listBy" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      Order: D.m({ query: "order" }),
    },
    output: {
      NextToken: D.m({ wire: "nextToken" }),
      Presets: D.m({ wire: "presets", shape: D.list(o_Preset) }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPresets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Presets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListQueuesError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve a JSON array of up to twenty of your queues. This will return the queues themselves, not just a list of them. To retrieve the next twenty queues, use the nextToken string returned with the array.
 */
export const listQueues: API.PaginatedOperationMethod<
  ListQueuesRequest,
  ListQueuesResponse,
  ListQueuesError,
  Credentials | HttpClient.HttpClient,
  Queue
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2017-08-29/queues",
    input: {
      ListBy: D.m({ query: "listBy" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      Order: D.m({ query: "order" }),
    },
    output: {
      NextToken: D.m({ wire: "nextToken" }),
      Queues: D.m({ wire: "queues", shape: D.list(o_Queue) }),
      TotalConcurrentJobs: D.m({ wire: "totalConcurrentJobs" }),
      UnallocatedConcurrentJobs: D.m({ wire: "unallocatedConcurrentJobs" }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQueues",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Queues",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve the tags for a MediaConvert resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2017-08-29/tags/{Arn}",
    input: { Arn: 0 },
    output: {
      ResourceTags: D.m({
        wire: "resourceTags",
        shape: { Arn: D.m({ wire: "arn" }), Tags: D.m({ wire: "tags" }) },
      }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListVersionsError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve a JSON array of all available Job engine versions and the date they expire.
 */
export const listVersions: API.PaginatedOperationMethod<
  ListVersionsRequest,
  ListVersionsResponse,
  ListVersionsError,
  Credentials | HttpClient.HttpClient,
  JobEngineVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2017-08-29/versions",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      NextToken: D.m({ wire: "nextToken" }),
      Versions: D.m({
        wire: "versions",
        shape: D.list({
          ExpirationDate: D.m({ wire: "expirationDate", shape: D.ts }),
          Version: D.m({ wire: "version" }),
        }),
      }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Versions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ProbeError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Use Probe to obtain detailed information about your input media files. Probe returns a JSON that includes container, codec, frame rate, resolution, track count, audio layout, captions, and more. You can use this information to learn more about your media files, or to help make decisions while automating your transcoding workflow.
 */
export const probe: API.OperationMethod<
  ProbeRequest,
  ProbeResponse,
  ProbeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2017-08-29/probe",
    input: {
      InputFiles: D.m({
        wire: "inputFiles",
        shape: D.list({ FileUrl: D.m({ wire: "fileUrl" }) }),
      }),
    },
    output: {
      ProbeResults: D.m({
        wire: "probeResults",
        shape: D.list({
          Container: D.m({
            wire: "container",
            shape: {
              BitRate: D.m({ wire: "bitRate" }),
              Duration: D.m({ wire: "duration" }),
              Format: D.m({ wire: "format" }),
              StartTimecode: D.m({ wire: "startTimecode" }),
              Tracks: D.m({
                wire: "tracks",
                shape: D.list({
                  AudioProperties: D.m({
                    wire: "audioProperties",
                    shape: {
                      BitDepth: D.m({ wire: "bitDepth" }),
                      BitRate: D.m({ wire: "bitRate" }),
                      Channels: D.m({ wire: "channels" }),
                      FrameRate: D.m({ wire: "frameRate", shape: o_FrameRate }),
                      LanguageCode: D.m({ wire: "languageCode" }),
                      ObjectCount: D.m({ wire: "objectCount" }),
                      SampleRate: D.m({ wire: "sampleRate" }),
                    },
                  }),
                  Codec: D.m({ wire: "codec" }),
                  DataProperties: D.m({
                    wire: "dataProperties",
                    shape: { LanguageCode: D.m({ wire: "languageCode" }) },
                  }),
                  Duration: D.m({ wire: "duration" }),
                  Index: D.m({ wire: "index" }),
                  TrackType: D.m({ wire: "trackType" }),
                  VideoProperties: D.m({
                    wire: "videoProperties",
                    shape: {
                      BitDepth: D.m({ wire: "bitDepth" }),
                      BitRate: D.m({ wire: "bitRate" }),
                      CodecMetadata: D.m({
                        wire: "codecMetadata",
                        shape: {
                          BitDepth: D.m({ wire: "bitDepth" }),
                          ChromaSubsampling: D.m({ wire: "chromaSubsampling" }),
                          CodedFrameRate: D.m({
                            wire: "codedFrameRate",
                            shape: o_FrameRate,
                          }),
                          ColorPrimaries: D.m({ wire: "colorPrimaries" }),
                          ContentLightLevel: D.m({
                            wire: "contentLightLevel",
                            shape: o_ContentLightLevel,
                          }),
                          FieldOrder: D.m({ wire: "fieldOrder" }),
                          Height: D.m({ wire: "height" }),
                          Level: D.m({ wire: "level" }),
                          MatrixCoefficients: D.m({
                            wire: "matrixCoefficients",
                          }),
                          Profile: D.m({ wire: "profile" }),
                          Rotation: D.m({ wire: "rotation" }),
                          ScanType: D.m({ wire: "scanType" }),
                          TransferCharacteristics: D.m({
                            wire: "transferCharacteristics",
                          }),
                          Width: D.m({ wire: "width" }),
                        },
                      }),
                      ColorPrimaries: D.m({ wire: "colorPrimaries" }),
                      FrameRate: D.m({ wire: "frameRate", shape: o_FrameRate }),
                      HdrMetadata: D.m({
                        wire: "hdrMetadata",
                        shape: {
                          ContentLightLevel: D.m({
                            wire: "contentLightLevel",
                            shape: o_ContentLightLevel,
                          }),
                          MasteringDisplayColorVolume: D.m({
                            wire: "masteringDisplayColorVolume",
                            shape: {
                              BluePrimaryX: D.m({ wire: "bluePrimaryX" }),
                              BluePrimaryY: D.m({ wire: "bluePrimaryY" }),
                              GreenPrimaryX: D.m({ wire: "greenPrimaryX" }),
                              GreenPrimaryY: D.m({ wire: "greenPrimaryY" }),
                              MaxLuminance: D.m({ wire: "maxLuminance" }),
                              MinLuminance: D.m({ wire: "minLuminance" }),
                              RedPrimaryX: D.m({ wire: "redPrimaryX" }),
                              RedPrimaryY: D.m({ wire: "redPrimaryY" }),
                              WhitePointX: D.m({ wire: "whitePointX" }),
                              WhitePointY: D.m({ wire: "whitePointY" }),
                            },
                          }),
                        },
                      }),
                      Height: D.m({ wire: "height" }),
                      MatrixCoefficients: D.m({ wire: "matrixCoefficients" }),
                      Rotation: D.m({ wire: "rotation" }),
                      TransferCharacteristics: D.m({
                        wire: "transferCharacteristics",
                      }),
                      Width: D.m({ wire: "width" }),
                    },
                  }),
                }),
              }),
            },
          }),
          Metadata: D.m({
            wire: "metadata",
            shape: {
              ETag: D.m({ wire: "eTag" }),
              FileSize: D.m({ wire: "fileSize" }),
              LastModified: D.m({ wire: "lastModified", shape: D.ts }),
              MimeType: D.m({ wire: "mimeType" }),
            },
          }),
          TrackMappings: D.m({
            wire: "trackMappings",
            shape: D.list({
              AudioTrackIndexes: D.m({ wire: "audioTrackIndexes" }),
              DataTrackIndexes: D.m({ wire: "dataTrackIndexes" }),
              VideoTrackIndexes: D.m({ wire: "videoTrackIndexes" }),
            }),
          }),
        }),
      }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Probe",
})) as any;

export type PutPolicyError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create or change your policy. For more information about policies, see the user guide at http://docs.aws.amazon.com/mediaconvert/latest/ug/what-is.html
 */
export const putPolicy: API.OperationMethod<
  PutPolicyRequest,
  PutPolicyResponse,
  PutPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2017-08-29/policy",
    input: {
      Policy: D.m({
        wire: "policy",
        shape: {
          HttpInputs: D.m({ wire: "httpInputs" }),
          HttpsInputs: D.m({ wire: "httpsInputs" }),
          S3Inputs: D.m({ wire: "s3Inputs" }),
        },
      }),
    },
    output: { Policy: D.m({ wire: "policy", shape: o_Policy }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutPolicy",
})) as any;

export type SearchJobsError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve a JSON array that includes job details for up to twenty of your most recent jobs. Optionally filter results further according to input file, queue, or status. To retrieve the twenty next most recent jobs, use the nextToken string returned with the array.
 */
export const searchJobs: API.PaginatedOperationMethod<
  SearchJobsRequest,
  SearchJobsResponse,
  SearchJobsError,
  Credentials | HttpClient.HttpClient,
  Job
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2017-08-29/search",
    input: {
      InputFile: D.m({ query: "inputFile" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      Order: D.m({ query: "order" }),
      Queue: D.m({ query: "queue" }),
      Status: D.m({ query: "status" }),
    },
    output: {
      Jobs: D.m({ wire: "jobs", shape: D.list(o_Job) }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Jobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type StartJobsQueryError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Start an asynchronous jobs query using the provided filters. To receive the list of jobs that match your query, call the GetJobsQueryResults API using the query ID returned by this API.
 */
export const startJobsQuery: API.OperationMethod<
  StartJobsQueryRequest,
  StartJobsQueryResponse,
  StartJobsQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2017-08-29/jobsQueries",
    input: {
      FilterList: D.m({
        wire: "filterList",
        shape: D.list({
          Key: D.m({ wire: "key" }),
          Values: D.m({ wire: "values" }),
        }),
      }),
      MaxResults: D.m({ wire: "maxResults" }),
      NextToken: D.m({ wire: "nextToken" }),
      Order: D.m({ wire: "order" }),
    },
    output: { Id: D.m({ wire: "id" }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartJobsQuery",
})) as any;

export type TagResourceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Add tags to a MediaConvert queue, preset, job, or job template. For information about tagging, see the User Guide at https://docs.aws.amazon.com/mediaconvert/latest/ug/tagging-mediaconvert-resources.html.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2017-08-29/tags",
    input: { Arn: D.m({ wire: "arn" }), Tags: D.m({ wire: "tags" }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Remove tags from a MediaConvert queue, preset, job, or job template. For information about tagging, see the User Guide at https://docs.aws.amazon.com/mediaconvert/latest/ug/tagging-mediaconvert-resources.html.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2017-08-29/tags/{Arn}",
    input: { Arn: 0, TagKeys: D.m({ wire: "tagKeys" }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateJobTemplateError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Modify one of your existing job templates.
 */
export const updateJobTemplate: API.OperationMethod<
  UpdateJobTemplateRequest,
  UpdateJobTemplateResponse,
  UpdateJobTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2017-08-29/jobTemplates/{Name}",
    input: {
      AccelerationSettings: D.m({
        wire: "accelerationSettings",
        shape: i_AccelerationSettings,
      }),
      Category: D.m({ wire: "category" }),
      Description: D.m({ wire: "description" }),
      HopDestinations: D.m({
        wire: "hopDestinations",
        shape: D.list(i_HopDestination),
      }),
      Name: 0,
      Priority: D.m({ wire: "priority" }),
      Queue: D.m({ wire: "queue" }),
      Settings: D.m({ wire: "settings", shape: i_JobTemplateSettings }),
      StatusUpdateInterval: D.m({ wire: "statusUpdateInterval" }),
    },
    output: { JobTemplate: D.m({ wire: "jobTemplate", shape: o_JobTemplate }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJobTemplate",
})) as any;

export type UpdatePresetError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Modify one of your existing presets.
 */
export const updatePreset: API.OperationMethod<
  UpdatePresetRequest,
  UpdatePresetResponse,
  UpdatePresetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2017-08-29/presets/{Name}",
    input: {
      Category: D.m({ wire: "category" }),
      Description: D.m({ wire: "description" }),
      Name: 0,
      Settings: D.m({ wire: "settings", shape: i_PresetSettings }),
    },
    output: { Preset: D.m({ wire: "preset", shape: o_Preset }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePreset",
})) as any;

export type UpdateQueueError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Modify one of your existing queues.
 */
export const updateQueue: API.OperationMethod<
  UpdateQueueRequest,
  UpdateQueueResponse,
  UpdateQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2017-08-29/queues/{Name}",
    input: {
      ConcurrentJobs: D.m({ wire: "concurrentJobs" }),
      Description: D.m({ wire: "description" }),
      MaximumConcurrentFeeds: D.m({ wire: "maximumConcurrentFeeds" }),
      Name: 0,
      ReservationPlanSettings: D.m({
        wire: "reservationPlanSettings",
        shape: i_ReservationPlanSettings,
      }),
      Status: D.m({ wire: "status" }),
    },
    output: { Queue: D.m({ wire: "queue", shape: o_Queue }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQueue",
})) as any;

const i_AccelerationSettings: D.LazyStruct = () => ({
  Mode: D.m({ wire: "mode" }),
});
const i_AdvancedInputFilterSettings: D.LazyStruct = () => ({
  AddTexture: D.m({ wire: "addTexture" }),
  Sharpening: D.m({ wire: "sharpening" }),
});
const i_AudioSelector: D.LazyStruct = () => ({
  AudioDurationCorrection: D.m({ wire: "audioDurationCorrection" }),
  CustomLanguageCode: D.m({ wire: "customLanguageCode" }),
  DefaultSelection: D.m({ wire: "defaultSelection" }),
  ExternalAudioFileInput: D.m({ wire: "externalAudioFileInput" }),
  HlsRenditionGroupSettings: D.m({
    wire: "hlsRenditionGroupSettings",
    shape: {
      RenditionGroupId: D.m({ wire: "renditionGroupId" }),
      RenditionLanguageCode: D.m({ wire: "renditionLanguageCode" }),
      RenditionName: D.m({ wire: "renditionName" }),
    },
  }),
  LanguageCode: D.m({ wire: "languageCode" }),
  Offset: D.m({ wire: "offset" }),
  Pids: D.m({ wire: "pids" }),
  ProgramSelection: D.m({ wire: "programSelection" }),
  RemixSettings: D.m({ wire: "remixSettings", shape: i_RemixSettings }),
  SelectorType: D.m({ wire: "selectorType" }),
  Streams: D.m({ wire: "streams" }),
  Tracks: D.m({ wire: "tracks" }),
});
const i_AudioSelectorGroup: D.LazyStruct = () => ({
  AudioSelectorNames: D.m({ wire: "audioSelectorNames" }),
});
const i_AvailBlanking: D.LazyStruct = () => ({
  AvailBlankingImage: D.m({ wire: "availBlankingImage" }),
});
const i_CaptionSelector: D.LazyStruct = () => ({
  CustomLanguageCode: D.m({ wire: "customLanguageCode" }),
  LanguageCode: D.m({ wire: "languageCode" }),
  SourceSettings: D.m({
    wire: "sourceSettings",
    shape: {
      AncillarySourceSettings: D.m({
        wire: "ancillarySourceSettings",
        shape: {
          Convert608To708: D.m({ wire: "convert608To708" }),
          SourceAncillaryChannelNumber: D.m({
            wire: "sourceAncillaryChannelNumber",
          }),
          TerminateCaptions: D.m({ wire: "terminateCaptions" }),
        },
      }),
      DvbSubSourceSettings: D.m({
        wire: "dvbSubSourceSettings",
        shape: { Pid: D.m({ wire: "pid" }) },
      }),
      EmbeddedSourceSettings: D.m({
        wire: "embeddedSourceSettings",
        shape: {
          Convert608To708: D.m({ wire: "convert608To708" }),
          Source608ChannelNumber: D.m({ wire: "source608ChannelNumber" }),
          Source608TrackNumber: D.m({ wire: "source608TrackNumber" }),
          TerminateCaptions: D.m({ wire: "terminateCaptions" }),
        },
      }),
      FileSourceSettings: D.m({
        wire: "fileSourceSettings",
        shape: {
          ByteRateLimit: D.m({ wire: "byteRateLimit" }),
          Convert608To708: D.m({ wire: "convert608To708" }),
          ConvertPaintToPop: D.m({ wire: "convertPaintToPop" }),
          Framerate: D.m({
            wire: "framerate",
            shape: {
              FramerateDenominator: D.m({ wire: "framerateDenominator" }),
              FramerateNumerator: D.m({ wire: "framerateNumerator" }),
            },
          }),
          SourceFile: D.m({ wire: "sourceFile" }),
          TimeDelta: D.m({ wire: "timeDelta" }),
          TimeDeltaUnits: D.m({ wire: "timeDeltaUnits" }),
          UpconvertSTLToTeletext: D.m({ wire: "upconvertSTLToTeletext" }),
        },
      }),
      SourceType: D.m({ wire: "sourceType" }),
      TeletextSourceSettings: D.m({
        wire: "teletextSourceSettings",
        shape: { PageNumber: D.m({ wire: "pageNumber" }) },
      }),
      TrackSourceSettings: D.m({
        wire: "trackSourceSettings",
        shape: {
          StreamNumber: D.m({ wire: "streamNumber" }),
          TrackNumber: D.m({ wire: "trackNumber" }),
        },
      }),
      WebvttHlsSourceSettings: D.m({
        wire: "webvttHlsSourceSettings",
        shape: {
          RenditionGroupId: D.m({ wire: "renditionGroupId" }),
          RenditionLanguageCode: D.m({ wire: "renditionLanguageCode" }),
          RenditionName: D.m({ wire: "renditionName" }),
        },
      }),
    },
  }),
});
const i_ColorConversion3DLUTSetting: D.LazyStruct = () => ({
  FileInput: D.m({ wire: "fileInput" }),
  InputColorSpace: D.m({ wire: "inputColorSpace" }),
  InputMasteringLuminance: D.m({ wire: "inputMasteringLuminance" }),
  OutputColorSpace: D.m({ wire: "outputColorSpace" }),
  OutputMasteringLuminance: D.m({ wire: "outputMasteringLuminance" }),
});
const i_DynamicAudioSelector: D.LazyStruct = () => ({
  AudioDurationCorrection: D.m({ wire: "audioDurationCorrection" }),
  ExternalAudioFileInput: D.m({ wire: "externalAudioFileInput" }),
  LanguageCode: D.m({ wire: "languageCode" }),
  Offset: D.m({ wire: "offset" }),
  SelectorType: D.m({ wire: "selectorType" }),
});
const i_EsamSettings: D.LazyStruct = () => ({
  ManifestConfirmConditionNotification: D.m({
    wire: "manifestConfirmConditionNotification",
    shape: { MccXml: D.m({ wire: "mccXml" }) },
  }),
  ResponseSignalPreroll: D.m({ wire: "responseSignalPreroll" }),
  SignalProcessingNotification: D.m({
    wire: "signalProcessingNotification",
    shape: { SccXml: D.m({ wire: "sccXml" }) },
  }),
});
const i_ExtendedDataServices: D.LazyStruct = () => ({
  CopyProtectionAction: D.m({ wire: "copyProtectionAction" }),
  VchipAction: D.m({ wire: "vchipAction" }),
});
const i_HopDestination: D.LazyStruct = () => ({
  Priority: D.m({ wire: "priority" }),
  Queue: D.m({ wire: "queue" }),
  WaitMinutes: D.m({ wire: "waitMinutes" }),
});
const i_ImageInserter: D.LazyStruct = () => ({
  InsertableImages: D.m({
    wire: "insertableImages",
    shape: D.list({
      Duration: D.m({ wire: "duration" }),
      FadeIn: D.m({ wire: "fadeIn" }),
      FadeOut: D.m({ wire: "fadeOut" }),
      Height: D.m({ wire: "height" }),
      ImageInserterInput: D.m({ wire: "imageInserterInput" }),
      ImageX: D.m({ wire: "imageX" }),
      ImageY: D.m({ wire: "imageY" }),
      Layer: D.m({ wire: "layer" }),
      Opacity: D.m({ wire: "opacity" }),
      StartTime: D.m({ wire: "startTime" }),
      Width: D.m({ wire: "width" }),
    }),
  }),
  SdrReferenceWhiteLevel: D.m({ wire: "sdrReferenceWhiteLevel" }),
});
const i_InputClipping: D.LazyStruct = () => ({
  EndTimecode: D.m({ wire: "endTimecode" }),
  StartTimecode: D.m({ wire: "startTimecode" }),
});
const i_JobTemplateSettings: D.LazyStruct = () => ({
  AdAvailOffset: D.m({ wire: "adAvailOffset" }),
  AvailBlanking: D.m({ wire: "availBlanking", shape: i_AvailBlanking }),
  ColorConversion3DLUTSettings: D.m({
    wire: "colorConversion3DLUTSettings",
    shape: D.list(i_ColorConversion3DLUTSetting),
  }),
  Esam: D.m({ wire: "esam", shape: i_EsamSettings }),
  ExtendedDataServices: D.m({
    wire: "extendedDataServices",
    shape: i_ExtendedDataServices,
  }),
  FollowSource: D.m({ wire: "followSource" }),
  Inputs: D.m({
    wire: "inputs",
    shape: D.list({
      AdvancedInputFilter: D.m({ wire: "advancedInputFilter" }),
      AdvancedInputFilterSettings: D.m({
        wire: "advancedInputFilterSettings",
        shape: i_AdvancedInputFilterSettings,
      }),
      AudioSelectorGroups: D.m({
        wire: "audioSelectorGroups",
        shape: D.map(i_AudioSelectorGroup),
      }),
      AudioSelectors: D.m({
        wire: "audioSelectors",
        shape: D.map(i_AudioSelector),
      }),
      CaptionSelectors: D.m({
        wire: "captionSelectors",
        shape: D.map(i_CaptionSelector),
      }),
      Crop: D.m({ wire: "crop", shape: i_Rectangle }),
      DeblockFilter: D.m({ wire: "deblockFilter" }),
      DenoiseFilter: D.m({ wire: "denoiseFilter" }),
      DolbyVisionMetadataXml: D.m({ wire: "dolbyVisionMetadataXml" }),
      DynamicAudioSelectors: D.m({
        wire: "dynamicAudioSelectors",
        shape: D.map(i_DynamicAudioSelector),
      }),
      FilterEnable: D.m({ wire: "filterEnable" }),
      FilterStrength: D.m({ wire: "filterStrength" }),
      ImageInserter: D.m({ wire: "imageInserter", shape: i_ImageInserter }),
      InputClippings: D.m({
        wire: "inputClippings",
        shape: D.list(i_InputClipping),
      }),
      InputScanType: D.m({ wire: "inputScanType" }),
      MultiViewSettings: D.m({
        wire: "multiViewSettings",
        shape: D.list(i_MultiViewSettings),
      }),
      Position: D.m({ wire: "position", shape: i_Rectangle }),
      ProgramNumber: D.m({ wire: "programNumber" }),
      PsiControl: D.m({ wire: "psiControl" }),
      TimecodeSource: D.m({ wire: "timecodeSource" }),
      TimecodeStart: D.m({ wire: "timecodeStart" }),
      VideoOverlays: D.m({
        wire: "videoOverlays",
        shape: D.list(i_VideoOverlay),
      }),
      VideoSelector: D.m({ wire: "videoSelector", shape: i_VideoSelector }),
    }),
  }),
  KantarWatermark: D.m({
    wire: "kantarWatermark",
    shape: i_KantarWatermarkSettings,
  }),
  MotionImageInserter: D.m({
    wire: "motionImageInserter",
    shape: i_MotionImageInserter,
  }),
  NielsenConfiguration: D.m({
    wire: "nielsenConfiguration",
    shape: i_NielsenConfiguration,
  }),
  NielsenNonLinearWatermark: D.m({
    wire: "nielsenNonLinearWatermark",
    shape: i_NielsenNonLinearWatermarkSettings,
  }),
  OutputGroups: D.m({ wire: "outputGroups", shape: D.list(i_OutputGroup) }),
  TimecodeConfig: D.m({ wire: "timecodeConfig", shape: i_TimecodeConfig }),
  TimedMetadataInsertion: D.m({
    wire: "timedMetadataInsertion",
    shape: i_TimedMetadataInsertion,
  }),
});
const i_KantarWatermarkSettings: D.LazyStruct = () => ({
  ChannelName: D.m({ wire: "channelName" }),
  ContentReference: D.m({ wire: "contentReference" }),
  CredentialsSecretName: D.m({ wire: "credentialsSecretName" }),
  FileOffset: D.m({ wire: "fileOffset" }),
  KantarLicenseId: D.m({ wire: "kantarLicenseId" }),
  KantarServerUrl: D.m({ wire: "kantarServerUrl" }),
  LogDestination: D.m({ wire: "logDestination" }),
  Metadata3: D.m({ wire: "metadata3" }),
  Metadata4: D.m({ wire: "metadata4" }),
  Metadata5: D.m({ wire: "metadata5" }),
  Metadata6: D.m({ wire: "metadata6" }),
  Metadata7: D.m({ wire: "metadata7" }),
  Metadata8: D.m({ wire: "metadata8" }),
});
const i_MotionImageInserter: D.LazyStruct = () => ({
  Framerate: D.m({
    wire: "framerate",
    shape: {
      FramerateDenominator: D.m({ wire: "framerateDenominator" }),
      FramerateNumerator: D.m({ wire: "framerateNumerator" }),
    },
  }),
  Input: D.m({ wire: "input" }),
  InsertionMode: D.m({ wire: "insertionMode" }),
  Offset: D.m({
    wire: "offset",
    shape: { ImageX: D.m({ wire: "imageX" }), ImageY: D.m({ wire: "imageY" }) },
  }),
  Playback: D.m({ wire: "playback" }),
  StartTime: D.m({ wire: "startTime" }),
});
const i_MultiViewSettings: D.LazyStruct = () => ({
  Input: D.m({
    wire: "input",
    shape: { FileInput: D.m({ wire: "fileInput" }) },
  }),
});
const i_NielsenConfiguration: D.LazyStruct = () => ({
  BreakoutCode: D.m({ wire: "breakoutCode" }),
  DistributorId: D.m({ wire: "distributorId" }),
});
const i_NielsenNonLinearWatermarkSettings: D.LazyStruct = () => ({
  ActiveWatermarkProcess: D.m({ wire: "activeWatermarkProcess" }),
  AdiFilename: D.m({ wire: "adiFilename" }),
  AssetId: D.m({ wire: "assetId" }),
  AssetName: D.m({ wire: "assetName" }),
  CbetSourceId: D.m({ wire: "cbetSourceId" }),
  EpisodeId: D.m({ wire: "episodeId" }),
  MetadataDestination: D.m({ wire: "metadataDestination" }),
  SourceId: D.m({ wire: "sourceId" }),
  SourceWatermarkStatus: D.m({ wire: "sourceWatermarkStatus" }),
  TicServerUrl: D.m({ wire: "ticServerUrl" }),
  UniqueTicPerAudioTrack: D.m({ wire: "uniqueTicPerAudioTrack" }),
});
const i_OutputGroup: D.LazyStruct = () => ({
  AutomatedEncodingSettings: D.m({
    wire: "automatedEncodingSettings",
    shape: {
      AbrSettings: D.m({
        wire: "abrSettings",
        shape: {
          MaxAbrBitrate: D.m({ wire: "maxAbrBitrate" }),
          MaxQualityLevel: D.m({ wire: "maxQualityLevel" }),
          MaxRenditions: D.m({ wire: "maxRenditions" }),
          MinAbrBitrate: D.m({ wire: "minAbrBitrate" }),
          Rules: D.m({
            wire: "rules",
            shape: D.list({
              AllowedRenditions: D.m({
                wire: "allowedRenditions",
                shape: D.list({
                  Height: D.m({ wire: "height" }),
                  Required: D.m({ wire: "required" }),
                  Width: D.m({ wire: "width" }),
                }),
              }),
              ForceIncludeRenditions: D.m({
                wire: "forceIncludeRenditions",
                shape: D.list({
                  Height: D.m({ wire: "height" }),
                  Width: D.m({ wire: "width" }),
                }),
              }),
              MinBottomRenditionSize: D.m({
                wire: "minBottomRenditionSize",
                shape: {
                  Height: D.m({ wire: "height" }),
                  Width: D.m({ wire: "width" }),
                },
              }),
              MinTopRenditionSize: D.m({
                wire: "minTopRenditionSize",
                shape: {
                  Height: D.m({ wire: "height" }),
                  Width: D.m({ wire: "width" }),
                },
              }),
              Type: D.m({ wire: "type" }),
            }),
          }),
        },
      }),
    },
  }),
  CustomName: D.m({ wire: "customName" }),
  Name: D.m({ wire: "name" }),
  OutputGroupSettings: D.m({
    wire: "outputGroupSettings",
    shape: {
      CmafGroupSettings: D.m({
        wire: "cmafGroupSettings",
        shape: {
          AdditionalManifests: D.m({
            wire: "additionalManifests",
            shape: D.list({
              ManifestNameModifier: D.m({ wire: "manifestNameModifier" }),
              SelectedOutputs: D.m({ wire: "selectedOutputs" }),
            }),
          }),
          BaseUrl: D.m({ wire: "baseUrl" }),
          ClientCache: D.m({ wire: "clientCache" }),
          CodecSpecification: D.m({ wire: "codecSpecification" }),
          DashIFrameTrickPlayNameModifier: D.m({
            wire: "dashIFrameTrickPlayNameModifier",
          }),
          DashManifestStyle: D.m({ wire: "dashManifestStyle" }),
          Destination: D.m({ wire: "destination" }),
          DestinationSettings: D.m({
            wire: "destinationSettings",
            shape: i_DestinationSettings,
          }),
          Encryption: D.m({
            wire: "encryption",
            shape: {
              ClearLeadSegments: D.m({ wire: "clearLeadSegments" }),
              ConstantInitializationVector: D.m({
                wire: "constantInitializationVector",
              }),
              EncryptionMethod: D.m({ wire: "encryptionMethod" }),
              InitializationVectorInManifest: D.m({
                wire: "initializationVectorInManifest",
              }),
              SpekeKeyProvider: D.m({
                wire: "spekeKeyProvider",
                shape: {
                  CertificateArn: D.m({ wire: "certificateArn" }),
                  DashSignaledSystemIds: D.m({ wire: "dashSignaledSystemIds" }),
                  EncryptionContractConfiguration: D.m({
                    wire: "encryptionContractConfiguration",
                    shape: i_EncryptionContractConfiguration,
                  }),
                  HlsSignaledSystemIds: D.m({ wire: "hlsSignaledSystemIds" }),
                  ResourceId: D.m({ wire: "resourceId" }),
                  Url: D.m({ wire: "url" }),
                },
              }),
              StaticKeyProvider: D.m({
                wire: "staticKeyProvider",
                shape: i_StaticKeyProvider,
              }),
              Type: D.m({ wire: "type" }),
            },
          }),
          FragmentLength: D.m({ wire: "fragmentLength" }),
          ImageBasedTrickPlay: D.m({ wire: "imageBasedTrickPlay" }),
          ImageBasedTrickPlaySettings: D.m({
            wire: "imageBasedTrickPlaySettings",
            shape: {
              IntervalCadence: D.m({ wire: "intervalCadence" }),
              ThumbnailHeight: D.m({ wire: "thumbnailHeight" }),
              ThumbnailInterval: D.m({ wire: "thumbnailInterval" }),
              ThumbnailWidth: D.m({ wire: "thumbnailWidth" }),
              TileHeight: D.m({ wire: "tileHeight" }),
              TileWidth: D.m({ wire: "tileWidth" }),
            },
          }),
          ImageBasedTrickPlayVariants: D.m({
            wire: "imageBasedTrickPlayVariants",
            shape: D.list({
              IntervalCadence: D.m({ wire: "intervalCadence" }),
              ThumbnailHeight: D.m({ wire: "thumbnailHeight" }),
              ThumbnailInterval: D.m({ wire: "thumbnailInterval" }),
              ThumbnailWidth: D.m({ wire: "thumbnailWidth" }),
              TileHeight: D.m({ wire: "tileHeight" }),
              TileWidth: D.m({ wire: "tileWidth" }),
            }),
          }),
          ManifestCompression: D.m({ wire: "manifestCompression" }),
          ManifestDurationFormat: D.m({ wire: "manifestDurationFormat" }),
          MinBufferTime: D.m({ wire: "minBufferTime" }),
          MinFinalSegmentLength: D.m({ wire: "minFinalSegmentLength" }),
          MpdManifestBandwidthType: D.m({ wire: "mpdManifestBandwidthType" }),
          MpdProfile: D.m({ wire: "mpdProfile" }),
          PtsOffsetHandlingForBFrames: D.m({
            wire: "ptsOffsetHandlingForBFrames",
          }),
          SegmentControl: D.m({ wire: "segmentControl" }),
          SegmentLength: D.m({ wire: "segmentLength" }),
          SegmentLengthControl: D.m({ wire: "segmentLengthControl" }),
          StreamInfResolution: D.m({ wire: "streamInfResolution" }),
          TargetDurationCompatibilityMode: D.m({
            wire: "targetDurationCompatibilityMode",
          }),
          VideoCompositionOffsets: D.m({ wire: "videoCompositionOffsets" }),
          WriteDashManifest: D.m({ wire: "writeDashManifest" }),
          WriteHlsManifest: D.m({ wire: "writeHlsManifest" }),
          WriteSegmentTimelineInRepresentation: D.m({
            wire: "writeSegmentTimelineInRepresentation",
          }),
        },
      }),
      DashIsoGroupSettings: D.m({
        wire: "dashIsoGroupSettings",
        shape: {
          AdditionalManifests: D.m({
            wire: "additionalManifests",
            shape: D.list({
              ManifestNameModifier: D.m({ wire: "manifestNameModifier" }),
              SelectedOutputs: D.m({ wire: "selectedOutputs" }),
            }),
          }),
          AudioChannelConfigSchemeIdUri: D.m({
            wire: "audioChannelConfigSchemeIdUri",
          }),
          BaseUrl: D.m({ wire: "baseUrl" }),
          DashIFrameTrickPlayNameModifier: D.m({
            wire: "dashIFrameTrickPlayNameModifier",
          }),
          DashManifestStyle: D.m({ wire: "dashManifestStyle" }),
          Destination: D.m({ wire: "destination" }),
          DestinationSettings: D.m({
            wire: "destinationSettings",
            shape: i_DestinationSettings,
          }),
          Encryption: D.m({
            wire: "encryption",
            shape: {
              PlaybackDeviceCompatibility: D.m({
                wire: "playbackDeviceCompatibility",
              }),
              SpekeKeyProvider: D.m({
                wire: "spekeKeyProvider",
                shape: i_SpekeKeyProvider,
              }),
            },
          }),
          FragmentLength: D.m({ wire: "fragmentLength" }),
          HbbtvCompliance: D.m({ wire: "hbbtvCompliance" }),
          ImageBasedTrickPlay: D.m({ wire: "imageBasedTrickPlay" }),
          ImageBasedTrickPlaySettings: D.m({
            wire: "imageBasedTrickPlaySettings",
            shape: {
              IntervalCadence: D.m({ wire: "intervalCadence" }),
              ThumbnailHeight: D.m({ wire: "thumbnailHeight" }),
              ThumbnailInterval: D.m({ wire: "thumbnailInterval" }),
              ThumbnailWidth: D.m({ wire: "thumbnailWidth" }),
              TileHeight: D.m({ wire: "tileHeight" }),
              TileWidth: D.m({ wire: "tileWidth" }),
            },
          }),
          ImageBasedTrickPlayVariants: D.m({
            wire: "imageBasedTrickPlayVariants",
            shape: D.list({
              IntervalCadence: D.m({ wire: "intervalCadence" }),
              ThumbnailHeight: D.m({ wire: "thumbnailHeight" }),
              ThumbnailInterval: D.m({ wire: "thumbnailInterval" }),
              ThumbnailWidth: D.m({ wire: "thumbnailWidth" }),
              TileHeight: D.m({ wire: "tileHeight" }),
              TileWidth: D.m({ wire: "tileWidth" }),
            }),
          }),
          MinBufferTime: D.m({ wire: "minBufferTime" }),
          MinFinalSegmentLength: D.m({ wire: "minFinalSegmentLength" }),
          MpdManifestBandwidthType: D.m({ wire: "mpdManifestBandwidthType" }),
          MpdProfile: D.m({ wire: "mpdProfile" }),
          PtsOffsetHandlingForBFrames: D.m({
            wire: "ptsOffsetHandlingForBFrames",
          }),
          SegmentControl: D.m({ wire: "segmentControl" }),
          SegmentLength: D.m({ wire: "segmentLength" }),
          SegmentLengthControl: D.m({ wire: "segmentLengthControl" }),
          VideoCompositionOffsets: D.m({ wire: "videoCompositionOffsets" }),
          WriteSegmentTimelineInRepresentation: D.m({
            wire: "writeSegmentTimelineInRepresentation",
          }),
        },
      }),
      FileGroupSettings: D.m({
        wire: "fileGroupSettings",
        shape: {
          Destination: D.m({ wire: "destination" }),
          DestinationSettings: D.m({
            wire: "destinationSettings",
            shape: i_DestinationSettings,
          }),
        },
      }),
      HlsGroupSettings: D.m({
        wire: "hlsGroupSettings",
        shape: {
          AdMarkers: D.m({ wire: "adMarkers" }),
          AdditionalManifests: D.m({
            wire: "additionalManifests",
            shape: D.list({
              ManifestNameModifier: D.m({ wire: "manifestNameModifier" }),
              SelectedOutputs: D.m({ wire: "selectedOutputs" }),
            }),
          }),
          AudioOnlyHeader: D.m({ wire: "audioOnlyHeader" }),
          BaseUrl: D.m({ wire: "baseUrl" }),
          CaptionLanguageMappings: D.m({
            wire: "captionLanguageMappings",
            shape: D.list({
              CaptionChannel: D.m({ wire: "captionChannel" }),
              CustomLanguageCode: D.m({ wire: "customLanguageCode" }),
              LanguageCode: D.m({ wire: "languageCode" }),
              LanguageDescription: D.m({ wire: "languageDescription" }),
            }),
          }),
          CaptionLanguageSetting: D.m({ wire: "captionLanguageSetting" }),
          CaptionSegmentLengthControl: D.m({
            wire: "captionSegmentLengthControl",
          }),
          ClientCache: D.m({ wire: "clientCache" }),
          CodecSpecification: D.m({ wire: "codecSpecification" }),
          Destination: D.m({ wire: "destination" }),
          DestinationSettings: D.m({
            wire: "destinationSettings",
            shape: i_DestinationSettings,
          }),
          DirectoryStructure: D.m({ wire: "directoryStructure" }),
          Encryption: D.m({
            wire: "encryption",
            shape: {
              ConstantInitializationVector: D.m({
                wire: "constantInitializationVector",
              }),
              EncryptionMethod: D.m({ wire: "encryptionMethod" }),
              InitializationVectorInManifest: D.m({
                wire: "initializationVectorInManifest",
              }),
              OfflineEncrypted: D.m({ wire: "offlineEncrypted" }),
              SpekeKeyProvider: D.m({
                wire: "spekeKeyProvider",
                shape: i_SpekeKeyProvider,
              }),
              StaticKeyProvider: D.m({
                wire: "staticKeyProvider",
                shape: i_StaticKeyProvider,
              }),
              Type: D.m({ wire: "type" }),
            },
          }),
          ImageBasedTrickPlay: D.m({ wire: "imageBasedTrickPlay" }),
          ImageBasedTrickPlaySettings: D.m({
            wire: "imageBasedTrickPlaySettings",
            shape: {
              IntervalCadence: D.m({ wire: "intervalCadence" }),
              ThumbnailHeight: D.m({ wire: "thumbnailHeight" }),
              ThumbnailInterval: D.m({ wire: "thumbnailInterval" }),
              ThumbnailWidth: D.m({ wire: "thumbnailWidth" }),
              TileHeight: D.m({ wire: "tileHeight" }),
              TileWidth: D.m({ wire: "tileWidth" }),
            },
          }),
          ImageBasedTrickPlayVariants: D.m({
            wire: "imageBasedTrickPlayVariants",
            shape: D.list({
              IntervalCadence: D.m({ wire: "intervalCadence" }),
              ThumbnailHeight: D.m({ wire: "thumbnailHeight" }),
              ThumbnailInterval: D.m({ wire: "thumbnailInterval" }),
              ThumbnailWidth: D.m({ wire: "thumbnailWidth" }),
              TileHeight: D.m({ wire: "tileHeight" }),
              TileWidth: D.m({ wire: "tileWidth" }),
            }),
          }),
          ManifestCompression: D.m({ wire: "manifestCompression" }),
          ManifestDurationFormat: D.m({ wire: "manifestDurationFormat" }),
          MinFinalSegmentLength: D.m({ wire: "minFinalSegmentLength" }),
          MinSegmentLength: D.m({ wire: "minSegmentLength" }),
          OutputSelection: D.m({ wire: "outputSelection" }),
          ProgramDateTime: D.m({ wire: "programDateTime" }),
          ProgramDateTimePeriod: D.m({ wire: "programDateTimePeriod" }),
          ProgressiveWriteHlsManifest: D.m({
            wire: "progressiveWriteHlsManifest",
          }),
          SegmentControl: D.m({ wire: "segmentControl" }),
          SegmentLength: D.m({ wire: "segmentLength" }),
          SegmentLengthControl: D.m({ wire: "segmentLengthControl" }),
          SegmentsPerSubdirectory: D.m({ wire: "segmentsPerSubdirectory" }),
          StreamInfResolution: D.m({ wire: "streamInfResolution" }),
          TargetDurationCompatibilityMode: D.m({
            wire: "targetDurationCompatibilityMode",
          }),
          TimedMetadataId3Frame: D.m({ wire: "timedMetadataId3Frame" }),
          TimedMetadataId3Period: D.m({ wire: "timedMetadataId3Period" }),
          TimestampDeltaMilliseconds: D.m({
            wire: "timestampDeltaMilliseconds",
          }),
        },
      }),
      MsSmoothGroupSettings: D.m({
        wire: "msSmoothGroupSettings",
        shape: {
          AdditionalManifests: D.m({
            wire: "additionalManifests",
            shape: D.list({
              ManifestNameModifier: D.m({ wire: "manifestNameModifier" }),
              SelectedOutputs: D.m({ wire: "selectedOutputs" }),
            }),
          }),
          AudioDeduplication: D.m({ wire: "audioDeduplication" }),
          Destination: D.m({ wire: "destination" }),
          DestinationSettings: D.m({
            wire: "destinationSettings",
            shape: i_DestinationSettings,
          }),
          Encryption: D.m({
            wire: "encryption",
            shape: {
              SpekeKeyProvider: D.m({
                wire: "spekeKeyProvider",
                shape: i_SpekeKeyProvider,
              }),
            },
          }),
          FragmentLength: D.m({ wire: "fragmentLength" }),
          FragmentLengthControl: D.m({ wire: "fragmentLengthControl" }),
          ManifestEncoding: D.m({ wire: "manifestEncoding" }),
        },
      }),
      PerFrameMetrics: D.m({ wire: "perFrameMetrics" }),
      Type: D.m({ wire: "type" }),
    },
  }),
  Outputs: D.m({
    wire: "outputs",
    shape: D.list({
      AudioDescriptions: D.m({
        wire: "audioDescriptions",
        shape: D.list(i_AudioDescription),
      }),
      CaptionDescriptions: D.m({
        wire: "captionDescriptions",
        shape: D.list({
          CaptionSelectorName: D.m({ wire: "captionSelectorName" }),
          CustomLanguageCode: D.m({ wire: "customLanguageCode" }),
          DestinationSettings: D.m({
            wire: "destinationSettings",
            shape: i_CaptionDestinationSettings,
          }),
          LanguageCode: D.m({ wire: "languageCode" }),
          LanguageDescription: D.m({ wire: "languageDescription" }),
        }),
      }),
      ContainerSettings: D.m({
        wire: "containerSettings",
        shape: i_ContainerSettings,
      }),
      Extension: D.m({ wire: "extension" }),
      NameModifier: D.m({ wire: "nameModifier" }),
      OutputSettings: D.m({
        wire: "outputSettings",
        shape: {
          HlsSettings: D.m({
            wire: "hlsSettings",
            shape: {
              AudioGroupId: D.m({ wire: "audioGroupId" }),
              AudioOnlyContainer: D.m({ wire: "audioOnlyContainer" }),
              AudioRenditionSets: D.m({ wire: "audioRenditionSets" }),
              AudioTrackType: D.m({ wire: "audioTrackType" }),
              DescriptiveVideoServiceFlag: D.m({
                wire: "descriptiveVideoServiceFlag",
              }),
              IFrameOnlyManifest: D.m({ wire: "iFrameOnlyManifest" }),
              SegmentModifier: D.m({ wire: "segmentModifier" }),
            },
          }),
        },
      }),
      Preset: D.m({ wire: "preset" }),
      VideoDescription: D.m({
        wire: "videoDescription",
        shape: i_VideoDescription,
      }),
    }),
  }),
});
const i_PresetSettings: D.LazyStruct = () => ({
  AudioDescriptions: D.m({
    wire: "audioDescriptions",
    shape: D.list(i_AudioDescription),
  }),
  CaptionDescriptions: D.m({
    wire: "captionDescriptions",
    shape: D.list({
      CustomLanguageCode: D.m({ wire: "customLanguageCode" }),
      DestinationSettings: D.m({
        wire: "destinationSettings",
        shape: i_CaptionDestinationSettings,
      }),
      LanguageCode: D.m({ wire: "languageCode" }),
      LanguageDescription: D.m({ wire: "languageDescription" }),
    }),
  }),
  ContainerSettings: D.m({
    wire: "containerSettings",
    shape: i_ContainerSettings,
  }),
  VideoDescription: D.m({
    wire: "videoDescription",
    shape: i_VideoDescription,
  }),
});
const i_Rectangle: D.LazyStruct = () => ({
  Height: D.m({ wire: "height" }),
  Width: D.m({ wire: "width" }),
  X: D.m({ wire: "x" }),
  Y: D.m({ wire: "y" }),
});
const i_ReservationPlanSettings: D.LazyStruct = () => ({
  Commitment: D.m({ wire: "commitment" }),
  RenewalType: D.m({ wire: "renewalType" }),
  ReservedSlots: D.m({ wire: "reservedSlots" }),
});
const i_TimecodeConfig: D.LazyStruct = () => ({
  Anchor: D.m({ wire: "anchor" }),
  Source: D.m({ wire: "source" }),
  Start: D.m({ wire: "start" }),
  TimestampOffset: D.m({ wire: "timestampOffset" }),
});
const i_TimedMetadataInsertion: D.LazyStruct = () => ({
  Id3Insertions: D.m({
    wire: "id3Insertions",
    shape: D.list({
      Id3: D.m({ wire: "id3" }),
      Timecode: D.m({ wire: "timecode" }),
    }),
  }),
});
const i_VideoOverlay: D.LazyStruct = () => ({
  Crop: D.m({
    wire: "crop",
    shape: {
      Height: D.m({ wire: "height" }),
      Unit: D.m({ wire: "unit" }),
      Width: D.m({ wire: "width" }),
      X: D.m({ wire: "x" }),
      Y: D.m({ wire: "y" }),
    },
  }),
  EndTimecode: D.m({ wire: "endTimecode" }),
  InitialPosition: D.m({
    wire: "initialPosition",
    shape: i_VideoOverlayPosition,
  }),
  Input: D.m({
    wire: "input",
    shape: {
      AudioSelectors: D.m({
        wire: "audioSelectors",
        shape: D.map(i_AudioSelector),
      }),
      FileInput: D.m({ wire: "fileInput" }),
      InputClippings: D.m({
        wire: "inputClippings",
        shape: D.list({
          EndTimecode: D.m({ wire: "endTimecode" }),
          StartTimecode: D.m({ wire: "startTimecode" }),
        }),
      }),
      TimecodeSource: D.m({ wire: "timecodeSource" }),
      TimecodeStart: D.m({ wire: "timecodeStart" }),
    },
  }),
  Playback: D.m({ wire: "playback" }),
  StartTimecode: D.m({ wire: "startTimecode" }),
  Transitions: D.m({
    wire: "transitions",
    shape: D.list({
      EndPosition: D.m({ wire: "endPosition", shape: i_VideoOverlayPosition }),
      EndTimecode: D.m({ wire: "endTimecode" }),
      StartTimecode: D.m({ wire: "startTimecode" }),
    }),
  }),
});
const i_VideoSelector: D.LazyStruct = () => ({
  AlphaBehavior: D.m({ wire: "alphaBehavior" }),
  ColorSpace: D.m({ wire: "colorSpace" }),
  ColorSpaceUsage: D.m({ wire: "colorSpaceUsage" }),
  EmbeddedTimecodeOverride: D.m({ wire: "embeddedTimecodeOverride" }),
  Hdr10Metadata: D.m({ wire: "hdr10Metadata", shape: i_Hdr10Metadata }),
  MaxLuminance: D.m({ wire: "maxLuminance" }),
  PadVideo: D.m({ wire: "padVideo" }),
  Pid: D.m({ wire: "pid" }),
  ProgramNumber: D.m({ wire: "programNumber" }),
  Rotate: D.m({ wire: "rotate" }),
  SampleRange: D.m({ wire: "sampleRange" }),
  SelectorType: D.m({ wire: "selectorType" }),
  Streams: D.m({ wire: "streams" }),
});
const o_ContentLightLevel: D.LazyStruct = () => ({
  MaxContentLightLevel: D.m({ wire: "maxContentLightLevel" }),
  MaxFrameAverageLightLevel: D.m({ wire: "maxFrameAverageLightLevel" }),
});
const o_FrameRate: D.LazyStruct = () => ({
  Denominator: D.m({ wire: "denominator" }),
  Numerator: D.m({ wire: "numerator" }),
});
const o_Job: D.LazyStruct = () => ({
  AccelerationSettings: D.m({
    wire: "accelerationSettings",
    shape: o_AccelerationSettings,
  }),
  AccelerationStatus: D.m({ wire: "accelerationStatus" }),
  Arn: D.m({ wire: "arn" }),
  BillingTagsSource: D.m({ wire: "billingTagsSource" }),
  ClientRequestToken: D.m({ wire: "clientRequestToken" }),
  CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
  CurrentPhase: D.m({ wire: "currentPhase" }),
  ElementalInferenceConfiguration: D.m({
    wire: "elementalInferenceConfiguration",
    shape: {
      Features: D.m({ wire: "features" }),
      Feeds: D.m({
        wire: "feeds",
        shape: D.list({
          Arn: D.m({ wire: "arn" }),
          FeedManagementState: D.m({ wire: "feedManagementState" }),
        }),
      }),
    },
  }),
  ErrorCode: D.m({ wire: "errorCode" }),
  ErrorMessage: D.m({ wire: "errorMessage" }),
  HopDestinations: D.m({
    wire: "hopDestinations",
    shape: D.list(o_HopDestination),
  }),
  Id: D.m({ wire: "id" }),
  JobEngineVersionRequested: D.m({ wire: "jobEngineVersionRequested" }),
  JobEngineVersionUsed: D.m({ wire: "jobEngineVersionUsed" }),
  JobPercentComplete: D.m({ wire: "jobPercentComplete" }),
  JobTemplate: D.m({ wire: "jobTemplate" }),
  LastShareDetails: D.m({ wire: "lastShareDetails" }),
  Messages: D.m({
    wire: "messages",
    shape: { Info: D.m({ wire: "info" }), Warning: D.m({ wire: "warning" }) },
  }),
  OutputGroupDetails: D.m({
    wire: "outputGroupDetails",
    shape: D.list({
      OutputDetails: D.m({
        wire: "outputDetails",
        shape: D.list({
          DurationInMs: D.m({ wire: "durationInMs" }),
          VideoDetails: D.m({
            wire: "videoDetails",
            shape: {
              HeightInPx: D.m({ wire: "heightInPx" }),
              WidthInPx: D.m({ wire: "widthInPx" }),
            },
          }),
        }),
      }),
    }),
  }),
  Priority: D.m({ wire: "priority" }),
  Queue: D.m({ wire: "queue" }),
  QueueTransitions: D.m({
    wire: "queueTransitions",
    shape: D.list({
      DestinationQueue: D.m({ wire: "destinationQueue" }),
      SourceQueue: D.m({ wire: "sourceQueue" }),
      Timestamp: D.m({ wire: "timestamp", shape: D.ts }),
    }),
  }),
  RetryCount: D.m({ wire: "retryCount" }),
  Role: D.m({ wire: "role" }),
  Settings: D.m({
    wire: "settings",
    shape: {
      AdAvailOffset: D.m({ wire: "adAvailOffset" }),
      AvailBlanking: D.m({ wire: "availBlanking", shape: o_AvailBlanking }),
      ColorConversion3DLUTSettings: D.m({
        wire: "colorConversion3DLUTSettings",
        shape: D.list(o_ColorConversion3DLUTSetting),
      }),
      Esam: D.m({ wire: "esam", shape: o_EsamSettings }),
      ExtendedDataServices: D.m({
        wire: "extendedDataServices",
        shape: o_ExtendedDataServices,
      }),
      FollowSource: D.m({ wire: "followSource" }),
      Inputs: D.m({
        wire: "inputs",
        shape: D.list({
          AdvancedInputFilter: D.m({ wire: "advancedInputFilter" }),
          AdvancedInputFilterSettings: D.m({
            wire: "advancedInputFilterSettings",
            shape: o_AdvancedInputFilterSettings,
          }),
          AudioSelectorGroups: D.m({
            wire: "audioSelectorGroups",
            shape: D.map(o_AudioSelectorGroup),
          }),
          AudioSelectors: D.m({
            wire: "audioSelectors",
            shape: D.map(o_AudioSelector),
          }),
          CaptionSelectors: D.m({
            wire: "captionSelectors",
            shape: D.map(o_CaptionSelector),
          }),
          Crop: D.m({ wire: "crop", shape: o_Rectangle }),
          DeblockFilter: D.m({ wire: "deblockFilter" }),
          DecryptionSettings: D.m({
            wire: "decryptionSettings",
            shape: {
              DecryptionMode: D.m({ wire: "decryptionMode" }),
              EncryptedDecryptionKey: D.m({ wire: "encryptedDecryptionKey" }),
              InitializationVector: D.m({ wire: "initializationVector" }),
              KmsKeyRegion: D.m({ wire: "kmsKeyRegion" }),
            },
          }),
          DenoiseFilter: D.m({ wire: "denoiseFilter" }),
          DolbyVisionMetadataXml: D.m({ wire: "dolbyVisionMetadataXml" }),
          DynamicAudioSelectors: D.m({
            wire: "dynamicAudioSelectors",
            shape: D.map(o_DynamicAudioSelector),
          }),
          FileInput: D.m({ wire: "fileInput" }),
          FilterEnable: D.m({ wire: "filterEnable" }),
          FilterStrength: D.m({ wire: "filterStrength" }),
          ImageInserter: D.m({ wire: "imageInserter", shape: o_ImageInserter }),
          InputClippings: D.m({
            wire: "inputClippings",
            shape: D.list(o_InputClipping),
          }),
          InputScanType: D.m({ wire: "inputScanType" }),
          MultiViewSettings: D.m({
            wire: "multiViewSettings",
            shape: D.list(o_MultiViewSettings),
          }),
          Position: D.m({ wire: "position", shape: o_Rectangle }),
          ProgramNumber: D.m({ wire: "programNumber" }),
          PsiControl: D.m({ wire: "psiControl" }),
          SupplementalImps: D.m({ wire: "supplementalImps" }),
          TamsSettings: D.m({
            wire: "tamsSettings",
            shape: {
              AuthConnectionArn: D.m({ wire: "authConnectionArn" }),
              GapHandling: D.m({ wire: "gapHandling" }),
              SourceId: D.m({ wire: "sourceId" }),
              Timerange: D.m({ wire: "timerange" }),
            },
          }),
          TimecodeSource: D.m({ wire: "timecodeSource" }),
          TimecodeStart: D.m({ wire: "timecodeStart" }),
          VideoGenerator: D.m({
            wire: "videoGenerator",
            shape: {
              Channels: D.m({ wire: "channels" }),
              Duration: D.m({ wire: "duration" }),
              FramerateDenominator: D.m({ wire: "framerateDenominator" }),
              FramerateNumerator: D.m({ wire: "framerateNumerator" }),
              Height: D.m({ wire: "height" }),
              ImageInput: D.m({ wire: "imageInput" }),
              SampleRate: D.m({ wire: "sampleRate" }),
              Width: D.m({ wire: "width" }),
            },
          }),
          VideoOverlays: D.m({
            wire: "videoOverlays",
            shape: D.list(o_VideoOverlay),
          }),
          VideoSelector: D.m({ wire: "videoSelector", shape: o_VideoSelector }),
        }),
      }),
      KantarWatermark: D.m({
        wire: "kantarWatermark",
        shape: o_KantarWatermarkSettings,
      }),
      MotionImageInserter: D.m({
        wire: "motionImageInserter",
        shape: o_MotionImageInserter,
      }),
      NielsenConfiguration: D.m({
        wire: "nielsenConfiguration",
        shape: o_NielsenConfiguration,
      }),
      NielsenNonLinearWatermark: D.m({
        wire: "nielsenNonLinearWatermark",
        shape: o_NielsenNonLinearWatermarkSettings,
      }),
      OutputGroups: D.m({ wire: "outputGroups", shape: D.list(o_OutputGroup) }),
      TimecodeConfig: D.m({ wire: "timecodeConfig", shape: o_TimecodeConfig }),
      TimedMetadataInsertion: D.m({
        wire: "timedMetadataInsertion",
        shape: o_TimedMetadataInsertion,
      }),
    },
  }),
  ShareStatus: D.m({ wire: "shareStatus" }),
  SimulateReservedQueue: D.m({ wire: "simulateReservedQueue" }),
  Status: D.m({ wire: "status" }),
  StatusUpdateInterval: D.m({ wire: "statusUpdateInterval" }),
  Timing: D.m({
    wire: "timing",
    shape: {
      FinishTime: D.m({ wire: "finishTime", shape: D.ts }),
      StartTime: D.m({ wire: "startTime", shape: D.ts }),
      SubmitTime: D.m({ wire: "submitTime", shape: D.ts }),
    },
  }),
  UserMetadata: D.m({ wire: "userMetadata" }),
  Warnings: D.m({
    wire: "warnings",
    shape: D.list({
      Code: D.m({ wire: "code" }),
      Count: D.m({ wire: "count" }),
    }),
  }),
});
const o_JobTemplate: D.LazyStruct = () => ({
  AccelerationSettings: D.m({
    wire: "accelerationSettings",
    shape: o_AccelerationSettings,
  }),
  Arn: D.m({ wire: "arn" }),
  Category: D.m({ wire: "category" }),
  CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
  Description: D.m({ wire: "description" }),
  HopDestinations: D.m({
    wire: "hopDestinations",
    shape: D.list(o_HopDestination),
  }),
  LastUpdated: D.m({ wire: "lastUpdated", shape: D.ts }),
  Name: D.m({ wire: "name" }),
  Priority: D.m({ wire: "priority" }),
  Queue: D.m({ wire: "queue" }),
  Settings: D.m({
    wire: "settings",
    shape: {
      AdAvailOffset: D.m({ wire: "adAvailOffset" }),
      AvailBlanking: D.m({ wire: "availBlanking", shape: o_AvailBlanking }),
      ColorConversion3DLUTSettings: D.m({
        wire: "colorConversion3DLUTSettings",
        shape: D.list(o_ColorConversion3DLUTSetting),
      }),
      Esam: D.m({ wire: "esam", shape: o_EsamSettings }),
      ExtendedDataServices: D.m({
        wire: "extendedDataServices",
        shape: o_ExtendedDataServices,
      }),
      FollowSource: D.m({ wire: "followSource" }),
      Inputs: D.m({
        wire: "inputs",
        shape: D.list({
          AdvancedInputFilter: D.m({ wire: "advancedInputFilter" }),
          AdvancedInputFilterSettings: D.m({
            wire: "advancedInputFilterSettings",
            shape: o_AdvancedInputFilterSettings,
          }),
          AudioSelectorGroups: D.m({
            wire: "audioSelectorGroups",
            shape: D.map(o_AudioSelectorGroup),
          }),
          AudioSelectors: D.m({
            wire: "audioSelectors",
            shape: D.map(o_AudioSelector),
          }),
          CaptionSelectors: D.m({
            wire: "captionSelectors",
            shape: D.map(o_CaptionSelector),
          }),
          Crop: D.m({ wire: "crop", shape: o_Rectangle }),
          DeblockFilter: D.m({ wire: "deblockFilter" }),
          DenoiseFilter: D.m({ wire: "denoiseFilter" }),
          DolbyVisionMetadataXml: D.m({ wire: "dolbyVisionMetadataXml" }),
          DynamicAudioSelectors: D.m({
            wire: "dynamicAudioSelectors",
            shape: D.map(o_DynamicAudioSelector),
          }),
          FilterEnable: D.m({ wire: "filterEnable" }),
          FilterStrength: D.m({ wire: "filterStrength" }),
          ImageInserter: D.m({ wire: "imageInserter", shape: o_ImageInserter }),
          InputClippings: D.m({
            wire: "inputClippings",
            shape: D.list(o_InputClipping),
          }),
          InputScanType: D.m({ wire: "inputScanType" }),
          MultiViewSettings: D.m({
            wire: "multiViewSettings",
            shape: D.list(o_MultiViewSettings),
          }),
          Position: D.m({ wire: "position", shape: o_Rectangle }),
          ProgramNumber: D.m({ wire: "programNumber" }),
          PsiControl: D.m({ wire: "psiControl" }),
          TimecodeSource: D.m({ wire: "timecodeSource" }),
          TimecodeStart: D.m({ wire: "timecodeStart" }),
          VideoOverlays: D.m({
            wire: "videoOverlays",
            shape: D.list(o_VideoOverlay),
          }),
          VideoSelector: D.m({ wire: "videoSelector", shape: o_VideoSelector }),
        }),
      }),
      KantarWatermark: D.m({
        wire: "kantarWatermark",
        shape: o_KantarWatermarkSettings,
      }),
      MotionImageInserter: D.m({
        wire: "motionImageInserter",
        shape: o_MotionImageInserter,
      }),
      NielsenConfiguration: D.m({
        wire: "nielsenConfiguration",
        shape: o_NielsenConfiguration,
      }),
      NielsenNonLinearWatermark: D.m({
        wire: "nielsenNonLinearWatermark",
        shape: o_NielsenNonLinearWatermarkSettings,
      }),
      OutputGroups: D.m({ wire: "outputGroups", shape: D.list(o_OutputGroup) }),
      TimecodeConfig: D.m({ wire: "timecodeConfig", shape: o_TimecodeConfig }),
      TimedMetadataInsertion: D.m({
        wire: "timedMetadataInsertion",
        shape: o_TimedMetadataInsertion,
      }),
    },
  }),
  StatusUpdateInterval: D.m({ wire: "statusUpdateInterval" }),
  Type: D.m({ wire: "type" }),
});
const o_Policy: D.LazyStruct = () => ({
  HttpInputs: D.m({ wire: "httpInputs" }),
  HttpsInputs: D.m({ wire: "httpsInputs" }),
  S3Inputs: D.m({ wire: "s3Inputs" }),
});
const o_Preset: D.LazyStruct = () => ({
  Arn: D.m({ wire: "arn" }),
  Category: D.m({ wire: "category" }),
  CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
  Description: D.m({ wire: "description" }),
  LastUpdated: D.m({ wire: "lastUpdated", shape: D.ts }),
  Name: D.m({ wire: "name" }),
  Settings: D.m({
    wire: "settings",
    shape: {
      AudioDescriptions: D.m({
        wire: "audioDescriptions",
        shape: D.list(o_AudioDescription),
      }),
      CaptionDescriptions: D.m({
        wire: "captionDescriptions",
        shape: D.list({
          CustomLanguageCode: D.m({ wire: "customLanguageCode" }),
          DestinationSettings: D.m({
            wire: "destinationSettings",
            shape: o_CaptionDestinationSettings,
          }),
          LanguageCode: D.m({ wire: "languageCode" }),
          LanguageDescription: D.m({ wire: "languageDescription" }),
        }),
      }),
      ContainerSettings: D.m({
        wire: "containerSettings",
        shape: o_ContainerSettings,
      }),
      VideoDescription: D.m({
        wire: "videoDescription",
        shape: o_VideoDescription,
      }),
    },
  }),
  Type: D.m({ wire: "type" }),
});
const o_Queue: D.LazyStruct = () => ({
  Arn: D.m({ wire: "arn" }),
  ConcurrentJobs: D.m({ wire: "concurrentJobs" }),
  CreatedAt: D.m({ wire: "createdAt", shape: D.ts }),
  Description: D.m({ wire: "description" }),
  LastUpdated: D.m({ wire: "lastUpdated", shape: D.ts }),
  MaximumConcurrentFeeds: D.m({ wire: "maximumConcurrentFeeds" }),
  Name: D.m({ wire: "name" }),
  PricingPlan: D.m({ wire: "pricingPlan" }),
  ProgressingJobsCount: D.m({ wire: "progressingJobsCount" }),
  ReservationPlan: D.m({
    wire: "reservationPlan",
    shape: {
      Commitment: D.m({ wire: "commitment" }),
      ExpiresAt: D.m({ wire: "expiresAt", shape: D.ts }),
      PurchasedAt: D.m({ wire: "purchasedAt", shape: D.ts }),
      RenewalType: D.m({ wire: "renewalType" }),
      ReservedSlots: D.m({ wire: "reservedSlots" }),
      Status: D.m({ wire: "status" }),
    },
  }),
  ServiceOverrides: D.m({
    wire: "serviceOverrides",
    shape: D.list({
      Message: D.m({ wire: "message" }),
      Name: D.m({ wire: "name" }),
      OverrideValue: D.m({ wire: "overrideValue" }),
      Value: D.m({ wire: "value" }),
    }),
  }),
  Status: D.m({ wire: "status" }),
  SubmittedJobsCount: D.m({ wire: "submittedJobsCount" }),
  Type: D.m({ wire: "type" }),
});
const i_AudioDescription: D.LazyStruct = () => ({
  AudioChannelTaggingSettings: D.m({
    wire: "audioChannelTaggingSettings",
    shape: {
      ChannelTag: D.m({ wire: "channelTag" }),
      ChannelTags: D.m({ wire: "channelTags" }),
    },
  }),
  AudioNormalizationSettings: D.m({
    wire: "audioNormalizationSettings",
    shape: {
      Algorithm: D.m({ wire: "algorithm" }),
      AlgorithmControl: D.m({ wire: "algorithmControl" }),
      CorrectionGateLevel: D.m({ wire: "correctionGateLevel" }),
      LoudnessLogging: D.m({ wire: "loudnessLogging" }),
      PeakCalculation: D.m({ wire: "peakCalculation" }),
      TargetLkfs: D.m({ wire: "targetLkfs" }),
      TruePeakLimiterThreshold: D.m({ wire: "truePeakLimiterThreshold" }),
    },
  }),
  AudioPitchCorrectionSettings: D.m({
    wire: "audioPitchCorrectionSettings",
    shape: { SlowPalPitchCorrection: D.m({ wire: "slowPalPitchCorrection" }) },
  }),
  AudioSourceName: D.m({ wire: "audioSourceName" }),
  AudioType: D.m({ wire: "audioType" }),
  AudioTypeControl: D.m({ wire: "audioTypeControl" }),
  CodecSettings: D.m({
    wire: "codecSettings",
    shape: {
      AacSettings: D.m({
        wire: "aacSettings",
        shape: {
          AudioDescriptionBroadcasterMix: D.m({
            wire: "audioDescriptionBroadcasterMix",
          }),
          Bitrate: D.m({ wire: "bitrate" }),
          CodecProfile: D.m({ wire: "codecProfile" }),
          CodingMode: D.m({ wire: "codingMode" }),
          LoudnessMeasurementMode: D.m({ wire: "loudnessMeasurementMode" }),
          RapInterval: D.m({ wire: "rapInterval" }),
          RateControlMode: D.m({ wire: "rateControlMode" }),
          RawFormat: D.m({ wire: "rawFormat" }),
          SampleRate: D.m({ wire: "sampleRate" }),
          Specification: D.m({ wire: "specification" }),
          TargetLoudnessRange: D.m({ wire: "targetLoudnessRange" }),
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
          DynamicRangeCompressionLine: D.m({
            wire: "dynamicRangeCompressionLine",
          }),
          DynamicRangeCompressionProfile: D.m({
            wire: "dynamicRangeCompressionProfile",
          }),
          DynamicRangeCompressionRf: D.m({ wire: "dynamicRangeCompressionRf" }),
          LfeFilter: D.m({ wire: "lfeFilter" }),
          MetadataControl: D.m({ wire: "metadataControl" }),
          SampleRate: D.m({ wire: "sampleRate" }),
        },
      }),
      Ac4Settings: D.m({
        wire: "ac4Settings",
        shape: {
          Bitrate: D.m({ wire: "bitrate" }),
          BitstreamMode: D.m({ wire: "bitstreamMode" }),
          CodingMode: D.m({ wire: "codingMode" }),
          DynamicRangeCompressionFlatPanelTv: D.m({
            wire: "dynamicRangeCompressionFlatPanelTv",
          }),
          DynamicRangeCompressionHomeTheater: D.m({
            wire: "dynamicRangeCompressionHomeTheater",
          }),
          DynamicRangeCompressionPortableHeadphones: D.m({
            wire: "dynamicRangeCompressionPortableHeadphones",
          }),
          DynamicRangeCompressionPortableSpeakers: D.m({
            wire: "dynamicRangeCompressionPortableSpeakers",
          }),
          LoRoCenterMixLevel: D.m({ wire: "loRoCenterMixLevel" }),
          LoRoSurroundMixLevel: D.m({ wire: "loRoSurroundMixLevel" }),
          LtRtCenterMixLevel: D.m({ wire: "ltRtCenterMixLevel" }),
          LtRtSurroundMixLevel: D.m({ wire: "ltRtSurroundMixLevel" }),
          SampleRate: D.m({ wire: "sampleRate" }),
          StereoDownmix: D.m({ wire: "stereoDownmix" }),
        },
      }),
      AiffSettings: D.m({
        wire: "aiffSettings",
        shape: {
          BitDepth: D.m({ wire: "bitDepth" }),
          Channels: D.m({ wire: "channels" }),
          SampleRate: D.m({ wire: "sampleRate" }),
        },
      }),
      Codec: D.m({ wire: "codec" }),
      Eac3AtmosSettings: D.m({
        wire: "eac3AtmosSettings",
        shape: {
          Bitrate: D.m({ wire: "bitrate" }),
          BitstreamMode: D.m({ wire: "bitstreamMode" }),
          CodingMode: D.m({ wire: "codingMode" }),
          DialogueIntelligence: D.m({ wire: "dialogueIntelligence" }),
          DownmixControl: D.m({ wire: "downmixControl" }),
          DynamicRangeCompressionLine: D.m({
            wire: "dynamicRangeCompressionLine",
          }),
          DynamicRangeCompressionRf: D.m({ wire: "dynamicRangeCompressionRf" }),
          DynamicRangeControl: D.m({ wire: "dynamicRangeControl" }),
          LoRoCenterMixLevel: D.m({ wire: "loRoCenterMixLevel" }),
          LoRoSurroundMixLevel: D.m({ wire: "loRoSurroundMixLevel" }),
          LtRtCenterMixLevel: D.m({ wire: "ltRtCenterMixLevel" }),
          LtRtSurroundMixLevel: D.m({ wire: "ltRtSurroundMixLevel" }),
          MeteringMode: D.m({ wire: "meteringMode" }),
          SampleRate: D.m({ wire: "sampleRate" }),
          SpeechThreshold: D.m({ wire: "speechThreshold" }),
          StereoDownmix: D.m({ wire: "stereoDownmix" }),
          SurroundExMode: D.m({ wire: "surroundExMode" }),
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
          DynamicRangeCompressionLine: D.m({
            wire: "dynamicRangeCompressionLine",
          }),
          DynamicRangeCompressionRf: D.m({ wire: "dynamicRangeCompressionRf" }),
          LfeControl: D.m({ wire: "lfeControl" }),
          LfeFilter: D.m({ wire: "lfeFilter" }),
          LoRoCenterMixLevel: D.m({ wire: "loRoCenterMixLevel" }),
          LoRoSurroundMixLevel: D.m({ wire: "loRoSurroundMixLevel" }),
          LtRtCenterMixLevel: D.m({ wire: "ltRtCenterMixLevel" }),
          LtRtSurroundMixLevel: D.m({ wire: "ltRtSurroundMixLevel" }),
          MetadataControl: D.m({ wire: "metadataControl" }),
          PassthroughControl: D.m({ wire: "passthroughControl" }),
          PhaseControl: D.m({ wire: "phaseControl" }),
          SampleRate: D.m({ wire: "sampleRate" }),
          StereoDownmix: D.m({ wire: "stereoDownmix" }),
          SurroundExMode: D.m({ wire: "surroundExMode" }),
          SurroundMode: D.m({ wire: "surroundMode" }),
        },
      }),
      FlacSettings: D.m({
        wire: "flacSettings",
        shape: {
          BitDepth: D.m({ wire: "bitDepth" }),
          Channels: D.m({ wire: "channels" }),
          SampleRate: D.m({ wire: "sampleRate" }),
        },
      }),
      Mp2Settings: D.m({
        wire: "mp2Settings",
        shape: {
          AudioDescriptionMix: D.m({ wire: "audioDescriptionMix" }),
          Bitrate: D.m({ wire: "bitrate" }),
          Channels: D.m({ wire: "channels" }),
          SampleRate: D.m({ wire: "sampleRate" }),
        },
      }),
      Mp3Settings: D.m({
        wire: "mp3Settings",
        shape: {
          Bitrate: D.m({ wire: "bitrate" }),
          Channels: D.m({ wire: "channels" }),
          RateControlMode: D.m({ wire: "rateControlMode" }),
          SampleRate: D.m({ wire: "sampleRate" }),
          VbrQuality: D.m({ wire: "vbrQuality" }),
        },
      }),
      OpusSettings: D.m({
        wire: "opusSettings",
        shape: {
          Bitrate: D.m({ wire: "bitrate" }),
          Channels: D.m({ wire: "channels" }),
          SampleRate: D.m({ wire: "sampleRate" }),
        },
      }),
      VorbisSettings: D.m({
        wire: "vorbisSettings",
        shape: {
          Channels: D.m({ wire: "channels" }),
          SampleRate: D.m({ wire: "sampleRate" }),
          VbrQuality: D.m({ wire: "vbrQuality" }),
        },
      }),
      WavSettings: D.m({
        wire: "wavSettings",
        shape: {
          BitDepth: D.m({ wire: "bitDepth" }),
          Channels: D.m({ wire: "channels" }),
          Format: D.m({ wire: "format" }),
          SampleRate: D.m({ wire: "sampleRate" }),
        },
      }),
    },
  }),
  CustomLanguageCode: D.m({ wire: "customLanguageCode" }),
  LanguageCode: D.m({ wire: "languageCode" }),
  LanguageCodeControl: D.m({ wire: "languageCodeControl" }),
  RemixSettings: D.m({ wire: "remixSettings", shape: i_RemixSettings }),
  StreamName: D.m({ wire: "streamName" }),
});
const i_CaptionDestinationSettings: D.LazyStruct = () => ({
  BurninDestinationSettings: D.m({
    wire: "burninDestinationSettings",
    shape: {
      Alignment: D.m({ wire: "alignment" }),
      ApplyFontColor: D.m({ wire: "applyFontColor" }),
      BackgroundColor: D.m({ wire: "backgroundColor" }),
      BackgroundOpacity: D.m({ wire: "backgroundOpacity" }),
      FallbackFont: D.m({ wire: "fallbackFont" }),
      FontColor: D.m({ wire: "fontColor" }),
      FontFileBold: D.m({ wire: "fontFileBold" }),
      FontFileBoldItalic: D.m({ wire: "fontFileBoldItalic" }),
      FontFileItalic: D.m({ wire: "fontFileItalic" }),
      FontFileRegular: D.m({ wire: "fontFileRegular" }),
      FontOpacity: D.m({ wire: "fontOpacity" }),
      FontResolution: D.m({ wire: "fontResolution" }),
      FontScript: D.m({ wire: "fontScript" }),
      FontSize: D.m({ wire: "fontSize" }),
      HexFontColor: D.m({ wire: "hexFontColor" }),
      OutlineColor: D.m({ wire: "outlineColor" }),
      OutlineSize: D.m({ wire: "outlineSize" }),
      RemoveRubyReserveAttributes: D.m({ wire: "removeRubyReserveAttributes" }),
      ShadowColor: D.m({ wire: "shadowColor" }),
      ShadowOpacity: D.m({ wire: "shadowOpacity" }),
      ShadowXOffset: D.m({ wire: "shadowXOffset" }),
      ShadowYOffset: D.m({ wire: "shadowYOffset" }),
      StylePassthrough: D.m({ wire: "stylePassthrough" }),
      TeletextSpacing: D.m({ wire: "teletextSpacing" }),
      XPosition: D.m({ wire: "xPosition" }),
      YPosition: D.m({ wire: "yPosition" }),
    },
  }),
  DestinationType: D.m({ wire: "destinationType" }),
  DvbSubDestinationSettings: D.m({
    wire: "dvbSubDestinationSettings",
    shape: {
      Alignment: D.m({ wire: "alignment" }),
      ApplyFontColor: D.m({ wire: "applyFontColor" }),
      BackgroundColor: D.m({ wire: "backgroundColor" }),
      BackgroundOpacity: D.m({ wire: "backgroundOpacity" }),
      DdsHandling: D.m({ wire: "ddsHandling" }),
      DdsXCoordinate: D.m({ wire: "ddsXCoordinate" }),
      DdsYCoordinate: D.m({ wire: "ddsYCoordinate" }),
      FallbackFont: D.m({ wire: "fallbackFont" }),
      FontColor: D.m({ wire: "fontColor" }),
      FontFileBold: D.m({ wire: "fontFileBold" }),
      FontFileBoldItalic: D.m({ wire: "fontFileBoldItalic" }),
      FontFileItalic: D.m({ wire: "fontFileItalic" }),
      FontFileRegular: D.m({ wire: "fontFileRegular" }),
      FontOpacity: D.m({ wire: "fontOpacity" }),
      FontResolution: D.m({ wire: "fontResolution" }),
      FontScript: D.m({ wire: "fontScript" }),
      FontSize: D.m({ wire: "fontSize" }),
      Height: D.m({ wire: "height" }),
      HexFontColor: D.m({ wire: "hexFontColor" }),
      OutlineColor: D.m({ wire: "outlineColor" }),
      OutlineSize: D.m({ wire: "outlineSize" }),
      ShadowColor: D.m({ wire: "shadowColor" }),
      ShadowOpacity: D.m({ wire: "shadowOpacity" }),
      ShadowXOffset: D.m({ wire: "shadowXOffset" }),
      ShadowYOffset: D.m({ wire: "shadowYOffset" }),
      StylePassthrough: D.m({ wire: "stylePassthrough" }),
      SubtitlingType: D.m({ wire: "subtitlingType" }),
      TeletextSpacing: D.m({ wire: "teletextSpacing" }),
      Width: D.m({ wire: "width" }),
      XPosition: D.m({ wire: "xPosition" }),
      YPosition: D.m({ wire: "yPosition" }),
    },
  }),
  EmbeddedDestinationSettings: D.m({
    wire: "embeddedDestinationSettings",
    shape: {
      Destination608ChannelNumber: D.m({ wire: "destination608ChannelNumber" }),
      Destination708ServiceNumber: D.m({ wire: "destination708ServiceNumber" }),
    },
  }),
  ImscDestinationSettings: D.m({
    wire: "imscDestinationSettings",
    shape: {
      Accessibility: D.m({ wire: "accessibility" }),
      StylePassthrough: D.m({ wire: "stylePassthrough" }),
    },
  }),
  SccDestinationSettings: D.m({
    wire: "sccDestinationSettings",
    shape: { Framerate: D.m({ wire: "framerate" }) },
  }),
  SrtDestinationSettings: D.m({
    wire: "srtDestinationSettings",
    shape: { StylePassthrough: D.m({ wire: "stylePassthrough" }) },
  }),
  TeletextDestinationSettings: D.m({
    wire: "teletextDestinationSettings",
    shape: {
      PageNumber: D.m({ wire: "pageNumber" }),
      PageTypes: D.m({ wire: "pageTypes" }),
    },
  }),
  TtmlDestinationSettings: D.m({
    wire: "ttmlDestinationSettings",
    shape: { StylePassthrough: D.m({ wire: "stylePassthrough" }) },
  }),
  WebvttDestinationSettings: D.m({
    wire: "webvttDestinationSettings",
    shape: {
      Accessibility: D.m({ wire: "accessibility" }),
      StylePassthrough: D.m({ wire: "stylePassthrough" }),
    },
  }),
});
const i_ContainerSettings: D.LazyStruct = () => ({
  CmfcSettings: D.m({
    wire: "cmfcSettings",
    shape: {
      AudioDuration: D.m({ wire: "audioDuration" }),
      AudioGroupId: D.m({ wire: "audioGroupId" }),
      AudioRenditionSets: D.m({ wire: "audioRenditionSets" }),
      AudioTrackType: D.m({ wire: "audioTrackType" }),
      C2paManifest: D.m({ wire: "c2paManifest" }),
      CertificateSecret: D.m({ wire: "certificateSecret" }),
      DescriptiveVideoServiceFlag: D.m({ wire: "descriptiveVideoServiceFlag" }),
      IFrameOnlyManifest: D.m({ wire: "iFrameOnlyManifest" }),
      KlvMetadata: D.m({ wire: "klvMetadata" }),
      ManifestMetadataSignaling: D.m({ wire: "manifestMetadataSignaling" }),
      Scte35Esam: D.m({ wire: "scte35Esam" }),
      Scte35Source: D.m({ wire: "scte35Source" }),
      SigningKmsKey: D.m({ wire: "signingKmsKey" }),
      TimedMetadata: D.m({ wire: "timedMetadata" }),
      TimedMetadataBoxVersion: D.m({ wire: "timedMetadataBoxVersion" }),
      TimedMetadataSchemeIdUri: D.m({ wire: "timedMetadataSchemeIdUri" }),
      TimedMetadataValue: D.m({ wire: "timedMetadataValue" }),
    },
  }),
  Container: D.m({ wire: "container" }),
  F4vSettings: D.m({
    wire: "f4vSettings",
    shape: { MoovPlacement: D.m({ wire: "moovPlacement" }) },
  }),
  M2tsSettings: D.m({
    wire: "m2tsSettings",
    shape: {
      AudioBufferModel: D.m({ wire: "audioBufferModel" }),
      AudioDuration: D.m({ wire: "audioDuration" }),
      AudioFramesPerPes: D.m({ wire: "audioFramesPerPes" }),
      AudioPids: D.m({ wire: "audioPids" }),
      AudioPtsOffsetDelta: D.m({ wire: "audioPtsOffsetDelta" }),
      Bitrate: D.m({ wire: "bitrate" }),
      BufferModel: D.m({ wire: "bufferModel" }),
      DataPTSControl: D.m({ wire: "dataPTSControl" }),
      DvbNitSettings: D.m({
        wire: "dvbNitSettings",
        shape: {
          NetworkId: D.m({ wire: "networkId" }),
          NetworkName: D.m({ wire: "networkName" }),
          NitInterval: D.m({ wire: "nitInterval" }),
        },
      }),
      DvbSdtSettings: D.m({
        wire: "dvbSdtSettings",
        shape: {
          OutputSdt: D.m({ wire: "outputSdt" }),
          SdtInterval: D.m({ wire: "sdtInterval" }),
          ServiceName: D.m({ wire: "serviceName" }),
          ServiceProviderName: D.m({ wire: "serviceProviderName" }),
        },
      }),
      DvbSubPids: D.m({ wire: "dvbSubPids" }),
      DvbTdtSettings: D.m({
        wire: "dvbTdtSettings",
        shape: { TdtInterval: D.m({ wire: "tdtInterval" }) },
      }),
      DvbTeletextPid: D.m({ wire: "dvbTeletextPid" }),
      EbpAudioInterval: D.m({ wire: "ebpAudioInterval" }),
      EbpPlacement: D.m({ wire: "ebpPlacement" }),
      EsRateInPes: D.m({ wire: "esRateInPes" }),
      ForceTsVideoEbpOrder: D.m({ wire: "forceTsVideoEbpOrder" }),
      FragmentTime: D.m({ wire: "fragmentTime" }),
      KlvMetadata: D.m({ wire: "klvMetadata" }),
      MaxPcrInterval: D.m({ wire: "maxPcrInterval" }),
      MinEbpInterval: D.m({ wire: "minEbpInterval" }),
      NielsenId3: D.m({ wire: "nielsenId3" }),
      NullPacketBitrate: D.m({ wire: "nullPacketBitrate" }),
      PatInterval: D.m({ wire: "patInterval" }),
      PcrControl: D.m({ wire: "pcrControl" }),
      PcrPid: D.m({ wire: "pcrPid" }),
      PmtInterval: D.m({ wire: "pmtInterval" }),
      PmtPid: D.m({ wire: "pmtPid" }),
      PreventBufferUnderflow: D.m({ wire: "preventBufferUnderflow" }),
      PrivateMetadataPid: D.m({ wire: "privateMetadataPid" }),
      ProgramNumber: D.m({ wire: "programNumber" }),
      PtsOffset: D.m({ wire: "ptsOffset" }),
      PtsOffsetMode: D.m({ wire: "ptsOffsetMode" }),
      RateMode: D.m({ wire: "rateMode" }),
      Scte35Esam: D.m({
        wire: "scte35Esam",
        shape: { Scte35EsamPid: D.m({ wire: "scte35EsamPid" }) },
      }),
      Scte35Pid: D.m({ wire: "scte35Pid" }),
      Scte35Source: D.m({ wire: "scte35Source" }),
      SegmentationMarkers: D.m({ wire: "segmentationMarkers" }),
      SegmentationStyle: D.m({ wire: "segmentationStyle" }),
      SegmentationTime: D.m({ wire: "segmentationTime" }),
      TimedMetadataPid: D.m({ wire: "timedMetadataPid" }),
      TransportStreamId: D.m({ wire: "transportStreamId" }),
      VideoPid: D.m({ wire: "videoPid" }),
    },
  }),
  M3u8Settings: D.m({
    wire: "m3u8Settings",
    shape: {
      AudioDuration: D.m({ wire: "audioDuration" }),
      AudioFramesPerPes: D.m({ wire: "audioFramesPerPes" }),
      AudioPids: D.m({ wire: "audioPids" }),
      AudioPtsOffsetDelta: D.m({ wire: "audioPtsOffsetDelta" }),
      DataPTSControl: D.m({ wire: "dataPTSControl" }),
      MaxPcrInterval: D.m({ wire: "maxPcrInterval" }),
      NielsenId3: D.m({ wire: "nielsenId3" }),
      PatInterval: D.m({ wire: "patInterval" }),
      PcrControl: D.m({ wire: "pcrControl" }),
      PcrPid: D.m({ wire: "pcrPid" }),
      PmtInterval: D.m({ wire: "pmtInterval" }),
      PmtPid: D.m({ wire: "pmtPid" }),
      PrivateMetadataPid: D.m({ wire: "privateMetadataPid" }),
      ProgramNumber: D.m({ wire: "programNumber" }),
      PtsOffset: D.m({ wire: "ptsOffset" }),
      PtsOffsetMode: D.m({ wire: "ptsOffsetMode" }),
      Scte35Pid: D.m({ wire: "scte35Pid" }),
      Scte35Source: D.m({ wire: "scte35Source" }),
      TimedMetadata: D.m({ wire: "timedMetadata" }),
      TimedMetadataPid: D.m({ wire: "timedMetadataPid" }),
      TransportStreamId: D.m({ wire: "transportStreamId" }),
      VideoPid: D.m({ wire: "videoPid" }),
    },
  }),
  MovSettings: D.m({
    wire: "movSettings",
    shape: {
      AudioDuration: D.m({ wire: "audioDuration" }),
      ClapAtom: D.m({ wire: "clapAtom" }),
      CslgAtom: D.m({ wire: "cslgAtom" }),
      Mpeg2FourCCControl: D.m({ wire: "mpeg2FourCCControl" }),
      PaddingControl: D.m({ wire: "paddingControl" }),
      Reference: D.m({ wire: "reference" }),
    },
  }),
  Mp4Settings: D.m({
    wire: "mp4Settings",
    shape: {
      AudioDuration: D.m({ wire: "audioDuration" }),
      C2paManifest: D.m({ wire: "c2paManifest" }),
      CertificateSecret: D.m({ wire: "certificateSecret" }),
      CslgAtom: D.m({ wire: "cslgAtom" }),
      CttsVersion: D.m({ wire: "cttsVersion" }),
      FreeSpaceBox: D.m({ wire: "freeSpaceBox" }),
      MoovPlacement: D.m({ wire: "moovPlacement" }),
      Mp4MajorBrand: D.m({ wire: "mp4MajorBrand" }),
      SigningKmsKey: D.m({ wire: "signingKmsKey" }),
    },
  }),
  MpdSettings: D.m({
    wire: "mpdSettings",
    shape: {
      AccessibilityCaptionHints: D.m({ wire: "accessibilityCaptionHints" }),
      AudioDuration: D.m({ wire: "audioDuration" }),
      C2paManifest: D.m({ wire: "c2paManifest" }),
      CaptionContainerType: D.m({ wire: "captionContainerType" }),
      CertificateSecret: D.m({ wire: "certificateSecret" }),
      KlvMetadata: D.m({ wire: "klvMetadata" }),
      ManifestMetadataSignaling: D.m({ wire: "manifestMetadataSignaling" }),
      Scte35Esam: D.m({ wire: "scte35Esam" }),
      Scte35Source: D.m({ wire: "scte35Source" }),
      SigningKmsKey: D.m({ wire: "signingKmsKey" }),
      TimedMetadata: D.m({ wire: "timedMetadata" }),
      TimedMetadataBoxVersion: D.m({ wire: "timedMetadataBoxVersion" }),
      TimedMetadataSchemeIdUri: D.m({ wire: "timedMetadataSchemeIdUri" }),
      TimedMetadataValue: D.m({ wire: "timedMetadataValue" }),
    },
  }),
  MxfSettings: D.m({
    wire: "mxfSettings",
    shape: {
      AfdSignaling: D.m({ wire: "afdSignaling" }),
      Profile: D.m({ wire: "profile" }),
      UncompressedAudioWrapping: D.m({ wire: "uncompressedAudioWrapping" }),
      XavcProfileSettings: D.m({
        wire: "xavcProfileSettings",
        shape: {
          DurationMode: D.m({ wire: "durationMode" }),
          MaxAncDataSize: D.m({ wire: "maxAncDataSize" }),
        },
      }),
    },
  }),
});
const i_DestinationSettings: D.LazyStruct = () => ({
  S3Settings: D.m({
    wire: "s3Settings",
    shape: {
      AccessControl: D.m({
        wire: "accessControl",
        shape: { CannedAcl: D.m({ wire: "cannedAcl" }) },
      }),
      Encryption: D.m({
        wire: "encryption",
        shape: {
          EncryptionType: D.m({ wire: "encryptionType" }),
          KmsEncryptionContext: D.m({ wire: "kmsEncryptionContext" }),
          KmsKeyArn: D.m({ wire: "kmsKeyArn" }),
        },
      }),
      StorageClass: D.m({ wire: "storageClass" }),
    },
  }),
});
const i_EncryptionContractConfiguration: D.LazyStruct = () => ({
  SpekeAudioPreset: D.m({ wire: "spekeAudioPreset" }),
  SpekeVideoPreset: D.m({ wire: "spekeVideoPreset" }),
});
const i_Hdr10Metadata: D.LazyStruct = () => ({
  BluePrimaryX: D.m({ wire: "bluePrimaryX" }),
  BluePrimaryY: D.m({ wire: "bluePrimaryY" }),
  GreenPrimaryX: D.m({ wire: "greenPrimaryX" }),
  GreenPrimaryY: D.m({ wire: "greenPrimaryY" }),
  MaxContentLightLevel: D.m({ wire: "maxContentLightLevel" }),
  MaxFrameAverageLightLevel: D.m({ wire: "maxFrameAverageLightLevel" }),
  MaxLuminance: D.m({ wire: "maxLuminance" }),
  MinLuminance: D.m({ wire: "minLuminance" }),
  RedPrimaryX: D.m({ wire: "redPrimaryX" }),
  RedPrimaryY: D.m({ wire: "redPrimaryY" }),
  WhitePointX: D.m({ wire: "whitePointX" }),
  WhitePointY: D.m({ wire: "whitePointY" }),
});
const i_RemixSettings: D.LazyStruct = () => ({
  AudioDescriptionAudioChannel: D.m({ wire: "audioDescriptionAudioChannel" }),
  AudioDescriptionDataChannel: D.m({ wire: "audioDescriptionDataChannel" }),
  ChannelMapping: D.m({
    wire: "channelMapping",
    shape: {
      OutputChannels: D.m({
        wire: "outputChannels",
        shape: D.list({
          InputChannels: D.m({ wire: "inputChannels" }),
          InputChannelsFineTune: D.m({ wire: "inputChannelsFineTune" }),
        }),
      }),
    },
  }),
  ChannelsIn: D.m({ wire: "channelsIn" }),
  ChannelsOut: D.m({ wire: "channelsOut" }),
});
const i_SpekeKeyProvider: D.LazyStruct = () => ({
  CertificateArn: D.m({ wire: "certificateArn" }),
  EncryptionContractConfiguration: D.m({
    wire: "encryptionContractConfiguration",
    shape: i_EncryptionContractConfiguration,
  }),
  ResourceId: D.m({ wire: "resourceId" }),
  SystemIds: D.m({ wire: "systemIds" }),
  Url: D.m({ wire: "url" }),
});
const i_StaticKeyProvider: D.LazyStruct = () => ({
  KeyFormat: D.m({ wire: "keyFormat" }),
  KeyFormatVersions: D.m({ wire: "keyFormatVersions" }),
  StaticKeyValue: D.m({ wire: "staticKeyValue" }),
  Url: D.m({ wire: "url" }),
});
const i_VideoDescription: D.LazyStruct = () => ({
  AfdSignaling: D.m({ wire: "afdSignaling" }),
  AntiAlias: D.m({ wire: "antiAlias" }),
  ChromaPositionMode: D.m({ wire: "chromaPositionMode" }),
  CodecSettings: D.m({
    wire: "codecSettings",
    shape: {
      Av1Settings: D.m({
        wire: "av1Settings",
        shape: {
          AdaptiveQuantization: D.m({ wire: "adaptiveQuantization" }),
          BitDepth: D.m({ wire: "bitDepth" }),
          FilmGrainSynthesis: D.m({ wire: "filmGrainSynthesis" }),
          FramerateControl: D.m({ wire: "framerateControl" }),
          FramerateConversionAlgorithm: D.m({
            wire: "framerateConversionAlgorithm",
          }),
          FramerateDenominator: D.m({ wire: "framerateDenominator" }),
          FramerateNumerator: D.m({ wire: "framerateNumerator" }),
          GopSize: D.m({ wire: "gopSize" }),
          MaxBitrate: D.m({ wire: "maxBitrate" }),
          NumberBFramesBetweenReferenceFrames: D.m({
            wire: "numberBFramesBetweenReferenceFrames",
          }),
          PerFrameMetrics: D.m({ wire: "perFrameMetrics" }),
          QvbrSettings: D.m({
            wire: "qvbrSettings",
            shape: {
              QvbrQualityLevel: D.m({ wire: "qvbrQualityLevel" }),
              QvbrQualityLevelFineTune: D.m({
                wire: "qvbrQualityLevelFineTune",
              }),
            },
          }),
          RateControlMode: D.m({ wire: "rateControlMode" }),
          Slices: D.m({ wire: "slices" }),
          SpatialAdaptiveQuantization: D.m({
            wire: "spatialAdaptiveQuantization",
          }),
        },
      }),
      AvcIntraSettings: D.m({
        wire: "avcIntraSettings",
        shape: {
          AvcIntraClass: D.m({ wire: "avcIntraClass" }),
          AvcIntraUhdSettings: D.m({
            wire: "avcIntraUhdSettings",
            shape: { QualityTuningLevel: D.m({ wire: "qualityTuningLevel" }) },
          }),
          FramerateControl: D.m({ wire: "framerateControl" }),
          FramerateConversionAlgorithm: D.m({
            wire: "framerateConversionAlgorithm",
          }),
          FramerateDenominator: D.m({ wire: "framerateDenominator" }),
          FramerateNumerator: D.m({ wire: "framerateNumerator" }),
          InterlaceMode: D.m({ wire: "interlaceMode" }),
          PerFrameMetrics: D.m({ wire: "perFrameMetrics" }),
          ScanTypeConversionMode: D.m({ wire: "scanTypeConversionMode" }),
          SlowPal: D.m({ wire: "slowPal" }),
          Telecine: D.m({ wire: "telecine" }),
        },
      }),
      Codec: D.m({ wire: "codec" }),
      FrameCaptureSettings: D.m({
        wire: "frameCaptureSettings",
        shape: {
          FramerateDenominator: D.m({ wire: "framerateDenominator" }),
          FramerateNumerator: D.m({ wire: "framerateNumerator" }),
          MaxCaptures: D.m({ wire: "maxCaptures" }),
          Quality: D.m({ wire: "quality" }),
        },
      }),
      GifSettings: D.m({
        wire: "gifSettings",
        shape: {
          FramerateControl: D.m({ wire: "framerateControl" }),
          FramerateConversionAlgorithm: D.m({
            wire: "framerateConversionAlgorithm",
          }),
          FramerateDenominator: D.m({ wire: "framerateDenominator" }),
          FramerateNumerator: D.m({ wire: "framerateNumerator" }),
        },
      }),
      H264Settings: D.m({
        wire: "h264Settings",
        shape: {
          AdaptiveQuantization: D.m({ wire: "adaptiveQuantization" }),
          BandwidthReductionFilter: D.m({
            wire: "bandwidthReductionFilter",
            shape: i_BandwidthReductionFilter,
          }),
          Bitrate: D.m({ wire: "bitrate" }),
          CodecLevel: D.m({ wire: "codecLevel" }),
          CodecProfile: D.m({ wire: "codecProfile" }),
          DynamicSubGop: D.m({ wire: "dynamicSubGop" }),
          EndOfStreamMarkers: D.m({ wire: "endOfStreamMarkers" }),
          EntropyEncoding: D.m({ wire: "entropyEncoding" }),
          ExplicitWeightedPrediction: D.m({
            wire: "explicitWeightedPrediction",
          }),
          FieldEncoding: D.m({ wire: "fieldEncoding" }),
          FlickerAdaptiveQuantization: D.m({
            wire: "flickerAdaptiveQuantization",
          }),
          FramerateControl: D.m({ wire: "framerateControl" }),
          FramerateConversionAlgorithm: D.m({
            wire: "framerateConversionAlgorithm",
          }),
          FramerateDenominator: D.m({ wire: "framerateDenominator" }),
          FramerateNumerator: D.m({ wire: "framerateNumerator" }),
          GopBReference: D.m({ wire: "gopBReference" }),
          GopClosedCadence: D.m({ wire: "gopClosedCadence" }),
          GopSize: D.m({ wire: "gopSize" }),
          GopSizeUnits: D.m({ wire: "gopSizeUnits" }),
          HrdBufferFinalFillPercentage: D.m({
            wire: "hrdBufferFinalFillPercentage",
          }),
          HrdBufferInitialFillPercentage: D.m({
            wire: "hrdBufferInitialFillPercentage",
          }),
          HrdBufferSize: D.m({ wire: "hrdBufferSize" }),
          InterlaceMode: D.m({ wire: "interlaceMode" }),
          MaxBitrate: D.m({ wire: "maxBitrate" }),
          MinIInterval: D.m({ wire: "minIInterval" }),
          NumberBFramesBetweenReferenceFrames: D.m({
            wire: "numberBFramesBetweenReferenceFrames",
          }),
          NumberReferenceFrames: D.m({ wire: "numberReferenceFrames" }),
          ParControl: D.m({ wire: "parControl" }),
          ParDenominator: D.m({ wire: "parDenominator" }),
          ParNumerator: D.m({ wire: "parNumerator" }),
          PerFrameMetrics: D.m({ wire: "perFrameMetrics" }),
          QualityTuningLevel: D.m({ wire: "qualityTuningLevel" }),
          QvbrSettings: D.m({
            wire: "qvbrSettings",
            shape: {
              MaxAverageBitrate: D.m({ wire: "maxAverageBitrate" }),
              QvbrQualityLevel: D.m({ wire: "qvbrQualityLevel" }),
              QvbrQualityLevelFineTune: D.m({
                wire: "qvbrQualityLevelFineTune",
              }),
            },
          }),
          RateControlMode: D.m({ wire: "rateControlMode" }),
          RepeatPps: D.m({ wire: "repeatPps" }),
          SaliencyAwareEncoding: D.m({ wire: "saliencyAwareEncoding" }),
          ScanTypeConversionMode: D.m({ wire: "scanTypeConversionMode" }),
          SceneChangeDetect: D.m({ wire: "sceneChangeDetect" }),
          Slices: D.m({ wire: "slices" }),
          SlowPal: D.m({ wire: "slowPal" }),
          Softness: D.m({ wire: "softness" }),
          SpatialAdaptiveQuantization: D.m({
            wire: "spatialAdaptiveQuantization",
          }),
          Syntax: D.m({ wire: "syntax" }),
          Telecine: D.m({ wire: "telecine" }),
          TemporalAdaptiveQuantization: D.m({
            wire: "temporalAdaptiveQuantization",
          }),
          UnregisteredSeiTimecode: D.m({ wire: "unregisteredSeiTimecode" }),
          WriteMp4PackagingType: D.m({ wire: "writeMp4PackagingType" }),
        },
      }),
      H265Settings: D.m({
        wire: "h265Settings",
        shape: {
          AdaptiveQuantization: D.m({ wire: "adaptiveQuantization" }),
          AlternateTransferFunctionSei: D.m({
            wire: "alternateTransferFunctionSei",
          }),
          BandwidthReductionFilter: D.m({
            wire: "bandwidthReductionFilter",
            shape: i_BandwidthReductionFilter,
          }),
          Bitrate: D.m({ wire: "bitrate" }),
          CodecLevel: D.m({ wire: "codecLevel" }),
          CodecProfile: D.m({ wire: "codecProfile" }),
          Deblocking: D.m({ wire: "deblocking" }),
          DynamicSubGop: D.m({ wire: "dynamicSubGop" }),
          EndOfStreamMarkers: D.m({ wire: "endOfStreamMarkers" }),
          FlickerAdaptiveQuantization: D.m({
            wire: "flickerAdaptiveQuantization",
          }),
          FramerateControl: D.m({ wire: "framerateControl" }),
          FramerateConversionAlgorithm: D.m({
            wire: "framerateConversionAlgorithm",
          }),
          FramerateDenominator: D.m({ wire: "framerateDenominator" }),
          FramerateNumerator: D.m({ wire: "framerateNumerator" }),
          GopBReference: D.m({ wire: "gopBReference" }),
          GopClosedCadence: D.m({ wire: "gopClosedCadence" }),
          GopSize: D.m({ wire: "gopSize" }),
          GopSizeUnits: D.m({ wire: "gopSizeUnits" }),
          HrdBufferFinalFillPercentage: D.m({
            wire: "hrdBufferFinalFillPercentage",
          }),
          HrdBufferInitialFillPercentage: D.m({
            wire: "hrdBufferInitialFillPercentage",
          }),
          HrdBufferSize: D.m({ wire: "hrdBufferSize" }),
          InterlaceMode: D.m({ wire: "interlaceMode" }),
          MaxBitrate: D.m({ wire: "maxBitrate" }),
          MinIInterval: D.m({ wire: "minIInterval" }),
          MvOverPictureBoundaries: D.m({ wire: "mvOverPictureBoundaries" }),
          MvTemporalPredictor: D.m({ wire: "mvTemporalPredictor" }),
          NumberBFramesBetweenReferenceFrames: D.m({
            wire: "numberBFramesBetweenReferenceFrames",
          }),
          NumberReferenceFrames: D.m({ wire: "numberReferenceFrames" }),
          ParControl: D.m({ wire: "parControl" }),
          ParDenominator: D.m({ wire: "parDenominator" }),
          ParNumerator: D.m({ wire: "parNumerator" }),
          PerFrameMetrics: D.m({ wire: "perFrameMetrics" }),
          QualityTuningLevel: D.m({ wire: "qualityTuningLevel" }),
          QvbrSettings: D.m({
            wire: "qvbrSettings",
            shape: {
              MaxAverageBitrate: D.m({ wire: "maxAverageBitrate" }),
              QvbrQualityLevel: D.m({ wire: "qvbrQualityLevel" }),
              QvbrQualityLevelFineTune: D.m({
                wire: "qvbrQualityLevelFineTune",
              }),
            },
          }),
          RateControlMode: D.m({ wire: "rateControlMode" }),
          SampleAdaptiveOffsetFilterMode: D.m({
            wire: "sampleAdaptiveOffsetFilterMode",
          }),
          ScanTypeConversionMode: D.m({ wire: "scanTypeConversionMode" }),
          SceneChangeDetect: D.m({ wire: "sceneChangeDetect" }),
          Slices: D.m({ wire: "slices" }),
          SlowPal: D.m({ wire: "slowPal" }),
          SpatialAdaptiveQuantization: D.m({
            wire: "spatialAdaptiveQuantization",
          }),
          Telecine: D.m({ wire: "telecine" }),
          TemporalAdaptiveQuantization: D.m({
            wire: "temporalAdaptiveQuantization",
          }),
          TemporalIds: D.m({ wire: "temporalIds" }),
          TileHeight: D.m({ wire: "tileHeight" }),
          TilePadding: D.m({ wire: "tilePadding" }),
          TileWidth: D.m({ wire: "tileWidth" }),
          Tiles: D.m({ wire: "tiles" }),
          TreeBlockSize: D.m({ wire: "treeBlockSize" }),
          UnregisteredSeiTimecode: D.m({ wire: "unregisteredSeiTimecode" }),
          WriteMp4PackagingType: D.m({ wire: "writeMp4PackagingType" }),
        },
      }),
      Mpeg2Settings: D.m({
        wire: "mpeg2Settings",
        shape: {
          AdaptiveQuantization: D.m({ wire: "adaptiveQuantization" }),
          Bitrate: D.m({ wire: "bitrate" }),
          CodecLevel: D.m({ wire: "codecLevel" }),
          CodecProfile: D.m({ wire: "codecProfile" }),
          DynamicSubGop: D.m({ wire: "dynamicSubGop" }),
          FramerateControl: D.m({ wire: "framerateControl" }),
          FramerateConversionAlgorithm: D.m({
            wire: "framerateConversionAlgorithm",
          }),
          FramerateDenominator: D.m({ wire: "framerateDenominator" }),
          FramerateNumerator: D.m({ wire: "framerateNumerator" }),
          GopClosedCadence: D.m({ wire: "gopClosedCadence" }),
          GopSize: D.m({ wire: "gopSize" }),
          GopSizeUnits: D.m({ wire: "gopSizeUnits" }),
          HrdBufferFinalFillPercentage: D.m({
            wire: "hrdBufferFinalFillPercentage",
          }),
          HrdBufferInitialFillPercentage: D.m({
            wire: "hrdBufferInitialFillPercentage",
          }),
          HrdBufferSize: D.m({ wire: "hrdBufferSize" }),
          InterlaceMode: D.m({ wire: "interlaceMode" }),
          IntraDcPrecision: D.m({ wire: "intraDcPrecision" }),
          MaxBitrate: D.m({ wire: "maxBitrate" }),
          MinIInterval: D.m({ wire: "minIInterval" }),
          NumberBFramesBetweenReferenceFrames: D.m({
            wire: "numberBFramesBetweenReferenceFrames",
          }),
          ParControl: D.m({ wire: "parControl" }),
          ParDenominator: D.m({ wire: "parDenominator" }),
          ParNumerator: D.m({ wire: "parNumerator" }),
          PerFrameMetrics: D.m({ wire: "perFrameMetrics" }),
          QualityTuningLevel: D.m({ wire: "qualityTuningLevel" }),
          RateControlMode: D.m({ wire: "rateControlMode" }),
          ScanTypeConversionMode: D.m({ wire: "scanTypeConversionMode" }),
          SceneChangeDetect: D.m({ wire: "sceneChangeDetect" }),
          SlowPal: D.m({ wire: "slowPal" }),
          Softness: D.m({ wire: "softness" }),
          SpatialAdaptiveQuantization: D.m({
            wire: "spatialAdaptiveQuantization",
          }),
          Syntax: D.m({ wire: "syntax" }),
          Telecine: D.m({ wire: "telecine" }),
          TemporalAdaptiveQuantization: D.m({
            wire: "temporalAdaptiveQuantization",
          }),
        },
      }),
      PassthroughSettings: D.m({
        wire: "passthroughSettings",
        shape: {
          FrameControl: D.m({ wire: "frameControl" }),
          VideoSelectorMode: D.m({ wire: "videoSelectorMode" }),
        },
      }),
      ProresSettings: D.m({
        wire: "proresSettings",
        shape: {
          ChromaSampling: D.m({ wire: "chromaSampling" }),
          CodecProfile: D.m({ wire: "codecProfile" }),
          FramerateControl: D.m({ wire: "framerateControl" }),
          FramerateConversionAlgorithm: D.m({
            wire: "framerateConversionAlgorithm",
          }),
          FramerateDenominator: D.m({ wire: "framerateDenominator" }),
          FramerateNumerator: D.m({ wire: "framerateNumerator" }),
          InterlaceMode: D.m({ wire: "interlaceMode" }),
          ParControl: D.m({ wire: "parControl" }),
          ParDenominator: D.m({ wire: "parDenominator" }),
          ParNumerator: D.m({ wire: "parNumerator" }),
          PerFrameMetrics: D.m({ wire: "perFrameMetrics" }),
          ScanTypeConversionMode: D.m({ wire: "scanTypeConversionMode" }),
          SlowPal: D.m({ wire: "slowPal" }),
          Telecine: D.m({ wire: "telecine" }),
        },
      }),
      UncompressedSettings: D.m({
        wire: "uncompressedSettings",
        shape: {
          Fourcc: D.m({ wire: "fourcc" }),
          FramerateControl: D.m({ wire: "framerateControl" }),
          FramerateConversionAlgorithm: D.m({
            wire: "framerateConversionAlgorithm",
          }),
          FramerateDenominator: D.m({ wire: "framerateDenominator" }),
          FramerateNumerator: D.m({ wire: "framerateNumerator" }),
          InterlaceMode: D.m({ wire: "interlaceMode" }),
          ScanTypeConversionMode: D.m({ wire: "scanTypeConversionMode" }),
          SlowPal: D.m({ wire: "slowPal" }),
          Telecine: D.m({ wire: "telecine" }),
        },
      }),
      Vc3Settings: D.m({
        wire: "vc3Settings",
        shape: {
          FramerateControl: D.m({ wire: "framerateControl" }),
          FramerateConversionAlgorithm: D.m({
            wire: "framerateConversionAlgorithm",
          }),
          FramerateDenominator: D.m({ wire: "framerateDenominator" }),
          FramerateNumerator: D.m({ wire: "framerateNumerator" }),
          InterlaceMode: D.m({ wire: "interlaceMode" }),
          ScanTypeConversionMode: D.m({ wire: "scanTypeConversionMode" }),
          SlowPal: D.m({ wire: "slowPal" }),
          Telecine: D.m({ wire: "telecine" }),
          Vc3Class: D.m({ wire: "vc3Class" }),
        },
      }),
      Vp8Settings: D.m({
        wire: "vp8Settings",
        shape: {
          Bitrate: D.m({ wire: "bitrate" }),
          FramerateControl: D.m({ wire: "framerateControl" }),
          FramerateConversionAlgorithm: D.m({
            wire: "framerateConversionAlgorithm",
          }),
          FramerateDenominator: D.m({ wire: "framerateDenominator" }),
          FramerateNumerator: D.m({ wire: "framerateNumerator" }),
          GopSize: D.m({ wire: "gopSize" }),
          HrdBufferSize: D.m({ wire: "hrdBufferSize" }),
          MaxBitrate: D.m({ wire: "maxBitrate" }),
          ParControl: D.m({ wire: "parControl" }),
          ParDenominator: D.m({ wire: "parDenominator" }),
          ParNumerator: D.m({ wire: "parNumerator" }),
          QualityTuningLevel: D.m({ wire: "qualityTuningLevel" }),
          RateControlMode: D.m({ wire: "rateControlMode" }),
        },
      }),
      Vp9Settings: D.m({
        wire: "vp9Settings",
        shape: {
          Bitrate: D.m({ wire: "bitrate" }),
          FramerateControl: D.m({ wire: "framerateControl" }),
          FramerateConversionAlgorithm: D.m({
            wire: "framerateConversionAlgorithm",
          }),
          FramerateDenominator: D.m({ wire: "framerateDenominator" }),
          FramerateNumerator: D.m({ wire: "framerateNumerator" }),
          GopSize: D.m({ wire: "gopSize" }),
          HrdBufferSize: D.m({ wire: "hrdBufferSize" }),
          MaxBitrate: D.m({ wire: "maxBitrate" }),
          ParControl: D.m({ wire: "parControl" }),
          ParDenominator: D.m({ wire: "parDenominator" }),
          ParNumerator: D.m({ wire: "parNumerator" }),
          QualityTuningLevel: D.m({ wire: "qualityTuningLevel" }),
          RateControlMode: D.m({ wire: "rateControlMode" }),
        },
      }),
      XavcSettings: D.m({
        wire: "xavcSettings",
        shape: {
          AdaptiveQuantization: D.m({ wire: "adaptiveQuantization" }),
          EntropyEncoding: D.m({ wire: "entropyEncoding" }),
          FramerateControl: D.m({ wire: "framerateControl" }),
          FramerateConversionAlgorithm: D.m({
            wire: "framerateConversionAlgorithm",
          }),
          FramerateDenominator: D.m({ wire: "framerateDenominator" }),
          FramerateNumerator: D.m({ wire: "framerateNumerator" }),
          PerFrameMetrics: D.m({ wire: "perFrameMetrics" }),
          Profile: D.m({ wire: "profile" }),
          SlowPal: D.m({ wire: "slowPal" }),
          Softness: D.m({ wire: "softness" }),
          SpatialAdaptiveQuantization: D.m({
            wire: "spatialAdaptiveQuantization",
          }),
          TemporalAdaptiveQuantization: D.m({
            wire: "temporalAdaptiveQuantization",
          }),
          Xavc4kIntraCbgProfileSettings: D.m({
            wire: "xavc4kIntraCbgProfileSettings",
            shape: { XavcClass: D.m({ wire: "xavcClass" }) },
          }),
          Xavc4kIntraVbrProfileSettings: D.m({
            wire: "xavc4kIntraVbrProfileSettings",
            shape: { XavcClass: D.m({ wire: "xavcClass" }) },
          }),
          Xavc4kProfileSettings: D.m({
            wire: "xavc4kProfileSettings",
            shape: {
              BitrateClass: D.m({ wire: "bitrateClass" }),
              CodecProfile: D.m({ wire: "codecProfile" }),
              FlickerAdaptiveQuantization: D.m({
                wire: "flickerAdaptiveQuantization",
              }),
              GopBReference: D.m({ wire: "gopBReference" }),
              GopClosedCadence: D.m({ wire: "gopClosedCadence" }),
              HrdBufferSize: D.m({ wire: "hrdBufferSize" }),
              QualityTuningLevel: D.m({ wire: "qualityTuningLevel" }),
              Slices: D.m({ wire: "slices" }),
            },
          }),
          XavcHdIntraCbgProfileSettings: D.m({
            wire: "xavcHdIntraCbgProfileSettings",
            shape: { XavcClass: D.m({ wire: "xavcClass" }) },
          }),
          XavcHdProfileSettings: D.m({
            wire: "xavcHdProfileSettings",
            shape: {
              BitrateClass: D.m({ wire: "bitrateClass" }),
              FlickerAdaptiveQuantization: D.m({
                wire: "flickerAdaptiveQuantization",
              }),
              GopBReference: D.m({ wire: "gopBReference" }),
              GopClosedCadence: D.m({ wire: "gopClosedCadence" }),
              HrdBufferSize: D.m({ wire: "hrdBufferSize" }),
              InterlaceMode: D.m({ wire: "interlaceMode" }),
              QualityTuningLevel: D.m({ wire: "qualityTuningLevel" }),
              Slices: D.m({ wire: "slices" }),
              Telecine: D.m({ wire: "telecine" }),
            },
          }),
        },
      }),
    },
  }),
  ColorMetadata: D.m({ wire: "colorMetadata" }),
  Crop: D.m({ wire: "crop", shape: i_Rectangle }),
  DropFrameTimecode: D.m({ wire: "dropFrameTimecode" }),
  FixedAfd: D.m({ wire: "fixedAfd" }),
  Height: D.m({ wire: "height" }),
  Position: D.m({ wire: "position", shape: i_Rectangle }),
  RespondToAfd: D.m({ wire: "respondToAfd" }),
  ScalingBehavior: D.m({ wire: "scalingBehavior" }),
  Sharpness: D.m({ wire: "sharpness" }),
  TimecodeInsertion: D.m({ wire: "timecodeInsertion" }),
  TimecodeTrack: D.m({ wire: "timecodeTrack" }),
  VideoPreprocessors: D.m({
    wire: "videoPreprocessors",
    shape: {
      ColorCorrector: D.m({
        wire: "colorCorrector",
        shape: {
          Brightness: D.m({ wire: "brightness" }),
          ClipLimits: D.m({
            wire: "clipLimits",
            shape: {
              MaximumRGBTolerance: D.m({ wire: "maximumRGBTolerance" }),
              MaximumYUV: D.m({ wire: "maximumYUV" }),
              MinimumRGBTolerance: D.m({ wire: "minimumRGBTolerance" }),
              MinimumYUV: D.m({ wire: "minimumYUV" }),
            },
          }),
          ColorSpaceConversion: D.m({ wire: "colorSpaceConversion" }),
          Contrast: D.m({ wire: "contrast" }),
          Hdr10Metadata: D.m({ wire: "hdr10Metadata", shape: i_Hdr10Metadata }),
          HdrToSdrToneMapper: D.m({ wire: "hdrToSdrToneMapper" }),
          Hue: D.m({ wire: "hue" }),
          MaxLuminance: D.m({ wire: "maxLuminance" }),
          SampleRangeConversion: D.m({ wire: "sampleRangeConversion" }),
          Saturation: D.m({ wire: "saturation" }),
          SdrReferenceWhiteLevel: D.m({ wire: "sdrReferenceWhiteLevel" }),
        },
      }),
      Deinterlacer: D.m({
        wire: "deinterlacer",
        shape: {
          Algorithm: D.m({ wire: "algorithm" }),
          Control: D.m({ wire: "control" }),
          Mode: D.m({ wire: "mode" }),
        },
      }),
      DolbyVision: D.m({
        wire: "dolbyVision",
        shape: {
          Compatibility: D.m({ wire: "compatibility" }),
          L6Metadata: D.m({
            wire: "l6Metadata",
            shape: {
              MaxCll: D.m({ wire: "maxCll" }),
              MaxFall: D.m({ wire: "maxFall" }),
            },
          }),
          L6Mode: D.m({ wire: "l6Mode" }),
          Mapping: D.m({ wire: "mapping" }),
          Profile: D.m({ wire: "profile" }),
        },
      }),
      DurationControl: D.m({
        wire: "durationControl",
        shape: {
          IntegerDurationMaximumCompressionDenominator: D.m({
            wire: "integerDurationMaximumCompressionDenominator",
          }),
          IntegerDurationMaximumCompressionNumerator: D.m({
            wire: "integerDurationMaximumCompressionNumerator",
          }),
          IntegerDurationTrimThresholdMilliseconds: D.m({
            wire: "integerDurationTrimThresholdMilliseconds",
          }),
        },
      }),
      Hdr10Plus: D.m({
        wire: "hdr10Plus",
        shape: {
          MasteringMonitorNits: D.m({ wire: "masteringMonitorNits" }),
          TargetMonitorNits: D.m({ wire: "targetMonitorNits" }),
        },
      }),
      ImageInserter: D.m({ wire: "imageInserter", shape: i_ImageInserter }),
      NoiseReducer: D.m({
        wire: "noiseReducer",
        shape: {
          Filter: D.m({ wire: "filter" }),
          FilterSettings: D.m({
            wire: "filterSettings",
            shape: { Strength: D.m({ wire: "strength" }) },
          }),
          SpatialFilterSettings: D.m({
            wire: "spatialFilterSettings",
            shape: {
              PostFilterSharpenStrength: D.m({
                wire: "postFilterSharpenStrength",
              }),
              Speed: D.m({ wire: "speed" }),
              Strength: D.m({ wire: "strength" }),
            },
          }),
          TemporalFilterSettings: D.m({
            wire: "temporalFilterSettings",
            shape: {
              AggressiveMode: D.m({ wire: "aggressiveMode" }),
              PostTemporalSharpening: D.m({ wire: "postTemporalSharpening" }),
              PostTemporalSharpeningStrength: D.m({
                wire: "postTemporalSharpeningStrength",
              }),
              Speed: D.m({ wire: "speed" }),
              Strength: D.m({ wire: "strength" }),
            },
          }),
        },
      }),
      PartnerWatermarking: D.m({
        wire: "partnerWatermarking",
        shape: {
          NexguardFileMarkerSettings: D.m({
            wire: "nexguardFileMarkerSettings",
            shape: {
              License: D.m({ wire: "license" }),
              Payload: D.m({ wire: "payload" }),
              Preset: D.m({ wire: "preset" }),
              Strength: D.m({ wire: "strength" }),
            },
          }),
        },
      }),
      TimecodeBurnin: D.m({
        wire: "timecodeBurnin",
        shape: {
          FontSize: D.m({ wire: "fontSize" }),
          Position: D.m({ wire: "position" }),
          Prefix: D.m({ wire: "prefix" }),
        },
      }),
    },
  }),
  Width: D.m({ wire: "width" }),
});
const i_VideoOverlayPosition: D.LazyStruct = () => ({
  Height: D.m({ wire: "height" }),
  Opacity: D.m({ wire: "opacity" }),
  Unit: D.m({ wire: "unit" }),
  Width: D.m({ wire: "width" }),
  XPosition: D.m({ wire: "xPosition" }),
  YPosition: D.m({ wire: "yPosition" }),
});
const o_AccelerationSettings: D.LazyStruct = () => ({
  Mode: D.m({ wire: "mode" }),
});
const o_AdvancedInputFilterSettings: D.LazyStruct = () => ({
  AddTexture: D.m({ wire: "addTexture" }),
  Sharpening: D.m({ wire: "sharpening" }),
});
const o_AudioDescription: D.LazyStruct = () => ({
  AudioChannelTaggingSettings: D.m({
    wire: "audioChannelTaggingSettings",
    shape: {
      ChannelTag: D.m({ wire: "channelTag" }),
      ChannelTags: D.m({ wire: "channelTags" }),
    },
  }),
  AudioNormalizationSettings: D.m({
    wire: "audioNormalizationSettings",
    shape: {
      Algorithm: D.m({ wire: "algorithm" }),
      AlgorithmControl: D.m({ wire: "algorithmControl" }),
      CorrectionGateLevel: D.m({ wire: "correctionGateLevel" }),
      LoudnessLogging: D.m({ wire: "loudnessLogging" }),
      PeakCalculation: D.m({ wire: "peakCalculation" }),
      TargetLkfs: D.m({ wire: "targetLkfs" }),
      TruePeakLimiterThreshold: D.m({ wire: "truePeakLimiterThreshold" }),
    },
  }),
  AudioPitchCorrectionSettings: D.m({
    wire: "audioPitchCorrectionSettings",
    shape: { SlowPalPitchCorrection: D.m({ wire: "slowPalPitchCorrection" }) },
  }),
  AudioSourceName: D.m({ wire: "audioSourceName" }),
  AudioType: D.m({ wire: "audioType" }),
  AudioTypeControl: D.m({ wire: "audioTypeControl" }),
  CodecSettings: D.m({
    wire: "codecSettings",
    shape: {
      AacSettings: D.m({
        wire: "aacSettings",
        shape: {
          AudioDescriptionBroadcasterMix: D.m({
            wire: "audioDescriptionBroadcasterMix",
          }),
          Bitrate: D.m({ wire: "bitrate" }),
          CodecProfile: D.m({ wire: "codecProfile" }),
          CodingMode: D.m({ wire: "codingMode" }),
          LoudnessMeasurementMode: D.m({ wire: "loudnessMeasurementMode" }),
          RapInterval: D.m({ wire: "rapInterval" }),
          RateControlMode: D.m({ wire: "rateControlMode" }),
          RawFormat: D.m({ wire: "rawFormat" }),
          SampleRate: D.m({ wire: "sampleRate" }),
          Specification: D.m({ wire: "specification" }),
          TargetLoudnessRange: D.m({ wire: "targetLoudnessRange" }),
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
          DynamicRangeCompressionLine: D.m({
            wire: "dynamicRangeCompressionLine",
          }),
          DynamicRangeCompressionProfile: D.m({
            wire: "dynamicRangeCompressionProfile",
          }),
          DynamicRangeCompressionRf: D.m({ wire: "dynamicRangeCompressionRf" }),
          LfeFilter: D.m({ wire: "lfeFilter" }),
          MetadataControl: D.m({ wire: "metadataControl" }),
          SampleRate: D.m({ wire: "sampleRate" }),
        },
      }),
      Ac4Settings: D.m({
        wire: "ac4Settings",
        shape: {
          Bitrate: D.m({ wire: "bitrate" }),
          BitstreamMode: D.m({ wire: "bitstreamMode" }),
          CodingMode: D.m({ wire: "codingMode" }),
          DynamicRangeCompressionFlatPanelTv: D.m({
            wire: "dynamicRangeCompressionFlatPanelTv",
          }),
          DynamicRangeCompressionHomeTheater: D.m({
            wire: "dynamicRangeCompressionHomeTheater",
          }),
          DynamicRangeCompressionPortableHeadphones: D.m({
            wire: "dynamicRangeCompressionPortableHeadphones",
          }),
          DynamicRangeCompressionPortableSpeakers: D.m({
            wire: "dynamicRangeCompressionPortableSpeakers",
          }),
          LoRoCenterMixLevel: D.m({ wire: "loRoCenterMixLevel" }),
          LoRoSurroundMixLevel: D.m({ wire: "loRoSurroundMixLevel" }),
          LtRtCenterMixLevel: D.m({ wire: "ltRtCenterMixLevel" }),
          LtRtSurroundMixLevel: D.m({ wire: "ltRtSurroundMixLevel" }),
          SampleRate: D.m({ wire: "sampleRate" }),
          StereoDownmix: D.m({ wire: "stereoDownmix" }),
        },
      }),
      AiffSettings: D.m({
        wire: "aiffSettings",
        shape: {
          BitDepth: D.m({ wire: "bitDepth" }),
          Channels: D.m({ wire: "channels" }),
          SampleRate: D.m({ wire: "sampleRate" }),
        },
      }),
      Codec: D.m({ wire: "codec" }),
      Eac3AtmosSettings: D.m({
        wire: "eac3AtmosSettings",
        shape: {
          Bitrate: D.m({ wire: "bitrate" }),
          BitstreamMode: D.m({ wire: "bitstreamMode" }),
          CodingMode: D.m({ wire: "codingMode" }),
          DialogueIntelligence: D.m({ wire: "dialogueIntelligence" }),
          DownmixControl: D.m({ wire: "downmixControl" }),
          DynamicRangeCompressionLine: D.m({
            wire: "dynamicRangeCompressionLine",
          }),
          DynamicRangeCompressionRf: D.m({ wire: "dynamicRangeCompressionRf" }),
          DynamicRangeControl: D.m({ wire: "dynamicRangeControl" }),
          LoRoCenterMixLevel: D.m({ wire: "loRoCenterMixLevel" }),
          LoRoSurroundMixLevel: D.m({ wire: "loRoSurroundMixLevel" }),
          LtRtCenterMixLevel: D.m({ wire: "ltRtCenterMixLevel" }),
          LtRtSurroundMixLevel: D.m({ wire: "ltRtSurroundMixLevel" }),
          MeteringMode: D.m({ wire: "meteringMode" }),
          SampleRate: D.m({ wire: "sampleRate" }),
          SpeechThreshold: D.m({ wire: "speechThreshold" }),
          StereoDownmix: D.m({ wire: "stereoDownmix" }),
          SurroundExMode: D.m({ wire: "surroundExMode" }),
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
          DynamicRangeCompressionLine: D.m({
            wire: "dynamicRangeCompressionLine",
          }),
          DynamicRangeCompressionRf: D.m({ wire: "dynamicRangeCompressionRf" }),
          LfeControl: D.m({ wire: "lfeControl" }),
          LfeFilter: D.m({ wire: "lfeFilter" }),
          LoRoCenterMixLevel: D.m({ wire: "loRoCenterMixLevel" }),
          LoRoSurroundMixLevel: D.m({ wire: "loRoSurroundMixLevel" }),
          LtRtCenterMixLevel: D.m({ wire: "ltRtCenterMixLevel" }),
          LtRtSurroundMixLevel: D.m({ wire: "ltRtSurroundMixLevel" }),
          MetadataControl: D.m({ wire: "metadataControl" }),
          PassthroughControl: D.m({ wire: "passthroughControl" }),
          PhaseControl: D.m({ wire: "phaseControl" }),
          SampleRate: D.m({ wire: "sampleRate" }),
          StereoDownmix: D.m({ wire: "stereoDownmix" }),
          SurroundExMode: D.m({ wire: "surroundExMode" }),
          SurroundMode: D.m({ wire: "surroundMode" }),
        },
      }),
      FlacSettings: D.m({
        wire: "flacSettings",
        shape: {
          BitDepth: D.m({ wire: "bitDepth" }),
          Channels: D.m({ wire: "channels" }),
          SampleRate: D.m({ wire: "sampleRate" }),
        },
      }),
      Mp2Settings: D.m({
        wire: "mp2Settings",
        shape: {
          AudioDescriptionMix: D.m({ wire: "audioDescriptionMix" }),
          Bitrate: D.m({ wire: "bitrate" }),
          Channels: D.m({ wire: "channels" }),
          SampleRate: D.m({ wire: "sampleRate" }),
        },
      }),
      Mp3Settings: D.m({
        wire: "mp3Settings",
        shape: {
          Bitrate: D.m({ wire: "bitrate" }),
          Channels: D.m({ wire: "channels" }),
          RateControlMode: D.m({ wire: "rateControlMode" }),
          SampleRate: D.m({ wire: "sampleRate" }),
          VbrQuality: D.m({ wire: "vbrQuality" }),
        },
      }),
      OpusSettings: D.m({
        wire: "opusSettings",
        shape: {
          Bitrate: D.m({ wire: "bitrate" }),
          Channels: D.m({ wire: "channels" }),
          SampleRate: D.m({ wire: "sampleRate" }),
        },
      }),
      VorbisSettings: D.m({
        wire: "vorbisSettings",
        shape: {
          Channels: D.m({ wire: "channels" }),
          SampleRate: D.m({ wire: "sampleRate" }),
          VbrQuality: D.m({ wire: "vbrQuality" }),
        },
      }),
      WavSettings: D.m({
        wire: "wavSettings",
        shape: {
          BitDepth: D.m({ wire: "bitDepth" }),
          Channels: D.m({ wire: "channels" }),
          Format: D.m({ wire: "format" }),
          SampleRate: D.m({ wire: "sampleRate" }),
        },
      }),
    },
  }),
  CustomLanguageCode: D.m({ wire: "customLanguageCode" }),
  LanguageCode: D.m({ wire: "languageCode" }),
  LanguageCodeControl: D.m({ wire: "languageCodeControl" }),
  RemixSettings: D.m({ wire: "remixSettings", shape: o_RemixSettings }),
  StreamName: D.m({ wire: "streamName" }),
});
const o_AudioSelector: D.LazyStruct = () => ({
  AudioDurationCorrection: D.m({ wire: "audioDurationCorrection" }),
  CustomLanguageCode: D.m({ wire: "customLanguageCode" }),
  DefaultSelection: D.m({ wire: "defaultSelection" }),
  ExternalAudioFileInput: D.m({ wire: "externalAudioFileInput" }),
  HlsRenditionGroupSettings: D.m({
    wire: "hlsRenditionGroupSettings",
    shape: {
      RenditionGroupId: D.m({ wire: "renditionGroupId" }),
      RenditionLanguageCode: D.m({ wire: "renditionLanguageCode" }),
      RenditionName: D.m({ wire: "renditionName" }),
    },
  }),
  LanguageCode: D.m({ wire: "languageCode" }),
  Offset: D.m({ wire: "offset" }),
  Pids: D.m({ wire: "pids" }),
  ProgramSelection: D.m({ wire: "programSelection" }),
  RemixSettings: D.m({ wire: "remixSettings", shape: o_RemixSettings }),
  SelectorType: D.m({ wire: "selectorType" }),
  Streams: D.m({ wire: "streams" }),
  Tracks: D.m({ wire: "tracks" }),
});
const o_AudioSelectorGroup: D.LazyStruct = () => ({
  AudioSelectorNames: D.m({ wire: "audioSelectorNames" }),
});
const o_AvailBlanking: D.LazyStruct = () => ({
  AvailBlankingImage: D.m({ wire: "availBlankingImage" }),
});
const o_CaptionDestinationSettings: D.LazyStruct = () => ({
  BurninDestinationSettings: D.m({
    wire: "burninDestinationSettings",
    shape: {
      Alignment: D.m({ wire: "alignment" }),
      ApplyFontColor: D.m({ wire: "applyFontColor" }),
      BackgroundColor: D.m({ wire: "backgroundColor" }),
      BackgroundOpacity: D.m({ wire: "backgroundOpacity" }),
      FallbackFont: D.m({ wire: "fallbackFont" }),
      FontColor: D.m({ wire: "fontColor" }),
      FontFileBold: D.m({ wire: "fontFileBold" }),
      FontFileBoldItalic: D.m({ wire: "fontFileBoldItalic" }),
      FontFileItalic: D.m({ wire: "fontFileItalic" }),
      FontFileRegular: D.m({ wire: "fontFileRegular" }),
      FontOpacity: D.m({ wire: "fontOpacity" }),
      FontResolution: D.m({ wire: "fontResolution" }),
      FontScript: D.m({ wire: "fontScript" }),
      FontSize: D.m({ wire: "fontSize" }),
      HexFontColor: D.m({ wire: "hexFontColor" }),
      OutlineColor: D.m({ wire: "outlineColor" }),
      OutlineSize: D.m({ wire: "outlineSize" }),
      RemoveRubyReserveAttributes: D.m({ wire: "removeRubyReserveAttributes" }),
      ShadowColor: D.m({ wire: "shadowColor" }),
      ShadowOpacity: D.m({ wire: "shadowOpacity" }),
      ShadowXOffset: D.m({ wire: "shadowXOffset" }),
      ShadowYOffset: D.m({ wire: "shadowYOffset" }),
      StylePassthrough: D.m({ wire: "stylePassthrough" }),
      TeletextSpacing: D.m({ wire: "teletextSpacing" }),
      XPosition: D.m({ wire: "xPosition" }),
      YPosition: D.m({ wire: "yPosition" }),
    },
  }),
  DestinationType: D.m({ wire: "destinationType" }),
  DvbSubDestinationSettings: D.m({
    wire: "dvbSubDestinationSettings",
    shape: {
      Alignment: D.m({ wire: "alignment" }),
      ApplyFontColor: D.m({ wire: "applyFontColor" }),
      BackgroundColor: D.m({ wire: "backgroundColor" }),
      BackgroundOpacity: D.m({ wire: "backgroundOpacity" }),
      DdsHandling: D.m({ wire: "ddsHandling" }),
      DdsXCoordinate: D.m({ wire: "ddsXCoordinate" }),
      DdsYCoordinate: D.m({ wire: "ddsYCoordinate" }),
      FallbackFont: D.m({ wire: "fallbackFont" }),
      FontColor: D.m({ wire: "fontColor" }),
      FontFileBold: D.m({ wire: "fontFileBold" }),
      FontFileBoldItalic: D.m({ wire: "fontFileBoldItalic" }),
      FontFileItalic: D.m({ wire: "fontFileItalic" }),
      FontFileRegular: D.m({ wire: "fontFileRegular" }),
      FontOpacity: D.m({ wire: "fontOpacity" }),
      FontResolution: D.m({ wire: "fontResolution" }),
      FontScript: D.m({ wire: "fontScript" }),
      FontSize: D.m({ wire: "fontSize" }),
      Height: D.m({ wire: "height" }),
      HexFontColor: D.m({ wire: "hexFontColor" }),
      OutlineColor: D.m({ wire: "outlineColor" }),
      OutlineSize: D.m({ wire: "outlineSize" }),
      ShadowColor: D.m({ wire: "shadowColor" }),
      ShadowOpacity: D.m({ wire: "shadowOpacity" }),
      ShadowXOffset: D.m({ wire: "shadowXOffset" }),
      ShadowYOffset: D.m({ wire: "shadowYOffset" }),
      StylePassthrough: D.m({ wire: "stylePassthrough" }),
      SubtitlingType: D.m({ wire: "subtitlingType" }),
      TeletextSpacing: D.m({ wire: "teletextSpacing" }),
      Width: D.m({ wire: "width" }),
      XPosition: D.m({ wire: "xPosition" }),
      YPosition: D.m({ wire: "yPosition" }),
    },
  }),
  EmbeddedDestinationSettings: D.m({
    wire: "embeddedDestinationSettings",
    shape: {
      Destination608ChannelNumber: D.m({ wire: "destination608ChannelNumber" }),
      Destination708ServiceNumber: D.m({ wire: "destination708ServiceNumber" }),
    },
  }),
  ImscDestinationSettings: D.m({
    wire: "imscDestinationSettings",
    shape: {
      Accessibility: D.m({ wire: "accessibility" }),
      StylePassthrough: D.m({ wire: "stylePassthrough" }),
    },
  }),
  SccDestinationSettings: D.m({
    wire: "sccDestinationSettings",
    shape: { Framerate: D.m({ wire: "framerate" }) },
  }),
  SrtDestinationSettings: D.m({
    wire: "srtDestinationSettings",
    shape: { StylePassthrough: D.m({ wire: "stylePassthrough" }) },
  }),
  TeletextDestinationSettings: D.m({
    wire: "teletextDestinationSettings",
    shape: {
      PageNumber: D.m({ wire: "pageNumber" }),
      PageTypes: D.m({ wire: "pageTypes" }),
    },
  }),
  TtmlDestinationSettings: D.m({
    wire: "ttmlDestinationSettings",
    shape: { StylePassthrough: D.m({ wire: "stylePassthrough" }) },
  }),
  WebvttDestinationSettings: D.m({
    wire: "webvttDestinationSettings",
    shape: {
      Accessibility: D.m({ wire: "accessibility" }),
      StylePassthrough: D.m({ wire: "stylePassthrough" }),
    },
  }),
});
const o_CaptionSelector: D.LazyStruct = () => ({
  CustomLanguageCode: D.m({ wire: "customLanguageCode" }),
  LanguageCode: D.m({ wire: "languageCode" }),
  SourceSettings: D.m({
    wire: "sourceSettings",
    shape: {
      AncillarySourceSettings: D.m({
        wire: "ancillarySourceSettings",
        shape: {
          Convert608To708: D.m({ wire: "convert608To708" }),
          SourceAncillaryChannelNumber: D.m({
            wire: "sourceAncillaryChannelNumber",
          }),
          TerminateCaptions: D.m({ wire: "terminateCaptions" }),
        },
      }),
      DvbSubSourceSettings: D.m({
        wire: "dvbSubSourceSettings",
        shape: { Pid: D.m({ wire: "pid" }) },
      }),
      EmbeddedSourceSettings: D.m({
        wire: "embeddedSourceSettings",
        shape: {
          Convert608To708: D.m({ wire: "convert608To708" }),
          Source608ChannelNumber: D.m({ wire: "source608ChannelNumber" }),
          Source608TrackNumber: D.m({ wire: "source608TrackNumber" }),
          TerminateCaptions: D.m({ wire: "terminateCaptions" }),
        },
      }),
      FileSourceSettings: D.m({
        wire: "fileSourceSettings",
        shape: {
          ByteRateLimit: D.m({ wire: "byteRateLimit" }),
          Convert608To708: D.m({ wire: "convert608To708" }),
          ConvertPaintToPop: D.m({ wire: "convertPaintToPop" }),
          Framerate: D.m({
            wire: "framerate",
            shape: {
              FramerateDenominator: D.m({ wire: "framerateDenominator" }),
              FramerateNumerator: D.m({ wire: "framerateNumerator" }),
            },
          }),
          SourceFile: D.m({ wire: "sourceFile" }),
          TimeDelta: D.m({ wire: "timeDelta" }),
          TimeDeltaUnits: D.m({ wire: "timeDeltaUnits" }),
          UpconvertSTLToTeletext: D.m({ wire: "upconvertSTLToTeletext" }),
        },
      }),
      SourceType: D.m({ wire: "sourceType" }),
      TeletextSourceSettings: D.m({
        wire: "teletextSourceSettings",
        shape: { PageNumber: D.m({ wire: "pageNumber" }) },
      }),
      TrackSourceSettings: D.m({
        wire: "trackSourceSettings",
        shape: {
          StreamNumber: D.m({ wire: "streamNumber" }),
          TrackNumber: D.m({ wire: "trackNumber" }),
        },
      }),
      WebvttHlsSourceSettings: D.m({
        wire: "webvttHlsSourceSettings",
        shape: {
          RenditionGroupId: D.m({ wire: "renditionGroupId" }),
          RenditionLanguageCode: D.m({ wire: "renditionLanguageCode" }),
          RenditionName: D.m({ wire: "renditionName" }),
        },
      }),
    },
  }),
});
const o_ColorConversion3DLUTSetting: D.LazyStruct = () => ({
  FileInput: D.m({ wire: "fileInput" }),
  InputColorSpace: D.m({ wire: "inputColorSpace" }),
  InputMasteringLuminance: D.m({ wire: "inputMasteringLuminance" }),
  OutputColorSpace: D.m({ wire: "outputColorSpace" }),
  OutputMasteringLuminance: D.m({ wire: "outputMasteringLuminance" }),
});
const o_ContainerSettings: D.LazyStruct = () => ({
  CmfcSettings: D.m({
    wire: "cmfcSettings",
    shape: {
      AudioDuration: D.m({ wire: "audioDuration" }),
      AudioGroupId: D.m({ wire: "audioGroupId" }),
      AudioRenditionSets: D.m({ wire: "audioRenditionSets" }),
      AudioTrackType: D.m({ wire: "audioTrackType" }),
      C2paManifest: D.m({ wire: "c2paManifest" }),
      CertificateSecret: D.m({ wire: "certificateSecret" }),
      DescriptiveVideoServiceFlag: D.m({ wire: "descriptiveVideoServiceFlag" }),
      IFrameOnlyManifest: D.m({ wire: "iFrameOnlyManifest" }),
      KlvMetadata: D.m({ wire: "klvMetadata" }),
      ManifestMetadataSignaling: D.m({ wire: "manifestMetadataSignaling" }),
      Scte35Esam: D.m({ wire: "scte35Esam" }),
      Scte35Source: D.m({ wire: "scte35Source" }),
      SigningKmsKey: D.m({ wire: "signingKmsKey" }),
      TimedMetadata: D.m({ wire: "timedMetadata" }),
      TimedMetadataBoxVersion: D.m({ wire: "timedMetadataBoxVersion" }),
      TimedMetadataSchemeIdUri: D.m({ wire: "timedMetadataSchemeIdUri" }),
      TimedMetadataValue: D.m({ wire: "timedMetadataValue" }),
    },
  }),
  Container: D.m({ wire: "container" }),
  F4vSettings: D.m({
    wire: "f4vSettings",
    shape: { MoovPlacement: D.m({ wire: "moovPlacement" }) },
  }),
  M2tsSettings: D.m({
    wire: "m2tsSettings",
    shape: {
      AudioBufferModel: D.m({ wire: "audioBufferModel" }),
      AudioDuration: D.m({ wire: "audioDuration" }),
      AudioFramesPerPes: D.m({ wire: "audioFramesPerPes" }),
      AudioPids: D.m({ wire: "audioPids" }),
      AudioPtsOffsetDelta: D.m({ wire: "audioPtsOffsetDelta" }),
      Bitrate: D.m({ wire: "bitrate" }),
      BufferModel: D.m({ wire: "bufferModel" }),
      DataPTSControl: D.m({ wire: "dataPTSControl" }),
      DvbNitSettings: D.m({
        wire: "dvbNitSettings",
        shape: {
          NetworkId: D.m({ wire: "networkId" }),
          NetworkName: D.m({ wire: "networkName" }),
          NitInterval: D.m({ wire: "nitInterval" }),
        },
      }),
      DvbSdtSettings: D.m({
        wire: "dvbSdtSettings",
        shape: {
          OutputSdt: D.m({ wire: "outputSdt" }),
          SdtInterval: D.m({ wire: "sdtInterval" }),
          ServiceName: D.m({ wire: "serviceName" }),
          ServiceProviderName: D.m({ wire: "serviceProviderName" }),
        },
      }),
      DvbSubPids: D.m({ wire: "dvbSubPids" }),
      DvbTdtSettings: D.m({
        wire: "dvbTdtSettings",
        shape: { TdtInterval: D.m({ wire: "tdtInterval" }) },
      }),
      DvbTeletextPid: D.m({ wire: "dvbTeletextPid" }),
      EbpAudioInterval: D.m({ wire: "ebpAudioInterval" }),
      EbpPlacement: D.m({ wire: "ebpPlacement" }),
      EsRateInPes: D.m({ wire: "esRateInPes" }),
      ForceTsVideoEbpOrder: D.m({ wire: "forceTsVideoEbpOrder" }),
      FragmentTime: D.m({ wire: "fragmentTime" }),
      KlvMetadata: D.m({ wire: "klvMetadata" }),
      MaxPcrInterval: D.m({ wire: "maxPcrInterval" }),
      MinEbpInterval: D.m({ wire: "minEbpInterval" }),
      NielsenId3: D.m({ wire: "nielsenId3" }),
      NullPacketBitrate: D.m({ wire: "nullPacketBitrate" }),
      PatInterval: D.m({ wire: "patInterval" }),
      PcrControl: D.m({ wire: "pcrControl" }),
      PcrPid: D.m({ wire: "pcrPid" }),
      PmtInterval: D.m({ wire: "pmtInterval" }),
      PmtPid: D.m({ wire: "pmtPid" }),
      PreventBufferUnderflow: D.m({ wire: "preventBufferUnderflow" }),
      PrivateMetadataPid: D.m({ wire: "privateMetadataPid" }),
      ProgramNumber: D.m({ wire: "programNumber" }),
      PtsOffset: D.m({ wire: "ptsOffset" }),
      PtsOffsetMode: D.m({ wire: "ptsOffsetMode" }),
      RateMode: D.m({ wire: "rateMode" }),
      Scte35Esam: D.m({
        wire: "scte35Esam",
        shape: { Scte35EsamPid: D.m({ wire: "scte35EsamPid" }) },
      }),
      Scte35Pid: D.m({ wire: "scte35Pid" }),
      Scte35Source: D.m({ wire: "scte35Source" }),
      SegmentationMarkers: D.m({ wire: "segmentationMarkers" }),
      SegmentationStyle: D.m({ wire: "segmentationStyle" }),
      SegmentationTime: D.m({ wire: "segmentationTime" }),
      TimedMetadataPid: D.m({ wire: "timedMetadataPid" }),
      TransportStreamId: D.m({ wire: "transportStreamId" }),
      VideoPid: D.m({ wire: "videoPid" }),
    },
  }),
  M3u8Settings: D.m({
    wire: "m3u8Settings",
    shape: {
      AudioDuration: D.m({ wire: "audioDuration" }),
      AudioFramesPerPes: D.m({ wire: "audioFramesPerPes" }),
      AudioPids: D.m({ wire: "audioPids" }),
      AudioPtsOffsetDelta: D.m({ wire: "audioPtsOffsetDelta" }),
      DataPTSControl: D.m({ wire: "dataPTSControl" }),
      MaxPcrInterval: D.m({ wire: "maxPcrInterval" }),
      NielsenId3: D.m({ wire: "nielsenId3" }),
      PatInterval: D.m({ wire: "patInterval" }),
      PcrControl: D.m({ wire: "pcrControl" }),
      PcrPid: D.m({ wire: "pcrPid" }),
      PmtInterval: D.m({ wire: "pmtInterval" }),
      PmtPid: D.m({ wire: "pmtPid" }),
      PrivateMetadataPid: D.m({ wire: "privateMetadataPid" }),
      ProgramNumber: D.m({ wire: "programNumber" }),
      PtsOffset: D.m({ wire: "ptsOffset" }),
      PtsOffsetMode: D.m({ wire: "ptsOffsetMode" }),
      Scte35Pid: D.m({ wire: "scte35Pid" }),
      Scte35Source: D.m({ wire: "scte35Source" }),
      TimedMetadata: D.m({ wire: "timedMetadata" }),
      TimedMetadataPid: D.m({ wire: "timedMetadataPid" }),
      TransportStreamId: D.m({ wire: "transportStreamId" }),
      VideoPid: D.m({ wire: "videoPid" }),
    },
  }),
  MovSettings: D.m({
    wire: "movSettings",
    shape: {
      AudioDuration: D.m({ wire: "audioDuration" }),
      ClapAtom: D.m({ wire: "clapAtom" }),
      CslgAtom: D.m({ wire: "cslgAtom" }),
      Mpeg2FourCCControl: D.m({ wire: "mpeg2FourCCControl" }),
      PaddingControl: D.m({ wire: "paddingControl" }),
      Reference: D.m({ wire: "reference" }),
    },
  }),
  Mp4Settings: D.m({
    wire: "mp4Settings",
    shape: {
      AudioDuration: D.m({ wire: "audioDuration" }),
      C2paManifest: D.m({ wire: "c2paManifest" }),
      CertificateSecret: D.m({ wire: "certificateSecret" }),
      CslgAtom: D.m({ wire: "cslgAtom" }),
      CttsVersion: D.m({ wire: "cttsVersion" }),
      FreeSpaceBox: D.m({ wire: "freeSpaceBox" }),
      MoovPlacement: D.m({ wire: "moovPlacement" }),
      Mp4MajorBrand: D.m({ wire: "mp4MajorBrand" }),
      SigningKmsKey: D.m({ wire: "signingKmsKey" }),
    },
  }),
  MpdSettings: D.m({
    wire: "mpdSettings",
    shape: {
      AccessibilityCaptionHints: D.m({ wire: "accessibilityCaptionHints" }),
      AudioDuration: D.m({ wire: "audioDuration" }),
      C2paManifest: D.m({ wire: "c2paManifest" }),
      CaptionContainerType: D.m({ wire: "captionContainerType" }),
      CertificateSecret: D.m({ wire: "certificateSecret" }),
      KlvMetadata: D.m({ wire: "klvMetadata" }),
      ManifestMetadataSignaling: D.m({ wire: "manifestMetadataSignaling" }),
      Scte35Esam: D.m({ wire: "scte35Esam" }),
      Scte35Source: D.m({ wire: "scte35Source" }),
      SigningKmsKey: D.m({ wire: "signingKmsKey" }),
      TimedMetadata: D.m({ wire: "timedMetadata" }),
      TimedMetadataBoxVersion: D.m({ wire: "timedMetadataBoxVersion" }),
      TimedMetadataSchemeIdUri: D.m({ wire: "timedMetadataSchemeIdUri" }),
      TimedMetadataValue: D.m({ wire: "timedMetadataValue" }),
    },
  }),
  MxfSettings: D.m({
    wire: "mxfSettings",
    shape: {
      AfdSignaling: D.m({ wire: "afdSignaling" }),
      Profile: D.m({ wire: "profile" }),
      UncompressedAudioWrapping: D.m({ wire: "uncompressedAudioWrapping" }),
      XavcProfileSettings: D.m({
        wire: "xavcProfileSettings",
        shape: {
          DurationMode: D.m({ wire: "durationMode" }),
          MaxAncDataSize: D.m({ wire: "maxAncDataSize" }),
        },
      }),
    },
  }),
});
const o_DynamicAudioSelector: D.LazyStruct = () => ({
  AudioDurationCorrection: D.m({ wire: "audioDurationCorrection" }),
  ExternalAudioFileInput: D.m({ wire: "externalAudioFileInput" }),
  LanguageCode: D.m({ wire: "languageCode" }),
  Offset: D.m({ wire: "offset" }),
  SelectorType: D.m({ wire: "selectorType" }),
});
const o_EsamSettings: D.LazyStruct = () => ({
  ManifestConfirmConditionNotification: D.m({
    wire: "manifestConfirmConditionNotification",
    shape: { MccXml: D.m({ wire: "mccXml" }) },
  }),
  ResponseSignalPreroll: D.m({ wire: "responseSignalPreroll" }),
  SignalProcessingNotification: D.m({
    wire: "signalProcessingNotification",
    shape: { SccXml: D.m({ wire: "sccXml" }) },
  }),
});
const o_ExtendedDataServices: D.LazyStruct = () => ({
  CopyProtectionAction: D.m({ wire: "copyProtectionAction" }),
  VchipAction: D.m({ wire: "vchipAction" }),
});
const o_HopDestination: D.LazyStruct = () => ({
  Priority: D.m({ wire: "priority" }),
  Queue: D.m({ wire: "queue" }),
  WaitMinutes: D.m({ wire: "waitMinutes" }),
});
const o_ImageInserter: D.LazyStruct = () => ({
  InsertableImages: D.m({
    wire: "insertableImages",
    shape: D.list({
      Duration: D.m({ wire: "duration" }),
      FadeIn: D.m({ wire: "fadeIn" }),
      FadeOut: D.m({ wire: "fadeOut" }),
      Height: D.m({ wire: "height" }),
      ImageInserterInput: D.m({ wire: "imageInserterInput" }),
      ImageX: D.m({ wire: "imageX" }),
      ImageY: D.m({ wire: "imageY" }),
      Layer: D.m({ wire: "layer" }),
      Opacity: D.m({ wire: "opacity" }),
      StartTime: D.m({ wire: "startTime" }),
      Width: D.m({ wire: "width" }),
    }),
  }),
  SdrReferenceWhiteLevel: D.m({ wire: "sdrReferenceWhiteLevel" }),
});
const o_InputClipping: D.LazyStruct = () => ({
  EndTimecode: D.m({ wire: "endTimecode" }),
  StartTimecode: D.m({ wire: "startTimecode" }),
});
const o_KantarWatermarkSettings: D.LazyStruct = () => ({
  ChannelName: D.m({ wire: "channelName" }),
  ContentReference: D.m({ wire: "contentReference" }),
  CredentialsSecretName: D.m({ wire: "credentialsSecretName" }),
  FileOffset: D.m({ wire: "fileOffset" }),
  KantarLicenseId: D.m({ wire: "kantarLicenseId" }),
  KantarServerUrl: D.m({ wire: "kantarServerUrl" }),
  LogDestination: D.m({ wire: "logDestination" }),
  Metadata3: D.m({ wire: "metadata3" }),
  Metadata4: D.m({ wire: "metadata4" }),
  Metadata5: D.m({ wire: "metadata5" }),
  Metadata6: D.m({ wire: "metadata6" }),
  Metadata7: D.m({ wire: "metadata7" }),
  Metadata8: D.m({ wire: "metadata8" }),
});
const o_MotionImageInserter: D.LazyStruct = () => ({
  Framerate: D.m({
    wire: "framerate",
    shape: {
      FramerateDenominator: D.m({ wire: "framerateDenominator" }),
      FramerateNumerator: D.m({ wire: "framerateNumerator" }),
    },
  }),
  Input: D.m({ wire: "input" }),
  InsertionMode: D.m({ wire: "insertionMode" }),
  Offset: D.m({
    wire: "offset",
    shape: { ImageX: D.m({ wire: "imageX" }), ImageY: D.m({ wire: "imageY" }) },
  }),
  Playback: D.m({ wire: "playback" }),
  StartTime: D.m({ wire: "startTime" }),
});
const o_MultiViewSettings: D.LazyStruct = () => ({
  Input: D.m({
    wire: "input",
    shape: { FileInput: D.m({ wire: "fileInput" }) },
  }),
});
const o_NielsenConfiguration: D.LazyStruct = () => ({
  BreakoutCode: D.m({ wire: "breakoutCode" }),
  DistributorId: D.m({ wire: "distributorId" }),
});
const o_NielsenNonLinearWatermarkSettings: D.LazyStruct = () => ({
  ActiveWatermarkProcess: D.m({ wire: "activeWatermarkProcess" }),
  AdiFilename: D.m({ wire: "adiFilename" }),
  AssetId: D.m({ wire: "assetId" }),
  AssetName: D.m({ wire: "assetName" }),
  CbetSourceId: D.m({ wire: "cbetSourceId" }),
  EpisodeId: D.m({ wire: "episodeId" }),
  MetadataDestination: D.m({ wire: "metadataDestination" }),
  SourceId: D.m({ wire: "sourceId" }),
  SourceWatermarkStatus: D.m({ wire: "sourceWatermarkStatus" }),
  TicServerUrl: D.m({ wire: "ticServerUrl" }),
  UniqueTicPerAudioTrack: D.m({ wire: "uniqueTicPerAudioTrack" }),
});
const o_OutputGroup: D.LazyStruct = () => ({
  AutomatedEncodingSettings: D.m({
    wire: "automatedEncodingSettings",
    shape: {
      AbrSettings: D.m({
        wire: "abrSettings",
        shape: {
          MaxAbrBitrate: D.m({ wire: "maxAbrBitrate" }),
          MaxQualityLevel: D.m({ wire: "maxQualityLevel" }),
          MaxRenditions: D.m({ wire: "maxRenditions" }),
          MinAbrBitrate: D.m({ wire: "minAbrBitrate" }),
          Rules: D.m({
            wire: "rules",
            shape: D.list({
              AllowedRenditions: D.m({
                wire: "allowedRenditions",
                shape: D.list({
                  Height: D.m({ wire: "height" }),
                  Required: D.m({ wire: "required" }),
                  Width: D.m({ wire: "width" }),
                }),
              }),
              ForceIncludeRenditions: D.m({
                wire: "forceIncludeRenditions",
                shape: D.list({
                  Height: D.m({ wire: "height" }),
                  Width: D.m({ wire: "width" }),
                }),
              }),
              MinBottomRenditionSize: D.m({
                wire: "minBottomRenditionSize",
                shape: {
                  Height: D.m({ wire: "height" }),
                  Width: D.m({ wire: "width" }),
                },
              }),
              MinTopRenditionSize: D.m({
                wire: "minTopRenditionSize",
                shape: {
                  Height: D.m({ wire: "height" }),
                  Width: D.m({ wire: "width" }),
                },
              }),
              Type: D.m({ wire: "type" }),
            }),
          }),
        },
      }),
    },
  }),
  CustomName: D.m({ wire: "customName" }),
  Name: D.m({ wire: "name" }),
  OutputGroupSettings: D.m({
    wire: "outputGroupSettings",
    shape: {
      CmafGroupSettings: D.m({
        wire: "cmafGroupSettings",
        shape: {
          AdditionalManifests: D.m({
            wire: "additionalManifests",
            shape: D.list({
              ManifestNameModifier: D.m({ wire: "manifestNameModifier" }),
              SelectedOutputs: D.m({ wire: "selectedOutputs" }),
            }),
          }),
          BaseUrl: D.m({ wire: "baseUrl" }),
          ClientCache: D.m({ wire: "clientCache" }),
          CodecSpecification: D.m({ wire: "codecSpecification" }),
          DashIFrameTrickPlayNameModifier: D.m({
            wire: "dashIFrameTrickPlayNameModifier",
          }),
          DashManifestStyle: D.m({ wire: "dashManifestStyle" }),
          Destination: D.m({ wire: "destination" }),
          DestinationSettings: D.m({
            wire: "destinationSettings",
            shape: o_DestinationSettings,
          }),
          Encryption: D.m({
            wire: "encryption",
            shape: {
              ClearLeadSegments: D.m({ wire: "clearLeadSegments" }),
              ConstantInitializationVector: D.m({
                wire: "constantInitializationVector",
              }),
              EncryptionMethod: D.m({ wire: "encryptionMethod" }),
              InitializationVectorInManifest: D.m({
                wire: "initializationVectorInManifest",
              }),
              SpekeKeyProvider: D.m({
                wire: "spekeKeyProvider",
                shape: {
                  CertificateArn: D.m({ wire: "certificateArn" }),
                  DashSignaledSystemIds: D.m({ wire: "dashSignaledSystemIds" }),
                  EncryptionContractConfiguration: D.m({
                    wire: "encryptionContractConfiguration",
                    shape: o_EncryptionContractConfiguration,
                  }),
                  HlsSignaledSystemIds: D.m({ wire: "hlsSignaledSystemIds" }),
                  ResourceId: D.m({ wire: "resourceId" }),
                  Url: D.m({ wire: "url" }),
                },
              }),
              StaticKeyProvider: D.m({
                wire: "staticKeyProvider",
                shape: o_StaticKeyProvider,
              }),
              Type: D.m({ wire: "type" }),
            },
          }),
          FragmentLength: D.m({ wire: "fragmentLength" }),
          ImageBasedTrickPlay: D.m({ wire: "imageBasedTrickPlay" }),
          ImageBasedTrickPlaySettings: D.m({
            wire: "imageBasedTrickPlaySettings",
            shape: {
              IntervalCadence: D.m({ wire: "intervalCadence" }),
              ThumbnailHeight: D.m({ wire: "thumbnailHeight" }),
              ThumbnailInterval: D.m({ wire: "thumbnailInterval" }),
              ThumbnailWidth: D.m({ wire: "thumbnailWidth" }),
              TileHeight: D.m({ wire: "tileHeight" }),
              TileWidth: D.m({ wire: "tileWidth" }),
            },
          }),
          ImageBasedTrickPlayVariants: D.m({
            wire: "imageBasedTrickPlayVariants",
            shape: D.list({
              IntervalCadence: D.m({ wire: "intervalCadence" }),
              ThumbnailHeight: D.m({ wire: "thumbnailHeight" }),
              ThumbnailInterval: D.m({ wire: "thumbnailInterval" }),
              ThumbnailWidth: D.m({ wire: "thumbnailWidth" }),
              TileHeight: D.m({ wire: "tileHeight" }),
              TileWidth: D.m({ wire: "tileWidth" }),
            }),
          }),
          ManifestCompression: D.m({ wire: "manifestCompression" }),
          ManifestDurationFormat: D.m({ wire: "manifestDurationFormat" }),
          MinBufferTime: D.m({ wire: "minBufferTime" }),
          MinFinalSegmentLength: D.m({ wire: "minFinalSegmentLength" }),
          MpdManifestBandwidthType: D.m({ wire: "mpdManifestBandwidthType" }),
          MpdProfile: D.m({ wire: "mpdProfile" }),
          PtsOffsetHandlingForBFrames: D.m({
            wire: "ptsOffsetHandlingForBFrames",
          }),
          SegmentControl: D.m({ wire: "segmentControl" }),
          SegmentLength: D.m({ wire: "segmentLength" }),
          SegmentLengthControl: D.m({ wire: "segmentLengthControl" }),
          StreamInfResolution: D.m({ wire: "streamInfResolution" }),
          TargetDurationCompatibilityMode: D.m({
            wire: "targetDurationCompatibilityMode",
          }),
          VideoCompositionOffsets: D.m({ wire: "videoCompositionOffsets" }),
          WriteDashManifest: D.m({ wire: "writeDashManifest" }),
          WriteHlsManifest: D.m({ wire: "writeHlsManifest" }),
          WriteSegmentTimelineInRepresentation: D.m({
            wire: "writeSegmentTimelineInRepresentation",
          }),
        },
      }),
      DashIsoGroupSettings: D.m({
        wire: "dashIsoGroupSettings",
        shape: {
          AdditionalManifests: D.m({
            wire: "additionalManifests",
            shape: D.list({
              ManifestNameModifier: D.m({ wire: "manifestNameModifier" }),
              SelectedOutputs: D.m({ wire: "selectedOutputs" }),
            }),
          }),
          AudioChannelConfigSchemeIdUri: D.m({
            wire: "audioChannelConfigSchemeIdUri",
          }),
          BaseUrl: D.m({ wire: "baseUrl" }),
          DashIFrameTrickPlayNameModifier: D.m({
            wire: "dashIFrameTrickPlayNameModifier",
          }),
          DashManifestStyle: D.m({ wire: "dashManifestStyle" }),
          Destination: D.m({ wire: "destination" }),
          DestinationSettings: D.m({
            wire: "destinationSettings",
            shape: o_DestinationSettings,
          }),
          Encryption: D.m({
            wire: "encryption",
            shape: {
              PlaybackDeviceCompatibility: D.m({
                wire: "playbackDeviceCompatibility",
              }),
              SpekeKeyProvider: D.m({
                wire: "spekeKeyProvider",
                shape: o_SpekeKeyProvider,
              }),
            },
          }),
          FragmentLength: D.m({ wire: "fragmentLength" }),
          HbbtvCompliance: D.m({ wire: "hbbtvCompliance" }),
          ImageBasedTrickPlay: D.m({ wire: "imageBasedTrickPlay" }),
          ImageBasedTrickPlaySettings: D.m({
            wire: "imageBasedTrickPlaySettings",
            shape: {
              IntervalCadence: D.m({ wire: "intervalCadence" }),
              ThumbnailHeight: D.m({ wire: "thumbnailHeight" }),
              ThumbnailInterval: D.m({ wire: "thumbnailInterval" }),
              ThumbnailWidth: D.m({ wire: "thumbnailWidth" }),
              TileHeight: D.m({ wire: "tileHeight" }),
              TileWidth: D.m({ wire: "tileWidth" }),
            },
          }),
          ImageBasedTrickPlayVariants: D.m({
            wire: "imageBasedTrickPlayVariants",
            shape: D.list({
              IntervalCadence: D.m({ wire: "intervalCadence" }),
              ThumbnailHeight: D.m({ wire: "thumbnailHeight" }),
              ThumbnailInterval: D.m({ wire: "thumbnailInterval" }),
              ThumbnailWidth: D.m({ wire: "thumbnailWidth" }),
              TileHeight: D.m({ wire: "tileHeight" }),
              TileWidth: D.m({ wire: "tileWidth" }),
            }),
          }),
          MinBufferTime: D.m({ wire: "minBufferTime" }),
          MinFinalSegmentLength: D.m({ wire: "minFinalSegmentLength" }),
          MpdManifestBandwidthType: D.m({ wire: "mpdManifestBandwidthType" }),
          MpdProfile: D.m({ wire: "mpdProfile" }),
          PtsOffsetHandlingForBFrames: D.m({
            wire: "ptsOffsetHandlingForBFrames",
          }),
          SegmentControl: D.m({ wire: "segmentControl" }),
          SegmentLength: D.m({ wire: "segmentLength" }),
          SegmentLengthControl: D.m({ wire: "segmentLengthControl" }),
          VideoCompositionOffsets: D.m({ wire: "videoCompositionOffsets" }),
          WriteSegmentTimelineInRepresentation: D.m({
            wire: "writeSegmentTimelineInRepresentation",
          }),
        },
      }),
      FileGroupSettings: D.m({
        wire: "fileGroupSettings",
        shape: {
          Destination: D.m({ wire: "destination" }),
          DestinationSettings: D.m({
            wire: "destinationSettings",
            shape: o_DestinationSettings,
          }),
        },
      }),
      HlsGroupSettings: D.m({
        wire: "hlsGroupSettings",
        shape: {
          AdMarkers: D.m({ wire: "adMarkers" }),
          AdditionalManifests: D.m({
            wire: "additionalManifests",
            shape: D.list({
              ManifestNameModifier: D.m({ wire: "manifestNameModifier" }),
              SelectedOutputs: D.m({ wire: "selectedOutputs" }),
            }),
          }),
          AudioOnlyHeader: D.m({ wire: "audioOnlyHeader" }),
          BaseUrl: D.m({ wire: "baseUrl" }),
          CaptionLanguageMappings: D.m({
            wire: "captionLanguageMappings",
            shape: D.list({
              CaptionChannel: D.m({ wire: "captionChannel" }),
              CustomLanguageCode: D.m({ wire: "customLanguageCode" }),
              LanguageCode: D.m({ wire: "languageCode" }),
              LanguageDescription: D.m({ wire: "languageDescription" }),
            }),
          }),
          CaptionLanguageSetting: D.m({ wire: "captionLanguageSetting" }),
          CaptionSegmentLengthControl: D.m({
            wire: "captionSegmentLengthControl",
          }),
          ClientCache: D.m({ wire: "clientCache" }),
          CodecSpecification: D.m({ wire: "codecSpecification" }),
          Destination: D.m({ wire: "destination" }),
          DestinationSettings: D.m({
            wire: "destinationSettings",
            shape: o_DestinationSettings,
          }),
          DirectoryStructure: D.m({ wire: "directoryStructure" }),
          Encryption: D.m({
            wire: "encryption",
            shape: {
              ConstantInitializationVector: D.m({
                wire: "constantInitializationVector",
              }),
              EncryptionMethod: D.m({ wire: "encryptionMethod" }),
              InitializationVectorInManifest: D.m({
                wire: "initializationVectorInManifest",
              }),
              OfflineEncrypted: D.m({ wire: "offlineEncrypted" }),
              SpekeKeyProvider: D.m({
                wire: "spekeKeyProvider",
                shape: o_SpekeKeyProvider,
              }),
              StaticKeyProvider: D.m({
                wire: "staticKeyProvider",
                shape: o_StaticKeyProvider,
              }),
              Type: D.m({ wire: "type" }),
            },
          }),
          ImageBasedTrickPlay: D.m({ wire: "imageBasedTrickPlay" }),
          ImageBasedTrickPlaySettings: D.m({
            wire: "imageBasedTrickPlaySettings",
            shape: {
              IntervalCadence: D.m({ wire: "intervalCadence" }),
              ThumbnailHeight: D.m({ wire: "thumbnailHeight" }),
              ThumbnailInterval: D.m({ wire: "thumbnailInterval" }),
              ThumbnailWidth: D.m({ wire: "thumbnailWidth" }),
              TileHeight: D.m({ wire: "tileHeight" }),
              TileWidth: D.m({ wire: "tileWidth" }),
            },
          }),
          ImageBasedTrickPlayVariants: D.m({
            wire: "imageBasedTrickPlayVariants",
            shape: D.list({
              IntervalCadence: D.m({ wire: "intervalCadence" }),
              ThumbnailHeight: D.m({ wire: "thumbnailHeight" }),
              ThumbnailInterval: D.m({ wire: "thumbnailInterval" }),
              ThumbnailWidth: D.m({ wire: "thumbnailWidth" }),
              TileHeight: D.m({ wire: "tileHeight" }),
              TileWidth: D.m({ wire: "tileWidth" }),
            }),
          }),
          ManifestCompression: D.m({ wire: "manifestCompression" }),
          ManifestDurationFormat: D.m({ wire: "manifestDurationFormat" }),
          MinFinalSegmentLength: D.m({ wire: "minFinalSegmentLength" }),
          MinSegmentLength: D.m({ wire: "minSegmentLength" }),
          OutputSelection: D.m({ wire: "outputSelection" }),
          ProgramDateTime: D.m({ wire: "programDateTime" }),
          ProgramDateTimePeriod: D.m({ wire: "programDateTimePeriod" }),
          ProgressiveWriteHlsManifest: D.m({
            wire: "progressiveWriteHlsManifest",
          }),
          SegmentControl: D.m({ wire: "segmentControl" }),
          SegmentLength: D.m({ wire: "segmentLength" }),
          SegmentLengthControl: D.m({ wire: "segmentLengthControl" }),
          SegmentsPerSubdirectory: D.m({ wire: "segmentsPerSubdirectory" }),
          StreamInfResolution: D.m({ wire: "streamInfResolution" }),
          TargetDurationCompatibilityMode: D.m({
            wire: "targetDurationCompatibilityMode",
          }),
          TimedMetadataId3Frame: D.m({ wire: "timedMetadataId3Frame" }),
          TimedMetadataId3Period: D.m({ wire: "timedMetadataId3Period" }),
          TimestampDeltaMilliseconds: D.m({
            wire: "timestampDeltaMilliseconds",
          }),
        },
      }),
      MsSmoothGroupSettings: D.m({
        wire: "msSmoothGroupSettings",
        shape: {
          AdditionalManifests: D.m({
            wire: "additionalManifests",
            shape: D.list({
              ManifestNameModifier: D.m({ wire: "manifestNameModifier" }),
              SelectedOutputs: D.m({ wire: "selectedOutputs" }),
            }),
          }),
          AudioDeduplication: D.m({ wire: "audioDeduplication" }),
          Destination: D.m({ wire: "destination" }),
          DestinationSettings: D.m({
            wire: "destinationSettings",
            shape: o_DestinationSettings,
          }),
          Encryption: D.m({
            wire: "encryption",
            shape: {
              SpekeKeyProvider: D.m({
                wire: "spekeKeyProvider",
                shape: o_SpekeKeyProvider,
              }),
            },
          }),
          FragmentLength: D.m({ wire: "fragmentLength" }),
          FragmentLengthControl: D.m({ wire: "fragmentLengthControl" }),
          ManifestEncoding: D.m({ wire: "manifestEncoding" }),
        },
      }),
      PerFrameMetrics: D.m({ wire: "perFrameMetrics" }),
      Type: D.m({ wire: "type" }),
    },
  }),
  Outputs: D.m({
    wire: "outputs",
    shape: D.list({
      AudioDescriptions: D.m({
        wire: "audioDescriptions",
        shape: D.list(o_AudioDescription),
      }),
      CaptionDescriptions: D.m({
        wire: "captionDescriptions",
        shape: D.list({
          CaptionSelectorName: D.m({ wire: "captionSelectorName" }),
          CustomLanguageCode: D.m({ wire: "customLanguageCode" }),
          DestinationSettings: D.m({
            wire: "destinationSettings",
            shape: o_CaptionDestinationSettings,
          }),
          LanguageCode: D.m({ wire: "languageCode" }),
          LanguageDescription: D.m({ wire: "languageDescription" }),
        }),
      }),
      ContainerSettings: D.m({
        wire: "containerSettings",
        shape: o_ContainerSettings,
      }),
      Extension: D.m({ wire: "extension" }),
      NameModifier: D.m({ wire: "nameModifier" }),
      OutputSettings: D.m({
        wire: "outputSettings",
        shape: {
          HlsSettings: D.m({
            wire: "hlsSettings",
            shape: {
              AudioGroupId: D.m({ wire: "audioGroupId" }),
              AudioOnlyContainer: D.m({ wire: "audioOnlyContainer" }),
              AudioRenditionSets: D.m({ wire: "audioRenditionSets" }),
              AudioTrackType: D.m({ wire: "audioTrackType" }),
              DescriptiveVideoServiceFlag: D.m({
                wire: "descriptiveVideoServiceFlag",
              }),
              IFrameOnlyManifest: D.m({ wire: "iFrameOnlyManifest" }),
              SegmentModifier: D.m({ wire: "segmentModifier" }),
            },
          }),
        },
      }),
      Preset: D.m({ wire: "preset" }),
      VideoDescription: D.m({
        wire: "videoDescription",
        shape: o_VideoDescription,
      }),
    }),
  }),
});
const o_Rectangle: D.LazyStruct = () => ({
  Height: D.m({ wire: "height" }),
  Width: D.m({ wire: "width" }),
  X: D.m({ wire: "x" }),
  Y: D.m({ wire: "y" }),
});
const o_TimecodeConfig: D.LazyStruct = () => ({
  Anchor: D.m({ wire: "anchor" }),
  Source: D.m({ wire: "source" }),
  Start: D.m({ wire: "start" }),
  TimestampOffset: D.m({ wire: "timestampOffset" }),
});
const o_TimedMetadataInsertion: D.LazyStruct = () => ({
  Id3Insertions: D.m({
    wire: "id3Insertions",
    shape: D.list({
      Id3: D.m({ wire: "id3" }),
      Timecode: D.m({ wire: "timecode" }),
    }),
  }),
});
const o_VideoDescription: D.LazyStruct = () => ({
  AfdSignaling: D.m({ wire: "afdSignaling" }),
  AntiAlias: D.m({ wire: "antiAlias" }),
  ChromaPositionMode: D.m({ wire: "chromaPositionMode" }),
  CodecSettings: D.m({
    wire: "codecSettings",
    shape: {
      Av1Settings: D.m({
        wire: "av1Settings",
        shape: {
          AdaptiveQuantization: D.m({ wire: "adaptiveQuantization" }),
          BitDepth: D.m({ wire: "bitDepth" }),
          FilmGrainSynthesis: D.m({ wire: "filmGrainSynthesis" }),
          FramerateControl: D.m({ wire: "framerateControl" }),
          FramerateConversionAlgorithm: D.m({
            wire: "framerateConversionAlgorithm",
          }),
          FramerateDenominator: D.m({ wire: "framerateDenominator" }),
          FramerateNumerator: D.m({ wire: "framerateNumerator" }),
          GopSize: D.m({ wire: "gopSize" }),
          MaxBitrate: D.m({ wire: "maxBitrate" }),
          NumberBFramesBetweenReferenceFrames: D.m({
            wire: "numberBFramesBetweenReferenceFrames",
          }),
          PerFrameMetrics: D.m({ wire: "perFrameMetrics" }),
          QvbrSettings: D.m({
            wire: "qvbrSettings",
            shape: {
              QvbrQualityLevel: D.m({ wire: "qvbrQualityLevel" }),
              QvbrQualityLevelFineTune: D.m({
                wire: "qvbrQualityLevelFineTune",
              }),
            },
          }),
          RateControlMode: D.m({ wire: "rateControlMode" }),
          Slices: D.m({ wire: "slices" }),
          SpatialAdaptiveQuantization: D.m({
            wire: "spatialAdaptiveQuantization",
          }),
        },
      }),
      AvcIntraSettings: D.m({
        wire: "avcIntraSettings",
        shape: {
          AvcIntraClass: D.m({ wire: "avcIntraClass" }),
          AvcIntraUhdSettings: D.m({
            wire: "avcIntraUhdSettings",
            shape: { QualityTuningLevel: D.m({ wire: "qualityTuningLevel" }) },
          }),
          FramerateControl: D.m({ wire: "framerateControl" }),
          FramerateConversionAlgorithm: D.m({
            wire: "framerateConversionAlgorithm",
          }),
          FramerateDenominator: D.m({ wire: "framerateDenominator" }),
          FramerateNumerator: D.m({ wire: "framerateNumerator" }),
          InterlaceMode: D.m({ wire: "interlaceMode" }),
          PerFrameMetrics: D.m({ wire: "perFrameMetrics" }),
          ScanTypeConversionMode: D.m({ wire: "scanTypeConversionMode" }),
          SlowPal: D.m({ wire: "slowPal" }),
          Telecine: D.m({ wire: "telecine" }),
        },
      }),
      Codec: D.m({ wire: "codec" }),
      FrameCaptureSettings: D.m({
        wire: "frameCaptureSettings",
        shape: {
          FramerateDenominator: D.m({ wire: "framerateDenominator" }),
          FramerateNumerator: D.m({ wire: "framerateNumerator" }),
          MaxCaptures: D.m({ wire: "maxCaptures" }),
          Quality: D.m({ wire: "quality" }),
        },
      }),
      GifSettings: D.m({
        wire: "gifSettings",
        shape: {
          FramerateControl: D.m({ wire: "framerateControl" }),
          FramerateConversionAlgorithm: D.m({
            wire: "framerateConversionAlgorithm",
          }),
          FramerateDenominator: D.m({ wire: "framerateDenominator" }),
          FramerateNumerator: D.m({ wire: "framerateNumerator" }),
        },
      }),
      H264Settings: D.m({
        wire: "h264Settings",
        shape: {
          AdaptiveQuantization: D.m({ wire: "adaptiveQuantization" }),
          BandwidthReductionFilter: D.m({
            wire: "bandwidthReductionFilter",
            shape: o_BandwidthReductionFilter,
          }),
          Bitrate: D.m({ wire: "bitrate" }),
          CodecLevel: D.m({ wire: "codecLevel" }),
          CodecProfile: D.m({ wire: "codecProfile" }),
          DynamicSubGop: D.m({ wire: "dynamicSubGop" }),
          EndOfStreamMarkers: D.m({ wire: "endOfStreamMarkers" }),
          EntropyEncoding: D.m({ wire: "entropyEncoding" }),
          ExplicitWeightedPrediction: D.m({
            wire: "explicitWeightedPrediction",
          }),
          FieldEncoding: D.m({ wire: "fieldEncoding" }),
          FlickerAdaptiveQuantization: D.m({
            wire: "flickerAdaptiveQuantization",
          }),
          FramerateControl: D.m({ wire: "framerateControl" }),
          FramerateConversionAlgorithm: D.m({
            wire: "framerateConversionAlgorithm",
          }),
          FramerateDenominator: D.m({ wire: "framerateDenominator" }),
          FramerateNumerator: D.m({ wire: "framerateNumerator" }),
          GopBReference: D.m({ wire: "gopBReference" }),
          GopClosedCadence: D.m({ wire: "gopClosedCadence" }),
          GopSize: D.m({ wire: "gopSize" }),
          GopSizeUnits: D.m({ wire: "gopSizeUnits" }),
          HrdBufferFinalFillPercentage: D.m({
            wire: "hrdBufferFinalFillPercentage",
          }),
          HrdBufferInitialFillPercentage: D.m({
            wire: "hrdBufferInitialFillPercentage",
          }),
          HrdBufferSize: D.m({ wire: "hrdBufferSize" }),
          InterlaceMode: D.m({ wire: "interlaceMode" }),
          MaxBitrate: D.m({ wire: "maxBitrate" }),
          MinIInterval: D.m({ wire: "minIInterval" }),
          NumberBFramesBetweenReferenceFrames: D.m({
            wire: "numberBFramesBetweenReferenceFrames",
          }),
          NumberReferenceFrames: D.m({ wire: "numberReferenceFrames" }),
          ParControl: D.m({ wire: "parControl" }),
          ParDenominator: D.m({ wire: "parDenominator" }),
          ParNumerator: D.m({ wire: "parNumerator" }),
          PerFrameMetrics: D.m({ wire: "perFrameMetrics" }),
          QualityTuningLevel: D.m({ wire: "qualityTuningLevel" }),
          QvbrSettings: D.m({
            wire: "qvbrSettings",
            shape: {
              MaxAverageBitrate: D.m({ wire: "maxAverageBitrate" }),
              QvbrQualityLevel: D.m({ wire: "qvbrQualityLevel" }),
              QvbrQualityLevelFineTune: D.m({
                wire: "qvbrQualityLevelFineTune",
              }),
            },
          }),
          RateControlMode: D.m({ wire: "rateControlMode" }),
          RepeatPps: D.m({ wire: "repeatPps" }),
          SaliencyAwareEncoding: D.m({ wire: "saliencyAwareEncoding" }),
          ScanTypeConversionMode: D.m({ wire: "scanTypeConversionMode" }),
          SceneChangeDetect: D.m({ wire: "sceneChangeDetect" }),
          Slices: D.m({ wire: "slices" }),
          SlowPal: D.m({ wire: "slowPal" }),
          Softness: D.m({ wire: "softness" }),
          SpatialAdaptiveQuantization: D.m({
            wire: "spatialAdaptiveQuantization",
          }),
          Syntax: D.m({ wire: "syntax" }),
          Telecine: D.m({ wire: "telecine" }),
          TemporalAdaptiveQuantization: D.m({
            wire: "temporalAdaptiveQuantization",
          }),
          UnregisteredSeiTimecode: D.m({ wire: "unregisteredSeiTimecode" }),
          WriteMp4PackagingType: D.m({ wire: "writeMp4PackagingType" }),
        },
      }),
      H265Settings: D.m({
        wire: "h265Settings",
        shape: {
          AdaptiveQuantization: D.m({ wire: "adaptiveQuantization" }),
          AlternateTransferFunctionSei: D.m({
            wire: "alternateTransferFunctionSei",
          }),
          BandwidthReductionFilter: D.m({
            wire: "bandwidthReductionFilter",
            shape: o_BandwidthReductionFilter,
          }),
          Bitrate: D.m({ wire: "bitrate" }),
          CodecLevel: D.m({ wire: "codecLevel" }),
          CodecProfile: D.m({ wire: "codecProfile" }),
          Deblocking: D.m({ wire: "deblocking" }),
          DynamicSubGop: D.m({ wire: "dynamicSubGop" }),
          EndOfStreamMarkers: D.m({ wire: "endOfStreamMarkers" }),
          FlickerAdaptiveQuantization: D.m({
            wire: "flickerAdaptiveQuantization",
          }),
          FramerateControl: D.m({ wire: "framerateControl" }),
          FramerateConversionAlgorithm: D.m({
            wire: "framerateConversionAlgorithm",
          }),
          FramerateDenominator: D.m({ wire: "framerateDenominator" }),
          FramerateNumerator: D.m({ wire: "framerateNumerator" }),
          GopBReference: D.m({ wire: "gopBReference" }),
          GopClosedCadence: D.m({ wire: "gopClosedCadence" }),
          GopSize: D.m({ wire: "gopSize" }),
          GopSizeUnits: D.m({ wire: "gopSizeUnits" }),
          HrdBufferFinalFillPercentage: D.m({
            wire: "hrdBufferFinalFillPercentage",
          }),
          HrdBufferInitialFillPercentage: D.m({
            wire: "hrdBufferInitialFillPercentage",
          }),
          HrdBufferSize: D.m({ wire: "hrdBufferSize" }),
          InterlaceMode: D.m({ wire: "interlaceMode" }),
          MaxBitrate: D.m({ wire: "maxBitrate" }),
          MinIInterval: D.m({ wire: "minIInterval" }),
          MvOverPictureBoundaries: D.m({ wire: "mvOverPictureBoundaries" }),
          MvTemporalPredictor: D.m({ wire: "mvTemporalPredictor" }),
          NumberBFramesBetweenReferenceFrames: D.m({
            wire: "numberBFramesBetweenReferenceFrames",
          }),
          NumberReferenceFrames: D.m({ wire: "numberReferenceFrames" }),
          ParControl: D.m({ wire: "parControl" }),
          ParDenominator: D.m({ wire: "parDenominator" }),
          ParNumerator: D.m({ wire: "parNumerator" }),
          PerFrameMetrics: D.m({ wire: "perFrameMetrics" }),
          QualityTuningLevel: D.m({ wire: "qualityTuningLevel" }),
          QvbrSettings: D.m({
            wire: "qvbrSettings",
            shape: {
              MaxAverageBitrate: D.m({ wire: "maxAverageBitrate" }),
              QvbrQualityLevel: D.m({ wire: "qvbrQualityLevel" }),
              QvbrQualityLevelFineTune: D.m({
                wire: "qvbrQualityLevelFineTune",
              }),
            },
          }),
          RateControlMode: D.m({ wire: "rateControlMode" }),
          SampleAdaptiveOffsetFilterMode: D.m({
            wire: "sampleAdaptiveOffsetFilterMode",
          }),
          ScanTypeConversionMode: D.m({ wire: "scanTypeConversionMode" }),
          SceneChangeDetect: D.m({ wire: "sceneChangeDetect" }),
          Slices: D.m({ wire: "slices" }),
          SlowPal: D.m({ wire: "slowPal" }),
          SpatialAdaptiveQuantization: D.m({
            wire: "spatialAdaptiveQuantization",
          }),
          Telecine: D.m({ wire: "telecine" }),
          TemporalAdaptiveQuantization: D.m({
            wire: "temporalAdaptiveQuantization",
          }),
          TemporalIds: D.m({ wire: "temporalIds" }),
          TileHeight: D.m({ wire: "tileHeight" }),
          TilePadding: D.m({ wire: "tilePadding" }),
          TileWidth: D.m({ wire: "tileWidth" }),
          Tiles: D.m({ wire: "tiles" }),
          TreeBlockSize: D.m({ wire: "treeBlockSize" }),
          UnregisteredSeiTimecode: D.m({ wire: "unregisteredSeiTimecode" }),
          WriteMp4PackagingType: D.m({ wire: "writeMp4PackagingType" }),
        },
      }),
      Mpeg2Settings: D.m({
        wire: "mpeg2Settings",
        shape: {
          AdaptiveQuantization: D.m({ wire: "adaptiveQuantization" }),
          Bitrate: D.m({ wire: "bitrate" }),
          CodecLevel: D.m({ wire: "codecLevel" }),
          CodecProfile: D.m({ wire: "codecProfile" }),
          DynamicSubGop: D.m({ wire: "dynamicSubGop" }),
          FramerateControl: D.m({ wire: "framerateControl" }),
          FramerateConversionAlgorithm: D.m({
            wire: "framerateConversionAlgorithm",
          }),
          FramerateDenominator: D.m({ wire: "framerateDenominator" }),
          FramerateNumerator: D.m({ wire: "framerateNumerator" }),
          GopClosedCadence: D.m({ wire: "gopClosedCadence" }),
          GopSize: D.m({ wire: "gopSize" }),
          GopSizeUnits: D.m({ wire: "gopSizeUnits" }),
          HrdBufferFinalFillPercentage: D.m({
            wire: "hrdBufferFinalFillPercentage",
          }),
          HrdBufferInitialFillPercentage: D.m({
            wire: "hrdBufferInitialFillPercentage",
          }),
          HrdBufferSize: D.m({ wire: "hrdBufferSize" }),
          InterlaceMode: D.m({ wire: "interlaceMode" }),
          IntraDcPrecision: D.m({ wire: "intraDcPrecision" }),
          MaxBitrate: D.m({ wire: "maxBitrate" }),
          MinIInterval: D.m({ wire: "minIInterval" }),
          NumberBFramesBetweenReferenceFrames: D.m({
            wire: "numberBFramesBetweenReferenceFrames",
          }),
          ParControl: D.m({ wire: "parControl" }),
          ParDenominator: D.m({ wire: "parDenominator" }),
          ParNumerator: D.m({ wire: "parNumerator" }),
          PerFrameMetrics: D.m({ wire: "perFrameMetrics" }),
          QualityTuningLevel: D.m({ wire: "qualityTuningLevel" }),
          RateControlMode: D.m({ wire: "rateControlMode" }),
          ScanTypeConversionMode: D.m({ wire: "scanTypeConversionMode" }),
          SceneChangeDetect: D.m({ wire: "sceneChangeDetect" }),
          SlowPal: D.m({ wire: "slowPal" }),
          Softness: D.m({ wire: "softness" }),
          SpatialAdaptiveQuantization: D.m({
            wire: "spatialAdaptiveQuantization",
          }),
          Syntax: D.m({ wire: "syntax" }),
          Telecine: D.m({ wire: "telecine" }),
          TemporalAdaptiveQuantization: D.m({
            wire: "temporalAdaptiveQuantization",
          }),
        },
      }),
      PassthroughSettings: D.m({
        wire: "passthroughSettings",
        shape: {
          FrameControl: D.m({ wire: "frameControl" }),
          VideoSelectorMode: D.m({ wire: "videoSelectorMode" }),
        },
      }),
      ProresSettings: D.m({
        wire: "proresSettings",
        shape: {
          ChromaSampling: D.m({ wire: "chromaSampling" }),
          CodecProfile: D.m({ wire: "codecProfile" }),
          FramerateControl: D.m({ wire: "framerateControl" }),
          FramerateConversionAlgorithm: D.m({
            wire: "framerateConversionAlgorithm",
          }),
          FramerateDenominator: D.m({ wire: "framerateDenominator" }),
          FramerateNumerator: D.m({ wire: "framerateNumerator" }),
          InterlaceMode: D.m({ wire: "interlaceMode" }),
          ParControl: D.m({ wire: "parControl" }),
          ParDenominator: D.m({ wire: "parDenominator" }),
          ParNumerator: D.m({ wire: "parNumerator" }),
          PerFrameMetrics: D.m({ wire: "perFrameMetrics" }),
          ScanTypeConversionMode: D.m({ wire: "scanTypeConversionMode" }),
          SlowPal: D.m({ wire: "slowPal" }),
          Telecine: D.m({ wire: "telecine" }),
        },
      }),
      UncompressedSettings: D.m({
        wire: "uncompressedSettings",
        shape: {
          Fourcc: D.m({ wire: "fourcc" }),
          FramerateControl: D.m({ wire: "framerateControl" }),
          FramerateConversionAlgorithm: D.m({
            wire: "framerateConversionAlgorithm",
          }),
          FramerateDenominator: D.m({ wire: "framerateDenominator" }),
          FramerateNumerator: D.m({ wire: "framerateNumerator" }),
          InterlaceMode: D.m({ wire: "interlaceMode" }),
          ScanTypeConversionMode: D.m({ wire: "scanTypeConversionMode" }),
          SlowPal: D.m({ wire: "slowPal" }),
          Telecine: D.m({ wire: "telecine" }),
        },
      }),
      Vc3Settings: D.m({
        wire: "vc3Settings",
        shape: {
          FramerateControl: D.m({ wire: "framerateControl" }),
          FramerateConversionAlgorithm: D.m({
            wire: "framerateConversionAlgorithm",
          }),
          FramerateDenominator: D.m({ wire: "framerateDenominator" }),
          FramerateNumerator: D.m({ wire: "framerateNumerator" }),
          InterlaceMode: D.m({ wire: "interlaceMode" }),
          ScanTypeConversionMode: D.m({ wire: "scanTypeConversionMode" }),
          SlowPal: D.m({ wire: "slowPal" }),
          Telecine: D.m({ wire: "telecine" }),
          Vc3Class: D.m({ wire: "vc3Class" }),
        },
      }),
      Vp8Settings: D.m({
        wire: "vp8Settings",
        shape: {
          Bitrate: D.m({ wire: "bitrate" }),
          FramerateControl: D.m({ wire: "framerateControl" }),
          FramerateConversionAlgorithm: D.m({
            wire: "framerateConversionAlgorithm",
          }),
          FramerateDenominator: D.m({ wire: "framerateDenominator" }),
          FramerateNumerator: D.m({ wire: "framerateNumerator" }),
          GopSize: D.m({ wire: "gopSize" }),
          HrdBufferSize: D.m({ wire: "hrdBufferSize" }),
          MaxBitrate: D.m({ wire: "maxBitrate" }),
          ParControl: D.m({ wire: "parControl" }),
          ParDenominator: D.m({ wire: "parDenominator" }),
          ParNumerator: D.m({ wire: "parNumerator" }),
          QualityTuningLevel: D.m({ wire: "qualityTuningLevel" }),
          RateControlMode: D.m({ wire: "rateControlMode" }),
        },
      }),
      Vp9Settings: D.m({
        wire: "vp9Settings",
        shape: {
          Bitrate: D.m({ wire: "bitrate" }),
          FramerateControl: D.m({ wire: "framerateControl" }),
          FramerateConversionAlgorithm: D.m({
            wire: "framerateConversionAlgorithm",
          }),
          FramerateDenominator: D.m({ wire: "framerateDenominator" }),
          FramerateNumerator: D.m({ wire: "framerateNumerator" }),
          GopSize: D.m({ wire: "gopSize" }),
          HrdBufferSize: D.m({ wire: "hrdBufferSize" }),
          MaxBitrate: D.m({ wire: "maxBitrate" }),
          ParControl: D.m({ wire: "parControl" }),
          ParDenominator: D.m({ wire: "parDenominator" }),
          ParNumerator: D.m({ wire: "parNumerator" }),
          QualityTuningLevel: D.m({ wire: "qualityTuningLevel" }),
          RateControlMode: D.m({ wire: "rateControlMode" }),
        },
      }),
      XavcSettings: D.m({
        wire: "xavcSettings",
        shape: {
          AdaptiveQuantization: D.m({ wire: "adaptiveQuantization" }),
          EntropyEncoding: D.m({ wire: "entropyEncoding" }),
          FramerateControl: D.m({ wire: "framerateControl" }),
          FramerateConversionAlgorithm: D.m({
            wire: "framerateConversionAlgorithm",
          }),
          FramerateDenominator: D.m({ wire: "framerateDenominator" }),
          FramerateNumerator: D.m({ wire: "framerateNumerator" }),
          PerFrameMetrics: D.m({ wire: "perFrameMetrics" }),
          Profile: D.m({ wire: "profile" }),
          SlowPal: D.m({ wire: "slowPal" }),
          Softness: D.m({ wire: "softness" }),
          SpatialAdaptiveQuantization: D.m({
            wire: "spatialAdaptiveQuantization",
          }),
          TemporalAdaptiveQuantization: D.m({
            wire: "temporalAdaptiveQuantization",
          }),
          Xavc4kIntraCbgProfileSettings: D.m({
            wire: "xavc4kIntraCbgProfileSettings",
            shape: { XavcClass: D.m({ wire: "xavcClass" }) },
          }),
          Xavc4kIntraVbrProfileSettings: D.m({
            wire: "xavc4kIntraVbrProfileSettings",
            shape: { XavcClass: D.m({ wire: "xavcClass" }) },
          }),
          Xavc4kProfileSettings: D.m({
            wire: "xavc4kProfileSettings",
            shape: {
              BitrateClass: D.m({ wire: "bitrateClass" }),
              CodecProfile: D.m({ wire: "codecProfile" }),
              FlickerAdaptiveQuantization: D.m({
                wire: "flickerAdaptiveQuantization",
              }),
              GopBReference: D.m({ wire: "gopBReference" }),
              GopClosedCadence: D.m({ wire: "gopClosedCadence" }),
              HrdBufferSize: D.m({ wire: "hrdBufferSize" }),
              QualityTuningLevel: D.m({ wire: "qualityTuningLevel" }),
              Slices: D.m({ wire: "slices" }),
            },
          }),
          XavcHdIntraCbgProfileSettings: D.m({
            wire: "xavcHdIntraCbgProfileSettings",
            shape: { XavcClass: D.m({ wire: "xavcClass" }) },
          }),
          XavcHdProfileSettings: D.m({
            wire: "xavcHdProfileSettings",
            shape: {
              BitrateClass: D.m({ wire: "bitrateClass" }),
              FlickerAdaptiveQuantization: D.m({
                wire: "flickerAdaptiveQuantization",
              }),
              GopBReference: D.m({ wire: "gopBReference" }),
              GopClosedCadence: D.m({ wire: "gopClosedCadence" }),
              HrdBufferSize: D.m({ wire: "hrdBufferSize" }),
              InterlaceMode: D.m({ wire: "interlaceMode" }),
              QualityTuningLevel: D.m({ wire: "qualityTuningLevel" }),
              Slices: D.m({ wire: "slices" }),
              Telecine: D.m({ wire: "telecine" }),
            },
          }),
        },
      }),
    },
  }),
  ColorMetadata: D.m({ wire: "colorMetadata" }),
  Crop: D.m({ wire: "crop", shape: o_Rectangle }),
  DropFrameTimecode: D.m({ wire: "dropFrameTimecode" }),
  FixedAfd: D.m({ wire: "fixedAfd" }),
  Height: D.m({ wire: "height" }),
  Position: D.m({ wire: "position", shape: o_Rectangle }),
  RespondToAfd: D.m({ wire: "respondToAfd" }),
  ScalingBehavior: D.m({ wire: "scalingBehavior" }),
  Sharpness: D.m({ wire: "sharpness" }),
  TimecodeInsertion: D.m({ wire: "timecodeInsertion" }),
  TimecodeTrack: D.m({ wire: "timecodeTrack" }),
  VideoPreprocessors: D.m({
    wire: "videoPreprocessors",
    shape: {
      ColorCorrector: D.m({
        wire: "colorCorrector",
        shape: {
          Brightness: D.m({ wire: "brightness" }),
          ClipLimits: D.m({
            wire: "clipLimits",
            shape: {
              MaximumRGBTolerance: D.m({ wire: "maximumRGBTolerance" }),
              MaximumYUV: D.m({ wire: "maximumYUV" }),
              MinimumRGBTolerance: D.m({ wire: "minimumRGBTolerance" }),
              MinimumYUV: D.m({ wire: "minimumYUV" }),
            },
          }),
          ColorSpaceConversion: D.m({ wire: "colorSpaceConversion" }),
          Contrast: D.m({ wire: "contrast" }),
          Hdr10Metadata: D.m({ wire: "hdr10Metadata", shape: o_Hdr10Metadata }),
          HdrToSdrToneMapper: D.m({ wire: "hdrToSdrToneMapper" }),
          Hue: D.m({ wire: "hue" }),
          MaxLuminance: D.m({ wire: "maxLuminance" }),
          SampleRangeConversion: D.m({ wire: "sampleRangeConversion" }),
          Saturation: D.m({ wire: "saturation" }),
          SdrReferenceWhiteLevel: D.m({ wire: "sdrReferenceWhiteLevel" }),
        },
      }),
      Deinterlacer: D.m({
        wire: "deinterlacer",
        shape: {
          Algorithm: D.m({ wire: "algorithm" }),
          Control: D.m({ wire: "control" }),
          Mode: D.m({ wire: "mode" }),
        },
      }),
      DolbyVision: D.m({
        wire: "dolbyVision",
        shape: {
          Compatibility: D.m({ wire: "compatibility" }),
          L6Metadata: D.m({
            wire: "l6Metadata",
            shape: {
              MaxCll: D.m({ wire: "maxCll" }),
              MaxFall: D.m({ wire: "maxFall" }),
            },
          }),
          L6Mode: D.m({ wire: "l6Mode" }),
          Mapping: D.m({ wire: "mapping" }),
          Profile: D.m({ wire: "profile" }),
        },
      }),
      DurationControl: D.m({
        wire: "durationControl",
        shape: {
          IntegerDurationMaximumCompressionDenominator: D.m({
            wire: "integerDurationMaximumCompressionDenominator",
          }),
          IntegerDurationMaximumCompressionNumerator: D.m({
            wire: "integerDurationMaximumCompressionNumerator",
          }),
          IntegerDurationTrimThresholdMilliseconds: D.m({
            wire: "integerDurationTrimThresholdMilliseconds",
          }),
        },
      }),
      Hdr10Plus: D.m({
        wire: "hdr10Plus",
        shape: {
          MasteringMonitorNits: D.m({ wire: "masteringMonitorNits" }),
          TargetMonitorNits: D.m({ wire: "targetMonitorNits" }),
        },
      }),
      ImageInserter: D.m({ wire: "imageInserter", shape: o_ImageInserter }),
      NoiseReducer: D.m({
        wire: "noiseReducer",
        shape: {
          Filter: D.m({ wire: "filter" }),
          FilterSettings: D.m({
            wire: "filterSettings",
            shape: { Strength: D.m({ wire: "strength" }) },
          }),
          SpatialFilterSettings: D.m({
            wire: "spatialFilterSettings",
            shape: {
              PostFilterSharpenStrength: D.m({
                wire: "postFilterSharpenStrength",
              }),
              Speed: D.m({ wire: "speed" }),
              Strength: D.m({ wire: "strength" }),
            },
          }),
          TemporalFilterSettings: D.m({
            wire: "temporalFilterSettings",
            shape: {
              AggressiveMode: D.m({ wire: "aggressiveMode" }),
              PostTemporalSharpening: D.m({ wire: "postTemporalSharpening" }),
              PostTemporalSharpeningStrength: D.m({
                wire: "postTemporalSharpeningStrength",
              }),
              Speed: D.m({ wire: "speed" }),
              Strength: D.m({ wire: "strength" }),
            },
          }),
        },
      }),
      PartnerWatermarking: D.m({
        wire: "partnerWatermarking",
        shape: {
          NexguardFileMarkerSettings: D.m({
            wire: "nexguardFileMarkerSettings",
            shape: {
              License: D.m({ wire: "license" }),
              Payload: D.m({ wire: "payload" }),
              Preset: D.m({ wire: "preset" }),
              Strength: D.m({ wire: "strength" }),
            },
          }),
        },
      }),
      TimecodeBurnin: D.m({
        wire: "timecodeBurnin",
        shape: {
          FontSize: D.m({ wire: "fontSize" }),
          Position: D.m({ wire: "position" }),
          Prefix: D.m({ wire: "prefix" }),
        },
      }),
    },
  }),
  Width: D.m({ wire: "width" }),
});
const o_VideoOverlay: D.LazyStruct = () => ({
  Crop: D.m({
    wire: "crop",
    shape: {
      Height: D.m({ wire: "height" }),
      Unit: D.m({ wire: "unit" }),
      Width: D.m({ wire: "width" }),
      X: D.m({ wire: "x" }),
      Y: D.m({ wire: "y" }),
    },
  }),
  EndTimecode: D.m({ wire: "endTimecode" }),
  InitialPosition: D.m({
    wire: "initialPosition",
    shape: o_VideoOverlayPosition,
  }),
  Input: D.m({
    wire: "input",
    shape: {
      AudioSelectors: D.m({
        wire: "audioSelectors",
        shape: D.map(o_AudioSelector),
      }),
      FileInput: D.m({ wire: "fileInput" }),
      InputClippings: D.m({
        wire: "inputClippings",
        shape: D.list({
          EndTimecode: D.m({ wire: "endTimecode" }),
          StartTimecode: D.m({ wire: "startTimecode" }),
        }),
      }),
      TimecodeSource: D.m({ wire: "timecodeSource" }),
      TimecodeStart: D.m({ wire: "timecodeStart" }),
    },
  }),
  Playback: D.m({ wire: "playback" }),
  StartTimecode: D.m({ wire: "startTimecode" }),
  Transitions: D.m({
    wire: "transitions",
    shape: D.list({
      EndPosition: D.m({ wire: "endPosition", shape: o_VideoOverlayPosition }),
      EndTimecode: D.m({ wire: "endTimecode" }),
      StartTimecode: D.m({ wire: "startTimecode" }),
    }),
  }),
});
const o_VideoSelector: D.LazyStruct = () => ({
  AlphaBehavior: D.m({ wire: "alphaBehavior" }),
  ColorSpace: D.m({ wire: "colorSpace" }),
  ColorSpaceUsage: D.m({ wire: "colorSpaceUsage" }),
  EmbeddedTimecodeOverride: D.m({ wire: "embeddedTimecodeOverride" }),
  Hdr10Metadata: D.m({ wire: "hdr10Metadata", shape: o_Hdr10Metadata }),
  MaxLuminance: D.m({ wire: "maxLuminance" }),
  PadVideo: D.m({ wire: "padVideo" }),
  Pid: D.m({ wire: "pid" }),
  ProgramNumber: D.m({ wire: "programNumber" }),
  Rotate: D.m({ wire: "rotate" }),
  SampleRange: D.m({ wire: "sampleRange" }),
  SelectorType: D.m({ wire: "selectorType" }),
  Streams: D.m({ wire: "streams" }),
});
const i_BandwidthReductionFilter: D.LazyStruct = () => ({
  Sharpening: D.m({ wire: "sharpening" }),
  Strength: D.m({ wire: "strength" }),
});
const o_BandwidthReductionFilter: D.LazyStruct = () => ({
  Sharpening: D.m({ wire: "sharpening" }),
  Strength: D.m({ wire: "strength" }),
});
const o_DestinationSettings: D.LazyStruct = () => ({
  S3Settings: D.m({
    wire: "s3Settings",
    shape: {
      AccessControl: D.m({
        wire: "accessControl",
        shape: { CannedAcl: D.m({ wire: "cannedAcl" }) },
      }),
      Encryption: D.m({
        wire: "encryption",
        shape: {
          EncryptionType: D.m({ wire: "encryptionType" }),
          KmsEncryptionContext: D.m({ wire: "kmsEncryptionContext" }),
          KmsKeyArn: D.m({ wire: "kmsKeyArn" }),
        },
      }),
      StorageClass: D.m({ wire: "storageClass" }),
    },
  }),
});
const o_EncryptionContractConfiguration: D.LazyStruct = () => ({
  SpekeAudioPreset: D.m({ wire: "spekeAudioPreset" }),
  SpekeVideoPreset: D.m({ wire: "spekeVideoPreset" }),
});
const o_Hdr10Metadata: D.LazyStruct = () => ({
  BluePrimaryX: D.m({ wire: "bluePrimaryX" }),
  BluePrimaryY: D.m({ wire: "bluePrimaryY" }),
  GreenPrimaryX: D.m({ wire: "greenPrimaryX" }),
  GreenPrimaryY: D.m({ wire: "greenPrimaryY" }),
  MaxContentLightLevel: D.m({ wire: "maxContentLightLevel" }),
  MaxFrameAverageLightLevel: D.m({ wire: "maxFrameAverageLightLevel" }),
  MaxLuminance: D.m({ wire: "maxLuminance" }),
  MinLuminance: D.m({ wire: "minLuminance" }),
  RedPrimaryX: D.m({ wire: "redPrimaryX" }),
  RedPrimaryY: D.m({ wire: "redPrimaryY" }),
  WhitePointX: D.m({ wire: "whitePointX" }),
  WhitePointY: D.m({ wire: "whitePointY" }),
});
const o_RemixSettings: D.LazyStruct = () => ({
  AudioDescriptionAudioChannel: D.m({ wire: "audioDescriptionAudioChannel" }),
  AudioDescriptionDataChannel: D.m({ wire: "audioDescriptionDataChannel" }),
  ChannelMapping: D.m({
    wire: "channelMapping",
    shape: {
      OutputChannels: D.m({
        wire: "outputChannels",
        shape: D.list({
          InputChannels: D.m({ wire: "inputChannels" }),
          InputChannelsFineTune: D.m({ wire: "inputChannelsFineTune" }),
        }),
      }),
    },
  }),
  ChannelsIn: D.m({ wire: "channelsIn" }),
  ChannelsOut: D.m({ wire: "channelsOut" }),
});
const o_SpekeKeyProvider: D.LazyStruct = () => ({
  CertificateArn: D.m({ wire: "certificateArn" }),
  EncryptionContractConfiguration: D.m({
    wire: "encryptionContractConfiguration",
    shape: o_EncryptionContractConfiguration,
  }),
  ResourceId: D.m({ wire: "resourceId" }),
  SystemIds: D.m({ wire: "systemIds" }),
  Url: D.m({ wire: "url" }),
});
const o_StaticKeyProvider: D.LazyStruct = () => ({
  KeyFormat: D.m({ wire: "keyFormat" }),
  KeyFormatVersions: D.m({ wire: "keyFormatVersions" }),
  StaticKeyValue: D.m({ wire: "staticKeyValue", shape: D.secret }),
  Url: D.m({ wire: "url" }),
});
const o_VideoOverlayPosition: D.LazyStruct = () => ({
  Height: D.m({ wire: "height" }),
  Opacity: D.m({ wire: "opacity" }),
  Unit: D.m({ wire: "unit" }),
  Width: D.m({ wire: "width" }),
  XPosition: D.m({ wire: "xPosition" }),
  YPosition: D.m({ wire: "yPosition" }),
});
