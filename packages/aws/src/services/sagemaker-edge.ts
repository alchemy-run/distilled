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
  sdkId: "Sagemaker Edge",
  serviceShapeName: "AmazonSageMakerEdge",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "sagemaker" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-09-23");
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
              `https://edge.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://edge.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://edge.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://edge.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://edge.sagemaker.{R}.{D}","properties":{},"headers":{}}');

export class InternalServiceException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceException>()("InternalServiceException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export type DeviceName = string;
export type DeviceFleetName = string;
export interface GetDeploymentsRequest {
  DeviceName?: string;
  DeviceFleetName?: string;
}
export type EntityName = string;
export type DeploymentType = "Model" | (string & {});
export type FailureHandlingPolicy = "ROLLBACK_ON_FAILURE" | "DO_NOTHING" | (string & {});
export type S3Uri = string;
export type ChecksumType = "SHA1" | (string & {});
export type ChecksumString = string;
export interface Checksum {
  Type?: ChecksumType;
  Sum?: string;
}
export type ModelState = "DEPLOY" | "UNDEPLOY" | (string & {});
export interface Definition {
  ModelHandle?: string;
  S3Url?: string;
  Checksum?: Checksum;
  State?: ModelState;
}
export type Definitions = Definition[];
export interface EdgeDeployment {
  DeploymentName?: string;
  Type?: DeploymentType;
  FailureHandlingPolicy?: FailureHandlingPolicy;
  Definitions?: Definition[];
}
export type EdgeDeployments = EdgeDeployment[];
export interface GetDeploymentsResult {
  Deployments?: EdgeDeployment[];
}
export interface GetDeviceRegistrationRequest {
  DeviceName?: string;
  DeviceFleetName?: string;
}
export type DeviceRegistration = string;
export type CacheTTLSeconds = string;
export interface GetDeviceRegistrationResult {
  DeviceRegistration?: string;
  CacheTTL?: string;
}
export type Dimension = string;
export type Metric = string;
export type Value = number;
export interface EdgeMetric {
  Dimension?: string;
  MetricName?: string;
  Value?: number;
  Timestamp?: Date;
}
export type EdgeMetrics = EdgeMetric[];
export type ModelName = string;
export type Version = string;
export interface Model {
  ModelName?: string;
  ModelVersion?: string;
  LatestSampleTime?: Date;
  LatestInference?: Date;
  ModelMetrics?: EdgeMetric[];
}
export type Models = Model[];
export type DeploymentStatus = "SUCCESS" | "FAIL" | (string & {});
export interface DeploymentModel {
  ModelHandle?: string;
  ModelName?: string;
  ModelVersion?: string;
  DesiredState?: ModelState;
  State?: ModelState;
  Status?: DeploymentStatus;
  StatusReason?: string;
  RollbackFailureReason?: string;
}
export type DeploymentModels = DeploymentModel[];
export interface DeploymentResult {
  DeploymentName?: string;
  DeploymentStatus?: string;
  DeploymentStatusMessage?: string;
  DeploymentStartTime?: Date;
  DeploymentEndTime?: Date;
  DeploymentModels?: DeploymentModel[];
}
export interface SendHeartbeatRequest {
  AgentMetrics?: EdgeMetric[];
  Models?: Model[];
  AgentVersion?: string;
  DeviceName?: string;
  DeviceFleetName?: string;
  DeploymentResult?: DeploymentResult;
}
export interface SendHeartbeatResponse {}
export type ErrorMessage = string;
export type GetDeploymentsError = InternalServiceException | CommonErrors;
/**
 * Use to get the active deployments from a device.
 */
export const getDeployments: API.OperationMethod<
  GetDeploymentsRequest,
  GetDeploymentsResult,
  GetDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<GetDeploymentsRequest>,
  output: __S(6, __c0, 6) as any as S.Schema<GetDeploymentsResult>,
  errors: [InternalServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployments",
}));

export type GetDeviceRegistrationError = InternalServiceException | CommonErrors;
/**
 * Use to check if a device is registered with SageMaker Edge Manager.
 */
export const getDeviceRegistration: API.OperationMethod<
  GetDeviceRegistrationRequest,
  GetDeviceRegistrationResult,
  GetDeviceRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c1, 0) as any as S.Schema<GetDeviceRegistrationRequest>,
  output: __S(17, __c1, 1) as any as S.Schema<GetDeviceRegistrationResult>,
  errors: [InternalServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeviceRegistration",
}));

export type SendHeartbeatError = InternalServiceException | CommonErrors;
/**
 * Use to get the current status of devices registered on SageMaker Edge Manager.
 */
export const sendHeartbeat: API.OperationMethod<
  SendHeartbeatRequest,
  SendHeartbeatResponse,
  SendHeartbeatError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(39, __c2, 7) as any as S.Schema<SendHeartbeatRequest>,
  output: __S(40, __c2, 8) as any as S.Schema<SendHeartbeatResponse>,
  errors: [InternalServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendHeartbeat",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DeviceName: S.optional(S.String), DeviceFleetName: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/GetDeployments" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDeploymentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), Sum: S.optional(S.String) }),
      ).annotate({ identifier: "Checksum" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ModelHandle: S.optional(S.String),
          S3Url: S.optional(S.String),
          Checksum: S.optional(__S(1, __c0, 1)),
          State: S.optional(S.String),
        }),
      ).annotate({ identifier: "Definition" });
    case 3:
      return S.Array(__S(2, __c0, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          DeploymentName: S.optional(S.String),
          Type: S.optional(S.String),
          FailureHandlingPolicy: S.optional(S.String),
          Definitions: S.optional(__S(3, __c0, 3)),
        }),
      ).annotate({ identifier: "EdgeDeployment" });
    case 5:
      return S.Array(__S(4, __c0, 4));
    case 6:
      return S.suspend(() => S.Struct({ Deployments: S.optional(__S(5, __c0, 5)) })).annotate({
        identifier: "GetDeploymentsResult",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DeviceName: S.optional(S.String), DeviceFleetName: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetDeviceRegistration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDeviceRegistrationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DeviceRegistration: S.optional(S.String), CacheTTL: S.optional(S.String) }),
      ).annotate({ identifier: "GetDeviceRegistrationResult" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Dimension: S.optional(S.String),
          MetricName: S.optional(S.String),
          Value: S.optional(S.Number),
          Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "EdgeMetric" });
    case 1:
      return S.Array(__S(32, __c2, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ModelName: S.optional(S.String),
          ModelVersion: S.optional(S.String),
          LatestSampleTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LatestInference: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ModelMetrics: S.optional(__S(33, __c2, 1)),
        }),
      ).annotate({ identifier: "Model" });
    case 3:
      return S.Array(__S(34, __c2, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ModelHandle: S.optional(S.String),
          ModelName: S.optional(S.String),
          ModelVersion: S.optional(S.String),
          DesiredState: S.optional(S.String),
          State: S.optional(S.String),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          RollbackFailureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeploymentModel" });
    case 5:
      return S.Array(__S(36, __c2, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          DeploymentName: S.optional(S.String),
          DeploymentStatus: S.optional(S.String),
          DeploymentStatusMessage: S.optional(S.String),
          DeploymentStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DeploymentEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DeploymentModels: S.optional(__S(37, __c2, 5)),
        }),
      ).annotate({ identifier: "DeploymentResult" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          AgentMetrics: S.optional(__S(33, __c2, 1)),
          Models: S.optional(__S(35, __c2, 3)),
          AgentVersion: S.optional(S.String),
          DeviceName: S.optional(S.String),
          DeviceFleetName: S.optional(S.String),
          DeploymentResult: S.optional(__S(38, __c2, 6)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/SendHeartbeat" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SendHeartbeatRequest" });
    case 8:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "SendHeartbeatResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
