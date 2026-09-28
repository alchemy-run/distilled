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
  sdkId: "Sagemaker Edge",
  target: "AmazonSageMakerEdge",
  version: "2020-09-23",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://edge.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://edge.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class InternalServiceException
  extends /*@__PURE__*/ TE.TaggedError("InternalServiceException")<{
    readonly message?: string;
  }> {}
export type DeviceName = string;
export type DeviceFleetName = string;
export interface GetDeploymentsRequest {
  DeviceName?: string;
  DeviceFleetName?: string;
}
export type EntityName = string;
export type DeploymentType = "Model" | (string & {});
export type FailureHandlingPolicy =
  | "ROLLBACK_ON_FAILURE"
  | "DO_NOTHING"
  | (string & {});
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
  descriptor: {
    service: svc,
    http: "POST /GetDeployments",
    input: { DeviceName: 0, DeviceFleetName: 0 },
    body: true,
  },
  errors: [InternalServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployments",
})) as any;

export type GetDeviceRegistrationError =
  | InternalServiceException
  | CommonErrors;
/**
 * Use to check if a device is registered with SageMaker Edge Manager.
 */
export const getDeviceRegistration: API.OperationMethod<
  GetDeviceRegistrationRequest,
  GetDeviceRegistrationResult,
  GetDeviceRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetDeviceRegistration",
    input: { DeviceName: 0, DeviceFleetName: 0 },
    body: true,
  },
  errors: [InternalServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeviceRegistration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /SendHeartbeat",
    input: {
      AgentMetrics: D.list(i_EdgeMetric),
      Models: D.list({
        ModelName: 0,
        ModelVersion: 0,
        LatestSampleTime: 0,
        LatestInference: 0,
        ModelMetrics: D.list(i_EdgeMetric),
      }),
      AgentVersion: 0,
      DeviceName: 0,
      DeviceFleetName: 0,
      DeploymentResult: {
        DeploymentName: 0,
        DeploymentStatus: 0,
        DeploymentStatusMessage: 0,
        DeploymentStartTime: 0,
        DeploymentEndTime: 0,
        DeploymentModels: D.list({
          ModelHandle: 0,
          ModelName: 0,
          ModelVersion: 0,
          DesiredState: 0,
          State: 0,
          Status: 0,
          StatusReason: 0,
          RollbackFailureReason: 0,
        }),
      },
    },
    body: true,
  },
  errors: [InternalServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendHeartbeat",
})) as any;

const i_EdgeMetric: D.LazyStruct = () => ({
  Dimension: 0,
  MetricName: 0,
  Value: 0,
  Timestamp: 0,
});
