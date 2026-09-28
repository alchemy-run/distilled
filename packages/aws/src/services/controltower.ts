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
  sdkId: "ControlTower",
  target: "AWSControlTowerApis",
  version: "2018-05-10",
  sigv4: "controltower",
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
                `https://controltower-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://controltower-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://controltower.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://controltower.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message: string }> {}
export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError("BadRequestException", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{
    readonly message: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
    readonly retryAfterSeconds?: number;
  }> {}
export class UnauthorizedException
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedException", ["AuthError"])<{
    readonly message?: string;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export type LandingZoneVersion = string;
export type RemediationType = "INHERITANCE_DRIFT" | (string & {});
export type RemediationTypes = RemediationType[];
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type Manifest = unknown;
export interface CreateLandingZoneInput {
  version: string;
  remediationTypes?: RemediationType[];
  tags?: { [key: string]: string | undefined };
  manifest?: any;
}
export type Arn = string;
export type OperationIdentifier = string;
export interface CreateLandingZoneOutput {
  arn: string;
  operationIdentifier: string;
}
export interface DeleteLandingZoneInput {
  landingZoneIdentifier: string;
}
export interface DeleteLandingZoneOutput {
  operationIdentifier: string;
}
export interface DisableBaselineInput {
  enabledBaselineIdentifier: string;
}
export interface DisableBaselineOutput {
  operationIdentifier: string;
}
export type ControlIdentifier = string;
export type TargetIdentifier = string;
export interface DisableControlInput {
  controlIdentifier?: string;
  targetIdentifier?: string;
  enabledControlIdentifier?: string;
}
export interface DisableControlOutput {
  operationIdentifier: string;
}
export type BaselineVersion = string;
export type EnabledBaselineParameterDocument = unknown;
export interface EnabledBaselineParameter {
  key: string;
  value: any;
}
export type EnabledBaselineParameters = EnabledBaselineParameter[];
export interface EnableBaselineInput {
  baselineVersion: string;
  parameters?: EnabledBaselineParameter[];
  baselineIdentifier: string;
  targetIdentifier: string;
  tags?: { [key: string]: string | undefined };
}
export interface EnableBaselineOutput {
  operationIdentifier: string;
  arn: string;
}
export interface EnabledControlParameter {
  key: string;
  value: any;
}
export type EnabledControlParameters = EnabledControlParameter[];
export interface EnableControlInput {
  controlIdentifier: string;
  targetIdentifier: string;
  tags?: { [key: string]: string | undefined };
  parameters?: EnabledControlParameter[];
}
export interface EnableControlOutput {
  operationIdentifier: string;
  arn?: string;
}
export type BaselineArn = string;
export interface GetBaselineInput {
  baselineIdentifier: string;
}
export interface GetBaselineOutput {
  arn: string;
  name: string;
  description?: string;
}
export interface GetBaselineOperationInput {
  operationIdentifier: string;
}
export type BaselineOperationType =
  | "ENABLE_BASELINE"
  | "DISABLE_BASELINE"
  | "UPDATE_ENABLED_BASELINE"
  | "RESET_ENABLED_BASELINE"
  | (string & {});
export type BaselineOperationStatus =
  | "SUCCEEDED"
  | "FAILED"
  | "IN_PROGRESS"
  | (string & {});
export interface BaselineOperation {
  operationIdentifier?: string;
  operationType?: BaselineOperationType;
  status?: BaselineOperationStatus;
  startTime?: Date;
  endTime?: Date;
  statusMessage?: string;
}
export interface GetBaselineOperationOutput {
  baselineOperation: BaselineOperation;
}
export interface GetControlOperationInput {
  operationIdentifier: string;
}
export type ControlOperationType =
  | "ENABLE_CONTROL"
  | "DISABLE_CONTROL"
  | "UPDATE_ENABLED_CONTROL"
  | "RESET_ENABLED_CONTROL"
  | (string & {});
export type ControlOperationStatus =
  | "SUCCEEDED"
  | "FAILED"
  | "IN_PROGRESS"
  | (string & {});
export interface ControlOperation {
  operationType?: ControlOperationType;
  startTime?: Date;
  endTime?: Date;
  status?: ControlOperationStatus;
  statusMessage?: string;
  operationIdentifier?: string;
  controlIdentifier?: string;
  targetIdentifier?: string;
  enabledControlIdentifier?: string;
}
export interface GetControlOperationOutput {
  controlOperation: ControlOperation;
}
export interface GetEnabledBaselineInput {
  enabledBaselineIdentifier: string;
}
export type EnabledBaselineDriftStatus = "IN_SYNC" | "DRIFTED" | (string & {});
export interface EnabledBaselineInheritanceDrift {
  status?: EnabledBaselineDriftStatus;
}
export interface EnabledBaselineDriftTypes {
  inheritance?: EnabledBaselineInheritanceDrift;
}
export interface EnabledBaselineDriftStatusSummary {
  types?: EnabledBaselineDriftTypes;
}
export type EnablementStatus =
  | "SUCCEEDED"
  | "FAILED"
  | "UNDER_CHANGE"
  | (string & {});
export interface EnablementStatusSummary {
  status?: EnablementStatus;
  lastOperationIdentifier?: string;
}
export interface EnabledBaselineParameterSummary {
  key: string;
  value: any;
}
export type EnabledBaselineParameterSummaries =
  EnabledBaselineParameterSummary[];
export interface EnabledBaselineDetails {
  arn: string;
  baselineIdentifier: string;
  baselineVersion?: string;
  driftStatusSummary?: EnabledBaselineDriftStatusSummary;
  targetIdentifier: string;
  parentIdentifier?: string;
  statusSummary: EnablementStatusSummary;
  parameters?: EnabledBaselineParameterSummary[];
}
export interface GetEnabledBaselineOutput {
  enabledBaselineDetails?: EnabledBaselineDetails;
}
export interface GetEnabledControlInput {
  enabledControlIdentifier: string;
}
export type DriftStatus =
  | "DRIFTED"
  | "IN_SYNC"
  | "NOT_CHECKING"
  | "UNKNOWN"
  | (string & {});
export interface EnabledControlInheritanceDrift {
  status?: DriftStatus;
}
export interface EnabledControlResourceDrift {
  status?: DriftStatus;
}
export interface EnabledControlDriftTypes {
  inheritance?: EnabledControlInheritanceDrift;
  resource?: EnabledControlResourceDrift;
}
export interface DriftStatusSummary {
  driftStatus?: DriftStatus;
  types?: EnabledControlDriftTypes;
}
export type ParentIdentifier = string;
export type RegionName = string;
export interface Region {
  name?: string;
}
export type TargetRegions = Region[];
export interface EnabledControlParameterSummary {
  key: string;
  value: any;
}
export type EnabledControlParameterSummaries = EnabledControlParameterSummary[];
export interface EnabledControlDetails {
  arn?: string;
  controlIdentifier?: string;
  targetIdentifier?: string;
  statusSummary?: EnablementStatusSummary;
  driftStatusSummary?: DriftStatusSummary;
  parentIdentifier?: string;
  targetRegions?: Region[];
  parameters?: EnabledControlParameterSummary[];
}
export interface GetEnabledControlOutput {
  enabledControlDetails: EnabledControlDetails;
}
export interface GetLandingZoneInput {
  landingZoneIdentifier: string;
}
export type LandingZoneStatus =
  | "ACTIVE"
  | "PROCESSING"
  | "FAILED"
  | (string & {});
export type LandingZoneDriftStatus = "DRIFTED" | "IN_SYNC" | (string & {});
export interface LandingZoneDriftStatusSummary {
  status?: LandingZoneDriftStatus;
}
export interface LandingZoneDetail {
  version: string;
  remediationTypes?: RemediationType[];
  arn?: string;
  status?: LandingZoneStatus;
  latestAvailableVersion?: string;
  driftStatus?: LandingZoneDriftStatusSummary;
  manifest: any;
}
export interface GetLandingZoneOutput {
  landingZone: LandingZoneDetail;
}
export interface GetLandingZoneOperationInput {
  operationIdentifier: string;
}
export type LandingZoneOperationType =
  | "DELETE"
  | "CREATE"
  | "UPDATE"
  | "RESET"
  | (string & {});
export type LandingZoneOperationStatus =
  | "SUCCEEDED"
  | "FAILED"
  | "IN_PROGRESS"
  | (string & {});
export interface LandingZoneOperationDetail {
  operationType?: LandingZoneOperationType;
  operationIdentifier?: string;
  status?: LandingZoneOperationStatus;
  startTime?: Date;
  endTime?: Date;
  statusMessage?: string;
}
export interface GetLandingZoneOperationOutput {
  operationDetails: LandingZoneOperationDetail;
}
export type ListBaselinesMaxResults = number;
export interface ListBaselinesInput {
  nextToken?: string;
  maxResults?: number;
}
export interface BaselineSummary {
  arn: string;
  name: string;
  description?: string;
}
export type Baselines = BaselineSummary[];
export interface ListBaselinesOutput {
  baselines: BaselineSummary[];
  nextToken?: string;
}
export type ControlIdentifiers = string[];
export type TargetIdentifiers = string[];
export type EnabledControlIdentifiers = string[];
export type ControlOperationStatuses = ControlOperationStatus[];
export type ControlOperationTypes = ControlOperationType[];
export interface ControlOperationFilter {
  controlIdentifiers?: string[];
  targetIdentifiers?: string[];
  enabledControlIdentifiers?: string[];
  statuses?: ControlOperationStatus[];
  controlOperationTypes?: ControlOperationType[];
}
export type ListControlOperationsNextToken = string;
export type ListControlOperationsMaxResults = number;
export interface ListControlOperationsInput {
  filter?: ControlOperationFilter;
  nextToken?: string;
  maxResults?: number;
}
export interface ControlOperationSummary {
  operationType?: ControlOperationType;
  startTime?: Date;
  endTime?: Date;
  status?: ControlOperationStatus;
  statusMessage?: string;
  operationIdentifier?: string;
  controlIdentifier?: string;
  targetIdentifier?: string;
  enabledControlIdentifier?: string;
}
export type ControlOperations = ControlOperationSummary[];
export interface ListControlOperationsOutput {
  controlOperations: ControlOperationSummary[];
  nextToken?: string;
}
export type EnabledBaselineTargetIdentifiers = string[];
export type EnabledBaselineBaselineIdentifiers = string[];
export type EnabledBaselineParentIdentifiers = string[];
export type EnabledBaselineEnablementStatuses = EnablementStatus[];
export type EnabledBaselineDriftStatuses = EnabledBaselineDriftStatus[];
export interface EnabledBaselineFilter {
  targetIdentifiers?: string[];
  baselineIdentifiers?: string[];
  parentIdentifiers?: string[];
  statuses?: EnablementStatus[];
  inheritanceDriftStatuses?: EnabledBaselineDriftStatus[];
}
export type ListEnabledBaselinesNextToken = string;
export type ListEnabledBaselinesMaxResults = number;
export interface ListEnabledBaselinesInput {
  filter?: EnabledBaselineFilter;
  nextToken?: string;
  maxResults?: number;
  includeChildren?: boolean;
}
export interface EnabledBaselineSummary {
  arn: string;
  baselineIdentifier: string;
  baselineVersion?: string;
  driftStatusSummary?: EnabledBaselineDriftStatusSummary;
  targetIdentifier: string;
  parentIdentifier?: string;
  statusSummary: EnablementStatusSummary;
}
export type EnabledBaselines = EnabledBaselineSummary[];
export interface ListEnabledBaselinesOutput {
  enabledBaselines: EnabledBaselineSummary[];
  nextToken?: string;
}
export type MaxResults = number;
export type EnablementStatuses = EnablementStatus[];
export type DriftStatuses = DriftStatus[];
export type ParentIdentifiers = string[];
export interface EnabledControlFilter {
  controlIdentifiers?: string[];
  statuses?: EnablementStatus[];
  driftStatuses?: DriftStatus[];
  parentIdentifiers?: string[];
  inheritanceDriftStatuses?: DriftStatus[];
  resourceDriftStatuses?: DriftStatus[];
}
export interface ListEnabledControlsInput {
  targetIdentifier?: string;
  nextToken?: string;
  maxResults?: number;
  filter?: EnabledControlFilter;
  includeChildren?: boolean;
}
export interface EnabledControlSummary {
  arn?: string;
  controlIdentifier?: string;
  targetIdentifier?: string;
  statusSummary?: EnablementStatusSummary;
  driftStatusSummary?: DriftStatusSummary;
  parentIdentifier?: string;
}
export type EnabledControls = EnabledControlSummary[];
export interface ListEnabledControlsOutput {
  enabledControls: EnabledControlSummary[];
  nextToken?: string;
}
export type LandingZoneOperationTypes = LandingZoneOperationType[];
export type LandingZoneOperationStatuses = LandingZoneOperationStatus[];
export interface LandingZoneOperationFilter {
  types?: LandingZoneOperationType[];
  statuses?: LandingZoneOperationStatus[];
}
export type ListLandingZoneOperationsMaxResults = number;
export interface ListLandingZoneOperationsInput {
  filter?: LandingZoneOperationFilter;
  nextToken?: string;
  maxResults?: number;
}
export interface LandingZoneOperationSummary {
  operationType?: LandingZoneOperationType;
  operationIdentifier?: string;
  status?: LandingZoneOperationStatus;
}
export type LandingZoneOperations = LandingZoneOperationSummary[];
export interface ListLandingZoneOperationsOutput {
  landingZoneOperations: LandingZoneOperationSummary[];
  nextToken?: string;
}
export type ListLandingZonesMaxResults = number;
export interface ListLandingZonesInput {
  nextToken?: string;
  maxResults?: number;
}
export interface LandingZoneSummary {
  arn?: string;
}
export type LandingZoneSummaries = LandingZoneSummary[];
export interface ListLandingZonesOutput {
  landingZones: LandingZoneSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export interface ListTagsForResourceOutput {
  tags: { [key: string]: string | undefined };
}
export interface ResetEnabledBaselineInput {
  enabledBaselineIdentifier: string;
}
export interface ResetEnabledBaselineOutput {
  operationIdentifier: string;
}
export interface ResetEnabledControlInput {
  enabledControlIdentifier: string;
}
export interface ResetEnabledControlOutput {
  operationIdentifier: string;
}
export interface ResetLandingZoneInput {
  landingZoneIdentifier: string;
}
export interface ResetLandingZoneOutput {
  operationIdentifier: string;
}
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceOutput {}
export type TagKeys = string[];
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceOutput {}
export interface UpdateEnabledBaselineInput {
  baselineVersion: string;
  parameters?: EnabledBaselineParameter[];
  enabledBaselineIdentifier: string;
}
export interface UpdateEnabledBaselineOutput {
  operationIdentifier: string;
}
export interface UpdateEnabledControlInput {
  parameters: EnabledControlParameter[];
  enabledControlIdentifier: string;
}
export interface UpdateEnabledControlOutput {
  operationIdentifier: string;
}
export interface UpdateLandingZoneInput {
  version: string;
  remediationTypes?: RemediationType[];
  landingZoneIdentifier: string;
  manifest?: any;
}
export interface UpdateLandingZoneOutput {
  operationIdentifier: string;
}
export type CreateLandingZoneError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a new landing zone. This API call starts an asynchronous operation that creates and configures a landing zone, based on the parameters specified in the manifest JSON file.
 */
export const createLandingZone: API.OperationMethod<
  CreateLandingZoneInput,
  CreateLandingZoneOutput,
  CreateLandingZoneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /create-landingzone",
    input: { version: 0, remediationTypes: 0, tags: 0, manifest: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLandingZone",
})) as any;

export type DeleteLandingZoneError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Decommissions a landing zone. This API call starts an asynchronous operation that deletes Amazon Web Services Control Tower resources deployed in accounts managed by Amazon Web Services Control Tower.
 *
 * Decommissioning a landing zone is a process with significant consequences, and it cannot be undone. We strongly recommend that you perform this decommissioning process only if you intend to stop using your landing zone.
 */
export const deleteLandingZone: API.OperationMethod<
  DeleteLandingZoneInput,
  DeleteLandingZoneOutput,
  DeleteLandingZoneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /delete-landingzone",
    input: { landingZoneIdentifier: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLandingZone",
})) as any;

export type DisableBaselineError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Disable an `EnabledBaseline` resource on the specified Target. This API starts an asynchronous operation to remove all resources deployed as part of the baseline enablement. The resource will vary depending on the enabled baseline. For usage examples, see *the Amazon Web Services Control Tower User Guide* .
 */
export const disableBaseline: API.OperationMethod<
  DisableBaselineInput,
  DisableBaselineOutput,
  DisableBaselineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /disable-baseline",
    input: { enabledBaselineIdentifier: 0 },
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
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableBaseline",
})) as any;

export type DisableControlError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This API call turns off a control. It starts an asynchronous operation that deletes Amazon Web Services resources on the specified organizational unit and the accounts it contains. The resources will vary according to the control that you specify. For usage examples, see the *Controls Reference Guide* .
 */
export const disableControl: API.OperationMethod<
  DisableControlInput,
  DisableControlOutput,
  DisableControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /disable-control",
    input: {
      controlIdentifier: 0,
      targetIdentifier: 0,
      enabledControlIdentifier: 0,
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
  operationName: "DisableControl",
})) as any;

export type EnableBaselineError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Enable (apply) a `Baseline` to a Target. This API starts an asynchronous operation to deploy resources specified by the `Baseline` to the specified Target. For usage examples, see *the Amazon Web Services Control Tower User Guide* .
 */
export const enableBaseline: API.OperationMethod<
  EnableBaselineInput,
  EnableBaselineOutput,
  EnableBaselineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /enable-baseline",
    input: {
      baselineVersion: 0,
      parameters: D.list(i_EnabledBaselineParameter),
      baselineIdentifier: 0,
      targetIdentifier: 0,
      tags: 0,
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
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableBaseline",
})) as any;

export type EnableControlError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This API call activates a control. It starts an asynchronous operation that creates Amazon Web Services resources on the specified organizational unit and the accounts it contains. The resources created will vary according to the control that you specify. For usage examples, see the *Controls Reference Guide* .
 */
export const enableControl: API.OperationMethod<
  EnableControlInput,
  EnableControlOutput,
  EnableControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /enable-control",
    input: {
      controlIdentifier: 0,
      targetIdentifier: 0,
      tags: 0,
      parameters: D.list(i_EnabledControlParameter),
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
  operationName: "EnableControl",
})) as any;

export type GetBaselineError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieve details about an existing `Baseline` resource by specifying its identifier. For usage examples, see *the Amazon Web Services Control Tower User Guide* .
 */
export const getBaseline: API.OperationMethod<
  GetBaselineInput,
  GetBaselineOutput,
  GetBaselineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /get-baseline",
    input: { baselineIdentifier: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBaseline",
})) as any;

export type GetBaselineOperationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns the details of an asynchronous baseline operation, as initiated by any of these APIs: `EnableBaseline`, `DisableBaseline`, `UpdateEnabledBaseline`, `ResetEnabledBaseline`. A status message is displayed in case of operation failure. For usage examples, see *the Amazon Web Services Control Tower User Guide* .
 */
export const getBaselineOperation: API.OperationMethod<
  GetBaselineOperationInput,
  GetBaselineOperationOutput,
  GetBaselineOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /get-baseline-operation",
    input: { operationIdentifier: 0 },
    output: { baselineOperation: { startTime: D.ts, endTime: D.ts } },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBaselineOperation",
})) as any;

export type GetControlOperationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the status of a particular `EnableControl` or `DisableControl` operation. Displays a message in case of error. Details for an operation are available for 90 days. For usage examples, see the *Controls Reference Guide* .
 */
export const getControlOperation: API.OperationMethod<
  GetControlOperationInput,
  GetControlOperationOutput,
  GetControlOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /get-control-operation",
    input: { operationIdentifier: 0 },
    output: { controlOperation: { startTime: D.ts, endTime: D.ts } },
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
  operationName: "GetControlOperation",
})) as any;

export type GetEnabledBaselineError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieve details of an `EnabledBaseline` resource by specifying its identifier.
 */
export const getEnabledBaseline: API.OperationMethod<
  GetEnabledBaselineInput,
  GetEnabledBaselineOutput,
  GetEnabledBaselineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /get-enabled-baseline",
    input: { enabledBaselineIdentifier: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnabledBaseline",
})) as any;

export type GetEnabledControlError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about an enabled control. For usage examples, see the *Controls Reference Guide* .
 */
export const getEnabledControl: API.OperationMethod<
  GetEnabledControlInput,
  GetEnabledControlOutput,
  GetEnabledControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /get-enabled-control",
    input: { enabledControlIdentifier: 0 },
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
  operationName: "GetEnabledControl",
})) as any;

export type GetLandingZoneError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns details about the landing zone. Displays a message in case of error.
 */
export const getLandingZone: API.OperationMethod<
  GetLandingZoneInput,
  GetLandingZoneOutput,
  GetLandingZoneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /get-landingzone",
    input: { landingZoneIdentifier: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLandingZone",
})) as any;

export type GetLandingZoneOperationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns the status of the specified landing zone operation. Details for an operation are available for 90 days.
 */
export const getLandingZoneOperation: API.OperationMethod<
  GetLandingZoneOperationInput,
  GetLandingZoneOperationOutput,
  GetLandingZoneOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /get-landingzone-operation",
    input: { operationIdentifier: 0 },
    output: { operationDetails: { startTime: D.ts, endTime: D.ts } },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLandingZoneOperation",
})) as any;

export type ListBaselinesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a summary list of all available baselines. For usage examples, see *the Amazon Web Services Control Tower User Guide* .
 */
export const listBaselines: API.PaginatedOperationMethod<
  ListBaselinesInput,
  ListBaselinesOutput,
  ListBaselinesError,
  Credentials | HttpClient.HttpClient,
  BaselineSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /list-baselines",
    input: { nextToken: 0, maxResults: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBaselines",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "baselines",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListControlOperationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides a list of operations in progress or queued. For usage examples, see ListControlOperation examples.
 */
export const listControlOperations: API.PaginatedOperationMethod<
  ListControlOperationsInput,
  ListControlOperationsOutput,
  ListControlOperationsError,
  Credentials | HttpClient.HttpClient,
  ControlOperationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /list-control-operations",
    input: {
      filter: {
        controlIdentifiers: 0,
        targetIdentifiers: 0,
        enabledControlIdentifiers: 0,
        statuses: 0,
        controlOperationTypes: 0,
      },
      nextToken: 0,
      maxResults: 0,
    },
    output: { controlOperations: D.list({ startTime: D.ts, endTime: D.ts }) },
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
  operationName: "ListControlOperations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "controlOperations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnabledBaselinesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a list of summaries describing `EnabledBaseline` resources. You can filter the list by the corresponding `Baseline` or `Target` of the `EnabledBaseline` resources. For usage examples, see *the Amazon Web Services Control Tower User Guide* .
 */
export const listEnabledBaselines: API.PaginatedOperationMethod<
  ListEnabledBaselinesInput,
  ListEnabledBaselinesOutput,
  ListEnabledBaselinesError,
  Credentials | HttpClient.HttpClient,
  EnabledBaselineSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /list-enabled-baselines",
    input: {
      filter: {
        targetIdentifiers: 0,
        baselineIdentifiers: 0,
        parentIdentifiers: 0,
        statuses: 0,
        inheritanceDriftStatuses: 0,
      },
      nextToken: 0,
      maxResults: 0,
      includeChildren: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnabledBaselines",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "enabledBaselines",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnabledControlsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the controls enabled by Amazon Web Services Control Tower on the specified organizational unit and the accounts it contains. For usage examples, see the *Controls Reference Guide* .
 */
export const listEnabledControls: API.PaginatedOperationMethod<
  ListEnabledControlsInput,
  ListEnabledControlsOutput,
  ListEnabledControlsError,
  Credentials | HttpClient.HttpClient,
  EnabledControlSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /list-enabled-controls",
    input: {
      targetIdentifier: 0,
      nextToken: 0,
      maxResults: 0,
      filter: {
        controlIdentifiers: 0,
        statuses: 0,
        driftStatuses: 0,
        parentIdentifiers: 0,
        inheritanceDriftStatuses: 0,
        resourceDriftStatuses: 0,
      },
      includeChildren: 0,
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
  operationName: "ListEnabledControls",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "enabledControls",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListLandingZoneOperationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists all landing zone operations from the past 90 days. Results are sorted by time, with the most recent operation first.
 */
export const listLandingZoneOperations: API.PaginatedOperationMethod<
  ListLandingZoneOperationsInput,
  ListLandingZoneOperationsOutput,
  ListLandingZoneOperationsError,
  Credentials | HttpClient.HttpClient,
  LandingZoneOperationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /list-landingzone-operations",
    input: { filter: { types: 0, statuses: 0 }, nextToken: 0, maxResults: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLandingZoneOperations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "landingZoneOperations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListLandingZonesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns the landing zone ARN for the landing zone deployed in your managed account. This API also creates an ARN for existing accounts that do not yet have a landing zone ARN.
 *
 * Returns one landing zone ARN.
 */
export const listLandingZones: API.PaginatedOperationMethod<
  ListLandingZonesInput,
  ListLandingZonesOutput,
  ListLandingZonesError,
  Credentials | HttpClient.HttpClient,
  LandingZoneSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /list-landingzones",
    input: { nextToken: 0, maxResults: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLandingZones",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "landingZones",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | BadRequestException
  | CommonErrors;
/**
 * Returns a list of tags associated with the resource. For usage examples, see the *Controls Reference Guide* .
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    BadRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ResetEnabledBaselineError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Re-enables an `EnabledBaseline` resource. For example, this API can re-apply the existing `Baseline` after a new member account is moved to the target OU. For usage examples, see *the Amazon Web Services Control Tower User Guide* .
 */
export const resetEnabledBaseline: API.OperationMethod<
  ResetEnabledBaselineInput,
  ResetEnabledBaselineOutput,
  ResetEnabledBaselineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /reset-enabled-baseline",
    input: { enabledBaselineIdentifier: 0 },
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
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetEnabledBaseline",
})) as any;

export type ResetEnabledControlError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Resets an enabled control. Does not work for controls implemented with SCPs.
 */
export const resetEnabledControl: API.OperationMethod<
  ResetEnabledControlInput,
  ResetEnabledControlOutput,
  ResetEnabledControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /reset-enabled-control",
    input: { enabledControlIdentifier: 0 },
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
  operationName: "ResetEnabledControl",
})) as any;

export type ResetLandingZoneError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * This API call resets a landing zone. It starts an asynchronous operation that resets the landing zone to the parameters specified in the original configuration, which you specified in the manifest file. Nothing in the manifest file's original landing zone configuration is changed during the reset process, by default. This API is not the same as a rollback of a landing zone version, which is not a supported operation.
 */
export const resetLandingZone: API.OperationMethod<
  ResetLandingZoneInput,
  ResetLandingZoneOutput,
  ResetLandingZoneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /reset-landingzone",
    input: { landingZoneIdentifier: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetLandingZone",
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | BadRequestException
  | CommonErrors;
/**
 * Applies tags to a resource. For usage examples, see the *Controls Reference Guide* .
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    BadRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | BadRequestException
  | CommonErrors;
/**
 * Removes tags from a resource. For usage examples, see the *Controls Reference Guide* .
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    BadRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateEnabledBaselineError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates an `EnabledBaseline` resource's applied parameters or version. For usage examples, see *the Amazon Web Services Control Tower User Guide* .
 */
export const updateEnabledBaseline: API.OperationMethod<
  UpdateEnabledBaselineInput,
  UpdateEnabledBaselineOutput,
  UpdateEnabledBaselineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /update-enabled-baseline",
    input: {
      baselineVersion: 0,
      parameters: D.list(i_EnabledBaselineParameter),
      enabledBaselineIdentifier: 0,
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
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnabledBaseline",
})) as any;

export type UpdateEnabledControlError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an already enabled control.
 *
 * If the enabled control shows an `EnablementStatus` of SUCCEEDED, supply parameters that are different from the currently configured parameters. Otherwise, Amazon Web Services Control Tower will not accept the request.
 *
 * If the enabled control shows an `EnablementStatus` of FAILED, Amazon Web Services Control Tower updates the control to match any valid parameters that you supply.
 *
 * If the `DriftSummary` status for the control shows as `DRIFTED`, you cannot call this API. Instead, you can update the control by calling the `ResetEnabledControl` API. Alternatively, you can call `DisableControl` and then call `EnableControl` again. Also, you can run an extending governance operation to repair drift. For usage examples, see the *Controls Reference Guide* .
 */
export const updateEnabledControl: API.OperationMethod<
  UpdateEnabledControlInput,
  UpdateEnabledControlOutput,
  UpdateEnabledControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /update-enabled-control",
    input: {
      parameters: D.list(i_EnabledControlParameter),
      enabledControlIdentifier: 0,
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
  operationName: "UpdateEnabledControl",
})) as any;

export type UpdateLandingZoneError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * This API call updates the landing zone. It starts an asynchronous operation that updates the landing zone based on the new landing zone version, or on the changed parameters specified in the updated manifest file.
 */
export const updateLandingZone: API.OperationMethod<
  UpdateLandingZoneInput,
  UpdateLandingZoneOutput,
  UpdateLandingZoneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /update-landingzone",
    input: {
      version: 0,
      remediationTypes: 0,
      landingZoneIdentifier: 0,
      manifest: 0,
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
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLandingZone",
})) as any;

const i_EnabledBaselineParameter: D.LazyStruct = () => ({ key: 0, value: 0 });
const i_EnabledControlParameter: D.LazyStruct = () => ({ key: 0, value: 0 });
