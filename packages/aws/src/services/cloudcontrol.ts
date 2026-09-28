import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_0Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "CloudControl",
  target: "CloudApiService",
  version: "2021-09-30",
  sigv4: "cloudcontrolapi",
  protocol: awsJson1_0Protocol,
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
                `https://cloudcontrolapi-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://cloudcontrolapi-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://cloudcontrolapi.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://cloudcontrolapi.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "AlreadyExistsException",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ClientTokenConflictException
  extends /*@__PURE__*/ TE.TaggedError(
    "ClientTokenConflictException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConcurrentModificationException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ConcurrentOperationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConcurrentOperationException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class GeneralServiceException
  extends /*@__PURE__*/ TE.TaggedError(
    "GeneralServiceException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class HandlerFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "HandlerFailureException",
    ["ServerError"],
    { status: 502 },
  )<{ readonly message?: string }> {}
export class HandlerInternalFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "HandlerInternalFailureException",
    ["ServerError"],
    { status: 502 },
  )<{ readonly message?: string }> {}
export class InvalidCredentialsException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidCredentialsException",
    ["AuthError"],
    { status: 401 },
  )<{ readonly message?: string }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class NetworkFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "NetworkFailureException",
    ["ServerError"],
    { status: 502 },
  )<{ readonly message?: string }> {}
export class NotStabilizedException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotStabilizedException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class NotUpdatableException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotUpdatableException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class PrivateTypeException
  extends /*@__PURE__*/ TE.TaggedError(
    "PrivateTypeException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class RequestTokenNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "RequestTokenNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ResourceConflictException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceConflictException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceInternalErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceInternalErrorException",
    ["ServerError"],
    { status: 502 },
  )<{ readonly message?: string }> {}
export class ServiceLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class TypeNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "TypeNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class UnsupportedActionException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedActionException",
    ["BadRequestError"],
    { status: 405 },
  )<{ readonly message?: string }> {}
export type RequestToken = string;
export interface CancelResourceRequestInput {
  RequestToken: string;
}
export type TypeName = string;
export type Identifier = string;
export type Operation = string;
export type OperationStatus = string;
export type Properties = string | redacted.Redacted<string>;
export type StatusMessage = string;
export type HandlerErrorCode = string;
export interface ProgressEvent {
  TypeName?: string;
  Identifier?: string;
  RequestToken?: string;
  HooksRequestToken?: string;
  Operation?: string;
  OperationStatus?: string;
  EventTime?: Date;
  ResourceModel?: string | redacted.Redacted<string>;
  StatusMessage?: string;
  ErrorCode?: string;
  RetryAfter?: Date;
}
export interface CancelResourceRequestOutput {
  ProgressEvent?: ProgressEvent;
}
export type TypeVersionId = string;
export type RoleArn = string;
export type ClientToken = string;
export interface CreateResourceInput {
  TypeName: string;
  TypeVersionId?: string;
  RoleArn?: string;
  ClientToken?: string;
  DesiredState: string | redacted.Redacted<string>;
}
export interface CreateResourceOutput {
  ProgressEvent?: ProgressEvent;
}
export interface DeleteResourceInput {
  TypeName: string;
  TypeVersionId?: string;
  RoleArn?: string;
  ClientToken?: string;
  Identifier: string;
}
export interface DeleteResourceOutput {
  ProgressEvent?: ProgressEvent;
}
export interface GetResourceInput {
  TypeName: string;
  TypeVersionId?: string;
  RoleArn?: string;
  Identifier: string;
}
export interface ResourceDescription {
  Identifier?: string;
  Properties?: string | redacted.Redacted<string>;
}
export interface GetResourceOutput {
  TypeName?: string;
  ResourceDescription?: ResourceDescription;
}
export interface GetResourceRequestStatusInput {
  RequestToken: string;
}
export type HookTypeArn = string;
export type HookInvocationPoint = string;
export type HookStatus = string;
export type HookFailureMode = string;
export interface HookProgressEvent {
  HookTypeName?: string;
  HookTypeVersionId?: string;
  HookTypeArn?: string;
  InvocationPoint?: string;
  HookStatus?: string;
  HookEventTime?: Date;
  HookStatusMessage?: string;
  FailureMode?: string;
}
export type HooksProgressEvent = HookProgressEvent[];
export interface GetResourceRequestStatusOutput {
  ProgressEvent?: ProgressEvent;
  HooksProgressEvent?: HookProgressEvent[];
}
export type MaxResults = number;
export type NextToken = string;
export type Operations = string[];
export type OperationStatuses = string[];
export interface ResourceRequestStatusFilter {
  Operations?: string[];
  OperationStatuses?: string[];
}
export interface ListResourceRequestsInput {
  MaxResults?: number;
  NextToken?: string;
  ResourceRequestStatusFilter?: ResourceRequestStatusFilter;
}
export type ResourceRequestStatusSummaries = ProgressEvent[];
export interface ListResourceRequestsOutput {
  ResourceRequestStatusSummaries?: ProgressEvent[];
  NextToken?: string;
}
export type HandlerNextToken = string;
export interface ListResourcesInput {
  TypeName: string;
  TypeVersionId?: string;
  RoleArn?: string;
  NextToken?: string;
  MaxResults?: number;
  ResourceModel?: string | redacted.Redacted<string>;
}
export type ResourceDescriptions = ResourceDescription[];
export interface ListResourcesOutput {
  TypeName?: string;
  ResourceDescriptions?: ResourceDescription[];
  NextToken?: string;
}
export type PatchDocument = string | redacted.Redacted<string>;
export interface UpdateResourceInput {
  TypeName: string;
  TypeVersionId?: string;
  RoleArn?: string;
  ClientToken?: string;
  Identifier: string;
  PatchDocument: string | redacted.Redacted<string>;
}
export interface UpdateResourceOutput {
  ProgressEvent?: ProgressEvent;
}
export type ErrorMessage = string;
export type CancelResourceRequestError =
  | ConcurrentModificationException
  | RequestTokenNotFoundException
  | CommonErrors;
/**
 * Cancels the specified resource operation request. For more information, see Canceling resource operation requests in the
 * *Amazon Web Services Cloud Control API User Guide*.
 *
 * Only resource operations requests with a status of `PENDING` or
 * `IN_PROGRESS` can be canceled.
 */
export const cancelResourceRequest: API.OperationMethod<
  CancelResourceRequestInput,
  CancelResourceRequestOutput,
  CancelResourceRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RequestToken: 0 },
    output: { ProgressEvent: o_ProgressEvent },
  },
  errors: [ConcurrentModificationException, RequestTokenNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelResourceRequest",
})) as any;

export type CreateResourceError =
  | AlreadyExistsException
  | ClientTokenConflictException
  | ConcurrentOperationException
  | GeneralServiceException
  | HandlerFailureException
  | HandlerInternalFailureException
  | InvalidCredentialsException
  | InvalidRequestException
  | NetworkFailureException
  | NotStabilizedException
  | NotUpdatableException
  | PrivateTypeException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceInternalErrorException
  | ServiceLimitExceededException
  | ThrottlingException
  | TypeNotFoundException
  | UnsupportedActionException
  | CommonErrors;
/**
 * Creates the specified resource. For more information, see Creating a
 * resource in the *Amazon Web Services Cloud Control API User Guide*.
 *
 * After you have initiated a resource creation request, you can monitor the progress of your
 * request by calling GetResourceRequestStatus using the `RequestToken` of the
 * `ProgressEvent` type returned by `CreateResource`.
 */
export const createResource: API.OperationMethod<
  CreateResourceInput,
  CreateResourceOutput,
  CreateResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TypeName: 0,
      TypeVersionId: 0,
      RoleArn: 0,
      ClientToken: D.m({ idempotency: true }),
      DesiredState: 0,
    },
    output: { ProgressEvent: o_ProgressEvent },
  },
  errors: [
    AlreadyExistsException,
    ClientTokenConflictException,
    ConcurrentOperationException,
    GeneralServiceException,
    HandlerFailureException,
    HandlerInternalFailureException,
    InvalidCredentialsException,
    InvalidRequestException,
    NetworkFailureException,
    NotStabilizedException,
    NotUpdatableException,
    PrivateTypeException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceInternalErrorException,
    ServiceLimitExceededException,
    ThrottlingException,
    TypeNotFoundException,
    UnsupportedActionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResource",
})) as any;

export type DeleteResourceError =
  | AlreadyExistsException
  | ClientTokenConflictException
  | ConcurrentOperationException
  | GeneralServiceException
  | HandlerFailureException
  | HandlerInternalFailureException
  | InvalidCredentialsException
  | InvalidRequestException
  | NetworkFailureException
  | NotStabilizedException
  | NotUpdatableException
  | PrivateTypeException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceInternalErrorException
  | ServiceLimitExceededException
  | ThrottlingException
  | TypeNotFoundException
  | UnsupportedActionException
  | CommonErrors;
/**
 * Deletes the specified resource. For details, see Deleting a
 * resource in the *Amazon Web Services Cloud Control API User Guide*.
 *
 * After you have initiated a resource deletion request, you can monitor the progress of your
 * request by calling GetResourceRequestStatus using the `RequestToken` of the
 * `ProgressEvent` returned by `DeleteResource`.
 */
export const deleteResource: API.OperationMethod<
  DeleteResourceInput,
  DeleteResourceOutput,
  DeleteResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TypeName: 0,
      TypeVersionId: 0,
      RoleArn: 0,
      ClientToken: D.m({ idempotency: true }),
      Identifier: 0,
    },
    output: { ProgressEvent: o_ProgressEvent },
  },
  errors: [
    AlreadyExistsException,
    ClientTokenConflictException,
    ConcurrentOperationException,
    GeneralServiceException,
    HandlerFailureException,
    HandlerInternalFailureException,
    InvalidCredentialsException,
    InvalidRequestException,
    NetworkFailureException,
    NotStabilizedException,
    NotUpdatableException,
    PrivateTypeException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceInternalErrorException,
    ServiceLimitExceededException,
    ThrottlingException,
    TypeNotFoundException,
    UnsupportedActionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResource",
})) as any;

export type GetResourceError =
  | AlreadyExistsException
  | GeneralServiceException
  | HandlerFailureException
  | HandlerInternalFailureException
  | InvalidCredentialsException
  | InvalidRequestException
  | NetworkFailureException
  | NotStabilizedException
  | NotUpdatableException
  | PrivateTypeException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceInternalErrorException
  | ServiceLimitExceededException
  | ThrottlingException
  | TypeNotFoundException
  | UnsupportedActionException
  | CommonErrors;
/**
 * Returns information about the current state of the specified resource. For details, see
 * Reading a resource's current state.
 *
 * You can use this action to return information about an existing resource in your account
 * and Amazon Web Services Region, whether those resources were provisioned using Cloud Control API.
 */
export const getResource: API.OperationMethod<
  GetResourceInput,
  GetResourceOutput,
  GetResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TypeName: 0, TypeVersionId: 0, RoleArn: 0, Identifier: 0 },
    output: { ResourceDescription: o_ResourceDescription },
  },
  errors: [
    AlreadyExistsException,
    GeneralServiceException,
    HandlerFailureException,
    HandlerInternalFailureException,
    InvalidCredentialsException,
    InvalidRequestException,
    NetworkFailureException,
    NotStabilizedException,
    NotUpdatableException,
    PrivateTypeException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceInternalErrorException,
    ServiceLimitExceededException,
    ThrottlingException,
    TypeNotFoundException,
    UnsupportedActionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResource",
})) as any;

export type GetResourceRequestStatusError =
  | RequestTokenNotFoundException
  | CommonErrors;
/**
 * Returns the current status of a resource operation request. For more information, see
 * Tracking the progress of resource operation requests in the
 * *Amazon Web Services Cloud Control API User Guide*.
 */
export const getResourceRequestStatus: API.OperationMethod<
  GetResourceRequestStatusInput,
  GetResourceRequestStatusOutput,
  GetResourceRequestStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RequestToken: 0 },
    output: {
      ProgressEvent: o_ProgressEvent,
      HooksProgressEvent: D.list({ HookEventTime: D.ts }),
    },
  },
  errors: [RequestTokenNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceRequestStatus",
})) as any;

export type ListResourceRequestsError = CommonErrors;
/**
 * Returns existing resource operation requests. This includes requests of all status types.
 * For more information, see Listing active resource operation requests in the
 * *Amazon Web Services Cloud Control API User Guide*.
 *
 * Resource operation requests expire after 7 days.
 */
export const listResourceRequests: API.PaginatedOperationMethod<
  ListResourceRequestsInput,
  ListResourceRequestsOutput,
  ListResourceRequestsError,
  Credentials | HttpClient.HttpClient,
  ProgressEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      MaxResults: 0,
      NextToken: 0,
      ResourceRequestStatusFilter: { Operations: 0, OperationStatuses: 0 },
    },
    output: { ResourceRequestStatusSummaries: D.list(o_ProgressEvent) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceRequests",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceRequestStatusSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourcesError =
  | AlreadyExistsException
  | GeneralServiceException
  | HandlerFailureException
  | HandlerInternalFailureException
  | InvalidCredentialsException
  | InvalidRequestException
  | NetworkFailureException
  | NotStabilizedException
  | NotUpdatableException
  | PrivateTypeException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceInternalErrorException
  | ServiceLimitExceededException
  | ThrottlingException
  | TypeNotFoundException
  | UnsupportedActionException
  | CommonErrors;
/**
 * Returns information about the specified resources. For more information, see Discovering resources in the *Amazon Web Services Cloud Control API User Guide*.
 *
 * You can use this action to return information about existing resources in your account and
 * Amazon Web Services Region, whether those resources were provisioned using Cloud Control API.
 */
export const listResources: API.PaginatedOperationMethod<
  ListResourcesInput,
  ListResourcesOutput,
  ListResourcesError,
  Credentials | HttpClient.HttpClient,
  ResourceDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      TypeName: 0,
      TypeVersionId: 0,
      RoleArn: 0,
      NextToken: 0,
      MaxResults: 0,
      ResourceModel: 0,
    },
    output: { ResourceDescriptions: D.list(o_ResourceDescription) },
  },
  errors: [
    AlreadyExistsException,
    GeneralServiceException,
    HandlerFailureException,
    HandlerInternalFailureException,
    InvalidCredentialsException,
    InvalidRequestException,
    NetworkFailureException,
    NotStabilizedException,
    NotUpdatableException,
    PrivateTypeException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceInternalErrorException,
    ServiceLimitExceededException,
    ThrottlingException,
    TypeNotFoundException,
    UnsupportedActionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceDescriptions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type UpdateResourceError =
  | AlreadyExistsException
  | ClientTokenConflictException
  | ConcurrentOperationException
  | GeneralServiceException
  | HandlerFailureException
  | HandlerInternalFailureException
  | InvalidCredentialsException
  | InvalidRequestException
  | NetworkFailureException
  | NotStabilizedException
  | NotUpdatableException
  | PrivateTypeException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceInternalErrorException
  | ServiceLimitExceededException
  | ThrottlingException
  | TypeNotFoundException
  | UnsupportedActionException
  | CommonErrors;
/**
 * Updates the specified property values in the resource.
 *
 * You specify your resource property updates as a list of patch operations contained in a
 * JSON patch document that adheres to the
 * RFC 6902 - JavaScript Object
 * Notation (JSON) Patch
 * standard.
 *
 * For details on how Cloud Control API performs resource update operations, see Updating a resource in the *Amazon Web Services Cloud Control API User Guide*.
 *
 * After you have initiated a resource update request, you can monitor the progress of your
 * request by calling GetResourceRequestStatus using the `RequestToken` of the
 * `ProgressEvent` returned by `UpdateResource`.
 *
 * For more information about the properties of a specific resource, refer to the related
 * topic for the resource in the Resource and property types reference in the *CloudFormation Users Guide*.
 */
export const updateResource: API.OperationMethod<
  UpdateResourceInput,
  UpdateResourceOutput,
  UpdateResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TypeName: 0,
      TypeVersionId: 0,
      RoleArn: 0,
      ClientToken: D.m({ idempotency: true }),
      Identifier: 0,
      PatchDocument: 0,
    },
    output: { ProgressEvent: o_ProgressEvent },
  },
  errors: [
    AlreadyExistsException,
    ClientTokenConflictException,
    ConcurrentOperationException,
    GeneralServiceException,
    HandlerFailureException,
    HandlerInternalFailureException,
    InvalidCredentialsException,
    InvalidRequestException,
    NetworkFailureException,
    NotStabilizedException,
    NotUpdatableException,
    PrivateTypeException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceInternalErrorException,
    ServiceLimitExceededException,
    ThrottlingException,
    TypeNotFoundException,
    UnsupportedActionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResource",
})) as any;

const o_ProgressEvent: D.LazyStruct = () => ({
  EventTime: D.ts,
  ResourceModel: D.secret,
  RetryAfter: D.ts,
});
const o_ResourceDescription: D.LazyStruct = () => ({ Properties: D.secret });
