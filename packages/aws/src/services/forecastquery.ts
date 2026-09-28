import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "forecastquery",
  target: "AmazonForecastRuntime",
  version: "2018-06-26",
  sigv4: "forecast",
  protocol: awsJson1_1Protocol,
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
                `https://forecastquery-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://forecastquery-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://forecastquery.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://forecastquery.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class InvalidInputException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidInputException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidNextTokenException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceInUseException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export type Arn = string;
export type AttributeName = string;
export type AttributeValue = string;
export type Filters = { [key: string]: string | undefined };
export type NextToken = string;
export interface QueryForecastRequest {
  ForecastArn: string;
  StartDate?: string;
  EndDate?: string;
  Filters: { [key: string]: string | undefined };
  NextToken?: string;
}
export type Statistic = string;
export interface DataPoint {
  Timestamp?: string;
  Value?: number;
}
export type TimeSeries = DataPoint[];
export type Predictions = { [key: string]: DataPoint[] | undefined };
export interface Forecast {
  Predictions?: { [key: string]: DataPoint[] | undefined };
}
export interface QueryForecastResponse {
  Forecast?: Forecast;
}
export type LongArn = string;
export interface QueryWhatIfForecastRequest {
  WhatIfForecastArn: string;
  StartDate?: string;
  EndDate?: string;
  Filters: { [key: string]: string | undefined };
  NextToken?: string;
}
export interface QueryWhatIfForecastResponse {
  Forecast?: Forecast;
}
export type ErrorMessage = string;
export type QueryForecastError =
  | InvalidInputException
  | InvalidNextTokenException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a forecast for a single item, filtered by the supplied criteria.
 *
 * The criteria is a key-value pair. The key is either `item_id` (or the
 * equivalent non-timestamp, non-target field) from the `TARGET_TIME_SERIES` dataset,
 * or one of the forecast dimensions specified as part of the `FeaturizationConfig`
 * object.
 *
 * By default, `QueryForecast` returns the complete date range for the filtered
 * forecast. You can request a specific date range.
 *
 * To get the full forecast, use the CreateForecastExportJob operation.
 *
 * The forecasts generated by Amazon Forecast are in the same timezone as the dataset that was
 * used to create the predictor.
 */
export const queryForecast: API.OperationMethod<
  QueryForecastRequest,
  QueryForecastResponse,
  QueryForecastError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ForecastArn: 0,
      StartDate: 0,
      EndDate: 0,
      Filters: 0,
      NextToken: 0,
    },
  },
  errors: [
    InvalidInputException,
    InvalidNextTokenException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "QueryForecast",
})) as any;

export type QueryWhatIfForecastError =
  | InvalidInputException
  | InvalidNextTokenException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a what-if forecast.
 */
export const queryWhatIfForecast: API.OperationMethod<
  QueryWhatIfForecastRequest,
  QueryWhatIfForecastResponse,
  QueryWhatIfForecastError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      WhatIfForecastArn: 0,
      StartDate: 0,
      EndDate: 0,
      Filters: 0,
      NextToken: 0,
    },
  },
  errors: [
    InvalidInputException,
    InvalidNextTokenException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "QueryWhatIfForecast",
})) as any;
