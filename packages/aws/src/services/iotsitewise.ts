import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import type * as stream from "effect/Stream";
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
  sdkId: "IoTSiteWise",
  target: "AWSIoTSiteWise",
  version: "2019-12-02",
  sigv4: "iotsitewise",
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
                `https://iotsitewise-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://iotsitewise-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://iotsitewise.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://iotsitewise.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ConflictingOperationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConflictingOperationException",
    ["ConflictError"],
    { status: 409 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceArn: string;
  }> {}
export class InternalFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalFailureException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["BadRequestError"],
    { status: 410 },
  )<{ readonly message: string }> {}
export class PreconditionFailedException
  extends /*@__PURE__*/ TE.TaggedError("PreconditionFailedException", [], {
    status: 412,
  })<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceArn: string;
  }> {}
export class QueryTimeoutException
  extends /*@__PURE__*/ TE.TaggedError(
    "QueryTimeoutException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceAlreadyExistsException",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceArn: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { status: 503 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly resourceName?: string }> {}
export class UnauthorizedException
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedException", ["AuthError"], {
    status: 401,
  })<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type CustomID = string;
export type ClientToken = string;
export interface AssociateAssetsRequest {
  assetId: string;
  hierarchyId: string;
  childAssetId: string;
  clientToken?: string;
}
export interface AssociateAssetsResponse {}
export type PropertyAlias = string;
export interface AssociateTimeSeriesToAssetPropertyRequest {
  alias: string;
  assetId: string;
  propertyId: string;
  clientToken?: string;
}
export interface AssociateTimeSeriesToAssetPropertyResponse {}
export type ID = string;
export type WorkspaceName = string;
export type TimeSeriesId = string;
export type TimeInSeconds = number;
export type OffsetInNanos = number;
export interface TimeInNanos {
  timeInSeconds: number;
  offsetInNanos?: number;
}
export interface AssociateDataSegmentEntry {
  sourceDatasetId: string;
  timeSeriesId: string;
  startTimestamp: TimeInNanos;
  endTimestamp: TimeInNanos;
}
export type AssociateDataSegmentEntries = AssociateDataSegmentEntry[];
export interface BatchAssociateDataSegmentsToDatasetRequest {
  datasetId: string;
  workspaceName: string;
  associateDataSegmentEntries: AssociateDataSegmentEntry[];
  clientToken?: string;
}
export type Version = string;
export type DataSegmentErrorCode =
  | "INTERNAL_FAILURE"
  | "VALIDATION_ERROR"
  | "RESOURCE_NOT_FOUND"
  | "LIMIT_EXCEEDED"
  | "CONFLICTING_OPERATION"
  | (string & {});
export type DataSegmentErrorMessage = string;
export interface FailedDataSegmentAssociation {
  sourceDatasetId: string;
  timeSeriesId: string;
  startTimestamp: TimeInNanos;
  endTimestamp: TimeInNanos;
  errorCode: DataSegmentErrorCode;
  errorMessage: string;
}
export type FailedDataSegmentAssociations = FailedDataSegmentAssociation[];
export interface BatchAssociateDataSegmentsToDatasetResponse {
  datasetId: string;
  datasetVersion: string;
  failedAssociations: FailedDataSegmentAssociation[];
}
export type IDs = string[];
export interface BatchAssociateProjectAssetsRequest {
  projectId: string;
  assetIds: string[];
  clientToken?: string;
}
export type AssetErrorCode = "INTERNAL_FAILURE" | (string & {});
export type AssetErrorMessage = string;
export interface AssetErrorDetails {
  assetId: string;
  code: AssetErrorCode;
  message: string;
}
export type BatchAssociateProjectAssetsErrors = AssetErrorDetails[];
export interface BatchAssociateProjectAssetsResponse {
  errors?: AssetErrorDetails[];
}
export interface DeleteDataSegmentEntry {
  timeSeriesId: string;
  startTimestamp: TimeInNanos;
  endTimestamp: TimeInNanos;
}
export type DeleteDataSegmentEntries = DeleteDataSegmentEntry[];
export interface BatchDeleteDatasetDataSegmentsRequest {
  datasetId: string;
  workspaceName: string;
  deleteDataSegmentEntries: DeleteDataSegmentEntry[];
  clientToken?: string;
}
export interface FailedDataSegmentDeletion {
  timeSeriesId: string;
  startTimestamp: TimeInNanos;
  endTimestamp: TimeInNanos;
  errorCode: DataSegmentErrorCode;
  errorMessage: string;
}
export type FailedDataSegmentDeletions = FailedDataSegmentDeletion[];
export interface BatchDeleteDatasetDataSegmentsResponse {
  datasetId: string;
  datasetVersion: string;
  errors: FailedDataSegmentDeletion[];
}
export interface DisassociateDataSegmentEntry {
  sourceDatasetId: string;
  timeSeriesId: string;
  startTimestamp: TimeInNanos;
  endTimestamp: TimeInNanos;
}
export type DisassociateDataSegmentEntries = DisassociateDataSegmentEntry[];
export interface BatchDisassociateDataSegmentsFromDatasetRequest {
  datasetId: string;
  workspaceName: string;
  disassociateDataSegmentEntries: DisassociateDataSegmentEntry[];
  clientToken?: string;
}
export interface FailedDataSegmentDisassociation {
  sourceDatasetId: string;
  timeSeriesId: string;
  startTimestamp: TimeInNanos;
  endTimestamp: TimeInNanos;
  errorCode: DataSegmentErrorCode;
  errorMessage: string;
}
export type FailedDataSegmentDisassociations =
  FailedDataSegmentDisassociation[];
export interface BatchDisassociateDataSegmentsFromDatasetResponse {
  datasetId: string;
  datasetVersion: string;
  failedDisassociations: FailedDataSegmentDisassociation[];
}
export interface BatchDisassociateProjectAssetsRequest {
  projectId: string;
  assetIds: string[];
  clientToken?: string;
}
export type BatchDisassociateProjectAssetsErrors = AssetErrorDetails[];
export interface BatchDisassociateProjectAssetsResponse {
  errors?: AssetErrorDetails[];
}
export type EntryId = string;
export type AssetPropertyAlias = string;
export type AggregateType =
  | "AVERAGE"
  | "COUNT"
  | "MAXIMUM"
  | "MINIMUM"
  | "SUM"
  | "STANDARD_DEVIATION"
  | (string & {});
export type AggregateTypes = AggregateType[];
export type Resolution = string;
export type Quality = "GOOD" | "BAD" | "UNCERTAIN" | (string & {});
export type Qualities = Quality[];
export type TimeOrdering = "ASCENDING" | "DESCENDING" | (string & {});
export interface BatchGetAssetPropertyAggregatesEntry {
  entryId: string;
  assetId?: string;
  propertyId?: string;
  propertyAlias?: string;
  aggregateTypes: AggregateType[];
  resolution: string;
  startDate: Date;
  endDate: Date;
  qualities?: Quality[];
  timeOrdering?: TimeOrdering;
}
export type BatchGetAssetPropertyAggregatesEntries =
  BatchGetAssetPropertyAggregatesEntry[];
export type NextToken = string;
export type BatchGetAssetPropertyAggregatesMaxResults = number;
export interface BatchGetAssetPropertyAggregatesRequest {
  entries: BatchGetAssetPropertyAggregatesEntry[];
  nextToken?: string;
  maxResults?: number;
}
export type BatchGetAssetPropertyAggregatesErrorCode =
  | "ResourceNotFoundException"
  | "InvalidRequestException"
  | "AccessDeniedException"
  | (string & {});
export type ErrorMessage = string;
export interface BatchGetAssetPropertyAggregatesErrorEntry {
  errorCode: BatchGetAssetPropertyAggregatesErrorCode;
  errorMessage: string;
  entryId: string;
}
export type BatchGetAssetPropertyAggregatesErrorEntries =
  BatchGetAssetPropertyAggregatesErrorEntry[];
export type AggregatedDoubleValue = number;
export interface Aggregates {
  average?: number;
  count?: number;
  maximum?: number;
  minimum?: number;
  sum?: number;
  standardDeviation?: number;
}
export interface AggregatedValue {
  timestamp: Date;
  quality?: Quality;
  value: Aggregates;
}
export type AggregatedValues = AggregatedValue[];
export interface BatchGetAssetPropertyAggregatesSuccessEntry {
  entryId: string;
  aggregatedValues: AggregatedValue[];
}
export type BatchGetAssetPropertyAggregatesSuccessEntries =
  BatchGetAssetPropertyAggregatesSuccessEntry[];
export type BatchEntryCompletionStatus = "SUCCESS" | "ERROR" | (string & {});
export interface BatchGetAssetPropertyAggregatesErrorInfo {
  errorCode: BatchGetAssetPropertyAggregatesErrorCode;
  errorTimestamp: Date;
}
export interface BatchGetAssetPropertyAggregatesSkippedEntry {
  entryId: string;
  completionStatus: BatchEntryCompletionStatus;
  errorInfo?: BatchGetAssetPropertyAggregatesErrorInfo;
}
export type BatchGetAssetPropertyAggregatesSkippedEntries =
  BatchGetAssetPropertyAggregatesSkippedEntry[];
export interface BatchGetAssetPropertyAggregatesResponse {
  errorEntries: BatchGetAssetPropertyAggregatesErrorEntry[];
  successEntries: BatchGetAssetPropertyAggregatesSuccessEntry[];
  skippedEntries: BatchGetAssetPropertyAggregatesSkippedEntry[];
  nextToken?: string;
}
export interface BatchGetAssetPropertyValueEntry {
  entryId: string;
  assetId?: string;
  propertyId?: string;
  propertyAlias?: string;
}
export type BatchGetAssetPropertyValueEntries =
  BatchGetAssetPropertyValueEntry[];
export interface BatchGetAssetPropertyValueRequest {
  entries: BatchGetAssetPropertyValueEntry[];
  nextToken?: string;
}
export type BatchGetAssetPropertyValueErrorCode =
  | "ResourceNotFoundException"
  | "InvalidRequestException"
  | "AccessDeniedException"
  | (string & {});
export interface BatchGetAssetPropertyValueErrorEntry {
  errorCode: BatchGetAssetPropertyValueErrorCode;
  errorMessage: string;
  entryId: string;
}
export type BatchGetAssetPropertyValueErrorEntries =
  BatchGetAssetPropertyValueErrorEntry[];
export type PropertyValueStringValue = string;
export type PropertyValueIntegerValue = number;
export type PropertyValueDoubleValue = number;
export type PropertyValueBooleanValue = boolean;
export type RawValueType = "D" | "B" | "S" | "I" | "U" | (string & {});
export interface PropertyValueNullValue {
  valueType: RawValueType;
}
export interface Variant {
  stringValue?: string;
  integerValue?: number;
  doubleValue?: number;
  booleanValue?: boolean;
  nullValue?: PropertyValueNullValue;
}
export interface AssetPropertyValue {
  value: Variant;
  timestamp: TimeInNanos;
  quality?: Quality;
}
export interface BatchGetAssetPropertyValueSuccessEntry {
  entryId: string;
  assetPropertyValue?: AssetPropertyValue;
}
export type BatchGetAssetPropertyValueSuccessEntries =
  BatchGetAssetPropertyValueSuccessEntry[];
export interface BatchGetAssetPropertyValueErrorInfo {
  errorCode: BatchGetAssetPropertyValueErrorCode;
  errorTimestamp: Date;
}
export interface BatchGetAssetPropertyValueSkippedEntry {
  entryId: string;
  completionStatus: BatchEntryCompletionStatus;
  errorInfo?: BatchGetAssetPropertyValueErrorInfo;
}
export type BatchGetAssetPropertyValueSkippedEntries =
  BatchGetAssetPropertyValueSkippedEntry[];
export interface BatchGetAssetPropertyValueResponse {
  errorEntries: BatchGetAssetPropertyValueErrorEntry[];
  successEntries: BatchGetAssetPropertyValueSuccessEntry[];
  skippedEntries: BatchGetAssetPropertyValueSkippedEntry[];
  nextToken?: string;
}
export interface BatchGetAssetPropertyValueHistoryEntry {
  entryId: string;
  assetId?: string;
  propertyId?: string;
  propertyAlias?: string;
  startDate?: Date;
  endDate?: Date;
  qualities?: Quality[];
  timeOrdering?: TimeOrdering;
}
export type BatchGetAssetPropertyValueHistoryEntries =
  BatchGetAssetPropertyValueHistoryEntry[];
export type BatchGetAssetPropertyValueHistoryMaxResults = number;
export interface BatchGetAssetPropertyValueHistoryRequest {
  entries: BatchGetAssetPropertyValueHistoryEntry[];
  nextToken?: string;
  maxResults?: number;
}
export type BatchGetAssetPropertyValueHistoryErrorCode =
  | "ResourceNotFoundException"
  | "InvalidRequestException"
  | "AccessDeniedException"
  | (string & {});
export interface BatchGetAssetPropertyValueHistoryErrorEntry {
  errorCode: BatchGetAssetPropertyValueHistoryErrorCode;
  errorMessage: string;
  entryId: string;
}
export type BatchGetAssetPropertyValueHistoryErrorEntries =
  BatchGetAssetPropertyValueHistoryErrorEntry[];
export type AssetPropertyValueHistory = AssetPropertyValue[];
export interface BatchGetAssetPropertyValueHistorySuccessEntry {
  entryId: string;
  assetPropertyValueHistory: AssetPropertyValue[];
}
export type BatchGetAssetPropertyValueHistorySuccessEntries =
  BatchGetAssetPropertyValueHistorySuccessEntry[];
export interface BatchGetAssetPropertyValueHistoryErrorInfo {
  errorCode: BatchGetAssetPropertyValueHistoryErrorCode;
  errorTimestamp: Date;
}
export interface BatchGetAssetPropertyValueHistorySkippedEntry {
  entryId: string;
  completionStatus: BatchEntryCompletionStatus;
  errorInfo?: BatchGetAssetPropertyValueHistoryErrorInfo;
}
export type BatchGetAssetPropertyValueHistorySkippedEntries =
  BatchGetAssetPropertyValueHistorySkippedEntry[];
export interface BatchGetAssetPropertyValueHistoryResponse {
  errorEntries: BatchGetAssetPropertyValueHistoryErrorEntry[];
  successEntries: BatchGetAssetPropertyValueHistorySuccessEntry[];
  skippedEntries: BatchGetAssetPropertyValueHistorySkippedEntry[];
  nextToken?: string;
}
export type AssetPropertyValues = AssetPropertyValue[];
export interface PutAssetPropertyValueEntry {
  entryId: string;
  assetId?: string;
  propertyId?: string;
  propertyAlias?: string;
  propertyValues: AssetPropertyValue[];
}
export type PutAssetPropertyValueEntries = PutAssetPropertyValueEntry[];
export interface BatchPutAssetPropertyValueRequest {
  enablePartialEntryProcessing?: boolean;
  entries: PutAssetPropertyValueEntry[];
}
export type BatchPutAssetPropertyValueErrorCode =
  | "ResourceNotFoundException"
  | "InvalidRequestException"
  | "InternalFailureException"
  | "ServiceUnavailableException"
  | "ThrottlingException"
  | "LimitExceededException"
  | "ConflictingOperationException"
  | "TimestampOutOfRangeException"
  | "AccessDeniedException"
  | (string & {});
export type Timestamps = TimeInNanos[];
export interface BatchPutAssetPropertyError {
  errorCode: BatchPutAssetPropertyValueErrorCode;
  errorMessage: string;
  timestamps: TimeInNanos[];
}
export type BatchPutAssetPropertyErrors = BatchPutAssetPropertyError[];
export interface BatchPutAssetPropertyErrorEntry {
  entryId: string;
  errors: BatchPutAssetPropertyError[];
}
export type BatchPutAssetPropertyErrorEntries =
  BatchPutAssetPropertyErrorEntry[];
export interface BatchPutAssetPropertyValueResponse {
  errorEntries: BatchPutAssetPropertyErrorEntry[];
}
export interface CancelEnrichmentJobRequest {
  workspaceName: string;
  jobId: string;
}
export type EnrichmentJobStatus =
  | "PENDING"
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | "TIMED_OUT"
  | "CANCELLED"
  | (string & {});
export interface CancelEnrichmentJobResponse {
  jobId: string;
  status: EnrichmentJobStatus;
}
export type ResourceName = string;
export type CancelPipelineExecutionRequestReasonString = string;
export interface CancelPipelineExecutionRequest {
  workspaceName: string;
  pipelineName: string;
  pipelineExecutionId: string;
  reason?: string;
}
export type PipelineExecutionState =
  | "NOT_STARTED"
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "CANCELLING"
  | "CANCELLED"
  | (string & {});
export interface CancelPipelineExecutionResponse {
  state: PipelineExecutionState;
}
export type QueryId = string;
export interface CancelQueryRequest {
  workspaceName: string;
  queryId: string;
}
export type QueryStatus =
  | "SUBMITTED"
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELED"
  | "CANCELING"
  | (string & {});
export interface CancelQueryResponse {
  queryId: string;
  status: QueryStatus;
}
export type IdentityId = string;
export interface UserIdentity {
  id: string;
}
export interface GroupIdentity {
  id: string;
}
export type IamArn = string;
export interface IAMUserIdentity {
  arn: string;
}
export interface IAMRoleIdentity {
  arn: string;
}
export interface Identity {
  user?: UserIdentity;
  group?: GroupIdentity;
  iamUser?: IAMUserIdentity;
  iamRole?: IAMRoleIdentity;
}
export interface PortalResource {
  id: string;
}
export interface ProjectResource {
  id: string;
}
export interface Resource {
  portal?: PortalResource;
  project?: ProjectResource;
}
export type Permission = "ADMINISTRATOR" | "VIEWER" | (string & {});
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateAccessPolicyRequest {
  accessPolicyIdentity: Identity;
  accessPolicyResource: Resource;
  accessPolicyPermission: Permission;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type ARN = string;
export interface CreateAccessPolicyResponse {
  accessPolicyId: string;
  accessPolicyArn: string;
}
export type ApplicationName = string;
export type Description = string;
export interface CreateApplicationRequest {
  clientToken?: string;
  idcInstanceArn: string;
  workspaceName: string;
  name: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export type ApplicationId = string;
export type DnsSubdomain = string;
export type ApplicationStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | (string & {});
export interface CreateApplicationResponse {
  arn: string;
  id: string;
  dnsSubdomain: string;
  name: string;
  status: ApplicationStatus;
}
export type Name = string;
export type ExternalId = string;
export interface CreateAssetRequest {
  assetName: string;
  assetModelId: string;
  assetId?: string;
  assetExternalId?: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
  assetDescription?: string;
}
export type AssetState =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "FAILED"
  | (string & {});
export type ErrorCode = "VALIDATION_ERROR" | "INTERNAL_FAILURE" | (string & {});
export type DetailedErrorCode =
  | "INCOMPATIBLE_COMPUTE_LOCATION"
  | "INCOMPATIBLE_FORWARDING_CONFIGURATION"
  | (string & {});
export type DetailedErrorMessage = string;
export interface DetailedError {
  code: DetailedErrorCode;
  message: string;
}
export type DetailedErrors = DetailedError[];
export interface ErrorDetails {
  code: ErrorCode;
  message: string;
  details?: DetailedError[];
}
export interface AssetStatus {
  state: AssetState;
  error?: ErrorDetails;
}
export interface CreateAssetResponse {
  assetId: string;
  assetArn: string;
  assetStatus: AssetStatus;
}
export type AssetModelType =
  | "ASSET_MODEL"
  | "COMPONENT_MODEL"
  | "INTERFACE"
  | (string & {});
export type PropertyDataType =
  | "STRING"
  | "INTEGER"
  | "DOUBLE"
  | "BOOLEAN"
  | "STRUCT"
  | "VIDEO"
  | "ANNOTATION"
  | "JSON"
  | (string & {});
export type PropertyUnit = string;
export type DefaultValue = string;
export interface Attribute {
  defaultValue?: string;
}
export type ForwardingConfigState = "DISABLED" | "ENABLED" | (string & {});
export interface ForwardingConfig {
  state: ForwardingConfigState;
}
export interface MeasurementProcessingConfig {
  forwardingConfig: ForwardingConfig;
}
export interface Measurement {
  processingConfig?: MeasurementProcessingConfig;
}
export type Expression = string;
export type VariableName = string;
export type Macro = string;
export interface AssetModelPropertyPathSegment {
  id?: string;
  name?: string;
}
export type AssetModelPropertyPath = AssetModelPropertyPathSegment[];
export interface VariableValue {
  propertyId?: string;
  hierarchyId?: string;
  propertyPath?: AssetModelPropertyPathSegment[];
}
export interface ExpressionVariable {
  name: string;
  value: VariableValue;
}
export type ExpressionVariables = ExpressionVariable[];
export type ComputeLocation = "EDGE" | "CLOUD" | (string & {});
export interface TransformProcessingConfig {
  computeLocation: ComputeLocation;
  forwardingConfig?: ForwardingConfig;
}
export interface Transform {
  expression: string;
  variables: ExpressionVariable[];
  processingConfig?: TransformProcessingConfig;
}
export type Interval = string;
export type Offset = string;
export interface TumblingWindow {
  interval: string;
  offset?: string;
}
export interface MetricWindow {
  tumbling?: TumblingWindow;
}
export interface MetricProcessingConfig {
  computeLocation: ComputeLocation;
}
export interface Metric {
  expression?: string;
  variables?: ExpressionVariable[];
  window: MetricWindow;
  processingConfig?: MetricProcessingConfig;
}
export interface PropertyType {
  attribute?: Attribute;
  measurement?: Measurement;
  transform?: Transform;
  metric?: Metric;
}
export interface AssetModelPropertyDefinition {
  id?: string;
  externalId?: string;
  name: string;
  dataType: PropertyDataType;
  dataTypeSpec?: string;
  unit?: string;
  type: PropertyType;
}
export type AssetModelPropertyDefinitions = AssetModelPropertyDefinition[];
export interface AssetModelHierarchyDefinition {
  id?: string;
  externalId?: string;
  name: string;
  childAssetModelId: string;
}
export type AssetModelHierarchyDefinitions = AssetModelHierarchyDefinition[];
export interface AssetModelCompositeModelDefinition {
  id?: string;
  externalId?: string;
  name: string;
  description?: string;
  type: string;
  properties?: AssetModelPropertyDefinition[];
}
export type AssetModelCompositeModelDefinitions =
  AssetModelCompositeModelDefinition[];
export interface CreateAssetModelRequest {
  assetModelName: string;
  assetModelType?: AssetModelType;
  assetModelId?: string;
  assetModelExternalId?: string;
  assetModelDescription?: string;
  assetModelProperties?: AssetModelPropertyDefinition[];
  assetModelHierarchies?: AssetModelHierarchyDefinition[];
  assetModelCompositeModels?: AssetModelCompositeModelDefinition[];
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type AssetModelState =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "PROPAGATING"
  | "DELETING"
  | "FAILED"
  | (string & {});
export interface AssetModelStatus {
  state: AssetModelState;
  error?: ErrorDetails;
}
export interface CreateAssetModelResponse {
  assetModelId: string;
  assetModelArn: string;
  assetModelStatus: AssetModelStatus;
}
export type ETag = string;
export type SelectAll = string;
export type AssetModelVersionType = "LATEST" | "ACTIVE" | (string & {});
export interface CreateAssetModelCompositeModelRequest {
  assetModelId: string;
  assetModelCompositeModelExternalId?: string;
  parentAssetModelCompositeModelId?: string;
  assetModelCompositeModelId?: string;
  assetModelCompositeModelDescription?: string;
  assetModelCompositeModelName: string;
  assetModelCompositeModelType: string;
  clientToken?: string;
  composedAssetModelId?: string;
  assetModelCompositeModelProperties?: AssetModelPropertyDefinition[];
  ifMatch?: string;
  ifNoneMatch?: string;
  matchForVersionType?: AssetModelVersionType;
}
export interface AssetModelCompositeModelPathSegment {
  id?: string;
  name?: string;
}
export type AssetModelCompositeModelPath =
  AssetModelCompositeModelPathSegment[];
export interface CreateAssetModelCompositeModelResponse {
  assetModelCompositeModelId: string;
  assetModelCompositeModelPath: AssetModelCompositeModelPathSegment[];
  assetModelStatus: AssetModelStatus;
  assetModelId?: string;
}
export type BulkImportJobName = string;
export type Bucket = string;
export type ColumnName =
  | "ALIAS"
  | "ASSET_ID"
  | "PROPERTY_ID"
  | "DATA_TYPE"
  | "TIMESTAMP_SECONDS"
  | "TIMESTAMP_NANO_OFFSET"
  | "QUALITY"
  | "VALUE"
  | (string & {});
export type ColumnNames = ColumnName[];
export interface Csv {
  columnNames: ColumnName[];
}
export interface Parquet {}
export interface Mp4 {}
export interface Annotation {}
export interface FileFormat {
  csv?: Csv;
  parquet?: Parquet;
  mp4?: Mp4;
  annotation?: Annotation;
}
export interface File {
  bucket: string;
  key: string;
  versionId?: string;
  alias?: string;
  startTime?: TimeInNanos;
  fileFormat?: FileFormat;
}
export type Files = File[];
export interface ErrorReportLocation {
  bucket: string;
  prefix: string;
}
export interface JobConfiguration {
  fileFormat?: FileFormat;
}
export type AdaptiveIngestion = boolean;
export type DeleteFilesAfterImport = boolean;
export interface CreateBulkImportJobRequest {
  jobName: string;
  jobRoleArn: string;
  files: File[];
  errorReportLocation: ErrorReportLocation;
  jobConfiguration?: JobConfiguration;
  adaptiveIngestion?: boolean;
  deleteFilesAfterImport?: boolean;
  datasetId?: string;
  workspaceName?: string;
}
export type JobStatus =
  | "PENDING"
  | "CANCELLED"
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | "COMPLETED_WITH_FAILURES"
  | (string & {});
export interface CreateBulkImportJobResponse {
  jobId: string;
  jobName: string;
  jobStatus: JobStatus;
}
export type RestrictedName = string;
export type RestrictedDescription = string;
export type InputProperties = string;
export type ResultProperty = string;
export interface ComputationModelAnomalyDetectionConfiguration {
  inputProperties: string;
  resultProperty: string;
}
export interface ComputationModelConfiguration {
  anomalyDetection?: ComputationModelAnomalyDetectionConfiguration;
}
export type ComputationModelDataBindingVariable = string;
export interface AssetModelPropertyBindingValue {
  assetModelId: string;
  propertyId: string;
}
export interface AssetPropertyBindingValue {
  assetId: string;
  propertyId: string;
}
export type BindingValueList = ComputationModelDataBindingValue[];
export interface ComputationModelDataBindingValue {
  assetModelProperty?: AssetModelPropertyBindingValue;
  assetProperty?: AssetPropertyBindingValue;
  list?: ComputationModelDataBindingValue[];
}
export type ComputationModelDataBinding = {
  [key: string]: ComputationModelDataBindingValue | undefined;
};
export interface CreateComputationModelRequest {
  computationModelName: string;
  computationModelDescription?: string;
  computationModelConfiguration: ComputationModelConfiguration;
  computationModelDataBinding: {
    [key: string]: ComputationModelDataBindingValue | undefined;
  };
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type ComputationModelState =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "FAILED"
  | (string & {});
export interface ComputationModelStatus {
  state: ComputationModelState;
  error?: ErrorDetails;
}
export interface CreateComputationModelResponse {
  computationModelId: string;
  computationModelArn: string;
  computationModelStatus: ComputationModelStatus;
}
export type DashboardDefinition = string;
export interface CreateDashboardRequest {
  projectId: string;
  dashboardName: string;
  dashboardDescription?: string;
  dashboardDefinition: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateDashboardResponse {
  dashboardId: string;
  dashboardArn: string;
}
export type DatasetTypeEnum =
  | "SESSION"
  | "CURATED"
  | "EXTERNAL"
  | (string & {});
export interface SessionConfig {
  sessionStartTimestamp: TimeInNanos;
  sessionEndTimestamp: TimeInNanos;
}
export interface DatasetConfig {
  session?: SessionConfig;
}
export type MetadataKey = string;
export type MetadataValue = string;
export type Metadata = { [key: string]: string | undefined };
export type DatasetSourceType = "KENDRA" | "SITEWISE" | (string & {});
export type DatasetSourceFormat =
  | "KNOWLEDGE_BASE"
  | "TIMESERIES"
  | (string & {});
export interface KendraSourceDetail {
  knowledgeBaseArn: string;
  roleArn: string;
}
export interface SourceDetail {
  kendra?: KendraSourceDetail;
}
export interface DatasetSource {
  sourceType: DatasetSourceType;
  sourceFormat: DatasetSourceFormat;
  sourceDetail?: SourceDetail;
}
export interface CreateDatasetRequest {
  datasetId?: string;
  datasetName: string;
  datasetDescription?: string;
  datasetType?: DatasetTypeEnum;
  datasetConfig?: DatasetConfig;
  workspaceName?: string;
  metadata?: { [key: string]: string | undefined };
  datasetSource: DatasetSource;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type DatasetState =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "FAILED"
  | (string & {});
export interface DatasetStatus {
  state: DatasetState;
  error?: ErrorDetails;
}
export interface CreateDatasetResponse {
  datasetId: string;
  datasetArn: string;
  datasetStatus: DatasetStatus;
}
export type S3Uri = string;
export interface TrimSettings {
  startTime: TimeInNanos;
  endTime: TimeInNanos;
}
export type PositiveInteger = number;
export interface FormatSettings {
  framesPerSecond?: number;
  widthInPixels?: number;
  heightInPixels?: number;
}
export interface TimeseriesItem {
  timeSeriesId?: string;
  propertyAlias?: string;
  trimSettings?: TrimSettings;
  formatSettings?: FormatSettings;
}
export type TimeseriesList = TimeseriesItem[];
export type DatasetId = string;
export type ExportDataType =
  | "VIDEO"
  | "TELEMETRY"
  | "ANNOTATION"
  | (string & {});
export type ExportDataTypeList = ExportDataType[];
export interface DatasetItem {
  datasetId: string;
  trimSettings?: TrimSettings;
  exportDataTypes?: ExportDataType[];
}
export type ProcessingInput =
  | { timeseries: TimeseriesItem[]; dataset?: never }
  | { timeseries?: never; dataset: DatasetItem };
export interface ExportErrorReportLocation {
  s3Uri: string;
}
export interface CreateDatasetExportJobRequest {
  workspaceName: string;
  clientToken?: string;
  destinationS3Uri: string;
  input: ProcessingInput;
  errorReportLocation: ExportErrorReportLocation;
}
export type DatasetExportJobId = string;
export interface CreateDatasetExportJobResponse {
  jobId: string;
  workspaceName: string;
}
export interface EnrichmentTrimSettings {
  startTime: TimeInNanos;
  endTime: TimeInNanos;
}
export interface EventDetection {
  datasetId: string;
  timeSeriesId?: string;
  propertyAlias?: string;
  trimSettings: EnrichmentTrimSettings;
}
export type EnrichmentJobConfiguration = { eventDetection: EventDetection };
export interface CreateEnrichmentJobRequest {
  workspaceName: string;
  jobConfiguration: EnrichmentJobConfiguration;
  clientToken?: string;
}
export interface CreateEnrichmentJobResponse {
  jobId: string;
  status: EnrichmentJobStatus;
  createdAt: Date;
}
export type GatewayName = string;
export interface Greengrass {
  groupArn: string;
}
export type CoreDeviceThingName = string;
export type CoreDeviceOperatingSystem =
  | "LINUX_AARCH64"
  | "LINUX_AMD64"
  | "WINDOWS_AMD64"
  | (string & {});
export interface GreengrassV2 {
  coreDeviceThingName: string;
  coreDeviceOperatingSystem?: CoreDeviceOperatingSystem;
}
export type IotCoreThingName = string;
export interface SiemensIE {
  iotCoreThingName: string;
}
export interface GatewayPlatform {
  greengrass?: Greengrass;
  greengrassV2?: GreengrassV2;
  siemensIE?: SiemensIE;
}
export type GatewayVersion = string;
export interface CreateGatewayRequest {
  gatewayName: string;
  gatewayPlatform: GatewayPlatform;
  gatewayVersion?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateGatewayResponse {
  gatewayId: string;
  gatewayArn: string;
}
export type EnvironmentVariableName = string;
export type EnvironmentVariableValue = string;
export type EnvironmentVariablesMap = { [key: string]: string | undefined };
export type ComputeNodeNameList = string[];
export interface ComputeNode {
  computeNodeName: string;
  taskName: string;
  environmentVariables?: { [key: string]: string | undefined };
  dependsOn?: string[];
}
export type ComputeNodeList = ComputeNode[];
export interface CreatePipelineRequest {
  workspaceName: string;
  pipelineName: string;
  description?: string;
  environmentVariables?: { [key: string]: string | undefined };
  computations: ComputeNode[];
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export type ResourceErrorCode =
  | "VALIDATION_ERROR"
  | "INTERNAL_FAILURE"
  | (string & {});
export interface ResourceError {
  code?: ResourceErrorCode;
  message?: string;
}
export type ResourceState =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "FAILED"
  | (string & {});
export interface ResourceStatus {
  error?: ResourceError;
  state?: ResourceState;
}
export interface CreatePipelineResponse {
  pipelineName: string;
  pipelineArn: string;
  version: string;
  status: ResourceStatus;
}
export type Email = string | redacted.Redacted<string>;
export type ImageFileData = Uint8Array;
export type ImageFileType = "PNG" | (string & {});
export interface ImageFile {
  data: Uint8Array;
  type: ImageFileType;
}
export type AuthMode = "IAM" | "SSO" | (string & {});
export interface Alarms {
  alarmRoleArn: string;
  notificationLambdaArn?: string;
}
export type PortalType =
  | "SITEWISE_PORTAL_V1"
  | "SITEWISE_PORTAL_V2"
  | (string & {});
export type PortalTypeKey = string;
export type PortalTools = string[];
export interface PortalTypeEntry {
  portalTools?: string[];
}
export type PortalTypeConfiguration = {
  [key: string]: PortalTypeEntry | undefined;
};
export interface CreatePortalRequest {
  portalName: string;
  portalDescription?: string;
  portalContactEmail: string | redacted.Redacted<string>;
  clientToken?: string;
  portalLogoImageFile?: ImageFile;
  roleArn: string;
  tags?: { [key: string]: string | undefined };
  portalAuthMode?: AuthMode;
  notificationSenderEmail?: string | redacted.Redacted<string>;
  alarms?: Alarms;
  portalType?: PortalType;
  portalTypeConfiguration?: { [key: string]: PortalTypeEntry | undefined };
}
export type Url = string;
export type PortalState =
  | "CREATING"
  | "PENDING"
  | "UPDATING"
  | "DELETING"
  | "ACTIVE"
  | "FAILED"
  | (string & {});
export type MonitorErrorCode =
  | "INTERNAL_FAILURE"
  | "VALIDATION_ERROR"
  | "LIMIT_EXCEEDED"
  | (string & {});
export type MonitorErrorMessage = string;
export interface MonitorErrorDetails {
  code?: MonitorErrorCode;
  message?: string;
}
export interface PortalStatus {
  state: PortalState;
  error?: MonitorErrorDetails;
}
export type SSOApplicationId = string;
export interface CreatePortalResponse {
  portalId: string;
  portalArn: string;
  portalStartUrl: string;
  portalStatus: PortalStatus;
  ssoApplicationId: string;
}
export interface CreateProjectRequest {
  portalId: string;
  projectName: string;
  projectDescription?: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateProjectResponse {
  projectId: string;
  projectArn: string;
}
export type EcrUri = string | redacted.Redacted<string>;
export type IamRoleArn = string | redacted.Redacted<string>;
export type ProcessingType =
  | "GENERIC_COMPUTE_PROCESSING"
  | "HARDWARE_ACCELERATED_PROCESSING"
  | (string & {});
export type ProcessingUnit =
  | "UNITS_2"
  | "UNITS_4"
  | "UNITS_8"
  | "UNITS_12"
  | "UNITS_16"
  | "UNITS_24"
  | "UNITS_32"
  | "UNITS_36"
  | "UNITS_48"
  | "UNITS_60"
  | "UNITS_64"
  | "UNITS_72"
  | "UNITS_84"
  | "UNITS_96"
  | (string & {});
export type CommandList = string[];
export type TimeoutSeconds = number;
export interface ContainerTaskConfiguration {
  ecrUri: string | redacted.Redacted<string>;
  taskExecutionRole: string | redacted.Redacted<string>;
  processingType: ProcessingType;
  processingUnit: ProcessingUnit;
  command?: string[];
  timeoutSeconds?: number;
  environmentVariables?: { [key: string]: string | undefined };
}
export type TaskConfiguration = {
  containerTaskConfiguration: ContainerTaskConfiguration;
};
export interface CreateTaskRequest {
  workspaceName: string;
  taskName: string;
  description?: string;
  taskConfiguration: TaskConfiguration;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export interface CreateTaskResponse {
  taskName: string;
  taskArn: string;
  version: string;
  status: ResourceStatus;
}
export type EncryptionType =
  | "SITEWISE_DEFAULT_ENCRYPTION"
  | "KMS_BASED_ENCRYPTION"
  | (string & {});
export type KmsKeyId = string;
export interface WorkspaceEncryptionConfiguration {
  encryptionType: EncryptionType;
  kmsKeyId?: string;
}
export interface CreateWorkspaceRequest {
  workspaceName: string;
  workspaceDescription?: string;
  encryptionConfiguration: WorkspaceEncryptionConfiguration;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export type WorkspaceState =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "FAILED"
  | (string & {});
export interface WorkspaceErrorDetails {
  code: ErrorCode;
  message: string;
}
export interface WorkspaceStatus {
  state: WorkspaceState;
  error?: WorkspaceErrorDetails;
}
export interface CreateWorkspaceResponse {
  workspaceName: string;
  workspaceArn: string;
  workspaceStatus: WorkspaceStatus;
}
export interface DeleteAccessPolicyRequest {
  accessPolicyId: string;
  clientToken?: string;
}
export interface DeleteAccessPolicyResponse {}
export interface DeleteApplicationRequest {
  workspaceName: string;
  id: string;
}
export interface DeleteApplicationResponse {}
export interface DeleteAssetRequest {
  assetId: string;
  clientToken?: string;
}
export interface DeleteAssetResponse {
  assetId?: string;
  assetStatus: AssetStatus;
}
export interface DeleteAssetModelRequest {
  assetModelId: string;
  clientToken?: string;
  ifMatch?: string;
  ifNoneMatch?: string;
  matchForVersionType?: AssetModelVersionType;
}
export interface DeleteAssetModelResponse {
  assetModelId?: string;
  assetModelStatus: AssetModelStatus;
}
export interface DeleteAssetModelCompositeModelRequest {
  assetModelId: string;
  assetModelCompositeModelId: string;
  clientToken?: string;
  ifMatch?: string;
  ifNoneMatch?: string;
  matchForVersionType?: AssetModelVersionType;
}
export interface DeleteAssetModelCompositeModelResponse {
  assetModelStatus: AssetModelStatus;
  assetModelId?: string;
}
export interface DeleteAssetModelInterfaceRelationshipRequest {
  assetModelId: string;
  interfaceAssetModelId: string;
  clientToken?: string;
}
export interface DeleteAssetModelInterfaceRelationshipResponse {
  assetModelId: string;
  interfaceAssetModelId: string;
  assetModelArn: string;
  assetModelStatus: AssetModelStatus;
}
export interface DeleteComputationModelRequest {
  computationModelId: string;
  clientToken?: string;
}
export interface DeleteComputationModelResponse {
  computationModelStatus: ComputationModelStatus;
}
export interface DeleteDashboardRequest {
  dashboardId: string;
  clientToken?: string;
}
export interface DeleteDashboardResponse {}
export interface DeleteDatasetRequest {
  datasetId: string;
  workspaceName?: string;
  clientToken?: string;
}
export interface DeleteDatasetResponse {
  datasetStatus: DatasetStatus;
}
export interface DeleteGatewayRequest {
  gatewayId: string;
}
export interface DeleteGatewayResponse {}
export interface DeletePipelineRequest {
  workspaceName: string;
  pipelineName: string;
}
export interface DeletePipelineResponse {
  status: ResourceStatus;
}
export interface DeletePortalRequest {
  portalId: string;
  clientToken?: string;
}
export interface DeletePortalResponse {
  portalStatus: PortalStatus;
}
export interface DeleteProjectRequest {
  projectId: string;
  clientToken?: string;
}
export interface DeleteProjectResponse {}
export interface DeleteTaskRequest {
  workspaceName: string;
  taskName: string;
}
export interface DeleteTaskResponse {
  status: ResourceStatus;
}
export interface DeleteTimeSeriesRequest {
  alias?: string;
  assetId?: string;
  propertyId?: string;
  clientToken?: string;
  workspaceName?: string;
}
export interface DeleteTimeSeriesResponse {}
export interface DeleteWorkspaceRequest {
  workspaceName: string;
  clientToken?: string;
}
export interface DeleteWorkspaceResponse {
  workspaceStatus: WorkspaceStatus;
}
export interface DescribeAccessPolicyRequest {
  accessPolicyId: string;
}
export interface DescribeAccessPolicyResponse {
  accessPolicyId: string;
  accessPolicyArn: string;
  accessPolicyIdentity: Identity;
  accessPolicyResource: Resource;
  accessPolicyPermission: Permission;
  accessPolicyCreationDate: Date;
  accessPolicyLastUpdateDate: Date;
}
export interface DescribeActionRequest {
  actionId: string;
}
export interface TargetResource {
  assetId?: string;
  computationModelId?: string;
}
export type ActionPayloadString = string;
export interface ActionPayload {
  stringValue: string;
}
export interface ResolveTo {
  assetId: string;
}
export interface DescribeActionResponse {
  actionId: string;
  targetResource: TargetResource;
  actionDefinitionId: string;
  actionPayload: ActionPayload;
  executionTime: Date;
  resolveTo?: ResolveTo;
}
export interface DescribeApplicationRequest {
  workspaceName: string;
  id: string;
}
export type ApplicationDescription = string;
export interface DescribeApplicationResponse {
  arn: string;
  createdAt: Date;
  dnsSubdomain: string;
  description?: string;
  id: string;
  idcApplicationArn: string;
  name: string;
  status: ApplicationStatus;
  updatedAt: Date;
  workspaceName: string;
}
export type ExcludeProperties = boolean;
export interface DescribeAssetRequest {
  assetId: string;
  excludeProperties?: boolean;
}
export type PropertyNotificationTopic = string;
export type PropertyNotificationState = "ENABLED" | "DISABLED" | (string & {});
export interface PropertyNotification {
  topic: string;
  state: PropertyNotificationState;
}
export interface AssetPropertyPathSegment {
  id?: string;
  name?: string;
}
export type AssetPropertyPath = AssetPropertyPathSegment[];
export interface AssetProperty {
  id: string;
  externalId?: string;
  name: string;
  alias?: string;
  notification?: PropertyNotification;
  dataType: PropertyDataType;
  dataTypeSpec?: string;
  unit?: string;
  path?: AssetPropertyPathSegment[];
}
export type AssetProperties = AssetProperty[];
export interface AssetHierarchy {
  id?: string;
  externalId?: string;
  name: string;
}
export type AssetHierarchies = AssetHierarchy[];
export interface AssetCompositeModel {
  name: string;
  description?: string;
  type: string;
  properties: AssetProperty[];
  id?: string;
  externalId?: string;
}
export type AssetCompositeModels = AssetCompositeModel[];
export interface AssetCompositeModelPathSegment {
  id?: string;
  name?: string;
}
export type AssetCompositeModelPath = AssetCompositeModelPathSegment[];
export interface AssetCompositeModelSummary {
  id: string;
  externalId?: string;
  name: string;
  type: string;
  description: string;
  path: AssetCompositeModelPathSegment[];
}
export type AssetCompositeModelSummaries = AssetCompositeModelSummary[];
export interface DescribeAssetResponse {
  assetId: string;
  assetExternalId?: string;
  assetArn: string;
  assetName: string;
  assetModelId: string;
  assetProperties: AssetProperty[];
  assetHierarchies: AssetHierarchy[];
  assetCompositeModels?: AssetCompositeModel[];
  assetCreationDate: Date;
  assetLastUpdateDate: Date;
  assetStatus: AssetStatus;
  assetDescription?: string;
  assetCompositeModelSummaries?: AssetCompositeModelSummary[];
}
export interface DescribeAssetCompositeModelRequest {
  assetId: string;
  assetCompositeModelId: string;
}
export interface ActionDefinition {
  actionDefinitionId: string;
  actionName: string;
  actionType: string;
}
export type ActionDefinitions = ActionDefinition[];
export interface DescribeAssetCompositeModelResponse {
  assetId: string;
  assetCompositeModelId: string;
  assetCompositeModelExternalId?: string;
  assetCompositeModelPath: AssetCompositeModelPathSegment[];
  assetCompositeModelName: string;
  assetCompositeModelDescription: string;
  assetCompositeModelType: string;
  assetCompositeModelProperties: AssetProperty[];
  assetCompositeModelSummaries: AssetCompositeModelSummary[];
  actionDefinitions?: ActionDefinition[];
}
export type AssetModelVersionFilter = string;
export interface DescribeAssetModelRequest {
  assetModelId: string;
  excludeProperties?: boolean;
  assetModelVersion?: string;
}
export interface AssetModelProperty {
  id?: string;
  externalId?: string;
  name: string;
  dataType: PropertyDataType;
  dataTypeSpec?: string;
  unit?: string;
  type: PropertyType;
  path?: AssetModelPropertyPathSegment[];
}
export type AssetModelProperties = AssetModelProperty[];
export interface AssetModelHierarchy {
  id?: string;
  externalId?: string;
  name: string;
  childAssetModelId: string;
}
export type AssetModelHierarchies = AssetModelHierarchy[];
export interface AssetModelCompositeModel {
  name: string;
  description?: string;
  type: string;
  properties?: AssetModelProperty[];
  id?: string;
  externalId?: string;
}
export type AssetModelCompositeModels = AssetModelCompositeModel[];
export interface AssetModelCompositeModelSummary {
  id: string;
  externalId?: string;
  name: string;
  type: string;
  description?: string;
  path?: AssetModelCompositeModelPathSegment[];
}
export type AssetModelCompositeModelSummaries =
  AssetModelCompositeModelSummary[];
export interface InterfaceRelationship {
  id: string;
}
export type InterfaceDetails = InterfaceRelationship[];
export interface DescribeAssetModelResponse {
  assetModelId: string;
  assetModelExternalId?: string;
  assetModelArn: string;
  assetModelName: string;
  assetModelType?: AssetModelType;
  assetModelDescription: string;
  assetModelProperties: AssetModelProperty[];
  assetModelHierarchies: AssetModelHierarchy[];
  assetModelCompositeModels?: AssetModelCompositeModel[];
  assetModelCompositeModelSummaries?: AssetModelCompositeModelSummary[];
  assetModelCreationDate: Date;
  assetModelLastUpdateDate: Date;
  assetModelStatus: AssetModelStatus;
  assetModelVersion?: string;
  interfaceDetails?: InterfaceRelationship[];
  eTag?: string;
}
export interface DescribeAssetModelCompositeModelRequest {
  assetModelId: string;
  assetModelCompositeModelId: string;
  assetModelVersion?: string;
}
export interface CompositionRelationshipItem {
  id?: string;
}
export type CompositionRelationship = CompositionRelationshipItem[];
export interface CompositionDetails {
  compositionRelationship?: CompositionRelationshipItem[];
}
export interface DescribeAssetModelCompositeModelResponse {
  assetModelId: string;
  assetModelCompositeModelId: string;
  assetModelCompositeModelExternalId?: string;
  assetModelCompositeModelPath: AssetModelCompositeModelPathSegment[];
  assetModelCompositeModelName: string;
  assetModelCompositeModelDescription: string;
  assetModelCompositeModelType: string;
  assetModelCompositeModelProperties: AssetModelProperty[];
  compositionDetails?: CompositionDetails;
  assetModelCompositeModelSummaries: AssetModelCompositeModelSummary[];
  actionDefinitions?: ActionDefinition[];
}
export interface DescribeAssetModelInterfaceRelationshipRequest {
  assetModelId: string;
  interfaceAssetModelId: string;
}
export interface PropertyMapping {
  assetModelPropertyId: string;
  interfaceAssetModelPropertyId: string;
}
export type PropertyMappings = PropertyMapping[];
export interface HierarchyMapping {
  assetModelHierarchyId: string;
  interfaceAssetModelHierarchyId: string;
}
export type HierarchyMappings = HierarchyMapping[];
export interface DescribeAssetModelInterfaceRelationshipResponse {
  assetModelId: string;
  interfaceAssetModelId: string;
  propertyMappings: PropertyMapping[];
  hierarchyMappings: HierarchyMapping[];
}
export interface DescribeAssetPropertyRequest {
  assetId: string;
  propertyId: string;
}
export interface Property {
  id: string;
  externalId?: string;
  name: string;
  alias?: string;
  notification?: PropertyNotification;
  dataType: PropertyDataType;
  unit?: string;
  type?: PropertyType;
  path?: AssetPropertyPathSegment[];
}
export interface CompositeModelProperty {
  name: string;
  type: string;
  assetProperty: Property;
  id?: string;
  externalId?: string;
}
export interface DescribeAssetPropertyResponse {
  assetId: string;
  assetExternalId?: string;
  assetName: string;
  assetModelId: string;
  assetProperty?: Property;
  compositeModel?: CompositeModelProperty;
}
export interface DescribeBulkImportJobRequest {
  jobId: string;
  workspaceName?: string;
}
export interface DescribeBulkImportJobResponse {
  jobId: string;
  jobName: string;
  jobStatus: JobStatus;
  jobRoleArn: string;
  files: File[];
  errorReportLocation: ErrorReportLocation;
  jobConfiguration?: JobConfiguration;
  jobCreationDate: Date;
  jobLastUpdateDate: Date;
  adaptiveIngestion?: boolean;
  deleteFilesAfterImport?: boolean;
  datasetId?: string;
  workspaceName?: string;
}
export type ComputationModelVersionFilter = string;
export interface DescribeComputationModelRequest {
  computationModelId: string;
  computationModelVersion?: string;
}
export interface DescribeComputationModelResponse {
  computationModelId: string;
  computationModelArn: string;
  computationModelName: string;
  computationModelDescription?: string;
  computationModelConfiguration: ComputationModelConfiguration;
  computationModelDataBinding: {
    [key: string]: ComputationModelDataBindingValue | undefined;
  };
  computationModelCreationDate: Date;
  computationModelLastUpdateDate: Date;
  computationModelStatus: ComputationModelStatus;
  computationModelVersion: string;
  actionDefinitions: ActionDefinition[];
}
export type ResolveToResourceType = "ASSET" | (string & {});
export interface DescribeComputationModelExecutionSummaryRequest {
  computationModelId: string;
  resolveToResourceType?: ResolveToResourceType;
  resolveToResourceId?: string;
}
export type ComputationModelExecutionSummaryKey = string;
export type ComputationModelExecutionSummaryValue = string;
export type ComputationModelExecutionSummary = {
  [key: string]: string | undefined;
};
export interface DescribeComputationModelExecutionSummaryResponse {
  computationModelId: string;
  resolveTo?: ResolveTo;
  computationModelExecutionSummary: { [key: string]: string | undefined };
}
export interface DescribeDashboardRequest {
  dashboardId: string;
}
export interface DescribeDashboardResponse {
  dashboardId: string;
  dashboardArn: string;
  dashboardName: string;
  projectId: string;
  dashboardDescription?: string;
  dashboardDefinition: string;
  dashboardCreationDate: Date;
  dashboardLastUpdateDate: Date;
}
export interface DescribeDatasetRequest {
  datasetId: string;
  workspaceName?: string;
  datasetVersion?: string;
}
export type DatasetEnrichmentStatus =
  | "FULLY_ENRICHED"
  | "PARTIALLY_ENRICHED"
  | "NOT_ENRICHED"
  | (string & {});
export interface DatasetEnrichmentEntry {
  status: DatasetEnrichmentStatus;
  lastEnrichedAt?: Date;
}
export interface DatasetEnrichment {
  video?: DatasetEnrichmentEntry;
}
export interface DescribeDatasetResponse {
  datasetId: string;
  datasetArn: string;
  datasetName: string;
  datasetDescription: string;
  datasetType?: DatasetTypeEnum;
  datasetConfig?: DatasetConfig;
  workspaceName?: string;
  metadata?: { [key: string]: string | undefined };
  datasetSource: DatasetSource;
  datasetStatus: DatasetStatus;
  datasetCreationDate: Date;
  datasetLastUpdateDate: Date;
  datasetVersion?: string;
  enrichmentStatus?: DatasetEnrichment;
}
export interface DescribeDatasetExportJobRequest {
  workspaceName: string;
  jobId: string;
}
export type DatasetExportJobStatus =
  | "SUBMITTED"
  | "RUNNING"
  | "COMPLETED"
  | "COMPLETED_WITH_ERRORS"
  | "FAILED"
  | (string & {});
export interface DescribeDatasetExportJobResponse {
  jobId: string;
  workspaceName: string;
  status: DatasetExportJobStatus;
  startedAt: Date;
  completedAt?: Date;
  destinationS3Uri: string;
  errorReportLocation: ExportErrorReportLocation;
  input: ProcessingInput;
}
export interface DescribeDefaultEncryptionConfigurationRequest {}
export type ConfigurationState =
  | "ACTIVE"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_FAILED"
  | (string & {});
export interface ConfigurationErrorDetails {
  code: ErrorCode;
  message: string;
}
export interface ConfigurationStatus {
  state: ConfigurationState;
  error?: ConfigurationErrorDetails;
}
export interface DescribeDefaultEncryptionConfigurationResponse {
  encryptionType: EncryptionType;
  kmsKeyArn?: string;
  configurationStatus: ConfigurationStatus;
}
export interface DescribeEnrichmentJobRequest {
  workspaceName: string;
  jobId: string;
}
export type JobType = "EVENT_DETECTION" | (string & {});
export interface DescribeEnrichmentJobResponse {
  jobId: string;
  status: EnrichmentJobStatus;
  workspaceName: string;
  jobType: JobType;
  jobConfiguration: EnrichmentJobConfiguration;
  createdAt: Date;
  updatedAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  failureMessage?: string;
}
export interface DescribeExecutionRequest {
  executionId: string;
}
export type ExecutionState = "RUNNING" | "COMPLETED" | "FAILED" | (string & {});
export interface ExecutionStatus {
  state: ExecutionState;
}
export type ExecutionResultKey = string;
export type ExecutionResultValue = string;
export type ExecutionResult = { [key: string]: string | undefined };
export type ExecutionDetailsKey = string;
export type ExecutionDetailsValue = string;
export type ExecutionDetails = { [key: string]: string | undefined };
export interface DescribeExecutionResponse {
  executionId: string;
  actionType?: string;
  targetResource: TargetResource;
  targetResourceVersion: string;
  resolveTo?: ResolveTo;
  executionStartTime: Date;
  executionEndTime?: Date;
  executionStatus: ExecutionStatus;
  executionResult?: { [key: string]: string | undefined };
  executionDetails?: { [key: string]: string | undefined };
  executionEntityVersion?: string;
}
export interface DescribeGatewayRequest {
  gatewayId: string;
}
export type CapabilityNamespace = string;
export type CapabilitySyncStatus =
  | "IN_SYNC"
  | "OUT_OF_SYNC"
  | "SYNC_FAILED"
  | "UNKNOWN"
  | "NOT_APPLICABLE"
  | (string & {});
export interface GatewayCapabilitySummary {
  capabilityNamespace: string;
  capabilitySyncStatus: CapabilitySyncStatus;
}
export type GatewayCapabilitySummaries = GatewayCapabilitySummary[];
export interface DescribeGatewayResponse {
  gatewayId: string;
  gatewayName: string;
  gatewayArn: string;
  gatewayPlatform?: GatewayPlatform;
  gatewayVersion?: string;
  gatewayCapabilitySummaries: GatewayCapabilitySummary[];
  creationDate: Date;
  lastUpdateDate: Date;
}
export interface DescribeGatewayCapabilityConfigurationRequest {
  gatewayId: string;
  capabilityNamespace: string;
}
export type CapabilityConfiguration = string;
export interface DescribeGatewayCapabilityConfigurationResponse {
  gatewayId: string;
  capabilityNamespace: string;
  capabilityConfiguration: string;
  capabilitySyncStatus: CapabilitySyncStatus;
}
export interface DescribeLoggingOptionsRequest {
  workspaceName?: string;
}
export type LoggingLevel = "ERROR" | "INFO" | "OFF" | (string & {});
export interface LoggingOptions {
  level: LoggingLevel;
}
export interface DescribeLoggingOptionsResponse {
  loggingOptions: LoggingOptions;
}
export interface DescribePipelineRequest {
  workspaceName: string;
  pipelineName: string;
  pipelineVersion?: string;
}
export interface DescribePipelineResponse {
  pipelineName: string;
  workspaceName: string;
  description?: string;
  pipelineArn: string;
  version: string;
  environmentVariables?: { [key: string]: string | undefined };
  computations: ComputeNode[];
  status: ResourceStatus;
  createdAt: Date;
  updatedAt: Date;
}
export type PaginationToken = string;
export type DescribePipelineExecutionRequestMaxResultsInteger = number;
export interface DescribePipelineExecutionRequest {
  workspaceName: string;
  pipelineName: string;
  pipelineExecutionId: string;
  nextToken?: string;
  maxResults?: number;
}
export type PipelineErrorCode =
  | "VALIDATION_ERROR"
  | "INTERNAL_FAILURE"
  | "EXECUTION_ERROR"
  | "TIMED_OUT"
  | (string & {});
export type DetailedPipelineErrorCode =
  | "VALIDATION_ERROR"
  | "INTERNAL_FAILURE"
  | "EXECUTION_ERROR"
  | "TIMED_OUT"
  | (string & {});
export interface DetailedPipelineError {
  code: DetailedPipelineErrorCode;
  message: string;
}
export type DetailedErrorList = DetailedPipelineError[];
export interface PipelineExecutionStateDetails {
  code?: PipelineErrorCode;
  message: string;
  details?: DetailedPipelineError[];
}
export interface PipelineExecutionStatus {
  state: PipelineExecutionState;
  stateDetails?: PipelineExecutionStateDetails;
}
export type ComputeNodeEnvironmentVariablesMap = {
  [key: string]: { [key: string]: string | undefined } | undefined;
};
export interface ExecutionEnvironmentVariables {
  global?: { [key: string]: string | undefined };
  computeNodes?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
}
export type ExecutionPriority = number;
export type ComputeNodeExecutionState =
  | "NOT_STARTED"
  | "QUEUED"
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export type ComputeNodeErrorCode =
  | "VALIDATION_ERROR"
  | "INTERNAL_FAILURE"
  | "EXECUTION_ERROR"
  | "TIMED_OUT"
  | (string & {});
export interface ComputeNodeExecutionStateDetails {
  code: ComputeNodeErrorCode;
  message: string;
  details?: DetailedPipelineError[];
}
export interface ComputeNodeExecutionStatus {
  state: ComputeNodeExecutionState;
  stateDetails?: ComputeNodeExecutionStateDetails;
}
export type ExecutionEnvironmentVariablesMapKeyString = string;
export type ExecutionEnvironmentVariablesMapValueString = string;
export type ExecutionEnvironmentVariablesMap = {
  [key: string]: string | undefined;
};
export interface ComputeNodeExecutionDetails {
  computeNodeName: string;
  taskName: string;
  taskArn: string;
  taskVersion: string;
  dependsOn: string[];
  status: ComputeNodeExecutionStatus;
  startTime?: Date;
  endTime?: Date;
  executionEnvironmentVariables?: { [key: string]: string | undefined };
}
export type ComputeNodeExecutionDetailsList = ComputeNodeExecutionDetails[];
export interface DescribePipelineExecutionResponse {
  pipelineExecutionId: string;
  pipelineName: string;
  workspaceName: string;
  pipelineVersion: string;
  status: PipelineExecutionStatus;
  startTime?: Date;
  endTime?: Date;
  requestEnvironmentVariables: ExecutionEnvironmentVariables;
  executionPriority?: number;
  computeNodeExecutionDetails: ComputeNodeExecutionDetails[];
  nextToken?: string;
}
export interface DescribePortalRequest {
  portalId: string;
}
export type PortalClientId = string;
export interface ImageLocation {
  id: string;
  url: string;
}
export interface DescribePortalResponse {
  portalId: string;
  portalArn: string;
  portalName: string;
  portalDescription?: string;
  portalClientId: string;
  portalStartUrl: string;
  portalContactEmail: string | redacted.Redacted<string>;
  portalStatus: PortalStatus;
  portalCreationDate: Date;
  portalLastUpdateDate: Date;
  portalLogoImageLocation?: ImageLocation;
  roleArn?: string;
  portalAuthMode?: AuthMode;
  notificationSenderEmail?: string | redacted.Redacted<string>;
  alarms?: Alarms;
  portalType?: PortalType;
  portalTypeConfiguration?: { [key: string]: PortalTypeEntry | undefined };
}
export interface DescribeProjectRequest {
  projectId: string;
}
export interface DescribeProjectResponse {
  projectId: string;
  projectArn: string;
  projectName: string;
  portalId: string;
  projectDescription?: string;
  projectCreationDate: Date;
  projectLastUpdateDate: Date;
}
export interface DescribeQueryRequest {
  workspaceName: string;
  queryId: string;
}
export interface QueryStatistics {
  rowCount: number;
  bytesScanned: number;
  executionTimeInMillis: number;
}
export type QueryErrorMessage = string;
export interface DescribeQueryResponse {
  queryId: string;
  status: QueryStatus;
  submittedAt: Date;
  completedAt?: Date;
  statistics?: QueryStatistics;
  errorMessage?: string;
}
export type SearchId = string;
export interface DescribeSearchRequest {
  workspaceName: string;
  searchId: string;
}
export type SearchStatus =
  | "QUEUED"
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export type SearchQueryStatement = string | redacted.Redacted<string>;
export type SearchType = "DEEP" | "QUICK" | (string & {});
export type GroupId = string;
export interface DescribeSearchResponse {
  searchId: string;
  workspaceName: string;
  status: SearchStatus;
  queryStatement: string | redacted.Redacted<string>;
  searchType: SearchType;
  statusReason?: string;
  startedAt?: Date;
  groupId?: string;
}
export interface DescribeStorageConfigurationRequest {}
export type StorageType =
  | "SITEWISE_DEFAULT_STORAGE"
  | "MULTI_LAYER_STORAGE"
  | (string & {});
export interface CustomerManagedS3Storage {
  s3ResourceArn: string;
  roleArn: string;
}
export interface MultiLayerStorage {
  customerManagedS3Storage: CustomerManagedS3Storage;
}
export type DisassociatedDataStorageState =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export type NumberOfDays = number;
export type Unlimited = boolean;
export interface RetentionPeriod {
  numberOfDays?: number;
  unlimited?: boolean;
}
export type WarmTierState = "ENABLED" | "DISABLED" | (string & {});
export interface WarmTierRetentionPeriod {
  numberOfDays?: number;
  unlimited?: boolean;
}
export type DisallowIngestNullNaN = boolean;
export interface DescribeStorageConfigurationResponse {
  storageType: StorageType;
  multiLayerStorage?: MultiLayerStorage;
  disassociatedDataStorage?: DisassociatedDataStorageState;
  retentionPeriod?: RetentionPeriod;
  configurationStatus: ConfigurationStatus;
  lastUpdateDate?: Date;
  warmTier?: WarmTierState;
  warmTierRetentionPeriod?: WarmTierRetentionPeriod;
  disallowIngestNullNaN?: boolean;
}
export interface DescribeTaskRequest {
  workspaceName: string;
  taskName: string;
  taskVersion?: string;
}
export interface DescribeTaskResponse {
  workspaceName: string;
  taskName: string;
  description?: string;
  taskArn: string;
  version: string;
  taskConfiguration: TaskConfiguration;
  status: ResourceStatus;
  createdAt: Date;
  updatedAt: Date;
}
export interface DescribeTimeSeriesRequest {
  alias?: string;
  assetId?: string;
  propertyId?: string;
  workspaceName?: string;
}
export interface DescribeTimeSeriesResponse {
  assetId?: string;
  propertyId?: string;
  alias?: string;
  timeSeriesId: string;
  dataType: PropertyDataType;
  dataTypeSpec?: string;
  timeSeriesCreationDate: Date;
  timeSeriesLastUpdateDate: Date;
  timeSeriesArn: string;
  workspaceName?: string;
}
export interface DescribeWorkspaceRequest {
  workspaceName: string;
}
export interface WorkspaceEncryptionConfigurationInfo {
  encryptionType: EncryptionType;
  kmsKeyArn?: string;
}
export interface DescribeWorkspaceResponse {
  workspaceArn: string;
  workspaceName: string;
  workspaceDescription?: string;
  workspaceStatus: WorkspaceStatus;
  encryptionConfiguration?: WorkspaceEncryptionConfigurationInfo;
  createdAt: Date;
  updatedAt: Date;
}
export interface DisassociateAssetsRequest {
  assetId: string;
  hierarchyId: string;
  childAssetId: string;
  clientToken?: string;
}
export interface DisassociateAssetsResponse {}
export interface DisassociateTimeSeriesFromAssetPropertyRequest {
  alias: string;
  assetId: string;
  propertyId: string;
  clientToken?: string;
}
export interface DisassociateTimeSeriesFromAssetPropertyResponse {}
export interface ExecuteActionRequest {
  targetResource: TargetResource;
  actionDefinitionId: string;
  actionPayload: ActionPayload;
  clientToken?: string;
  resolveTo?: ResolveTo;
}
export interface ExecuteActionResponse {
  actionId: string;
}
export type QueryStatement = string | redacted.Redacted<string>;
export type ExecuteQueryNextToken = string;
export type ExecuteQueryMaxResults = number;
export interface ExecuteQueryRequest {
  queryStatement: string | redacted.Redacted<string>;
  nextToken?: string;
  maxResults?: number;
  clientToken?: string;
}
export type ScalarType =
  | "BOOLEAN"
  | "INT"
  | "DOUBLE"
  | "TIMESTAMP"
  | "STRING"
  | (string & {});
export interface ColumnType {
  scalarType?: ScalarType;
}
export interface ColumnInfo {
  name?: string;
  type?: ColumnType;
}
export type ColumnsList = ColumnInfo[];
export type ScalarValue = string;
export interface Datum {
  scalarValue?: string;
  arrayValue?: Datum[];
  rowValue?: Row;
  nullValue?: boolean;
}
export type DatumList = Datum[];
export interface Row {
  data: Datum[];
}
export type Rows = Row[];
export interface ExecuteQueryResponse {
  columns?: ColumnInfo[];
  rows?: Row[];
  nextToken?: string;
}
export type GetAssetPropertyValueAggregatesMaxResults = number;
export interface GetAssetPropertyAggregatesRequest {
  assetId?: string;
  propertyId?: string;
  propertyAlias?: string;
  aggregateTypes: AggregateType[];
  resolution: string;
  qualities?: Quality[];
  startDate: Date;
  endDate: Date;
  timeOrdering?: TimeOrdering;
  nextToken?: string;
  maxResults?: number;
}
export interface GetAssetPropertyAggregatesResponse {
  aggregatedValues: AggregatedValue[];
  nextToken?: string;
}
export interface GetAssetPropertyValueRequest {
  assetId?: string;
  propertyId?: string;
  propertyAlias?: string;
}
export interface GetAssetPropertyValueResponse {
  propertyValue?: AssetPropertyValue;
}
export type GetAssetPropertyValueHistoryMaxResults = number;
export interface GetAssetPropertyValueHistoryRequest {
  assetId?: string;
  propertyId?: string;
  propertyAlias?: string;
  startDate?: Date;
  endDate?: Date;
  qualities?: Quality[];
  timeOrdering?: TimeOrdering;
  nextToken?: string;
  maxResults?: number;
}
export interface GetAssetPropertyValueHistoryResponse {
  assetPropertyValueHistory: AssetPropertyValue[];
  nextToken?: string;
}
export type GetCaptureDataNextToken = string;
export interface GetCaptureDataRequest {
  workspaceName: string;
  startTime: TimeInNanos;
  endTime: TimeInNanos;
  timeSeriesId?: string;
  propertyAlias?: string;
  formatSettings?: FormatSettings;
  nextToken?: string;
}
export type CaptureBlob = Uint8Array;
export type VideoDataType = "VIDEO-MP4" | (string & {});
export interface GetCaptureDataResponse {
  data: Uint8Array;
  startTime: TimeInNanos;
  endTime: TimeInNanos;
  dataType: VideoDataType;
  nextToken?: string;
}
export type IntervalInSeconds = number;
export type MaxInterpolatedResults = number;
export type InterpolationType = string;
export type IntervalWindowInSeconds = number;
export interface GetInterpolatedAssetPropertyValuesRequest {
  assetId?: string;
  propertyId?: string;
  propertyAlias?: string;
  startTimeInSeconds: number;
  startTimeOffsetInNanos?: number;
  endTimeInSeconds: number;
  endTimeOffsetInNanos?: number;
  quality: Quality;
  intervalInSeconds: number;
  nextToken?: string;
  maxResults?: number;
  type: string;
  intervalWindowInSeconds?: number;
}
export interface InterpolatedAssetPropertyValue {
  timestamp: TimeInNanos;
  value: Variant;
}
export type InterpolatedAssetPropertyValues = InterpolatedAssetPropertyValue[];
export interface GetInterpolatedAssetPropertyValuesResponse {
  interpolatedAssetPropertyValues: InterpolatedAssetPropertyValue[];
  nextToken?: string;
}
export type QueryMaxResults = number;
export type QueryNextToken = string;
export interface GetQueryResultsRequest {
  workspaceName: string;
  queryId: string;
  maxResults?: number;
  nextToken?: string;
}
export type ColumnLabel = string;
export type ColumnDataType = string;
export interface ColumnInformation {
  name: string;
  type: string;
}
export type ColumnInformationList = ColumnInformation[];
export type ColumnValue = string;
export type Result = string[];
export type RowList = string[][];
export interface GetQueryResultsResponse {
  columnInfo?: ColumnInformation[];
  rows?: string[][];
  nextToken?: string;
}
export type GetSearchResultsRequestMaxResultsInteger = number;
export interface GetSearchResultsRequest {
  searchId: string;
  workspaceName: string;
  maxResults?: number;
  nextToken?: string;
}
export interface SearchResult {
  searchId: string;
  workspaceName: string;
  datasetId: string;
  timeSeriesId: string;
  startTimestamp: TimeInNanos;
  endTimestamp: TimeInNanos;
  topTimestamp: TimeInNanos;
  score: number;
}
export type SearchResultList = SearchResult[];
export interface GetSearchResultsResponse {
  searchResults: SearchResult[];
  nextToken?: string;
}
export type ConversationId = string;
export type MessageInput = string | redacted.Redacted<string>;
export interface InvokeAssistantRequest {
  conversationId?: string;
  message: string | redacted.Redacted<string>;
  enableTrace?: boolean;
}
export interface Trace {
  text?: string;
}
export interface Location {
  uri?: string;
}
export interface Source {
  arn?: string;
  location?: Location;
}
export interface DataSetReference {
  datasetArn?: string;
  source?: Source;
}
export interface Reference {
  dataset?: DataSetReference;
}
export interface Content {
  text?: string;
}
export interface Citation {
  reference?: Reference;
  content?: Content;
}
export type Citations = Citation[];
export interface InvocationOutput {
  message?: string;
  citations?: Citation[];
}
export type ResourceId = string;
export type ResourceArn = string;
export type ResponseStream =
  | {
      trace: Trace;
      output?: never;
      accessDeniedException?: never;
      conflictingOperationException?: never;
      internalFailureException?: never;
      invalidRequestException?: never;
      limitExceededException?: never;
      resourceNotFoundException?: never;
      throttlingException?: never;
    }
  | {
      trace?: never;
      output: InvocationOutput;
      accessDeniedException?: never;
      conflictingOperationException?: never;
      internalFailureException?: never;
      invalidRequestException?: never;
      limitExceededException?: never;
      resourceNotFoundException?: never;
      throttlingException?: never;
    }
  | {
      trace?: never;
      output?: never;
      accessDeniedException: AccessDeniedException;
      conflictingOperationException?: never;
      internalFailureException?: never;
      invalidRequestException?: never;
      limitExceededException?: never;
      resourceNotFoundException?: never;
      throttlingException?: never;
    }
  | {
      trace?: never;
      output?: never;
      accessDeniedException?: never;
      conflictingOperationException: ConflictingOperationException;
      internalFailureException?: never;
      invalidRequestException?: never;
      limitExceededException?: never;
      resourceNotFoundException?: never;
      throttlingException?: never;
    }
  | {
      trace?: never;
      output?: never;
      accessDeniedException?: never;
      conflictingOperationException?: never;
      internalFailureException: InternalFailureException;
      invalidRequestException?: never;
      limitExceededException?: never;
      resourceNotFoundException?: never;
      throttlingException?: never;
    }
  | {
      trace?: never;
      output?: never;
      accessDeniedException?: never;
      conflictingOperationException?: never;
      internalFailureException?: never;
      invalidRequestException: InvalidRequestException;
      limitExceededException?: never;
      resourceNotFoundException?: never;
      throttlingException?: never;
    }
  | {
      trace?: never;
      output?: never;
      accessDeniedException?: never;
      conflictingOperationException?: never;
      internalFailureException?: never;
      invalidRequestException?: never;
      limitExceededException: LimitExceededException;
      resourceNotFoundException?: never;
      throttlingException?: never;
    }
  | {
      trace?: never;
      output?: never;
      accessDeniedException?: never;
      conflictingOperationException?: never;
      internalFailureException?: never;
      invalidRequestException?: never;
      limitExceededException?: never;
      resourceNotFoundException: ResourceNotFoundException;
      throttlingException?: never;
    }
  | {
      trace?: never;
      output?: never;
      accessDeniedException?: never;
      conflictingOperationException?: never;
      internalFailureException?: never;
      invalidRequestException?: never;
      limitExceededException?: never;
      resourceNotFoundException?: never;
      throttlingException: ThrottlingException;
    };
export interface InvokeAssistantResponse {
  body: stream.Stream<ResponseStream, Error, never>;
  conversationId: string;
}
export type IdentityType = "USER" | "GROUP" | "IAM" | (string & {});
export type ResourceType = "PORTAL" | "PROJECT" | (string & {});
export type MaxResults = number;
export interface ListAccessPoliciesRequest {
  identityType?: IdentityType;
  identityId?: string;
  resourceType?: ResourceType;
  resourceId?: string;
  iamArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface AccessPolicySummary {
  id: string;
  identity: Identity;
  resource: Resource;
  permission: Permission;
  creationDate?: Date;
  lastUpdateDate?: Date;
}
export type AccessPolicySummaries = AccessPolicySummary[];
export interface ListAccessPoliciesResponse {
  accessPolicySummaries: AccessPolicySummary[];
  nextToken?: string;
}
export type TargetResourceType = "ASSET" | "COMPUTATION_MODEL" | (string & {});
export interface ListActionsRequest {
  targetResourceType: TargetResourceType;
  targetResourceId: string;
  nextToken?: string;
  maxResults?: number;
  resolveToResourceType?: ResolveToResourceType;
  resolveToResourceId?: string;
}
export interface ActionSummary {
  actionId?: string;
  actionDefinitionId?: string;
  targetResource?: TargetResource;
  resolveTo?: ResolveTo;
}
export type ActionSummaries = ActionSummary[];
export interface ListActionsResponse {
  actionSummaries: ActionSummary[];
  nextToken: string;
}
export interface ListApplicationsRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface ApplicationSummary {
  arn: string;
  id: string;
  name: string;
  status: ApplicationStatus;
  createdAt: Date;
  workspaceName: string;
}
export type ApplicationList = ApplicationSummary[];
export interface ListApplicationsResponse {
  nextToken?: string;
  applications: ApplicationSummary[];
}
export interface ListAssetModelCompositeModelsRequest {
  assetModelId: string;
  nextToken?: string;
  maxResults?: number;
  assetModelVersion?: string;
}
export interface ListAssetModelCompositeModelsResponse {
  assetModelCompositeModelSummaries: AssetModelCompositeModelSummary[];
  nextToken?: string;
}
export type ListAssetModelPropertiesFilter = "ALL" | "BASE" | (string & {});
export interface ListAssetModelPropertiesRequest {
  assetModelId: string;
  nextToken?: string;
  maxResults?: number;
  filter?: ListAssetModelPropertiesFilter;
  assetModelVersion?: string;
}
export interface InterfaceSummary {
  interfaceAssetModelId: string;
  interfaceAssetModelPropertyId: string;
}
export type InterfaceSummaries = InterfaceSummary[];
export interface AssetModelPropertySummary {
  id?: string;
  externalId?: string;
  name: string;
  dataType: PropertyDataType;
  dataTypeSpec?: string;
  unit?: string;
  type: PropertyType;
  assetModelCompositeModelId?: string;
  path?: AssetModelPropertyPathSegment[];
  interfaceSummaries?: InterfaceSummary[];
}
export type AssetModelPropertySummaries = AssetModelPropertySummary[];
export interface ListAssetModelPropertiesResponse {
  assetModelPropertySummaries: AssetModelPropertySummary[];
  nextToken?: string;
}
export type ListAssetModelsTypeFilter = AssetModelType[];
export interface ListAssetModelsRequest {
  assetModelTypes?: AssetModelType[];
  nextToken?: string;
  maxResults?: number;
  assetModelVersion?: string;
}
export interface AssetModelSummary {
  id: string;
  externalId?: string;
  arn: string;
  name: string;
  assetModelType?: AssetModelType;
  description?: string;
  creationDate: Date;
  lastUpdateDate: Date;
  status: AssetModelStatus;
  version?: string;
}
export type AssetModelSummaries = AssetModelSummary[];
export interface ListAssetModelsResponse {
  assetModelSummaries: AssetModelSummary[];
  nextToken?: string;
}
export type ListAssetPropertiesFilter = "ALL" | "BASE" | (string & {});
export interface ListAssetPropertiesRequest {
  assetId: string;
  nextToken?: string;
  maxResults?: number;
  filter?: ListAssetPropertiesFilter;
}
export interface AssetPropertySummary {
  id: string;
  externalId?: string;
  alias?: string;
  unit?: string;
  notification?: PropertyNotification;
  assetCompositeModelId?: string;
  path?: AssetPropertyPathSegment[];
}
export type AssetPropertySummaries = AssetPropertySummary[];
export interface ListAssetPropertiesResponse {
  assetPropertySummaries: AssetPropertySummary[];
  nextToken?: string;
}
export type TraversalType = "PATH_TO_ROOT" | (string & {});
export interface ListAssetRelationshipsRequest {
  assetId: string;
  traversalType: TraversalType;
  nextToken?: string;
  maxResults?: number;
}
export interface AssetHierarchyInfo {
  parentAssetId?: string;
  childAssetId?: string;
}
export type AssetRelationshipType = "HIERARCHY" | (string & {});
export interface AssetRelationshipSummary {
  hierarchyInfo?: AssetHierarchyInfo;
  relationshipType: AssetRelationshipType;
}
export type AssetRelationshipSummaries = AssetRelationshipSummary[];
export interface ListAssetRelationshipsResponse {
  assetRelationshipSummaries: AssetRelationshipSummary[];
  nextToken?: string;
}
export type ListAssetsFilter = "ALL" | "TOP_LEVEL" | (string & {});
export interface ListAssetsRequest {
  nextToken?: string;
  maxResults?: number;
  assetModelId?: string;
  filter?: ListAssetsFilter;
}
export interface AssetSummary {
  id: string;
  externalId?: string;
  arn: string;
  name: string;
  assetModelId: string;
  creationDate: Date;
  lastUpdateDate: Date;
  status: AssetStatus;
  hierarchies: AssetHierarchy[];
  description?: string;
}
export type AssetSummaries = AssetSummary[];
export interface ListAssetsResponse {
  assetSummaries: AssetSummary[];
  nextToken?: string;
}
export type TraversalDirection = "PARENT" | "CHILD" | (string & {});
export interface ListAssociatedAssetsRequest {
  assetId: string;
  hierarchyId?: string;
  traversalDirection?: TraversalDirection;
  nextToken?: string;
  maxResults?: number;
}
export interface AssociatedAssetsSummary {
  id: string;
  externalId?: string;
  arn: string;
  name: string;
  assetModelId: string;
  creationDate: Date;
  lastUpdateDate: Date;
  status: AssetStatus;
  hierarchies: AssetHierarchy[];
  description?: string;
}
export type AssociatedAssetsSummaries = AssociatedAssetsSummary[];
export interface ListAssociatedAssetsResponse {
  assetSummaries: AssociatedAssetsSummary[];
  nextToken?: string;
}
export type ListBulkImportJobsFilter =
  | "ALL"
  | "PENDING"
  | "RUNNING"
  | "CANCELLED"
  | "FAILED"
  | "COMPLETED_WITH_FAILURES"
  | "COMPLETED"
  | (string & {});
export interface ListBulkImportJobsRequest {
  nextToken?: string;
  maxResults?: number;
  filter?: ListBulkImportJobsFilter;
  workspaceName?: string;
}
export interface JobSummary {
  id: string;
  name: string;
  status: JobStatus;
}
export type JobSummaries = JobSummary[];
export interface ListBulkImportJobsResponse {
  jobSummaries: JobSummary[];
  nextToken?: string;
}
export interface ListCompositionRelationshipsRequest {
  assetModelId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface CompositionRelationshipSummary {
  assetModelId: string;
  assetModelCompositeModelId: string;
  assetModelCompositeModelType: string;
}
export type CompositionRelationshipSummaries = CompositionRelationshipSummary[];
export interface ListCompositionRelationshipsResponse {
  compositionRelationshipSummaries: CompositionRelationshipSummary[];
  nextToken?: string;
}
export interface AssetBindingValueFilter {
  assetId: string;
}
export interface AssetModelBindingValueFilter {
  assetModelId: string;
}
export interface AssetPropertyBindingValueFilter {
  assetId: string;
  propertyId: string;
}
export interface AssetModelPropertyBindingValueFilter {
  assetModelId: string;
  propertyId: string;
}
export interface DataBindingValueFilter {
  asset?: AssetBindingValueFilter;
  assetModel?: AssetModelBindingValueFilter;
  assetProperty?: AssetPropertyBindingValueFilter;
  assetModelProperty?: AssetModelPropertyBindingValueFilter;
}
export interface ListComputationModelDataBindingUsagesRequest {
  dataBindingValueFilter: DataBindingValueFilter;
  nextToken?: string;
  maxResults?: number;
}
export type ComputationModelIdList = string[];
export interface DataBindingValue {
  assetModelProperty?: AssetModelPropertyBindingValue;
  assetProperty?: AssetPropertyBindingValue;
}
export interface MatchedDataBinding {
  value: DataBindingValue;
}
export interface ComputationModelDataBindingUsageSummary {
  computationModelIds: string[];
  matchedDataBinding: MatchedDataBinding;
}
export type ComputationModelDataBindingUsageSummaries =
  ComputationModelDataBindingUsageSummary[];
export interface ListComputationModelDataBindingUsagesResponse {
  dataBindingUsageSummaries: ComputationModelDataBindingUsageSummary[];
  nextToken?: string;
}
export interface ListComputationModelResolveToResourcesRequest {
  computationModelId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ComputationModelResolveToResourceSummary {
  resolveTo?: ResolveTo;
}
export type ComputationModelResolveToResourceSummaries =
  ComputationModelResolveToResourceSummary[];
export interface ListComputationModelResolveToResourcesResponse {
  computationModelResolveToResourceSummaries: ComputationModelResolveToResourceSummary[];
  nextToken?: string;
}
export type ComputationModelType = "ANOMALY_DETECTION" | (string & {});
export interface ListComputationModelsRequest {
  computationModelType?: ComputationModelType;
  nextToken?: string;
  maxResults?: number;
}
export interface ComputationModelSummary {
  id: string;
  arn: string;
  name: string;
  description?: string;
  type: ComputationModelType;
  creationDate: Date;
  lastUpdateDate: Date;
  status: ComputationModelStatus;
  version: string;
}
export type ComputationModelSummaries = ComputationModelSummary[];
export interface ListComputationModelsResponse {
  computationModelSummaries: ComputationModelSummary[];
  nextToken?: string;
}
export interface ListDashboardsRequest {
  projectId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface DashboardSummary {
  id: string;
  name: string;
  description?: string;
  creationDate?: Date;
  lastUpdateDate?: Date;
}
export type DashboardSummaries = DashboardSummary[];
export interface ListDashboardsResponse {
  dashboardSummaries: DashboardSummary[];
  nextToken?: string;
}
export interface ListDatasetDataSegmentRelationshipsRequest {
  datasetId: string;
  workspaceName: string;
  maxResults?: number;
  nextToken?: string;
}
export interface DataSegmentRelationshipSummary {
  targetDatasetId: string;
  sourceDatasetId: string;
  timeSeriesId: string;
  startTimestamp: TimeInNanos;
  endTimestamp: TimeInNanos;
}
export type DataSegmentRelationshipSummaries = DataSegmentRelationshipSummary[];
export interface ListDatasetDataSegmentRelationshipsResponse {
  dataSegmentRelationshipSummaries: DataSegmentRelationshipSummary[];
  nextToken?: string;
}
export interface ListDatasetDataSegmentsRequest {
  datasetId: string;
  workspaceName: string;
  datasetVersion?: string;
  maxResults?: number;
  nextToken?: string;
}
export type EnrichmentStatus = "ENRICHED" | "NOT_ENRICHED" | (string & {});
export interface DataSegmentEnrichment {
  status: EnrichmentStatus;
  lastEnrichedAt?: Date;
}
export interface DataSegmentSummary {
  sourceDatasetId: string;
  timeSeriesId: string;
  startTimestamp: TimeInNanos;
  endTimestamp: TimeInNanos;
  alias: string;
  dataType: PropertyDataType;
  enrichment?: DataSegmentEnrichment;
}
export type DataSegmentSummaries = DataSegmentSummary[];
export interface ListDatasetDataSegmentsResponse {
  dataSegments: DataSegmentSummary[];
  nextToken?: string;
}
export type DatasetExportJobFilter =
  | "ALL"
  | "SUBMITTED"
  | "RUNNING"
  | "COMPLETED"
  | "COMPLETED_WITH_ERRORS"
  | "FAILED"
  | (string & {});
export type ListExportJobsMaxResults = number;
export type ListExportJobsNextToken = string;
export interface ListDatasetExportJobsRequest {
  workspaceName: string;
  filter?: DatasetExportJobFilter;
  maxResults?: number;
  nextToken?: string;
}
export interface ExportJobSummary {
  jobId: string;
  status: DatasetExportJobStatus;
  startedAt: Date;
  completedAt?: Date;
  destinationS3Uri: string;
}
export type ExportJobSummaryList = ExportJobSummary[];
export interface ListDatasetExportJobsResponse {
  jobs: ExportJobSummary[];
  nextToken?: string;
}
export interface ListDatasetsRequest {
  sourceType: DatasetSourceType;
  workspaceName?: string;
  datasetType?: DatasetTypeEnum;
  nextToken?: string;
  maxResults?: number;
}
export interface DatasetSummary {
  id: string;
  arn: string;
  name: string;
  description: string;
  sourceType?: DatasetSourceType;
  datasetType?: DatasetTypeEnum;
  creationDate: Date;
  lastUpdateDate: Date;
  status: DatasetStatus;
  enrichmentStatus?: DatasetEnrichment;
}
export type DatasetSummaries = DatasetSummary[];
export interface ListDatasetsResponse {
  datasetSummaries: DatasetSummary[];
  nextToken?: string;
  workspaceName?: string;
}
export interface ListEnrichmentJobsRequest {
  workspaceName: string;
  datasetId?: string;
  propertyAlias?: string;
  timeSeriesId?: string;
  status?: EnrichmentJobStatus;
  jobType?: JobType;
  startDate?: Date;
  endDate?: Date;
  maxResults?: number;
  nextToken?: string;
}
export interface EnrichmentJobSummary {
  jobId: string;
  status: EnrichmentJobStatus;
  workspaceName: string;
  jobType: JobType;
  datasetId: string;
  propertyAlias?: string;
  timeSeriesId?: string;
  createdAt: Date;
  updatedAt?: Date;
}
export type EnrichmentJobSummaries = EnrichmentJobSummary[];
export interface ListEnrichmentJobsResponse {
  jobs: EnrichmentJobSummary[];
  nextToken?: string;
}
export interface ListExecutionsRequest {
  targetResourceType: TargetResourceType;
  targetResourceId: string;
  resolveToResourceType?: ResolveToResourceType;
  resolveToResourceId?: string;
  nextToken?: string;
  maxResults?: number;
  actionType?: string;
}
export interface ExecutionSummary {
  executionId: string;
  actionType?: string;
  targetResource: TargetResource;
  targetResourceVersion: string;
  resolveTo?: ResolveTo;
  executionStartTime: Date;
  executionEndTime?: Date;
  executionStatus: ExecutionStatus;
  executionEntityVersion?: string;
}
export type ExecutionSummaries = ExecutionSummary[];
export interface ListExecutionsResponse {
  executionSummaries: ExecutionSummary[];
  nextToken?: string;
}
export interface ListGatewaysRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface GatewaySummary {
  gatewayId: string;
  gatewayName: string;
  gatewayPlatform?: GatewayPlatform;
  gatewayVersion?: string;
  gatewayCapabilitySummaries?: GatewayCapabilitySummary[];
  creationDate: Date;
  lastUpdateDate: Date;
}
export type GatewaySummaries = GatewaySummary[];
export interface ListGatewaysResponse {
  gatewaySummaries: GatewaySummary[];
  nextToken?: string;
}
export interface ListInterfaceRelationshipsRequest {
  interfaceAssetModelId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface InterfaceRelationshipSummary {
  id: string;
}
export type InterfaceRelationshipSummaries = InterfaceRelationshipSummary[];
export interface ListInterfaceRelationshipsResponse {
  interfaceRelationshipSummaries: InterfaceRelationshipSummary[];
  nextToken?: string;
}
export type ListPipelineExecutionsRequestMaxResultsInteger = number;
export interface ListPipelineExecutionsRequest {
  workspaceName: string;
  pipelineName: string;
  nextToken?: string;
  maxResults?: number;
  state?: PipelineExecutionState;
  startTimeAfter?: Date;
  startTimeBefore?: Date;
  endTimeAfter?: Date;
  endTimeBefore?: Date;
}
export interface PipelineExecutionSummary {
  pipelineExecutionId: string;
  pipelineVersion: string;
  status: PipelineExecutionStatus;
  executionPriority?: number;
  startTime?: Date;
  endTime?: Date;
}
export type PipelineExecutionSummaryList = PipelineExecutionSummary[];
export interface ListPipelineExecutionsResponse {
  pipelineExecutionSummaries: PipelineExecutionSummary[];
  nextToken?: string;
}
export type ListPipelinesRequestMaxResultsInteger = number;
export interface ListPipelinesRequest {
  workspaceName: string;
  nextToken?: string;
  maxResults?: number;
}
export interface PipelineSummary {
  pipelineName: string;
  description?: string;
  pipelineArn: string;
  version: string;
  status: ResourceStatus;
  createdAt: Date;
  updatedAt: Date;
}
export type PipelineSummaries = PipelineSummary[];
export interface ListPipelinesResponse {
  pipelineSummaries: PipelineSummary[];
  nextToken?: string;
}
export interface ListPortalsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface PortalSummary {
  id: string;
  name: string;
  description?: string;
  startUrl: string;
  creationDate?: Date;
  lastUpdateDate?: Date;
  roleArn?: string;
  status: PortalStatus;
  portalType?: PortalType;
}
export type PortalSummaries = PortalSummary[];
export interface ListPortalsResponse {
  portalSummaries?: PortalSummary[];
  nextToken?: string;
}
export interface ListProjectAssetsRequest {
  projectId: string;
  nextToken?: string;
  maxResults?: number;
}
export type AssetIDs = string[];
export interface ListProjectAssetsResponse {
  assetIds: string[];
  nextToken?: string;
}
export interface ListProjectsRequest {
  portalId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ProjectSummary {
  id: string;
  name: string;
  description?: string;
  creationDate?: Date;
  lastUpdateDate?: Date;
}
export type ProjectSummaries = ProjectSummary[];
export interface ListProjectsResponse {
  projectSummaries: ProjectSummary[];
  nextToken?: string;
}
export type QueryFilter = string;
export type QueryListNextToken = string;
export interface ListQueriesRequest {
  workspaceName: string;
  filter?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface QuerySummary {
  queryId: string;
  status: QueryStatus;
  submittedAt: Date;
  completedAt?: Date;
}
export type QuerySummaryList = QuerySummary[];
export interface ListQueriesResponse {
  queries: QuerySummary[];
  nextToken?: string;
}
export type ListSearchesRequestMaxResultsInteger = number;
export type SearchStatusFilterList = SearchStatus[];
export type GroupIdFilterList = string[];
export type SearchTypeFilterList = SearchType[];
export interface ListSearchesFilters {
  statusFilter?: SearchStatus[];
  startedAfter?: Date;
  startedBefore?: Date;
  groupIdFilter?: string[];
  searchTypeFilter?: SearchType[];
}
export interface ListSearchesRequest {
  workspaceName: string;
  maxResults?: number;
  nextToken?: string;
  listSearchesFilters?: ListSearchesFilters;
}
export interface SearchSummary {
  searchId: string;
  workspaceName: string;
  status: SearchStatus;
  queryStatement: string | redacted.Redacted<string>;
  searchType: SearchType;
  statusReason?: string;
  startedAt?: Date;
  groupId?: string;
}
export type SearchSummaries = SearchSummary[];
export interface ListSearchesResponse {
  searchSummaries: SearchSummary[];
  nextToken?: string;
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export type ListTasksRequestMaxResultsInteger = number;
export interface ListTasksRequest {
  workspaceName: string;
  nextToken?: string;
  maxResults?: number;
}
export interface TaskSummary {
  taskName: string;
  description?: string;
  taskArn: string;
  version: string;
  status: ResourceStatus;
  createdAt: Date;
  updatedAt: Date;
}
export type TaskSummaries = TaskSummary[];
export interface ListTasksResponse {
  taskSummaries: TaskSummary[];
  nextToken?: string;
}
export type ListTimeSeriesType = "ASSOCIATED" | "DISASSOCIATED" | (string & {});
export interface ListTimeSeriesRequest {
  nextToken?: string;
  maxResults?: number;
  assetId?: string;
  aliasPrefix?: string;
  timeSeriesType?: ListTimeSeriesType;
  workspaceName?: string;
}
export interface TimeSeriesSummary {
  assetId?: string;
  propertyId?: string;
  alias?: string;
  timeSeriesId: string;
  dataType: PropertyDataType;
  dataTypeSpec?: string;
  timeSeriesCreationDate: Date;
  timeSeriesLastUpdateDate: Date;
  timeSeriesArn: string;
}
export type TimeSeriesSummaries = TimeSeriesSummary[];
export interface ListTimeSeriesResponse {
  TimeSeriesSummaries: TimeSeriesSummary[];
  nextToken?: string;
  workspaceName?: string;
}
export interface ListWorkspacesRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface WorkspaceSummary {
  name: string;
  arn: string;
  status: WorkspaceStatus;
  createdAt: Date;
  updatedAt: Date;
}
export type WorkspaceSummaries = WorkspaceSummary[];
export interface ListWorkspacesResponse {
  workspaceSummaries: WorkspaceSummary[];
  nextToken?: string;
}
export type MatchByPropertyName = boolean;
export type CreateMissingProperty = boolean;
export interface PropertyMappingConfiguration {
  matchByPropertyName?: boolean;
  createMissingProperty?: boolean;
  overrides?: PropertyMapping[];
}
export interface PutAssetModelInterfaceRelationshipRequest {
  assetModelId: string;
  interfaceAssetModelId: string;
  propertyMappingConfiguration: PropertyMappingConfiguration;
  clientToken?: string;
}
export interface PutAssetModelInterfaceRelationshipResponse {
  assetModelId: string;
  interfaceAssetModelId: string;
  assetModelArn: string;
  assetModelStatus: AssetModelStatus;
}
export interface PutDefaultEncryptionConfigurationRequest {
  encryptionType: EncryptionType;
  kmsKeyId?: string;
}
export interface PutDefaultEncryptionConfigurationResponse {
  encryptionType: EncryptionType;
  kmsKeyArn?: string;
  configurationStatus: ConfigurationStatus;
}
export interface PutLoggingOptionsRequest {
  loggingOptions: LoggingOptions;
  workspaceName?: string;
}
export interface PutLoggingOptionsResponse {}
export interface PutStorageConfigurationRequest {
  storageType: StorageType;
  multiLayerStorage?: MultiLayerStorage;
  disassociatedDataStorage?: DisassociatedDataStorageState;
  retentionPeriod?: RetentionPeriod;
  warmTier?: WarmTierState;
  warmTierRetentionPeriod?: WarmTierRetentionPeriod;
  disallowIngestNullNaN?: boolean;
}
export interface PutStorageConfigurationResponse {
  storageType: StorageType;
  multiLayerStorage?: MultiLayerStorage;
  disassociatedDataStorage?: DisassociatedDataStorageState;
  retentionPeriod?: RetentionPeriod;
  configurationStatus: ConfigurationStatus;
  warmTier?: WarmTierState;
  warmTierRetentionPeriod?: WarmTierRetentionPeriod;
  disallowIngestNullNaN?: boolean;
}
export interface StartPipelineExecutionRequest {
  workspaceName: string;
  pipelineName: string;
  executionEnvironmentVariableOverrides?: ExecutionEnvironmentVariables;
  executionPriority?: number;
  clientToken?: string;
}
export interface StartPipelineExecutionResponse {
  pipelineExecutionId: string;
}
export type QueryString = string | redacted.Redacted<string>;
export interface StartQueryRequest {
  clientToken?: string;
  workspaceName: string;
  queryStatement: string | redacted.Redacted<string>;
}
export interface StartQueryResponse {
  queryId: string;
  status: QueryStatus;
}
export type TimeSeriesIdList = string[];
export type DataSetIdList = string[];
export interface TimeInterval {
  startTime: TimeInNanos;
  endTime: TimeInNanos;
}
export type TimeIntervalList = TimeInterval[];
export interface SearchFilters {
  timeSeriesIds?: string[];
  datasetIds?: string[];
  timeIntervals?: TimeInterval[];
}
export interface StartSearchRequest {
  workspaceName: string;
  queryStatement: string | redacted.Redacted<string>;
  clientToken?: string;
  searchType?: SearchType;
  searchFilters?: SearchFilters;
  groupId?: string;
}
export interface StartSearchResponse {
  searchId: string;
  workspaceName: string;
  status: SearchStatus;
  groupId?: string;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAccessPolicyRequest {
  accessPolicyId: string;
  accessPolicyIdentity: Identity;
  accessPolicyResource: Resource;
  accessPolicyPermission: Permission;
  clientToken?: string;
}
export interface UpdateAccessPolicyResponse {}
export interface UpdateAssetRequest {
  assetId: string;
  assetExternalId?: string;
  assetName: string;
  clientToken?: string;
  assetDescription?: string;
}
export interface UpdateAssetResponse {
  assetId?: string;
  assetStatus: AssetStatus;
}
export interface UpdateAssetModelRequest {
  assetModelId: string;
  assetModelExternalId?: string;
  assetModelName: string;
  assetModelDescription?: string;
  assetModelProperties?: AssetModelProperty[];
  assetModelHierarchies?: AssetModelHierarchy[];
  assetModelCompositeModels?: AssetModelCompositeModel[];
  clientToken?: string;
  ifMatch?: string;
  ifNoneMatch?: string;
  matchForVersionType?: AssetModelVersionType;
}
export interface UpdateAssetModelResponse {
  assetModelId?: string;
  assetModelStatus: AssetModelStatus;
}
export interface UpdateAssetModelCompositeModelRequest {
  assetModelId: string;
  assetModelCompositeModelId: string;
  assetModelCompositeModelExternalId?: string;
  assetModelCompositeModelDescription?: string;
  assetModelCompositeModelName: string;
  clientToken?: string;
  assetModelCompositeModelProperties?: AssetModelProperty[];
  ifMatch?: string;
  ifNoneMatch?: string;
  matchForVersionType?: AssetModelVersionType;
}
export interface UpdateAssetModelCompositeModelResponse {
  assetModelCompositeModelPath: AssetModelCompositeModelPathSegment[];
  assetModelStatus: AssetModelStatus;
  assetModelId?: string;
}
export interface UpdateAssetPropertyRequest {
  assetId: string;
  propertyId: string;
  propertyAlias?: string;
  propertyNotificationState?: PropertyNotificationState;
  clientToken?: string;
  propertyUnit?: string;
}
export interface UpdateAssetPropertyResponse {}
export interface UpdateComputationModelRequest {
  computationModelId: string;
  computationModelName: string;
  computationModelDescription?: string;
  computationModelConfiguration: ComputationModelConfiguration;
  computationModelDataBinding: {
    [key: string]: ComputationModelDataBindingValue | undefined;
  };
  clientToken?: string;
}
export interface UpdateComputationModelResponse {
  computationModelStatus: ComputationModelStatus;
}
export interface UpdateDashboardRequest {
  dashboardId: string;
  dashboardName: string;
  dashboardDescription?: string;
  dashboardDefinition: string;
  clientToken?: string;
}
export interface UpdateDashboardResponse {}
export interface UpdateDatasetRequest {
  datasetId: string;
  workspaceName?: string;
  datasetName: string;
  datasetDescription?: string;
  datasetConfig?: DatasetConfig;
  metadata?: { [key: string]: string | undefined };
  datasetSource: DatasetSource;
  clientToken?: string;
}
export interface UpdateDatasetResponse {
  datasetId?: string;
  datasetArn?: string;
  datasetStatus?: DatasetStatus;
}
export interface UpdateGatewayRequest {
  gatewayId: string;
  gatewayName: string;
}
export interface UpdateGatewayResponse {}
export interface UpdateGatewayCapabilityConfigurationRequest {
  gatewayId: string;
  capabilityNamespace: string;
  capabilityConfiguration: string;
}
export interface UpdateGatewayCapabilityConfigurationResponse {
  capabilityNamespace: string;
  capabilitySyncStatus: CapabilitySyncStatus;
}
export interface UpdatePipelineRequest {
  workspaceName: string;
  pipelineName: string;
  description?: string;
  environmentVariables?: { [key: string]: string | undefined };
  computations?: ComputeNode[];
}
export interface UpdatePipelineResponse {
  version: string;
  status: ResourceStatus;
}
export interface Image {
  id?: string;
  file?: ImageFile;
}
export interface UpdatePortalRequest {
  portalId: string;
  portalName: string;
  portalDescription?: string;
  portalContactEmail: string | redacted.Redacted<string>;
  portalLogoImage?: Image;
  roleArn: string;
  clientToken?: string;
  notificationSenderEmail?: string | redacted.Redacted<string>;
  alarms?: Alarms;
  portalType?: PortalType;
  portalTypeConfiguration?: { [key: string]: PortalTypeEntry | undefined };
}
export interface UpdatePortalResponse {
  portalStatus: PortalStatus;
}
export interface UpdateProjectRequest {
  projectId: string;
  projectName: string;
  projectDescription?: string;
  clientToken?: string;
}
export interface UpdateProjectResponse {}
export interface UpdateTaskRequest {
  workspaceName: string;
  taskName: string;
  description?: string;
  taskConfiguration?: TaskConfiguration;
}
export interface UpdateTaskResponse {
  version: string;
  status: ResourceStatus;
}
export interface UpdateWorkspaceRequest {
  workspaceName: string;
  workspaceDescription?: string;
  encryptionConfiguration?: WorkspaceEncryptionConfiguration;
  clientToken?: string;
}
export interface UpdateWorkspaceResponse {
  workspaceStatus: WorkspaceStatus;
}
export type ExceptionMessage = string;
export type AssociateAssetsError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates a child asset with the given parent asset through a hierarchy defined in the
 * parent asset's model. For more information, see Associating assets in the
 * *IoT SiteWise User Guide*.
 */
export const associateAssets: API.OperationMethod<
  AssociateAssetsRequest,
  AssociateAssetsResponse,
  AssociateAssetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assets/{assetId}/associate",
    input: {
      assetId: 0,
      hierarchyId: 0,
      childAssetId: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateAssets",
  endpointHostPrefix: "api.",
})) as any;

export type AssociateTimeSeriesToAssetPropertyError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates a time series (data stream) with an asset property.
 */
export const associateTimeSeriesToAssetProperty: API.OperationMethod<
  AssociateTimeSeriesToAssetPropertyRequest,
  AssociateTimeSeriesToAssetPropertyResponse,
  AssociateTimeSeriesToAssetPropertyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /timeseries/associate",
    input: {
      alias: D.m({ query: "alias" }),
      assetId: D.m({ query: "assetId" }),
      propertyId: D.m({ query: "propertyId" }),
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateTimeSeriesToAssetProperty",
  endpointHostPrefix: "api.",
})) as any;

export type BatchAssociateDataSegmentsToDatasetError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates a batch of data segments with a curated dataset. Data segments are
 * time-bounded slices of time series data selected from source session datasets. Data segments
 * that belong to the same time series can't overlap in time, regardless of which dataset they
 * belong to.
 */
export const batchAssociateDataSegmentsToDataset: API.OperationMethod<
  BatchAssociateDataSegmentsToDatasetRequest,
  BatchAssociateDataSegmentsToDatasetResponse,
  BatchAssociateDataSegmentsToDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /datasets/{datasetId}/data-segments/associate",
    input: {
      datasetId: 0,
      workspaceName: 0,
      associateDataSegmentEntries: D.list({
        sourceDatasetId: 0,
        timeSeriesId: 0,
        startTimestamp: i_TimeInNanos,
        endTimestamp: i_TimeInNanos,
      }),
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchAssociateDataSegmentsToDataset",
  endpointHostPrefix: "api.",
})) as any;

export type BatchAssociateProjectAssetsError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT SiteWise Monitor feature will no longer be open to new
 * customers starting November 7, 2025. If you would like to use the IoT SiteWise Monitor feature, sign up prior to that date. Existing customers can
 * continue to use the service as normal. For more information, see
 * IoT SiteWise Monitor availability change.
 *
 * Associates a group (batch) of assets with an IoT SiteWise Monitor project.
 */
export const batchAssociateProjectAssets: API.OperationMethod<
  BatchAssociateProjectAssetsRequest,
  BatchAssociateProjectAssetsResponse,
  BatchAssociateProjectAssetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /projects/{projectId}/assets/associate",
    input: {
      projectId: 0,
      assetIds: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchAssociateProjectAssets",
  endpointHostPrefix: "monitor.",
})) as any;

export type BatchDeleteDatasetDataSegmentsError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a batch of data segments from a session dataset. Deleting a data segment deletes
 * the underlying time series data for the segment's time range.
 */
export const batchDeleteDatasetDataSegments: API.OperationMethod<
  BatchDeleteDatasetDataSegmentsRequest,
  BatchDeleteDatasetDataSegmentsResponse,
  BatchDeleteDatasetDataSegmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /datasets/{datasetId}/data-segments/batch-delete",
    input: {
      datasetId: 0,
      workspaceName: 0,
      deleteDataSegmentEntries: D.list({
        timeSeriesId: 0,
        startTimestamp: i_TimeInNanos,
        endTimestamp: i_TimeInNanos,
      }),
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteDatasetDataSegments",
  endpointHostPrefix: "api.",
})) as any;

export type BatchDisassociateDataSegmentsFromDatasetError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Disassociates a batch of data segments from a curated dataset. Disassociating a data
 * segment doesn't delete the underlying data in the source session dataset.
 */
export const batchDisassociateDataSegmentsFromDataset: API.OperationMethod<
  BatchDisassociateDataSegmentsFromDatasetRequest,
  BatchDisassociateDataSegmentsFromDatasetResponse,
  BatchDisassociateDataSegmentsFromDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /datasets/{datasetId}/data-segments/disassociate",
    input: {
      datasetId: 0,
      workspaceName: 0,
      disassociateDataSegmentEntries: D.list({
        sourceDatasetId: 0,
        timeSeriesId: 0,
        startTimestamp: i_TimeInNanos,
        endTimestamp: i_TimeInNanos,
      }),
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDisassociateDataSegmentsFromDataset",
  endpointHostPrefix: "api.",
})) as any;

export type BatchDisassociateProjectAssetsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Disassociates a group (batch) of assets from an IoT SiteWise Monitor project.
 */
export const batchDisassociateProjectAssets: API.OperationMethod<
  BatchDisassociateProjectAssetsRequest,
  BatchDisassociateProjectAssetsResponse,
  BatchDisassociateProjectAssetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /projects/{projectId}/assets/disassociate",
    input: {
      projectId: 0,
      assetIds: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDisassociateProjectAssets",
  endpointHostPrefix: "monitor.",
})) as any;

export type BatchGetAssetPropertyAggregatesError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets aggregated values (for example, average, minimum, and maximum) for one or more asset
 * properties. For more information, see Querying aggregates in the
 * *IoT SiteWise User Guide*.
 */
export const batchGetAssetPropertyAggregates: API.PaginatedOperationMethod<
  BatchGetAssetPropertyAggregatesRequest,
  BatchGetAssetPropertyAggregatesResponse,
  BatchGetAssetPropertyAggregatesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /properties/batch/aggregates",
    input: {
      entries: D.list({
        entryId: 0,
        assetId: 0,
        propertyId: 0,
        propertyAlias: 0,
        aggregateTypes: 0,
        resolution: 0,
        startDate: 0,
        endDate: 0,
        qualities: 0,
        timeOrdering: 0,
      }),
      nextToken: 0,
      maxResults: 0,
    },
    output: {
      successEntries: D.list({ aggregatedValues: D.list(o_AggregatedValue) }),
      skippedEntries: D.list({ errorInfo: { errorTimestamp: D.ts } }),
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetAssetPropertyAggregates",
  endpointHostPrefix: "data.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type BatchGetAssetPropertyValueError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the current value for one or more asset properties. For more information, see Querying
 * current values in the *IoT SiteWise User Guide*.
 */
export const batchGetAssetPropertyValue: API.PaginatedOperationMethod<
  BatchGetAssetPropertyValueRequest,
  BatchGetAssetPropertyValueResponse,
  BatchGetAssetPropertyValueError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /properties/batch/latest",
    input: {
      entries: D.list({
        entryId: 0,
        assetId: 0,
        propertyId: 0,
        propertyAlias: 0,
      }),
      nextToken: 0,
    },
    output: { skippedEntries: D.list({ errorInfo: { errorTimestamp: D.ts } }) },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetAssetPropertyValue",
  endpointHostPrefix: "data.",
  pagination: { inputToken: "nextToken", outputToken: "nextToken" } as const,
})) as any;

export type BatchGetAssetPropertyValueHistoryError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the historical values for one or more asset properties. For more information, see
 * Querying historical values in the *IoT SiteWise User Guide*.
 */
export const batchGetAssetPropertyValueHistory: API.PaginatedOperationMethod<
  BatchGetAssetPropertyValueHistoryRequest,
  BatchGetAssetPropertyValueHistoryResponse,
  BatchGetAssetPropertyValueHistoryError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /properties/batch/history",
    input: {
      entries: D.list({
        entryId: 0,
        assetId: 0,
        propertyId: 0,
        propertyAlias: 0,
        startDate: 0,
        endDate: 0,
        qualities: 0,
        timeOrdering: 0,
      }),
      nextToken: 0,
      maxResults: 0,
    },
    output: { skippedEntries: D.list({ errorInfo: { errorTimestamp: D.ts } }) },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetAssetPropertyValueHistory",
  endpointHostPrefix: "data.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type BatchPutAssetPropertyValueError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Sends a list of asset property values to IoT SiteWise. Each value is a timestamp-quality-value
 * (TQV) data point. For more information, see Ingesting data using the API in the
 * *IoT SiteWise User Guide*.
 *
 * To identify an asset property, you must specify one of the following:
 *
 * - The `assetId` and `propertyId` of an asset property.
 *
 * - A `propertyAlias`, which is a data stream alias (for example,
 * `/company/windfarm/3/turbine/7/temperature`). To define an asset property's alias, see UpdateAssetProperty.
 *
 * With respect to Unix epoch time, IoT SiteWise accepts only TQVs that have a timestamp of no more
 * than 7 days in the past and no more than 10 minutes in the future. IoT SiteWise rejects timestamps
 * outside of the inclusive range of [-7 days, +10 minutes] and returns a
 * `TimestampOutOfRangeException` error.
 *
 * For each asset property, IoT SiteWise overwrites TQVs with duplicate timestamps unless the newer
 * TQV has a different quality. For example, if you store a TQV `{T1, GOOD, V1}`,
 * then storing `{T1, GOOD, V2}` replaces the existing TQV.
 *
 * IoT SiteWise authorizes access to each `BatchPutAssetPropertyValue` entry individually.
 * For more information, see BatchPutAssetPropertyValue authorization in the
 * *IoT SiteWise User Guide*.
 */
export const batchPutAssetPropertyValue: API.OperationMethod<
  BatchPutAssetPropertyValueRequest,
  BatchPutAssetPropertyValueResponse,
  BatchPutAssetPropertyValueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /properties",
    input: {
      enablePartialEntryProcessing: 0,
      entries: D.list({
        entryId: 0,
        assetId: 0,
        propertyId: 0,
        propertyAlias: 0,
        propertyValues: D.list({
          value: {
            stringValue: 0,
            integerValue: 0,
            doubleValue: 0,
            booleanValue: 0,
            nullValue: { valueType: 0 },
          },
          timestamp: i_TimeInNanos,
          quality: 0,
        }),
      }),
    },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchPutAssetPropertyValue",
  endpointHostPrefix: "data.",
})) as any;

export type CancelEnrichmentJobError =
  | AccessDeniedException
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Cancels a running or pending enrichment job. This is an idempotent operation—calling it multiple
 * times with the same jobId is safe and returns the current status.
 *
 * Behavior
 *
 * - Jobs in PENDING or RUNNING status transition to CANCELLED
 *
 * - Jobs in RUNNING state may not be cancellable once they have progressed to certain processing stages
 *
 * - Jobs already in terminal states (COMPLETED, FAILED, TIMED_OUT) cannot be cancelled;
 * the operation returns a ConflictingOperationException
 *
 * - Cancelling an already-CANCELLED job is a no-op and returns the current status (idempotent behavior)
 *
 * - The API responds immediately after recording the cancellation
 *
 * - Cleanup of job resources happens asynchronously in the background
 *
 * When to Cancel
 *
 * Cancel a job when:
 *
 * - The job is taking longer than expected
 *
 * - The job was created with incorrect parameters
 *
 * - You no longer need the results
 *
 * Idempotency
 *
 * You can safely retry cancellation requests. Calling CancelEnrichmentJob multiple times for the same
 * job returns the current status without error as long as the job is not in a terminal state other
 * than CANCELLED.
 */
export const cancelEnrichmentJob: API.OperationMethod<
  CancelEnrichmentJobRequest,
  CancelEnrichmentJobResponse,
  CancelEnrichmentJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceName}/enrichment-jobs/{jobId}/cancel",
    input: { workspaceName: 0, jobId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelEnrichmentJob",
  endpointHostPrefix: "data.",
})) as any;

export type CancelPipelineExecutionError =
  | AccessDeniedException
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Cancels a pipeline execution in the specified workspace. If the execution
 * is not in a terminal state (such as NOT_STARTED or RUNNING), it transitions to
 * CANCELLING and asynchronously to CANCELLED. This operation is idempotent: calling
 * it on an execution that is already CANCELLING or CANCELLED returns success with
 * the current state. Calling it on a terminal execution (SUCCEEDED or FAILED)
 * returns a conflict error. You can optionally provide a reason; it is returned in
 * the stateDetails field when you describe the execution.
 */
export const cancelPipelineExecution: API.OperationMethod<
  CancelPipelineExecutionRequest,
  CancelPipelineExecutionResponse,
  CancelPipelineExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceName}/pipelines/{pipelineName}/executions/{pipelineExecutionId}/cancel",
    input: {
      workspaceName: 0,
      pipelineName: 0,
      pipelineExecutionId: 0,
      reason: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelPipelineExecution",
  endpointHostPrefix: "data.",
})) as any;

export type CancelQueryError =
  | AccessDeniedException
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Cancels a running query.
 */
export const cancelQuery: API.OperationMethod<
  CancelQueryRequest,
  CancelQueryResponse,
  CancelQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceName}/queries/{queryId}/cancel",
    input: { workspaceName: 0, queryId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelQuery",
  endpointHostPrefix: "data.",
})) as any;

export type CreateAccessPolicyError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT SiteWise Monitor feature will no longer be open to new
 * customers starting November 7, 2025. If you would like to use the IoT SiteWise Monitor feature, sign up prior to that date. Existing customers can
 * continue to use the service as normal. For more information, see
 * IoT SiteWise Monitor availability change.
 *
 * Creates an access policy that grants the specified identity (IAM Identity Center user, IAM Identity Center group, or
 * IAM user) access to the specified IoT SiteWise Monitor portal or project resource.
 *
 * Support for access policies that use an SSO Group as the identity is not supported at this time.
 */
export const createAccessPolicy: API.OperationMethod<
  CreateAccessPolicyRequest,
  CreateAccessPolicyResponse,
  CreateAccessPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /access-policies",
    input: {
      accessPolicyIdentity: i_Identity,
      accessPolicyResource: i_Resource,
      accessPolicyPermission: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessPolicy",
  endpointHostPrefix: "monitor.",
})) as any;

export type CreateApplicationError =
  | AccessDeniedException
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new application for the workspace and IdC application provided
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  CreateApplicationResponse,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /applications",
    input: {
      clientToken: D.m({ idempotency: true }),
      idcInstanceArn: 0,
      workspaceName: 0,
      name: 0,
      description: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
  endpointHostPrefix: "api.",
})) as any;

export type CreateAssetError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an asset from an existing asset model. For more information, see Creating assets in the
 * *IoT SiteWise User Guide*.
 */
export const createAsset: API.OperationMethod<
  CreateAssetRequest,
  CreateAssetResponse,
  CreateAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assets",
    input: {
      assetName: 0,
      assetModelId: 0,
      assetId: 0,
      assetExternalId: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
      assetDescription: 0,
    },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAsset",
  endpointHostPrefix: "api.",
})) as any;

export type CreateAssetModelError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an asset model from specified property and hierarchy definitions. You create
 * assets from asset models. With asset models, you can easily create assets of the same type
 * that have standardized definitions. Each asset created from a model inherits the asset model's
 * property and hierarchy definitions. For more information, see Defining asset models in the
 * *IoT SiteWise User Guide*.
 *
 * You can create three types of asset models, `ASSET_MODEL`,
 * `COMPONENT_MODEL`, or an `INTERFACE`.
 *
 * - **ASSET_MODEL** – (default) An asset model that
 * you can use to create assets. Can't be included as a component in another asset
 * model.
 *
 * - **COMPONENT_MODEL** – A reusable component that
 * you can include in the composite models of other asset models. You can't create
 * assets directly from this type of asset model.
 *
 * - **INTERFACE** – An interface is a type of model
 * that defines a standard structure that can be applied to different asset models.
 */
export const createAssetModel: API.OperationMethod<
  CreateAssetModelRequest,
  CreateAssetModelResponse,
  CreateAssetModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /asset-models",
    input: {
      assetModelName: 0,
      assetModelType: 0,
      assetModelId: 0,
      assetModelExternalId: 0,
      assetModelDescription: 0,
      assetModelProperties: D.list(i_AssetModelPropertyDefinition),
      assetModelHierarchies: D.list({
        id: 0,
        externalId: 0,
        name: 0,
        childAssetModelId: 0,
      }),
      assetModelCompositeModels: D.list({
        id: 0,
        externalId: 0,
        name: 0,
        description: 0,
        type: 0,
        properties: D.list(i_AssetModelPropertyDefinition),
      }),
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssetModel",
  endpointHostPrefix: "api.",
})) as any;

export type CreateAssetModelCompositeModelError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | PreconditionFailedException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a custom composite model from specified property and hierarchy definitions. There
 * are two types of custom composite models, `inline` and
 * `component-model-based`.
 *
 * Use component-model-based custom composite models to define standard, reusable components.
 * A component-model-based custom composite model consists of a name, a description, and the ID
 * of the component model it references. A component-model-based custom composite model has no
 * properties of its own; its referenced component model provides its associated properties to
 * any created assets. For more information, see Custom composite models (Components)
 * in the *IoT SiteWise User Guide*.
 *
 * Use inline custom composite models to organize the properties of an asset model. The
 * properties of inline custom composite models are local to the asset model where they are
 * included and can't be used to create multiple assets.
 *
 * To create a component-model-based model, specify the `composedAssetModelId` of
 * an existing asset model with `assetModelType` of
 * `COMPONENT_MODEL`.
 *
 * To create an inline model, specify the `assetModelCompositeModelProperties` and
 * don't include an `composedAssetModelId`.
 */
export const createAssetModelCompositeModel: API.OperationMethod<
  CreateAssetModelCompositeModelRequest,
  CreateAssetModelCompositeModelResponse,
  CreateAssetModelCompositeModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /asset-models/{assetModelId}/composite-models",
    input: {
      assetModelId: 0,
      assetModelCompositeModelExternalId: 0,
      parentAssetModelCompositeModelId: 0,
      assetModelCompositeModelId: 0,
      assetModelCompositeModelDescription: 0,
      assetModelCompositeModelName: 0,
      assetModelCompositeModelType: 0,
      clientToken: D.m({ idempotency: true }),
      composedAssetModelId: 0,
      assetModelCompositeModelProperties: D.list(
        i_AssetModelPropertyDefinition,
      ),
      ifMatch: D.m({ header: "If-Match" }),
      ifNoneMatch: D.m({ header: "If-None-Match" }),
      matchForVersionType: D.m({ header: "Match-For-Version-Type" }),
    },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    PreconditionFailedException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssetModelCompositeModel",
  endpointHostPrefix: "api.",
})) as any;

export type CreateBulkImportJobError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Defines a job to ingest data to IoT SiteWise from Amazon S3. For more information, see Create a
 * bulk import job (CLI) in the *Amazon Simple Storage Service User Guide*.
 *
 * Before you create a bulk import job that ingests data into time series outside of a
 * workspace, you must enable IoT SiteWise warm tier or IoT SiteWise cold tier. For more information about how
 * to configure storage settings, see PutStorageConfiguration. This requirement doesn't apply to bulk import jobs that
 * ingest data into a session dataset in a workspace (jobs that specify a
 * `workspaceName` and `datasetId`). Those jobs don't use IoT SiteWise warm or
 * cold tier storage.
 *
 * Bulk import is designed to store historical data to IoT SiteWise.
 *
 * - Newly ingested data in the hot tier triggers notifications and computations.
 *
 * - After data moves from the hot tier to the warm or cold tier based on retention
 * settings, it does not trigger computations or notifications.
 *
 * - Data older than 7 days does not trigger computations or notifications.
 */
export const createBulkImportJob: API.OperationMethod<
  CreateBulkImportJobRequest,
  CreateBulkImportJobResponse,
  CreateBulkImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /jobs",
    input: {
      jobName: 0,
      jobRoleArn: 0,
      files: D.list({
        bucket: 0,
        key: 0,
        versionId: 0,
        alias: 0,
        startTime: i_TimeInNanos,
        fileFormat: i_FileFormat,
      }),
      errorReportLocation: { bucket: 0, prefix: 0 },
      jobConfiguration: { fileFormat: i_FileFormat },
      adaptiveIngestion: 0,
      deleteFilesAfterImport: 0,
      datasetId: 0,
      workspaceName: 0,
    },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBulkImportJob",
  endpointHostPrefix: "data.",
})) as any;

export type CreateComputationModelError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Create a computation model with a configuration and data binding.
 */
export const createComputationModel: API.OperationMethod<
  CreateComputationModelRequest,
  CreateComputationModelResponse,
  CreateComputationModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /computation-models",
    input: {
      computationModelName: 0,
      computationModelDescription: 0,
      computationModelConfiguration: i_ComputationModelConfiguration,
      computationModelDataBinding: D.map(i_ComputationModelDataBindingValue),
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateComputationModel",
  endpointHostPrefix: "api.",
})) as any;

export type CreateDashboardError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT SiteWise Monitor feature will no longer be open to new
 * customers starting November 7, 2025. If you would like to use the IoT SiteWise Monitor feature, sign up prior to that date. Existing customers can
 * continue to use the service as normal. For more information, see
 * IoT SiteWise Monitor availability change.
 *
 * Creates a dashboard in an IoT SiteWise Monitor project.
 */
export const createDashboard: API.OperationMethod<
  CreateDashboardRequest,
  CreateDashboardResponse,
  CreateDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /dashboards",
    input: {
      projectId: 0,
      dashboardName: 0,
      dashboardDescription: 0,
      dashboardDefinition: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDashboard",
  endpointHostPrefix: "monitor.",
})) as any;

export type CreateDatasetError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a dataset. Session and curated datasets are created in a workspace. A session dataset contains data segments of time series data, and a curated dataset curates data segments selected from source session datasets. A dataset that connects to an external datasource is created outside of a workspace.
 */
export const createDataset: API.OperationMethod<
  CreateDatasetRequest,
  CreateDatasetResponse,
  CreateDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /datasets",
    input: {
      datasetId: 0,
      datasetName: 0,
      datasetDescription: 0,
      datasetType: 0,
      datasetConfig: i_DatasetConfig,
      workspaceName: 0,
      metadata: 0,
      datasetSource: i_DatasetSource,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataset",
  endpointHostPrefix: "api.",
})) as any;

export type CreateDatasetExportJobError =
  | AccessDeniedException
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Starts an asynchronous job that exports dataset and time-series data from a workspace to Amazon
 * S3. The operation returns a jobId immediately; poll DescribeDatasetExportJob to track progress and
 * ListDatasetExportJobs to enumerate a workspace's jobs.
 */
export const createDatasetExportJob: API.OperationMethod<
  CreateDatasetExportJobRequest,
  CreateDatasetExportJobResponse,
  CreateDatasetExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceName}/dataset-export-jobs",
    input: {
      workspaceName: 0,
      clientToken: D.m({ idempotency: true }),
      destinationS3Uri: 0,
      input: {
        timeseries: D.list({
          timeSeriesId: 0,
          propertyAlias: 0,
          trimSettings: i_TrimSettings,
          formatSettings: i_FormatSettings,
        }),
        dataset: {
          datasetId: 0,
          trimSettings: i_TrimSettings,
          exportDataTypes: 0,
        },
      },
      errorReportLocation: { s3Uri: 0 },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDatasetExportJob",
  endpointHostPrefix: "data.",
})) as any;

export type CreateEnrichmentJobError =
  | AccessDeniedException
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an asynchronous enrichment job to analyze time-series sensor data. The operation returns
 * immediately with job details while processing continues in the background.
 *
 * Idempotency
 *
 * Include a clientToken to make the operation idempotent. If you submit the same request with the same
 * token within the idempotency window, you receive the original job details without creating a duplicate.
 *
 * Prerequisites
 *
 * Before creating a job, ensure:
 *
 * - The workspace is in ACTIVE state (not being deleted)
 *
 * - You have IAM permissions for the workspace, dataset, and time-series resources
 *
 * - You have KMS Decrypt permission on the workspace's customer-managed encryption key
 *
 * - No duplicate job (same workspace, dataset, property, and job type) is currently running
 *
 * Workflow
 *
 * - Submit the job with configuration specifying which video data to analyze and the time range
 *
 * - Capture the jobId from the response
 *
 * - Use DescribeEnrichmentJob to monitor progress and check job status
 *
 * - When status reaches a terminal state (COMPLETED, FAILED, TIMED_OUT, CANCELLED), check results
 *
 * - For COMPLETED jobs, query IoT SiteWise for semantic search on video events
 *
 * Error Handling
 *
 * - ConflictingOperationException: A duplicate job is already running for the same configuration
 *
 * - InvalidRequestException: Invalid parameters (e.g., both timeSeriesId and propertyAlias specified)
 *
 * - AccessDeniedException: Insufficient IAM or KMS permissions
 *
 * - LimitExceededException: Too many concurrent jobs or requests
 */
export const createEnrichmentJob: API.OperationMethod<
  CreateEnrichmentJobRequest,
  CreateEnrichmentJobResponse,
  CreateEnrichmentJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceName}/enrichment-jobs",
    input: {
      workspaceName: 0,
      jobConfiguration: {
        eventDetection: {
          datasetId: 0,
          timeSeriesId: 0,
          propertyAlias: 0,
          trimSettings: { startTime: i_TimeInNanos, endTime: i_TimeInNanos },
        },
      },
      clientToken: D.m({ idempotency: true }),
    },
    output: { createdAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnrichmentJob",
  endpointHostPrefix: "data.",
})) as any;

export type CreateGatewayError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a gateway, which is a virtual or edge device that delivers industrial data streams
 * from local servers to IoT SiteWise. For more information, see Ingesting data using a gateway in the
 * *IoT SiteWise User Guide*.
 */
export const createGateway: API.OperationMethod<
  CreateGatewayRequest,
  CreateGatewayResponse,
  CreateGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /20200301/gateways",
    input: {
      gatewayName: 0,
      gatewayPlatform: {
        greengrass: { groupArn: 0 },
        greengrassV2: { coreDeviceThingName: 0, coreDeviceOperatingSystem: 0 },
        siemensIE: { iotCoreThingName: 0 },
      },
      gatewayVersion: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGateway",
  endpointHostPrefix: "api.",
})) as any;

export type CreatePipelineError =
  | AccessDeniedException
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new pipeline in the specified workspace. A pipeline defines a
 * directed acyclic graph (DAG) of compute nodes, where each node references a task
 * and can declare dependencies on other nodes. Cyclic dependencies are not
 * allowed. Nodes without dependencies run in parallel, while nodes with dependencies
 * wait for all upstream nodes to complete successfully before starting.
 *
 * You can set environment variables at the pipeline level that are shared across all
 * compute nodes, and override them at the individual compute node level.
 */
export const createPipeline: API.OperationMethod<
  CreatePipelineRequest,
  CreatePipelineResponse,
  CreatePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceName}/pipelines",
    input: {
      workspaceName: 0,
      pipelineName: 0,
      description: 0,
      environmentVariables: 0,
      computations: D.list(i_ComputeNode),
      tags: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePipeline",
  endpointHostPrefix: "api.",
})) as any;

export type CreatePortalError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT SiteWise Monitor feature will no longer be open to new
 * customers starting November 7, 2025. If you would like to use the IoT SiteWise Monitor feature, sign up prior to that date. Existing customers can
 * continue to use the service as normal. For more information, see
 * IoT SiteWise Monitor availability change.
 *
 * Creates a portal, which can contain projects and dashboards. IoT SiteWise Monitor uses IAM Identity Center or IAM
 * to authenticate portal users and manage user permissions.
 *
 * Before you can sign in to a new portal, you must add at least one identity to that
 * portal. For more information, see Adding or removing portal
 * administrators in the *IoT SiteWise User Guide*.
 */
export const createPortal: API.OperationMethod<
  CreatePortalRequest,
  CreatePortalResponse,
  CreatePortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /portals",
    input: {
      portalName: 0,
      portalDescription: 0,
      portalContactEmail: 0,
      clientToken: D.m({ idempotency: true }),
      portalLogoImageFile: i_ImageFile,
      roleArn: 0,
      tags: 0,
      portalAuthMode: 0,
      notificationSenderEmail: 0,
      alarms: i_Alarms,
      portalType: 0,
      portalTypeConfiguration: D.map(i_PortalTypeEntry),
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePortal",
  endpointHostPrefix: "monitor.",
})) as any;

export type CreateProjectError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT SiteWise Monitor feature will no longer be open to new
 * customers starting November 7, 2025. If you would like to use the IoT SiteWise Monitor feature, sign up prior to that date. Existing customers can
 * continue to use the service as normal. For more information, see
 * IoT SiteWise Monitor availability change.
 *
 * Creates a project in the specified portal.
 *
 * Make sure that the project name and description don't contain confidential
 * information.
 */
export const createProject: API.OperationMethod<
  CreateProjectRequest,
  CreateProjectResponse,
  CreateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /projects",
    input: {
      portalId: 0,
      projectName: 0,
      projectDescription: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProject",
  endpointHostPrefix: "monitor.",
})) as any;

export type CreateTaskError =
  | AccessDeniedException
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new task in the specified workspace. A task defines a reusable
 * containerized compute workload that can be referenced by one or more pipeline compute nodes.
 *
 * Specify a `containerTaskConfiguration` for custom container workloads with
 * configurable ECR image, processing type, processing unit, and environment variables.
 */
export const createTask: API.OperationMethod<
  CreateTaskRequest,
  CreateTaskResponse,
  CreateTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceName}/tasks",
    input: {
      workspaceName: 0,
      taskName: 0,
      description: 0,
      taskConfiguration: i_TaskConfiguration,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTask",
  endpointHostPrefix: "api.",
})) as any;

export type CreateWorkspaceError =
  | AccessDeniedException
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a workspace in IoT SiteWise. A workspace isolates its resources, such as datasets, time
 * series, pipelines, and tasks, and their data from other workspaces, and has its own quotas
 * and throttling limits. You must specify an encryption configuration when you create
 * a workspace. The operation returns immediately with the workspace in the
 * `CREATING` state. Provisioning completes asynchronously, after which the workspace
 * state is `ACTIVE`, or `FAILED` if provisioning doesn't complete.
 */
export const createWorkspace: API.OperationMethod<
  CreateWorkspaceRequest,
  CreateWorkspaceResponse,
  CreateWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces",
    input: {
      workspaceName: 0,
      workspaceDescription: 0,
      encryptionConfiguration: i_WorkspaceEncryptionConfiguration,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkspace",
  endpointHostPrefix: "api.",
})) as any;

export type DeleteAccessPolicyError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an access policy that grants the specified identity access to the specified
 * IoT SiteWise Monitor resource. You can use this operation to revoke access to an IoT SiteWise Monitor
 * resource.
 */
export const deleteAccessPolicy: API.OperationMethod<
  DeleteAccessPolicyRequest,
  DeleteAccessPolicyResponse,
  DeleteAccessPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /access-policies/{accessPolicyId}",
    input: {
      accessPolicyId: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessPolicy",
  endpointHostPrefix: "monitor.",
})) as any;

export type DeleteApplicationError =
  | AccessDeniedException
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an application by ID
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /workspaces/{workspaceName}/applications/{id}",
    input: { workspaceName: 0, id: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
  endpointHostPrefix: "api.",
})) as any;

export type DeleteAssetError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an asset. This action can't be undone. For more information, see Deleting assets and
 * models in the *IoT SiteWise User Guide*.
 *
 * You can't delete an asset that's associated to another asset. For more information, see
 * DisassociateAssets.
 */
export const deleteAsset: API.OperationMethod<
  DeleteAssetRequest,
  DeleteAssetResponse,
  DeleteAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /assets/{assetId}",
    input: {
      assetId: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAsset",
  endpointHostPrefix: "api.",
})) as any;

export type DeleteAssetModelError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an asset model. This action can't be undone. You must delete all assets created
 * from an asset model before you can delete the model. Also, you can't delete an asset model if
 * a parent asset model exists that contains a property formula expression that depends on the
 * asset model that you want to delete. For more information, see Deleting assets and models in the
 * *IoT SiteWise User Guide*.
 */
export const deleteAssetModel: API.OperationMethod<
  DeleteAssetModelRequest,
  DeleteAssetModelResponse,
  DeleteAssetModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /asset-models/{assetModelId}",
    input: {
      assetModelId: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
      ifMatch: D.m({ header: "If-Match" }),
      ifNoneMatch: D.m({ header: "If-None-Match" }),
      matchForVersionType: D.m({ header: "Match-For-Version-Type" }),
    },
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssetModel",
  endpointHostPrefix: "api.",
})) as any;

export type DeleteAssetModelCompositeModelError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a composite model. This action can't be undone. You must delete all assets created
 * from a composite model before you can delete the model. Also, you can't delete a composite
 * model if a parent asset model exists that contains a property formula expression that depends
 * on the asset model that you want to delete. For more information, see Deleting assets and
 * models in the *IoT SiteWise User Guide*.
 */
export const deleteAssetModelCompositeModel: API.OperationMethod<
  DeleteAssetModelCompositeModelRequest,
  DeleteAssetModelCompositeModelResponse,
  DeleteAssetModelCompositeModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /asset-models/{assetModelId}/composite-models/{assetModelCompositeModelId}",
    input: {
      assetModelId: 0,
      assetModelCompositeModelId: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
      ifMatch: D.m({ header: "If-Match" }),
      ifNoneMatch: D.m({ header: "If-None-Match" }),
      matchForVersionType: D.m({ header: "Match-For-Version-Type" }),
    },
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssetModelCompositeModel",
  endpointHostPrefix: "api.",
})) as any;

export type DeleteAssetModelInterfaceRelationshipError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an interface relationship between an asset model and an interface asset
 * model.
 */
export const deleteAssetModelInterfaceRelationship: API.OperationMethod<
  DeleteAssetModelInterfaceRelationshipRequest,
  DeleteAssetModelInterfaceRelationshipResponse,
  DeleteAssetModelInterfaceRelationshipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /asset-models/{assetModelId}/interface/{interfaceAssetModelId}/asset-model-interface-relationship",
    input: {
      assetModelId: 0,
      interfaceAssetModelId: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssetModelInterfaceRelationship",
  endpointHostPrefix: "api.",
})) as any;

export type DeleteComputationModelError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a computation model. This action can't be undone.
 */
export const deleteComputationModel: API.OperationMethod<
  DeleteComputationModelRequest,
  DeleteComputationModelResponse,
  DeleteComputationModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /computation-models/{computationModelId}",
    input: {
      computationModelId: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteComputationModel",
  endpointHostPrefix: "api.",
})) as any;

export type DeleteDashboardError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a dashboard from IoT SiteWise Monitor.
 */
export const deleteDashboard: API.OperationMethod<
  DeleteDashboardRequest,
  DeleteDashboardResponse,
  DeleteDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /dashboards/{dashboardId}",
    input: {
      dashboardId: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDashboard",
  endpointHostPrefix: "monitor.",
})) as any;

export type DeleteDatasetError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a dataset. This can't be undone. Deleting a session dataset also deletes the underlying time series data in the session. You can't delete a session dataset while a curated dataset references its data segments. First delete the curated dataset or disassociate the data segments. Deleting a curated dataset doesn't delete the underlying data in the source session datasets.
 */
export const deleteDataset: API.OperationMethod<
  DeleteDatasetRequest,
  DeleteDatasetResponse,
  DeleteDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /datasets/{datasetId}",
    input: {
      datasetId: 0,
      workspaceName: D.m({ query: "workspaceName" }),
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataset",
  endpointHostPrefix: "api.",
})) as any;

export type DeleteGatewayError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a gateway from IoT SiteWise. When you delete a gateway, some of the gateway's files remain
 * in your gateway's file system.
 */
export const deleteGateway: API.OperationMethod<
  DeleteGatewayRequest,
  DeleteGatewayResponse,
  DeleteGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /20200301/gateways/{gatewayId}",
    input: { gatewayId: 0 },
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGateway",
  endpointHostPrefix: "api.",
})) as any;

export type DeletePipelineError =
  | AccessDeniedException
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a pipeline from the specified workspace. A pipeline cannot be
 * deleted if it has any active executions. Wait for all executions to complete before
 * attempting to delete the pipeline, or use CancelPipelineExecution to stop a running
 * execution.
 */
export const deletePipeline: API.OperationMethod<
  DeletePipelineRequest,
  DeletePipelineResponse,
  DeletePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /workspaces/{workspaceName}/pipelines/{pipelineName}",
    input: { workspaceName: 0, pipelineName: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePipeline",
  endpointHostPrefix: "api.",
})) as any;

export type DeletePortalError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a portal from IoT SiteWise Monitor.
 */
export const deletePortal: API.OperationMethod<
  DeletePortalRequest,
  DeletePortalResponse,
  DeletePortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /portals/{portalId}",
    input: {
      portalId: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePortal",
  endpointHostPrefix: "monitor.",
})) as any;

export type DeleteProjectError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a project from IoT SiteWise Monitor.
 */
export const deleteProject: API.OperationMethod<
  DeleteProjectRequest,
  DeleteProjectResponse,
  DeleteProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /projects/{projectId}",
    input: {
      projectId: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProject",
  endpointHostPrefix: "monitor.",
})) as any;

export type DeleteTaskError =
  | AccessDeniedException
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a task from the specified workspace. A task cannot be deleted
 * if it is currently referenced by any existing pipeline. Remove the task from all
 * pipelines before attempting to delete it.
 */
export const deleteTask: API.OperationMethod<
  DeleteTaskRequest,
  DeleteTaskResponse,
  DeleteTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /workspaces/{workspaceName}/tasks/{taskName}",
    input: { workspaceName: 0, taskName: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTask",
  endpointHostPrefix: "api.",
})) as any;

export type DeleteTimeSeriesError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a time series (data stream). If you delete a time series that's associated with an
 * asset property, the asset property still exists, but the time series will no longer be
 * associated with this asset property. You can't delete a time series until all of its data
 * segments have been deleted from session datasets.
 *
 * To identify a time series, do one of the following:
 *
 * - If the time series isn't associated with an asset property,
 * specify the `alias` of the time series.
 *
 * - If the time series is associated with an asset property,
 * specify one of the following:
 *
 * - The `alias` of the time series.
 *
 * - The `assetId` and `propertyId` that identifies the asset property.
 */
export const deleteTimeSeries: API.OperationMethod<
  DeleteTimeSeriesRequest,
  DeleteTimeSeriesResponse,
  DeleteTimeSeriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /timeseries/delete",
    input: {
      alias: D.m({ query: "alias" }),
      assetId: D.m({ query: "assetId" }),
      propertyId: D.m({ query: "propertyId" }),
      clientToken: D.m({ idempotency: true }),
      workspaceName: D.m({ query: "workspaceName" }),
    },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTimeSeries",
  endpointHostPrefix: "api.",
})) as any;

export type DeleteWorkspaceError =
  | AccessDeniedException
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a workspace. Before you delete a workspace, you must delete all resources
 * contained in or associated with the workspace, such as datasets, time series, pipelines,
 * and tasks.
 */
export const deleteWorkspace: API.OperationMethod<
  DeleteWorkspaceRequest,
  DeleteWorkspaceResponse,
  DeleteWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /workspaces/{workspaceName}",
    input: {
      workspaceName: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkspace",
  endpointHostPrefix: "api.",
})) as any;

export type DescribeAccessPolicyError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes an access policy, which specifies an identity's access to an IoT SiteWise Monitor portal or
 * project.
 */
export const describeAccessPolicy: API.OperationMethod<
  DescribeAccessPolicyRequest,
  DescribeAccessPolicyResponse,
  DescribeAccessPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /access-policies/{accessPolicyId}",
    input: { accessPolicyId: 0 },
    output: {
      accessPolicyCreationDate: D.ts,
      accessPolicyLastUpdateDate: D.ts,
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccessPolicy",
  endpointHostPrefix: "monitor.",
})) as any;

export type DescribeActionError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about an action.
 */
export const describeAction: API.OperationMethod<
  DescribeActionRequest,
  DescribeActionResponse,
  DescribeActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /actions/{actionId}",
    input: { actionId: 0 },
    output: { executionTime: D.ts },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAction",
  endpointHostPrefix: "api.",
})) as any;

export type DescribeApplicationError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves Application details based on the ID
 */
export const describeApplication: API.OperationMethod<
  DescribeApplicationRequest,
  DescribeApplicationResponse,
  DescribeApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceName}/applications/{id}",
    input: { workspaceName: 0, id: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplication",
  endpointHostPrefix: "api.",
})) as any;

export type DescribeAssetError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about an asset.
 */
export const describeAsset: API.OperationMethod<
  DescribeAssetRequest,
  DescribeAssetResponse,
  DescribeAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /assets/{assetId}",
    input: {
      assetId: 0,
      excludeProperties: D.m({ query: "excludeProperties" }),
    },
    output: { assetCreationDate: D.ts, assetLastUpdateDate: D.ts },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAsset",
  endpointHostPrefix: "api.",
})) as any;

export type DescribeAssetCompositeModelError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about an asset composite model (also known as an asset component).
 * An `AssetCompositeModel` is an instance of an
 * `AssetModelCompositeModel`. If you want to see information about the model this is
 * based on, call DescribeAssetModelCompositeModel.
 */
export const describeAssetCompositeModel: API.OperationMethod<
  DescribeAssetCompositeModelRequest,
  DescribeAssetCompositeModelResponse,
  DescribeAssetCompositeModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /assets/{assetId}/composite-models/{assetCompositeModelId}",
    input: { assetId: 0, assetCompositeModelId: 0 },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssetCompositeModel",
  endpointHostPrefix: "api.",
})) as any;

export type DescribeAssetModelError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about an asset model. This includes details about the asset model's
 * properties, hierarchies, composite models, and any interface relationships if the asset model
 * implements interfaces.
 */
export const describeAssetModel: API.OperationMethod<
  DescribeAssetModelRequest,
  DescribeAssetModelResponse,
  DescribeAssetModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /asset-models/{assetModelId}",
    input: {
      assetModelId: 0,
      excludeProperties: D.m({ query: "excludeProperties" }),
      assetModelVersion: D.m({ query: "assetModelVersion" }),
    },
    output: {
      assetModelCreationDate: D.ts,
      assetModelLastUpdateDate: D.ts,
      eTag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssetModel",
  endpointHostPrefix: "api.",
})) as any;

export type DescribeAssetModelCompositeModelError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about an asset model composite model (also known as an asset model
 * component). For more information, see Custom composite models
 * (Components) in the *IoT SiteWise User Guide*.
 */
export const describeAssetModelCompositeModel: API.OperationMethod<
  DescribeAssetModelCompositeModelRequest,
  DescribeAssetModelCompositeModelResponse,
  DescribeAssetModelCompositeModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /asset-models/{assetModelId}/composite-models/{assetModelCompositeModelId}",
    input: {
      assetModelId: 0,
      assetModelCompositeModelId: 0,
      assetModelVersion: D.m({ query: "assetModelVersion" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssetModelCompositeModel",
  endpointHostPrefix: "api.",
})) as any;

export type DescribeAssetModelInterfaceRelationshipError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about an interface relationship between an asset model and an
 * interface asset model.
 */
export const describeAssetModelInterfaceRelationship: API.OperationMethod<
  DescribeAssetModelInterfaceRelationshipRequest,
  DescribeAssetModelInterfaceRelationshipResponse,
  DescribeAssetModelInterfaceRelationshipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /asset-models/{assetModelId}/interface/{interfaceAssetModelId}/asset-model-interface-relationship",
    input: { assetModelId: 0, interfaceAssetModelId: 0 },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssetModelInterfaceRelationship",
  endpointHostPrefix: "api.",
})) as any;

export type DescribeAssetPropertyError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about an asset property.
 *
 * When you call this operation for an attribute property, this response includes the
 * default attribute value that you define in the asset model. If you update the default value
 * in the model, this operation's response includes the new default value.
 *
 * This operation doesn't return the value of the asset property. To get the value of an
 * asset property, use GetAssetPropertyValue.
 */
export const describeAssetProperty: API.OperationMethod<
  DescribeAssetPropertyRequest,
  DescribeAssetPropertyResponse,
  DescribeAssetPropertyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /assets/{assetId}/properties/{propertyId}",
    input: { assetId: 0, propertyId: 0 },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssetProperty",
  endpointHostPrefix: "api.",
})) as any;

export type DescribeBulkImportJobError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about a bulk import job request. For more information, see Describe
 * a bulk import job (CLI) in the *Amazon Simple Storage Service User Guide*.
 */
export const describeBulkImportJob: API.OperationMethod<
  DescribeBulkImportJobRequest,
  DescribeBulkImportJobResponse,
  DescribeBulkImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /jobs/{jobId}",
    input: { jobId: 0, workspaceName: D.m({ query: "workspaceName" }) },
    output: { jobCreationDate: D.ts, jobLastUpdateDate: D.ts },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBulkImportJob",
  endpointHostPrefix: "data.",
})) as any;

export type DescribeComputationModelError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about a computation model.
 */
export const describeComputationModel: API.OperationMethod<
  DescribeComputationModelRequest,
  DescribeComputationModelResponse,
  DescribeComputationModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /computation-models/{computationModelId}",
    input: {
      computationModelId: 0,
      computationModelVersion: D.m({ query: "computationModelVersion" }),
    },
    output: {
      computationModelCreationDate: D.ts,
      computationModelLastUpdateDate: D.ts,
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeComputationModel",
  endpointHostPrefix: "api.",
})) as any;

export type DescribeComputationModelExecutionSummaryError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about the execution summary of a computation model.
 */
export const describeComputationModelExecutionSummary: API.OperationMethod<
  DescribeComputationModelExecutionSummaryRequest,
  DescribeComputationModelExecutionSummaryResponse,
  DescribeComputationModelExecutionSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /computation-models/{computationModelId}/execution-summary",
    input: {
      computationModelId: 0,
      resolveToResourceType: D.m({ query: "resolveToResourceType" }),
      resolveToResourceId: D.m({ query: "resolveToResourceId" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeComputationModelExecutionSummary",
  endpointHostPrefix: "api.",
})) as any;

export type DescribeDashboardError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about a dashboard.
 */
export const describeDashboard: API.OperationMethod<
  DescribeDashboardRequest,
  DescribeDashboardResponse,
  DescribeDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /dashboards/{dashboardId}",
    input: { dashboardId: 0 },
    output: { dashboardCreationDate: D.ts, dashboardLastUpdateDate: D.ts },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDashboard",
  endpointHostPrefix: "monitor.",
})) as any;

export type DescribeDatasetError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about a dataset.
 */
export const describeDataset: API.OperationMethod<
  DescribeDatasetRequest,
  DescribeDatasetResponse,
  DescribeDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /datasets/{datasetId}",
    input: {
      datasetId: 0,
      workspaceName: D.m({ query: "workspaceName" }),
      datasetVersion: D.m({ query: "datasetVersion" }),
    },
    output: {
      datasetCreationDate: D.ts,
      datasetLastUpdateDate: D.ts,
      enrichmentStatus: o_DatasetEnrichment,
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataset",
  endpointHostPrefix: "api.",
})) as any;

export type DescribeDatasetExportJobError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about a dataset export job.
 */
export const describeDatasetExportJob: API.OperationMethod<
  DescribeDatasetExportJobRequest,
  DescribeDatasetExportJobResponse,
  DescribeDatasetExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceName}/dataset-export-jobs/{jobId}",
    input: { workspaceName: 0, jobId: 0 },
    output: { startedAt: D.ts, completedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDatasetExportJob",
  endpointHostPrefix: "data.",
})) as any;

export type DescribeDefaultEncryptionConfigurationError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about the default encryption configuration for the Amazon Web Services account in
 * the default or specified Region. For more information, see Key management in the
 * *IoT SiteWise User Guide*.
 */
export const describeDefaultEncryptionConfiguration: API.OperationMethod<
  DescribeDefaultEncryptionConfigurationRequest,
  DescribeDefaultEncryptionConfigurationResponse,
  DescribeDefaultEncryptionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /configuration/account/encryption",
    input: {},
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDefaultEncryptionConfiguration",
  endpointHostPrefix: "api.",
})) as any;

export type DescribeEnrichmentJobError =
  | AccessDeniedException
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific enrichment job, including its current status,
 * configuration, and timestamps.
 *
 * Use Cases
 *
 * - Monitor job progress by checking status updates with DescribeEnrichmentJob
 *
 * - Retrieve the complete job configuration submitted during creation
 *
 * - Debug failed jobs by examining the failureMessage field
 *
 * - Track job lifecycle with creation, update, completion, and cancellation timestamps
 *
 * Status Monitoring
 *
 * Jobs progress through statuses: PENDING → RUNNING → terminal state
 *
 * Terminal states:
 *
 * - COMPLETED: Job finished successfully; query IoT SiteWise for semantic search results
 *
 * - FAILED: Job encountered an error; check failureMessage for details
 *
 * - TIMED_OUT: Job exceeded maximum processing time
 *
 * - CANCELLED: Job was cancelled via CancelEnrichmentJob
 *
 * Response Fields
 *
 * The response includes:
 *
 * - Current job status and type
 *
 * - Full job configuration as originally submitted
 *
 * - Lifecycle timestamps (created, updated, completed, cancelled)
 *
 * - Failure details if status is FAILED
 */
export const describeEnrichmentJob: API.OperationMethod<
  DescribeEnrichmentJobRequest,
  DescribeEnrichmentJobResponse,
  DescribeEnrichmentJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceName}/enrichment-jobs/{jobId}",
    input: { workspaceName: 0, jobId: 0 },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      completedAt: D.ts,
      cancelledAt: D.ts,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEnrichmentJob",
  endpointHostPrefix: "data.",
})) as any;

export type DescribeExecutionError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about the execution.
 */
export const describeExecution: API.OperationMethod<
  DescribeExecutionRequest,
  DescribeExecutionResponse,
  DescribeExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /executions/{executionId}",
    input: { executionId: 0 },
    output: { executionStartTime: D.ts, executionEndTime: D.ts },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExecution",
  endpointHostPrefix: "api.",
})) as any;

export type DescribeGatewayError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about a gateway.
 */
export const describeGateway: API.OperationMethod<
  DescribeGatewayRequest,
  DescribeGatewayResponse,
  DescribeGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /20200301/gateways/{gatewayId}",
    input: { gatewayId: 0 },
    output: { creationDate: D.ts, lastUpdateDate: D.ts },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGateway",
  endpointHostPrefix: "api.",
})) as any;

export type DescribeGatewayCapabilityConfigurationError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Each gateway capability defines data sources for a gateway. This is the namespace of the gateway capability.
 *
 * . The namespace follows the format `service:capability:version`, where:
 *
 * - `service` - The service providing the capability, or `iotsitewise`.
 *
 * - `capability` - The specific capability type. Options include: `opcuacollector` for the OPC UA data source collector, or `publisher` for data publisher capability.
 *
 * - `version` - The version number of the capability. Option include `2` for Classic streams, V2 gateways, and `3` for MQTT-enabled, V3 gateways.
 *
 * After updating a capability configuration, the sync status becomes `OUT_OF_SYNC` until the gateway processes the configuration.Use `DescribeGatewayCapabilityConfiguration` to check the sync status and verify the configuration was applied.
 *
 * A gateway can have multiple capability configurations with different namespaces.
 */
export const describeGatewayCapabilityConfiguration: API.OperationMethod<
  DescribeGatewayCapabilityConfigurationRequest,
  DescribeGatewayCapabilityConfigurationResponse,
  DescribeGatewayCapabilityConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /20200301/gateways/{gatewayId}/capability/{capabilityNamespace}",
    input: { gatewayId: 0, capabilityNamespace: 0 },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGatewayCapabilityConfiguration",
  endpointHostPrefix: "api.",
})) as any;

export type DescribeLoggingOptionsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the current IoT SiteWise logging options.
 */
export const describeLoggingOptions: API.OperationMethod<
  DescribeLoggingOptionsRequest,
  DescribeLoggingOptionsResponse,
  DescribeLoggingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /logging",
    input: { workspaceName: D.m({ query: "workspaceName" }) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLoggingOptions",
  endpointHostPrefix: "api.",
})) as any;

export type DescribePipelineError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific pipeline in a workspace.
 */
export const describePipeline: API.OperationMethod<
  DescribePipelineRequest,
  DescribePipelineResponse,
  DescribePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceName}/pipelines/{pipelineName}",
    input: {
      workspaceName: 0,
      pipelineName: 0,
      pipelineVersion: D.m({ query: "version" }),
    },
    output: { createdAt: D.ts, updatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePipeline",
  endpointHostPrefix: "api.",
})) as any;

export type DescribePipelineExecutionError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific pipeline execution, including the
 * overall execution status and the status of each individual compute node. Use this
 * operation to monitor execution progress and inspect per-node results, environment
 * variables, and error details.
 */
export const describePipelineExecution: API.PaginatedOperationMethod<
  DescribePipelineExecutionRequest,
  DescribePipelineExecutionResponse,
  DescribePipelineExecutionError,
  Credentials | HttpClient.HttpClient,
  ComputeNodeExecutionDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceName}/pipelines/{pipelineName}/executions/{pipelineExecutionId}",
    input: {
      workspaceName: 0,
      pipelineName: 0,
      pipelineExecutionId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      startTime: D.ts,
      endTime: D.ts,
      computeNodeExecutionDetails: D.list({ startTime: D.ts, endTime: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePipelineExecution",
  endpointHostPrefix: "data.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "computeNodeExecutionDetails",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribePortalError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about a portal.
 */
export const describePortal: API.OperationMethod<
  DescribePortalRequest,
  DescribePortalResponse,
  DescribePortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /portals/{portalId}",
    input: { portalId: 0 },
    output: {
      portalContactEmail: D.secret,
      portalCreationDate: D.ts,
      portalLastUpdateDate: D.ts,
      notificationSenderEmail: D.secret,
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePortal",
  endpointHostPrefix: "monitor.",
})) as any;

export type DescribeProjectError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about a project.
 */
export const describeProject: API.OperationMethod<
  DescribeProjectRequest,
  DescribeProjectResponse,
  DescribeProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /projects/{projectId}",
    input: { projectId: 0 },
    output: { projectCreationDate: D.ts, projectLastUpdateDate: D.ts },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProject",
  endpointHostPrefix: "monitor.",
})) as any;

export type DescribeQueryError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about a query, including its status.
 */
export const describeQuery: API.OperationMethod<
  DescribeQueryRequest,
  DescribeQueryResponse,
  DescribeQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceName}/queries/{queryId}",
    input: { workspaceName: 0, queryId: 0 },
    output: { submittedAt: D.ts, completedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeQuery",
  endpointHostPrefix: "data.",
})) as any;

export type DescribeSearchError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the current status and metadata of a single search, including the query that was
 * submitted, the search type, and — when the search has failed — the reason. Use this to poll a
 * search started with `StartSearch` until it reaches a terminal status (`SUCCEEDED` or
 * `FAILED`).
 */
export const describeSearch: API.OperationMethod<
  DescribeSearchRequest,
  DescribeSearchResponse,
  DescribeSearchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceName}/searches/{searchId}",
    input: { workspaceName: 0, searchId: 0 },
    output: { queryStatement: D.secret, startedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSearch",
  endpointHostPrefix: "data.",
})) as any;

export type DescribeStorageConfigurationError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about the storage configuration for IoT SiteWise.
 */
export const describeStorageConfiguration: API.OperationMethod<
  DescribeStorageConfigurationRequest,
  DescribeStorageConfigurationResponse,
  DescribeStorageConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /configuration/account/storage",
    input: {},
    output: { lastUpdateDate: D.ts },
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStorageConfiguration",
  endpointHostPrefix: "api.",
})) as any;

export type DescribeTaskError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific task in a workspace.
 */
export const describeTask: API.OperationMethod<
  DescribeTaskRequest,
  DescribeTaskResponse,
  DescribeTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceName}/tasks/{taskName}",
    input: {
      workspaceName: 0,
      taskName: 0,
      taskVersion: D.m({ query: "version" }),
    },
    output: {
      taskConfiguration: {
        containerTaskConfiguration: {
          ecrUri: D.secret,
          taskExecutionRole: D.secret,
        },
      },
      createdAt: D.ts,
      updatedAt: D.ts,
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTask",
  endpointHostPrefix: "api.",
})) as any;

export type DescribeTimeSeriesError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about a time series (data stream).
 *
 * To identify a time series, do one of the following:
 *
 * - If the time series isn't associated with an asset property,
 * specify the `alias` of the time series.
 *
 * - If the time series is associated with an asset property,
 * specify one of the following:
 *
 * - The `alias` of the time series.
 *
 * - The `assetId` and `propertyId` that identifies the asset property.
 */
export const describeTimeSeries: API.OperationMethod<
  DescribeTimeSeriesRequest,
  DescribeTimeSeriesResponse,
  DescribeTimeSeriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /timeseries/describe",
    input: {
      alias: D.m({ query: "alias" }),
      assetId: D.m({ query: "assetId" }),
      propertyId: D.m({ query: "propertyId" }),
      workspaceName: D.m({ query: "workspaceName" }),
    },
    output: { timeSeriesCreationDate: D.ts, timeSeriesLastUpdateDate: D.ts },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTimeSeries",
  endpointHostPrefix: "api.",
})) as any;

export type DescribeWorkspaceError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about a workspace.
 */
export const describeWorkspace: API.OperationMethod<
  DescribeWorkspaceRequest,
  DescribeWorkspaceResponse,
  DescribeWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceName}",
    input: { workspaceName: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspace",
  endpointHostPrefix: "api.",
})) as any;

export type DisassociateAssetsError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Disassociates a child asset from the given parent asset through a hierarchy defined in the
 * parent asset's model.
 */
export const disassociateAssets: API.OperationMethod<
  DisassociateAssetsRequest,
  DisassociateAssetsResponse,
  DisassociateAssetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assets/{assetId}/disassociate",
    input: {
      assetId: 0,
      hierarchyId: 0,
      childAssetId: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateAssets",
  endpointHostPrefix: "api.",
})) as any;

export type DisassociateTimeSeriesFromAssetPropertyError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Disassociates a time series (data stream) from an asset property.
 */
export const disassociateTimeSeriesFromAssetProperty: API.OperationMethod<
  DisassociateTimeSeriesFromAssetPropertyRequest,
  DisassociateTimeSeriesFromAssetPropertyResponse,
  DisassociateTimeSeriesFromAssetPropertyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /timeseries/disassociate",
    input: {
      alias: D.m({ query: "alias" }),
      assetId: D.m({ query: "assetId" }),
      propertyId: D.m({ query: "propertyId" }),
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateTimeSeriesFromAssetProperty",
  endpointHostPrefix: "api.",
})) as any;

export type ExecuteActionError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Executes an action on a target resource.
 */
export const executeAction: API.OperationMethod<
  ExecuteActionRequest,
  ExecuteActionResponse,
  ExecuteActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /actions",
    input: {
      targetResource: { assetId: 0, computationModelId: 0 },
      actionDefinitionId: 0,
      actionPayload: { stringValue: 0 },
      clientToken: 0,
      resolveTo: { assetId: 0 },
    },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteAction",
  endpointHostPrefix: "api.",
})) as any;

export type ExecuteQueryError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidRequestException
  | QueryTimeoutException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Run SQL queries to retrieve metadata and time-series data from asset models, assets,
 * measurements, metrics, transforms, and aggregates.
 */
export const executeQuery: API.PaginatedOperationMethod<
  ExecuteQueryRequest,
  ExecuteQueryResponse,
  ExecuteQueryError,
  Credentials | HttpClient.HttpClient,
  Row
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /queries/execution",
    input: {
      queryStatement: 0,
      nextToken: 0,
      maxResults: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidRequestException,
    QueryTimeoutException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteQuery",
  endpointHostPrefix: "data.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "rows",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetAssetPropertyAggregatesError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets aggregated values for an asset property. For more information, see Querying
 * aggregates in the *IoT SiteWise User Guide*.
 *
 * To identify an asset property, you must specify one of the following:
 *
 * - The `assetId` and `propertyId` of an asset property.
 *
 * - A `propertyAlias`, which is a data stream alias (for example,
 * `/company/windfarm/3/turbine/7/temperature`). To define an asset property's alias, see UpdateAssetProperty.
 */
export const getAssetPropertyAggregates: API.PaginatedOperationMethod<
  GetAssetPropertyAggregatesRequest,
  GetAssetPropertyAggregatesResponse,
  GetAssetPropertyAggregatesError,
  Credentials | HttpClient.HttpClient,
  AggregatedValue
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /properties/aggregates",
    input: {
      assetId: D.m({ query: "assetId" }),
      propertyId: D.m({ query: "propertyId" }),
      propertyAlias: D.m({ query: "propertyAlias" }),
      aggregateTypes: D.m({ query: "aggregateTypes" }),
      resolution: D.m({ query: "resolution" }),
      qualities: D.m({ query: "qualities" }),
      startDate: D.m({ query: "startDate", shape: D.tsAs("epoch-seconds") }),
      endDate: D.m({ query: "endDate", shape: D.tsAs("epoch-seconds") }),
      timeOrdering: D.m({ query: "timeOrdering" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { aggregatedValues: D.list(o_AggregatedValue) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssetPropertyAggregates",
  endpointHostPrefix: "data.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "aggregatedValues",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetAssetPropertyValueError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets an asset property's current value. For more information, see Querying
 * current values in the *IoT SiteWise User Guide*.
 *
 * To identify an asset property, you must specify one of the following:
 *
 * - The `assetId` and `propertyId` of an asset property.
 *
 * - A `propertyAlias`, which is a data stream alias (for example,
 * `/company/windfarm/3/turbine/7/temperature`). To define an asset property's alias, see UpdateAssetProperty.
 */
export const getAssetPropertyValue: API.OperationMethod<
  GetAssetPropertyValueRequest,
  GetAssetPropertyValueResponse,
  GetAssetPropertyValueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /properties/latest",
    input: {
      assetId: D.m({ query: "assetId" }),
      propertyId: D.m({ query: "propertyId" }),
      propertyAlias: D.m({ query: "propertyAlias" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssetPropertyValue",
  endpointHostPrefix: "data.",
})) as any;

export type GetAssetPropertyValueHistoryError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the history of an asset property's values. For more information, see Querying
 * historical values in the *IoT SiteWise User Guide*.
 *
 * To identify an asset property, you must specify one of the following:
 *
 * - The `assetId` and `propertyId` of an asset property.
 *
 * - A `propertyAlias`, which is a data stream alias (for example,
 * `/company/windfarm/3/turbine/7/temperature`). To define an asset property's alias, see UpdateAssetProperty.
 */
export const getAssetPropertyValueHistory: API.PaginatedOperationMethod<
  GetAssetPropertyValueHistoryRequest,
  GetAssetPropertyValueHistoryResponse,
  GetAssetPropertyValueHistoryError,
  Credentials | HttpClient.HttpClient,
  AssetPropertyValue
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /properties/history",
    input: {
      assetId: D.m({ query: "assetId" }),
      propertyId: D.m({ query: "propertyId" }),
      propertyAlias: D.m({ query: "propertyAlias" }),
      startDate: D.m({ query: "startDate", shape: D.tsAs("epoch-seconds") }),
      endDate: D.m({ query: "endDate", shape: D.tsAs("epoch-seconds") }),
      qualities: D.m({ query: "qualities" }),
      timeOrdering: D.m({ query: "timeOrdering" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssetPropertyValueHistory",
  endpointHostPrefix: "data.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assetPropertyValueHistory",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetCaptureDataError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves video data for a specific time range.
 */
export const getCaptureData: API.OperationMethod<
  GetCaptureDataRequest,
  GetCaptureDataResponse,
  GetCaptureDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceName}/get-capture-data",
    input: {
      workspaceName: 0,
      startTime: i_TimeInNanos,
      endTime: i_TimeInNanos,
      timeSeriesId: 0,
      propertyAlias: 0,
      formatSettings: i_FormatSettings,
      nextToken: 0,
    },
    output: { data: D.blob },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCaptureData",
  endpointHostPrefix: "data.",
})) as any;

export type GetInterpolatedAssetPropertyValuesError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Get interpolated values for an asset property for a specified time interval, during a
 * period of time. If your time series is missing data points during the specified time interval,
 * you can use interpolation to estimate the missing data.
 *
 * For example, you can use this operation to return the interpolated temperature values for
 * a wind turbine every 24 hours over a duration of 7 days.
 *
 * To identify an asset property, you must specify one of the following:
 *
 * - The `assetId` and `propertyId` of an asset property.
 *
 * - A `propertyAlias`, which is a data stream alias (for example,
 * `/company/windfarm/3/turbine/7/temperature`). To define an asset property's alias, see UpdateAssetProperty.
 */
export const getInterpolatedAssetPropertyValues: API.PaginatedOperationMethod<
  GetInterpolatedAssetPropertyValuesRequest,
  GetInterpolatedAssetPropertyValuesResponse,
  GetInterpolatedAssetPropertyValuesError,
  Credentials | HttpClient.HttpClient,
  InterpolatedAssetPropertyValue
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /properties/interpolated",
    input: {
      assetId: D.m({ query: "assetId" }),
      propertyId: D.m({ query: "propertyId" }),
      propertyAlias: D.m({ query: "propertyAlias" }),
      startTimeInSeconds: D.m({ query: "startTimeInSeconds" }),
      startTimeOffsetInNanos: D.m({ query: "startTimeOffsetInNanos" }),
      endTimeInSeconds: D.m({ query: "endTimeInSeconds" }),
      endTimeOffsetInNanos: D.m({ query: "endTimeOffsetInNanos" }),
      quality: D.m({ query: "quality" }),
      intervalInSeconds: D.m({ query: "intervalInSeconds" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      type: D.m({ query: "type" }),
      intervalWindowInSeconds: D.m({ query: "intervalWindowInSeconds" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInterpolatedAssetPropertyValues",
  endpointHostPrefix: "data.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "interpolatedAssetPropertyValues",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetQueryResultsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the paginated results of a query. Returns empty rows if the query is not yet complete.
 */
export const getQueryResults: API.PaginatedOperationMethod<
  GetQueryResultsRequest,
  GetQueryResultsResponse,
  GetQueryResultsError,
  Credentials | HttpClient.HttpClient,
  ColumnValue[]
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceName}/queries/{queryId}/results",
    input: {
      workspaceName: 0,
      queryId: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueryResults",
  endpointHostPrefix: "data.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "rows",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetSearchResultsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the ranked results of a search, ordered by descending relevance score. Results are
 * available only after the search has reached the `SUCCEEDED` status. Calling this on a search
 * that exists but has not yet completed returns `InvalidRequestException`, while calling it on a
 * search that does not exist returns `ResourceNotFoundException`. The response is paginated: when
 * `nextToken` is present, pass it on a subsequent call to retrieve the next page.
 */
export const getSearchResults: API.PaginatedOperationMethod<
  GetSearchResultsRequest,
  GetSearchResultsResponse,
  GetSearchResultsError,
  Credentials | HttpClient.HttpClient,
  SearchResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceName}/searches/{searchId}/results",
    input: {
      searchId: 0,
      workspaceName: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSearchResults",
  endpointHostPrefix: "data.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "searchResults",
    pageSize: "maxResults",
  } as const,
})) as any;

export type InvokeAssistantError =
  | AccessDeniedException
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Invokes SiteWise Assistant to start or continue a conversation.
 */
export const invokeAssistant: API.OperationMethod<
  InvokeAssistantRequest,
  InvokeAssistantResponse,
  InvokeAssistantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assistant/invocation",
    input: { conversationId: 0, message: 0, enableTrace: 0 },
    output: {
      body: D.m({
        payload: true,
        shape: D.events({
          trace: 0,
          output: 0,
          accessDeniedException: 0,
          conflictingOperationException: 0,
          internalFailureException: 0,
          invalidRequestException: 0,
          limitExceededException: 0,
          resourceNotFoundException: 0,
          throttlingException: 0,
        }),
      }),
      conversationId: D.m({
        header: "x-amz-iotsitewise-assistant-conversation-id",
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeAssistant",
  endpointHostPrefix: "data.",
})) as any;

export type ListAccessPoliciesError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of access policies for an identity (an IAM Identity Center user, an IAM Identity Center
 * group, or an IAM user) or an IoT SiteWise Monitor resource (a portal or project).
 */
export const listAccessPolicies: API.PaginatedOperationMethod<
  ListAccessPoliciesRequest,
  ListAccessPoliciesResponse,
  ListAccessPoliciesError,
  Credentials | HttpClient.HttpClient,
  AccessPolicySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /access-policies",
    input: {
      identityType: D.m({ query: "identityType" }),
      identityId: D.m({ query: "identityId" }),
      resourceType: D.m({ query: "resourceType" }),
      resourceId: D.m({ query: "resourceId" }),
      iamArn: D.m({ query: "iamArn" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      accessPolicySummaries: D.list({
        creationDate: D.ts,
        lastUpdateDate: D.ts,
      }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessPolicies",
  endpointHostPrefix: "monitor.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "accessPolicySummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListActionsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of actions for a specific target resource.
 */
export const listActions: API.PaginatedOperationMethod<
  ListActionsRequest,
  ListActionsResponse,
  ListActionsError,
  Credentials | HttpClient.HttpClient,
  ActionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /actions",
    input: {
      targetResourceType: D.m({ query: "targetResourceType" }),
      targetResourceId: D.m({ query: "targetResourceId" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      resolveToResourceType: D.m({ query: "resolveToResourceType" }),
      resolveToResourceId: D.m({ query: "resolveToResourceId" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListActions",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "actionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListApplicationsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of existing applications
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  ApplicationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /applications",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { applications: D.list({ createdAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "applications",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssetModelCompositeModelsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of composite models associated with the asset model
 */
export const listAssetModelCompositeModels: API.PaginatedOperationMethod<
  ListAssetModelCompositeModelsRequest,
  ListAssetModelCompositeModelsResponse,
  ListAssetModelCompositeModelsError,
  Credentials | HttpClient.HttpClient,
  AssetModelCompositeModelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /asset-models/{assetModelId}/composite-models",
    input: {
      assetModelId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      assetModelVersion: D.m({ query: "assetModelVersion" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssetModelCompositeModels",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assetModelCompositeModelSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssetModelPropertiesError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of properties associated with an asset model.
 * If you update properties associated with the model before you finish listing all the properties,
 * you need to start all over again.
 */
export const listAssetModelProperties: API.PaginatedOperationMethod<
  ListAssetModelPropertiesRequest,
  ListAssetModelPropertiesResponse,
  ListAssetModelPropertiesError,
  Credentials | HttpClient.HttpClient,
  AssetModelPropertySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /asset-models/{assetModelId}/properties",
    input: {
      assetModelId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      filter: D.m({ query: "filter" }),
      assetModelVersion: D.m({ query: "assetModelVersion" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssetModelProperties",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assetModelPropertySummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssetModelsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of summaries of all asset models.
 */
export const listAssetModels: API.PaginatedOperationMethod<
  ListAssetModelsRequest,
  ListAssetModelsResponse,
  ListAssetModelsError,
  Credentials | HttpClient.HttpClient,
  AssetModelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /asset-models",
    input: {
      assetModelTypes: D.m({ query: "assetModelTypes" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      assetModelVersion: D.m({ query: "assetModelVersion" }),
    },
    output: {
      assetModelSummaries: D.list({ creationDate: D.ts, lastUpdateDate: D.ts }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssetModels",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assetModelSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssetPropertiesError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of properties associated with an asset.
 * If you update properties associated with the model before you finish listing all the properties,
 * you need to start all over again.
 */
export const listAssetProperties: API.PaginatedOperationMethod<
  ListAssetPropertiesRequest,
  ListAssetPropertiesResponse,
  ListAssetPropertiesError,
  Credentials | HttpClient.HttpClient,
  AssetPropertySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /assets/{assetId}/properties",
    input: {
      assetId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      filter: D.m({ query: "filter" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssetProperties",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assetPropertySummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssetRelationshipsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of asset relationships for an asset. You can use this operation
 * to identify an asset's root asset and all associated assets between that asset and its
 * root.
 */
export const listAssetRelationships: API.PaginatedOperationMethod<
  ListAssetRelationshipsRequest,
  ListAssetRelationshipsResponse,
  ListAssetRelationshipsError,
  Credentials | HttpClient.HttpClient,
  AssetRelationshipSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /assets/{assetId}/assetRelationships",
    input: {
      assetId: 0,
      traversalType: D.m({ query: "traversalType" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssetRelationships",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assetRelationshipSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssetsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of asset summaries.
 *
 * You can use this operation to do the following:
 *
 * - List assets based on a specific asset model.
 *
 * - List top-level assets.
 *
 * You can't use this operation to list all assets. To retrieve summaries for all of your
 * assets, use ListAssetModels to get all of your asset model IDs. Then, use ListAssets to get all
 * assets for each asset model.
 */
export const listAssets: API.PaginatedOperationMethod<
  ListAssetsRequest,
  ListAssetsResponse,
  ListAssetsError,
  Credentials | HttpClient.HttpClient,
  AssetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /assets",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      assetModelId: D.m({ query: "assetModelId" }),
      filter: D.m({ query: "filter" }),
    },
    output: {
      assetSummaries: D.list({ creationDate: D.ts, lastUpdateDate: D.ts }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssets",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assetSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssociatedAssetsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of associated assets.
 *
 * You can use this operation to do the following:
 *
 * - `CHILD` - List all child assets associated to the asset.
 *
 * - `PARENT` - List the asset's parent asset.
 */
export const listAssociatedAssets: API.PaginatedOperationMethod<
  ListAssociatedAssetsRequest,
  ListAssociatedAssetsResponse,
  ListAssociatedAssetsError,
  Credentials | HttpClient.HttpClient,
  AssociatedAssetsSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /assets/{assetId}/hierarchies",
    input: {
      assetId: 0,
      hierarchyId: D.m({ query: "hierarchyId" }),
      traversalDirection: D.m({ query: "traversalDirection" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      assetSummaries: D.list({ creationDate: D.ts, lastUpdateDate: D.ts }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociatedAssets",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assetSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBulkImportJobsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of bulk import job requests. For more information, see List bulk
 * import jobs (CLI) in the *IoT SiteWise User Guide*.
 */
export const listBulkImportJobs: API.PaginatedOperationMethod<
  ListBulkImportJobsRequest,
  ListBulkImportJobsResponse,
  ListBulkImportJobsError,
  Credentials | HttpClient.HttpClient,
  JobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /jobs",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      filter: D.m({ query: "filter" }),
      workspaceName: D.m({ query: "workspaceName" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBulkImportJobs",
  endpointHostPrefix: "data.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCompositionRelationshipsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of composition relationships for an asset model of type
 * `COMPONENT_MODEL`.
 */
export const listCompositionRelationships: API.PaginatedOperationMethod<
  ListCompositionRelationshipsRequest,
  ListCompositionRelationshipsResponse,
  ListCompositionRelationshipsError,
  Credentials | HttpClient.HttpClient,
  CompositionRelationshipSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /asset-models/{assetModelId}/composition-relationships",
    input: {
      assetModelId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCompositionRelationships",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "compositionRelationshipSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListComputationModelDataBindingUsagesError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all data binding usages for computation models. This allows to identify where
 * specific data bindings are being utilized across the computation models. This track
 * dependencies between data sources and computation models.
 */
export const listComputationModelDataBindingUsages: API.PaginatedOperationMethod<
  ListComputationModelDataBindingUsagesRequest,
  ListComputationModelDataBindingUsagesResponse,
  ListComputationModelDataBindingUsagesError,
  Credentials | HttpClient.HttpClient,
  ComputationModelDataBindingUsageSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /computation-models/data-binding-usages",
    input: {
      dataBindingValueFilter: {
        asset: { assetId: 0 },
        assetModel: { assetModelId: 0 },
        assetProperty: { assetId: 0, propertyId: 0 },
        assetModelProperty: { assetModelId: 0, propertyId: 0 },
      },
      nextToken: 0,
      maxResults: 0,
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComputationModelDataBindingUsages",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dataBindingUsageSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListComputationModelResolveToResourcesError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all distinct resources that are resolved from the executed actions of the
 * computation model.
 */
export const listComputationModelResolveToResources: API.PaginatedOperationMethod<
  ListComputationModelResolveToResourcesRequest,
  ListComputationModelResolveToResourcesResponse,
  ListComputationModelResolveToResourcesError,
  Credentials | HttpClient.HttpClient,
  ComputationModelResolveToResourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /computation-models/{computationModelId}/resolve-to-resources",
    input: {
      computationModelId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComputationModelResolveToResources",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "computationModelResolveToResourceSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListComputationModelsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of summaries of all computation models.
 */
export const listComputationModels: API.PaginatedOperationMethod<
  ListComputationModelsRequest,
  ListComputationModelsResponse,
  ListComputationModelsError,
  Credentials | HttpClient.HttpClient,
  ComputationModelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /computation-models",
    input: {
      computationModelType: D.m({ query: "computationModelType" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      computationModelSummaries: D.list({
        creationDate: D.ts,
        lastUpdateDate: D.ts,
      }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComputationModels",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "computationModelSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDashboardsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of dashboards for an IoT SiteWise Monitor project.
 */
export const listDashboards: API.PaginatedOperationMethod<
  ListDashboardsRequest,
  ListDashboardsResponse,
  ListDashboardsError,
  Credentials | HttpClient.HttpClient,
  DashboardSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /dashboards",
    input: {
      projectId: D.m({ query: "projectId" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      dashboardSummaries: D.list({ creationDate: D.ts, lastUpdateDate: D.ts }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDashboards",
  endpointHostPrefix: "monitor.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dashboardSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDatasetDataSegmentRelationshipsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of data segment relationships for a session dataset. Use this
 * operation to find the curated datasets that reference data segments of the specified session
 * dataset. Use the `nextToken` parameter to retrieve additional results.
 */
export const listDatasetDataSegmentRelationships: API.PaginatedOperationMethod<
  ListDatasetDataSegmentRelationshipsRequest,
  ListDatasetDataSegmentRelationshipsResponse,
  ListDatasetDataSegmentRelationshipsError,
  Credentials | HttpClient.HttpClient,
  DataSegmentRelationshipSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /datasets/{datasetId}/data-segment-relationships",
    input: {
      datasetId: 0,
      workspaceName: D.m({ query: "workspaceName" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasetDataSegmentRelationships",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dataSegmentRelationshipSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDatasetDataSegmentsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of data segments associated with a dataset. Use the `nextToken` parameter to retrieve additional results.
 */
export const listDatasetDataSegments: API.PaginatedOperationMethod<
  ListDatasetDataSegmentsRequest,
  ListDatasetDataSegmentsResponse,
  ListDatasetDataSegmentsError,
  Credentials | HttpClient.HttpClient,
  DataSegmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /datasets/{datasetId}/data-segments",
    input: {
      datasetId: 0,
      workspaceName: D.m({ query: "workspaceName" }),
      datasetVersion: D.m({ query: "datasetVersion" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { dataSegments: D.list({ enrichment: { lastEnrichedAt: D.ts } }) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasetDataSegments",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dataSegments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDatasetExportJobsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of dataset export jobs for a workspace.
 */
export const listDatasetExportJobs: API.PaginatedOperationMethod<
  ListDatasetExportJobsRequest,
  ListDatasetExportJobsResponse,
  ListDatasetExportJobsError,
  Credentials | HttpClient.HttpClient,
  ExportJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceName}/dataset-export-jobs",
    input: {
      workspaceName: 0,
      filter: D.m({ query: "filter" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { jobs: D.list({ startedAt: D.ts, completedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasetExportJobs",
  endpointHostPrefix: "data.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDatasetsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of datasets for a specific target resource.
 */
export const listDatasets: API.PaginatedOperationMethod<
  ListDatasetsRequest,
  ListDatasetsResponse,
  ListDatasetsError,
  Credentials | HttpClient.HttpClient,
  DatasetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /datasets",
    input: {
      sourceType: D.m({ query: "sourceType" }),
      workspaceName: D.m({ query: "workspaceName" }),
      datasetType: D.m({ query: "datasetType" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      datasetSummaries: D.list({
        creationDate: D.ts,
        lastUpdateDate: D.ts,
        enrichmentStatus: o_DatasetEnrichment,
      }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasets",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "datasetSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnrichmentJobsError =
  | AccessDeniedException
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists enrichment jobs within a workspace with optional filtering and pagination. Results are ordered
 * by createdAt timestamp descending (newest first).
 *
 * Filtering
 *
 * Combine filters to narrow results:
 *
 * - datasetId: Filter by dataset
 *
 * - propertyAlias OR timeSeriesId: Filter by time series (specify one, not both)
 *
 * - status: Filter by job status (e.g., RUNNING to find active jobs)
 *
 * - jobType: Filter by enrichment type (currently only EVENT_DETECTION)
 *
 * - startDate and endDate: Filter by job creation time range
 *
 * Important Constraints
 *
 * - You must specify either propertyAlias OR timeSeriesId, but not both
 *
 * - Attempting to specify both results in an InvalidRequestException
 *
 * - Date filters use ISO 8601 format
 *
 * - startDate is exclusive, endDate is inclusive
 *
 * Pagination
 *
 * The operation returns up to maxResults jobs per page (default 50). If more results exist, the
 * response includes a nextToken. Submit this token in a subsequent request to retrieve the next page.
 *
 * Common Use Cases
 *
 * - Find all running jobs: Filter by status=RUNNING
 *
 * - List recent jobs for a dataset: Filter by datasetId with optional date range
 *
 * - Monitor jobs for a specific sensor: Filter by propertyAlias or timeSeriesId
 *
 * - Track all event detection jobs: Filter by jobType=EVENT_DETECTION
 *
 * Performance
 *
 * Performance is optimal when filtering by supported fields (datasetId, propertyAlias, timeSeriesId, status, jobType).
 */
export const listEnrichmentJobs: API.PaginatedOperationMethod<
  ListEnrichmentJobsRequest,
  ListEnrichmentJobsResponse,
  ListEnrichmentJobsError,
  Credentials | HttpClient.HttpClient,
  EnrichmentJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceName}/enrichment-jobs",
    input: {
      workspaceName: 0,
      datasetId: D.m({ query: "datasetId" }),
      propertyAlias: D.m({ query: "propertyAlias" }),
      timeSeriesId: D.m({ query: "timeSeriesId" }),
      status: D.m({ query: "status" }),
      jobType: D.m({ query: "jobType" }),
      startDate: D.m({ query: "startDate", shape: D.tsAs("epoch-seconds") }),
      endDate: D.m({ query: "endDate", shape: D.tsAs("epoch-seconds") }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { jobs: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnrichmentJobs",
  endpointHostPrefix: "data.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListExecutionsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of summaries of all executions.
 */
export const listExecutions: API.PaginatedOperationMethod<
  ListExecutionsRequest,
  ListExecutionsResponse,
  ListExecutionsError,
  Credentials | HttpClient.HttpClient,
  ExecutionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /executions",
    input: {
      targetResourceType: D.m({ query: "targetResourceType" }),
      targetResourceId: D.m({ query: "targetResourceId" }),
      resolveToResourceType: D.m({ query: "resolveToResourceType" }),
      resolveToResourceId: D.m({ query: "resolveToResourceId" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      actionType: D.m({ query: "actionType" }),
    },
    output: {
      executionSummaries: D.list({
        executionStartTime: D.ts,
        executionEndTime: D.ts,
      }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExecutions",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "executionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGatewaysError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of gateways.
 */
export const listGateways: API.PaginatedOperationMethod<
  ListGatewaysRequest,
  ListGatewaysResponse,
  ListGatewaysError,
  Credentials | HttpClient.HttpClient,
  GatewaySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /20200301/gateways",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      gatewaySummaries: D.list({ creationDate: D.ts, lastUpdateDate: D.ts }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGateways",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "gatewaySummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListInterfaceRelationshipsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of asset models that have a specific interface asset model
 * applied to them.
 */
export const listInterfaceRelationships: API.PaginatedOperationMethod<
  ListInterfaceRelationshipsRequest,
  ListInterfaceRelationshipsResponse,
  ListInterfaceRelationshipsError,
  Credentials | HttpClient.HttpClient,
  InterfaceRelationshipSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /interface/{interfaceAssetModelId}/asset-models",
    input: {
      interfaceAssetModelId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInterfaceRelationships",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "interfaceRelationshipSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPipelineExecutionsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists pipeline executions for a specific pipeline in a workspace.
 * Supports filtering by state and time range. State can be combined with either
 * startTime or endTime filters. Time range filters are grouped: use startTime filters
 * (startTimeAfter, startTimeBefore) or endTime filters (endTimeAfter, endTimeBefore),
 * but not both. Combining startTime and endTime filters returns an InvalidRequestException.
 * Note: endTime filters only return executions in terminal states, as in-progress
 * executions have no endTime.
 */
export const listPipelineExecutions: API.PaginatedOperationMethod<
  ListPipelineExecutionsRequest,
  ListPipelineExecutionsResponse,
  ListPipelineExecutionsError,
  Credentials | HttpClient.HttpClient,
  PipelineExecutionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceName}/pipelines/{pipelineName}/executions",
    input: {
      workspaceName: 0,
      pipelineName: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      state: D.m({ query: "state" }),
      startTimeAfter: D.m({
        query: "startTimeAfter",
        shape: D.tsAs("epoch-seconds"),
      }),
      startTimeBefore: D.m({
        query: "startTimeBefore",
        shape: D.tsAs("epoch-seconds"),
      }),
      endTimeAfter: D.m({
        query: "endTimeAfter",
        shape: D.tsAs("epoch-seconds"),
      }),
      endTimeBefore: D.m({
        query: "endTimeBefore",
        shape: D.tsAs("epoch-seconds"),
      }),
    },
    output: {
      pipelineExecutionSummaries: D.list({ startTime: D.ts, endTime: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPipelineExecutions",
  endpointHostPrefix: "data.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "pipelineExecutionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPipelinesError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists pipelines in a workspace. To get complete details about a pipeline, use DescribePipeline.
 */
export const listPipelines: API.PaginatedOperationMethod<
  ListPipelinesRequest,
  ListPipelinesResponse,
  ListPipelinesError,
  Credentials | HttpClient.HttpClient,
  PipelineSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceName}/pipelines",
    input: {
      workspaceName: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { pipelineSummaries: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPipelines",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "pipelineSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPortalsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of IoT SiteWise Monitor portals.
 */
export const listPortals: API.PaginatedOperationMethod<
  ListPortalsRequest,
  ListPortalsResponse,
  ListPortalsError,
  Credentials | HttpClient.HttpClient,
  PortalSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /portals",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      portalSummaries: D.list({ creationDate: D.ts, lastUpdateDate: D.ts }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPortals",
  endpointHostPrefix: "monitor.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "portalSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProjectAssetsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of assets associated with an IoT SiteWise Monitor project.
 */
export const listProjectAssets: API.PaginatedOperationMethod<
  ListProjectAssetsRequest,
  ListProjectAssetsResponse,
  ListProjectAssetsError,
  Credentials | HttpClient.HttpClient,
  ID
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /projects/{projectId}/assets",
    input: {
      projectId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProjectAssets",
  endpointHostPrefix: "monitor.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assetIds",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProjectsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of projects for an IoT SiteWise Monitor portal.
 */
export const listProjects: API.PaginatedOperationMethod<
  ListProjectsRequest,
  ListProjectsResponse,
  ListProjectsError,
  Credentials | HttpClient.HttpClient,
  ProjectSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /projects",
    input: {
      portalId: D.m({ query: "portalId" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      projectSummaries: D.list({ creationDate: D.ts, lastUpdateDate: D.ts }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProjects",
  endpointHostPrefix: "monitor.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "projectSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListQueriesError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of queries for a workspace.
 */
export const listQueries: API.PaginatedOperationMethod<
  ListQueriesRequest,
  ListQueriesResponse,
  ListQueriesError,
  Credentials | HttpClient.HttpClient,
  QuerySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceName}/queries",
    input: {
      workspaceName: 0,
      filter: D.m({ query: "filter" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { queries: D.list({ submittedAt: D.ts, completedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQueries",
  endpointHostPrefix: "data.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "queries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSearchesError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the searches in a workspace, most recently started first. Results can be narrowed with
 * optional filters (status, search type, group, and started-at time range) and are paginated: when
 * `nextToken` is present, pass it on a subsequent call to retrieve the next page.
 */
export const listSearches: API.PaginatedOperationMethod<
  ListSearchesRequest,
  ListSearchesResponse,
  ListSearchesError,
  Credentials | HttpClient.HttpClient,
  SearchSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceName}/searches/list",
    input: {
      workspaceName: 0,
      maxResults: 0,
      nextToken: 0,
      listSearchesFilters: {
        statusFilter: 0,
        startedAfter: 0,
        startedBefore: 0,
        groupIdFilter: 0,
        searchTypeFilter: 0,
      },
    },
    output: {
      searchSummaries: D.list({ queryStatement: D.secret, startedAt: D.ts }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSearches",
  endpointHostPrefix: "data.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "searchSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves the list of tags for an IoT SiteWise resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags",
    input: { resourceArn: D.m({ query: "resourceArn" }) },
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  endpointHostPrefix: "api.",
})) as any;

export type ListTasksError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists tasks in a workspace. To get complete details about a task, use DescribeTask.
 */
export const listTasks: API.PaginatedOperationMethod<
  ListTasksRequest,
  ListTasksResponse,
  ListTasksError,
  Credentials | HttpClient.HttpClient,
  TaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceName}/tasks",
    input: {
      workspaceName: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { taskSummaries: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTasks",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "taskSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTimeSeriesError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of time series (data streams).
 */
export const listTimeSeries: API.PaginatedOperationMethod<
  ListTimeSeriesRequest,
  ListTimeSeriesResponse,
  ListTimeSeriesError,
  Credentials | HttpClient.HttpClient,
  TimeSeriesSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /timeseries",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      assetId: D.m({ query: "assetId" }),
      aliasPrefix: D.m({ query: "aliasPrefix" }),
      timeSeriesType: D.m({ query: "timeSeriesType" }),
      workspaceName: D.m({ query: "workspaceName" }),
    },
    output: {
      TimeSeriesSummaries: D.list({
        timeSeriesCreationDate: D.ts,
        timeSeriesLastUpdateDate: D.ts,
      }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTimeSeries",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "TimeSeriesSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkspacesError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of workspaces. Use the `nextToken` parameter to retrieve additional results.
 */
export const listWorkspaces: API.PaginatedOperationMethod<
  ListWorkspacesRequest,
  ListWorkspacesResponse,
  ListWorkspacesError,
  Credentials | HttpClient.HttpClient,
  WorkspaceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /workspaces",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      workspaceSummaries: D.list({ createdAt: D.ts, updatedAt: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkspaces",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workspaceSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutAssetModelInterfaceRelationshipError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates or updates an interface relationship between an asset model and an interface asset
 * model. This operation applies an interface to an asset model.
 */
export const putAssetModelInterfaceRelationship: API.OperationMethod<
  PutAssetModelInterfaceRelationshipRequest,
  PutAssetModelInterfaceRelationshipResponse,
  PutAssetModelInterfaceRelationshipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /asset-models/{assetModelId}/interface/{interfaceAssetModelId}/asset-model-interface-relationship",
    input: {
      assetModelId: 0,
      interfaceAssetModelId: 0,
      propertyMappingConfiguration: {
        matchByPropertyName: 0,
        createMissingProperty: 0,
        overrides: D.list({
          assetModelPropertyId: 0,
          interfaceAssetModelPropertyId: 0,
        }),
      },
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAssetModelInterfaceRelationship",
  endpointHostPrefix: "api.",
})) as any;

export type PutDefaultEncryptionConfigurationError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Sets the default encryption configuration for the Amazon Web Services account. For more information, see
 * Key management in
 * the *IoT SiteWise User Guide*.
 */
export const putDefaultEncryptionConfiguration: API.OperationMethod<
  PutDefaultEncryptionConfigurationRequest,
  PutDefaultEncryptionConfigurationResponse,
  PutDefaultEncryptionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /configuration/account/encryption",
    input: { encryptionType: 0, kmsKeyId: 0 },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDefaultEncryptionConfiguration",
  endpointHostPrefix: "api.",
})) as any;

export type PutLoggingOptionsError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Sets logging options for IoT SiteWise.
 */
export const putLoggingOptions: API.OperationMethod<
  PutLoggingOptionsRequest,
  PutLoggingOptionsResponse,
  PutLoggingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /logging",
    input: { loggingOptions: { level: 0 }, workspaceName: 0 },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLoggingOptions",
  endpointHostPrefix: "api.",
})) as any;

export type PutStorageConfigurationError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Configures storage settings for IoT SiteWise.
 */
export const putStorageConfiguration: API.OperationMethod<
  PutStorageConfigurationRequest,
  PutStorageConfigurationResponse,
  PutStorageConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /configuration/account/storage",
    input: {
      storageType: 0,
      multiLayerStorage: {
        customerManagedS3Storage: { s3ResourceArn: 0, roleArn: 0 },
      },
      disassociatedDataStorage: 0,
      retentionPeriod: { numberOfDays: 0, unlimited: 0 },
      warmTier: 0,
      warmTierRetentionPeriod: { numberOfDays: 0, unlimited: 0 },
      disallowIngestNullNaN: 0,
    },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutStorageConfiguration",
  endpointHostPrefix: "api.",
})) as any;

export type StartPipelineExecutionError =
  | AccessDeniedException
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Starts execution of a pipeline in the specified workspace. Each compute node runs
 * according to the DAG dependency order defined in the pipeline. Nodes without
 * dependencies start immediately, while dependent nodes wait for all upstream nodes
 * to complete successfully.
 *
 * You can provide runtime environment variable overrides that take the highest priority
 * in the environment variable hierarchy, without modifying the pipeline definition.
 */
export const startPipelineExecution: API.OperationMethod<
  StartPipelineExecutionRequest,
  StartPipelineExecutionResponse,
  StartPipelineExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceName}/pipelines/{pipelineName}/executions",
    input: {
      workspaceName: 0,
      pipelineName: 0,
      executionEnvironmentVariableOverrides: { global: 0, computeNodes: 0 },
      executionPriority: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartPipelineExecution",
  endpointHostPrefix: "data.",
})) as any;

export type StartQueryError =
  | AccessDeniedException
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Starts an asynchronous SQL query against workspace telemetry, annotations, data segment, and dataset data.
 */
export const startQuery: API.OperationMethod<
  StartQueryRequest,
  StartQueryResponse,
  StartQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceName}/queries",
    input: {
      clientToken: D.m({ idempotency: true }),
      workspaceName: 0,
      queryStatement: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartQuery",
  endpointHostPrefix: "data.",
})) as any;

export type StartSearchError =
  | AccessDeniedException
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Starts an asynchronous search over the data in a workspace. The search runs in the background;
 * the response returns immediately with a `searchId` and an initial status of `QUEUED`. Use
 * `DescribeSearch` to poll for completion and `GetSearchResults` to retrieve the results once the
 * search reaches `SUCCEEDED`. The request is idempotent on `clientToken`: repeating a call with the
 * same token returns the original search instead of starting a new one.
 */
export const startSearch: API.OperationMethod<
  StartSearchRequest,
  StartSearchResponse,
  StartSearchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceName}/searches",
    input: {
      workspaceName: 0,
      queryStatement: 0,
      clientToken: D.m({ idempotency: true }),
      searchType: 0,
      searchFilters: {
        timeSeriesIds: 0,
        datasetIds: 0,
        timeIntervals: D.list({
          startTime: i_TimeInNanos,
          endTime: i_TimeInNanos,
        }),
      },
      groupId: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSearch",
  endpointHostPrefix: "data.",
})) as any;

export type TagResourceError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyTagsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Adds tags to an IoT SiteWise resource. If a tag already exists for the resource, this operation
 * updates the tag's value.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags",
    input: { resourceArn: D.m({ query: "resourceArn" }), tags: 0 },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyTagsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  endpointHostPrefix: "api.",
})) as any;

export type UntagResourceError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Removes a tag from an IoT SiteWise resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags",
    input: {
      resourceArn: D.m({ query: "resourceArn" }),
      tagKeys: D.m({ query: "tagKeys" }),
    },
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  endpointHostPrefix: "api.",
})) as any;

export type UpdateAccessPolicyError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT SiteWise Monitor feature will no longer be open to new
 * customers starting November 7, 2025. If you would like to use the IoT SiteWise Monitor feature, sign up prior to that date. Existing customers can
 * continue to use the service as normal. For more information, see
 * IoT SiteWise Monitor availability change.
 *
 * Updates an existing access policy that specifies an identity's access to an IoT SiteWise Monitor
 * portal or project resource.
 */
export const updateAccessPolicy: API.OperationMethod<
  UpdateAccessPolicyRequest,
  UpdateAccessPolicyResponse,
  UpdateAccessPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /access-policies/{accessPolicyId}",
    input: {
      accessPolicyId: 0,
      accessPolicyIdentity: i_Identity,
      accessPolicyResource: i_Resource,
      accessPolicyPermission: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccessPolicy",
  endpointHostPrefix: "monitor.",
})) as any;

export type UpdateAssetError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an asset's name. For more information, see Updating assets and models in the
 * *IoT SiteWise User Guide*.
 */
export const updateAsset: API.OperationMethod<
  UpdateAssetRequest,
  UpdateAssetResponse,
  UpdateAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /assets/{assetId}",
    input: {
      assetId: 0,
      assetExternalId: 0,
      assetName: 0,
      clientToken: D.m({ idempotency: true }),
      assetDescription: 0,
    },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAsset",
  endpointHostPrefix: "api.",
})) as any;

export type UpdateAssetModelError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | PreconditionFailedException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an asset model and all of the assets that were created from the model. Each asset
 * created from the model inherits the updated asset model's property and hierarchy definitions.
 * For more information, see Updating assets and models in the
 * *IoT SiteWise User Guide*.
 *
 * If you remove a property from an asset model, IoT SiteWise deletes all previous data for that
 * property. You can’t change the type or data type of an existing property.
 *
 * To replace an existing asset model property with a new one with the same
 * `name`, do the following:
 *
 * - Submit an `UpdateAssetModel` request with the entire existing property
 * removed.
 *
 * - Submit a second `UpdateAssetModel` request that includes the new
 * property. The new asset property will have the same `name` as the previous
 * one and IoT SiteWise will generate a new unique `id`.
 */
export const updateAssetModel: API.OperationMethod<
  UpdateAssetModelRequest,
  UpdateAssetModelResponse,
  UpdateAssetModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /asset-models/{assetModelId}",
    input: {
      assetModelId: 0,
      assetModelExternalId: 0,
      assetModelName: 0,
      assetModelDescription: 0,
      assetModelProperties: D.list(i_AssetModelProperty),
      assetModelHierarchies: D.list({
        id: 0,
        externalId: 0,
        name: 0,
        childAssetModelId: 0,
      }),
      assetModelCompositeModels: D.list({
        name: 0,
        description: 0,
        type: 0,
        properties: D.list(i_AssetModelProperty),
        id: 0,
        externalId: 0,
      }),
      clientToken: D.m({ idempotency: true }),
      ifMatch: D.m({ header: "If-Match" }),
      ifNoneMatch: D.m({ header: "If-None-Match" }),
      matchForVersionType: D.m({ header: "Match-For-Version-Type" }),
    },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    PreconditionFailedException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAssetModel",
  endpointHostPrefix: "api.",
})) as any;

export type UpdateAssetModelCompositeModelError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | PreconditionFailedException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a composite model and all of the assets that were created from the model. Each
 * asset created from the model inherits the updated asset model's property and hierarchy
 * definitions. For more information, see Updating assets and models in the
 * *IoT SiteWise User Guide*.
 *
 * If you remove a property from a composite asset model, IoT SiteWise deletes all previous data
 * for that property. You can’t change the type or data type of an existing property.
 *
 * To replace an existing composite asset model property with a new one with the same
 * `name`, do the following:
 *
 * - Submit an `UpdateAssetModelCompositeModel` request with the entire
 * existing property removed.
 *
 * - Submit a second `UpdateAssetModelCompositeModel` request that includes
 * the new property. The new asset property will have the same `name` as the
 * previous one and IoT SiteWise will generate a new unique `id`.
 */
export const updateAssetModelCompositeModel: API.OperationMethod<
  UpdateAssetModelCompositeModelRequest,
  UpdateAssetModelCompositeModelResponse,
  UpdateAssetModelCompositeModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /asset-models/{assetModelId}/composite-models/{assetModelCompositeModelId}",
    input: {
      assetModelId: 0,
      assetModelCompositeModelId: 0,
      assetModelCompositeModelExternalId: 0,
      assetModelCompositeModelDescription: 0,
      assetModelCompositeModelName: 0,
      clientToken: D.m({ idempotency: true }),
      assetModelCompositeModelProperties: D.list(i_AssetModelProperty),
      ifMatch: D.m({ header: "If-Match" }),
      ifNoneMatch: D.m({ header: "If-None-Match" }),
      matchForVersionType: D.m({ header: "Match-For-Version-Type" }),
    },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    PreconditionFailedException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAssetModelCompositeModel",
  endpointHostPrefix: "api.",
})) as any;

export type UpdateAssetPropertyError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an asset property's alias and notification state.
 *
 * This operation overwrites the property's existing alias and notification state. To keep
 * your existing property's alias or notification state, you must include the existing values
 * in the UpdateAssetProperty request. For more information, see DescribeAssetProperty.
 */
export const updateAssetProperty: API.OperationMethod<
  UpdateAssetPropertyRequest,
  UpdateAssetPropertyResponse,
  UpdateAssetPropertyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /assets/{assetId}/properties/{propertyId}",
    input: {
      assetId: 0,
      propertyId: 0,
      propertyAlias: 0,
      propertyNotificationState: 0,
      clientToken: D.m({ idempotency: true }),
      propertyUnit: 0,
    },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAssetProperty",
  endpointHostPrefix: "api.",
})) as any;

export type UpdateComputationModelError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the computation model.
 */
export const updateComputationModel: API.OperationMethod<
  UpdateComputationModelRequest,
  UpdateComputationModelResponse,
  UpdateComputationModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /computation-models/{computationModelId}",
    input: {
      computationModelId: 0,
      computationModelName: 0,
      computationModelDescription: 0,
      computationModelConfiguration: i_ComputationModelConfiguration,
      computationModelDataBinding: D.map(i_ComputationModelDataBindingValue),
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateComputationModel",
  endpointHostPrefix: "api.",
})) as any;

export type UpdateDashboardError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT SiteWise Monitor feature will no longer be open to new
 * customers starting November 7, 2025. If you would like to use the IoT SiteWise Monitor feature, sign up prior to that date. Existing customers can
 * continue to use the service as normal. For more information, see
 * IoT SiteWise Monitor availability change.
 *
 * Updates an IoT SiteWise Monitor dashboard.
 */
export const updateDashboard: API.OperationMethod<
  UpdateDashboardRequest,
  UpdateDashboardResponse,
  UpdateDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /dashboards/{dashboardId}",
    input: {
      dashboardId: 0,
      dashboardName: 0,
      dashboardDescription: 0,
      dashboardDefinition: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDashboard",
  endpointHostPrefix: "monitor.",
})) as any;

export type UpdateDatasetError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a dataset.
 */
export const updateDataset: API.OperationMethod<
  UpdateDatasetRequest,
  UpdateDatasetResponse,
  UpdateDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /datasets/{datasetId}",
    input: {
      datasetId: 0,
      workspaceName: 0,
      datasetName: 0,
      datasetDescription: 0,
      datasetConfig: i_DatasetConfig,
      metadata: 0,
      datasetSource: i_DatasetSource,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataset",
  endpointHostPrefix: "api.",
})) as any;

export type UpdateGatewayError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a gateway's name.
 */
export const updateGateway: API.OperationMethod<
  UpdateGatewayRequest,
  UpdateGatewayResponse,
  UpdateGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /20200301/gateways/{gatewayId}",
    input: { gatewayId: 0, gatewayName: 0 },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGateway",
  endpointHostPrefix: "api.",
})) as any;

export type UpdateGatewayCapabilityConfigurationError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a gateway capability configuration or defines a new capability configuration. Each gateway capability defines data sources for a gateway.
 *
 * Important workflow notes:
 *
 * Each gateway capability defines data sources for a gateway. This is the namespace of the gateway capability.
 *
 * . The namespace follows the format `service:capability:version`, where:
 *
 * - `service` - The service providing the capability, or `iotsitewise`.
 *
 * - `capability` - The specific capability type. Options include: `opcuacollector` for the OPC UA data source collector, or `publisher` for data publisher capability.
 *
 * - `version` - The version number of the capability. Option include `2` for Classic streams, V2 gateways, and `3` for MQTT-enabled, V3 gateways.
 *
 * After updating a capability configuration, the sync status becomes `OUT_OF_SYNC` until the gateway processes the configuration.Use `DescribeGatewayCapabilityConfiguration` to check the sync status and verify the configuration was applied.
 *
 * A gateway can have multiple capability configurations with different namespaces.
 */
export const updateGatewayCapabilityConfiguration: API.OperationMethod<
  UpdateGatewayCapabilityConfigurationRequest,
  UpdateGatewayCapabilityConfigurationResponse,
  UpdateGatewayCapabilityConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /20200301/gateways/{gatewayId}/capability",
    input: { gatewayId: 0, capabilityNamespace: 0, capabilityConfiguration: 0 },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGatewayCapabilityConfiguration",
  endpointHostPrefix: "api.",
})) as any;

export type UpdatePipelineError =
  | AccessDeniedException
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an existing pipeline in the specified workspace. Only the fields
 * provided in the request are updated; fields not included in the request are preserved
 * unchanged. You can update the pipeline description, environment variables, and the
 * list of compute nodes independently.
 */
export const updatePipeline: API.OperationMethod<
  UpdatePipelineRequest,
  UpdatePipelineResponse,
  UpdatePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /workspaces/{workspaceName}/pipelines/{pipelineName}",
    input: {
      workspaceName: 0,
      pipelineName: 0,
      description: 0,
      environmentVariables: 0,
      computations: D.list(i_ComputeNode),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePipeline",
  endpointHostPrefix: "api.",
})) as any;

export type UpdatePortalError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT SiteWise Monitor feature will no longer be open to new
 * customers starting November 7, 2025. If you would like to use the IoT SiteWise Monitor feature, sign up prior to that date. Existing customers can
 * continue to use the service as normal. For more information, see
 * IoT SiteWise Monitor availability change.
 *
 * Updates an IoT SiteWise Monitor portal.
 */
export const updatePortal: API.OperationMethod<
  UpdatePortalRequest,
  UpdatePortalResponse,
  UpdatePortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /portals/{portalId}",
    input: {
      portalId: 0,
      portalName: 0,
      portalDescription: 0,
      portalContactEmail: 0,
      portalLogoImage: { id: 0, file: i_ImageFile },
      roleArn: 0,
      clientToken: D.m({ idempotency: true }),
      notificationSenderEmail: 0,
      alarms: i_Alarms,
      portalType: 0,
      portalTypeConfiguration: D.map(i_PortalTypeEntry),
    },
    body: true,
  },
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePortal",
  endpointHostPrefix: "monitor.",
})) as any;

export type UpdateProjectError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT SiteWise Monitor feature will no longer be open to new
 * customers starting November 7, 2025. If you would like to use the IoT SiteWise Monitor feature, sign up prior to that date. Existing customers can
 * continue to use the service as normal. For more information, see
 * IoT SiteWise Monitor availability change.
 *
 * Updates an IoT SiteWise Monitor project.
 */
export const updateProject: API.OperationMethod<
  UpdateProjectRequest,
  UpdateProjectResponse,
  UpdateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /projects/{projectId}",
    input: {
      projectId: 0,
      projectName: 0,
      projectDescription: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProject",
  endpointHostPrefix: "monitor.",
})) as any;

export type UpdateTaskError =
  | AccessDeniedException
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an existing task in the specified workspace. Only the fields
 * provided in the request are updated; fields not included in the request are preserved
 * unchanged.
 */
export const updateTask: API.OperationMethod<
  UpdateTaskRequest,
  UpdateTaskResponse,
  UpdateTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /workspaces/{workspaceName}/tasks/{taskName}",
    input: {
      workspaceName: 0,
      taskName: 0,
      description: 0,
      taskConfiguration: i_TaskConfiguration,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTask",
  endpointHostPrefix: "api.",
})) as any;

export type UpdateWorkspaceError =
  | AccessDeniedException
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a workspace. You can update only workspaces in the `ACTIVE` or
 * `FAILED` state. Fields that you omit from the request are left unchanged. To
 * recover a workspace in the `FAILED` state, call this operation and supply its
 * encryption configuration again.
 */
export const updateWorkspace: API.OperationMethod<
  UpdateWorkspaceRequest,
  UpdateWorkspaceResponse,
  UpdateWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /workspaces/{workspaceName}",
    input: {
      workspaceName: 0,
      workspaceDescription: 0,
      encryptionConfiguration: i_WorkspaceEncryptionConfiguration,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkspace",
  endpointHostPrefix: "api.",
})) as any;

const i_Alarms: D.LazyStruct = () => ({
  alarmRoleArn: 0,
  notificationLambdaArn: 0,
});
const i_AssetModelProperty: D.LazyStruct = () => ({
  id: 0,
  externalId: 0,
  name: 0,
  dataType: 0,
  dataTypeSpec: 0,
  unit: 0,
  type: i_PropertyType,
  path: D.list(i_AssetModelPropertyPathSegment),
});
const i_AssetModelPropertyDefinition: D.LazyStruct = () => ({
  id: 0,
  externalId: 0,
  name: 0,
  dataType: 0,
  dataTypeSpec: 0,
  unit: 0,
  type: i_PropertyType,
});
const i_ComputationModelConfiguration: D.LazyStruct = () => ({
  anomalyDetection: { inputProperties: 0, resultProperty: 0 },
});
const i_ComputationModelDataBindingValue: D.LazyStruct = () => ({
  assetModelProperty: { assetModelId: 0, propertyId: 0 },
  assetProperty: { assetId: 0, propertyId: 0 },
  list: D.list(i_ComputationModelDataBindingValue),
});
const i_ComputeNode: D.LazyStruct = () => ({
  computeNodeName: 0,
  taskName: 0,
  environmentVariables: 0,
  dependsOn: 0,
});
const i_DatasetConfig: D.LazyStruct = () => ({
  session: {
    sessionStartTimestamp: i_TimeInNanos,
    sessionEndTimestamp: i_TimeInNanos,
  },
});
const i_DatasetSource: D.LazyStruct = () => ({
  sourceType: 0,
  sourceFormat: 0,
  sourceDetail: { kendra: { knowledgeBaseArn: 0, roleArn: 0 } },
});
const i_FileFormat: D.LazyStruct = () => ({
  csv: { columnNames: 0 },
  parquet: {},
  mp4: {},
  annotation: {},
});
const i_FormatSettings: D.LazyStruct = () => ({
  framesPerSecond: 0,
  widthInPixels: 0,
  heightInPixels: 0,
});
const i_Identity: D.LazyStruct = () => ({
  user: { id: 0 },
  group: { id: 0 },
  iamUser: { arn: 0 },
  iamRole: { arn: 0 },
});
const i_ImageFile: D.LazyStruct = () => ({ data: 0, type: 0 });
const i_PortalTypeEntry: D.LazyStruct = () => ({ portalTools: 0 });
const i_Resource: D.LazyStruct = () => ({
  portal: { id: 0 },
  project: { id: 0 },
});
const i_TaskConfiguration: D.LazyStruct = () => ({
  containerTaskConfiguration: {
    ecrUri: 0,
    taskExecutionRole: 0,
    processingType: 0,
    processingUnit: 0,
    command: 0,
    timeoutSeconds: 0,
    environmentVariables: 0,
  },
});
const i_TimeInNanos: D.LazyStruct = () => ({
  timeInSeconds: 0,
  offsetInNanos: 0,
});
const i_TrimSettings: D.LazyStruct = () => ({
  startTime: i_TimeInNanos,
  endTime: i_TimeInNanos,
});
const i_WorkspaceEncryptionConfiguration: D.LazyStruct = () => ({
  encryptionType: 0,
  kmsKeyId: 0,
});
const o_AggregatedValue: D.LazyStruct = () => ({ timestamp: D.ts });
const o_DatasetEnrichment: D.LazyStruct = () => ({
  video: { lastEnrichedAt: D.ts },
});
const i_AssetModelPropertyPathSegment: D.LazyStruct = () => ({
  id: 0,
  name: 0,
});
const i_PropertyType: D.LazyStruct = () => ({
  attribute: { defaultValue: 0 },
  measurement: { processingConfig: { forwardingConfig: i_ForwardingConfig } },
  transform: {
    expression: 0,
    variables: D.list(i_ExpressionVariable),
    processingConfig: {
      computeLocation: 0,
      forwardingConfig: i_ForwardingConfig,
    },
  },
  metric: {
    expression: 0,
    variables: D.list(i_ExpressionVariable),
    window: { tumbling: { interval: 0, offset: 0 } },
    processingConfig: { computeLocation: 0 },
  },
});
const i_ExpressionVariable: D.LazyStruct = () => ({
  name: 0,
  value: {
    propertyId: 0,
    hierarchyId: 0,
    propertyPath: D.list(i_AssetModelPropertyPathSegment),
  },
});
const i_ForwardingConfig: D.LazyStruct = () => ({ state: 0 });
