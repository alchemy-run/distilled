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
  sdkId: "TrustedAdvisor",
  serviceShapeName: "TrustedAdvisor",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "trustedadvisor" });
const ver = /*@__PURE__*/ T.ServiceVersion("2022-09-15");
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
              `https://trustedadvisor-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://trustedadvisor-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://trustedadvisor.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://trustedadvisor.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://trustedadvisor.{R}.{D}","properties":{},"headers":{}}');

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
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type RecommendationResourceArn = string;
export interface RecommendationResourceExclusion {
  arn: string;
  isExcluded: boolean;
}
export type RecommendationResourceExclusionList = RecommendationResourceExclusion[];
export interface BatchUpdateRecommendationResourceExclusionRequest {
  recommendationResourceExclusions: RecommendationResourceExclusion[];
}
export interface UpdateRecommendationResourceExclusionError {
  arn?: string;
  errorCode?: string;
  errorMessage?: string;
}
export type UpdateRecommendationResourceExclusionErrorList =
  UpdateRecommendationResourceExclusionError[];
export interface BatchUpdateRecommendationResourceExclusionResponse {
  batchUpdateRecommendationResourceExclusionErrors: UpdateRecommendationResourceExclusionError[];
}
export type OrganizationRecommendationIdentifier = string;
export interface GetOrganizationRecommendationRequest {
  organizationRecommendationIdentifier: string;
}
export type RecommendationType = "standard" | "priority" | (string & {});
export type RecommendationStatus = "ok" | "warning" | "error" | (string & {});
export type RecommendationLifecycleStage =
  | "in_progress"
  | "pending_response"
  | "dismissed"
  | "resolved"
  | (string & {});
export type RecommendationPillar =
  | "cost_optimizing"
  | "performance"
  | "security"
  | "service_limits"
  | "fault_tolerance"
  | "operational_excellence"
  | (string & {});
export type RecommendationPillarList = RecommendationPillar[];
export type RecommendationSource =
  | "aws_config"
  | "compute_optimizer"
  | "cost_explorer"
  | "lse"
  | "manual"
  | "pse"
  | "rds"
  | "resilience"
  | "resilience_hub"
  | "security_hub"
  | "stir"
  | "ta_check"
  | "well_architected"
  | "cost_optimization_hub"
  | (string & {});
export type RecommendationAwsService = string;
export type RecommendationAwsServiceList = string[];
export interface RecommendationResourcesAggregates {
  okCount: number;
  warningCount: number;
  errorCount: number;
  excludedCount?: number;
}
export interface RecommendationCostOptimizingAggregates {
  estimatedMonthlySavings: number;
  estimatedPercentMonthlySavings: number;
}
export interface RecommendationPillarSpecificAggregates {
  costOptimizing?: RecommendationCostOptimizingAggregates;
}
export type OrganizationRecommendationArn = string;
export type RecommendationUpdateReason = string | redacted.Redacted<string>;
export type UpdateRecommendationLifecycleStageReasonCode =
  | "non_critical_account"
  | "temporary_account"
  | "valid_business_case"
  | "other_methods_available"
  | "low_priority"
  | "not_applicable"
  | "other"
  | (string & {});
export interface OrganizationRecommendation {
  id: string;
  type: RecommendationType;
  checkArn?: string;
  status: RecommendationStatus;
  lifecycleStage?: RecommendationLifecycleStage;
  pillars: RecommendationPillar[];
  source: RecommendationSource;
  awsServices?: string[];
  name: string;
  resourcesAggregates: RecommendationResourcesAggregates;
  pillarSpecificAggregates?: RecommendationPillarSpecificAggregates;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  arn: string;
  description: string;
  createdBy?: string;
  updatedOnBehalfOf?: string;
  updatedOnBehalfOfJobTitle?: string;
  updateReason?: string | redacted.Redacted<string>;
  updateReasonCode?: UpdateRecommendationLifecycleStageReasonCode;
  resolvedAt?: Date;
}
export interface GetOrganizationRecommendationResponse {
  organizationRecommendation?: OrganizationRecommendation;
}
export type AccountRecommendationIdentifier = string;
export type RecommendationLanguage =
  | "en"
  | "ja"
  | "zh"
  | "fr"
  | "de"
  | "ko"
  | "zh_TW"
  | "it"
  | "es"
  | "pt_BR"
  | "id"
  | (string & {});
export interface GetRecommendationRequest {
  recommendationIdentifier: string;
  language?: RecommendationLanguage;
}
export type AccountRecommendationArn = string;
export type StatusReason = "no_data_ok" | (string & {});
export interface Recommendation {
  id: string;
  type: RecommendationType;
  checkArn?: string;
  status: RecommendationStatus;
  lifecycleStage?: RecommendationLifecycleStage;
  pillars: RecommendationPillar[];
  source: RecommendationSource;
  awsServices?: string[];
  name: string;
  resourcesAggregates: RecommendationResourcesAggregates;
  pillarSpecificAggregates?: RecommendationPillarSpecificAggregates;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  arn: string;
  statusReason?: StatusReason;
  description: string;
  createdBy?: string;
  updatedOnBehalfOf?: string;
  updatedOnBehalfOfJobTitle?: string;
  updateReason?: string | redacted.Redacted<string>;
  updateReasonCode?: UpdateRecommendationLifecycleStageReasonCode;
  resolvedAt?: Date;
}
export interface GetRecommendationResponse {
  recommendation?: Recommendation;
}
export interface ListChecksRequest {
  nextToken?: string;
  maxResults?: number;
  pillar?: RecommendationPillar;
  awsService?: string;
  source?: RecommendationSource;
  language?: RecommendationLanguage;
}
export type CheckArn = string;
export type StringMap = { [key: string]: string | undefined };
export type StringList = string[];
export interface CheckSummary {
  id: string;
  arn: string;
  name: string;
  description: string;
  pillars: RecommendationPillar[];
  awsServices: string[];
  source: RecommendationSource;
  metadata: { [key: string]: string | undefined };
  resourceArnQueryable?: boolean;
  awsResourceTypes?: string[];
  checkGranularity?: string;
  recommendationId?: string;
}
export type CheckSummaryList = CheckSummary[];
export interface ListChecksResponse {
  nextToken?: string;
  checkSummaries: CheckSummary[];
}
export type AccountId = string;
export interface ListOrganizationRecommendationAccountsRequest {
  nextToken?: string;
  maxResults?: number;
  organizationRecommendationIdentifier: string;
  affectedAccountId?: string;
}
export interface AccountRecommendationLifecycleSummary {
  accountId?: string;
  accountRecommendationArn?: string;
  lifecycleStage?: RecommendationLifecycleStage;
  updatedOnBehalfOf?: string;
  updatedOnBehalfOfJobTitle?: string;
  updateReason?: string | redacted.Redacted<string>;
  updateReasonCode?: UpdateRecommendationLifecycleStageReasonCode;
  lastUpdatedAt?: Date;
}
export type AccountRecommendationLifecycleSummaryList = AccountRecommendationLifecycleSummary[];
export interface ListOrganizationRecommendationAccountsResponse {
  nextToken?: string;
  accountRecommendationLifecycleSummaries: AccountRecommendationLifecycleSummary[];
}
export type ResourceStatus = "ok" | "warning" | "error" | (string & {});
export type ExclusionStatus = "excluded" | "included" | (string & {});
export interface ListOrganizationRecommendationResourcesRequest {
  nextToken?: string;
  maxResults?: number;
  status?: ResourceStatus;
  exclusionStatus?: ExclusionStatus;
  regionCode?: string;
  organizationRecommendationIdentifier: string;
  affectedAccountId?: string;
}
export type RecommendationRegionCode = string;
export interface OrganizationRecommendationResourceSummary {
  id: string;
  arn: string;
  awsResourceId: string;
  regionCode: string;
  status: ResourceStatus;
  metadata: { [key: string]: string | undefined };
  lastUpdatedAt: Date;
  exclusionStatus?: ExclusionStatus;
  accountId?: string;
  recommendationArn: string;
}
export type OrganizationRecommendationResourceSummaryList =
  OrganizationRecommendationResourceSummary[];
export interface ListOrganizationRecommendationResourcesResponse {
  nextToken?: string;
  organizationRecommendationResourceSummaries: OrganizationRecommendationResourceSummary[];
}
export type CheckIdentifier = string;
export interface ListOrganizationRecommendationsRequest {
  nextToken?: string;
  maxResults?: number;
  type?: RecommendationType;
  status?: RecommendationStatus;
  pillar?: RecommendationPillar;
  awsService?: string;
  source?: RecommendationSource;
  checkIdentifier?: string;
  afterLastUpdatedAt?: Date;
  beforeLastUpdatedAt?: Date;
}
export interface OrganizationRecommendationSummary {
  id: string;
  type: RecommendationType;
  checkArn?: string;
  status: RecommendationStatus;
  lifecycleStage?: RecommendationLifecycleStage;
  pillars: RecommendationPillar[];
  source: RecommendationSource;
  awsServices?: string[];
  name: string;
  resourcesAggregates: RecommendationResourcesAggregates;
  pillarSpecificAggregates?: RecommendationPillarSpecificAggregates;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  arn: string;
}
export type OrganizationRecommendationSummaryList = OrganizationRecommendationSummary[];
export interface ListOrganizationRecommendationsResponse {
  nextToken?: string;
  organizationRecommendationSummaries: OrganizationRecommendationSummary[];
}
export interface ListRecommendationResourcesRequest {
  nextToken?: string;
  maxResults?: number;
  status?: ResourceStatus;
  exclusionStatus?: ExclusionStatus;
  regionCode?: string;
  recommendationIdentifier: string;
  language?: RecommendationLanguage;
}
export interface RecommendationResourceSummary {
  id: string;
  arn: string;
  awsResourceId: string;
  regionCode: string;
  status: ResourceStatus;
  metadata: { [key: string]: string | undefined };
  lastUpdatedAt: Date;
  exclusionStatus?: ExclusionStatus;
  recommendationArn: string;
}
export type RecommendationResourceSummaryList = RecommendationResourceSummary[];
export interface ListRecommendationResourcesResponse {
  nextToken?: string;
  recommendationResourceSummaries: RecommendationResourceSummary[];
}
export interface ListRecommendationsRequest {
  nextToken?: string;
  maxResults?: number;
  type?: RecommendationType;
  status?: RecommendationStatus;
  pillar?: RecommendationPillar;
  awsService?: string;
  source?: RecommendationSource;
  checkIdentifier?: string;
  afterLastUpdatedAt?: Date;
  beforeLastUpdatedAt?: Date;
  language?: RecommendationLanguage;
}
export interface RecommendationSummary {
  id: string;
  type: RecommendationType;
  checkArn?: string;
  status: RecommendationStatus;
  lifecycleStage?: RecommendationLifecycleStage;
  pillars: RecommendationPillar[];
  source: RecommendationSource;
  awsServices?: string[];
  name: string;
  resourcesAggregates: RecommendationResourcesAggregates;
  pillarSpecificAggregates?: RecommendationPillarSpecificAggregates;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  arn: string;
  statusReason?: StatusReason;
}
export type RecommendationSummaryList = RecommendationSummary[];
export interface ListRecommendationsResponse {
  nextToken?: string;
  recommendationSummaries: RecommendationSummary[];
}
export type AwsResourceArn = string;
export interface ListRecommendationsForResourceRequest {
  nextToken?: string;
  maxResults?: number;
  awsResourceArn: string;
  pillar?: RecommendationPillar;
  status?: ResourceStatus;
  checkArn?: string;
  language?: RecommendationLanguage;
}
export interface RecommendationForResourceSummary {
  checkArn: string;
  recommendationArn: string;
  awsResourceArn: string;
  status: ResourceStatus;
  lastUpdatedAt: Date;
  exclusionStatus: ExclusionStatus;
  metadata: { [key: string]: string | undefined };
  pillars: RecommendationPillar[];
}
export type RecommendationForResourceSummaryList = RecommendationForResourceSummary[];
export interface ListRecommendationsForResourceResponse {
  nextToken?: string;
  recommendationForResourceSummaries: RecommendationForResourceSummary[];
}
export type UpdateRecommendationLifecycleStage =
  | "pending_response"
  | "in_progress"
  | "dismissed"
  | "resolved"
  | (string & {});
export interface UpdateOrganizationRecommendationLifecycleRequest {
  lifecycleStage: UpdateRecommendationLifecycleStage;
  updateReason?: string | redacted.Redacted<string>;
  updateReasonCode?: UpdateRecommendationLifecycleStageReasonCode;
  organizationRecommendationIdentifier: string;
}
export interface UpdateOrganizationRecommendationLifecycleResponse {}
export interface UpdateRecommendationLifecycleRequest {
  lifecycleStage: UpdateRecommendationLifecycleStage;
  updateReason?: string | redacted.Redacted<string>;
  updateReasonCode?: UpdateRecommendationLifecycleStageReasonCode;
  recommendationIdentifier: string;
}
export interface UpdateRecommendationLifecycleResponse {}
export type BatchUpdateRecommendationResourceExclusionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update one or more exclusion statuses for a list of recommendation resources. This API supports up to 25 unique recommendation resource ARNs per request. This API currently doesn't support prioritized recommendation resources. This API updates global recommendations, eliminating the need to call the API in each AWS Region. After submitting an exclusion update, note that it might take a few minutes for the changes to be reflected in the system.
 */
export const batchUpdateRecommendationResourceExclusion: API.OperationMethod<
  BatchUpdateRecommendationResourceExclusionRequest,
  BatchUpdateRecommendationResourceExclusionResponse,
  BatchUpdateRecommendationResourceExclusionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(74, __c9, 2) as any as S.Schema<BatchUpdateRecommendationResourceExclusionRequest>,
  output: __S(77, __c9, 5) as any as S.Schema<BatchUpdateRecommendationResourceExclusionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateRecommendationResourceExclusion",
}));

export type GetOrganizationRecommendationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a specific recommendation within an AWS Organizations organization. This API supports only prioritized recommendations and provides global priority recommendations, eliminating the need to call the API in each AWS Region.
 */
export const getOrganizationRecommendation: API.OperationMethod<
  GetOrganizationRecommendationRequest,
  GetOrganizationRecommendationResponse,
  GetOrganizationRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<GetOrganizationRecommendationRequest>,
  output: __S(82, __c10, 2) as any as S.Schema<GetOrganizationRecommendationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOrganizationRecommendation",
}));

export type GetRecommendationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a specific Recommendation. This API provides global recommendations, eliminating the need to call the API in each AWS Region.
 */
export const getRecommendation: API.OperationMethod<
  GetRecommendationRequest,
  GetRecommendationResponse,
  GetRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<GetRecommendationRequest>,
  output: __S(114, __c14, 2) as any as S.Schema<GetRecommendationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecommendation",
}));

export type ListChecksError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List a filterable set of Checks. This API provides global recommendations, eliminating the need to call the API in each AWS Region.
 */
export const listChecks: API.PaginatedOperationMethod<
  ListChecksRequest,
  ListChecksResponse,
  ListChecksError,
  Credentials | HttpClient.HttpClient,
  CheckSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<ListChecksRequest>,
  output: __S(123, __c15, 3) as any as S.Schema<ListChecksResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChecks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "checkSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListOrganizationRecommendationAccountsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the accounts that own the resources for an organization aggregate recommendation. This API only supports prioritized recommendations and provides global priority recommendations, eliminating the need to call the API in each AWS Region.
 */
export const listOrganizationRecommendationAccounts: API.PaginatedOperationMethod<
  ListOrganizationRecommendationAccountsRequest,
  ListOrganizationRecommendationAccountsResponse,
  ListOrganizationRecommendationAccountsError,
  Credentials | HttpClient.HttpClient,
  AccountRecommendationLifecycleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<ListOrganizationRecommendationAccountsRequest>,
  output: __S(3, __c0, 3) as any as S.Schema<ListOrganizationRecommendationAccountsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOrganizationRecommendationAccounts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "accountRecommendationLifecycleSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListOrganizationRecommendationResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List Resources of a Recommendation within an Organization. This API only supports prioritized recommendations and provides global priority recommendations, eliminating the need to call the API in each AWS Region.
 */
export const listOrganizationRecommendationResources: API.PaginatedOperationMethod<
  ListOrganizationRecommendationResourcesRequest,
  ListOrganizationRecommendationResourcesResponse,
  ListOrganizationRecommendationResourcesError,
  Credentials | HttpClient.HttpClient,
  OrganizationRecommendationResourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(8, __c1, 0) as any as S.Schema<ListOrganizationRecommendationResourcesRequest>,
  output: __S(11, __c1, 3) as any as S.Schema<ListOrganizationRecommendationResourcesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOrganizationRecommendationResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "organizationRecommendationResourceSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListOrganizationRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List a filterable set of Recommendations within an Organization. This API only supports prioritized recommendations and provides global priority recommendations, eliminating the need to call the API in each AWS Region.
 */
export const listOrganizationRecommendations: API.PaginatedOperationMethod<
  ListOrganizationRecommendationsRequest,
  ListOrganizationRecommendationsResponse,
  ListOrganizationRecommendationsError,
  Credentials | HttpClient.HttpClient,
  OrganizationRecommendationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(16, __c2, 0) as any as S.Schema<ListOrganizationRecommendationsRequest>,
  output: __S(19, __c2, 3) as any as S.Schema<ListOrganizationRecommendationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOrganizationRecommendations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "organizationRecommendationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecommendationResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List Resources of a Recommendation. This API provides global recommendations, eliminating the need to call the API in each AWS Region.
 */
export const listRecommendationResources: API.PaginatedOperationMethod<
  ListRecommendationResourcesRequest,
  ListRecommendationResourcesResponse,
  ListRecommendationResourcesError,
  Credentials | HttpClient.HttpClient,
  RecommendationResourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<ListRecommendationResourcesRequest>,
  output: __S(27, __c3, 3) as any as S.Schema<ListRecommendationResourcesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommendationResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recommendationResourceSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List a filterable set of Recommendations. This API provides global recommendations, eliminating the need to call the API in each AWS Region.
 */
export const listRecommendations: API.PaginatedOperationMethod<
  ListRecommendationsRequest,
  ListRecommendationsResponse,
  ListRecommendationsError,
  Credentials | HttpClient.HttpClient,
  RecommendationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<ListRecommendationsRequest>,
  output: __S(35, __c4, 3) as any as S.Schema<ListRecommendationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommendations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recommendationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecommendationsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all Trusted Advisor recommendations for a given AWS resource ARN.
 */
export const listRecommendationsForResource: API.PaginatedOperationMethod<
  ListRecommendationsForResourceRequest,
  ListRecommendationsForResourceResponse,
  ListRecommendationsForResourceError,
  Credentials | HttpClient.HttpClient,
  RecommendationForResourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<ListRecommendationsForResourceRequest>,
  output: __S(43, __c5, 3) as any as S.Schema<ListRecommendationsForResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommendationsForResource",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recommendationForResourceSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type UpdateOrganizationRecommendationLifecycleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the lifecycle of a Recommendation within an Organization. This API only supports prioritized recommendations and updates global priority recommendations, eliminating the need to call the API in each AWS Region.
 */
export const updateOrganizationRecommendationLifecycle: API.OperationMethod<
  UpdateOrganizationRecommendationLifecycleRequest,
  UpdateOrganizationRecommendationLifecycleResponse,
  UpdateOrganizationRecommendationLifecycleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<UpdateOrganizationRecommendationLifecycleRequest>,
  output: __S(56, __c7, 0) as any as S.Schema<UpdateOrganizationRecommendationLifecycleResponse>,
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
  operationName: "UpdateOrganizationRecommendationLifecycle",
}));

export type UpdateRecommendationLifecycleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the lifecyle of a Recommendation. This API only supports prioritized recommendations and updates global priority recommendations, eliminating the need to call the API in each AWS Region.
 */
export const updateRecommendationLifecycle: API.OperationMethod<
  UpdateRecommendationLifecycleRequest,
  UpdateRecommendationLifecycleResponse,
  UpdateRecommendationLifecycleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<UpdateRecommendationLifecycleRequest>,
  output: __S(56, __c7, 0) as any as S.Schema<UpdateRecommendationLifecycleResponse>,
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
  operationName: "UpdateRecommendationLifecycle",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          organizationRecommendationIdentifier: S.String.pipe(
            T.HttpLabel("organizationRecommendationIdentifier"),
          ),
          affectedAccountId: S.optional(S.String).pipe(T.HttpQuery("affectedAccountId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v1/organization-recommendations/{organizationRecommendationIdentifier}/accounts",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListOrganizationRecommendationAccountsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          accountId: S.optional(S.String),
          accountRecommendationArn: S.optional(S.String),
          lifecycleStage: S.optional(S.String),
          updatedOnBehalfOf: S.optional(S.String),
          updatedOnBehalfOfJobTitle: S.optional(S.String),
          updateReason: S.optional(SensitiveString),
          updateReasonCode: S.optional(S.String),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "AccountRecommendationLifecycleSummary" });
    case 2:
      return S.Array(__S(1, __c0, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          accountRecommendationLifecycleSummaries: __S(2, __c0, 2),
        }),
      ).annotate({ identifier: "ListOrganizationRecommendationAccountsResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          exclusionStatus: S.optional(S.String).pipe(T.HttpQuery("exclusionStatus")),
          regionCode: S.optional(S.String).pipe(T.HttpQuery("regionCode")),
          organizationRecommendationIdentifier: S.String.pipe(
            T.HttpLabel("organizationRecommendationIdentifier"),
          ),
          affectedAccountId: S.optional(S.String).pipe(T.HttpQuery("affectedAccountId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v1/organization-recommendations/{organizationRecommendationIdentifier}/resources",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListOrganizationRecommendationResourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          awsResourceId: S.String,
          regionCode: S.String,
          status: S.String,
          metadata: __S(128, __c16, 0),
          lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          exclusionStatus: S.optional(S.String),
          accountId: S.optional(S.String),
          recommendationArn: S.String,
        }),
      ).annotate({ identifier: "OrganizationRecommendationResourceSummary" });
    case 2:
      return S.Array(__S(9, __c1, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          organizationRecommendationResourceSummaries: __S(10, __c1, 2),
        }),
      ).annotate({ identifier: "ListOrganizationRecommendationResourcesResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          type: S.optional(S.String).pipe(T.HttpQuery("type")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          pillar: S.optional(S.String).pipe(T.HttpQuery("pillar")),
          awsService: S.optional(S.String).pipe(T.HttpQuery("awsService")),
          source: S.optional(S.String).pipe(T.HttpQuery("source")),
          checkIdentifier: S.optional(S.String).pipe(T.HttpQuery("checkIdentifier")),
          afterLastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("afterLastUpdatedAt"),
          ),
          beforeLastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("beforeLastUpdatedAt"),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/organization-recommendations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListOrganizationRecommendationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          type: S.String,
          checkArn: S.optional(S.String),
          status: S.String,
          lifecycleStage: S.optional(S.String),
          pillars: __S(104, __c13, 0),
          source: S.String,
          awsServices: S.optional(__S(96, __c12, 0)),
          name: S.String,
          resourcesAggregates: __S(88, __c11, 0),
          pillarSpecificAggregates: S.optional(__S(90, __c11, 2)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          arn: S.String,
        }),
      ).annotate({ identifier: "OrganizationRecommendationSummary" });
    case 2:
      return S.Array(__S(17, __c2, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          organizationRecommendationSummaries: __S(18, __c2, 2),
        }),
      ).annotate({ identifier: "ListOrganizationRecommendationsResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          exclusionStatus: S.optional(S.String).pipe(T.HttpQuery("exclusionStatus")),
          regionCode: S.optional(S.String).pipe(T.HttpQuery("regionCode")),
          recommendationIdentifier: S.String.pipe(T.HttpLabel("recommendationIdentifier")),
          language: S.optional(S.String).pipe(T.HttpQuery("language")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v1/recommendations/{recommendationIdentifier}/resources",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRecommendationResourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          awsResourceId: S.String,
          regionCode: S.String,
          status: S.String,
          metadata: __S(128, __c16, 0),
          lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          exclusionStatus: S.optional(S.String),
          recommendationArn: S.String,
        }),
      ).annotate({ identifier: "RecommendationResourceSummary" });
    case 2:
      return S.Array(__S(25, __c3, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          recommendationResourceSummaries: __S(26, __c3, 2),
        }),
      ).annotate({ identifier: "ListRecommendationResourcesResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          type: S.optional(S.String).pipe(T.HttpQuery("type")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          pillar: S.optional(S.String).pipe(T.HttpQuery("pillar")),
          awsService: S.optional(S.String).pipe(T.HttpQuery("awsService")),
          source: S.optional(S.String).pipe(T.HttpQuery("source")),
          checkIdentifier: S.optional(S.String).pipe(T.HttpQuery("checkIdentifier")),
          afterLastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("afterLastUpdatedAt"),
          ),
          beforeLastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("beforeLastUpdatedAt"),
          ),
          language: S.optional(S.String).pipe(T.HttpQuery("language")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/recommendations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRecommendationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          type: S.String,
          checkArn: S.optional(S.String),
          status: S.String,
          lifecycleStage: S.optional(S.String),
          pillars: __S(104, __c13, 0),
          source: S.String,
          awsServices: S.optional(__S(96, __c12, 0)),
          name: S.String,
          resourcesAggregates: __S(88, __c11, 0),
          pillarSpecificAggregates: S.optional(__S(90, __c11, 2)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          arn: S.String,
          statusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "RecommendationSummary" });
    case 2:
      return S.Array(__S(33, __c4, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), recommendationSummaries: __S(34, __c4, 2) }),
      ).annotate({ identifier: "ListRecommendationsResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          awsResourceArn: S.String.pipe(T.HttpLabel("awsResourceArn")),
          pillar: S.optional(S.String).pipe(T.HttpQuery("pillar")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          checkArn: S.optional(S.String).pipe(T.HttpQuery("checkArn")),
          language: S.optional(S.String).pipe(T.HttpQuery("language")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/recommendations-for-resource/{awsResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRecommendationsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          checkArn: S.String,
          recommendationArn: S.String,
          awsResourceArn: S.String,
          status: S.String,
          lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          exclusionStatus: S.String,
          metadata: __S(128, __c16, 0),
          pillars: __S(104, __c13, 0),
        }),
      ).annotate({ identifier: "RecommendationForResourceSummary" });
    case 2:
      return S.Array(__S(41, __c5, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          recommendationForResourceSummaries: __S(42, __c5, 2),
        }),
      ).annotate({ identifier: "ListRecommendationsForResourceResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          lifecycleStage: S.String,
          updateReason: S.optional(SensitiveString),
          updateReasonCode: S.optional(S.String),
          organizationRecommendationIdentifier: S.String.pipe(
            T.HttpLabel("organizationRecommendationIdentifier"),
          ),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v1/organization-recommendations/{organizationRecommendationIdentifier}/lifecycle",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateOrganizationRecommendationLifecycleRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "UpdateOrganizationRecommendationLifecycleResponse",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          lifecycleStage: S.String,
          updateReason: S.optional(SensitiveString),
          updateReasonCode: S.optional(S.String),
          recommendationIdentifier: S.String.pipe(T.HttpLabel("recommendationIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v1/recommendations/{recommendationIdentifier}/lifecycle",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRecommendationLifecycleRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ arn: S.String, isExcluded: S.Boolean })).annotate({
        identifier: "RecommendationResourceExclusion",
      });
    case 1:
      return S.Array(__S(72, __c9, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ recommendationResourceExclusions: __S(73, __c9, 1) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/batch-update-recommendation-resource-exclusion" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchUpdateRecommendationResourceExclusionRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          errorCode: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateRecommendationResourceExclusionError" });
    case 4:
      return S.Array(__S(75, __c9, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ batchUpdateRecommendationResourceExclusionErrors: __S(76, __c9, 4) }),
      ).annotate({ identifier: "BatchUpdateRecommendationResourceExclusionResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          organizationRecommendationIdentifier: S.String.pipe(
            T.HttpLabel("organizationRecommendationIdentifier"),
          ),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v1/organization-recommendations/{organizationRecommendationIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetOrganizationRecommendationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          type: S.String,
          checkArn: S.optional(S.String),
          status: S.String,
          lifecycleStage: S.optional(S.String),
          pillars: __S(104, __c13, 0),
          source: S.String,
          awsServices: S.optional(__S(96, __c12, 0)),
          name: S.String,
          resourcesAggregates: __S(88, __c11, 0),
          pillarSpecificAggregates: S.optional(__S(90, __c11, 2)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          arn: S.String,
          description: S.String,
          createdBy: S.optional(S.String),
          updatedOnBehalfOf: S.optional(S.String),
          updatedOnBehalfOfJobTitle: S.optional(S.String),
          updateReason: S.optional(SensitiveString),
          updateReasonCode: S.optional(S.String),
          resolvedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "OrganizationRecommendation" });
    case 2:
      return S.suspend(() =>
        S.Struct({ organizationRecommendation: S.optional(__S(81, __c10, 1)) }),
      ).annotate({ identifier: "GetOrganizationRecommendationResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          okCount: S.Number,
          warningCount: S.Number,
          errorCount: S.Number,
          excludedCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RecommendationResourcesAggregates" });
    case 1:
      return S.suspend(() =>
        S.Struct({ estimatedMonthlySavings: S.Number, estimatedPercentMonthlySavings: S.Number }),
      ).annotate({ identifier: "RecommendationCostOptimizingAggregates" });
    case 2:
      return S.suspend(() => S.Struct({ costOptimizing: S.optional(__S(89, __c11, 1)) })).annotate({
        identifier: "RecommendationPillarSpecificAggregates",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          recommendationIdentifier: S.String.pipe(T.HttpLabel("recommendationIdentifier")),
          language: S.optional(S.String).pipe(T.HttpQuery("language")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/recommendations/{recommendationIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRecommendationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          type: S.String,
          checkArn: S.optional(S.String),
          status: S.String,
          lifecycleStage: S.optional(S.String),
          pillars: __S(104, __c13, 0),
          source: S.String,
          awsServices: S.optional(__S(96, __c12, 0)),
          name: S.String,
          resourcesAggregates: __S(88, __c11, 0),
          pillarSpecificAggregates: S.optional(__S(90, __c11, 2)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          arn: S.String,
          statusReason: S.optional(S.String),
          description: S.String,
          createdBy: S.optional(S.String),
          updatedOnBehalfOf: S.optional(S.String),
          updatedOnBehalfOfJobTitle: S.optional(S.String),
          updateReason: S.optional(SensitiveString),
          updateReasonCode: S.optional(S.String),
          resolvedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "Recommendation" });
    case 2:
      return S.suspend(() => S.Struct({ recommendation: S.optional(__S(113, __c14, 1)) })).annotate(
        { identifier: "GetRecommendationResponse" },
      );
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          pillar: S.optional(S.String).pipe(T.HttpQuery("pillar")),
          awsService: S.optional(S.String).pipe(T.HttpQuery("awsService")),
          source: S.optional(S.String).pipe(T.HttpQuery("source")),
          language: S.optional(S.String).pipe(T.HttpQuery("language")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/v1/checks" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListChecksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          name: S.String,
          description: S.String,
          pillars: __S(104, __c13, 0),
          awsServices: __S(96, __c12, 0),
          source: S.String,
          metadata: __S(128, __c16, 0),
          resourceArnQueryable: S.optional(S.Boolean),
          awsResourceTypes: S.optional(__S(96, __c12, 0)),
          checkGranularity: S.optional(S.String),
          recommendationId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CheckSummary" });
    case 2:
      return S.Array(__S(121, __c15, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), checkSummaries: __S(122, __c15, 2) }),
      ).annotate({ identifier: "ListChecksResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
