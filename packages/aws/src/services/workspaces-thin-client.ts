import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "WorkSpaces Thin Client",
  target: "ThinClient",
  version: "2023-08-22",
  sigv4: "thinclient",
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
                `https://thinclient-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://thinclient-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://thinclient.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://thinclient.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    readonly message?: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message?: string; readonly retryAfterSeconds?: number }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message?: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message?: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{
    readonly message?: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
    readonly retryAfterSeconds?: number;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message?: string;
    readonly reason?: ValidationExceptionReason;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
export type EnvironmentName = string | redacted.Redacted<string>;
export type Arn = string;
export type DesktopEndpoint = string | redacted.Redacted<string>;
export type SoftwareSetUpdateSchedule =
  | "USE_MAINTENANCE_WINDOW"
  | "APPLY_IMMEDIATELY"
  | (string & {});
export type MaintenanceWindowType = "SYSTEM" | "CUSTOM" | (string & {});
export type Hour = number;
export type Minute = number;
export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY"
  | (string & {});
export type DayOfWeekList = DayOfWeek[];
export type ApplyTimeOf = "UTC" | "DEVICE" | (string & {});
export interface MaintenanceWindow {
  type: MaintenanceWindowType;
  startTimeHour?: number;
  startTimeMinute?: number;
  endTimeHour?: number;
  endTimeMinute?: number;
  daysOfTheWeek?: DayOfWeek[];
  applyTimeOf?: ApplyTimeOf;
}
export type SoftwareSetUpdateMode =
  | "USE_LATEST"
  | "USE_DESIRED"
  | (string & {});
export type SoftwareSetId = string;
export type KmsKeyArn = string;
export type ClientToken = string;
export type TagsMap = { [key: string]: string | undefined };
export type DeviceCreationTagKey = string;
export type DeviceCreationTagValue = string;
export type DeviceCreationTagsMap = { [key: string]: string | undefined };
export interface CreateEnvironmentRequest {
  name?: string | redacted.Redacted<string>;
  desktopArn: string;
  desktopEndpoint?: string | redacted.Redacted<string>;
  softwareSetUpdateSchedule?: SoftwareSetUpdateSchedule;
  maintenanceWindow?: MaintenanceWindow;
  softwareSetUpdateMode?: SoftwareSetUpdateMode;
  desiredSoftwareSetId?: string;
  kmsKeyArn?: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
  deviceCreationTags?: { [key: string]: string | undefined };
}
export type EnvironmentId = string;
export type DesktopType =
  | "workspaces"
  | "appstream"
  | "workspaces-web"
  | (string & {});
export type ActivationCode = string | redacted.Redacted<string>;
export interface EnvironmentSummary {
  id?: string;
  name?: string | redacted.Redacted<string>;
  desktopArn?: string;
  desktopEndpoint?: string | redacted.Redacted<string>;
  desktopType?: DesktopType;
  activationCode?: string | redacted.Redacted<string>;
  softwareSetUpdateSchedule?: SoftwareSetUpdateSchedule;
  maintenanceWindow?: MaintenanceWindow;
  softwareSetUpdateMode?: SoftwareSetUpdateMode;
  desiredSoftwareSetId?: string;
  pendingSoftwareSetId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  arn?: string;
}
export interface CreateEnvironmentResponse {
  environment?: EnvironmentSummary;
}
export type DeviceId = string;
export interface DeleteDeviceRequest {
  id: string;
  clientToken?: string;
}
export interface DeleteDeviceResponse {}
export interface DeleteEnvironmentRequest {
  id: string;
  clientToken?: string;
}
export interface DeleteEnvironmentResponse {}
export type TargetDeviceStatus = "DEREGISTERED" | "ARCHIVED" | (string & {});
export interface DeregisterDeviceRequest {
  id: string;
  targetDeviceStatus?: TargetDeviceStatus;
  clientToken?: string;
}
export interface DeregisterDeviceResponse {}
export interface GetDeviceRequest {
  id: string;
}
export type DeviceName = string | redacted.Redacted<string>;
export type DeviceStatus =
  | "REGISTERED"
  | "DEREGISTERING"
  | "DEREGISTERED"
  | "ARCHIVED"
  | (string & {});
export type DeviceSoftwareSetComplianceStatus =
  | "NONE"
  | "COMPLIANT"
  | "NOT_COMPLIANT"
  | (string & {});
export type SoftwareSetUpdateStatus =
  | "AVAILABLE"
  | "IN_PROGRESS"
  | "UP_TO_DATE"
  | (string & {});
export type UserId = string | redacted.Redacted<string>;
export interface Device {
  id?: string;
  serialNumber?: string;
  name?: string | redacted.Redacted<string>;
  model?: string;
  environmentId?: string;
  status?: DeviceStatus;
  currentSoftwareSetId?: string;
  currentSoftwareSetVersion?: string;
  desiredSoftwareSetId?: string;
  pendingSoftwareSetId?: string;
  pendingSoftwareSetVersion?: string;
  softwareSetUpdateSchedule?: SoftwareSetUpdateSchedule;
  softwareSetComplianceStatus?: DeviceSoftwareSetComplianceStatus;
  softwareSetUpdateStatus?: SoftwareSetUpdateStatus;
  lastConnectedAt?: Date;
  lastPostureAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  arn?: string;
  kmsKeyArn?: string;
  lastUserId?: string | redacted.Redacted<string>;
}
export interface GetDeviceResponse {
  device?: Device;
}
export interface GetEnvironmentRequest {
  id: string;
}
export type EnvironmentSoftwareSetComplianceStatus =
  | "NO_REGISTERED_DEVICES"
  | "COMPLIANT"
  | "NOT_COMPLIANT"
  | (string & {});
export interface Environment {
  id?: string;
  name?: string | redacted.Redacted<string>;
  desktopArn?: string;
  desktopEndpoint?: string | redacted.Redacted<string>;
  desktopType?: DesktopType;
  activationCode?: string | redacted.Redacted<string>;
  registeredDevicesCount?: number;
  softwareSetUpdateSchedule?: SoftwareSetUpdateSchedule;
  maintenanceWindow?: MaintenanceWindow;
  softwareSetUpdateMode?: SoftwareSetUpdateMode;
  desiredSoftwareSetId?: string;
  pendingSoftwareSetId?: string;
  pendingSoftwareSetVersion?: string;
  softwareSetComplianceStatus?: EnvironmentSoftwareSetComplianceStatus;
  createdAt?: Date;
  updatedAt?: Date;
  arn?: string;
  kmsKeyArn?: string;
  deviceCreationTags?: { [key: string]: string | undefined };
}
export interface GetEnvironmentResponse {
  environment?: Environment;
}
export interface GetSoftwareSetRequest {
  id: string;
}
export type SoftwareSetValidationStatus =
  | "VALIDATED"
  | "NOT_VALIDATED"
  | (string & {});
export interface Software {
  name?: string;
  version?: string;
}
export type SoftwareList = Software[];
export interface SoftwareSet {
  id?: string;
  version?: string;
  releasedAt?: Date;
  supportedUntil?: Date;
  validationStatus?: SoftwareSetValidationStatus;
  software?: Software[];
  arn?: string;
}
export interface GetSoftwareSetResponse {
  softwareSet?: SoftwareSet;
}
export type PaginationToken = string;
export type MaxResults = number;
export interface ListDevicesRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface DeviceSummary {
  id?: string;
  serialNumber?: string;
  name?: string | redacted.Redacted<string>;
  model?: string;
  environmentId?: string;
  status?: DeviceStatus;
  currentSoftwareSetId?: string;
  desiredSoftwareSetId?: string;
  pendingSoftwareSetId?: string;
  softwareSetUpdateSchedule?: SoftwareSetUpdateSchedule;
  lastConnectedAt?: Date;
  lastPostureAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  arn?: string;
  lastUserId?: string | redacted.Redacted<string>;
}
export type DeviceList = DeviceSummary[];
export interface ListDevicesResponse {
  devices?: DeviceSummary[];
  nextToken?: string;
}
export interface ListEnvironmentsRequest {
  nextToken?: string;
  maxResults?: number;
}
export type EnvironmentList = EnvironmentSummary[];
export interface ListEnvironmentsResponse {
  environments?: EnvironmentSummary[];
  nextToken?: string;
}
export interface ListSoftwareSetsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface SoftwareSetSummary {
  id?: string;
  version?: string;
  releasedAt?: Date;
  supportedUntil?: Date;
  validationStatus?: SoftwareSetValidationStatus;
  arn?: string;
}
export type SoftwareSetList = SoftwareSetSummary[];
export interface ListSoftwareSetsResponse {
  softwareSets?: SoftwareSetSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateDeviceRequest {
  id: string;
  name?: string | redacted.Redacted<string>;
  desiredSoftwareSetId?: string;
  softwareSetUpdateSchedule?: SoftwareSetUpdateSchedule;
}
export interface UpdateDeviceResponse {
  device?: DeviceSummary;
}
export type SoftwareSetIdOrEmptyString = string;
export interface UpdateEnvironmentRequest {
  id: string;
  name?: string | redacted.Redacted<string>;
  desktopArn?: string;
  desktopEndpoint?: string | redacted.Redacted<string>;
  softwareSetUpdateSchedule?: SoftwareSetUpdateSchedule;
  maintenanceWindow?: MaintenanceWindow;
  softwareSetUpdateMode?: SoftwareSetUpdateMode;
  desiredSoftwareSetId?: string;
  deviceCreationTags?: { [key: string]: string | undefined };
}
export interface UpdateEnvironmentResponse {
  environment?: EnvironmentSummary;
}
export interface UpdateSoftwareSetRequest {
  id: string;
  validationStatus: SoftwareSetValidationStatus;
}
export interface UpdateSoftwareSetResponse {}
export type ExceptionMessage = string;
export type ResourceId = string;
export type ResourceType = string;
export type RetryAfterSeconds = number;
export type ServiceCode = string;
export type QuotaCode = string;
export type ValidationExceptionReason =
  | "unknownOperation"
  | "cannotParse"
  | "fieldValidationFailed"
  | "other"
  | (string & {});
export type FieldName = string;
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type CreateEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an environment for your thin client devices.
 */
export const createEnvironment: API.OperationMethod<
  CreateEnvironmentRequest,
  CreateEnvironmentResponse,
  CreateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /environments",
    input: {
      name: 0,
      desktopArn: 0,
      desktopEndpoint: 0,
      softwareSetUpdateSchedule: 0,
      maintenanceWindow: i_MaintenanceWindow,
      softwareSetUpdateMode: 0,
      desiredSoftwareSetId: 0,
      kmsKeyArn: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
      deviceCreationTags: 0,
    },
    output: { environment: o_EnvironmentSummary },
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
  operationName: "CreateEnvironment",
  endpointHostPrefix: "api.",
})) as any;

export type DeleteDeviceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a thin client device.
 */
export const deleteDevice: API.OperationMethod<
  DeleteDeviceRequest,
  DeleteDeviceResponse,
  DeleteDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /devices/{id}",
    input: {
      id: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
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
  operationName: "DeleteDevice",
  endpointHostPrefix: "api.",
})) as any;

export type DeleteEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an environment.
 */
export const deleteEnvironment: API.OperationMethod<
  DeleteEnvironmentRequest,
  DeleteEnvironmentResponse,
  DeleteEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /environments/{id}",
    input: {
      id: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
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
  operationName: "DeleteEnvironment",
  endpointHostPrefix: "api.",
})) as any;

export type DeregisterDeviceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deregisters a thin client device.
 */
export const deregisterDevice: API.OperationMethod<
  DeregisterDeviceRequest,
  DeregisterDeviceResponse,
  DeregisterDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /deregister-device/{id}",
    input: {
      id: 0,
      targetDeviceStatus: 0,
      clientToken: D.m({ idempotency: true }),
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
  operationName: "DeregisterDevice",
  endpointHostPrefix: "api.",
})) as any;

export type GetDeviceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information for a thin client device.
 */
export const getDevice: API.OperationMethod<
  GetDeviceRequest,
  GetDeviceResponse,
  GetDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /devices/{id}",
    input: { id: 0 },
    output: {
      device: {
        name: D.secret,
        lastConnectedAt: D.ts,
        lastPostureAt: D.ts,
        createdAt: D.ts,
        updatedAt: D.ts,
        lastUserId: D.secret,
      },
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
  operationName: "GetDevice",
  endpointHostPrefix: "api.",
})) as any;

export type GetEnvironmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information for an environment.
 */
export const getEnvironment: API.OperationMethod<
  GetEnvironmentRequest,
  GetEnvironmentResponse,
  GetEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /environments/{id}",
    input: { id: 0 },
    output: {
      environment: {
        name: D.secret,
        desktopEndpoint: D.secret,
        activationCode: D.secret,
        createdAt: D.ts,
        updatedAt: D.ts,
      },
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
  operationName: "GetEnvironment",
  endpointHostPrefix: "api.",
})) as any;

export type GetSoftwareSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information for a software set.
 */
export const getSoftwareSet: API.OperationMethod<
  GetSoftwareSetRequest,
  GetSoftwareSetResponse,
  GetSoftwareSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /softwaresets/{id}",
    input: { id: 0 },
    output: { softwareSet: { releasedAt: D.ts, supportedUntil: D.ts } },
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
  operationName: "GetSoftwareSet",
  endpointHostPrefix: "api.",
})) as any;

export type ListDevicesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of thin client devices.
 */
export const listDevices: API.PaginatedOperationMethod<
  ListDevicesRequest,
  ListDevicesResponse,
  ListDevicesError,
  Credentials | HttpClient.HttpClient,
  DeviceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /devices",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { devices: D.list(o_DeviceSummary) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDevices",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "devices",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of environments.
 */
export const listEnvironments: API.PaginatedOperationMethod<
  ListEnvironmentsRequest,
  ListEnvironmentsResponse,
  ListEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /environments",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { environments: D.list(o_EnvironmentSummary) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironments",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "environments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSoftwareSetsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of software sets.
 */
export const listSoftwareSets: API.PaginatedOperationMethod<
  ListSoftwareSetsRequest,
  ListSoftwareSetsResponse,
  ListSoftwareSetsError,
  Credentials | HttpClient.HttpClient,
  SoftwareSetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /softwaresets",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      softwareSets: D.list({ releasedAt: D.ts, supportedUntil: D.ts }),
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
  operationName: "ListSoftwareSets",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "softwareSets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of tags for a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
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
  operationName: "ListTagsForResource",
  endpointHostPrefix: "api.",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
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
  operationName: "TagResource",
  endpointHostPrefix: "api.",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag or tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
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
  operationName: "UntagResource",
  endpointHostPrefix: "api.",
})) as any;

export type UpdateDeviceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a thin client device.
 */
export const updateDevice: API.OperationMethod<
  UpdateDeviceRequest,
  UpdateDeviceResponse,
  UpdateDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /devices/{id}",
    input: {
      id: 0,
      name: 0,
      desiredSoftwareSetId: 0,
      softwareSetUpdateSchedule: 0,
    },
    output: { device: o_DeviceSummary },
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
  operationName: "UpdateDevice",
  endpointHostPrefix: "api.",
})) as any;

export type UpdateEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an environment.
 */
export const updateEnvironment: API.OperationMethod<
  UpdateEnvironmentRequest,
  UpdateEnvironmentResponse,
  UpdateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /environments/{id}",
    input: {
      id: 0,
      name: 0,
      desktopArn: 0,
      desktopEndpoint: 0,
      softwareSetUpdateSchedule: 0,
      maintenanceWindow: i_MaintenanceWindow,
      softwareSetUpdateMode: 0,
      desiredSoftwareSetId: 0,
      deviceCreationTags: 0,
    },
    output: { environment: o_EnvironmentSummary },
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
  operationName: "UpdateEnvironment",
  endpointHostPrefix: "api.",
})) as any;

export type UpdateSoftwareSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a software set.
 */
export const updateSoftwareSet: API.OperationMethod<
  UpdateSoftwareSetRequest,
  UpdateSoftwareSetResponse,
  UpdateSoftwareSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /softwaresets/{id}",
    input: { id: 0, validationStatus: 0 },
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
  operationName: "UpdateSoftwareSet",
  endpointHostPrefix: "api.",
})) as any;

const i_MaintenanceWindow: D.LazyStruct = () => ({
  type: 0,
  startTimeHour: 0,
  startTimeMinute: 0,
  endTimeHour: 0,
  endTimeMinute: 0,
  daysOfTheWeek: 0,
  applyTimeOf: 0,
});
const o_DeviceSummary: D.LazyStruct = () => ({
  name: D.secret,
  lastConnectedAt: D.ts,
  lastPostureAt: D.ts,
  createdAt: D.ts,
  updatedAt: D.ts,
  lastUserId: D.secret,
});
const o_EnvironmentSummary: D.LazyStruct = () => ({
  name: D.secret,
  desktopEndpoint: D.secret,
  activationCode: D.secret,
  createdAt: D.ts,
  updatedAt: D.ts,
});
