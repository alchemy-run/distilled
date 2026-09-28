import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "SageMaker Metrics",
  target: "SageMakerMetricsService",
  version: "2022-09-30",
  sigv4: "sagemaker",
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
                return e(
                  `https://metrics-fips.sagemaker.${Region}.amazonaws.com`,
                );
              }
              return e(
                `https://metrics.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://metrics.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://metrics.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export type MetricName = string;
export type SageMakerResourceArn = string;
export type MetricStatistic =
  | "Min"
  | "Max"
  | "Avg"
  | "Count"
  | "StdDev"
  | "Last"
  | (string & {});
export type Period =
  | "OneMinute"
  | "FiveMinute"
  | "OneHour"
  | "IterationNumber"
  | (string & {});
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
  descriptor: {
    service: svc,
    http: "POST /BatchGetMetrics",
    input: {
      MetricQueries: D.list({
        MetricName: 0,
        ResourceArn: 0,
        MetricStat: 0,
        Period: 0,
        XAxisType: 0,
        Start: 0,
        End: 0,
      }),
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetMetrics",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /BatchPutMetrics",
    input: {
      TrialComponentName: 0,
      MetricData: D.list({ MetricName: 0, Timestamp: 0, Step: 0, Value: 0 }),
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchPutMetrics",
})) as any;
