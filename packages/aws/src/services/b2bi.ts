import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_0Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "b2bi",
  target: "B2BI",
  version: "2022-06-23",
  sigv4: "b2bi",
  protocol: awsJson1_0Protocol,
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
                `https://b2bi-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://b2bi-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://b2bi.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://b2bi.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
    readonly serviceCode: string;
    readonly quotaCode: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export type CapabilityName = string;
export type CapabilityType = "edi" | (string & {});
export type CapabilityDirection = "INBOUND" | "OUTBOUND" | (string & {});
export type X12TransactionSet =
  | "X12_100"
  | "X12_101"
  | "X12_102"
  | "X12_103"
  | "X12_104"
  | "X12_105"
  | "X12_106"
  | "X12_107"
  | "X12_108"
  | "X12_109"
  | "X12_110"
  | "X12_111"
  | "X12_112"
  | "X12_113"
  | "X12_120"
  | "X12_121"
  | "X12_124"
  | "X12_125"
  | "X12_126"
  | "X12_127"
  | "X12_128"
  | "X12_129"
  | "X12_130"
  | "X12_131"
  | "X12_132"
  | "X12_133"
  | "X12_135"
  | "X12_138"
  | "X12_139"
  | "X12_140"
  | "X12_141"
  | "X12_142"
  | "X12_143"
  | "X12_144"
  | "X12_146"
  | "X12_147"
  | "X12_148"
  | "X12_149"
  | "X12_150"
  | "X12_151"
  | "X12_152"
  | "X12_153"
  | "X12_154"
  | "X12_155"
  | "X12_157"
  | "X12_158"
  | "X12_159"
  | "X12_160"
  | "X12_161"
  | "X12_163"
  | "X12_170"
  | "X12_175"
  | "X12_176"
  | "X12_179"
  | "X12_180"
  | "X12_185"
  | "X12_186"
  | "X12_187"
  | "X12_188"
  | "X12_189"
  | "X12_190"
  | "X12_191"
  | "X12_194"
  | "X12_195"
  | "X12_196"
  | "X12_197"
  | "X12_198"
  | "X12_199"
  | "X12_200"
  | "X12_201"
  | "X12_202"
  | "X12_203"
  | "X12_204"
  | "X12_205"
  | "X12_206"
  | "X12_210"
  | "X12_211"
  | "X12_212"
  | "X12_213"
  | "X12_214"
  | "X12_215"
  | "X12_216"
  | "X12_217"
  | "X12_218"
  | "X12_219"
  | "X12_220"
  | "X12_222"
  | "X12_223"
  | "X12_224"
  | "X12_225"
  | "X12_227"
  | "X12_228"
  | "X12_240"
  | "X12_242"
  | "X12_244"
  | "X12_245"
  | "X12_248"
  | "X12_249"
  | "X12_250"
  | "X12_251"
  | "X12_252"
  | "X12_255"
  | "X12_256"
  | "X12_259"
  | "X12_260"
  | "X12_261"
  | "X12_262"
  | "X12_263"
  | "X12_264"
  | "X12_265"
  | "X12_266"
  | "X12_267"
  | "X12_268"
  | "X12_269"
  | "X12_270"
  | "X12_271"
  | "X12_272"
  | "X12_273"
  | "X12_274"
  | "X12_275"
  | "X12_276"
  | "X12_277"
  | "X12_278"
  | "X12_280"
  | "X12_283"
  | "X12_284"
  | "X12_285"
  | "X12_286"
  | "X12_288"
  | "X12_290"
  | "X12_300"
  | "X12_301"
  | "X12_303"
  | "X12_304"
  | "X12_309"
  | "X12_310"
  | "X12_311"
  | "X12_312"
  | "X12_313"
  | "X12_315"
  | "X12_317"
  | "X12_319"
  | "X12_322"
  | "X12_323"
  | "X12_324"
  | "X12_325"
  | "X12_326"
  | "X12_350"
  | "X12_352"
  | "X12_353"
  | "X12_354"
  | "X12_355"
  | "X12_356"
  | "X12_357"
  | "X12_358"
  | "X12_361"
  | "X12_362"
  | "X12_404"
  | "X12_410"
  | "X12_412"
  | "X12_414"
  | "X12_417"
  | "X12_418"
  | "X12_419"
  | "X12_420"
  | "X12_421"
  | "X12_422"
  | "X12_423"
  | "X12_424"
  | "X12_425"
  | "X12_426"
  | "X12_429"
  | "X12_431"
  | "X12_432"
  | "X12_433"
  | "X12_434"
  | "X12_435"
  | "X12_436"
  | "X12_437"
  | "X12_440"
  | "X12_451"
  | "X12_452"
  | "X12_453"
  | "X12_455"
  | "X12_456"
  | "X12_460"
  | "X12_463"
  | "X12_466"
  | "X12_468"
  | "X12_470"
  | "X12_475"
  | "X12_485"
  | "X12_486"
  | "X12_490"
  | "X12_492"
  | "X12_494"
  | "X12_500"
  | "X12_501"
  | "X12_503"
  | "X12_504"
  | "X12_511"
  | "X12_517"
  | "X12_521"
  | "X12_527"
  | "X12_536"
  | "X12_540"
  | "X12_561"
  | "X12_567"
  | "X12_568"
  | "X12_601"
  | "X12_602"
  | "X12_620"
  | "X12_625"
  | "X12_650"
  | "X12_715"
  | "X12_753"
  | "X12_754"
  | "X12_805"
  | "X12_806"
  | "X12_810"
  | "X12_811"
  | "X12_812"
  | "X12_813"
  | "X12_814"
  | "X12_815"
  | "X12_816"
  | "X12_818"
  | "X12_819"
  | "X12_820"
  | "X12_821"
  | "X12_822"
  | "X12_823"
  | "X12_824"
  | "X12_826"
  | "X12_827"
  | "X12_828"
  | "X12_829"
  | "X12_830"
  | "X12_831"
  | "X12_832"
  | "X12_833"
  | "X12_834"
  | "X12_835"
  | "X12_836"
  | "X12_837"
  | "X12_838"
  | "X12_839"
  | "X12_840"
  | "X12_841"
  | "X12_842"
  | "X12_843"
  | "X12_844"
  | "X12_845"
  | "X12_846"
  | "X12_847"
  | "X12_848"
  | "X12_849"
  | "X12_850"
  | "X12_851"
  | "X12_852"
  | "X12_853"
  | "X12_854"
  | "X12_855"
  | "X12_856"
  | "X12_857"
  | "X12_858"
  | "X12_859"
  | "X12_860"
  | "X12_861"
  | "X12_862"
  | "X12_863"
  | "X12_864"
  | "X12_865"
  | "X12_866"
  | "X12_867"
  | "X12_868"
  | "X12_869"
  | "X12_870"
  | "X12_871"
  | "X12_872"
  | "X12_873"
  | "X12_874"
  | "X12_875"
  | "X12_876"
  | "X12_877"
  | "X12_878"
  | "X12_879"
  | "X12_880"
  | "X12_881"
  | "X12_882"
  | "X12_883"
  | "X12_884"
  | "X12_885"
  | "X12_886"
  | "X12_887"
  | "X12_888"
  | "X12_889"
  | "X12_891"
  | "X12_893"
  | "X12_894"
  | "X12_895"
  | "X12_896"
  | "X12_920"
  | "X12_924"
  | "X12_925"
  | "X12_926"
  | "X12_928"
  | "X12_940"
  | "X12_943"
  | "X12_944"
  | "X12_945"
  | "X12_947"
  | "X12_980"
  | "X12_990"
  | "X12_993"
  | "X12_996"
  | "X12_997"
  | "X12_998"
  | "X12_999"
  | "X12_270_X279"
  | "X12_271_X279"
  | "X12_275_X210"
  | "X12_275_X211"
  | "X12_276_X212"
  | "X12_277_X212"
  | "X12_277_X214"
  | "X12_277_X364"
  | "X12_278_X217"
  | "X12_820_X218"
  | "X12_820_X306"
  | "X12_824_X186"
  | "X12_834_X220"
  | "X12_834_X307"
  | "X12_834_X318"
  | "X12_835_X221"
  | "X12_837_X222"
  | "X12_837_X223"
  | "X12_837_X224"
  | "X12_837_X291"
  | "X12_837_X292"
  | "X12_837_X298"
  | "X12_999_X231"
  | (string & {});
export type X12Version =
  | "VERSION_4010"
  | "VERSION_4030"
  | "VERSION_4050"
  | "VERSION_4060"
  | "VERSION_5010"
  | "VERSION_5010_HIPAA"
  | (string & {});
export interface X12Details {
  transactionSet?: X12TransactionSet;
  version?: X12Version;
}
export type EdiType = { x12Details: X12Details };
export type BucketName = string;
export type S3Key = string;
export interface S3Location {
  bucketName?: string;
  key?: string;
}
export type TransformerId = string;
export interface EdiConfiguration {
  capabilityDirection?: CapabilityDirection;
  type: EdiType;
  inputLocation: S3Location;
  outputLocation: S3Location;
  transformerId: string;
}
export type CapabilityConfiguration = { edi: EdiConfiguration };
export type InstructionsDocuments = S3Location[];
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface CreateCapabilityRequest {
  name: string;
  type: CapabilityType;
  configuration: CapabilityConfiguration;
  instructionsDocuments?: S3Location[];
  clientToken?: string;
  tags?: Tag[];
}
export type CapabilityId = string;
export type ResourceArn = string;
export type CreatedDate = Date;
export interface CreateCapabilityResponse {
  capabilityId: string;
  capabilityArn: string;
  name: string;
  type: CapabilityType;
  configuration: CapabilityConfiguration;
  instructionsDocuments?: S3Location[];
  createdAt: Date;
}
export type ProfileId = string;
export type PartnerName = string;
export type Email = string | redacted.Redacted<string>;
export type Phone = string | redacted.Redacted<string>;
export type PartnershipCapabilities = string[];
export type X12IdQualifier = string;
export type X12SenderId = string;
export type X12ReceiverId = string;
export type X12RepetitionSeparator = string;
export type X12AcknowledgmentRequestedCode = string;
export type X12UsageIndicatorCode = string;
export interface X12InterchangeControlHeaders {
  senderIdQualifier?: string;
  senderId?: string;
  receiverIdQualifier?: string;
  receiverId?: string;
  repetitionSeparator?: string;
  acknowledgmentRequestedCode?: string;
  usageIndicatorCode?: string;
}
export type X12ApplicationSenderCode = string;
export type X12ApplicationReceiverCode = string;
export type X12ResponsibleAgencyCode = string;
export interface X12FunctionalGroupHeaders {
  applicationSenderCode?: string;
  applicationReceiverCode?: string;
  responsibleAgencyCode?: string;
}
export type X12ComponentSeparator = string;
export type X12DataElementSeparator = string;
export type X12SegmentTerminator = string;
export interface X12Delimiters {
  componentSeparator?: string;
  dataElementSeparator?: string;
  segmentTerminator?: string;
}
export type X12ValidateEdi = boolean;
export type StartingInterchangeControlNumber = number;
export type StartingFunctionalGroupControlNumber = number;
export type StartingTransactionSetControlNumber = number;
export interface X12ControlNumbers {
  startingInterchangeControlNumber?: number;
  startingFunctionalGroupControlNumber?: number;
  startingTransactionSetControlNumber?: number;
}
export type X12GS05TimeFormat = "HHMM" | "HHMMSS" | "HHMMSSDD" | (string & {});
export interface X12OutboundEdiHeaders {
  interchangeControlHeaders?: X12InterchangeControlHeaders;
  functionalGroupHeaders?: X12FunctionalGroupHeaders;
  delimiters?: X12Delimiters;
  validateEdi?: boolean;
  controlNumbers?: X12ControlNumbers;
  gs05TimeFormat?: X12GS05TimeFormat;
}
export type WrapFormat = "SEGMENT" | "ONE_LINE" | "LINE_LENGTH" | (string & {});
export type LineTerminator = "CRLF" | "LF" | "CR" | (string & {});
export type LineLength = number;
export interface WrapOptions {
  wrapBy: WrapFormat;
  lineTerminator?: LineTerminator;
  lineLength?: number;
}
export interface X12Envelope {
  common?: X12OutboundEdiHeaders;
  wrapOptions?: WrapOptions;
}
export type OutboundEdiOptions = { x12: X12Envelope };
export type X12FunctionalAcknowledgment =
  | "DO_NOT_GENERATE"
  | "GENERATE_ALL_SEGMENTS"
  | "GENERATE_WITHOUT_TRANSACTION_SET_RESPONSE_LOOP"
  | (string & {});
export type X12TechnicalAcknowledgment =
  | "DO_NOT_GENERATE"
  | "GENERATE_ALL_SEGMENTS"
  | (string & {});
export interface X12AcknowledgmentOptions {
  functionalAcknowledgment: X12FunctionalAcknowledgment;
  technicalAcknowledgment: X12TechnicalAcknowledgment;
}
export interface X12InboundEdiOptions {
  acknowledgmentOptions?: X12AcknowledgmentOptions;
}
export interface InboundEdiOptions {
  x12?: X12InboundEdiOptions;
}
export interface CapabilityOptions {
  outboundEdi?: OutboundEdiOptions;
  inboundEdi?: InboundEdiOptions;
}
export interface CreatePartnershipRequest {
  profileId: string;
  name: string;
  email: string | redacted.Redacted<string>;
  phone?: string | redacted.Redacted<string>;
  capabilities: string[];
  capabilityOptions?: CapabilityOptions;
  clientToken?: string;
  tags?: Tag[];
}
export type PartnershipId = string;
export type TradingPartnerId = string;
export interface CreatePartnershipResponse {
  profileId: string;
  partnershipId: string;
  partnershipArn: string;
  name?: string;
  email?: string | redacted.Redacted<string>;
  phone?: string | redacted.Redacted<string>;
  capabilities?: string[];
  capabilityOptions?: CapabilityOptions;
  tradingPartnerId?: string;
  createdAt: Date;
}
export type ProfileName = string;
export type BusinessName = string;
export type Logging = "ENABLED" | "DISABLED" | (string & {});
export interface CreateProfileRequest {
  name: string;
  email?: string | redacted.Redacted<string>;
  phone: string | redacted.Redacted<string>;
  businessName: string;
  logging: Logging;
  clientToken?: string;
  tags?: Tag[];
}
export type LogGroupName = string;
export interface CreateProfileResponse {
  profileId: string;
  profileArn: string;
  name: string;
  businessName: string;
  phone: string | redacted.Redacted<string>;
  email?: string | redacted.Redacted<string>;
  logging?: Logging;
  logGroupName?: string;
  createdAt: Date;
}
export type MappingType = "JSONATA" | "XSLT" | (string & {});
export type TemplateDetails = { x12: X12Details };
export interface CreateStarterMappingTemplateRequest {
  outputSampleLocation?: S3Location;
  mappingType: MappingType;
  templateDetails: TemplateDetails;
}
export interface CreateStarterMappingTemplateResponse {
  mappingTemplate: string;
}
export type TransformerName = string;
export type FileFormat = "XML" | "JSON" | "NOT_USED" | (string & {});
export type MappingTemplate = string;
export type FileLocation = string;
export type FromFormat = "X12" | (string & {});
export type FormatOptions = { x12: X12Details };
export type X12SplitBy = "NONE" | "TRANSACTION" | (string & {});
export interface X12SplitOptions {
  splitBy: X12SplitBy;
}
export type ElementId = string;
export type CodeList = string[];
export interface X12CodeListValidationRule {
  elementId: string;
  codesToAdd?: string[];
  codesToRemove?: string[];
}
export interface X12ElementLengthValidationRule {
  elementId: string;
  maxLength: number;
  minLength: number;
}
export type ElementPosition = string;
export type ElementRequirement = "OPTIONAL" | "MANDATORY" | (string & {});
export interface X12ElementRequirementValidationRule {
  elementPosition: string;
  requirement: ElementRequirement;
}
export type X12ValidationRule =
  | {
      codeListValidationRule: X12CodeListValidationRule;
      elementLengthValidationRule?: never;
      elementRequirementValidationRule?: never;
    }
  | {
      codeListValidationRule?: never;
      elementLengthValidationRule: X12ElementLengthValidationRule;
      elementRequirementValidationRule?: never;
    }
  | {
      codeListValidationRule?: never;
      elementLengthValidationRule?: never;
      elementRequirementValidationRule: X12ElementRequirementValidationRule;
    };
export type X12ValidationRules = X12ValidationRule[];
export interface X12ValidationOptions {
  validationRules?: X12ValidationRule[];
}
export interface X12AdvancedOptions {
  splitOptions?: X12SplitOptions;
  validationOptions?: X12ValidationOptions;
}
export interface AdvancedOptions {
  x12?: X12AdvancedOptions;
}
export interface InputConversion {
  fromFormat: FromFormat;
  formatOptions?: FormatOptions;
  advancedOptions?: AdvancedOptions;
}
export type MappingTemplateLanguage = "XSLT" | "JSONATA" | (string & {});
export interface Mapping {
  templateLanguage: MappingTemplateLanguage;
  template?: string;
}
export type ToFormat = "X12" | (string & {});
export interface OutputConversion {
  toFormat: ToFormat;
  formatOptions?: FormatOptions;
  advancedOptions?: AdvancedOptions;
}
export interface SampleDocumentKeys {
  input?: string;
  output?: string;
}
export type KeyList = SampleDocumentKeys[];
export interface SampleDocuments {
  bucketName: string;
  keys: SampleDocumentKeys[];
}
export interface CreateTransformerRequest {
  name: string;
  clientToken?: string;
  tags?: Tag[];
  fileFormat?: FileFormat;
  mappingTemplate?: string;
  ediType?: EdiType;
  sampleDocument?: string;
  inputConversion?: InputConversion;
  mapping?: Mapping;
  outputConversion?: OutputConversion;
  sampleDocuments?: SampleDocuments;
}
export type TransformerStatus = "active" | "inactive" | (string & {});
export interface CreateTransformerResponse {
  transformerId: string;
  transformerArn: string;
  name: string;
  status: TransformerStatus;
  createdAt: Date;
  fileFormat?: FileFormat;
  mappingTemplate?: string;
  ediType?: EdiType;
  sampleDocument?: string;
  inputConversion?: InputConversion;
  mapping?: Mapping;
  outputConversion?: OutputConversion;
  sampleDocuments?: SampleDocuments;
}
export interface DeleteCapabilityRequest {
  capabilityId: string;
}
export interface DeleteCapabilityResponse {}
export interface DeletePartnershipRequest {
  partnershipId: string;
}
export interface DeletePartnershipResponse {}
export interface DeleteProfileRequest {
  profileId: string;
}
export interface DeleteProfileResponse {}
export interface DeleteTransformerRequest {
  transformerId: string;
}
export interface DeleteTransformerResponse {}
export type GenerateMappingInputFileContent = string;
export type GenerateMappingOutputFileContent = string;
export interface GenerateMappingRequest {
  inputFileContent: string;
  outputFileContent: string;
  mappingType: MappingType;
}
export interface GenerateMappingResponse {
  mappingTemplate: string;
  mappingAccuracy?: number;
}
export interface GetCapabilityRequest {
  capabilityId: string;
}
export type ModifiedDate = Date;
export interface GetCapabilityResponse {
  capabilityId: string;
  capabilityArn: string;
  name: string;
  type: CapabilityType;
  configuration: CapabilityConfiguration;
  instructionsDocuments?: S3Location[];
  createdAt: Date;
  modifiedAt?: Date;
}
export interface GetPartnershipRequest {
  partnershipId: string;
}
export interface GetPartnershipResponse {
  profileId: string;
  partnershipId: string;
  partnershipArn: string;
  name?: string;
  email?: string | redacted.Redacted<string>;
  phone?: string | redacted.Redacted<string>;
  capabilities?: string[];
  capabilityOptions?: CapabilityOptions;
  tradingPartnerId?: string;
  createdAt: Date;
  modifiedAt?: Date;
}
export interface GetProfileRequest {
  profileId: string;
}
export interface GetProfileResponse {
  profileId: string;
  profileArn: string;
  name: string;
  email?: string | redacted.Redacted<string>;
  phone: string | redacted.Redacted<string>;
  businessName: string;
  logging?: Logging;
  logGroupName?: string;
  createdAt: Date;
  modifiedAt?: Date;
}
export interface GetTransformerRequest {
  transformerId: string;
}
export interface GetTransformerResponse {
  transformerId: string;
  transformerArn: string;
  name: string;
  status: TransformerStatus;
  createdAt: Date;
  modifiedAt?: Date;
  fileFormat?: FileFormat;
  mappingTemplate?: string;
  ediType?: EdiType;
  sampleDocument?: string;
  inputConversion?: InputConversion;
  mapping?: Mapping;
  outputConversion?: OutputConversion;
  sampleDocuments?: SampleDocuments;
}
export type TransformerJobId = string;
export interface GetTransformerJobRequest {
  transformerJobId: string;
  transformerId: string;
}
export type TransformerJobStatus =
  | "running"
  | "succeeded"
  | "failed"
  | (string & {});
export type S3LocationList = S3Location[];
export interface GetTransformerJobResponse {
  status: TransformerJobStatus;
  outputFiles?: S3Location[];
  message?: string;
}
export type PageToken = string;
export type MaxResults = number;
export interface ListCapabilitiesRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface CapabilitySummary {
  capabilityId: string;
  name: string;
  type: CapabilityType;
  createdAt: Date;
  modifiedAt?: Date;
}
export type CapabilityList = CapabilitySummary[];
export interface ListCapabilitiesResponse {
  capabilities: CapabilitySummary[];
  nextToken?: string;
}
export interface ListPartnershipsRequest {
  profileId?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface PartnershipSummary {
  profileId: string;
  partnershipId: string;
  name?: string;
  capabilities?: string[];
  capabilityOptions?: CapabilityOptions;
  tradingPartnerId?: string;
  createdAt: Date;
  modifiedAt?: Date;
}
export type PartnershipList = PartnershipSummary[];
export interface ListPartnershipsResponse {
  partnerships: PartnershipSummary[];
  nextToken?: string;
}
export interface ListProfilesRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface ProfileSummary {
  profileId: string;
  name: string;
  businessName: string;
  logging?: Logging;
  logGroupName?: string;
  createdAt: Date;
  modifiedAt?: Date;
}
export type ProfileList = ProfileSummary[];
export interface ListProfilesResponse {
  profiles: ProfileSummary[];
  nextToken?: string;
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface ListTransformersRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface TransformerSummary {
  transformerId: string;
  name: string;
  status: TransformerStatus;
  createdAt: Date;
  modifiedAt?: Date;
  fileFormat?: FileFormat;
  mappingTemplate?: string;
  ediType?: EdiType;
  sampleDocument?: string;
  inputConversion?: InputConversion;
  mapping?: Mapping;
  outputConversion?: OutputConversion;
  sampleDocuments?: SampleDocuments;
}
export type TransformerList = TransformerSummary[];
export interface ListTransformersResponse {
  transformers: TransformerSummary[];
  nextToken?: string;
}
export interface StartTransformerJobRequest {
  inputFile: S3Location;
  outputLocation: S3Location;
  transformerId: string;
  clientToken?: string;
}
export interface StartTransformerJobResponse {
  transformerJobId: string;
}
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type ConversionSourceFormat = "JSON" | "XML" | (string & {});
export type InputFileSource = { fileContent: string };
export interface ConversionSource {
  fileFormat: ConversionSourceFormat;
  inputFile: InputFileSource;
}
export type ConversionTargetFormat = "X12" | (string & {});
export type ConversionTargetFormatDetails = { x12: X12Details };
export type OutputSampleFileSource = { fileLocation: S3Location };
export interface ConversionTarget {
  fileFormat: ConversionTargetFormat;
  formatDetails?: ConversionTargetFormatDetails;
  outputSampleFile?: OutputSampleFileSource;
  advancedOptions?: AdvancedOptions;
}
export interface TestConversionRequest {
  source: ConversionSource;
  target: ConversionTarget;
}
export type ValidationMessages = string[];
export interface TestConversionResponse {
  convertedFileContent: string;
  validationMessages?: string[];
}
export type TestMappingInputFileContent = string;
export interface TestMappingRequest {
  inputFileContent: string;
  mappingTemplate: string;
  fileFormat: FileFormat;
}
export interface TestMappingResponse {
  mappedFileContent: string;
}
export interface TestParsingRequest {
  inputFile: S3Location;
  fileFormat: FileFormat;
  ediType: EdiType;
  advancedOptions?: AdvancedOptions;
}
export type ParsedSplitFileContentsList = string[];
export interface TestParsingResponse {
  parsedFileContent: string;
  parsedSplitFileContents?: string[];
  validationMessages?: string[];
}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateCapabilityRequest {
  capabilityId: string;
  name?: string;
  configuration?: CapabilityConfiguration;
  instructionsDocuments?: S3Location[];
}
export interface UpdateCapabilityResponse {
  capabilityId: string;
  capabilityArn: string;
  name: string;
  type: CapabilityType;
  configuration: CapabilityConfiguration;
  instructionsDocuments?: S3Location[];
  createdAt: Date;
  modifiedAt?: Date;
}
export interface UpdatePartnershipRequest {
  partnershipId: string;
  name?: string;
  capabilities?: string[];
  capabilityOptions?: CapabilityOptions;
}
export interface UpdatePartnershipResponse {
  profileId: string;
  partnershipId: string;
  partnershipArn: string;
  name?: string;
  email?: string | redacted.Redacted<string>;
  phone?: string | redacted.Redacted<string>;
  capabilities?: string[];
  capabilityOptions?: CapabilityOptions;
  tradingPartnerId?: string;
  createdAt: Date;
  modifiedAt?: Date;
}
export interface UpdateProfileRequest {
  profileId: string;
  name?: string;
  email?: string | redacted.Redacted<string>;
  phone?: string | redacted.Redacted<string>;
  businessName?: string;
}
export interface UpdateProfileResponse {
  profileId: string;
  profileArn: string;
  name: string;
  email?: string | redacted.Redacted<string>;
  phone: string | redacted.Redacted<string>;
  businessName: string;
  logging?: Logging;
  logGroupName?: string;
  createdAt: Date;
  modifiedAt?: Date;
}
export interface UpdateTransformerRequest {
  transformerId: string;
  name?: string;
  status?: TransformerStatus;
  fileFormat?: FileFormat;
  mappingTemplate?: string;
  ediType?: EdiType;
  sampleDocument?: string;
  inputConversion?: InputConversion;
  mapping?: Mapping;
  outputConversion?: OutputConversion;
  sampleDocuments?: SampleDocuments;
}
export interface UpdateTransformerResponse {
  transformerId: string;
  transformerArn: string;
  name: string;
  status: TransformerStatus;
  createdAt: Date;
  modifiedAt: Date;
  fileFormat?: FileFormat;
  mappingTemplate?: string;
  ediType?: EdiType;
  sampleDocument?: string;
  inputConversion?: InputConversion;
  mapping?: Mapping;
  outputConversion?: OutputConversion;
  sampleDocuments?: SampleDocuments;
}
export type ErrorMessage = string;
export type CreateCapabilityError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Instantiates a capability based on the specified parameters. A trading capability contains the information required to transform incoming EDI documents into JSON or XML outputs.
 */
export const createCapability: API.OperationMethod<
  CreateCapabilityRequest,
  CreateCapabilityResponse,
  CreateCapabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      type: 0,
      configuration: i_CapabilityConfiguration,
      instructionsDocuments: D.list(i_S3Location),
      clientToken: D.m({ idempotency: true }),
      tags: D.list(i_Tag),
    },
    output: { createdAt: D.ts },
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
  operationName: "CreateCapability",
})) as any;

export type CreatePartnershipError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a partnership between a customer and a trading partner, based on the supplied parameters. A partnership represents the connection between you and your trading partner. It ties together a profile and one or more trading capabilities.
 */
export const createPartnership: API.OperationMethod<
  CreatePartnershipRequest,
  CreatePartnershipResponse,
  CreatePartnershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      profileId: 0,
      name: 0,
      email: 0,
      phone: 0,
      capabilities: 0,
      capabilityOptions: i_CapabilityOptions,
      clientToken: D.m({ idempotency: true }),
      tags: D.list(i_Tag),
    },
    output: { email: D.secret, phone: D.secret, createdAt: D.ts },
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
  operationName: "CreatePartnership",
})) as any;

export type CreateProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a customer profile. You can have up to five customer profiles, each representing a distinct private network. A profile is the mechanism used to create the concept of a private network.
 */
export const createProfile: API.OperationMethod<
  CreateProfileRequest,
  CreateProfileResponse,
  CreateProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      email: 0,
      phone: 0,
      businessName: 0,
      logging: 0,
      clientToken: D.m({ idempotency: true }),
      tags: D.list(i_Tag),
    },
    output: { phone: D.secret, email: D.secret, createdAt: D.ts },
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
  operationName: "CreateProfile",
})) as any;

export type CreateStarterMappingTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services B2B Data Interchange uses a mapping template in JSONata or XSLT format to transform a customer input file into a JSON or XML file that can be converted to EDI.
 *
 * If you provide a sample EDI file with the same structure as the EDI files that you wish to generate, then the service can generate a mapping template. The starter template contains placeholder values which you can replace with JSONata or XSLT expressions to take data from your input file and insert it into the JSON or XML file that is used to generate the EDI.
 *
 * If you do not provide a sample EDI file, then the service can generate a mapping template based on the EDI settings in the `templateDetails` parameter.
 *
 * Currently, we only support generating a template that can generate the input to produce an Outbound X12 EDI file.
 */
export const createStarterMappingTemplate: API.OperationMethod<
  CreateStarterMappingTemplateRequest,
  CreateStarterMappingTemplateResponse,
  CreateStarterMappingTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      outputSampleLocation: i_S3Location,
      mappingType: 0,
      templateDetails: { x12: i_X12Details },
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
  operationName: "CreateStarterMappingTemplate",
})) as any;

export type CreateTransformerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a transformer. Amazon Web Services B2B Data Interchange currently supports two scenarios:
 *
 * - *Inbound EDI*: the Amazon Web Services customer receives an EDI file from their trading partner. Amazon Web Services B2B Data Interchange converts this EDI file into a JSON or XML file with a service-defined structure. A mapping template provided by the customer, in JSONata or XSLT format, is optionally applied to this file to produce a JSON or XML file with the structure the customer requires.
 *
 * - *Outbound EDI*: the Amazon Web Services customer has a JSON or XML file containing data that they wish to use in an EDI file. A mapping template, provided by the customer (in either JSONata or XSLT format) is applied to this file to generate a JSON or XML file in the service-defined structure. This file is then converted to an EDI file.
 *
 * The following fields are provided for backwards compatibility only: `fileFormat`, `mappingTemplate`, `ediType`, and `sampleDocument`.
 *
 * - Use the `mapping` data type in place of `mappingTemplate` and `fileFormat`
 *
 * - Use the `sampleDocuments` data type in place of `sampleDocument`
 *
 * - Use either the `inputConversion` or `outputConversion` in place of `ediType`
 */
export const createTransformer: API.OperationMethod<
  CreateTransformerRequest,
  CreateTransformerResponse,
  CreateTransformerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      clientToken: D.m({ idempotency: true }),
      tags: D.list(i_Tag),
      fileFormat: 0,
      mappingTemplate: 0,
      ediType: i_EdiType,
      sampleDocument: 0,
      inputConversion: i_InputConversion,
      mapping: i_Mapping,
      outputConversion: i_OutputConversion,
      sampleDocuments: i_SampleDocuments,
    },
    output: { createdAt: D.ts },
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
  operationName: "CreateTransformer",
})) as any;

export type DeleteCapabilityError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified capability. A trading capability contains the information required to transform incoming EDI documents into JSON or XML outputs.
 */
export const deleteCapability: API.OperationMethod<
  DeleteCapabilityRequest,
  DeleteCapabilityResponse,
  DeleteCapabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { capabilityId: 0 } },
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
  operationName: "DeleteCapability",
})) as any;

export type DeletePartnershipError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified partnership. A partnership represents the connection between you and your trading partner. It ties together a profile and one or more trading capabilities.
 */
export const deletePartnership: API.OperationMethod<
  DeletePartnershipRequest,
  DeletePartnershipResponse,
  DeletePartnershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { partnershipId: 0 } },
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
  operationName: "DeletePartnership",
})) as any;

export type DeleteProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified profile. A profile is the mechanism used to create the concept of a private network.
 */
export const deleteProfile: API.OperationMethod<
  DeleteProfileRequest,
  DeleteProfileResponse,
  DeleteProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { profileId: 0 } },
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
  operationName: "DeleteProfile",
})) as any;

export type DeleteTransformerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified transformer. A transformer can take an EDI file as input and transform it into a JSON-or XML-formatted document. Alternatively, a transformer can take a JSON-or XML-formatted document as input and transform it into an EDI file.
 */
export const deleteTransformer: API.OperationMethod<
  DeleteTransformerRequest,
  DeleteTransformerResponse,
  DeleteTransformerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { transformerId: 0 } },
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
  operationName: "DeleteTransformer",
})) as any;

export type GenerateMappingError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Takes sample input and output documents and uses Amazon Bedrock to generate a mapping automatically. Depending on the accuracy and other factors, you can then edit the mapping for your needs.
 *
 * Before you can use the AI-assisted feature for Amazon Web Services B2B Data Interchange you must enable models in Amazon Bedrock. For details, see AI-assisted template mapping prerequisites in the *Amazon Web Services B2B Data Interchange User guide*.
 *
 * To generate a mapping, perform the following steps:
 *
 * - Start with an X12 EDI document to use as the input.
 *
 * - Call `TestMapping` using your EDI document.
 *
 * - Use the output from the `TestMapping` operation as either input or output for your GenerateMapping call, along with your sample file.
 */
export const generateMapping: API.OperationMethod<
  GenerateMappingRequest,
  GenerateMappingResponse,
  GenerateMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { inputFileContent: 0, outputFileContent: 0, mappingType: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateMapping",
})) as any;

export type GetCapabilityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details for the specified capability. A trading capability contains the information required to transform incoming EDI documents into JSON or XML outputs.
 */
export const getCapability: API.OperationMethod<
  GetCapabilityRequest,
  GetCapabilityResponse,
  GetCapabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { capabilityId: 0 },
    output: { createdAt: D.ts, modifiedAt: D.ts },
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
  operationName: "GetCapability",
})) as any;

export type GetPartnershipError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details for a partnership, based on the partner and profile IDs specified. A partnership represents the connection between you and your trading partner. It ties together a profile and one or more trading capabilities.
 */
export const getPartnership: API.OperationMethod<
  GetPartnershipRequest,
  GetPartnershipResponse,
  GetPartnershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { partnershipId: 0 },
    output: {
      email: D.secret,
      phone: D.secret,
      createdAt: D.ts,
      modifiedAt: D.ts,
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
  operationName: "GetPartnership",
})) as any;

export type GetProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details for the profile specified by the profile ID. A profile is the mechanism used to create the concept of a private network.
 */
export const getProfile: API.OperationMethod<
  GetProfileRequest,
  GetProfileResponse,
  GetProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { profileId: 0 },
    output: {
      email: D.secret,
      phone: D.secret,
      createdAt: D.ts,
      modifiedAt: D.ts,
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
  operationName: "GetProfile",
})) as any;

export type GetTransformerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details for the transformer specified by the transformer ID. A transformer can take an EDI file as input and transform it into a JSON-or XML-formatted document. Alternatively, a transformer can take a JSON-or XML-formatted document as input and transform it into an EDI file.
 */
export const getTransformer: API.OperationMethod<
  GetTransformerRequest,
  GetTransformerResponse,
  GetTransformerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { transformerId: 0 },
    output: { createdAt: D.ts, modifiedAt: D.ts },
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
  operationName: "GetTransformer",
})) as any;

export type GetTransformerJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the details of the transformer run, based on the Transformer job ID.
 *
 * If 30 days have elapsed since your transformer job was started, the system deletes it. So, if you run `GetTransformerJob` and supply a `transformerId` and `transformerJobId` for a job that was started more than 30 days previously, you receive a 404 response.
 */
export const getTransformerJob: API.OperationMethod<
  GetTransformerJobRequest,
  GetTransformerJobResponse,
  GetTransformerJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { transformerJobId: 0, transformerId: 0 },
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
  operationName: "GetTransformerJob",
})) as any;

export type ListCapabilitiesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the capabilities associated with your Amazon Web Services account for your current or specified region. A trading capability contains the information required to transform incoming EDI documents into JSON or XML outputs.
 */
export const listCapabilities: API.PaginatedOperationMethod<
  ListCapabilitiesRequest,
  ListCapabilitiesResponse,
  ListCapabilitiesError,
  Credentials | HttpClient.HttpClient,
  CapabilitySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0 },
    output: { capabilities: D.list({ createdAt: D.ts, modifiedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCapabilities",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "capabilities",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPartnershipsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the partnerships associated with your Amazon Web Services account for your current or specified region. A partnership represents the connection between you and your trading partner. It ties together a profile and one or more trading capabilities.
 */
export const listPartnerships: API.PaginatedOperationMethod<
  ListPartnershipsRequest,
  ListPartnershipsResponse,
  ListPartnershipsError,
  Credentials | HttpClient.HttpClient,
  PartnershipSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { profileId: 0, nextToken: 0, maxResults: 0 },
    output: { partnerships: D.list({ createdAt: D.ts, modifiedAt: D.ts }) },
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
  operationName: "ListPartnerships",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "partnerships",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the profiles associated with your Amazon Web Services account for your current or specified region. A profile is the mechanism used to create the concept of a private network.
 */
export const listProfiles: API.PaginatedOperationMethod<
  ListProfilesRequest,
  ListProfilesResponse,
  ListProfilesError,
  Credentials | HttpClient.HttpClient,
  ProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0 },
    output: { profiles: D.list({ createdAt: D.ts, modifiedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "profiles",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all of the tags associated with the Amazon Resource Name (ARN) that you specify. The resource can be a capability, partnership, profile, or transformer.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0 } },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTransformersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the available transformers. A transformer can take an EDI file as input and transform it into a JSON-or XML-formatted document. Alternatively, a transformer can take a JSON-or XML-formatted document as input and transform it into an EDI file.
 */
export const listTransformers: API.PaginatedOperationMethod<
  ListTransformersRequest,
  ListTransformersResponse,
  ListTransformersError,
  Credentials | HttpClient.HttpClient,
  TransformerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0 },
    output: { transformers: D.list({ createdAt: D.ts, modifiedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTransformers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "transformers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type StartTransformerJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Runs a job, using a transformer, to parse input EDI (electronic data interchange) file into the output structures used by Amazon Web Services B2B Data Interchange.
 *
 * If you only want to transform EDI (electronic data interchange) documents, you don't need to create profiles, partnerships or capabilities. Just create and configure a transformer, and then run the `StartTransformerJob` API to process your files.
 *
 * The system stores transformer jobs for 30 days. During that period, you can run GetTransformerJob and supply its `transformerId` and `transformerJobId` to return details of the job.
 */
export const startTransformerJob: API.OperationMethod<
  StartTransformerJobRequest,
  StartTransformerJobResponse,
  StartTransformerJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      inputFile: i_S3Location,
      outputLocation: i_S3Location,
      transformerId: 0,
      clientToken: D.m({ idempotency: true }),
    },
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
  operationName: "StartTransformerJob",
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attaches a key-value pair to a resource, as identified by its Amazon Resource Name (ARN). Resources are capability, partnership, profile, transformers and other entities.
 *
 * There is no response returned from this call.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, Tags: D.list(i_Tag) } },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type TestConversionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation mimics the latter half of a typical Outbound EDI request. It takes an input JSON/XML in the B2Bi shape as input, converts it to an X12 EDI string, and return that string.
 */
export const testConversion: API.OperationMethod<
  TestConversionRequest,
  TestConversionResponse,
  TestConversionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      source: { fileFormat: 0, inputFile: { fileContent: 0 } },
      target: {
        fileFormat: 0,
        formatDetails: { x12: i_X12Details },
        outputSampleFile: { fileLocation: i_S3Location },
        advancedOptions: i_AdvancedOptions,
      },
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
  operationName: "TestConversion",
})) as any;

export type TestMappingError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Maps the input file according to the provided template file. The API call downloads the file contents from the Amazon S3 location, and passes the contents in as a string, to the `inputFileContent` parameter.
 */
export const testMapping: API.OperationMethod<
  TestMappingRequest,
  TestMappingResponse,
  TestMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { inputFileContent: 0, mappingTemplate: 0, fileFormat: 0 },
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
  operationName: "TestMapping",
})) as any;

export type TestParsingError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Parses the input EDI (electronic data interchange) file. The input file has a file size limit of 250 KB.
 */
export const testParsing: API.OperationMethod<
  TestParsingRequest,
  TestParsingResponse,
  TestParsingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      inputFile: i_S3Location,
      fileFormat: 0,
      ediType: i_EdiType,
      advancedOptions: i_AdvancedOptions,
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
  operationName: "TestParsing",
})) as any;

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Detaches a key-value pair from the specified resource, as identified by its Amazon Resource Name (ARN). Resources are capability, partnership, profile, transformers and other entities.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, TagKeys: 0 } },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateCapabilityError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates some of the parameters for a capability, based on the specified parameters. A trading capability contains the information required to transform incoming EDI documents into JSON or XML outputs.
 */
export const updateCapability: API.OperationMethod<
  UpdateCapabilityRequest,
  UpdateCapabilityResponse,
  UpdateCapabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      capabilityId: 0,
      name: 0,
      configuration: i_CapabilityConfiguration,
      instructionsDocuments: D.list(i_S3Location),
    },
    output: { createdAt: D.ts, modifiedAt: D.ts },
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
  operationName: "UpdateCapability",
})) as any;

export type UpdatePartnershipError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates some of the parameters for a partnership between a customer and trading partner. A partnership represents the connection between you and your trading partner. It ties together a profile and one or more trading capabilities.
 */
export const updatePartnership: API.OperationMethod<
  UpdatePartnershipRequest,
  UpdatePartnershipResponse,
  UpdatePartnershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      partnershipId: 0,
      name: 0,
      capabilities: 0,
      capabilityOptions: i_CapabilityOptions,
    },
    output: {
      email: D.secret,
      phone: D.secret,
      createdAt: D.ts,
      modifiedAt: D.ts,
    },
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
  operationName: "UpdatePartnership",
})) as any;

export type UpdateProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified parameters for a profile. A profile is the mechanism used to create the concept of a private network.
 */
export const updateProfile: API.OperationMethod<
  UpdateProfileRequest,
  UpdateProfileResponse,
  UpdateProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { profileId: 0, name: 0, email: 0, phone: 0, businessName: 0 },
    output: {
      email: D.secret,
      phone: D.secret,
      createdAt: D.ts,
      modifiedAt: D.ts,
    },
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
  operationName: "UpdateProfile",
})) as any;

export type UpdateTransformerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified parameters for a transformer. A transformer can take an EDI file as input and transform it into a JSON-or XML-formatted document. Alternatively, a transformer can take a JSON-or XML-formatted document as input and transform it into an EDI file.
 */
export const updateTransformer: API.OperationMethod<
  UpdateTransformerRequest,
  UpdateTransformerResponse,
  UpdateTransformerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      transformerId: 0,
      name: 0,
      status: 0,
      fileFormat: 0,
      mappingTemplate: 0,
      ediType: i_EdiType,
      sampleDocument: 0,
      inputConversion: i_InputConversion,
      mapping: i_Mapping,
      outputConversion: i_OutputConversion,
      sampleDocuments: i_SampleDocuments,
    },
    output: { createdAt: D.ts, modifiedAt: D.ts },
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
  operationName: "UpdateTransformer",
})) as any;

const i_AdvancedOptions: D.LazyStruct = () => ({
  x12: {
    splitOptions: { splitBy: 0 },
    validationOptions: {
      validationRules: D.list({
        codeListValidationRule: {
          elementId: 0,
          codesToAdd: 0,
          codesToRemove: 0,
        },
        elementLengthValidationRule: {
          elementId: 0,
          maxLength: 0,
          minLength: 0,
        },
        elementRequirementValidationRule: {
          elementPosition: 0,
          requirement: 0,
        },
      }),
    },
  },
});
const i_CapabilityConfiguration: D.LazyStruct = () => ({
  edi: {
    capabilityDirection: 0,
    type: i_EdiType,
    inputLocation: i_S3Location,
    outputLocation: i_S3Location,
    transformerId: 0,
  },
});
const i_CapabilityOptions: D.LazyStruct = () => ({
  outboundEdi: {
    x12: {
      common: {
        interchangeControlHeaders: {
          senderIdQualifier: 0,
          senderId: 0,
          receiverIdQualifier: 0,
          receiverId: 0,
          repetitionSeparator: 0,
          acknowledgmentRequestedCode: 0,
          usageIndicatorCode: 0,
        },
        functionalGroupHeaders: {
          applicationSenderCode: 0,
          applicationReceiverCode: 0,
          responsibleAgencyCode: 0,
        },
        delimiters: {
          componentSeparator: 0,
          dataElementSeparator: 0,
          segmentTerminator: 0,
        },
        validateEdi: 0,
        controlNumbers: {
          startingInterchangeControlNumber: 0,
          startingFunctionalGroupControlNumber: 0,
          startingTransactionSetControlNumber: 0,
        },
        gs05TimeFormat: 0,
      },
      wrapOptions: { wrapBy: 0, lineTerminator: 0, lineLength: 0 },
    },
  },
  inboundEdi: {
    x12: {
      acknowledgmentOptions: {
        functionalAcknowledgment: 0,
        technicalAcknowledgment: 0,
      },
    },
  },
});
const i_EdiType: D.LazyStruct = () => ({ x12Details: i_X12Details });
const i_InputConversion: D.LazyStruct = () => ({
  fromFormat: 0,
  formatOptions: i_FormatOptions,
  advancedOptions: i_AdvancedOptions,
});
const i_Mapping: D.LazyStruct = () => ({ templateLanguage: 0, template: 0 });
const i_OutputConversion: D.LazyStruct = () => ({
  toFormat: 0,
  formatOptions: i_FormatOptions,
  advancedOptions: i_AdvancedOptions,
});
const i_S3Location: D.LazyStruct = () => ({ bucketName: 0, key: 0 });
const i_SampleDocuments: D.LazyStruct = () => ({
  bucketName: 0,
  keys: D.list({ input: 0, output: 0 }),
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_X12Details: D.LazyStruct = () => ({ transactionSet: 0, version: 0 });
const i_FormatOptions: D.LazyStruct = () => ({ x12: i_X12Details });
