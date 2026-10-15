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
  sdkId: "ControlTower",
  serviceShapeName: "AWSControlTowerApis",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "controltower" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-05-10");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://controltower.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://controltower.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://controltower.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()("BadRequestException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
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
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()("UnauthorizedException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withAuthError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type BaselineOperationStatus = "SUCCEEDED" | "FAILED" | "IN_PROGRESS" | (string & {});
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
export type ControlOperationStatus = "SUCCEEDED" | "FAILED" | "IN_PROGRESS" | (string & {});
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
export type EnablementStatus = "SUCCEEDED" | "FAILED" | "UNDER_CHANGE" | (string & {});
export interface EnablementStatusSummary {
  status?: EnablementStatus;
  lastOperationIdentifier?: string;
}
export interface EnabledBaselineParameterSummary {
  key: string;
  value: any;
}
export type EnabledBaselineParameterSummaries = EnabledBaselineParameterSummary[];
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
export type DriftStatus = "DRIFTED" | "IN_SYNC" | "NOT_CHECKING" | "UNKNOWN" | (string & {});
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
const Region = /*@__PURE__*/ __L.at(__c38, 0) as any as S.Schema<Region>;
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
export type LandingZoneStatus = "ACTIVE" | "PROCESSING" | "FAILED" | (string & {});
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
export type LandingZoneOperationType = "DELETE" | "CREATE" | "UPDATE" | "RESET" | (string & {});
export type LandingZoneOperationStatus = "SUCCEEDED" | "FAILED" | "IN_PROGRESS" | (string & {});
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
  input: __S(296, __c37, 0) as any as S.Schema<CreateLandingZoneInput>,
  output: __S(297, __c37, 1) as any as S.Schema<CreateLandingZoneOutput>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<DeleteLandingZoneInput>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteLandingZoneOutput>,
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
}));

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
  input: __S(16, __c2, 0) as any as S.Schema<DisableBaselineInput>,
  output: __S(8, __c1, 0) as any as S.Schema<DisableBaselineOutput>,
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
}));

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
  input: __S(24, __c3, 0) as any as S.Schema<DisableControlInput>,
  output: __S(8, __c1, 0) as any as S.Schema<DisableControlOutput>,
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
}));

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
  input: __S(32, __c4, 0) as any as S.Schema<EnableBaselineInput>,
  output: __S(33, __c4, 1) as any as S.Schema<EnableBaselineOutput>,
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
}));

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
  input: __S(48, __c6, 0) as any as S.Schema<EnableControlInput>,
  output: __S(49, __c6, 1) as any as S.Schema<EnableControlOutput>,
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
}));

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
  input: __S(56, __c7, 0) as any as S.Schema<GetBaselineInput>,
  output: __S(64, __c8, 0) as any as S.Schema<GetBaselineOutput>,
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
}));

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
  input: __S(72, __c9, 0) as any as S.Schema<GetBaselineOperationInput>,
  output: __S(74, __c9, 2) as any as S.Schema<GetBaselineOperationOutput>,
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
}));

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
  input: __S(80, __c10, 0) as any as S.Schema<GetControlOperationInput>,
  output: __S(81, __c10, 1) as any as S.Schema<GetControlOperationOutput>,
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
}));

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
  input: __S(96, __c12, 0) as any as S.Schema<GetEnabledBaselineInput>,
  output: __S(98, __c12, 2) as any as S.Schema<GetEnabledBaselineOutput>,
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
}));

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
  input: __S(128, __c16, 0) as any as S.Schema<GetEnabledControlInput>,
  output: __S(131, __c16, 3) as any as S.Schema<GetEnabledControlOutput>,
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
}));

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
  input: __S(144, __c18, 0) as any as S.Schema<GetLandingZoneInput>,
  output: __S(146, __c18, 2) as any as S.Schema<GetLandingZoneOutput>,
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
}));

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
  input: __S(152, __c19, 0) as any as S.Schema<GetLandingZoneOperationInput>,
  output: __S(154, __c19, 2) as any as S.Schema<GetLandingZoneOperationOutput>,
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
}));

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
  input: __S(160, __c20, 0) as any as S.Schema<ListBaselinesInput>,
  output: __S(162, __c20, 2) as any as S.Schema<ListBaselinesOutput>,
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
  input: __S(169, __c21, 1) as any as S.Schema<ListControlOperationsInput>,
  output: __S(171, __c21, 3) as any as S.Schema<ListControlOperationsOutput>,
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
  input: __S(185, __c23, 1) as any as S.Schema<ListEnabledBaselinesInput>,
  output: __S(188, __c23, 4) as any as S.Schema<ListEnabledBaselinesOutput>,
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
  input: __S(193, __c24, 1) as any as S.Schema<ListEnabledControlsInput>,
  output: __S(196, __c24, 4) as any as S.Schema<ListEnabledControlsOutput>,
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
  input: __S(201, __c25, 1) as any as S.Schema<ListLandingZoneOperationsInput>,
  output: __S(204, __c25, 4) as any as S.Schema<ListLandingZoneOperationsOutput>,
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
  input: __S(208, __c26, 0) as any as S.Schema<ListLandingZonesInput>,
  output: __S(211, __c26, 3) as any as S.Schema<ListLandingZonesOutput>,
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
  input: __S(216, __c27, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(217, __c27, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    BadRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(224, __c28, 0) as any as S.Schema<ResetEnabledBaselineInput>,
  output: __S(8, __c1, 0) as any as S.Schema<ResetEnabledBaselineOutput>,
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
}));

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
  input: __S(232, __c29, 0) as any as S.Schema<ResetEnabledControlInput>,
  output: __S(8, __c1, 0) as any as S.Schema<ResetEnabledControlOutput>,
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
}));

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
  input: __S(240, __c30, 0) as any as S.Schema<ResetLandingZoneInput>,
  output: __S(8, __c1, 0) as any as S.Schema<ResetLandingZoneOutput>,
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
}));

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
  input: __S(248, __c31, 0) as any as S.Schema<TagResourceInput>,
  output: __S(256, __c32, 0) as any as S.Schema<TagResourceOutput>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    BadRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(264, __c33, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(256, __c32, 0) as any as S.Schema<UntagResourceOutput>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    BadRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(272, __c34, 0) as any as S.Schema<UpdateEnabledBaselineInput>,
  output: __S(8, __c1, 0) as any as S.Schema<UpdateEnabledBaselineOutput>,
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
}));

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
  input: __S(280, __c35, 0) as any as S.Schema<UpdateEnabledControlInput>,
  output: __S(8, __c1, 0) as any as S.Schema<UpdateEnabledControlOutput>,
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
}));

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
  input: __S(288, __c36, 0) as any as S.Schema<UpdateLandingZoneInput>,
  output: __S(8, __c1, 0) as any as S.Schema<UpdateLandingZoneOutput>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ landingZoneIdentifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/delete-landingzone" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteLandingZoneInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ operationIdentifier: S.String })).annotate({
        identifier: "DeleteLandingZoneOutput",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ enabledBaselineIdentifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/disable-baseline" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisableBaselineInput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          controlIdentifier: S.optional(S.String),
          targetIdentifier: S.optional(S.String),
          enabledControlIdentifier: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/disable-control" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisableControlInput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          baselineVersion: S.String,
          parameters: S.optional(__S(41, __c5, 1)),
          baselineIdentifier: S.String,
          targetIdentifier: S.String,
          tags: S.optional(__S(312, __c39, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/enable-baseline" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "EnableBaselineInput" });
    case 1:
      return S.suspend(() => S.Struct({ operationIdentifier: S.String, arn: S.String })).annotate({
        identifier: "EnableBaselineOutput",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.Any })).annotate({
        identifier: "EnabledBaselineParameter",
      });
    case 1:
      return S.Array(__S(40, __c5, 0));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          controlIdentifier: S.String,
          targetIdentifier: S.String,
          tags: S.optional(__S(312, __c39, 0)),
          parameters: S.optional(__S(41, __c5, 1)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/enable-control" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "EnableControlInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ operationIdentifier: S.String, arn: S.optional(S.String) }),
      ).annotate({ identifier: "EnableControlOutput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ baselineIdentifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/get-baseline" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetBaselineInput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String, name: S.String, description: S.optional(S.String) }),
      ).annotate({ identifier: "GetBaselineOutput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ operationIdentifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/get-baseline-operation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBaselineOperationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          operationIdentifier: S.optional(S.String),
          operationType: S.optional(S.String),
          status: S.optional(S.String),
          startTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          statusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "BaselineOperation" });
    case 2:
      return S.suspend(() => S.Struct({ baselineOperation: __S(73, __c9, 1) })).annotate({
        identifier: "GetBaselineOperationOutput",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ operationIdentifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/get-control-operation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetControlOperationInput" });
    case 1:
      return S.suspend(() => S.Struct({ controlOperation: __S(88, __c11, 0) })).annotate({
        identifier: "GetControlOperationOutput",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          operationType: S.optional(S.String),
          startTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          status: S.optional(S.String),
          statusMessage: S.optional(S.String),
          operationIdentifier: S.optional(S.String),
          controlIdentifier: S.optional(S.String),
          targetIdentifier: S.optional(S.String),
          enabledControlIdentifier: S.optional(S.String),
        }),
      ).annotate({ identifier: "ControlOperation" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ enabledBaselineIdentifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/get-enabled-baseline" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEnabledBaselineInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          baselineIdentifier: S.String,
          baselineVersion: S.optional(S.String),
          driftStatusSummary: S.optional(__S(121, __c15, 1)),
          targetIdentifier: S.String,
          parentIdentifier: S.optional(S.String),
          statusSummary: __S(112, __c14, 0),
          parameters: S.optional(__S(41, __c5, 1)),
        }),
      ).annotate({ identifier: "EnabledBaselineDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({ enabledBaselineDetails: S.optional(__S(97, __c12, 1)) }),
      ).annotate({ identifier: "GetEnabledBaselineOutput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ status: S.optional(S.String) })).annotate({
        identifier: "EnabledBaselineInheritanceDrift",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ status: S.optional(S.String), lastOperationIdentifier: S.optional(S.String) }),
      ).annotate({ identifier: "EnablementStatusSummary" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ inheritance: S.optional(__S(104, __c13, 0)) })).annotate({
        identifier: "EnabledBaselineDriftTypes",
      });
    case 1:
      return S.suspend(() => S.Struct({ types: S.optional(__S(120, __c15, 0)) })).annotate({
        identifier: "EnabledBaselineDriftStatusSummary",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ enabledControlIdentifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/get-enabled-control" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEnabledControlInput" });
    case 1:
      return S.Array(Region);
    case 2:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          controlIdentifier: S.optional(S.String),
          targetIdentifier: S.optional(S.String),
          statusSummary: S.optional(__S(112, __c14, 0)),
          driftStatusSummary: S.optional(__S(137, __c17, 1)),
          parentIdentifier: S.optional(S.String),
          targetRegions: S.optional(__S(129, __c16, 1)),
          parameters: S.optional(__S(41, __c5, 1)),
        }),
      ).annotate({ identifier: "EnabledControlDetails" });
    case 3:
      return S.suspend(() => S.Struct({ enabledControlDetails: __S(130, __c16, 2) })).annotate({
        identifier: "GetEnabledControlOutput",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          inheritance: S.optional(__S(104, __c13, 0)),
          resource: S.optional(__S(104, __c13, 0)),
        }),
      ).annotate({ identifier: "EnabledControlDriftTypes" });
    case 1:
      return S.suspend(() =>
        S.Struct({ driftStatus: S.optional(S.String), types: S.optional(__S(136, __c17, 0)) }),
      ).annotate({ identifier: "DriftStatusSummary" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ landingZoneIdentifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/get-landingzone" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetLandingZoneInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          version: S.String,
          remediationTypes: S.optional(__S(320, __c40, 0)),
          arn: S.optional(S.String),
          status: S.optional(S.String),
          latestAvailableVersion: S.optional(S.String),
          driftStatus: S.optional(__S(104, __c13, 0)),
          manifest: S.Any,
        }),
      ).annotate({ identifier: "LandingZoneDetail" });
    case 2:
      return S.suspend(() => S.Struct({ landingZone: __S(145, __c18, 1) })).annotate({
        identifier: "GetLandingZoneOutput",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ operationIdentifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/get-landingzone-operation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLandingZoneOperationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          operationType: S.optional(S.String),
          operationIdentifier: S.optional(S.String),
          status: S.optional(S.String),
          startTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          statusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "LandingZoneOperationDetail" });
    case 2:
      return S.suspend(() => S.Struct({ operationDetails: __S(153, __c19, 1) })).annotate({
        identifier: "GetLandingZoneOperationOutput",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), maxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/list-baselines" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListBaselinesInput" });
    case 1:
      return S.Array(__S(64, __c8, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ baselines: __S(161, __c20, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListBaselinesOutput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          controlIdentifiers: S.optional(__S(176, __c22, 0)),
          targetIdentifiers: S.optional(__S(176, __c22, 0)),
          enabledControlIdentifiers: S.optional(__S(176, __c22, 0)),
          statuses: S.optional(__S(320, __c40, 0)),
          controlOperationTypes: S.optional(__S(320, __c40, 0)),
        }),
      ).annotate({ identifier: "ControlOperationFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          filter: S.optional(__S(168, __c21, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-control-operations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListControlOperationsInput" });
    case 2:
      return S.Array(__S(88, __c11, 0));
    case 3:
      return S.suspend(() =>
        S.Struct({ controlOperations: __S(170, __c21, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListControlOperationsOutput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          targetIdentifiers: S.optional(__S(176, __c22, 0)),
          baselineIdentifiers: S.optional(__S(176, __c22, 0)),
          parentIdentifiers: S.optional(__S(176, __c22, 0)),
          statuses: S.optional(__S(320, __c40, 0)),
          inheritanceDriftStatuses: S.optional(__S(320, __c40, 0)),
        }),
      ).annotate({ identifier: "EnabledBaselineFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          filter: S.optional(__S(184, __c23, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          includeChildren: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-enabled-baselines" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEnabledBaselinesInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          baselineIdentifier: S.String,
          baselineVersion: S.optional(S.String),
          driftStatusSummary: S.optional(__S(121, __c15, 1)),
          targetIdentifier: S.String,
          parentIdentifier: S.optional(S.String),
          statusSummary: __S(112, __c14, 0),
        }),
      ).annotate({ identifier: "EnabledBaselineSummary" });
    case 3:
      return S.Array(__S(186, __c23, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ enabledBaselines: __S(187, __c23, 3), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEnabledBaselinesOutput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          controlIdentifiers: S.optional(__S(176, __c22, 0)),
          statuses: S.optional(__S(320, __c40, 0)),
          driftStatuses: S.optional(__S(320, __c40, 0)),
          parentIdentifiers: S.optional(__S(176, __c22, 0)),
          inheritanceDriftStatuses: S.optional(__S(320, __c40, 0)),
          resourceDriftStatuses: S.optional(__S(320, __c40, 0)),
        }),
      ).annotate({ identifier: "EnabledControlFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          targetIdentifier: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          filter: S.optional(__S(192, __c24, 0)),
          includeChildren: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-enabled-controls" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEnabledControlsInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          controlIdentifier: S.optional(S.String),
          targetIdentifier: S.optional(S.String),
          statusSummary: S.optional(__S(112, __c14, 0)),
          driftStatusSummary: S.optional(__S(137, __c17, 1)),
          parentIdentifier: S.optional(S.String),
        }),
      ).annotate({ identifier: "EnabledControlSummary" });
    case 3:
      return S.Array(__S(194, __c24, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ enabledControls: __S(195, __c24, 3), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEnabledControlsOutput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          types: S.optional(__S(320, __c40, 0)),
          statuses: S.optional(__S(320, __c40, 0)),
        }),
      ).annotate({ identifier: "LandingZoneOperationFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          filter: S.optional(__S(200, __c25, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-landingzone-operations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListLandingZoneOperationsInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          operationType: S.optional(S.String),
          operationIdentifier: S.optional(S.String),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "LandingZoneOperationSummary" });
    case 3:
      return S.Array(__S(202, __c25, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ landingZoneOperations: __S(203, __c25, 3), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListLandingZoneOperationsOutput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), maxResults: S.optional(S.Number) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-landingzones" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListLandingZonesInput" });
    case 1:
      return S.suspend(() => S.Struct({ arn: S.optional(S.String) })).annotate({
        identifier: "LandingZoneSummary",
      });
    case 2:
      return S.Array(__S(209, __c26, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ landingZones: __S(210, __c26, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListLandingZonesOutput" });
  }
}
function __c27(j: number): any {
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
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() => S.Struct({ tags: __S(312, __c39, 0) })).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ enabledBaselineIdentifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/reset-enabled-baseline" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ResetEnabledBaselineInput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ enabledControlIdentifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/reset-enabled-control" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ResetEnabledControlInput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ landingZoneIdentifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/reset-landingzone" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ResetLandingZoneInput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(312, __c39, 0),
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
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceOutput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(176, __c22, 0).pipe(T.HttpQuery("tagKeys")),
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
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          baselineVersion: S.String,
          parameters: S.optional(__S(41, __c5, 1)),
          enabledBaselineIdentifier: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/update-enabled-baseline" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateEnabledBaselineInput" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ parameters: __S(41, __c5, 1), enabledControlIdentifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/update-enabled-control" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateEnabledControlInput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          version: S.String,
          remediationTypes: S.optional(__S(320, __c40, 0)),
          landingZoneIdentifier: S.String,
          manifest: S.optional(S.Any),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/update-landingzone" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateLandingZoneInput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          version: S.String,
          remediationTypes: S.optional(__S(320, __c40, 0)),
          tags: S.optional(__S(312, __c39, 0)),
          manifest: S.optional(S.Any),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/create-landingzone" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateLandingZoneInput" });
    case 1:
      return S.suspend(() => S.Struct({ arn: S.String, operationIdentifier: S.String })).annotate({
        identifier: "CreateLandingZoneOutput",
      });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.optional(S.String) })).annotate({
        identifier: "Region",
      });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
