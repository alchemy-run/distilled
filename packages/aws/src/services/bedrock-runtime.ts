import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxName from "@distilled.cloud/core/telemetry-name-template";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import type * as stream from "effect/Stream";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Bedrock Runtime",
  serviceShapeName: "AmazonBedrockFrontendService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "bedrock" });
const ver = /*@__PURE__*/ T.ServiceVersion("2023-09-30");
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
              `https://bedrock-runtime-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://bedrock-runtime-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://bedrock-runtime.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://bedrock-runtime.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://bedrock-runtime.{R}.{D}","properties":{},"headers":{}}');

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "BedrockRuntime",
  service: "BedrockRuntime",
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ModelErrorException
  extends /*@__PURE__*/ S.TaggedError<ModelErrorException>()(
    "ModelErrorException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      originalStatusCode: /*@__PURE__*/ S.optional(S.Number),
      resourceName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(424),
  ) {}
export class ModelNotReadyException
  extends /*@__PURE__*/ S.TaggedError<ModelNotReadyException>()(
    "ModelNotReadyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(429), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ModelStreamErrorException
  extends /*@__PURE__*/ S.TaggedError<ModelStreamErrorException>()(
    "ModelStreamErrorException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      originalStatusCode: /*@__PURE__*/ S.optional(S.Number),
      originalMessage: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(424),
  ) {}
export class ModelTimeoutException
  extends /*@__PURE__*/ S.TaggedError<ModelTimeoutException>()(
    "ModelTimeoutException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(408),
  ).pipe(C.withTimeoutError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type GuardrailIdentifier = string;
export type GuardrailVersion = string;
export type GuardrailContentSource = "INPUT" | "OUTPUT" | (string & {});
export type GuardrailContentQualifier =
  | "grounding_source"
  | "query"
  | "guard_content"
  | (string & {});
export type GuardrailContentQualifierList = GuardrailContentQualifier[];
export interface GuardrailTextBlock {
  text: string;
  qualifiers?: GuardrailContentQualifier[];
}
export type GuardrailImageFormat = "png" | "jpeg" | (string & {});
export type GuardrailImageSource = { bytes: Uint8Array };
export interface GuardrailImageBlock {
  format: GuardrailImageFormat;
  source: GuardrailImageSource;
}
export type GuardrailContentBlock =
  | { text: GuardrailTextBlock; image?: never }
  | { text?: never; image: GuardrailImageBlock };
export type GuardrailContentBlockList = GuardrailContentBlock[];
export type GuardrailOutputScope = "INTERVENTIONS" | "FULL" | (string & {});
export interface ApplyGuardrailRequest {
  guardrailIdentifier: string;
  guardrailVersion: string;
  source: GuardrailContentSource;
  content: GuardrailContentBlock[];
  outputScope?: GuardrailOutputScope;
}
export type GuardrailTopicPolicyUnitsProcessed = number;
export type GuardrailContentPolicyUnitsProcessed = number;
export type GuardrailWordPolicyUnitsProcessed = number;
export type GuardrailSensitiveInformationPolicyUnitsProcessed = number;
export type GuardrailSensitiveInformationPolicyFreeUnitsProcessed = number;
export type GuardrailContextualGroundingPolicyUnitsProcessed = number;
export type GuardrailContentPolicyImageUnitsProcessed = number;
export type GuardrailAutomatedReasoningPolicyUnitsProcessed = number;
export type GuardrailAutomatedReasoningPoliciesProcessed = number;
export interface GuardrailUsage {
  topicPolicyUnits: number;
  contentPolicyUnits: number;
  wordPolicyUnits: number;
  sensitiveInformationPolicyUnits: number;
  sensitiveInformationPolicyFreeUnits: number;
  contextualGroundingPolicyUnits: number;
  contentPolicyImageUnits?: number;
  automatedReasoningPolicyUnits?: number;
  automatedReasoningPolicies?: number;
}
export type GuardrailAction = "NONE" | "GUARDRAIL_INTERVENED" | (string & {});
export type GuardrailOutputText = string;
export interface GuardrailOutputContent {
  text?: string;
}
export type GuardrailOutputContentList = GuardrailOutputContent[];
export type GuardrailTopicType = "DENY" | (string & {});
export type GuardrailTopicPolicyAction = "BLOCKED" | "NONE" | (string & {});
export interface GuardrailTopic {
  name: string;
  type: GuardrailTopicType;
  action: GuardrailTopicPolicyAction;
  detected?: boolean;
}
export type GuardrailTopicList = GuardrailTopic[];
export interface GuardrailTopicPolicyAssessment {
  topics: GuardrailTopic[];
}
export type GuardrailContentFilterType =
  | "INSULTS"
  | "HATE"
  | "SEXUAL"
  | "VIOLENCE"
  | "MISCONDUCT"
  | "PROMPT_ATTACK"
  | (string & {});
export type GuardrailContentFilterConfidence = "NONE" | "LOW" | "MEDIUM" | "HIGH" | (string & {});
export type GuardrailContentFilterStrength = "NONE" | "LOW" | "MEDIUM" | "HIGH" | (string & {});
export type GuardrailContentPolicyAction = "BLOCKED" | "NONE" | (string & {});
export interface GuardrailContentFilter {
  type: GuardrailContentFilterType;
  confidence: GuardrailContentFilterConfidence;
  filterStrength?: GuardrailContentFilterStrength;
  action: GuardrailContentPolicyAction;
  detected?: boolean;
}
export type GuardrailContentFilterList = GuardrailContentFilter[];
export interface GuardrailContentPolicyAssessment {
  filters: GuardrailContentFilter[];
}
export type GuardrailWordPolicyAction = "BLOCKED" | "NONE" | (string & {});
export interface GuardrailCustomWord {
  match: string;
  action: GuardrailWordPolicyAction;
  detected?: boolean;
}
export type GuardrailCustomWordList = GuardrailCustomWord[];
export type GuardrailManagedWordType = "PROFANITY" | (string & {});
export interface GuardrailManagedWord {
  match: string;
  type: GuardrailManagedWordType;
  action: GuardrailWordPolicyAction;
  detected?: boolean;
}
export type GuardrailManagedWordList = GuardrailManagedWord[];
export interface GuardrailWordPolicyAssessment {
  customWords: GuardrailCustomWord[];
  managedWordLists: GuardrailManagedWord[];
}
export type GuardrailPiiEntityType =
  | "ADDRESS"
  | "AGE"
  | "AWS_ACCESS_KEY"
  | "AWS_SECRET_KEY"
  | "CA_HEALTH_NUMBER"
  | "CA_SOCIAL_INSURANCE_NUMBER"
  | "CREDIT_DEBIT_CARD_CVV"
  | "CREDIT_DEBIT_CARD_EXPIRY"
  | "CREDIT_DEBIT_CARD_NUMBER"
  | "DRIVER_ID"
  | "EMAIL"
  | "INTERNATIONAL_BANK_ACCOUNT_NUMBER"
  | "IP_ADDRESS"
  | "LICENSE_PLATE"
  | "MAC_ADDRESS"
  | "NAME"
  | "PASSWORD"
  | "PHONE"
  | "PIN"
  | "SWIFT_CODE"
  | "UK_NATIONAL_HEALTH_SERVICE_NUMBER"
  | "UK_NATIONAL_INSURANCE_NUMBER"
  | "UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER"
  | "URL"
  | "USERNAME"
  | "US_BANK_ACCOUNT_NUMBER"
  | "US_BANK_ROUTING_NUMBER"
  | "US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER"
  | "US_PASSPORT_NUMBER"
  | "US_SOCIAL_SECURITY_NUMBER"
  | "VEHICLE_IDENTIFICATION_NUMBER"
  | (string & {});
export type GuardrailSensitiveInformationPolicyAction =
  | "ANONYMIZED"
  | "BLOCKED"
  | "NONE"
  | (string & {});
export interface GuardrailPiiEntityFilter {
  match: string;
  type: GuardrailPiiEntityType;
  action: GuardrailSensitiveInformationPolicyAction;
  detected?: boolean;
}
export type GuardrailPiiEntityFilterList = GuardrailPiiEntityFilter[];
export interface GuardrailRegexFilter {
  name?: string;
  match?: string;
  regex?: string;
  action: GuardrailSensitiveInformationPolicyAction;
  detected?: boolean;
}
export type GuardrailRegexFilterList = GuardrailRegexFilter[];
export interface GuardrailSensitiveInformationPolicyAssessment {
  piiEntities: GuardrailPiiEntityFilter[];
  regexes: GuardrailRegexFilter[];
}
export type GuardrailContextualGroundingFilterType = "GROUNDING" | "RELEVANCE" | (string & {});
export type GuardrailContextualGroundingPolicyAction = "BLOCKED" | "NONE" | (string & {});
export interface GuardrailContextualGroundingFilter {
  type: GuardrailContextualGroundingFilterType;
  threshold: number;
  score: number;
  action: GuardrailContextualGroundingPolicyAction;
  detected?: boolean;
}
export type GuardrailContextualGroundingFilters = GuardrailContextualGroundingFilter[];
export interface GuardrailContextualGroundingPolicyAssessment {
  filters?: GuardrailContextualGroundingFilter[];
}
export type GuardrailAutomatedReasoningStatementLogicContent = string | redacted.Redacted<string>;
export type GuardrailAutomatedReasoningStatementNaturalLanguageContent =
  | string
  | redacted.Redacted<string>;
export interface GuardrailAutomatedReasoningStatement {
  logic?: string | redacted.Redacted<string>;
  naturalLanguage?: string | redacted.Redacted<string>;
}
export type GuardrailAutomatedReasoningStatementList = GuardrailAutomatedReasoningStatement[];
export interface GuardrailAutomatedReasoningInputTextReference {
  text?: string | redacted.Redacted<string>;
}
export type GuardrailAutomatedReasoningInputTextReferenceList =
  GuardrailAutomatedReasoningInputTextReference[];
export type GuardrailAutomatedReasoningTranslationConfidence = number;
export interface GuardrailAutomatedReasoningTranslation {
  premises?: GuardrailAutomatedReasoningStatement[];
  claims?: GuardrailAutomatedReasoningStatement[];
  untranslatedPremises?: GuardrailAutomatedReasoningInputTextReference[];
  untranslatedClaims?: GuardrailAutomatedReasoningInputTextReference[];
  confidence?: number;
}
export interface GuardrailAutomatedReasoningScenario {
  statements?: GuardrailAutomatedReasoningStatement[];
}
export type AutomatedReasoningRuleIdentifier = string;
export type GuardrailAutomatedReasoningPolicyVersionArn = string;
export interface GuardrailAutomatedReasoningRule {
  identifier?: string;
  policyVersionArn?: string;
}
export type GuardrailAutomatedReasoningRuleList = GuardrailAutomatedReasoningRule[];
export type GuardrailAutomatedReasoningLogicWarningType =
  | "ALWAYS_FALSE"
  | "ALWAYS_TRUE"
  | (string & {});
export interface GuardrailAutomatedReasoningLogicWarning {
  type?: GuardrailAutomatedReasoningLogicWarningType;
  premises?: GuardrailAutomatedReasoningStatement[];
  claims?: GuardrailAutomatedReasoningStatement[];
}
export interface GuardrailAutomatedReasoningValidFinding {
  translation?: GuardrailAutomatedReasoningTranslation;
  claimsTrueScenario?: GuardrailAutomatedReasoningScenario;
  supportingRules?: GuardrailAutomatedReasoningRule[];
  logicWarning?: GuardrailAutomatedReasoningLogicWarning;
}
export interface GuardrailAutomatedReasoningInvalidFinding {
  translation?: GuardrailAutomatedReasoningTranslation;
  contradictingRules?: GuardrailAutomatedReasoningRule[];
  logicWarning?: GuardrailAutomatedReasoningLogicWarning;
}
export interface GuardrailAutomatedReasoningSatisfiableFinding {
  translation?: GuardrailAutomatedReasoningTranslation;
  claimsTrueScenario?: GuardrailAutomatedReasoningScenario;
  claimsFalseScenario?: GuardrailAutomatedReasoningScenario;
  logicWarning?: GuardrailAutomatedReasoningLogicWarning;
}
export interface GuardrailAutomatedReasoningImpossibleFinding {
  translation?: GuardrailAutomatedReasoningTranslation;
  contradictingRules?: GuardrailAutomatedReasoningRule[];
  logicWarning?: GuardrailAutomatedReasoningLogicWarning;
}
export type GuardrailAutomatedReasoningTranslationList = GuardrailAutomatedReasoningTranslation[];
export interface GuardrailAutomatedReasoningTranslationOption {
  translations?: GuardrailAutomatedReasoningTranslation[];
}
export type GuardrailAutomatedReasoningTranslationOptionList =
  GuardrailAutomatedReasoningTranslationOption[];
export type GuardrailAutomatedReasoningDifferenceScenarioList =
  GuardrailAutomatedReasoningScenario[];
export interface GuardrailAutomatedReasoningTranslationAmbiguousFinding {
  options?: GuardrailAutomatedReasoningTranslationOption[];
  differenceScenarios?: GuardrailAutomatedReasoningScenario[];
}
export interface GuardrailAutomatedReasoningTooComplexFinding {}
export interface GuardrailAutomatedReasoningNoTranslationsFinding {}
export type GuardrailAutomatedReasoningFinding =
  | {
      valid: GuardrailAutomatedReasoningValidFinding;
      invalid?: never;
      satisfiable?: never;
      impossible?: never;
      translationAmbiguous?: never;
      tooComplex?: never;
      noTranslations?: never;
    }
  | {
      valid?: never;
      invalid: GuardrailAutomatedReasoningInvalidFinding;
      satisfiable?: never;
      impossible?: never;
      translationAmbiguous?: never;
      tooComplex?: never;
      noTranslations?: never;
    }
  | {
      valid?: never;
      invalid?: never;
      satisfiable: GuardrailAutomatedReasoningSatisfiableFinding;
      impossible?: never;
      translationAmbiguous?: never;
      tooComplex?: never;
      noTranslations?: never;
    }
  | {
      valid?: never;
      invalid?: never;
      satisfiable?: never;
      impossible: GuardrailAutomatedReasoningImpossibleFinding;
      translationAmbiguous?: never;
      tooComplex?: never;
      noTranslations?: never;
    }
  | {
      valid?: never;
      invalid?: never;
      satisfiable?: never;
      impossible?: never;
      translationAmbiguous: GuardrailAutomatedReasoningTranslationAmbiguousFinding;
      tooComplex?: never;
      noTranslations?: never;
    }
  | {
      valid?: never;
      invalid?: never;
      satisfiable?: never;
      impossible?: never;
      translationAmbiguous?: never;
      tooComplex: GuardrailAutomatedReasoningTooComplexFinding;
      noTranslations?: never;
    }
  | {
      valid?: never;
      invalid?: never;
      satisfiable?: never;
      impossible?: never;
      translationAmbiguous?: never;
      tooComplex?: never;
      noTranslations: GuardrailAutomatedReasoningNoTranslationsFinding;
    };
export type GuardrailAutomatedReasoningFindingList = GuardrailAutomatedReasoningFinding[];
export interface GuardrailAutomatedReasoningPolicyAssessment {
  findings?: GuardrailAutomatedReasoningFinding[];
}
export type GuardrailProcessingLatency = number;
export type TextCharactersGuarded = number;
export type TextCharactersTotal = number;
export interface GuardrailTextCharactersCoverage {
  guarded?: number;
  total?: number;
}
export type ImagesGuarded = number;
export type ImagesTotal = number;
export interface GuardrailImageCoverage {
  guarded?: number;
  total?: number;
}
export interface GuardrailCoverage {
  textCharacters?: GuardrailTextCharactersCoverage;
  images?: GuardrailImageCoverage;
}
export interface GuardrailInvocationMetrics {
  guardrailProcessingLatency?: number;
  usage?: GuardrailUsage;
  guardrailCoverage?: GuardrailCoverage;
}
export type GuardrailId = string;
export type GuardrailArn = string;
export type GuardrailOrigin =
  | "REQUEST"
  | "ACCOUNT_ENFORCED"
  | "ORGANIZATION_ENFORCED"
  | (string & {});
export type GuardrailOriginList = GuardrailOrigin[];
export type GuardrailOwnership = "SELF" | "CROSS_ACCOUNT" | (string & {});
export interface AppliedGuardrailDetails {
  guardrailId?: string;
  guardrailVersion?: string;
  guardrailArn?: string;
  guardrailOrigin?: GuardrailOrigin[];
  guardrailOwnership?: GuardrailOwnership;
}
export interface GuardrailAssessment {
  topicPolicy?: GuardrailTopicPolicyAssessment;
  contentPolicy?: GuardrailContentPolicyAssessment;
  wordPolicy?: GuardrailWordPolicyAssessment;
  sensitiveInformationPolicy?: GuardrailSensitiveInformationPolicyAssessment;
  contextualGroundingPolicy?: GuardrailContextualGroundingPolicyAssessment;
  automatedReasoningPolicy?: GuardrailAutomatedReasoningPolicyAssessment;
  invocationMetrics?: GuardrailInvocationMetrics;
  appliedGuardrailDetails?: AppliedGuardrailDetails;
}
export type GuardrailAssessmentList = GuardrailAssessment[];
export interface ApplyGuardrailResponse {
  usage: GuardrailUsage;
  action: GuardrailAction;
  actionReason?: string;
  outputs: GuardrailOutputContent[];
  assessments: GuardrailAssessment[];
  guardrailCoverage?: GuardrailCoverage;
}
export type ConversationalModelId = string;
export type ConversationRole = "user" | "assistant" | "system" | (string & {});
export type ImageFormat = "png" | "jpeg" | "gif" | "webp" | (string & {});
export type S3Uri = string;
export type AccountId = string;
export interface S3Location {
  uri: string;
  bucketOwner?: string;
}
export type ImageSource =
  | { bytes: Uint8Array; s3Location?: never }
  | { bytes?: never; s3Location: S3Location };
export interface ErrorBlock {
  message?: string;
}
export interface ImageBlock {
  format: ImageFormat;
  source: ImageSource;
  error?: ErrorBlock;
}
export type DocumentFormat =
  | "pdf"
  | "csv"
  | "doc"
  | "docx"
  | "xls"
  | "xlsx"
  | "html"
  | "txt"
  | "md"
  | (string & {});
export type DocumentContentBlock = { text: string };
export type DocumentContentBlocks = DocumentContentBlock[];
export type DocumentSource =
  | { bytes: Uint8Array; s3Location?: never; text?: never; content?: never }
  | { bytes?: never; s3Location: S3Location; text?: never; content?: never }
  | { bytes?: never; s3Location?: never; text: string; content?: never }
  | { bytes?: never; s3Location?: never; text?: never; content: DocumentContentBlock[] };
export interface CitationsConfig {
  enabled: boolean;
}
export interface DocumentBlock {
  format?: DocumentFormat;
  name: string;
  source: DocumentSource;
  context?: string;
  citations?: CitationsConfig;
}
export type VideoFormat =
  | "mkv"
  | "mov"
  | "mp4"
  | "webm"
  | "flv"
  | "mpeg"
  | "mpg"
  | "wmv"
  | "three_gp"
  | (string & {});
export type VideoSource =
  | { bytes: Uint8Array; s3Location?: never }
  | { bytes?: never; s3Location: S3Location };
export interface VideoBlock {
  format: VideoFormat;
  source: VideoSource;
}
export type AudioFormat =
  | "mp3"
  | "opus"
  | "wav"
  | "aac"
  | "flac"
  | "mp4"
  | "ogg"
  | "mkv"
  | "mka"
  | "x-aac"
  | "m4a"
  | "mpeg"
  | "mpga"
  | "pcm"
  | "webm"
  | (string & {});
export type AudioSource =
  | { bytes: Uint8Array; s3Location?: never }
  | { bytes?: never; s3Location: S3Location };
export interface AudioBlock {
  format: AudioFormat;
  source: AudioSource;
  error?: ErrorBlock;
}
export type ToolUseId = string;
export type ToolName = string;
export type ToolUseType = "server_tool_use" | (string & {});
export interface ToolUseBlock {
  toolUseId: string;
  name: string;
  input: any;
  type?: ToolUseType;
}
export interface SearchResultContentBlock {
  text: string;
}
export type SearchResultContentBlocks = SearchResultContentBlock[];
export interface SearchResultBlock {
  source: string;
  title: string;
  content: SearchResultContentBlock[];
  citations?: CitationsConfig;
}
export type ToolResultContentBlock =
  | {
      json: any;
      text?: never;
      image?: never;
      document?: never;
      video?: never;
      searchResult?: never;
    }
  | {
      json?: never;
      text: string;
      image?: never;
      document?: never;
      video?: never;
      searchResult?: never;
    }
  | {
      json?: never;
      text?: never;
      image: ImageBlock;
      document?: never;
      video?: never;
      searchResult?: never;
    }
  | {
      json?: never;
      text?: never;
      image?: never;
      document: DocumentBlock;
      video?: never;
      searchResult?: never;
    }
  | {
      json?: never;
      text?: never;
      image?: never;
      document?: never;
      video: VideoBlock;
      searchResult?: never;
    }
  | {
      json?: never;
      text?: never;
      image?: never;
      document?: never;
      video?: never;
      searchResult: SearchResultBlock;
    };
export type ToolResultContentBlocks = ToolResultContentBlock[];
export type ToolResultStatus = "success" | "error" | (string & {});
export interface ToolResultBlock {
  toolUseId: string;
  content: ToolResultContentBlock[];
  status?: ToolResultStatus;
  type?: string;
}
export type GuardrailConverseContentQualifier =
  | "grounding_source"
  | "query"
  | "guard_content"
  | (string & {});
export type GuardrailConverseContentQualifierList = GuardrailConverseContentQualifier[];
export interface GuardrailConverseTextBlock {
  text: string;
  qualifiers?: GuardrailConverseContentQualifier[];
}
export type GuardrailConverseImageFormat = "png" | "jpeg" | (string & {});
export type GuardrailConverseImageSource = { bytes: Uint8Array };
export interface GuardrailConverseImageBlock {
  format: GuardrailConverseImageFormat;
  source: GuardrailConverseImageSource;
}
export type GuardrailConverseContentBlock =
  | { text: GuardrailConverseTextBlock; image?: never }
  | { text?: never; image: GuardrailConverseImageBlock };
export type CachePointType = "default" | (string & {});
export type CacheTTL = "5m" | "1h" | (string & {});
export interface CachePointBlock {
  type: CachePointType;
  ttl?: CacheTTL;
}
export interface ReasoningTextBlock {
  text: string;
  signature?: string;
}
export type ReasoningContentBlock =
  | { reasoningText: ReasoningTextBlock; redactedContent?: never }
  | { reasoningText?: never; redactedContent: Uint8Array };
export type CitationGeneratedContent = { text: string };
export type CitationGeneratedContentList = CitationGeneratedContent[];
export type CitationSourceContent = { text: string };
export type CitationSourceContentList = CitationSourceContent[];
export interface WebLocation {
  url?: string;
  domain?: string;
}
export interface DocumentCharLocation {
  documentIndex?: number;
  start?: number;
  end?: number;
}
export interface DocumentPageLocation {
  documentIndex?: number;
  start?: number;
  end?: number;
}
export interface DocumentChunkLocation {
  documentIndex?: number;
  start?: number;
  end?: number;
}
export interface SearchResultLocation {
  searchResultIndex?: number;
  start?: number;
  end?: number;
}
export type CitationLocation =
  | {
      web: WebLocation;
      documentChar?: never;
      documentPage?: never;
      documentChunk?: never;
      searchResultLocation?: never;
    }
  | {
      web?: never;
      documentChar: DocumentCharLocation;
      documentPage?: never;
      documentChunk?: never;
      searchResultLocation?: never;
    }
  | {
      web?: never;
      documentChar?: never;
      documentPage: DocumentPageLocation;
      documentChunk?: never;
      searchResultLocation?: never;
    }
  | {
      web?: never;
      documentChar?: never;
      documentPage?: never;
      documentChunk: DocumentChunkLocation;
      searchResultLocation?: never;
    }
  | {
      web?: never;
      documentChar?: never;
      documentPage?: never;
      documentChunk?: never;
      searchResultLocation: SearchResultLocation;
    };
export interface Citation {
  title?: string;
  source?: string;
  sourceContent?: CitationSourceContent[];
  location?: CitationLocation;
}
export type Citations = Citation[];
export interface CitationsContentBlock {
  content?: CitationGeneratedContent[];
  citations?: Citation[];
}
export interface ToolReference {
  type?: string;
  name?: string;
  serverName?: string;
}
export interface ToolAdditionBlock {
  tool: ToolReference;
}
export interface ToolRemovalBlock {
  tool: ToolReference;
}
export type ContentBlock =
  | {
      text: string;
      image?: never;
      document?: never;
      video?: never;
      audio?: never;
      toolUse?: never;
      toolResult?: never;
      guardContent?: never;
      cachePoint?: never;
      reasoningContent?: never;
      citationsContent?: never;
      searchResult?: never;
      toolAddition?: never;
      toolRemoval?: never;
    }
  | {
      text?: never;
      image: ImageBlock;
      document?: never;
      video?: never;
      audio?: never;
      toolUse?: never;
      toolResult?: never;
      guardContent?: never;
      cachePoint?: never;
      reasoningContent?: never;
      citationsContent?: never;
      searchResult?: never;
      toolAddition?: never;
      toolRemoval?: never;
    }
  | {
      text?: never;
      image?: never;
      document: DocumentBlock;
      video?: never;
      audio?: never;
      toolUse?: never;
      toolResult?: never;
      guardContent?: never;
      cachePoint?: never;
      reasoningContent?: never;
      citationsContent?: never;
      searchResult?: never;
      toolAddition?: never;
      toolRemoval?: never;
    }
  | {
      text?: never;
      image?: never;
      document?: never;
      video: VideoBlock;
      audio?: never;
      toolUse?: never;
      toolResult?: never;
      guardContent?: never;
      cachePoint?: never;
      reasoningContent?: never;
      citationsContent?: never;
      searchResult?: never;
      toolAddition?: never;
      toolRemoval?: never;
    }
  | {
      text?: never;
      image?: never;
      document?: never;
      video?: never;
      audio: AudioBlock;
      toolUse?: never;
      toolResult?: never;
      guardContent?: never;
      cachePoint?: never;
      reasoningContent?: never;
      citationsContent?: never;
      searchResult?: never;
      toolAddition?: never;
      toolRemoval?: never;
    }
  | {
      text?: never;
      image?: never;
      document?: never;
      video?: never;
      audio?: never;
      toolUse: ToolUseBlock;
      toolResult?: never;
      guardContent?: never;
      cachePoint?: never;
      reasoningContent?: never;
      citationsContent?: never;
      searchResult?: never;
      toolAddition?: never;
      toolRemoval?: never;
    }
  | {
      text?: never;
      image?: never;
      document?: never;
      video?: never;
      audio?: never;
      toolUse?: never;
      toolResult: ToolResultBlock;
      guardContent?: never;
      cachePoint?: never;
      reasoningContent?: never;
      citationsContent?: never;
      searchResult?: never;
      toolAddition?: never;
      toolRemoval?: never;
    }
  | {
      text?: never;
      image?: never;
      document?: never;
      video?: never;
      audio?: never;
      toolUse?: never;
      toolResult?: never;
      guardContent: GuardrailConverseContentBlock;
      cachePoint?: never;
      reasoningContent?: never;
      citationsContent?: never;
      searchResult?: never;
      toolAddition?: never;
      toolRemoval?: never;
    }
  | {
      text?: never;
      image?: never;
      document?: never;
      video?: never;
      audio?: never;
      toolUse?: never;
      toolResult?: never;
      guardContent?: never;
      cachePoint: CachePointBlock;
      reasoningContent?: never;
      citationsContent?: never;
      searchResult?: never;
      toolAddition?: never;
      toolRemoval?: never;
    }
  | {
      text?: never;
      image?: never;
      document?: never;
      video?: never;
      audio?: never;
      toolUse?: never;
      toolResult?: never;
      guardContent?: never;
      cachePoint?: never;
      reasoningContent: ReasoningContentBlock;
      citationsContent?: never;
      searchResult?: never;
      toolAddition?: never;
      toolRemoval?: never;
    }
  | {
      text?: never;
      image?: never;
      document?: never;
      video?: never;
      audio?: never;
      toolUse?: never;
      toolResult?: never;
      guardContent?: never;
      cachePoint?: never;
      reasoningContent?: never;
      citationsContent: CitationsContentBlock;
      searchResult?: never;
      toolAddition?: never;
      toolRemoval?: never;
    }
  | {
      text?: never;
      image?: never;
      document?: never;
      video?: never;
      audio?: never;
      toolUse?: never;
      toolResult?: never;
      guardContent?: never;
      cachePoint?: never;
      reasoningContent?: never;
      citationsContent?: never;
      searchResult: SearchResultBlock;
      toolAddition?: never;
      toolRemoval?: never;
    }
  | {
      text?: never;
      image?: never;
      document?: never;
      video?: never;
      audio?: never;
      toolUse?: never;
      toolResult?: never;
      guardContent?: never;
      cachePoint?: never;
      reasoningContent?: never;
      citationsContent?: never;
      searchResult?: never;
      toolAddition: ToolAdditionBlock;
      toolRemoval?: never;
    }
  | {
      text?: never;
      image?: never;
      document?: never;
      video?: never;
      audio?: never;
      toolUse?: never;
      toolResult?: never;
      guardContent?: never;
      cachePoint?: never;
      reasoningContent?: never;
      citationsContent?: never;
      searchResult?: never;
      toolAddition?: never;
      toolRemoval: ToolRemovalBlock;
    };
export type ContentBlocks = ContentBlock[];
export interface Message {
  role: ConversationRole;
  content: ContentBlock[];
}
export type Messages = Message[];
export type NonEmptyString = string;
export type SystemContentBlock =
  | { text: string; guardContent?: never; cachePoint?: never }
  | { text?: never; guardContent: GuardrailConverseContentBlock; cachePoint?: never }
  | { text?: never; guardContent?: never; cachePoint: CachePointBlock };
export type SystemContentBlocks = SystemContentBlock[];
export type NonEmptyStringList = string[];
export interface InferenceConfiguration {
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  stopSequences?: string[];
}
export type ToolInputSchema = { json: any };
export interface ToolSpecification {
  name: string;
  description?: string;
  inputSchema: ToolInputSchema;
  strict?: boolean;
}
export interface SystemTool {
  name: string;
}
export type Tool =
  | { toolSpec: ToolSpecification; systemTool?: never; cachePoint?: never }
  | { toolSpec?: never; systemTool: SystemTool; cachePoint?: never }
  | { toolSpec?: never; systemTool?: never; cachePoint: CachePointBlock };
export type Tools = Tool[];
export interface AutoToolChoice {}
export interface AnyToolChoice {}
export interface SpecificToolChoice {
  name: string;
}
export type ToolChoice =
  | { auto: AutoToolChoice; any?: never; tool?: never }
  | { auto?: never; any: AnyToolChoice; tool?: never }
  | { auto?: never; any?: never; tool: SpecificToolChoice };
export interface ToolConfiguration {
  tools: Tool[];
  toolChoice?: ToolChoice;
}
export type GuardrailTrace = "enabled" | "disabled" | "enabled_full" | (string & {});
export interface GuardrailConfiguration {
  guardrailIdentifier?: string;
  guardrailVersion?: string;
  trace?: GuardrailTrace;
}
export type PromptVariableValues = { text: string };
export type PromptVariableMap = { [key: string]: PromptVariableValues | undefined };
export type AdditionalModelResponseFieldPaths = string[];
export type RequestMetadata = { [key: string]: string | undefined };
export type PerformanceConfigLatency = "standard" | "optimized" | (string & {});
export interface PerformanceConfiguration {
  latency?: PerformanceConfigLatency;
}
export type ServiceTierType = "priority" | "default" | "flex" | "reserved" | (string & {});
export interface ServiceTier {
  type: ServiceTierType;
}
export type OutputFormatType = "json_schema" | (string & {});
export interface JsonSchemaDefinition {
  schema: string;
  name?: string;
  description?: string;
}
export type OutputFormatStructure = { jsonSchema: JsonSchemaDefinition };
export interface OutputFormat {
  type: OutputFormatType;
  structure: OutputFormatStructure;
}
export interface OutputConfig {
  textFormat?: OutputFormat;
  effort?: string;
}
export interface ConverseRequest {
  modelId: string;
  messages?: Message[];
  system?: SystemContentBlock[];
  inferenceConfig?: InferenceConfiguration;
  toolConfig?: ToolConfiguration;
  guardrailConfig?: GuardrailConfiguration;
  additionalModelRequestFields?: any;
  promptVariables?: { [key: string]: PromptVariableValues | undefined };
  additionalModelResponseFieldPaths?: string[];
  requestMetadata?: { [key: string]: string | undefined };
  performanceConfig?: PerformanceConfiguration;
  serviceTier?: ServiceTier;
  outputConfig?: OutputConfig;
}
export type ConverseOutput = { message: Message };
export type StopReason =
  | "end_turn"
  | "tool_use"
  | "max_tokens"
  | "stop_sequence"
  | "guardrail_intervened"
  | "content_filtered"
  | "malformed_model_output"
  | "malformed_tool_use"
  | "model_context_window_exceeded"
  | (string & {});
export interface CacheDetail {
  ttl: CacheTTL;
  inputTokens: number;
}
export type CacheDetailsList = CacheDetail[];
export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  cacheReadInputTokens?: number;
  cacheWriteInputTokens?: number;
  cacheDetails?: CacheDetail[];
}
export interface ConverseMetrics {
  latencyMs: number;
}
export type ModelOutputs = string[];
export type GuardrailAssessmentMap = { [key: string]: GuardrailAssessment | undefined };
export type GuardrailAssessmentListMap = { [key: string]: GuardrailAssessment[] | undefined };
export interface GuardrailTraceAssessment {
  modelOutput?: string[];
  inputAssessment?: { [key: string]: GuardrailAssessment | undefined };
  outputAssessments?: { [key: string]: GuardrailAssessment[] | undefined };
  actionReason?: string;
}
export type InvokedModelId = string;
export interface PromptRouterTrace {
  invokedModelId?: string;
}
export interface ConverseTrace {
  guardrail?: GuardrailTraceAssessment;
  promptRouter?: PromptRouterTrace;
}
export interface ConverseResponse {
  output: ConverseOutput;
  stopReason: StopReason;
  usage: TokenUsage;
  metrics: ConverseMetrics;
  additionalModelResponseFields?: any;
  trace?: ConverseTrace;
  performanceConfig?: PerformanceConfiguration;
  serviceTier?: ServiceTier;
}
export type GuardrailStreamProcessingMode = "sync" | "async" | (string & {});
export interface GuardrailStreamConfiguration {
  guardrailIdentifier?: string;
  guardrailVersion?: string;
  trace?: GuardrailTrace;
  streamProcessingMode?: GuardrailStreamProcessingMode;
}
export interface ConverseStreamRequest {
  modelId: string;
  messages?: Message[];
  system?: SystemContentBlock[];
  inferenceConfig?: InferenceConfiguration;
  toolConfig?: ToolConfiguration;
  guardrailConfig?: GuardrailStreamConfiguration;
  additionalModelRequestFields?: any;
  promptVariables?: { [key: string]: PromptVariableValues | undefined };
  additionalModelResponseFieldPaths?: string[];
  requestMetadata?: { [key: string]: string | undefined };
  performanceConfig?: PerformanceConfiguration;
  serviceTier?: ServiceTier;
  outputConfig?: OutputConfig;
}
export interface MessageStartEvent {
  role: ConversationRole;
}
export interface ToolUseBlockStart {
  toolUseId: string;
  name: string;
  type?: ToolUseType;
}
export interface ToolResultBlockStart {
  toolUseId: string;
  type?: string;
  status?: ToolResultStatus;
}
export interface ImageBlockStart {
  format: ImageFormat;
}
export type ContentBlockStart =
  | { toolUse: ToolUseBlockStart; toolResult?: never; image?: never }
  | { toolUse?: never; toolResult: ToolResultBlockStart; image?: never }
  | { toolUse?: never; toolResult?: never; image: ImageBlockStart };
export type NonNegativeInteger = number;
export interface ContentBlockStartEvent {
  start: ContentBlockStart;
  contentBlockIndex: number;
}
export interface ToolUseBlockDelta {
  input: string;
}
export type ToolResultBlockDelta = { text: string; json?: never } | { text?: never; json: any };
export type ToolResultBlocksDelta = ToolResultBlockDelta[];
export type ReasoningContentBlockDelta =
  | { text: string; redactedContent?: never; signature?: never }
  | { text?: never; redactedContent: Uint8Array; signature?: never }
  | { text?: never; redactedContent?: never; signature: string };
export interface CitationSourceContentDelta {
  text?: string;
}
export type CitationSourceContentListDelta = CitationSourceContentDelta[];
export interface CitationsDelta {
  title?: string;
  source?: string;
  sourceContent?: CitationSourceContentDelta[];
  location?: CitationLocation;
}
export interface ImageBlockDelta {
  source?: ImageSource;
  error?: ErrorBlock;
}
export type ContentBlockDelta =
  | {
      text: string;
      toolUse?: never;
      toolResult?: never;
      reasoningContent?: never;
      citation?: never;
      image?: never;
    }
  | {
      text?: never;
      toolUse: ToolUseBlockDelta;
      toolResult?: never;
      reasoningContent?: never;
      citation?: never;
      image?: never;
    }
  | {
      text?: never;
      toolUse?: never;
      toolResult: ToolResultBlockDelta[];
      reasoningContent?: never;
      citation?: never;
      image?: never;
    }
  | {
      text?: never;
      toolUse?: never;
      toolResult?: never;
      reasoningContent: ReasoningContentBlockDelta;
      citation?: never;
      image?: never;
    }
  | {
      text?: never;
      toolUse?: never;
      toolResult?: never;
      reasoningContent?: never;
      citation: CitationsDelta;
      image?: never;
    }
  | {
      text?: never;
      toolUse?: never;
      toolResult?: never;
      reasoningContent?: never;
      citation?: never;
      image: ImageBlockDelta;
    };
export interface ContentBlockDeltaEvent {
  delta: ContentBlockDelta;
  contentBlockIndex: number;
}
export interface ContentBlockStopEvent {
  contentBlockIndex: number;
}
export interface MessageStopEvent {
  stopReason: StopReason;
  additionalModelResponseFields?: any;
}
export interface ConverseStreamMetrics {
  latencyMs: number;
}
export interface ConverseStreamTrace {
  guardrail?: GuardrailTraceAssessment;
  promptRouter?: PromptRouterTrace;
}
export interface ConverseStreamMetadataEvent {
  usage: TokenUsage;
  metrics: ConverseStreamMetrics;
  trace?: ConverseStreamTrace;
  performanceConfig?: PerformanceConfiguration;
  serviceTier?: ServiceTier;
}
export type NonBlankString = string;
export type StatusCode = number;
export type ConverseStreamOutput =
  | {
      messageStart: MessageStartEvent;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop?: never;
      metadata?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      serviceUnavailableException?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart: ContentBlockStartEvent;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop?: never;
      metadata?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      serviceUnavailableException?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta: ContentBlockDeltaEvent;
      contentBlockStop?: never;
      messageStop?: never;
      metadata?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      serviceUnavailableException?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop: ContentBlockStopEvent;
      messageStop?: never;
      metadata?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      serviceUnavailableException?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop: MessageStopEvent;
      metadata?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      serviceUnavailableException?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop?: never;
      metadata: ConverseStreamMetadataEvent;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      serviceUnavailableException?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop?: never;
      metadata?: never;
      internalServerException: InternalServerException;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      serviceUnavailableException?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop?: never;
      metadata?: never;
      internalServerException?: never;
      modelStreamErrorException: ModelStreamErrorException;
      validationException?: never;
      throttlingException?: never;
      serviceUnavailableException?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop?: never;
      metadata?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException: ValidationException;
      throttlingException?: never;
      serviceUnavailableException?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop?: never;
      metadata?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException: ThrottlingException;
      serviceUnavailableException?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop?: never;
      metadata?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      serviceUnavailableException: ServiceUnavailableException;
    };
export interface ConverseStreamResponse {
  stream?: stream.Stream<ConverseStreamOutput, Error, never>;
}
export type FoundationModelVersionIdentifier = string;
export type Body = Uint8Array | redacted.Redacted<Uint8Array>;
export interface InvokeModelTokensRequest {
  body: Uint8Array | redacted.Redacted<Uint8Array>;
}
export interface ConverseTokensRequest {
  messages?: Message[];
  system?: SystemContentBlock[];
  toolConfig?: ToolConfiguration;
  additionalModelRequestFields?: any;
}
export type CountTokensInput =
  | { invokeModel: InvokeModelTokensRequest; converse?: never }
  | { invokeModel?: never; converse: ConverseTokensRequest };
export interface CountTokensRequest {
  modelId: string;
  input: CountTokensInput;
}
export interface CountTokensResponse {
  inputTokens: number;
}
export type InvocationArn = string;
export interface GetAsyncInvokeRequest {
  invocationArn: string;
}
export type AsyncInvokeArn = string;
export type AsyncInvokeIdempotencyToken = string;
export type AsyncInvokeStatus = "InProgress" | "Completed" | "Failed" | (string & {});
export type AsyncInvokeMessage = string | redacted.Redacted<string>;
export type KmsKeyId = string;
export interface AsyncInvokeS3OutputDataConfig {
  s3Uri: string;
  kmsKeyId?: string;
  bucketOwner?: string;
}
export type AsyncInvokeOutputDataConfig = { s3OutputDataConfig: AsyncInvokeS3OutputDataConfig };
export interface GetAsyncInvokeResponse {
  invocationArn: string;
  modelArn: string;
  clientRequestToken?: string;
  status: AsyncInvokeStatus;
  failureMessage?: string | redacted.Redacted<string>;
  submitTime: Date;
  lastModifiedTime?: Date;
  endTime?: Date;
  outputDataConfig: AsyncInvokeOutputDataConfig;
}
export type GuardrailChecksRole = "user" | "assistant" | "system" | (string & {});
export type GuardrailChecksTextContent = string | redacted.Redacted<string>;
export type GuardrailChecksContentBlock = { text: string | redacted.Redacted<string> };
export type GuardrailChecksContentBlockList = GuardrailChecksContentBlock[];
export interface GuardrailChecksMessage {
  role: GuardrailChecksRole;
  content: GuardrailChecksContentBlock[];
}
export type GuardrailChecksMessageList = GuardrailChecksMessage[];
export type GuardrailChecksContentFilterCategory =
  | "VIOLENCE"
  | "HATE"
  | "SEXUAL"
  | "MISCONDUCT"
  | "INSULTS"
  | (string & {});
export interface GuardrailChecksContentFilterCategoryConfig {
  category: GuardrailChecksContentFilterCategory;
}
export type GuardrailChecksContentFilterCategoryConfigList =
  GuardrailChecksContentFilterCategoryConfig[];
export interface GuardrailChecksContentFilterConfig {
  categories: GuardrailChecksContentFilterCategoryConfig[];
}
export type GuardrailChecksPromptAttackCategory =
  | "JAILBREAK"
  | "PROMPT_INJECTION"
  | "PROMPT_LEAKAGE"
  | (string & {});
export interface GuardrailChecksPromptAttackCategoryConfig {
  category: GuardrailChecksPromptAttackCategory;
}
export type GuardrailChecksPromptAttackCategoryConfigList =
  GuardrailChecksPromptAttackCategoryConfig[];
export interface GuardrailChecksPromptAttackConfig {
  categories: GuardrailChecksPromptAttackCategoryConfig[];
}
export type GuardrailChecksSensitiveInformationEntityType =
  | "ADDRESS"
  | "AGE"
  | "AWS_ACCESS_KEY"
  | "AWS_SECRET_KEY"
  | "CA_HEALTH_NUMBER"
  | "CA_SOCIAL_INSURANCE_NUMBER"
  | "CREDIT_DEBIT_CARD_CVV"
  | "CREDIT_DEBIT_CARD_EXPIRY"
  | "CREDIT_DEBIT_CARD_NUMBER"
  | "DRIVER_ID"
  | "EMAIL"
  | "INTERNATIONAL_BANK_ACCOUNT_NUMBER"
  | "IP_ADDRESS"
  | "LICENSE_PLATE"
  | "MAC_ADDRESS"
  | "NAME"
  | "PASSWORD"
  | "PHONE"
  | "PIN"
  | "SWIFT_CODE"
  | "UK_NATIONAL_HEALTH_SERVICE_NUMBER"
  | "UK_NATIONAL_INSURANCE_NUMBER"
  | "UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER"
  | "URL"
  | "USERNAME"
  | "US_BANK_ACCOUNT_NUMBER"
  | "US_BANK_ROUTING_NUMBER"
  | "US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER"
  | "US_PASSPORT_NUMBER"
  | "US_SOCIAL_SECURITY_NUMBER"
  | "VEHICLE_IDENTIFICATION_NUMBER"
  | (string & {});
export interface GuardrailChecksSensitiveInformationEntityConfig {
  type: GuardrailChecksSensitiveInformationEntityType;
}
export type GuardrailChecksSensitiveInformationEntityConfigList =
  GuardrailChecksSensitiveInformationEntityConfig[];
export interface GuardrailChecksSensitiveInformationConfig {
  entities: GuardrailChecksSensitiveInformationEntityConfig[];
}
export interface GuardrailChecksConfig {
  contentFilter?: GuardrailChecksContentFilterConfig;
  promptAttack?: GuardrailChecksPromptAttackConfig;
  sensitiveInformation?: GuardrailChecksSensitiveInformationConfig;
}
export interface InvokeGuardrailChecksRequest {
  messages: GuardrailChecksMessage[];
  checks: GuardrailChecksConfig;
}
export interface GuardrailChecksContentFilterResultEntry {
  category: GuardrailChecksContentFilterCategory;
  severityScore: number;
}
export type GuardrailChecksContentFilterResultList = GuardrailChecksContentFilterResultEntry[];
export interface GuardrailChecksContentFilterResult {
  results: GuardrailChecksContentFilterResultEntry[];
}
export interface GuardrailChecksPromptAttackResultEntry {
  category: GuardrailChecksPromptAttackCategory;
  severityScore: number;
}
export type GuardrailChecksPromptAttackResultList = GuardrailChecksPromptAttackResultEntry[];
export interface GuardrailChecksPromptAttackResult {
  results: GuardrailChecksPromptAttackResultEntry[];
}
export interface GuardrailChecksSensitiveInformationResultEntry {
  type: GuardrailChecksSensitiveInformationEntityType;
  confidenceScore: number;
  beginOffset: number;
  endOffset: number;
  messageIndex: number;
  contentIndex: number;
}
export type GuardrailChecksSensitiveInformationResultList =
  GuardrailChecksSensitiveInformationResultEntry[];
export interface GuardrailChecksSensitiveInformationResult {
  results: GuardrailChecksSensitiveInformationResultEntry[];
  truncated?: boolean;
}
export interface GuardrailChecksResults {
  contentFilter?: GuardrailChecksContentFilterResult;
  promptAttack?: GuardrailChecksPromptAttackResult;
  sensitiveInformation?: GuardrailChecksSensitiveInformationResult;
}
export interface GuardrailChecksContentFilterUsage {
  textUnits: number;
}
export interface GuardrailChecksPromptAttackUsage {
  textUnits: number;
}
export interface GuardrailChecksSensitiveInformationUsage {
  textUnits: number;
}
export interface GuardrailChecksUsageResults {
  contentFilter?: GuardrailChecksContentFilterUsage;
  promptAttack?: GuardrailChecksPromptAttackUsage;
  sensitiveInformation?: GuardrailChecksSensitiveInformationUsage;
}
export interface InvokeGuardrailChecksResponse {
  results: GuardrailChecksResults;
  usage: GuardrailChecksUsageResults;
}
export type MimeType = string;
export type InvokeModelIdentifier = string;
export type Trace = "ENABLED" | "DISABLED" | "ENABLED_FULL" | (string & {});
export type RequestMetadataJson = string | redacted.Redacted<string>;
export interface InvokeModelRequest {
  body?: T.StreamingInputBody;
  contentType?: string;
  accept?: string;
  modelId: string;
  trace?: Trace;
  guardrailIdentifier?: string;
  guardrailVersion?: string;
  performanceConfigLatency?: PerformanceConfigLatency;
  serviceTier?: ServiceTierType;
  requestMetadata?: string | redacted.Redacted<string>;
}
export interface InvokeModelResponse {
  body: T.StreamingOutputBody;
  contentType: string;
  performanceConfigLatency?: PerformanceConfigLatency;
  serviceTier?: ServiceTierType;
}
export type PartBody = Uint8Array | redacted.Redacted<Uint8Array>;
export interface BidirectionalInputPayloadPart {
  bytes?: Uint8Array | redacted.Redacted<Uint8Array>;
}
export type InvokeModelWithBidirectionalStreamInput = { chunk: BidirectionalInputPayloadPart };
export interface InvokeModelWithBidirectionalStreamRequest {
  modelId: string;
  body: stream.Stream<InvokeModelWithBidirectionalStreamInput, Error, never>;
}
export interface BidirectionalOutputPayloadPart {
  bytes?: Uint8Array | redacted.Redacted<Uint8Array>;
}
export type InvokeModelWithBidirectionalStreamOutput =
  | {
      chunk: BidirectionalOutputPayloadPart;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      modelTimeoutException?: never;
      serviceUnavailableException?: never;
    }
  | {
      chunk?: never;
      internalServerException: InternalServerException;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      modelTimeoutException?: never;
      serviceUnavailableException?: never;
    }
  | {
      chunk?: never;
      internalServerException?: never;
      modelStreamErrorException: ModelStreamErrorException;
      validationException?: never;
      throttlingException?: never;
      modelTimeoutException?: never;
      serviceUnavailableException?: never;
    }
  | {
      chunk?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException: ValidationException;
      throttlingException?: never;
      modelTimeoutException?: never;
      serviceUnavailableException?: never;
    }
  | {
      chunk?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException: ThrottlingException;
      modelTimeoutException?: never;
      serviceUnavailableException?: never;
    }
  | {
      chunk?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      modelTimeoutException: ModelTimeoutException;
      serviceUnavailableException?: never;
    }
  | {
      chunk?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      modelTimeoutException?: never;
      serviceUnavailableException: ServiceUnavailableException;
    };
export interface InvokeModelWithBidirectionalStreamResponse {
  body: stream.Stream<InvokeModelWithBidirectionalStreamOutput, Error, never>;
}
export interface InvokeModelWithResponseStreamRequest {
  body?: T.StreamingInputBody;
  contentType?: string;
  accept?: string;
  modelId: string;
  trace?: Trace;
  guardrailIdentifier?: string;
  guardrailVersion?: string;
  performanceConfigLatency?: PerformanceConfigLatency;
  serviceTier?: ServiceTierType;
  requestMetadata?: string | redacted.Redacted<string>;
}
export interface PayloadPart {
  bytes?: Uint8Array | redacted.Redacted<Uint8Array>;
}
export type ResponseStream =
  | {
      chunk: PayloadPart;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      modelTimeoutException?: never;
      serviceUnavailableException?: never;
    }
  | {
      chunk?: never;
      internalServerException: InternalServerException;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      modelTimeoutException?: never;
      serviceUnavailableException?: never;
    }
  | {
      chunk?: never;
      internalServerException?: never;
      modelStreamErrorException: ModelStreamErrorException;
      validationException?: never;
      throttlingException?: never;
      modelTimeoutException?: never;
      serviceUnavailableException?: never;
    }
  | {
      chunk?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException: ValidationException;
      throttlingException?: never;
      modelTimeoutException?: never;
      serviceUnavailableException?: never;
    }
  | {
      chunk?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException: ThrottlingException;
      modelTimeoutException?: never;
      serviceUnavailableException?: never;
    }
  | {
      chunk?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      modelTimeoutException: ModelTimeoutException;
      serviceUnavailableException?: never;
    }
  | {
      chunk?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      modelTimeoutException?: never;
      serviceUnavailableException: ServiceUnavailableException;
    };
export interface InvokeModelWithResponseStreamResponse {
  body: stream.Stream<ResponseStream, Error, never>;
  contentType: string;
  performanceConfigLatency?: PerformanceConfigLatency;
  serviceTier?: ServiceTierType;
}
export type MaxResults = number;
export type PaginationToken = string;
export type SortAsyncInvocationBy = "SubmissionTime" | (string & {});
export type SortOrder = "Ascending" | "Descending" | (string & {});
export interface ListAsyncInvokesRequest {
  submitTimeAfter?: Date;
  submitTimeBefore?: Date;
  statusEquals?: AsyncInvokeStatus;
  maxResults?: number;
  nextToken?: string;
  sortBy?: SortAsyncInvocationBy;
  sortOrder?: SortOrder;
}
export interface AsyncInvokeSummary {
  invocationArn: string;
  modelArn: string;
  clientRequestToken?: string;
  status?: AsyncInvokeStatus;
  failureMessage?: string | redacted.Redacted<string>;
  submitTime: Date;
  lastModifiedTime?: Date;
  endTime?: Date;
  outputDataConfig: AsyncInvokeOutputDataConfig;
}
export type AsyncInvokeSummaries = AsyncInvokeSummary[];
export interface ListAsyncInvokesResponse {
  nextToken?: string;
  asyncInvokeSummaries?: AsyncInvokeSummary[];
}
export type AsyncInvokeIdentifier = string;
export type ModelInputPayload = unknown;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export type TagList = Tag[];
export interface StartAsyncInvokeRequest {
  clientRequestToken?: string;
  modelId: string;
  modelInput: any;
  outputDataConfig: AsyncInvokeOutputDataConfig;
  tags?: Tag[];
}
export interface StartAsyncInvokeResponse {
  invocationArn: string;
}
export type ApplyGuardrailError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The action to apply a guardrail.
 *
 * For troubleshooting some of the common errors you might encounter when using the `ApplyGuardrail` API, see Troubleshooting Amazon Bedrock API Error Codes in the Amazon Bedrock User Guide
 */
export const applyGuardrail: API.OperationMethod<
  ApplyGuardrailRequest,
  ApplyGuardrailResponse,
  ApplyGuardrailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1, __c0, 1) as any as S.Schema<ApplyGuardrailRequest>,
  output: __S(2, __c0, 2) as any as S.Schema<ApplyGuardrailResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ApplyGuardrail",
  telemetry: TELEMETRY,
  span: "ApplyGuardrail",
}));

export type ConverseError =
  | AccessDeniedException
  | InternalServerException
  | ModelErrorException
  | ModelNotReadyException
  | ModelTimeoutException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends messages to the specified Amazon Bedrock model. `Converse` provides a consistent interface that works with all models that support messages. This allows you to write code once and use it with different models. If a model has unique inference parameters, you can also pass those unique parameters to the model.
 *
 * Amazon Bedrock doesn't store any text, images, or documents that you provide as content. The data is only used to generate the response.
 *
 * You can submit a prompt by including it in the `messages` field, specifying the `modelId` of a foundation model or inference profile to run inference on it, and including any other fields that are relevant to your use case.
 *
 * You can also submit a prompt from Prompt management by specifying the ARN of the prompt version and including a map of variables to values in the `promptVariables` field. You can append more messages to the prompt by using the `messages` field. If you use a prompt from Prompt management, you can't include the following fields in the request: `additionalModelRequestFields`, `inferenceConfig`, `system`, or `toolConfig`. Instead, these fields must be defined through Prompt management. For more information, see Use a prompt from Prompt management.
 *
 * For information about the Converse API, see *Use the Converse API* in the *Amazon Bedrock User Guide*. To use a guardrail, see *Use a guardrail with the Converse API* in the *Amazon Bedrock User Guide*. To use a tool with a model, see *Tool use (Function calling)* in the *Amazon Bedrock User Guide*
 *
 * For example code, see *Converse API examples* in the *Amazon Bedrock User Guide*.
 *
 * This operation requires permission for the `bedrock:InvokeModel` action.
 *
 * To deny all inference access to resources that you specify in the modelId field, you need to deny access to the `bedrock:InvokeModel` and `bedrock:InvokeModelWithResponseStream` actions. Doing this also denies access to the resource through the base inference actions (InvokeModel and InvokeModelWithResponseStream). For more information see Deny access for inference on specific models.
 *
 * For troubleshooting some of the common errors you might encounter when using the `Converse` API, see Troubleshooting Amazon Bedrock API Error Codes in the Amazon Bedrock User Guide
 */
export const converse: API.OperationMethod<
  ConverseRequest,
  ConverseResponse,
  ConverseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(161, __c5, 1) as any as S.Schema<ConverseRequest>,
  output: __S(163, __c5, 3) as any as S.Schema<ConverseResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ModelErrorException,
    ModelNotReadyException,
    ModelTimeoutException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Converse",
  telemetry: TELEMETRY,
  span: {
    op: "Converse",
    attributes: { "gen_ai.provider.name": "aws.bedrock", "gen_ai.operation.name": "chat" },
    input: {
      modelId: [{ name: "gen_ai.request.model" }],
      inferenceConfig: [
        { name: "gen_ai.request.max_tokens", field: "maxTokens" },
        { name: "gen_ai.request.temperature", field: "temperature" },
        { name: "gen_ai.request.top_p", field: "topP" },
        { name: "gen_ai.request.stop_sequences", field: "stopSequences" },
      ],
      guardrailConfig: [{ name: "aws.bedrock.guardrail.id", field: "guardrailIdentifier" }],
    },
    output: {
      stopReason: [{ name: "gen_ai.response.finish_reasons", transform: "list" }],
      usage: [
        { name: "gen_ai.usage.input_tokens", field: "inputTokens" },
        { name: "gen_ai.usage.output_tokens", field: "outputTokens" },
        {
          name: "gen_ai.usage.cache_read.input_tokens",
          field: "cacheReadInputTokens",
          transform: "nonZero",
        },
        {
          name: "gen_ai.usage.cache_write.input_tokens",
          field: "cacheWriteInputTokens",
          transform: "nonZero",
        },
      ],
    },
    rename: TxName.nameTemplate("chat {gen_ai.request.model}"),
  },
}));

export type ConverseStreamError =
  | AccessDeniedException
  | InternalServerException
  | ModelErrorException
  | ModelNotReadyException
  | ModelTimeoutException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends messages to the specified Amazon Bedrock model and returns the response in a stream. `ConverseStream` provides a consistent API that works with all Amazon Bedrock models that support messages. This allows you to write code once and use it with different models. Should a model have unique inference parameters, you can also pass those unique parameters to the model.
 *
 * To find out if a model supports streaming, call GetFoundationModel and check the `responseStreamingSupported` field in the response.
 *
 * The CLI doesn't support streaming operations in Amazon Bedrock, including `ConverseStream`.
 *
 * Amazon Bedrock doesn't store any text, images, or documents that you provide as content. The data is only used to generate the response.
 *
 * You can submit a prompt by including it in the `messages` field, specifying the `modelId` of a foundation model or inference profile to run inference on it, and including any other fields that are relevant to your use case.
 *
 * You can also submit a prompt from Prompt management by specifying the ARN of the prompt version and including a map of variables to values in the `promptVariables` field. You can append more messages to the prompt by using the `messages` field. If you use a prompt from Prompt management, you can't include the following fields in the request: `additionalModelRequestFields`, `inferenceConfig`, `system`, or `toolConfig`. Instead, these fields must be defined through Prompt management. For more information, see Use a prompt from Prompt management.
 *
 * For information about the Converse API, see *Use the Converse API* in the *Amazon Bedrock User Guide*. To use a guardrail, see *Use a guardrail with the Converse API* in the *Amazon Bedrock User Guide*. To use a tool with a model, see *Tool use (Function calling)* in the *Amazon Bedrock User Guide*
 *
 * For example code, see *Conversation streaming example* in the *Amazon Bedrock User Guide*.
 *
 * This operation requires permission for the `bedrock:InvokeModelWithResponseStream` action.
 *
 * To deny all inference access to resources that you specify in the modelId field, you need to deny access to the `bedrock:InvokeModel` and `bedrock:InvokeModelWithResponseStream` actions. Doing this also denies access to the resource through the base inference actions (InvokeModel and InvokeModelWithResponseStream). For more information see Deny access for inference on specific models.
 *
 * For troubleshooting some of the common errors you might encounter when using the `ConverseStream` API, see Troubleshooting Amazon Bedrock API Error Codes in the Amazon Bedrock User Guide
 */
export const converseStream: API.OperationMethod<
  ConverseStreamRequest,
  ConverseStreamResponse,
  ConverseStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(321, __c10, 1) as any as S.Schema<ConverseStreamRequest>,
  output: __S(340, __c10, 20) as any as S.Schema<ConverseStreamResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ModelErrorException,
    ModelNotReadyException,
    ModelTimeoutException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConverseStream",
  telemetry: TELEMETRY,
  span: {
    op: "ConverseStream",
    attributes: {
      "gen_ai.provider.name": "aws.bedrock",
      "gen_ai.operation.name": "chat",
      "gen_ai.request.stream": true,
    },
    input: {
      modelId: [{ name: "gen_ai.request.model" }],
      inferenceConfig: [
        { name: "gen_ai.request.max_tokens", field: "maxTokens" },
        { name: "gen_ai.request.temperature", field: "temperature" },
        { name: "gen_ai.request.top_p", field: "topP" },
        { name: "gen_ai.request.stop_sequences", field: "stopSequences" },
      ],
      guardrailConfig: [{ name: "aws.bedrock.guardrail.id", field: "guardrailIdentifier" }],
    },
    rename: TxName.nameTemplate("chat {gen_ai.request.model}"),
  },
}));

export type CountTokensError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the token count for a given inference request. This operation helps you estimate token usage before sending requests to foundation models by returning the token count that would be used if the same input were sent to the model in an inference request.
 *
 * Token counting is model-specific because different models use different tokenization strategies. The token count returned by this operation will match the token count that would be charged if the same input were sent to the model in an `InvokeModel` or `Converse` request.
 *
 * You can use this operation to:
 *
 * - Estimate costs before sending inference requests.
 *
 * - Optimize prompts to fit within token limits.
 *
 * - Plan for token usage in your applications.
 *
 * This operation accepts the same input formats as `InvokeModel` and `Converse`, allowing you to count tokens for both raw text inputs and structured conversation formats.
 *
 * The following operations are related to `CountTokens`:
 *
 * - InvokeModel - Sends inference requests to foundation models
 *
 * - Converse - Sends conversation-based inference requests to foundation models
 */
export const countTokens: API.OperationMethod<
  CountTokensRequest,
  CountTokensResponse,
  CountTokensError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(355, __c11, 3) as any as S.Schema<CountTokensRequest>,
  output: __S(356, __c11, 4) as any as S.Schema<CountTokensResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CountTokens",
  telemetry: TELEMETRY,
  span: "CountTokens",
}));

export type GetAsyncInvokeError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieve information about an asynchronous invocation.
 */
export const getAsyncInvoke: API.OperationMethod<
  GetAsyncInvokeRequest,
  GetAsyncInvokeResponse,
  GetAsyncInvokeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c12, 0) as any as S.Schema<GetAsyncInvokeRequest>,
  output: __S(385, __c12, 1) as any as S.Schema<GetAsyncInvokeResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAsyncInvoke",
  telemetry: TELEMETRY,
  span: "GetAsyncInvoke",
}));

export type InvokeGuardrailChecksError =
  | AccessDeniedException
  | InternalServerException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Evaluates messages against inline guardrail checks. You specify the check configurations directly in the request, and Amazon Bedrock returns per-check results with severity or confidence scores.
 */
export const invokeGuardrailChecks: API.OperationMethod<
  InvokeGuardrailChecksRequest,
  InvokeGuardrailChecksResponse,
  InvokeGuardrailChecksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(458, __c14, 10) as any as S.Schema<InvokeGuardrailChecksRequest>,
  output: __S(468, __c14, 20) as any as S.Schema<InvokeGuardrailChecksResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeGuardrailChecks",
  telemetry: TELEMETRY,
  span: "InvokeGuardrailChecks",
}));

export type InvokeModelError =
  | AccessDeniedException
  | InternalServerException
  | ModelErrorException
  | ModelNotReadyException
  | ModelTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Invokes the specified Amazon Bedrock model to run inference using the prompt and inference parameters provided in the request body. You use model inference to generate text, images, and embeddings.
 *
 * For example code, see *Invoke model code examples* in the *Amazon Bedrock User Guide*.
 *
 * This operation requires permission for the `bedrock:InvokeModel` action.
 *
 * To deny all inference access to resources that you specify in the modelId field, you need to deny access to the `bedrock:InvokeModel` and `bedrock:InvokeModelWithResponseStream` actions. Doing this also denies access to the resource through the Converse API actions (Converse and ConverseStream). For more information see Deny access for inference on specific models.
 *
 * For troubleshooting some of the common errors you might encounter when using the `InvokeModel` API, see Troubleshooting Amazon Bedrock API Error Codes in the Amazon Bedrock User Guide
 */
export const invokeModel: API.OperationMethod<
  InvokeModelRequest,
  InvokeModelResponse,
  InvokeModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c15, 0) as any as S.Schema<InvokeModelRequest>,
  output: __S(481, __c15, 1) as any as S.Schema<InvokeModelResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ModelErrorException,
    ModelNotReadyException,
    ModelTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeModel",
  telemetry: TELEMETRY,
  span: "InvokeModel",
}));

export type InvokeModelWithBidirectionalStreamError =
  | AccessDeniedException
  | InternalServerException
  | ModelErrorException
  | ModelNotReadyException
  | ModelStreamErrorException
  | ModelTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Invoke the specified Amazon Bedrock model to run inference using the bidirectional stream. The response is returned in a stream that remains open for 8 minutes. A single session can contain multiple prompts and responses from the model. The prompts to the model are provided as audio files and the model's responses are spoken back to the user and transcribed.
 *
 * It is possible for users to interrupt the model's response with a new prompt, which will halt the response speech. The model will retain contextual awareness of the conversation while pivoting to respond to the new prompt.
 */
export const invokeModelWithBidirectionalStream: API.OperationMethod<
  InvokeModelWithBidirectionalStreamRequest,
  InvokeModelWithBidirectionalStreamResponse,
  InvokeModelWithBidirectionalStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(513, __c16, 1) as any as S.Schema<InvokeModelWithBidirectionalStreamRequest>,
  output: __S(514, __c16, 2) as any as S.Schema<InvokeModelWithBidirectionalStreamResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ModelErrorException,
    ModelNotReadyException,
    ModelStreamErrorException,
    ModelTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeModelWithBidirectionalStream",
  telemetry: TELEMETRY,
  span: "InvokeModelWithBidirectionalStream",
}));

export type InvokeModelWithResponseStreamError =
  | AccessDeniedException
  | InternalServerException
  | ModelErrorException
  | ModelNotReadyException
  | ModelStreamErrorException
  | ModelTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Invoke the specified Amazon Bedrock model to run inference using the prompt and inference parameters provided in the request body. The response is returned in a stream.
 *
 * To see if a model supports streaming, call GetFoundationModel and check the `responseStreamingSupported` field in the response.
 *
 * The CLI doesn't support streaming operations in Amazon Bedrock, including `InvokeModelWithResponseStream`.
 *
 * For example code, see *Invoke model with streaming code example* in the *Amazon Bedrock User Guide*.
 *
 * This operation requires permissions to perform the `bedrock:InvokeModelWithResponseStream` action.
 *
 * To deny all inference access to resources that you specify in the modelId field, you need to deny access to the `bedrock:InvokeModel` and `bedrock:InvokeModelWithResponseStream` actions. Doing this also denies access to the resource through the Converse API actions (Converse and ConverseStream). For more information see Deny access for inference on specific models.
 *
 * For troubleshooting some of the common errors you might encounter when using the `InvokeModelWithResponseStream` API, see Troubleshooting Amazon Bedrock API Error Codes in the Amazon Bedrock User Guide
 */
export const invokeModelWithResponseStream: API.OperationMethod<
  InvokeModelWithResponseStreamRequest,
  InvokeModelWithResponseStreamResponse,
  InvokeModelWithResponseStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c18, 0) as any as S.Schema<InvokeModelWithResponseStreamRequest>,
  output: __S(577, __c18, 1) as any as S.Schema<InvokeModelWithResponseStreamResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ModelErrorException,
    ModelNotReadyException,
    ModelStreamErrorException,
    ModelTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeModelWithResponseStream",
  telemetry: TELEMETRY,
  span: "InvokeModelWithResponseStream",
}));

export type ListAsyncInvokesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists asynchronous invocations.
 */
export const listAsyncInvokes: API.PaginatedOperationMethod<
  ListAsyncInvokesRequest,
  ListAsyncInvokesResponse,
  ListAsyncInvokesError,
  Credentials | HttpClient.HttpClient,
  AsyncInvokeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(608, __c19, 0) as any as S.Schema<ListAsyncInvokesRequest>,
  output: __S(611, __c19, 3) as any as S.Schema<ListAsyncInvokesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAsyncInvokes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "asyncInvokeSummaries",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListAsyncInvokes",
})) as any;

export type StartAsyncInvokeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts an asynchronous invocation.
 *
 * This operation requires permission for the `bedrock:InvokeModel` action.
 *
 * To deny all inference access to resources that you specify in the modelId field, you need to deny access to the `bedrock:InvokeModel` and `bedrock:InvokeModelWithResponseStream` actions. Doing this also denies access to the resource through the Converse API actions (Converse and ConverseStream). For more information see Deny access for inference on specific models.
 */
export const startAsyncInvoke: API.OperationMethod<
  StartAsyncInvokeRequest,
  StartAsyncInvokeResponse,
  StartAsyncInvokeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(642, __c20, 2) as any as S.Schema<StartAsyncInvokeRequest>,
  output: __S(643, __c20, 3) as any as S.Schema<StartAsyncInvokeResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAsyncInvoke",
  telemetry: TELEMETRY,
  span: "StartAsyncInvoke",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(100, __c3, 4));
    case 1:
      return S.suspend(() =>
        S.Struct({
          guardrailIdentifier: S.String.pipe(T.HttpLabel("guardrailIdentifier")),
          guardrailVersion: S.String.pipe(T.HttpLabel("guardrailVersion")),
          source: S.String,
          content: __S(0, __c0, 0),
          outputScope: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/guardrail/{guardrailIdentifier}/version/{guardrailVersion}/apply",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ApplyGuardrailRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          usage: __S(32, __c1, 0),
          action: S.String,
          actionReason: S.optional(S.String),
          outputs: __S(129, __c4, 1),
          assessments: __S(75, __c2, 11),
          guardrailCoverage: S.optional(__S(71, __c2, 7)),
        }),
      ).annotate({ identifier: "ApplyGuardrailResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          topicPolicyUnits: S.Number,
          contentPolicyUnits: S.Number,
          wordPolicyUnits: S.Number,
          sensitiveInformationPolicyUnits: S.Number,
          sensitiveInformationPolicyFreeUnits: S.Number,
          contextualGroundingPolicyUnits: S.Number,
          contentPolicyImageUnits: S.optional(S.Number),
          automatedReasoningPolicyUnits: S.optional(S.Number),
          automatedReasoningPolicies: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GuardrailUsage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          type: S.String,
          action: S.String,
          detected: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GuardrailTopic" });
    case 2:
      return S.Array(__S(33, __c1, 1));
    case 3:
      return S.suspend(() => S.Struct({ topics: __S(34, __c1, 2) })).annotate({
        identifier: "GuardrailTopicPolicyAssessment",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          confidence: S.String,
          filterStrength: S.optional(S.String),
          action: S.String,
          detected: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GuardrailContentFilter" });
    case 5:
      return S.Array(__S(36, __c1, 4));
    case 6:
      return S.suspend(() => S.Struct({ filters: __S(37, __c1, 5) })).annotate({
        identifier: "GuardrailContentPolicyAssessment",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({ match: S.String, action: S.String, detected: S.optional(S.Boolean) }),
      ).annotate({ identifier: "GuardrailCustomWord" });
    case 8:
      return S.Array(__S(39, __c1, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          match: S.String,
          type: S.String,
          action: S.String,
          detected: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GuardrailManagedWord" });
    case 10:
      return S.Array(__S(41, __c1, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({ customWords: __S(40, __c1, 8), managedWordLists: __S(42, __c1, 10) }),
      ).annotate({ identifier: "GuardrailWordPolicyAssessment" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          match: S.optional(S.String),
          regex: S.optional(S.String),
          action: S.String,
          detected: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GuardrailRegexFilter" });
    case 13:
      return S.Array(__S(44, __c1, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({ piiEntities: __S(42, __c1, 10), regexes: __S(45, __c1, 13) }),
      ).annotate({ identifier: "GuardrailSensitiveInformationPolicyAssessment" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          threshold: S.Number,
          score: S.Number,
          action: S.String,
          detected: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GuardrailContextualGroundingFilter" });
    case 16:
      return S.Array(__S(47, __c1, 15));
    case 17:
      return S.suspend(() => S.Struct({ filters: S.optional(__S(48, __c1, 16)) })).annotate({
        identifier: "GuardrailContextualGroundingPolicyAssessment",
      });
    case 18:
      return S.suspend(() =>
        S.Struct({
          logic: S.optional(SensitiveString),
          naturalLanguage: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "GuardrailAutomatedReasoningStatement" });
    case 19:
      return S.Array(__S(50, __c1, 18));
    case 20:
      return S.suspend(() => S.Struct({ text: S.optional(SensitiveString) })).annotate({
        identifier: "GuardrailAutomatedReasoningInputTextReference",
      });
    case 21:
      return S.Array(__S(52, __c1, 20));
    case 22:
      return S.suspend(() =>
        S.Struct({
          premises: S.optional(__S(51, __c1, 19)),
          claims: S.optional(__S(51, __c1, 19)),
          untranslatedPremises: S.optional(__S(53, __c1, 21)),
          untranslatedClaims: S.optional(__S(53, __c1, 21)),
          confidence: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GuardrailAutomatedReasoningTranslation" });
    case 23:
      return S.suspend(() => S.Struct({ statements: S.optional(__S(51, __c1, 19)) })).annotate({
        identifier: "GuardrailAutomatedReasoningScenario",
      });
    case 24:
      return S.suspend(() =>
        S.Struct({ identifier: S.optional(S.String), policyVersionArn: S.optional(S.String) }),
      ).annotate({ identifier: "GuardrailAutomatedReasoningRule" });
    case 25:
      return S.Array(__S(56, __c1, 24));
    case 26:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          premises: S.optional(__S(51, __c1, 19)),
          claims: S.optional(__S(51, __c1, 19)),
        }),
      ).annotate({ identifier: "GuardrailAutomatedReasoningLogicWarning" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          translation: S.optional(__S(54, __c1, 22)),
          claimsTrueScenario: S.optional(__S(55, __c1, 23)),
          supportingRules: S.optional(__S(57, __c1, 25)),
          logicWarning: S.optional(__S(58, __c1, 26)),
        }),
      ).annotate({ identifier: "GuardrailAutomatedReasoningValidFinding" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          translation: S.optional(__S(54, __c1, 22)),
          contradictingRules: S.optional(__S(57, __c1, 25)),
          logicWarning: S.optional(__S(58, __c1, 26)),
        }),
      ).annotate({ identifier: "GuardrailAutomatedReasoningInvalidFinding" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          translation: S.optional(__S(54, __c1, 22)),
          claimsTrueScenario: S.optional(__S(55, __c1, 23)),
          claimsFalseScenario: S.optional(__S(55, __c1, 23)),
          logicWarning: S.optional(__S(58, __c1, 26)),
        }),
      ).annotate({ identifier: "GuardrailAutomatedReasoningSatisfiableFinding" });
    case 30:
      return S.Array(__S(54, __c1, 22));
    case 31:
      return S.suspend(() => S.Struct({ translations: S.optional(__S(62, __c1, 30)) })).annotate({
        identifier: "GuardrailAutomatedReasoningTranslationOption",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(63, __c1, 31));
    case 1:
      return S.Array(__S(55, __c1, 23));
    case 2:
      return S.suspend(() =>
        S.Struct({
          options: S.optional(__S(64, __c2, 0)),
          differenceScenarios: S.optional(__S(65, __c2, 1)),
        }),
      ).annotate({ identifier: "GuardrailAutomatedReasoningTranslationAmbiguousFinding" });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ valid: __S(59, __c1, 27) }),
        /*@__PURE__*/ S.Struct({ invalid: __S(60, __c1, 28) }),
        /*@__PURE__*/ S.Struct({ satisfiable: __S(61, __c1, 29) }),
        /*@__PURE__*/ S.Struct({ impossible: __S(60, __c1, 28) }),
        /*@__PURE__*/ S.Struct({ translationAmbiguous: __S(66, __c2, 2) }),
        /*@__PURE__*/ S.Struct({ tooComplex: __S(101, __c3, 5) }),
        /*@__PURE__*/ S.Struct({ noTranslations: __S(101, __c3, 5) }),
      ]);
    case 4:
      return S.Array(__S(67, __c2, 3));
    case 5:
      return S.suspend(() => S.Struct({ findings: S.optional(__S(68, __c2, 4)) })).annotate({
        identifier: "GuardrailAutomatedReasoningPolicyAssessment",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({ guarded: S.optional(S.Number), total: S.optional(S.Number) }),
      ).annotate({ identifier: "GuardrailTextCharactersCoverage" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          textCharacters: S.optional(__S(70, __c2, 6)),
          images: S.optional(__S(70, __c2, 6)),
        }),
      ).annotate({ identifier: "GuardrailCoverage" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          guardrailProcessingLatency: S.optional(S.Number),
          usage: S.optional(__S(32, __c1, 0)),
          guardrailCoverage: S.optional(__S(71, __c2, 7)),
        }),
      ).annotate({ identifier: "GuardrailInvocationMetrics" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          guardrailId: S.optional(S.String),
          guardrailVersion: S.optional(S.String),
          guardrailArn: S.optional(S.String),
          guardrailOrigin: S.optional(__S(96, __c3, 0)),
          guardrailOwnership: S.optional(S.String),
        }),
      ).annotate({ identifier: "AppliedGuardrailDetails" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          topicPolicy: S.optional(__S(35, __c1, 3)),
          contentPolicy: S.optional(__S(38, __c1, 6)),
          wordPolicy: S.optional(__S(43, __c1, 11)),
          sensitiveInformationPolicy: S.optional(__S(46, __c1, 14)),
          contextualGroundingPolicy: S.optional(__S(49, __c1, 17)),
          automatedReasoningPolicy: S.optional(__S(69, __c2, 5)),
          invocationMetrics: S.optional(__S(72, __c2, 8)),
          appliedGuardrailDetails: S.optional(__S(73, __c2, 9)),
        }),
      ).annotate({ identifier: "GuardrailAssessment" });
    case 11:
      return S.Array(__S(74, __c2, 10));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({ text: S.String, qualifiers: S.optional(__S(96, __c3, 0)) }),
      ).annotate({ identifier: "GuardrailTextBlock" });
    case 2:
      return S.Union([/*@__PURE__*/ S.Struct({ bytes: T.Blob })]);
    case 3:
      return S.suspend(() => S.Struct({ format: S.String, source: __S(98, __c3, 2) })).annotate({
        identifier: "GuardrailImageBlock",
      });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ text: __S(97, __c3, 1) }),
        /*@__PURE__*/ S.Struct({ image: __S(99, __c3, 3) }),
      ]);
    case 5:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "GuardrailAutomatedReasoningTooComplexFinding",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ text: S.optional(S.String) })).annotate({
        identifier: "GuardrailOutputContent",
      });
    case 1:
      return S.Array(__S(128, __c4, 0));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          guardrailIdentifier: S.optional(S.String),
          guardrailVersion: S.optional(S.String),
          trace: S.optional(S.String),
        }),
      ).annotate({ identifier: "GuardrailConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          modelId: S.String.pipe(T.HttpLabel("modelId")),
          messages: S.optional(__S(256, __c8, 0)),
          system: S.optional(__S(258, __c8, 2)),
          inferenceConfig: S.optional(__S(193, __c6, 1)),
          toolConfig: S.optional(__S(265, __c8, 9)),
          guardrailConfig: S.optional(__S(160, __c5, 0)),
          additionalModelRequestFields: S.optional(S.Any),
          promptVariables: S.optional(__S(194, __c6, 2)),
          additionalModelResponseFieldPaths: S.optional(__S(192, __c6, 0)),
          requestMetadata: S.optional(__S(195, __c6, 3)),
          performanceConfig: S.optional(__S(196, __c6, 4)),
          serviceTier: S.optional(__S(288, __c9, 0)),
          outputConfig: S.optional(__S(200, __c6, 8)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/model/{modelId}/converse" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ConverseRequest" });
    case 2:
      return S.Union([/*@__PURE__*/ S.Struct({ message: __S(255, __c7, 31) })]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          output: __S(162, __c5, 2),
          stopReason: S.String,
          usage: __S(203, __c6, 11),
          metrics: __S(204, __c6, 12),
          additionalModelResponseFields: S.optional(S.Any),
          trace: S.optional(__S(209, __c6, 17)),
          performanceConfig: S.optional(__S(196, __c6, 4)),
          serviceTier: S.optional(__S(288, __c9, 0)),
        }),
      ).annotate({ identifier: "ConverseResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          maxTokens: S.optional(S.Number),
          temperature: S.optional(S.Number),
          topP: S.optional(S.Number),
          stopSequences: S.optional(__S(192, __c6, 0)),
        }),
      ).annotate({ identifier: "InferenceConfiguration" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(228, __c7, 4).pipe(S.optional));
    case 3:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 4:
      return S.suspend(() => S.Struct({ latency: S.optional(S.String) })).annotate({
        identifier: "PerformanceConfiguration",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          schema: S.String,
          name: S.optional(S.String),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "JsonSchemaDefinition" });
    case 6:
      return S.Union([/*@__PURE__*/ S.Struct({ jsonSchema: __S(197, __c6, 5) })]);
    case 7:
      return S.suspend(() => S.Struct({ type: S.String, structure: __S(198, __c6, 6) })).annotate({
        identifier: "OutputFormat",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({ textFormat: S.optional(__S(199, __c6, 7)), effort: S.optional(S.String) }),
      ).annotate({ identifier: "OutputConfig" });
    case 9:
      return S.suspend(() => S.Struct({ ttl: S.String, inputTokens: S.Number })).annotate({
        identifier: "CacheDetail",
      });
    case 10:
      return S.Array(__S(201, __c6, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({
          inputTokens: S.Number,
          outputTokens: S.Number,
          totalTokens: S.Number,
          cacheReadInputTokens: S.optional(S.Number),
          cacheWriteInputTokens: S.optional(S.Number),
          cacheDetails: S.optional(__S(202, __c6, 10)),
        }),
      ).annotate({ identifier: "TokenUsage" });
    case 12:
      return S.suspend(() => S.Struct({ latencyMs: S.Number })).annotate({
        identifier: "ConverseMetrics",
      });
    case 13:
      return S.Record(S.String, /*@__PURE__*/ __S(74, __c2, 10).pipe(S.optional));
    case 14:
      return S.Record(S.String, /*@__PURE__*/ __S(75, __c2, 11).pipe(S.optional));
    case 15:
      return S.suspend(() =>
        S.Struct({
          modelOutput: S.optional(__S(192, __c6, 0)),
          inputAssessment: S.optional(__S(205, __c6, 13)),
          outputAssessments: S.optional(__S(206, __c6, 14)),
          actionReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "GuardrailTraceAssessment" });
    case 16:
      return S.suspend(() => S.Struct({ invokedModelId: S.optional(S.String) })).annotate({
        identifier: "PromptRouterTrace",
      });
    case 17:
      return S.suspend(() =>
        S.Struct({
          guardrail: S.optional(__S(207, __c6, 15)),
          promptRouter: S.optional(__S(208, __c6, 16)),
        }),
      ).annotate({ identifier: "ConverseTrace" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ uri: S.String, bucketOwner: S.optional(S.String) }),
      ).annotate({ identifier: "S3Location" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ bytes: T.Blob }),
        /*@__PURE__*/ S.Struct({ s3Location: __S(224, __c7, 0) }),
      ]);
    case 2:
      return S.suspend(() => S.Struct({ message: S.optional(S.String) })).annotate({
        identifier: "ErrorBlock",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          format: S.String,
          source: __S(225, __c7, 1),
          error: S.optional(__S(226, __c7, 2)),
        }),
      ).annotate({ identifier: "ImageBlock" });
    case 4:
      return S.Union([/*@__PURE__*/ S.Struct({ text: S.String })]);
    case 5:
      return S.Array(__S(228, __c7, 4));
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ bytes: T.Blob }),
        /*@__PURE__*/ S.Struct({ s3Location: __S(224, __c7, 0) }),
        /*@__PURE__*/ S.Struct({ text: S.String }),
        /*@__PURE__*/ S.Struct({ content: __S(229, __c7, 5) }),
      ]);
    case 7:
      return S.suspend(() => S.Struct({ enabled: S.Boolean })).annotate({
        identifier: "CitationsConfig",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          format: S.optional(S.String),
          name: S.String,
          source: __S(230, __c7, 6),
          context: S.optional(S.String),
          citations: S.optional(__S(231, __c7, 7)),
        }),
      ).annotate({ identifier: "DocumentBlock" });
    case 9:
      return S.suspend(() => S.Struct({ format: S.String, source: __S(225, __c7, 1) })).annotate({
        identifier: "VideoBlock",
      });
    case 10:
      return S.suspend(() =>
        S.Struct({ toolUseId: S.String, name: S.String, input: S.Any, type: S.optional(S.String) }),
      ).annotate({ identifier: "ToolUseBlock" });
    case 11:
      return S.suspend(() => S.Struct({ text: S.String })).annotate({
        identifier: "SearchResultContentBlock",
      });
    case 12:
      return S.Array(__S(235, __c7, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          source: S.String,
          title: S.String,
          content: __S(236, __c7, 12),
          citations: S.optional(__S(231, __c7, 7)),
        }),
      ).annotate({ identifier: "SearchResultBlock" });
    case 14:
      return S.Union([
        /*@__PURE__*/ S.Struct({ json: S.Any }),
        /*@__PURE__*/ S.Struct({ text: S.String }),
        /*@__PURE__*/ S.Struct({ image: __S(227, __c7, 3) }),
        /*@__PURE__*/ S.Struct({ document: __S(232, __c7, 8) }),
        /*@__PURE__*/ S.Struct({ video: __S(233, __c7, 9) }),
        /*@__PURE__*/ S.Struct({ searchResult: __S(237, __c7, 13) }),
      ]);
    case 15:
      return S.Array(__S(238, __c7, 14));
    case 16:
      return S.suspend(() =>
        S.Struct({
          toolUseId: S.String,
          content: __S(239, __c7, 15),
          status: S.optional(S.String),
          type: S.optional(S.String),
        }),
      ).annotate({ identifier: "ToolResultBlock" });
    case 17:
      return S.suspend(() => S.Struct({ type: S.String, ttl: S.optional(S.String) })).annotate({
        identifier: "CachePointBlock",
      });
    case 18:
      return S.suspend(() =>
        S.Struct({ text: S.String, signature: S.optional(S.String) }),
      ).annotate({ identifier: "ReasoningTextBlock" });
    case 19:
      return S.Union([
        /*@__PURE__*/ S.Struct({ reasoningText: __S(242, __c7, 18) }),
        /*@__PURE__*/ S.Struct({ redactedContent: T.Blob }),
      ]);
    case 20:
      return S.suspend(() =>
        S.Struct({ url: S.optional(S.String), domain: S.optional(S.String) }),
      ).annotate({ identifier: "WebLocation" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          documentIndex: S.optional(S.Number),
          start: S.optional(S.Number),
          end: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DocumentCharLocation" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          searchResultIndex: S.optional(S.Number),
          start: S.optional(S.Number),
          end: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SearchResultLocation" });
    case 23:
      return S.Union([
        /*@__PURE__*/ S.Struct({ web: __S(244, __c7, 20) }),
        /*@__PURE__*/ S.Struct({ documentChar: __S(245, __c7, 21) }),
        /*@__PURE__*/ S.Struct({ documentPage: __S(245, __c7, 21) }),
        /*@__PURE__*/ S.Struct({ documentChunk: __S(245, __c7, 21) }),
        /*@__PURE__*/ S.Struct({ searchResultLocation: __S(246, __c7, 22) }),
      ]);
    case 24:
      return S.suspend(() =>
        S.Struct({
          title: S.optional(S.String),
          source: S.optional(S.String),
          sourceContent: S.optional(__S(229, __c7, 5)),
          location: S.optional(__S(247, __c7, 23)),
        }),
      ).annotate({ identifier: "Citation" });
    case 25:
      return S.Array(__S(248, __c7, 24));
    case 26:
      return S.suspend(() =>
        S.Struct({
          content: S.optional(__S(229, __c7, 5)),
          citations: S.optional(__S(249, __c7, 25)),
        }),
      ).annotate({ identifier: "CitationsContentBlock" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          name: S.optional(S.String),
          serverName: S.optional(S.String),
        }),
      ).annotate({ identifier: "ToolReference" });
    case 28:
      return S.suspend(() => S.Struct({ tool: __S(251, __c7, 27) })).annotate({
        identifier: "ToolAdditionBlock",
      });
    case 29:
      return S.Union([
        /*@__PURE__*/ S.Struct({ text: S.String }),
        /*@__PURE__*/ S.Struct({ image: __S(227, __c7, 3) }),
        /*@__PURE__*/ S.Struct({ document: __S(232, __c7, 8) }),
        /*@__PURE__*/ S.Struct({ video: __S(233, __c7, 9) }),
        /*@__PURE__*/ S.Struct({ audio: __S(227, __c7, 3) }),
        /*@__PURE__*/ S.Struct({ toolUse: __S(234, __c7, 10) }),
        /*@__PURE__*/ S.Struct({ toolResult: __S(240, __c7, 16) }),
        /*@__PURE__*/ S.Struct({ guardContent: __S(100, __c3, 4) }),
        /*@__PURE__*/ S.Struct({ cachePoint: __S(241, __c7, 17) }),
        /*@__PURE__*/ S.Struct({ reasoningContent: __S(243, __c7, 19) }),
        /*@__PURE__*/ S.Struct({ citationsContent: __S(250, __c7, 26) }),
        /*@__PURE__*/ S.Struct({ searchResult: __S(237, __c7, 13) }),
        /*@__PURE__*/ S.Struct({ toolAddition: __S(252, __c7, 28) }),
        /*@__PURE__*/ S.Struct({ toolRemoval: __S(252, __c7, 28) }),
      ]);
    case 30:
      return S.Array(__S(253, __c7, 29));
    case 31:
      return S.suspend(() => S.Struct({ role: S.String, content: __S(254, __c7, 30) })).annotate({
        identifier: "Message",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(255, __c7, 31));
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ text: S.String }),
        /*@__PURE__*/ S.Struct({ guardContent: __S(100, __c3, 4) }),
        /*@__PURE__*/ S.Struct({ cachePoint: __S(241, __c7, 17) }),
      ]);
    case 2:
      return S.Array(__S(257, __c8, 1));
    case 3:
      return S.Union([/*@__PURE__*/ S.Struct({ json: S.Any })]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          inputSchema: __S(259, __c8, 3),
          strict: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ToolSpecification" });
    case 5:
      return S.suspend(() => S.Struct({ name: S.String })).annotate({ identifier: "SystemTool" });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ toolSpec: __S(260, __c8, 4) }),
        /*@__PURE__*/ S.Struct({ systemTool: __S(261, __c8, 5) }),
        /*@__PURE__*/ S.Struct({ cachePoint: __S(241, __c7, 17) }),
      ]);
    case 7:
      return S.Array(__S(262, __c8, 6));
    case 8:
      return S.Union([
        /*@__PURE__*/ S.Struct({ auto: __S(101, __c3, 5) }),
        /*@__PURE__*/ S.Struct({ any: __S(101, __c3, 5) }),
        /*@__PURE__*/ S.Struct({ tool: __S(261, __c8, 5) }),
      ]);
    case 9:
      return S.suspend(() =>
        S.Struct({ tools: __S(263, __c8, 7), toolChoice: S.optional(__S(264, __c8, 8)) }),
      ).annotate({ identifier: "ToolConfiguration" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ type: S.String })).annotate({ identifier: "ServiceTier" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          guardrailIdentifier: S.optional(S.String),
          guardrailVersion: S.optional(S.String),
          trace: S.optional(S.String),
          streamProcessingMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "GuardrailStreamConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          modelId: S.String.pipe(T.HttpLabel("modelId")),
          messages: S.optional(__S(256, __c8, 0)),
          system: S.optional(__S(258, __c8, 2)),
          inferenceConfig: S.optional(__S(193, __c6, 1)),
          toolConfig: S.optional(__S(265, __c8, 9)),
          guardrailConfig: S.optional(__S(320, __c10, 0)),
          additionalModelRequestFields: S.optional(S.Any),
          promptVariables: S.optional(__S(194, __c6, 2)),
          additionalModelResponseFieldPaths: S.optional(__S(192, __c6, 0)),
          requestMetadata: S.optional(__S(195, __c6, 3)),
          performanceConfig: S.optional(__S(196, __c6, 4)),
          serviceTier: S.optional(__S(288, __c9, 0)),
          outputConfig: S.optional(__S(200, __c6, 8)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/model/{modelId}/converse-stream" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ConverseStreamRequest" });
    case 2:
      return S.suspend(() => S.Struct({ role: S.String })).annotate({
        identifier: "MessageStartEvent",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ toolUseId: S.String, name: S.String, type: S.optional(S.String) }),
      ).annotate({ identifier: "ToolUseBlockStart" });
    case 4:
      return S.suspend(() =>
        S.Struct({ toolUseId: S.String, type: S.optional(S.String), status: S.optional(S.String) }),
      ).annotate({ identifier: "ToolResultBlockStart" });
    case 5:
      return S.suspend(() => S.Struct({ format: S.String })).annotate({
        identifier: "ImageBlockStart",
      });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ toolUse: __S(323, __c10, 3) }),
        /*@__PURE__*/ S.Struct({ toolResult: __S(324, __c10, 4) }),
        /*@__PURE__*/ S.Struct({ image: __S(325, __c10, 5) }),
      ]);
    case 7:
      return S.suspend(() =>
        S.Struct({ start: __S(326, __c10, 6), contentBlockIndex: S.Number }),
      ).annotate({ identifier: "ContentBlockStartEvent" });
    case 8:
      return S.suspend(() => S.Struct({ input: S.String })).annotate({
        identifier: "ToolUseBlockDelta",
      });
    case 9:
      return S.Union([
        /*@__PURE__*/ S.Struct({ text: S.String }),
        /*@__PURE__*/ S.Struct({ json: S.Any }),
      ]);
    case 10:
      return S.Array(__S(329, __c10, 9));
    case 11:
      return S.Union([
        /*@__PURE__*/ S.Struct({ text: S.String }),
        /*@__PURE__*/ S.Struct({ redactedContent: T.Blob }),
        /*@__PURE__*/ S.Struct({ signature: S.String }),
      ]);
    case 12:
      return S.suspend(() =>
        S.Struct({
          title: S.optional(S.String),
          source: S.optional(S.String),
          sourceContent: S.optional(__S(129, __c4, 1)),
          location: S.optional(__S(247, __c7, 23)),
        }),
      ).annotate({ identifier: "CitationsDelta" });
    case 13:
      return S.suspend(() =>
        S.Struct({ source: S.optional(__S(225, __c7, 1)), error: S.optional(__S(226, __c7, 2)) }),
      ).annotate({ identifier: "ImageBlockDelta" });
    case 14:
      return S.Union([
        /*@__PURE__*/ S.Struct({ text: S.String }),
        /*@__PURE__*/ S.Struct({ toolUse: __S(328, __c10, 8) }),
        /*@__PURE__*/ S.Struct({ toolResult: __S(330, __c10, 10) }),
        /*@__PURE__*/ S.Struct({ reasoningContent: __S(331, __c10, 11) }),
        /*@__PURE__*/ S.Struct({ citation: __S(332, __c10, 12) }),
        /*@__PURE__*/ S.Struct({ image: __S(333, __c10, 13) }),
      ]);
    case 15:
      return S.suspend(() =>
        S.Struct({ delta: __S(334, __c10, 14), contentBlockIndex: S.Number }),
      ).annotate({ identifier: "ContentBlockDeltaEvent" });
    case 16:
      return S.suspend(() => S.Struct({ contentBlockIndex: S.Number })).annotate({
        identifier: "ContentBlockStopEvent",
      });
    case 17:
      return S.suspend(() =>
        S.Struct({ stopReason: S.String, additionalModelResponseFields: S.optional(S.Any) }),
      ).annotate({ identifier: "MessageStopEvent" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          usage: __S(203, __c6, 11),
          metrics: __S(204, __c6, 12),
          trace: S.optional(__S(209, __c6, 17)),
          performanceConfig: S.optional(__S(196, __c6, 4)),
          serviceTier: S.optional(__S(288, __c9, 0)),
        }),
      ).annotate({ identifier: "ConverseStreamMetadataEvent" });
    case 19:
      return T.EventStream(
        /*@__PURE__*/ S.Union([
          /*@__PURE__*/ S.Struct({ messageStart: __S(322, __c10, 2) }),
          /*@__PURE__*/ S.Struct({ contentBlockStart: __S(327, __c10, 7) }),
          /*@__PURE__*/ S.Struct({ contentBlockDelta: __S(335, __c10, 15) }),
          /*@__PURE__*/ S.Struct({ contentBlockStop: __S(336, __c10, 16) }),
          /*@__PURE__*/ S.Struct({ messageStop: __S(337, __c10, 17) }),
          /*@__PURE__*/ S.Struct({ metadata: __S(338, __c10, 18) }),
          /*@__PURE__*/ S.Struct({
            internalServerException: /*@__PURE__*/ S.suspend(
              () => InternalServerException,
            ).annotate({ identifier: "InternalServerException" }),
          }),
          /*@__PURE__*/ S.Struct({
            modelStreamErrorException: /*@__PURE__*/ S.suspend(
              () => ModelStreamErrorException,
            ).annotate({ identifier: "ModelStreamErrorException" }),
          }),
          /*@__PURE__*/ S.Struct({
            validationException: /*@__PURE__*/ S.suspend(() => ValidationException).annotate({
              identifier: "ValidationException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            throttlingException: /*@__PURE__*/ S.suspend(() => ThrottlingException).annotate({
              identifier: "ThrottlingException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            serviceUnavailableException: /*@__PURE__*/ S.suspend(
              () => ServiceUnavailableException,
            ).annotate({ identifier: "ServiceUnavailableException" }),
          }),
        ]),
      );
    case 20:
      return S.suspend(() =>
        S.Struct({ stream: S.optional(__S(339, __c10, 19)).pipe(T.HttpPayload()) }),
      ).annotate({ identifier: "ConverseStreamResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ body: SensitiveBlob })).annotate({
        identifier: "InvokeModelTokensRequest",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          messages: S.optional(__S(256, __c8, 0)),
          system: S.optional(__S(258, __c8, 2)),
          toolConfig: S.optional(__S(265, __c8, 9)),
          additionalModelRequestFields: S.optional(S.Any),
        }),
      ).annotate({ identifier: "ConverseTokensRequest" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ invokeModel: __S(352, __c11, 0) }),
        /*@__PURE__*/ S.Struct({ converse: __S(353, __c11, 1) }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          modelId: S.String.pipe(T.HttpLabel("modelId")),
          input: __S(354, __c11, 2),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/model/{modelId}/count-tokens" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CountTokensRequest" });
    case 4:
      return S.suspend(() => S.Struct({ inputTokens: S.Number })).annotate({
        identifier: "CountTokensResponse",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ invocationArn: S.String.pipe(T.HttpLabel("invocationArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/async-invoke/{invocationArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAsyncInvokeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          invocationArn: S.String,
          modelArn: S.String,
          clientRequestToken: S.optional(S.String),
          status: S.String,
          failureMessage: S.optional(SensitiveString),
          submitTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastModifiedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          outputDataConfig: __S(417, __c13, 1),
        }),
      ).annotate({ identifier: "GetAsyncInvokeResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          s3Uri: S.String,
          kmsKeyId: S.optional(S.String),
          bucketOwner: S.optional(S.String),
        }),
      ).annotate({ identifier: "AsyncInvokeS3OutputDataConfig" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ s3OutputDataConfig: __S(416, __c13, 0) })]);
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ text: SensitiveString })]);
    case 1:
      return S.Array(__S(448, __c14, 0));
    case 2:
      return S.suspend(() => S.Struct({ role: S.String, content: __S(449, __c14, 1) })).annotate({
        identifier: "GuardrailChecksMessage",
      });
    case 3:
      return S.Array(__S(450, __c14, 2));
    case 4:
      return S.suspend(() => S.Struct({ category: S.String })).annotate({
        identifier: "GuardrailChecksContentFilterCategoryConfig",
      });
    case 5:
      return S.Array(__S(452, __c14, 4));
    case 6:
      return S.suspend(() => S.Struct({ categories: __S(453, __c14, 5) })).annotate({
        identifier: "GuardrailChecksContentFilterConfig",
      });
    case 7:
      return S.Array(__S(288, __c9, 0));
    case 8:
      return S.suspend(() => S.Struct({ entities: __S(455, __c14, 7) })).annotate({
        identifier: "GuardrailChecksSensitiveInformationConfig",
      });
    case 9:
      return S.suspend(() =>
        S.Struct({
          contentFilter: S.optional(__S(454, __c14, 6)),
          promptAttack: S.optional(__S(454, __c14, 6)),
          sensitiveInformation: S.optional(__S(456, __c14, 8)),
        }),
      ).annotate({ identifier: "GuardrailChecksConfig" });
    case 10:
      return S.suspend(() =>
        S.Struct({ messages: __S(451, __c14, 3), checks: __S(457, __c14, 9) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/guardrail-checks/invoke" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "InvokeGuardrailChecksRequest" });
    case 11:
      return S.suspend(() => S.Struct({ category: S.String, severityScore: S.Number })).annotate({
        identifier: "GuardrailChecksContentFilterResultEntry",
      });
    case 12:
      return S.Array(__S(459, __c14, 11));
    case 13:
      return S.suspend(() => S.Struct({ results: __S(460, __c14, 12) })).annotate({
        identifier: "GuardrailChecksContentFilterResult",
      });
    case 14:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          confidenceScore: S.Number,
          beginOffset: S.Number,
          endOffset: S.Number,
          messageIndex: S.Number,
          contentIndex: S.Number,
        }),
      ).annotate({ identifier: "GuardrailChecksSensitiveInformationResultEntry" });
    case 15:
      return S.Array(__S(462, __c14, 14));
    case 16:
      return S.suspend(() =>
        S.Struct({ results: __S(463, __c14, 15), truncated: S.optional(S.Boolean) }),
      ).annotate({ identifier: "GuardrailChecksSensitiveInformationResult" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          contentFilter: S.optional(__S(461, __c14, 13)),
          promptAttack: S.optional(__S(461, __c14, 13)),
          sensitiveInformation: S.optional(__S(464, __c14, 16)),
        }),
      ).annotate({ identifier: "GuardrailChecksResults" });
    case 18:
      return S.suspend(() => S.Struct({ textUnits: S.Number })).annotate({
        identifier: "GuardrailChecksContentFilterUsage",
      });
    case 19:
      return S.suspend(() =>
        S.Struct({
          contentFilter: S.optional(__S(466, __c14, 18)),
          promptAttack: S.optional(__S(466, __c14, 18)),
          sensitiveInformation: S.optional(__S(466, __c14, 18)),
        }),
      ).annotate({ identifier: "GuardrailChecksUsageResults" });
    case 20:
      return S.suspend(() =>
        S.Struct({ results: __S(465, __c14, 17), usage: __S(467, __c14, 19) }),
      ).annotate({ identifier: "InvokeGuardrailChecksResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          body: S.optional(T.StreamingInput).pipe(T.HttpPayload()),
          contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          accept: S.optional(S.String).pipe(T.HttpHeader("Accept")),
          modelId: S.String.pipe(T.HttpLabel("modelId")),
          trace: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Bedrock-Trace")),
          guardrailIdentifier: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-GuardrailIdentifier"),
          ),
          guardrailVersion: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-GuardrailVersion"),
          ),
          performanceConfigLatency: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-PerformanceConfig-Latency"),
          ),
          serviceTier: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Bedrock-Service-Tier")),
          requestMetadata: S.optional(SensitiveString).pipe(
            T.HttpHeader("X-Amzn-Bedrock-Request-Metadata"),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/model/{modelId}/invoke" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "InvokeModelRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          body: T.StreamingOutput.pipe(T.HttpPayload()),
          contentType: S.String.pipe(T.HttpHeader("Content-Type")),
          performanceConfigLatency: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-PerformanceConfig-Latency"),
          ),
          serviceTier: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Bedrock-Service-Tier")),
        }),
      ).annotate({ identifier: "InvokeModelResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return T.InputEventStream(
        /*@__PURE__*/ S.Union([/*@__PURE__*/ S.Struct({ chunk: __S(544, __c17, 0) })]),
      );
    case 1:
      return S.suspend(() =>
        S.Struct({
          modelId: S.String.pipe(T.HttpLabel("modelId")),
          body: __S(512, __c16, 0).pipe(T.HttpPayload()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/model/{modelId}/invoke-with-bidirectional-stream" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "InvokeModelWithBidirectionalStreamRequest" });
    case 2:
      return S.suspend(() => S.Struct({ body: __S(545, __c17, 1).pipe(T.HttpPayload()) })).annotate(
        { identifier: "InvokeModelWithBidirectionalStreamResponse" },
      );
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ bytes: S.optional(SensitiveBlob) })).annotate({
        identifier: "BidirectionalInputPayloadPart",
      });
    case 1:
      return T.EventStream(
        /*@__PURE__*/ S.Union([
          /*@__PURE__*/ S.Struct({ chunk: __S(544, __c17, 0) }),
          /*@__PURE__*/ S.Struct({
            internalServerException: /*@__PURE__*/ S.suspend(
              () => InternalServerException,
            ).annotate({ identifier: "InternalServerException" }),
          }),
          /*@__PURE__*/ S.Struct({
            modelStreamErrorException: /*@__PURE__*/ S.suspend(
              () => ModelStreamErrorException,
            ).annotate({ identifier: "ModelStreamErrorException" }),
          }),
          /*@__PURE__*/ S.Struct({
            validationException: /*@__PURE__*/ S.suspend(() => ValidationException).annotate({
              identifier: "ValidationException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            throttlingException: /*@__PURE__*/ S.suspend(() => ThrottlingException).annotate({
              identifier: "ThrottlingException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            modelTimeoutException: /*@__PURE__*/ S.suspend(() => ModelTimeoutException).annotate({
              identifier: "ModelTimeoutException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            serviceUnavailableException: /*@__PURE__*/ S.suspend(
              () => ServiceUnavailableException,
            ).annotate({ identifier: "ServiceUnavailableException" }),
          }),
        ]),
      );
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          body: S.optional(T.StreamingInput).pipe(T.HttpPayload()),
          contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          accept: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Bedrock-Accept")),
          modelId: S.String.pipe(T.HttpLabel("modelId")),
          trace: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Bedrock-Trace")),
          guardrailIdentifier: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-GuardrailIdentifier"),
          ),
          guardrailVersion: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-GuardrailVersion"),
          ),
          performanceConfigLatency: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-PerformanceConfig-Latency"),
          ),
          serviceTier: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Bedrock-Service-Tier")),
          requestMetadata: S.optional(SensitiveString).pipe(
            T.HttpHeader("X-Amzn-Bedrock-Request-Metadata"),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/model/{modelId}/invoke-with-response-stream" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "InvokeModelWithResponseStreamRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          body: __S(545, __c17, 1).pipe(T.HttpPayload()),
          contentType: S.String.pipe(T.HttpHeader("X-Amzn-Bedrock-Content-Type")),
          performanceConfigLatency: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-PerformanceConfig-Latency"),
          ),
          serviceTier: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Bedrock-Service-Tier")),
        }),
      ).annotate({ identifier: "InvokeModelWithResponseStreamResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          submitTimeAfter: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("submitTimeAfter"),
          ),
          submitTimeBefore: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("submitTimeBefore"),
          ),
          statusEquals: S.optional(S.String).pipe(T.HttpQuery("statusEquals")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          sortBy: S.optional(S.String).pipe(T.HttpQuery("sortBy")),
          sortOrder: S.optional(S.String).pipe(T.HttpQuery("sortOrder")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/async-invoke" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAsyncInvokesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          invocationArn: S.String,
          modelArn: S.String,
          clientRequestToken: S.optional(S.String),
          status: S.optional(S.String),
          failureMessage: S.optional(SensitiveString),
          submitTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastModifiedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          outputDataConfig: __S(417, __c13, 1),
        }),
      ).annotate({ identifier: "AsyncInvokeSummary" });
    case 2:
      return S.Array(__S(609, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          asyncInvokeSummaries: S.optional(__S(610, __c19, 2)),
        }),
      ).annotate({ identifier: "ListAsyncInvokesResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(640, __c20, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          modelId: S.String,
          modelInput: S.Any,
          outputDataConfig: __S(417, __c13, 1),
          tags: S.optional(__S(641, __c20, 1)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/async-invoke" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartAsyncInvokeRequest" });
    case 3:
      return S.suspend(() => S.Struct({ invocationArn: S.String })).annotate({
        identifier: "StartAsyncInvokeResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
