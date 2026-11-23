import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsServiceErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "ConnectScheduling",
  serviceShapeName: "AmazonConnectScheduling",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "connect" });
const ver = /*@__PURE__*/ T.ServiceVersion("2026-07-16");
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
              `https://connect-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://connect-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://connect.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://connect.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://connect.{R}.{D}","properties":{},"headers":{}}');

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "ConnectScheduling",
  service: "ConnectScheduling",
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: /*@__PURE__*/ S.optional(S.String),
      ResourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      RetryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: /*@__PURE__*/ S.optional(S.String),
      ResourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      QuotaCode: /*@__PURE__*/ S.optional(S.String),
      ServiceCode: /*@__PURE__*/ S.optional(S.String),
      ResourceId: /*@__PURE__*/ S.optional(S.String),
      ResourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      QuotaCode: /*@__PURE__*/ S.optional(S.String),
      ServiceCode: /*@__PURE__*/ S.optional(S.String),
      RetryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
      FieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(25, __c3, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type InstanceIdOrArn = string;
export type UserIdOrArn = string;
export type TimeOffId = string;
export type Description = string | redacted.Redacted<string>;
export type RuleFailureAction = "REJECT" | "OVERRIDE" | (string & {});
export interface ApproveTimeOffRequest {
  InstanceId: string;
  UserId: string;
  TimeOffId: string;
  Description?: string | redacted.Redacted<string> | undefined;
  RuleFailureAction?: RuleFailureAction | undefined;
}
export interface ApproveTimeOffResponse {}
export interface CancelTimeOffRequest {
  InstanceId: string;
  UserId: string;
  TimeOffId: string;
  Description?: string | redacted.Redacted<string> | undefined;
}
export interface CancelTimeOffResponse {}
export type ShiftActivityIdOrArn = string;
export type ApprovalType = "AWAIT_APPROVAL" | "AUTOMATIC" | (string & {});
export type ClientToken = string;
export interface CreateTimeOffRequest {
  InstanceId: string;
  UserId: string;
  ShiftActivityId: string;
  StartAt: Date;
  EndAt: Date;
  Description?: string | redacted.Redacted<string> | undefined;
  ApprovalType: ApprovalType;
  RuleFailureAction?: RuleFailureAction | undefined;
  ClientToken?: string | undefined;
}
export interface CreateTimeOffResponse {
  TimeOffId: string;
}
export interface GetTimeOffRequest {
  InstanceId: string;
  UserId: string;
  TimeOffId: string;
}
export type UserId = string;
export type ShiftActivityId = string;
export type TimeOffStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED"
  | "AWAITING_APPROVAL"
  | (string & {});
export type TimeOffValidationSeverity = "WARNING" | "ERROR" | (string & {});
export type TimeOffValidationCode =
  | "INSUFFICIENT_USER_TIME_OFF_BALANCE"
  | "INSUFFICIENT_GROUP_TIME_OFF_ALLOWANCE"
  | "INSUFFICIENT_STAFFING_GROUP_TIME_OFF_ALLOWANCE"
  | "CONFLICTING_TIME_OFF_REQUEST"
  | (string & {});
export interface TimeOffValidationResult {
  Severity: TimeOffValidationSeverity;
  Code: TimeOffValidationCode;
}
export type TimeOffValidationResults = TimeOffValidationResult[];
export type ARN = string;
export type ActorInfo =
  | { ConnectUserArn: string; AWSIdentityArn?: undefined }
  | { ConnectUserArn?: undefined; AWSIdentityArn: string };
export interface GetTimeOffResponse {
  TimeOffId: string;
  UserId: string;
  ShiftActivityId: string;
  StartAt: Date;
  EndAt: Date;
  Status: TimeOffStatus;
  Description?: string | redacted.Redacted<string> | undefined;
  ValidationResults?: TimeOffValidationResult[] | undefined;
  CreatedBy: ActorInfo;
  CreatedAt: Date;
  UpdatedBy?: ActorInfo | undefined;
  UpdatedAt: Date;
}
export type DurationValue = number;
export type DurationUnit = "MINUTES" | "HOURS" | "DAYS" | (string & {});
export interface Duration {
  Value: number;
  Unit: DurationUnit;
}
export interface PutTimeOffBalanceRequest {
  InstanceId: string;
  UserId: string;
  ShiftActivityId: string;
  Balance: Duration;
}
export interface PutTimeOffBalanceResponse {}
export interface RejectTimeOffRequest {
  InstanceId: string;
  UserId: string;
  TimeOffId: string;
  Description?: string | redacted.Redacted<string> | undefined;
}
export interface RejectTimeOffResponse {}
export type Message = string;
export type ValidationExceptionReason =
  | "UNKNOWN_OPERATION"
  | "CANNOT_PARSE"
  | "FIELD_VALIDATION_FAILED"
  | "OTHER"
  | (string & {});
export interface ValidationExceptionField {
  Name: string;
  Message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type ApproveTimeOffError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Approves a time off request. Evaluates agent time off balances and group time off allowances before approving. `RuleFailureAction` controls what happens when these evaluations fail. The request is rejected with `CONFLICTING_TIME_OFF_REQUEST` if it overlaps another time off request for the user that is `APPROVED` or being approved.
 *
 * The time off request is processed asynchronously, so a successful call doesn't indicate the final status. Read the resulting status with `GetTimeOff` or from the time off state-change events.
 *
 * Approving an `APPROVED` request succeeds without a change. Approving a `REJECTED` request evaluates the rules again, so it can end `APPROVED` or `REJECTED`, and repeating the call can give a different result. Check the status with `GetTimeOff` before you retry.
 *
 * Returns `ConflictException` if the request is `PENDING` or `CANCELLED`. `PENDING` means Connect Customer is still processing the request asynchronously. Wait until `GetTimeOff` returns a status other than `PENDING`, and then retry.
 *
 * When the approval succeeds, Connect Customer cancels any overtime or voluntary time off activity that overlaps the approved window.
 *
 * Connect Customer doesn't check whether the principal that calls this operation supervises the user. The staffing group's approval settings also don't apply. IAM permissions are the only control. If you allow a principal to call this operation, that principal can send `RuleFailureAction` `OVERRIDE` and approve a request past failed rules. Grant permission for this operation only to principals that you trust to override time off rules.
 */
export const approveTimeOff: API.OperationMethod<
  ApproveTimeOffRequest & RegionInput,
  ApproveTimeOffResponse,
  ApproveTimeOffError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<ApproveTimeOffRequest>,
  output: __S(40, __c5, 0) as any as S.Schema<ApproveTimeOffResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ApproveTimeOff",
  telemetry: TELEMETRY,
  span: "ApproveTimeOff",
}));

export type CancelTimeOffError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a time off request.
 *
 * Cancelling a `CANCELLED` request succeeds without a change. Returns `ConflictException` if the request is `PENDING`, which means Connect Customer is still processing the request asynchronously. Wait until `GetTimeOff` returns a status other than `PENDING`, and then retry.
 */
export const cancelTimeOff: API.OperationMethod<
  CancelTimeOffRequest & RegionInput,
  CancelTimeOffResponse,
  CancelTimeOffError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<CancelTimeOffRequest>,
  output: __S(40, __c5, 0) as any as S.Schema<CancelTimeOffResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelTimeOff",
  telemetry: TELEMETRY,
  span: "CancelTimeOff",
}));

export type CreateTimeOffError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a time off request for a user. You don't provide a status, because Connect Customer owns the request lifecycle. To get the decided status, call `GetTimeOff` or use the time off state-change events.
 *
 * `ApprovalType` controls who approves the request. You can specify one of the following values:
 *
 * - `AWAIT_APPROVAL`: the request waits in `AWAITING_APPROVAL` until you call `ApproveTimeOff` or `RejectTimeOff`. Rule evaluation and the overlap check run at approval, not at creation. A waiting request doesn't reserve its window, so another request for the same window can be approved first.
 *
 * - `AUTOMATIC`: Connect Customer evaluates the rules (time off balances and group allowances) and decides the request. The request can be `PENDING` while Connect Customer decides, and then ends `APPROVED` or `REJECTED`. If it overlaps another time off request for the user, the requested time off ends `REJECTED` with `CONFLICTING_TIME_OFF_REQUEST`. It also ends `REJECTED` if it overlaps overtime or voluntary time off. If the whole window is in the past, Connect Customer records failed rules as `WARNING` and doesn't reject the request, whatever the `RuleFailureAction`.
 *
 * The staffing group's *Supervisor approval needed* setting doesn't apply to this operation. `ApprovalType` alone decides whether the request waits for approval. The operation fails with `ValidationException` on `UserId` in the following cases:
 *
 * - The user isn't in a staffing group, or the staffing group isn't associated with a forecast group.
 *
 * - Time off isn't enabled for the user's staffing group, or the user's staff rules don't allow time off.
 *
 * To change the dates of a request, cancel it with `CancelTimeOff` and create a new request. The new request has a new `TimeOffId`.
 *
 * Connect Customer doesn't check whether the principal that calls this operation supervises the user. The staffing group's approval settings also don't apply. IAM permissions are the only control. If you allow a principal to call this operation, that principal can send `ApprovalType` `AUTOMATIC` with `RuleFailureAction` `OVERRIDE` and approve a request past failed rules. Grant permission for this operation only to principals that you trust to override time off rules.
 *
 * For information about time off in the Connect Customer admin website, see Time off management in the *Connect Customer Administrator Guide*.
 */
export const createTimeOff: API.OperationMethod<
  CreateTimeOffRequest & RegionInput,
  CreateTimeOffResponse,
  CreateTimeOffError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<CreateTimeOffRequest>,
  output: __S(57, __c7, 1) as any as S.Schema<CreateTimeOffResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTimeOff",
  telemetry: TELEMETRY,
  span: "CreateTimeOff",
}));

export type GetTimeOffError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a time off request, including its current status and validation results.
 */
export const getTimeOff: API.OperationMethod<
  GetTimeOffRequest & RegionInput,
  GetTimeOffResponse,
  GetTimeOffError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<GetTimeOffRequest>,
  output: __S(4, __c0, 4) as any as S.Schema<GetTimeOffResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTimeOff",
  telemetry: TELEMETRY,
  span: "GetTimeOff",
}));

export type PutTimeOffBalanceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets the time off balance for one user and shift activity. The value replaces the existing balance rather than adjusting it, so you can safely retry the call. This operation can't remove a balance. To remove one, upload a blank balance in the Connect Customer admin website. For more information, see Import an agent's time off balance in the *Connect Customer Administrator Guide*.
 */
export const putTimeOffBalance: API.OperationMethod<
  PutTimeOffBalanceRequest & RegionInput,
  PutTimeOffBalanceResponse,
  PutTimeOffBalanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(9, __c1, 1) as any as S.Schema<PutTimeOffBalanceRequest>,
  output: __S(40, __c5, 0) as any as S.Schema<PutTimeOffBalanceResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTimeOffBalance",
  telemetry: TELEMETRY,
  span: "PutTimeOffBalance",
}));

export type RejectTimeOffError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Rejects a time off request.
 *
 * Rejecting a `REJECTED` request succeeds without a change. Returns `ConflictException` if the request is `PENDING` or `CANCELLED`. `PENDING` means Connect Customer is still processing the request asynchronously. Wait until `GetTimeOff` returns a status other than `PENDING`, and then retry.
 */
export const rejectTimeOff: API.OperationMethod<
  RejectTimeOffRequest & RegionInput,
  RejectTimeOffResponse,
  RejectTimeOffError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c2, 0) as any as S.Schema<RejectTimeOffRequest>,
  output: __S(40, __c5, 0) as any as S.Schema<RejectTimeOffResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectTimeOff",
  telemetry: TELEMETRY,
  span: "RejectTimeOff",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.String.pipe(T.HttpLabel("InstanceId")),
          UserId: S.String.pipe(T.HttpLabel("UserId")),
          TimeOffId: S.String.pipe(T.HttpLabel("TimeOffId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/scheduling/instances/{InstanceId}/users/{UserId}/timeoffs/{TimeOffId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTimeOffRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Severity: S.String, Code: S.String })).annotate({
        identifier: "TimeOffValidationResult",
      });
    case 2:
      return S.Array(__S(1, __c0, 1));
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ ConnectUserArn: S.String }),
        /*@__PURE__*/ S.Struct({ AWSIdentityArn: S.String }),
      ]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          TimeOffId: S.String,
          UserId: S.String,
          ShiftActivityId: S.String,
          StartAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Status: S.String,
          Description: S.optional(SensitiveString),
          ValidationResults: S.optional(__S(2, __c0, 2)),
          CreatedBy: __S(3, __c0, 3),
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          UpdatedBy: S.optional(__S(3, __c0, 3)),
          UpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "GetTimeOffResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Value: S.Number, Unit: S.String })).annotate({
        identifier: "Duration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.String.pipe(T.HttpLabel("InstanceId")),
          UserId: S.String.pipe(T.HttpLabel("UserId")),
          ShiftActivityId: S.String.pipe(T.HttpLabel("ShiftActivityId")),
          Balance: __S(8, __c1, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/scheduling/instances/{InstanceId}/users/{UserId}/timeoff-balances/{ShiftActivityId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutTimeOffBalanceRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.String.pipe(T.HttpLabel("InstanceId")),
          UserId: S.String.pipe(T.HttpLabel("UserId")),
          TimeOffId: S.String.pipe(T.HttpLabel("TimeOffId")),
          Description: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/scheduling/instances/{InstanceId}/users/{UserId}/timeoffs/{TimeOffId}/reject",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RejectTimeOffRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String, Message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(24, __c3, 0));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.String.pipe(T.HttpLabel("InstanceId")),
          UserId: S.String.pipe(T.HttpLabel("UserId")),
          TimeOffId: S.String.pipe(T.HttpLabel("TimeOffId")),
          Description: S.optional(SensitiveString),
          RuleFailureAction: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/scheduling/instances/{InstanceId}/users/{UserId}/timeoffs/{TimeOffId}/approve",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ApproveTimeOffRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "ApproveTimeOffResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.String.pipe(T.HttpLabel("InstanceId")),
          UserId: S.String.pipe(T.HttpLabel("UserId")),
          TimeOffId: S.String.pipe(T.HttpLabel("TimeOffId")),
          Description: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/scheduling/instances/{InstanceId}/users/{UserId}/timeoffs/{TimeOffId}/cancel",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelTimeOffRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.String.pipe(T.HttpLabel("InstanceId")),
          UserId: S.String.pipe(T.HttpLabel("UserId")),
          ShiftActivityId: S.String,
          StartAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Description: S.optional(SensitiveString),
          ApprovalType: S.String,
          RuleFailureAction: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/scheduling/instances/{InstanceId}/users/{UserId}/timeoffs",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateTimeOffRequest" });
    case 1:
      return S.suspend(() => S.Struct({ TimeOffId: S.String })).annotate({
        identifier: "CreateTimeOffResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
