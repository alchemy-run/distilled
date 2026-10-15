import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const ns = /*@__PURE__*/ T.XmlNamespace("http://waf.amazonaws.com/doc/2015-08-24/");
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "WAF", serviceShapeName: "AWSWAF_20150824" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "waf" });
const ver = /*@__PURE__*/ T.ServiceVersion("2015-08-24");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
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
    const _p0 = () => ({
      authSchemes: [{ name: "sigv4", signingName: "waf", signingRegion: "us-east-1" }],
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
              return e(`https://waf-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
            }
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(`https://waf.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
            }
            return err("DualStack is enabled but this partition does not support DualStack");
          }
          return e(`https://waf.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://waf.{D}","properties":{"authSchemes":[{"name":"sigv4","signingName":"waf","signingRegion":"us-east-1"}]},"headers":{}}',
  [
    "us-gov-west-1",
    "us-gov-east-1",
    "aws-us-gov-global",
    "cn-north-1",
    "cn-northwest-1",
    "aws-cn-global",
    "us-iso-east-1",
    "us-iso-west-1",
    "aws-iso-global",
    "us-isob-east-1",
    "aws-iso-b-global",
    "aws-iso-f-global",
    "us-isof-east-1",
    "us-isof-south-1",
    "eusc-de-east-1",
  ],
);

export class WAFBadRequestException
  extends /*@__PURE__*/ S.TaggedError<WAFBadRequestException>()("WAFBadRequestException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class WAFDisallowedNameException
  extends /*@__PURE__*/ S.TaggedError<WAFDisallowedNameException>()("WAFDisallowedNameException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class WAFEntityMigrationException
  extends /*@__PURE__*/ S.TaggedError<WAFEntityMigrationException>()(
    "WAFEntityMigrationException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      MigrationErrorType: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "MigrationErrorType" }),
      ),
      MigrationErrorReason: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class WAFInternalErrorException
  extends /*@__PURE__*/ S.TaggedError<WAFInternalErrorException>()("WAFInternalErrorException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withServerError) {}
export class WAFInvalidAccountException
  extends /*@__PURE__*/ S.TaggedError<WAFInvalidAccountException>()("WAFInvalidAccountException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class WAFInvalidOperationException
  extends /*@__PURE__*/ S.TaggedError<WAFInvalidOperationException>()(
    "WAFInvalidOperationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class WAFInvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<WAFInvalidParameterException>()(
    "WAFInvalidParameterException",
    {
      field: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ParameterExceptionField" }),
      ),
      parameter: /*@__PURE__*/ S.optional(S.String),
      reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ParameterExceptionReason",
        }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
  ) {}
export class WAFInvalidPermissionPolicyException
  extends /*@__PURE__*/ S.TaggedError<WAFInvalidPermissionPolicyException>()(
    "WAFInvalidPermissionPolicyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class WAFInvalidRegexPatternException
  extends /*@__PURE__*/ S.TaggedError<WAFInvalidRegexPatternException>()(
    "WAFInvalidRegexPatternException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class WAFLimitsExceededException
  extends /*@__PURE__*/ S.TaggedError<WAFLimitsExceededException>()("WAFLimitsExceededException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class WAFNonEmptyEntityException
  extends /*@__PURE__*/ S.TaggedError<WAFNonEmptyEntityException>()("WAFNonEmptyEntityException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class WAFNonexistentContainerException
  extends /*@__PURE__*/ S.TaggedError<WAFNonexistentContainerException>()(
    "WAFNonexistentContainerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class WAFNonexistentItemException
  extends /*@__PURE__*/ S.TaggedError<WAFNonexistentItemException>()(
    "WAFNonexistentItemException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class WAFReferencedItemException
  extends /*@__PURE__*/ S.TaggedError<WAFReferencedItemException>()("WAFReferencedItemException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class WAFServiceLinkedRoleErrorException
  extends /*@__PURE__*/ S.TaggedError<WAFServiceLinkedRoleErrorException>()(
    "WAFServiceLinkedRoleErrorException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class WAFStaleDataException
  extends /*@__PURE__*/ S.TaggedError<WAFStaleDataException>()("WAFStaleDataException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class WAFSubscriptionNotFoundException
  extends /*@__PURE__*/ S.TaggedError<WAFSubscriptionNotFoundException>()(
    "WAFSubscriptionNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class WAFTagOperationException
  extends /*@__PURE__*/ S.TaggedError<WAFTagOperationException>()("WAFTagOperationException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class WAFTagOperationInternalErrorException
  extends /*@__PURE__*/ S.TaggedError<WAFTagOperationInternalErrorException>()(
    "WAFTagOperationInternalErrorException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withServerError) {}
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
export type ComparisonOperator = "EQ" | "NE" | "LE" | "LT" | "GE" | "GT" | (string & {});
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
export type ChangeTokenStatus = "PROVISIONED" | "PENDING" | "INSYNC" | (string & {});
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
  input: __S(0, __c0, 0) as any as S.Schema<CreateByteMatchSetRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateByteMatchSetResponse>,
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
}));

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
  input: __S(32, __c4, 0) as any as S.Schema<CreateGeoMatchSetRequest>,
  output: __S(33, __c4, 1) as any as S.Schema<CreateGeoMatchSetResponse>,
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
}));

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
  input: __S(56, __c7, 0) as any as S.Schema<CreateIPSetRequest>,
  output: __S(57, __c7, 1) as any as S.Schema<CreateIPSetResponse>,
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
}));

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
  input: __S(80, __c10, 0) as any as S.Schema<CreateRateBasedRuleRequest>,
  output: __S(81, __c10, 1) as any as S.Schema<CreateRateBasedRuleResponse>,
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
}));

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
  input: __S(120, __c15, 0) as any as S.Schema<CreateRegexMatchSetRequest>,
  output: __S(121, __c15, 1) as any as S.Schema<CreateRegexMatchSetResponse>,
  errors: [
    WAFDisallowedNameException,
    WAFInternalErrorException,
    WAFLimitsExceededException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRegexMatchSet",
}));

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
  input: __S(144, __c18, 0) as any as S.Schema<CreateRegexPatternSetRequest>,
  output: __S(145, __c18, 1) as any as S.Schema<CreateRegexPatternSetResponse>,
  errors: [
    WAFDisallowedNameException,
    WAFInternalErrorException,
    WAFLimitsExceededException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRegexPatternSet",
}));

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
  input: __S(168, __c21, 0) as any as S.Schema<CreateRuleRequest>,
  output: __S(169, __c21, 1) as any as S.Schema<CreateRuleResponse>,
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
}));

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
  input: __S(184, __c23, 0) as any as S.Schema<CreateRuleGroupRequest>,
  output: __S(185, __c23, 1) as any as S.Schema<CreateRuleGroupResponse>,
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
}));

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
  input: __S(200, __c25, 0) as any as S.Schema<CreateSizeConstraintSetRequest>,
  output: __S(201, __c25, 1) as any as S.Schema<CreateSizeConstraintSetResponse>,
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
}));

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
  input: __S(224, __c28, 0) as any as S.Schema<CreateSqlInjectionMatchSetRequest>,
  output: __S(225, __c28, 1) as any as S.Schema<CreateSqlInjectionMatchSetResponse>,
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
}));

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
  input: __S(256, __c32, 0) as any as S.Schema<CreateWebACLRequest>,
  output: __S(257, __c32, 1) as any as S.Schema<CreateWebACLResponse>,
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
}));

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
  input: __S(288, __c36, 0) as any as S.Schema<CreateWebACLMigrationStackRequest>,
  output: __S(289, __c36, 1) as any as S.Schema<CreateWebACLMigrationStackResponse>,
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
}));

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
  input: __S(296, __c37, 0) as any as S.Schema<CreateXssMatchSetRequest>,
  output: __S(297, __c37, 1) as any as S.Schema<CreateXssMatchSetResponse>,
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
}));

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
  input: __S(312, __c39, 0) as any as S.Schema<DeleteByteMatchSetRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<DeleteByteMatchSetResponse>,
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
}));

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
  input: __S(328, __c41, 0) as any as S.Schema<DeleteGeoMatchSetRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<DeleteGeoMatchSetResponse>,
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
}));

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
  input: __S(336, __c42, 0) as any as S.Schema<DeleteIPSetRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<DeleteIPSetResponse>,
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
}));

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
  input: __S(344, __c43, 0) as any as S.Schema<DeleteLoggingConfigurationRequest>,
  output: __S(352, __c44, 0) as any as S.Schema<DeleteLoggingConfigurationResponse>,
  errors: [WAFInternalErrorException, WAFNonexistentItemException, WAFStaleDataException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLoggingConfiguration",
}));

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
  input: __S(360, __c45, 0) as any as S.Schema<DeletePermissionPolicyRequest>,
  output: __S(352, __c44, 0) as any as S.Schema<DeletePermissionPolicyResponse>,
  errors: [WAFInternalErrorException, WAFNonexistentItemException, WAFStaleDataException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePermissionPolicy",
}));

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
  input: __S(368, __c46, 0) as any as S.Schema<DeleteRateBasedRuleRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<DeleteRateBasedRuleResponse>,
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
}));

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
  input: __S(376, __c47, 0) as any as S.Schema<DeleteRegexMatchSetRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<DeleteRegexMatchSetResponse>,
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
}));

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
  input: __S(384, __c48, 0) as any as S.Schema<DeleteRegexPatternSetRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<DeleteRegexPatternSetResponse>,
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
}));

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
  input: __S(392, __c49, 0) as any as S.Schema<DeleteRuleRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<DeleteRuleResponse>,
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
}));

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
  input: __S(400, __c50, 0) as any as S.Schema<DeleteRuleGroupRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<DeleteRuleGroupResponse>,
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
}));

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
  input: __S(408, __c51, 0) as any as S.Schema<DeleteSizeConstraintSetRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<DeleteSizeConstraintSetResponse>,
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
}));

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
  input: __S(416, __c52, 0) as any as S.Schema<DeleteSqlInjectionMatchSetRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<DeleteSqlInjectionMatchSetResponse>,
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
}));

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
  input: __S(424, __c53, 0) as any as S.Schema<DeleteWebACLRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<DeleteWebACLResponse>,
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
}));

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
  input: __S(432, __c54, 0) as any as S.Schema<DeleteXssMatchSetRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<DeleteXssMatchSetResponse>,
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
}));

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
  input: __S(440, __c55, 0) as any as S.Schema<GetByteMatchSetRequest>,
  output: __S(441, __c55, 1) as any as S.Schema<GetByteMatchSetResponse>,
  errors: [WAFInternalErrorException, WAFInvalidAccountException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetByteMatchSet",
}));

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
  input: __S(448, __c56, 0) as any as S.Schema<GetChangeTokenRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<GetChangeTokenResponse>,
  errors: [WAFInternalErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChangeToken",
}));

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
  input: __S(456, __c57, 0) as any as S.Schema<GetChangeTokenStatusRequest>,
  output: __S(457, __c57, 1) as any as S.Schema<GetChangeTokenStatusResponse>,
  errors: [WAFInternalErrorException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChangeTokenStatus",
}));

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
  input: __S(464, __c58, 0) as any as S.Schema<GetGeoMatchSetRequest>,
  output: __S(465, __c58, 1) as any as S.Schema<GetGeoMatchSetResponse>,
  errors: [WAFInternalErrorException, WAFInvalidAccountException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGeoMatchSet",
}));

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
  input: __S(472, __c59, 0) as any as S.Schema<GetIPSetRequest>,
  output: __S(473, __c59, 1) as any as S.Schema<GetIPSetResponse>,
  errors: [WAFInternalErrorException, WAFInvalidAccountException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIPSet",
}));

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
  input: __S(480, __c60, 0) as any as S.Schema<GetLoggingConfigurationRequest>,
  output: __S(496, __c62, 0) as any as S.Schema<GetLoggingConfigurationResponse>,
  errors: [WAFInternalErrorException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoggingConfiguration",
}));

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
  input: __S(504, __c63, 0) as any as S.Schema<GetPermissionPolicyRequest>,
  output: __S(505, __c63, 1) as any as S.Schema<GetPermissionPolicyResponse>,
  errors: [WAFInternalErrorException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPermissionPolicy",
}));

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
  input: __S(512, __c64, 0) as any as S.Schema<GetRateBasedRuleRequest>,
  output: __S(513, __c64, 1) as any as S.Schema<GetRateBasedRuleResponse>,
  errors: [WAFInternalErrorException, WAFInvalidAccountException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRateBasedRule",
}));

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
  input: __S(520, __c65, 0) as any as S.Schema<GetRateBasedRuleManagedKeysRequest>,
  output: __S(521, __c65, 1) as any as S.Schema<GetRateBasedRuleManagedKeysResponse>,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRateBasedRuleManagedKeys",
}));

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
  input: __S(528, __c66, 0) as any as S.Schema<GetRegexMatchSetRequest>,
  output: __S(529, __c66, 1) as any as S.Schema<GetRegexMatchSetResponse>,
  errors: [WAFInternalErrorException, WAFInvalidAccountException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegexMatchSet",
}));

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
  input: __S(536, __c67, 0) as any as S.Schema<GetRegexPatternSetRequest>,
  output: __S(537, __c67, 1) as any as S.Schema<GetRegexPatternSetResponse>,
  errors: [WAFInternalErrorException, WAFInvalidAccountException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegexPatternSet",
}));

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
  input: __S(544, __c68, 0) as any as S.Schema<GetRuleRequest>,
  output: __S(545, __c68, 1) as any as S.Schema<GetRuleResponse>,
  errors: [WAFInternalErrorException, WAFInvalidAccountException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRule",
}));

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
  input: __S(552, __c69, 0) as any as S.Schema<GetRuleGroupRequest>,
  output: __S(553, __c69, 1) as any as S.Schema<GetRuleGroupResponse>,
  errors: [WAFInternalErrorException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRuleGroup",
}));

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
  input: __S(561, __c70, 1) as any as S.Schema<GetSampledRequestsRequest>,
  output: __S(567, __c70, 7) as any as S.Schema<GetSampledRequestsResponse>,
  errors: [WAFInternalErrorException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSampledRequests",
}));

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
  input: __S(568, __c71, 0) as any as S.Schema<GetSizeConstraintSetRequest>,
  output: __S(569, __c71, 1) as any as S.Schema<GetSizeConstraintSetResponse>,
  errors: [WAFInternalErrorException, WAFInvalidAccountException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSizeConstraintSet",
}));

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
  input: __S(576, __c72, 0) as any as S.Schema<GetSqlInjectionMatchSetRequest>,
  output: __S(577, __c72, 1) as any as S.Schema<GetSqlInjectionMatchSetResponse>,
  errors: [WAFInternalErrorException, WAFInvalidAccountException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSqlInjectionMatchSet",
}));

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
  input: __S(584, __c73, 0) as any as S.Schema<GetWebACLRequest>,
  output: __S(585, __c73, 1) as any as S.Schema<GetWebACLResponse>,
  errors: [WAFInternalErrorException, WAFInvalidAccountException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWebACL",
}));

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
  input: __S(592, __c74, 0) as any as S.Schema<GetXssMatchSetRequest>,
  output: __S(593, __c74, 1) as any as S.Schema<GetXssMatchSetResponse>,
  errors: [WAFInternalErrorException, WAFInvalidAccountException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetXssMatchSet",
}));

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
  input: __S(600, __c75, 0) as any as S.Schema<ListActivatedRulesInRuleGroupRequest>,
  output: __S(601, __c75, 1) as any as S.Schema<ListActivatedRulesInRuleGroupResponse>,
  errors: [WAFInternalErrorException, WAFInvalidParameterException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListActivatedRulesInRuleGroup",
}));

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
  input: __S(608, __c76, 0) as any as S.Schema<ListByteMatchSetsRequest>,
  output: __S(611, __c76, 3) as any as S.Schema<ListByteMatchSetsResponse>,
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListByteMatchSets",
}));

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
  input: __S(616, __c77, 0) as any as S.Schema<ListGeoMatchSetsRequest>,
  output: __S(619, __c77, 3) as any as S.Schema<ListGeoMatchSetsResponse>,
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGeoMatchSets",
}));

export type ListIPSetsError = WAFInternalErrorException | WAFInvalidAccountException | CommonErrors;
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
  input: __S(624, __c78, 0) as any as S.Schema<ListIPSetsRequest>,
  output: __S(627, __c78, 3) as any as S.Schema<ListIPSetsResponse>,
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIPSets",
}));

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
  input: __S(632, __c79, 0) as any as S.Schema<ListLoggingConfigurationsRequest>,
  output: __S(634, __c79, 2) as any as S.Schema<ListLoggingConfigurationsResponse>,
  errors: [WAFInternalErrorException, WAFInvalidParameterException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLoggingConfigurations",
}));

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
  input: __S(640, __c80, 0) as any as S.Schema<ListRateBasedRulesRequest>,
  output: __S(650, __c81, 2) as any as S.Schema<ListRateBasedRulesResponse>,
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRateBasedRules",
}));

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
  input: __S(656, __c82, 0) as any as S.Schema<ListRegexMatchSetsRequest>,
  output: __S(659, __c82, 3) as any as S.Schema<ListRegexMatchSetsResponse>,
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRegexMatchSets",
}));

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
  input: __S(664, __c83, 0) as any as S.Schema<ListRegexPatternSetsRequest>,
  output: __S(667, __c83, 3) as any as S.Schema<ListRegexPatternSetsResponse>,
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRegexPatternSets",
}));

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
  input: __S(672, __c84, 0) as any as S.Schema<ListRuleGroupsRequest>,
  output: __S(675, __c84, 3) as any as S.Schema<ListRuleGroupsResponse>,
  errors: [WAFInternalErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRuleGroups",
}));

export type ListRulesError = WAFInternalErrorException | WAFInvalidAccountException | CommonErrors;
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
  input: __S(680, __c85, 0) as any as S.Schema<ListRulesRequest>,
  output: __S(650, __c81, 2) as any as S.Schema<ListRulesResponse>,
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRules",
}));

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
  input: __S(688, __c86, 0) as any as S.Schema<ListSizeConstraintSetsRequest>,
  output: __S(691, __c86, 3) as any as S.Schema<ListSizeConstraintSetsResponse>,
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSizeConstraintSets",
}));

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
  input: __S(696, __c87, 0) as any as S.Schema<ListSqlInjectionMatchSetsRequest>,
  output: __S(699, __c87, 3) as any as S.Schema<ListSqlInjectionMatchSetsResponse>,
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSqlInjectionMatchSets",
}));

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
  input: __S(704, __c88, 0) as any as S.Schema<ListSubscribedRuleGroupsRequest>,
  output: __S(707, __c88, 3) as any as S.Schema<ListSubscribedRuleGroupsResponse>,
  errors: [WAFInternalErrorException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubscribedRuleGroups",
}));

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
  input: __S(712, __c89, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(714, __c89, 2) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
  input: __S(720, __c90, 0) as any as S.Schema<ListWebACLsRequest>,
  output: __S(723, __c90, 3) as any as S.Schema<ListWebACLsResponse>,
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWebACLs",
}));

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
  input: __S(728, __c91, 0) as any as S.Schema<ListXssMatchSetsRequest>,
  output: __S(731, __c91, 3) as any as S.Schema<ListXssMatchSetsResponse>,
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListXssMatchSets",
}));

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
  input: __S(736, __c92, 0) as any as S.Schema<PutLoggingConfigurationRequest>,
  output: __S(496, __c62, 0) as any as S.Schema<PutLoggingConfigurationResponse>,
  errors: [
    WAFInternalErrorException,
    WAFNonexistentItemException,
    WAFServiceLinkedRoleErrorException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLoggingConfiguration",
}));

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
  input: __S(744, __c93, 0) as any as S.Schema<PutPermissionPolicyRequest>,
  output: __S(352, __c44, 0) as any as S.Schema<PutPermissionPolicyResponse>,
  errors: [
    WAFInternalErrorException,
    WAFInvalidPermissionPolicyException,
    WAFNonexistentItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutPermissionPolicy",
}));

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
  input: __S(752, __c94, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(352, __c44, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(760, __c95, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(352, __c44, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(770, __c96, 2) as any as S.Schema<UpdateByteMatchSetRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<UpdateByteMatchSetResponse>,
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
}));

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
  input: __S(778, __c97, 2) as any as S.Schema<UpdateGeoMatchSetRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<UpdateGeoMatchSetResponse>,
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
}));

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
  input: __S(786, __c98, 2) as any as S.Schema<UpdateIPSetRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<UpdateIPSetResponse>,
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
}));

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
  input: __S(792, __c99, 0) as any as S.Schema<UpdateRateBasedRuleRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<UpdateRateBasedRuleResponse>,
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
}));

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
  input: __S(810, __c101, 2) as any as S.Schema<UpdateRegexMatchSetRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<UpdateRegexMatchSetResponse>,
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
}));

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
  input: __S(818, __c102, 2) as any as S.Schema<UpdateRegexPatternSetRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<UpdateRegexPatternSetResponse>,
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
}));

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
  input: __S(824, __c103, 0) as any as S.Schema<UpdateRuleRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<UpdateRuleResponse>,
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
}));

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
  input: __S(832, __c104, 0) as any as S.Schema<UpdateRuleGroupRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<UpdateRuleGroupResponse>,
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
}));

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
  input: __S(850, __c106, 2) as any as S.Schema<UpdateSizeConstraintSetRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<UpdateSizeConstraintSetResponse>,
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
}));

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
  input: __S(858, __c107, 2) as any as S.Schema<UpdateSqlInjectionMatchSetRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<UpdateSqlInjectionMatchSetResponse>,
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
}));

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
  input: __S(864, __c108, 0) as any as S.Schema<UpdateWebACLRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<UpdateWebACLResponse>,
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
}));

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
  input: __S(874, __c109, 2) as any as S.Schema<UpdateXssMatchSetRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<UpdateXssMatchSetResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, ChangeToken: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateByteMatchSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ByteMatchSet: S.optional(__S(17, __c2, 1)),
          ChangeToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateByteMatchSetResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Type: S.String, Data: S.optional(S.String) })).annotate({
        identifier: "FieldToMatch",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(24, __c3, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          ByteMatchSetId: S.String,
          Name: S.optional(S.String),
          ByteMatchTuples: __S(16, __c2, 0),
        }),
      ).annotate({ identifier: "ByteMatchSet" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FieldToMatch: __S(8, __c1, 0),
          TargetString: T.Blob,
          TextTransformation: S.String,
          PositionalConstraint: S.String,
        }),
      ).annotate({ identifier: "ByteMatchTuple" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, ChangeToken: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateGeoMatchSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GeoMatchSet: S.optional(__S(41, __c5, 1)),
          ChangeToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateGeoMatchSetResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(48, __c6, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          GeoMatchSetId: S.String,
          Name: S.optional(S.String),
          GeoMatchConstraints: __S(40, __c5, 0),
        }),
      ).annotate({ identifier: "GeoMatchSet" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Type: S.String, Value: S.String })).annotate({
        identifier: "GeoMatchConstraint",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, ChangeToken: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateIPSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ IPSet: S.optional(__S(65, __c8, 1)), ChangeToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "CreateIPSetResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(72, __c9, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          IPSetId: S.String,
          Name: S.optional(S.String),
          IPSetDescriptors: __S(64, __c8, 0),
        }),
      ).annotate({ identifier: "IPSet" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Type: S.String, Value: S.String })).annotate({
        identifier: "IPSetDescriptor",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          MetricName: S.String,
          RateKey: S.String,
          RateLimit: S.Number,
          ChangeToken: S.String,
          Tags: S.optional(__S(89, __c11, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateRateBasedRuleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Rule: S.optional(__S(112, __c14, 0)), ChangeToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "CreateRateBasedRuleResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(88, __c11, 0));
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(104, __c13, 0));
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Negated: S.Boolean, Type: S.String, DataId: S.String }),
      ).annotate({ identifier: "Predicate" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleId: S.String,
          Name: S.optional(S.String),
          MetricName: S.optional(S.String),
          MatchPredicates: __S(96, __c12, 0),
          RateKey: S.String,
          RateLimit: S.Number,
        }),
      ).annotate({ identifier: "RateBasedRule" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, ChangeToken: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateRegexMatchSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RegexMatchSet: S.optional(__S(129, __c16, 1)),
          ChangeToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateRegexMatchSetResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(136, __c17, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          RegexMatchSetId: S.optional(S.String),
          Name: S.optional(S.String),
          RegexMatchTuples: S.optional(__S(128, __c16, 0)),
        }),
      ).annotate({ identifier: "RegexMatchSet" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FieldToMatch: __S(8, __c1, 0),
          TextTransformation: S.String,
          RegexPatternSetId: S.String,
        }),
      ).annotate({ identifier: "RegexMatchTuple" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, ChangeToken: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateRegexPatternSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RegexPatternSet: S.optional(__S(160, __c20, 0)),
          ChangeToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateRegexPatternSetResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RegexPatternSetId: S.String,
          Name: S.optional(S.String),
          RegexPatternStrings: __S(152, __c19, 0),
        }),
      ).annotate({ identifier: "RegexPatternSet" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          MetricName: S.String,
          ChangeToken: S.String,
          Tags: S.optional(__S(89, __c11, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateRuleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Rule: S.optional(__S(176, __c22, 0)), ChangeToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "CreateRuleResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleId: S.String,
          Name: S.optional(S.String),
          MetricName: S.optional(S.String),
          Predicates: __S(96, __c12, 0),
        }),
      ).annotate({ identifier: "Rule" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          MetricName: S.String,
          ChangeToken: S.String,
          Tags: S.optional(__S(89, __c11, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateRuleGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RuleGroup: S.optional(__S(192, __c24, 0)),
          ChangeToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateRuleGroupResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleGroupId: S.String,
          Name: S.optional(S.String),
          MetricName: S.optional(S.String),
        }),
      ).annotate({ identifier: "RuleGroup" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, ChangeToken: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateSizeConstraintSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SizeConstraintSet: S.optional(__S(209, __c26, 1)),
          ChangeToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateSizeConstraintSetResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(216, __c27, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          SizeConstraintSetId: S.String,
          Name: S.optional(S.String),
          SizeConstraints: __S(208, __c26, 0),
        }),
      ).annotate({ identifier: "SizeConstraintSet" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FieldToMatch: __S(8, __c1, 0),
          TextTransformation: S.String,
          ComparisonOperator: S.String,
          Size: S.Number,
        }),
      ).annotate({ identifier: "SizeConstraint" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, ChangeToken: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateSqlInjectionMatchSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SqlInjectionMatchSet: S.optional(__S(248, __c31, 0)),
          ChangeToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateSqlInjectionMatchSetResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(240, __c30, 0));
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FieldToMatch: __S(8, __c1, 0), TextTransformation: S.String }),
      ).annotate({ identifier: "SqlInjectionMatchTuple" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SqlInjectionMatchSetId: S.String,
          Name: S.optional(S.String),
          SqlInjectionMatchTuples: __S(232, __c29, 0),
        }),
      ).annotate({ identifier: "SqlInjectionMatchSet" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          MetricName: S.String,
          DefaultAction: __S(280, __c35, 0),
          ChangeToken: S.String,
          Tags: S.optional(__S(89, __c11, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateWebACLRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WebACL: S.optional(__S(264, __c33, 0)),
          ChangeToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateWebACLResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WebACLId: S.String,
          Name: S.optional(S.String),
          MetricName: S.optional(S.String),
          DefaultAction: __S(280, __c35, 0),
          Rules: __S(272, __c34, 0),
          WebACLArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "WebACL" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(283, __c35, 3));
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Type: S.String })).annotate({ identifier: "WafAction" });
    case 1:
      return S.suspend(() => S.Struct({ RuleId: S.String })).annotate({
        identifier: "ExcludedRule",
      });
    case 2:
      return S.Array(__S(281, __c35, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Priority: S.Number,
          RuleId: S.String,
          Action: S.optional(__S(280, __c35, 0)),
          OverrideAction: S.optional(__S(280, __c35, 0)),
          Type: S.optional(S.String),
          ExcludedRules: S.optional(__S(282, __c35, 2)),
        }),
      ).annotate({ identifier: "ActivatedRule" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WebACLId: S.String,
          S3BucketName: S.String,
          IgnoreUnsupportedType: S.Boolean,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateWebACLMigrationStackRequest" });
    case 1:
      return S.suspend(() => S.Struct({ S3ObjectUrl: S.String }).pipe(ns)).annotate({
        identifier: "CreateWebACLMigrationStackResponse",
      });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, ChangeToken: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateXssMatchSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          XssMatchSet: S.optional(__S(304, __c38, 0)),
          ChangeToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateXssMatchSetResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          XssMatchSetId: S.String,
          Name: S.optional(S.String),
          XssMatchTuples: __S(232, __c29, 0),
        }),
      ).annotate({ identifier: "XssMatchSet" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ByteMatchSetId: S.String, ChangeToken: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteByteMatchSetRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ChangeToken: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "DeleteByteMatchSetResponse",
      });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GeoMatchSetId: S.String, ChangeToken: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteGeoMatchSetRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IPSetId: S.String, ChangeToken: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteIPSetRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteLoggingConfigurationRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteLoggingConfigurationResponse",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeletePermissionPolicyRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleId: S.String, ChangeToken: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteRateBasedRuleRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RegexMatchSetId: S.String, ChangeToken: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteRegexMatchSetRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RegexPatternSetId: S.String, ChangeToken: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteRegexPatternSetRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleId: S.String, ChangeToken: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteRuleRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleGroupId: S.String, ChangeToken: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteRuleGroupRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SizeConstraintSetId: S.String, ChangeToken: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSizeConstraintSetRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SqlInjectionMatchSetId: S.String, ChangeToken: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSqlInjectionMatchSetRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WebACLId: S.String, ChangeToken: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteWebACLRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ XssMatchSetId: S.String, ChangeToken: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteXssMatchSetRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ByteMatchSetId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetByteMatchSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ByteMatchSet: S.optional(__S(17, __c2, 1)) }).pipe(ns),
      ).annotate({ identifier: "GetByteMatchSetResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetChangeTokenRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChangeToken: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetChangeTokenStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ChangeTokenStatus: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "GetChangeTokenStatusResponse" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GeoMatchSetId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetGeoMatchSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ GeoMatchSet: S.optional(__S(41, __c5, 1)) }).pipe(ns),
      ).annotate({ identifier: "GetGeoMatchSetResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IPSetId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetIPSetRequest" });
    case 1:
      return S.suspend(() => S.Struct({ IPSet: S.optional(__S(65, __c8, 1)) }).pipe(ns)).annotate({
        identifier: "GetIPSetResponse",
      });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetLoggingConfigurationRequest" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(8, __c1, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String,
          LogDestinationConfigs: __S(152, __c19, 0),
          RedactedFields: S.optional(__S(488, __c61, 0)),
        }),
      ).annotate({ identifier: "LoggingConfiguration" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LoggingConfiguration: S.optional(__S(489, __c61, 1)) }).pipe(ns),
      ).annotate({ identifier: "GetLoggingConfigurationResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetPermissionPolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Policy: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "GetPermissionPolicyResponse",
      });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetRateBasedRuleRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Rule: S.optional(__S(112, __c14, 0)) }).pipe(ns)).annotate({
        identifier: "GetRateBasedRuleResponse",
      });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleId: S.String, NextMarker: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetRateBasedRuleManagedKeysRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ManagedKeys: S.optional(__S(152, __c19, 0)),
          NextMarker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetRateBasedRuleManagedKeysResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RegexMatchSetId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetRegexMatchSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RegexMatchSet: S.optional(__S(129, __c16, 1)) }).pipe(ns),
      ).annotate({ identifier: "GetRegexMatchSetResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RegexPatternSetId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetRegexPatternSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RegexPatternSet: S.optional(__S(160, __c20, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetRegexPatternSetResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetRuleRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Rule: S.optional(__S(176, __c22, 0)) }).pipe(ns)).annotate({
        identifier: "GetRuleResponse",
      });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleGroupId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetRuleGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RuleGroup: S.optional(__S(192, __c24, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetRuleGroupResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "TimeWindow" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WebAclId: S.String,
          RuleId: S.String,
          TimeWindow: __S(560, __c70, 0),
          MaxItems: S.Number,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetSampledRequestsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "HTTPHeader" });
    case 3:
      return S.Array(__S(562, __c70, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ClientIP: S.optional(S.String),
          Country: S.optional(S.String),
          URI: S.optional(S.String),
          Method: S.optional(S.String),
          HTTPVersion: S.optional(S.String),
          Headers: S.optional(__S(563, __c70, 3)),
        }),
      ).annotate({ identifier: "HTTPRequest" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Request: __S(564, __c70, 4),
          Weight: S.Number,
          Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Action: S.optional(S.String),
          RuleWithinRuleGroup: S.optional(S.String),
        }),
      ).annotate({ identifier: "SampledHTTPRequest" });
    case 6:
      return S.Array(__S(565, __c70, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          SampledRequests: S.optional(__S(566, __c70, 6)),
          PopulationSize: S.optional(S.Number),
          TimeWindow: S.optional(__S(560, __c70, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "GetSampledRequestsResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SizeConstraintSetId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSizeConstraintSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ SizeConstraintSet: S.optional(__S(209, __c26, 1)) }).pipe(ns),
      ).annotate({ identifier: "GetSizeConstraintSetResponse" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SqlInjectionMatchSetId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSqlInjectionMatchSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ SqlInjectionMatchSet: S.optional(__S(248, __c31, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetSqlInjectionMatchSetResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WebACLId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetWebACLRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ WebACL: S.optional(__S(264, __c33, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetWebACLResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ XssMatchSetId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetXssMatchSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ XssMatchSet: S.optional(__S(304, __c38, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetXssMatchSetResponse" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleGroupId: S.optional(S.String),
          NextMarker: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListActivatedRulesInRuleGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          ActivatedRules: S.optional(__S(272, __c34, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "ListActivatedRulesInRuleGroupResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextMarker: S.optional(S.String), Limit: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListByteMatchSetsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ByteMatchSetId: S.String, Name: S.String })).annotate({
        identifier: "ByteMatchSetSummary",
      });
    case 2:
      return S.Array(__S(609, __c76, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          ByteMatchSets: S.optional(__S(610, __c76, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListByteMatchSetsResponse" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextMarker: S.optional(S.String), Limit: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListGeoMatchSetsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ GeoMatchSetId: S.String, Name: S.String })).annotate({
        identifier: "GeoMatchSetSummary",
      });
    case 2:
      return S.Array(__S(617, __c77, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          GeoMatchSets: S.optional(__S(618, __c77, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListGeoMatchSetsResponse" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextMarker: S.optional(S.String), Limit: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListIPSetsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ IPSetId: S.String, Name: S.String })).annotate({
        identifier: "IPSetSummary",
      });
    case 2:
      return S.Array(__S(625, __c78, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NextMarker: S.optional(S.String), IPSets: S.optional(__S(626, __c78, 2)) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListIPSetsResponse" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextMarker: S.optional(S.String), Limit: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListLoggingConfigurationsRequest" });
    case 1:
      return S.Array(__S(489, __c61, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          LoggingConfigurations: S.optional(__S(633, __c79, 1)),
          NextMarker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListLoggingConfigurationsResponse" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextMarker: S.optional(S.String), Limit: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListRateBasedRulesRequest" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RuleId: S.String, Name: S.String })).annotate({
        identifier: "RuleSummary",
      });
    case 1:
      return S.Array(__S(648, __c81, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ NextMarker: S.optional(S.String), Rules: S.optional(__S(649, __c81, 1)) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListRateBasedRulesResponse" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextMarker: S.optional(S.String), Limit: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListRegexMatchSetsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ RegexMatchSetId: S.String, Name: S.String })).annotate({
        identifier: "RegexMatchSetSummary",
      });
    case 2:
      return S.Array(__S(657, __c82, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          RegexMatchSets: S.optional(__S(658, __c82, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListRegexMatchSetsResponse" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextMarker: S.optional(S.String), Limit: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListRegexPatternSetsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ RegexPatternSetId: S.String, Name: S.String })).annotate({
        identifier: "RegexPatternSetSummary",
      });
    case 2:
      return S.Array(__S(665, __c83, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          RegexPatternSets: S.optional(__S(666, __c83, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListRegexPatternSetsResponse" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextMarker: S.optional(S.String), Limit: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListRuleGroupsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ RuleGroupId: S.String, Name: S.String })).annotate({
        identifier: "RuleGroupSummary",
      });
    case 2:
      return S.Array(__S(673, __c84, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          RuleGroups: S.optional(__S(674, __c84, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListRuleGroupsResponse" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextMarker: S.optional(S.String), Limit: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListRulesRequest" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextMarker: S.optional(S.String), Limit: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSizeConstraintSetsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ SizeConstraintSetId: S.String, Name: S.String })).annotate({
        identifier: "SizeConstraintSetSummary",
      });
    case 2:
      return S.Array(__S(689, __c86, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          SizeConstraintSets: S.optional(__S(690, __c86, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListSizeConstraintSetsResponse" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextMarker: S.optional(S.String), Limit: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSqlInjectionMatchSetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ SqlInjectionMatchSetId: S.String, Name: S.String }),
      ).annotate({ identifier: "SqlInjectionMatchSetSummary" });
    case 2:
      return S.Array(__S(697, __c87, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          SqlInjectionMatchSets: S.optional(__S(698, __c87, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListSqlInjectionMatchSetsResponse" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextMarker: S.optional(S.String), Limit: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSubscribedRuleGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RuleGroupId: S.String, Name: S.String, MetricName: S.String }),
      ).annotate({ identifier: "SubscribedRuleGroupSummary" });
    case 2:
      return S.Array(__S(705, __c88, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          RuleGroups: S.optional(__S(706, __c88, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListSubscribedRuleGroupsResponse" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          Limit: S.optional(S.Number),
          ResourceARN: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.optional(S.String), TagList: S.optional(__S(89, __c11, 1)) }),
      ).annotate({ identifier: "TagInfoForResource" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          TagInfoForResource: S.optional(__S(713, __c89, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextMarker: S.optional(S.String), Limit: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListWebACLsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ WebACLId: S.String, Name: S.String })).annotate({
        identifier: "WebACLSummary",
      });
    case 2:
      return S.Array(__S(721, __c90, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          WebACLs: S.optional(__S(722, __c90, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListWebACLsResponse" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextMarker: S.optional(S.String), Limit: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListXssMatchSetsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ XssMatchSetId: S.String, Name: S.String })).annotate({
        identifier: "XssMatchSetSummary",
      });
    case 2:
      return S.Array(__S(729, __c91, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          XssMatchSets: S.optional(__S(730, __c91, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListXssMatchSetsResponse" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LoggingConfiguration: __S(489, __c61, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutLoggingConfigurationRequest" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Policy: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutPermissionPolicyRequest" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, Tags: __S(89, __c11, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, TagKeys: __S(152, __c19, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Action: S.String, ByteMatchTuple: __S(24, __c3, 0) }),
      ).annotate({ identifier: "ByteMatchSetUpdate" });
    case 1:
      return S.Array(__S(768, __c96, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ByteMatchSetId: S.String,
          ChangeToken: S.String,
          Updates: __S(769, __c96, 1),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateByteMatchSetRequest" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Action: S.String, GeoMatchConstraint: __S(48, __c6, 0) }),
      ).annotate({ identifier: "GeoMatchSetUpdate" });
    case 1:
      return S.Array(__S(776, __c97, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          GeoMatchSetId: S.String,
          ChangeToken: S.String,
          Updates: __S(777, __c97, 1),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateGeoMatchSetRequest" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Action: S.String, IPSetDescriptor: __S(72, __c9, 0) }),
      ).annotate({ identifier: "IPSetUpdate" });
    case 1:
      return S.Array(__S(784, __c98, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ IPSetId: S.String, ChangeToken: S.String, Updates: __S(785, __c98, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateIPSetRequest" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleId: S.String,
          ChangeToken: S.String,
          Updates: __S(801, __c100, 1),
          RateLimit: S.Number,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateRateBasedRuleRequest" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Action: S.String, Predicate: __S(104, __c13, 0) }),
      ).annotate({ identifier: "RuleUpdate" });
    case 1:
      return S.Array(__S(800, __c100, 0));
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Action: S.String, RegexMatchTuple: __S(136, __c17, 0) }),
      ).annotate({ identifier: "RegexMatchSetUpdate" });
    case 1:
      return S.Array(__S(808, __c101, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          RegexMatchSetId: S.String,
          Updates: __S(809, __c101, 1),
          ChangeToken: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateRegexMatchSetRequest" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Action: S.String, RegexPatternString: S.String })).annotate(
        { identifier: "RegexPatternSetUpdate" },
      );
    case 1:
      return S.Array(__S(816, __c102, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          RegexPatternSetId: S.String,
          Updates: __S(817, __c102, 1),
          ChangeToken: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateRegexPatternSetRequest" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleId: S.String, ChangeToken: S.String, Updates: __S(801, __c100, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateRuleRequest" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleGroupId: S.String,
          Updates: __S(841, __c105, 1),
          ChangeToken: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateRuleGroupRequest" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Action: S.String, ActivatedRule: __S(283, __c35, 3) }),
      ).annotate({ identifier: "RuleGroupUpdate" });
    case 1:
      return S.Array(__S(840, __c105, 0));
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Action: S.String, SizeConstraint: __S(216, __c27, 0) }),
      ).annotate({ identifier: "SizeConstraintSetUpdate" });
    case 1:
      return S.Array(__S(848, __c106, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          SizeConstraintSetId: S.String,
          ChangeToken: S.String,
          Updates: __S(849, __c106, 1),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateSizeConstraintSetRequest" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Action: S.String, SqlInjectionMatchTuple: __S(240, __c30, 0) }),
      ).annotate({ identifier: "SqlInjectionMatchSetUpdate" });
    case 1:
      return S.Array(__S(856, __c107, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          SqlInjectionMatchSetId: S.String,
          ChangeToken: S.String,
          Updates: __S(857, __c107, 1),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateSqlInjectionMatchSetRequest" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WebACLId: S.String,
          ChangeToken: S.String,
          Updates: S.optional(__S(841, __c105, 1)),
          DefaultAction: S.optional(__S(280, __c35, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateWebACLRequest" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Action: S.String, XssMatchTuple: __S(240, __c30, 0) }),
      ).annotate({ identifier: "XssMatchSetUpdate" });
    case 1:
      return S.Array(__S(872, __c109, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          XssMatchSetId: S.String,
          ChangeToken: S.String,
          Updates: __S(873, __c109, 1),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateXssMatchSetRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
