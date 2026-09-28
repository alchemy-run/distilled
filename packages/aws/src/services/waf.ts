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
  sdkId: "WAF",
  target: "AWSWAF_20150824",
  version: "2015-08-24",
  sigv4: "waf",
  protocol: awsJson1_1Protocol,
  xmlns: "http://waf.amazonaws.com/doc/2015-08-24/",
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
    const _p0 = () => ({
      authSchemes: [
        { name: "sigv4", signingName: "waf", signingRegion: "us-east-1" },
      ],
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
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e("https://waf.amazonaws.com", _p0(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e("https://waf-fips.amazonaws.com", _p0(), {});
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://waf-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://waf-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://waf.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://waf.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class WAFBadRequestException
  extends /*@__PURE__*/ TE.TaggedError("WAFBadRequestException")<{
    readonly message?: string;
  }> {}
export class WAFDisallowedNameException
  extends /*@__PURE__*/ TE.TaggedError("WAFDisallowedNameException")<{
    readonly message?: string;
  }> {}
export class WAFEntityMigrationException
  extends /*@__PURE__*/ TE.TaggedError("WAFEntityMigrationException")<{
    readonly message?: string;
    readonly MigrationErrorType?: MigrationErrorType;
    readonly MigrationErrorReason?: string;
  }> {}
export class WAFInternalErrorException
  extends /*@__PURE__*/ TE.TaggedError("WAFInternalErrorException", [
    "ServerError",
  ])<{ readonly message?: string }> {}
export class WAFInvalidAccountException
  extends /*@__PURE__*/ TE.TaggedError("WAFInvalidAccountException")<{
    readonly message?: string;
  }> {}
export class WAFInvalidOperationException
  extends /*@__PURE__*/ TE.TaggedError("WAFInvalidOperationException")<{
    readonly message?: string;
  }> {}
export class WAFInvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError("WAFInvalidParameterException")<{
    readonly field?: ParameterExceptionField;
    readonly parameter?: string;
    readonly reason?: ParameterExceptionReason;
    readonly message?: string;
  }> {}
export class WAFInvalidPermissionPolicyException
  extends /*@__PURE__*/ TE.TaggedError("WAFInvalidPermissionPolicyException")<{
    readonly message?: string;
  }> {}
export class WAFInvalidRegexPatternException
  extends /*@__PURE__*/ TE.TaggedError("WAFInvalidRegexPatternException")<{
    readonly message?: string;
  }> {}
export class WAFLimitsExceededException
  extends /*@__PURE__*/ TE.TaggedError("WAFLimitsExceededException")<{
    readonly message?: string;
  }> {}
export class WAFNonEmptyEntityException
  extends /*@__PURE__*/ TE.TaggedError("WAFNonEmptyEntityException")<{
    readonly message?: string;
  }> {}
export class WAFNonexistentContainerException
  extends /*@__PURE__*/ TE.TaggedError("WAFNonexistentContainerException")<{
    readonly message?: string;
  }> {}
export class WAFNonexistentItemException
  extends /*@__PURE__*/ TE.TaggedError("WAFNonexistentItemException")<{
    readonly message?: string;
  }> {}
export class WAFReferencedItemException
  extends /*@__PURE__*/ TE.TaggedError("WAFReferencedItemException")<{
    readonly message?: string;
  }> {}
export class WAFServiceLinkedRoleErrorException
  extends /*@__PURE__*/ TE.TaggedError("WAFServiceLinkedRoleErrorException")<{
    readonly message?: string;
  }> {}
export class WAFStaleDataException
  extends /*@__PURE__*/ TE.TaggedError("WAFStaleDataException")<{
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
export type ResourceName = string;
export type ChangeToken = string;
export interface CreateByteMatchSetRequest {
  Name: string;
  ChangeToken: string;
}
export type ResourceId = string;
export type MatchFieldType =
  | "URI"
  | "QUERY_STRING"
  | "HEADER"
  | "METHOD"
  | "BODY"
  | "SINGLE_QUERY_ARG"
  | "ALL_QUERY_ARGS"
  | (string & {});
export type MatchFieldData = string;
export interface FieldToMatch {
  Type: MatchFieldType;
  Data?: string;
}
export type ByteMatchTargetString = Uint8Array;
export type TextTransformation =
  | "NONE"
  | "COMPRESS_WHITE_SPACE"
  | "HTML_ENTITY_DECODE"
  | "LOWERCASE"
  | "CMD_LINE"
  | "URL_DECODE"
  | (string & {});
export type PositionalConstraint =
  | "EXACTLY"
  | "STARTS_WITH"
  | "ENDS_WITH"
  | "CONTAINS"
  | "CONTAINS_WORD"
  | (string & {});
export interface ByteMatchTuple {
  FieldToMatch: FieldToMatch;
  TargetString: Uint8Array;
  TextTransformation: TextTransformation;
  PositionalConstraint: PositionalConstraint;
}
export type ByteMatchTuples = ByteMatchTuple[];
export interface ByteMatchSet {
  ByteMatchSetId: string;
  Name?: string;
  ByteMatchTuples: ByteMatchTuple[];
}
export interface CreateByteMatchSetResponse {
  ByteMatchSet?: ByteMatchSet;
  ChangeToken?: string;
}
export interface CreateGeoMatchSetRequest {
  Name: string;
  ChangeToken: string;
}
export type GeoMatchConstraintType = "Country" | (string & {});
export type GeoMatchConstraintValue =
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
  | (string & {});
export interface GeoMatchConstraint {
  Type: GeoMatchConstraintType;
  Value: GeoMatchConstraintValue;
}
export type GeoMatchConstraints = GeoMatchConstraint[];
export interface GeoMatchSet {
  GeoMatchSetId: string;
  Name?: string;
  GeoMatchConstraints: GeoMatchConstraint[];
}
export interface CreateGeoMatchSetResponse {
  GeoMatchSet?: GeoMatchSet;
  ChangeToken?: string;
}
export interface CreateIPSetRequest {
  Name: string;
  ChangeToken: string;
}
export type IPSetDescriptorType = "IPV4" | "IPV6" | (string & {});
export type IPSetDescriptorValue = string;
export interface IPSetDescriptor {
  Type: IPSetDescriptorType;
  Value: string;
}
export type IPSetDescriptors = IPSetDescriptor[];
export interface IPSet {
  IPSetId: string;
  Name?: string;
  IPSetDescriptors: IPSetDescriptor[];
}
export interface CreateIPSetResponse {
  IPSet?: IPSet;
  ChangeToken?: string;
}
export type MetricName = string;
export type RateKey = "IP" | (string & {});
export type RateLimit = number;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface CreateRateBasedRuleRequest {
  Name: string;
  MetricName: string;
  RateKey: RateKey;
  RateLimit: number;
  ChangeToken: string;
  Tags?: Tag[];
}
export type Negated = boolean;
export type PredicateType =
  | "IPMatch"
  | "ByteMatch"
  | "SqlInjectionMatch"
  | "GeoMatch"
  | "SizeConstraint"
  | "XssMatch"
  | "RegexMatch"
  | (string & {});
export interface Predicate {
  Negated: boolean;
  Type: PredicateType;
  DataId: string;
}
export type Predicates = Predicate[];
export interface RateBasedRule {
  RuleId: string;
  Name?: string;
  MetricName?: string;
  MatchPredicates: Predicate[];
  RateKey: RateKey;
  RateLimit: number;
}
export interface CreateRateBasedRuleResponse {
  Rule?: RateBasedRule;
  ChangeToken?: string;
}
export interface CreateRegexMatchSetRequest {
  Name: string;
  ChangeToken: string;
}
export interface RegexMatchTuple {
  FieldToMatch: FieldToMatch;
  TextTransformation: TextTransformation;
  RegexPatternSetId: string;
}
export type RegexMatchTuples = RegexMatchTuple[];
export interface RegexMatchSet {
  RegexMatchSetId?: string;
  Name?: string;
  RegexMatchTuples?: RegexMatchTuple[];
}
export interface CreateRegexMatchSetResponse {
  RegexMatchSet?: RegexMatchSet;
  ChangeToken?: string;
}
export interface CreateRegexPatternSetRequest {
  Name: string;
  ChangeToken: string;
}
export type RegexPatternString = string;
export type RegexPatternStrings = string[];
export interface RegexPatternSet {
  RegexPatternSetId: string;
  Name?: string;
  RegexPatternStrings: string[];
}
export interface CreateRegexPatternSetResponse {
  RegexPatternSet?: RegexPatternSet;
  ChangeToken?: string;
}
export interface CreateRuleRequest {
  Name: string;
  MetricName: string;
  ChangeToken: string;
  Tags?: Tag[];
}
export interface Rule {
  RuleId: string;
  Name?: string;
  MetricName?: string;
  Predicates: Predicate[];
}
export interface CreateRuleResponse {
  Rule?: Rule;
  ChangeToken?: string;
}
export interface CreateRuleGroupRequest {
  Name: string;
  MetricName: string;
  ChangeToken: string;
  Tags?: Tag[];
}
export interface RuleGroup {
  RuleGroupId: string;
  Name?: string;
  MetricName?: string;
}
export interface CreateRuleGroupResponse {
  RuleGroup?: RuleGroup;
  ChangeToken?: string;
}
export interface CreateSizeConstraintSetRequest {
  Name: string;
  ChangeToken: string;
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
export interface SizeConstraint {
  FieldToMatch: FieldToMatch;
  TextTransformation: TextTransformation;
  ComparisonOperator: ComparisonOperator;
  Size: number;
}
export type SizeConstraints = SizeConstraint[];
export interface SizeConstraintSet {
  SizeConstraintSetId: string;
  Name?: string;
  SizeConstraints: SizeConstraint[];
}
export interface CreateSizeConstraintSetResponse {
  SizeConstraintSet?: SizeConstraintSet;
  ChangeToken?: string;
}
export interface CreateSqlInjectionMatchSetRequest {
  Name: string;
  ChangeToken: string;
}
export interface SqlInjectionMatchTuple {
  FieldToMatch: FieldToMatch;
  TextTransformation: TextTransformation;
}
export type SqlInjectionMatchTuples = SqlInjectionMatchTuple[];
export interface SqlInjectionMatchSet {
  SqlInjectionMatchSetId: string;
  Name?: string;
  SqlInjectionMatchTuples: SqlInjectionMatchTuple[];
}
export interface CreateSqlInjectionMatchSetResponse {
  SqlInjectionMatchSet?: SqlInjectionMatchSet;
  ChangeToken?: string;
}
export type WafActionType = "BLOCK" | "ALLOW" | "COUNT" | (string & {});
export interface WafAction {
  Type: WafActionType;
}
export interface CreateWebACLRequest {
  Name: string;
  MetricName: string;
  DefaultAction: WafAction;
  ChangeToken: string;
  Tags?: Tag[];
}
export type RulePriority = number;
export type WafOverrideActionType = "NONE" | "COUNT" | (string & {});
export interface WafOverrideAction {
  Type: WafOverrideActionType;
}
export type WafRuleType = "REGULAR" | "RATE_BASED" | "GROUP" | (string & {});
export interface ExcludedRule {
  RuleId: string;
}
export type ExcludedRules = ExcludedRule[];
export interface ActivatedRule {
  Priority: number;
  RuleId: string;
  Action?: WafAction;
  OverrideAction?: WafOverrideAction;
  Type?: WafRuleType;
  ExcludedRules?: ExcludedRule[];
}
export type ActivatedRules = ActivatedRule[];
export type ResourceArn = string;
export interface WebACL {
  WebACLId: string;
  Name?: string;
  MetricName?: string;
  DefaultAction: WafAction;
  Rules: ActivatedRule[];
  WebACLArn?: string;
}
export interface CreateWebACLResponse {
  WebACL?: WebACL;
  ChangeToken?: string;
}
export type S3BucketName = string;
export type IgnoreUnsupportedType = boolean;
export interface CreateWebACLMigrationStackRequest {
  WebACLId: string;
  S3BucketName: string;
  IgnoreUnsupportedType: boolean;
}
export type S3ObjectUrl = string;
export interface CreateWebACLMigrationStackResponse {
  S3ObjectUrl: string;
}
export interface CreateXssMatchSetRequest {
  Name: string;
  ChangeToken: string;
}
export interface XssMatchTuple {
  FieldToMatch: FieldToMatch;
  TextTransformation: TextTransformation;
}
export type XssMatchTuples = XssMatchTuple[];
export interface XssMatchSet {
  XssMatchSetId: string;
  Name?: string;
  XssMatchTuples: XssMatchTuple[];
}
export interface CreateXssMatchSetResponse {
  XssMatchSet?: XssMatchSet;
  ChangeToken?: string;
}
export interface DeleteByteMatchSetRequest {
  ByteMatchSetId: string;
  ChangeToken: string;
}
export interface DeleteByteMatchSetResponse {
  ChangeToken?: string;
}
export interface DeleteGeoMatchSetRequest {
  GeoMatchSetId: string;
  ChangeToken: string;
}
export interface DeleteGeoMatchSetResponse {
  ChangeToken?: string;
}
export interface DeleteIPSetRequest {
  IPSetId: string;
  ChangeToken: string;
}
export interface DeleteIPSetResponse {
  ChangeToken?: string;
}
export interface DeleteLoggingConfigurationRequest {
  ResourceArn: string;
}
export interface DeleteLoggingConfigurationResponse {}
export interface DeletePermissionPolicyRequest {
  ResourceArn: string;
}
export interface DeletePermissionPolicyResponse {}
export interface DeleteRateBasedRuleRequest {
  RuleId: string;
  ChangeToken: string;
}
export interface DeleteRateBasedRuleResponse {
  ChangeToken?: string;
}
export interface DeleteRegexMatchSetRequest {
  RegexMatchSetId: string;
  ChangeToken: string;
}
export interface DeleteRegexMatchSetResponse {
  ChangeToken?: string;
}
export interface DeleteRegexPatternSetRequest {
  RegexPatternSetId: string;
  ChangeToken: string;
}
export interface DeleteRegexPatternSetResponse {
  ChangeToken?: string;
}
export interface DeleteRuleRequest {
  RuleId: string;
  ChangeToken: string;
}
export interface DeleteRuleResponse {
  ChangeToken?: string;
}
export interface DeleteRuleGroupRequest {
  RuleGroupId: string;
  ChangeToken: string;
}
export interface DeleteRuleGroupResponse {
  ChangeToken?: string;
}
export interface DeleteSizeConstraintSetRequest {
  SizeConstraintSetId: string;
  ChangeToken: string;
}
export interface DeleteSizeConstraintSetResponse {
  ChangeToken?: string;
}
export interface DeleteSqlInjectionMatchSetRequest {
  SqlInjectionMatchSetId: string;
  ChangeToken: string;
}
export interface DeleteSqlInjectionMatchSetResponse {
  ChangeToken?: string;
}
export interface DeleteWebACLRequest {
  WebACLId: string;
  ChangeToken: string;
}
export interface DeleteWebACLResponse {
  ChangeToken?: string;
}
export interface DeleteXssMatchSetRequest {
  XssMatchSetId: string;
  ChangeToken: string;
}
export interface DeleteXssMatchSetResponse {
  ChangeToken?: string;
}
export interface GetByteMatchSetRequest {
  ByteMatchSetId: string;
}
export interface GetByteMatchSetResponse {
  ByteMatchSet?: ByteMatchSet;
}
export interface GetChangeTokenRequest {}
export interface GetChangeTokenResponse {
  ChangeToken?: string;
}
export interface GetChangeTokenStatusRequest {
  ChangeToken: string;
}
export type ChangeTokenStatus =
  | "PROVISIONED"
  | "PENDING"
  | "INSYNC"
  | (string & {});
export interface GetChangeTokenStatusResponse {
  ChangeTokenStatus?: ChangeTokenStatus;
}
export interface GetGeoMatchSetRequest {
  GeoMatchSetId: string;
}
export interface GetGeoMatchSetResponse {
  GeoMatchSet?: GeoMatchSet;
}
export interface GetIPSetRequest {
  IPSetId: string;
}
export interface GetIPSetResponse {
  IPSet?: IPSet;
}
export interface GetLoggingConfigurationRequest {
  ResourceArn: string;
}
export type LogDestinationConfigs = string[];
export type RedactedFields = FieldToMatch[];
export interface LoggingConfiguration {
  ResourceArn: string;
  LogDestinationConfigs: string[];
  RedactedFields?: FieldToMatch[];
}
export interface GetLoggingConfigurationResponse {
  LoggingConfiguration?: LoggingConfiguration;
}
export interface GetPermissionPolicyRequest {
  ResourceArn: string;
}
export type PolicyString = string;
export interface GetPermissionPolicyResponse {
  Policy?: string;
}
export interface GetRateBasedRuleRequest {
  RuleId: string;
}
export interface GetRateBasedRuleResponse {
  Rule?: RateBasedRule;
}
export type NextMarker = string;
export interface GetRateBasedRuleManagedKeysRequest {
  RuleId: string;
  NextMarker?: string;
}
export type ManagedKey = string;
export type ManagedKeys = string[];
export interface GetRateBasedRuleManagedKeysResponse {
  ManagedKeys?: string[];
  NextMarker?: string;
}
export interface GetRegexMatchSetRequest {
  RegexMatchSetId: string;
}
export interface GetRegexMatchSetResponse {
  RegexMatchSet?: RegexMatchSet;
}
export interface GetRegexPatternSetRequest {
  RegexPatternSetId: string;
}
export interface GetRegexPatternSetResponse {
  RegexPatternSet?: RegexPatternSet;
}
export interface GetRuleRequest {
  RuleId: string;
}
export interface GetRuleResponse {
  Rule?: Rule;
}
export interface GetRuleGroupRequest {
  RuleGroupId: string;
}
export interface GetRuleGroupResponse {
  RuleGroup?: RuleGroup;
}
export interface TimeWindow {
  StartTime: Date;
  EndTime: Date;
}
export type GetSampledRequestsMaxItems = number;
export interface GetSampledRequestsRequest {
  WebAclId: string;
  RuleId: string;
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
export interface SampledHTTPRequest {
  Request: HTTPRequest;
  Weight: number;
  Timestamp?: Date;
  Action?: string;
  RuleWithinRuleGroup?: string;
}
export type SampledHTTPRequests = SampledHTTPRequest[];
export type PopulationSize = number;
export interface GetSampledRequestsResponse {
  SampledRequests?: SampledHTTPRequest[];
  PopulationSize?: number;
  TimeWindow?: TimeWindow;
}
export interface GetSizeConstraintSetRequest {
  SizeConstraintSetId: string;
}
export interface GetSizeConstraintSetResponse {
  SizeConstraintSet?: SizeConstraintSet;
}
export interface GetSqlInjectionMatchSetRequest {
  SqlInjectionMatchSetId: string;
}
export interface GetSqlInjectionMatchSetResponse {
  SqlInjectionMatchSet?: SqlInjectionMatchSet;
}
export interface GetWebACLRequest {
  WebACLId: string;
}
export interface GetWebACLResponse {
  WebACL?: WebACL;
}
export interface GetXssMatchSetRequest {
  XssMatchSetId: string;
}
export interface GetXssMatchSetResponse {
  XssMatchSet?: XssMatchSet;
}
export type PaginationLimit = number;
export interface ListActivatedRulesInRuleGroupRequest {
  RuleGroupId?: string;
  NextMarker?: string;
  Limit?: number;
}
export interface ListActivatedRulesInRuleGroupResponse {
  NextMarker?: string;
  ActivatedRules?: ActivatedRule[];
}
export interface ListByteMatchSetsRequest {
  NextMarker?: string;
  Limit?: number;
}
export interface ByteMatchSetSummary {
  ByteMatchSetId: string;
  Name: string;
}
export type ByteMatchSetSummaries = ByteMatchSetSummary[];
export interface ListByteMatchSetsResponse {
  NextMarker?: string;
  ByteMatchSets?: ByteMatchSetSummary[];
}
export interface ListGeoMatchSetsRequest {
  NextMarker?: string;
  Limit?: number;
}
export interface GeoMatchSetSummary {
  GeoMatchSetId: string;
  Name: string;
}
export type GeoMatchSetSummaries = GeoMatchSetSummary[];
export interface ListGeoMatchSetsResponse {
  NextMarker?: string;
  GeoMatchSets?: GeoMatchSetSummary[];
}
export interface ListIPSetsRequest {
  NextMarker?: string;
  Limit?: number;
}
export interface IPSetSummary {
  IPSetId: string;
  Name: string;
}
export type IPSetSummaries = IPSetSummary[];
export interface ListIPSetsResponse {
  NextMarker?: string;
  IPSets?: IPSetSummary[];
}
export interface ListLoggingConfigurationsRequest {
  NextMarker?: string;
  Limit?: number;
}
export type LoggingConfigurations = LoggingConfiguration[];
export interface ListLoggingConfigurationsResponse {
  LoggingConfigurations?: LoggingConfiguration[];
  NextMarker?: string;
}
export interface ListRateBasedRulesRequest {
  NextMarker?: string;
  Limit?: number;
}
export interface RuleSummary {
  RuleId: string;
  Name: string;
}
export type RuleSummaries = RuleSummary[];
export interface ListRateBasedRulesResponse {
  NextMarker?: string;
  Rules?: RuleSummary[];
}
export interface ListRegexMatchSetsRequest {
  NextMarker?: string;
  Limit?: number;
}
export interface RegexMatchSetSummary {
  RegexMatchSetId: string;
  Name: string;
}
export type RegexMatchSetSummaries = RegexMatchSetSummary[];
export interface ListRegexMatchSetsResponse {
  NextMarker?: string;
  RegexMatchSets?: RegexMatchSetSummary[];
}
export interface ListRegexPatternSetsRequest {
  NextMarker?: string;
  Limit?: number;
}
export interface RegexPatternSetSummary {
  RegexPatternSetId: string;
  Name: string;
}
export type RegexPatternSetSummaries = RegexPatternSetSummary[];
export interface ListRegexPatternSetsResponse {
  NextMarker?: string;
  RegexPatternSets?: RegexPatternSetSummary[];
}
export interface ListRuleGroupsRequest {
  NextMarker?: string;
  Limit?: number;
}
export interface RuleGroupSummary {
  RuleGroupId: string;
  Name: string;
}
export type RuleGroupSummaries = RuleGroupSummary[];
export interface ListRuleGroupsResponse {
  NextMarker?: string;
  RuleGroups?: RuleGroupSummary[];
}
export interface ListRulesRequest {
  NextMarker?: string;
  Limit?: number;
}
export interface ListRulesResponse {
  NextMarker?: string;
  Rules?: RuleSummary[];
}
export interface ListSizeConstraintSetsRequest {
  NextMarker?: string;
  Limit?: number;
}
export interface SizeConstraintSetSummary {
  SizeConstraintSetId: string;
  Name: string;
}
export type SizeConstraintSetSummaries = SizeConstraintSetSummary[];
export interface ListSizeConstraintSetsResponse {
  NextMarker?: string;
  SizeConstraintSets?: SizeConstraintSetSummary[];
}
export interface ListSqlInjectionMatchSetsRequest {
  NextMarker?: string;
  Limit?: number;
}
export interface SqlInjectionMatchSetSummary {
  SqlInjectionMatchSetId: string;
  Name: string;
}
export type SqlInjectionMatchSetSummaries = SqlInjectionMatchSetSummary[];
export interface ListSqlInjectionMatchSetsResponse {
  NextMarker?: string;
  SqlInjectionMatchSets?: SqlInjectionMatchSetSummary[];
}
export interface ListSubscribedRuleGroupsRequest {
  NextMarker?: string;
  Limit?: number;
}
export interface SubscribedRuleGroupSummary {
  RuleGroupId: string;
  Name: string;
  MetricName: string;
}
export type SubscribedRuleGroupSummaries = SubscribedRuleGroupSummary[];
export interface ListSubscribedRuleGroupsResponse {
  NextMarker?: string;
  RuleGroups?: SubscribedRuleGroupSummary[];
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
  NextMarker?: string;
  Limit?: number;
}
export interface WebACLSummary {
  WebACLId: string;
  Name: string;
}
export type WebACLSummaries = WebACLSummary[];
export interface ListWebACLsResponse {
  NextMarker?: string;
  WebACLs?: WebACLSummary[];
}
export interface ListXssMatchSetsRequest {
  NextMarker?: string;
  Limit?: number;
}
export interface XssMatchSetSummary {
  XssMatchSetId: string;
  Name: string;
}
export type XssMatchSetSummaries = XssMatchSetSummary[];
export interface ListXssMatchSetsResponse {
  NextMarker?: string;
  XssMatchSets?: XssMatchSetSummary[];
}
export interface PutLoggingConfigurationRequest {
  LoggingConfiguration: LoggingConfiguration;
}
export interface PutLoggingConfigurationResponse {
  LoggingConfiguration?: LoggingConfiguration;
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
export type ChangeAction = "INSERT" | "DELETE" | (string & {});
export interface ByteMatchSetUpdate {
  Action: ChangeAction;
  ByteMatchTuple: ByteMatchTuple;
}
export type ByteMatchSetUpdates = ByteMatchSetUpdate[];
export interface UpdateByteMatchSetRequest {
  ByteMatchSetId: string;
  ChangeToken: string;
  Updates: ByteMatchSetUpdate[];
}
export interface UpdateByteMatchSetResponse {
  ChangeToken?: string;
}
export interface GeoMatchSetUpdate {
  Action: ChangeAction;
  GeoMatchConstraint: GeoMatchConstraint;
}
export type GeoMatchSetUpdates = GeoMatchSetUpdate[];
export interface UpdateGeoMatchSetRequest {
  GeoMatchSetId: string;
  ChangeToken: string;
  Updates: GeoMatchSetUpdate[];
}
export interface UpdateGeoMatchSetResponse {
  ChangeToken?: string;
}
export interface IPSetUpdate {
  Action: ChangeAction;
  IPSetDescriptor: IPSetDescriptor;
}
export type IPSetUpdates = IPSetUpdate[];
export interface UpdateIPSetRequest {
  IPSetId: string;
  ChangeToken: string;
  Updates: IPSetUpdate[];
}
export interface UpdateIPSetResponse {
  ChangeToken?: string;
}
export interface RuleUpdate {
  Action: ChangeAction;
  Predicate: Predicate;
}
export type RuleUpdates = RuleUpdate[];
export interface UpdateRateBasedRuleRequest {
  RuleId: string;
  ChangeToken: string;
  Updates: RuleUpdate[];
  RateLimit: number;
}
export interface UpdateRateBasedRuleResponse {
  ChangeToken?: string;
}
export interface RegexMatchSetUpdate {
  Action: ChangeAction;
  RegexMatchTuple: RegexMatchTuple;
}
export type RegexMatchSetUpdates = RegexMatchSetUpdate[];
export interface UpdateRegexMatchSetRequest {
  RegexMatchSetId: string;
  Updates: RegexMatchSetUpdate[];
  ChangeToken: string;
}
export interface UpdateRegexMatchSetResponse {
  ChangeToken?: string;
}
export interface RegexPatternSetUpdate {
  Action: ChangeAction;
  RegexPatternString: string;
}
export type RegexPatternSetUpdates = RegexPatternSetUpdate[];
export interface UpdateRegexPatternSetRequest {
  RegexPatternSetId: string;
  Updates: RegexPatternSetUpdate[];
  ChangeToken: string;
}
export interface UpdateRegexPatternSetResponse {
  ChangeToken?: string;
}
export interface UpdateRuleRequest {
  RuleId: string;
  ChangeToken: string;
  Updates: RuleUpdate[];
}
export interface UpdateRuleResponse {
  ChangeToken?: string;
}
export interface RuleGroupUpdate {
  Action: ChangeAction;
  ActivatedRule: ActivatedRule;
}
export type RuleGroupUpdates = RuleGroupUpdate[];
export interface UpdateRuleGroupRequest {
  RuleGroupId: string;
  Updates: RuleGroupUpdate[];
  ChangeToken: string;
}
export interface UpdateRuleGroupResponse {
  ChangeToken?: string;
}
export interface SizeConstraintSetUpdate {
  Action: ChangeAction;
  SizeConstraint: SizeConstraint;
}
export type SizeConstraintSetUpdates = SizeConstraintSetUpdate[];
export interface UpdateSizeConstraintSetRequest {
  SizeConstraintSetId: string;
  ChangeToken: string;
  Updates: SizeConstraintSetUpdate[];
}
export interface UpdateSizeConstraintSetResponse {
  ChangeToken?: string;
}
export interface SqlInjectionMatchSetUpdate {
  Action: ChangeAction;
  SqlInjectionMatchTuple: SqlInjectionMatchTuple;
}
export type SqlInjectionMatchSetUpdates = SqlInjectionMatchSetUpdate[];
export interface UpdateSqlInjectionMatchSetRequest {
  SqlInjectionMatchSetId: string;
  ChangeToken: string;
  Updates: SqlInjectionMatchSetUpdate[];
}
export interface UpdateSqlInjectionMatchSetResponse {
  ChangeToken?: string;
}
export interface WebACLUpdate {
  Action: ChangeAction;
  ActivatedRule: ActivatedRule;
}
export type WebACLUpdates = WebACLUpdate[];
export interface UpdateWebACLRequest {
  WebACLId: string;
  ChangeToken: string;
  Updates?: WebACLUpdate[];
  DefaultAction?: WafAction;
}
export interface UpdateWebACLResponse {
  ChangeToken?: string;
}
export interface XssMatchSetUpdate {
  Action: ChangeAction;
  XssMatchTuple: XssMatchTuple;
}
export type XssMatchSetUpdates = XssMatchSetUpdate[];
export interface UpdateXssMatchSetRequest {
  XssMatchSetId: string;
  ChangeToken: string;
  Updates: XssMatchSetUpdate[];
}
export interface UpdateXssMatchSetResponse {
  ChangeToken?: string;
}
export type ErrorMessage = string;
export type ParameterExceptionField =
  | "CHANGE_ACTION"
  | "WAF_ACTION"
  | "WAF_OVERRIDE_ACTION"
  | "PREDICATE_TYPE"
  | "IPSET_TYPE"
  | "BYTE_MATCH_FIELD_TYPE"
  | "SQL_INJECTION_MATCH_FIELD_TYPE"
  | "BYTE_MATCH_TEXT_TRANSFORMATION"
  | "BYTE_MATCH_POSITIONAL_CONSTRAINT"
  | "SIZE_CONSTRAINT_COMPARISON_OPERATOR"
  | "GEO_MATCH_LOCATION_TYPE"
  | "GEO_MATCH_LOCATION_VALUE"
  | "RATE_KEY"
  | "RULE_TYPE"
  | "NEXT_MARKER"
  | "RESOURCE_ARN"
  | "TAGS"
  | "TAG_KEYS"
  | (string & {});
export type ParameterExceptionParameter = string;
export type ParameterExceptionReason =
  | "INVALID_OPTION"
  | "ILLEGAL_COMBINATION"
  | "ILLEGAL_ARGUMENT"
  | "INVALID_TAG_KEY"
  | (string & {});
export type MigrationErrorType =
  | "ENTITY_NOT_SUPPORTED"
  | "ENTITY_NOT_FOUND"
  | "S3_BUCKET_NO_PERMISSION"
  | "S3_BUCKET_NOT_ACCESSIBLE"
  | "S3_BUCKET_NOT_FOUND"
  | "S3_BUCKET_INVALID_REGION"
  | "S3_INTERNAL_ERROR"
  | (string & {});
export type ErrorReason = string;
export type CreateByteMatchSetError =
  | WAFDisallowedNameException
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Creates a `ByteMatchSet`. You then use UpdateByteMatchSet to identify the part of a
 * web request that you want AWS WAF to inspect, such as the values of the `User-Agent` header or the query string.
 * For example, you can create a `ByteMatchSet` that matches any requests with `User-Agent` headers
 * that contain the string `BadBot`. You can then configure AWS WAF to reject those requests.
 *
 * To create and configure a `ByteMatchSet`, perform the following steps:
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `CreateByteMatchSet` request.
 *
 * - Submit a `CreateByteMatchSet` request.
 *
 * - Use `GetChangeToken` to get the change token that you provide in the `ChangeToken` parameter of an
 * `UpdateByteMatchSet` request.
 *
 * - Submit an UpdateByteMatchSet request to specify the part of the request that you want AWS WAF to inspect
 * (for example, the header or the URI) and the value that you want AWS WAF to watch for.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const createByteMatchSet: API.OperationMethod<
  CreateByteMatchSetRequest,
  CreateByteMatchSetResponse,
  CreateByteMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, ChangeToken: 0 },
    output: { ByteMatchSet: o_ByteMatchSet },
  },
  errors: [
    WAFDisallowedNameException,
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateByteMatchSet",
})) as any;

export type CreateGeoMatchSetError =
  | WAFDisallowedNameException
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Creates an GeoMatchSet, which you use to specify which web requests you want to allow or block based on the country
 * that the requests originate from. For example, if you're receiving a lot of requests from one or more countries and you want to block the requests, you can create an `GeoMatchSet` that contains those countries and then configure AWS WAF to block the requests.
 *
 * To create and configure a `GeoMatchSet`, perform the following steps:
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `CreateGeoMatchSet` request.
 *
 * - Submit a `CreateGeoMatchSet` request.
 *
 * - Use `GetChangeToken` to get the change token that you provide in the `ChangeToken` parameter of an
 * UpdateGeoMatchSet request.
 *
 * - Submit an `UpdateGeoMatchSetSet` request to specify the countries that you want AWS WAF to watch for.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const createGeoMatchSet: API.OperationMethod<
  CreateGeoMatchSetRequest,
  CreateGeoMatchSetResponse,
  CreateGeoMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0, ChangeToken: 0 } },
  errors: [
    WAFDisallowedNameException,
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGeoMatchSet",
})) as any;

