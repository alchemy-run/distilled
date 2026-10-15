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
  sdkId: "Sustainability",
  serviceShapeName: "AwsSustainabilityApiService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "sustainability" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-05-10");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
    const { UseFIPS = false, Endpoint, Region } = p;
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
        { name: "sigv4a", signingRegionSet: ["*"] },
        { name: "sigv4", signingRegion: "us-gov-west-1" },
      ],
    });
    const _p1 = (_0: unknown) => ({
      authSchemes: [
        { name: "sigv4a", signingRegionSet: ["*"] },
        { name: "sigv4", signingRegion: `${_.getAttr(_0, "implicitGlobalRegion")}` },
      ],
    });
    if (Endpoint != null) {
      if (UseFIPS === true) {
        return err("Invalid Configuration: FIPS and custom endpoint are not supported");
      }
      return e(
        Endpoint,
        { authSchemes: [{ name: "sigv4a", signingRegionSet: ["*"] }, { name: "sigv4" }] },
        {},
      );
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (_.getAttr(PartitionResult, "name") === "aws" && UseFIPS === false) {
            return e(
              `https://api.sustainability.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              {
                authSchemes: [
                  { name: "sigv4a", signingRegionSet: ["*"] },
                  { name: "sigv4", signingRegion: "us-east-1" },
                ],
              },
              {},
            );
          }
          if (_.getAttr(PartitionResult, "name") === "aws-us-gov" && UseFIPS === false) {
            return e(
              `https://sustainability.us-gov.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              _p0(),
              {},
            );
          }
          if (_.getAttr(PartitionResult, "name") === "aws-us-gov" && UseFIPS === true) {
            return e(
              `https://sustainability-fips.us-gov.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              _p0(),
              {},
            );
          }
          if (UseFIPS === true) {
            return e(
              `https://sustainability-fips.global.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              _p1(PartitionResult),
              {},
            );
          }
          return e(
            `https://sustainability.global.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            _p1(PartitionResult),
            {},
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://api.sustainability.{R}.api.aws","properties":{"authSchemes":[{"name":"sigv4a","signingRegionSet":["*"]},{"name":"sigv4","signingRegion":"us-east-1"}]},"headers":{}}',
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
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(429), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export interface TimePeriod {
  Start: Date;
  End: Date;
}
export type Dimension = "USAGE_ACCOUNT_ID" | "REGION" | "SERVICE" | (string & {});
export type DimensionList = Dimension[];
export type DimensionValue = string;
export type DimensionValueList = string[];
export type DimensionListMap = { [key in Dimension]?: string[] };
export interface FilterExpression {
  Dimensions?: { [key: string]: string[] | undefined };
}
export type EmissionsType =
  | "TOTAL_LBM_CARBON_EMISSIONS"
  | "TOTAL_MBM_CARBON_EMISSIONS"
  | "TOTAL_SCOPE_1_CARBON_EMISSIONS"
  | "TOTAL_SCOPE_2_LBM_CARBON_EMISSIONS"
  | "TOTAL_SCOPE_2_MBM_CARBON_EMISSIONS"
  | "TOTAL_SCOPE_3_LBM_CARBON_EMISSIONS"
  | "TOTAL_SCOPE_3_MBM_CARBON_EMISSIONS"
  | (string & {});
export type EmissionsTypeList = EmissionsType[];
export type TimeGranularity =
  | "YEARLY_CALENDAR"
  | "YEARLY_FISCAL"
  | "QUARTERLY_CALENDAR"
  | "QUARTERLY_FISCAL"
  | "MONTHLY"
  | (string & {});
export type Month = number;
export interface GranularityConfiguration {
  FiscalYearStartMonth?: number;
}
export type MaxResults = number;
export type NextToken = string;
export interface GetEstimatedCarbonEmissionsRequest {
  TimePeriod: TimePeriod;
  GroupBy?: Dimension[];
  FilterBy?: FilterExpression;
  EmissionsTypes?: EmissionsType[];
  Granularity?: TimeGranularity;
  GranularityConfiguration?: GranularityConfiguration;
  MaxResults?: number;
  NextToken?: string;
}
export type DimensionsMap = { [key in Dimension]?: string };
export type ModelVersion = string;
export type EmissionsUnit = "MTCO2e" | (string & {});
export interface Emissions {
  Value: number;
  Unit: EmissionsUnit;
}
export type EmissionsMap = { [key in EmissionsType]?: Emissions };
export interface EstimatedCarbonEmissions {
  TimePeriod: TimePeriod;
  DimensionsValues: { [key: string]: string | undefined };
  ModelVersion: string;
  EmissionsValues: { [key: string]: Emissions | undefined };
}
export type EstimatedCarbonEmissionsList = EstimatedCarbonEmissions[];
export interface GetEstimatedCarbonEmissionsResponse {
  Results: EstimatedCarbonEmissions[];
  NextToken?: string;
}
export interface GetEstimatedCarbonEmissionsDimensionValuesRequest {
  TimePeriod: TimePeriod;
  Dimensions: Dimension[];
  MaxResults?: number;
  NextToken?: string;
}
export interface DimensionEntry {
  Dimension: Dimension;
  Value: string;
}
export type DimensionEntryList = DimensionEntry[];
export interface GetEstimatedCarbonEmissionsDimensionValuesResponse {
  Results?: DimensionEntry[];
  NextToken?: string;
}
export type WaterAllocationType = "TOTAL_WATER_WITHDRAWALS" | (string & {});
export type WaterAllocationTypeList = WaterAllocationType[];
export interface GetEstimatedWaterAllocationRequest {
  TimePeriod: TimePeriod;
  GroupBy?: Dimension[];
  FilterBy?: FilterExpression;
  AllocationTypes?: WaterAllocationType[];
  Granularity?: TimeGranularity;
  MaxResults?: number;
  NextToken?: string;
}
export type WaterAllocationUnit = "m3" | (string & {});
export interface WaterAllocation {
  Value: number;
  Unit: WaterAllocationUnit;
}
export type WaterAllocationMap = { [key in WaterAllocationType]?: WaterAllocation };
export interface EstimatedWaterAllocation {
  TimePeriod: TimePeriod;
  DimensionsValues: { [key: string]: string | undefined };
  ModelVersion: string;
  AllocationValues: { [key: string]: WaterAllocation | undefined };
}
export type EstimatedWaterAllocationList = EstimatedWaterAllocation[];
export interface GetEstimatedWaterAllocationResponse {
  Results: EstimatedWaterAllocation[];
  NextToken?: string;
}
export interface GetEstimatedWaterAllocationDimensionValuesRequest {
  TimePeriod: TimePeriod;
  Dimensions: Dimension[];
  MaxResults?: number;
  NextToken?: string;
}
export interface GetEstimatedWaterAllocationDimensionValuesResponse {
  Results: DimensionEntry[];
  NextToken?: string;
}
export type GetEstimatedCarbonEmissionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns estimated carbon emission values based on customer grouping and filtering parameters. We recommend using pagination to ensure that the operation returns quickly and successfully.
 */
export const getEstimatedCarbonEmissions: API.PaginatedOperationMethod<
  GetEstimatedCarbonEmissionsRequest,
  GetEstimatedCarbonEmissionsResponse,
  GetEstimatedCarbonEmissionsError,
  Credentials | HttpClient.HttpClient,
  EstimatedCarbonEmissions
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1, __c0, 1) as any as S.Schema<GetEstimatedCarbonEmissionsRequest>,
  output: __S(4, __c0, 4) as any as S.Schema<GetEstimatedCarbonEmissionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEstimatedCarbonEmissions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetEstimatedCarbonEmissionsDimensionValuesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the possible dimension values available for a customer's account. We recommend using pagination to ensure that the operation returns quickly and successfully.
 */
export const getEstimatedCarbonEmissionsDimensionValues: API.PaginatedOperationMethod<
  GetEstimatedCarbonEmissionsDimensionValuesRequest,
  GetEstimatedCarbonEmissionsDimensionValuesResponse,
  GetEstimatedCarbonEmissionsDimensionValuesError,
  Credentials | HttpClient.HttpClient,
  DimensionEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<GetEstimatedCarbonEmissionsDimensionValuesRequest>,
  output: __S(25, __c3, 1) as any as S.Schema<GetEstimatedCarbonEmissionsDimensionValuesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEstimatedCarbonEmissionsDimensionValues",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetEstimatedWaterAllocationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns estimated water allocation values based on customer grouping and filtering parameters. We recommend using pagination to ensure that the operation returns quickly and successfully.
 */
export const getEstimatedWaterAllocation: API.PaginatedOperationMethod<
  GetEstimatedWaterAllocationRequest,
  GetEstimatedWaterAllocationResponse,
  GetEstimatedWaterAllocationError,
  Credentials | HttpClient.HttpClient,
  EstimatedWaterAllocation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<GetEstimatedWaterAllocationRequest>,
  output: __S(43, __c5, 3) as any as S.Schema<GetEstimatedWaterAllocationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEstimatedWaterAllocation",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetEstimatedWaterAllocationDimensionValuesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the possible dimension values available for a customer's account. We recommend using pagination to ensure that the operation returns quickly and successfully.
 */
export const getEstimatedWaterAllocationDimensionValues: API.PaginatedOperationMethod<
  GetEstimatedWaterAllocationDimensionValuesRequest,
  GetEstimatedWaterAllocationDimensionValuesResponse,
  GetEstimatedWaterAllocationDimensionValuesError,
  Credentials | HttpClient.HttpClient,
  DimensionEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<GetEstimatedWaterAllocationDimensionValuesRequest>,
  output: __S(49, __c6, 1) as any as S.Schema<GetEstimatedWaterAllocationDimensionValuesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEstimatedWaterAllocationDimensionValues",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "MaxResults",
  } as const,
})) as any;

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ FiscalYearStartMonth: S.optional(S.Number) })).annotate({
        identifier: "GranularityConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TimePeriod: __S(8, __c1, 0),
          GroupBy: S.optional(__S(9, __c1, 1)),
          FilterBy: S.optional(__S(18, __c2, 2)),
          EmissionsTypes: S.optional(__S(9, __c1, 1)),
          Granularity: S.optional(S.String),
          GranularityConfiguration: S.optional(__S(0, __c0, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/estimated-carbon-emissions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEstimatedCarbonEmissionsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          TimePeriod: __S(8, __c1, 0),
          DimensionsValues: __S(19, __c2, 3),
          ModelVersion: S.String,
          EmissionsValues: __S(21, __c2, 5),
        }),
      ).annotate({ identifier: "EstimatedCarbonEmissions" });
    case 3:
      return S.Array(__S(2, __c0, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ Results: __S(3, __c0, 3), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetEstimatedCarbonEmissionsResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Start: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          End: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "TimePeriod" });
    case 1:
      return S.Array(S.String);
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(16, __c2, 0).pipe(S.optional));
    case 2:
      return S.suspend(() => S.Struct({ Dimensions: S.optional(__S(17, __c2, 1)) })).annotate({
        identifier: "FilterExpression",
      });
    case 3:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 4:
      return S.suspend(() => S.Struct({ Value: S.Number, Unit: S.String })).annotate({
        identifier: "Emissions",
      });
    case 5:
      return S.Record(S.String, /*@__PURE__*/ __S(20, __c2, 4).pipe(S.optional));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TimePeriod: __S(8, __c1, 0),
          Dimensions: __S(9, __c1, 1),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/estimated-carbon-emissions-dimension-values" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEstimatedCarbonEmissionsDimensionValuesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Results: S.optional(__S(33, __c4, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetEstimatedCarbonEmissionsDimensionValuesResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Dimension: S.String, Value: S.String })).annotate({
        identifier: "DimensionEntry",
      });
    case 1:
      return S.Array(__S(32, __c4, 0));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TimePeriod: __S(8, __c1, 0),
          GroupBy: S.optional(__S(9, __c1, 1)),
          FilterBy: S.optional(__S(18, __c2, 2)),
          AllocationTypes: S.optional(__S(9, __c1, 1)),
          Granularity: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/estimated-water-allocation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEstimatedWaterAllocationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TimePeriod: __S(8, __c1, 0),
          DimensionsValues: __S(19, __c2, 3),
          ModelVersion: S.String,
          AllocationValues: __S(21, __c2, 5),
        }),
      ).annotate({ identifier: "EstimatedWaterAllocation" });
    case 2:
      return S.Array(__S(41, __c5, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Results: __S(42, __c5, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetEstimatedWaterAllocationResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TimePeriod: __S(8, __c1, 0),
          Dimensions: __S(9, __c1, 1),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/estimated-water-allocation-dimension-values" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEstimatedWaterAllocationDimensionValuesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Results: __S(33, __c4, 1), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetEstimatedWaterAllocationDimensionValuesResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
