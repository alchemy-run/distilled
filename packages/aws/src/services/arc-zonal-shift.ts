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
  sdkId: "ARC Zonal Shift",
  target: "PercDataPlane",
  version: "2022-10-30",
  sigv4: "arc-zonal-shift",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://arc-zonal-shift.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://arc-zonal-shift.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message: string;
    readonly reason: ConflictExceptionReason;
    readonly zonalShiftId?: string;
  }> {}
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
  )<{ readonly message: string; readonly reason: ValidationExceptionReason }> {}
export type ZonalShiftId = string;
export interface CancelPracticeRunRequest {
  zonalShiftId: string;
}
export type ResourceIdentifier = string;
export type AvailabilityZone = string;
export type ExpiryTime = Date;
export type StartTime = Date;
export type ZonalShiftStatus =
  | "ACTIVE"
  | "EXPIRED"
  | "CANCELED"
  | (string & {});
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
export type AutoshiftObserverNotificationStatus =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
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
  descriptor: {
    service: svc,
    http: "DELETE /practiceruns/{zonalShiftId}",
    input: { zonalShiftId: 0 },
    output: { expiryTime: D.ts, startTime: D.ts },
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
  operationName: "CancelPracticeRun",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /zonalshifts/{zonalShiftId}",
    input: { zonalShiftId: 0 },
    output: { expiryTime: D.ts, startTime: D.ts },
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
  operationName: "CancelZonalShift",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /configuration",
    input: {
      resourceIdentifier: 0,
      blockedWindows: 0,
      blockedDates: 0,
      blockingAlarms: D.list(i_ControlCondition),
      allowedWindows: 0,
      outcomeAlarms: D.list(i_ControlCondition),
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
  operationName: "CreatePracticeRunConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /configuration/{resourceIdentifier}",
    input: { resourceIdentifier: 0 },
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
  operationName: "DeletePracticeRunConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /autoshift-observer-notification",
    input: {},
  },
  errors: [AccessDeniedException, InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutoshiftObserverNotificationStatus",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /managedresources/{resourceIdentifier}",
    input: { resourceIdentifier: 0 },
    output: {
      zonalShifts: D.list(o_ZonalShiftInResource),
      autoshifts: D.list(o_AutoshiftInResource),
    },
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
  operationName: "GetManagedResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /autoshifts",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      status: D.m({ query: "status" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { items: D.list({ endTime: D.ts, startTime: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /managedresources",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      items: D.list({
        zonalShifts: D.list(o_ZonalShiftInResource),
        autoshifts: D.list(o_AutoshiftInResource),
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /zonalshifts",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      status: D.m({ query: "status" }),
      maxResults: D.m({ query: "maxResults" }),
      resourceIdentifier: D.m({ query: "resourceIdentifier" }),
    },
    output: { items: D.list({ expiryTime: D.ts, startTime: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "POST /practiceruns",
    input: { resourceIdentifier: 0, awayFrom: 0, comment: 0 },
    output: { expiryTime: D.ts, startTime: D.ts },
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
  operationName: "StartPracticeRun",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /zonalshifts",
    input: { resourceIdentifier: 0, awayFrom: 0, expiresIn: 0, comment: 0 },
    output: { expiryTime: D.ts, startTime: D.ts },
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
  operationName: "StartZonalShift",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /autoshift-observer-notification",
    input: { status: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAutoshiftObserverNotificationStatus",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /configuration/{resourceIdentifier}",
    input: {
      resourceIdentifier: 0,
      blockedWindows: 0,
      blockedDates: 0,
      blockingAlarms: D.list(i_ControlCondition),
      allowedWindows: 0,
      outcomeAlarms: D.list(i_ControlCondition),
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
  operationName: "UpdatePracticeRunConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /managedresources/{resourceIdentifier}",
    input: { resourceIdentifier: 0, zonalAutoshiftStatus: 0 },
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
  operationName: "UpdateZonalAutoshiftConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /zonalshifts/{zonalShiftId}",
    input: { zonalShiftId: 0, comment: 0, expiresIn: 0 },
    output: { expiryTime: D.ts, startTime: D.ts },
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
  operationName: "UpdateZonalShift",
})) as any;

const i_ControlCondition: D.LazyStruct = () => ({
  type: 0,
  alarmIdentifier: 0,
});
const o_AutoshiftInResource: D.LazyStruct = () => ({ startTime: D.ts });
const o_ZonalShiftInResource: D.LazyStruct = () => ({
  expiryTime: D.ts,
  startTime: D.ts,
});