export type CreateIPSetError =
  | WAFDisallowedNameException
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Creates an IPSet, which you use to specify which web requests
 * that
 * you want to allow or block based on the IP addresses that the requests
 * originate from. For example, if you're receiving a lot of requests from one or more
 * individual IP addresses or one or more ranges of IP addresses and you want to block the
 * requests, you can create an `IPSet` that contains those IP addresses and then
 * configure AWS WAF to block the requests.
 *
 * To create and configure an `IPSet`, perform the following steps:
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `CreateIPSet` request.
 *
 * - Submit a `CreateIPSet` request.
 *
 * - Use `GetChangeToken` to get the change token that you provide in the `ChangeToken` parameter of an
 * UpdateIPSet request.
 *
 * - Submit an `UpdateIPSet` request to specify the IP addresses that you want AWS WAF to watch for.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const createIPSet: API.OperationMethod<
  CreateIPSetRequest,
  CreateIPSetResponse,
  CreateIPSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0, ChangeToken: 0 } },
  errors: [
    WAFDisallowedNameException,
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIPSet",
})) as any;

export type CreateRateBasedRuleError =
  | WAFBadRequestException
  | WAFDisallowedNameException
  | WAFInternalErrorException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFStaleDataException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Creates a RateBasedRule. The `RateBasedRule` contains a
 * `RateLimit`, which specifies the maximum number of requests that AWS WAF allows
 * from a specified IP address in a five-minute period.
 * The `RateBasedRule` also
 * contains the `IPSet` objects, `ByteMatchSet` objects, and other
 * predicates that identify the requests that you want to count or block if these requests
 * exceed the `RateLimit`.
 *
 * If you add more than one predicate to a `RateBasedRule`, a request not
 * only must exceed the `RateLimit`, but it also must match all the
 * conditions to be counted or blocked. For example, suppose you add the following to a
 * `RateBasedRule`:
 *
 * - An `IPSet` that matches the IP address `192.0.2.44/32`
 *
 * - A `ByteMatchSet` that matches `BadBot` in the
 * `User-Agent` header
 *
 * Further, you specify a `RateLimit` of 1,000.
 *
 * You then add the `RateBasedRule` to a `WebACL` and specify that
 * you want to block requests that meet the conditions in the rule. For a request to be
 * blocked, it must come from the IP address 192.0.2.44 *and* the
 * `User-Agent` header in the request must contain the value
 * `BadBot`. Further, requests that match these two conditions must be received at
 * a rate of more than 1,000 requests every five minutes. If both conditions are met and the
 * rate is exceeded, AWS WAF blocks the requests. If the rate drops below 1,000 for a
 * five-minute period, AWS WAF no longer blocks the requests.
 *
 * As a second example, suppose you want to limit requests to a particular page on your site. To do this, you could add the following to a
 * `RateBasedRule`:
 *
 * - A `ByteMatchSet` with `FieldToMatch` of `URI`
 *
 * - A `PositionalConstraint` of `STARTS_WITH`
 *
 * - A `TargetString` of `login`
 *
 * Further, you specify a `RateLimit` of 1,000.
 *
 * By adding this `RateBasedRule` to a `WebACL`, you could limit requests to your login page without affecting the rest of your site.
 *
 * To create and configure a `RateBasedRule`, perform the following
 * steps:
 *
 * - Create and update the predicates that you want to include in the rule. For more
 * information, see CreateByteMatchSet, CreateIPSet,
 * and CreateSqlInjectionMatchSet.
 *
 * - Use GetChangeToken to get the change token that you provide
 * in the `ChangeToken` parameter of a `CreateRule`
 * request.
 *
 * - Submit a `CreateRateBasedRule` request.
 *
 * - Use `GetChangeToken` to get the change token that you provide in the
 * `ChangeToken` parameter of an UpdateRule
 * request.
 *
 * - Submit an `UpdateRateBasedRule` request to specify the predicates
 * that you want to include in the rule.
 *
 * - Create and update a `WebACL` that contains the
 * `RateBasedRule`. For more information, see CreateWebACL.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests,
 * see the AWS WAF Developer
 * Guide.
 */
