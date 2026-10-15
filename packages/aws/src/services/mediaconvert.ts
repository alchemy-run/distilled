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
  sdkId: "MediaConvert",
  serviceShapeName: "MediaConvert",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "mediaconvert" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-08-29");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
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
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://mediaconvert.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err("DualStack is enabled but this partition does not support DualStack");
          }
          if (Region === "cn-northwest-1") {
            return e("https://subscribe.mediaconvert.cn-northwest-1.amazonaws.com.cn");
          }
          return e(`https://mediaconvert.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://mediaconvert.{R}.{D}","properties":{},"headers":{}}',
  ["cn-northwest-1"],
);

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
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnprocessableEntityException
  extends /*@__PURE__*/ S.TaggedError<UnprocessableEntityException>()(
    "UnprocessableEntityException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(422),
  ).pipe(C.withBadRequestError) {}
export interface AssociateCertificateRequest {
  Arn?: string;
}
export interface AssociateCertificateResponse {}
export interface CancelJobRequest {
  Id: string;
}
export interface CancelJobResponse {}
export type AccelerationMode = "DISABLED" | "ENABLED" | "PREFERRED" | (string & {});
export interface AccelerationSettings {
  Mode?: AccelerationMode;
}
export type BillingTagsSource = "QUEUE" | "PRESET" | "JOB_TEMPLATE" | "JOB" | (string & {});
export type __integerMinNegative50Max50 = number;
export interface HopDestination {
  Priority?: number;
  Queue?: string;
  WaitMinutes?: number;
}
export type __listOfHopDestination = HopDestination[];
const __listOfHopDestination = /*@__PURE__*/ __L.at(__c7, 2);
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
const __listOfColorConversion3DLUTSetting = /*@__PURE__*/ __L.at(__c7, 5);
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
export type AdvancedInputFilterAddTexture = "ENABLED" | "DISABLED" | (string & {});
export type AdvancedInputFilterSharpen = "OFF" | "LOW" | "HIGH" | (string & {});
export interface AdvancedInputFilterSettings {
  AddTexture?: AdvancedInputFilterAddTexture;
  Sharpening?: AdvancedInputFilterSharpen;
}
export type __stringMin1 = string;
export type __listOf__stringMin1 = string[];
const __listOf__stringMin1 = /*@__PURE__*/ __L.at(__c6, 0);
export interface AudioSelectorGroup {
  AudioSelectorNames?: string[];
}
export type __mapOfAudioSelectorGroup = { [key: string]: AudioSelectorGroup | undefined };
const __mapOfAudioSelectorGroup = /*@__PURE__*/ __L.at(__c7, 12);
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
const __listOf__integerMin1Max2147483647 = /*@__PURE__*/ __L.at(__c2, 0);
export type __integerMin0Max8 = number;
export type __integerMin1Max64 = number;
export type __integerMinNegative60Max6 = number;
export type __listOf__integerMinNegative60Max6 = number[];
const __listOf__integerMinNegative60Max6 =
  __listOf__integerMin1Max2147483647 as any as S.Schema<__listOf__integerMinNegative60Max6>;
export type __doubleMinNegative60Max6 = number;
export type __listOf__doubleMinNegative60Max6 = number[];
const __listOf__doubleMinNegative60Max6 =
  __listOf__integerMin1Max2147483647 as any as S.Schema<__listOf__doubleMinNegative60Max6>;
export interface OutputChannelMapping {
  InputChannels?: number[];
  InputChannelsFineTune?: number[];
}
export type __listOfOutputChannelMapping = OutputChannelMapping[];
const __listOfOutputChannelMapping = /*@__PURE__*/ __L.at(__c3, 1);
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
export type AudioSmpte337Passthrough = "ENABLED" | "DISABLED" | (string & {});
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
  Smpte337Passthrough?: AudioSmpte337Passthrough;
  Streams?: number[];
  Tracks?: number[];
}
export type __mapOfAudioSelector = { [key: string]: AudioSelector | undefined };
const __mapOfAudioSelector = /*@__PURE__*/ __L.at(__c7, 15);
export type AncillaryConvert608To708 = "UPCONVERT" | "DISABLED" | (string & {});
export type __integerMin1Max4 = number;
export type AncillaryTerminateCaptions = "END_OF_INPUT" | "DISABLED" | (string & {});
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
export type EmbeddedTerminateCaptions = "END_OF_INPUT" | "DISABLED" | (string & {});
export interface EmbeddedSourceSettings {
  Convert608To708?: EmbeddedConvert608To708;
  Source608ChannelNumber?: number;
  Source608TrackNumber?: number;
  TerminateCaptions?: EmbeddedTerminateCaptions;
}
export type CaptionSourceByteRateLimit = "ENABLED" | "DISABLED" | (string & {});
export type FileSourceConvert608To708 = "UPCONVERT" | "DISABLED" | (string & {});
export type CaptionSourceConvertPaintOnToPopOn = "ENABLED" | "DISABLED" | (string & {});
export type __integerMin1Max1001 = number;
export type __integerMin1Max60000 = number;
export interface CaptionSourceFramerate {
  FramerateDenominator?: number;
  FramerateNumerator?: number;
}
export type __stringMin14PatternS3SccSCCTtmlTTMLDfxpDFXPStlSTLSrtSRTXmlXMLSmiSMIVttVTTWebvttWEBVTTHttpsSccSCCTtmlTTMLDfxpDFXPStlSTLSrtSRTXmlXMLSmiSMIVttVTTWebvttWEBVTT =
  string;
export type FileSourceTimeDeltaUnits = "SECONDS" | "MILLISECONDS" | (string & {});
export type CaptionSourceUpconvertSTLToTeletext = "UPCONVERT" | "DISABLED" | (string & {});
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
export type __mapOfCaptionSelector = { [key: string]: CaptionSelector | undefined };
const __mapOfCaptionSelector = /*@__PURE__*/ __L.at(__c7, 25);
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
export type __stringMin9Max19PatternAZ26EastWestCentralNorthSouthEastWest1912 = string;
export interface InputDecryptionSettings {
  DecryptionMode?: DecryptionMode;
  EncryptedDecryptionKey?: string;
  InitializationVector?: string;
  KmsKeyRegion?: string;
}
export type InputDenoiseFilter = "ENABLED" | "DISABLED" | (string & {});
export type __stringMin14PatternS3XmlXMLHttpsXmlXML = string;
export type DynamicAudioSelectorType = "ALL_TRACKS" | "LANGUAGE_CODE" | (string & {});
export interface DynamicAudioSelector {
  AudioDurationCorrection?: AudioDurationCorrection;
  ExternalAudioFileInput?: string;
  LanguageCode?: LanguageCode;
  Offset?: number;
  SelectorType?: DynamicAudioSelectorType;
}
export type __mapOfDynamicAudioSelector = { [key: string]: DynamicAudioSelector | undefined };
const __mapOfDynamicAudioSelector = /*@__PURE__*/ __L.at(__c7, 27);
export type __stringMax2048PatternS3Https = string;
export type InputFilterEnable = "AUTO" | "DISABLE" | "FORCE" | (string & {});
export type __integerMin0Max5 = number;
export type __stringMin14PatternS3BmpBMPPngPNGTgaTGAHttpsBmpBMPPngPNGTgaTGA = string;
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
const __listOfInsertableImage = /*@__PURE__*/ __L.at(__c3, 6);
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
const __listOfInputClipping = /*@__PURE__*/ __L.at(__c7, 29);
export type InputScanType = "AUTO" | "PSF" | (string & {});
export interface MultiViewInput {
  FileInput?: string;
}
export interface MultiViewSettings {
  Input?: MultiViewInput;
}
export type __listOfMultiViewSettings = MultiViewSettings[];
const __listOfMultiViewSettings = /*@__PURE__*/ __L.at(__c8, 0);
export type InputPsiControl = "IGNORE_PSI" | "USE_PSI" | (string & {});
export type __stringPatternS3ASSETMAPXml = string;
export type __listOf__stringPatternS3ASSETMAPXml = string[];
const __listOf__stringPatternS3ASSETMAPXml =
  __listOf__stringMin1 as any as S.Schema<__listOf__stringPatternS3ASSETMAPXml>;
export type __stringPatternArnAwsAZ09EventsAZ090912ConnectionAZAZ09AF0936 = string;
export type TamsGapHandling = "SKIP_GAPS" | "FILL_WITH_BLACK" | "HOLD_LAST_FRAME" | (string & {});
export type __stringPattern019090190908019090190908 = string;
export interface InputTamsSettings {
  AuthConnectionArn?: string;
  GapHandling?: TamsGapHandling;
  SourceId?: string;
  Timerange?: string;
}
export type InputTimecodeSource = "EMBEDDED" | "ZEROBASED" | "SPECIFIEDSTART" | (string & {});
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
const __listOfVideoOverlayInputClipping =
  __listOfInputClipping as any as S.Schema<__listOfVideoOverlayInputClipping>;
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
const __listOfVideoOverlayTransition = /*@__PURE__*/ __L.at(__c8, 5);
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
const __listOfVideoOverlay = /*@__PURE__*/ __L.at(__c8, 7);
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
export type InputSampleRange = "FOLLOW" | "FULL_RANGE" | "LIMITED_RANGE" | (string & {});
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
const __listOfInput = /*@__PURE__*/ __L.at(__c11, 4);
export type __stringMin1Max20 = string;
export type __stringMin1Max50PatternAZAZ09 = string;
export type __stringMin1Max2048PatternArnAZSecretsmanagerWD12SecretAZAZ09 = string;
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
export type __listOfMotionImageInserter = MotionImageInserter[];
const __listOfMotionImageInserter = /*@__PURE__*/ __L.at(__c8, 12);
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
export type NielsenSourceWatermarkStatusType = "CLEAN" | "WATERMARKED" | (string & {});
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
const __listOfAllowedRenditionSize = /*@__PURE__*/ __L.at(__c8, 16);
export interface ForceIncludeRenditionSize {
  Height?: number;
  Width?: number;
}
export type __listOfForceIncludeRenditionSize = ForceIncludeRenditionSize[];
const __listOfForceIncludeRenditionSize = /*@__PURE__*/ __L.at(__c8, 18);
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
const __listOfAutomatedAbrRule = /*@__PURE__*/ __L.at(__c8, 20);
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
const __listOfCmafAdditionalManifest = /*@__PURE__*/ __L.at(__c8, 24);
export type CmafClientCache = "DISABLED" | "ENABLED" | (string & {});
export type CmafCodecSpecification = "RFC_6381" | "RFC_4281" | (string & {});
export type __stringMin1Max256 = string;
export type DashManifestStyle = "BASIC" | "COMPACT" | "DISTINCT" | "FULL" | (string & {});
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
export type CmafInitializationVectorInManifest = "INCLUDE" | "EXCLUDE" | (string & {});
export type __stringPatternArnAwsUsGovAcm = string;
export type __stringMin36Max36Pattern09aFAF809aFAF409aFAF409aFAF409aFAF12 = string;
export type __listOf__stringMin36Max36Pattern09aFAF809aFAF409aFAF409aFAF409aFAF12 = string[];
const __listOf__stringMin36Max36Pattern09aFAF809aFAF409aFAF409aFAF409aFAF12 =
  __listOf__stringMin1 as any as S.Schema<__listOf__stringMin36Max36Pattern09aFAF809aFAF409aFAF409aFAF409aFAF12>;
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
export type __listOfCmafImageBasedTrickPlayVariant = CmafImageBasedTrickPlayVariant[];
const __listOfCmafImageBasedTrickPlayVariant = /*@__PURE__*/ __L.at(__c9, 2);
export type CmafManifestCompression = "GZIP" | "NONE" | (string & {});
export type CmafManifestDurationFormat = "FLOATING_POINT" | "INTEGER" | (string & {});
export type CmafMpdManifestBandwidthType = "AVERAGE" | "MAX" | (string & {});
export type CmafMpdProfile = "MAIN_PROFILE" | "ON_DEMAND_PROFILE" | (string & {});
export type CmafPtsOffsetHandlingForBFrames = "ZERO_BASED" | "MATCH_INITIAL_PTS" | (string & {});
export type CmafSegmentControl = "SINGLE_FILE" | "SEGMENTED_FILES" | (string & {});
export type CmafSegmentLengthControl = "EXACT" | "GOP_MULTIPLE" | "MATCH" | (string & {});
export type CmafStreamInfResolution = "INCLUDE" | "EXCLUDE" | (string & {});
export type CmafTargetDurationCompatibilityMode = "LEGACY" | "SPEC_COMPLIANT" | (string & {});
export type CmafVideoCompositionOffsets = "SIGNED" | "UNSIGNED" | (string & {});
export type CmafWriteDASHManifest = "DISABLED" | "ENABLED" | (string & {});
export type CmafWriteHLSManifest = "DISABLED" | "ENABLED" | (string & {});
export type CmafWriteSegmentTimelineInRepresentation = "ENABLED" | "DISABLED" | (string & {});
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
const __listOfDashAdditionalManifest =
  __listOfCmafAdditionalManifest as any as S.Schema<__listOfDashAdditionalManifest>;
export type DashIsoGroupAudioChannelConfigSchemeIdUri =
  | "MPEG_CHANNEL_CONFIGURATION"
  | "DOLBY_CHANNEL_CONFIGURATION"
  | (string & {});
export type DashIsoPlaybackDeviceCompatibility =
  | "CENC_V1"
  | "UNENCRYPTED_SEI"
  | "CENC_V1_UNENCRYPTED_HEADERS"
  | (string & {});
export type __stringPattern09aFAF809aFAF409aFAF409aFAF409aFAF12 = string;
export type __listOf__stringPattern09aFAF809aFAF409aFAF409aFAF409aFAF12 = string[];
const __listOf__stringPattern09aFAF809aFAF409aFAF409aFAF409aFAF12 =
  __listOf__stringMin1 as any as S.Schema<__listOf__stringPattern09aFAF809aFAF409aFAF409aFAF409aFAF12>;
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
export type __listOfDashIsoImageBasedTrickPlayVariant = DashIsoImageBasedTrickPlayVariant[];
const __listOfDashIsoImageBasedTrickPlayVariant =
  __listOfCmafImageBasedTrickPlayVariant as any as S.Schema<__listOfDashIsoImageBasedTrickPlayVariant>;
export type DashIsoMpdManifestBandwidthType = "AVERAGE" | "MAX" | (string & {});
export type DashIsoMpdProfile = "MAIN_PROFILE" | "ON_DEMAND_PROFILE" | (string & {});
export type DashIsoPtsOffsetHandlingForBFrames = "ZERO_BASED" | "MATCH_INITIAL_PTS" | (string & {});
export type DashIsoSegmentControl = "SINGLE_FILE" | "SEGMENTED_FILES" | (string & {});
export type DashIsoSegmentLengthControl = "EXACT" | "GOP_MULTIPLE" | "MATCH" | (string & {});
export type DashIsoVideoCompositionOffsets = "SIGNED" | "UNSIGNED" | (string & {});
export type DashIsoWriteSegmentTimelineInRepresentation = "ENABLED" | "DISABLED" | (string & {});
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
const __listOfHlsAdMarkers = /*@__PURE__*/ __L.at(__c3, 9);
export interface HlsAdditionalManifest {
  ManifestNameModifier?: string;
  SelectedOutputs?: string[];
}
export type __listOfHlsAdditionalManifest = HlsAdditionalManifest[];
const __listOfHlsAdditionalManifest =
  __listOfCmafAdditionalManifest as any as S.Schema<__listOfHlsAdditionalManifest>;
export type HlsAudioOnlyHeader = "INCLUDE" | "EXCLUDE" | (string & {});
export interface HlsCaptionLanguageMapping {
  CaptionChannel?: number;
  CustomLanguageCode?: string;
  LanguageCode?: LanguageCode;
  LanguageDescription?: string;
}
export type __listOfHlsCaptionLanguageMapping = HlsCaptionLanguageMapping[];
const __listOfHlsCaptionLanguageMapping = /*@__PURE__*/ __L.at(__c9, 9);
export type HlsCaptionLanguageSetting = "INSERT" | "OMIT" | "NONE" | (string & {});
export type HlsCaptionSegmentLengthControl = "LARGE_SEGMENTS" | "MATCH_VIDEO" | (string & {});
export type HlsClientCache = "DISABLED" | "ENABLED" | (string & {});
export type HlsCodecSpecification = "RFC_6381" | "RFC_4281" | (string & {});
export type HlsDirectoryStructure = "SINGLE_DIRECTORY" | "SUBDIRECTORY_PER_STREAM" | (string & {});
export type HlsEncryptionType = "AES128" | "SAMPLE_AES" | (string & {});
export type HlsInitializationVectorInManifest = "INCLUDE" | "EXCLUDE" | (string & {});
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
export type __listOfHlsImageBasedTrickPlayVariant = HlsImageBasedTrickPlayVariant[];
const __listOfHlsImageBasedTrickPlayVariant =
  __listOfCmafImageBasedTrickPlayVariant as any as S.Schema<__listOfHlsImageBasedTrickPlayVariant>;
export type HlsManifestCompression = "GZIP" | "NONE" | (string & {});
export type HlsManifestDurationFormat = "FLOATING_POINT" | "INTEGER" | (string & {});
export type HlsOutputSelection = "MANIFESTS_AND_SEGMENTS" | "SEGMENTS_ONLY" | (string & {});
export type HlsProgramDateTime = "INCLUDE" | "EXCLUDE" | (string & {});
export type __integerMin0Max3600 = number;
export type HlsProgressiveWriteHlsManifest = "ENABLED" | "DISABLED" | (string & {});
export type HlsSegmentControl = "SINGLE_FILE" | "SEGMENTED_FILES" | (string & {});
export type HlsSegmentLengthControl = "EXACT" | "GOP_MULTIPLE" | "MATCH" | (string & {});
export type HlsStreamInfResolution = "INCLUDE" | "EXCLUDE" | (string & {});
export type HlsTargetDurationCompatibilityMode = "LEGACY" | "SPEC_COMPLIANT" | (string & {});
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
const __listOfMsSmoothAdditionalManifest =
  __listOfCmafAdditionalManifest as any as S.Schema<__listOfMsSmoothAdditionalManifest>;
export type MsSmoothAudioDeduplication = "COMBINE_DUPLICATE_STREAMS" | "NONE" | (string & {});
export interface MsSmoothEncryptionSettings {
  SpekeKeyProvider?: SpekeKeyProvider;
}
export type MsSmoothFragmentLengthControl = "EXACT" | "GOP_MULTIPLE" | (string & {});
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
const __listOfFrameMetricType = __listOfHlsAdMarkers as any as S.Schema<__listOfFrameMetricType>;
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
const __listOfAudioChannelTag = __listOfHlsAdMarkers as any as S.Schema<__listOfAudioChannelTag>;
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
export type AudioNormalizationAlgorithmControl = "CORRECT_AUDIO" | "MEASURE_ONLY" | (string & {});
export type __integerMinNegative70Max0 = number;
export type AudioNormalizationLoudnessLogging = "LOG" | "DONT_LOG" | (string & {});
export type AudioNormalizationPeakCalculation = "TRUE_PEAK" | "NONE" | (string & {});
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
export type AudioTypeControl = "FOLLOW_INPUT" | "USE_CONFIGURED" | (string & {});
export type AacAudioDescriptionBroadcasterMix = "BROADCASTER_MIXED_AD" | "NORMAL" | (string & {});
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
export type AacPassthroughControl = "WHEN_POSSIBLE" | "NO_PASSTHROUGH" | (string & {});
export type __integerMin2000Max30000 = number;
export type AacRateControlMode = "CBR" | "VBR" | (string & {});
export type AacRawFormat = "LATM_LOAS" | "NONE" | (string & {});
export type __integerMin8000Max96000 = number;
export type AacSpecification = "MPEG2" | "MPEG4" | (string & {});
export type __integerMin6Max16 = number;
export type AacVbrQuality = "LOW" | "MEDIUM_LOW" | "MEDIUM_HIGH" | "HIGH" | (string & {});
export interface AacSettings {
  AudioDescriptionBroadcasterMix?: AacAudioDescriptionBroadcasterMix;
  Bitrate?: number;
  CodecProfile?: AacCodecProfile;
  CodingMode?: AacCodingMode;
  LoudnessMeasurementMode?: AacLoudnessMeasurementMode;
  PassthroughControl?: AacPassthroughControl;
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
export type Ac3DynamicRangeCompressionProfile = "FILM_STANDARD" | "NONE" | (string & {});
export type Ac3DynamicRangeCompressionRf =
  | "FILM_STANDARD"
  | "FILM_LIGHT"
  | "MUSIC_STANDARD"
  | "MUSIC_LIGHT"
  | "SPEECH"
  | "NONE"
  | (string & {});
export type Ac3LfeFilter = "ENABLED" | "DISABLED" | (string & {});
export type Ac3MetadataControl = "FOLLOW_INPUT" | "USE_CONFIGURED" | (string & {});
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
export type Ac4StereoDownmix = "NOT_INDICATED" | "LO_RO" | "LT_RT" | "DPL2" | (string & {});
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
export type Eac3AtmosDialogueIntelligence = "ENABLED" | "DISABLED" | (string & {});
export type Eac3AtmosDownmixControl = "SPECIFIED" | "INITIALIZE_FROM_SOURCE" | (string & {});
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
export type Eac3AtmosDynamicRangeControl = "SPECIFIED" | "INITIALIZE_FROM_SOURCE" | (string & {});
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
export type Eac3AtmosSurroundExMode = "NOT_INDICATED" | "ENABLED" | "DISABLED" | (string & {});
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
export type Eac3MetadataControl = "FOLLOW_INPUT" | "USE_CONFIGURED" | (string & {});
export type Eac3PassthroughControl = "WHEN_POSSIBLE" | "NO_PASSTHROUGH" | (string & {});
export type Eac3PhaseControl = "SHIFT_90_DEGREES" | "NO_SHIFT" | (string & {});
export type Eac3StereoDownmix = "NOT_INDICATED" | "LO_RO" | "LT_RT" | "DPL2" | (string & {});
export type Eac3SurroundExMode = "NOT_INDICATED" | "ENABLED" | "DISABLED" | (string & {});
export type Eac3SurroundMode = "NOT_INDICATED" | "ENABLED" | "DISABLED" | (string & {});
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
export type Mp2AudioDescriptionMix = "BROADCASTER_MIXED_AD" | "NONE" | (string & {});
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
export type AudioLanguageCodeControl = "FOLLOW_INPUT" | "USE_CONFIGURED" | (string & {});
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
const __listOfAudioDescription = /*@__PURE__*/ __L.at(__c3, 26);
export type __stringPatternAZaZ23AZaZ = string;
export type BurninSubtitleAlignment = "CENTERED" | "LEFT" | "AUTO" | (string & {});
export type BurninSubtitleApplyFontColor = "WHITE_TEXT_ONLY" | "ALL_TEXT" | (string & {});
export type BurninSubtitleBackgroundColor = "NONE" | "BLACK" | "WHITE" | "AUTO" | (string & {});
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
export type RemoveRubyReserveAttributes = "DISABLED" | "ENABLED" | (string & {});
export type BurninSubtitleShadowColor = "NONE" | "BLACK" | "WHITE" | "AUTO" | (string & {});
export type BurnInSubtitleStylePassthrough = "ENABLED" | "DISABLED" | (string & {});
export type BurninSubtitleTeletextSpacing = "FIXED_GRID" | "PROPORTIONAL" | "AUTO" | (string & {});
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
export type DvbSubtitleApplyFontColor = "WHITE_TEXT_ONLY" | "ALL_TEXT" | (string & {});
export type DvbSubtitleBackgroundColor = "NONE" | "BLACK" | "WHITE" | "AUTO" | (string & {});
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
export type DvbSubtitleShadowColor = "NONE" | "BLACK" | "WHITE" | "AUTO" | (string & {});
export type DvbSubtitleStylePassthrough = "ENABLED" | "DISABLED" | (string & {});
export type DvbSubtitlingType = "HEARING_IMPAIRED" | "STANDARD" | (string & {});
export type DvbSubtitleTeletextSpacing = "FIXED_GRID" | "PROPORTIONAL" | "AUTO" | (string & {});
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
const __listOfTeletextPageType = __listOfHlsAdMarkers as any as S.Schema<__listOfTeletextPageType>;
export interface TeletextDestinationSettings {
  PageNumber?: string;
  PageTypes?: TeletextPageType[];
}
export type TtmlBackgroundColor = "NONE" | "BLACK" | "WHITE" | "AUTO" | (string & {});
export type TtmlFontColor =
  | "WHITE"
  | "BLACK"
  | "YELLOW"
  | "RED"
  | "GREEN"
  | "BLUE"
  | "AUTO"
  | (string & {});
export type TtmlFontStyle = "NORMAL" | "ITALIC" | (string & {});
export type TtmlFontWeight = "NORMAL" | "BOLD" | (string & {});
export type TtmlStylePassthrough = "ENABLED" | "DISABLED" | (string & {});
export type TtmlTextDecoration = "NONE" | "UNDERLINE" | (string & {});
export interface TtmlDestinationSettings {
  BackgroundColor?: TtmlBackgroundColor;
  BackgroundOpacity?: number;
  FontColor?: TtmlFontColor;
  FontOpacity?: number;
  FontSize?: number;
  FontStyle?: TtmlFontStyle;
  FontWeight?: TtmlFontWeight;
  StylePassthrough?: TtmlStylePassthrough;
  TextDecoration?: TtmlTextDecoration;
}
export type WebvttAccessibilitySubs = "DISABLED" | "ENABLED" | (string & {});
export type WebvttStylePassthrough = "ENABLED" | "DISABLED" | "STRICT" | "MERGE" | (string & {});
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
const __listOfCaptionDescription = /*@__PURE__*/ __L.at(__c9, 16);
export type CmfcAudioDuration = "DEFAULT_CODEC_DURATION" | "MATCH_VIDEO_DURATION" | (string & {});
export type CmfcAudioTrackType =
  | "ALTERNATE_AUDIO_AUTO_SELECT_DEFAULT"
  | "ALTERNATE_AUDIO_AUTO_SELECT"
  | "ALTERNATE_AUDIO_NOT_AUTO_SELECT"
  | "AUDIO_ONLY_VARIANT_STREAM"
  | (string & {});
export type CmfcC2paManifest = "INCLUDE" | "EXCLUDE" | (string & {});
export type CmfcDescriptiveVideoServiceFlag = "DONT_FLAG" | "FLAG" | (string & {});
export type CmfcIFrameOnlyManifest = "INCLUDE" | "EXCLUDE" | (string & {});
export type CmfcKlvMetadata = "PASSTHROUGH" | "NONE" | (string & {});
export type CmfcManifestMetadataSignaling = "ENABLED" | "DISABLED" | (string & {});
export type CmfcScte35Esam = "INSERT" | "NONE" | (string & {});
export type CmfcScte35Source = "PASSTHROUGH" | "NONE" | "MANIFEST_CUES" | (string & {});
export type __stringMin1PatternArnAwsUsGovCnKmsAZ26EastWestCentralNorthSouthEastWest1912D12KeyAFAF098AFAF094AFAF094AFAF094AFAF0912MrkAFAF0932 =
  string;
export type CmfcTimedMetadata = "PASSTHROUGH" | "NONE" | (string & {});
export type CmfcTimedMetadataBoxVersion = "VERSION_0" | "VERSION_1" | (string & {});
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
export type F4vMoovPlacement = "PROGRESSIVE_DOWNLOAD" | "NORMAL" | (string & {});
export interface F4vSettings {
  MoovPlacement?: F4vMoovPlacement;
}
export type M2tsAudioBufferModel = "DVB" | "ATSC" | (string & {});
export type M2tsAudioDuration = "DEFAULT_CODEC_DURATION" | "MATCH_VIDEO_DURATION" | (string & {});
export type __integerMin32Max8182 = number;
export type __listOf__integerMin32Max8182 = number[];
const __listOf__integerMin32Max8182 =
  __listOf__integerMin1Max2147483647 as any as S.Schema<__listOf__integerMin32Max8182>;
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
export type M2tsEbpAudioInterval = "VIDEO_AND_FIXED_INTERVALS" | "VIDEO_INTERVAL" | (string & {});
export type M2tsEbpPlacement = "VIDEO_AND_AUDIO_PIDS" | "VIDEO_PID" | (string & {});
export type M2tsEsRateInPes = "INCLUDE" | "EXCLUDE" | (string & {});
export type M2tsForceTsVideoEbpOrder = "FORCE" | "DEFAULT" | (string & {});
export type M2tsKlvMetadata = "PASSTHROUGH" | "NONE" | (string & {});
export type __integerMin0Max500 = number;
export type __integerMin0Max10000 = number;
export type M2tsNielsenId3 = "INSERT" | "NONE" | (string & {});
export type __integerMin0Max1000 = number;
export type M2tsPcrControl = "PCR_EVERY_PES_PACKET" | "CONFIGURED_PCR_PERIOD" | (string & {});
export type M2tsPreventBufferUnderflow = "DISABLED" | "ENABLED" | (string & {});
export type TsPtsOffset = "AUTO" | "SECONDS" | "MILLISECONDS" | (string & {});
export type M2tsRateMode = "VBR" | "CBR" | (string & {});
export interface M2tsScte35Esam {
  Scte35EsamPid?: number;
}
export type M2tsScte35Source = "PASSTHROUGH" | "NONE" | "MANIFEST_CUES" | (string & {});
export type M2tsSegmentationMarkers =
  | "NONE"
  | "RAI_SEGSTART"
  | "RAI_ADAPT"
  | "PSI_SEGSTART"
  | "EBP"
  | "EBP_LEGACY"
  | (string & {});
export type M2tsSegmentationStyle = "MAINTAIN_CADENCE" | "RESET_CADENCE" | (string & {});
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
export type M3u8AudioDuration = "DEFAULT_CODEC_DURATION" | "MATCH_VIDEO_DURATION" | (string & {});
export type M3u8DataPtsControl = "AUTO" | "ALIGN_TO_VIDEO" | (string & {});
export type M3u8NielsenId3 = "INSERT" | "NONE" | (string & {});
export type M3u8PcrControl = "PCR_EVERY_PES_PACKET" | "CONFIGURED_PCR_PERIOD" | (string & {});
export type M3u8Scte35Source = "PASSTHROUGH" | "NONE" | "MANIFEST_CUES" | (string & {});
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
export type Mp4MoovPlacement = "PROGRESSIVE_DOWNLOAD" | "NORMAL" | (string & {});
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
export type MpdAccessibilityCaptionHints = "INCLUDE" | "EXCLUDE" | (string & {});
export type MpdAudioDuration = "DEFAULT_CODEC_DURATION" | "MATCH_VIDEO_DURATION" | (string & {});
export type MpdC2paManifest = "INCLUDE" | "EXCLUDE" | (string & {});
export type MpdCaptionContainerType = "RAW" | "FRAGMENTED_MP4" | (string & {});
export type MpdKlvMetadata = "NONE" | "PASSTHROUGH" | (string & {});
export type MpdManifestMetadataSignaling = "ENABLED" | "DISABLED" | (string & {});
export type MpdScte35Esam = "INSERT" | "NONE" | (string & {});
export type MpdScte35Source = "PASSTHROUGH" | "NONE" | "MANIFEST_CUES" | (string & {});
export type MpdTimedMetadata = "PASSTHROUGH" | "NONE" | (string & {});
export type MpdTimedMetadataBoxVersion = "VERSION_0" | "VERSION_1" | (string & {});
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
export type MxfProfile = "D_10" | "XDCAM" | "OP1A" | "XAVC" | "XDCAM_RDD9" | (string & {});
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
export type HlsDescriptiveVideoServiceFlag = "DONT_FLAG" | "FLAG" | (string & {});
export type HlsIFrameOnlyManifest = "INCLUDE" | "INCLUDE_AS_TS" | "EXCLUDE" | (string & {});
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
export type ChromaPositionMode = "AUTO" | "FORCE_CENTER" | "FORCE_TOP_LEFT" | (string & {});
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
export type Av1FramerateControl = "INITIALIZE_FROM_SOURCE" | "SPECIFIED" | (string & {});
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
export type Av1SpatialAdaptiveQuantization = "DISABLED" | "ENABLED" | (string & {});
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
export type AvcIntraClass = "CLASS_50" | "CLASS_100" | "CLASS_200" | "CLASS_4K_2K" | (string & {});
export type AvcIntraUhdQualityTuningLevel = "SINGLE_PASS" | "MULTI_PASS" | (string & {});
export interface AvcIntraUhdSettings {
  QualityTuningLevel?: AvcIntraUhdQualityTuningLevel;
}
export type AvcIntraFramerateControl = "INITIALIZE_FROM_SOURCE" | "SPECIFIED" | (string & {});
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
export type AvcIntraScanTypeConversionMode = "INTERLACED" | "INTERLACED_OPTIMIZE" | (string & {});
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
export type GifFramerateControl = "INITIALIZE_FROM_SOURCE" | "SPECIFIED" | (string & {});
export type GifFramerateConversionAlgorithm = "DUPLICATE_DROP" | "INTERPOLATE" | (string & {});
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
export type BandwidthReductionFilterSharpening = "LOW" | "MEDIUM" | "HIGH" | "OFF" | (string & {});
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
export type H264ExplicitWeightedPrediction = "DISABLED" | "ENABLED" | (string & {});
export type H264FieldEncoding = "PAFF" | "FORCE_FIELD" | "MBAFF" | (string & {});
export type H264FlickerAdaptiveQuantization = "DISABLED" | "ENABLED" | (string & {});
export type H264FramerateControl = "INITIALIZE_FROM_SOURCE" | "SPECIFIED" | (string & {});
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
export type H264ParControl = "INITIALIZE_FROM_SOURCE" | "SPECIFIED" | (string & {});
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
export type H264SaliencyAwareEncoding = "DISABLED" | "PREFERRED" | (string & {});
export type H264ScanTypeConversionMode = "INTERLACED" | "INTERLACED_OPTIMIZE" | (string & {});
export type H264SceneChangeDetect = "DISABLED" | "ENABLED" | "TRANSITION_DETECTION" | (string & {});
export type H264SlowPal = "DISABLED" | "ENABLED" | (string & {});
export type __integerMin0Max128 = number;
export type H264SpatialAdaptiveQuantization = "DISABLED" | "ENABLED" | (string & {});
export type H264Syntax = "DEFAULT" | "RP2027" | (string & {});
export type H264Telecine = "NONE" | "SOFT" | "HARD" | (string & {});
export type H264TemporalAdaptiveQuantization = "DISABLED" | "ENABLED" | (string & {});
export type H264UnregisteredSeiTimecode = "DISABLED" | "ENABLED" | (string & {});
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
export type H265AlternateTransferFunctionSei = "DISABLED" | "ENABLED" | (string & {});
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
export type H265FlickerAdaptiveQuantization = "DISABLED" | "ENABLED" | (string & {});
export type H265FramerateControl = "INITIALIZE_FROM_SOURCE" | "SPECIFIED" | (string & {});
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
export type H265MvOverPictureBoundaries = "ENABLED" | "DISABLED" | (string & {});
export type H265MvTemporalPredictor = "ENABLED" | "DISABLED" | (string & {});
export type H265ParControl = "INITIALIZE_FROM_SOURCE" | "SPECIFIED" | (string & {});
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
export type H265SampleAdaptiveOffsetFilterMode = "DEFAULT" | "ADAPTIVE" | "OFF" | (string & {});
export type H265ScanTypeConversionMode = "INTERLACED" | "INTERLACED_OPTIMIZE" | (string & {});
export type H265SceneChangeDetect = "DISABLED" | "ENABLED" | "TRANSITION_DETECTION" | (string & {});
export type H265SlowPal = "DISABLED" | "ENABLED" | (string & {});
export type H265SpatialAdaptiveQuantization = "DISABLED" | "ENABLED" | (string & {});
export type H265Telecine = "NONE" | "SOFT" | "HARD" | (string & {});
export type H265TemporalAdaptiveQuantization = "DISABLED" | "ENABLED" | (string & {});
export type H265TemporalIds = "DISABLED" | "ENABLED" | (string & {});
export type __integerMin64Max2160 = number;
export type H265TilePadding = "NONE" | "PADDED" | (string & {});
export type __integerMin256Max3840 = number;
export type H265Tiles = "DISABLED" | "ENABLED" | (string & {});
export type H265TreeBlockSize = "AUTO" | "TREE_SIZE_32X32" | (string & {});
export type H265UnregisteredSeiTimecode = "DISABLED" | "ENABLED" | (string & {});
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
export type Mpeg2AdaptiveQuantization = "OFF" | "LOW" | "MEDIUM" | "HIGH" | (string & {});
export type __integerMin1000Max288000000 = number;
export type Mpeg2CodecLevel = "AUTO" | "LOW" | "MAIN" | "HIGH1440" | "HIGH" | (string & {});
export type Mpeg2CodecProfile = "MAIN" | "PROFILE_422" | (string & {});
export type Mpeg2DynamicSubGop = "ADAPTIVE" | "STATIC" | (string & {});
export type Mpeg2FramerateControl = "INITIALIZE_FROM_SOURCE" | "SPECIFIED" | (string & {});
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
export type Mpeg2ParControl = "INITIALIZE_FROM_SOURCE" | "SPECIFIED" | (string & {});
export type Mpeg2QualityTuningLevel = "SINGLE_PASS" | "MULTI_PASS" | (string & {});
export type Mpeg2RateControlMode = "VBR" | "CBR" | (string & {});
export type Mpeg2ScanTypeConversionMode = "INTERLACED" | "INTERLACED_OPTIMIZE" | (string & {});
export type Mpeg2SceneChangeDetect = "DISABLED" | "ENABLED" | (string & {});
export type Mpeg2SlowPal = "DISABLED" | "ENABLED" | (string & {});
export type Mpeg2SpatialAdaptiveQuantization = "DISABLED" | "ENABLED" | (string & {});
export type Mpeg2Syntax = "DEFAULT" | "D_10" | (string & {});
export type Mpeg2Telecine = "NONE" | "SOFT" | "HARD" | (string & {});
export type Mpeg2TemporalAdaptiveQuantization = "DISABLED" | "ENABLED" | (string & {});
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
export type FrameControl = "NEAREST_IDRFRAME" | "NEAREST_IFRAME" | (string & {});
export type PassthroughSegmentationMode = "AUTO" | "DURATION_BASED" | "GOP_COUNT" | (string & {});
export type VideoSelectorMode = "AUTO" | "REMUX_ALL" | (string & {});
export interface PassthroughSettings {
  FrameControl?: FrameControl;
  GopsPerSegment?: number;
  SegmentationMode?: PassthroughSegmentationMode;
  VideoSelectorMode?: VideoSelectorMode;
}
export type ProresChromaSampling = "PRESERVE_444_SAMPLING" | "SUBSAMPLE_TO_422" | (string & {});
export type ProresCodecProfile =
  | "APPLE_PRORES_422"
  | "APPLE_PRORES_422_HQ"
  | "APPLE_PRORES_422_LT"
  | "APPLE_PRORES_422_PROXY"
  | "APPLE_PRORES_4444"
  | "APPLE_PRORES_4444_XQ"
  | (string & {});
export type ProresFramerateControl = "INITIALIZE_FROM_SOURCE" | "SPECIFIED" | (string & {});
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
export type ProresParControl = "INITIALIZE_FROM_SOURCE" | "SPECIFIED" | (string & {});
export type ProresScanTypeConversionMode = "INTERLACED" | "INTERLACED_OPTIMIZE" | (string & {});
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
export type UncompressedFramerateControl = "INITIALIZE_FROM_SOURCE" | "SPECIFIED" | (string & {});
export type UncompressedFramerateConversionAlgorithm =
  | "DUPLICATE_DROP"
  | "INTERPOLATE"
  | "FRAMEFORMER"
  | "MAINTAIN_FRAME_COUNT"
  | (string & {});
export type UncompressedInterlaceMode = "INTERLACED" | "PROGRESSIVE" | (string & {});
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
export type Vc3FramerateControl = "INITIALIZE_FROM_SOURCE" | "SPECIFIED" | (string & {});
export type Vc3FramerateConversionAlgorithm =
  | "DUPLICATE_DROP"
  | "INTERPOLATE"
  | "FRAMEFORMER"
  | "MAINTAIN_FRAME_COUNT"
  | (string & {});
export type Vc3InterlaceMode = "INTERLACED" | "PROGRESSIVE" | (string & {});
export type Vc3ScanTypeConversionMode = "INTERLACED" | "INTERLACED_OPTIMIZE" | (string & {});
export type Vc3SlowPal = "DISABLED" | "ENABLED" | (string & {});
export type Vc3Telecine = "NONE" | "HARD" | (string & {});
export type Vc3Class = "CLASS_145_8BIT" | "CLASS_220_8BIT" | "CLASS_220_10BIT" | (string & {});
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
export type Vp8FramerateControl = "INITIALIZE_FROM_SOURCE" | "SPECIFIED" | (string & {});
export type Vp8FramerateConversionAlgorithm =
  | "DUPLICATE_DROP"
  | "INTERPOLATE"
  | "FRAMEFORMER"
  | "MAINTAIN_FRAME_COUNT"
  | (string & {});
export type Vp8ParControl = "INITIALIZE_FROM_SOURCE" | "SPECIFIED" | (string & {});
export type Vp8QualityTuningLevel = "MULTI_PASS" | "MULTI_PASS_HQ" | (string & {});
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
export type Vp9FramerateControl = "INITIALIZE_FROM_SOURCE" | "SPECIFIED" | (string & {});
export type Vp9FramerateConversionAlgorithm =
  | "DUPLICATE_DROP"
  | "INTERPOLATE"
  | "FRAMEFORMER"
  | "MAINTAIN_FRAME_COUNT"
  | (string & {});
export type Vp9ParControl = "INITIALIZE_FROM_SOURCE" | "SPECIFIED" | (string & {});
export type Vp9QualityTuningLevel = "MULTI_PASS" | "MULTI_PASS_HQ" | (string & {});
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
export type XavcFramerateControl = "INITIALIZE_FROM_SOURCE" | "SPECIFIED" | (string & {});
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
export type XavcSpatialAdaptiveQuantization = "DISABLED" | "ENABLED" | (string & {});
export type XavcTemporalAdaptiveQuantization = "DISABLED" | "ENABLED" | (string & {});
export type Xavc4kIntraCbgProfileClass = "CLASS_100" | "CLASS_300" | "CLASS_480" | (string & {});
export interface Xavc4kIntraCbgProfileSettings {
  XavcClass?: Xavc4kIntraCbgProfileClass;
}
export type Xavc4kIntraVbrProfileClass = "CLASS_100" | "CLASS_300" | "CLASS_480" | (string & {});
export interface Xavc4kIntraVbrProfileSettings {
  XavcClass?: Xavc4kIntraVbrProfileClass;
}
export type Xavc4kProfileBitrateClass =
  | "BITRATE_CLASS_100"
  | "BITRATE_CLASS_140"
  | "BITRATE_CLASS_200"
  | (string & {});
export type Xavc4kProfileCodecProfile = "HIGH" | "HIGH_422" | (string & {});
export type XavcFlickerAdaptiveQuantization = "DISABLED" | "ENABLED" | (string & {});
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
export type XavcInterlaceMode =
  | "PROGRESSIVE"
  | "TOP_FIELD"
  | "BOTTOM_FIELD"
  | "FOLLOW_TOP_FIELD"
  | "FOLLOW_BOTTOM_FIELD"
  | (string & {});
export type XavcHdIntraCbgProfileClass = "CLASS_50" | "CLASS_100" | "CLASS_200" | (string & {});
export interface XavcHdIntraCbgProfileSettings {
  InterlaceMode?: XavcInterlaceMode;
  XavcClass?: XavcHdIntraCbgProfileClass;
}
export type XavcHdProfileBitrateClass =
  | "BITRATE_CLASS_25"
  | "BITRATE_CLASS_35"
  | "BITRATE_CLASS_50"
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
export type VideoTimecodeInsertion = "DISABLED" | "PIC_TIMING_SEI" | (string & {});
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
export type DeinterlacerMode = "DEINTERLACE" | "INVERSE_TELECINE" | "ADAPTIVE" | (string & {});
export interface Deinterlacer {
  Algorithm?: DeinterlaceAlgorithm;
  Control?: DeinterlacerControl;
  Mode?: DeinterlacerMode;
}
export type DolbyVisionCompatibility = "DUPLICATE_STREAM" | "SUPPLEMENTAL_CODECS" | (string & {});
export interface DolbyVisionLevel6Metadata {
  MaxCll?: number;
  MaxFall?: number;
}
export type DolbyVisionLevel6Mode = "PASSTHROUGH" | "RECALCULATE" | "SPECIFY" | (string & {});
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
export type NoiseFilterPostTemporalSharpening = "DISABLED" | "ENABLED" | "AUTO" | (string & {});
export type NoiseFilterPostTemporalSharpeningStrength = "LOW" | "MEDIUM" | "HIGH" | (string & {});
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
const __listOfOutput = /*@__PURE__*/ __L.at(__c9, 20);
export interface OutputGroup {
  AutomatedEncodingSettings?: AutomatedEncodingSettings;
  CustomName?: string;
  Name?: string;
  OutputGroupSettings?: OutputGroupSettings;
  Outputs?: Output[];
}
export type __listOfOutputGroup = OutputGroup[];
const __listOfOutputGroup = /*@__PURE__*/ __L.at(__c9, 22);
export type TimecodeSource = "EMBEDDED" | "ZEROBASED" | "SPECIFIEDSTART" | (string & {});
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
const __listOfId3Insertion = /*@__PURE__*/ __L.at(__c9, 25);
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
  MotionImageInserters?: MotionImageInserter[];
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
const __mapOf__string = /*@__PURE__*/ __L.at(__c1, 0);
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
const __listOfElementalInferenceFeature =
  __listOfHlsAdMarkers as any as S.Schema<__listOfElementalInferenceFeature>;
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
const __listOfElementalInferenceFeed = /*@__PURE__*/ __L.at(__c11, 7);
export interface ElementalInferenceConfiguration {
  Features?: ElementalInferenceFeature[];
  Feeds?: ElementalInferenceFeed[];
}
export type __listOf__string = string[];
const __listOf__string = __listOf__stringMin1 as any as S.Schema<__listOf__string>;
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
const __listOfOutputDetail = /*@__PURE__*/ __L.at(__c11, 12);
export interface OutputGroupDetail {
  OutputDetails?: OutputDetail[];
}
export type __listOfOutputGroupDetail = OutputGroupDetail[];
const __listOfOutputGroupDetail = /*@__PURE__*/ __L.at(__c11, 14);
export interface QueueTransition {
  DestinationQueue?: string;
  SourceQueue?: string;
  Timestamp?: Date;
}
export type __listOfQueueTransition = QueueTransition[];
const __listOfQueueTransition = /*@__PURE__*/ __L.at(__c11, 16);
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
const __listOfWarningGroup = /*@__PURE__*/ __L.at(__c11, 19);
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
const __listOfInputTemplate = /*@__PURE__*/ __L.at(__c13, 1);
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
  MotionImageInserters?: MotionImageInserter[];
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
const __listOfCaptionDescriptionPreset = /*@__PURE__*/ __L.at(__c16, 1);
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
const __listOfServiceOverride = /*@__PURE__*/ __L.at(__c19, 2);
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
const Endpoint = /*@__PURE__*/ __L.at(__c54, 0) as any as S.Schema<Endpoint>;
export type __listOfEndpoint = Endpoint[];
const __listOfEndpoint = /*@__PURE__*/ __L.at(__c27, 1);
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
const __listOfJob = /*@__PURE__*/ __L.at(__c31, 0);
export type JobsQueryStatus = "SUBMITTED" | "PROGRESSING" | "COMPLETE" | "ERROR" | (string & {});
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
export type JobTemplateListBy = "NAME" | "CREATION_DATE" | "SYSTEM" | (string & {});
export interface ListJobTemplatesRequest {
  Category?: string;
  ListBy?: JobTemplateListBy;
  MaxResults?: number;
  NextToken?: string;
  Order?: Order;
}
export type __listOfJobTemplate = JobTemplate[];
const __listOfJobTemplate = /*@__PURE__*/ __L.at(__c39, 1);
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
const __listOfPreset = /*@__PURE__*/ __L.at(__c40, 1);
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
const __listOfQueue = /*@__PURE__*/ __L.at(__c41, 1);
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
const __listOfJobEngineVersion = /*@__PURE__*/ __L.at(__c43, 2);
export interface ListVersionsResponse {
  NextToken?: string;
  Versions?: JobEngineVersion[];
}
export interface ProbeInputFile {
  FileUrl?: string;
}
export type __listOfProbeInputFile = ProbeInputFile[];
const __listOfProbeInputFile = /*@__PURE__*/ __L.at(__c44, 1);
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
  | "flac"
  | "asf"
  | "ogg"
  | "three_gp"
  | "three_g2"
  | "aac"
  | "ac3"
  | "eac3"
  | (string & {});
export interface FrameRate {
  Denominator?: number;
  Numerator?: number;
}
export interface AudioProperties {
  BitDepth?: number;
  BitRate?: number;
  ChannelLayout?: string;
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
  | "AMR"
  | "EAC3"
  | "FLAC"
  | "MP2"
  | "MP3"
  | "OPUS"
  | "PCM"
  | "VORBIS"
  | "WMA"
  | "WMA2"
  | "WMAPRO"
  | "AV1"
  | "AVC"
  | "DV"
  | "H263"
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
  | "VC1"
  | "VC3"
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
export interface AspectRatio {
  Denominator?: number;
  Numerator?: number;
}
export type DolbyVisionPresence = "PRESENT" | "ABSENT" | (string & {});
export interface DolbyVisionMetadata {
  BaseLayer?: DolbyVisionPresence;
  EnhancementLayer?: DolbyVisionPresence;
  Level?: number;
  Profile?: number;
  Rpu?: DolbyVisionPresence;
}
export type Hdr10PlusPresence = "PRESENT" | (string & {});
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
  DisplayAspectRatio?: AspectRatio;
  DolbyVision?: DolbyVisionMetadata;
  FieldOrder?: string;
  Hdr10PlusPresence?: Hdr10PlusPresence;
  Height?: number;
  Level?: string;
  MatrixCoefficients?: MatrixCoefficients;
  Profile?: string;
  Rotation?: number;
  SampleAspectRatio?: AspectRatio;
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
  DisplayAspectRatio?: AspectRatio;
  FrameRate?: FrameRate;
  HdrMetadata?: HdrMetadata;
  Height?: number;
  MatrixCoefficients?: MatrixCoefficients;
  Rotation?: number;
  SampleAspectRatio?: AspectRatio;
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
const __listOfTrack = /*@__PURE__*/ __L.at(__c44, 13);
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
const __listOf__integer = __listOf__integerMin1Max2147483647 as any as S.Schema<__listOf__integer>;
export interface TrackMapping {
  AudioTrackIndexes?: number[];
  DataTrackIndexes?: number[];
  VideoTrackIndexes?: number[];
}
export type __listOfTrackMapping = TrackMapping[];
const __listOfTrackMapping = /*@__PURE__*/ __L.at(__c44, 17);
export interface ProbeResult {
  Container?: Container;
  Metadata?: Metadata;
  TrackMappings?: TrackMapping[];
}
export type __listOfProbeResult = ProbeResult[];
const __listOfProbeResult = /*@__PURE__*/ __L.at(__c44, 19);
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
  | "errorCode"
  | (string & {});
export type __stringMax100 = string;
export type __listOf__stringMax100 = string[];
const __listOf__stringMax100 = __listOf__stringMin1 as any as S.Schema<__listOf__stringMax100>;
export interface JobsQueryFilter {
  Key?: JobsQueryFilterKey;
  Values?: string[];
}
export type __listOfJobsQueryFilter = JobsQueryFilter[];
const __listOfJobsQueryFilter = /*@__PURE__*/ __L.at(__c47, 1);
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
  input: __S(1696, __c53, 0) as any as S.Schema<AssociateCertificateRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<AssociateCertificateResponse>,
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
}));

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
  input: __S(1792, __c56, 0) as any as S.Schema<CancelJobRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<CancelJobResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<CreateJobRequest>,
  output: __S(320, __c10, 0) as any as S.Schema<CreateJobResponse>,
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
}));

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
  input: __S(384, __c12, 0) as any as S.Schema<CreateJobTemplateRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<CreateJobTemplateResponse>,
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
}));

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
  input: __S(480, __c15, 0) as any as S.Schema<CreatePresetRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<CreatePresetResponse>,
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
}));

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
  input: __S(576, __c18, 0) as any as S.Schema<CreateQueueRequest>,
  output: __S(640, __c20, 0) as any as S.Schema<CreateQueueResponse>,
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
}));

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
  input: __S(704, __c22, 0) as any as S.Schema<CreateResourceShareRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<CreateResourceShareResponse>,
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
}));

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
  input: __S(736, __c23, 0) as any as S.Schema<DeleteJobTemplateRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<DeleteJobTemplateResponse>,
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
}));

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
  input: __S(768, __c24, 0) as any as S.Schema<DeletePolicyRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<DeletePolicyResponse>,
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
}));

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
  input: __S(800, __c25, 0) as any as S.Schema<DeletePresetRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<DeletePresetResponse>,
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
}));

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
  input: __S(832, __c26, 0) as any as S.Schema<DeleteQueueRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<DeleteQueueResponse>,
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
}));

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
  input: __S(864, __c27, 0) as any as S.Schema<DescribeEndpointsRequest>,
  output: __S(866, __c27, 2) as any as S.Schema<DescribeEndpointsResponse>,
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
  input: __S(896, __c28, 0) as any as S.Schema<DisassociateCertificateRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<DisassociateCertificateResponse>,
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
}));

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
  input: __S(928, __c29, 0) as any as S.Schema<GetJobRequest>,
  output: __S(320, __c10, 0) as any as S.Schema<GetJobResponse>,
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
}));

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
  input: __S(960, __c30, 0) as any as S.Schema<GetJobsQueryResultsRequest>,
  output: __S(961, __c30, 1) as any as S.Schema<GetJobsQueryResultsResponse>,
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
}));

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
  input: __S(1024, __c32, 0) as any as S.Schema<GetJobTemplateRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<GetJobTemplateResponse>,
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
}));

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
  input: __S(1056, __c33, 0) as any as S.Schema<GetPolicyRequest>,
  output: __S(1089, __c34, 1) as any as S.Schema<GetPolicyResponse>,
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
}));

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
  input: __S(1120, __c35, 0) as any as S.Schema<GetPresetRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<GetPresetResponse>,
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
}));

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
  input: __S(1152, __c36, 0) as any as S.Schema<GetQueueRequest>,
  output: __S(640, __c20, 0) as any as S.Schema<GetQueueResponse>,
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
}));

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
  input: __S(1184, __c37, 0) as any as S.Schema<ListJobsRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<ListJobsResponse>,
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
  input: __S(1248, __c39, 0) as any as S.Schema<ListJobTemplatesRequest>,
  output: __S(1250, __c39, 2) as any as S.Schema<ListJobTemplatesResponse>,
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
  input: __S(1280, __c40, 0) as any as S.Schema<ListPresetsRequest>,
  output: __S(1282, __c40, 2) as any as S.Schema<ListPresetsResponse>,
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
  input: __S(1312, __c41, 0) as any as S.Schema<ListQueuesRequest>,
  output: __S(1314, __c41, 2) as any as S.Schema<ListQueuesResponse>,
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
  input: __S(1344, __c42, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(1346, __c42, 2) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
  input: __S(1376, __c43, 0) as any as S.Schema<ListVersionsRequest>,
  output: __S(1379, __c43, 3) as any as S.Schema<ListVersionsResponse>,
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
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Use Probe to obtain detailed information about your input media files. Probe returns a JSON that includes container, codec, frame rate, resolution, track count, audio layout, captions, and more. You can use this information to learn more about your media files, or to help make decisions while automating your transcoding workflow. Probe supports the following input container formats: MP4, QuickTime (MOV), 3GP, 3G2, Matroska (MKV), WebM, MXF, MPEG-TS, MPEG-PS, AVI, WAV, MP3, FLAC, Ogg, and ASF (Windows Media / WMA). The fields that Probe returns vary by container and codec. A field isn't returned when the source doesn't contain it, or when it isn't available for that container and codec.
 */
export const probe: API.OperationMethod<
  ProbeRequest,
  ProbeResponse,
  ProbeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1410, __c44, 2) as any as S.Schema<ProbeRequest>,
  output: __S(1428, __c44, 20) as any as S.Schema<ProbeResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Probe",
}));

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
  input: __S(1440, __c45, 0) as any as S.Schema<PutPolicyRequest>,
  output: __S(1089, __c34, 1) as any as S.Schema<PutPolicyResponse>,
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
}));

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
  input: __S(1472, __c46, 0) as any as S.Schema<SearchJobsRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<SearchJobsResponse>,
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
  input: __S(1506, __c47, 2) as any as S.Schema<StartJobsQueryRequest>,
  output: __S(1507, __c47, 3) as any as S.Schema<StartJobsQueryResponse>,
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
}));

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
  input: __S(1536, __c48, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(1568, __c49, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(1600, __c50, 0) as any as S.Schema<UpdateJobTemplateRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<UpdateJobTemplateResponse>,
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
}));

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
  input: __S(1632, __c51, 0) as any as S.Schema<UpdatePresetRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<UpdatePresetResponse>,
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
}));

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
  input: __S(1664, __c52, 0) as any as S.Schema<UpdateQueueRequest>,
  output: __S(640, __c20, 0) as any as S.Schema<UpdateQueueResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccelerationSettings: S.optional(__S(224, __c7, 0)),
          BillingTagsSource: S.optional(S.String),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          HopDestinations: S.optional(__listOfHopDestination),
          JobEngineVersion: S.optional(S.String),
          JobTemplate: S.optional(S.String),
          Priority: S.optional(S.Number),
          Queue: S.optional(S.String),
          Role: S.optional(S.String),
          Settings: S.optional(__S(357, __c11, 5)),
          SimulateReservedQueue: S.optional(S.String),
          StatusUpdateInterval: S.optional(S.String),
          Tags: S.optional(__mapOf__string),
          UserMetadata: S.optional(__mapOf__string),
        })
          .pipe(
            S.encodeKeys({
              AccelerationSettings: "accelerationSettings",
              BillingTagsSource: "billingTagsSource",
              ClientRequestToken: "clientRequestToken",
              HopDestinations: "hopDestinations",
              JobEngineVersion: "jobEngineVersion",
              JobTemplate: "jobTemplate",
              Priority: "priority",
              Queue: "queue",
              Role: "role",
              Settings: "settings",
              SimulateReservedQueue: "simulateReservedQueue",
              StatusUpdateInterval: "statusUpdateInterval",
              Tags: "tags",
              UserMetadata: "userMetadata",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/2017-08-29/jobs" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateJobRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InputChannels: S.optional(__listOf__integerMinNegative60Max6),
          InputChannelsFineTune: S.optional(__listOf__doubleMinNegative60Max6),
        }).pipe(
          S.encodeKeys({
            InputChannels: "inputChannels",
            InputChannelsFineTune: "inputChannelsFineTune",
          }),
        ),
      ).annotate({ identifier: "OutputChannelMapping" });
    case 1:
      return S.Array(__S(96, __c3, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ OutputChannels: S.optional(__listOfOutputChannelMapping) }).pipe(
          S.encodeKeys({ OutputChannels: "outputChannels" }),
        ),
      ).annotate({ identifier: "ChannelMapping" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AudioDescriptionAudioChannel: S.optional(S.Number),
          AudioDescriptionDataChannel: S.optional(S.Number),
          ChannelMapping: S.optional(__S(98, __c3, 2)),
          ChannelsIn: S.optional(S.Number),
          ChannelsOut: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            AudioDescriptionAudioChannel: "audioDescriptionAudioChannel",
            AudioDescriptionDataChannel: "audioDescriptionDataChannel",
            ChannelMapping: "channelMapping",
            ChannelsIn: "channelsIn",
            ChannelsOut: "channelsOut",
          }),
        ),
      ).annotate({ identifier: "RemixSettings" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Height: S.optional(S.Number),
          Width: S.optional(S.Number),
          X: S.optional(S.Number),
          Y: S.optional(S.Number),
        }).pipe(S.encodeKeys({ Height: "height", Width: "width", X: "x", Y: "y" })),
      ).annotate({ identifier: "Rectangle" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Duration: S.optional(S.Number),
          FadeIn: S.optional(S.Number),
          FadeOut: S.optional(S.Number),
          Height: S.optional(S.Number),
          ImageInserterInput: S.optional(S.String),
          ImageX: S.optional(S.Number),
          ImageY: S.optional(S.Number),
          Layer: S.optional(S.Number),
          Opacity: S.optional(S.Number),
          StartTime: S.optional(S.String),
          Width: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            Duration: "duration",
            FadeIn: "fadeIn",
            FadeOut: "fadeOut",
            Height: "height",
            ImageInserterInput: "imageInserterInput",
            ImageX: "imageX",
            ImageY: "imageY",
            Layer: "layer",
            Opacity: "opacity",
            StartTime: "startTime",
            Width: "width",
          }),
        ),
      ).annotate({ identifier: "InsertableImage" });
    case 6:
      return S.Array(__S(101, __c3, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          InsertableImages: S.optional(__listOfInsertableImage),
          SdrReferenceWhiteLevel: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            InsertableImages: "insertableImages",
            SdrReferenceWhiteLevel: "sdrReferenceWhiteLevel",
          }),
        ),
      ).annotate({ identifier: "ImageInserter" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          BluePrimaryX: S.optional(S.Number),
          BluePrimaryY: S.optional(S.Number),
          GreenPrimaryX: S.optional(S.Number),
          GreenPrimaryY: S.optional(S.Number),
          MaxContentLightLevel: S.optional(S.Number),
          MaxFrameAverageLightLevel: S.optional(S.Number),
          MaxLuminance: S.optional(S.Number),
          MinLuminance: S.optional(S.Number),
          RedPrimaryX: S.optional(S.Number),
          RedPrimaryY: S.optional(S.Number),
          WhitePointX: S.optional(S.Number),
          WhitePointY: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            BluePrimaryX: "bluePrimaryX",
            BluePrimaryY: "bluePrimaryY",
            GreenPrimaryX: "greenPrimaryX",
            GreenPrimaryY: "greenPrimaryY",
            MaxContentLightLevel: "maxContentLightLevel",
            MaxFrameAverageLightLevel: "maxFrameAverageLightLevel",
            MaxLuminance: "maxLuminance",
            MinLuminance: "minLuminance",
            RedPrimaryX: "redPrimaryX",
            RedPrimaryY: "redPrimaryY",
            WhitePointX: "whitePointX",
            WhitePointY: "whitePointY",
          }),
        ),
      ).annotate({ identifier: "Hdr10Metadata" });
    case 9:
      return S.Array(S.String);
    case 10:
      return S.suspend(() =>
        S.Struct({
          ChannelTag: S.optional(S.String),
          ChannelTags: S.optional(__listOfAudioChannelTag),
        }).pipe(S.encodeKeys({ ChannelTag: "channelTag", ChannelTags: "channelTags" })),
      ).annotate({ identifier: "AudioChannelTaggingSettings" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          Algorithm: S.optional(S.String),
          AlgorithmControl: S.optional(S.String),
          CorrectionGateLevel: S.optional(S.Number),
          LoudnessLogging: S.optional(S.String),
          PeakCalculation: S.optional(S.String),
          TargetLkfs: S.optional(S.Number),
          TruePeakLimiterThreshold: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            Algorithm: "algorithm",
            AlgorithmControl: "algorithmControl",
            CorrectionGateLevel: "correctionGateLevel",
            LoudnessLogging: "loudnessLogging",
            PeakCalculation: "peakCalculation",
            TargetLkfs: "targetLkfs",
            TruePeakLimiterThreshold: "truePeakLimiterThreshold",
          }),
        ),
      ).annotate({ identifier: "AudioNormalizationSettings" });
    case 12:
      return S.suspend(() =>
        S.Struct({ SlowPalPitchCorrection: S.optional(S.String) }).pipe(
          S.encodeKeys({ SlowPalPitchCorrection: "slowPalPitchCorrection" }),
        ),
      ).annotate({ identifier: "AudioPitchCorrectionSettings" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          AudioDescriptionBroadcasterMix: S.optional(S.String),
          Bitrate: S.optional(S.Number),
          CodecProfile: S.optional(S.String),
          CodingMode: S.optional(S.String),
          LoudnessMeasurementMode: S.optional(S.String),
          PassthroughControl: S.optional(S.String),
          RapInterval: S.optional(S.Number),
          RateControlMode: S.optional(S.String),
          RawFormat: S.optional(S.String),
          SampleRate: S.optional(S.Number),
          Specification: S.optional(S.String),
          TargetLoudnessRange: S.optional(S.Number),
          VbrQuality: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AudioDescriptionBroadcasterMix: "audioDescriptionBroadcasterMix",
            Bitrate: "bitrate",
            CodecProfile: "codecProfile",
            CodingMode: "codingMode",
            LoudnessMeasurementMode: "loudnessMeasurementMode",
            PassthroughControl: "passthroughControl",
            RapInterval: "rapInterval",
            RateControlMode: "rateControlMode",
            RawFormat: "rawFormat",
            SampleRate: "sampleRate",
            Specification: "specification",
            TargetLoudnessRange: "targetLoudnessRange",
            VbrQuality: "vbrQuality",
          }),
        ),
      ).annotate({ identifier: "AacSettings" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          Bitrate: S.optional(S.Number),
          BitstreamMode: S.optional(S.String),
          CodingMode: S.optional(S.String),
          Dialnorm: S.optional(S.Number),
          DynamicRangeCompressionLine: S.optional(S.String),
          DynamicRangeCompressionProfile: S.optional(S.String),
          DynamicRangeCompressionRf: S.optional(S.String),
          LfeFilter: S.optional(S.String),
          MetadataControl: S.optional(S.String),
          SampleRate: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            Bitrate: "bitrate",
            BitstreamMode: "bitstreamMode",
            CodingMode: "codingMode",
            Dialnorm: "dialnorm",
            DynamicRangeCompressionLine: "dynamicRangeCompressionLine",
            DynamicRangeCompressionProfile: "dynamicRangeCompressionProfile",
            DynamicRangeCompressionRf: "dynamicRangeCompressionRf",
            LfeFilter: "lfeFilter",
            MetadataControl: "metadataControl",
            SampleRate: "sampleRate",
          }),
        ),
      ).annotate({ identifier: "Ac3Settings" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          Bitrate: S.optional(S.Number),
          BitstreamMode: S.optional(S.String),
          CodingMode: S.optional(S.String),
          DynamicRangeCompressionFlatPanelTv: S.optional(S.String),
          DynamicRangeCompressionHomeTheater: S.optional(S.String),
          DynamicRangeCompressionPortableHeadphones: S.optional(S.String),
          DynamicRangeCompressionPortableSpeakers: S.optional(S.String),
          LoRoCenterMixLevel: S.optional(S.Number),
          LoRoSurroundMixLevel: S.optional(S.Number),
          LtRtCenterMixLevel: S.optional(S.Number),
          LtRtSurroundMixLevel: S.optional(S.Number),
          SampleRate: S.optional(S.Number),
          StereoDownmix: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Bitrate: "bitrate",
            BitstreamMode: "bitstreamMode",
            CodingMode: "codingMode",
            DynamicRangeCompressionFlatPanelTv: "dynamicRangeCompressionFlatPanelTv",
            DynamicRangeCompressionHomeTheater: "dynamicRangeCompressionHomeTheater",
            DynamicRangeCompressionPortableHeadphones: "dynamicRangeCompressionPortableHeadphones",
            DynamicRangeCompressionPortableSpeakers: "dynamicRangeCompressionPortableSpeakers",
            LoRoCenterMixLevel: "loRoCenterMixLevel",
            LoRoSurroundMixLevel: "loRoSurroundMixLevel",
            LtRtCenterMixLevel: "ltRtCenterMixLevel",
            LtRtSurroundMixLevel: "ltRtSurroundMixLevel",
            SampleRate: "sampleRate",
            StereoDownmix: "stereoDownmix",
          }),
        ),
      ).annotate({ identifier: "Ac4Settings" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          BitDepth: S.optional(S.Number),
          Channels: S.optional(S.Number),
          SampleRate: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({ BitDepth: "bitDepth", Channels: "channels", SampleRate: "sampleRate" }),
        ),
      ).annotate({ identifier: "AiffSettings" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          Bitrate: S.optional(S.Number),
          BitstreamMode: S.optional(S.String),
          CodingMode: S.optional(S.String),
          DialogueIntelligence: S.optional(S.String),
          DownmixControl: S.optional(S.String),
          DynamicRangeCompressionLine: S.optional(S.String),
          DynamicRangeCompressionRf: S.optional(S.String),
          DynamicRangeControl: S.optional(S.String),
          LoRoCenterMixLevel: S.optional(S.Number),
          LoRoSurroundMixLevel: S.optional(S.Number),
          LtRtCenterMixLevel: S.optional(S.Number),
          LtRtSurroundMixLevel: S.optional(S.Number),
          MeteringMode: S.optional(S.String),
          SampleRate: S.optional(S.Number),
          SpeechThreshold: S.optional(S.Number),
          StereoDownmix: S.optional(S.String),
          SurroundExMode: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Bitrate: "bitrate",
            BitstreamMode: "bitstreamMode",
            CodingMode: "codingMode",
            DialogueIntelligence: "dialogueIntelligence",
            DownmixControl: "downmixControl",
            DynamicRangeCompressionLine: "dynamicRangeCompressionLine",
            DynamicRangeCompressionRf: "dynamicRangeCompressionRf",
            DynamicRangeControl: "dynamicRangeControl",
            LoRoCenterMixLevel: "loRoCenterMixLevel",
            LoRoSurroundMixLevel: "loRoSurroundMixLevel",
            LtRtCenterMixLevel: "ltRtCenterMixLevel",
            LtRtSurroundMixLevel: "ltRtSurroundMixLevel",
            MeteringMode: "meteringMode",
            SampleRate: "sampleRate",
            SpeechThreshold: "speechThreshold",
            StereoDownmix: "stereoDownmix",
            SurroundExMode: "surroundExMode",
          }),
        ),
      ).annotate({ identifier: "Eac3AtmosSettings" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          AttenuationControl: S.optional(S.String),
          Bitrate: S.optional(S.Number),
          BitstreamMode: S.optional(S.String),
          CodingMode: S.optional(S.String),
          DcFilter: S.optional(S.String),
          Dialnorm: S.optional(S.Number),
          DynamicRangeCompressionLine: S.optional(S.String),
          DynamicRangeCompressionRf: S.optional(S.String),
          LfeControl: S.optional(S.String),
          LfeFilter: S.optional(S.String),
          LoRoCenterMixLevel: S.optional(S.Number),
          LoRoSurroundMixLevel: S.optional(S.Number),
          LtRtCenterMixLevel: S.optional(S.Number),
          LtRtSurroundMixLevel: S.optional(S.Number),
          MetadataControl: S.optional(S.String),
          PassthroughControl: S.optional(S.String),
          PhaseControl: S.optional(S.String),
          SampleRate: S.optional(S.Number),
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
            DynamicRangeCompressionLine: "dynamicRangeCompressionLine",
            DynamicRangeCompressionRf: "dynamicRangeCompressionRf",
            LfeControl: "lfeControl",
            LfeFilter: "lfeFilter",
            LoRoCenterMixLevel: "loRoCenterMixLevel",
            LoRoSurroundMixLevel: "loRoSurroundMixLevel",
            LtRtCenterMixLevel: "ltRtCenterMixLevel",
            LtRtSurroundMixLevel: "ltRtSurroundMixLevel",
            MetadataControl: "metadataControl",
            PassthroughControl: "passthroughControl",
            PhaseControl: "phaseControl",
            SampleRate: "sampleRate",
            StereoDownmix: "stereoDownmix",
            SurroundExMode: "surroundExMode",
            SurroundMode: "surroundMode",
          }),
        ),
      ).annotate({ identifier: "Eac3Settings" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          AudioDescriptionMix: S.optional(S.String),
          Bitrate: S.optional(S.Number),
          Channels: S.optional(S.Number),
          SampleRate: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            AudioDescriptionMix: "audioDescriptionMix",
            Bitrate: "bitrate",
            Channels: "channels",
            SampleRate: "sampleRate",
          }),
        ),
      ).annotate({ identifier: "Mp2Settings" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          Bitrate: S.optional(S.Number),
          Channels: S.optional(S.Number),
          RateControlMode: S.optional(S.String),
          SampleRate: S.optional(S.Number),
          VbrQuality: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            Bitrate: "bitrate",
            Channels: "channels",
            RateControlMode: "rateControlMode",
            SampleRate: "sampleRate",
            VbrQuality: "vbrQuality",
          }),
        ),
      ).annotate({ identifier: "Mp3Settings" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          Bitrate: S.optional(S.Number),
          Channels: S.optional(S.Number),
          SampleRate: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({ Bitrate: "bitrate", Channels: "channels", SampleRate: "sampleRate" }),
        ),
      ).annotate({ identifier: "OpusSettings" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          Channels: S.optional(S.Number),
          SampleRate: S.optional(S.Number),
          VbrQuality: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            Channels: "channels",
            SampleRate: "sampleRate",
            VbrQuality: "vbrQuality",
          }),
        ),
      ).annotate({ identifier: "VorbisSettings" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          BitDepth: S.optional(S.Number),
          Channels: S.optional(S.Number),
          Format: S.optional(S.String),
          SampleRate: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            BitDepth: "bitDepth",
            Channels: "channels",
            Format: "format",
            SampleRate: "sampleRate",
          }),
        ),
      ).annotate({ identifier: "WavSettings" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          AacSettings: S.optional(__S(109, __c3, 13)),
          Ac3Settings: S.optional(__S(110, __c3, 14)),
          Ac4Settings: S.optional(__S(111, __c3, 15)),
          AiffSettings: S.optional(__S(112, __c3, 16)),
          Codec: S.optional(S.String),
          Eac3AtmosSettings: S.optional(__S(113, __c3, 17)),
          Eac3Settings: S.optional(__S(114, __c3, 18)),
          FlacSettings: S.optional(__S(112, __c3, 16)),
          Mp2Settings: S.optional(__S(115, __c3, 19)),
          Mp3Settings: S.optional(__S(116, __c3, 20)),
          OpusSettings: S.optional(__S(117, __c3, 21)),
          VorbisSettings: S.optional(__S(118, __c3, 22)),
          WavSettings: S.optional(__S(119, __c3, 23)),
        }).pipe(
          S.encodeKeys({
            AacSettings: "aacSettings",
            Ac3Settings: "ac3Settings",
            Ac4Settings: "ac4Settings",
            AiffSettings: "aiffSettings",
            Codec: "codec",
            Eac3AtmosSettings: "eac3AtmosSettings",
            Eac3Settings: "eac3Settings",
            FlacSettings: "flacSettings",
            Mp2Settings: "mp2Settings",
            Mp3Settings: "mp3Settings",
            OpusSettings: "opusSettings",
            VorbisSettings: "vorbisSettings",
            WavSettings: "wavSettings",
          }),
        ),
      ).annotate({ identifier: "AudioCodecSettings" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          AudioChannelTaggingSettings: S.optional(__S(106, __c3, 10)),
          AudioNormalizationSettings: S.optional(__S(107, __c3, 11)),
          AudioPitchCorrectionSettings: S.optional(__S(108, __c3, 12)),
          AudioSourceName: S.optional(S.String),
          AudioType: S.optional(S.Number),
          AudioTypeControl: S.optional(S.String),
          CodecSettings: S.optional(__S(120, __c3, 24)),
          CustomLanguageCode: S.optional(S.String),
          LanguageCode: S.optional(S.String),
          LanguageCodeControl: S.optional(S.String),
          RemixSettings: S.optional(__S(99, __c3, 3)),
          StreamName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AudioChannelTaggingSettings: "audioChannelTaggingSettings",
            AudioNormalizationSettings: "audioNormalizationSettings",
            AudioPitchCorrectionSettings: "audioPitchCorrectionSettings",
            AudioSourceName: "audioSourceName",
            AudioType: "audioType",
            AudioTypeControl: "audioTypeControl",
            CodecSettings: "codecSettings",
            CustomLanguageCode: "customLanguageCode",
            LanguageCode: "languageCode",
            LanguageCodeControl: "languageCodeControl",
            RemixSettings: "remixSettings",
            StreamName: "streamName",
          }),
        ),
      ).annotate({ identifier: "AudioDescription" });
    case 26:
      return S.Array(__S(121, __c3, 25));
    case 27:
      return S.suspend(() =>
        S.Struct({
          Alignment: S.optional(S.String),
          ApplyFontColor: S.optional(S.String),
          BackgroundColor: S.optional(S.String),
          BackgroundOpacity: S.optional(S.Number),
          FallbackFont: S.optional(S.String),
          FontColor: S.optional(S.String),
          FontFileBold: S.optional(S.String),
          FontFileBoldItalic: S.optional(S.String),
          FontFileItalic: S.optional(S.String),
          FontFileRegular: S.optional(S.String),
          FontOpacity: S.optional(S.Number),
          FontResolution: S.optional(S.Number),
          FontScript: S.optional(S.String),
          FontSize: S.optional(S.Number),
          HexFontColor: S.optional(S.String),
          OutlineColor: S.optional(S.String),
          OutlineSize: S.optional(S.Number),
          RemoveRubyReserveAttributes: S.optional(S.String),
          ShadowColor: S.optional(S.String),
          ShadowOpacity: S.optional(S.Number),
          ShadowXOffset: S.optional(S.Number),
          ShadowYOffset: S.optional(S.Number),
          StylePassthrough: S.optional(S.String),
          TeletextSpacing: S.optional(S.String),
          XPosition: S.optional(S.Number),
          YPosition: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            Alignment: "alignment",
            ApplyFontColor: "applyFontColor",
            BackgroundColor: "backgroundColor",
            BackgroundOpacity: "backgroundOpacity",
            FallbackFont: "fallbackFont",
            FontColor: "fontColor",
            FontFileBold: "fontFileBold",
            FontFileBoldItalic: "fontFileBoldItalic",
            FontFileItalic: "fontFileItalic",
            FontFileRegular: "fontFileRegular",
            FontOpacity: "fontOpacity",
            FontResolution: "fontResolution",
            FontScript: "fontScript",
            FontSize: "fontSize",
            HexFontColor: "hexFontColor",
            OutlineColor: "outlineColor",
            OutlineSize: "outlineSize",
            RemoveRubyReserveAttributes: "removeRubyReserveAttributes",
            ShadowColor: "shadowColor",
            ShadowOpacity: "shadowOpacity",
            ShadowXOffset: "shadowXOffset",
            ShadowYOffset: "shadowYOffset",
            StylePassthrough: "stylePassthrough",
            TeletextSpacing: "teletextSpacing",
            XPosition: "xPosition",
            YPosition: "yPosition",
          }),
        ),
      ).annotate({ identifier: "BurninDestinationSettings" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          Alignment: S.optional(S.String),
          ApplyFontColor: S.optional(S.String),
          BackgroundColor: S.optional(S.String),
          BackgroundOpacity: S.optional(S.Number),
          DdsHandling: S.optional(S.String),
          DdsXCoordinate: S.optional(S.Number),
          DdsYCoordinate: S.optional(S.Number),
          FallbackFont: S.optional(S.String),
          FontColor: S.optional(S.String),
          FontFileBold: S.optional(S.String),
          FontFileBoldItalic: S.optional(S.String),
          FontFileItalic: S.optional(S.String),
          FontFileRegular: S.optional(S.String),
          FontOpacity: S.optional(S.Number),
          FontResolution: S.optional(S.Number),
          FontScript: S.optional(S.String),
          FontSize: S.optional(S.Number),
          Height: S.optional(S.Number),
          HexFontColor: S.optional(S.String),
          OutlineColor: S.optional(S.String),
          OutlineSize: S.optional(S.Number),
          ShadowColor: S.optional(S.String),
          ShadowOpacity: S.optional(S.Number),
          ShadowXOffset: S.optional(S.Number),
          ShadowYOffset: S.optional(S.Number),
          StylePassthrough: S.optional(S.String),
          SubtitlingType: S.optional(S.String),
          TeletextSpacing: S.optional(S.String),
          Width: S.optional(S.Number),
          XPosition: S.optional(S.Number),
          YPosition: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            Alignment: "alignment",
            ApplyFontColor: "applyFontColor",
            BackgroundColor: "backgroundColor",
            BackgroundOpacity: "backgroundOpacity",
            DdsHandling: "ddsHandling",
            DdsXCoordinate: "ddsXCoordinate",
            DdsYCoordinate: "ddsYCoordinate",
            FallbackFont: "fallbackFont",
            FontColor: "fontColor",
            FontFileBold: "fontFileBold",
            FontFileBoldItalic: "fontFileBoldItalic",
            FontFileItalic: "fontFileItalic",
            FontFileRegular: "fontFileRegular",
            FontOpacity: "fontOpacity",
            FontResolution: "fontResolution",
            FontScript: "fontScript",
            FontSize: "fontSize",
            Height: "height",
            HexFontColor: "hexFontColor",
            OutlineColor: "outlineColor",
            OutlineSize: "outlineSize",
            ShadowColor: "shadowColor",
            ShadowOpacity: "shadowOpacity",
            ShadowXOffset: "shadowXOffset",
            ShadowYOffset: "shadowYOffset",
            StylePassthrough: "stylePassthrough",
            SubtitlingType: "subtitlingType",
            TeletextSpacing: "teletextSpacing",
            Width: "width",
            XPosition: "xPosition",
            YPosition: "yPosition",
          }),
        ),
      ).annotate({ identifier: "DvbSubDestinationSettings" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          Destination608ChannelNumber: S.optional(S.Number),
          Destination708ServiceNumber: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            Destination608ChannelNumber: "destination608ChannelNumber",
            Destination708ServiceNumber: "destination708ServiceNumber",
          }),
        ),
      ).annotate({ identifier: "EmbeddedDestinationSettings" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          Accessibility: S.optional(S.String),
          StylePassthrough: S.optional(S.String),
        }).pipe(
          S.encodeKeys({ Accessibility: "accessibility", StylePassthrough: "stylePassthrough" }),
        ),
      ).annotate({ identifier: "ImscDestinationSettings" });
    case 31:
      return S.suspend(() =>
        S.Struct({ Framerate: S.optional(S.String) }).pipe(
          S.encodeKeys({ Framerate: "framerate" }),
        ),
      ).annotate({ identifier: "SccDestinationSettings" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StylePassthrough: S.optional(S.String) }).pipe(
          S.encodeKeys({ StylePassthrough: "stylePassthrough" }),
        ),
      ).annotate({ identifier: "SrtDestinationSettings" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PageNumber: S.optional(S.String),
          PageTypes: S.optional(__listOfTeletextPageType),
        }).pipe(S.encodeKeys({ PageNumber: "pageNumber", PageTypes: "pageTypes" })),
      ).annotate({ identifier: "TeletextDestinationSettings" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          BackgroundColor: S.optional(S.String),
          BackgroundOpacity: S.optional(S.Number),
          FontColor: S.optional(S.String),
          FontOpacity: S.optional(S.Number),
          FontSize: S.optional(S.Number),
          FontStyle: S.optional(S.String),
          FontWeight: S.optional(S.String),
          StylePassthrough: S.optional(S.String),
          TextDecoration: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            BackgroundColor: "backgroundColor",
            BackgroundOpacity: "backgroundOpacity",
            FontColor: "fontColor",
            FontOpacity: "fontOpacity",
            FontSize: "fontSize",
            FontStyle: "fontStyle",
            FontWeight: "fontWeight",
            StylePassthrough: "stylePassthrough",
            TextDecoration: "textDecoration",
          }),
        ),
      ).annotate({ identifier: "TtmlDestinationSettings" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          BurninDestinationSettings: S.optional(__S(123, __c3, 27)),
          DestinationType: S.optional(S.String),
          DvbSubDestinationSettings: S.optional(__S(124, __c3, 28)),
          EmbeddedDestinationSettings: S.optional(__S(125, __c3, 29)),
          ImscDestinationSettings: S.optional(__S(126, __c3, 30)),
          SccDestinationSettings: S.optional(__S(127, __c3, 31)),
          SrtDestinationSettings: S.optional(__S(128, __c4, 0)),
          TeletextDestinationSettings: S.optional(__S(129, __c4, 1)),
          TtmlDestinationSettings: S.optional(__S(130, __c4, 2)),
          WebvttDestinationSettings: S.optional(__S(126, __c3, 30)),
        }).pipe(
          S.encodeKeys({
            BurninDestinationSettings: "burninDestinationSettings",
            DestinationType: "destinationType",
            DvbSubDestinationSettings: "dvbSubDestinationSettings",
            EmbeddedDestinationSettings: "embeddedDestinationSettings",
            ImscDestinationSettings: "imscDestinationSettings",
            SccDestinationSettings: "sccDestinationSettings",
            SrtDestinationSettings: "srtDestinationSettings",
            TeletextDestinationSettings: "teletextDestinationSettings",
            TtmlDestinationSettings: "ttmlDestinationSettings",
            WebvttDestinationSettings: "webvttDestinationSettings",
          }),
        ),
      ).annotate({ identifier: "CaptionDestinationSettings" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          AudioDuration: S.optional(S.String),
          AudioGroupId: S.optional(S.String),
          AudioRenditionSets: S.optional(S.String),
          AudioTrackType: S.optional(S.String),
          C2paManifest: S.optional(S.String),
          CertificateSecret: S.optional(S.String),
          DescriptiveVideoServiceFlag: S.optional(S.String),
          IFrameOnlyManifest: S.optional(S.String),
          KlvMetadata: S.optional(S.String),
          ManifestMetadataSignaling: S.optional(S.String),
          Scte35Esam: S.optional(S.String),
          Scte35Source: S.optional(S.String),
          SigningKmsKey: S.optional(S.String),
          TimedMetadata: S.optional(S.String),
          TimedMetadataBoxVersion: S.optional(S.String),
          TimedMetadataSchemeIdUri: S.optional(S.String),
          TimedMetadataValue: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AudioDuration: "audioDuration",
            AudioGroupId: "audioGroupId",
            AudioRenditionSets: "audioRenditionSets",
            AudioTrackType: "audioTrackType",
            C2paManifest: "c2paManifest",
            CertificateSecret: "certificateSecret",
            DescriptiveVideoServiceFlag: "descriptiveVideoServiceFlag",
            IFrameOnlyManifest: "iFrameOnlyManifest",
            KlvMetadata: "klvMetadata",
            ManifestMetadataSignaling: "manifestMetadataSignaling",
            Scte35Esam: "scte35Esam",
            Scte35Source: "scte35Source",
            SigningKmsKey: "signingKmsKey",
            TimedMetadata: "timedMetadata",
            TimedMetadataBoxVersion: "timedMetadataBoxVersion",
            TimedMetadataSchemeIdUri: "timedMetadataSchemeIdUri",
            TimedMetadataValue: "timedMetadataValue",
          }),
        ),
      ).annotate({ identifier: "CmfcSettings" });
    case 5:
      return S.suspend(() =>
        S.Struct({ MoovPlacement: S.optional(S.String) }).pipe(
          S.encodeKeys({ MoovPlacement: "moovPlacement" }),
        ),
      ).annotate({ identifier: "F4vSettings" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          NetworkId: S.optional(S.Number),
          NetworkName: S.optional(S.String),
          NitInterval: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            NetworkId: "networkId",
            NetworkName: "networkName",
            NitInterval: "nitInterval",
          }),
        ),
      ).annotate({ identifier: "DvbNitSettings" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          OutputSdt: S.optional(S.String),
          SdtInterval: S.optional(S.Number),
          ServiceName: S.optional(S.String),
          ServiceProviderName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            OutputSdt: "outputSdt",
            SdtInterval: "sdtInterval",
            ServiceName: "serviceName",
            ServiceProviderName: "serviceProviderName",
          }),
        ),
      ).annotate({ identifier: "DvbSdtSettings" });
    case 8:
      return S.suspend(() =>
        S.Struct({ TdtInterval: S.optional(S.Number) }).pipe(
          S.encodeKeys({ TdtInterval: "tdtInterval" }),
        ),
      ).annotate({ identifier: "DvbTdtSettings" });
    case 9:
      return S.suspend(() =>
        S.Struct({ Scte35EsamPid: S.optional(S.Number) }).pipe(
          S.encodeKeys({ Scte35EsamPid: "scte35EsamPid" }),
        ),
      ).annotate({ identifier: "M2tsScte35Esam" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          AudioBufferModel: S.optional(S.String),
          AudioDuration: S.optional(S.String),
          AudioFramesPerPes: S.optional(S.Number),
          AudioPids: S.optional(__listOf__integerMin32Max8182),
          AudioPtsOffsetDelta: S.optional(S.Number),
          Bitrate: S.optional(S.Number),
          BufferModel: S.optional(S.String),
          DataPTSControl: S.optional(S.String),
          DvbNitSettings: S.optional(__S(134, __c4, 6)),
          DvbSdtSettings: S.optional(__S(135, __c4, 7)),
          DvbSubPids: S.optional(__listOf__integerMin32Max8182),
          DvbTdtSettings: S.optional(__S(136, __c4, 8)),
          DvbTeletextPid: S.optional(S.Number),
          EbpAudioInterval: S.optional(S.String),
          EbpPlacement: S.optional(S.String),
          EsRateInPes: S.optional(S.String),
          ForceTsVideoEbpOrder: S.optional(S.String),
          FragmentTime: S.optional(S.Number),
          KlvMetadata: S.optional(S.String),
          MaxPcrInterval: S.optional(S.Number),
          MinEbpInterval: S.optional(S.Number),
          NielsenId3: S.optional(S.String),
          NullPacketBitrate: S.optional(S.Number),
          PatInterval: S.optional(S.Number),
          PcrControl: S.optional(S.String),
          PcrPid: S.optional(S.Number),
          PmtInterval: S.optional(S.Number),
          PmtPid: S.optional(S.Number),
          PreventBufferUnderflow: S.optional(S.String),
          PrivateMetadataPid: S.optional(S.Number),
          ProgramNumber: S.optional(S.Number),
          PtsOffset: S.optional(S.Number),
          PtsOffsetMode: S.optional(S.String),
          RateMode: S.optional(S.String),
          Scte35Esam: S.optional(__S(137, __c4, 9)),
          Scte35Pid: S.optional(S.Number),
          Scte35Source: S.optional(S.String),
          SegmentationMarkers: S.optional(S.String),
          SegmentationStyle: S.optional(S.String),
          SegmentationTime: S.optional(S.Number),
          TimedMetadataPid: S.optional(S.Number),
          TransportStreamId: S.optional(S.Number),
          VideoPid: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            AudioBufferModel: "audioBufferModel",
            AudioDuration: "audioDuration",
            AudioFramesPerPes: "audioFramesPerPes",
            AudioPids: "audioPids",
            AudioPtsOffsetDelta: "audioPtsOffsetDelta",
            Bitrate: "bitrate",
            BufferModel: "bufferModel",
            DataPTSControl: "dataPTSControl",
            DvbNitSettings: "dvbNitSettings",
            DvbSdtSettings: "dvbSdtSettings",
            DvbSubPids: "dvbSubPids",
            DvbTdtSettings: "dvbTdtSettings",
            DvbTeletextPid: "dvbTeletextPid",
            EbpAudioInterval: "ebpAudioInterval",
            EbpPlacement: "ebpPlacement",
            EsRateInPes: "esRateInPes",
            ForceTsVideoEbpOrder: "forceTsVideoEbpOrder",
            FragmentTime: "fragmentTime",
            KlvMetadata: "klvMetadata",
            MaxPcrInterval: "maxPcrInterval",
            MinEbpInterval: "minEbpInterval",
            NielsenId3: "nielsenId3",
            NullPacketBitrate: "nullPacketBitrate",
            PatInterval: "patInterval",
            PcrControl: "pcrControl",
            PcrPid: "pcrPid",
            PmtInterval: "pmtInterval",
            PmtPid: "pmtPid",
            PreventBufferUnderflow: "preventBufferUnderflow",
            PrivateMetadataPid: "privateMetadataPid",
            ProgramNumber: "programNumber",
            PtsOffset: "ptsOffset",
            PtsOffsetMode: "ptsOffsetMode",
            RateMode: "rateMode",
            Scte35Esam: "scte35Esam",
            Scte35Pid: "scte35Pid",
            Scte35Source: "scte35Source",
            SegmentationMarkers: "segmentationMarkers",
            SegmentationStyle: "segmentationStyle",
            SegmentationTime: "segmentationTime",
            TimedMetadataPid: "timedMetadataPid",
            TransportStreamId: "transportStreamId",
            VideoPid: "videoPid",
          }),
        ),
      ).annotate({ identifier: "M2tsSettings" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          AudioDuration: S.optional(S.String),
          AudioFramesPerPes: S.optional(S.Number),
          AudioPids: S.optional(__listOf__integerMin32Max8182),
          AudioPtsOffsetDelta: S.optional(S.Number),
          DataPTSControl: S.optional(S.String),
          MaxPcrInterval: S.optional(S.Number),
          NielsenId3: S.optional(S.String),
          PatInterval: S.optional(S.Number),
          PcrControl: S.optional(S.String),
          PcrPid: S.optional(S.Number),
          PmtInterval: S.optional(S.Number),
          PmtPid: S.optional(S.Number),
          PrivateMetadataPid: S.optional(S.Number),
          ProgramNumber: S.optional(S.Number),
          PtsOffset: S.optional(S.Number),
          PtsOffsetMode: S.optional(S.String),
          Scte35Pid: S.optional(S.Number),
          Scte35Source: S.optional(S.String),
          TimedMetadata: S.optional(S.String),
          TimedMetadataPid: S.optional(S.Number),
          TransportStreamId: S.optional(S.Number),
          VideoPid: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            AudioDuration: "audioDuration",
            AudioFramesPerPes: "audioFramesPerPes",
            AudioPids: "audioPids",
            AudioPtsOffsetDelta: "audioPtsOffsetDelta",
            DataPTSControl: "dataPTSControl",
            MaxPcrInterval: "maxPcrInterval",
            NielsenId3: "nielsenId3",
            PatInterval: "patInterval",
            PcrControl: "pcrControl",
            PcrPid: "pcrPid",
            PmtInterval: "pmtInterval",
            PmtPid: "pmtPid",
            PrivateMetadataPid: "privateMetadataPid",
            ProgramNumber: "programNumber",
            PtsOffset: "ptsOffset",
            PtsOffsetMode: "ptsOffsetMode",
            Scte35Pid: "scte35Pid",
            Scte35Source: "scte35Source",
            TimedMetadata: "timedMetadata",
            TimedMetadataPid: "timedMetadataPid",
            TransportStreamId: "transportStreamId",
            VideoPid: "videoPid",
          }),
        ),
      ).annotate({ identifier: "M3u8Settings" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          AudioDuration: S.optional(S.String),
          ClapAtom: S.optional(S.String),
          CslgAtom: S.optional(S.String),
          Mpeg2FourCCControl: S.optional(S.String),
          PaddingControl: S.optional(S.String),
          Reference: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AudioDuration: "audioDuration",
            ClapAtom: "clapAtom",
            CslgAtom: "cslgAtom",
            Mpeg2FourCCControl: "mpeg2FourCCControl",
            PaddingControl: "paddingControl",
            Reference: "reference",
          }),
        ),
      ).annotate({ identifier: "MovSettings" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          AudioDuration: S.optional(S.String),
          C2paManifest: S.optional(S.String),
          CertificateSecret: S.optional(S.String),
          CslgAtom: S.optional(S.String),
          CttsVersion: S.optional(S.Number),
          FreeSpaceBox: S.optional(S.String),
          MoovPlacement: S.optional(S.String),
          Mp4MajorBrand: S.optional(S.String),
          SigningKmsKey: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AudioDuration: "audioDuration",
            C2paManifest: "c2paManifest",
            CertificateSecret: "certificateSecret",
            CslgAtom: "cslgAtom",
            CttsVersion: "cttsVersion",
            FreeSpaceBox: "freeSpaceBox",
            MoovPlacement: "moovPlacement",
            Mp4MajorBrand: "mp4MajorBrand",
            SigningKmsKey: "signingKmsKey",
          }),
        ),
      ).annotate({ identifier: "Mp4Settings" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          AccessibilityCaptionHints: S.optional(S.String),
          AudioDuration: S.optional(S.String),
          C2paManifest: S.optional(S.String),
          CaptionContainerType: S.optional(S.String),
          CertificateSecret: S.optional(S.String),
          KlvMetadata: S.optional(S.String),
          ManifestMetadataSignaling: S.optional(S.String),
          Scte35Esam: S.optional(S.String),
          Scte35Source: S.optional(S.String),
          SigningKmsKey: S.optional(S.String),
          TimedMetadata: S.optional(S.String),
          TimedMetadataBoxVersion: S.optional(S.String),
          TimedMetadataSchemeIdUri: S.optional(S.String),
          TimedMetadataValue: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AccessibilityCaptionHints: "accessibilityCaptionHints",
            AudioDuration: "audioDuration",
            C2paManifest: "c2paManifest",
            CaptionContainerType: "captionContainerType",
            CertificateSecret: "certificateSecret",
            KlvMetadata: "klvMetadata",
            ManifestMetadataSignaling: "manifestMetadataSignaling",
            Scte35Esam: "scte35Esam",
            Scte35Source: "scte35Source",
            SigningKmsKey: "signingKmsKey",
            TimedMetadata: "timedMetadata",
            TimedMetadataBoxVersion: "timedMetadataBoxVersion",
            TimedMetadataSchemeIdUri: "timedMetadataSchemeIdUri",
            TimedMetadataValue: "timedMetadataValue",
          }),
        ),
      ).annotate({ identifier: "MpdSettings" });
    case 15:
      return S.suspend(() =>
        S.Struct({ DurationMode: S.optional(S.String), MaxAncDataSize: S.optional(S.Number) }).pipe(
          S.encodeKeys({ DurationMode: "durationMode", MaxAncDataSize: "maxAncDataSize" }),
        ),
      ).annotate({ identifier: "MxfXavcProfileSettings" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          AfdSignaling: S.optional(S.String),
          Profile: S.optional(S.String),
          UncompressedAudioWrapping: S.optional(S.String),
          XavcProfileSettings: S.optional(__S(143, __c4, 15)),
        }).pipe(
          S.encodeKeys({
            AfdSignaling: "afdSignaling",
            Profile: "profile",
            UncompressedAudioWrapping: "uncompressedAudioWrapping",
            XavcProfileSettings: "xavcProfileSettings",
          }),
        ),
      ).annotate({ identifier: "MxfSettings" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          CmfcSettings: S.optional(__S(132, __c4, 4)),
          Container: S.optional(S.String),
          F4vSettings: S.optional(__S(133, __c4, 5)),
          M2tsSettings: S.optional(__S(138, __c4, 10)),
          M3u8Settings: S.optional(__S(139, __c4, 11)),
          MovSettings: S.optional(__S(140, __c4, 12)),
          Mp4Settings: S.optional(__S(141, __c4, 13)),
          MpdSettings: S.optional(__S(142, __c4, 14)),
          MxfSettings: S.optional(__S(144, __c4, 16)),
        }).pipe(
          S.encodeKeys({
            CmfcSettings: "cmfcSettings",
            Container: "container",
            F4vSettings: "f4vSettings",
            M2tsSettings: "m2tsSettings",
            M3u8Settings: "m3u8Settings",
            MovSettings: "movSettings",
            Mp4Settings: "mp4Settings",
            MpdSettings: "mpdSettings",
            MxfSettings: "mxfSettings",
          }),
        ),
      ).annotate({ identifier: "ContainerSettings" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          QvbrQualityLevel: S.optional(S.Number),
          QvbrQualityLevelFineTune: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            QvbrQualityLevel: "qvbrQualityLevel",
            QvbrQualityLevelFineTune: "qvbrQualityLevelFineTune",
          }),
        ),
      ).annotate({ identifier: "Av1QvbrSettings" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          AdaptiveQuantization: S.optional(S.String),
          BitDepth: S.optional(S.String),
          FilmGrainSynthesis: S.optional(S.String),
          FramerateControl: S.optional(S.String),
          FramerateConversionAlgorithm: S.optional(S.String),
          FramerateDenominator: S.optional(S.Number),
          FramerateNumerator: S.optional(S.Number),
          GopSize: S.optional(S.Number),
          MaxBitrate: S.optional(S.Number),
          NumberBFramesBetweenReferenceFrames: S.optional(S.Number),
          PerFrameMetrics: S.optional(__listOfFrameMetricType),
          QvbrSettings: S.optional(__S(146, __c4, 18)),
          RateControlMode: S.optional(S.String),
          Slices: S.optional(S.Number),
          SpatialAdaptiveQuantization: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AdaptiveQuantization: "adaptiveQuantization",
            BitDepth: "bitDepth",
            FilmGrainSynthesis: "filmGrainSynthesis",
            FramerateControl: "framerateControl",
            FramerateConversionAlgorithm: "framerateConversionAlgorithm",
            FramerateDenominator: "framerateDenominator",
            FramerateNumerator: "framerateNumerator",
            GopSize: "gopSize",
            MaxBitrate: "maxBitrate",
            NumberBFramesBetweenReferenceFrames: "numberBFramesBetweenReferenceFrames",
            PerFrameMetrics: "perFrameMetrics",
            QvbrSettings: "qvbrSettings",
            RateControlMode: "rateControlMode",
            Slices: "slices",
            SpatialAdaptiveQuantization: "spatialAdaptiveQuantization",
          }),
        ),
      ).annotate({ identifier: "Av1Settings" });
    case 20:
      return S.suspend(() =>
        S.Struct({ QualityTuningLevel: S.optional(S.String) }).pipe(
          S.encodeKeys({ QualityTuningLevel: "qualityTuningLevel" }),
        ),
      ).annotate({ identifier: "AvcIntraUhdSettings" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          AvcIntraClass: S.optional(S.String),
          AvcIntraUhdSettings: S.optional(__S(148, __c4, 20)),
          FramerateControl: S.optional(S.String),
          FramerateConversionAlgorithm: S.optional(S.String),
          FramerateDenominator: S.optional(S.Number),
          FramerateNumerator: S.optional(S.Number),
          InterlaceMode: S.optional(S.String),
          PerFrameMetrics: S.optional(__listOfFrameMetricType),
          ScanTypeConversionMode: S.optional(S.String),
          SlowPal: S.optional(S.String),
          Telecine: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AvcIntraClass: "avcIntraClass",
            AvcIntraUhdSettings: "avcIntraUhdSettings",
            FramerateControl: "framerateControl",
            FramerateConversionAlgorithm: "framerateConversionAlgorithm",
            FramerateDenominator: "framerateDenominator",
            FramerateNumerator: "framerateNumerator",
            InterlaceMode: "interlaceMode",
            PerFrameMetrics: "perFrameMetrics",
            ScanTypeConversionMode: "scanTypeConversionMode",
            SlowPal: "slowPal",
            Telecine: "telecine",
          }),
        ),
      ).annotate({ identifier: "AvcIntraSettings" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          FramerateDenominator: S.optional(S.Number),
          FramerateNumerator: S.optional(S.Number),
          MaxCaptures: S.optional(S.Number),
          Quality: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            FramerateDenominator: "framerateDenominator",
            FramerateNumerator: "framerateNumerator",
            MaxCaptures: "maxCaptures",
            Quality: "quality",
          }),
        ),
      ).annotate({ identifier: "FrameCaptureSettings" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          FramerateControl: S.optional(S.String),
          FramerateConversionAlgorithm: S.optional(S.String),
          FramerateDenominator: S.optional(S.Number),
          FramerateNumerator: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            FramerateControl: "framerateControl",
            FramerateConversionAlgorithm: "framerateConversionAlgorithm",
            FramerateDenominator: "framerateDenominator",
            FramerateNumerator: "framerateNumerator",
          }),
        ),
      ).annotate({ identifier: "GifSettings" });
    case 24:
      return S.suspend(() =>
        S.Struct({ Sharpening: S.optional(S.String), Strength: S.optional(S.String) }).pipe(
          S.encodeKeys({ Sharpening: "sharpening", Strength: "strength" }),
        ),
      ).annotate({ identifier: "BandwidthReductionFilter" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          MaxAverageBitrate: S.optional(S.Number),
          QvbrQualityLevel: S.optional(S.Number),
          QvbrQualityLevelFineTune: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            MaxAverageBitrate: "maxAverageBitrate",
            QvbrQualityLevel: "qvbrQualityLevel",
            QvbrQualityLevelFineTune: "qvbrQualityLevelFineTune",
          }),
        ),
      ).annotate({ identifier: "H264QvbrSettings" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          AdaptiveQuantization: S.optional(S.String),
          BandwidthReductionFilter: S.optional(__S(152, __c4, 24)),
          Bitrate: S.optional(S.Number),
          CodecLevel: S.optional(S.String),
          CodecProfile: S.optional(S.String),
          DynamicSubGop: S.optional(S.String),
          EndOfStreamMarkers: S.optional(S.String),
          EntropyEncoding: S.optional(S.String),
          ExplicitWeightedPrediction: S.optional(S.String),
          FieldEncoding: S.optional(S.String),
          FlickerAdaptiveQuantization: S.optional(S.String),
          FramerateControl: S.optional(S.String),
          FramerateConversionAlgorithm: S.optional(S.String),
          FramerateDenominator: S.optional(S.Number),
          FramerateNumerator: S.optional(S.Number),
          GopBReference: S.optional(S.String),
          GopClosedCadence: S.optional(S.Number),
          GopSize: S.optional(S.Number),
          GopSizeUnits: S.optional(S.String),
          HrdBufferFinalFillPercentage: S.optional(S.Number),
          HrdBufferInitialFillPercentage: S.optional(S.Number),
          HrdBufferSize: S.optional(S.Number),
          InterlaceMode: S.optional(S.String),
          MaxBitrate: S.optional(S.Number),
          MinIInterval: S.optional(S.Number),
          NumberBFramesBetweenReferenceFrames: S.optional(S.Number),
          NumberReferenceFrames: S.optional(S.Number),
          ParControl: S.optional(S.String),
          ParDenominator: S.optional(S.Number),
          ParNumerator: S.optional(S.Number),
          PerFrameMetrics: S.optional(__listOfFrameMetricType),
          QualityTuningLevel: S.optional(S.String),
          QvbrSettings: S.optional(__S(153, __c4, 25)),
          RateControlMode: S.optional(S.String),
          RepeatPps: S.optional(S.String),
          SaliencyAwareEncoding: S.optional(S.String),
          ScanTypeConversionMode: S.optional(S.String),
          SceneChangeDetect: S.optional(S.String),
          Slices: S.optional(S.Number),
          SlowPal: S.optional(S.String),
          Softness: S.optional(S.Number),
          SpatialAdaptiveQuantization: S.optional(S.String),
          Syntax: S.optional(S.String),
          Telecine: S.optional(S.String),
          TemporalAdaptiveQuantization: S.optional(S.String),
          UnregisteredSeiTimecode: S.optional(S.String),
          WriteMp4PackagingType: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AdaptiveQuantization: "adaptiveQuantization",
            BandwidthReductionFilter: "bandwidthReductionFilter",
            Bitrate: "bitrate",
            CodecLevel: "codecLevel",
            CodecProfile: "codecProfile",
            DynamicSubGop: "dynamicSubGop",
            EndOfStreamMarkers: "endOfStreamMarkers",
            EntropyEncoding: "entropyEncoding",
            ExplicitWeightedPrediction: "explicitWeightedPrediction",
            FieldEncoding: "fieldEncoding",
            FlickerAdaptiveQuantization: "flickerAdaptiveQuantization",
            FramerateControl: "framerateControl",
            FramerateConversionAlgorithm: "framerateConversionAlgorithm",
            FramerateDenominator: "framerateDenominator",
            FramerateNumerator: "framerateNumerator",
            GopBReference: "gopBReference",
            GopClosedCadence: "gopClosedCadence",
            GopSize: "gopSize",
            GopSizeUnits: "gopSizeUnits",
            HrdBufferFinalFillPercentage: "hrdBufferFinalFillPercentage",
            HrdBufferInitialFillPercentage: "hrdBufferInitialFillPercentage",
            HrdBufferSize: "hrdBufferSize",
            InterlaceMode: "interlaceMode",
            MaxBitrate: "maxBitrate",
            MinIInterval: "minIInterval",
            NumberBFramesBetweenReferenceFrames: "numberBFramesBetweenReferenceFrames",
            NumberReferenceFrames: "numberReferenceFrames",
            ParControl: "parControl",
            ParDenominator: "parDenominator",
            ParNumerator: "parNumerator",
            PerFrameMetrics: "perFrameMetrics",
            QualityTuningLevel: "qualityTuningLevel",
            QvbrSettings: "qvbrSettings",
            RateControlMode: "rateControlMode",
            RepeatPps: "repeatPps",
            SaliencyAwareEncoding: "saliencyAwareEncoding",
            ScanTypeConversionMode: "scanTypeConversionMode",
            SceneChangeDetect: "sceneChangeDetect",
            Slices: "slices",
            SlowPal: "slowPal",
            Softness: "softness",
            SpatialAdaptiveQuantization: "spatialAdaptiveQuantization",
            Syntax: "syntax",
            Telecine: "telecine",
            TemporalAdaptiveQuantization: "temporalAdaptiveQuantization",
            UnregisteredSeiTimecode: "unregisteredSeiTimecode",
            WriteMp4PackagingType: "writeMp4PackagingType",
          }),
        ),
      ).annotate({ identifier: "H264Settings" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          AdaptiveQuantization: S.optional(S.String),
          AlternateTransferFunctionSei: S.optional(S.String),
          BandwidthReductionFilter: S.optional(__S(152, __c4, 24)),
          Bitrate: S.optional(S.Number),
          CodecLevel: S.optional(S.String),
          CodecProfile: S.optional(S.String),
          Deblocking: S.optional(S.String),
          DynamicSubGop: S.optional(S.String),
          EndOfStreamMarkers: S.optional(S.String),
          FlickerAdaptiveQuantization: S.optional(S.String),
          FramerateControl: S.optional(S.String),
          FramerateConversionAlgorithm: S.optional(S.String),
          FramerateDenominator: S.optional(S.Number),
          FramerateNumerator: S.optional(S.Number),
          GopBReference: S.optional(S.String),
          GopClosedCadence: S.optional(S.Number),
          GopSize: S.optional(S.Number),
          GopSizeUnits: S.optional(S.String),
          HrdBufferFinalFillPercentage: S.optional(S.Number),
          HrdBufferInitialFillPercentage: S.optional(S.Number),
          HrdBufferSize: S.optional(S.Number),
          InterlaceMode: S.optional(S.String),
          MaxBitrate: S.optional(S.Number),
          MinIInterval: S.optional(S.Number),
          MvOverPictureBoundaries: S.optional(S.String),
          MvTemporalPredictor: S.optional(S.String),
          NumberBFramesBetweenReferenceFrames: S.optional(S.Number),
          NumberReferenceFrames: S.optional(S.Number),
          ParControl: S.optional(S.String),
          ParDenominator: S.optional(S.Number),
          ParNumerator: S.optional(S.Number),
          PerFrameMetrics: S.optional(__listOfFrameMetricType),
          QualityTuningLevel: S.optional(S.String),
          QvbrSettings: S.optional(__S(153, __c4, 25)),
          RateControlMode: S.optional(S.String),
          SampleAdaptiveOffsetFilterMode: S.optional(S.String),
          ScanTypeConversionMode: S.optional(S.String),
          SceneChangeDetect: S.optional(S.String),
          Slices: S.optional(S.Number),
          SlowPal: S.optional(S.String),
          SpatialAdaptiveQuantization: S.optional(S.String),
          Telecine: S.optional(S.String),
          TemporalAdaptiveQuantization: S.optional(S.String),
          TemporalIds: S.optional(S.String),
          TileHeight: S.optional(S.Number),
          TilePadding: S.optional(S.String),
          TileWidth: S.optional(S.Number),
          Tiles: S.optional(S.String),
          TreeBlockSize: S.optional(S.String),
          UnregisteredSeiTimecode: S.optional(S.String),
          WriteMp4PackagingType: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AdaptiveQuantization: "adaptiveQuantization",
            AlternateTransferFunctionSei: "alternateTransferFunctionSei",
            BandwidthReductionFilter: "bandwidthReductionFilter",
            Bitrate: "bitrate",
            CodecLevel: "codecLevel",
            CodecProfile: "codecProfile",
            Deblocking: "deblocking",
            DynamicSubGop: "dynamicSubGop",
            EndOfStreamMarkers: "endOfStreamMarkers",
            FlickerAdaptiveQuantization: "flickerAdaptiveQuantization",
            FramerateControl: "framerateControl",
            FramerateConversionAlgorithm: "framerateConversionAlgorithm",
            FramerateDenominator: "framerateDenominator",
            FramerateNumerator: "framerateNumerator",
            GopBReference: "gopBReference",
            GopClosedCadence: "gopClosedCadence",
            GopSize: "gopSize",
            GopSizeUnits: "gopSizeUnits",
            HrdBufferFinalFillPercentage: "hrdBufferFinalFillPercentage",
            HrdBufferInitialFillPercentage: "hrdBufferInitialFillPercentage",
            HrdBufferSize: "hrdBufferSize",
            InterlaceMode: "interlaceMode",
            MaxBitrate: "maxBitrate",
            MinIInterval: "minIInterval",
            MvOverPictureBoundaries: "mvOverPictureBoundaries",
            MvTemporalPredictor: "mvTemporalPredictor",
            NumberBFramesBetweenReferenceFrames: "numberBFramesBetweenReferenceFrames",
            NumberReferenceFrames: "numberReferenceFrames",
            ParControl: "parControl",
            ParDenominator: "parDenominator",
            ParNumerator: "parNumerator",
            PerFrameMetrics: "perFrameMetrics",
            QualityTuningLevel: "qualityTuningLevel",
            QvbrSettings: "qvbrSettings",
            RateControlMode: "rateControlMode",
            SampleAdaptiveOffsetFilterMode: "sampleAdaptiveOffsetFilterMode",
            ScanTypeConversionMode: "scanTypeConversionMode",
            SceneChangeDetect: "sceneChangeDetect",
            Slices: "slices",
            SlowPal: "slowPal",
            SpatialAdaptiveQuantization: "spatialAdaptiveQuantization",
            Telecine: "telecine",
            TemporalAdaptiveQuantization: "temporalAdaptiveQuantization",
            TemporalIds: "temporalIds",
            TileHeight: "tileHeight",
            TilePadding: "tilePadding",
            TileWidth: "tileWidth",
            Tiles: "tiles",
            TreeBlockSize: "treeBlockSize",
            UnregisteredSeiTimecode: "unregisteredSeiTimecode",
            WriteMp4PackagingType: "writeMp4PackagingType",
          }),
        ),
      ).annotate({ identifier: "H265Settings" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          AdaptiveQuantization: S.optional(S.String),
          Bitrate: S.optional(S.Number),
          CodecLevel: S.optional(S.String),
          CodecProfile: S.optional(S.String),
          DynamicSubGop: S.optional(S.String),
          FramerateControl: S.optional(S.String),
          FramerateConversionAlgorithm: S.optional(S.String),
          FramerateDenominator: S.optional(S.Number),
          FramerateNumerator: S.optional(S.Number),
          GopClosedCadence: S.optional(S.Number),
          GopSize: S.optional(S.Number),
          GopSizeUnits: S.optional(S.String),
          HrdBufferFinalFillPercentage: S.optional(S.Number),
          HrdBufferInitialFillPercentage: S.optional(S.Number),
          HrdBufferSize: S.optional(S.Number),
          InterlaceMode: S.optional(S.String),
          IntraDcPrecision: S.optional(S.String),
          MaxBitrate: S.optional(S.Number),
          MinIInterval: S.optional(S.Number),
          NumberBFramesBetweenReferenceFrames: S.optional(S.Number),
          ParControl: S.optional(S.String),
          ParDenominator: S.optional(S.Number),
          ParNumerator: S.optional(S.Number),
          PerFrameMetrics: S.optional(__listOfFrameMetricType),
          QualityTuningLevel: S.optional(S.String),
          RateControlMode: S.optional(S.String),
          ScanTypeConversionMode: S.optional(S.String),
          SceneChangeDetect: S.optional(S.String),
          SlowPal: S.optional(S.String),
          Softness: S.optional(S.Number),
          SpatialAdaptiveQuantization: S.optional(S.String),
          Syntax: S.optional(S.String),
          Telecine: S.optional(S.String),
          TemporalAdaptiveQuantization: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AdaptiveQuantization: "adaptiveQuantization",
            Bitrate: "bitrate",
            CodecLevel: "codecLevel",
            CodecProfile: "codecProfile",
            DynamicSubGop: "dynamicSubGop",
            FramerateControl: "framerateControl",
            FramerateConversionAlgorithm: "framerateConversionAlgorithm",
            FramerateDenominator: "framerateDenominator",
            FramerateNumerator: "framerateNumerator",
            GopClosedCadence: "gopClosedCadence",
            GopSize: "gopSize",
            GopSizeUnits: "gopSizeUnits",
            HrdBufferFinalFillPercentage: "hrdBufferFinalFillPercentage",
            HrdBufferInitialFillPercentage: "hrdBufferInitialFillPercentage",
            HrdBufferSize: "hrdBufferSize",
            InterlaceMode: "interlaceMode",
            IntraDcPrecision: "intraDcPrecision",
            MaxBitrate: "maxBitrate",
            MinIInterval: "minIInterval",
            NumberBFramesBetweenReferenceFrames: "numberBFramesBetweenReferenceFrames",
            ParControl: "parControl",
            ParDenominator: "parDenominator",
            ParNumerator: "parNumerator",
            PerFrameMetrics: "perFrameMetrics",
            QualityTuningLevel: "qualityTuningLevel",
            RateControlMode: "rateControlMode",
            ScanTypeConversionMode: "scanTypeConversionMode",
            SceneChangeDetect: "sceneChangeDetect",
            SlowPal: "slowPal",
            Softness: "softness",
            SpatialAdaptiveQuantization: "spatialAdaptiveQuantization",
            Syntax: "syntax",
            Telecine: "telecine",
            TemporalAdaptiveQuantization: "temporalAdaptiveQuantization",
          }),
        ),
      ).annotate({ identifier: "Mpeg2Settings" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          FrameControl: S.optional(S.String),
          GopsPerSegment: S.optional(S.Number),
          SegmentationMode: S.optional(S.String),
          VideoSelectorMode: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            FrameControl: "frameControl",
            GopsPerSegment: "gopsPerSegment",
            SegmentationMode: "segmentationMode",
            VideoSelectorMode: "videoSelectorMode",
          }),
        ),
      ).annotate({ identifier: "PassthroughSettings" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          ChromaSampling: S.optional(S.String),
          CodecProfile: S.optional(S.String),
          FramerateControl: S.optional(S.String),
          FramerateConversionAlgorithm: S.optional(S.String),
          FramerateDenominator: S.optional(S.Number),
          FramerateNumerator: S.optional(S.Number),
          InterlaceMode: S.optional(S.String),
          ParControl: S.optional(S.String),
          ParDenominator: S.optional(S.Number),
          ParNumerator: S.optional(S.Number),
          PerFrameMetrics: S.optional(__listOfFrameMetricType),
          ScanTypeConversionMode: S.optional(S.String),
          SlowPal: S.optional(S.String),
          Telecine: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ChromaSampling: "chromaSampling",
            CodecProfile: "codecProfile",
            FramerateControl: "framerateControl",
            FramerateConversionAlgorithm: "framerateConversionAlgorithm",
            FramerateDenominator: "framerateDenominator",
            FramerateNumerator: "framerateNumerator",
            InterlaceMode: "interlaceMode",
            ParControl: "parControl",
            ParDenominator: "parDenominator",
            ParNumerator: "parNumerator",
            PerFrameMetrics: "perFrameMetrics",
            ScanTypeConversionMode: "scanTypeConversionMode",
            SlowPal: "slowPal",
            Telecine: "telecine",
          }),
        ),
      ).annotate({ identifier: "ProresSettings" });
    case 31:
      return S.suspend(() =>
        S.Struct({
          Fourcc: S.optional(S.String),
          FramerateControl: S.optional(S.String),
          FramerateConversionAlgorithm: S.optional(S.String),
          FramerateDenominator: S.optional(S.Number),
          FramerateNumerator: S.optional(S.Number),
          InterlaceMode: S.optional(S.String),
          ScanTypeConversionMode: S.optional(S.String),
          SlowPal: S.optional(S.String),
          Telecine: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Fourcc: "fourcc",
            FramerateControl: "framerateControl",
            FramerateConversionAlgorithm: "framerateConversionAlgorithm",
            FramerateDenominator: "framerateDenominator",
            FramerateNumerator: "framerateNumerator",
            InterlaceMode: "interlaceMode",
            ScanTypeConversionMode: "scanTypeConversionMode",
            SlowPal: "slowPal",
            Telecine: "telecine",
          }),
        ),
      ).annotate({ identifier: "UncompressedSettings" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FramerateControl: S.optional(S.String),
          FramerateConversionAlgorithm: S.optional(S.String),
          FramerateDenominator: S.optional(S.Number),
          FramerateNumerator: S.optional(S.Number),
          InterlaceMode: S.optional(S.String),
          ScanTypeConversionMode: S.optional(S.String),
          SlowPal: S.optional(S.String),
          Telecine: S.optional(S.String),
          Vc3Class: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            FramerateControl: "framerateControl",
            FramerateConversionAlgorithm: "framerateConversionAlgorithm",
            FramerateDenominator: "framerateDenominator",
            FramerateNumerator: "framerateNumerator",
            InterlaceMode: "interlaceMode",
            ScanTypeConversionMode: "scanTypeConversionMode",
            SlowPal: "slowPal",
            Telecine: "telecine",
            Vc3Class: "vc3Class",
          }),
        ),
      ).annotate({ identifier: "Vc3Settings" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Bitrate: S.optional(S.Number),
          FramerateControl: S.optional(S.String),
          FramerateConversionAlgorithm: S.optional(S.String),
          FramerateDenominator: S.optional(S.Number),
          FramerateNumerator: S.optional(S.Number),
          GopSize: S.optional(S.Number),
          HrdBufferSize: S.optional(S.Number),
          MaxBitrate: S.optional(S.Number),
          ParControl: S.optional(S.String),
          ParDenominator: S.optional(S.Number),
          ParNumerator: S.optional(S.Number),
          QualityTuningLevel: S.optional(S.String),
          RateControlMode: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Bitrate: "bitrate",
            FramerateControl: "framerateControl",
            FramerateConversionAlgorithm: "framerateConversionAlgorithm",
            FramerateDenominator: "framerateDenominator",
            FramerateNumerator: "framerateNumerator",
            GopSize: "gopSize",
            HrdBufferSize: "hrdBufferSize",
            MaxBitrate: "maxBitrate",
            ParControl: "parControl",
            ParDenominator: "parDenominator",
            ParNumerator: "parNumerator",
            QualityTuningLevel: "qualityTuningLevel",
            RateControlMode: "rateControlMode",
          }),
        ),
      ).annotate({ identifier: "Vp8Settings" });
    case 2:
      return S.suspend(() =>
        S.Struct({ XavcClass: S.optional(S.String) }).pipe(
          S.encodeKeys({ XavcClass: "xavcClass" }),
        ),
      ).annotate({ identifier: "Xavc4kIntraCbgProfileSettings" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          BitrateClass: S.optional(S.String),
          CodecProfile: S.optional(S.String),
          FlickerAdaptiveQuantization: S.optional(S.String),
          GopBReference: S.optional(S.String),
          GopClosedCadence: S.optional(S.Number),
          HrdBufferSize: S.optional(S.Number),
          QualityTuningLevel: S.optional(S.String),
          Slices: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            BitrateClass: "bitrateClass",
            CodecProfile: "codecProfile",
            FlickerAdaptiveQuantization: "flickerAdaptiveQuantization",
            GopBReference: "gopBReference",
            GopClosedCadence: "gopClosedCadence",
            HrdBufferSize: "hrdBufferSize",
            QualityTuningLevel: "qualityTuningLevel",
            Slices: "slices",
          }),
        ),
      ).annotate({ identifier: "Xavc4kProfileSettings" });
    case 4:
      return S.suspend(() =>
        S.Struct({ InterlaceMode: S.optional(S.String), XavcClass: S.optional(S.String) }).pipe(
          S.encodeKeys({ InterlaceMode: "interlaceMode", XavcClass: "xavcClass" }),
        ),
      ).annotate({ identifier: "XavcHdIntraCbgProfileSettings" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          BitrateClass: S.optional(S.String),
          FlickerAdaptiveQuantization: S.optional(S.String),
          GopBReference: S.optional(S.String),
          GopClosedCadence: S.optional(S.Number),
          HrdBufferSize: S.optional(S.Number),
          InterlaceMode: S.optional(S.String),
          QualityTuningLevel: S.optional(S.String),
          Slices: S.optional(S.Number),
          Telecine: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            BitrateClass: "bitrateClass",
            FlickerAdaptiveQuantization: "flickerAdaptiveQuantization",
            GopBReference: "gopBReference",
            GopClosedCadence: "gopClosedCadence",
            HrdBufferSize: "hrdBufferSize",
            InterlaceMode: "interlaceMode",
            QualityTuningLevel: "qualityTuningLevel",
            Slices: "slices",
            Telecine: "telecine",
          }),
        ),
      ).annotate({ identifier: "XavcHdProfileSettings" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          AdaptiveQuantization: S.optional(S.String),
          EntropyEncoding: S.optional(S.String),
          FramerateControl: S.optional(S.String),
          FramerateConversionAlgorithm: S.optional(S.String),
          FramerateDenominator: S.optional(S.Number),
          FramerateNumerator: S.optional(S.Number),
          PerFrameMetrics: S.optional(__listOfFrameMetricType),
          Profile: S.optional(S.String),
          SlowPal: S.optional(S.String),
          Softness: S.optional(S.Number),
          SpatialAdaptiveQuantization: S.optional(S.String),
          TemporalAdaptiveQuantization: S.optional(S.String),
          Xavc4kIntraCbgProfileSettings: S.optional(__S(162, __c5, 2)),
          Xavc4kIntraVbrProfileSettings: S.optional(__S(162, __c5, 2)),
          Xavc4kProfileSettings: S.optional(__S(163, __c5, 3)),
          XavcHdIntraCbgProfileSettings: S.optional(__S(164, __c5, 4)),
          XavcHdProfileSettings: S.optional(__S(165, __c5, 5)),
        }).pipe(
          S.encodeKeys({
            AdaptiveQuantization: "adaptiveQuantization",
            EntropyEncoding: "entropyEncoding",
            FramerateControl: "framerateControl",
            FramerateConversionAlgorithm: "framerateConversionAlgorithm",
            FramerateDenominator: "framerateDenominator",
            FramerateNumerator: "framerateNumerator",
            PerFrameMetrics: "perFrameMetrics",
            Profile: "profile",
            SlowPal: "slowPal",
            Softness: "softness",
            SpatialAdaptiveQuantization: "spatialAdaptiveQuantization",
            TemporalAdaptiveQuantization: "temporalAdaptiveQuantization",
            Xavc4kIntraCbgProfileSettings: "xavc4kIntraCbgProfileSettings",
            Xavc4kIntraVbrProfileSettings: "xavc4kIntraVbrProfileSettings",
            Xavc4kProfileSettings: "xavc4kProfileSettings",
            XavcHdIntraCbgProfileSettings: "xavcHdIntraCbgProfileSettings",
            XavcHdProfileSettings: "xavcHdProfileSettings",
          }),
        ),
      ).annotate({ identifier: "XavcSettings" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Av1Settings: S.optional(__S(147, __c4, 19)),
          AvcIntraSettings: S.optional(__S(149, __c4, 21)),
          Codec: S.optional(S.String),
          FrameCaptureSettings: S.optional(__S(150, __c4, 22)),
          GifSettings: S.optional(__S(151, __c4, 23)),
          H264Settings: S.optional(__S(154, __c4, 26)),
          H265Settings: S.optional(__S(155, __c4, 27)),
          Mpeg2Settings: S.optional(__S(156, __c4, 28)),
          PassthroughSettings: S.optional(__S(157, __c4, 29)),
          ProresSettings: S.optional(__S(158, __c4, 30)),
          UncompressedSettings: S.optional(__S(159, __c4, 31)),
          Vc3Settings: S.optional(__S(160, __c5, 0)),
          Vp8Settings: S.optional(__S(161, __c5, 1)),
          Vp9Settings: S.optional(__S(161, __c5, 1)),
          XavcSettings: S.optional(__S(166, __c5, 6)),
        }).pipe(
          S.encodeKeys({
            Av1Settings: "av1Settings",
            AvcIntraSettings: "avcIntraSettings",
            Codec: "codec",
            FrameCaptureSettings: "frameCaptureSettings",
            GifSettings: "gifSettings",
            H264Settings: "h264Settings",
            H265Settings: "h265Settings",
            Mpeg2Settings: "mpeg2Settings",
            PassthroughSettings: "passthroughSettings",
            ProresSettings: "proresSettings",
            UncompressedSettings: "uncompressedSettings",
            Vc3Settings: "vc3Settings",
            Vp8Settings: "vp8Settings",
            Vp9Settings: "vp9Settings",
            XavcSettings: "xavcSettings",
          }),
        ),
      ).annotate({ identifier: "VideoCodecSettings" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          MaximumRGBTolerance: S.optional(S.Number),
          MaximumYUV: S.optional(S.Number),
          MinimumRGBTolerance: S.optional(S.Number),
          MinimumYUV: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            MaximumRGBTolerance: "maximumRGBTolerance",
            MaximumYUV: "maximumYUV",
            MinimumRGBTolerance: "minimumRGBTolerance",
            MinimumYUV: "minimumYUV",
          }),
        ),
      ).annotate({ identifier: "ClipLimits" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          Brightness: S.optional(S.Number),
          ClipLimits: S.optional(__S(168, __c5, 8)),
          ColorSpaceConversion: S.optional(S.String),
          Contrast: S.optional(S.Number),
          Hdr10Metadata: S.optional(__S(104, __c3, 8)),
          HdrToSdrToneMapper: S.optional(S.String),
          Hue: S.optional(S.Number),
          MaxLuminance: S.optional(S.Number),
          SampleRangeConversion: S.optional(S.String),
          Saturation: S.optional(S.Number),
          SdrReferenceWhiteLevel: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            Brightness: "brightness",
            ClipLimits: "clipLimits",
            ColorSpaceConversion: "colorSpaceConversion",
            Contrast: "contrast",
            Hdr10Metadata: "hdr10Metadata",
            HdrToSdrToneMapper: "hdrToSdrToneMapper",
            Hue: "hue",
            MaxLuminance: "maxLuminance",
            SampleRangeConversion: "sampleRangeConversion",
            Saturation: "saturation",
            SdrReferenceWhiteLevel: "sdrReferenceWhiteLevel",
          }),
        ),
      ).annotate({ identifier: "ColorCorrector" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          Algorithm: S.optional(S.String),
          Control: S.optional(S.String),
          Mode: S.optional(S.String),
        }).pipe(S.encodeKeys({ Algorithm: "algorithm", Control: "control", Mode: "mode" })),
      ).annotate({ identifier: "Deinterlacer" });
    case 11:
      return S.suspend(() =>
        S.Struct({ MaxCll: S.optional(S.Number), MaxFall: S.optional(S.Number) }).pipe(
          S.encodeKeys({ MaxCll: "maxCll", MaxFall: "maxFall" }),
        ),
      ).annotate({ identifier: "DolbyVisionLevel6Metadata" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          Compatibility: S.optional(S.String),
          L6Metadata: S.optional(__S(171, __c5, 11)),
          L6Mode: S.optional(S.String),
          Mapping: S.optional(S.String),
          Profile: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Compatibility: "compatibility",
            L6Metadata: "l6Metadata",
            L6Mode: "l6Mode",
            Mapping: "mapping",
            Profile: "profile",
          }),
        ),
      ).annotate({ identifier: "DolbyVision" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          IntegerDurationMaximumCompressionDenominator: S.optional(S.Number),
          IntegerDurationMaximumCompressionNumerator: S.optional(S.Number),
          IntegerDurationTrimThresholdMilliseconds: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            IntegerDurationMaximumCompressionDenominator:
              "integerDurationMaximumCompressionDenominator",
            IntegerDurationMaximumCompressionNumerator:
              "integerDurationMaximumCompressionNumerator",
            IntegerDurationTrimThresholdMilliseconds: "integerDurationTrimThresholdMilliseconds",
          }),
        ),
      ).annotate({ identifier: "DurationControl" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          MasteringMonitorNits: S.optional(S.Number),
          TargetMonitorNits: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            MasteringMonitorNits: "masteringMonitorNits",
            TargetMonitorNits: "targetMonitorNits",
          }),
        ),
      ).annotate({ identifier: "Hdr10Plus" });
    case 15:
      return S.suspend(() =>
        S.Struct({ Strength: S.optional(S.Number) }).pipe(S.encodeKeys({ Strength: "strength" })),
      ).annotate({ identifier: "NoiseReducerFilterSettings" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          PostFilterSharpenStrength: S.optional(S.Number),
          Speed: S.optional(S.Number),
          Strength: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            PostFilterSharpenStrength: "postFilterSharpenStrength",
            Speed: "speed",
            Strength: "strength",
          }),
        ),
      ).annotate({ identifier: "NoiseReducerSpatialFilterSettings" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          AggressiveMode: S.optional(S.Number),
          PostTemporalSharpening: S.optional(S.String),
          PostTemporalSharpeningStrength: S.optional(S.String),
          Speed: S.optional(S.Number),
          Strength: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            AggressiveMode: "aggressiveMode",
            PostTemporalSharpening: "postTemporalSharpening",
            PostTemporalSharpeningStrength: "postTemporalSharpeningStrength",
            Speed: "speed",
            Strength: "strength",
          }),
        ),
      ).annotate({ identifier: "NoiseReducerTemporalFilterSettings" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          Filter: S.optional(S.String),
          FilterSettings: S.optional(__S(175, __c5, 15)),
          SpatialFilterSettings: S.optional(__S(176, __c5, 16)),
          TemporalFilterSettings: S.optional(__S(177, __c5, 17)),
        }).pipe(
          S.encodeKeys({
            Filter: "filter",
            FilterSettings: "filterSettings",
            SpatialFilterSettings: "spatialFilterSettings",
            TemporalFilterSettings: "temporalFilterSettings",
          }),
        ),
      ).annotate({ identifier: "NoiseReducer" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          License: S.optional(S.String),
          Payload: S.optional(S.Number),
          Preset: S.optional(S.String),
          Strength: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            License: "license",
            Payload: "payload",
            Preset: "preset",
            Strength: "strength",
          }),
        ),
      ).annotate({ identifier: "NexGuardFileMarkerSettings" });
    case 20:
      return S.suspend(() =>
        S.Struct({ NexguardFileMarkerSettings: S.optional(__S(179, __c5, 19)) }).pipe(
          S.encodeKeys({ NexguardFileMarkerSettings: "nexguardFileMarkerSettings" }),
        ),
      ).annotate({ identifier: "PartnerWatermarking" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          FontSize: S.optional(S.Number),
          Position: S.optional(S.String),
          Prefix: S.optional(S.String),
        }).pipe(S.encodeKeys({ FontSize: "fontSize", Position: "position", Prefix: "prefix" })),
      ).annotate({ identifier: "TimecodeBurnin" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          ColorCorrector: S.optional(__S(169, __c5, 9)),
          Deinterlacer: S.optional(__S(170, __c5, 10)),
          DolbyVision: S.optional(__S(172, __c5, 12)),
          DurationControl: S.optional(__S(173, __c5, 13)),
          Hdr10Plus: S.optional(__S(174, __c5, 14)),
          ImageInserter: S.optional(__S(103, __c3, 7)),
          NoiseReducer: S.optional(__S(178, __c5, 18)),
          PartnerWatermarking: S.optional(__S(180, __c5, 20)),
          TimecodeBurnin: S.optional(__S(181, __c5, 21)),
        }).pipe(
          S.encodeKeys({
            ColorCorrector: "colorCorrector",
            Deinterlacer: "deinterlacer",
            DolbyVision: "dolbyVision",
            DurationControl: "durationControl",
            Hdr10Plus: "hdr10Plus",
            ImageInserter: "imageInserter",
            NoiseReducer: "noiseReducer",
            PartnerWatermarking: "partnerWatermarking",
            TimecodeBurnin: "timecodeBurnin",
          }),
        ),
      ).annotate({ identifier: "VideoPreprocessor" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          AfdSignaling: S.optional(S.String),
          AntiAlias: S.optional(S.String),
          ChromaPositionMode: S.optional(S.String),
          CodecSettings: S.optional(__S(167, __c5, 7)),
          ColorMetadata: S.optional(S.String),
          Crop: S.optional(__S(100, __c3, 4)),
          DropFrameTimecode: S.optional(S.String),
          FixedAfd: S.optional(S.Number),
          Height: S.optional(S.Number),
          Position: S.optional(__S(100, __c3, 4)),
          RespondToAfd: S.optional(S.String),
          ScalingBehavior: S.optional(S.String),
          Sharpness: S.optional(S.Number),
          TimecodeInsertion: S.optional(S.String),
          TimecodeTrack: S.optional(S.String),
          VideoPreprocessors: S.optional(__S(182, __c5, 22)),
          Width: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            AfdSignaling: "afdSignaling",
            AntiAlias: "antiAlias",
            ChromaPositionMode: "chromaPositionMode",
            CodecSettings: "codecSettings",
            ColorMetadata: "colorMetadata",
            Crop: "crop",
            DropFrameTimecode: "dropFrameTimecode",
            FixedAfd: "fixedAfd",
            Height: "height",
            Position: "position",
            RespondToAfd: "respondToAfd",
            ScalingBehavior: "scalingBehavior",
            Sharpness: "sharpness",
            TimecodeInsertion: "timecodeInsertion",
            TimecodeTrack: "timecodeTrack",
            VideoPreprocessors: "videoPreprocessors",
            Width: "width",
          }),
        ),
      ).annotate({ identifier: "VideoDescription" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Mode: S.optional(S.String) }).pipe(S.encodeKeys({ Mode: "mode" })),
      ).annotate({ identifier: "AccelerationSettings" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Priority: S.optional(S.Number),
          Queue: S.optional(S.String),
          WaitMinutes: S.optional(S.Number),
        }).pipe(S.encodeKeys({ Priority: "priority", Queue: "queue", WaitMinutes: "waitMinutes" })),
      ).annotate({ identifier: "HopDestination" });
    case 2:
      return S.Array(__S(225, __c7, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ AvailBlankingImage: S.optional(S.String) }).pipe(
          S.encodeKeys({ AvailBlankingImage: "availBlankingImage" }),
        ),
      ).annotate({ identifier: "AvailBlanking" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          FileInput: S.optional(S.String),
          InputColorSpace: S.optional(S.String),
          InputMasteringLuminance: S.optional(S.Number),
          OutputColorSpace: S.optional(S.String),
          OutputMasteringLuminance: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            FileInput: "fileInput",
            InputColorSpace: "inputColorSpace",
            InputMasteringLuminance: "inputMasteringLuminance",
            OutputColorSpace: "outputColorSpace",
            OutputMasteringLuminance: "outputMasteringLuminance",
          }),
        ),
      ).annotate({ identifier: "ColorConversion3DLUTSetting" });
    case 5:
      return S.Array(__S(228, __c7, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ MccXml: S.optional(S.String) }).pipe(S.encodeKeys({ MccXml: "mccXml" })),
      ).annotate({ identifier: "EsamManifestConfirmConditionNotification" });
    case 7:
      return S.suspend(() =>
        S.Struct({ SccXml: S.optional(S.String) }).pipe(S.encodeKeys({ SccXml: "sccXml" })),
      ).annotate({ identifier: "EsamSignalProcessingNotification" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          ManifestConfirmConditionNotification: S.optional(__S(230, __c7, 6)),
          ResponseSignalPreroll: S.optional(S.Number),
          SignalProcessingNotification: S.optional(__S(231, __c7, 7)),
        }).pipe(
          S.encodeKeys({
            ManifestConfirmConditionNotification: "manifestConfirmConditionNotification",
            ResponseSignalPreroll: "responseSignalPreroll",
            SignalProcessingNotification: "signalProcessingNotification",
          }),
        ),
      ).annotate({ identifier: "EsamSettings" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          CopyProtectionAction: S.optional(S.String),
          VchipAction: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            CopyProtectionAction: "copyProtectionAction",
            VchipAction: "vchipAction",
          }),
        ),
      ).annotate({ identifier: "ExtendedDataServices" });
    case 10:
      return S.suspend(() =>
        S.Struct({ AddTexture: S.optional(S.String), Sharpening: S.optional(S.String) }).pipe(
          S.encodeKeys({ AddTexture: "addTexture", Sharpening: "sharpening" }),
        ),
      ).annotate({ identifier: "AdvancedInputFilterSettings" });
    case 11:
      return S.suspend(() =>
        S.Struct({ AudioSelectorNames: S.optional(__listOf__stringMin1) }).pipe(
          S.encodeKeys({ AudioSelectorNames: "audioSelectorNames" }),
        ),
      ).annotate({ identifier: "AudioSelectorGroup" });
    case 12:
      return S.Record(S.String, /*@__PURE__*/ __S(235, __c7, 11).pipe(S.optional));
    case 13:
      return S.suspend(() =>
        S.Struct({
          RenditionGroupId: S.optional(S.String),
          RenditionLanguageCode: S.optional(S.String),
          RenditionName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            RenditionGroupId: "renditionGroupId",
            RenditionLanguageCode: "renditionLanguageCode",
            RenditionName: "renditionName",
          }),
        ),
      ).annotate({ identifier: "HlsRenditionGroupSettings" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          AudioDurationCorrection: S.optional(S.String),
          CustomLanguageCode: S.optional(S.String),
          DefaultSelection: S.optional(S.String),
          ExternalAudioFileInput: S.optional(S.String),
          HlsRenditionGroupSettings: S.optional(__S(237, __c7, 13)),
          LanguageCode: S.optional(S.String),
          Offset: S.optional(S.Number),
          Pids: S.optional(__listOf__integerMin1Max2147483647),
          ProgramSelection: S.optional(S.Number),
          RemixSettings: S.optional(__S(99, __c3, 3)),
          SelectorType: S.optional(S.String),
          Smpte337Passthrough: S.optional(S.String),
          Streams: S.optional(__listOf__integerMin1Max2147483647),
          Tracks: S.optional(__listOf__integerMin1Max2147483647),
        }).pipe(
          S.encodeKeys({
            AudioDurationCorrection: "audioDurationCorrection",
            CustomLanguageCode: "customLanguageCode",
            DefaultSelection: "defaultSelection",
            ExternalAudioFileInput: "externalAudioFileInput",
            HlsRenditionGroupSettings: "hlsRenditionGroupSettings",
            LanguageCode: "languageCode",
            Offset: "offset",
            Pids: "pids",
            ProgramSelection: "programSelection",
            RemixSettings: "remixSettings",
            SelectorType: "selectorType",
            Smpte337Passthrough: "smpte337Passthrough",
            Streams: "streams",
            Tracks: "tracks",
          }),
        ),
      ).annotate({ identifier: "AudioSelector" });
    case 15:
      return S.Record(S.String, /*@__PURE__*/ __S(238, __c7, 14).pipe(S.optional));
    case 16:
      return S.suspend(() =>
        S.Struct({
          Convert608To708: S.optional(S.String),
          SourceAncillaryChannelNumber: S.optional(S.Number),
          TerminateCaptions: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Convert608To708: "convert608To708",
            SourceAncillaryChannelNumber: "sourceAncillaryChannelNumber",
            TerminateCaptions: "terminateCaptions",
          }),
        ),
      ).annotate({ identifier: "AncillarySourceSettings" });
    case 17:
      return S.suspend(() =>
        S.Struct({ Pid: S.optional(S.Number) }).pipe(S.encodeKeys({ Pid: "pid" })),
      ).annotate({ identifier: "DvbSubSourceSettings" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          Convert608To708: S.optional(S.String),
          Source608ChannelNumber: S.optional(S.Number),
          Source608TrackNumber: S.optional(S.Number),
          TerminateCaptions: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Convert608To708: "convert608To708",
            Source608ChannelNumber: "source608ChannelNumber",
            Source608TrackNumber: "source608TrackNumber",
            TerminateCaptions: "terminateCaptions",
          }),
        ),
      ).annotate({ identifier: "EmbeddedSourceSettings" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          FramerateDenominator: S.optional(S.Number),
          FramerateNumerator: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            FramerateDenominator: "framerateDenominator",
            FramerateNumerator: "framerateNumerator",
          }),
        ),
      ).annotate({ identifier: "CaptionSourceFramerate" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          ByteRateLimit: S.optional(S.String),
          Convert608To708: S.optional(S.String),
          ConvertPaintToPop: S.optional(S.String),
          Framerate: S.optional(__S(243, __c7, 19)),
          SourceFile: S.optional(S.String),
          TimeDelta: S.optional(S.Number),
          TimeDeltaUnits: S.optional(S.String),
          UpconvertSTLToTeletext: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ByteRateLimit: "byteRateLimit",
            Convert608To708: "convert608To708",
            ConvertPaintToPop: "convertPaintToPop",
            Framerate: "framerate",
            SourceFile: "sourceFile",
            TimeDelta: "timeDelta",
            TimeDeltaUnits: "timeDeltaUnits",
            UpconvertSTLToTeletext: "upconvertSTLToTeletext",
          }),
        ),
      ).annotate({ identifier: "FileSourceSettings" });
    case 21:
      return S.suspend(() =>
        S.Struct({ PageNumber: S.optional(S.String) }).pipe(
          S.encodeKeys({ PageNumber: "pageNumber" }),
        ),
      ).annotate({ identifier: "TeletextSourceSettings" });
    case 22:
      return S.suspend(() =>
        S.Struct({ StreamNumber: S.optional(S.Number), TrackNumber: S.optional(S.Number) }).pipe(
          S.encodeKeys({ StreamNumber: "streamNumber", TrackNumber: "trackNumber" }),
        ),
      ).annotate({ identifier: "TrackSourceSettings" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          AncillarySourceSettings: S.optional(__S(240, __c7, 16)),
          DvbSubSourceSettings: S.optional(__S(241, __c7, 17)),
          EmbeddedSourceSettings: S.optional(__S(242, __c7, 18)),
          FileSourceSettings: S.optional(__S(244, __c7, 20)),
          SourceType: S.optional(S.String),
          TeletextSourceSettings: S.optional(__S(245, __c7, 21)),
          TrackSourceSettings: S.optional(__S(246, __c7, 22)),
          WebvttHlsSourceSettings: S.optional(__S(237, __c7, 13)),
        }).pipe(
          S.encodeKeys({
            AncillarySourceSettings: "ancillarySourceSettings",
            DvbSubSourceSettings: "dvbSubSourceSettings",
            EmbeddedSourceSettings: "embeddedSourceSettings",
            FileSourceSettings: "fileSourceSettings",
            SourceType: "sourceType",
            TeletextSourceSettings: "teletextSourceSettings",
            TrackSourceSettings: "trackSourceSettings",
            WebvttHlsSourceSettings: "webvttHlsSourceSettings",
          }),
        ),
      ).annotate({ identifier: "CaptionSourceSettings" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          CustomLanguageCode: S.optional(S.String),
          LanguageCode: S.optional(S.String),
          SourceSettings: S.optional(__S(247, __c7, 23)),
        }).pipe(
          S.encodeKeys({
            CustomLanguageCode: "customLanguageCode",
            LanguageCode: "languageCode",
            SourceSettings: "sourceSettings",
          }),
        ),
      ).annotate({ identifier: "CaptionSelector" });
    case 25:
      return S.Record(S.String, /*@__PURE__*/ __S(248, __c7, 24).pipe(S.optional));
    case 26:
      return S.suspend(() =>
        S.Struct({
          AudioDurationCorrection: S.optional(S.String),
          ExternalAudioFileInput: S.optional(S.String),
          LanguageCode: S.optional(S.String),
          Offset: S.optional(S.Number),
          SelectorType: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AudioDurationCorrection: "audioDurationCorrection",
            ExternalAudioFileInput: "externalAudioFileInput",
            LanguageCode: "languageCode",
            Offset: "offset",
            SelectorType: "selectorType",
          }),
        ),
      ).annotate({ identifier: "DynamicAudioSelector" });
    case 27:
      return S.Record(S.String, /*@__PURE__*/ __S(250, __c7, 26).pipe(S.optional));
    case 28:
      return S.suspend(() =>
        S.Struct({ EndTimecode: S.optional(S.String), StartTimecode: S.optional(S.String) }).pipe(
          S.encodeKeys({ EndTimecode: "endTimecode", StartTimecode: "startTimecode" }),
        ),
      ).annotate({ identifier: "InputClipping" });
    case 29:
      return S.Array(__S(252, __c7, 28));
    case 30:
      return S.suspend(() =>
        S.Struct({ FileInput: S.optional(S.String) }).pipe(
          S.encodeKeys({ FileInput: "fileInput" }),
        ),
      ).annotate({ identifier: "MultiViewInput" });
    case 31:
      return S.suspend(() =>
        S.Struct({ Input: S.optional(__S(254, __c7, 30)) }).pipe(S.encodeKeys({ Input: "input" })),
      ).annotate({ identifier: "MultiViewSettings" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(255, __c7, 31));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Height: S.optional(S.Number),
          Unit: S.optional(S.String),
          Width: S.optional(S.Number),
          X: S.optional(S.Number),
          Y: S.optional(S.Number),
        }).pipe(S.encodeKeys({ Height: "height", Unit: "unit", Width: "width", X: "x", Y: "y" })),
      ).annotate({ identifier: "VideoOverlayCrop" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Height: S.optional(S.Number),
          Opacity: S.optional(S.Number),
          Unit: S.optional(S.String),
          Width: S.optional(S.Number),
          XPosition: S.optional(S.Number),
          YPosition: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            Height: "height",
            Opacity: "opacity",
            Unit: "unit",
            Width: "width",
            XPosition: "xPosition",
            YPosition: "yPosition",
          }),
        ),
      ).annotate({ identifier: "VideoOverlayPosition" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AudioSelectors: S.optional(__mapOfAudioSelector),
          FileInput: S.optional(S.String),
          InputClippings: S.optional(__listOfVideoOverlayInputClipping),
          TimecodeSource: S.optional(S.String),
          TimecodeStart: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AudioSelectors: "audioSelectors",
            FileInput: "fileInput",
            InputClippings: "inputClippings",
            TimecodeSource: "timecodeSource",
            TimecodeStart: "timecodeStart",
          }),
        ),
      ).annotate({ identifier: "VideoOverlayInput" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          EndPosition: S.optional(__S(258, __c8, 2)),
          EndTimecode: S.optional(S.String),
          StartTimecode: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            EndPosition: "endPosition",
            EndTimecode: "endTimecode",
            StartTimecode: "startTimecode",
          }),
        ),
      ).annotate({ identifier: "VideoOverlayTransition" });
    case 5:
      return S.Array(__S(260, __c8, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Crop: S.optional(__S(257, __c8, 1)),
          EndTimecode: S.optional(S.String),
          InitialPosition: S.optional(__S(258, __c8, 2)),
          Input: S.optional(__S(259, __c8, 3)),
          Playback: S.optional(S.String),
          StartTimecode: S.optional(S.String),
          Transitions: S.optional(__listOfVideoOverlayTransition),
        }).pipe(
          S.encodeKeys({
            Crop: "crop",
            EndTimecode: "endTimecode",
            InitialPosition: "initialPosition",
            Input: "input",
            Playback: "playback",
            StartTimecode: "startTimecode",
            Transitions: "transitions",
          }),
        ),
      ).annotate({ identifier: "VideoOverlay" });
    case 7:
      return S.Array(__S(262, __c8, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          AlphaBehavior: S.optional(S.String),
          ColorSpace: S.optional(S.String),
          ColorSpaceUsage: S.optional(S.String),
          EmbeddedTimecodeOverride: S.optional(S.String),
          Hdr10Metadata: S.optional(__S(104, __c3, 8)),
          MaxLuminance: S.optional(S.Number),
          PadVideo: S.optional(S.String),
          Pid: S.optional(S.Number),
          ProgramNumber: S.optional(S.Number),
          Rotate: S.optional(S.String),
          SampleRange: S.optional(S.String),
          SelectorType: S.optional(S.String),
          Streams: S.optional(__listOf__integerMin1Max2147483647),
        }).pipe(
          S.encodeKeys({
            AlphaBehavior: "alphaBehavior",
            ColorSpace: "colorSpace",
            ColorSpaceUsage: "colorSpaceUsage",
            EmbeddedTimecodeOverride: "embeddedTimecodeOverride",
            Hdr10Metadata: "hdr10Metadata",
            MaxLuminance: "maxLuminance",
            PadVideo: "padVideo",
            Pid: "pid",
            ProgramNumber: "programNumber",
            Rotate: "rotate",
            SampleRange: "sampleRange",
            SelectorType: "selectorType",
            Streams: "streams",
          }),
        ),
      ).annotate({ identifier: "VideoSelector" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          ChannelName: S.optional(S.String),
          ContentReference: S.optional(S.String),
          CredentialsSecretName: S.optional(S.String),
          FileOffset: S.optional(S.Number),
          KantarLicenseId: S.optional(S.Number),
          KantarServerUrl: S.optional(S.String),
          LogDestination: S.optional(S.String),
          Metadata3: S.optional(S.String),
          Metadata4: S.optional(S.String),
          Metadata5: S.optional(S.String),
          Metadata6: S.optional(S.String),
          Metadata7: S.optional(S.String),
          Metadata8: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ChannelName: "channelName",
            ContentReference: "contentReference",
            CredentialsSecretName: "credentialsSecretName",
            FileOffset: "fileOffset",
            KantarLicenseId: "kantarLicenseId",
            KantarServerUrl: "kantarServerUrl",
            LogDestination: "logDestination",
            Metadata3: "metadata3",
            Metadata4: "metadata4",
            Metadata5: "metadata5",
            Metadata6: "metadata6",
            Metadata7: "metadata7",
            Metadata8: "metadata8",
          }),
        ),
      ).annotate({ identifier: "KantarWatermarkSettings" });
    case 10:
      return S.suspend(() =>
        S.Struct({ ImageX: S.optional(S.Number), ImageY: S.optional(S.Number) }).pipe(
          S.encodeKeys({ ImageX: "imageX", ImageY: "imageY" }),
        ),
      ).annotate({ identifier: "MotionImageInsertionOffset" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          Framerate: S.optional(__S(243, __c7, 19)),
          Input: S.optional(S.String),
          InsertionMode: S.optional(S.String),
          Offset: S.optional(__S(266, __c8, 10)),
          Playback: S.optional(S.String),
          StartTime: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Framerate: "framerate",
            Input: "input",
            InsertionMode: "insertionMode",
            Offset: "offset",
            Playback: "playback",
            StartTime: "startTime",
          }),
        ),
      ).annotate({ identifier: "MotionImageInserter" });
    case 12:
      return S.Array(__S(267, __c8, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({ BreakoutCode: S.optional(S.Number), DistributorId: S.optional(S.String) }).pipe(
          S.encodeKeys({ BreakoutCode: "breakoutCode", DistributorId: "distributorId" }),
        ),
      ).annotate({ identifier: "NielsenConfiguration" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          ActiveWatermarkProcess: S.optional(S.String),
          AdiFilename: S.optional(S.String),
          AssetId: S.optional(S.String),
          AssetName: S.optional(S.String),
          CbetSourceId: S.optional(S.String),
          EpisodeId: S.optional(S.String),
          MetadataDestination: S.optional(S.String),
          SourceId: S.optional(S.Number),
          SourceWatermarkStatus: S.optional(S.String),
          TicServerUrl: S.optional(S.String),
          UniqueTicPerAudioTrack: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ActiveWatermarkProcess: "activeWatermarkProcess",
            AdiFilename: "adiFilename",
            AssetId: "assetId",
            AssetName: "assetName",
            CbetSourceId: "cbetSourceId",
            EpisodeId: "episodeId",
            MetadataDestination: "metadataDestination",
            SourceId: "sourceId",
            SourceWatermarkStatus: "sourceWatermarkStatus",
            TicServerUrl: "ticServerUrl",
            UniqueTicPerAudioTrack: "uniqueTicPerAudioTrack",
          }),
        ),
      ).annotate({ identifier: "NielsenNonLinearWatermarkSettings" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          Height: S.optional(S.Number),
          Required: S.optional(S.String),
          Width: S.optional(S.Number),
        }).pipe(S.encodeKeys({ Height: "height", Required: "required", Width: "width" })),
      ).annotate({ identifier: "AllowedRenditionSize" });
    case 16:
      return S.Array(__S(271, __c8, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({ Height: S.optional(S.Number), Width: S.optional(S.Number) }).pipe(
          S.encodeKeys({ Height: "height", Width: "width" }),
        ),
      ).annotate({ identifier: "ForceIncludeRenditionSize" });
    case 18:
      return S.Array(__S(273, __c8, 17));
    case 19:
      return S.suspend(() =>
        S.Struct({
          AllowedRenditions: S.optional(__listOfAllowedRenditionSize),
          ForceIncludeRenditions: S.optional(__listOfForceIncludeRenditionSize),
          MinBottomRenditionSize: S.optional(__S(273, __c8, 17)),
          MinTopRenditionSize: S.optional(__S(273, __c8, 17)),
          Type: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AllowedRenditions: "allowedRenditions",
            ForceIncludeRenditions: "forceIncludeRenditions",
            MinBottomRenditionSize: "minBottomRenditionSize",
            MinTopRenditionSize: "minTopRenditionSize",
            Type: "type",
          }),
        ),
      ).annotate({ identifier: "AutomatedAbrRule" });
    case 20:
      return S.Array(__S(275, __c8, 19));
    case 21:
      return S.suspend(() =>
        S.Struct({
          MaxAbrBitrate: S.optional(S.Number),
          MaxQualityLevel: S.optional(S.Number),
          MaxRenditions: S.optional(S.Number),
          MinAbrBitrate: S.optional(S.Number),
          Rules: S.optional(__listOfAutomatedAbrRule),
        }).pipe(
          S.encodeKeys({
            MaxAbrBitrate: "maxAbrBitrate",
            MaxQualityLevel: "maxQualityLevel",
            MaxRenditions: "maxRenditions",
            MinAbrBitrate: "minAbrBitrate",
            Rules: "rules",
          }),
        ),
      ).annotate({ identifier: "AutomatedAbrSettings" });
    case 22:
      return S.suspend(() =>
        S.Struct({ AbrSettings: S.optional(__S(277, __c8, 21)) }).pipe(
          S.encodeKeys({ AbrSettings: "abrSettings" }),
        ),
      ).annotate({ identifier: "AutomatedEncodingSettings" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          ManifestNameModifier: S.optional(S.String),
          SelectedOutputs: S.optional(__listOf__stringMin1),
        }).pipe(
          S.encodeKeys({
            ManifestNameModifier: "manifestNameModifier",
            SelectedOutputs: "selectedOutputs",
          }),
        ),
      ).annotate({ identifier: "CmafAdditionalManifest" });
    case 24:
      return S.Array(__S(279, __c8, 23));
    case 25:
      return S.suspend(() =>
        S.Struct({ CannedAcl: S.optional(S.String) }).pipe(
          S.encodeKeys({ CannedAcl: "cannedAcl" }),
        ),
      ).annotate({ identifier: "S3DestinationAccessControl" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          EncryptionType: S.optional(S.String),
          KmsEncryptionContext: S.optional(S.String),
          KmsKeyArn: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            EncryptionType: "encryptionType",
            KmsEncryptionContext: "kmsEncryptionContext",
            KmsKeyArn: "kmsKeyArn",
          }),
        ),
      ).annotate({ identifier: "S3EncryptionSettings" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          AccessControl: S.optional(__S(281, __c8, 25)),
          Encryption: S.optional(__S(282, __c8, 26)),
          StorageClass: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AccessControl: "accessControl",
            Encryption: "encryption",
            StorageClass: "storageClass",
          }),
        ),
      ).annotate({ identifier: "S3DestinationSettings" });
    case 28:
      return S.suspend(() =>
        S.Struct({ S3Settings: S.optional(__S(283, __c8, 27)) }).pipe(
          S.encodeKeys({ S3Settings: "s3Settings" }),
        ),
      ).annotate({ identifier: "DestinationSettings" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          SpekeAudioPreset: S.optional(S.String),
          SpekeVideoPreset: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            SpekeAudioPreset: "spekeAudioPreset",
            SpekeVideoPreset: "spekeVideoPreset",
          }),
        ),
      ).annotate({ identifier: "EncryptionContractConfiguration" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          CertificateArn: S.optional(S.String),
          DashSignaledSystemIds: S.optional(
            __listOf__stringMin36Max36Pattern09aFAF809aFAF409aFAF409aFAF409aFAF12,
          ),
          EncryptionContractConfiguration: S.optional(__S(285, __c8, 29)),
          HlsSignaledSystemIds: S.optional(
            __listOf__stringMin36Max36Pattern09aFAF809aFAF409aFAF409aFAF409aFAF12,
          ),
          ResourceId: S.optional(S.String),
          Url: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            CertificateArn: "certificateArn",
            DashSignaledSystemIds: "dashSignaledSystemIds",
            EncryptionContractConfiguration: "encryptionContractConfiguration",
            HlsSignaledSystemIds: "hlsSignaledSystemIds",
            ResourceId: "resourceId",
            Url: "url",
          }),
        ),
      ).annotate({ identifier: "SpekeKeyProviderCmaf" });
    case 31:
      return S.suspend(() =>
        S.Struct({
          KeyFormat: S.optional(S.String),
          KeyFormatVersions: S.optional(S.String),
          StaticKeyValue: S.optional(SensitiveString),
          Url: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            KeyFormat: "keyFormat",
            KeyFormatVersions: "keyFormatVersions",
            StaticKeyValue: "staticKeyValue",
            Url: "url",
          }),
        ),
      ).annotate({ identifier: "StaticKeyProvider" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClearLeadSegments: S.optional(S.Number),
          ConstantInitializationVector: S.optional(S.String),
          EncryptionMethod: S.optional(S.String),
          InitializationVectorInManifest: S.optional(S.String),
          SpekeKeyProvider: S.optional(__S(286, __c8, 30)),
          StaticKeyProvider: S.optional(__S(287, __c8, 31)),
          Type: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ClearLeadSegments: "clearLeadSegments",
            ConstantInitializationVector: "constantInitializationVector",
            EncryptionMethod: "encryptionMethod",
            InitializationVectorInManifest: "initializationVectorInManifest",
            SpekeKeyProvider: "spekeKeyProvider",
            StaticKeyProvider: "staticKeyProvider",
            Type: "type",
          }),
        ),
      ).annotate({ identifier: "CmafEncryptionSettings" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IntervalCadence: S.optional(S.String),
          ThumbnailHeight: S.optional(S.Number),
          ThumbnailInterval: S.optional(S.Number),
          ThumbnailWidth: S.optional(S.Number),
          TileHeight: S.optional(S.Number),
          TileWidth: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            IntervalCadence: "intervalCadence",
            ThumbnailHeight: "thumbnailHeight",
            ThumbnailInterval: "thumbnailInterval",
            ThumbnailWidth: "thumbnailWidth",
            TileHeight: "tileHeight",
            TileWidth: "tileWidth",
          }),
        ),
      ).annotate({ identifier: "CmafImageBasedTrickPlaySettings" });
    case 2:
      return S.Array(__S(289, __c9, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AdditionalManifests: S.optional(__listOfCmafAdditionalManifest),
          BaseUrl: S.optional(S.String),
          ClientCache: S.optional(S.String),
          CodecSpecification: S.optional(S.String),
          DashIFrameTrickPlayNameModifier: S.optional(S.String),
          DashManifestStyle: S.optional(S.String),
          Destination: S.optional(S.String),
          DestinationSettings: S.optional(__S(284, __c8, 28)),
          Encryption: S.optional(__S(288, __c9, 0)),
          FragmentLength: S.optional(S.Number),
          ImageBasedTrickPlay: S.optional(S.String),
          ImageBasedTrickPlaySettings: S.optional(__S(289, __c9, 1)),
          ImageBasedTrickPlayVariants: S.optional(__listOfCmafImageBasedTrickPlayVariant),
          ManifestCompression: S.optional(S.String),
          ManifestDurationFormat: S.optional(S.String),
          MinBufferTime: S.optional(S.Number),
          MinFinalSegmentLength: S.optional(S.Number),
          MpdManifestBandwidthType: S.optional(S.String),
          MpdProfile: S.optional(S.String),
          PtsOffsetHandlingForBFrames: S.optional(S.String),
          SegmentControl: S.optional(S.String),
          SegmentLength: S.optional(S.Number),
          SegmentLengthControl: S.optional(S.String),
          StreamInfResolution: S.optional(S.String),
          TargetDurationCompatibilityMode: S.optional(S.String),
          VideoCompositionOffsets: S.optional(S.String),
          WriteDashManifest: S.optional(S.String),
          WriteHlsManifest: S.optional(S.String),
          WriteSegmentTimelineInRepresentation: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AdditionalManifests: "additionalManifests",
            BaseUrl: "baseUrl",
            ClientCache: "clientCache",
            CodecSpecification: "codecSpecification",
            DashIFrameTrickPlayNameModifier: "dashIFrameTrickPlayNameModifier",
            DashManifestStyle: "dashManifestStyle",
            Destination: "destination",
            DestinationSettings: "destinationSettings",
            Encryption: "encryption",
            FragmentLength: "fragmentLength",
            ImageBasedTrickPlay: "imageBasedTrickPlay",
            ImageBasedTrickPlaySettings: "imageBasedTrickPlaySettings",
            ImageBasedTrickPlayVariants: "imageBasedTrickPlayVariants",
            ManifestCompression: "manifestCompression",
            ManifestDurationFormat: "manifestDurationFormat",
            MinBufferTime: "minBufferTime",
            MinFinalSegmentLength: "minFinalSegmentLength",
            MpdManifestBandwidthType: "mpdManifestBandwidthType",
            MpdProfile: "mpdProfile",
            PtsOffsetHandlingForBFrames: "ptsOffsetHandlingForBFrames",
            SegmentControl: "segmentControl",
            SegmentLength: "segmentLength",
            SegmentLengthControl: "segmentLengthControl",
            StreamInfResolution: "streamInfResolution",
            TargetDurationCompatibilityMode: "targetDurationCompatibilityMode",
            VideoCompositionOffsets: "videoCompositionOffsets",
            WriteDashManifest: "writeDashManifest",
            WriteHlsManifest: "writeHlsManifest",
            WriteSegmentTimelineInRepresentation: "writeSegmentTimelineInRepresentation",
          }),
        ),
      ).annotate({ identifier: "CmafGroupSettings" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          CertificateArn: S.optional(S.String),
          EncryptionContractConfiguration: S.optional(__S(285, __c8, 29)),
          ResourceId: S.optional(S.String),
          SystemIds: S.optional(__listOf__stringPattern09aFAF809aFAF409aFAF409aFAF409aFAF12),
          Url: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            CertificateArn: "certificateArn",
            EncryptionContractConfiguration: "encryptionContractConfiguration",
            ResourceId: "resourceId",
            SystemIds: "systemIds",
            Url: "url",
          }),
        ),
      ).annotate({ identifier: "SpekeKeyProvider" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          PlaybackDeviceCompatibility: S.optional(S.String),
          SpekeKeyProvider: S.optional(__S(292, __c9, 4)),
        }).pipe(
          S.encodeKeys({
            PlaybackDeviceCompatibility: "playbackDeviceCompatibility",
            SpekeKeyProvider: "spekeKeyProvider",
          }),
        ),
      ).annotate({ identifier: "DashIsoEncryptionSettings" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          AdditionalManifests: S.optional(__listOfDashAdditionalManifest),
          AudioChannelConfigSchemeIdUri: S.optional(S.String),
          BaseUrl: S.optional(S.String),
          DashIFrameTrickPlayNameModifier: S.optional(S.String),
          DashManifestStyle: S.optional(S.String),
          Destination: S.optional(S.String),
          DestinationSettings: S.optional(__S(284, __c8, 28)),
          Encryption: S.optional(__S(293, __c9, 5)),
          FragmentLength: S.optional(S.Number),
          HbbtvCompliance: S.optional(S.String),
          ImageBasedTrickPlay: S.optional(S.String),
          ImageBasedTrickPlaySettings: S.optional(__S(289, __c9, 1)),
          ImageBasedTrickPlayVariants: S.optional(__listOfDashIsoImageBasedTrickPlayVariant),
          MinBufferTime: S.optional(S.Number),
          MinFinalSegmentLength: S.optional(S.Number),
          MpdManifestBandwidthType: S.optional(S.String),
          MpdProfile: S.optional(S.String),
          PtsOffsetHandlingForBFrames: S.optional(S.String),
          SegmentControl: S.optional(S.String),
          SegmentLength: S.optional(S.Number),
          SegmentLengthControl: S.optional(S.String),
          VideoCompositionOffsets: S.optional(S.String),
          WriteSegmentTimelineInRepresentation: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AdditionalManifests: "additionalManifests",
            AudioChannelConfigSchemeIdUri: "audioChannelConfigSchemeIdUri",
            BaseUrl: "baseUrl",
            DashIFrameTrickPlayNameModifier: "dashIFrameTrickPlayNameModifier",
            DashManifestStyle: "dashManifestStyle",
            Destination: "destination",
            DestinationSettings: "destinationSettings",
            Encryption: "encryption",
            FragmentLength: "fragmentLength",
            HbbtvCompliance: "hbbtvCompliance",
            ImageBasedTrickPlay: "imageBasedTrickPlay",
            ImageBasedTrickPlaySettings: "imageBasedTrickPlaySettings",
            ImageBasedTrickPlayVariants: "imageBasedTrickPlayVariants",
            MinBufferTime: "minBufferTime",
            MinFinalSegmentLength: "minFinalSegmentLength",
            MpdManifestBandwidthType: "mpdManifestBandwidthType",
            MpdProfile: "mpdProfile",
            PtsOffsetHandlingForBFrames: "ptsOffsetHandlingForBFrames",
            SegmentControl: "segmentControl",
            SegmentLength: "segmentLength",
            SegmentLengthControl: "segmentLengthControl",
            VideoCompositionOffsets: "videoCompositionOffsets",
            WriteSegmentTimelineInRepresentation: "writeSegmentTimelineInRepresentation",
          }),
        ),
      ).annotate({ identifier: "DashIsoGroupSettings" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Destination: S.optional(S.String),
          DestinationSettings: S.optional(__S(284, __c8, 28)),
        }).pipe(
          S.encodeKeys({ Destination: "destination", DestinationSettings: "destinationSettings" }),
        ),
      ).annotate({ identifier: "FileGroupSettings" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          CaptionChannel: S.optional(S.Number),
          CustomLanguageCode: S.optional(S.String),
          LanguageCode: S.optional(S.String),
          LanguageDescription: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            CaptionChannel: "captionChannel",
            CustomLanguageCode: "customLanguageCode",
            LanguageCode: "languageCode",
            LanguageDescription: "languageDescription",
          }),
        ),
      ).annotate({ identifier: "HlsCaptionLanguageMapping" });
    case 9:
      return S.Array(__S(296, __c9, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          ConstantInitializationVector: S.optional(S.String),
          EncryptionMethod: S.optional(S.String),
          InitializationVectorInManifest: S.optional(S.String),
          OfflineEncrypted: S.optional(S.String),
          SpekeKeyProvider: S.optional(__S(292, __c9, 4)),
          StaticKeyProvider: S.optional(__S(287, __c8, 31)),
          Type: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ConstantInitializationVector: "constantInitializationVector",
            EncryptionMethod: "encryptionMethod",
            InitializationVectorInManifest: "initializationVectorInManifest",
            OfflineEncrypted: "offlineEncrypted",
            SpekeKeyProvider: "spekeKeyProvider",
            StaticKeyProvider: "staticKeyProvider",
            Type: "type",
          }),
        ),
      ).annotate({ identifier: "HlsEncryptionSettings" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          AdMarkers: S.optional(__listOfHlsAdMarkers),
          AdditionalManifests: S.optional(__listOfHlsAdditionalManifest),
          AudioOnlyHeader: S.optional(S.String),
          BaseUrl: S.optional(S.String),
          CaptionLanguageMappings: S.optional(__listOfHlsCaptionLanguageMapping),
          CaptionLanguageSetting: S.optional(S.String),
          CaptionSegmentLengthControl: S.optional(S.String),
          ClientCache: S.optional(S.String),
          CodecSpecification: S.optional(S.String),
          Destination: S.optional(S.String),
          DestinationSettings: S.optional(__S(284, __c8, 28)),
          DirectoryStructure: S.optional(S.String),
          Encryption: S.optional(__S(298, __c9, 10)),
          ImageBasedTrickPlay: S.optional(S.String),
          ImageBasedTrickPlaySettings: S.optional(__S(289, __c9, 1)),
          ImageBasedTrickPlayVariants: S.optional(__listOfHlsImageBasedTrickPlayVariant),
          ManifestCompression: S.optional(S.String),
          ManifestDurationFormat: S.optional(S.String),
          MinFinalSegmentLength: S.optional(S.Number),
          MinSegmentLength: S.optional(S.Number),
          OutputSelection: S.optional(S.String),
          ProgramDateTime: S.optional(S.String),
          ProgramDateTimePeriod: S.optional(S.Number),
          ProgressiveWriteHlsManifest: S.optional(S.String),
          SegmentControl: S.optional(S.String),
          SegmentLength: S.optional(S.Number),
          SegmentLengthControl: S.optional(S.String),
          SegmentsPerSubdirectory: S.optional(S.Number),
          StreamInfResolution: S.optional(S.String),
          TargetDurationCompatibilityMode: S.optional(S.String),
          TimedMetadataId3Frame: S.optional(S.String),
          TimedMetadataId3Period: S.optional(S.Number),
          TimestampDeltaMilliseconds: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            AdMarkers: "adMarkers",
            AdditionalManifests: "additionalManifests",
            AudioOnlyHeader: "audioOnlyHeader",
            BaseUrl: "baseUrl",
            CaptionLanguageMappings: "captionLanguageMappings",
            CaptionLanguageSetting: "captionLanguageSetting",
            CaptionSegmentLengthControl: "captionSegmentLengthControl",
            ClientCache: "clientCache",
            CodecSpecification: "codecSpecification",
            Destination: "destination",
            DestinationSettings: "destinationSettings",
            DirectoryStructure: "directoryStructure",
            Encryption: "encryption",
            ImageBasedTrickPlay: "imageBasedTrickPlay",
            ImageBasedTrickPlaySettings: "imageBasedTrickPlaySettings",
            ImageBasedTrickPlayVariants: "imageBasedTrickPlayVariants",
            ManifestCompression: "manifestCompression",
            ManifestDurationFormat: "manifestDurationFormat",
            MinFinalSegmentLength: "minFinalSegmentLength",
            MinSegmentLength: "minSegmentLength",
            OutputSelection: "outputSelection",
            ProgramDateTime: "programDateTime",
            ProgramDateTimePeriod: "programDateTimePeriod",
            ProgressiveWriteHlsManifest: "progressiveWriteHlsManifest",
            SegmentControl: "segmentControl",
            SegmentLength: "segmentLength",
            SegmentLengthControl: "segmentLengthControl",
            SegmentsPerSubdirectory: "segmentsPerSubdirectory",
            StreamInfResolution: "streamInfResolution",
            TargetDurationCompatibilityMode: "targetDurationCompatibilityMode",
            TimedMetadataId3Frame: "timedMetadataId3Frame",
            TimedMetadataId3Period: "timedMetadataId3Period",
            TimestampDeltaMilliseconds: "timestampDeltaMilliseconds",
          }),
        ),
      ).annotate({ identifier: "HlsGroupSettings" });
    case 12:
      return S.suspend(() =>
        S.Struct({ SpekeKeyProvider: S.optional(__S(292, __c9, 4)) }).pipe(
          S.encodeKeys({ SpekeKeyProvider: "spekeKeyProvider" }),
        ),
      ).annotate({ identifier: "MsSmoothEncryptionSettings" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          AdditionalManifests: S.optional(__listOfMsSmoothAdditionalManifest),
          AudioDeduplication: S.optional(S.String),
          Destination: S.optional(S.String),
          DestinationSettings: S.optional(__S(284, __c8, 28)),
          Encryption: S.optional(__S(300, __c9, 12)),
          FragmentLength: S.optional(S.Number),
          FragmentLengthControl: S.optional(S.String),
          ManifestEncoding: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AdditionalManifests: "additionalManifests",
            AudioDeduplication: "audioDeduplication",
            Destination: "destination",
            DestinationSettings: "destinationSettings",
            Encryption: "encryption",
            FragmentLength: "fragmentLength",
            FragmentLengthControl: "fragmentLengthControl",
            ManifestEncoding: "manifestEncoding",
          }),
        ),
      ).annotate({ identifier: "MsSmoothGroupSettings" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          CmafGroupSettings: S.optional(__S(291, __c9, 3)),
          DashIsoGroupSettings: S.optional(__S(294, __c9, 6)),
          FileGroupSettings: S.optional(__S(295, __c9, 7)),
          HlsGroupSettings: S.optional(__S(299, __c9, 11)),
          MsSmoothGroupSettings: S.optional(__S(301, __c9, 13)),
          PerFrameMetrics: S.optional(__listOfFrameMetricType),
          Type: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            CmafGroupSettings: "cmafGroupSettings",
            DashIsoGroupSettings: "dashIsoGroupSettings",
            FileGroupSettings: "fileGroupSettings",
            HlsGroupSettings: "hlsGroupSettings",
            MsSmoothGroupSettings: "msSmoothGroupSettings",
            PerFrameMetrics: "perFrameMetrics",
            Type: "type",
          }),
        ),
      ).annotate({ identifier: "OutputGroupSettings" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          CaptionSelectorName: S.optional(S.String),
          CustomLanguageCode: S.optional(S.String),
          DestinationSettings: S.optional(__S(131, __c4, 3)),
          LanguageCode: S.optional(S.String),
          LanguageDescription: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            CaptionSelectorName: "captionSelectorName",
            CustomLanguageCode: "customLanguageCode",
            DestinationSettings: "destinationSettings",
            LanguageCode: "languageCode",
            LanguageDescription: "languageDescription",
          }),
        ),
      ).annotate({ identifier: "CaptionDescription" });
    case 16:
      return S.Array(__S(303, __c9, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({
          AudioGroupId: S.optional(S.String),
          AudioOnlyContainer: S.optional(S.String),
          AudioRenditionSets: S.optional(S.String),
          AudioTrackType: S.optional(S.String),
          DescriptiveVideoServiceFlag: S.optional(S.String),
          IFrameOnlyManifest: S.optional(S.String),
          SegmentModifier: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AudioGroupId: "audioGroupId",
            AudioOnlyContainer: "audioOnlyContainer",
            AudioRenditionSets: "audioRenditionSets",
            AudioTrackType: "audioTrackType",
            DescriptiveVideoServiceFlag: "descriptiveVideoServiceFlag",
            IFrameOnlyManifest: "iFrameOnlyManifest",
            SegmentModifier: "segmentModifier",
          }),
        ),
      ).annotate({ identifier: "HlsSettings" });
    case 18:
      return S.suspend(() =>
        S.Struct({ HlsSettings: S.optional(__S(305, __c9, 17)) }).pipe(
          S.encodeKeys({ HlsSettings: "hlsSettings" }),
        ),
      ).annotate({ identifier: "OutputSettings" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          AudioDescriptions: S.optional(__listOfAudioDescription),
          CaptionDescriptions: S.optional(__listOfCaptionDescription),
          ContainerSettings: S.optional(__S(145, __c4, 17)),
          Extension: S.optional(S.String),
          NameModifier: S.optional(S.String),
          OutputSettings: S.optional(__S(306, __c9, 18)),
          Preset: S.optional(S.String),
          VideoDescription: S.optional(__S(183, __c5, 23)),
        }).pipe(
          S.encodeKeys({
            AudioDescriptions: "audioDescriptions",
            CaptionDescriptions: "captionDescriptions",
            ContainerSettings: "containerSettings",
            Extension: "extension",
            NameModifier: "nameModifier",
            OutputSettings: "outputSettings",
            Preset: "preset",
            VideoDescription: "videoDescription",
          }),
        ),
      ).annotate({ identifier: "Output" });
    case 20:
      return S.Array(__S(307, __c9, 19));
    case 21:
      return S.suspend(() =>
        S.Struct({
          AutomatedEncodingSettings: S.optional(__S(278, __c8, 22)),
          CustomName: S.optional(S.String),
          Name: S.optional(S.String),
          OutputGroupSettings: S.optional(__S(302, __c9, 14)),
          Outputs: S.optional(__listOfOutput),
        }).pipe(
          S.encodeKeys({
            AutomatedEncodingSettings: "automatedEncodingSettings",
            CustomName: "customName",
            Name: "name",
            OutputGroupSettings: "outputGroupSettings",
            Outputs: "outputs",
          }),
        ),
      ).annotate({ identifier: "OutputGroup" });
    case 22:
      return S.Array(__S(309, __c9, 21));
    case 23:
      return S.suspend(() =>
        S.Struct({
          Anchor: S.optional(S.String),
          Source: S.optional(S.String),
          Start: S.optional(S.String),
          TimestampOffset: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Anchor: "anchor",
            Source: "source",
            Start: "start",
            TimestampOffset: "timestampOffset",
          }),
        ),
      ).annotate({ identifier: "TimecodeConfig" });
    case 24:
      return S.suspend(() =>
        S.Struct({ Id3: S.optional(S.String), Timecode: S.optional(S.String) }).pipe(
          S.encodeKeys({ Id3: "id3", Timecode: "timecode" }),
        ),
      ).annotate({ identifier: "Id3Insertion" });
    case 25:
      return S.Array(__S(312, __c9, 24));
    case 26:
      return S.suspend(() =>
        S.Struct({ Id3Insertions: S.optional(__listOfId3Insertion) }).pipe(
          S.encodeKeys({ Id3Insertions: "id3Insertions" }),
        ),
      ).annotate({ identifier: "TimedMetadataInsertion" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Job: S.optional(__S(372, __c11, 20)) }).pipe(S.encodeKeys({ Job: "job" })),
      ).annotate({ identifier: "CreateJobResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DecryptionMode: S.optional(S.String),
          EncryptedDecryptionKey: S.optional(S.String),
          InitializationVector: S.optional(S.String),
          KmsKeyRegion: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            DecryptionMode: "decryptionMode",
            EncryptedDecryptionKey: "encryptedDecryptionKey",
            InitializationVector: "initializationVector",
            KmsKeyRegion: "kmsKeyRegion",
          }),
        ),
      ).annotate({ identifier: "InputDecryptionSettings" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AuthConnectionArn: S.optional(S.String),
          GapHandling: S.optional(S.String),
          SourceId: S.optional(S.String),
          Timerange: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AuthConnectionArn: "authConnectionArn",
            GapHandling: "gapHandling",
            SourceId: "sourceId",
            Timerange: "timerange",
          }),
        ),
      ).annotate({ identifier: "InputTamsSettings" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Channels: S.optional(S.Number),
          Duration: S.optional(S.Number),
          FramerateDenominator: S.optional(S.Number),
          FramerateNumerator: S.optional(S.Number),
          Height: S.optional(S.Number),
          ImageInput: S.optional(S.String),
          SampleRate: S.optional(S.Number),
          Width: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            Channels: "channels",
            Duration: "duration",
            FramerateDenominator: "framerateDenominator",
            FramerateNumerator: "framerateNumerator",
            Height: "height",
            ImageInput: "imageInput",
            SampleRate: "sampleRate",
            Width: "width",
          }),
        ),
      ).annotate({ identifier: "InputVideoGenerator" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AdvancedInputFilter: S.optional(S.String),
          AdvancedInputFilterSettings: S.optional(__S(234, __c7, 10)),
          AudioSelectorGroups: S.optional(__mapOfAudioSelectorGroup),
          AudioSelectors: S.optional(__mapOfAudioSelector),
          CaptionSelectors: S.optional(__mapOfCaptionSelector),
          Crop: S.optional(__S(100, __c3, 4)),
          DeblockFilter: S.optional(S.String),
          DecryptionSettings: S.optional(__S(352, __c11, 0)),
          DenoiseFilter: S.optional(S.String),
          DolbyVisionMetadataXml: S.optional(S.String),
          DynamicAudioSelectors: S.optional(__mapOfDynamicAudioSelector),
          FileInput: S.optional(S.String),
          FilterEnable: S.optional(S.String),
          FilterStrength: S.optional(S.Number),
          ImageInserter: S.optional(__S(103, __c3, 7)),
          InputClippings: S.optional(__listOfInputClipping),
          InputScanType: S.optional(S.String),
          MultiViewSettings: S.optional(__listOfMultiViewSettings),
          Position: S.optional(__S(100, __c3, 4)),
          ProgramNumber: S.optional(S.Number),
          PsiControl: S.optional(S.String),
          SupplementalImps: S.optional(__listOf__stringPatternS3ASSETMAPXml),
          TamsSettings: S.optional(__S(353, __c11, 1)),
          TimecodeSource: S.optional(S.String),
          TimecodeStart: S.optional(S.String),
          VideoGenerator: S.optional(__S(354, __c11, 2)),
          VideoOverlays: S.optional(__listOfVideoOverlay),
          VideoSelector: S.optional(__S(264, __c8, 8)),
        }).pipe(
          S.encodeKeys({
            AdvancedInputFilter: "advancedInputFilter",
            AdvancedInputFilterSettings: "advancedInputFilterSettings",
            AudioSelectorGroups: "audioSelectorGroups",
            AudioSelectors: "audioSelectors",
            CaptionSelectors: "captionSelectors",
            Crop: "crop",
            DeblockFilter: "deblockFilter",
            DecryptionSettings: "decryptionSettings",
            DenoiseFilter: "denoiseFilter",
            DolbyVisionMetadataXml: "dolbyVisionMetadataXml",
            DynamicAudioSelectors: "dynamicAudioSelectors",
            FileInput: "fileInput",
            FilterEnable: "filterEnable",
            FilterStrength: "filterStrength",
            ImageInserter: "imageInserter",
            InputClippings: "inputClippings",
            InputScanType: "inputScanType",
            MultiViewSettings: "multiViewSettings",
            Position: "position",
            ProgramNumber: "programNumber",
            PsiControl: "psiControl",
            SupplementalImps: "supplementalImps",
            TamsSettings: "tamsSettings",
            TimecodeSource: "timecodeSource",
            TimecodeStart: "timecodeStart",
            VideoGenerator: "videoGenerator",
            VideoOverlays: "videoOverlays",
            VideoSelector: "videoSelector",
          }),
        ),
      ).annotate({ identifier: "Input" });
    case 4:
      return S.Array(__S(355, __c11, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          AdAvailOffset: S.optional(S.Number),
          AvailBlanking: S.optional(__S(227, __c7, 3)),
          ColorConversion3DLUTSettings: S.optional(__listOfColorConversion3DLUTSetting),
          Esam: S.optional(__S(232, __c7, 8)),
          ExtendedDataServices: S.optional(__S(233, __c7, 9)),
          FollowSource: S.optional(S.Number),
          Inputs: S.optional(__listOfInput),
          KantarWatermark: S.optional(__S(265, __c8, 9)),
          MotionImageInserter: S.optional(__S(267, __c8, 11)),
          MotionImageInserters: S.optional(__listOfMotionImageInserter),
          NielsenConfiguration: S.optional(__S(269, __c8, 13)),
          NielsenNonLinearWatermark: S.optional(__S(270, __c8, 14)),
          OutputGroups: S.optional(__listOfOutputGroup),
          TimecodeConfig: S.optional(__S(311, __c9, 23)),
          TimedMetadataInsertion: S.optional(__S(314, __c9, 26)),
        }).pipe(
          S.encodeKeys({
            AdAvailOffset: "adAvailOffset",
            AvailBlanking: "availBlanking",
            ColorConversion3DLUTSettings: "colorConversion3DLUTSettings",
            Esam: "esam",
            ExtendedDataServices: "extendedDataServices",
            FollowSource: "followSource",
            Inputs: "inputs",
            KantarWatermark: "kantarWatermark",
            MotionImageInserter: "motionImageInserter",
            MotionImageInserters: "motionImageInserters",
            NielsenConfiguration: "nielsenConfiguration",
            NielsenNonLinearWatermark: "nielsenNonLinearWatermark",
            OutputGroups: "outputGroups",
            TimecodeConfig: "timecodeConfig",
            TimedMetadataInsertion: "timedMetadataInsertion",
          }),
        ),
      ).annotate({ identifier: "JobSettings" });
    case 6:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String), FeedManagementState: S.optional(S.String) }).pipe(
          S.encodeKeys({ Arn: "arn", FeedManagementState: "feedManagementState" }),
        ),
      ).annotate({ identifier: "ElementalInferenceFeed" });
    case 7:
      return S.Array(__S(358, __c11, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          Features: S.optional(__listOfElementalInferenceFeature),
          Feeds: S.optional(__listOfElementalInferenceFeed),
        }).pipe(S.encodeKeys({ Features: "features", Feeds: "feeds" })),
      ).annotate({ identifier: "ElementalInferenceConfiguration" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          Info: S.optional(__listOf__string),
          Warning: S.optional(__listOf__string),
        }).pipe(S.encodeKeys({ Info: "info", Warning: "warning" })),
      ).annotate({ identifier: "JobMessages" });
    case 10:
      return S.suspend(() =>
        S.Struct({ HeightInPx: S.optional(S.Number), WidthInPx: S.optional(S.Number) }).pipe(
          S.encodeKeys({ HeightInPx: "heightInPx", WidthInPx: "widthInPx" }),
        ),
      ).annotate({ identifier: "VideoDetail" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          DurationInMs: S.optional(S.Number),
          VideoDetails: S.optional(__S(362, __c11, 10)),
        }).pipe(S.encodeKeys({ DurationInMs: "durationInMs", VideoDetails: "videoDetails" })),
      ).annotate({ identifier: "OutputDetail" });
    case 12:
      return S.Array(__S(363, __c11, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({ OutputDetails: S.optional(__listOfOutputDetail) }).pipe(
          S.encodeKeys({ OutputDetails: "outputDetails" }),
        ),
      ).annotate({ identifier: "OutputGroupDetail" });
    case 14:
      return S.Array(__S(365, __c11, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          DestinationQueue: S.optional(S.String),
          SourceQueue: S.optional(S.String),
          Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(
          S.encodeKeys({
            DestinationQueue: "destinationQueue",
            SourceQueue: "sourceQueue",
            Timestamp: "timestamp",
          }),
        ),
      ).annotate({ identifier: "QueueTransition" });
    case 16:
      return S.Array(__S(367, __c11, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({
          FinishTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SubmitTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(
          S.encodeKeys({
            FinishTime: "finishTime",
            StartTime: "startTime",
            SubmitTime: "submitTime",
          }),
        ),
      ).annotate({ identifier: "Timing" });
    case 18:
      return S.suspend(() =>
        S.Struct({ Code: S.optional(S.Number), Count: S.optional(S.Number) }).pipe(
          S.encodeKeys({ Code: "code", Count: "count" }),
        ),
      ).annotate({ identifier: "WarningGroup" });
    case 19:
      return S.Array(__S(370, __c11, 18));
    case 20:
      return S.suspend(() =>
        S.Struct({
          AccelerationSettings: S.optional(__S(224, __c7, 0)),
          AccelerationStatus: S.optional(S.String),
          Arn: S.optional(S.String),
          BillingTagsSource: S.optional(S.String),
          ClientRequestToken: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CurrentPhase: S.optional(S.String),
          ElementalInferenceConfiguration: S.optional(__S(360, __c11, 8)),
          ErrorCode: S.optional(S.Number),
          ErrorMessage: S.optional(S.String),
          HopDestinations: S.optional(__listOfHopDestination),
          Id: S.optional(S.String),
          JobEngineVersionRequested: S.optional(S.String),
          JobEngineVersionUsed: S.optional(S.String),
          JobPercentComplete: S.optional(S.Number),
          JobTemplate: S.optional(S.String),
          LastShareDetails: S.optional(S.String),
          Messages: S.optional(__S(361, __c11, 9)),
          OutputGroupDetails: S.optional(__listOfOutputGroupDetail),
          Priority: S.optional(S.Number),
          Queue: S.optional(S.String),
          QueueTransitions: S.optional(__listOfQueueTransition),
          RetryCount: S.optional(S.Number),
          Role: S.optional(S.String),
          Settings: S.optional(__S(357, __c11, 5)),
          ShareStatus: S.optional(S.String),
          SimulateReservedQueue: S.optional(S.String),
          Status: S.optional(S.String),
          StatusUpdateInterval: S.optional(S.String),
          Timing: S.optional(__S(369, __c11, 17)),
          UserMetadata: S.optional(__mapOf__string),
          Warnings: S.optional(__listOfWarningGroup),
        }).pipe(
          S.encodeKeys({
            AccelerationSettings: "accelerationSettings",
            AccelerationStatus: "accelerationStatus",
            Arn: "arn",
            BillingTagsSource: "billingTagsSource",
            ClientRequestToken: "clientRequestToken",
            CreatedAt: "createdAt",
            CurrentPhase: "currentPhase",
            ElementalInferenceConfiguration: "elementalInferenceConfiguration",
            ErrorCode: "errorCode",
            ErrorMessage: "errorMessage",
            HopDestinations: "hopDestinations",
            Id: "id",
            JobEngineVersionRequested: "jobEngineVersionRequested",
            JobEngineVersionUsed: "jobEngineVersionUsed",
            JobPercentComplete: "jobPercentComplete",
            JobTemplate: "jobTemplate",
            LastShareDetails: "lastShareDetails",
            Messages: "messages",
            OutputGroupDetails: "outputGroupDetails",
            Priority: "priority",
            Queue: "queue",
            QueueTransitions: "queueTransitions",
            RetryCount: "retryCount",
            Role: "role",
            Settings: "settings",
            ShareStatus: "shareStatus",
            SimulateReservedQueue: "simulateReservedQueue",
            Status: "status",
            StatusUpdateInterval: "statusUpdateInterval",
            Timing: "timing",
            UserMetadata: "userMetadata",
            Warnings: "warnings",
          }),
        ),
      ).annotate({ identifier: "Job" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccelerationSettings: S.optional(__S(224, __c7, 0)),
          Category: S.optional(S.String),
          Description: S.optional(S.String),
          HopDestinations: S.optional(__listOfHopDestination),
          Name: S.optional(S.String),
          Priority: S.optional(S.Number),
          Queue: S.optional(S.String),
          Settings: S.optional(__S(418, __c13, 2)),
          StatusUpdateInterval: S.optional(S.String),
          Tags: S.optional(__mapOf__string),
        })
          .pipe(
            S.encodeKeys({
              AccelerationSettings: "accelerationSettings",
              Category: "category",
              Description: "description",
              HopDestinations: "hopDestinations",
              Name: "name",
              Priority: "priority",
              Queue: "queue",
              Settings: "settings",
              StatusUpdateInterval: "statusUpdateInterval",
              Tags: "tags",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/2017-08-29/jobTemplates" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateJobTemplateRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AdvancedInputFilter: S.optional(S.String),
          AdvancedInputFilterSettings: S.optional(__S(234, __c7, 10)),
          AudioSelectorGroups: S.optional(__mapOfAudioSelectorGroup),
          AudioSelectors: S.optional(__mapOfAudioSelector),
          CaptionSelectors: S.optional(__mapOfCaptionSelector),
          Crop: S.optional(__S(100, __c3, 4)),
          DeblockFilter: S.optional(S.String),
          DenoiseFilter: S.optional(S.String),
          DolbyVisionMetadataXml: S.optional(S.String),
          DynamicAudioSelectors: S.optional(__mapOfDynamicAudioSelector),
          FilterEnable: S.optional(S.String),
          FilterStrength: S.optional(S.Number),
          ImageInserter: S.optional(__S(103, __c3, 7)),
          InputClippings: S.optional(__listOfInputClipping),
          InputScanType: S.optional(S.String),
          MultiViewSettings: S.optional(__listOfMultiViewSettings),
          Position: S.optional(__S(100, __c3, 4)),
          ProgramNumber: S.optional(S.Number),
          PsiControl: S.optional(S.String),
          TimecodeSource: S.optional(S.String),
          TimecodeStart: S.optional(S.String),
          VideoOverlays: S.optional(__listOfVideoOverlay),
          VideoSelector: S.optional(__S(264, __c8, 8)),
        }).pipe(
          S.encodeKeys({
            AdvancedInputFilter: "advancedInputFilter",
            AdvancedInputFilterSettings: "advancedInputFilterSettings",
            AudioSelectorGroups: "audioSelectorGroups",
            AudioSelectors: "audioSelectors",
            CaptionSelectors: "captionSelectors",
            Crop: "crop",
            DeblockFilter: "deblockFilter",
            DenoiseFilter: "denoiseFilter",
            DolbyVisionMetadataXml: "dolbyVisionMetadataXml",
            DynamicAudioSelectors: "dynamicAudioSelectors",
            FilterEnable: "filterEnable",
            FilterStrength: "filterStrength",
            ImageInserter: "imageInserter",
            InputClippings: "inputClippings",
            InputScanType: "inputScanType",
            MultiViewSettings: "multiViewSettings",
            Position: "position",
            ProgramNumber: "programNumber",
            PsiControl: "psiControl",
            TimecodeSource: "timecodeSource",
            TimecodeStart: "timecodeStart",
            VideoOverlays: "videoOverlays",
            VideoSelector: "videoSelector",
          }),
        ),
      ).annotate({ identifier: "InputTemplate" });
    case 1:
      return S.Array(__S(416, __c13, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          AdAvailOffset: S.optional(S.Number),
          AvailBlanking: S.optional(__S(227, __c7, 3)),
          ColorConversion3DLUTSettings: S.optional(__listOfColorConversion3DLUTSetting),
          Esam: S.optional(__S(232, __c7, 8)),
          ExtendedDataServices: S.optional(__S(233, __c7, 9)),
          FollowSource: S.optional(S.Number),
          Inputs: S.optional(__listOfInputTemplate),
          KantarWatermark: S.optional(__S(265, __c8, 9)),
          MotionImageInserter: S.optional(__S(267, __c8, 11)),
          MotionImageInserters: S.optional(__listOfMotionImageInserter),
          NielsenConfiguration: S.optional(__S(269, __c8, 13)),
          NielsenNonLinearWatermark: S.optional(__S(270, __c8, 14)),
          OutputGroups: S.optional(__listOfOutputGroup),
          TimecodeConfig: S.optional(__S(311, __c9, 23)),
          TimedMetadataInsertion: S.optional(__S(314, __c9, 26)),
        }).pipe(
          S.encodeKeys({
            AdAvailOffset: "adAvailOffset",
            AvailBlanking: "availBlanking",
            ColorConversion3DLUTSettings: "colorConversion3DLUTSettings",
            Esam: "esam",
            ExtendedDataServices: "extendedDataServices",
            FollowSource: "followSource",
            Inputs: "inputs",
            KantarWatermark: "kantarWatermark",
            MotionImageInserter: "motionImageInserter",
            MotionImageInserters: "motionImageInserters",
            NielsenConfiguration: "nielsenConfiguration",
            NielsenNonLinearWatermark: "nielsenNonLinearWatermark",
            OutputGroups: "outputGroups",
            TimecodeConfig: "timecodeConfig",
            TimedMetadataInsertion: "timedMetadataInsertion",
          }),
        ),
      ).annotate({ identifier: "JobTemplateSettings" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AccelerationSettings: S.optional(__S(224, __c7, 0)),
          Arn: S.optional(S.String),
          Category: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Description: S.optional(S.String),
          HopDestinations: S.optional(__listOfHopDestination),
          LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Name: S.optional(S.String),
          Priority: S.optional(S.Number),
          Queue: S.optional(S.String),
          Settings: S.optional(__S(418, __c13, 2)),
          StatusUpdateInterval: S.optional(S.String),
          Type: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AccelerationSettings: "accelerationSettings",
            Arn: "arn",
            Category: "category",
            CreatedAt: "createdAt",
            Description: "description",
            HopDestinations: "hopDestinations",
            LastUpdated: "lastUpdated",
            Name: "name",
            Priority: "priority",
            Queue: "queue",
            Settings: "settings",
            StatusUpdateInterval: "statusUpdateInterval",
            Type: "type",
          }),
        ),
      ).annotate({ identifier: "JobTemplate" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobTemplate: S.optional(__S(419, __c13, 3)) }).pipe(
          S.encodeKeys({ JobTemplate: "jobTemplate" }),
        ),
      ).annotate({ identifier: "CreateJobTemplateResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Category: S.optional(S.String),
          Description: S.optional(S.String),
          Name: S.optional(S.String),
          Settings: S.optional(__S(514, __c16, 2)),
          Tags: S.optional(__mapOf__string),
        })
          .pipe(
            S.encodeKeys({
              Category: "category",
              Description: "description",
              Name: "name",
              Settings: "settings",
              Tags: "tags",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/2017-08-29/presets" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreatePresetRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CustomLanguageCode: S.optional(S.String),
          DestinationSettings: S.optional(__S(131, __c4, 3)),
          LanguageCode: S.optional(S.String),
          LanguageDescription: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            CustomLanguageCode: "customLanguageCode",
            DestinationSettings: "destinationSettings",
            LanguageCode: "languageCode",
            LanguageDescription: "languageDescription",
          }),
        ),
      ).annotate({ identifier: "CaptionDescriptionPreset" });
    case 1:
      return S.Array(__S(512, __c16, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          AudioDescriptions: S.optional(__listOfAudioDescription),
          CaptionDescriptions: S.optional(__listOfCaptionDescriptionPreset),
          ContainerSettings: S.optional(__S(145, __c4, 17)),
          VideoDescription: S.optional(__S(183, __c5, 23)),
        }).pipe(
          S.encodeKeys({
            AudioDescriptions: "audioDescriptions",
            CaptionDescriptions: "captionDescriptions",
            ContainerSettings: "containerSettings",
            VideoDescription: "videoDescription",
          }),
        ),
      ).annotate({ identifier: "PresetSettings" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Category: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Description: S.optional(S.String),
          LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Name: S.optional(S.String),
          Settings: S.optional(__S(514, __c16, 2)),
          Type: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            Category: "category",
            CreatedAt: "createdAt",
            Description: "description",
            LastUpdated: "lastUpdated",
            Name: "name",
            Settings: "settings",
            Type: "type",
          }),
        ),
      ).annotate({ identifier: "Preset" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Preset: S.optional(__S(515, __c16, 3)) }).pipe(
          S.encodeKeys({ Preset: "preset" }),
        ),
      ).annotate({ identifier: "CreatePresetResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConcurrentJobs: S.optional(S.Number),
          Description: S.optional(S.String),
          MaximumConcurrentFeeds: S.optional(S.Number),
          Name: S.optional(S.String),
          PricingPlan: S.optional(S.String),
          ReservationPlanSettings: S.optional(__S(672, __c21, 0)),
          Status: S.optional(S.String),
          Tags: S.optional(__mapOf__string),
        })
          .pipe(
            S.encodeKeys({
              ConcurrentJobs: "concurrentJobs",
              Description: "description",
              MaximumConcurrentFeeds: "maximumConcurrentFeeds",
              Name: "name",
              PricingPlan: "pricingPlan",
              ReservationPlanSettings: "reservationPlanSettings",
              Status: "status",
              Tags: "tags",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/2017-08-29/queues" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateQueueRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Commitment: S.optional(S.String),
          ExpiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          PurchasedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RenewalType: S.optional(S.String),
          ReservedSlots: S.optional(S.Number),
          Status: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Commitment: "commitment",
            ExpiresAt: "expiresAt",
            PurchasedAt: "purchasedAt",
            RenewalType: "renewalType",
            ReservedSlots: "reservedSlots",
            Status: "status",
          }),
        ),
      ).annotate({ identifier: "ReservationPlan" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Message: S.optional(S.String),
          Name: S.optional(S.String),
          OverrideValue: S.optional(S.String),
          Value: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Message: "message",
            Name: "name",
            OverrideValue: "overrideValue",
            Value: "value",
          }),
        ),
      ).annotate({ identifier: "ServiceOverride" });
    case 2:
      return S.Array(__S(609, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          ConcurrentJobs: S.optional(S.Number),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Description: S.optional(S.String),
          LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          MaximumConcurrentFeeds: S.optional(S.Number),
          Name: S.optional(S.String),
          PricingPlan: S.optional(S.String),
          ProgressingJobsCount: S.optional(S.Number),
          ReservationPlan: S.optional(__S(608, __c19, 0)),
          ServiceOverrides: S.optional(__listOfServiceOverride),
          Status: S.optional(S.String),
          SubmittedJobsCount: S.optional(S.Number),
          Type: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            ConcurrentJobs: "concurrentJobs",
            CreatedAt: "createdAt",
            Description: "description",
            LastUpdated: "lastUpdated",
            MaximumConcurrentFeeds: "maximumConcurrentFeeds",
            Name: "name",
            PricingPlan: "pricingPlan",
            ProgressingJobsCount: "progressingJobsCount",
            ReservationPlan: "reservationPlan",
            ServiceOverrides: "serviceOverrides",
            Status: "status",
            SubmittedJobsCount: "submittedJobsCount",
            Type: "type",
          }),
        ),
      ).annotate({ identifier: "Queue" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Queue: S.optional(__S(611, __c19, 3)) }).pipe(S.encodeKeys({ Queue: "queue" })),
      ).annotate({ identifier: "CreateQueueResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Commitment: S.optional(S.String),
          RenewalType: S.optional(S.String),
          ReservedSlots: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            Commitment: "commitment",
            RenewalType: "renewalType",
            ReservedSlots: "reservedSlots",
          }),
        ),
      ).annotate({ identifier: "ReservationPlanSettings" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.optional(S.String), SupportCaseId: S.optional(S.String) })
          .pipe(S.encodeKeys({ JobId: "jobId", SupportCaseId: "supportCaseId" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/2017-08-29/resourceShares" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateResourceShareRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2017-08-29/jobTemplates/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteJobTemplateRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2017-08-29/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePolicyRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2017-08-29/presets/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePresetRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2017-08-29/queues/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteQueueRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          Mode: S.optional(S.String),
          NextToken: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ MaxResults: "maxResults", Mode: "mode", NextToken: "nextToken" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/2017-08-29/endpoints" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "DescribeEndpointsRequest" });
    case 1:
      return S.Array(Endpoint);
    case 2:
      return S.suspend(() =>
        S.Struct({ Endpoints: S.optional(__listOfEndpoint), NextToken: S.optional(S.String) }).pipe(
          S.encodeKeys({ Endpoints: "endpoints", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "DescribeEndpointsResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2017-08-29/certificates/{Arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateCertificateRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2017-08-29/jobs/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetJobRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2017-08-29/jobsQueries/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetJobsQueryResultsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Jobs: S.optional(__listOfJob),
          NextToken: S.optional(S.String),
          Status: S.optional(S.String),
        }).pipe(S.encodeKeys({ Jobs: "jobs", NextToken: "nextToken", Status: "status" })),
      ).annotate({ identifier: "GetJobsQueryResultsResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(372, __c11, 20));
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2017-08-29/jobTemplates/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetJobTemplateRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/2017-08-29/policy" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetPolicyRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HttpInputs: S.optional(S.String),
          HttpsInputs: S.optional(S.String),
          S3Inputs: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            HttpInputs: "httpInputs",
            HttpsInputs: "httpsInputs",
            S3Inputs: "s3Inputs",
          }),
        ),
      ).annotate({ identifier: "Policy" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Policy: S.optional(__S(1088, __c34, 0)) }).pipe(
          S.encodeKeys({ Policy: "policy" }),
        ),
      ).annotate({ identifier: "GetPolicyResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2017-08-29/presets/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPresetRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2017-08-29/queues/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetQueueRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          Order: S.optional(S.String).pipe(T.HttpQuery("order")),
          Queue: S.optional(S.String).pipe(T.HttpQuery("queue")),
          Status: S.optional(S.String).pipe(T.HttpQuery("status")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/2017-08-29/jobs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListJobsRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Jobs: S.optional(__listOfJob), NextToken: S.optional(S.String) }).pipe(
          S.encodeKeys({ Jobs: "jobs", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "ListJobsResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Category: S.optional(S.String).pipe(T.HttpQuery("category")),
          ListBy: S.optional(S.String).pipe(T.HttpQuery("listBy")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          Order: S.optional(S.String).pipe(T.HttpQuery("order")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2017-08-29/jobTemplates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListJobTemplatesRequest" });
    case 1:
      return S.Array(__S(419, __c13, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({
          JobTemplates: S.optional(__listOfJobTemplate),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ JobTemplates: "jobTemplates", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListJobTemplatesResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Category: S.optional(S.String).pipe(T.HttpQuery("category")),
          ListBy: S.optional(S.String).pipe(T.HttpQuery("listBy")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          Order: S.optional(S.String).pipe(T.HttpQuery("order")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2017-08-29/presets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPresetsRequest" });
    case 1:
      return S.Array(__S(515, __c16, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Presets: S.optional(__listOfPreset) }).pipe(
          S.encodeKeys({ NextToken: "nextToken", Presets: "presets" }),
        ),
      ).annotate({ identifier: "ListPresetsResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ListBy: S.optional(S.String).pipe(T.HttpQuery("listBy")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          Order: S.optional(S.String).pipe(T.HttpQuery("order")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/2017-08-29/queues" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListQueuesRequest" });
    case 1:
      return S.Array(__S(611, __c19, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          Queues: S.optional(__listOfQueue),
          TotalConcurrentJobs: S.optional(S.Number),
          UnallocatedConcurrentJobs: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            NextToken: "nextToken",
            Queues: "queues",
            TotalConcurrentJobs: "totalConcurrentJobs",
            UnallocatedConcurrentJobs: "unallocatedConcurrentJobs",
          }),
        ),
      ).annotate({ identifier: "ListQueuesResponse" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2017-08-29/tags/{Arn}" }),
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
        S.Struct({ Arn: S.optional(S.String), Tags: S.optional(__mapOf__string) }).pipe(
          S.encodeKeys({ Arn: "arn", Tags: "tags" }),
        ),
      ).annotate({ identifier: "ResourceTags" });
    case 2:
      return S.suspend(() =>
        S.Struct({ ResourceTags: S.optional(__S(1345, __c42, 1)) }).pipe(
          S.encodeKeys({ ResourceTags: "resourceTags" }),
        ),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2017-08-29/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ExpirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Version: S.optional(S.String),
        }).pipe(S.encodeKeys({ ExpirationDate: "expirationDate", Version: "version" })),
      ).annotate({ identifier: "JobEngineVersion" });
    case 2:
      return S.Array(__S(1377, __c43, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          Versions: S.optional(__listOfJobEngineVersion),
        }).pipe(S.encodeKeys({ NextToken: "nextToken", Versions: "versions" })),
      ).annotate({ identifier: "ListVersionsResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FileUrl: S.optional(S.String) }).pipe(S.encodeKeys({ FileUrl: "fileUrl" })),
      ).annotate({ identifier: "ProbeInputFile" });
    case 1:
      return S.Array(__S(1408, __c44, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ InputFiles: S.optional(__listOfProbeInputFile) })
          .pipe(S.encodeKeys({ InputFiles: "inputFiles" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/2017-08-29/probe" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "ProbeRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Denominator: S.optional(S.Number), Numerator: S.optional(S.Number) }).pipe(
          S.encodeKeys({ Denominator: "denominator", Numerator: "numerator" }),
        ),
      ).annotate({ identifier: "FrameRate" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          BitDepth: S.optional(S.Number),
          BitRate: S.optional(S.Number),
          ChannelLayout: S.optional(S.String),
          Channels: S.optional(S.Number),
          FrameRate: S.optional(__S(1411, __c44, 3)),
          LanguageCode: S.optional(S.String),
          ObjectCount: S.optional(S.Number),
          SampleRate: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            BitDepth: "bitDepth",
            BitRate: "bitRate",
            ChannelLayout: "channelLayout",
            Channels: "channels",
            FrameRate: "frameRate",
            LanguageCode: "languageCode",
            ObjectCount: "objectCount",
            SampleRate: "sampleRate",
          }),
        ),
      ).annotate({ identifier: "AudioProperties" });
    case 5:
      return S.suspend(() =>
        S.Struct({ LanguageCode: S.optional(S.String) }).pipe(
          S.encodeKeys({ LanguageCode: "languageCode" }),
        ),
      ).annotate({ identifier: "DataProperties" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          MaxContentLightLevel: S.optional(S.Number),
          MaxFrameAverageLightLevel: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            MaxContentLightLevel: "maxContentLightLevel",
            MaxFrameAverageLightLevel: "maxFrameAverageLightLevel",
          }),
        ),
      ).annotate({ identifier: "ContentLightLevel" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          BaseLayer: S.optional(S.String),
          EnhancementLayer: S.optional(S.String),
          Level: S.optional(S.Number),
          Profile: S.optional(S.Number),
          Rpu: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            BaseLayer: "baseLayer",
            EnhancementLayer: "enhancementLayer",
            Level: "level",
            Profile: "profile",
            Rpu: "rpu",
          }),
        ),
      ).annotate({ identifier: "DolbyVisionMetadata" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          BitDepth: S.optional(S.Number),
          ChromaSubsampling: S.optional(S.String),
          CodedFrameRate: S.optional(__S(1411, __c44, 3)),
          ColorPrimaries: S.optional(S.String),
          ContentLightLevel: S.optional(__S(1414, __c44, 6)),
          DisplayAspectRatio: S.optional(__S(1411, __c44, 3)),
          DolbyVision: S.optional(__S(1415, __c44, 7)),
          FieldOrder: S.optional(S.String),
          Hdr10PlusPresence: S.optional(S.String),
          Height: S.optional(S.Number),
          Level: S.optional(S.String),
          MatrixCoefficients: S.optional(S.String),
          Profile: S.optional(S.String),
          Rotation: S.optional(S.Number),
          SampleAspectRatio: S.optional(__S(1411, __c44, 3)),
          ScanType: S.optional(S.String),
          TransferCharacteristics: S.optional(S.String),
          Width: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            BitDepth: "bitDepth",
            ChromaSubsampling: "chromaSubsampling",
            CodedFrameRate: "codedFrameRate",
            ColorPrimaries: "colorPrimaries",
            ContentLightLevel: "contentLightLevel",
            DisplayAspectRatio: "displayAspectRatio",
            DolbyVision: "dolbyVision",
            FieldOrder: "fieldOrder",
            Hdr10PlusPresence: "hdr10PlusPresence",
            Height: "height",
            Level: "level",
            MatrixCoefficients: "matrixCoefficients",
            Profile: "profile",
            Rotation: "rotation",
            SampleAspectRatio: "sampleAspectRatio",
            ScanType: "scanType",
            TransferCharacteristics: "transferCharacteristics",
            Width: "width",
          }),
        ),
      ).annotate({ identifier: "CodecMetadata" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          BluePrimaryX: S.optional(S.Number),
          BluePrimaryY: S.optional(S.Number),
          GreenPrimaryX: S.optional(S.Number),
          GreenPrimaryY: S.optional(S.Number),
          MaxLuminance: S.optional(S.Number),
          MinLuminance: S.optional(S.Number),
          RedPrimaryX: S.optional(S.Number),
          RedPrimaryY: S.optional(S.Number),
          WhitePointX: S.optional(S.Number),
          WhitePointY: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            BluePrimaryX: "bluePrimaryX",
            BluePrimaryY: "bluePrimaryY",
            GreenPrimaryX: "greenPrimaryX",
            GreenPrimaryY: "greenPrimaryY",
            MaxLuminance: "maxLuminance",
            MinLuminance: "minLuminance",
            RedPrimaryX: "redPrimaryX",
            RedPrimaryY: "redPrimaryY",
            WhitePointX: "whitePointX",
            WhitePointY: "whitePointY",
          }),
        ),
      ).annotate({ identifier: "MasteringDisplayColorVolume" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          ContentLightLevel: S.optional(__S(1414, __c44, 6)),
          MasteringDisplayColorVolume: S.optional(__S(1417, __c44, 9)),
        }).pipe(
          S.encodeKeys({
            ContentLightLevel: "contentLightLevel",
            MasteringDisplayColorVolume: "masteringDisplayColorVolume",
          }),
        ),
      ).annotate({ identifier: "HdrMetadata" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          BitDepth: S.optional(S.Number),
          BitRate: S.optional(S.Number),
          CodecMetadata: S.optional(__S(1416, __c44, 8)),
          ColorPrimaries: S.optional(S.String),
          DisplayAspectRatio: S.optional(__S(1411, __c44, 3)),
          FrameRate: S.optional(__S(1411, __c44, 3)),
          HdrMetadata: S.optional(__S(1418, __c44, 10)),
          Height: S.optional(S.Number),
          MatrixCoefficients: S.optional(S.String),
          Rotation: S.optional(S.Number),
          SampleAspectRatio: S.optional(__S(1411, __c44, 3)),
          TransferCharacteristics: S.optional(S.String),
          Width: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            BitDepth: "bitDepth",
            BitRate: "bitRate",
            CodecMetadata: "codecMetadata",
            ColorPrimaries: "colorPrimaries",
            DisplayAspectRatio: "displayAspectRatio",
            FrameRate: "frameRate",
            HdrMetadata: "hdrMetadata",
            Height: "height",
            MatrixCoefficients: "matrixCoefficients",
            Rotation: "rotation",
            SampleAspectRatio: "sampleAspectRatio",
            TransferCharacteristics: "transferCharacteristics",
            Width: "width",
          }),
        ),
      ).annotate({ identifier: "VideoProperties" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          AudioProperties: S.optional(__S(1412, __c44, 4)),
          Codec: S.optional(S.String),
          DataProperties: S.optional(__S(1413, __c44, 5)),
          Duration: S.optional(S.Number),
          Index: S.optional(S.Number),
          TrackType: S.optional(S.String),
          VideoProperties: S.optional(__S(1419, __c44, 11)),
        }).pipe(
          S.encodeKeys({
            AudioProperties: "audioProperties",
            Codec: "codec",
            DataProperties: "dataProperties",
            Duration: "duration",
            Index: "index",
            TrackType: "trackType",
            VideoProperties: "videoProperties",
          }),
        ),
      ).annotate({ identifier: "Track" });
    case 13:
      return S.Array(__S(1420, __c44, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          BitRate: S.optional(S.Number),
          Duration: S.optional(S.Number),
          Format: S.optional(S.String),
          StartTimecode: S.optional(S.String),
          Tracks: S.optional(__listOfTrack),
        }).pipe(
          S.encodeKeys({
            BitRate: "bitRate",
            Duration: "duration",
            Format: "format",
            StartTimecode: "startTimecode",
            Tracks: "tracks",
          }),
        ),
      ).annotate({ identifier: "Container" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          ETag: S.optional(S.String),
          FileSize: S.optional(S.Number),
          LastModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          MimeType: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ETag: "eTag",
            FileSize: "fileSize",
            LastModified: "lastModified",
            MimeType: "mimeType",
          }),
        ),
      ).annotate({ identifier: "Metadata" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          AudioTrackIndexes: S.optional(__listOf__integer),
          DataTrackIndexes: S.optional(__listOf__integer),
          VideoTrackIndexes: S.optional(__listOf__integer),
        }).pipe(
          S.encodeKeys({
            AudioTrackIndexes: "audioTrackIndexes",
            DataTrackIndexes: "dataTrackIndexes",
            VideoTrackIndexes: "videoTrackIndexes",
          }),
        ),
      ).annotate({ identifier: "TrackMapping" });
    case 17:
      return S.Array(__S(1424, __c44, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({
          Container: S.optional(__S(1422, __c44, 14)),
          Metadata: S.optional(__S(1423, __c44, 15)),
          TrackMappings: S.optional(__listOfTrackMapping),
        }).pipe(
          S.encodeKeys({
            Container: "container",
            Metadata: "metadata",
            TrackMappings: "trackMappings",
          }),
        ),
      ).annotate({ identifier: "ProbeResult" });
    case 19:
      return S.Array(__S(1426, __c44, 18));
    case 20:
      return S.suspend(() =>
        S.Struct({ ProbeResults: S.optional(__listOfProbeResult) }).pipe(
          S.encodeKeys({ ProbeResults: "probeResults" }),
        ),
      ).annotate({ identifier: "ProbeResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Policy: S.optional(__S(1088, __c34, 0)) })
          .pipe(S.encodeKeys({ Policy: "policy" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/2017-08-29/policy" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "PutPolicyRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InputFile: S.optional(S.String).pipe(T.HttpQuery("inputFile")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          Order: S.optional(S.String).pipe(T.HttpQuery("order")),
          Queue: S.optional(S.String).pipe(T.HttpQuery("queue")),
          Status: S.optional(S.String).pipe(T.HttpQuery("status")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/2017-08-29/search" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SearchJobsRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Values: S.optional(__listOf__stringMax100) }).pipe(
          S.encodeKeys({ Key: "key", Values: "values" }),
        ),
      ).annotate({ identifier: "JobsQueryFilter" });
    case 1:
      return S.Array(__S(1504, __c47, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          FilterList: S.optional(__listOfJobsQueryFilter),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Order: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              FilterList: "filterList",
              MaxResults: "maxResults",
              NextToken: "nextToken",
              Order: "order",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/2017-08-29/jobsQueries" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "StartJobsQueryRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Id: S.optional(S.String) }).pipe(S.encodeKeys({ Id: "id" })),
      ).annotate({ identifier: "StartJobsQueryResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String), Tags: S.optional(__mapOf__string) })
          .pipe(S.encodeKeys({ Arn: "arn", Tags: "tags" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/2017-08-29/tags" }),
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
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")), TagKeys: S.optional(__listOf__string) })
          .pipe(S.encodeKeys({ TagKeys: "tagKeys" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/2017-08-29/tags/{Arn}" }),
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
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccelerationSettings: S.optional(__S(224, __c7, 0)),
          Category: S.optional(S.String),
          Description: S.optional(S.String),
          HopDestinations: S.optional(__listOfHopDestination),
          Name: S.String.pipe(T.HttpLabel("Name")),
          Priority: S.optional(S.Number),
          Queue: S.optional(S.String),
          Settings: S.optional(__S(418, __c13, 2)),
          StatusUpdateInterval: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              AccelerationSettings: "accelerationSettings",
              Category: "category",
              Description: "description",
              HopDestinations: "hopDestinations",
              Priority: "priority",
              Queue: "queue",
              Settings: "settings",
              StatusUpdateInterval: "statusUpdateInterval",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/2017-08-29/jobTemplates/{Name}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateJobTemplateRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Category: S.optional(S.String),
          Description: S.optional(S.String),
          Name: S.String.pipe(T.HttpLabel("Name")),
          Settings: S.optional(__S(514, __c16, 2)),
        })
          .pipe(
            S.encodeKeys({
              Category: "category",
              Description: "description",
              Settings: "settings",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/2017-08-29/presets/{Name}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdatePresetRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConcurrentJobs: S.optional(S.Number),
          Description: S.optional(S.String),
          MaximumConcurrentFeeds: S.optional(S.Number),
          Name: S.String.pipe(T.HttpLabel("Name")),
          ReservationPlanSettings: S.optional(__S(672, __c21, 0)),
          Status: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              ConcurrentJobs: "concurrentJobs",
              Description: "description",
              MaximumConcurrentFeeds: "maximumConcurrentFeeds",
              ReservationPlanSettings: "reservationPlanSettings",
              Status: "status",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/2017-08-29/queues/{Name}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateQueueRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String) })
          .pipe(S.encodeKeys({ Arn: "arn" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/2017-08-29/certificates" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "AssociateCertificateRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Url: S.optional(S.String) }).pipe(S.encodeKeys({ Url: "url" })),
      ).annotate({ identifier: "Endpoint" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "AssociateCertificateResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2017-08-29/jobs/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelJobRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
