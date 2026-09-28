import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "Sustainability",
  target: "AwsSustainabilityApiService",
  version: "2018-05-10",
  sigv4: "sustainability",
  protocol: restJson1Protocol,
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
    const _p0 = () => ({
      authSchemes: [
        { name: "sigv4a", signingRegionSet: ["*"] },
        { name: "sigv4", signingRegion: "us-gov-west-1" },
      ],
    });
    const _p1 = (_0: unknown) => ({
      authSchemes: [
        { name: "sigv4a", signingRegionSet: ["*"] },
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
      return e(
        Endpoint,
        {
          authSchemes: [
            { name: "sigv4a", signingRegionSet: ["*"] },
            { name: "sigv4" },
          ],
        },
        {},
      );
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false
          ) {
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
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === false
          ) {
            return e(
              `https://sustainability.us-gov.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              _p0(),
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === true
          ) {
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
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
    renames: { Message: "message" },
  })<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500, renames: { Message: "message" } },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, renames: { Message: "message" } },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400, renames: { Message: "message" } },
  )<{ readonly message: string }> {}
export interface TimePeriod {
  Start: Date;
  End: Date;
}
export type Dimension =
  | "USAGE_ACCOUNT_ID"
  | "REGION"
  | "SERVICE"
  | (string & {});
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
export type WaterAllocationMap = {
  [key in WaterAllocationType]?: WaterAllocation;
};
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
  descriptor: {
    service: svc,
    http: "POST /v1/estimated-carbon-emissions",
    input: {
      TimePeriod: i_TimePeriod,
      GroupBy: 0,
      FilterBy: i_FilterExpression,
      EmissionsTypes: 0,
      Granularity: 0,
      GranularityConfiguration: { FiscalYearStartMonth: 0 },
      MaxResults: 0,
      NextToken: 0,
    },
    output: { Results: D.list({ TimePeriod: o_TimePeriod }) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /v1/estimated-carbon-emissions-dimension-values",
    input: {
      TimePeriod: i_TimePeriod,
      Dimensions: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /v1/estimated-water-allocation",
    input: {
      TimePeriod: i_TimePeriod,
      GroupBy: 0,
      FilterBy: i_FilterExpression,
      AllocationTypes: 0,
      Granularity: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { Results: D.list({ TimePeriod: o_TimePeriod }) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /v1/estimated-water-allocation-dimension-values",
    input: {
      TimePeriod: i_TimePeriod,
      Dimensions: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    body: true,
  },
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

const i_FilterExpression: D.LazyStruct = () => ({ Dimensions: 0 });
const i_TimePeriod: D.LazyStruct = () => ({
  Start: D.tsAs("date-time"),
  End: D.tsAs("date-time"),
});
const o_TimePeriod: D.LazyStruct = () => ({ Start: D.ts, End: D.ts });