export const createRateBasedRule: API.OperationMethod<
  CreateRateBasedRuleRequest,
  CreateRateBasedRuleResponse,
  CreateRateBasedRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      MetricName: 0,
      RateKey: 0,
      RateLimit: 0,
      ChangeToken: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    WAFBadRequestException,
    WAFDisallowedNameException,
    WAFInternalErrorException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFStaleDataException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRateBasedRule",
})) as any;

export type CreateRegexMatchSetError =
  | WAFDisallowedNameException
  | WAFInternalErrorException
  | WAFLimitsExceededException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Creates a RegexMatchSet. You then use UpdateRegexMatchSet to identify the part of a
 * web request that you want AWS WAF to inspect, such as the values of the `User-Agent` header or the query string.
 * For example, you can create a `RegexMatchSet` that contains a `RegexMatchTuple` that looks for any requests with `User-Agent` headers
 * that match a `RegexPatternSet` with pattern `B[a@]dB[o0]t`. You can then configure AWS WAF to reject those requests.
 *
 * To create and configure a `RegexMatchSet`, perform the following steps:
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `CreateRegexMatchSet` request.
 *
 * - Submit a `CreateRegexMatchSet` request.
 *
 * - Use `GetChangeToken` to get the change token that you provide in the `ChangeToken` parameter of an
 * `UpdateRegexMatchSet` request.
 *
 * - Submit an UpdateRegexMatchSet request to specify the part of the request that you want AWS WAF to inspect
 * (for example, the header or the URI) and the value, using a `RegexPatternSet`, that you want AWS WAF to watch for.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const createRegexMatchSet: API.OperationMethod<
  CreateRegexMatchSetRequest,
  CreateRegexMatchSetResponse,
  CreateRegexMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0, ChangeToken: 0 } },
  errors: [
    WAFDisallowedNameException,
    WAFInternalErrorException,
    WAFLimitsExceededException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRegexMatchSet",
})) as any;

