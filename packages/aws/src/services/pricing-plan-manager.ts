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
  sdkId: "Pricing Plan Manager",
  serviceShapeName: "AWSPricingPlanManager",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "pricingplanmanager" });
const ver = /*@__PURE__*/ T.ServiceVersion("2025-08-05");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver((p) => {
  const { Endpoint, _Region } = p;
  const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
    type: "endpoint" as const,
    endpoint: { url: u as string, properties: p, headers: h },
  });
  const _p0 = () => ({
    authSchemes: [{ name: "sigv4", signingName: "pricingplanmanager", signingRegion: "us-east-1" }],
  });
  if (Endpoint != null) {
    return e(`${Endpoint}`, _p0(), {});
  }
  return e("https://pricingplanmanager.us-east-1.api.aws", _p0(), {});
}, '{"url":"https://pricingplanmanager.us-east-1.api.aws","properties":{"authSchemes":[{"name":"sigv4","signingName":"pricingplanmanager","signingRegion":"us-east-1"}]},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()), resourceId: S.String },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()), resourceId: S.String },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
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
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type SubscriptionArn = string;
export type IdempotencyToken = string;
export interface ApprovePaidSubscriptionInput {
  arn: string;
  ifMatch: string;
  clientToken?: string;
}
export type ScheduledChangeType = "DOWNGRADE" | "CANCELLATION" | (string & {});
export interface ScheduledChange {
  changeType: ScheduledChangeType;
  effectiveDate?: Date;
  planTier?: string;
  usageLevel?: string;
}
export type Status = "PENDING_APPROVAL" | "ACTIVE" | "SYNC_IN_PROGRESS" | "FAILED" | (string & {});
export type ResourceArns = string[];
export interface Subscription {
  arn: string;
  planFamily: string;
  planTier: string;
  usageLevel?: string;
  scheduledChange?: ScheduledChange;
  status: Status;
  statusReason?: string;
  resourceArns: string[];
  createdAt: Date;
  updatedAt: Date;
}
export interface ApprovePaidSubscriptionOutput {
  subscription: Subscription;
  eTag: string;
}
export interface AssociateResourcesToSubscriptionInput {
  arn: string;
  resourceArns: string[];
  ifMatch: string;
  clientToken?: string;
}
export interface AssociateResourcesToSubscriptionOutput {
  subscription: Subscription;
  eTag: string;
}
export interface CancelSubscriptionInput {
  arn: string;
  ifMatch: string;
  clientToken?: string;
}
export interface CancelSubscriptionOutput {
  subscription: Subscription;
  eTag: string;
}
export interface CancelSubscriptionChangeInput {
  arn: string;
  ifMatch: string;
  clientToken?: string;
}
export interface CancelSubscriptionChangeOutput {
  subscription: Subscription;
  eTag: string;
}
export type ApprovalMode = "MANUAL" | "IMMEDIATE" | (string & {});
export interface CreateSubscriptionInput {
  planFamily: string;
  planTier: string;
  usageLevel?: string;
  resourceArns: string[];
  approvalMode?: ApprovalMode;
  clientToken?: string;
}
export interface CreateSubscriptionOutput {
  subscription: Subscription;
  eTag: string;
}
export interface DisassociateResourcesFromSubscriptionInput {
  arn: string;
  resourceArns: string[];
  ifMatch: string;
  clientToken?: string;
}
export interface DisassociateResourcesFromSubscriptionOutput {
  subscription: Subscription;
  eTag: string;
}
export interface GetSubscriptionInput {
  arn: string;
}
export interface GetSubscriptionOutput {
  subscription: Subscription;
  eTag: string;
}
export interface ListSubscriptionsInput {
  nextToken?: string;
}
export interface SubscriptionSummary {
  arn: string;
  planFamily: string;
  planTier: string;
  usageLevel?: string;
  scheduledChange?: ScheduledChange;
  status: Status;
  statusReason?: string;
  resourceArns: string[];
  createdAt: Date;
  updatedAt: Date;
  eTag: string;
}
export type SubscriptionSummaryList = SubscriptionSummary[];
export interface ListSubscriptionsOutput {
  subscriptionSummaries: SubscriptionSummary[];
  nextToken?: string;
}
export interface UpdateSubscriptionInput {
  arn: string;
  planTier: string;
  usageLevel?: string;
  ifMatch: string;
  clientToken?: string;
}
export interface UpdateSubscriptionOutput {
  subscription: Subscription;
  eTag: string;
}
export type ApprovePaidSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Approves a subscription that is in `PENDING_APPROVAL` status, activating it and starting billing.
 *
 * This operation requires the current `ETag` value for concurrency control. Retrieve it from a previous `GetSubscription` or `ListSubscriptions` response.
 */
