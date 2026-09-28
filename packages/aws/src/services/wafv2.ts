import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "WAFV2",
  target: "AWSWAF_20190729",
  version: "2019-07-29",
  sigv4: "wafv2",
  protocol: awsJson1_1Protocol,
  xmlns: "http://waf.amazonaws.com/doc/2019-07-29/",
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
                `https://wafv2-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://wafv2-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://wafv2.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://wafv2.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class WAFAssociatedItemException
  extends /*@__PURE__*/ TE.TaggedError("WAFAssociatedItemException")<{
    readonly message?: string;
  }> {}
export class WAFConfigurationWarningException
  extends /*@__PURE__*/ TE.TaggedError("WAFConfigurationWarningException")<{
    readonly message?: string;
  }> {}
export class WAFDuplicateItemException
  extends /*@__PURE__*/ TE.TaggedError("WAFDuplicateItemException")<{
    readonly message?: string;
  }> {}
export class WAFExpiredManagedRuleGroupVersionException
  extends /*@__PURE__*/ TE.TaggedError(
    "WAFExpiredManagedRuleGroupVersionException",
  )<{ readonly message?: string }> {}
export class WAFFeatureNotIncludedInPricingPlanException
  extends /*@__PURE__*/ TE.TaggedError(
    "WAFFeatureNotIncludedInPricingPlanException",
  )<{
    readonly message?: string;
    readonly DisallowedFeatures?: DisallowedFeature[];
  }> {}
export class WAFInternalErrorException
  extends /*@__PURE__*/ TE.TaggedError("WAFInternalErrorException", [
    "ServerError",
  ])<{ readonly message?: string }> {}
export class WAFInvalidOperationException
  extends /*@__PURE__*/ TE.TaggedError("WAFInvalidOperationException")<{
    readonly message?: string;
  }> {}
export class WAFInvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError("WAFInvalidParameterException")<{
    readonly message?: string;
    readonly Field?: ParameterExceptionField;
    readonly Parameter?: string;
    readonly Reason?: string;
  }> {}
export class WAFInvalidPermissionPolicyException
  extends /*@__PURE__*/ TE.TaggedError("WAFInvalidPermissionPolicyException")<{
    readonly message?: string;
  }> {}
export class WAFInvalidResourceException
  extends /*@__PURE__*/ TE.TaggedError("WAFInvalidResourceException")<{
    readonly message?: string;
  }> {}
export class WAFLimitsExceededException
  extends /*@__PURE__*/ TE.TaggedError("WAFLimitsExceededException")<{
    readonly message?: string;
    readonly SourceType?: string;
  }> {}
export class WAFLogDestinationPermissionIssueException
  extends /*@__PURE__*/ TE.TaggedError(
    "WAFLogDestinationPermissionIssueException",
  )<{ readonly message?: string }> {}
export class WAFNonexistentItemException
  extends /*@__PURE__*/ TE.TaggedError("WAFNonexistentItemException")<{
    readonly message?: string;
  }> {}
export class WAFOptimisticLockException
  extends /*@__PURE__*/ TE.TaggedError("WAFOptimisticLockException")<{
    readonly message?: string;
  }> {}
export class WAFServiceLinkedRoleErrorException
  extends /*@__PURE__*/ TE.TaggedError("WAFServiceLinkedRoleErrorException")<{
    readonly message?: string;
  }> {}
export class WAFSubscriptionNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("WAFSubscriptionNotFoundException")<{
    readonly message?: string;
  }> {}
export class WAFTagOperationException
  extends /*@__PURE__*/ TE.TaggedError("WAFTagOperationException")<{
    readonly message?: string;
  }> {}
export class WAFTagOperationInternalErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "WAFTagOperationInternalErrorException",
    ["ServerError"],
  )<{ readonly message?: string }> {}
export class WAFUnavailableEntityException
  extends /*@__PURE__*/ TE.TaggedError("WAFUnavailableEntityException")<{
    readonly message?: string;
  }> {}
export class WAFUnsupportedAggregateKeyTypeException
  extends /*@__PURE__*/ TE.TaggedError(
    "WAFUnsupportedAggregateKeyTypeException",
  )<{ readonly message?: string }> {}
export type ResourceArn = string;
export interface AssociateWebACLRequest {
  WebACLArn: string;
  ResourceArn: string;
}
export interface AssociateWebACLResponse {}
export type Scope = "CLOUDFRONT" | "REGIONAL" | (string & {});
export type EntityName = string;
export type RulePriority = number;
export type SearchString = Uint8Array;
export type FieldToMatchData = string;
export interface SingleHeader {
  Name: string;
}
export interface SingleQueryArgument {
  Name: string;
}
export interface AllQueryArguments {}
export interface UriPath {}
export interface QueryString {}
export type OversizeHandling =
  | "CONTINUE"
  | "MATCH"
  | "NO_MATCH"
  | (string & {});
export interface Body {
  OversizeHandling?: OversizeHandling;
}
export interface Method {}
export interface All {}
export type JsonPointerPath = string;
export type JsonPointerPaths = string[];
export interface JsonMatchPattern {
  All?: All;
  IncludedPaths?: string[];
}
export type JsonMatchScope = "ALL" | "KEY" | "VALUE" | (string & {});
export type BodyParsingFallbackBehavior =
  | "MATCH"
  | "NO_MATCH"
  | "EVALUATE_AS_STRING"
  | (string & {});
export interface JsonBody {
  MatchPattern: JsonMatchPattern;
  MatchScope: JsonMatchScope;
  InvalidFallbackBehavior?: BodyParsingFallbackBehavior;
  OversizeHandling?: OversizeHandling;
}
export type HeaderNames = string[];
export interface HeaderMatchPattern {
  All?: All;
  IncludedHeaders?: string[];
  ExcludedHeaders?: string[];
}
export type MapMatchScope = "ALL" | "KEY" | "VALUE" | (string & {});
export interface Headers {
  MatchPattern: HeaderMatchPattern;
  MatchScope: MapMatchScope;
  OversizeHandling: OversizeHandling;
}
export type SingleCookieName = string;
export type CookieNames = string[];
export interface CookieMatchPattern {
  All?: All;
  IncludedCookies?: string[];
  ExcludedCookies?: string[];
}
export interface Cookies {
  MatchPattern: CookieMatchPattern;
  MatchScope: MapMatchScope;
  OversizeHandling: OversizeHandling;
}
export interface HeaderOrder {
  OversizeHandling: OversizeHandling;
}
export type FallbackBehavior = "MATCH" | "NO_MATCH" | (string & {});
export interface JA3Fingerprint {
  FallbackBehavior: FallbackBehavior;
}
export interface JA4Fingerprint {
  FallbackBehavior: FallbackBehavior;
}
export interface UriFragment {
  FallbackBehavior?: FallbackBehavior;
}
export interface FieldToMatch {
  SingleHeader?: SingleHeader;
  SingleQueryArgument?: SingleQueryArgument;
  AllQueryArguments?: AllQueryArguments;
  UriPath?: UriPath;
  QueryString?: QueryString;
  Body?: Body;
  Method?: Method;
  JsonBody?: JsonBody;
  Headers?: Headers;
  Cookies?: Cookies;
  HeaderOrder?: HeaderOrder;
  JA3Fingerprint?: JA3Fingerprint;
  JA4Fingerprint?: JA4Fingerprint;
  UriFragment?: UriFragment;
}
export type TextTransformationPriority = number;
export type TextTransformationType =
  | "NONE"
  | "COMPRESS_WHITE_SPACE"
  | "HTML_ENTITY_DECODE"
  | "LOWERCASE"
  | "CMD_LINE"
  | "URL_DECODE"
  | "BASE64_DECODE"
  | "HEX_DECODE"
  | "MD5"
  | "REPLACE_COMMENTS"
  | "ESCAPE_SEQ_DECODE"
  | "SQL_HEX_DECODE"
  | "CSS_DECODE"
  | "JS_DECODE"
  | "NORMALIZE_PATH"
  | "NORMALIZE_PATH_WIN"
  | "REMOVE_NULLS"
  | "REPLACE_NULLS"
  | "BASE64_DECODE_EXT"
  | "URL_DECODE_UNI"
  | "UTF8_TO_UNICODE"
  | "REMOVE_WHITESPACE"
  | "TRIM"
  | "TRIM_LEFT"
  | "TRIM_RIGHT"
  | "REMOVE_COMMENTS_CHAR"
  | "UPPERCASE"
  | "CMD_LINE_WIN"
  | "CMD_LINE_UNIX"
  | "JS_DECODE_EXT"
  | "SHA256"
  | (string & {});
export interface TextTransformation {
  Priority: number;
  Type: TextTransformationType;
}
export type TextTransformations = TextTransformation[];
export type PreParseTextTransformationPriority = number;
export type PreParseTextTransformationType =
  | "NONE"
  | "URL_DECODE"
  | "URL_DECODE_UNI"
  | "COMBINE_DUPLICATE_QUERY_ARGS_BY_COMMA"
  | "REPLACE_SEMICOLONS_WITH_AMPERSANDS"
  | (string & {});
export interface PreParseTextTransformation {
  Priority: number;
  Type: PreParseTextTransformationType;
}
export type PreParseTextTransformations = PreParseTextTransformation[];
export type PositionalConstraint =
  | "EXACTLY"
  | "STARTS_WITH"
  | "ENDS_WITH"
  | "CONTAINS"
  | "CONTAINS_WORD"
  | (string & {});
export interface ByteMatchStatement {
  SearchString: Uint8Array;
  FieldToMatch: FieldToMatch;
  TextTransformations: TextTransformation[];
  PreParseTextTransformations?: PreParseTextTransformation[];
  PositionalConstraint: PositionalConstraint;
}
export type SensitivityLevel = "LOW" | "HIGH" | (string & {});
export interface SqliMatchStatement {
  FieldToMatch: FieldToMatch;
  TextTransformations: TextTransformation[];
  PreParseTextTransformations?: PreParseTextTransformation[];
  SensitivityLevel?: SensitivityLevel;
}
export interface XssMatchStatement {
  FieldToMatch: FieldToMatch;
  TextTransformations: TextTransformation[];
  PreParseTextTransformations?: PreParseTextTransformation[];
}
export type ComparisonOperator =
  | "EQ"
  | "NE"
  | "LE"
  | "LT"
  | "GE"
  | "GT"
  | (string & {});
export type Size = number;
export interface SizeConstraintStatement {
  FieldToMatch: FieldToMatch;
  ComparisonOperator: ComparisonOperator;
  Size: number;
  TextTransformations: TextTransformation[];
  PreParseTextTransformations?: PreParseTextTransformation[];
}
export type CountryCode =
  | "AF"
  | "AX"
  | "AL"
  | "DZ"
  | "AS"
  | "AD"
  | "AO"
  | "AI"
  | "AQ"
  | "AG"
  | "AR"
  | "AM"
  | "AW"
  | "AU"
  | "AT"
  | "AZ"
  | "BS"
  | "BH"
  | "BD"
  | "BB"
  | "BY"
  | "BE"
  | "BZ"
  | "BJ"
  | "BM"
  | "BT"
  | "BO"
  | "BQ"
  | "BA"
  | "BW"
  | "BV"
  | "BR"
  | "IO"
  | "BN"
  | "BG"
  | "BF"
  | "BI"
  | "KH"
  | "CM"
  | "CA"
  | "CV"
  | "KY"
  | "CF"
  | "TD"
  | "CL"
  | "CN"
  | "CX"
  | "CC"
  | "CO"
  | "KM"
  | "CG"
  | "CD"
  | "CK"
  | "CR"
  | "CI"
  | "HR"
  | "CU"
  | "CW"
  | "CY"
  | "CZ"
  | "DK"
  | "DJ"
  | "DM"
  | "DO"
  | "EC"
  | "EG"
  | "SV"
  | "GQ"
  | "ER"
  | "EE"
  | "ET"
  | "FK"
  | "FO"
  | "FJ"
  | "FI"
  | "FR"
  | "GF"
  | "PF"
  | "TF"
  | "GA"
  | "GM"
  | "GE"
  | "DE"
  | "GH"
  | "GI"
  | "GR"
  | "GL"
  | "GD"
  | "GP"
  | "GU"
  | "GT"
  | "GG"
  | "GN"
  | "GW"
  | "GY"
  | "HT"
  | "HM"
  | "VA"
  | "HN"
  | "HK"
  | "HU"
  | "IS"
  | "IN"
  | "ID"
  | "IR"
  | "IQ"
  | "IE"
  | "IM"
  | "IL"
  | "IT"
  | "JM"
  | "JP"
  | "JE"
  | "JO"
  | "KZ"
  | "KE"
  | "KI"
  | "KP"
  | "KR"
  | "KW"
  | "KG"
  | "LA"
  | "LV"
  | "LB"
  | "LS"
  | "LR"
  | "LY"
  | "LI"
  | "LT"
  | "LU"
  | "MO"
  | "MK"
  | "MG"
  | "MW"
  | "MY"
  | "MV"
  | "ML"
  | "MT"
  | "MH"
  | "MQ"
  | "MR"
  | "MU"
  | "YT"
  | "MX"
  | "FM"
  | "MD"
  | "MC"
  | "MN"
  | "ME"
  | "MS"
  | "MA"
  | "MZ"
  | "MM"
  | "NA"
  | "NR"
  | "NP"
  | "NL"
  | "NC"
  | "NZ"
  | "NI"
  | "NE"
  | "NG"
  | "NU"
  | "NF"
  | "MP"
  | "NO"
  | "OM"
  | "PK"
  | "PW"
  | "PS"
  | "PA"
  | "PG"
  | "PY"
  | "PE"
  | "PH"
  | "PN"
  | "PL"
  | "PT"
  | "PR"
  | "QA"
  | "RE"
  | "RO"
  | "RU"
  | "RW"
  | "BL"
  | "SH"
  | "KN"
  | "LC"
  | "MF"
  | "PM"
  | "VC"
  | "WS"
  | "SM"
  | "ST"
  | "SA"
  | "SN"
  | "RS"
  | "SC"
  | "SL"
  | "SG"
  | "SX"
  | "SK"
  | "SI"
  | "SB"
  | "SO"
  | "ZA"
  | "GS"
  | "SS"
  | "ES"
  | "LK"
  | "SD"
  | "SR"
  | "SJ"
  | "SZ"
  | "SE"
  | "CH"
  | "SY"
  | "TW"
  | "TJ"
  | "TZ"
  | "TH"
  | "TL"
  | "TG"
  | "TK"
  | "TO"
  | "TT"
  | "TN"
  | "TR"
  | "TM"
  | "TC"
  | "TV"
  | "UG"
  | "UA"
  | "AE"
  | "GB"
  | "US"
  | "UM"
  | "UY"
  | "UZ"
  | "VU"
  | "VE"
  | "VN"
  | "VG"
  | "VI"
  | "WF"
  | "EH"
  | "YE"
  | "ZM"
  | "ZW"
  | "XK"
  | (string & {});
export type CountryCodes = CountryCode[];
export type ForwardedIPHeaderName = string;
export interface ForwardedIPConfig {
  HeaderName: string;
  FallbackBehavior: FallbackBehavior;
}
export interface GeoMatchStatement {
  CountryCodes?: CountryCode[];
  ForwardedIPConfig?: ForwardedIPConfig;
}
export interface ExcludedRule {
  Name: string;
}
export type ExcludedRules = ExcludedRule[];
export type ResponseStatusCode = number;
export type CustomHTTPHeaderName = string;
export type CustomHTTPHeaderValue = string;
export interface CustomHTTPHeader {
  Name: string;
  Value: string;
}
export type CustomHTTPHeaders = CustomHTTPHeader[];
export interface CustomResponse {
  ResponseCode: number;
  CustomResponseBodyKey?: string;
  ResponseHeaders?: CustomHTTPHeader[];
}
export interface BlockAction {
  CustomResponse?: CustomResponse;
}
export interface CustomRequestHandling {
  InsertHeaders: CustomHTTPHeader[];
}
export interface AllowAction {
  CustomRequestHandling?: CustomRequestHandling;
}
export interface CountAction {
  CustomRequestHandling?: CustomRequestHandling;
}
export interface CaptchaAction {
  CustomRequestHandling?: CustomRequestHandling;
}
export interface ChallengeAction {
  CustomRequestHandling?: CustomRequestHandling;
}
export type PriceMultiplier = string;
export interface MonetizeAction {
  PriceMultiplier?: string;
}
export interface RuleAction {
  Block?: BlockAction;
  Allow?: AllowAction;
  Count?: CountAction;
  Captcha?: CaptchaAction;
  Challenge?: ChallengeAction;
  Monetize?: MonetizeAction;
}
export interface RuleActionOverride {
  Name: string;
  ActionToUse: RuleAction;
}
export type RuleActionOverrides = RuleActionOverride[];
export interface RuleGroupReferenceStatement {
  ARN: string;
  ExcludedRules?: ExcludedRule[];
  RuleActionOverrides?: RuleActionOverride[];
}
export type ForwardedIPPosition = "FIRST" | "LAST" | "ANY" | (string & {});
export interface IPSetForwardedIPConfig {
  HeaderName: string;
  FallbackBehavior: FallbackBehavior;
  Position: ForwardedIPPosition;
}
export interface IPSetReferenceStatement {
  ARN: string;
  IPSetForwardedIPConfig?: IPSetForwardedIPConfig;
}
export interface RegexPatternSetReferenceStatement {
  ARN: string;
  FieldToMatch: FieldToMatch;
  TextTransformations: TextTransformation[];
  PreParseTextTransformations?: PreParseTextTransformation[];
}
export type RateLimit = number;
export type EvaluationWindowSec = number;
export type RateBasedStatementAggregateKeyType =
  | "IP"
  | "FORWARDED_IP"
  | "CUSTOM_KEYS"
  | "CONSTANT"
  | (string & {});
export interface RateLimitHeader {
  Name: string;
  TextTransformations: TextTransformation[];
}
export interface RateLimitCookie {
  Name: string;
  TextTransformations: TextTransformation[];
}
export interface RateLimitQueryArgument {
  Name: string;
  TextTransformations: TextTransformation[];
}
export interface RateLimitQueryString {
  TextTransformations: TextTransformation[];
}
export interface RateLimitHTTPMethod {}
export interface RateLimitForwardedIP {}
export interface RateLimitIP {}
export type LabelNamespace = string;
export interface RateLimitLabelNamespace {
  Namespace: string;
}
export interface RateLimitUriPath {
  TextTransformations: TextTransformation[];
}
export interface RateLimitJA3Fingerprint {
  FallbackBehavior: FallbackBehavior;
}
export interface RateLimitJA4Fingerprint {
  FallbackBehavior: FallbackBehavior;
}
export interface RateLimitAsn {}
export interface RateBasedStatementCustomKey {
  Header?: RateLimitHeader;
  Cookie?: RateLimitCookie;
  QueryArgument?: RateLimitQueryArgument;
  QueryString?: RateLimitQueryString;
  HTTPMethod?: RateLimitHTTPMethod;
  ForwardedIP?: RateLimitForwardedIP;
  IP?: RateLimitIP;
  LabelNamespace?: RateLimitLabelNamespace;
  UriPath?: RateLimitUriPath;
  JA3Fingerprint?: RateLimitJA3Fingerprint;
  JA4Fingerprint?: RateLimitJA4Fingerprint;
  ASN?: RateLimitAsn;
}
export type RateBasedStatementCustomKeys = RateBasedStatementCustomKey[];
export interface RateBasedStatement {
  Limit: number;
  EvaluationWindowSec?: number;
  AggregateKeyType: RateBasedStatementAggregateKeyType;
  ScopeDownStatement?: Statement;
  ForwardedIPConfig?: ForwardedIPConfig;
  CustomKeys?: RateBasedStatementCustomKey[];
}
export type Statements = Statement[];
export interface AndStatement {
  Statements: Statement[];
}
export interface OrStatement {
  Statements: Statement[];
}
export interface NotStatement {
  Statement: Statement;
}
export type VendorName = string;
export type VersionKeyString = string;
export type LoginPathString = string;
export type PayloadType = "JSON" | "FORM_ENCODED" | (string & {});
export type FieldIdentifier = string;
export interface UsernameField {
  Identifier: string;
}
export interface PasswordField {
  Identifier: string;
}
export type InspectionLevel = "COMMON" | "TARGETED" | (string & {});
export type EnableMachineLearning = boolean;
export interface AWSManagedRulesBotControlRuleSet {
  InspectionLevel: InspectionLevel;
  EnableMachineLearning?: boolean;
}
export interface RequestInspection {
  PayloadType: PayloadType;
  UsernameField: UsernameField;
  PasswordField: PasswordField;
}
export type SuccessCode = number;
export type ResponseInspectionStatusCodeSuccessCodes = number[];
export type FailureCode = number;
export type ResponseInspectionStatusCodeFailureCodes = number[];
export interface ResponseInspectionStatusCode {
  SuccessCodes: number[];
  FailureCodes: number[];
}
export type ResponseInspectionHeaderName = string;
export type SuccessValue = string;
export type ResponseInspectionHeaderSuccessValues = string[];
export type FailureValue = string;
export type ResponseInspectionHeaderFailureValues = string[];
export interface ResponseInspectionHeader {
  Name: string;
  SuccessValues: string[];
  FailureValues: string[];
}
export type ResponseInspectionBodyContainsSuccessStrings = string[];
export type ResponseInspectionBodyContainsFailureStrings = string[];
export interface ResponseInspectionBodyContains {
  SuccessStrings: string[];
  FailureStrings: string[];
}
export type ResponseInspectionJsonSuccessValues = string[];
export type ResponseInspectionJsonFailureValues = string[];
export interface ResponseInspectionJson {
  Identifier: string;
  SuccessValues: string[];
  FailureValues: string[];
}
export interface ResponseInspection {
  StatusCode?: ResponseInspectionStatusCode;
  Header?: ResponseInspectionHeader;
  BodyContains?: ResponseInspectionBodyContains;
  Json?: ResponseInspectionJson;
}
export interface AWSManagedRulesATPRuleSet {
  LoginPath: string;
  RequestInspection?: RequestInspection;
  ResponseInspection?: ResponseInspection;
  EnableRegexInPath?: boolean;
}
export type CreationPathString = string;
export type RegistrationPagePathString = string;
export interface EmailField {
  Identifier: string;
}
export interface PhoneNumberField {
  Identifier: string;
}
export type PhoneNumberFields = PhoneNumberField[];
export interface AddressField {
  Identifier: string;
}
export type AddressFields = AddressField[];
export interface RequestInspectionACFP {
  PayloadType: PayloadType;
  UsernameField?: UsernameField;
  PasswordField?: PasswordField;
  EmailField?: EmailField;
  PhoneNumberFields?: PhoneNumberField[];
  AddressFields?: AddressField[];
}
export interface AWSManagedRulesACFPRuleSet {
  CreationPath: string;
  RegistrationPagePath: string;
  RequestInspection: RequestInspectionACFP;
  ResponseInspection?: ResponseInspection;
  EnableRegexInPath?: boolean;
}
export type UsageOfAction = "ENABLED" | "DISABLED" | (string & {});
export type SensitivityToAct = "LOW" | "MEDIUM" | "HIGH" | (string & {});
export type RegexPatternString = string;
export interface Regex {
  RegexString?: string;
}
export type RegularExpressionList = Regex[];
export interface ClientSideAction {
  UsageOfAction: UsageOfAction;
  Sensitivity?: SensitivityToAct;
  ExemptUriRegularExpressions?: Regex[];
}
export interface ClientSideActionConfig {
  Challenge: ClientSideAction;
}
export interface AWSManagedRulesAntiDDoSRuleSet {
  ClientSideActionConfig: ClientSideActionConfig;
  SensitivityToBlock?: SensitivityToAct;
}
export interface ManagedRuleGroupConfig {
  LoginPath?: string;
  PayloadType?: PayloadType;
  UsernameField?: UsernameField;
  PasswordField?: PasswordField;
  AWSManagedRulesBotControlRuleSet?: AWSManagedRulesBotControlRuleSet;
  AWSManagedRulesATPRuleSet?: AWSManagedRulesATPRuleSet;
  AWSManagedRulesACFPRuleSet?: AWSManagedRulesACFPRuleSet;
  AWSManagedRulesAntiDDoSRuleSet?: AWSManagedRulesAntiDDoSRuleSet;
}
export type ManagedRuleGroupConfigs = ManagedRuleGroupConfig[];
export interface ManagedRuleGroupStatement {
  VendorName: string;
  Name: string;
  Version?: string;
  ExcludedRules?: ExcludedRule[];
  ScopeDownStatement?: Statement;
  ManagedRuleGroupConfigs?: ManagedRuleGroupConfig[];
  RuleActionOverrides?: RuleActionOverride[];
}
export type LabelMatchScope = "LABEL" | "NAMESPACE" | (string & {});
export type LabelMatchKey = string;
export interface LabelMatchStatement {
  Scope: LabelMatchScope;
  Key: string;
}
export interface RegexMatchStatement {
  RegexString: string;
  FieldToMatch: FieldToMatch;
  TextTransformations: TextTransformation[];
  PreParseTextTransformations?: PreParseTextTransformation[];
}
export type ASN = number;
export type AsnList = number[];
export interface AsnMatchStatement {
  AsnList: number[];
  ForwardedIPConfig?: ForwardedIPConfig;
}
export interface Statement {
  ByteMatchStatement?: ByteMatchStatement;
  SqliMatchStatement?: SqliMatchStatement;
  XssMatchStatement?: XssMatchStatement;
  SizeConstraintStatement?: SizeConstraintStatement;
  GeoMatchStatement?: GeoMatchStatement;
  RuleGroupReferenceStatement?: RuleGroupReferenceStatement;
  IPSetReferenceStatement?: IPSetReferenceStatement;
  RegexPatternSetReferenceStatement?: RegexPatternSetReferenceStatement;
  RateBasedStatement?: RateBasedStatement;
  AndStatement?: AndStatement;
  OrStatement?: OrStatement;
  NotStatement?: NotStatement;
  ManagedRuleGroupStatement?: ManagedRuleGroupStatement;
  LabelMatchStatement?: LabelMatchStatement;
  RegexMatchStatement?: RegexMatchStatement;
  AsnMatchStatement?: AsnMatchStatement;
}
export interface NoneAction {}
export interface OverrideAction {
  Count?: CountAction;
  None?: NoneAction;
}
export type LabelName = string;
export interface Label {
  Name: string;
}
export type Labels = Label[];
export type MetricName = string;
export interface VisibilityConfig {
  SampledRequestsEnabled: boolean;
  CloudWatchMetricsEnabled: boolean;
  MetricName: string;
}
export type TimeWindowSecond = number;
export interface ImmunityTimeProperty {
  ImmunityTime: number;
}
export interface CaptchaConfig {
  ImmunityTimeProperty?: ImmunityTimeProperty;
}
export interface ChallengeConfig {
  ImmunityTimeProperty?: ImmunityTimeProperty;
}
export interface Rule {
  Name: string;
  Priority: number;
  Statement: Statement;
  Action?: RuleAction;
  OverrideAction?: OverrideAction;
  RuleLabels?: Label[];
  VisibilityConfig: VisibilityConfig;
  CaptchaConfig?: CaptchaConfig;
  ChallengeConfig?: ChallengeConfig;
}
export type Rules = Rule[];
export interface CheckCapacityRequest {
  Scope: Scope;
  Rules: Rule[];
}
export type ConsumedCapacity = number;
export interface CheckCapacityResponse {
  Capacity?: number;
}
export type TokenDomain = string;
export type APIKeyTokenDomains = string[];
export interface CreateAPIKeyRequest {
  Scope: Scope;
  TokenDomains: string[];
}
export type APIKey = string;
export interface CreateAPIKeyResponse {
  APIKey?: string;
}
export type EntityDescription = string;
export type IPAddressVersion = "IPV4" | "IPV6" | (string & {});
export type IPAddress = string;
export type IPAddresses = string[];
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface CreateIPSetRequest {
  Name: string;
  Scope: Scope;
  Description?: string;
  IPAddressVersion: IPAddressVersion;
  Addresses: string[];
  Tags?: Tag[];
}
export type EntityId = string;
export type LockToken = string;
export interface IPSetSummary {
  Name?: string;
  Id?: string;
  Description?: string;
  LockToken?: string;
  ARN?: string;
}
export interface CreateIPSetResponse {
  Summary?: IPSetSummary;
}
export interface CreateRegexPatternSetRequest {
  Name: string;
  Scope: Scope;
  Description?: string;
  RegularExpressionList: Regex[];
  Tags?: Tag[];
}
export interface RegexPatternSetSummary {
  Name?: string;
  Id?: string;
  Description?: string;
  LockToken?: string;
  ARN?: string;
}
export interface CreateRegexPatternSetResponse {
  Summary?: RegexPatternSetSummary;
}
export type CapacityUnit = number;
export type ResponseContentType =
  | "TEXT_PLAIN"
  | "TEXT_HTML"
  | "APPLICATION_JSON"
  | (string & {});
export type ResponseContent = string;
export interface CustomResponseBody {
  ContentType: ResponseContentType;
  Content: string;
}
export type CustomResponseBodies = {
  [key: string]: CustomResponseBody | undefined;
};
export type BlockchainChain =
  | "BASE"
  | "SOLANA"
  | "BASE_SEPOLIA"
  | "SOLANA_DEVNET"
  | (string & {});
export type WalletAddress = string;
export type PriceAmount = string;
export type CryptoCurrency = "USDC" | (string & {});
export interface Price {
  Amount: string;
  Currency: CryptoCurrency;
}
export type Prices = Price[];
export interface PaymentNetwork {
  Chain: BlockchainChain;
  WalletAddress: string;
  Prices: Price[];
}
export type PaymentNetworks = PaymentNetwork[];
export interface CryptoConfig {
  PaymentNetworks: PaymentNetwork[];
}
export type CurrencyMode = "REAL" | "TEST" | (string & {});
export interface MonetizationConfig {
  CryptoConfig?: CryptoConfig;
  CurrencyMode?: CurrencyMode;
}
export interface CreateRuleGroupRequest {
  Name: string;
  Scope: Scope;
  Capacity: number;
  Description?: string;
  Rules?: Rule[];
  VisibilityConfig: VisibilityConfig;
  Tags?: Tag[];
  CustomResponseBodies?: { [key: string]: CustomResponseBody | undefined };
  MonetizationConfig?: MonetizationConfig;
}
export interface RuleGroupSummary {
  Name?: string;
  Id?: string;
  Description?: string;
  LockToken?: string;
  ARN?: string;
}
export interface CreateRuleGroupResponse {
  Summary?: RuleGroupSummary;
}
export interface DefaultAction {
  Block?: BlockAction;
  Allow?: AllowAction;
}
export type FieldToProtectType =
  | "SINGLE_HEADER"
  | "SINGLE_COOKIE"
  | "SINGLE_QUERY_ARGUMENT"
  | "QUERY_STRING"
  | "BODY"
  | (string & {});
export type FieldToProtectKeyName = string;
export type FieldToProtectKeys = string[];
export interface FieldToProtect {
  FieldType: FieldToProtectType;
  FieldKeys?: string[];
}
export type DataProtectionAction = "SUBSTITUTION" | "HASH" | (string & {});
export interface DataProtection {
  Field: FieldToProtect;
  Action: DataProtectionAction;
  ExcludeRuleMatchDetails?: boolean;
  ExcludeRateBasedDetails?: boolean;
}
export type DataProtections = DataProtection[];
export interface DataProtectionConfig {
  DataProtections: DataProtection[];
}
export type TokenDomains = string[];
export type AssociatedResourceType =
  | "CLOUDFRONT"
  | "API_GATEWAY"
  | "COGNITO_USER_POOL"
  | "APP_RUNNER_SERVICE"
  | "VERIFIED_ACCESS_INSTANCE"
  | "AGENTCORE_GATEWAY"
  | (string & {});
export type SizeInspectionLimit =
  | "KB_16"
  | "KB_32"
  | "KB_48"
  | "KB_64"
  | (string & {});
export interface RequestBodyAssociatedResourceTypeConfig {
  DefaultSizeInspectionLimit: SizeInspectionLimit;
}
export type RequestBody = {
  [key in AssociatedResourceType]?: RequestBodyAssociatedResourceTypeConfig;
};
export interface AssociationConfig {
  RequestBody?: {
    [key: string]: RequestBodyAssociatedResourceTypeConfig | undefined;
  };
}
export type LowReputationMode =
  | "ACTIVE_UNDER_DDOS"
  | "ALWAYS_ON"
  | (string & {});
export interface OnSourceDDoSProtectionConfig {
  ALBLowReputationMode: LowReputationMode;
}
export type AttributeName = string;
export type AttributeValue = string;
export type AttributeValues = string[];
export interface ApplicationAttribute {
  Name?: string;
  Values?: string[];
}
export type ApplicationAttributes = ApplicationAttribute[];
export interface ApplicationConfig {
  Attributes?: ApplicationAttribute[];
}
export interface CreateWebACLRequest {
  Name: string;
  Scope: Scope;
  DefaultAction: DefaultAction;
  Description?: string;
  Rules?: Rule[];
  VisibilityConfig: VisibilityConfig;
  DataProtectionConfig?: DataProtectionConfig;
  Tags?: Tag[];
  CustomResponseBodies?: { [key: string]: CustomResponseBody | undefined };
  CaptchaConfig?: CaptchaConfig;
  ChallengeConfig?: ChallengeConfig;
  TokenDomains?: string[];
  AssociationConfig?: AssociationConfig;
  OnSourceDDoSProtectionConfig?: OnSourceDDoSProtectionConfig;
  ApplicationConfig?: ApplicationConfig;
  MonetizationConfig?: MonetizationConfig;
}
export interface WebACLSummary {
  Name?: string;
  Id?: string;
  Description?: string;
  LockToken?: string;
  ARN?: string;
}
export interface CreateWebACLResponse {
  Summary?: WebACLSummary;
}
export interface DeleteAPIKeyRequest {
  Scope: Scope;
  APIKey: string;
}
export interface DeleteAPIKeyResponse {}
export interface DeleteFirewallManagerRuleGroupsRequest {
  WebACLArn: string;
  WebACLLockToken: string;
}
export interface DeleteFirewallManagerRuleGroupsResponse {
  NextWebACLLockToken?: string;
}
export interface DeleteIPSetRequest {
  Name: string;
  Scope: Scope;
  Id: string;
  LockToken: string;
}
export interface DeleteIPSetResponse {}
export type LogType = "WAF_LOGS" | (string & {});
export type LogScope =
  | "CUSTOMER"
  | "SECURITY_LAKE"
  | "CLOUDWATCH_TELEMETRY_RULE_MANAGED"
  | (string & {});
export interface DeleteLoggingConfigurationRequest {
  ResourceArn: string;
  LogType?: LogType;
  LogScope?: LogScope;
}
export interface DeleteLoggingConfigurationResponse {}
export interface DeletePermissionPolicyRequest {
  ResourceArn: string;
}
export interface DeletePermissionPolicyResponse {}
export interface DeleteRegexPatternSetRequest {
  Name: string;
  Scope: Scope;
  Id: string;
  LockToken: string;
}
export interface DeleteRegexPatternSetResponse {}
export interface DeleteRuleGroupRequest {
  Name: string;
  Scope: Scope;
  Id: string;
  LockToken: string;
}
export interface DeleteRuleGroupResponse {}
export interface DeleteWebACLRequest {
  Name: string;
  Scope: Scope;
  Id: string;
  LockToken: string;
}
export interface DeleteWebACLResponse {}
export interface DescribeAllManagedProductsRequest {
  Scope: Scope;
}
export type ProductId = string;
export type ProductLink = string;
export type ProductTitle = string;
export type ProductDescription = string;
export interface ManagedProductDescriptor {
  VendorName?: string;
  ManagedRuleSetName?: string;
  ProductId?: string;
  ProductLink?: string;
  ProductTitle?: string;
  ProductDescription?: string;
  SnsTopicArn?: string;
  IsVersioningSupported?: boolean;
  IsAdvancedManagedRuleSet?: boolean;
}
export type ManagedProductDescriptors = ManagedProductDescriptor[];
export interface DescribeAllManagedProductsResponse {
  ManagedProducts?: ManagedProductDescriptor[];
}
export interface DescribeManagedProductsByVendorRequest {
  VendorName: string;
  Scope: Scope;
}
export interface DescribeManagedProductsByVendorResponse {
  ManagedProducts?: ManagedProductDescriptor[];
}
export interface DescribeManagedRuleGroupRequest {
  VendorName: string;
  Name: string;
  Scope: Scope;
  VersionName?: string;
}
export interface RuleSummary {
  Name?: string;
  Action?: RuleAction;
}
export type RuleSummaries = RuleSummary[];
export interface LabelSummary {
  Name?: string;
}
export type LabelSummaries = LabelSummary[];
export interface DescribeManagedRuleGroupResponse {
  VersionName?: string;
  SnsTopicArn?: string;
  Capacity?: number;
  Rules?: RuleSummary[];
  LabelNamespace?: string;
  AvailableLabels?: LabelSummary[];
  ConsumedLabels?: LabelSummary[];
}
export interface DisassociateWebACLRequest {
  ResourceArn: string;
}
export interface DisassociateWebACLResponse {}
export type Platform = "IOS" | "ANDROID" | (string & {});
export interface GenerateMobileSdkReleaseUrlRequest {
  Platform: Platform;
  ReleaseVersion: string;
}
export type DownloadUrl = string;
export interface GenerateMobileSdkReleaseUrlResponse {
  Url?: string;
}
export interface GetDecryptedAPIKeyRequest {
  Scope: Scope;
  APIKey: string;
}
export interface GetDecryptedAPIKeyResponse {
  TokenDomains?: string[];
  CreationTimestamp?: Date;
}
export interface GetIPSetRequest {
  Name: string;
  Scope: Scope;
  Id: string;
}
export interface IPSet {
  Name: string;
  Id: string;
  ARN: string;
  Description?: string;
  IPAddressVersion: IPAddressVersion;
  Addresses: string[];
}
export interface GetIPSetResponse {
  IPSet?: IPSet;
  LockToken?: string;
}
export interface GetLoggingConfigurationRequest {
  ResourceArn: string;
  LogType?: LogType;
  LogScope?: LogScope;
}
export type LogDestinationConfigs = string[];
export type RedactedFields = FieldToMatch[];
export type FilterBehavior = "KEEP" | "DROP" | (string & {});
export type FilterRequirement = "MEETS_ALL" | "MEETS_ANY" | (string & {});
export type ActionValue =
  | "ALLOW"
  | "BLOCK"
  | "COUNT"
  | "CAPTCHA"
  | "CHALLENGE"
  | "MONETIZE"
  | "EXCLUDED_AS_COUNT"
  | (string & {});
export interface ActionCondition {
  Action: ActionValue;
}
export interface LabelNameCondition {
  LabelName: string;
}
export interface Condition {
  ActionCondition?: ActionCondition;
  LabelNameCondition?: LabelNameCondition;
}
export type Conditions = Condition[];
export interface Filter {
  Behavior: FilterBehavior;
  Requirement: FilterRequirement;
  Conditions: Condition[];
}
export type Filters = Filter[];
export interface LoggingFilter {
  Filters: Filter[];
  DefaultBehavior: FilterBehavior;
}
export interface LoggingConfiguration {
  ResourceArn: string;
  LogDestinationConfigs: string[];
  RedactedFields?: FieldToMatch[];
  ManagedByFirewallManager?: boolean;
  LoggingFilter?: LoggingFilter;
  LogType?: LogType;
  LogScope?: LogScope;
}
export interface GetLoggingConfigurationResponse {
  LoggingConfiguration?: LoggingConfiguration;
}
export interface GetManagedRuleSetRequest {
  Name: string;
  Scope: Scope;
  Id: string;
}
export type TimeWindowDay = number;
export interface ManagedRuleSetVersion {
  AssociatedRuleGroupArn?: string;
  Capacity?: number;
  ForecastedLifetime?: number;
  PublishTimestamp?: Date;
  LastUpdateTimestamp?: Date;
  ExpiryTimestamp?: Date;
}
export type PublishedVersions = {
  [key: string]: ManagedRuleSetVersion | undefined;
};
export interface ManagedRuleSet {
  Name: string;
  Id: string;
  ARN: string;
  Description?: string;
  PublishedVersions?: { [key: string]: ManagedRuleSetVersion | undefined };
  RecommendedVersion?: string;
  LabelNamespace?: string;
}
export interface GetManagedRuleSetResponse {
  ManagedRuleSet?: ManagedRuleSet;
  LockToken?: string;
}
export interface GetMobileSdkReleaseRequest {
  Platform: Platform;
  ReleaseVersion: string;
}
export type ReleaseNotes = string;
export interface MobileSdkRelease {
  ReleaseVersion?: string;
  Timestamp?: Date;
  ReleaseNotes?: string;
  Tags?: Tag[];
}
export interface GetMobileSdkReleaseResponse {
  MobileSdkRelease?: MobileSdkRelease;
}
export interface GetPermissionPolicyRequest {
  ResourceArn: string;
}
export type PolicyString = string;
export interface GetPermissionPolicyResponse {
  Policy?: string;
}
export interface GetRateBasedStatementManagedKeysRequest {
  Scope: Scope;
  WebACLName: string;
  WebACLId: string;
  RuleGroupRuleName?: string;
  RuleName: string;
}
export interface RateBasedStatementManagedKeysIPSet {
  IPAddressVersion?: IPAddressVersion;
  Addresses?: string[];
}
export interface GetRateBasedStatementManagedKeysResponse {
  ManagedKeysIPV4?: RateBasedStatementManagedKeysIPSet;
  ManagedKeysIPV6?: RateBasedStatementManagedKeysIPSet;
}
export interface GetRegexPatternSetRequest {
  Name: string;
  Scope: Scope;
  Id: string;
}
export interface RegexPatternSet {
  Name?: string;
  Id?: string;
  ARN?: string;
  Description?: string;
  RegularExpressionList?: Regex[];
}
export interface GetRegexPatternSetResponse {
  RegexPatternSet?: RegexPatternSet;
  LockToken?: string;
}
export type RankingStatisticType =
  | "TOP_SOURCES_BY_REVENUE"
  | "TOP_PATHS_BY_REVENUE"
  | (string & {});
export interface TimeWindow {
  StartTime: Date;
  EndTime: Date;
}
export type Currency = "USDC" | (string & {});
export type GroupByType =
  | "NAME"
  | "CATEGORY"
  | "INTENT"
  | "ORGANIZATION"
  | "WEBACL"
  | (string & {});
export type MonetizationFilterName = string;
export type MonetizationFilterValue = string;
export type MonetizationFilterValueList = string[];
export interface MonetizationFilter {
  Name: string;
  Values: string[];
}
export type MonetizationFilterList = MonetizationFilter[];
export type NextMarker = string;
export type PathStatisticsLimit = number;
export type RankingSortBy = "REVENUE" | "PERCENTAGE" | "NAME" | (string & {});
export type SortOrder = "ASC" | "DESC" | (string & {});
export interface GetRevenueStatisticsRequest {
  StatisticType: RankingStatisticType;
  TimeWindow: TimeWindow;
  Scope: Scope;
  Currency: Currency;
  GroupBy?: GroupByType;
  Filters?: MonetizationFilter[];
  NextMarker?: string;
  Limit?: number;
  SortBy?: RankingSortBy;
  SortOrder?: SortOrder;
}
export type FilterString = string;
export type PercentageValue = number;
export type MonetizationAmountValue = string;
export type RequestCount = number;
export type VerifiedStatus = boolean;
export interface SourceStatistics {
  SourceName: string;
  Percentage: number;
  Amount: string;
  RequestCount: number;
  SourceCategory?: string;
  Intent?: string;
  Organization?: string;
  Verified?: boolean;
  GroupByValue?: string;
}
export type SourceStatisticsList = SourceStatistics[];
export type PathString = string;
export interface RevenuePathStatistics {
  Path: string;
  Percentage: number;
  Amount: string;
  RequestCount: number;
}
export type RevenuePathStatisticsList = RevenuePathStatistics[];
export interface GetRevenueStatisticsResponse {
  SourceStatistics?: SourceStatistics[];
  RevenuePathStatistics?: RevenuePathStatistics[];
  NextMarker?: string;
}
export interface GetRevenueStatisticsSummaryRequest {
  TimeWindow: TimeWindow;
  Scope: Scope;
  Currency: Currency;
  Filters?: MonetizationFilter[];
}
export interface RevenueBreakdown {
  TotalAmount?: string;
  VerifiedAmount?: string;
  UnverifiedAmount?: string;
  Currency?: Currency;
  TotalSettled?: number;
  TotalMonetizeServed?: number;
}
export interface GetRevenueStatisticsSummaryResponse {
  RevenueBreakdown?: RevenueBreakdown;
}
export type TimeSeriesStatisticType =
  | "DATE_HISTOGRAM"
  | "PAYMENT_TRAFFIC"
  | (string & {});
export type IntervalType =
  | "MINUTELY"
  | "FIVE_MINUTELY"
  | "HOURLY"
  | "DAILY"
  | (string & {});
export type MaxDataPoints = number;
export interface GetRevenueStatisticsTimeSeriesRequest {
  StatisticType: TimeSeriesStatisticType;
  TimeWindow: TimeWindow;
  Scope: Scope;
  Interval: IntervalType;
  Currency: Currency;
  GroupBy?: GroupByType;
  Filters?: MonetizationFilter[];
  Limit?: number;
  NextMarker?: string;
}
export interface DataPointEntry {
  Date?: Date;
  MonetizeServedCount?: number;
  SettledCount?: number;
  TotalAmount?: string;
  Category?: string;
  Intent?: string;
  GroupByValue?: string;
}
export type DataPointsList = DataPointEntry[];
export interface GetRevenueStatisticsTimeSeriesResponse {
  DataPoints?: DataPointEntry[];
  NextMarker?: string;
}
export interface GetRuleGroupRequest {
  Name?: string;
  Scope?: Scope;
  Id?: string;
  ARN?: string;
}
export interface RuleGroup {
  Name: string;
  Id: string;
  Capacity: number;
  ARN: string;
  Description?: string;
  Rules?: Rule[];
  VisibilityConfig: VisibilityConfig;
  LabelNamespace?: string;
  CustomResponseBodies?: { [key: string]: CustomResponseBody | undefined };
  AvailableLabels?: LabelSummary[];
  ConsumedLabels?: LabelSummary[];
  MonetizationConfig?: MonetizationConfig;
}
export interface GetRuleGroupResponse {
  RuleGroup?: RuleGroup;
  LockToken?: string;
}
export type ListMaxItems = number;
export interface GetSampledRequestsRequest {
  WebAclArn: string;
  RuleMetricName: string;
  Scope: Scope;
  TimeWindow: TimeWindow;
  MaxItems: number;
}
export type IPString = string;
export type Country = string;
export type URIString = string;
export type HTTPMethod = string;
export type HTTPVersion = string;
export type HeaderName = string;
export type HeaderValue = string;
export interface HTTPHeader {
  Name?: string;
  Value?: string;
}
export type HTTPHeaders = HTTPHeader[];
export interface HTTPRequest {
  ClientIP?: string;
  Country?: string;
  URI?: string;
  Method?: string;
  HTTPVersion?: string;
  Headers?: HTTPHeader[];
}
export type SampleWeight = number;
export type Action = string;
export type ResponseCode = number;
export type SolveTimestamp = number;
export type FailureReason =
  | "TOKEN_MISSING"
  | "TOKEN_EXPIRED"
  | "TOKEN_INVALID"
  | "TOKEN_DOMAIN_MISMATCH"
  | (string & {});
export interface CaptchaResponse {
  ResponseCode?: number;
  SolveTimestamp?: number;
  FailureReason?: FailureReason;
}
export interface ChallengeResponse {
  ResponseCode?: number;
  SolveTimestamp?: number;
  FailureReason?: FailureReason;
}
export interface SampledHTTPRequest {
  Request: HTTPRequest;
  Weight: number;
  Timestamp?: Date;
  Action?: string;
  RuleNameWithinRuleGroup?: string;
  RequestHeadersInserted?: HTTPHeader[];
  ResponseCodeSent?: number;
  Labels?: Label[];
  CaptchaResponse?: CaptchaResponse;
  ChallengeResponse?: ChallengeResponse;
  OverriddenAction?: string;
}
export type SampledHTTPRequests = SampledHTTPRequest[];
export type PopulationSize = number;
export interface GetSampledRequestsResponse {
  SampledRequests?: SampledHTTPRequest[];
  PopulationSize?: number;
  TimeWindow?: TimeWindow;
}
export type UriPathPrefixString = string;
export type NumberOfTopTrafficBotsPerPath = number;
export interface GetTopPathStatisticsByTrafficRequest {
  WebAclArn: string;
  Scope: Scope;
  UriPathPrefix?: string;
  TimeWindow: TimeWindow;
  BotCategory?: string;
  BotOrganization?: string;
  BotName?: string;
  Limit: number;
  NumberOfTopTrafficBotsPerPath: number;
  NextMarker?: string;
}
export interface FilterSource {
  BotCategory?: string;
  BotOrganization?: string;
  BotName?: string;
}
export interface BotStatistics {
  BotName: string;
  RequestCount: number;
  Percentage: number;
}
export type BotStatisticsList = BotStatistics[];
export interface PathStatistics {
  Source?: FilterSource;
  Path: string;
  RequestCount: number;
  Percentage: number;
  TopBots?: BotStatistics[];
}
export type PathStatisticsList = PathStatistics[];
export interface GetTopPathStatisticsByTrafficResponse {
  PathStatistics: PathStatistics[];
  TotalRequestCount: number;
  NextMarker?: string;
  TopCategories?: PathStatistics[];
}
export interface GetWebACLRequest {
  Name?: string;
  Scope?: Scope;
  Id?: string;
  ARN?: string;
}
export interface FirewallManagerStatement {
  ManagedRuleGroupStatement?: ManagedRuleGroupStatement;
  RuleGroupReferenceStatement?: RuleGroupReferenceStatement;
}
export interface FirewallManagerRuleGroup {
  Name: string;
  Priority: number;
  FirewallManagerStatement: FirewallManagerStatement;
  OverrideAction: OverrideAction;
  VisibilityConfig: VisibilityConfig;
}
export type FirewallManagerRuleGroups = FirewallManagerRuleGroup[];
export interface WebACL {
  Name: string;
  Id: string;
  ARN: string;
  DefaultAction: DefaultAction;
  Description?: string;
  Rules?: Rule[];
  VisibilityConfig: VisibilityConfig;
  DataProtectionConfig?: DataProtectionConfig;
  Capacity?: number;
  PreProcessFirewallManagerRuleGroups?: FirewallManagerRuleGroup[];
  PostProcessFirewallManagerRuleGroups?: FirewallManagerRuleGroup[];
  ManagedByFirewallManager?: boolean;
  LabelNamespace?: string;
  CustomResponseBodies?: { [key: string]: CustomResponseBody | undefined };
  CaptchaConfig?: CaptchaConfig;
  ChallengeConfig?: ChallengeConfig;
  TokenDomains?: string[];
  AssociationConfig?: AssociationConfig;
  RetrofittedByFirewallManager?: boolean;
  OnSourceDDoSProtectionConfig?: OnSourceDDoSProtectionConfig;
  ApplicationConfig?: ApplicationConfig;
  MonetizationConfig?: MonetizationConfig;
}
export type OutputUrl = string;
export interface GetWebACLResponse {
  WebACL?: WebACL;
  LockToken?: string;
  ApplicationIntegrationURL?: string;
}
export interface GetWebACLForResourceRequest {
  ResourceArn: string;
}
export interface GetWebACLForResourceResponse {
  WebACL?: WebACL;
}
export type PaginationLimit = number;
export interface ListAPIKeysRequest {
  Scope: Scope;
  NextMarker?: string;
  Limit?: number;
}
export type APIKeyVersion = number;
export interface APIKeySummary {
  TokenDomains?: string[];
  APIKey?: string;
  CreationTimestamp?: Date;
  Version?: number;
}
export type APIKeySummaries = APIKeySummary[];
export interface ListAPIKeysResponse {
  NextMarker?: string;
  APIKeySummaries?: APIKeySummary[];
  ApplicationIntegrationURL?: string;
}
export interface ListAvailableManagedRuleGroupsRequest {
  Scope: Scope;
  NextMarker?: string;
  Limit?: number;
}
export interface ManagedRuleGroupSummary {
  VendorName?: string;
  Name?: string;
  VersioningSupported?: boolean;
  Description?: string;
}
export type ManagedRuleGroupSummaries = ManagedRuleGroupSummary[];
export interface ListAvailableManagedRuleGroupsResponse {
  NextMarker?: string;
  ManagedRuleGroups?: ManagedRuleGroupSummary[];
}
export interface ListAvailableManagedRuleGroupVersionsRequest {
  VendorName: string;
  Name: string;
  Scope: Scope;
  NextMarker?: string;
  Limit?: number;
}
export interface ManagedRuleGroupVersion {
  Name?: string;
  LastUpdateTimestamp?: Date;
}
export type ManagedRuleGroupVersions = ManagedRuleGroupVersion[];
export interface ListAvailableManagedRuleGroupVersionsResponse {
  NextMarker?: string;
  Versions?: ManagedRuleGroupVersion[];
  CurrentDefaultVersion?: string;
}
export interface ListIPSetsRequest {
  Scope: Scope;
  NextMarker?: string;
  Limit?: number;
}
export type IPSetSummaries = IPSetSummary[];
export interface ListIPSetsResponse {
  NextMarker?: string;
  IPSets?: IPSetSummary[];
}
export interface ListLoggingConfigurationsRequest {
  Scope: Scope;
  NextMarker?: string;
  Limit?: number;
  LogScope?: LogScope;
}
export type LoggingConfigurations = LoggingConfiguration[];
export interface ListLoggingConfigurationsResponse {
  LoggingConfigurations?: LoggingConfiguration[];
  NextMarker?: string;
}
export interface ListManagedRuleSetsRequest {
  Scope: Scope;
  NextMarker?: string;
  Limit?: number;
}
export interface ManagedRuleSetSummary {
  Name?: string;
  Id?: string;
  Description?: string;
  LockToken?: string;
  ARN?: string;
  LabelNamespace?: string;
}
export type ManagedRuleSetSummaries = ManagedRuleSetSummary[];
export interface ListManagedRuleSetsResponse {
  NextMarker?: string;
  ManagedRuleSets?: ManagedRuleSetSummary[];
}
export interface ListMobileSdkReleasesRequest {
  Platform: Platform;
  NextMarker?: string;
  Limit?: number;
}
export interface ReleaseSummary {
  ReleaseVersion?: string;
  Timestamp?: Date;
}
export type ReleaseSummaries = ReleaseSummary[];
export interface ListMobileSdkReleasesResponse {
  ReleaseSummaries?: ReleaseSummary[];
  NextMarker?: string;
}
export interface ListRegexPatternSetsRequest {
  Scope: Scope;
  NextMarker?: string;
  Limit?: number;
}
export type RegexPatternSetSummaries = RegexPatternSetSummary[];
export interface ListRegexPatternSetsResponse {
  NextMarker?: string;
  RegexPatternSets?: RegexPatternSetSummary[];
}
export type ResourceType =
  | "APPLICATION_LOAD_BALANCER"
  | "API_GATEWAY"
  | "APPSYNC"
  | "COGNITO_USER_POOL"
  | "APP_RUNNER_SERVICE"
  | "VERIFIED_ACCESS_INSTANCE"
  | "AMPLIFY"
  | "AGENTCORE_GATEWAY"
  | (string & {});
export interface ListResourcesForWebACLRequest {
  WebACLArn: string;
  ResourceType?: ResourceType;
}
export type ResourceArns = string[];
export interface ListResourcesForWebACLResponse {
  ResourceArns?: string[];
}
export interface ListRuleGroupsRequest {
  Scope: Scope;
  NextMarker?: string;
  Limit?: number;
}
export type RuleGroupSummaries = RuleGroupSummary[];
export interface ListRuleGroupsResponse {
  NextMarker?: string;
  RuleGroups?: RuleGroupSummary[];
}
export type SettlementSortBy =
  | "TIMESTAMP"
  | "AMOUNT"
  | "NAME"
  | "STATUS"
  | (string & {});
export type SettlementRecordLimit = number;
export interface ListSettlementRecordsRequest {
  TimeWindow: TimeWindow;
  Scope: Scope;
  Currency: Currency;
  Filters?: MonetizationFilter[];
  SortBy?: SettlementSortBy;
  SortOrder?: SortOrder;
  Limit?: number;
  NextMarker?: string;
}
export type SettlementFilterString = string;
export type SettlementStatus =
  | "SETTLED"
  | "PENDING"
  | "FAILED"
  | "SERVICE_ERROR"
  | "SKIPPED_ORIGIN_ERROR"
  | "DUPLICATE"
  | (string & {});
export type SettlementIdString = string;
export interface SettlementRecord {
  Timestamp: Date;
  PayerAddress?: string;
  WalletAddress?: string;
  Status: SettlementStatus;
  Amount: string;
  Currency?: Currency;
  Network?: string;
  TransactionId?: string;
  RequestId?: string;
  SourceName?: string;
  Organization?: string;
  SourceCategory?: string;
  Intent?: string;
  Verified?: boolean;
  ContentPath?: string;
  WebAclArn?: string;
  RequestTimestamp?: Date;
}
export type SettlementRecordList = SettlementRecord[];
export interface ListSettlementRecordsResponse {
  Settlements?: SettlementRecord[];
  NextMarker?: string;
}
export interface ListTagsForResourceRequest {
  NextMarker?: string;
  Limit?: number;
  ResourceARN: string;
}
export interface TagInfoForResource {
  ResourceARN?: string;
  TagList?: Tag[];
}
export interface ListTagsForResourceResponse {
  NextMarker?: string;
  TagInfoForResource?: TagInfoForResource;
}
export interface ListWebACLsRequest {
  Scope: Scope;
  NextMarker?: string;
  Limit?: number;
}
export type WebACLSummaries = WebACLSummary[];
export interface ListWebACLsResponse {
  NextMarker?: string;
  WebACLs?: WebACLSummary[];
}
export interface PutLoggingConfigurationRequest {
  LoggingConfiguration: LoggingConfiguration;
}
export interface PutLoggingConfigurationResponse {
  LoggingConfiguration?: LoggingConfiguration;
}
export interface VersionToPublish {
  AssociatedRuleGroupArn?: string;
  ForecastedLifetime?: number;
}
export type VersionsToPublish = { [key: string]: VersionToPublish | undefined };
export interface PutManagedRuleSetVersionsRequest {
  Name: string;
  Scope: Scope;
  Id: string;
  LockToken: string;
  RecommendedVersion?: string;
  VersionsToPublish?: { [key: string]: VersionToPublish | undefined };
}
export interface PutManagedRuleSetVersionsResponse {
  NextLockToken?: string;
}
export interface PutPermissionPolicyRequest {
  ResourceArn: string;
  Policy: string;
}
export interface PutPermissionPolicyResponse {}
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateIPSetRequest {
  Name: string;
  Scope: Scope;
  Id: string;
  Description?: string;
  Addresses: string[];
  LockToken: string;
}
export interface UpdateIPSetResponse {
  NextLockToken?: string;
}
export interface UpdateManagedRuleSetVersionExpiryDateRequest {
  Name: string;
  Scope: Scope;
  Id: string;
  LockToken: string;
  VersionToExpire: string;
  ExpiryTimestamp: Date;
}
export interface UpdateManagedRuleSetVersionExpiryDateResponse {
  ExpiringVersion?: string;
  ExpiryTimestamp?: Date;
  NextLockToken?: string;
}
export interface UpdateRegexPatternSetRequest {
  Name: string;
  Scope: Scope;
  Id: string;
  Description?: string;
  RegularExpressionList: Regex[];
  LockToken: string;
}
export interface UpdateRegexPatternSetResponse {
  NextLockToken?: string;
}
export interface UpdateRuleGroupRequest {
  Name: string;
  Scope: Scope;
  Id: string;
  Description?: string;
  Rules?: Rule[];
  VisibilityConfig: VisibilityConfig;
  LockToken: string;
  CustomResponseBodies?: { [key: string]: CustomResponseBody | undefined };
  MonetizationConfig?: MonetizationConfig;
}
export interface UpdateRuleGroupResponse {
  NextLockToken?: string;
}
export interface UpdateWebACLRequest {
  Name: string;
  Scope: Scope;
  Id: string;
  DefaultAction: DefaultAction;
  Description?: string;
  Rules?: Rule[];
  VisibilityConfig: VisibilityConfig;
  DataProtectionConfig?: DataProtectionConfig;
  LockToken: string;
  CustomResponseBodies?: { [key: string]: CustomResponseBody | undefined };
  CaptchaConfig?: CaptchaConfig;
  ChallengeConfig?: ChallengeConfig;
  TokenDomains?: string[];
  AssociationConfig?: AssociationConfig;
  OnSourceDDoSProtectionConfig?: OnSourceDDoSProtectionConfig;
  ApplicationConfig?: ApplicationConfig;
  MonetizationConfig?: MonetizationConfig;
}
export interface UpdateWebACLResponse {
  NextLockToken?: string;
}
export type ErrorMessage = string;
export type PricingPlanFeatureName = string;
export type RequiredPricingPlanName = string;
export interface DisallowedFeature {
  Feature?: string;
  RequiredPricingPlan?: string;
}
export type DisallowedFeatures = DisallowedFeature[];
export type ParameterExceptionField =
  | "WEB_ACL"
  | "RULE_GROUP"
  | "REGEX_PATTERN_SET"
  | "IP_SET"
  | "MANAGED_RULE_SET"
  | "RULE"
  | "EXCLUDED_RULE"
  | "STATEMENT"
  | "BYTE_MATCH_STATEMENT"
  | "SQLI_MATCH_STATEMENT"
  | "XSS_MATCH_STATEMENT"
  | "SIZE_CONSTRAINT_STATEMENT"
  | "GEO_MATCH_STATEMENT"
  | "RATE_BASED_STATEMENT"
  | "RULE_GROUP_REFERENCE_STATEMENT"
  | "REGEX_PATTERN_REFERENCE_STATEMENT"
  | "IP_SET_REFERENCE_STATEMENT"
  | "MANAGED_RULE_SET_STATEMENT"
  | "LABEL_MATCH_STATEMENT"
  | "AND_STATEMENT"
  | "OR_STATEMENT"
  | "NOT_STATEMENT"
  | "IP_ADDRESS"
  | "IP_ADDRESS_VERSION"
  | "FIELD_TO_MATCH"
  | "TEXT_TRANSFORMATION"
  | "SINGLE_QUERY_ARGUMENT"
  | "SINGLE_HEADER"
  | "DEFAULT_ACTION"
  | "RULE_ACTION"
  | "ENTITY_LIMIT"
  | "OVERRIDE_ACTION"
  | "SCOPE_VALUE"
  | "RESOURCE_ARN"
  | "RESOURCE_TYPE"
  | "TAGS"
  | "TAG_KEYS"
  | "METRIC_NAME"
  | "FIREWALL_MANAGER_STATEMENT"
  | "FALLBACK_BEHAVIOR"
  | "POSITION"
  | "FORWARDED_IP_CONFIG"
  | "IP_SET_FORWARDED_IP_CONFIG"
  | "HEADER_NAME"
  | "CUSTOM_REQUEST_HANDLING"
  | "RESPONSE_CONTENT_TYPE"
  | "CUSTOM_RESPONSE"
  | "CUSTOM_RESPONSE_BODY"
  | "JSON_MATCH_PATTERN"
  | "JSON_MATCH_SCOPE"
  | "BODY_PARSING_FALLBACK_BEHAVIOR"
  | "LOGGING_FILTER"
  | "FILTER_CONDITION"
  | "EXPIRE_TIMESTAMP"
  | "CHANGE_PROPAGATION_STATUS"
  | "ASSOCIABLE_RESOURCE"
  | "LOG_DESTINATION"
  | "MANAGED_RULE_GROUP_CONFIG"
  | "PAYLOAD_TYPE"
  | "HEADER_MATCH_PATTERN"
  | "COOKIE_MATCH_PATTERN"
  | "MAP_MATCH_SCOPE"
  | "OVERSIZE_HANDLING"
  | "CHALLENGE_CONFIG"
  | "TOKEN_DOMAIN"
  | "ATP_RULE_SET_RESPONSE_INSPECTION"
  | "ASSOCIATED_RESOURCE_TYPE"
  | "SCOPE_DOWN"
  | "CUSTOM_KEYS"
  | "ACP_RULE_SET_RESPONSE_INSPECTION"
  | "DATA_PROTECTION_CONFIG"
  | "LOW_REPUTATION_MODE"
  | "MONETIZATION_CONFIG"
  | "WALLET_ADDRESS"
  | "PRICE_AMOUNT"
  | "PAYMENT_NETWORK"
  | "PRE_PARSE_TEXT_TRANSFORMATION"
  | (string & {});
export type ParameterExceptionParameter = string;
export type ErrorReason = string;
export type SourceType = string;
export type AssociateWebACLError =
  | WAFFeatureNotIncludedInPricingPlanException
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFNonexistentItemException
  | WAFUnavailableEntityException
  | CommonErrors;
/**
 * Associates a web ACL with a resource, to protect the resource.
 *
 * Use this for all resource types except for Amazon CloudFront distributions. For Amazon CloudFront, call `UpdateDistribution` for the distribution and provide the Amazon Resource Name (ARN) of the web ACL in the web ACL ID. For information, see UpdateDistribution in the *Amazon CloudFront Developer Guide*.
 *
 * **Required permissions for customer-managed IAM policies**
 *
 * This call requires permissions that are specific to the protected resource type.
 * For details, see Permissions for AssociateWebACL in the *WAF Developer Guide*.
 *
 * **Temporary inconsistencies during updates**
 *
 * When you create or change a web ACL or other WAF resources, the changes take a small amount of time to propagate to all areas where the resources are stored. The propagation time can be from a few seconds to a number of minutes.
 *
 * The following are examples of the temporary inconsistencies that you might notice during change propagation:
 *
 * - After you create a web ACL, if you try to associate it with a resource, you might get an exception indicating that the web ACL is unavailable.
 *
 * - After you add a rule group to a web ACL, the new rule group rules might be in effect in one area where the web ACL is used and not in another.
 *
 * - After you change a rule action setting, you might see the old action in some places and the new action in others.
 *
 * - After you add an IP address to an IP set that is in use in a blocking rule, the new address might be blocked in one area while still allowed in another.
 */
export const associateWebACL: API.OperationMethod<
  AssociateWebACLRequest,
  AssociateWebACLResponse,
  AssociateWebACLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { WebACLArn: 0, ResourceArn: 0 } },
  errors: [
    WAFFeatureNotIncludedInPricingPlanException,
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFNonexistentItemException,
    WAFUnavailableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateWebACL",
})) as any;

export type CheckCapacityError =
  | WAFExpiredManagedRuleGroupVersionException
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFInvalidResourceException
  | WAFLimitsExceededException
  | WAFNonexistentItemException
  | WAFSubscriptionNotFoundException
  | WAFUnavailableEntityException
  | CommonErrors;
/**
 * Returns the web ACL capacity unit (WCU) requirements for a specified scope and set of rules.
 * You can use this to check the capacity requirements for the rules you want to use in a
 * RuleGroup or WebACL.
 *
 * WAF uses WCUs to calculate and control the operating
 * resources that are used to run your rules, rule groups, and web ACLs. WAF
 * calculates capacity differently for each rule type, to reflect the relative cost of each rule.
 * Simple rules that cost little to run use fewer WCUs than more complex rules
 * that use more processing power.
 * Rule group capacity is fixed at creation, which helps users plan their
 * web ACL WCU usage when they use a rule group. For more information, see WAF web ACL capacity units (WCU)
 * in the *WAF Developer Guide*.
 */
export const checkCapacity: API.OperationMethod<
  CheckCapacityRequest,
  CheckCapacityResponse,
  CheckCapacityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Scope: 0, Rules: D.list(i_Rule) } },
  errors: [
    WAFExpiredManagedRuleGroupVersionException,
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFInvalidResourceException,
    WAFLimitsExceededException,
    WAFNonexistentItemException,
    WAFSubscriptionNotFoundException,
    WAFUnavailableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CheckCapacity",
})) as any;

export type CreateAPIKeyError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | CommonErrors;
/**
 * Creates an API key that contains a set of token domains.
 *
 * API keys are required for the integration of the CAPTCHA API in your JavaScript client applications.
 * The API lets you customize the placement and characteristics of the CAPTCHA puzzle for your end users.
 * For more information about the CAPTCHA JavaScript integration, see WAF client application integration in the *WAF Developer Guide*.
 *
 * You can use a single key for up to 5 domains. After you generate a key, you can copy it for use in your JavaScript
 * integration.
 */
export const createAPIKey: API.OperationMethod<
  CreateAPIKeyRequest,
  CreateAPIKeyResponse,
  CreateAPIKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Scope: 0, TokenDomains: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAPIKey",
})) as any;

export type CreateIPSetError =
  | WAFDuplicateItemException
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFOptimisticLockException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * Creates an IPSet, which you use to identify web requests that
 * originate from specific IP addresses or ranges of IP addresses. For example, if you're
 * receiving a lot of requests from a ranges of IP addresses, you can configure WAF to
 * block them using an IPSet that lists those IP addresses.
 */
export const createIPSet: API.OperationMethod<
  CreateIPSetRequest,
  CreateIPSetResponse,
  CreateIPSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Scope: 0,
      Description: 0,
      IPAddressVersion: 0,
      Addresses: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    WAFDuplicateItemException,
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFOptimisticLockException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIPSet",
})) as any;

export type CreateRegexPatternSetError =
  | WAFDuplicateItemException
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFOptimisticLockException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * Creates a RegexPatternSet, which you reference in a RegexPatternSetReferenceStatement, to have WAF inspect a web request
 * component for the specified patterns.
 */
export const createRegexPatternSet: API.OperationMethod<
  CreateRegexPatternSetRequest,
  CreateRegexPatternSetResponse,
  CreateRegexPatternSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Scope: 0,
      Description: 0,
      RegularExpressionList: D.list(i_Regex),
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    WAFDuplicateItemException,
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFOptimisticLockException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRegexPatternSet",
})) as any;

export type CreateRuleGroupError =
  | WAFDuplicateItemException
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFNonexistentItemException
  | WAFOptimisticLockException
  | WAFSubscriptionNotFoundException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | WAFUnavailableEntityException
  | CommonErrors;
/**
 * Creates a RuleGroup per the specifications provided.
 *
 * A rule group defines a collection of rules to inspect and control web requests that you can use in a WebACL. When you create a rule group, you define an immutable capacity limit. If you update a rule group, you must stay within the capacity. This allows others to reuse the rule group with confidence in its capacity requirements.
 */
export const createRuleGroup: API.OperationMethod<
  CreateRuleGroupRequest,
  CreateRuleGroupResponse,
  CreateRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Scope: 0,
      Capacity: 0,
      Description: 0,
      Rules: D.list(i_Rule),
      VisibilityConfig: i_VisibilityConfig,
      Tags: D.list(i_Tag),
      CustomResponseBodies: D.map(i_CustomResponseBody),
      MonetizationConfig: i_MonetizationConfig,
    },
  },
  errors: [
    WAFDuplicateItemException,
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFNonexistentItemException,
    WAFOptimisticLockException,
    WAFSubscriptionNotFoundException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
    WAFUnavailableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRuleGroup",
})) as any;

export type CreateWebACLError =
  | WAFConfigurationWarningException
  | WAFDuplicateItemException
  | WAFExpiredManagedRuleGroupVersionException
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFInvalidResourceException
  | WAFLimitsExceededException
  | WAFNonexistentItemException
  | WAFOptimisticLockException
  | WAFSubscriptionNotFoundException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | WAFUnavailableEntityException
  | CommonErrors;
/**
 * Creates a WebACL per the specifications provided.
 *
 * A web ACL defines a collection of rules to use to inspect and control web requests. Each rule has a statement that defines what to look for in web requests and an action that WAF applies to requests that match the statement. In the web ACL, you assign a default action to take (allow, block) for any request that does not match any of the rules. The rules in a web ACL can be a combination of the types Rule, RuleGroup, and managed rule group. You can associate a web ACL with one or more Amazon Web Services resources to protect. The resource types include Amazon CloudFront distribution, Amazon API Gateway REST API, Application Load Balancer, AppSync GraphQL API, Amazon Cognito user pool, App Runner service, Amplify application, Amazon Web Services Verified Access instance, and Amazon Bedrock AgentCore Gateway.
 */
export const createWebACL: API.OperationMethod<
  CreateWebACLRequest,
  CreateWebACLResponse,
  CreateWebACLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Scope: 0,
      DefaultAction: i_DefaultAction,
      Description: 0,
      Rules: D.list(i_Rule),
      VisibilityConfig: i_VisibilityConfig,
      DataProtectionConfig: i_DataProtectionConfig,
      Tags: D.list(i_Tag),
      CustomResponseBodies: D.map(i_CustomResponseBody),
      CaptchaConfig: i_CaptchaConfig,
      ChallengeConfig: i_ChallengeConfig,
      TokenDomains: 0,
      AssociationConfig: i_AssociationConfig,
      OnSourceDDoSProtectionConfig: i_OnSourceDDoSProtectionConfig,
      ApplicationConfig: i_ApplicationConfig,
      MonetizationConfig: i_MonetizationConfig,
    },
  },
  errors: [
    WAFConfigurationWarningException,
    WAFDuplicateItemException,
    WAFExpiredManagedRuleGroupVersionException,
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFInvalidResourceException,
    WAFLimitsExceededException,
    WAFNonexistentItemException,
    WAFOptimisticLockException,
    WAFSubscriptionNotFoundException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
    WAFUnavailableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWebACL",
})) as any;

export type DeleteAPIKeyError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | WAFOptimisticLockException
  | CommonErrors;
/**
 * Deletes the specified API key.
 *
 * After you delete a key, it can take up to 24 hours for WAF to disallow use of the key in all regions.
 */
export const deleteAPIKey: API.OperationMethod<
  DeleteAPIKeyRequest,
  DeleteAPIKeyResponse,
  DeleteAPIKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Scope: 0, APIKey: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
    WAFOptimisticLockException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAPIKey",
})) as any;

export type DeleteFirewallManagerRuleGroupsError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | WAFOptimisticLockException
  | CommonErrors;
/**
 * Deletes all rule groups that are managed by Firewall Manager from the specified WebACL.
 *
 * You can only use this if `ManagedByFirewallManager` and `RetrofittedByFirewallManager` are both false in the web ACL.
 */
export const deleteFirewallManagerRuleGroups: API.OperationMethod<
  DeleteFirewallManagerRuleGroupsRequest,
  DeleteFirewallManagerRuleGroupsResponse,
  DeleteFirewallManagerRuleGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { WebACLArn: 0, WebACLLockToken: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
    WAFOptimisticLockException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFirewallManagerRuleGroups",
})) as any;

export type DeleteIPSetError =
  | WAFAssociatedItemException
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | WAFOptimisticLockException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * Deletes the specified IPSet.
 */
export const deleteIPSet: API.OperationMethod<
  DeleteIPSetRequest,
  DeleteIPSetResponse,
  DeleteIPSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, Scope: 0, Id: 0, LockToken: 0 },
  },
  errors: [
    WAFAssociatedItemException,
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
    WAFOptimisticLockException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIPSet",
})) as any;

export type DeleteLoggingConfigurationError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | WAFOptimisticLockException
  | CommonErrors;
/**
 * Deletes the LoggingConfiguration from the specified web ACL.
 */
export const deleteLoggingConfiguration: API.OperationMethod<
  DeleteLoggingConfigurationRequest,
  DeleteLoggingConfigurationResponse,
  DeleteLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0, LogType: 0, LogScope: 0 },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
    WAFOptimisticLockException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLoggingConfiguration",
})) as any;

export type DeletePermissionPolicyError =
  | WAFInternalErrorException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * Permanently deletes an IAM policy from the specified rule group.
 *
 * You must be the owner of the rule group to perform this operation.
 */
export const deletePermissionPolicy: API.OperationMethod<
  DeletePermissionPolicyRequest,
  DeletePermissionPolicyResponse,
  DeletePermissionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePermissionPolicy",
})) as any;

export type DeleteRegexPatternSetError =
  | WAFAssociatedItemException
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | WAFOptimisticLockException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * Deletes the specified RegexPatternSet.
 */
export const deleteRegexPatternSet: API.OperationMethod<
  DeleteRegexPatternSetRequest,
  DeleteRegexPatternSetResponse,
  DeleteRegexPatternSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, Scope: 0, Id: 0, LockToken: 0 },
  },
  errors: [
    WAFAssociatedItemException,
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
    WAFOptimisticLockException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRegexPatternSet",
})) as any;

export type DeleteRuleGroupError =
  | WAFAssociatedItemException
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | WAFOptimisticLockException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * Deletes the specified RuleGroup.
 */
export const deleteRuleGroup: API.OperationMethod<
  DeleteRuleGroupRequest,
  DeleteRuleGroupResponse,
  DeleteRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, Scope: 0, Id: 0, LockToken: 0 },
  },
  errors: [
    WAFAssociatedItemException,
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
    WAFOptimisticLockException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRuleGroup",
})) as any;

export type DeleteWebACLError =
  | WAFAssociatedItemException
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | WAFOptimisticLockException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * Deletes the specified WebACL.
 *
 * You can only use this if `ManagedByFirewallManager` is false in the web ACL.
 *
 * Before deleting any web ACL, first disassociate it from all resources.
 *
 * - To retrieve a list of the resources that are associated with a web ACL, use the
 * following calls:
 *
 * - For Amazon CloudFront distributions, use the CloudFront call
 * `ListDistributionsByWebACLId`. For information, see ListDistributionsByWebACLId
 * in the *Amazon CloudFront API Reference*.
 *
 * - For all other resources, call ListResourcesForWebACL.
 *
 * - To disassociate a resource from a web ACL, use the following calls:
 *
 * - For Amazon CloudFront distributions, provide an empty web ACL ID in the CloudFront call
 * `UpdateDistribution`. For information, see UpdateDistribution
 * in the *Amazon CloudFront API Reference*.
 *
 * - For all other resources, call DisassociateWebACL.
 */
export const deleteWebACL: API.OperationMethod<
  DeleteWebACLRequest,
  DeleteWebACLResponse,
  DeleteWebACLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, Scope: 0, Id: 0, LockToken: 0 },
  },
  errors: [
    WAFAssociatedItemException,
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
    WAFOptimisticLockException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWebACL",
})) as any;

export type DescribeAllManagedProductsError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | CommonErrors;
/**
 * Provides high-level information for the Amazon Web Services Managed Rules rule groups and Amazon Web Services Marketplace managed rule groups.
 */
export const describeAllManagedProducts: API.OperationMethod<
  DescribeAllManagedProductsRequest,
  DescribeAllManagedProductsResponse,
  DescribeAllManagedProductsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Scope: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAllManagedProducts",
})) as any;

export type DescribeManagedProductsByVendorError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | CommonErrors;
/**
 * Provides high-level information for the managed rule groups owned by a specific vendor.
 */
export const describeManagedProductsByVendor: API.OperationMethod<
  DescribeManagedProductsByVendorRequest,
  DescribeManagedProductsByVendorResponse,
  DescribeManagedProductsByVendorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { VendorName: 0, Scope: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeManagedProductsByVendor",
})) as any;

export type DescribeManagedRuleGroupError =
  | WAFExpiredManagedRuleGroupVersionException
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFInvalidResourceException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * Provides high-level information for a managed rule group, including descriptions of the rules.
 */
export const describeManagedRuleGroup: API.OperationMethod<
  DescribeManagedRuleGroupRequest,
  DescribeManagedRuleGroupResponse,
  DescribeManagedRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { VendorName: 0, Name: 0, Scope: 0, VersionName: 0 },
  },
  errors: [
    WAFExpiredManagedRuleGroupVersionException,
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFInvalidResourceException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeManagedRuleGroup",
})) as any;

export type DisassociateWebACLError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | WAFUnavailableEntityException
  | CommonErrors;
/**
 * Disassociates the specified resource from its web ACL
 * association, if it has one.
 *
 * Use this for all resource types except for Amazon CloudFront distributions. For Amazon CloudFront, call `UpdateDistribution` for the distribution and provide an empty web ACL ID. For information, see UpdateDistribution in the *Amazon CloudFront API Reference*.
 *
 * **Required permissions for customer-managed IAM policies**
 *
 * This call requires permissions that are specific to the protected resource type.
 * For details, see Permissions for DisassociateWebACL in the *WAF Developer Guide*.
 */
export const disassociateWebACL: API.OperationMethod<
  DisassociateWebACLRequest,
  DisassociateWebACLResponse,
  DisassociateWebACLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
    WAFUnavailableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateWebACL",
})) as any;

export type GenerateMobileSdkReleaseUrlError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * Generates a presigned download URL for the specified release of the mobile SDK.
 *
 * The mobile SDK is not generally available. Customers who have access to the mobile SDK can use it to establish and manage WAF tokens for use in HTTP(S) requests from a mobile device to WAF. For more information, see
 * WAF client application integration in the *WAF Developer Guide*.
 */
export const generateMobileSdkReleaseUrl: API.OperationMethod<
  GenerateMobileSdkReleaseUrlRequest,
  GenerateMobileSdkReleaseUrlResponse,
  GenerateMobileSdkReleaseUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Platform: 0, ReleaseVersion: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateMobileSdkReleaseUrl",
})) as any;

export type GetDecryptedAPIKeyError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFInvalidResourceException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * Returns your API key in decrypted form. Use this to check the token domains that you have defined for the key.
 *
 * API keys are required for the integration of the CAPTCHA API in your JavaScript client applications.
 * The API lets you customize the placement and characteristics of the CAPTCHA puzzle for your end users.
 * For more information about the CAPTCHA JavaScript integration, see WAF client application integration in the *WAF Developer Guide*.
 */
export const getDecryptedAPIKey: API.OperationMethod<
  GetDecryptedAPIKeyRequest,
  GetDecryptedAPIKeyResponse,
  GetDecryptedAPIKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Scope: 0, APIKey: 0 },
    output: { CreationTimestamp: D.ts },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFInvalidResourceException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDecryptedAPIKey",
})) as any;

export type GetIPSetError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * Retrieves the specified IPSet.
 */
export const getIPSet: API.OperationMethod<
  GetIPSetRequest,
  GetIPSetResponse,
  GetIPSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0, Scope: 0, Id: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIPSet",
})) as any;

export type GetLoggingConfigurationError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * Returns the LoggingConfiguration for the specified web ACL.
 */
export const getLoggingConfiguration: API.OperationMethod<
  GetLoggingConfigurationRequest,
  GetLoggingConfigurationResponse,
  GetLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0, LogType: 0, LogScope: 0 },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoggingConfiguration",
})) as any;

export type GetManagedRuleSetError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * Retrieves the specified managed rule set.
 *
 * This is intended for use only by vendors of managed rule sets. Vendors are Amazon Web Services and Amazon Web Services Marketplace sellers.
 *
 * Vendors, you can use the managed rule set APIs to provide controlled rollout of your versioned managed rule group offerings for your customers. The APIs are `ListManagedRuleSets`, `GetManagedRuleSet`, `PutManagedRuleSetVersions`, and `UpdateManagedRuleSetVersionExpiryDate`.
 */
export const getManagedRuleSet: API.OperationMethod<
  GetManagedRuleSetRequest,
  GetManagedRuleSetResponse,
  GetManagedRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, Scope: 0, Id: 0 },
    output: {
      ManagedRuleSet: {
        PublishedVersions: D.map({
          PublishTimestamp: D.ts,
          LastUpdateTimestamp: D.ts,
          ExpiryTimestamp: D.ts,
        }),
      },
    },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetManagedRuleSet",
})) as any;

export type GetMobileSdkReleaseError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * Retrieves information for the specified mobile SDK release, including release notes and
 * tags.
 *
 * The mobile SDK is not generally available. Customers who have access to the mobile SDK can use it to establish and manage WAF tokens for use in HTTP(S) requests from a mobile device to WAF. For more information, see
 * WAF client application integration in the *WAF Developer Guide*.
 */
export const getMobileSdkRelease: API.OperationMethod<
  GetMobileSdkReleaseRequest,
  GetMobileSdkReleaseResponse,
  GetMobileSdkReleaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Platform: 0, ReleaseVersion: 0 },
    output: { MobileSdkRelease: { Timestamp: D.ts } },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMobileSdkRelease",
})) as any;

export type GetPermissionPolicyError =
  | WAFInternalErrorException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * Returns the IAM policy that is attached to the specified rule group.
 *
 * You must be the owner of the rule group to perform this operation.
 */
export const getPermissionPolicy: API.OperationMethod<
  GetPermissionPolicyRequest,
  GetPermissionPolicyResponse,
  GetPermissionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPermissionPolicy",
})) as any;

export type GetRateBasedStatementManagedKeysError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | WAFUnsupportedAggregateKeyTypeException
  | CommonErrors;
/**
 * Retrieves the IP addresses that are currently blocked by a rate-based rule instance. This
 * is only available for rate-based rules that aggregate solely on the IP address or on the forwarded IP
 * address.
 *
 * The maximum
 * number of addresses that can be blocked for a single rate-based rule instance is 10,000.
 * If more than 10,000 addresses exceed the rate limit, those with the highest rates are
 * blocked.
 *
 * For a rate-based rule that you've defined inside a rule group, provide the name of the
 * rule group reference statement in your request, in addition to the rate-based rule name and
 * the web ACL name.
 *
 * WAF monitors web requests and manages keys independently for each unique combination
 * of web ACL, optional rule group, and rate-based rule. For example, if you define a
 * rate-based rule inside a rule group, and then use the rule group in a web ACL, WAF
 * monitors web requests and manages keys for that web ACL, rule group reference statement,
 * and rate-based rule instance. If you use the same rule group in a second web ACL, WAF
 * monitors web requests and manages keys for this second usage completely independent of your
 * first.
 */
export const getRateBasedStatementManagedKeys: API.OperationMethod<
  GetRateBasedStatementManagedKeysRequest,
  GetRateBasedStatementManagedKeysResponse,
  GetRateBasedStatementManagedKeysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Scope: 0,
      WebACLName: 0,
      WebACLId: 0,
      RuleGroupRuleName: 0,
      RuleName: 0,
    },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
    WAFUnsupportedAggregateKeyTypeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRateBasedStatementManagedKeys",
})) as any;

export type GetRegexPatternSetError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * Retrieves the specified RegexPatternSet.
 */
export const getRegexPatternSet: API.OperationMethod<
  GetRegexPatternSetRequest,
  GetRegexPatternSetResponse,
  GetRegexPatternSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0, Scope: 0, Id: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegexPatternSet",
})) as any;

export type GetRevenueStatisticsError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * Retrieves ranked monetization statistics. Use the `StatisticType` parameter to specify the ranking: `TOP_SOURCES_BY_REVENUE` for top sources by revenue, or `TOP_PATHS_BY_REVENUE` for top content paths by revenue. This operation is only available for `CLOUDFRONT` scope. The maximum supported time window is 90 days. When no `CurrencyMode` filter is provided, results default to `REAL`. To retrieve test data, include a `CurrencyMode` filter with the value `TEST`.
 */
export const getRevenueStatistics: API.OperationMethod<
  GetRevenueStatisticsRequest,
  GetRevenueStatisticsResponse,
  GetRevenueStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StatisticType: 0,
      TimeWindow: i_TimeWindow,
      Scope: 0,
      Currency: 0,
      GroupBy: 0,
      Filters: D.list(i_MonetizationFilter),
      NextMarker: 0,
      Limit: 0,
      SortBy: 0,
      SortOrder: 0,
    },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRevenueStatistics",
})) as any;

export type GetRevenueStatisticsSummaryError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * Retrieves a summary of monetization revenue for the specified time window. Returns total revenue, revenue by verification tier, total settlements, and total HTTP 402 responses served. This operation is only available for `CLOUDFRONT` scope. The maximum supported time window is 90 days. When no `CurrencyMode` filter is provided, results default to `REAL`. To retrieve test data, include a `CurrencyMode` filter with the value `TEST`.
 */
export const getRevenueStatisticsSummary: API.OperationMethod<
  GetRevenueStatisticsSummaryRequest,
  GetRevenueStatisticsSummaryResponse,
  GetRevenueStatisticsSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TimeWindow: i_TimeWindow,
      Scope: 0,
      Currency: 0,
      Filters: D.list(i_MonetizationFilter),
    },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRevenueStatisticsSummary",
})) as any;

export type GetRevenueStatisticsTimeSeriesError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * Retrieves time series data for monetization revenue. Returns data points aggregated at the specified interval for the given time window. This operation is only available for `CLOUDFRONT` scope. The maximum supported time window is 90 days. When no `CurrencyMode` filter is provided, results default to `REAL`. To retrieve test data, include a `CurrencyMode` filter with the value `TEST`.
 */
export const getRevenueStatisticsTimeSeries: API.OperationMethod<
  GetRevenueStatisticsTimeSeriesRequest,
  GetRevenueStatisticsTimeSeriesResponse,
  GetRevenueStatisticsTimeSeriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StatisticType: 0,
      TimeWindow: i_TimeWindow,
      Scope: 0,
      Interval: 0,
      Currency: 0,
      GroupBy: 0,
      Filters: D.list(i_MonetizationFilter),
      Limit: 0,
      NextMarker: 0,
    },
    output: { DataPoints: D.list({ Date: D.ts }) },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRevenueStatisticsTimeSeries",
})) as any;

export type GetRuleGroupError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * Retrieves the specified RuleGroup.
 */
export const getRuleGroup: API.OperationMethod<
  GetRuleGroupRequest,
  GetRuleGroupResponse,
  GetRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, Scope: 0, Id: 0, ARN: 0 },
    output: { RuleGroup: { Rules: D.list(o_Rule) } },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRuleGroup",
})) as any;

export type GetSampledRequestsError =
  | WAFInternalErrorException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * Gets detailed information about a specified number of requests--a sample--that WAF
 * randomly selects from among the first 5,000 requests that your Amazon Web Services resource received
 * during a time range that you choose. You can specify a sample size of up to 500 requests,
 * and you can specify any time range in the previous three hours.
 *
 * `GetSampledRequests` returns a time range, which is usually the time range that
 * you specified. However, if your resource (such as a CloudFront distribution) received 5,000
 * requests before the specified time range elapsed, `GetSampledRequests` returns
 * an updated time range. This new time range indicates the actual period during which WAF
 * selected the requests in the sample.
 */
export const getSampledRequests: API.OperationMethod<
  GetSampledRequestsRequest,
  GetSampledRequestsResponse,
  GetSampledRequestsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      WebAclArn: 0,
      RuleMetricName: 0,
      Scope: 0,
      TimeWindow: i_TimeWindow,
      MaxItems: 0,
    },
    output: {
      SampledRequests: D.list({ Timestamp: D.ts }),
      TimeWindow: { StartTime: D.ts, EndTime: D.ts },
    },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSampledRequests",
})) as any;

export type GetTopPathStatisticsByTrafficError =
  | WAFFeatureNotIncludedInPricingPlanException
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * Retrieves aggregated statistics about the top URI paths accessed by bot traffic for a specified web ACL and time window.
 * You can use this operation to analyze which paths on your web application receive the most bot traffic and identify the specific bots accessing those paths.
 * The operation supports filtering by bot category, organization, or name, and allows you to drill down into specific path prefixes to view detailed URI-level statistics.
 */
export const getTopPathStatisticsByTraffic: API.OperationMethod<
  GetTopPathStatisticsByTrafficRequest,
  GetTopPathStatisticsByTrafficResponse,
  GetTopPathStatisticsByTrafficError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      WebAclArn: 0,
      Scope: 0,
      UriPathPrefix: 0,
      TimeWindow: i_TimeWindow,
      BotCategory: 0,
      BotOrganization: 0,
      BotName: 0,
      Limit: 0,
      NumberOfTopTrafficBotsPerPath: 0,
      NextMarker: 0,
    },
  },
  errors: [
    WAFFeatureNotIncludedInPricingPlanException,
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTopPathStatisticsByTraffic",
})) as any;

export type GetWebACLError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * Retrieves the specified WebACL.
 */
export const getWebACL: API.OperationMethod<
  GetWebACLRequest,
  GetWebACLResponse,
  GetWebACLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, Scope: 0, Id: 0, ARN: 0 },
    output: { WebACL: o_WebACL },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWebACL",
})) as any;

export type GetWebACLForResourceError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | WAFUnavailableEntityException
  | CommonErrors;
/**
 * Retrieves the WebACL for the specified resource.
 *
 * This call uses `GetWebACL`, to verify that your account has permission to access the retrieved web ACL.
 * If you get an error that indicates that your account isn't authorized to perform `wafv2:GetWebACL` on the resource,
 * that error won't be included in your CloudTrail event history.
 *
 * For Amazon CloudFront, don't use this call. Instead, call the CloudFront action
 * `GetDistributionConfig`. For information, see GetDistributionConfig in the *Amazon CloudFront API Reference*.
 *
 * **Required permissions for customer-managed IAM policies**
 *
 * This call requires permissions that are specific to the protected resource type.
 * For details, see Permissions for GetWebACLForResource in the *WAF Developer Guide*.
 */
export const getWebACLForResource: API.OperationMethod<
  GetWebACLForResourceRequest,
  GetWebACLForResourceResponse,
  GetWebACLForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0 },
    output: { WebACL: o_WebACL },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
    WAFUnavailableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWebACLForResource",
})) as any;

export type ListAPIKeysError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFInvalidResourceException
  | CommonErrors;
/**
 * Retrieves a list of the API keys that you've defined for the specified scope.
 *
 * API keys are required for the integration of the CAPTCHA API in your JavaScript client applications.
 * The API lets you customize the placement and characteristics of the CAPTCHA puzzle for your end users.
 * For more information about the CAPTCHA JavaScript integration, see WAF client application integration in the *WAF Developer Guide*.
 */
export const listAPIKeys: API.OperationMethod<
  ListAPIKeysRequest,
  ListAPIKeysResponse,
  ListAPIKeysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Scope: 0, NextMarker: 0, Limit: 0 },
    output: { APIKeySummaries: D.list({ CreationTimestamp: D.ts }) },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFInvalidResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAPIKeys",
})) as any;

export type ListAvailableManagedRuleGroupsError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | CommonErrors;
/**
 * Retrieves an array of managed rule groups that are available for you to use. This list
 * includes all Amazon Web Services Managed Rules rule groups and all of the Amazon Web Services Marketplace managed rule groups that you're
 * subscribed to.
 */
export const listAvailableManagedRuleGroups: API.OperationMethod<
  ListAvailableManagedRuleGroupsRequest,
  ListAvailableManagedRuleGroupsResponse,
  ListAvailableManagedRuleGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Scope: 0, NextMarker: 0, Limit: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAvailableManagedRuleGroups",
})) as any;

export type ListAvailableManagedRuleGroupVersionsError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * Returns a list of the available versions for the specified managed rule group.
 */
export const listAvailableManagedRuleGroupVersions: API.OperationMethod<
  ListAvailableManagedRuleGroupVersionsRequest,
  ListAvailableManagedRuleGroupVersionsResponse,
  ListAvailableManagedRuleGroupVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { VendorName: 0, Name: 0, Scope: 0, NextMarker: 0, Limit: 0 },
    output: { Versions: D.list({ LastUpdateTimestamp: D.ts }) },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAvailableManagedRuleGroupVersions",
})) as any;

export type ListIPSetsError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | CommonErrors;
/**
 * Retrieves an array of IPSetSummary objects for the IP sets that you
 * manage.
 */
export const listIPSets: API.OperationMethod<
  ListIPSetsRequest,
  ListIPSetsResponse,
  ListIPSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Scope: 0, NextMarker: 0, Limit: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIPSets",
})) as any;

export type ListLoggingConfigurationsError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | CommonErrors;
/**
 * Retrieves an array of your LoggingConfiguration objects.
 */
export const listLoggingConfigurations: API.OperationMethod<
  ListLoggingConfigurationsRequest,
  ListLoggingConfigurationsResponse,
  ListLoggingConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Scope: 0, NextMarker: 0, Limit: 0, LogScope: 0 },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLoggingConfigurations",
})) as any;

export type ListManagedRuleSetsError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | CommonErrors;
/**
 * Retrieves the managed rule sets that you own.
 *
 * This is intended for use only by vendors of managed rule sets. Vendors are Amazon Web Services and Amazon Web Services Marketplace sellers.
 *
 * Vendors, you can use the managed rule set APIs to provide controlled rollout of your versioned managed rule group offerings for your customers. The APIs are `ListManagedRuleSets`, `GetManagedRuleSet`, `PutManagedRuleSetVersions`, and `UpdateManagedRuleSetVersionExpiryDate`.
 */
export const listManagedRuleSets: API.OperationMethod<
  ListManagedRuleSetsRequest,
  ListManagedRuleSetsResponse,
  ListManagedRuleSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Scope: 0, NextMarker: 0, Limit: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedRuleSets",
})) as any;

export type ListMobileSdkReleasesError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | CommonErrors;
/**
 * Retrieves a list of the available releases for the mobile SDK and the specified device
 * platform.
 *
 * The mobile SDK is not generally available. Customers who have access to the mobile SDK can use it to establish and manage WAF tokens for use in HTTP(S) requests from a mobile device to WAF. For more information, see
 * WAF client application integration in the *WAF Developer Guide*.
 */
export const listMobileSdkReleases: API.OperationMethod<
  ListMobileSdkReleasesRequest,
  ListMobileSdkReleasesResponse,
  ListMobileSdkReleasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Platform: 0, NextMarker: 0, Limit: 0 },
    output: { ReleaseSummaries: D.list({ Timestamp: D.ts }) },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMobileSdkReleases",
})) as any;

export type ListRegexPatternSetsError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | CommonErrors;
/**
 * Retrieves an array of RegexPatternSetSummary objects for the regex
 * pattern sets that you manage.
 */
export const listRegexPatternSets: API.OperationMethod<
  ListRegexPatternSetsRequest,
  ListRegexPatternSetsResponse,
  ListRegexPatternSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Scope: 0, NextMarker: 0, Limit: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRegexPatternSets",
})) as any;

export type ListResourcesForWebACLError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * Retrieves an array of the Amazon Resource Names (ARNs) for the resources that
 * are associated with the specified web ACL.
 *
 * For Amazon CloudFront, don't use this call. Instead, use the CloudFront call
 * `ListDistributionsByWebACLId`. For information, see ListDistributionsByWebACLId
 * in the *Amazon CloudFront API Reference*.
 *
 * **Required permissions for customer-managed IAM policies**
 *
 * This call requires permissions that are specific to the protected resource type.
 * For details, see Permissions for ListResourcesForWebACL in the *WAF Developer Guide*.
 */
export const listResourcesForWebACL: API.OperationMethod<
  ListResourcesForWebACLRequest,
  ListResourcesForWebACLResponse,
  ListResourcesForWebACLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { WebACLArn: 0, ResourceType: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourcesForWebACL",
})) as any;

export type ListRuleGroupsError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | CommonErrors;
/**
 * Retrieves an array of RuleGroupSummary objects for the rule groups
 * that you manage.
 */
export const listRuleGroups: API.OperationMethod<
  ListRuleGroupsRequest,
  ListRuleGroupsResponse,
  ListRuleGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Scope: 0, NextMarker: 0, Limit: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRuleGroups",
})) as any;

export type ListSettlementRecordsError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * Retrieves individual settlement transaction records for monetization. Each record represents a single payment transaction between a client and your protected resource. This operation is only available for `CLOUDFRONT` scope. The maximum supported time window is 90 days. When no `CurrencyMode` filter is provided, results default to `REAL`. To retrieve test data, include a `CurrencyMode` filter with the value `TEST`.
 */
export const listSettlementRecords: API.OperationMethod<
  ListSettlementRecordsRequest,
  ListSettlementRecordsResponse,
  ListSettlementRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TimeWindow: i_TimeWindow,
      Scope: 0,
      Currency: 0,
      Filters: D.list(i_MonetizationFilter),
      SortBy: 0,
      SortOrder: 0,
      Limit: 0,
      NextMarker: 0,
    },
    output: {
      Settlements: D.list({ Timestamp: D.ts, RequestTimestamp: D.ts }),
    },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSettlementRecords",
})) as any;

export type ListTagsForResourceError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * Retrieves the TagInfoForResource for the specified resource. Tags are
 * key:value pairs that you can use to categorize and manage your resources, for purposes like
 * billing. For example, you might set the tag key to "customer" and the value to the customer
 * name or ID. You can specify one or more tags to add to each Amazon Web Services resource, up to 50 tags
 * for a resource.
 *
 * You can tag the Amazon Web Services resources that you manage through WAF: web ACLs, rule
 * groups, IP sets, and regex pattern sets. You can't manage or view tags through the WAF
 * console.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { NextMarker: 0, Limit: 0, ResourceARN: 0 },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListWebACLsError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | CommonErrors;
/**
 * Retrieves an array of WebACLSummary objects for the web ACLs that you
 * manage.
 */
export const listWebACLs: API.OperationMethod<
  ListWebACLsRequest,
  ListWebACLsResponse,
  ListWebACLsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Scope: 0, NextMarker: 0, Limit: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWebACLs",
})) as any;

export type PutLoggingConfigurationError =
  | WAFFeatureNotIncludedInPricingPlanException
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFLogDestinationPermissionIssueException
  | WAFNonexistentItemException
  | WAFOptimisticLockException
  | WAFServiceLinkedRoleErrorException
  | CommonErrors;
/**
 * Enables the specified LoggingConfiguration, to start logging from a
 * web ACL, according to the configuration provided.
 *
 * If you configure data protection for the web ACL, the protection applies to the data that WAF sends to the logs.
 *
 * This operation completely replaces any mutable specifications that you already have for a logging configuration with the ones that you provide to this call.
 *
 * To modify an existing logging configuration, do the following:
 *
 * - Retrieve it by calling GetLoggingConfiguration
 *
 * - Update its settings as needed
 *
 * - Provide the complete logging configuration specification to this call
 *
 * You can define one logging destination per web ACL.
 *
 * You can access information about the traffic that WAF inspects using the following
 * steps:
 *
 * - Create your logging destination. You can use an Amazon CloudWatch Logs log group, an Amazon Simple Storage Service (Amazon S3) bucket, or an Amazon Kinesis Data Firehose.
 *
 * The name that you give the destination must start with `aws-waf-logs-`. Depending on the type of destination, you might need to configure additional settings or permissions.
 *
 * For configuration requirements and pricing information for each destination type, see
 * Logging web ACL traffic
 * in the *WAF Developer Guide*.
 *
 * - Associate your logging destination to your web ACL using a
 * `PutLoggingConfiguration` request.
 *
 * When you successfully enable logging using a `PutLoggingConfiguration`
 * request, WAF creates an additional role or policy that is required to write
 * logs to the logging destination. For an Amazon CloudWatch Logs log group, WAF creates a resource policy on the log group.
 * For an Amazon S3 bucket, WAF creates a bucket policy. For an Amazon Kinesis Data Firehose, WAF creates a service-linked role.
 *
 * For additional information about web ACL logging, see
 * Logging web ACL traffic information
 * in the *WAF Developer Guide*.
 */
export const putLoggingConfiguration: API.OperationMethod<
  PutLoggingConfigurationRequest,
  PutLoggingConfigurationResponse,
  PutLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LoggingConfiguration: {
        ResourceArn: 0,
        LogDestinationConfigs: 0,
        RedactedFields: D.list(i_FieldToMatch),
        ManagedByFirewallManager: 0,
        LoggingFilter: {
          Filters: D.list({
            Behavior: 0,
            Requirement: 0,
            Conditions: D.list({
              ActionCondition: { Action: 0 },
              LabelNameCondition: { LabelName: 0 },
            }),
          }),
          DefaultBehavior: 0,
        },
        LogType: 0,
        LogScope: 0,
      },
    },
  },
  errors: [
    WAFFeatureNotIncludedInPricingPlanException,
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFLogDestinationPermissionIssueException,
    WAFNonexistentItemException,
    WAFOptimisticLockException,
    WAFServiceLinkedRoleErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLoggingConfiguration",
})) as any;

export type PutManagedRuleSetVersionsError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | WAFOptimisticLockException
  | CommonErrors;
/**
 * Defines the versions of your managed rule set that you are offering to the customers.
 * Customers see your offerings as managed rule groups with versioning.
 *
 * This is intended for use only by vendors of managed rule sets. Vendors are Amazon Web Services and Amazon Web Services Marketplace sellers.
 *
 * Vendors, you can use the managed rule set APIs to provide controlled rollout of your versioned managed rule group offerings for your customers. The APIs are `ListManagedRuleSets`, `GetManagedRuleSet`, `PutManagedRuleSetVersions`, and `UpdateManagedRuleSetVersionExpiryDate`.
 *
 * Customers retrieve their managed rule group list by calling ListAvailableManagedRuleGroups. The name that you provide here for your
 * managed rule set is the name the customer sees for the corresponding managed rule group.
 * Customers can retrieve the available versions for a managed rule group by calling ListAvailableManagedRuleGroupVersions. You provide a rule group
 * specification for each version. For each managed rule set, you must specify a version that
 * you recommend using.
 *
 * To initiate the expiration of a managed rule group version, use UpdateManagedRuleSetVersionExpiryDate.
 */
export const putManagedRuleSetVersions: API.OperationMethod<
  PutManagedRuleSetVersionsRequest,
  PutManagedRuleSetVersionsResponse,
  PutManagedRuleSetVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Scope: 0,
      Id: 0,
      LockToken: 0,
      RecommendedVersion: 0,
      VersionsToPublish: D.map({
        AssociatedRuleGroupArn: 0,
        ForecastedLifetime: 0,
      }),
    },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
    WAFOptimisticLockException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutManagedRuleSetVersions",
})) as any;

export type PutPermissionPolicyError =
  | WAFInternalErrorException
  | WAFInvalidParameterException
  | WAFInvalidPermissionPolicyException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * Use this to share a rule group with other accounts.
 *
 * This action attaches an IAM policy to the specified resource. You must be the owner of the rule group to perform this operation.
 *
 * This action is subject to the following restrictions:
 *
 * - You can attach only one policy with each `PutPermissionPolicy`
 * request.
 *
 * - The ARN in the request must be a valid WAF RuleGroup ARN and the
 * rule group must exist in the same Region.
 *
 * - The user making the request must be the owner of the rule group.
 *
 * If a rule group has been shared with your account, you can access it through the call `GetRuleGroup`,
 * and you can reference it in `CreateWebACL` and `UpdateWebACL`.
 * Rule groups that are shared with you don't appear in your WAF console rule groups listing.
 */
export const putPermissionPolicy: API.OperationMethod<
  PutPermissionPolicyRequest,
  PutPermissionPolicyResponse,
  PutPermissionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, Policy: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidParameterException,
    WAFInvalidPermissionPolicyException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutPermissionPolicy",
})) as any;

export type TagResourceError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFNonexistentItemException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * Associates tags with the specified Amazon Web Services resource. Tags are key:value pairs that you can
 * use to categorize and manage your resources, for purposes like billing. For example, you
 * might set the tag key to "customer" and the value to the customer name or ID. You can
 * specify one or more tags to add to each Amazon Web Services resource, up to 50 tags for a
 * resource.
 *
 * You can tag the Amazon Web Services resources that you manage through WAF: web ACLs, rule
 * groups, IP sets, and regex pattern sets. You can't manage or view tags through the WAF
 * console.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, Tags: D.list(i_Tag) } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFNonexistentItemException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * Disassociates tags from an Amazon Web Services resource. Tags are key:value pairs that you can
 * associate with Amazon Web Services resources. For example, the tag key might be "customer" and the tag
 * value might be "companyA." You can specify one or more tags to add to each container. You
 * can add up to 50 tags to each Amazon Web Services resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, TagKeys: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateIPSetError =
  | WAFDuplicateItemException
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFNonexistentItemException
  | WAFOptimisticLockException
  | CommonErrors;
/**
 * Updates the specified IPSet.
 *
 * This operation completely replaces the mutable specifications that you already have for the IP set with the ones that you provide to this call.
 *
 * To modify an IP set, do the following:
 *
 * - Retrieve it by calling GetIPSet
 *
 * - Update its settings as needed
 *
 * - Provide the complete IP set specification to this call
 *
 * **Temporary inconsistencies during updates**
 *
 * When you create or change a web ACL or other WAF resources, the changes take a small amount of time to propagate to all areas where the resources are stored. The propagation time can be from a few seconds to a number of minutes.
 *
 * The following are examples of the temporary inconsistencies that you might notice during change propagation:
 *
 * - After you create a web ACL, if you try to associate it with a resource, you might get an exception indicating that the web ACL is unavailable.
 *
 * - After you add a rule group to a web ACL, the new rule group rules might be in effect in one area where the web ACL is used and not in another.
 *
 * - After you change a rule action setting, you might see the old action in some places and the new action in others.
 *
 * - After you add an IP address to an IP set that is in use in a blocking rule, the new address might be blocked in one area while still allowed in another.
 */
export const updateIPSet: API.OperationMethod<
  UpdateIPSetRequest,
  UpdateIPSetResponse,
  UpdateIPSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Scope: 0,
      Id: 0,
      Description: 0,
      Addresses: 0,
      LockToken: 0,
    },
  },
  errors: [
    WAFDuplicateItemException,
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFNonexistentItemException,
    WAFOptimisticLockException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIPSet",
})) as any;

export type UpdateManagedRuleSetVersionExpiryDateError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | WAFOptimisticLockException
  | CommonErrors;
/**
 * Updates the expiration information for your managed rule set. Use this to initiate the
 * expiration of a managed rule group version. After you initiate expiration for a version,
 * WAF excludes it from the response to ListAvailableManagedRuleGroupVersions for the managed rule group.
 *
 * This is intended for use only by vendors of managed rule sets. Vendors are Amazon Web Services and Amazon Web Services Marketplace sellers.
 *
 * Vendors, you can use the managed rule set APIs to provide controlled rollout of your versioned managed rule group offerings for your customers. The APIs are `ListManagedRuleSets`, `GetManagedRuleSet`, `PutManagedRuleSetVersions`, and `UpdateManagedRuleSetVersionExpiryDate`.
 */
export const updateManagedRuleSetVersionExpiryDate: API.OperationMethod<
  UpdateManagedRuleSetVersionExpiryDateRequest,
  UpdateManagedRuleSetVersionExpiryDateResponse,
  UpdateManagedRuleSetVersionExpiryDateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Scope: 0,
      Id: 0,
      LockToken: 0,
      VersionToExpire: 0,
      ExpiryTimestamp: 0,
    },
    output: { ExpiryTimestamp: D.ts },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
    WAFOptimisticLockException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateManagedRuleSetVersionExpiryDate",
})) as any;

export type UpdateRegexPatternSetError =
  | WAFDuplicateItemException
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFNonexistentItemException
  | WAFOptimisticLockException
  | CommonErrors;
/**
 * Updates the specified RegexPatternSet.
 *
 * This operation completely replaces the mutable specifications that you already have for the regex pattern set with the ones that you provide to this call.
 *
 * To modify a regex pattern set, do the following:
 *
 * - Retrieve it by calling GetRegexPatternSet
 *
 * - Update its settings as needed
 *
 * - Provide the complete regex pattern set specification to this call
 *
 * **Temporary inconsistencies during updates**
 *
 * When you create or change a web ACL or other WAF resources, the changes take a small amount of time to propagate to all areas where the resources are stored. The propagation time can be from a few seconds to a number of minutes.
 *
 * The following are examples of the temporary inconsistencies that you might notice during change propagation:
 *
 * - After you create a web ACL, if you try to associate it with a resource, you might get an exception indicating that the web ACL is unavailable.
 *
 * - After you add a rule group to a web ACL, the new rule group rules might be in effect in one area where the web ACL is used and not in another.
 *
 * - After you change a rule action setting, you might see the old action in some places and the new action in others.
 *
 * - After you add an IP address to an IP set that is in use in a blocking rule, the new address might be blocked in one area while still allowed in another.
 */
export const updateRegexPatternSet: API.OperationMethod<
  UpdateRegexPatternSetRequest,
  UpdateRegexPatternSetResponse,
  UpdateRegexPatternSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Scope: 0,
      Id: 0,
      Description: 0,
      RegularExpressionList: D.list(i_Regex),
      LockToken: 0,
    },
  },
  errors: [
    WAFDuplicateItemException,
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFNonexistentItemException,
    WAFOptimisticLockException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRegexPatternSet",
})) as any;

export type UpdateRuleGroupError =
  | WAFConfigurationWarningException
  | WAFDuplicateItemException
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFNonexistentItemException
  | WAFOptimisticLockException
  | WAFSubscriptionNotFoundException
  | WAFUnavailableEntityException
  | CommonErrors;
/**
 * Updates the specified RuleGroup.
 *
 * This operation completely replaces the mutable specifications that you already have for the rule group with the ones that you provide to this call.
 *
 * To modify a rule group, do the following:
 *
 * - Retrieve it by calling GetRuleGroup
 *
 * - Update its settings as needed
 *
 * - Provide the complete rule group specification to this call
 *
 * A rule group defines a collection of rules to inspect and control web requests that you can use in a WebACL. When you create a rule group, you define an immutable capacity limit. If you update a rule group, you must stay within the capacity. This allows others to reuse the rule group with confidence in its capacity requirements.
 *
 * **Temporary inconsistencies during updates**
 *
 * When you create or change a web ACL or other WAF resources, the changes take a small amount of time to propagate to all areas where the resources are stored. The propagation time can be from a few seconds to a number of minutes.
 *
 * The following are examples of the temporary inconsistencies that you might notice during change propagation:
 *
 * - After you create a web ACL, if you try to associate it with a resource, you might get an exception indicating that the web ACL is unavailable.
 *
 * - After you add a rule group to a web ACL, the new rule group rules might be in effect in one area where the web ACL is used and not in another.
 *
 * - After you change a rule action setting, you might see the old action in some places and the new action in others.
 *
 * - After you add an IP address to an IP set that is in use in a blocking rule, the new address might be blocked in one area while still allowed in another.
 */
export const updateRuleGroup: API.OperationMethod<
  UpdateRuleGroupRequest,
  UpdateRuleGroupResponse,
  UpdateRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Scope: 0,
      Id: 0,
      Description: 0,
      Rules: D.list(i_Rule),
      VisibilityConfig: i_VisibilityConfig,
      LockToken: 0,
      CustomResponseBodies: D.map(i_CustomResponseBody),
      MonetizationConfig: i_MonetizationConfig,
    },
  },
  errors: [
    WAFConfigurationWarningException,
    WAFDuplicateItemException,
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFNonexistentItemException,
    WAFOptimisticLockException,
    WAFSubscriptionNotFoundException,
    WAFUnavailableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRuleGroup",
})) as any;

export type UpdateWebACLError =
  | WAFConfigurationWarningException
  | WAFDuplicateItemException
  | WAFExpiredManagedRuleGroupVersionException
  | WAFFeatureNotIncludedInPricingPlanException
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFInvalidResourceException
  | WAFLimitsExceededException
  | WAFNonexistentItemException
  | WAFOptimisticLockException
  | WAFSubscriptionNotFoundException
  | WAFUnavailableEntityException
  | CommonErrors;
/**
 * Updates the specified WebACL. While updating a web ACL, WAF provides
 * continuous coverage to the resources that you have associated with the web ACL.
 *
 * This operation completely replaces the mutable specifications that you already have for the web ACL with the ones that you provide to this call.
 *
 * To modify a web ACL, do the following:
 *
 * - Retrieve it by calling GetWebACL
 *
 * - Update its settings as needed
 *
 * - Provide the complete web ACL specification to this call
 *
 * A web ACL defines a collection of rules to use to inspect and control web requests. Each rule has a statement that defines what to look for in web requests and an action that WAF applies to requests that match the statement. In the web ACL, you assign a default action to take (allow, block) for any request that does not match any of the rules. The rules in a web ACL can be a combination of the types Rule, RuleGroup, and managed rule group. You can associate a web ACL with one or more Amazon Web Services resources to protect. The resource types include Amazon CloudFront distribution, Amazon API Gateway REST API, Application Load Balancer, AppSync GraphQL API, Amazon Cognito user pool, App Runner service, Amplify application, Amazon Web Services Verified Access instance, and Amazon Bedrock AgentCore Gateway.
 *
 * **Temporary inconsistencies during updates**
 *
 * When you create or change a web ACL or other WAF resources, the changes take a small amount of time to propagate to all areas where the resources are stored. The propagation time can be from a few seconds to a number of minutes.
 *
 * The following are examples of the temporary inconsistencies that you might notice during change propagation:
 *
 * - After you create a web ACL, if you try to associate it with a resource, you might get an exception indicating that the web ACL is unavailable.
 *
 * - After you add a rule group to a web ACL, the new rule group rules might be in effect in one area where the web ACL is used and not in another.
 *
 * - After you change a rule action setting, you might see the old action in some places and the new action in others.
 *
 * - After you add an IP address to an IP set that is in use in a blocking rule, the new address might be blocked in one area while still allowed in another.
 */
export const updateWebACL: API.OperationMethod<
  UpdateWebACLRequest,
  UpdateWebACLResponse,
  UpdateWebACLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Scope: 0,
      Id: 0,
      DefaultAction: i_DefaultAction,
      Description: 0,
      Rules: D.list(i_Rule),
      VisibilityConfig: i_VisibilityConfig,
      DataProtectionConfig: i_DataProtectionConfig,
      LockToken: 0,
      CustomResponseBodies: D.map(i_CustomResponseBody),
      CaptchaConfig: i_CaptchaConfig,
      ChallengeConfig: i_ChallengeConfig,
      TokenDomains: 0,
      AssociationConfig: i_AssociationConfig,
      OnSourceDDoSProtectionConfig: i_OnSourceDDoSProtectionConfig,
      ApplicationConfig: i_ApplicationConfig,
      MonetizationConfig: i_MonetizationConfig,
    },
  },
  errors: [
    WAFConfigurationWarningException,
    WAFDuplicateItemException,
    WAFExpiredManagedRuleGroupVersionException,
    WAFFeatureNotIncludedInPricingPlanException,
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFInvalidResourceException,
    WAFLimitsExceededException,
    WAFNonexistentItemException,
    WAFOptimisticLockException,
    WAFSubscriptionNotFoundException,
    WAFUnavailableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWebACL",
})) as any;

const i_ApplicationConfig: D.LazyStruct = () => ({
  Attributes: D.list({ Name: 0, Values: 0 }),
});
const i_AssociationConfig: D.LazyStruct = () => ({
  RequestBody: D.map({ DefaultSizeInspectionLimit: 0 }),
});
const i_CaptchaConfig: D.LazyStruct = () => ({
  ImmunityTimeProperty: i_ImmunityTimeProperty,
});
const i_ChallengeConfig: D.LazyStruct = () => ({
  ImmunityTimeProperty: i_ImmunityTimeProperty,
});
const i_CustomResponseBody: D.LazyStruct = () => ({
  ContentType: 0,
  Content: 0,
});
const i_DataProtectionConfig: D.LazyStruct = () => ({
  DataProtections: D.list({
    Field: { FieldType: 0, FieldKeys: 0 },
    Action: 0,
    ExcludeRuleMatchDetails: 0,
    ExcludeRateBasedDetails: 0,
  }),
});
const i_DefaultAction: D.LazyStruct = () => ({
  Block: i_BlockAction,
  Allow: i_AllowAction,
});
const i_FieldToMatch: D.LazyStruct = () => ({
  SingleHeader: { Name: 0 },
  SingleQueryArgument: { Name: 0 },
  AllQueryArguments: {},
  UriPath: {},
  QueryString: {},
  Body: { OversizeHandling: 0 },
  Method: {},
  JsonBody: {
    MatchPattern: { All: i_All, IncludedPaths: 0 },
    MatchScope: 0,
    InvalidFallbackBehavior: 0,
    OversizeHandling: 0,
  },
  Headers: {
    MatchPattern: { All: i_All, IncludedHeaders: 0, ExcludedHeaders: 0 },
    MatchScope: 0,
    OversizeHandling: 0,
  },
  Cookies: {
    MatchPattern: { All: i_All, IncludedCookies: 0, ExcludedCookies: 0 },
    MatchScope: 0,
    OversizeHandling: 0,
  },
  HeaderOrder: { OversizeHandling: 0 },
  JA3Fingerprint: { FallbackBehavior: 0 },
  JA4Fingerprint: { FallbackBehavior: 0 },
  UriFragment: { FallbackBehavior: 0 },
});
const i_MonetizationConfig: D.LazyStruct = () => ({
  CryptoConfig: {
    PaymentNetworks: D.list({
      Chain: 0,
      WalletAddress: 0,
      Prices: D.list({ Amount: 0, Currency: 0 }),
    }),
  },
  CurrencyMode: 0,
});
const i_MonetizationFilter: D.LazyStruct = () => ({ Name: 0, Values: 0 });
const i_OnSourceDDoSProtectionConfig: D.LazyStruct = () => ({
  ALBLowReputationMode: 0,
});
const i_Regex: D.LazyStruct = () => ({ RegexString: 0 });
const i_Rule: D.LazyStruct = () => ({
  Name: 0,
  Priority: 0,
  Statement: i_Statement,
  Action: i_RuleAction,
  OverrideAction: { Count: i_CountAction, None: {} },
  RuleLabels: D.list({ Name: 0 }),
  VisibilityConfig: i_VisibilityConfig,
  CaptchaConfig: i_CaptchaConfig,
  ChallengeConfig: i_ChallengeConfig,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_TimeWindow: D.LazyStruct = () => ({ StartTime: 0, EndTime: 0 });
const i_VisibilityConfig: D.LazyStruct = () => ({
  SampledRequestsEnabled: 0,
  CloudWatchMetricsEnabled: 0,
  MetricName: 0,
});
const o_Rule: D.LazyStruct = () => ({ Statement: o_Statement });
const o_WebACL: D.LazyStruct = () => ({
  Rules: D.list(o_Rule),
  PreProcessFirewallManagerRuleGroups: D.list(o_FirewallManagerRuleGroup),
  PostProcessFirewallManagerRuleGroups: D.list(o_FirewallManagerRuleGroup),
});
const i_All: D.LazyStruct = () => ({});
const i_AllowAction: D.LazyStruct = () => ({
  CustomRequestHandling: i_CustomRequestHandling,
});
const i_BlockAction: D.LazyStruct = () => ({
  CustomResponse: {
    ResponseCode: 0,
    CustomResponseBodyKey: 0,
    ResponseHeaders: D.list(i_CustomHTTPHeader),
  },
});
const i_CountAction: D.LazyStruct = () => ({
  CustomRequestHandling: i_CustomRequestHandling,
});
const i_ImmunityTimeProperty: D.LazyStruct = () => ({ ImmunityTime: 0 });
const i_RuleAction: D.LazyStruct = () => ({
  Block: i_BlockAction,
  Allow: i_AllowAction,
  Count: i_CountAction,
  Captcha: { CustomRequestHandling: i_CustomRequestHandling },
  Challenge: { CustomRequestHandling: i_CustomRequestHandling },
  Monetize: { PriceMultiplier: 0 },
});
const i_Statement: D.LazyStruct = () => ({
  ByteMatchStatement: {
    SearchString: 0,
    FieldToMatch: i_FieldToMatch,
    TextTransformations: D.list(i_TextTransformation),
    PreParseTextTransformations: D.list(i_PreParseTextTransformation),
    PositionalConstraint: 0,
  },
  SqliMatchStatement: {
    FieldToMatch: i_FieldToMatch,
    TextTransformations: D.list(i_TextTransformation),
    PreParseTextTransformations: D.list(i_PreParseTextTransformation),
    SensitivityLevel: 0,
  },
  XssMatchStatement: {
    FieldToMatch: i_FieldToMatch,
    TextTransformations: D.list(i_TextTransformation),
    PreParseTextTransformations: D.list(i_PreParseTextTransformation),
  },
  SizeConstraintStatement: {
    FieldToMatch: i_FieldToMatch,
    ComparisonOperator: 0,
    Size: 0,
    TextTransformations: D.list(i_TextTransformation),
    PreParseTextTransformations: D.list(i_PreParseTextTransformation),
  },
  GeoMatchStatement: {
    CountryCodes: 0,
    ForwardedIPConfig: i_ForwardedIPConfig,
  },
  RuleGroupReferenceStatement: {
    ARN: 0,
    ExcludedRules: D.list(i_ExcludedRule),
    RuleActionOverrides: D.list(i_RuleActionOverride),
  },
  IPSetReferenceStatement: {
    ARN: 0,
    IPSetForwardedIPConfig: { HeaderName: 0, FallbackBehavior: 0, Position: 0 },
  },
  RegexPatternSetReferenceStatement: {
    ARN: 0,
    FieldToMatch: i_FieldToMatch,
    TextTransformations: D.list(i_TextTransformation),
    PreParseTextTransformations: D.list(i_PreParseTextTransformation),
  },
  RateBasedStatement: {
    Limit: 0,
    EvaluationWindowSec: 0,
    AggregateKeyType: 0,
    ScopeDownStatement: i_Statement,
    ForwardedIPConfig: i_ForwardedIPConfig,
    CustomKeys: D.list({
      Header: { Name: 0, TextTransformations: D.list(i_TextTransformation) },
      Cookie: { Name: 0, TextTransformations: D.list(i_TextTransformation) },
      QueryArgument: {
        Name: 0,
        TextTransformations: D.list(i_TextTransformation),
      },
      QueryString: { TextTransformations: D.list(i_TextTransformation) },
      HTTPMethod: {},
      ForwardedIP: {},
      IP: {},
      LabelNamespace: { Namespace: 0 },
      UriPath: { TextTransformations: D.list(i_TextTransformation) },
      JA3Fingerprint: { FallbackBehavior: 0 },
      JA4Fingerprint: { FallbackBehavior: 0 },
      ASN: {},
    }),
  },
  AndStatement: { Statements: D.list(i_Statement) },
  OrStatement: { Statements: D.list(i_Statement) },
  NotStatement: { Statement: i_Statement },
  ManagedRuleGroupStatement: {
    VendorName: 0,
    Name: 0,
    Version: 0,
    ExcludedRules: D.list(i_ExcludedRule),
    ScopeDownStatement: i_Statement,
    ManagedRuleGroupConfigs: D.list({
      LoginPath: 0,
      PayloadType: 0,
      UsernameField: i_UsernameField,
      PasswordField: i_PasswordField,
      AWSManagedRulesBotControlRuleSet: {
        InspectionLevel: 0,
        EnableMachineLearning: 0,
      },
      AWSManagedRulesATPRuleSet: {
        LoginPath: 0,
        RequestInspection: {
          PayloadType: 0,
          UsernameField: i_UsernameField,
          PasswordField: i_PasswordField,
        },
        ResponseInspection: i_ResponseInspection,
        EnableRegexInPath: 0,
      },
      AWSManagedRulesACFPRuleSet: {
        CreationPath: 0,
        RegistrationPagePath: 0,
        RequestInspection: {
          PayloadType: 0,
          UsernameField: i_UsernameField,
          PasswordField: i_PasswordField,
          EmailField: { Identifier: 0 },
          PhoneNumberFields: D.list({ Identifier: 0 }),
          AddressFields: D.list({ Identifier: 0 }),
        },
        ResponseInspection: i_ResponseInspection,
        EnableRegexInPath: 0,
      },
      AWSManagedRulesAntiDDoSRuleSet: {
        ClientSideActionConfig: {
          Challenge: {
            UsageOfAction: 0,
            Sensitivity: 0,
            ExemptUriRegularExpressions: D.list(i_Regex),
          },
        },
        SensitivityToBlock: 0,
      },
    }),
    RuleActionOverrides: D.list(i_RuleActionOverride),
  },
  LabelMatchStatement: { Scope: 0, Key: 0 },
  RegexMatchStatement: {
    RegexString: 0,
    FieldToMatch: i_FieldToMatch,
    TextTransformations: D.list(i_TextTransformation),
    PreParseTextTransformations: D.list(i_PreParseTextTransformation),
  },
  AsnMatchStatement: { AsnList: 0, ForwardedIPConfig: i_ForwardedIPConfig },
});
const o_FirewallManagerRuleGroup: D.LazyStruct = () => ({
  FirewallManagerStatement: {
    ManagedRuleGroupStatement: o_ManagedRuleGroupStatement,
  },
});
const o_Statement: D.LazyStruct = () => ({
  ByteMatchStatement: { SearchString: D.blob },
  RateBasedStatement: { ScopeDownStatement: o_Statement },
  AndStatement: { Statements: D.list(o_Statement) },
  OrStatement: { Statements: D.list(o_Statement) },
  NotStatement: { Statement: o_Statement },
  ManagedRuleGroupStatement: o_ManagedRuleGroupStatement,
});
const i_CustomHTTPHeader: D.LazyStruct = () => ({ Name: 0, Value: 0 });
const i_CustomRequestHandling: D.LazyStruct = () => ({
  InsertHeaders: D.list(i_CustomHTTPHeader),
});
const i_ExcludedRule: D.LazyStruct = () => ({ Name: 0 });
const i_ForwardedIPConfig: D.LazyStruct = () => ({
  HeaderName: 0,
  FallbackBehavior: 0,
});
const i_PasswordField: D.LazyStruct = () => ({ Identifier: 0 });
const i_PreParseTextTransformation: D.LazyStruct = () => ({
  Priority: 0,
  Type: 0,
});
const i_ResponseInspection: D.LazyStruct = () => ({
  StatusCode: { SuccessCodes: 0, FailureCodes: 0 },
  Header: { Name: 0, SuccessValues: 0, FailureValues: 0 },
  BodyContains: { SuccessStrings: 0, FailureStrings: 0 },
  Json: { Identifier: 0, SuccessValues: 0, FailureValues: 0 },
});
const i_RuleActionOverride: D.LazyStruct = () => ({
  Name: 0,
  ActionToUse: i_RuleAction,
});
const i_TextTransformation: D.LazyStruct = () => ({ Priority: 0, Type: 0 });
const i_UsernameField: D.LazyStruct = () => ({ Identifier: 0 });
const o_ManagedRuleGroupStatement: D.LazyStruct = () => ({
  ScopeDownStatement: o_Statement,
});