export type CreateRegexPatternSetError =
  | WAFDisallowedNameException
  | WAFInternalErrorException
  | WAFLimitsExceededException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Creates a `RegexPatternSet`. You then use UpdateRegexPatternSet to specify the regular expression (regex) pattern that you want AWS WAF to search for, such as `B[a@]dB[o0]t`. You can then configure AWS WAF to reject those requests.
 *
 * To create and configure a `RegexPatternSet`, perform the following steps:
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `CreateRegexPatternSet` request.
 *
 * - Submit a `CreateRegexPatternSet` request.
 *
 * - Use `GetChangeToken` to get the change token that you provide in the `ChangeToken` parameter of an
 * `UpdateRegexPatternSet` request.
 *
 * - Submit an UpdateRegexPatternSet request to specify the string that you want AWS WAF to watch for.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const createRegexPatternSet: API.OperationMethod<
  CreateRegexPatternSetRequest,
  CreateRegexPatternSetResponse,
  CreateRegexPatternSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0, ChangeToken: 0 } },
  errors: [
    WAFDisallowedNameException,
    WAFInternalErrorException,
    WAFLimitsExceededException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRegexPatternSet",
})) as any;

export type CreateRuleError =
  | WAFBadRequestException
  | WAFDisallowedNameException
  | WAFInternalErrorException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFStaleDataException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Creates a `Rule`, which contains the `IPSet` objects,
 * `ByteMatchSet` objects, and other predicates that identify the requests that
 * you want to block. If you add more than one predicate to a `Rule`, a request
 * must match all of the specifications to be allowed or blocked. For example, suppose
 * that
 * you add the following to a `Rule`:
 *
 * - An `IPSet` that matches the IP address `192.0.2.44/32`
 *
 * - A `ByteMatchSet` that matches `BadBot` in the `User-Agent` header
 *
 * You then add the `Rule` to a `WebACL` and specify that you want to blocks requests that satisfy the `Rule`.
 * For a request to be blocked, it must come from the IP address 192.0.2.44 *and* the `User-Agent` header in the request
 * must contain the value `BadBot`.
 *
 * To create and configure a `Rule`, perform the following steps:
 *
 * - Create and update the predicates that you want to include in the `Rule`. For more information, see
 * CreateByteMatchSet, CreateIPSet, and CreateSqlInjectionMatchSet.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `CreateRule` request.
 *
 * - Submit a `CreateRule` request.
 *
 * - Use `GetChangeToken` to get the change token that you provide in the `ChangeToken` parameter of an
 * UpdateRule request.
 *
 * - Submit an `UpdateRule` request to specify the predicates that you want to include in the `Rule`.
 *
 * - Create and update a `WebACL` that contains the `Rule`. For more information, see CreateWebACL.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const createRule: API.OperationMethod<
  CreateRuleRequest,
  CreateRuleResponse,
  CreateRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, MetricName: 0, ChangeToken: 0, Tags: D.list(i_Tag) },
  },
  errors: [
    WAFBadRequestException,
    WAFDisallowedNameException,
    WAFInternalErrorException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFStaleDataException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRule",
})) as any;

export type CreateRuleGroupError =
  | WAFBadRequestException
  | WAFDisallowedNameException
  | WAFInternalErrorException
  | WAFLimitsExceededException
  | WAFStaleDataException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Creates a `RuleGroup`. A rule group is a collection of predefined rules that you add to a web ACL. You use UpdateRuleGroup to add rules to the rule group.
 *
 * Rule groups are subject to the following limits:
 *
 * - Three rule groups per account. You can request an increase to this limit by contacting customer support.
 *
 * - One rule group per web ACL.
 *
 * - Ten rules per rule group.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const createRuleGroup: API.OperationMethod<
  CreateRuleGroupRequest,
  CreateRuleGroupResponse,
  CreateRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, MetricName: 0, ChangeToken: 0, Tags: D.list(i_Tag) },
  },
  errors: [
    WAFBadRequestException,
    WAFDisallowedNameException,
    WAFInternalErrorException,
    WAFLimitsExceededException,
    WAFStaleDataException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRuleGroup",
})) as any;

export type CreateSizeConstraintSetError =
  | WAFDisallowedNameException
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Creates a `SizeConstraintSet`. You then use UpdateSizeConstraintSet to identify the part of a
 * web request that you want AWS WAF to check for length, such as the length of the `User-Agent` header or the length of the query string.
 * For example, you can create a `SizeConstraintSet` that matches any requests that have a query string that is longer than 100 bytes.
 * You can then configure AWS WAF to reject those requests.
 *
 * To create and configure a `SizeConstraintSet`, perform the following steps:
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `CreateSizeConstraintSet` request.
 *
 * - Submit a `CreateSizeConstraintSet` request.
 *
 * - Use `GetChangeToken` to get the change token that you provide in the `ChangeToken` parameter of an
 * `UpdateSizeConstraintSet` request.
 *
 * - Submit an UpdateSizeConstraintSet request to specify the part of the request that you want AWS WAF to inspect
 * (for example, the header or the URI) and the value that you want AWS WAF to watch for.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const createSizeConstraintSet: API.OperationMethod<
  CreateSizeConstraintSetRequest,
  CreateSizeConstraintSetResponse,
  CreateSizeConstraintSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0, ChangeToken: 0 } },
  errors: [
    WAFDisallowedNameException,
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSizeConstraintSet",
})) as any;

export type CreateSqlInjectionMatchSetError =
  | WAFDisallowedNameException
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Creates a SqlInjectionMatchSet, which you use to allow, block, or count requests that contain snippets of SQL code in a
 * specified part of web requests. AWS WAF searches for character sequences that are likely to be malicious strings.
 *
 * To create and configure a `SqlInjectionMatchSet`, perform the following steps:
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `CreateSqlInjectionMatchSet` request.
 *
 * - Submit a `CreateSqlInjectionMatchSet` request.
 *
 * - Use `GetChangeToken` to get the change token that you provide in the `ChangeToken` parameter of an
 * UpdateSqlInjectionMatchSet request.
 *
 * - Submit an UpdateSqlInjectionMatchSet request to specify the parts of web requests in which you want to
 * allow, block, or count malicious SQL code.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const createSqlInjectionMatchSet: API.OperationMethod<
  CreateSqlInjectionMatchSetRequest,
  CreateSqlInjectionMatchSetResponse,
  CreateSqlInjectionMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0, ChangeToken: 0 } },
  errors: [
    WAFDisallowedNameException,
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSqlInjectionMatchSet",
})) as any;

export type CreateWebACLError =
  | WAFBadRequestException
  | WAFDisallowedNameException
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFStaleDataException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Creates a `WebACL`, which contains the `Rules` that identify the CloudFront web requests that you want to allow, block, or count.
 * AWS WAF evaluates `Rules` in order based on the value of `Priority` for each `Rule`.
 *
 * You also specify a default action, either `ALLOW` or `BLOCK`. If a web request doesn't match
 * any of the `Rules` in a `WebACL`, AWS WAF responds to the request with the default action.
 *
 * To create and configure a `WebACL`, perform the following steps:
 *
 * - Create and update the `ByteMatchSet` objects and other predicates that you want to include in `Rules`.
 * For more information, see CreateByteMatchSet, UpdateByteMatchSet, CreateIPSet, UpdateIPSet,
 * CreateSqlInjectionMatchSet, and UpdateSqlInjectionMatchSet.
 *
 * - Create and update the `Rules` that you want to include in the `WebACL`. For more information, see
 * CreateRule and UpdateRule.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `CreateWebACL` request.
 *
 * - Submit a `CreateWebACL` request.
 *
 * - Use `GetChangeToken` to get the change token that you provide in the `ChangeToken` parameter of an
 * UpdateWebACL request.
 *
 * - Submit an UpdateWebACL request to specify the `Rules` that you want to include in the `WebACL`,
 * to specify the default action, and to associate the `WebACL` with a CloudFront distribution.
 *
 * For more information about how to use the AWS WAF API, see the AWS WAF Developer Guide.
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
      MetricName: 0,
      DefaultAction: i_WafAction,
      ChangeToken: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    WAFBadRequestException,
    WAFDisallowedNameException,
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFStaleDataException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWebACL",
})) as any;

export type CreateWebACLMigrationStackError =
  | WAFEntityMigrationException
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * Creates an AWS CloudFormation WAFV2 template for the specified web ACL in the specified Amazon S3 bucket.
 * Then, in CloudFormation, you create a stack from the template, to create the web ACL and its resources in AWS WAFV2.
 * Use this to migrate your AWS WAF Classic web ACL to the latest version of AWS WAF.
 *
 * This is part of a larger migration procedure for web ACLs from AWS WAF Classic to the latest version of AWS WAF.
 * For the full procedure, including caveats and manual steps to complete
 * the migration and switch over to the new web ACL, see
 * Migrating your AWS WAF Classic resources to AWS WAF in the AWS WAF
 * Developer Guide.
 */
export const createWebACLMigrationStack: API.OperationMethod<
  CreateWebACLMigrationStackRequest,
  CreateWebACLMigrationStackResponse,
  CreateWebACLMigrationStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { WebACLId: 0, S3BucketName: 0, IgnoreUnsupportedType: 0 },
  },
  errors: [
    WAFEntityMigrationException,
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWebACLMigrationStack",
})) as any;

export type CreateXssMatchSetError =
  | WAFDisallowedNameException
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Creates an XssMatchSet, which you use to allow, block, or count requests that contain cross-site scripting attacks
 * in the specified part of web requests. AWS WAF searches for character sequences that are likely to be malicious strings.
 *
 * To create and configure an `XssMatchSet`, perform the following steps:
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `CreateXssMatchSet` request.
 *
 * - Submit a `CreateXssMatchSet` request.
 *
 * - Use `GetChangeToken` to get the change token that you provide in the `ChangeToken` parameter of an
 * UpdateXssMatchSet request.
 *
 * - Submit an UpdateXssMatchSet request to specify the parts of web requests in which you want to
 * allow, block, or count cross-site scripting attacks.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const createXssMatchSet: API.OperationMethod<
  CreateXssMatchSetRequest,
  CreateXssMatchSetResponse,
  CreateXssMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0, ChangeToken: 0 } },
  errors: [
    WAFDisallowedNameException,
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateXssMatchSet",
})) as any;

export type DeleteByteMatchSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonEmptyEntityException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Permanently deletes a ByteMatchSet. You can't delete a `ByteMatchSet` if it's still used in any `Rules`
 * or if it still includes any ByteMatchTuple objects (any filters).
 *
 * If you just want to remove a `ByteMatchSet` from a `Rule`, use UpdateRule.
 *
 * To permanently delete a `ByteMatchSet`, perform the following steps:
 *
 * - Update the `ByteMatchSet` to remove filters, if any. For more information, see UpdateByteMatchSet.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `DeleteByteMatchSet` request.
 *
 * - Submit a `DeleteByteMatchSet` request.
 */
export const deleteByteMatchSet: API.OperationMethod<
  DeleteByteMatchSetRequest,
  DeleteByteMatchSetResponse,
  DeleteByteMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ByteMatchSetId: 0, ChangeToken: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonEmptyEntityException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteByteMatchSet",
})) as any;

export type DeleteGeoMatchSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonEmptyEntityException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Permanently deletes a GeoMatchSet. You can't delete a `GeoMatchSet` if it's still used in any `Rules` or
 * if it still includes any countries.
 *
 * If you just want to remove a `GeoMatchSet` from a `Rule`, use UpdateRule.
 *
 * To permanently delete a `GeoMatchSet` from AWS WAF, perform the following steps:
 *
 * - Update the `GeoMatchSet` to remove any countries. For more information, see UpdateGeoMatchSet.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `DeleteGeoMatchSet` request.
 *
 * - Submit a `DeleteGeoMatchSet` request.
 */
