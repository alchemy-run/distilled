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
  sdkId: "forecastquery",
  serviceShapeName: "AmazonForecastRuntime",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "forecast" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-06-26");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://forecastquery.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://forecastquery.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://forecastquery.{R}.{D}","properties":{},"headers":{}}');

export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()(
    "InvalidInputException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
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
  input: __S(0, __c0, 0) as any as S.Schema<QueryForecastRequest>,
  output: __S(13, __c1, 5) as any as S.Schema<QueryForecastResponse>,
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
}));

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
  input: __S(16, __c2, 0) as any as S.Schema<QueryWhatIfForecastRequest>,
  output: __S(13, __c1, 5) as any as S.Schema<QueryWhatIfForecastResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ForecastArn: S.String,
          StartDate: S.optional(S.String),
          EndDate: S.optional(S.String),
          Filters: __S(8, __c1, 0),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "QueryForecastRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({ Timestamp: S.optional(S.String), Value: S.optional(S.Number) }),
      ).annotate({ identifier: "DataPoint" });
    case 2:
      return S.Array(__S(9, __c1, 1));
    case 3:
      return S.Record(S.String, /*@__PURE__*/ __S(10, __c1, 2).pipe(S.optional));
    case 4:
      return S.suspend(() => S.Struct({ Predictions: S.optional(__S(11, __c1, 3)) })).annotate({
        identifier: "Forecast",
      });
    case 5:
      return S.suspend(() => S.Struct({ Forecast: S.optional(__S(12, __c1, 4)) })).annotate({
        identifier: "QueryForecastResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WhatIfForecastArn: S.String,
          StartDate: S.optional(S.String),
          EndDate: S.optional(S.String),
          Filters: __S(8, __c1, 0),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "QueryWhatIfForecastRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
