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
  sdkId: "Pricing Plan Manager",
  target: "AWSPricingPlanManager",
  version: "2025-08-05",
  sigv4: "pricingplanmanager",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const { Endpoint, _Region } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    const _p0 = () => ({
      authSchemes: [
        {
          name: "sigv4",
          signingName: "pricingplanmanager",
          signingRegion: "us-east-1",
        },
      ],
    });
    if (Endpoint != null) {
      return e(`${Endpoint}`, _p0(), {});
    }
    return e("https://pricingplanmanager.us-east-1.api.aws", _p0(), {});
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message: string; readonly resourceId: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string; readonly resourceId: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string }> {}
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
  )<{ readonly message: string; readonly resourceId?: string }> {}
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
export type Status =
  | "PENDING_APPROVAL"
  | "ACTIVE"
  | "SYNC_IN_PROGRESS"
  | "FAILED"
  | (string & {});
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
  descriptor: {
    service: svc,
    http: "POST /v1/ApprovePaidSubscription",
    input: {
      arn: 0,
      ifMatch: D.m({ header: "If-Match" }),
      clientToken: D.m({ idempotency: true }),
    },
    output: {
      subscription: D.m({ payload: true, shape: o_Subscription }),
      eTag: D.m({ header: "ETag" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/AssociateResourcesToSubscription",
    input: {
      arn: 0,
      resourceArns: 0,
      ifMatch: D.m({ header: "If-Match" }),
      clientToken: D.m({ idempotency: true }),
    },
    output: {
      subscription: D.m({ payload: true, shape: o_Subscription }),
      eTag: D.m({ header: "ETag" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/CancelSubscription",
    input: {
      arn: 0,
      ifMatch: D.m({ header: "If-Match" }),
      clientToken: D.m({ idempotency: true }),
    },
    output: {
      subscription: D.m({ payload: true, shape: o_Subscription }),
      eTag: D.m({ header: "ETag" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/CancelSubscriptionChange",
    input: {
      arn: 0,
      ifMatch: D.m({ header: "If-Match" }),
      clientToken: D.m({ idempotency: true }),
    },
    output: {
      subscription: D.m({ payload: true, shape: o_Subscription }),
      eTag: D.m({ header: "ETag" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/CreateSubscription",
    input: {
      planFamily: 0,
      planTier: 0,
      usageLevel: 0,
      resourceArns: 0,
      approvalMode: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: {
      subscription: D.m({ payload: true, shape: o_Subscription }),
      eTag: D.m({ header: "ETag" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/DisassociateResourcesFromSubscription",
    input: {
      arn: 0,
      resourceArns: 0,
      ifMatch: D.m({ header: "If-Match" }),
      clientToken: D.m({ idempotency: true }),
    },
    output: {
      subscription: D.m({ payload: true, shape: o_Subscription }),
      eTag: D.m({ header: "ETag" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/GetSubscription",
    input: { arn: 0 },
    output: {
      subscription: D.m({ payload: true, shape: o_Subscription }),
      eTag: D.m({ header: "ETag" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/ListSubscriptions",
    input: { nextToken: 0 },
    output: {
      subscriptionSummaries: D.list({
        scheduledChange: o_ScheduledChange,
        createdAt: D.ts,
        updatedAt: D.ts,
      }),
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /v1/UpdateSubscription",
    input: {
      arn: 0,
      planTier: 0,
      usageLevel: 0,
      ifMatch: D.m({ header: "If-Match" }),
      clientToken: D.m({ idempotency: true }),
    },
    output: {
      subscription: D.m({ payload: true, shape: o_Subscription }),
      eTag: D.m({ header: "ETag" }),
    },
    body: true,
  },
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
})) as any;

const o_ScheduledChange: D.LazyStruct = () => ({ effectiveDate: D.ts });
const o_Subscription: D.LazyStruct = () => ({
  scheduledChange: o_ScheduledChange,
  createdAt: D.ts,
  updatedAt: D.ts,
});