export const deleteGeoMatchSet: API.OperationMethod<
  DeleteGeoMatchSetRequest,
  DeleteGeoMatchSetResponse,
  DeleteGeoMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { GeoMatchSetId: 0, ChangeToken: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonEmptyEntityException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGeoMatchSet",
})) as any;

export type DeleteIPSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonEmptyEntityException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Permanently deletes an IPSet. You can't delete an `IPSet` if it's still used in any `Rules` or
 * if it still includes any IP addresses.
 *
 * If you just want to remove an `IPSet` from a `Rule`, use UpdateRule.
 *
 * To permanently delete an `IPSet` from AWS WAF, perform the following steps:
 *
 * - Update the `IPSet` to remove IP address ranges, if any. For more information, see UpdateIPSet.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `DeleteIPSet` request.
 *
 * - Submit a `DeleteIPSet` request.
 */
export const deleteIPSet: API.OperationMethod<
  DeleteIPSetRequest,
  DeleteIPSetResponse,
  DeleteIPSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { IPSetId: 0, ChangeToken: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonEmptyEntityException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIPSet",
})) as any;

export type DeleteLoggingConfigurationError =
  | WAFInternalErrorException
  | WAFNonexistentItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Permanently deletes the LoggingConfiguration from the specified web
 * ACL.
 */
export const deleteLoggingConfiguration: API.OperationMethod<
  DeleteLoggingConfigurationRequest,
  DeleteLoggingConfigurationResponse,
  DeleteLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFNonexistentItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLoggingConfiguration",
})) as any;

export type DeletePermissionPolicyError =
  | WAFInternalErrorException
  | WAFNonexistentItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Permanently deletes an IAM policy from the specified RuleGroup.
 *
 * The user making the request must be the owner of the RuleGroup.
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
    WAFNonexistentItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePermissionPolicy",
})) as any;

export type DeleteRateBasedRuleError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonEmptyEntityException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Permanently deletes a RateBasedRule. You can't delete a rule if
 * it's still used in any `WebACL` objects or if it still includes any predicates,
 * such as `ByteMatchSet` objects.
 *
 * If you just want to remove a rule from a `WebACL`, use UpdateWebACL.
 *
 * To permanently delete a `RateBasedRule` from AWS WAF, perform the following
 * steps:
 *
 * - Update the `RateBasedRule` to remove predicates, if any. For more
 * information, see UpdateRateBasedRule.
 *
 * - Use GetChangeToken to get the change token that you provide
 * in the `ChangeToken` parameter of a `DeleteRateBasedRule`
 * request.
 *
 * - Submit a `DeleteRateBasedRule` request.
 */
export const deleteRateBasedRule: API.OperationMethod<
  DeleteRateBasedRuleRequest,
  DeleteRateBasedRuleResponse,
  DeleteRateBasedRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RuleId: 0, ChangeToken: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonEmptyEntityException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRateBasedRule",
})) as any;

export type DeleteRegexMatchSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonEmptyEntityException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Permanently deletes a RegexMatchSet. You can't delete a `RegexMatchSet` if it's still used in any `Rules`
 * or if it still includes any `RegexMatchTuples` objects (any filters).
 *
 * If you just want to remove a `RegexMatchSet` from a `Rule`, use UpdateRule.
 *
 * To permanently delete a `RegexMatchSet`, perform the following steps:
 *
 * - Update the `RegexMatchSet` to remove filters, if any. For more information, see UpdateRegexMatchSet.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `DeleteRegexMatchSet` request.
 *
 * - Submit a `DeleteRegexMatchSet` request.
 */
export const deleteRegexMatchSet: API.OperationMethod<
  DeleteRegexMatchSetRequest,
  DeleteRegexMatchSetResponse,
  DeleteRegexMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RegexMatchSetId: 0, ChangeToken: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonEmptyEntityException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRegexMatchSet",
})) as any;

export type DeleteRegexPatternSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonEmptyEntityException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Permanently deletes a RegexPatternSet. You can't delete a `RegexPatternSet` if it's still used in any `RegexMatchSet`
 * or if the `RegexPatternSet` is not empty.
 */
export const deleteRegexPatternSet: API.OperationMethod<
  DeleteRegexPatternSetRequest,
  DeleteRegexPatternSetResponse,
  DeleteRegexPatternSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RegexPatternSetId: 0, ChangeToken: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonEmptyEntityException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRegexPatternSet",
})) as any;

export type DeleteRuleError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonEmptyEntityException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Permanently deletes a Rule. You can't delete a `Rule` if it's still used in any `WebACL`
 * objects or if it still includes any predicates, such as `ByteMatchSet` objects.
 *
 * If you just want to remove a `Rule` from a `WebACL`, use UpdateWebACL.
 *
 * To permanently delete a `Rule` from AWS WAF, perform the following steps:
 *
 * - Update the `Rule` to remove predicates, if any. For more information, see UpdateRule.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `DeleteRule` request.
 *
 * - Submit a `DeleteRule` request.
 */
export const deleteRule: API.OperationMethod<
  DeleteRuleRequest,
  DeleteRuleResponse,
  DeleteRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RuleId: 0, ChangeToken: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonEmptyEntityException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRule",
})) as any;

export type DeleteRuleGroupError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFNonEmptyEntityException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Permanently deletes a RuleGroup. You can't delete a `RuleGroup` if it's still used in any `WebACL`
 * objects or if it still includes any rules.
 *
 * If you just want to remove a `RuleGroup` from a `WebACL`, use UpdateWebACL.
 *
 * To permanently delete a `RuleGroup` from AWS WAF, perform the following steps:
 *
 * - Update the `RuleGroup` to remove rules, if any. For more information, see UpdateRuleGroup.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `DeleteRuleGroup` request.
 *
 * - Submit a `DeleteRuleGroup` request.
 */
export const deleteRuleGroup: API.OperationMethod<
  DeleteRuleGroupRequest,
  DeleteRuleGroupResponse,
  DeleteRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RuleGroupId: 0, ChangeToken: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFNonEmptyEntityException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRuleGroup",
})) as any;

export type DeleteSizeConstraintSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonEmptyEntityException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Permanently deletes a SizeConstraintSet. You can't delete a `SizeConstraintSet` if it's still used in any `Rules`
 * or if it still includes any SizeConstraint objects (any filters).
 *
 * If you just want to remove a `SizeConstraintSet` from a `Rule`, use UpdateRule.
 *
 * To permanently delete a `SizeConstraintSet`, perform the following steps:
 *
 * - Update the `SizeConstraintSet` to remove filters, if any. For more information, see UpdateSizeConstraintSet.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `DeleteSizeConstraintSet` request.
 *
 * - Submit a `DeleteSizeConstraintSet` request.
 */
export const deleteSizeConstraintSet: API.OperationMethod<
  DeleteSizeConstraintSetRequest,
  DeleteSizeConstraintSetResponse,
  DeleteSizeConstraintSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SizeConstraintSetId: 0, ChangeToken: 0 },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonEmptyEntityException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSizeConstraintSet",
})) as any;

export type DeleteSqlInjectionMatchSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonEmptyEntityException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Permanently deletes a SqlInjectionMatchSet. You can't delete a `SqlInjectionMatchSet` if it's
 * still used in any `Rules` or if it still contains any SqlInjectionMatchTuple objects.
 *
 * If you just want to remove a `SqlInjectionMatchSet` from a `Rule`, use UpdateRule.
 *
 * To permanently delete a `SqlInjectionMatchSet` from AWS WAF, perform the following steps:
 *
 * - Update the `SqlInjectionMatchSet` to remove filters, if any. For more information, see
 * UpdateSqlInjectionMatchSet.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `DeleteSqlInjectionMatchSet` request.
 *
 * - Submit a `DeleteSqlInjectionMatchSet` request.
 */
export const deleteSqlInjectionMatchSet: API.OperationMethod<
  DeleteSqlInjectionMatchSetRequest,
  DeleteSqlInjectionMatchSetResponse,
  DeleteSqlInjectionMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SqlInjectionMatchSetId: 0, ChangeToken: 0 },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonEmptyEntityException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSqlInjectionMatchSet",
})) as any;

export type DeleteWebACLError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonEmptyEntityException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Permanently deletes a WebACL. You can't delete a `WebACL` if it still contains any `Rules`.
 *
 * To delete a `WebACL`, perform the following steps:
 *
 * - Update the `WebACL` to remove `Rules`, if any. For more information, see UpdateWebACL.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `DeleteWebACL` request.
 *
 * - Submit a `DeleteWebACL` request.
 */
export const deleteWebACL: API.OperationMethod<
  DeleteWebACLRequest,
  DeleteWebACLResponse,
  DeleteWebACLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { WebACLId: 0, ChangeToken: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonEmptyEntityException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWebACL",
})) as any;

export type DeleteXssMatchSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonEmptyEntityException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Permanently deletes an XssMatchSet. You can't delete an `XssMatchSet` if it's
 * still used in any `Rules` or if it still contains any XssMatchTuple objects.
 *
 * If you just want to remove an `XssMatchSet` from a `Rule`, use UpdateRule.
 *
 * To permanently delete an `XssMatchSet` from AWS WAF, perform the following steps:
 *
 * - Update the `XssMatchSet` to remove filters, if any. For more information, see
 * UpdateXssMatchSet.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `DeleteXssMatchSet` request.
 *
 * - Submit a `DeleteXssMatchSet` request.
 */
export const deleteXssMatchSet: API.OperationMethod<
  DeleteXssMatchSetRequest,
  DeleteXssMatchSetResponse,
  DeleteXssMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { XssMatchSetId: 0, ChangeToken: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonEmptyEntityException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteXssMatchSet",
})) as any;

export type GetByteMatchSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the ByteMatchSet specified by `ByteMatchSetId`.
 */
export const getByteMatchSet: API.OperationMethod<
  GetByteMatchSetRequest,
  GetByteMatchSetResponse,
  GetByteMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ByteMatchSetId: 0 },
    output: { ByteMatchSet: o_ByteMatchSet },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetByteMatchSet",
})) as any;

export type GetChangeTokenError = WAFInternalErrorException | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * When you want to create, update, or delete AWS WAF objects, get a change token and include the change token in the create, update, or delete request. Change tokens ensure that your application doesn't submit conflicting requests to AWS WAF.
 *
 * Each create, update, or delete request must use a unique change token. If your application submits a `GetChangeToken` request
 * and then submits a second `GetChangeToken` request before submitting a create, update, or delete request, the second
 * `GetChangeToken` request returns the same value as the first `GetChangeToken` request.
 *
 * When you use a change token in a create, update, or delete request, the status of the change token changes to `PENDING`,
 * which indicates that AWS WAF is propagating the change to all AWS WAF servers. Use `GetChangeTokenStatus` to determine the
 * status of your change token.
 */
export const getChangeToken: API.OperationMethod<
  GetChangeTokenRequest,
  GetChangeTokenResponse,
  GetChangeTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [WAFInternalErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChangeToken",
})) as any;

export type GetChangeTokenStatusError =
  | WAFInternalErrorException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the status of a `ChangeToken` that you got by calling GetChangeToken. `ChangeTokenStatus` is
 * one of the following values:
 *
 * - `PROVISIONED`: You requested the change token by calling `GetChangeToken`, but you haven't used it yet
 * in a call to create, update, or delete an AWS WAF object.
 *
 * - `PENDING`: AWS WAF is propagating the create, update, or delete request to all AWS WAF servers.
 *
 * - `INSYNC`: Propagation is complete.
 */
export const getChangeTokenStatus: API.OperationMethod<
  GetChangeTokenStatusRequest,
  GetChangeTokenStatusResponse,
  GetChangeTokenStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ChangeToken: 0 } },
  errors: [WAFInternalErrorException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChangeTokenStatus",
})) as any;

export type GetGeoMatchSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the GeoMatchSet that is specified by `GeoMatchSetId`.
 */
export const getGeoMatchSet: API.OperationMethod<
  GetGeoMatchSetRequest,
  GetGeoMatchSetResponse,
  GetGeoMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { GeoMatchSetId: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGeoMatchSet",
})) as any;

export type GetIPSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the IPSet that is specified by `IPSetId`.
 */
export const getIPSet: API.OperationMethod<
  GetIPSetRequest,
  GetIPSetResponse,
  GetIPSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { IPSetId: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIPSet",
})) as any;

export type GetLoggingConfigurationError =
  | WAFInternalErrorException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the LoggingConfiguration for the specified web ACL.
 */
export const getLoggingConfiguration: API.OperationMethod<
  GetLoggingConfigurationRequest,
  GetLoggingConfigurationResponse,
  GetLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [WAFInternalErrorException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoggingConfiguration",
})) as any;

export type GetPermissionPolicyError =
  | WAFInternalErrorException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the IAM policy attached to the RuleGroup.
 */
export const getPermissionPolicy: API.OperationMethod<
  GetPermissionPolicyRequest,
  GetPermissionPolicyResponse,
  GetPermissionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [WAFInternalErrorException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPermissionPolicy",
})) as any;

