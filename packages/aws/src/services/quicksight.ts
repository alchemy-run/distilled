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
  sdkId: "QuickSight",
  target: "QuickSight_20180401",
  version: "2018-04-01",
  sigv4: "quicksight",
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
                `https://quicksight-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://quicksight-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://quicksight.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://quicksight.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 401,
  })<{ readonly message?: string; readonly RequestId?: string }> {}
export class ConcurrentUpdatingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConcurrentUpdatingException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string; readonly RequestId?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string; readonly RequestId?: string }> {}
export class CustomerManagedKeyUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "CustomerManagedKeyUnavailableException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly RequestId?: string }> {}
export class DomainNotWhitelistedException
  extends /*@__PURE__*/ TE.TaggedError(
    "DomainNotWhitelistedException",
    ["AuthError"],
    { status: 403 },
  )<{ readonly message?: string; readonly RequestId?: string }> {}
export class IdentityTypeNotSupportedException
  extends /*@__PURE__*/ TE.TaggedError(
    "IdentityTypeNotSupportedException",
    ["AuthError"],
    { status: 403 },
  )<{ readonly message?: string; readonly RequestId?: string }> {}
export class InternalFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalFailureException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string; readonly RequestId?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class InvalidDataSetParameterValueException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDataSetParameterValueException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly RequestId?: string }> {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidNextTokenException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly RequestId?: string }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly RequestId?: string }> {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterValueException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly RequestId?: string }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly RequestId?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["ConflictError"],
    { status: 409 },
  )<{
    readonly message?: string;
    readonly ResourceType?: ExceptionResourceType;
    readonly RequestId?: string;
  }> {}
export class PreconditionNotMetException
  extends /*@__PURE__*/ TE.TaggedError(
    "PreconditionNotMetException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly RequestId?: string }> {}
export class QuickSightSubscriptionRequired
  extends /*@__PURE__*/ TE.TaggedError(
    "QuickSightSubscriptionRequired",
    ["NotFoundError"],
    {
      synthetic: {
        from: "ResourceNotFoundException",
        message: { includes: "Directory information" },
      },
    },
  )<{
    readonly message?: string;
    readonly ResourceType?: ExceptionResourceType;
    readonly RequestId?: string;
  }> {}
export class QuickSightUserNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "QuickSightUserNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string; readonly RequestId?: string }> {}
export class ResourceExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceExistsException",
    ["ConflictError"],
    { status: 409 },
  )<{
    readonly message?: string;
    readonly ResourceType?: ExceptionResourceType;
    readonly RequestId?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message?: string;
    readonly ResourceType?: ExceptionResourceType;
    readonly RequestId?: string;
  }> {}
export class ResourceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceUnavailableException",
    ["ServerError"],
    { status: 503 },
  )<{
    readonly message?: string;
    readonly ResourceType?: ExceptionResourceType;
    readonly RequestId?: string;
  }> {}
export class SessionLifetimeInMinutesInvalidException
  extends /*@__PURE__*/ TE.TaggedError(
    "SessionLifetimeInMinutesInvalidException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly RequestId?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string; readonly RequestId?: string }> {}
export class UnsupportedPricingPlanException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedPricingPlanException",
    ["AuthError"],
    { status: 403 },
  )<{ readonly message?: string; readonly RequestId?: string }> {}
export class UnsupportedUserEditionException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedUserEditionException",
    ["AuthError"],
    { status: 403 },
  )<{ readonly message?: string; readonly RequestId?: string }> {}
export type AwsAccountId = string;
export type TopicId = string;
export type AnswerId = string;
export type Arn = string;
export type LimitedSensitiveString = string | redacted.Redacted<string>;
export type LimitedString = string;
export interface Identifier {
  Identity: string;
}
export type AggType =
  | "SUM"
  | "MIN"
  | "MAX"
  | "COUNT"
  | "AVERAGE"
  | "DISTINCT_COUNT"
  | "STDEV"
  | "STDEVP"
  | "VAR"
  | "VARP"
  | "PERCENTILE"
  | "MEDIAN"
  | "PTD_SUM"
  | "PTD_MIN"
  | "PTD_MAX"
  | "PTD_COUNT"
  | "PTD_DISTINCT_COUNT"
  | "PTD_AVERAGE"
  | "COLUMN"
  | "CUSTOM"
  | (string & {});
export type AggFunctionParamKey = string;
export type AggFunctionParamValue = string;
export type AggFunctionParamMap = { [key: string]: string | undefined };
export type TopicTimeGranularity =
  | "SECOND"
  | "MINUTE"
  | "HOUR"
  | "DAY"
  | "WEEK"
  | "MONTH"
  | "QUARTER"
  | "YEAR"
  | (string & {});
export interface AggFunction {
  Aggregation?: AggType;
  AggregationFunctionParameters?: { [key: string]: string | undefined };
  Period?: TopicTimeGranularity;
  PeriodField?: string;
}
export type OperandList = Identifier[];
export type ComparisonMethodType =
  | "DIFF"
  | "PERC_DIFF"
  | "DIFF_AS_PERC"
  | "POP_CURRENT_DIFF_AS_PERC"
  | "POP_CURRENT_DIFF"
  | "POP_OVERTIME_DIFF_AS_PERC"
  | "POP_OVERTIME_DIFF"
  | "PERCENT_OF_TOTAL"
  | "RUNNING_SUM"
  | "MOVING_AVERAGE"
  | (string & {});
export interface TopicIRComparisonMethod {
  Type?: ComparisonMethodType;
  Period?: TopicTimeGranularity;
  WindowSize?: number;
}
export type Expression = string | redacted.Redacted<string>;
export type CalculatedFieldReferenceList = Identifier[];
export type DisplayFormat =
  | "AUTO"
  | "PERCENT"
  | "CURRENCY"
  | "NUMBER"
  | "DATE"
  | "STRING"
  | (string & {});
export type TopicNumericSeparatorSymbol = "COMMA" | "DOT" | (string & {});
export type NumberScale =
  | "NONE"
  | "AUTO"
  | "THOUSANDS"
  | "MILLIONS"
  | "BILLIONS"
  | "TRILLIONS"
  | "LAKHS"
  | "CRORES"
  | (string & {});
export interface NegativeFormat {
  Prefix?: string;
  Suffix?: string;
}
export interface DisplayFormatOptions {
  UseBlankCellFormat?: boolean;
  BlankCellFormat?: string;
  DateFormat?: string;
  DecimalSeparator?: TopicNumericSeparatorSymbol;
  GroupingSeparator?: string;
  UseGrouping?: boolean;
  FractionDigits?: number;
  Prefix?: string;
  Suffix?: string;
  UnitScaler?: NumberScale;
  NegativeFormat?: NegativeFormat;
  CurrencySymbol?: string;
}
export interface NamedEntityRef {
  NamedEntityName?: string;
}
export interface TopicIRMetric {
  MetricId?: Identifier;
  Function?: AggFunction;
  Operands?: Identifier[];
  ComparisonMethod?: TopicIRComparisonMethod;
  Expression?: string | redacted.Redacted<string>;
  CalculatedFieldReferences?: Identifier[];
  DisplayFormat?: DisplayFormat;
  DisplayFormatOptions?: DisplayFormatOptions;
  NamedEntity?: NamedEntityRef;
}
export type TopicIRMetricList = TopicIRMetric[];
export type TopicSortDirection = "ASCENDING" | "DESCENDING" | (string & {});
export interface TopicSortClause {
  Operand?: Identifier;
  SortDirection?: TopicSortDirection;
}
export interface TopicIRGroupBy {
  FieldName?: Identifier;
  TimeGranularity?: TopicTimeGranularity;
  Sort?: TopicSortClause;
  DisplayFormat?: DisplayFormat;
  DisplayFormatOptions?: DisplayFormatOptions;
  NamedEntity?: NamedEntityRef;
}
export type TopicIRGroupByList = TopicIRGroupBy[];
export type TopicIRFilterType =
  | "CATEGORY_FILTER"
  | "NUMERIC_EQUALITY_FILTER"
  | "NUMERIC_RANGE_FILTER"
  | "DATE_RANGE_FILTER"
  | "RELATIVE_DATE_FILTER"
  | "TOP_BOTTOM_FILTER"
  | "EQUALS"
  | "RANK_LIMIT_FILTER"
  | "ACCEPT_ALL_FILTER"
  | (string & {});
export type FilterClass =
  | "ENFORCED_VALUE_FILTER"
  | "CONDITIONAL_VALUE_FILTER"
  | "NAMED_VALUE_FILTER"
  | "DASHBOARD_DEFAULT_FILTER"
  | (string & {});
export type TopicIRFilterFunction =
  | "CONTAINS"
  | "EXACT"
  | "STARTS_WITH"
  | "ENDS_WITH"
  | "CONTAINS_STRING"
  | "PREVIOUS"
  | "THIS"
  | "LAST"
  | "NEXT"
  | "NOW"
  | (string & {});
export type ConstantType = "SINGULAR" | "RANGE" | "COLLECTIVE" | (string & {});
export type ConstantValueString = string;
export interface CollectiveConstantEntry {
  ConstantType?: ConstantType;
  Value?: string;
}
export type CollectiveConstantEntryList = CollectiveConstantEntry[];
export interface TopicConstantValue {
  ConstantType?: ConstantType;
  Value?: string;
  Minimum?: string;
  Maximum?: string;
  ValueList?: CollectiveConstantEntry[];
}
export type NullFilterOption =
  | "ALL_VALUES"
  | "NON_NULLS_ONLY"
  | "NULLS_ONLY"
  | (string & {});
export type TimeGranularity =
  | "YEAR"
  | "QUARTER"
  | "MONTH"
  | "WEEK"
  | "DAY"
  | "HOUR"
  | "MINUTE"
  | "SECOND"
  | "MILLISECOND"
  | (string & {});
export interface AggregationPartitionBy {
  FieldName?: string;
  TimeGranularity?: TimeGranularity;
}
export type AggregationPartitionByList = AggregationPartitionBy[];
export interface FilterAggMetrics {
  MetricOperand?: Identifier;
  Function?: AggType;
  SortDirection?: TopicSortDirection;
}
export type FilterAggMetricsList = FilterAggMetrics[];
export type AnchorType = "TODAY" | (string & {});
export interface Anchor {
  AnchorType?: AnchorType;
  TimeGranularity?: TimeGranularity;
  Offset?: number;
}
export interface TopicIRFilterOption {
  FilterType?: TopicIRFilterType;
  FilterClass?: FilterClass;
  OperandField?: Identifier;
  Function?: TopicIRFilterFunction;
  Constant?: TopicConstantValue;
  Inverse?: boolean;
  NullFilter?: NullFilterOption;
  Aggregation?: AggType;
  AggregationFunctionParameters?: { [key: string]: string | undefined };
  AggregationPartitionBy?: AggregationPartitionBy[];
  Range?: TopicConstantValue;
  Inclusive?: boolean;
  TimeGranularity?: TimeGranularity;
  LastNextOffset?: TopicConstantValue;
  AggMetrics?: FilterAggMetrics[];
  TopBottomLimit?: TopicConstantValue;
  SortDirection?: TopicSortDirection;
  Anchor?: Anchor;
}
export type TopicIRFilterEntry = TopicIRFilterOption[];
export type TopicIRFilterList = TopicIRFilterOption[][];
export interface ContributionAnalysisFactor {
  FieldName?: string;
}
export type ContributionAnalysisFactorsList = ContributionAnalysisFactor[];
export interface ContributionAnalysisTimeRanges {
  StartRange?: TopicIRFilterOption;
  EndRange?: TopicIRFilterOption;
}
export type ContributionAnalysisDirection =
  | "INCREASE"
  | "DECREASE"
  | "NEUTRAL"
  | (string & {});
export type ContributionAnalysisSortType =
  | "ABSOLUTE_DIFFERENCE"
  | "CONTRIBUTION_PERCENTAGE"
  | "DEVIATION_FROM_EXPECTED"
  | "PERCENTAGE_DIFFERENCE"
  | (string & {});
export interface TopicIRContributionAnalysis {
  Factors?: ContributionAnalysisFactor[];
  TimeRanges?: ContributionAnalysisTimeRanges;
  Direction?: ContributionAnalysisDirection;
  SortType?: ContributionAnalysisSortType;
}
export interface VisualOptions {
  type?: string;
}
export interface TopicIR {
  Metrics?: TopicIRMetric[];
  GroupByList?: TopicIRGroupBy[];
  Filters?: TopicIRFilterOption[][];
  Sort?: TopicSortClause;
  ContributionAnalysis?: TopicIRContributionAnalysis;
  Visual?: VisualOptions;
}
export type VisualRole =
  | "PRIMARY"
  | "COMPLIMENTARY"
  | "MULTI_INTENT"
  | "FALLBACK"
  | "FRAGMENT"
  | (string & {});
export type TopicVisuals = TopicVisual[];
export interface TopicVisual {
  VisualId?: string;
  Role?: VisualRole;
  Ir?: TopicIR;
  SupportingVisuals?: TopicVisual[];
}
export interface Slot {
  SlotId?: string;
  VisualId?: string;
}
export type Slots = Slot[];
export interface TopicTemplate {
  TemplateType?: string;
  Slots?: Slot[];
}
export interface CreateTopicReviewedAnswer {
  AnswerId: string;
  DatasetArn: string;
  Question: string | redacted.Redacted<string>;
  Mir?: TopicIR;
  PrimaryVisual?: TopicVisual;
  Template?: TopicTemplate;
}
export type CreateTopicReviewedAnswers = CreateTopicReviewedAnswer[];
export interface BatchCreateTopicReviewedAnswerRequest {
  AwsAccountId: string;
  TopicId: string;
  Answers: CreateTopicReviewedAnswer[];
}
export interface SucceededTopicReviewedAnswer {
  AnswerId?: string;
}
export type SucceededTopicReviewedAnswers = SucceededTopicReviewedAnswer[];
export type ReviewedAnswerErrorCode =
  | "INTERNAL_ERROR"
  | "MISSING_ANSWER"
  | "DATASET_DOES_NOT_EXIST"
  | "INVALID_DATASET_ARN"
  | "DUPLICATED_ANSWER"
  | "INVALID_DATA"
  | "MISSING_REQUIRED_FIELDS"
  | (string & {});
export interface InvalidTopicReviewedAnswer {
  AnswerId?: string;
  Error?: ReviewedAnswerErrorCode;
}
export type InvalidTopicReviewedAnswers = InvalidTopicReviewedAnswer[];
export type StatusCode = number;
export interface BatchCreateTopicReviewedAnswerResponse {
  TopicId?: string;
  TopicArn?: string;
  SucceededAnswers?: SucceededTopicReviewedAnswer[];
  InvalidAnswers?: InvalidTopicReviewedAnswer[];
  Status?: number;
  RequestId?: string;
}
export type KbAwsAccountId = string;
export type KnowledgeBaseId = string;
export type BatchDeleteKnowledgeBaseRequestKnowledgeBaseIdsList = string[];
export interface BatchDeleteKnowledgeBaseRequest {
  AwsAccountId: string;
  KnowledgeBaseIds: string[];
}
export type KnowledgeBaseArn = string;
export interface BatchDeleteKnowledgeBaseSuccess {
  KnowledgeBaseId: string;
  KnowledgeBaseArn: string;
}
export type BatchDeleteKnowledgeBaseSuccessList =
  BatchDeleteKnowledgeBaseSuccess[];
export interface BatchDeleteKnowledgeBaseFailure {
  KnowledgeBaseId: string;
  ErrorCode: string;
  ErrorMessage: string;
}
export type BatchDeleteKnowledgeBaseFailureList =
  BatchDeleteKnowledgeBaseFailure[];
export interface BatchDeleteKnowledgeBaseResponse {
  Deleted: BatchDeleteKnowledgeBaseSuccess[];
  Errors: BatchDeleteKnowledgeBaseFailure[];
  RequestId?: string;
  Status?: number;
}
export type AnswerIds = string[];
export interface BatchDeleteTopicReviewedAnswerRequest {
  AwsAccountId: string;
  TopicId: string;
  AnswerIds?: string[];
}
export interface BatchDeleteTopicReviewedAnswerResponse {
  TopicId?: string;
  TopicArn?: string;
  SucceededAnswers?: SucceededTopicReviewedAnswer[];
  InvalidAnswers?: InvalidTopicReviewedAnswer[];
  RequestId?: string;
  Status?: number;
}
export interface UserLimitsEntry {
  userName: string;
  namespace: string;
}
export type BatchDescribeUserLimitsRequestUsersList = UserLimitsEntry[];
export type ResourceType = "INDEX_STORAGE" | "AGENT_HOURS" | (string & {});
export type ResourceTypeList = ResourceType[];
export interface BatchDescribeUserLimitsRequest {
  accountId: string;
  users?: UserLimitsEntry[];
  resourceTypes?: ResourceType[];
}
export type EffectiveLimitLimitValueLong = number;
export type LimitUnit = "MB" | "GB" | "HOURS" | "DAYS" | (string & {});
export type LimitSource =
  | "DIRECT_USER"
  | "GROUP"
  | "ROLE"
  | "ACCOUNT"
  | "SYSTEM_DEFAULT"
  | (string & {});
export type ProfileId = string;
export interface EffectiveLimit {
  resourceType: ResourceType;
  limitValue: number;
  limitUnit: LimitUnit;
  source: LimitSource;
  profileId: string;
}
export type EffectiveLimitList = EffectiveLimit[];
export interface UserLimits {
  userName: string;
  namespace: string;
  effectiveLimits: EffectiveLimit[];
}
export type UserLimitsList = UserLimits[];
export interface BatchDescribeUserLimitsError_ {
  userName?: string;
  namespace?: string;
  userArn?: string;
  errorCode: string;
  message: string;
}
export type BatchDescribeUserLimitsErrorList = BatchDescribeUserLimitsError_[];
export interface BatchDescribeUserLimitsResponse {
  userLimits: UserLimits[];
  errors: BatchDescribeUserLimitsError_[];
}
export type IngestionId = string;
export interface CancelIngestionRequest {
  AwsAccountId: string;
  DataSetId: string;
  IngestionId: string;
}
export interface CancelIngestionResponse {
  Arn?: string;
  IngestionId?: string;
  RequestId?: string;
  Status?: number;
}
export type Namespace = string;
export interface AccountCustomization {
  DefaultTheme?: string;
  DefaultEmailCustomizationTemplate?: string;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface CreateAccountCustomizationRequest {
  AwsAccountId: string;
  Namespace?: string;
  AccountCustomization: AccountCustomization;
  Tags?: Tag[];
}
export interface CreateAccountCustomizationResponse {
  Arn?: string;
  AwsAccountId?: string;
  Namespace?: string;
  AccountCustomization?: AccountCustomization;
  RequestId?: string;
  Status?: number;
}
export type Edition =
  | "STANDARD"
  | "ENTERPRISE"
  | "ENTERPRISE_AND_Q"
  | (string & {});
export type AuthenticationMethodOption =
  | "IAM_AND_QUICKSIGHT"
  | "IAM_ONLY"
  | "ACTIVE_DIRECTORY"
  | "IAM_IDENTITY_CENTER"
  | (string & {});
export type AccountName = string;
export type GroupsList = string[];
export interface CreateAccountSubscriptionRequest {
  Edition?: Edition;
  AuthenticationMethod: AuthenticationMethodOption;
  AwsAccountId: string;
  AccountName: string;
  NotificationEmail: string;
  ActiveDirectoryName?: string;
  Realm?: string;
  DirectoryId?: string;
  AdminGroup?: string[];
  AuthorGroup?: string[];
  ReaderGroup?: string[];
  AdminProGroup?: string[];
  AuthorProGroup?: string[];
  ReaderProGroup?: string[];
  FirstName?: string;
  LastName?: string;
  EmailAddress?: string;
  ContactNumber?: string;
  IAMIdentityCenterInstanceArn?: string;
}
export interface SignupResponse {
  IAMUser?: boolean;
  userLoginName?: string;
  accountName?: string;
  directoryType?: string;
}
export interface CreateAccountSubscriptionResponse {
  SignupResponse?: SignupResponse;
  Status?: number;
  RequestId?: string;
}
export type ShortRestrictiveResourceId = string;
export type ActionConnectorName = string | redacted.Redacted<string>;
export type ActionConnectorType =
  | "GENERIC_HTTP"
  | "SERVICENOW_NOW_PLATFORM"
  | "SALESFORCE_CRM"
  | "MICROSOFT_OUTLOOK"
  | "PAGERDUTY_ADVANCE"
  | "JIRA_CLOUD"
  | "ATLASSIAN_CONFLUENCE"
  | "AMAZON_S3"
  | "AMAZON_BEDROCK_AGENT_RUNTIME"
  | "AMAZON_BEDROCK_RUNTIME"
  | "AMAZON_BEDROCK_DATA_AUTOMATION_RUNTIME"
  | "AMAZON_TEXTRACT"
  | "AMAZON_COMPREHEND"
  | "AMAZON_COMPREHEND_MEDICAL"
  | "MICROSOFT_ONEDRIVE"
  | "MICROSOFT_SHAREPOINT"
  | "MICROSOFT_TEAMS"
  | "SAP_BUSINESSPARTNER"
  | "SAP_PRODUCTMASTERDATA"
  | "SAP_PHYSICALINVENTORY"
  | "SAP_BILLOFMATERIALS"
  | "SAP_MATERIALSTOCK"
  | "ZENDESK_SUITE"
  | "SMARTSHEET"
  | "SLACK"
  | "ASANA"
  | "BAMBOO_HR"
  | (string & {});
export type ConnectionAuthType =
  | "BASIC"
  | "API_KEY"
  | "OAUTH2_CLIENT_CREDENTIALS"
  | "NONE"
  | "IAM"
  | "OAUTH2_AUTHORIZATION_CODE"
  | (string & {});
export type Endpoint = string;
export type AuthorizationCodeGrantCredentialsSource =
  | "PLAIN_CREDENTIALS"
  | (string & {});
export type ClientId = string;
export type ClientSecret = string | redacted.Redacted<string>;
export interface AuthorizationCodeGrantDetails {
  ClientId: string;
  ClientSecret: string | redacted.Redacted<string>;
  TokenEndpoint: string;
  AuthorizationEndpoint: string;
}
export type AuthorizationCodeGrantCredentialsDetails = {
  AuthorizationCodeGrantDetails: AuthorizationCodeGrantDetails;
};
export interface AuthorizationCodeGrantMetadata {
  BaseEndpoint: string;
  RedirectUrl: string;
  AuthorizationCodeGrantCredentialsSource?: AuthorizationCodeGrantCredentialsSource;
  AuthorizationCodeGrantCredentialsDetails?: AuthorizationCodeGrantCredentialsDetails;
}
export type ClientCredentialsSource = "PLAIN_CREDENTIALS" | (string & {});
export interface ClientCredentialsGrantDetails {
  ClientId: string;
  ClientSecret: string | redacted.Redacted<string>;
  TokenEndpoint: string;
}
export type ClientCredentialsDetails = {
  ClientCredentialsGrantDetails: ClientCredentialsGrantDetails;
};
export interface ClientCredentialsGrantMetadata {
  BaseEndpoint: string;
  ClientCredentialsSource?: ClientCredentialsSource;
  ClientCredentialsDetails?: ClientCredentialsDetails;
}
export type ActionUserName = string | redacted.Redacted<string>;
export type ActionPassword = string | redacted.Redacted<string>;
export interface BasicAuthConnectionMetadata {
  BaseEndpoint: string;
  Username: string | redacted.Redacted<string>;
  Password: string | redacted.Redacted<string>;
}
export type APIKey = string | redacted.Redacted<string>;
export type Email = string | redacted.Redacted<string>;
export interface APIKeyConnectionMetadata {
  BaseEndpoint: string;
  ApiKey: string | redacted.Redacted<string>;
  Email?: string | redacted.Redacted<string>;
}
export interface NoneConnectionMetadata {
  BaseEndpoint: string;
}
export type RoleArn = string;
export interface IAMConnectionMetadata {
  RoleArn: string;
}
export type AuthenticationMetadata =
  | {
      AuthorizationCodeGrantMetadata: AuthorizationCodeGrantMetadata;
      ClientCredentialsGrantMetadata?: never;
      BasicAuthConnectionMetadata?: never;
      ApiKeyConnectionMetadata?: never;
      NoneConnectionMetadata?: never;
      IamConnectionMetadata?: never;
    }
  | {
      AuthorizationCodeGrantMetadata?: never;
      ClientCredentialsGrantMetadata: ClientCredentialsGrantMetadata;
      BasicAuthConnectionMetadata?: never;
      ApiKeyConnectionMetadata?: never;
      NoneConnectionMetadata?: never;
      IamConnectionMetadata?: never;
    }
  | {
      AuthorizationCodeGrantMetadata?: never;
      ClientCredentialsGrantMetadata?: never;
      BasicAuthConnectionMetadata: BasicAuthConnectionMetadata;
      ApiKeyConnectionMetadata?: never;
      NoneConnectionMetadata?: never;
      IamConnectionMetadata?: never;
    }
  | {
      AuthorizationCodeGrantMetadata?: never;
      ClientCredentialsGrantMetadata?: never;
      BasicAuthConnectionMetadata?: never;
      ApiKeyConnectionMetadata: APIKeyConnectionMetadata;
      NoneConnectionMetadata?: never;
      IamConnectionMetadata?: never;
    }
  | {
      AuthorizationCodeGrantMetadata?: never;
      ClientCredentialsGrantMetadata?: never;
      BasicAuthConnectionMetadata?: never;
      ApiKeyConnectionMetadata?: never;
      NoneConnectionMetadata: NoneConnectionMetadata;
      IamConnectionMetadata?: never;
    }
  | {
      AuthorizationCodeGrantMetadata?: never;
      ClientCredentialsGrantMetadata?: never;
      BasicAuthConnectionMetadata?: never;
      ApiKeyConnectionMetadata?: never;
      NoneConnectionMetadata?: never;
      IamConnectionMetadata: IAMConnectionMetadata;
    };
export interface AuthConfig {
  AuthenticationType: ConnectionAuthType;
  AuthenticationMetadata: AuthenticationMetadata;
}
export type ActionConnectorDescription = string | redacted.Redacted<string>;
export type Principal = string;
export type ActionList = string[];
export interface ResourcePermission {
  Principal: string;
  Actions: string[];
}
export type ResourcePermissionList = ResourcePermission[];
export interface CreateActionConnectorRequest {
  AwsAccountId: string;
  ActionConnectorId: string;
  Name: string | redacted.Redacted<string>;
  Type: ActionConnectorType;
  AuthenticationConfig: AuthConfig;
  Description?: string | redacted.Redacted<string>;
  Permissions?: ResourcePermission[];
  VpcConnectionArn?: string;
  Tags?: Tag[];
}
export type ResourceStatus =
  | "CREATION_IN_PROGRESS"
  | "CREATION_SUCCESSFUL"
  | "CREATION_FAILED"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_SUCCESSFUL"
  | "UPDATE_FAILED"
  | "DELETED"
  | (string & {});
export interface CreateActionConnectorResponse {
  Arn?: string;
  CreationStatus?: ResourceStatus;
  ActionConnectorId?: string;
  RequestId?: string;
  Status?: number;
}
export type CreateAgentRequestSpacesList = string[];
export type CreateAgentRequestActionConnectorsList = string[];
export type AgentId = string;
export type AgentName = string;
export type AgentDescription = string;
export type IconId = string;
export type StarterPrompt = string;
export type StarterPromptList = string[];
export type WelcomeMessage = string | redacted.Redacted<string>;
export type AgentLifecycle = "PREVIEW" | "PUBLISHED" | (string & {});
export type ModelProfileId = string;
export type SubscriptionId = string;
export type QbsAwsAccountId = string;
export interface CustomPromptProfile {
  ModelProfileId: string;
  SubscriptionId: string;
  QbsAwsAccountId: string;
}
export type StyleDescription = string | redacted.Redacted<string>;
export interface CustomPromptInputParameters {
  ResponseLength?: string | redacted.Redacted<string>;
  OutputStyle?: string | redacted.Redacted<string>;
  Identity?: string | redacted.Redacted<string>;
  Tone?: string | redacted.Redacted<string>;
  CustomInstructions?: string | redacted.Redacted<string>;
}
export type CustomPromptInput =
  | { ExistingPrompt: CustomPromptProfile; NewPrompt?: never }
  | { ExistingPrompt?: never; NewPrompt: CustomPromptInputParameters };
export interface CreateAgentRequest {
  Spaces?: string[];
  ActionConnectors?: string[];
  AwsAccountId: string;
  AgentId: string;
  Name: string;
  Description?: string;
  IconId?: string;
  StarterPrompts?: string[];
  WelcomeMessage?: string | redacted.Redacted<string>;
  AgentLifecycle?: AgentLifecycle;
  CustomPromptInput?: CustomPromptInput;
}
export type AgentArn = string;
export type AgentStatus =
  | "ACTIVE"
  | "UPDATING"
  | "FAILED"
  | "CREATING"
  | (string & {});
export interface CreateAgentResponse {
  Arn: string;
  AgentId: string;
  AgentStatus: AgentStatus;
  AgentName: string;
  RequestId?: string;
}
export type AnalysisName = string;
export type NonEmptyString = string;
export type SensitiveString = string | redacted.Redacted<string>;
export type SensitiveStringList = (string | redacted.Redacted<string>)[];
export interface StringParameter {
  Name: string;
  Values: (string | redacted.Redacted<string>)[];
}
export type StringParameterList = StringParameter[];
export type SensitiveLong = number;
export type SensitiveLongList = number[];
export interface IntegerParameter {
  Name: string;
  Values: number[];
}
export type IntegerParameterList = IntegerParameter[];
export type SensitiveDouble = number;
export type SensitiveDoubleList = number[];
export interface DecimalParameter {
  Name: string;
  Values: number[];
}
export type DecimalParameterList = DecimalParameter[];
export type SensitiveTimestamp = Date;
export type SensitiveTimestampList = Date[];
export interface DateTimeParameter {
  Name: string;
  Values: Date[];
}
export type DateTimeParameterList = DateTimeParameter[];
export interface Parameters {
  StringParameters?: StringParameter[];
  IntegerParameters?: IntegerParameter[];
  DecimalParameters?: DecimalParameter[];
  DateTimeParameters?: DateTimeParameter[];
}
export interface DataSetReference {
  DataSetPlaceholder: string;
  DataSetArn: string;
}
export type DataSetReferenceList = DataSetReference[];
export type TopicIdentifier = string;
export interface TopicReference {
  TopicPlaceholder: string;
  TopicArn: string;
}
export type TopicReferenceList = TopicReference[];
export interface AnalysisSourceTemplate {
  DataSetReferences: DataSetReference[];
  TopicReferences?: TopicReference[];
  Arn: string;
}
export interface AnalysisSourceEntity {
  SourceTemplate?: AnalysisSourceTemplate;
}
export type DataSetIdentifier = string;
export interface DataSetIdentifierDeclaration {
  Identifier: string;
  DataSetArn: string;
}
export type DataSetIdentifierDeclarationList = DataSetIdentifierDeclaration[];
export interface TopicIdentifierDeclaration {
  Identifier: string;
  TopicArn: string;
}
export type TopicIdentifierDeclarationList = TopicIdentifierDeclaration[];
export type SheetTitle = string;
export type SheetDescription = string;
export type SheetName = string;
export type SheetControlTitle = string;
export type ParameterName = string;
export type Visibility = "HIDDEN" | "VISIBLE" | (string & {});
export type RelativeFontSize =
  | "EXTRA_SMALL"
  | "SMALL"
  | "MEDIUM"
  | "LARGE"
  | "EXTRA_LARGE"
  | (string & {});
export type PixelLength = string;
export interface FontSize {
  Relative?: RelativeFontSize;
  Absolute?: string;
}
export type FontDecoration = "UNDERLINE" | "NONE" | (string & {});
export type HexColor = string;
export type FontWeightName = "NORMAL" | "BOLD" | (string & {});
export interface FontWeight {
  Name?: FontWeightName;
}
export type FontStyle = "NORMAL" | "ITALIC" | (string & {});
export interface FontConfiguration {
  FontSize?: FontSize;
  FontDecoration?: FontDecoration;
  FontColor?: string;
  FontWeight?: FontWeight;
  FontStyle?: FontStyle;
  FontFamily?: string;
}
export interface LabelOptions {
  Visibility?: Visibility;
  FontConfiguration?: FontConfiguration;
  CustomLabel?: string;
}
export type DateTimeFormat = string;
export type SheetControlInfoIconText = string;
export interface SheetControlInfoIconLabelOptions {
  Visibility?: Visibility;
  InfoIconText?: string;
}
export interface DateTimePickerControlDisplayOptions {
  TitleOptions?: LabelOptions;
  DateTimeFormat?: string;
  InfoIconLabelOptions?: SheetControlInfoIconLabelOptions;
  HelperTextVisibility?: Visibility;
  DateIconVisibility?: Visibility;
}
export type ControlTitlePlainText = string;
export type ControlTitleRichText = string;
export interface ControlTitleFormatText {
  PlainText?: string;
  RichText?: string;
}
export interface ParameterDateTimePickerControl {
  ParameterControlId: string;
  Title?: string;
  SourceParameterName: string;
  DisplayOptions?: DateTimePickerControlDisplayOptions;
  ControlTitleFormatText?: ControlTitleFormatText;
}
export interface ListControlSearchOptions {
  Visibility?: Visibility;
}
export interface ListControlSelectAllOptions {
  Visibility?: Visibility;
}
export interface ListControlDisplayOptions {
  SearchOptions?: ListControlSearchOptions;
  SelectAllOptions?: ListControlSelectAllOptions;
  TitleOptions?: LabelOptions;
  InfoIconLabelOptions?: SheetControlInfoIconLabelOptions;
}
export type SheetControlListType =
  | "MULTI_SELECT"
  | "SINGLE_SELECT"
  | (string & {});
export type ParameterSelectableValueList = string[];
export type ColumnName = string;
export interface ColumnIdentifier {
  DataSetIdentifier?: string;
  TopicIdentifier?: string;
  ColumnName: string;
}
export interface ParameterSelectableValues {
  Values?: string[];
  LinkToDataSetColumn?: ColumnIdentifier;
}
export interface CascadingControlSource {
  SourceSheetControlId?: string;
  ColumnToMatch?: ColumnIdentifier;
}
export type CascadingControlSourceList = CascadingControlSource[];
export interface CascadingControlConfiguration {
  SourceControls?: CascadingControlSource[];
}
export type ControlSortDirection =
  | "ASC"
  | "DESC"
  | "USER_DEFINED_ORDER"
  | (string & {});
export interface SelectableValuesSort {
  Direction: ControlSortDirection;
}
export type SortDirection = "ASC" | "DESC" | (string & {});
export type SimpleNumericalAggregationFunction =
  | "SUM"
  | "AVERAGE"
  | "MIN"
  | "MAX"
  | "COUNT"
  | "DISTINCT_COUNT"
  | "VAR"
  | "VARP"
  | "STDEV"
  | "STDEVP"
  | "MEDIAN"
  | (string & {});
export type PercentileValue = number;
export interface PercentileAggregation {
  PercentileValue?: number;
}
export interface NumericalAggregationFunction {
  SimpleNumericalAggregation?: SimpleNumericalAggregationFunction;
  PercentileAggregation?: PercentileAggregation;
}
export type CategoricalAggregationFunction =
  | "COUNT"
  | "DISTINCT_COUNT"
  | (string & {});
export type DateAggregationFunction =
  | "COUNT"
  | "DISTINCT_COUNT"
  | "MIN"
  | "MAX"
  | (string & {});
export type SimpleAttributeAggregationFunction = "UNIQUE_VALUE" | (string & {});
export interface AttributeAggregationFunction {
  SimpleAttributeAggregation?: SimpleAttributeAggregationFunction;
  ValueForMultipleValues?: string;
}
export interface AggregationFunction {
  NumericalAggregationFunction?: NumericalAggregationFunction;
  CategoricalAggregationFunction?: CategoricalAggregationFunction;
  DateAggregationFunction?: DateAggregationFunction;
  AttributeAggregationFunction?: AttributeAggregationFunction;
}
export interface AggregationSortConfiguration {
  Column: ColumnIdentifier;
  SortDirection: SortDirection;
  AggregationFunction?: AggregationFunction;
}
export interface ControlSortConfiguration {
  SelectableValuesSort?: SelectableValuesSort;
  ControlColumnSort?: AggregationSortConfiguration;
}
export type ControlSortConfigurationList = ControlSortConfiguration[];
export interface ParameterListControl {
  ParameterControlId: string;
  Title?: string;
  SourceParameterName: string;
  DisplayOptions?: ListControlDisplayOptions;
  Type?: SheetControlListType;
  SelectableValues?: ParameterSelectableValues;
  CascadingControlConfiguration?: CascadingControlConfiguration;
  ControlSortConfigurations?: ControlSortConfiguration[];
  ControlTitleFormatText?: ControlTitleFormatText;
}
export interface DropDownControlDisplayOptions {
  SelectAllOptions?: ListControlSelectAllOptions;
  TitleOptions?: LabelOptions;
  InfoIconLabelOptions?: SheetControlInfoIconLabelOptions;
}
export type CommitMode = "AUTO" | "MANUAL" | (string & {});
export interface ParameterDropDownControl {
  ParameterControlId: string;
  Title?: string;
  SourceParameterName: string;
  DisplayOptions?: DropDownControlDisplayOptions;
  Type?: SheetControlListType;
  SelectableValues?: ParameterSelectableValues;
  CascadingControlConfiguration?: CascadingControlConfiguration;
  CommitMode?: CommitMode;
  ControlSortConfigurations?: ControlSortConfiguration[];
  ControlTitleFormatText?: ControlTitleFormatText;
}
export interface TextControlPlaceholderOptions {
  Visibility?: Visibility;
}
export interface TextFieldControlDisplayOptions {
  TitleOptions?: LabelOptions;
  PlaceholderOptions?: TextControlPlaceholderOptions;
  InfoIconLabelOptions?: SheetControlInfoIconLabelOptions;
}
export interface ParameterTextFieldControl {
  ParameterControlId: string;
  Title?: string;
  SourceParameterName: string;
  DisplayOptions?: TextFieldControlDisplayOptions;
  ControlTitleFormatText?: ControlTitleFormatText;
}
export type TextAreaControlDelimiter = string;
export interface TextAreaControlDisplayOptions {
  TitleOptions?: LabelOptions;
  PlaceholderOptions?: TextControlPlaceholderOptions;
  InfoIconLabelOptions?: SheetControlInfoIconLabelOptions;
}
export interface ParameterTextAreaControl {
  ParameterControlId: string;
  Title?: string;
  SourceParameterName: string;
  Delimiter?: string;
  DisplayOptions?: TextAreaControlDisplayOptions;
  ControlTitleFormatText?: ControlTitleFormatText;
}
export interface SliderControlDisplayOptions {
  TitleOptions?: LabelOptions;
  InfoIconLabelOptions?: SheetControlInfoIconLabelOptions;
}
export interface ParameterSliderControl {
  ParameterControlId: string;
  Title?: string;
  SourceParameterName: string;
  DisplayOptions?: SliderControlDisplayOptions;
  MaximumValue: number;
  MinimumValue: number;
  StepSize: number;
  ControlTitleFormatText?: ControlTitleFormatText;
}
export interface ParameterControl {
  DateTimePicker?: ParameterDateTimePickerControl;
  List?: ParameterListControl;
  Dropdown?: ParameterDropDownControl;
  TextField?: ParameterTextFieldControl;
  TextArea?: ParameterTextAreaControl;
  Slider?: ParameterSliderControl;
}
export type ParameterControlList = ParameterControl[];
export type SheetControlDateTimePickerType =
  | "SINGLE_VALUED"
  | "DATE_RANGE"
  | (string & {});
export interface FilterDateTimePickerControl {
  FilterControlId: string;
  Title?: string;
  SourceFilterId: string;
  DisplayOptions?: DateTimePickerControlDisplayOptions;
  Type?: SheetControlDateTimePickerType;
  CommitMode?: CommitMode;
  ControlTitleFormatText?: ControlTitleFormatText;
}
export interface FilterSelectableValues {
  Values?: string[];
}
export interface FilterListControl {
  FilterControlId: string;
  Title?: string;
  SourceFilterId: string;
  DisplayOptions?: ListControlDisplayOptions;
  Type?: SheetControlListType;
  SelectableValues?: FilterSelectableValues;
  CascadingControlConfiguration?: CascadingControlConfiguration;
  ControlSortConfigurations?: ControlSortConfiguration[];
  ControlTitleFormatText?: ControlTitleFormatText;
}
export interface FilterDropDownControl {
  FilterControlId: string;
  Title?: string;
  SourceFilterId: string;
  DisplayOptions?: DropDownControlDisplayOptions;
  Type?: SheetControlListType;
  SelectableValues?: FilterSelectableValues;
  CascadingControlConfiguration?: CascadingControlConfiguration;
  CommitMode?: CommitMode;
  ControlSortConfigurations?: ControlSortConfiguration[];
  ControlTitleFormatText?: ControlTitleFormatText;
}
export interface FilterTextFieldControl {
  FilterControlId: string;
  Title?: string;
  SourceFilterId: string;
  DisplayOptions?: TextFieldControlDisplayOptions;
  ControlTitleFormatText?: ControlTitleFormatText;
}
export interface FilterTextAreaControl {
  FilterControlId: string;
  Title?: string;
  SourceFilterId: string;
  Delimiter?: string;
  DisplayOptions?: TextAreaControlDisplayOptions;
  ControlTitleFormatText?: ControlTitleFormatText;
}
export type SheetControlSliderType = "SINGLE_POINT" | "RANGE" | (string & {});
export interface FilterSliderControl {
  FilterControlId: string;
  Title?: string;
  SourceFilterId: string;
  DisplayOptions?: SliderControlDisplayOptions;
  Type?: SheetControlSliderType;
  MaximumValue: number;
  MinimumValue: number;
  StepSize: number;
  ControlTitleFormatText?: ControlTitleFormatText;
}
export interface RelativeDateTimeControlDisplayOptions {
  TitleOptions?: LabelOptions;
  DateTimeFormat?: string;
  InfoIconLabelOptions?: SheetControlInfoIconLabelOptions;
}
export interface FilterRelativeDateTimeControl {
  FilterControlId: string;
  Title?: string;
  SourceFilterId: string;
  DisplayOptions?: RelativeDateTimeControlDisplayOptions;
  CommitMode?: CommitMode;
  ControlTitleFormatText?: ControlTitleFormatText;
}
export interface FilterCrossSheetControl {
  FilterControlId: string;
  SourceFilterId: string;
  CascadingControlConfiguration?: CascadingControlConfiguration;
}
export interface FilterControl {
  DateTimePicker?: FilterDateTimePickerControl;
  List?: FilterListControl;
  Dropdown?: FilterDropDownControl;
  TextField?: FilterTextFieldControl;
  TextArea?: FilterTextAreaControl;
  Slider?: FilterSliderControl;
  RelativeDateTime?: FilterRelativeDateTimeControl;
  CrossSheet?: FilterCrossSheetControl;
}
export type FilterControlList = FilterControl[];
export type ShortPlainText = string;
export type ShortRichText = string;
export interface ShortFormatText {
  PlainText?: string;
  RichText?: string;
}
export interface VisualTitleLabelOptions {
  Visibility?: Visibility;
  FormatText?: ShortFormatText;
}
export type LongPlainText = string;
export type LongRichText = string;
export interface LongFormatText {
  PlainText?: string;
  RichText?: string;
}
export interface VisualSubtitleLabelOptions {
  Visibility?: Visibility;
  FormatText?: LongFormatText;
}
export type FieldId = string;
export type HierarchyId = string;
export type Prefix = string | redacted.Redacted<string>;
export type Suffix = string | redacted.Redacted<string>;
export type NumericSeparatorSymbol = "COMMA" | "DOT" | "SPACE" | (string & {});
export type DigitGroupingStyle = "DEFAULT" | "LAKHS" | (string & {});
export interface ThousandSeparatorOptions {
  Symbol?: NumericSeparatorSymbol;
  Visibility?: Visibility;
  GroupingStyle?: DigitGroupingStyle;
}
export interface NumericSeparatorConfiguration {
  DecimalSeparator?: NumericSeparatorSymbol;
  ThousandsSeparator?: ThousandSeparatorOptions;
}
export type DecimalPlaces = number;
export interface DecimalPlacesConfiguration {
  DecimalPlaces: number;
}
export type NegativeValueDisplayMode = "POSITIVE" | "NEGATIVE" | (string & {});
export interface NegativeValueConfiguration {
  DisplayMode: NegativeValueDisplayMode;
}
export type NullString = string | redacted.Redacted<string>;
export interface NullValueFormatConfiguration {
  NullString: string | redacted.Redacted<string>;
}
export interface NumberDisplayFormatConfiguration {
  Prefix?: string | redacted.Redacted<string>;
  Suffix?: string | redacted.Redacted<string>;
  SeparatorConfiguration?: NumericSeparatorConfiguration;
  DecimalPlacesConfiguration?: DecimalPlacesConfiguration;
  NumberScale?: NumberScale;
  NegativeValueConfiguration?: NegativeValueConfiguration;
  NullValueFormatConfiguration?: NullValueFormatConfiguration;
}
export type CurrencyCode = string;
export interface CurrencyDisplayFormatConfiguration {
  Prefix?: string | redacted.Redacted<string>;
  Suffix?: string | redacted.Redacted<string>;
  SeparatorConfiguration?: NumericSeparatorConfiguration;
  Symbol?: string;
  DecimalPlacesConfiguration?: DecimalPlacesConfiguration;
  NumberScale?: NumberScale;
  NegativeValueConfiguration?: NegativeValueConfiguration;
  NullValueFormatConfiguration?: NullValueFormatConfiguration;
}
export interface PercentageDisplayFormatConfiguration {
  Prefix?: string | redacted.Redacted<string>;
  Suffix?: string | redacted.Redacted<string>;
  SeparatorConfiguration?: NumericSeparatorConfiguration;
  DecimalPlacesConfiguration?: DecimalPlacesConfiguration;
  NegativeValueConfiguration?: NegativeValueConfiguration;
  NullValueFormatConfiguration?: NullValueFormatConfiguration;
}
export interface NumericFormatConfiguration {
  NumberDisplayFormatConfiguration?: NumberDisplayFormatConfiguration;
  CurrencyDisplayFormatConfiguration?: CurrencyDisplayFormatConfiguration;
  PercentageDisplayFormatConfiguration?: PercentageDisplayFormatConfiguration;
}
export interface NumberFormatConfiguration {
  FormatConfiguration?: NumericFormatConfiguration;
}
export interface NumericalDimensionField {
  FieldId: string;
  Column: ColumnIdentifier;
  HierarchyId?: string;
  FormatConfiguration?: NumberFormatConfiguration;
}
export interface StringFormatConfiguration {
  NullValueFormatConfiguration?: NullValueFormatConfiguration;
  NumericFormatConfiguration?: NumericFormatConfiguration;
}
export interface CategoricalDimensionField {
  FieldId: string;
  Column: ColumnIdentifier;
  HierarchyId?: string;
  FormatConfiguration?: StringFormatConfiguration;
}
export interface DateTimeFormatConfiguration {
  DateTimeFormat?: string;
  NullValueFormatConfiguration?: NullValueFormatConfiguration;
  NumericFormatConfiguration?: NumericFormatConfiguration;
}
export interface DateDimensionField {
  FieldId: string;
  Column: ColumnIdentifier;
  DateGranularity?: TimeGranularity;
  HierarchyId?: string;
  FormatConfiguration?: DateTimeFormatConfiguration;
}
export interface DimensionField {
  NumericalDimensionField?: NumericalDimensionField;
  CategoricalDimensionField?: CategoricalDimensionField;
  DateDimensionField?: DateDimensionField;
}
export type DimensionFieldList = DimensionField[];
export interface NumericalMeasureField {
  FieldId: string;
  Column: ColumnIdentifier;
  AggregationFunction?: NumericalAggregationFunction;
  FormatConfiguration?: NumberFormatConfiguration;
}
export interface CategoricalMeasureField {
  FieldId: string;
  Column: ColumnIdentifier;
  AggregationFunction?: CategoricalAggregationFunction;
  FormatConfiguration?: StringFormatConfiguration;
}
export interface DateMeasureField {
  FieldId: string;
  Column: ColumnIdentifier;
  AggregationFunction?: DateAggregationFunction;
  FormatConfiguration?: DateTimeFormatConfiguration;
}
export interface CalculatedMeasureField {
  FieldId: string;
  Expression: string | redacted.Redacted<string>;
}
export interface MeasureField {
  NumericalMeasureField?: NumericalMeasureField;
  CategoricalMeasureField?: CategoricalMeasureField;
  DateMeasureField?: DateMeasureField;
  CalculatedMeasureField?: CalculatedMeasureField;
}
export type MeasureFieldList = MeasureField[];
export interface TableAggregatedFieldWells {
  GroupBy?: DimensionField[];
  Values?: MeasureField[];
}
export interface FormatConfiguration {
  StringFormatConfiguration?: StringFormatConfiguration;
  NumberFormatConfiguration?: NumberFormatConfiguration;
  DateTimeFormatConfiguration?: DateTimeFormatConfiguration;
}
export interface UnaggregatedField {
  FieldId: string;
  Column: ColumnIdentifier;
  FormatConfiguration?: FormatConfiguration;
}
export type TableUnaggregatedFieldList = UnaggregatedField[];
export interface TableUnaggregatedFieldWells {
  Values?: UnaggregatedField[];
}
export interface TableFieldWells {
  TableAggregatedFieldWells?: TableAggregatedFieldWells;
  TableUnaggregatedFieldWells?: TableUnaggregatedFieldWells;
}
export interface FieldSort {
  FieldId: string;
  Direction: SortDirection;
}
export interface ColumnSort {
  SortBy: ColumnIdentifier;
  Direction: SortDirection;
  AggregationFunction?: AggregationFunction;
}
export interface FieldSortOptions {
  FieldSort?: FieldSort;
  ColumnSort?: ColumnSort;
}
export type RowSortList = FieldSortOptions[];
export type PageNumber = number;
export interface PaginationConfiguration {
  PageSize: number;
  PageNumber: number;
}
export interface TableSortConfiguration {
  RowSort?: FieldSortOptions[];
  PaginationConfiguration?: PaginationConfiguration;
}
export type TableOrientation = "VERTICAL" | "HORIZONTAL" | (string & {});
export type TextWrap = "NONE" | "WRAP" | (string & {});
export type HorizontalTextAlignment =
  | "LEFT"
  | "CENTER"
  | "RIGHT"
  | "AUTO"
  | (string & {});
export type VerticalTextAlignment =
  | "TOP"
  | "MIDDLE"
  | "BOTTOM"
  | "AUTO"
  | (string & {});
export type TableFieldHeight = number;
export type TableBorderThickness = number;
export type TableBorderStyle = "NONE" | "SOLID" | (string & {});
export interface TableBorderOptions {
  Color?: string;
  Thickness?: number;
  Style?: TableBorderStyle;
}
export interface TableSideBorderOptions {
  InnerVertical?: TableBorderOptions;
  InnerHorizontal?: TableBorderOptions;
  Left?: TableBorderOptions;
  Right?: TableBorderOptions;
  Top?: TableBorderOptions;
  Bottom?: TableBorderOptions;
}
export interface GlobalTableBorderOptions {
  UniformBorder?: TableBorderOptions;
  SideSpecificBorder?: TableSideBorderOptions;
}
export interface TableCellStyle {
  Visibility?: Visibility;
  FontConfiguration?: FontConfiguration;
  TextWrap?: TextWrap;
  HorizontalTextAlignment?: HorizontalTextAlignment;
  VerticalTextAlignment?: VerticalTextAlignment;
  BackgroundColor?: string;
  Height?: number;
  Border?: GlobalTableBorderOptions;
}
export type WidgetStatus = "ENABLED" | "DISABLED" | (string & {});
export type RowAlternateColorList = string[];
export interface RowAlternateColorOptions {
  Status?: WidgetStatus;
  RowAlternateColors?: string[];
  UsePrimaryBackgroundColor?: WidgetStatus;
}
export interface TableOptions {
  Orientation?: TableOrientation;
  HeaderStyle?: TableCellStyle;
  CellStyle?: TableCellStyle;
  RowAlternateColorOptions?: RowAlternateColorOptions;
}
export type TableTotalsPlacement = "START" | "END" | "AUTO" | (string & {});
export type TableTotalsScrollStatus = "PINNED" | "SCROLLED" | (string & {});
export type SimpleTotalAggregationFunction =
  | "DEFAULT"
  | "SUM"
  | "AVERAGE"
  | "MIN"
  | "MAX"
  | "NONE"
  | (string & {});
export interface TotalAggregationFunction {
  SimpleTotalAggregationFunction?: SimpleTotalAggregationFunction;
}
export interface TotalAggregationOption {
  FieldId: string;
  TotalAggregationFunction: TotalAggregationFunction;
}
export type TotalAggregationOptionList = TotalAggregationOption[];
export interface TotalOptions {
  TotalsVisibility?: Visibility;
  Placement?: TableTotalsPlacement;
  ScrollStatus?: TableTotalsScrollStatus;
  CustomLabel?: string;
  TotalCellStyle?: TableCellStyle;
  TotalAggregationOptions?: TotalAggregationOption[];
}
export type CustomLabel = string;
export type URLTargetConfiguration =
  | "NEW_TAB"
  | "NEW_WINDOW"
  | "SAME_TAB"
  | (string & {});
export interface TableFieldCustomTextContent {
  Value?: string;
  FontConfiguration: FontConfiguration;
}
export type TableFieldIconSetType = "LINK" | (string & {});
export interface TableFieldCustomIconContent {
  Icon?: TableFieldIconSetType;
}
export interface TableFieldLinkContentConfiguration {
  CustomTextContent?: TableFieldCustomTextContent;
  CustomIconContent?: TableFieldCustomIconContent;
}
export interface TableFieldLinkConfiguration {
  Target: URLTargetConfiguration;
  Content: TableFieldLinkContentConfiguration;
}
export type TableCellImageScalingConfiguration =
  | "FIT_TO_CELL_HEIGHT"
  | "FIT_TO_CELL_WIDTH"
  | "DO_NOT_SCALE"
  | (string & {});
export interface TableCellImageSizingConfiguration {
  TableCellImageScalingConfiguration?: TableCellImageScalingConfiguration;
}
export interface TableFieldImageConfiguration {
  SizingOptions?: TableCellImageSizingConfiguration;
}
export interface TableFieldURLConfiguration {
  LinkConfiguration?: TableFieldLinkConfiguration;
  ImageConfiguration?: TableFieldImageConfiguration;
}
export interface TableFieldOption {
  FieldId: string;
  Width?: string;
  CustomLabel?: string;
  Visibility?: Visibility;
  URLStyling?: TableFieldURLConfiguration;
}
export type TableFieldOptionList = TableFieldOption[];
export type FieldOrderList = string[];
export type TableFieldOrderList = string[];
export interface TablePinnedFieldOptions {
  PinnedLeftFields?: string[];
}
export type TransposedColumnIndex = number;
export type TransposedColumnType =
  | "ROW_HEADER_COLUMN"
  | "VALUE_COLUMN"
  | (string & {});
export interface TransposedTableOption {
  ColumnIndex?: number;
  ColumnWidth?: string;
  ColumnType: TransposedColumnType;
}
export type TransposedTableOptionList = TransposedTableOption[];
export interface TableFieldOptions {
  SelectedFieldOptions?: TableFieldOption[];
  Order?: string[];
  PinnedFieldOptions?: TablePinnedFieldOptions;
  TransposedTableOptions?: TransposedTableOption[];
}
export interface TablePaginatedReportOptions {
  VerticalOverflowVisibility?: Visibility;
  OverflowColumnHeaderVisibility?: Visibility;
}
export interface DataBarsOptions {
  FieldId: string;
  PositiveColor?: string;
  NegativeColor?: string;
}
export type SparklineAxisBehavior = "SHARED" | "INDEPENDENT" | (string & {});
export type SparklineVisualType = "LINE" | "AREA_LINE" | (string & {});
export type LineInterpolation = "LINEAR" | "SMOOTH" | "STEPPED" | (string & {});
export type LineChartMarkerShape =
  | "CIRCLE"
  | "TRIANGLE"
  | "SQUARE"
  | "DIAMOND"
  | "ROUNDED_SQUARE"
  | (string & {});
export interface LineChartMarkerStyleSettings {
  MarkerVisibility?: Visibility;
  MarkerShape?: LineChartMarkerShape;
  MarkerSize?: string;
  MarkerColor?: string;
}
export interface SparklinesOptions {
  FieldId: string;
  XAxisField: DimensionField;
  YAxisBehavior?: SparklineAxisBehavior;
  VisualType?: SparklineVisualType;
  LineColor?: string;
  LineInterpolation?: LineInterpolation;
  AllPointsMarker?: LineChartMarkerStyleSettings;
  MaxValueMarker?: LineChartMarkerStyleSettings;
  MinValueMarker?: LineChartMarkerStyleSettings;
}
export interface TableInlineVisualization {
  DataBars?: DataBarsOptions;
  Sparklines?: SparklinesOptions;
}
export type TableInlineVisualizationList = TableInlineVisualization[];
export type SelectedTooltipType =
  | "BASIC"
  | "DETAILED"
  | "SHEET"
  | (string & {});
export type TooltipTitleType = "NONE" | "PRIMARY_VALUE" | (string & {});
export type TooltipTarget = "BOTH" | "BAR" | "LINE" | (string & {});
export interface FieldTooltipItem {
  FieldId: string;
  Label?: string;
  Visibility?: Visibility;
  TooltipTarget?: TooltipTarget;
}
export interface ColumnTooltipItem {
  Column: ColumnIdentifier;
  Label?: string;
  Visibility?: Visibility;
  Aggregation?: AggregationFunction;
  TooltipTarget?: TooltipTarget;
}
export interface TooltipItem {
  FieldTooltipItem?: FieldTooltipItem;
  ColumnTooltipItem?: ColumnTooltipItem;
}
export type TooltipItemList = TooltipItem[];
export interface FieldBasedTooltip {
  AggregationVisibility?: Visibility;
  TooltipTitleType?: TooltipTitleType;
  TooltipFields?: TooltipItem[];
}
export interface SheetTooltip {
  SheetId?: string;
}
export interface TooltipOptions {
  TooltipVisibility?: Visibility;
  SelectedTooltipType?: SelectedTooltipType;
  FieldBasedTooltip?: FieldBasedTooltip;
  SheetTooltip?: SheetTooltip;
}
export type DashboardCustomizationStatus =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export type VisualCustomizationAdditionalFieldsList = ColumnIdentifier[];
export interface VisualCustomizationFieldsConfiguration {
  Status?: DashboardCustomizationStatus;
  AdditionalFields?: ColumnIdentifier[];
}
export interface DashboardCustomizationVisualOptions {
  FieldsConfiguration?: VisualCustomizationFieldsConfiguration;
}
export type DashboardBehavior = "ENABLED" | "DISABLED" | (string & {});
export interface VisualMenuOption {
  AvailabilityStatus?: DashboardBehavior;
}
export interface ContextMenuOption {
  AvailabilityStatus?: DashboardBehavior;
}
export interface VisualInteractionOptions {
  VisualMenuOption?: VisualMenuOption;
  ContextMenuOption?: ContextMenuOption;
}
export interface TableConfiguration {
  FieldWells?: TableFieldWells;
  SortConfiguration?: TableSortConfiguration;
  TableOptions?: TableOptions;
  TotalOptions?: TotalOptions;
  FieldOptions?: TableFieldOptions;
  PaginatedReportOptions?: TablePaginatedReportOptions;
  TableInlineVisualizations?: TableInlineVisualization[];
  Tooltip?: TooltipOptions;
  DashboardCustomizationVisualOptions?: DashboardCustomizationVisualOptions;
  Interactions?: VisualInteractionOptions;
}
export interface ConditionalFormattingSolidColor {
  Expression: string | redacted.Redacted<string>;
  Color?: string;
}
export interface GradientStop {
  GradientOffset: number;
  DataValue?: number;
  Color?: string;
}
export type GradientStopList = GradientStop[];
export interface GradientColor {
  Stops?: GradientStop[];
}
export interface ConditionalFormattingGradientColor {
  Expression: string | redacted.Redacted<string>;
  Color: GradientColor;
}
export interface ConditionalFormattingColor {
  Solid?: ConditionalFormattingSolidColor;
  Gradient?: ConditionalFormattingGradientColor;
}
export type ConditionalFormattingIconSetType =
  | "PLUS_MINUS"
  | "CHECK_X"
  | "THREE_COLOR_ARROW"
  | "THREE_GRAY_ARROW"
  | "CARET_UP_MINUS_DOWN"
  | "THREE_SHAPE"
  | "THREE_CIRCLE"
  | "FLAGS"
  | "BARS"
  | "FOUR_COLOR_ARROW"
  | "FOUR_GRAY_ARROW"
  | (string & {});
export interface ConditionalFormattingIconSet {
  Expression: string | redacted.Redacted<string>;
  IconSetType?: ConditionalFormattingIconSetType;
}
export type Icon =
  | "CARET_UP"
  | "CARET_DOWN"
  | "PLUS"
  | "MINUS"
  | "ARROW_UP"
  | "ARROW_DOWN"
  | "ARROW_LEFT"
  | "ARROW_UP_LEFT"
  | "ARROW_DOWN_LEFT"
  | "ARROW_RIGHT"
  | "ARROW_UP_RIGHT"
  | "ARROW_DOWN_RIGHT"
  | "FACE_UP"
  | "FACE_DOWN"
  | "FACE_FLAT"
  | "ONE_BAR"
  | "TWO_BAR"
  | "THREE_BAR"
  | "CIRCLE"
  | "TRIANGLE"
  | "SQUARE"
  | "FLAG"
  | "THUMBS_UP"
  | "THUMBS_DOWN"
  | "CHECKMARK"
  | "X"
  | (string & {});
export type UnicodeIcon = string;
export interface ConditionalFormattingCustomIconOptions {
  Icon?: Icon;
  UnicodeIcon?: string;
}
export type ConditionalFormattingIconDisplayOption =
  | "ICON_ONLY"
  | (string & {});
export interface ConditionalFormattingIconDisplayConfiguration {
  IconDisplayOption?: ConditionalFormattingIconDisplayOption;
}
export interface ConditionalFormattingCustomIconCondition {
  Expression: string | redacted.Redacted<string>;
  IconOptions: ConditionalFormattingCustomIconOptions;
  Color?: string;
  DisplayConfiguration?: ConditionalFormattingIconDisplayConfiguration;
}
export interface ConditionalFormattingIcon {
  IconSet?: ConditionalFormattingIconSet;
  CustomCondition?: ConditionalFormattingCustomIconCondition;
}
export interface TextConditionalFormat {
  BackgroundColor?: ConditionalFormattingColor;
  TextColor?: ConditionalFormattingColor;
  Icon?: ConditionalFormattingIcon;
}
export interface TableCellConditionalFormatting {
  FieldId: string;
  TextFormat?: TextConditionalFormat;
}
export interface TableRowConditionalFormatting {
  BackgroundColor?: ConditionalFormattingColor;
  TextColor?: ConditionalFormattingColor;
}
export interface TableConditionalFormattingOption {
  Cell?: TableCellConditionalFormatting;
  Row?: TableRowConditionalFormatting;
}
export type TableConditionalFormattingOptionList =
  TableConditionalFormattingOption[];
export interface TableConditionalFormatting {
  ConditionalFormattingOptions?: TableConditionalFormattingOption[];
}
export type VisualCustomActionName = string;
export type VisualCustomActionTrigger =
  | "DATA_POINT_CLICK"
  | "DATA_POINT_MENU"
  | (string & {});
export type SelectedFieldList = string[];
export type SelectedFieldOptions = "ALL_FIELDS" | (string & {});
export type CustomActionColumnList = ColumnIdentifier[];
export interface FilterOperationSelectedFieldsConfiguration {
  SelectedFields?: string[];
  SelectedFieldOptions?: SelectedFieldOptions;
  SelectedColumns?: ColumnIdentifier[];
}
export type TargetVisualList = string[];
export type TargetVisualOptions = "ALL_VISUALS" | (string & {});
export interface SameSheetTargetVisualConfiguration {
  TargetVisuals?: string[];
  TargetVisualOptions?: TargetVisualOptions;
}
export interface FilterOperationTargetVisualsConfiguration {
  SameSheetTargetVisualConfiguration?: SameSheetTargetVisualConfiguration;
}
export interface CustomActionFilterOperation {
  SelectedFieldsConfiguration: FilterOperationSelectedFieldsConfiguration;
  TargetVisualsConfiguration: FilterOperationTargetVisualsConfiguration;
}
export interface LocalNavigationConfiguration {
  TargetSheetId: string;
}
export interface CustomActionNavigationOperation {
  LocalNavigationConfiguration?: LocalNavigationConfiguration;
}
export type URLOperationTemplate = string;
export interface CustomActionURLOperation {
  URLTemplate: string;
  URLTarget: URLTargetConfiguration;
}
export type SensitiveStringObject = string | redacted.Redacted<string>;
export type StringDefaultValueList = (string | redacted.Redacted<string>)[];
export type SensitiveLongObject = number;
export type IntegerDefaultValueList = number[];
export type SensitiveDoubleObject = number;
export type DecimalDefaultValueList = number[];
export type DateTimeDefaultValueList = Date[];
export interface CustomParameterValues {
  StringValues?: (string | redacted.Redacted<string>)[];
  IntegerValues?: number[];
  DecimalValues?: number[];
  DateTimeValues?: Date[];
}
export interface CustomValuesConfiguration {
  IncludeNullValue?: boolean;
  CustomValues: CustomParameterValues;
}
export type SelectAllValueOptions = "ALL_VALUES" | (string & {});
export interface DestinationParameterValueConfiguration {
  CustomValuesConfiguration?: CustomValuesConfiguration;
  SelectAllValueOptions?: SelectAllValueOptions;
  SourceParameterName?: string;
  SourceField?: string;
  SourceColumn?: ColumnIdentifier;
}
export interface SetParameterValueConfiguration {
  DestinationParameterName: string;
  Value: DestinationParameterValueConfiguration;
}
export type SetParameterValueConfigurationList =
  SetParameterValueConfiguration[];
export interface CustomActionSetParametersOperation {
  ParameterValueConfigurations: SetParameterValueConfiguration[];
}
export interface VisualCustomActionOperation {
  FilterOperation?: CustomActionFilterOperation;
  NavigationOperation?: CustomActionNavigationOperation;
  URLOperation?: CustomActionURLOperation;
  SetParametersOperation?: CustomActionSetParametersOperation;
}
export type VisualCustomActionOperationList = VisualCustomActionOperation[];
export interface VisualCustomAction {
  CustomActionId: string;
  Name: string;
  Status?: WidgetStatus;
  Trigger: VisualCustomActionTrigger;
  ActionOperations: VisualCustomActionOperation[];
}
export type VisualCustomActionList = VisualCustomAction[];
export interface TableVisual {
  VisualId: string;
  Title?: VisualTitleLabelOptions;
  Subtitle?: VisualSubtitleLabelOptions;
  ChartConfiguration?: TableConfiguration;
  ConditionalFormatting?: TableConditionalFormatting;
  Actions?: VisualCustomAction[];
  VisualContentAltText?: string;
}
export type PivotTableDimensionList = DimensionField[];
export type PivotMeasureFieldList = MeasureField[];
export interface PivotTableAggregatedFieldWells {
  Rows?: DimensionField[];
  Columns?: DimensionField[];
  Values?: MeasureField[];
}
export interface PivotTableFieldWells {
  PivotTableAggregatedFieldWells?: PivotTableAggregatedFieldWells;
}
export type FieldValue = string | redacted.Redacted<string>;
export type PivotTableDataPathType =
  | "HIERARCHY_ROWS_LAYOUT_COLUMN"
  | "MULTIPLE_ROW_METRICS_COLUMN"
  | "EMPTY_COLUMN_HEADER"
  | "COUNT_METRIC_COLUMN"
  | (string & {});
export interface DataPathType {
  PivotTableDataPathType?: PivotTableDataPathType;
}
export interface DataPathValue {
  FieldId?: string;
  FieldValue?: string | redacted.Redacted<string>;
  DataPathType?: DataPathType;
}
export type DataPathValueList = DataPathValue[];
export interface DataPathSort {
  Direction: SortDirection;
  SortPaths: DataPathValue[];
}
export interface PivotTableSortBy {
  Field?: FieldSort;
  Column?: ColumnSort;
  DataPath?: DataPathSort;
}
export interface PivotFieldSortOptions {
  FieldId: string;
  SortBy: PivotTableSortBy;
}
export type PivotFieldSortOptionsList = PivotFieldSortOptions[];
export interface PivotTableSortConfiguration {
  FieldSortOptions?: PivotFieldSortOptions[];
}
export type PivotTableMetricPlacement = "ROW" | "COLUMN" | (string & {});
export type PivotTableRowsLayout = "TABULAR" | "HIERARCHY" | (string & {});
export type PivotTableRowsLabelText = string;
export interface PivotTableRowsLabelOptions {
  Visibility?: Visibility;
  CustomLabel?: string;
}
export interface PivotTableOptions {
  MetricPlacement?: PivotTableMetricPlacement;
  SingleMetricVisibility?: Visibility;
  ColumnNamesVisibility?: Visibility;
  ToggleButtonsVisibility?: Visibility;
  ColumnHeaderStyle?: TableCellStyle;
  RowHeaderStyle?: TableCellStyle;
  CellStyle?: TableCellStyle;
  RowFieldNamesStyle?: TableCellStyle;
  RowAlternateColorOptions?: RowAlternateColorOptions;
  CollapsedRowDimensionsVisibility?: Visibility;
  RowsLayout?: PivotTableRowsLayout;
  RowsLabelOptions?: PivotTableRowsLabelOptions;
  DefaultCellWidth?: string;
}
export type PivotTableSubtotalLevel = "ALL" | "CUSTOM" | "LAST" | (string & {});
export interface PivotTableFieldSubtotalOptions {
  FieldId?: string;
}
export type PivotTableFieldSubtotalOptionsList =
  PivotTableFieldSubtotalOptions[];
export type StyledCellType =
  | "TOTAL"
  | "METRIC_HEADER"
  | "VALUE"
  | (string & {});
export interface TableStyleTarget {
  CellType: StyledCellType;
}
export type TableStyleTargetList = TableStyleTarget[];
export interface SubtotalOptions {
  TotalsVisibility?: Visibility;
  CustomLabel?: string;
  FieldLevel?: PivotTableSubtotalLevel;
  FieldLevelOptions?: PivotTableFieldSubtotalOptions[];
  TotalCellStyle?: TableCellStyle;
  ValueCellStyle?: TableCellStyle;
  MetricHeaderCellStyle?: TableCellStyle;
  StyleTargets?: TableStyleTarget[];
}
export interface PivotTotalOptions {
  TotalsVisibility?: Visibility;
  Placement?: TableTotalsPlacement;
  ScrollStatus?: TableTotalsScrollStatus;
  CustomLabel?: string;
  TotalCellStyle?: TableCellStyle;
  ValueCellStyle?: TableCellStyle;
  MetricHeaderCellStyle?: TableCellStyle;
  TotalAggregationOptions?: TotalAggregationOption[];
}
export interface PivotTableTotalOptions {
  RowSubtotalOptions?: SubtotalOptions;
  ColumnSubtotalOptions?: SubtotalOptions;
  RowTotalOptions?: PivotTotalOptions;
  ColumnTotalOptions?: PivotTotalOptions;
}
export interface PivotTableFieldOption {
  FieldId: string;
  CustomLabel?: string;
  Visibility?: Visibility;
}
export type PivotTableFieldOptionList = PivotTableFieldOption[];
export interface PivotTableDataPathOption {
  DataPathList: DataPathValue[];
  Width?: string;
}
export type PivotTableDataPathOptionList = PivotTableDataPathOption[];
export interface PivotTableFieldCollapseStateTarget {
  FieldId?: string;
  FieldDataPathValues?: DataPathValue[];
}
export type PivotTableFieldCollapseState =
  | "COLLAPSED"
  | "EXPANDED"
  | (string & {});
export interface PivotTableFieldCollapseStateOption {
  Target: PivotTableFieldCollapseStateTarget;
  State?: PivotTableFieldCollapseState;
}
export type PivotTableFieldCollapseStateOptionList =
  PivotTableFieldCollapseStateOption[];
export interface PivotTableFieldOptions {
  SelectedFieldOptions?: PivotTableFieldOption[];
  DataPathOptions?: PivotTableDataPathOption[];
  CollapseStateOptions?: PivotTableFieldCollapseStateOption[];
}
export interface PivotTablePaginatedReportOptions {
  VerticalOverflowVisibility?: Visibility;
  OverflowColumnHeaderVisibility?: Visibility;
}
export interface PivotTableConfiguration {
  FieldWells?: PivotTableFieldWells;
  SortConfiguration?: PivotTableSortConfiguration;
  TableOptions?: PivotTableOptions;
  TotalOptions?: PivotTableTotalOptions;
  FieldOptions?: PivotTableFieldOptions;
  PaginatedReportOptions?: PivotTablePaginatedReportOptions;
  Tooltip?: TooltipOptions;
  DashboardCustomizationVisualOptions?: DashboardCustomizationVisualOptions;
  Interactions?: VisualInteractionOptions;
}
export type PivotTableConditionalFormattingScopeRole =
  | "FIELD"
  | "FIELD_TOTAL"
  | "GRAND_TOTAL"
  | (string & {});
export interface PivotTableConditionalFormattingScope {
  Role?: PivotTableConditionalFormattingScopeRole;
}
export type PivotTableConditionalFormattingScopeList =
  PivotTableConditionalFormattingScope[];
export interface PivotTableCellConditionalFormatting {
  FieldId: string;
  TextFormat?: TextConditionalFormat;
  Scope?: PivotTableConditionalFormattingScope;
  Scopes?: PivotTableConditionalFormattingScope[];
}
export interface PivotTableConditionalFormattingOption {
  Cell?: PivotTableCellConditionalFormatting;
}
export type PivotTableConditionalFormattingOptionList =
  PivotTableConditionalFormattingOption[];
export interface PivotTableConditionalFormatting {
  ConditionalFormattingOptions?: PivotTableConditionalFormattingOption[];
}
export interface PivotTableVisual {
  VisualId: string;
  Title?: VisualTitleLabelOptions;
  Subtitle?: VisualSubtitleLabelOptions;
  ChartConfiguration?: PivotTableConfiguration;
  ConditionalFormatting?: PivotTableConditionalFormatting;
  Actions?: VisualCustomAction[];
  VisualContentAltText?: string;
}
export type SmallMultiplesDimensionFieldList = DimensionField[];
export interface BarChartAggregatedFieldWells {
  Category?: DimensionField[];
  Values?: MeasureField[];
  Colors?: DimensionField[];
  SmallMultiples?: DimensionField[];
}
export interface BarChartFieldWells {
  BarChartAggregatedFieldWells?: BarChartAggregatedFieldWells;
}
export type FieldSortOptionsList = FieldSortOptions[];
export type OtherCategories = "INCLUDE" | "EXCLUDE" | (string & {});
export interface ItemsLimitConfiguration {
  ItemsLimit?: number;
  OtherCategories?: OtherCategories;
}
export interface BarChartSortConfiguration {
  CategorySort?: FieldSortOptions[];
  CategoryItemsLimit?: ItemsLimitConfiguration;
  ColorSort?: FieldSortOptions[];
  ColorItemsLimit?: ItemsLimitConfiguration;
  SmallMultiplesSort?: FieldSortOptions[];
  SmallMultiplesLimitConfiguration?: ItemsLimitConfiguration;
}
export type BarChartOrientation = "HORIZONTAL" | "VERTICAL" | (string & {});
export type BarsArrangement =
  | "CLUSTERED"
  | "STACKED"
  | "STACKED_PERCENT"
  | (string & {});
export interface DataPathColor {
  Element: DataPathValue;
  Color: string;
  TimeGranularity?: TimeGranularity;
}
export type DataPathColorList = DataPathColor[];
export interface VisualPalette {
  ChartColor?: string;
  ColorMap?: DataPathColor[];
}
export type VisiblePanelRows = number;
export type VisiblePanelColumns = number;
export interface PanelTitleOptions {
  Visibility?: Visibility;
  FontConfiguration?: FontConfiguration;
  HorizontalTextAlignment?: HorizontalTextAlignment;
}
export type PanelBorderStyle = "SOLID" | "DASHED" | "DOTTED" | (string & {});
export type HexColorWithTransparency = string;
export interface PanelConfiguration {
  Title?: PanelTitleOptions;
  BorderVisibility?: Visibility;
  BorderThickness?: string;
  BorderStyle?: PanelBorderStyle;
  BorderColor?: string;
  GutterVisibility?: Visibility;
  GutterSpacing?: string;
  BackgroundVisibility?: Visibility;
  BackgroundColor?: string;
}
export type SmallMultiplesAxisScale = "SHARED" | "INDEPENDENT" | (string & {});
export type SmallMultiplesAxisPlacement = "OUTSIDE" | "INSIDE" | (string & {});
export interface SmallMultiplesAxisProperties {
  Scale?: SmallMultiplesAxisScale;
  Placement?: SmallMultiplesAxisPlacement;
}
export interface SmallMultiplesOptions {
  MaxVisibleRows?: number;
  MaxVisibleColumns?: number;
  PanelConfiguration?: PanelConfiguration;
  XAxis?: SmallMultiplesAxisProperties;
  YAxis?: SmallMultiplesAxisProperties;
}
export interface AxisTickLabelOptions {
  LabelOptions?: LabelOptions;
  RotationAngle?: number;
}
export interface AxisLinearScale {
  StepCount?: number;
  StepSize?: number;
}
export interface AxisLogarithmicScale {
  Base?: number;
}
export interface AxisScale {
  Linear?: AxisLinearScale;
  Logarithmic?: AxisLogarithmicScale;
}
export interface AxisDisplayMinMaxRange {
  Minimum?: number;
  Maximum?: number;
}
export interface AxisDisplayDataDrivenRange {}
export interface AxisDisplayRange {
  MinMax?: AxisDisplayMinMaxRange;
  DataDriven?: AxisDisplayDataDrivenRange;
}
export interface NumericAxisOptions {
  Scale?: AxisScale;
  Range?: AxisDisplayRange;
}
export interface DateAxisOptions {
  MissingDateVisibility?: Visibility;
}
export interface AxisDataOptions {
  NumericAxisOptions?: NumericAxisOptions;
  DateAxisOptions?: DateAxisOptions;
}
export type PercentNumber = number;
export interface PercentVisibleRange {
  From?: number;
  To?: number;
}
export interface VisibleRangeOptions {
  PercentRange?: PercentVisibleRange;
}
export interface ScrollBarOptions {
  Visibility?: Visibility;
  VisibleRange?: VisibleRangeOptions;
}
export interface AxisDisplayOptions {
  TickLabelOptions?: AxisTickLabelOptions;
  AxisLineVisibility?: Visibility;
  GridLineVisibility?: Visibility;
  DataOptions?: AxisDataOptions;
  ScrollbarOptions?: ScrollBarOptions;
  AxisOffset?: string;
}
export interface AxisLabelReferenceOptions {
  FieldId: string;
  Column: ColumnIdentifier;
}
export interface AxisLabelOptions {
  FontConfiguration?: FontConfiguration;
  CustomLabel?: string;
  ApplyTo?: AxisLabelReferenceOptions;
}
export type AxisLabelOptionsList = AxisLabelOptions[];
export interface ChartAxisLabelOptions {
  Visibility?: Visibility;
  SortIconVisibility?: Visibility;
  AxisLabelOptions?: AxisLabelOptions[];
}
export type ElementValue = string;
export type DecalPatternType =
  | "SOLID"
  | "DIAGONAL_MEDIUM"
  | "CIRCLE_MEDIUM"
  | "DIAMOND_GRID_MEDIUM"
  | "CHECKERBOARD_MEDIUM"
  | "TRIANGLE_MEDIUM"
  | "DIAGONAL_OPPOSITE_MEDIUM"
  | "DIAMOND_MEDIUM"
  | "DIAGONAL_LARGE"
  | "CIRCLE_LARGE"
  | "DIAMOND_GRID_LARGE"
  | "CHECKERBOARD_LARGE"
  | "TRIANGLE_LARGE"
  | "DIAGONAL_OPPOSITE_LARGE"
  | "DIAMOND_LARGE"
  | "DIAGONAL_SMALL"
  | "CIRCLE_SMALL"
  | "DIAMOND_GRID_SMALL"
  | "CHECKERBOARD_SMALL"
  | "TRIANGLE_SMALL"
  | "DIAGONAL_OPPOSITE_SMALL"
  | "DIAMOND_SMALL"
  | (string & {});
export type DecalStyleType = "Manual" | "Auto" | (string & {});
export interface DecalSettings {
  ElementValue?: string;
  DecalVisibility?: Visibility;
  DecalColor?: string;
  DecalPatternType?: DecalPatternType;
  DecalStyleType?: DecalStyleType;
}
export interface BorderSettings {
  BorderVisibility?: Visibility;
  BorderWidth?: string;
  BorderColor?: string;
}
export interface BarChartDefaultSeriesSettings {
  DecalSettings?: DecalSettings;
  BorderSettings?: BorderSettings;
}
export interface BarChartSeriesSettings {
  DecalSettings?: DecalSettings;
  BorderSettings?: BorderSettings;
}
export interface FieldBarSeriesItem {
  FieldId: string;
  Settings?: BarChartSeriesSettings;
}
export interface DataFieldBarSeriesItem {
  FieldId: string;
  FieldValue?: string | redacted.Redacted<string>;
  Settings?: BarChartSeriesSettings;
}
export interface BarSeriesItem {
  FieldBarSeriesItem?: FieldBarSeriesItem;
  DataFieldBarSeriesItem?: DataFieldBarSeriesItem;
}
export type BarSeriesItemList = BarSeriesItem[];
export type LegendPosition =
  | "AUTO"
  | "RIGHT"
  | "BOTTOM"
  | "TOP"
  | (string & {});
export interface LegendOptions {
  Visibility?: Visibility;
  Title?: LabelOptions;
  Position?: LegendPosition;
  Width?: string;
  Height?: string;
  ValueFontConfiguration?: FontConfiguration;
}
export interface FieldLabelType {
  FieldId?: string;
  Visibility?: Visibility;
}
export interface DataPathLabelType {
  FieldId?: string;
  FieldValue?: string | redacted.Redacted<string>;
  Visibility?: Visibility;
}
export interface RangeEndsLabelType {
  Visibility?: Visibility;
}
export interface MinimumLabelType {
  Visibility?: Visibility;
}
export interface MaximumLabelType {
  Visibility?: Visibility;
}
export interface DataLabelType {
  FieldLabelType?: FieldLabelType;
  DataPathLabelType?: DataPathLabelType;
  RangeEndsLabelType?: RangeEndsLabelType;
  MinimumLabelType?: MinimumLabelType;
  MaximumLabelType?: MaximumLabelType;
}
export type DataLabelTypes = DataLabelType[];
export type DataLabelPosition =
  | "INSIDE"
  | "OUTSIDE"
  | "LEFT"
  | "TOP"
  | "BOTTOM"
  | "RIGHT"
  | (string & {});
export type DataLabelContent =
  | "VALUE"
  | "PERCENT"
  | "VALUE_AND_PERCENT"
  | (string & {});
export type DataLabelOverlap =
  | "DISABLE_OVERLAP"
  | "ENABLE_OVERLAP"
  | (string & {});
export interface DataLabelOptions {
  Visibility?: Visibility;
  CategoryLabelVisibility?: Visibility;
  MeasureLabelVisibility?: Visibility;
  DataLabelTypes?: DataLabelType[];
  Position?: DataLabelPosition;
  LabelContent?: DataLabelContent;
  LabelFontConfiguration?: FontConfiguration;
  LabelColor?: string;
  Overlap?: DataLabelOverlap;
  TotalsVisibility?: Visibility;
}
export interface ReferenceLineStaticDataConfiguration {
  Value: number;
}
export interface ReferenceLineDynamicDataConfiguration {
  Column: ColumnIdentifier;
  MeasureAggregationFunction?: AggregationFunction;
  Calculation: NumericalAggregationFunction;
}
export type AxisBinding = "PRIMARY_YAXIS" | "SECONDARY_YAXIS" | (string & {});
export type ReferenceLineSeriesType = "BAR" | "LINE" | (string & {});
export interface ReferenceLineDataConfiguration {
  StaticConfiguration?: ReferenceLineStaticDataConfiguration;
  DynamicConfiguration?: ReferenceLineDynamicDataConfiguration;
  AxisBinding?: AxisBinding;
  SeriesType?: ReferenceLineSeriesType;
}
export type ReferenceLinePatternType =
  | "SOLID"
  | "DASHED"
  | "DOTTED"
  | (string & {});
export interface ReferenceLineStyleConfiguration {
  Pattern?: ReferenceLinePatternType;
  Color?: string;
}
export type ReferenceLineValueLabelRelativePosition =
  | "BEFORE_CUSTOM_LABEL"
  | "AFTER_CUSTOM_LABEL"
  | (string & {});
export interface ReferenceLineValueLabelConfiguration {
  RelativePosition?: ReferenceLineValueLabelRelativePosition;
  FormatConfiguration?: NumericFormatConfiguration;
}
export interface ReferenceLineCustomLabelConfiguration {
  CustomLabel: string;
}
export type ReferenceLineLabelHorizontalPosition =
  | "LEFT"
  | "CENTER"
  | "RIGHT"
  | (string & {});
export type ReferenceLineLabelVerticalPosition =
  | "ABOVE"
  | "BELOW"
  | (string & {});
export interface ReferenceLineLabelConfiguration {
  ValueLabelConfiguration?: ReferenceLineValueLabelConfiguration;
  CustomLabelConfiguration?: ReferenceLineCustomLabelConfiguration;
  FontConfiguration?: FontConfiguration;
  FontColor?: string;
  HorizontalPosition?: ReferenceLineLabelHorizontalPosition;
  VerticalPosition?: ReferenceLineLabelVerticalPosition;
}
export interface ReferenceLine {
  Status?: WidgetStatus;
  DataConfiguration: ReferenceLineDataConfiguration;
  StyleConfiguration?: ReferenceLineStyleConfiguration;
  LabelConfiguration?: ReferenceLineLabelConfiguration;
}
export type ReferenceLineList = ReferenceLine[];
export type ContributorDimensionList = ColumnIdentifier[];
export interface ContributionAnalysisDefault {
  MeasureFieldId: string;
  ContributorDimensions: ColumnIdentifier[];
}
export type ContributionAnalysisDefaultList = ContributionAnalysisDefault[];
export interface BarChartConfiguration {
  FieldWells?: BarChartFieldWells;
  SortConfiguration?: BarChartSortConfiguration;
  Orientation?: BarChartOrientation;
  BarsArrangement?: BarsArrangement;
  VisualPalette?: VisualPalette;
  SmallMultiplesOptions?: SmallMultiplesOptions;
  CategoryAxis?: AxisDisplayOptions;
  CategoryLabelOptions?: ChartAxisLabelOptions;
  ValueAxis?: AxisDisplayOptions;
  ValueLabelOptions?: ChartAxisLabelOptions;
  ColorLabelOptions?: ChartAxisLabelOptions;
  DefaultSeriesSettings?: BarChartDefaultSeriesSettings;
  Series?: BarSeriesItem[];
  Legend?: LegendOptions;
  DataLabels?: DataLabelOptions;
  Tooltip?: TooltipOptions;
  ReferenceLines?: ReferenceLine[];
  ContributionAnalysisDefaults?: ContributionAnalysisDefault[];
  Interactions?: VisualInteractionOptions;
}
export type ExplicitHierarchyColumnList = ColumnIdentifier[];
export interface NumericEqualityDrillDownFilter {
  Column: ColumnIdentifier;
  Value: number;
}
export type CategoryValue = string;
export type CategoryValueList = string[];
export interface CategoryDrillDownFilter {
  Column: ColumnIdentifier;
  CategoryValues: string[];
}
export interface TimeRangeDrillDownFilter {
  Column: ColumnIdentifier;
  RangeMinimum: Date;
  RangeMaximum: Date;
  TimeGranularity: TimeGranularity;
}
export interface DrillDownFilter {
  NumericEqualityFilter?: NumericEqualityDrillDownFilter;
  CategoryFilter?: CategoryDrillDownFilter;
  TimeRangeFilter?: TimeRangeDrillDownFilter;
}
export type DrillDownFilterList = DrillDownFilter[];
export interface ExplicitHierarchy {
  HierarchyId: string;
  Columns: ColumnIdentifier[];
  DrillDownFilters?: DrillDownFilter[];
}
export interface DateTimeHierarchy {
  HierarchyId: string;
  DrillDownFilters?: DrillDownFilter[];
}
export type PredefinedHierarchyColumnList = ColumnIdentifier[];
export interface PredefinedHierarchy {
  HierarchyId: string;
  Columns: ColumnIdentifier[];
  DrillDownFilters?: DrillDownFilter[];
}
export interface ColumnHierarchy {
  ExplicitHierarchy?: ExplicitHierarchy;
  DateTimeHierarchy?: DateTimeHierarchy;
  PredefinedHierarchy?: PredefinedHierarchy;
}
export type ColumnHierarchyList = ColumnHierarchy[];
export interface BarChartVisual {
  VisualId: string;
  Title?: VisualTitleLabelOptions;
  Subtitle?: VisualSubtitleLabelOptions;
  ChartConfiguration?: BarChartConfiguration;
  Actions?: VisualCustomAction[];
  ColumnHierarchies?: ColumnHierarchy[];
  VisualContentAltText?: string;
}
export interface KPIFieldWells {
  Values?: MeasureField[];
  TargetValues?: MeasureField[];
  TrendGroups?: DimensionField[];
}
export interface KPISortConfiguration {
  TrendGroupSort?: FieldSortOptions[];
}
export interface ProgressBarOptions {
  Visibility?: Visibility;
}
export interface TrendArrowOptions {
  Visibility?: Visibility;
}
export interface SecondaryValueOptions {
  Visibility?: Visibility;
}
export type ComparisonMethod =
  | "DIFFERENCE"
  | "PERCENT_DIFFERENCE"
  | "PERCENT"
  | (string & {});
export interface ComparisonFormatConfiguration {
  NumberDisplayFormatConfiguration?: NumberDisplayFormatConfiguration;
  PercentageDisplayFormatConfiguration?: PercentageDisplayFormatConfiguration;
}
export interface ComparisonConfiguration {
  ComparisonMethod?: ComparisonMethod;
  ComparisonFormat?: ComparisonFormatConfiguration;
}
export type PrimaryValueDisplayType =
  | "HIDDEN"
  | "COMPARISON"
  | "ACTUAL"
  | (string & {});
export type KPISparklineType = "LINE" | "AREA" | (string & {});
export interface KPISparklineOptions {
  Visibility?: Visibility;
  Type: KPISparklineType;
  Color?: string;
  TooltipVisibility?: Visibility;
}
export type KPIVisualStandardLayoutType =
  | "CLASSIC"
  | "VERTICAL"
  | (string & {});
export interface KPIVisualStandardLayout {
  Type: KPIVisualStandardLayoutType;
}
export interface KPIVisualLayoutOptions {
  StandardLayout?: KPIVisualStandardLayout;
}
export interface KPIOptions {
  ProgressBar?: ProgressBarOptions;
  TrendArrows?: TrendArrowOptions;
  SecondaryValue?: SecondaryValueOptions;
  Comparison?: ComparisonConfiguration;
  PrimaryValueDisplayType?: PrimaryValueDisplayType;
  PrimaryValueFontConfiguration?: FontConfiguration;
  SecondaryValueFontConfiguration?: FontConfiguration;
  Sparkline?: KPISparklineOptions;
  VisualLayoutOptions?: KPIVisualLayoutOptions;
}
export interface KPIConfiguration {
  FieldWells?: KPIFieldWells;
  SortConfiguration?: KPISortConfiguration;
  KPIOptions?: KPIOptions;
  Interactions?: VisualInteractionOptions;
}
export interface KPIPrimaryValueConditionalFormatting {
  TextColor?: ConditionalFormattingColor;
  Icon?: ConditionalFormattingIcon;
}
export interface KPIProgressBarConditionalFormatting {
  ForegroundColor?: ConditionalFormattingColor;
}
export interface KPIActualValueConditionalFormatting {
  TextColor?: ConditionalFormattingColor;
  Icon?: ConditionalFormattingIcon;
}
export interface KPIComparisonValueConditionalFormatting {
  TextColor?: ConditionalFormattingColor;
  Icon?: ConditionalFormattingIcon;
}
export interface KPIConditionalFormattingOption {
  PrimaryValue?: KPIPrimaryValueConditionalFormatting;
  ProgressBar?: KPIProgressBarConditionalFormatting;
  ActualValue?: KPIActualValueConditionalFormatting;
  ComparisonValue?: KPIComparisonValueConditionalFormatting;
}
export type KPIConditionalFormattingOptionList =
  KPIConditionalFormattingOption[];
export interface KPIConditionalFormatting {
  ConditionalFormattingOptions?: KPIConditionalFormattingOption[];
}
export interface KPIVisual {
  VisualId: string;
  Title?: VisualTitleLabelOptions;
  Subtitle?: VisualSubtitleLabelOptions;
  ChartConfiguration?: KPIConfiguration;
  ConditionalFormatting?: KPIConditionalFormatting;
  Actions?: VisualCustomAction[];
  ColumnHierarchies?: ColumnHierarchy[];
  VisualContentAltText?: string;
}
export interface PieChartAggregatedFieldWells {
  Category?: DimensionField[];
  Values?: MeasureField[];
  SmallMultiples?: DimensionField[];
}
export interface PieChartFieldWells {
  PieChartAggregatedFieldWells?: PieChartAggregatedFieldWells;
}
export interface PieChartSortConfiguration {
  CategorySort?: FieldSortOptions[];
  CategoryItemsLimit?: ItemsLimitConfiguration;
  SmallMultiplesSort?: FieldSortOptions[];
  SmallMultiplesLimitConfiguration?: ItemsLimitConfiguration;
}
export type ArcThickness =
  | "SMALL"
  | "MEDIUM"
  | "LARGE"
  | "WHOLE"
  | (string & {});
export interface ArcOptions {
  ArcThickness?: ArcThickness;
}
export interface DonutCenterOptions {
  LabelVisibility?: Visibility;
}
export interface DonutOptions {
  ArcOptions?: ArcOptions;
  DonutCenterOptions?: DonutCenterOptions;
}
export interface PieChartConfiguration {
  FieldWells?: PieChartFieldWells;
  SortConfiguration?: PieChartSortConfiguration;
  DonutOptions?: DonutOptions;
  SmallMultiplesOptions?: SmallMultiplesOptions;
  CategoryLabelOptions?: ChartAxisLabelOptions;
  ValueLabelOptions?: ChartAxisLabelOptions;
  Legend?: LegendOptions;
  DataLabels?: DataLabelOptions;
  Tooltip?: TooltipOptions;
  VisualPalette?: VisualPalette;
  ContributionAnalysisDefaults?: ContributionAnalysisDefault[];
  Interactions?: VisualInteractionOptions;
}
export interface PieChartVisual {
  VisualId: string;
  Title?: VisualTitleLabelOptions;
  Subtitle?: VisualSubtitleLabelOptions;
  ChartConfiguration?: PieChartConfiguration;
  Actions?: VisualCustomAction[];
  ColumnHierarchies?: ColumnHierarchy[];
  VisualContentAltText?: string;
}
export interface GaugeChartFieldWells {
  Values?: MeasureField[];
  TargetValues?: MeasureField[];
}
export interface ArcAxisDisplayRange {
  Min?: number;
  Max?: number;
}
export interface ArcAxisConfiguration {
  Range?: ArcAxisDisplayRange;
  ReserveRange?: number;
}
export type ArcThicknessOptions = "SMALL" | "MEDIUM" | "LARGE" | (string & {});
export interface ArcConfiguration {
  ArcAngle?: number;
  ArcThickness?: ArcThicknessOptions;
}
export interface GaugeChartOptions {
  PrimaryValueDisplayType?: PrimaryValueDisplayType;
  Comparison?: ComparisonConfiguration;
  ArcAxis?: ArcAxisConfiguration;
  Arc?: ArcConfiguration;
  PrimaryValueFontConfiguration?: FontConfiguration;
}
export interface GaugeChartColorConfiguration {
  ForegroundColor?: string;
  BackgroundColor?: string;
}
export interface GaugeChartConfiguration {
  FieldWells?: GaugeChartFieldWells;
  GaugeChartOptions?: GaugeChartOptions;
  DataLabels?: DataLabelOptions;
  TooltipOptions?: TooltipOptions;
  VisualPalette?: VisualPalette;
  ColorConfiguration?: GaugeChartColorConfiguration;
  Interactions?: VisualInteractionOptions;
}
export interface GaugeChartPrimaryValueConditionalFormatting {
  TextColor?: ConditionalFormattingColor;
  Icon?: ConditionalFormattingIcon;
}
export interface GaugeChartArcConditionalFormatting {
  ForegroundColor?: ConditionalFormattingColor;
}
export interface GaugeChartConditionalFormattingOption {
  PrimaryValue?: GaugeChartPrimaryValueConditionalFormatting;
  Arc?: GaugeChartArcConditionalFormatting;
}
export type GaugeChartConditionalFormattingOptionList =
  GaugeChartConditionalFormattingOption[];
export interface GaugeChartConditionalFormatting {
  ConditionalFormattingOptions?: GaugeChartConditionalFormattingOption[];
}
export interface GaugeChartVisual {
  VisualId: string;
  Title?: VisualTitleLabelOptions;
  Subtitle?: VisualSubtitleLabelOptions;
  ChartConfiguration?: GaugeChartConfiguration;
  ConditionalFormatting?: GaugeChartConditionalFormatting;
  Actions?: VisualCustomAction[];
  VisualContentAltText?: string;
}
export interface LineChartAggregatedFieldWells {
  Category?: DimensionField[];
  Values?: MeasureField[];
  Colors?: DimensionField[];
  SmallMultiples?: DimensionField[];
}
export interface LineChartFieldWells {
  LineChartAggregatedFieldWells?: LineChartAggregatedFieldWells;
}
export interface LineChartSortConfiguration {
  CategorySort?: FieldSortOptions[];
  CategoryItemsLimitConfiguration?: ItemsLimitConfiguration;
  ColorItemsLimitConfiguration?: ItemsLimitConfiguration;
  SmallMultiplesSort?: FieldSortOptions[];
  SmallMultiplesLimitConfiguration?: ItemsLimitConfiguration;
}
export type PeriodsForward = number;
export type PeriodsBackward = number;
export type PredictionInterval = number;
export type Seasonality = number;
export interface TimeBasedForecastProperties {
  PeriodsForward?: number;
  PeriodsBackward?: number;
  UpperBoundary?: number;
  LowerBoundary?: number;
  PredictionInterval?: number;
  Seasonality?: number;
}
export interface WhatIfPointScenario {
  Date: Date;
  Value: number;
}
export interface WhatIfRangeScenario {
  StartDate: Date;
  EndDate: Date;
  Value: number;
}
export interface ForecastScenario {
  WhatIfPointScenario?: WhatIfPointScenario;
  WhatIfRangeScenario?: WhatIfRangeScenario;
}
export interface ForecastConfiguration {
  ForecastProperties?: TimeBasedForecastProperties;
  Scenario?: ForecastScenario;
}
export type ForecastConfigurationList = ForecastConfiguration[];
export type LineChartType = "LINE" | "AREA" | "STACKED_AREA" | (string & {});
export type MissingDataTreatmentOption =
  | "INTERPOLATE"
  | "SHOW_AS_ZERO"
  | "SHOW_AS_BLANK"
  | (string & {});
export interface MissingDataConfiguration {
  TreatmentOption?: MissingDataTreatmentOption;
}
export type MissingDataConfigurationList = MissingDataConfiguration[];
export interface LineSeriesAxisDisplayOptions {
  AxisOptions?: AxisDisplayOptions;
  MissingDataConfigurations?: MissingDataConfiguration[];
}
export type SingleYAxisOption = "PRIMARY_Y_AXIS" | (string & {});
export interface YAxisOptions {
  YAxis: SingleYAxisOption;
}
export interface SingleAxisOptions {
  YAxisOptions?: YAxisOptions;
}
export type LineChartLineStyle = "SOLID" | "DOTTED" | "DASHED" | (string & {});
export interface LineChartLineStyleSettings {
  LineVisibility?: Visibility;
  LineInterpolation?: LineInterpolation;
  LineStyle?: LineChartLineStyle;
  LineWidth?: string;
}
export interface LineChartDefaultSeriesSettings {
  AxisBinding?: AxisBinding;
  LineStyleSettings?: LineChartLineStyleSettings;
  MarkerStyleSettings?: LineChartMarkerStyleSettings;
  DecalSettings?: DecalSettings;
}
export interface LineChartSeriesSettings {
  LineStyleSettings?: LineChartLineStyleSettings;
  MarkerStyleSettings?: LineChartMarkerStyleSettings;
  DecalSettings?: DecalSettings;
}
export interface FieldSeriesItem {
  FieldId: string;
  AxisBinding: AxisBinding;
  Settings?: LineChartSeriesSettings;
}
export interface DataFieldSeriesItem {
  FieldId: string;
  FieldValue?: string | redacted.Redacted<string>;
  AxisBinding: AxisBinding;
  Settings?: LineChartSeriesSettings;
}
export interface SeriesItem {
  FieldSeriesItem?: FieldSeriesItem;
  DataFieldSeriesItem?: DataFieldSeriesItem;
}
export type SeriesItemList = SeriesItem[];
export interface LineChartConfiguration {
  FieldWells?: LineChartFieldWells;
  SortConfiguration?: LineChartSortConfiguration;
  ForecastConfigurations?: ForecastConfiguration[];
  Type?: LineChartType;
  SmallMultiplesOptions?: SmallMultiplesOptions;
  XAxisDisplayOptions?: AxisDisplayOptions;
  XAxisLabelOptions?: ChartAxisLabelOptions;
  PrimaryYAxisDisplayOptions?: LineSeriesAxisDisplayOptions;
  PrimaryYAxisLabelOptions?: ChartAxisLabelOptions;
  SecondaryYAxisDisplayOptions?: LineSeriesAxisDisplayOptions;
  SecondaryYAxisLabelOptions?: ChartAxisLabelOptions;
  SingleAxisOptions?: SingleAxisOptions;
  DefaultSeriesSettings?: LineChartDefaultSeriesSettings;
  Series?: SeriesItem[];
  Legend?: LegendOptions;
  DataLabels?: DataLabelOptions;
  ReferenceLines?: ReferenceLine[];
  Tooltip?: TooltipOptions;
  ContributionAnalysisDefaults?: ContributionAnalysisDefault[];
  VisualPalette?: VisualPalette;
  Interactions?: VisualInteractionOptions;
}
export interface LineChartVisual {
  VisualId: string;
  Title?: VisualTitleLabelOptions;
  Subtitle?: VisualSubtitleLabelOptions;
  ChartConfiguration?: LineChartConfiguration;
  Actions?: VisualCustomAction[];
  ColumnHierarchies?: ColumnHierarchy[];
  VisualContentAltText?: string;
}
export type HeatMapDimensionFieldList = DimensionField[];
export type HeatMapMeasureFieldList = MeasureField[];
export interface HeatMapAggregatedFieldWells {
  Rows?: DimensionField[];
  Columns?: DimensionField[];
  Values?: MeasureField[];
}
export interface HeatMapFieldWells {
  HeatMapAggregatedFieldWells?: HeatMapAggregatedFieldWells;
}
export interface HeatMapSortConfiguration {
  HeatMapRowSort?: FieldSortOptions[];
  HeatMapColumnSort?: FieldSortOptions[];
  HeatMapRowItemsLimitConfiguration?: ItemsLimitConfiguration;
  HeatMapColumnItemsLimitConfiguration?: ItemsLimitConfiguration;
}
export interface DataColor {
  Color?: string;
  DataValue?: number;
}
export type ColorScaleColorList = DataColor[];
export type ColorFillType = "DISCRETE" | "GRADIENT" | (string & {});
export interface ColorScale {
  Colors: DataColor[];
  ColorFillType: ColorFillType;
  NullValueColor?: DataColor;
}
export interface HeatMapConfiguration {
  FieldWells?: HeatMapFieldWells;
  SortConfiguration?: HeatMapSortConfiguration;
  RowAxisDisplayOptions?: AxisDisplayOptions;
  RowLabelOptions?: ChartAxisLabelOptions;
  ColumnAxisDisplayOptions?: AxisDisplayOptions;
  ColumnLabelOptions?: ChartAxisLabelOptions;
  ColorScale?: ColorScale;
  Legend?: LegendOptions;
  DataLabels?: DataLabelOptions;
  Tooltip?: TooltipOptions;
  Interactions?: VisualInteractionOptions;
}
export interface HeatMapVisual {
  VisualId: string;
  Title?: VisualTitleLabelOptions;
  Subtitle?: VisualSubtitleLabelOptions;
  ChartConfiguration?: HeatMapConfiguration;
  ColumnHierarchies?: ColumnHierarchy[];
  Actions?: VisualCustomAction[];
  VisualContentAltText?: string;
}
export type TreeMapDimensionFieldList = DimensionField[];
export type TreeMapMeasureFieldList = MeasureField[];
export interface TreeMapAggregatedFieldWells {
  Groups?: DimensionField[];
  Sizes?: MeasureField[];
  Colors?: MeasureField[];
}
export interface TreeMapFieldWells {
  TreeMapAggregatedFieldWells?: TreeMapAggregatedFieldWells;
}
export interface TreeMapSortConfiguration {
  TreeMapSort?: FieldSortOptions[];
  TreeMapGroupItemsLimitConfiguration?: ItemsLimitConfiguration;
}
export interface TreeMapConfiguration {
  FieldWells?: TreeMapFieldWells;
  SortConfiguration?: TreeMapSortConfiguration;
  GroupLabelOptions?: ChartAxisLabelOptions;
  SizeLabelOptions?: ChartAxisLabelOptions;
  ColorLabelOptions?: ChartAxisLabelOptions;
  ColorScale?: ColorScale;
  Legend?: LegendOptions;
  DataLabels?: DataLabelOptions;
  Tooltip?: TooltipOptions;
  Interactions?: VisualInteractionOptions;
}
export interface TreeMapVisual {
  VisualId: string;
  Title?: VisualTitleLabelOptions;
  Subtitle?: VisualSubtitleLabelOptions;
  ChartConfiguration?: TreeMapConfiguration;
  Actions?: VisualCustomAction[];
  ColumnHierarchies?: ColumnHierarchy[];
  VisualContentAltText?: string;
}
export interface GeospatialMapAggregatedFieldWells {
  Geospatial?: DimensionField[];
  Values?: MeasureField[];
  Colors?: DimensionField[];
}
export interface GeospatialMapFieldWells {
  GeospatialMapAggregatedFieldWells?: GeospatialMapAggregatedFieldWells;
}
export type Latitude = number;
export type Longitude = number;
export interface GeospatialCoordinateBounds {
  North: number;
  South: number;
  West: number;
  East: number;
}
export type MapZoomMode = "AUTO" | "MANUAL" | (string & {});
export interface GeospatialWindowOptions {
  Bounds?: GeospatialCoordinateBounds;
  MapZoomMode?: MapZoomMode;
}
export type BaseMapStyleType =
  | "LIGHT_GRAY"
  | "DARK_GRAY"
  | "STREET"
  | "IMAGERY"
  | (string & {});
export interface GeospatialMapStyleOptions {
  BaseMapStyle?: BaseMapStyleType;
}
export type GeospatialSelectedPointStyle =
  | "POINT"
  | "CLUSTER"
  | "HEATMAP"
  | (string & {});
export interface SimpleClusterMarker {
  Color?: string;
}
export interface ClusterMarker {
  SimpleClusterMarker?: SimpleClusterMarker;
}
export interface ClusterMarkerConfiguration {
  ClusterMarker?: ClusterMarker;
}
export interface GeospatialHeatmapDataColor {
  Color: string;
}
export type GeospatialHeatmapDataColorList = GeospatialHeatmapDataColor[];
export interface GeospatialHeatmapColorScale {
  Colors?: GeospatialHeatmapDataColor[];
}
export interface GeospatialHeatmapConfiguration {
  HeatmapColor?: GeospatialHeatmapColorScale;
}
export interface GeospatialPointStyleOptions {
  SelectedPointStyle?: GeospatialSelectedPointStyle;
  ClusterMarkerConfiguration?: ClusterMarkerConfiguration;
  HeatmapConfiguration?: GeospatialHeatmapConfiguration;
}
export interface GeospatialMapConfiguration {
  FieldWells?: GeospatialMapFieldWells;
  Legend?: LegendOptions;
  Tooltip?: TooltipOptions;
  WindowOptions?: GeospatialWindowOptions;
  MapStyleOptions?: GeospatialMapStyleOptions;
  PointStyleOptions?: GeospatialPointStyleOptions;
  VisualPalette?: VisualPalette;
  Interactions?: VisualInteractionOptions;
}
export type GeocoderHierarchyCountryString = string;
export type GeocoderHierarchyStateString = string;
export type GeocoderHierarchyCountyString = string;
export type GeocoderHierarchyCityString = string;
export type GeocoderHierarchyPostCodeString = string;
export interface GeocoderHierarchy {
  Country?: string;
  State?: string;
  County?: string;
  City?: string;
  PostCode?: string;
}
export type CoordinateLatitudeDouble = number;
export type CoordinateLongitudeDouble = number;
export interface Coordinate {
  Latitude: number;
  Longitude: number;
}
export type GeocodePreferenceValue =
  | { GeocoderHierarchy: GeocoderHierarchy; Coordinate?: never }
  | { GeocoderHierarchy?: never; Coordinate: Coordinate };
export interface GeocodePreference {
  RequestKey: GeocoderHierarchy;
  Preference: GeocodePreferenceValue;
}
export type GeocodePreferenceList = GeocodePreference[];
export interface GeospatialMapVisual {
  VisualId: string;
  Title?: VisualTitleLabelOptions;
  Subtitle?: VisualSubtitleLabelOptions;
  ChartConfiguration?: GeospatialMapConfiguration;
  ColumnHierarchies?: ColumnHierarchy[];
  Actions?: VisualCustomAction[];
  VisualContentAltText?: string;
  GeocodingPreferences?: GeocodePreference[];
}
export type FilledMapDimensionFieldList = DimensionField[];
export type FilledMapMeasureFieldList = MeasureField[];
export interface FilledMapAggregatedFieldWells {
  Geospatial?: DimensionField[];
  Values?: MeasureField[];
}
export interface FilledMapFieldWells {
  FilledMapAggregatedFieldWells?: FilledMapAggregatedFieldWells;
}
export interface FilledMapSortConfiguration {
  CategorySort?: FieldSortOptions[];
}
export interface FilledMapConfiguration {
  FieldWells?: FilledMapFieldWells;
  SortConfiguration?: FilledMapSortConfiguration;
  Legend?: LegendOptions;
  Tooltip?: TooltipOptions;
  WindowOptions?: GeospatialWindowOptions;
  MapStyleOptions?: GeospatialMapStyleOptions;
  Interactions?: VisualInteractionOptions;
}
export interface ShapeConditionalFormat {
  BackgroundColor: ConditionalFormattingColor;
}
export interface FilledMapShapeConditionalFormatting {
  FieldId: string;
  Format?: ShapeConditionalFormat;
}
export interface FilledMapConditionalFormattingOption {
  Shape: FilledMapShapeConditionalFormatting;
}
export type FilledMapConditionalFormattingOptionList =
  FilledMapConditionalFormattingOption[];
export interface FilledMapConditionalFormatting {
  ConditionalFormattingOptions: FilledMapConditionalFormattingOption[];
}
export interface FilledMapVisual {
  VisualId: string;
  Title?: VisualTitleLabelOptions;
  Subtitle?: VisualSubtitleLabelOptions;
  ChartConfiguration?: FilledMapConfiguration;
  ConditionalFormatting?: FilledMapConditionalFormatting;
  ColumnHierarchies?: ColumnHierarchy[];
  Actions?: VisualCustomAction[];
  VisualContentAltText?: string;
  GeocodingPreferences?: GeocodePreference[];
}
export type GeospatialLayerType = "POINT" | "LINE" | "POLYGON" | (string & {});
export interface GeospatialStaticFileSource {
  StaticFileId: string;
}
export interface GeospatialDataSourceItem {
  StaticFileDataSource?: GeospatialStaticFileSource;
}
export type GeospatialColorState = "ENABLED" | "DISABLED" | (string & {});
export interface GeospatialSolidColor {
  Color: string;
  State?: GeospatialColorState;
}
export interface GeospatialGradientStepColor {
  Color: string;
  DataValue: number;
}
export type GeospatialGradientStepColorList = GeospatialGradientStepColor[];
export type GeospatialWidth = number;
export interface GeospatialNullSymbolStyle {
  FillColor?: string;
  StrokeColor?: string;
  StrokeWidth?: number;
}
export interface GeospatialNullDataSettings {
  SymbolStyle: GeospatialNullSymbolStyle;
}
export type Opacity = number;
export interface GeospatialGradientColor {
  StepColors: GeospatialGradientStepColor[];
  NullDataVisibility?: Visibility;
  NullDataSettings?: GeospatialNullDataSettings;
  DefaultOpacity?: number;
}
export interface GeospatialCategoricalDataColor {
  Color: string;
  DataValue: string;
}
export type GeospatialCategoricalDataColorList =
  GeospatialCategoricalDataColor[];
export interface GeospatialCategoricalColor {
  CategoryDataColors: GeospatialCategoricalDataColor[];
  NullDataVisibility?: Visibility;
  NullDataSettings?: GeospatialNullDataSettings;
  DefaultOpacity?: number;
}
export interface GeospatialColor {
  Solid?: GeospatialSolidColor;
  Gradient?: GeospatialGradientColor;
  Categorical?: GeospatialCategoricalColor;
}
export interface GeospatialLineWidth {
  LineWidth?: number;
}
export type GeospatialRadius = number;
export interface GeospatialCircleRadius {
  Radius?: number;
}
export interface GeospatialCircleSymbolStyle {
  FillColor?: GeospatialColor;
  StrokeColor?: GeospatialColor;
  StrokeWidth?: GeospatialLineWidth;
  CircleRadius?: GeospatialCircleRadius;
}
export interface GeospatialPointStyle {
  CircleSymbolStyle?: GeospatialCircleSymbolStyle;
}
export interface GeospatialPointLayer {
  Style: GeospatialPointStyle;
}
export interface GeospatialLineSymbolStyle {
  FillColor?: GeospatialColor;
  LineWidth?: GeospatialLineWidth;
}
export interface GeospatialLineStyle {
  LineSymbolStyle?: GeospatialLineSymbolStyle;
}
export interface GeospatialLineLayer {
  Style: GeospatialLineStyle;
}
export interface GeospatialPolygonSymbolStyle {
  FillColor?: GeospatialColor;
  StrokeColor?: GeospatialColor;
  StrokeWidth?: GeospatialLineWidth;
}
export interface GeospatialPolygonStyle {
  PolygonSymbolStyle?: GeospatialPolygonSymbolStyle;
}
export interface GeospatialPolygonLayer {
  Style: GeospatialPolygonStyle;
}
export interface GeospatialLayerDefinition {
  PointLayer?: GeospatialPointLayer;
  LineLayer?: GeospatialLineLayer;
  PolygonLayer?: GeospatialPolygonLayer;
}
export type GeospatialLayerDimensionFieldList = DimensionField[];
export type GeospatialLayerMeasureFieldList = MeasureField[];
export interface GeospatialLayerColorField {
  ColorDimensionsFields?: DimensionField[];
  ColorValuesFields?: MeasureField[];
}
export interface GeospatialLayerJoinDefinition {
  ShapeKeyField?: string;
  DatasetKeyField?: UnaggregatedField;
  ColorField?: GeospatialLayerColorField;
}
export type LayerCustomActionName = string;
export type LayerCustomActionTrigger =
  | "DATA_POINT_CLICK"
  | "DATA_POINT_MENU"
  | (string & {});
export interface LayerCustomActionOperation {
  FilterOperation?: CustomActionFilterOperation;
  NavigationOperation?: CustomActionNavigationOperation;
  URLOperation?: CustomActionURLOperation;
  SetParametersOperation?: CustomActionSetParametersOperation;
}
export type LayerCustomActionOperationList = LayerCustomActionOperation[];
export interface LayerCustomAction {
  CustomActionId: string;
  Name: string;
  Status?: WidgetStatus;
  Trigger: LayerCustomActionTrigger;
  ActionOperations: LayerCustomActionOperation[];
}
export type LayerCustomActionList = LayerCustomAction[];
export interface GeospatialLayerItem {
  LayerId: string;
  LayerType?: GeospatialLayerType;
  DataSource?: GeospatialDataSourceItem;
  Label?: string;
  Visibility?: Visibility;
  LayerDefinition?: GeospatialLayerDefinition;
  Tooltip?: TooltipOptions;
  JoinDefinition?: GeospatialLayerJoinDefinition;
  Actions?: LayerCustomAction[];
}
export type GeospatialMapLayerList = GeospatialLayerItem[];
export type GeospatialMapNavigation = "ENABLED" | "DISABLED" | (string & {});
export interface GeospatialMapState {
  Bounds?: GeospatialCoordinateBounds;
  MapNavigation?: GeospatialMapNavigation;
}
export interface GeospatialMapStyle {
  BaseMapStyle?: BaseMapStyleType;
  BackgroundColor?: string;
  BaseMapVisibility?: Visibility;
}
export interface GeospatialLayerMapConfiguration {
  Legend?: LegendOptions;
  MapLayers?: GeospatialLayerItem[];
  MapState?: GeospatialMapState;
  MapStyle?: GeospatialMapStyle;
  Interactions?: VisualInteractionOptions;
}
export interface LayerMapVisual {
  VisualId: string;
  Title?: VisualTitleLabelOptions;
  Subtitle?: VisualSubtitleLabelOptions;
  ChartConfiguration?: GeospatialLayerMapConfiguration;
  DataSetIdentifier?: string;
  TopicIdentifier?: string;
  VisualContentAltText?: string;
}
export type FunnelChartDimensionFieldList = DimensionField[];
export type FunnelChartMeasureFieldList = MeasureField[];
export interface FunnelChartAggregatedFieldWells {
  Category?: DimensionField[];
  Values?: MeasureField[];
}
export interface FunnelChartFieldWells {
  FunnelChartAggregatedFieldWells?: FunnelChartAggregatedFieldWells;
}
export interface FunnelChartSortConfiguration {
  CategorySort?: FieldSortOptions[];
  CategoryItemsLimit?: ItemsLimitConfiguration;
}
export type FunnelChartMeasureDataLabelStyle =
  | "VALUE_ONLY"
  | "PERCENTAGE_BY_FIRST_STAGE"
  | "PERCENTAGE_BY_PREVIOUS_STAGE"
  | "VALUE_AND_PERCENTAGE_BY_FIRST_STAGE"
  | "VALUE_AND_PERCENTAGE_BY_PREVIOUS_STAGE"
  | (string & {});
export interface FunnelChartDataLabelOptions {
  Visibility?: Visibility;
  CategoryLabelVisibility?: Visibility;
  MeasureLabelVisibility?: Visibility;
  Position?: DataLabelPosition;
  LabelFontConfiguration?: FontConfiguration;
  LabelColor?: string;
  MeasureDataLabelStyle?: FunnelChartMeasureDataLabelStyle;
}
export interface FunnelChartConfiguration {
  FieldWells?: FunnelChartFieldWells;
  SortConfiguration?: FunnelChartSortConfiguration;
  CategoryLabelOptions?: ChartAxisLabelOptions;
  ValueLabelOptions?: ChartAxisLabelOptions;
  Tooltip?: TooltipOptions;
  DataLabelOptions?: FunnelChartDataLabelOptions;
  VisualPalette?: VisualPalette;
  Interactions?: VisualInteractionOptions;
}
export interface FunnelChartVisual {
  VisualId: string;
  Title?: VisualTitleLabelOptions;
  Subtitle?: VisualSubtitleLabelOptions;
  ChartConfiguration?: FunnelChartConfiguration;
  Actions?: VisualCustomAction[];
  ColumnHierarchies?: ColumnHierarchy[];
  VisualContentAltText?: string;
}
export interface ScatterPlotCategoricallyAggregatedFieldWells {
  XAxis?: MeasureField[];
  YAxis?: MeasureField[];
  Category?: DimensionField[];
  Size?: MeasureField[];
  Label?: DimensionField[];
}
export interface ScatterPlotUnaggregatedFieldWells {
  XAxis?: DimensionField[];
  YAxis?: DimensionField[];
  Size?: MeasureField[];
  Category?: DimensionField[];
  Label?: DimensionField[];
}
export interface ScatterPlotFieldWells {
  ScatterPlotCategoricallyAggregatedFieldWells?: ScatterPlotCategoricallyAggregatedFieldWells;
  ScatterPlotUnaggregatedFieldWells?: ScatterPlotUnaggregatedFieldWells;
}
export interface ScatterPlotSortConfiguration {
  ScatterPlotLimitConfiguration?: ItemsLimitConfiguration;
}
export interface ScatterPlotConfiguration {
  FieldWells?: ScatterPlotFieldWells;
  SortConfiguration?: ScatterPlotSortConfiguration;
  XAxisLabelOptions?: ChartAxisLabelOptions;
  XAxisDisplayOptions?: AxisDisplayOptions;
  YAxisLabelOptions?: ChartAxisLabelOptions;
  YAxisDisplayOptions?: AxisDisplayOptions;
  Legend?: LegendOptions;
  DataLabels?: DataLabelOptions;
  Tooltip?: TooltipOptions;
  VisualPalette?: VisualPalette;
  Interactions?: VisualInteractionOptions;
}
export interface ScatterPlotVisual {
  VisualId: string;
  Title?: VisualTitleLabelOptions;
  Subtitle?: VisualSubtitleLabelOptions;
  ChartConfiguration?: ScatterPlotConfiguration;
  Actions?: VisualCustomAction[];
  ColumnHierarchies?: ColumnHierarchy[];
  VisualContentAltText?: string;
}
export interface ComboChartAggregatedFieldWells {
  Category?: DimensionField[];
  BarValues?: MeasureField[];
  Colors?: DimensionField[];
  LineValues?: MeasureField[];
}
export interface ComboChartFieldWells {
  ComboChartAggregatedFieldWells?: ComboChartAggregatedFieldWells;
}
export interface ComboChartSortConfiguration {
  CategorySort?: FieldSortOptions[];
  CategoryItemsLimit?: ItemsLimitConfiguration;
  ColorSort?: FieldSortOptions[];
  ColorItemsLimit?: ItemsLimitConfiguration;
}
export interface ComboChartDefaultSeriesSettings {
  LineStyleSettings?: LineChartLineStyleSettings;
  MarkerStyleSettings?: LineChartMarkerStyleSettings;
  DecalSettings?: DecalSettings;
  BorderSettings?: BorderSettings;
}
export interface ComboChartSeriesSettings {
  LineStyleSettings?: LineChartLineStyleSettings;
  MarkerStyleSettings?: LineChartMarkerStyleSettings;
  DecalSettings?: DecalSettings;
  BorderSettings?: BorderSettings;
}
export interface FieldComboSeriesItem {
  FieldId: string;
  Settings?: ComboChartSeriesSettings;
}
export interface DataFieldComboSeriesItem {
  FieldId: string;
  FieldValue?: string | redacted.Redacted<string>;
  Settings?: ComboChartSeriesSettings;
}
export interface ComboSeriesItem {
  FieldComboSeriesItem?: FieldComboSeriesItem;
  DataFieldComboSeriesItem?: DataFieldComboSeriesItem;
}
export type ComboSeriesItemList = ComboSeriesItem[];
export interface ComboChartConfiguration {
  FieldWells?: ComboChartFieldWells;
  SortConfiguration?: ComboChartSortConfiguration;
  BarsArrangement?: BarsArrangement;
  CategoryAxis?: AxisDisplayOptions;
  CategoryLabelOptions?: ChartAxisLabelOptions;
  PrimaryYAxisDisplayOptions?: AxisDisplayOptions;
  PrimaryYAxisLabelOptions?: ChartAxisLabelOptions;
  SecondaryYAxisDisplayOptions?: AxisDisplayOptions;
  SecondaryYAxisLabelOptions?: ChartAxisLabelOptions;
  SingleAxisOptions?: SingleAxisOptions;
  ColorLabelOptions?: ChartAxisLabelOptions;
  DefaultSeriesSettings?: ComboChartDefaultSeriesSettings;
  Series?: ComboSeriesItem[];
  Legend?: LegendOptions;
  BarDataLabels?: DataLabelOptions;
  LineDataLabels?: DataLabelOptions;
  Tooltip?: TooltipOptions;
  ReferenceLines?: ReferenceLine[];
  VisualPalette?: VisualPalette;
  Interactions?: VisualInteractionOptions;
}
export interface ComboChartVisual {
  VisualId: string;
  Title?: VisualTitleLabelOptions;
  Subtitle?: VisualSubtitleLabelOptions;
  ChartConfiguration?: ComboChartConfiguration;
  Actions?: VisualCustomAction[];
  ColumnHierarchies?: ColumnHierarchy[];
  VisualContentAltText?: string;
}
export type BoxPlotDimensionFieldList = DimensionField[];
export type BoxPlotMeasureFieldList = MeasureField[];
export interface BoxPlotAggregatedFieldWells {
  GroupBy?: DimensionField[];
  Values?: MeasureField[];
}
export interface BoxPlotFieldWells {
  BoxPlotAggregatedFieldWells?: BoxPlotAggregatedFieldWells;
}
export interface BoxPlotSortConfiguration {
  CategorySort?: FieldSortOptions[];
  PaginationConfiguration?: PaginationConfiguration;
}
export type BoxPlotFillStyle = "SOLID" | "TRANSPARENT" | (string & {});
export interface BoxPlotStyleOptions {
  FillStyle?: BoxPlotFillStyle;
}
export interface BoxPlotOptions {
  StyleOptions?: BoxPlotStyleOptions;
  OutlierVisibility?: Visibility;
  AllDataPointsVisibility?: Visibility;
}
export interface BoxPlotChartConfiguration {
  FieldWells?: BoxPlotFieldWells;
  SortConfiguration?: BoxPlotSortConfiguration;
  BoxPlotOptions?: BoxPlotOptions;
  CategoryAxis?: AxisDisplayOptions;
  CategoryLabelOptions?: ChartAxisLabelOptions;
  PrimaryYAxisDisplayOptions?: AxisDisplayOptions;
  PrimaryYAxisLabelOptions?: ChartAxisLabelOptions;
  Legend?: LegendOptions;
  Tooltip?: TooltipOptions;
  ReferenceLines?: ReferenceLine[];
  VisualPalette?: VisualPalette;
  Interactions?: VisualInteractionOptions;
}
export interface BoxPlotVisual {
  VisualId: string;
  Title?: VisualTitleLabelOptions;
  Subtitle?: VisualSubtitleLabelOptions;
  ChartConfiguration?: BoxPlotChartConfiguration;
  Actions?: VisualCustomAction[];
  ColumnHierarchies?: ColumnHierarchy[];
  VisualContentAltText?: string;
}
export interface WaterfallChartAggregatedFieldWells {
  Categories?: DimensionField[];
  Values?: MeasureField[];
  Breakdowns?: DimensionField[];
}
export interface WaterfallChartFieldWells {
  WaterfallChartAggregatedFieldWells?: WaterfallChartAggregatedFieldWells;
}
export interface WaterfallChartSortConfiguration {
  CategorySort?: FieldSortOptions[];
  BreakdownItemsLimit?: ItemsLimitConfiguration;
}
export interface WaterfallChartOptions {
  TotalBarLabel?: string;
}
export interface WaterfallChartGroupColorConfiguration {
  PositiveBarColor?: string;
  NegativeBarColor?: string;
  TotalBarColor?: string;
}
export interface WaterfallChartColorConfiguration {
  GroupColorConfiguration?: WaterfallChartGroupColorConfiguration;
}
export interface WaterfallChartConfiguration {
  FieldWells?: WaterfallChartFieldWells;
  SortConfiguration?: WaterfallChartSortConfiguration;
  WaterfallChartOptions?: WaterfallChartOptions;
  CategoryAxisLabelOptions?: ChartAxisLabelOptions;
  CategoryAxisDisplayOptions?: AxisDisplayOptions;
  PrimaryYAxisLabelOptions?: ChartAxisLabelOptions;
  PrimaryYAxisDisplayOptions?: AxisDisplayOptions;
  Legend?: LegendOptions;
  DataLabels?: DataLabelOptions;
  VisualPalette?: VisualPalette;
  ColorConfiguration?: WaterfallChartColorConfiguration;
  Interactions?: VisualInteractionOptions;
}
export interface WaterfallVisual {
  VisualId: string;
  Title?: VisualTitleLabelOptions;
  Subtitle?: VisualSubtitleLabelOptions;
  ChartConfiguration?: WaterfallChartConfiguration;
  Actions?: VisualCustomAction[];
  ColumnHierarchies?: ColumnHierarchy[];
  VisualContentAltText?: string;
}
export type HistogramMeasureFieldList = MeasureField[];
export interface HistogramAggregatedFieldWells {
  Values?: MeasureField[];
}
export interface HistogramFieldWells {
  HistogramAggregatedFieldWells?: HistogramAggregatedFieldWells;
}
export type HistogramBinType = "BIN_COUNT" | "BIN_WIDTH" | (string & {});
export type BinCountValue = number;
export interface BinCountOptions {
  Value?: number;
}
export type BinWidthValue = number;
export type BinCountLimit = number;
export interface BinWidthOptions {
  Value?: number;
  BinCountLimit?: number;
}
export interface HistogramBinOptions {
  SelectedBinType?: HistogramBinType;
  BinCount?: BinCountOptions;
  BinWidth?: BinWidthOptions;
  StartValue?: number;
}
export interface HistogramConfiguration {
  FieldWells?: HistogramFieldWells;
  XAxisDisplayOptions?: AxisDisplayOptions;
  XAxisLabelOptions?: ChartAxisLabelOptions;
  YAxisDisplayOptions?: AxisDisplayOptions;
  BinOptions?: HistogramBinOptions;
  DataLabels?: DataLabelOptions;
  Tooltip?: TooltipOptions;
  VisualPalette?: VisualPalette;
  Interactions?: VisualInteractionOptions;
}
export interface HistogramVisual {
  VisualId: string;
  Title?: VisualTitleLabelOptions;
  Subtitle?: VisualSubtitleLabelOptions;
  ChartConfiguration?: HistogramConfiguration;
  Actions?: VisualCustomAction[];
  VisualContentAltText?: string;
}
export type WordCloudDimensionFieldList = DimensionField[];
export type WordCloudMeasureFieldList = MeasureField[];
export interface WordCloudAggregatedFieldWells {
  GroupBy?: DimensionField[];
  Size?: MeasureField[];
}
export interface WordCloudFieldWells {
  WordCloudAggregatedFieldWells?: WordCloudAggregatedFieldWells;
}
export interface WordCloudSortConfiguration {
  CategoryItemsLimit?: ItemsLimitConfiguration;
  CategorySort?: FieldSortOptions[];
}
export type WordCloudWordOrientation =
  | "HORIZONTAL"
  | "HORIZONTAL_AND_VERTICAL"
  | (string & {});
export type WordCloudWordScaling = "EMPHASIZE" | "NORMAL" | (string & {});
export type WordCloudCloudLayout = "FLUID" | "NORMAL" | (string & {});
export type WordCloudWordCasing =
  | "LOWER_CASE"
  | "EXISTING_CASE"
  | (string & {});
export type WordCloudWordPadding =
  | "NONE"
  | "SMALL"
  | "MEDIUM"
  | "LARGE"
  | (string & {});
export type WordCloudMaximumStringLength = number;
export interface WordCloudOptions {
  WordOrientation?: WordCloudWordOrientation;
  WordScaling?: WordCloudWordScaling;
  CloudLayout?: WordCloudCloudLayout;
  WordCasing?: WordCloudWordCasing;
  WordPadding?: WordCloudWordPadding;
  MaximumStringLength?: number;
}
export interface WordCloudChartConfiguration {
  FieldWells?: WordCloudFieldWells;
  SortConfiguration?: WordCloudSortConfiguration;
  CategoryLabelOptions?: ChartAxisLabelOptions;
  WordCloudOptions?: WordCloudOptions;
  Interactions?: VisualInteractionOptions;
}
export interface WordCloudVisual {
  VisualId: string;
  Title?: VisualTitleLabelOptions;
  Subtitle?: VisualSubtitleLabelOptions;
  ChartConfiguration?: WordCloudChartConfiguration;
  Actions?: VisualCustomAction[];
  ColumnHierarchies?: ColumnHierarchy[];
  VisualContentAltText?: string;
}
export type TopBottomRankedComputationResultSize = number;
export type TopBottomComputationType = "TOP" | "BOTTOM" | (string & {});
export interface TopBottomRankedComputation {
  ComputationId: string;
  Name?: string;
  Category?: DimensionField;
  Value?: MeasureField;
  ResultSize?: number;
  Type: TopBottomComputationType;
}
export type TopBottomMoversComputationMoverSize = number;
export type TopBottomSortOrder =
  | "PERCENT_DIFFERENCE"
  | "ABSOLUTE_DIFFERENCE"
  | (string & {});
export interface TopBottomMoversComputation {
  ComputationId: string;
  Name?: string;
  Time?: DimensionField;
  Category?: DimensionField;
  Value?: MeasureField;
  MoverSize?: number;
  SortOrder?: TopBottomSortOrder;
  Type: TopBottomComputationType;
}
export interface TotalAggregationComputation {
  ComputationId: string;
  Name?: string;
  Value?: MeasureField;
}
export type MaximumMinimumComputationType =
  | "MAXIMUM"
  | "MINIMUM"
  | (string & {});
export interface MaximumMinimumComputation {
  ComputationId: string;
  Name?: string;
  Time?: DimensionField;
  Value?: MeasureField;
  Type: MaximumMinimumComputationType;
}
export interface MetricComparisonComputation {
  ComputationId: string;
  Name?: string;
  Time?: DimensionField;
  FromValue?: MeasureField;
  TargetValue?: MeasureField;
}
export interface PeriodOverPeriodComputation {
  ComputationId: string;
  Name?: string;
  Time?: DimensionField;
  Value?: MeasureField;
}
export interface PeriodToDateComputation {
  ComputationId: string;
  Name?: string;
  Time?: DimensionField;
  Value?: MeasureField;
  PeriodTimeGranularity?: TimeGranularity;
}
export type GrowthRatePeriodSize = number;
export interface GrowthRateComputation {
  ComputationId: string;
  Name?: string;
  Time?: DimensionField;
  Value?: MeasureField;
  PeriodSize?: number;
}
export interface UniqueValuesComputation {
  ComputationId: string;
  Name?: string;
  Category?: DimensionField;
}
export type ForecastComputationSeasonality =
  | "AUTOMATIC"
  | "CUSTOM"
  | (string & {});
export type ForecastComputationCustomSeasonalityValue = number;
export interface ForecastComputation {
  ComputationId: string;
  Name?: string;
  Time?: DimensionField;
  Value?: MeasureField;
  PeriodsForward?: number;
  PeriodsBackward?: number;
  UpperBoundary?: number;
  LowerBoundary?: number;
  PredictionInterval?: number;
  Seasonality?: ForecastComputationSeasonality;
  CustomSeasonalityValue?: number;
}
export interface Computation {
  TopBottomRanked?: TopBottomRankedComputation;
  TopBottomMovers?: TopBottomMoversComputation;
  TotalAggregation?: TotalAggregationComputation;
  MaximumMinimum?: MaximumMinimumComputation;
  MetricComparison?: MetricComparisonComputation;
  PeriodOverPeriod?: PeriodOverPeriodComputation;
  PeriodToDate?: PeriodToDateComputation;
  GrowthRate?: GrowthRateComputation;
  UniqueValues?: UniqueValuesComputation;
  Forecast?: ForecastComputation;
}
export type ComputationList = Computation[];
export type NarrativeString = string;
export interface CustomNarrativeOptions {
  Narrative: string;
}
export interface InsightConfiguration {
  Computations?: Computation[];
  CustomNarrative?: CustomNarrativeOptions;
  Interactions?: VisualInteractionOptions;
}
export interface InsightVisual {
  VisualId: string;
  Title?: VisualTitleLabelOptions;
  Subtitle?: VisualSubtitleLabelOptions;
  InsightConfiguration?: InsightConfiguration;
  Actions?: VisualCustomAction[];
  DataSetIdentifier?: string;
  TopicIdentifier?: string;
  VisualContentAltText?: string;
}
export interface SankeyDiagramAggregatedFieldWells {
  Source?: DimensionField[];
  Destination?: DimensionField[];
  Weight?: MeasureField[];
}
export interface SankeyDiagramFieldWells {
  SankeyDiagramAggregatedFieldWells?: SankeyDiagramAggregatedFieldWells;
}
export interface SankeyDiagramSortConfiguration {
  WeightSort?: FieldSortOptions[];
  SourceItemsLimit?: ItemsLimitConfiguration;
  DestinationItemsLimit?: ItemsLimitConfiguration;
}
export interface SankeyDiagramChartConfiguration {
  FieldWells?: SankeyDiagramFieldWells;
  SortConfiguration?: SankeyDiagramSortConfiguration;
  DataLabels?: DataLabelOptions;
  Interactions?: VisualInteractionOptions;
}
export interface SankeyDiagramVisual {
  VisualId: string;
  Title?: VisualTitleLabelOptions;
  Subtitle?: VisualSubtitleLabelOptions;
  ChartConfiguration?: SankeyDiagramChartConfiguration;
  Actions?: VisualCustomAction[];
  VisualContentAltText?: string;
}
export type CustomContentType =
  | "IMAGE"
  | "OTHER_EMBEDDED_CONTENT"
  | (string & {});
export type CustomContentImageScalingConfiguration =
  | "FIT_TO_HEIGHT"
  | "FIT_TO_WIDTH"
  | "DO_NOT_SCALE"
  | "SCALE_TO_VISUAL"
  | (string & {});
export interface CustomContentConfiguration {
  ContentUrl?: string;
  ContentType?: CustomContentType;
  ImageScaling?: CustomContentImageScalingConfiguration;
  Interactions?: VisualInteractionOptions;
}
export interface CustomContentVisual {
  VisualId: string;
  Title?: VisualTitleLabelOptions;
  Subtitle?: VisualSubtitleLabelOptions;
  ChartConfiguration?: CustomContentConfiguration;
  Actions?: VisualCustomAction[];
  DataSetIdentifier?: string;
  TopicIdentifier?: string;
  VisualContentAltText?: string;
}
export interface EmptyVisual {
  VisualId: string;
  DataSetIdentifier?: string;
  TopicIdentifier?: string;
  Actions?: VisualCustomAction[];
}
export type RadarChartCategoryFieldList = DimensionField[];
export type RadarChartColorFieldList = DimensionField[];
export type RadarChartValuesFieldList = MeasureField[];
export interface RadarChartAggregatedFieldWells {
  Category?: DimensionField[];
  Color?: DimensionField[];
  Values?: MeasureField[];
}
export interface RadarChartFieldWells {
  RadarChartAggregatedFieldWells?: RadarChartAggregatedFieldWells;
}
export interface RadarChartSortConfiguration {
  CategorySort?: FieldSortOptions[];
  CategoryItemsLimit?: ItemsLimitConfiguration;
  ColorSort?: FieldSortOptions[];
  ColorItemsLimit?: ItemsLimitConfiguration;
}
export type RadarChartShape = "CIRCLE" | "POLYGON" | (string & {});
export interface RadarChartAreaStyleSettings {
  Visibility?: Visibility;
}
export interface RadarChartSeriesSettings {
  AreaStyleSettings?: RadarChartAreaStyleSettings;
}
export type RadarChartStartAngle = number;
export type RadarChartAxesRangeScale =
  | "AUTO"
  | "INDEPENDENT"
  | "SHARED"
  | (string & {});
export interface RadarChartConfiguration {
  FieldWells?: RadarChartFieldWells;
  SortConfiguration?: RadarChartSortConfiguration;
  Shape?: RadarChartShape;
  BaseSeriesSettings?: RadarChartSeriesSettings;
  StartAngle?: number;
  VisualPalette?: VisualPalette;
  AlternateBandColorsVisibility?: Visibility;
  AlternateBandEvenColor?: string;
  AlternateBandOddColor?: string;
  CategoryAxis?: AxisDisplayOptions;
  CategoryLabelOptions?: ChartAxisLabelOptions;
  ColorAxis?: AxisDisplayOptions;
  ColorLabelOptions?: ChartAxisLabelOptions;
  Legend?: LegendOptions;
  AxesRangeScale?: RadarChartAxesRangeScale;
  Interactions?: VisualInteractionOptions;
}
export interface RadarChartVisual {
  VisualId: string;
  Title?: VisualTitleLabelOptions;
  Subtitle?: VisualSubtitleLabelOptions;
  ChartConfiguration?: RadarChartConfiguration;
  Actions?: VisualCustomAction[];
  ColumnHierarchies?: ColumnHierarchy[];
  VisualContentAltText?: string;
}
export type PluginVisualAxisName = "GROUP_BY" | "VALUE" | (string & {});
export type UnaggregatedFieldList = UnaggregatedField[];
export interface PluginVisualFieldWell {
  AxisName?: PluginVisualAxisName;
  Dimensions?: DimensionField[];
  Measures?: MeasureField[];
  Unaggregated?: UnaggregatedField[];
}
export type PluginVisualFieldWells = PluginVisualFieldWell[];
export interface PluginVisualProperty {
  Name?: string;
  Value?: string;
}
export type PluginVisualPropertiesList = PluginVisualProperty[];
export interface PluginVisualOptions {
  VisualProperties?: PluginVisualProperty[];
}
export interface PluginVisualItemsLimitConfiguration {
  ItemsLimit?: number;
}
export interface PluginVisualTableQuerySort {
  RowSort?: FieldSortOptions[];
  ItemsLimitConfiguration?: PluginVisualItemsLimitConfiguration;
}
export interface PluginVisualSortConfiguration {
  PluginVisualTableQuerySort?: PluginVisualTableQuerySort;
}
export interface PluginVisualConfiguration {
  FieldWells?: PluginVisualFieldWell[];
  VisualOptions?: PluginVisualOptions;
  SortConfiguration?: PluginVisualSortConfiguration;
}
export interface PluginVisual {
  VisualId: string;
  PluginArn: string;
  Title?: VisualTitleLabelOptions;
  Subtitle?: VisualSubtitleLabelOptions;
  ChartConfiguration?: PluginVisualConfiguration;
  Actions?: VisualCustomAction[];
  VisualContentAltText?: string;
}
export interface Visual {
  TableVisual?: TableVisual;
  PivotTableVisual?: PivotTableVisual;
  BarChartVisual?: BarChartVisual;
  KPIVisual?: KPIVisual;
  PieChartVisual?: PieChartVisual;
  GaugeChartVisual?: GaugeChartVisual;
  LineChartVisual?: LineChartVisual;
  HeatMapVisual?: HeatMapVisual;
  TreeMapVisual?: TreeMapVisual;
  GeospatialMapVisual?: GeospatialMapVisual;
  FilledMapVisual?: FilledMapVisual;
  LayerMapVisual?: LayerMapVisual;
  FunnelChartVisual?: FunnelChartVisual;
  ScatterPlotVisual?: ScatterPlotVisual;
  ComboChartVisual?: ComboChartVisual;
  BoxPlotVisual?: BoxPlotVisual;
  WaterfallVisual?: WaterfallVisual;
  HistogramVisual?: HistogramVisual;
  WordCloudVisual?: WordCloudVisual;
  InsightVisual?: InsightVisual;
  SankeyDiagramVisual?: SankeyDiagramVisual;
  CustomContentVisual?: CustomContentVisual;
  EmptyVisual?: EmptyVisual;
  RadarChartVisual?: RadarChartVisual;
  PluginVisual?: PluginVisual;
}
export type VisualList = Visual[];
export type SheetTextBoxContent = string;
export interface TextBoxMenuOption {
  AvailabilityStatus?: DashboardBehavior;
}
export interface TextBoxInteractionOptions {
  TextBoxMenuOption?: TextBoxMenuOption;
}
export interface SheetTextBox {
  SheetTextBoxId: string;
  Content?: string;
  Interactions?: TextBoxInteractionOptions;
}
export type SheetTextBoxList = SheetTextBox[];
export interface SheetImageStaticFileSource {
  StaticFileId: string;
}
export interface SheetImageSource {
  SheetImageStaticFileSource?: SheetImageStaticFileSource;
}
export type SheetImageScalingType =
  | "SCALE_TO_WIDTH"
  | "SCALE_TO_HEIGHT"
  | "SCALE_TO_CONTAINER"
  | "SCALE_NONE"
  | (string & {});
export interface SheetImageScalingConfiguration {
  ScalingType?: SheetImageScalingType;
}
export interface SheetImageTooltipText {
  PlainText?: string;
}
export interface SheetImageTooltipConfiguration {
  TooltipText?: SheetImageTooltipText;
  Visibility?: Visibility;
}
export interface ImageMenuOption {
  AvailabilityStatus?: DashboardBehavior;
}
export interface ImageInteractionOptions {
  ImageMenuOption?: ImageMenuOption;
}
export type ImageCustomActionName = string;
export type ImageCustomActionTrigger = "CLICK" | "MENU" | (string & {});
export interface ImageCustomActionOperation {
  NavigationOperation?: CustomActionNavigationOperation;
  URLOperation?: CustomActionURLOperation;
  SetParametersOperation?: CustomActionSetParametersOperation;
}
export type ImageCustomActionOperationList = ImageCustomActionOperation[];
export interface ImageCustomAction {
  CustomActionId: string;
  Name: string;
  Status?: WidgetStatus;
  Trigger: ImageCustomActionTrigger;
  ActionOperations: ImageCustomActionOperation[];
}
export type ImageCustomActionList = ImageCustomAction[];
export interface SheetImage {
  SheetImageId: string;
  Source: SheetImageSource;
  Scaling?: SheetImageScalingConfiguration;
  Tooltip?: SheetImageTooltipConfiguration;
  ImageContentAltText?: string;
  Interactions?: ImageInteractionOptions;
  Actions?: ImageCustomAction[];
}
export type SheetImageList = SheetImage[];
export type LayoutElementType =
  | "VISUAL"
  | "FILTER_CONTROL"
  | "PARAMETER_CONTROL"
  | "TEXT_BOX"
  | "IMAGE"
  | (string & {});
export type GridLayoutElementColumnIndex = number;
export type GridLayoutElementColumnSpan = number;
export type GridLayoutElementRowIndex = number;
export type GridLayoutElementRowSpan = number;
export type Width = string;
export interface GridLayoutElementBorderStyle {
  Visibility?: Visibility;
  Color?: string;
  Width?: string;
}
export interface GridLayoutElementBackgroundStyle {
  Visibility?: Visibility;
  Color?: string;
}
export interface LoadingAnimation {
  Visibility?: Visibility;
}
export type BorderRadius = string;
export type Padding = string;
export interface GridLayoutElement {
  ElementId: string;
  ElementType: LayoutElementType;
  ColumnIndex?: number;
  ColumnSpan: number;
  RowIndex?: number;
  RowSpan: number;
  BorderStyle?: GridLayoutElementBorderStyle;
  SelectedBorderStyle?: GridLayoutElementBorderStyle;
  BackgroundStyle?: GridLayoutElementBackgroundStyle;
  LoadingAnimation?: LoadingAnimation;
  BorderRadius?: string;
  Padding?: string;
}
export type GridLayoutElementList = GridLayoutElement[];
export type ResizeOption = "FIXED" | "RESPONSIVE" | (string & {});
export interface GridLayoutScreenCanvasSizeOptions {
  ResizeOption: ResizeOption;
  OptimizedViewPortWidth?: string;
}
export interface GridLayoutCanvasSizeOptions {
  ScreenCanvasSizeOptions?: GridLayoutScreenCanvasSizeOptions;
}
export interface GridLayoutConfiguration {
  Elements: GridLayoutElement[];
  CanvasSizeOptions?: GridLayoutCanvasSizeOptions;
}
export type UnlimitedPixelLength = string;
export interface SheetElementConfigurationOverrides {
  Visibility?: Visibility;
}
export interface SheetElementRenderingRule {
  Expression: string | redacted.Redacted<string>;
  ConfigurationOverrides: SheetElementConfigurationOverrides;
}
export type SheetElementRenderingRuleList = SheetElementRenderingRule[];
export interface FreeFormLayoutElementBorderStyle {
  Visibility?: Visibility;
  Color?: string;
  Width?: string;
}
export interface FreeFormLayoutElementBackgroundStyle {
  Visibility?: Visibility;
  Color?: string;
}
export interface FreeFormLayoutElement {
  ElementId: string;
  ElementType: LayoutElementType;
  XAxisLocation: string;
  YAxisLocation: string;
  Width: string;
  Height: string;
  Visibility?: Visibility;
  RenderingRules?: SheetElementRenderingRule[];
  BorderStyle?: FreeFormLayoutElementBorderStyle;
  SelectedBorderStyle?: FreeFormLayoutElementBorderStyle;
  BackgroundStyle?: FreeFormLayoutElementBackgroundStyle;
  LoadingAnimation?: LoadingAnimation;
  BorderRadius?: string;
  Padding?: string;
}
export type FreeFromLayoutElementList = FreeFormLayoutElement[];
export interface FreeFormLayoutScreenCanvasSizeOptions {
  OptimizedViewPortWidth: string;
}
export interface FreeFormLayoutCanvasSizeOptions {
  ScreenCanvasSizeOptions?: FreeFormLayoutScreenCanvasSizeOptions;
}
export type SheetLayoutGroupMemberType = "ELEMENT" | "GROUP" | (string & {});
export interface SheetLayoutGroupMember {
  Id: string;
  Type: SheetLayoutGroupMemberType;
}
export type SheetLayoutGroupMemberList = SheetLayoutGroupMember[];
export interface SheetLayoutGroup {
  Id: string;
  Members: SheetLayoutGroupMember[];
}
export type SheetLayoutGroupList = SheetLayoutGroup[];
export interface FreeFormLayoutConfiguration {
  Elements: FreeFormLayoutElement[];
  CanvasSizeOptions?: FreeFormLayoutCanvasSizeOptions;
  Groups?: SheetLayoutGroup[];
}
export interface FreeFormSectionLayoutConfiguration {
  Elements: FreeFormLayoutElement[];
}
export interface SectionLayoutConfiguration {
  FreeFormLayout: FreeFormSectionLayoutConfiguration;
}
export type Length = string;
export interface Spacing {
  Top?: string;
  Bottom?: string;
  Left?: string;
  Right?: string;
}
export interface SectionStyle {
  Height?: string;
  Padding?: Spacing;
}
export interface HeaderFooterSectionConfiguration {
  SectionId: string;
  Layout: SectionLayoutConfiguration;
  Style?: SectionStyle;
}
export type HeaderFooterSectionConfigurationList =
  HeaderFooterSectionConfiguration[];
export interface BodySectionContent {
  Layout?: SectionLayoutConfiguration;
}
export type SectionPageBreakStatus = "ENABLED" | "DISABLED" | (string & {});
export interface SectionAfterPageBreak {
  Status?: SectionPageBreakStatus;
}
export interface SectionPageBreakConfiguration {
  After?: SectionAfterPageBreak;
}
export type BodySectionDynamicDimensionLimit = number;
export type BodySectionDynamicDimensionSortConfigurationList = ColumnSort[];
export interface BodySectionDynamicCategoryDimensionConfiguration {
  Column: ColumnIdentifier;
  Limit?: number;
  SortByMetrics?: ColumnSort[];
}
export interface BodySectionDynamicNumericDimensionConfiguration {
  Column: ColumnIdentifier;
  Limit?: number;
  SortByMetrics?: ColumnSort[];
}
export interface BodySectionRepeatDimensionConfiguration {
  DynamicCategoryDimensionConfiguration?: BodySectionDynamicCategoryDimensionConfiguration;
  DynamicNumericDimensionConfiguration?: BodySectionDynamicNumericDimensionConfiguration;
}
export type BodySectionRepeatDimensionConfigurationList =
  BodySectionRepeatDimensionConfiguration[];
export interface BodySectionRepeatPageBreakConfiguration {
  After?: SectionAfterPageBreak;
}
export type NonRepeatingVisualsList = string[];
export interface BodySectionRepeatConfiguration {
  DimensionConfigurations?: BodySectionRepeatDimensionConfiguration[];
  PageBreakConfiguration?: BodySectionRepeatPageBreakConfiguration;
  NonRepeatingVisuals?: string[];
}
export interface BodySectionConfiguration {
  SectionId: string;
  Content: BodySectionContent;
  Style?: SectionStyle;
  PageBreakConfiguration?: SectionPageBreakConfiguration;
  RepeatConfiguration?: BodySectionRepeatConfiguration;
}
export type BodySectionConfigurationList = BodySectionConfiguration[];
export type PaperSize =
  | "US_LETTER"
  | "US_LEGAL"
  | "US_TABLOID_LEDGER"
  | "A0"
  | "A1"
  | "A2"
  | "A3"
  | "A4"
  | "A5"
  | "JIS_B4"
  | "JIS_B5"
  | (string & {});
export type PaperOrientation = "PORTRAIT" | "LANDSCAPE" | (string & {});
export interface SectionBasedLayoutPaperCanvasSizeOptions {
  PaperSize?: PaperSize;
  PaperOrientation?: PaperOrientation;
  PaperMargin?: Spacing;
}
export interface SectionBasedLayoutCanvasSizeOptions {
  PaperCanvasSizeOptions?: SectionBasedLayoutPaperCanvasSizeOptions;
}
export interface SectionBasedLayoutConfiguration {
  HeaderSections: HeaderFooterSectionConfiguration[];
  BodySections: BodySectionConfiguration[];
  FooterSections: HeaderFooterSectionConfiguration[];
  CanvasSizeOptions: SectionBasedLayoutCanvasSizeOptions;
}
export interface LayoutConfiguration {
  GridLayout?: GridLayoutConfiguration;
  FreeFormLayout?: FreeFormLayoutConfiguration;
  SectionBasedLayout?: SectionBasedLayoutConfiguration;
}
export interface Layout {
  Configuration: LayoutConfiguration;
}
export type LayoutList = Layout[];
export interface SheetControlLayoutConfiguration {
  GridLayout?: GridLayoutConfiguration;
}
export interface SheetControlLayout {
  Configuration: SheetControlLayoutConfiguration;
}
export type SheetControlLayoutList = SheetControlLayout[];
export type SheetContentType = "PAGINATED" | "INTERACTIVE" | (string & {});
export type VisualHighlightTrigger =
  | "DATA_POINT_CLICK"
  | "DATA_POINT_HOVER"
  | "NONE"
  | (string & {});
export interface VisualHighlightOperation {
  Trigger: VisualHighlightTrigger;
}
export interface VisualCustomActionDefaults {
  highlightOperation?: VisualHighlightOperation;
}
export interface SheetDefinition {
  SheetId: string;
  Title?: string;
  Description?: string;
  Name?: string;
  ParameterControls?: ParameterControl[];
  FilterControls?: FilterControl[];
  Visuals?: Visual[];
  TextBoxes?: SheetTextBox[];
  Images?: SheetImage[];
  Layouts?: Layout[];
  SheetControlLayouts?: SheetControlLayout[];
  ContentType?: SheetContentType;
  CustomActionDefaults?: VisualCustomActionDefaults;
}
export type SheetDefinitionList = SheetDefinition[];
export type TooltipSheetVisualList = Visual[];
export type TooltipSheetTextBoxList = SheetTextBox[];
export type TooltipSheetImageList = SheetImage[];
export interface TooltipSheetDefinition {
  SheetId: string;
  Name?: string;
  Visuals?: Visual[];
  TextBoxes?: SheetTextBox[];
  Images?: SheetImage[];
  Layouts?: Layout[];
}
export type TooltipSheetDefinitionList = TooltipSheetDefinition[];
export type CalculatedFieldExpression = string | redacted.Redacted<string>;
export interface CalculatedField {
  DataSetIdentifier?: string;
  TopicIdentifier?: string;
  Name: string;
  Expression: string | redacted.Redacted<string>;
}
export type CalculatedFields = CalculatedField[];
export type ParameterValueType =
  | "MULTI_VALUED"
  | "SINGLE_VALUED"
  | (string & {});
export interface DynamicDefaultValue {
  UserNameColumn?: ColumnIdentifier;
  GroupNameColumn?: ColumnIdentifier;
  DefaultValueColumn: ColumnIdentifier;
}
export interface StringDefaultValues {
  DynamicValue?: DynamicDefaultValue;
  StaticValues?: (string | redacted.Redacted<string>)[];
}
export type ValueWhenUnsetOption = "RECOMMENDED_VALUE" | "NULL" | (string & {});
export interface StringValueWhenUnsetConfiguration {
  ValueWhenUnsetOption?: ValueWhenUnsetOption;
  CustomValue?: string | redacted.Redacted<string>;
}
export interface MappedDataSetParameter {
  DataSetIdentifier: string;
  DataSetParameterName: string;
}
export type MappedDataSetParameters = MappedDataSetParameter[];
export interface StringParameterDeclaration {
  ParameterValueType: ParameterValueType;
  Name: string;
  DefaultValues?: StringDefaultValues;
  ValueWhenUnset?: StringValueWhenUnsetConfiguration;
  MappedDataSetParameters?: MappedDataSetParameter[];
}
export interface DecimalDefaultValues {
  DynamicValue?: DynamicDefaultValue;
  StaticValues?: number[];
}
export interface DecimalValueWhenUnsetConfiguration {
  ValueWhenUnsetOption?: ValueWhenUnsetOption;
  CustomValue?: number;
}
export interface DecimalParameterDeclaration {
  ParameterValueType: ParameterValueType;
  Name: string;
  DefaultValues?: DecimalDefaultValues;
  ValueWhenUnset?: DecimalValueWhenUnsetConfiguration;
  MappedDataSetParameters?: MappedDataSetParameter[];
}
export interface IntegerDefaultValues {
  DynamicValue?: DynamicDefaultValue;
  StaticValues?: number[];
}
export interface IntegerValueWhenUnsetConfiguration {
  ValueWhenUnsetOption?: ValueWhenUnsetOption;
  CustomValue?: number;
}
export interface IntegerParameterDeclaration {
  ParameterValueType: ParameterValueType;
  Name: string;
  DefaultValues?: IntegerDefaultValues;
  ValueWhenUnset?: IntegerValueWhenUnsetConfiguration;
  MappedDataSetParameters?: MappedDataSetParameter[];
}
export interface RollingDateConfiguration {
  DataSetIdentifier?: string;
  Expression: string | redacted.Redacted<string>;
}
export interface DateTimeDefaultValues {
  DynamicValue?: DynamicDefaultValue;
  StaticValues?: Date[];
  RollingDate?: RollingDateConfiguration;
}
export interface DateTimeValueWhenUnsetConfiguration {
  ValueWhenUnsetOption?: ValueWhenUnsetOption;
  CustomValue?: Date;
}
export interface DateTimeParameterDeclaration {
  Name: string;
  DefaultValues?: DateTimeDefaultValues;
  TimeGranularity?: TimeGranularity;
  ValueWhenUnset?: DateTimeValueWhenUnsetConfiguration;
  MappedDataSetParameters?: MappedDataSetParameter[];
}
export interface ParameterDeclaration {
  StringParameterDeclaration?: StringParameterDeclaration;
  DecimalParameterDeclaration?: DecimalParameterDeclaration;
  IntegerParameterDeclaration?: IntegerParameterDeclaration;
  DateTimeParameterDeclaration?: DateTimeParameterDeclaration;
}
export type ParameterDeclarationList = ParameterDeclaration[];
export type CategoryFilterMatchOperator =
  | "EQUALS"
  | "DOES_NOT_EQUAL"
  | "CONTAINS"
  | "DOES_NOT_CONTAIN"
  | "STARTS_WITH"
  | "ENDS_WITH"
  | (string & {});
export type CategoryFilterSelectAllOptions =
  | "FILTER_ALL_VALUES"
  | (string & {});
export type FilterNullOption =
  | "ALL_VALUES"
  | "NULLS_ONLY"
  | "NON_NULLS_ONLY"
  | (string & {});
export interface FilterListConfiguration {
  MatchOperator: CategoryFilterMatchOperator;
  CategoryValues?: string[];
  SelectAllOptions?: CategoryFilterSelectAllOptions;
  NullOption?: FilterNullOption;
}
export interface CustomFilterListConfiguration {
  MatchOperator: CategoryFilterMatchOperator;
  CategoryValues?: string[];
  SelectAllOptions?: CategoryFilterSelectAllOptions;
  NullOption: FilterNullOption;
}
export interface CustomFilterConfiguration {
  MatchOperator: CategoryFilterMatchOperator;
  CategoryValue?: string;
  SelectAllOptions?: CategoryFilterSelectAllOptions;
  ParameterName?: string;
  NullOption: FilterNullOption;
}
export interface CategoryFilterConfiguration {
  FilterListConfiguration?: FilterListConfiguration;
  CustomFilterListConfiguration?: CustomFilterListConfiguration;
  CustomFilterConfiguration?: CustomFilterConfiguration;
}
export interface DefaultDateTimePickerControlOptions {
  Type?: SheetControlDateTimePickerType;
  DisplayOptions?: DateTimePickerControlDisplayOptions;
  CommitMode?: CommitMode;
}
export interface DefaultFilterListControlOptions {
  DisplayOptions?: ListControlDisplayOptions;
  Type?: SheetControlListType;
  SelectableValues?: FilterSelectableValues;
  ControlSortConfigurations?: ControlSortConfiguration[];
}
export interface DefaultFilterDropDownControlOptions {
  DisplayOptions?: DropDownControlDisplayOptions;
  Type?: SheetControlListType;
  SelectableValues?: FilterSelectableValues;
  CommitMode?: CommitMode;
  ControlSortConfigurations?: ControlSortConfiguration[];
}
export interface DefaultTextFieldControlOptions {
  DisplayOptions?: TextFieldControlDisplayOptions;
}
export interface DefaultTextAreaControlOptions {
  Delimiter?: string;
  DisplayOptions?: TextAreaControlDisplayOptions;
}
export interface DefaultSliderControlOptions {
  DisplayOptions?: SliderControlDisplayOptions;
  Type?: SheetControlSliderType;
  MaximumValue: number;
  MinimumValue: number;
  StepSize: number;
}
export interface DefaultRelativeDateTimeControlOptions {
  DisplayOptions?: RelativeDateTimeControlDisplayOptions;
  CommitMode?: CommitMode;
}
export interface DefaultFilterControlOptions {
  DefaultDateTimePickerOptions?: DefaultDateTimePickerControlOptions;
  DefaultListOptions?: DefaultFilterListControlOptions;
  DefaultDropdownOptions?: DefaultFilterDropDownControlOptions;
  DefaultTextFieldOptions?: DefaultTextFieldControlOptions;
  DefaultTextAreaOptions?: DefaultTextAreaControlOptions;
  DefaultSliderOptions?: DefaultSliderControlOptions;
  DefaultRelativeDateTimeOptions?: DefaultRelativeDateTimeControlOptions;
}
export interface DefaultFilterControlConfiguration {
  Title?: string;
  ControlOptions: DefaultFilterControlOptions;
  ControlTitleFormatText?: ControlTitleFormatText;
}
export interface CategoryFilter {
  FilterId: string;
  Column: ColumnIdentifier;
  Configuration: CategoryFilterConfiguration;
  DefaultFilterControlConfiguration?: DefaultFilterControlConfiguration;
}
export interface NumericRangeFilterValue {
  StaticValue?: number;
  Parameter?: string;
}
export type NumericFilterSelectAllOptions = "FILTER_ALL_VALUES" | (string & {});
export interface NumericRangeFilter {
  FilterId: string;
  Column: ColumnIdentifier;
  IncludeMinimum?: boolean;
  IncludeMaximum?: boolean;
  RangeMinimum?: NumericRangeFilterValue;
  RangeMaximum?: NumericRangeFilterValue;
  SelectAllOptions?: NumericFilterSelectAllOptions;
  AggregationFunction?: AggregationFunction;
  NullOption: FilterNullOption;
  DefaultFilterControlConfiguration?: DefaultFilterControlConfiguration;
}
export type NumericEqualityMatchOperator =
  | "EQUALS"
  | "DOES_NOT_EQUAL"
  | (string & {});
export interface NumericEqualityFilter {
  FilterId: string;
  Column: ColumnIdentifier;
  Value?: number;
  SelectAllOptions?: NumericFilterSelectAllOptions;
  MatchOperator: NumericEqualityMatchOperator;
  AggregationFunction?: AggregationFunction;
  ParameterName?: string;
  NullOption: FilterNullOption;
  DefaultFilterControlConfiguration?: DefaultFilterControlConfiguration;
}
export interface TimeEqualityFilter {
  FilterId: string;
  Column: ColumnIdentifier;
  Value?: Date;
  ParameterName?: string;
  TimeGranularity?: TimeGranularity;
  RollingDate?: RollingDateConfiguration;
  DefaultFilterControlConfiguration?: DefaultFilterControlConfiguration;
}
export interface TimeRangeFilterValue {
  StaticValue?: Date;
  RollingDate?: RollingDateConfiguration;
  Parameter?: string;
}
export interface ExcludePeriodConfiguration {
  Amount: number;
  Granularity: TimeGranularity;
  Status?: WidgetStatus;
}
export interface TimeRangeFilter {
  FilterId: string;
  Column: ColumnIdentifier;
  IncludeMinimum?: boolean;
  IncludeMaximum?: boolean;
  RangeMinimumValue?: TimeRangeFilterValue;
  RangeMaximumValue?: TimeRangeFilterValue;
  NullOption: FilterNullOption;
  ExcludePeriodConfiguration?: ExcludePeriodConfiguration;
  TimeGranularity?: TimeGranularity;
  DefaultFilterControlConfiguration?: DefaultFilterControlConfiguration;
}
export type AnchorOption = "NOW" | (string & {});
export interface AnchorDateConfiguration {
  AnchorOption?: AnchorOption;
  ParameterName?: string;
}
export type RelativeDateType =
  | "PREVIOUS"
  | "THIS"
  | "LAST"
  | "NOW"
  | "NEXT"
  | (string & {});
export interface RelativeDatesFilter {
  FilterId: string;
  Column: ColumnIdentifier;
  AnchorDateConfiguration: AnchorDateConfiguration;
  MinimumGranularity?: TimeGranularity;
  TimeGranularity: TimeGranularity;
  RelativeDateType: RelativeDateType;
  RelativeDateValue?: number;
  ParameterName?: string;
  NullOption: FilterNullOption;
  ExcludePeriodConfiguration?: ExcludePeriodConfiguration;
  DefaultFilterControlConfiguration?: DefaultFilterControlConfiguration;
}
export type AggregationSortConfigurationList = AggregationSortConfiguration[];
export interface TopBottomFilter {
  FilterId: string;
  Column: ColumnIdentifier;
  Limit?: number;
  AggregationSortConfigurations: AggregationSortConfiguration[];
  TimeGranularity?: TimeGranularity;
  ParameterName?: string;
  DefaultFilterControlConfiguration?: DefaultFilterControlConfiguration;
}
export interface CategoryInnerFilter {
  Column: ColumnIdentifier;
  Configuration: CategoryFilterConfiguration;
  DefaultFilterControlConfiguration?: DefaultFilterControlConfiguration;
}
export interface InnerFilter {
  CategoryInnerFilter?: CategoryInnerFilter;
}
export interface NestedFilter {
  FilterId: string;
  Column: ColumnIdentifier;
  IncludeInnerSet: boolean;
  InnerFilter: InnerFilter;
}
export interface Filter {
  CategoryFilter?: CategoryFilter;
  NumericRangeFilter?: NumericRangeFilter;
  NumericEqualityFilter?: NumericEqualityFilter;
  TimeEqualityFilter?: TimeEqualityFilter;
  TimeRangeFilter?: TimeRangeFilter;
  RelativeDatesFilter?: RelativeDatesFilter;
  TopBottomFilter?: TopBottomFilter;
  NestedFilter?: NestedFilter;
}
export type FilterList = Filter[];
export type FilterVisualScope =
  | "ALL_VISUALS"
  | "SELECTED_VISUALS"
  | (string & {});
export type FilteredVisualsList = string[];
export interface SheetVisualScopingConfiguration {
  SheetId: string;
  Scope: FilterVisualScope;
  VisualIds?: string[];
}
export type SheetVisualScopingConfigurations =
  SheetVisualScopingConfiguration[];
export interface SelectedSheetsFilterScopeConfiguration {
  SheetVisualScopingConfigurations?: SheetVisualScopingConfiguration[];
}
export interface AllSheetsFilterScopeConfiguration {}
export interface FilterScopeConfiguration {
  SelectedSheets?: SelectedSheetsFilterScopeConfiguration;
  AllSheets?: AllSheetsFilterScopeConfiguration;
}
export type CrossDatasetTypes =
  | "ALL_DATASETS"
  | "SINGLE_DATASET"
  | (string & {});
export interface FilterGroup {
  FilterGroupId: string;
  Filters: Filter[];
  ScopeConfiguration: FilterScopeConfiguration;
  Status?: WidgetStatus;
  CrossDataset: CrossDatasetTypes;
}
export type FilterGroupList = FilterGroup[];
export type ColumnRole = "DIMENSION" | "MEASURE" | (string & {});
export type SpecialValue = "EMPTY" | "NULL" | "OTHER" | (string & {});
export interface CustomColor {
  FieldValue?: string | redacted.Redacted<string>;
  Color: string;
  SpecialValue?: SpecialValue;
}
export type CustomColorsList = CustomColor[];
export interface ColorsConfiguration {
  CustomColors?: CustomColor[];
}
export type DecalSettingsList = DecalSettings[];
export interface DecalSettingsConfiguration {
  CustomDecalSettings?: DecalSettings[];
}
export interface ColumnConfiguration {
  Column: ColumnIdentifier;
  FormatConfiguration?: FormatConfiguration;
  Role?: ColumnRole;
  ColorsConfiguration?: ColorsConfiguration;
  DecalSettingsConfiguration?: DecalSettingsConfiguration;
}
export type ColumnConfigurationList = ColumnConfiguration[];
export interface DefaultGridLayoutConfiguration {
  CanvasSizeOptions: GridLayoutCanvasSizeOptions;
}
export interface DefaultFreeFormLayoutConfiguration {
  CanvasSizeOptions: FreeFormLayoutCanvasSizeOptions;
}
export interface DefaultInteractiveLayoutConfiguration {
  Grid?: DefaultGridLayoutConfiguration;
  FreeForm?: DefaultFreeFormLayoutConfiguration;
}
export interface DefaultSectionBasedLayoutConfiguration {
  CanvasSizeOptions: SectionBasedLayoutCanvasSizeOptions;
}
export interface DefaultPaginatedLayoutConfiguration {
  SectionBased?: DefaultSectionBasedLayoutConfiguration;
}
export interface DefaultNewSheetConfiguration {
  InteractiveLayoutConfiguration?: DefaultInteractiveLayoutConfiguration;
  PaginatedLayoutConfiguration?: DefaultPaginatedLayoutConfiguration;
  SheetContentType?: SheetContentType;
}
export interface AnalysisDefaults {
  DefaultNewSheetConfiguration: DefaultNewSheetConfiguration;
}
export type DayOfTheWeek =
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | (string & {});
export type QBusinessInsightsStatus = "ENABLED" | "DISABLED" | (string & {});
export type DataSetArnsList = string[];
export type VisualMessageText = string;
export type VisualMessageLinkUrl = string;
export interface VisualMessageConfiguration {
  Enabled?: boolean;
  Title?: string;
  TitleVisibility?: Visibility;
  Description?: string;
  DescriptionVisibility?: Visibility;
  LinkText?: string;
  LinkUrl?: string;
  LinkVisibility?: Visibility;
}
export interface VisualMessages {
  NoDataMessage?: VisualMessageConfiguration;
}
export interface AssetOptions {
  Timezone?: string;
  WeekStart?: DayOfTheWeek;
  QBusinessInsightsStatus?: QBusinessInsightsStatus;
  ExcludedDataSetArns?: string[];
  CustomActionDefaults?: VisualCustomActionDefaults;
  VisualMessages?: VisualMessages;
}
export type QueryExecutionMode = "AUTO" | "MANUAL" | (string & {});
export interface QueryExecutionOptions {
  QueryExecutionMode?: QueryExecutionMode;
}
export interface StaticFileUrlSourceOptions {
  Url: string;
}
export interface StaticFileS3SourceOptions {
  BucketName: string;
  ObjectKey: string;
  Region: string;
}
export interface StaticFileSource {
  UrlOptions?: StaticFileUrlSourceOptions;
  S3Options?: StaticFileS3SourceOptions;
}
export interface ImageStaticFile {
  StaticFileId: string;
  Source?: StaticFileSource;
}
export interface SpatialStaticFile {
  StaticFileId: string;
  Source?: StaticFileSource;
}
export interface StaticFile {
  ImageStaticFile?: ImageStaticFile;
  SpatialStaticFile?: SpatialStaticFile;
}
export type StaticFileList = StaticFile[];
export interface AnalysisDefinition {
  DataSetIdentifierDeclarations: DataSetIdentifierDeclaration[];
  TopicIdentifierDeclarations?: TopicIdentifierDeclaration[];
  Sheets?: SheetDefinition[];
  TooltipSheets?: TooltipSheetDefinition[];
  CalculatedFields?: CalculatedField[];
  ParameterDeclarations?: ParameterDeclaration[];
  FilterGroups?: FilterGroup[];
  ColumnConfigurations?: ColumnConfiguration[];
  AnalysisDefaults?: AnalysisDefaults;
  Options?: AssetOptions;
  QueryExecutionOptions?: QueryExecutionOptions;
  StaticFiles?: StaticFile[];
}
export type ValidationStrategyMode = "STRICT" | "LENIENT" | (string & {});
export interface ValidationStrategy {
  Mode: ValidationStrategyMode;
}
export type FolderArnList = string[];
export interface CreateAnalysisRequest {
  AwsAccountId: string;
  AnalysisId: string;
  Name: string;
  Parameters?: Parameters;
  Permissions?: ResourcePermission[];
  SourceEntity?: AnalysisSourceEntity;
  ThemeArn?: string;
  Tags?: Tag[];
  Definition?: AnalysisDefinition;
  ValidationStrategy?: ValidationStrategy;
  FolderArns?: string[];
}
export interface CreateAnalysisResponse {
  Arn?: string;
  AnalysisId?: string;
  CreationStatus?: ResourceStatus;
  Status?: number;
  RequestId?: string;
}
export type PolicyId = string;
export type PolicyName = string;
export type PolicyDescription = string;
export type GovernedAction = "SHARE" | (string & {});
export type GovernedActionList = GovernedAction[];
export type AssetType = "AGENT" | "SPACE" | "KNOWLEDGE_BASE" | (string & {});
export type AssetTypeList = AssetType[];
export type ApplicableToType = "GROUP" | (string & {});
export type GroupArnList = string[];
export interface ApplicableTo {
  Type: ApplicableToType;
  GroupArns?: string[];
}
export type ApprovalGroupList = string[];
export interface CreateApprovalPolicyRequest {
  PolicyId: string;
  Name: string;
  Description?: string;
  Actions: GovernedAction[];
  AssetTypes: AssetType[];
  ApplicableTo: ApplicableTo;
  ApprovalGroups: string[];
}
export interface ApprovalPolicy {
  PolicyId: string;
  PolicyArn: string;
  Name: string;
  Description?: string;
  Actions: GovernedAction[];
  AssetTypes: AssetType[];
  ApplicableTo: ApplicableTo;
  ApprovalGroups: string[];
  CreatedAt: Date;
  UpdatedAt: Date;
}
export interface CreateApprovalPolicyResponse {
  Policy: ApprovalPolicy;
}
export type Name = string;
export type Description = string;
export interface Palette {
  Foreground?: string;
  Background?: string;
}
export interface BrandColorPalette {
  Primary?: Palette;
  Secondary?: Palette;
  Accent?: Palette;
  Measure?: Palette;
  Dimension?: Palette;
  Success?: Palette;
  Info?: Palette;
  Warning?: Palette;
  Danger?: Palette;
}
export interface ContextualAccentPalette {
  Connection?: Palette;
  Visualization?: Palette;
  Insight?: Palette;
  Automation?: Palette;
}
export interface NavbarStyle {
  GlobalNavbar?: Palette;
  ContextualNavbar?: Palette;
}
export interface BrandElementStyle {
  NavbarStyle?: NavbarStyle;
}
export interface ApplicationTheme {
  BrandColorPalette?: BrandColorPalette;
  ContextualAccentPalette?: ContextualAccentPalette;
  BrandElementStyle?: BrandElementStyle;
}
export type ImageSource =
  | { PublicUrl: string; S3Uri?: never }
  | { PublicUrl?: never; S3Uri: string };
export interface ImageConfiguration {
  Source?: ImageSource;
}
export interface ImageSetConfiguration {
  Original: ImageConfiguration;
}
export interface LogoSetConfiguration {
  Primary: ImageSetConfiguration;
  Favicon?: ImageSetConfiguration;
}
export interface LogoConfiguration {
  AltText: string;
  LogoSet: LogoSetConfiguration;
}
export interface BrandDefinition {
  BrandName: string;
  Description?: string;
  ApplicationTheme?: ApplicationTheme;
  LogoConfiguration?: LogoConfiguration;
}
export interface CreateBrandRequest {
  AwsAccountId: string;
  BrandId: string;
  BrandDefinition?: BrandDefinition;
  Tags?: Tag[];
}
export type BrandStatus =
  | "CREATE_IN_PROGRESS"
  | "CREATE_SUCCEEDED"
  | "CREATE_FAILED"
  | "DELETE_IN_PROGRESS"
  | "DELETE_FAILED"
  | (string & {});
export type BrandVersionStatus =
  | "CREATE_IN_PROGRESS"
  | "CREATE_SUCCEEDED"
  | "CREATE_FAILED"
  | (string & {});
export type ErrorMessage = string;
export type ErrorList = string[];
export type AltText = string;
export interface Image {
  Source?: ImageSource;
  GeneratedImageUrl?: string;
}
export interface ImageSet {
  Original: Image;
  Height64?: Image;
  Height32?: Image;
}
export interface LogoSet {
  Primary: ImageSet;
  Favicon?: ImageSet;
}
export interface Logo {
  AltText: string;
  LogoSet: LogoSet;
}
export interface BrandDetail {
  BrandId: string;
  Arn?: string;
  BrandStatus?: BrandStatus;
  CreatedTime?: Date;
  LastUpdatedTime?: Date;
  VersionId?: string;
  VersionStatus?: BrandVersionStatus;
  Errors?: string[];
  Logo?: Logo;
}
export interface CreateBrandResponse {
  RequestId?: string;
  BrandDetail?: BrandDetail;
  BrandDefinition?: BrandDefinition;
}
export type CustomPermissionsName = string;
export type CapabilityState = "DENY" | "ALLOW" | (string & {});
export interface Capabilities {
  ExportToCsv?: CapabilityState;
  ExportToExcel?: CapabilityState;
  ExportToPdf?: CapabilityState;
  PrintReports?: CapabilityState;
  CreateAndUpdateThemes?: CapabilityState;
  AddOrRunAnomalyDetectionForAnalyses?: CapabilityState;
  ShareAnalyses?: CapabilityState;
  CreateAndUpdateDatasets?: CapabilityState;
  ShareDatasets?: CapabilityState;
  SubscribeDashboardEmailReports?: CapabilityState;
  CreateAndUpdateDashboardEmailReports?: CapabilityState;
  ShareDashboards?: CapabilityState;
  CreateAndUpdateThresholdAlerts?: CapabilityState;
  RenameSharedFolders?: CapabilityState;
  CreateSharedFolders?: CapabilityState;
  CreateAndUpdateDataSources?: CapabilityState;
  ShareDataSources?: CapabilityState;
  ViewAccountSPICECapacity?: CapabilityState;
  CreateSPICEDataset?: CapabilityState;
  ExportToPdfInScheduledReports?: CapabilityState;
  ExportToCsvInScheduledReports?: CapabilityState;
  ExportToExcelInScheduledReports?: CapabilityState;
  IncludeContentInScheduledReportsEmail?: CapabilityState;
  Dashboard?: CapabilityState;
  Analysis?: CapabilityState;
  Automate?: CapabilityState;
  Flow?: CapabilityState;
  Apps?: CapabilityState;
  CreateAndUpdateApps?: CapabilityState;
  ShareApps?: CapabilityState;
  InvokeAppsAIInference?: CapabilityState;
  AccessAppsNativeDataStore?: CapabilityState;
  PublishWithoutApproval?: CapabilityState;
  UseBedrockModels?: CapabilityState;
  PerformFlowUiTask?: CapabilityState;
  ApproveFlowShareRequests?: CapabilityState;
  UseAgentWebSearch?: CapabilityState;
  KnowledgeBase?: CapabilityState;
  CreateAndUpdateKnowledgeBases?: CapabilityState;
  ShareKnowledgeBases?: CapabilityState;
  SharePointKnowledgeBase?: CapabilityState;
  CreateAndUpdateSharePointKnowledgeBase?: CapabilityState;
  ShareSharePointKnowledgeBase?: CapabilityState;
  UseSharePointKnowledgeBase?: CapabilityState;
  GoogleDriveKnowledgeBase?: CapabilityState;
  CreateAndUpdateGoogleDriveKnowledgeBase?: CapabilityState;
  ShareGoogleDriveKnowledgeBase?: CapabilityState;
  UseGoogleDriveKnowledgeBase?: CapabilityState;
  WebCrawlerKnowledgeBase?: CapabilityState;
  CreateAndUpdateWebCrawlerKnowledgeBase?: CapabilityState;
  ShareWebCrawlerKnowledgeBase?: CapabilityState;
  UseWebCrawlerKnowledgeBase?: CapabilityState;
  S3KnowledgeBase?: CapabilityState;
  CreateAndUpdateS3KnowledgeBase?: CapabilityState;
  ShareS3KnowledgeBase?: CapabilityState;
  UseS3KnowledgeBase?: CapabilityState;
  ConfluenceKnowledgeBase?: CapabilityState;
  CreateAndUpdateConfluenceKnowledgeBase?: CapabilityState;
  ShareConfluenceKnowledgeBase?: CapabilityState;
  UseConfluenceKnowledgeBase?: CapabilityState;
  OneDriveKnowledgeBase?: CapabilityState;
  CreateAndUpdateOneDriveKnowledgeBase?: CapabilityState;
  ShareOneDriveKnowledgeBase?: CapabilityState;
  UseOneDriveKnowledgeBase?: CapabilityState;
  QBusinessKnowledgeBase?: CapabilityState;
  CreateAndUpdateQBusinessKnowledgeBase?: CapabilityState;
  ShareQBusinessKnowledgeBase?: CapabilityState;
  UseQBusinessKnowledgeBase?: CapabilityState;
  BedrockManagedKnowledgeBase?: CapabilityState;
  CreateAndUpdateBedrockManagedKnowledgeBase?: CapabilityState;
  ShareBedrockManagedKnowledgeBase?: CapabilityState;
  UseBedrockManagedKnowledgeBase?: CapabilityState;
  BoxKnowledgeBase?: CapabilityState;
  CreateAndUpdateBoxKnowledgeBase?: CapabilityState;
  ShareBoxKnowledgeBase?: CapabilityState;
  UseBoxKnowledgeBase?: CapabilityState;
  IDCKnowledgeBase?: CapabilityState;
  CreateAndUpdateIDCKnowledgeBase?: CapabilityState;
  ShareIDCKnowledgeBase?: CapabilityState;
  UseIDCKnowledgeBase?: CapabilityState;
  Action?: CapabilityState;
  GenericHTTPAction?: CapabilityState;
  CreateAndUpdateGenericHTTPAction?: CapabilityState;
  ShareGenericHTTPAction?: CapabilityState;
  UseGenericHTTPAction?: CapabilityState;
  AsanaAction?: CapabilityState;
  CreateAndUpdateAsanaAction?: CapabilityState;
  ShareAsanaAction?: CapabilityState;
  UseAsanaAction?: CapabilityState;
  SlackAction?: CapabilityState;
  CreateAndUpdateSlackAction?: CapabilityState;
  ShareSlackAction?: CapabilityState;
  UseSlackAction?: CapabilityState;
  ServiceNowAction?: CapabilityState;
  CreateAndUpdateServiceNowAction?: CapabilityState;
  ShareServiceNowAction?: CapabilityState;
  UseServiceNowAction?: CapabilityState;
  SalesforceAction?: CapabilityState;
  CreateAndUpdateSalesforceAction?: CapabilityState;
  ShareSalesforceAction?: CapabilityState;
  UseSalesforceAction?: CapabilityState;
  MSExchangeAction?: CapabilityState;
  CreateAndUpdateMSExchangeAction?: CapabilityState;
  ShareMSExchangeAction?: CapabilityState;
  UseMSExchangeAction?: CapabilityState;
  PagerDutyAction?: CapabilityState;
  CreateAndUpdatePagerDutyAction?: CapabilityState;
  SharePagerDutyAction?: CapabilityState;
  UsePagerDutyAction?: CapabilityState;
  JiraAction?: CapabilityState;
  CreateAndUpdateJiraAction?: CapabilityState;
  ShareJiraAction?: CapabilityState;
  UseJiraAction?: CapabilityState;
  ConfluenceAction?: CapabilityState;
  CreateAndUpdateConfluenceAction?: CapabilityState;
  ShareConfluenceAction?: CapabilityState;
  UseConfluenceAction?: CapabilityState;
  OneDriveAction?: CapabilityState;
  CreateAndUpdateOneDriveAction?: CapabilityState;
  ShareOneDriveAction?: CapabilityState;
  UseOneDriveAction?: CapabilityState;
  SharePointAction?: CapabilityState;
  CreateAndUpdateSharePointAction?: CapabilityState;
  ShareSharePointAction?: CapabilityState;
  UseSharePointAction?: CapabilityState;
  MSTeamsAction?: CapabilityState;
  CreateAndUpdateMSTeamsAction?: CapabilityState;
  ShareMSTeamsAction?: CapabilityState;
  UseMSTeamsAction?: CapabilityState;
  GoogleCalendarAction?: CapabilityState;
  CreateAndUpdateGoogleCalendarAction?: CapabilityState;
  ShareGoogleCalendarAction?: CapabilityState;
  UseGoogleCalendarAction?: CapabilityState;
  ZendeskAction?: CapabilityState;
  CreateAndUpdateZendeskAction?: CapabilityState;
  ShareZendeskAction?: CapabilityState;
  UseZendeskAction?: CapabilityState;
  SmartsheetAction?: CapabilityState;
  CreateAndUpdateSmartsheetAction?: CapabilityState;
  ShareSmartsheetAction?: CapabilityState;
  UseSmartsheetAction?: CapabilityState;
  SAPBusinessPartnerAction?: CapabilityState;
  CreateAndUpdateSAPBusinessPartnerAction?: CapabilityState;
  ShareSAPBusinessPartnerAction?: CapabilityState;
  UseSAPBusinessPartnerAction?: CapabilityState;
  SAPProductMasterDataAction?: CapabilityState;
  CreateAndUpdateSAPProductMasterDataAction?: CapabilityState;
  ShareSAPProductMasterDataAction?: CapabilityState;
  UseSAPProductMasterDataAction?: CapabilityState;
  SAPPhysicalInventoryAction?: CapabilityState;
  CreateAndUpdateSAPPhysicalInventoryAction?: CapabilityState;
  ShareSAPPhysicalInventoryAction?: CapabilityState;
  UseSAPPhysicalInventoryAction?: CapabilityState;
  SAPBillOfMaterialAction?: CapabilityState;
  CreateAndUpdateSAPBillOfMaterialAction?: CapabilityState;
  ShareSAPBillOfMaterialAction?: CapabilityState;
  UseSAPBillOfMaterialAction?: CapabilityState;
  SAPMaterialStockAction?: CapabilityState;
  CreateAndUpdateSAPMaterialStockAction?: CapabilityState;
  ShareSAPMaterialStockAction?: CapabilityState;
  UseSAPMaterialStockAction?: CapabilityState;
  FactSetAction?: CapabilityState;
  CreateAndUpdateFactSetAction?: CapabilityState;
  ShareFactSetAction?: CapabilityState;
  UseFactSetAction?: CapabilityState;
  AmazonSThreeAction?: CapabilityState;
  CreateAndUpdateAmazonSThreeAction?: CapabilityState;
  ShareAmazonSThreeAction?: CapabilityState;
  UseAmazonSThreeAction?: CapabilityState;
  TextractAction?: CapabilityState;
  CreateAndUpdateTextractAction?: CapabilityState;
  ShareTextractAction?: CapabilityState;
  UseTextractAction?: CapabilityState;
  ComprehendAction?: CapabilityState;
  CreateAndUpdateComprehendAction?: CapabilityState;
  ShareComprehendAction?: CapabilityState;
  UseComprehendAction?: CapabilityState;
  ComprehendMedicalAction?: CapabilityState;
  CreateAndUpdateComprehendMedicalAction?: CapabilityState;
  ShareComprehendMedicalAction?: CapabilityState;
  UseComprehendMedicalAction?: CapabilityState;
  AmazonBedrockARSAction?: CapabilityState;
  CreateAndUpdateAmazonBedrockARSAction?: CapabilityState;
  ShareAmazonBedrockARSAction?: CapabilityState;
  UseAmazonBedrockARSAction?: CapabilityState;
  AmazonBedrockFSAction?: CapabilityState;
  CreateAndUpdateAmazonBedrockFSAction?: CapabilityState;
  ShareAmazonBedrockFSAction?: CapabilityState;
  UseAmazonBedrockFSAction?: CapabilityState;
  AmazonBedrockKRSAction?: CapabilityState;
  CreateAndUpdateAmazonBedrockKRSAction?: CapabilityState;
  ShareAmazonBedrockKRSAction?: CapabilityState;
  UseAmazonBedrockKRSAction?: CapabilityState;
  MCPAction?: CapabilityState;
  CreateAndUpdateMCPAction?: CapabilityState;
  ShareMCPAction?: CapabilityState;
  UseMCPAction?: CapabilityState;
  OpenAPIAction?: CapabilityState;
  CreateAndUpdateOpenAPIAction?: CapabilityState;
  ShareOpenAPIAction?: CapabilityState;
  UseOpenAPIAction?: CapabilityState;
  SandPGMIAction?: CapabilityState;
  CreateAndUpdateSandPGMIAction?: CapabilityState;
  ShareSandPGMIAction?: CapabilityState;
  UseSandPGMIAction?: CapabilityState;
  SandPGlobalEnergyAction?: CapabilityState;
  CreateAndUpdateSandPGlobalEnergyAction?: CapabilityState;
  ShareSandPGlobalEnergyAction?: CapabilityState;
  UseSandPGlobalEnergyAction?: CapabilityState;
  BambooHRAction?: CapabilityState;
  CreateAndUpdateBambooHRAction?: CapabilityState;
  ShareBambooHRAction?: CapabilityState;
  UseBambooHRAction?: CapabilityState;
  BoxAgentAction?: CapabilityState;
  CreateAndUpdateBoxAgentAction?: CapabilityState;
  ShareBoxAgentAction?: CapabilityState;
  UseBoxAgentAction?: CapabilityState;
  CanvaAgentAction?: CapabilityState;
  CreateAndUpdateCanvaAgentAction?: CapabilityState;
  ShareCanvaAgentAction?: CapabilityState;
  UseCanvaAgentAction?: CapabilityState;
  GithubAction?: CapabilityState;
  CreateAndUpdateGithubAction?: CapabilityState;
  ShareGithubAction?: CapabilityState;
  UseGithubAction?: CapabilityState;
  NotionAction?: CapabilityState;
  CreateAndUpdateNotionAction?: CapabilityState;
  ShareNotionAction?: CapabilityState;
  UseNotionAction?: CapabilityState;
  LinearAction?: CapabilityState;
  CreateAndUpdateLinearAction?: CapabilityState;
  ShareLinearAction?: CapabilityState;
  UseLinearAction?: CapabilityState;
  HuggingFaceAction?: CapabilityState;
  CreateAndUpdateHuggingFaceAction?: CapabilityState;
  ShareHuggingFaceAction?: CapabilityState;
  UseHuggingFaceAction?: CapabilityState;
  MondayAction?: CapabilityState;
  CreateAndUpdateMondayAction?: CapabilityState;
  ShareMondayAction?: CapabilityState;
  UseMondayAction?: CapabilityState;
  HubspotAction?: CapabilityState;
  CreateAndUpdateHubspotAction?: CapabilityState;
  ShareHubspotAction?: CapabilityState;
  UseHubspotAction?: CapabilityState;
  IntercomAction?: CapabilityState;
  CreateAndUpdateIntercomAction?: CapabilityState;
  ShareIntercomAction?: CapabilityState;
  UseIntercomAction?: CapabilityState;
  NewRelicAction?: CapabilityState;
  CreateAndUpdateNewRelicAction?: CapabilityState;
  ShareNewRelicAction?: CapabilityState;
  UseNewRelicAction?: CapabilityState;
  Topic?: CapabilityState;
  EditVisualWithQ?: CapabilityState;
  BuildCalculatedFieldWithQ?: CapabilityState;
  CreateDashboardExecutiveSummaryWithQ?: CapabilityState;
  Space?: CapabilityState;
  CreateSpaces?: CapabilityState;
  ShareSpaces?: CapabilityState;
  ChatAgent?: CapabilityState;
  CreateChatAgents?: CapabilityState;
  ShareChatAgents?: CapabilityState;
  Research?: CapabilityState;
  SelfUpgradeUserRole?: CapabilityState;
  Extension?: CapabilityState;
  UseBrowserExtension?: CapabilityState;
  UseWordAddInExtension?: CapabilityState;
  UseOutlookAddInExtension?: CapabilityState;
  UseExcelAddInExtension?: CapabilityState;
  UsePowerpointAddInExtension?: CapabilityState;
  ManageSharedFolders?: CapabilityState;
  GenerateAnalyses?: CapabilityState;
  Story?: CapabilityState;
  Scenario?: CapabilityState;
  Trigger?: CapabilityState;
  ScheduleTrigger?: CapabilityState;
  InboundEmailTrigger?: CapabilityState;
  QuickEventTrigger?: CapabilityState;
}
export type GovernanceCategoryName = string;
export type DefaultCategoryEffect = "DENY_BY_DEFAULT" | (string & {});
export type DefaultCategoryEffectsMap = {
  [key: string]: DefaultCategoryEffect | undefined;
};
export interface Governance {
  DefaultCategoryEffects?: { [key: string]: DefaultCategoryEffect | undefined };
}
export interface CreateCustomPermissionsRequest {
  AwsAccountId: string;
  CustomPermissionsName: string;
  Capabilities?: Capabilities;
  Governance?: Governance;
  Tags?: Tag[];
}
export interface CreateCustomPermissionsResponse {
  Status?: number;
  Arn?: string;
  RequestId?: string;
}
export type DashboardName = string;
export interface DashboardSourceTemplate {
  DataSetReferences: DataSetReference[];
  TopicReferences?: TopicReference[];
  Arn: string;
}
export interface DashboardSourceEntity {
  SourceTemplate?: DashboardSourceTemplate;
}
export type VersionDescription = string;
export interface AdHocFilteringOption {
  AvailabilityStatus?: DashboardBehavior;
}
export interface ExportToCSVOption {
  AvailabilityStatus?: DashboardBehavior;
}
export type DashboardUIState = "EXPANDED" | "COLLAPSED" | (string & {});
export interface SheetControlsOption {
  VisibilityState?: DashboardUIState;
}
export interface ExportHiddenFieldsOption {
  AvailabilityStatus?: DashboardBehavior;
}
export interface DashboardVisualPublishOptions {
  ExportHiddenFieldsOption?: ExportHiddenFieldsOption;
}
export interface SheetLayoutElementMaximizationOption {
  AvailabilityStatus?: DashboardBehavior;
}
export interface VisualAxisSortOption {
  AvailabilityStatus?: DashboardBehavior;
}
export interface ExportWithHiddenFieldsOption {
  AvailabilityStatus?: DashboardBehavior;
}
export interface DataPointDrillUpDownOption {
  AvailabilityStatus?: DashboardBehavior;
}
export interface DataPointMenuLabelOption {
  AvailabilityStatus?: DashboardBehavior;
}
export interface DataPointTooltipOption {
  AvailabilityStatus?: DashboardBehavior;
}
export interface DataQAEnabledOption {
  AvailabilityStatus?: DashboardBehavior;
}
export interface QuickSuiteActionsOption {
  AvailabilityStatus?: DashboardBehavior;
}
export interface ExecutiveSummaryOption {
  AvailabilityStatus?: DashboardBehavior;
}
export interface DataStoriesSharingOption {
  AvailabilityStatus?: DashboardBehavior;
}
export interface DashboardPublishOptions {
  AdHocFilteringOption?: AdHocFilteringOption;
  ExportToCSVOption?: ExportToCSVOption;
  SheetControlsOption?: SheetControlsOption;
  VisualPublishOptions?: DashboardVisualPublishOptions;
  SheetLayoutElementMaximizationOption?: SheetLayoutElementMaximizationOption;
  VisualMenuOption?: VisualMenuOption;
  VisualAxisSortOption?: VisualAxisSortOption;
  ExportWithHiddenFieldsOption?: ExportWithHiddenFieldsOption;
  DataPointDrillUpDownOption?: DataPointDrillUpDownOption;
  DataPointMenuLabelOption?: DataPointMenuLabelOption;
  DataPointTooltipOption?: DataPointTooltipOption;
  DataQAEnabledOption?: DataQAEnabledOption;
  QuickSuiteActionsOption?: QuickSuiteActionsOption;
  ExecutiveSummaryOption?: ExecutiveSummaryOption;
  DataStoriesSharingOption?: DataStoriesSharingOption;
}
export interface DashboardVersionDefinition {
  DataSetIdentifierDeclarations: DataSetIdentifierDeclaration[];
  TopicIdentifierDeclarations?: TopicIdentifierDeclaration[];
  Sheets?: SheetDefinition[];
  TooltipSheets?: TooltipSheetDefinition[];
  CalculatedFields?: CalculatedField[];
  ParameterDeclarations?: ParameterDeclaration[];
  FilterGroups?: FilterGroup[];
  ColumnConfigurations?: ColumnConfiguration[];
  AnalysisDefaults?: AnalysisDefaults;
  Options?: AssetOptions;
  StaticFiles?: StaticFile[];
}
export interface LinkSharingConfiguration {
  Permissions?: ResourcePermission[];
}
export type LinkEntityArn = string;
export type LinkEntityArnList = string[];
export interface CreateDashboardRequest {
  AwsAccountId: string;
  DashboardId: string;
  Name: string;
  Parameters?: Parameters;
  Permissions?: ResourcePermission[];
  SourceEntity?: DashboardSourceEntity;
  Tags?: Tag[];
  VersionDescription?: string;
  DashboardPublishOptions?: DashboardPublishOptions;
  ThemeArn?: string;
  Definition?: DashboardVersionDefinition;
  ValidationStrategy?: ValidationStrategy;
  FolderArns?: string[];
  LinkSharingConfiguration?: LinkSharingConfiguration;
  LinkEntities?: string[];
}
export interface CreateDashboardResponse {
  Arn?: string;
  VersionArn?: string;
  DashboardId?: string;
  CreationStatus?: ResourceStatus;
  Status?: number;
  RequestId?: string;
}
export type ResourceId = string;
export type ResourceName = string;
export type PhysicalTableId = string;
export type RelationalTableCatalog = string;
export type RelationalTableSchema = string;
export type RelationalTableName = string;
export type ColumnId = string;
export type InputColumnDataType =
  | "STRING"
  | "INTEGER"
  | "DECIMAL"
  | "DATETIME"
  | "BIT"
  | "BOOLEAN"
  | "JSON"
  | "SEMISTRUCT"
  | (string & {});
export type ColumnDataSubType = "FLOAT" | "FIXED" | (string & {});
export interface InputColumn {
  Name: string;
  Id?: string;
  Type: InputColumnDataType;
  SubType?: ColumnDataSubType;
}
export type InputColumnList = InputColumn[];
export interface RelationalTable {
  DataSourceArn: string;
  Catalog?: string;
  Schema?: string;
  Name: string;
  InputColumns: InputColumn[];
}
export type CustomSqlName = string;
export type SqlQuery = string | redacted.Redacted<string>;
export interface CustomSql {
  DataSourceArn: string;
  Name: string;
  SqlQuery: string | redacted.Redacted<string>;
  Columns?: InputColumn[];
}
export type FileFormat =
  | "CSV"
  | "TSV"
  | "CLF"
  | "ELF"
  | "XLSX"
  | "JSON"
  | (string & {});
export type PositiveInteger = number;
export type TextQualifier = "DOUBLE_QUOTE" | "SINGLE_QUOTE" | (string & {});
export type Delimiter = string;
export interface UploadSettings {
  Format?: FileFormat;
  StartFromRow?: number;
  ContainsHeader?: boolean;
  TextQualifier?: TextQualifier;
  Delimiter?: string;
  CustomCellAddressRange?: string;
}
export interface S3Source {
  DataSourceArn: string;
  UploadSettings?: UploadSettings;
  InputColumns: InputColumn[];
}
export type TablePathElementName = string;
export type TablePathElementId = string;
export interface TablePathElement {
  Name?: string;
  Id?: string;
}
export type TablePathElementList = TablePathElement[];
export interface SaaSTable {
  DataSourceArn: string;
  TablePath: TablePathElement[];
  InputColumns: InputColumn[];
}
export interface FileSource {
  DataSourceArn: string;
  UploadSettings?: UploadSettings;
  SheetIndex: number;
  InputColumns: InputColumn[];
}
export type PhysicalTable =
  | {
      RelationalTable: RelationalTable;
      CustomSql?: never;
      S3Source?: never;
      SaaSTable?: never;
      FileSource?: never;
    }
  | {
      RelationalTable?: never;
      CustomSql: CustomSql;
      S3Source?: never;
      SaaSTable?: never;
      FileSource?: never;
    }
  | {
      RelationalTable?: never;
      CustomSql?: never;
      S3Source: S3Source;
      SaaSTable?: never;
      FileSource?: never;
    }
  | {
      RelationalTable?: never;
      CustomSql?: never;
      S3Source?: never;
      SaaSTable: SaaSTable;
      FileSource?: never;
    }
  | {
      RelationalTable?: never;
      CustomSql?: never;
      S3Source?: never;
      SaaSTable?: never;
      FileSource: FileSource;
    };
export type PhysicalTableMap = { [key: string]: PhysicalTable | undefined };
export type LogicalTableId = string;
export type LogicalTableAlias = string;
export type TransformOperationAlias = string;
export type DataSetEntityResourceId = string;
export interface DataSetColumnIdMapping {
  SourceColumnId: string;
  TargetColumnId: string;
}
export type DataSetColumnIdMappingList = DataSetColumnIdMapping[];
export interface TransformOperationSource {
  TransformOperationId: string;
  ColumnIdMappings?: DataSetColumnIdMapping[];
}
export type ProjectedColumnNameList = string[];
export interface ProjectOperation {
  Alias?: string;
  Source?: TransformOperationSource;
  ProjectedColumns: string[];
}
export type DataSetStringComparisonFilterOperator =
  | "EQUALS"
  | "DOES_NOT_EQUAL"
  | "CONTAINS"
  | "DOES_NOT_CONTAIN"
  | "STARTS_WITH"
  | "ENDS_WITH"
  | (string & {});
export type DataSetStringFilterStaticValue = string | redacted.Redacted<string>;
export interface DataSetStringFilterValue {
  StaticValue?: string | redacted.Redacted<string>;
}
export interface DataSetStringComparisonFilterCondition {
  Operator: DataSetStringComparisonFilterOperator;
  Value?: DataSetStringFilterValue;
}
export type DataSetStringListFilterOperator =
  | "INCLUDE"
  | "EXCLUDE"
  | (string & {});
export type DataSetStringFilterStaticValueList = (
  | string
  | redacted.Redacted<string>
)[];
export interface DataSetStringListFilterValue {
  StaticValues?: (string | redacted.Redacted<string>)[];
}
export interface DataSetStringListFilterCondition {
  Operator: DataSetStringListFilterOperator;
  Values?: DataSetStringListFilterValue;
}
export interface DataSetStringFilterCondition {
  ColumnName?: string;
  ComparisonFilterCondition?: DataSetStringComparisonFilterCondition;
  ListFilterCondition?: DataSetStringListFilterCondition;
}
export type DataSetNumericComparisonFilterOperator =
  | "EQUALS"
  | "DOES_NOT_EQUAL"
  | "GREATER_THAN"
  | "GREATER_THAN_OR_EQUALS_TO"
  | "LESS_THAN"
  | "LESS_THAN_OR_EQUALS_TO"
  | (string & {});
export interface DataSetNumericFilterValue {
  StaticValue?: number;
}
export interface DataSetNumericComparisonFilterCondition {
  Operator: DataSetNumericComparisonFilterOperator;
  Value?: DataSetNumericFilterValue;
}
export interface DataSetNumericRangeFilterCondition {
  RangeMinimum?: DataSetNumericFilterValue;
  RangeMaximum?: DataSetNumericFilterValue;
  IncludeMinimum?: boolean;
  IncludeMaximum?: boolean;
}
export interface DataSetNumericFilterCondition {
  ColumnName?: string;
  ComparisonFilterCondition?: DataSetNumericComparisonFilterCondition;
  RangeFilterCondition?: DataSetNumericRangeFilterCondition;
}
export type DataSetDateComparisonFilterOperator =
  | "BEFORE"
  | "BEFORE_OR_EQUALS_TO"
  | "AFTER"
  | "AFTER_OR_EQUALS_TO"
  | (string & {});
export interface DataSetDateFilterValue {
  StaticValue?: Date;
}
export interface DataSetDateComparisonFilterCondition {
  Operator: DataSetDateComparisonFilterOperator;
  Value?: DataSetDateFilterValue;
}
export interface DataSetDateRangeFilterCondition {
  RangeMinimum?: DataSetDateFilterValue;
  RangeMaximum?: DataSetDateFilterValue;
  IncludeMinimum?: boolean;
  IncludeMaximum?: boolean;
}
export interface DataSetDateFilterCondition {
  ColumnName?: string;
  ComparisonFilterCondition?: DataSetDateComparisonFilterCondition;
  RangeFilterCondition?: DataSetDateRangeFilterCondition;
}
export interface FilterOperation {
  ConditionExpression?: string | redacted.Redacted<string>;
  StringFilterCondition?: DataSetStringFilterCondition;
  NumericFilterCondition?: DataSetNumericFilterCondition;
  DateFilterCondition?: DataSetDateFilterCondition;
}
export type DataSetCalculatedFieldExpression =
  | string
  | redacted.Redacted<string>;
export interface CalculatedColumn {
  ColumnName: string;
  ColumnId: string;
  Expression: string | redacted.Redacted<string>;
}
export type CalculatedColumnList = CalculatedColumn[];
export interface CreateColumnsOperation {
  Alias?: string;
  Source?: TransformOperationSource;
  Columns: CalculatedColumn[];
}
export interface RenameColumnOperation {
  ColumnName: string;
  NewColumnName: string;
}
export type ColumnDataType =
  | "STRING"
  | "INTEGER"
  | "DECIMAL"
  | "DATETIME"
  | (string & {});
export type TypeCastFormat = string;
export interface CastColumnTypeOperation {
  ColumnName: string;
  NewColumnType: ColumnDataType;
  SubType?: ColumnDataSubType;
  Format?: string;
}
export type GeoSpatialDataRole =
  | "COUNTRY"
  | "STATE"
  | "COUNTY"
  | "CITY"
  | "POSTCODE"
  | "LONGITUDE"
  | "LATITUDE"
  | (string & {});
export type ColumnDescriptiveText = string | redacted.Redacted<string>;
export interface ColumnDescription {
  Text?: string | redacted.Redacted<string>;
}
export interface ColumnTag {
  ColumnGeographicRole?: GeoSpatialDataRole;
  ColumnDescription?: ColumnDescription;
}
export type ColumnTagList = ColumnTag[];
export interface TagColumnOperation {
  ColumnName: string;
  Tags: ColumnTag[];
}
export type ColumnTagName =
  | "COLUMN_GEOGRAPHIC_ROLE"
  | "COLUMN_DESCRIPTION"
  | (string & {});
export type ColumnTagNames = ColumnTagName[];
export interface UntagColumnOperation {
  ColumnName: string;
  TagNames: ColumnTagName[];
}
export type DatasetParameterName = string;
export type StringDatasetParameterDefaultValue = string;
export type StringDatasetParameterValueList = string[];
export type DecimalDatasetParameterDefaultValue = number;
export type DecimalDatasetParameterValueList = number[];
export type DateTimeDatasetParameterDefaultValue = Date;
export type DateTimeDatasetParameterValueList = Date[];
export type IntegerDatasetParameterDefaultValue = number;
export type IntegerDatasetParameterValueList = number[];
export interface NewDefaultValues {
  StringStaticValues?: string[];
  DecimalStaticValues?: number[];
  DateTimeStaticValues?: Date[];
  IntegerStaticValues?: number[];
}
export interface OverrideDatasetParameterOperation {
  ParameterName: string;
  NewParameterName?: string;
  NewDefaultValues?: NewDefaultValues;
}
export type TransformOperation =
  | {
      ProjectOperation: ProjectOperation;
      FilterOperation?: never;
      CreateColumnsOperation?: never;
      RenameColumnOperation?: never;
      CastColumnTypeOperation?: never;
      TagColumnOperation?: never;
      UntagColumnOperation?: never;
      OverrideDatasetParameterOperation?: never;
    }
  | {
      ProjectOperation?: never;
      FilterOperation: FilterOperation;
      CreateColumnsOperation?: never;
      RenameColumnOperation?: never;
      CastColumnTypeOperation?: never;
      TagColumnOperation?: never;
      UntagColumnOperation?: never;
      OverrideDatasetParameterOperation?: never;
    }
  | {
      ProjectOperation?: never;
      FilterOperation?: never;
      CreateColumnsOperation: CreateColumnsOperation;
      RenameColumnOperation?: never;
      CastColumnTypeOperation?: never;
      TagColumnOperation?: never;
      UntagColumnOperation?: never;
      OverrideDatasetParameterOperation?: never;
    }
  | {
      ProjectOperation?: never;
      FilterOperation?: never;
      CreateColumnsOperation?: never;
      RenameColumnOperation: RenameColumnOperation;
      CastColumnTypeOperation?: never;
      TagColumnOperation?: never;
      UntagColumnOperation?: never;
      OverrideDatasetParameterOperation?: never;
    }
  | {
      ProjectOperation?: never;
      FilterOperation?: never;
      CreateColumnsOperation?: never;
      RenameColumnOperation?: never;
      CastColumnTypeOperation: CastColumnTypeOperation;
      TagColumnOperation?: never;
      UntagColumnOperation?: never;
      OverrideDatasetParameterOperation?: never;
    }
  | {
      ProjectOperation?: never;
      FilterOperation?: never;
      CreateColumnsOperation?: never;
      RenameColumnOperation?: never;
      CastColumnTypeOperation?: never;
      TagColumnOperation: TagColumnOperation;
      UntagColumnOperation?: never;
      OverrideDatasetParameterOperation?: never;
    }
  | {
      ProjectOperation?: never;
      FilterOperation?: never;
      CreateColumnsOperation?: never;
      RenameColumnOperation?: never;
      CastColumnTypeOperation?: never;
      TagColumnOperation?: never;
      UntagColumnOperation: UntagColumnOperation;
      OverrideDatasetParameterOperation?: never;
    }
  | {
      ProjectOperation?: never;
      FilterOperation?: never;
      CreateColumnsOperation?: never;
      RenameColumnOperation?: never;
      CastColumnTypeOperation?: never;
      TagColumnOperation?: never;
      UntagColumnOperation?: never;
      OverrideDatasetParameterOperation: OverrideDatasetParameterOperation;
    };
export type TransformOperationList = TransformOperation[];
export interface JoinKeyProperties {
  UniqueKey?: boolean;
}
export type JoinType = "INNER" | "OUTER" | "LEFT" | "RIGHT" | (string & {});
export type OnClause = string;
export interface JoinInstruction {
  LeftOperand: string;
  RightOperand: string;
  LeftJoinKeyProperties?: JoinKeyProperties;
  RightJoinKeyProperties?: JoinKeyProperties;
  Type: JoinType;
  OnClause: string;
}
export interface LogicalTableSource {
  JoinInstruction?: JoinInstruction;
  PhysicalTableId?: string;
  DataSetArn?: string;
}
export interface LogicalTable {
  Alias: string;
  DataTransforms?: TransformOperation[];
  Source: LogicalTableSource;
}
export type LogicalTableMap = { [key: string]: LogicalTable | undefined };
export type DataSetImportMode = "SPICE" | "DIRECT_QUERY" | (string & {});
export type ColumnGroupName = string;
export type GeoSpatialCountryCode = "US" | (string & {});
export type ColumnList = string[];
export interface GeoSpatialColumnGroup {
  Name: string;
  CountryCode?: GeoSpatialCountryCode;
  Columns: string[];
}
export interface ColumnGroup {
  GeoSpatialColumnGroup?: GeoSpatialColumnGroup;
}
export type ColumnGroupList = ColumnGroup[];
export type FieldFolderPath = string;
export type FieldFolderDescription = string;
export type FolderColumnList = string[];
export interface FieldFolder {
  description?: string;
  columns?: string[];
}
export type FieldFolderMap = { [key: string]: FieldFolder | undefined };
export type RowLevelPermissionPolicy =
  | "GRANT_ACCESS"
  | "DENY_ACCESS"
  | (string & {});
export type RowLevelPermissionFormatVersion =
  | "VERSION_1"
  | "VERSION_2"
  | (string & {});
export type Status = "ENABLED" | "DISABLED" | (string & {});
export interface RowLevelPermissionDataSet {
  Namespace?: string;
  Arn: string;
  PermissionPolicy: RowLevelPermissionPolicy;
  FormatVersion?: RowLevelPermissionFormatVersion;
  Status?: Status;
}
export type SessionTagKey = string;
export type RowLevelPermissionTagDelimiter = string;
export type SessionTagValue = string | redacted.Redacted<string>;
export interface RowLevelPermissionTagRule {
  TagKey: string;
  ColumnName: string;
  TagMultiValueDelimiter?: string;
  MatchAllValue?: string | redacted.Redacted<string>;
}
export type RowLevelPermissionTagRuleList = RowLevelPermissionTagRule[];
export type RowLevelPermissionTagRuleConfiguration = string[];
export type RowLevelPermissionTagRuleConfigurationList = string[][];
export interface RowLevelPermissionTagConfiguration {
  Status?: Status;
  TagRules: RowLevelPermissionTagRule[];
  TagRuleConfigurations?: string[][];
}
export type PrincipalList = string[];
export type ColumnLevelPermissionRuleColumnNameList = string[];
export interface ColumnLevelPermissionRule {
  Principals?: string[];
  ColumnNames?: string[];
}
export type ColumnLevelPermissionRuleList = ColumnLevelPermissionRule[];
export interface DataSetUsageConfiguration {
  DisableUseAsDirectQuerySource?: boolean;
  DisableUseAsImportedSource?: boolean;
}
export type DatasetParameterId = string;
export type DatasetParameterValueType =
  | "MULTI_VALUED"
  | "SINGLE_VALUED"
  | (string & {});
export interface StringDatasetParameterDefaultValues {
  StaticValues?: string[];
}
export interface StringDatasetParameter {
  Id: string;
  Name: string;
  ValueType: DatasetParameterValueType;
  DefaultValues?: StringDatasetParameterDefaultValues;
}
export interface DecimalDatasetParameterDefaultValues {
  StaticValues?: number[];
}
export interface DecimalDatasetParameter {
  Id: string;
  Name: string;
  ValueType: DatasetParameterValueType;
  DefaultValues?: DecimalDatasetParameterDefaultValues;
}
export interface IntegerDatasetParameterDefaultValues {
  StaticValues?: number[];
}
export interface IntegerDatasetParameter {
  Id: string;
  Name: string;
  ValueType: DatasetParameterValueType;
  DefaultValues?: IntegerDatasetParameterDefaultValues;
}
export interface DateTimeDatasetParameterDefaultValues {
  StaticValues?: Date[];
}
export interface DateTimeDatasetParameter {
  Id: string;
  Name: string;
  ValueType: DatasetParameterValueType;
  TimeGranularity?: TimeGranularity;
  DefaultValues?: DateTimeDatasetParameterDefaultValues;
}
export interface DatasetParameter {
  StringDatasetParameter?: StringDatasetParameter;
  DecimalDatasetParameter?: DecimalDatasetParameter;
  IntegerDatasetParameter?: IntegerDatasetParameter;
  DateTimeDatasetParameter?: DateTimeDatasetParameter;
}
export type DatasetParameterList = DatasetParameter[];
export type UniqueKeyColumnNameList = string[];
export interface UniqueKey {
  ColumnNames: string[];
}
export type UniqueKeyList = UniqueKey[];
export interface PerformanceConfiguration {
  UniqueKeys?: UniqueKey[];
}
export type DataSetUseAs = "RLS_RULES" | (string & {});
export interface ParentDataSet {
  DataSetArn: string;
  InputColumns: InputColumn[];
}
export interface SourceTable {
  PhysicalTableId?: string;
  DataSet?: ParentDataSet;
}
export type SourceTableMap = { [key: string]: SourceTable | undefined };
export interface ImportTableOperationSource {
  SourceTableId: string;
  ColumnIdMappings?: DataSetColumnIdMapping[];
}
export interface ImportTableOperation {
  Alias: string;
  Source: ImportTableOperationSource;
}
export type FilterOperationList = FilterOperation[];
export interface FiltersOperation {
  Alias: string;
  Source: TransformOperationSource;
  FilterOperations: FilterOperation[];
}
export type RenameColumnOperationList = RenameColumnOperation[];
export interface RenameColumnsOperation {
  Alias: string;
  Source: TransformOperationSource;
  RenameColumnOperations: RenameColumnOperation[];
}
export type CastColumnTypeOperationList = CastColumnTypeOperation[];
export interface CastColumnTypesOperation {
  Alias: string;
  Source: TransformOperationSource;
  CastColumnTypeOperations: CastColumnTypeOperation[];
}
export type JoinOperationType =
  | "INNER"
  | "OUTER"
  | "LEFT"
  | "RIGHT"
  | (string & {});
export type JoinOperationOnClause = string | redacted.Redacted<string>;
export interface OutputColumnNameOverride {
  SourceColumnName?: string;
  OutputColumnName: string;
}
export type OutputColumnNameOverrideList = OutputColumnNameOverride[];
export interface JoinOperandProperties {
  OutputColumnNameOverrides: OutputColumnNameOverride[];
}
export interface JoinOperation {
  Alias: string;
  LeftOperand: TransformOperationSource;
  RightOperand: TransformOperationSource;
  Type: JoinOperationType;
  OnClause: string | redacted.Redacted<string>;
  LeftOperandProperties?: JoinOperandProperties;
  RightOperandProperties?: JoinOperandProperties;
}
export type GroupByColumnNameList = string[];
export type DataPrepSimpleAggregationFunctionType =
  | "COUNT"
  | "DISTINCT_COUNT"
  | "SUM"
  | "AVERAGE"
  | "MAX"
  | "MIN"
  | (string & {});
export interface DataPrepSimpleAggregationFunction {
  InputColumnName?: string;
  FunctionType: DataPrepSimpleAggregationFunctionType;
}
export type Separator = string;
export interface DataPrepListAggregationFunction {
  InputColumnName?: string;
  Separator: string;
  Distinct: boolean;
}
export interface DataPrepAggregationFunction {
  SimpleAggregation?: DataPrepSimpleAggregationFunction;
  ListAggregation?: DataPrepListAggregationFunction;
}
export interface Aggregation {
  AggregationFunction: DataPrepAggregationFunction;
  NewColumnName: string;
  NewColumnId: string;
}
export type AggregationList = Aggregation[];
export interface AggregateOperation {
  Alias: string;
  Source: TransformOperationSource;
  GroupByColumnNames?: string[];
  Aggregations: Aggregation[];
}
export type PivotGroupByColumnNameList = string[];
export interface ValueColumnConfiguration {
  AggregationFunction?: DataPrepAggregationFunction;
}
export type CellValue = string;
export interface PivotedLabel {
  LabelName: string;
  NewColumnName: string;
  NewColumnId: string;
}
export type PivotedLabelList = PivotedLabel[];
export interface PivotConfiguration {
  LabelColumnName?: string;
  PivotedLabels: PivotedLabel[];
}
export interface PivotOperation {
  Alias: string;
  Source: TransformOperationSource;
  GroupByColumnNames?: string[];
  ValueColumnConfiguration: ValueColumnConfiguration;
  PivotConfiguration: PivotConfiguration;
}
export interface ColumnToUnpivot {
  ColumnName?: string;
  NewValue?: string;
}
export type ColumnToUnpivotList = ColumnToUnpivot[];
export interface UnpivotOperation {
  Alias: string;
  Source: TransformOperationSource;
  ColumnsToUnpivot: ColumnToUnpivot[];
  UnpivotedLabelColumnName: string;
  UnpivotedLabelColumnId: string;
  UnpivotedValueColumnName: string;
  UnpivotedValueColumnId: string;
}
export interface AppendedColumn {
  ColumnName: string;
  NewColumnId: string;
}
export type AppendedColumnList = AppendedColumn[];
export interface AppendOperation {
  Alias: string;
  FirstSource?: TransformOperationSource;
  SecondSource?: TransformOperationSource;
  AppendedColumns: AppendedColumn[];
}
export interface TransformStep {
  ImportTableStep?: ImportTableOperation;
  ProjectStep?: ProjectOperation;
  FiltersStep?: FiltersOperation;
  CreateColumnsStep?: CreateColumnsOperation;
  RenameColumnsStep?: RenameColumnsOperation;
  CastColumnTypesStep?: CastColumnTypesOperation;
  JoinStep?: JoinOperation;
  AggregateStep?: AggregateOperation;
  PivotStep?: PivotOperation;
  UnpivotStep?: UnpivotOperation;
  AppendStep?: AppendOperation;
}
export type TransformStepMap = { [key: string]: TransformStep | undefined };
export type DestinationTableAlias = string;
export interface DestinationTableSource {
  TransformOperationId: string;
}
export interface DestinationTable {
  Alias: string;
  Source: DestinationTableSource;
}
export type DestinationTableMap = {
  [key: string]: DestinationTable | undefined;
};
export interface DataPrepConfiguration {
  SourceTableMap: { [key: string]: SourceTable | undefined };
  TransformStepMap: { [key: string]: TransformStep | undefined };
  DestinationTableMap: { [key: string]: DestinationTable | undefined };
}
export type SemanticTableAlias = string;
export interface RowLevelPermissionConfiguration {
  TagConfiguration?: RowLevelPermissionTagConfiguration;
  RowLevelPermissionDataSet?: RowLevelPermissionDataSet;
}
export type ColumnNameList = string[];
export type AdditionalNotesText = string | redacted.Redacted<string>;
export interface AdditionalNotes {
  Text?: string | redacted.Redacted<string>;
}
export interface ColumnSemanticType {
  GeographicalRole?: GeoSpatialDataRole;
}
export interface ColumnSemanticProperty {
  Description?: ColumnDescription;
  AdditionalNotes?: AdditionalNotes;
  SemanticType?: ColumnSemanticType;
}
export type ColumnSemanticPropertyList = ColumnSemanticProperty[];
export interface SharedColumnSemanticMetadata {
  ColumnNames?: string[];
  ColumnProperties: ColumnSemanticProperty[];
}
export type SharedColumnSemanticMetadataList = SharedColumnSemanticMetadata[];
export interface TableSemanticMetadata {
  ColumnMetadata?: SharedColumnSemanticMetadata[];
}
export interface SemanticTable {
  Alias: string;
  DestinationTableId: string;
  RowLevelPermissionConfiguration?: RowLevelPermissionConfiguration;
  SemanticMetadata?: TableSemanticMetadata;
}
export type SemanticTableMap = { [key: string]: SemanticTable | undefined };
export type DataSetDescriptiveText = string | redacted.Redacted<string>;
export interface DataSetSemanticDescription {
  Text: string | redacted.Redacted<string>;
}
export type InlineCustomInstructionText = string | redacted.Redacted<string>;
export type UploadedDocumentName = string;
export interface UploadedDocumentMetadata {
  Name?: string;
}
export interface InlineCustomInstruction {
  InstructionText: string | redacted.Redacted<string>;
  UploadedDocumentMetadata?: UploadedDocumentMetadata;
}
export interface CustomInstruction {
  InlineCustomInstruction?: InlineCustomInstruction;
}
export type CustomInstructionList = CustomInstruction[];
export interface DataSetSemanticMetadata {
  Description?: DataSetSemanticDescription;
  CustomInstructions?: CustomInstruction[];
}
export type DataSetSemanticMetadataList = DataSetSemanticMetadata[];
export interface SemanticModelConfiguration {
  TableMap?: { [key: string]: SemanticTable | undefined };
  SemanticMetadata?: DataSetSemanticMetadata[];
}
export interface CreateDataSetRequest {
  AwsAccountId: string;
  DataSetId: string;
  Name: string;
  PhysicalTableMap: { [key: string]: PhysicalTable | undefined };
  LogicalTableMap?: { [key: string]: LogicalTable | undefined };
  ImportMode: DataSetImportMode;
  ColumnGroups?: ColumnGroup[];
  FieldFolders?: { [key: string]: FieldFolder | undefined };
  Permissions?: ResourcePermission[];
  RowLevelPermissionDataSet?: RowLevelPermissionDataSet;
  RowLevelPermissionTagConfiguration?: RowLevelPermissionTagConfiguration;
  ColumnLevelPermissionRules?: ColumnLevelPermissionRule[];
  Tags?: Tag[];
  DataSetUsageConfiguration?: DataSetUsageConfiguration;
  DatasetParameters?: DatasetParameter[];
  FolderArns?: string[];
  PerformanceConfiguration?: PerformanceConfiguration;
  UseAs?: DataSetUseAs;
  DataPrepConfiguration?: DataPrepConfiguration;
  SemanticModelConfiguration?: SemanticModelConfiguration;
}
export interface CreateDataSetResponse {
  Arn?: string;
  DataSetId?: string;
  IngestionArn?: string;
  IngestionId?: string;
  RequestId?: string;
  Status?: number;
}
export type DataSourceType =
  | "ADOBE_ANALYTICS"
  | "AMAZON_ELASTICSEARCH"
  | "ATHENA"
  | "AURORA"
  | "AURORA_POSTGRESQL"
  | "AWS_IOT_ANALYTICS"
  | "GITHUB"
  | "JIRA"
  | "MARIADB"
  | "MYSQL"
  | "ORACLE"
  | "POSTGRESQL"
  | "PRESTO"
  | "REDSHIFT"
  | "S3"
  | "S3_TABLES"
  | "SALESFORCE"
  | "SERVICENOW"
  | "SNOWFLAKE"
  | "SPARK"
  | "SQLSERVER"
  | "TERADATA"
  | "TWITTER"
  | "TIMESTREAM"
  | "AMAZON_OPENSEARCH"
  | "EXASOL"
  | "DATABRICKS"
  | "STARBURST"
  | "TRINO"
  | "BIGQUERY"
  | "GOOGLESHEETS"
  | "GOOGLE_DRIVE"
  | "CONFLUENCE"
  | "SHAREPOINT"
  | "ONE_DRIVE"
  | "WEB_CRAWLER"
  | "S3_KNOWLEDGE_BASE"
  | "QBUSINESS"
  | (string & {});
export type Domain = string;
export interface AmazonElasticsearchParameters {
  Domain: string;
}
export type WorkGroup = string;
export interface IdentityCenterConfiguration {
  EnableIdentityPropagation?: boolean;
}
export interface AthenaParameters {
  WorkGroup?: string;
  RoleArn?: string;
  ConsumerAccountRoleArn?: string;
  IdentityCenterConfiguration?: IdentityCenterConfiguration;
}
export type Host = string;
export type Port = number;
export type Database = string;
export interface AuroraParameters {
  Host: string;
  Port: number;
  Database: string;
}
export interface AuroraPostgreSqlParameters {
  Host: string;
  Port: number;
  Database: string;
}
export type DataSetName = string;
export interface AwsIotAnalyticsParameters {
  DataSetName: string;
}
export type SiteBaseUrl = string;
export interface JiraParameters {
  SiteBaseUrl: string;
}
export interface MariaDbParameters {
  Host: string;
  Port: number;
  Database: string;
}
export interface MySqlParameters {
  Host: string;
  Port: number;
  Database: string;
}
export interface OracleParameters {
  Host: string;
  Port: number;
  Database: string;
  UseServiceName?: boolean;
}
export interface PostgreSqlParameters {
  Host: string;
  Port: number;
  Database: string;
}
export type Catalog = string;
export interface PrestoParameters {
  Host: string;
  Port: number;
  Catalog: string;
}
export type InstanceId = string;
export interface RdsParameters {
  InstanceId: string;
  Database: string;
}
export type OptionalPort = number;
export type ClusterId = string;
export type DatabaseUser = string;
export type DatabaseGroup = string;
export type DatabaseGroupList = string[];
export interface RedshiftIAMParameters {
  RoleArn: string;
  DatabaseUser?: string;
  DatabaseGroups?: string[];
  AutoCreateDatabaseUser?: boolean;
}
export interface RedshiftParameters {
  Host?: string;
  Port?: number;
  Database: string;
  ClusterId?: string;
  IAMParameters?: RedshiftIAMParameters;
  IdentityCenterConfiguration?: IdentityCenterConfiguration;
}
export type S3Bucket = string;
export type S3Key = string;
export interface ManifestFileLocation {
  Bucket: string;
  Key: string;
}
export interface S3Parameters {
  ManifestFileLocation: ManifestFileLocation;
  RoleArn?: string;
}
export type S3TableBucketArn = string;
export interface S3TablesParameters {
  TableBucketArn?: string;
}
export type MetadataFilesLocation = string;
export interface S3KnowledgeBaseParameters {
  RoleArn?: string;
  BucketUrl: string;
  MetadataFilesLocation?: string;
}
export interface ServiceNowParameters {
  SiteBaseUrl: string;
}
export type Warehouse = string;
export type AuthenticationType =
  | "PASSWORD"
  | "KEYPAIR"
  | "TOKEN"
  | "X509"
  | (string & {});
export type DatabaseAccessControlRole = string;
export type TokenProviderUrl = string;
export type OAuthScope = string;
export interface VpcConnectionProperties {
  VpcConnectionArn: string;
}
export type IdentityProviderResourceUri = string;
export type CACertificatesBundleS3Uri = string;
export interface OAuthParameters {
  TokenProviderUrl: string;
  OAuthScope?: string;
  IdentityProviderVpcConnectionProperties?: VpcConnectionProperties;
  IdentityProviderResourceUri?: string;
  IdentityProviderCACertificatesBundleS3Uri?: string;
}
export interface SnowflakeParameters {
  Host: string;
  Database: string;
  Warehouse: string;
  AuthenticationType?: AuthenticationType;
  DatabaseAccessControlRole?: string;
  OAuthParameters?: OAuthParameters;
}
export interface SparkParameters {
  Host: string;
  Port: number;
}
export interface SqlServerParameters {
  Host: string;
  Port: number;
  Database: string;
}
export interface TeradataParameters {
  Host: string;
  Port: number;
  Database: string;
}
export type Query = string;
export interface TwitterParameters {
  Query: string;
  MaxRows: number;
}
export interface AmazonOpenSearchParameters {
  Domain: string;
}
export interface ExasolParameters {
  Host: string;
  Port: number;
}
export type SqlEndpointPath = string;
export interface DatabricksParameters {
  Host: string;
  Port: number;
  SqlEndpointPath: string;
}
export type StarburstProductType = "GALAXY" | "ENTERPRISE" | (string & {});
export interface StarburstParameters {
  Host: string;
  Port: number;
  Catalog: string;
  ProductType?: StarburstProductType;
  DatabaseAccessControlRole?: string;
  AuthenticationType?: AuthenticationType;
  OAuthParameters?: OAuthParameters;
}
export interface TrinoParameters {
  Host: string;
  Port: number;
  Catalog: string;
}
export type ProjectId = string;
export type DataSetRegion = string;
export interface BigQueryParameters {
  ProjectId: string;
  DataSetRegion?: string;
}
export interface ImpalaParameters {
  Host: string;
  Port: number;
  Database?: string;
  SqlEndpointPath: string;
}
export interface CustomConnectionParameters {
  ConnectionType?: string;
}
export type WebCrawlerAuthType =
  | "NO_AUTH"
  | "BASIC_AUTH"
  | "FORM"
  | "SAML"
  | (string & {});
export type XpathFields = string;
export interface WebCrawlerParameters {
  WebCrawlerAuthType: WebCrawlerAuthType;
  UsernameFieldXpath?: string;
  PasswordFieldXpath?: string;
  UsernameButtonXpath?: string;
  PasswordButtonXpath?: string;
  LoginPageUrl?: string;
  WebProxyHostName?: string;
  WebProxyPortNumber?: number;
}
export interface ConfluenceParameters {
  ConfluenceUrl: string;
}
export type ApplicationArn = string;
export interface QBusinessParameters {
  ApplicationArn: string;
}
export type SharePointDomain = string;
export type SharePointTenantId = string;
export type SharePointClientId = string;
export type AuthType =
  | "THREE_LEGGED_OAUTH"
  | "TWO_LEGGED_OAUTH"
  | "SERVICE_ACCOUNT"
  | (string & {});
export interface SharePointParameters {
  SharePointDomain: string;
  TenantId?: string;
  ClientId?: string;
  AuthType?: AuthType;
}
export interface GoogleDriveParameters {
  AuthType?: AuthType;
}
export type OneDriveTenantId = string;
export type OneDriveClientId = string;
export interface OneDriveParameters {
  TenantId?: string;
  ClientId?: string;
  AuthType?: AuthType;
}
export type FMKBKnowledgeBaseArn = string;
export type LinkedDataSourceId = string;
export type LinkedDataSourceIds = string[];
export interface FMKBParameters {
  KnowledgeBaseArn: string;
  LinkedDataSourceIds?: string[];
}
export type DataSourceParameters =
  | {
      AmazonElasticsearchParameters: AmazonElasticsearchParameters;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters: AthenaParameters;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters: AuroraParameters;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters: AuroraPostgreSqlParameters;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters: AwsIotAnalyticsParameters;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters: JiraParameters;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters: MariaDbParameters;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters: MySqlParameters;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters: OracleParameters;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters: PostgreSqlParameters;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters: PrestoParameters;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters: RdsParameters;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters: RedshiftParameters;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters: S3Parameters;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters: S3TablesParameters;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters: S3KnowledgeBaseParameters;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters: ServiceNowParameters;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters: SnowflakeParameters;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters: SparkParameters;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters: SqlServerParameters;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters: TeradataParameters;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters: TwitterParameters;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters: AmazonOpenSearchParameters;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters: ExasolParameters;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters: DatabricksParameters;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters: StarburstParameters;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters: TrinoParameters;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters: BigQueryParameters;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters: ImpalaParameters;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters: CustomConnectionParameters;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters: WebCrawlerParameters;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters: ConfluenceParameters;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters: QBusinessParameters;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters: SharePointParameters;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters: GoogleDriveParameters;
      OneDriveParameters?: never;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters: OneDriveParameters;
      FMKBParameters?: never;
    }
  | {
      AmazonElasticsearchParameters?: never;
      AthenaParameters?: never;
      AuroraParameters?: never;
      AuroraPostgreSqlParameters?: never;
      AwsIotAnalyticsParameters?: never;
      JiraParameters?: never;
      MariaDbParameters?: never;
      MySqlParameters?: never;
      OracleParameters?: never;
      PostgreSqlParameters?: never;
      PrestoParameters?: never;
      RdsParameters?: never;
      RedshiftParameters?: never;
      S3Parameters?: never;
      S3TablesParameters?: never;
      S3KnowledgeBaseParameters?: never;
      ServiceNowParameters?: never;
      SnowflakeParameters?: never;
      SparkParameters?: never;
      SqlServerParameters?: never;
      TeradataParameters?: never;
      TwitterParameters?: never;
      AmazonOpenSearchParameters?: never;
      ExasolParameters?: never;
      DatabricksParameters?: never;
      StarburstParameters?: never;
      TrinoParameters?: never;
      BigQueryParameters?: never;
      ImpalaParameters?: never;
      CustomConnectionParameters?: never;
      WebCrawlerParameters?: never;
      ConfluenceParameters?: never;
      QBusinessParameters?: never;
      SharePointParameters?: never;
      GoogleDriveParameters?: never;
      OneDriveParameters?: never;
      FMKBParameters: FMKBParameters;
    };
export type DbUsername = string;
export type Password = string;
export type DataSourceParametersList = DataSourceParameters[];
export interface CredentialPair {
  Username: string;
  Password: string | redacted.Redacted<string>;
  AlternateDataSourceParameters?: DataSourceParameters[];
}
export type CopySourceArn = string;
export type SecretArn = string;
export type PrivateKey = string | redacted.Redacted<string>;
export type PrivateKeyPassphrase = string | redacted.Redacted<string>;
export interface KeyPairCredentials {
  KeyPairUsername: string;
  PrivateKey: string | redacted.Redacted<string>;
  PrivateKeyPassphrase?: string | redacted.Redacted<string>;
}
export interface WebProxyCredentials {
  WebProxyUsername: string;
  WebProxyPassword: string | redacted.Redacted<string>;
}
export type OAuthClientId = string | redacted.Redacted<string>;
export type OAuthClientSecret = string | redacted.Redacted<string>;
export type OAuthUsername = string | redacted.Redacted<string>;
export interface OAuthClientCredentials {
  ClientId?: string | redacted.Redacted<string>;
  ClientSecret?: string | redacted.Redacted<string>;
  Username?: string | redacted.Redacted<string>;
}
export interface DataSourceCredentials {
  CredentialPair?: CredentialPair;
  CopySourceArn?: string;
  SecretArn?: string;
  KeyPairCredentials?: KeyPairCredentials;
  WebProxyCredentials?: WebProxyCredentials;
  OAuthClientCredentials?: OAuthClientCredentials;
}
export interface SslProperties {
  DisableSsl?: boolean;
}
export interface CreateDataSourceRequest {
  AwsAccountId: string;
  DataSourceId: string;
  Name: string;
  Type: DataSourceType;
  DataSourceParameters?: DataSourceParameters;
  Credentials?: DataSourceCredentials;
  Permissions?: ResourcePermission[];
  VpcConnectionProperties?: VpcConnectionProperties;
  SslProperties?: SslProperties;
  Tags?: Tag[];
  FolderArns?: string[];
}
export interface CreateDataSourceResponse {
  Arn?: string;
  DataSourceId?: string;
  CreationStatus?: ResourceStatus;
  RequestId?: string;
  Status?: number;
}
export type DlpSettingId = string;
export type DlpSettingName = string;
export type DlpProviderType = "MICROSOFT_PURVIEW" | (string & {});
export type SecretManagerArn = string;
export interface MicrosoftPurviewCredentials {
  SecretArn: string;
}
export type LabelId = string;
export type LabelName = string;
export type DlpAction = "ALLOW" | "WARN" | "BLOCK" | (string & {});
export interface LabelActionMapping {
  LabelId: string;
  LabelName: string;
  Action: DlpAction;
}
export type LabelActionMappingList = LabelActionMapping[];
export interface MicrosoftPurviewProviderConfig {
  Credentials: MicrosoftPurviewCredentials;
  LabelActionMappings: LabelActionMapping[];
  UnmappedAction: DlpAction;
}
export type ProviderConfig = {
  MicrosoftPurview: MicrosoftPurviewProviderConfig;
};
export interface CreateDlpSettingRequest {
  AwsAccountId: string;
  DlpSettingId: string;
  Name: string;
  ProviderType: DlpProviderType;
  ProviderConfig: ProviderConfig;
  ProviderOutageAction: DlpAction;
  Enabled: boolean;
  Tags?: Tag[];
}
export interface CreateDlpSettingResponse {
  Arn: string;
  DlpSettingId: string;
  RequestId?: string;
}
export type AccountId = string;
export type TitleInput = string;
export type FlowDescriptionInput = string;
export type SensitiveDocument = unknown;
export type ActionsListMemberString = string;
export type ActionsList = string[];
export type PermissionPrincipalString = string;
export interface Permission {
  Actions: string[];
  Principal: string;
}
export type PermissionsList = Permission[];
export type CreateFlowRequestClientTokenString = string;
export interface CreateFlowRequest {
  AwsAccountId: string;
  Name: string;
  Description?: string;
  FlowDefinition: any;
  Permissions?: Permission[];
  ClientToken?: string;
}
export type FlowId = string;
export interface CreateFlowResponse {
  Arn: string;
  FlowId: string;
  RequestId?: string;
  Status?: number;
}
export type RestrictiveResourceId = string;
export type FolderName = string;
export type FolderType = "SHARED" | "RESTRICTED" | (string & {});
export type SharingModel = "ACCOUNT" | "NAMESPACE" | (string & {});
export interface CreateFolderRequest {
  AwsAccountId: string;
  FolderId: string;
  Name?: string;
  FolderType?: FolderType;
  ParentFolderArn?: string;
  Permissions?: ResourcePermission[];
  Tags?: Tag[];
  SharingModel?: SharingModel;
}
export interface CreateFolderResponse {
  Status?: number;
  Arn?: string;
  FolderId?: string;
  RequestId?: string;
}
export type MemberType =
  | "DASHBOARD"
  | "ANALYSIS"
  | "DATASET"
  | "DATASOURCE"
  | "TOPIC"
  | (string & {});
export interface CreateFolderMembershipRequest {
  AwsAccountId: string;
  FolderId: string;
  MemberId: string;
  MemberType: MemberType;
}
export interface FolderMember {
  MemberId?: string;
  MemberType?: MemberType;
}
export interface CreateFolderMembershipResponse {
  Status?: number;
  FolderMember?: FolderMember;
  RequestId?: string;
}
export type GroupName = string;
export type GroupDescription = string;
export interface CreateGroupRequest {
  GroupName: string;
  Description?: string;
  AwsAccountId: string;
  Namespace: string;
}
export interface Group {
  Arn?: string;
  GroupName?: string;
  Description?: string;
  PrincipalId?: string;
}
export interface CreateGroupResponse {
  Group?: Group;
  RequestId?: string;
  Status?: number;
}
export type GroupMemberName = string;
export interface CreateGroupMembershipRequest {
  MemberName: string;
  GroupName: string;
  AwsAccountId: string;
  Namespace: string;
}
export interface GroupMember {
  Arn?: string;
  MemberName?: string;
}
export interface CreateGroupMembershipResponse {
  GroupMember?: GroupMember;
  RequestId?: string;
  Status?: number;
}
export type IAMPolicyAssignmentName = string;
export type AssignmentStatus = "ENABLED" | "DRAFT" | "DISABLED" | (string & {});
export type IdentityName = string;
export type IdentityNameList = string[];
export type IdentityMap = { [key: string]: string[] | undefined };
export interface CreateIAMPolicyAssignmentRequest {
  AwsAccountId: string;
  AssignmentName: string;
  AssignmentStatus: AssignmentStatus;
  PolicyArn?: string;
  Identities?: { [key: string]: string[] | undefined };
  Namespace: string;
}
export interface CreateIAMPolicyAssignmentResponse {
  AssignmentName?: string;
  AssignmentId?: string;
  AssignmentStatus?: AssignmentStatus;
  PolicyArn?: string;
  Identities?: { [key: string]: string[] | undefined };
  RequestId?: string;
  Status?: number;
}
export type IngestionType =
  | "INCREMENTAL_REFRESH"
  | "FULL_REFRESH"
  | (string & {});
export interface CreateIngestionRequest {
  DataSetId: string;
  IngestionId: string;
  AwsAccountId: string;
  IngestionType?: IngestionType;
}
export type IngestionStatus =
  | "INITIALIZED"
  | "QUEUED"
  | "RUNNING"
  | "FAILED"
  | "COMPLETED"
  | "CANCELLED"
  | (string & {});
export interface CreateIngestionResponse {
  Arn?: string;
  IngestionId?: string;
  IngestionStatus?: IngestionStatus;
  RequestId?: string;
  Status?: number;
}
export type KnowledgeBaseName = string;
export type DataSourceArn = string;
export type KbTemplate = unknown;
export interface KbTemplateConfiguration {
  template?: any;
}
export interface KnowledgeBaseConfiguration {
  templateConfiguration?: KbTemplateConfiguration;
}
export type KnowledgeBaseDescription = string;
export type ImageExtractionStatus = "ENABLED" | "DISABLED" | (string & {});
export interface ImageExtractionConfiguration {
  imageExtractionStatus: ImageExtractionStatus;
}
export type AudioExtractionStatus = "ENABLED" | "DISABLED" | (string & {});
export interface AudioExtractionConfiguration {
  audioExtractionStatus: AudioExtractionStatus;
}
export type VideoExtractionStatus = "ENABLED" | "DISABLED" | (string & {});
export type VideoExtractionType =
  | "AUDIO_TRANSCRIPTION_ONLY"
  | "VISUAL_CONTENT_AND_AUDIO_TRANSCRIPTION"
  | (string & {});
export interface VideoExtractionConfiguration {
  videoExtractionStatus: VideoExtractionStatus;
  videoExtractionType?: VideoExtractionType;
}
export interface MediaExtractionConfiguration {
  imageExtractionConfiguration?: ImageExtractionConfiguration;
  audioExtractionConfiguration?: AudioExtractionConfiguration;
  videoExtractionConfiguration?: VideoExtractionConfiguration;
}
export interface AccessControlConfiguration {
  isACLEnabled?: boolean;
}
export interface CreateKnowledgeBaseRequest {
  AwsAccountId: string;
  KnowledgeBaseId: string;
  Name: string;
  DataSourceArn: string;
  KnowledgeBaseConfiguration: KnowledgeBaseConfiguration;
  Description?: string;
  Permissions?: ResourcePermission[];
  MediaExtractionConfiguration?: MediaExtractionConfiguration;
  AccessControlConfiguration?: AccessControlConfiguration;
  PrimaryOwnerArn?: string;
  Tags?: Tag[];
}
export type DataSetStatus =
  | "CREATING"
  | "UPDATING"
  | "ACTIVE"
  | "FAILED"
  | "DELETING"
  | (string & {});
export interface CreateKnowledgeBaseResponse {
  KnowledgeBaseArn: string;
  KnowledgeBaseId: string;
  CreationStatus: DataSetStatus;
  RequestId?: string;
  Status?: number;
}
export type ProfileName = string;
export type ProfileDescription = string;
export type ProfileLimitValueMaxValueLong = number;
export interface ProfileLimitValue {
  maxValue: number;
  unit: LimitUnit;
}
export type CreateLimitsProfileRequestResourceLimitsMap = {
  [key in ResourceType]?: ProfileLimitValue;
};
export type CreateLimitsProfileRequestClientTokenString = string;
export interface CreateLimitsProfileRequest {
  accountId: string;
  profileName: string;
  description?: string;
  resourceLimits: { [key: string]: ProfileLimitValue | undefined };
  clientToken: string;
}
export type ResourceArn = string;
export interface CreateLimitsProfileResponse {
  arn: string;
  profileId: string;
}
export type IdentityStore = "QUICKSIGHT" | (string & {});
export interface CreateNamespaceRequest {
  AwsAccountId: string;
  Namespace: string;
  IdentityStore: IdentityStore;
  Tags?: Tag[];
}
export type NamespaceStatus =
  | "CREATED"
  | "CREATING"
  | "DELETING"
  | "RETRYABLE_FAILURE"
  | "NON_RETRYABLE_FAILURE"
  | (string & {});
export interface CreateNamespaceResponse {
  Arn?: string;
  Name?: string;
  CapacityRegion?: string;
  CreationStatus?: NamespaceStatus;
  IdentityStore?: IdentityStore;
  RequestId?: string;
  Status?: number;
}
export type OAuthClientApplicationId = string;
export type OAuthClientAuthenticationType = "TOKEN" | (string & {});
export type OAuthTokenEndpointUrl = string | redacted.Redacted<string>;
export type OAuthAuthorizationEndpointUrl = string | redacted.Redacted<string>;
export type OAuthScopesString = string;
export interface CreateOAuthClientApplicationRequest {
  AwsAccountId: string;
  OAuthClientApplicationId: string;
  Name: string;
  OAuthClientAuthenticationType: OAuthClientAuthenticationType;
  ClientId: string | redacted.Redacted<string>;
  ClientSecret: string | redacted.Redacted<string>;
  OAuthTokenEndpointUrl: string | redacted.Redacted<string>;
  OAuthAuthorizationEndpointUrl?: string | redacted.Redacted<string>;
  OAuthScopes?: string;
  DataSourceType?: DataSourceType;
  IdentityProviderVpcConnectionProperties?: VpcConnectionProperties;
  Tags?: Tag[];
}
export interface CreateOAuthClientApplicationResponse {
  Arn?: string;
  OAuthClientApplicationId?: string;
  CreationStatus?: ResourceStatus;
  RequestId?: string;
  Status?: number;
}
export type RefreshInterval =
  | "MINUTE15"
  | "MINUTE30"
  | "HOURLY"
  | "DAILY"
  | "WEEKLY"
  | "MONTHLY"
  | (string & {});
export type DayOfWeek =
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | (string & {});
export type DayOfMonth = string;
export interface ScheduleRefreshOnEntity {
  DayOfWeek?: DayOfWeek;
  DayOfMonth?: string;
}
export interface RefreshFrequency {
  Interval: RefreshInterval;
  RefreshOnDay?: ScheduleRefreshOnEntity;
  Timezone?: string;
  TimeOfTheDay?: string;
}
export interface RefreshSchedule {
  ScheduleId: string;
  ScheduleFrequency: RefreshFrequency;
  StartAfterDateTime?: Date;
  RefreshType: IngestionType;
  Arn?: string;
}
export interface CreateRefreshScheduleRequest {
  DataSetId: string;
  AwsAccountId: string;
  Schedule: RefreshSchedule;
}
export interface CreateRefreshScheduleResponse {
  Status?: number;
  RequestId?: string;
  ScheduleId?: string;
  Arn?: string;
}
export type Role =
  | "ADMIN"
  | "AUTHOR"
  | "READER"
  | "ADMIN_PRO"
  | "AUTHOR_PRO"
  | "READER_PRO"
  | (string & {});
export interface CreateRoleMembershipRequest {
  MemberName: string;
  AwsAccountId: string;
  Namespace: string;
  Role: Role;
}
export interface CreateRoleMembershipResponse {
  RequestId?: string;
  Status?: number;
}
export type PublicSpaceId = string;
export type SpaceName = string;
export type SpaceDescription = string | redacted.Redacted<string>;
export interface CreateSpaceRequest {
  AwsAccountId: string;
  SpaceId: string;
  Name: string;
  Description?: string | redacted.Redacted<string>;
}
export type PublicSpaceArn = string;
export interface CreateSpaceResponse {
  spaceId: string;
  spaceArn?: string;
  RequestId?: string;
}
export type TemplateName = string;
export interface TemplateSourceAnalysis {
  Arn: string;
  DataSetReferences: DataSetReference[];
  TopicReferences?: TopicReference[];
}
export interface TemplateSourceTemplate {
  Arn: string;
}
export interface TemplateSourceEntity {
  SourceAnalysis?: TemplateSourceAnalysis;
  SourceTemplate?: TemplateSourceTemplate;
}
export interface ColumnSchema {
  Name?: string;
  DataType?: string;
  GeographicRole?: string;
}
export type ColumnSchemaList = ColumnSchema[];
export interface DataSetSchema {
  ColumnSchemaList?: ColumnSchema[];
}
export interface ColumnGroupColumnSchema {
  Name?: string;
}
export type ColumnGroupColumnSchemaList = ColumnGroupColumnSchema[];
export interface ColumnGroupSchema {
  Name?: string;
  ColumnGroupColumnSchemaList?: ColumnGroupColumnSchema[];
}
export type ColumnGroupSchemaList = ColumnGroupSchema[];
export interface DataSetConfiguration {
  Placeholder?: string;
  DataSetSchema?: DataSetSchema;
  ColumnGroupSchemaList?: ColumnGroupSchema[];
}
export type DataSetConfigurationList = DataSetConfiguration[];
export interface TopicConfiguration {
  Placeholder?: string;
  DataSetSchema?: DataSetSchema;
  ColumnGroupSchemaList?: ColumnGroupSchema[];
}
export type TopicConfigurationList = TopicConfiguration[];
export interface TemplateVersionDefinition {
  DataSetConfigurations: DataSetConfiguration[];
  TopicConfigurations?: TopicConfiguration[];
  Sheets?: SheetDefinition[];
  TooltipSheets?: TooltipSheetDefinition[];
  CalculatedFields?: CalculatedField[];
  ParameterDeclarations?: ParameterDeclaration[];
  FilterGroups?: FilterGroup[];
  ColumnConfigurations?: ColumnConfiguration[];
  AnalysisDefaults?: AnalysisDefaults;
  Options?: AssetOptions;
  QueryExecutionOptions?: QueryExecutionOptions;
  StaticFiles?: StaticFile[];
}
export interface CreateTemplateRequest {
  AwsAccountId: string;
  TemplateId: string;
  Name?: string;
  Permissions?: ResourcePermission[];
  SourceEntity?: TemplateSourceEntity;
  Tags?: Tag[];
  VersionDescription?: string;
  Definition?: TemplateVersionDefinition;
  ValidationStrategy?: ValidationStrategy;
}
export interface CreateTemplateResponse {
  Arn?: string;
  VersionArn?: string;
  TemplateId?: string;
  CreationStatus?: ResourceStatus;
  Status?: number;
  RequestId?: string;
}
export type AliasName = string;
export type VersionNumber = number;
export interface CreateTemplateAliasRequest {
  AwsAccountId: string;
  TemplateId: string;
  AliasName: string;
  TemplateVersionNumber: number;
}
export interface TemplateAlias {
  AliasName?: string;
  Arn?: string;
  TemplateVersionNumber?: number;
}
export interface CreateTemplateAliasResponse {
  TemplateAlias?: TemplateAlias;
  Status?: number;
  RequestId?: string;
}
export type ThemeName = string;
export type ColorList = string[];
export interface DataColorPalette {
  Colors?: string[];
  MinMaxGradient?: string[];
  EmptyFillColor?: string;
}
export interface UIColorPalette {
  PrimaryForeground?: string;
  PrimaryBackground?: string;
  SecondaryForeground?: string;
  SecondaryBackground?: string;
  Accent?: string;
  AccentForeground?: string;
  Danger?: string;
  DangerForeground?: string;
  Warning?: string;
  WarningForeground?: string;
  Success?: string;
  SuccessForeground?: string;
  Dimension?: string;
  DimensionForeground?: string;
  Measure?: string;
  MeasureForeground?: string;
}
export type Color = string;
export interface BorderStyle {
  Color?: string;
  Show?: boolean;
  Width?: string;
}
export interface TileStyle {
  BackgroundColor?: string;
  Border?: BorderStyle;
  BorderRadius?: string;
  Padding?: string;
}
export interface GutterStyle {
  Show?: boolean;
}
export interface MarginStyle {
  Show?: boolean;
}
export interface TileLayoutStyle {
  Gutter?: GutterStyle;
  Margin?: MarginStyle;
}
export interface SheetBackgroundStyle {
  Color?: string;
  Gradient?: string;
}
export interface SheetStyle {
  Tile?: TileStyle;
  TileLayout?: TileLayoutStyle;
  Background?: SheetBackgroundStyle;
}
export interface Font {
  FontFamily?: string;
}
export type FontList = Font[];
export type TextTransform = "CAPITALIZE" | (string & {});
export interface VisualTitleFontConfiguration {
  FontConfiguration?: FontConfiguration;
  TextAlignment?: HorizontalTextAlignment;
  TextTransform?: TextTransform;
}
export interface VisualSubtitleFontConfiguration {
  FontConfiguration?: FontConfiguration;
  TextAlignment?: HorizontalTextAlignment;
  TextTransform?: TextTransform;
}
export interface ControlTitleFontConfiguration {
  FontConfiguration?: FontConfiguration;
  TextAlignment?: HorizontalTextAlignment;
}
export interface Typography {
  FontFamilies?: Font[];
  AxisTitleFontConfiguration?: FontConfiguration;
  AxisLabelFontConfiguration?: FontConfiguration;
  LegendTitleFontConfiguration?: FontConfiguration;
  LegendValueFontConfiguration?: FontConfiguration;
  DataLabelFontConfiguration?: FontConfiguration;
  VisualTitleFontConfiguration?: VisualTitleFontConfiguration;
  VisualSubtitleFontConfiguration?: VisualSubtitleFontConfiguration;
  ControlTitleFontConfiguration?: ControlTitleFontConfiguration;
}
export interface ThemeConfiguration {
  DataColorPalette?: DataColorPalette;
  UIColorPalette?: UIColorPalette;
  Sheet?: SheetStyle;
  Typography?: Typography;
}
export interface CreateThemeRequest {
  AwsAccountId: string;
  ThemeId: string;
  Name: string;
  BaseThemeId: string;
  VersionDescription?: string;
  Configuration: ThemeConfiguration;
  Permissions?: ResourcePermission[];
  Tags?: Tag[];
}
export interface CreateThemeResponse {
  Arn?: string;
  VersionArn?: string;
  ThemeId?: string;
  CreationStatus?: ResourceStatus;
  Status?: number;
  RequestId?: string;
}
export interface CreateThemeAliasRequest {
  AwsAccountId: string;
  ThemeId: string;
  AliasName: string;
  ThemeVersionNumber: number;
}
export interface ThemeAlias {
  Arn?: string;
  AliasName?: string;
  ThemeVersionNumber?: number;
}
export interface CreateThemeAliasResponse {
  ThemeAlias?: ThemeAlias;
  Status?: number;
  RequestId?: string;
}
export type TopicUserExperienceVersion =
  | "LEGACY"
  | "NEW_READER_EXPERIENCE"
  | (string & {});
export interface DataAggregation {
  DatasetRowDateGranularity?: TopicTimeGranularity;
  DefaultDateColumnName?: string;
}
export type DescriptionSensitiveString = string | redacted.Redacted<string>;
export type SynonymString = string | redacted.Redacted<string>;
export type Synonyms = (string | redacted.Redacted<string>)[];
export type NamedFilterType =
  | "CATEGORY_FILTER"
  | "NUMERIC_EQUALITY_FILTER"
  | "NUMERIC_RANGE_FILTER"
  | "DATE_RANGE_FILTER"
  | "RELATIVE_DATE_FILTER"
  | "NULL_FILTER"
  | (string & {});
export type CategoryFilterFunction = "EXACT" | "CONTAINS" | (string & {});
export type CategoryFilterType =
  | "CUSTOM_FILTER"
  | "CUSTOM_FILTER_LIST"
  | "FILTER_LIST"
  | (string & {});
export type StringList = string[];
export interface CollectiveConstant {
  ValueList?: string[];
}
export interface TopicCategoryFilterConstant {
  ConstantType?: ConstantType;
  SingularConstant?: string | redacted.Redacted<string>;
  CollectiveConstant?: CollectiveConstant;
}
export type NullFilterType =
  | "ALL_VALUES"
  | "NON_NULLS_ONLY"
  | "NULLS_ONLY"
  | (string & {});
export interface TopicCategoryFilter {
  CategoryFilterFunction?: CategoryFilterFunction;
  CategoryFilterType?: CategoryFilterType;
  Constant?: TopicCategoryFilterConstant;
  Inverse?: boolean;
  NullFilter?: NullFilterType;
}
export interface TopicSingularFilterConstant {
  ConstantType?: ConstantType;
  SingularConstant?: string | redacted.Redacted<string>;
}
export type NamedFilterAggType =
  | "NO_AGGREGATION"
  | "SUM"
  | "AVERAGE"
  | "COUNT"
  | "DISTINCT_COUNT"
  | "MAX"
  | "MEDIAN"
  | "MIN"
  | "STDEV"
  | "STDEVP"
  | "VAR"
  | "VARP"
  | (string & {});
export interface TopicNumericEqualityFilter {
  Constant?: TopicSingularFilterConstant;
  Aggregation?: NamedFilterAggType;
  Inverse?: boolean;
  NullFilter?: NullFilterType;
}
export interface RangeConstant {
  Minimum?: string | redacted.Redacted<string>;
  Maximum?: string | redacted.Redacted<string>;
}
export interface TopicRangeFilterConstant {
  ConstantType?: ConstantType;
  RangeConstant?: RangeConstant;
}
export interface TopicNumericRangeFilter {
  Inclusive?: boolean;
  Constant?: TopicRangeFilterConstant;
  Aggregation?: NamedFilterAggType;
  Inverse?: boolean;
  NullFilter?: NullFilterType;
}
export interface TopicDateRangeFilter {
  Inclusive?: boolean;
  Constant?: TopicRangeFilterConstant;
  NullFilter?: NullFilterType;
}
export type TopicRelativeDateFilterFunction =
  | "PREVIOUS"
  | "THIS"
  | "LAST"
  | "NEXT"
  | "NOW"
  | (string & {});
export interface TopicRelativeDateFilter {
  TimeGranularity?: TopicTimeGranularity;
  RelativeDateFilterFunction?: TopicRelativeDateFilterFunction;
  Constant?: TopicSingularFilterConstant;
  NullFilter?: NullFilterType;
}
export interface TopicNullFilter {
  NullFilterType?: NullFilterType;
  Constant?: TopicSingularFilterConstant;
  Inverse?: boolean;
}
export interface TopicFilter {
  FilterDescription?: string | redacted.Redacted<string>;
  FilterClass?: FilterClass;
  FilterName: string;
  FilterSynonyms?: (string | redacted.Redacted<string>)[];
  OperandFieldName: string;
  FilterType?: NamedFilterType;
  CategoryFilter?: TopicCategoryFilter;
  NumericEqualityFilter?: TopicNumericEqualityFilter;
  NumericRangeFilter?: TopicNumericRangeFilter;
  DateRangeFilter?: TopicDateRangeFilter;
  RelativeDateFilter?: TopicRelativeDateFilter;
  NullFilter?: TopicNullFilter;
}
export type TopicFilters = TopicFilter[];
export type ColumnDataRole = "DIMENSION" | "MEASURE" | (string & {});
export type DefaultAggregation =
  | "SUM"
  | "MAX"
  | "MIN"
  | "COUNT"
  | "DISTINCT_COUNT"
  | "AVERAGE"
  | "MEDIAN"
  | "STDEV"
  | "STDEVP"
  | "VAR"
  | "VARP"
  | (string & {});
export type ColumnOrderingType =
  | "GREATER_IS_BETTER"
  | "LESSER_IS_BETTER"
  | "SPECIFIED"
  | (string & {});
export type UndefinedSpecifiedValueType = "LEAST" | "MOST" | (string & {});
export interface ComparativeOrder {
  UseOrdering?: ColumnOrderingType;
  SpecifedOrder?: string[];
  TreatUndefinedSpecifiedValues?: UndefinedSpecifiedValueType;
}
export type TypeParameters = { [key: string]: string | undefined };
export interface SemanticType {
  TypeName?: string;
  SubTypeName?: string;
  TypeParameters?: { [key: string]: string | undefined };
  TruthyCellValue?: string | redacted.Redacted<string>;
  TruthyCellValueSynonyms?: (string | redacted.Redacted<string>)[];
  FalseyCellValue?: string | redacted.Redacted<string>;
  FalseyCellValueSynonyms?: (string | redacted.Redacted<string>)[];
}
export type AuthorSpecifiedAggregation =
  | "COUNT"
  | "DISTINCT_COUNT"
  | "MIN"
  | "MAX"
  | "MEDIAN"
  | "SUM"
  | "AVERAGE"
  | "STDEV"
  | "STDEVP"
  | "VAR"
  | "VARP"
  | "PERCENTILE"
  | (string & {});
export type AuthorSpecifiedAggregations = AuthorSpecifiedAggregation[];
export interface DefaultFormatting {
  DisplayFormat?: DisplayFormat;
  DisplayFormatOptions?: DisplayFormatOptions;
}
export interface CellValueSynonym {
  CellValue?: string | redacted.Redacted<string>;
  Synonyms?: (string | redacted.Redacted<string>)[];
}
export type CellValueSynonyms = CellValueSynonym[];
export interface TopicColumn {
  ColumnName: string;
  ColumnFriendlyName?: string | redacted.Redacted<string>;
  ColumnDescription?: string | redacted.Redacted<string>;
  ColumnSynonyms?: (string | redacted.Redacted<string>)[];
  ColumnDataRole?: ColumnDataRole;
  Aggregation?: DefaultAggregation;
  IsIncludedInTopic?: boolean;
  DisableIndexing?: boolean;
  ComparativeOrder?: ComparativeOrder;
  SemanticType?: SemanticType;
  TimeGranularity?: TopicTimeGranularity;
  AllowedAggregations?: AuthorSpecifiedAggregation[];
  NotAllowedAggregations?: AuthorSpecifiedAggregation[];
  DefaultFormatting?: DefaultFormatting;
  NeverAggregateInFilter?: boolean;
  CellValueSynonyms?: CellValueSynonym[];
  NonAdditive?: boolean;
}
export type TopicColumns = TopicColumn[];
export interface TopicCalculatedField {
  CalculatedFieldName: string | redacted.Redacted<string>;
  CalculatedFieldDescription?: string | redacted.Redacted<string>;
  Expression: string | redacted.Redacted<string>;
  CalculatedFieldSynonyms?: (string | redacted.Redacted<string>)[];
  IsIncludedInTopic?: boolean;
  DisableIndexing?: boolean;
  ColumnDataRole?: ColumnDataRole;
  TimeGranularity?: TopicTimeGranularity;
  DefaultFormatting?: DefaultFormatting;
  Aggregation?: DefaultAggregation;
  ComparativeOrder?: ComparativeOrder;
  SemanticType?: SemanticType;
  AllowedAggregations?: AuthorSpecifiedAggregation[];
  NotAllowedAggregations?: AuthorSpecifiedAggregation[];
  NeverAggregateInFilter?: boolean;
  CellValueSynonyms?: CellValueSynonym[];
  NonAdditive?: boolean;
}
export type TopicCalculatedFields = TopicCalculatedField[];
export interface SemanticEntityType {
  TypeName?: string;
  SubTypeName?: string;
  TypeParameters?: { [key: string]: string | undefined };
}
export type PropertyRole = "PRIMARY" | "ID" | (string & {});
export type PropertyUsage = "INHERIT" | "DIMENSION" | "MEASURE" | (string & {});
export type NamedEntityAggType =
  | "SUM"
  | "MIN"
  | "MAX"
  | "COUNT"
  | "AVERAGE"
  | "DISTINCT_COUNT"
  | "STDEV"
  | "STDEVP"
  | "VAR"
  | "VARP"
  | "PERCENTILE"
  | "MEDIAN"
  | "CUSTOM"
  | (string & {});
export type AggregationFunctionParameters = {
  [key: string]: string | undefined;
};
export interface NamedEntityDefinitionMetric {
  Aggregation?: NamedEntityAggType;
  AggregationFunctionParameters?: { [key: string]: string | undefined };
}
export interface NamedEntityDefinition {
  FieldName?: string;
  PropertyName?: string;
  PropertyRole?: PropertyRole;
  PropertyUsage?: PropertyUsage;
  Metric?: NamedEntityDefinitionMetric;
  RankOrder?: number;
  PresentationOrder?: number;
  IsHidden?: boolean;
}
export type NamedEntityDefinitions = NamedEntityDefinition[];
export interface NamedEntitySort {
  FieldName: string;
  Direction: TopicSortDirection;
}
export type NamedEntitySortList = NamedEntitySort[];
export interface TopicNamedEntity {
  EntityName: string;
  EntityDescription?: string | redacted.Redacted<string>;
  EntitySynonyms?: (string | redacted.Redacted<string>)[];
  SemanticEntityType?: SemanticEntityType;
  Definition?: NamedEntityDefinition[];
  Sort?: NamedEntitySort[];
  RankOrder?: number;
  PresentationOrder?: number;
}
export type TopicNamedEntities = TopicNamedEntity[];
export interface DatasetMetadata {
  DatasetArn: string;
  DatasetName?: string;
  DatasetDescription?: string;
  DataAggregation?: DataAggregation;
  Filters?: TopicFilter[];
  Columns?: TopicColumn[];
  CalculatedFields?: TopicCalculatedField[];
  NamedEntities?: TopicNamedEntity[];
}
export type Datasets = DatasetMetadata[];
export interface TopicConfigOptions {
  QBusinessInsightsEnabled?: boolean;
}
export interface TopicDetails {
  Name?: string;
  Description?: string;
  UserExperienceVersion?: TopicUserExperienceVersion;
  DataSets?: DatasetMetadata[];
  ConfigOptions?: TopicConfigOptions;
}
export type CustomInstructionsString = string | redacted.Redacted<string>;
export interface CustomInstructions {
  CustomInstructionsString: string | redacted.Redacted<string>;
}
export interface CreateTopicRequest {
  AwsAccountId: string;
  TopicId: string;
  Topic: TopicDetails;
  Tags?: Tag[];
  FolderArns?: string[];
  CustomInstructions?: CustomInstructions;
}
export interface CreateTopicResponse {
  Arn?: string;
  TopicId?: string;
  RefreshArn?: string;
  RequestId?: string;
  Status?: number;
}
export type TopicScheduleType =
  | "HOURLY"
  | "DAILY"
  | "WEEKLY"
  | "MONTHLY"
  | (string & {});
export interface TopicRefreshSchedule {
  IsEnabled: boolean;
  BasedOnSpiceSchedule: boolean;
  StartingAt?: Date;
  Timezone?: string;
  RepeatAt?: string;
  TopicScheduleType?: TopicScheduleType;
}
export interface CreateTopicRefreshScheduleRequest {
  AwsAccountId: string;
  TopicId: string;
  DatasetArn: string;
  DatasetName?: string;
  RefreshSchedule: TopicRefreshSchedule;
}
export interface CreateTopicRefreshScheduleResponse {
  TopicId?: string;
  TopicArn?: string;
  DatasetArn?: string;
  Status?: number;
  RequestId?: string;
}
export interface TopicV2DataSetReference {
  DataSetArn: string;
  DataSetName?: string;
}
export type TopicV2DataSetReferences = TopicV2DataSetReference[];
export type TopicV2DataSetRelationColumnNames = string[];
export interface TopicV2DataSetRelationEndpoint {
  DataSetArn: string;
  ColumnNames: string[];
}
export interface TopicV2DataSetRelation {
  Left: TopicV2DataSetRelationEndpoint;
  Right: TopicV2DataSetRelationEndpoint;
}
export type TopicV2DataSetRelationList = TopicV2DataSetRelation[];
export interface TopicV2Details {
  Name: string;
  Description?: string;
  DataSets?: TopicV2DataSetReference[];
  DataSetRelations?: TopicV2DataSetRelation[];
}
export interface CreateTopicV2Request {
  AwsAccountId: string;
  TopicId: string;
  Topic: TopicV2Details;
  Tags?: Tag[];
  FolderArns?: string[];
  CustomInstructions?: CustomInstructions;
}
export interface CreateTopicV2Response {
  Arn?: string;
  TopicId?: string;
  RequestId?: string;
  Status?: number;
}
export type VPCConnectionResourceIdRestricted = string;
export type SubnetId = string;
export type SubnetIdList = string[];
export type SecurityGroupId = string;
export type SecurityGroupIdList = string[];
export type IPv4Address = string;
export type DnsResolverList = string[];
export interface CreateVPCConnectionRequest {
  AwsAccountId: string;
  VPCConnectionId: string;
  Name: string;
  SubnetIds: string[];
  SecurityGroupIds: string[];
  DnsResolvers?: string[];
  RoleArn: string;
  Tags?: Tag[];
}
export type VPCConnectionResourceStatus =
  | "CREATION_IN_PROGRESS"
  | "CREATION_SUCCESSFUL"
  | "CREATION_FAILED"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_SUCCESSFUL"
  | "UPDATE_FAILED"
  | "DELETION_IN_PROGRESS"
  | "DELETION_FAILED"
  | "DELETED"
  | (string & {});
export type VPCConnectionAvailabilityStatus =
  | "AVAILABLE"
  | "UNAVAILABLE"
  | "PARTIALLY_AVAILABLE"
  | (string & {});
export interface CreateVPCConnectionResponse {
  Arn?: string;
  VPCConnectionId?: string;
  CreationStatus?: VPCConnectionResourceStatus;
  AvailabilityStatus?: VPCConnectionAvailabilityStatus;
  RequestId?: string;
  Status?: number;
}
export interface DeleteAccountCustomizationRequest {
  AwsAccountId: string;
  Namespace?: string;
}
export interface DeleteAccountCustomizationResponse {
  RequestId?: string;
  Status?: number;
}
export interface DeleteAccountCustomPermissionRequest {
  AwsAccountId: string;
}
export interface DeleteAccountCustomPermissionResponse {
  RequestId?: string;
  Status?: number;
}
export interface DeleteAccountSubscriptionRequest {
  AwsAccountId: string;
}
export interface DeleteAccountSubscriptionResponse {
  RequestId?: string;
  Status?: number;
}
export interface DeleteActionConnectorRequest {
  AwsAccountId: string;
  ActionConnectorId: string;
}
export interface DeleteActionConnectorResponse {
  Arn?: string;
  ActionConnectorId?: string;
  RequestId?: string;
  Status?: number;
}
export interface DeleteAgentRequest {
  AgentId: string;
  AwsAccountId: string;
}
export interface DeleteAgentResponse {
  RequestId?: string;
}
export type RecoveryWindowInDays = number;
export interface DeleteAnalysisRequest {
  AwsAccountId: string;
  AnalysisId: string;
  RecoveryWindowInDays?: number;
  ForceDeleteWithoutRecovery?: boolean;
}
export interface DeleteAnalysisResponse {
  Status?: number;
  Arn?: string;
  AnalysisId?: string;
  DeletionTime?: Date;
  RequestId?: string;
}
export interface DeleteApprovalPolicyRequest {
  PolicyId: string;
}
export interface DeleteApprovalPolicyResponse {}
export interface DeleteBrandRequest {
  AwsAccountId: string;
  BrandId: string;
}
export interface DeleteBrandResponse {
  RequestId?: string;
}
export interface DeleteBrandAssignmentRequest {
  AwsAccountId: string;
}
export interface DeleteBrandAssignmentResponse {
  RequestId?: string;
}
export interface DeleteCustomPermissionsRequest {
  AwsAccountId: string;
  CustomPermissionsName: string;
}
export interface DeleteCustomPermissionsResponse {
  Status?: number;
  Arn?: string;
  RequestId?: string;
}
export interface DeleteDashboardRequest {
  AwsAccountId: string;
  DashboardId: string;
  VersionNumber?: number;
}
export interface DeleteDashboardResponse {
  Status?: number;
  Arn?: string;
  DashboardId?: string;
  RequestId?: string;
}
export interface DeleteDataSetRequest {
  AwsAccountId: string;
  DataSetId: string;
}
export interface DeleteDataSetResponse {
  Arn?: string;
  DataSetId?: string;
  RequestId?: string;
  Status?: number;
}
export interface DeleteDataSetRefreshPropertiesRequest {
  AwsAccountId: string;
  DataSetId: string;
}
export interface DeleteDataSetRefreshPropertiesResponse {
  RequestId?: string;
  Status?: number;
}
export interface DeleteDataSourceRequest {
  AwsAccountId: string;
  DataSourceId: string;
}
export interface DeleteDataSourceResponse {
  Arn?: string;
  DataSourceId?: string;
  RequestId?: string;
  Status?: number;
}
export interface DeleteDefaultQBusinessApplicationRequest {
  AwsAccountId: string;
  Namespace?: string;
}
export interface DeleteDefaultQBusinessApplicationResponse {
  RequestId?: string;
  Status?: number;
}
export interface DeleteDlpSettingRequest {
  AwsAccountId: string;
  DlpSettingId: string;
}
export interface DeleteDlpSettingResponse {
  Arn: string;
  DlpSettingId: string;
  RequestId?: string;
}
export interface DeleteFlowRequest {
  AwsAccountId: string;
  FlowId: string;
}
export interface DeleteFlowResponse {
  RequestId?: string;
  Status?: number;
}
export interface DeleteFolderRequest {
  AwsAccountId: string;
  FolderId: string;
}
export interface DeleteFolderResponse {
  Status?: number;
  Arn?: string;
  FolderId?: string;
  RequestId?: string;
}
export interface DeleteFolderMembershipRequest {
  AwsAccountId: string;
  FolderId: string;
  MemberId: string;
  MemberType: MemberType;
}
export interface DeleteFolderMembershipResponse {
  Status?: number;
  RequestId?: string;
}
export interface DeleteGroupRequest {
  GroupName: string;
  AwsAccountId: string;
  Namespace: string;
}
export interface DeleteGroupResponse {
  RequestId?: string;
  Status?: number;
}
export interface DeleteGroupMembershipRequest {
  MemberName: string;
  GroupName: string;
  AwsAccountId: string;
  Namespace: string;
}
export interface DeleteGroupMembershipResponse {
  RequestId?: string;
  Status?: number;
}
export interface DeleteIAMPolicyAssignmentRequest {
  AwsAccountId: string;
  AssignmentName: string;
  Namespace: string;
}
export interface DeleteIAMPolicyAssignmentResponse {
  AssignmentName?: string;
  RequestId?: string;
  Status?: number;
}
export type ServiceType =
  | "REDSHIFT"
  | "QBUSINESS"
  | "ATHENA"
  | "GLUE_DATA_CATALOG"
  | (string & {});
export interface DeleteIdentityPropagationConfigRequest {
  AwsAccountId: string;
  Service: ServiceType;
}
export interface DeleteIdentityPropagationConfigResponse {
  RequestId?: string;
  Status?: number;
}
export interface DeleteKnowledgeBaseRequest {
  AwsAccountId: string;
  KnowledgeBaseId: string;
}
export interface DeleteKnowledgeBaseResponse {
  KnowledgeBaseArn: string;
  KnowledgeBaseId: string;
  RequestId?: string;
  Status?: number;
}
export interface DeleteLimitsProfileRequest {
  profileId: string;
  accountId: string;
}
export interface DeleteLimitsProfileResponse {
  arn: string;
}
export interface DeleteNamespaceRequest {
  AwsAccountId: string;
  Namespace: string;
}
export interface DeleteNamespaceResponse {
  RequestId?: string;
  Status?: number;
}
export interface DeleteOAuthClientApplicationRequest {
  AwsAccountId: string;
  OAuthClientApplicationId: string;
}
export interface DeleteOAuthClientApplicationResponse {
  Arn?: string;
  OAuthClientApplicationId?: string;
  RequestId?: string;
  Status?: number;
}
export interface DeleteRefreshScheduleRequest {
  DataSetId: string;
  AwsAccountId: string;
  ScheduleId: string;
}
export interface DeleteRefreshScheduleResponse {
  Status?: number;
  RequestId?: string;
  ScheduleId?: string;
  Arn?: string;
}
export interface DeleteRoleCustomPermissionRequest {
  Role: Role;
  AwsAccountId: string;
  Namespace: string;
}
export interface DeleteRoleCustomPermissionResponse {
  RequestId?: string;
  Status?: number;
}
export interface DeleteRoleMembershipRequest {
  MemberName: string;
  Role: Role;
  AwsAccountId: string;
  Namespace: string;
}
export interface DeleteRoleMembershipResponse {
  RequestId?: string;
  Status?: number;
}
export interface DeleteSpaceRequest {
  AwsAccountId: string;
  SpaceId: string;
}
export interface DeleteSpaceResponse {
  spaceId: string;
  spaceArn?: string;
  RequestId?: string;
}
export interface DeleteTemplateRequest {
  AwsAccountId: string;
  TemplateId: string;
  VersionNumber?: number;
}
export interface DeleteTemplateResponse {
  RequestId?: string;
  Arn?: string;
  TemplateId?: string;
  Status?: number;
}
export interface DeleteTemplateAliasRequest {
  AwsAccountId: string;
  TemplateId: string;
  AliasName: string;
}
export interface DeleteTemplateAliasResponse {
  Status?: number;
  TemplateId?: string;
  AliasName?: string;
  Arn?: string;
  RequestId?: string;
}
export interface DeleteThemeRequest {
  AwsAccountId: string;
  ThemeId: string;
  VersionNumber?: number;
}
export interface DeleteThemeResponse {
  Arn?: string;
  RequestId?: string;
  Status?: number;
  ThemeId?: string;
}
export interface DeleteThemeAliasRequest {
  AwsAccountId: string;
  ThemeId: string;
  AliasName: string;
}
export interface DeleteThemeAliasResponse {
  AliasName?: string;
  Arn?: string;
  RequestId?: string;
  Status?: number;
  ThemeId?: string;
}
export interface DeleteTopicRequest {
  AwsAccountId: string;
  TopicId: string;
}
export interface DeleteTopicResponse {
  Arn?: string;
  TopicId?: string;
  RequestId?: string;
  Status?: number;
}
export interface DeleteTopicRefreshScheduleRequest {
  AwsAccountId: string;
  TopicId: string;
  DatasetId: string;
}
export interface DeleteTopicRefreshScheduleResponse {
  TopicId?: string;
  TopicArn?: string;
  DatasetArn?: string;
  Status?: number;
  RequestId?: string;
}
export interface DeleteTopicV2Request {
  AwsAccountId: string;
  TopicId: string;
}
export interface DeleteTopicV2Response {
  Arn?: string;
  TopicId?: string;
  RequestId?: string;
  Status?: number;
}
export type UserName = string;
export interface DeleteUserRequest {
  UserName: string;
  AwsAccountId: string;
  Namespace: string;
}
export interface DeleteUserResponse {
  RequestId?: string;
  Status?: number;
}
export interface DeleteUserByPrincipalIdRequest {
  PrincipalId: string;
  AwsAccountId: string;
  Namespace: string;
}
export interface DeleteUserByPrincipalIdResponse {
  RequestId?: string;
  Status?: number;
}
export interface DeleteUserCustomPermissionRequest {
  UserName: string;
  AwsAccountId: string;
  Namespace: string;
}
export interface DeleteUserCustomPermissionResponse {
  RequestId?: string;
  Status?: number;
}
export type VPCConnectionResourceIdUnrestricted = string;
export interface DeleteVPCConnectionRequest {
  AwsAccountId: string;
  VPCConnectionId: string;
}
export interface DeleteVPCConnectionResponse {
  Arn?: string;
  VPCConnectionId?: string;
  DeletionStatus?: VPCConnectionResourceStatus;
  AvailabilityStatus?: VPCConnectionAvailabilityStatus;
  RequestId?: string;
  Status?: number;
}
export interface DescribeAccountCustomizationRequest {
  AwsAccountId: string;
  Namespace?: string;
  Resolved?: boolean;
}
export interface DescribeAccountCustomizationResponse {
  Arn?: string;
  AwsAccountId?: string;
  Namespace?: string;
  AccountCustomization?: AccountCustomization;
  RequestId?: string;
  Status?: number;
}
export interface DescribeAccountCustomPermissionRequest {
  AwsAccountId: string;
}
export interface DescribeAccountCustomPermissionResponse {
  CustomPermissionsName?: string;
  RequestId?: string;
  Status?: number;
}
export interface DescribeAccountSettingsRequest {
  AwsAccountId: string;
}
export interface AccountSettings {
  AccountName?: string;
  Edition?: Edition;
  DefaultNamespace?: string;
  NotificationEmail?: string;
  PublicSharingEnabled?: boolean;
  TerminationProtectionEnabled?: boolean;
}
export interface DescribeAccountSettingsResponse {
  AccountSettings?: AccountSettings;
  RequestId?: string;
  Status?: number;
}
export interface DescribeAccountSubscriptionRequest {
  AwsAccountId: string;
}
export interface AccountInfo {
  AccountName?: string;
  Edition?: Edition;
  NotificationEmail?: string;
  AuthenticationType?: string;
  AccountSubscriptionStatus?: string;
  IAMIdentityCenterInstanceArn?: string;
}
export interface DescribeAccountSubscriptionResponse {
  AccountInfo?: AccountInfo;
  Status?: number;
  RequestId?: string;
}
export interface DescribeActionConnectorRequest {
  AwsAccountId: string;
  ActionConnectorId: string;
}
export type ActionConnectorErrorType = "INTERNAL_FAILURE" | (string & {});
export interface ActionConnectorError {
  Message?: string;
  Type?: ActionConnectorErrorType;
}
export interface ReadAuthorizationCodeGrantDetails {
  ClientId: string;
  TokenEndpoint: string;
  AuthorizationEndpoint: string;
}
export type ReadAuthorizationCodeGrantCredentialsDetails = {
  ReadAuthorizationCodeGrantDetails: ReadAuthorizationCodeGrantDetails;
};
export interface ReadAuthorizationCodeGrantMetadata {
  BaseEndpoint: string;
  RedirectUrl: string;
  ReadAuthorizationCodeGrantCredentialsDetails?: ReadAuthorizationCodeGrantCredentialsDetails;
  AuthorizationCodeGrantCredentialsSource?: AuthorizationCodeGrantCredentialsSource;
}
export interface ReadClientCredentialsGrantDetails {
  ClientId: string;
  TokenEndpoint: string;
}
export type ReadClientCredentialsDetails = {
  ReadClientCredentialsGrantDetails: ReadClientCredentialsGrantDetails;
};
export interface ReadClientCredentialsGrantMetadata {
  BaseEndpoint: string;
  ReadClientCredentialsDetails?: ReadClientCredentialsDetails;
  ClientCredentialsSource?: ClientCredentialsSource;
}
export interface ReadBasicAuthConnectionMetadata {
  BaseEndpoint: string;
  Username: string | redacted.Redacted<string>;
}
export interface ReadAPIKeyConnectionMetadata {
  BaseEndpoint: string;
  Email?: string | redacted.Redacted<string>;
}
export interface ReadNoneConnectionMetadata {
  BaseEndpoint: string;
}
export interface ReadIamConnectionMetadata {
  RoleArn: string;
  SourceArn: string;
}
export type ReadAuthenticationMetadata =
  | {
      AuthorizationCodeGrantMetadata: ReadAuthorizationCodeGrantMetadata;
      ClientCredentialsGrantMetadata?: never;
      BasicAuthConnectionMetadata?: never;
      ApiKeyConnectionMetadata?: never;
      NoneConnectionMetadata?: never;
      IamConnectionMetadata?: never;
    }
  | {
      AuthorizationCodeGrantMetadata?: never;
      ClientCredentialsGrantMetadata: ReadClientCredentialsGrantMetadata;
      BasicAuthConnectionMetadata?: never;
      ApiKeyConnectionMetadata?: never;
      NoneConnectionMetadata?: never;
      IamConnectionMetadata?: never;
    }
  | {
      AuthorizationCodeGrantMetadata?: never;
      ClientCredentialsGrantMetadata?: never;
      BasicAuthConnectionMetadata: ReadBasicAuthConnectionMetadata;
      ApiKeyConnectionMetadata?: never;
      NoneConnectionMetadata?: never;
      IamConnectionMetadata?: never;
    }
  | {
      AuthorizationCodeGrantMetadata?: never;
      ClientCredentialsGrantMetadata?: never;
      BasicAuthConnectionMetadata?: never;
      ApiKeyConnectionMetadata: ReadAPIKeyConnectionMetadata;
      NoneConnectionMetadata?: never;
      IamConnectionMetadata?: never;
    }
  | {
      AuthorizationCodeGrantMetadata?: never;
      ClientCredentialsGrantMetadata?: never;
      BasicAuthConnectionMetadata?: never;
      ApiKeyConnectionMetadata?: never;
      NoneConnectionMetadata: ReadNoneConnectionMetadata;
      IamConnectionMetadata?: never;
    }
  | {
      AuthorizationCodeGrantMetadata?: never;
      ClientCredentialsGrantMetadata?: never;
      BasicAuthConnectionMetadata?: never;
      ApiKeyConnectionMetadata?: never;
      NoneConnectionMetadata?: never;
      IamConnectionMetadata: ReadIamConnectionMetadata;
    };
export interface ReadAuthConfig {
  AuthenticationType: ConnectionAuthType;
  AuthenticationMetadata: ReadAuthenticationMetadata;
}
export type ActionId = string;
export type ActionIdList = string[];
export interface ActionConnector {
  Arn: string;
  ActionConnectorId: string;
  Type: ActionConnectorType;
  Name: string | redacted.Redacted<string>;
  CreatedTime?: Date;
  LastUpdatedTime: Date;
  Status?: ResourceStatus;
  Error?: ActionConnectorError;
  Description?: string | redacted.Redacted<string>;
  AuthenticationConfig?: ReadAuthConfig;
  EnabledActions?: string[];
  VpcConnectionArn?: string;
}
export interface DescribeActionConnectorResponse {
  ActionConnector?: ActionConnector;
  RequestId?: string;
  Status?: number;
}
export interface DescribeActionConnectorPermissionsRequest {
  AwsAccountId: string;
  ActionConnectorId: string;
}
export interface DescribeActionConnectorPermissionsResponse {
  Arn?: string;
  ActionConnectorId?: string;
  Permissions?: ResourcePermission[];
  RequestId?: string;
  Status?: number;
}
export interface DescribeAgentRequest {
  AgentId: string;
  AwsAccountId: string;
}
export type AgentSpacesList = string[];
export type AgentActionConnectorsList = string[];
export type SensitiveText = string | redacted.Redacted<string>;
export interface CustomPromptInterface {
  ModelProfileId: string;
  SubscriptionId: string;
  QbsAwsAccountId: string;
  ResponseLength?: string | redacted.Redacted<string>;
  OutputStyle?: string | redacted.Redacted<string>;
  Identity?: string | redacted.Redacted<string>;
  Tone?: string | redacted.Redacted<string>;
  CustomInstructions?: string | redacted.Redacted<string>;
  promptSummary?: string | redacted.Redacted<string>;
}
export interface Agent {
  Spaces?: string[];
  ActionConnectors?: string[];
  Description?: string;
  IconId?: string;
  Name: string;
  StarterPrompts?: string[];
  WelcomeMessage?: string | redacted.Redacted<string>;
  Arn: string;
  AgentId: string;
  AgentLifecycle: AgentLifecycle;
  AgentStatus: AgentStatus;
  CreatedAt: Date;
  Creator: string;
  CustomPromptInterface?: CustomPromptInterface;
  ErrorMessage?: string;
  UpdatedAt: Date;
}
export interface DescribeAgentResponse {
  Agent: Agent;
  RequestId?: string;
}
export interface DescribeAgentPermissionsRequest {
  AgentId: string;
  AwsAccountId: string;
}
export interface DescribeAgentPermissionsResponse {
  Arn: string;
  AgentId: string;
  Permissions: ResourcePermission[];
  RequestId: string;
}
export interface DescribeAnalysisRequest {
  AwsAccountId: string;
  AnalysisId: string;
}
export type AnalysisErrorType =
  | "ACCESS_DENIED"
  | "SOURCE_NOT_FOUND"
  | "DATA_SET_NOT_FOUND"
  | "INTERNAL_FAILURE"
  | "PARAMETER_VALUE_INCOMPATIBLE"
  | "PARAMETER_TYPE_INVALID"
  | "PARAMETER_NOT_FOUND"
  | "COLUMN_TYPE_MISMATCH"
  | "COLUMN_GEOGRAPHIC_ROLE_MISMATCH"
  | "COLUMN_REPLACEMENT_MISSING"
  | (string & {});
export interface Entity {
  Path?: string;
}
export type EntityList = Entity[];
export interface AnalysisError {
  Type?: AnalysisErrorType;
  Message?: string;
  ViolatedEntities?: Entity[];
}
export type AnalysisErrorList = AnalysisError[];
export type TopicArnsList = string[];
export interface Sheet {
  SheetId?: string;
  Name?: string;
  Images?: SheetImage[];
}
export type SheetList = Sheet[];
export interface Analysis {
  AnalysisId?: string;
  Arn?: string;
  Name?: string;
  Status?: ResourceStatus;
  Errors?: AnalysisError[];
  DataSetArns?: string[];
  TopicArns?: string[];
  ThemeArn?: string;
  CreatedTime?: Date;
  LastUpdatedTime?: Date;
  Sheets?: Sheet[];
}
export interface DescribeAnalysisResponse {
  Analysis?: Analysis;
  Status?: number;
  RequestId?: string;
}
export interface DescribeAnalysisDefinitionRequest {
  AwsAccountId: string;
  AnalysisId: string;
}
export interface DescribeAnalysisDefinitionResponse {
  AnalysisId?: string;
  Name?: string;
  Errors?: AnalysisError[];
  ResourceStatus?: ResourceStatus;
  ThemeArn?: string;
  Definition?: AnalysisDefinition;
  Status?: number;
  RequestId?: string;
}
export interface DescribeAnalysisPermissionsRequest {
  AwsAccountId: string;
  AnalysisId: string;
}
export type UpdateResourcePermissionList = ResourcePermission[];
export interface DescribeAnalysisPermissionsResponse {
  AnalysisId?: string;
  AnalysisArn?: string;
  Permissions?: ResourcePermission[];
  Status?: number;
  RequestId?: string;
}
export interface DescribeApprovalPolicyRequest {
  PolicyId: string;
}
export interface DescribeApprovalPolicyResponse {
  Policy: ApprovalPolicy;
}
export interface DescribeAssetBundleExportJobRequest {
  AwsAccountId: string;
  AssetBundleExportJobId: string;
}
export type AssetBundleExportJobStatus =
  | "QUEUED_FOR_IMMEDIATE_EXECUTION"
  | "IN_PROGRESS"
  | "SUCCESSFUL"
  | "FAILED"
  | (string & {});
export type SensitiveS3Uri = string | redacted.Redacted<string>;
export interface AssetBundleExportJobError {
  Arn?: string;
  Type?: string;
  Message?: string;
}
export type AssetBundleExportJobErrorList = AssetBundleExportJobError[];
export type AssetBundleResourceArns = string[];
export type AssetBundleExportFormat =
  | "CLOUDFORMATION_JSON"
  | "QUICKSIGHT_JSON"
  | (string & {});
export interface AssetBundleExportJobResourceIdOverrideConfiguration {
  PrefixForAllResources?: boolean;
}
export type AssetBundleExportJobVPCConnectionPropertyToOverride =
  | "Name"
  | "DnsResolvers"
  | "RoleArn"
  | (string & {});
export type AssetBundleExportJobVPCConnectionPropertyToOverrideList =
  AssetBundleExportJobVPCConnectionPropertyToOverride[];
export interface AssetBundleExportJobVPCConnectionOverrideProperties {
  Arn: string;
  Properties: AssetBundleExportJobVPCConnectionPropertyToOverride[];
}
export type AssetBundleExportJobVPCConnectionOverridePropertiesList =
  AssetBundleExportJobVPCConnectionOverrideProperties[];
export type AssetBundleExportJobRefreshSchedulePropertyToOverride =
  | "StartAfterDateTime"
  | (string & {});
export type AssetBundleExportJobRefreshSchedulePropertyToOverrideList =
  AssetBundleExportJobRefreshSchedulePropertyToOverride[];
export interface AssetBundleExportJobRefreshScheduleOverrideProperties {
  Arn: string;
  Properties: AssetBundleExportJobRefreshSchedulePropertyToOverride[];
}
export type AssetBundleExportJobRefreshScheduleOverridePropertiesList =
  AssetBundleExportJobRefreshScheduleOverrideProperties[];
export type AssetBundleExportJobDataSourcePropertyToOverride =
  | "Name"
  | "DisableSsl"
  | "SecretArn"
  | "Username"
  | "Password"
  | "Domain"
  | "WorkGroup"
  | "Host"
  | "Port"
  | "Database"
  | "DataSetName"
  | "Catalog"
  | "InstanceId"
  | "ClusterId"
  | "ManifestFileLocation"
  | "Warehouse"
  | "RoleArn"
  | "ProductType"
  | (string & {});
export type AssetBundleExportJobDataSourcePropertyToOverrideList =
  AssetBundleExportJobDataSourcePropertyToOverride[];
export interface AssetBundleExportJobDataSourceOverrideProperties {
  Arn: string;
  Properties: AssetBundleExportJobDataSourcePropertyToOverride[];
}
export type AssetBundleExportJobDataSourceOverridePropertiesList =
  AssetBundleExportJobDataSourceOverrideProperties[];
export type AssetBundleExportJobDataSetPropertyToOverride =
  | "Name"
  | "RefreshFailureEmailAlertStatus"
  | (string & {});
export type AssetBundleExportJobDataSetPropertyToOverrideList =
  AssetBundleExportJobDataSetPropertyToOverride[];
export interface AssetBundleExportJobDataSetOverrideProperties {
  Arn: string;
  Properties: AssetBundleExportJobDataSetPropertyToOverride[];
}
export type AssetBundleExportJobDataSetOverridePropertiesList =
  AssetBundleExportJobDataSetOverrideProperties[];
export type AssetBundleExportJobThemePropertyToOverride =
  | "Name"
  | (string & {});
export type AssetBundleExportJobThemePropertyToOverrideList =
  AssetBundleExportJobThemePropertyToOverride[];
export interface AssetBundleExportJobThemeOverrideProperties {
  Arn: string;
  Properties: AssetBundleExportJobThemePropertyToOverride[];
}
export type AssetBundleExportJobThemeOverridePropertiesList =
  AssetBundleExportJobThemeOverrideProperties[];
export type AssetBundleExportJobAnalysisPropertyToOverride =
  | "Name"
  | (string & {});
export type AssetBundleExportJobAnalysisPropertyToOverrideList =
  AssetBundleExportJobAnalysisPropertyToOverride[];
export interface AssetBundleExportJobAnalysisOverrideProperties {
  Arn: string;
  Properties: AssetBundleExportJobAnalysisPropertyToOverride[];
}
export type AssetBundleExportJobAnalysisOverridePropertiesList =
  AssetBundleExportJobAnalysisOverrideProperties[];
export type AssetBundleExportJobDashboardPropertyToOverride =
  | "Name"
  | (string & {});
export type AssetBundleExportJobDashboardPropertyToOverrideList =
  AssetBundleExportJobDashboardPropertyToOverride[];
export interface AssetBundleExportJobDashboardOverrideProperties {
  Arn: string;
  Properties: AssetBundleExportJobDashboardPropertyToOverride[];
}
export type AssetBundleExportJobDashboardOverridePropertiesList =
  AssetBundleExportJobDashboardOverrideProperties[];
export type AssetBundleExportJobFolderPropertyToOverride =
  | "Name"
  | "ParentFolderArn"
  | (string & {});
export type AssetBundleExportJobFolderPropertyToOverrideList =
  AssetBundleExportJobFolderPropertyToOverride[];
export interface AssetBundleExportJobFolderOverrideProperties {
  Arn: string;
  Properties: AssetBundleExportJobFolderPropertyToOverride[];
}
export type AssetBundleExportJobFolderOverridePropertiesList =
  AssetBundleExportJobFolderOverrideProperties[];
export type AssetBundleExportJobTopicV2PropertyToOverride =
  | "Name"
  | "Description"
  | (string & {});
export type AssetBundleExportJobTopicV2PropertyToOverrideList =
  AssetBundleExportJobTopicV2PropertyToOverride[];
export interface AssetBundleExportJobTopicV2OverrideProperties {
  Arn: string;
  Properties: AssetBundleExportJobTopicV2PropertyToOverride[];
}
export type AssetBundleExportJobTopicV2OverridePropertiesList =
  AssetBundleExportJobTopicV2OverrideProperties[];
export interface AssetBundleCloudFormationOverridePropertyConfiguration {
  ResourceIdOverrideConfiguration?: AssetBundleExportJobResourceIdOverrideConfiguration;
  VPCConnections?: AssetBundleExportJobVPCConnectionOverrideProperties[];
  RefreshSchedules?: AssetBundleExportJobRefreshScheduleOverrideProperties[];
  DataSources?: AssetBundleExportJobDataSourceOverrideProperties[];
  DataSets?: AssetBundleExportJobDataSetOverrideProperties[];
  Themes?: AssetBundleExportJobThemeOverrideProperties[];
  Analyses?: AssetBundleExportJobAnalysisOverrideProperties[];
  Dashboards?: AssetBundleExportJobDashboardOverrideProperties[];
  Folders?: AssetBundleExportJobFolderOverrideProperties[];
  TopicsV2?: AssetBundleExportJobTopicV2OverrideProperties[];
}
export interface AssetBundleExportJobValidationStrategy {
  StrictModeForAllResources?: boolean;
}
export interface AssetBundleExportJobWarning {
  Arn?: string;
  Message?: string;
}
export type AssetBundleExportJobWarningList = AssetBundleExportJobWarning[];
export type IncludeFolderMembers =
  | "RECURSE"
  | "ONE_LEVEL"
  | "NONE"
  | (string & {});
export interface DescribeAssetBundleExportJobResponse {
  JobStatus?: AssetBundleExportJobStatus;
  DownloadUrl?: string | redacted.Redacted<string>;
  Errors?: AssetBundleExportJobError[];
  Arn?: string;
  CreatedTime?: Date;
  AssetBundleExportJobId?: string;
  AwsAccountId?: string;
  ResourceArns?: string[];
  IncludeAllDependencies?: boolean;
  ExportFormat?: AssetBundleExportFormat;
  CloudFormationOverridePropertyConfiguration?: AssetBundleCloudFormationOverridePropertyConfiguration;
  RequestId?: string;
  Status?: number;
  IncludePermissions?: boolean;
  IncludeTags?: boolean;
  ValidationStrategy?: AssetBundleExportJobValidationStrategy;
  Warnings?: AssetBundleExportJobWarning[];
  IncludeFolderMemberships?: boolean;
  IncludeFolderMembers?: IncludeFolderMembers;
}
export interface DescribeAssetBundleImportJobRequest {
  AwsAccountId: string;
  AssetBundleImportJobId: string;
}
export type AssetBundleImportJobStatus =
  | "QUEUED_FOR_IMMEDIATE_EXECUTION"
  | "IN_PROGRESS"
  | "SUCCESSFUL"
  | "FAILED"
  | "FAILED_ROLLBACK_IN_PROGRESS"
  | "FAILED_ROLLBACK_COMPLETED"
  | "FAILED_ROLLBACK_ERROR"
  | (string & {});
export interface AssetBundleImportJobError {
  Arn?: string;
  Type?: string;
  Message?: string;
}
export type AssetBundleImportJobErrorList = AssetBundleImportJobError[];
export type S3Uri = string;
export interface AssetBundleImportSourceDescription {
  Body?: string | redacted.Redacted<string>;
  S3Uri?: string;
}
export interface AssetBundleImportJobResourceIdOverrideConfiguration {
  PrefixForAllResources?: string;
}
export interface AssetBundleImportJobVPCConnectionOverrideParameters {
  VPCConnectionId: string;
  Name?: string;
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
  DnsResolvers?: string[];
  RoleArn?: string;
}
export type AssetBundleImportJobVPCConnectionOverrideParametersList =
  AssetBundleImportJobVPCConnectionOverrideParameters[];
export interface AssetBundleImportJobRefreshScheduleOverrideParameters {
  DataSetId: string;
  ScheduleId: string;
  StartAfterDateTime?: Date;
}
export type AssetBundleImportJobRefreshScheduleOverrideParametersList =
  AssetBundleImportJobRefreshScheduleOverrideParameters[];
export interface AssetBundleImportJobDataSourceCredentialPair {
  Username: string;
  Password: string | redacted.Redacted<string>;
}
export interface AssetBundleImportJobDataSourceCredentials {
  CredentialPair?: AssetBundleImportJobDataSourceCredentialPair;
  SecretArn?: string;
}
export interface AssetBundleImportJobDataSourceOverrideParameters {
  DataSourceId: string;
  Name?: string;
  DataSourceParameters?: DataSourceParameters;
  VpcConnectionProperties?: VpcConnectionProperties;
  SslProperties?: SslProperties;
  Credentials?: AssetBundleImportJobDataSourceCredentials;
}
export type AssetBundleImportJobDataSourceOverrideParametersList =
  AssetBundleImportJobDataSourceOverrideParameters[];
export type PositiveLong = number;
export type LookbackWindowSizeUnit = "HOUR" | "DAY" | "WEEK" | (string & {});
export interface LookbackWindow {
  ColumnName: string;
  Size: number;
  SizeUnit: LookbackWindowSizeUnit;
}
export interface IncrementalRefresh {
  LookbackWindow: LookbackWindow;
}
export interface RefreshConfiguration {
  IncrementalRefresh: IncrementalRefresh;
}
export type RefreshFailureAlertStatus = "ENABLED" | "DISABLED" | (string & {});
export interface RefreshFailureEmailAlert {
  AlertStatus?: RefreshFailureAlertStatus;
}
export interface RefreshFailureConfiguration {
  EmailAlert?: RefreshFailureEmailAlert;
}
export interface DataSetRefreshProperties {
  RefreshConfiguration?: RefreshConfiguration;
  FailureConfiguration?: RefreshFailureConfiguration;
}
export interface AssetBundleImportJobDataSetOverrideParameters {
  DataSetId: string;
  Name?: string;
  DataSetRefreshProperties?: DataSetRefreshProperties;
}
export type AssetBundleImportJobDataSetOverrideParametersList =
  AssetBundleImportJobDataSetOverrideParameters[];
export interface AssetBundleImportJobThemeOverrideParameters {
  ThemeId: string;
  Name?: string;
}
export type AssetBundleImportJobThemeOverrideParametersList =
  AssetBundleImportJobThemeOverrideParameters[];
export interface AssetBundleImportJobAnalysisOverrideParameters {
  AnalysisId: string;
  Name?: string;
}
export type AssetBundleImportJobAnalysisOverrideParametersList =
  AssetBundleImportJobAnalysisOverrideParameters[];
export interface AssetBundleImportJobDashboardOverrideParameters {
  DashboardId: string;
  Name?: string;
}
export type AssetBundleImportJobDashboardOverrideParametersList =
  AssetBundleImportJobDashboardOverrideParameters[];
export interface AssetBundleImportJobFolderOverrideParameters {
  FolderId: string;
  Name?: string;
  ParentFolderArn?: string;
}
export type AssetBundleImportJobFolderOverrideParametersList =
  AssetBundleImportJobFolderOverrideParameters[];
export type TopicDescription = string;
export interface AssetBundleImportJobTopicV2OverrideParameters {
  TopicId: string;
  Name?: string;
  Description?: string;
}
export type AssetBundleImportJobTopicV2OverrideParametersList =
  AssetBundleImportJobTopicV2OverrideParameters[];
export interface AssetBundleImportJobOverrideParameters {
  ResourceIdOverrideConfiguration?: AssetBundleImportJobResourceIdOverrideConfiguration;
  VPCConnections?: AssetBundleImportJobVPCConnectionOverrideParameters[];
  RefreshSchedules?: AssetBundleImportJobRefreshScheduleOverrideParameters[];
  DataSources?: AssetBundleImportJobDataSourceOverrideParameters[];
  DataSets?: AssetBundleImportJobDataSetOverrideParameters[];
  Themes?: AssetBundleImportJobThemeOverrideParameters[];
  Analyses?: AssetBundleImportJobAnalysisOverrideParameters[];
  Dashboards?: AssetBundleImportJobDashboardOverrideParameters[];
  Folders?: AssetBundleImportJobFolderOverrideParameters[];
  TopicsV2?: AssetBundleImportJobTopicV2OverrideParameters[];
}
export type AssetBundleImportFailureAction =
  | "DO_NOTHING"
  | "ROLLBACK"
  | (string & {});
export type AssetBundleRestrictiveResourceId = string;
export type AssetBundleRestrictiveResourceIdList = string[];
export type AssetBundlePrincipalList = string[];
export interface AssetBundleResourcePermissions {
  Principals: string[];
  Actions: string[];
}
export interface AssetBundleImportJobDataSourceOverridePermissions {
  DataSourceIds: string[];
  Permissions: AssetBundleResourcePermissions;
}
export type AssetBundleImportJobDataSourceOverridePermissionsList =
  AssetBundleImportJobDataSourceOverridePermissions[];
export interface AssetBundleImportJobDataSetOverridePermissions {
  DataSetIds: string[];
  Permissions: AssetBundleResourcePermissions;
}
export type AssetBundleImportJobDataSetOverridePermissionsList =
  AssetBundleImportJobDataSetOverridePermissions[];
export interface AssetBundleImportJobThemeOverridePermissions {
  ThemeIds: string[];
  Permissions: AssetBundleResourcePermissions;
}
export type AssetBundleImportJobThemeOverridePermissionsList =
  AssetBundleImportJobThemeOverridePermissions[];
export interface AssetBundleImportJobAnalysisOverridePermissions {
  AnalysisIds: string[];
  Permissions: AssetBundleResourcePermissions;
}
export type AssetBundleImportJobAnalysisOverridePermissionsList =
  AssetBundleImportJobAnalysisOverridePermissions[];
export interface AssetBundleResourceLinkSharingConfiguration {
  Permissions?: AssetBundleResourcePermissions;
}
export interface AssetBundleImportJobDashboardOverridePermissions {
  DashboardIds: string[];
  Permissions?: AssetBundleResourcePermissions;
  LinkSharingConfiguration?: AssetBundleResourceLinkSharingConfiguration;
}
export type AssetBundleImportJobDashboardOverridePermissionsList =
  AssetBundleImportJobDashboardOverridePermissions[];
export interface AssetBundleImportJobFolderOverridePermissions {
  FolderIds: string[];
  Permissions?: AssetBundleResourcePermissions;
}
export type AssetBundleImportJobFolderOverridePermissionsList =
  AssetBundleImportJobFolderOverridePermissions[];
export interface AssetBundleImportJobTopicV2OverridePermissions {
  TopicIds: string[];
  Permissions: AssetBundleResourcePermissions;
}
export type AssetBundleImportJobTopicV2OverridePermissionsList =
  AssetBundleImportJobTopicV2OverridePermissions[];
export interface AssetBundleImportJobOverridePermissions {
  DataSources?: AssetBundleImportJobDataSourceOverridePermissions[];
  DataSets?: AssetBundleImportJobDataSetOverridePermissions[];
  Themes?: AssetBundleImportJobThemeOverridePermissions[];
  Analyses?: AssetBundleImportJobAnalysisOverridePermissions[];
  Dashboards?: AssetBundleImportJobDashboardOverridePermissions[];
  Folders?: AssetBundleImportJobFolderOverridePermissions[];
  TopicsV2?: AssetBundleImportJobTopicV2OverridePermissions[];
}
export interface AssetBundleImportJobVPCConnectionOverrideTags {
  VPCConnectionIds: string[];
  Tags: Tag[];
}
export type AssetBundleImportJobVPCConnectionOverrideTagsList =
  AssetBundleImportJobVPCConnectionOverrideTags[];
export interface AssetBundleImportJobDataSourceOverrideTags {
  DataSourceIds: string[];
  Tags: Tag[];
}
export type AssetBundleImportJobDataSourceOverrideTagsList =
  AssetBundleImportJobDataSourceOverrideTags[];
export interface AssetBundleImportJobDataSetOverrideTags {
  DataSetIds: string[];
  Tags: Tag[];
}
export type AssetBundleImportJobDataSetOverrideTagsList =
  AssetBundleImportJobDataSetOverrideTags[];
export interface AssetBundleImportJobThemeOverrideTags {
  ThemeIds: string[];
  Tags: Tag[];
}
export type AssetBundleImportJobThemeOverrideTagsList =
  AssetBundleImportJobThemeOverrideTags[];
export interface AssetBundleImportJobAnalysisOverrideTags {
  AnalysisIds: string[];
  Tags: Tag[];
}
export type AssetBundleImportJobAnalysisOverrideTagsList =
  AssetBundleImportJobAnalysisOverrideTags[];
export interface AssetBundleImportJobDashboardOverrideTags {
  DashboardIds: string[];
  Tags: Tag[];
}
export type AssetBundleImportJobDashboardOverrideTagsList =
  AssetBundleImportJobDashboardOverrideTags[];
export interface AssetBundleImportJobFolderOverrideTags {
  FolderIds: string[];
  Tags: Tag[];
}
export type AssetBundleImportJobFolderOverrideTagsList =
  AssetBundleImportJobFolderOverrideTags[];
export interface AssetBundleImportJobTopicV2OverrideTags {
  TopicIds: string[];
  Tags: Tag[];
}
export type AssetBundleImportJobTopicV2OverrideTagsList =
  AssetBundleImportJobTopicV2OverrideTags[];
export interface AssetBundleImportJobOverrideTags {
  VPCConnections?: AssetBundleImportJobVPCConnectionOverrideTags[];
  DataSources?: AssetBundleImportJobDataSourceOverrideTags[];
  DataSets?: AssetBundleImportJobDataSetOverrideTags[];
  Themes?: AssetBundleImportJobThemeOverrideTags[];
  Analyses?: AssetBundleImportJobAnalysisOverrideTags[];
  Dashboards?: AssetBundleImportJobDashboardOverrideTags[];
  Folders?: AssetBundleImportJobFolderOverrideTags[];
  TopicsV2?: AssetBundleImportJobTopicV2OverrideTags[];
}
export interface AssetBundleImportJobOverrideValidationStrategy {
  StrictModeForAllResources?: boolean;
}
export interface AssetBundleImportJobWarning {
  Arn?: string;
  Message?: string;
}
export type AssetBundleImportJobWarningList = AssetBundleImportJobWarning[];
export interface DescribeAssetBundleImportJobResponse {
  JobStatus?: AssetBundleImportJobStatus;
  Errors?: AssetBundleImportJobError[];
  RollbackErrors?: AssetBundleImportJobError[];
  Arn?: string;
  CreatedTime?: Date;
  AssetBundleImportJobId?: string;
  AwsAccountId?: string;
  AssetBundleImportSource?: AssetBundleImportSourceDescription;
  OverrideParameters?: AssetBundleImportJobOverrideParameters;
  FailureAction?: AssetBundleImportFailureAction;
  RequestId?: string;
  Status?: number;
  OverridePermissions?: AssetBundleImportJobOverridePermissions;
  OverrideTags?: AssetBundleImportJobOverrideTags;
  OverrideValidationStrategy?: AssetBundleImportJobOverrideValidationStrategy;
  Warnings?: AssetBundleImportJobWarning[];
}
export type AutomateId = string;
export interface DescribeAutomationJobRequest {
  AwsAccountId: string;
  AutomationGroupId: string;
  AutomationId: string;
  IncludeInputPayload?: boolean;
  IncludeOutputPayload?: boolean;
  JobId: string;
}
export type AutomationJobStatus =
  | "FAILED"
  | "RUNNING"
  | "SUCCEEDED"
  | "QUEUED"
  | "STOPPED"
  | (string & {});
export type SensitiveIOPayload = string | redacted.Redacted<string>;
export interface DescribeAutomationJobResponse {
  Arn: string;
  CreatedAt?: Date;
  StartedAt?: Date;
  EndedAt?: Date;
  JobStatus: AutomationJobStatus;
  InputPayload?: string | redacted.Redacted<string>;
  OutputPayload?: string | redacted.Redacted<string>;
  RequestId?: string;
}
export interface DescribeBrandRequest {
  AwsAccountId: string;
  BrandId: string;
  VersionId?: string;
}
export interface DescribeBrandResponse {
  RequestId?: string;
  BrandDetail?: BrandDetail;
  BrandDefinition?: BrandDefinition;
}
export interface DescribeBrandAssignmentRequest {
  AwsAccountId: string;
}
export interface DescribeBrandAssignmentResponse {
  RequestId?: string;
  BrandArn?: string;
}
export interface DescribeBrandPublishedVersionRequest {
  AwsAccountId: string;
  BrandId: string;
}
export interface DescribeBrandPublishedVersionResponse {
  RequestId?: string;
  BrandDetail?: BrandDetail;
  BrandDefinition?: BrandDefinition;
}
export interface DescribeCustomPermissionsRequest {
  AwsAccountId: string;
  CustomPermissionsName: string;
}
export interface CustomPermissions {
  Arn?: string;
  CustomPermissionsName?: string;
  Capabilities?: Capabilities;
  Governance?: Governance;
}
export interface DescribeCustomPermissionsResponse {
  Status?: number;
  CustomPermissions?: CustomPermissions;
  RequestId?: string;
}
export interface DescribeDashboardRequest {
  AwsAccountId: string;
  DashboardId: string;
  VersionNumber?: number;
  AliasName?: string;
}
export type DashboardErrorType =
  | "ACCESS_DENIED"
  | "SOURCE_NOT_FOUND"
  | "DATA_SET_NOT_FOUND"
  | "INTERNAL_FAILURE"
  | "PARAMETER_VALUE_INCOMPATIBLE"
  | "PARAMETER_TYPE_INVALID"
  | "PARAMETER_NOT_FOUND"
  | "COLUMN_TYPE_MISMATCH"
  | "COLUMN_GEOGRAPHIC_ROLE_MISMATCH"
  | "COLUMN_REPLACEMENT_MISSING"
  | (string & {});
export interface DashboardError {
  Type?: DashboardErrorType;
  Message?: string;
  ViolatedEntities?: Entity[];
}
export type DashboardErrorList = DashboardError[];
export interface DashboardVersion {
  CreatedTime?: Date;
  Errors?: DashboardError[];
  VersionNumber?: number;
  Status?: ResourceStatus;
  Arn?: string;
  SourceEntityArn?: string;
  DataSetArns?: string[];
  TopicArns?: string[];
  Description?: string;
  ThemeArn?: string;
  Sheets?: Sheet[];
}
export interface Dashboard {
  DashboardId?: string;
  Arn?: string;
  Name?: string;
  Version?: DashboardVersion;
  CreatedTime?: Date;
  LastPublishedTime?: Date;
  LastUpdatedTime?: Date;
  LinkEntities?: string[];
}
export interface DescribeDashboardResponse {
  Dashboard?: Dashboard;
  Status?: number;
  RequestId?: string;
}
export interface DescribeDashboardDefinitionRequest {
  AwsAccountId: string;
  DashboardId: string;
  VersionNumber?: number;
  AliasName?: string;
}
export interface DescribeDashboardDefinitionResponse {
  DashboardId?: string;
  Errors?: DashboardError[];
  Name?: string;
  ResourceStatus?: ResourceStatus;
  ThemeArn?: string;
  Definition?: DashboardVersionDefinition;
  Status?: number;
  RequestId?: string;
  DashboardPublishOptions?: DashboardPublishOptions;
}
export interface DescribeDashboardPermissionsRequest {
  AwsAccountId: string;
  DashboardId: string;
}
export interface DescribeDashboardPermissionsResponse {
  DashboardId?: string;
  DashboardArn?: string;
  Permissions?: ResourcePermission[];
  Status?: number;
  RequestId?: string;
  LinkSharingConfiguration?: LinkSharingConfiguration;
}
export interface DescribeDashboardSnapshotJobRequest {
  AwsAccountId: string;
  DashboardId: string;
  SnapshotJobId: string;
}
export type SessionTagKeyList = string[];
export interface SnapshotAnonymousUserRedacted {
  RowLevelPermissionTagKeys?: string[];
}
export type SnapshotAnonymousUserRedactedList = SnapshotAnonymousUserRedacted[];
export interface SnapshotUserConfigurationRedacted {
  AnonymousUsers?: SnapshotAnonymousUserRedacted[];
}
export type SnapshotFileSheetSelectionScope =
  | "ALL_VISUALS"
  | "SELECTED_VISUALS"
  | (string & {});
export type SnapshotFileSheetSelectionVisualIdList = string[];
export interface SnapshotFileSheetSelection {
  SheetId: string;
  SelectionScope: SnapshotFileSheetSelectionScope;
  VisualIds?: string[];
}
export type SnapshotFileSheetSelectionList = SnapshotFileSheetSelection[];
export type SnapshotFileFormatType = "CSV" | "PDF" | "EXCEL" | (string & {});
export interface SnapshotFile {
  SheetSelections: SnapshotFileSheetSelection[];
  FormatType: SnapshotFileFormatType;
}
export type SnapshotFileList = SnapshotFile[];
export interface SnapshotFileGroup {
  Files?: SnapshotFile[];
}
export type SnapshotFileGroupList = SnapshotFileGroup[];
export interface S3BucketConfiguration {
  BucketName: string;
  BucketPrefix: string;
  BucketRegion: string;
}
export interface SnapshotS3DestinationConfiguration {
  BucketConfiguration: S3BucketConfiguration;
}
export type SnapshotS3DestinationConfigurationList =
  SnapshotS3DestinationConfiguration[];
export interface SnapshotDestinationConfiguration {
  S3Destinations?: SnapshotS3DestinationConfiguration[];
}
export interface SnapshotConfiguration {
  FileGroups: SnapshotFileGroup[];
  DestinationConfiguration?: SnapshotDestinationConfiguration;
  Parameters?: Parameters;
}
export type SnapshotJobStatus =
  | "QUEUED"
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export interface DescribeDashboardSnapshotJobResponse {
  AwsAccountId?: string;
  DashboardId?: string;
  SnapshotJobId?: string;
  UserConfiguration?: SnapshotUserConfigurationRedacted;
  SnapshotConfiguration?: SnapshotConfiguration;
  Arn?: string;
  JobStatus?: SnapshotJobStatus;
  CreatedTime?: Date;
  LastUpdatedTime?: Date;
  RequestId?: string;
  Status?: number;
}
export interface DescribeDashboardSnapshotJobResultRequest {
  AwsAccountId: string;
  DashboardId: string;
  SnapshotJobId: string;
}
export interface SnapshotJobResultErrorInfo {
  ErrorMessage?: string;
  ErrorType?: string;
}
export type SnapshotJobResultErrorInfoList = SnapshotJobResultErrorInfo[];
export interface SnapshotJobS3Result {
  S3DestinationConfiguration?: SnapshotS3DestinationConfiguration;
  S3Uri?: string | redacted.Redacted<string>;
  ErrorInfo?: SnapshotJobResultErrorInfo[];
}
export type SnapshotJobS3ResultList = SnapshotJobS3Result[];
export interface SnapshotJobResultFileGroup {
  Files?: SnapshotFile[];
  S3Results?: SnapshotJobS3Result[];
}
export type SnapshotJobResultFileGroupList = SnapshotJobResultFileGroup[];
export interface AnonymousUserSnapshotJobResult {
  FileGroups?: SnapshotJobResultFileGroup[];
}
export type AnonymousUserSnapshotJobResultList =
  AnonymousUserSnapshotJobResult[];
export interface RegisteredUserSnapshotJobResult {
  FileGroups?: SnapshotJobResultFileGroup[];
}
export type RegisteredUserSnapshotJobResultList =
  RegisteredUserSnapshotJobResult[];
export interface SnapshotJobResult {
  AnonymousUsers?: AnonymousUserSnapshotJobResult[];
  RegisteredUsers?: RegisteredUserSnapshotJobResult[];
}
export interface SnapshotJobErrorInfo {
  ErrorMessage?: string;
  ErrorType?: string;
}
export interface DescribeDashboardSnapshotJobResultResponse {
  Arn?: string;
  JobStatus?: SnapshotJobStatus;
  CreatedTime?: Date;
  LastUpdatedTime?: Date;
  Result?: SnapshotJobResult;
  ErrorInfo?: SnapshotJobErrorInfo;
  RequestId?: string;
  Status?: number;
}
export interface DescribeDashboardsQAConfigurationRequest {
  AwsAccountId: string;
}
export type DashboardsQAStatus = "ENABLED" | "DISABLED" | (string & {});
export interface DescribeDashboardsQAConfigurationResponse {
  DashboardsQAStatus?: DashboardsQAStatus;
  RequestId?: string;
  Status?: number;
}
export interface DescribeDataSetRequest {
  AwsAccountId: string;
  DataSetId: string;
}
export interface OutputColumn {
  Name?: string;
  Id?: string;
  Description?: string | redacted.Redacted<string>;
  Type?: ColumnDataType;
  SubType?: ColumnDataSubType;
}
export type OutputColumnList = OutputColumn[];
export interface DataSet {
  Arn?: string;
  DataSetId?: string;
  Name?: string;
  CreatedTime?: Date;
  LastUpdatedTime?: Date;
  PhysicalTableMap?: { [key: string]: PhysicalTable | undefined };
  LogicalTableMap?: { [key: string]: LogicalTable | undefined };
  OutputColumns?: OutputColumn[];
  ImportMode?: DataSetImportMode;
  ConsumedSpiceCapacityInBytes?: number;
  ColumnGroups?: ColumnGroup[];
  FieldFolders?: { [key: string]: FieldFolder | undefined };
  RowLevelPermissionDataSet?: RowLevelPermissionDataSet;
  RowLevelPermissionTagConfiguration?: RowLevelPermissionTagConfiguration;
  ColumnLevelPermissionRules?: ColumnLevelPermissionRule[];
  DataSetUsageConfiguration?: DataSetUsageConfiguration;
  DatasetParameters?: DatasetParameter[];
  PerformanceConfiguration?: PerformanceConfiguration;
  UseAs?: DataSetUseAs;
  DataPrepConfiguration?: DataPrepConfiguration;
  SemanticModelConfiguration?: SemanticModelConfiguration;
}
export interface DescribeDataSetResponse {
  DataSet?: DataSet;
  RequestId?: string;
  Status?: number;
}
export interface DescribeDataSetPermissionsRequest {
  AwsAccountId: string;
  DataSetId: string;
}
export interface DescribeDataSetPermissionsResponse {
  DataSetArn?: string;
  DataSetId?: string;
  Permissions?: ResourcePermission[];
  RequestId?: string;
  Status?: number;
}
export interface DescribeDataSetRefreshPropertiesRequest {
  AwsAccountId: string;
  DataSetId: string;
}
export interface DescribeDataSetRefreshPropertiesResponse {
  RequestId?: string;
  Status?: number;
  DataSetRefreshProperties?: DataSetRefreshProperties;
}
export interface DescribeDataSourceRequest {
  AwsAccountId: string;
  DataSourceId: string;
}
export type DataSourceErrorInfoType =
  | "ACCESS_DENIED"
  | "COPY_SOURCE_NOT_FOUND"
  | "TIMEOUT"
  | "ENGINE_VERSION_NOT_SUPPORTED"
  | "UNKNOWN_HOST"
  | "GENERIC_SQL_FAILURE"
  | "CONFLICT"
  | "UNKNOWN"
  | (string & {});
export interface DataSourceErrorInfo {
  Type?: DataSourceErrorInfoType;
  Message?: string;
}
export type CredentialStatus =
  | "CONNECTED"
  | "AUTH_FAILED"
  | "NOT_VERIFIED"
  | (string & {});
export interface DataSource {
  Arn: string;
  DataSourceId: string;
  Name: string;
  Type: DataSourceType;
  Status: ResourceStatus;
  CreatedTime?: Date;
  LastUpdatedTime?: Date;
  DataSourceParameters?: DataSourceParameters;
  AlternateDataSourceParameters?: DataSourceParameters[];
  VpcConnectionProperties?: VpcConnectionProperties;
  SslProperties?: SslProperties;
  ErrorInfo?: DataSourceErrorInfo;
  SecretArn?: string;
  CredentialStatus?: CredentialStatus;
  LastCredentialVerifiedAt?: Date;
}
export interface DescribeDataSourceResponse {
  DataSource?: DataSource;
  RequestId?: string;
  Status?: number;
}
export interface DescribeDataSourcePermissionsRequest {
  AwsAccountId: string;
  DataSourceId: string;
}
export interface DescribeDataSourcePermissionsResponse {
  DataSourceArn?: string;
  DataSourceId?: string;
  Permissions?: ResourcePermission[];
  RequestId?: string;
  Status?: number;
}
export interface DescribeDefaultQBusinessApplicationRequest {
  AwsAccountId: string;
  Namespace?: string;
}
export interface DescribeDefaultQBusinessApplicationResponse {
  RequestId?: string;
  Status?: number;
  ApplicationId?: string;
}
export interface DescribeDlpSettingRequest {
  AwsAccountId: string;
  DlpSettingId: string;
}
export type DlpSettingStatus = "ACTIVE" | "INACTIVE" | (string & {});
export interface DlpSettingDetails {
  DlpSettingId: string;
  Name: string;
  Arn: string;
  Status: DlpSettingStatus;
  ProviderType: DlpProviderType;
  ProviderConfig: ProviderConfig;
  ProviderOutageAction: DlpAction;
  CreatedAt: Date;
  UpdatedAt: Date;
}
export interface DescribeDlpSettingResponse {
  DlpSetting: DlpSettingDetails;
  RequestId?: string;
}
export type FlowPublishState =
  | "PUBLISHED"
  | "DRAFT"
  | "PENDING_APPROVAL"
  | (string & {});
export interface DescribeFlowRequest {
  AwsAccountId: string;
  FlowId: string;
  PublishState: FlowPublishState;
}
export type Title = string;
export type FlowDescription = string;
export type StepId = string;
export interface StepAliasMapping {
  StepId: string;
  StepAlias: string;
}
export type StepAliasList = StepAliasMapping[];
export interface FlowDetail {
  Arn: string;
  FlowId: string;
  Name: string;
  Description?: string;
  PublishState: FlowPublishState;
  CreatedTime: Date;
  CreatedBy?: string;
  LastUpdatedTime?: Date;
  LastUpdatedBy?: string;
  FlowDefinition: any;
  StepAliases?: StepAliasMapping[];
}
export interface DescribeFlowResponse {
  Flow: FlowDetail;
  RequestId?: string;
  Status?: number;
}
export interface DescribeFolderRequest {
  AwsAccountId: string;
  FolderId: string;
}
export type Path = string[];
export interface Folder {
  FolderId?: string;
  Arn?: string;
  Name?: string;
  FolderType?: FolderType;
  FolderPath?: string[];
  CreatedTime?: Date;
  LastUpdatedTime?: Date;
  SharingModel?: SharingModel;
}
export interface DescribeFolderResponse {
  Status?: number;
  Folder?: Folder;
  RequestId?: string;
}
export type MaxResults = number;
export interface DescribeFolderPermissionsRequest {
  AwsAccountId: string;
  FolderId: string;
  Namespace?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface DescribeFolderPermissionsResponse {
  Status?: number;
  FolderId?: string;
  Arn?: string;
  Permissions?: ResourcePermission[];
  RequestId?: string;
  NextToken?: string;
}
export interface DescribeFolderResolvedPermissionsRequest {
  AwsAccountId: string;
  FolderId: string;
  Namespace?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface DescribeFolderResolvedPermissionsResponse {
  Status?: number;
  FolderId?: string;
  Arn?: string;
  Permissions?: ResourcePermission[];
  RequestId?: string;
  NextToken?: string;
}
export interface DescribeGroupRequest {
  GroupName: string;
  AwsAccountId: string;
  Namespace: string;
}
export interface DescribeGroupResponse {
  Group?: Group;
  RequestId?: string;
  Status?: number;
}
export interface DescribeGroupMembershipRequest {
  MemberName: string;
  GroupName: string;
  AwsAccountId: string;
  Namespace: string;
}
export interface DescribeGroupMembershipResponse {
  GroupMember?: GroupMember;
  RequestId?: string;
  Status?: number;
}
export interface DescribeIAMPolicyAssignmentRequest {
  AwsAccountId: string;
  AssignmentName: string;
  Namespace: string;
}
export interface IAMPolicyAssignment {
  AwsAccountId?: string;
  AssignmentId?: string;
  AssignmentName?: string;
  PolicyArn?: string;
  Identities?: { [key: string]: string[] | undefined };
  AssignmentStatus?: AssignmentStatus;
}
export interface DescribeIAMPolicyAssignmentResponse {
  IAMPolicyAssignment?: IAMPolicyAssignment;
  RequestId?: string;
  Status?: number;
}
export interface DescribeIngestionRequest {
  AwsAccountId: string;
  DataSetId: string;
  IngestionId: string;
}
export type IngestionErrorType =
  | "FAILURE_TO_ASSUME_ROLE"
  | "INGESTION_SUPERSEDED"
  | "INGESTION_CANCELED"
  | "DATA_SET_DELETED"
  | "DATA_SET_NOT_SPICE"
  | "S3_UPLOADED_FILE_DELETED"
  | "S3_MANIFEST_ERROR"
  | "DATA_TOLERANCE_EXCEPTION"
  | "SPICE_TABLE_NOT_FOUND"
  | "DATA_SET_SIZE_LIMIT_EXCEEDED"
  | "ROW_SIZE_LIMIT_EXCEEDED"
  | "ACCOUNT_CAPACITY_LIMIT_EXCEEDED"
  | "CUSTOMER_ERROR"
  | "DATA_SOURCE_NOT_FOUND"
  | "IAM_ROLE_NOT_AVAILABLE"
  | "CONNECTION_FAILURE"
  | "SQL_TABLE_NOT_FOUND"
  | "PERMISSION_DENIED"
  | "SSL_CERTIFICATE_VALIDATION_FAILURE"
  | "OAUTH_TOKEN_FAILURE"
  | "SOURCE_API_LIMIT_EXCEEDED_FAILURE"
  | "PASSWORD_AUTHENTICATION_FAILURE"
  | "SQL_SCHEMA_MISMATCH_ERROR"
  | "INVALID_DATE_FORMAT"
  | "INVALID_DATAPREP_SYNTAX"
  | "SOURCE_RESOURCE_LIMIT_EXCEEDED"
  | "SQL_INVALID_PARAMETER_VALUE"
  | "QUERY_TIMEOUT"
  | "SQL_NUMERIC_OVERFLOW"
  | "UNRESOLVABLE_HOST"
  | "UNROUTABLE_HOST"
  | "SQL_EXCEPTION"
  | "S3_FILE_INACCESSIBLE"
  | "IOT_FILE_NOT_FOUND"
  | "IOT_DATA_SET_FILE_EMPTY"
  | "INVALID_DATA_SOURCE_CONFIG"
  | "DATA_SOURCE_AUTH_FAILED"
  | "DATA_SOURCE_CONNECTION_FAILED"
  | "FAILURE_TO_PROCESS_JSON_FILE"
  | "INTERNAL_SERVICE_ERROR"
  | "REFRESH_SUPPRESSED_BY_EDIT"
  | "PERMISSION_NOT_FOUND"
  | "ELASTICSEARCH_CURSOR_NOT_ENABLED"
  | "CURSOR_NOT_ENABLED"
  | "DUPLICATE_COLUMN_NAMES_FOUND"
  | (string & {});
export interface ErrorInfo {
  Type?: IngestionErrorType;
  Message?: string;
}
export interface RowInfo {
  RowsIngested?: number;
  RowsDropped?: number;
  TotalRowsInDataset?: number;
}
export interface QueueInfo {
  WaitingOnIngestion: string;
  QueuedIngestion: string;
}
export type IngestionRequestSource = "MANUAL" | "SCHEDULED" | (string & {});
export type IngestionRequestType =
  | "INITIAL_INGESTION"
  | "EDIT"
  | "INCREMENTAL_REFRESH"
  | "FULL_REFRESH"
  | (string & {});
export interface Ingestion {
  Arn: string;
  IngestionId?: string;
  IngestionStatus: IngestionStatus;
  ErrorInfo?: ErrorInfo;
  RowInfo?: RowInfo;
  QueueInfo?: QueueInfo;
  CreatedTime: Date;
  IngestionTimeInSeconds?: number;
  IngestionSizeInBytes?: number;
  RequestSource?: IngestionRequestSource;
  RequestType?: IngestionRequestType;
}
export interface DescribeIngestionResponse {
  Ingestion?: Ingestion;
  RequestId?: string;
  Status?: number;
}
export interface DescribeIpRestrictionRequest {
  AwsAccountId: string;
}
export type CIDR = string;
export type IpRestrictionRuleDescription = string;
export type IpRestrictionRuleMap = { [key: string]: string | undefined };
export type VpcId = string;
export type VpcIdRestrictionRuleDescription = string;
export type VpcIdRestrictionRuleMap = { [key: string]: string | undefined };
export type VpcEndpointId = string;
export type VpcEndpointIdRestrictionRuleDescription = string;
export type VpcEndpointIdRestrictionRuleMap = {
  [key: string]: string | undefined;
};
export interface DescribeIpRestrictionResponse {
  AwsAccountId?: string;
  IpRestrictionRuleMap?: { [key: string]: string | undefined };
  VpcIdRestrictionRuleMap?: { [key: string]: string | undefined };
  VpcEndpointIdRestrictionRuleMap?: { [key: string]: string | undefined };
  Enabled?: boolean;
  RequestId?: string;
  Status?: number;
}
export interface DescribeKeyRegistrationRequest {
  AwsAccountId: string;
  DefaultKeyOnly?: boolean;
}
export interface RegisteredCustomerManagedKey {
  KeyArn?: string;
  DefaultKey?: boolean;
}
export type KeyRegistration = RegisteredCustomerManagedKey[];
export type QDataKeyType = "AWS_OWNED" | "CMK" | (string & {});
export interface QDataKey {
  QDataKeyArn?: string;
  QDataKeyType?: QDataKeyType;
}
export interface DescribeKeyRegistrationResponse {
  AwsAccountId?: string;
  KeyRegistration?: RegisteredCustomerManagedKey[];
  QDataKey?: QDataKey;
  RequestId?: string;
  Status?: number;
}
export interface DescribeKnowledgeBaseRequest {
  AwsAccountId: string;
  KnowledgeBaseId: string;
}
export type KbIngestionId = string;
export type KbIngestionStatus =
  | "QUEUED"
  | "RUNNING"
  | "FAILED"
  | "COMPLETED"
  | "INCOMPLETE"
  | "CANCELLED"
  | "CANCELLING"
  | "TIMEOUT"
  | (string & {});
export interface KnowledgeBaseIngestionSummary {
  IngestionId: string;
  IngestionStatus: KbIngestionStatus;
  StartTime?: Date;
  EndTime?: Date;
}
export interface KnowledgeBase {
  KnowledgeBaseArn: string;
  KnowledgeBaseId: string;
  Name: string;
  Status: DataSetStatus;
  DataSourceArn: string;
  KnowledgeBaseConfiguration: KnowledgeBaseConfiguration;
  MediaExtractionConfiguration?: MediaExtractionConfiguration;
  AccessControlConfiguration?: AccessControlConfiguration;
  Type?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  Description?: string;
  IsEmailNotificationOptedForIngestionFailures?: boolean;
  FirstCompletedIngestionSummary?: KnowledgeBaseIngestionSummary;
  FirstIncompleteIngestionSummary?: KnowledgeBaseIngestionSummary;
  LatestIngestionSummary?: KnowledgeBaseIngestionSummary;
  KnowledgeBaseSizeBytes?: number;
  DocumentCount?: number;
  PrimaryOwnerArn?: string;
  PrimaryOwnerUsername?: string | redacted.Redacted<string>;
}
export interface DescribeKnowledgeBaseResponse {
  KnowledgeBase: KnowledgeBase;
  RequestId?: string;
  Status?: number;
}
export interface DescribeKnowledgeBasePermissionsRequest {
  AwsAccountId: string;
  KnowledgeBaseId: string;
}
export interface DescribeKnowledgeBasePermissionsResponse {
  KnowledgeBaseArn: string;
  KnowledgeBaseId: string;
  Permissions?: ResourcePermission[];
  RequestId?: string;
  Status?: number;
}
export interface DescribeLimitsProfileRequest {
  profileId: string;
  accountId: string;
}
export type ResourceLimitsMap = { [key in ResourceType]?: ProfileLimitValue };
export interface LimitsProfile {
  profileId: string;
  arn: string;
  accountId: string;
  profileName: string;
  description?: string;
  resourceLimits: { [key: string]: ProfileLimitValue | undefined };
  createdAt: Date;
  updatedAt: Date;
}
export interface DescribeLimitsProfileResponse {
  profile: LimitsProfile;
}
export interface DescribeNamespaceRequest {
  AwsAccountId: string;
  Namespace: string;
}
export type NamespaceErrorType =
  | "PERMISSION_DENIED"
  | "INTERNAL_SERVICE_ERROR"
  | (string & {});
export interface NamespaceError {
  Type?: NamespaceErrorType;
  Message?: string;
}
export interface NamespaceInfoV2 {
  Name?: string;
  Arn?: string;
  CapacityRegion?: string;
  CreationStatus?: NamespaceStatus;
  IdentityStore?: IdentityStore;
  NamespaceError?: NamespaceError;
  IamIdentityCenterApplicationArn?: string;
  IamIdentityCenterInstanceArn?: string;
}
export interface DescribeNamespaceResponse {
  Namespace?: NamespaceInfoV2;
  RequestId?: string;
  Status?: number;
}
export interface DescribeOAuthClientApplicationRequest {
  AwsAccountId: string;
  OAuthClientApplicationId: string;
}
export interface OAuthClientApplication {
  OAuthClientApplicationId?: string;
  Name?: string;
  OAuthClientAuthenticationType?: OAuthClientAuthenticationType;
  OAuthTokenEndpointUrl?: string | redacted.Redacted<string>;
  OAuthAuthorizationEndpointUrl?: string | redacted.Redacted<string>;
  OAuthScopes?: string;
  DataSourceType?: DataSourceType;
  IdentityProviderVpcConnectionProperties?: VpcConnectionProperties;
  CreatedTime?: Date;
  LastUpdatedTime?: Date;
  Arn?: string;
}
export interface DescribeOAuthClientApplicationResponse {
  OAuthClientApplication?: OAuthClientApplication;
  RequestId?: string;
  Status?: number;
}
export interface DescribeQPersonalizationConfigurationRequest {
  AwsAccountId: string;
}
export type PersonalizationMode = "ENABLED" | "DISABLED" | (string & {});
export interface DescribeQPersonalizationConfigurationResponse {
  PersonalizationMode?: PersonalizationMode;
  RequestId?: string;
  Status?: number;
}
export interface DescribeQuickSightQSearchConfigurationRequest {
  AwsAccountId: string;
}
export type QSearchStatus = "ENABLED" | "DISABLED" | (string & {});
export interface DescribeQuickSightQSearchConfigurationResponse {
  QSearchStatus?: QSearchStatus;
  RequestId?: string;
  Status?: number;
}
export interface DescribeRefreshScheduleRequest {
  AwsAccountId: string;
  DataSetId: string;
  ScheduleId: string;
}
export interface DescribeRefreshScheduleResponse {
  RefreshSchedule?: RefreshSchedule;
  Status?: number;
  RequestId?: string;
  Arn?: string;
}
export interface DescribeRoleCustomPermissionRequest {
  Role: Role;
  AwsAccountId: string;
  Namespace: string;
}
export type RoleName = string;
export interface DescribeRoleCustomPermissionResponse {
  CustomPermissionsName?: string;
  RequestId?: string;
  Status?: number;
}
export interface DescribeSelfUpgradeConfigurationRequest {
  AwsAccountId: string;
  Namespace: string;
}
export type SelfUpgradeStatus =
  | "AUTO_APPROVAL"
  | "ADMIN_APPROVAL"
  | (string & {});
export interface SelfUpgradeConfiguration {
  SelfUpgradeStatus?: SelfUpgradeStatus;
}
export interface DescribeSelfUpgradeConfigurationResponse {
  SelfUpgradeConfiguration?: SelfUpgradeConfiguration;
  RequestId?: string;
  Status?: number;
}
export type MaxContributors = number;
export interface DescribeSpaceRequest {
  AwsAccountId: string;
  SpaceId: string;
  MaxContributors?: number;
}
export type SpaceQuickSightResourceType =
  | "TOPIC"
  | "DASHBOARD"
  | "KNOWLEDGE_BASE"
  | "ACTION_CONNECTOR"
  | "DATA_SET"
  | (string & {});
export type SpaceQuickSightResourceDetails = { resourceArn: string };
export interface SpaceQuickSightResource {
  resourceType: SpaceQuickSightResourceType;
  resourceDetails: SpaceQuickSightResourceDetails;
}
export type SpaceQuickSightResources = SpaceQuickSightResource[];
export interface SpaceDetails {
  name?: string;
  description?: string | redacted.Redacted<string>;
  resources?: SpaceQuickSightResource[];
  createdAt?: Date;
  updatedAt?: Date;
  consumedSourceSize?: number;
  consumedSourceDocCount?: number;
  createdBy?: string;
  createdByArn?: string;
}
export interface SpaceContributor {
  userName?: string;
  rawFileSizeBytes: number;
  percentage?: number;
}
export type SpaceContributorList = SpaceContributor[];
export interface DescribeSpaceResponse {
  spaceId: string;
  spaceArn?: string;
  Space: SpaceDetails;
  Contributors?: SpaceContributor[];
  RequestId?: string;
}
export interface DescribeSpacePermissionsRequest {
  AwsAccountId: string;
  SpaceId: string;
}
export interface DescribeSpacePermissionsResponse {
  spaceId: string;
  spaceArn?: string;
  Permissions?: ResourcePermission[];
  RequestId?: string;
}
export interface DescribeTemplateRequest {
  AwsAccountId: string;
  TemplateId: string;
  VersionNumber?: number;
  AliasName?: string;
}
export type TemplateErrorType =
  | "SOURCE_NOT_FOUND"
  | "DATA_SET_NOT_FOUND"
  | "INTERNAL_FAILURE"
  | "ACCESS_DENIED"
  | (string & {});
export interface TemplateError {
  Type?: TemplateErrorType;
  Message?: string;
  ViolatedEntities?: Entity[];
}
export type TemplateErrorList = TemplateError[];
export interface TemplateVersion {
  CreatedTime?: Date;
  Errors?: TemplateError[];
  VersionNumber?: number;
  Status?: ResourceStatus;
  DataSetConfigurations?: DataSetConfiguration[];
  TopicConfigurations?: TopicConfiguration[];
  Description?: string;
  SourceEntityArn?: string;
  ThemeArn?: string;
  Sheets?: Sheet[];
}
export interface Template {
  Arn?: string;
  Name?: string;
  Version?: TemplateVersion;
  TemplateId?: string;
  LastUpdatedTime?: Date;
  CreatedTime?: Date;
}
export interface DescribeTemplateResponse {
  Template?: Template;
  Status?: number;
  RequestId?: string;
}
export interface DescribeTemplateAliasRequest {
  AwsAccountId: string;
  TemplateId: string;
  AliasName: string;
}
export interface DescribeTemplateAliasResponse {
  TemplateAlias?: TemplateAlias;
  Status?: number;
  RequestId?: string;
}
export interface DescribeTemplateDefinitionRequest {
  AwsAccountId: string;
  TemplateId: string;
  VersionNumber?: number;
  AliasName?: string;
}
export interface DescribeTemplateDefinitionResponse {
  Name?: string;
  TemplateId?: string;
  Errors?: TemplateError[];
  ResourceStatus?: ResourceStatus;
  ThemeArn?: string;
  Definition?: TemplateVersionDefinition;
  Status?: number;
  RequestId?: string;
}
export interface DescribeTemplatePermissionsRequest {
  AwsAccountId: string;
  TemplateId: string;
}
export interface DescribeTemplatePermissionsResponse {
  TemplateId?: string;
  TemplateArn?: string;
  Permissions?: ResourcePermission[];
  RequestId?: string;
  Status?: number;
}
export type AwsAndAccountId = string;
export interface DescribeThemeRequest {
  AwsAccountId: string;
  ThemeId: string;
  VersionNumber?: number;
  AliasName?: string;
}
export type ThemeErrorType = "INTERNAL_FAILURE" | (string & {});
export interface ThemeError {
  Type?: ThemeErrorType;
  Message?: string;
}
export type ThemeErrorList = ThemeError[];
export interface ThemeVersion {
  VersionNumber?: number;
  Arn?: string;
  Description?: string;
  BaseThemeId?: string;
  CreatedTime?: Date;
  Configuration?: ThemeConfiguration;
  Errors?: ThemeError[];
  Status?: ResourceStatus;
}
export type ThemeType = "QUICKSIGHT" | "CUSTOM" | "ALL" | (string & {});
export interface Theme {
  Arn?: string;
  Name?: string;
  ThemeId?: string;
  Version?: ThemeVersion;
  CreatedTime?: Date;
  LastUpdatedTime?: Date;
  Type?: ThemeType;
}
export interface DescribeThemeResponse {
  Theme?: Theme;
  Status?: number;
  RequestId?: string;
}
export interface DescribeThemeAliasRequest {
  AwsAccountId: string;
  ThemeId: string;
  AliasName: string;
}
export interface DescribeThemeAliasResponse {
  ThemeAlias?: ThemeAlias;
  Status?: number;
  RequestId?: string;
}
export interface DescribeThemePermissionsRequest {
  AwsAccountId: string;
  ThemeId: string;
}
export interface DescribeThemePermissionsResponse {
  ThemeId?: string;
  ThemeArn?: string;
  Permissions?: ResourcePermission[];
  RequestId?: string;
  Status?: number;
}
export interface DescribeTopicRequest {
  AwsAccountId: string;
  TopicId: string;
}
export interface DescribeTopicResponse {
  Arn?: string;
  TopicId?: string;
  Topic?: TopicDetails;
  RequestId?: string;
  Status?: number;
  CustomInstructions?: CustomInstructions;
}
export interface DescribeTopicPermissionsRequest {
  AwsAccountId: string;
  TopicId: string;
}
export interface DescribeTopicPermissionsResponse {
  TopicId?: string;
  TopicArn?: string;
  Permissions?: ResourcePermission[];
  Status?: number;
  RequestId?: string;
}
export interface DescribeTopicPermissionsV2Request {
  AwsAccountId: string;
  TopicId: string;
}
export interface DescribeTopicPermissionsV2Response {
  TopicId?: string;
  TopicArn?: string;
  Permissions?: ResourcePermission[];
  Status?: number;
  RequestId?: string;
}
export interface DescribeTopicRefreshRequest {
  AwsAccountId: string;
  TopicId: string;
  RefreshId: string;
}
export type TopicRefreshStatus =
  | "INITIALIZED"
  | "RUNNING"
  | "FAILED"
  | "COMPLETED"
  | "CANCELLED"
  | (string & {});
export interface TopicRefreshDetails {
  RefreshArn?: string;
  RefreshId?: string;
  RefreshStatus?: TopicRefreshStatus;
}
export interface DescribeTopicRefreshResponse {
  RefreshDetails?: TopicRefreshDetails;
  RequestId?: string;
  Status?: number;
}
export interface DescribeTopicRefreshScheduleRequest {
  AwsAccountId: string;
  TopicId: string;
  DatasetId: string;
}
export interface DescribeTopicRefreshScheduleResponse {
  TopicId?: string;
  TopicArn?: string;
  DatasetArn?: string;
  RefreshSchedule?: TopicRefreshSchedule;
  Status?: number;
  RequestId?: string;
}
export interface DescribeTopicV2Request {
  AwsAccountId: string;
  TopicId: string;
}
export interface DescribeTopicV2Response {
  Arn?: string;
  TopicId?: string;
  Topic?: TopicV2Details;
  CustomInstructions?: CustomInstructions;
  Status?: number;
  RequestId?: string;
}
export interface DescribeUserRequest {
  UserName: string;
  AwsAccountId: string;
  Namespace: string;
}
export type UserRole =
  | "ADMIN"
  | "AUTHOR"
  | "READER"
  | "RESTRICTED_AUTHOR"
  | "RESTRICTED_READER"
  | "ADMIN_PRO"
  | "AUTHOR_PRO"
  | "READER_PRO"
  | (string & {});
export type IdentityType =
  | "IAM"
  | "QUICKSIGHT"
  | "IAM_IDENTITY_CENTER"
  | (string & {});
export interface User {
  Arn?: string;
  UserName?: string;
  Email?: string;
  Role?: UserRole;
  IdentityType?: IdentityType;
  Active?: boolean;
  PrincipalId?: string;
  CustomPermissionsName?: string;
  ExternalLoginFederationProviderType?: string;
  ExternalLoginFederationProviderUrl?: string;
  ExternalLoginId?: string;
}
export interface DescribeUserResponse {
  User?: User;
  RequestId?: string;
  Status?: number;
}
export interface DescribeVPCConnectionRequest {
  AwsAccountId: string;
  VPCConnectionId: string;
}
export type NetworkInterfaceStatus =
  | "CREATING"
  | "AVAILABLE"
  | "CREATION_FAILED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "DELETING"
  | "DELETED"
  | "DELETION_FAILED"
  | "DELETION_SCHEDULED"
  | "ATTACHMENT_FAILED_ROLLBACK_FAILED"
  | (string & {});
export type NetworkInterfaceId = string;
export interface NetworkInterface {
  SubnetId?: string;
  AvailabilityZone?: string;
  ErrorMessage?: string;
  Status?: NetworkInterfaceStatus;
  NetworkInterfaceId?: string;
}
export type NetworkInterfaceList = NetworkInterface[];
export interface VPCConnection {
  VPCConnectionId?: string;
  Arn?: string;
  Name?: string;
  VPCId?: string;
  SecurityGroupIds?: string[];
  DnsResolvers?: string[];
  Status?: VPCConnectionResourceStatus;
  AvailabilityStatus?: VPCConnectionAvailabilityStatus;
  NetworkInterfaces?: NetworkInterface[];
  RoleArn?: string;
  CreatedTime?: Date;
  LastUpdatedTime?: Date;
}
export interface DescribeVPCConnectionResponse {
  VPCConnection?: VPCConnection;
  RequestId?: string;
  Status?: number;
}
export type SessionLifetimeInMinutes = number;
export interface SessionTag {
  Key: string;
  Value: string | redacted.Redacted<string>;
}
export type SessionTagList = SessionTag[];
export type ArnList = string[];
export type AnonymousUserDashboardEmbeddingConfigurationEnabledFeature =
  | "SHARED_VIEW"
  | (string & {});
export type AnonymousUserDashboardEmbeddingConfigurationEnabledFeatures =
  AnonymousUserDashboardEmbeddingConfigurationEnabledFeature[];
export type AnonymousUserDashboardEmbeddingConfigurationDisabledFeature =
  | "SHARED_VIEW"
  | (string & {});
export type AnonymousUserDashboardEmbeddingConfigurationDisabledFeatures =
  AnonymousUserDashboardEmbeddingConfigurationDisabledFeature[];
export interface SharedViewConfigurations {
  Enabled: boolean;
}
export interface AnonymousUserDashboardFeatureConfigurations {
  SharedView?: SharedViewConfigurations;
}
export interface AnonymousUserDashboardEmbeddingConfiguration {
  InitialDashboardId: string;
  EnabledFeatures?: AnonymousUserDashboardEmbeddingConfigurationEnabledFeature[];
  DisabledFeatures?: AnonymousUserDashboardEmbeddingConfigurationDisabledFeature[];
  FeatureConfigurations?: AnonymousUserDashboardFeatureConfigurations;
}
export interface DashboardVisualId {
  DashboardId: string;
  SheetId: string;
  VisualId: string;
}
export interface AnonymousUserDashboardVisualEmbeddingConfiguration {
  InitialDashboardVisualId: DashboardVisualId;
}
export interface AnonymousUserQSearchBarEmbeddingConfiguration {
  InitialTopicId: string;
}
export interface AnonymousUserGenerativeQnAEmbeddingConfiguration {
  InitialTopicId: string;
}
export interface AnonymousUserEmbeddingExperienceConfiguration {
  Dashboard?: AnonymousUserDashboardEmbeddingConfiguration;
  DashboardVisual?: AnonymousUserDashboardVisualEmbeddingConfiguration;
  QSearchBar?: AnonymousUserQSearchBarEmbeddingConfiguration;
  GenerativeQnA?: AnonymousUserGenerativeQnAEmbeddingConfiguration;
}
export interface GenerateEmbedUrlForAnonymousUserRequest {
  AwsAccountId: string;
  SessionLifetimeInMinutes?: number;
  Namespace: string;
  SessionTags?: SessionTag[];
  AuthorizedResourceArns: string[];
  ExperienceConfiguration: AnonymousUserEmbeddingExperienceConfiguration;
  AllowedDomains?: string[];
}
export type EmbeddingUrl = string | redacted.Redacted<string>;
export interface GenerateEmbedUrlForAnonymousUserResponse {
  EmbedUrl: string | redacted.Redacted<string>;
  Status: number;
  RequestId: string;
  AnonymousUserArn: string;
}
export interface StatePersistenceConfigurations {
  Enabled: boolean;
}
export interface BookmarksConfigurations {
  Enabled: boolean;
}
export interface ExecutiveSummaryConfigurations {
  Enabled: boolean;
}
export interface AmazonQInQuickSightDashboardConfigurations {
  ExecutiveSummary?: ExecutiveSummaryConfigurations;
}
export interface SchedulesConfigurations {
  Enabled: boolean;
}
export interface RecentSnapshotsConfigurations {
  Enabled: boolean;
}
export interface ThresholdAlertsConfigurations {
  Enabled: boolean;
}
export interface DashboardCustomizationSummaryConfigurations {
  Enabled: boolean;
}
export interface RegisteredUserDashboardFeatureConfigurations {
  StatePersistence?: StatePersistenceConfigurations;
  Bookmarks?: BookmarksConfigurations;
  SharedView?: SharedViewConfigurations;
  AmazonQInQuickSight?: AmazonQInQuickSightDashboardConfigurations;
  Schedules?: SchedulesConfigurations;
  RecentSnapshots?: RecentSnapshotsConfigurations;
  ThresholdAlerts?: ThresholdAlertsConfigurations;
  DashboardCustomizationSummary?: DashboardCustomizationSummaryConfigurations;
}
export interface RegisteredUserDashboardEmbeddingConfiguration {
  InitialDashboardId: string;
  FeatureConfigurations?: RegisteredUserDashboardFeatureConfigurations;
}
export type EntryPath = string;
export interface DataQnAConfigurations {
  Enabled: boolean;
}
export interface GenerativeAuthoringConfigurations {
  Enabled: boolean;
}
export interface DataStoriesConfigurations {
  Enabled: boolean;
}
export interface AmazonQInQuickSightConsoleConfigurations {
  DataQnA?: DataQnAConfigurations;
  GenerativeAuthoring?: GenerativeAuthoringConfigurations;
  ExecutiveSummary?: ExecutiveSummaryConfigurations;
  DataStories?: DataStoriesConfigurations;
}
export interface RegisteredUserConsoleFeatureConfigurations {
  StatePersistence?: StatePersistenceConfigurations;
  SharedView?: SharedViewConfigurations;
  AmazonQInQuickSight?: AmazonQInQuickSightConsoleConfigurations;
  Schedules?: SchedulesConfigurations;
  RecentSnapshots?: RecentSnapshotsConfigurations;
  ThresholdAlerts?: ThresholdAlertsConfigurations;
  DashboardCustomizationSummary?: DashboardCustomizationSummaryConfigurations;
}
export interface RegisteredUserQuickSightConsoleEmbeddingConfiguration {
  InitialPath?: string;
  FeatureConfigurations?: RegisteredUserConsoleFeatureConfigurations;
}
export interface RegisteredUserQSearchBarEmbeddingConfiguration {
  InitialTopicId?: string;
}
export interface RegisteredUserDashboardVisualEmbeddingConfiguration {
  InitialDashboardVisualId: DashboardVisualId;
}
export interface RegisteredUserGenerativeQnAEmbeddingConfiguration {
  InitialTopicId?: string;
}
export interface RegisteredUserQuickChatEmbeddingConfiguration {}
export interface RegisteredUserEmbeddingExperienceConfiguration {
  Dashboard?: RegisteredUserDashboardEmbeddingConfiguration;
  QuickSightConsole?: RegisteredUserQuickSightConsoleEmbeddingConfiguration;
  QSearchBar?: RegisteredUserQSearchBarEmbeddingConfiguration;
  DashboardVisual?: RegisteredUserDashboardVisualEmbeddingConfiguration;
  GenerativeQnA?: RegisteredUserGenerativeQnAEmbeddingConfiguration;
  QuickChat?: RegisteredUserQuickChatEmbeddingConfiguration;
}
export interface GenerateEmbedUrlForRegisteredUserRequest {
  AwsAccountId: string;
  SessionLifetimeInMinutes?: number;
  UserArn: string;
  ExperienceConfiguration: RegisteredUserEmbeddingExperienceConfiguration;
  AllowedDomains?: string[];
}
export interface GenerateEmbedUrlForRegisteredUserResponse {
  EmbedUrl: string | redacted.Redacted<string>;
  Status: number;
  RequestId: string;
}
export interface GenerateEmbedUrlForRegisteredUserWithIdentityRequest {
  AwsAccountId: string;
  SessionLifetimeInMinutes?: number;
  ExperienceConfiguration: RegisteredUserEmbeddingExperienceConfiguration;
  AllowedDomains?: string[];
}
export interface GenerateEmbedUrlForRegisteredUserWithIdentityResponse {
  EmbedUrl: string | redacted.Redacted<string>;
  Status: number;
  RequestId: string;
}
export type EmbeddingIdentityType =
  | "IAM"
  | "QUICKSIGHT"
  | "ANONYMOUS"
  | (string & {});
export type AdditionalDashboardIdList = string[];
export interface GetDashboardEmbedUrlRequest {
  AwsAccountId: string;
  DashboardId: string;
  IdentityType: EmbeddingIdentityType;
  SessionLifetimeInMinutes?: number;
  UndoRedoDisabled?: boolean;
  ResetDisabled?: boolean;
  StatePersistenceEnabled?: boolean;
  UserArn?: string;
  Namespace?: string;
  AdditionalDashboardIds?: string[];
}
export interface GetDashboardEmbedUrlResponse {
  EmbedUrl?: string | redacted.Redacted<string>;
  Status?: number;
  RequestId?: string;
}
export interface GetFlowMetadataInput {
  AwsAccountId: string;
  FlowId: string;
}
export interface GetFlowMetadataOutput {
  Arn: string;
  FlowId: string;
  Name: string;
  Description?: string;
  PublishState?: FlowPublishState;
  UserCount?: number;
  RunCount?: number;
  CreatedTime: Date;
  LastUpdatedTime?: Date;
  RequestId?: string;
  Status?: number;
}
export interface GetFlowPermissionsInput {
  AwsAccountId: string;
  FlowId: string;
}
export interface GetFlowPermissionsOutput {
  Arn: string;
  FlowId: string;
  Permissions: Permission[];
  RequestId?: string;
  Status?: number;
}
export type UserIdentifier =
  | {
      UserName: string | redacted.Redacted<string>;
      Email?: never;
      UserArn?: never;
    }
  | {
      UserName?: never;
      Email: string | redacted.Redacted<string>;
      UserArn?: never;
    }
  | { UserName?: never; Email?: never; UserArn: string };
export type Region = string;
export interface GetIdentityContextRequest {
  AwsAccountId: string;
  UserIdentifier: UserIdentifier;
  Namespace?: string;
  SessionExpiresAt?: Date;
  ContextRegion?: string;
}
export type StatusCode2 = number;
export interface GetIdentityContextResponse {
  Status: number;
  RequestId: string;
  Context?: string;
}
export type EntryPoint = string;
export interface GetSessionEmbedUrlRequest {
  AwsAccountId: string;
  EntryPoint?: string;
  SessionLifetimeInMinutes?: number;
  UserArn?: string;
}
export interface GetSessionEmbedUrlResponse {
  EmbedUrl?: string | redacted.Redacted<string>;
  Status?: number;
  RequestId?: string;
}
export interface ListActionConnectorsRequest {
  AwsAccountId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ActionConnectorSummary {
  Arn: string;
  ActionConnectorId: string;
  Type: ActionConnectorType;
  Name: string | redacted.Redacted<string>;
  CreatedTime?: Date;
  LastUpdatedTime: Date;
  Status?: ResourceStatus;
  Error?: ActionConnectorError;
}
export type ActionConnectorSummaryList = ActionConnectorSummary[];
export interface ListActionConnectorsResponse {
  ActionConnectorSummaries: ActionConnectorSummary[];
  NextToken?: string;
  RequestId?: string;
  Status?: number;
}
export type ListAgentsRequestMaxResultsInteger = number;
export interface ListAgentsRequest {
  AwsAccountId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface AgentSummary {
  Arn: string;
  AgentId: string;
  Name: string;
  Description?: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  IconId?: string;
}
export type AgentSummaries = AgentSummary[];
export interface ListAgentsResponse {
  RequestId?: string;
  AgentSummaries: AgentSummary[];
  NextToken?: string;
}
export interface ListAnalysesRequest {
  AwsAccountId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface AnalysisSummary {
  Arn?: string;
  AnalysisId?: string;
  Name?: string;
  Status?: ResourceStatus;
  CreatedTime?: Date;
  LastUpdatedTime?: Date;
}
export type AnalysisSummaryList = AnalysisSummary[];
export interface ListAnalysesResponse {
  AnalysisSummaryList?: AnalysisSummary[];
  NextToken?: string;
  Status?: number;
  RequestId?: string;
}
export type PaginationToken = string;
export interface ListApprovalPoliciesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export type ApprovalPolicyList = ApprovalPolicy[];
export interface ListApprovalPoliciesResponse {
  Policies: ApprovalPolicy[];
  NextToken?: string;
}
export interface ListAssetBundleExportJobsRequest {
  AwsAccountId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface AssetBundleExportJobSummary {
  JobStatus?: AssetBundleExportJobStatus;
  Arn?: string;
  CreatedTime?: Date;
  AssetBundleExportJobId?: string;
  IncludeAllDependencies?: boolean;
  ExportFormat?: AssetBundleExportFormat;
  IncludePermissions?: boolean;
  IncludeTags?: boolean;
}
export type AssetBundleExportJobSummaryList = AssetBundleExportJobSummary[];
export interface ListAssetBundleExportJobsResponse {
  AssetBundleExportJobSummaryList?: AssetBundleExportJobSummary[];
  NextToken?: string;
  RequestId?: string;
  Status?: number;
}
export interface ListAssetBundleImportJobsRequest {
  AwsAccountId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface AssetBundleImportJobSummary {
  JobStatus?: AssetBundleImportJobStatus;
  Arn?: string;
  CreatedTime?: Date;
  AssetBundleImportJobId?: string;
  FailureAction?: AssetBundleImportFailureAction;
}
export type AssetBundleImportJobSummaryList = AssetBundleImportJobSummary[];
export interface ListAssetBundleImportJobsResponse {
  AssetBundleImportJobSummaryList?: AssetBundleImportJobSummary[];
  NextToken?: string;
  RequestId?: string;
  Status?: number;
}
export interface ListBrandsRequest {
  AwsAccountId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface BrandSummary {
  Arn?: string;
  BrandId?: string;
  BrandName?: string;
  Description?: string;
  BrandStatus?: BrandStatus;
  CreatedTime?: Date;
  LastUpdatedTime?: Date;
}
export type BrandSummaryList = BrandSummary[];
export interface ListBrandsResponse {
  NextToken?: string;
  Brands?: BrandSummary[];
}
export interface ListCustomPermissionsRequest {
  AwsAccountId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type CustomPermissionsList = CustomPermissions[];
export interface ListCustomPermissionsResponse {
  Status?: number;
  CustomPermissionsList?: CustomPermissions[];
  NextToken?: string;
  RequestId?: string;
}
export interface ListDashboardsRequest {
  AwsAccountId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface DashboardSummary {
  Arn?: string;
  DashboardId?: string;
  Name?: string;
  CreatedTime?: Date;
  LastUpdatedTime?: Date;
  PublishedVersionNumber?: number;
  LastPublishedTime?: Date;
}
export type DashboardSummaryList = DashboardSummary[];
export interface ListDashboardsResponse {
  DashboardSummaryList?: DashboardSummary[];
  NextToken?: string;
  Status?: number;
  RequestId?: string;
}
export interface ListDashboardVersionsRequest {
  AwsAccountId: string;
  DashboardId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface DashboardVersionSummary {
  Arn?: string;
  CreatedTime?: Date;
  VersionNumber?: number;
  Status?: ResourceStatus;
  SourceEntityArn?: string;
  Description?: string;
}
export type DashboardVersionSummaryList = DashboardVersionSummary[];
export interface ListDashboardVersionsResponse {
  DashboardVersionSummaryList?: DashboardVersionSummary[];
  NextToken?: string;
  Status?: number;
  RequestId?: string;
}
export interface ListDataSetsRequest {
  AwsAccountId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type RowLevelPermissionDataSetMap = {
  [key: string]: RowLevelPermissionDataSet | undefined;
};
export interface DataSetSummary {
  Arn?: string;
  DataSetId?: string;
  Name?: string;
  CreatedTime?: Date;
  LastUpdatedTime?: Date;
  ImportMode?: DataSetImportMode;
  RowLevelPermissionDataSet?: RowLevelPermissionDataSet;
  RowLevelPermissionDataSetMap?: {
    [key: string]: RowLevelPermissionDataSet | undefined;
  };
  RowLevelPermissionTagConfigurationApplied?: boolean;
  ColumnLevelPermissionRulesApplied?: boolean;
  UseAs?: DataSetUseAs;
}
export type DataSetSummaryList = DataSetSummary[];
export interface ListDataSetsResponse {
  DataSetSummaries?: DataSetSummary[];
  NextToken?: string;
  RequestId?: string;
  Status?: number;
}
export interface ListDataSourcesRequest {
  AwsAccountId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type DataSourceList = DataSource[];
export interface ListDataSourcesResponse {
  DataSources?: DataSource[];
  NextToken?: string;
  RequestId?: string;
  Status?: number;
}
export interface ListDlpSettingsRequest {
  AwsAccountId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface DlpSettingSummary {
  DlpSettingId: string;
  Name: string;
  Arn: string;
  Status: DlpSettingStatus;
  ProviderType: DlpProviderType;
  CreatedAt: Date;
  UpdatedAt: Date;
}
export type DlpSettingSummaryList = DlpSettingSummary[];
export interface ListDlpSettingsResponse {
  DlpSettingSummaries: DlpSettingSummary[];
  NextToken?: string;
  RequestId?: string;
}
export type FlowMaxResults = number;
export interface ListFlowsInput {
  AwsAccountId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface FlowSummary {
  Arn: string;
  FlowId: string;
  Name: string;
  Description?: string;
  CreatedTime: Date;
  CreatedBy?: string;
  LastUpdatedTime?: Date;
  LastUpdatedBy?: string;
  PublishState?: FlowPublishState;
  RunCount?: number;
  UserCount?: number;
  LastPublishedBy?: string;
  LastPublishedAt?: Date;
}
export type FlowSummaryList = FlowSummary[];
export interface ListFlowsOutput {
  FlowSummaryList?: FlowSummary[];
  NextToken?: string;
  RequestId?: string;
  Status?: number;
}
export interface ListFolderMembersRequest {
  AwsAccountId: string;
  FolderId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface MemberIdArnPair {
  MemberId?: string;
  MemberArn?: string;
}
export type FolderMemberList = MemberIdArnPair[];
export interface ListFolderMembersResponse {
  Status?: number;
  FolderMemberList?: MemberIdArnPair[];
  NextToken?: string;
  RequestId?: string;
}
export interface ListFoldersRequest {
  AwsAccountId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface FolderSummary {
  Arn?: string;
  FolderId?: string;
  Name?: string;
  FolderType?: FolderType;
  CreatedTime?: Date;
  LastUpdatedTime?: Date;
  SharingModel?: SharingModel;
}
export type FolderSummaryList = FolderSummary[];
export interface ListFoldersResponse {
  Status?: number;
  FolderSummaryList?: FolderSummary[];
  NextToken?: string;
  RequestId?: string;
}
export interface ListFoldersForResourceRequest {
  AwsAccountId: string;
  ResourceArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export type FoldersForResourceArnList = string[];
export interface ListFoldersForResourceResponse {
  Status?: number;
  Folders?: string[];
  NextToken?: string;
  RequestId?: string;
}
export interface ListGroupMembershipsRequest {
  GroupName: string;
  NextToken?: string;
  MaxResults?: number;
  AwsAccountId: string;
  Namespace: string;
}
export type GroupMemberList = GroupMember[];
export interface ListGroupMembershipsResponse {
  GroupMemberList?: GroupMember[];
  NextToken?: string;
  RequestId?: string;
  Status?: number;
}
export interface ListGroupsRequest {
  AwsAccountId: string;
  NextToken?: string;
  MaxResults?: number;
  Namespace: string;
}
export type GroupList = Group[];
export interface ListGroupsResponse {
  GroupList?: Group[];
  NextToken?: string;
  RequestId?: string;
  Status?: number;
}
export interface ListIAMPolicyAssignmentsRequest {
  AwsAccountId: string;
  AssignmentStatus?: AssignmentStatus;
  Namespace: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface IAMPolicyAssignmentSummary {
  AssignmentName?: string;
  AssignmentStatus?: AssignmentStatus;
}
export type IAMPolicyAssignmentSummaryList = IAMPolicyAssignmentSummary[];
export interface ListIAMPolicyAssignmentsResponse {
  IAMPolicyAssignments?: IAMPolicyAssignmentSummary[];
  NextToken?: string;
  RequestId?: string;
  Status?: number;
}
export interface ListIAMPolicyAssignmentsForUserRequest {
  AwsAccountId: string;
  UserName: string;
  NextToken?: string;
  MaxResults?: number;
  Namespace: string;
}
export interface ActiveIAMPolicyAssignment {
  AssignmentName?: string;
  PolicyArn?: string;
}
export type ActiveIAMPolicyAssignmentList = ActiveIAMPolicyAssignment[];
export interface ListIAMPolicyAssignmentsForUserResponse {
  ActiveAssignments?: ActiveIAMPolicyAssignment[];
  RequestId?: string;
  NextToken?: string;
  Status?: number;
}
export type ListIdentityPropagationMaxResults = number;
export interface ListIdentityPropagationConfigsRequest {
  AwsAccountId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type AuthorizedTargetsList = string[];
export interface AuthorizedTargetsByService {
  Service?: ServiceType;
  AuthorizedTargets?: string[];
}
export type AuthorizedTargetsByServices = AuthorizedTargetsByService[];
export interface ListIdentityPropagationConfigsResponse {
  Services?: AuthorizedTargetsByService[];
  NextToken?: string;
  Status?: number;
  RequestId?: string;
}
export type IngestionMaxResults = number;
export interface ListIngestionsRequest {
  DataSetId: string;
  NextToken?: string;
  AwsAccountId: string;
  MaxResults?: number;
}
export type Ingestions = Ingestion[];
export interface ListIngestionsResponse {
  Ingestions?: Ingestion[];
  NextToken?: string;
  RequestId?: string;
  Status?: number;
}
export type NextToken = string;
export interface ListKnowledgeBasesRequest {
  AwsAccountId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface KnowledgeBaseSummary {
  KnowledgeBaseArn: string;
  KnowledgeBaseId: string;
  Name: string;
  Status: DataSetStatus;
  DataSourceArn: string;
  Type?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  KnowledgeBaseSizeBytes?: number;
  DocumentCount?: number;
  PrimaryOwnerArn?: string;
  PrimaryOwnerUsername?: string | redacted.Redacted<string>;
}
export type KnowledgeBaseSummaries = KnowledgeBaseSummary[];
export interface ListKnowledgeBasesResponse {
  KnowledgeBaseSummaries: KnowledgeBaseSummary[];
  NextToken?: string;
  RequestId?: string;
  Status?: number;
}
export type ListLimitsProfilesRequestMaxResultsInteger = number;
export interface ListLimitsProfilesRequest {
  accountId: string;
  resourceType?: ResourceType;
  maxResults?: number;
  nextToken?: string;
}
export type LimitsProfileList = LimitsProfile[];
export interface ListLimitsProfilesResponse {
  profiles: LimitsProfile[];
  nextToken?: string;
}
export interface ListNamespacesRequest {
  AwsAccountId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type Namespaces = NamespaceInfoV2[];
export interface ListNamespacesResponse {
  Namespaces?: NamespaceInfoV2[];
  NextToken?: string;
  RequestId?: string;
  Status?: number;
}
export interface ListOAuthClientApplicationsRequest {
  AwsAccountId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface OAuthClientApplicationSummary {
  OAuthClientApplicationId?: string;
  Name?: string;
  OAuthClientAuthenticationType?: OAuthClientAuthenticationType;
  DataSourceType?: DataSourceType;
  IdentityProviderVpcConnectionProperties?: VpcConnectionProperties;
  CreatedTime?: Date;
  LastUpdatedTime?: Date;
  Arn?: string;
}
export type OAuthClientApplicationSummaryList = OAuthClientApplicationSummary[];
export interface ListOAuthClientApplicationsResponse {
  OAuthClientApplications?: OAuthClientApplicationSummary[];
  NextToken?: string;
  RequestId?: string;
  Status?: number;
}
export interface ListRefreshSchedulesRequest {
  AwsAccountId: string;
  DataSetId: string;
}
export type RefreshSchedules = RefreshSchedule[];
export interface ListRefreshSchedulesResponse {
  RefreshSchedules?: RefreshSchedule[];
  Status?: number;
  RequestId?: string;
}
export interface ListRoleMembershipsRequest {
  Role: Role;
  NextToken?: string;
  MaxResults?: number;
  AwsAccountId: string;
  Namespace: string;
}
export interface ListRoleMembershipsResponse {
  MembersList?: string[];
  NextToken?: string;
  RequestId?: string;
  Status?: number;
}
export interface ListSelfUpgradesRequest {
  AwsAccountId: string;
  Namespace: string;
  NextToken?: string;
  MaxResults?: number;
}
export type SelfUpgradeRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "DENIED"
  | "UPDATE_FAILED"
  | "VERIFY_FAILED"
  | (string & {});
export interface SelfUpgradeRequestDetail {
  UpgradeRequestId?: string;
  UserName?: string;
  OriginalRole?: UserRole;
  RequestedRole?: UserRole;
  RequestNote?: string;
  CreationTime?: number;
  RequestStatus?: SelfUpgradeRequestStatus;
  lastUpdateAttemptTime?: number;
  lastUpdateFailureReason?: string;
}
export type SelfUpgradeRequestDetailList = SelfUpgradeRequestDetail[];
export interface ListSelfUpgradesResponse {
  SelfUpgradeRequestDetails?: SelfUpgradeRequestDetail[];
  NextToken?: string;
  RequestId?: string;
  Status?: number;
}
export interface ListSpaceResourcesRequest {
  AwsAccountId: string;
  SpaceId: string;
}
export interface SpaceResourceSummary {
  ResourceType: SpaceQuickSightResourceType;
  ResourceDetails: SpaceQuickSightResourceDetails;
  ResourceName?: string;
  UpdatedAt?: Date;
}
export type SpaceResourceSummaries = SpaceResourceSummary[];
export interface ListSpaceResourcesResponse {
  spaceId: string;
  spaceArn?: string;
  SpaceResources: SpaceResourceSummary[];
  RequestId?: string;
}
export type SpacesMaxResults = number;
export interface ListSpacesRequest {
  AwsAccountId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface SpaceSummary {
  spaceId: string;
  spaceArn?: string;
  name?: string;
  description?: string | redacted.Redacted<string>;
  updatedAt?: Date;
  consumedSourceSize?: number;
  consumedSourceDocCount?: number;
  createdAt?: Date;
  createdBy?: string;
  createdByArn?: string;
  resourcesCount?: number;
}
export type SpaceSummaries = SpaceSummary[];
export interface ListSpacesResponse {
  spaceId: string;
  spaceArn?: string;
  SpaceSummaries: SpaceSummary[];
  NextToken?: string;
  RequestId?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
  RequestId?: string;
  Status?: number;
}
export interface ListTemplateAliasesRequest {
  AwsAccountId: string;
  TemplateId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type TemplateAliasList = TemplateAlias[];
export interface ListTemplateAliasesResponse {
  TemplateAliasList?: TemplateAlias[];
  Status?: number;
  RequestId?: string;
  NextToken?: string;
}
export interface ListTemplatesRequest {
  AwsAccountId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface TemplateSummary {
  Arn?: string;
  TemplateId?: string;
  Name?: string;
  LatestVersionNumber?: number;
  CreatedTime?: Date;
  LastUpdatedTime?: Date;
}
export type TemplateSummaryList = TemplateSummary[];
export interface ListTemplatesResponse {
  TemplateSummaryList?: TemplateSummary[];
  NextToken?: string;
  Status?: number;
  RequestId?: string;
}
export interface ListTemplateVersionsRequest {
  AwsAccountId: string;
  TemplateId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface TemplateVersionSummary {
  Arn?: string;
  VersionNumber?: number;
  CreatedTime?: Date;
  Status?: ResourceStatus;
  Description?: string;
}
export type TemplateVersionSummaryList = TemplateVersionSummary[];
export interface ListTemplateVersionsResponse {
  TemplateVersionSummaryList?: TemplateVersionSummary[];
  NextToken?: string;
  Status?: number;
  RequestId?: string;
}
export interface ListThemeAliasesRequest {
  AwsAccountId: string;
  ThemeId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type ThemeAliasList = ThemeAlias[];
export interface ListThemeAliasesResponse {
  ThemeAliasList?: ThemeAlias[];
  Status?: number;
  RequestId?: string;
  NextToken?: string;
}
export interface ListThemesRequest {
  AwsAccountId: string;
  NextToken?: string;
  MaxResults?: number;
  Type?: ThemeType;
}
export interface ThemeSummary {
  Arn?: string;
  Name?: string;
  ThemeId?: string;
  LatestVersionNumber?: number;
  CreatedTime?: Date;
  LastUpdatedTime?: Date;
}
export type ThemeSummaryList = ThemeSummary[];
export interface ListThemesResponse {
  ThemeSummaryList?: ThemeSummary[];
  NextToken?: string;
  Status?: number;
  RequestId?: string;
}
export interface ListThemeVersionsRequest {
  AwsAccountId: string;
  ThemeId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ThemeVersionSummary {
  VersionNumber?: number;
  Arn?: string;
  Description?: string;
  CreatedTime?: Date;
  Status?: ResourceStatus;
}
export type ThemeVersionSummaryList = ThemeVersionSummary[];
export interface ListThemeVersionsResponse {
  ThemeVersionSummaryList?: ThemeVersionSummary[];
  NextToken?: string;
  Status?: number;
  RequestId?: string;
}
export interface ListTopicRefreshSchedulesRequest {
  AwsAccountId: string;
  TopicId: string;
}
export interface TopicRefreshScheduleSummary {
  DatasetId?: string;
  DatasetArn?: string;
  DatasetName?: string;
  RefreshSchedule?: TopicRefreshSchedule;
}
export type TopicRefreshScheduleSummaries = TopicRefreshScheduleSummary[];
export interface ListTopicRefreshSchedulesResponse {
  TopicId?: string;
  TopicArn?: string;
  RefreshSchedules?: TopicRefreshScheduleSummary[];
  Status?: number;
  RequestId?: string;
}
export interface ListTopicReviewedAnswersRequest {
  AwsAccountId: string;
  TopicId: string;
}
export interface TopicReviewedAnswer {
  Arn?: string;
  AnswerId: string;
  DatasetArn: string;
  Question: string | redacted.Redacted<string>;
  Mir?: TopicIR;
  PrimaryVisual?: TopicVisual;
  Template?: TopicTemplate;
}
export type TopicReviewedAnswers = TopicReviewedAnswer[];
export interface ListTopicReviewedAnswersResponse {
  TopicId?: string;
  TopicArn?: string;
  Answers?: TopicReviewedAnswer[];
  Status?: number;
  RequestId?: string;
}
export interface ListTopicsRequest {
  AwsAccountId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface TopicSummary {
  Arn?: string;
  TopicId?: string;
  Name?: string;
  UserExperienceVersion?: TopicUserExperienceVersion;
}
export type TopicSummaries = TopicSummary[];
export interface ListTopicsResponse {
  TopicsSummaries?: TopicSummary[];
  NextToken?: string;
  RequestId?: string;
  Status?: number;
}
export interface ListTopicsV2Request {
  AwsAccountId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface TopicV2Summary {
  Arn?: string;
  TopicId?: string;
  Name?: string;
}
export type TopicV2Summaries = TopicV2Summary[];
export interface ListTopicsV2Response {
  TopicSummaryList?: TopicV2Summary[];
  NextToken?: string;
  RequestId?: string;
  Status?: number;
}
export interface ListUserGroupsRequest {
  UserName: string;
  AwsAccountId: string;
  Namespace: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListUserGroupsResponse {
  GroupList?: Group[];
  NextToken?: string;
  RequestId?: string;
  Status?: number;
}
export interface ListUsersRequest {
  AwsAccountId: string;
  NextToken?: string;
  MaxResults?: number;
  Namespace: string;
}
export type UserList = User[];
export interface ListUsersResponse {
  UserList?: User[];
  NextToken?: string;
  RequestId?: string;
  Status?: number;
}
export type FilterValue = string;
export interface UserNameOrEmailFilter {
  prefix: string;
}
export type CapacityBytesRangeFilterMinBytesLong = number;
export type CapacityBytesRangeFilterMaxBytesLong = number;
export interface CapacityBytesRangeFilter {
  minBytes?: number;
  maxBytes?: number;
}
export type UserIndexCapacityFilter =
  | { userNameOrEmail: UserNameOrEmailFilter; totalCapacityBytes?: never }
  | { userNameOrEmail?: never; totalCapacityBytes: CapacityBytesRangeFilter };
export type UserIndexCapacityFilters = UserIndexCapacityFilter[];
export type UserIndexCapacitySortBy = "TOTAL_CAPACITY_BYTES" | (string & {});
export type UserIndexCapacitySortOrder = "ASC" | "DESC" | (string & {});
export type ListUsersIndexCapacityRequestMaxResultsInteger = number;
export interface ListUsersIndexCapacityRequest {
  awsAccountId: string;
  namespace?: string;
  filters?: UserIndexCapacityFilter[];
  sortBy?: UserIndexCapacitySortBy;
  sortOrder?: UserIndexCapacitySortOrder;
  maxResults?: number;
  nextToken?: string;
}
export type LongValue = number;
export type IntegerValue = number;
export interface UserIndexCapacity {
  userArn?: string;
  userName?: string;
  email?: string;
  role?: string;
  totalCapacityBytes?: number;
  totalKBCapacityBytes?: number;
  totalSpaceCapacityBytes?: number;
  kbCount?: number;
  spaceCount?: number;
}
export type UserIndexCapacityList = UserIndexCapacity[];
export interface ListUsersIndexCapacityResponse {
  users?: UserIndexCapacity[];
  nextToken?: string;
  requestId?: string;
}
export interface ListVPCConnectionsRequest {
  AwsAccountId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface VPCConnectionSummary {
  VPCConnectionId?: string;
  Arn?: string;
  Name?: string;
  VPCId?: string;
  SecurityGroupIds?: string[];
  DnsResolvers?: string[];
  Status?: VPCConnectionResourceStatus;
  AvailabilityStatus?: VPCConnectionAvailabilityStatus;
  NetworkInterfaces?: NetworkInterface[];
  RoleArn?: string;
  CreatedTime?: Date;
  LastUpdatedTime?: Date;
}
export type VPCConnectionSummaryList = VPCConnectionSummary[];
export interface ListVPCConnectionsResponse {
  VPCConnectionSummaries?: VPCConnectionSummary[];
  NextToken?: string;
  RequestId?: string;
  Status?: number;
}
export type QAQueryText = string | redacted.Redacted<string>;
export type IncludeQuickSightQIndex = "INCLUDE" | "EXCLUDE" | (string & {});
export type IncludeGeneratedAnswer = "INCLUDE" | "EXCLUDE" | (string & {});
export type MaxTopicsToConsider = number;
export interface PredictQAResultsRequest {
  AwsAccountId: string;
  QueryText: string | redacted.Redacted<string>;
  IncludeQuickSightQIndex?: IncludeQuickSightQIndex;
  IncludeGeneratedAnswer?: IncludeGeneratedAnswer;
  MaxTopicsToConsider?: number;
}
export type QAResultType =
  | "DASHBOARD_VISUAL"
  | "GENERATED_ANSWER"
  | "NO_ANSWER"
  | (string & {});
export type VisualTitle = string;
export type VisualSubtitle = string;
export type QAUrl = string;
export interface DashboardVisualResult {
  DashboardId?: string;
  DashboardName?: string;
  SheetId?: string;
  SheetName?: string;
  VisualId?: string;
  VisualTitle?: string;
  VisualSubtitle?: string;
  DashboardUrl?: string;
}
export type GeneratedAnswerStatus =
  | "ANSWER_GENERATED"
  | "ANSWER_RETRIEVED"
  | "ANSWER_DOWNGRADE"
  | (string & {});
export type QuestionId = string;
export interface GeneratedAnswerResult {
  QuestionText?: string | redacted.Redacted<string>;
  AnswerStatus?: GeneratedAnswerStatus;
  TopicId?: string;
  TopicName?: string;
  Restatement?: string | redacted.Redacted<string>;
  QuestionId?: string;
  AnswerId?: string;
  QuestionUrl?: string;
}
export interface QAResult {
  ResultType?: QAResultType;
  DashboardVisual?: DashboardVisualResult;
  GeneratedAnswer?: GeneratedAnswerResult;
}
export type QAResults = QAResult[];
export interface PredictQAResultsResponse {
  PrimaryResult?: QAResult;
  AdditionalResults?: QAResult[];
  RequestId?: string;
  Status?: number;
}
export interface PutDataSetRefreshPropertiesRequest {
  AwsAccountId: string;
  DataSetId: string;
  DataSetRefreshProperties: DataSetRefreshProperties;
}
export interface PutDataSetRefreshPropertiesResponse {
  RequestId?: string;
  Status?: number;
}
export type RoleSessionName = string;
export interface RegisterUserRequest {
  IdentityType: IdentityType;
  Email: string;
  UserRole: UserRole;
  IamArn?: string;
  SessionName?: string;
  AwsAccountId: string;
  Namespace: string;
  UserName?: string;
  CustomPermissionsName?: string;
  ExternalLoginFederationProviderType?: string;
  CustomFederationProviderUrl?: string;
  ExternalLoginId?: string;
  Tags?: Tag[];
}
export interface RegisterUserResponse {
  User?: User;
  UserInvitationUrl?: string;
  RequestId?: string;
  Status?: number;
}
export interface RestoreAnalysisRequest {
  AwsAccountId: string;
  AnalysisId: string;
  RestoreToFolders?: boolean;
}
export interface RestoreAnalysisResponse {
  Status?: number;
  Arn?: string;
  AnalysisId?: string;
  RequestId?: string;
  RestorationFailedFolderArns?: string[];
}
export type SearchActionConnectorsRequestMaxResultsInteger = number;
export type ActionConnectorSearchFilterNameEnum =
  | "ACTION_CONNECTOR_NAME"
  | "ACTION_CONNECTOR_TYPE"
  | "QUICKSIGHT_OWNER"
  | "QUICKSIGHT_VIEWER_OR_OWNER"
  | "DIRECT_QUICKSIGHT_SOLE_OWNER"
  | "DIRECT_QUICKSIGHT_OWNER"
  | "DIRECT_QUICKSIGHT_VIEWER_OR_OWNER"
  | (string & {});
export type FilterOperator = "StringEquals" | "StringLike" | (string & {});
export interface ActionConnectorSearchFilter {
  Name: ActionConnectorSearchFilterNameEnum;
  Operator: FilterOperator;
  Value: string;
}
export type ActionConnectorSearchFilterList = ActionConnectorSearchFilter[];
export interface SearchActionConnectorsRequest {
  AwsAccountId: string;
  MaxResults?: number;
  NextToken?: string;
  Filters: ActionConnectorSearchFilter[];
}
export interface SearchActionConnectorsResponse {
  NextToken?: string;
  RequestId?: string;
  Status?: number;
  ActionConnectorSummaries?: ActionConnectorSummary[];
}
export type AgentOwnershipFilterAttribute =
  | "DIRECT_QUICKSIGHT_OWNER"
  | "DIRECT_QUICKSIGHT_VIEWER_OR_OWNER"
  | "DIRECT_QUICKSIGHT_SOLE_OWNER"
  | "AGENT_NAME"
  | (string & {});
export type ComparisonOperator = "StringEquals" | "StringLike" | (string & {});
export interface AgentSearchFilter {
  Name?: AgentOwnershipFilterAttribute;
  Operator?: ComparisonOperator;
  Value?: string;
}
export type AgentSearchFilterList = AgentSearchFilter[];
export type AgentsMaxResults = number;
export interface SearchAgentsRequest {
  AwsAccountId: string;
  Filters: AgentSearchFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export type AgentSummaryList = AgentSummary[];
export interface SearchAgentsResponse {
  AgentSummaries?: AgentSummary[];
  NextToken?: string;
  RequestId?: string;
}
export type AnalysisFilterAttribute =
  | "QUICKSIGHT_USER"
  | "QUICKSIGHT_VIEWER_OR_OWNER"
  | "DIRECT_QUICKSIGHT_VIEWER_OR_OWNER"
  | "QUICKSIGHT_OWNER"
  | "DIRECT_QUICKSIGHT_OWNER"
  | "DIRECT_QUICKSIGHT_SOLE_OWNER"
  | "ANALYSIS_NAME"
  | (string & {});
export interface AnalysisSearchFilter {
  Operator?: FilterOperator;
  Name?: AnalysisFilterAttribute;
  Value?: string;
}
export type AnalysisSearchFilterList = AnalysisSearchFilter[];
export interface SearchAnalysesRequest {
  AwsAccountId: string;
  Filters: AnalysisSearchFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface SearchAnalysesResponse {
  AnalysisSummaryList?: AnalysisSummary[];
  NextToken?: string;
  Status?: number;
  RequestId?: string;
}
export type DashboardFilterAttribute =
  | "QUICKSIGHT_USER"
  | "QUICKSIGHT_VIEWER_OR_OWNER"
  | "DIRECT_QUICKSIGHT_VIEWER_OR_OWNER"
  | "QUICKSIGHT_OWNER"
  | "DIRECT_QUICKSIGHT_OWNER"
  | "DIRECT_QUICKSIGHT_SOLE_OWNER"
  | "DASHBOARD_NAME"
  | (string & {});
export interface DashboardSearchFilter {
  Operator: FilterOperator;
  Name?: DashboardFilterAttribute;
  Value?: string;
}
export type DashboardSearchFilterList = DashboardSearchFilter[];
export interface SearchDashboardsRequest {
  AwsAccountId: string;
  Filters: DashboardSearchFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface SearchDashboardsResponse {
  DashboardSummaryList?: DashboardSummary[];
  NextToken?: string;
  Status?: number;
  RequestId?: string;
}
export type DataSetFilterAttribute =
  | "QUICKSIGHT_VIEWER_OR_OWNER"
  | "QUICKSIGHT_OWNER"
  | "DIRECT_QUICKSIGHT_VIEWER_OR_OWNER"
  | "DIRECT_QUICKSIGHT_OWNER"
  | "DIRECT_QUICKSIGHT_SOLE_OWNER"
  | "DATASET_NAME"
  | (string & {});
export interface DataSetSearchFilter {
  Operator: FilterOperator;
  Name: DataSetFilterAttribute;
  Value: string;
}
export type DataSetSearchFilterList = DataSetSearchFilter[];
export interface SearchDataSetsRequest {
  AwsAccountId: string;
  Filters: DataSetSearchFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface SearchDataSetsResponse {
  DataSetSummaries?: DataSetSummary[];
  NextToken?: string;
  Status?: number;
  RequestId?: string;
}
export type DataSourceFilterAttribute =
  | "DIRECT_QUICKSIGHT_VIEWER_OR_OWNER"
  | "DIRECT_QUICKSIGHT_OWNER"
  | "DIRECT_QUICKSIGHT_SOLE_OWNER"
  | "DATASOURCE_NAME"
  | (string & {});
export interface DataSourceSearchFilter {
  Operator: FilterOperator;
  Name: DataSourceFilterAttribute;
  Value: string;
}
export type DataSourceSearchFilterList = DataSourceSearchFilter[];
export interface SearchDataSourcesRequest {
  AwsAccountId: string;
  Filters: DataSourceSearchFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface DataSourceSummary {
  Arn?: string;
  DataSourceId?: string;
  Name?: string;
  Type?: DataSourceType;
  CreatedTime?: Date;
  LastUpdatedTime?: Date;
}
export type DataSourceSummaryList = DataSourceSummary[];
export interface SearchDataSourcesResponse {
  DataSourceSummaries?: DataSourceSummary[];
  NextToken?: string;
  Status?: number;
  RequestId?: string;
}
export type FieldName =
  | "assetName"
  | "assetDescription"
  | "DIRECT_QUICKSIGHT_OWNER"
  | "DIRECT_QUICKSIGHT_VIEWER_OR_OWNER"
  | "DIRECT_QUICKSIGHT_SOLE_OWNER"
  | (string & {});
export type SearchFilterOperator =
  | "StringEquals"
  | "StringLike"
  | (string & {});
export interface SearchFlowsFilter {
  Name: FieldName;
  Operator: SearchFilterOperator;
  Value: string;
}
export type SearchFlowsFilterList = SearchFlowsFilter[];
export interface SearchFlowsInput {
  AwsAccountId: string;
  Filters: SearchFlowsFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface SearchFlowsOutput {
  FlowSummaryList: FlowSummary[];
  NextToken?: string;
  RequestId?: string;
  Status?: number;
}
export type FolderFilterAttribute =
  | "PARENT_FOLDER_ARN"
  | "DIRECT_QUICKSIGHT_OWNER"
  | "DIRECT_QUICKSIGHT_SOLE_OWNER"
  | "DIRECT_QUICKSIGHT_VIEWER_OR_OWNER"
  | "QUICKSIGHT_OWNER"
  | "QUICKSIGHT_VIEWER_OR_OWNER"
  | "FOLDER_NAME"
  | (string & {});
export interface FolderSearchFilter {
  Operator?: FilterOperator;
  Name?: FolderFilterAttribute;
  Value?: string;
}
export type FolderSearchFilterList = FolderSearchFilter[];
export interface SearchFoldersRequest {
  AwsAccountId: string;
  Filters: FolderSearchFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface SearchFoldersResponse {
  Status?: number;
  FolderSummaryList?: FolderSummary[];
  NextToken?: string;
  RequestId?: string;
}
export type GroupFilterOperator = "StartsWith" | (string & {});
export type GroupFilterAttribute = "GROUP_NAME" | (string & {});
export interface GroupSearchFilter {
  Operator: GroupFilterOperator;
  Name: GroupFilterAttribute;
  Value: string;
}
export type GroupSearchFilterList = GroupSearchFilter[];
export interface SearchGroupsRequest {
  AwsAccountId: string;
  NextToken?: string;
  MaxResults?: number;
  Namespace: string;
  Filters: GroupSearchFilter[];
}
export interface SearchGroupsResponse {
  GroupList?: Group[];
  NextToken?: string;
  RequestId?: string;
  Status?: number;
}
export type KnowledgeBaseSearchFilterName =
  | "KNOWLEDGE_BASE_ID"
  | "KNOWLEDGE_BASE_NAME"
  | "DIRECT_QUICKSIGHT_OWNER"
  | "DIRECT_QUICKSIGHT_VIEWER_OR_OWNER"
  | "DIRECT_QUICKSIGHT_SOLE_OWNER"
  | "KNOWLEDGE_BASE_SIZE_BYTES"
  | "PRIMARY_OWNER"
  | "DATASOURCE_ARN"
  | (string & {});
export type KnowledgeBaseSearchOperator =
  | "STRING_EQUALS"
  | "STRING_LIKE"
  | "GREATER_THAN_OR_EQUALS"
  | "LESS_THAN_OR_EQUALS"
  | (string & {});
export interface KnowledgeBaseSearchFilter {
  name: KnowledgeBaseSearchFilterName;
  operator: KnowledgeBaseSearchOperator;
  value: string;
}
export type KnowledgeBaseSearchFilters = KnowledgeBaseSearchFilter[];
export type KnowledgeBaseSortByField =
  | "KNOWLEDGE_BASE_SIZE_BYTES"
  | "CREATED_AT"
  | (string & {});
export type SortOrder = "ASC" | "DESC" | (string & {});
export interface KnowledgeBaseSortBy {
  sortByField: KnowledgeBaseSortByField;
  sortOrder: SortOrder;
}
export interface SearchKnowledgeBasesRequest {
  AwsAccountId: string;
  NextToken?: string;
  MaxResults?: number;
  Filters?: KnowledgeBaseSearchFilter[];
  SortBy?: KnowledgeBaseSortBy;
}
export interface SearchKnowledgeBasesResponse {
  KnowledgeBaseSummaries: KnowledgeBaseSummary[];
  NextToken?: string;
  RequestId?: string;
  Status?: number;
}
export type SpaceQuickSightSearchFilterName =
  | "SPACE_ID"
  | "SPACE_NAME"
  | "DIRECT_QUICKSIGHT_OWNER"
  | "DIRECT_QUICKSIGHT_VIEWER_OR_OWNER"
  | "DIRECT_QUICKSIGHT_SOLE_OWNER"
  | "CONTRIBUTED_BY"
  | "CONSUMED_SOURCE_SIZE"
  | "CREATED_BY"
  | (string & {});
export type SpaceSearchOperator =
  | "STRING_EQUALS"
  | "STRING_LIKE"
  | "NUMBER_RANGE"
  | (string & {});
export interface SpaceQuicksightSearchFilter {
  name: SpaceQuickSightSearchFilterName;
  operator: SpaceSearchOperator;
  value: string;
}
export type SpaceQuicksightSearchFilters = SpaceQuicksightSearchFilter[];
export interface SearchSpacesRequest {
  AwsAccountId: string;
  NextToken?: string;
  MaxResults?: number;
  Filters: SpaceQuicksightSearchFilter[];
}
export interface SearchSpacesResponse {
  spaceId: string;
  spaceArn?: string;
  SpaceSummaries: SpaceSummary[];
  NextToken?: string;
  RequestId?: string;
}
export type TopicFilterOperator = "StringEquals" | "StringLike" | (string & {});
export type TopicFilterAttribute =
  | "QUICKSIGHT_USER"
  | "QUICKSIGHT_VIEWER_OR_OWNER"
  | "DIRECT_QUICKSIGHT_VIEWER_OR_OWNER"
  | "QUICKSIGHT_OWNER"
  | "DIRECT_QUICKSIGHT_OWNER"
  | "DIRECT_QUICKSIGHT_SOLE_OWNER"
  | "TOPIC_NAME"
  | (string & {});
export interface TopicSearchFilter {
  Operator: TopicFilterOperator;
  Name: TopicFilterAttribute;
  Value: string | redacted.Redacted<string>;
}
export type TopicSearchFilterList = TopicSearchFilter[];
export interface SearchTopicsRequest {
  AwsAccountId: string;
  Filters: TopicSearchFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface SearchTopicsResponse {
  TopicSummaryList?: TopicSummary[];
  NextToken?: string;
  Status?: number;
  RequestId?: string;
}
export interface SearchTopicsV2Request {
  AwsAccountId: string;
  Filters: TopicSearchFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface SearchTopicsV2Response {
  TopicSummaryList?: TopicV2Summary[];
  NextToken?: string;
  Status?: number;
  RequestId?: string;
}
export interface StartAssetBundleExportJobRequest {
  AwsAccountId: string;
  AssetBundleExportJobId: string;
  ResourceArns: string[];
  IncludeAllDependencies?: boolean;
  ExportFormat: AssetBundleExportFormat;
  CloudFormationOverridePropertyConfiguration?: AssetBundleCloudFormationOverridePropertyConfiguration;
  IncludePermissions?: boolean;
  IncludeTags?: boolean;
  ValidationStrategy?: AssetBundleExportJobValidationStrategy;
  IncludeFolderMemberships?: boolean;
  IncludeFolderMembers?: IncludeFolderMembers;
}
export interface StartAssetBundleExportJobResponse {
  Arn?: string;
  AssetBundleExportJobId?: string;
  RequestId?: string;
  Status?: number;
}
export type AssetBundleImportBodyBlob =
  | Uint8Array
  | redacted.Redacted<Uint8Array>;
export interface AssetBundleImportSource {
  Body?: Uint8Array | redacted.Redacted<Uint8Array>;
  S3Uri?: string;
}
export interface StartAssetBundleImportJobRequest {
  AwsAccountId: string;
  AssetBundleImportJobId: string;
  AssetBundleImportSource: AssetBundleImportSource;
  OverrideParameters?: AssetBundleImportJobOverrideParameters;
  FailureAction?: AssetBundleImportFailureAction;
  OverridePermissions?: AssetBundleImportJobOverridePermissions;
  OverrideTags?: AssetBundleImportJobOverrideTags;
  OverrideValidationStrategy?: AssetBundleImportJobOverrideValidationStrategy;
}
export interface StartAssetBundleImportJobResponse {
  Arn?: string;
  AssetBundleImportJobId?: string;
  RequestId?: string;
  Status?: number;
}
export interface StartAutomationJobRequest {
  AwsAccountId: string;
  AutomationGroupId: string;
  AutomationId: string;
  InputPayload?: string | redacted.Redacted<string>;
}
export interface StartAutomationJobResponse {
  Arn: string;
  JobId: string;
  Status?: number;
  RequestId?: string;
}
export interface SnapshotAnonymousUser {
  RowLevelPermissionTags?: SessionTag[];
}
export type SnapshotAnonymousUserList = SnapshotAnonymousUser[];
export interface SnapshotUserConfiguration {
  AnonymousUsers?: SnapshotAnonymousUser[];
}
export interface StartDashboardSnapshotJobRequest {
  AwsAccountId: string;
  DashboardId: string;
  SnapshotJobId: string;
  UserConfiguration?: SnapshotUserConfiguration;
  SnapshotConfiguration: SnapshotConfiguration;
}
export interface StartDashboardSnapshotJobResponse {
  Arn?: string;
  SnapshotJobId?: string;
  RequestId?: string;
  Status?: number;
}
export interface StartDashboardSnapshotJobScheduleRequest {
  AwsAccountId: string;
  DashboardId: string;
  ScheduleId: string;
}
export interface StartDashboardSnapshotJobScheduleResponse {
  RequestId?: string;
  Status?: number;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceResponse {
  RequestId?: string;
  Status?: number;
}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {
  RequestId?: string;
  Status?: number;
}
export interface UpdateAccountCustomizationRequest {
  AwsAccountId: string;
  Namespace?: string;
  AccountCustomization: AccountCustomization;
}
export interface UpdateAccountCustomizationResponse {
  Arn?: string;
  AwsAccountId?: string;
  Namespace?: string;
  AccountCustomization?: AccountCustomization;
  RequestId?: string;
  Status?: number;
}
export interface UpdateAccountCustomPermissionRequest {
  CustomPermissionsName: string;
  AwsAccountId: string;
}
export interface UpdateAccountCustomPermissionResponse {
  RequestId?: string;
  Status?: number;
}
export interface UpdateAccountSettingsRequest {
  AwsAccountId: string;
  DefaultNamespace: string;
  NotificationEmail?: string;
  TerminationProtectionEnabled?: boolean;
}
export interface UpdateAccountSettingsResponse {
  RequestId?: string;
  Status?: number;
}
export interface UpdateActionConnectorRequest {
  AwsAccountId: string;
  ActionConnectorId: string;
  Name: string | redacted.Redacted<string>;
  AuthenticationConfig: AuthConfig;
  Description?: string | redacted.Redacted<string>;
  VpcConnectionArn?: string;
}
export interface UpdateActionConnectorResponse {
  Arn?: string;
  ActionConnectorId?: string;
  RequestId?: string;
  UpdateStatus?: ResourceStatus;
  Status?: number;
}
export interface UpdateActionConnectorPermissionsRequest {
  AwsAccountId: string;
  ActionConnectorId: string;
  GrantPermissions?: ResourcePermission[];
  RevokePermissions?: ResourcePermission[];
}
export interface UpdateActionConnectorPermissionsResponse {
  Arn?: string;
  ActionConnectorId?: string;
  RequestId?: string;
  Status?: number;
  Permissions?: ResourcePermission[];
}
export type UpdateAgentRequestSpacesToAddList = string[];
export type UpdateAgentRequestSpacesToRemoveList = string[];
export type UpdateAgentRequestActionConnectorsToAddList = string[];
export type UpdateAgentRequestActionConnectorsToRemoveList = string[];
export interface UpdateAgentRequest {
  AgentId: string;
  AwsAccountId: string;
  Name: string;
  Description?: string;
  IconId?: string;
  StarterPrompts?: string[];
  WelcomeMessage?: string | redacted.Redacted<string>;
  CustomPromptInput?: CustomPromptInput;
  SpacesToAdd?: string[];
  SpacesToRemove?: string[];
  ActionConnectorsToAdd?: string[];
  ActionConnectorsToRemove?: string[];
}
export interface FailedToUpdateAssociation {
  Arn?: string;
  ErrorMessage?: string;
  ErrorCode?: string;
}
export type FailedToUpdateAssociationList = FailedToUpdateAssociation[];
export interface UpdateAgentResponse {
  Arn: string;
  AgentId: string;
  AgentStatus: AgentStatus;
  FailedToAddSpaces?: FailedToUpdateAssociation[];
  FailedToRemoveSpaces?: FailedToUpdateAssociation[];
  FailedToAddActionConnectors?: FailedToUpdateAssociation[];
  FailedToRemoveActionConnectors?: FailedToUpdateAssociation[];
  RequestId?: string;
}
export type UpdateAgentPermissionsRequestGrantPermissionsList =
  ResourcePermission[];
export type UpdateAgentPermissionsRequestRevokePermissionsList =
  ResourcePermission[];
export interface UpdateAgentPermissionsRequest {
  AgentId: string;
  AwsAccountId: string;
  GrantPermissions?: ResourcePermission[];
  RevokePermissions?: ResourcePermission[];
}
export interface UpdateAgentPermissionsResponse {
  Arn: string;
  AgentId: string;
  RequestId?: string;
  Permissions?: ResourcePermission[];
}
export interface UpdateAnalysisRequest {
  AwsAccountId: string;
  AnalysisId: string;
  Name: string;
  Parameters?: Parameters;
  SourceEntity?: AnalysisSourceEntity;
  ThemeArn?: string;
  Definition?: AnalysisDefinition;
  ValidationStrategy?: ValidationStrategy;
}
export interface UpdateAnalysisResponse {
  Arn?: string;
  AnalysisId?: string;
  UpdateStatus?: ResourceStatus;
  Status?: number;
  RequestId?: string;
}
export interface UpdateAnalysisPermissionsRequest {
  AwsAccountId: string;
  AnalysisId: string;
  GrantPermissions?: ResourcePermission[];
  RevokePermissions?: ResourcePermission[];
}
export interface UpdateAnalysisPermissionsResponse {
  AnalysisArn?: string;
  AnalysisId?: string;
  Permissions?: ResourcePermission[];
  RequestId?: string;
  Status?: number;
}
export interface UpdateApplicationWithTokenExchangeGrantRequest {
  AwsAccountId: string;
  Namespace: string;
}
export interface UpdateApplicationWithTokenExchangeGrantResponse {
  Status?: number;
  RequestId?: string;
}
export interface UpdateApprovalPolicyRequest {
  PolicyId: string;
  Name?: string;
  Description?: string;
  Actions?: GovernedAction[];
  AssetTypes?: AssetType[];
  ApplicableTo?: ApplicableTo;
  ApprovalGroups?: string[];
}
export interface UpdateApprovalPolicyResponse {
  Policy: ApprovalPolicy;
}
export interface UpdateBrandRequest {
  AwsAccountId: string;
  BrandId: string;
  BrandDefinition?: BrandDefinition;
}
export interface UpdateBrandResponse {
  RequestId?: string;
  BrandDetail?: BrandDetail;
  BrandDefinition?: BrandDefinition;
}
export interface UpdateBrandAssignmentRequest {
  AwsAccountId: string;
  BrandArn: string;
}
export interface UpdateBrandAssignmentResponse {
  RequestId?: string;
  BrandArn?: string;
}
export interface UpdateBrandPublishedVersionRequest {
  AwsAccountId: string;
  BrandId: string;
  VersionId: string;
}
export interface UpdateBrandPublishedVersionResponse {
  RequestId?: string;
  VersionId?: string;
}
export interface UpdateCustomPermissionsRequest {
  AwsAccountId: string;
  CustomPermissionsName: string;
  Capabilities?: Capabilities;
  Governance?: Governance;
}
export interface UpdateCustomPermissionsResponse {
  Status?: number;
  Arn?: string;
  RequestId?: string;
}
export interface UpdateDashboardRequest {
  AwsAccountId: string;
  DashboardId: string;
  Name: string;
  SourceEntity?: DashboardSourceEntity;
  Parameters?: Parameters;
  VersionDescription?: string;
  DashboardPublishOptions?: DashboardPublishOptions;
  ThemeArn?: string;
  Definition?: DashboardVersionDefinition;
  ValidationStrategy?: ValidationStrategy;
}
export interface UpdateDashboardResponse {
  Arn?: string;
  VersionArn?: string;
  DashboardId?: string;
  CreationStatus?: ResourceStatus;
  Status?: number;
  RequestId?: string;
}
export interface UpdateDashboardLinksRequest {
  AwsAccountId: string;
  DashboardId: string;
  LinkEntities: string[];
}
export interface UpdateDashboardLinksResponse {
  RequestId?: string;
  Status?: number;
  DashboardArn?: string;
  LinkEntities?: string[];
}
export type UpdateLinkPermissionList = ResourcePermission[];
export interface UpdateDashboardPermissionsRequest {
  AwsAccountId: string;
  DashboardId: string;
  GrantPermissions?: ResourcePermission[];
  RevokePermissions?: ResourcePermission[];
  GrantLinkPermissions?: ResourcePermission[];
  RevokeLinkPermissions?: ResourcePermission[];
}
export interface UpdateDashboardPermissionsResponse {
  DashboardArn?: string;
  DashboardId?: string;
  Permissions?: ResourcePermission[];
  RequestId?: string;
  Status?: number;
  LinkSharingConfiguration?: LinkSharingConfiguration;
}
export interface UpdateDashboardPublishedVersionRequest {
  AwsAccountId: string;
  DashboardId: string;
  VersionNumber: number;
}
export interface UpdateDashboardPublishedVersionResponse {
  DashboardId?: string;
  DashboardArn?: string;
  Status?: number;
  RequestId?: string;
}
export interface UpdateDashboardsQAConfigurationRequest {
  AwsAccountId: string;
  DashboardsQAStatus: DashboardsQAStatus;
}
export interface UpdateDashboardsQAConfigurationResponse {
  DashboardsQAStatus?: DashboardsQAStatus;
  RequestId?: string;
  Status?: number;
}
export interface UpdateDataSetRequest {
  AwsAccountId: string;
  DataSetId: string;
  Name: string;
  PhysicalTableMap: { [key: string]: PhysicalTable | undefined };
  LogicalTableMap?: { [key: string]: LogicalTable | undefined };
  ImportMode: DataSetImportMode;
  ColumnGroups?: ColumnGroup[];
  FieldFolders?: { [key: string]: FieldFolder | undefined };
  RowLevelPermissionDataSet?: RowLevelPermissionDataSet;
  RowLevelPermissionTagConfiguration?: RowLevelPermissionTagConfiguration;
  ColumnLevelPermissionRules?: ColumnLevelPermissionRule[];
  DataSetUsageConfiguration?: DataSetUsageConfiguration;
  DatasetParameters?: DatasetParameter[];
  PerformanceConfiguration?: PerformanceConfiguration;
  DataPrepConfiguration?: DataPrepConfiguration;
  SemanticModelConfiguration?: SemanticModelConfiguration;
}
export interface UpdateDataSetResponse {
  Arn?: string;
  DataSetId?: string;
  IngestionArn?: string;
  IngestionId?: string;
  RequestId?: string;
  Status?: number;
}
export interface UpdateDataSetPermissionsRequest {
  AwsAccountId: string;
  DataSetId: string;
  GrantPermissions?: ResourcePermission[];
  RevokePermissions?: ResourcePermission[];
}
export interface UpdateDataSetPermissionsResponse {
  DataSetArn?: string;
  DataSetId?: string;
  RequestId?: string;
  Status?: number;
}
export interface UpdateDataSourceRequest {
  AwsAccountId: string;
  DataSourceId: string;
  Name: string;
  DataSourceParameters?: DataSourceParameters;
  Credentials?: DataSourceCredentials;
  VpcConnectionProperties?: VpcConnectionProperties;
  SslProperties?: SslProperties;
}
export interface UpdateDataSourceResponse {
  Arn?: string;
  DataSourceId?: string;
  UpdateStatus?: ResourceStatus;
  RequestId?: string;
  Status?: number;
}
export interface UpdateDataSourcePermissionsRequest {
  AwsAccountId: string;
  DataSourceId: string;
  GrantPermissions?: ResourcePermission[];
  RevokePermissions?: ResourcePermission[];
}
export interface UpdateDataSourcePermissionsResponse {
  DataSourceArn?: string;
  DataSourceId?: string;
  RequestId?: string;
  Status?: number;
}
export interface UpdateDefaultQBusinessApplicationRequest {
  AwsAccountId: string;
  Namespace?: string;
  ApplicationId: string;
}
export interface UpdateDefaultQBusinessApplicationResponse {
  RequestId?: string;
  Status?: number;
}
export interface UpdateDlpSettingRequest {
  AwsAccountId: string;
  DlpSettingId: string;
  Name?: string;
  ProviderType?: DlpProviderType;
  ProviderConfig?: ProviderConfig;
  ProviderOutageAction?: DlpAction;
  Enabled?: boolean;
}
export interface UpdateDlpSettingResponse {
  Arn: string;
  DlpSettingId: string;
  RequestId?: string;
}
export type UpdateFlowRequestClientTokenString = string;
export interface UpdateFlowRequest {
  AwsAccountId: string;
  FlowId: string;
  Name?: string;
  Description?: string;
  FlowDefinition?: any;
  ClientToken?: string;
}
export interface UpdateFlowResponse {
  Arn: string;
  FlowId: string;
  RequestId?: string;
  Status?: number;
}
export type UpdateFlowPermissionsInputGrantPermissionsList = Permission[];
export type UpdateFlowPermissionsInputRevokePermissionsList = Permission[];
export interface UpdateFlowPermissionsInput {
  AwsAccountId: string;
  FlowId: string;
  GrantPermissions?: Permission[];
  RevokePermissions?: Permission[];
}
export interface UpdateFlowPermissionsOutput {
  Status?: number;
  Arn: string;
  Permissions: Permission[];
  RequestId: string;
  FlowId: string;
}
export interface UpdateFolderRequest {
  AwsAccountId: string;
  FolderId: string;
  Name: string;
}
export interface UpdateFolderResponse {
  Status?: number;
  Arn?: string;
  FolderId?: string;
  RequestId?: string;
}
export interface UpdateFolderPermissionsRequest {
  AwsAccountId: string;
  FolderId: string;
  GrantPermissions?: ResourcePermission[];
  RevokePermissions?: ResourcePermission[];
}
export interface UpdateFolderPermissionsResponse {
  Status?: number;
  Arn?: string;
  FolderId?: string;
  Permissions?: ResourcePermission[];
  RequestId?: string;
}
export interface UpdateGroupRequest {
  GroupName: string;
  Description?: string;
  AwsAccountId: string;
  Namespace: string;
}
export interface UpdateGroupResponse {
  Group?: Group;
  RequestId?: string;
  Status?: number;
}
export interface UpdateIAMPolicyAssignmentRequest {
  AwsAccountId: string;
  AssignmentName: string;
  Namespace: string;
  AssignmentStatus?: AssignmentStatus;
  PolicyArn?: string;
  Identities?: { [key: string]: string[] | undefined };
}
export interface UpdateIAMPolicyAssignmentResponse {
  AssignmentName?: string;
  AssignmentId?: string;
  PolicyArn?: string;
  Identities?: { [key: string]: string[] | undefined };
  AssignmentStatus?: AssignmentStatus;
  RequestId?: string;
  Status?: number;
}
export interface UpdateIdentityPropagationConfigRequest {
  AwsAccountId: string;
  Service: ServiceType;
  AuthorizedTargets?: string[];
}
export interface UpdateIdentityPropagationConfigResponse {
  RequestId?: string;
  Status?: number;
}
export interface UpdateIpRestrictionRequest {
  AwsAccountId: string;
  IpRestrictionRuleMap?: { [key: string]: string | undefined };
  VpcIdRestrictionRuleMap?: { [key: string]: string | undefined };
  VpcEndpointIdRestrictionRuleMap?: { [key: string]: string | undefined };
  Enabled?: boolean;
}
export interface UpdateIpRestrictionResponse {
  AwsAccountId?: string;
  RequestId?: string;
  Status?: number;
}
export interface UpdateKeyRegistrationRequest {
  AwsAccountId: string;
  KeyRegistration: RegisteredCustomerManagedKey[];
}
export interface FailedKeyRegistrationEntry {
  KeyArn?: string;
  Message: string;
  StatusCode: number;
  SenderFault: boolean;
}
export type FailedKeyRegistrationEntries = FailedKeyRegistrationEntry[];
export interface SuccessfulKeyRegistrationEntry {
  KeyArn: string;
  StatusCode: number;
}
export type SuccessfulKeyRegistrationEntries = SuccessfulKeyRegistrationEntry[];
export interface UpdateKeyRegistrationResponse {
  FailedKeyRegistration?: FailedKeyRegistrationEntry[];
  SuccessfulKeyRegistration?: SuccessfulKeyRegistrationEntry[];
  RequestId?: string;
}
export interface UpdateKnowledgeBaseRequest {
  AwsAccountId: string;
  KnowledgeBaseId: string;
  Name?: string;
  Description?: string;
  KnowledgeBaseConfiguration?: KnowledgeBaseConfiguration;
  MediaExtractionConfiguration?: MediaExtractionConfiguration;
  IsEmailNotificationOptedForIngestionFailures?: boolean;
  AccessControlConfiguration?: AccessControlConfiguration;
}
export interface UpdateKnowledgeBaseResponse {
  KnowledgeBaseArn: string;
  KnowledgeBaseId: string;
  RequestId?: string;
  Status?: number;
}
export interface UpdateKnowledgeBasePermissionsRequest {
  AwsAccountId: string;
  KnowledgeBaseId: string;
  GrantPermissions?: ResourcePermission[];
  RevokePermissions?: ResourcePermission[];
}
export interface UpdateKnowledgeBasePermissionsResponse {
  KnowledgeBaseArn: string;
  KnowledgeBaseId: string;
  Permissions?: ResourcePermission[];
  RequestId?: string;
  Status?: number;
}
export interface UpdateLimitsProfileRequest {
  profileId: string;
  accountId: string;
  profileName?: string;
  description?: string;
  resourceLimits?: { [key: string]: ProfileLimitValue | undefined };
}
export interface UpdateLimitsProfileResponse {
  arn: string;
}
export interface UpdateOAuthClientApplicationRequest {
  AwsAccountId: string;
  OAuthClientApplicationId: string;
  Name: string;
  ClientId?: string | redacted.Redacted<string>;
  ClientSecret?: string | redacted.Redacted<string>;
  OAuthTokenEndpointUrl?: string | redacted.Redacted<string>;
  OAuthAuthorizationEndpointUrl?: string | redacted.Redacted<string>;
  OAuthScopes?: string;
  DataSourceType?: DataSourceType;
  IdentityProviderVpcConnectionProperties?: VpcConnectionProperties;
}
export interface UpdateOAuthClientApplicationResponse {
  Arn?: string;
  OAuthClientApplicationId?: string;
  UpdateStatus?: ResourceStatus;
  RequestId?: string;
  Status?: number;
}
export interface UpdatePublicSharingSettingsRequest {
  AwsAccountId: string;
  PublicSharingEnabled?: boolean;
}
export interface UpdatePublicSharingSettingsResponse {
  RequestId?: string;
  Status?: number;
}
export interface UpdateQPersonalizationConfigurationRequest {
  AwsAccountId: string;
  PersonalizationMode: PersonalizationMode;
}
export interface UpdateQPersonalizationConfigurationResponse {
  PersonalizationMode?: PersonalizationMode;
  RequestId?: string;
  Status?: number;
}
export interface UpdateQuickSightQSearchConfigurationRequest {
  AwsAccountId: string;
  QSearchStatus: QSearchStatus;
}
export interface UpdateQuickSightQSearchConfigurationResponse {
  QSearchStatus?: QSearchStatus;
  RequestId?: string;
  Status?: number;
}
export interface UpdateRefreshScheduleRequest {
  DataSetId: string;
  AwsAccountId: string;
  Schedule: RefreshSchedule;
}
export interface UpdateRefreshScheduleResponse {
  Status?: number;
  RequestId?: string;
  ScheduleId?: string;
  Arn?: string;
}
export interface UpdateRoleCustomPermissionRequest {
  CustomPermissionsName: string;
  Role: Role;
  AwsAccountId: string;
  Namespace: string;
}
export interface UpdateRoleCustomPermissionResponse {
  RequestId?: string;
  Status?: number;
}
export type SelfUpgradeAdminAction =
  | "APPROVE"
  | "DENY"
  | "VERIFY"
  | (string & {});
export interface UpdateSelfUpgradeRequest {
  AwsAccountId: string;
  Namespace: string;
  UpgradeRequestId: string;
  Action: SelfUpgradeAdminAction;
}
export interface UpdateSelfUpgradeResponse {
  SelfUpgradeRequestDetail?: SelfUpgradeRequestDetail;
  RequestId?: string;
  Status?: number;
}
export interface UpdateSelfUpgradeConfigurationRequest {
  AwsAccountId: string;
  Namespace: string;
  SelfUpgradeStatus: SelfUpgradeStatus;
}
export interface UpdateSelfUpgradeConfigurationResponse {
  RequestId?: string;
  Status?: number;
}
export interface UpdateSpaceRequest {
  AwsAccountId: string;
  SpaceId: string;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
}
export interface UpdateSpaceResponse {
  spaceId: string;
  spaceArn?: string;
  RequestId?: string;
}
export interface UpdateSpacePermissionsRequest {
  AwsAccountId: string;
  SpaceId: string;
  GrantPermissions?: ResourcePermission[];
  RevokePermissions?: ResourcePermission[];
}
export interface UpdateSpacePermissionsResponse {
  spaceId: string;
  spaceArn?: string;
  permissions?: ResourcePermission[];
  requestId?: string;
}
export interface SpaceResourceOperation {
  ResourceType: SpaceQuickSightResourceType;
  ResourceDetails: SpaceQuickSightResourceDetails;
}
export type SpaceResourceOperations = SpaceResourceOperation[];
export interface UpdateSpaceResourcesRequest {
  AwsAccountId: string;
  SpaceId: string;
  AddResources?: SpaceResourceOperation[];
  RemoveResources?: SpaceResourceOperation[];
}
export interface FailedSpaceResourceOperation {
  ResourceType: SpaceQuickSightResourceType;
  ResourceDetails?: SpaceQuickSightResourceDetails;
  ErrorMessage: string;
}
export type FailedSpaceResourceOperations = FailedSpaceResourceOperation[];
export interface UpdateSpaceResourcesResponse {
  spaceId: string;
  spaceArn?: string;
  FailedResourceOperations?: FailedSpaceResourceOperation[];
  RequestId?: string;
}
export type PurchaseMode = "MANUAL" | "AUTO_PURCHASE" | (string & {});
export interface UpdateSPICECapacityConfigurationRequest {
  AwsAccountId: string;
  PurchaseMode: PurchaseMode;
}
export interface UpdateSPICECapacityConfigurationResponse {
  RequestId?: string;
  Status?: number;
}
export interface UpdateTemplateRequest {
  AwsAccountId: string;
  TemplateId: string;
  SourceEntity?: TemplateSourceEntity;
  VersionDescription?: string;
  Name?: string;
  Definition?: TemplateVersionDefinition;
  ValidationStrategy?: ValidationStrategy;
}
export interface UpdateTemplateResponse {
  TemplateId?: string;
  Arn?: string;
  VersionArn?: string;
  CreationStatus?: ResourceStatus;
  Status?: number;
  RequestId?: string;
}
export interface UpdateTemplateAliasRequest {
  AwsAccountId: string;
  TemplateId: string;
  AliasName: string;
  TemplateVersionNumber: number;
}
export interface UpdateTemplateAliasResponse {
  TemplateAlias?: TemplateAlias;
  Status?: number;
  RequestId?: string;
}
export interface UpdateTemplatePermissionsRequest {
  AwsAccountId: string;
  TemplateId: string;
  GrantPermissions?: ResourcePermission[];
  RevokePermissions?: ResourcePermission[];
}
export interface UpdateTemplatePermissionsResponse {
  TemplateId?: string;
  TemplateArn?: string;
  Permissions?: ResourcePermission[];
  RequestId?: string;
  Status?: number;
}
export interface UpdateThemeRequest {
  AwsAccountId: string;
  ThemeId: string;
  Name?: string;
  BaseThemeId: string;
  VersionDescription?: string;
  Configuration?: ThemeConfiguration;
}
export interface UpdateThemeResponse {
  ThemeId?: string;
  Arn?: string;
  VersionArn?: string;
  CreationStatus?: ResourceStatus;
  Status?: number;
  RequestId?: string;
}
export interface UpdateThemeAliasRequest {
  AwsAccountId: string;
  ThemeId: string;
  AliasName: string;
  ThemeVersionNumber: number;
}
export interface UpdateThemeAliasResponse {
  ThemeAlias?: ThemeAlias;
  Status?: number;
  RequestId?: string;
}
export interface UpdateThemePermissionsRequest {
  AwsAccountId: string;
  ThemeId: string;
  GrantPermissions?: ResourcePermission[];
  RevokePermissions?: ResourcePermission[];
}
export interface UpdateThemePermissionsResponse {
  ThemeId?: string;
  ThemeArn?: string;
  Permissions?: ResourcePermission[];
  RequestId?: string;
  Status?: number;
}
export interface UpdateTopicRequest {
  AwsAccountId: string;
  TopicId: string;
  Topic: TopicDetails;
  CustomInstructions?: CustomInstructions;
}
export interface UpdateTopicResponse {
  TopicId?: string;
  Arn?: string;
  RefreshArn?: string;
  RequestId?: string;
  Status?: number;
}
export interface UpdateTopicPermissionsRequest {
  AwsAccountId: string;
  TopicId: string;
  GrantPermissions?: ResourcePermission[];
  RevokePermissions?: ResourcePermission[];
}
export interface UpdateTopicPermissionsResponse {
  TopicId?: string;
  TopicArn?: string;
  Permissions?: ResourcePermission[];
  Status?: number;
  RequestId?: string;
}
export interface UpdateTopicPermissionsV2Request {
  AwsAccountId: string;
  TopicId: string;
  GrantPermissions?: ResourcePermission[];
  RevokePermissions?: ResourcePermission[];
}
export interface UpdateTopicPermissionsV2Response {
  TopicId?: string;
  TopicArn?: string;
  Permissions?: ResourcePermission[];
  Status?: number;
  RequestId?: string;
}
export interface UpdateTopicRefreshScheduleRequest {
  AwsAccountId: string;
  TopicId: string;
  DatasetId: string;
  RefreshSchedule: TopicRefreshSchedule;
}
export interface UpdateTopicRefreshScheduleResponse {
  TopicId?: string;
  TopicArn?: string;
  DatasetArn?: string;
  Status?: number;
  RequestId?: string;
}
export type TopicV2PublishOption = "DRAFT" | "PUBLISH" | (string & {});
export interface UpdateTopicV2Request {
  AwsAccountId: string;
  TopicId: string;
  Topic: TopicV2Details;
  CustomInstructions?: CustomInstructions;
  PublishOption?: TopicV2PublishOption;
}
export interface UpdateTopicV2Response {
  Arn?: string;
  TopicId?: string;
  RequestId?: string;
  Status?: number;
}
export interface UpdateUserRequest {
  UserName: string;
  AwsAccountId: string;
  Namespace: string;
  Email: string;
  Role: UserRole;
  CustomPermissionsName?: string;
  UnapplyCustomPermissions?: boolean;
  ExternalLoginFederationProviderType?: string;
  CustomFederationProviderUrl?: string;
  ExternalLoginId?: string;
}
export interface UpdateUserResponse {
  User?: User;
  RequestId?: string;
  Status?: number;
}
export interface UpdateUserCustomPermissionRequest {
  UserName: string;
  AwsAccountId: string;
  Namespace: string;
  CustomPermissionsName: string;
}
export interface UpdateUserCustomPermissionResponse {
  RequestId?: string;
  Status?: number;
}
export interface UpdateVPCConnectionRequest {
  AwsAccountId: string;
  VPCConnectionId: string;
  Name: string;
  SubnetIds: string[];
  SecurityGroupIds: string[];
  DnsResolvers?: string[];
  RoleArn: string;
}
export interface UpdateVPCConnectionResponse {
  Arn?: string;
  VPCConnectionId?: string;
  UpdateStatus?: VPCConnectionResourceStatus;
  AvailabilityStatus?: VPCConnectionAvailabilityStatus;
  RequestId?: string;
  Status?: number;
}
export type ExceptionResourceType =
  | "USER"
  | "GROUP"
  | "NAMESPACE"
  | "ACCOUNT_SETTINGS"
  | "IAMPOLICY_ASSIGNMENT"
  | "DATA_SOURCE"
  | "DATA_SET"
  | "VPC_CONNECTION"
  | "INGESTION"
  | (string & {});
export type BatchCreateTopicReviewedAnswerError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates new reviewed answers for a Q Topic.
 */
export const batchCreateTopicReviewedAnswer: API.OperationMethod<
  BatchCreateTopicReviewedAnswerRequest,
  BatchCreateTopicReviewedAnswerResponse,
  BatchCreateTopicReviewedAnswerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/topics/{TopicId}/batch-create-reviewed-answers",
    input: {
      AwsAccountId: 0,
      TopicId: 0,
      Answers: D.list({
        AnswerId: 0,
        DatasetArn: 0,
        Question: 0,
        Mir: i_TopicIR,
        PrimaryVisual: i_TopicVisual,
        Template: {
          TemplateType: 0,
          Slots: D.list({ SlotId: 0, VisualId: 0 }),
        },
      }),
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateTopicReviewedAnswer",
})) as any;

export type BatchDeleteKnowledgeBaseError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | InvalidRequestException
  | LimitExceededException
  | PreconditionNotMetException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes one or more knowledge bases.
 */
export const batchDeleteKnowledgeBase: API.OperationMethod<
  BatchDeleteKnowledgeBaseRequest,
  BatchDeleteKnowledgeBaseResponse,
  BatchDeleteKnowledgeBaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/accounts/{AwsAccountId}/knowledge-bases/batch-delete",
    input: { AwsAccountId: 0, KnowledgeBaseIds: 0 },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    InvalidRequestException,
    LimitExceededException,
    PreconditionNotMetException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteKnowledgeBase",
})) as any;

export type BatchDeleteTopicReviewedAnswerError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes reviewed answers for Q Topic.
 */
export const batchDeleteTopicReviewedAnswer: API.OperationMethod<
  BatchDeleteTopicReviewedAnswerRequest,
  BatchDeleteTopicReviewedAnswerResponse,
  BatchDeleteTopicReviewedAnswerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/topics/{TopicId}/batch-delete-reviewed-answers",
    input: { AwsAccountId: 0, TopicId: 0, AnswerIds: 0 },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteTopicReviewedAnswer",
})) as any;

export type BatchDescribeUserLimitsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the effective resource limits for one or more Amazon Quick Sight users, including the limits that apply to each user based on their profile assignments.
 */
export const batchDescribeUserLimits: API.OperationMethod<
  BatchDescribeUserLimitsRequest,
  BatchDescribeUserLimitsResponse,
  BatchDescribeUserLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /governance/limits/accounts/{accountId}/user-limits",
    input: {
      accountId: 0,
      users: D.list({ userName: 0, namespace: 0 }),
      resourceTypes: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDescribeUserLimits",
})) as any;

export type CancelIngestionError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Cancels an ongoing ingestion of data into SPICE.
 */
export const cancelIngestion: API.OperationMethod<
  CancelIngestionRequest,
  CancelIngestionResponse,
  CancelIngestionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/data-sets/{DataSetId}/ingestions/{IngestionId}",
    input: { AwsAccountId: 0, DataSetId: 0, IngestionId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelIngestion",
})) as any;

export type CreateAccountCustomizationError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceExistsException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates Amazon Quick Sight customizations. Currently, you can add a custom default theme by using the
 * `CreateAccountCustomization` or `UpdateAccountCustomization`
 * API operation. To further customize Amazon Quick Sight by removing Amazon Quick Sight
 * sample assets and videos for all new users, see Customizing Quick Sight in the *Amazon Quick Sight User Guide.*
 *
 * You can create customizations for your Amazon Web Services account or, if you specify a namespace, for
 * a Quick Sight namespace instead. Customizations that apply to a namespace always override
 * customizations that apply to an Amazon Web Services account. To find out which customizations apply, use
 * the `DescribeAccountCustomization` API operation.
 *
 * Before you use the `CreateAccountCustomization` API operation to add a theme
 * as the namespace default, make sure that you first share the theme with the namespace.
 * If you don't share it with the namespace, the theme isn't visible to your users
 * even if you make it the default theme.
 * To check if the theme is shared, view the current permissions by using the
 *
 * DescribeThemePermissions
 *
 * API operation.
 * To share the theme, grant permissions by using the
 *
 * UpdateThemePermissions
 *
 * API operation.
 */
export const createAccountCustomization: API.OperationMethod<
  CreateAccountCustomizationRequest,
  CreateAccountCustomizationResponse,
  CreateAccountCustomizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/customizations",
    input: {
      AwsAccountId: 0,
      Namespace: D.m({ query: "namespace" }),
      AccountCustomization: i_AccountCustomization,
      Tags: D.list(i_Tag),
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceExistsException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccountCustomization",
})) as any;

export type CreateAccountSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceExistsException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an Amazon Quick Sight account, or subscribes to Amazon Quick Sight Q.
 *
 * The Amazon Web Services Region for the account is derived from what is configured in the
 * CLI or SDK.
 *
 * Before you use this operation, make sure that you can connect to an existing Amazon Web Services account. If you don't have an Amazon Web Services account, see Sign
 * up for Amazon Web Services in the Amazon Quick Sight User
 * Guide. The person who signs up for Amazon Quick Sight needs to have the
 * correct Identity and Access Management (IAM) permissions. For more information,
 * see IAM Policy Examples for Amazon Quick Sight in the
 * *Amazon Quick Sight User Guide*.
 *
 * If your IAM policy includes both the `Subscribe` and
 * `CreateAccountSubscription` actions, make sure that both actions are set
 * to `Allow`. If either action is set to `Deny`, the
 * `Deny` action prevails and your API call fails.
 *
 * You can't pass an existing IAM role to access other Amazon Web Services services using this API operation. To pass your existing IAM role to
 * Amazon Quick Sight, see Passing IAM roles to Amazon Quick Sight in the
 * *Amazon Quick Sight User Guide*.
 *
 * You can't set default resource access on the new account from the Amazon Quick Sight
 * API. Instead, add default resource access from the Amazon Quick Sight console. For more
 * information about setting default resource access to Amazon Web Services services, see
 * Setting default resource
 * access to Amazon Web Services services in the Amazon Quick Sight
 * User Guide.
 */
export const createAccountSubscription: API.OperationMethod<
  CreateAccountSubscriptionRequest,
  CreateAccountSubscriptionResponse,
  CreateAccountSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /account/{AwsAccountId}",
    input: {
      Edition: 0,
      AuthenticationMethod: 0,
      AwsAccountId: 0,
      AccountName: 0,
      NotificationEmail: 0,
      ActiveDirectoryName: 0,
      Realm: 0,
      DirectoryId: 0,
      AdminGroup: 0,
      AuthorGroup: 0,
      ReaderGroup: 0,
      AdminProGroup: 0,
      AuthorProGroup: 0,
      ReaderProGroup: 0,
      FirstName: 0,
      LastName: 0,
      EmailAddress: 0,
      ContactNumber: 0,
      IAMIdentityCenterInstanceArn: 0,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceExistsException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccountSubscription",
})) as any;

export type CreateActionConnectorError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an action connector that enables Amazon Quick Sight to connect to external services and perform actions.
 * Action connectors support various authentication methods and can be configured with specific actions from supported connector types
 * like Amazon S3, Salesforce, JIRA.
 */
export const createActionConnector: API.OperationMethod<
  CreateActionConnectorRequest,
  CreateActionConnectorResponse,
  CreateActionConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/action-connectors",
    input: {
      AwsAccountId: 0,
      ActionConnectorId: 0,
      Name: 0,
      Type: 0,
      AuthenticationConfig: i_AuthConfig,
      Description: 0,
      Permissions: D.list(i_ResourcePermission),
      VpcConnectionArn: 0,
      Tags: D.list(i_Tag),
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateActionConnector",
})) as any;

export type CreateAgentError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | PreconditionNotMetException
  | ResourceExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an agent in Amazon QuickSight.
 */
export const createAgent: API.OperationMethod<
  CreateAgentRequest,
  CreateAgentResponse,
  CreateAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/agents",
    input: {
      Spaces: 0,
      ActionConnectors: 0,
      AwsAccountId: 0,
      AgentId: 0,
      Name: 0,
      Description: 0,
      IconId: 0,
      StarterPrompts: 0,
      WelcomeMessage: 0,
      AgentLifecycle: 0,
      CustomPromptInput: i_CustomPromptInput,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    PreconditionNotMetException,
    ResourceExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAgent",
})) as any;

export type CreateAnalysisError =
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | QuickSightSubscriptionRequired
  | CommonErrors;
/**
 * Creates an analysis in Amazon Quick Sight. Analyses can be created either from a template or from an `AnalysisDefinition`.
 */
export const createAnalysis: API.OperationMethod<
  CreateAnalysisRequest,
  CreateAnalysisResponse,
  CreateAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/analyses/{AnalysisId}",
    input: {
      AwsAccountId: 0,
      AnalysisId: 0,
      Name: 0,
      Parameters: i_Parameters,
      Permissions: D.list(i_ResourcePermission),
      SourceEntity: i_AnalysisSourceEntity,
      ThemeArn: 0,
      Tags: D.list(i_Tag),
      Definition: i_AnalysisDefinition,
      ValidationStrategy: i_ValidationStrategy,
      FolderArns: 0,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
    QuickSightSubscriptionRequired,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAnalysis",
})) as any;

export type CreateApprovalPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an approval policy in Quick Sight.
 */
export const createApprovalPolicy: API.OperationMethod<
  CreateApprovalPolicyRequest,
  CreateApprovalPolicyResponse,
  CreateApprovalPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /governance/approvalworkflows/policies",
    input: {
      PolicyId: 0,
      Name: 0,
      Description: 0,
      Actions: 0,
      AssetTypes: 0,
      ApplicableTo: i_ApplicableTo,
      ApprovalGroups: 0,
    },
    output: { Policy: o_ApprovalPolicy },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApprovalPolicy",
})) as any;

export type CreateBrandError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidRequestException
  | LimitExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an Quick Sight brand.
 */
export const createBrand: API.OperationMethod<
  CreateBrandRequest,
  CreateBrandResponse,
  CreateBrandError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/brands/{BrandId}",
    input: {
      AwsAccountId: 0,
      BrandId: 0,
      BrandDefinition: i_BrandDefinition,
      Tags: D.list(i_Tag),
    },
    output: { BrandDetail: o_BrandDetail },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidRequestException,
    LimitExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBrand",
})) as any;

export type CreateCustomPermissionsError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | PreconditionNotMetException
  | ResourceExistsException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a custom permissions profile.
 */
export const createCustomPermissions: API.OperationMethod<
  CreateCustomPermissionsRequest,
  CreateCustomPermissionsResponse,
  CreateCustomPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/custom-permissions",
    input: {
      AwsAccountId: 0,
      CustomPermissionsName: 0,
      Capabilities: i_Capabilities,
      Governance: i_Governance,
      Tags: D.list(i_Tag),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    PreconditionNotMetException,
    ResourceExistsException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomPermissions",
})) as any;

export type CreateDashboardError =
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | QuickSightSubscriptionRequired
  | CommonErrors;
/**
 * Creates a dashboard from either a template or directly with a
 * `DashboardDefinition`. To first create a template, see the
 * CreateTemplate
 * API operation.
 *
 * A dashboard is an entity in Amazon Quick Sight that identifies Amazon Quick Sight
 * reports, created from analyses. You can share Amazon Quick Sight dashboards. With the
 * right permissions, you can create scheduled email reports from them. If you have the
 * correct permissions, you can create a dashboard from a template that exists in a
 * different Amazon Web Services account.
 */
export const createDashboard: API.OperationMethod<
  CreateDashboardRequest,
  CreateDashboardResponse,
  CreateDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/dashboards/{DashboardId}",
    input: {
      AwsAccountId: 0,
      DashboardId: 0,
      Name: 0,
      Parameters: i_Parameters,
      Permissions: D.list(i_ResourcePermission),
      SourceEntity: i_DashboardSourceEntity,
      Tags: D.list(i_Tag),
      VersionDescription: 0,
      DashboardPublishOptions: i_DashboardPublishOptions,
      ThemeArn: 0,
      Definition: i_DashboardVersionDefinition,
      ValidationStrategy: i_ValidationStrategy,
      FolderArns: 0,
      LinkSharingConfiguration: { Permissions: D.list(i_ResourcePermission) },
      LinkEntities: 0,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
    QuickSightSubscriptionRequired,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDashboard",
})) as any;

export type CreateDataSetError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidDataSetParameterValueException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | QuickSightSubscriptionRequired
  | CommonErrors;
/**
 * Creates a dataset. This operation doesn't support datasets that include uploaded files
 * as a source.
 */
export const createDataSet: API.OperationMethod<
  CreateDataSetRequest,
  CreateDataSetResponse,
  CreateDataSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/data-sets",
    input: {
      AwsAccountId: 0,
      DataSetId: 0,
      Name: 0,
      PhysicalTableMap: D.map(i_PhysicalTable),
      LogicalTableMap: D.map(i_LogicalTable),
      ImportMode: 0,
      ColumnGroups: D.list(i_ColumnGroup),
      FieldFolders: D.map(i_FieldFolder),
      Permissions: D.list(i_ResourcePermission),
      RowLevelPermissionDataSet: i_RowLevelPermissionDataSet,
      RowLevelPermissionTagConfiguration: i_RowLevelPermissionTagConfiguration,
      ColumnLevelPermissionRules: D.list(i_ColumnLevelPermissionRule),
      Tags: D.list(i_Tag),
      DataSetUsageConfiguration: i_DataSetUsageConfiguration,
      DatasetParameters: D.list(i_DatasetParameter),
      FolderArns: 0,
      PerformanceConfiguration: i_PerformanceConfiguration,
      UseAs: 0,
      DataPrepConfiguration: i_DataPrepConfiguration,
      SemanticModelConfiguration: i_SemanticModelConfiguration,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidDataSetParameterValueException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
    QuickSightSubscriptionRequired,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataSet",
})) as any;

export type CreateDataSourceError =
  | AccessDeniedException
  | ConflictException
  | CustomerManagedKeyUnavailableException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | QuickSightSubscriptionRequired
  | CommonErrors;
/**
 * Creates a data source.
 */
export const createDataSource: API.OperationMethod<
  CreateDataSourceRequest,
  CreateDataSourceResponse,
  CreateDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/data-sources",
    input: {
      AwsAccountId: 0,
      DataSourceId: 0,
      Name: 0,
      Type: 0,
      DataSourceParameters: i_DataSourceParameters,
      Credentials: i_DataSourceCredentials,
      Permissions: D.list(i_ResourcePermission),
      VpcConnectionProperties: i_VpcConnectionProperties,
      SslProperties: i_SslProperties,
      Tags: D.list(i_Tag),
      FolderArns: 0,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    CustomerManagedKeyUnavailableException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    QuickSightSubscriptionRequired,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataSource",
})) as any;

export type CreateDlpSettingError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a data loss prevention (DLP) setting configuration for an Amazon Web Services account. A DLP setting defines the DLP provider, the enforcement behavior, and the Quick capabilities that the setting applies to.
 */
export const createDlpSetting: API.OperationMethod<
  CreateDlpSettingRequest,
  CreateDlpSettingResponse,
  CreateDlpSettingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/data-loss-prevention/settings/{DlpSettingId}",
    input: {
      AwsAccountId: 0,
      DlpSettingId: 0,
      Name: 0,
      ProviderType: 0,
      ProviderConfig: i_ProviderConfig,
      ProviderOutageAction: 0,
      Enabled: 0,
      Tags: D.list(i_Tag),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDlpSetting",
})) as any;

export type CreateFlowError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new flow in the specified Amazon Web Services account. Creates both a DRAFT and PUBLISHED (auto-published) version.
 *
 * This operation is idempotent. Supply a `ClientToken` to safely retry without creating duplicate resources.
 */
export const createFlow: API.OperationMethod<
  CreateFlowRequest,
  CreateFlowResponse,
  CreateFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/flows",
    input: {
      AwsAccountId: 0,
      Name: 0,
      Description: 0,
      FlowDefinition: 0,
      Permissions: D.list(i_Permission),
      ClientToken: D.m({ idempotency: true }),
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFlow",
})) as any;

export type CreateFolderError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Creates an empty shared folder.
 */
export const createFolder: API.OperationMethod<
  CreateFolderRequest,
  CreateFolderResponse,
  CreateFolderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/folders/{FolderId}",
    input: {
      AwsAccountId: 0,
      FolderId: 0,
      Name: 0,
      FolderType: 0,
      ParentFolderArn: 0,
      Permissions: D.list(i_ResourcePermission),
      Tags: D.list(i_Tag),
      SharingModel: 0,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFolder",
})) as any;

export type CreateFolderMembershipError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Adds an asset, such as a dashboard, analysis, or dataset into a folder.
 */
export const createFolderMembership: API.OperationMethod<
  CreateFolderMembershipRequest,
  CreateFolderMembershipResponse,
  CreateFolderMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/folders/{FolderId}/members/{MemberType}/{MemberId}",
    input: { AwsAccountId: 0, FolderId: 0, MemberId: 0, MemberType: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFolderMembership",
})) as any;

export type CreateGroupError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | PreconditionNotMetException
  | ResourceExistsException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Use the `CreateGroup` operation to create a group in Quick Sight. You can create up to 10,000 groups in a namespace. If you want to create more than 10,000 groups in a namespace, contact Amazon Web Services Support.
 *
 * The permissions resource is
 * arn:aws:quicksight::**:group/default/**
 * .
 *
 * The response is a group object.
 */
export const createGroup: API.OperationMethod<
  CreateGroupRequest,
  CreateGroupResponse,
  CreateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/namespaces/{Namespace}/groups",
    input: { GroupName: 0, Description: 0, AwsAccountId: 0, Namespace: 0 },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    PreconditionNotMetException,
    ResourceExistsException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroup",
})) as any;

export type CreateGroupMembershipError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds an Amazon Quick Sight user to an Amazon Quick Sight group.
 */
export const createGroupMembership: API.OperationMethod<
  CreateGroupMembershipRequest,
  CreateGroupMembershipResponse,
  CreateGroupMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/namespaces/{Namespace}/groups/{GroupName}/members/{MemberName}",
    input: { MemberName: 0, GroupName: 0, AwsAccountId: 0, Namespace: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroupMembership",
})) as any;

export type CreateIAMPolicyAssignmentError =
  | AccessDeniedException
  | ConcurrentUpdatingException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an assignment with one specified IAM policy, identified by its
 * Amazon Resource Name (ARN). This policy assignment is attached to the specified groups
 * or users of Amazon Quick Sight. Assignment names are unique per Amazon Web Services
 * account. To avoid overwriting rules in other namespaces, use assignment names that are
 * unique.
 */
export const createIAMPolicyAssignment: API.OperationMethod<
  CreateIAMPolicyAssignmentRequest,
  CreateIAMPolicyAssignmentResponse,
  CreateIAMPolicyAssignmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/namespaces/{Namespace}/iam-policy-assignments",
    input: {
      AwsAccountId: 0,
      AssignmentName: 0,
      AssignmentStatus: 0,
      PolicyArn: 0,
      Identities: 0,
      Namespace: 0,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConcurrentUpdatingException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIAMPolicyAssignment",
})) as any;

export type CreateIngestionError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates and starts a new SPICE ingestion for a dataset. You can manually refresh datasets in
 * an Enterprise edition account 32 times in a 24-hour period. You can manually refresh
 * datasets in a Standard edition account 8 times in a 24-hour period. Each 24-hour period
 * is measured starting 24 hours before the current date and time.
 *
 * Any ingestions operating on tagged datasets inherit the same tags automatically for use in
 * access control. For an example, see How do I create an IAM policy to control access to Amazon EC2 resources using
 * tags? in the Amazon Web Services Knowledge Center. Tags are visible on the tagged dataset, but not on the ingestion resource.
 */
export const createIngestion: API.OperationMethod<
  CreateIngestionRequest,
  CreateIngestionResponse,
  CreateIngestionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/data-sets/{DataSetId}/ingestions/{IngestionId}",
    input: { DataSetId: 0, IngestionId: 0, AwsAccountId: 0, IngestionType: 0 },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIngestion",
})) as any;

export type CreateKnowledgeBaseError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | InvalidRequestException
  | LimitExceededException
  | PreconditionNotMetException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a knowledge base from a specified data source. Supported data source connector types include:
 *
 * - `S3_KNOWLEDGE_BASE` – Uses an Amazon S3 bucket as the data source.
 *
 * - `WEB_CRAWLER` – Uses web pages indexed by the built-in web crawler as the data source.
 *
 * - `GOOGLE_DRIVE` – Uses Google Drive as the data source. Supports service account authentication only.
 *
 * - `SHAREPOINT` – Uses SharePoint as the data source. Supports two-legged OAuth only.
 *
 * - `ONE_DRIVE` – Uses OneDrive as the data source. Supports two-legged OAuth only.
 */
export const createKnowledgeBase: API.OperationMethod<
  CreateKnowledgeBaseRequest,
  CreateKnowledgeBaseResponse,
  CreateKnowledgeBaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/accounts/{AwsAccountId}/knowledge-bases",
    input: {
      AwsAccountId: 0,
      KnowledgeBaseId: 0,
      Name: 0,
      DataSourceArn: 0,
      KnowledgeBaseConfiguration: i_KnowledgeBaseConfiguration,
      Description: 0,
      Permissions: D.list(i_ResourcePermission),
      MediaExtractionConfiguration: i_MediaExtractionConfiguration,
      AccessControlConfiguration: i_AccessControlConfiguration,
      PrimaryOwnerArn: 0,
      Tags: D.list(i_Tag),
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    InvalidRequestException,
    LimitExceededException,
    PreconditionNotMetException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateKnowledgeBase",
})) as any;

export type CreateLimitsProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a limits profile that defines resource usage limits for Amazon Quick Sight users.
 */
export const createLimitsProfile: API.OperationMethod<
  CreateLimitsProfileRequest,
  CreateLimitsProfileResponse,
  CreateLimitsProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /governance/limits/accounts/{accountId}/profiles",
    input: {
      accountId: 0,
      profileName: 0,
      description: 0,
      resourceLimits: D.map(i_ProfileLimitValue),
      clientToken: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLimitsProfile",
})) as any;

export type CreateNamespaceError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | PreconditionNotMetException
  | ResourceExistsException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * (Enterprise edition only) Creates a new namespace for you to use with Amazon Quick Sight.
 *
 * A namespace allows you to isolate the Quick Sight users and groups that are registered
 * for that namespace. Users that access the namespace can share assets only with other
 * users or groups in the same namespace. They can't see users and groups in other
 * namespaces. You can create a namespace after your Amazon Web Services account is subscribed to
 * Quick Sight. The namespace must be unique within the Amazon Web Services account. By default, there is a
 * limit of 100 namespaces per Amazon Web Services account. To increase your limit, create a ticket with
 * Amazon Web Services Support.
 */
export const createNamespace: API.OperationMethod<
  CreateNamespaceRequest,
  CreateNamespaceResponse,
  CreateNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}",
    input: {
      AwsAccountId: 0,
      Namespace: 0,
      IdentityStore: 0,
      Tags: D.list(i_Tag),
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    PreconditionNotMetException,
    ResourceExistsException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNamespace",
})) as any;

export type CreateOAuthClientApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an OAuthClientApplication.
 */
export const createOAuthClientApplication: API.OperationMethod<
  CreateOAuthClientApplicationRequest,
  CreateOAuthClientApplicationResponse,
  CreateOAuthClientApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/oauth-client-applications",
    input: {
      AwsAccountId: 0,
      OAuthClientApplicationId: 0,
      Name: 0,
      OAuthClientAuthenticationType: 0,
      ClientId: 0,
      ClientSecret: 0,
      OAuthTokenEndpointUrl: 0,
      OAuthAuthorizationEndpointUrl: 0,
      OAuthScopes: 0,
      DataSourceType: 0,
      IdentityProviderVpcConnectionProperties: i_VpcConnectionProperties,
      Tags: D.list(i_Tag),
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOAuthClientApplication",
})) as any;

export type CreateRefreshScheduleError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | PreconditionNotMetException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a refresh schedule for a dataset. You can create up to 5 different schedules for a single dataset.
 */
export const createRefreshSchedule: API.OperationMethod<
  CreateRefreshScheduleRequest,
  CreateRefreshScheduleResponse,
  CreateRefreshScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/data-sets/{DataSetId}/refresh-schedules",
    input: { DataSetId: 0, AwsAccountId: 0, Schedule: i_RefreshSchedule },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    PreconditionNotMetException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRefreshSchedule",
})) as any;

export type CreateRoleMembershipError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Use `CreateRoleMembership` to add an existing Quick Sight group to an existing role.
 */
export const createRoleMembership: API.OperationMethod<
  CreateRoleMembershipRequest,
  CreateRoleMembershipResponse,
  CreateRoleMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/namespaces/{Namespace}/roles/{Role}/members/{MemberName}",
    input: { MemberName: 0, AwsAccountId: 0, Namespace: 0, Role: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRoleMembership",
})) as any;

export type CreateSpaceError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new Amazon QuickSight space. A space is a collection of resources that can be used to organize and manage QuickSight assets.
 */
export const createSpace: API.OperationMethod<
  CreateSpaceRequest,
  CreateSpaceResponse,
  CreateSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/accounts/{AwsAccountId}/spaces",
    input: { AwsAccountId: 0, SpaceId: 0, Name: 0, Description: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSpace",
})) as any;

export type CreateTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Creates a template either from a `TemplateDefinition` or from an existing Quick Sight analysis or template. You can use the resulting
 * template to create additional dashboards, templates, or analyses.
 *
 * A *template* is an entity in Quick Sight that encapsulates the metadata
 * required to create an analysis and that you can use to create s dashboard. A template adds
 * a layer of abstraction by using placeholders to replace the dataset associated with the
 * analysis. You can use templates to create dashboards by replacing dataset placeholders
 * with datasets that follow the same schema that was used to create the source analysis
 * and template.
 */
export const createTemplate: API.OperationMethod<
  CreateTemplateRequest,
  CreateTemplateResponse,
  CreateTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/templates/{TemplateId}",
    input: {
      AwsAccountId: 0,
      TemplateId: 0,
      Name: 0,
      Permissions: D.list(i_ResourcePermission),
      SourceEntity: i_TemplateSourceEntity,
      Tags: D.list(i_Tag),
      VersionDescription: 0,
      Definition: i_TemplateVersionDefinition,
      ValidationStrategy: i_ValidationStrategy,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTemplate",
})) as any;

export type CreateTemplateAliasError =
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Creates a template alias for a template.
 */
export const createTemplateAlias: API.OperationMethod<
  CreateTemplateAliasRequest,
  CreateTemplateAliasResponse,
  CreateTemplateAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/templates/{TemplateId}/aliases/{AliasName}",
    input: {
      AwsAccountId: 0,
      TemplateId: 0,
      AliasName: 0,
      TemplateVersionNumber: 0,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTemplateAlias",
})) as any;

export type CreateThemeError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Creates a theme.
 *
 * A *theme* is set of configuration options for color and layout.
 * Themes apply to analyses and dashboards. For more information, see Using
 * Themes in Amazon Quick Sight in the *Amazon Quick Sight User Guide*.
 */
export const createTheme: API.OperationMethod<
  CreateThemeRequest,
  CreateThemeResponse,
  CreateThemeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/themes/{ThemeId}",
    input: {
      AwsAccountId: 0,
      ThemeId: 0,
      Name: 0,
      BaseThemeId: 0,
      VersionDescription: 0,
      Configuration: i_ThemeConfiguration,
      Permissions: D.list(i_ResourcePermission),
      Tags: D.list(i_Tag),
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTheme",
})) as any;

export type CreateThemeAliasError =
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Creates a theme alias for a theme.
 */
export const createThemeAlias: API.OperationMethod<
  CreateThemeAliasRequest,
  CreateThemeAliasResponse,
  CreateThemeAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/themes/{ThemeId}/aliases/{AliasName}",
    input: { AwsAccountId: 0, ThemeId: 0, AliasName: 0, ThemeVersionNumber: 0 },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateThemeAlias",
})) as any;

export type CreateTopicError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new Q topic.
 */
export const createTopic: API.OperationMethod<
  CreateTopicRequest,
  CreateTopicResponse,
  CreateTopicError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/topics",
    input: {
      AwsAccountId: 0,
      TopicId: 0,
      Topic: i_TopicDetails,
      Tags: D.list(i_Tag),
      FolderArns: 0,
      CustomInstructions: i_CustomInstructions,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTopic",
})) as any;

export type CreateTopicRefreshScheduleError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a topic refresh schedule.
 */
export const createTopicRefreshSchedule: API.OperationMethod<
  CreateTopicRefreshScheduleRequest,
  CreateTopicRefreshScheduleResponse,
  CreateTopicRefreshScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/topics/{TopicId}/schedules",
    input: {
      AwsAccountId: 0,
      TopicId: 0,
      DatasetArn: 0,
      DatasetName: 0,
      RefreshSchedule: i_TopicRefreshSchedule,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTopicRefreshSchedule",
})) as any;

export type CreateTopicV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new Q topic.
 */
export const createTopicV2: API.OperationMethod<
  CreateTopicV2Request,
  CreateTopicV2Response,
  CreateTopicV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/topicsV2",
    input: {
      AwsAccountId: 0,
      TopicId: 0,
      Topic: i_TopicV2Details,
      Tags: D.list(i_Tag),
      FolderArns: 0,
      CustomInstructions: i_CustomInstructions,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTopicV2",
})) as any;

export type CreateVPCConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceExistsException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Creates a new VPC connection.
 */
export const createVPCConnection: API.OperationMethod<
  CreateVPCConnectionRequest,
  CreateVPCConnectionResponse,
  CreateVPCConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/vpc-connections",
    input: {
      AwsAccountId: 0,
      VPCConnectionId: 0,
      Name: 0,
      SubnetIds: 0,
      SecurityGroupIds: 0,
      DnsResolvers: 0,
      RoleArn: 0,
      Tags: D.list(i_Tag),
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceExistsException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVPCConnection",
})) as any;

export type DeleteAccountCustomizationError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * This API permanently deletes all Quick Sight customizations for the specified Amazon Web Services account and namespace. When you delete account customizations:
 *
 * - All customizations are removed including themes, branding, and visual settings
 *
 * - This action cannot be undone through the API
 *
 * - Users will see default Quick Sight styling after customizations are deleted
 *
 * **Before proceeding:** Ensure you have backups of any custom themes or branding elements you may want to recreate.
 *
 * Deletes all Amazon Quick Sight customizations for the specified Amazon Web Services account and Quick Sight namespace.
 */
export const deleteAccountCustomization: API.OperationMethod<
  DeleteAccountCustomizationRequest,
  DeleteAccountCustomizationResponse,
  DeleteAccountCustomizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/customizations",
    input: { AwsAccountId: 0, Namespace: D.m({ query: "namespace" }) },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccountCustomization",
})) as any;

export type DeleteAccountCustomPermissionError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Unapplies a custom permissions profile from an account.
 */
export const deleteAccountCustomPermission: API.OperationMethod<
  DeleteAccountCustomPermissionRequest,
  DeleteAccountCustomPermissionResponse,
  DeleteAccountCustomPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/custom-permission",
    input: { AwsAccountId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccountCustomPermission",
})) as any;

export type DeleteAccountSubscriptionError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Deleting your Quick Sight account subscription has permanent, irreversible consequences across all Amazon Web Services regions:
 *
 * - Global deletion – Running this operation from any single region will delete your Quick Sight account and all data in every Amazon Web Services region where you have Quick Sight resources.
 *
 * - Complete data loss – All dashboards, analyses, datasets, data sources, and custom visuals will be permanently deleted across all regions.
 *
 * - Embedded content failure – All embedded dashboards and visuals in your applications will immediately stop working and display errors to end users.
 *
 * - Shared resources removed – All shared dashboards, folders, and resources will become inaccessible to other users and external recipients.
 *
 * - User access terminated – All Quick Sight users in your account will lose access immediately, including authors, readers, and administrators.
 *
 * - **No recovery possible** – Once deleted, your Quick Sight account and all associated data cannot be restored.
 *
 * Consider exporting critical dashboards and data before proceeding with account deletion.
 *
 * Use the `DeleteAccountSubscription` operation to delete an Quick Sight account. This operation will result in an error message if you have configured your account termination protection settings to `True`. To change this setting and delete your account, call the `UpdateAccountSettings` API and set the value of the `TerminationProtectionEnabled` parameter to `False`, then make another call to the `DeleteAccountSubscription` API.
 */
export const deleteAccountSubscription: API.OperationMethod<
  DeleteAccountSubscriptionRequest,
  DeleteAccountSubscriptionResponse,
  DeleteAccountSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /account/{AwsAccountId}",
    input: { AwsAccountId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccountSubscription",
})) as any;

export type DeleteActionConnectorError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Hard deletes an action connector, making it unrecoverable. This operation removes the connector and all its associated configurations. Any resources currently using this action connector will no longer be able to perform actions through it.
 */
export const deleteActionConnector: API.OperationMethod<
  DeleteActionConnectorRequest,
  DeleteActionConnectorResponse,
  DeleteActionConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/action-connectors/{ActionConnectorId}",
    input: { AwsAccountId: 0, ActionConnectorId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteActionConnector",
})) as any;

export type DeleteAgentError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an agent.
 */
export const deleteAgent: API.OperationMethod<
  DeleteAgentRequest,
  DeleteAgentResponse,
  DeleteAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/agents/{AgentId}",
    input: { AgentId: 0, AwsAccountId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAgent",
})) as any;

export type DeleteAnalysisError =
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Deletes an analysis from Amazon Quick Sight. You can optionally include a recovery window during
 * which you can restore the analysis. If you don't specify a recovery window value, the
 * operation defaults to 30 days. Amazon Quick Sight attaches a `DeletionTime` stamp to
 * the response that specifies the end of the recovery window. At the end of the recovery
 * window, Amazon Quick Sight deletes the analysis permanently.
 *
 * At any time before recovery window ends, you can use the `RestoreAnalysis`
 * API operation to remove the `DeletionTime` stamp and cancel the deletion of
 * the analysis. The analysis remains visible in the API until it's deleted, so you can
 * describe it but you can't make a template from it.
 *
 * An analysis that's scheduled for deletion isn't accessible in the Amazon Quick Sight console.
 * To access it in the console, restore it. Deleting an analysis doesn't delete the
 * dashboards that you publish from it.
 */
export const deleteAnalysis: API.OperationMethod<
  DeleteAnalysisRequest,
  DeleteAnalysisResponse,
  DeleteAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/analyses/{AnalysisId}",
    input: {
      AwsAccountId: 0,
      AnalysisId: 0,
      RecoveryWindowInDays: D.m({ query: "recovery-window-in-days" }),
      ForceDeleteWithoutRecovery: D.m({
        query: "force-delete-without-recovery",
      }),
    },
    output: { Status: D.m({ status: true }), DeletionTime: D.ts },
  },
  errors: [
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAnalysis",
})) as any;

export type DeleteApprovalPolicyError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an approval policy in Quick Sight.
 */
export const deleteApprovalPolicy: API.OperationMethod<
  DeleteApprovalPolicyRequest,
  DeleteApprovalPolicyResponse,
  DeleteApprovalPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /governance/approvalworkflows/policies/{PolicyId}",
    input: { PolicyId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApprovalPolicy",
})) as any;

export type DeleteBrandError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API permanently deletes the specified Quick Sight brand. When you delete a brand:
 *
 * - The brand and all its associated branding elements are permanently removed
 *
 * - Any applications or dashboards using this brand will revert to default styling
 *
 * - This action cannot be undone through the API
 *
 * **Before proceeding:** Verify that the brand is no longer needed and consider the impact on any applications currently using this brand.
 *
 * Deletes an Quick Sight brand.
 */
export const deleteBrand: API.OperationMethod<
  DeleteBrandRequest,
  DeleteBrandResponse,
  DeleteBrandError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/brands/{BrandId}",
    input: { AwsAccountId: 0, BrandId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBrand",
})) as any;

export type DeleteBrandAssignmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a brand assignment.
 */
export const deleteBrandAssignment: API.OperationMethod<
  DeleteBrandAssignmentRequest,
  DeleteBrandAssignmentResponse,
  DeleteBrandAssignmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/brandassignments",
    input: { AwsAccountId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBrandAssignment",
})) as any;

export type DeleteCustomPermissionsError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceExistsException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a custom permissions profile.
 */
export const deleteCustomPermissions: API.OperationMethod<
  DeleteCustomPermissionsRequest,
  DeleteCustomPermissionsResponse,
  DeleteCustomPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/custom-permissions/{CustomPermissionsName}",
    input: { AwsAccountId: 0, CustomPermissionsName: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceExistsException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomPermissions",
})) as any;

export type DeleteDashboardError =
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Deletes a dashboard.
 */
export const deleteDashboard: API.OperationMethod<
  DeleteDashboardRequest,
  DeleteDashboardResponse,
  DeleteDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/dashboards/{DashboardId}",
    input: {
      AwsAccountId: 0,
      DashboardId: 0,
      VersionNumber: D.m({ query: "version-number" }),
    },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDashboard",
})) as any;

export type DeleteDataSetError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a dataset.
 */
export const deleteDataSet: API.OperationMethod<
  DeleteDataSetRequest,
  DeleteDataSetResponse,
  DeleteDataSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/data-sets/{DataSetId}",
    input: { AwsAccountId: 0, DataSetId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataSet",
})) as any;

export type DeleteDataSetRefreshPropertiesError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the dataset refresh properties of the dataset.
 */
export const deleteDataSetRefreshProperties: API.OperationMethod<
  DeleteDataSetRefreshPropertiesRequest,
  DeleteDataSetRefreshPropertiesResponse,
  DeleteDataSetRefreshPropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/data-sets/{DataSetId}/refresh-properties",
    input: { AwsAccountId: 0, DataSetId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataSetRefreshProperties",
})) as any;

export type DeleteDataSourceError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the data source permanently. This operation breaks all the datasets that
 * reference the deleted data source.
 */
export const deleteDataSource: API.OperationMethod<
  DeleteDataSourceRequest,
  DeleteDataSourceResponse,
  DeleteDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/data-sources/{DataSourceId}",
    input: { AwsAccountId: 0, DataSourceId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataSource",
})) as any;

export type DeleteDefaultQBusinessApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a linked Amazon Q Business application from an Quick Sight account
 */
export const deleteDefaultQBusinessApplication: API.OperationMethod<
  DeleteDefaultQBusinessApplicationRequest,
  DeleteDefaultQBusinessApplicationResponse,
  DeleteDefaultQBusinessApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/default-qbusiness-application",
    input: { AwsAccountId: 0, Namespace: D.m({ query: "namespace" }) },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDefaultQBusinessApplication",
})) as any;

export type DeleteDlpSettingError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a DLP setting configuration from an Amazon Web Services account.
 */
export const deleteDlpSetting: API.OperationMethod<
  DeleteDlpSettingRequest,
  DeleteDlpSettingResponse,
  DeleteDlpSettingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/data-loss-prevention/settings/{DlpSettingId}",
    input: { AwsAccountId: 0, DlpSettingId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDlpSetting",
})) as any;

export type DeleteFlowError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Permanently deletes a flow from the specified Amazon Web Services account. This operation cannot be undone.
 */
export const deleteFlow: API.OperationMethod<
  DeleteFlowRequest,
  DeleteFlowResponse,
  DeleteFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/flows/{FlowId}",
    input: { AwsAccountId: 0, FlowId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFlow",
})) as any;

export type DeleteFolderError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Deletes an empty folder.
 */
export const deleteFolder: API.OperationMethod<
  DeleteFolderRequest,
  DeleteFolderResponse,
  DeleteFolderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/folders/{FolderId}",
    input: { AwsAccountId: 0, FolderId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFolder",
})) as any;

export type DeleteFolderMembershipError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Removes an asset, such as a dashboard, analysis, or dataset, from a folder.
 */
export const deleteFolderMembership: API.OperationMethod<
  DeleteFolderMembershipRequest,
  DeleteFolderMembershipResponse,
  DeleteFolderMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/folders/{FolderId}/members/{MemberType}/{MemberId}",
    input: { AwsAccountId: 0, FolderId: 0, MemberId: 0, MemberType: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFolderMembership",
})) as any;

export type DeleteGroupError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes a user group from Amazon Quick Sight.
 */
export const deleteGroup: API.OperationMethod<
  DeleteGroupRequest,
  DeleteGroupResponse,
  DeleteGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/namespaces/{Namespace}/groups/{GroupName}",
    input: { GroupName: 0, AwsAccountId: 0, Namespace: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroup",
})) as any;

export type DeleteGroupMembershipError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes a user from a group so that the user is no longer a member of the group.
 */
export const deleteGroupMembership: API.OperationMethod<
  DeleteGroupMembershipRequest,
  DeleteGroupMembershipResponse,
  DeleteGroupMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/namespaces/{Namespace}/groups/{GroupName}/members/{MemberName}",
    input: { MemberName: 0, GroupName: 0, AwsAccountId: 0, Namespace: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroupMembership",
})) as any;

export type DeleteIAMPolicyAssignmentError =
  | AccessDeniedException
  | ConcurrentUpdatingException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an existing IAM policy assignment.
 */
export const deleteIAMPolicyAssignment: API.OperationMethod<
  DeleteIAMPolicyAssignmentRequest,
  DeleteIAMPolicyAssignmentResponse,
  DeleteIAMPolicyAssignmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/namespace/{Namespace}/iam-policy-assignments/{AssignmentName}",
    input: { AwsAccountId: 0, AssignmentName: 0, Namespace: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    ConcurrentUpdatingException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIAMPolicyAssignment",
})) as any;

export type DeleteIdentityPropagationConfigError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes all access scopes and authorized targets that are associated with a service from the Quick Sight IAM Identity Center application.
 *
 * This operation is only supported for Quick Sight accounts that use IAM Identity Center.
 */
export const deleteIdentityPropagationConfig: API.OperationMethod<
  DeleteIdentityPropagationConfigRequest,
  DeleteIdentityPropagationConfigResponse,
  DeleteIdentityPropagationConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/identity-propagation-config/{Service}",
    input: { AwsAccountId: 0, Service: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIdentityPropagationConfig",
})) as any;

export type DeleteKnowledgeBaseError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | InvalidRequestException
  | LimitExceededException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a knowledge base.
 */
export const deleteKnowledgeBase: API.OperationMethod<
  DeleteKnowledgeBaseRequest,
  DeleteKnowledgeBaseResponse,
  DeleteKnowledgeBaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/accounts/{AwsAccountId}/knowledge-bases/{KnowledgeBaseId}",
    input: { AwsAccountId: 0, KnowledgeBaseId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    InvalidRequestException,
    LimitExceededException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteKnowledgeBase",
})) as any;

export type DeleteLimitsProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a limits profile.
 */
export const deleteLimitsProfile: API.OperationMethod<
  DeleteLimitsProfileRequest,
  DeleteLimitsProfileResponse,
  DeleteLimitsProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /governance/limits/accounts/{accountId}/profiles/{profileId}",
    input: { profileId: 0, accountId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLimitsProfile",
})) as any;

export type DeleteNamespaceError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a namespace and the users and groups that are associated with the namespace.
 * This is an asynchronous process. Assets including dashboards, analyses, datasets and data sources are not
 * deleted. To delete these assets, you use the API operations for the relevant asset.
 */
export const deleteNamespace: API.OperationMethod<
  DeleteNamespaceRequest,
  DeleteNamespaceResponse,
  DeleteNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/namespaces/{Namespace}",
    input: { AwsAccountId: 0, Namespace: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNamespace",
})) as any;

export type DeleteOAuthClientApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an OAuthClientApplication.
 */
export const deleteOAuthClientApplication: API.OperationMethod<
  DeleteOAuthClientApplicationRequest,
  DeleteOAuthClientApplicationResponse,
  DeleteOAuthClientApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/oauth-client-applications/{OAuthClientApplicationId}",
    input: { AwsAccountId: 0, OAuthClientApplicationId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOAuthClientApplication",
})) as any;

export type DeleteRefreshScheduleError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a refresh schedule from a dataset.
 */
export const deleteRefreshSchedule: API.OperationMethod<
  DeleteRefreshScheduleRequest,
  DeleteRefreshScheduleResponse,
  DeleteRefreshScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/data-sets/{DataSetId}/refresh-schedules/{ScheduleId}",
    input: { DataSetId: 0, AwsAccountId: 0, ScheduleId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRefreshSchedule",
})) as any;

export type DeleteRoleCustomPermissionError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes custom permissions from the role.
 */
export const deleteRoleCustomPermission: API.OperationMethod<
  DeleteRoleCustomPermissionRequest,
  DeleteRoleCustomPermissionResponse,
  DeleteRoleCustomPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/namespaces/{Namespace}/roles/{Role}/custom-permission",
    input: { Role: 0, AwsAccountId: 0, Namespace: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRoleCustomPermission",
})) as any;

export type DeleteRoleMembershipError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes a group from a role.
 */
export const deleteRoleMembership: API.OperationMethod<
  DeleteRoleMembershipRequest,
  DeleteRoleMembershipResponse,
  DeleteRoleMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/namespaces/{Namespace}/roles/{Role}/members/{MemberName}",
    input: { MemberName: 0, Role: 0, AwsAccountId: 0, Namespace: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRoleMembership",
})) as any;

export type DeleteSpaceError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an Amazon QuickSight space.
 */
export const deleteSpace: API.OperationMethod<
  DeleteSpaceRequest,
  DeleteSpaceResponse,
  DeleteSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/accounts/{AwsAccountId}/spaces/{SpaceId}",
    input: { AwsAccountId: 0, SpaceId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSpace",
})) as any;

export type DeleteTemplateError =
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Deletes a template.
 */
export const deleteTemplate: API.OperationMethod<
  DeleteTemplateRequest,
  DeleteTemplateResponse,
  DeleteTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/templates/{TemplateId}",
    input: {
      AwsAccountId: 0,
      TemplateId: 0,
      VersionNumber: D.m({ query: "version-number" }),
    },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTemplate",
})) as any;

export type DeleteTemplateAliasError =
  | ConflictException
  | InternalFailureException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Deletes the item that the specified template alias points to. If you provide a specific
 * alias, you delete the version of the template that the alias points to.
 */
export const deleteTemplateAlias: API.OperationMethod<
  DeleteTemplateAliasRequest,
  DeleteTemplateAliasResponse,
  DeleteTemplateAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/templates/{TemplateId}/aliases/{AliasName}",
    input: { AwsAccountId: 0, TemplateId: 0, AliasName: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    ConflictException,
    InternalFailureException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTemplateAlias",
})) as any;

export type DeleteThemeError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Deletes a theme.
 */
export const deleteTheme: API.OperationMethod<
  DeleteThemeRequest,
  DeleteThemeResponse,
  DeleteThemeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/themes/{ThemeId}",
    input: {
      AwsAccountId: 0,
      ThemeId: 0,
      VersionNumber: D.m({ query: "version-number" }),
    },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTheme",
})) as any;

export type DeleteThemeAliasError =
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Deletes the version of the theme that the specified theme alias points to.
 * If you provide a specific alias, you delete the version of the theme
 * that the alias points to.
 */
export const deleteThemeAlias: API.OperationMethod<
  DeleteThemeAliasRequest,
  DeleteThemeAliasResponse,
  DeleteThemeAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/themes/{ThemeId}/aliases/{AliasName}",
    input: { AwsAccountId: 0, ThemeId: 0, AliasName: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteThemeAlias",
})) as any;

export type DeleteTopicError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a topic.
 */
export const deleteTopic: API.OperationMethod<
  DeleteTopicRequest,
  DeleteTopicResponse,
  DeleteTopicError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/topics/{TopicId}",
    input: { AwsAccountId: 0, TopicId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTopic",
})) as any;

export type DeleteTopicRefreshScheduleError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a topic refresh schedule.
 */
export const deleteTopicRefreshSchedule: API.OperationMethod<
  DeleteTopicRefreshScheduleRequest,
  DeleteTopicRefreshScheduleResponse,
  DeleteTopicRefreshScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/topics/{TopicId}/schedules/{DatasetId}",
    input: { AwsAccountId: 0, TopicId: 0, DatasetId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTopicRefreshSchedule",
})) as any;

export type DeleteTopicV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a Q topic.
 */
export const deleteTopicV2: API.OperationMethod<
  DeleteTopicV2Request,
  DeleteTopicV2Response,
  DeleteTopicV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/topicsV2/{TopicId}",
    input: { AwsAccountId: 0, TopicId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTopicV2",
})) as any;

export type DeleteUserError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the Amazon Quick Sight user that is associated with the identity of the
 * IAM user or role that's making the call. The IAM user
 * isn't deleted as a result of this call.
 */
export const deleteUser: API.OperationMethod<
  DeleteUserRequest,
  DeleteUserResponse,
  DeleteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/namespaces/{Namespace}/users/{UserName}",
    input: { UserName: 0, AwsAccountId: 0, Namespace: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUser",
})) as any;

export type DeleteUserByPrincipalIdError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a user identified by its principal ID.
 */
export const deleteUserByPrincipalId: API.OperationMethod<
  DeleteUserByPrincipalIdRequest,
  DeleteUserByPrincipalIdResponse,
  DeleteUserByPrincipalIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/namespaces/{Namespace}/user-principals/{PrincipalId}",
    input: { PrincipalId: 0, AwsAccountId: 0, Namespace: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserByPrincipalId",
})) as any;

export type DeleteUserCustomPermissionError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a custom permissions profile from a user.
 */
export const deleteUserCustomPermission: API.OperationMethod<
  DeleteUserCustomPermissionRequest,
  DeleteUserCustomPermissionResponse,
  DeleteUserCustomPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/namespaces/{Namespace}/users/{UserName}/custom-permission",
    input: { UserName: 0, AwsAccountId: 0, Namespace: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserCustomPermission",
})) as any;

export type DeleteVPCConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Deletes a VPC connection.
 */
export const deleteVPCConnection: API.OperationMethod<
  DeleteVPCConnectionRequest,
  DeleteVPCConnectionResponse,
  DeleteVPCConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accounts/{AwsAccountId}/vpc-connections/{VPCConnectionId}",
    input: { AwsAccountId: 0, VPCConnectionId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVPCConnection",
})) as any;

export type DescribeAccountCustomizationError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the customizations associated with the provided Amazon Web Services account and Amazon
 * Quick Sight namespace. The Quick Sight console evaluates which
 * customizations to apply by running this API operation with the `Resolved` flag
 * included.
 *
 * To determine what customizations display when you run this command, it can help to
 * visualize the relationship of the entities involved.
 *
 * - `Amazon Web Services account` - The Amazon Web Services account exists at the top of the hierarchy.
 * It has the potential to use all of the Amazon Web Services Regions and Amazon Web Services Services. When you
 * subscribe to Quick Sight, you choose one Amazon Web Services Region to use as your home Region.
 * That's where your free SPICE capacity is located. You can use Quick Sight in any
 * supported Amazon Web Services Region.
 *
 * - `Amazon Web Services Region` - You can sign in to Quick Sight in any Amazon Web Services Region. If
 * you have a user directory, it resides in us-east-1, which is US East (N.
 * Virginia). Generally speaking, these users have access to Quick Sight in any
 * Amazon Web Services Region, unless they are constrained to a namespace.
 *
 * To run the command in a different Amazon Web Services Region, you change your Region settings.
 * If you're using the CLI, you can use one of the following options:
 *
 * - Use command line options.
 *
 * - Use named profiles.
 *
 * - Run `aws configure` to change your default Amazon Web Services Region. Use
 * Enter to key the same settings for your keys. For more information, see
 * Configuring the CLI.
 *
 * - `Namespace` - A Quick Sight namespace is a partition that contains
 * users and assets (data sources, datasets, dashboards, and so on). To access
 * assets that are in a specific namespace, users and groups must also be part of
 * the same namespace. People who share a namespace are completely isolated from
 * users and assets in other namespaces, even if they are in the same Amazon Web Services account
 * and Amazon Web Services Region.
 *
 * - `Applied customizations` - Quick Sight customizations can apply to an Amazon Web Services account or to a namespace.
 * Settings that you apply to a namespace override settings that you apply to an
 * Amazon Web Services account.
 */
export const describeAccountCustomization: API.OperationMethod<
  DescribeAccountCustomizationRequest,
  DescribeAccountCustomizationResponse,
  DescribeAccountCustomizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/customizations",
    input: {
      AwsAccountId: 0,
      Namespace: D.m({ query: "namespace" }),
      Resolved: D.m({ query: "resolved" }),
    },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountCustomization",
})) as any;

export type DescribeAccountCustomPermissionError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the custom permissions profile that is applied to an account.
 */
export const describeAccountCustomPermission: API.OperationMethod<
  DescribeAccountCustomPermissionRequest,
  DescribeAccountCustomPermissionResponse,
  DescribeAccountCustomPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/custom-permission",
    input: { AwsAccountId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountCustomPermission",
})) as any;

export type DescribeAccountSettingsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the settings that were used when your Quick Sight subscription was first
 * created in this Amazon Web Services account.
 */
export const describeAccountSettings: API.OperationMethod<
  DescribeAccountSettingsRequest,
  DescribeAccountSettingsResponse,
  DescribeAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/settings",
    input: { AwsAccountId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountSettings",
})) as any;

export type DescribeAccountSubscriptionError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Use the DescribeAccountSubscription operation to receive a description of an Quick Sight account's subscription. A successful API call returns an `AccountInfo` object that includes an account's name, subscription status, authentication type, edition, and notification email address.
 */
export const describeAccountSubscription: API.OperationMethod<
  DescribeAccountSubscriptionRequest,
  DescribeAccountSubscriptionResponse,
  DescribeAccountSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /account/{AwsAccountId}",
    input: { AwsAccountId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountSubscription",
})) as any;

export type DescribeActionConnectorError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves detailed information about an action connector, including its configuration, authentication settings, enabled actions, and current status.
 */
export const describeActionConnector: API.OperationMethod<
  DescribeActionConnectorRequest,
  DescribeActionConnectorResponse,
  DescribeActionConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/action-connectors/{ActionConnectorId}",
    input: { AwsAccountId: 0, ActionConnectorId: 0 },
    output: {
      ActionConnector: {
        Name: D.secret,
        CreatedTime: D.ts,
        LastUpdatedTime: D.ts,
        Description: D.secret,
        AuthenticationConfig: {
          AuthenticationMetadata: {
            BasicAuthConnectionMetadata: { Username: D.secret },
            ApiKeyConnectionMetadata: { Email: D.secret },
          },
        },
      },
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeActionConnector",
})) as any;

export type DescribeActionConnectorPermissionsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the permissions configuration for an action connector, showing which users, groups, and namespaces have access and what operations they can perform.
 */
export const describeActionConnectorPermissions: API.OperationMethod<
  DescribeActionConnectorPermissionsRequest,
  DescribeActionConnectorPermissionsResponse,
  DescribeActionConnectorPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/action-connectors/{ActionConnectorId}/permissions",
    input: { AwsAccountId: 0, ActionConnectorId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeActionConnectorPermissions",
})) as any;

export type DescribeAgentError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes an agent.
 */
export const describeAgent: API.OperationMethod<
  DescribeAgentRequest,
  DescribeAgentResponse,
  DescribeAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/agents/{AgentId}",
    input: { AgentId: 0, AwsAccountId: 0 },
    output: {
      Agent: {
        WelcomeMessage: D.secret,
        CreatedAt: D.ts,
        CustomPromptInterface: {
          ResponseLength: D.secret,
          OutputStyle: D.secret,
          Identity: D.secret,
          Tone: D.secret,
          CustomInstructions: D.secret,
          promptSummary: D.secret,
        },
        UpdatedAt: D.ts,
      },
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAgent",
})) as any;

export type DescribeAgentPermissionsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the resource permissions for an agent.
 */
export const describeAgentPermissions: API.OperationMethod<
  DescribeAgentPermissionsRequest,
  DescribeAgentPermissionsResponse,
  DescribeAgentPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/agents/{AgentId}/permissions",
    input: { AgentId: 0, AwsAccountId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAgentPermissions",
})) as any;

export type DescribeAnalysisError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Provides a summary of the metadata for an analysis.
 */
export const describeAnalysis: API.OperationMethod<
  DescribeAnalysisRequest,
  DescribeAnalysisResponse,
  DescribeAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/analyses/{AnalysisId}",
    input: { AwsAccountId: 0, AnalysisId: 0 },
    output: {
      Analysis: {
        CreatedTime: D.ts,
        LastUpdatedTime: D.ts,
        Sheets: D.list(o_Sheet),
      },
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAnalysis",
})) as any;

export type DescribeAnalysisDefinitionError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Provides a detailed description of the definition of an analysis.
 *
 * If you do not need to know details about the content of an Analysis, for instance if you
 * are trying to check the status of a recently created or updated Analysis, use the
 *
 * `DescribeAnalysis`
 * instead.
 */
export const describeAnalysisDefinition: API.OperationMethod<
  DescribeAnalysisDefinitionRequest,
  DescribeAnalysisDefinitionResponse,
  DescribeAnalysisDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/analyses/{AnalysisId}/definition",
    input: { AwsAccountId: 0, AnalysisId: 0 },
    output: {
      Definition: {
        Sheets: D.list(o_SheetDefinition),
        TooltipSheets: D.list(o_TooltipSheetDefinition),
        CalculatedFields: D.list(o_CalculatedField),
        ParameterDeclarations: D.list(o_ParameterDeclaration),
        FilterGroups: D.list(o_FilterGroup),
        ColumnConfigurations: D.list(o_ColumnConfiguration),
      },
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAnalysisDefinition",
})) as any;

export type DescribeAnalysisPermissionsError =
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Provides the read and write permissions for an analysis.
 */
export const describeAnalysisPermissions: API.OperationMethod<
  DescribeAnalysisPermissionsRequest,
  DescribeAnalysisPermissionsResponse,
  DescribeAnalysisPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/analyses/{AnalysisId}/permissions",
    input: { AwsAccountId: 0, AnalysisId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAnalysisPermissions",
})) as any;

export type DescribeApprovalPolicyError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes an approval policy in Quick Sight.
 */
export const describeApprovalPolicy: API.OperationMethod<
  DescribeApprovalPolicyRequest,
  DescribeApprovalPolicyResponse,
  DescribeApprovalPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /governance/approvalworkflows/policies/{PolicyId}",
    input: { PolicyId: 0 },
    output: { Policy: o_ApprovalPolicy },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApprovalPolicy",
})) as any;

export type DescribeAssetBundleExportJobError =
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Describes an existing export job.
 *
 * Poll job descriptions after a job starts to know the status of the job. When a job
 * succeeds, a URL is provided to download the exported assets' data from. Download URLs
 * are valid for five minutes after they are generated. You can call the
 * `DescribeAssetBundleExportJob` API for a new download URL as needed.
 *
 * Job descriptions are available for 14 days after the job starts.
 */
export const describeAssetBundleExportJob: API.OperationMethod<
  DescribeAssetBundleExportJobRequest,
  DescribeAssetBundleExportJobResponse,
  DescribeAssetBundleExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/asset-bundle-export-jobs/{AssetBundleExportJobId}",
    input: { AwsAccountId: 0, AssetBundleExportJobId: 0 },
    output: {
      DownloadUrl: D.secret,
      CreatedTime: D.ts,
      Status: D.m({ status: true }),
    },
  },
  errors: [
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssetBundleExportJob",
})) as any;

export type DescribeAssetBundleImportJobError =
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Describes an existing import job.
 *
 * Poll job descriptions after starting a job to know when it has succeeded or failed. Job
 * descriptions are available for 14 days after job starts.
 */
export const describeAssetBundleImportJob: API.OperationMethod<
  DescribeAssetBundleImportJobRequest,
  DescribeAssetBundleImportJobResponse,
  DescribeAssetBundleImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/asset-bundle-import-jobs/{AssetBundleImportJobId}",
    input: { AwsAccountId: 0, AssetBundleImportJobId: 0 },
    output: {
      CreatedTime: D.ts,
      AssetBundleImportSource: { Body: D.secret },
      OverrideParameters: {
        RefreshSchedules: D.list({ StartAfterDateTime: D.ts }),
        DataSources: D.list({
          Credentials: { CredentialPair: { Password: D.secret } },
        }),
      },
      Status: D.m({ status: true }),
    },
  },
  errors: [
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssetBundleImportJob",
})) as any;

export type DescribeAutomationJobError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the status and details of a specified automation job, including its status and outputs.
 */
export const describeAutomationJob: API.OperationMethod<
  DescribeAutomationJobRequest,
  DescribeAutomationJobResponse,
  DescribeAutomationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/automation-groups/{AutomationGroupId}/automations/{AutomationId}/jobs/{JobId}",
    input: {
      AwsAccountId: 0,
      AutomationGroupId: 0,
      AutomationId: 0,
      IncludeInputPayload: D.m({ query: "includeInputPayload" }),
      IncludeOutputPayload: D.m({ query: "includeOutputPayload" }),
      JobId: 0,
    },
    output: {
      CreatedAt: D.ts,
      StartedAt: D.ts,
      EndedAt: D.ts,
      InputPayload: D.secret,
      OutputPayload: D.secret,
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAutomationJob",
})) as any;

export type DescribeBrandError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes a brand.
 */
export const describeBrand: API.OperationMethod<
  DescribeBrandRequest,
  DescribeBrandResponse,
  DescribeBrandError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/brands/{BrandId}",
    input: {
      AwsAccountId: 0,
      BrandId: 0,
      VersionId: D.m({ query: "versionId" }),
    },
    output: { BrandDetail: o_BrandDetail },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBrand",
})) as any;

export type DescribeBrandAssignmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes a brand assignment.
 */
export const describeBrandAssignment: API.OperationMethod<
  DescribeBrandAssignmentRequest,
  DescribeBrandAssignmentResponse,
  DescribeBrandAssignmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/brandassignments",
    input: { AwsAccountId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBrandAssignment",
})) as any;

export type DescribeBrandPublishedVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the published version of the brand.
 */
export const describeBrandPublishedVersion: API.OperationMethod<
  DescribeBrandPublishedVersionRequest,
  DescribeBrandPublishedVersionResponse,
  DescribeBrandPublishedVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/brands/{BrandId}/publishedversion",
    input: { AwsAccountId: 0, BrandId: 0 },
    output: { BrandDetail: o_BrandDetail },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBrandPublishedVersion",
})) as any;

export type DescribeCustomPermissionsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes a custom permissions profile.
 */
export const describeCustomPermissions: API.OperationMethod<
  DescribeCustomPermissionsRequest,
  DescribeCustomPermissionsResponse,
  DescribeCustomPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/custom-permissions/{CustomPermissionsName}",
    input: { AwsAccountId: 0, CustomPermissionsName: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCustomPermissions",
})) as any;

export type DescribeDashboardError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Provides a summary for a dashboard.
 */
export const describeDashboard: API.OperationMethod<
  DescribeDashboardRequest,
  DescribeDashboardResponse,
  DescribeDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/dashboards/{DashboardId}",
    input: {
      AwsAccountId: 0,
      DashboardId: 0,
      VersionNumber: D.m({ query: "version-number" }),
      AliasName: D.m({ query: "alias-name" }),
    },
    output: {
      Dashboard: {
        Version: { CreatedTime: D.ts, Sheets: D.list(o_Sheet) },
        CreatedTime: D.ts,
        LastPublishedTime: D.ts,
        LastUpdatedTime: D.ts,
      },
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDashboard",
})) as any;

export type DescribeDashboardDefinitionError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Provides a detailed description of the definition of a dashboard.
 *
 * If you do not need to know details about the content of a dashboard, for instance
 * if you are trying to check the status of a recently created or updated dashboard,
 * use the
 * `DescribeDashboard`
 * instead.
 */
export const describeDashboardDefinition: API.OperationMethod<
  DescribeDashboardDefinitionRequest,
  DescribeDashboardDefinitionResponse,
  DescribeDashboardDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/dashboards/{DashboardId}/definition",
    input: {
      AwsAccountId: 0,
      DashboardId: 0,
      VersionNumber: D.m({ query: "version-number" }),
      AliasName: D.m({ query: "alias-name" }),
    },
    output: {
      Definition: {
        Sheets: D.list(o_SheetDefinition),
        TooltipSheets: D.list(o_TooltipSheetDefinition),
        CalculatedFields: D.list(o_CalculatedField),
        ParameterDeclarations: D.list(o_ParameterDeclaration),
        FilterGroups: D.list(o_FilterGroup),
        ColumnConfigurations: D.list(o_ColumnConfiguration),
      },
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDashboardDefinition",
})) as any;

export type DescribeDashboardPermissionsError =
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Describes read and write permissions for a dashboard.
 */
export const describeDashboardPermissions: API.OperationMethod<
  DescribeDashboardPermissionsRequest,
  DescribeDashboardPermissionsResponse,
  DescribeDashboardPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/dashboards/{DashboardId}/permissions",
    input: { AwsAccountId: 0, DashboardId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDashboardPermissions",
})) as any;

export type DescribeDashboardSnapshotJobError =
  | AccessDeniedException
  | InternalFailureException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Describes an existing snapshot job.
 *
 * Poll job descriptions after a job starts to know the status of the job. For information on available status codes, see `JobStatus`.
 *
 * **Registered user support**
 *
 * This API can be called as before to get status of a job started by the same Quick Sight user.
 *
 * **Possible error scenarios**
 *
 * Request will fail with an Access Denied error in the following scenarios:
 *
 * - The credentials have expired.
 *
 * - Job has been started by a different user.
 *
 * - Impersonated Quick Sight user doesn't have access to the specified dashboard in the job.
 */
export const describeDashboardSnapshotJob: API.OperationMethod<
  DescribeDashboardSnapshotJobRequest,
  DescribeDashboardSnapshotJobResponse,
  DescribeDashboardSnapshotJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/dashboards/{DashboardId}/snapshot-jobs/{SnapshotJobId}",
    input: { AwsAccountId: 0, DashboardId: 0, SnapshotJobId: 0 },
    output: {
      SnapshotConfiguration: {
        Parameters: {
          StringParameters: D.list({ Values: D.list(D.secret) }),
          DateTimeParameters: D.list({ Values: D.list(D.ts) }),
        },
      },
      CreatedTime: D.ts,
      LastUpdatedTime: D.ts,
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDashboardSnapshotJob",
})) as any;

export type DescribeDashboardSnapshotJobResultError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Describes the result of an existing snapshot job that has finished running.
 *
 * A finished snapshot job will return a `COMPLETED` or `FAILED` status when you poll the job with a `DescribeDashboardSnapshotJob` API call.
 *
 * If the job has not finished running, this operation returns a message that says `Dashboard Snapshot Job with id has not reached a terminal state.`.
 *
 * **Registered user support**
 *
 * This API can be called as before to get the result of a job started by the same Quick Sight user. The result for the user will be returned in `RegisteredUsers` response attribute. The attribute will contain a list with at most one object in it.
 *
 * **Possible error scenarios**
 *
 * The request fails with an Access Denied error in the following scenarios:
 *
 * - The credentials have expired.
 *
 * - The job was started by a different user.
 *
 * - The registered user doesn't have access to the specified dashboard.
 *
 * The request succeeds but the job fails in the following scenarios:
 *
 * - `DASHBOARD_ACCESS_DENIED` - The registered user lost access to the dashboard.
 *
 * - `CAPABILITY_RESTRICTED` - The registered user is restricted from exporting data in **all** selected formats.
 *
 * The request succeeds but the response contains an error code in the following scenarios:
 *
 * - `CAPABILITY_RESTRICTED` - The registered user is restricted from exporting data in **some** selected formats.
 *
 * - `RLS_CHANGED` - Row-level security settings have changed. Re-run the job with current settings.
 *
 * - `CLS_CHANGED` - Column-level security settings have changed. Re-run the job with current settings.
 *
 * - `DATASET_DELETED` - The dataset has been deleted. Verify the dataset exists before re-running the job.
 */
export const describeDashboardSnapshotJobResult: API.OperationMethod<
  DescribeDashboardSnapshotJobResultRequest,
  DescribeDashboardSnapshotJobResultResponse,
  DescribeDashboardSnapshotJobResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/dashboards/{DashboardId}/snapshot-jobs/{SnapshotJobId}/result",
    input: { AwsAccountId: 0, DashboardId: 0, SnapshotJobId: 0 },
    output: {
      CreatedTime: D.ts,
      LastUpdatedTime: D.ts,
      Result: {
        AnonymousUsers: D.list({
          FileGroups: D.list(o_SnapshotJobResultFileGroup),
        }),
        RegisteredUsers: D.list({
          FileGroups: D.list(o_SnapshotJobResultFileGroup),
        }),
      },
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDashboardSnapshotJobResult",
})) as any;

export type DescribeDashboardsQAConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes an existing dashboard QA configuration.
 */
export const describeDashboardsQAConfiguration: API.OperationMethod<
  DescribeDashboardsQAConfigurationRequest,
  DescribeDashboardsQAConfigurationResponse,
  DescribeDashboardsQAConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/dashboards-qa-configuration",
    input: { AwsAccountId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDashboardsQAConfiguration",
})) as any;

export type DescribeDataSetError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes a dataset. This operation doesn't support datasets that include uploaded
 * files as a source.
 */
export const describeDataSet: API.OperationMethod<
  DescribeDataSetRequest,
  DescribeDataSetResponse,
  DescribeDataSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/data-sets/{DataSetId}",
    input: { AwsAccountId: 0, DataSetId: 0 },
    output: {
      DataSet: {
        CreatedTime: D.ts,
        LastUpdatedTime: D.ts,
        PhysicalTableMap: D.map({ CustomSql: { SqlQuery: D.secret } }),
        LogicalTableMap: D.map({
          DataTransforms: D.list({
            FilterOperation: o_FilterOperation,
            CreateColumnsOperation: o_CreateColumnsOperation,
            TagColumnOperation: {
              Tags: D.list({ ColumnDescription: o_ColumnDescription }),
            },
            OverrideDatasetParameterOperation: {
              NewDefaultValues: { DateTimeStaticValues: D.list(D.ts) },
            },
          }),
        }),
        OutputColumns: D.list({ Description: D.secret }),
        RowLevelPermissionTagConfiguration:
          o_RowLevelPermissionTagConfiguration,
        DatasetParameters: D.list({
          DateTimeDatasetParameter: {
            DefaultValues: { StaticValues: D.list(D.ts) },
          },
        }),
        DataPrepConfiguration: {
          TransformStepMap: D.map({
            FiltersStep: { FilterOperations: D.list(o_FilterOperation) },
            CreateColumnsStep: o_CreateColumnsOperation,
            JoinStep: { OnClause: D.secret },
          }),
        },
        SemanticModelConfiguration: {
          TableMap: D.map({
            RowLevelPermissionConfiguration: {
              TagConfiguration: o_RowLevelPermissionTagConfiguration,
            },
            SemanticMetadata: {
              ColumnMetadata: D.list({
                ColumnProperties: D.list({
                  Description: o_ColumnDescription,
                  AdditionalNotes: { Text: D.secret },
                }),
              }),
            },
          }),
          SemanticMetadata: D.list({
            Description: { Text: D.secret },
            CustomInstructions: D.list({
              InlineCustomInstruction: { InstructionText: D.secret },
            }),
          }),
        },
      },
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataSet",
})) as any;

export type DescribeDataSetPermissionsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the permissions on a dataset.
 *
 * The permissions resource is
 * `arn:aws:quicksight:region:aws-account-id:dataset/data-set-id`.
 */
export const describeDataSetPermissions: API.OperationMethod<
  DescribeDataSetPermissionsRequest,
  DescribeDataSetPermissionsResponse,
  DescribeDataSetPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/data-sets/{DataSetId}/permissions",
    input: { AwsAccountId: 0, DataSetId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataSetPermissions",
})) as any;

export type DescribeDataSetRefreshPropertiesError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the refresh properties of a dataset.
 */
export const describeDataSetRefreshProperties: API.OperationMethod<
  DescribeDataSetRefreshPropertiesRequest,
  DescribeDataSetRefreshPropertiesResponse,
  DescribeDataSetRefreshPropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/data-sets/{DataSetId}/refresh-properties",
    input: { AwsAccountId: 0, DataSetId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataSetRefreshProperties",
})) as any;

export type DescribeDataSourceError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes a data source.
 */
export const describeDataSource: API.OperationMethod<
  DescribeDataSourceRequest,
  DescribeDataSourceResponse,
  DescribeDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/data-sources/{DataSourceId}",
    input: { AwsAccountId: 0, DataSourceId: 0 },
    output: { DataSource: o_DataSource, Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataSource",
})) as any;

export type DescribeDataSourcePermissionsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the resource permissions for a data source.
 */
export const describeDataSourcePermissions: API.OperationMethod<
  DescribeDataSourcePermissionsRequest,
  DescribeDataSourcePermissionsResponse,
  DescribeDataSourcePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/data-sources/{DataSourceId}/permissions",
    input: { AwsAccountId: 0, DataSourceId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataSourcePermissions",
})) as any;

export type DescribeDefaultQBusinessApplicationError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes a Amazon Q Business application that is linked to an Quick Sight account.
 */
export const describeDefaultQBusinessApplication: API.OperationMethod<
  DescribeDefaultQBusinessApplicationRequest,
  DescribeDefaultQBusinessApplicationResponse,
  DescribeDefaultQBusinessApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/default-qbusiness-application",
    input: { AwsAccountId: 0, Namespace: D.m({ query: "namespace" }) },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDefaultQBusinessApplication",
})) as any;

export type DescribeDlpSettingError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the full configuration of a DLP setting in an Amazon Web Services account.
 */
export const describeDlpSetting: API.OperationMethod<
  DescribeDlpSettingRequest,
  DescribeDlpSettingResponse,
  DescribeDlpSettingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/data-loss-prevention/settings/{DlpSettingId}",
    input: { AwsAccountId: 0, DlpSettingId: 0 },
    output: { DlpSetting: { CreatedAt: D.ts, UpdatedAt: D.ts } },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDlpSetting",
})) as any;

export type DescribeFlowError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the full details of a flow for the latest version of the requested publish state.
 */
export const describeFlow: API.OperationMethod<
  DescribeFlowRequest,
  DescribeFlowResponse,
  DescribeFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/flows/{FlowId}",
    input: {
      AwsAccountId: 0,
      FlowId: 0,
      PublishState: D.m({ query: "publish-state" }),
    },
    output: {
      Flow: { CreatedTime: D.ts, LastUpdatedTime: D.ts },
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFlow",
})) as any;

export type DescribeFolderError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Describes a folder.
 */
export const describeFolder: API.OperationMethod<
  DescribeFolderRequest,
  DescribeFolderResponse,
  DescribeFolderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/folders/{FolderId}",
    input: { AwsAccountId: 0, FolderId: 0 },
    output: {
      Status: D.m({ status: true }),
      Folder: { CreatedTime: D.ts, LastUpdatedTime: D.ts },
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFolder",
})) as any;

export type DescribeFolderPermissionsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Describes permissions for a folder.
 */
export const describeFolderPermissions: API.PaginatedOperationMethod<
  DescribeFolderPermissionsRequest,
  DescribeFolderPermissionsResponse,
  DescribeFolderPermissionsError,
  Credentials | HttpClient.HttpClient,
  ResourcePermission
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/folders/{FolderId}/permissions",
    input: {
      AwsAccountId: 0,
      FolderId: 0,
      Namespace: D.m({ query: "namespace" }),
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFolderPermissions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Permissions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeFolderResolvedPermissionsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Describes the folder resolved permissions. Permissions consists of both folder direct permissions and the inherited permissions from the ancestor folders.
 */
export const describeFolderResolvedPermissions: API.PaginatedOperationMethod<
  DescribeFolderResolvedPermissionsRequest,
  DescribeFolderResolvedPermissionsResponse,
  DescribeFolderResolvedPermissionsError,
  Credentials | HttpClient.HttpClient,
  ResourcePermission
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/folders/{FolderId}/resolved-permissions",
    input: {
      AwsAccountId: 0,
      FolderId: 0,
      Namespace: D.m({ query: "namespace" }),
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFolderResolvedPermissions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Permissions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeGroupError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns an Amazon Quick Sight group's description and Amazon Resource Name (ARN).
 */
export const describeGroup: API.OperationMethod<
  DescribeGroupRequest,
  DescribeGroupResponse,
  DescribeGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/namespaces/{Namespace}/groups/{GroupName}",
    input: { GroupName: 0, AwsAccountId: 0, Namespace: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGroup",
})) as any;

export type DescribeGroupMembershipError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Use the `DescribeGroupMembership` operation to determine if a user is a
 * member of the specified group. If the user exists and is a member of the specified
 * group, an associated `GroupMember` object is returned.
 */
export const describeGroupMembership: API.OperationMethod<
  DescribeGroupMembershipRequest,
  DescribeGroupMembershipResponse,
  DescribeGroupMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/namespaces/{Namespace}/groups/{GroupName}/members/{MemberName}",
    input: { MemberName: 0, GroupName: 0, AwsAccountId: 0, Namespace: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGroupMembership",
})) as any;

export type DescribeIAMPolicyAssignmentError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes an existing IAM policy assignment, as specified by the
 * assignment name.
 */
export const describeIAMPolicyAssignment: API.OperationMethod<
  DescribeIAMPolicyAssignmentRequest,
  DescribeIAMPolicyAssignmentResponse,
  DescribeIAMPolicyAssignmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/namespaces/{Namespace}/iam-policy-assignments/{AssignmentName}",
    input: { AwsAccountId: 0, AssignmentName: 0, Namespace: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIAMPolicyAssignment",
})) as any;

export type DescribeIngestionError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes a SPICE ingestion.
 */
export const describeIngestion: API.OperationMethod<
  DescribeIngestionRequest,
  DescribeIngestionResponse,
  DescribeIngestionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/data-sets/{DataSetId}/ingestions/{IngestionId}",
    input: { AwsAccountId: 0, DataSetId: 0, IngestionId: 0 },
    output: { Ingestion: o_Ingestion, Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIngestion",
})) as any;

export type DescribeIpRestrictionError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides a summary and status of IP rules.
 */
export const describeIpRestriction: API.OperationMethod<
  DescribeIpRestrictionRequest,
  DescribeIpRestrictionResponse,
  DescribeIpRestrictionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/ip-restriction",
    input: { AwsAccountId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIpRestriction",
})) as any;

export type DescribeKeyRegistrationError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes all customer managed key registrations in a Quick Sight account.
 */
export const describeKeyRegistration: API.OperationMethod<
  DescribeKeyRegistrationRequest,
  DescribeKeyRegistrationResponse,
  DescribeKeyRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/key-registration",
    input: {
      AwsAccountId: 0,
      DefaultKeyOnly: D.m({ query: "default-key-only" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeKeyRegistration",
})) as any;

export type DescribeKnowledgeBaseError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | InvalidRequestException
  | LimitExceededException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes a knowledge base.
 */
export const describeKnowledgeBase: API.OperationMethod<
  DescribeKnowledgeBaseRequest,
  DescribeKnowledgeBaseResponse,
  DescribeKnowledgeBaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/accounts/{AwsAccountId}/knowledge-bases/{KnowledgeBaseId}",
    input: { AwsAccountId: 0, KnowledgeBaseId: 0 },
    output: {
      KnowledgeBase: {
        CreatedAt: D.ts,
        UpdatedAt: D.ts,
        FirstCompletedIngestionSummary: o_KnowledgeBaseIngestionSummary,
        FirstIncompleteIngestionSummary: o_KnowledgeBaseIngestionSummary,
        LatestIngestionSummary: o_KnowledgeBaseIngestionSummary,
        PrimaryOwnerUsername: D.secret,
      },
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    InvalidRequestException,
    LimitExceededException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeKnowledgeBase",
})) as any;

export type DescribeKnowledgeBasePermissionsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | InvalidRequestException
  | LimitExceededException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the resource permissions for a knowledge base.
 */
export const describeKnowledgeBasePermissions: API.OperationMethod<
  DescribeKnowledgeBasePermissionsRequest,
  DescribeKnowledgeBasePermissionsResponse,
  DescribeKnowledgeBasePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/accounts/{AwsAccountId}/knowledge-bases/{KnowledgeBaseId}/permissions",
    input: { AwsAccountId: 0, KnowledgeBaseId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    InvalidRequestException,
    LimitExceededException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeKnowledgeBasePermissions",
})) as any;

export type DescribeLimitsProfileError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the properties of an existing limits profile.
 */
export const describeLimitsProfile: API.OperationMethod<
  DescribeLimitsProfileRequest,
  DescribeLimitsProfileResponse,
  DescribeLimitsProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /governance/limits/accounts/{accountId}/profiles/{profileId}",
    input: { profileId: 0, accountId: 0 },
    output: { profile: o_LimitsProfile },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLimitsProfile",
})) as any;

export type DescribeNamespaceError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the current namespace.
 */
export const describeNamespace: API.OperationMethod<
  DescribeNamespaceRequest,
  DescribeNamespaceResponse,
  DescribeNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/namespaces/{Namespace}",
    input: { AwsAccountId: 0, Namespace: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNamespace",
})) as any;

export type DescribeOAuthClientApplicationError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes an OAuthClientApplication.
 */
export const describeOAuthClientApplication: API.OperationMethod<
  DescribeOAuthClientApplicationRequest,
  DescribeOAuthClientApplicationResponse,
  DescribeOAuthClientApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/oauth-client-applications/{OAuthClientApplicationId}",
    input: { AwsAccountId: 0, OAuthClientApplicationId: 0 },
    output: {
      OAuthClientApplication: {
        OAuthTokenEndpointUrl: D.secret,
        OAuthAuthorizationEndpointUrl: D.secret,
        CreatedTime: D.ts,
        LastUpdatedTime: D.ts,
      },
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOAuthClientApplication",
})) as any;

export type DescribeQPersonalizationConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes a personalization configuration.
 */
export const describeQPersonalizationConfiguration: API.OperationMethod<
  DescribeQPersonalizationConfigurationRequest,
  DescribeQPersonalizationConfigurationResponse,
  DescribeQPersonalizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/q-personalization-configuration",
    input: { AwsAccountId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeQPersonalizationConfiguration",
})) as any;

export type DescribeQuickSightQSearchConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the state of a Quick Sight Q Search configuration.
 */
export const describeQuickSightQSearchConfiguration: API.OperationMethod<
  DescribeQuickSightQSearchConfigurationRequest,
  DescribeQuickSightQSearchConfigurationResponse,
  DescribeQuickSightQSearchConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/quicksight-q-search-configuration",
    input: { AwsAccountId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeQuickSightQSearchConfiguration",
})) as any;

export type DescribeRefreshScheduleError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides a summary of a refresh schedule.
 */
export const describeRefreshSchedule: API.OperationMethod<
  DescribeRefreshScheduleRequest,
  DescribeRefreshScheduleResponse,
  DescribeRefreshScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/data-sets/{DataSetId}/refresh-schedules/{ScheduleId}",
    input: { AwsAccountId: 0, DataSetId: 0, ScheduleId: 0 },
    output: {
      RefreshSchedule: o_RefreshSchedule,
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRefreshSchedule",
})) as any;

export type DescribeRoleCustomPermissionError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes all custom permissions that are mapped to a role.
 */
export const describeRoleCustomPermission: API.OperationMethod<
  DescribeRoleCustomPermissionRequest,
  DescribeRoleCustomPermissionResponse,
  DescribeRoleCustomPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/namespaces/{Namespace}/roles/{Role}/custom-permission",
    input: { Role: 0, AwsAccountId: 0, Namespace: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRoleCustomPermission",
})) as any;

export type DescribeSelfUpgradeConfigurationError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the self-upgrade configuration for a Quick account.
 */
export const describeSelfUpgradeConfiguration: API.OperationMethod<
  DescribeSelfUpgradeConfigurationRequest,
  DescribeSelfUpgradeConfigurationResponse,
  DescribeSelfUpgradeConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/namespaces/{Namespace}/self-upgrade-configuration",
    input: { AwsAccountId: 0, Namespace: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSelfUpgradeConfiguration",
})) as any;

export type DescribeSpaceError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes an Amazon QuickSight space.
 */
export const describeSpace: API.OperationMethod<
  DescribeSpaceRequest,
  DescribeSpaceResponse,
  DescribeSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/accounts/{AwsAccountId}/spaces/{SpaceId}",
    input: {
      AwsAccountId: 0,
      SpaceId: 0,
      MaxContributors: D.m({ query: "maxContributors" }),
    },
    output: {
      Space: { description: D.secret, createdAt: D.ts, updatedAt: D.ts },
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSpace",
})) as any;

export type DescribeSpacePermissionsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the permissions for an Amazon QuickSight space.
 */
export const describeSpacePermissions: API.OperationMethod<
  DescribeSpacePermissionsRequest,
  DescribeSpacePermissionsResponse,
  DescribeSpacePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/accounts/{AwsAccountId}/spaces/{SpaceId}/permissions",
    input: { AwsAccountId: 0, SpaceId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSpacePermissions",
})) as any;

export type DescribeTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Describes a template's metadata.
 */
export const describeTemplate: API.OperationMethod<
  DescribeTemplateRequest,
  DescribeTemplateResponse,
  DescribeTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/templates/{TemplateId}",
    input: {
      AwsAccountId: 0,
      TemplateId: 0,
      VersionNumber: D.m({ query: "version-number" }),
      AliasName: D.m({ query: "alias-name" }),
    },
    output: {
      Template: {
        Version: { CreatedTime: D.ts, Sheets: D.list(o_Sheet) },
        LastUpdatedTime: D.ts,
        CreatedTime: D.ts,
      },
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTemplate",
})) as any;

export type DescribeTemplateAliasError =
  | InternalFailureException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Describes the template alias for a template.
 */
export const describeTemplateAlias: API.OperationMethod<
  DescribeTemplateAliasRequest,
  DescribeTemplateAliasResponse,
  DescribeTemplateAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/templates/{TemplateId}/aliases/{AliasName}",
    input: { AwsAccountId: 0, TemplateId: 0, AliasName: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    InternalFailureException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTemplateAlias",
})) as any;

export type DescribeTemplateDefinitionError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Provides a detailed description of the definition of a template.
 *
 * If you do not need to know details about the content of a template, for instance if you
 * are trying to check the status of a recently created or updated template, use the
 *
 * `DescribeTemplate`
 * instead.
 */
export const describeTemplateDefinition: API.OperationMethod<
  DescribeTemplateDefinitionRequest,
  DescribeTemplateDefinitionResponse,
  DescribeTemplateDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/templates/{TemplateId}/definition",
    input: {
      AwsAccountId: 0,
      TemplateId: 0,
      VersionNumber: D.m({ query: "version-number" }),
      AliasName: D.m({ query: "alias-name" }),
    },
    output: {
      Definition: {
        Sheets: D.list(o_SheetDefinition),
        TooltipSheets: D.list(o_TooltipSheetDefinition),
        CalculatedFields: D.list(o_CalculatedField),
        ParameterDeclarations: D.list(o_ParameterDeclaration),
        FilterGroups: D.list(o_FilterGroup),
        ColumnConfigurations: D.list(o_ColumnConfiguration),
      },
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTemplateDefinition",
})) as any;

export type DescribeTemplatePermissionsError =
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Describes read and write permissions on a template.
 */
export const describeTemplatePermissions: API.OperationMethod<
  DescribeTemplatePermissionsRequest,
  DescribeTemplatePermissionsResponse,
  DescribeTemplatePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/templates/{TemplateId}/permissions",
    input: { AwsAccountId: 0, TemplateId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTemplatePermissions",
})) as any;

export type DescribeThemeError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Describes a theme.
 */
export const describeTheme: API.OperationMethod<
  DescribeThemeRequest,
  DescribeThemeResponse,
  DescribeThemeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/themes/{ThemeId}",
    input: {
      AwsAccountId: 0,
      ThemeId: 0,
      VersionNumber: D.m({ query: "version-number" }),
      AliasName: D.m({ query: "alias-name" }),
    },
    output: {
      Theme: {
        Version: { CreatedTime: D.ts },
        CreatedTime: D.ts,
        LastUpdatedTime: D.ts,
      },
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTheme",
})) as any;

export type DescribeThemeAliasError =
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Describes the alias for a theme.
 */
export const describeThemeAlias: API.OperationMethod<
  DescribeThemeAliasRequest,
  DescribeThemeAliasResponse,
  DescribeThemeAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/themes/{ThemeId}/aliases/{AliasName}",
    input: { AwsAccountId: 0, ThemeId: 0, AliasName: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeThemeAlias",
})) as any;

export type DescribeThemePermissionsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Describes the read and write permissions for a theme.
 */
export const describeThemePermissions: API.OperationMethod<
  DescribeThemePermissionsRequest,
  DescribeThemePermissionsResponse,
  DescribeThemePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/themes/{ThemeId}/permissions",
    input: { AwsAccountId: 0, ThemeId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeThemePermissions",
})) as any;

export type DescribeTopicError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes a topic.
 */
export const describeTopic: API.OperationMethod<
  DescribeTopicRequest,
  DescribeTopicResponse,
  DescribeTopicError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/topics/{TopicId}",
    input: { AwsAccountId: 0, TopicId: 0 },
    output: {
      Topic: {
        DataSets: D.list({
          Filters: D.list({
            FilterDescription: D.secret,
            FilterSynonyms: D.list(D.secret),
            CategoryFilter: { Constant: { SingularConstant: D.secret } },
            NumericEqualityFilter: { Constant: o_TopicSingularFilterConstant },
            NumericRangeFilter: { Constant: o_TopicRangeFilterConstant },
            DateRangeFilter: { Constant: o_TopicRangeFilterConstant },
            RelativeDateFilter: { Constant: o_TopicSingularFilterConstant },
            NullFilter: { Constant: o_TopicSingularFilterConstant },
          }),
          Columns: D.list({
            ColumnFriendlyName: D.secret,
            ColumnDescription: D.secret,
            ColumnSynonyms: D.list(D.secret),
            SemanticType: o_SemanticType,
            CellValueSynonyms: D.list(o_CellValueSynonym),
          }),
          CalculatedFields: D.list({
            CalculatedFieldName: D.secret,
            CalculatedFieldDescription: D.secret,
            Expression: D.secret,
            CalculatedFieldSynonyms: D.list(D.secret),
            SemanticType: o_SemanticType,
            CellValueSynonyms: D.list(o_CellValueSynonym),
          }),
          NamedEntities: D.list({
            EntityDescription: D.secret,
            EntitySynonyms: D.list(D.secret),
          }),
        }),
      },
      Status: D.m({ status: true }),
      CustomInstructions: o_CustomInstructions,
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTopic",
})) as any;

export type DescribeTopicPermissionsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the permissions of a topic.
 */
export const describeTopicPermissions: API.OperationMethod<
  DescribeTopicPermissionsRequest,
  DescribeTopicPermissionsResponse,
  DescribeTopicPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/topics/{TopicId}/permissions",
    input: { AwsAccountId: 0, TopicId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTopicPermissions",
})) as any;

export type DescribeTopicPermissionsV2Error =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the permissions of a topic.
 */
export const describeTopicPermissionsV2: API.OperationMethod<
  DescribeTopicPermissionsV2Request,
  DescribeTopicPermissionsV2Response,
  DescribeTopicPermissionsV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/topicsV2/{TopicId}/permissions",
    input: { AwsAccountId: 0, TopicId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTopicPermissionsV2",
})) as any;

export type DescribeTopicRefreshError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the status of a topic refresh.
 */
export const describeTopicRefresh: API.OperationMethod<
  DescribeTopicRefreshRequest,
  DescribeTopicRefreshResponse,
  DescribeTopicRefreshError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/topics/{TopicId}/refresh/{RefreshId}",
    input: { AwsAccountId: 0, TopicId: 0, RefreshId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTopicRefresh",
})) as any;

export type DescribeTopicRefreshScheduleError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a topic refresh schedule.
 */
export const describeTopicRefreshSchedule: API.OperationMethod<
  DescribeTopicRefreshScheduleRequest,
  DescribeTopicRefreshScheduleResponse,
  DescribeTopicRefreshScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/topics/{TopicId}/schedules/{DatasetId}",
    input: { AwsAccountId: 0, TopicId: 0, DatasetId: 0 },
    output: {
      RefreshSchedule: o_TopicRefreshSchedule,
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTopicRefreshSchedule",
})) as any;

export type DescribeTopicV2Error =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes a Q topic.
 */
export const describeTopicV2: API.OperationMethod<
  DescribeTopicV2Request,
  DescribeTopicV2Response,
  DescribeTopicV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/topicsV2/{TopicId}",
    input: { AwsAccountId: 0, TopicId: 0 },
    output: {
      CustomInstructions: o_CustomInstructions,
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTopicV2",
})) as any;

export type DescribeUserError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns information about a user, given the user name.
 */
export const describeUser: API.OperationMethod<
  DescribeUserRequest,
  DescribeUserResponse,
  DescribeUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/namespaces/{Namespace}/users/{UserName}",
    input: { UserName: 0, AwsAccountId: 0, Namespace: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUser",
})) as any;

export type DescribeVPCConnectionError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Describes a VPC connection.
 */
export const describeVPCConnection: API.OperationMethod<
  DescribeVPCConnectionRequest,
  DescribeVPCConnectionResponse,
  DescribeVPCConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/vpc-connections/{VPCConnectionId}",
    input: { AwsAccountId: 0, VPCConnectionId: 0 },
    output: { VPCConnection: { CreatedTime: D.ts, LastUpdatedTime: D.ts } },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVPCConnection",
})) as any;

export type GenerateEmbedUrlForAnonymousUserError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | SessionLifetimeInMinutesInvalidException
  | ThrottlingException
  | UnsupportedPricingPlanException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Generates an embed URL that you can use to embed an Amazon Quick dashboard or
 * visual in your website, without having to register any reader users. Before you use this
 * action, make sure that you have configured the dashboards and permissions.
 *
 * The following rules apply to the generated URL:
 *
 * - It contains a temporary bearer token. It is valid for 5 minutes after it is
 * generated. Once redeemed within this period, it cannot be re-used again.
 *
 * - The URL validity period should not be confused with the actual session
 * lifetime that can be customized using the
 * SessionLifetimeInMinutes
 * parameter. The resulting user
 * session is valid for 15 minutes (minimum) to 10 hours (maximum). The default
 * session duration is 10 hours.
 *
 * - You are charged only when the URL is used or there is interaction with Amazon Quick.
 *
 * For more information, see Embedded Analytics in
 * the *Amazon Quick User Guide*.
 *
 * For more information about the high-level steps for embedding and for an interactive
 * demo of the ways you can customize embedding, visit the Amazon Quick
 * Developer Portal.
 */
export const generateEmbedUrlForAnonymousUser: API.OperationMethod<
  GenerateEmbedUrlForAnonymousUserRequest,
  GenerateEmbedUrlForAnonymousUserResponse,
  GenerateEmbedUrlForAnonymousUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/embed-url/anonymous-user",
    input: {
      AwsAccountId: 0,
      SessionLifetimeInMinutes: 0,
      Namespace: 0,
      SessionTags: D.list(i_SessionTag),
      AuthorizedResourceArns: 0,
      ExperienceConfiguration: {
        Dashboard: {
          InitialDashboardId: 0,
          EnabledFeatures: 0,
          DisabledFeatures: 0,
          FeatureConfigurations: { SharedView: i_SharedViewConfigurations },
        },
        DashboardVisual: { InitialDashboardVisualId: i_DashboardVisualId },
        QSearchBar: { InitialTopicId: 0 },
        GenerativeQnA: { InitialTopicId: 0 },
      },
      AllowedDomains: 0,
    },
    output: { EmbedUrl: D.secret, Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    SessionLifetimeInMinutesInvalidException,
    ThrottlingException,
    UnsupportedPricingPlanException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateEmbedUrlForAnonymousUser",
})) as any;

export type GenerateEmbedUrlForRegisteredUserError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | QuickSightUserNotFoundException
  | ResourceNotFoundException
  | SessionLifetimeInMinutesInvalidException
  | ThrottlingException
  | UnsupportedPricingPlanException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Generates an embed URL that you can use to embed an Amazon Quick experience
 * in your website. This action can be used for any type of user registered in an Amazon Quick account. Before you use this action, make sure that you have
 * configured the relevant Amazon Quick resource and permissions.
 *
 * The following rules apply to the generated URL:
 *
 * - It contains a temporary bearer token. It is valid for 5 minutes after it is
 * generated. Once redeemed within this period, it cannot be re-used again.
 *
 * - The URL validity period should not be confused with the actual session
 * lifetime that can be customized using the
 * SessionLifetimeInMinutes
 * parameter.
 *
 * The resulting user session is valid for 15 minutes (minimum) to 10 hours
 * (maximum). The default session duration is 10 hours.
 *
 * - You are charged only when the URL is used or there is interaction with Amazon Quick.
 *
 * For more information, see Embedded Analytics in
 * the *Amazon Quick User Guide*.
 *
 * For more information about the high-level steps for embedding and for an interactive
 * demo of the ways you can customize embedding, visit the Amazon Quick
 * Developer Portal.
 */
export const generateEmbedUrlForRegisteredUser: API.OperationMethod<
  GenerateEmbedUrlForRegisteredUserRequest,
  GenerateEmbedUrlForRegisteredUserResponse,
  GenerateEmbedUrlForRegisteredUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/embed-url/registered-user",
    input: {
      AwsAccountId: 0,
      SessionLifetimeInMinutes: 0,
      UserArn: 0,
      ExperienceConfiguration: i_RegisteredUserEmbeddingExperienceConfiguration,
      AllowedDomains: 0,
    },
    output: { EmbedUrl: D.secret, Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    QuickSightUserNotFoundException,
    ResourceNotFoundException,
    SessionLifetimeInMinutesInvalidException,
    ThrottlingException,
    UnsupportedPricingPlanException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateEmbedUrlForRegisteredUser",
})) as any;

export type GenerateEmbedUrlForRegisteredUserWithIdentityError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | QuickSightUserNotFoundException
  | ResourceNotFoundException
  | SessionLifetimeInMinutesInvalidException
  | ThrottlingException
  | UnsupportedPricingPlanException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Generates an embed URL that you can use to embed an Amazon Quick Sight experience in
 * your website. This action can be used for any type of user that is registered in an
 * Amazon Quick Sight account that uses IAM Identity Center for authentication. This API
 * requires identity-enhanced IAM Role sessions for the authenticated
 * user that the API call is being made for.
 *
 * This API uses trusted identity
 * propagation to ensure that an end user is authenticated and receives the
 * embed URL that is specific to that user. The IAM Identity Center application that the
 * user has logged into needs to have trusted Identity Propagation enabled for Amazon Quick Sight with the scope
 * value set to `quicksight:read`. Before you use this action, make sure that
 * you have configured the relevant Amazon Quick Sight resource and permissions.
 */
export const generateEmbedUrlForRegisteredUserWithIdentity: API.OperationMethod<
  GenerateEmbedUrlForRegisteredUserWithIdentityRequest,
  GenerateEmbedUrlForRegisteredUserWithIdentityResponse,
  GenerateEmbedUrlForRegisteredUserWithIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/embed-url/registered-user-with-identity",
    input: {
      AwsAccountId: 0,
      SessionLifetimeInMinutes: 0,
      ExperienceConfiguration: i_RegisteredUserEmbeddingExperienceConfiguration,
      AllowedDomains: 0,
    },
    output: { EmbedUrl: D.secret, Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    QuickSightUserNotFoundException,
    ResourceNotFoundException,
    SessionLifetimeInMinutesInvalidException,
    ThrottlingException,
    UnsupportedPricingPlanException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateEmbedUrlForRegisteredUserWithIdentity",
})) as any;

export type GetDashboardEmbedUrlError =
  | AccessDeniedException
  | DomainNotWhitelistedException
  | IdentityTypeNotSupportedException
  | InternalFailureException
  | InvalidParameterValueException
  | QuickSightUserNotFoundException
  | ResourceExistsException
  | ResourceNotFoundException
  | SessionLifetimeInMinutesInvalidException
  | ThrottlingException
  | UnsupportedPricingPlanException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Generates a temporary session URL and authorization code(bearer token) that you can
 * use to embed an Amazon Quick Sight read-only dashboard in your website or application.
 * Before you use this command, make sure that you have configured the dashboards and
 * permissions.
 *
 * Currently, you can use `GetDashboardEmbedURL` only from the server, not
 * from the user's browser. The following rules apply to the generated URL:
 *
 * - They must be used together.
 *
 * - They can be used one time only.
 *
 * - They are valid for 5 minutes after you run this command.
 *
 * - You are charged only when the URL is used or there is interaction with Quick.
 *
 * - The resulting user session is valid for 15 minutes (default) up to 10 hours
 * (maximum). You can use the optional `SessionLifetimeInMinutes`
 * parameter to customize session duration.
 *
 * For more information, see Embedding Analytics
 * Using GetDashboardEmbedUrl in the Amazon Quick User
 * Guide.
 *
 * For more information about the high-level steps for embedding and for an interactive
 * demo of the ways you can customize embedding, visit the Amazon Quick
 * Developer Portal.
 */
export const getDashboardEmbedUrl: API.OperationMethod<
  GetDashboardEmbedUrlRequest,
  GetDashboardEmbedUrlResponse,
  GetDashboardEmbedUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/dashboards/{DashboardId}/embed-url",
    input: {
      AwsAccountId: 0,
      DashboardId: 0,
      IdentityType: D.m({ query: "creds-type" }),
      SessionLifetimeInMinutes: D.m({ query: "session-lifetime" }),
      UndoRedoDisabled: D.m({ query: "undo-redo-disabled" }),
      ResetDisabled: D.m({ query: "reset-disabled" }),
      StatePersistenceEnabled: D.m({ query: "state-persistence-enabled" }),
      UserArn: D.m({ query: "user-arn" }),
      Namespace: D.m({ query: "namespace" }),
      AdditionalDashboardIds: D.m({ query: "additional-dashboard-ids" }),
    },
    output: { EmbedUrl: D.secret, Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    DomainNotWhitelistedException,
    IdentityTypeNotSupportedException,
    InternalFailureException,
    InvalidParameterValueException,
    QuickSightUserNotFoundException,
    ResourceExistsException,
    ResourceNotFoundException,
    SessionLifetimeInMinutesInvalidException,
    ThrottlingException,
    UnsupportedPricingPlanException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDashboardEmbedUrl",
})) as any;

export type GetFlowMetadataError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the metadata of a flow, not including its definition specifying the steps.
 */
export const getFlowMetadata: API.OperationMethod<
  GetFlowMetadataInput,
  GetFlowMetadataOutput,
  GetFlowMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/flows/{FlowId}/metadata",
    input: { AwsAccountId: 0, FlowId: 0 },
    output: {
      CreatedTime: D.ts,
      LastUpdatedTime: D.ts,
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFlowMetadata",
})) as any;

export type GetFlowPermissionsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ThrottlingException
  | CommonErrors;
/**
 * Get permissions for a flow.
 */
export const getFlowPermissions: API.OperationMethod<
  GetFlowPermissionsInput,
  GetFlowPermissionsOutput,
  GetFlowPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/flows/{FlowId}/permissions",
    input: { AwsAccountId: 0, FlowId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFlowPermissions",
})) as any;

export type GetIdentityContextError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the identity context for a Quick Sight user in a specified namespace, allowing you to obtain identity tokens that can be used with identity-enhanced IAM role sessions to call identity-aware APIs.
 *
 * Currently, you can call the following APIs with identity-enhanced Credentials
 *
 * - StartDashboardSnapshotJob
 *
 * - DescribeDashboardSnapshotJob
 *
 * - DescribeDashboardSnapshotJobResult
 *
 * **Supported Authentication Methods**
 *
 * This API supports Quick Sight native users, IAM federated users, and Active Directory users. For Quick Sight users authenticated by Amazon Web Services Identity Center, see Identity Center documentation on identity-enhanced IAM role sessions.
 *
 * **Supported Regions**
 *
 * The GetIdentityContext API works only in regions that support at least one of these identity types:
 *
 * - Amazon Quick Sight native identity
 *
 * - IAM federated identity
 *
 * - Active Directory
 *
 * To use this API successfully, call it in the same region where your user's identity resides. For example, if your user's identity is in us-east-1, make the API call in us-east-1. For more information about managing identities in Amazon Quick Sight, see Identity and access management in Amazon Quick Sight in the Amazon Quick Sight User Guide.
 *
 * **Getting Identity-Enhanced Credentials**
 *
 * To obtain identity-enhanced credentials, follow these steps:
 *
 * - Call the GetIdentityContext API to retrieve an identity token for the specified user.
 *
 * - Use the identity token with the STS AssumeRole API to obtain identity-enhanced IAM role session credentials.
 *
 * **Usage with STS AssumeRole**
 *
 * The identity token returned by this API should be used with the STS AssumeRole API to obtain credentials for an identity-enhanced IAM role session. When calling AssumeRole, include the identity token in the `ProvidedContexts` parameter with `ProviderArn` set to `arn:aws:iam::aws:contextProvider/QuickSight` and `ContextAssertion` set to the identity token received from this API.
 *
 * The assumed role must allow the `sts:SetContext` action in addition to `sts:AssumeRole` in its trust relationship policy. The trust policy should include both actions for the principal that will be assuming the role.
 */
export const getIdentityContext: API.OperationMethod<
  GetIdentityContextRequest,
  GetIdentityContextResponse,
  GetIdentityContextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/identity-context",
    input: {
      AwsAccountId: 0,
      UserIdentifier: { UserName: 0, Email: 0, UserArn: 0 },
      Namespace: 0,
      SessionExpiresAt: 0,
      ContextRegion: 0,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentityContext",
})) as any;

export type GetSessionEmbedUrlError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | QuickSightUserNotFoundException
  | ResourceExistsException
  | ResourceNotFoundException
  | SessionLifetimeInMinutesInvalidException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Generates a session URL and authorization code that you can use to embed the Amazon
 * Amazon Quick Sight console in your web server code. Use
 * `GetSessionEmbedUrl` where you want to provide an authoring portal that
 * allows users to create data sources, datasets, analyses, and dashboards. The users who
 * access an embedded Amazon Quick Sight console need belong to the author or admin security
 * cohort. If you want to restrict permissions to some of these features, add a custom
 * permissions profile to the user with the
 * UpdateUser
 * API operation. Use
 * RegisterUser
 * API operation to add a new user with a custom
 * permission profile attached. For more information, see the following sections in the
 * *Amazon Quick User Guide*:
 *
 * - Embedding
 * Analytics
 *
 * - Customizing Access to the Amazon Quick Console
 */
export const getSessionEmbedUrl: API.OperationMethod<
  GetSessionEmbedUrlRequest,
  GetSessionEmbedUrlResponse,
  GetSessionEmbedUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/session-embed-url",
    input: {
      AwsAccountId: 0,
      EntryPoint: D.m({ query: "entry-point" }),
      SessionLifetimeInMinutes: D.m({ query: "session-lifetime" }),
      UserArn: D.m({ query: "user-arn" }),
    },
    output: { EmbedUrl: D.secret, Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    QuickSightUserNotFoundException,
    ResourceExistsException,
    ResourceNotFoundException,
    SessionLifetimeInMinutesInvalidException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSessionEmbedUrl",
})) as any;

export type ListActionConnectorsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all action connectors in the specified Amazon Web Services account. Returns summary information for each connector including its name, type, creation time, and status.
 */
export const listActionConnectors: API.PaginatedOperationMethod<
  ListActionConnectorsRequest,
  ListActionConnectorsResponse,
  ListActionConnectorsError,
  Credentials | HttpClient.HttpClient,
  ActionConnectorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/action-connectors",
    input: {
      AwsAccountId: 0,
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: {
      ActionConnectorSummaries: D.list(o_ActionConnectorSummary),
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListActionConnectors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ActionConnectorSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAgentsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Lists all agents in an Amazon QuickSight account.
 */
export const listAgents: API.OperationMethod<
  ListAgentsRequest,
  ListAgentsResponse,
  ListAgentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/agents",
    input: {
      AwsAccountId: 0,
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: { AgentSummaries: D.list(o_AgentSummary) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgents",
})) as any;

export type ListAnalysesError =
  | InternalFailureException
  | InvalidNextTokenException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Lists Amazon Quick Sight analyses that exist in the specified Amazon Web Services account.
 */
export const listAnalyses: API.PaginatedOperationMethod<
  ListAnalysesRequest,
  ListAnalysesResponse,
  ListAnalysesError,
  Credentials | HttpClient.HttpClient,
  AnalysisSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/analyses",
    input: {
      AwsAccountId: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: {
      AnalysisSummaryList: D.list(o_AnalysisSummary),
      Status: D.m({ status: true }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidNextTokenException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAnalyses",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AnalysisSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListApprovalPoliciesError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all approval policies in the specified Quick Sight account. The results are paginated. If the
 * response includes a `NextToken` value, pass it in a subsequent call to retrieve the next
 * set of results.
 */
export const listApprovalPolicies: API.PaginatedOperationMethod<
  ListApprovalPoliciesRequest,
  ListApprovalPoliciesResponse,
  ListApprovalPoliciesError,
  Credentials | HttpClient.HttpClient,
  ApprovalPolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /governance/approvalworkflows/policies",
    input: {
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: { Policies: D.list(o_ApprovalPolicy) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApprovalPolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Policies",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAssetBundleExportJobsError =
  | AccessDeniedException
  | InvalidNextTokenException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Lists all asset bundle export jobs that have been taken place in the last 14 days. Jobs
 * created more than 14 days ago are deleted forever and are not returned. If you are using
 * the same job ID for multiple jobs, `ListAssetBundleExportJobs` only returns the
 * most recent job that uses the repeated job ID.
 */
export const listAssetBundleExportJobs: API.PaginatedOperationMethod<
  ListAssetBundleExportJobsRequest,
  ListAssetBundleExportJobsResponse,
  ListAssetBundleExportJobsError,
  Credentials | HttpClient.HttpClient,
  AssetBundleExportJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/asset-bundle-export-jobs",
    input: {
      AwsAccountId: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: {
      AssetBundleExportJobSummaryList: D.list({ CreatedTime: D.ts }),
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    InvalidNextTokenException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssetBundleExportJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AssetBundleExportJobSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAssetBundleImportJobsError =
  | AccessDeniedException
  | InvalidNextTokenException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Lists all asset bundle import jobs that have taken place in the last 14 days. Jobs
 * created more than 14 days ago are deleted forever and are not returned. If you are using
 * the same job ID for multiple jobs, `ListAssetBundleImportJobs` only returns the
 * most recent job that uses the repeated job ID.
 */
export const listAssetBundleImportJobs: API.PaginatedOperationMethod<
  ListAssetBundleImportJobsRequest,
  ListAssetBundleImportJobsResponse,
  ListAssetBundleImportJobsError,
  Credentials | HttpClient.HttpClient,
  AssetBundleImportJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/asset-bundle-import-jobs",
    input: {
      AwsAccountId: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: {
      AssetBundleImportJobSummaryList: D.list({ CreatedTime: D.ts }),
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    InvalidNextTokenException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssetBundleImportJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AssetBundleImportJobSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListBrandsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all brands in an Quick Sight account.
 */
export const listBrands: API.PaginatedOperationMethod<
  ListBrandsRequest,
  ListBrandsResponse,
  ListBrandsError,
  Credentials | HttpClient.HttpClient,
  BrandSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/brands",
    input: {
      AwsAccountId: 0,
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: { Brands: D.list({ CreatedTime: D.ts, LastUpdatedTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBrands",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Brands",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCustomPermissionsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of all the custom permissions profiles.
 */
export const listCustomPermissions: API.PaginatedOperationMethod<
  ListCustomPermissionsRequest,
  ListCustomPermissionsResponse,
  ListCustomPermissionsError,
  Credentials | HttpClient.HttpClient,
  CustomPermissions
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/custom-permissions",
    input: {
      AwsAccountId: 0,
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomPermissions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CustomPermissionsList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDashboardsError =
  | InternalFailureException
  | InvalidNextTokenException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Lists dashboards in an Amazon Web Services account.
 */
export const listDashboards: API.PaginatedOperationMethod<
  ListDashboardsRequest,
  ListDashboardsResponse,
  ListDashboardsError,
  Credentials | HttpClient.HttpClient,
  DashboardSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/dashboards",
    input: {
      AwsAccountId: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: {
      DashboardSummaryList: D.list(o_DashboardSummary),
      Status: D.m({ status: true }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidNextTokenException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDashboards",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DashboardSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDashboardVersionsError =
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Lists all the versions of the dashboards in the Amazon Quick Sight subscription.
 */
export const listDashboardVersions: API.PaginatedOperationMethod<
  ListDashboardVersionsRequest,
  ListDashboardVersionsResponse,
  ListDashboardVersionsError,
  Credentials | HttpClient.HttpClient,
  DashboardVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/dashboards/{DashboardId}/versions",
    input: {
      AwsAccountId: 0,
      DashboardId: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: {
      DashboardVersionSummaryList: D.list({ CreatedTime: D.ts }),
      Status: D.m({ status: true }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDashboardVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DashboardVersionSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataSetsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all of the datasets belonging to the current Amazon Web Services account in an
 * Amazon Web Services Region.
 *
 * The permissions resource is
 * `arn:aws:quicksight:region:aws-account-id:dataset/*`.
 */
export const listDataSets: API.PaginatedOperationMethod<
  ListDataSetsRequest,
  ListDataSetsResponse,
  ListDataSetsError,
  Credentials | HttpClient.HttpClient,
  DataSetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/data-sets",
    input: {
      AwsAccountId: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: {
      DataSetSummaries: D.list(o_DataSetSummary),
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataSets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DataSetSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataSourcesError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists data sources in current Amazon Web Services Region that belong to this Amazon Web Services account.
 */
export const listDataSources: API.PaginatedOperationMethod<
  ListDataSourcesRequest,
  ListDataSourcesResponse,
  ListDataSourcesError,
  Credentials | HttpClient.HttpClient,
  DataSource
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/data-sources",
    input: {
      AwsAccountId: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: {
      DataSources: D.list(o_DataSource),
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataSources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DataSources",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDlpSettingsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all DLP settings in an Amazon Web Services account.
 */
export const listDlpSettings: API.PaginatedOperationMethod<
  ListDlpSettingsRequest,
  ListDlpSettingsResponse,
  ListDlpSettingsError,
  Credentials | HttpClient.HttpClient,
  DlpSettingSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/data-loss-prevention/settings",
    input: {
      AwsAccountId: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: {
      DlpSettingSummaries: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDlpSettings",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DlpSettingSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFlowsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists flows in an Amazon Web Services account.
 */
export const listFlows: API.PaginatedOperationMethod<
  ListFlowsInput,
  ListFlowsOutput,
  ListFlowsError,
  Credentials | HttpClient.HttpClient,
  FlowSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/flows",
    input: {
      AwsAccountId: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: {
      FlowSummaryList: D.list(o_FlowSummary),
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFlows",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FlowSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFolderMembersError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * List all assets (`DASHBOARD`, `ANALYSIS`, and `DATASET`) in a folder.
 */
export const listFolderMembers: API.PaginatedOperationMethod<
  ListFolderMembersRequest,
  ListFolderMembersResponse,
  ListFolderMembersError,
  Credentials | HttpClient.HttpClient,
  MemberIdArnPair
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/folders/{FolderId}/members",
    input: {
      AwsAccountId: 0,
      FolderId: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFolderMembers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FolderMemberList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFoldersError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Lists all folders in an account.
 */
export const listFolders: API.PaginatedOperationMethod<
  ListFoldersRequest,
  ListFoldersResponse,
  ListFoldersError,
  Credentials | HttpClient.HttpClient,
  FolderSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/folders",
    input: {
      AwsAccountId: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: {
      Status: D.m({ status: true }),
      FolderSummaryList: D.list(o_FolderSummary),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFolders",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FolderSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFoldersForResourceError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * List all folders that a resource is a member of.
 */
export const listFoldersForResource: API.PaginatedOperationMethod<
  ListFoldersForResourceRequest,
  ListFoldersForResourceResponse,
  ListFoldersForResourceError,
  Credentials | HttpClient.HttpClient,
  Arn
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/resource/{ResourceArn}/folders",
    input: {
      AwsAccountId: 0,
      ResourceArn: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFoldersForResource",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Folders",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGroupMembershipsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists member users in a group.
 */
export const listGroupMemberships: API.PaginatedOperationMethod<
  ListGroupMembershipsRequest,
  ListGroupMembershipsResponse,
  ListGroupMembershipsError,
  Credentials | HttpClient.HttpClient,
  GroupMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/namespaces/{Namespace}/groups/{GroupName}/members",
    input: {
      GroupName: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
      AwsAccountId: 0,
      Namespace: 0,
    },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupMemberships",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GroupMemberList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGroupsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all user groups in Amazon Quick Sight.
 */
export const listGroups: API.PaginatedOperationMethod<
  ListGroupsRequest,
  ListGroupsResponse,
  ListGroupsError,
  Credentials | HttpClient.HttpClient,
  Group
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/namespaces/{Namespace}/groups",
    input: {
      AwsAccountId: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
      Namespace: 0,
    },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GroupList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListIAMPolicyAssignmentsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the
 * IAM policy assignments in the current Amazon Quick Sight
 * account.
 */
export const listIAMPolicyAssignments: API.PaginatedOperationMethod<
  ListIAMPolicyAssignmentsRequest,
  ListIAMPolicyAssignmentsResponse,
  ListIAMPolicyAssignmentsError,
  Credentials | HttpClient.HttpClient,
  IAMPolicyAssignmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/namespaces/{Namespace}/v2/iam-policy-assignments",
    input: {
      AwsAccountId: 0,
      AssignmentStatus: D.m({ query: "assignment-status" }),
      Namespace: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIAMPolicyAssignments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "IAMPolicyAssignments",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListIAMPolicyAssignmentsForUserError =
  | AccessDeniedException
  | ConcurrentUpdatingException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all of
 * the IAM policy assignments, including the Amazon
 * Resource Names
 * (ARNs),
 * for the IAM policies assigned to the specified user and
 * group,
 * or groups that the user belongs to.
 */
export const listIAMPolicyAssignmentsForUser: API.PaginatedOperationMethod<
  ListIAMPolicyAssignmentsForUserRequest,
  ListIAMPolicyAssignmentsForUserResponse,
  ListIAMPolicyAssignmentsForUserError,
  Credentials | HttpClient.HttpClient,
  ActiveIAMPolicyAssignment
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/namespaces/{Namespace}/users/{UserName}/iam-policy-assignments",
    input: {
      AwsAccountId: 0,
      UserName: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
      Namespace: 0,
    },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    ConcurrentUpdatingException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIAMPolicyAssignmentsForUser",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ActiveAssignments",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListIdentityPropagationConfigsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all services and authorized targets that the Quick Sight IAM Identity Center application can access.
 *
 * This operation is only supported for Quick Sight accounts that use IAM Identity Center.
 */
export const listIdentityPropagationConfigs: API.OperationMethod<
  ListIdentityPropagationConfigsRequest,
  ListIdentityPropagationConfigsResponse,
  ListIdentityPropagationConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/identity-propagation-config",
    input: {
      AwsAccountId: 0,
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdentityPropagationConfigs",
})) as any;

export type ListIngestionsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the history of SPICE ingestions for a dataset. Limited to 5 TPS per user and 25 TPS per account.
 */
export const listIngestions: API.PaginatedOperationMethod<
  ListIngestionsRequest,
  ListIngestionsResponse,
  ListIngestionsError,
  Credentials | HttpClient.HttpClient,
  Ingestion
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/data-sets/{DataSetId}/ingestions",
    input: {
      DataSetId: 0,
      NextToken: D.m({ query: "next-token" }),
      AwsAccountId: 0,
      MaxResults: D.m({ query: "max-results" }),
    },
    output: { Ingestions: D.list(o_Ingestion), Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIngestions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Ingestions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListKnowledgeBasesError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | InvalidRequestException
  | PreconditionNotMetException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all knowledge bases in an Amazon QuickSight account.
 */
export const listKnowledgeBases: API.PaginatedOperationMethod<
  ListKnowledgeBasesRequest,
  ListKnowledgeBasesResponse,
  ListKnowledgeBasesError,
  Credentials | HttpClient.HttpClient,
  KnowledgeBaseSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/accounts/{AwsAccountId}/knowledge-bases",
    input: {
      AwsAccountId: 0,
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: {
      KnowledgeBaseSummaries: D.list(o_KnowledgeBaseSummary),
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    InvalidRequestException,
    PreconditionNotMetException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListKnowledgeBases",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "KnowledgeBaseSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLimitsProfilesError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all limits profiles in an Amazon Quick Sight account. Results are paginated. Use the `maxResults` parameter to limit the number of results returned in a single call, and use the `nextToken` parameter to retrieve the next page of results.
 */
export const listLimitsProfiles: API.PaginatedOperationMethod<
  ListLimitsProfilesRequest,
  ListLimitsProfilesResponse,
  ListLimitsProfilesError,
  Credentials | HttpClient.HttpClient,
  LimitsProfile
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /governance/limits/accounts/{accountId}/profiles",
    input: {
      accountId: 0,
      resourceType: D.m({ query: "resourceType" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { profiles: D.list(o_LimitsProfile) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLimitsProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "profiles",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNamespacesError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the namespaces for the specified Amazon Web Services account. This operation doesn't list deleted namespaces.
 */
export const listNamespaces: API.PaginatedOperationMethod<
  ListNamespacesRequest,
  ListNamespacesResponse,
  ListNamespacesError,
  Credentials | HttpClient.HttpClient,
  NamespaceInfoV2
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/namespaces",
    input: {
      AwsAccountId: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNamespaces",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Namespaces",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOAuthClientApplicationsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all OAuthClientApplications in the current Amazon Web Services Region that belong to this Amazon Web Services account.
 */
export const listOAuthClientApplications: API.PaginatedOperationMethod<
  ListOAuthClientApplicationsRequest,
  ListOAuthClientApplicationsResponse,
  ListOAuthClientApplicationsError,
  Credentials | HttpClient.HttpClient,
  OAuthClientApplicationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/oauth-client-applications",
    input: {
      AwsAccountId: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: {
      OAuthClientApplications: D.list({
        CreatedTime: D.ts,
        LastUpdatedTime: D.ts,
      }),
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOAuthClientApplications",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OAuthClientApplications",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRefreshSchedulesError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the refresh schedules of a dataset. Each dataset can have up to 5 schedules.
 */
export const listRefreshSchedules: API.OperationMethod<
  ListRefreshSchedulesRequest,
  ListRefreshSchedulesResponse,
  ListRefreshSchedulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/data-sets/{DataSetId}/refresh-schedules",
    input: { AwsAccountId: 0, DataSetId: 0 },
    output: {
      RefreshSchedules: D.list(o_RefreshSchedule),
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRefreshSchedules",
})) as any;

export type ListRoleMembershipsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | LimitExceededException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all groups that are associated with a role.
 */
export const listRoleMemberships: API.PaginatedOperationMethod<
  ListRoleMembershipsRequest,
  ListRoleMembershipsResponse,
  ListRoleMembershipsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/namespaces/{Namespace}/roles/{Role}/members",
    input: {
      Role: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
      AwsAccountId: 0,
      Namespace: 0,
    },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    LimitExceededException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRoleMemberships",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "MembersList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSelfUpgradesError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | LimitExceededException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all self-upgrade requests for a Quick account.
 */
export const listSelfUpgrades: API.OperationMethod<
  ListSelfUpgradesRequest,
  ListSelfUpgradesResponse,
  ListSelfUpgradesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/namespaces/{Namespace}/self-upgrade-requests",
    input: {
      AwsAccountId: 0,
      Namespace: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    LimitExceededException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSelfUpgrades",
})) as any;

export type ListSpaceResourcesError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the resources in an Amazon QuickSight space.
 */
export const listSpaceResources: API.OperationMethod<
  ListSpaceResourcesRequest,
  ListSpaceResourcesResponse,
  ListSpaceResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/accounts/{AwsAccountId}/spaces/{SpaceId}/resources",
    input: { AwsAccountId: 0, SpaceId: 0 },
    output: { SpaceResources: D.list({ UpdatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSpaceResources",
})) as any;

export type ListSpacesError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all Amazon QuickSight spaces in an Amazon Web Services account.
 */
export const listSpaces: API.OperationMethod<
  ListSpacesRequest,
  ListSpacesResponse,
  ListSpacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/accounts/{AwsAccountId}/spaces",
    input: {
      AwsAccountId: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: { SpaceSummaries: D.list(o_SpaceSummary) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSpaces",
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the tags assigned to a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /resources/{ResourceArn}/tags",
    input: { ResourceArn: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTemplateAliasesError =
  | InternalFailureException
  | InvalidNextTokenException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Lists all the aliases of a template.
 */
export const listTemplateAliases: API.PaginatedOperationMethod<
  ListTemplateAliasesRequest,
  ListTemplateAliasesResponse,
  ListTemplateAliasesError,
  Credentials | HttpClient.HttpClient,
  TemplateAlias
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/templates/{TemplateId}/aliases",
    input: {
      AwsAccountId: 0,
      TemplateId: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-result" }),
    },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    InternalFailureException,
    InvalidNextTokenException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTemplateAliases",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TemplateAliasList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTemplatesError =
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Lists all the templates in the current Amazon Quick Sight account.
 */
export const listTemplates: API.PaginatedOperationMethod<
  ListTemplatesRequest,
  ListTemplatesResponse,
  ListTemplatesError,
  Credentials | HttpClient.HttpClient,
  TemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/templates",
    input: {
      AwsAccountId: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-result" }),
    },
    output: {
      TemplateSummaryList: D.list({ CreatedTime: D.ts, LastUpdatedTime: D.ts }),
      Status: D.m({ status: true }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTemplates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TemplateSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTemplateVersionsError =
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Lists all the versions of the templates in the current Amazon Quick Sight account.
 */
export const listTemplateVersions: API.PaginatedOperationMethod<
  ListTemplateVersionsRequest,
  ListTemplateVersionsResponse,
  ListTemplateVersionsError,
  Credentials | HttpClient.HttpClient,
  TemplateVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/templates/{TemplateId}/versions",
    input: {
      AwsAccountId: 0,
      TemplateId: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: {
      TemplateVersionSummaryList: D.list({ CreatedTime: D.ts }),
      Status: D.m({ status: true }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTemplateVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TemplateVersionSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListThemeAliasesError =
  | ConflictException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Lists all the aliases of a theme.
 */
export const listThemeAliases: API.OperationMethod<
  ListThemeAliasesRequest,
  ListThemeAliasesResponse,
  ListThemeAliasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/themes/{ThemeId}/aliases",
    input: {
      AwsAccountId: 0,
      ThemeId: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-result" }),
    },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    ConflictException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThemeAliases",
})) as any;

export type ListThemesError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Lists all the themes in the current Amazon Web Services account.
 */
export const listThemes: API.PaginatedOperationMethod<
  ListThemesRequest,
  ListThemesResponse,
  ListThemesError,
  Credentials | HttpClient.HttpClient,
  ThemeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/themes",
    input: {
      AwsAccountId: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
      Type: D.m({ query: "type" }),
    },
    output: {
      ThemeSummaryList: D.list({ CreatedTime: D.ts, LastUpdatedTime: D.ts }),
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThemes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ThemeSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListThemeVersionsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Lists all the versions of the themes in the current Amazon Web Services account.
 */
export const listThemeVersions: API.PaginatedOperationMethod<
  ListThemeVersionsRequest,
  ListThemeVersionsResponse,
  ListThemeVersionsError,
  Credentials | HttpClient.HttpClient,
  ThemeVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/themes/{ThemeId}/versions",
    input: {
      AwsAccountId: 0,
      ThemeId: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: {
      ThemeVersionSummaryList: D.list({ CreatedTime: D.ts }),
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThemeVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ThemeVersionSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTopicRefreshSchedulesError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all of the refresh schedules for a topic.
 */
export const listTopicRefreshSchedules: API.OperationMethod<
  ListTopicRefreshSchedulesRequest,
  ListTopicRefreshSchedulesResponse,
  ListTopicRefreshSchedulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/topics/{TopicId}/schedules",
    input: { AwsAccountId: 0, TopicId: 0 },
    output: {
      RefreshSchedules: D.list({ RefreshSchedule: o_TopicRefreshSchedule }),
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTopicRefreshSchedules",
})) as any;

export type ListTopicReviewedAnswersError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all reviewed answers for a Q Topic.
 */
export const listTopicReviewedAnswers: API.OperationMethod<
  ListTopicReviewedAnswersRequest,
  ListTopicReviewedAnswersResponse,
  ListTopicReviewedAnswersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/topics/{TopicId}/reviewed-answers",
    input: { AwsAccountId: 0, TopicId: 0 },
    output: {
      Answers: D.list({
        Question: D.secret,
        Mir: o_TopicIR,
        PrimaryVisual: o_TopicVisual,
      }),
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTopicReviewedAnswers",
})) as any;

export type ListTopicsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all of the topics within an account.
 */
export const listTopics: API.PaginatedOperationMethod<
  ListTopicsRequest,
  ListTopicsResponse,
  ListTopicsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/topics",
    input: {
      AwsAccountId: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTopics",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTopicsV2Error =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all of the Q topics in the specified Amazon Web Services account in an Amazon Web Services Region.
 */
export const listTopicsV2: API.PaginatedOperationMethod<
  ListTopicsV2Request,
  ListTopicsV2Response,
  ListTopicsV2Error,
  Credentials | HttpClient.HttpClient,
  TopicV2Summary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/topicsV2",
    input: {
      AwsAccountId: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTopicsV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TopicSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListUserGroupsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the Amazon Quick Sight groups that an Amazon Quick Sight user is a member of.
 */
export const listUserGroups: API.PaginatedOperationMethod<
  ListUserGroupsRequest,
  ListUserGroupsResponse,
  ListUserGroupsError,
  Credentials | HttpClient.HttpClient,
  Group
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/namespaces/{Namespace}/users/{UserName}/groups",
    input: {
      UserName: 0,
      AwsAccountId: 0,
      Namespace: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUserGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GroupList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListUsersError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of all of the Amazon Quick Sight users belonging to this account.
 */
export const listUsers: API.PaginatedOperationMethod<
  ListUsersRequest,
  ListUsersResponse,
  ListUsersError,
  Credentials | HttpClient.HttpClient,
  User
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/namespaces/{Namespace}/users",
    input: {
      AwsAccountId: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
      Namespace: 0,
    },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUsers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "UserList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListUsersIndexCapacityError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidRequestException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists per-user index capacity consumption for an account.
 */
export const listUsersIndexCapacity: API.OperationMethod<
  ListUsersIndexCapacityRequest,
  ListUsersIndexCapacityResponse,
  ListUsersIndexCapacityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{awsAccountId}/quick-index/user-capacity",
    input: {
      awsAccountId: 0,
      namespace: 0,
      filters: D.list({
        userNameOrEmail: { prefix: 0 },
        totalCapacityBytes: { minBytes: 0, maxBytes: 0 },
      }),
      sortBy: 0,
      sortOrder: 0,
      maxResults: 0,
      nextToken: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidRequestException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUsersIndexCapacity",
})) as any;

export type ListVPCConnectionsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Lists all of the VPC connections in the current set Amazon Web Services Region of an
 * Amazon Web Services account.
 */
export const listVPCConnections: API.PaginatedOperationMethod<
  ListVPCConnectionsRequest,
  ListVPCConnectionsResponse,
  ListVPCConnectionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/{AwsAccountId}/vpc-connections",
    input: {
      AwsAccountId: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: {
      VPCConnectionSummaries: D.list({
        CreatedTime: D.ts,
        LastUpdatedTime: D.ts,
      }),
      Status: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVPCConnections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PredictQAResultsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ThrottlingException
  | CommonErrors;
/**
 * Predicts existing visuals or generates new visuals to answer a given query.
 *
 * This API uses trusted identity propagation to ensure that an end user is authenticated and receives the embed URL that is specific to that user. The IAM Identity Center application that the user has logged into needs to have trusted Identity Propagation enabled for Quick with the scope value set to `quicksight:read`. Before you use this action, make sure that you have configured the relevant Quick resource and permissions.
 *
 * We recommend enabling the `QSearchStatus` API to unlock the full potential of `PredictQnA`. When `QSearchStatus` is enabled, it first checks the specified dashboard for any existing visuals that match the question. If no matching visuals are found, `PredictQnA` uses generative Q&A to provide an answer. To update the `QSearchStatus`, see UpdateQuickSightQSearchConfiguration.
 */
export const predictQAResults: API.OperationMethod<
  PredictQAResultsRequest,
  PredictQAResultsResponse,
  PredictQAResultsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/qa/predict",
    input: {
      AwsAccountId: 0,
      QueryText: 0,
      IncludeQuickSightQIndex: 0,
      IncludeGeneratedAnswer: 0,
      MaxTopicsToConsider: 0,
    },
    output: {
      PrimaryResult: o_QAResult,
      AdditionalResults: D.list(o_QAResult),
      Status: D.m({ status: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PredictQAResults",
})) as any;

export type PutDataSetRefreshPropertiesError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates or updates the dataset refresh properties for the dataset.
 */
export const putDataSetRefreshProperties: API.OperationMethod<
  PutDataSetRefreshPropertiesRequest,
  PutDataSetRefreshPropertiesResponse,
  PutDataSetRefreshPropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/data-sets/{DataSetId}/refresh-properties",
    input: {
      AwsAccountId: 0,
      DataSetId: 0,
      DataSetRefreshProperties: i_DataSetRefreshProperties,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDataSetRefreshProperties",
})) as any;

export type RegisterUserError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | PreconditionNotMetException
  | ResourceExistsException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an Amazon Quick Sight user whose identity is associated with the Identity and Access Management (IAM) identity or role specified in the request. When you register a new user from the Quick Sight API, Quick Sight generates a registration URL. The user accesses this registration URL to create their account. Quick Sight doesn't send a registration email to users who are registered from the Quick Sight API. If you want new users to receive a registration email, then add those users in the Quick Sight console. For more information on registering a new user in the Quick Sight console, see Inviting users to access Quick Sight.
 */
export const registerUser: API.OperationMethod<
  RegisterUserRequest,
  RegisterUserResponse,
  RegisterUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/namespaces/{Namespace}/users",
    input: {
      IdentityType: 0,
      Email: 0,
      UserRole: 0,
      IamArn: 0,
      SessionName: 0,
      AwsAccountId: 0,
      Namespace: 0,
      UserName: 0,
      CustomPermissionsName: 0,
      ExternalLoginFederationProviderType: 0,
      CustomFederationProviderUrl: 0,
      ExternalLoginId: 0,
      Tags: D.list(i_Tag),
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    PreconditionNotMetException,
    ResourceExistsException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterUser",
})) as any;

export type RestoreAnalysisError =
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Restores an analysis.
 */
export const restoreAnalysis: API.OperationMethod<
  RestoreAnalysisRequest,
  RestoreAnalysisResponse,
  RestoreAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/restore/analyses/{AnalysisId}",
    input: {
      AwsAccountId: 0,
      AnalysisId: 0,
      RestoreToFolders: D.m({ query: "restore-to-folders" }),
    },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreAnalysis",
})) as any;

export type SearchActionConnectorsError =
  | AccessDeniedException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches for action connectors in the specified Amazon Web Services account using filters. You can search by connector name, type, or user permissions.
 */
export const searchActionConnectors: API.PaginatedOperationMethod<
  SearchActionConnectorsRequest,
  SearchActionConnectorsResponse,
  SearchActionConnectorsError,
  Credentials | HttpClient.HttpClient,
  ActionConnectorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/search/action-connectors",
    input: {
      AwsAccountId: 0,
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
      Filters: D.list({ Name: 0, Operator: 0, Value: 0 }),
    },
    output: {
      Status: D.m({ status: true }),
      ActionConnectorSummaries: D.list(o_ActionConnectorSummary),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchActionConnectors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ActionConnectorSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchAgentsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches for agents based on specified filters.
 */
export const searchAgents: API.OperationMethod<
  SearchAgentsRequest,
  SearchAgentsResponse,
  SearchAgentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/search/agents",
    input: {
      AwsAccountId: 0,
      Filters: D.list({ Name: 0, Operator: 0, Value: 0 }),
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: { AgentSummaries: D.list(o_AgentSummary) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchAgents",
})) as any;

export type SearchAnalysesError =
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Searches for analyses that belong to the user specified in the filter.
 *
 * This operation is eventually consistent. The results are best effort and may not reflect very recent updates and changes.
 */
export const searchAnalyses: API.PaginatedOperationMethod<
  SearchAnalysesRequest,
  SearchAnalysesResponse,
  SearchAnalysesError,
  Credentials | HttpClient.HttpClient,
  AnalysisSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/search/analyses",
    input: {
      AwsAccountId: 0,
      Filters: D.list({ Operator: 0, Name: 0, Value: 0 }),
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      AnalysisSummaryList: D.list(o_AnalysisSummary),
      Status: D.m({ status: true }),
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchAnalyses",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AnalysisSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchDashboardsError =
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Searches for dashboards that belong to a user.
 *
 * This operation is eventually consistent. The results are best effort and may not
 * reflect very recent updates and changes.
 */
export const searchDashboards: API.PaginatedOperationMethod<
  SearchDashboardsRequest,
  SearchDashboardsResponse,
  SearchDashboardsError,
  Credentials | HttpClient.HttpClient,
  DashboardSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/search/dashboards",
    input: {
      AwsAccountId: 0,
      Filters: D.list({ Operator: 0, Name: 0, Value: 0 }),
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      DashboardSummaryList: D.list(o_DashboardSummary),
      Status: D.m({ status: true }),
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchDashboards",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DashboardSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchDataSetsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Use the `SearchDataSets` operation to search for datasets that belong to an
 * account.
 */
export const searchDataSets: API.PaginatedOperationMethod<
  SearchDataSetsRequest,
  SearchDataSetsResponse,
  SearchDataSetsError,
  Credentials | HttpClient.HttpClient,
  DataSetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/search/data-sets",
    input: {
      AwsAccountId: 0,
      Filters: D.list({ Operator: 0, Name: 0, Value: 0 }),
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      DataSetSummaries: D.list(o_DataSetSummary),
      Status: D.m({ status: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchDataSets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DataSetSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchDataSourcesError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Use the `SearchDataSources` operation to search for data sources that
 * belong to an account.
 */
export const searchDataSources: API.PaginatedOperationMethod<
  SearchDataSourcesRequest,
  SearchDataSourcesResponse,
  SearchDataSourcesError,
  Credentials | HttpClient.HttpClient,
  DataSourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/search/data-sources",
    input: {
      AwsAccountId: 0,
      Filters: D.list({ Operator: 0, Name: 0, Value: 0 }),
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      DataSourceSummaries: D.list({ CreatedTime: D.ts, LastUpdatedTime: D.ts }),
      Status: D.m({ status: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchDataSources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DataSourceSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchFlowsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ThrottlingException
  | CommonErrors;
/**
 * Search for the flows in an Amazon Web Services account.
 */
export const searchFlows: API.PaginatedOperationMethod<
  SearchFlowsInput,
  SearchFlowsOutput,
  SearchFlowsError,
  Credentials | HttpClient.HttpClient,
  FlowSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/flows/searchFlows",
    input: {
      AwsAccountId: 0,
      Filters: D.list({ Name: 0, Operator: 0, Value: 0 }),
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      FlowSummaryList: D.list(o_FlowSummary),
      Status: D.m({ status: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchFlows",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FlowSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchFoldersError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Searches the subfolders in a folder.
 */
export const searchFolders: API.PaginatedOperationMethod<
  SearchFoldersRequest,
  SearchFoldersResponse,
  SearchFoldersError,
  Credentials | HttpClient.HttpClient,
  FolderSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/search/folders",
    input: {
      AwsAccountId: 0,
      Filters: D.list({ Operator: 0, Name: 0, Value: 0 }),
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      Status: D.m({ status: true }),
      FolderSummaryList: D.list(o_FolderSummary),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchFolders",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FolderSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchGroupsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Use the `SearchGroups` operation to search groups in a specified Quick Sight namespace using the supplied filters.
 */
export const searchGroups: API.PaginatedOperationMethod<
  SearchGroupsRequest,
  SearchGroupsResponse,
  SearchGroupsError,
  Credentials | HttpClient.HttpClient,
  Group
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/namespaces/{Namespace}/groups-search",
    input: {
      AwsAccountId: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
      Namespace: 0,
      Filters: D.list({ Operator: 0, Name: 0, Value: 0 }),
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GroupList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchKnowledgeBasesError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches for a subset of knowledge bases based on specified filters.
 */
export const searchKnowledgeBases: API.PaginatedOperationMethod<
  SearchKnowledgeBasesRequest,
  SearchKnowledgeBasesResponse,
  SearchKnowledgeBasesError,
  Credentials | HttpClient.HttpClient,
  KnowledgeBaseSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/accounts/{AwsAccountId}/search/knowledge-bases",
    input: {
      AwsAccountId: 0,
      NextToken: 0,
      MaxResults: 0,
      Filters: D.list({ name: 0, operator: 0, value: 0 }),
      SortBy: { sortByField: 0, sortOrder: 0 },
    },
    output: {
      KnowledgeBaseSummaries: D.list(o_KnowledgeBaseSummary),
      Status: D.m({ status: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchKnowledgeBases",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "KnowledgeBaseSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchSpacesError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches for Amazon QuickSight spaces that match the specified filters.
 */
export const searchSpaces: API.OperationMethod<
  SearchSpacesRequest,
  SearchSpacesResponse,
  SearchSpacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/accounts/{AwsAccountId}/search/spaces",
    input: {
      AwsAccountId: 0,
      NextToken: 0,
      MaxResults: 0,
      Filters: D.list({ name: 0, operator: 0, value: 0 }),
    },
    output: { SpaceSummaries: D.list(o_SpaceSummary) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchSpaces",
})) as any;

export type SearchTopicsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Searches for any Q topic that exists in an Quick account.
 */
export const searchTopics: API.PaginatedOperationMethod<
  SearchTopicsRequest,
  SearchTopicsResponse,
  SearchTopicsError,
  Credentials | HttpClient.HttpClient,
  TopicSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/search/topics",
    input: {
      AwsAccountId: 0,
      Filters: D.list(i_TopicSearchFilter),
      NextToken: 0,
      MaxResults: 0,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchTopics",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TopicSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchTopicsV2Error =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches for any Q topic that exists in an Amazon Web Services account.
 */
export const searchTopicsV2: API.PaginatedOperationMethod<
  SearchTopicsV2Request,
  SearchTopicsV2Response,
  SearchTopicsV2Error,
  Credentials | HttpClient.HttpClient,
  TopicV2Summary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/search/topicsV2",
    input: {
      AwsAccountId: 0,
      Filters: D.list(i_TopicSearchFilter),
      NextToken: 0,
      MaxResults: 0,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchTopicsV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TopicSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type StartAssetBundleExportJobError =
  | AccessDeniedException
  | ConflictException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Starts an Asset Bundle export job.
 *
 * An Asset Bundle export job exports specified Amazon Quick Sight assets. You can also choose to
 * export any asset dependencies in the same job. Export jobs run asynchronously and can be
 * polled with a `DescribeAssetBundleExportJob` API call. When a job is
 * successfully completed, a download URL that contains the exported assets is returned. The
 * URL is valid for 5 minutes and can be refreshed with a
 * `DescribeAssetBundleExportJob` API call. Each Amazon Quick Sight account can
 * run up to 5 export jobs concurrently.
 *
 * The API caller must have the necessary permissions in their IAM role to
 * access each resource before the resources can be exported.
 */
export const startAssetBundleExportJob: API.OperationMethod<
  StartAssetBundleExportJobRequest,
  StartAssetBundleExportJobResponse,
  StartAssetBundleExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/asset-bundle-export-jobs/export",
    input: {
      AwsAccountId: 0,
      AssetBundleExportJobId: 0,
      ResourceArns: 0,
      IncludeAllDependencies: 0,
      ExportFormat: 0,
      CloudFormationOverridePropertyConfiguration: {
        ResourceIdOverrideConfiguration: { PrefixForAllResources: 0 },
        VPCConnections: D.list({ Arn: 0, Properties: 0 }),
        RefreshSchedules: D.list({ Arn: 0, Properties: 0 }),
        DataSources: D.list({ Arn: 0, Properties: 0 }),
        DataSets: D.list({ Arn: 0, Properties: 0 }),
        Themes: D.list({ Arn: 0, Properties: 0 }),
        Analyses: D.list({ Arn: 0, Properties: 0 }),
        Dashboards: D.list({ Arn: 0, Properties: 0 }),
        Folders: D.list({ Arn: 0, Properties: 0 }),
        TopicsV2: D.list({ Arn: 0, Properties: 0 }),
      },
      IncludePermissions: 0,
      IncludeTags: 0,
      ValidationStrategy: { StrictModeForAllResources: 0 },
      IncludeFolderMemberships: 0,
      IncludeFolderMembers: 0,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAssetBundleExportJob",
})) as any;

export type StartAssetBundleImportJobError =
  | AccessDeniedException
  | ConflictException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Starts an Asset Bundle import job.
 *
 * An Asset Bundle import job imports specified Amazon Quick Sight assets into an Amazon Quick
 * Sight account. You can also choose to import a naming prefix and specified configuration
 * overrides. The assets that are contained in the bundle file that you provide are used to
 * create or update a new or existing asset in your Amazon Quick Sight account. Each Amazon
 * Quick Sight account can run up to 5 import jobs concurrently.
 *
 * The API caller must have the necessary `"create"`, `"describe"`,
 * and `"update"` permissions in their IAM role to access each
 * resource type that is contained in the bundle file before the resources can be
 * imported.
 */
export const startAssetBundleImportJob: API.OperationMethod<
  StartAssetBundleImportJobRequest,
  StartAssetBundleImportJobResponse,
  StartAssetBundleImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/asset-bundle-import-jobs/import",
    input: {
      AwsAccountId: 0,
      AssetBundleImportJobId: 0,
      AssetBundleImportSource: { Body: 0, S3Uri: 0 },
      OverrideParameters: {
        ResourceIdOverrideConfiguration: { PrefixForAllResources: 0 },
        VPCConnections: D.list({
          VPCConnectionId: 0,
          Name: 0,
          SubnetIds: 0,
          SecurityGroupIds: 0,
          DnsResolvers: 0,
          RoleArn: 0,
        }),
        RefreshSchedules: D.list({
          DataSetId: 0,
          ScheduleId: 0,
          StartAfterDateTime: 0,
        }),
        DataSources: D.list({
          DataSourceId: 0,
          Name: 0,
          DataSourceParameters: i_DataSourceParameters,
          VpcConnectionProperties: i_VpcConnectionProperties,
          SslProperties: i_SslProperties,
          Credentials: {
            CredentialPair: { Username: 0, Password: 0 },
            SecretArn: 0,
          },
        }),
        DataSets: D.list({
          DataSetId: 0,
          Name: 0,
          DataSetRefreshProperties: i_DataSetRefreshProperties,
        }),
        Themes: D.list({ ThemeId: 0, Name: 0 }),
        Analyses: D.list({ AnalysisId: 0, Name: 0 }),
        Dashboards: D.list({ DashboardId: 0, Name: 0 }),
        Folders: D.list({ FolderId: 0, Name: 0, ParentFolderArn: 0 }),
        TopicsV2: D.list({ TopicId: 0, Name: 0, Description: 0 }),
      },
      FailureAction: 0,
      OverridePermissions: {
        DataSources: D.list({
          DataSourceIds: 0,
          Permissions: i_AssetBundleResourcePermissions,
        }),
        DataSets: D.list({
          DataSetIds: 0,
          Permissions: i_AssetBundleResourcePermissions,
        }),
        Themes: D.list({
          ThemeIds: 0,
          Permissions: i_AssetBundleResourcePermissions,
        }),
        Analyses: D.list({
          AnalysisIds: 0,
          Permissions: i_AssetBundleResourcePermissions,
        }),
        Dashboards: D.list({
          DashboardIds: 0,
          Permissions: i_AssetBundleResourcePermissions,
          LinkSharingConfiguration: {
            Permissions: i_AssetBundleResourcePermissions,
          },
        }),
        Folders: D.list({
          FolderIds: 0,
          Permissions: i_AssetBundleResourcePermissions,
        }),
        TopicsV2: D.list({
          TopicIds: 0,
          Permissions: i_AssetBundleResourcePermissions,
        }),
      },
      OverrideTags: {
        VPCConnections: D.list({ VPCConnectionIds: 0, Tags: D.list(i_Tag) }),
        DataSources: D.list({ DataSourceIds: 0, Tags: D.list(i_Tag) }),
        DataSets: D.list({ DataSetIds: 0, Tags: D.list(i_Tag) }),
        Themes: D.list({ ThemeIds: 0, Tags: D.list(i_Tag) }),
        Analyses: D.list({ AnalysisIds: 0, Tags: D.list(i_Tag) }),
        Dashboards: D.list({ DashboardIds: 0, Tags: D.list(i_Tag) }),
        Folders: D.list({ FolderIds: 0, Tags: D.list(i_Tag) }),
        TopicsV2: D.list({ TopicIds: 0, Tags: D.list(i_Tag) }),
      },
      OverrideValidationStrategy: { StrictModeForAllResources: 0 },
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAssetBundleImportJob",
})) as any;

export type StartAutomationJobError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Starts a new job for a specified automation. The job runs the automation with the provided input payload.
 */
export const startAutomationJob: API.OperationMethod<
  StartAutomationJobRequest,
  StartAutomationJobResponse,
  StartAutomationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/automation-groups/{AutomationGroupId}/automations/{AutomationId}/jobs",
    input: {
      AwsAccountId: 0,
      AutomationGroupId: 0,
      AutomationId: 0,
      InputPayload: 0,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAutomationJob",
})) as any;

export type StartDashboardSnapshotJobError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedPricingPlanException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Starts an asynchronous job that generates a snapshot of a dashboard's output. You can request one or several of the following format configurations in each API call.
 *
 * - 1 PDF
 *
 * - 1 Excel workbook that includes up to 5 table or pivot table visuals
 *
 * - 5 CSVs from table or pivot table visuals
 *
 * Exporting CSV, Excel, or Pixel Perfect PDF reports requires Pixel Perfect Report Add-on.
 *
 * The status of a submitted job can be polled with the `DescribeDashboardSnapshotJob` API. When you call the `DescribeDashboardSnapshotJob` API, check the `JobStatus` field in the response. Once the job reaches a `COMPLETED` or `FAILED` status, use the `DescribeDashboardSnapshotJobResult` API to obtain the URLs for the generated files. If the job fails, the `DescribeDashboardSnapshotJobResult` API returns detailed information about the error that occurred.
 *
 * **StartDashboardSnapshotJob API throttling**
 *
 * Quick Sight utilizes API throttling to create a more consistent user experience within a time span for customers when they call the `StartDashboardSnapshotJob`. By default, 12 jobs can run simlutaneously in one Amazon Web Services account and users can submit up 10 API requests per second before an account is throttled. If an overwhelming number of API requests are made by the same user in a short period of time, Quick Sight throttles the API calls to maintin an optimal experience and reliability for all Quick Sight users.
 *
 * **Common throttling scenarios**
 *
 * The following list provides information about the most commin throttling scenarios that can occur.
 *
 * - **A large number of `SnapshotExport` API jobs are running simultaneously on an Amazon Web Services account.** When a new `StartDashboardSnapshotJob` is created and there are already 12 jobs with the `RUNNING` status, the new job request fails and returns a `LimitExceededException` error. Wait for a current job to comlpete before you resubmit the new job.
 *
 * - **A large number of API requests are submitted on an Amazon Web Services account.** When a user makes more than 10 API calls to the Quick Sight API in one second, a `ThrottlingException` is returned.
 *
 * If your use case requires a higher throttling limit, contact your account admin or Amazon Web ServicesSupport to explore options to tailor a more optimal expereince for your account.
 *
 * **Best practices to handle throttling**
 *
 * If your use case projects high levels of API traffic, try to reduce the degree of frequency and parallelism of API calls as much as you can to avoid throttling. You can also perform a timing test to calculate an estimate for the total processing time of your projected load that stays within the throttling limits of the Quick Sight APIs. For example, if your projected traffic is 100 snapshot jobs before 12:00 PM per day, start 12 jobs in parallel and measure the amount of time it takes to proccess all 12 jobs. Once you obtain the result, multiply the duration by 9, for example `(12 minutes * 9 = 108 minutes)`. Use the new result to determine the latest time at which the jobs need to be started to meet your target deadline.
 *
 * The time that it takes to process a job can be impacted by the following factors:
 *
 * - The dataset type (Direct Query or SPICE).
 *
 * - The size of the dataset.
 *
 * - The complexity of the calculated fields that are used in the dashboard.
 *
 * - The number of visuals that are on a sheet.
 *
 * - The types of visuals that are on the sheet.
 *
 * - The number of formats and snapshots that are requested in the job configuration.
 *
 * - The size of the generated snapshots.
 *
 * **Registered user support**
 *
 * You can generate snapshots for registered Quick Sight users by using the Snapshot Job APIs with identity-enhanced IAM role session credentials. This approach allows you to create snapshots on behalf of specific Quick Sight users while respecting their row-level security (RLS), column-level security (CLS), dynamic default parameters and dashboard parameter/filter settings.
 *
 * To generate snapshots for registered Quick Sight users, you need to:
 *
 * - Obtain identity-enhanced IAM role session credentials from Amazon Web Services Security Token Service (STS).
 *
 * - Use these credentials to call the Snapshot Job APIs.
 *
 * Identity-enhanced credentials are credentials that contain information about the end user (e.g., registered Quick Sight user).
 *
 * If your Quick Sight users are backed by Amazon Web Services Identity Center, then you need to set up a trusted token issuer. Then, getting identity-enhanced IAM credentials for a Quick Sight user will look like the following:
 *
 * - Authenticate user with your OIDC compliant Identity Provider. You should get auth tokens back.
 *
 * - Use the OIDC API, CreateTokenWithIAM, to exchange auth tokens to IAM tokens. One of the resulted tokens will be identity token.
 *
 * - Call STS AssumeRole API as you normally would, but provide an extra `ProvidedContexts` parameter in the API request. The list of contexts must have a single trusted context assertion. The `ProviderArn` should be `arn:aws:iam::aws:contextProvider/IdentityCenter` while `ContextAssertion` will be the identity token you received in response from CreateTokenWithIAM
 *
 * For more details, see IdC documentation on Identity-enhanced IAM role sessions.
 *
 * To obtain Identity-enhanced credentials for Quick Sight native users, IAM federated users, or Active Directory users, follow the steps below:
 *
 * - Call Quick Sight GetIdentityContext API to get identity token.
 *
 * - Call STS AssumeRole API as you normally would, but provide extra `ProvidedContexts` parameter in the API request. The list of contexts must have a single trusted context assertion. The `ProviderArn` should be `arn:aws:iam::aws:contextProvider/QuickSight` while `ContextAssertion` will be the identity token you received in response from GetIdentityContext
 *
 * After obtaining the identity-enhanced IAM role session credentials, you can use them to start a job, describe the job and describe job result. You can use the same credentials as long as they haven't expired. All API requests made with these credentials are considered to be made by the impersonated Quick Sight user.
 *
 * When using identity-enhanced session credentials, set the UserConfiguration request attribute to null. Otherwise, the request will be invalid.
 *
 * **Possible error scenarios**
 *
 * The request fails with an Access Denied error in the following scenarios:
 *
 * - The credentials have expired.
 *
 * - The impersonated Quick Sight user doesn't have access to the specified dashboard.
 *
 * - The impersonated Quick Sight user is restricted from exporting data in the selected formats. For more information about export restrictions, see Customizing access to Amazon Quick Sight capabilities.
 */
export const startDashboardSnapshotJob: API.OperationMethod<
  StartDashboardSnapshotJobRequest,
  StartDashboardSnapshotJobResponse,
  StartDashboardSnapshotJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/dashboards/{DashboardId}/snapshot-jobs",
    input: {
      AwsAccountId: 0,
      DashboardId: 0,
      SnapshotJobId: 0,
      UserConfiguration: {
        AnonymousUsers: D.list({
          RowLevelPermissionTags: D.list(i_SessionTag),
        }),
      },
      SnapshotConfiguration: {
        FileGroups: D.list({
          Files: D.list({
            SheetSelections: D.list({
              SheetId: 0,
              SelectionScope: 0,
              VisualIds: 0,
            }),
            FormatType: 0,
          }),
        }),
        DestinationConfiguration: {
          S3Destinations: D.list({
            BucketConfiguration: {
              BucketName: 0,
              BucketPrefix: 0,
              BucketRegion: 0,
            },
          }),
        },
        Parameters: i_Parameters,
      },
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedPricingPlanException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDashboardSnapshotJob",
})) as any;

export type StartDashboardSnapshotJobScheduleError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Starts an asynchronous job that runs an existing dashboard schedule and sends the dashboard snapshot through email.
 *
 * Only one job can run simultaneously in a given schedule. Repeated requests are skipped with a `202` HTTP status code.
 *
 * For more information, see Scheduling and sending Amazon Quick Sight reports by email and Configuring email report settings for a Amazon Quick Sight dashboard in the *Amazon Quick Sight User Guide*.
 */
export const startDashboardSnapshotJobSchedule: API.OperationMethod<
  StartDashboardSnapshotJobScheduleRequest,
  StartDashboardSnapshotJobScheduleResponse,
  StartDashboardSnapshotJobScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/dashboards/{DashboardId}/schedules/{ScheduleId}",
    input: { AwsAccountId: 0, DashboardId: 0, ScheduleId: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDashboardSnapshotJobSchedule",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified Amazon Quick Sight
 * resource.
 *
 * Tags can help you organize and categorize your resources. You can also use them to
 * scope user permissions, by granting a user permission to access or change only resources
 * with certain tag values. You can use the `TagResource` operation with a
 * resource that already has tags. If you specify a new tag key for the resource, this tag
 * is appended to the list of tags associated with the resource. If you specify a tag key
 * that is already associated with the resource, the new tag value that you specify
 * replaces the previous value for that tag.
 *
 * You can associate as many as 50 tags with a resource. Amazon Quick Sight supports
 * tagging on data set, data source, dashboard, template, topic, and user.
 *
 * Tagging for Amazon Quick Sight works in a similar way to tagging for other Amazon Web Services services, except for the following:
 *
 * - Tags are used to track costs for users in Amazon Quick Sight. You can't
 * tag other resources that Amazon Quick Sight costs are based on, such as storage
 * capacoty (SPICE), session usage, alert consumption, or reporting units.
 *
 * - Amazon Quick Sight doesn't currently support the tag editor for Resource Groups.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /resources/{ResourceArn}/tags",
    input: { ResourceArn: 0, Tags: D.list(i_Tag) },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes a tag or tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /resources/{ResourceArn}/tags",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "keys" }) },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAccountCustomizationError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates Amazon Quick Sight customizations. Currently, the only customization that you can use is a theme.
 *
 * You can use customizations for your Amazon Web Services account or, if you specify a namespace, for a
 * Quick Sight namespace instead. Customizations that apply to a namespace override
 * customizations that apply to an Amazon Web Services account. To find out which customizations apply, use
 * the `DescribeAccountCustomization` API operation.
 */
export const updateAccountCustomization: API.OperationMethod<
  UpdateAccountCustomizationRequest,
  UpdateAccountCustomizationResponse,
  UpdateAccountCustomizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/customizations",
    input: {
      AwsAccountId: 0,
      Namespace: D.m({ query: "namespace" }),
      AccountCustomization: i_AccountCustomization,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountCustomization",
})) as any;

export type UpdateAccountCustomPermissionError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Applies a custom permissions profile to an account.
 */
export const updateAccountCustomPermission: API.OperationMethod<
  UpdateAccountCustomPermissionRequest,
  UpdateAccountCustomPermissionResponse,
  UpdateAccountCustomPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/custom-permission",
    input: { CustomPermissionsName: 0, AwsAccountId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountCustomPermission",
})) as any;

export type UpdateAccountSettingsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the Amazon Quick Sight settings in your Amazon Web Services account.
 */
export const updateAccountSettings: API.OperationMethod<
  UpdateAccountSettingsRequest,
  UpdateAccountSettingsResponse,
  UpdateAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/settings",
    input: {
      AwsAccountId: 0,
      DefaultNamespace: 0,
      NotificationEmail: 0,
      TerminationProtectionEnabled: 0,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountSettings",
})) as any;

export type UpdateActionConnectorError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an existing action connector with new configuration details, authentication settings, or enabled actions.
 * You can modify the connector's name, description, authentication configuration, and which actions are enabled. For more information,
 * https://docs.aws.amazon.com/quicksuite/latest/userguide/quick-action-auth.html.
 */
export const updateActionConnector: API.OperationMethod<
  UpdateActionConnectorRequest,
  UpdateActionConnectorResponse,
  UpdateActionConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/action-connectors/{ActionConnectorId}",
    input: {
      AwsAccountId: 0,
      ActionConnectorId: 0,
      Name: 0,
      AuthenticationConfig: i_AuthConfig,
      Description: 0,
      VpcConnectionArn: 0,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateActionConnector",
})) as any;

export type UpdateActionConnectorPermissionsError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Updates the permissions for an action connector by granting or revoking access for specific users and groups. You can control who can view, use, or manage the action connector.
 */
export const updateActionConnectorPermissions: API.OperationMethod<
  UpdateActionConnectorPermissionsRequest,
  UpdateActionConnectorPermissionsResponse,
  UpdateActionConnectorPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/action-connectors/{ActionConnectorId}/permissions",
    input: {
      AwsAccountId: 0,
      ActionConnectorId: 0,
      GrantPermissions: D.list(i_ResourcePermission),
      RevokePermissions: D.list(i_ResourcePermission),
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateActionConnectorPermissions",
})) as any;

export type UpdateAgentError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an existing agent.
 */
export const updateAgent: API.OperationMethod<
  UpdateAgentRequest,
  UpdateAgentResponse,
  UpdateAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/agents/{AgentId}",
    input: {
      AgentId: 0,
      AwsAccountId: 0,
      Name: 0,
      Description: 0,
      IconId: 0,
      StarterPrompts: 0,
      WelcomeMessage: 0,
      CustomPromptInput: i_CustomPromptInput,
      SpacesToAdd: 0,
      SpacesToRemove: 0,
      ActionConnectorsToAdd: 0,
      ActionConnectorsToRemove: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAgent",
})) as any;

export type UpdateAgentPermissionsError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Updates the resource permissions for an agent.
 */
export const updateAgentPermissions: API.OperationMethod<
  UpdateAgentPermissionsRequest,
  UpdateAgentPermissionsResponse,
  UpdateAgentPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/agents/{AgentId}/permissions",
    input: {
      AgentId: 0,
      AwsAccountId: 0,
      GrantPermissions: D.list(i_ResourcePermission),
      RevokePermissions: D.list(i_ResourcePermission),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAgentPermissions",
})) as any;

export type UpdateAnalysisError =
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Updates an analysis in Amazon Quick Sight
 */
export const updateAnalysis: API.OperationMethod<
  UpdateAnalysisRequest,
  UpdateAnalysisResponse,
  UpdateAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/analyses/{AnalysisId}",
    input: {
      AwsAccountId: 0,
      AnalysisId: 0,
      Name: 0,
      Parameters: i_Parameters,
      SourceEntity: i_AnalysisSourceEntity,
      ThemeArn: 0,
      Definition: i_AnalysisDefinition,
      ValidationStrategy: i_ValidationStrategy,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAnalysis",
})) as any;

export type UpdateAnalysisPermissionsError =
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Updates the read and write permissions for an analysis.
 */
export const updateAnalysisPermissions: API.OperationMethod<
  UpdateAnalysisPermissionsRequest,
  UpdateAnalysisPermissionsResponse,
  UpdateAnalysisPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/analyses/{AnalysisId}/permissions",
    input: {
      AwsAccountId: 0,
      AnalysisId: 0,
      GrantPermissions: D.list(i_ResourcePermission),
      RevokePermissions: D.list(i_ResourcePermission),
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAnalysisPermissions",
})) as any;

export type UpdateApplicationWithTokenExchangeGrantError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an Quick application with a token exchange grant. This operation only supports Quick applications that are registered with IAM Identity Center.
 */
export const updateApplicationWithTokenExchangeGrant: API.OperationMethod<
  UpdateApplicationWithTokenExchangeGrantRequest,
  UpdateApplicationWithTokenExchangeGrantResponse,
  UpdateApplicationWithTokenExchangeGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/application-with-token-exchange-grant",
    input: { AwsAccountId: 0, Namespace: D.m({ query: "namespace" }) },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplicationWithTokenExchangeGrant",
})) as any;

export type UpdateApprovalPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an approval policy in Quick Sight.
 */
export const updateApprovalPolicy: API.OperationMethod<
  UpdateApprovalPolicyRequest,
  UpdateApprovalPolicyResponse,
  UpdateApprovalPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /governance/approvalworkflows/policies/{PolicyId}",
    input: {
      PolicyId: 0,
      Name: 0,
      Description: 0,
      Actions: 0,
      AssetTypes: 0,
      ApplicableTo: i_ApplicableTo,
      ApprovalGroups: 0,
    },
    output: { Policy: o_ApprovalPolicy },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApprovalPolicy",
})) as any;

export type UpdateBrandError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a brand.
 */
export const updateBrand: API.OperationMethod<
  UpdateBrandRequest,
  UpdateBrandResponse,
  UpdateBrandError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/brands/{BrandId}",
    input: { AwsAccountId: 0, BrandId: 0, BrandDefinition: i_BrandDefinition },
    output: { BrandDetail: o_BrandDetail },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBrand",
})) as any;

export type UpdateBrandAssignmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a brand assignment.
 */
export const updateBrandAssignment: API.OperationMethod<
  UpdateBrandAssignmentRequest,
  UpdateBrandAssignmentResponse,
  UpdateBrandAssignmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/brandassignments",
    input: { AwsAccountId: 0, BrandArn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBrandAssignment",
})) as any;

export type UpdateBrandPublishedVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the published version of a brand.
 */
export const updateBrandPublishedVersion: API.OperationMethod<
  UpdateBrandPublishedVersionRequest,
  UpdateBrandPublishedVersionResponse,
  UpdateBrandPublishedVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/brands/{BrandId}/publishedversion",
    input: { AwsAccountId: 0, BrandId: 0, VersionId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBrandPublishedVersion",
})) as any;

export type UpdateCustomPermissionsError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a custom permissions profile.
 */
export const updateCustomPermissions: API.OperationMethod<
  UpdateCustomPermissionsRequest,
  UpdateCustomPermissionsResponse,
  UpdateCustomPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/custom-permissions/{CustomPermissionsName}",
    input: {
      AwsAccountId: 0,
      CustomPermissionsName: 0,
      Capabilities: i_Capabilities,
      Governance: i_Governance,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCustomPermissions",
})) as any;

export type UpdateDashboardError =
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Updates a dashboard in an Amazon Web Services account.
 *
 * Updating a Dashboard creates a new dashboard version but does not immediately
 * publish the new version. You can update the published version of a dashboard by
 * using the
 * UpdateDashboardPublishedVersion
 * API operation.
 */
export const updateDashboard: API.OperationMethod<
  UpdateDashboardRequest,
  UpdateDashboardResponse,
  UpdateDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/dashboards/{DashboardId}",
    input: {
      AwsAccountId: 0,
      DashboardId: 0,
      Name: 0,
      SourceEntity: i_DashboardSourceEntity,
      Parameters: i_Parameters,
      VersionDescription: 0,
      DashboardPublishOptions: i_DashboardPublishOptions,
      ThemeArn: 0,
      Definition: i_DashboardVersionDefinition,
      ValidationStrategy: i_ValidationStrategy,
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDashboard",
})) as any;

export type UpdateDashboardLinksError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Updates the linked analyses on a dashboard.
 */
export const updateDashboardLinks: API.OperationMethod<
  UpdateDashboardLinksRequest,
  UpdateDashboardLinksResponse,
  UpdateDashboardLinksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/dashboards/{DashboardId}/linked-entities",
    input: { AwsAccountId: 0, DashboardId: 0, LinkEntities: 0 },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDashboardLinks",
})) as any;

export type UpdateDashboardPermissionsError =
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Updates read and write permissions on a dashboard.
 */
export const updateDashboardPermissions: API.OperationMethod<
  UpdateDashboardPermissionsRequest,
  UpdateDashboardPermissionsResponse,
  UpdateDashboardPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/dashboards/{DashboardId}/permissions",
    input: {
      AwsAccountId: 0,
      DashboardId: 0,
      GrantPermissions: D.list(i_ResourcePermission),
      RevokePermissions: D.list(i_ResourcePermission),
      GrantLinkPermissions: D.list(i_ResourcePermission),
      RevokeLinkPermissions: D.list(i_ResourcePermission),
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDashboardPermissions",
})) as any;

export type UpdateDashboardPublishedVersionError =
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Updates the published version of a dashboard.
 */
export const updateDashboardPublishedVersion: API.OperationMethod<
  UpdateDashboardPublishedVersionRequest,
  UpdateDashboardPublishedVersionResponse,
  UpdateDashboardPublishedVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/dashboards/{DashboardId}/versions/{VersionNumber}",
    input: { AwsAccountId: 0, DashboardId: 0, VersionNumber: 0 },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDashboardPublishedVersion",
})) as any;

export type UpdateDashboardsQAConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a Dashboard QA configuration.
 */
export const updateDashboardsQAConfiguration: API.OperationMethod<
  UpdateDashboardsQAConfigurationRequest,
  UpdateDashboardsQAConfigurationResponse,
  UpdateDashboardsQAConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/dashboards-qa-configuration",
    input: { AwsAccountId: 0, DashboardsQAStatus: 0 },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDashboardsQAConfiguration",
})) as any;

export type UpdateDataSetError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidDataSetParameterValueException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Updates a dataset. This operation doesn't support datasets that include uploaded files
 * as a source. Partial updates are not supported by this operation.
 */
export const updateDataSet: API.OperationMethod<
  UpdateDataSetRequest,
  UpdateDataSetResponse,
  UpdateDataSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/data-sets/{DataSetId}",
    input: {
      AwsAccountId: 0,
      DataSetId: 0,
      Name: 0,
      PhysicalTableMap: D.map(i_PhysicalTable),
      LogicalTableMap: D.map(i_LogicalTable),
      ImportMode: 0,
      ColumnGroups: D.list(i_ColumnGroup),
      FieldFolders: D.map(i_FieldFolder),
      RowLevelPermissionDataSet: i_RowLevelPermissionDataSet,
      RowLevelPermissionTagConfiguration: i_RowLevelPermissionTagConfiguration,
      ColumnLevelPermissionRules: D.list(i_ColumnLevelPermissionRule),
      DataSetUsageConfiguration: i_DataSetUsageConfiguration,
      DatasetParameters: D.list(i_DatasetParameter),
      PerformanceConfiguration: i_PerformanceConfiguration,
      DataPrepConfiguration: i_DataPrepConfiguration,
      SemanticModelConfiguration: i_SemanticModelConfiguration,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidDataSetParameterValueException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataSet",
})) as any;

export type UpdateDataSetPermissionsError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the permissions on a dataset.
 *
 * The permissions resource is
 * `arn:aws:quicksight:region:aws-account-id:dataset/data-set-id`.
 */
export const updateDataSetPermissions: API.OperationMethod<
  UpdateDataSetPermissionsRequest,
  UpdateDataSetPermissionsResponse,
  UpdateDataSetPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/data-sets/{DataSetId}/permissions",
    input: {
      AwsAccountId: 0,
      DataSetId: 0,
      GrantPermissions: D.list(i_ResourcePermission),
      RevokePermissions: D.list(i_ResourcePermission),
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataSetPermissions",
})) as any;

export type UpdateDataSourceError =
  | AccessDeniedException
  | ConflictException
  | CustomerManagedKeyUnavailableException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a data source.
 */
export const updateDataSource: API.OperationMethod<
  UpdateDataSourceRequest,
  UpdateDataSourceResponse,
  UpdateDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/data-sources/{DataSourceId}",
    input: {
      AwsAccountId: 0,
      DataSourceId: 0,
      Name: 0,
      DataSourceParameters: i_DataSourceParameters,
      Credentials: i_DataSourceCredentials,
      VpcConnectionProperties: i_VpcConnectionProperties,
      SslProperties: i_SslProperties,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    CustomerManagedKeyUnavailableException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataSource",
})) as any;

export type UpdateDataSourcePermissionsError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the permissions to a data source.
 */
export const updateDataSourcePermissions: API.OperationMethod<
  UpdateDataSourcePermissionsRequest,
  UpdateDataSourcePermissionsResponse,
  UpdateDataSourcePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/data-sources/{DataSourceId}/permissions",
    input: {
      AwsAccountId: 0,
      DataSourceId: 0,
      GrantPermissions: D.list(i_ResourcePermission),
      RevokePermissions: D.list(i_ResourcePermission),
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataSourcePermissions",
})) as any;

export type UpdateDefaultQBusinessApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a Amazon Q Business application that is linked to a Quick Sight account.
 */
export const updateDefaultQBusinessApplication: API.OperationMethod<
  UpdateDefaultQBusinessApplicationRequest,
  UpdateDefaultQBusinessApplicationResponse,
  UpdateDefaultQBusinessApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/default-qbusiness-application",
    input: {
      AwsAccountId: 0,
      Namespace: D.m({ query: "namespace" }),
      ApplicationId: 0,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDefaultQBusinessApplication",
})) as any;

export type UpdateDlpSettingError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an existing DLP setting configuration in an Amazon Web Services account. Fields that are omitted from the request retain their current values.
 */
export const updateDlpSetting: API.OperationMethod<
  UpdateDlpSettingRequest,
  UpdateDlpSettingResponse,
  UpdateDlpSettingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/data-loss-prevention/settings/{DlpSettingId}",
    input: {
      AwsAccountId: 0,
      DlpSettingId: 0,
      Name: 0,
      ProviderType: 0,
      ProviderConfig: i_ProviderConfig,
      ProviderOutageAction: 0,
      Enabled: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDlpSetting",
})) as any;

export type UpdateFlowError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an existing flow. Supply only the fields you want to change. Updates both DRAFT and PUBLISHED versions. When `FlowDefinition` is provided, all existing steps are replaced with the new definition.
 */
export const updateFlow: API.OperationMethod<
  UpdateFlowRequest,
  UpdateFlowResponse,
  UpdateFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/flows/{FlowId}",
    input: {
      AwsAccountId: 0,
      FlowId: 0,
      Name: 0,
      Description: 0,
      FlowDefinition: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFlow",
})) as any;

export type UpdateFlowPermissionsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates permissions against principals on a flow.
 */
export const updateFlowPermissions: API.OperationMethod<
  UpdateFlowPermissionsInput,
  UpdateFlowPermissionsOutput,
  UpdateFlowPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/flows/{FlowId}/permissions",
    input: {
      AwsAccountId: 0,
      FlowId: 0,
      GrantPermissions: D.list(i_Permission),
      RevokePermissions: D.list(i_Permission),
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFlowPermissions",
})) as any;

export type UpdateFolderError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Updates the name of a folder.
 */
export const updateFolder: API.OperationMethod<
  UpdateFolderRequest,
  UpdateFolderResponse,
  UpdateFolderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/folders/{FolderId}",
    input: { AwsAccountId: 0, FolderId: 0, Name: 0 },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFolder",
})) as any;

export type UpdateFolderPermissionsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Updates permissions of a folder.
 */
export const updateFolderPermissions: API.OperationMethod<
  UpdateFolderPermissionsRequest,
  UpdateFolderPermissionsResponse,
  UpdateFolderPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/folders/{FolderId}/permissions",
    input: {
      AwsAccountId: 0,
      FolderId: 0,
      GrantPermissions: D.list(i_ResourcePermission),
      RevokePermissions: D.list(i_ResourcePermission),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFolderPermissions",
})) as any;

export type UpdateGroupError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Changes a group description.
 */
export const updateGroup: API.OperationMethod<
  UpdateGroupRequest,
  UpdateGroupResponse,
  UpdateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/namespaces/{Namespace}/groups/{GroupName}",
    input: { GroupName: 0, Description: 0, AwsAccountId: 0, Namespace: 0 },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGroup",
})) as any;

export type UpdateIAMPolicyAssignmentError =
  | AccessDeniedException
  | ConcurrentUpdatingException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an existing IAM policy assignment. This operation updates only
 * the optional parameter or parameters that are specified in the request. This overwrites
 * all of the users included in `Identities`.
 */
export const updateIAMPolicyAssignment: API.OperationMethod<
  UpdateIAMPolicyAssignmentRequest,
  UpdateIAMPolicyAssignmentResponse,
  UpdateIAMPolicyAssignmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/namespaces/{Namespace}/iam-policy-assignments/{AssignmentName}",
    input: {
      AwsAccountId: 0,
      AssignmentName: 0,
      Namespace: 0,
      AssignmentStatus: 0,
      PolicyArn: 0,
      Identities: 0,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConcurrentUpdatingException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIAMPolicyAssignment",
})) as any;

export type UpdateIdentityPropagationConfigError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds or updates services and authorized targets to configure what the Quick Sight IAM Identity Center application can access.
 *
 * This operation is only supported for Quick Sight accounts using IAM Identity Center
 */
export const updateIdentityPropagationConfig: API.OperationMethod<
  UpdateIdentityPropagationConfigRequest,
  UpdateIdentityPropagationConfigResponse,
  UpdateIdentityPropagationConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/identity-propagation-config/{Service}",
    input: { AwsAccountId: 0, Service: 0, AuthorizedTargets: 0 },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIdentityPropagationConfig",
})) as any;

export type UpdateIpRestrictionError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the content and status of IP rules. Traffic from a source is allowed when the source satisfies either the `IpRestrictionRule`, `VpcIdRestrictionRule`, or `VpcEndpointIdRestrictionRule`. To use this operation, you must provide the entire map of rules. You can use the `DescribeIpRestriction` operation to get the current rule map.
 */
export const updateIpRestriction: API.OperationMethod<
  UpdateIpRestrictionRequest,
  UpdateIpRestrictionResponse,
  UpdateIpRestrictionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/ip-restriction",
    input: {
      AwsAccountId: 0,
      IpRestrictionRuleMap: 0,
      VpcIdRestrictionRuleMap: 0,
      VpcEndpointIdRestrictionRuleMap: 0,
      Enabled: 0,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIpRestriction",
})) as any;

export type UpdateKeyRegistrationError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a customer managed key in a Quick Sight account.
 */
export const updateKeyRegistration: API.OperationMethod<
  UpdateKeyRegistrationRequest,
  UpdateKeyRegistrationResponse,
  UpdateKeyRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/key-registration",
    input: {
      AwsAccountId: 0,
      KeyRegistration: D.list({ KeyArn: 0, DefaultKey: 0 }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateKeyRegistration",
})) as any;

export type UpdateKnowledgeBaseError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | InvalidRequestException
  | LimitExceededException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the properties of an existing knowledge base.
 */
export const updateKnowledgeBase: API.OperationMethod<
  UpdateKnowledgeBaseRequest,
  UpdateKnowledgeBaseResponse,
  UpdateKnowledgeBaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/accounts/{AwsAccountId}/knowledge-bases/{KnowledgeBaseId}",
    input: {
      AwsAccountId: 0,
      KnowledgeBaseId: 0,
      Name: 0,
      Description: 0,
      KnowledgeBaseConfiguration: i_KnowledgeBaseConfiguration,
      MediaExtractionConfiguration: i_MediaExtractionConfiguration,
      IsEmailNotificationOptedForIngestionFailures: 0,
      AccessControlConfiguration: i_AccessControlConfiguration,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    InvalidRequestException,
    LimitExceededException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateKnowledgeBase",
})) as any;

export type UpdateKnowledgeBasePermissionsError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | InvalidRequestException
  | LimitExceededException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the resource permissions for a knowledge base.
 */
export const updateKnowledgeBasePermissions: API.OperationMethod<
  UpdateKnowledgeBasePermissionsRequest,
  UpdateKnowledgeBasePermissionsResponse,
  UpdateKnowledgeBasePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/accounts/{AwsAccountId}/knowledge-bases/{KnowledgeBaseId}/permissions",
    input: {
      AwsAccountId: 0,
      KnowledgeBaseId: 0,
      GrantPermissions: D.list(i_ResourcePermission),
      RevokePermissions: D.list(i_ResourcePermission),
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    InvalidRequestException,
    LimitExceededException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateKnowledgeBasePermissions",
})) as any;

export type UpdateLimitsProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the properties of an existing limits profile.
 */
export const updateLimitsProfile: API.OperationMethod<
  UpdateLimitsProfileRequest,
  UpdateLimitsProfileResponse,
  UpdateLimitsProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /governance/limits/accounts/{accountId}/profiles/{profileId}",
    input: {
      profileId: 0,
      accountId: 0,
      profileName: 0,
      description: 0,
      resourceLimits: D.map(i_ProfileLimitValue),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLimitsProfile",
})) as any;

export type UpdateOAuthClientApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an OAuthClientApplication.
 */
export const updateOAuthClientApplication: API.OperationMethod<
  UpdateOAuthClientApplicationRequest,
  UpdateOAuthClientApplicationResponse,
  UpdateOAuthClientApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/oauth-client-applications/{OAuthClientApplicationId}",
    input: {
      AwsAccountId: 0,
      OAuthClientApplicationId: 0,
      Name: 0,
      ClientId: 0,
      ClientSecret: 0,
      OAuthTokenEndpointUrl: 0,
      OAuthAuthorizationEndpointUrl: 0,
      OAuthScopes: 0,
      DataSourceType: 0,
      IdentityProviderVpcConnectionProperties: i_VpcConnectionProperties,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOAuthClientApplication",
})) as any;

export type UpdatePublicSharingSettingsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedPricingPlanException
  | CommonErrors;
/**
 * This API controls public sharing settings for your entire Quick Sight account, affecting
 * data security and access. When you enable public sharing:
 *
 * - Dashboards can be shared publicly
 *
 * - This setting affects your entire Amazon Web Services account and all Quick Sight
 * users
 *
 * **Before proceeding:** Ensure you understand the
 * security implications and have proper IAM permissions
 * configured.
 *
 * Use the `UpdatePublicSharingSettings` operation to turn on or turn off the
 * public sharing settings of an Amazon Quick Sight dashboard.
 *
 * To use this operation, turn on session capacity pricing for your Amazon Quick Sight
 * account.
 *
 * Before you can turn on public sharing on your account, make sure to give public
 * sharing permissions to an administrative user in the Identity and Access Management (IAM) console. For more information on using IAM with Amazon
 * Quick Sight, see Using Quick with IAM in the Amazon Quick Sight
 * User Guide.
 */
export const updatePublicSharingSettings: API.OperationMethod<
  UpdatePublicSharingSettingsRequest,
  UpdatePublicSharingSettingsResponse,
  UpdatePublicSharingSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/public-sharing-settings",
    input: { AwsAccountId: 0, PublicSharingEnabled: 0 },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedPricingPlanException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePublicSharingSettings",
})) as any;

export type UpdateQPersonalizationConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a personalization configuration.
 */
export const updateQPersonalizationConfiguration: API.OperationMethod<
  UpdateQPersonalizationConfigurationRequest,
  UpdateQPersonalizationConfigurationResponse,
  UpdateQPersonalizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/q-personalization-configuration",
    input: { AwsAccountId: 0, PersonalizationMode: 0 },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQPersonalizationConfiguration",
})) as any;

export type UpdateQuickSightQSearchConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the state of a Quick Sight Q Search configuration.
 */
export const updateQuickSightQSearchConfiguration: API.OperationMethod<
  UpdateQuickSightQSearchConfigurationRequest,
  UpdateQuickSightQSearchConfigurationResponse,
  UpdateQuickSightQSearchConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/quicksight-q-search-configuration",
    input: { AwsAccountId: 0, QSearchStatus: 0 },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQuickSightQSearchConfiguration",
})) as any;

export type UpdateRefreshScheduleError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a refresh schedule for a dataset.
 */
export const updateRefreshSchedule: API.OperationMethod<
  UpdateRefreshScheduleRequest,
  UpdateRefreshScheduleResponse,
  UpdateRefreshScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/data-sets/{DataSetId}/refresh-schedules",
    input: { DataSetId: 0, AwsAccountId: 0, Schedule: i_RefreshSchedule },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRefreshSchedule",
})) as any;

export type UpdateRoleCustomPermissionError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the custom permissions that are associated with a role.
 */
export const updateRoleCustomPermission: API.OperationMethod<
  UpdateRoleCustomPermissionRequest,
  UpdateRoleCustomPermissionResponse,
  UpdateRoleCustomPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/namespaces/{Namespace}/roles/{Role}/custom-permission",
    input: { CustomPermissionsName: 0, Role: 0, AwsAccountId: 0, Namespace: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRoleCustomPermission",
})) as any;

export type UpdateSelfUpgradeError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | LimitExceededException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a self-upgrade request for a Quick user by approving, denying, or verifying the request.
 */
export const updateSelfUpgrade: API.OperationMethod<
  UpdateSelfUpgradeRequest,
  UpdateSelfUpgradeResponse,
  UpdateSelfUpgradeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/namespaces/{Namespace}/update-self-upgrade-request",
    input: { AwsAccountId: 0, Namespace: 0, UpgradeRequestId: 0, Action: 0 },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    LimitExceededException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSelfUpgrade",
})) as any;

export type UpdateSelfUpgradeConfigurationError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the self-upgrade configuration for a Quick account.
 */
export const updateSelfUpgradeConfiguration: API.OperationMethod<
  UpdateSelfUpgradeConfigurationRequest,
  UpdateSelfUpgradeConfigurationResponse,
  UpdateSelfUpgradeConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/namespaces/{Namespace}/self-upgrade-configuration",
    input: { AwsAccountId: 0, Namespace: 0, SelfUpgradeStatus: 0 },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSelfUpgradeConfiguration",
})) as any;

export type UpdateSpaceError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the metadata of an Amazon QuickSight space.
 */
export const updateSpace: API.OperationMethod<
  UpdateSpaceRequest,
  UpdateSpaceResponse,
  UpdateSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/accounts/{AwsAccountId}/spaces/{SpaceId}",
    input: { AwsAccountId: 0, SpaceId: 0, Name: 0, Description: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSpace",
})) as any;

export type UpdateSpacePermissionsError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Updates the permissions for an Amazon QuickSight space.
 */
export const updateSpacePermissions: API.OperationMethod<
  UpdateSpacePermissionsRequest,
  UpdateSpacePermissionsResponse,
  UpdateSpacePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/accounts/{AwsAccountId}/spaces/{SpaceId}/permissions",
    input: {
      AwsAccountId: 0,
      SpaceId: 0,
      GrantPermissions: D.list(i_ResourcePermission),
      RevokePermissions: D.list(i_ResourcePermission),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSpacePermissions",
})) as any;

export type UpdateSpaceResourcesError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds or removes resources from an Amazon QuickSight space.
 */
export const updateSpaceResources: API.OperationMethod<
  UpdateSpaceResourcesRequest,
  UpdateSpaceResourcesResponse,
  UpdateSpaceResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/accounts/{AwsAccountId}/spaces/{SpaceId}/resources",
    input: {
      AwsAccountId: 0,
      SpaceId: 0,
      AddResources: D.list(i_SpaceResourceOperation),
      RemoveResources: D.list(i_SpaceResourceOperation),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSpaceResources",
})) as any;

export type UpdateSPICECapacityConfigurationError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the SPICE capacity configuration for a Quick Sight account.
 */
export const updateSPICECapacityConfiguration: API.OperationMethod<
  UpdateSPICECapacityConfigurationRequest,
  UpdateSPICECapacityConfigurationResponse,
  UpdateSPICECapacityConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/{AwsAccountId}/spice-capacity-configuration",
    input: { AwsAccountId: 0, PurchaseMode: 0 },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSPICECapacityConfiguration",
})) as any;

export type UpdateTemplateError =
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Updates a template from an existing Amazon Quick Sight analysis or another template.
 */
export const updateTemplate: API.OperationMethod<
  UpdateTemplateRequest,
  UpdateTemplateResponse,
  UpdateTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/templates/{TemplateId}",
    input: {
      AwsAccountId: 0,
      TemplateId: 0,
      SourceEntity: i_TemplateSourceEntity,
      VersionDescription: 0,
      Name: 0,
      Definition: i_TemplateVersionDefinition,
      ValidationStrategy: i_ValidationStrategy,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTemplate",
})) as any;

export type UpdateTemplateAliasError =
  | ConflictException
  | InternalFailureException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Updates the template alias of a template.
 */
export const updateTemplateAlias: API.OperationMethod<
  UpdateTemplateAliasRequest,
  UpdateTemplateAliasResponse,
  UpdateTemplateAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/templates/{TemplateId}/aliases/{AliasName}",
    input: {
      AwsAccountId: 0,
      TemplateId: 0,
      AliasName: 0,
      TemplateVersionNumber: 0,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    ConflictException,
    InternalFailureException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTemplateAlias",
})) as any;

export type UpdateTemplatePermissionsError =
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Updates the resource permissions for a template.
 */
export const updateTemplatePermissions: API.OperationMethod<
  UpdateTemplatePermissionsRequest,
  UpdateTemplatePermissionsResponse,
  UpdateTemplatePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/templates/{TemplateId}/permissions",
    input: {
      AwsAccountId: 0,
      TemplateId: 0,
      GrantPermissions: D.list(i_ResourcePermission),
      RevokePermissions: D.list(i_ResourcePermission),
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTemplatePermissions",
})) as any;

export type UpdateThemeError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Updates a theme.
 */
export const updateTheme: API.OperationMethod<
  UpdateThemeRequest,
  UpdateThemeResponse,
  UpdateThemeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/themes/{ThemeId}",
    input: {
      AwsAccountId: 0,
      ThemeId: 0,
      Name: 0,
      BaseThemeId: 0,
      VersionDescription: 0,
      Configuration: i_ThemeConfiguration,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTheme",
})) as any;

export type UpdateThemeAliasError =
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Updates an alias of a theme.
 */
export const updateThemeAlias: API.OperationMethod<
  UpdateThemeAliasRequest,
  UpdateThemeAliasResponse,
  UpdateThemeAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/themes/{ThemeId}/aliases/{AliasName}",
    input: { AwsAccountId: 0, ThemeId: 0, AliasName: 0, ThemeVersionNumber: 0 },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThemeAlias",
})) as any;

export type UpdateThemePermissionsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Updates the resource permissions for a theme. Permissions apply to the action to grant or
 * revoke permissions on, for example `"quicksight:DescribeTheme"`.
 *
 * Theme permissions apply in groupings. Valid groupings include the following for the three
 * levels of permissions, which are user, owner, or no permissions:
 *
 * - User
 *
 * - `"quicksight:DescribeTheme"`
 *
 * - `"quicksight:DescribeThemeAlias"`
 *
 * - `"quicksight:ListThemeAliases"`
 *
 * - `"quicksight:ListThemeVersions"`
 *
 * - Owner
 *
 * - `"quicksight:DescribeTheme"`
 *
 * - `"quicksight:DescribeThemeAlias"`
 *
 * - `"quicksight:ListThemeAliases"`
 *
 * - `"quicksight:ListThemeVersions"`
 *
 * - `"quicksight:DeleteTheme"`
 *
 * - `"quicksight:UpdateTheme"`
 *
 * - `"quicksight:CreateThemeAlias"`
 *
 * - `"quicksight:DeleteThemeAlias"`
 *
 * - `"quicksight:UpdateThemeAlias"`
 *
 * - `"quicksight:UpdateThemePermissions"`
 *
 * - `"quicksight:DescribeThemePermissions"`
 *
 * - To specify no permissions, omit the permissions list.
 */
export const updateThemePermissions: API.OperationMethod<
  UpdateThemePermissionsRequest,
  UpdateThemePermissionsResponse,
  UpdateThemePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/themes/{ThemeId}/permissions",
    input: {
      AwsAccountId: 0,
      ThemeId: 0,
      GrantPermissions: D.list(i_ResourcePermission),
      RevokePermissions: D.list(i_ResourcePermission),
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThemePermissions",
})) as any;

export type UpdateTopicError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a topic.
 */
export const updateTopic: API.OperationMethod<
  UpdateTopicRequest,
  UpdateTopicResponse,
  UpdateTopicError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/topics/{TopicId}",
    input: {
      AwsAccountId: 0,
      TopicId: 0,
      Topic: i_TopicDetails,
      CustomInstructions: i_CustomInstructions,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTopic",
})) as any;

export type UpdateTopicPermissionsError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Updates the permissions of a topic.
 */
export const updateTopicPermissions: API.OperationMethod<
  UpdateTopicPermissionsRequest,
  UpdateTopicPermissionsResponse,
  UpdateTopicPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/topics/{TopicId}/permissions",
    input: {
      AwsAccountId: 0,
      TopicId: 0,
      GrantPermissions: D.list(i_ResourcePermission),
      RevokePermissions: D.list(i_ResourcePermission),
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTopicPermissions",
})) as any;

export type UpdateTopicPermissionsV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Updates the permissions of a topic.
 */
export const updateTopicPermissionsV2: API.OperationMethod<
  UpdateTopicPermissionsV2Request,
  UpdateTopicPermissionsV2Response,
  UpdateTopicPermissionsV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/topicsV2/{TopicId}/permissions",
    input: {
      AwsAccountId: 0,
      TopicId: 0,
      GrantPermissions: D.list(i_ResourcePermission),
      RevokePermissions: D.list(i_ResourcePermission),
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTopicPermissionsV2",
})) as any;

export type UpdateTopicRefreshScheduleError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a topic refresh schedule.
 */
export const updateTopicRefreshSchedule: API.OperationMethod<
  UpdateTopicRefreshScheduleRequest,
  UpdateTopicRefreshScheduleResponse,
  UpdateTopicRefreshScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/topics/{TopicId}/schedules/{DatasetId}",
    input: {
      AwsAccountId: 0,
      TopicId: 0,
      DatasetId: 0,
      RefreshSchedule: i_TopicRefreshSchedule,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTopicRefreshSchedule",
})) as any;

export type UpdateTopicV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the definition of a Q topic.
 */
export const updateTopicV2: API.OperationMethod<
  UpdateTopicV2Request,
  UpdateTopicV2Response,
  UpdateTopicV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/topicsV2/{TopicId}",
    input: {
      AwsAccountId: 0,
      TopicId: 0,
      Topic: i_TopicV2Details,
      CustomInstructions: i_CustomInstructions,
      PublishOption: 0,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTopicV2",
})) as any;

export type UpdateUserError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an Amazon Quick Sight user.
 */
export const updateUser: API.OperationMethod<
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/namespaces/{Namespace}/users/{UserName}",
    input: {
      UserName: 0,
      AwsAccountId: 0,
      Namespace: 0,
      Email: 0,
      Role: 0,
      CustomPermissionsName: 0,
      UnapplyCustomPermissions: 0,
      ExternalLoginFederationProviderType: 0,
      CustomFederationProviderUrl: 0,
      ExternalLoginId: 0,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUser",
})) as any;

export type UpdateUserCustomPermissionError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a custom permissions profile for a user.
 */
export const updateUserCustomPermission: API.OperationMethod<
  UpdateUserCustomPermissionRequest,
  UpdateUserCustomPermissionResponse,
  UpdateUserCustomPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/namespaces/{Namespace}/users/{UserName}/custom-permission",
    input: {
      UserName: 0,
      AwsAccountId: 0,
      Namespace: 0,
      CustomPermissionsName: 0,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserCustomPermission",
})) as any;

export type UpdateVPCConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalFailureException
  | InvalidParameterValueException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedUserEditionException
  | CommonErrors;
/**
 * Updates a VPC connection.
 */
export const updateVPCConnection: API.OperationMethod<
  UpdateVPCConnectionRequest,
  UpdateVPCConnectionResponse,
  UpdateVPCConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /accounts/{AwsAccountId}/vpc-connections/{VPCConnectionId}",
    input: {
      AwsAccountId: 0,
      VPCConnectionId: 0,
      Name: 0,
      SubnetIds: 0,
      SecurityGroupIds: 0,
      DnsResolvers: 0,
      RoleArn: 0,
    },
    output: { Status: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalFailureException,
    InvalidParameterValueException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedUserEditionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVPCConnection",
})) as any;

const i_AccessControlConfiguration: D.LazyStruct = () => ({ isACLEnabled: 0 });
const i_AccountCustomization: D.LazyStruct = () => ({
  DefaultTheme: 0,
  DefaultEmailCustomizationTemplate: 0,
});
const i_AnalysisDefinition: D.LazyStruct = () => ({
  DataSetIdentifierDeclarations: D.list(i_DataSetIdentifierDeclaration),
  TopicIdentifierDeclarations: D.list(i_TopicIdentifierDeclaration),
  Sheets: D.list(i_SheetDefinition),
  TooltipSheets: D.list(i_TooltipSheetDefinition),
  CalculatedFields: D.list(i_CalculatedField),
  ParameterDeclarations: D.list(i_ParameterDeclaration),
  FilterGroups: D.list(i_FilterGroup),
  ColumnConfigurations: D.list(i_ColumnConfiguration),
  AnalysisDefaults: i_AnalysisDefaults,
  Options: i_AssetOptions,
  QueryExecutionOptions: i_QueryExecutionOptions,
  StaticFiles: D.list(i_StaticFile),
});
const i_AnalysisSourceEntity: D.LazyStruct = () => ({
  SourceTemplate: {
    DataSetReferences: D.list(i_DataSetReference),
    TopicReferences: D.list(i_TopicReference),
    Arn: 0,
  },
});
const i_ApplicableTo: D.LazyStruct = () => ({ Type: 0, GroupArns: 0 });
const i_AssetBundleResourcePermissions: D.LazyStruct = () => ({
  Principals: 0,
  Actions: 0,
});
const i_AuthConfig: D.LazyStruct = () => ({
  AuthenticationType: 0,
  AuthenticationMetadata: {
    AuthorizationCodeGrantMetadata: {
      BaseEndpoint: 0,
      RedirectUrl: 0,
      AuthorizationCodeGrantCredentialsSource: 0,
      AuthorizationCodeGrantCredentialsDetails: {
        AuthorizationCodeGrantDetails: {
          ClientId: 0,
          ClientSecret: 0,
          TokenEndpoint: 0,
          AuthorizationEndpoint: 0,
        },
      },
    },
    ClientCredentialsGrantMetadata: {
      BaseEndpoint: 0,
      ClientCredentialsSource: 0,
      ClientCredentialsDetails: {
        ClientCredentialsGrantDetails: {
          ClientId: 0,
          ClientSecret: 0,
          TokenEndpoint: 0,
        },
      },
    },
    BasicAuthConnectionMetadata: { BaseEndpoint: 0, Username: 0, Password: 0 },
    ApiKeyConnectionMetadata: { BaseEndpoint: 0, ApiKey: 0, Email: 0 },
    NoneConnectionMetadata: { BaseEndpoint: 0 },
    IamConnectionMetadata: { RoleArn: 0 },
  },
});
const i_BrandDefinition: D.LazyStruct = () => ({
  BrandName: 0,
  Description: 0,
  ApplicationTheme: {
    BrandColorPalette: {
      Primary: i_Palette,
      Secondary: i_Palette,
      Accent: i_Palette,
      Measure: i_Palette,
      Dimension: i_Palette,
      Success: i_Palette,
      Info: i_Palette,
      Warning: i_Palette,
      Danger: i_Palette,
    },
    ContextualAccentPalette: {
      Connection: i_Palette,
      Visualization: i_Palette,
      Insight: i_Palette,
      Automation: i_Palette,
    },
    BrandElementStyle: {
      NavbarStyle: { GlobalNavbar: i_Palette, ContextualNavbar: i_Palette },
    },
  },
  LogoConfiguration: {
    AltText: 0,
    LogoSet: {
      Primary: i_ImageSetConfiguration,
      Favicon: i_ImageSetConfiguration,
    },
  },
});
const i_Capabilities: D.LazyStruct = () => ({
  ExportToCsv: 0,
  ExportToExcel: 0,
  ExportToPdf: 0,
  PrintReports: 0,
  CreateAndUpdateThemes: 0,
  AddOrRunAnomalyDetectionForAnalyses: 0,
  ShareAnalyses: 0,
  CreateAndUpdateDatasets: 0,
  ShareDatasets: 0,
  SubscribeDashboardEmailReports: 0,
  CreateAndUpdateDashboardEmailReports: 0,
  ShareDashboards: 0,
  CreateAndUpdateThresholdAlerts: 0,
  RenameSharedFolders: 0,
  CreateSharedFolders: 0,
  CreateAndUpdateDataSources: 0,
  ShareDataSources: 0,
  ViewAccountSPICECapacity: 0,
  CreateSPICEDataset: 0,
  ExportToPdfInScheduledReports: 0,
  ExportToCsvInScheduledReports: 0,
  ExportToExcelInScheduledReports: 0,
  IncludeContentInScheduledReportsEmail: 0,
  Dashboard: 0,
  Analysis: 0,
  Automate: 0,
  Flow: 0,
  Apps: 0,
  CreateAndUpdateApps: 0,
  ShareApps: 0,
  InvokeAppsAIInference: 0,
  AccessAppsNativeDataStore: 0,
  PublishWithoutApproval: 0,
  UseBedrockModels: 0,
  PerformFlowUiTask: 0,
  ApproveFlowShareRequests: 0,
  UseAgentWebSearch: 0,
  KnowledgeBase: 0,
  CreateAndUpdateKnowledgeBases: 0,
  ShareKnowledgeBases: 0,
  SharePointKnowledgeBase: 0,
  CreateAndUpdateSharePointKnowledgeBase: 0,
  ShareSharePointKnowledgeBase: 0,
  UseSharePointKnowledgeBase: 0,
  GoogleDriveKnowledgeBase: 0,
  CreateAndUpdateGoogleDriveKnowledgeBase: 0,
  ShareGoogleDriveKnowledgeBase: 0,
  UseGoogleDriveKnowledgeBase: 0,
  WebCrawlerKnowledgeBase: 0,
  CreateAndUpdateWebCrawlerKnowledgeBase: 0,
  ShareWebCrawlerKnowledgeBase: 0,
  UseWebCrawlerKnowledgeBase: 0,
  S3KnowledgeBase: 0,
  CreateAndUpdateS3KnowledgeBase: 0,
  ShareS3KnowledgeBase: 0,
  UseS3KnowledgeBase: 0,
  ConfluenceKnowledgeBase: 0,
  CreateAndUpdateConfluenceKnowledgeBase: 0,
  ShareConfluenceKnowledgeBase: 0,
  UseConfluenceKnowledgeBase: 0,
  OneDriveKnowledgeBase: 0,
  CreateAndUpdateOneDriveKnowledgeBase: 0,
  ShareOneDriveKnowledgeBase: 0,
  UseOneDriveKnowledgeBase: 0,
  QBusinessKnowledgeBase: 0,
  CreateAndUpdateQBusinessKnowledgeBase: 0,
  ShareQBusinessKnowledgeBase: 0,
  UseQBusinessKnowledgeBase: 0,
  BedrockManagedKnowledgeBase: 0,
  CreateAndUpdateBedrockManagedKnowledgeBase: 0,
  ShareBedrockManagedKnowledgeBase: 0,
  UseBedrockManagedKnowledgeBase: 0,
  BoxKnowledgeBase: 0,
  CreateAndUpdateBoxKnowledgeBase: 0,
  ShareBoxKnowledgeBase: 0,
  UseBoxKnowledgeBase: 0,
  IDCKnowledgeBase: 0,
  CreateAndUpdateIDCKnowledgeBase: 0,
  ShareIDCKnowledgeBase: 0,
  UseIDCKnowledgeBase: 0,
  Action: 0,
  GenericHTTPAction: 0,
  CreateAndUpdateGenericHTTPAction: 0,
  ShareGenericHTTPAction: 0,
  UseGenericHTTPAction: 0,
  AsanaAction: 0,
  CreateAndUpdateAsanaAction: 0,
  ShareAsanaAction: 0,
  UseAsanaAction: 0,
  SlackAction: 0,
  CreateAndUpdateSlackAction: 0,
  ShareSlackAction: 0,
  UseSlackAction: 0,
  ServiceNowAction: 0,
  CreateAndUpdateServiceNowAction: 0,
  ShareServiceNowAction: 0,
  UseServiceNowAction: 0,
  SalesforceAction: 0,
  CreateAndUpdateSalesforceAction: 0,
  ShareSalesforceAction: 0,
  UseSalesforceAction: 0,
  MSExchangeAction: 0,
  CreateAndUpdateMSExchangeAction: 0,
  ShareMSExchangeAction: 0,
  UseMSExchangeAction: 0,
  PagerDutyAction: 0,
  CreateAndUpdatePagerDutyAction: 0,
  SharePagerDutyAction: 0,
  UsePagerDutyAction: 0,
  JiraAction: 0,
  CreateAndUpdateJiraAction: 0,
  ShareJiraAction: 0,
  UseJiraAction: 0,
  ConfluenceAction: 0,
  CreateAndUpdateConfluenceAction: 0,
  ShareConfluenceAction: 0,
  UseConfluenceAction: 0,
  OneDriveAction: 0,
  CreateAndUpdateOneDriveAction: 0,
  ShareOneDriveAction: 0,
  UseOneDriveAction: 0,
  SharePointAction: 0,
  CreateAndUpdateSharePointAction: 0,
  ShareSharePointAction: 0,
  UseSharePointAction: 0,
  MSTeamsAction: 0,
  CreateAndUpdateMSTeamsAction: 0,
  ShareMSTeamsAction: 0,
  UseMSTeamsAction: 0,
  GoogleCalendarAction: 0,
  CreateAndUpdateGoogleCalendarAction: 0,
  ShareGoogleCalendarAction: 0,
  UseGoogleCalendarAction: 0,
  ZendeskAction: 0,
  CreateAndUpdateZendeskAction: 0,
  ShareZendeskAction: 0,
  UseZendeskAction: 0,
  SmartsheetAction: 0,
  CreateAndUpdateSmartsheetAction: 0,
  ShareSmartsheetAction: 0,
  UseSmartsheetAction: 0,
  SAPBusinessPartnerAction: 0,
  CreateAndUpdateSAPBusinessPartnerAction: 0,
  ShareSAPBusinessPartnerAction: 0,
  UseSAPBusinessPartnerAction: 0,
  SAPProductMasterDataAction: 0,
  CreateAndUpdateSAPProductMasterDataAction: 0,
  ShareSAPProductMasterDataAction: 0,
  UseSAPProductMasterDataAction: 0,
  SAPPhysicalInventoryAction: 0,
  CreateAndUpdateSAPPhysicalInventoryAction: 0,
  ShareSAPPhysicalInventoryAction: 0,
  UseSAPPhysicalInventoryAction: 0,
  SAPBillOfMaterialAction: 0,
  CreateAndUpdateSAPBillOfMaterialAction: 0,
  ShareSAPBillOfMaterialAction: 0,
  UseSAPBillOfMaterialAction: 0,
  SAPMaterialStockAction: 0,
  CreateAndUpdateSAPMaterialStockAction: 0,
  ShareSAPMaterialStockAction: 0,
  UseSAPMaterialStockAction: 0,
  FactSetAction: 0,
  CreateAndUpdateFactSetAction: 0,
  ShareFactSetAction: 0,
  UseFactSetAction: 0,
  AmazonSThreeAction: 0,
  CreateAndUpdateAmazonSThreeAction: 0,
  ShareAmazonSThreeAction: 0,
  UseAmazonSThreeAction: 0,
  TextractAction: 0,
  CreateAndUpdateTextractAction: 0,
  ShareTextractAction: 0,
  UseTextractAction: 0,
  ComprehendAction: 0,
  CreateAndUpdateComprehendAction: 0,
  ShareComprehendAction: 0,
  UseComprehendAction: 0,
  ComprehendMedicalAction: 0,
  CreateAndUpdateComprehendMedicalAction: 0,
  ShareComprehendMedicalAction: 0,
  UseComprehendMedicalAction: 0,
  AmazonBedrockARSAction: 0,
  CreateAndUpdateAmazonBedrockARSAction: 0,
  ShareAmazonBedrockARSAction: 0,
  UseAmazonBedrockARSAction: 0,
  AmazonBedrockFSAction: 0,
  CreateAndUpdateAmazonBedrockFSAction: 0,
  ShareAmazonBedrockFSAction: 0,
  UseAmazonBedrockFSAction: 0,
  AmazonBedrockKRSAction: 0,
  CreateAndUpdateAmazonBedrockKRSAction: 0,
  ShareAmazonBedrockKRSAction: 0,
  UseAmazonBedrockKRSAction: 0,
  MCPAction: 0,
  CreateAndUpdateMCPAction: 0,
  ShareMCPAction: 0,
  UseMCPAction: 0,
  OpenAPIAction: 0,
  CreateAndUpdateOpenAPIAction: 0,
  ShareOpenAPIAction: 0,
  UseOpenAPIAction: 0,
  SandPGMIAction: 0,
  CreateAndUpdateSandPGMIAction: 0,
  ShareSandPGMIAction: 0,
  UseSandPGMIAction: 0,
  SandPGlobalEnergyAction: 0,
  CreateAndUpdateSandPGlobalEnergyAction: 0,
  ShareSandPGlobalEnergyAction: 0,
  UseSandPGlobalEnergyAction: 0,
  BambooHRAction: 0,
  CreateAndUpdateBambooHRAction: 0,
  ShareBambooHRAction: 0,
  UseBambooHRAction: 0,
  BoxAgentAction: 0,
  CreateAndUpdateBoxAgentAction: 0,
  ShareBoxAgentAction: 0,
  UseBoxAgentAction: 0,
  CanvaAgentAction: 0,
  CreateAndUpdateCanvaAgentAction: 0,
  ShareCanvaAgentAction: 0,
  UseCanvaAgentAction: 0,
  GithubAction: 0,
  CreateAndUpdateGithubAction: 0,
  ShareGithubAction: 0,
  UseGithubAction: 0,
  NotionAction: 0,
  CreateAndUpdateNotionAction: 0,
  ShareNotionAction: 0,
  UseNotionAction: 0,
  LinearAction: 0,
  CreateAndUpdateLinearAction: 0,
  ShareLinearAction: 0,
  UseLinearAction: 0,
  HuggingFaceAction: 0,
  CreateAndUpdateHuggingFaceAction: 0,
  ShareHuggingFaceAction: 0,
  UseHuggingFaceAction: 0,
  MondayAction: 0,
  CreateAndUpdateMondayAction: 0,
  ShareMondayAction: 0,
  UseMondayAction: 0,
  HubspotAction: 0,
  CreateAndUpdateHubspotAction: 0,
  ShareHubspotAction: 0,
  UseHubspotAction: 0,
  IntercomAction: 0,
  CreateAndUpdateIntercomAction: 0,
  ShareIntercomAction: 0,
  UseIntercomAction: 0,
  NewRelicAction: 0,
  CreateAndUpdateNewRelicAction: 0,
  ShareNewRelicAction: 0,
  UseNewRelicAction: 0,
  Topic: 0,
  EditVisualWithQ: 0,
  BuildCalculatedFieldWithQ: 0,
  CreateDashboardExecutiveSummaryWithQ: 0,
  Space: 0,
  CreateSpaces: 0,
  ShareSpaces: 0,
  ChatAgent: 0,
  CreateChatAgents: 0,
  ShareChatAgents: 0,
  Research: 0,
  SelfUpgradeUserRole: 0,
  Extension: 0,
  UseBrowserExtension: 0,
  UseWordAddInExtension: 0,
  UseOutlookAddInExtension: 0,
  UseExcelAddInExtension: 0,
  UsePowerpointAddInExtension: 0,
  ManageSharedFolders: 0,
  GenerateAnalyses: 0,
  Story: 0,
  Scenario: 0,
  Trigger: 0,
  ScheduleTrigger: 0,
  InboundEmailTrigger: 0,
  QuickEventTrigger: 0,
});
const i_ColumnGroup: D.LazyStruct = () => ({
  GeoSpatialColumnGroup: { Name: 0, CountryCode: 0, Columns: 0 },
});
const i_ColumnLevelPermissionRule: D.LazyStruct = () => ({
  Principals: 0,
  ColumnNames: 0,
});
const i_CustomInstructions: D.LazyStruct = () => ({
  CustomInstructionsString: 0,
});
const i_CustomPromptInput: D.LazyStruct = () => ({
  ExistingPrompt: { ModelProfileId: 0, SubscriptionId: 0, QbsAwsAccountId: 0 },
  NewPrompt: {
    ResponseLength: 0,
    OutputStyle: 0,
    Identity: 0,
    Tone: 0,
    CustomInstructions: 0,
  },
});
const i_DashboardPublishOptions: D.LazyStruct = () => ({
  AdHocFilteringOption: { AvailabilityStatus: 0 },
  ExportToCSVOption: { AvailabilityStatus: 0 },
  SheetControlsOption: { VisibilityState: 0 },
  VisualPublishOptions: { ExportHiddenFieldsOption: { AvailabilityStatus: 0 } },
  SheetLayoutElementMaximizationOption: { AvailabilityStatus: 0 },
  VisualMenuOption: i_VisualMenuOption,
  VisualAxisSortOption: { AvailabilityStatus: 0 },
  ExportWithHiddenFieldsOption: { AvailabilityStatus: 0 },
  DataPointDrillUpDownOption: { AvailabilityStatus: 0 },
  DataPointMenuLabelOption: { AvailabilityStatus: 0 },
  DataPointTooltipOption: { AvailabilityStatus: 0 },
  DataQAEnabledOption: { AvailabilityStatus: 0 },
  QuickSuiteActionsOption: { AvailabilityStatus: 0 },
  ExecutiveSummaryOption: { AvailabilityStatus: 0 },
  DataStoriesSharingOption: { AvailabilityStatus: 0 },
});
const i_DashboardSourceEntity: D.LazyStruct = () => ({
  SourceTemplate: {
    DataSetReferences: D.list(i_DataSetReference),
    TopicReferences: D.list(i_TopicReference),
    Arn: 0,
  },
});
const i_DashboardVersionDefinition: D.LazyStruct = () => ({
  DataSetIdentifierDeclarations: D.list(i_DataSetIdentifierDeclaration),
  TopicIdentifierDeclarations: D.list(i_TopicIdentifierDeclaration),
  Sheets: D.list(i_SheetDefinition),
  TooltipSheets: D.list(i_TooltipSheetDefinition),
  CalculatedFields: D.list(i_CalculatedField),
  ParameterDeclarations: D.list(i_ParameterDeclaration),
  FilterGroups: D.list(i_FilterGroup),
  ColumnConfigurations: D.list(i_ColumnConfiguration),
  AnalysisDefaults: i_AnalysisDefaults,
  Options: i_AssetOptions,
  StaticFiles: D.list(i_StaticFile),
});
const i_DashboardVisualId: D.LazyStruct = () => ({
  DashboardId: 0,
  SheetId: 0,
  VisualId: 0,
});
const i_DataPrepConfiguration: D.LazyStruct = () => ({
  SourceTableMap: D.map({
    PhysicalTableId: 0,
    DataSet: { DataSetArn: 0, InputColumns: D.list(i_InputColumn) },
  }),
  TransformStepMap: D.map({
    ImportTableStep: {
      Alias: 0,
      Source: {
        SourceTableId: 0,
        ColumnIdMappings: D.list(i_DataSetColumnIdMapping),
      },
    },
    ProjectStep: i_ProjectOperation,
    FiltersStep: {
      Alias: 0,
      Source: i_TransformOperationSource,
      FilterOperations: D.list(i_FilterOperation),
    },
    CreateColumnsStep: i_CreateColumnsOperation,
    RenameColumnsStep: {
      Alias: 0,
      Source: i_TransformOperationSource,
      RenameColumnOperations: D.list(i_RenameColumnOperation),
    },
    CastColumnTypesStep: {
      Alias: 0,
      Source: i_TransformOperationSource,
      CastColumnTypeOperations: D.list(i_CastColumnTypeOperation),
    },
    JoinStep: {
      Alias: 0,
      LeftOperand: i_TransformOperationSource,
      RightOperand: i_TransformOperationSource,
      Type: 0,
      OnClause: 0,
      LeftOperandProperties: i_JoinOperandProperties,
      RightOperandProperties: i_JoinOperandProperties,
    },
    AggregateStep: {
      Alias: 0,
      Source: i_TransformOperationSource,
      GroupByColumnNames: 0,
      Aggregations: D.list({
        AggregationFunction: i_DataPrepAggregationFunction,
        NewColumnName: 0,
        NewColumnId: 0,
      }),
    },
    PivotStep: {
      Alias: 0,
      Source: i_TransformOperationSource,
      GroupByColumnNames: 0,
      ValueColumnConfiguration: {
        AggregationFunction: i_DataPrepAggregationFunction,
      },
      PivotConfiguration: {
        LabelColumnName: 0,
        PivotedLabels: D.list({
          LabelName: 0,
          NewColumnName: 0,
          NewColumnId: 0,
        }),
      },
    },
    UnpivotStep: {
      Alias: 0,
      Source: i_TransformOperationSource,
      ColumnsToUnpivot: D.list({ ColumnName: 0, NewValue: 0 }),
      UnpivotedLabelColumnName: 0,
      UnpivotedLabelColumnId: 0,
      UnpivotedValueColumnName: 0,
      UnpivotedValueColumnId: 0,
    },
    AppendStep: {
      Alias: 0,
      FirstSource: i_TransformOperationSource,
      SecondSource: i_TransformOperationSource,
      AppendedColumns: D.list({ ColumnName: 0, NewColumnId: 0 }),
    },
  }),
  DestinationTableMap: D.map({ Alias: 0, Source: { TransformOperationId: 0 } }),
});
const i_DataSetRefreshProperties: D.LazyStruct = () => ({
  RefreshConfiguration: {
    IncrementalRefresh: {
      LookbackWindow: { ColumnName: 0, Size: 0, SizeUnit: 0 },
    },
  },
  FailureConfiguration: { EmailAlert: { AlertStatus: 0 } },
});
const i_DataSetUsageConfiguration: D.LazyStruct = () => ({
  DisableUseAsDirectQuerySource: 0,
  DisableUseAsImportedSource: 0,
});
const i_DataSourceCredentials: D.LazyStruct = () => ({
  CredentialPair: {
    Username: 0,
    Password: 0,
    AlternateDataSourceParameters: D.list(i_DataSourceParameters),
  },
  CopySourceArn: 0,
  SecretArn: 0,
  KeyPairCredentials: {
    KeyPairUsername: 0,
    PrivateKey: 0,
    PrivateKeyPassphrase: 0,
  },
  WebProxyCredentials: { WebProxyUsername: 0, WebProxyPassword: 0 },
  OAuthClientCredentials: { ClientId: 0, ClientSecret: 0, Username: 0 },
});
const i_DataSourceParameters: D.LazyStruct = () => ({
  AmazonElasticsearchParameters: { Domain: 0 },
  AthenaParameters: {
    WorkGroup: 0,
    RoleArn: 0,
    ConsumerAccountRoleArn: 0,
    IdentityCenterConfiguration: i_IdentityCenterConfiguration,
  },
  AuroraParameters: { Host: 0, Port: 0, Database: 0 },
  AuroraPostgreSqlParameters: { Host: 0, Port: 0, Database: 0 },
  AwsIotAnalyticsParameters: { DataSetName: 0 },
  JiraParameters: { SiteBaseUrl: 0 },
  MariaDbParameters: { Host: 0, Port: 0, Database: 0 },
  MySqlParameters: { Host: 0, Port: 0, Database: 0 },
  OracleParameters: { Host: 0, Port: 0, Database: 0, UseServiceName: 0 },
  PostgreSqlParameters: { Host: 0, Port: 0, Database: 0 },
  PrestoParameters: { Host: 0, Port: 0, Catalog: 0 },
  RdsParameters: { InstanceId: 0, Database: 0 },
  RedshiftParameters: {
    Host: 0,
    Port: 0,
    Database: 0,
    ClusterId: 0,
    IAMParameters: {
      RoleArn: 0,
      DatabaseUser: 0,
      DatabaseGroups: 0,
      AutoCreateDatabaseUser: 0,
    },
    IdentityCenterConfiguration: i_IdentityCenterConfiguration,
  },
  S3Parameters: { ManifestFileLocation: { Bucket: 0, Key: 0 }, RoleArn: 0 },
  S3TablesParameters: { TableBucketArn: 0 },
  S3KnowledgeBaseParameters: {
    RoleArn: 0,
    BucketUrl: 0,
    MetadataFilesLocation: 0,
  },
  ServiceNowParameters: { SiteBaseUrl: 0 },
  SnowflakeParameters: {
    Host: 0,
    Database: 0,
    Warehouse: 0,
    AuthenticationType: 0,
    DatabaseAccessControlRole: 0,
    OAuthParameters: i_OAuthParameters,
  },
  SparkParameters: { Host: 0, Port: 0 },
  SqlServerParameters: { Host: 0, Port: 0, Database: 0 },
  TeradataParameters: { Host: 0, Port: 0, Database: 0 },
  TwitterParameters: { Query: 0, MaxRows: 0 },
  AmazonOpenSearchParameters: { Domain: 0 },
  ExasolParameters: { Host: 0, Port: 0 },
  DatabricksParameters: { Host: 0, Port: 0, SqlEndpointPath: 0 },
  StarburstParameters: {
    Host: 0,
    Port: 0,
    Catalog: 0,
    ProductType: 0,
    DatabaseAccessControlRole: 0,
    AuthenticationType: 0,
    OAuthParameters: i_OAuthParameters,
  },
  TrinoParameters: { Host: 0, Port: 0, Catalog: 0 },
  BigQueryParameters: { ProjectId: 0, DataSetRegion: 0 },
  ImpalaParameters: { Host: 0, Port: 0, Database: 0, SqlEndpointPath: 0 },
  CustomConnectionParameters: { ConnectionType: 0 },
  WebCrawlerParameters: {
    WebCrawlerAuthType: 0,
    UsernameFieldXpath: 0,
    PasswordFieldXpath: 0,
    UsernameButtonXpath: 0,
    PasswordButtonXpath: 0,
    LoginPageUrl: 0,
    WebProxyHostName: 0,
    WebProxyPortNumber: 0,
  },
  ConfluenceParameters: { ConfluenceUrl: 0 },
  QBusinessParameters: { ApplicationArn: 0 },
  SharePointParameters: {
    SharePointDomain: 0,
    TenantId: 0,
    ClientId: 0,
    AuthType: 0,
  },
  GoogleDriveParameters: { AuthType: 0 },
  OneDriveParameters: { TenantId: 0, ClientId: 0, AuthType: 0 },
  FMKBParameters: { KnowledgeBaseArn: 0, LinkedDataSourceIds: 0 },
});
const i_DatasetParameter: D.LazyStruct = () => ({
  StringDatasetParameter: {
    Id: 0,
    Name: 0,
    ValueType: 0,
    DefaultValues: { StaticValues: 0 },
  },
  DecimalDatasetParameter: {
    Id: 0,
    Name: 0,
    ValueType: 0,
    DefaultValues: { StaticValues: 0 },
  },
  IntegerDatasetParameter: {
    Id: 0,
    Name: 0,
    ValueType: 0,
    DefaultValues: { StaticValues: 0 },
  },
  DateTimeDatasetParameter: {
    Id: 0,
    Name: 0,
    ValueType: 0,
    TimeGranularity: 0,
    DefaultValues: { StaticValues: 0 },
  },
});
const i_FieldFolder: D.LazyStruct = () => ({ description: 0, columns: 0 });
const i_Governance: D.LazyStruct = () => ({ DefaultCategoryEffects: 0 });
const i_KnowledgeBaseConfiguration: D.LazyStruct = () => ({
  templateConfiguration: { template: 0 },
});
const i_LogicalTable: D.LazyStruct = () => ({
  Alias: 0,
  DataTransforms: D.list({
    ProjectOperation: i_ProjectOperation,
    FilterOperation: i_FilterOperation,
    CreateColumnsOperation: i_CreateColumnsOperation,
    RenameColumnOperation: i_RenameColumnOperation,
    CastColumnTypeOperation: i_CastColumnTypeOperation,
    TagColumnOperation: {
      ColumnName: 0,
      Tags: D.list({
        ColumnGeographicRole: 0,
        ColumnDescription: i_ColumnDescription,
      }),
    },
    UntagColumnOperation: { ColumnName: 0, TagNames: 0 },
    OverrideDatasetParameterOperation: {
      ParameterName: 0,
      NewParameterName: 0,
      NewDefaultValues: {
        StringStaticValues: 0,
        DecimalStaticValues: 0,
        DateTimeStaticValues: 0,
        IntegerStaticValues: 0,
      },
    },
  }),
  Source: {
    JoinInstruction: {
      LeftOperand: 0,
      RightOperand: 0,
      LeftJoinKeyProperties: i_JoinKeyProperties,
      RightJoinKeyProperties: i_JoinKeyProperties,
      Type: 0,
      OnClause: 0,
    },
    PhysicalTableId: 0,
    DataSetArn: 0,
  },
});
const i_MediaExtractionConfiguration: D.LazyStruct = () => ({
  imageExtractionConfiguration: { imageExtractionStatus: 0 },
  audioExtractionConfiguration: { audioExtractionStatus: 0 },
  videoExtractionConfiguration: {
    videoExtractionStatus: 0,
    videoExtractionType: 0,
  },
});
const i_Parameters: D.LazyStruct = () => ({
  StringParameters: D.list({ Name: 0, Values: 0 }),
  IntegerParameters: D.list({ Name: 0, Values: 0 }),
  DecimalParameters: D.list({ Name: 0, Values: 0 }),
  DateTimeParameters: D.list({ Name: 0, Values: 0 }),
});
const i_PerformanceConfiguration: D.LazyStruct = () => ({
  UniqueKeys: D.list({ ColumnNames: 0 }),
});
const i_Permission: D.LazyStruct = () => ({ Actions: 0, Principal: 0 });
const i_PhysicalTable: D.LazyStruct = () => ({
  RelationalTable: {
    DataSourceArn: 0,
    Catalog: 0,
    Schema: 0,
    Name: 0,
    InputColumns: D.list(i_InputColumn),
  },
  CustomSql: {
    DataSourceArn: 0,
    Name: 0,
    SqlQuery: 0,
    Columns: D.list(i_InputColumn),
  },
  S3Source: {
    DataSourceArn: 0,
    UploadSettings: i_UploadSettings,
    InputColumns: D.list(i_InputColumn),
  },
  SaaSTable: {
    DataSourceArn: 0,
    TablePath: D.list({ Name: 0, Id: 0 }),
    InputColumns: D.list(i_InputColumn),
  },
  FileSource: {
    DataSourceArn: 0,
    UploadSettings: i_UploadSettings,
    SheetIndex: 0,
    InputColumns: D.list(i_InputColumn),
  },
});
const i_ProfileLimitValue: D.LazyStruct = () => ({ maxValue: 0, unit: 0 });
const i_ProviderConfig: D.LazyStruct = () => ({
  MicrosoftPurview: {
    Credentials: { SecretArn: 0 },
    LabelActionMappings: D.list({ LabelId: 0, LabelName: 0, Action: 0 }),
    UnmappedAction: 0,
  },
});
const i_RefreshSchedule: D.LazyStruct = () => ({
  ScheduleId: 0,
  ScheduleFrequency: {
    Interval: 0,
    RefreshOnDay: { DayOfWeek: 0, DayOfMonth: 0 },
    Timezone: 0,
    TimeOfTheDay: 0,
  },
  StartAfterDateTime: 0,
  RefreshType: 0,
  Arn: 0,
});
const i_RegisteredUserEmbeddingExperienceConfiguration: D.LazyStruct = () => ({
  Dashboard: {
    InitialDashboardId: 0,
    FeatureConfigurations: {
      StatePersistence: i_StatePersistenceConfigurations,
      Bookmarks: { Enabled: 0 },
      SharedView: i_SharedViewConfigurations,
      AmazonQInQuickSight: {
        ExecutiveSummary: i_ExecutiveSummaryConfigurations,
      },
      Schedules: i_SchedulesConfigurations,
      RecentSnapshots: i_RecentSnapshotsConfigurations,
      ThresholdAlerts: i_ThresholdAlertsConfigurations,
      DashboardCustomizationSummary:
        i_DashboardCustomizationSummaryConfigurations,
    },
  },
  QuickSightConsole: {
    InitialPath: 0,
    FeatureConfigurations: {
      StatePersistence: i_StatePersistenceConfigurations,
      SharedView: i_SharedViewConfigurations,
      AmazonQInQuickSight: {
        DataQnA: { Enabled: 0 },
        GenerativeAuthoring: { Enabled: 0 },
        ExecutiveSummary: i_ExecutiveSummaryConfigurations,
        DataStories: { Enabled: 0 },
      },
      Schedules: i_SchedulesConfigurations,
      RecentSnapshots: i_RecentSnapshotsConfigurations,
      ThresholdAlerts: i_ThresholdAlertsConfigurations,
      DashboardCustomizationSummary:
        i_DashboardCustomizationSummaryConfigurations,
    },
  },
  QSearchBar: { InitialTopicId: 0 },
  DashboardVisual: { InitialDashboardVisualId: i_DashboardVisualId },
  GenerativeQnA: { InitialTopicId: 0 },
  QuickChat: {},
});
const i_ResourcePermission: D.LazyStruct = () => ({ Principal: 0, Actions: 0 });
const i_RowLevelPermissionDataSet: D.LazyStruct = () => ({
  Namespace: 0,
  Arn: 0,
  PermissionPolicy: 0,
  FormatVersion: 0,
  Status: 0,
});
const i_RowLevelPermissionTagConfiguration: D.LazyStruct = () => ({
  Status: 0,
  TagRules: D.list({
    TagKey: 0,
    ColumnName: 0,
    TagMultiValueDelimiter: 0,
    MatchAllValue: 0,
  }),
  TagRuleConfigurations: 0,
});
const i_SemanticModelConfiguration: D.LazyStruct = () => ({
  TableMap: D.map({
    Alias: 0,
    DestinationTableId: 0,
    RowLevelPermissionConfiguration: {
      TagConfiguration: i_RowLevelPermissionTagConfiguration,
      RowLevelPermissionDataSet: i_RowLevelPermissionDataSet,
    },
    SemanticMetadata: {
      ColumnMetadata: D.list({
        ColumnNames: 0,
        ColumnProperties: D.list({
          Description: i_ColumnDescription,
          AdditionalNotes: { Text: 0 },
          SemanticType: { GeographicalRole: 0 },
        }),
      }),
    },
  }),
  SemanticMetadata: D.list({
    Description: { Text: 0 },
    CustomInstructions: D.list({
      InlineCustomInstruction: {
        InstructionText: 0,
        UploadedDocumentMetadata: { Name: 0 },
      },
    }),
  }),
});
const i_SessionTag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_SharedViewConfigurations: D.LazyStruct = () => ({ Enabled: 0 });
const i_SpaceResourceOperation: D.LazyStruct = () => ({
  ResourceType: 0,
  ResourceDetails: { resourceArn: 0 },
});
const i_SslProperties: D.LazyStruct = () => ({ DisableSsl: 0 });
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_TemplateSourceEntity: D.LazyStruct = () => ({
  SourceAnalysis: {
    Arn: 0,
    DataSetReferences: D.list(i_DataSetReference),
    TopicReferences: D.list(i_TopicReference),
  },
  SourceTemplate: { Arn: 0 },
});
const i_TemplateVersionDefinition: D.LazyStruct = () => ({
  DataSetConfigurations: D.list({
    Placeholder: 0,
    DataSetSchema: i_DataSetSchema,
    ColumnGroupSchemaList: D.list(i_ColumnGroupSchema),
  }),
  TopicConfigurations: D.list({
    Placeholder: 0,
    DataSetSchema: i_DataSetSchema,
    ColumnGroupSchemaList: D.list(i_ColumnGroupSchema),
  }),
  Sheets: D.list(i_SheetDefinition),
  TooltipSheets: D.list(i_TooltipSheetDefinition),
  CalculatedFields: D.list(i_CalculatedField),
  ParameterDeclarations: D.list(i_ParameterDeclaration),
  FilterGroups: D.list(i_FilterGroup),
  ColumnConfigurations: D.list(i_ColumnConfiguration),
  AnalysisDefaults: i_AnalysisDefaults,
  Options: i_AssetOptions,
  QueryExecutionOptions: i_QueryExecutionOptions,
  StaticFiles: D.list(i_StaticFile),
});
const i_ThemeConfiguration: D.LazyStruct = () => ({
  DataColorPalette: { Colors: 0, MinMaxGradient: 0, EmptyFillColor: 0 },
  UIColorPalette: {
    PrimaryForeground: 0,
    PrimaryBackground: 0,
    SecondaryForeground: 0,
    SecondaryBackground: 0,
    Accent: 0,
    AccentForeground: 0,
    Danger: 0,
    DangerForeground: 0,
    Warning: 0,
    WarningForeground: 0,
    Success: 0,
    SuccessForeground: 0,
    Dimension: 0,
    DimensionForeground: 0,
    Measure: 0,
    MeasureForeground: 0,
  },
  Sheet: {
    Tile: {
      BackgroundColor: 0,
      Border: { Color: 0, Show: 0, Width: 0 },
      BorderRadius: 0,
      Padding: 0,
    },
    TileLayout: { Gutter: { Show: 0 }, Margin: { Show: 0 } },
    Background: { Color: 0, Gradient: 0 },
  },
  Typography: {
    FontFamilies: D.list({ FontFamily: 0 }),
    AxisTitleFontConfiguration: i_FontConfiguration,
    AxisLabelFontConfiguration: i_FontConfiguration,
    LegendTitleFontConfiguration: i_FontConfiguration,
    LegendValueFontConfiguration: i_FontConfiguration,
    DataLabelFontConfiguration: i_FontConfiguration,
    VisualTitleFontConfiguration: {
      FontConfiguration: i_FontConfiguration,
      TextAlignment: 0,
      TextTransform: 0,
    },
    VisualSubtitleFontConfiguration: {
      FontConfiguration: i_FontConfiguration,
      TextAlignment: 0,
      TextTransform: 0,
    },
    ControlTitleFontConfiguration: {
      FontConfiguration: i_FontConfiguration,
      TextAlignment: 0,
    },
  },
});
const i_TopicDetails: D.LazyStruct = () => ({
  Name: 0,
  Description: 0,
  UserExperienceVersion: 0,
  DataSets: D.list({
    DatasetArn: 0,
    DatasetName: 0,
    DatasetDescription: 0,
    DataAggregation: { DatasetRowDateGranularity: 0, DefaultDateColumnName: 0 },
    Filters: D.list({
      FilterDescription: 0,
      FilterClass: 0,
      FilterName: 0,
      FilterSynonyms: 0,
      OperandFieldName: 0,
      FilterType: 0,
      CategoryFilter: {
        CategoryFilterFunction: 0,
        CategoryFilterType: 0,
        Constant: {
          ConstantType: 0,
          SingularConstant: 0,
          CollectiveConstant: { ValueList: 0 },
        },
        Inverse: 0,
        NullFilter: 0,
      },
      NumericEqualityFilter: {
        Constant: i_TopicSingularFilterConstant,
        Aggregation: 0,
        Inverse: 0,
        NullFilter: 0,
      },
      NumericRangeFilter: {
        Inclusive: 0,
        Constant: i_TopicRangeFilterConstant,
        Aggregation: 0,
        Inverse: 0,
        NullFilter: 0,
      },
      DateRangeFilter: {
        Inclusive: 0,
        Constant: i_TopicRangeFilterConstant,
        NullFilter: 0,
      },
      RelativeDateFilter: {
        TimeGranularity: 0,
        RelativeDateFilterFunction: 0,
        Constant: i_TopicSingularFilterConstant,
        NullFilter: 0,
      },
      NullFilter: {
        NullFilterType: 0,
        Constant: i_TopicSingularFilterConstant,
        Inverse: 0,
      },
    }),
    Columns: D.list({
      ColumnName: 0,
      ColumnFriendlyName: 0,
      ColumnDescription: 0,
      ColumnSynonyms: 0,
      ColumnDataRole: 0,
      Aggregation: 0,
      IsIncludedInTopic: 0,
      DisableIndexing: 0,
      ComparativeOrder: i_ComparativeOrder,
      SemanticType: i_SemanticType,
      TimeGranularity: 0,
      AllowedAggregations: 0,
      NotAllowedAggregations: 0,
      DefaultFormatting: i_DefaultFormatting,
      NeverAggregateInFilter: 0,
      CellValueSynonyms: D.list(i_CellValueSynonym),
      NonAdditive: 0,
    }),
    CalculatedFields: D.list({
      CalculatedFieldName: 0,
      CalculatedFieldDescription: 0,
      Expression: 0,
      CalculatedFieldSynonyms: 0,
      IsIncludedInTopic: 0,
      DisableIndexing: 0,
      ColumnDataRole: 0,
      TimeGranularity: 0,
      DefaultFormatting: i_DefaultFormatting,
      Aggregation: 0,
      ComparativeOrder: i_ComparativeOrder,
      SemanticType: i_SemanticType,
      AllowedAggregations: 0,
      NotAllowedAggregations: 0,
      NeverAggregateInFilter: 0,
      CellValueSynonyms: D.list(i_CellValueSynonym),
      NonAdditive: 0,
    }),
    NamedEntities: D.list({
      EntityName: 0,
      EntityDescription: 0,
      EntitySynonyms: 0,
      SemanticEntityType: { TypeName: 0, SubTypeName: 0, TypeParameters: 0 },
      Definition: D.list({
        FieldName: 0,
        PropertyName: 0,
        PropertyRole: 0,
        PropertyUsage: 0,
        Metric: { Aggregation: 0, AggregationFunctionParameters: 0 },
        RankOrder: 0,
        PresentationOrder: 0,
        IsHidden: 0,
      }),
      Sort: D.list({ FieldName: 0, Direction: 0 }),
      RankOrder: 0,
      PresentationOrder: 0,
    }),
  }),
  ConfigOptions: { QBusinessInsightsEnabled: 0 },
});
const i_TopicIR: D.LazyStruct = () => ({
  Metrics: D.list({
    MetricId: i_Identifier,
    Function: {
      Aggregation: 0,
      AggregationFunctionParameters: 0,
      Period: 0,
      PeriodField: 0,
    },
    Operands: D.list(i_Identifier),
    ComparisonMethod: { Type: 0, Period: 0, WindowSize: 0 },
    Expression: 0,
    CalculatedFieldReferences: D.list(i_Identifier),
    DisplayFormat: 0,
    DisplayFormatOptions: i_DisplayFormatOptions,
    NamedEntity: i_NamedEntityRef,
  }),
  GroupByList: D.list({
    FieldName: i_Identifier,
    TimeGranularity: 0,
    Sort: i_TopicSortClause,
    DisplayFormat: 0,
    DisplayFormatOptions: i_DisplayFormatOptions,
    NamedEntity: i_NamedEntityRef,
  }),
  Filters: D.list(D.list(i_TopicIRFilterOption)),
  Sort: i_TopicSortClause,
  ContributionAnalysis: {
    Factors: D.list({ FieldName: 0 }),
    TimeRanges: {
      StartRange: i_TopicIRFilterOption,
      EndRange: i_TopicIRFilterOption,
    },
    Direction: 0,
    SortType: 0,
  },
  Visual: { type: 0 },
});
const i_TopicRefreshSchedule: D.LazyStruct = () => ({
  IsEnabled: 0,
  BasedOnSpiceSchedule: 0,
  StartingAt: 0,
  Timezone: 0,
  RepeatAt: 0,
  TopicScheduleType: 0,
});
const i_TopicSearchFilter: D.LazyStruct = () => ({
  Operator: 0,
  Name: 0,
  Value: 0,
});
const i_TopicV2Details: D.LazyStruct = () => ({
  Name: 0,
  Description: 0,
  DataSets: D.list({ DataSetArn: 0, DataSetName: 0 }),
  DataSetRelations: D.list({
    Left: i_TopicV2DataSetRelationEndpoint,
    Right: i_TopicV2DataSetRelationEndpoint,
  }),
});
const i_TopicVisual: D.LazyStruct = () => ({
  VisualId: 0,
  Role: 0,
  Ir: i_TopicIR,
  SupportingVisuals: D.list(i_TopicVisual),
});
const i_ValidationStrategy: D.LazyStruct = () => ({ Mode: 0 });
const i_VpcConnectionProperties: D.LazyStruct = () => ({ VpcConnectionArn: 0 });
const o_ActionConnectorSummary: D.LazyStruct = () => ({
  Name: D.secret,
  CreatedTime: D.ts,
  LastUpdatedTime: D.ts,
});
const o_AgentSummary: D.LazyStruct = () => ({
  CreatedAt: D.ts,
  UpdatedAt: D.ts,
});
const o_AnalysisSummary: D.LazyStruct = () => ({
  CreatedTime: D.ts,
  LastUpdatedTime: D.ts,
});
const o_ApprovalPolicy: D.LazyStruct = () => ({
  CreatedAt: D.ts,
  UpdatedAt: D.ts,
});
const o_BrandDetail: D.LazyStruct = () => ({
  CreatedTime: D.ts,
  LastUpdatedTime: D.ts,
});
const o_CalculatedField: D.LazyStruct = () => ({ Expression: D.secret });
const o_CellValueSynonym: D.LazyStruct = () => ({
  CellValue: D.secret,
  Synonyms: D.list(D.secret),
});
const o_ColumnConfiguration: D.LazyStruct = () => ({
  FormatConfiguration: o_FormatConfiguration,
  ColorsConfiguration: { CustomColors: D.list({ FieldValue: D.secret }) },
});
const o_ColumnDescription: D.LazyStruct = () => ({ Text: D.secret });
const o_CreateColumnsOperation: D.LazyStruct = () => ({
  Columns: D.list({ Expression: D.secret }),
});
const o_CustomInstructions: D.LazyStruct = () => ({
  CustomInstructionsString: D.secret,
});
const o_DashboardSummary: D.LazyStruct = () => ({
  CreatedTime: D.ts,
  LastUpdatedTime: D.ts,
  LastPublishedTime: D.ts,
});
const o_DataSetSummary: D.LazyStruct = () => ({
  CreatedTime: D.ts,
  LastUpdatedTime: D.ts,
});
const o_DataSource: D.LazyStruct = () => ({
  CreatedTime: D.ts,
  LastUpdatedTime: D.ts,
  LastCredentialVerifiedAt: D.ts,
});
const o_FilterGroup: D.LazyStruct = () => ({
  Filters: D.list({
    TimeEqualityFilter: {
      Value: D.ts,
      RollingDate: o_RollingDateConfiguration,
    },
    TimeRangeFilter: {
      RangeMinimumValue: o_TimeRangeFilterValue,
      RangeMaximumValue: o_TimeRangeFilterValue,
    },
  }),
});
const o_FilterOperation: D.LazyStruct = () => ({
  ConditionExpression: D.secret,
  StringFilterCondition: {
    ComparisonFilterCondition: { Value: { StaticValue: D.secret } },
    ListFilterCondition: { Values: { StaticValues: D.list(D.secret) } },
  },
  DateFilterCondition: {
    ComparisonFilterCondition: { Value: o_DataSetDateFilterValue },
    RangeFilterCondition: {
      RangeMinimum: o_DataSetDateFilterValue,
      RangeMaximum: o_DataSetDateFilterValue,
    },
  },
});
const o_FlowSummary: D.LazyStruct = () => ({
  CreatedTime: D.ts,
  LastUpdatedTime: D.ts,
  LastPublishedAt: D.ts,
});
const o_FolderSummary: D.LazyStruct = () => ({
  CreatedTime: D.ts,
  LastUpdatedTime: D.ts,
});
const o_Ingestion: D.LazyStruct = () => ({ CreatedTime: D.ts });
const o_KnowledgeBaseIngestionSummary: D.LazyStruct = () => ({
  StartTime: D.ts,
  EndTime: D.ts,
});
const o_KnowledgeBaseSummary: D.LazyStruct = () => ({
  CreatedAt: D.ts,
  UpdatedAt: D.ts,
  PrimaryOwnerUsername: D.secret,
});
const o_LimitsProfile: D.LazyStruct = () => ({
  createdAt: D.ts,
  updatedAt: D.ts,
});
const o_ParameterDeclaration: D.LazyStruct = () => ({
  StringParameterDeclaration: {
    DefaultValues: { StaticValues: D.list(D.secret) },
    ValueWhenUnset: { CustomValue: D.secret },
  },
  DateTimeParameterDeclaration: {
    DefaultValues: {
      StaticValues: D.list(D.ts),
      RollingDate: o_RollingDateConfiguration,
    },
    ValueWhenUnset: { CustomValue: D.ts },
  },
});
const o_QAResult: D.LazyStruct = () => ({
  GeneratedAnswer: { QuestionText: D.secret, Restatement: D.secret },
});
const o_RefreshSchedule: D.LazyStruct = () => ({ StartAfterDateTime: D.ts });
const o_RowLevelPermissionTagConfiguration: D.LazyStruct = () => ({
  TagRules: D.list({ MatchAllValue: D.secret }),
});
const o_SemanticType: D.LazyStruct = () => ({
  TruthyCellValue: D.secret,
  TruthyCellValueSynonyms: D.list(D.secret),
  FalseyCellValue: D.secret,
  FalseyCellValueSynonyms: D.list(D.secret),
});
const o_Sheet: D.LazyStruct = () => ({ Images: D.list(o_SheetImage) });
const o_SheetDefinition: D.LazyStruct = () => ({
  Visuals: D.list(o_Visual),
  Images: D.list(o_SheetImage),
  Layouts: D.list(o_Layout),
});
const o_SnapshotJobResultFileGroup: D.LazyStruct = () => ({
  S3Results: D.list({ S3Uri: D.secret }),
});
const o_SpaceSummary: D.LazyStruct = () => ({
  description: D.secret,
  updatedAt: D.ts,
  createdAt: D.ts,
});
const o_TooltipSheetDefinition: D.LazyStruct = () => ({
  Visuals: D.list(o_Visual),
  Images: D.list(o_SheetImage),
  Layouts: D.list(o_Layout),
});
const o_TopicIR: D.LazyStruct = () => ({
  Metrics: D.list({ Expression: D.secret }),
});
const o_TopicRangeFilterConstant: D.LazyStruct = () => ({
  RangeConstant: { Minimum: D.secret, Maximum: D.secret },
});
const o_TopicRefreshSchedule: D.LazyStruct = () => ({ StartingAt: D.ts });
const o_TopicSingularFilterConstant: D.LazyStruct = () => ({
  SingularConstant: D.secret,
});
const o_TopicVisual: D.LazyStruct = () => ({
  Ir: o_TopicIR,
  SupportingVisuals: D.list(o_TopicVisual),
});
const i_AnalysisDefaults: D.LazyStruct = () => ({
  DefaultNewSheetConfiguration: {
    InteractiveLayoutConfiguration: {
      Grid: { CanvasSizeOptions: i_GridLayoutCanvasSizeOptions },
      FreeForm: { CanvasSizeOptions: i_FreeFormLayoutCanvasSizeOptions },
    },
    PaginatedLayoutConfiguration: {
      SectionBased: {
        CanvasSizeOptions: i_SectionBasedLayoutCanvasSizeOptions,
      },
    },
    SheetContentType: 0,
  },
});
const i_AssetOptions: D.LazyStruct = () => ({
  Timezone: 0,
  WeekStart: 0,
  QBusinessInsightsStatus: 0,
  ExcludedDataSetArns: 0,
  CustomActionDefaults: i_VisualCustomActionDefaults,
  VisualMessages: {
    NoDataMessage: {
      Enabled: 0,
      Title: 0,
      TitleVisibility: 0,
      Description: 0,
      DescriptionVisibility: 0,
      LinkText: 0,
      LinkUrl: 0,
      LinkVisibility: 0,
    },
  },
});
const i_CalculatedField: D.LazyStruct = () => ({
  DataSetIdentifier: 0,
  TopicIdentifier: 0,
  Name: 0,
  Expression: 0,
});
const i_CastColumnTypeOperation: D.LazyStruct = () => ({
  ColumnName: 0,
  NewColumnType: 0,
  SubType: 0,
  Format: 0,
});
const i_CellValueSynonym: D.LazyStruct = () => ({ CellValue: 0, Synonyms: 0 });
const i_ColumnConfiguration: D.LazyStruct = () => ({
  Column: i_ColumnIdentifier,
  FormatConfiguration: i_FormatConfiguration,
  Role: 0,
  ColorsConfiguration: {
    CustomColors: D.list({ FieldValue: 0, Color: 0, SpecialValue: 0 }),
  },
  DecalSettingsConfiguration: { CustomDecalSettings: D.list(i_DecalSettings) },
});
const i_ColumnDescription: D.LazyStruct = () => ({ Text: 0 });
const i_ColumnGroupSchema: D.LazyStruct = () => ({
  Name: 0,
  ColumnGroupColumnSchemaList: D.list({ Name: 0 }),
});
const i_ComparativeOrder: D.LazyStruct = () => ({
  UseOrdering: 0,
  SpecifedOrder: 0,
  TreatUndefinedSpecifiedValues: 0,
});
const i_CreateColumnsOperation: D.LazyStruct = () => ({
  Alias: 0,
  Source: i_TransformOperationSource,
  Columns: D.list({ ColumnName: 0, ColumnId: 0, Expression: 0 }),
});
const i_DashboardCustomizationSummaryConfigurations: D.LazyStruct = () => ({
  Enabled: 0,
});
const i_DataPrepAggregationFunction: D.LazyStruct = () => ({
  SimpleAggregation: { InputColumnName: 0, FunctionType: 0 },
  ListAggregation: { InputColumnName: 0, Separator: 0, Distinct: 0 },
});
const i_DataSetColumnIdMapping: D.LazyStruct = () => ({
  SourceColumnId: 0,
  TargetColumnId: 0,
});
const i_DataSetIdentifierDeclaration: D.LazyStruct = () => ({
  Identifier: 0,
  DataSetArn: 0,
});
const i_DataSetReference: D.LazyStruct = () => ({
  DataSetPlaceholder: 0,
  DataSetArn: 0,
});
const i_DataSetSchema: D.LazyStruct = () => ({
  ColumnSchemaList: D.list({ Name: 0, DataType: 0, GeographicRole: 0 }),
});
const i_DefaultFormatting: D.LazyStruct = () => ({
  DisplayFormat: 0,
  DisplayFormatOptions: i_DisplayFormatOptions,
});
const i_DisplayFormatOptions: D.LazyStruct = () => ({
  UseBlankCellFormat: 0,
  BlankCellFormat: 0,
  DateFormat: 0,
  DecimalSeparator: 0,
  GroupingSeparator: 0,
  UseGrouping: 0,
  FractionDigits: 0,
  Prefix: 0,
  Suffix: 0,
  UnitScaler: 0,
  NegativeFormat: { Prefix: 0, Suffix: 0 },
  CurrencySymbol: 0,
});
const i_ExecutiveSummaryConfigurations: D.LazyStruct = () => ({ Enabled: 0 });
const i_FilterGroup: D.LazyStruct = () => ({
  FilterGroupId: 0,
  Filters: D.list({
    CategoryFilter: {
      FilterId: 0,
      Column: i_ColumnIdentifier,
      Configuration: i_CategoryFilterConfiguration,
      DefaultFilterControlConfiguration: i_DefaultFilterControlConfiguration,
    },
    NumericRangeFilter: {
      FilterId: 0,
      Column: i_ColumnIdentifier,
      IncludeMinimum: 0,
      IncludeMaximum: 0,
      RangeMinimum: i_NumericRangeFilterValue,
      RangeMaximum: i_NumericRangeFilterValue,
      SelectAllOptions: 0,
      AggregationFunction: i_AggregationFunction,
      NullOption: 0,
      DefaultFilterControlConfiguration: i_DefaultFilterControlConfiguration,
    },
    NumericEqualityFilter: {
      FilterId: 0,
      Column: i_ColumnIdentifier,
      Value: 0,
      SelectAllOptions: 0,
      MatchOperator: 0,
      AggregationFunction: i_AggregationFunction,
      ParameterName: 0,
      NullOption: 0,
      DefaultFilterControlConfiguration: i_DefaultFilterControlConfiguration,
    },
    TimeEqualityFilter: {
      FilterId: 0,
      Column: i_ColumnIdentifier,
      Value: 0,
      ParameterName: 0,
      TimeGranularity: 0,
      RollingDate: i_RollingDateConfiguration,
      DefaultFilterControlConfiguration: i_DefaultFilterControlConfiguration,
    },
    TimeRangeFilter: {
      FilterId: 0,
      Column: i_ColumnIdentifier,
      IncludeMinimum: 0,
      IncludeMaximum: 0,
      RangeMinimumValue: i_TimeRangeFilterValue,
      RangeMaximumValue: i_TimeRangeFilterValue,
      NullOption: 0,
      ExcludePeriodConfiguration: i_ExcludePeriodConfiguration,
      TimeGranularity: 0,
      DefaultFilterControlConfiguration: i_DefaultFilterControlConfiguration,
    },
    RelativeDatesFilter: {
      FilterId: 0,
      Column: i_ColumnIdentifier,
      AnchorDateConfiguration: { AnchorOption: 0, ParameterName: 0 },
      MinimumGranularity: 0,
      TimeGranularity: 0,
      RelativeDateType: 0,
      RelativeDateValue: 0,
      ParameterName: 0,
      NullOption: 0,
      ExcludePeriodConfiguration: i_ExcludePeriodConfiguration,
      DefaultFilterControlConfiguration: i_DefaultFilterControlConfiguration,
    },
    TopBottomFilter: {
      FilterId: 0,
      Column: i_ColumnIdentifier,
      Limit: 0,
      AggregationSortConfigurations: D.list(i_AggregationSortConfiguration),
      TimeGranularity: 0,
      ParameterName: 0,
      DefaultFilterControlConfiguration: i_DefaultFilterControlConfiguration,
    },
    NestedFilter: {
      FilterId: 0,
      Column: i_ColumnIdentifier,
      IncludeInnerSet: 0,
      InnerFilter: {
        CategoryInnerFilter: {
          Column: i_ColumnIdentifier,
          Configuration: i_CategoryFilterConfiguration,
          DefaultFilterControlConfiguration:
            i_DefaultFilterControlConfiguration,
        },
      },
    },
  }),
  ScopeConfiguration: {
    SelectedSheets: {
      SheetVisualScopingConfigurations: D.list({
        SheetId: 0,
        Scope: 0,
        VisualIds: 0,
      }),
    },
    AllSheets: {},
  },
  Status: 0,
  CrossDataset: 0,
});
const i_FilterOperation: D.LazyStruct = () => ({
  ConditionExpression: 0,
  StringFilterCondition: {
    ColumnName: 0,
    ComparisonFilterCondition: { Operator: 0, Value: { StaticValue: 0 } },
    ListFilterCondition: { Operator: 0, Values: { StaticValues: 0 } },
  },
  NumericFilterCondition: {
    ColumnName: 0,
    ComparisonFilterCondition: {
      Operator: 0,
      Value: i_DataSetNumericFilterValue,
    },
    RangeFilterCondition: {
      RangeMinimum: i_DataSetNumericFilterValue,
      RangeMaximum: i_DataSetNumericFilterValue,
      IncludeMinimum: 0,
      IncludeMaximum: 0,
    },
  },
  DateFilterCondition: {
    ColumnName: 0,
    ComparisonFilterCondition: { Operator: 0, Value: i_DataSetDateFilterValue },
    RangeFilterCondition: {
      RangeMinimum: i_DataSetDateFilterValue,
      RangeMaximum: i_DataSetDateFilterValue,
      IncludeMinimum: 0,
      IncludeMaximum: 0,
    },
  },
});
const i_FontConfiguration: D.LazyStruct = () => ({
  FontSize: { Relative: 0, Absolute: 0 },
  FontDecoration: 0,
  FontColor: 0,
  FontWeight: { Name: 0 },
  FontStyle: 0,
  FontFamily: 0,
});
const i_Identifier: D.LazyStruct = () => ({ Identity: 0 });
const i_IdentityCenterConfiguration: D.LazyStruct = () => ({
  EnableIdentityPropagation: 0,
});
const i_ImageSetConfiguration: D.LazyStruct = () => ({
  Original: { Source: { PublicUrl: 0, S3Uri: 0 } },
});
const i_InputColumn: D.LazyStruct = () => ({
  Name: 0,
  Id: 0,
  Type: 0,
  SubType: 0,
});
const i_JoinKeyProperties: D.LazyStruct = () => ({ UniqueKey: 0 });
const i_JoinOperandProperties: D.LazyStruct = () => ({
  OutputColumnNameOverrides: D.list({
    SourceColumnName: 0,
    OutputColumnName: 0,
  }),
});
const i_NamedEntityRef: D.LazyStruct = () => ({ NamedEntityName: 0 });
const i_OAuthParameters: D.LazyStruct = () => ({
  TokenProviderUrl: 0,
  OAuthScope: 0,
  IdentityProviderVpcConnectionProperties: i_VpcConnectionProperties,
  IdentityProviderResourceUri: 0,
  IdentityProviderCACertificatesBundleS3Uri: 0,
});
const i_Palette: D.LazyStruct = () => ({ Foreground: 0, Background: 0 });
const i_ParameterDeclaration: D.LazyStruct = () => ({
  StringParameterDeclaration: {
    ParameterValueType: 0,
    Name: 0,
    DefaultValues: { DynamicValue: i_DynamicDefaultValue, StaticValues: 0 },
    ValueWhenUnset: { ValueWhenUnsetOption: 0, CustomValue: 0 },
    MappedDataSetParameters: D.list(i_MappedDataSetParameter),
  },
  DecimalParameterDeclaration: {
    ParameterValueType: 0,
    Name: 0,
    DefaultValues: { DynamicValue: i_DynamicDefaultValue, StaticValues: 0 },
    ValueWhenUnset: { ValueWhenUnsetOption: 0, CustomValue: 0 },
    MappedDataSetParameters: D.list(i_MappedDataSetParameter),
  },
  IntegerParameterDeclaration: {
    ParameterValueType: 0,
    Name: 0,
    DefaultValues: { DynamicValue: i_DynamicDefaultValue, StaticValues: 0 },
    ValueWhenUnset: { ValueWhenUnsetOption: 0, CustomValue: 0 },
    MappedDataSetParameters: D.list(i_MappedDataSetParameter),
  },
  DateTimeParameterDeclaration: {
    Name: 0,
    DefaultValues: {
      DynamicValue: i_DynamicDefaultValue,
      StaticValues: 0,
      RollingDate: i_RollingDateConfiguration,
    },
    TimeGranularity: 0,
    ValueWhenUnset: { ValueWhenUnsetOption: 0, CustomValue: 0 },
    MappedDataSetParameters: D.list(i_MappedDataSetParameter),
  },
});
const i_ProjectOperation: D.LazyStruct = () => ({
  Alias: 0,
  Source: i_TransformOperationSource,
  ProjectedColumns: 0,
});
const i_QueryExecutionOptions: D.LazyStruct = () => ({ QueryExecutionMode: 0 });
const i_RecentSnapshotsConfigurations: D.LazyStruct = () => ({ Enabled: 0 });
const i_RenameColumnOperation: D.LazyStruct = () => ({
  ColumnName: 0,
  NewColumnName: 0,
});
const i_SchedulesConfigurations: D.LazyStruct = () => ({ Enabled: 0 });
const i_SemanticType: D.LazyStruct = () => ({
  TypeName: 0,
  SubTypeName: 0,
  TypeParameters: 0,
  TruthyCellValue: 0,
  TruthyCellValueSynonyms: 0,
  FalseyCellValue: 0,
  FalseyCellValueSynonyms: 0,
});
const i_SheetDefinition: D.LazyStruct = () => ({
  SheetId: 0,
  Title: 0,
  Description: 0,
  Name: 0,
  ParameterControls: D.list({
    DateTimePicker: {
      ParameterControlId: 0,
      Title: 0,
      SourceParameterName: 0,
      DisplayOptions: i_DateTimePickerControlDisplayOptions,
      ControlTitleFormatText: i_ControlTitleFormatText,
    },
    List: {
      ParameterControlId: 0,
      Title: 0,
      SourceParameterName: 0,
      DisplayOptions: i_ListControlDisplayOptions,
      Type: 0,
      SelectableValues: i_ParameterSelectableValues,
      CascadingControlConfiguration: i_CascadingControlConfiguration,
      ControlSortConfigurations: D.list(i_ControlSortConfiguration),
      ControlTitleFormatText: i_ControlTitleFormatText,
    },
    Dropdown: {
      ParameterControlId: 0,
      Title: 0,
      SourceParameterName: 0,
      DisplayOptions: i_DropDownControlDisplayOptions,
      Type: 0,
      SelectableValues: i_ParameterSelectableValues,
      CascadingControlConfiguration: i_CascadingControlConfiguration,
      CommitMode: 0,
      ControlSortConfigurations: D.list(i_ControlSortConfiguration),
      ControlTitleFormatText: i_ControlTitleFormatText,
    },
    TextField: {
      ParameterControlId: 0,
      Title: 0,
      SourceParameterName: 0,
      DisplayOptions: i_TextFieldControlDisplayOptions,
      ControlTitleFormatText: i_ControlTitleFormatText,
    },
    TextArea: {
      ParameterControlId: 0,
      Title: 0,
      SourceParameterName: 0,
      Delimiter: 0,
      DisplayOptions: i_TextAreaControlDisplayOptions,
      ControlTitleFormatText: i_ControlTitleFormatText,
    },
    Slider: {
      ParameterControlId: 0,
      Title: 0,
      SourceParameterName: 0,
      DisplayOptions: i_SliderControlDisplayOptions,
      MaximumValue: 0,
      MinimumValue: 0,
      StepSize: 0,
      ControlTitleFormatText: i_ControlTitleFormatText,
    },
  }),
  FilterControls: D.list({
    DateTimePicker: {
      FilterControlId: 0,
      Title: 0,
      SourceFilterId: 0,
      DisplayOptions: i_DateTimePickerControlDisplayOptions,
      Type: 0,
      CommitMode: 0,
      ControlTitleFormatText: i_ControlTitleFormatText,
    },
    List: {
      FilterControlId: 0,
      Title: 0,
      SourceFilterId: 0,
      DisplayOptions: i_ListControlDisplayOptions,
      Type: 0,
      SelectableValues: i_FilterSelectableValues,
      CascadingControlConfiguration: i_CascadingControlConfiguration,
      ControlSortConfigurations: D.list(i_ControlSortConfiguration),
      ControlTitleFormatText: i_ControlTitleFormatText,
    },
    Dropdown: {
      FilterControlId: 0,
      Title: 0,
      SourceFilterId: 0,
      DisplayOptions: i_DropDownControlDisplayOptions,
      Type: 0,
      SelectableValues: i_FilterSelectableValues,
      CascadingControlConfiguration: i_CascadingControlConfiguration,
      CommitMode: 0,
      ControlSortConfigurations: D.list(i_ControlSortConfiguration),
      ControlTitleFormatText: i_ControlTitleFormatText,
    },
    TextField: {
      FilterControlId: 0,
      Title: 0,
      SourceFilterId: 0,
      DisplayOptions: i_TextFieldControlDisplayOptions,
      ControlTitleFormatText: i_ControlTitleFormatText,
    },
    TextArea: {
      FilterControlId: 0,
      Title: 0,
      SourceFilterId: 0,
      Delimiter: 0,
      DisplayOptions: i_TextAreaControlDisplayOptions,
      ControlTitleFormatText: i_ControlTitleFormatText,
    },
    Slider: {
      FilterControlId: 0,
      Title: 0,
      SourceFilterId: 0,
      DisplayOptions: i_SliderControlDisplayOptions,
      Type: 0,
      MaximumValue: 0,
      MinimumValue: 0,
      StepSize: 0,
      ControlTitleFormatText: i_ControlTitleFormatText,
    },
    RelativeDateTime: {
      FilterControlId: 0,
      Title: 0,
      SourceFilterId: 0,
      DisplayOptions: i_RelativeDateTimeControlDisplayOptions,
      CommitMode: 0,
      ControlTitleFormatText: i_ControlTitleFormatText,
    },
    CrossSheet: {
      FilterControlId: 0,
      SourceFilterId: 0,
      CascadingControlConfiguration: i_CascadingControlConfiguration,
    },
  }),
  Visuals: D.list(i_Visual),
  TextBoxes: D.list(i_SheetTextBox),
  Images: D.list(i_SheetImage),
  Layouts: D.list(i_Layout),
  SheetControlLayouts: D.list({
    Configuration: { GridLayout: i_GridLayoutConfiguration },
  }),
  ContentType: 0,
  CustomActionDefaults: i_VisualCustomActionDefaults,
});
const i_StatePersistenceConfigurations: D.LazyStruct = () => ({ Enabled: 0 });
const i_StaticFile: D.LazyStruct = () => ({
  ImageStaticFile: { StaticFileId: 0, Source: i_StaticFileSource },
  SpatialStaticFile: { StaticFileId: 0, Source: i_StaticFileSource },
});
const i_ThresholdAlertsConfigurations: D.LazyStruct = () => ({ Enabled: 0 });
const i_TooltipSheetDefinition: D.LazyStruct = () => ({
  SheetId: 0,
  Name: 0,
  Visuals: D.list(i_Visual),
  TextBoxes: D.list(i_SheetTextBox),
  Images: D.list(i_SheetImage),
  Layouts: D.list(i_Layout),
});
const i_TopicIRFilterOption: D.LazyStruct = () => ({
  FilterType: 0,
  FilterClass: 0,
  OperandField: i_Identifier,
  Function: 0,
  Constant: i_TopicConstantValue,
  Inverse: 0,
  NullFilter: 0,
  Aggregation: 0,
  AggregationFunctionParameters: 0,
  AggregationPartitionBy: D.list({ FieldName: 0, TimeGranularity: 0 }),
  Range: i_TopicConstantValue,
  Inclusive: 0,
  TimeGranularity: 0,
  LastNextOffset: i_TopicConstantValue,
  AggMetrics: D.list({
    MetricOperand: i_Identifier,
    Function: 0,
    SortDirection: 0,
  }),
  TopBottomLimit: i_TopicConstantValue,
  SortDirection: 0,
  Anchor: { AnchorType: 0, TimeGranularity: 0, Offset: 0 },
});
const i_TopicIdentifierDeclaration: D.LazyStruct = () => ({
  Identifier: 0,
  TopicArn: 0,
});
const i_TopicRangeFilterConstant: D.LazyStruct = () => ({
  ConstantType: 0,
  RangeConstant: { Minimum: 0, Maximum: 0 },
});
const i_TopicReference: D.LazyStruct = () => ({
  TopicPlaceholder: 0,
  TopicArn: 0,
});
const i_TopicSingularFilterConstant: D.LazyStruct = () => ({
  ConstantType: 0,
  SingularConstant: 0,
});
const i_TopicSortClause: D.LazyStruct = () => ({
  Operand: i_Identifier,
  SortDirection: 0,
});
const i_TopicV2DataSetRelationEndpoint: D.LazyStruct = () => ({
  DataSetArn: 0,
  ColumnNames: 0,
});
const i_TransformOperationSource: D.LazyStruct = () => ({
  TransformOperationId: 0,
  ColumnIdMappings: D.list(i_DataSetColumnIdMapping),
});
const i_UploadSettings: D.LazyStruct = () => ({
  Format: 0,
  StartFromRow: 0,
  ContainsHeader: 0,
  TextQualifier: 0,
  Delimiter: 0,
  CustomCellAddressRange: 0,
});
const i_VisualMenuOption: D.LazyStruct = () => ({ AvailabilityStatus: 0 });
const o_DataSetDateFilterValue: D.LazyStruct = () => ({ StaticValue: D.ts });
const o_FormatConfiguration: D.LazyStruct = () => ({
  StringFormatConfiguration: o_StringFormatConfiguration,
  NumberFormatConfiguration: o_NumberFormatConfiguration,
  DateTimeFormatConfiguration: o_DateTimeFormatConfiguration,
});
const o_Layout: D.LazyStruct = () => ({
  Configuration: {
    FreeFormLayout: { Elements: D.list(o_FreeFormLayoutElement) },
    SectionBasedLayout: {
      HeaderSections: D.list(o_HeaderFooterSectionConfiguration),
      BodySections: D.list({
        Content: { Layout: o_SectionLayoutConfiguration },
      }),
      FooterSections: D.list(o_HeaderFooterSectionConfiguration),
    },
  },
});
const o_RollingDateConfiguration: D.LazyStruct = () => ({
  Expression: D.secret,
});
const o_SheetImage: D.LazyStruct = () => ({
  Actions: D.list({
    ActionOperations: D.list({
      SetParametersOperation: o_CustomActionSetParametersOperation,
    }),
  }),
});
const o_TimeRangeFilterValue: D.LazyStruct = () => ({
  StaticValue: D.ts,
  RollingDate: o_RollingDateConfiguration,
});
const o_Visual: D.LazyStruct = () => ({
  TableVisual: {
    ChartConfiguration: {
      FieldWells: {
        TableAggregatedFieldWells: {
          GroupBy: D.list(o_DimensionField),
          Values: D.list(o_MeasureField),
        },
        TableUnaggregatedFieldWells: { Values: D.list(o_UnaggregatedField) },
      },
      TableInlineVisualizations: D.list({
        Sparklines: { XAxisField: o_DimensionField },
      }),
    },
    ConditionalFormatting: {
      ConditionalFormattingOptions: D.list({
        Cell: { TextFormat: o_TextConditionalFormat },
        Row: {
          BackgroundColor: o_ConditionalFormattingColor,
          TextColor: o_ConditionalFormattingColor,
        },
      }),
    },
    Actions: D.list(o_VisualCustomAction),
  },
  PivotTableVisual: {
    ChartConfiguration: {
      FieldWells: {
        PivotTableAggregatedFieldWells: {
          Rows: D.list(o_DimensionField),
          Columns: D.list(o_DimensionField),
          Values: D.list(o_MeasureField),
        },
      },
      SortConfiguration: {
        FieldSortOptions: D.list({
          SortBy: { DataPath: { SortPaths: D.list(o_DataPathValue) } },
        }),
      },
      FieldOptions: {
        DataPathOptions: D.list({ DataPathList: D.list(o_DataPathValue) }),
        CollapseStateOptions: D.list({
          Target: { FieldDataPathValues: D.list(o_DataPathValue) },
        }),
      },
    },
    ConditionalFormatting: {
      ConditionalFormattingOptions: D.list({
        Cell: { TextFormat: o_TextConditionalFormat },
      }),
    },
    Actions: D.list(o_VisualCustomAction),
  },
  BarChartVisual: {
    ChartConfiguration: {
      FieldWells: {
        BarChartAggregatedFieldWells: {
          Category: D.list(o_DimensionField),
          Values: D.list(o_MeasureField),
          Colors: D.list(o_DimensionField),
          SmallMultiples: D.list(o_DimensionField),
        },
      },
      VisualPalette: o_VisualPalette,
      Series: D.list({ DataFieldBarSeriesItem: { FieldValue: D.secret } }),
      DataLabels: o_DataLabelOptions,
      ReferenceLines: D.list(o_ReferenceLine),
    },
    Actions: D.list(o_VisualCustomAction),
    ColumnHierarchies: D.list(o_ColumnHierarchy),
  },
  KPIVisual: {
    ChartConfiguration: {
      FieldWells: {
        Values: D.list(o_MeasureField),
        TargetValues: D.list(o_MeasureField),
        TrendGroups: D.list(o_DimensionField),
      },
      KPIOptions: { Comparison: o_ComparisonConfiguration },
    },
    ConditionalFormatting: {
      ConditionalFormattingOptions: D.list({
        PrimaryValue: {
          TextColor: o_ConditionalFormattingColor,
          Icon: o_ConditionalFormattingIcon,
        },
        ProgressBar: { ForegroundColor: o_ConditionalFormattingColor },
        ActualValue: {
          TextColor: o_ConditionalFormattingColor,
          Icon: o_ConditionalFormattingIcon,
        },
        ComparisonValue: {
          TextColor: o_ConditionalFormattingColor,
          Icon: o_ConditionalFormattingIcon,
        },
      }),
    },
    Actions: D.list(o_VisualCustomAction),
    ColumnHierarchies: D.list(o_ColumnHierarchy),
  },
  PieChartVisual: {
    ChartConfiguration: {
      FieldWells: {
        PieChartAggregatedFieldWells: {
          Category: D.list(o_DimensionField),
          Values: D.list(o_MeasureField),
          SmallMultiples: D.list(o_DimensionField),
        },
      },
      DataLabels: o_DataLabelOptions,
      VisualPalette: o_VisualPalette,
    },
    Actions: D.list(o_VisualCustomAction),
    ColumnHierarchies: D.list(o_ColumnHierarchy),
  },
  GaugeChartVisual: {
    ChartConfiguration: {
      FieldWells: {
        Values: D.list(o_MeasureField),
        TargetValues: D.list(o_MeasureField),
      },
      GaugeChartOptions: { Comparison: o_ComparisonConfiguration },
      DataLabels: o_DataLabelOptions,
      VisualPalette: o_VisualPalette,
    },
    ConditionalFormatting: {
      ConditionalFormattingOptions: D.list({
        PrimaryValue: {
          TextColor: o_ConditionalFormattingColor,
          Icon: o_ConditionalFormattingIcon,
        },
        Arc: { ForegroundColor: o_ConditionalFormattingColor },
      }),
    },
    Actions: D.list(o_VisualCustomAction),
  },
  LineChartVisual: {
    ChartConfiguration: {
      FieldWells: {
        LineChartAggregatedFieldWells: {
          Category: D.list(o_DimensionField),
          Values: D.list(o_MeasureField),
          Colors: D.list(o_DimensionField),
          SmallMultiples: D.list(o_DimensionField),
        },
      },
      ForecastConfigurations: D.list({
        Scenario: {
          WhatIfPointScenario: { Date: D.ts },
          WhatIfRangeScenario: { StartDate: D.ts, EndDate: D.ts },
        },
      }),
      Series: D.list({ DataFieldSeriesItem: { FieldValue: D.secret } }),
      DataLabels: o_DataLabelOptions,
      ReferenceLines: D.list(o_ReferenceLine),
      VisualPalette: o_VisualPalette,
    },
    Actions: D.list(o_VisualCustomAction),
    ColumnHierarchies: D.list(o_ColumnHierarchy),
  },
  HeatMapVisual: {
    ChartConfiguration: {
      FieldWells: {
        HeatMapAggregatedFieldWells: {
          Rows: D.list(o_DimensionField),
          Columns: D.list(o_DimensionField),
          Values: D.list(o_MeasureField),
        },
      },
      DataLabels: o_DataLabelOptions,
    },
    ColumnHierarchies: D.list(o_ColumnHierarchy),
    Actions: D.list(o_VisualCustomAction),
  },
  TreeMapVisual: {
    ChartConfiguration: {
      FieldWells: {
        TreeMapAggregatedFieldWells: {
          Groups: D.list(o_DimensionField),
          Sizes: D.list(o_MeasureField),
          Colors: D.list(o_MeasureField),
        },
      },
      DataLabels: o_DataLabelOptions,
    },
    Actions: D.list(o_VisualCustomAction),
    ColumnHierarchies: D.list(o_ColumnHierarchy),
  },
  GeospatialMapVisual: {
    ChartConfiguration: {
      FieldWells: {
        GeospatialMapAggregatedFieldWells: {
          Geospatial: D.list(o_DimensionField),
          Values: D.list(o_MeasureField),
          Colors: D.list(o_DimensionField),
        },
      },
      VisualPalette: o_VisualPalette,
    },
    ColumnHierarchies: D.list(o_ColumnHierarchy),
    Actions: D.list(o_VisualCustomAction),
  },
  FilledMapVisual: {
    ChartConfiguration: {
      FieldWells: {
        FilledMapAggregatedFieldWells: {
          Geospatial: D.list(o_DimensionField),
          Values: D.list(o_MeasureField),
        },
      },
    },
    ConditionalFormatting: {
      ConditionalFormattingOptions: D.list({
        Shape: { Format: { BackgroundColor: o_ConditionalFormattingColor } },
      }),
    },
    ColumnHierarchies: D.list(o_ColumnHierarchy),
    Actions: D.list(o_VisualCustomAction),
  },
  LayerMapVisual: {
    ChartConfiguration: {
      MapLayers: D.list({
        JoinDefinition: {
          DatasetKeyField: o_UnaggregatedField,
          ColorField: {
            ColorDimensionsFields: D.list(o_DimensionField),
            ColorValuesFields: D.list(o_MeasureField),
          },
        },
        Actions: D.list({
          ActionOperations: D.list({
            SetParametersOperation: o_CustomActionSetParametersOperation,
          }),
        }),
      }),
    },
  },
  FunnelChartVisual: {
    ChartConfiguration: {
      FieldWells: {
        FunnelChartAggregatedFieldWells: {
          Category: D.list(o_DimensionField),
          Values: D.list(o_MeasureField),
        },
      },
      VisualPalette: o_VisualPalette,
    },
    Actions: D.list(o_VisualCustomAction),
    ColumnHierarchies: D.list(o_ColumnHierarchy),
  },
  ScatterPlotVisual: {
    ChartConfiguration: {
      FieldWells: {
        ScatterPlotCategoricallyAggregatedFieldWells: {
          XAxis: D.list(o_MeasureField),
          YAxis: D.list(o_MeasureField),
          Category: D.list(o_DimensionField),
          Size: D.list(o_MeasureField),
          Label: D.list(o_DimensionField),
        },
        ScatterPlotUnaggregatedFieldWells: {
          XAxis: D.list(o_DimensionField),
          YAxis: D.list(o_DimensionField),
          Size: D.list(o_MeasureField),
          Category: D.list(o_DimensionField),
          Label: D.list(o_DimensionField),
        },
      },
      DataLabels: o_DataLabelOptions,
      VisualPalette: o_VisualPalette,
    },
    Actions: D.list(o_VisualCustomAction),
    ColumnHierarchies: D.list(o_ColumnHierarchy),
  },
  ComboChartVisual: {
    ChartConfiguration: {
      FieldWells: {
        ComboChartAggregatedFieldWells: {
          Category: D.list(o_DimensionField),
          BarValues: D.list(o_MeasureField),
          Colors: D.list(o_DimensionField),
          LineValues: D.list(o_MeasureField),
        },
      },
      Series: D.list({ DataFieldComboSeriesItem: { FieldValue: D.secret } }),
      BarDataLabels: o_DataLabelOptions,
      LineDataLabels: o_DataLabelOptions,
      ReferenceLines: D.list(o_ReferenceLine),
      VisualPalette: o_VisualPalette,
    },
    Actions: D.list(o_VisualCustomAction),
    ColumnHierarchies: D.list(o_ColumnHierarchy),
  },
  BoxPlotVisual: {
    ChartConfiguration: {
      FieldWells: {
        BoxPlotAggregatedFieldWells: {
          GroupBy: D.list(o_DimensionField),
          Values: D.list(o_MeasureField),
        },
      },
      ReferenceLines: D.list(o_ReferenceLine),
      VisualPalette: o_VisualPalette,
    },
    Actions: D.list(o_VisualCustomAction),
    ColumnHierarchies: D.list(o_ColumnHierarchy),
  },
  WaterfallVisual: {
    ChartConfiguration: {
      FieldWells: {
        WaterfallChartAggregatedFieldWells: {
          Categories: D.list(o_DimensionField),
          Values: D.list(o_MeasureField),
          Breakdowns: D.list(o_DimensionField),
        },
      },
      DataLabels: o_DataLabelOptions,
      VisualPalette: o_VisualPalette,
    },
    Actions: D.list(o_VisualCustomAction),
    ColumnHierarchies: D.list(o_ColumnHierarchy),
  },
  HistogramVisual: {
    ChartConfiguration: {
      FieldWells: {
        HistogramAggregatedFieldWells: { Values: D.list(o_MeasureField) },
      },
      DataLabels: o_DataLabelOptions,
      VisualPalette: o_VisualPalette,
    },
    Actions: D.list(o_VisualCustomAction),
  },
  WordCloudVisual: {
    ChartConfiguration: {
      FieldWells: {
        WordCloudAggregatedFieldWells: {
          GroupBy: D.list(o_DimensionField),
          Size: D.list(o_MeasureField),
        },
      },
    },
    Actions: D.list(o_VisualCustomAction),
    ColumnHierarchies: D.list(o_ColumnHierarchy),
  },
  InsightVisual: {
    InsightConfiguration: {
      Computations: D.list({
        TopBottomRanked: { Category: o_DimensionField, Value: o_MeasureField },
        TopBottomMovers: {
          Time: o_DimensionField,
          Category: o_DimensionField,
          Value: o_MeasureField,
        },
        TotalAggregation: { Value: o_MeasureField },
        MaximumMinimum: { Time: o_DimensionField, Value: o_MeasureField },
        MetricComparison: {
          Time: o_DimensionField,
          FromValue: o_MeasureField,
          TargetValue: o_MeasureField,
        },
        PeriodOverPeriod: { Time: o_DimensionField, Value: o_MeasureField },
        PeriodToDate: { Time: o_DimensionField, Value: o_MeasureField },
        GrowthRate: { Time: o_DimensionField, Value: o_MeasureField },
        UniqueValues: { Category: o_DimensionField },
        Forecast: { Time: o_DimensionField, Value: o_MeasureField },
      }),
    },
    Actions: D.list(o_VisualCustomAction),
  },
  SankeyDiagramVisual: {
    ChartConfiguration: {
      FieldWells: {
        SankeyDiagramAggregatedFieldWells: {
          Source: D.list(o_DimensionField),
          Destination: D.list(o_DimensionField),
          Weight: D.list(o_MeasureField),
        },
      },
      DataLabels: o_DataLabelOptions,
    },
    Actions: D.list(o_VisualCustomAction),
  },
  CustomContentVisual: { Actions: D.list(o_VisualCustomAction) },
  EmptyVisual: { Actions: D.list(o_VisualCustomAction) },
  RadarChartVisual: {
    ChartConfiguration: {
      FieldWells: {
        RadarChartAggregatedFieldWells: {
          Category: D.list(o_DimensionField),
          Color: D.list(o_DimensionField),
          Values: D.list(o_MeasureField),
        },
      },
      VisualPalette: o_VisualPalette,
    },
    Actions: D.list(o_VisualCustomAction),
    ColumnHierarchies: D.list(o_ColumnHierarchy),
  },
  PluginVisual: {
    ChartConfiguration: {
      FieldWells: D.list({
        Dimensions: D.list(o_DimensionField),
        Measures: D.list(o_MeasureField),
        Unaggregated: D.list(o_UnaggregatedField),
      }),
    },
    Actions: D.list(o_VisualCustomAction),
  },
});
const i_AggregationFunction: D.LazyStruct = () => ({
  NumericalAggregationFunction: i_NumericalAggregationFunction,
  CategoricalAggregationFunction: 0,
  DateAggregationFunction: 0,
  AttributeAggregationFunction: {
    SimpleAttributeAggregation: 0,
    ValueForMultipleValues: 0,
  },
});
const i_AggregationSortConfiguration: D.LazyStruct = () => ({
  Column: i_ColumnIdentifier,
  SortDirection: 0,
  AggregationFunction: i_AggregationFunction,
});
const i_CascadingControlConfiguration: D.LazyStruct = () => ({
  SourceControls: D.list({
    SourceSheetControlId: 0,
    ColumnToMatch: i_ColumnIdentifier,
  }),
});
const i_CategoryFilterConfiguration: D.LazyStruct = () => ({
  FilterListConfiguration: {
    MatchOperator: 0,
    CategoryValues: 0,
    SelectAllOptions: 0,
    NullOption: 0,
  },
  CustomFilterListConfiguration: {
    MatchOperator: 0,
    CategoryValues: 0,
    SelectAllOptions: 0,
    NullOption: 0,
  },
  CustomFilterConfiguration: {
    MatchOperator: 0,
    CategoryValue: 0,
    SelectAllOptions: 0,
    ParameterName: 0,
    NullOption: 0,
  },
});
const i_ColumnIdentifier: D.LazyStruct = () => ({
  DataSetIdentifier: 0,
  TopicIdentifier: 0,
  ColumnName: 0,
});
const i_ControlSortConfiguration: D.LazyStruct = () => ({
  SelectableValuesSort: { Direction: 0 },
  ControlColumnSort: i_AggregationSortConfiguration,
});
const i_ControlTitleFormatText: D.LazyStruct = () => ({
  PlainText: 0,
  RichText: 0,
});
const i_DataSetDateFilterValue: D.LazyStruct = () => ({ StaticValue: 0 });
const i_DataSetNumericFilterValue: D.LazyStruct = () => ({ StaticValue: 0 });
const i_DateTimePickerControlDisplayOptions: D.LazyStruct = () => ({
  TitleOptions: i_LabelOptions,
  DateTimeFormat: 0,
  InfoIconLabelOptions: i_SheetControlInfoIconLabelOptions,
  HelperTextVisibility: 0,
  DateIconVisibility: 0,
});
const i_DecalSettings: D.LazyStruct = () => ({
  ElementValue: 0,
  DecalVisibility: 0,
  DecalColor: 0,
  DecalPatternType: 0,
  DecalStyleType: 0,
});
const i_DefaultFilterControlConfiguration: D.LazyStruct = () => ({
  Title: 0,
  ControlOptions: {
    DefaultDateTimePickerOptions: {
      Type: 0,
      DisplayOptions: i_DateTimePickerControlDisplayOptions,
      CommitMode: 0,
    },
    DefaultListOptions: {
      DisplayOptions: i_ListControlDisplayOptions,
      Type: 0,
      SelectableValues: i_FilterSelectableValues,
      ControlSortConfigurations: D.list(i_ControlSortConfiguration),
    },
    DefaultDropdownOptions: {
      DisplayOptions: i_DropDownControlDisplayOptions,
      Type: 0,
      SelectableValues: i_FilterSelectableValues,
      CommitMode: 0,
      ControlSortConfigurations: D.list(i_ControlSortConfiguration),
    },
    DefaultTextFieldOptions: {
      DisplayOptions: i_TextFieldControlDisplayOptions,
    },
    DefaultTextAreaOptions: {
      Delimiter: 0,
      DisplayOptions: i_TextAreaControlDisplayOptions,
    },
    DefaultSliderOptions: {
      DisplayOptions: i_SliderControlDisplayOptions,
      Type: 0,
      MaximumValue: 0,
      MinimumValue: 0,
      StepSize: 0,
    },
    DefaultRelativeDateTimeOptions: {
      DisplayOptions: i_RelativeDateTimeControlDisplayOptions,
      CommitMode: 0,
    },
  },
  ControlTitleFormatText: i_ControlTitleFormatText,
});
const i_DropDownControlDisplayOptions: D.LazyStruct = () => ({
  SelectAllOptions: i_ListControlSelectAllOptions,
  TitleOptions: i_LabelOptions,
  InfoIconLabelOptions: i_SheetControlInfoIconLabelOptions,
});
const i_DynamicDefaultValue: D.LazyStruct = () => ({
  UserNameColumn: i_ColumnIdentifier,
  GroupNameColumn: i_ColumnIdentifier,
  DefaultValueColumn: i_ColumnIdentifier,
});
const i_ExcludePeriodConfiguration: D.LazyStruct = () => ({
  Amount: 0,
  Granularity: 0,
  Status: 0,
});
const i_FilterSelectableValues: D.LazyStruct = () => ({ Values: 0 });
const i_FormatConfiguration: D.LazyStruct = () => ({
  StringFormatConfiguration: i_StringFormatConfiguration,
  NumberFormatConfiguration: i_NumberFormatConfiguration,
  DateTimeFormatConfiguration: i_DateTimeFormatConfiguration,
});
const i_FreeFormLayoutCanvasSizeOptions: D.LazyStruct = () => ({
  ScreenCanvasSizeOptions: { OptimizedViewPortWidth: 0 },
});
const i_GridLayoutCanvasSizeOptions: D.LazyStruct = () => ({
  ScreenCanvasSizeOptions: { ResizeOption: 0, OptimizedViewPortWidth: 0 },
});
const i_GridLayoutConfiguration: D.LazyStruct = () => ({
  Elements: D.list({
    ElementId: 0,
    ElementType: 0,
    ColumnIndex: 0,
    ColumnSpan: 0,
    RowIndex: 0,
    RowSpan: 0,
    BorderStyle: i_GridLayoutElementBorderStyle,
    SelectedBorderStyle: i_GridLayoutElementBorderStyle,
    BackgroundStyle: { Visibility: 0, Color: 0 },
    LoadingAnimation: i_LoadingAnimation,
    BorderRadius: 0,
    Padding: 0,
  }),
  CanvasSizeOptions: i_GridLayoutCanvasSizeOptions,
});
const i_Layout: D.LazyStruct = () => ({
  Configuration: {
    GridLayout: i_GridLayoutConfiguration,
    FreeFormLayout: {
      Elements: D.list(i_FreeFormLayoutElement),
      CanvasSizeOptions: i_FreeFormLayoutCanvasSizeOptions,
      Groups: D.list({ Id: 0, Members: D.list({ Id: 0, Type: 0 }) }),
    },
    SectionBasedLayout: {
      HeaderSections: D.list(i_HeaderFooterSectionConfiguration),
      BodySections: D.list({
        SectionId: 0,
        Content: { Layout: i_SectionLayoutConfiguration },
        Style: i_SectionStyle,
        PageBreakConfiguration: { After: i_SectionAfterPageBreak },
        RepeatConfiguration: {
          DimensionConfigurations: D.list({
            DynamicCategoryDimensionConfiguration: {
              Column: i_ColumnIdentifier,
              Limit: 0,
              SortByMetrics: D.list(i_ColumnSort),
            },
            DynamicNumericDimensionConfiguration: {
              Column: i_ColumnIdentifier,
              Limit: 0,
              SortByMetrics: D.list(i_ColumnSort),
            },
          }),
          PageBreakConfiguration: { After: i_SectionAfterPageBreak },
          NonRepeatingVisuals: 0,
        },
      }),
      FooterSections: D.list(i_HeaderFooterSectionConfiguration),
      CanvasSizeOptions: i_SectionBasedLayoutCanvasSizeOptions,
    },
  },
});
const i_ListControlDisplayOptions: D.LazyStruct = () => ({
  SearchOptions: { Visibility: 0 },
  SelectAllOptions: i_ListControlSelectAllOptions,
  TitleOptions: i_LabelOptions,
  InfoIconLabelOptions: i_SheetControlInfoIconLabelOptions,
});
const i_MappedDataSetParameter: D.LazyStruct = () => ({
  DataSetIdentifier: 0,
  DataSetParameterName: 0,
});
const i_NumericRangeFilterValue: D.LazyStruct = () => ({
  StaticValue: 0,
  Parameter: 0,
});
const i_ParameterSelectableValues: D.LazyStruct = () => ({
  Values: 0,
  LinkToDataSetColumn: i_ColumnIdentifier,
});
const i_RelativeDateTimeControlDisplayOptions: D.LazyStruct = () => ({
  TitleOptions: i_LabelOptions,
  DateTimeFormat: 0,
  InfoIconLabelOptions: i_SheetControlInfoIconLabelOptions,
});
const i_RollingDateConfiguration: D.LazyStruct = () => ({
  DataSetIdentifier: 0,
  Expression: 0,
});
const i_SectionBasedLayoutCanvasSizeOptions: D.LazyStruct = () => ({
  PaperCanvasSizeOptions: {
    PaperSize: 0,
    PaperOrientation: 0,
    PaperMargin: i_Spacing,
  },
});
const i_SheetImage: D.LazyStruct = () => ({
  SheetImageId: 0,
  Source: { SheetImageStaticFileSource: { StaticFileId: 0 } },
  Scaling: { ScalingType: 0 },
  Tooltip: { TooltipText: { PlainText: 0 }, Visibility: 0 },
  ImageContentAltText: 0,
  Interactions: { ImageMenuOption: { AvailabilityStatus: 0 } },
  Actions: D.list({
    CustomActionId: 0,
    Name: 0,
    Status: 0,
    Trigger: 0,
    ActionOperations: D.list({
      NavigationOperation: i_CustomActionNavigationOperation,
      URLOperation: i_CustomActionURLOperation,
      SetParametersOperation: i_CustomActionSetParametersOperation,
    }),
  }),
});
const i_SheetTextBox: D.LazyStruct = () => ({
  SheetTextBoxId: 0,
  Content: 0,
  Interactions: { TextBoxMenuOption: { AvailabilityStatus: 0 } },
});
const i_SliderControlDisplayOptions: D.LazyStruct = () => ({
  TitleOptions: i_LabelOptions,
  InfoIconLabelOptions: i_SheetControlInfoIconLabelOptions,
});
const i_StaticFileSource: D.LazyStruct = () => ({
  UrlOptions: { Url: 0 },
  S3Options: { BucketName: 0, ObjectKey: 0, Region: 0 },
});
const i_TextAreaControlDisplayOptions: D.LazyStruct = () => ({
  TitleOptions: i_LabelOptions,
  PlaceholderOptions: i_TextControlPlaceholderOptions,
  InfoIconLabelOptions: i_SheetControlInfoIconLabelOptions,
});
const i_TextFieldControlDisplayOptions: D.LazyStruct = () => ({
  TitleOptions: i_LabelOptions,
  PlaceholderOptions: i_TextControlPlaceholderOptions,
  InfoIconLabelOptions: i_SheetControlInfoIconLabelOptions,
});
const i_TimeRangeFilterValue: D.LazyStruct = () => ({
  StaticValue: 0,
  RollingDate: i_RollingDateConfiguration,
  Parameter: 0,
});
const i_TopicConstantValue: D.LazyStruct = () => ({
  ConstantType: 0,
  Value: 0,
  Minimum: 0,
  Maximum: 0,
  ValueList: D.list({ ConstantType: 0, Value: 0 }),
});
const i_Visual: D.LazyStruct = () => ({
  TableVisual: {
    VisualId: 0,
    Title: i_VisualTitleLabelOptions,
    Subtitle: i_VisualSubtitleLabelOptions,
    ChartConfiguration: {
      FieldWells: {
        TableAggregatedFieldWells: {
          GroupBy: D.list(i_DimensionField),
          Values: D.list(i_MeasureField),
        },
        TableUnaggregatedFieldWells: { Values: D.list(i_UnaggregatedField) },
      },
      SortConfiguration: {
        RowSort: D.list(i_FieldSortOptions),
        PaginationConfiguration: i_PaginationConfiguration,
      },
      TableOptions: {
        Orientation: 0,
        HeaderStyle: i_TableCellStyle,
        CellStyle: i_TableCellStyle,
        RowAlternateColorOptions: i_RowAlternateColorOptions,
      },
      TotalOptions: {
        TotalsVisibility: 0,
        Placement: 0,
        ScrollStatus: 0,
        CustomLabel: 0,
        TotalCellStyle: i_TableCellStyle,
        TotalAggregationOptions: D.list(i_TotalAggregationOption),
      },
      FieldOptions: {
        SelectedFieldOptions: D.list({
          FieldId: 0,
          Width: 0,
          CustomLabel: 0,
          Visibility: 0,
          URLStyling: {
            LinkConfiguration: {
              Target: 0,
              Content: {
                CustomTextContent: {
                  Value: 0,
                  FontConfiguration: i_FontConfiguration,
                },
                CustomIconContent: { Icon: 0 },
              },
            },
            ImageConfiguration: {
              SizingOptions: { TableCellImageScalingConfiguration: 0 },
            },
          },
        }),
        Order: 0,
        PinnedFieldOptions: { PinnedLeftFields: 0 },
        TransposedTableOptions: D.list({
          ColumnIndex: 0,
          ColumnWidth: 0,
          ColumnType: 0,
        }),
      },
      PaginatedReportOptions: {
        VerticalOverflowVisibility: 0,
        OverflowColumnHeaderVisibility: 0,
      },
      TableInlineVisualizations: D.list({
        DataBars: { FieldId: 0, PositiveColor: 0, NegativeColor: 0 },
        Sparklines: {
          FieldId: 0,
          XAxisField: i_DimensionField,
          YAxisBehavior: 0,
          VisualType: 0,
          LineColor: 0,
          LineInterpolation: 0,
          AllPointsMarker: i_LineChartMarkerStyleSettings,
          MaxValueMarker: i_LineChartMarkerStyleSettings,
          MinValueMarker: i_LineChartMarkerStyleSettings,
        },
      }),
      Tooltip: i_TooltipOptions,
      DashboardCustomizationVisualOptions:
        i_DashboardCustomizationVisualOptions,
      Interactions: i_VisualInteractionOptions,
    },
    ConditionalFormatting: {
      ConditionalFormattingOptions: D.list({
        Cell: { FieldId: 0, TextFormat: i_TextConditionalFormat },
        Row: {
          BackgroundColor: i_ConditionalFormattingColor,
          TextColor: i_ConditionalFormattingColor,
        },
      }),
    },
    Actions: D.list(i_VisualCustomAction),
    VisualContentAltText: 0,
  },
  PivotTableVisual: {
    VisualId: 0,
    Title: i_VisualTitleLabelOptions,
    Subtitle: i_VisualSubtitleLabelOptions,
    ChartConfiguration: {
      FieldWells: {
        PivotTableAggregatedFieldWells: {
          Rows: D.list(i_DimensionField),
          Columns: D.list(i_DimensionField),
          Values: D.list(i_MeasureField),
        },
      },
      SortConfiguration: {
        FieldSortOptions: D.list({
          FieldId: 0,
          SortBy: {
            Field: i_FieldSort,
            Column: i_ColumnSort,
            DataPath: { Direction: 0, SortPaths: D.list(i_DataPathValue) },
          },
        }),
      },
      TableOptions: {
        MetricPlacement: 0,
        SingleMetricVisibility: 0,
        ColumnNamesVisibility: 0,
        ToggleButtonsVisibility: 0,
        ColumnHeaderStyle: i_TableCellStyle,
        RowHeaderStyle: i_TableCellStyle,
        CellStyle: i_TableCellStyle,
        RowFieldNamesStyle: i_TableCellStyle,
        RowAlternateColorOptions: i_RowAlternateColorOptions,
        CollapsedRowDimensionsVisibility: 0,
        RowsLayout: 0,
        RowsLabelOptions: { Visibility: 0, CustomLabel: 0 },
        DefaultCellWidth: 0,
      },
      TotalOptions: {
        RowSubtotalOptions: i_SubtotalOptions,
        ColumnSubtotalOptions: i_SubtotalOptions,
        RowTotalOptions: i_PivotTotalOptions,
        ColumnTotalOptions: i_PivotTotalOptions,
      },
      FieldOptions: {
        SelectedFieldOptions: D.list({
          FieldId: 0,
          CustomLabel: 0,
          Visibility: 0,
        }),
        DataPathOptions: D.list({
          DataPathList: D.list(i_DataPathValue),
          Width: 0,
        }),
        CollapseStateOptions: D.list({
          Target: { FieldId: 0, FieldDataPathValues: D.list(i_DataPathValue) },
          State: 0,
        }),
      },
      PaginatedReportOptions: {
        VerticalOverflowVisibility: 0,
        OverflowColumnHeaderVisibility: 0,
      },
      Tooltip: i_TooltipOptions,
      DashboardCustomizationVisualOptions:
        i_DashboardCustomizationVisualOptions,
      Interactions: i_VisualInteractionOptions,
    },
    ConditionalFormatting: {
      ConditionalFormattingOptions: D.list({
        Cell: {
          FieldId: 0,
          TextFormat: i_TextConditionalFormat,
          Scope: i_PivotTableConditionalFormattingScope,
          Scopes: D.list(i_PivotTableConditionalFormattingScope),
        },
      }),
    },
    Actions: D.list(i_VisualCustomAction),
    VisualContentAltText: 0,
  },
  BarChartVisual: {
    VisualId: 0,
    Title: i_VisualTitleLabelOptions,
    Subtitle: i_VisualSubtitleLabelOptions,
    ChartConfiguration: {
      FieldWells: {
        BarChartAggregatedFieldWells: {
          Category: D.list(i_DimensionField),
          Values: D.list(i_MeasureField),
          Colors: D.list(i_DimensionField),
          SmallMultiples: D.list(i_DimensionField),
        },
      },
      SortConfiguration: {
        CategorySort: D.list(i_FieldSortOptions),
        CategoryItemsLimit: i_ItemsLimitConfiguration,
        ColorSort: D.list(i_FieldSortOptions),
        ColorItemsLimit: i_ItemsLimitConfiguration,
        SmallMultiplesSort: D.list(i_FieldSortOptions),
        SmallMultiplesLimitConfiguration: i_ItemsLimitConfiguration,
      },
      Orientation: 0,
      BarsArrangement: 0,
      VisualPalette: i_VisualPalette,
      SmallMultiplesOptions: i_SmallMultiplesOptions,
      CategoryAxis: i_AxisDisplayOptions,
      CategoryLabelOptions: i_ChartAxisLabelOptions,
      ValueAxis: i_AxisDisplayOptions,
      ValueLabelOptions: i_ChartAxisLabelOptions,
      ColorLabelOptions: i_ChartAxisLabelOptions,
      DefaultSeriesSettings: {
        DecalSettings: i_DecalSettings,
        BorderSettings: i_BorderSettings,
      },
      Series: D.list({
        FieldBarSeriesItem: { FieldId: 0, Settings: i_BarChartSeriesSettings },
        DataFieldBarSeriesItem: {
          FieldId: 0,
          FieldValue: 0,
          Settings: i_BarChartSeriesSettings,
        },
      }),
      Legend: i_LegendOptions,
      DataLabels: i_DataLabelOptions,
      Tooltip: i_TooltipOptions,
      ReferenceLines: D.list(i_ReferenceLine),
      ContributionAnalysisDefaults: D.list(i_ContributionAnalysisDefault),
      Interactions: i_VisualInteractionOptions,
    },
    Actions: D.list(i_VisualCustomAction),
    ColumnHierarchies: D.list(i_ColumnHierarchy),
    VisualContentAltText: 0,
  },
  KPIVisual: {
    VisualId: 0,
    Title: i_VisualTitleLabelOptions,
    Subtitle: i_VisualSubtitleLabelOptions,
    ChartConfiguration: {
      FieldWells: {
        Values: D.list(i_MeasureField),
        TargetValues: D.list(i_MeasureField),
        TrendGroups: D.list(i_DimensionField),
      },
      SortConfiguration: { TrendGroupSort: D.list(i_FieldSortOptions) },
      KPIOptions: {
        ProgressBar: { Visibility: 0 },
        TrendArrows: { Visibility: 0 },
        SecondaryValue: { Visibility: 0 },
        Comparison: i_ComparisonConfiguration,
        PrimaryValueDisplayType: 0,
        PrimaryValueFontConfiguration: i_FontConfiguration,
        SecondaryValueFontConfiguration: i_FontConfiguration,
        Sparkline: { Visibility: 0, Type: 0, Color: 0, TooltipVisibility: 0 },
        VisualLayoutOptions: { StandardLayout: { Type: 0 } },
      },
      Interactions: i_VisualInteractionOptions,
    },
    ConditionalFormatting: {
      ConditionalFormattingOptions: D.list({
        PrimaryValue: {
          TextColor: i_ConditionalFormattingColor,
          Icon: i_ConditionalFormattingIcon,
        },
        ProgressBar: { ForegroundColor: i_ConditionalFormattingColor },
        ActualValue: {
          TextColor: i_ConditionalFormattingColor,
          Icon: i_ConditionalFormattingIcon,
        },
        ComparisonValue: {
          TextColor: i_ConditionalFormattingColor,
          Icon: i_ConditionalFormattingIcon,
        },
      }),
    },
    Actions: D.list(i_VisualCustomAction),
    ColumnHierarchies: D.list(i_ColumnHierarchy),
    VisualContentAltText: 0,
  },
  PieChartVisual: {
    VisualId: 0,
    Title: i_VisualTitleLabelOptions,
    Subtitle: i_VisualSubtitleLabelOptions,
    ChartConfiguration: {
      FieldWells: {
        PieChartAggregatedFieldWells: {
          Category: D.list(i_DimensionField),
          Values: D.list(i_MeasureField),
          SmallMultiples: D.list(i_DimensionField),
        },
      },
      SortConfiguration: {
        CategorySort: D.list(i_FieldSortOptions),
        CategoryItemsLimit: i_ItemsLimitConfiguration,
        SmallMultiplesSort: D.list(i_FieldSortOptions),
        SmallMultiplesLimitConfiguration: i_ItemsLimitConfiguration,
      },
      DonutOptions: {
        ArcOptions: { ArcThickness: 0 },
        DonutCenterOptions: { LabelVisibility: 0 },
      },
      SmallMultiplesOptions: i_SmallMultiplesOptions,
      CategoryLabelOptions: i_ChartAxisLabelOptions,
      ValueLabelOptions: i_ChartAxisLabelOptions,
      Legend: i_LegendOptions,
      DataLabels: i_DataLabelOptions,
      Tooltip: i_TooltipOptions,
      VisualPalette: i_VisualPalette,
      ContributionAnalysisDefaults: D.list(i_ContributionAnalysisDefault),
      Interactions: i_VisualInteractionOptions,
    },
    Actions: D.list(i_VisualCustomAction),
    ColumnHierarchies: D.list(i_ColumnHierarchy),
    VisualContentAltText: 0,
  },
  GaugeChartVisual: {
    VisualId: 0,
    Title: i_VisualTitleLabelOptions,
    Subtitle: i_VisualSubtitleLabelOptions,
    ChartConfiguration: {
      FieldWells: {
        Values: D.list(i_MeasureField),
        TargetValues: D.list(i_MeasureField),
      },
      GaugeChartOptions: {
        PrimaryValueDisplayType: 0,
        Comparison: i_ComparisonConfiguration,
        ArcAxis: { Range: { Min: 0, Max: 0 }, ReserveRange: 0 },
        Arc: { ArcAngle: 0, ArcThickness: 0 },
        PrimaryValueFontConfiguration: i_FontConfiguration,
      },
      DataLabels: i_DataLabelOptions,
      TooltipOptions: i_TooltipOptions,
      VisualPalette: i_VisualPalette,
      ColorConfiguration: { ForegroundColor: 0, BackgroundColor: 0 },
      Interactions: i_VisualInteractionOptions,
    },
    ConditionalFormatting: {
      ConditionalFormattingOptions: D.list({
        PrimaryValue: {
          TextColor: i_ConditionalFormattingColor,
          Icon: i_ConditionalFormattingIcon,
        },
        Arc: { ForegroundColor: i_ConditionalFormattingColor },
      }),
    },
    Actions: D.list(i_VisualCustomAction),
    VisualContentAltText: 0,
  },
  LineChartVisual: {
    VisualId: 0,
    Title: i_VisualTitleLabelOptions,
    Subtitle: i_VisualSubtitleLabelOptions,
    ChartConfiguration: {
      FieldWells: {
        LineChartAggregatedFieldWells: {
          Category: D.list(i_DimensionField),
          Values: D.list(i_MeasureField),
          Colors: D.list(i_DimensionField),
          SmallMultiples: D.list(i_DimensionField),
        },
      },
      SortConfiguration: {
        CategorySort: D.list(i_FieldSortOptions),
        CategoryItemsLimitConfiguration: i_ItemsLimitConfiguration,
        ColorItemsLimitConfiguration: i_ItemsLimitConfiguration,
        SmallMultiplesSort: D.list(i_FieldSortOptions),
        SmallMultiplesLimitConfiguration: i_ItemsLimitConfiguration,
      },
      ForecastConfigurations: D.list({
        ForecastProperties: {
          PeriodsForward: 0,
          PeriodsBackward: 0,
          UpperBoundary: 0,
          LowerBoundary: 0,
          PredictionInterval: 0,
          Seasonality: 0,
        },
        Scenario: {
          WhatIfPointScenario: { Date: 0, Value: 0 },
          WhatIfRangeScenario: { StartDate: 0, EndDate: 0, Value: 0 },
        },
      }),
      Type: 0,
      SmallMultiplesOptions: i_SmallMultiplesOptions,
      XAxisDisplayOptions: i_AxisDisplayOptions,
      XAxisLabelOptions: i_ChartAxisLabelOptions,
      PrimaryYAxisDisplayOptions: i_LineSeriesAxisDisplayOptions,
      PrimaryYAxisLabelOptions: i_ChartAxisLabelOptions,
      SecondaryYAxisDisplayOptions: i_LineSeriesAxisDisplayOptions,
      SecondaryYAxisLabelOptions: i_ChartAxisLabelOptions,
      SingleAxisOptions: i_SingleAxisOptions,
      DefaultSeriesSettings: {
        AxisBinding: 0,
        LineStyleSettings: i_LineChartLineStyleSettings,
        MarkerStyleSettings: i_LineChartMarkerStyleSettings,
        DecalSettings: i_DecalSettings,
      },
      Series: D.list({
        FieldSeriesItem: {
          FieldId: 0,
          AxisBinding: 0,
          Settings: i_LineChartSeriesSettings,
        },
        DataFieldSeriesItem: {
          FieldId: 0,
          FieldValue: 0,
          AxisBinding: 0,
          Settings: i_LineChartSeriesSettings,
        },
      }),
      Legend: i_LegendOptions,
      DataLabels: i_DataLabelOptions,
      ReferenceLines: D.list(i_ReferenceLine),
      Tooltip: i_TooltipOptions,
      ContributionAnalysisDefaults: D.list(i_ContributionAnalysisDefault),
      VisualPalette: i_VisualPalette,
      Interactions: i_VisualInteractionOptions,
    },
    Actions: D.list(i_VisualCustomAction),
    ColumnHierarchies: D.list(i_ColumnHierarchy),
    VisualContentAltText: 0,
  },
  HeatMapVisual: {
    VisualId: 0,
    Title: i_VisualTitleLabelOptions,
    Subtitle: i_VisualSubtitleLabelOptions,
    ChartConfiguration: {
      FieldWells: {
        HeatMapAggregatedFieldWells: {
          Rows: D.list(i_DimensionField),
          Columns: D.list(i_DimensionField),
          Values: D.list(i_MeasureField),
        },
      },
      SortConfiguration: {
        HeatMapRowSort: D.list(i_FieldSortOptions),
        HeatMapColumnSort: D.list(i_FieldSortOptions),
        HeatMapRowItemsLimitConfiguration: i_ItemsLimitConfiguration,
        HeatMapColumnItemsLimitConfiguration: i_ItemsLimitConfiguration,
      },
      RowAxisDisplayOptions: i_AxisDisplayOptions,
      RowLabelOptions: i_ChartAxisLabelOptions,
      ColumnAxisDisplayOptions: i_AxisDisplayOptions,
      ColumnLabelOptions: i_ChartAxisLabelOptions,
      ColorScale: i_ColorScale,
      Legend: i_LegendOptions,
      DataLabels: i_DataLabelOptions,
      Tooltip: i_TooltipOptions,
      Interactions: i_VisualInteractionOptions,
    },
    ColumnHierarchies: D.list(i_ColumnHierarchy),
    Actions: D.list(i_VisualCustomAction),
    VisualContentAltText: 0,
  },
  TreeMapVisual: {
    VisualId: 0,
    Title: i_VisualTitleLabelOptions,
    Subtitle: i_VisualSubtitleLabelOptions,
    ChartConfiguration: {
      FieldWells: {
        TreeMapAggregatedFieldWells: {
          Groups: D.list(i_DimensionField),
          Sizes: D.list(i_MeasureField),
          Colors: D.list(i_MeasureField),
        },
      },
      SortConfiguration: {
        TreeMapSort: D.list(i_FieldSortOptions),
        TreeMapGroupItemsLimitConfiguration: i_ItemsLimitConfiguration,
      },
      GroupLabelOptions: i_ChartAxisLabelOptions,
      SizeLabelOptions: i_ChartAxisLabelOptions,
      ColorLabelOptions: i_ChartAxisLabelOptions,
      ColorScale: i_ColorScale,
      Legend: i_LegendOptions,
      DataLabels: i_DataLabelOptions,
      Tooltip: i_TooltipOptions,
      Interactions: i_VisualInteractionOptions,
    },
    Actions: D.list(i_VisualCustomAction),
    ColumnHierarchies: D.list(i_ColumnHierarchy),
    VisualContentAltText: 0,
  },
  GeospatialMapVisual: {
    VisualId: 0,
    Title: i_VisualTitleLabelOptions,
    Subtitle: i_VisualSubtitleLabelOptions,
    ChartConfiguration: {
      FieldWells: {
        GeospatialMapAggregatedFieldWells: {
          Geospatial: D.list(i_DimensionField),
          Values: D.list(i_MeasureField),
          Colors: D.list(i_DimensionField),
        },
      },
      Legend: i_LegendOptions,
      Tooltip: i_TooltipOptions,
      WindowOptions: i_GeospatialWindowOptions,
      MapStyleOptions: i_GeospatialMapStyleOptions,
      PointStyleOptions: {
        SelectedPointStyle: 0,
        ClusterMarkerConfiguration: {
          ClusterMarker: { SimpleClusterMarker: { Color: 0 } },
        },
        HeatmapConfiguration: {
          HeatmapColor: { Colors: D.list({ Color: 0 }) },
        },
      },
      VisualPalette: i_VisualPalette,
      Interactions: i_VisualInteractionOptions,
    },
    ColumnHierarchies: D.list(i_ColumnHierarchy),
    Actions: D.list(i_VisualCustomAction),
    VisualContentAltText: 0,
    GeocodingPreferences: D.list(i_GeocodePreference),
  },
  FilledMapVisual: {
    VisualId: 0,
    Title: i_VisualTitleLabelOptions,
    Subtitle: i_VisualSubtitleLabelOptions,
    ChartConfiguration: {
      FieldWells: {
        FilledMapAggregatedFieldWells: {
          Geospatial: D.list(i_DimensionField),
          Values: D.list(i_MeasureField),
        },
      },
      SortConfiguration: { CategorySort: D.list(i_FieldSortOptions) },
      Legend: i_LegendOptions,
      Tooltip: i_TooltipOptions,
      WindowOptions: i_GeospatialWindowOptions,
      MapStyleOptions: i_GeospatialMapStyleOptions,
      Interactions: i_VisualInteractionOptions,
    },
    ConditionalFormatting: {
      ConditionalFormattingOptions: D.list({
        Shape: {
          FieldId: 0,
          Format: { BackgroundColor: i_ConditionalFormattingColor },
        },
      }),
    },
    ColumnHierarchies: D.list(i_ColumnHierarchy),
    Actions: D.list(i_VisualCustomAction),
    VisualContentAltText: 0,
    GeocodingPreferences: D.list(i_GeocodePreference),
  },
  LayerMapVisual: {
    VisualId: 0,
    Title: i_VisualTitleLabelOptions,
    Subtitle: i_VisualSubtitleLabelOptions,
    ChartConfiguration: {
      Legend: i_LegendOptions,
      MapLayers: D.list({
        LayerId: 0,
        LayerType: 0,
        DataSource: { StaticFileDataSource: { StaticFileId: 0 } },
        Label: 0,
        Visibility: 0,
        LayerDefinition: {
          PointLayer: {
            Style: {
              CircleSymbolStyle: {
                FillColor: i_GeospatialColor,
                StrokeColor: i_GeospatialColor,
                StrokeWidth: i_GeospatialLineWidth,
                CircleRadius: { Radius: 0 },
              },
            },
          },
          LineLayer: {
            Style: {
              LineSymbolStyle: {
                FillColor: i_GeospatialColor,
                LineWidth: i_GeospatialLineWidth,
              },
            },
          },
          PolygonLayer: {
            Style: {
              PolygonSymbolStyle: {
                FillColor: i_GeospatialColor,
                StrokeColor: i_GeospatialColor,
                StrokeWidth: i_GeospatialLineWidth,
              },
            },
          },
        },
        Tooltip: i_TooltipOptions,
        JoinDefinition: {
          ShapeKeyField: 0,
          DatasetKeyField: i_UnaggregatedField,
          ColorField: {
            ColorDimensionsFields: D.list(i_DimensionField),
            ColorValuesFields: D.list(i_MeasureField),
          },
        },
        Actions: D.list({
          CustomActionId: 0,
          Name: 0,
          Status: 0,
          Trigger: 0,
          ActionOperations: D.list({
            FilterOperation: i_CustomActionFilterOperation,
            NavigationOperation: i_CustomActionNavigationOperation,
            URLOperation: i_CustomActionURLOperation,
            SetParametersOperation: i_CustomActionSetParametersOperation,
          }),
        }),
      }),
      MapState: { Bounds: i_GeospatialCoordinateBounds, MapNavigation: 0 },
      MapStyle: { BaseMapStyle: 0, BackgroundColor: 0, BaseMapVisibility: 0 },
      Interactions: i_VisualInteractionOptions,
    },
    DataSetIdentifier: 0,
    TopicIdentifier: 0,
    VisualContentAltText: 0,
  },
  FunnelChartVisual: {
    VisualId: 0,
    Title: i_VisualTitleLabelOptions,
    Subtitle: i_VisualSubtitleLabelOptions,
    ChartConfiguration: {
      FieldWells: {
        FunnelChartAggregatedFieldWells: {
          Category: D.list(i_DimensionField),
          Values: D.list(i_MeasureField),
        },
      },
      SortConfiguration: {
        CategorySort: D.list(i_FieldSortOptions),
        CategoryItemsLimit: i_ItemsLimitConfiguration,
      },
      CategoryLabelOptions: i_ChartAxisLabelOptions,
      ValueLabelOptions: i_ChartAxisLabelOptions,
      Tooltip: i_TooltipOptions,
      DataLabelOptions: {
        Visibility: 0,
        CategoryLabelVisibility: 0,
        MeasureLabelVisibility: 0,
        Position: 0,
        LabelFontConfiguration: i_FontConfiguration,
        LabelColor: 0,
        MeasureDataLabelStyle: 0,
      },
      VisualPalette: i_VisualPalette,
      Interactions: i_VisualInteractionOptions,
    },
    Actions: D.list(i_VisualCustomAction),
    ColumnHierarchies: D.list(i_ColumnHierarchy),
    VisualContentAltText: 0,
  },
  ScatterPlotVisual: {
    VisualId: 0,
    Title: i_VisualTitleLabelOptions,
    Subtitle: i_VisualSubtitleLabelOptions,
    ChartConfiguration: {
      FieldWells: {
        ScatterPlotCategoricallyAggregatedFieldWells: {
          XAxis: D.list(i_MeasureField),
          YAxis: D.list(i_MeasureField),
          Category: D.list(i_DimensionField),
          Size: D.list(i_MeasureField),
          Label: D.list(i_DimensionField),
        },
        ScatterPlotUnaggregatedFieldWells: {
          XAxis: D.list(i_DimensionField),
          YAxis: D.list(i_DimensionField),
          Size: D.list(i_MeasureField),
          Category: D.list(i_DimensionField),
          Label: D.list(i_DimensionField),
        },
      },
      SortConfiguration: {
        ScatterPlotLimitConfiguration: i_ItemsLimitConfiguration,
      },
      XAxisLabelOptions: i_ChartAxisLabelOptions,
      XAxisDisplayOptions: i_AxisDisplayOptions,
      YAxisLabelOptions: i_ChartAxisLabelOptions,
      YAxisDisplayOptions: i_AxisDisplayOptions,
      Legend: i_LegendOptions,
      DataLabels: i_DataLabelOptions,
      Tooltip: i_TooltipOptions,
      VisualPalette: i_VisualPalette,
      Interactions: i_VisualInteractionOptions,
    },
    Actions: D.list(i_VisualCustomAction),
    ColumnHierarchies: D.list(i_ColumnHierarchy),
    VisualContentAltText: 0,
  },
  ComboChartVisual: {
    VisualId: 0,
    Title: i_VisualTitleLabelOptions,
    Subtitle: i_VisualSubtitleLabelOptions,
    ChartConfiguration: {
      FieldWells: {
        ComboChartAggregatedFieldWells: {
          Category: D.list(i_DimensionField),
          BarValues: D.list(i_MeasureField),
          Colors: D.list(i_DimensionField),
          LineValues: D.list(i_MeasureField),
        },
      },
      SortConfiguration: {
        CategorySort: D.list(i_FieldSortOptions),
        CategoryItemsLimit: i_ItemsLimitConfiguration,
        ColorSort: D.list(i_FieldSortOptions),
        ColorItemsLimit: i_ItemsLimitConfiguration,
      },
      BarsArrangement: 0,
      CategoryAxis: i_AxisDisplayOptions,
      CategoryLabelOptions: i_ChartAxisLabelOptions,
      PrimaryYAxisDisplayOptions: i_AxisDisplayOptions,
      PrimaryYAxisLabelOptions: i_ChartAxisLabelOptions,
      SecondaryYAxisDisplayOptions: i_AxisDisplayOptions,
      SecondaryYAxisLabelOptions: i_ChartAxisLabelOptions,
      SingleAxisOptions: i_SingleAxisOptions,
      ColorLabelOptions: i_ChartAxisLabelOptions,
      DefaultSeriesSettings: {
        LineStyleSettings: i_LineChartLineStyleSettings,
        MarkerStyleSettings: i_LineChartMarkerStyleSettings,
        DecalSettings: i_DecalSettings,
        BorderSettings: i_BorderSettings,
      },
      Series: D.list({
        FieldComboSeriesItem: {
          FieldId: 0,
          Settings: i_ComboChartSeriesSettings,
        },
        DataFieldComboSeriesItem: {
          FieldId: 0,
          FieldValue: 0,
          Settings: i_ComboChartSeriesSettings,
        },
      }),
      Legend: i_LegendOptions,
      BarDataLabels: i_DataLabelOptions,
      LineDataLabels: i_DataLabelOptions,
      Tooltip: i_TooltipOptions,
      ReferenceLines: D.list(i_ReferenceLine),
      VisualPalette: i_VisualPalette,
      Interactions: i_VisualInteractionOptions,
    },
    Actions: D.list(i_VisualCustomAction),
    ColumnHierarchies: D.list(i_ColumnHierarchy),
    VisualContentAltText: 0,
  },
  BoxPlotVisual: {
    VisualId: 0,
    Title: i_VisualTitleLabelOptions,
    Subtitle: i_VisualSubtitleLabelOptions,
    ChartConfiguration: {
      FieldWells: {
        BoxPlotAggregatedFieldWells: {
          GroupBy: D.list(i_DimensionField),
          Values: D.list(i_MeasureField),
        },
      },
      SortConfiguration: {
        CategorySort: D.list(i_FieldSortOptions),
        PaginationConfiguration: i_PaginationConfiguration,
      },
      BoxPlotOptions: {
        StyleOptions: { FillStyle: 0 },
        OutlierVisibility: 0,
        AllDataPointsVisibility: 0,
      },
      CategoryAxis: i_AxisDisplayOptions,
      CategoryLabelOptions: i_ChartAxisLabelOptions,
      PrimaryYAxisDisplayOptions: i_AxisDisplayOptions,
      PrimaryYAxisLabelOptions: i_ChartAxisLabelOptions,
      Legend: i_LegendOptions,
      Tooltip: i_TooltipOptions,
      ReferenceLines: D.list(i_ReferenceLine),
      VisualPalette: i_VisualPalette,
      Interactions: i_VisualInteractionOptions,
    },
    Actions: D.list(i_VisualCustomAction),
    ColumnHierarchies: D.list(i_ColumnHierarchy),
    VisualContentAltText: 0,
  },
  WaterfallVisual: {
    VisualId: 0,
    Title: i_VisualTitleLabelOptions,
    Subtitle: i_VisualSubtitleLabelOptions,
    ChartConfiguration: {
      FieldWells: {
        WaterfallChartAggregatedFieldWells: {
          Categories: D.list(i_DimensionField),
          Values: D.list(i_MeasureField),
          Breakdowns: D.list(i_DimensionField),
        },
      },
      SortConfiguration: {
        CategorySort: D.list(i_FieldSortOptions),
        BreakdownItemsLimit: i_ItemsLimitConfiguration,
      },
      WaterfallChartOptions: { TotalBarLabel: 0 },
      CategoryAxisLabelOptions: i_ChartAxisLabelOptions,
      CategoryAxisDisplayOptions: i_AxisDisplayOptions,
      PrimaryYAxisLabelOptions: i_ChartAxisLabelOptions,
      PrimaryYAxisDisplayOptions: i_AxisDisplayOptions,
      Legend: i_LegendOptions,
      DataLabels: i_DataLabelOptions,
      VisualPalette: i_VisualPalette,
      ColorConfiguration: {
        GroupColorConfiguration: {
          PositiveBarColor: 0,
          NegativeBarColor: 0,
          TotalBarColor: 0,
        },
      },
      Interactions: i_VisualInteractionOptions,
    },
    Actions: D.list(i_VisualCustomAction),
    ColumnHierarchies: D.list(i_ColumnHierarchy),
    VisualContentAltText: 0,
  },
  HistogramVisual: {
    VisualId: 0,
    Title: i_VisualTitleLabelOptions,
    Subtitle: i_VisualSubtitleLabelOptions,
    ChartConfiguration: {
      FieldWells: {
        HistogramAggregatedFieldWells: { Values: D.list(i_MeasureField) },
      },
      XAxisDisplayOptions: i_AxisDisplayOptions,
      XAxisLabelOptions: i_ChartAxisLabelOptions,
      YAxisDisplayOptions: i_AxisDisplayOptions,
      BinOptions: {
        SelectedBinType: 0,
        BinCount: { Value: 0 },
        BinWidth: { Value: 0, BinCountLimit: 0 },
        StartValue: 0,
      },
      DataLabels: i_DataLabelOptions,
      Tooltip: i_TooltipOptions,
      VisualPalette: i_VisualPalette,
      Interactions: i_VisualInteractionOptions,
    },
    Actions: D.list(i_VisualCustomAction),
    VisualContentAltText: 0,
  },
  WordCloudVisual: {
    VisualId: 0,
    Title: i_VisualTitleLabelOptions,
    Subtitle: i_VisualSubtitleLabelOptions,
    ChartConfiguration: {
      FieldWells: {
        WordCloudAggregatedFieldWells: {
          GroupBy: D.list(i_DimensionField),
          Size: D.list(i_MeasureField),
        },
      },
      SortConfiguration: {
        CategoryItemsLimit: i_ItemsLimitConfiguration,
        CategorySort: D.list(i_FieldSortOptions),
      },
      CategoryLabelOptions: i_ChartAxisLabelOptions,
      WordCloudOptions: {
        WordOrientation: 0,
        WordScaling: 0,
        CloudLayout: 0,
        WordCasing: 0,
        WordPadding: 0,
        MaximumStringLength: 0,
      },
      Interactions: i_VisualInteractionOptions,
    },
    Actions: D.list(i_VisualCustomAction),
    ColumnHierarchies: D.list(i_ColumnHierarchy),
    VisualContentAltText: 0,
  },
  InsightVisual: {
    VisualId: 0,
    Title: i_VisualTitleLabelOptions,
    Subtitle: i_VisualSubtitleLabelOptions,
    InsightConfiguration: {
      Computations: D.list({
        TopBottomRanked: {
          ComputationId: 0,
          Name: 0,
          Category: i_DimensionField,
          Value: i_MeasureField,
          ResultSize: 0,
          Type: 0,
        },
        TopBottomMovers: {
          ComputationId: 0,
          Name: 0,
          Time: i_DimensionField,
          Category: i_DimensionField,
          Value: i_MeasureField,
          MoverSize: 0,
          SortOrder: 0,
          Type: 0,
        },
        TotalAggregation: { ComputationId: 0, Name: 0, Value: i_MeasureField },
        MaximumMinimum: {
          ComputationId: 0,
          Name: 0,
          Time: i_DimensionField,
          Value: i_MeasureField,
          Type: 0,
        },
        MetricComparison: {
          ComputationId: 0,
          Name: 0,
          Time: i_DimensionField,
          FromValue: i_MeasureField,
          TargetValue: i_MeasureField,
        },
        PeriodOverPeriod: {
          ComputationId: 0,
          Name: 0,
          Time: i_DimensionField,
          Value: i_MeasureField,
        },
        PeriodToDate: {
          ComputationId: 0,
          Name: 0,
          Time: i_DimensionField,
          Value: i_MeasureField,
          PeriodTimeGranularity: 0,
        },
        GrowthRate: {
          ComputationId: 0,
          Name: 0,
          Time: i_DimensionField,
          Value: i_MeasureField,
          PeriodSize: 0,
        },
        UniqueValues: { ComputationId: 0, Name: 0, Category: i_DimensionField },
        Forecast: {
          ComputationId: 0,
          Name: 0,
          Time: i_DimensionField,
          Value: i_MeasureField,
          PeriodsForward: 0,
          PeriodsBackward: 0,
          UpperBoundary: 0,
          LowerBoundary: 0,
          PredictionInterval: 0,
          Seasonality: 0,
          CustomSeasonalityValue: 0,
        },
      }),
      CustomNarrative: { Narrative: 0 },
      Interactions: i_VisualInteractionOptions,
    },
    Actions: D.list(i_VisualCustomAction),
    DataSetIdentifier: 0,
    TopicIdentifier: 0,
    VisualContentAltText: 0,
  },
  SankeyDiagramVisual: {
    VisualId: 0,
    Title: i_VisualTitleLabelOptions,
    Subtitle: i_VisualSubtitleLabelOptions,
    ChartConfiguration: {
      FieldWells: {
        SankeyDiagramAggregatedFieldWells: {
          Source: D.list(i_DimensionField),
          Destination: D.list(i_DimensionField),
          Weight: D.list(i_MeasureField),
        },
      },
      SortConfiguration: {
        WeightSort: D.list(i_FieldSortOptions),
        SourceItemsLimit: i_ItemsLimitConfiguration,
        DestinationItemsLimit: i_ItemsLimitConfiguration,
      },
      DataLabels: i_DataLabelOptions,
      Interactions: i_VisualInteractionOptions,
    },
    Actions: D.list(i_VisualCustomAction),
    VisualContentAltText: 0,
  },
  CustomContentVisual: {
    VisualId: 0,
    Title: i_VisualTitleLabelOptions,
    Subtitle: i_VisualSubtitleLabelOptions,
    ChartConfiguration: {
      ContentUrl: 0,
      ContentType: 0,
      ImageScaling: 0,
      Interactions: i_VisualInteractionOptions,
    },
    Actions: D.list(i_VisualCustomAction),
    DataSetIdentifier: 0,
    TopicIdentifier: 0,
    VisualContentAltText: 0,
  },
  EmptyVisual: {
    VisualId: 0,
    DataSetIdentifier: 0,
    TopicIdentifier: 0,
    Actions: D.list(i_VisualCustomAction),
  },
  RadarChartVisual: {
    VisualId: 0,
    Title: i_VisualTitleLabelOptions,
    Subtitle: i_VisualSubtitleLabelOptions,
    ChartConfiguration: {
      FieldWells: {
        RadarChartAggregatedFieldWells: {
          Category: D.list(i_DimensionField),
          Color: D.list(i_DimensionField),
          Values: D.list(i_MeasureField),
        },
      },
      SortConfiguration: {
        CategorySort: D.list(i_FieldSortOptions),
        CategoryItemsLimit: i_ItemsLimitConfiguration,
        ColorSort: D.list(i_FieldSortOptions),
        ColorItemsLimit: i_ItemsLimitConfiguration,
      },
      Shape: 0,
      BaseSeriesSettings: { AreaStyleSettings: { Visibility: 0 } },
      StartAngle: 0,
      VisualPalette: i_VisualPalette,
      AlternateBandColorsVisibility: 0,
      AlternateBandEvenColor: 0,
      AlternateBandOddColor: 0,
      CategoryAxis: i_AxisDisplayOptions,
      CategoryLabelOptions: i_ChartAxisLabelOptions,
      ColorAxis: i_AxisDisplayOptions,
      ColorLabelOptions: i_ChartAxisLabelOptions,
      Legend: i_LegendOptions,
      AxesRangeScale: 0,
      Interactions: i_VisualInteractionOptions,
    },
    Actions: D.list(i_VisualCustomAction),
    ColumnHierarchies: D.list(i_ColumnHierarchy),
    VisualContentAltText: 0,
  },
  PluginVisual: {
    VisualId: 0,
    PluginArn: 0,
    Title: i_VisualTitleLabelOptions,
    Subtitle: i_VisualSubtitleLabelOptions,
    ChartConfiguration: {
      FieldWells: D.list({
        AxisName: 0,
        Dimensions: D.list(i_DimensionField),
        Measures: D.list(i_MeasureField),
        Unaggregated: D.list(i_UnaggregatedField),
      }),
      VisualOptions: { VisualProperties: D.list({ Name: 0, Value: 0 }) },
      SortConfiguration: {
        PluginVisualTableQuerySort: {
          RowSort: D.list(i_FieldSortOptions),
          ItemsLimitConfiguration: { ItemsLimit: 0 },
        },
      },
    },
    Actions: D.list(i_VisualCustomAction),
    VisualContentAltText: 0,
  },
});
const i_VisualCustomActionDefaults: D.LazyStruct = () => ({
  highlightOperation: { Trigger: 0 },
});
const o_ColumnHierarchy: D.LazyStruct = () => ({
  ExplicitHierarchy: { DrillDownFilters: D.list(o_DrillDownFilter) },
  DateTimeHierarchy: { DrillDownFilters: D.list(o_DrillDownFilter) },
  PredefinedHierarchy: { DrillDownFilters: D.list(o_DrillDownFilter) },
});
const o_ComparisonConfiguration: D.LazyStruct = () => ({
  ComparisonFormat: {
    NumberDisplayFormatConfiguration: o_NumberDisplayFormatConfiguration,
    PercentageDisplayFormatConfiguration:
      o_PercentageDisplayFormatConfiguration,
  },
});
const o_ConditionalFormattingColor: D.LazyStruct = () => ({
  Solid: { Expression: D.secret },
  Gradient: { Expression: D.secret },
});
const o_ConditionalFormattingIcon: D.LazyStruct = () => ({
  IconSet: { Expression: D.secret },
  CustomCondition: { Expression: D.secret },
});
const o_CustomActionSetParametersOperation: D.LazyStruct = () => ({
  ParameterValueConfigurations: D.list({
    Value: {
      CustomValuesConfiguration: {
        CustomValues: {
          StringValues: D.list(D.secret),
          DateTimeValues: D.list(D.ts),
        },
      },
    },
  }),
});
const o_DataLabelOptions: D.LazyStruct = () => ({
  DataLabelTypes: D.list({ DataPathLabelType: { FieldValue: D.secret } }),
});
const o_DataPathValue: D.LazyStruct = () => ({ FieldValue: D.secret });
const o_DateTimeFormatConfiguration: D.LazyStruct = () => ({
  NullValueFormatConfiguration: o_NullValueFormatConfiguration,
  NumericFormatConfiguration: o_NumericFormatConfiguration,
});
const o_DimensionField: D.LazyStruct = () => ({
  NumericalDimensionField: { FormatConfiguration: o_NumberFormatConfiguration },
  CategoricalDimensionField: {
    FormatConfiguration: o_StringFormatConfiguration,
  },
  DateDimensionField: { FormatConfiguration: o_DateTimeFormatConfiguration },
});
const o_FreeFormLayoutElement: D.LazyStruct = () => ({
  RenderingRules: D.list({ Expression: D.secret }),
});
const o_HeaderFooterSectionConfiguration: D.LazyStruct = () => ({
  Layout: o_SectionLayoutConfiguration,
});
const o_MeasureField: D.LazyStruct = () => ({
  NumericalMeasureField: { FormatConfiguration: o_NumberFormatConfiguration },
  CategoricalMeasureField: { FormatConfiguration: o_StringFormatConfiguration },
  DateMeasureField: { FormatConfiguration: o_DateTimeFormatConfiguration },
  CalculatedMeasureField: { Expression: D.secret },
});
const o_NumberFormatConfiguration: D.LazyStruct = () => ({
  FormatConfiguration: o_NumericFormatConfiguration,
});
const o_ReferenceLine: D.LazyStruct = () => ({
  LabelConfiguration: {
    ValueLabelConfiguration: {
      FormatConfiguration: o_NumericFormatConfiguration,
    },
  },
});
const o_SectionLayoutConfiguration: D.LazyStruct = () => ({
  FreeFormLayout: { Elements: D.list(o_FreeFormLayoutElement) },
});
const o_StringFormatConfiguration: D.LazyStruct = () => ({
  NullValueFormatConfiguration: o_NullValueFormatConfiguration,
  NumericFormatConfiguration: o_NumericFormatConfiguration,
});
const o_TextConditionalFormat: D.LazyStruct = () => ({
  BackgroundColor: o_ConditionalFormattingColor,
  TextColor: o_ConditionalFormattingColor,
  Icon: o_ConditionalFormattingIcon,
});
const o_UnaggregatedField: D.LazyStruct = () => ({
  FormatConfiguration: o_FormatConfiguration,
});
const o_VisualCustomAction: D.LazyStruct = () => ({
  ActionOperations: D.list({
    SetParametersOperation: o_CustomActionSetParametersOperation,
  }),
});
const o_VisualPalette: D.LazyStruct = () => ({
  ColorMap: D.list({ Element: o_DataPathValue }),
});
const i_AxisDisplayOptions: D.LazyStruct = () => ({
  TickLabelOptions: { LabelOptions: i_LabelOptions, RotationAngle: 0 },
  AxisLineVisibility: 0,
  GridLineVisibility: 0,
  DataOptions: {
    NumericAxisOptions: {
      Scale: {
        Linear: { StepCount: 0, StepSize: 0 },
        Logarithmic: { Base: 0 },
      },
      Range: { MinMax: { Minimum: 0, Maximum: 0 }, DataDriven: {} },
    },
    DateAxisOptions: { MissingDateVisibility: 0 },
  },
  ScrollbarOptions: {
    Visibility: 0,
    VisibleRange: { PercentRange: { From: 0, To: 0 } },
  },
  AxisOffset: 0,
});
const i_BarChartSeriesSettings: D.LazyStruct = () => ({
  DecalSettings: i_DecalSettings,
  BorderSettings: i_BorderSettings,
});
const i_BorderSettings: D.LazyStruct = () => ({
  BorderVisibility: 0,
  BorderWidth: 0,
  BorderColor: 0,
});
const i_ChartAxisLabelOptions: D.LazyStruct = () => ({
  Visibility: 0,
  SortIconVisibility: 0,
  AxisLabelOptions: D.list({
    FontConfiguration: i_FontConfiguration,
    CustomLabel: 0,
    ApplyTo: { FieldId: 0, Column: i_ColumnIdentifier },
  }),
});
const i_ColorScale: D.LazyStruct = () => ({
  Colors: D.list(i_DataColor),
  ColorFillType: 0,
  NullValueColor: i_DataColor,
});
const i_ColumnHierarchy: D.LazyStruct = () => ({
  ExplicitHierarchy: {
    HierarchyId: 0,
    Columns: D.list(i_ColumnIdentifier),
    DrillDownFilters: D.list(i_DrillDownFilter),
  },
  DateTimeHierarchy: {
    HierarchyId: 0,
    DrillDownFilters: D.list(i_DrillDownFilter),
  },
  PredefinedHierarchy: {
    HierarchyId: 0,
    Columns: D.list(i_ColumnIdentifier),
    DrillDownFilters: D.list(i_DrillDownFilter),
  },
});
const i_ColumnSort: D.LazyStruct = () => ({
  SortBy: i_ColumnIdentifier,
  Direction: 0,
  AggregationFunction: i_AggregationFunction,
});
const i_ComboChartSeriesSettings: D.LazyStruct = () => ({
  LineStyleSettings: i_LineChartLineStyleSettings,
  MarkerStyleSettings: i_LineChartMarkerStyleSettings,
  DecalSettings: i_DecalSettings,
  BorderSettings: i_BorderSettings,
});
const i_ComparisonConfiguration: D.LazyStruct = () => ({
  ComparisonMethod: 0,
  ComparisonFormat: {
    NumberDisplayFormatConfiguration: i_NumberDisplayFormatConfiguration,
    PercentageDisplayFormatConfiguration:
      i_PercentageDisplayFormatConfiguration,
  },
});
const i_ConditionalFormattingColor: D.LazyStruct = () => ({
  Solid: { Expression: 0, Color: 0 },
  Gradient: {
    Expression: 0,
    Color: { Stops: D.list({ GradientOffset: 0, DataValue: 0, Color: 0 }) },
  },
});
const i_ConditionalFormattingIcon: D.LazyStruct = () => ({
  IconSet: { Expression: 0, IconSetType: 0 },
  CustomCondition: {
    Expression: 0,
    IconOptions: { Icon: 0, UnicodeIcon: 0 },
    Color: 0,
    DisplayConfiguration: { IconDisplayOption: 0 },
  },
});
const i_ContributionAnalysisDefault: D.LazyStruct = () => ({
  MeasureFieldId: 0,
  ContributorDimensions: D.list(i_ColumnIdentifier),
});
const i_CustomActionFilterOperation: D.LazyStruct = () => ({
  SelectedFieldsConfiguration: {
    SelectedFields: 0,
    SelectedFieldOptions: 0,
    SelectedColumns: D.list(i_ColumnIdentifier),
  },
  TargetVisualsConfiguration: {
    SameSheetTargetVisualConfiguration: {
      TargetVisuals: 0,
      TargetVisualOptions: 0,
    },
  },
});
const i_CustomActionNavigationOperation: D.LazyStruct = () => ({
  LocalNavigationConfiguration: { TargetSheetId: 0 },
});
const i_CustomActionSetParametersOperation: D.LazyStruct = () => ({
  ParameterValueConfigurations: D.list({
    DestinationParameterName: 0,
    Value: {
      CustomValuesConfiguration: {
        IncludeNullValue: 0,
        CustomValues: {
          StringValues: 0,
          IntegerValues: 0,
          DecimalValues: 0,
          DateTimeValues: 0,
        },
      },
      SelectAllValueOptions: 0,
      SourceParameterName: 0,
      SourceField: 0,
      SourceColumn: i_ColumnIdentifier,
    },
  }),
});
const i_CustomActionURLOperation: D.LazyStruct = () => ({
  URLTemplate: 0,
  URLTarget: 0,
});
const i_DashboardCustomizationVisualOptions: D.LazyStruct = () => ({
  FieldsConfiguration: {
    Status: 0,
    AdditionalFields: D.list(i_ColumnIdentifier),
  },
});
const i_DataLabelOptions: D.LazyStruct = () => ({
  Visibility: 0,
  CategoryLabelVisibility: 0,
  MeasureLabelVisibility: 0,
  DataLabelTypes: D.list({
    FieldLabelType: { FieldId: 0, Visibility: 0 },
    DataPathLabelType: { FieldId: 0, FieldValue: 0, Visibility: 0 },
    RangeEndsLabelType: { Visibility: 0 },
    MinimumLabelType: { Visibility: 0 },
    MaximumLabelType: { Visibility: 0 },
  }),
  Position: 0,
  LabelContent: 0,
  LabelFontConfiguration: i_FontConfiguration,
  LabelColor: 0,
  Overlap: 0,
  TotalsVisibility: 0,
});
const i_DataPathValue: D.LazyStruct = () => ({
  FieldId: 0,
  FieldValue: 0,
  DataPathType: { PivotTableDataPathType: 0 },
});
const i_DateTimeFormatConfiguration: D.LazyStruct = () => ({
  DateTimeFormat: 0,
  NullValueFormatConfiguration: i_NullValueFormatConfiguration,
  NumericFormatConfiguration: i_NumericFormatConfiguration,
});
const i_DimensionField: D.LazyStruct = () => ({
  NumericalDimensionField: {
    FieldId: 0,
    Column: i_ColumnIdentifier,
    HierarchyId: 0,
    FormatConfiguration: i_NumberFormatConfiguration,
  },
  CategoricalDimensionField: {
    FieldId: 0,
    Column: i_ColumnIdentifier,
    HierarchyId: 0,
    FormatConfiguration: i_StringFormatConfiguration,
  },
  DateDimensionField: {
    FieldId: 0,
    Column: i_ColumnIdentifier,
    DateGranularity: 0,
    HierarchyId: 0,
    FormatConfiguration: i_DateTimeFormatConfiguration,
  },
});
const i_FieldSort: D.LazyStruct = () => ({ FieldId: 0, Direction: 0 });
const i_FieldSortOptions: D.LazyStruct = () => ({
  FieldSort: i_FieldSort,
  ColumnSort: i_ColumnSort,
});
const i_FreeFormLayoutElement: D.LazyStruct = () => ({
  ElementId: 0,
  ElementType: 0,
  XAxisLocation: 0,
  YAxisLocation: 0,
  Width: 0,
  Height: 0,
  Visibility: 0,
  RenderingRules: D.list({
    Expression: 0,
    ConfigurationOverrides: { Visibility: 0 },
  }),
  BorderStyle: i_FreeFormLayoutElementBorderStyle,
  SelectedBorderStyle: i_FreeFormLayoutElementBorderStyle,
  BackgroundStyle: { Visibility: 0, Color: 0 },
  LoadingAnimation: i_LoadingAnimation,
  BorderRadius: 0,
  Padding: 0,
});
const i_GeocodePreference: D.LazyStruct = () => ({
  RequestKey: i_GeocoderHierarchy,
  Preference: {
    GeocoderHierarchy: i_GeocoderHierarchy,
    Coordinate: { Latitude: 0, Longitude: 0 },
  },
});
const i_GeospatialColor: D.LazyStruct = () => ({
  Solid: { Color: 0, State: 0 },
  Gradient: {
    StepColors: D.list({ Color: 0, DataValue: 0 }),
    NullDataVisibility: 0,
    NullDataSettings: i_GeospatialNullDataSettings,
    DefaultOpacity: 0,
  },
  Categorical: {
    CategoryDataColors: D.list({ Color: 0, DataValue: 0 }),
    NullDataVisibility: 0,
    NullDataSettings: i_GeospatialNullDataSettings,
    DefaultOpacity: 0,
  },
});
const i_GeospatialCoordinateBounds: D.LazyStruct = () => ({
  North: 0,
  South: 0,
  West: 0,
  East: 0,
});
const i_GeospatialLineWidth: D.LazyStruct = () => ({ LineWidth: 0 });
const i_GeospatialMapStyleOptions: D.LazyStruct = () => ({ BaseMapStyle: 0 });
const i_GeospatialWindowOptions: D.LazyStruct = () => ({
  Bounds: i_GeospatialCoordinateBounds,
  MapZoomMode: 0,
});
const i_GridLayoutElementBorderStyle: D.LazyStruct = () => ({
  Visibility: 0,
  Color: 0,
  Width: 0,
});
const i_HeaderFooterSectionConfiguration: D.LazyStruct = () => ({
  SectionId: 0,
  Layout: i_SectionLayoutConfiguration,
  Style: i_SectionStyle,
});
const i_ItemsLimitConfiguration: D.LazyStruct = () => ({
  ItemsLimit: 0,
  OtherCategories: 0,
});
const i_LabelOptions: D.LazyStruct = () => ({
  Visibility: 0,
  FontConfiguration: i_FontConfiguration,
  CustomLabel: 0,
});
const i_LegendOptions: D.LazyStruct = () => ({
  Visibility: 0,
  Title: i_LabelOptions,
  Position: 0,
  Width: 0,
  Height: 0,
  ValueFontConfiguration: i_FontConfiguration,
});
const i_LineChartLineStyleSettings: D.LazyStruct = () => ({
  LineVisibility: 0,
  LineInterpolation: 0,
  LineStyle: 0,
  LineWidth: 0,
});
const i_LineChartMarkerStyleSettings: D.LazyStruct = () => ({
  MarkerVisibility: 0,
  MarkerShape: 0,
  MarkerSize: 0,
  MarkerColor: 0,
});
const i_LineChartSeriesSettings: D.LazyStruct = () => ({
  LineStyleSettings: i_LineChartLineStyleSettings,
  MarkerStyleSettings: i_LineChartMarkerStyleSettings,
  DecalSettings: i_DecalSettings,
});
const i_LineSeriesAxisDisplayOptions: D.LazyStruct = () => ({
  AxisOptions: i_AxisDisplayOptions,
  MissingDataConfigurations: D.list({ TreatmentOption: 0 }),
});
const i_ListControlSelectAllOptions: D.LazyStruct = () => ({ Visibility: 0 });
const i_LoadingAnimation: D.LazyStruct = () => ({ Visibility: 0 });
const i_MeasureField: D.LazyStruct = () => ({
  NumericalMeasureField: {
    FieldId: 0,
    Column: i_ColumnIdentifier,
    AggregationFunction: i_NumericalAggregationFunction,
    FormatConfiguration: i_NumberFormatConfiguration,
  },
  CategoricalMeasureField: {
    FieldId: 0,
    Column: i_ColumnIdentifier,
    AggregationFunction: 0,
    FormatConfiguration: i_StringFormatConfiguration,
  },
  DateMeasureField: {
    FieldId: 0,
    Column: i_ColumnIdentifier,
    AggregationFunction: 0,
    FormatConfiguration: i_DateTimeFormatConfiguration,
  },
  CalculatedMeasureField: { FieldId: 0, Expression: 0 },
});
const i_NumberFormatConfiguration: D.LazyStruct = () => ({
  FormatConfiguration: i_NumericFormatConfiguration,
});
const i_NumericalAggregationFunction: D.LazyStruct = () => ({
  SimpleNumericalAggregation: 0,
  PercentileAggregation: { PercentileValue: 0 },
});
const i_PaginationConfiguration: D.LazyStruct = () => ({
  PageSize: 0,
  PageNumber: 0,
});
const i_PivotTableConditionalFormattingScope: D.LazyStruct = () => ({
  Role: 0,
});
const i_PivotTotalOptions: D.LazyStruct = () => ({
  TotalsVisibility: 0,
  Placement: 0,
  ScrollStatus: 0,
  CustomLabel: 0,
  TotalCellStyle: i_TableCellStyle,
  ValueCellStyle: i_TableCellStyle,
  MetricHeaderCellStyle: i_TableCellStyle,
  TotalAggregationOptions: D.list(i_TotalAggregationOption),
});
const i_ReferenceLine: D.LazyStruct = () => ({
  Status: 0,
  DataConfiguration: {
    StaticConfiguration: { Value: 0 },
    DynamicConfiguration: {
      Column: i_ColumnIdentifier,
      MeasureAggregationFunction: i_AggregationFunction,
      Calculation: i_NumericalAggregationFunction,
    },
    AxisBinding: 0,
    SeriesType: 0,
  },
  StyleConfiguration: { Pattern: 0, Color: 0 },
  LabelConfiguration: {
    ValueLabelConfiguration: {
      RelativePosition: 0,
      FormatConfiguration: i_NumericFormatConfiguration,
    },
    CustomLabelConfiguration: { CustomLabel: 0 },
    FontConfiguration: i_FontConfiguration,
    FontColor: 0,
    HorizontalPosition: 0,
    VerticalPosition: 0,
  },
});
const i_RowAlternateColorOptions: D.LazyStruct = () => ({
  Status: 0,
  RowAlternateColors: 0,
  UsePrimaryBackgroundColor: 0,
});
const i_SectionAfterPageBreak: D.LazyStruct = () => ({ Status: 0 });
const i_SectionLayoutConfiguration: D.LazyStruct = () => ({
  FreeFormLayout: { Elements: D.list(i_FreeFormLayoutElement) },
});
const i_SectionStyle: D.LazyStruct = () => ({ Height: 0, Padding: i_Spacing });
const i_SheetControlInfoIconLabelOptions: D.LazyStruct = () => ({
  Visibility: 0,
  InfoIconText: 0,
});
const i_SingleAxisOptions: D.LazyStruct = () => ({
  YAxisOptions: { YAxis: 0 },
});
const i_SmallMultiplesOptions: D.LazyStruct = () => ({
  MaxVisibleRows: 0,
  MaxVisibleColumns: 0,
  PanelConfiguration: {
    Title: {
      Visibility: 0,
      FontConfiguration: i_FontConfiguration,
      HorizontalTextAlignment: 0,
    },
    BorderVisibility: 0,
    BorderThickness: 0,
    BorderStyle: 0,
    BorderColor: 0,
    GutterVisibility: 0,
    GutterSpacing: 0,
    BackgroundVisibility: 0,
    BackgroundColor: 0,
  },
  XAxis: i_SmallMultiplesAxisProperties,
  YAxis: i_SmallMultiplesAxisProperties,
});
const i_Spacing: D.LazyStruct = () => ({
  Top: 0,
  Bottom: 0,
  Left: 0,
  Right: 0,
});
const i_StringFormatConfiguration: D.LazyStruct = () => ({
  NullValueFormatConfiguration: i_NullValueFormatConfiguration,
  NumericFormatConfiguration: i_NumericFormatConfiguration,
});
const i_SubtotalOptions: D.LazyStruct = () => ({
  TotalsVisibility: 0,
  CustomLabel: 0,
  FieldLevel: 0,
  FieldLevelOptions: D.list({ FieldId: 0 }),
  TotalCellStyle: i_TableCellStyle,
  ValueCellStyle: i_TableCellStyle,
  MetricHeaderCellStyle: i_TableCellStyle,
  StyleTargets: D.list({ CellType: 0 }),
});
const i_TableCellStyle: D.LazyStruct = () => ({
  Visibility: 0,
  FontConfiguration: i_FontConfiguration,
  TextWrap: 0,
  HorizontalTextAlignment: 0,
  VerticalTextAlignment: 0,
  BackgroundColor: 0,
  Height: 0,
  Border: {
    UniformBorder: i_TableBorderOptions,
    SideSpecificBorder: {
      InnerVertical: i_TableBorderOptions,
      InnerHorizontal: i_TableBorderOptions,
      Left: i_TableBorderOptions,
      Right: i_TableBorderOptions,
      Top: i_TableBorderOptions,
      Bottom: i_TableBorderOptions,
    },
  },
});
const i_TextConditionalFormat: D.LazyStruct = () => ({
  BackgroundColor: i_ConditionalFormattingColor,
  TextColor: i_ConditionalFormattingColor,
  Icon: i_ConditionalFormattingIcon,
});
const i_TextControlPlaceholderOptions: D.LazyStruct = () => ({ Visibility: 0 });
const i_TooltipOptions: D.LazyStruct = () => ({
  TooltipVisibility: 0,
  SelectedTooltipType: 0,
  FieldBasedTooltip: {
    AggregationVisibility: 0,
    TooltipTitleType: 0,
    TooltipFields: D.list({
      FieldTooltipItem: {
        FieldId: 0,
        Label: 0,
        Visibility: 0,
        TooltipTarget: 0,
      },
      ColumnTooltipItem: {
        Column: i_ColumnIdentifier,
        Label: 0,
        Visibility: 0,
        Aggregation: i_AggregationFunction,
        TooltipTarget: 0,
      },
    }),
  },
  SheetTooltip: { SheetId: 0 },
});
const i_TotalAggregationOption: D.LazyStruct = () => ({
  FieldId: 0,
  TotalAggregationFunction: { SimpleTotalAggregationFunction: 0 },
});
const i_UnaggregatedField: D.LazyStruct = () => ({
  FieldId: 0,
  Column: i_ColumnIdentifier,
  FormatConfiguration: i_FormatConfiguration,
});
const i_VisualCustomAction: D.LazyStruct = () => ({
  CustomActionId: 0,
  Name: 0,
  Status: 0,
  Trigger: 0,
  ActionOperations: D.list({
    FilterOperation: i_CustomActionFilterOperation,
    NavigationOperation: i_CustomActionNavigationOperation,
    URLOperation: i_CustomActionURLOperation,
    SetParametersOperation: i_CustomActionSetParametersOperation,
  }),
});
const i_VisualInteractionOptions: D.LazyStruct = () => ({
  VisualMenuOption: i_VisualMenuOption,
  ContextMenuOption: { AvailabilityStatus: 0 },
});
const i_VisualPalette: D.LazyStruct = () => ({
  ChartColor: 0,
  ColorMap: D.list({ Element: i_DataPathValue, Color: 0, TimeGranularity: 0 }),
});
const i_VisualSubtitleLabelOptions: D.LazyStruct = () => ({
  Visibility: 0,
  FormatText: { PlainText: 0, RichText: 0 },
});
const i_VisualTitleLabelOptions: D.LazyStruct = () => ({
  Visibility: 0,
  FormatText: { PlainText: 0, RichText: 0 },
});
const o_DrillDownFilter: D.LazyStruct = () => ({
  TimeRangeFilter: { RangeMinimum: D.ts, RangeMaximum: D.ts },
});
const o_NullValueFormatConfiguration: D.LazyStruct = () => ({
  NullString: D.secret,
});
const o_NumberDisplayFormatConfiguration: D.LazyStruct = () => ({
  Prefix: D.secret,
  Suffix: D.secret,
  NullValueFormatConfiguration: o_NullValueFormatConfiguration,
});
const o_NumericFormatConfiguration: D.LazyStruct = () => ({
  NumberDisplayFormatConfiguration: o_NumberDisplayFormatConfiguration,
  CurrencyDisplayFormatConfiguration: {
    Prefix: D.secret,
    Suffix: D.secret,
    NullValueFormatConfiguration: o_NullValueFormatConfiguration,
  },
  PercentageDisplayFormatConfiguration: o_PercentageDisplayFormatConfiguration,
});
const o_PercentageDisplayFormatConfiguration: D.LazyStruct = () => ({
  Prefix: D.secret,
  Suffix: D.secret,
  NullValueFormatConfiguration: o_NullValueFormatConfiguration,
});
const i_DataColor: D.LazyStruct = () => ({ Color: 0, DataValue: 0 });
const i_DrillDownFilter: D.LazyStruct = () => ({
  NumericEqualityFilter: { Column: i_ColumnIdentifier, Value: 0 },
  CategoryFilter: { Column: i_ColumnIdentifier, CategoryValues: 0 },
  TimeRangeFilter: {
    Column: i_ColumnIdentifier,
    RangeMinimum: 0,
    RangeMaximum: 0,
    TimeGranularity: 0,
  },
});
const i_FreeFormLayoutElementBorderStyle: D.LazyStruct = () => ({
  Visibility: 0,
  Color: 0,
  Width: 0,
});
const i_GeocoderHierarchy: D.LazyStruct = () => ({
  Country: 0,
  State: 0,
  County: 0,
  City: 0,
  PostCode: 0,
});
const i_GeospatialNullDataSettings: D.LazyStruct = () => ({
  SymbolStyle: { FillColor: 0, StrokeColor: 0, StrokeWidth: 0 },
});
const i_NullValueFormatConfiguration: D.LazyStruct = () => ({ NullString: 0 });
const i_NumberDisplayFormatConfiguration: D.LazyStruct = () => ({
  Prefix: 0,
  Suffix: 0,
  SeparatorConfiguration: i_NumericSeparatorConfiguration,
  DecimalPlacesConfiguration: i_DecimalPlacesConfiguration,
  NumberScale: 0,
  NegativeValueConfiguration: i_NegativeValueConfiguration,
  NullValueFormatConfiguration: i_NullValueFormatConfiguration,
});
const i_NumericFormatConfiguration: D.LazyStruct = () => ({
  NumberDisplayFormatConfiguration: i_NumberDisplayFormatConfiguration,
  CurrencyDisplayFormatConfiguration: {
    Prefix: 0,
    Suffix: 0,
    SeparatorConfiguration: i_NumericSeparatorConfiguration,
    Symbol: 0,
    DecimalPlacesConfiguration: i_DecimalPlacesConfiguration,
    NumberScale: 0,
    NegativeValueConfiguration: i_NegativeValueConfiguration,
    NullValueFormatConfiguration: i_NullValueFormatConfiguration,
  },
  PercentageDisplayFormatConfiguration: i_PercentageDisplayFormatConfiguration,
});
const i_PercentageDisplayFormatConfiguration: D.LazyStruct = () => ({
  Prefix: 0,
  Suffix: 0,
  SeparatorConfiguration: i_NumericSeparatorConfiguration,
  DecimalPlacesConfiguration: i_DecimalPlacesConfiguration,
  NegativeValueConfiguration: i_NegativeValueConfiguration,
  NullValueFormatConfiguration: i_NullValueFormatConfiguration,
});
const i_SmallMultiplesAxisProperties: D.LazyStruct = () => ({
  Scale: 0,
  Placement: 0,
});
const i_TableBorderOptions: D.LazyStruct = () => ({
  Color: 0,
  Thickness: 0,
  Style: 0,
});
const i_DecimalPlacesConfiguration: D.LazyStruct = () => ({ DecimalPlaces: 0 });
const i_NegativeValueConfiguration: D.LazyStruct = () => ({ DisplayMode: 0 });
const i_NumericSeparatorConfiguration: D.LazyStruct = () => ({
  DecimalSeparator: 0,
  ThousandsSeparator: { Symbol: 0, Visibility: 0, GroupingStyle: 0 },
});
