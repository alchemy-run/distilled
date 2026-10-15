import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "CloudControl",
  serviceShapeName: "CloudApiService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "cloudcontrolapi" });
const ver = /*@__PURE__*/ T.ServiceVersion("2021-09-30");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://cloudcontrolapi.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://cloudcontrolapi.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://cloudcontrolapi.{R}.{D}","properties":{},"headers":{}}');

export class AlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<AlreadyExistsException>()(
    "AlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "AlreadyExistsException", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ClientTokenConflictException
  extends /*@__PURE__*/ S.TaggedError<ClientTokenConflictException>()(
    "ClientTokenConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ClientTokenConflictException",
        httpResponseCode: 409,
      }),
      /*@__PURE__*/ T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ConcurrentModificationException",
        httpResponseCode: 500,
      }),
      /*@__PURE__*/ T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class ConcurrentOperationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentOperationException>()(
    "ConcurrentOperationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ConcurrentOperationException",
        httpResponseCode: 409,
      }),
      /*@__PURE__*/ T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class GeneralServiceException
  extends /*@__PURE__*/ S.TaggedError<GeneralServiceException>()(
    "GeneralServiceException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "GeneralServiceException", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class HandlerFailureException
  extends /*@__PURE__*/ S.TaggedError<HandlerFailureException>()(
    "HandlerFailureException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "HandlerFailureException", httpResponseCode: 502 }),
      /*@__PURE__*/ T.HttpError(502),
    ),
  ).pipe(C.withServerError) {}
export class HandlerInternalFailureException
  extends /*@__PURE__*/ S.TaggedError<HandlerInternalFailureException>()(
    "HandlerInternalFailureException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "HandlerInternalFailureException",
        httpResponseCode: 502,
      }),
      /*@__PURE__*/ T.HttpError(502),
    ),
  ).pipe(C.withServerError) {}
export class InvalidCredentialsException
  extends /*@__PURE__*/ S.TaggedError<InvalidCredentialsException>()(
    "InvalidCredentialsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidCredentialsException", httpResponseCode: 401 }),
      /*@__PURE__*/ T.HttpError(401),
    ),
  ).pipe(C.withAuthError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidRequestException", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class NetworkFailureException
  extends /*@__PURE__*/ S.TaggedError<NetworkFailureException>()(
    "NetworkFailureException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "NetworkFailureException", httpResponseCode: 502 }),
      /*@__PURE__*/ T.HttpError(502),
    ),
  ).pipe(C.withServerError) {}
export class NotStabilizedException
  extends /*@__PURE__*/ S.TaggedError<NotStabilizedException>()(
    "NotStabilizedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "NotStabilizedException", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class NotUpdatableException
  extends /*@__PURE__*/ S.TaggedError<NotUpdatableException>()(
    "NotUpdatableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "NotUpdatableException", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class PrivateTypeException
  extends /*@__PURE__*/ S.TaggedError<PrivateTypeException>()(
    "PrivateTypeException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "PrivateTypeException", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class RequestTokenNotFoundException
  extends /*@__PURE__*/ S.TaggedError<RequestTokenNotFoundException>()(
    "RequestTokenNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "RequestTokenNotFoundException",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceConflictException
  extends /*@__PURE__*/ S.TaggedError<ResourceConflictException>()(
    "ResourceConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ResourceConflictException", httpResponseCode: 409 }),
      /*@__PURE__*/ T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ResourceNotFoundException", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServiceInternalErrorException
  extends /*@__PURE__*/ S.TaggedError<ServiceInternalErrorException>()(
    "ServiceInternalErrorException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ServiceInternalErrorException",
        httpResponseCode: 502,
      }),
      /*@__PURE__*/ T.HttpError(502),
    ),
  ).pipe(C.withServerError) {}
export class ServiceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceLimitExceededException>()(
    "ServiceLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ServiceLimitExceededException",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ThrottlingException", httpResponseCode: 429 }),
      /*@__PURE__*/ T.HttpError(429),
    ),
  ).pipe(C.withThrottlingError) {}
