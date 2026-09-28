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
  sdkId: "TrustedAdvisor",
  target: "TrustedAdvisor",
  version: "2022-09-15",
  sigv4: "trustedadvisor",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://trustedadvisor.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://trustedadvisor.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export type RecommendationResourceArn = string;
export interface RecommendationResourceExclusion {
  arn: string;
  isExcluded: boolean;
}
export type RecommendationResourceExclusionList =
  RecommendationResourceExclusion[];
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
export type AccountRecommendationLifecycleSummaryList =
  AccountRecommendationLifecycleSummary[];
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
export type OrganizationRecommendationSummaryList =
  OrganizationRecommendationSummary[];
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
export type RecommendationForResourceSummaryList =
  RecommendationForResourceSummary[];
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
  descriptor: {
    service: svc,
    http: "PUT /v1/batch-update-recommendation-resource-exclusion",
    input: {
      recommendationResourceExclusions: D.list({ arn: 0, isExcluded: 0 }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/organization-recommendations/{organizationRecommendationIdentifier}",
    input: { organizationRecommendationIdentifier: 0 },
    output: {
      organizationRecommendation: {
        createdAt: D.ts,
        lastUpdatedAt: D.ts,
        updateReason: D.secret,
        resolvedAt: D.ts,
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
  operationName: "GetOrganizationRecommendation",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/recommendations/{recommendationIdentifier}",
    input: {
      recommendationIdentifier: 0,
      language: D.m({ query: "language" }),
    },
    output: {
      recommendation: {
        createdAt: D.ts,
        lastUpdatedAt: D.ts,
        updateReason: D.secret,
        resolvedAt: D.ts,
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
  operationName: "GetRecommendation",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/checks",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      pillar: D.m({ query: "pillar" }),
      awsService: D.m({ query: "awsService" }),
      source: D.m({ query: "source" }),
      language: D.m({ query: "language" }),
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
  descriptor: {
    service: svc,
    http: "GET /v1/organization-recommendations/{organizationRecommendationIdentifier}/accounts",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      organizationRecommendationIdentifier: 0,
      affectedAccountId: D.m({ query: "affectedAccountId" }),
    },
    output: {
      accountRecommendationLifecycleSummaries: D.list({
        updateReason: D.secret,
        lastUpdatedAt: D.ts,
      }),
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
  descriptor: {
    service: svc,
    http: "GET /v1/organization-recommendations/{organizationRecommendationIdentifier}/resources",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      status: D.m({ query: "status" }),
      exclusionStatus: D.m({ query: "exclusionStatus" }),
      regionCode: D.m({ query: "regionCode" }),
      organizationRecommendationIdentifier: 0,
      affectedAccountId: D.m({ query: "affectedAccountId" }),
    },
    output: {
      organizationRecommendationResourceSummaries: D.list({
        lastUpdatedAt: D.ts,
      }),
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
  descriptor: {
    service: svc,
    http: "GET /v1/organization-recommendations",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      type: D.m({ query: "type" }),
      status: D.m({ query: "status" }),
      pillar: D.m({ query: "pillar" }),
      awsService: D.m({ query: "awsService" }),
      source: D.m({ query: "source" }),
      checkIdentifier: D.m({ query: "checkIdentifier" }),
      afterLastUpdatedAt: D.m({
        query: "afterLastUpdatedAt",
        shape: D.tsAs("epoch-seconds"),
      }),
      beforeLastUpdatedAt: D.m({
        query: "beforeLastUpdatedAt",
        shape: D.tsAs("epoch-seconds"),
      }),
    },
    output: {
      organizationRecommendationSummaries: D.list({
        createdAt: D.ts,
        lastUpdatedAt: D.ts,
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
  descriptor: {
    service: svc,
    http: "GET /v1/recommendations/{recommendationIdentifier}/resources",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      status: D.m({ query: "status" }),
      exclusionStatus: D.m({ query: "exclusionStatus" }),
      regionCode: D.m({ query: "regionCode" }),
      recommendationIdentifier: 0,
      language: D.m({ query: "language" }),
    },
    output: {
      recommendationResourceSummaries: D.list({ lastUpdatedAt: D.ts }),
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
  descriptor: {
    service: svc,
    http: "GET /v1/recommendations",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      type: D.m({ query: "type" }),
      status: D.m({ query: "status" }),
      pillar: D.m({ query: "pillar" }),
      awsService: D.m({ query: "awsService" }),
      source: D.m({ query: "source" }),
      checkIdentifier: D.m({ query: "checkIdentifier" }),
      afterLastUpdatedAt: D.m({
        query: "afterLastUpdatedAt",
        shape: D.tsAs("epoch-seconds"),
      }),
      beforeLastUpdatedAt: D.m({
        query: "beforeLastUpdatedAt",
        shape: D.tsAs("epoch-seconds"),
      }),
      language: D.m({ query: "language" }),
    },
    output: {
      recommendationSummaries: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts }),
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
  descriptor: {
    service: svc,
    http: "GET /v1/recommendations-for-resource/{awsResourceArn}",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      awsResourceArn: 0,
      pillar: D.m({ query: "pillar" }),
      status: D.m({ query: "status" }),
      checkArn: D.m({ query: "checkArn" }),
      language: D.m({ query: "language" }),
    },
    output: {
      recommendationForResourceSummaries: D.list({ lastUpdatedAt: D.ts }),
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
  descriptor: {
    service: svc,
    http: "PUT /v1/organization-recommendations/{organizationRecommendationIdentifier}/lifecycle",
    input: {
      lifecycleStage: 0,
      updateReason: 0,
      updateReasonCode: 0,
      organizationRecommendationIdentifier: 0,
    },
    body: true,
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
  operationName: "UpdateOrganizationRecommendationLifecycle",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v1/recommendations/{recommendationIdentifier}/lifecycle",
    input: {
      lifecycleStage: 0,
      updateReason: 0,
      updateReasonCode: 0,
      recommendationIdentifier: 0,
    },
    body: true,
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
  operationName: "UpdateRecommendationLifecycle",
})) as any;