export const approvePaidSubscription: API.OperationMethod<
  ApprovePaidSubscriptionInput,
  ApprovePaidSubscriptionOutput,
  ApprovePaidSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c6, 0) as any as S.Schema<ApprovePaidSubscriptionInput>,
  output: __S(33, __c8, 1) as any as S.Schema<ApprovePaidSubscriptionOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ApprovePaidSubscription",
}));

export type AssociateResourcesToSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds one or more resources to an existing subscription. The subscription must be in an active state that is not pending other changes.
 *
 * For subscriptions in the CloudFront plan family, the associated resources must include exactly one Amazon CloudFront distribution and one WAF web ACL. You can also include other supported resources, such as Amazon Route 53 hosted zones, and CloudFront KeyValueStores.
 */
export const associateResourcesToSubscription: API.OperationMethod<
  AssociateResourcesToSubscriptionInput,
  AssociateResourcesToSubscriptionOutput,
  AssociateResourcesToSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(36, __c9, 0) as any as S.Schema<AssociateResourcesToSubscriptionInput>,
  output: __S(33, __c8, 1) as any as S.Schema<AssociateResourcesToSubscriptionOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateResourcesToSubscription",
}));

export type CancelSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a flat-rate pricing subscription.
 *
 * For active subscriptions, the cancellation is scheduled to take effect at the end of the current billing period. The subscription remains active until that date. To revert a pending cancellation, use `CancelSubscriptionChange`.
 *
 * For subscriptions in `PENDING_APPROVAL` status, the subscription is deleted immediately without scheduling.
 */
export const cancelSubscription: API.OperationMethod<
  CancelSubscriptionInput,
  CancelSubscriptionOutput,
  CancelSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c10, 0) as any as S.Schema<CancelSubscriptionInput>,
  output: __S(33, __c8, 1) as any as S.Schema<CancelSubscriptionOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelSubscription",
}));

export type CancelSubscriptionChangeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a pending scheduled change on a subscription, such as a pending downgrade or cancellation. The subscription returns to its state before the change was scheduled.
 *
 * You cannot cancel a scheduled change close to its effective date. If the change is within the processing window, this operation returns an error.
 */
export const cancelSubscriptionChange: API.OperationMethod<
  CancelSubscriptionChangeInput,
  CancelSubscriptionChangeOutput,
  CancelSubscriptionChangeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CancelSubscriptionChangeInput>,
  output: __S(33, __c8, 1) as any as S.Schema<CancelSubscriptionChangeOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelSubscriptionChange",
}));

export type CreateSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a flat-rate pricing subscription for the specified resources.
 *
 * When `approvalMode` is set to `MANUAL`, paid-tier subscriptions are created in `PENDING_APPROVAL` status and require a separate `ApprovePaidSubscription` call before billing starts. Free-tier subscriptions are always activated immediately regardless of approval mode.
 *
 * When `approvalMode` is set to `IMMEDIATE` or is not specified, the subscription is activated immediately.
 */
export const createSubscription: API.OperationMethod<
  CreateSubscriptionInput,
  CreateSubscriptionOutput,
  CreateSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4, __c1, 0) as any as S.Schema<CreateSubscriptionInput>,
  output: __S(33, __c8, 1) as any as S.Schema<CreateSubscriptionOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSubscription",
}));

export type DisassociateResourcesFromSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more resources from an existing subscription.
 *
 * For subscriptions in the CloudFront plan family, the associated resources must always include exactly one Amazon CloudFront distribution and exactly one WAF web ACL. You cannot remove these required resources.
 */
export const disassociateResourcesFromSubscription: API.OperationMethod<
  DisassociateResourcesFromSubscriptionInput,
  DisassociateResourcesFromSubscriptionOutput,
  DisassociateResourcesFromSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8, __c2, 0) as any as S.Schema<DisassociateResourcesFromSubscriptionInput>,
  output: __S(33, __c8, 1) as any as S.Schema<DisassociateResourcesFromSubscriptionOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateResourcesFromSubscription",
}));