export class TypeNotFoundException
  extends /*@__PURE__*/ S.TaggedError<TypeNotFoundException>()(
    "TypeNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "TypeNotFoundException", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedActionException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedActionException>()(
    "UnsupportedActionException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "UnsupportedActionException", httpResponseCode: 405 }),
      /*@__PURE__*/ T.HttpError(405),
    ),
  ).pipe(C.withBadRequestError) {}
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
  input: __S(0, __c0, 0) as any as S.Schema<CancelResourceRequestInput>,
  output: __S(16, __c2, 0) as any as S.Schema<CancelResourceRequestOutput>,
  errors: [ConcurrentModificationException, RequestTokenNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelResourceRequest",
}));

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
  input: __S(24, __c3, 0) as any as S.Schema<CreateResourceInput>,
  output: __S(16, __c2, 0) as any as S.Schema<CreateResourceOutput>,
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
}));

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
  input: __S(32, __c4, 0) as any as S.Schema<DeleteResourceInput>,
  output: __S(16, __c2, 0) as any as S.Schema<DeleteResourceOutput>,
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
}));

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
  input: __S(40, __c5, 0) as any as S.Schema<GetResourceInput>,
  output: __S(41, __c5, 1) as any as S.Schema<GetResourceOutput>,
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
}));

export type GetResourceRequestStatusError = RequestTokenNotFoundException | CommonErrors;
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
  input: __S(56, __c7, 0) as any as S.Schema<GetResourceRequestStatusInput>,
  output: __S(59, __c7, 3) as any as S.Schema<GetResourceRequestStatusOutput>,
  errors: [RequestTokenNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceRequestStatus",
}));

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
  input: __S(66, __c8, 2) as any as S.Schema<ListResourceRequestsInput>,
  output: __S(68, __c8, 4) as any as S.Schema<ListResourceRequestsOutput>,
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
  input: __S(72, __c9, 0) as any as S.Schema<ListResourcesInput>,
  output: __S(74, __c9, 2) as any as S.Schema<ListResourcesOutput>,
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
  input: __S(80, __c10, 0) as any as S.Schema<UpdateResourceInput>,
  output: __S(16, __c2, 0) as any as S.Schema<UpdateResourceOutput>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RequestToken: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelResourceRequestInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TypeName: S.optional(S.String),
          Identifier: S.optional(S.String),
          RequestToken: S.optional(S.String),
          HooksRequestToken: S.optional(S.String),
          Operation: S.optional(S.String),
          OperationStatus: S.optional(S.String),
          EventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ResourceModel: S.optional(SensitiveString),
          StatusMessage: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          RetryAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ProgressEvent" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ProgressEvent: S.optional(__S(8, __c1, 0)) })).annotate({
        identifier: "CancelResourceRequestOutput",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TypeName: S.String,
          TypeVersionId: S.optional(S.String),
          RoleArn: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          DesiredState: SensitiveString,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateResourceInput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TypeName: S.String,
          TypeVersionId: S.optional(S.String),
          RoleArn: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Identifier: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteResourceInput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TypeName: S.String,
          TypeVersionId: S.optional(S.String),
          RoleArn: S.optional(S.String),
          Identifier: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetResourceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TypeName: S.optional(S.String),
          ResourceDescription: S.optional(__S(48, __c6, 0)),
        }),
      ).annotate({ identifier: "GetResourceOutput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.optional(S.String), Properties: S.optional(SensitiveString) }),
      ).annotate({ identifier: "ResourceDescription" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RequestToken: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResourceRequestStatusInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          HookTypeName: S.optional(S.String),
          HookTypeVersionId: S.optional(S.String),
          HookTypeArn: S.optional(S.String),
          InvocationPoint: S.optional(S.String),
          HookStatus: S.optional(S.String),
          HookEventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          HookStatusMessage: S.optional(S.String),
          FailureMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "HookProgressEvent" });
    case 2:
      return S.Array(__S(57, __c7, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ProgressEvent: S.optional(__S(8, __c1, 0)),
          HooksProgressEvent: S.optional(__S(58, __c7, 2)),
        }),
      ).annotate({ identifier: "GetResourceRequestStatusOutput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          Operations: S.optional(__S(64, __c8, 0)),
          OperationStatuses: S.optional(__S(64, __c8, 0)),
        }),
      ).annotate({ identifier: "ResourceRequestStatusFilter" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          ResourceRequestStatusFilter: S.optional(__S(65, __c8, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListResourceRequestsInput" });
    case 3:
      return S.Array(__S(8, __c1, 0));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ResourceRequestStatusSummaries: S.optional(__S(67, __c8, 3)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListResourceRequestsOutput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TypeName: S.String,
          TypeVersionId: S.optional(S.String),
          RoleArn: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          ResourceModel: S.optional(SensitiveString),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListResourcesInput" });
    case 1:
      return S.Array(__S(48, __c6, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          TypeName: S.optional(S.String),
          ResourceDescriptions: S.optional(__S(73, __c9, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListResourcesOutput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TypeName: S.String,
          TypeVersionId: S.optional(S.String),
          RoleArn: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Identifier: S.String,
          PatchDocument: SensitiveString,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateResourceInput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
