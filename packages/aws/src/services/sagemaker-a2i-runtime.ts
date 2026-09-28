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
  sdkId: "SageMaker A2I Runtime",
  target: "AmazonSageMakerA2IRuntime",
  version: "2019-11-07",
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
                `https://a2i-runtime.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://a2i-runtime.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://a2i-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://a2i-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type HumanLoopName = string;
export interface DeleteHumanLoopRequest {
  HumanLoopName: string;
}
export interface DeleteHumanLoopResponse {}
export interface DescribeHumanLoopRequest {
  HumanLoopName: string;
}
export type HumanLoopStatus =
  | "InProgress"
  | "Failed"
  | "Completed"
  | "Stopped"
  | "Stopping"
  | (string & {});
export type HumanLoopArn = string;
export type FlowDefinitionArn = string;
export interface HumanLoopOutput {
  OutputS3Uri?: string;
}
export interface DescribeHumanLoopResponse {
  CreationTime: Date;
  FailureReason?: string;
  FailureCode?: string;
  HumanLoopStatus: HumanLoopStatus;
  HumanLoopName: string;
  HumanLoopArn: string;
  FlowDefinitionArn: string;
  HumanLoopOutput?: HumanLoopOutput & { OutputS3Uri: string };
}
export type SortOrder = "Ascending" | "Descending" | (string & {});
export type NextToken = string;
export type MaxResults = number;
export interface ListHumanLoopsRequest {
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  FlowDefinitionArn?: string;
  SortOrder?: SortOrder;
  NextToken?: string;
  MaxResults?: number;
}
export type FailureReason = string;
export interface HumanLoopSummary {
  HumanLoopName?: string;
  HumanLoopStatus?: HumanLoopStatus;
  CreationTime?: Date;
  FailureReason?: string;
  FlowDefinitionArn?: string;
}
export type HumanLoopSummaries = HumanLoopSummary[];
export interface ListHumanLoopsResponse {
  HumanLoopSummaries: HumanLoopSummary[];
  NextToken?: string;
}
export type InputContent = string;
export interface HumanLoopInput {
  InputContent?: string;
}
export type ContentClassifier =
  | "FreeOfPersonallyIdentifiableInformation"
  | "FreeOfAdultContent"
  | (string & {});
export type ContentClassifiers = ContentClassifier[];
export interface HumanLoopDataAttributes {
  ContentClassifiers?: ContentClassifier[];
}
export interface StartHumanLoopRequest {
  HumanLoopName?: string;
  FlowDefinitionArn?: string;
  HumanLoopInput?: HumanLoopInput;
  DataAttributes?: HumanLoopDataAttributes;
}
export interface StartHumanLoopResponse {
  HumanLoopArn?: string;
}
export interface StopHumanLoopRequest {
  HumanLoopName?: string;
}
export interface StopHumanLoopResponse {}
export type DeleteHumanLoopError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified human loop for a flow definition.
 *
 * If the human loop was deleted, this operation will return a
 * `ResourceNotFoundException`.
 */
export const deleteHumanLoop: API.OperationMethod<
  DeleteHumanLoopRequest,
  DeleteHumanLoopResponse,
  DeleteHumanLoopError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /human-loops/{HumanLoopName}",
    input: { HumanLoopName: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHumanLoop",
})) as any;

export type DescribeHumanLoopError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the specified human loop. If the human loop was deleted, this
 * operation will return a `ResourceNotFoundException` error.
 */
export const describeHumanLoop: API.OperationMethod<
  DescribeHumanLoopRequest,
  DescribeHumanLoopResponse,
  DescribeHumanLoopError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /human-loops/{HumanLoopName}",
    input: { HumanLoopName: 0 },
    output: { CreationTime: D.ts },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHumanLoop",
})) as any;

export type ListHumanLoopsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about human loops, given the specified parameters. If a human loop was deleted, it will not be included.
 */
export const listHumanLoops: API.PaginatedOperationMethod<
  ListHumanLoopsRequest,
  ListHumanLoopsResponse,
  ListHumanLoopsError,
  Credentials | HttpClient.HttpClient,
  HumanLoopSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /human-loops",
    input: {
      CreationTimeAfter: D.m({ query: "CreationTimeAfter" }),
      CreationTimeBefore: D.m({ query: "CreationTimeBefore" }),
      FlowDefinitionArn: D.m({ query: "FlowDefinitionArn" }),
      SortOrder: D.m({ query: "SortOrder" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: { HumanLoopSummaries: D.list({ CreationTime: D.ts }) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHumanLoops",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "HumanLoopSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type StartHumanLoopError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a human loop, provided that at least one activation condition is met.
 */
export const startHumanLoop: API.OperationMethod<
  StartHumanLoopRequest,
  StartHumanLoopResponse,
  StartHumanLoopError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /human-loops",
    input: {
      HumanLoopName: 0,
      FlowDefinitionArn: 0,
      HumanLoopInput: { InputContent: 0 },
      DataAttributes: { ContentClassifiers: 0 },
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartHumanLoop",
})) as any;

export type StopHumanLoopError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops the specified human loop.
 */
export const stopHumanLoop: API.OperationMethod<
  StopHumanLoopRequest,
  StopHumanLoopResponse,
  StopHumanLoopError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /human-loops/stop",
    input: { HumanLoopName: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopHumanLoop",
})) as any;