export type GetRateBasedRuleError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the RateBasedRule that is specified by the
 * `RuleId` that you included in the `GetRateBasedRule`
 * request.
 */
export const getRateBasedRule: API.OperationMethod<
  GetRateBasedRuleRequest,
  GetRateBasedRuleResponse,
  GetRateBasedRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RuleId: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRateBasedRule",
})) as any;

export type GetRateBasedRuleManagedKeysError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of IP addresses currently being blocked by the RateBasedRule that is specified by the `RuleId`. The maximum
 * number of managed keys that will be blocked is 10,000. If more than 10,000 addresses exceed
 * the rate limit, the 10,000 addresses with the highest rates will be blocked.
 */
export const getRateBasedRuleManagedKeys: API.OperationMethod<
  GetRateBasedRuleManagedKeysRequest,
  GetRateBasedRuleManagedKeysResponse,
  GetRateBasedRuleManagedKeysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RuleId: 0, NextMarker: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRateBasedRuleManagedKeys",
})) as any;

export type GetRegexMatchSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the RegexMatchSet specified by `RegexMatchSetId`.
 */
export const getRegexMatchSet: API.OperationMethod<
  GetRegexMatchSetRequest,
  GetRegexMatchSetResponse,
  GetRegexMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RegexMatchSetId: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegexMatchSet",
})) as any;

export type GetRegexPatternSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the RegexPatternSet specified by `RegexPatternSetId`.
 */
export const getRegexPatternSet: API.OperationMethod<
  GetRegexPatternSetRequest,
  GetRegexPatternSetResponse,
  GetRegexPatternSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RegexPatternSetId: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegexPatternSet",
})) as any;

export type GetRuleError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the Rule that is specified by the `RuleId` that you included in the `GetRule` request.
 */
export const getRule: API.OperationMethod<
  GetRuleRequest,
  GetRuleResponse,
  GetRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RuleId: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRule",
})) as any;

export type GetRuleGroupError =
  | WAFInternalErrorException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the RuleGroup that is specified by the `RuleGroupId` that you included in the `GetRuleGroup` request.
 *
 * To view the rules in a rule group, use ListActivatedRulesInRuleGroup.
 */
export const getRuleGroup: API.OperationMethod<
  GetRuleGroupRequest,
  GetRuleGroupResponse,
  GetRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RuleGroupId: 0 } },
  errors: [WAFInternalErrorException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRuleGroup",
})) as any;

export type GetSampledRequestsError =
  | WAFInternalErrorException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Gets detailed information about a specified number of requests--a sample--that AWS WAF randomly selects from among the first 5,000 requests that your AWS resource received during a time range that you choose. You can specify a sample size of up to 500 requests, and you can specify any time range in the previous three hours.
 *
 * `GetSampledRequests` returns a time range, which is usually the time range that you specified. However, if your resource
 * (such as a CloudFront distribution) received 5,000 requests before the specified time range elapsed, `GetSampledRequests`
 * returns an updated time range. This new time range indicates the actual period during which AWS WAF selected the requests in the sample.
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
      WebAclId: 0,
      RuleId: 0,
      TimeWindow: { StartTime: 0, EndTime: 0 },
      MaxItems: 0,
    },
    output: {
      SampledRequests: D.list({ Timestamp: D.ts }),
      TimeWindow: { StartTime: D.ts, EndTime: D.ts },
    },
  },
  errors: [WAFInternalErrorException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSampledRequests",
})) as any;

export type GetSizeConstraintSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the SizeConstraintSet specified by `SizeConstraintSetId`.
 */
export const getSizeConstraintSet: API.OperationMethod<
  GetSizeConstraintSetRequest,
  GetSizeConstraintSetResponse,
  GetSizeConstraintSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SizeConstraintSetId: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSizeConstraintSet",
})) as any;

export type GetSqlInjectionMatchSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the SqlInjectionMatchSet that is specified by `SqlInjectionMatchSetId`.
 */
export const getSqlInjectionMatchSet: API.OperationMethod<
  GetSqlInjectionMatchSetRequest,
  GetSqlInjectionMatchSetResponse,
  GetSqlInjectionMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SqlInjectionMatchSetId: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSqlInjectionMatchSet",
})) as any;

export type GetWebACLError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the WebACL that is specified by `WebACLId`.
 */
export const getWebACL: API.OperationMethod<
  GetWebACLRequest,
  GetWebACLResponse,
  GetWebACLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { WebACLId: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWebACL",
})) as any;

export type GetXssMatchSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the XssMatchSet that is specified by `XssMatchSetId`.
 */
export const getXssMatchSet: API.OperationMethod<
  GetXssMatchSetRequest,
  GetXssMatchSetResponse,
  GetXssMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { XssMatchSetId: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetXssMatchSet",
})) as any;

export type ListActivatedRulesInRuleGroupError =
  | WAFInternalErrorException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of ActivatedRule objects.
 */
export const listActivatedRulesInRuleGroup: API.OperationMethod<
  ListActivatedRulesInRuleGroupRequest,
  ListActivatedRulesInRuleGroupResponse,
  ListActivatedRulesInRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RuleGroupId: 0, NextMarker: 0, Limit: 0 },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListActivatedRulesInRuleGroup",
})) as any;

export type ListByteMatchSetsError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of ByteMatchSetSummary objects.
 */
export const listByteMatchSets: API.OperationMethod<
  ListByteMatchSetsRequest,
  ListByteMatchSetsResponse,
  ListByteMatchSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { NextMarker: 0, Limit: 0 } },
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListByteMatchSets",
})) as any;

export type ListGeoMatchSetsError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of GeoMatchSetSummary objects in the response.
 */
export const listGeoMatchSets: API.OperationMethod<
  ListGeoMatchSetsRequest,
  ListGeoMatchSetsResponse,
  ListGeoMatchSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { NextMarker: 0, Limit: 0 } },
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGeoMatchSets",
})) as any;

export type ListIPSetsError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of IPSetSummary objects in the response.
 */
export const listIPSets: API.OperationMethod<
  ListIPSetsRequest,
  ListIPSetsResponse,
  ListIPSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { NextMarker: 0, Limit: 0 } },
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIPSets",
})) as any;

export type ListLoggingConfigurationsError =
  | WAFInternalErrorException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of LoggingConfiguration objects.
 */
export const listLoggingConfigurations: API.OperationMethod<
  ListLoggingConfigurationsRequest,
  ListLoggingConfigurationsResponse,
  ListLoggingConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { NextMarker: 0, Limit: 0 } },
  errors: [
    WAFInternalErrorException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLoggingConfigurations",
})) as any;

export type ListRateBasedRulesError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of RuleSummary objects.
 */
export const listRateBasedRules: API.OperationMethod<
  ListRateBasedRulesRequest,
  ListRateBasedRulesResponse,
  ListRateBasedRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { NextMarker: 0, Limit: 0 } },
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRateBasedRules",
})) as any;

export type ListRegexMatchSetsError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of RegexMatchSetSummary objects.
 */
export const listRegexMatchSets: API.OperationMethod<
  ListRegexMatchSetsRequest,
  ListRegexMatchSetsResponse,
  ListRegexMatchSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { NextMarker: 0, Limit: 0 } },
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRegexMatchSets",
})) as any;

export type ListRegexPatternSetsError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of RegexPatternSetSummary objects.
 */
export const listRegexPatternSets: API.OperationMethod<
  ListRegexPatternSetsRequest,
  ListRegexPatternSetsResponse,
  ListRegexPatternSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { NextMarker: 0, Limit: 0 } },
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRegexPatternSets",
})) as any;

export type ListRuleGroupsError = WAFInternalErrorException | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of RuleGroup objects.
 */
export const listRuleGroups: API.OperationMethod<
  ListRuleGroupsRequest,
  ListRuleGroupsResponse,
  ListRuleGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { NextMarker: 0, Limit: 0 } },
  errors: [WAFInternalErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRuleGroups",
})) as any;

export type ListRulesError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of RuleSummary objects.
 */
export const listRules: API.OperationMethod<
  ListRulesRequest,
  ListRulesResponse,
  ListRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { NextMarker: 0, Limit: 0 } },
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRules",
})) as any;

export type ListSizeConstraintSetsError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of SizeConstraintSetSummary objects.
 */
export const listSizeConstraintSets: API.OperationMethod<
  ListSizeConstraintSetsRequest,
  ListSizeConstraintSetsResponse,
  ListSizeConstraintSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { NextMarker: 0, Limit: 0 } },
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSizeConstraintSets",
})) as any;

export type ListSqlInjectionMatchSetsError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of SqlInjectionMatchSet objects.
 */
export const listSqlInjectionMatchSets: API.OperationMethod<
  ListSqlInjectionMatchSetsRequest,
  ListSqlInjectionMatchSetsResponse,
  ListSqlInjectionMatchSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { NextMarker: 0, Limit: 0 } },
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSqlInjectionMatchSets",
})) as any;

export type ListSubscribedRuleGroupsError =
  | WAFInternalErrorException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of RuleGroup objects that you are subscribed to.
 */
export const listSubscribedRuleGroups: API.OperationMethod<
  ListSubscribedRuleGroupsRequest,
  ListSubscribedRuleGroupsResponse,
  ListSubscribedRuleGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { NextMarker: 0, Limit: 0 } },
  errors: [WAFInternalErrorException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubscribedRuleGroups",
})) as any;

export type ListTagsForResourceError =
  | WAFBadRequestException
  | WAFInternalErrorException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Retrieves the tags associated with the specified AWS resource. Tags are key:value pairs that you can use to categorize and manage your resources, for purposes like billing. For example, you might set the tag key to "customer" and the value to the customer name or ID. You can specify one or more tags to add to each AWS resource, up to 50 tags for a resource.
 *
 * Tagging is only available through the API, SDKs, and CLI. You can't manage or view tags through the AWS WAF Classic console. You can tag the AWS resources that you manage through AWS WAF Classic: web ACLs, rule groups, and rules.
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
    WAFBadRequestException,
    WAFInternalErrorException,
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
  | WAFInvalidAccountException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of WebACLSummary objects in the response.
 */
export const listWebACLs: API.OperationMethod<
  ListWebACLsRequest,
  ListWebACLsResponse,
  ListWebACLsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { NextMarker: 0, Limit: 0 } },
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWebACLs",
})) as any;

export type ListXssMatchSetsError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of XssMatchSet objects.
 */
export const listXssMatchSets: API.OperationMethod<
  ListXssMatchSetsRequest,
  ListXssMatchSetsResponse,
  ListXssMatchSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { NextMarker: 0, Limit: 0 } },
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListXssMatchSets",
})) as any;

export type PutLoggingConfigurationError =
  | WAFInternalErrorException
  | WAFNonexistentItemException
  | WAFServiceLinkedRoleErrorException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Associates a LoggingConfiguration with a specified web ACL.
 *
 * You can access information about all traffic that AWS WAF inspects using the following
 * steps:
 *
 * - Create an Amazon Kinesis Data
 * Firehose.
 *
 * Create the data firehose with a PUT source and in the region that you are operating. However, if you are capturing logs for Amazon CloudFront, always create the firehose in US East (N. Virginia).
 *
 * Do not create the data firehose using a `Kinesis stream` as your source.
 *
 * - Associate that firehose to your web ACL using a `PutLoggingConfiguration` request.
 *
 * When you successfully enable logging using a `PutLoggingConfiguration` request, AWS WAF will create a service linked role with the necessary permissions to write logs to the Amazon Kinesis Data Firehose. For more information, see Logging Web ACL Traffic Information in the *AWS WAF Developer Guide*.
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
      },
    },
  },
  errors: [
    WAFInternalErrorException,
    WAFNonexistentItemException,
    WAFServiceLinkedRoleErrorException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLoggingConfiguration",
})) as any;

export type PutPermissionPolicyError =
  | WAFInternalErrorException
  | WAFInvalidPermissionPolicyException
  | WAFNonexistentItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Attaches an IAM policy to the specified resource. The only supported use for this action is to share a RuleGroup across accounts.
 *
 * The `PutPermissionPolicy` is subject to the following restrictions:
 *
 * - You can attach only one policy with each `PutPermissionPolicy` request.
 *
 * - The policy must include an `Effect`, `Action` and `Principal`.
 *
 * - `Effect` must specify `Allow`.
 *
 * - The `Action` in the policy must be `waf:UpdateWebACL`, `waf-regional:UpdateWebACL`, `waf:GetRuleGroup` and `waf-regional:GetRuleGroup` . Any extra or wildcard actions in the policy will be rejected.
 *
 * - The policy cannot include a `Resource` parameter.
 *
 * - The ARN in the request must be a valid WAF RuleGroup ARN and the RuleGroup must exist in the same region.
 *
 * - The user making the request must be the owner of the RuleGroup.
 *
 * - Your policy must be composed using IAM Policy version 2012-10-17.
 *
 * For more information, see IAM Policies.
 *
 * An example of a valid policy parameter is shown in the Examples section below.
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
    WAFInvalidPermissionPolicyException,
    WAFNonexistentItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutPermissionPolicy",
})) as any;

