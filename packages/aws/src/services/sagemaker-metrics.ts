import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "SageMaker Metrics",
  serviceShapeName: "SageMakerMetricsService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "sagemaker" });
const ver = /*@__PURE__*/ T.ServiceVersion("2022-09-30");
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
              `https://metrics.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws") {
              return e(`https://metrics-fips.sagemaker.${Region}.amazonaws.com`);
            }
            return e(
              `https://metrics.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://metrics.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://metrics.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://metrics.sagemaker.{R}.{D}","properties":{},"headers":{}}');

export type MetricName = string;
export type SageMakerResourceArn = string;
export type MetricStatistic = "Min" | "Max" | "Avg" | "Count" | "StdDev" | "Last" | (string & {});
export type Period = "OneMinute" | "FiveMinute" | "OneHour" | "IterationNumber" | (string & {});
export type XAxisType = "IterationNumber" | "Timestamp" | (string & {});
export interface MetricQuery {
  MetricName?: string;
  ResourceArn?: string;
  MetricStat?: MetricStatistic;
  Period?: Period;
  XAxisType?: XAxisType;
  Start?: number;
  End?: number;
}
export type MetricQueryList = MetricQuery[];
export interface BatchGetMetricsRequest {
  MetricQueries?: MetricQuery[];
}
export type MetricQueryResultStatus =
  | "Complete"
  | "Truncated"
  | "InternalError"
  | "ValidationError"
  | (string & {});
export type Message = string;
export type XAxisValues = number[];
export type MetricValues = number[];
export interface MetricQueryResult {
  Status?: MetricQueryResultStatus;
  Message?: string;
  XAxisValues?: number[];
  MetricValues?: number[];
}
export type MetricQueryResultList = MetricQueryResult[];
export interface BatchGetMetricsResponse {
  MetricQueryResults?: (MetricQueryResult & {
    Status: MetricQueryResultStatus;
    XAxisValues: XAxisValues;
    MetricValues: MetricValues;
  })[];
}
export type ExperimentEntityName = string;
export type Step = number;
export interface RawMetricData {
  MetricName?: string;
  Timestamp?: Date;
  Step?: number;
  Value?: number;
}
export type RawMetricDataList = RawMetricData[];
export interface BatchPutMetricsRequest {
  TrialComponentName?: string;
  MetricData?: RawMetricData[];
}
export type PutMetricsErrorCode =
  | "METRIC_LIMIT_EXCEEDED"
  | "INTERNAL_ERROR"
  | "VALIDATION_ERROR"
  | "CONFLICT_ERROR"
  | (string & {});
export interface BatchPutMetricsError_ {
  Code?: PutMetricsErrorCode;
  MetricIndex?: number;
}
export type BatchPutMetricsErrorList = BatchPutMetricsError_[];
export interface BatchPutMetricsResponse {
  Errors?: BatchPutMetricsError_[];
}
export type BatchGetMetricsError = CommonErrors;
/**
 * Used to retrieve training metrics from SageMaker.
 */
export const batchGetMetrics: API.OperationMethod<
  BatchGetMetricsRequest,
  BatchGetMetricsResponse,
  BatchGetMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2, __c0, 2) as any as S.Schema<BatchGetMetricsRequest>,
  output: __S(6, __c0, 6) as any as S.Schema<BatchGetMetricsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetMetrics",
}));

export type BatchPutMetricsError = CommonErrors;
/**
 * Used to ingest training metrics into SageMaker. These metrics can be visualized in SageMaker Studio.
 */
export const batchPutMetrics: API.OperationMethod<
  BatchPutMetricsRequest,
  BatchPutMetricsResponse,
  BatchPutMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(10, __c1, 2) as any as S.Schema<BatchPutMetricsRequest>,
  output: __S(13, __c1, 5) as any as S.Schema<BatchPutMetricsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchPutMetrics",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MetricName: S.optional(S.String),
          ResourceArn: S.optional(S.String),
          MetricStat: S.optional(S.String),
          Period: S.optional(S.String),
          XAxisType: S.optional(S.String),
          Start: S.optional(S.Number),
          End: S.optional(S.Number),
        }),
      ).annotate({ identifier: "MetricQuery" });
    case 1:
      return S.Array(__S(0, __c0, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ MetricQueries: S.optional(__S(1, __c0, 1)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/BatchGetMetrics" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetMetricsRequest" });
    case 3:
      return S.Array(S.Number);
    case 4:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          Message: S.optional(S.String),
          XAxisValues: S.optional(__S(3, __c0, 3)),
          MetricValues: S.optional(__S(3, __c0, 3)),
        }),
      ).annotate({ identifier: "MetricQueryResult" });
    case 5:
      return S.Array(__S(4, __c0, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ MetricQueryResults: S.optional(__S(5, __c0, 5)) }),
      ).annotate({ identifier: "BatchGetMetricsResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MetricName: S.optional(S.String),
          Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Step: S.optional(S.Number),
          Value: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RawMetricData" });
    case 1:
      return S.Array(__S(8, __c1, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          TrialComponentName: S.optional(S.String),
          MetricData: S.optional(__S(9, __c1, 1)),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/BatchPutMetrics" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchPutMetricsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Code: S.optional(S.String), MetricIndex: S.optional(S.Number) }),
      ).annotate({ identifier: "BatchPutMetricsError" });
    case 4:
      return S.Array(__S(11, __c1, 3));
    case 5:
      return S.suspend(() => S.Struct({ Errors: S.optional(__S(12, __c1, 4)) })).annotate({
        identifier: "BatchPutMetricsResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
