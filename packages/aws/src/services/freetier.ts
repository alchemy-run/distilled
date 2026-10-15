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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "FreeTier",
  serviceShapeName: "AWSFreeTierService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "freetier" });
const ver = /*@__PURE__*/ T.ServiceVersion("2023-09-07");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
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
      authSchemes: [{ name: "sigv4", signingName: "freetier", signingRegion: "cn-northwest-1" }],
    });
    if (Endpoint != null) {
      if (UseFIPS === true) {
        return err("Invalid Configuration: FIPS and custom endpoint are not supported");
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
              return err("FIPS is enabled but this partition does not support FIPS");
            }
            return e(
              "https://freetier.us-east-1.api.aws",
              {
                authSchemes: [
                  { name: "sigv4", signingName: "freetier", signingRegion: "us-east-1" },
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
              return err("FIPS is enabled but this partition does not support FIPS");
            }
            if (Region === "aws-cn-global") {
              return e("https://freetier.cn-northwest-1.api.amazonwebservices.com.cn", _p0(), {});
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
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          if (Region === "aws-cn-global") {
            return e("https://freetier.cn-northwest-1.api.amazonwebservices.com.cn", _p0(), {});
          }
          return e(`https://freetier.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://freetier.us-east-1.api.aws","properties":{"authSchemes":[{"name":"sigv4","signingName":"freetier","signingRegion":"us-east-1"}]},"headers":{}}',
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

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
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
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type AccountPlanStatus = "NOT_STARTED" | "ACTIVE" | "EXPIRED" | (string & {});
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
  input: __S(0, __c0, 0) as any as S.Schema<GetAccountActivityRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<GetAccountActivityResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountActivity",
}));

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
  input: __S(24, __c3, 0) as any as S.Schema<GetAccountPlanStateRequest>,
  output: __S(25, __c3, 1) as any as S.Schema<GetAccountPlanStateResponse>,
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
}));

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
  input: __S(36, __c4, 4) as any as S.Schema<GetFreeTierUsageRequest>,
  output: __S(39, __c4, 7) as any as S.Schema<GetFreeTierUsageResponse>,
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
  input: __S(48, __c6, 0) as any as S.Schema<ListAccountActivitiesRequest>,
  output: __S(51, __c6, 3) as any as S.Schema<ListAccountActivitiesResponse>,
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
  input: __S(56, __c7, 0) as any as S.Schema<UpgradeAccountPlanRequest>,
  output: __S(57, __c7, 1) as any as S.Schema<UpgradeAccountPlanResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ activityId: S.String, languageCode: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAccountActivityRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          activityId: S.String,
          title: S.String,
          description: S.String,
          status: S.String,
          instructionsUrl: S.String,
          reward: __S(16, __c2, 0),
          estimatedTimeToCompleteInMinutes: S.optional(S.Number),
          expiresAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          startedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          completedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetAccountActivityResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ amount: S.Number, unit: S.String })).annotate({
        identifier: "MonetaryAmount",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ credit: __S(8, __c1, 0) })]);
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAccountPlanStateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          accountId: S.String,
          accountPlanType: S.String,
          accountPlanStatus: S.String,
          accountPlanRemainingCredits: S.optional(__S(8, __c1, 0)),
          accountPlanExpirationDate: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
        }),
      ).annotate({ identifier: "GetAccountPlanStateResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<Expression> => __S(35, __c4, 3)).annotate({
          identifier: "Expression",
        }),
      );
    case 1:
      return S.Array(S.String);
    case 2:
      return S.suspend(() =>
        S.Struct({ Key: S.String, Values: __S(33, __c4, 1), MatchOptions: __S(40, __c5, 0) }),
      ).annotate({ identifier: "DimensionValues" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Or: S.optional(S.suspend(() => __S(32, __c4, 0)).annotate({ identifier: "Expressions" })),
          And: S.optional(
            S.suspend(() => __S(32, __c4, 0)).annotate({ identifier: "Expressions" }),
          ),
          Not: S.optional(
            S.suspend((): S.Schema<Expression> => __S(35, __c4, 3)).annotate({
              identifier: "Expression",
            }),
          ),
          Dimensions: S.optional(__S(34, __c4, 2)),
        }),
      ).annotate({ identifier: "Expression" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          filter: S.optional(__S(35, __c4, 3)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetFreeTierUsageRequest" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          service: S.optional(S.String),
          operation: S.optional(S.String),
          usageType: S.optional(S.String),
          region: S.optional(S.String),
          actualUsageAmount: S.optional(S.Number),
          forecastedUsageAmount: S.optional(S.Number),
          limit: S.optional(S.Number),
          unit: S.optional(S.String),
          description: S.optional(S.String),
          freeTierType: S.optional(S.String),
        }),
      ).annotate({ identifier: "FreeTierUsage" });
    case 6:
      return S.Array(__S(37, __c4, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ freeTierUsages: __S(38, __c4, 6), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetFreeTierUsageResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          filterActivityStatuses: S.optional(__S(40, __c5, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          languageCode: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAccountActivitiesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          activityId: S.String,
          title: S.String,
          reward: __S(16, __c2, 0),
          status: S.String,
        }),
      ).annotate({ identifier: "ActivitySummary" });
    case 2:
      return S.Array(__S(49, __c6, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ activities: __S(50, __c6, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAccountActivitiesResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ accountPlanType: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpgradeAccountPlanRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ accountId: S.String, accountPlanType: S.String, accountPlanStatus: S.String }),
      ).annotate({ identifier: "UpgradeAccountPlanResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
