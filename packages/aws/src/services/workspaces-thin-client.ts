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
  sdkId: "WorkSpaces Thin Client",
  serviceShapeName: "ThinClient",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "thinclient" });
const ver = /*@__PURE__*/ T.ServiceVersion("2023-08-22");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://thinclient.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://thinclient.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://thinclient.{R}.{D}","properties":{},"headers":{}}');

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
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(113, __c14, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type SoftwareSetUpdateMode = "USE_LATEST" | "USE_DESIRED" | (string & {});
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
export type DesktopType = "workspaces" | "appstream" | "workspaces-web" | (string & {});
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
export type SoftwareSetUpdateStatus = "AVAILABLE" | "IN_PROGRESS" | "UP_TO_DATE" | (string & {});
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
export type SoftwareSetValidationStatus = "VALIDATED" | "NOT_VALIDATED" | (string & {});
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
  input: __S(120, __c15, 0) as any as S.Schema<CreateEnvironmentRequest>,
  output: __S(152, __c19, 0) as any as S.Schema<CreateEnvironmentResponse>,
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
}));

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
  input: __S(160, __c20, 0) as any as S.Schema<DeleteDeviceRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<DeleteDeviceResponse>,
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
}));

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
  input: __S(176, __c22, 0) as any as S.Schema<DeleteEnvironmentRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<DeleteEnvironmentResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<DeregisterDeviceRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<DeregisterDeviceResponse>,
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
}));

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
  input: __S(8, __c1, 0) as any as S.Schema<GetDeviceRequest>,
  output: __S(10, __c1, 2) as any as S.Schema<GetDeviceResponse>,
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
}));

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
  input: __S(16, __c2, 0) as any as S.Schema<GetEnvironmentRequest>,
  output: __S(18, __c2, 2) as any as S.Schema<GetEnvironmentResponse>,
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
}));

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
  input: __S(24, __c3, 0) as any as S.Schema<GetSoftwareSetRequest>,
  output: __S(28, __c3, 4) as any as S.Schema<GetSoftwareSetResponse>,
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
}));

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
  input: __S(32, __c4, 0) as any as S.Schema<ListDevicesRequest>,
  output: __S(34, __c4, 2) as any as S.Schema<ListDevicesResponse>,
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
  input: __S(48, __c6, 0) as any as S.Schema<ListEnvironmentsRequest>,
  output: __S(50, __c6, 2) as any as S.Schema<ListEnvironmentsResponse>,
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
  input: __S(56, __c7, 0) as any as S.Schema<ListSoftwareSetsRequest>,
  output: __S(59, __c7, 3) as any as S.Schema<ListSoftwareSetsResponse>,
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
  input: __S(64, __c8, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(65, __c8, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
  input: __S(72, __c9, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(81, __c10, 1) as any as S.Schema<UntagResourceRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(88, __c11, 0) as any as S.Schema<UpdateDeviceRequest>,
  output: __S(89, __c11, 1) as any as S.Schema<UpdateDeviceResponse>,
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
}));

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
  input: __S(96, __c12, 0) as any as S.Schema<UpdateEnvironmentRequest>,
  output: __S(152, __c19, 0) as any as S.Schema<UpdateEnvironmentResponse>,
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
}));

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
  input: __S(104, __c13, 0) as any as S.Schema<UpdateSoftwareSetRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<UpdateSoftwareSetResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          targetDeviceStatus: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/deregister-device/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeregisterDeviceRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/devices/{id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDeviceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          serialNumber: S.optional(S.String),
          name: S.optional(SensitiveString),
          model: S.optional(S.String),
          environmentId: S.optional(S.String),
          status: S.optional(S.String),
          currentSoftwareSetId: S.optional(S.String),
          currentSoftwareSetVersion: S.optional(S.String),
          desiredSoftwareSetId: S.optional(S.String),
          pendingSoftwareSetId: S.optional(S.String),
          pendingSoftwareSetVersion: S.optional(S.String),
          softwareSetUpdateSchedule: S.optional(S.String),
          softwareSetComplianceStatus: S.optional(S.String),
          softwareSetUpdateStatus: S.optional(S.String),
          lastConnectedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastPostureAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          arn: S.optional(S.String),
          kmsKeyArn: S.optional(S.String),
          lastUserId: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "Device" });
    case 2:
      return S.suspend(() => S.Struct({ device: S.optional(__S(9, __c1, 1)) })).annotate({
        identifier: "GetDeviceResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/environments/{id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetEnvironmentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(SensitiveString),
          desktopArn: S.optional(S.String),
          desktopEndpoint: S.optional(SensitiveString),
          desktopType: S.optional(S.String),
          activationCode: S.optional(SensitiveString),
          registeredDevicesCount: S.optional(S.Number),
          softwareSetUpdateSchedule: S.optional(S.String),
          maintenanceWindow: S.optional(__S(129, __c16, 1)),
          softwareSetUpdateMode: S.optional(S.String),
          desiredSoftwareSetId: S.optional(S.String),
          pendingSoftwareSetId: S.optional(S.String),
          pendingSoftwareSetVersion: S.optional(S.String),
          softwareSetComplianceStatus: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          arn: S.optional(S.String),
          kmsKeyArn: S.optional(S.String),
          deviceCreationTags: S.optional(__S(136, __c17, 0)),
        }),
      ).annotate({ identifier: "Environment" });
    case 2:
      return S.suspend(() => S.Struct({ environment: S.optional(__S(17, __c2, 1)) })).annotate({
        identifier: "GetEnvironmentResponse",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/softwaresets/{id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSoftwareSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), version: S.optional(S.String) }),
      ).annotate({ identifier: "Software" });
    case 2:
      return S.Array(__S(25, __c3, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          version: S.optional(S.String),
          releasedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          supportedUntil: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          validationStatus: S.optional(S.String),
          software: S.optional(__S(26, __c3, 2)),
          arn: S.optional(S.String),
        }),
      ).annotate({ identifier: "SoftwareSet" });
    case 4:
      return S.suspend(() => S.Struct({ softwareSet: S.optional(__S(27, __c3, 3)) })).annotate({
        identifier: "GetSoftwareSetResponse",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/devices" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDevicesRequest" });
    case 1:
      return S.Array(__S(40, __c5, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ devices: S.optional(__S(33, __c4, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDevicesResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          serialNumber: S.optional(S.String),
          name: S.optional(SensitiveString),
          model: S.optional(S.String),
          environmentId: S.optional(S.String),
          status: S.optional(S.String),
          currentSoftwareSetId: S.optional(S.String),
          desiredSoftwareSetId: S.optional(S.String),
          pendingSoftwareSetId: S.optional(S.String),
          softwareSetUpdateSchedule: S.optional(S.String),
          lastConnectedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastPostureAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          arn: S.optional(S.String),
          lastUserId: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "DeviceSummary" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/environments" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListEnvironmentsRequest" });
    case 1:
      return S.Array(__S(144, __c18, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ environments: S.optional(__S(49, __c6, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEnvironmentsResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/softwaresets" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSoftwareSetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          version: S.optional(S.String),
          releasedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          supportedUntil: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          validationStatus: S.optional(S.String),
          arn: S.optional(S.String),
        }),
      ).annotate({ identifier: "SoftwareSetSummary" });
    case 2:
      return S.Array(__S(57, __c7, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ softwareSets: S.optional(__S(58, __c7, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSoftwareSetsResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(136, __c17, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(136, __c17, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(80, __c10, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          name: S.optional(SensitiveString),
          desiredSoftwareSetId: S.optional(S.String),
          softwareSetUpdateSchedule: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "PATCH", uri: "/devices/{id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateDeviceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ device: S.optional(__S(40, __c5, 0)) })).annotate({
        identifier: "UpdateDeviceResponse",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          name: S.optional(SensitiveString),
          desktopArn: S.optional(S.String),
          desktopEndpoint: S.optional(SensitiveString),
          softwareSetUpdateSchedule: S.optional(S.String),
          maintenanceWindow: S.optional(__S(129, __c16, 1)),
          softwareSetUpdateMode: S.optional(S.String),
          desiredSoftwareSetId: S.optional(S.String),
          deviceCreationTags: S.optional(__S(136, __c17, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/environments/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateEnvironmentRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")), validationStatus: S.String }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/softwaresets/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSoftwareSetRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(112, __c14, 0));
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(SensitiveString),
          desktopArn: S.String,
          desktopEndpoint: S.optional(SensitiveString),
          softwareSetUpdateSchedule: S.optional(S.String),
          maintenanceWindow: S.optional(__S(129, __c16, 1)),
          softwareSetUpdateMode: S.optional(S.String),
          desiredSoftwareSetId: S.optional(S.String),
          kmsKeyArn: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(136, __c17, 0)),
          deviceCreationTags: S.optional(__S(136, __c17, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/environments" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateEnvironmentRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          startTimeHour: S.optional(S.Number),
          startTimeMinute: S.optional(S.Number),
          endTimeHour: S.optional(S.Number),
          endTimeMinute: S.optional(S.Number),
          daysOfTheWeek: S.optional(__S(128, __c16, 0)),
          applyTimeOf: S.optional(S.String),
        }),
      ).annotate({ identifier: "MaintenanceWindow" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(SensitiveString),
          desktopArn: S.optional(S.String),
          desktopEndpoint: S.optional(SensitiveString),
          desktopType: S.optional(S.String),
          activationCode: S.optional(SensitiveString),
          softwareSetUpdateSchedule: S.optional(S.String),
          maintenanceWindow: S.optional(__S(129, __c16, 1)),
          softwareSetUpdateMode: S.optional(S.String),
          desiredSoftwareSetId: S.optional(S.String),
          pendingSoftwareSetId: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          arn: S.optional(S.String),
        }),
      ).annotate({ identifier: "EnvironmentSummary" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ environment: S.optional(__S(144, __c18, 0)) })).annotate({
        identifier: "CreateEnvironmentResponse",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/devices/{id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDeviceRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteDeviceResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/environments/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEnvironmentRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