export type TagResourceError =
  | WAFBadRequestException
  | WAFInternalErrorException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFNonexistentItemException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Associates tags with the specified AWS resource. Tags are key:value pairs that you can use to categorize and manage your resources, for purposes like billing. For example, you might set the tag key to "customer" and the value to the customer name or ID. You can specify one or more tags to add to each AWS resource, up to 50 tags for a resource.
 *
 * Tagging is only available through the API, SDKs, and CLI. You can't manage or view tags through the AWS WAF Classic console. You can use this action to tag the AWS resources that you manage through AWS WAF Classic: web ACLs, rule groups, and rules.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, Tags: D.list(i_Tag) } },
  errors: [
    WAFBadRequestException,
    WAFInternalErrorException,
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
  | WAFBadRequestException
  | WAFInternalErrorException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, TagKeys: 0 } },
  errors: [
    WAFBadRequestException,
    WAFInternalErrorException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateByteMatchSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFNonexistentContainerException
  | WAFNonexistentItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Inserts or deletes ByteMatchTuple objects (filters) in a ByteMatchSet. For each `ByteMatchTuple` object,
 * you specify the following values:
 *
 * - Whether to insert or delete the object from the array. If you want to change a `ByteMatchSetUpdate` object,
 * you delete the existing object and add a new one.
 *
 * - The part of a web request that you want AWS WAF to inspect, such as a query string or the value of the `User-Agent` header.
 *
 * - The bytes (typically a string that corresponds with ASCII characters) that you want AWS WAF to look for. For more information, including how you specify
 * the values for the AWS WAF API and the AWS CLI or SDKs, see `TargetString` in the ByteMatchTuple data type.
 *
 * - Where to look, such as at the beginning or the end of a query string.
 *
 * - Whether to perform any conversions on the request, such as converting it to lowercase, before inspecting it for the specified string.
 *
 * For example, you can add a `ByteMatchSetUpdate` object that matches web requests in which `User-Agent` headers contain
 * the string `BadBot`. You can then configure AWS WAF to block those requests.
 *
 * To create and configure a `ByteMatchSet`, perform the following steps:
 *
 * - Create a `ByteMatchSet.` For more information, see CreateByteMatchSet.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of an
 * `UpdateByteMatchSet` request.
 *
 * - Submit an `UpdateByteMatchSet` request to specify the part of the request that you want AWS WAF to inspect
 * (for example, the header or the URI) and the value that you want AWS WAF to watch for.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const updateByteMatchSet: API.OperationMethod<
  UpdateByteMatchSetRequest,
  UpdateByteMatchSetResponse,
  UpdateByteMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ByteMatchSetId: 0,
      ChangeToken: 0,
      Updates: D.list({
        Action: 0,
        ByteMatchTuple: {
          FieldToMatch: i_FieldToMatch,
          TargetString: 0,
          TextTransformation: 0,
          PositionalConstraint: 0,
        },
      }),
    },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFNonexistentContainerException,
    WAFNonexistentItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateByteMatchSet",
})) as any;

export type UpdateGeoMatchSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFNonexistentContainerException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Inserts or deletes GeoMatchConstraint objects in an `GeoMatchSet`. For each `GeoMatchConstraint` object,
 * you specify the following values:
 *
 * - Whether to insert or delete the object from the array. If you want to change an `GeoMatchConstraint` object, you delete the existing object and add a new one.
 *
 * - The `Type`. The only valid value for `Type` is `Country`.
 *
 * - The `Value`, which is a two character code for the country to add to the `GeoMatchConstraint` object. Valid codes are listed in GeoMatchConstraint$Value.
 *
 * To create and configure an `GeoMatchSet`, perform the following steps:
 *
 * - Submit a CreateGeoMatchSet request.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of an
 * UpdateGeoMatchSet request.
 *
 * - Submit an `UpdateGeoMatchSet` request to specify the country that you want AWS WAF to watch for.
 *
 * When you update an `GeoMatchSet`, you specify the country that you want to add and/or the country that you want to delete.
 * If you want to change a country, you delete the existing country and add the new one.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const updateGeoMatchSet: API.OperationMethod<
  UpdateGeoMatchSetRequest,
  UpdateGeoMatchSetResponse,
  UpdateGeoMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      GeoMatchSetId: 0,
      ChangeToken: 0,
      Updates: D.list({ Action: 0, GeoMatchConstraint: { Type: 0, Value: 0 } }),
    },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFNonexistentContainerException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGeoMatchSet",
})) as any;

export type UpdateIPSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFNonexistentContainerException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Inserts or deletes IPSetDescriptor objects in an
 * `IPSet`. For each `IPSetDescriptor` object, you specify the following
 * values:
 *
 * - Whether to insert or delete the object from the array. If you want to change an
 * `IPSetDescriptor` object, you delete the existing object and add a new
 * one.
 *
 * - The IP address version, `IPv4` or `IPv6`.
 *
 * - The IP address in CIDR notation, for example, `192.0.2.0/24` (for
 * the range of IP addresses from `192.0.2.0` to `192.0.2.255`) or
 * `192.0.2.44/32` (for the individual IP address
 * `192.0.2.44`).
 *
 * AWS WAF supports IPv4 address ranges: /8 and any range between /16 through /32. AWS
 * WAF supports IPv6 address ranges: /24, /32, /48, /56, /64, and /128. For more
 * information about CIDR notation, see the Wikipedia entry Classless
 * Inter-Domain Routing.
 *
 * IPv6 addresses can be represented using any of the following formats:
 *
 * - 1111:0000:0000:0000:0000:0000:0000:0111/128
 *
 * - 1111:0:0:0:0:0:0:0111/128
 *
 * - 1111::0111/128
 *
 * - 1111::111/128
 *
 * You use an `IPSet` to specify which web requests you want to allow or
 * block based on the IP addresses that the requests originated from. For example, if you're
 * receiving a lot of requests from one or a small number of IP addresses and you want to
 * block the requests, you can create an `IPSet` that specifies those IP addresses,
 * and then configure AWS WAF to block the requests.
 *
 * To create and configure an `IPSet`, perform the following steps:
 *
 * - Submit a CreateIPSet request.
 *
 * - Use GetChangeToken to get the change token that you provide
 * in the `ChangeToken` parameter of an UpdateIPSet
 * request.
 *
 * - Submit an `UpdateIPSet` request to specify the IP addresses that you
 * want AWS WAF to watch for.
 *
 * When you update an `IPSet`, you specify the IP addresses that you want to
 * add and/or the IP addresses that you want to delete. If you want to change an IP address,
 * you delete the existing IP address and add the new one.
 *
 * You can insert a maximum of 1000 addresses in a single
 * request.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP
 * requests, see the AWS WAF
 * Developer Guide.
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
      IPSetId: 0,
      ChangeToken: 0,
      Updates: D.list({ Action: 0, IPSetDescriptor: { Type: 0, Value: 0 } }),
    },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFNonexistentContainerException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIPSet",
})) as any;

export type UpdateRateBasedRuleError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFNonexistentContainerException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Inserts or deletes Predicate objects in a rule and updates the
 * `RateLimit` in the rule.
 *
 * Each `Predicate` object identifies a predicate, such as a ByteMatchSet or an IPSet, that specifies the web requests
 * that you want to block or count. The `RateLimit` specifies the number of
 * requests every five minutes that triggers the rule.
 *
 * If you add more than one predicate to a `RateBasedRule`, a request must
 * match all the predicates and exceed the `RateLimit` to be counted or blocked.
 * For example, suppose you add the following to a `RateBasedRule`:
 *
 * - An `IPSet` that matches the IP address `192.0.2.44/32`
 *
 * - A `ByteMatchSet` that matches `BadBot` in the
 * `User-Agent` header
 *
 * Further, you specify a
 * `RateLimit` of 1,000.
 *
 * You then add the `RateBasedRule` to a `WebACL` and specify that
 * you want to block requests that satisfy the rule. For a request to be blocked, it must come
 * from the IP address 192.0.2.44 *and* the `User-Agent` header
 * in the request must contain the value `BadBot`. Further, requests that match
 * these two conditions much be received at a rate of more than 1,000 every five minutes. If
 * the rate drops below this limit, AWS WAF no longer blocks the requests.
 *
 * As a second example, suppose you want to limit requests to a particular page on your site. To do this, you could add the following to a
 * `RateBasedRule`:
 *
 * - A `ByteMatchSet` with `FieldToMatch` of `URI`
 *
 * - A `PositionalConstraint` of `STARTS_WITH`
 *
 * - A `TargetString` of `login`
 *
 * Further, you specify a `RateLimit` of 1,000.
 *
 * By adding this `RateBasedRule` to a `WebACL`, you could limit requests to your login page without affecting the rest of your site.
 */
export const updateRateBasedRule: API.OperationMethod<
  UpdateRateBasedRuleRequest,
  UpdateRateBasedRuleResponse,
  UpdateRateBasedRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      RuleId: 0,
      ChangeToken: 0,
      Updates: D.list(i_RuleUpdate),
      RateLimit: 0,
    },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFNonexistentContainerException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRateBasedRule",
})) as any;

export type UpdateRegexMatchSetError =
  | WAFDisallowedNameException
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidOperationException
  | WAFLimitsExceededException
  | WAFNonexistentContainerException
  | WAFNonexistentItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Inserts or deletes RegexMatchTuple objects (filters) in a RegexMatchSet. For each `RegexMatchSetUpdate` object,
 * you specify the following values:
 *
 * - Whether to insert or delete the object from the array. If you want to change a `RegexMatchSetUpdate` object,
 * you delete the existing object and add a new one.
 *
 * - The part of a web request that you want AWS WAF to inspectupdate, such as a query string or the value of the `User-Agent` header.
 *
 * - The identifier of the pattern (a regular expression) that you want AWS WAF to look for. For more information, see RegexPatternSet.
 *
 * - Whether to perform any conversions on the request, such as converting it to lowercase, before inspecting it for the specified string.
 *
 * For example, you can create a `RegexPatternSet` that matches any requests with `User-Agent` headers
 * that contain the string `B[a@]dB[o0]t`. You can then configure AWS WAF to reject those requests.
 *
 * To create and configure a `RegexMatchSet`, perform the following steps:
 *
 * - Create a `RegexMatchSet.` For more information, see CreateRegexMatchSet.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of an
 * `UpdateRegexMatchSet` request.
 *
 * - Submit an `UpdateRegexMatchSet` request to specify the part of the request that you want AWS WAF to inspect
 * (for example, the header or the URI) and the identifier of the `RegexPatternSet` that contain the regular expression patters you want AWS WAF to watch for.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const updateRegexMatchSet: API.OperationMethod<
  UpdateRegexMatchSetRequest,
  UpdateRegexMatchSetResponse,
  UpdateRegexMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      RegexMatchSetId: 0,
      Updates: D.list({
        Action: 0,
        RegexMatchTuple: {
          FieldToMatch: i_FieldToMatch,
          TextTransformation: 0,
          RegexPatternSetId: 0,
        },
      }),
      ChangeToken: 0,
    },
  },
  errors: [
    WAFDisallowedNameException,
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidOperationException,
    WAFLimitsExceededException,
    WAFNonexistentContainerException,
    WAFNonexistentItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRegexMatchSet",
})) as any;

export type UpdateRegexPatternSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidOperationException
  | WAFInvalidRegexPatternException
  | WAFLimitsExceededException
  | WAFNonexistentContainerException
  | WAFNonexistentItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Inserts or deletes `RegexPatternString` objects in a RegexPatternSet. For each `RegexPatternString` object,
 * you specify the following values:
 *
 * - Whether to insert or delete the `RegexPatternString`.
 *
 * - The regular expression pattern that you want to insert or delete. For more information, see RegexPatternSet.
 *
 * For example, you can create a `RegexPatternString` such as `B[a@]dB[o0]t`. AWS WAF will match this `RegexPatternString` to:
 *
 * - BadBot
 *
 * - BadB0t
 *
 * - B@dBot
 *
 * - B@dB0t
 *
 * To create and configure a `RegexPatternSet`, perform the following steps:
 *
 * - Create a `RegexPatternSet.` For more information, see CreateRegexPatternSet.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of an
 * `UpdateRegexPatternSet` request.
 *
 * - Submit an `UpdateRegexPatternSet` request to specify the regular expression pattern that you want AWS WAF to watch for.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
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
      RegexPatternSetId: 0,
      Updates: D.list({ Action: 0, RegexPatternString: 0 }),
      ChangeToken: 0,
    },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidOperationException,
    WAFInvalidRegexPatternException,
    WAFLimitsExceededException,
    WAFNonexistentContainerException,
    WAFNonexistentItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRegexPatternSet",
})) as any;