export type GetSubscriptionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the details of a flat-rate pricing subscription, including its current status, associated resources, and any pending scheduled changes.
 */
export const getSubscription: API.OperationMethod<
  GetSubscriptionInput,
  GetSubscriptionOutput,
  GetSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(12, __c3, 0) as any as S.Schema<GetSubscriptionInput>,
  output: __S(33, __c8, 1) as any as S.Schema<GetSubscriptionOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubscription",
}));

export type ListSubscriptionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a summary of all flat-rate pricing subscriptions in the calling account.
 */
export const listSubscriptions: API.PaginatedOperationMethod<
  ListSubscriptionsInput,
  ListSubscriptionsOutput,
  ListSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  SubscriptionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(16, __c4, 0) as any as S.Schema<ListSubscriptionsInput>,
  output: __S(19, __c4, 3) as any as S.Schema<ListSubscriptionsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubscriptions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "subscriptionSummaries",
  } as const,
})) as any;

export type UpdateSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Changes the plan tier of an existing subscription.
 *
 * Upgrades take effect immediately. Downgrades are scheduled and the current tier remains unchanged until the end of the billing cycle (calendar month). You cannot update a subscription while a scheduled change is pending. To make a new change, first cancel the pending change using `CancelSubscriptionChange`.
 *
 * This operation replaces the plan tier value. If you omit the optional `usageLevel` field, it is reset to the default.
 */
export const updateSubscription: API.OperationMethod<
  UpdateSubscriptionInput,
  UpdateSubscriptionOutput,
  UpdateSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(20, __c5, 0) as any as S.Schema<UpdateSubscriptionInput>,
  output: __S(33, __c8, 1) as any as S.Schema<UpdateSubscriptionOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSubscription",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          ifMatch: S.String.pipe(T.HttpHeader("If-Match")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/CancelSubscriptionChange" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelSubscriptionChangeInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          planFamily: S.String,
          planTier: S.String,
          usageLevel: S.optional(S.String),
          resourceArns: __S(29, __c7, 1),
          approvalMode: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/CreateSubscription" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSubscriptionInput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          resourceArns: __S(29, __c7, 1),
          ifMatch: S.String.pipe(T.HttpHeader("If-Match")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/DisassociateResourcesFromSubscription" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateResourcesFromSubscriptionInput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/GetSubscription" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSubscriptionInput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/ListSubscriptions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSubscriptionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          planFamily: S.String,
          planTier: S.String,
          usageLevel: S.optional(S.String),
          scheduledChange: S.optional(__S(28, __c7, 0)),
          status: S.String,
          statusReason: S.optional(S.String),
          resourceArns: __S(29, __c7, 1),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          eTag: S.String,
        }),
      ).annotate({ identifier: "SubscriptionSummary" });
    case 2:
      return S.Array(__S(17, __c4, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ subscriptionSummaries: __S(18, __c4, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSubscriptionsOutput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          planTier: S.String,
          usageLevel: S.optional(S.String),
          ifMatch: S.String.pipe(T.HttpHeader("If-Match")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/UpdateSubscription" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSubscriptionInput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          ifMatch: S.String.pipe(T.HttpHeader("If-Match")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/ApprovePaidSubscription" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ApprovePaidSubscriptionInput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          changeType: S.String,
          effectiveDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          planTier: S.optional(S.String),
          usageLevel: S.optional(S.String),
        }),
      ).annotate({ identifier: "ScheduledChange" });
    case 1:
      return S.Array(S.String);
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          planFamily: S.String,
          planTier: S.String,
          usageLevel: S.optional(S.String),
          scheduledChange: S.optional(__S(28, __c7, 0)),
          status: S.String,
          statusReason: S.optional(S.String),
          resourceArns: __S(29, __c7, 1),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "Subscription" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          subscription: __S(32, __c8, 0)
            .pipe(T.HttpPayload())
            .annotate({ identifier: "Subscription" }),
          eTag: S.String.pipe(T.HttpHeader("ETag")),
        }),
      ).annotate({ identifier: "ApprovePaidSubscriptionOutput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          resourceArns: __S(29, __c7, 1),
          ifMatch: S.String.pipe(T.HttpHeader("If-Match")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/AssociateResourcesToSubscription" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateResourcesToSubscriptionInput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          ifMatch: S.String.pipe(T.HttpHeader("If-Match")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/CancelSubscription" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelSubscriptionInput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
