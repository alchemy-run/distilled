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
  sdkId: "ARC Zonal Shift",
  serviceShapeName: "PercDataPlane",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "arc-zonal-shift" });
const ver = /*@__PURE__*/ T.ServiceVersion("2022-10-30");
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
              `https://arc-zonal-shift-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://arc-zonal-shift-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://arc-zonal-shift.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://arc-zonal-shift.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://arc-zonal-shift.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ConflictExceptionReason",
      }),
      zonalShiftId: /*@__PURE__*/ S.optional(S.String),
    },
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
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
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
      reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ZonalShiftId = string;
export interface CancelPracticeRunRequest {
  zonalShiftId: string;
}
export type ResourceIdentifier = string;
export type AvailabilityZone = string;
export type ExpiryTime = Date;
export type StartTime = Date;
export type ZonalShiftStatus = "ACTIVE" | "EXPIRED" | "CANCELED" | (string & {});
export type ZonalShiftComment = string;
export interface CancelPracticeRunResponse {
  zonalShiftId: string;
  resourceIdentifier: string;
  awayFrom: string;
  expiryTime: Date;
  startTime: Date;
  status: ZonalShiftStatus;
  comment: string;
}
export interface CancelZonalShiftRequest {
  zonalShiftId: string;
}
export interface ZonalShift {
  zonalShiftId: string;
  resourceIdentifier: string;
  awayFrom: string;
  expiryTime: Date;
  startTime: Date;
  status: ZonalShiftStatus;
  comment: string;
}
export type BlockedWindow = string;
export type BlockedWindows = string[];
export type BlockedDate = string;
export type BlockedDates = string[];
export type ControlConditionType = "CLOUDWATCH" | (string & {});
export type MetricIdentifier = string;
export interface ControlCondition {
  type: ControlConditionType;
  alarmIdentifier: string;
}
export type BlockingAlarms = ControlCondition[];
export type AllowedWindow = string;
export type AllowedWindows = string[];
export type OutcomeAlarms = ControlCondition[];
export interface CreatePracticeRunConfigurationRequest {
  resourceIdentifier: string;
  blockedWindows?: string[];
  blockedDates?: string[];
  blockingAlarms?: ControlCondition[];
  allowedWindows?: string[];
  outcomeAlarms: ControlCondition[];
}
export type ResourceArn = string;
export type ResourceName = string;
export type ZonalAutoshiftStatus = "ENABLED" | "DISABLED" | (string & {});
export interface PracticeRunConfiguration {
  blockingAlarms?: ControlCondition[];
  outcomeAlarms: ControlCondition[];
  blockedWindows?: string[];
  allowedWindows?: string[];
  blockedDates?: string[];
}
export interface CreatePracticeRunConfigurationResponse {
  arn: string;
  name: string;
  zonalAutoshiftStatus: ZonalAutoshiftStatus;
  practiceRunConfiguration: PracticeRunConfiguration;
}
export interface DeletePracticeRunConfigurationRequest {
  resourceIdentifier: string;
}
export interface DeletePracticeRunConfigurationResponse {
  arn: string;
  name: string;
  zonalAutoshiftStatus: ZonalAutoshiftStatus;
}
export interface GetAutoshiftObserverNotificationStatusRequest {}
export type AutoshiftObserverNotificationStatus = "ENABLED" | "DISABLED" | (string & {});
export interface GetAutoshiftObserverNotificationStatusResponse {
  status: AutoshiftObserverNotificationStatus;
}
export interface GetManagedResourceRequest {
  resourceIdentifier: string;
}
export type Weight = number;
export type AppliedWeights = { [key: string]: number | undefined };
export type AppliedStatus = "APPLIED" | "NOT_APPLIED" | (string & {});
export type ShiftType =
  | "ZONAL_SHIFT"
  | "PRACTICE_RUN"
  | "FIS_EXPERIMENT"
  | "ZONAL_AUTOSHIFT"
  | (string & {});
export type PracticeRunOutcome =
  | "FAILED"
  | "INTERRUPTED"
  | "PENDING"
  | "SUCCEEDED"
  | "CAPACITY_CHECK_FAILED"
  | (string & {});
export interface ZonalShiftInResource {
  appliedStatus: AppliedStatus;
  zonalShiftId: string;
  resourceIdentifier: string;
  awayFrom: string;
  expiryTime: Date;
  startTime: Date;
  comment: string;
  shiftType?: ShiftType;
  practiceRunOutcome?: PracticeRunOutcome;
}
export type ZonalShiftsInResource = ZonalShiftInResource[];
export type AutoshiftAppliedStatus = "APPLIED" | "NOT_APPLIED" | (string & {});
export interface AutoshiftInResource {
  appliedStatus: AutoshiftAppliedStatus;
  awayFrom: string;
  startTime: Date;
}
export type AutoshiftsInResource = AutoshiftInResource[];
export interface GetManagedResourceResponse {
  arn?: string;
  name?: string;
  appliedWeights: { [key: string]: number | undefined };
  zonalShifts: ZonalShiftInResource[];
  autoshifts?: AutoshiftInResource[];
  practiceRunConfiguration?: PracticeRunConfiguration;
  zonalAutoshiftStatus?: ZonalAutoshiftStatus;
}
export type AutoshiftExecutionStatus = "ACTIVE" | "COMPLETED" | (string & {});
export type MaxResults = number;
export interface ListAutoshiftsRequest {
  nextToken?: string;
  status?: AutoshiftExecutionStatus;
  maxResults?: number;
}
export interface AutoshiftSummary {
  awayFrom: string;
  endTime?: Date;
  startTime: Date;
  status: AutoshiftExecutionStatus;
}
export type AutoshiftSummaries = AutoshiftSummary[];
export interface ListAutoshiftsResponse {
  items?: AutoshiftSummary[];
  nextToken?: string;
}
export interface ListManagedResourcesRequest {
  nextToken?: string;
  maxResults?: number;
}
export type AvailabilityZones = string[];
export interface ManagedResourceSummary {
  arn?: string;
  name?: string;
  availabilityZones: string[];
  appliedWeights?: { [key: string]: number | undefined };
  zonalShifts?: ZonalShiftInResource[];
  autoshifts?: AutoshiftInResource[];
  zonalAutoshiftStatus?: ZonalAutoshiftStatus;
  practiceRunStatus?: ZonalAutoshiftStatus;
}
export type ManagedResourceSummaries = ManagedResourceSummary[];
export interface ListManagedResourcesResponse {
  items: ManagedResourceSummary[];
  nextToken?: string;
}
export interface ListZonalShiftsRequest {
  nextToken?: string;
  status?: ZonalShiftStatus;
  maxResults?: number;
  resourceIdentifier?: string;
}
export interface ZonalShiftSummary {
  zonalShiftId: string;
  resourceIdentifier: string;
  awayFrom: string;
  expiryTime: Date;
  startTime: Date;
  status: ZonalShiftStatus;
  comment: string;
  shiftType?: ShiftType;
  practiceRunOutcome?: PracticeRunOutcome;
}
export type ZonalShiftSummaries = ZonalShiftSummary[];
export interface ListZonalShiftsResponse {
  items?: ZonalShiftSummary[];
  nextToken?: string;
}
export interface StartPracticeRunRequest {
  resourceIdentifier: string;
  awayFrom: string;
  comment: string;
}
export interface StartPracticeRunResponse {
  zonalShiftId: string;
  resourceIdentifier: string;
  awayFrom: string;
  expiryTime: Date;
  startTime: Date;
  status: ZonalShiftStatus;
  comment: string;
}
export type ExpiresIn = string;
export interface StartZonalShiftRequest {
  resourceIdentifier: string;
  awayFrom: string;
  expiresIn: string;
  comment: string;
}
export interface UpdateAutoshiftObserverNotificationStatusRequest {
  status: AutoshiftObserverNotificationStatus;
}
export interface UpdateAutoshiftObserverNotificationStatusResponse {
  status: AutoshiftObserverNotificationStatus;
}
export interface UpdatePracticeRunConfigurationRequest {
  resourceIdentifier: string;
  blockedWindows?: string[];
  blockedDates?: string[];
  blockingAlarms?: ControlCondition[];
  allowedWindows?: string[];
  outcomeAlarms?: ControlCondition[];
}
export interface UpdatePracticeRunConfigurationResponse {
  arn: string;
  name: string;
  zonalAutoshiftStatus: ZonalAutoshiftStatus;
  practiceRunConfiguration: PracticeRunConfiguration;
}
export interface UpdateZonalAutoshiftConfigurationRequest {
  resourceIdentifier: string;
  zonalAutoshiftStatus: ZonalAutoshiftStatus;
}
export interface UpdateZonalAutoshiftConfigurationResponse {
  resourceIdentifier: string;
  zonalAutoshiftStatus: ZonalAutoshiftStatus;
}
export interface UpdateZonalShiftRequest {
  zonalShiftId: string;
  comment?: string;
  expiresIn?: string;
}
export type ConflictExceptionReason =
  | "ZonalShiftAlreadyExists"
  | "ZonalShiftStatusNotActive"
  | "SimultaneousZonalShiftsConflict"
  | "PracticeConfigurationAlreadyExists"
  | "AutoShiftEnabled"
  | "PracticeConfigurationDoesNotExist"
  | "ZonalAutoshiftActive"
  | "PracticeOutcomeAlarmsRed"
  | "PracticeBlockingAlarmsRed"
  | "PracticeInBlockedDates"
  | "PracticeInBlockedWindows"
  | "PracticeOutsideAllowedWindows"
  | (string & {});
export type ValidationExceptionReason =
  | "InvalidExpiresIn"
  | "InvalidStatus"
  | "MissingValue"
  | "InvalidToken"
  | "InvalidResourceIdentifier"
  | "InvalidAz"
  | "UnsupportedAz"
  | "InvalidAlarmCondition"
  | "InvalidConditionType"
  | "InvalidPracticeBlocker"
  | "FISExperimentUpdateNotAllowed"
  | "AutoshiftUpdateNotAllowed"
  | "UnsupportedPracticeCancelShiftType"
  | "InvalidPracticeAllowedWindow"
  | "InvalidPracticeWindows"
  | (string & {});
export type CancelPracticeRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancel an in-progress practice run zonal shift in Amazon Application Recovery Controller.
 */
export const cancelPracticeRun: API.OperationMethod<
  CancelPracticeRunRequest,
  CancelPracticeRunResponse,
  CancelPracticeRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<CancelPracticeRunRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<CancelPracticeRunResponse>,
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
  operationName: "CancelPracticeRun",
}));

export type CancelZonalShiftError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancel a zonal shift in Amazon Application Recovery Controller. To cancel the zonal shift, specify the zonal shift ID.
 *
 * A zonal shift can be one that you've started for a resource in your Amazon Web Services account in an Amazon Web Services Region, or it can be a zonal shift started by a practice run with zonal autoshift.
 */
export const cancelZonalShift: API.OperationMethod<
  CancelZonalShiftRequest,
  ZonalShift,
  CancelZonalShiftError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<CancelZonalShiftRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<ZonalShift>,
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
  operationName: "CancelZonalShift",
}));

export type CreatePracticeRunConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A practice run configuration for zonal autoshift is required when you enable zonal autoshift. A practice run configuration includes specifications for blocked dates and blocked time windows, and for Amazon CloudWatch alarms that you create to use with practice runs. The alarms that you specify are an *outcome alarm*, to monitor application health during practice runs and, optionally, a *blocking alarm*, to block practice runs from starting.
 *
 * When a resource has a practice run configuration, ARC starts zonal shifts for the resource weekly, to shift traffic for practice runs. Practice runs help you to ensure that shifting away traffic from an Availability Zone during an autoshift is safe for your application.
 *
 * For more information, see Considerations when you configure zonal autoshift in the Amazon Application Recovery Controller Developer Guide.
 */
export const createPracticeRunConfiguration: API.OperationMethod<
  CreatePracticeRunConfigurationRequest,
  CreatePracticeRunConfigurationResponse,
  CreatePracticeRunConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<CreatePracticeRunConfigurationRequest>,
  output: __S(152, __c19, 0) as any as S.Schema<CreatePracticeRunConfigurationResponse>,
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
  operationName: "CreatePracticeRunConfiguration",
}));

export type DeletePracticeRunConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the practice run configuration for a resource. Before you can delete a practice run configuration for a resource., you must disable zonal autoshift for the resource. Practice runs must be configured for zonal autoshift to be enabled.
 */
export const deletePracticeRunConfiguration: API.OperationMethod<
  DeletePracticeRunConfigurationRequest,
  DeletePracticeRunConfigurationResponse,
  DeletePracticeRunConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<DeletePracticeRunConfigurationRequest>,
  output: __S(161, __c20, 1) as any as S.Schema<DeletePracticeRunConfigurationResponse>,
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
  operationName: "DeletePracticeRunConfiguration",
}));

export type GetAutoshiftObserverNotificationStatusError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the status of the autoshift observer notification. Autoshift observer notifications notify you through Amazon EventBridge when there is an autoshift event for zonal autoshift. The status can be `ENABLED` or `DISABLED`. When `ENABLED`, a notification is sent when an autoshift is triggered. When `DISABLED`, notifications are not sent.
 */
export const getAutoshiftObserverNotificationStatus: API.OperationMethod<
  GetAutoshiftObserverNotificationStatusRequest,
  GetAutoshiftObserverNotificationStatusResponse,
  GetAutoshiftObserverNotificationStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<GetAutoshiftObserverNotificationStatusRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<GetAutoshiftObserverNotificationStatusResponse>,
  errors: [AccessDeniedException, InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutoshiftObserverNotificationStatus",
}));

export type GetManagedResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get information about a resource that's been registered for zonal shifts with Amazon Application Recovery Controller in this Amazon Web Services Region. Resources that are registered for zonal shifts are managed resources in ARC. You can start zonal shifts and configure zonal autoshift for managed resources.
 */
export const getManagedResource: API.OperationMethod<
  GetManagedResourceRequest,
  GetManagedResourceResponse,
  GetManagedResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c2, 0) as any as S.Schema<GetManagedResourceRequest>,
  output: __S(17, __c2, 1) as any as S.Schema<GetManagedResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetManagedResource",
}));

export type ListAutoshiftsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the autoshifts for an Amazon Web Services Region. By default, the call returns only `ACTIVE` autoshifts. Optionally, you can specify the `status` parameter to return `COMPLETED` autoshifts.
 */
export const listAutoshifts: API.PaginatedOperationMethod<
  ListAutoshiftsRequest,
  ListAutoshiftsResponse,
  ListAutoshiftsError,
  Credentials | HttpClient.HttpClient,
  AutoshiftSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<ListAutoshiftsRequest>,
  output: __S(35, __c4, 3) as any as S.Schema<ListAutoshiftsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutoshifts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListManagedResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the resources in your Amazon Web Services account in this Amazon Web Services Region that are managed for zonal shifts in Amazon Application Recovery Controller, and information about them. The information includes the zonal autoshift status for the resource, as well as the Amazon Resource Name (ARN), the Availability Zones that each resource is deployed in, and the resource name.
 */
export const listManagedResources: API.PaginatedOperationMethod<
  ListManagedResourcesRequest,
  ListManagedResourcesResponse,
  ListManagedResourcesError,
  Credentials | HttpClient.HttpClient,
  ManagedResourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<ListManagedResourcesRequest>,
  output: __S(43, __c5, 3) as any as S.Schema<ListManagedResourcesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListZonalShiftsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all active and completed zonal shifts in Amazon Application Recovery Controller in your Amazon Web Services account in this Amazon Web Services Region. `ListZonalShifts` returns customer-initiated zonal shifts, as well as practice run zonal shifts that ARC started on your behalf for zonal autoshift.
 *
 * For more information about listing autoshifts, see ">ListAutoshifts.
 */
export const listZonalShifts: API.PaginatedOperationMethod<
  ListZonalShiftsRequest,
  ListZonalShiftsResponse,
  ListZonalShiftsError,
  Credentials | HttpClient.HttpClient,
  ZonalShiftSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<ListZonalShiftsRequest>,
  output: __S(51, __c6, 3) as any as S.Schema<ListZonalShiftsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListZonalShifts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type StartPracticeRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Start an on-demand practice run zonal shift in Amazon Application Recovery Controller. With zonal autoshift enabled, you can start an on-demand practice run to verify preparedness at any time. Amazon Web Services also runs automated practice runs about weekly when you have enabled zonal autoshift.
 *
 * For more information, see Considerations when you configure zonal autoshift in the Amazon Application Recovery Controller Developer Guide.
 */
export const startPracticeRun: API.OperationMethod<
  StartPracticeRunRequest,
  StartPracticeRunResponse,
  StartPracticeRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<StartPracticeRunRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<StartPracticeRunResponse>,
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
  operationName: "StartPracticeRun",
}));

export type StartZonalShiftError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * You start a zonal shift to temporarily move load balancer traffic away from an Availability Zone in an Amazon Web Services Region, to help your application recover immediately, for example, from a developer's bad code deployment or from an Amazon Web Services infrastructure failure in a single Availability Zone. You can start a zonal shift in ARC only for managed resources in your Amazon Web Services account in an Amazon Web Services Region. Resources are automatically registered with ARC by Amazon Web Services services.
 *
 * Amazon Application Recovery Controller currently supports enabling the following resources for zonal shift and zonal autoshift:
 *
 * - Amazon EC2 Auto Scaling groups
 *
 * - Amazon Elastic Kubernetes Service
 *
 * - Application Load Balancer
 *
 * - Network Load Balancer
 *
 * When you start a zonal shift, traffic for the resource is no longer routed to the Availability Zone. The zonal shift is created immediately in ARC. However, it can take a short time, typically up to a few minutes, for existing, in-progress connections in the Availability Zone to complete.
 *
 * For more information, see Zonal shift in the Amazon Application Recovery Controller Developer Guide.
 */
export const startZonalShift: API.OperationMethod<
  StartZonalShiftRequest,
  ZonalShift,
  StartZonalShiftError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<StartZonalShiftRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<ZonalShift>,
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
  operationName: "StartZonalShift",
}));

export type UpdateAutoshiftObserverNotificationStatusError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the status of autoshift observer notification. Autoshift observer notification enables you to be notified, through Amazon EventBridge, when there is an autoshift event for zonal autoshift.
 *
 * If the status is `ENABLED`, ARC includes all autoshift events when you use the EventBridge pattern `Autoshift In Progress`. When the status is `DISABLED`, ARC includes only autoshift events for autoshifts when one or more of your resources is included in the autoshift.
 *
 * For more information, see Notifications for practice runs and autoshifts in the Amazon Application Recovery Controller Developer Guide.
 */
export const updateAutoshiftObserverNotificationStatus: API.OperationMethod<
  UpdateAutoshiftObserverNotificationStatusRequest,
  UpdateAutoshiftObserverNotificationStatusResponse,
  UpdateAutoshiftObserverNotificationStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<UpdateAutoshiftObserverNotificationStatusRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<UpdateAutoshiftObserverNotificationStatusResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAutoshiftObserverNotificationStatus",
}));

export type UpdatePracticeRunConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a practice run configuration to change one or more of the following: add, change, or remove the blocking alarm; change the outcome alarm; or add, change, or remove blocking dates or time windows.
 */
export const updatePracticeRunConfiguration: API.OperationMethod<
  UpdatePracticeRunConfigurationRequest,
  UpdatePracticeRunConfigurationResponse,
  UpdatePracticeRunConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<UpdatePracticeRunConfigurationRequest>,
  output: __S(152, __c19, 0) as any as S.Schema<UpdatePracticeRunConfigurationResponse>,
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
  operationName: "UpdatePracticeRunConfiguration",
}));

export type UpdateZonalAutoshiftConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The zonal autoshift configuration for a resource includes the practice run configuration and the status for running autoshifts, zonal autoshift status. When a resource has a practice run configuration, ARC starts weekly zonal shifts for the resource, to shift traffic away from an Availability Zone. Weekly practice runs help you to make sure that your application can continue to operate normally with the loss of one Availability Zone.
 *
 * You can update the zonal autoshift status to enable or disable zonal autoshift. When zonal autoshift is `ENABLED`, you authorize Amazon Web Services to shift away resource traffic for an application from an Availability Zone during events, on your behalf, to help reduce time to recovery. Traffic is also shifted away for the required weekly practice runs.
 */
export const updateZonalAutoshiftConfiguration: API.OperationMethod<
  UpdateZonalAutoshiftConfigurationRequest,
  UpdateZonalAutoshiftConfigurationResponse,
  UpdateZonalAutoshiftConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<UpdateZonalAutoshiftConfigurationRequest>,
  output: __S(89, __c11, 1) as any as S.Schema<UpdateZonalAutoshiftConfigurationResponse>,
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
  operationName: "UpdateZonalAutoshiftConfiguration",
}));

export type UpdateZonalShiftError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update an active zonal shift in Amazon Application Recovery Controller in your Amazon Web Services account. You can update a zonal shift to set a new expiration, or edit or replace the comment for the zonal shift.
 */
export const updateZonalShift: API.OperationMethod<
  UpdateZonalShiftRequest,
  ZonalShift,
  UpdateZonalShiftError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<UpdateZonalShiftRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<ZonalShift>,
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
  operationName: "UpdateZonalShift",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/autoshift-observer-notification" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAutoshiftObserverNotificationStatusRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ status: S.String })).annotate({
        identifier: "GetAutoshiftObserverNotificationStatusResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceIdentifier: S.String.pipe(T.HttpLabel("resourceIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/managedresources/{resourceIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetManagedResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          appliedWeights: __S(24, __c3, 0),
          zonalShifts: __S(26, __c3, 2),
          autoshifts: S.optional(__S(28, __c3, 4)),
          practiceRunConfiguration: S.optional(__S(146, __c18, 2)),
          zonalAutoshiftStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetManagedResourceResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          appliedStatus: S.String,
          zonalShiftId: S.String,
          resourceIdentifier: S.String,
          awayFrom: S.String,
          expiryTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          comment: S.String,
          shiftType: S.optional(S.String),
          practiceRunOutcome: S.optional(S.String),
        }),
      ).annotate({ identifier: "ZonalShiftInResource" });
    case 2:
      return S.Array(__S(25, __c3, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          appliedStatus: S.String,
          awayFrom: S.String,
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "AutoshiftInResource" });
    case 4:
      return S.Array(__S(27, __c3, 3));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/autoshifts" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAutoshiftsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          awayFrom: S.String,
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          status: S.String,
        }),
      ).annotate({ identifier: "AutoshiftSummary" });
    case 2:
      return S.Array(__S(33, __c4, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(34, __c4, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAutoshiftsResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/managedresources" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListManagedResourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          availabilityZones: __S(136, __c17, 0),
          appliedWeights: S.optional(__S(24, __c3, 0)),
          zonalShifts: S.optional(__S(26, __c3, 2)),
          autoshifts: S.optional(__S(28, __c3, 4)),
          zonalAutoshiftStatus: S.optional(S.String),
          practiceRunStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "ManagedResourceSummary" });
    case 2:
      return S.Array(__S(41, __c5, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(42, __c5, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListManagedResourcesResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          resourceIdentifier: S.optional(S.String).pipe(T.HttpQuery("resourceIdentifier")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/zonalshifts" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListZonalShiftsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          zonalShiftId: S.String,
          resourceIdentifier: S.String,
          awayFrom: S.String,
          expiryTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          status: S.String,
          comment: S.String,
          shiftType: S.optional(S.String),
          practiceRunOutcome: S.optional(S.String),
        }),
      ).annotate({ identifier: "ZonalShiftSummary" });
    case 2:
      return S.Array(__S(49, __c6, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(50, __c6, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListZonalShiftsResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceIdentifier: S.String, awayFrom: S.String, comment: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/practiceruns" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartPracticeRunRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceIdentifier: S.String,
          awayFrom: S.String,
          expiresIn: S.String,
          comment: S.String,
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/zonalshifts" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartZonalShiftRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ status: S.String }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/autoshift-observer-notification" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAutoshiftObserverNotificationStatusRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceIdentifier: S.String.pipe(T.HttpLabel("resourceIdentifier")),
          blockedWindows: S.optional(__S(136, __c17, 0)),
          blockedDates: S.optional(__S(136, __c17, 0)),
          blockingAlarms: S.optional(__S(145, __c18, 1)),
          allowedWindows: S.optional(__S(136, __c17, 0)),
          outcomeAlarms: S.optional(__S(145, __c18, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/configuration/{resourceIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePracticeRunConfigurationRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceIdentifier: S.String.pipe(T.HttpLabel("resourceIdentifier")),
          zonalAutoshiftStatus: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/managedresources/{resourceIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateZonalAutoshiftConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ resourceIdentifier: S.String, zonalAutoshiftStatus: S.String }),
      ).annotate({ identifier: "UpdateZonalAutoshiftConfigurationResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          zonalShiftId: S.String.pipe(T.HttpLabel("zonalShiftId")),
          comment: S.optional(S.String),
          expiresIn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/zonalshifts/{zonalShiftId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateZonalShiftRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ zonalShiftId: S.String.pipe(T.HttpLabel("zonalShiftId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/practiceruns/{zonalShiftId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelPracticeRunRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          zonalShiftId: S.String,
          resourceIdentifier: S.String,
          awayFrom: S.String,
          expiryTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          status: S.String,
          comment: S.String,
        }),
      ).annotate({ identifier: "CancelPracticeRunResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ zonalShiftId: S.String.pipe(T.HttpLabel("zonalShiftId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/zonalshifts/{zonalShiftId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelZonalShiftRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceIdentifier: S.String,
          blockedWindows: S.optional(__S(136, __c17, 0)),
          blockedDates: S.optional(__S(136, __c17, 0)),
          blockingAlarms: S.optional(__S(145, __c18, 1)),
          allowedWindows: S.optional(__S(136, __c17, 0)),
          outcomeAlarms: __S(145, __c18, 1),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/configuration" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreatePracticeRunConfigurationRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ type: S.String, alarmIdentifier: S.String })).annotate({
        identifier: "ControlCondition",
      });
    case 1:
      return S.Array(__S(144, __c18, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          blockingAlarms: S.optional(__S(145, __c18, 1)),
          outcomeAlarms: __S(145, __c18, 1),
          blockedWindows: S.optional(__S(136, __c17, 0)),
          allowedWindows: S.optional(__S(136, __c17, 0)),
          blockedDates: S.optional(__S(136, __c17, 0)),
        }),
      ).annotate({ identifier: "PracticeRunConfiguration" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.String,
          zonalAutoshiftStatus: S.String,
          practiceRunConfiguration: __S(146, __c18, 2),
        }),
      ).annotate({ identifier: "CreatePracticeRunConfigurationResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceIdentifier: S.String.pipe(T.HttpLabel("resourceIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/configuration/{resourceIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePracticeRunConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ arn: S.String, name: S.String, zonalAutoshiftStatus: S.String }),
      ).annotate({ identifier: "DeletePracticeRunConfigurationResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