export type UpdateRuleError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFNonexistentContainerException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Inserts or deletes Predicate objects in a `Rule`. Each
 * `Predicate` object identifies a predicate, such as a ByteMatchSet or an IPSet, that specifies the web requests
 * that you want to allow, block, or count. If you add more than one predicate to a
 * `Rule`, a request must match all of the specifications to be allowed,
 * blocked, or counted. For example, suppose
 * that
 * you add the following to a `Rule`:
 *
 * - A `ByteMatchSet` that matches the value `BadBot` in the `User-Agent` header
 *
 * - An `IPSet` that matches the IP address `192.0.2.44`
 *
 * You then add the `Rule` to a `WebACL` and specify that you want to block requests that satisfy the `Rule`.
 * For a request to be blocked, the `User-Agent` header in the request must contain the value `BadBot`
 * *and* the request must originate from the IP address 192.0.2.44.
 *
 * To create and configure a `Rule`, perform the following steps:
 *
 * - Create and update the predicates that you want to include in the `Rule`.
 *
 * - Create the `Rule`. See CreateRule.
 *
 * - Use `GetChangeToken` to get the change token that you provide in the `ChangeToken` parameter of an
 * UpdateRule request.
 *
 * - Submit an `UpdateRule` request to add predicates to the `Rule`.
 *
 * - Create and update a `WebACL` that contains the `Rule`. See CreateWebACL.
 *
 * If you want to replace one `ByteMatchSet` or `IPSet` with another, you delete the existing one and
 * add the new one.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const updateRule: API.OperationMethod<
  UpdateRuleRequest,
  UpdateRuleResponse,
  UpdateRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RuleId: 0, ChangeToken: 0, Updates: D.list(i_RuleUpdate) },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFNonexistentContainerException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRule",
})) as any;

export type UpdateRuleGroupError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFNonexistentContainerException
  | WAFNonexistentItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Inserts or deletes ActivatedRule objects in a `RuleGroup`.
 *
 * You can only insert `REGULAR` rules into a rule group.
 *
 * You can have a maximum of ten rules per rule group.
 *
 * To create and configure a `RuleGroup`, perform the following steps:
 *
 * - Create and update the `Rules` that you want to include in the `RuleGroup`. See CreateRule.
 *
 * - Use `GetChangeToken` to get the change token that you provide in the `ChangeToken` parameter of an
 * UpdateRuleGroup request.
 *
 * - Submit an `UpdateRuleGroup` request to add `Rules` to the `RuleGroup`.
 *
 * - Create and update a `WebACL` that contains the `RuleGroup`. See CreateWebACL.
 *
 * If you want to replace one `Rule` with another, you delete the existing one and
 * add the new one.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
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
      RuleGroupId: 0,
      Updates: D.list({ Action: 0, ActivatedRule: i_ActivatedRule }),
      ChangeToken: 0,
    },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFNonexistentContainerException,
    WAFNonexistentItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRuleGroup",
})) as any;

export type UpdateSizeConstraintSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFNonexistentContainerException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Inserts or deletes SizeConstraint objects (filters) in a SizeConstraintSet. For each `SizeConstraint` object,
 * you specify the following values:
 *
 * - Whether to insert or delete the object from the array. If you want to change a `SizeConstraintSetUpdate` object,
 * you delete the existing object and add a new one.
 *
 * - The part of a web request that you want AWS WAF to evaluate, such as the length of a query string or the length of the
 * `User-Agent` header.
 *
 * - Whether to perform any transformations on the request, such as converting it to lowercase, before checking its length.
 * Note that transformations of the request body are not supported because the AWS resource forwards only the first `8192` bytes
 * of your request to AWS WAF.
 *
 * You can only specify a single type of TextTransformation.
 *
 * - A `ComparisonOperator` used for evaluating the selected part of the request against the specified `Size`, such as
 * equals, greater than, less than, and so on.
 *
 * - The length, in bytes, that you want AWS WAF to watch for in selected part of the request. The length is computed after applying the transformation.
 *
 * For example, you can add a `SizeConstraintSetUpdate` object that matches web requests in which the length of the
 * `User-Agent` header is greater than 100 bytes. You can then configure AWS WAF to block those requests.
 *
 * To create and configure a `SizeConstraintSet`, perform the following steps:
 *
 * - Create a `SizeConstraintSet.` For more information, see CreateSizeConstraintSet.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of an
 * `UpdateSizeConstraintSet` request.
 *
 * - Submit an `UpdateSizeConstraintSet` request to specify the part of the request that you want AWS WAF to inspect
 * (for example, the header or the URI) and the value that you want AWS WAF to watch for.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const updateSizeConstraintSet: API.OperationMethod<
  UpdateSizeConstraintSetRequest,
  UpdateSizeConstraintSetResponse,
  UpdateSizeConstraintSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SizeConstraintSetId: 0,
      ChangeToken: 0,
      Updates: D.list({
        Action: 0,
        SizeConstraint: {
          FieldToMatch: i_FieldToMatch,
          TextTransformation: 0,
          ComparisonOperator: 0,
          Size: 0,
        },
      }),
    },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFNonexistentContainerException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSizeConstraintSet",
})) as any;

export type UpdateSqlInjectionMatchSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFNonexistentContainerException
  | WAFNonexistentItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Inserts or deletes SqlInjectionMatchTuple objects (filters) in a SqlInjectionMatchSet.
 * For each `SqlInjectionMatchTuple` object, you specify the following values:
 *
 * - `Action`: Whether to insert the object into or delete the object from the array. To change a
 * `SqlInjectionMatchTuple`, you delete the existing object and add a new one.
 *
 * - `FieldToMatch`: The part of web requests that you want AWS WAF to inspect and, if you want AWS WAF to inspect a header or custom query parameter,
 * the name of the header or parameter.
 *
 * - `TextTransformation`: Which text transformation, if any, to perform on the web request before
 * inspecting the request for snippets of malicious SQL code.
 *
 * You can only specify a single type of TextTransformation.
 *
 * You use `SqlInjectionMatchSet` objects to specify which CloudFront
 * requests that
 * you want to allow, block, or count. For example, if you're receiving
 * requests that contain snippets of SQL code in the query string and you want to block the
 * requests, you can create a `SqlInjectionMatchSet` with the applicable settings,
 * and then configure AWS WAF to block the requests.
 *
 * To create and configure a `SqlInjectionMatchSet`, perform the following steps:
 *
 * - Submit a CreateSqlInjectionMatchSet request.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of an
 * UpdateIPSet request.
 *
 * - Submit an `UpdateSqlInjectionMatchSet` request to specify the parts of web requests that you want AWS WAF to
 * inspect for snippets of SQL code.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const updateSqlInjectionMatchSet: API.OperationMethod<
  UpdateSqlInjectionMatchSetRequest,
  UpdateSqlInjectionMatchSetResponse,
  UpdateSqlInjectionMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SqlInjectionMatchSetId: 0,
      ChangeToken: 0,
      Updates: D.list({
        Action: 0,
        SqlInjectionMatchTuple: {
          FieldToMatch: i_FieldToMatch,
          TextTransformation: 0,
        },
      }),
    },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFNonexistentContainerException,
    WAFNonexistentItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSqlInjectionMatchSet",
})) as any;

export type UpdateWebACLError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFNonexistentContainerException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | WAFSubscriptionNotFoundException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Inserts or deletes ActivatedRule objects in a `WebACL`. Each `Rule` identifies
 * web requests that you want to allow, block, or count. When you update a `WebACL`, you specify the following values:
 *
 * - A default action for the `WebACL`, either `ALLOW` or `BLOCK`.
 * AWS WAF performs the default action if a request doesn't match the criteria in any of the `Rules` in a `WebACL`.
 *
 * - The `Rules` that you want to add
 * or
 * delete. If you want to replace one `Rule` with another, you delete the
 * existing `Rule` and add the new one.
 *
 * - For each `Rule`, whether you want AWS WAF to allow requests, block requests, or count requests that match
 * the conditions in the `Rule`.
 *
 * - The order in which you want AWS WAF to evaluate the `Rules` in a
 * `WebACL`. If you add more than one `Rule` to a
 * `WebACL`, AWS WAF evaluates each request against the `Rules`
 * in order based on the value of `Priority`. (The `Rule` that has
 * the lowest value for `Priority` is evaluated first.) When a web request
 * matches all
 * the
 * predicates (such as `ByteMatchSets` and `IPSets`) in a
 * `Rule`, AWS WAF immediately takes the corresponding action, allow or
 * block, and doesn't evaluate the request against the remaining `Rules` in
 * the `WebACL`, if any.
 *
 * To create and configure a `WebACL`, perform the following steps:
 *
 * - Create and update the predicates that you want to include in `Rules`.
 * For more information, see CreateByteMatchSet, UpdateByteMatchSet, CreateIPSet, UpdateIPSet,
 * CreateSqlInjectionMatchSet, and UpdateSqlInjectionMatchSet.
 *
 * - Create and update the `Rules` that you want to include in the `WebACL`. For more information, see
 * CreateRule and UpdateRule.
 *
 * - Create a `WebACL`. See CreateWebACL.
 *
 * - Use `GetChangeToken` to get the change token that you provide in the `ChangeToken` parameter of an
 * UpdateWebACL request.
 *
 * - Submit an `UpdateWebACL` request to specify the `Rules`
 * that you want to include in the `WebACL`, to specify the default action,
 * and to associate the `WebACL` with a CloudFront distribution.
 *
 * The `ActivatedRule` can be a rule group. If you specify a rule group
 * as your
 * `ActivatedRule`
 * ,
 * you can exclude specific rules from that rule group.
 *
 * If you already have a rule group associated with a web ACL and want to submit
 * an `UpdateWebACL` request to exclude certain rules from that rule group,
 * you must first remove the rule group from the web ACL, the re-insert it again,
 * specifying the excluded rules.
 * For details,
 * see
 * ActivatedRule$ExcludedRules
 * .
 *
 * Be aware that if you try to add a RATE_BASED rule to a web ACL without setting the rule type when first creating the rule, the UpdateWebACL request will fail because the request tries to add a REGULAR rule (the default rule type) with the specified ID, which does not exist.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the AWS WAF Developer Guide.
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
      WebACLId: 0,
      ChangeToken: 0,
      Updates: D.list({ Action: 0, ActivatedRule: i_ActivatedRule }),
      DefaultAction: i_WafAction,
    },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFNonexistentContainerException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
    WAFSubscriptionNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWebACL",
})) as any;

export type UpdateXssMatchSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFNonexistentContainerException
  | WAFNonexistentItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Inserts or deletes XssMatchTuple objects (filters) in an XssMatchSet.
 * For each `XssMatchTuple` object, you specify the following values:
 *
 * - `Action`: Whether to insert the object into or delete the object from the
 * array. To change an
 * `XssMatchTuple`, you delete the existing object and add a new
 * one.
 *
 * - `FieldToMatch`: The part of web requests that you want AWS WAF to inspect and, if you want AWS WAF to inspect a header or custom query parameter,
 * the name of the header or parameter.
 *
 * - `TextTransformation`: Which text transformation, if any, to perform on the web request before
 * inspecting the request for cross-site scripting attacks.
 *
 * You can only specify a single type of TextTransformation.
 *
 * You use `XssMatchSet` objects to specify which CloudFront requests
 * that
 * you want to allow, block, or count. For example, if you're receiving
 * requests that contain cross-site scripting attacks in the request body and you want to
 * block the requests, you can create an `XssMatchSet` with the applicable
 * settings, and then configure AWS WAF to block the requests.
 *
 * To create and configure an `XssMatchSet`, perform the following steps:
 *
 * - Submit a CreateXssMatchSet request.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of an
 * UpdateIPSet request.
 *
 * - Submit an `UpdateXssMatchSet` request to specify the parts of web requests that you want AWS WAF to
 * inspect for cross-site scripting attacks.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const updateXssMatchSet: API.OperationMethod<
  UpdateXssMatchSetRequest,
  UpdateXssMatchSetResponse,
  UpdateXssMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      XssMatchSetId: 0,
      ChangeToken: 0,
      Updates: D.list({
        Action: 0,
        XssMatchTuple: { FieldToMatch: i_FieldToMatch, TextTransformation: 0 },
      }),
    },
  },
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFNonexistentContainerException,
    WAFNonexistentItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateXssMatchSet",
})) as any;

const i_ActivatedRule: D.LazyStruct = () => ({
  Priority: 0,
  RuleId: 0,
  Action: i_WafAction,
  OverrideAction: { Type: 0 },
  Type: 0,
  ExcludedRules: D.list({ RuleId: 0 }),
});
const i_FieldToMatch: D.LazyStruct = () => ({ Type: 0, Data: 0 });
const i_RuleUpdate: D.LazyStruct = () => ({
  Action: 0,
  Predicate: { Negated: 0, Type: 0, DataId: 0 },
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_WafAction: D.LazyStruct = () => ({ Type: 0 });
const o_ByteMatchSet: D.LazyStruct = () => ({
  ByteMatchTuples: D.list({ TargetString: D.blob }),
});
