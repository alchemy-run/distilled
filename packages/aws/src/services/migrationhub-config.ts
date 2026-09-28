import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "MigrationHub Config",
  target: "AWSMigrationHubMultiAccountService",
  version: "2019-06-30",
  sigv4: "mgh",
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
                `https://migrationhub-config-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://migrationhub-config-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://migrationhub-config.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://migrationhub-config.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"])<{
    readonly message?: string;
  }> {}
export class DryRunOperation
  extends /*@__PURE__*/ TE.TaggedError("DryRunOperation")<{
    readonly message?: string;
  }> {}
export class InternalServerError
  extends /*@__PURE__*/ TE.TaggedError("InternalServerError")<{
    readonly message?: string;
  }> {}
export class InvalidInputException
  extends /*@__PURE__*/ TE.TaggedError("InvalidInputException")<{
    readonly message?: string;
  }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError("ServiceUnavailableException", [
    "ServerError",
  ])<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429, headers: { RetryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly RetryAfterSeconds?: number }> {}
export type HomeRegion = string;
export type TargetType = "ACCOUNT" | (string & {});
export type TargetId = string;
export interface Target {
  Type: TargetType;
  Id?: string;
}
export type DryRun = boolean;
export interface CreateHomeRegionControlRequest {
  HomeRegion: string;
  Target: Target;
  DryRun?: boolean;
}
export type ControlId = string;
export type RequestedTime = Date;
export interface HomeRegionControl {
  ControlId?: string;
  HomeRegion?: string;
  Target?: Target;
  RequestedTime?: Date;
}
export interface CreateHomeRegionControlResult {
  HomeRegionControl?: HomeRegionControl;
}
export interface DeleteHomeRegionControlRequest {
  ControlId: string;
}
export interface DeleteHomeRegionControlResult {}
export type DescribeHomeRegionControlsMaxResults = number;
export type Token = string;
export interface DescribeHomeRegionControlsRequest {
  ControlId?: string;
  HomeRegion?: string;
  Target?: Target;
  MaxResults?: number;
  NextToken?: string;
}
export type HomeRegionControls = HomeRegionControl[];
export interface DescribeHomeRegionControlsResult {
  HomeRegionControls?: HomeRegionControl[];
  NextToken?: string;
}
export interface GetHomeRegionRequest {}
export interface GetHomeRegionResult {
  HomeRegion?: string;
}
export type ErrorMessage = string;
export type RetryAfterSeconds = number;
export type CreateHomeRegionControlError =
  | AccessDeniedException
  | DryRunOperation
  | InternalServerError
  | InvalidInputException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * This API sets up the home region for the calling account only.
 */
export const createHomeRegionControl: API.OperationMethod<
  CreateHomeRegionControlRequest,
  CreateHomeRegionControlResult,
  CreateHomeRegionControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { HomeRegion: 0, Target: i_Target, DryRun: 0 },
    output: { HomeRegionControl: o_HomeRegionControl },
  },
  errors: [
    AccessDeniedException,
    DryRunOperation,
    InternalServerError,
    InvalidInputException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHomeRegionControl",
})) as any;

export type DeleteHomeRegionControlError =
  | AccessDeniedException
  | InternalServerError
  | InvalidInputException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation deletes the home region configuration for the calling account. The operation does not delete discovery or migration tracking data in the home region.
 */
export const deleteHomeRegionControl: API.OperationMethod<
  DeleteHomeRegionControlRequest,
  DeleteHomeRegionControlResult,
  DeleteHomeRegionControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ControlId: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidInputException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHomeRegionControl",
})) as any;

export type DescribeHomeRegionControlsError =
  | AccessDeniedException
  | InternalServerError
  | InvalidInputException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * This API permits filtering on the `ControlId` and `HomeRegion`
 * fields.
 */
export const describeHomeRegionControls: API.PaginatedOperationMethod<
  DescribeHomeRegionControlsRequest,
  DescribeHomeRegionControlsResult,
  DescribeHomeRegionControlsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ControlId: 0,
      HomeRegion: 0,
      Target: i_Target,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { HomeRegionControls: D.list(o_HomeRegionControl) },
  },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidInputException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHomeRegionControls",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetHomeRegionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidInputException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the calling account’s home region, if configured. This API is used by other AWS
 * services to determine the regional endpoint for calling AWS Application Discovery Service and
 * Migration Hub. You must call `GetHomeRegion` at least once before you call any
 * other AWS Application Discovery Service and AWS Migration Hub APIs, to obtain the account's
 * Migration Hub home region.
 */
export const getHomeRegion: API.OperationMethod<
  GetHomeRegionRequest,
  GetHomeRegionResult,
  GetHomeRegionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidInputException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHomeRegion",
})) as any;

const i_Target: D.LazyStruct = () => ({ Type: 0, Id: 0 });
const o_HomeRegionControl: D.LazyStruct = () => ({ RequestedTime: D.ts });
