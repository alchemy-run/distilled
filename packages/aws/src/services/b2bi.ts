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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "b2bi", serviceShapeName: "B2BI" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "b2bi" });
const ver = /*@__PURE__*/ T.ServiceVersion("2022-06-23");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
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
              `https://b2bi-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://b2bi-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://b2bi.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://b2bi.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://b2bi.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
      serviceCode: S.String,
      quotaCode: S.String,
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(429), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type TransformerJobStatus = "running" | "succeeded" | "failed" | (string & {});
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
  input: __S(544, __c34, 0) as any as S.Schema<CreateCapabilityRequest>,
  output: __S(545, __c34, 1) as any as S.Schema<CreateCapabilityResponse>,
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
}));

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
  input: __S(656, __c41, 0) as any as S.Schema<CreatePartnershipRequest>,
  output: __S(657, __c41, 1) as any as S.Schema<CreatePartnershipResponse>,
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
}));

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
  input: __S(704, __c44, 0) as any as S.Schema<CreateProfileRequest>,
  output: __S(705, __c44, 1) as any as S.Schema<CreateProfileResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<CreateStarterMappingTemplateRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateStarterMappingTemplateResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStarterMappingTemplate",
}));

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
  input: __S(32, __c2, 0) as any as S.Schema<CreateTransformerRequest>,
  output: __S(33, __c2, 1) as any as S.Schema<CreateTransformerResponse>,
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
}));

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
  input: __S(80, __c5, 0) as any as S.Schema<DeleteCapabilityRequest>,
  output: __S(96, __c6, 0) as any as S.Schema<DeleteCapabilityResponse>,
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
}));

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
  input: __S(112, __c7, 0) as any as S.Schema<DeletePartnershipRequest>,
  output: __S(96, __c6, 0) as any as S.Schema<DeletePartnershipResponse>,
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
}));

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
  input: __S(128, __c8, 0) as any as S.Schema<DeleteProfileRequest>,
  output: __S(96, __c6, 0) as any as S.Schema<DeleteProfileResponse>,
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
}));

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
  input: __S(144, __c9, 0) as any as S.Schema<DeleteTransformerRequest>,
  output: __S(96, __c6, 0) as any as S.Schema<DeleteTransformerResponse>,
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
}));

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
  input: __S(160, __c10, 0) as any as S.Schema<GenerateMappingRequest>,
  output: __S(161, __c10, 1) as any as S.Schema<GenerateMappingResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateMapping",
}));

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
  input: __S(176, __c11, 0) as any as S.Schema<GetCapabilityRequest>,
  output: __S(192, __c12, 0) as any as S.Schema<GetCapabilityResponse>,
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
}));

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
  input: __S(208, __c13, 0) as any as S.Schema<GetPartnershipRequest>,
  output: __S(224, __c14, 0) as any as S.Schema<GetPartnershipResponse>,
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
}));

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
  input: __S(240, __c15, 0) as any as S.Schema<GetProfileRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<GetProfileResponse>,
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
}));

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
  input: __S(272, __c17, 0) as any as S.Schema<GetTransformerRequest>,
  output: __S(273, __c17, 1) as any as S.Schema<GetTransformerResponse>,
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
}));

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
  input: __S(288, __c18, 0) as any as S.Schema<GetTransformerJobRequest>,
  output: __S(289, __c18, 1) as any as S.Schema<GetTransformerJobResponse>,
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
}));

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
  input: __S(304, __c19, 0) as any as S.Schema<ListCapabilitiesRequest>,
  output: __S(307, __c19, 3) as any as S.Schema<ListCapabilitiesResponse>,
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
  input: __S(320, __c20, 0) as any as S.Schema<ListPartnershipsRequest>,
  output: __S(323, __c20, 3) as any as S.Schema<ListPartnershipsResponse>,
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
  input: __S(336, __c21, 0) as any as S.Schema<ListProfilesRequest>,
  output: __S(339, __c21, 3) as any as S.Schema<ListProfilesResponse>,
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
  input: __S(352, __c22, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(353, __c22, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(368, __c23, 0) as any as S.Schema<ListTransformersRequest>,
  output: __S(371, __c23, 3) as any as S.Schema<ListTransformersResponse>,
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
  input: __S(384, __c24, 0) as any as S.Schema<StartTransformerJobRequest>,
  output: __S(385, __c24, 1) as any as S.Schema<StartTransformerJobResponse>,
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
}));

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
  input: __S(400, __c25, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(96, __c6, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(420, __c26, 4) as any as S.Schema<TestConversionRequest>,
  output: __S(421, __c26, 5) as any as S.Schema<TestConversionResponse>,
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
}));

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
  input: __S(432, __c27, 0) as any as S.Schema<TestMappingRequest>,
  output: __S(433, __c27, 1) as any as S.Schema<TestMappingResponse>,
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
}));

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
  input: __S(448, __c28, 0) as any as S.Schema<TestParsingRequest>,
  output: __S(449, __c28, 1) as any as S.Schema<TestParsingResponse>,
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
}));

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
  input: __S(464, __c29, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(96, __c6, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(480, __c30, 0) as any as S.Schema<UpdateCapabilityRequest>,
  output: __S(192, __c12, 0) as any as S.Schema<UpdateCapabilityResponse>,
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
}));

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
  input: __S(496, __c31, 0) as any as S.Schema<UpdatePartnershipRequest>,
  output: __S(224, __c14, 0) as any as S.Schema<UpdatePartnershipResponse>,
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
}));

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
  input: __S(512, __c32, 0) as any as S.Schema<UpdateProfileRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<UpdateProfileResponse>,
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
}));

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
  input: __S(528, __c33, 0) as any as S.Schema<UpdateTransformerRequest>,
  output: __S(529, __c33, 1) as any as S.Schema<UpdateTransformerResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          outputSampleLocation: S.optional(__S(576, __c36, 0)),
          mappingType: S.String,
          templateDetails: __S(16, __c1, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/createmappingstarttemplate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateStarterMappingTemplateRequest" });
    case 1:
      return S.suspend(() => S.Struct({ mappingTemplate: S.String })).annotate({
        identifier: "CreateStarterMappingTemplateResponse",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ x12: __S(560, __c35, 0) })]);
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(641, __c40, 1)),
          fileFormat: S.optional(S.String),
          mappingTemplate: S.optional(S.String),
          ediType: S.optional(__S(592, __c37, 0)),
          sampleDocument: S.optional(S.String),
          inputConversion: S.optional(__S(64, __c4, 0)),
          mapping: S.optional(__S(65, __c4, 1)),
          outputConversion: S.optional(__S(66, __c4, 2)),
          sampleDocuments: S.optional(__S(69, __c4, 5)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/transformers" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateTransformerRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          transformerId: S.String,
          transformerArn: S.String,
          name: S.String,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          fileFormat: S.optional(S.String),
          mappingTemplate: S.optional(S.String),
          ediType: S.optional(__S(592, __c37, 0)),
          sampleDocument: S.optional(S.String),
          inputConversion: S.optional(__S(64, __c4, 0)),
          mapping: S.optional(__S(65, __c4, 1)),
          outputConversion: S.optional(__S(66, __c4, 2)),
          sampleDocuments: S.optional(__S(69, __c4, 5)),
        }),
      ).annotate({ identifier: "CreateTransformerResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ splitBy: S.String })).annotate({
        identifier: "X12SplitOptions",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          elementId: S.String,
          codesToAdd: S.optional(__S(672, __c42, 0)),
          codesToRemove: S.optional(__S(672, __c42, 0)),
        }),
      ).annotate({ identifier: "X12CodeListValidationRule" });
    case 2:
      return S.suspend(() =>
        S.Struct({ elementId: S.String, maxLength: S.Number, minLength: S.Number }),
      ).annotate({ identifier: "X12ElementLengthValidationRule" });
    case 3:
      return S.suspend(() =>
        S.Struct({ elementPosition: S.String, requirement: S.String }),
      ).annotate({ identifier: "X12ElementRequirementValidationRule" });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ codeListValidationRule: __S(49, __c3, 1) }),
        /*@__PURE__*/ S.Struct({ elementLengthValidationRule: __S(50, __c3, 2) }),
        /*@__PURE__*/ S.Struct({ elementRequirementValidationRule: __S(51, __c3, 3) }),
      ]);
    case 5:
      return S.Array(__S(52, __c3, 4));
    case 6:
      return S.suspend(() => S.Struct({ validationRules: S.optional(__S(53, __c3, 5)) })).annotate({
        identifier: "X12ValidationOptions",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({
          splitOptions: S.optional(__S(48, __c3, 0)),
          validationOptions: S.optional(__S(54, __c3, 6)),
        }),
      ).annotate({ identifier: "X12AdvancedOptions" });
    case 8:
      return S.suspend(() => S.Struct({ x12: S.optional(__S(55, __c3, 7)) })).annotate({
        identifier: "AdvancedOptions",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          fromFormat: S.String,
          formatOptions: S.optional(__S(16, __c1, 0)),
          advancedOptions: S.optional(__S(56, __c3, 8)),
        }),
      ).annotate({ identifier: "InputConversion" });
    case 1:
      return S.suspend(() =>
        S.Struct({ templateLanguage: S.String, template: S.optional(S.String) }),
      ).annotate({ identifier: "Mapping" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          toFormat: S.String,
          formatOptions: S.optional(__S(16, __c1, 0)),
          advancedOptions: S.optional(__S(56, __c3, 8)),
        }),
      ).annotate({ identifier: "OutputConversion" });
    case 3:
      return S.suspend(() =>
        S.Struct({ input: S.optional(S.String), output: S.optional(S.String) }),
      ).annotate({ identifier: "SampleDocumentKeys" });
    case 4:
      return S.Array(__S(67, __c4, 3));
    case 5:
      return S.suspend(() => S.Struct({ bucketName: S.String, keys: __S(68, __c4, 4) })).annotate({
        identifier: "SampleDocuments",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ capabilityId: S.String.pipe(T.HttpLabel("capabilityId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/capabilities/{capabilityId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCapabilityRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteCapabilityResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ partnershipId: S.String.pipe(T.HttpLabel("partnershipId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/partnerships/{partnershipId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePartnershipRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ profileId: S.String.pipe(T.HttpLabel("profileId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/profiles/{profileId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteProfileRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ transformerId: S.String.pipe(T.HttpLabel("transformerId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/transformers/{transformerId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTransformerRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          inputFileContent: S.String,
          outputFileContent: S.String,
          mappingType: S.String,
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/generate-mapping" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GenerateMappingRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ mappingTemplate: S.String, mappingAccuracy: S.optional(S.Number) }),
      ).annotate({ identifier: "GenerateMappingResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ capabilityId: S.String.pipe(T.HttpLabel("capabilityId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/capabilities/{capabilityId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCapabilityRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          capabilityId: S.String,
          capabilityArn: S.String,
          name: S.String,
          type: S.String,
          configuration: __S(625, __c39, 1),
          instructionsDocuments: S.optional(__S(608, __c38, 0)),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          modifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetCapabilityResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ partnershipId: S.String.pipe(T.HttpLabel("partnershipId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/partnerships/{partnershipId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPartnershipRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profileId: S.String,
          partnershipId: S.String,
          partnershipArn: S.String,
          name: S.optional(S.String),
          email: S.optional(SensitiveString),
          phone: S.optional(SensitiveString),
          capabilities: S.optional(__S(672, __c42, 0)),
          capabilityOptions: S.optional(__S(699, __c43, 11)),
          tradingPartnerId: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          modifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetPartnershipResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ profileId: S.String.pipe(T.HttpLabel("profileId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/profiles/{profileId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetProfileRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profileId: S.String,
          profileArn: S.String,
          name: S.String,
          email: S.optional(SensitiveString),
          phone: SensitiveString,
          businessName: S.String,
          logging: S.optional(S.String),
          logGroupName: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          modifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetProfileResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ transformerId: S.String.pipe(T.HttpLabel("transformerId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/transformers/{transformerId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTransformerRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          transformerId: S.String,
          transformerArn: S.String,
          name: S.String,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          modifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          fileFormat: S.optional(S.String),
          mappingTemplate: S.optional(S.String),
          ediType: S.optional(__S(592, __c37, 0)),
          sampleDocument: S.optional(S.String),
          inputConversion: S.optional(__S(64, __c4, 0)),
          mapping: S.optional(__S(65, __c4, 1)),
          outputConversion: S.optional(__S(66, __c4, 2)),
          sampleDocuments: S.optional(__S(69, __c4, 5)),
        }),
      ).annotate({ identifier: "GetTransformerResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          transformerJobId: S.String.pipe(T.HttpLabel("transformerJobId")),
          transformerId: S.String.pipe(T.HttpQuery("transformerId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/transformer-jobs/{transformerJobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTransformerJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: S.String,
          outputFiles: S.optional(__S(608, __c38, 0)),
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetTransformerJobResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/capabilities" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListCapabilitiesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          capabilityId: S.String,
          name: S.String,
          type: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          modifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CapabilitySummary" });
    case 2:
      return S.Array(__S(305, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ capabilities: __S(306, __c19, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListCapabilitiesResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profileId: S.optional(S.String).pipe(T.HttpQuery("profileId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/partnerships" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListPartnershipsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          profileId: S.String,
          partnershipId: S.String,
          name: S.optional(S.String),
          capabilities: S.optional(__S(672, __c42, 0)),
          capabilityOptions: S.optional(__S(699, __c43, 11)),
          tradingPartnerId: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          modifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "PartnershipSummary" });
    case 2:
      return S.Array(__S(321, __c20, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ partnerships: __S(322, __c20, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPartnershipsResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/profiles" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListProfilesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          profileId: S.String,
          name: S.String,
          businessName: S.String,
          logging: S.optional(S.String),
          logGroupName: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          modifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ProfileSummary" });
    case 2:
      return S.Array(__S(337, __c21, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ profiles: __S(338, __c21, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListProfilesResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String.pipe(T.HttpLabel("ResourceARN")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{ResourceARN}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(641, __c40, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/transformers" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTransformersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          transformerId: S.String,
          name: S.String,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          modifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          fileFormat: S.optional(S.String),
          mappingTemplate: S.optional(S.String),
          ediType: S.optional(__S(592, __c37, 0)),
          sampleDocument: S.optional(S.String),
          inputConversion: S.optional(__S(64, __c4, 0)),
          mapping: S.optional(__S(65, __c4, 1)),
          outputConversion: S.optional(__S(66, __c4, 2)),
          sampleDocuments: S.optional(__S(69, __c4, 5)),
        }),
      ).annotate({ identifier: "TransformerSummary" });
    case 2:
      return S.Array(__S(369, __c23, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ transformers: __S(370, __c23, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTransformersResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          inputFile: __S(576, __c36, 0),
          outputLocation: __S(576, __c36, 0),
          transformerId: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/transformer-jobs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartTransformerJobRequest" });
    case 1:
      return S.suspend(() => S.Struct({ transformerJobId: S.String })).annotate({
        identifier: "StartTransformerJobResponse",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceARN: S.String.pipe(T.HttpLabel("ResourceARN")),
          Tags: __S(641, __c40, 1),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{ResourceARN}" }),
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
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ fileContent: S.String })]);
    case 1:
      return S.suspend(() =>
        S.Struct({ fileFormat: S.String, inputFile: __S(416, __c26, 0) }),
      ).annotate({ identifier: "ConversionSource" });
    case 2:
      return S.Union([/*@__PURE__*/ S.Struct({ fileLocation: __S(576, __c36, 0) })]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          fileFormat: S.String,
          formatDetails: S.optional(__S(16, __c1, 0)),
          outputSampleFile: S.optional(__S(418, __c26, 2)),
          advancedOptions: S.optional(__S(56, __c3, 8)),
        }),
      ).annotate({ identifier: "ConversionTarget" });
    case 4:
      return S.suspend(() =>
        S.Struct({ source: __S(417, __c26, 1), target: __S(419, __c26, 3) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/testconversion" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TestConversionRequest" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          convertedFileContent: S.String,
          validationMessages: S.optional(__S(672, __c42, 0)),
        }),
      ).annotate({ identifier: "TestConversionResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          inputFileContent: S.String,
          mappingTemplate: S.String,
          fileFormat: S.String,
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/testmapping" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TestMappingRequest" });
    case 1:
      return S.suspend(() => S.Struct({ mappedFileContent: S.String })).annotate({
        identifier: "TestMappingResponse",
      });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          inputFile: __S(576, __c36, 0),
          fileFormat: S.String,
          ediType: __S(592, __c37, 0),
          advancedOptions: S.optional(__S(56, __c3, 8)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/testparsing" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TestParsingRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          parsedFileContent: S.String,
          parsedSplitFileContents: S.optional(__S(672, __c42, 0)),
          validationMessages: S.optional(__S(672, __c42, 0)),
        }),
      ).annotate({ identifier: "TestParsingResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceARN: S.String.pipe(T.HttpLabel("ResourceARN")),
          TagKeys: __S(672, __c42, 0).pipe(T.HttpQuery("TagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{ResourceARN}" }),
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
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          capabilityId: S.String.pipe(T.HttpLabel("capabilityId")),
          name: S.optional(S.String),
          configuration: S.optional(__S(625, __c39, 1)),
          instructionsDocuments: S.optional(__S(608, __c38, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/capabilities/{capabilityId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCapabilityRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          partnershipId: S.String.pipe(T.HttpLabel("partnershipId")),
          name: S.optional(S.String),
          capabilities: S.optional(__S(672, __c42, 0)),
          capabilityOptions: S.optional(__S(699, __c43, 11)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/partnerships/{partnershipId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePartnershipRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profileId: S.String.pipe(T.HttpLabel("profileId")),
          name: S.optional(S.String),
          email: S.optional(SensitiveString),
          phone: S.optional(SensitiveString),
          businessName: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/profiles/{profileId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateProfileRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          transformerId: S.String.pipe(T.HttpLabel("transformerId")),
          name: S.optional(S.String),
          status: S.optional(S.String),
          fileFormat: S.optional(S.String),
          mappingTemplate: S.optional(S.String),
          ediType: S.optional(__S(592, __c37, 0)),
          sampleDocument: S.optional(S.String),
          inputConversion: S.optional(__S(64, __c4, 0)),
          mapping: S.optional(__S(65, __c4, 1)),
          outputConversion: S.optional(__S(66, __c4, 2)),
          sampleDocuments: S.optional(__S(69, __c4, 5)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/transformers/{transformerId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateTransformerRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          transformerId: S.String,
          transformerArn: S.String,
          name: S.String,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          modifiedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          fileFormat: S.optional(S.String),
          mappingTemplate: S.optional(S.String),
          ediType: S.optional(__S(592, __c37, 0)),
          sampleDocument: S.optional(S.String),
          inputConversion: S.optional(__S(64, __c4, 0)),
          mapping: S.optional(__S(65, __c4, 1)),
          outputConversion: S.optional(__S(66, __c4, 2)),
          sampleDocuments: S.optional(__S(69, __c4, 5)),
        }),
      ).annotate({ identifier: "UpdateTransformerResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          type: S.String,
          configuration: __S(625, __c39, 1),
          instructionsDocuments: S.optional(__S(608, __c38, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(641, __c40, 1)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/capabilities" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateCapabilityRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          capabilityId: S.String,
          capabilityArn: S.String,
          name: S.String,
          type: S.String,
          configuration: __S(625, __c39, 1),
          instructionsDocuments: S.optional(__S(608, __c38, 0)),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreateCapabilityResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ transactionSet: S.optional(S.String), version: S.optional(S.String) }),
      ).annotate({ identifier: "X12Details" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ bucketName: S.optional(S.String), key: S.optional(S.String) }),
      ).annotate({ identifier: "S3Location" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ x12Details: __S(560, __c35, 0) })]);
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(576, __c36, 0));
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          capabilityDirection: S.optional(S.String),
          type: __S(592, __c37, 0),
          inputLocation: __S(576, __c36, 0),
          outputLocation: __S(576, __c36, 0),
          transformerId: S.String,
        }),
      ).annotate({ identifier: "EdiConfiguration" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ edi: __S(624, __c39, 0) })]);
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(640, __c40, 0));
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profileId: S.String,
          name: S.String,
          email: SensitiveString,
          phone: S.optional(SensitiveString),
          capabilities: __S(672, __c42, 0),
          capabilityOptions: S.optional(__S(699, __c43, 11)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(641, __c40, 1)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/partnerships" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreatePartnershipRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          profileId: S.String,
          partnershipId: S.String,
          partnershipArn: S.String,
          name: S.optional(S.String),
          email: S.optional(SensitiveString),
          phone: S.optional(SensitiveString),
          capabilities: S.optional(__S(672, __c42, 0)),
          capabilityOptions: S.optional(__S(699, __c43, 11)),
          tradingPartnerId: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreatePartnershipResponse" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          senderIdQualifier: S.optional(S.String),
          senderId: S.optional(S.String),
          receiverIdQualifier: S.optional(S.String),
          receiverId: S.optional(S.String),
          repetitionSeparator: S.optional(S.String),
          acknowledgmentRequestedCode: S.optional(S.String),
          usageIndicatorCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "X12InterchangeControlHeaders" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          applicationSenderCode: S.optional(S.String),
          applicationReceiverCode: S.optional(S.String),
          responsibleAgencyCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "X12FunctionalGroupHeaders" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          componentSeparator: S.optional(S.String),
          dataElementSeparator: S.optional(S.String),
          segmentTerminator: S.optional(S.String),
        }),
      ).annotate({ identifier: "X12Delimiters" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          startingInterchangeControlNumber: S.optional(S.Number),
          startingFunctionalGroupControlNumber: S.optional(S.Number),
          startingTransactionSetControlNumber: S.optional(S.Number),
        }),
      ).annotate({ identifier: "X12ControlNumbers" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          interchangeControlHeaders: S.optional(__S(688, __c43, 0)),
          functionalGroupHeaders: S.optional(__S(689, __c43, 1)),
          delimiters: S.optional(__S(690, __c43, 2)),
          validateEdi: S.optional(S.Boolean),
          controlNumbers: S.optional(__S(691, __c43, 3)),
          gs05TimeFormat: S.optional(S.String),
        }),
      ).annotate({ identifier: "X12OutboundEdiHeaders" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          wrapBy: S.String,
          lineTerminator: S.optional(S.String),
          lineLength: S.optional(S.Number),
        }),
      ).annotate({ identifier: "WrapOptions" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          common: S.optional(__S(692, __c43, 4)),
          wrapOptions: S.optional(__S(693, __c43, 5)),
        }),
      ).annotate({ identifier: "X12Envelope" });
    case 7:
      return S.Union([/*@__PURE__*/ S.Struct({ x12: __S(694, __c43, 6) })]);
    case 8:
      return S.suspend(() =>
        S.Struct({ functionalAcknowledgment: S.String, technicalAcknowledgment: S.String }),
      ).annotate({ identifier: "X12AcknowledgmentOptions" });
    case 9:
      return S.suspend(() =>
        S.Struct({ acknowledgmentOptions: S.optional(__S(696, __c43, 8)) }),
      ).annotate({ identifier: "X12InboundEdiOptions" });
    case 10:
      return S.suspend(() => S.Struct({ x12: S.optional(__S(697, __c43, 9)) })).annotate({
        identifier: "InboundEdiOptions",
      });
    case 11:
      return S.suspend(() =>
        S.Struct({
          outboundEdi: S.optional(__S(695, __c43, 7)),
          inboundEdi: S.optional(__S(698, __c43, 10)),
        }),
      ).annotate({ identifier: "CapabilityOptions" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          email: S.optional(SensitiveString),
          phone: SensitiveString,
          businessName: S.String,
          logging: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(641, __c40, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/profiles" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateProfileRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          profileId: S.String,
          profileArn: S.String,
          name: S.String,
          businessName: S.String,
          phone: SensitiveString,
          email: S.optional(SensitiveString),
          logging: S.optional(S.String),
          logGroupName: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreateProfileResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
