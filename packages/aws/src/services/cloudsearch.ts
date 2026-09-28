import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsQueryProtocol } from "../protocols/aws-query.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "CloudSearch",
  target: "A9SearchCloudConfigService2013",
  version: "2013-01-01",
  sigv4: "cloudsearch",
  protocol: awsQueryProtocol,
  xmlns: "http://cloudsearch.amazonaws.com/doc/2013-01-01/",
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
                `https://cloudsearch-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://cloudsearch-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://cloudsearch.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://cloudsearch.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class BaseException
  extends /*@__PURE__*/ TE.TaggedError("BaseException")<{
    readonly Code?: string;
    readonly message?: string;
  }> {}
export class DisabledOperationException
  extends /*@__PURE__*/ TE.TaggedError(
    "DisabledOperationException",
    ["ConflictError"],
    { code: "DisabledAction", status: 409 },
  )<{ readonly Code?: string; readonly message?: string }> {}
export class InternalException
  extends /*@__PURE__*/ TE.TaggedError("InternalException", ["ServerError"], {
    status: 500,
  })<{ readonly Code?: string; readonly message?: string }> {}
export class InvalidTypeException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidTypeException",
    ["ConflictError"],
    { code: "InvalidType", status: 409 },
  )<{ readonly Code?: string; readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["ConflictError"],
    { code: "LimitExceeded", status: 409 },
  )<{ readonly Code?: string; readonly message?: string }> {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceAlreadyExistsException",
    ["ConflictError", "AlreadyExistsError"],
    { code: "ResourceAlreadyExists", status: 409 },
  )<{ readonly Code?: string; readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["ConflictError"],
    { code: "ResourceNotFound", status: 409 },
  )<{ readonly Code?: string; readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly Code?: string; readonly message?: string }> {}
export type DomainName = string;
export interface BuildSuggestersRequest {
  DomainName: string;
}
export type FieldName = string;
export type FieldNameList = string[];
export interface BuildSuggestersResponse {
  FieldNames?: string[];
}
export interface CreateDomainRequest {
  DomainName: string;
}
export type DomainId = string;
export type ARN = string;
export type ServiceUrl = string;
export interface ServiceEndpoint {
  Endpoint?: string;
}
export type SearchInstanceType = string;
export type PartitionCount = number;
export type InstanceCount = number;
export type MaximumReplicationCount = number;
export type MaximumPartitionCount = number;
export interface Limits {
  MaximumReplicationCount: number;
  MaximumPartitionCount: number;
}
export interface DomainStatus {
  DomainId: string;
  DomainName: string;
  ARN?: string;
  Created?: boolean;
  Deleted?: boolean;
  DocService?: ServiceEndpoint;
  SearchService?: ServiceEndpoint;
  RequiresIndexDocuments: boolean;
  Processing?: boolean;
  SearchInstanceType?: string;
  SearchPartitionCount?: number;
  SearchInstanceCount?: number;
  Limits?: Limits;
}
export interface CreateDomainResponse {
  DomainStatus?: DomainStatus;
}
export type StandardName = string;
export type AnalysisSchemeLanguage =
  | "ar"
  | "bg"
  | "ca"
  | "cs"
  | "da"
  | "de"
  | "el"
  | "en"
  | "es"
  | "eu"
  | "fa"
  | "fi"
  | "fr"
  | "ga"
  | "gl"
  | "he"
  | "hi"
  | "hu"
  | "hy"
  | "id"
  | "it"
  | "ja"
  | "ko"
  | "lv"
  | "mul"
  | "nl"
  | "no"
  | "pt"
  | "ro"
  | "ru"
  | "sv"
  | "th"
  | "tr"
  | "zh-Hans"
  | "zh-Hant"
  | (string & {});
export type AlgorithmicStemming =
  | "none"
  | "minimal"
  | "light"
  | "full"
  | (string & {});
export interface AnalysisOptions {
  Synonyms?: string;
  Stopwords?: string;
  StemmingDictionary?: string;
  JapaneseTokenizationDictionary?: string;
  AlgorithmicStemming?: AlgorithmicStemming;
}
export interface AnalysisScheme {
  AnalysisSchemeName: string;
  AnalysisSchemeLanguage: AnalysisSchemeLanguage;
  AnalysisOptions?: AnalysisOptions;
}
export interface DefineAnalysisSchemeRequest {
  DomainName: string;
  AnalysisScheme: AnalysisScheme;
}
export type UpdateTimestamp = Date;
export type UIntValue = number;
export type OptionState =
  | "RequiresIndexDocuments"
  | "Processing"
  | "Active"
  | "FailedToValidate"
  | (string & {});
export interface OptionStatus {
  CreationDate: Date;
  UpdateDate: Date;
  UpdateVersion?: number;
  State: OptionState;
  PendingDeletion?: boolean;
}
export interface AnalysisSchemeStatus {
  Options: AnalysisScheme;
  Status: OptionStatus;
}
export interface DefineAnalysisSchemeResponse {
  AnalysisScheme: AnalysisSchemeStatus;
}
export type ExpressionValue = string;
export interface Expression {
  ExpressionName: string;
  ExpressionValue: string;
}
export interface DefineExpressionRequest {
  DomainName: string;
  Expression: Expression;
}
export interface ExpressionStatus {
  Options: Expression;
  Status: OptionStatus;
}
export interface DefineExpressionResponse {
  Expression: ExpressionStatus;
}
export type DynamicFieldName = string;
export type IndexFieldType =
  | "int"
  | "double"
  | "literal"
  | "text"
  | "date"
  | "latlon"
  | "int-array"
  | "double-array"
  | "literal-array"
  | "text-array"
  | "date-array"
  | (string & {});
export interface IntOptions {
  DefaultValue?: number;
  SourceField?: string;
  FacetEnabled?: boolean;
  SearchEnabled?: boolean;
  ReturnEnabled?: boolean;
  SortEnabled?: boolean;
}
export interface DoubleOptions {
  DefaultValue?: number;
  SourceField?: string;
  FacetEnabled?: boolean;
  SearchEnabled?: boolean;
  ReturnEnabled?: boolean;
  SortEnabled?: boolean;
}
export type FieldValue = string;
export interface LiteralOptions {
  DefaultValue?: string;
  SourceField?: string;
  FacetEnabled?: boolean;
  SearchEnabled?: boolean;
  ReturnEnabled?: boolean;
  SortEnabled?: boolean;
}
export type Word = string;
export interface TextOptions {
  DefaultValue?: string;
  SourceField?: string;
  ReturnEnabled?: boolean;
  SortEnabled?: boolean;
  HighlightEnabled?: boolean;
  AnalysisScheme?: string;
}
export interface DateOptions {
  DefaultValue?: string;
  SourceField?: string;
  FacetEnabled?: boolean;
  SearchEnabled?: boolean;
  ReturnEnabled?: boolean;
  SortEnabled?: boolean;
}
export interface LatLonOptions {
  DefaultValue?: string;
  SourceField?: string;
  FacetEnabled?: boolean;
  SearchEnabled?: boolean;
  ReturnEnabled?: boolean;
  SortEnabled?: boolean;
}
export type FieldNameCommaList = string;
export interface IntArrayOptions {
  DefaultValue?: number;
  SourceFields?: string;
  FacetEnabled?: boolean;
  SearchEnabled?: boolean;
  ReturnEnabled?: boolean;
}
export interface DoubleArrayOptions {
  DefaultValue?: number;
  SourceFields?: string;
  FacetEnabled?: boolean;
  SearchEnabled?: boolean;
  ReturnEnabled?: boolean;
}
export interface LiteralArrayOptions {
  DefaultValue?: string;
  SourceFields?: string;
  FacetEnabled?: boolean;
  SearchEnabled?: boolean;
  ReturnEnabled?: boolean;
}
export interface TextArrayOptions {
  DefaultValue?: string;
  SourceFields?: string;
  ReturnEnabled?: boolean;
  HighlightEnabled?: boolean;
  AnalysisScheme?: string;
}
export interface DateArrayOptions {
  DefaultValue?: string;
  SourceFields?: string;
  FacetEnabled?: boolean;
  SearchEnabled?: boolean;
  ReturnEnabled?: boolean;
}
export interface IndexField {
  IndexFieldName: string;
  IndexFieldType: IndexFieldType;
  IntOptions?: IntOptions;
  DoubleOptions?: DoubleOptions;
  LiteralOptions?: LiteralOptions;
  TextOptions?: TextOptions;
  DateOptions?: DateOptions;
  LatLonOptions?: LatLonOptions;
  IntArrayOptions?: IntArrayOptions;
  DoubleArrayOptions?: DoubleArrayOptions;
  LiteralArrayOptions?: LiteralArrayOptions;
  TextArrayOptions?: TextArrayOptions;
  DateArrayOptions?: DateArrayOptions;
}
export interface DefineIndexFieldRequest {
  DomainName: string;
  IndexField: IndexField;
}
export interface IndexFieldStatus {
  Options: IndexField;
  Status: OptionStatus;
}
export interface DefineIndexFieldResponse {
  IndexField: IndexFieldStatus;
}
export type SuggesterFuzzyMatching = "none" | "low" | "high" | (string & {});
export interface DocumentSuggesterOptions {
  SourceField: string;
  FuzzyMatching?: SuggesterFuzzyMatching;
  SortExpression?: string;
}
export interface Suggester {
  SuggesterName: string;
  DocumentSuggesterOptions: DocumentSuggesterOptions;
}
export interface DefineSuggesterRequest {
  DomainName: string;
  Suggester: Suggester;
}
export interface SuggesterStatus {
  Options: Suggester;
  Status: OptionStatus;
}
export interface DefineSuggesterResponse {
  Suggester: SuggesterStatus;
}
export interface DeleteAnalysisSchemeRequest {
  DomainName: string;
  AnalysisSchemeName: string;
}
export interface DeleteAnalysisSchemeResponse {
  AnalysisScheme: AnalysisSchemeStatus;
}
export interface DeleteDomainRequest {
  DomainName: string;
}
export interface DeleteDomainResponse {
  DomainStatus?: DomainStatus;
}
export interface DeleteExpressionRequest {
  DomainName: string;
  ExpressionName: string;
}
export interface DeleteExpressionResponse {
  Expression: ExpressionStatus;
}
export interface DeleteIndexFieldRequest {
  DomainName: string;
  IndexFieldName: string;
}
export interface DeleteIndexFieldResponse {
  IndexField: IndexFieldStatus;
}
export interface DeleteSuggesterRequest {
  DomainName: string;
  SuggesterName: string;
}
export interface DeleteSuggesterResponse {
  Suggester: SuggesterStatus;
}
export type StandardNameList = string[];
export interface DescribeAnalysisSchemesRequest {
  DomainName: string;
  AnalysisSchemeNames?: string[];
  Deployed?: boolean;
}
export type AnalysisSchemeStatusList = AnalysisSchemeStatus[];
export interface DescribeAnalysisSchemesResponse {
  AnalysisSchemes: AnalysisSchemeStatus[];
}
export interface DescribeAvailabilityOptionsRequest {
  DomainName: string;
  Deployed?: boolean;
}
export type MultiAZ = boolean;
export interface AvailabilityOptionsStatus {
  Options: boolean;
  Status: OptionStatus;
}
export interface DescribeAvailabilityOptionsResponse {
  AvailabilityOptions?: AvailabilityOptionsStatus;
}
export interface DescribeDomainEndpointOptionsRequest {
  DomainName: string;
  Deployed?: boolean;
}
export type TLSSecurityPolicy =
  | "Policy-Min-TLS-1-0-2019-07"
  | "Policy-Min-TLS-1-2-2019-07"
  | (string & {});
export interface DomainEndpointOptions {
  EnforceHTTPS?: boolean;
  TLSSecurityPolicy?: TLSSecurityPolicy;
}
export interface DomainEndpointOptionsStatus {
  Options: DomainEndpointOptions;
  Status: OptionStatus;
}
export interface DescribeDomainEndpointOptionsResponse {
  DomainEndpointOptions?: DomainEndpointOptionsStatus;
}
export type DomainNameList = string[];
export interface DescribeDomainsRequest {
  DomainNames?: string[];
}
export type DomainStatusList = DomainStatus[];
export interface DescribeDomainsResponse {
  DomainStatusList: DomainStatus[];
}
export interface DescribeExpressionsRequest {
  DomainName: string;
  ExpressionNames?: string[];
  Deployed?: boolean;
}
export type ExpressionStatusList = ExpressionStatus[];
export interface DescribeExpressionsResponse {
  Expressions: ExpressionStatus[];
}
export type DynamicFieldNameList = string[];
export interface DescribeIndexFieldsRequest {
  DomainName: string;
  FieldNames?: string[];
  Deployed?: boolean;
}
export type IndexFieldStatusList = IndexFieldStatus[];
export interface DescribeIndexFieldsResponse {
  IndexFields: IndexFieldStatus[];
}
export interface DescribeScalingParametersRequest {
  DomainName: string;
}
export type PartitionInstanceType =
  | "search.m1.small"
  | "search.m1.large"
  | "search.m2.xlarge"
  | "search.m2.2xlarge"
  | "search.m3.medium"
  | "search.m3.large"
  | "search.m3.xlarge"
  | "search.m3.2xlarge"
  | "search.small"
  | "search.medium"
  | "search.large"
  | "search.xlarge"
  | "search.2xlarge"
  | "search.previousgeneration.small"
  | "search.previousgeneration.large"
  | "search.previousgeneration.xlarge"
  | "search.previousgeneration.2xlarge"
  | (string & {});
export interface ScalingParameters {
  DesiredInstanceType?: PartitionInstanceType;
  DesiredReplicationCount?: number;
  DesiredPartitionCount?: number;
}
export interface ScalingParametersStatus {
  Options: ScalingParameters;
  Status: OptionStatus;
}
export interface DescribeScalingParametersResponse {
  ScalingParameters: ScalingParametersStatus;
}
export interface DescribeServiceAccessPoliciesRequest {
  DomainName: string;
  Deployed?: boolean;
}
export type PolicyDocument = string;
export interface AccessPoliciesStatus {
  Options: string;
  Status: OptionStatus;
}
export interface DescribeServiceAccessPoliciesResponse {
  AccessPolicies: AccessPoliciesStatus;
}
export interface DescribeSuggestersRequest {
  DomainName: string;
  SuggesterNames?: string[];
  Deployed?: boolean;
}
export type SuggesterStatusList = SuggesterStatus[];
export interface DescribeSuggestersResponse {
  Suggesters: SuggesterStatus[];
}
export interface IndexDocumentsRequest {
  DomainName: string;
}
export interface IndexDocumentsResponse {
  FieldNames?: string[];
}
export interface ListDomainNamesRequest {}
export type APIVersion = string;
export type DomainNameMap = { [key: string]: string | undefined };
export interface ListDomainNamesResponse {
  DomainNames?: { [key: string]: string | undefined };
}
export interface UpdateAvailabilityOptionsRequest {
  DomainName: string;
  MultiAZ: boolean;
}
export interface UpdateAvailabilityOptionsResponse {
  AvailabilityOptions?: AvailabilityOptionsStatus;
}
export interface UpdateDomainEndpointOptionsRequest {
  DomainName: string;
  DomainEndpointOptions: DomainEndpointOptions;
}
export interface UpdateDomainEndpointOptionsResponse {
  DomainEndpointOptions?: DomainEndpointOptionsStatus;
}
export interface UpdateScalingParametersRequest {
  DomainName: string;
  ScalingParameters: ScalingParameters;
}
export interface UpdateScalingParametersResponse {
  ScalingParameters: ScalingParametersStatus;
}
export interface UpdateServiceAccessPoliciesRequest {
  DomainName: string;
  AccessPolicies: string;
}
export interface UpdateServiceAccessPoliciesResponse {
  AccessPolicies: AccessPoliciesStatus;
}
export type ErrorCode = string;
export type ErrorMessage = string;
export type BuildSuggestersError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Indexes the search suggestions. For more information, see Configuring Suggesters in the *Amazon CloudSearch Developer Guide*.
 */
export const buildSuggesters: API.OperationMethod<
  BuildSuggestersRequest,
  BuildSuggestersResponse,
  BuildSuggestersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainName: 0 },
    output: { FieldNames: D.list() },
  },
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BuildSuggesters",
})) as any;

export type CreateDomainError =
  | BaseException
  | InternalException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new search domain. For more information,
 * see Creating a Search Domain in the *Amazon CloudSearch Developer Guide*.
 */
export const createDomain: API.OperationMethod<
  CreateDomainRequest,
  CreateDomainResponse,
  CreateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainName: 0 },
    output: { DomainStatus: o_DomainStatus },
  },
  errors: [
    BaseException,
    InternalException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomain",
})) as any;

export type DefineAnalysisSchemeError =
  | BaseException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Configures an analysis scheme that can be applied to a `text` or `text-array` field to define language-specific text processing options. For more information, see Configuring Analysis Schemes in the *Amazon CloudSearch Developer Guide*.
 */
export const defineAnalysisScheme: API.OperationMethod<
  DefineAnalysisSchemeRequest,
  DefineAnalysisSchemeResponse,
  DefineAnalysisSchemeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DomainName: 0,
      AnalysisScheme: {
        AnalysisSchemeName: 0,
        AnalysisSchemeLanguage: 0,
        AnalysisOptions: {
          Synonyms: 0,
          Stopwords: 0,
          StemmingDictionary: 0,
          JapaneseTokenizationDictionary: 0,
          AlgorithmicStemming: 0,
        },
      },
    },
    output: { AnalysisScheme: o_AnalysisSchemeStatus },
  },
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DefineAnalysisScheme",
})) as any;

export type DefineExpressionError =
  | BaseException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Configures an `Expression` for the search domain. Used to create new expressions and modify existing ones. If the expression exists, the new configuration replaces the old one. For more information, see Configuring Expressions in the *Amazon CloudSearch Developer Guide*.
 */
export const defineExpression: API.OperationMethod<
  DefineExpressionRequest,
  DefineExpressionResponse,
  DefineExpressionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DomainName: 0,
      Expression: { ExpressionName: 0, ExpressionValue: 0 },
    },
    output: { Expression: o_ExpressionStatus },
  },
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DefineExpression",
})) as any;

export type DefineIndexFieldError =
  | BaseException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Configures an `IndexField` for the search domain. Used to create new fields and modify existing ones. You must specify the name of the domain you are configuring and an index field configuration. The index field configuration specifies a unique name, the index field type, and the options you want to configure for the field. The options you can specify depend on the `IndexFieldType`. If the field exists, the new configuration replaces the old one. For more information, see Configuring Index Fields in the *Amazon CloudSearch Developer Guide*.
 */
export const defineIndexField: API.OperationMethod<
  DefineIndexFieldRequest,
  DefineIndexFieldResponse,
  DefineIndexFieldError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DomainName: 0,
      IndexField: {
        IndexFieldName: 0,
        IndexFieldType: 0,
        IntOptions: {
          DefaultValue: 0,
          SourceField: 0,
          FacetEnabled: 0,
          SearchEnabled: 0,
          ReturnEnabled: 0,
          SortEnabled: 0,
        },
        DoubleOptions: {
          DefaultValue: 0,
          SourceField: 0,
          FacetEnabled: 0,
          SearchEnabled: 0,
          ReturnEnabled: 0,
          SortEnabled: 0,
        },
        LiteralOptions: {
          DefaultValue: 0,
          SourceField: 0,
          FacetEnabled: 0,
          SearchEnabled: 0,
          ReturnEnabled: 0,
          SortEnabled: 0,
        },
        TextOptions: {
          DefaultValue: 0,
          SourceField: 0,
          ReturnEnabled: 0,
          SortEnabled: 0,
          HighlightEnabled: 0,
          AnalysisScheme: 0,
        },
        DateOptions: {
          DefaultValue: 0,
          SourceField: 0,
          FacetEnabled: 0,
          SearchEnabled: 0,
          ReturnEnabled: 0,
          SortEnabled: 0,
        },
        LatLonOptions: {
          DefaultValue: 0,
          SourceField: 0,
          FacetEnabled: 0,
          SearchEnabled: 0,
          ReturnEnabled: 0,
          SortEnabled: 0,
        },
        IntArrayOptions: {
          DefaultValue: 0,
          SourceFields: 0,
          FacetEnabled: 0,
          SearchEnabled: 0,
          ReturnEnabled: 0,
        },
        DoubleArrayOptions: {
          DefaultValue: 0,
          SourceFields: 0,
          FacetEnabled: 0,
          SearchEnabled: 0,
          ReturnEnabled: 0,
        },
        LiteralArrayOptions: {
          DefaultValue: 0,
          SourceFields: 0,
          FacetEnabled: 0,
          SearchEnabled: 0,
          ReturnEnabled: 0,
        },
        TextArrayOptions: {
          DefaultValue: 0,
          SourceFields: 0,
          ReturnEnabled: 0,
          HighlightEnabled: 0,
          AnalysisScheme: 0,
        },
        DateArrayOptions: {
          DefaultValue: 0,
          SourceFields: 0,
          FacetEnabled: 0,
          SearchEnabled: 0,
          ReturnEnabled: 0,
        },
      },
    },
    output: { IndexField: o_IndexFieldStatus },
  },
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DefineIndexField",
})) as any;

export type DefineSuggesterError =
  | BaseException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Configures a suggester for a domain. A suggester enables you to display possible matches before users finish typing their queries. When you configure a suggester, you must specify the name of the text field you want to search for possible matches and a unique name for the suggester. For more information, see Getting Search Suggestions in the *Amazon CloudSearch Developer Guide*.
 */
export const defineSuggester: API.OperationMethod<
  DefineSuggesterRequest,
  DefineSuggesterResponse,
  DefineSuggesterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DomainName: 0,
      Suggester: {
        SuggesterName: 0,
        DocumentSuggesterOptions: {
          SourceField: 0,
          FuzzyMatching: 0,
          SortExpression: 0,
        },
      },
    },
    output: { Suggester: o_SuggesterStatus },
  },
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DefineSuggester",
})) as any;

export type DeleteAnalysisSchemeError =
  | BaseException
  | InternalException
  | InvalidTypeException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an analysis scheme. For more information, see Configuring Analysis Schemes in the *Amazon CloudSearch Developer Guide*.
 */
export const deleteAnalysisScheme: API.OperationMethod<
  DeleteAnalysisSchemeRequest,
  DeleteAnalysisSchemeResponse,
  DeleteAnalysisSchemeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainName: 0, AnalysisSchemeName: 0 },
    output: { AnalysisScheme: o_AnalysisSchemeStatus },
  },
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAnalysisScheme",
})) as any;

export type DeleteDomainError =
  | BaseException
  | InternalException
  | CommonErrors;
/**
 * Permanently deletes a search domain and all of its data. Once a domain has been deleted, it cannot be recovered. For more information,
 * see Deleting a Search Domain in the *Amazon CloudSearch Developer Guide*.
 */
export const deleteDomain: API.OperationMethod<
  DeleteDomainRequest,
  DeleteDomainResponse,
  DeleteDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainName: 0 },
    output: { DomainStatus: o_DomainStatus },
  },
  errors: [BaseException, InternalException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomain",
})) as any;

export type DeleteExpressionError =
  | BaseException
  | InternalException
  | InvalidTypeException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes an `Expression` from the search domain. For more information, see Configuring Expressions in the *Amazon CloudSearch Developer Guide*.
 */
export const deleteExpression: API.OperationMethod<
  DeleteExpressionRequest,
  DeleteExpressionResponse,
  DeleteExpressionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainName: 0, ExpressionName: 0 },
    output: { Expression: o_ExpressionStatus },
  },
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteExpression",
})) as any;

export type DeleteIndexFieldError =
  | BaseException
  | InternalException
  | InvalidTypeException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes an `IndexField` from the search domain. For more information, see Configuring Index Fields in the *Amazon CloudSearch Developer Guide*.
 */
export const deleteIndexField: API.OperationMethod<
  DeleteIndexFieldRequest,
  DeleteIndexFieldResponse,
  DeleteIndexFieldError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainName: 0, IndexFieldName: 0 },
    output: { IndexField: o_IndexFieldStatus },
  },
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIndexField",
})) as any;

export type DeleteSuggesterError =
  | BaseException
  | InternalException
  | InvalidTypeException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a suggester. For more information, see Getting Search Suggestions in the *Amazon CloudSearch Developer Guide*.
 */
export const deleteSuggester: API.OperationMethod<
  DeleteSuggesterRequest,
  DeleteSuggesterResponse,
  DeleteSuggesterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainName: 0, SuggesterName: 0 },
    output: { Suggester: o_SuggesterStatus },
  },
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSuggester",
})) as any;

export type DescribeAnalysisSchemesError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the analysis schemes configured for a domain. An analysis scheme defines language-specific text processing options for a `text` field. Can be limited to specific analysis schemes by name. By default, shows all analysis schemes and includes any pending changes to the configuration. Set the `Deployed` option to `true` to show the active configuration and exclude pending changes. For more information, see Configuring Analysis Schemes in the *Amazon CloudSearch Developer Guide*.
 */
export const describeAnalysisSchemes: API.OperationMethod<
  DescribeAnalysisSchemesRequest,
  DescribeAnalysisSchemesResponse,
  DescribeAnalysisSchemesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainName: 0, AnalysisSchemeNames: 0, Deployed: 0 },
    output: { AnalysisSchemes: D.list(o_AnalysisSchemeStatus) },
  },
  errors: [BaseException, InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAnalysisSchemes",
})) as any;

export type DescribeAvailabilityOptionsError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the availability options configured for a domain. By default, shows the configuration with any pending changes. Set the `Deployed` option to `true` to show the active configuration and exclude pending changes. For more information, see Configuring Availability Options in the *Amazon CloudSearch Developer Guide*.
 */
export const describeAvailabilityOptions: API.OperationMethod<
  DescribeAvailabilityOptionsRequest,
  DescribeAvailabilityOptionsResponse,
  DescribeAvailabilityOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainName: 0, Deployed: 0 },
    output: { AvailabilityOptions: o_AvailabilityOptionsStatus },
  },
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAvailabilityOptions",
})) as any;

export type DescribeDomainEndpointOptionsError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the domain's endpoint options, specifically whether all requests to the domain must arrive over HTTPS. For more information, see Configuring Domain Endpoint Options in the *Amazon CloudSearch Developer Guide*.
 */
export const describeDomainEndpointOptions: API.OperationMethod<
  DescribeDomainEndpointOptionsRequest,
  DescribeDomainEndpointOptionsResponse,
  DescribeDomainEndpointOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainName: 0, Deployed: 0 },
    output: { DomainEndpointOptions: o_DomainEndpointOptionsStatus },
  },
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDomainEndpointOptions",
})) as any;

export type DescribeDomainsError =
  | BaseException
  | InternalException
  | CommonErrors;
/**
 * Gets information about the search domains owned by this account. Can be limited to specific domains. Shows
 * all domains by default. To get the number of searchable documents in a domain, use the console or submit a `matchall` request to your domain's search endpoint: `q=matchall&q.parser=structured&size=0`. For more information,
 * see Getting Information about a Search Domain in the *Amazon CloudSearch Developer Guide*.
 */
export const describeDomains: API.OperationMethod<
  DescribeDomainsRequest,
  DescribeDomainsResponse,
  DescribeDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainNames: 0 },
    output: { DomainStatusList: D.list(o_DomainStatus) },
  },
  errors: [BaseException, InternalException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDomains",
})) as any;

export type DescribeExpressionsError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the expressions configured for the search domain. Can be limited to specific expressions by name. By default, shows all expressions and includes any pending changes to the configuration. Set the `Deployed` option to `true` to show the active configuration and exclude pending changes. For more information, see Configuring Expressions in the *Amazon CloudSearch Developer Guide*.
 */
export const describeExpressions: API.OperationMethod<
  DescribeExpressionsRequest,
  DescribeExpressionsResponse,
  DescribeExpressionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainName: 0, ExpressionNames: 0, Deployed: 0 },
    output: { Expressions: D.list(o_ExpressionStatus) },
  },
  errors: [BaseException, InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExpressions",
})) as any;

export type DescribeIndexFieldsError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets information about the index fields configured for the search domain.
 * Can be limited to specific fields by name. By default, shows all fields and includes any pending changes to the configuration. Set the `Deployed` option to `true` to show the active configuration and exclude pending changes. For more information,
 * see Getting Domain Information in the *Amazon CloudSearch Developer Guide*.
 */
export const describeIndexFields: API.OperationMethod<
  DescribeIndexFieldsRequest,
  DescribeIndexFieldsResponse,
  DescribeIndexFieldsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainName: 0, FieldNames: 0, Deployed: 0 },
    output: { IndexFields: D.list(o_IndexFieldStatus) },
  },
  errors: [BaseException, InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIndexFields",
})) as any;

export type DescribeScalingParametersError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the scaling parameters configured for a domain. A domain's scaling parameters specify the desired search instance type and replication count. For more information, see Configuring Scaling Options in the *Amazon CloudSearch Developer Guide*.
 */
export const describeScalingParameters: API.OperationMethod<
  DescribeScalingParametersRequest,
  DescribeScalingParametersResponse,
  DescribeScalingParametersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainName: 0 },
    output: { ScalingParameters: o_ScalingParametersStatus },
  },
  errors: [BaseException, InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScalingParameters",
})) as any;

export type DescribeServiceAccessPoliciesError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets information about the access policies that control access to the domain's document and search endpoints. By default, shows the configuration with any pending changes. Set the `Deployed` option to `true` to show the active configuration and exclude pending changes. For more information,
 * see Configuring Access for a Search Domain in the *Amazon CloudSearch Developer Guide*.
 */
export const describeServiceAccessPolicies: API.OperationMethod<
  DescribeServiceAccessPoliciesRequest,
  DescribeServiceAccessPoliciesResponse,
  DescribeServiceAccessPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainName: 0, Deployed: 0 },
    output: { AccessPolicies: o_AccessPoliciesStatus },
  },
  errors: [BaseException, InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServiceAccessPolicies",
})) as any;

export type DescribeSuggestersError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the suggesters configured for a domain. A suggester enables you to display possible matches before users finish typing their queries. Can be limited to specific suggesters by name. By default, shows all suggesters and includes any pending changes to the configuration. Set the `Deployed` option to `true` to show the active configuration and exclude pending changes. For more information, see Getting Search Suggestions in the *Amazon CloudSearch Developer Guide*.
 */
export const describeSuggesters: API.OperationMethod<
  DescribeSuggestersRequest,
  DescribeSuggestersResponse,
  DescribeSuggestersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainName: 0, SuggesterNames: 0, Deployed: 0 },
    output: { Suggesters: D.list(o_SuggesterStatus) },
  },
  errors: [BaseException, InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSuggesters",
})) as any;

export type IndexDocumentsError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Tells the search domain to start indexing its documents using the latest indexing options. This operation must be invoked to activate options whose OptionStatus is `RequiresIndexDocuments`.
 */
export const indexDocuments: API.OperationMethod<
  IndexDocumentsRequest,
  IndexDocumentsResponse,
  IndexDocumentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainName: 0 },
    output: { FieldNames: D.list() },
  },
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "IndexDocuments",
})) as any;

export type ListDomainNamesError = BaseException | CommonErrors;
/**
 * Lists all search domains owned by an account.
 */
export const listDomainNames: API.OperationMethod<
  ListDomainNamesRequest,
  ListDomainNamesResponse,
  ListDomainNamesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, output: { DomainNames: D.map() } },
  errors: [BaseException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomainNames",
})) as any;

export type UpdateAvailabilityOptionsError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Configures the availability options for a domain. Enabling the Multi-AZ option expands an Amazon CloudSearch domain to an additional Availability Zone in the same Region to increase fault tolerance in the event of a service disruption. Changes to the Multi-AZ option can take about half an hour to become active. For more information, see Configuring Availability Options in the *Amazon CloudSearch Developer Guide*.
 */
export const updateAvailabilityOptions: API.OperationMethod<
  UpdateAvailabilityOptionsRequest,
  UpdateAvailabilityOptionsResponse,
  UpdateAvailabilityOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainName: 0, MultiAZ: 0 },
    output: { AvailabilityOptions: o_AvailabilityOptionsStatus },
  },
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAvailabilityOptions",
})) as any;

export type UpdateDomainEndpointOptionsError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the domain's endpoint options, specifically whether all requests to the domain must arrive over HTTPS. For more information, see Configuring Domain Endpoint Options in the *Amazon CloudSearch Developer Guide*.
 */
export const updateDomainEndpointOptions: API.OperationMethod<
  UpdateDomainEndpointOptionsRequest,
  UpdateDomainEndpointOptionsResponse,
  UpdateDomainEndpointOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DomainName: 0,
      DomainEndpointOptions: { EnforceHTTPS: 0, TLSSecurityPolicy: 0 },
    },
    output: { DomainEndpointOptions: o_DomainEndpointOptionsStatus },
  },
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDomainEndpointOptions",
})) as any;

export type UpdateScalingParametersError =
  | BaseException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Configures scaling parameters for a domain. A domain's scaling parameters specify the desired search instance type and replication count. Amazon CloudSearch will still automatically scale your domain based on the volume of data and traffic, but not below the desired instance type and replication count. If the Multi-AZ option is enabled, these values control the resources used per Availability Zone. For more information, see Configuring Scaling Options in the *Amazon CloudSearch Developer Guide*.
 */
export const updateScalingParameters: API.OperationMethod<
  UpdateScalingParametersRequest,
  UpdateScalingParametersResponse,
  UpdateScalingParametersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DomainName: 0,
      ScalingParameters: {
        DesiredInstanceType: 0,
        DesiredReplicationCount: 0,
        DesiredPartitionCount: 0,
      },
    },
    output: { ScalingParameters: o_ScalingParametersStatus },
  },
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateScalingParameters",
})) as any;

export type UpdateServiceAccessPoliciesError =
  | BaseException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Configures the access rules that control access to the domain's document and search endpoints.
 * For more information, see
 * Configuring Access for an Amazon CloudSearch Domain.
 */
export const updateServiceAccessPolicies: API.OperationMethod<
  UpdateServiceAccessPoliciesRequest,
  UpdateServiceAccessPoliciesResponse,
  UpdateServiceAccessPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DomainName: 0, AccessPolicies: 0 },
    output: { AccessPolicies: o_AccessPoliciesStatus },
  },
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceAccessPolicies",
})) as any;

const o_AccessPoliciesStatus: D.LazyStruct = () => ({ Status: o_OptionStatus });
const o_AnalysisSchemeStatus: D.LazyStruct = () => ({
  Options: { AnalysisOptions: {} },
  Status: o_OptionStatus,
});
const o_AvailabilityOptionsStatus: D.LazyStruct = () => ({
  Options: D.bool,
  Status: o_OptionStatus,
});
const o_DomainEndpointOptionsStatus: D.LazyStruct = () => ({
  Options: { EnforceHTTPS: D.bool },
  Status: o_OptionStatus,
});
const o_DomainStatus: D.LazyStruct = () => ({
  Created: D.bool,
  Deleted: D.bool,
  DocService: {},
  SearchService: {},
  RequiresIndexDocuments: D.bool,
  Processing: D.bool,
  SearchPartitionCount: D.num,
  SearchInstanceCount: D.num,
  Limits: { MaximumReplicationCount: D.num, MaximumPartitionCount: D.num },
});
const o_ExpressionStatus: D.LazyStruct = () => ({
  Options: {},
  Status: o_OptionStatus,
});
const o_IndexFieldStatus: D.LazyStruct = () => ({
  Options: {
    IntOptions: {
      DefaultValue: D.num,
      FacetEnabled: D.bool,
      SearchEnabled: D.bool,
      ReturnEnabled: D.bool,
      SortEnabled: D.bool,
    },
    DoubleOptions: {
      DefaultValue: D.num,
      FacetEnabled: D.bool,
      SearchEnabled: D.bool,
      ReturnEnabled: D.bool,
      SortEnabled: D.bool,
    },
    LiteralOptions: {
      FacetEnabled: D.bool,
      SearchEnabled: D.bool,
      ReturnEnabled: D.bool,
      SortEnabled: D.bool,
    },
    TextOptions: {
      ReturnEnabled: D.bool,
      SortEnabled: D.bool,
      HighlightEnabled: D.bool,
    },
    DateOptions: {
      FacetEnabled: D.bool,
      SearchEnabled: D.bool,
      ReturnEnabled: D.bool,
      SortEnabled: D.bool,
    },
    LatLonOptions: {
      FacetEnabled: D.bool,
      SearchEnabled: D.bool,
      ReturnEnabled: D.bool,
      SortEnabled: D.bool,
    },
    IntArrayOptions: {
      DefaultValue: D.num,
      FacetEnabled: D.bool,
      SearchEnabled: D.bool,
      ReturnEnabled: D.bool,
    },
    DoubleArrayOptions: {
      DefaultValue: D.num,
      FacetEnabled: D.bool,
      SearchEnabled: D.bool,
      ReturnEnabled: D.bool,
    },
    LiteralArrayOptions: {
      FacetEnabled: D.bool,
      SearchEnabled: D.bool,
      ReturnEnabled: D.bool,
    },
    TextArrayOptions: { ReturnEnabled: D.bool, HighlightEnabled: D.bool },
    DateArrayOptions: {
      FacetEnabled: D.bool,
      SearchEnabled: D.bool,
      ReturnEnabled: D.bool,
    },
  },
  Status: o_OptionStatus,
});
const o_ScalingParametersStatus: D.LazyStruct = () => ({
  Options: { DesiredReplicationCount: D.num, DesiredPartitionCount: D.num },
  Status: o_OptionStatus,
});
const o_SuggesterStatus: D.LazyStruct = () => ({
  Options: { DocumentSuggesterOptions: {} },
  Status: o_OptionStatus,
});
const o_OptionStatus: D.LazyStruct = () => ({
  CreationDate: D.ts,
  UpdateDate: D.ts,
  UpdateVersion: D.num,
  PendingDeletion: D.bool,
});
