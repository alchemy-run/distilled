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
  sdkId: "SageMaker A2I Runtime",
  serviceShapeName: "AmazonSageMakerA2IRuntime",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "sagemaker" });
const ver = /*@__PURE__*/ T.ServiceVersion("2019-11-07");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://a2i-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://a2i-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://a2i-runtime.sagemaker.{R}.{D}","properties":{},"headers":{}}');

export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
  input: __S(8, __c1, 0) as any as S.Schema<DeleteHumanLoopRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<DeleteHumanLoopResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHumanLoop",
}));

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
  input: __S(24, __c3, 0) as any as S.Schema<DescribeHumanLoopRequest>,
  output: __S(26, __c3, 2) as any as S.Schema<DescribeHumanLoopResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHumanLoop",
}));

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
  input: __S(32, __c4, 0) as any as S.Schema<ListHumanLoopsRequest>,
  output: __S(35, __c4, 3) as any as S.Schema<ListHumanLoopsResponse>,
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
  input: __S(43, __c5, 3) as any as S.Schema<StartHumanLoopRequest>,
  output: __S(44, __c5, 4) as any as S.Schema<StartHumanLoopResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<StopHumanLoopRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<StopHumanLoopResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopHumanLoop",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HumanLoopName: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/human-loops/stop" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopHumanLoopRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HumanLoopName: S.String.pipe(T.HttpLabel("HumanLoopName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/human-loops/{HumanLoopName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteHumanLoopRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteHumanLoopResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HumanLoopName: S.String.pipe(T.HttpLabel("HumanLoopName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/human-loops/{HumanLoopName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeHumanLoopRequest" });
    case 1:
      return S.suspend(() => S.Struct({ OutputS3Uri: S.optional(S.String) })).annotate({
        identifier: "HumanLoopOutput",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          CreationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          FailureReason: S.optional(S.String),
          FailureCode: S.optional(S.String),
          HumanLoopStatus: S.optional(S.String),
          HumanLoopName: S.optional(S.String),
          HumanLoopArn: S.optional(S.String),
          FlowDefinitionArn: S.optional(S.String),
          HumanLoopOutput: S.optional(__S(25, __c3, 1)),
        }),
      ).annotate({ identifier: "DescribeHumanLoopResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CreationTimeAfter: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("CreationTimeAfter"),
          ),
          CreationTimeBefore: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ).pipe(T.HttpQuery("CreationTimeBefore")),
          FlowDefinitionArn: S.optional(S.String).pipe(T.HttpQuery("FlowDefinitionArn")),
          SortOrder: S.optional(S.String).pipe(T.HttpQuery("SortOrder")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/human-loops" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListHumanLoopsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          HumanLoopName: S.optional(S.String),
          HumanLoopStatus: S.optional(S.String),
          CreationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          FailureReason: S.optional(S.String),
          FlowDefinitionArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "HumanLoopSummary" });
    case 2:
      return S.Array(__S(33, __c4, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          HumanLoopSummaries: S.optional(__S(34, __c4, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListHumanLoopsResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ InputContent: S.optional(S.String) })).annotate({
        identifier: "HumanLoopInput",
      });
    case 1:
      return S.Array(S.String);
    case 2:
      return S.suspend(() =>
        S.Struct({ ContentClassifiers: S.optional(__S(41, __c5, 1)) }),
      ).annotate({ identifier: "HumanLoopDataAttributes" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          HumanLoopName: S.optional(S.String),
          FlowDefinitionArn: S.optional(S.String),
          HumanLoopInput: S.optional(__S(40, __c5, 0)),
          DataAttributes: S.optional(__S(42, __c5, 2)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/human-loops" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartHumanLoopRequest" });
    case 4:
      return S.suspend(() => S.Struct({ HumanLoopArn: S.optional(S.String) })).annotate({
        identifier: "StartHumanLoopResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
