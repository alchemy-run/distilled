import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_0Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "BCM Recommended Actions",
  target: "AWSBillingAndCostManagementRecommendedActions",
  version: "2024-11-14",
  sigv4: "bcm-recommended-actions",
  protocol: awsJson1_0Protocol,
  rules: (p, _) => {
    const { UseFIPS = false, Endpoint, Region } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    const _p0 = (_0: unknown) => ({
      authSchemes: [
        {
          name: "sigv4",
          signingRegion: `${_.getAttr(_0, "implicitGlobalRegion")}`,
        },
      ],
    });
    if (Endpoint != null) {
      if (UseFIPS === true) {
        return err(
          "Invalid Configuration: FIPS and custom endpoint are not supported",
        );
      }
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (UseFIPS === true) {
            return e(
              `https://bcm-recommended-actions-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              _p0(PartitionResult),
              {},
            );
          }
          return e(
            `https://bcm-recommended-actions.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            _p0(PartitionResult),
            {},
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    code: "BCMRecommendedActionsAccessDenied",
    status: 403,
  })<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { code: "BCMRecommendedActionsInternalServer", status: 500 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { code: "BCMRecommendedActionsThrottling", status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { code: "BCMRecommendedActionsValidation", status: 400 },
  )<{
    readonly message: string;
    readonly reason: ValidationExceptionReason;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
export type FilterName = "FEATURE" | "SEVERITY" | "TYPE" | (string & {});
export type MatchOption = "EQUALS" | "NOT_EQUALS" | (string & {});
export type FilterValue = string;
export type FilterValues = string[];
export interface ActionFilter {
  key: FilterName;
  matchOption: MatchOption;
  values: string[];
}
export type ActionFilterList = ActionFilter[];
export interface RequestFilter {
  actions?: ActionFilter[];
}
export type MaxResults = number;
export type NextToken = string;
export interface ListRecommendedActionsRequest {
  filter?: RequestFilter;
  maxResults?: number;
  nextToken?: string;
}
export type ActionType =
  | "ADD_ALTERNATE_BILLING_CONTACT"
  | "CREATE_ANOMALY_MONITOR"
  | "CREATE_BUDGET"
  | "ENABLE_COST_OPTIMIZATION_HUB"
  | "MIGRATE_TO_GRANULAR_PERMISSIONS"
  | "PAYMENTS_DUE"
  | "PAYMENTS_PAST_DUE"
  | "REVIEW_ANOMALIES"
  | "REVIEW_BUDGET_ALERTS"
  | "REVIEW_BUDGETS_EXCEEDED"
  | "REVIEW_EXPIRING_RI"
  | "REVIEW_EXPIRING_SP"
  | "REVIEW_FREETIER_USAGE_ALERTS"
  | "REVIEW_FREETIER_CREDITS_REMAINING"
  | "REVIEW_FREETIER_DAYS_REMAINING"
  | "REVIEW_SAVINGS_OPPORTUNITY_RECOMMENDATIONS"
  | "UPDATE_EXPIRED_PAYMENT_METHOD"
  | "UPDATE_INVALID_PAYMENT_METHOD"
  | "UPDATE_TAX_EXEMPTION_CERTIFICATE"
  | "UPDATE_TAX_REGISTRATION_NUMBER"
  | (string & {});
export type AccountId = string;
export type Severity = "INFO" | "WARNING" | "CRITICAL" | (string & {});
export type Feature =
  | "ACCOUNT"
  | "BUDGETS"
  | "COST_ANOMALY_DETECTION"
  | "COST_OPTIMIZATION_HUB"
  | "FREE_TIER"
  | "IAM"
  | "PAYMENTS"
  | "RESERVATIONS"
  | "SAVINGS_PLANS"
  | "TAX_SETTINGS"
  | (string & {});
export type Context = { [key: string]: string | undefined };
export type NextStep = string;
export type NextSteps = string[];
export interface RecommendedAction {
  id?: string;
  type?: ActionType;
  accountId?: string;
  severity?: Severity;
  feature?: Feature;
  context?: { [key: string]: string | undefined };
  nextSteps?: string[];
  lastUpdatedTimeStamp?: string;
}
export type RecommendedActions = RecommendedAction[];
export interface ListRecommendedActionsResponse {
  recommendedActions: RecommendedAction[];
  nextToken?: string;
}
export type ValidationExceptionReason =
  | "unknownOperation"
  | "cannotParse"
  | "fieldValidationFailed"
  | "other"
  | (string & {});
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type ListRecommendedActionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of recommended actions that match the filter criteria.
 */
export const listRecommendedActions: API.PaginatedOperationMethod<
  ListRecommendedActionsRequest,
  ListRecommendedActionsResponse,
  ListRecommendedActionsError,
  Credentials | HttpClient.HttpClient,
  RecommendedAction
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      filter: { actions: D.list({ key: 0, matchOption: 0, values: 0 }) },
      maxResults: 0,
      nextToken: 0,
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
  operationName: "ListRecommendedActions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recommendedActions",
    pageSize: "maxResults",
  } as const,
})) as any;
