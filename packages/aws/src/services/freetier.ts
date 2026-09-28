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
  sdkId: "FreeTier",
  target: "AWSFreeTierService",
  version: "2023-09-07",
  sigv4: "freetier",
  protocol: awsJson1_0Protocol,
  rules: (p, _) => {
    const { Region, UseFIPS = false, Endpoint } = p;
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
        {
          name: "sigv4",
          signingName: "freetier",
          signingRegion: "cn-northwest-1",
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
          if (_.getAttr(PartitionResult, "name") === "aws") {
            if (UseFIPS === true) {
              if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
                return e(`https://freetier-fips.${Region}.api.aws`);
              }
              return err(
                "FIPS is enabled but this partition does not support FIPS",
              );
            }
            return e(
              "https://freetier.us-east-1.api.aws",
              {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "freetier",
                    signingRegion: "us-east-1",
                  },
                ],
              },
              {},
            );
          }
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            if (UseFIPS === true) {
              if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
                return e(
                  `https://freetier-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                );
              }
              return err(
                "FIPS is enabled but this partition does not support FIPS",
              );
            }
            if (Region === "aws-cn-global") {
              return e(
                "https://freetier.cn-northwest-1.api.amazonwebservices.com.cn",
                _p0(),
                {},
              );
            }
            return e(
              `https://freetier.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://freetier-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (Region === "aws-cn-global") {
            return e(
              "https://freetier.cn-northwest-1.api.amazonwebservices.com.cn",
              _p0(),
              {},
            );
          }
          return e(
            `https://freetier.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
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
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export type ActivityId = string;
export type LanguageCode =
  | "en-US"
  | "en-GB"
  | "id-ID"
  | "de-DE"
  | "es-ES"
  | "fr-FR"
  | "ja-JP"
  | "it-IT"
  | "pt-PT"
  | "ko-KR"
  | "zh-CN"
  | "zh-TW"
  | "tr-TR"
  | (string & {});
export interface GetAccountActivityRequest {
  activityId: string;
  languageCode?: LanguageCode;
}
export type ActivityStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "EXPIRING"
  | (string & {});
export type CurrencyCode = "USD" | (string & {});
export interface MonetaryAmount {
  amount: number;
  unit: CurrencyCode;
}
export type ActivityReward = { credit: MonetaryAmount };
export interface GetAccountActivityResponse {
  activityId: string;
  title: string;
  description: string;
  status: ActivityStatus;
  instructionsUrl: string;
  reward: ActivityReward;
  estimatedTimeToCompleteInMinutes?: number;
  expiresAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
}
export interface GetAccountPlanStateRequest {}
export type AccountId = string;
export type AccountPlanType = "FREE" | "PAID" | (string & {});
export type AccountPlanStatus =
  | "NOT_STARTED"
  | "ACTIVE"
  | "EXPIRED"
  | (string & {});
export interface GetAccountPlanStateResponse {
  accountId: string;
  accountPlanType: AccountPlanType;
  accountPlanStatus: AccountPlanStatus;
  accountPlanRemainingCredits?: MonetaryAmount;
  accountPlanExpirationDate?: Date;
}
export type Expressions = Expression[];
export type Dimension =
  | "SERVICE"
  | "OPERATION"
  | "USAGE_TYPE"
  | "REGION"
  | "FREE_TIER_TYPE"
  | "DESCRIPTION"
  | "USAGE_PERCENTAGE"
  | (string & {});
export type Value = string;
export type Values = string[];
export type MatchOption =
  | "EQUALS"
  | "STARTS_WITH"
  | "ENDS_WITH"
  | "CONTAINS"
  | "GREATER_THAN_OR_EQUAL"
  | (string & {});
export type MatchOptions = MatchOption[];
export interface DimensionValues {
  Key: Dimension;
  Values: string[];
  MatchOptions: MatchOption[];
}
export interface Expression {
  Or?: Expression[];
  And?: Expression[];
  Not?: Expression;
  Dimensions?: DimensionValues;
}
export type MaxResults = number;
export type NextPageToken = string;
export interface GetFreeTierUsageRequest {
  filter?: Expression;
  maxResults?: number;
  nextToken?: string;
}
export interface FreeTierUsage {
  service?: string;
  operation?: string;
  usageType?: string;
  region?: string;
  actualUsageAmount?: number;
  forecastedUsageAmount?: number;
  limit?: number;
  unit?: string;
  description?: string;
  freeTierType?: string;
}
export type FreeTierUsages = FreeTierUsage[];
export interface GetFreeTierUsageResponse {
  freeTierUsages: FreeTierUsage[];
  nextToken?: string;
}
export type FilterActivityStatuses = ActivityStatus[];
export interface ListAccountActivitiesRequest {
  filterActivityStatuses?: ActivityStatus[];
  nextToken?: string;
  maxResults?: number;
  languageCode?: LanguageCode;
}
export interface ActivitySummary {
  activityId: string;
  title: string;
  reward: ActivityReward;
  status: ActivityStatus;
}
export type Activities = ActivitySummary[];
export interface ListAccountActivitiesResponse {
  activities: ActivitySummary[];
  nextToken?: string;
}
export interface UpgradeAccountPlanRequest {
  accountPlanType: AccountPlanType;
}
export interface UpgradeAccountPlanResponse {
  accountId: string;
  accountPlanType: AccountPlanType;
  accountPlanStatus: AccountPlanStatus;
}
export type GetAccountActivityError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a specific activity record that is available to the customer.
 */
export const getAccountActivity: API.OperationMethod<
  GetAccountActivityRequest,
  GetAccountActivityResponse,
  GetAccountActivityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { activityId: 0, languageCode: 0 },
    output: { expiresAt: D.ts, startedAt: D.ts, completedAt: D.ts },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountActivity",
})) as any;

export type GetAccountPlanStateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This returns all of the information related to the state of the account plan related to Free Tier.
 */
export const getAccountPlanState: API.OperationMethod<
  GetAccountPlanStateRequest,
  GetAccountPlanStateResponse,
  GetAccountPlanStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {},
    output: { accountPlanExpirationDate: D.ts },
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
  operationName: "GetAccountPlanState",
})) as any;

export type GetFreeTierUsageError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all Free Tier usage objects that match your filters.
 */
export const getFreeTierUsage: API.PaginatedOperationMethod<
  GetFreeTierUsageRequest,
  GetFreeTierUsageResponse,
  GetFreeTierUsageError,
  Credentials | HttpClient.HttpClient,
  FreeTierUsage
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { filter: i_Expression, maxResults: 0, nextToken: 0 },
  },
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFreeTierUsage",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "freeTierUsages",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAccountActivitiesError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of activities that are available. This operation supports pagination and filtering by status.
 */
export const listAccountActivities: API.PaginatedOperationMethod<
  ListAccountActivitiesRequest,
  ListAccountActivitiesResponse,
  ListAccountActivitiesError,
  Credentials | HttpClient.HttpClient,
  ActivitySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      filterActivityStatuses: 0,
      nextToken: 0,
      maxResults: 0,
      languageCode: 0,
    },
  },
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccountActivities",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "activities",
    pageSize: "maxResults",
  } as const,
})) as any;

export type UpgradeAccountPlanError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The account plan type for the Amazon Web Services account.
 */
export const upgradeAccountPlan: API.OperationMethod<
  UpgradeAccountPlanRequest,
  UpgradeAccountPlanResponse,
  UpgradeAccountPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { accountPlanType: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpgradeAccountPlan",
})) as any;

const i_Expression: D.LazyStruct = () => ({
  Or: D.list(i_Expression),
  And: D.list(i_Expression),
  Not: i_Expression,
  Dimensions: { Key: 0, Values: 0, MatchOptions: 0 },
});
