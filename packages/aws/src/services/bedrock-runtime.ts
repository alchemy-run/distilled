import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import type * as stream from "effect/Stream";
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
  sdkId: "Bedrock Runtime",
  target: "AmazonBedrockFrontendService",
  version: "2023-09-30",
  sigv4: "bedrock",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://bedrock-runtime.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://bedrock-runtime.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConflictException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ModelErrorException
  extends /*@__PURE__*/ TE.TaggedError("ModelErrorException", [], {
    status: 424,
  })<{
    readonly message?: string;
    readonly originalStatusCode?: number;
    readonly resourceName?: string;
  }> {}
export class ModelNotReadyException
  extends /*@__PURE__*/ TE.TaggedError(
    "ModelNotReadyException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ModelStreamErrorException
  extends /*@__PURE__*/ TE.TaggedError("ModelStreamErrorException", [], {
    status: 424,
  })<{
    readonly message?: string;
    readonly originalStatusCode?: number;
    readonly originalMessage?: string;
  }> {}
export class ModelTimeoutException
  extends /*@__PURE__*/ TE.TaggedError(
    "ModelTimeoutException",
    ["TimeoutError"],
    { status: 408 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { status: 503 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
export type GuardrailContentFilterConfidence =
  | "NONE"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | (string & {});
export type GuardrailContentFilterStrength =
  | "NONE"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | (string & {});
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
export type GuardrailContextualGroundingFilterType =
  | "GROUNDING"
  | "RELEVANCE"
  | (string & {});
export type GuardrailContextualGroundingPolicyAction =
  | "BLOCKED"
  | "NONE"
  | (string & {});
export interface GuardrailContextualGroundingFilter {
  type: GuardrailContextualGroundingFilterType;
  threshold: number;
  score: number;
  action: GuardrailContextualGroundingPolicyAction;
  detected?: boolean;
}
export type GuardrailContextualGroundingFilters =
  GuardrailContextualGroundingFilter[];
export interface GuardrailContextualGroundingPolicyAssessment {
  filters?: GuardrailContextualGroundingFilter[];
}
export type GuardrailAutomatedReasoningStatementLogicContent =
  | string
  | redacted.Redacted<string>;
export type GuardrailAutomatedReasoningStatementNaturalLanguageContent =
  | string
  | redacted.Redacted<string>;
export interface GuardrailAutomatedReasoningStatement {
  logic?: string | redacted.Redacted<string>;
  naturalLanguage?: string | redacted.Redacted<string>;
}
export type GuardrailAutomatedReasoningStatementList =
  GuardrailAutomatedReasoningStatement[];
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
export type GuardrailAutomatedReasoningRuleList =
  GuardrailAutomatedReasoningRule[];
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
export type GuardrailAutomatedReasoningTranslationList =
  GuardrailAutomatedReasoningTranslation[];
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
export type GuardrailAutomatedReasoningFindingList =
  GuardrailAutomatedReasoningFinding[];
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
  | {
      bytes?: never;
      s3Location?: never;
      text?: never;
      content: DocumentContentBlock[];
    };
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
export type GuardrailConverseContentQualifierList =
  GuardrailConverseContentQualifier[];
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
  | {
      text?: never;
      guardContent: GuardrailConverseContentBlock;
      cachePoint?: never;
    }
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
export type GuardrailTrace =
  | "enabled"
  | "disabled"
  | "enabled_full"
  | (string & {});
export interface GuardrailConfiguration {
  guardrailIdentifier?: string;
  guardrailVersion?: string;
  trace?: GuardrailTrace;
}
export type PromptVariableValues = { text: string };
export type PromptVariableMap = {
  [key: string]: PromptVariableValues | undefined;
};
export type AdditionalModelResponseFieldPaths = string[];
export type RequestMetadata = { [key: string]: string | undefined };
export type PerformanceConfigLatency = "standard" | "optimized" | (string & {});
export interface PerformanceConfiguration {
  latency?: PerformanceConfigLatency;
}
export type ServiceTierType =
  | "priority"
  | "default"
  | "flex"
  | "reserved"
  | (string & {});
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
export type GuardrailAssessmentMap = {
  [key: string]: GuardrailAssessment | undefined;
};
export type GuardrailAssessmentListMap = {
  [key: string]: GuardrailAssessment[] | undefined;
};
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
export type ToolResultBlockDelta =
  | { text: string; json?: never }
  | { text?: never; json: any };
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
export type AsyncInvokeStatus =
  | "InProgress"
  | "Completed"
  | "Failed"
  | (string & {});
export type AsyncInvokeMessage = string | redacted.Redacted<string>;
export type KmsKeyId = string;
export interface AsyncInvokeS3OutputDataConfig {
  s3Uri: string;
  kmsKeyId?: string;
  bucketOwner?: string;
}
export type AsyncInvokeOutputDataConfig = {
  s3OutputDataConfig: AsyncInvokeS3OutputDataConfig;
};
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
export type GuardrailChecksRole =
  | "user"
  | "assistant"
  | "system"
  | (string & {});
export type GuardrailChecksTextContent = string | redacted.Redacted<string>;
export type GuardrailChecksContentBlock = {
  text: string | redacted.Redacted<string>;
};
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
export type GuardrailChecksContentFilterResultList =
  GuardrailChecksContentFilterResultEntry[];
export interface GuardrailChecksContentFilterResult {
  results: GuardrailChecksContentFilterResultEntry[];
}
export interface GuardrailChecksPromptAttackResultEntry {
  category: GuardrailChecksPromptAttackCategory;
  severityScore: number;
}
export type GuardrailChecksPromptAttackResultList =
  GuardrailChecksPromptAttackResultEntry[];
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
export type InvokeModelWithBidirectionalStreamInput = {
  chunk: BidirectionalInputPayloadPart;
};
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
  descriptor: {
    service: svc,
    http: "POST /guardrail/{guardrailIdentifier}/version/{guardrailVersion}/apply",
    input: {
      guardrailIdentifier: 0,
      guardrailVersion: 0,
      source: 0,
      content: D.list({
        text: { text: 0, qualifiers: 0 },
        image: { format: 0, source: { bytes: 0 } },
      }),
      outputScope: 0,
    },
    output: { assessments: D.list(o_GuardrailAssessment) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /model/{modelId}/converse",
    input: {
      modelId: 0,
      messages: D.list(i_Message),
      system: D.list(i_SystemContentBlock),
      inferenceConfig: i_InferenceConfiguration,
      toolConfig: i_ToolConfiguration,
      guardrailConfig: {
        guardrailIdentifier: 0,
        guardrailVersion: 0,
        trace: 0,
      },
      additionalModelRequestFields: 0,
      promptVariables: D.map(i_PromptVariableValues),
      additionalModelResponseFieldPaths: 0,
      requestMetadata: 0,
      performanceConfig: i_PerformanceConfiguration,
      serviceTier: i_ServiceTier,
      outputConfig: i_OutputConfig,
    },
    output: {
      output: {
        message: {
          content: D.list({
            image: o_ImageBlock,
            document: o_DocumentBlock,
            video: o_VideoBlock,
            audio: { source: { bytes: D.blob } },
            toolResult: {
              content: D.list({
                image: o_ImageBlock,
                document: o_DocumentBlock,
                video: o_VideoBlock,
              }),
            },
            guardContent: { image: { source: { bytes: D.blob } } },
            reasoningContent: { redactedContent: D.blob },
          }),
        },
      },
      trace: { guardrail: o_GuardrailTraceAssessment },
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /model/{modelId}/converse-stream",
    input: {
      modelId: 0,
      messages: D.list(i_Message),
      system: D.list(i_SystemContentBlock),
      inferenceConfig: i_InferenceConfiguration,
      toolConfig: i_ToolConfiguration,
      guardrailConfig: {
        guardrailIdentifier: 0,
        guardrailVersion: 0,
        trace: 0,
        streamProcessingMode: 0,
      },
      additionalModelRequestFields: 0,
      promptVariables: D.map(i_PromptVariableValues),
      additionalModelResponseFieldPaths: 0,
      requestMetadata: 0,
      performanceConfig: i_PerformanceConfiguration,
      serviceTier: i_ServiceTier,
      outputConfig: i_OutputConfig,
    },
    output: {
      stream: D.m({
        payload: true,
        shape: D.events({
          messageStart: 0,
          contentBlockStart: 0,
          contentBlockDelta: {
            delta: {
              reasoningContent: { redactedContent: D.blob },
              image: { source: o_ImageSource },
            },
          },
          contentBlockStop: 0,
          messageStop: 0,
          metadata: { trace: { guardrail: o_GuardrailTraceAssessment } },
          internalServerException: 0,
          modelStreamErrorException: 0,
          validationException: 0,
          throttlingException: 0,
          serviceUnavailableException: 0,
        }),
      }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /model/{modelId}/count-tokens",
    input: {
      modelId: 0,
      input: {
        invokeModel: { body: 0 },
        converse: {
          messages: D.list(i_Message),
          system: D.list(i_SystemContentBlock),
          toolConfig: i_ToolConfiguration,
          additionalModelRequestFields: 0,
        },
      },
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /async-invoke/{invocationArn}",
    input: { invocationArn: 0 },
    output: {
      failureMessage: D.secret,
      submitTime: D.ts,
      lastModifiedTime: D.ts,
      endTime: D.ts,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAsyncInvoke",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /guardrail-checks/invoke",
    input: {
      messages: D.list({ role: 0, content: D.list({ text: 0 }) }),
      checks: {
        contentFilter: { categories: D.list({ category: 0 }) },
        promptAttack: { categories: D.list({ category: 0 }) },
        sensitiveInformation: { entities: D.list({ type: 0 }) },
      },
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /model/{modelId}/invoke",
    input: {
      body: D.m({ payload: true, shape: D.stream }),
      contentType: D.m({ header: "Content-Type" }),
      accept: D.m({ header: "Accept" }),
      modelId: 0,
      trace: D.m({ header: "X-Amzn-Bedrock-Trace" }),
      guardrailIdentifier: D.m({
        header: "X-Amzn-Bedrock-GuardrailIdentifier",
      }),
      guardrailVersion: D.m({ header: "X-Amzn-Bedrock-GuardrailVersion" }),
      performanceConfigLatency: D.m({
        header: "X-Amzn-Bedrock-PerformanceConfig-Latency",
      }),
      serviceTier: D.m({ header: "X-Amzn-Bedrock-Service-Tier" }),
      requestMetadata: D.m({ header: "X-Amzn-Bedrock-Request-Metadata" }),
    },
    output: {
      body: D.m({ payload: true, shape: D.stream }),
      contentType: D.m({ header: "Content-Type" }),
      performanceConfigLatency: D.m({
        header: "X-Amzn-Bedrock-PerformanceConfig-Latency",
      }),
      serviceTier: D.m({ header: "X-Amzn-Bedrock-Service-Tier" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /model/{modelId}/invoke-with-bidirectional-stream",
    input: {
      modelId: 0,
      body: D.m({ payload: true, shape: D.events({ chunk: { bytes: 0 } }) }),
    },
    output: {
      body: D.m({
        payload: true,
        shape: D.events({
          chunk: { bytes: D.secretBlob },
          internalServerException: 0,
          modelStreamErrorException: 0,
          validationException: 0,
          throttlingException: 0,
          modelTimeoutException: 0,
          serviceUnavailableException: 0,
        }),
      }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /model/{modelId}/invoke-with-response-stream",
    input: {
      body: D.m({ payload: true, shape: D.stream }),
      contentType: D.m({ header: "Content-Type" }),
      accept: D.m({ header: "X-Amzn-Bedrock-Accept" }),
      modelId: 0,
      trace: D.m({ header: "X-Amzn-Bedrock-Trace" }),
      guardrailIdentifier: D.m({
        header: "X-Amzn-Bedrock-GuardrailIdentifier",
      }),
      guardrailVersion: D.m({ header: "X-Amzn-Bedrock-GuardrailVersion" }),
      performanceConfigLatency: D.m({
        header: "X-Amzn-Bedrock-PerformanceConfig-Latency",
      }),
      serviceTier: D.m({ header: "X-Amzn-Bedrock-Service-Tier" }),
      requestMetadata: D.m({ header: "X-Amzn-Bedrock-Request-Metadata" }),
    },
    output: {
      body: D.m({
        payload: true,
        shape: D.events({
          chunk: { bytes: D.secretBlob },
          internalServerException: 0,
          modelStreamErrorException: 0,
          validationException: 0,
          throttlingException: 0,
          modelTimeoutException: 0,
          serviceUnavailableException: 0,
        }),
      }),
      contentType: D.m({ header: "X-Amzn-Bedrock-Content-Type" }),
      performanceConfigLatency: D.m({
        header: "X-Amzn-Bedrock-PerformanceConfig-Latency",
      }),
      serviceTier: D.m({ header: "X-Amzn-Bedrock-Service-Tier" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /async-invoke",
    input: {
      submitTimeAfter: D.m({ query: "submitTimeAfter" }),
      submitTimeBefore: D.m({ query: "submitTimeBefore" }),
      statusEquals: D.m({ query: "statusEquals" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      sortBy: D.m({ query: "sortBy" }),
      sortOrder: D.m({ query: "sortOrder" }),
    },
    output: {
      asyncInvokeSummaries: D.list({
        failureMessage: D.secret,
        submitTime: D.ts,
        lastModifiedTime: D.ts,
        endTime: D.ts,
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "POST /async-invoke",
    input: {
      clientRequestToken: D.m({ idempotency: true }),
      modelId: 0,
      modelInput: 0,
      outputDataConfig: {
        s3OutputDataConfig: { s3Uri: 0, kmsKeyId: 0, bucketOwner: 0 },
      },
      tags: D.list({ key: 0, value: 0 }),
    },
    body: true,
  },
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
})) as any;

const i_InferenceConfiguration: D.LazyStruct = () => ({
  maxTokens: 0,
  temperature: 0,
  topP: 0,
  stopSequences: 0,
});
const i_Message: D.LazyStruct = () => ({
  role: 0,
  content: D.list({
    text: 0,
    image: i_ImageBlock,
    document: i_DocumentBlock,
    video: i_VideoBlock,
    audio: {
      format: 0,
      source: { bytes: 0, s3Location: i_S3Location },
      error: i_ErrorBlock,
    },
    toolUse: { toolUseId: 0, name: 0, input: 0, type: 0 },
    toolResult: {
      toolUseId: 0,
      content: D.list({
        json: 0,
        text: 0,
        image: i_ImageBlock,
        document: i_DocumentBlock,
        video: i_VideoBlock,
        searchResult: i_SearchResultBlock,
      }),
      status: 0,
      type: 0,
    },
    guardContent: i_GuardrailConverseContentBlock,
    cachePoint: i_CachePointBlock,
    reasoningContent: {
      reasoningText: { text: 0, signature: 0 },
      redactedContent: 0,
    },
    citationsContent: {
      content: D.list({ text: 0 }),
      citations: D.list({
        title: 0,
        source: 0,
        sourceContent: D.list({ text: 0 }),
        location: {
          web: { url: 0, domain: 0 },
          documentChar: { documentIndex: 0, start: 0, end: 0 },
          documentPage: { documentIndex: 0, start: 0, end: 0 },
          documentChunk: { documentIndex: 0, start: 0, end: 0 },
          searchResultLocation: { searchResultIndex: 0, start: 0, end: 0 },
        },
      }),
    },
    searchResult: i_SearchResultBlock,
    toolAddition: { tool: i_ToolReference },
    toolRemoval: { tool: i_ToolReference },
  }),
});
const i_OutputConfig: D.LazyStruct = () => ({
  textFormat: {
    type: 0,
    structure: { jsonSchema: { schema: 0, name: 0, description: 0 } },
  },
  effort: 0,
});
const i_PerformanceConfiguration: D.LazyStruct = () => ({ latency: 0 });
const i_PromptVariableValues: D.LazyStruct = () => ({ text: 0 });
const i_ServiceTier: D.LazyStruct = () => ({ type: 0 });
const i_SystemContentBlock: D.LazyStruct = () => ({
  text: 0,
  guardContent: i_GuardrailConverseContentBlock,
  cachePoint: i_CachePointBlock,
});
const i_ToolConfiguration: D.LazyStruct = () => ({
  tools: D.list({
    toolSpec: { name: 0, description: 0, inputSchema: { json: 0 }, strict: 0 },
    systemTool: { name: 0 },
    cachePoint: i_CachePointBlock,
  }),
  toolChoice: { auto: {}, any: {}, tool: { name: 0 } },
});
const o_DocumentBlock: D.LazyStruct = () => ({ source: { bytes: D.blob } });
const o_GuardrailAssessment: D.LazyStruct = () => ({
  automatedReasoningPolicy: {
    findings: D.list({
      valid: {
        translation: o_GuardrailAutomatedReasoningTranslation,
        claimsTrueScenario: o_GuardrailAutomatedReasoningScenario,
        logicWarning: o_GuardrailAutomatedReasoningLogicWarning,
      },
      invalid: {
        translation: o_GuardrailAutomatedReasoningTranslation,
        logicWarning: o_GuardrailAutomatedReasoningLogicWarning,
      },
      satisfiable: {
        translation: o_GuardrailAutomatedReasoningTranslation,
        claimsTrueScenario: o_GuardrailAutomatedReasoningScenario,
        claimsFalseScenario: o_GuardrailAutomatedReasoningScenario,
        logicWarning: o_GuardrailAutomatedReasoningLogicWarning,
      },
      impossible: {
        translation: o_GuardrailAutomatedReasoningTranslation,
        logicWarning: o_GuardrailAutomatedReasoningLogicWarning,
      },
      translationAmbiguous: {
        options: D.list({
          translations: D.list(o_GuardrailAutomatedReasoningTranslation),
        }),
        differenceScenarios: D.list(o_GuardrailAutomatedReasoningScenario),
      },
    }),
  },
});
const o_GuardrailTraceAssessment: D.LazyStruct = () => ({
  inputAssessment: D.map(o_GuardrailAssessment),
  outputAssessments: D.map(D.list(o_GuardrailAssessment)),
});
const o_ImageBlock: D.LazyStruct = () => ({ source: o_ImageSource });
const o_ImageSource: D.LazyStruct = () => ({ bytes: D.blob });
const o_VideoBlock: D.LazyStruct = () => ({ source: { bytes: D.blob } });
const i_CachePointBlock: D.LazyStruct = () => ({ type: 0, ttl: 0 });
const i_DocumentBlock: D.LazyStruct = () => ({
  format: 0,
  name: 0,
  source: {
    bytes: 0,
    s3Location: i_S3Location,
    text: 0,
    content: D.list({ text: 0 }),
  },
  context: 0,
  citations: i_CitationsConfig,
});
const i_ErrorBlock: D.LazyStruct = () => ({ message: 0 });
const i_GuardrailConverseContentBlock: D.LazyStruct = () => ({
  text: { text: 0, qualifiers: 0 },
  image: { format: 0, source: { bytes: 0 } },
});
const i_ImageBlock: D.LazyStruct = () => ({
  format: 0,
  source: { bytes: 0, s3Location: i_S3Location },
  error: i_ErrorBlock,
});
const i_S3Location: D.LazyStruct = () => ({ uri: 0, bucketOwner: 0 });
const i_SearchResultBlock: D.LazyStruct = () => ({
  source: 0,
  title: 0,
  content: D.list({ text: 0 }),
  citations: i_CitationsConfig,
});
const i_ToolReference: D.LazyStruct = () => ({
  type: 0,
  name: 0,
  serverName: 0,
});
const i_VideoBlock: D.LazyStruct = () => ({
  format: 0,
  source: { bytes: 0, s3Location: i_S3Location },
});
const o_GuardrailAutomatedReasoningLogicWarning: D.LazyStruct = () => ({
  premises: D.list(o_GuardrailAutomatedReasoningStatement),
  claims: D.list(o_GuardrailAutomatedReasoningStatement),
});
const o_GuardrailAutomatedReasoningScenario: D.LazyStruct = () => ({
  statements: D.list(o_GuardrailAutomatedReasoningStatement),
});
const o_GuardrailAutomatedReasoningTranslation: D.LazyStruct = () => ({
  premises: D.list(o_GuardrailAutomatedReasoningStatement),
  claims: D.list(o_GuardrailAutomatedReasoningStatement),
  untranslatedPremises: D.list(o_GuardrailAutomatedReasoningInputTextReference),
  untranslatedClaims: D.list(o_GuardrailAutomatedReasoningInputTextReference),
});
const i_CitationsConfig: D.LazyStruct = () => ({ enabled: 0 });
const o_GuardrailAutomatedReasoningInputTextReference: D.LazyStruct = () => ({
  text: D.secret,
});
const o_GuardrailAutomatedReasoningStatement: D.LazyStruct = () => ({
  logic: D.secret,
  naturalLanguage: D.secret,
});
